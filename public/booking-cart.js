(function () {
  "use strict";

  var CART_KEY = "onespa_reservation_cart_v1";
  var API_KEY = "onespa_admin_api_base";
  var WA = "https://wa.me/60126702560?text=";
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
      '<div class="booking-backdrop" data-booking-close></div>' +
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
    el.querySelector("[data-booking-price]").innerHTML =
      '<span>' +
      tier +
      " · " +
      selectedDate +
      " · " +
      baseMoney(preview.price) +
      "<sup>++</sup> " +
      (lang === "cn" ? product.unitCn : product.unitEn) +
      " · " +
      taxLabel(product, lang) +
      '</span><b>' +
      tr(lang, "Total ", "总额 ") +
      money(preview.total) +
      "</b>";
  }

  function closeModal() {
    var el = document.querySelector("[data-booking-modal]");
    if (el) el.classList.remove("on");
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
    el.querySelector("[data-booking-title]").textContent = tr(lang, "Choose Visit Date", "选到店日期");
    el.querySelector("[data-booking-rates]").innerHTML = rateCards(product, lang);
    el.querySelector("[data-booking-tier-note]").textContent =
      product.kind === "home"
        ? tr(lang, "Home massage price is daily flat rate. Travel fee is paid separately on arrival.", "上门按摩每天同价；交通费到场另付。")
        : product.single
          ? tr(lang, "Same price daily.", "每天同价。")
          : tr(lang, "Sunday counts as weekday price.", "星期日也是平日价");
    el.querySelector("[data-booking-note]").innerHTML =
      "<p>· " +
      (product.kind === "home"
        ? tr(lang, "Home massage is subject to 8% SST only; no service charge.", "上门按摩只加 8% SST，不收服务费。")
        : tr(lang, "The selected date price updates automatically; public holidays follow weekend price.", "选日期价格自动跟着跳，公共假期算周末价")) +
      "</p><p>· " +
      (product.kind === "home"
        ? tr(lang, "Earliest online home-service slot is 3 hours from now.", "上门服务最早只能预约 3 小时后的时间。")
        : tr(lang, "For two-person packages, guests enter together on the same date and time.", "两位要同一天同一时间一起进场，不能拆开用")) +
      "</p>";
    el.querySelector("[data-time-label]").textContent = lang === "cn" ? "时间" : "Time";
    el.querySelector("[data-qty-label]").textContent = lang === "cn" ? "数量" : "Qty";
    el.querySelector("[data-booking-submit]").textContent = tr(lang, "Book", "预订");
    date.value = todayValue;
    time.value = "";
    qty.value = "1";
    el.querySelector("[data-booking-qty-value]").textContent = "1";

    renderBookingCalendar(el);
    renderBookingTimes(el);
    refreshBookingPrice(el);
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
      alert(text("Please choose a time.", "请选择时间。"));
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
    if (confirm(text("Added to cart. Go to cart now?", "已加入购物车。现在去购物车？"))) {
      location.href = item.locale === "cn" ? "/cn/cart/" : "/cart/";
    }
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
      (lang === "cn" ? "预约资料" : "Reservation Details") +
      '</h3><label><span>' +
      (lang === "cn" ? "姓名" : "Name") +
      '</span><input name="name" required autocomplete="name" /></label><label><span>' +
      (lang === "cn" ? "电话 / WhatsApp" : "Phone / WhatsApp") +
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
          '</p><a class="btn" target="_blank" rel="noopener" href="' +
          href +
          '">' +
          (locale() === "cn" ? "发送 WhatsApp 给店员" : "Send WhatsApp to Staff") +
          "</a></div>";
        updateCartCount();
      })
      .catch(function (error) {
        var href = WA + encodeURIComponent(cartMessage("", items, customer));
        status.innerHTML =
          '<div class="reserve-error"><b>' +
          (locale() === "cn" ? "预约暂时无法保存" : "Reservation could not be saved") +
          "</b><p>" +
          error.message +
          '</p><a class="btn line" target="_blank" rel="noopener" href="' +
          href +
          '">' +
          (locale() === "cn" ? "改用 WhatsApp 发送" : "Send by WhatsApp Instead") +
          "</a></div>";
      });
  });

  updateCartCount();
  renderCart();
  initSubnav();
})();
