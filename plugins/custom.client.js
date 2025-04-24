export default defineNuxtPlugin((nuxtApp) => {
  // This code will only run on client-side
  if (process.client) {
    // Move all your template JS code here, with some modifications
    ("use strict");
    /**
     * Apply .scrolled class to the body as the page is scrolled down
     */
    const toggleScrolled = () => {
      const selectBody = document.querySelector("body");
      const selectHeader = document.querySelector("#header");
      if (
        !selectHeader.classList.contains("scroll-up-sticky") &&
        !selectHeader.classList.contains("sticky-top") &&
        !selectHeader.classList.contains("fixed-top")
      )
        return;
      window.scrollY > 100
        ? selectBody.classList.add("scrolled")
        : selectBody.classList.remove("scrolled");
    };

    /**
     * Mobile nav toggle
     */
    const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

    const mobileNavToogle = () => {
      document.querySelector("body").classList.toggle("mobile-nav-active");
      mobileNavToggleBtn.classList.toggle("bi-list");
      mobileNavToggleBtn.classList.toggle("bi-x");
    };

    /**
     * Scroll top button
     */
    let scrollTop = document.querySelector(".scroll-top");

    const toggleScrollTop = () => {
      if (scrollTop) {
        window.scrollY > 100
          ? scrollTop.classList.add("active")
          : scrollTop.classList.remove("active");
      }
    };
    // Event listeners
    window.addEventListener("load", () => {
      toggleScrolled();
      toggleScrollTop();
      aosInit();
      // Preloader removal
      const preloader = document.querySelector("#preloader");
      if (preloader) preloader.remove();
    });

    document.addEventListener("scroll", () => {
      toggleScrolled();
      toggleScrollTop();
    });

    // Mobile nav events
    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.addEventListener("click", mobileNavToogle);
    }
    // Other event listeners...
    document
      .querySelectorAll(".faq-item h3, .faq-item .faq-toggle")
      .forEach((faqItem) => {
        faqItem.addEventListener("click", () => {
          faqItem.parentNode.classList.toggle("faq-active");
        });
      });

    let navmenulinks = document.querySelectorAll(".navmenu a");
    function navmenuScrollspy() {
      navmenulinks.forEach((navmenulink) => {
        if (!navmenulink.hash) return;
        let section = document.querySelector(navmenulink.hash);
        if (!section) return;
        let position = window.scrollY + 200;
        if (
          position >= section.offsetTop &&
          position <= section.offsetTop + section.offsetHeight
        ) {
          document
            .querySelectorAll(".navmenu a.active")
            .forEach((link) => link.classList.remove("active"));
          navmenulink.classList.add("active");
        } else {
          navmenulink.classList.remove("active");
        }
      });
    }
    window.addEventListener("load", navmenuScrollspy);
    document.addEventListener("scroll", navmenuScrollspy);
  }
});
