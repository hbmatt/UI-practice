const Dropdown = (() => {
  function toggleDrop() {
    window.addEventListener("load", () => {
      const dropLink = document.querySelectorAll(".nav-dropdown");

      dropLink.forEach((link) => {
        let dropMenu = link.querySelector(".dropdown-menu");

        link.addEventListener("pointerover", () => {
          dropMenu.classList.add("is-visible");
        });

        link.addEventListener("pointerleave", () => {
          dropMenu.classList.remove("is-visible");
        });
      });
    });
  }

  return { toggleDrop };
})();

export { Dropdown };
