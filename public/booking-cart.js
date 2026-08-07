(function () {
  "use strict";

  var CART_KEY = "onespa_reservation_cart_v1";
  var API_KEY = "onespa_admin_api_base";
  var WA = window.ONE_SPA_WHATSAPP_URL || "https://wa.me/60143155632?text=";
  var TG = window.ONE_SPA_TELEGRAM_URL || "https://t.me/nhlg09";
  var bookingState = null;
  var holidays = {
    "2026-01-01": true,
    "2026-02-01": true,
    "2026-02-02": true,
    "2026-02-03": true,
    "2026-02-17": true,
    "2026-02-18": true,
    "2026-03-07": true,
    "2026-03-20": true,
    "2026-03-21": true,
    "2026-03-22": true,
    "2026-03-23": true,
    "2026-05-01": true,
    "2026-05-27": true,
    "2026-05-31": true,
    "2026-06-01": true,
    "2026-06-17": true,
    "2026-08-25": true,
    "2026-08-31": true,
    "2026-09-16": true,
    "2026-11-08": true,
    "2026-11-09": true,
    "2026-12-25": true
  };

  var products = {
    b1f1: {
      en: "Twin 12-Hour Pass",
      cn: "双人 12 小时门票",
      unitEn: "/ 2 adults",
      unitCn: "/ 2 位",
      weekday: 169,
      weekend: 199,
      stay: "12h",
      kind: "spa-tiered",
      leadHours: 1,
      sc: 0.1,
      sst: 0.08
    },
    solo: {
      en: "Solo 12-Hour Pass + Free 30-min Massage",
      cn: "单人 12 小时门票 + 送 30 分钟按摩",
      unitEn: "/ person",
      unitCn: "/ 人",
      weekday: 169,
      weekend: 199,
      stay: "12h",
      kind: "spa-tiered",
      leadHours: 1,
      sc: 0.1,
      sst: 0.08
    },
    daytime: {
      en: "Daytime Massage Package",
      cn: "日间按摩配套",
      unitEn: "/ person",
      unitCn: "/ 人",
      single: 199,
      stay: "daytime",
      kind: "spa-daily",
      leadHours: 1,
      hours: [9, 17],
      sc: 0.1,
      sst: 0.08
    },
    scrub: {
      en: "Yangzhou Body Scrub Package",
      cn: "扬州搓澡配套",
      unitEn: "/ person",
      unitCn: "/ 人",
      weekday: 199,
      weekend: 239,
      stay: "12h",
      kind: "spa-tiered",
      leadHours: 1,
      sc: 0.1,
      sst: 0.08
    },
    "allday-sm": {
      en: "All-Day Scrub & Massage Package",
      cn: "沐净舒养套餐",
      unitEn: "/ person",
      unitCn: "/ 人",
      single: 379,
      stay: "12h",
      kind: "spa-daily",
      leadHours: 1,
      sc: 0.1,
      sst: 0.08
    },
    "daytime-duo": {
      en: "Daytime Duo Package",
      cn: "日间双人套餐",
      unitEn: "/ 2 people",
      unitCn: "/ 2 人",
      single: 379,
      stay: "daytime",
      kind: "spa-daily",
      leadHours: 1,
      hours: [9, 17],
      sc: 0.1,
      sst: 0.08
    },
    kids: {
      en: "Kids Ticket",
      cn: "儿童票",
      unitEn: "/ child",
      unitCn: "/ 小孩",
      weekday: 58,
      weekend: 88,
      stay: "12h",
      kind: "spa-tiered",
      leadHours: 1,
      sc: 0.1,
      sst: 0.08
    },
    "outcall-classic": {
      en: "Classic 2-Hour Home Massage",
      cn: "经典 2 小时上门按摩",
      unitEn: "/ 2-hour session",
      unitCn: "/ 2 小时",
      single: 699,
      stay: "outcall",
      kind: "home",
      leadHours: 3,
      hours: [9, 22],
      sc: 0,
      sst: 0.08
    },
    "outcall-anytime": {
      en: "Anytime Hourly Home Massage (2h)",
      cn: "随时 2 小时上门按摩",
      unitEn: "/ 2-hour session",
      unitCn: "/ 2 小时",
      single: 798,
      stay: "outcall",
      kind: "home",
      leadHours: 3,
      sc: 0,
      sst: 0.08
    },
    "outcall-fourhands": {
      en: "Four-Hands Indulgence · 2h",
      cn: "四手尊宠 · 2 小时",
      unitEn: "/ 2-hour session",
      unitCn: "/ 2 小时",
      single: 1699,
      stay: "outcall",
      kind: "home",
      leadHours: 3,
      hours: [9, 22],
      sc: 0,
      sst: 0.08
    }
  };

  function locale() {
    return location.pathname.indexOf("/cn") === 0 ? "cn" : "en";
  }

  function text(en, cn) {
    return locale() === "cn" ? cn : en;
  }

  function tr(lang, en, cn) {
    return lang === "cn" ? cn : en;
  }

  function readCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    } catch {
      return [];
    }
  }

  function apiBase() {
    var configured = (window.ONESPA_API_BASE || "").trim().replace(/\/$/, "");
    if (configured) return configured;
    var saved = (localStorage.getItem(API_KEY) || "").trim().replace(/\/$/, "");
    if (saved) return saved;
    if (location.hostname === "localhost" && location.port !== "4000") return "http://localhost:4000";
    return "";
  }

  function endpoint(path) {
    return apiBase() + path;
  }

  function afterPageReady(callback) {
    if (document.readyState === "complete") {
      setTimeout(callback, 0);
      return;
    }
    window.addEventListener("load", function () {
      setTimeout(callback, 0);
    }, { once: true });
  }

  function setActiveSubnavLink(nav, link) {
    var changed = !link.classList.contains("on");
    nav.querySelectorAll(".pill").forEach(function (item) {
      var isActive = item === link;
      item.classList.toggle("on", isActive);
      if (isActive) item.setAttribute("aria-current", "true");
      else item.removeAttribute("aria-current");
    });
    if (changed) link.scrollIntoView({ block: "nearest", inline: "center" });
  }

  function initSubnav() {
    var navs = Array.from(document.querySelectorAll(".subnav"));
    if (!navs.length) return;

    navs.forEach(function (nav) {
      var links = Array.from(nav.querySelectorAll('a.pill[href^="#"]'));
      if (!links.length) return;

      var sections = links
        .map(function (link) {
          return {
            link: link,
            section: document.getElementById(link.getAttribute("href").slice(1))
          };
        })
        .filter(function (item) {
          return item.section;
        });

      nav.addEventListener("click", function (event) {
        var link = event.target.closest('a.pill[href^="#"]');
        if (!link || !nav.contains(link)) return;
        setActiveSubnavLink(nav, link);
      });

      function refreshActive() {
        var anchor = nav.getBoundingClientRect().bottom + 36;
        var current = sections[0];
        sections.forEach(function (item) {
          if (item.section.getBoundingClientRect().top <= anchor) current = item;
        });
        if (current) setActiveSubnavLink(nav, current.link);
      }

      refreshActive();
      window.addEventListener("scroll", refreshActive, { passive: true });
      window.addEventListener("resize", refreshActive);
    });
  }

  function writeCart(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    updateCartCount();
  }

  function updateCartCount() {
    var count = readCart().reduce(function (sum, item) {
      return sum + Number(item.qty || 1);
    }, 0);
    document.querySelectorAll("[data-cart-count]").forEach(function (el) {
      el.textContent = String(count);
      el.hidden = count === 0;
    });
  }

  function money(value) {
    return "RM" + Number(value || 0).toFixed(2);
  }

  function baseMoney(value) {
    return "RM" + Number(value || 0).toFixed(0);
  }

  function today() {
    var d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 10);
  }

  function selectedDateTime(date, time) {
    return new Date(date + "T" + time + ":00+08:00");
  }

  function minStartTime(product) {
    var d = new Date();
    d.setHours(d.getHours() + Number(product.leadHours || 1));
    return d;
  }

  function isWeekendOrHoliday(date) {
    var day = new Date(date + "T12:00:00+08:00").getDay();
    return day === 5 || day === 6 || !!holidays[date];
  }

  function tierFor(product, date) {
    return product.single ? "single" : isWeekendOrHoliday(date) ? "weekend" : "weekday";
  }

  function taxLabel(product, lang) {
    return product.kind === "home"
      ? tr(lang, "+ 8% SST only", "+ 8% SST，无服务费")
      : tr(lang, "++ = 10% service charge + 8% SST", "++ = 10% 服务费 + 8% SST");
  }

  function basePrice(product, date) {
    var tier = tierFor(product, date);
    return product.single || product[tier];
  }

  function monthKey(date) {
    return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0");
  }

  function dateString(year, month, day) {
    return year + "-" + String(month + 1).padStart(2, "0") + "-" + String(day).padStart(2, "0");
  }

  function monthTitle(date, lang) {
    var year = date.getFullYear();
    var month = date.getMonth();
    if (lang === "cn") return year + " 年 " + (month + 1) + " 月";
    return date.toLocaleString("en-US", { month: "long", year: "numeric" });
  }

  function lineFor(item) {
    var product = products[item.code];
    var qty = Math.max(1, Number(item.qty || 1));
    var tier = tierFor(product, item.date);
    var price = basePrice(product, item.date);
    var subtotal = price * qty;
    var sc = Math.round(subtotal * product.sc * 100) / 100;
    var sst = Math.round((subtotal + sc) * product.sst * 100) / 100;
    return {
      product: product,
      tier: tier,
      price: price,
      qty: qty,
      subtotal: subtotal,
      sc: sc,
      sst: sst,
      total: subtotal + sc + sst
    };
  }

  function totals(items) {
    return items.reduce(
      function (sum, item) {
        var line = lineFor(item);
        sum.subtotal += line.subtotal;
        sum.sc += line.sc;
        sum.sst += line.sst;
        sum.total += line.total;
        return sum;
      },
      { subtotal: 0, sc: 0, sst: 0, total: 0 }
    );
  }

  function timeOptions(product, date, selected) {
    var start = 0;
    var end = 23;
    var minStart = minStartTime(product);
    if (product.hours) {
      start = product.hours[0];
      end = product.hours[1];
    }
    var html = "";
    for (var h = start; h <= end; h += 1) {
      var value = String(h).padStart(2, "0") + ":00";
      var disabled = selectedDateTime(date, value) < minStart;
      html +=
        '<button class="booking-time' +
        (selected === value ? " selected" : "") +
        '" type="button" data-booking-time="' +
        value +
        '"' +
        (disabled ? " disabled" : "") +
        ">" +
        value +
        "</button>";
    }
    return html;
  }

  function modal() {
    var existing = document.querySelector("[data-booking-modal]");
    if (existing) return existing;
    var el = document.createElement("div");
    el.className = "booking-modal";
    el.setAttribute("data-booking-modal", "");
    el.innerHTML =
      '<div class="booking-backdrop" aria-hidden="true"></div>' +
      '<form class="booking-panel" data-booking-form>' +
      '<button class="booking-x" type="button" data-booking-close aria-label="Close">×</button>' +
      '<h3 data-booking-title></h3>' +
      '<div class="booking-rulecards" data-booking-rates></div>' +
      '<p class="booking-tier-note" data-booking-tier-note></p>' +
      '<input name="date" type="hidden" required />' +
      '<div class="booking-calendar" aria-label="Booking calendar">' +
      '<div class="booking-monthbar"><button type="button" data-booking-prev aria-label="Previous month">‹</button><b data-booking-month></b><button type="button" data-booking-next aria-label="Next month">›</button></div>' +
      '<div class="booking-weekdays" data-booking-weekdays></div>' +
      '<div class="booking-days" data-booking-days></div>' +
      "</div>" +
      '<div class="booking-note" data-booking-note></div>' +
      '<input name="time" type="hidden" required />' +
      '<input name="qty" type="hidden" value="1" required />' +
      '<div class="booking-controls"><div><span class="booking-control-label" data-time-label></span><div class="booking-timegrid" data-booking-times></div></div><div><span class="booking-control-label" data-qty-label></span><div class="booking-stepper"><button type="button" data-booking-qty="-1">−</button><b data-booking-qty-value>1</b><button type="button" data-booking-qty="1">+</button></div></div></div>' +
      '<div class="booking-price" data-booking-price></div>' +
      '<p class="booking-error" data-booking-error hidden></p>' +
      '<button class="btn wide" type="submit" data-booking-submit></button>' +
      "</form>";
    document.body.appendChild(el);
    el.addEventListener("click", function (event) {
      if (event.target.closest("[data-booking-close]")) {
        closeModal();
        return;
      }

      var prev = event.target.closest("[data-booking-prev]");
      var next = event.target.closest("[data-booking-next]");
      var day = event.target.closest("[data-booking-day]");
      var time = event.target.closest("[data-booking-time]");
      var qty = event.target.closest("[data-booking-qty]");
      if (prev || next) {
        if (!bookingState) return;
        bookingState.month = new Date(
          bookingState.month.getFullYear(),
          bookingState.month.getMonth() + (prev ? -1 : 1),
          1
        );
        renderBookingCalendar(el);
        return;
      }
      if (day && !day.disabled) {
        el.querySelector("[data-booking-form]").elements.date.value = day.getAttribute("data-booking-day");
        renderBookingCalendar(el);
        renderBookingTimes(el);
        refreshBookingPrice(el);
      }
      if (time && !time.disabled) {
        el.querySelector("[data-booking-form]").elements.time.value = time.getAttribute("data-booking-time");
        setBookingError(el, "");
        renderBookingTimes(el);
        refreshBookingPrice(el);
      }
      if (qty) {
        var qtyInput = el.querySelector("[data-booking-form]").elements.qty;
        var nextQty = Math.max(1, Math.min(20, Number(qtyInput.value || 1) + Number(qty.getAttribute("data-booking-qty"))));
        qtyInput.value = String(nextQty);
        el.querySelector("[data-booking-qty-value]").textContent = String(nextQty);
        refreshBookingPrice(el);
      }
    });
    return el;
  }

  function setBookingError(el, message) {
    if (!el) return;
    var error = el.querySelector("[data-booking-error]");
    if (!error) return;
    error.textContent = message || "";
    error.hidden = !message;
  }

  function cartConfirmModal() {
    var existing = document.querySelector("[data-cart-confirm]");
    if (existing) return existing;
    var el = document.createElement("div");
    el.className = "cart-confirm-modal";
    el.setAttribute("data-cart-confirm", "");
    el.setAttribute("aria-hidden", "true");
    el.innerHTML =
      '<div class="cart-confirm-backdrop" aria-hidden="true"></div>' +
      '<section class="cart-confirm-panel" role="dialog" aria-modal="true" aria-labelledby="cart-confirm-title">' +
      '<button class="cart-confirm-x" type="button" data-cart-confirm-close aria-label="Close">×</button>' +
      '<div class="cart-confirm-mark" aria-hidden="true">✓</div>' +
      '<h3 id="cart-confirm-title" data-cart-confirm-title></h3>' +
      '<p data-cart-confirm-copy></p>' +
      '<div class="cart-confirm-actions">' +
      '<button class="btn line" type="button" data-cart-confirm-close data-cart-confirm-stay></button>' +
      '<a class="btn" data-cart-confirm-link></a>' +
      "</div>" +
      "</section>";
    document.body.appendChild(el);
    el.addEventListener("click", function (event) {
      if (event.target.closest("[data-cart-confirm-close]")) {
        closeCartConfirm();
      }
    });
    return el;
  }

  function closeCartConfirm() {
    var el = document.querySelector("[data-cart-confirm]");
    if (!el) return;
    el.classList.remove("on");
    el.setAttribute("aria-hidden", "true");
    document.body.classList.remove("cart-confirm-open");
  }

  function openCartConfirm(item) {
    var lang = item.locale || locale();
    var el = cartConfirmModal();
    el.querySelector("[data-cart-confirm-title]").textContent = tr(lang, "Added to Cart", "已加入购物车");
    el.querySelector("[data-cart-confirm-copy]").textContent = tr(
      lang,
      "Your booking item is saved. You can continue browsing or checkout now.",
      "预约项目已保存。你可以继续浏览，或现在去结账。"
    );
    el.querySelector("[data-cart-confirm-stay]").textContent = tr(lang, "Continue Browsing", "继续浏览");
    var link = el.querySelector("[data-cart-confirm-link]");
    link.href = lang === "cn" ? "/cn/cart/" : "/cart/";
    link.textContent = tr(lang, "Go to Cart", "去购物车");
    document.body.classList.add("cart-confirm-open");
    el.classList.add("on");
    el.setAttribute("aria-hidden", "false");
  }

  function rateCards(product, lang) {
    if (product.single) {
      var suffix = product.kind === "home" ? "" : "<sup>++</sup>";
      return (
        '<div class="booking-rate-card"><span>' +
        tr(lang, product.kind === "home" ? "Daily package price" : "Daily", product.kind === "home" ? "每天同价 · 配套价" : "每天同价") +
        "</span><b>" +
        baseMoney(product.single) +
        suffix +
        "</b></div>"
      );
    }

    return (
      '<div class="booking-rate-card"><span>' +
      tr(lang, "Sun-Thu", "星期日-四") +
      "</span><b>" +
      baseMoney(product.weekday) +
      "<sup>++</sup></b></div>" +
      '<div class="booking-rate-card"><span>' +
      tr(lang, "Fri, Sat & Public Holidays", "星期五六 & 公共假期") +
      "</span><b>" +
      baseMoney(product.weekend) +
      "<sup>++</sup></b></div>"
    );
  }

  function renderBookingCalendar(el) {
    if (!bookingState) return;
    var product = products[bookingState.code];
    var lang = bookingState.lang;
    var form = el.querySelector("[data-booking-form]");
    var selected = form.elements.date.value;
    var now = today();
    var month = bookingState.month;
    var year = month.getFullYear();
    var monthIndex = month.getMonth();
    var days = new Date(year, monthIndex + 1, 0).getDate();
    var firstDay = new Date(year, monthIndex, 1).getDay();
    var minMonth = monthKey(new Date(now + "T12:00:00+08:00"));
    var html = "";

    el.querySelector("[data-booking-month]").textContent = monthTitle(month, lang);
    el.querySelector("[data-booking-prev]").disabled = monthKey(month) <= minMonth;
    el.querySelector("[data-booking-weekdays]").innerHTML = (
      lang === "cn" ? ["日", "一", "二", "三", "四", "五", "六"] : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    )
      .map(function (day) {
        return "<span>" + day + "</span>";
      })
      .join("");

    for (var blank = 0; blank < firstDay; blank += 1) {
      html += '<span class="booking-day blank"></span>';
    }
    for (var day = 1; day <= days; day += 1) {
      var value = dateString(year, monthIndex, day);
      var disabled = value < now;
      var tier = tierFor(product, value);
      var holiday = !!holidays[value];
      var classes = "booking-day" + (selected === value ? " selected" : "") + (tier === "weekend" ? " premium" : "") + (disabled ? " disabled" : "");
      html +=
        '<button type="button" class="' +
        classes +
        '" data-booking-day="' +
        value +
        '"' +
        (disabled ? " disabled" : "") +
        ' aria-pressed="' +
        (selected === value ? "true" : "false") +
        '"><span class="booking-day-num">' +
        day +
        (holiday ? '<i aria-hidden="true"></i>' : "") +
        '</span><span class="booking-day-price">' +
        baseMoney(basePrice(product, value)) +
        "</span></button>";
    }
    el.querySelector("[data-booking-days]").innerHTML = html;
  }

  function firstAvailableTime(product, date) {
    var start = product.hours ? product.hours[0] : 0;
    var end = product.hours ? product.hours[1] : 23;
    var minStart = minStartTime(product);
    for (var h = start; h <= end; h += 1) {
      var value = String(h).padStart(2, "0") + ":00";
      if (selectedDateTime(date, value) >= minStart) return value;
    }
    return "";
  }

  function renderBookingTimes(el) {
    if (!bookingState) return;
    var form = el.querySelector("[data-booking-form]");
    var product = products[bookingState.code];
    var date = form.elements.date.value || today();
    var selected = form.elements.time.value;
    if (!selected || selectedDateTime(date, selected) < minStartTime(product)) {
      selected = firstAvailableTime(product, date);
      form.elements.time.value = selected;
    }
    el.querySelector("[data-booking-times]").innerHTML = selected
      ? timeOptions(product, date, selected)
      : '<span class="booking-no-slots">' + tr(bookingState.lang, "No online slots left for this date.", "这个日期已没有可线上预约时间。") + "</span>";
  }

  function bookingNotes(code, product, lang) {
    var commonPrice = product.kind === "home"
      ? tr(lang, "Home massage is subject to 8% SST only; no service charge.", "上门按摩只加 8% SST，不收服务费。")
      : product.single
        ? tr(lang, "Same-price packages stay the same every day; the final total updates after date and quantity.", "每天同价配套不分平日周末；选日期和数量后自动显示总额。")
        : tr(lang, "Pick a date and the price updates automatically; public holidays use the weekend rate.", "选日期价格自动跟着跳；公共假期算周末价。");
    var notes = {
      b1f1: [
        tr(lang, "One order admits 2 adults together - same day, same time.", "一张订单两位大人同行入场，需同一天同一时间。"),
        tr(lang, "Pools, steam, sauna, rest lounges and a full 12-hour stay are included.", "包含泡池、汗蒸、桑拿、休息区与完整 12 小时。"),
        tr(lang, "Buffet dinner runs 6-9pm; light meals are available at other hours.", "晚餐自助 6-9pm；其他时段提供简餐。"),
        tr(lang, "Sunday counts as a weekday here - Sun-Thu all get the lower price.", "星期日在这里算平日，星期日到星期四都是低价档。"),
        tr(lang, "Total for 2 adults - not per person.", "价格是 2 位大人的总价，不是每人价。"),
        commonPrice
      ],
      solo: [
        tr(lang, "A full 12 hours plus a massage, just for you.", "一个人也能泡足 12 小时，再送一项按摩。"),
        tr(lang, "Free 30-min massage: foot & leg, or Chinese partial - choose on arrival.", "免费 30 分钟按摩：足腿或中式局部，到店自选。"),
        tr(lang, "Pools, steam, sauna, rest lounges and buffet dinner are included.", "包含泡池、汗蒸、桑拿、休息区与晚餐自助。"),
        tr(lang, "Online booking only - walk-ins don't get the bonus; we register it automatically on your order.", "只限线上预约，现场 walk-in 没有这个赠送；系统会自动登记在订单内。"),
        tr(lang, "Coming as 3 or 5? Pair this with Buy 1 Free 1 for the best value.", "3 位或 5 位来？搭配买一送一最划算。"),
        commonPrice
      ],
      daytime: [
        tr(lang, "Enter between 9:00 AM and 5:00 PM daily; your booking time is your entry time.", "每日 9am-5pm 入场；预约时间就是入场时间。"),
        tr(lang, "Pick 1 of 3 on arrival: 60-min massage / 60-min foot therapy / detox care (2 of 5).", "到店 3 选 1：60 分钟按摩 / 60 分钟足疗 / 排毒护理 5 选 2。"),
        tr(lang, "Pools, steam, sauna, dining, fruits and ice cream are included.", "包含泡池、汗蒸、桑拿、餐饮、水果与冰淇淋。"),
        tr(lang, "Staying past 5:00 PM needs a top-up ticket at the front desk.", "超过 5pm 需要在前台补差价。"),
        commonPrice
      ],
      scrub: [
        tr(lang, "Traditional 30-min Yangzhou body scrub - soak first, then scrub.", "30 分钟传统扬州搓澡，先泡后搓。"),
        tr(lang, "12-hour entry is already included - no separate ticket needed.", "12 小时门票已经包含，不需要另买入场券。"),
        tr(lang, "Pools, steam, sauna, dining, fruits and ice cream are included.", "包含泡池、汗蒸、桑拿、餐饮、水果与冰淇淋。"),
        commonPrice
      ],
      "allday-sm": [
        tr(lang, "One ticket includes 12-hour spa access with buffet.", "一张票包含 12 小时温泉入场，含餐饮。"),
        tr(lang, "Includes a 30-min Yangzhou body scrub.", "包含 30 分钟扬州搓澡。"),
        tr(lang, "Includes a 60-min tuina or foot massage.", "包含 60 分钟推拿或足疗。"),
        tr(lang, "Spa access, scrub and massage are used on the same visit.", "入场、搓澡与按摩需同次到店使用。"),
        commonPrice
      ],
      "daytime-duo": [
        tr(lang, "Two daytime passes - both guests enter together.", "两张日间入场，两位需同行入场。"),
        tr(lang, "Each guest gets one 60-min treatment.", "每人一项 60 分钟护理。"),
        tr(lang, "Choose massage, foot therapy or detox care.", "按摩、足疗或排毒护理可选。"),
        tr(lang, "Daily 9:00 AM-5:00 PM; one package covers two guests.", "每日 9:00-17:00；一个套餐覆盖两位客人。"),
        commonPrice
      ],
      kids: [
        tr(lang, "Kids Ticket is for children age 12 and under, entering with an adult.", "儿童票适用于 12 岁或以下，并需与成人同行入场。"),
        tr(lang, "Adults book as usual; each child adds one Kids Ticket.", "成人照常预约；每位儿童加购一张儿童票。"),
        tr(lang, "Age 2 and under registers free at the front desk.", "2 岁或以下到前台登记免费。"),
        commonPrice
      ],
      "outcall-classic": [
        tr(lang, "60 min oil massage + 60 min traditional Thai - in that order, on purpose.", "60 分钟精油按摩 + 60 分钟传统泰式，顺序固定。"),
        tr(lang, "Start anytime 9:00 AM-10:00 PM at your hotel or home.", "开始时间 9:00 AM-10:00 PM，可在酒店或家里。"),
        tr(lang, "Earliest online slot is 3 hours from booking; sooner than that, WhatsApp us.", "线上最早可预约 3 小时后的时段；更急请 WhatsApp。"),
        tr(lang, "RM100 travel fee within 30km is paid separately in cash on arrival.", "30km 内 RM100 交通费到场现金另付。"),
        commonPrice
      ],
      "outcall-anytime": [
        tr(lang, "Fixed 120 minutes at RM798 flat.", "固定 120 分钟，RM798。"),
        tr(lang, "Tell us your preferred mix of oil, tuina, Thai or foot work.", "可备注偏好的精油、推拿、泰式或足疗组合。"),
        tr(lang, "Bookable round the clock - earliest slot 3 hours from booking.", "全天可预约，最早为下单后 3 小时。"),
        tr(lang, "Message us directly for a longer session.", "需要更长时间请直接 WhatsApp。"),
        tr(lang, "RM100 travel fee within 30km is paid separately in cash on arrival.", "30km 内 RM100 交通费到场现金另付。"),
        commonPrice
      ],
      "outcall-fourhands": [
        tr(lang, "Four hands in sync, one guest only.", "两位技师同步，只服务一位客人。"),
        tr(lang, "Back and legs at the same time - deeper, faster release.", "背部与腿部同时护理，释放更快。"),
        tr(lang, "Start daily from 9:00 AM to 10:00 PM.", "每日 9:00 AM-10:00 PM 可开始。"),
        tr(lang, "Earliest online slot is 3 hours from booking; sooner than that, WhatsApp us.", "线上最早可预约 3 小时后；更急请 WhatsApp。"),
        tr(lang, "One RM100 travel fee within 30km covers both therapists and is paid on arrival.", "30km 内 RM100 交通费覆盖两位技师，到场另付。"),
        commonPrice
      ]
    };

    return (notes[code] || [commonPrice])
      .map(function (note) {
        return "<p>· " + note + "</p>";
      })
      .join("");
  }

  function refreshBookingPrice(el) {
    if (!bookingState) return;
    var form = el.querySelector("[data-booking-form]");
    var code = bookingState.code;
    var lang = bookingState.lang;
    var product = products[code];
    var selectedDate = form.elements.date.value || today();
    var preview = lineFor({ code: code, date: selectedDate, time: form.elements.time.value || "00:00", qty: form.elements.qty.value });
    var tier =
      product.kind === "home"
        ? tr(lang, "Home service", "上门服务")
        : preview.tier === "weekend"
        ? tr(lang, "Fri, Sat & PH", "星期五、六与公假")
        : preview.tier === "weekday"
          ? tr(lang, "Sun-Thu", "星期日-星期四")
          : tr(lang, "Daily", "每天同价");
    var priceSuffix = product.kind === "home" ? "" : "<sup>++</sup>";
    el.querySelector("[data-booking-price]").innerHTML =
      '<div><span>' +
      tier +
      " · " +
      selectedDate +
      '</span><strong>' +
      baseMoney(preview.price) +
      priceSuffix +
      " " +
      (lang === "cn" ? product.unitCn : product.unitEn) +
      "</strong></div><div><span>" +
      taxLabel(product, lang) +
      '</span><b>' +
      tr(lang, "Total ", "总额 ") +
      money(preview.total) +
      "</b></div>";
  }

  function closeModal() {
    var el = document.querySelector("[data-booking-modal]");
    if (el) el.classList.remove("on");
    document.body.classList.remove("booking-open");
  }

  function openModal(code, forcedLocale) {
    var product = products[code];
    if (!product) return;
    var el = modal();
    var form = el.querySelector("[data-booking-form]");
    var date = form.elements.date;
    var time = form.elements.time;
    var qty = form.elements.qty;
    var lang = forcedLocale || locale();
    var todayValue = today();

    bookingState = {
      code: code,
      lang: lang,
      month: new Date(todayValue + "T12:00:00+08:00")
    };
    form.dataset.code = code;
    form.dataset.locale = lang;
    el.querySelector("[data-booking-title]").textContent = tr(lang, "Pick your date", "选到店日期");
    el.querySelector("[data-booking-rates]").innerHTML = rateCards(product, lang);
    el.querySelector("[data-booking-tier-note]").textContent =
      product.kind === "home"
        ? tr(lang, "Home massage price is daily flat rate. Travel fee is paid separately on arrival.", "上门按摩每天同价；交通费到场另付。")
        : product.single
          ? tr(lang, "Same price daily.", "每天同价。")
          : tr(lang, "Sunday counts as weekday price.", "星期日也是平日价");
    el.querySelector("[data-booking-note]").innerHTML = bookingNotes(code, product, lang);
    el.querySelector("[data-time-label]").textContent = lang === "cn" ? "时间" : "Time";
    el.querySelector("[data-qty-label]").textContent = lang === "cn" ? "数量" : "Qty";
    el.querySelector("[data-booking-submit]").textContent = tr(lang, "Add to Cart", "加入购物车");
    setBookingError(el, "");
    date.value = todayValue;
    time.value = "";
    qty.value = "1";
    el.querySelector("[data-booking-qty-value]").textContent = "1";

    renderBookingCalendar(el);
    renderBookingTimes(el);
    refreshBookingPrice(el);
    document.body.classList.add("booking-open");
    el.classList.add("on");
  }

  document.addEventListener("click", function (event) {
    var btn = event.target.closest("[data-book]");
    if (!btn) return;
    event.preventDefault();
    openModal(btn.getAttribute("data-book"), btn.getAttribute("data-book-locale"));
  });

  document.addEventListener("submit", function (event) {
    var form = event.target.closest("[data-booking-form]");
    if (!form) return;
    event.preventDefault();
    var code = form.dataset.code;
    var product = products[code];
    if (!product) return;
    if (!form.elements.time.value) {
      setBookingError(document.querySelector("[data-booking-modal]"), text("Please choose a time before adding to cart.", "加入购物车前请选择时间。"));
      return;
    }
    var item = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2),
      code: code,
      locale: form.dataset.locale || locale(),
      name: form.dataset.locale === "cn" ? product.cn : product.en,
      date: form.elements.date.value,
      time: form.elements.time.value,
      qty: Math.max(1, Number(form.elements.qty.value || 1))
    };
    var cart = readCart();
    cart.push(item);
    writeCart(cart);
    closeModal();
    openCartConfirm(item);
  });

  function cartMessage(ref, items, customer) {
    var lang = locale();
    var lines = [];
    lines.push(lang === "cn" ? "你好，我已提交预约。" : "Hi, I have submitted a reservation.");
    if (ref) lines.push((lang === "cn" ? "预约编号: " : "Reservation ref: ") + ref);
    lines.push((lang === "cn" ? "姓名: " : "Name: ") + customer.name);
    lines.push((lang === "cn" ? "电话: " : "Phone: ") + customer.phone);
    items.forEach(function (item, index) {
      var line = lineFor(item);
      lines.push(
        (index + 1) +
          ". " +
          (lang === "cn" ? line.product.cn : line.product.en) +
          " x" +
          line.qty +
          " · " +
          item.date +
          " " +
          item.time +
          " · " +
          money(line.total)
      );
    });
    lines.push(lang === "cn" ? "付款: 护理完成后付款" : "Payment: pay after treatment");
    return lines.join("\n");
  }

  function renderCart() {
    var root = document.querySelector("[data-cart-page]");
    if (!root) return;
    var lang = root.getAttribute("data-locale") || locale();
    var items = readCart();

    if (!items.length) {
      root.innerHTML =
        '<div class="cart-empty"><h3>' +
        (lang === "cn" ? "购物车是空的" : "Your cart is empty") +
        "</h3><p>" +
        (lang === "cn" ? "先选择一个配套和预约时间。" : "Pick a package and reservation time first.") +
        '</p><a class="btn" href="' +
        (lang === "cn" ? "/cn/packages/" : "/packages/") +
        '">' +
        (lang === "cn" ? "看配套" : "View Packages") +
        "</a></div>";
      return;
    }

    var sum = totals(items);
    var rows = items
      .map(function (item) {
        var line = lineFor(item);
        return (
          '<article class="cart-item"><div><h3>' +
          (lang === "cn" ? line.product.cn : line.product.en) +
          "</h3><p>" +
          item.date +
          " · " +
          item.time +
          " · " +
          (lang === "cn" ? "数量 " : "Qty ") +
          line.qty +
          " · " +
          (lang === "cn" ? line.product.unitCn : line.product.unitEn) +
          '</p></div><div class="cart-item-price">' +
          money(line.total) +
          '</div><button type="button" class="cart-remove" data-remove="' +
          item.id +
          '">' +
          (lang === "cn" ? "移除" : "Remove") +
          "</button></article>"
        );
      })
      .join("");

    root.innerHTML =
      '<div class="cart-layout"><div class="cart-list">' +
      rows +
      '</div><form class="reserve-form" data-reserve-form><h3>' +
      (lang === "cn" ? "结账资料" : "Checkout Details") +
      '</h3><label><span>' +
      (lang === "cn" ? "姓名" : "Name") +
      '</span><input name="name" required autocomplete="name" /></label><label><span>' +
      (lang === "cn" ? "电话 / WhatsApp / Telegram" : "Phone / WhatsApp / Telegram") +
      '</span><input name="phone" required autocomplete="tel" /></label><label><span>Email</span><input name="email" type="email" autocomplete="email" /></label><label><span>' +
      (lang === "cn" ? "备注" : "Notes") +
      '</span><textarea name="notes" rows="3"></textarea></label><div class="cart-total"><div><span>Subtotal</span><b>' +
      money(sum.subtotal) +
      "</b></div><div><span>Service charge</span><b>" +
      money(sum.sc) +
      "</b></div><div><span>SST</span><b>" +
      money(sum.sst) +
      "</b></div><div class=\"grand\"><span>Total</span><b>" +
      money(sum.total) +
      "</b></div></div><p class=\"cart-pay-note\">" +
      (lang === "cn" ? "无需线上付款。护理完成后到店付款。" : "No online payment. Pay after treatment at One Spa.") +
      '</p><button class="btn wide" type="submit">' +
      (lang === "cn" ? "提交预约" : "Submit Reservation") +
      '</button><div class="reserve-status" data-reserve-status></div></form></div>';
  }

  document.addEventListener("click", function (event) {
    var remove = event.target.closest("[data-remove]");
    if (!remove) return;
    writeCart(readCart().filter(function (item) {
      return item.id !== remove.getAttribute("data-remove");
    }));
    renderCart();
  });

  document.addEventListener("submit", function (event) {
    var form = event.target.closest("[data-reserve-form]");
    if (!form) return;
    event.preventDefault();
    var status = form.querySelector("[data-reserve-status]");
    var items = readCart();
    var customer = {
      name: form.elements.name.value.trim(),
      phone: form.elements.phone.value.trim(),
      email: form.elements.email.value.trim(),
      notes: form.elements.notes.value.trim()
    };
    status.textContent = text("Saving reservation...", "正在保存预约...");
    fetch(endpoint("/api/reservations"), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ locale: locale(), customer: customer, items: items })
    })
      .then(function (res) {
        return res.json().then(function (body) {
          if (!res.ok) throw new Error(body.error || "Reservation failed");
          return body;
        });
      })
      .then(function (body) {
        writeCart([]);
        var ref = body.reservation && body.reservation.reservation_ref;
        var href = WA + encodeURIComponent(cartMessage(ref, items, customer));
        status.innerHTML =
          '<div class="reserve-ok"><b>' +
          (locale() === "cn" ? "预约已提交" : "Reservation submitted") +
          "</b><p>" +
          (ref || "") +
          '</p><div class="reserve-contact-actions"><a class="btn contact-wa" target="_blank" rel="noopener" href="' +
          href +
          '">' +
          (locale() === "cn" ? "发送 WhatsApp 给店员" : "Send WhatsApp to Staff") +
          '</a><a class="btn contact-tg" target="_blank" rel="noopener" href="' +
          TG +
          '">' +
          (locale() === "cn" ? "Telegram 联系店员" : "Contact Staff on Telegram") +
          "</a></div></div>";
        updateCartCount();
      })
      .catch(function (error) {
        var href = WA + encodeURIComponent(cartMessage("", items, customer));
        status.innerHTML =
          '<div class="reserve-error"><b>' +
          (locale() === "cn" ? "预约暂时无法保存" : "Reservation could not be saved") +
          "</b><p>" +
          error.message +
          '</p><div class="reserve-contact-actions"><a class="btn contact-wa" target="_blank" rel="noopener" href="' +
          href +
          '">' +
          (locale() === "cn" ? "改用 WhatsApp 发送" : "Send by WhatsApp Instead") +
          '</a><a class="btn contact-tg" target="_blank" rel="noopener" href="' +
          TG +
          '">' +
          (locale() === "cn" ? "改用 Telegram 联系" : "Contact by Telegram Instead") +
          "</a></div></div>";
      });
  });

  afterPageReady(function () {
    updateCartCount();
    renderCart();
    initSubnav();
  });
})();
