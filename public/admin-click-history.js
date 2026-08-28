(function () {
  "use strict";

  var TOKEN_KEY = "jinyuehui_admin_token";
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

  function currentPeriod() {
    return $("[data-click-period]")?.value || "week";
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
    var yMax = max <= 5 ? 5 : Math.ceil(max / 5) * 5;
    var width = 900;
    var height = 340;
    var padLeft = 48;
    var padRight = 24;
    var padTop = 30;
    var padBottom = 52;
    var innerWidth = width - padLeft - padRight;
    var innerHeight = height - padTop - padBottom;
    var lastIndex = Math.max(1, seriesRows.length - 1);
    var labelEvery = Math.max(1, Math.ceil(seriesRows.length / 7));
    var whatsappTotal = seriesRows.reduce(function (sum, row) {
      return sum + Number(row.whatsapp || 0);
    }, 0);
    var telegramTotal = seriesRows.reduce(function (sum, row) {
      return sum + Number(row.telegram || 0);
    }, 0);

    function x(index) {
      return padLeft + (index / lastIndex) * innerWidth;
    }

    function y(value) {
      return padTop + innerHeight - (Number(value || 0) / yMax) * innerHeight;
    }

    function linePath(key) {
      return seriesRows
        .map(function (row, index) {
          return (index ? "L" : "M") + x(index).toFixed(1) + " " + y(row[key]).toFixed(1);
        })
        .join(" ");
    }

    function points(key, klass) {
      return seriesRows
        .map(function (row, index) {
          var value = Number(row[key] || 0);
          return (
            '<circle class="click-line-point ' +
            klass +
            '" cx="' +
            x(index).toFixed(1) +
            '" cy="' +
            y(value).toFixed(1) +
            '" r="' +
            (value ? 4.8 : 3.2) +
            '"><title>' +
            escapeHtml(formatDay(row.day) + " · " + channelLabel(key) + " " + value) +
            "</title></circle>"
          );
        })
        .join("");
    }

    function yAxis() {
      return [0, 0.25, 0.5, 0.75, 1]
        .map(function (ratio) {
          var value = Math.round(yMax * ratio);
          var pos = y(value).toFixed(1);
          return (
            '<g><line class="click-grid-line" x1="' +
            padLeft +
            '" x2="' +
            (width - padRight) +
            '" y1="' +
            pos +
            '" y2="' +
            pos +
            '"></line><text class="click-axis-label" x="' +
            (padLeft - 14) +
            '" y="' +
            (Number(pos) + 4) +
            '" text-anchor="end">' +
            value +
            "</text></g>"
          );
        })
        .join("");
    }

    function xAxis() {
      return seriesRows
        .map(function (row, index) {
          if (index !== 0 && index !== seriesRows.length - 1 && index % labelEvery !== 0) return "";
          return (
            '<text class="click-axis-label" x="' +
            x(index).toFixed(1) +
            '" y="' +
            (height - 16) +
            '" text-anchor="middle">' +
            escapeHtml(formatDay(row.day)) +
            "</text>"
          );
        })
        .join("");
    }

    root.innerHTML =
      '<div class="click-chart-summary"><div><span>WhatsApp</span><strong class="wa">' +
      whatsappTotal +
      '</strong></div><div><span>Telegram</span><strong class="tg">' +
      telegramTotal +
      '</strong></div><div><span>Highest day</span><strong>' +
      max +
      '</strong></div></div><div class="click-chart-legend"><span><i class="wa"></i>WhatsApp</span><span><i class="tg"></i>Telegram</span></div>' +
      '<div class="click-line-wrap"><svg class="click-line-chart" viewBox="0 0 ' +
      width +
      " " +
      height +
      '" role="img" aria-label="WhatsApp and Telegram click line graph">' +
      yAxis() +
      '<line class="click-axis-line" x1="' +
      padLeft +
      '" x2="' +
      (width - padRight) +
      '" y1="' +
      (padTop + innerHeight) +
      '" y2="' +
      (padTop + innerHeight) +
      '"></line><path class="click-line wa" d="' +
      linePath("whatsapp") +
      '"></path><path class="click-line tg" d="' +
      linePath("telegram") +
      '"></path>' +
      points("whatsapp", "wa") +
      points("telegram", "tg") +
      xAxis() +
      "</svg></div>";
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
    var period = currentPeriod();
    var periodQuery = /^\d+$/.test(period) ? "&days=" + encodeURIComponent(period) : "&period=" + encodeURIComponent(period);
    var query =
      "?view=series&token=" +
      encodeURIComponent(token) +
      "&channel=" +
      encodeURIComponent(currentChannel()) +
      periodQuery;
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
    $("[data-click-period]")?.addEventListener("change", refreshAll);
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
