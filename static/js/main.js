function initMainInteractions() {

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

  /* ================= CONTACT MODAL ================= */
  const contactModal = document.getElementById("contactModal");
  const contactOpeners = document.querySelectorAll("[data-contact-open]");
  const contactClosers = document.querySelectorAll("[data-contact-close]");
  let lastFocusedContactOpener = null;

  function openContactModal(trigger) {
    if (!contactModal) return;
    lastFocusedContactOpener = trigger || document.activeElement;
    contactModal.classList.add("is-open");
    contactModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    contactModal.querySelector(".contact-option")?.focus();
  }

  function closeContactModal() {
    if (!contactModal) return;
    contactModal.classList.remove("is-open");
    contactModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    lastFocusedContactOpener?.focus?.();
  }

  contactOpeners.forEach(opener => {
    opener.addEventListener("click", (e) => {
      e.preventDefault();
      openContactModal(opener);
    });
  });

  contactClosers.forEach(closer => {
    closer.addEventListener("click", closeContactModal);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && contactModal?.classList.contains("is-open")) {
      closeContactModal();
    }
  });

}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMainInteractions);
} else {
  initMainInteractions();
}
