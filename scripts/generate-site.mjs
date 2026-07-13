import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const siteUrl = "https://sanutemizlik.com";
const whatsappNumber = "+905338828989";
const whatsappUrl = "http://wa.me/+905338828989";

const cities = [
  {
    slug: "lefkosa",
    name: "Lefkoşa",
    title: "Lefkoşa Temizlik Şirketi",
    keyword: "lefkoşa temizlik şirketi",
    intro: "Lefkoşa’da işler bazen aceleye gelir; ev de ofis de bir anda toparlanmak ister. Sanu Temizlik, tam da o noktada düzenli, güler yüzlü ve işini bilen ekibiyle yanınızdadır.",
    districts: "Çağlayan, Gönyeli, Küçük Kaymaklı, Ortaköy, Hamitköy ve Lefkoşa çevresi",
    image: "/assets/img/photo-1543953504-20a65fdbca90.jpg"
  },
  {
    slug: "girne",
    name: "Girne",
    title: "Girne Temizlik Şirketi",
    keyword: "girne temizlik şirketi",
    intro: "Girne’de villa, apartman, ofis ve işletmelerde temizlik işi güzel plan ister. Sanu Temizlik, yoğun sezonda da sakin zamanda da işi aksatmadan toparlar.",
    districts: "Girne merkez, Alsancak, Lapta, Ozanköy, Çatalköy ve çevre bölgeler",
    image: "/assets/img/photo-1543326162-d961e0f06f52.jpg"
  },
  {
    slug: "gazi-magusa",
    name: "Gazi Mağusa",
    title: "Gazi Mağusa Temizlik Şirketi",
    keyword: "gazi mağusa temizlik şirketi",
    intro: "Gazi Mağusa’da ev, iş yeri ve yeni teslim alanlar için temizliği son dakikaya bırakmadan planlamak isterseniz Sanu Temizlik hızlıca organize olur.",
    districts: "Mağusa merkez, Yeniboğaziçi, Salamis, Tuzla ve çevre bölgeler",
    image: "/assets/img/photo-1560943260-264fcf24c43d.jpg"
  },
  {
    slug: "guzelyurt",
    name: "Güzelyurt",
    title: "Güzelyurt Temizlik Şirketi",
    keyword: "güzelyurt temizlik şirketi",
    intro: "Güzelyurt ve çevresinde eviniz, apartmanınız ya da iş yeriniz için temiz, ferah ve güven veren bir sonuç istiyorsanız Sanu Temizlik işi sahiplenir.",
    districts: "Güzelyurt merkez, Lefke, Gemikonağı ve çevre bölgeler",
    image: "/assets/img/photo-1549488344-1f9b8d2bd1f3.jpg"
  }
];

const services = [
  {
    slug: "ev-temizligi",
    name: "Ev Temizliği",
    icon: "home",
    category: "Temizlik Hizmetleri",
    image: "/assets/img/photo-1581578731548-c64695cc6952.jpg",
    short: "Mutfak, banyo, salon ve yaşam alanlarında hijyen odaklı detaylı ev temizliği.",
    details: [
      "Mutfak dolap dışları, tezgah, lavabo, ocak çevresi ve günlük temas yüzeyleri temizlenir.",
      "Banyo, tuvalet, armatür, duş alanı ve zeminlerde hijyen öncelikli uygulama yapılır.",
      "Tek seferlik taşınma öncesi/sonrası veya düzenli haftalık ev temizliği planlanabilir."
    ],
    keywords: ["ev temizliği", "kıbrıs temizlik şirketi", "kktc temizlik şirketi"]
  },
  {
    slug: "ofis-temizligi",
    name: "Ofis Temizliği",
    icon: "building-2",
    category: "Kurumsal Temizlik",
    image: "/assets/img/photo-1497366216548-37526070297c.jpg",
    short: "Çalışma alanları, toplantı odaları, ortak kullanım alanları ve kurum içi hijyen için planlı temizlik.",
    details: [
      "Masa, kapı kolu, ortak cihazlar ve sık temas edilen yüzeyler düzenli olarak temizlenir.",
      "Mesai öncesi, mesai sonrası veya işletmenin uygun olduğu zaman aralıklarında hizmet verilir.",
      "Ofis, ajans, muhasebe bürosu, çağrı merkezi ve yönetim ofisleri için uygundur."
    ],
    keywords: ["ofis temizliği", "düzenli temizlik", "kıbrıs temizlik şirketi"]
  },
  {
    slug: "insaat-sonrasi-temizlik",
    name: "İnşaat Sonrası Temizlik",
    icon: "hard-hat",
    category: "Özel Temizlik",
    image: "/assets/img/photo-1504917595217-d4dc5ebe6122.jpg",
    short: "Tadilat, boya, yeni teslim yapı ve şantiye sonrası toz/kaba kir temizliği.",
    details: [
      "İnce toz, boya kalıntısı, zemin kirleri ve pencere çevresi kontrollü şekilde temizlenir.",
      "Ev, ofis, mağaza ve yeni teslim dairelerde kullanıma hazır alan hedeflenir.",
      "Hizmet kapsamı metrekare, kirlilik seviyesi ve teslim takvimine göre planlanır."
    ],
    keywords: ["inşaat sonrası temizlik", "kktc temizlik şirketi", "temizlik şirketi"]
  },
  {
    slug: "mermer-cilalama",
    name: "Mermer Cilalama",
    icon: "gem",
    category: "Zemin Bakımı",
    image: "/assets/img/photo-1600566752355-35792bedcfea.jpg",
    short: "Mermer zeminlerde parlaklık, bakım ve yüzey koruma için profesyonel uygulama.",
    details: [
      "Mermer yüzeylerde matlaşma, kullanım izi ve parlaklık kaybı için yerinde değerlendirme yapılır.",
      "Uygulama alanı, zemin durumu ve istenen parlaklık seviyesine göre ekipman seçilir.",
      "Apartman girişi, ofis, mağaza, villa ve ticari zeminlerde uygulanabilir."
    ],
    keywords: ["mermer cilalama", "zemin bakımı", "kıbrıs temizlik şirketi"]
  },
  {
    slug: "hasere-ilaclama",
    name: "Haşere İlaçlama",
    icon: "shield-check",
    category: "Pest Control",
    image: "/assets/img/photo-1584820927498-cafe2c1ba93b.jpg",
    short: "Ev ve iş yerlerinde haşere riskine karşı planlı pest control hizmeti.",
    details: [
      "Mutfak, depo, ortak alan, bodrum ve işletme çevresi gibi riskli noktalar değerlendirilir.",
      "Uygulama öncesinde alan kullanımı ve güvenlik beklentileri netleştirilir.",
      "Konut, restoran, ofis, mağaza ve apartman ortak alanları için hizmet verilir."
    ],
    keywords: ["haşere ilaçlama", "pest control", "kktc temizlik şirketi"]
  },
  {
    slug: "koltuk-yikama",
    name: "Koltuk Yıkama",
    icon: "sofa",
    category: "Kumaş Yüzey Bakımı",
    image: "/assets/img/photo-1563453392212-326f5e854473.jpg",
    short: "Koltuk, oturma grubu ve kumaş yüzeylerde yerinde yıkama ve bakım.",
    details: [
      "Koltuk kumaşı, leke durumu ve kullanım yoğunluğuna göre uygun temizlik planı yapılır.",
      "Ev, ofis, bekleme salonu, klinik ve mağaza oturma alanları için uygundur.",
      "Koltuk yıkama talebi halı yıkama ve genel temizlik planıyla birlikte alınabilir."
    ],
    keywords: ["koltuk yıkama", "lefkoşa halı yıkama", "kıbrıs temizlik şirketi"]
  },
  {
    slug: "hali-yikama",
    name: "Halı Yıkama",
    icon: "scan",
    category: "Kumaş Yüzey Bakımı",
    image: "/assets/img/photo-1513694203232-719a280e022f.jpg",
    short: "Halı, kilim ve kumaş yüzeyler için hijyen odaklı yıkama ve bakım yönlendirmesi.",
    details: [
      "Halı türü, ölçü, leke durumu ve teslim beklentisine göre hizmet kapsamı netleştirilir.",
      "Lefkoşa merkezli taleplerde hızlı WhatsApp iletişimiyle uygun planlama yapılır.",
      "Koltuk yıkama, ev temizliği ve düzenli temizlik hizmetleriyle birlikte istenebilir."
    ],
    keywords: ["lefkoşa halı yıkama", "halı yıkama", "lefkoşa temizlik şirketi"]
  },
  {
    slug: "apartman-merdiven-temizligi",
    name: "Apartman Merdiven Temizliği",
    icon: "stairs",
    category: "Düzenli Temizlik",
    image: "/assets/img/photo-1505693416388-ac5ce068fe85.jpg",
    short: "Apartman girişleri, merdivenler, korkuluklar, asansör çevresi ve ortak alanlar için düzenli temizlik.",
    details: [
      "Haftalık veya aylık periyotlarla apartman ortak alanları planlı şekilde temizlenir.",
      "Merdiven, giriş, posta kutusu çevresi, korkuluk ve asansör önü gibi alanlar programa alınır.",
      "Site yönetimi, apartman yönetimi ve bina sahipleri için sürdürülebilir hizmet modeli sunulur."
    ],
    keywords: ["apartman merdiven temizliği", "düzenli temizlik", "kktc temizlik şirketi"]
  },
  {
    slug: "duzenli-temizlik",
    name: "Düzenli Temizlik",
    icon: "calendar-check",
    category: "Düzenli Temizlik",
    image: "/assets/img/photo-1527515637462-cff94eecc1ac.jpg",
    short: "Ev, ofis, apartman, mağaza ve işletmeler için haftalık/aylık düzenli temizlik programları.",
    details: [
      "Temizlik sıklığı, personel ihtiyacı, alan büyüklüğü ve çalışma saatleri birlikte planlanır.",
      "Ofis, mağaza, apartman, klinik ve işletmelerde devamlı hijyen standardı hedeflenir.",
      "Rutin kontrol listesiyle aynı kaliteyi korumaya yardımcı olan iş akışı oluşturulur."
    ],
    keywords: ["düzenli temizlik", "ofis temizliği", "kıbrıs temizlik şirketi"]
  },
  {
    slug: "hastane-temizligi",
    name: "Hastane ve Klinik Temizliği",
    icon: "cross",
    category: "Kurumsal Temizlik",
    image: "/assets/img/photo-1586773860418-d37222d8fce3.jpg",
    short: "Klinik, muayenehane, sağlık merkezi ve bekleme alanlarında hijyen odaklı kurumsal temizlik.",
    details: [
      "Bekleme salonu, danışma alanı, hasta kabul noktaları ve ortak yüzeyler düzenli temizlenir.",
      "Sağlık alanlarının hassasiyetine uygun, kontrollü ve planlı temizlik yaklaşımı uygulanır.",
      "Klinik çalışma saatlerine göre gündüz, akşam veya periyodik temizlik programı hazırlanabilir."
    ],
    keywords: ["hastane temizliği", "klinik temizliği", "kktc temizlik şirketi"]
  },
  {
    slug: "magaza-temizligi",
    name: "Mağaza Temizliği",
    icon: "store",
    category: "Kurumsal Temizlik",
    image: "/assets/img/photo-1607082349566-187342175e2f.jpg",
    short: "Mağaza, showroom, restoran giriş alanı ve ticari işletmeler için vitrini güçlü temizlik.",
    details: [
      "Zemin, raf çevresi, kasa alanı, soyunma kabini, cam ve giriş noktaları programa dahil edilebilir.",
      "Müşteri trafiği yoğun işletmelerde günlük veya haftalık temizlik düzeni kurulabilir.",
      "Açılış öncesi, kapanış sonrası veya sezonluk derin temizlik planlanabilir."
    ],
    keywords: ["mağaza temizliği", "düzenli temizlik", "girne temizlik şirketi"]
  },
  {
    slug: "dis-cephe-cam-temizligi",
    name: "Dış Cephe Cam Temizliği",
    icon: "panels-top-left",
    category: "Özel Temizlik",
    image: "/assets/img/photo-1486406146926-c627a92ad1ab.jpg",
    short: "İş yeri, mağaza, bina ve villa camlarında dış cephe ve erişimi zor cam temizliği.",
    details: [
      "Vitrin, giriş camı, ofis cephesi ve ulaşılması zor camlar için alan incelemesi yapılır.",
      "Güvenli çalışma koşulları, yükseklik ve erişim detayları hizmet öncesi netleştirilir.",
      "Mağaza, plaza, apartman, villa ve kurumsal binalar için düzenli cam temizliği planlanabilir."
    ],
    keywords: ["dış cephe cam temizliği", "cam temizliği", "kıbrıs temizlik şirketi"]
  },
  {
    slug: "elektrik-servisi",
    name: "Elektrik Servisi",
    icon: "zap",
    category: "Teknik Servis",
    image: "/assets/img/photo-1621905252507-b35492cc74b4.jpg",
    short: "Ev ve iş yerleri için elektrik arıza, kontrol, küçük onarım ve teknik destek talepleri.",
    details: [
      "Priz, anahtar, sigorta, aydınlatma ve küçük elektrik arızaları için talep alınır.",
      "İşin kapsamı ve güvenlik gereklilikleri WhatsApp üzerinden ön değerlendirmeyle netleştirilir.",
      "Temizlik sonrası veya düzenli işletme bakım planlarıyla birlikte teknik servis istenebilir."
    ],
    keywords: ["elektrik servisi", "teknik servis", "kktc temizlik şirketi"]
  },
  {
    slug: "su-tesisati-servisi",
    name: "Su Tesisatı Servisi",
    icon: "droplets",
    category: "Teknik Servis",
    image: "/assets/img/photo-1607472586893-edb57bdc0e39.jpg",
    short: "Su kaçağı, batarya, lavabo, gider ve küçük tesisat talepleri için teknik servis yönlendirmesi.",
    details: [
      "Lavabo, musluk, sifon, gider ve küçük tesisat işleri için ön bilgi alınır.",
      "Acil veya planlı taleplerde adres, fotoğraf ve açıklama üzerinden hızlı değerlendirme yapılır.",
      "İşletmelerde düzenli bakım ve küçük onarım planına dahil edilebilir."
    ],
    keywords: ["su tesisatı servisi", "bakım onarım", "teknik servis"]
  },
  {
    slug: "bakim-onarim",
    name: "Bakım Onarım",
    icon: "wrench",
    category: "Teknik Servis",
    image: "/assets/img/photo-1581092160562-40aa08e78837.jpg",
    short: "Ev, ofis ve işletmeler için küçük bakım, onarım ve düzenli teknik destek işleri.",
    details: [
      "Kapı, dolap, küçük tadilat, basit tamirat ve işletme içi bakım talepleri alınır.",
      "İş kapsamı, malzeme ihtiyacı ve uygun zaman planı WhatsApp üzerinden netleştirilir.",
      "Düzenli temizlik alanlarında işletme bakım kontrolüyle birlikte planlanabilir."
    ],
    keywords: ["bakım onarım", "teknik servis", "kıbrıs temizlik şirketi"]
  },
  {
    slug: "montaj-servisi",
    name: "Montaj Servisi",
    icon: "hammer",
    category: "Teknik Servis",
    image: "/assets/img/photo-1581092918056-0c4c3acd3789.jpg",
    short: "Raf, aksesuar, küçük mobilya ve işletme ekipmanları için montaj desteği.",
    details: [
      "Küçük mobilya, raf, askı, aksesuar ve işletme içi ekipman montajı için talep alınır.",
      "Montaj yapılacak ürün, duvar/zemin yapısı ve gerekli ekipman bilgisi önceden paylaşılır.",
      "Taşınma sonrası ev temizliği veya ofis hazırlığıyla birlikte planlanabilir."
    ],
    keywords: ["montaj servisi", "bakım onarım", "teknik servis"]
  }
];

