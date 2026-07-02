// ====== CONFIG PRICES ======
    const PRICES = {
      type: {
        landing: 25000,
        shop: 125000,
        app: 93000,
        other: 900,
        automation: 9000,
        portal: 15000,
        crm: 79000,
        corporate: 45000,
      },

      features: {
        // базовые
        chat: 5250,
        contact: 1500,
        pay: 11900,
        anim: 450,

        // новые
        seo: 6000,            // SEO-оптимизация
        speed: 11000,          // высокая скорость загрузки
        security: 17000,       // защита и безопасность
        responsive: 1400,     // мобильная адаптация
        integrations: 19500    // интеграции (TG, CRM, API)
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
      features: new Set(["contact", "anim"]),
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
      updateContactLink();
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
      updateContactLink();
    });

    // ====== TIME (single pills) ======
    const timeWrap = document.getElementById("timing");
    timeWrap.addEventListener("click", (e) => {
      const btn = e.target.closest(".pill");
      if(!btn) return;
      state.time = btn.dataset.value;
      selectOne(timeWrap, btn, "is-selected");
      compute();
      updateContactLink();
    });

    // ====== TOOLS ======
    document.getElementById("resetBtn").addEventListener("click", () => {
      state.type = "landing";
      state.features = new Set(["contact", "anim"]);
      state.time = "fast";

      // UI reset
      [...typeWrap.querySelectorAll(".row")].forEach(r => r.classList.toggle("is-selected", r.dataset.value==="landing"));
      [...featWrap.querySelectorAll(".row")].forEach(r => r.classList.toggle("is-selected", ["contact","anim"].includes(r.dataset.value)));
      [...timeWrap.querySelectorAll(".pill")].forEach(p => p.classList.toggle("is-selected", p.dataset.value==="fast"));

      compute();
      updateContactLink();
    });

    document.getElementById("copyBtn").addEventListener("click", async () => {
      const txt = `${priceEl.textContent} ₽`;
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

const sendBtn = document.getElementById("sendBtn");

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
    contact: "Контактные кнопки",
    pay: "Онлайн-оплата",
    anim: "Анимации",
    seo: "SEO",
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

function updateContactLink() {
  const featuresList = [...state.features]
    .map(f => featureNames[f] || f)
    .join(", ");

  const message = [
    "Здравствуйте! Хочу обсудить проект по расчету с сайта DariX.",
    `Тип: ${typeNames[state.type]}`,
    `Функции: ${featuresList || "без доп. функций"}`,
    `Сроки: ${timeNames[state.time]}`,
    `Ориентир по цене: ${priceEl.textContent} руб.`
  ].join("\n");

  if (sendBtn) {
    sendBtn.href = `https://t.me/darixteam?text=${encodeURIComponent(message)}`;
  }
}

if (sendBtn) {
  ["click", "focus", "mouseenter"].forEach(eventName => {
    sendBtn.addEventListener(eventName, updateContactLink);
  });
  updateContactLink();
}
