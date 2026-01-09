document.addEventListener("DOMContentLoaded", () => {

  // =============================
  // ELEMENTS
  // =============================
  const hero  = document.querySelector('.hero');
  const blob  = document.querySelector('.hero-art__blob');
  const disc  = document.querySelector('.hero-art__disc');
  const title = document.querySelector('.hero h1');
  const lead  = document.querySelector('.hero .lead');
  const btns  = document.querySelectorAll('.hero .btn');

  // если hero не найден — выходим
  if (!hero || !window.gsap) return;

  // =============================
  // REGISTER PLUGINS
  // =============================
  if (gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  // =============================
  // HERO INTRO TIMELINE
  // =============================
  const intro = gsap.timeline({
    defaults: { ease: "power4.out" }
  });

  intro
    // blob
    .from(blob, {
      opacity: 0,
      scale: 0.7,
      duration: 1.4
    }, 0)

    // disc
    .from(disc, {
      opacity: 0,
      scale: 0.8,
      x: 80,
      duration: 1.4
    }, 0.1)

    // title
    .from(title, {
      y: 60,
      opacity: 0,
      duration: 1.1
    }, 0.3)

    // lead
    .from(lead, {
      y: 30,
      opacity: 0,
      duration: 1
    }, 0.45)

    // buttons
    .from(btns, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12
    }, 0.6);

  // =============================
  // FLOATING MOTION
  // =============================
  if (blob) {
    gsap.to(blob, {
      y: 18,
      x: 12,
      rotation: 6,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }

  if (disc) {
    gsap.to(disc, {
      y: -14,
      x: -10,
      rotation: -8,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }

  // =============================
  // MOUSE PARALLAX (SMOOTH)
  // =============================
  if (hero && blob && disc) {

    let pos = { x: 0, y: 0 };

    hero.addEventListener("mousemove", (e) => {
      const r = hero.getBoundingClientRect();

      pos.x = (e.clientX - r.left - r.width / 2) * 0.06;
      pos.y = (e.clientY - r.top - r.height / 2) * 0.06;

      gsap.to(blob, {
        x: pos.x,
        y: pos.y,
        duration: 0.8,
        ease: "power3.out"
      });

      gsap.to(disc, {
        x: pos.x * 0.35,
        y: pos.y * 0.35,
        duration: 1,
        ease: "power3.out"
      });
    });

    hero.addEventListener("mouseleave", () => {
      gsap.to([blob, disc], {
        x: 0,
        y: 0,
        duration: 1.2,
        ease: "power4.out"
      });
    });
  }

  // =============================
  // BUTTON HOVER (PREMIUM)
  // =============================
  btns.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, {
        scale: 1.06,
        duration: 0.25,
        ease: "power3.out"
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        scale: 1,
        duration: 0.25,
        ease: "power3.out"
      });
    });
  });

});
