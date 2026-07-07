const WHATSAPP_NUMBER = "+905338828989";
const WHATSAPP_DIRECT_URL = `http://wa.me/${WHATSAPP_NUMBER}`;

const translations = {
  tr: {
    "nav.home": "Ana Sayfa",
    "nav.services": "Hizmetler",
    "nav.cities": "Bölgeler",
    "nav.about": "Hakkımızda",
    "nav.contact": "İletişim",
    "nav.quote": "Teklif Al",
    "form.name": "Ad Soyad",
    "form.phone": "Telefon",
    "form.city": "Şehir",
    "form.service": "Hizmet Türü",
    "form.date": "Tercih Edilen Tarih",
    "form.notes": "Notunuz",
    "form.submit": "WhatsApp Mesajı Oluştur",
    "form.placeholder.name": "Adınız ve soyadınız",
    "form.placeholder.phone": "Telefon numaranız",
    "form.placeholder.notes": "Adres, metrekare, saat aralığı veya özel talep",
    "whatsapp.default": "Merhaba Sanu Temizlik, temizlik hizmeti için teklif almak istiyorum."
  },
  en: {
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.cities": "Cities",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.quote": "Get a Quote",
    "form.name": "Full Name",
    "form.phone": "Phone",
    "form.city": "City",
    "form.service": "Service Type",
    "form.date": "Preferred Date",
    "form.notes": "Notes",
    "form.submit": "Create WhatsApp Message",
    "form.placeholder.name": "Your full name",
    "form.placeholder.phone": "Your phone number",
    "form.placeholder.notes": "Address, square meters, time range, or special request",
    "whatsapp.default": "Hello Sanu Cleaning, I would like to request a cleaning service quote."
  },
  ru: {
    "nav.home": "Главная",
    "nav.services": "Услуги",
    "nav.cities": "Города",
    "nav.about": "О нас",
    "nav.contact": "Контакты",
    "nav.quote": "Запросить цену",
    "form.name": "Имя и фамилия",
    "form.phone": "Телефон",
    "form.city": "Город",
    "form.service": "Тип услуги",
    "form.date": "Желаемая дата",
    "form.notes": "Примечание",
    "form.submit": "Создать сообщение WhatsApp",
    "form.placeholder.name": "Ваше имя",
    "form.placeholder.phone": "Ваш телефон",
    "form.placeholder.notes": "Адрес, площадь, время или особый запрос",
    "whatsapp.default": "Здравствуйте, Sanu Cleaning. Я хочу запросить стоимость уборки."
  }
};

const languages = {
  tr: { code: "TR", flag: "🇹🇷", label: "Türkçe" },
  en: { code: "EN", flag: "🇬🇧", label: "English" },
  ru: { code: "RU", flag: "🇷🇺", label: "Русский" }
};

const messageLabels = {
  tr: {
    intro: "Merhaba Sanu Temizlik, hizmet teklifi almak istiyorum.",
    name: "Ad Soyad",
    phone: "Telefon",
    city: "Şehir",
    service: "Hizmet",
    date: "Tarih",
    notes: "Not"
  },
  en: {
    intro: "Hello Sanu Cleaning, I would like to request a service quote.",
    name: "Full Name",
    phone: "Phone",
    city: "City",
    service: "Service",
    date: "Date",
    notes: "Notes"
  },
  ru: {
    intro: "Здравствуйте, Sanu Cleaning. Я хочу запросить стоимость услуги.",
    name: "Имя",
    phone: "Телефон",
    city: "Город",
    service: "Услуга",
    date: "Дата",
    notes: "Примечание"
  }
};

function getCurrentLanguage() {
  const languageFromUrl = new URLSearchParams(window.location.search).get("lang");
  return languageFromUrl || localStorage.getItem("sanuLanguage") || document.documentElement.lang || "tr";
}

function setTextContent(selector, dictionary) {
  document.querySelectorAll(selector).forEach((element) => {
    const key = element.dataset.i18n || element.dataset.i18nPlaceholder;
    const value = dictionary[key];

    if (!value) return;

    if (element.dataset.i18nPlaceholder) {
      element.setAttribute("placeholder", value);
      return;
    }

    element.textContent = value;
  });
}

function updateLanguageButton(language) {
  const current = languages[language] || languages.tr;
  document.querySelectorAll("[data-current-flag]").forEach((element) => {
    element.textContent = current.flag;
  });
  document.querySelectorAll("[data-current-lang]").forEach((element) => {
    element.textContent = current.code;
  });
}

