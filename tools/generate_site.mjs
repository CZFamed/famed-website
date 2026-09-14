/**
 * 静态站点生成器。
 * 英文页输出到站点根目录，中文页输出到 /zh/。
 * 运行：node tools/generate_site.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { SITE, NAV, UI, HOME, ABOUT, CAPABILITIES, QUALITY, APPLICATIONS, CERTIFICATES, FAQ, CONTACT, PRIVACY } from "./content.mjs";
import { PRODUCTS, CATEGORIES_TITLE, CATEGORIES_LEAD } from "./products.mjs";
import { NEWS, NEWS_META } from "./news.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LANGS = ["en", "zh"];
const OUT = { en: ROOT, zh: path.join(ROOT, "zh") };

/* ------------------------------------------------------------------ 工具 */

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** 取双语文案 */
const t = (o, lang) => (o && typeof o === "object" ? o[lang] ?? o.en : o ?? "");

const pad2 = (n) => String(n).padStart(2, "0");

/* --------------------------------------------------------------- 页面输出 */

const written = [];

function write(lang, file, html) {
  const dir = OUT[lang];
  const full = path.join(dir, file);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, html, "utf8");
  written.push(path.relative(ROOT, full).replace(/\\/g, "/"));
}

/* ----------------------------------------------------------- 页面级上下文 */

function ctx(lang) {
  const isZh = lang === "zh";
  return {
    lang,
    isZh,
    /** 站内页面链接（同语言，相对路径） */
    u: (file) => file,
    /** 站根目录下的文件（如 sitemap.xml）。中文页在 zh\ 子目录里，需要回上一层 */
    root: (file) => (isZh ? "../" + file : file),
    /** 静态资源链接 */
    a: (p) => (isZh ? "../assets/" : "assets/") + p,
    /** 语言切换链接 */
    alt: (file) => (isZh ? "../" + file : "zh/" + file),
    /** 规范化链接 */
    canon: (file) => `${SITE.domain}/${isZh ? "zh/" : ""}${file}`,
    t: (o) => t(o, lang),
  };
}

/* ------------------------------------------------------------- 通用组件 */

function img(c, base, alt, opts = {}) {
  const { w, h, cls = "", lazy = true, sizes = "100vw", thumb = false } = opts;
  const attr = `${w ? `width="${w}" ` : ""}${h ? `height="${h}" ` : ""}class="${cls}" ${
    lazy ? 'loading="lazy" decoding="async" ' : 'fetchpriority="high" decoding="async" '
  }sizes="${sizes}"`;
  const p = (f) => c.a("img/" + f);
  const srcset = thumb
    ? `${p(base + "-t.webp")} ${Math.round(w / 2)}w, ${p(base + ".webp")} ${w}w`
    : `${p(base + ".webp")} ${w}w`;
  const jpgset = thumb
    ? ` srcset="${p(base + "-t.jpg")} ${Math.round(w / 2)}w, ${p(base + ".jpg")} ${w}w"`
    : "";
  return `<picture>
        <source srcset="${srcset}" type="image/webp">
        <img src="${p((thumb ? base + "-t" : base) + ".jpg")}"${jpgset} alt="${esc(alt)}" ${attr}>
      </picture>`;
}

/** 证书扫描件：与 CERTIFICATES.scans 里的条目对应 */
const SCAN_BY_IMG = Object.fromEntries(CERTIFICATES.scans.map((s) => [s.img, s]));

const scanTitle = (c, s) => c.t({ en: s.titleEn, zh: s.titleZh });

/** 证书扫描件卡片（图 + 说明，点击进灯箱） */
function scanFigure(c, s, { meta = true, sizes = "(max-width:640px) 92vw, (max-width:1024px) 46vw, 30vw" } = {}) {
  const title = scanTitle(c, s);
  return `
      <figure class="scan${meta ? "" : " scan--compact"}">
        <button class="scan__btn" type="button" data-lb-group="certificates" data-lb-src="${c.a(`img/${s.img}.jpg`)}" data-lb-cap="${esc(title)}">
          ${img(c, s.img, title, { w: s.w, h: s.h, thumb: true, sizes })}
        </button>
        <figcaption class="scan__cap">
          <h3 class="scan__title">${esc(title)}</h3>
          ${meta
            ? `<p class="scan__meta">${esc(c.t({ en: s.metaEn, zh: s.metaZh }))}</p>`
            : (s.year ? `<p class="scan__year">${esc(s.year)}</p>` : "")}
        </figcaption>
      </figure>`;
}

/** "查看扫描件"按钮，用在认定卡片与合规条目里 */
function scanLink(c, key) {
  const s = SCAN_BY_IMG[key];
  if (!s) return "";
  const title = scanTitle(c, s);
  return `
          <button class="scanlink" type="button" data-lb-group="certificates" data-lb-src="${c.a(`img/${s.img}.jpg`)}" data-lb-cap="${esc(title)}"><svg class="ico" aria-hidden="true"><use href="#i-doc"></use></svg>${esc(c.t(CERTIFICATES.viewScan))}</button>`;
}

function head(c, { file, title, desc, ogImage = "og/og-default" }) {
  const ogUrl = `${SITE.domain}/assets/img/${ogImage}.jpg`;
  const jsonld = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: c.isZh ? SITE.nameZh : SITE.nameEn,
      alternateName: c.isZh ? SITE.nameEn : SITE.nameZh,
      url: SITE.domain,
      logo: `${SITE.domain}/assets/img/brand/logo-mark-square.png`,
      email: SITE.email,
      telephone: SITE.phoneIntl,
      foundingDate: "2006-02-17",
      address: {
        "@type": "PostalAddress",
        streetAddress: c.isZh ? SITE.plantZh : SITE.plantEn,
        addressLocality: c.isZh ? "泊头市" : "Botou",
        addressRegion: c.isZh ? "河北省" : "Hebei",
        postalCode: SITE.postcode,
        addressCountry: "CN",
      },
      geo: { "@type": "GeoCoordinates", latitude: SITE.lat, longitude: SITE.lng },
      knowsAbout: [
        "lost foam casting", "ductile iron castings", "grey iron castings",
        "CNC machining", "valve bodies", "counterweights", "machine tool castings",
      ],
    },
  ];
  return `<!DOCTYPE html>
<html lang="${c.isZh ? "zh-CN" : "en"}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${c.canon(file)}">
<link rel="alternate" hreflang="en" href="${SITE.domain}/${file}">
<link rel="alternate" hreflang="zh-Hans" href="${SITE.domain}/zh/${file}">
<link rel="alternate" hreflang="x-default" href="${SITE.domain}/${file}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(c.isZh ? SITE.nameZh : SITE.nameEn)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${c.canon(file)}">
<meta property="og:image" content="${ogUrl}">
<meta property="og:locale" content="${c.isZh ? "zh_CN" : "en_US"}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0e2a47">
<link rel="icon" href="${c.a("img/brand/favicon.svg")}" type="image/svg+xml">
<link rel="icon" type="image/png" sizes="32x32" href="${c.a("img/brand/favicon-32.png")}">
<link rel="icon" type="image/png" sizes="16x16" href="${c.a("img/brand/favicon-16.png")}">
<link rel="apple-touch-icon" href="${c.a("img/brand/apple-touch-icon.png")}">
<link rel="stylesheet" href="${c.a("css/site.css")}">
<script type="application/ld+json">${JSON.stringify(jsonld)}</script>
<script>
  /* 询盘表单收件地址等运行期配置（改这里或改 tools/content.mjs → SITE.email） */
  window.SITE_CONFIG = { mailTo: "${SITE.email}", formEndpoint: "${SITE.formEndpoint}" };
</script>
</head>
<body class="lang-${c.lang}">
<a class="skip-link" href="#main">${esc(c.t(UI.skipToContent))}</a>`;
}

function topbar(c, active) {
  return `
<div class="topbar">
  <div class="wrap topbar__inner">
    <p class="topbar__tagline">${c.isZh
      ? "消失模铸造 · 机加工 · 涂装 · 出口配套"
      : "Lost-foam casting · CNC machining · Coating · Export supply"}</p>
    <ul class="topbar__list">
      <li class="topbar__item"><a class="topbar__link" href="tel:${SITE.phoneIntl.replace(/\s/g, "")}">
        <svg class="ico" aria-hidden="true"><use href="#i-phone"></use></svg>${esc(SITE.phone)}</a></li>
      <li class="topbar__item"><a class="topbar__link" href="mailto:${SITE.email}">
        <svg class="ico" aria-hidden="true"><use href="#i-mail"></use></svg>${esc(SITE.email)}</a></li>
      <li class="topbar__item"><span class="topbar__link">
        <svg class="ico" aria-hidden="true"><use href="#i-clock"></use></svg>${esc(c.t({ en: SITE.hoursEn, zh: SITE.hoursZh }))}</span></li>
      <li class="topbar__item"><a class="topbar__lang" href="${c.alt(active.file)}" hreflang="${c.isZh ? "en" : "zh-Hans"}" aria-label="${esc(c.t(UI.langSwitchLabel))}">${esc(c.t(UI.langSwitch))}</a></li>
    </ul>
  </div>
</div>`;
}

function header(c, active) {
  const items = NAV.map((n) => {
    const on = n.id === active.id;
    if (n.children === "products") {
      return `<li class="nav__item nav__item--has-panel">
      <a class="nav__link${on ? " is-active" : ""}" href="${c.u(n.file)}" aria-haspopup="true" aria-expanded="false">${esc(c.t(n))}<svg class="ico ico--chev" aria-hidden="true"><use href="#i-chev"></use></svg></a>
      <div class="nav__panel" role="group">
        <ul class="nav__panel-list">
          ${PRODUCTS.map((p) => `<li><a class="nav__panel-link" href="${c.u(`product-${p.slug}.html`)}"><span class="nav__panel-code">${p.code}</span><span>${esc(c.t(p.name))}</span></a></li>`).join("\n          ")}
        </ul>
        <a class="nav__panel-all" href="${c.u("products.html")}">${esc(c.t(UI.allProducts))}<svg class="ico" aria-hidden="true"><use href="#i-arrow"></use></svg></a>
      </div>
    </li>`;
    }
    return `<li class="nav__item"><a class="nav__link${on ? " is-active" : ""}" href="${c.u(n.file)}"${on ? ' aria-current="page"' : ""}>${esc(c.t(n))}</a></li>`;
  }).join("\n    ");

  return `
<header class="header" id="header">
  <div class="wrap header__inner">
    <a class="brand" href="${c.u("index.html")}">
      <img class="brand__mark" src="${c.a("img/brand/logo-mark.svg")}" alt="" width="36" height="42">
      <span class="brand__text">
        <strong>沧州菲美得</strong>
        <small>CANGZHOU FAMED</small>
      </span>
    </a>

    <nav class="nav" aria-label="${c.isZh ? "主导航" : "Main navigation"}">
      <ul class="nav__list">
    ${items}
      </ul>
    </nav>

    <div class="header__actions">
      <a class="btn btn--primary btn--sm" href="${c.u("contact.html")}">${esc(c.t(UI.getQuote))}</a>
      <button class="burger" type="button" data-drawer-open aria-controls="drawer" aria-expanded="false" aria-label="${esc(c.t(UI.menu))}">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>

<div class="drawer" id="drawer" hidden>
  <div class="drawer__head">
    <span class="drawer__title">${esc(c.isZh ? SITE.nameZh : SITE.nameEn)}</span>
    <button class="drawer__close" type="button" data-drawer-close aria-label="${esc(c.t(UI.close))}">
      <svg class="ico" aria-hidden="true"><use href="#i-close"></use></svg>
    </button>
  </div>
  <nav class="drawer__nav" aria-label="${c.isZh ? "移动端导航" : "Mobile navigation"}">
    <ul class="drawer__list">
      ${NAV.map((n) => {
        const sub = n.children === "products"
          ? `<ul class="drawer__sub">${PRODUCTS.map((p) => `<li><a href="${c.u(`product-${p.slug}.html`)}">${esc(c.t(p.name))}</a></li>`).join("")}</ul>`
          : "";
        return `<li class="drawer__item"><a class="drawer__link" href="${c.u(n.file)}">${esc(c.t(n))}</a>${sub}</li>`;
      }).join("\n      ")}
    </ul>
  </nav>
  <div class="drawer__foot">
    <a class="btn btn--primary btn--block" href="${c.u("contact.html")}">${esc(c.t(UI.getQuote))}</a>
    <a class="btn btn--outline btn--block" href="${c.alt(active.file)}">${esc(c.t(UI.langSwitch))}</a>
  </div>
</div>`;
}

