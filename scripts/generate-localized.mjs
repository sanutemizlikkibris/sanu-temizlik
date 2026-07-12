import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const siteUrl = "https://sanutemizlik.com";
const whatsappUrl = "http://wa.me/+905338828989";

const cities = [
  {
    slug: "lefkosa",
    trName: "Lefkoşa",
    enName: "Nicosia",
    ruName: "Никосия",
    enTitle: "Nicosia Cleaning Company",
    ruTitle: "Клининговая компания в Никосии",
    enKeyword: "Nicosia cleaning company",
    ruKeyword: "уборка Никосия",
    enIntro: "In Nicosia, homes, offices and apartment blocks often need a reliable team that can arrive on time and work neatly around a busy day.",
    ruIntro: "В Никосии домам, офисам и жилым комплексам часто нужна команда, которая приезжает вовремя и аккуратно работает в удобное для клиента время.",
    enDistricts: "Çağlayan, Gönyeli, Küçük Kaymaklı, Ortaköy, Hamitköy and nearby Nicosia districts",
    ruDistricts: "Чаглаян, Гёняли, Кючюк-Каймаклы, Ортакёй, Хамиткёй и ближайшие районы Никосии",
    image: "/assets/img/photo-1543953504-20a65fdbca90.jpg"
  },
  {
    slug: "girne",
    trName: "Girne",
    enName: "Kyrenia",
    ruName: "Кирения",
    enTitle: "Kyrenia Cleaning Company",
    ruTitle: "Клининговая компания в Кирении",
    enKeyword: "Kyrenia cleaning company",
    ruKeyword: "уборка Кирения",
    enIntro: "Kyrenia has its own rhythm: villas, holiday homes, shops and offices all need cleaning that is planned with the season and the working day in mind.",
    ruIntro: "У Кирении свой ритм: виллы, апартаменты, магазины и офисы требуют уборки, которую удобно планировать с учётом сезона и графика работы.",
    enDistricts: "Kyrenia centre, Alsancak, Lapta, Ozanköy, Çatalköy and surrounding areas",
    ruDistricts: "центр Кирении, Алсанджак, Лапта, Озанкёй, Чаталкёй и близлежащие районы",
    image: "/assets/img/photo-1543326162-d961e0f06f52.jpg"
  },
  {
    slug: "gazi-magusa",
    trName: "Gazi Mağusa",
    enName: "Famagusta",
    ruName: "Фамагуста",
    enTitle: "Famagusta Cleaning Company",
    ruTitle: "Клининговая компания в Фамагусте",
    enKeyword: "Famagusta cleaning company",
    ruKeyword: "уборка Фамагуста",
    enIntro: "For newly delivered flats, offices, shops and busy family homes in Famagusta, a clear cleaning plan makes the whole job calmer and faster.",
    ruIntro: "Для новых квартир, офисов, магазинов и семейных домов в Фамагусте понятный план уборки делает работу спокойнее, быстрее и качественнее.",
    enDistricts: "Famagusta centre, Yeniboğaziçi, Salamis, Tuzla and nearby areas",
    ruDistricts: "центр Фамагусты, Енибогазичи, Саламис, Тузла и близлежащие районы",
    image: "/assets/img/photo-1560943260-264fcf24c43d.jpg"
  },
  {
    slug: "guzelyurt",
    trName: "Güzelyurt",
    enName: "Morphou / Güzelyurt",
    ruName: "Гюзельюрт",
    enTitle: "Güzelyurt Cleaning Company",
    ruTitle: "Клининговая компания в Гюзельюрте",
    enKeyword: "Güzelyurt cleaning company",
    ruKeyword: "уборка Гюзельюрт",
    enIntro: "In Güzelyurt, the best cleaning service is steady, punctual and easy to speak to. Sanu keeps the process simple from the first WhatsApp message.",
    ruIntro: "В Гюзельюрте особенно ценят стабильность, пунктуальность и понятное общение. Sanu делает процесс простым уже с первого сообщения в WhatsApp.",
    enDistricts: "Güzelyurt centre, Lefke, Gemikonağı and surrounding areas",
    ruDistricts: "центр Гюзельюрта, Лефке, Гемиконагы и близлежащие районы",
    image: "/assets/img/photo-1549488344-1f9b8d2bd1f3.jpg"
  }
];

