/* George Willis - portfolio. No frameworks, no build step. */
(function(){
  "use strict";

  document.documentElement.classList.add("js");

  // Mobile nav toggle
  var toggle = document.querySelector(".masthead__toggle");
  var nav = document.querySelector(".masthead__nav");
  if (toggle && nav) {
    function closeMenu(restoreFocus) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      if (restoreFocus) toggle.focus();
    }
    document.addEventListener("keydown", function(e){
      if (e.key === "Escape" && nav.classList.contains("is-open")) closeMenu(true);
    });
    window.matchMedia("(max-width: 760px)").addEventListener("change", function(){ closeMenu(false); });
    toggle.addEventListener("click", function(){
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click", function(){ closeMenu(false); });
    });
  }

  // Portfolio category filter
  var filterBar = document.querySelector("[data-filters]");
  if (filterBar) {
    var buttons = filterBar.querySelectorAll("button");
    buttons.forEach(function(b){ b.setAttribute("aria-pressed", b.classList.contains("is-active") ? "true" : "false"); });
    var rows = document.querySelectorAll("[data-cat]");
    filterBar.addEventListener("click", function(e){
      var btn = e.target.closest("button");
      if (!btn) return;
      buttons.forEach(function(b){ b.classList.remove("is-active"); b.setAttribute("aria-pressed", "false"); });
      btn.classList.add("is-active");
      btn.setAttribute("aria-pressed", "true");
      var cat = btn.getAttribute("data-filter");
      rows.forEach(function(row){
        var show = cat === "all" || row.getAttribute("data-cat") === cat;
        row.style.display = show ? "" : "none";
      });
    });
  }

})();
