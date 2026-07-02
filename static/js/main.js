document.addEventListener("DOMContentLoaded", () => {

  /* ================= HEADER GLASS ================= */
  const hdr = document.getElementById("hdr");
  if (hdr) {
    const setGlass = () => hdr.classList.toggle("glass", window.scrollY > 6);
    window.addEventListener("scroll", setGlass, { passive: true });
  }

  /* ================= SCROLL TO CALCULATOR ================= */
  const calcBtn = document.getElementById("calcBtn");
  const calculator = document.querySelector(".wrap");

  if (calcBtn && calculator) {
    calcBtn.addEventListener("click", (e) => {
      e.preventDefault();

      calculator.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  }

});