const services = [
  {
    slug: "ev-temizligi",
    trName: "Ev Temizliği",
    icon: "home",
    image: "/assets/img/photo-1581578731548-c64695cc6952.jpg",
    enName: "Home Cleaning",
    ruName: "Уборка дома",
    enCategory: "Cleaning Services",
    ruCategory: "Клининговые услуги",
    enShort: "Detailed home cleaning for kitchens, bathrooms, living rooms and everyday family spaces.",
    ruShort: "Детальная уборка кухни, ванной, гостиной и жилых зон для чистого и свежего дома.",
    enDetails: ["Kitchen surfaces, cupboards, sinks and high-touch areas are cleaned carefully.", "Bathrooms, toilets, taps, showers and floors are treated with hygiene in mind.", "One-off, move-in, move-out and regular weekly home cleaning can be arranged."],
    ruDetails: ["Аккуратно очищаем кухонные поверхности, фасады шкафов, мойки и зоны частого контакта.", "Ванные комнаты, санузлы, смесители, душевые зоны и полы убираются с акцентом на гигиену.", "Можно заказать разовую уборку, уборку перед/после переезда или регулярный график."],
    enKeywords: ["home cleaning Cyprus", "cleaning company in Cyprus", "North Cyprus cleaning services"],
    ruKeywords: ["уборка дома Кипр", "клининговая компания на Кипре", "клининг Северный Кипр"]
  },
  {
    slug: "ofis-temizligi",
    trName: "Ofis Temizliği",
    icon: "building-2",
    image: "/assets/img/photo-1497366216548-37526070297c.jpg",
    enName: "Office Cleaning",
    ruName: "Уборка офисов",
    enCategory: "Corporate Cleaning",
    ruCategory: "Корпоративная уборка",
    enShort: "Planned office cleaning for desks, meeting rooms, shared areas and daily workplace hygiene.",
    ruShort: "Плановая уборка рабочих мест, переговорных, общих зон и офисной гигиены.",
    enDetails: ["Desks, door handles, shared devices and contact points are cleaned on a practical schedule.", "Service can be arranged before work, after work or at a time that suits your team.", "Suitable for offices, agencies, call centres, clinics and professional workplaces."],
    ruDetails: ["Столы, дверные ручки, общая техника и контактные поверхности очищаются по удобному графику.", "Уборку можно организовать до работы, после работы или в согласованное время.", "Подходит для офисов, агентств, колл-центров, клиник и рабочих пространств."],
    enKeywords: ["office cleaning Cyprus", "commercial cleaning North Cyprus", "cleaning company in Cyprus"],
    ruKeywords: ["уборка офисов Кипр", "коммерческий клининг Северный Кипр", "клининговая компания на Кипре"]
  },
  {
    slug: "insaat-sonrasi-temizlik",
    trName: "İnşaat Sonrası Temizlik",
    icon: "hard-hat",
    image: "/assets/img/photo-1504917595217-d4dc5ebe6122.jpg",
    enName: "Post-Construction Cleaning",
    ruName: "Уборка после строительства",
    enCategory: "Specialist Cleaning",
    ruCategory: "Специализированная уборка",
    enShort: "After-builders cleaning for renovation dust, paint marks and newly delivered properties.",
    ruShort: "Уборка после ремонта и строительства: пыль, следы краски и подготовка помещения к использованию.",
    enDetails: ["Fine dust, paint residue, window edges and floor dirt are handled step by step.", "Ideal for flats, villas, offices and shops after renovation or handover.", "The scope is planned by size, dust level and delivery deadline."],
    ruDetails: ["Мелкая пыль, следы краски, зоны вокруг окон и загрязнения пола убираются поэтапно.", "Подходит для квартир, вилл, офисов и магазинов после ремонта или сдачи объекта.", "Объём работ планируется по площади, уровню загрязнения и срокам."],
    enKeywords: ["post construction cleaning Cyprus", "after builders cleaning North Cyprus", "cleaning company in Cyprus"],
    ruKeywords: ["уборка после ремонта Кипр", "уборка после строительства Северный Кипр", "клининговая компания на Кипре"]
  },
  {
    slug: "mermer-cilalama",
    trName: "Mermer Cilalama",
    icon: "gem",
    image: "/assets/img/photo-1600566752355-35792bedcfea.jpg",
    enName: "Marble Polishing",
    ruName: "Полировка мрамора",
    enCategory: "Floor Care",
    ruCategory: "Уход за полами",
    enShort: "Professional marble floor care for shine, surface improvement and a fresher finish.",
    ruShort: "Профессиональный уход за мраморными полами: блеск, обновление поверхности и аккуратный результат.",
    enDetails: ["We assess dullness, traffic marks and the required finish before starting.", "Equipment and method are selected according to the floor condition.", "Suitable for apartment entrances, villas, offices, shops and commercial floors."],
    ruDetails: ["Перед началом оцениваем матовость, следы эксплуатации и желаемый уровень блеска.", "Метод и оборудование подбираются по состоянию поверхности.", "Подходит для подъездов, вилл, офисов, магазинов и коммерческих помещений."],
    enKeywords: ["marble polishing Cyprus", "floor care North Cyprus", "cleaning company in Cyprus"],
    ruKeywords: ["полировка мрамора Кипр", "уход за полами Северный Кипр", "клининговая компания на Кипре"]
  },
  {
    slug: "hasere-ilaclama",
    trName: "Haşere İlaçlama",
    icon: "shield-check",
    image: "/assets/img/photo-1584820927498-cafe2c1ba93b.jpg",
    enName: "Pest Control",
    ruName: "Дезинсекция",
    enCategory: "Pest Control",
    ruCategory: "Pest control",
    enShort: "Planned pest control support for homes, offices, restaurants, stores and shared areas.",
    ruShort: "Плановая дезинсекция для домов, офисов, ресторанов, магазинов и общих зон.",
    enDetails: ["Risk points such as kitchens, storage rooms, basements and shared areas are reviewed.", "Before treatment, usage details and safety expectations are clarified.", "Suitable for homes, restaurants, offices, shops and apartment common areas."],
    ruDetails: ["Проверяем зоны риска: кухни, склады, подвалы и общие помещения.", "Перед обработкой уточняем использование помещения и требования безопасности.", "Подходит для домов, ресторанов, офисов, магазинов и общих зон домов."],
    enKeywords: ["pest control Cyprus", "pest control North Cyprus", "cleaning company in Cyprus"],
    ruKeywords: ["дезинсекция Кипр", "pest control Северный Кипр", "клининговая компания на Кипре"]
  },
  {
    slug: "koltuk-yikama",
    trName: "Koltuk Yıkama",
    icon: "sofa",
    image: "/assets/img/photo-1563453392212-326f5e854473.jpg",
    enName: "Sofa Cleaning",
    ruName: "Чистка диванов",
    enCategory: "Fabric Care",
    ruCategory: "Уход за тканями",
    enShort: "On-site sofa and upholstery cleaning for homes, offices, clinics and waiting areas.",
    ruShort: "Выездная чистка диванов и мягкой мебели для домов, офисов, клиник и зон ожидания.",
    enDetails: ["Fabric type, stains and usage level are checked before the service is planned.", "Suitable for home sofas, office seating, clinics and retail waiting corners.", "Can be requested together with carpet cleaning or general cleaning."],
    ruDetails: ["Перед работой учитываем тип ткани, пятна и интенсивность использования.", "Подходит для домашних диванов, офисных зон ожидания, клиник и магазинов.", "Можно заказать вместе с чисткой ковров или общей уборкой."],
    enKeywords: ["sofa cleaning Cyprus", "upholstery cleaning North Cyprus", "carpet cleaning Nicosia"],
    ruKeywords: ["чистка диванов Кипр", "чистка мягкой мебели Северный Кипр", "чистка ковров Никосия"]
  },
  {
    slug: "hali-yikama",
    trName: "Halı Yıkama",
    icon: "scan",
    image: "/assets/img/photo-1513694203232-719a280e022f.jpg",
    enName: "Carpet Cleaning",
    ruName: "Чистка ковров",
    enCategory: "Fabric Care",
    ruCategory: "Уход за тканями",
    enShort: "Carpet and rug cleaning support with fast WhatsApp planning from Nicosia.",
    ruShort: "Чистка ковров и ковровых покрытий с быстрым согласованием через WhatsApp из Никосии.",
    enDetails: ["Carpet type, size, stain level and delivery expectation are clarified first.", "Nicosia requests can be planned quickly through WhatsApp.", "Can be combined with sofa cleaning, home cleaning or regular cleaning."],
    ruDetails: ["Сначала уточняем тип ковра, размер, пятна и ожидания по срокам.", "Заявки из Никосии можно быстро согласовать через WhatsApp.", "Можно объединить с чисткой дивана, уборкой дома или регулярной уборкой."],
    enKeywords: ["carpet cleaning Nicosia", "carpet cleaning Cyprus", "Nicosia cleaning company"],
    ruKeywords: ["чистка ковров Никосия", "чистка ковров Кипр", "уборка Никосия"]
  },
  {
    slug: "apartman-merdiven-temizligi",
    trName: "Apartman Merdiven Temizliği",
    icon: "stairs",
    image: "/assets/img/photo-1505693416388-ac5ce068fe85.jpg",
    enName: "Apartment Stair Cleaning",
    ruName: "Уборка лестниц в доме",
    enCategory: "Regular Cleaning",
    ruCategory: "Регулярная уборка",
    enShort: "Scheduled cleaning for entrances, staircases, rails, lift areas and shared spaces.",
    ruShort: "Регулярная уборка входов, лестниц, перил, зон лифта и общих помещений.",
    enDetails: ["Weekly or monthly cleaning plans can be set for apartment shared areas.", "Entrances, stairs, rails, letterbox areas and lift fronts can be included.", "A practical option for apartment managers, site managers and property owners."],
    ruDetails: ["Можно организовать еженедельный или ежемесячный график для общих зон.", "Включаем вход, лестницы, перила, зоны почтовых ящиков и лифта.", "Удобно для управляющих домов, комплексов и владельцев недвижимости."],
    enKeywords: ["apartment stair cleaning Cyprus", "regular cleaning Cyprus", "North Cyprus cleaning services"],
    ruKeywords: ["уборка подъездов Кипр", "регулярная уборка Кипр", "клининг Северный Кипр"]
  },
  {
    slug: "duzenli-temizlik",
    trName: "Düzenli Temizlik",
    icon: "calendar-check",
    image: "/assets/img/photo-1527515637462-cff94eecc1ac.jpg",
    enName: "Regular Cleaning",
    ruName: "Регулярная уборка",
    enCategory: "Regular Cleaning",
    ruCategory: "Регулярная уборка",
    enShort: "Weekly or monthly cleaning programmes for homes, offices, shops, clinics and buildings.",
    ruShort: "Еженедельные и ежемесячные программы уборки для домов, офисов, магазинов, клиник и зданий.",
    enDetails: ["Frequency, staff needs, property size and working hours are agreed together.", "A steady hygiene standard can be maintained for offices, shops, clinics and apartments.", "A simple checklist helps keep the same quality at every visit."],
    ruDetails: ["Частота, состав команды, площадь и время работы согласуются заранее.", "Помогает поддерживать стабильный уровень чистоты в офисах, магазинах, клиниках и домах.", "Простой чек-лист помогает сохранять одинаковое качество на каждом визите."],
    enKeywords: ["regular cleaning Cyprus", "office cleaning Cyprus", "cleaning company in Cyprus"],
    ruKeywords: ["регулярная уборка Кипр", "уборка офисов Кипр", "клининговая компания на Кипре"]
  },
  {
    slug: "hastane-temizligi",
    trName: "Hastane ve Klinik Temizliği",
    icon: "cross",
    image: "/assets/img/photo-1586773860418-d37222d8fce3.jpg",
    enName: "Clinic and Healthcare Cleaning",
    ruName: "Уборка клиник",
    enCategory: "Corporate Cleaning",
    ruCategory: "Корпоративная уборка",
    enShort: "Careful cleaning for clinics, medical centres, reception desks and waiting areas.",
    ruShort: "Аккуратная уборка клиник, медицинских центров, ресепшенов и зон ожидания.",
    enDetails: ["Reception areas, waiting rooms and shared surfaces are cleaned methodically.", "The service is planned with the sensitivity of healthcare spaces in mind.", "Daytime, evening or periodic cleaning can be arranged around clinic hours."],
    ruDetails: ["Ресепшен, зоны ожидания и общие поверхности убираются последовательно и аккуратно.", "Работа планируется с учётом чувствительности медицинских помещений.", "Возможна дневная, вечерняя или периодическая уборка по графику клиники."],
    enKeywords: ["clinic cleaning Cyprus", "healthcare cleaning North Cyprus", "commercial cleaning North Cyprus"],
    ruKeywords: ["уборка клиник Кипр", "медицинский клининг Северный Кипр", "коммерческий клининг Северный Кипр"]
  },
  {
    slug: "magaza-temizligi",
    trName: "Mağaza Temizliği",
    icon: "store",
    image: "/assets/img/photo-1607082349566-187342175e2f.jpg",
    enName: "Shop Cleaning",
    ruName: "Уборка магазинов",
    enCategory: "Corporate Cleaning",
    ruCategory: "Корпоративная уборка",
    enShort: "Shop, showroom and retail cleaning that keeps customer-facing areas looking fresh.",
    ruShort: "Уборка магазинов, шоурумов и торговых помещений, чтобы клиентские зоны выглядели свежо.",
    enDetails: ["Floors, shelves, till areas, changing rooms, glass and entrances can be included.", "Daily or weekly plans can be built for busy retail spaces.", "Ideal before opening, after closing or for seasonal deep cleaning."],
    ruDetails: ["Включаем полы, полки, кассовую зону, примерочные, стекло и вход.", "Для оживлённых торговых точек можно составить ежедневный или еженедельный график.", "Подходит перед открытием, после закрытия или для сезонной глубокой уборки."],
    enKeywords: ["shop cleaning Cyprus", "commercial cleaning North Cyprus", "Kyrenia cleaning company"],
    ruKeywords: ["уборка магазинов Кипр", "коммерческий клининг Северный Кипр", "уборка Кирения"]
  },
  {
    slug: "dis-cephe-cam-temizligi",
    trName: "Dış Cephe Cam Temizliği",
    icon: "panels-top-left",
    image: "/assets/img/photo-1486406146926-c627a92ad1ab.jpg",
    enName: "Exterior Glass Cleaning",
    ruName: "Мытьё фасадных окон",
    enCategory: "Specialist Cleaning",
    ruCategory: "Специализированная уборка",
    enShort: "Exterior window and glass cleaning for shops, offices, villas and building fronts.",
    ruShort: "Мытьё наружных окон и стекла для магазинов, офисов, вилл и фасадов зданий.",
    enDetails: ["Shopfronts, entrance glass, office facades and hard-to-reach glass are assessed first.", "Height, access and safety details are clarified before the service.", "Can be planned regularly for shops, offices, villas and apartment buildings."],
    ruDetails: ["Сначала оцениваем витрины, входное стекло, офисные фасады и труднодоступные окна.", "Высота, доступ и безопасность уточняются до начала работ.", "Можно организовать регулярный график для магазинов, офисов, вилл и домов."],
    enKeywords: ["exterior glass cleaning Cyprus", "window cleaning North Cyprus", "cleaning company in Cyprus"],
    ruKeywords: ["мытьё фасадных окон Кипр", "мытьё окон Северный Кипр", "клининговая компания на Кипре"]
  },
  {
    slug: "elektrik-servisi",
    trName: "Elektrik Servisi",
    icon: "zap",
    image: "/assets/img/photo-1621905252507-b35492cc74b4.jpg",
    enName: "Electrical Service",
    ruName: "Услуги электрика",
    enCategory: "Technical Service",
    ruCategory: "Технический сервис",
    enShort: "Small electrical repair, checking and support requests for homes and businesses.",
    ruShort: "Небольшие электромонтажные работы, проверка и помощь для домов и бизнесов.",
    enDetails: ["Sockets, switches, fuse boards, lighting and small electrical faults can be requested.", "The scope and safety needs are reviewed through WhatsApp first.", "Can be combined with cleaning or regular maintenance plans."],
    ruDetails: ["Можно обратиться по розеткам, выключателям, щиткам, освещению и небольшим неисправностям.", "Объём и вопросы безопасности предварительно уточняются через WhatsApp.", "Можно объединить с уборкой или плановым обслуживанием."],
    enKeywords: ["electrical service Cyprus", "technical service North Cyprus", "property maintenance Cyprus"],
    ruKeywords: ["электрик Кипр", "технический сервис Северный Кипр", "обслуживание недвижимости Кипр"]
  },
  {
    slug: "su-tesisati-servisi",
    trName: "Su Tesisatı Servisi",
    icon: "droplets",
    image: "/assets/img/photo-1607472586893-edb57bdc0e39.jpg",
    enName: "Plumbing Service",
    ruName: "Услуги сантехника",
    enCategory: "Technical Service",
    ruCategory: "Технический сервис",
    enShort: "Small plumbing support for taps, sinks, drains, leaks and planned maintenance.",
    ruShort: "Небольшие сантехнические работы: смесители, раковины, сливы, протечки и обслуживание.",
    enDetails: ["Sink, tap, cistern, drain and minor pipework requests can be reviewed.", "For urgent or planned work, photos and address details help us respond faster.", "Can be included in regular maintenance support for businesses."],
    ruDetails: ["Рассматриваем заявки по раковинам, смесителям, бачкам, сливам и небольшим трубным работам.", "Фото, адрес и описание помогают быстрее оценить срочные или плановые задачи.", "Можно включить в регулярное обслуживание бизнеса."],
    enKeywords: ["plumbing service Cyprus", "technical service North Cyprus", "property maintenance Cyprus"],
    ruKeywords: ["сантехник Кипр", "технический сервис Северный Кипр", "обслуживание недвижимости Кипр"]
  },
  {
    slug: "bakim-onarim",
    trName: "Bakım Onarım",
    icon: "wrench",
    image: "/assets/img/photo-1581092160562-40aa08e78837.jpg",
    enName: "Maintenance and Repairs",
    ruName: "Ремонт и обслуживание",
    enCategory: "Technical Service",
    ruCategory: "Технический сервис",
    enShort: "Small repair, upkeep and practical maintenance support for properties and workplaces.",
    ruShort: "Мелкий ремонт, уход и практическое обслуживание для недвижимости и рабочих помещений.",
    enDetails: ["Doors, cabinets, small fixes and practical workplace maintenance can be discussed.", "Materials, timing and the task scope are clarified through WhatsApp.", "Useful alongside regular cleaning for shops, offices and apartment buildings."],
    ruDetails: ["Можно обсудить двери, шкафы, мелкий ремонт и практические задачи по помещению.", "Материалы, время и объём работ уточняются через WhatsApp.", "Удобно вместе с регулярной уборкой магазинов, офисов и жилых домов."],
    enKeywords: ["property maintenance Cyprus", "maintenance and repair North Cyprus", "technical service North Cyprus"],
    ruKeywords: ["обслуживание недвижимости Кипр", "ремонт Северный Кипр", "технический сервис Северный Кипр"]
  },
  {
    slug: "montaj-servisi",
    trName: "Montaj Servisi",
    icon: "hammer",
    image: "/assets/img/photo-1581092918056-0c4c3acd3789.jpg",
    enName: "Installation Service",
    ruName: "Монтажные услуги",
    enCategory: "Technical Service",
    ruCategory: "Технический сервис",
    enShort: "Installation help for shelves, accessories, small furniture and business equipment.",
    ruShort: "Помощь с монтажом полок, аксессуаров, небольшой мебели и оборудования для бизнеса.",
    enDetails: ["Shelves, hooks, accessories, small furniture and workplace equipment can be requested.", "Product details, wall type and required tools are checked before the visit.", "Can be planned after moving, after cleaning or before opening a workspace."],
    ruDetails: ["Можно заказать монтаж полок, крючков, аксессуаров, небольшой мебели и оборудования.", "Перед визитом уточняем изделие, тип стены и необходимые инструменты.", "Удобно после переезда, уборки или перед открытием рабочего пространства."],
    enKeywords: ["installation service Cyprus", "technical service North Cyprus", "property maintenance Cyprus"],
    ruKeywords: ["монтажные услуги Кипр", "технический сервис Северный Кипр", "обслуживание недвижимости Кипр"]
  }
];

