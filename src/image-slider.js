const ImageSlider = (() => {
  function slideshow() {
    autoSlides();
  }

  const wrapper = document.querySelector(".slides-wrapper");
  const slides = wrapper.getElementsByClassName("slide");

  const nav = document.querySelector(".slide-nav");
  const circles = nav.querySelectorAll("span");
  const previous = document.querySelector(".slide-btn-left");
  const next = document.querySelector(".slide-btn-right");

  const width = 256;

  const firstSlide = slides[0];
  const lastSlide = slides[slides.length - 1];
  const firstClone = firstSlide.cloneNode(true);
  const lastClone = lastSlide.cloneNode(true);

  let i = 1;

  function autoSlides() {
    wrapper.appendChild(firstClone);
    wrapper.insertBefore(lastClone, firstSlide);

    wrapper.style.transform = `translateX(-${width}px)`;
    highlightNav(i - 1);

    let interval = setInterval(() => startSlides(), 2000);

    wrapper.addEventListener("pointerover", () => {
      clearInterval(interval);
    });

    wrapper.addEventListener("pointerleave", () => {
      interval = setInterval(() => startSlides(), 2000);
    });

    for (let n = 0; n < circles.length; n++) {
      circles[n].addEventListener("click", () => {
        clearInterval(interval);
        i = n;
        startSlides();
        interval = setInterval(() => startSlides(), 2000);
      });
    }

    previous.addEventListener("click", () => {
      clearInterval(interval);
      shiftSlide(-1);
      interval = setInterval(() => startSlides(), 2000);
    });

    next.addEventListener("click", () => {
      clearInterval(interval);
      shiftSlide(1);
      interval = setInterval(() => startSlides(), 2000);
    });
  }

  function startSlides() {
    i++;
    wrapper.classList.add("shifting");
    wrapper.style.transform = `translateX(-${width * i}px)`;
    highlightNav(i - 1);
    wrapper.addEventListener("transitionend", () => {
      if (i === slides.length - 2) {
        i = 0;
        wrapper.classList.remove("shifting");
        wrapper.style.transform = `translateX(-${width * i}px)`;
      } 
    });
  }

  function reverseSlide() {
    i--;
    wrapper.classList.add("shifting");
    wrapper.style.transform = `translateX(-${width * i}px)`;
    highlightNav(i - 1);
    wrapper.addEventListener("transitionend", () => {
      if (i === slides.length - 2) {
        i = 0;
        wrapper.classList.remove("shifting");
        wrapper.style.transform = `translateX(-${width * i}px)`;
      }
    });
  }

  function highlightNav(index) {
    circles.forEach((el) => el.classList.remove("active"));
    circles[index].classList.add("active");
  }

  function shiftSlide(dir) {
    if (dir === 1) {
      startSlides();
    } else {
      if (i <= 1) {
        i = slides.length - (2 - i);
      }
      reverseSlide();
    }
  }

  return { slideshow };
})();

export { ImageSlider };
