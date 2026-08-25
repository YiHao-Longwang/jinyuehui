(function () {
  "use strict";

  var TOKEN_KEY = "onespa_admin_token";
  var LIMIT = 25;
  var offset = 0;
  var total = 0;
  var activeTab = "history";
  var historyRows = [];
  var seriesRows = [];

  function $(selector) {
    return document.querySelector(selector);
  }

  function $all(selector) {
    return Array.from(document.querySelectorAll(selector));
  }

  function storedApiBase() {
    var configured = (window.ONESPA_API_BASE || "").trim().replace(/\/$/, "");
    if (configured) return configured;
    if (location.hostname === "localhost" && location.port !== "4000") return "http://localhost:4000";
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

  function readJsonResponse(res, fallback) {
    return res.text().then(function (text) {
      var body = {};
      if (text) {
        try {
          body = JSON.parse(text);
        } catch {
          body = { error: text.slice(0, 180) };
        }
      }
      if (!res.ok) throw new Error(body.error || fallback || "Request failed.");
      return body;
    });
  }

  function setStatus(message, tone, target) {
    var el = $(target || "[data-click-status]");
    if (!el) return;
    el.textContent = message;
    el.dataset.tone = tone || "";
  }

  function currentToken() {
    return ($("[data-click-token]")?.value || "").trim();
  }

  function currentChannel() {
    return $("[data-click-channel]")?.value || "all";
  }

  function currentDays() {
    return $("[data-click-days]")?.value || "14";
  }

  function saveToken() {
    localStorage.setItem(TOKEN_KEY, currentToken());
  }

  function setLoggedIn(isLoggedIn) {
    var login = $("[data-click-login]");
    var dashboard = $("[data-click-dashboard]");
    if (login) login.hidden = isLoggedIn;
    if (dashboard) dashboard.hidden = !isLoggedIn;
  }

  function formatDateTime(value) {
    if (!value) return "-";
    var date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value).slice(0, 16);
    return date.toLocaleString("en-MY", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  function formatDay(value) {
    var date = new Date(value + "T00:00:00+08:00");
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("en-MY", { month: "short", day: "2-digit" });
  }

  function channelLabel(channel) {
    return channel === "whatsapp" ? "WhatsApp" : "Telegram";
  }

  function channelClass(channel) {
    return channel === "whatsapp" ? "whatsapp" : "telegram";
  }

  function renderHistory() {
    var root = $("[data-click-table]");
    if (!root) return;
    if (!historyRows.length) {
      root.innerHTML = '<div class="admin-empty">No contact clicks found.</div>';
    } else {
      root.innerHTML =
        '<div class="click-table-scroll"><table class="click-table"><thead><tr>' +
        "<th>Date</th><th>Channel</th><th>Button label</th><th>Page</th><th>Link</th>" +
        "</tr></thead><tbody>" +
        historyRows
          .map(function (row) {
            var href = row.href || "";
            return (
              "<tr><td>" +
              escapeHtml(formatDateTime(row.created_at)) +
              '</td><td><span class="click-channel-pill ' +
              channelClass(row.channel) +
              '">' +
              channelLabel(row.channel) +
              "</span></td><td>" +
              escapeHtml(row.label || "-") +
              "</td><td>" +
              escapeHtml(row.path || "-") +
              "</td><td>" +
              (href
                ? '<a href="' + escapeHtml(href) + '" target="_blank" rel="noopener">Open</a>'
                : '<span class="muted">-</span>') +
              "</td></tr>"
            );
          })
          .join("") +
        "</tbody></table></div>";
    }

    var page = Math.floor(offset / LIMIT) + 1;
    var maxPage = Math.max(1, Math.ceil(total / LIMIT));
    var pageEl = $("[data-click-page]");
    var prev = $("[data-click-prev]");
    var next = $("[data-click-next]");
    if (pageEl) pageEl.textContent = "Page " + page + " of " + maxPage + " · " + total + " clicks";
    if (prev) prev.disabled = offset <= 0;
    if (next) next.disabled = offset + LIMIT >= total;
  }

  function renderGraph() {
    var root = $("[data-click-graph]");
    if (!root) return;
    if (!seriesRows.length) {
      root.innerHTML = '<div class="admin-empty">No graph data found.</div>';
      return;
    }

    var max = seriesRows.reduce(function (highest, row) {
      return Math.max(highest, Number(row.total || 0));
    }, 0);
    if (!max) max = 1;

    root.innerHTML =
      '<div class="click-chart-legend"><span><i class="wa"></i>WhatsApp</span><span><i class="tg"></i>Telegram</span></div>' +
      '<div class="click-chart">' +
      seriesRows
        .map(function (row) {
          var whatsapp = Number(row.whatsapp || 0);
          var telegram = Number(row.telegram || 0);
          var totalCount = Number(row.total || 0);
          var waWidth = Math.max(whatsapp ? 3 : 0, (whatsapp / max) * 100);
          var tgWidth = Math.max(telegram ? 3 : 0, (telegram / max) * 100);
          return (
            '<div class="click-chart-row"><time>' +
            escapeHtml(formatDay(row.day)) +
            '</time><div class="click-bar-stack" aria-label="' +
            escapeHtml(row.day + " total " + totalCount) +
            '"><span class="click-bar wa" style="width:' +
            waWidth +
            '%"></span><span class="click-bar tg" style="width:' +
            tgWidth +
            '%"></span></div><b>' +
            totalCount +
            "</b></div>"
          );
        })
        .join("") +
      "</div>";
  }

  function switchTab(tab) {
    activeTab = tab === "graph" ? "graph" : "history";
    $all("[data-click-tab]").forEach(function (button) {
      var isActive = button.getAttribute("data-click-tab") === activeTab;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });
    $all("[data-click-panel]").forEach(function (panel) {
      panel.hidden = panel.getAttribute("data-click-panel") !== activeTab;
    });
  }

  function loadHistory() {
    var token = currentToken();
    var query =
      "?view=history&token=" +
      encodeURIComponent(token) +
      "&channel=" +
      encodeURIComponent(currentChannel()) +
      "&limit=" +
      LIMIT +
      "&offset=" +
      offset;
    return fetch(endpoint("/api/contact-clicks" + query))
      .then(function (res) {
        return readJsonResponse(res, "Could not load click history.");
      })
      .then(function (body) {
        historyRows = body.clicks || [];
        total = Number(body.total || 0);
        renderHistory();
      });
  }

  function loadSeries() {
    var token = currentToken();
    var query =
      "?view=series&token=" +
      encodeURIComponent(token) +
      "&channel=" +
      encodeURIComponent(currentChannel()) +
      "&days=" +
      encodeURIComponent(currentDays());
    return fetch(endpoint("/api/contact-clicks" + query))
      .then(function (res) {
        return readJsonResponse(res, "Could not load click graph.");
      })
      .then(function (body) {
        seriesRows = body.series || [];
        renderGraph();
      });
  }

  function refreshAll() {
    saveToken();
    if (!currentToken()) {
      setLoggedIn(false);
      setStatus("Enter your admin token to continue.", "bad", "[data-click-login-status]");
      return;
    }

    setLoggedIn(true);
    setStatus("Loading click analytics...", "");
    Promise.all([loadHistory(), loadSeries()])
      .then(function () {
        setStatus("Loaded " + total + " contact clicks.", "ok");
        setStatus("", "", "[data-click-login-status]");
      })
      .catch(function (error) {
        setStatus(error.message, "bad");
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var tokenInput = $("[data-click-token]");
    if (!tokenInput) return;
    tokenInput.value = localStorage.getItem(TOKEN_KEY) || "";

    $("[data-click-save]")?.addEventListener("click", refreshAll);
    $("[data-click-refresh]")?.addEventListener("click", refreshAll);
    $("[data-click-logout]")?.addEventListener("click", function () {
      localStorage.removeItem(TOKEN_KEY);
      tokenInput.value = "";
      historyRows = [];
      seriesRows = [];
      total = 0;
      offset = 0;
      setLoggedIn(false);
      setStatus("Logged out.", "", "[data-click-login-status]");
    });
    $("[data-click-channel]")?.addEventListener("change", function () {
      offset = 0;
      refreshAll();
    });
    $("[data-click-days]")?.addEventListener("change", refreshAll);
    $("[data-click-prev]")?.addEventListener("click", function () {
      offset = Math.max(0, offset - LIMIT);
      refreshAll();
    });
    $("[data-click-next]")?.addEventListener("click", function () {
      if (offset + LIMIT < total) offset += LIMIT;
      refreshAll();
    });
    $all("[data-click-tab]").forEach(function (button) {
      button.addEventListener("click", function () {
        switchTab(button.getAttribute("data-click-tab"));
      });
    });
    tokenInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") refreshAll();
    });

    switchTab(activeTab);
    if (tokenInput.value) refreshAll();
    else {
      setLoggedIn(false);
      setStatus("Enter your admin token to continue.", "", "[data-click-login-status]");
    }
  });
})();