function banner(c, { title, sub, base, file, crumbs = [] }) {
  return `
<section class="banner">
  <div class="banner__media">${img(c, base, title, { w: 2000, h: 800, sizes: "100vw", lazy: false })}</div>
  <div class="banner__scrim"></div>
  <div class="wrap banner__inner">
    <nav class="crumbs" aria-label="${c.isZh ? "面包屑" : "Breadcrumb"}">
      <ol>
        <li><a href="${c.u("index.html")}">${esc(c.t(UI.breadcrumbHome))}</a></li>
        ${crumbs.map((x) => `<li><a href="${c.u(x.file)}">${esc(x.label)}</a></li>`).join("")}
        <li aria-current="page">${esc(title)}</li>
      </ol>
    </nav>
    <h1 class="banner__title">${esc(title)}</h1>
    ${sub ? `<p class="banner__sub">${esc(sub)}</p>` : ""}
  </div>
</section>`;
}

function inquiryForm(c, idPrefix) {
  const f = CONTACT.fields;
  const options = PRODUCTS.map((p) => `<option value="${esc(c.t(p.name))}">${esc(c.t(p.name))}</option>`).join("");
  return `
<form class="form" id="${idPrefix}-form" data-inquiry-form novalidate>
  <div class="form__grid">
    <div class="form__field">
      <label class="form__label" for="${idPrefix}-name">${esc(c.t(f.name))} <span class="req">*</span></label>
      <input class="form__input" id="${idPrefix}-name" name="name" type="text" required autocomplete="name">
    </div>
    <div class="form__field">
      <label class="form__label" for="${idPrefix}-company">${esc(c.t(f.company))}</label>
      <input class="form__input" id="${idPrefix}-company" name="company" type="text" autocomplete="organization">
    </div>
    <div class="form__field">
      <label class="form__label" for="${idPrefix}-country">${esc(c.t(f.country))}</label>
      <input class="form__input" id="${idPrefix}-country" name="country" type="text" autocomplete="country-name">
    </div>
    <div class="form__field">
      <label class="form__label" for="${idPrefix}-email">${esc(c.t(f.email))} <span class="req">*</span></label>
      <input class="form__input" id="${idPrefix}-email" name="email" type="email" required autocomplete="email">
    </div>
    <div class="form__field">
      <label class="form__label" for="${idPrefix}-phone">${esc(c.t(f.phone))}</label>
      <input class="form__input" id="${idPrefix}-phone" name="phone" type="tel" autocomplete="tel">
    </div>
    <div class="form__field">
      <label class="form__label" for="${idPrefix}-interest">${esc(c.t(f.interest))}</label>
      <select class="form__input" id="${idPrefix}-interest" name="interest">
        <option value="">—</option>
        ${options}
        <option value="${esc(c.t(f.interestCustom))}">${esc(c.t(f.interestCustom))}</option>
        <option value="${esc(c.t(f.interestOther))}">${esc(c.t(f.interestOther))}</option>
      </select>
    </div>
    <div class="form__field">
      <label class="form__label" for="${idPrefix}-quantity">${esc(c.t(f.quantity))}</label>
      <input class="form__input" id="${idPrefix}-quantity" name="quantity" type="text" placeholder="${esc(c.isZh ? "例如 500 件/年" : "e.g. 500 pcs / year")}">
    </div>
    <div class="form__field form__field--full">
      <label class="form__label" for="${idPrefix}-message">${esc(c.t(f.message))} <span class="req">*</span></label>
      <textarea class="form__input form__textarea" id="${idPrefix}-message" name="message" rows="5" required></textarea>
      <p class="form__hint">${esc(c.t(f.messageHint))}</p>
    </div>
    <div class="form__field form__field--full form__field--check">
      <label class="form__check">
        <input type="checkbox" name="consent" required>
        <span>${esc(c.t(f.consent))}</span>
      </label>
    </div>
  </div>
  <div class="form__actions">
    <button class="btn btn--primary" type="submit">${esc(c.t(f.submit))}</button>
    ${c.t(UI.formDemoNote)
      ? `<p class="form__hint form__hint--note">${esc(c.t(UI.formDemoNote).replace("{email}", SITE.email))}</p>`
      : ""}
  </div>
  <input class="form__hp" type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true">
  <div class="form__direct">
    <p class="form__direct-text">${esc(c.t(UI.formMailHint))}</p>
    <p class="form__direct-row">
      <a class="form__mailto" href="mailto:${SITE.email}?subject=${encodeURIComponent(
        c.isZh ? "网站询盘" : "Website enquiry"
      )}"><svg class="ico" aria-hidden="true"><use href="#i-mail"></use></svg>${esc(SITE.email)}</a>
      <button class="form__copy" type="button" data-copy-mail="${esc(SITE.email)}"
        data-copy-label="${esc(c.t(UI.formMailCopy))}" data-copied-label="${esc(c.t(UI.formMailCopied))}"
        aria-label="${esc(c.t(UI.formMailCopy))}">${esc(c.t(UI.formMailCopy))}</button>
    </p>
  </div>
  <p class="form__status" data-form-status role="status" aria-live="polite"></p>
</form>`;
}

function ctaBand(c, { title, text }) {
  return `
<section class="cta-band">
  <div class="wrap cta-band__inner">
    <div class="cta-band__copy">
      <h2>${esc(title)}</h2>
      <p>${esc(text)}</p>
    </div>
    <div class="cta-band__actions">
      <a class="btn btn--primary btn--lg" href="${c.u("contact.html")}">${esc(c.t(UI.getQuote))}</a>
      <a class="btn btn--ghost btn--lg" href="https://wa.me/${SITE.whatsapp}" target="_blank" rel="noopener">
        <svg class="ico" aria-hidden="true"><use href="#i-whatsapp"></use></svg>${esc(c.t(UI.whatsapp))}</a>
    </div>
  </div>
</section>`;
}

function footer(c) {
  return `
<footer class="footer">
  <div class="wrap footer__grid">
    <div class="footer__col footer__col--brand">
      <img class="footer__logo" src="${c.a("img/brand/logo-horizontal-white.svg")}"
           alt="${esc(c.isZh ? SITE.nameZh : SITE.nameEn)}" width="287" height="64">
      <p class="footer__about">${c.isZh
        ? "沧州菲美得机械设备有限公司，河北泊头的消失模铸造与机加工工厂，北京菲美得机械有限公司持股 30%。"
        : "Cangzhou FAMED Machinery Equipment Co., Ltd. — a lost-foam foundry and machining plant in Botou, Hebei, 30% held by Beijing FAMED Machinery Co., Ltd."}</p>
      <p class="footer__meta">${c.isZh ? "统一社会信用代码" : "Unified social credit code"}: 91130981784093371Y</p>
    </div>

    <div class="footer__col">
      <h3 class="footer__title">${esc(c.t(CATEGORIES_TITLE))}</h3>
      <ul class="footer__list">
        ${PRODUCTS.map((p) => `<li><a href="${c.u(`product-${p.slug}.html`)}">${esc(c.t(p.name))}</a></li>`).join("\n        ")}
      </ul>
    </div>

    <div class="footer__col">
      <h3 class="footer__title">${c.isZh ? "快速链接" : "Quick links"}</h3>
      <ul class="footer__list">
        ${NAV.filter((n) => !["home", "products"].includes(n.id)).map((n) => `<li><a href="${c.u(n.file)}">${esc(c.t(n))}</a></li>`).join("\n        ")}
        <li><a href="${c.u("privacy.html")}">${esc(c.t(PRIVACY.title))}</a></li>
      </ul>
    </div>

    <div class="footer__col">
      <h3 class="footer__title">${c.isZh ? "联系方式" : "Contact"}</h3>
      <ul class="footer__contact">
        <li><svg class="ico" aria-hidden="true"><use href="#i-pin"></use></svg><span>${esc(c.isZh ? SITE.plantZh : SITE.plantEn)}</span></li>
        <li><svg class="ico" aria-hidden="true"><use href="#i-phone"></use></svg><a href="tel:${SITE.phoneIntl.replace(/\s/g, "")}">${esc(SITE.phoneIntl)}</a></li>
        <li><svg class="ico" aria-hidden="true"><use href="#i-mail"></use></svg><a href="mailto:${SITE.email}">${esc(SITE.email)}</a></li>
        <li><svg class="ico" aria-hidden="true"><use href="#i-clock"></use></svg><span>${esc(c.isZh ? SITE.hoursZh : SITE.hoursEn)}</span></li>
      </ul>
      <a class="btn btn--outline btn--sm footer__wa" href="https://wa.me/${SITE.whatsapp}" target="_blank" rel="noopener">
        <svg class="ico" aria-hidden="true"><use href="#i-whatsapp"></use></svg>${esc(c.t(UI.whatsapp))}</a>
    </div>
  </div>

  <div class="wrap footer__bottom">
    <p>© ${new Date().getFullYear()} ${esc(c.isZh ? SITE.nameZh : SITE.nameEn)}. ${c.isZh ? "保留所有权利。" : "All rights reserved."}</p>
    <p class="footer__bottom-links">
      <a href="${c.u("privacy.html")}">${esc(c.t(PRIVACY.title))}</a>
      <a href="${c.root("sitemap.xml")}">Sitemap</a>
      <a href="${c.alt("index.html")}">${esc(c.t(UI.langSwitch))}</a>
      <span>${esc(SITE.icp)}</span>
    </p>
  </div>
</footer>

<a class="fab" href="https://wa.me/${SITE.whatsapp}" target="_blank" rel="noopener" aria-label="${esc(c.t(UI.whatsapp))}">
  <svg class="ico" aria-hidden="true"><use href="#i-whatsapp"></use></svg>
</a>
<button class="totop" type="button" data-totop aria-label="${esc(c.t(UI.backToTop))}" hidden>
  <svg class="ico" aria-hidden="true"><use href="#i-up"></use></svg>
</button>

<div class="cookies" id="cookies" hidden>
  <p>${esc(c.t(UI.cookieText))}</p>
  <div class="cookies__actions">
    <button class="btn btn--primary btn--sm" type="button" data-cookie="accept">${esc(c.t(UI.cookieAccept))}</button>
    <button class="btn btn--outline btn--sm" type="button" data-cookie="essential">${esc(c.t(UI.cookieDecline))}</button>
    <a class="cookies__link" href="${c.u("privacy.html")}">${esc(c.t(UI.cookieMore))}</a>
  </div>
</div>

<div class="lightbox" id="lightbox" hidden>
  <button class="lightbox__close" type="button" data-lb-close aria-label="${esc(c.t(UI.close))}"><svg class="ico" aria-hidden="true"><use href="#i-close"></use></svg></button>
  <button class="lightbox__nav lightbox__nav--prev" type="button" data-lb-prev aria-label="${esc(c.t(UI.prev))}"><svg class="ico" aria-hidden="true"><use href="#i-chev"></use></svg></button>
  <figure class="lightbox__fig"><img alt="" data-lb-img><figcaption data-lb-cap></figcaption></figure>
  <button class="lightbox__nav lightbox__nav--next" type="button" data-lb-next aria-label="${esc(c.t(UI.next))}"><svg class="ico" aria-hidden="true"><use href="#i-chev"></use></svg></button>
</div>`;
}

