document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const section = document.querySelector(".section--digital");
  if (!section) return;

  const title = section.querySelector(".digital__title");
  if (title && !title.querySelector("span")) {
    const lines = title.innerHTML.split("<br>");
    title.innerHTML = lines.map(l => `<span class="title-line">${l}</span>`).join("");
  }

  const titleLines = section.querySelectorAll(".digital__title .title-line");
  const lead = section.querySelector(".digital__lead");
  const art = section.querySelector(".digital__art img");

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 70%",
      toggleActions: "play none none reverse"
    }
  });

  // Анимация только по Y
  tl.from(titleLines, {
    y: 120,
    duration: 1.2,
    ease: "power4.out",
    stagger: 0.15
  })
  .from(lead, {
    y: 30,
    scale: 0.98,
    duration: 1,
    ease: "power3.out"
  }, "-=0.6")
  .from(art, {
    x: -160,
    scale: 0.95,
    duration: 1.8,
    ease: "power4.out"
  }, "-=1.2");

  gsap.to(art, {
    yPercent: -12,
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: 1.2
    }
  });

  gsap.to(art, {
    y: "+=18",
    duration: 5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
});