const locale = {
  en: {
    lang: "en",
    code: "EN",
    flag: "🇬🇧",
    home: "Home",
    services: "Services",
    areas: "Areas",
    about: "About Us",
    contact: "Contact",
    quote: "Get a Quote",
    allServices: "All Services",
    serviceAreas: "Service Areas",
    quickForm: "Quick Request Form",
    formHint: "When you submit the form, WhatsApp will open with your request prepared.",
    formSubmit: "Prepare WhatsApp Message",
    contactTitle: "Contact Sanu Cleaning",
    contactIntro: "Tell us what needs to be cleaned, repaired or arranged. The form opens WhatsApp with the details ready, so our Turkish-speaking operations team can reply quickly.",
    footerIntro: "Sanu Temizlik ve Ticaret Ltd. - Nicosia-based cleaning and technical services across Cyprus.",
    footerPages: "Pages",
    footerContact: "Contact",
    rights: "All rights reserved.",
    whatsappDefault: "Merhaba Sanu Temizlik, web sitenizden ulaşıyorum. Temizlik veya servis için hızlı fiyat almak istiyorum; gerekirse alanın kısa videosunu gönderebilirim.",
    homeTitle: "Sanu Cleaning and Trading Ltd. | Cleaning Company in Cyprus",
    homeDescription: "Sanu Cleaning and Trading Ltd. offers professional cleaning, carpet cleaning, office cleaning, pest control and technical services in Nicosia, Kyrenia, Famagusta and Güzelyurt.",
    heroKicker: "Fresh, reliable cleaning in Cyprus since 2012",
    heroTitle: "Sanu Cleaning and Trading Ltd.",
    heroText: "When your home, office or business needs a clean and organised finish, Sanu is ready to help. From Nicosia to Kyrenia, Famagusta and Güzelyurt, we offer friendly, well-planned cleaning with clear WhatsApp communication.",
    servicesHeading: "Cleaning, regular maintenance and technical jobs under one practical roof",
    servicesIntro: "From home cleaning and office cleaning to apartment stair cleaning, clinic cleaning, shop cleaning, exterior glass cleaning and small technical jobs, you can speak to one team and get a clear plan.",
    citiesHeading: "Local cleaning support across North Cyprus",
    citiesIntro: "Each area has its own pace. Choose your city, open the relevant service page and send the details through WhatsApp.",
    aboutHeading: "Nicosia-based, trusted since 2012",
    aboutText: "Sanu Temizlik ve Ticaret Ltd. works from Çağlayan, Nicosia and supports private and corporate customers across Cyprus. We keep the language simple, the schedule clear and the work tidy.",
    keywordLinks: [
      ["Nicosia cleaning company", "/en/lefkosa/"],
      ["Kyrenia cleaning company", "/en/girne/"],
      ["cleaning company in Cyprus", "/en/hizmetler/"],
      ["North Cyprus cleaning services", "/en/hizmetler/"],
      ["carpet cleaning Nicosia", "/en/lefkosa/hali-yikama/"]
    ]
  },
  ru: {
    lang: "ru",
    code: "RU",
    flag: "🇷🇺",
    home: "Главная",
    services: "Услуги",
    areas: "Районы",
    about: "О нас",
    contact: "Контакты",
    quote: "Получить цену",
    allServices: "Все услуги",
    serviceAreas: "Районы обслуживания",
    quickForm: "Быстрая заявка",
    formHint: "После отправки формы WhatsApp откроется с уже подготовленной заявкой.",
    formSubmit: "Подготовить сообщение WhatsApp",
    contactTitle: "Связаться с Sanu Cleaning",
    contactIntro: "Расскажите, что нужно убрать, отремонтировать или подготовить. Форма откроет WhatsApp с готовыми деталями, чтобы наша турецкоязычная команда быстро ответила.",
    footerIntro: "Sanu Temizlik ve Ticaret Ltd. - клининговые и технические услуги по Кипру из Никосии.",
    footerPages: "Страницы",
    footerContact: "Контакты",
    rights: "Все права защищены.",
    whatsappDefault: "Merhaba Sanu Temizlik, web sitenizden ulaşıyorum. Temizlik veya servis için hızlı fiyat almak istiyorum; gerekirse alanın kısa videosunu gönderebilirim.",
    homeTitle: "Sanu Cleaning and Trading Ltd. | Клининговая компания на Кипре",
    homeDescription: "Sanu Cleaning and Trading Ltd. предоставляет уборку домов, офисов, чистку ковров, pest control и технические услуги в Никосии, Кирении, Фамагусте и Гюзельюрте.",
    heroKicker: "Надёжная уборка на Кипре с 2012 года",
    heroTitle: "Sanu Cleaning and Trading Ltd.",
    heroText: "Если дому, офису или бизнесу нужна чистота без лишней суеты, команда Sanu готова помочь. Работаем в Никосии, Кирении, Фамагусте и Гюзельюрте, заранее согласуем детали и держим связь через WhatsApp.",
    servicesHeading: "Уборка, регулярное обслуживание и технические работы в одном месте",
    servicesIntro: "Уборка дома и офиса, подъездов, клиник, магазинов, фасадных окон и небольшие технические задачи - всё можно обсудить с одной командой и получить понятный план.",
    citiesHeading: "Локальная помощь по уборке на Северном Кипре",
    citiesIntro: "У каждого района свой ритм. Выберите город, откройте нужную услугу и отправьте детали через WhatsApp.",
    aboutHeading: "Команда из Никосии, которой доверяют с 2012 года",
    aboutText: "Sanu Temizlik ve Ticaret Ltd. работает из Чаглаяна, Никосия, и помогает частным и корпоративным клиентам по всему Кипру. Мы ценим понятное общение, аккуратный график и чистый результат.",
    keywordLinks: [
      ["уборка Никосия", "/ru/lefkosa/"],
      ["уборка Кирения", "/ru/girne/"],
      ["клининговая компания на Кипре", "/ru/hizmetler/"],
      ["клининг Северный Кипр", "/ru/hizmetler/"],
      ["чистка ковров Никосия", "/ru/lefkosa/hali-yikama/"]
    ]
  }
};