function ensureFile(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
}

function esc(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function stripHtml(value) {
  return String(value).replace(/<[^>]*>/g, "");
}

function absoluteImage(image) {
  return image.startsWith("/") ? `${siteUrl}${image}` : image;
}

function rel(depth) {
  return "../".repeat(depth);
}

function pathFromRoot(depth, path) {
  return `${rel(depth)}${String(path).replace(/^\//, "")}`;
}

const keywordTargets = new Map([
  ["lefkoşa temizlik şirketi", "lefkosa/"],
  ["girne temizlik şirketi", "girne/"],
  ["gazi mağusa temizlik şirketi", "gazi-magusa/"],
  ["güzelyurt temizlik şirketi", "guzelyurt/"],
  ["kıbrıs temizlik şirketi", "hizmetler/"],
  ["kktc temizlik şirketi", "hizmetler/"],
  ["lefkoşa halı yıkama", "lefkosa/hali-yikama/"],
  ["halı yıkama", "hizmetler/hali-yikama/"],
  ["koltuk yıkama", "hizmetler/koltuk-yikama/"],
  ["ev temizliği", "hizmetler/ev-temizligi/"],
  ["ofis temizliği", "hizmetler/ofis-temizligi/"],
  ["inşaat sonrası temizlik", "hizmetler/insaat-sonrasi-temizlik/"],
  ["mermer cilalama", "hizmetler/mermer-cilalama/"],
  ["haşere ilaçlama", "hizmetler/hasere-ilaclama/"],
  ["pest control", "hizmetler/hasere-ilaclama/"],
  ["apartman merdiven temizliği", "hizmetler/apartman-merdiven-temizligi/"],
  ["düzenli temizlik", "hizmetler/duzenli-temizlik/"],
  ["hastane temizliği", "hizmetler/hastane-temizligi/"],
  ["klinik temizliği", "hizmetler/hastane-temizligi/"],
  ["mağaza temizliği", "hizmetler/magaza-temizligi/"],
  ["dış cephe cam temizliği", "hizmetler/dis-cephe-cam-temizligi/"],
  ["cam temizliği", "hizmetler/dis-cephe-cam-temizligi/"],
  ["elektrik servisi", "hizmetler/elektrik-servisi/"],
  ["su tesisatı servisi", "hizmetler/su-tesisati-servisi/"],
  ["bakım onarım", "hizmetler/bakim-onarim/"],
  ["montaj servisi", "hizmetler/montaj-servisi/"],
  ["teknik servis", "hizmetler/bakim-onarim/"]
]);

function serviceSlugForKeyword(keyword) {
  const normalized = keyword.toLocaleLowerCase("tr-TR");
  const service = services.find((item) => item.keywords.some((candidate) => candidate.toLocaleLowerCase("tr-TR") === normalized));
  return service?.slug || "";
}

function keywordPath(keyword, city = null) {
  const normalized = keyword.toLocaleLowerCase("tr-TR");
  const serviceSlug = serviceSlugForKeyword(normalized);

  if (city && serviceSlug && !["kıbrıs temizlik şirketi", "kktc temizlik şirketi", "lefkoşa temizlik şirketi", "girne temizlik şirketi", "gazi mağusa temizlik şirketi", "güzelyurt temizlik şirketi", "lefkoşa halı yıkama"].includes(normalized)) {
    return `${city.slug}/${serviceSlug}/`;
  }

  return keywordTargets.get(normalized) || (serviceSlug ? `hizmetler/${serviceSlug}/` : "hizmetler/");
}

function keywordLink(label, depth = 0, city = null) {
  const href = pathFromRoot(depth, keywordPath(label, city));
  return `<a class="keyword-link" href="${href}"><strong>${esc(label)}</strong></a>`;
}

function keywordList(keywords, depth = 0, city = null) {
  return keywords.map((keyword) => keywordLink(keyword, depth, city)).join(", ");
}

function serviceSearchSentence(service, city = null) {
  const depth = city ? 2 : 2;
  const primaryKeyword = keywordLink(service.keywords[0], depth, city);
  const localKeyword = city ? keywordLink(city.keyword, depth, city) : keywordLink("kıbrıs temizlik şirketi", depth);
  const secondaryKeyword = service.keywords[1] ? keywordLink(service.keywords[1], depth, city) : keywordLink("kktc temizlik şirketi", depth);
  const placeText = city ? `${city.name} içinde` : "Kıbrıs genelinde";

  return `${placeText} hizmet arayan kişi önce işi doğru anlayan bir ekibe ulaşmak ister. Bu yüzden ${primaryKeyword} sayfasında kapsamı açık anlattık; ${localKeyword} aramasıyla gelen ziyaretçi de fiyat, planlama ve iletişim adımlarını tek tek görebilir. Daha özel taleplerde ${secondaryKeyword} bağlantısı üzerinden ilgili hizmete geçmek de kolaydır.`;
}

function serviceOptions(selectedSlug = "") {
  return services.map((service) => `<option value="${service.name}" ${service.slug === selectedSlug ? "selected" : ""}>${service.name}</option>`).join("");
}

function cityOptions(selectedSlug = "") {
  return cities.map((city) => `<option value="${city.name}" ${city.slug === selectedSlug ? "selected" : ""}>${city.name}</option>`).join("");
}

function languageDropdown() {
  return `
    <div class="relative" data-language-dropdown>
      <button class="language-trigger" type="button" data-language-toggle aria-label="Dil seç">
        <span data-current-flag>🇹🇷</span>
        <span data-current-lang>TR</span>
        <i data-lucide="chevron-down" class="h-4 w-4" aria-hidden="true"></i>
      </button>
      <div class="language-menu hidden" data-language-menu>
        <button class="language-button" type="button" data-lang-option="tr" aria-pressed="true"><span>🇹🇷</span><span>Türkçe</span></button>
        <button class="language-button" type="button" data-lang-option="en" aria-pressed="false"><span>🇬🇧</span><span>English</span></button>
        <button class="language-button" type="button" data-lang-option="ru" aria-pressed="false"><span>🇷🇺</span><span>Русский</span></button>
      </div>
    </div>`;
}

function head({ title, description, keywords, canonical, depth = 0, extra = "", robots = "index,follow" }) {
  const root = rel(depth);
  return `
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="keywords" content="${esc(keywords)}">
  <meta name="robots" content="${esc(robots)}">
  <meta name="googlebot" content="${esc(robots)},max-snippet:-1,max-image-preview:large,max-video-preview:-1">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${esc(canonical)}">
  <meta property="og:image" content="${siteUrl}/assets/img/sanu-temizlik-logo.png">
  <meta property="og:locale" content="tr_CY">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="canonical" href="${esc(canonical)}">
  <link rel="icon" href="${root}assets/img/sanu-temizlik-logo.png">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = { theme: { extend: { colors: { brand: { 50: "#f0fbff", 100: "#e5f7fd", 600: "#00a7e1", 700: "#008fd0", 800: "#075b80", 900: "#034667" } } } } };
  </script>
  <link rel="stylesheet" href="${root}assets/css/styles.css">
  <script defer src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
  <script defer src="${root}assets/js/main.js"></script>
  ${extra}`;
}

function header(depth = 0) {
  const root = rel(depth);
  return `
  <header class="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
    <nav class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8" aria-label="Ana menü">
      <a href="${root}index.html" class="flex items-center gap-3" aria-label="Sanu Temizlik ana sayfa">
        <img src="${root}assets/img/sanu-temizlik-logo.png" alt="Sanu Temizlik ve Ticaret Ltd. logosu" class="h-12 w-auto">
      </a>
      <div class="hidden items-center gap-7 lg:flex">
        <a class="nav-link" href="${root}index.html" data-i18n="nav.home">Ana Sayfa</a>
        <a class="nav-link" href="${root}hizmetler/" data-i18n="nav.services">Hizmetler</a>
        <a class="nav-link" href="${root}index.html#cities" data-i18n="nav.cities">Bölgeler</a>
        <a class="nav-link" href="${root}index.html#about" data-i18n="nav.about">Hakkımızda</a>
        <a class="nav-link" href="${root}iletisim/" data-i18n="nav.contact">İletişim</a>
      </div>
      <div class="flex items-center gap-2">
        ${languageDropdown()}
        <a class="btn-primary hidden lg:inline-flex" href="${whatsappUrl}" data-whatsapp-cta>
          <i data-lucide="message-circle" class="h-5 w-5" aria-hidden="true"></i>
          <span data-i18n="nav.quote">Teklif Al</span>
        </a>
        <button class="inline-flex rounded-md border border-sky-100 p-2 text-brand-800 lg:hidden" type="button" data-mobile-menu-button aria-expanded="false" aria-label="Menüyü aç">
          <i data-lucide="menu" class="h-6 w-6" aria-hidden="true"></i>
        </button>
      </div>
    </nav>
    <div class="hidden border-t border-sky-100 bg-white px-4 py-4 lg:hidden" data-mobile-menu>
      <div class="grid gap-3">
        <a class="nav-link" href="${root}index.html" data-i18n="nav.home">Ana Sayfa</a>
        <a class="nav-link" href="${root}hizmetler/" data-i18n="nav.services">Hizmetler</a>
        <a class="nav-link" href="${root}index.html#cities" data-i18n="nav.cities">Bölgeler</a>
        <a class="nav-link" href="${root}index.html#about" data-i18n="nav.about">Hakkımızda</a>
        <a class="nav-link" href="${root}iletisim/" data-i18n="nav.contact">İletişim</a>
        <a class="btn-primary mt-2" href="${whatsappUrl}" data-whatsapp-cta>
          <i data-lucide="message-circle" class="h-5 w-5" aria-hidden="true"></i>
          <span data-i18n="nav.quote">Teklif Al</span>
        </a>
      </div>
    </div>
  </header>`;
}

function footer(depth = 0) {
  const root = rel(depth);
  return `
  <footer id="contact" class="bg-brand-900 py-12 text-sky-50">
    <div class="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-4 lg:px-8">
      <div class="md:col-span-2">
        <img src="${root}assets/img/sanu-temizlik-logo.png" alt="Sanu Temizlik ve Ticaret Ltd. logosu" class="h-14 w-auto rounded-md bg-white p-2">
        <p class="mt-5 max-w-md text-sky-100">Sanu Temizlik ve Ticaret Ltd. - Lefkoşa merkezli Kıbrıs temizlik ve teknik servis çözümleri.</p>
      </div>
      <div>
        <h2 class="text-sm font-black uppercase tracking-widest text-white">Sayfalar</h2>
        <ul class="mt-4 grid gap-3 text-sm">
          <li><a class="footer-link" href="${root}hizmetler/">Hizmetler</a></li>
          <li><a class="footer-link" href="${root}lefkosa/">Lefkoşa</a></li>
          <li><a class="footer-link" href="${root}girne/">Girne</a></li>
          <li><a class="footer-link" href="${root}iletisim/">İletişim</a></li>
          <li><a class="footer-link" href="${root}site-haritasi/">Site Haritası</a></li>
        </ul>
      </div>
      <div>
        <h2 class="text-sm font-black uppercase tracking-widest text-white">İletişim</h2>
        <ul class="mt-4 grid gap-3 text-sm">
          <li><a class="footer-link" href="mailto:info@sanutemizlik.com">info@sanutemizlik.com</a></li>
          <li><a class="footer-link" href="tel:+905338828989">+90 533 882 89 89</a></li>
          <li>Tahsin Yazıcı Sok. No:5 Çağlayan Lefkoşa / Kıbrıs</li>
        </ul>
      </div>
    </div>
    <div class="mx-auto mt-10 max-w-7xl border-t border-sky-800 px-4 pt-6 text-sm text-sky-100 lg:px-8">
      © <span data-current-year>2026</span> Sanu Temizlik ve Ticaret Ltd. <span data-i18n="footer.rights">Tüm hakları saklıdır.</span>
    </div>
  </footer>`;
}

function quoteForm({ depth = 0, citySlug = "", serviceSlug = "", contact = false } = {}) {
  return `
  <form class="surface p-5 sm:p-7" data-whatsapp-form>
    <div class="grid gap-4 sm:grid-cols-2">
      <label class="grid gap-2 text-sm font-bold text-slate-700">
        <span data-i18n="form.name">Ad Soyad</span>
        <input class="form-input" name="name" type="text" autocomplete="name" data-i18n-placeholder="form.placeholder.name" placeholder="Adınız ve soyadınız">
      </label>
      <label class="grid gap-2 text-sm font-bold text-slate-700">
        <span data-i18n="form.phone">Telefon</span>
        <input class="form-input" name="phone" type="tel" autocomplete="tel" data-i18n-placeholder="form.placeholder.phone" placeholder="Telefon numaranız">
      </label>
      <label class="grid gap-2 text-sm font-bold text-slate-700">
        <span data-i18n="form.city">Şehir</span>
        <select class="form-input" name="city" required>${cityOptions(citySlug)}</select>
      </label>
      <label class="grid gap-2 text-sm font-bold text-slate-700">
        <span data-i18n="form.service">Hizmet Türü</span>
        <select class="form-input" name="service" required>${serviceOptions(serviceSlug)}</select>
      </label>
      <label class="grid gap-2 text-sm font-bold text-slate-700 ${contact ? "" : "sm:col-span-2"}">
        <span data-i18n="form.date">Tercih Edilen Tarih</span>
        <input class="form-input" name="date" type="date" required>
      </label>
      <label class="grid gap-2 text-sm font-bold text-slate-700 sm:col-span-2">
        <span data-i18n="form.notes">Notunuz</span>
        <textarea class="form-input min-h-28 resize-y" name="notes" data-i18n-placeholder="form.placeholder.notes" placeholder="Adres, metrekare, saat aralığı veya özel talep"></textarea>
      </label>
    </div>
    <button class="btn-primary mt-5 w-full" type="submit">
      <i data-lucide="message-square-text" class="h-5 w-5" aria-hidden="true"></i>
      <span data-i18n="form.submit">WhatsApp Mesajı Oluştur</span>
    </button>
  </form>`;
}

function serviceCard(service, depth = 0, city = null) {
  const root = rel(depth);
  const href = city ? `${root}${city.slug}/${service.slug}/` : `${root}hizmetler/${service.slug}/`;
  return `
  <a class="service-card bg-white p-6" href="${href}">
    <img src="${service.image}" alt="${esc(service.name)} hizmet görseli" class="mb-5 aspect-[4/3] w-full rounded-md object-cover" loading="lazy">
    <span class="icon-tile"><i data-lucide="${service.icon}" class="h-5 w-5" aria-hidden="true"></i></span>
    <p class="mt-4 text-xs font-black uppercase tracking-widest text-brand-700">${service.category}</p>
    <h3 class="mt-2 text-xl font-black text-slate-950">${service.name}</h3>
    <p class="mt-3 text-sm leading-6 text-slate-600">${service.short}</p>
  </a>`;
}

function serviceGrid(depth = 0, city = null) {
  return services.map((service) => serviceCard(service, depth, city)).join("");
}

function localTone(city) {
  if (!city) {
    return "Kıbrıs’ta evin, ofisin ya da işletmenin düzeni bozuldu mu insan hızlı, güvenilir ve sözüne sadık bir ekip ister. Sanu Temizlik, işi büyütmeden dinler, ihtiyacı netleştirir ve temiz pak bir sonuç için planlı çalışır.";
  }

  const tones = {
    lefkosa: "Lefkoşa’da hayat hızlı akar; bazen ev, ofis ya da apartman bir anda elden geçsin ister. Sanu Temizlik, Çağlayan’dan Gönyeli’ye kadar işi uzatmadan, temiz pak ve iç rahatlatan bir hizmet sunar.",
    girne: "Girne’de evler, villalar, mağazalar ve turistik işletmeler sezon temposunu iyi bilir. Biz de işi ona göre planlar, misafir gelmeden ya da mesai başlamadan alanı pırıl pırıl hazırlamaya bakarız.",
    "gazi-magusa": "Gazi Mağusa’da ister yeni teslim daire olsun ister yoğun kullanılan bir iş yeri, temizlik düzgün yapılınca alanın havası değişir. Sanu Temizlik, işi baştan konuşur ve söz verdiği gibi tamamlar.",
    guzelyurt: "Güzelyurt’ta ev, apartman ve işletme temizliğinde en kıymetli şey güven ve devamlılıktır. Sanu Temizlik, aynı özeni her gelişinde korumaya çalışan bir ekip anlayışıyla hizmet verir."
  };

  return tones[city.slug] || city.intro;
}

function serviceWarmIntro(service, city = null) {
  const place = city ? `${city.name} bölgesinde` : "Kıbrıs genelinde";
  return `${place} ${service.name.toLowerCase()} ihtiyacınız varsa önce neye ihtiyaç olduğunu güzelce konuşuruz. Metrekare, kullanım yoğunluğu, zaman aralığı ve özel beklentiler netleşince ekip, malzeme ve iş sırası ona göre hazırlanır. Böylece hem sürpriz azalır hem de ortaya içinize sinen bir sonuç çıkar.`;
}

function serviceFor(service) {
  const map = {
    "ev-temizligi": "Taşınma öncesi/sonrası evler, düzenli temizlik isteyen aileler, misafir öncesi hızlı toparlanması gereken yaşam alanları için uygundur.",
    "ofis-temizligi": "Ofisler, ajanslar, muhasebe büroları, çağrı merkezleri ve düzenli hijyen standardı isteyen çalışma alanları için uygundur.",
    "insaat-sonrasi-temizlik": "Tadilat sonrası evler, yeni teslim daireler, mağazalar, ofisler ve inşaat tozu kalan alanlar için uygundur.",
    "mermer-cilalama": "Apartman girişleri, mağazalar, villalar, ofis zeminleri ve parlaklığını kaybetmiş mermer yüzeyler için uygundur.",
    "hasere-ilaclama": "Evler, restoranlar, depolar, apartman ortak alanları, ofisler ve haşere riski oluşan işletmeler için uygundur.",
    "koltuk-yikama": "Ev koltukları, ofis bekleme alanları, klinik oturma grupları ve yoğun kullanılan kumaş yüzeyler için uygundur.",
    "hali-yikama": "Ev, ofis ve işletmelerde kullanılan halı, kilim ve kumaş zemin talepleri için uygundur.",
    "apartman-merdiven-temizligi": "Apartman yönetimleri, site girişleri, merdiven boşlukları, asansör çevresi ve ortak alanlar için uygundur.",
    "duzenli-temizlik": "Haftalık veya aylık temizlik isteyen evler, ofisler, mağazalar, klinikler ve apartmanlar için uygundur.",
    "hastane-temizligi": "Klinikler, muayenehaneler, sağlık merkezleri, bekleme salonları ve hassas hijyen isteyen alanlar için uygundur.",
    "magaza-temizligi": "Mağazalar, showroomlar, restoran girişleri, vitrinli işletmeler ve müşteri trafiği yoğun alanlar için uygundur.",
    "dis-cephe-cam-temizligi": "Vitrinler, ofis cepheleri, mağaza camları, villa camları ve erişimi zor dış yüzeyler için uygundur.",
    "elektrik-servisi": "Ev, ofis ve işletmelerde küçük elektrik arızası, aydınlatma, priz, anahtar ve kontrol işleri için uygundur.",
    "su-tesisati-servisi": "Musluk, lavabo, sifon, gider, küçük kaçak ve planlı tesisat bakım talepleri için uygundur.",
    "bakim-onarim": "Ev, ofis, mağaza ve apartmanlarda küçük tamirat, bakım ve işletme içi düzenleme işleri için uygundur.",
    "montaj-servisi": "Raf, askı, küçük mobilya, aksesuar ve işletme ekipmanı montajı gereken alanlar için uygundur."
  };

  return map[service.slug] || `${service.name} ihtiyacı olan ev, ofis ve işletmeler için uygundur.`;
}

function serviceSeoPhrase(service, city = null) {
  const place = city ? city.name : "Kıbrıs";
  const localKeyword = city ? city.keyword : "kıbrıs temizlik şirketi";
  const extra = service.slug === "hali-yikama" || service.slug === "koltuk-yikama"
    ? " Özellikle Lefkoşa tarafında halı ve koltuk gibi kumaş yüzeylerde temiz, ferah ve güvenilir hizmet arayanlar için doğru planlama önemlidir."
    : "";

  if (!city) {
    return `${place} içinde güvenilir bir ekip ararken sadece fiyat değil, sözünde durma, doğru zamanlama ve temiz iş de önemlidir. ${keywordLink(localKeyword, 2)} aramasıyla gelen ziyaretçinin ne alacağını hemen anlaması için hizmet kapsamını açık tuttuk; farklı şehir ve servis ihtiyaçlarında da ilgili sayfalara doğal bağlantılarla geçiş sağladık.${extra}`;
  }

  return `${place} içinde güvenilir bir ekip ararken sadece fiyat değil, sözünde durma, doğru zamanlama ve temiz iş de önemlidir. ${keywordLink(localKeyword, city ? 2 : 2, city)} aramasıyla gelen ziyaretçinin ne alacağını hemen anlaması için hizmet kapsamını açık tuttuk; Kıbrıs genelinde düzenli destek isteyenler için de ${keywordLink("kıbrıs temizlik şirketi", city ? 2 : 2, city)} bağlantısından tüm hizmetlere kolay geçiş sağladık.${extra}`;
}

function localBusinessSchema() {
  return {
    "@type": ["LocalBusiness", "CleaningService"],
    "@id": `${siteUrl}/#localbusiness`,
    name: "Sanu Temizlik ve Ticaret Ltd.",
    legalName: "Sanu Temizlik ve Ticaret Ltd.",
    image: `${siteUrl}/assets/img/sanu-temizlik-logo.png`,
    logo: `${siteUrl}/assets/img/sanu-temizlik-logo.png`,
    url: siteUrl,
    email: "info@sanutemizlik.com",
    telephone: whatsappNumber,
    foundingDate: "2012",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Tahsin Yazıcı Sok. No:5 Çağlayan",
      addressLocality: "Lefkoşa",
      addressCountry: "CY"
    },
    areaServed: cities.map((city) => ({ "@type": "City", name: city.name })),
    contactPoint: [{
      "@type": "ContactPoint",
      telephone: whatsappNumber,
      contactType: "customer service",
      availableLanguage: ["tr", "en", "ru"],
      areaServed: "CY"
    }],
    hasMap: "https://www.google.com/maps?q=Sanu%20Temizlik%20Tahsin%20Yaz%C4%B1c%C4%B1%20Sok.%20No%3A5%20%C3%87a%C4%9Flayan%20Lefko%C5%9Fa%20K%C4%B1br%C4%B1s",
    knowsAbout: services.map((service) => service.name),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Sanu Temizlik Hizmetleri",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          serviceType: service.category,
          url: `${siteUrl}/hizmetler/${service.slug}/`
        }
      }))
    },
    sameAs: [whatsappUrl]
  };
}

function webSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "Sanu Temizlik ve Ticaret Ltd.",
    url: siteUrl,
    inLanguage: "tr",
    publisher: { "@id": `${siteUrl}/#localbusiness` }
  };
}

function breadcrumbSchema(canonical, title) {
  const path = new URL(canonical).pathname;
  const segments = path.split("/").filter(Boolean);
  const items = [{ name: "Ana Sayfa", url: `${siteUrl}/` }];

  if (segments[0] === "hizmetler") {
    items.push({ name: "Hizmetler", url: `${siteUrl}/hizmetler/` });
    if (segments[1]) {
      const service = services.find((item) => item.slug === segments[1]);
      items.push({ name: service?.name || title, url: canonical });
    }
  } else if (segments[0]) {
    const city = cities.find((item) => item.slug === segments[0]);
    if (city) {
      items.push({ name: city.name, url: `${siteUrl}/${city.slug}/` });
      if (segments[1]) {
        const service = services.find((item) => item.slug === segments[1]);
        items.push({ name: service ? `${city.name} ${service.name}` : title, url: canonical });
      }
    } else if (segments[0] === "iletisim") {
      items.push({ name: "İletişim", url: canonical });
    } else if (segments[0] === "site-haritasi") {
      items.push({ name: "Site Haritası", url: canonical });
    }
  }

  return {
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

function pageSchema({ canonical, title, description }) {
  return {
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: title,
    description,
    inLanguage: "tr",
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#localbusiness` },
    breadcrumb: { "@id": `${canonical}#breadcrumb` }
  };
}

function defaultFaqs(service = null, city = null) {
  const serviceName = service?.name || "temizlik hizmeti";
  const cityName = city?.name || "Kıbrıs";
  return [
    {
      q: `${cityName} ${serviceName} için nasıl teklif alabilirim?`,
      a: "Sayfadaki formu doldurduğunuzda şehir, hizmet, tarih ve notunuz WhatsApp mesajına dönüştürülür. Ekibimiz talebinizi görüp kısa sürede dönüş yapar."
    },
    {
      q: "Sanu Temizlik hangi bölgelerde hizmet veriyor?",
      a: "Sanu Temizlik Lefkoşa merkezlidir; Lefkoşa, Girne, Gazi Mağusa, Güzelyurt ve çevre bölgelerde temizlik ve teknik servis talepleri alır."
    },
    {
      q: "Hizmet öncesinde hangi bilgileri paylaşmalıyım?",
      a: "Adres, tercih edilen tarih, hizmet türü, alan büyüklüğü ve varsa fotoğraf veya kısa video paylaşmanız planlamayı hızlandırır."
    }
  ];
}

function faqSchema(faqs, canonical) {
  return {
    "@type": "FAQPage",
    "@id": `${canonical}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a
      }
    }))
  };
}

function faqSection(faqs) {
  if (!faqs?.length) return "";
  return `
    <section class="bg-white py-16 sm:py-20" id="faq">
      <div class="mx-auto max-w-4xl px-4 lg:px-8">
        <p class="section-kicker">Sık Sorulan Sorular</p>
        <h2 class="mt-3 text-3xl font-black tracking-tight text-slate-950">Merak edilenler</h2>
        <div class="mt-8 grid gap-4">
          ${faqs.map((faq) => `<details class="surface p-5"><summary class="cursor-pointer text-lg font-black text-slate-950">${esc(faq.q)}</summary><p class="mt-3 leading-7 text-slate-600">${esc(faq.a)}</p></details>`).join("")}
        </div>
      </div>
    </section>`;
}

function schemaScript(items) {
  return `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@graph": items
  })}</script>`;
}

function layout({ title, description, keywords, canonical, depth = 0, body, extraHead = "", robots = "index,follow", faqs = defaultFaqs(), schema = [] }) {
  const structuredData = [
    localBusinessSchema(),
    webSiteSchema(),
    pageSchema({ canonical, title, description }),
    breadcrumbSchema(canonical, title),
    ...(faqs?.length ? [faqSchema(faqs, canonical)] : []),
    ...schema
  ];
  return `<!doctype html>
<html lang="tr">
<head>
${head({ title, description, keywords, canonical, depth, extra: `${schemaScript(structuredData)}${extraHead}`, robots })}
</head>
<body class="bg-slate-50">
  <a class="skip-link" href="#main">İçeriğe geç</a>
  ${header(depth)}
  <main id="main">
    ${body}
    ${faqSection(faqs)}
  </main>
  ${footer(depth)}
</body>
</html>`;
}

function homePage() {
  const body = `
    <section class="hero-cleaning min-h-[80vh] sm:min-h-[82vh]">
      <div class="hero-bg" aria-hidden="true">
        <video autoplay loop muted playsinline class="absolute inset-0 h-full w-full object-cover">
          <source src="/assets/video/hero.webm" type="video/webm">
        </video>
      </div>
      <div class="mx-auto flex min-h-[80vh] max-w-7xl items-center px-4 py-20 sm:min-h-[82vh] lg:px-8">
        <div class="max-w-3xl text-white">
          <p class="mb-4 text-sm font-extrabold uppercase tracking-[0.18em] text-sky-100">Kıbrıs’ta temiz pak hizmet - 2012’den beri</p>
          <h1 class="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">Temizliği bize bırakın,<br><span class="text-brand-400">siz keyfini yaşayın</span></h1>
          <p class="mt-6 max-w-2xl text-lg leading-8 text-sky-50">Eviniz, ofisiniz ya da villanız bir gün “keyfine bakarız ama önce bir temizlense” dediğinde biz tam orada oluruz. Lefkoşa, Girne, Gazi Mağusa ve Güzelyurt’ta temizlik işi için beklenti nettir: zamanında gelinsin, iş güzel yapılsın, arkada ferah bir alan kalsın. Sanu Temizlik de tam böyle çalışır; gerekirse kısa bir video alır, işi netleştirir, sonra temiz pak teslim eder.</p>
          <div class="mt-6 flex flex-wrap gap-3">
            <span class="hero-badge inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm">
              <i data-lucide="star" class="h-4 w-4 text-yellow-300"></i> 2012’de Kurulduk
            </span>
            <span class="hero-badge inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm" style="animation-delay:1.3s">
              <i data-lucide="map-pin" class="h-4 w-4 text-sky-200"></i> 4 Şehir · 16 Hizmet
            </span>
            <span class="inline-flex items-center gap-1.5 rounded-full bg-brand-800/40 px-3 py-1 text-xs font-semibold text-brand-100 ring-1 ring-inset ring-brand-100/20 backdrop-blur-sm sm:text-sm">
              <i data-lucide="shield-check" class="h-4 w-4" aria-hidden="true"></i> Güvenilir Planlama
            </span>
          </div>
          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <a class="btn-white" href="${whatsappUrl}" data-whatsapp-cta><i data-lucide="send" class="h-5 w-5"></i><span>WhatsApp’tan Teklif Al</span></a>
            <a class="btn-secondary" href="#services"><i data-lucide="sparkles" class="h-5 w-5"></i><span>Hizmetleri İncele</span></a>
          </div>
        </div>
      </div>
    </section>

    <section id="services" class="py-16 sm:py-20">
      <div class="mx-auto max-w-7xl px-4 lg:px-8">
        <div class="max-w-3xl seo-rich">
          <p class="section-kicker">Hizmetlerimiz</p>
          <h2 class="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Temizlik, düzenli bakım ve teknik servis işlerini biz toparlarız</h2>
          <p class="mt-4 text-lg leading-8 text-slate-600">Evin içi ferahlasın derseniz ${keywordLink("ev temizliği")} planlarıyla başlarız; iş yerinde düzen gerekiyorsa ${keywordLink("ofis temizliği")} için saatleri mesainize göre ayarlarız. Apartman ortak alanlarından hastane ve klinik temizliğine, mağaza temizliğinden dış cephe camlarına kadar tek tek usta aramanıza gerek kalmasın. ${keywordLink("kıbrıs temizlik şirketi")} ararken beklenti aslında nettir: zamanında gelinsin, iş güzel yapılsın, iletişim açık olsun. Biz de tam buna göre çalışırız.</p>
        </div>
        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">${serviceGrid(0)}</div>
      </div>
    </section>

    <section id="cities" class="bg-white py-16 sm:py-20">
      <div class="mx-auto max-w-7xl px-4 lg:px-8">
        <div class="max-w-3xl">
          <p class="section-kicker">Bölgeler</p>
          <h2 class="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Lefkoşa’dan Girne’ye, Mağusa’dan Güzelyurt’a kadar</h2>
          <p class="mt-4 text-lg leading-8 text-slate-600">Her bölgenin temposu başka. Lefkoşa’da ofis yoğunluğu, Girne’de villa ve işletme trafiği, Mağusa’da yeni teslim alanlar, Güzelyurt’ta düzenli bakım ihtiyacı öne çıkar. Bu yüzden her şehir için ayrı sayfalar hazırladık; aradığınız hizmete doğrudan ulaşın, WhatsApp’tan hızlıca konuşalım.</p>
        </div>
        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          ${cities.map((city) => `<a class="city-card block overflow-hidden bg-slate-50" href="${city.slug}/"><img src="${city.image}" alt="${city.title} bölge görseli" class="aspect-[16/10] w-full object-cover" loading="lazy"><div class="p-6"><h3 class="text-xl font-black text-brand-900">${city.title}</h3><p class="mt-3 text-sm leading-6 text-slate-600">${city.intro}</p><p class="mt-4 text-sm font-black text-brand-700">Tüm şehir hizmetlerini incele</p></div></a>`).join("")}
        </div>
      </div>
    </section>

    <section id="quote" class="py-16 sm:py-20">
      <div class="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div class="seo-rich">
          <p class="section-kicker">Servis Talebi</p>
          <h2 class="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">İşinizi anlatın, WhatsApp mesajınız hazır açılsın</h2>
          <p class="mt-4 text-lg leading-8 text-slate-600">Uzun uzun form doldurup cevap beklemeyesiniz diye talebinizi WhatsApp’a çeviriyoruz. Şehir, hizmet, tarih ve notunuzu yazın; mesaj otomatik hazırlansın, biz de size en kısa zamanda dönüş yapalım.</p>
          <img src="/assets/img/photo-1527515637462-cff94eecc1ac.jpg" alt="Profesyonel temizlik malzemeleri ve hijyen ekipmanı" class="mt-8 h-72 w-full rounded-lg object-cover" loading="lazy">
        </div>
        ${quoteForm()}
      </div>
    </section>

    <section id="about" class="bg-white py-16 sm:py-20">
      <div class="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <img src="/assets/img/photo-1600585154526-990dced4db0d.jpg" alt="Sanu Temizlik profesyonel temizlik ekibi çalışıyor" class="h-full min-h-80 w-full rounded-lg object-cover" loading="lazy">
        <div class="content-panel seo-rich">
          <p class="section-kicker">Hakkımızda</p>
          <h2 class="mt-3 text-3xl sm:text-4xl">2012’den beri Lefkoşa merkezli, sözüne sadık ekip</h2>
          <p class="mt-5">Sanu Temizlik ve Ticaret Ltd., Tahsin Yazıcı Sok. No:5 Çağlayan Lefkoşa / Kıbrıs adresinden Kıbrıs genelinde bireysel ve kurumsal müşterilere hizmet verir. Bizi arayanların çoğu “iş düzgün olsun, içimiz rahat etsin” der. Lefkoşa merkezli çalıştığımız için ${keywordLink("lefkoşa temizlik şirketi")} arayan müşterilere hızlı dönüş yaparız; Girne ve çevresinde talep olduğunda da programı netleştirip aynı özenle ilerleriz.</p>
          <h3 class="mt-8 text-2xl">Temizlik ve teknik servis aynı pratik hatta</h3>
          <p class="mt-4">Apartman merdiven temizliği, ofis, hastane, mağaza ve dış cephe cam temizliği gibi düzenli işler ile elektrik, su tesisatı, bakım onarım ve montaj gibi teknik servis ihtiyaçlarını aynı WhatsApp hattından konuşabilirsiniz. “Kimle görüşecektik?” diye uğraşmayın; önce yazın, beraber netleştirelim.</p>
        </div>
      </div>
    </section>`;

  return layout({
    title: "Sanu Temizlik ve Ticaret Ltd. | Kıbrıs Temizlik Şirketi",
    description: "Sanu Temizlik ve Ticaret Ltd. Lefkoşa merkezli Kıbrıs temizlik şirketi. Ev, ofis, apartman, hastane, mağaza, dış cephe cam, halı-koltuk yıkama ve teknik servis hizmetleri.",
    keywords: "lefkoşa temizlik şirketi, girne temizlik şirketi, kıbrıs temizlik şirketi, kktc temizlik şirketi, lefkoşa halı yıkama",
    canonical: `${siteUrl}/`,
    extraHead: `
  <meta name="google-site-verification" content="Lj-1Wy35qbeuNIiSG-NBXQt92yRDBOK0Tuxbi9webe0">`,
    schema: [
      itemListSchema("Sanu Temizlik Öne Çıkan Hizmetler", services.map((service) => ({
        name: service.name,
        url: `${siteUrl}/hizmetler/${service.slug}/`
      })), `${siteUrl}/`)
    ],
    body
  });
}

function servicesIndexPage() {
  const body = `
    <section class="bg-white py-16 sm:py-20">
      <div class="mx-auto max-w-7xl px-4 lg:px-8">
        <div class="max-w-3xl seo-rich">
          <p class="section-kicker">Hizmetlerimiz</p>
          <h1 class="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Temizlik ve Teknik Servis Hizmetleri</h1>
          <p class="mt-5 text-lg leading-8 text-slate-600">Temizlik işi sadece silip süpürmek değildir; alanın havasını değiştirmek, iş yerinde güven vermek, evde ferahlık yaratmaktır. Kıbrıs genelinde düzenli ve güvenilir destek arayanlar ${keywordLink("kıbrıs temizlik şirketi", 1)} sayfasından tüm hizmetlere ulaşabilir; halı ve koltuk gibi kumaş yüzeylerde ise ${keywordLink("lefkoşa halı yıkama", 1)} taleplerini ayrıca değerlendiririz.</p>
        </div>
        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">${serviceGrid(1)}</div>
      </div>
    </section>`;

  return layout({
    title: "Hizmetlerimiz | Sanu Temizlik ve Ticaret Ltd.",
    description: "Sanu Temizlik hizmetleri: ev temizliği, ofis temizliği, apartman merdiven temizliği, hastane, mağaza, dış cephe cam, haşere ilaçlama, halı-koltuk yıkama ve teknik servis.",
    keywords: "kıbrıs temizlik şirketi, kktc temizlik şirketi, lefkoşa temizlik şirketi, girne temizlik şirketi",
    canonical: `${siteUrl}/hizmetler/`,
    depth: 1,
    schema: [
      itemListSchema("Sanu Temizlik Hizmet Listesi", services.map((service) => ({
        name: service.name,
        url: `${siteUrl}/hizmetler/${service.slug}/`
      })), `${siteUrl}/hizmetler/`)
    ],
    body
  });
}

function cityPage(city) {
  const body = `
    <section class="bg-white py-16 sm:py-20">
      <div class="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[1fr_0.8fr] lg:px-8">
        <div class="seo-rich">
          <p class="section-kicker">${city.name}</p>
          <h1 class="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">${city.title}</h1>
          <p class="mt-5 text-lg leading-8 text-slate-600">${city.intro} ${keywordLink(city.keyword, 1, city)} ararken insanın beklediği şey aslında çok basit: zamanında gelen, ne yapacağını bilen ve iş bitince arkasında ferah bir alan bırakan ekip. Sanu Temizlik tam da bu anlayışla çalışır.</p>
          <p class="mt-4 text-lg leading-8 text-slate-600">Hizmet bölgeleri: ${city.districts}. Ev için detaylı temizlik gerekiyorsa ${keywordLink("ev temizliği", 1, city)} sayfasına, işletme düzeni için planlı destek istiyorsanız ${keywordLink("ofis temizliği", 1, city)} hizmetine geçebilirsiniz. Bölgenize uygun işi seçin, WhatsApp’tan detayları konuşalım.</p>
          <a class="btn-primary mt-8" href="${whatsappUrl}" data-whatsapp-cta><i data-lucide="send" class="h-5 w-5"></i><span>Bu Şehir İçin Teklif Al</span></a>
        </div>
        <img src="${city.image}" alt="${city.title} bölge ve temizlik hizmeti" class="h-full min-h-80 w-full rounded-lg object-cover" loading="lazy">
      </div>
    </section>
    <section class="py-16">
      <div class="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 class="text-3xl font-black text-slate-950">${city.name} Hizmetleri</h2>
        <p class="mt-3 max-w-3xl text-lg leading-8 text-slate-600">${city.name} içinde hangi hizmete ihtiyacınız varsa doğrudan ilgili sayfaya geçebilirsiniz. Her sayfada kapsamı, uygun kullanım alanlarını ve WhatsApp teklif formunu bulacaksınız.</p>
        <div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">${serviceGrid(1, city)}</div>
      </div>
    </section>`;

  return layout({
    title: `${city.title} | Sanu Temizlik ve Ticaret Ltd.`,
    description: `${city.title} Sanu Temizlik: ev, ofis, apartman merdiven, hastane, mağaza, dış cephe cam, halı-koltuk yıkama, haşere ilaçlama ve teknik servis.`,
    keywords: `${city.keyword}, kıbrıs temizlik şirketi, kktc temizlik şirketi, lefkoşa halı yıkama`,
    canonical: `${siteUrl}/${city.slug}/`,
    depth: 1,
    schema: [
      itemListSchema(`${city.name} Temizlik Hizmetleri`, services.map((service) => ({
        name: `${city.name} ${service.name}`,
        url: `${siteUrl}/${city.slug}/${service.slug}/`
      })), `${siteUrl}/${city.slug}/`)
    ],
    body
  });
}

function serviceContent(service, city = null) {
  const cityText = city ? `${city.name} ` : "";
  const cityKeyword = city ? city.keyword : "kıbrıs temizlik şirketi";
  return `
    <section class="service-hero py-20 text-white" style="--service-image: url('${service.image}')">
      <div class="mx-auto max-w-7xl px-4 lg:px-8">
        <div class="max-w-3xl">
          <p class="mb-4 text-sm font-extrabold uppercase tracking-[0.18em] text-sky-100">${city ? city.name : service.category}</p>
          <h1 class="text-4xl font-black leading-tight sm:text-5xl">${cityText}${service.name}</h1>
          <p class="mt-5 text-lg leading-8 text-sky-50">${service.short} İhtiyacınızı anlatın, gerisini birlikte netleştirelim; aceleye getirmeden, düzgün ve güven veren bir plan çıkaralım.</p>
          <a class="btn-white mt-8" href="${whatsappUrl}" data-whatsapp-cta><i data-lucide="message-circle" class="h-5 w-5"></i><span>WhatsApp’tan Teklif Al</span></a>
        </div>
      </div>
    </section>

    <section class="bg-white py-16 sm:py-20">
      <div class="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[1fr_0.8fr] lg:px-8">
        <article class="content-panel seo-rich">
          <p class="section-kicker">${service.category}</p>
          <h2 class="mt-3 text-3xl sm:text-4xl">${cityText}${service.name} için temiz, net ve iç rahatlatan hizmet</h2>
          <p class="mt-5">${localTone(city)}</p>
          <p class="mt-5">${serviceWarmIntro(service, city)}</p>
          <p class="mt-5">${serviceSeoPhrase(service, city)}</p>
          <h3 class="mt-8 text-2xl">Neler yapıyoruz?</h3>
          <ul class="mt-6 grid gap-4">
            ${service.details.map((item) => `<li class="flex gap-3 rounded-lg border border-sky-100 bg-slate-50 p-4"><i data-lucide="check-circle-2" class="mt-1 h-5 w-5 shrink-0 text-brand-700"></i><span class="leading-7 text-slate-700">${item}</span></li>`).join("")}
          </ul>
          <div class="mt-8 grid gap-5 md:grid-cols-2">
            <div class="rounded-lg border border-sky-100 bg-slate-50 p-5">
              <h3 class="text-xl font-black text-slate-950">Kimler için uygun?</h3>
              <p class="mt-3">${serviceFor(service)}</p>
            </div>
            <div class="rounded-lg border border-sky-100 bg-slate-50 p-5">
              <h3 class="text-xl font-black text-slate-950">Nasıl ilerleriz?</h3>
              <p class="mt-3">Önce WhatsApp’tan adres, tarih, alan bilgisi ve varsa fotoğraf alırız. Sonra işi açık açık konuşur, uygun zamanı belirler ve ekibi ona göre hazırlarız. Kısacası “olur, bakarız” değil; net plan, net iletişim.</p>
            </div>
          </div>
          <h3 class="mt-8 text-2xl">Yerel aramada doğru hizmete ulaşın</h3>
          <p class="mt-4">${serviceSearchSentence(service, city)} ${city ? `${city.name} için hizmet detayını formdan gönderdiğinizde WhatsApp mesajınız hazır şekilde açılır.` : "Şehir seçerek talebinizi daha doğru yönlendirebilirsiniz."}</p>
        </article>
        <aside>
          <img src="${service.image}" alt="${cityText}${service.name} için kaliteli hizmet görseli" class="aspect-[4/3] w-full rounded-lg object-cover" loading="lazy">
          <div class="surface mt-6 p-5">
            <h2 class="text-xl font-black text-slate-950">Hızlı Talep Formu</h2>
            <p class="mt-2 text-sm leading-6 text-slate-600">Formu gönderdiğinizde WhatsApp mesajı otomatik hazırlanır.</p>
            <div class="mt-5">${quoteForm({ citySlug: city?.slug || "", serviceSlug: service.slug })}</div>
          </div>
        </aside>
      </div>
    </section>

    <section class="py-16">
      <div class="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 class="text-3xl font-black text-slate-950">İlgili Hizmetler</h2>
        <div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          ${services.filter((item) => item.slug !== service.slug).slice(0, 4).map((item) => serviceCard(item, city ? 2 : 2, city)).join("")}
        </div>
      </div>
    </section>`;
}

function serviceSchema(service, city = null) {
  const url = city ? `${siteUrl}/${city.slug}/${service.slug}/` : `${siteUrl}/hizmetler/${service.slug}/`;
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: city ? `${city.name} ${service.name}` : service.name,
    description: service.short,
    serviceType: service.category,
    provider: { "@id": `${siteUrl}/#localbusiness` },
    areaServed: city ? { "@type": "City", name: city.name } : cities.map((item) => ({ "@type": "City", name: item.name })),
    url,
    image: absoluteImage(service.image),
    offers: {
      "@type": "Offer",
      url,
      availability: "https://schema.org/InStock",
      priceCurrency: "TRY",
      seller: { "@id": `${siteUrl}/#localbusiness` }
    }
  };
}

