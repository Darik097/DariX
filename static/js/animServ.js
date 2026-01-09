document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  const cards = document.querySelectorAll('.service-card');
  const bubbles = document.querySelectorAll('.card-bubble');
  const badges = document.querySelectorAll('.badge');

  // =====================
  // 1️⃣ Анимация карточек при скролле
  // =====================
  cards.forEach((card, i) => {
    gsap.from(card, {
      y: 80,
      opacity: 0,
      scale: 0.95,
      rotation: (Math.random() * 4 - 2), // небольшое вращение
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none none"
      },
      delay: i * 0.15
    });
  });

  // =====================
  // 2️⃣ Плавающие пузыри в карточках
  // =====================
  bubbles.forEach((bubble, i) => {
    gsap.to(bubble, {
      y: "+=20",
      x: (Math.random() * 40 - 20),
      rotation: (Math.random() * 20 - 10),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      duration: 6 + Math.random() * 4,
      delay: Math.random() * 1
    });
  });

  // Реакция пузырей на движение мыши
  document.querySelector('.section--services').addEventListener('mousemove', (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left - rect.width / 2) * 0.03;
    const mouseY = (e.clientY - rect.top - rect.height / 2) * 0.03;

    bubbles.forEach((bubble, i) => {
      gsap.to(bubble, {
        x: mouseX * (i % 2 === 0 ? 1 : -1),
        y: mouseY * (i % 2 === 0 ? 1 : -1),
        duration: 0.5,
        ease: "power2.out"
      });
    });
  });

  // =====================
  // 3️⃣ Бейджи подпрыгивают
  // =====================
  badges.forEach((badge, i) => {
    gsap.from(badge, {
      y: -30,
      opacity: 0,
      scale: 0,
      rotation: (Math.random() * 10 - 5),
      duration: 0.8,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: badge,
        start: "top 90%",
        toggleActions: "play none none none"
      },
      delay: i * 0.1
    });
  });
});
