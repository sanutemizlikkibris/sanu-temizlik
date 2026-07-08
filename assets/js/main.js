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

/* ─── Floating WhatsApp Widget ──────────────────────────────── */
function setupFloatingWhatsApp() {
  const widgetHtml = `
    <div class="whatsapp-widget">
      <div class="whatsapp-bubble" id="waBubble">
        Bize istediğiniz yerin videosunu atın hemen fiyat verelim!
      </div>
      <a href="${WHATSAPP_DIRECT_URL}" target="_blank" class="whatsapp-button" aria-label="WhatsApp üzerinden bizimle iletişime geçin">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.418-.1.824z" fill-rule="evenodd" clip-rule="evenodd"/>
        </svg>
      </a>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", widgetHtml);

  // Show bubble after 10 seconds
  setTimeout(() => {
    const bubble = document.getElementById("waBubble");
    if (bubble) {
      bubble.classList.add("show");
    }
  }, 10000);
}

/* ─── Init ──────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  const currentLang = getCurrentLanguage();
  applyLanguage(currentLang);
  setupWhatsAppForms();
  setupMobileMenu();
  setupLanguageDropdowns();
  setupAutoRedirect();
  setupFloatingWhatsApp();

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