function itemListSchema(name, items, canonical) {
  return {
    "@type": "ItemList",
    "@id": `${canonical}#itemlist`,
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url
    }))
  };
}

function servicePage(service) {
  return layout({
    title: `${service.name} | Sanu Temizlik ve Ticaret Ltd.`,
    description: `${service.name} hizmeti için Sanu Temizlik’ten WhatsApp ile hızlı teklif alın. Lefkoşa, Girne, Gazi Mağusa ve Güzelyurt’ta profesyonel hizmet.`,
    keywords: `${service.keywords.join(", ")}, lefkoşa temizlik şirketi, girne temizlik şirketi, kıbrıs temizlik şirketi, kktc temizlik şirketi`,
    canonical: `${siteUrl}/hizmetler/${service.slug}/`,
    depth: 2,
    faqs: defaultFaqs(service),
    schema: [serviceSchema(service)],
    body: serviceContent(service)
  });
}

function cityServicePage(city, service) {
  return layout({
    title: `${city.name} ${service.name} | Sanu Temizlik ve Ticaret Ltd.`,
    description: `${city.name} ${service.name} hizmeti için WhatsApp ile hızlı teklif alın. ${city.title} Sanu Temizlik; profesyonel, düzenli ve SEO uyumlu yerel hizmet sayfası.`,
    keywords: `${city.keyword}, ${city.name.toLowerCase()} ${service.name.toLowerCase()}, ${service.keywords.join(", ")}, kıbrıs temizlik şirketi, kktc temizlik şirketi`,
    canonical: `${siteUrl}/${city.slug}/${service.slug}/`,
    depth: 2,
    faqs: defaultFaqs(service, city),
    schema: [serviceSchema(service, city)],
    body: serviceContent(service, city)
  });
}

