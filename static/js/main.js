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

  /* ================= MODAL ================= */
  const modal = document.getElementById("orderModal");
  const modalOverlay = modal?.querySelector(".modal__overlay");
  const modalClose = modal?.querySelector(".modal__close");

  // кнопки, которые открывают модалку
  const openModalBtns = document.querySelectorAll("[data-open-modal]");

  function openModal() {
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    });
  });

  modalOverlay?.addEventListener("click", closeModal);
  modalClose?.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });

  /* ================= FORM SUBMIT (визуально) ================= */
  const form = document.getElementById("orderForm");
  const success = modal.querySelector(".modal__success");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // здесь можешь добавить fetch на Flask / TG
      form.style.display = "none";
      success.style.display = "flex";

      setTimeout(() => {
        closeModal();
        success.style.display = "none";
        form.style.display = "flex";
        form.reset();
      }, 2500);
    });
  }

});

