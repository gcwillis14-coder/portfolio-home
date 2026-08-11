/* George Willis — portfolio. No frameworks, no build step. */
(function(){
  "use strict";

  // Mobile nav toggle
  var toggle = document.querySelector(".masthead__toggle");
  var nav = document.querySelector(".masthead__nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function(){
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click", function(){ nav.classList.remove("is-open"); });
    });
  }

  // Portfolio category filter
  var filterBar = document.querySelector("[data-filters]");
  if (filterBar) {
    var buttons = filterBar.querySelectorAll("button");
    var rows = document.querySelectorAll("[data-cat]");
    filterBar.addEventListener("click", function(e){
      var btn = e.target.closest("button");
      if (!btn) return;
      buttons.forEach(function(b){ b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      var cat = btn.getAttribute("data-filter");
      rows.forEach(function(row){
        var show = cat === "all" || row.getAttribute("data-cat") === cat;
        row.style.display = show ? "" : "none";
      });
    });
  }

})();
