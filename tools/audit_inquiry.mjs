/**
 * 询盘表单体检（开发用，不随站点上线）。
 *
 * 检查询盘界面是不是真的发往 tools\content.mjs → SITE.email（现为
 * czfamed1@outlook.com）：页面配置、页面上所有 mailto 链接、提交时用的收件人、
 * "复制邮箱"按钮、以及这块内容在小屏上有没有溢出。
 *
 * 运行：
 *   node tools/serve.mjs 5173      # 另开一个终端
 *   node tools/audit_inquiry.mjs
 */
import { launchEdge, setViewport, sleep } from "./cdp-edge.mjs";

const BASE = process.env.AUDIT_BASE || "http://localhost:5173";
const PORT = 9335;
const EXPECTED = process.env.AUDIT_MAILTO || "czfamed1@outlook.com";

const results = [];
function check(name, pass, detail = "") {
  results.push({ name, pass, detail });
  console.log(`${pass ? "[通过]" : "[失败]"} ${name}${detail ? " — " + detail : ""}`);
}

const formFill = String.raw`(() => {
  const set = (name, value) => {
    const el = document.querySelector('[name="' + name + '"]');
    if (!el) return;
    if (el.type === "checkbox") el.checked = true; else el.value = value;
    el.dispatchEvent(new Event("input", { bubbles: true }));
  };
  set("name", "Test Buyer");
  set("company", "Test Buyer GmbH");
  set("country", "Germany");
  set("email", "buyer@example.com");
  set("message", "Please quote 500 pcs of the valve body casting.");
  set("consent", "1");
  return true;
})()`;

const pages = [
  ["contact.html", "英文联系页"],
  ["zh/contact.html", "中文联系页"],
  ["index.html", "英文首页（首页也有一份询盘表单）"],
  ["zh/index.html", "中文首页"],
];

const { cdp, close } = await launchEdge({ port: PORT });
try {
  for (const [page, label] of pages) {
    await setViewport(cdp, { width: 390, height: 844, dpr: 3, mobile: true });
    await cdp.goto(`${BASE}/${page}`, { settle: 500 });

    const info = await cdp.eval(
      `(() => {
        const cfg = window.SITE_CONFIG || {};
        const forms = document.querySelectorAll("[data-inquiry-form]").length;
        const mailtos = [...document.querySelectorAll('a[href^="mailto:"]')].map((a) => a.getAttribute("href"));
        const direct = document.querySelector(".form__direct");
        const box = direct ? direct.getBoundingClientRect() : null;
        const copy = document.querySelector("[data-copy-mail]");
        const h = (sel) => { const e = document.querySelector(sel); return e ? Math.round(e.getBoundingClientRect().height) : 0; };
        return {
          cfgMail: cfg.mailTo || null,
          forms,
          mailtos,
          hasDirect: Boolean(direct),
          directVisible: box ? box.width > 200 && box.height > 20 : false,
          directOverflow: box ? box.right > window.innerWidth + 1 || box.left < -1 : false,
          copyValue: copy ? copy.getAttribute("data-copy-mail") : null,
          copyLabel: copy ? copy.getAttribute("data-copy-label") : null,
          copiedLabel: copy ? copy.getAttribute("data-copied-label") : null,
          mailtoH: h(".form__mailto"),
          copyH: h(".form__copy"),
        };
      })()`
    );

    check(`${label} 页面配置 mailTo = ${EXPECTED}`, info.cfgMail === EXPECTED, `实际 ${info.cfgMail}`);
    check(`${label} 询盘表单存在`, info.forms >= 1, `${info.forms} 个表单`);
    check(`${label} 页面上所有 mailto 都指向 ${EXPECTED}`,
      info.mailtos.length > 0 && info.mailtos.every((h) => h.includes(EXPECTED)),
      `${info.mailtos.length} 个邮箱链接`);
    check(`${label} 表单里有"直接发邮件"入口并可见`, info.hasDirect && info.directVisible);
    check(`${label} 该入口在 390px 小屏不溢出`, info.directOverflow === false);
    check(`${label} 复制邮箱按钮指向 ${EXPECTED}`,
      info.copyValue === EXPECTED && Boolean(info.copyLabel && info.copiedLabel),
      `按钮文案「${info.copyLabel}」→「${info.copiedLabel}」`);
    check(`${label} 邮箱链接与复制按钮够好点按（≥40px）`,
      info.mailtoH >= 40 && info.copyH >= 40,
      `链接高 ${info.mailtoH}px，按钮高 ${info.copyH}px`);

    // 填好必填项后提交：提示语里必须出现收件地址，证明提交走的是配置里的邮箱
    await cdp.eval(formFill);
    await cdp.eval(`(() => { const f = document.querySelector("form[data-inquiry-form]");
      f.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true })); })()`);
    await sleep(600);
    const status = await cdp.eval(
      `(() => { const s = document.querySelector(".form__status");
        return { text: s ? s.innerText.replace(/\\s+/g, " ").trim() : "", cls: s ? s.className : "" }; })()`
    );
    check(`${label} 提交提示里带上收件邮箱`,
      status.text.includes(EXPECTED) && /is-ok/.test(status.cls),
      `「${status.text.slice(0, 70)}…」`);

    // 复制按钮：点一下文案要变成"已复制"（无剪贴板权限时跳过判定）
    const copyClick = await cdp.eval(
      `(async () => { const btn = document.querySelector("[data-copy-mail]");
        btn.click(); await new Promise((r) => setTimeout(r, 250));
        return { text: btn.textContent.trim(), done: btn.className.includes("is-done") }; })()`
    );
    check(`${label} 复制按钮点击后有反馈（或环境不支持剪贴板）`,
      copyClick.done === true,
      `按钮文案「${copyClick.text}」`);
  }

  /* ------------------------------- 新加的这块在 320px 小屏上也不能把页面撑宽 */
  await setViewport(cdp, { width: 320, height: 640, dpr: 2, mobile: true });
  await cdp.goto(`${BASE}/contact.html`, { settle: 500 });
  const narrow = await cdp.eval(
    `(() => { const d = document.querySelector(".form__direct").getBoundingClientRect();
      return { right: Math.round(d.right), inner: window.innerWidth, doc: document.documentElement.scrollWidth }; })()`
  );
  check("320px 小屏：询盘邮箱块不把布局撑宽",
    narrow.doc <= narrow.inner && narrow.right <= narrow.inner + 1,
    `块右边缘 ${narrow.right}，视口 ${narrow.inner}，文档宽 ${narrow.doc}`);
} finally {
  close();
}

const failed = results.filter((r) => !r.pass);
console.log(`\n合计 ${results.length} 项，通过 ${results.length - failed.length} 项，未通过 ${failed.length} 项`);
for (const f of failed) console.log(`  [失败] ${f.name}${f.detail ? " — " + f.detail : ""}`);
if (failed.length) process.exitCode = 1;
