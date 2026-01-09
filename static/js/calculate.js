// ====== CONFIG PRICES ======
    const PRICES = {
      type: {
        landing: 1200,
        shop: 4200,
        app: 7800,
        other: 1000,
        automation: 900,
        portal: 5000,
        crm: 8000,
        corporate: 3500,


      },

      features: {
        // базовые
        chat: 350,
        form: 250,
        pay: 900,
        anim: 450,

        // новые
        seo: 600,            // SEO-оптимизация
        analytics: 500,      // аналитика и метрики
        speed: 550,          // высокая скорость загрузки
        security: 700,       // защита и безопасность
        responsive: 400,     // мобильная адаптация
        integrations: 950    // интеграции (TG, CRM, API)
      },

      time: {
        fast: 1.45,   // срочно = дороже
        normal: 1.20,
        calm: 1.00
      }
    };


    // ====== STATE ======
    const state = {
      type: "landing",
      features: new Set(["form", "anim"]),
      time: "fast"
    };

    const priceEl = document.getElementById("price");
    const hintEl = document.getElementById("hint");

    // ====== HELPERS ======
    function formatMoney(n){
      return Math.round(n).toString();
    }

    function compute(){
      const base = PRICES.type[state.type];
      let addons = 0;
      state.features.forEach(f => addons += PRICES.features[f] || 0);
      const mult = PRICES.time[state.time];

      const total = (base + addons) * mult;

      // hint logic (немного “умная” подпись)
      let hint = "Хороший выбор — программисты DariX одобряют";
      if (state.type === "app") hint = "Серьёзно! Это уже продукт — сделаем как надо";
      if (state.type === "shop" && state.features.has("pay")) hint = "Отлично — магазин с оплатой будет продавать";
      if (state.time === "fast") hint = "Горячий режим: собираем команду и стартуем быстро";

      priceEl.textContent = formatMoney(total);
      hintEl.textContent = hint;

      // pop animation
      priceEl.parentElement.classList.remove("pop");
      void priceEl.parentElement.offsetWidth;
      priceEl.parentElement.classList.add("pop");
    }

    function selectOne(groupEl, activeEl, cls="is-selected"){
      groupEl.querySelectorAll("." + cls).forEach(n => n.classList.remove(cls));
      activeEl.classList.add(cls);
    }

    // ====== TYPE SELECT (single) ======
    const typeWrap = document.getElementById("projectType");
    typeWrap.addEventListener("click", (e) => {
      const row = e.target.closest(".row");
      if(!row) return;
      state.type = row.dataset.value;
      selectOne(typeWrap, row, "is-selected");
      compute();
    });

    // ====== FEATURES (multi) ======
    const featWrap = document.getElementById("features");
    featWrap.addEventListener("click", (e) => {
      const row = e.target.closest(".row");
      if(!row) return;
      const val = row.dataset.value;
      if (row.classList.contains("is-selected")){
        row.classList.remove("is-selected");
        state.features.delete(val);
      } else {
        row.classList.add("is-selected");
        state.features.add(val);
      }
      compute();
    });

    // ====== TIME (single pills) ======
    const timeWrap = document.getElementById("timing");
    timeWrap.addEventListener("click", (e) => {
      const btn = e.target.closest(".pill");
      if(!btn) return;
      state.time = btn.dataset.value;
      selectOne(timeWrap, btn, "is-selected");
      compute();
    });

    // ====== TOOLS ======
    document.getElementById("resetBtn").addEventListener("click", () => {
      state.type = "landing";
      state.features = new Set(["form", "anim"]);
      state.time = "fast";

      // UI reset
      [...typeWrap.querySelectorAll(".row")].forEach(r => r.classList.toggle("is-selected", r.dataset.value==="landing"));
      [...featWrap.querySelectorAll(".row")].forEach(r => r.classList.toggle("is-selected", ["form","anim"].includes(r.dataset.value)));
      [...timeWrap.querySelectorAll(".pill")].forEach(p => p.classList.toggle("is-selected", p.dataset.value==="fast"));

      compute();
    });

    document.getElementById("copyBtn").addEventListener("click", async () => {
      const txt = `${priceEl.textContent}$`;
      try{
        await navigator.clipboard.writeText(txt);
        hintEl.textContent = "Скопировано ✅ Можешь отправлять клиенту";
        setTimeout(compute, 1200);
      }catch{
        hintEl.textContent = "Не удалось скопировать 😅 Скопируй вручную";
        setTimeout(compute, 1200);
      }
    });

    // init
    compute();

   
    // ====== MODAL ELEMENTS ======
const modal = document.getElementById("phoneModal");
const phoneInput = document.getElementById("phoneInput");
const sendBtn = document.getElementById("sendBtn");
const confirmBtn = document.getElementById("confirmSend");
const cancelBtn = document.getElementById("cancelPhone");
const overlay = document.querySelector(".phone-modal__overlay");

// ====== OPEN MODAL ======
sendBtn.addEventListener("click", () => {
  modal.classList.add("is-open");
  phoneInput.focus();
});

// ====== CLOSE MODAL ======
function closeModal(){
  modal.classList.remove("is-open");
  phoneInput.value = "";
}

cancelBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// ====== SEND DATA TO BACKEND ======
confirmBtn.addEventListener("click", async () => {

  const phone = phoneInput.value.trim();

  if(phone.length < 6){
    hintEl.textContent = "Введите корректный номер телефона 📞";
    phoneInput.focus();
    return;
  }

  closeModal();

  // Читаемые названия
  const typeNames = {
    landing: "Лендинг",
    shop: "Интернет-магазин",
    app: "Приложение",
    other: "Другое",
    automation: "Автоматизация",
    portal: "Портал",
    crm: "CRM",
    corporate: "Корпоративный сайт"
  };

  const featureNames = {
    chat: "Онлайн-чат",
    form: "Форма обратной связи",
    pay: "Онлайн-оплата",
    anim: "Анимации",
    seo: "SEO",
    analytics: "Аналитика",
    speed: "Оптимизация скорости",
    security: "Безопасность",
    responsive: "Мобильная адаптация",
    integrations: "Интеграции"
  };

  const timeNames = {
    fast: "Срочно",
    normal: "Обычные сроки",
    calm: "Без спешки"
  };

  const featuresList = [...state.features]
    .map(f => `• ${featureNames[f] || f}`)
    .join("\n");

  const message = `
🧮 *Калькулятор DariX*

📦 Тип проекта:
${typeNames[state.type]}

⚙️ Функции:
${featuresList || "—"}

⏱ Сроки:
${timeNames[state.time]}

💰 Итоговая цена:
${priceEl.textContent} ₽

📞 Телефон клиента:
${phone}
`;

  hintEl.textContent = "Отправляем расчёт… 🚀";

  try{
    const res = await fetch("/submit_request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Калькулятор сайта",
        phone: phone,
        message: message
      })
    });

    if(res.ok){
      hintEl.textContent = "Заявка отправлена ✅ Мы свяжемся с вами";
    } else {
      throw new Error();
    }

  } catch {
    hintEl.textContent = "Ошибка отправки 😅 Попробуйте ещё раз";
  }

  setTimeout(compute, 2500);
});

