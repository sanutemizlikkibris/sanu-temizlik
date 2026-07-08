const fs = require('fs');
const path = require('path');

// 1. Fix Unsplash URLs in ALL Turkish HTML files
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    if (file.includes('node_modules') || file.includes('.git')) return;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.html')) results.push(file);
    }
  });
  return results;
}

const allHtmlFiles = walk('.');

for (const file of allHtmlFiles) {
  if (file.startsWith('en/') || file.startsWith('ru/')) continue; // Skip generated languages for now
  let content = fs.readFileSync(file, 'utf8');
  
  // Fix Unsplash URLs using pure JS replace, capturing the ID
  content = content.replace(/https:\/\/images\.unsplash\.com\/photo-([a-zA-Z0-9\-]+)[^\"']*/g, '/assets/img/photo-$1.jpg');
  
  fs.writeFileSync(file, content);
}

console.log("Fixed Unsplash URLs.");

// 2. Generate EN and RU sites
const dirsToClone = ['hizmetler', 'lefkosa', 'girne', 'gazi-magusa', 'guzelyurt'];

const enDict = {
  'Hizmet Bölgeleri': 'Service Areas',
  'İletişim': 'Contact',
  'Hemen Ulaş': 'Contact Now',
  'Temizliği bize bırakın,<br><span class=\"text-brand-400\">siz keyfini yaşayın</span>': 'Leave the cleaning to us,<br><span class=\"text-brand-400\">enjoy your time</span>',
  'Kurumsal Temizlik': 'Corporate Cleaning',
  'Ev Temizliği': 'Home Cleaning',
  'Ofis Temizliği': 'Office Cleaning',
  'Halı Yıkama': 'Carpet Cleaning',
  'Koltuk Yıkama': 'Sofa Cleaning',
  'Haşere İlaçlama': 'Pest Control',
  'İnşaat Sonrası Temizlik': 'Post-Construction Cleaning',
  'Düzenli Temizlik': 'Regular Cleaning',
  'Size Nasıl Yardımcı Olabilirik\\?': 'How Can We Help You?',
  'Siz neye ihtiyacınız olduğunu seçin, biz hemen hallederik': 'Tell us what you need, we will handle it immediately',
  'Hakkımızda': 'About Us',
  'Ana Sayfa': 'Home',
  'Tüm Hizmetler': 'All Services',
  '%100 Güvenilir': '100% Reliable',
  'Önce WhatsApp’tan adres, tarih, alan bilgisi ve kısa bir video alırız. Fiyatı netleştirir, randevuyu oluştururuz. Siz kahvenizi yudumlarken biz yaşam alanlarınızı pırıl pırıl yapalım.': 'First, we receive the address, date, area info and a short video via WhatsApp. We finalize the price and create the appointment. While you sip your coffee, we make your living spaces sparkle.',
  'Bir telefonla gapınızdayık': 'We are at your door with one call',
  'Ada genelindeki tüm profesyonel temizlik taleplerinde': 'For all professional cleaning requests across the island',
  'Sanu Temizlik, profesyonel hizmet ihtiyaçlarınızda sıcak iletişim': 'Sanu Cleaning offers warm communication for your professional service needs',
  'Hizmet kalitemizle Kıbrıs genelinde güven veren, açık ve anlaşılır çözümler sunuyoruz.': 'With our service quality, we offer reliable, clear and understandable solutions across Cyprus.',
  'Mermer Cilalama': 'Marble Polishing',
  'Hastane ve Klinik Temizliği': 'Hospital & Clinic Cleaning',
  'Mağaza Temizliği': 'Store Cleaning',
  'Dış Cephe Cam Temizliği': 'Exterior Glass Cleaning',
  'Elektrik Servisi': 'Electrical Service',
  'Su Tesisatı Servisi': 'Plumbing Service',
  'Bakım Onarım': 'Maintenance & Repair',
  'Montaj Servisi': 'Installation Service'
};

const ruDict = {
  'Hizmet Bölgeleri': 'Зоны Обслуживания',
  'İletişim': 'Контакты',
  'Hemen Ulaş': 'Связаться',
  'Temizliği bize bırakın,<br><span class=\"text-brand-400\">siz keyfini yaşayın</span>': 'Оставьте уборку нам,<br><span class=\"text-brand-400\">наслаждайтесь временем</span>',
  'Kurumsal Temizlik': 'Корпоративная Уборка',
  'Ev Temizliği': 'Уборка Дома',
  'Ofis Temizliği': 'Уборка Офисов',
  'Halı Yıkama': 'Чистка Ковров',
  'Koltuk Yıkama': 'Чистка Диванов',
  'Haşere İlaçlama': 'Борьба с вредителями',
  'İnşaat Sonrası Temizlik': 'Уборка после ремонта',
  'Düzenli Temizlik': 'Регулярная Уборка',
  'Size Nasıl Yardımcı Olabilirik\\?': 'Как Мы Можем Помочь?',
  'Siz neye ihtiyacınız olduğunu kısa video': 'Скажите, что вам нужно, мы всё сделаем',
  'Hakkımızda': 'О Нас',
  'Ana Sayfa': 'Главная',
  'Tüm Hizmetler': 'Все Услуги',
  '%100 Güvenilir': '100% Надежный',
  'Önce WhatsApp’tan adres, tarih, alan bilgisi ve kısa bir video alırız. Fiyatı netleştirir, randevuyu oluştururuz. Siz kahvenizi yudumlarken biz yaşam alanlarınızı pırıl pırıl yapalım.': 'Сначала мы получаем адрес, дату, информацию о площади и короткое видео по WhatsApp. Мы уточняем цену и назначаем встречу. Пока вы пьете кофе, мы заставим ваши жилые помещения сиять.',
  'Bir telefonla gapınızdayık': 'Мы у вашей двери по одному звонку',
  'Ada genelindeki tüm profesyonel temizlik taleplerinde': 'Для всех запросов на профессиональную уборку по всему острову',
  'Sanu Temizlik, profesyonel hizmet ihtiyaçlarınızda sıcak iletişim': 'Sanu Cleaning предлагает теплое общение для ваших профессиональных нужд',
  'Hizmet kalitemizle Kıbrıs genelinde güven veren, açık ve anlaşılır çözümler sunuyoruz.': 'Благодаря нашему качеству обслуживания мы предлагаем надежные, понятные решения по всему Кипру.',
  'Mermer Cilalama': 'Полировка Мрамора',
  'Hastane ve Klinik Temizliği': 'Уборка Больниц и Клиник',
  'Mağaza Temizliği': 'Уборка Магазинов',
  'Dış Cephe Cam Temizliği': 'Мытье Фасадов',
  'Elektrik Servisi': 'Услуги Электрика',
  'Su Tesisatı Servisi': 'Услуги Сантехника',
  'Bakım Onarım': 'Ремонт и Обслуживание',
  'Montaj Servisi': 'Услуги по Установке'
};

function copyAndTranslate(sourceBase, targetLang, dict) {
  const targetBase = targetLang; // 'en' or 'ru'
  
  if (!fs.existsSync(targetBase)) {
    fs.mkdirSync(targetBase);
  }

  // Handle index.html specially to fix its links
  if (fs.existsSync('index.html')) {
     let content = fs.readFileSync('index.html', 'utf8');
     content = content.replace(/href=\"\/(?!assets)/g, `href="/${targetLang}/`);
     content = content.replace(/href=\"(?!http|\/|#)/g, `href="/${targetLang}/`);
     for (const [tr, val] of Object.entries(dict)) {
        content = content.replace(new RegExp(tr, 'g'), val);
     }
     fs.writeFileSync(`${targetBase}/index.html`, content);
  }

  for (const dir of dirsToClone) {
    if (!fs.existsSync(dir)) continue;
    
    const subFiles = walk(dir);
    for (const file of subFiles) {
      if (!file.endsWith('.html')) continue;
      
      const targetPath = path.join(targetBase, file);
      const targetDir = path.dirname(targetPath);
      
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      
      let content = fs.readFileSync(file, 'utf8');
      
      // Fix links for language root: href="/..." to href="/en/..." (except /assets)
      content = content.replace(/href=\"\/(?!assets)/g, `href="/${targetLang}/`);
      
      // Relative links like href="../" will stay relative, but if they are absolute we handle it.
      // Wait, in subpages, links like href="/lefkosa/" become href="/en/lefkosa/" which is perfect.

      // Translate dictionary strings
      for (const [tr, val] of Object.entries(dict)) {
        // escape special regex chars in tr if not done manually
        // We assume dictionary keys don't have dangerous regex chars except what we escaped
        content = content.replace(new RegExp(tr, 'g'), val);
      }
      
      fs.writeFileSync(targetPath, content);
    }
  }
}

console.log("Translating to EN...");
copyAndTranslate('.', 'en', enDict);
console.log("Translating to RU...");
copyAndTranslate('.', 'ru', ruDict);

console.log("Done.");
