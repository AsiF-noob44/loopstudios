document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("menu-btn");
  const menu = document.getElementById("menu");

  if (btn && menu) {
    btn.addEventListener("click", navToggle);

    document.addEventListener("click", function (e) {
      if (!btn.contains(e.target) && !menu.contains(e.target)) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeMenu();
      }
    });
  }

  function navToggle() {
    const isOpen = btn.classList.contains("open");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function openMenu() {
    const nav = document.querySelector("nav");
    const menuItems = document.querySelectorAll(".menu-item");

    btn.classList.add("open");
    btn.setAttribute("aria-expanded", "true");

    if (nav) {
      nav.classList.add("nav-transitioning");

      setTimeout(() => {
        nav.classList.add("fixed-nav");
      }, 10);
    }

    setTimeout(() => {
      menu.classList.remove("hidden");
      menu.classList.add("flex");
      menu.classList.add("menu-visible");

      menuItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("menu-item-visible");
        }, 100 + index * 100);
      });
    }, 150);
  }

  function closeMenu() {
    const nav = document.querySelector("nav");
    const menuItems = document.querySelectorAll(".menu-item");

    btn.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");

    menu.classList.remove("menu-visible");

    menuItems.forEach((item, index) => {
      const delay = 100 * (menuItems.length - index - 1);
      setTimeout(() => {
        item.classList.remove("menu-item-visible");
      }, delay);
    });

    setTimeout(() => {
      menu.classList.add("hidden");
      menu.classList.remove("flex");

      if (nav) {
        setTimeout(() => {
          nav.classList.remove("fixed-nav");

          setTimeout(() => {
            nav.classList.remove("nav-transitioning");
          }, 500);
        }, 200);
      }
    }, 600);
  }
});
