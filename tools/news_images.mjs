/* 新闻配图冷却：同一张图在冷却期内不要在两篇文章里重复出现。

   为什么需要它：周更意味着每周要挑 3 张图（1 张封面 + 2 张正文配图），
   靠人记"这张上周用过没有"必然会重复；这个脚本把"谁什么时候用过"变成可查的数据。

   用法（在本目录下）：
     node tools/news_images.mjs                    # 看冷却中的图 + 当前可用的图
     node tools/news_images.mjs --filter=浇注       # 只看描述里带关键词的可用图
     node tools/news_images.mjs --limit=40         # 可用清单最多列多少张（默认 30）
     node tools/news_images.mjs --days=180         # 覆盖冷却期（默认取 image-cooldown.json 里的值）
     node tools/news_images.mjs --include-site     # 连"站点其他页面已用"的图一起列出
     node tools/news_images.mjs --sync             # 新增/修改文章后重建冷却记录（改完新闻跑一次）

   冷却记录的来源有两个，都不需要手写：
     1) tools/news.mjs 里的新闻条目（封面 image + 正文 figures）→ 自动同步进 image-cooldown.json
     2) 站点其他页面引用过的图（页面 banner、产品图、证书页等）→ 扫描 tools/*.mjs 得到，只作提示

   "可选用"清单还会自动排除两类图：
      · 冷却期内的图（上面第 1 条）
      · 已被政策停用的图（tools/image-usage.mjs 的 RETIRED，如已删除 ZEISS 表述的 quality/cmm）
*/

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { NEWS, sourcesOf, publishDate } from "./news.mjs";
import { siteUsage, pool as imagePool, RETIRED } from "./image-usage.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REGISTRY = path.join(ROOT, "tools", "image-cooldown.json");

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const value = (name, fallback) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
};

const today = () => {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

const addDays = (dateStr, days) => {
  const [y, m, d] = dateStr.split("-").map(Number);
  const t = new Date(Date.UTC(y, m - 1, d + days));
  const p = (n) => String(n).padStart(2, "0");
  return `${t.getUTCFullYear()}-${p(t.getUTCMonth() + 1)}-${p(t.getUTCDate())}`;
};

const dayDiff = (a, b) => {
  const ms = (s) => {
    const [y, m, d] = s.split("-").map(Number);
    return Date.UTC(y, m - 1, d);
  };
  return Math.round((ms(a) - ms(b)) / 86400000);
};

/* ------------------------------------------- 新闻里实际用到的图 */

function newsUsage() {
  const rows = [];
  for (const n of NEWS) {
    if (n.draft === true) continue; /* 草稿未上线，不占冷却位 */
    const used = publishDate(n);
    if (n.image) rows.push({ img: n.image, slug: n.slug, role: "cover", date: used });
    (n.figures || []).forEach((f, i) => {
      if (f.img) rows.push({ img: f.img, slug: n.slug, role: `figure-${i + 1}`, date: used });
    });
  }
  return rows.sort((a, b) => a.date.localeCompare(b.date) || a.img.localeCompare(b.img));
}

/* ------------------------------------------------------- 冷却记录 */

function readRegistry() {
  if (!fs.existsSync(REGISTRY)) return { windowDays: 180, generated: null, entries: [] };
  return JSON.parse(fs.readFileSync(REGISTRY, "utf8"));
}

function writeRegistry(windowDays) {
  const entries = newsUsage();
  const payload = {
    windowDays,
    note: "由 node tools/news_images.mjs --sync 从 tools/news.mjs 自动生成，不要手改。",
    generated: today(),
    entries,
  };
  fs.writeFileSync(REGISTRY, JSON.stringify(payload, null, 2) + "\n", "utf8");
  return payload;
}

const pool = imagePool;

/* --------------------------------------------------------------- 主流程 */

const windowDays = Number(value("days", readRegistry().windowDays || 180));

if (flag("sync")) {
  const before = readRegistry().entries.length;
  const payload = writeRegistry(windowDays);
  console.log(`冷却记录已重建：tools/image-cooldown.json`);
  console.log(`  冷却期 ${payload.windowDays} 天 ｜ 记录 ${before} → ${payload.entries.length} 条 ｜ 生成日期 ${payload.generated}`);
  process.exit(0);
}

const reg = readRegistry();
const now = today();
const site = siteUsage();
const usageByImg = new Map();
for (const row of reg.entries) {
  if (!usageByImg.has(row.img)) usageByImg.set(row.img, []);
  usageByImg.get(row.img).push(row);
}

/* 冷却中的图：最后一次使用 + windowDays 还没到 */
const cooling = [];
for (const [img, rows] of usageByImg) {
  const last = rows.reduce((a, b) => (a.date >= b.date ? a : b));
  const until = addDays(last.date, windowDays);
  if (dayDiff(until, now) > 0) cooling.push({ img, last, until, days: dayDiff(until, now) });
}
cooling.sort((a, b) => b.days - a.days);

console.log(`冷却状态（今天 ${now}，冷却期 ${windowDays} 天，记录 ${reg.entries.length} 条）`);
console.log(`\n■ 冷却中 ${cooling.length} 张（再次使用需等到解禁日）`);
for (const c of cooling) {
  console.log(`  ${c.img.padEnd(34)} 用过：${c.last.slug}（${c.last.role} ${c.last.date}）· 解禁 ${c.until} · 还剩 ${c.days} 天`);
}

const coolingSet = new Set(cooling.map((c) => c.img));
const filter = value("filter", "");
const limit = Number(value("limit", 30));
const includeSite = flag("include-site");

const items = pool().filter((p) => {
  if (coolingSet.has(p.img)) return false;
  if (!includeSite && site.has(p.img)) return false;
  if (filter && !p.desc.includes(filter) && !p.img.includes(filter)) return false;
  return true;
});

console.log(`\n■ 可选用 ${items.length} 张${filter ? `（筛选：${filter}）` : ""}${includeSite ? "（含站点其他页面已用的图）" : "（已排除站点其他页面已用的图）"}`);
for (const p of items.slice(0, limit)) {
  console.log(`  ${p.img.padEnd(34)} ${p.size.padEnd(9)} ${p.desc}`);
}
if (items.length > limit) console.log(`  … 还有 ${items.length - limit} 张，用 --limit= 调整`);

if (RETIRED.length) {
  console.log(`\n■ 已停用 ${RETIRED.length} 张（政策上不得再对外使用，永远不会进"可选用"清单）`);
  for (const r of RETIRED) {
    console.log(`  ${r.img.padEnd(34)} 停用自 ${r.since} · ${r.reason}`);
  }
}

if (!flag("quiet")) {
  console.log(`\n选图提示：先看上面的"可选用"清单，用 rag_description 判断画面是否贴近文章内容；`);
  console.log(`新增文章后记得跑 node tools/news_images.mjs --sync 更新冷却记录（check_site 会校验是否漏了）。`);
}
