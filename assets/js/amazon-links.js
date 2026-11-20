/**
 * Amazon-Links nach Kanal (?src=pinterest|tiktok|instagram|direkt).
 *
 * Attribution-Tags existieren noch nicht. In AMAZON_URLS stehen deshalb
 * vorerst klare amazon.de/dp/ASIN-Platzhalter. Sobald Michael Tags in der
 * Ads-Konsole anlegt, werden die Werte in dieser Zuordnung (Kanal × Buch)
 * durch die unveränderten Attribution-URLs ersetzt — je ein Tag pro
 * Kombination, Ziel bleibt die Amazon-Produktdetailseite bzw. die Serienseite.
 *
 * PartnerNet-Links dürfen nicht mit Attribution-Tags kombiniert werden.
 * Dieses Skript setzt keine Cookies und sendet nichts nach außen.
 */
(function () {
  "use strict";

  var CHANNELS = ["pinterest", "tiktok", "instagram", "direkt"];

  // Eine Zeile: ab bzw. nach dem 10.12.2026 auf true setzen, dann erscheint Band 7 (Meal Prep).
  var SHOW_BAND7_MEALPREP = false;

  // Platzhalter: gleiche Amazon-URL je Kanal, bis Attribution-Tags vorliegen.
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

  var AMAZON_URLS = {
    pinterest: {},
    tiktok: {},
    instagram: {},
    direkt: {}
  };
  CHANNELS.forEach(function (ch) {
    Object.keys(ASINs).forEach(function (key) {
      AMAZON_URLS[ch][key] = dp(ASINs[key]);
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
