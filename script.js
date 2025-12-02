// ===== Configurable animation speed for logo words (ms) =====
const WORD_CHANGE_INTERVAL = 2500; // adjust this if you want a different speed

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const hero = document.querySelector("#hero");
  const scrollDownBtn = document.querySelector("#scroll-down-btn");
  const animatedWordEl = document.querySelector("#logo-animated-word");
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  // ===== Keep body padding in sync with header height =====
  function updateHeaderHeightVar() {
    if (!header) return;
    const headerHeight = header.offsetHeight;
    document.documentElement.style.setProperty(
      "--header-height",
      headerHeight + "px"
    );
    document.body.style.paddingTop = headerHeight + "px";
  }

  updateHeaderHeightVar();
  window.addEventListener("resize", () => {
    updateHeaderHeightVar();
    updateScrollEffects();
  });

  // ===== Header glow + scroll-down visibility =====
  function updateScrollEffects() {
    if (!header || !hero) return;

    const headerHeight = header.offsetHeight;
    const heroHeight = hero.offsetHeight;
    const scrollY = window.scrollY || window.pageYOffset || 0;

    // Glow once we've scrolled past the hero section
    if (scrollY > heroHeight - headerHeight) {
      header.classList.add("header--with-glow");
    } else {
      header.classList.remove("header--with-glow");
    }

    // Show scroll-down button only while within hero section
    if (scrollDownBtn) {
      if (scrollY <= heroHeight - headerHeight * 1.2) {
        scrollDownBtn.classList.remove("hidden");
      } else {
        scrollDownBtn.classList.add("hidden");
      }
    }
  }

  window.addEventListener("scroll", updateScrollEffects, { passive: true });
  updateScrollEffects();

  // ===== Smooth scroll from hero chevron to About section =====
  if (scrollDownBtn) {
    scrollDownBtn.addEventListener("click", () => {
      const about = document.querySelector("#about");
      if (about) {
        about.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // ===== Animated logo words =====
  if (animatedWordEl) {
    const words = [
      "Cybersecurity.",
      "Research.",
      "Automations.",
      "Threat Intelligence.",
    ];

    let index = 0;

    function cycleWord() {
      // fade out
      animatedWordEl.style.opacity = "0";

      setTimeout(() => {
        index = (index + 1) % words.length;
        animatedWordEl.textContent = words[index];
        // fade back in
        animatedWordEl.style.opacity = "1";
      }, 250); // small fade-out duration matching CSS transition
    }

    setInterval(cycleWord, WORD_CHANGE_INTERVAL);
  }

  // ===== Mobile menu toggle =====
  if (menuToggle && mainNav && header) {
    menuToggle.addEventListener("click", () => {
      const isOpen = header.classList.toggle("nav-open");
      // Simple accessibility toggle
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close menu when a nav link is clicked (on small screens)
    mainNav.addEventListener("click", (event) => {
      if (event.target.matches("a.nav-link")) {
        header.classList.remove("nav-open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }
});
