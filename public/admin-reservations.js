(function () {
  "use strict";

  var TOKEN_KEY = "onespa_admin_token";
  var API_KEY = "onespa_admin_api_base";
  var socket = null;
  var socketScript = null;
  var rows = [];

  function $(selector) {
    return document.querySelector(selector);
  }

  function storedApiBase() {
    var configured = (window.ONESPA_API_BASE || "").trim().replace(/\/$/, "");
    if (configured) return configured;
    var saved = (localStorage.getItem(API_KEY) || "").trim().replace(/\/$/, "");
    if (saved) return saved;
    if (location.hostname === "localhost" && location.port === "3000") return "http://localhost:4000";
    return "";
  }

  function endpoint(path) {
    return storedApiBase() + path;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function money(cents) {
    return "RM" + (Number(cents || 0) / 100).toFixed(2);
  }

  function formatDate(value) {
    if (!value) return "-";
    return String(value).slice(0, 10);
  }

  function firstItem(row) {
    return Array.isArray(row.items) ? row.items[0] : null;
  }

  function setStatus(message, tone) {
    var el = $("[data-admin-status]");
    if (!el) return;
    el.textContent = message;
    el.dataset.tone = tone || "";
  }

  function currentToken() {
    return ($("[data-admin-token]")?.value || "").trim();
  }

  function currentFilter() {
    return $("[data-admin-filter]")?.value || "all";
  }

  function statusOptions(value) {
    return ["pending", "confirmed", "completed", "cancelled", "no_show"]
      .map(function (status) {
        return '<option value="' + status + '"' + (status === value ? " selected" : "") + ">" + status.replace("_", " ") + "</option>";
      })
      .join("");
  }

  function render() {
    var root = $("[data-admin-list]");
    if (!root) return;
    var filter = currentFilter();
    var visible = rows.filter(function (row) {
      return filter === "all" || row.status === filter;
    });

    if (!visible.length) {
      root.innerHTML = '<div class="admin-empty">No reservations found.</div>';
      return;
    }

    root.innerHTML = visible
      .map(function (row) {
        var item = firstItem(row);
        var itemTitle = item ? item.nameEn || item.name || item.code : "Reservation";
        var when = item ? item.date + " " + item.time : formatDate(row.visit_date);
        var phoneDigits = String(row.customer_phone || "").replace(/\D/g, "");
        return (
          '<article class="admin-card" data-ref="' +
          escapeHtml(row.reservation_ref) +
          '"><div class="admin-card-main"><div><span class="admin-ref">' +
          escapeHtml(row.reservation_ref) +
          "</span><h3>" +
          escapeHtml(row.customer_name) +
          "</h3><p>" +
          escapeHtml(row.customer_phone) +
          (row.customer_email ? " · " + escapeHtml(row.customer_email) : "") +
          '</p></div><div class="admin-money">' +
          money(row.total_cents) +
          '</div></div><div class="admin-meta"><span>' +
          escapeHtml(when) +
          "</span><span>" +
          escapeHtml(itemTitle) +
          "</span><span>Qty " +
          escapeHtml(item ? item.qty : "-") +
          '</span></div><div class="admin-actions"><select data-admin-update="' +
          escapeHtml(row.reservation_ref) +
          '">' +
          statusOptions(row.status) +
          '</select><a class="btn line" target="_blank" rel="noopener" href="https://wa.me/' +
          phoneDigits +
          '">WhatsApp</a></div>' +
          (row.customer_notes ? '<p class="admin-note">' + escapeHtml(row.customer_notes) + "</p>" : "") +
          "</article>"
        );
      })
      .join("");
  }

  function saveSettings() {
    localStorage.setItem(TOKEN_KEY, currentToken());
    var base = ($("[data-admin-api-base]")?.value || "").trim().replace(/\/$/, "");
    if (base) localStorage.setItem(API_KEY, base);
    else localStorage.removeItem(API_KEY);
  }

  function refresh() {
    saveSettings();
    var token = currentToken();
    setStatus("Loading reservations...", "");
    fetch(endpoint("/api/reservations?token=" + encodeURIComponent(token)))
      .then(function (res) {
        return res.json().then(function (body) {
          if (!res.ok) throw new Error(body.error || "Could not load reservations.");
          return body;
        });
      })
      .then(function (body) {
        rows = body.reservations || [];
        render();
        setStatus("Loaded " + rows.length + " reservations.", "ok");
        connectSocket();
      })
      .catch(function (error) {
        setStatus(error.message, "bad");
      });
  }

  function updateReservation(ref, status) {
    saveSettings();
    fetch(endpoint("/api/reservations"), {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "x-admin-token": currentToken()
      },
      body: JSON.stringify({ reservationRef: ref, status: status })
    })
      .then(function (res) {
        return res.json().then(function (body) {
          if (!res.ok) throw new Error(body.error || "Could not update reservation.");
          return body;
        });
      })
      .then(function () {
        setStatus("Updated " + ref + ".", "ok");
      })
      .catch(function (error) {
        setStatus(error.message, "bad");
        refresh();
      });
  }

  function upsert(row) {
    var index = rows.findIndex(function (item) {
      return item.reservation_ref === row.reservation_ref;
    });
    if (index >= 0) rows[index] = Object.assign({}, rows[index], row);
    else rows.unshift(row);
    render();
  }

  function loadSocketScript(base) {
    if (window.io) return Promise.resolve();
    if (socketScript) return socketScript;
    socketScript = new Promise(function (resolve, reject) {
      var script = document.createElement("script");
      script.src = (base || "") + "/socket.io/socket.io.js";
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
    return socketScript;
  }

  function connectSocket() {
    var token = currentToken();
    var base = storedApiBase();
    if (socket && socket.connected) return;

    loadSocketScript(base)
      .then(function () {
        if (!window.io) throw new Error("Socket.IO client did not load.");
        if (socket) socket.disconnect();
        socket = window.io(base || undefined, {
          auth: { token: token },
          transports: ["websocket", "polling"]
        });
        socket.on("connect", function () {
          setStatus("Websocket connected. Waiting for live reservations.", "ok");
        });
        socket.on("connect_error", function (error) {
          setStatus("Websocket offline: " + error.message, "bad");
        });
        socket.on("reservation:created", function (row) {
          upsert(row);
          setStatus("New reservation received: " + row.reservation_ref, "ok");
        });
        socket.on("reservation:updated", function (row) {
          upsert(row);
          setStatus("Reservation updated: " + row.reservation_ref, "ok");
        });
      })
      .catch(function () {
        setStatus("Websocket client not found. Start npm run backend or set API base.", "bad");
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var tokenInput = $("[data-admin-token]");
    var apiInput = $("[data-admin-api-base]");
    if (!tokenInput || !apiInput) return;
    tokenInput.value = localStorage.getItem(TOKEN_KEY) || "";
    apiInput.value = localStorage.getItem(API_KEY) || storedApiBase();

    $("[data-admin-refresh]")?.addEventListener("click", refresh);
    $("[data-admin-save]")?.addEventListener("click", refresh);
    $("[data-admin-filter]")?.addEventListener("change", render);
    document.addEventListener("change", function (event) {
      var select = event.target.closest("[data-admin-update]");
      if (!select) return;
      updateReservation(select.getAttribute("data-admin-update"), select.value);
    });

    if (tokenInput.value) refresh();
    else setStatus("Enter your admin token to load reservations.", "");
  });
})();
