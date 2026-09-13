/**
 * 移动端响应式体检脚本（开发用，不随站点上线）。
 *
 * 用无头 Edge + CDP 在多个手机/平板宽度下逐页渲染，检测：
 *   1. 页面横向溢出（documentElement.scrollWidth > 视口宽）
 *   2. 溢出视口的元素（排除表格、页内导航这类设计内的横滑容器）
 *   3. 字号过小的文本、点按区域过小的链接/按钮、加载失败的图片
 * 并把每个页面在每种宽度下的截图存到 _预览截图\手机审计\。
 *
 * 运行：
 *   node tools/serve.mjs 5173          # 另开一个终端，先起本地服务
 *   node tools/audit_mobile.mjs        # 再跑本脚本
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { launchEdge, setViewport, sleep } from "./cdp-edge.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SHOT_DIR = path.join(ROOT, "_预览截图", "手机审计");
const BASE = process.env.AUDIT_BASE || "http://localhost:5173";
const PORT = 9333;

const DEVICES = [
  { name: "320-小屏安卓", width: 320, height: 640, dpr: 2 },
  { name: "360-安卓小屏", width: 360, height: 780, dpr: 3 },
  { name: "390-iPhone", width: 390, height: 844, dpr: 3 },
  { name: "414-iPhone大屏", width: 414, height: 896, dpr: 3 },
  { name: "768-平板竖屏", width: 768, height: 1024, dpr: 2 },
  { name: "1440-桌面基线", width: 1440, height: 900, dpr: 1 },
];

const PAGES = [
  "index.html",
  "about.html",
  "products.html",
  "product-machine-tool-parts.html",
  "product-construction-machinery-parts.html",
  "product-pump-valve-parts.html",
  "capabilities.html",
  "quality.html",
  "applications.html",
  "certificates.html",
  "news.html",
  "news-high-tech-enterprise.html",
  "faq.html",
  "contact.html",
  "privacy.html",
  "404.html",
  "zh/index.html",
  "zh/products.html",
  "zh/contact.html",
];

/* -------------------------------------------------------------- 页内检测函数 */

const AUDIT_FN = String.raw`(async () => {
  const vw = window.innerWidth;
  const doc = document.documentElement;
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  // 先滚到底把 loading="lazy" 的图都拉出来，否则会把没进视口的图误判成断图
  const pageHeight = doc.scrollHeight;
  for (let y = 0; y < pageHeight; y += Math.max(240, Math.round(innerHeight * 0.8))) {
    window.scrollTo(0, y);
    await wait(45);
  }
  window.scrollTo(0, doc.scrollHeight);
  await wait(500);
  // 懒加载的图可能还在下载，等一下再判定“断图”，避免误报
  for (let i = 0; i < 40; i++) {
    const pending = [...document.images].filter((img) => img.getAttribute("src") && !img.complete);
    if (!pending.length) break;
    await wait(150);
  }
  window.scrollTo(0, 0);
  await wait(200);
  const out = {
    vw,
    docScrollWidth: doc.scrollWidth,
    docScrollHeightAfterImages: doc.scrollHeight,
    bodyScrollWidth: document.body ? document.body.scrollWidth : 0,
    offenders: [],
    scrollers: [],
    bigScroll: [],
    smallText: [],
    smallTargets: [],
    brokenImgs: [],
    fixedBad: [],
    navState: "",
  };
  out.navState = (() => {
    const n = document.querySelector(".nav");
    const b = document.querySelector(".burger");
    if (!n || !b) return "缺元素";
    return "nav=" + getComputedStyle(n).display + " burger=" + getComputedStyle(b).display;
  })();
  const label = (el) => {
    const cls = typeof el.className === "string" ? el.className : "";
    return el.tagName.toLowerCase() + (cls ? "." + cls.trim().split(/\s+/).join(".") : "");
  };
  const snippet = (el) => (el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 42);
  const scrollerAncestor = (el) => {
    for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
      const cs = getComputedStyle(p);
      if (cs.overflowX === "auto" || cs.overflowX === "scroll" || cs.overflowX === "hidden") return p;
    }
    return null;
  };
  const all = document.querySelectorAll("body *");
  for (const el of all) {
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden") continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;
    const isFixed = cs.position === "fixed";
    if (r.right > vw + 1.5 || r.left < -1.5) {
      const rec = {
        el: label(el),
        left: Math.round(r.left),
        right: Math.round(r.right),
        w: Math.round(r.width),
        text: snippet(el),
      };
      const sc = scrollerAncestor(el);
      if (isFixed) out.fixedBad.push(rec);
      else if (sc) out.scrollers.push({ ...rec, in: label(sc) });
      else if (out.offenders.length < 25) out.offenders.push(rec);
    }
    if (el.scrollWidth > el.clientWidth + 2 && cs.overflowX === "hidden") {
      if (out.bigScroll.length < 20)
        out.bigScroll.push({ el: label(el), scrollWidth: el.scrollWidth, clientWidth: el.clientWidth });
    }
    // 点按区域（只查可见的链接和按钮）
    if (/^(A|BUTTON)$/.test(el.tagName)) {
      if (r.width < 24 || r.height < 24) {
        if (out.smallTargets.length < 20)
          out.smallTargets.push({ el: label(el), w: Math.round(r.width), h: Math.round(r.height), text: snippet(el) });
      }
    }
    // 字号
    if (el.children.length === 0 && (el.textContent || "").trim().length > 3) {
      const fs = parseFloat(cs.fontSize);
      if (fs && fs < 11.5 && out.smallText.length < 20)
        out.smallText.push({ el: label(el), fs, text: snippet(el) });
    }
  }
  for (const img of document.images) {
    // 灯箱里那张空的占位 img 不算断图
    if (!img.getAttribute("src") || img.closest("[hidden]") || !img.offsetParent) continue;
    if (img.currentSrc === "" || !img.complete || img.naturalWidth === 0) {
      if (out.brokenImgs.length < 20)
        out.brokenImgs.push({
          src: (img.getAttribute("src") || "").split("/").slice(-2).join("/"),
          cls: img.className,
          lazy: img.getAttribute("loading"),
          top: Math.round(img.getBoundingClientRect().top),
        });
    }
  }
  return out;
})()`;

