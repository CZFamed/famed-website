/**
 * 手机端整页截图（开发用，不随站点上线）。
 *
 * 每张图都单独起一个无头 Edge：先把页面滚到底触发 loading="lazy" 的图，
 * 等图片解码完成后把视口高度设成整页高度，再截整页。
 * 输出到 _预览截图\，文件名形如 手机-01-首页.jpg。
 *
 * 运行：
 *   node tools/serve.mjs 5173        # 另开一个终端
 *   node tools/shots_mobile.mjs      # 之后重跑会直接覆盖同名截图
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { launchEdge, setViewport, sleep } from "./cdp-edge.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "_预览截图");
const BASE = process.env.AUDIT_BASE || "http://localhost:5173";

/** [输出文件名前缀, 页面, 设备宽, 设备高] */
const SHOTS = [
  ["手机-01-首页", "index.html", 390, 844],
  ["手机-02-产品中心", "products.html", 390, 844],
  ["手机-03-产品-泵阀壳体", "product-pump-valve-parts.html", 390, 844],
  ["手机-04-制造能力", "capabilities.html", 390, 844],
  ["手机-05-质量控制", "quality.html", 390, 844],
  ["手机-06-资质荣誉", "certificates.html", 390, 844],
  ["手机-07-常见问题", "faq.html", 390, 844],
  ["手机-08-联系我们", "contact.html", 390, 844],
  ["手机-09-中文首页", "zh/index.html", 390, 844],
  ["手机-10-小屏320首页", "index.html", 320, 640],
];

const MAX_HEIGHT = 16000;

const PREP = String.raw`(async () => {
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const doc = document.documentElement;
  for (let y = 0; y < doc.scrollHeight; y += Math.max(240, Math.round(innerHeight * 0.75))) {
    window.scrollTo(0, y);
    await wait(50);
  }
  window.scrollTo(0, doc.scrollHeight);
  await wait(400);
  await Promise.all([...document.images].map((i) => i.decode().catch(() => {})));
  window.scrollTo(0, 0);
  await wait(250);
  return doc.scrollHeight;
})()`;

fs.mkdirSync(OUT_DIR, { recursive: true });

for (const [name, page, width, height] of SHOTS) {
  const port = 9400 + Math.floor(Math.random() * 400);
  const { cdp, close } = await launchEdge({ port });
  try {
    await setViewport(cdp, { width, height, dpr: 2, mobile: true });
    await cdp.goto(`${BASE}/${page}`, { settle: 700 });
    const full = await cdp.eval(PREP);
    const shotHeight = Math.min(full, MAX_HEIGHT);
    await setViewport(cdp, { width, height: shotHeight, dpr: 2, mobile: true });
    await sleep(400);
    const shot = await cdp.send(
      "Page.captureScreenshot",
      { format: "jpeg", quality: 72 },
      120000
    );
    const file = path.join(OUT_DIR, `${name}.jpg`);
    fs.writeFileSync(file, Buffer.from(shot.data, "base64"));
    console.log(
      `${name}.jpg  ${width}×${shotHeight}  ${Math.round(fs.statSync(file).size / 1024)} KB`
    );
  } catch (err) {
    console.error(`${name} 截图失败：${err.message}`);
    process.exitCode = 1;
  } finally {
    close();
  }
}

console.log(`\n输出目录：${OUT_DIR}`);
