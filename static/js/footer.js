gsap.utils.toArray(".glass__btn").forEach(el => {

  el.addEventListener("mouseenter", () => {
    gsap.to(el, {
      y: -4,
      scale: 1.05,
      boxShadow: "0 20px 60px rgba(192,132,252,.45)",
      duration: .45,
      ease: "power3.out"
    });

    gsap.to(el.querySelector("svg"), {
      rotate: 8,
      scale: 1.2,
      duration: .45,
      ease: "power3.out"
    });
  });

  el.addEventListener("mouseleave", () => {
    gsap.to(el, {
      y: 0,
      scale: 1,
      boxShadow: "0 0 0 rgba(0,0,0,0)",
      duration: .5,
      ease: "power3.out"
    });

    gsap.to(el.querySelector("svg"), {
      rotate: 0,
      scale: 1,
      duration: .5,
      ease: "power3.out"
    });
  });

});
