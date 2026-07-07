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
    "hero.kicker": "Kıbrıs temizlik şirketi",
    "hero.title": "Sanu Temizlik ve Ticaret Ltd.",
    "hero.text": "2012’den beri Lefkoşa merkezli profesyonel temizlik ekibimizle ev, ofis, inşaat sonrası temizlik, mermer cilalama, haşere ilaçlama ve koltuk yıkama hizmetleri sunuyoruz.",
    "hero.primary": "WhatsApp’tan Teklif Al",
    "hero.secondary": "Hizmetleri İncele",
    "stats.years": "Yıllık deneyim",
    "stats.city": "Ana hizmet bölgesi",
    "stats.channel": "Hızlı teklif kanalı",
    "services.kicker": "Hizmetler",
    "services.title": "Evden ofise, tek ekipten kapsamlı temizlik çözümleri",
    "services.text": "Sanu Temizlik; lefkoşa temizlik şirketi, girne temizlik şirketi, kıbrıs temizlik şirketi ve kktc temizlik şirketi aramalarında ihtiyaç duyulan profesyonel hizmetleri tek noktada toplar.",
    "service.home.title": "Ev Temizliği",
    "service.home.text": "Düzenli veya tek seferlik ev temizliği, mutfak, banyo ve yaşam alanlarında detaylı hijyen.",
    "service.office.title": "Ofis Temizliği",
    "service.office.text": "Çalışma alanları, mağazalar ve kurumlar için planlı, güvenilir ve izlenebilir temizlik.",
    "service.construction.title": "İnşaat Sonrası Temizlik",
    "service.construction.text": "Tadilat ve yeni yapı sonrası toz, kalıntı ve kaba kirlerin profesyonel temizliği.",
    "service.marble.title": "Mermer Cilalama",
    "service.marble.text": "Mermer yüzeylerde parlaklık, bakım ve koruma için doğru ekipmanlı uygulama.",
    "service.pest.title": "Haşere İlaçlama",
    "service.pest.text": "Ev ve iş yerlerinde kontrollü, planlı ve güvenli pest control çözümleri.",
    "service.sofa.title": "Koltuk Yıkama",
    "service.sofa.text": "Koltuk, oturma grubu ve kumaş yüzeylerde yerinde yıkama ve bakım.",
    "cities.kicker": "Bölgeler",
    "cities.title": "Lefkoşa, Girne, Gazi Mağusa ve Güzelyurt’ta temizlik hizmeti",
    "cities.text": "Şehir sayfaları, yerel aramalarda daha güçlü görünürlük için ayrı ayrı yapılandırılmıştır.",
    "form.kicker": "Servis Talebi",
    "form.title": "Temizlik hizmeti için hızlı WhatsApp talebi oluşturun",
    "form.text": "Formu doldurduğunuzda bilgileriniz otomatik WhatsApp mesajına çevrilir.",
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
    "about.kicker": "Hakkımızda",
    "about.title": "2012’den bu yana Lefkoşa merkezli güvenilir temizlik ekibi",
    "about.text": "Sanu Temizlik ve Ticaret Ltd., Tahsin Yazıcı Sok. No:5 Çağlayan Lefkoşa / Kıbrıs adresinden Kıbrıs genelinde bireysel ve kurumsal müşterilere hizmet verir. İhtiyacınız ev temizliği, ofis temizliği, mermer cilalama, lefkoşa halı yıkama aramasıyla ilişkili kumaş yüzey bakımı veya inşaat sonrası temizlik olsun, ekip doğru planlama ile çalışır.",
    "seo.title": "KKTC temizlik şirketi arayanlar için yerel ve hızlı çözüm",
    "seo.text": "Lefkoşa temizlik şirketi, Girne temizlik şirketi, Kıbrıs temizlik şirketi ve KKTC temizlik şirketi ihtiyaçlarında Sanu Temizlik; hızlı iletişim, net hizmet kapsamı ve profesyonel ekip yaklaşımıyla öne çıkar.",
    "cta.title": "Temizlik talebinizi bugün WhatsApp’tan gönderin",
    "cta.text": "Uygun hizmet ve şehir bilgisini paylaşın, ekibimiz size hızlıca dönüş yapsın.",
    "footer.rights": "Tüm hakları saklıdır.",
    "city.lefkosa.title": "Lefkoşa Temizlik Şirketi",
    "city.lefkosa.text": "Sanu Temizlik, Lefkoşa’da ev temizliği, ofis temizliği, inşaat sonrası temizlik, mermer cilalama, haşere ilaçlama ve koltuk yıkama hizmetleri sunar.",
    "city.girne.title": "Girne Temizlik Şirketi",
    "city.girne.text": "Girne’de ev, villa, ofis, mağaza ve işletmeler için planlı profesyonel temizlik hizmeti alın.",
    "city.magusa.title": "Gazi Mağusa Temizlik Şirketi",
    "city.magusa.text": "Gazi Mağusa’da düzenli ve tek seferlik temizlik ihtiyaçları için Sanu Temizlik ekibine ulaşın.",
    "city.guzelyurt.title": "Güzelyurt Temizlik Şirketi",
    "city.guzelyurt.text": "Güzelyurt ve çevresinde ev, ofis ve ticari alan temizliği için hızlı WhatsApp teklifi isteyin.",
    "page.city.cta": "Bu Şehir İçin Teklif Al",
    "page.service.title": "Lefkoşa Ev Temizliği",
    "page.service.text": "Lefkoşa ev temizliği hizmeti; mutfak, banyo, salon, yatak odaları ve ortak alanlarda detaylı hijyen planı ile uygulanır.",
    "whatsapp.default": "Merhaba Sanu Temizlik, temizlik hizmeti için teklif almak istiyorum."
  },
  en: {
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.cities": "Cities",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.quote": "Get a Quote",
    "hero.kicker": "Cyprus cleaning company",
    "hero.title": "Sanu Cleaning and Trade Ltd.",
    "hero.text": "Since 2012, our Nicosia-based professional team has provided home cleaning, office cleaning, post-construction cleaning, marble polishing, pest control, and sofa washing services.",
    "hero.primary": "Get a Quote on WhatsApp",
    "hero.secondary": "View Services",
    "stats.years": "Years of experience",
    "stats.city": "Main service region",
    "stats.channel": "Fast quote channel",
    "services.kicker": "Services",
    "services.title": "Complete cleaning solutions for homes and workplaces",
    "services.text": "Sanu Cleaning brings reliable Cyprus cleaning services together in one professional team.",
    "service.home.title": "Home Cleaning",
    "service.home.text": "One-time or regular home cleaning with detailed hygiene for kitchens, bathrooms, and living spaces.",
    "service.office.title": "Office Cleaning",
    "service.office.text": "Scheduled, reliable cleaning for offices, shops, and corporate spaces.",
    "service.construction.title": "Post-Construction Cleaning",
    "service.construction.text": "Professional removal of dust, residue, and heavy dirt after renovation or construction.",
    "service.marble.title": "Marble Polishing",
    "service.marble.text": "Proper equipment and care for brighter, protected marble surfaces.",
    "service.pest.title": "Pest Control",
    "service.pest.text": "Planned pest control solutions for homes and workplaces.",
    "service.sofa.title": "Sofa Washing",
    "service.sofa.text": "On-site washing and care for sofas, seating groups, and fabric surfaces.",
    "cities.kicker": "Cities",
    "cities.title": "Cleaning services in Nicosia, Kyrenia, Famagusta, and Guzelyurt",
    "cities.text": "City pages are structured for stronger local search visibility.",
    "form.kicker": "Service Request",
    "form.title": "Create a fast WhatsApp request for cleaning service",
    "form.text": "Your form details will be converted into a WhatsApp message automatically.",
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
    "about.kicker": "About",
    "about.title": "A trusted Nicosia-based cleaning team since 2012",
    "about.text": "Sanu Cleaning and Trade Ltd. serves residential and commercial clients across Cyprus from Tahsin Yazıcı Sok. No:5 Çağlayan Nicosia / Cyprus.",
    "seo.title": "A fast local solution for Cyprus cleaning services",
    "seo.text": "For home, office, post-construction, marble polishing, pest control, and sofa washing needs, Sanu Cleaning combines quick communication with a professional service approach.",
    "cta.title": "Send your cleaning request on WhatsApp today",
    "cta.text": "Share the service and city you need, and our team will respond quickly.",
    "footer.rights": "All rights reserved.",
    "city.lefkosa.title": "Nicosia Cleaning Company",
    "city.lefkosa.text": "Sanu Cleaning provides home cleaning, office cleaning, post-construction cleaning, marble polishing, pest control, and sofa washing in Nicosia.",
    "city.girne.title": "Kyrenia Cleaning Company",
    "city.girne.text": "Get planned professional cleaning for homes, villas, offices, shops, and businesses in Kyrenia.",
    "city.magusa.title": "Famagusta Cleaning Company",
    "city.magusa.text": "Contact Sanu Cleaning for regular or one-time cleaning needs in Famagusta.",
    "city.guzelyurt.title": "Guzelyurt Cleaning Company",
    "city.guzelyurt.text": "Request a fast WhatsApp quote for home, office, and commercial cleaning in Guzelyurt.",
    "page.city.cta": "Get a Quote for This City",
    "page.service.title": "Nicosia Home Cleaning",
    "page.service.text": "Nicosia home cleaning covers kitchens, bathrooms, living rooms, bedrooms, and shared areas with a detailed hygiene plan.",
    "whatsapp.default": "Hello Sanu Cleaning, I would like to request a cleaning service quote."
  },
  ru: {
    "nav.home": "Главная",
    "nav.services": "Услуги",
    "nav.cities": "Города",
    "nav.about": "О нас",
    "nav.contact": "Контакты",
    "nav.quote": "Запросить цену",
    "hero.kicker": "Клининговая компания на Кипре",
    "hero.title": "Sanu Temizlik ve Ticaret Ltd.",
    "hero.text": "С 2012 года наша профессиональная команда в Никосии предоставляет уборку домов и офисов, уборку после ремонта, полировку мрамора, дезинсекцию и чистку диванов.",
    "hero.primary": "Запросить в WhatsApp",
    "hero.secondary": "Посмотреть услуги",
    "stats.years": "Лет опыта",
    "stats.city": "Основной регион",
    "stats.channel": "Быстрый канал связи",
    "services.kicker": "Услуги",
    "services.title": "Комплексные решения для дома и бизнеса",
    "services.text": "Sanu Cleaning объединяет профессиональные клининговые услуги на Кипре в одной надежной команде.",
    "service.home.title": "Уборка дома",
    "service.home.text": "Разовая или регулярная уборка кухни, ванной и жилых зон.",
    "service.office.title": "Уборка офиса",
    "service.office.text": "Плановая уборка офисов, магазинов и коммерческих помещений.",
    "service.construction.title": "Уборка после ремонта",
    "service.construction.text": "Профессиональная очистка пыли, строительных остатков и сильных загрязнений.",
    "service.marble.title": "Полировка мрамора",
    "service.marble.text": "Уход и защита мраморных поверхностей с правильным оборудованием.",
    "service.pest.title": "Дезинсекция",
    "service.pest.text": "Плановые решения pest control для домов и рабочих помещений.",
    "service.sofa.title": "Чистка диванов",
    "service.sofa.text": "Выездная чистка диванов, мягкой мебели и тканевых поверхностей.",
    "cities.kicker": "Города",
    "cities.title": "Уборка в Никосии, Кирении, Фамагусте и Гюзельюрте",
    "cities.text": "Страницы городов подготовлены для локальной видимости в поиске.",
    "form.kicker": "Заявка",
    "form.title": "Создайте быстрый запрос в WhatsApp",
    "form.text": "Данные формы автоматически превратятся в сообщение WhatsApp.",
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
    "about.kicker": "О нас",
    "about.title": "Надежная команда из Никосии с 2012 года",
    "about.text": "Sanu Temizlik ve Ticaret Ltd. обслуживает частных и корпоративных клиентов по всему Кипру с адреса Tahsin Yazıcı Sok. No:5 Çağlayan Lefkoşa / Kıbrıs.",
    "seo.title": "Быстрое локальное решение для уборки на Кипре",
    "seo.text": "Для уборки домов, офисов, после ремонта, полировки мрамора, дезинсекции и чистки диванов Sanu Cleaning предлагает быструю связь и профессиональный подход.",
    "cta.title": "Отправьте заявку в WhatsApp сегодня",
    "cta.text": "Укажите нужную услугу и город, и наша команда быстро ответит.",
    "footer.rights": "Все права защищены.",
    "city.lefkosa.title": "Клининговая компания в Никосии",
    "city.lefkosa.text": "Sanu Cleaning предоставляет уборку домов, офисов, после ремонта, полировку мрамора, дезинсекцию и чистку диванов в Никосии.",
    "city.girne.title": "Клининговая компания в Кирении",
    "city.girne.text": "Профессиональная уборка домов, вилл, офисов, магазинов и предприятий в Кирении.",
    "city.magusa.title": "Клининговая компания в Фамагусте",
    "city.magusa.text": "Свяжитесь с Sanu Cleaning для регулярной или разовой уборки в Фамагусте.",
    "city.guzelyurt.title": "Клининговая компания в Гюзельюрте",
    "city.guzelyurt.text": "Запросите быстрый расчет в WhatsApp для уборки дома, офиса и коммерческих помещений в Гюзельюрте.",
    "page.city.cta": "Запросить цену для города",
    "page.service.title": "Уборка дома в Никосии",
    "page.service.text": "Уборка дома в Никосии включает кухню, ванную, гостиную, спальни и общие зоны по детальному плану гигиены.",
    "whatsapp.default": "Здравствуйте, Sanu Cleaning. Я хочу запросить стоимость уборки."
  }
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

  document.querySelectorAll("[data-lang-option]").forEach((button) => {
    const isActive = button.dataset.langOption === nextLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
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

function setupWhatsAppForm() {
  const form = document.querySelector("[data-whatsapp-form]");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const language = getCurrentLanguage();
    const labels = messageLabels[language] || messageLabels.tr;
    const details = [
      labels.intro,
      "",
      `${labels.name}: ${getSelectedText(form, "name") || "-"}`,
      `${labels.phone}: ${getSelectedText(form, "phone") || "-"}`,
      `${labels.city}: ${getSelectedText(form, "city") || "-"}`,
      `${labels.service}: ${getSelectedText(form, "service") || "-"}`,
      `${labels.date}: ${getSelectedText(form, "date") || "-"}`,
      `${labels.notes}: ${getSelectedText(form, "notes") || "-"}`
    ].join("\n");

    window.location.href = `${WHATSAPP_DIRECT_URL}?text=${encodeURIComponent(details)}`;
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
  setupWhatsAppForm();
  setupMobileMenu();
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
