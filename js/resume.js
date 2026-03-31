(function () {
  "use strict";

  // Smooth scrolling for scroll trigger links
  document.querySelectorAll('a.js-scroll-trigger[href*="#"]:not([href="#"])').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      if (
        location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") &&
        location.hostname === this.hostname
      ) {
        var target = document.querySelector(this.hash);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // Closes responsive menu when a scroll trigger link is clicked
  document.querySelectorAll(".js-scroll-trigger").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      var navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse) {
        var bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });

  // Activate scrollspy to add active class to navbar items on scroll
  new bootstrap.ScrollSpy(document.body, {
    target: "#sideNav",
  });
})();