function updateWhatsAppLinks(language) {
  const dictionary = translations[language] || translations.tr;
  const defaultMessage = dictionary["whatsapp.default"] || translations.tr["whatsapp.default"];

  document.querySelectorAll("[data-whatsapp-cta]").forEach((link) => {
    const message = link.dataset.whatsappMessage || defaultMessage;
    link.setAttribute("href", `${WHATSAPP_DIRECT_URL}?text=${encodeURIComponent(message)}`);
  });
}

function applyLanguage(language) {
  const nextLanguage = translations[language] ? language : "tr";
  const dictionary = translations[nextLanguage];

  document.documentElement.lang = nextLanguage;
  localStorage.setItem("sanuLanguage", nextLanguage);

  setTextContent("[data-i18n]", dictionary);
  setTextContent("[data-i18n-placeholder]", dictionary);
  updateLanguageButton(nextLanguage);

  document.querySelectorAll("[data-lang-option]").forEach((button) => {
    const isActive = button.dataset.langOption === nextLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  document.querySelectorAll("[data-language-menu]").forEach((menu) => {
    menu.classList.add("hidden");
  });

  updateWhatsAppLinks(nextLanguage);
}

function getSelectedText(form, fieldName) {
  const field = form.elements[fieldName];
  if (!field) return "";

  if (field.tagName === "SELECT") {
    return field.options[field.selectedIndex]?.textContent.trim() || field.value;
  }

  return field.value.trim();
}

function setupWhatsAppForms() {
  document.querySelectorAll("[data-whatsapp-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const language = getCurrentLanguage();
      const labels = messageLabels[language] || messageLabels.tr;
      const pageTitle = document.querySelector("h1")?.textContent?.trim() || document.title;
      const details = [
        labels.intro,
        "",
        `Sayfa: ${pageTitle}`,
        `${labels.name}: ${getSelectedText(form, "name") || "-"}`,
        `${labels.phone}: ${getSelectedText(form, "phone") || "-"}`,
        `${labels.city}: ${getSelectedText(form, "city") || "-"}`,
        `${labels.service}: ${getSelectedText(form, "service") || "-"}`,
        `${labels.date}: ${getSelectedText(form, "date") || "-"}`,
        `${labels.notes}: ${getSelectedText(form, "notes") || "-"}`
      ].join("\n");

      window.location.href = `${WHATSAPP_DIRECT_URL}?text=${encodeURIComponent(details)}`;
    });
  });
}

function setupMobileMenu() {
  const button = document.querySelector("[data-mobile-menu-button]");
  const menu = document.querySelector("[data-mobile-menu]");
  if (!button || !menu) return;

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isOpen));
    menu.classList.toggle("hidden", isOpen);
  });
}

function setupLanguageDropdowns() {
  document.querySelectorAll("[data-language-toggle]").forEach((toggle) => {
    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const dropdown = toggle.closest("[data-language-dropdown]");
      const menu = dropdown?.querySelector("[data-language-menu]");
      if (!menu) return;

      document.querySelectorAll("[data-language-menu]").forEach((otherMenu) => {
        if (otherMenu !== menu) otherMenu.classList.add("hidden");
      });

      menu.classList.toggle("hidden");
    });
  });

  document.addEventListener("click", () => {
    document.querySelectorAll("[data-language-menu]").forEach((menu) => {
      menu.classList.add("hidden");
    });
  });
}

function setupAutoRedirect() {
  const params = new URLSearchParams(window.location.search);
  const enabledByBody = document.body.dataset.autoWhatsapp === "true";
  const enabledByQuery = params.get("autoWhatsapp") === "1";

  if (!enabledByBody && !enabledByQuery) return;

  window.addEventListener("load", () => {
    window.setTimeout(() => {
      window.location.href = WHATSAPP_DIRECT_URL;
    }, 10000);
  }, { once: true });
}

document.addEventListener("DOMContentLoaded", () => {
  applyLanguage(getCurrentLanguage());
  setupWhatsAppForms();
  setupMobileMenu();
  setupLanguageDropdowns();
  setupAutoRedirect();

  document.querySelectorAll("[data-lang-option]").forEach((button) => {
    button.addEventListener("click", () => applyLanguage(button.dataset.langOption));
  });

  const year = document.querySelector("[data-current-year]");
  if (year) year.textContent = new Date().getFullYear();

  if (window.lucide) {
    window.lucide.createIcons();
  }
});
