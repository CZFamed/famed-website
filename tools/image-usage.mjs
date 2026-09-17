/* 站点图片使用情况：哪些图已经被页面用了、哪些图完全没用过。

   判定依据是**生成后的 HTML**，不是源码里的字面量——页面里的图大量是
   `gallery/factory-${n}`、`products/${slug}/${nn}` 这种循环生成的，
   只看源码会漏掉一大半。

   被 news_images.mjs（选图）和 check_site.mjs（校验）共用，避免两处判定不一致。 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** 可用于新闻配图的目录：排除 brand（品牌素材）、cert（证书扫描件）、
    news（新闻专用封面，一图一篇）、og（社交分享卡）*/
export const POOL_DIRS = ["process", "gallery", "featured", "products", "quality", "about", "banner", "hero"];

/** 政策上已停用的图：文件还在、四种规格也齐全，但业务上已明确不得再对外使用。
    放在这里是为了让"可选用"清单与构建检查同时生效——只靠人记会漏，
    2026-09-17 排查封面告急时就发现 quality/cmm 仍被脚本当作可用图。
    每一条都要写清停用原因与日期；恢复使用要连同原因一起删掉。 */
export const RETIRED = [
  {
    img: "quality/cmm",
    reason: "ZEISS 桥式三坐标（CMM）的表述与配图已按业务要求从全站与公司简介中全部删除，该图不得再出现在任何对外内容里",
    since: "2026-09-16",
  },
];

const RETIRED_MAP = new Map(RETIRED.map((r) => [r.img, r]));

/** 该图是否已被政策停用；停用则返回原因，否则返回空串。 */
export const retiredReason = (img) => RETIRED_MAP.get(img)?.reason || "";

/** 该图是否已被政策停用。 */
export const isRetired = (img) => RETIRED_MAP.has(img);

const SKIP_DIRS = ["assets", "tools", "node_modules", "_预览截图", "_素材审阅", ".git", ".wrangler", ".github"];

/** 站点页面用到的图：img 路径 → 用到它的页面集合（新闻详情页不算，否则文章自己的配图会自锁） */
export function siteUsage() {
  const pages = [];
  const collect = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory()) {
        if (SKIP_DIRS.includes(e.name)) continue;
        collect(path.join(dir, e.name));
      } else if (e.name.endsWith(".html")) {
        pages.push(path.join(dir, e.name));
      }
    }
  };
  collect(ROOT);

  const used = new Map();
  const re = new RegExp(`(?:assets/)?img/((?:${POOL_DIRS.join("|")})/[A-Za-z0-9_./-]+?)(-t)?\\.(?:jpg|webp)`, "g");
  for (const page of pages) {
    const base = path.basename(page);
    if (/^news-[a-z0-9-]+\.html$/.test(base)) continue;
    const rel = path.relative(ROOT, page).replace(/\\/g, "/");
    let html = fs.readFileSync(page, "utf8");
    /* 首页与新闻列表页里有"新闻条目"区块，它引用的是新闻自己的封面图。
       这里先把这些条目剥掉，否则文章封面会被算成"站内页面已用"，下一篇再也选不到图。 */
    if (base === "index.html" || base === "news.html") {
      html = html.replace(/<article class="news__item"[\s\S]*?<\/article>/g, "");
    }
    for (const m of html.matchAll(re)) {
      if (!used.has(m[1])) used.set(m[1], new Set());
      used.get(m[1]).add(rel);
    }
  }
  return used;
}

/** 素材库里所有可用于新闻的成品图（带画面描述）。
    只收录 4 个规格齐全的图（.jpg/.webp 与缩略图 -t 版），否则页面里的卡片会用不了。
    已被政策停用的图（见 RETIRED）直接排除，避免周更再选到它们。 */
export function pool() {
  const manifest = path.join(ROOT, "assets", "img", "manifest.json");
  const raw = JSON.parse(fs.readFileSync(manifest, "utf8"));
  return raw.items
    .filter((it) => POOL_DIRS.includes(it.out.split("/")[0]))
    .filter((it) => !RETIRED_MAP.has(it.out))
    .filter((it) => ["", "-t"].every((suffix) => ["jpg", "webp"].every((ext) =>
      fs.existsSync(path.join(ROOT, "assets", "img", `${it.out}${suffix}.${ext}`)))))
    .map((it) => ({ img: it.out, desc: it.rag_description || "", size: it.out_size || "" }))
    .sort((a, b) => a.img.localeCompare(b.img));
}