function sprite() {
  const paths = {
    "i-phone": '<path d="M6.6 2.2 9.3 5c.5.5.6 1.2.2 1.8L8.3 8.6a12.6 12.6 0 0 0 5.1 5.1l1.8-1.2c.6-.4 1.3-.3 1.8.2l2.8 2.7c.6.6.6 1.5 0 2.1l-1.4 1.4c-.9.9-2.2 1.2-3.4.8C9.2 17.6 4.4 12.8 2.5 5.2c-.3-1.2 0-2.5.9-3.4l1.4-1.4c.6-.6 1.5-.6 2.1 0Z"/>',
    "i-mail": '<path d="M2 5.5A2.5 2.5 0 0 1 4.5 3h11A2.5 2.5 0 0 1 18 5.5v9a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 14.5v-9Zm2.2-.5 5.8 4.3L15.8 5H4.2Z"/>',
    "i-clock": '<path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12Zm-.9 1.8v5.1l4 2.4.9-1.5-3-1.8V5.8h-1.9Z"/>',
    "i-pin": '<path d="M10 1.6c-3.1 0-5.6 2.5-5.6 5.6 0 4 5.6 11.2 5.6 11.2s5.6-7.2 5.6-11.2c0-3.1-2.5-5.6-5.6-5.6Zm0 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"/>',
    "i-chev": '<path d="M5.3 7.4 10 12l4.7-4.6 1.4 1.4L10 14.8 3.9 8.8l1.4-1.4Z"/>',
    "i-arrow": '<path d="M10.6 3.4 9.2 4.8l4 4H3v2h10.2l-4 4 1.4 1.4L17 10 10.6 3.4Z"/>',
    "i-up": '<path d="M9.2 5.4 4.6 10l1.4 1.4L9.1 8.3V17h1.8V8.3l3.1 3.1L15.4 10 9.2 5.4Z"/>',
    "i-close": '<path d="m5.4 4 4.6 4.6L14.6 4 16 5.4 11.4 10 16 14.6 14.6 16 10 11.4 5.4 16 4 14.6 8.6 10 4 5.4 5.4 4Z"/>',
    "i-whatsapp": '<path d="M10 2a8 8 0 0 0-6.9 12.1L2 18l4-1.1A8 8 0 1 0 10 2Zm0 1.7a6.3 6.3 0 0 1 0 12.6 6.2 6.2 0 0 1-3.2-.9l-.4-.2-2.3.6.6-2.2-.2-.4A6.3 6.3 0 0 1 10 3.7Zm-2.3 3c-.2 0-.5.1-.7.3-.2.3-.8.9-.8 1.9s.6 2.1.7 2.3c.1.1 1.2 1.9 3 2.6 1.5.6 1.8.5 2.2.5.3-.1 1-.4 1.2-.9.2-.4.2-.8.1-.9l-.9-.4c-.3-.1-.5-.1-.7.1l-.5.6c-.1.1-.3.2-.5.1a4.7 4.7 0 0 1-1.4-.8c-.4-.4-.7-.9-.9-1.2 0-.2 0-.3.1-.4l.4-.5c.1-.2.1-.3 0-.5l-.5-1.1c-.1-.3-.3-.3-.4-.3h-.4Z"/>',
    "i-mail-check": '<path d="M2 5.5A2.5 2.5 0 0 1 4.5 3h11A2.5 2.5 0 0 1 18 5.5v9a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 14.5v-9Zm2.2-.5 5.8 4.3L15.8 5H4.2Z"/>',
    "i-shield": '<path d="M10 1.8 3.5 4.4v5.9c0 3.8 2.7 6.8 6.5 7.9 3.8-1.1 6.5-4.1 6.5-7.9V4.4L10 1.8Zm-1 11.5L6 10.2l1.4-1.3 1.6 1.6 3.4-3.6 1.4 1.4-4.8 5Z"/>',
    // 「为什么选择」四格用的图标：集团（高低厂房）、全工序（流程箭头）、产能余量（量表）
    "i-group": '<path d="M2 18V9h4.2v9H2Zm5.2 0V3h4.2v15H7.2Zm5.2 0v-6.6h4.2V18h-4.2Z"/>',
    "i-scope": '<path d="M2 5.4 6.6 10 2 14.6V5.4Zm5.6 0L12.2 10l-4.6 4.6V5.4Zm5.6 0L17.8 10l-4.6 4.6V5.4Z"/>',
    "i-gauge": '<path d="M9 5.4h6l-3 5.3-3-5.3ZM2 11.2h16v2H2Z"/>',
    "i-gears": '<path d="M8 2.5 6.6 4l.8 1.6-1.2.7L4.6 5.5l-1.4 1.4 1 1.5-.7 1.2-1.8-.2v2l1.8-.2.7 1.2-1 1.5 1.4 1.4 1.6-.8.7 1.2L6 17.5h4l-.4-1.6 1.2-.7 1.6.8 1.4-1.4-1-1.5.7-1.2 1.8.2v-2l-1.8.2-.7-1.2 1-1.5-1.4-1.4-1.6.8-1.2-.7.4-1.6H8Zm2 3.9a3.6 3.6 0 1 1 0 7.2 3.6 3.6 0 0 1 0-7.2Z"/>',
    "i-scale": '<path d="M10 2 2.6 5.4v2.3h1.9v6.5H2.6v2.3h14.8v-2.3h-1.9V7.7h1.9V5.4L10 2Zm0 2.2 4.4 2H5.6l4.4-2ZM6.4 7.7h1.9v6.5H6.4V7.7Zm3.7 0h1.9v6.5h-1.9V7.7Z"/>',
    "i-layer": '<path d="m10 2-8 4 8 4 8-4-8-4Zm0 10.2-5.4-2.7-2.6 1.3 8 4 8-4-2.6-1.3-5.4 2.7Zm0 4.1-5.4-2.7L2 14.9l8 4 8-4-2.6-1.3L10 16.3Z"/>',
    "i-globe": '<path d="M10 1.8a8.2 8.2 0 1 0 0 16.4 8.2 8.2 0 0 0 0-16.4Zm5.5 5.3h-2.4a12 12 0 0 0-1-3 6.5 6.5 0 0 1 3.4 3ZM10 3.7c.7 1 1.3 2.1 1.6 3.4H8.4c.3-1.3.9-2.4 1.6-3.4ZM3.6 11.7a6.4 6.4 0 0 1 0-3.4h2.7a16 16 0 0 0 0 3.4H3.6Zm.9 1.9h2.4c.2 1.1.6 2.1 1 3a6.5 6.5 0 0 1-3.4-3Zm2.4-5.3H4.5a6.5 6.5 0 0 1 3.4-3c-.4.9-.8 1.9-1 3ZM10 16.3c-.7-1-1.3-2.1-1.6-3.4h3.2c-.3 1.3-.9 2.4-1.6 3.4Zm1.9-5.3H8.1a13 13 0 0 1 0-3.4h3.8a13 13 0 0 1 0 3.4Zm.2 4.6c.4-.9.8-1.9 1-3h2.4a6.5 6.5 0 0 1-3.4 3Zm1.3-5.3a16 16 0 0 0 0-3.4h2.7a6.4 6.4 0 0 1 0 3.4h-2.7Z"/>',
    "i-play": '<path d="M6.5 4.2 15 10l-8.5 5.8V4.2Z"/>',
    "i-doc": '<path d="M5 2h6.2L16 6.8V18H5V2Zm6 1.6V7.2h3.6L11 3.6ZM7 9h7v1.6H7V9Zm0 3h7v1.6H7V12Z"/>',
    "i-check": '<path d="M8 14.4 3.6 10 5 8.6l3 3 7-7L16.4 6 8 14.4Z"/>',
    "i-excavator": '<path d="M2 15.4V12h3.4l1.2-2.6h3.2V6.6H14l2 3.4h2v5.4H2Zm3-1.9a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8Zm9 0a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8ZM12.6 2v7.3H11V2h1.6Z"/>',
    "i-mining": '<path d="m3 16 3.6-6 3 2.6L13.8 5l1.6.9-3.5 7.1 2.4 3H3Zm11.4-9.6-1.6.9L15.6 5l1.6.9-2.8 5.3-1.6-.9 2.6-4.9Z"/>',
    "i-oil": '<path d="M10 2c2.6 3.2 5 5.9 5 8.7A5 5 0 0 1 5 10.7C5 7.9 7.4 5.2 10 2Zm0 12.9v3.1H8v-3.1h4V18h-2v-3.1Z"/>',
    "i-rail": '<path d="M4 3h12v2H4V3Zm1.4 3h9.2l1.2 9H4.2l1.2-9ZM6 11.6h8v1.4H6v-1.4Zm-.6 4.8h9.2l.6 2.6H4.8l.6-2.6Z"/>',
    "i-elevator": '<path d="M4 2h12v16H4V2Zm5 3.4L6.4 8.6h5.2L9 5.4Zm2 11.2 2.6-3.2H8.4L11 16.6Z"/>',
    "i-gearbox": '<path d="M10 4.4a5.6 5.6 0 1 0 0 11.2 5.6 5.6 0 0 0 0-11.2Zm0 3.1a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.2 8.4h1.9v3.2H2.2V8.4Zm13.7 0h1.9v3.2h-1.9V8.4ZM8.4 1.8h3.2v2.5H8.4V1.8Zm0 13.9h3.2v2.5H8.4v-2.5Z"/>',
    "i-machine": '<path d="M3 3h4v14H3V3Zm6 3h8v2.6h-8V6Zm0 4h8v2.6h-8V10Zm0 4h5v2.6h-5V14Z"/>',
    "i-valve": '<path d="M3 6h3.2v8H3V6Zm10.8 0H17v8h-3.2V6ZM6.2 9.2h7.6v1.6H6.2V9.2ZM10 3.4l2.6 2.2H7.4L10 3.4Zm0 13.2 2.6-2.2H7.4L10 16.6Z"/>',
    "i-metallurgy": '<path d="M10 2 3 6v3h14V6l-7-4Zm-4 9v4.4a4 4 0 0 0 8 0V11H6Zm-2.4 5.4h12.8V18.6H3.6v-2.2Z"/>',
    "i-target": '<path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm0 2.6a5.4 5.4 0 1 1 0 10.8A5.4 5.4 0 0 1 10 4.6Zm0 2.6a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Z"/>',
    "i-spark": '<path d="M10 1.6 12 8l6.4 2-6.4 2-2 6.4-2-6.4L1.6 10 8 8l2-6.4Z"/>',
  };
  return `<svg class="sprite" aria-hidden="true" focusable="false">${Object.entries(paths)
    .map(([id, d]) => `<symbol id="${id}" viewBox="0 0 20 20">${d}</symbol>`)
    .join("")}</svg>`;
}

function page(c, { file, active, title, desc, body, ogImage }) {
  return `${head(c, { file, title, desc, ogImage })}
${sprite()}
${topbar(c, active)}
${header(c, active)}
<main id="main">
${body}
</main>
${footer(c)}
<script src="${c.a("js/site.js")}" defer></script>
</body>
</html>
`;
}

/* ------------------------------------------------------------------ 首页 */

