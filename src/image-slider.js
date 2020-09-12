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
    (i === slides.length - 1) ? highlightNav(0) : highlightNav(i - 1);
    wrapper.addEventListener("transitionend", checkIndex);
  }

  function reverseSlide() {
    i--;
    wrapper.classList.add("shifting");
    wrapper.style.transform = `translateX(-${width * i}px)`;
    highlightNav(i - 1);
  }

  function highlightNav(index) {
    circles.forEach((el) => el.classList.remove("active"));
    circles[index].classList.add("active");
  }

  const checkIndex = function() {
    wrapper.classList.remove("shifting");
    if (i === slides.length - 1) {
      i = 1;
      highlightNav(i - 1);
      wrapper.style.transform = `translateX(-${width * i}px)`;
    } else if (i <= 0) {
      i = slides.length - (2 - i);
      highlightNav(i - 1);
      wrapper.style.transform = `translateX(-${width * i}px)`;
    }
  }

  function shiftSlide(dir) {
    if (dir === 1) {
      startSlides();
    } else {
      reverseSlide();
    }
  }

  return { slideshow };
})();

export { ImageSlider };
