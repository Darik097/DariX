(() => {
  const rows = [...document.querySelectorAll(".marquee")];
  if (!rows.length) return;

  // для плавности делаем easing через requestAnimationFrame
  let current = 0;
  let target = 0;

  function lerp(a, b, t){ return a + (b - a) * t; }

  function animate(){
    current = lerp(current, target, 0.08);

    rows.forEach(row => {
      const track = row.querySelector(".marquee__track");
      const speed = parseFloat(row.dataset.speed || "0.35");
      const dir = row.dataset.dir === "left" ? -1 : 1;

      // Смещение зависит от скролла страницы
      const x = current * speed * dir;

      // бесшовность: берём ширину половины (у нас дубль контента)
      const half = track.scrollWidth / 2;
      const wrapped = ((x % half) + half) % half;

      track.style.transform = `translate3d(${-wrapped}px,0,0)`;
    });

    requestAnimationFrame(animate);
  }

  function onScroll(){
    target = window.scrollY;
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  animate();
})();