function pageHome(c) {
  const products = PRODUCTS.map((p) => `
      <article class="card card--product">
        <a class="card__media" href="${c.u(`product-${p.slug}.html`)}" tabindex="-1" aria-hidden="true">
          ${img(c, `products/${p.slug}/01`, c.t(p.name), { w: 1200, h: 900, thumb: true, cls: "card__img", sizes: "(max-width:640px) 90vw, (max-width:1024px) 45vw, 30vw" })}
        </a>
        <div class="card__body">
          <span class="tag">${p.code}</span>
          <h3 class="card__title"><a href="${c.u(`product-${p.slug}.html`)}">${esc(c.t(p.name))}</a></h3>
          <p class="card__text">${esc(c.t(p.tagline))}</p>
          <span class="card__link">${esc(c.t(UI.viewDetails))}<svg class="ico" aria-hidden="true"><use href="#i-arrow"></use></svg></span>
        </div>
      </article>`).join("\n");

  const why = HOME.why.map((w) => `
      <article class="why__item reveal">
        <span class="why__icon"><svg class="ico ico--lg" aria-hidden="true"><use href="#i-${w.icon}"></use></svg></span>
        <h3 class="why__title">${esc(c.t(w))}</h3>
        <p class="why__text">${esc(c.isZh ? w.textZh : w.textEn)}</p>
      </article>`).join("\n");

  const processCards = [
    { base: "process/scan-1", en: "3D scan verification", zh: "三维扫描验证" },
    { base: "process/foam-forming-3", en: "Foam pattern moulding", zh: "发泡成型" },
    { base: "process/pattern-1", en: "Pattern assembly", zh: "白模修整组装" },
    { base: "process/pouring-1", en: "Melt &amp; pour", zh: "熔炼浇注" },
    { base: "process/machining-2", en: "CNC machining", zh: "数控加工" },
    { base: "process/paint-1", en: "Coating line", zh: "涂装线" },
  ].map((x) => `
      <figure class="gallery__item gallery__item--wide">
        <button class="gallery__btn" type="button" data-lb-group="cap" data-lb-src="${c.a(`img/${x.base}.jpg`)}" data-lb-cap="${esc(c.isZh ? x.zh : x.en)}">
          ${img(c, x.base, c.isZh ? x.zh : x.en, { w: 1200, h: 900, thumb: true, cls: "", sizes: "(max-width:640px) 92vw, (max-width:1024px) 46vw, 31vw" })}
          <figcaption>${c.isZh ? x.zh : x.en}</figcaption>
        </button>
      </figure>`).join("\n");

  const gallery = [1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
    const n = pad2(i);
    return `
      <figure class="gallery__item">
        <button class="gallery__btn" type="button" data-lb-group="factory" data-lb-src="${c.a(`img/gallery/factory-${n}.jpg`)}" data-lb-cap="${esc(c.isZh ? "厂区实拍" : "Plant photo")} ${i}">
          ${img(c, `gallery/factory-${n}`, `${c.isZh ? "厂区实拍" : "Plant photo"} ${i}`, { w: 1200, h: 900, thumb: true, cls: "", sizes: "(max-width:640px) 46vw, 25vw" })}
        </button>
      </figure>`;
  }).join("\n");

  const certScans = CERTIFICATES.scans.map((s) => scanFigure(c, s, {
    meta: false,
    sizes: "(max-width:640px) 46vw, (max-width:1024px) 30vw, 18vw",
  })).join("\n");

  const featured = ["featured/ship-01", "featured/ship-02", "featured/ship-03",
                    "featured/ship-04", "featured/ship-05", "featured/ship-06"]
    .map((p, i) => `
      <figure class="gallery__item">
        <button class="gallery__btn" type="button" data-lb-group="featured" data-lb-src="${c.a(`img/${p}.jpg`)}" data-lb-cap="${esc(c.isZh ? "近期出货产品" : "Recent production")} ${i + 1}">
          ${img(c, p, `${c.isZh ? "近期出货产品" : "Recent production"} ${i + 1}`, { w: 1200, h: 900, thumb: true, cls: "", sizes: "(max-width:640px) 46vw, 25vw" })}
        </button>
      </figure>`).join("\n");

  const news = NEWS.slice(0, 3).map((n) => `
      <article class="news__item">
        <a class="news__media" href="${c.u(`news-${n.slug}.html`)}" tabindex="-1" aria-hidden="true">
          ${img(c, n.image, c.t(n.title), { w: 1600, h: 900, thumb: true, cls: "", sizes: "(max-width:768px) 92vw, 31vw" })}
        </a>
        <div class="news__body">
          <p class="news__meta"><time datetime="${n.date}">${esc(c.t(n.dateText))}</time> · ${esc(c.t(NEWS_META.categoryLabel[n.category]))}</p>
          <h3 class="news__title"><a href="${c.u(`news-${n.slug}.html`)}">${esc(c.t(n.title))}</a></h3>
          <p class="news__text">${esc(c.t(n.summary))}</p>
        </div>
      </article>`).join("\n");

  const body = `
<section class="hero">
  <div class="hero__media">${img(c, "hero/hero-home", c.isZh ? "菲美得泊头生产基地厂区" : "FAMED Botou plant", { w: 2400, h: 1100, lazy: false, sizes: "100vw" })}</div>
  <div class="hero__scrim"></div>
  <div class="wrap hero__inner">
    <div class="hero__copy">
      <p class="hero__kicker">${esc(c.t(HOME.heroKicker))}</p>
      <h1 class="hero__title">${esc(c.t(HOME.heroTitle))}</h1>
      <p class="hero__text">${esc(c.t(HOME.heroText))}</p>
      <div class="hero__actions">
        <a class="btn btn--primary btn--lg" href="${c.u("contact.html")}">${esc(c.t(UI.getQuote))}<svg class="ico" aria-hidden="true"><use href="#i-arrow"></use></svg></a>
        <a class="btn btn--ghost btn--lg" href="${c.u("products.html")}">${esc(c.t(UI.viewProducts))}</a>
      </div>
      <ul class="hero__badges">
        ${HOME.heroBadges.map((b) => `<li><svg class="ico" aria-hidden="true"><use href="#i-check"></use></svg>${esc(c.t(b))}</li>`).join("\n        ")}
      </ul>
    </div>
    <aside class="hero__card">
      <h2 class="hero__card-title">${esc(c.t(HOME.quickQuoteTitle))}</h2>
      <p class="hero__card-text">${esc(c.t(HOME.quickQuoteText))}</p>
      <ul class="hero__card-list">
        <li><svg class="ico" aria-hidden="true"><use href="#i-phone"></use></svg><a href="tel:${SITE.phoneIntl.replace(/\s/g, "")}">${esc(SITE.phoneIntl)}</a></li>
        <li><svg class="ico" aria-hidden="true"><use href="#i-mail"></use></svg><a href="mailto:${SITE.email}">${esc(SITE.email)}</a></li>
        <li><svg class="ico" aria-hidden="true"><use href="#i-whatsapp"></use></svg><a href="https://wa.me/${SITE.whatsapp}" target="_blank" rel="noopener">WhatsApp</a></li>
      </ul>
      <a class="btn btn--outline btn--block" href="${c.u("contact.html")}">${esc(c.t(UI.sendInquiry))}</a>
    </aside>
  </div>
</section>

<section class="stats">
  <div class="wrap stats__grid">
    ${SITE.stats.map((s) => `
    <div class="stats__item">
      <strong class="stats__value">${esc(s.value)}</strong>
      <span class="stats__label">${esc(c.t({ en: s.labelEn, zh: s.labelZh }))}</span>
    </div>`).join("\n    ")}
  </div>
</section>

<section class="section" id="products">
  <div class="wrap">
    <header class="section__head">
      <h2 class="section__title">${esc(c.t(HOME.productsTitle))}</h2>
      <p class="section__sub">${esc(c.t(HOME.productsSubtitle))}</p>
      <a class="section__link" href="${c.u("products.html")}">${esc(c.t(UI.allProducts))}<svg class="ico" aria-hidden="true"><use href="#i-arrow"></use></svg></a>
    </header>
    <div class="grid grid--3">
${products}
    </div>
  </div>
</section>

<section class="section section--ink" id="why">
  <div class="wrap">
    <header class="section__head section__head--center">
      <h2 class="section__title">${esc(c.t(HOME.whyTitle))}</h2>
      <p class="section__sub">${esc(c.t(HOME.whySubtitle))}</p>
    </header>
    <div class="why">
${why}
    </div>
  </div>
</section>

<section class="section" id="capability">
  <div class="wrap">
    <header class="section__head">
      <h2 class="section__title">${esc(c.t(HOME.capabilityTitle))}</h2>
      <p class="section__sub">${esc(c.t(HOME.capabilitySubtitle))}</p>
      <a class="section__link" href="${c.u("capabilities.html")}">${esc(c.t(HOME.capabilityLink))}<svg class="ico" aria-hidden="true"><use href="#i-arrow"></use></svg></a>
    </header>
    <div class="gallery gallery--3">
${processCards}
    </div>
    <p class="gallery__hint">${esc(c.t(UI.galleryHint))}</p>
  </div>
</section>

<section class="section" id="certificates">
  <div class="wrap">
    <header class="section__head section__head--center">
      <h2 class="section__title">${esc(c.t(HOME.certsTitle))}</h2>
      <p class="section__sub">${esc(c.t(HOME.certsSubtitle))}</p>
    </header>
    <div class="scanstrip">
${certScans}
    </div>
    <div class="center-cta">
      <a class="btn btn--primary" href="${c.u("certificates.html")}#scans">${esc(c.t(CERTIFICATES.allCta))}<svg class="ico" aria-hidden="true"><use href="#i-arrow"></use></svg></a>
    </div>
  </div>
</section>

<section class="section section--alt" id="featured">
  <div class="wrap">
    <header class="section__head">
      <h2 class="section__title">${esc(c.t(HOME.featuredTitle))}</h2>
      <p class="section__sub">${esc(c.t(HOME.featuredSubtitle))}</p>
    </header>
    <div class="gallery gallery--6">
${featured}
    </div>
  </div>
</section>

<section class="section" id="factory">
  <div class="wrap">
    <header class="section__head">
      <h2 class="section__title">${esc(c.t(ABOUT.galleryTitle))}</h2>
      <p class="section__sub">${esc(c.t(ABOUT.galleryText))}</p>
    </header>
    <div class="gallery gallery--8">
${gallery}
    </div>
  </div>
</section>

<section class="section section--alt" id="news">
  <div class="wrap">
    <header class="section__head">
      <h2 class="section__title">${esc(c.t(HOME.newsTitle))}</h2>
      <p class="section__sub">${esc(c.t(HOME.newsSubtitle))}</p>
      <a class="section__link" href="${c.u("news.html")}">${esc(c.t(NEWS_META.allNews))}<svg class="ico" aria-hidden="true"><use href="#i-arrow"></use></svg></a>
    </header>
    <div class="news">
${news}
    </div>
  </div>
</section>

${ctaBand(c, { title: c.t(HOME.ctaTitle), text: c.t(HOME.ctaText) })}

<section class="section" id="inquiry">
  <div class="wrap inquiry">
    <div class="inquiry__aside">
      <h2>${esc(c.t(CONTACT.formTitle))}</h2>
      <p>${esc(c.t(CONTACT.lead))}</p>
      <ul class="inquiry__list">
        <li><svg class="ico" aria-hidden="true"><use href="#i-phone"></use></svg><a href="tel:${SITE.phoneIntl.replace(/\s/g, "")}">${esc(SITE.phoneIntl)}</a></li>
        <li><svg class="ico" aria-hidden="true"><use href="#i-mail"></use></svg><a href="mailto:${SITE.email}">${esc(SITE.email)}</a></li>
        <li><svg class="ico" aria-hidden="true"><use href="#i-clock"></use></svg><span>${esc(c.isZh ? SITE.hoursZh : SITE.hoursEn)}</span></li>
      </ul>
    </div>
    <div class="inquiry__body">${inquiryForm(c, "home")}</div>
  </div>
</section>`;

  return page(c, {
    file: "index.html",
    active: NAV[0],
    title: c.t(HOME.metaTitle),
    desc: c.t(HOME.metaDesc),
    body,
  });
}

