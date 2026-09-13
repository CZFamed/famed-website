/**
 * 手机端交互体检（开发用，不随站点上线）。
 *
 * 在 320 / 390 两种手机宽度下，用无头 Edge 实际点一遍移动端才用到的交互：
 *   汉堡菜单（抽屉）开关、抽屉是否超出屏幕、图片灯箱、FAQ 手风琴、
 *   询盘表单空值校验、Cookie 条、页内锚点导航横滑。
 *
 * 运行：
 *   node tools/serve.mjs 5173      # 另开一个终端
 *   node tools/audit_mobile_ui.mjs
 */
import { launchEdge, setViewport, sleep } from "./cdp-edge.mjs";

const BASE = process.env.AUDIT_BASE || "http://localhost:5173";
const PORT = 9334;

const results = [];
function check(name, pass, detail = "") {
  results.push({ name, pass, detail });
  console.log(`${pass ? "[通过]" : "[失败]"} ${name}${detail ? " — " + detail : ""}`);
}

const el = (sel) => `document.querySelector(${JSON.stringify(sel)})`;

async function rect(cdp, sel) {
  return cdp.eval(
    `(() => { const e = ${el(sel)}; if (!e) return null;
      const r = e.getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height), l: Math.round(r.left), rt: Math.round(r.right) }; })()`
  );
}

