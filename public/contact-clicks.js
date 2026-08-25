(function () {
  "use strict";

  if (/^\/(?:admin|codex-healthcheck)(?:\/|$)/.test(location.pathname)) return;

  function channelFor(link) {
    var href = String(link.href || "");
    var className = String(link.className || "");
    if (/wa\.me|whatsapp/i.test(href) || /(^|\s)(contact-wa|whatsapp)(\s|$)/i.test(className)) return "whatsapp";
    if (/t\.me|telegram\.me|telegram/i.test(href) || /(^|\s)(contact-tg|telegram)(\s|$)/i.test(className)) return "telegram";
    return "";
  }

  function compactText(value) {
    return String(value || "").replace(/\s+/g, " ").trim().slice(0, 120);
  }

  function send(payload) {
    var body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      var blob = new Blob([body], { type: "application/json" });
      if (navigator.sendBeacon("/api/contact-clicks", blob)) return;
    }
    fetch("/api/contact-clicks", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: body,
      keepalive: true
    }).catch(function () {});
  }

  document.addEventListener(
    "click",
    function (event) {
      var target = event.target;
      if (!target || !target.closest) return;
      var link = target.closest("a[href]");
      if (!link) return;

      var channel = channelFor(link);
      if (!channel) return;

      send({
        channel: channel,
        path: location.pathname,
        href: link.href,
        label: compactText(link.getAttribute("aria-label") || link.textContent || channel)
      });
    },
    true
  );
})();