/* ---------------------------------------------------------------- 关于我们 */

function pageAbout(c) {
  const sections = ABOUT.sections.map((s) => {
    if (s.timeline) {
      return `
<section class="section" id="${s.id}">
  <div class="wrap">
    <h2 class="section__title">${esc(c.t(s.title))}</h2>
    <ol class="timeline">
      ${s.timeline.map((x) => `<li class="timeline__item reveal"><span class="timeline__year">${esc(x.year)}</span><p class="timeline__text">${esc(c.t(x))}</p></li>`).join("\n      ")}
    </ol>
  </div>
</section>`;
    }
    if (s.values) {
      return `
<section class="section section--alt" id="${s.id}">
  <div class="wrap">
    <h2 class="section__title">${esc(c.t(s.title))}</h2>
    <div class="grid grid--2">
      ${s.values.map((v) => `<article class="card card--plain reveal"><h3 class="card__title">${esc(c.t(v))}</h3><p class="card__text">${esc(c.isZh ? v.textZh : v.textEn)}</p></article>`).join("\n      ")}
    </div>
    <div class="grid grid--2 grid--tight people-strip">
      ${[["training-01", "公司内部培训", "In-house training"], ["training-02", "内部技术交流会议", "Internal technical review meeting"]].map(([n, zh, en]) => `
      <figure class="gallery__item">
        <button class="gallery__btn" type="button" data-lb-group="people" data-lb-src="${c.a(`img/people/${n}.jpg`)}" data-lb-cap="${esc(c.isZh ? zh : en)}">
          ${img(c, `people/${n}`, c.isZh ? zh : en, { w: 1200, h: 900, thumb: true, cls: "", sizes: "(max-width:760px) 92vw, 46vw" })}
        </button>
      </figure>`).join("\n      ")}
    </div>
  </div>
</section>`;
    }
    if (s.id === "profile") {
      return `
<section class="section" id="${s.id}">
  <div class="wrap split">
    <div class="split__media">
      <figure class="gallery__item gallery__item--hero">
        <button class="gallery__btn" type="button" data-lb-group="about" data-lb-src="${c.a("img/about/gate.jpg")}" data-lb-cap="${esc(c.isZh ? "公司招牌墙" : "Company name wall at the plant entrance")}">
          ${img(c, "about/gate", c.isZh ? "公司招牌墙" : "Company name wall at the plant entrance", { w: 1600, h: 900, thumb: true, cls: "", sizes: "(max-width:900px) 92vw, 46vw" })}
        </button>
      </figure>
    </div>
    <div class="split__body">
      <h2 class="section__title">${esc(c.t(s.title))}</h2>
      ${s.paras.map((p) => `<p>${esc(c.t(p))}</p>`).join("\n      ")}
    </div>
  </div>
</section>`;
    }
    return `
<section class="section" id="${s.id}">
  <div class="wrap prose">
    <h2 class="section__title">${esc(c.t(s.title))}</h2>
    ${s.paras.map((p) => `<p>${esc(c.t(p))}</p>`).join("\n    ")}
  </div>
</section>`;
  }).join("\n");

  const gallery = Array.from({ length: 12 }, (_, i) => pad2(i + 1)).map((n, i) => `
      <figure class="gallery__item">
        <button class="gallery__btn" type="button" data-lb-group="about" data-lb-src="${c.a(`img/gallery/factory-${n}.jpg`)}" data-lb-cap="${esc(c.isZh ? "厂区实拍" : "Plant photo")} ${i + 1}">
          ${img(c, `gallery/factory-${n}`, `${c.isZh ? "厂区实拍" : "Plant photo"} ${i + 1}`, { w: 1200, h: 900, thumb: true, cls: "", sizes: "(max-width:640px) 46vw, 25vw" })}
        </button>
      </figure>`).join("\n");

  const body = `
${banner(c, { title: c.t(ABOUT.title), sub: c.t(ABOUT.lead), base: "banner/banner-about", file: "about.html", crumbs: [] })}
<nav class="subnav" aria-label="${c.isZh ? "本页目录" : "On this page"}">
  <div class="wrap subnav__inner">
    ${ABOUT.sections.map((s) => `<a class="subnav__link" href="#${s.id}">${esc(c.isZh ? s.navZh : s.navEn)}</a>`).join("\n    ")}
    <a class="subnav__link" href="#gallery">${esc(c.t(ABOUT.galleryTitle))}</a>
  </div>
</nav>
${sections}

<section class="section section--alt" id="gallery">
  <div class="wrap">
    <h2 class="section__title">${esc(c.t(ABOUT.galleryTitle))}</h2>
    <p class="section__sub">${esc(c.t(ABOUT.galleryText))}</p>
    <div class="gallery gallery--4">
${gallery}
    </div>
    <p class="gallery__hint">${esc(c.t(UI.galleryHint))}</p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <h2 class="section__title">${esc(c.isZh ? "工厂速览" : "Plant at a glance")}</h2>
    <dl class="factlist">
      ${SITE.facts.map((f) => `<div class="factlist__row"><dt>${esc(c.t({ en: f.kEn, zh: f.kZh }))}</dt><dd>${esc(c.t({ en: f.vEn, zh: f.vZh }))}</dd></div>`).join("\n      ")}
    </dl>
  </div>
</section>

${ctaBand(c, { title: c.t(HOME.ctaTitle), text: c.t(HOME.ctaText) })}`;

  return page(c, {
    file: "about.html",
    active: NAV[1],
    title: c.t(ABOUT.metaTitle),
    desc: c.t(ABOUT.metaDesc),
    ogImage: "banner/banner-about",
    body,
  });
}

/* ------------------------------------------------------------------ 产品 */

function pageProducts(c) {
  const cards = PRODUCTS.map((p) => `
      <article class="card card--product" data-cat="${esc(c.t(p.name))}" data-code="${p.code}">
        <a class="card__media" href="${c.u(`product-${p.slug}.html`)}" tabindex="-1" aria-hidden="true">
          ${img(c, `products/${p.slug}/01`, c.t(p.name), { w: 1200, h: 900, thumb: true, cls: "card__img", sizes: "(max-width:640px) 90vw, (max-width:1024px) 45vw, 30vw" })}
        </a>
        <div class="card__body">
          <span class="tag">${p.code}</span>
          <h3 class="card__title"><a href="${c.u(`product-${p.slug}.html`)}">${esc(c.t(p.name))}</a></h3>
          <p class="card__text">${esc(c.t(p.tagline))}</p>
          <ul class="card__list">
            ${p.groups.map((g) => `<li>· ${esc(c.t(g.title))}</li>`).join("\n            ")}
          </ul>
          <span class="card__link">${esc(c.t(UI.viewDetails))}<svg class="ico" aria-hidden="true"><use href="#i-arrow"></use></svg></span>
        </div>
      </article>`).join("\n");

  const body = `
${banner(c, { title: c.t(CATEGORIES_TITLE), sub: c.t(CATEGORIES_LEAD), base: "banner/banner-products", file: "products.html", crumbs: [] })}
<section class="section">
  <div class="wrap">
    <div class="grid grid--3 grid--cats">
${cards}
    </div>
  </div>
</section>

<section class="section section--alt">
  <div class="wrap prose">
    <h2 class="section__title">${esc(c.isZh ? "找不到你的零件？" : "Cannot find your part?")}</h2>
    <p>${esc(c.isZh
      ? "以上是按应用场景划分的常规产品线。我们大量工作其实是为客户定制零件：从图纸评审、模具制作到首件确认与批量交付。把图纸发过来，我们会在两个工作日内回复可行性、材质建议与价格区间。"
      : "The categories above cover our regular range. A large share of our work is custom: drawing review, tooling, first-article approval and then series production. Send a drawing and we will come back within two working days with feasibility, a material recommendation and an indicative price.")}</p>
  </div>
</section>

${ctaBand(c, { title: c.t(HOME.ctaTitle), text: c.t(HOME.ctaText) })}`;

  return page(c, {
    file: "products.html",
    active: NAV[2],
    title: c.isZh ? "产品中心 | 铸造与机加工零部件 — 菲美得泊头基地" : "Products | Castings & Machined Parts — FAMED Botou Plant",
    desc: c.t(CATEGORIES_LEAD),
    ogImage: "banner/banner-products",
    body,
  });
}

