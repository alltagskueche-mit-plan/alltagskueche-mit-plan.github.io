/**
 * Navigation, Buchfilter und Rezept-Aufklappung.
 * Keine externen Aufrufe, keine Speicherung.
 */
(function () {
  "use strict";

  var menu = document.getElementById("menu-btn");
  var links = document.getElementById("nav-links");
  if (menu && links) {
    menu.addEventListener("click", function () {
      var opened = links.classList.toggle("show");
      menu.setAttribute("aria-expanded", String(opened));
      menu.setAttribute("aria-label", opened ? "Menü schließen" : "Menü öffnen");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("show");
        menu.setAttribute("aria-expanded", "false");
        menu.setAttribute("aria-label", "Menü öffnen");
      });
    });
  }

  var filters = Array.prototype.slice.call(document.querySelectorAll("[data-filter]"));
  var cards = Array.prototype.slice.call(document.querySelectorAll(".book-card"));
  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var value = btn.getAttribute("data-filter");
      filters.forEach(function (x) {
        var on = x === btn;
        x.classList.toggle("active", on);
        x.setAttribute("aria-pressed", String(on));
      });
      cards.forEach(function (card) {
        if (card.getAttribute("data-band") === "mealprep" && card.hasAttribute("hidden")) {
          return;
        }
        var show = value === "all" || card.getAttribute("data-category") === value;
        card.style.display = show ? "" : "none";
      });
    });
  });

  var toggle = document.getElementById("recipe-btn");
  var details = document.getElementById("recipe-details");
  if (toggle && details) {
    toggle.addEventListener("click", function () {
      var opening = details.hidden;
      details.hidden = !opening;
      toggle.setAttribute("aria-expanded", String(opening));
      toggle.textContent = opening ? "Rezept verbergen ↑" : "Rezept anzeigen ↓";
    });
  }
})();
