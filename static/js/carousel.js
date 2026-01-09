/* ==================================================
   GSAP PORTFOLIO CAROUSEL — MAX WOW
   ================================================== */

gsap.registerPlugin(ScrollTrigger);

/* ===== ELEMENTS ===== */
const track = document.getElementById("track");
const slides = Array.from(track.querySelectorAll(".slide"));
const carousel = document.querySelector(".carousel");
const btnPrev = document.getElementById("prev");
const btnNext = document.getElementById("next");
const dotsWrap = document.getElementById("dots");

/* ===== STATE ===== */
let index = 1;
let x0 = null;

/* ==================================================
   SCROLL REVEAL (CINEMA)
   ================================================== */

gsap.from(".portfolio", {
  scrollTrigger: {
    trigger: ".portfolio",
    start: "top 75%",
  },
  opacity: 0,
  y: 60,
  filter: "blur(10px)",
  duration: 1.3,
  ease: "power4.out"
});

/* ==================================================
   DOTS
   ================================================== */

slides.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.className = "dot";
  dot.type = "button";
  dot.addEventListener("click", () => goTo(i));
  dotsWrap.appendChild(dot);
});

const dots = [...dotsWrap.children];

/* ==================================================
   HELPERS
   ================================================== */

function mod(n, m) {
  return ((n % m) + m) % m;
}

/* ==================================================
   ACTIVE SLIDE ANIMATION
   ================================================== */

function animateActiveSlide(slide) {
  const img = slide.querySelector("img");
  const caption = slide.querySelector(".caption");

  gsap.fromTo(slide,
    { scale: 0.96 },
    { scale: 1, duration: 0.8, ease: "power4.out" }
  );

  gsap.fromTo(img,
    { scale: 1 },
    { scale: 1.08, duration: 1.2, ease: "power3.out" }
  );

  gsap.fromTo(caption,
    { y: 24, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.15 }
  );
}

/* ==================================================
   RENDER
   ================================================== */

function render() {
  const left = mod(index - 1, slides.length);
  const right = mod(index + 1, slides.length);

  slides.forEach((slide, i) => {
    slide.classList.remove("slide--active", "slide--side");

    if (i === index) slide.classList.add("slide--active");
    else if (i === left || i === right) slide.classList.add("slide--side");
  });

  const active = slides[index];
  const container = track.parentElement;

  const offset =
    active.offsetLeft +
    active.offsetWidth / 2 -
    container.offsetWidth / 2;

  gsap.to(track, {
    x: -offset,
    duration: 0.9,
    ease: "power4.out"
  });

  dots.forEach((dot, i) =>
    dot.classList.toggle("is-active", i === index)
  );

  animateActiveSlide(active);
}

/* ==================================================
   CONTROLS
   ================================================== */

function goTo(i) {
  index = mod(i, slides.length);
  render();
}

btnPrev.addEventListener("click", () => goTo(index - 1));
btnNext.addEventListener("click", () => goTo(index + 1));

/* ==================================================
   SWIPE (TOUCH)
   ================================================== */

track.addEventListener("touchstart", e => {
  x0 = e.touches[0].clientX;
}, { passive: true });

track.addEventListener("touchend", e => {
  if (x0 === null) return;

  const dx = e.changedTouches[0].clientX - x0;
  if (Math.abs(dx) > 40) dx > 0 ? goTo(index - 1) : goTo(index + 1);
  x0 = null;
}, { passive: true });

/* ==================================================
   PARALLAX (MOUSE)
   ================================================== */

carousel.addEventListener("mousemove", e => {
  const activeImg = document.querySelector(".slide--active img");
  if (!activeImg) return;

  const rect = carousel.getBoundingClientRect();
  const x = (e.clientX - rect.left - rect.width / 2) / 40;
  const y = (e.clientY - rect.top - rect.height / 2) / 40;

  gsap.to(activeImg, {
    x,
    y,
    duration: 0.6,
    ease: "power3.out"
  });
});

carousel.addEventListener("mouseleave", () => {
  const activeImg = document.querySelector(".slide--active img");
  if (!activeImg) return;

  gsap.to(activeImg, {
    x: 0,
    y: 0,
    duration: 0.8,
    ease: "power3.out"
  });
});

/* ==================================================
   RESIZE + INIT
   ================================================== */

window.addEventListener("resize", render);
render();
