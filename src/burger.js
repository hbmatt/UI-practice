const Burger = (() => {
  function toggleBurger() {
    window.addEventListener("load", () => {
      const menu = document.querySelector(".menu");
      const burger = menu.querySelector(".burger");
      const content = document.querySelector(".mobile-content")

      burger.addEventListener("click", () => {
        menu.classList.toggle("is-visible");
        content.classList.toggle("is-pushed");
      })

    });
  }

  return { toggleBurger };
})();

export { Burger };