function ensureFile(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
}

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function link(label, href) {
  return `<a class="keyword-link" href="${href}"><strong>${esc(label)}</strong></a>`;
}

function keywordTrail(lang) {
  return locale[lang].keywordLinks.map(([label, href]) => link(label, href)).join(", ");
}

function naturalKeywordParagraph(lang) {
  if (lang === "ru") {
    return `Если вы ищете ${link("уборка Никосия", "/ru/lefkosa/")}, важно не просто найти номер телефона, а понять, кто приедет и как будет организована работа. Для клиентов в Кирении мы отдельно подготовили страницу ${link("уборка Кирения", "/ru/girne/")}; а тем, кто сравнивает услуги по всему острову, удобнее начать с раздела ${link("клининговая компания на Кипре", "/ru/hizmetler/")}.`;
  }
  return `When someone searches for a ${link("Nicosia cleaning company", "/en/lefkosa/")}, they usually need clear timing, careful work and a team that is easy to reach. For Kyrenia requests, the ${link("Kyrenia cleaning company", "/en/girne/")} page explains the local service area, while broader Cyprus enquiries can start from our ${link("cleaning company in Cyprus", "/en/hizmetler/")} service overview.`;
}

function localizedServiceSearchSentence(lang, service, city = null) {
  const ls = localizedService(service, lang);
  const lc = city ? localizedCity(city, lang) : null;
  const cityPath = city ? `/${lang}/${city.slug}/${service.slug}/` : `/${lang}/hizmetler/${service.slug}/`;
  const localHref = city ? `/${lang}/${city.slug}/` : `/${lang}/hizmetler/`;
  const localKeyword = lc?.keyword || (lang === "ru" ? "клининговая компания на Кипре" : "cleaning company in Cyprus");
  const primaryKeyword = ls.keywords[0] || ls.name;
  const secondaryKeyword = ls.keywords[1] || localKeyword;

  if (lang === "ru") {
    return `Мы написали эту страницу так, чтобы человек, который ищет ${link(primaryKeyword, cityPath)}, сразу видел объём услуги, подходящие помещения и порядок связи. Если запрос начинается с района, например ${link(localKeyword, localHref)}, переход к нужной услуге остаётся простым; для более точного подбора можно также открыть ${link(secondaryKeyword, cityPath)}.`;
  }
  return `This page is written for people who need ${link(primaryKeyword, cityPath)} but also want the scope, timing and request process explained clearly. If your search starts with a local term such as ${link(localKeyword, localHref)}, you can move from the area page to the right service quickly; related needs such as ${link(secondaryKeyword, cityPath)} are kept close to the same request path.`;
}

function uniqueList(items) {
  return [...new Set(items.filter(Boolean))];
}

function localizedService(service, lang) {
  return {
    name: lang === "ru" ? service.ruName : service.enName,
    category: lang === "ru" ? service.ruCategory : service.enCategory,
    short: lang === "ru" ? service.ruShort : service.enShort,
    details: lang === "ru" ? service.ruDetails : service.enDetails,
    keywords: lang === "ru" ? service.ruKeywords : service.enKeywords
  };
}

function localizedCity(city, lang) {
  return {
    name: lang === "ru" ? city.ruName : city.enName,
    title: lang === "ru" ? city.ruTitle : city.enTitle,
    keyword: lang === "ru" ? city.ruKeyword : city.enKeyword,
    intro: lang === "ru" ? city.ruIntro : city.enIntro,
    districts: lang === "ru" ? city.ruDistricts : city.enDistricts
  };
}

function altUrls(path) {
  return `
  <link rel="alternate" hreflang="tr" href="${siteUrl}${path}">
  <link rel="alternate" hreflang="en" href="${siteUrl}/en${path}">
  <link rel="alternate" hreflang="ru" href="${siteUrl}/ru${path}">
  <link rel="alternate" hreflang="x-default" href="${siteUrl}${path}">`;
}

function localBusinessSchema(lang) {
  return {
    "@type": ["LocalBusiness", "CleaningService"],
    "@id": `${siteUrl}/#localbusiness`,
    name: "Sanu Temizlik ve Ticaret Ltd.",
    legalName: "Sanu Temizlik ve Ticaret Ltd.",
    image: `${siteUrl}/assets/img/sanu-temizlik-logo.png`,
    logo: `${siteUrl}/assets/img/sanu-temizlik-logo.png`,
    url: siteUrl,
    email: "info@sanutemizlik.com",
    telephone: "+905338828989",
    foundingDate: "2012",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Tahsin Yazıcı Sok. No:5 Çağlayan",
      addressLocality: "Lefkoşa",
      addressCountry: "CY"
    },
    areaServed: cities.map((city) => ({ "@type": "City", name: localizedCity(city, lang).name })),
    contactPoint: [{
      "@type": "ContactPoint",
      telephone: "+905338828989",
      contactType: "customer service",
      availableLanguage: ["tr", "en", "ru"],
      areaServed: "CY"
    }],
    hasMap: "https://www.google.com/maps?q=Sanu%20Temizlik%20Tahsin%20Yaz%C4%B1c%C4%B1%20Sok.%20No%3A5%20%C3%87a%C4%9Flayan%20Lefko%C5%9Fa%20K%C4%B1br%C4%B1s",
    knowsAbout: services.map((service) => localizedService(service, lang).name),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: lang === "ru" ? "Услуги Sanu Cleaning" : "Sanu Cleaning Services",
      itemListElement: services.map((service) => {
        const ls = localizedService(service, lang);
        return {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: ls.name,
            serviceType: ls.category,
            url: `${siteUrl}/${lang}/hizmetler/${service.slug}/`
          }
        };
      })
    },
    sameAs: [whatsappUrl]
  };
}

function webSiteSchema(lang) {
  return {
    "@type": "WebSite",
    "@id": `${siteUrl}/${lang}/#website`,
    name: "Sanu Cleaning and Trading Ltd.",
    url: `${siteUrl}/${lang}/`,
    inLanguage: lang,
    publisher: { "@id": `${siteUrl}/#localbusiness` }
  };
}

