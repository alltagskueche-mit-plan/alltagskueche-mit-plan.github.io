/**
 * Rendert die Karten auf /reels/ aus reels.json (Fallback: #reels-data).
 * Nach dem Rendern wird ?src= auf data-keep-src-Links erhalten.
 */
(function () {
  "use strict";

  var root = document.getElementById("reels-list");
  if (!root) return;

  function channelFromQuery() {
    var params = new URLSearchParams(window.location.search);
    var src = (params.get("src") || "").toLowerCase();
    var channels = ["pinterest", "tiktok", "instagram", "direkt"];
    return channels.indexOf(src) !== -1 ? src : "direkt";
  }

  function keepSrc(container) {
    var channel = channelFromQuery();
    if (channel === "direkt") return;
    container.querySelectorAll("[data-keep-src]").forEach(function (el) {
      var href = el.getAttribute("href");
      if (!href || href.indexOf("src=") !== -1) return;
      var hashIndex = href.indexOf("#");
      var base = hashIndex === -1 ? href : href.slice(0, hashIndex);
      var hash = hashIndex === -1 ? "" : href.slice(hashIndex);
      var sep = base.indexOf("?") === -1 ? "?" : "&";
      el.setAttribute("href", base + sep + "src=" + encodeURIComponent(channel) + hash);
    });
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function cardHTML(item) {
    var nr = escapeHtml(item.nr);
    var titel = escapeHtml(item.titel);
    var beschreibung = escapeHtml(item.beschreibung);
    var datum = escapeHtml(item.datum);
    var datumAnzeige = escapeHtml(item.datum_anzeige || item.datum);
    var alt = escapeHtml(item.bild_alt || item.titel);
    var planUrl = escapeHtml(item.plan_url);
    var img = escapeHtml(item.bild);
    var webp = item.bild_webp ? escapeHtml(item.bild_webp) : "";
    var w = item.bild_breite ? ' width="' + escapeHtml(item.bild_breite) + '"' : "";
    var h = item.bild_hoehe ? ' height="' + escapeHtml(item.bild_hoehe) + '"' : "";
    var source = webp
      ? '<source type="image/webp" srcset="' + webp + '">'
      : "";
    return (
      '<article class="reel-card" id="plan-' + nr + '">' +
        '<p class="reel-nr">Plan Nr. ' + nr + "</p>" +
        "<h2>" + titel + "</h2>" +
        '<figure class="reel-photo">' +
          "<picture>" +
            source +
            '<img src="' + img + '"' + w + h + ' alt="' + alt + '" loading="lazy" decoding="async">' +
          "</picture>" +
        "</figure>" +
        '<p class="reel-desc">' + beschreibung + "</p>" +
        '<p class="reel-date"><time datetime="' + datum + '">' + datumAnzeige + "</time></p>" +
        '<a class="btn btn-primary" href="' + planUrl + '" data-keep-src>Zum Plan</a>' +
      "</article>"
    );
  }

  function render(items) {
    if (!Array.isArray(items) || !items.length) return;
    items = items.slice().sort(function (a, b) {
      if (a.datum !== b.datum) return a.datum < b.datum ? 1 : -1;
      return (b.nr || 0) - (a.nr || 0);
    });
    root.innerHTML = items.map(cardHTML).join("");
    keepSrc(root);
  }

  function fromEmbedded() {
    var el = document.getElementById("reels-data");
    if (!el) return null;
    try {
      var data = JSON.parse(el.textContent);
      return data.reels || data;
    } catch (err) {
      return null;
    }
  }

  var embedded = fromEmbedded();
  fetch("reels.json", { cache: "no-cache" })
    .then(function (res) {
      if (!res.ok) throw new Error("reels.json " + res.status);
      return res.json();
    })
    .then(function (data) {
      render(data.reels || data);
    })
    .catch(function () {
      if (embedded) render(embedded);
    });
})();