async function run(cdp, device) {
  await setViewport(cdp, device);
  const label = device.name;

  /* ------------------------------- 先确认布局视口没被内容撑宽（小屏最常见的毛病） */
  await cdp.goto(`${BASE}/index.html`);
  const viewport = await cdp.eval(
    `(() => ({ inner: window.innerWidth, doc: document.documentElement.scrollWidth }))()`
  );
  check(`${label} 布局视口宽 = 设备宽（页面没把视口撑宽）`,
    viewport.inner === device.width && viewport.doc <= device.width,
    `innerWidth ${viewport.inner}，文档宽 ${viewport.doc}，设备宽 ${device.width}`);

  /* ---------------------------------------------------- 首页：汉堡菜单（抽屉） */
  await cdp.eval(`${el(".burger")}.click()`);
  await sleep(350);
  const drawerOpen = await cdp.eval(
    `(() => { const d = document.getElementById("drawer"); const s = getComputedStyle(d);
      return { hidden: d.hidden, display: s.display, locked: document.body.classList.contains("is-locked"),
               links: d.querySelectorAll("a").length, sw: d.scrollWidth, cw: d.clientWidth }; })()`
  );
  check(`${label} 汉堡按钮能打开抽屉`,
    !drawerOpen.hidden && drawerOpen.display === "flex" && drawerOpen.links >= 10,
    `抽屉内链接 ${drawerOpen.links} 个，display=${drawerOpen.display}`);
  check(`${label} 抽屉打开时锁住背景滚动`, drawerOpen.locked === true);
  check(`${label} 抽屉本身不横向溢出`, drawerOpen.sw <= drawerOpen.cw + 1,
    `scrollWidth ${drawerOpen.sw} / clientWidth ${drawerOpen.cw}`);

  const drawerLink = await rect(cdp, ".drawer__link");
  check(`${label} 抽屉条目点按区域 ≥44px`, Boolean(drawerLink && drawerLink.h >= 44),
    drawerLink ? `${drawerLink.w}×${drawerLink.h}` : "取不到");

  const drawerCta = await cdp.eval(`${el(".drawer__foot")} ? ${el(".drawer__foot")}.innerText.replace(/\\s+/g, " ").trim().slice(0, 40) : ""`);
  check(`${label} 抽屉底部保留转化入口`, Boolean(drawerCta), drawerCta);

  await cdp.eval(`${el(".drawer__close")}.click()`);
  await sleep(250);
  const drawerClosed = await cdp.eval(
    `(() => { const d = document.getElementById("drawer");
      return { hidden: d.hidden, locked: document.body.classList.contains("is-locked") }; })()`
  );
  check(`${label} 抽屉能关闭并解除滚动锁`, drawerClosed.hidden === true && drawerClosed.locked === false);

  /* ---------------------------------------------- 产品页：图片灯箱（手机看大图） */
  await cdp.goto(`${BASE}/product-pump-valve-parts.html`);
  const galleryCount = await cdp.eval(`document.querySelectorAll("[data-lb-src]").length`);
  if (galleryCount > 0) {
    await cdp.eval(`${el("[data-lb-src]")}.click()`);
    await sleep(400);
    const lb = await cdp.eval(
      `(() => { const box = document.getElementById("lightbox"); const img = box.querySelector("[data-lb-img]");
        const r = img.getBoundingClientRect();
        return { hidden: box.hidden, imgW: Math.round(r.width), imgH: Math.round(r.height),
                 hasSrc: Boolean(img.getAttribute("src")), natural: img.naturalWidth }; })()`
    );
    check(`${label} 点图能打开灯箱且图已加载`, !lb.hidden && lb.hasSrc && lb.natural > 0,
      `显示宽 ${lb.imgW}px，原图 ${lb.natural}px`);
    check(`${label} 灯箱大图不超出屏宽`, lb.imgW <= device.width, `${lb.imgW} ≤ ${device.width}`);
    const closeBox = await rect(cdp, ".lightbox__close");
    check(`${label} 灯箱关闭按钮点按区域 ≥40px`,
      Boolean(closeBox && closeBox.w >= 40 && closeBox.h >= 40),
      closeBox ? `${closeBox.w}×${closeBox.h}` : "取不到");
    await cdp.eval(`${el(".lightbox__close")}.click()`);
    await sleep(250);
    const lbClosed = await cdp.eval(`${el("#lightbox")}.hidden`);
    check(`${label} 灯箱能关闭`, lbClosed === true);
  } else {
    check(`${label} 灯箱`, false, "页面上没有可点开的图");
  }

  /* ----------------------------------------------------------------- FAQ 手风琴 */
  await cdp.goto(`${BASE}/faq.html`);
  const accInitial = await cdp.eval(`document.querySelectorAll('.acc__item[data-open="true"]').length`);
  // 第 1 条默认是展开的，这里点它后面那条没展开的
  const closedIdx = await cdp.eval(
    `(() => { const items = [...document.querySelectorAll(".acc__item")];
      return items.findIndex((it) => it.getAttribute("data-open") !== "true"); })()`
  );
  await cdp.eval(
    `(() => { const items = [...document.querySelectorAll(".acc__item")];
      items[${closedIdx}].querySelector(".acc__q").click(); })()`
  );
  await sleep(350);
  const accAfter = await cdp.eval(
    `(() => { const it = [...document.querySelectorAll(".acc__item")][${closedIdx}];
      const a = it.querySelector(".acc__a");
      return { open: it.getAttribute("data-open"), visible: a ? a.offsetHeight > 20 : false,
               text: a ? a.innerText.replace(/\\s+/g, " ").slice(0, 26) : "" }; })()`
  );
  check(`${label} FAQ 手风琴能展开答案`,
    accInitial >= 1 && closedIdx >= 0 && accAfter.open === "true" && accAfter.visible, accAfter.text);

  /* ---------------------------------------------------------------- 询盘表单校验 */
  await cdp.goto(`${BASE}/contact.html`);
  await cdp.eval(
    `(() => { const f = document.querySelector("form");
      f.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true })); })()`
  );
  await sleep(450);
  const formState = await cdp.eval(
    `(() => { const s = document.querySelector(".form__status");
      return { status: s ? s.innerText.replace(/\\s+/g, " ").trim().slice(0, 40) : "",
               cls: s ? s.className : "",
               invalid: document.querySelectorAll(".form__input.is-invalid").length }; })()`
  );
  check(`${label} 空表单提交给出必填提示`,
    formState.invalid >= 2 && /is-err|is-ok/.test(formState.cls || ""),
    `${formState.invalid} 个字段标红：「${formState.status}」`);

  const inputBox = await rect(cdp, ".form__input");
  check(`${label} 表单输入框高度 ≥44px`, Boolean(inputBox && inputBox.h >= 44),
    inputBox ? `${inputBox.w}×${inputBox.h}` : "取不到");

  /* ------------------------------------------------------------- Cookie 同意条 */
  const cookie = await cdp.eval(
    `(() => { const c = document.querySelector(".cookies"); if (!c || c.hidden) return null;
      const r = c.getBoundingClientRect();
      return { l: Math.round(r.left), rt: Math.round(r.right) }; })()`
  );
  if (cookie) {
    check(`${label} Cookie 条不超出屏宽`, cookie.l >= 0 && cookie.rt <= device.width,
      `left ${cookie.l} / right ${cookie.rt}（屏宽 ${device.width}）`);
  }

  /* ------------------------------------------------- 产品页页内锚点导航（横滑） */
  await cdp.goto(`${BASE}/product-machine-tool-parts.html`);
  const subnav = await cdp.eval(
    `(() => { const s = document.querySelector(".subnav__inner"); if (!s) return null;
      const a = s.querySelector("a");
      return { scrollable: s.scrollWidth > s.clientWidth + 1, links: s.querySelectorAll("a").length,
               linkH: a ? Math.round(a.getBoundingClientRect().height) : 0 }; })()`
  );
  if (subnav) {
    check(`${label} 产品页锚点导航可横向滑动`,
      subnav.scrollable === true && subnav.links >= 3,
      `${subnav.links} 个锚点，条目高 ${subnav.linkH}px`);
  }
}

const { cdp, close } = await launchEdge({ port: PORT });
const devices = [
  { name: "320-小屏安卓", width: 320, height: 640, dpr: 2 },
  { name: "390-iPhone", width: 390, height: 844, dpr: 3 },
];
try {
  for (const device of devices) await run(cdp, device);
} finally {
  close();
}

const failed = results.filter((r) => !r.pass);
console.log(`\n合计 ${results.length} 项，通过 ${results.length - failed.length} 项，未通过 ${failed.length} 项`);
for (const f of failed) console.log(`  [失败] ${f.name}${f.detail ? " — " + f.detail : ""}`);
if (failed.length) process.exitCode = 1;
