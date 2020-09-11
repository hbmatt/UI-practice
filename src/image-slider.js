const ImageSlider = (() => {
  function slideshow() {
    window.addEventListener("load", () => {
      const wrapper = document.querySelector(".slides-wrapper");
      const slides = wrapper.getElementsByClassName("slide");

      const width = 256;

      const firstSlide = slides[0];
      const lastSlide = slides[slides.length - 1];
      const firstClone = firstSlide.cloneNode(true);
      const lastClone = lastSlide.cloneNode(true);

      wrapper.appendChild(firstClone);
      wrapper.insertBefore(lastClone, firstSlide);

      wrapper.style.transform = `translateX(-${width}px)`;
      let i = 1;

      setInterval(() => {
        i++;
        console.log(i);
        wrapper.classList.add("shifting");
        wrapper.style.transform = `translateX(-${width * i}px)`;
        wrapper.addEventListener("transitionend", () => {
          if (i === slides.length - 2) {
            i = 0;
            wrapper.classList.remove("shifting");
            wrapper.style.transform = `translateX(-${width * i}px)`;
          }
        });
      }, 2000);
    });
  }

  return { slideshow };
})();

export { ImageSlider };
