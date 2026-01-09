gsap.registerPlugin(ScrollTrigger);

/* ==================================================
   SCROLL ENTER — ВСЁ ОКНО
   ================================================== */

gsap.from(".window", {
  scrollTrigger: {
    trigger: ".window",
    start: "top 70%",
  },
  opacity: 0,
  y: 80,
  scale: 0.97,
  filter: "blur(10px)",
  duration: 1.2,
  ease: "power4.out"
});

/* ==================================================
   WINDOW TOP BAR
   ================================================== */

gsap.from(".window__top", {
  scrollTrigger: {
    trigger: ".window",
    start: "top 70%",
  },
  y: -20,
  opacity: 0,
  duration: 0.8,
  ease: "power3.out",
  delay: 0.1
});

/* ==================================================
   CARDS CASCADE
   ================================================== */

gsap.from(".card", {
  scrollTrigger: {
    trigger: ".window",
    start: "top 65%",
  },
  y: 60,
  opacity: 0,
  scale: 0.96,
  stagger: 0.12,
  duration: 0.9,
  ease: "power4.out",
  delay: 0.2
});

/* ==================================================
   LIST ROWS — MICRO MOTION
   ================================================== */

document.querySelectorAll(".row").forEach(row => {
  row.addEventListener("mouseenter", () => {
    gsap.to(row, {
      x: 6,
      backgroundColor: "rgba(255,255,255,.06)",
      duration: 0.35,
      ease: "power3.out"
    });
  });

  row.addEventListener("mouseleave", () => {
    gsap.to(row, {
      x: 0,
      backgroundColor: "rgba(255,255,255,0)",
      duration: 0.45,
      ease: "power3.out"
    });
  });
});

/* ==================================================
   SELECT ROW — FEEDBACK
   ================================================== */

document.querySelectorAll(".row").forEach(row => {
  row.addEventListener("click", () => {
    gsap.fromTo(row,
      { scale: 0.98 },
      { scale: 1, duration: 0.35, ease: "power3.out" }
    );
  });
});

/* ==================================================
   PILLS — PREMIUM PRESS
   ================================================== */

document.querySelectorAll(".pill").forEach(pill => {
  pill.addEventListener("click", () => {
    gsap.fromTo(pill,
      { scale: 0.96 },
      { scale: 1, duration: 0.4, ease: "elastic.out(1,0.6)" }
    );
  });
});

/* ==================================================
   PRICE — MAGIC CHANGE
   ================================================== */

const price = document.querySelector(".price");

function animatePrice() {
  gsap.fromTo(price,
    { scale: 0.9, opacity: 0.5 },
    { scale: 1, opacity: 1, duration: 0.6, ease: "power3.out" }
  );

  gsap.fromTo(price,
    { filter: "drop-shadow(0 0 0 rgba(192,132,252,0))" },
    { filter: "drop-shadow(0 0 18px rgba(192,132,252,.6))", duration: 0.4, yoyo: true, repeat: 1 }
  );
}

/* ВЫЗЫВАЙ animatePrice() ПОСЛЕ ПЕРЕСЧЁТА ЦЕНЫ */

/* ==================================================
   SEND BUTTON — HERO FEEL
   ================================================== */

const sendBtn = document.querySelector(".send-btn");

sendBtn.addEventListener("mouseenter", () => {
  gsap.to(sendBtn, {
    y: -3,
    boxShadow: "0 26px 70px rgba(0,0,0,.6), 0 0 0 10px rgba(192,132,252,.12)",
    duration: 0.35,
    ease: "power3.out"
  });
});

sendBtn.addEventListener("mouseleave", () => {
  gsap.to(sendBtn, {
    y: 0,
    boxShadow: "0 18px 40px rgba(0,0,0,.45)",
    duration: 0.4,
    ease: "power3.out"
  });
});

sendBtn.addEventListener("click", () => {
  gsap.fromTo(sendBtn,
    { scale: 0.96 },
    { scale: 1, duration: 0.45, ease: "elastic.out(1,0.6)" }
  );
});

/* ==================================================
   BG ART — PARALLAX
   ================================================== */

document.addEventListener("mousemove", e => {
  gsap.to(".bg-art__img--left", {
    x: e.clientX / 90,
    y: e.clientY / 90,
    duration: 1.2,
    ease: "power3.out"
  });

  gsap.to(".bg-art__img--right", {
    x: -e.clientX / 110,
    y: -e.clientY / 110,
    duration: 1.4,
    ease: "power3.out"
  });
});