function pageProduct(c, p) {
  const base = (n) => `products/${p.slug}/${pad2(n)}`;
  const first = base(p.groups[0].imgs[0]);

  // 子组导航
  const groupNav = `<nav class="subnav" aria-label="${c.isZh ? "本页目录" : "On this page"}">
  <div class="wrap subnav__inner">
    ${p.groups.map((g, i) => `<a class="subnav__link" href="#g${i + 1}">${esc(c.t(g.title))}</a>`).join("\n    ")}
    <a class="subnav__link" href="#specs">${esc(c.isZh ? "技术参数" : "Specifications")}</a>
    <a class="subnav__link" href="#applications">${esc(c.isZh ? "应用领域" : "Applications")}</a>
  </div>
</nav>`;

  const groups = p.groups.map((g, gi) => `
<section class="section${gi % 2 ? " section--alt" : ""}" id="g${gi + 1}">
  <div class="wrap">
    <header class="section__head">
      <h2 class="section__title">${esc(c.t(g.title))}</h2>
      <p class="section__sub">${esc(c.t(g.text))}</p>
    </header>
    <div class="gallery gallery--3">
      ${g.imgs.map((n) => `
      <figure class="gallery__item">
        <button class="gallery__btn" type="button" data-lb-group="${p.slug}-${gi + 1}" data-lb-src="${c.a(`img/${base(n)}.jpg`)}" data-lb-cap="${esc(c.t(g.title))}">
          ${img(c, base(n), c.t(g.title), { w: 1200, h: 900, thumb: true, cls: "", sizes: "(max-width:640px) 46vw, 30vw" })}
        </button>
      </figure>`).join("\n      ")}
    </div>
  </div>
</section>`).join("\n");

  const related = PRODUCTS.filter((x) => x.slug !== p.slug).map((x) => `
      <article class="card card--product card--sm">
        <a class="card__media" href="${c.u(`product-${x.slug}.html`)}" tabindex="-1" aria-hidden="true">
          ${img(c, `products/${x.slug}/01`, c.t(x.name), { w: 1200, h: 900, thumb: true, cls: "card__img", sizes: "(max-width:640px) 90vw, 46vw" })}
        </a>
        <div class="card__body">
          <h3 class="card__title"><a href="${c.u(`product-${x.slug}.html`)}">${esc(c.t(x.name))}</a></h3>
          <p class="card__text">${esc(c.t(x.tagline))}</p>
        </div>
      </article>`).join("\n");

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: c.t(p.name),
    description: c.t(p.tagline),
    image: `${SITE.domain}/assets/img/products/${p.slug}/01.jpg`,
    brand: { "@type": "Brand", name: "FAMED" },
    manufacturer: { "@type": "Organization", name: c.isZh ? SITE.nameZh : SITE.nameEn },
    material: c.t(p.specs[0].v),
    category: c.t(CATEGORIES_TITLE),
  };

  const body = `
${banner(c, {
  title: c.t(p.name), sub: c.t(p.tagline), base: "banner/banner-products", file: `product-${p.slug}.html`,
  crumbs: [{ file: "products.html", label: c.t(CATEGORIES_TITLE) }],
})}
${groupNav}
<section class="section">
  <div class="wrap split">
    <div class="split__media">
      <figure class="gallery__item gallery__item--hero">
        <button class="gallery__btn" type="button" data-lb-group="${p.slug}-1" data-lb-src="${c.a(`img/${first}.jpg`)}" data-lb-cap="${esc(c.t(p.name))}">
          ${img(c, first, c.t(p.name), { w: 1200, h: 900, thumb: true, cls: "", sizes: "(max-width:900px) 92vw, 46vw" })}
        </button>
      </figure>
    </div>
    <div class="split__body">
      <span class="tag">${p.code}</span>
      <h2 class="section__title">${esc(c.t(p.name))}</h2>
      ${p.intro.map((x) => `<p>${esc(c.t(x))}</p>`).join("\n      ")}
      <ul class="ticks">
        ${p.typical.slice(0, 5).map((a) => `<li><svg class="ico" aria-hidden="true"><use href="#i-check"></use></svg>${esc(c.t(a))}</li>`).join("\n        ")}
      </ul>
      <div class="split__actions">
        <a class="btn btn--primary" href="${c.u("contact.html")}">${esc(c.t(UI.getQuote))}</a>
        <a class="btn btn--outline" href="https://wa.me/${SITE.whatsapp}" target="_blank" rel="noopener">
          <svg class="ico" aria-hidden="true"><use href="#i-whatsapp"></use></svg>${esc(c.t(UI.whatsapp))}</a>
      </div>
    </div>
  </div>
</section>

${groups}

<section class="section section--alt">
  <div class="wrap" id="specs">
    <header class="section__head">
      <h2 class="section__title">${esc(c.t(p.typicalTitle))}</h2>
    </header>
    <ul class="chips">
      ${p.typical.map((x) => `<li class="chip">${esc(c.t(x))}</li>`).join("\n      ")}
    </ul>
    <h2 class="section__title" style="margin-top:44px">${esc(c.isZh ? "技术参数" : "Specifications")}</h2>
    <dl class="speclist">
      ${p.specs.map((s) => `<div class="speclist__row"><dt>${esc(c.t(s.k))}</dt><dd>${esc(c.t(s.v))}</dd></div>`).join("\n      ")}
      <div class="speclist__row"><dt>${esc(c.isZh ? "起订量" : "Minimum order")}</dt><dd>${esc(c.t(p.moq))}</dd></div>
    </dl>
    <p class="note">${esc(c.isZh
      ? "以上参数为常规范围，实际以双方确认的图纸与技术要求为准。"
      : "Values above are our regular range; the drawing and technical specification agreed with you take precedence.")}</p>
  </div>
</section>

<section class="section" id="applications">
  <div class="wrap">
    <h2 class="section__title">${esc(c.isZh ? "应用领域" : "Applications")}</h2>
    <ul class="ticks ticks--grid">
      ${p.applications.map((a) => `<li><svg class="ico" aria-hidden="true"><use href="#i-check"></use></svg>${esc(c.t(a))}</li>`).join("\n      ")}
    </ul>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <h2 class="section__title">${esc(c.t(UI.relatedProducts))}</h2>
    <div class="grid grid--3 grid--tight">
${related}
    </div>
  </div>
</section>

${ctaBand(c, { title: c.t(HOME.ctaTitle), text: c.t(HOME.ctaText) })}
<script type="application/ld+json">${JSON.stringify(productLd)}</script>`;

  return page(c, {
    file: `product-${p.slug}.html`,
    active: NAV[2],
    title: `${c.t(p.name)} | ${c.isZh ? SITE.nameZh : SITE.nameEn}`,
    desc: `${c.t(p.tagline)} — ${c.t(p.intro[0]).slice(0, 110)}`,
    ogImage: `products/${p.slug}/01`,
    body,
  });
}

/* ---------------------------------------------------------------- 制造能力 */

function pageCapabilities(c) {
  const flow = CAPABILITIES.flow.map((f) => `
      <li class="flow__item">
        <span class="flow__no">${f.no}</span>
        <h3 class="flow__title">${esc(c.t(f))}</h3>
        <p class="flow__text">${esc(c.isZh ? f.textZh : f.textEn)}</p>
      </li>`).join("\n");

  const groups = [
    { key: "scan", en: "3D scanning &amp; verification", zh: "三维扫描与验证", n: 3 },
    { key: "foam-forming", en: "Foam pattern moulding", zh: "发泡成型", n: 3 },
    { key: "pattern", en: "Pattern assembly", zh: "白模修整与组装", n: 3 },
    { key: "slurry", en: "Refractory coating &amp; drying", zh: "涂料与烘干", n: 3 },
    { key: "pouring", en: "Moulding &amp; pouring", zh: "造型与浇注", n: 3 },
    { key: "cleaning", en: "Cleaning &amp; heat treatment", zh: "清理与热处理", n: 3 },
    { key: "machining", en: "Machining", zh: "机加工", n: 3 },
    { key: "paint", en: "Coating, inspection &amp; packing", zh: "涂装、检测与包装", n: 3 },
  ];
  const photoGroups = groups.map((g) => {
    // 注意：process 目录下的文件名为 <工序>-1.jpg …（无补零），与 build_assets.py 保持一致
    const items = Array.from({ length: g.n }, (_, i) => String(i + 1)).map((n, i) => `
        <figure class="gallery__item">
          <button class="gallery__btn" type="button" data-lb-group="${g.key}" data-lb-src="${c.a(`img/process/${g.key}-${n}.jpg`)}" data-lb-cap="${esc(c.isZh ? g.zh.replace("&amp;", "与") : g.en.replace("&amp;", "and"))} ${i + 1}">
            ${img(c, `process/${g.key}-${n}`, `${c.isZh ? g.zh.replace("&amp;", "与") : g.en.replace("&amp;", "and")} ${i + 1}`, { w: 1200, h: 900, thumb: true, cls: "", sizes: "(max-width:640px) 46vw, 30vw" })}
          </button>
        </figure>`).join("\n");
    return `
    <div class="procg">
      <h3 class="procg__title">${c.isZh ? g.zh.replace("&amp;", "与") : g.en.replace("&amp;", "and")}</h3>
      <div class="gallery gallery--3 gallery--tight">
${items}
      </div>
    </div>`;
  }).join("\n");

  const materials = CAPABILITIES.materials.map((m) => `
      <article class="card card--plain">
        <h3 class="card__title">${esc(c.t(m))}</h3>
        <p class="card__text">${esc(m.items)}</p>
      </article>`).join("\n");

  const body = `
${banner(c, { title: c.t(CAPABILITIES.title), sub: c.t(CAPABILITIES.lead), base: "banner/banner-capabilities", file: "capabilities.html", crumbs: [] })}

<section class="section">
  <div class="wrap">
    <header class="section__head">
      <h2 class="section__title">${esc(c.t(CAPABILITIES.flowTitle))}</h2>
      <p class="section__sub">${esc(c.t(CAPABILITIES.flowText))}</p>
    </header>
    <ol class="flow">
${flow}
    </ol>
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
    <h2 class="section__title">${esc(c.isZh ? "各工序实拍" : "Process photos")}</h2>
${photoGroups}
  </div>
</section>

<section class="section">
  <div class="wrap">
    <header class="section__head">
      <h2 class="section__title">${esc(c.t(CAPABILITIES.equipmentTitle))}</h2>
      <p class="section__sub">${esc(c.t(CAPABILITIES.equipmentText))}</p>
    </header>
    <dl class="speclist">
      ${CAPABILITIES.equipment.map((e) => `<div class="speclist__row"><dt>${esc(c.t({ en: e.kEn, zh: e.kZh }))}</dt><dd>${esc(c.t({ en: e.vEn, zh: e.vZh }))}</dd></div>`).join("\n      ")}
    </dl>
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
    <h2 class="section__title">${esc(c.t(CAPABILITIES.materialTitle))}</h2>
    <div class="grid grid--2">
${materials}
    </div>
    <p class="note">${esc(c.t(CAPABILITIES.materialNote))}</p>
  </div>
</section>

${ctaBand(c, { title: c.t(HOME.ctaTitle), text: c.t(HOME.ctaText) })}`;

  return page(c, {
    file: "capabilities.html",
    active: NAV[3],
    title: c.t(CAPABILITIES.metaTitle),
    desc: c.t(CAPABILITIES.metaDesc),
    ogImage: "banner/banner-capabilities",
    body,
  });
}

/* ---------------------------------------------------------------- 质量控制 */

function pageQuality(c) {
  const points = QUALITY.points.map((p, i) => `
      <article class="card card--step reveal">
        <span class="card__no">${pad2(i + 1)}</span>
        <h3 class="card__title">${esc(c.t(p))}</h3>
        <p class="card__text">${esc(c.isZh ? p.textZh : p.textEn)}</p>
      </article>`).join("\n");

  const body = `
${banner(c, { title: c.t(QUALITY.title), sub: c.t(QUALITY.lead), base: "banner/banner-quality", file: "quality.html", crumbs: [] })}

<section class="section">
  <div class="wrap split split--media-right">
    <div class="split__body">
      <h2 class="section__title">${esc(c.t(QUALITY.systemTitle))}</h2>
      <p>${esc(c.t(QUALITY.systemText))}</p>
      <ul class="ticks">
        ${["GB/T 19001-2016 / ISO 9001:2015", c.isZh ? "覆盖铸件与加工件的设计与制造" : "Covering design and manufacture of castings and machined parts", c.isZh ? "证书在有效期内，可应要求提供" : "Currently valid; copy available on request"].map((x) => `<li><svg class="ico" aria-hidden="true"><use href="#i-check"></use></svg>${esc(x)}</li>`).join("\n        ")}
      </ul>
    </div>
    <div class="split__media">
      <figure class="gallery__item gallery__item--hero">
        <button class="gallery__btn" type="button" data-lb-group="qa" data-lb-src="${c.a("img/quality/scan-box.jpg")}" data-lb-cap="${esc(c.isZh ? "大型箱体铸件三维扫描检测" : "3D scan inspection of a large housing casting")}">
          ${img(c, "quality/scan-box", c.isZh ? "大型箱体铸件三维扫描检测" : "3D scan inspection of a large housing casting", { w: 1200, h: 900, thumb: true, cls: "", sizes: "(max-width:900px) 92vw, 46vw" })}
        </button>
      </figure>
    </div>
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
    <h2 class="section__title">${esc(c.t(QUALITY.pointsTitle))}</h2>
    <div class="grid grid--3">
${points}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <header class="section__head">
      <h2 class="section__title">${esc(c.t(QUALITY.equipmentTitle))}</h2>
      <p class="section__sub">${esc(c.t(QUALITY.equipmentNote))}</p>
    </header>
    <ul class="chips">
      ${QUALITY.equipment.map((e) => `<li class="chip">${esc(c.t(e))}</li>`).join("\n      ")}
    </ul>
    <div class="gallery gallery--3 gallery--wide-media">
      ${[
        ["scan-box", "大型箱体铸件三维扫描检测", "3D scan inspection of a housing casting"],
        ["scan-hoist", "吊运状态下的大型箱体铸件三维扫描", "3D scanning of a housing casting under the crane"],
        ["scan-hand", "手持式三维激光扫描铸钢件", "Handheld 3D laser scanning of a steel casting"],
        ["cmm", "ZEISS 桥式三坐标测量机", "ZEISS bridge-type CMM in the metrology room"],
        ["record", "喷涂后检验记录", "Inspection record being taken after coating"],
        ["packing", "成品缠绕膜包装待运", "Finished casting wrapped for shipment"],
      ].map(([n, zh, en]) => `
      <figure class="gallery__item">
        <button class="gallery__btn" type="button" data-lb-group="qa" data-lb-src="${c.a(`img/quality/${n}.jpg`)}" data-lb-cap="${esc(c.isZh ? zh : en)}">
          ${img(c, `quality/${n}`, c.isZh ? zh : en, { w: 1200, h: 900, thumb: true, cls: "", sizes: "(max-width:640px) 46vw, 30vw" })}
        </button>
      </figure>`).join("\n      ")}
    </div>
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
    <h2 class="section__title">${esc(c.t(QUALITY.standardsTitle))}</h2>
    <dl class="speclist">
      ${QUALITY.standards.map((s) => `<div class="speclist__row"><dt>${esc(c.t(s))}</dt><dd>${esc(c.isZh ? s.vZh : s.vEn)}</dd></div>`).join("\n      ")}
    </dl>
  </div>
</section>

${ctaBand(c, { title: c.t(HOME.ctaTitle), text: c.t(HOME.ctaText) })}`;

  return page(c, {
    file: "quality.html",
    active: NAV[4],
    title: c.t(QUALITY.metaTitle),
    desc: c.t(QUALITY.metaDesc),
    ogImage: "banner/banner-quality",
    body,
  });
}

