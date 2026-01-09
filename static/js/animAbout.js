document.addEventListener('DOMContentLoaded', () => {
  // Регистрируем ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Элементы
  const bubbles = document.querySelectorAll('.bubble');
  const statsGlass = document.querySelector('.stats-glass');
  const statNums = document.querySelectorAll('.stat__num');
  const aboutTitle = document.querySelector('.about__title');
  const aboutLead = document.querySelector('.about__lead');
  const aboutSection = document.querySelector('.section--about');

  // =====================
  // 1️⃣ Плавающие пузыри
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
      delay: Math.random() * 2
    });
  });

  // Реакция пузырей на движение мыши
  aboutSection.addEventListener('mousemove', (e) => {
    const rect = aboutSection.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left - rect.width / 2) * 0.05;
    const mouseY = (e.clientY - rect.top - rect.height / 2) * 0.05;

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
  // 2️⃣ Glass block — scroll
  // =====================
  gsap.from(statsGlass, {
    scrollTrigger: {
      trigger: statsGlass,
      start: "top 80%",
      toggleActions: "play none none none"
    },
    y: 50,
    opacity: 0,
    scale: 0.95,
    duration: 1,
    ease: "power3.out"
  });

  // =====================
  // 3️⃣ Заголовок и текст
  // =====================
  gsap.from([aboutTitle, aboutLead], {
    y: 40,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    stagger: 0.2,
    scrollTrigger: {
      trigger: aboutTitle,
      start: "top 85%",
      toggleActions: "play none none none"
    }
  });

  // =====================
  // 4️⃣ Анимация чисел KPI
  // =====================
  statNums.forEach(num => {
    const endValue = parseInt(num.innerText.replace(/\D/g, '')); // оставляем только числа
    gsap.fromTo(num, 
      { innerText: 0 },
      { 
        innerText: endValue,
        duration: 2,
        ease: "power1.out",
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: num,
          start: "top 90%",
          toggleActions: "play none none none"
        },
        onUpdate: function() {
          num.innerText = Math.floor(num.innerText);
        }
      }
    );
  });
});
