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

      if (i < slides.length) {
        setInterval(() => {
          wrapper.classList.add("shifting");
          wrapper.style.transform = `translateX(-${width * i}px)`;
          i++;
            
          if (i === slides.length) {
            wrapper.classList.remove("shifting");       
            wrapper.style.transform = "translateX(0px)";              
            i = 1;
          }
        }, 2000);
      }

      
    });
  }

  return { slideshow };
})();

export { ImageSlider };
