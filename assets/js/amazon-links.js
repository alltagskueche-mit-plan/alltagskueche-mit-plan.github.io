/**
 * Amazon-Links nach Kanal (?src=pinterest|tiktok|instagram|direkt).
 *
 * Attribution-Tags (21.11.2026): je sichtbares Buch ein Tag mit Herausgeber
 * und Anzeigengruppe „Reihen-Seite“. Dieselbe URL gilt für alle Kanäle,
 * weil nur ein Tag je Buch angelegt wurde. Die Serienseite (B0HHGNQ95L)
 * konnte in Attribution nicht als Produkt hinzugefügt werden und bleibt
 * deshalb ein einfacher amazon.de/dp-Link. Band 7 (Meal Prep) bleibt
 * ausgeblendet und ohne Tag, bis nach dem 10.12.2026.
 *
 * PartnerNet-Links dürfen nicht mit Attribution-Tags kombiniert werden.
 * Dieses Skript setzt keine Cookies und sendet nichts nach außen.
 */
(function () {
  "use strict";

  var CHANNELS = ["pinterest", "tiktok", "instagram", "direkt"];

  // Eine Zeile: ab bzw. nach dem 10.12.2026 auf true setzen, dann erscheint Band 7 (Meal Prep).
  var SHOW_BAND7_MEALPREP = false;

  var ASINs = {
    stoffwechsel: "B0H8K92LJ7",
    blutzucker: "B0HGND8NGN",
    entzuendungshemmend: "B0HGVFPYQG",
    highprotein50: "B0HJL24Z7N",
    wechseljahre: "B0HL6VFT3N",
    highproteinwj: "B0HP7FHZK2",
    mealprep: "B0HRT6TCG7",
    serie: "B0HHGNQ95L"
  };

  function dp(asin) {
    return "https://www.amazon.de/dp/" + asin;
  }

  function tag(asin, maas) {
    return "https://www.amazon.de/dp/" + asin + "?maas=" + maas + "&ref_=aa_maas&tag=maas";
  }

  var TAGS = {
    stoffwechsel: tag("B0H8K92LJ7", "maas_adg_934C8965B3DE61629DC4F089BCA3714C_afap_abs"),
    blutzucker: tag("B0HGND8NGN", "maas_adg_E61CD8EE60BA3BF3C4FE717CDC3079B9_afap_abs"),
    entzuendungshemmend: tag("B0HGVFPYQG", "maas_adg_5E156898F13C46CF500E6849788F3DFB_afap_abs"),
    highprotein50: tag("B0HJL24Z7N", "maas_adg_ED27DAB94E60776CCBA33B3D80D4C03A_afap_abs"),
    wechseljahre: tag("B0HL6VFT3N", "maas_adg_BC1200D2F46A2B09FADABCEE8CBE2BD4_afap_abs"),
    highproteinwj: tag("B0HP7FHZK2", "maas_adg_11B775806310F0044EFC0077DE90673C_afap_abs")
  };

  var AMAZON_URLS = {
    pinterest: {},
    tiktok: {},
    instagram: {},
    direkt: {}
  };
  CHANNELS.forEach(function (ch) {
    Object.keys(ASINs).forEach(function (key) {
      AMAZON_URLS[ch][key] = TAGS[key] || dp(ASINs[key]);
    });
  });

  function channelFromQuery() {
    var params = new URLSearchParams(window.location.search);
    var src = (params.get("src") || "").toLowerCase();
    return CHANNELS.indexOf(src) !== -1 ? src : "direkt";
  }

  var channel = channelFromQuery();
  var map = AMAZON_URLS[channel] || AMAZON_URLS.direkt;

  document.querySelectorAll("[data-amazon]").forEach(function (el) {
    var key = el.getAttribute("data-amazon");
    if (map[key]) {
      el.setAttribute("href", map[key]);
    }
    el.setAttribute("rel", "noopener noreferrer");
    if (!el.getAttribute("target")) {
      el.setAttribute("target", "_blank");
    }
  });

  document.documentElement.setAttribute("data-src", channel);
  document.documentElement.setAttribute("data-show-band7", SHOW_BAND7_MEALPREP ? "true" : "false");
  var mealprepCard = document.querySelector("[data-band=\"mealprep\"]");
  if (mealprepCard) {
    if (SHOW_BAND7_MEALPREP) {
      mealprepCard.removeAttribute("hidden");
    } else {
      mealprepCard.setAttribute("hidden", "");
    }
  }
})();
