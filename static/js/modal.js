document.addEventListener("DOMContentLoaded", () => {
    console.log('JS loaded');

    const modal = document.getElementById('orderModal');
    console.log(modal);

    const openBtns = document.querySelectorAll('.js-open-modal');
    const closeBtn = modal.querySelector('.modal__close');
    const overlay = modal.querySelector('.modal__overlay');
    const form = document.getElementById('orderForm');
    const success = modal.querySelector('.modal__success');

    // ОТКРЫТИЕ МОДАЛКИ
    openBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            modal.classList.add('is-open');
            document.body.style.overflow = 'hidden';
        });
    });

    // ЗАКРЫТИЕ МОДАЛКИ
    [closeBtn, overlay].forEach(el => {
        el.addEventListener('click', () => {
            modal.classList.remove('is-open');
            document.body.style.overflow = '';
        });
    });

    // ESC
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            modal.classList.remove('is-open');
            document.body.style.overflow = '';
        }
    });

    // ОТПРАВКА ФОРМЫ
    form.addEventListener('submit', async e => {
        e.preventDefault();
        const data = {
            name: form.name.value,
            phone: form.phone.value,
            timestamp: new Date().toLocaleString()
        };

        try {
            const res = await fetch('/consultation_form', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(data)
            });

            if (res.ok) {
                form.style.display = 'none';
                success.style.display = 'block';
            }
        } catch (err) {
            alert('Ошибка отправки 😅');
        }
    });
});

const direct = document.querySelector(".modal__direct");
const icon = direct.querySelector(".modal__direct-icon");

direct.addEventListener("mouseenter", () => {
  gsap.to(direct, {
    background: "rgba(192,132,252,.14)",
    boxShadow: "0 0 0 6px rgba(192,132,252,.10)",
    duration: .35,
    ease: "power2.out"
  });

  gsap.to(icon, {
    scale: 1.15,
    rotate: 6,
    color: "#c084fc",
    duration: .35,
    ease: "power3.out"
  });
});

direct.addEventListener("mouseleave", () => {
  gsap.to(direct, {
    background: "rgba(255,255,255,.06)",
    boxShadow: "none",
    duration: .4,
    ease: "power2.out"
  });

  gsap.to(icon, {
    scale: 1,
    rotate: 0,
    color: "rgba(255,255,255,.9)",
    duration: .4,
    ease: "power3.out"
  });
});