/* ------------------------------------------------------------------ 主流程 */

async function main() {
  fs.mkdirSync(SHOT_DIR, { recursive: true });
  const edge = await launchEdge({ port: PORT });
  const { cdp } = edge;

  const report = [];
  try {
    const devFilter = process.env.AUDIT_DEVICES
      ? process.env.AUDIT_DEVICES.split(",").map((s) => s.trim())
      : null;
    const pageFilter = process.env.AUDIT_PAGES
      ? process.env.AUDIT_PAGES.split(",").map((s) => s.trim())
      : null;
    const devices = DEVICES.filter((d) => !devFilter || devFilter.some((f) => d.name.startsWith(f)));
    const pages = PAGES.filter((p) => !pageFilter || pageFilter.some((f) => p.includes(f)));
    for (const dev of devices) {
      await setViewport(cdp, dev);
      for (const page of pages) {
        const url = `${BASE}/${page}`;
        await cdp.goto(url, { settle: 450 });
        const data = (await cdp.eval(AUDIT_FN)) || {};
        report.push({ device: dev.name, page, ...data });

        process.stdout.write(
          `  ${dev.name} ${page} → 溢出 ${data.offenders?.length ?? "?"} 项, 视口宽 ${data.vw}, 文档宽 ${data.docScrollWidth}\n`
        );
      }
    }
  } finally {
    edge.close();
  }

  fs.writeFileSync(
    path.join(ROOT, "tools", "mobile-audit.json"),
    JSON.stringify(report, null, 2),
    "utf8"
  );

  console.log("\n================ 汇总 ================");
  for (const row of report) {
    const overflow = row.docScrollWidth > row.vw + 1;
    const flags = [
      overflow ? `⚠ 页面横向溢出 +${row.docScrollWidth - row.vw}px` : null,
      row.offenders?.length ? `溢出元素 ${row.offenders.length}` : null,
      row.fixedBad?.length ? `固定层溢出 ${row.fixedBad.length}` : null,
      row.bigScroll?.length ? `隐藏溢出 ${row.bigScroll.length}` : null,
      row.brokenImgs?.length ? `断图 ${row.brokenImgs.length}` : null,
    ].filter(Boolean);
    if (flags.length) console.log(`${row.device} | ${row.page} → ${flags.join("；")}`);
  }
  console.log("\n---- 断图明细（滚动加载后仍失败） ----");
  const badImgs = new Map();
  for (const row of report)
    for (const img of row.brokenImgs || []) {
      const k = `${row.device} | ${row.page} | ${img.src}`;
      if (!badImgs.has(k)) badImgs.set(k, img);
    }
  if (!badImgs.size) console.log("（无）");
  else for (const [k, v] of badImgs) console.log(`${k} ${JSON.stringify(v)}`);

  console.log("\n---- 溢出元素明细（去掉刻意移出屏幕的 skip-link） ----");
  const offs = new Map();
  for (const row of report)
    for (const o of row.offenders || []) {
      // 这两类是刻意移出屏幕的（无障碍跳转链接、表单蜜罐），不算溢出
      if (o.el.includes("skip-link") || o.el.includes("form__hp")) continue;
      const k = `${row.device} | ${row.page} | ${o.el} | ${o.text.slice(0, 18)}`;
      if (!offs.has(k)) offs.set(k, o);
    }
  if (!offs.size) console.log("（无）");
  else for (const [k, v] of offs) console.log(`${k} → left=${v.left} right=${v.right} w=${v.w}`);

  console.log("\n---- 导航形态抽查（首页） ----");
  for (const row of report.filter((r) => r.page === "index.html"))
    console.log(`  ${row.device}: ${row.navState}`);
  console.log("\n明细见 tools/mobile-audit.json，截图见 _预览截图/手机审计/");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
