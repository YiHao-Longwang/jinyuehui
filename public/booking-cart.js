(function () {
  "use strict";

  var CART_KEY = "onespa_reservation_cart_v1";
  var WA = "https://wa.me/60126702560?text=";
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

  function readCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    } catch {
      return [];
    }
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

  function today() {
    var d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 10);
  }

  function isWeekendOrHoliday(date) {
    var day = new Date(date + "T12:00:00+08:00").getDay();
    return day === 5 || day === 6 || !!holidays[date];
  }

  function lineFor(item) {
    var product = products[item.code];
    var qty = Math.max(1, Number(item.qty || 1));
    var tier = product.single ? "single" : isWeekendOrHoliday(item.date) ? "weekend" : "weekday";
    var price = product.single || product[tier];
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

  function timeOptions(product) {
    var start = 0;
    var end = 23;
    if (product.hours) {
      start = product.hours[0];
      end = product.hours[1];
    }
    var html = "";
    for (var h = start; h <= end; h += 1) {
      var value = String(h).padStart(2, "0") + ":00";
      html += '<option value="' + value + '">' + value + "</option>";
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
      '<div class="k" data-booking-kicker></div>' +
      '<h3 data-booking-title></h3>' +
      '<p data-booking-copy></p>' +
      '<label><span data-date-label></span><input name="date" type="date" required /></label>' +
      '<label><span data-time-label></span><select name="time" required></select></label>' +
      '<label><span data-qty-label></span><input name="qty" type="number" min="1" max="20" value="1" required /></label>' +
      '<div class="booking-price" data-booking-price></div>' +
      '<div class="booking-actions"><button class="btn line" type="button" data-booking-close></button><button class="btn" type="submit"></button></div>' +
      "</form>";
    document.body.appendChild(el);
    el.addEventListener("click", function (event) {
      if (event.target.closest("[data-booking-close]")) closeModal();
    });
    return el;
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

    form.dataset.code = code;
    form.dataset.locale = lang;
    el.querySelector("[data-booking-kicker]").textContent =
      lang === "cn" ? "选择预约时间" : "Choose reservation time";
    el.querySelector("[data-booking-title]").textContent = lang === "cn" ? product.cn : product.en;
    el.querySelector("[data-booking-copy]").textContent =
      lang === "cn" ? "无需线上付款。提交预约后，到店完成护理后付款。" : "No online payment. Submit your reservation and pay after treatment.";
    el.querySelector("[data-date-label]").textContent = lang === "cn" ? "日期" : "Date";
    el.querySelector("[data-time-label]").textContent = lang === "cn" ? "时间" : "Time";
    el.querySelector("[data-qty-label]").textContent = lang === "cn" ? "数量" : "Qty";
    el.querySelector("[data-booking-close]:not(.booking-x)").textContent = lang === "cn" ? "取消" : "Cancel";
    el.querySelector('.booking-actions button[type="submit"]').textContent =
      lang === "cn" ? "加入购物车" : "Add to Cart";
    date.min = today();
    date.value = date.value || today();
    time.innerHTML = timeOptions(product);
    qty.value = "1";

    function refreshPrice() {
      var preview = lineFor({ code: code, date: date.value || today(), time: time.value || "00:00", qty: qty.value });
      var tier =
        preview.tier === "weekend"
          ? text("Fri, Sat & PH", "星期五、六与公假")
          : preview.tier === "weekday"
            ? text("Sun-Thu", "星期日-星期四")
            : text("Daily", "每天同价");
      el.querySelector("[data-booking-price]").textContent =
        tier + " · " + money(preview.price) + " " + (lang === "cn" ? product.unitCn : product.unitEn) + " · " + text("Estimated total ", "预估总额 ") + money(preview.total);
    }

    date.onchange = refreshPrice;
    qty.oninput = refreshPrice;
    time.onchange = refreshPrice;
    refreshPrice();
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
    fetch("/api/reservations", {
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
})();