/* ---------------------------------------------------------------- 应用领域 */

function pageApplications(c) {
  const items = APPLICATIONS.items.map((a) => `
      <article class="appcard reveal">
        <span class="appcard__icon"><svg class="ico ico--lg" aria-hidden="true"><use href="#i-${a.icon}"></use></svg></span>
        <h3 class="appcard__title">${esc(c.t(a))}</h3>
        <p class="appcard__text">${esc(c.isZh ? a.textZh : a.textEn)}</p>
      </article>`).join("\n");

  const body = `
${banner(c, { title: c.t(APPLICATIONS.title), sub: c.t(APPLICATIONS.lead), base: "banner/banner-applications", file: "applications.html", crumbs: [] })}

<section class="section">
  <div class="wrap">
    <div class="appgrid">
${items}
    </div>
    <p class="note">${esc(c.t(APPLICATIONS.note))}</p>
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
    <h2 class="section__title">${esc(c.isZh ? "典型零件" : "Typical parts by industry")}</h2>
    <div class="grid grid--3">
      ${PRODUCTS.map((p) => `
      <article class="card card--product card--sm">
        <a class="card__media" href="${c.u(`product-${p.slug}.html`)}" tabindex="-1" aria-hidden="true">
          ${img(c, `products/${p.slug}/02`, c.t(p.name), { w: 1200, h: 900, thumb: true, cls: "card__img", sizes: "(max-width:640px) 90vw, 30vw" })}
        </a>
        <div class="card__body">
          <h3 class="card__title"><a href="${c.u(`product-${p.slug}.html`)}">${esc(c.t(p.name))}</a></h3>
          <p class="card__text">${esc(c.t(p.tagline))}</p>
        </div>
      </article>`).join("\n      ")}
    </div>
  </div>
</section>

${ctaBand(c, { title: c.t(APPLICATIONS.ctaTitle), text: c.t(APPLICATIONS.ctaText) })}`;

  return page(c, {
    file: "applications.html",
    active: NAV[5],
    title: c.t(APPLICATIONS.metaTitle),
    desc: c.t(APPLICATIONS.metaDesc),
    ogImage: "banner/banner-applications",
    body,
  });
}

/* ---------------------------------------------------------------- 资质荣誉 */

function pageCertificates(c) {
  const honoured = CERTIFICATES.honoured.map((x) => `
      <div class="speclist__row">
        <dt>${esc(c.t({ en: x.titleEn, zh: x.titleZh }))}${x.year && x.year !== "—" ? `<span class="speclist__year">${esc(x.year)}</span>` : ""}</dt>
        <dd>${esc(c.t({ en: x.descEn, zh: x.descZh }))}${scanLink(c, x.img)}</dd>
      </div>`).join("\n      ");

  const compliance = CERTIFICATES.compliance.map((x) => `
      <div class="speclist__row">
        <dt>${esc(c.t({ en: x.titleEn, zh: x.titleZh }))}</dt>
        <dd>${esc(c.t({ en: x.descEn, zh: x.descZh }))}${scanLink(c, x.img)}</dd>
      </div>`).join("\n      ");

  const scans = CERTIFICATES.scans.map((s) => scanFigure(c, s)).join("\n");

  const patents = CERTIFICATES.patents.map((p) => `
      <tr>
        <td>${esc(c.t({ en: p.titleEn, zh: p.titleZh }))}</td>
        <td>${esc(p.id)}</td>
        <td>${esc(p.date)}</td>
      </tr>`).join("\n      ");

  const body = `
${banner(c, { title: c.t(CERTIFICATES.title), sub: c.t(CERTIFICATES.lead), base: "banner/banner-certificates", file: "certificates.html", crumbs: [] })}

<section class="section">
  <div class="wrap">
    <h2 class="section__title">${esc(c.t(CERTIFICATES.honouredTitle))}</h2>
    <dl class="speclist">
      ${honoured}
    </dl>
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
    <h2 class="section__title" id="scans">${esc(c.t(CERTIFICATES.scansTitle))}</h2>
    <p class="section__sub">${esc(c.t(CERTIFICATES.scansLead))}</p>
    <div class="scangrid">
${scans}
    </div>
    <p class="note">${esc(c.t(CERTIFICATES.docsNote))}</p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <h2 class="section__title">${esc(c.t(CERTIFICATES.complianceTitle))}</h2>
    <dl class="speclist">
      ${compliance}
    </dl>
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
    <h2 class="section__title">${esc(c.t(CERTIFICATES.patentsTitle))}</h2>
    <p class="section__sub">${esc(c.t(CERTIFICATES.patentsText))}</p>
    <div class="tablescroll">
      <table class="table">
        <thead>
          <tr>
            <th>${esc(c.isZh ? "专利名称" : "Patent")}</th>
            <th>${esc(c.isZh ? "授权公告号" : "Publication no.")}</th>
            <th>${esc(c.isZh ? "授权日期" : "Granted")}</th>
          </tr>
        </thead>
        <tbody>
      ${patents}
        </tbody>
      </table>
    </div>
  </div>
</section>

${ctaBand(c, { title: c.t(HOME.ctaTitle), text: c.t(HOME.ctaText) })}`;

  return page(c, {
    file: "certificates.html",
    active: NAV[6],
    title: c.t(CERTIFICATES.metaTitle),
    desc: c.t(CERTIFICATES.metaDesc),
    ogImage: "banner/banner-certificates",
    body,
  });
}

/* ---------------------------------------------------------------- 新闻资讯 */

function pageNews(c) {
  const items = NEWS.map((n) => `
      <article class="news__item">
        <a class="news__media" href="${c.u(`news-${n.slug}.html`)}" tabindex="-1" aria-hidden="true">
          ${img(c, n.image, c.t(n.title), { w: 1600, h: 900, thumb: true, cls: "", sizes: "(max-width:768px) 92vw, 46vw" })}
        </a>
        <div class="news__body">
          <p class="news__meta"><time datetime="${n.date}">${esc(c.t(n.dateText))}</time> · ${esc(c.t(NEWS_META.categoryLabel[n.category]))}</p>
          <h2 class="news__title"><a href="${c.u(`news-${n.slug}.html`)}">${esc(c.t(n.title))}</a></h2>
          <p class="news__text">${esc(c.t(n.summary))}</p>
          <a class="card__link" href="${c.u(`news-${n.slug}.html`)}">${esc(c.t(NEWS_META.readMore))}<svg class="ico" aria-hidden="true"><use href="#i-arrow"></use></svg></a>
        </div>
      </article>`).join("\n");

  const body = `
${banner(c, { title: c.t(NEWS_META.title), sub: c.t(NEWS_META.lead), base: "banner/banner-news", file: "news.html", crumbs: [] })}
<section class="section">
  <div class="wrap">
    <div class="news news--list">
${items}
    </div>
    <p class="note">${esc(c.t(NEWS_META.disclaimer))}</p>
  </div>
</section>
${ctaBand(c, { title: c.t(HOME.ctaTitle), text: c.t(HOME.ctaText) })}`;

  return page(c, {
    file: "news.html",
    active: NAV[7],
    title: c.t(NEWS_META.metaTitle),
    desc: c.t(NEWS_META.metaDesc),
    ogImage: "banner/banner-news",
    body,
  });
}

function pageNewsItem(c, n) {
  const others = NEWS.filter((x) => x.slug !== n.slug).slice(0, 3).map((x) => `
      <li class="mininews"><a href="${c.u(`news-${x.slug}.html`)}">
        <time datetime="${x.date}">${esc(c.t(x.dateText))}</time>
        <span>${esc(c.t(x.title))}</span></a></li>`).join("\n      ");

  const body = `
${banner(c, {
  title: c.t(n.title), sub: c.t(n.summary), base: n.image, file: `news-${n.slug}.html`,
  crumbs: [{ file: "news.html", label: c.t(NEWS_META.title) }],
})}
<section class="section">
  <div class="wrap article">
    <p class="article__meta">
      <time datetime="${n.date}">${esc(c.t(n.dateText))}</time>
      <span class="tag">${esc(c.t(NEWS_META.categoryLabel[n.category]))}</span>
    </p>
    <div class="prose">
      ${n.body.map((p) => `<p>${esc(c.t(p))}</p>`).join("\n      ")}
    </div>
    <aside class="article__aside">
      <h2 class="article__aside-title">${esc(c.t(NEWS_META.allNews))}</h2>
      <ul class="mininews-list">
      ${others}
      </ul>
    </aside>
  </div>
</section>
${ctaBand(c, { title: c.t(HOME.ctaTitle), text: c.t(HOME.ctaText) })}`;

  return page(c, {
    file: `news-${n.slug}.html`,
    active: NAV[7],
    title: `${c.t(n.title)} | ${c.isZh ? SITE.nameZh : "FAMED"}`,
    desc: c.t(n.summary).slice(0, 158),
    ogImage: n.image,
    body,
  });
}

/* ---------------------------------------------------------------- 常见问题 */

