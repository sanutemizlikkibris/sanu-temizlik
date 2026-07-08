const WHATSAPP_NUMBER = "+905338828989";
const WHATSAPP_DIRECT_URL = `http://wa.me/${WHATSAPP_NUMBER}`;

/* ─── Translations ───────────────────────────────────────────── */
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
    "form.date": "Tercih Ettiğiniz Tarih",
    "form.notes": "Notunuz",
    "form.submit": "WhatsApp'tan Teklif Al",
    "form.placeholder.name": "Adınız ve soyadınız",
    "form.placeholder.phone": "Telefon numaranız",
    "form.placeholder.notes": "Adres, metrekare, saat tercihi veya özel notunuz",
    "whatsapp.default": "Merhaba Sanu Temizlik, temizlik hizmeti için teklif almak istiyorum.",
    "footer.rights": "Tüm hakları saklıdır."
  },
  en: {
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.cities": "Areas",
    "nav.about": "About Us",
    "nav.contact": "Contact",
    "nav.quote": "Get a Quote",
    "form.name": "Full Name",
    "form.phone": "Phone Number",
    "form.city": "Area",
    "form.service": "Service Required",
    "form.date": "Preferred Date",
    "form.notes": "Additional Notes",
    "form.submit": "Send via WhatsApp",
    "form.placeholder.name": "Your full name",
    "form.placeholder.phone": "Your phone number",
    "form.placeholder.notes": "Address, property size, preferred time or any special requirements",
    "whatsapp.default": "Hello Sanu Cleaning, I would like to request a quote for cleaning services in Cyprus.",
    "footer.rights": "All rights reserved."
  },
  ru: {
    "nav.home": "Главная",
    "nav.services": "Услуги",
    "nav.cities": "Районы",
    "nav.about": "О нас",
    "nav.contact": "Контакты",
    "nav.quote": "Получить цену",
    "form.name": "Имя и фамилия",
    "form.phone": "Номер телефона",
    "form.city": "Город",
    "form.service": "Вид услуги",
    "form.date": "Желаемая дата",
    "form.notes": "Примечание",
    "form.submit": "Отправить в WhatsApp",
    "form.placeholder.name": "Ваше имя и фамилия",
    "form.placeholder.phone": "Ваш номер телефона",
    "form.placeholder.notes": "Адрес, площадь, удобное время или особые пожелания",
    "whatsapp.default": "Здравствуйте, Sanu Cleaning. Хотел(а) бы получить расчёт стоимости уборки на Кипре.",
    "footer.rights": "Все права защищены."
  }
};

const languages = {
  tr: { code: "TR", flag: "🇹🇷", label: "Türkçe" },
  en: { code: "EN", flag: "🇬🇧", label: "English" },
  ru: { code: "RU", flag: "🇷🇺", label: "Русский" }
};

/* ─── WhatsApp mesajı daima Türkçe etiketle gider ─────────────── */
const turkishMessageLabels = {
  intro: "Merhaba Sanu Temizlik, web sitesinden hizmet talebi geldi.",
  name: "Ad Soyad",
  phone: "Telefon",
  city: "Şehir",
  service: "Hizmet",
  date: "Tarih",
  notes: "Not",
  lang: "Site dili",
  page: "Sayfa"
};

/* ─── Dil algılama ────────────────────────────────────────────── */
function getCurrentLanguage() {
  // URL yolu /en/ veya /ru/ ile başlıyorsa öncelikle onu al
  const path = window.location.pathname;
  if (path.startsWith("/en/") || path === "/en") return "en";
  if (path.startsWith("/ru/") || path === "/ru") return "ru";
  const langParam = new URLSearchParams(window.location.search).get("lang");
  return langParam || localStorage.getItem("sanuLanguage") || document.documentElement.lang || "tr";
}

/* ─── Dil butonları URL yönlendirmesi ─────────────────────────── */
function buildLangUrl(targetLang) {
  const path = window.location.pathname;
  // Mevcut dil prefix'ini çıkar
  const cleanPath = path.replace(/^\/(en|ru)(\/|$)/, "/");
  if (targetLang === "tr") return cleanPath || "/";
  return `/${targetLang}${cleanPath === "/" ? "/" : cleanPath}`;
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
  document.querySelectorAll("[data-current-flag]").forEach((el) => { el.textContent = current.flag; });
  document.querySelectorAll("[data-current-lang]").forEach((el) => { el.textContent = current.code; });
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

  document.documentElement.lang = nextLanguage === "tr" ? "tr" : nextLanguage === "ru" ? "ru" : "en";
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

/* ─── Form → WhatsApp (daima Türkçe etiket) ─────────────────── */
function getSelectedText(form, fieldName) {
  const field = form.elements[fieldName];
  if (!field) return "";
  if (field.tagName === "SELECT") {
    return field.value || field.options[field.selectedIndex]?.textContent.trim() || "";
  }
  return field.value.trim();
}

function setupWhatsAppForms() {
  document.querySelectorAll("[data-whatsapp-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const language = getCurrentLanguage();
      const labels = turkishMessageLabels;
      const sourceLanguage = languages[language]?.label || "Türkçe";
      const pageTitle = document.querySelector("h1")?.textContent?.trim() || document.title;

      const details = [
        labels.intro,
        "",
        `${labels.lang}: ${sourceLanguage}`,
        `${labels.page}: ${pageTitle}`,
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

/* ─── Mobile menu ────────────────────────────────────────────── */
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

/* ─── Language dropdown ──────────────────────────────────────── */
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

/* ─── Auto redirect (landing pages) ─────────────────────────── */
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

/* ─── Init ──────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  const currentLang = getCurrentLanguage();
  applyLanguage(currentLang);
  setupWhatsAppForms();
  setupMobileMenu();
  setupLanguageDropdowns();
  setupAutoRedirect();

  // Dil butonu tıklaması → tam sayfa yönlendirmesi
  document.querySelectorAll("[data-lang-option]").forEach((button) => {
    button.addEventListener("click", () => {
      const targetLang = button.dataset.langOption;

      // Eğer data-lang-url varsa ona git
      if (button.dataset.langUrl) {
        window.location.href = button.dataset.langUrl;
        return;
      }

      // Aynı dil → hiçbir şey yapma
      if (targetLang === currentLang) return;

      // Dil prefix'li URL'ye yönlendir
      const targetUrl = buildLangUrl(targetLang);
      window.location.href = targetUrl;
    });
  });

  // Yıl güncelle
  const year = document.querySelector("[data-current-year]");
  if (year) year.textContent = new Date().getFullYear();

  // Lucide ikonları
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
