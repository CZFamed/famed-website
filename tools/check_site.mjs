/* 部署前完整性检查：拦下"引用指向不存在的资源"这类静默损坏。

   背景：SVG 的 <use href="#x"> 指向未定义的 <symbol> 时，浏览器不报错、不告警，
   只渲染成空白（首页「为什么选择」三格图标就踩过这个坑）。这类问题在页面上
   表现为"看起来只是少了点东西"，很难靠肉眼发现，所以放在部署前自动挡一道。

   用法：node tools/check_site.mjs
   有任何一项不通过就以退出码 1 结束（GitHub Actions 会因此中断部署）。
*/

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { NEWS, NEWS_META, LIVE_NEWS, SCHEDULED_NEWS, DRAFT_NEWS, publishDate, sourcesOf } from "./news.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const problems = [];
const notes = [];

/* ------------------------------------------------------------ 收集页面 */

function listHtml(dir = ROOT, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if ([".git", ".github", "tools", "_素材审阅", "_预览截图", "node_modules"].includes(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) listHtml(p, acc);
    else if (e.name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

const pages = listHtml().sort();
const rel = (p) => path.relative(ROOT, p).replace(/\\/g, "/");

/* ------------------------------------------- 检查 1：SVG sprite 引用完整性 */

const spriteSets = new Map();

for (const page of pages) {
  const html = fs.readFileSync(page, "utf8");
  const ids = new Set([...html.matchAll(/<symbol[^>]*\sid="([^"]+)"/g)].map((m) => m[1]));
  const refs = [...html.matchAll(/<use\s[^>]*href="#([^"]+)"/g)].map((m) => m[1]);

  for (const r of [...new Set(refs)]) {
    if (!ids.has(r)) problems.push(`${rel(page)} 引用了未定义的 SVG 符号 #${r}`);
  }

  // 同一页里 symbol 不应重复定义
  const all = [...html.matchAll(/<symbol[^>]*\sid="([^"]+)"/g)].map((m) => m[1]);
  const dup = all.filter((x, i) => all.indexOf(x) !== i);
  if (dup.length) problems.push(`${rel(page)} sprite 里有重复定义的符号：${[...new Set(dup)].join(", ")}`);

  spriteSets.set(rel(page), [...ids].sort().join(","));
}

// 各页 sprite 内容应完全一致（防止个别页面停留在旧版本生成结果）
const distinct = new Map();
for (const [page, set] of spriteSets) {
  if (!distinct.has(set)) distinct.set(set, []);
  distinct.get(set).push(page);
}
if (distinct.size > 1) {
  const sizes = [...distinct.entries()].map(([s, ps]) => `${s.split(",").length} 个符号（${ps.length} 页：${ps.slice(0, 3).join("、")}${ps.length > 3 ? " 等" : ""}）`);
  problems.push(`各页 sprite 不一致：${sizes.join("；")}——通常是有页面忘了重新生成`);
} else {
  notes.push(`共 ${pages.length} 个页面，每页 sprite 均为 ${[...spriteSets.values()][0].split(",").length} 个符号，且各页完全一致`);
}

/* ------------------------------------------------- 检查 2：本地引用是否存在 */

const SKIP = /^(https?:)?\/\/|^(mailto|tel|data|javascript):|^#/i;

function resolveTarget(page, raw) {
  const clean = raw.split("#")[0].split("?")[0];
  if (!clean || SKIP.test(raw) || SKIP.test(clean)) return null;
  let p = decodeURIComponent(clean);
  const base = p.startsWith("/") ? ROOT : path.dirname(page);
  return path.resolve(base, p.replace(/^\//, ""));
}

function exists(target) {
  try {
    const st = fs.statSync(target);
    if (st.isFile()) return true;
    if (st.isDirectory()) return fs.existsSync(path.join(target, "index.html"));
  } catch {
    // 目录路径常省略 .html，例如 /zh/quality
  }
  return fs.existsSync(target + ".html");
}

let refCount = 0;
for (const page of pages) {
  const html = fs.readFileSync(page, "utf8");
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const target = resolveTarget(page, m[1]);
    if (!target) continue;
    refCount++;
    if (!exists(target)) problems.push(`${rel(page)} 引用了不存在的本地文件：${m[1]}`);
  }

  /* srcset 里的每个候选（"路径 800w" / "路径 2x"）也要存在。
     注意：<source> 只能在 type 不受支持时回退到 <img>，404 不会回退，
     所以 srcset 指向的文件缺失会直接表现为"图片不显示"。 */
  for (const m of html.matchAll(/srcset="([^"]+)"/g)) {
    for (const part of m[1].split(",")) {
      const url = part.trim().split(/\s+/)[0];
      if (!url) continue;
      const target = resolveTarget(page, url);
      if (!target) continue;
      refCount++;
      if (!exists(target)) problems.push(`${rel(page)} 的 srcset 引用了不存在的本地文件：${url}`);
    }
  }
}
notes.push(`页面内共检查 ${refCount} 处本地链接 / 资源引用（含 srcset 候选）`);

/* --------------------------------------------- 检查 3：CSS 里的图片是否存在 */

let cssRefs = 0;
const cssDir = path.join(ROOT, "assets", "css");
if (fs.existsSync(cssDir)) {
  for (const f of fs.readdirSync(cssDir).filter((n) => n.endsWith(".css"))) {
    const file = path.join(cssDir, f);
    const text = fs.readFileSync(file, "utf8");
    for (const m of text.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)) {
      const target = resolveTarget(file, m[1]);
      if (!target) continue;
      cssRefs++;
      if (!exists(target)) problems.push(`assets/css/${f} 引用了不存在的文件：${m[1]}`);
    }
  }
}
notes.push(`CSS 内共检查 ${cssRefs} 处 url() 引用`);

/* ------------------------------------- 检查 4：新闻数据（含行业动态的来源） */

/* 行业动态是"AI 采编 + 人工过审"产出的，最容易出的错是：漏来源、漏一种语言、
   引用到不存在的配图。这些错在页面上不显眼，所以放在部署前统一挡一道。 */

const seenSlugs = new Set();
let industryCount = 0;

for (const n of NEWS) {
  const where = `tools/news.mjs → ${n.slug || "(缺少 slug)"}`;

  if (!n.slug || !/^[a-z0-9-]+$/.test(n.slug)) {
    problems.push(`${where}：slug 只能是小写字母、数字和连字符（它直接拼进文件名）`);
    continue;
  }
  if (seenSlugs.has(n.slug)) problems.push(`${where}：slug 重复`);
  seenSlugs.add(n.slug);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(n.date || "")) problems.push(`${where}：date 必须是 YYYY-MM-DD`);
  if (n.publishAt && !/^\d{4}-\d{2}-\d{2}$/.test(n.publishAt)) problems.push(`${where}：publishAt 必须是 YYYY-MM-DD`);
  if (n.draft === true) continue; /* 草稿：只要求 slug 不撞车，正文可以还没写完 */
  if (!NEWS_META.categoryLabel[n.category]) problems.push(`${where}：category「${n.category}」不在 NEWS_META.categoryLabel 里`);

  for (const field of ["title", "summary", "dateText"]) {
    for (const lang of ["en", "zh"]) {
      if (!n[field] || !n[field][lang]) problems.push(`${where}：${field}.${lang} 缺失（生成器要求中英双语齐全）`);
    }
  }

  if (!Array.isArray(n.body) || !n.body.length) {
    problems.push(`${where}：body 为空`);
  } else {
    n.body.forEach((p, i) => {
      for (const lang of ["en", "zh"]) {
        if (!p[lang]) problems.push(`${where}：body 第 ${i + 1} 段缺 ${lang}`);
      }
    });
  }

  for (const ext of [".jpg", ".webp", "-t.jpg", "-t.webp"]) {
    if (!n.image || !fs.existsSync(path.join(ROOT, "assets", "img", n.image + ext))) {
      problems.push(`${where}：顶部大图 assets/img/${n.image}${ext} 不存在`);
      break;
    }
  }

  (n.figures || []).forEach((f, i) => {
    if (!f.img || !fs.existsSync(path.join(ROOT, "assets", "img", f.img + ".jpg"))) {
      problems.push(`${where}：第 ${i + 1} 张正文配图 assets/img/${f.img}.jpg 不存在`);
    }
    if (!(f.after >= 1)) problems.push(`${where}：第 ${i + 1} 张正文配图的 after 必须是 ≥1 的整数`);
    for (const lang of ["en", "zh"]) {
      if (!f.caption || !f.caption[lang]) problems.push(`${where}：第 ${i + 1} 张正文配图缺 caption.${lang}`);
    }
  });

  const srcs = sourcesOf(n);

  if (n.category === "industry") {
    industryCount++;
    if (!srcs.length) problems.push(`${where}：行业动态必须写 source（来源名称与链接）`);
    for (const s of srcs) {
      if (!s.name) problems.push(`${where}：来源缺 name（来源名称）`);
      if (!/^https?:\/\//.test(s.url || "")) problems.push(`${where}：来源「${s.name || "未署名"}」缺可核对的 url（http/https 链接）`);
    }
  } else {
    for (const s of srcs) {
      if (!/^https?:\/\//.test(s.url || "")) problems.push(`${where}：source.url 必须是 http/https 链接`);
    }
  }
}

for (const f of ["feed.xml", "zh/feed.xml"]) {
  if (!fs.existsSync(path.join(ROOT, f))) problems.push(`缺少 ${f}——生成后忘记提交？跑一次 node tools/generate_site.mjs`);
}

notes.push(`新闻数据：已发布 ${LIVE_NEWS.length} 篇、排期中 ${SCHEDULED_NEWS.length} 篇、草稿 ${DRAFT_NEWS.length} 篇，其中行业动态 ${industryCount} 篇`);
if (SCHEDULED_NEWS.length) {
  notes.push(`最近一篇排期：${SCHEDULED_NEWS[0].slug} → ${publishDate(SCHEDULED_NEWS[0])} 到期后重新生成即上线`);
}

/* ------------------------------------------- 检查 5：配图冷却 */

/* 周更每周要挑 3 张图，靠人记"这张上个月用过没有"必然重复。
   规则：同一张图在两篇文章之间要间隔冷却期（默认 180 天）；同一篇里也不允许重复。
   记录由 node tools/news_images.mjs --sync 从新闻数据重建，这里只做校验，防止漏同步。 */

const COOLDOWN_FILE = path.join(ROOT, "tools", "image-cooldown.json");
const dayGap = (a, b) => {
  const ms = (s) => {
    const [y, m, d] = s.split("-").map(Number);
    return Date.UTC(y, m - 1, d);
  };
  return Math.round((ms(a) - ms(b)) / 86400000);
};

if (!fs.existsSync(COOLDOWN_FILE)) {
  problems.push("缺少 tools/image-cooldown.json——跑一次 node tools/news_images.mjs --sync");
} else {
  const reg = JSON.parse(fs.readFileSync(COOLDOWN_FILE, "utf8"));
  const windowDays = reg.windowDays || 180;

  /* 从新闻数据算出"实际用图"，再和记录比对，防止记录与内容脱节 */
  const actual = [];
  for (const n of NEWS) {
    if (n.draft === true) continue;
    const used = publishDate(n);
    if (n.image) actual.push({ img: n.image, slug: n.slug, role: "cover", date: used });
    (n.figures || []).forEach((f, i) => {
      if (f.img) actual.push({ img: f.img, slug: n.slug, role: `figure-${i + 1}`, date: used });
    });
  }

  const rowKey = (r) => `${r.img}|${r.slug}|${r.role}|${r.date}`;
  const regKeys = new Set((reg.entries || []).map(rowKey));
  const actKeys = new Set(actual.map(rowKey));
  const missing = actual.filter((r) => !regKeys.has(rowKey(r)));
  const stale = (reg.entries || []).filter((r) => !actKeys.has(rowKey(r)));
  if (missing.length) {
    problems.push(`image-cooldown.json 缺 ${missing.length} 条记录（${missing.slice(0, 3).map((r) => r.img).join("、")}…）——跑 node tools/news_images.mjs --sync`);
  }
  if (stale.length) {
    problems.push(`image-cooldown.json 有 ${stale.length} 条已失效的记录（${stale.slice(0, 3).map((r) => r.img).join("、")}…）——跑 node tools/news_images.mjs --sync`);
  }

  /* 冷却期内的重复使用 */
  const byImg = new Map();
  for (const r of actual) {
    if (!byImg.has(r.img)) byImg.set(r.img, []);
    byImg.get(r.img).push(r);
  }
  const hits = [];
  for (const [img, rows] of byImg) {
    const slugs = [...new Set(rows.map((r) => r.slug))];
    if (slugs.length === 1) {
      if (rows.length > 1) hits.push(`${img}：在《${slugs[0]}》里用了 ${rows.length} 次（${rows.map((r) => r.role).join("、")}）`);
      continue;
    }
    rows.sort((a, b) => a.date.localeCompare(b.date));
    for (let i = 1; i < rows.length; i++) {
      const gap = dayGap(rows[i].date, rows[i - 1].date);
      if (gap < windowDays) {
        hits.push(`${img}：《${rows[i - 1].slug}》(${rows[i - 1].date}) 与《${rows[i].slug}》(${rows[i].date}) 只间隔 ${gap} 天，小于冷却期 ${windowDays} 天`);
      }
    }
  }
  for (const h of hits) problems.push(`配图冷却冲突：${h}`);

  notes.push(`配图冷却：${reg.entries.length} 条用图记录，冷却期 ${windowDays} 天${hits.length ? "" : "，无重复"}`);
}

/* -------------------------------------------------------------- 输出结果 */

console.log(`检查目录：${ROOT}`);
for (const n of notes) console.log("  · " + n);

if (problems.length) {
  console.log(`\n发现 ${problems.length} 个问题：`);
  for (const p of problems) console.log("  ✗ " + p);
  process.exitCode = 1;
} else {
  console.log("\n全部通过：没有未定义的图标引用，也没有指向缺失文件的链接。");
}