function breadcrumbSchema(lang, canonicalPath, title) {
  const canonical = `${siteUrl}/${lang}${canonicalPath}`;
  const segments = canonicalPath.split("/").filter(Boolean);
  const homeName = lang === "ru" ? "Главная" : "Home";
  const items = [{ name: homeName, url: `${siteUrl}/${lang}/` }];

  if (segments[0] === "hizmetler") {
    items.push({ name: locale[lang].services, url: `${siteUrl}/${lang}/hizmetler/` });
    if (segments[1]) {
      const service = services.find((item) => item.slug === segments[1]);
      items.push({ name: service ? localizedService(service, lang).name : title, url: canonical });
    }
  } else if (segments[0]) {
    const city = cities.find((item) => item.slug === segments[0]);
    if (city) {
      const lc = localizedCity(city, lang);
      items.push({ name: lc.name, url: `${siteUrl}/${lang}/${city.slug}/` });
      if (segments[1]) {
        const service = services.find((item) => item.slug === segments[1]);
        items.push({ name: service ? `${lc.name} ${localizedService(service, lang).name}` : title, url: canonical });
      }
    } else if (segments[0] === "iletisim") {
      items.push({ name: locale[lang].contact, url: canonical });
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

function pageSchema({ lang, title, description, canonicalPath }) {
  const canonical = `${siteUrl}/${lang}${canonicalPath}`;
  return {
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: title,
    description,
    inLanguage: lang,
    isPartOf: { "@id": `${siteUrl}/${lang}/#website` },
    about: { "@id": `${siteUrl}/#localbusiness` },
    breadcrumb: { "@id": `${canonical}#breadcrumb` }
  };
}

function defaultFaqs(lang, service = null, city = null) {
  const serviceName = service ? localizedService(service, lang).name : (lang === "ru" ? "услугу" : "service");
  const cityName = city ? localizedCity(city, lang).name : (lang === "ru" ? "Кипре" : "Cyprus");
  if (lang === "ru") {
    return [
      { q: `Как получить цену на ${serviceName} в районе ${cityName}?`, a: "Заполните форму на странице. Город, услуга, дата и примечания автоматически откроются в WhatsApp, а команда Sanu быстро ответит." },
      { q: "В каких районах работает Sanu Cleaning?", a: "Компания находится в Никосии и принимает заявки по Никосии, Кирении, Фамагусте, Гюзельюрту и ближайшим районам." },
      { q: "Какие данные лучше отправить заранее?", a: "Адрес, желаемую дату, тип услуги, площадь и, если возможно, фото или короткое видео помещения." }
    ];
  }
  return [
    { q: `How can I get a quote for ${serviceName} in ${cityName}?`, a: "Fill in the request form on the page. Your area, service, date and notes will open in WhatsApp so the Sanu team can reply quickly." },
    { q: "Which areas does Sanu Cleaning serve?", a: "Sanu is based in Nicosia and accepts requests across Nicosia, Kyrenia, Famagusta, Güzelyurt and nearby areas." },
    { q: "What should I send before the visit?", a: "Please share the address, preferred date, service type, property size and, if possible, photos or a short video." }
  ];
}

function faqSchema(lang, faqs, canonicalPath) {
  return {
    "@type": "FAQPage",
    "@id": `${siteUrl}/${lang}${canonicalPath}#faq`,
    inLanguage: lang,
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

function faqSection(lang, faqs) {
  if (!faqs?.length) return "";
  return `
    <section class="bg-white py-16 sm:py-20" id="faq">
      <div class="mx-auto max-w-4xl px-4 lg:px-8">
        <p class="section-kicker">${lang === "ru" ? "Вопросы" : "FAQ"}</p>
        <h2 class="mt-3 text-3xl font-black tracking-tight text-slate-950">${lang === "ru" ? "Частые вопросы" : "Frequently Asked Questions"}</h2>
        <div class="mt-8 grid gap-4">
          ${faqs.map((faq) => `<details class="surface p-5"><summary class="cursor-pointer text-lg font-black text-slate-950">${esc(faq.q)}</summary><p class="mt-3 leading-7 text-slate-600">${esc(faq.a)}</p></details>`).join("")}
        </div>
      </div>
    </section>`;
}

function serviceSchema(lang, service, city = null) {
  const ls = localizedService(service, lang);
  const lc = city ? localizedCity(city, lang) : null;
  const url = city ? `${siteUrl}/${lang}/${city.slug}/${service.slug}/` : `${siteUrl}/${lang}/hizmetler/${service.slug}/`;
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: lc ? `${lc.name} ${ls.name}` : ls.name,
    description: ls.short,
    serviceType: ls.category,
    provider: { "@id": `${siteUrl}/#localbusiness` },
    areaServed: lc ? { "@type": "City", name: lc.name } : cities.map((item) => ({ "@type": "City", name: localizedCity(item, lang).name })),
    url,
    image: service.image.startsWith("/") ? `${siteUrl}${service.image}` : service.image,
    offers: {
      "@type": "Offer",
      url,
      availability: "https://schema.org/InStock",
      priceCurrency: "TRY",
      seller: { "@id": `${siteUrl}/#localbusiness` }
    }
  };
}

function itemListSchema(lang, name, items, canonicalPath) {
  return {
    "@type": "ItemList",
    "@id": `${siteUrl}/${lang}${canonicalPath}#itemlist`,
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url
    }))
  };
}

function schemaScript(items) {
  return `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@graph": items
  })}</script>`;
}

function head({ lang, title, description, keywords, canonicalPath, localPath, schema = [] }) {
  const canonical = `${siteUrl}/${lang}${canonicalPath}`;
  return `
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="keywords" content="${esc(keywords)}">
  <meta name="robots" content="index,follow">
  <meta name="googlebot" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${siteUrl}/assets/img/sanu-temizlik-logo.png">
  <meta property="og:locale" content="${lang === "ru" ? "ru_RU" : "en_GB"}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="canonical" href="${canonical}">
  ${altUrls(localPath)}
  <link rel="icon" href="/assets/img/sanu-temizlik-logo.png">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = { theme: { extend: { colors: { brand: { 50: "#f0fbff", 100: "#e5f7fd", 600: "#00a7e1", 700: "#008fd0", 800: "#075b80", 900: "#034667" } } } } };
  </script>
  <link rel="stylesheet" href="/assets/css/styles.css">
  <script defer src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
  <script defer src="/assets/js/main.js"></script>
  ${schemaScript(schema)}`;
}

function languageDropdown(lang, localPath) {
  const current = locale[lang];
  return `
    <div class="relative" data-language-dropdown>
      <button class="language-trigger" type="button" data-language-toggle aria-label="Select language">
        <span data-current-flag>${current.flag}</span>
        <span data-current-lang>${current.code}</span>
        <i data-lucide="chevron-down" class="h-4 w-4" aria-hidden="true"></i>
      </button>
      <div class="language-menu hidden" data-language-menu>
        <button class="language-button" type="button" data-lang-option="tr" data-lang-url="${localPath}" aria-pressed="${lang === "tr"}"><span>🇹🇷</span><span>Türkçe</span></button>
        <button class="language-button" type="button" data-lang-option="en" data-lang-url="/en${localPath}" aria-pressed="${lang === "en"}"><span>🇬🇧</span><span>English</span></button>
        <button class="language-button" type="button" data-lang-option="ru" data-lang-url="/ru${localPath}" aria-pressed="${lang === "ru"}"><span>🇷🇺</span><span>Русский</span></button>
      </div>
    </div>`;
}

function header(lang, localPath) {
  const t = locale[lang];
  return `
  <header class="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
    <nav class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8" aria-label="${esc(t.home)}">
      <a href="/${lang}/" class="flex items-center gap-3" aria-label="Sanu Cleaning home">
        <img src="/assets/img/sanu-temizlik-logo.png" alt="Sanu Cleaning and Trading Ltd. logo" class="h-12 w-auto">
      </a>
      <div class="hidden items-center gap-7 lg:flex">
        <a class="nav-link" href="/${lang}/" data-i18n="nav.home">${t.home}</a>
        <a class="nav-link" href="/${lang}/hizmetler/" data-i18n="nav.services">${t.services}</a>
        <a class="nav-link" href="/${lang}/#cities" data-i18n="nav.cities">${t.areas}</a>
        <a class="nav-link" href="/${lang}/#about" data-i18n="nav.about">${t.about}</a>
        <a class="nav-link" href="/${lang}/iletisim/" data-i18n="nav.contact">${t.contact}</a>
      </div>
      <div class="flex items-center gap-2">
        ${languageDropdown(lang, localPath)}
        <a class="btn-primary hidden lg:inline-flex" href="${whatsappUrl}" data-whatsapp-cta data-whatsapp-message="${esc(t.whatsappDefault)}">
          <i data-lucide="message-circle" class="h-5 w-5" aria-hidden="true"></i>
          <span data-i18n="nav.quote">${t.quote}</span>
        </a>
        <button class="inline-flex rounded-md border border-sky-100 p-2 text-brand-800 lg:hidden" type="button" data-mobile-menu-button aria-expanded="false" aria-label="Menu">
          <i data-lucide="menu" class="h-6 w-6" aria-hidden="true"></i>
        </button>
      </div>
    </nav>
    <div class="hidden border-t border-sky-100 bg-white px-4 py-4 lg:hidden" data-mobile-menu>
      <div class="grid gap-3">
        <a class="nav-link" href="/${lang}/" data-i18n="nav.home">${t.home}</a>
        <a class="nav-link" href="/${lang}/hizmetler/" data-i18n="nav.services">${t.services}</a>
        <a class="nav-link" href="/${lang}/#cities" data-i18n="nav.cities">${t.areas}</a>
        <a class="nav-link" href="/${lang}/#about" data-i18n="nav.about">${t.about}</a>
        <a class="nav-link" href="/${lang}/iletisim/" data-i18n="nav.contact">${t.contact}</a>
        <a class="btn-primary mt-2" href="${whatsappUrl}" data-whatsapp-cta data-whatsapp-message="${esc(t.whatsappDefault)}">
          <i data-lucide="message-circle" class="h-5 w-5"></i>
          <span data-i18n="nav.quote">${t.quote}</span>
        </a>
      </div>
    </div>
  </header>`;
}

function footer(lang) {
  const t = locale[lang];
  return `
  <footer id="contact" class="bg-brand-900 py-12 text-sky-50">
    <div class="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-4 lg:px-8">
      <div class="md:col-span-2">
        <img src="/assets/img/sanu-temizlik-logo.png" alt="Sanu Cleaning and Trading Ltd. logo" class="h-14 w-auto rounded-md bg-white p-2">
        <p class="mt-5 max-w-md text-sky-100">${t.footerIntro}</p>
      </div>
      <div>
        <h2 class="text-sm font-black uppercase tracking-widest text-white">${t.footerPages}</h2>
        <ul class="mt-4 grid gap-3 text-sm">
          <li><a class="footer-link" href="/${lang}/hizmetler/">${t.services}</a></li>
          <li><a class="footer-link" href="/${lang}/lefkosa/">${cities[0][`${lang}Title`]}</a></li>
          <li><a class="footer-link" href="/${lang}/girne/">${cities[1][`${lang}Title`]}</a></li>
          <li><a class="footer-link" href="/${lang}/iletisim/">${t.contact}</a></li>
        </ul>
      </div>
      <div>
        <h2 class="text-sm font-black uppercase tracking-widest text-white">${t.footerContact}</h2>
        <ul class="mt-4 grid gap-3 text-sm">
          <li><a class="footer-link" href="mailto:info@sanutemizlik.com">info@sanutemizlik.com</a></li>
          <li><a class="footer-link" href="tel:+905338828989">+90 533 882 89 89</a></li>
          <li>Tahsin Yazıcı Sok. No:5 Çağlayan Lefkoşa / Cyprus</li>
        </ul>
      </div>
    </div>
    <div class="mx-auto mt-10 max-w-7xl border-t border-sky-800 px-4 pt-6 text-sm text-sky-100 lg:px-8">
      © <span data-current-year>2026</span> Sanu Temizlik ve Ticaret Ltd. <span data-i18n="footer.rights">${t.rights}</span>
    </div>
  </footer>`;
}

function cityOptions(lang, selectedSlug = "") {
  return cities.map((city) => {
    const lc = localizedCity(city, lang);
    return `<option value="${city.trName}" ${city.slug === selectedSlug ? "selected" : ""}>${lc.name}</option>`;
  }).join("");
}

function serviceOptions(lang, selectedSlug = "") {
  return services.map((service) => {
    const ls = localizedService(service, lang);
    return `<option value="${service.trName}" ${service.slug === selectedSlug ? "selected" : ""}>${ls.name}</option>`;
  }).join("");
}

function quoteForm(lang, { citySlug = "", serviceSlug = "", contact = false } = {}) {
  const t = locale[lang];
  return `
  <form class="surface p-5 sm:p-7" data-whatsapp-form>
    <div class="grid gap-4 sm:grid-cols-2">
      <label class="grid gap-2 text-sm font-bold text-slate-700">
        <span data-i18n="form.name">${lang === "ru" ? "Имя и фамилия" : "Full Name"}</span>
        <input class="form-input" name="name" type="text" autocomplete="name" data-i18n-placeholder="form.placeholder.name" placeholder="${lang === "ru" ? "Ваше имя и фамилия" : "Your full name"}">
      </label>
      <label class="grid gap-2 text-sm font-bold text-slate-700">
        <span data-i18n="form.phone">${lang === "ru" ? "Телефон" : "Phone Number"}</span>
        <input class="form-input" name="phone" type="tel" autocomplete="tel" data-i18n-placeholder="form.placeholder.phone" placeholder="${lang === "ru" ? "Ваш номер телефона" : "Your phone number"}">
      </label>
      <label class="grid gap-2 text-sm font-bold text-slate-700">
        <span data-i18n="form.city">${lang === "ru" ? "Город" : "Area"}</span>
        <select class="form-input" name="city" required>${cityOptions(lang, citySlug)}</select>
      </label>
      <label class="grid gap-2 text-sm font-bold text-slate-700">
        <span data-i18n="form.service">${lang === "ru" ? "Услуга" : "Service Required"}</span>
        <select class="form-input" name="service" required>${serviceOptions(lang, serviceSlug)}</select>
      </label>
      <label class="grid gap-2 text-sm font-bold text-slate-700 ${contact ? "" : "sm:col-span-2"}">
        <span data-i18n="form.date">${lang === "ru" ? "Желаемая дата" : "Preferred Date"}</span>
        <input class="form-input" name="date" type="date" required>
      </label>
      <label class="grid gap-2 text-sm font-bold text-slate-700 sm:col-span-2">
        <span data-i18n="form.notes">${lang === "ru" ? "Примечание" : "Additional Notes"}</span>
        <textarea class="form-input min-h-28 resize-y" name="notes" data-i18n-placeholder="form.placeholder.notes" placeholder="${lang === "ru" ? "Адрес, площадь, удобное время или особые пожелания" : "Address, property size, preferred time or special requirements"}"></textarea>
      </label>
    </div>
    <button class="btn-primary mt-5 w-full" type="submit">
      <i data-lucide="message-square-text" class="h-5 w-5" aria-hidden="true"></i>
      <span data-i18n="form.submit">${t.formSubmit}</span>
    </button>
  </form>`;
}

function serviceCard(service, lang, city = null) {
  const ls = localizedService(service, lang);
  const href = city ? `/${lang}/${city.slug}/${service.slug}/` : `/${lang}/hizmetler/${service.slug}/`;
  return `
  <a class="service-card bg-white p-6" href="${href}">
    <img src="${service.image}" alt="${esc(ls.name)}" class="mb-5 aspect-[4/3] w-full rounded-md object-cover" loading="lazy">
    <span class="icon-tile"><i data-lucide="${service.icon}" class="h-5 w-5" aria-hidden="true"></i></span>
    <p class="mt-4 text-xs font-black uppercase tracking-widest text-brand-700">${ls.category}</p>
    <h3 class="mt-2 text-xl font-black text-slate-950">${ls.name}</h3>
    <p class="mt-3 text-sm leading-6 text-slate-600">${ls.short}</p>
  </a>`;
}

function serviceGrid(lang, city = null) {
  return services.map((service) => serviceCard(service, lang, city)).join("");
}

function layout({ lang, title, description, keywords, canonicalPath, localPath = canonicalPath, body, faqs = defaultFaqs(lang), schema = [] }) {
  const structuredData = [
    localBusinessSchema(lang),
    webSiteSchema(lang),
    pageSchema({ lang, title, description, canonicalPath }),
    breadcrumbSchema(lang, canonicalPath, title),
    ...(faqs?.length ? [faqSchema(lang, faqs, canonicalPath)] : []),
    ...schema
  ];
  return `<!doctype html>
<html lang="${lang}">
<head>
${head({ lang, title, description, keywords, canonicalPath, localPath, schema: structuredData })}
</head>
<body class="bg-slate-50">
  <a class="skip-link" href="#main">${lang === "ru" ? "Перейти к содержанию" : "Skip to content"}</a>
  ${header(lang, localPath)}
  <main id="main">
    ${body}
    ${faqSection(lang, faqs)}
  </main>
  ${footer(lang)}
</body>
</html>`;
}

function homePage(lang) {
  const t = locale[lang];
  const body = `
    <section class="hero-cleaning min-h-[76vh]">
      <div class="hero-bg" aria-hidden="true">
        <video autoplay loop muted playsinline class="absolute inset-0 h-full w-full object-cover">
          <source src="/assets/video/hero.webm" type="video/webm">
        </video>
      </div>
      <div class="mx-auto flex min-h-[76vh] max-w-7xl items-center px-4 py-20 lg:px-8">
        <div class="max-w-3xl text-white">
          <p class="mb-4 text-sm font-extrabold uppercase tracking-[0.18em] text-sky-100">${t.heroKicker}</p>
          <h1 class="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">${t.heroTitle}</h1>
          <p class="mt-6 max-w-2xl text-lg leading-8 text-sky-50">${t.heroText} ${lang === "ru" ? `Для запросов по Никосии можно начать со страницы ${link("уборка Никосия", "/ru/lefkosa/")}, а для общего подбора услуг — с раздела ${link("клининговая компания на Кипре", "/ru/hizmetler/")}.` : `For Nicosia requests, you can start with our ${link("Nicosia cleaning company", "/en/lefkosa/")} page, while broader service enquiries are easier to compare from the ${link("cleaning company in Cyprus", "/en/hizmetler/")} overview.`}</p>
          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <a class="btn-white" href="${whatsappUrl}" data-whatsapp-cta data-whatsapp-message="${esc(t.whatsappDefault)}"><i data-lucide="send" class="h-5 w-5"></i><span>${t.quote}</span></a>
            <a class="btn-secondary" href="#services"><i data-lucide="sparkles" class="h-5 w-5"></i><span>${t.allServices}</span></a>
          </div>
        </div>
      </div>
    </section>
    <section id="services" class="py-16 sm:py-20">
      <div class="mx-auto max-w-7xl px-4 lg:px-8">
        <div class="max-w-3xl seo-rich">
          <p class="section-kicker">${t.services}</p>
          <h2 class="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">${t.servicesHeading}</h2>
          <p class="mt-4 text-lg leading-8 text-slate-600">${t.servicesIntro}</p>
        </div>
        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">${serviceGrid(lang)}</div>
      </div>
    </section>
    <section id="cities" class="bg-white py-16 sm:py-20">
      <div class="mx-auto max-w-7xl px-4 lg:px-8">
        <div class="max-w-3xl">
          <p class="section-kicker">${t.serviceAreas}</p>
          <h2 class="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">${t.citiesHeading}</h2>
          <p class="mt-4 text-lg leading-8 text-slate-600">${t.citiesIntro}</p>
        </div>
        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          ${cities.map((city) => {
            const lc = localizedCity(city, lang);
            return `<a class="city-card block overflow-hidden bg-slate-50" href="/${lang}/${city.slug}/"><img src="${city.image}" alt="${esc(lc.title)}" class="aspect-[16/10] w-full object-cover" loading="lazy"><div class="p-6"><h3 class="text-xl font-black text-brand-900">${lc.title}</h3><p class="mt-3 text-sm leading-6 text-slate-600">${lc.intro}</p><p class="mt-4 text-sm font-black text-brand-700">${lang === "ru" ? "Посмотреть услуги района" : "View local services"}</p></div></a>`;
          }).join("")}
        </div>
      </div>
    </section>
    <section id="quote" class="py-16 sm:py-20">
      <div class="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div class="seo-rich">
          <p class="section-kicker">${t.quote}</p>
          <h2 class="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">${lang === "ru" ? "Опишите задачу, WhatsApp откроется с готовым сообщением" : "Describe the job and WhatsApp will open with the message ready"}</h2>
          <p class="mt-4 text-lg leading-8 text-slate-600">${lang === "ru" ? "Выберите город, услугу, дату и добавьте примечание. Заявка будет отправлена нашей команде с турецкими служебными метками, чтобы её быстро обработали." : "Choose the area, service, date and notes. Your request will be prepared for WhatsApp with Turkish operational labels so the local team can handle it quickly."}</p>
          <img src="/assets/img/photo-1527515637462-cff94eecc1ac.jpg" alt="${lang === "ru" ? "Профессиональные материалы для уборки" : "Professional cleaning materials"}" class="mt-8 h-72 w-full rounded-lg object-cover" loading="lazy">
        </div>
        ${quoteForm(lang)}
      </div>
    </section>
    <section id="about" class="bg-white py-16 sm:py-20">
      <div class="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <img src="/assets/img/sanu-hero-team.jpg" alt="Sanu Cleaning team" class="h-full min-h-80 w-full rounded-lg object-cover" loading="lazy">
        <div class="content-panel seo-rich">
          <p class="section-kicker">${t.about}</p>
          <h2 class="mt-3 text-3xl sm:text-4xl">${t.aboutHeading}</h2>
          <p class="mt-5">${t.aboutText}</p>
          <p class="mt-5">${naturalKeywordParagraph(lang)}</p>
        </div>
      </div>
    </section>`;

  return layout({
    lang,
    title: t.homeTitle,
    description: t.homeDescription,
    keywords: t.keywordLinks.map(([label]) => label).join(", "),
    canonicalPath: "/",
    schema: [
      itemListSchema(lang, lang === "ru" ? "Популярные услуги Sanu Cleaning" : "Sanu Cleaning Featured Services", services.map((service) => ({
        name: localizedService(service, lang).name,
        url: `${siteUrl}/${lang}/hizmetler/${service.slug}/`
      })), "/")
    ],
    body
  });
}

function servicesIndexPage(lang) {
  const t = locale[lang];
  const body = `
    <section class="bg-white py-16 sm:py-20">
      <div class="mx-auto max-w-7xl px-4 lg:px-8">
        <div class="max-w-3xl seo-rich">
          <p class="section-kicker">${t.services}</p>
          <h1 class="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">${lang === "ru" ? "Клининговые и технические услуги" : "Cleaning and Technical Services"}</h1>
          <p class="mt-5 text-lg leading-8 text-slate-600">${t.servicesIntro} ${naturalKeywordParagraph(lang)}</p>
        </div>
        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">${serviceGrid(lang)}</div>
      </div>
    </section>`;

  return layout({
    lang,
    title: lang === "ru" ? "Услуги | Sanu Cleaning and Trading Ltd." : "Services | Sanu Cleaning and Trading Ltd.",
    description: lang === "ru" ? "Все услуги Sanu Cleaning: уборка дома, офиса, чистка ковров, pest control, фасадные окна и технический сервис на Кипре." : "All Sanu Cleaning services: home cleaning, office cleaning, carpet cleaning, pest control, exterior glass cleaning and technical support in Cyprus.",
    keywords: uniqueList(services.flatMap((service) => localizedService(service, lang).keywords)).slice(0, 14).join(", "),
    canonicalPath: "/hizmetler/",
    schema: [
      itemListSchema(lang, lang === "ru" ? "Список услуг Sanu Cleaning" : "Sanu Cleaning Service List", services.map((service) => ({
        name: localizedService(service, lang).name,
        url: `${siteUrl}/${lang}/hizmetler/${service.slug}/`
      })), "/hizmetler/")
    ],
    body
  });
}

function cityPage(lang, city) {
  const t = locale[lang];
  const lc = localizedCity(city, lang);
  const body = `
    <section class="bg-white py-16 sm:py-20">
      <div class="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[1fr_0.8fr] lg:px-8">
        <div class="seo-rich">
          <p class="section-kicker">${lc.name}</p>
          <h1 class="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">${lc.title}</h1>
          <p class="mt-5 text-lg leading-8 text-slate-600">${lc.intro} ${link(lc.keyword, `/${lang}/${city.slug}/`)} ${lang === "ru" ? "— это запрос, где важны пунктуальность, понятная цена и аккуратный результат." : "should mean punctual arrival, clear pricing and a tidy result."}</p>
          <p class="mt-4 text-lg leading-8 text-slate-600">${lang === "ru" ? "Районы обслуживания" : "Service areas"}: ${lc.districts}. ${lang === "ru" ? `Для дома можно открыть ${link("уборка дома Кипр", `/${lang}/${city.slug}/ev-temizligi/`)}, а для офисов — страницу ${link("уборка офисов Кипр", `/${lang}/${city.slug}/ofis-temizligi/`)}.` : `For homes, you can open ${link("home cleaning Cyprus", `/${lang}/${city.slug}/ev-temizligi/`)}, and for workplaces the ${link("office cleaning Cyprus", `/${lang}/${city.slug}/ofis-temizligi/`)} page is the right next step.`}</p>
          <a class="btn-primary mt-8" href="${whatsappUrl}" data-whatsapp-cta data-whatsapp-message="${esc(t.whatsappDefault)}"><i data-lucide="send" class="h-5 w-5"></i><span>${t.quote}</span></a>
        </div>
        <img src="${city.image}" alt="${esc(lc.title)}" class="h-full min-h-80 w-full rounded-lg object-cover" loading="lazy">
      </div>
    </section>
    <section class="py-16">
      <div class="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 class="text-3xl font-black text-slate-950">${lang === "ru" ? `Услуги в районе ${lc.name}` : `${lc.name} Services`}</h2>
        <p class="mt-3 max-w-3xl text-lg leading-8 text-slate-600">${lang === "ru" ? "Выберите нужную услугу и отправьте детали через WhatsApp." : "Choose the service you need and send the details through WhatsApp."}</p>
        <div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">${serviceGrid(lang, city)}</div>
      </div>
    </section>`;

  return layout({
    lang,
    title: `${lc.title} | Sanu Cleaning and Trading Ltd.`,
    description: lang === "ru" ? `${lc.title}: уборка дома, офиса, ковров, клиник, магазинов, фасадных окон и технический сервис.` : `${lc.title}: home cleaning, office cleaning, carpet cleaning, clinic cleaning, shop cleaning, exterior glass cleaning and technical services.`,
    keywords: uniqueList([lc.keyword, ...t.keywordLinks.map(([label]) => label)]).join(", "),
    canonicalPath: `/${city.slug}/`,
    schema: [
      itemListSchema(lang, `${lc.name} ${locale[lang].services}`, services.map((service) => ({
        name: `${lc.name} ${localizedService(service, lang).name}`,
        url: `${siteUrl}/${lang}/${city.slug}/${service.slug}/`
      })), `/${city.slug}/`)
    ],
    body
  });
}

function serviceContent(lang, service, city = null) {
  const t = locale[lang];
  const ls = localizedService(service, lang);
  const lc = city ? localizedCity(city, lang) : null;
  const cityPrefix = lc ? `${lc.name} ` : "";
  return `
    <section class="service-hero py-20 text-white" style="--service-image: url('${service.image}')">
      <div class="mx-auto max-w-7xl px-4 lg:px-8">
        <div class="max-w-3xl">
          <p class="mb-4 text-sm font-extrabold uppercase tracking-[0.18em] text-sky-100">${lc ? lc.name : ls.category}</p>
          <h1 class="text-4xl font-black leading-tight sm:text-5xl">${cityPrefix}${ls.name}</h1>
          <p class="mt-5 text-lg leading-8 text-sky-50">${ls.short}</p>
          <a class="btn-white mt-8" href="${whatsappUrl}" data-whatsapp-cta data-whatsapp-message="${esc(t.whatsappDefault)}"><i data-lucide="message-circle" class="h-5 w-5"></i><span>${t.quote}</span></a>
        </div>
      </div>
    </section>
    <section class="bg-white py-16 sm:py-20">
      <div class="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[1fr_0.8fr] lg:px-8">
        <article class="content-panel seo-rich">
          <p class="section-kicker">${ls.category}</p>
          <h2 class="mt-3 text-3xl sm:text-4xl">${cityPrefix}${ls.name}</h2>
          <p class="mt-5">${city ? (lang === "ru" ? `${lc.intro} Услуга ${ls.name.toLowerCase()} планируется по площади, состоянию помещения и удобному времени.` : `${lc.intro} ${ls.name} is planned around the property size, condition and a convenient time.`) : (lang === "ru" ? `Если вам нужна ${ls.name.toLowerCase()} на Кипре, мы сначала уточним детали и предложим понятный план.` : `If you need ${ls.name.toLowerCase()} in Cyprus, we first clarify the details and suggest a clear plan.`)}</p>
          <p class="mt-5">${localizedServiceSearchSentence(lang, service, city)}</p>
          <h3 class="mt-8 text-2xl">${lang === "ru" ? "Что входит в услугу?" : "What do we do?"}</h3>
          <ul class="mt-6 grid gap-4">
            ${ls.details.map((item) => `<li class="flex gap-3 rounded-lg border border-sky-100 bg-slate-50 p-4"><i data-lucide="check-circle-2" class="mt-1 h-5 w-5 shrink-0 text-brand-700"></i><span class="leading-7 text-slate-700">${item}</span></li>`).join("")}
          </ul>
          <div class="mt-8 grid gap-5 md:grid-cols-2">
            <div class="rounded-lg border border-sky-100 bg-slate-50 p-5">
              <h3 class="text-xl font-black text-slate-950">${lang === "ru" ? "Кому подходит?" : "Who is it for?"}</h3>
              <p class="mt-3">${lang === "ru" ? "Подходит для домов, квартир, офисов, магазинов, клиник и объектов, которым нужен аккуратный и понятный сервис." : "Suitable for homes, apartments, offices, shops, clinics and properties that need a tidy, well-organised service."}</p>
            </div>
            <div class="rounded-lg border border-sky-100 bg-slate-50 p-5">
              <h3 class="text-xl font-black text-slate-950">${lang === "ru" ? "Как мы работаем?" : "How does it work?"}</h3>
              <p class="mt-3">${lang === "ru" ? "Вы отправляете адрес, дату, фото или видео через WhatsApp. Мы уточняем объём, время и детали, затем готовим команду." : "You send the address, date, photos or a short video through WhatsApp. We confirm the scope, time and details, then prepare the team."}</p>
            </div>
          </div>
        </article>
        <aside>
          <img src="${service.image}" alt="${esc(cityPrefix + ls.name)}" class="aspect-[4/3] w-full rounded-lg object-cover" loading="lazy">
          <div class="surface mt-6 p-5">
            <h2 class="text-xl font-black text-slate-950">${t.quickForm}</h2>
            <p class="mt-2 text-sm leading-6 text-slate-600">${t.formHint}</p>
            <div class="mt-5">${quoteForm(lang, { citySlug: city?.slug || "", serviceSlug: service.slug })}</div>
          </div>
        </aside>
      </div>
    </section>
    <section class="py-16">
      <div class="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 class="text-3xl font-black text-slate-950">${lang === "ru" ? "Похожие услуги" : "Related Services"}</h2>
        <div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          ${services.filter((item) => item.slug !== service.slug).slice(0, 4).map((item) => serviceCard(item, lang, city)).join("")}
        </div>
      </div>
    </section>`;
}

function servicePage(lang, service) {
  const ls = localizedService(service, lang);
  return layout({
    lang,
    title: `${ls.name} | Sanu Cleaning and Trading Ltd.`,
    description: lang === "ru" ? `${ls.name} на Кипре от Sanu Cleaning. Отправьте заявку через WhatsApp и получите быстрый ответ.` : `${ls.name} in Cyprus by Sanu Cleaning. Send your request through WhatsApp and receive a quick response.`,
    keywords: uniqueList(ls.keywords).join(", "),
    canonicalPath: `/hizmetler/${service.slug}/`,
    faqs: defaultFaqs(lang, service),
    schema: [serviceSchema(lang, service)],
    body: serviceContent(lang, service)
  });
}

function cityServicePage(lang, city, service) {
  const lc = localizedCity(city, lang);
  const ls = localizedService(service, lang);
  return layout({
    lang,
    title: `${lc.name} ${ls.name} | Sanu Cleaning and Trading Ltd.`,
    description: lang === "ru" ? `${lc.name} ${ls.name}: быстрый запрос через WhatsApp, понятное планирование и аккуратная работа.` : `${lc.name} ${ls.name}: quick WhatsApp request, clear planning and careful service.`,
    keywords: uniqueList([lc.keyword, ...ls.keywords]).join(", "),
    canonicalPath: `/${city.slug}/${service.slug}/`,
    faqs: defaultFaqs(lang, service, city),
    schema: [serviceSchema(lang, service, city)],
    body: serviceContent(lang, service, city)
  });
}

function contactPage(lang) {
  const t = locale[lang];
  const body = `
    <section class="bg-white py-16 sm:py-20">
      <div class="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div class="seo-rich">
          <p class="section-kicker">${t.contact}</p>
          <h1 class="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">${t.contactTitle}</h1>
          <p class="mt-5 text-lg leading-8 text-slate-600">${t.contactIntro} ${naturalKeywordParagraph(lang)}</p>
          <div class="mt-8 grid gap-4">
            <a class="surface flex items-center gap-4 p-4" href="tel:+905338828989"><span class="icon-tile"><i data-lucide="phone" class="h-5 w-5"></i></span><span><strong class="block text-slate-950">Phone / WhatsApp</strong>+90 533 882 89 89</span></a>
            <a class="surface flex items-center gap-4 p-4" href="mailto:info@sanutemizlik.com"><span class="icon-tile"><i data-lucide="mail" class="h-5 w-5"></i></span><span><strong class="block text-slate-950">Email</strong>info@sanutemizlik.com</span></a>
            <div class="surface flex items-center gap-4 p-4"><span class="icon-tile"><i data-lucide="map-pin" class="h-5 w-5"></i></span><span><strong class="block text-slate-950">${lang === "ru" ? "Адрес" : "Address"}</strong>Tahsin Yazıcı Sok. No:5 Çağlayan Lefkoşa / Cyprus</span></div>
          </div>
        </div>
        ${quoteForm(lang, { contact: true })}
      </div>
    </section>
    <section class="pb-16">
      <div class="mx-auto max-w-7xl px-4 lg:px-8">
        <div class="surface overflow-hidden">
          <iframe class="map-frame" title="Sanu Cleaning Google Maps" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Sanu%20Temizlik%20Tahsin%20Yaz%C4%B1c%C4%B1%20Sok.%20No%3A5%20%C3%87a%C4%9Flayan%20Lefko%C5%9Fa%20K%C4%B1br%C4%B1s&output=embed"></iframe>
        </div>
      </div>
    </section>`;

  return layout({
    lang,
    title: `${t.contactTitle} | Sanu Cleaning and Trading Ltd.`,
    description: lang === "ru" ? "Свяжитесь с Sanu Cleaning через WhatsApp, телефон, e-mail или карту Google Maps." : "Contact Sanu Cleaning via WhatsApp, phone, email or Google Maps.",
    keywords: t.keywordLinks.map(([label]) => label).join(", "),
    canonicalPath: "/iletisim/",
    body
  });
}

for (const lang of ["en", "ru"]) {
  ensureFile(join(lang, "index.html"), homePage(lang));
  ensureFile(join(lang, "hizmetler", "index.html"), servicesIndexPage(lang));
  ensureFile(join(lang, "iletisim", "index.html"), contactPage(lang));

  for (const service of services) {
    ensureFile(join(lang, "hizmetler", service.slug, "index.html"), servicePage(lang, service));
  }

  for (const city of cities) {
    ensureFile(join(lang, city.slug, "index.html"), cityPage(lang, city));
    for (const service of services) {
      ensureFile(join(lang, city.slug, service.slug, "index.html"), cityServicePage(lang, city, service));
    }
  }
}

console.log("Generated EN/RU pages with clean localised content.");