function contactPage() {
  const body = `
    <section class="bg-white py-16 sm:py-20">
      <div class="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div class="seo-rich">
          <p class="section-kicker">İletişim</p>
          <h1 class="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Sanu Temizlik İletişim</h1>
          <p class="mt-5 text-lg leading-8 text-slate-600">Aklınızdaki işi anlatın, biz birlikte netleştirelim. Sanu Temizlik ve Ticaret Ltd. için teklif, randevu ve servis taleplerinizi iletişim formuyla doğrudan WhatsApp’a aktarabilirsiniz. Lefkoşa tarafında ekip arıyorsanız ${keywordLink("Lefkoşa temizlik şirketi", 1)} sayfasına, Girne’de hizmet planlamak istiyorsanız ${keywordLink("Girne temizlik şirketi", 1)} bağlantısına göz atabilirsiniz. Halı ve koltuk gibi kumaş yüzey taleplerini de fotoğraf veya kısa video ile hızlıca değerlendiririz.</p>
          <div class="mt-8 grid gap-4">
            <a class="surface flex items-center gap-4 p-4" href="tel:+905338828989"><span class="icon-tile"><i data-lucide="phone" class="h-5 w-5"></i></span><span><strong class="block text-slate-950">Telefon / WhatsApp</strong>+90 533 882 89 89</span></a>
            <a class="surface flex items-center gap-4 p-4" href="mailto:info@sanutemizlik.com"><span class="icon-tile"><i data-lucide="mail" class="h-5 w-5"></i></span><span><strong class="block text-slate-950">E-posta</strong>info@sanutemizlik.com</span></a>
            <div class="surface flex items-center gap-4 p-4"><span class="icon-tile"><i data-lucide="map-pin" class="h-5 w-5"></i></span><span><strong class="block text-slate-950">Adres</strong>Tahsin Yazıcı Sok. No:5 Çağlayan Lefkoşa / Kıbrıs</span></div>
          </div>
        </div>
        ${quoteForm({ depth: 1, contact: true })}
      </div>
    </section>
    <section class="pb-16">
      <div class="mx-auto max-w-7xl px-4 lg:px-8">
        <div class="surface overflow-hidden">
          <iframe class="map-frame" title="Sanu Temizlik Google Maps haritası" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Sanu%20Temizlik%20Tahsin%20Yaz%C4%B1c%C4%B1%20Sok.%20No%3A5%20%C3%87a%C4%9Flayan%20Lefko%C5%9Fa%20K%C4%B1br%C4%B1s&output=embed"></iframe>
        </div>
      </div>
    </section>`;

  return layout({
    title: "İletişim | Sanu Temizlik ve Ticaret Ltd.",
    description: "Sanu Temizlik iletişim sayfası. Telefon, WhatsApp, e-posta, adres ve Google Maps haritası. Formu doldurun, WhatsApp teklif mesajı otomatik açılsın.",
    keywords: "sanu temizlik iletişim, lefkoşa temizlik şirketi, kıbrıs temizlik şirketi, kktc temizlik şirketi",
    canonical: `${siteUrl}/iletisim/`,
    depth: 1,
    body
  });
}