function pageFaq(c) {
  const items = FAQ.items.map((f, i) => `
      <div class="acc__item" ${i === 0 ? 'data-open="true"' : ""}>
        <h2 class="acc__h">
          <button class="acc__q" type="button" aria-expanded="${i === 0 ? "true" : "false"}" aria-controls="faq-p-${i}" id="faq-q-${i}">
            <span>${esc(c.t(f.q))}</span>
            <svg class="ico ico--chev" aria-hidden="true"><use href="#i-chev"></use></svg>
          </button>
        </h2>
        <div class="acc__a" id="faq-p-${i}" role="region" aria-labelledby="faq-q-${i}" ${i === 0 ? "" : "hidden"}>
          <p>${esc(c.t(f.a))}</p>
        </div>
      </div>`).join("\n");

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.items.map((f) => ({
      "@type": "Question",
      name: c.t(f.q),
      acceptedAnswer: { "@type": "Answer", text: c.t(f.a) },
    })),
  };

  const body = `
${banner(c, { title: c.t(FAQ.title), sub: c.t(FAQ.lead), base: "banner/banner-faq", file: "faq.html", crumbs: [] })}
<section class="section">
  <div class="wrap faqwrap">
    <div class="acc">
${items}
    </div>
    <aside class="faqside">
      <h2 class="faqside__title">${esc(c.t(FAQ.stillTitle))}</h2>
      <p class="faqside__text">${esc(c.t(FAQ.stillText))}</p>
      <ul class="inquiry__list">
        <li><svg class="ico" aria-hidden="true"><use href="#i-phone"></use></svg><a href="tel:${SITE.phoneIntl.replace(/\s/g, "")}">${esc(SITE.phoneIntl)}</a></li>
        <li><svg class="ico" aria-hidden="true"><use href="#i-mail"></use></svg><a href="mailto:${SITE.email}">${esc(SITE.email)}</a></li>
        <li><svg class="ico" aria-hidden="true"><use href="#i-whatsapp"></use></svg><a href="https://wa.me/${SITE.whatsapp}" target="_blank" rel="noopener">WhatsApp</a></li>
      </ul>
      <a class="btn btn--primary btn--block" href="${c.u("contact.html")}">${esc(c.t(UI.sendInquiry))}</a>
    </aside>
  </div>
</section>
<script type="application/ld+json">${JSON.stringify(faqLd)}</script>`;

  return page(c, {
    file: "faq.html",
    active: NAV[8],
    title: c.t(FAQ.metaTitle),
    desc: c.t(FAQ.metaDesc),
    ogImage: "banner/banner-faq",
    body,
  });
}

/* ---------------------------------------------------------------- 联系我们 */

function pageContact(c) {
  const body = `
${banner(c, { title: c.t(CONTACT.title), sub: c.t(CONTACT.lead), base: "banner/banner-contact", file: "contact.html", crumbs: [] })}

<section class="section">
  <div class="wrap contact">
    <div class="contact__main">
      <h2 class="section__title">${esc(c.t(CONTACT.formTitle))}</h2>
      ${inquiryForm(c, "contact")}
    </div>
    <aside class="contact__side">
      <h2 class="section__title">${esc(c.t(CONTACT.infoTitle))}</h2>
      <ul class="contact-list">
        <li>
          <span class="contact-list__ico"><svg class="ico" aria-hidden="true"><use href="#i-phone"></use></svg></span>
          <span class="contact-list__body">
            <strong>${esc(c.t(CONTACT.infoLabels.phone))}</strong>
            <a href="tel:${SITE.phoneIntl.replace(/\s/g, "")}">${esc(SITE.phoneIntl)}</a>
          </span>
        </li>
        <li>
          <span class="contact-list__ico"><svg class="ico" aria-hidden="true"><use href="#i-whatsapp"></use></svg></span>
          <span class="contact-list__body">
            <strong>${esc(c.t(CONTACT.infoLabels.whatsapp))}</strong>
            <a href="https://wa.me/${SITE.whatsapp}" target="_blank" rel="noopener">${esc(SITE.phoneIntl)}</a>
          </span>
        </li>
        <li>
          <span class="contact-list__ico"><svg class="ico" aria-hidden="true"><use href="#i-mail"></use></svg></span>
          <span class="contact-list__body">
            <strong>${esc(c.t(CONTACT.infoLabels.email))}</strong>
            <a href="mailto:${SITE.email}">${esc(SITE.email)}</a>
          </span>
        </li>
        <li>
          <span class="contact-list__ico"><svg class="ico" aria-hidden="true"><use href="#i-pin"></use></svg></span>
          <span class="contact-list__body">
            <strong>${esc(c.t(CONTACT.infoLabels.plant))}</strong>
            <span>${esc(c.isZh ? SITE.plantZh : SITE.plantEn)}</span>
          </span>
        </li>
        <li>
          <span class="contact-list__ico"><svg class="ico" aria-hidden="true"><use href="#i-doc"></use></svg></span>
          <span class="contact-list__body">
            <strong>${esc(c.t(CONTACT.infoLabels.office))}</strong>
            <span>${esc(c.isZh ? SITE.regZh : SITE.regEn)} · ${esc(SITE.postcode)}</span>
          </span>
        </li>
        <li>
          <span class="contact-list__ico"><svg class="ico" aria-hidden="true"><use href="#i-clock"></use></svg></span>
          <span class="contact-list__body">
            <strong>${esc(c.t(CONTACT.infoLabels.hours))}</strong>
            <span>${esc(c.isZh ? SITE.hoursZh : SITE.hoursEn)}</span>
          </span>
        </li>
        <li>
          <span class="contact-list__ico"><svg class="ico" aria-hidden="true"><use href="#i-target"></use></svg></span>
          <span class="contact-list__body">
            <strong>${esc(c.t(CONTACT.infoLabels.coords))}</strong>
            <span>${esc(SITE.coordText)}</span>
          </span>
        </li>
      </ul>
      <p class="note">${esc(c.t(CONTACT.contactPersonNote))}</p>
    </aside>
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
    <h2 class="section__title">${esc(c.t(CONTACT.mapTitle))}</h2>
    <div class="mapbox" data-map data-lat="${SITE.lat}" data-lng="${SITE.lng}">
      <div class="mapbox__placeholder">
        <svg class="ico ico--xl" aria-hidden="true"><use href="#i-pin"></use></svg>
        <p class="mapbox__addr">${esc(c.isZh ? SITE.plantZh : SITE.plantEn)}</p>
        <p class="mapbox__coords">${esc(SITE.coordText)}</p>
        <p class="mapbox__note">${esc(c.t(UI.mapNote))}</p>
        <button class="btn btn--primary" type="button" data-map-load>${esc(c.t(UI.mapLoad))}</button>
        <a class="btn btn--outline" href="https://www.google.com/maps/search/?api=1&amp;query=${SITE.lat},${SITE.lng}" target="_blank" rel="noopener">${esc(c.t(UI.openInMaps))}</a>
      </div>
    </div>
    <div class="visit">
      <h3 class="visit__title">${esc(c.t(CONTACT.visitTitle))}</h3>
      <p>${esc(c.t(CONTACT.visitText))}</p>
    </div>
  </div>
</section>`;

  return page(c, {
    file: "contact.html",
    active: NAV[9],
    title: c.t(CONTACT.metaTitle),
    desc: c.t(CONTACT.metaDesc),
    ogImage: "banner/banner-contact",
    body,
  });
}

/* ---------------------------------------------------------------- 隐私政策 */

function pagePrivacy(c) {
  const body = `
<section class="section section--top">
  <div class="wrap prose prose--narrow">
    <h1 class="page-title">${esc(c.t(PRIVACY.title))}</h1>
    <p class="note">${esc(c.t(PRIVACY.updated))}</p>
    ${PRIVACY.sections.map((s) => `<h2>${esc(c.t(s.h))}</h2><p>${esc(c.t(s.p))}</p>`).join("\n    ")}
  </div>
</section>`;

  return page(c, {
    file: "privacy.html",
    active: { id: "privacy", file: "privacy.html" },
    title: `${c.t(PRIVACY.metaTitle)} | ${c.isZh ? SITE.nameZh : "FAMED"}`,
    desc: c.t(PRIVACY.metaDesc),
    body,
  });
}

/* ---------------------------------------------------------------- 404 */

function page404(c) {
  const body = `
<section class="section section--top">
  <div class="wrap notfound">
    <p class="notfound__code">404</p>
    <h1 class="page-title">${esc(c.isZh ? "页面不存在" : "Page not found")}</h1>
    <p class="section__sub">${esc(c.isZh
      ? "这个链接可能已经失效。你可以从下面的入口继续找。"
      : "That link no longer exists. Try one of these instead.")}</p>
    <div class="notfound__links">
      <a class="btn btn--primary" href="${c.u("index.html")}">${esc(c.t(UI.breadcrumbHome))}</a>
      <a class="btn btn--outline" href="${c.u("products.html")}">${esc(c.t(UI.allProducts))}</a>
      <a class="btn btn--outline" href="${c.u("contact.html")}">${esc(c.t(UI.getQuote))}</a>
    </div>
  </div>
</section>`;

  return page(c, {
    file: "404.html",
    active: { id: "404", file: "404.html" },
    title: c.isZh ? "页面不存在 | 菲美得" : "Page not found | FAMED",
    desc: c.isZh ? "页面不存在。" : "The page you requested could not be found.",
    body,
  });
}

/* ------------------------------------------------------------------ 主流程 */

const ROUTES = [
  { file: "index.html", render: pageHome, priority: "1.0", freq: "weekly" },
  { file: "about.html", render: pageAbout, priority: "0.8", freq: "monthly" },
  { file: "products.html", render: pageProducts, priority: "0.9", freq: "monthly" },
  { file: "capabilities.html", render: pageCapabilities, priority: "0.8", freq: "monthly" },
  { file: "quality.html", render: pageQuality, priority: "0.7", freq: "monthly" },
  { file: "applications.html", render: pageApplications, priority: "0.7", freq: "monthly" },
  { file: "certificates.html", render: pageCertificates, priority: "0.6", freq: "yearly" },
  { file: "news.html", render: pageNews, priority: "0.6", freq: "weekly" },
  { file: "faq.html", render: pageFaq, priority: "0.6", freq: "monthly" },
  { file: "contact.html", render: pageContact, priority: "0.9", freq: "yearly" },
  { file: "privacy.html", render: pagePrivacy, priority: "0.2", freq: "yearly" },
  { file: "404.html", render: page404, priority: "0.1", freq: "yearly" },
  ...PRODUCTS.map((p) => ({ file: `product-${p.slug}.html`, render: (c) => pageProduct(c, p), priority: "0.7", freq: "monthly" })),
  ...NEWS.map((n) => ({ file: `news-${n.slug}.html`, render: (c) => pageNewsItem(c, n), priority: "0.5", freq: "yearly" })),
];

for (const lang of LANGS) {
  const c = ctx(lang);
  for (const r of ROUTES) {
    write(lang, r.file, r.render(c));
  }
}

/* 清理改名后遗留的旧页面（只删本生成器产出的 .html） */
const expected = new Set(ROUTES.map((r) => r.file));
for (const lang of LANGS) {
  if (!fs.existsSync(OUT[lang])) continue;
  for (const f of fs.readdirSync(OUT[lang])) {
    if (f.endsWith(".html") && !expected.has(f)) {
      fs.unlinkSync(path.join(OUT[lang], f));
      console.log(`  已删除旧页面 ${lang === "zh" ? "zh/" : ""}${f}`);
    }
  }
}

/* --------------------------------------------------------- sitemap / robots */

const urls = ROUTES.filter((r) => r.file !== "404.html").map((r) => {
  const loc = (lang, file) => `${SITE.domain}/${lang === "zh" ? "zh/" : ""}${file}`;
  return `  <url>
    <loc>${loc("en", r.file)}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${loc("en", r.file)}"/>
    <xhtml:link rel="alternate" hreflang="zh-Hans" href="${loc("zh", r.file)}"/>
    <changefreq>${r.freq}</changefreq>
    <priority>${r.priority}</priority>
  </url>
  <url>
    <loc>${loc("zh", r.file)}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${loc("en", r.file)}"/>
    <xhtml:link rel="alternate" hreflang="zh-Hans" href="${loc("zh", r.file)}"/>
    <changefreq>${r.freq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`;
}).join("\n");

fs.writeFileSync(path.join(ROOT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`, "utf8");
written.push("sitemap.xml");

fs.writeFileSync(path.join(ROOT, "robots.txt"), `User-agent: *
Allow: /
Disallow: /tools/
Disallow: /_素材审阅/

Sitemap: ${SITE.domain}/sitemap.xml
`, "utf8");
written.push("robots.txt");

/* ------------------------------------------------------------------ 报告 */

console.log(`生成 ${written.length} 个文件：`);
for (const f of written) console.log("  " + f);
