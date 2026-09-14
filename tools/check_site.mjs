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

/* ------------------------------------------- 检查 4：sitemap 与页面是否对应 */

const sitemap = path.join(ROOT, "sitemap.xml");
if (!fs.existsSync(sitemap)) {
  problems.push("缺少 sitemap.xml");
} else {
  const xml = fs.readFileSync(sitemap, "utf8");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  const strip = (u) => decodeURIComponent(u.replace(/^https?:\/\/[^/]+/, "").replace(/^\//, ""));
  const listed = new Set(locs.map(strip));

  // 页面里唯一不在 sitemap 中的是 404.html，这是正常的
  for (const page of pages) {
    const p = rel(page);
    if (p === "404.html" || p === "zh/404.html") continue;
    if (!listed.has(p)) problems.push(`sitemap.xml 里没有 ${p}`);
  }
  for (const l of listed) {
    if (!fs.existsSync(path.join(ROOT, l))) problems.push(`sitemap.xml 里列了磁盘上不存在的 ${l}`);
  }
  notes.push(`sitemap.xml 收录 ${listed.size} 个地址，与磁盘上的页面一一对应`);
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