function landingPage() {
  return `<!doctype html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Sanu Temizlik WhatsApp Teklif</title>
  <meta name="robots" content="noindex,nofollow">
  <meta name="description" content="Sanu Temizlik WhatsApp teklif açılış sayfası.">
  <link rel="icon" href="../../assets/img/sanu-temizlik-logo.png">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="../../assets/css/styles.css">
  <script defer src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
  <script defer src="../../assets/js/main.js"></script>
</head>
<body class="bg-slate-50" data-auto-whatsapp="true">
  <main class="grid min-h-screen place-items-center px-4">
    <section class="mx-auto max-w-2xl text-center">
      <img src="../../assets/img/sanu-temizlik-logo.png" alt="Sanu Temizlik ve Ticaret Ltd. logosu" class="mx-auto h-20 w-auto">
      <h1 class="mt-8 text-4xl font-black tracking-tight text-slate-950">Sanu Temizlik WhatsApp Teklif</h1>
      <p class="mt-4 text-lg leading-8 text-slate-600">WhatsApp teklif hattına 10 saniye içinde yönlendiriliyorsunuz.</p>
      <a class="btn-primary mt-8" href="${whatsappUrl}" data-whatsapp-cta><i data-lucide="message-circle" class="h-5 w-5"></i><span>WhatsApp’ı Aç</span></a>
    </section>
  </main>
</body>
</html>`;
}

