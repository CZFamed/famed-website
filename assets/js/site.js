/* ==========================================================================
   菲美得泊头基地官网 — 交互脚本（无依赖）
   上线对接说明见 README.md「询盘表单」一节：
     window.SITE_CONFIG = { formEndpoint: "https://..." }  可切换到真实接口
   ========================================================================== */
(function () {
  "use strict";

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------ 吸顶页头 */
  var header = $("#header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-stuck", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ------------------------------------------------------------ 移动端抽屉 */
  var drawer = $("#drawer");
  var openBtn = $("[data-drawer-open]");
  var closeBtn = $("[data-drawer-close]");

  function openDrawer() {
    if (!drawer) return;
    drawer.hidden = false;
    document.body.classList.add("is-locked");
    if (openBtn) openBtn.setAttribute("aria-expanded", "true");
    var first = drawer.querySelector("a, button");
    if (first) first.focus();
  }
  function closeDrawer() {
    if (!drawer) return;
    drawer.hidden = true;
    document.body.classList.remove("is-locked");
    if (openBtn) { openBtn.setAttribute("aria-expanded", "false"); openBtn.focus(); }
  }
  if (openBtn) openBtn.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && drawer && !drawer.hidden) closeDrawer();
  });

  /* ------------------------------------------------------------ 返回顶部 */
  var toTop = $("[data-totop]");
  if (toTop) {
    var toggleToTop = function () { toTop.hidden = window.scrollY < 600; };
    toggleToTop();
    window.addEventListener("scroll", toggleToTop, { passive: true });
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ------------------------------------------------------------ 滚动出现 */
  var reveals = $$(".reveal");
  if (reveals.length && "IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ------------------------------------------------------------ 手风琴 */
  $$(".acc__q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".acc__item");
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", open ? "false" : "true");
      if (item) item.setAttribute("data-open", open ? "false" : "true");
      if (panel) panel.hidden = open;
    });
  });

  /* ------------------------------------------------------------ 图片灯箱 */
  var lb = $("#lightbox");
  if (lb) {
    var lbImg = $("[data-lb-img]", lb);
    var lbCap = $("[data-lb-cap]", lb);
    var groups = {};
    $$("[data-lb-src]").forEach(function (btn) {
      var g = btn.getAttribute("data-lb-group") || "default";
      (groups[g] = groups[g] || []).push(btn);
    });
    var current = null, index = 0, lastFocus = null;

    function show(list, i) {
      if (!list || !list.length) return;
      index = (i + list.length) % list.length;
      var btn = list[index];
      lbImg.src = btn.getAttribute("data-lb-src");
      lbImg.alt = btn.getAttribute("data-lb-cap") || "";
      lbCap.textContent = btn.getAttribute("data-lb-cap") || "";
    }
    function openLb(btn) {
      lastFocus = btn;
      current = groups[btn.getAttribute("data-lb-group") || "default"];
      index = current.indexOf(btn);
      lb.hidden = false;
      document.body.classList.add("is-locked");
      show(current, index);
      var c = $(".lightbox__close", lb);
      if (c) c.focus();
    }
    function closeLb() {
      lb.hidden = true;
      lbImg.removeAttribute("src");
      document.body.classList.remove("is-locked");
      if (lastFocus) lastFocus.focus();
    }

    $$("[data-lb-src]").forEach(function (btn) {
      btn.addEventListener("click", function () { openLb(btn); });
    });
    $("[data-lb-close]", lb).addEventListener("click", closeLb);
    $("[data-lb-prev]", lb).addEventListener("click", function () { show(current, index - 1); });
    $("[data-lb-next]", lb).addEventListener("click", function () { show(current, index + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") closeLb();
      if (e.key === "ArrowLeft") show(current, index - 1);
      if (e.key === "ArrowRight") show(current, index + 1);
    });
  }

  /* ------------------------------------------------------------ Cookie 提示 */
  var cookies = $("#cookies");
  var CK = "famed-cookie-choice";
  function readCookie() { try { return localStorage.getItem(CK); } catch (e) { return "1"; } }
  function writeCookie(v) { try { localStorage.setItem(CK, v); } catch (e) { /* ignore */ } }

  if (cookies && !readCookie()) {
    cookies.hidden = false;
    $$("[data-cookie]", cookies).forEach(function (btn) {
      btn.addEventListener("click", function () {
        writeCookie(btn.getAttribute("data-cookie"));
        cookies.hidden = true;
      });
    });
  }

  /* ------------------------------------------------------------ 点击加载地图 */
  var map = $("[data-map]");
  if (map) {
    var mapBtn = $("[data-map-load]", map);
    if (mapBtn) {
      mapBtn.addEventListener("click", function () {
        var lat = map.getAttribute("data-lat");
        var lng = map.getAttribute("data-lng");
        var frame = document.createElement("iframe");
        frame.src = "https://www.google.com/maps?q=" + lat + "," + lng + "&z=13&output=embed";
        frame.loading = "lazy";
        frame.title = "Google Maps";
        frame.referrerPolicy = "no-referrer-when-downgrade";
        frame.setAttribute("allowfullscreen", "");
        map.innerHTML = "";
        map.appendChild(frame);
      });
    }
  }

  /* ------------------------------------------------------------ 询盘表单 */
  var cfg = window.SITE_CONFIG || {};
  var MAIL_TO = cfg.mailTo || "czfamed1@outlook.com";

  $$("[data-inquiry-form]").forEach(function (form) {
    var status = $("[data-form-status]", form);
    var lang = document.documentElement.lang || "en";
    var zh = lang.indexOf("zh") === 0;
    var withMail = function (s) { return s.replace("{email}", MAIL_TO); };
    var msg = {
      ok: withMail(zh
        ? "已生成询盘，收件人 {email}。请在弹出的邮件窗口中点击发送，我们的外贸团队会在一个工作日内回复。"
        : "Inquiry prepared for {email}. Please press send in the mail window that opens — our export team replies within one working day."),
      sent: withMail(zh
        ? "询盘已提交（发往 {email}），我们会尽快回复。"
        : "Inquiry sent to {email}. We will get back to you shortly."),
      err: zh ? "请检查标红的必填项。" : "Please check the highlighted required fields.",
      fail: withMail(zh
        ? "提交失败，请直接发邮件到 {email} 联系我们。"
        : "Submission failed — please email us at {email} instead.")
    };

    function setStatus(text, kind) {
      if (!status) return;
      status.textContent = text;
      status.className = "form__status" + (kind ? " is-" + kind : "");
    }

    function validate() {
      var ok = true;
      $$("[required]", form).forEach(function (el) {
        var bad = el.type === "checkbox" ? !el.checked : !String(el.value).trim();
        if (el.type === "email" && el.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)) bad = true;
        el.classList.toggle("is-invalid", bad);
        if (bad) ok = false;
      });
      return ok;
    }

    $$(".form__input", form).forEach(function (el) {
      el.addEventListener("input", function () { el.classList.remove("is-invalid"); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate()) { setStatus(msg.err, "err"); return; }

      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });
      var subject = (zh ? "网站询盘" : "Website enquiry") +
        (data.interest ? " — " + data.interest : "") +
        (data.company ? " — " + data.company : "");
      var lines = [
        (zh ? "姓名" : "Name") + ": " + (data.name || ""),
        (zh ? "公司" : "Company") + ": " + (data.company || ""),
        (zh ? "国家/地区" : "Country") + ": " + (data.country || ""),
        (zh ? "邮箱" : "Email") + ": " + (data.email || ""),
        (zh ? "电话/WhatsApp" : "Phone") + ": " + (data.phone || ""),
        (zh ? "感兴趣产品" : "Interest") + ": " + (data.interest || ""),
        (zh ? "预计年用量" : "Annual quantity") + ": " + (data.quantity || ""),
        "",
        (zh ? "需求说明" : "Message") + ":",
        data.message || ""
      ];

      if (cfg.formEndpoint) {
        setStatus(zh ? "提交中…" : "Sending…", "");
        var submitBtn = $('button[type="submit"]', form);
        if (submitBtn) submitBtn.disabled = true;
        function done() { if (submitBtn) submitBtn.disabled = false; }

        /* Formspree 专用字段：
           _subject  → 邮件标题（否则收件箱里全是默认标题）
           _replyto  → 点"回复"直接回给买家，不依赖后台配 Reply-To
           _language → 出错/自动回复的语种
           _gotcha   → 蜜罐，由表单里的隐藏字段带上来，填了就被丢弃 */
        var payload = Object.assign({}, data, {
          _subject: subject,
          _replyto: data.email || "",
          _language: zh ? "zh" : "en"
        });

        fetch(cfg.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload)
        }).then(function (r) {
          return r.json().catch(function () { return {}; }).then(function (body) {
            if (r.ok && body.ok !== false) {
              form.reset();
              setStatus(msg.sent, "ok");
              done();
              return;
            }
            // 字段级错误：把对应输入框标红，让买家知道改哪一项
            var errors = body.errors || [];
            if (errors.length) {
              errors.forEach(function (err) {
                var field = err && err.field && $('[name="' + err.field + '"]', form);
                if (field) field.classList.add("is-invalid");
              });
              done();
              setStatus(msg.err, "err");
              return;
            }
            // 表单级错误（邮箱未验证、被限流、接口挂了）只有 body.error：
            // 交给下面的 catch，回退到"打开邮件客户端"，别让询盘丢了
            throw new Error(body.error || "HTTP " + r.status);
          });
        }).catch(function () {
          done();
          setStatus(msg.fail, "err");
          window.location.href = "mailto:" + MAIL_TO + "?subject=" +
            encodeURIComponent(subject) + "&body=" + encodeURIComponent(lines.join("\n"));
        });
        return;
      }

      setStatus(msg.ok, "ok");
      window.location.href = "mailto:" + MAIL_TO + "?subject=" +
        encodeURIComponent(subject) + "&body=" + encodeURIComponent(lines.join("\n"));
    });
  });

  /* ------------------------------------------------ 复制询盘邮箱地址（一键） */
  $$("[data-copy-mail]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy-mail") || MAIL_TO;
      var after = btn.getAttribute("data-copied-label") || "Copied";
      var back = btn.getAttribute("data-copy-label") || btn.textContent;
      function flash() {
        btn.textContent = after;
        btn.classList.add("is-done");
        setTimeout(function () {
          btn.textContent = back;
          btn.classList.remove("is-done");
        }, 2000);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(flash, fallback);
      } else {
        fallback();
      }
      function fallback() {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); flash(); } catch (e) { /* 复制不了就保持原样 */ }
        document.body.removeChild(ta);
      }
    });
  });

  /* ------------------------------------------------------------ 子导航高亮 */
  var subnav = $(".subnav");
  if (subnav && "IntersectionObserver" in window) {
    var links = $$(".subnav__link", subnav);
    var targets = links
      .map(function (a) { return document.querySelector(a.getAttribute("href")); })
      .filter(Boolean);
    if (targets.length) {
      var so = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          links.forEach(function (a) {
            a.style.color = a.getAttribute("href") === "#" + en.target.id ? "" : "";
            a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id);
          });
        });
      }, { rootMargin: "-40% 0px -55% 0px" });
      targets.forEach(function (el) { so.observe(el); });
    }
  }
})();