function humanSitemapPage() {
  const body = `
    <section class="bg-slate-50 py-16 sm:py-20">
      <div class="mx-auto max-w-7xl px-4 lg:px-8">
        <div class="max-w-3xl seo-rich">
          <p class="section-kicker">Site Haritası</p>
          <h1 class="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Sanu Temizlik Site Haritası</h1>
          <p class="mt-5 text-lg leading-8 text-slate-600">Aradığınız hizmete en kısa yoldan ulaşmanız için bütün şehir ve hizmet sayfalarını burada topladık. Lefkoşa’da temizlik ekibi arıyorsanız ${keywordLink("lefkoşa temizlik şirketi", 1)} bağlantısından başlayabilir, Girne bölgesi için ${keywordLink("girne temizlik şirketi", 1)} sayfasına geçebilirsiniz. Kumaş yüzeylerde ise ${keywordLink("lefkoşa halı yıkama", 1)} içeriği size daha doğru yön verir.</p>
        </div>
        <div class="mt-10 grid gap-6 lg:grid-cols-2">
          <section class="surface p-6">
            <h2 class="text-2xl font-black text-slate-950">Ana Sayfalar</h2>
            <ul class="mt-5 grid gap-3 text-slate-700">
              <li><a class="sitemap-link" href="../index.html">Ana Sayfa</a></li>
              <li><a class="sitemap-link" href="../hizmetler/">Hizmetler</a></li>
              <li><a class="sitemap-link" href="../iletisim/">İletişim</a></li>
              <li><a class="sitemap-link" href="../sitemap.xml">XML Site Haritası</a></li>
            </ul>
          </section>
          <section class="surface p-6">
            <h2 class="text-2xl font-black text-slate-950">Şehir Sayfaları</h2>
            <ul class="mt-5 grid gap-3 text-slate-700">
              ${cities.map((city) => `<li><a class="sitemap-link" href="../${city.slug}/">${city.title}</a></li>`).join("")}
            </ul>
          </section>
        </div>
        <section class="mt-6 surface p-6">
          <h2 class="text-2xl font-black text-slate-950">Hizmet Sayfaları</h2>
          <div class="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            ${services.map((service) => `<a class="sitemap-link" href="../hizmetler/${service.slug}/">${service.name}</a>`).join("")}
          </div>
        </section>
        <section class="mt-6 surface p-6">
          <h2 class="text-2xl font-black text-slate-950">Şehre Göre Popüler Hizmetler</h2>
          <div class="mt-5 grid gap-6 lg:grid-cols-4">
            ${cities.map((city) => `<div><h3 class="font-black text-brand-900">${city.name}</h3><ul class="mt-3 grid gap-2 text-sm">${services.slice(0, 8).map((service) => `<li><a class="sitemap-link" href="../${city.slug}/${service.slug}/">${city.name} ${service.name}</a></li>`).join("")}</ul></div>`).join("")}
          </div>
        </section>
      </div>
    </section>`;

  return layout({
    title: "Site Haritası | Sanu Temizlik ve Ticaret Ltd.",
    description: "Sanu Temizlik site haritası. Şehir, hizmet, iletişim ve SEO uyumlu temizlik hizmetleri sayfalarına hızlı ulaşın.",
    keywords: "site haritası, lefkoşa temizlik şirketi, girne temizlik şirketi, kıbrıs temizlik şirketi, lefkoşa halı yıkama",
    canonical: `${siteUrl}/site-haritasi/`,
    depth: 1,
    faqs: [],
    body
  });
}

function notFoundPage() {
  const body = `
    <section class="page-404 bg-slate-50 py-16 sm:py-20">
      <div class="mx-auto max-w-5xl px-4 text-center lg:px-8">
        <span class="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-md bg-brand-100 text-brand-800">
          <i data-lucide="sparkles" class="h-8 w-8" aria-hidden="true"></i>
        </span>
        <p class="mt-8 text-sm font-extrabold uppercase tracking-[0.18em] text-brand-700">404</p>
        <h1 class="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Temizlik sırasında bu sayfayı silip süpürmüşüz :)</h1>
        <p class="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">Aşağıdaki menüden yeni içeriklerimize göz atabilir veya <a class="keyword-link" href="site-haritasi/"><strong>Site Haritası</strong></a> bağlantısından aradığınız sayfayı bulabilirsiniz.</p>
        <nav class="mt-8 flex flex-wrap justify-center gap-3" aria-label="404 hızlı menü">
          <a class="btn-secondary" href="index.html">Ana Sayfa</a>
          <a class="btn-secondary" href="hizmetler/">Hizmetler</a>
          <a class="btn-secondary" href="index.html#cities">Bölgeler</a>
          <a class="btn-secondary" href="index.html#about">Hakkımızda</a>
          <a class="btn-secondary" href="iletisim/">İletişim</a>
        </nav>
        <div class="mx-auto mt-10 grid max-w-4xl gap-3 text-left sm:grid-cols-2 lg:grid-cols-3">
          <a class="surface p-4" href="lefkosa/"><span class="keyword-link"><strong>Lefkoşa temizlik şirketi</strong></span></a>
          <a class="surface p-4" href="girne/"><span class="keyword-link"><strong>Girne temizlik şirketi</strong></span></a>
          <a class="surface p-4" href="hizmetler/"><span class="keyword-link"><strong>Kıbrıs temizlik şirketi</strong></span></a>
          <a class="surface p-4" href="hizmetler/"><span class="keyword-link"><strong>KKTC temizlik şirketi</strong></span></a>
          <a class="surface p-4" href="lefkosa/hali-yikama/"><span class="keyword-link"><strong>Lefkoşa halı yıkama</strong></span></a>
          <a class="surface p-4" href="hizmetler/ofis-temizligi/"><span class="keyword-link"><strong>Ofis temizliği</strong></span></a>
        </div>
      </div>
    </section>`;

  return layout({
    title: "404 Sayfa Bulunamadı | Sanu Temizlik ve Ticaret Ltd.",
    description: "Aradığınız sayfa bulunamadı. Sanu Temizlik site haritası, şehir ve hizmet bağlantılarıyla doğru sayfaya ulaşın.",
    keywords: "404, site haritası, lefkoşa temizlik şirketi, kıbrıs temizlik şirketi, lefkoşa halı yıkama",
    canonical: `${siteUrl}/404.html`,
    robots: "noindex,follow",
    faqs: [],
    body
  });
}

function sitemap() {
  const coreUrls = [
    ["/", "1.0"],
    ["/hizmetler/", "0.95"],
    ["/iletisim/", "0.9"],
    ["/site-haritasi/", "0.75"],
    ...cities.map((city) => [`/${city.slug}/`, "0.9"]),
    ...services.map((service) => [`/hizmetler/${service.slug}/`, "0.88"]),
    ...cities.flatMap((city) => services.map((service) => [`/${city.slug}/${service.slug}/`, "0.86"]))
  ];
  const localizedUrls = ["en", "ru"].flatMap((lang) => [
    [`/${lang}/`, "0.84"],
    [`/${lang}/hizmetler/`, "0.8"],
    [`/${lang}/iletisim/`, "0.76"],
    ...cities.map((city) => [`/${lang}/${city.slug}/`, "0.78"]),
    ...services.map((service) => [`/${lang}/hizmetler/${service.slug}/`, "0.75"]),
    ...cities.flatMap((city) => services.map((service) => [`/${lang}/${city.slug}/${service.slug}/`, "0.72"]))
  ]);
  const urls = [...coreUrls, ...localizedUrls];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([path, priority]) => `  <url>
    <loc>${siteUrl}${path}</loc>
    <lastmod>2026-07-13</lastmod>
    <priority>${priority}</priority>
  </url>`).join("\n")}
</urlset>`;
}

function templatePage() {
  return `<!--
Reusable nested city/service template. The live site is generated from scripts/generate-site.mjs.
To add a service or city, edit the data arrays in that script and run:
node scripts/generate-site.mjs
-->`;
}

ensureFile("index.html", homePage());
ensureFile("hizmetler/index.html", servicesIndexPage());
ensureFile("iletisim/index.html", contactPage());
ensureFile("site-haritasi/index.html", humanSitemapPage());
ensureFile("404.html", notFoundPage());
ensureFile("landing/whatsapp/index.html", landingPage());
ensureFile("templates/city-service.html", templatePage());

for (const service of services) {
  ensureFile(join("hizmetler", service.slug, "index.html"), servicePage(service));
}

for (const city of cities) {
  ensureFile(join(city.slug, "index.html"), cityPage(city));
  for (const service of services) {
    ensureFile(join(city.slug, service.slug, "index.html"), cityServicePage(city, service));
  }
}

ensureFile("robots.txt", `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`);
ensureFile("sitemap.xml", sitemap());

console.log(`Generated ${1 + 1 + 1 + cities.length + services.length + cities.length * services.length} SEO pages.`);
