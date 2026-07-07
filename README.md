# Sanu Temizlik ve Ticaret Ltd.

Static multilingual website for Sanu Temizlik ve Ticaret Ltd., a Cyprus cleaning company based in Lefkoşa.

## Structure

- `index.html` - homepage
- `assets/css/styles.css` - custom styles on top of Tailwind CDN
- `assets/js/main.js` - language switcher, WhatsApp CTAs, request form, optional auto redirect
- `lefkosa/`, `girne/`, `gazi-magusa/`, `guzelyurt/` - city landing pages
- `lefkosa/ev-temizligi/` - example nested city/service page
- `templates/city-service.html` - reusable nested city/service template
- `landing/whatsapp/` - noindex landing page with 10-second WhatsApp auto redirect
- `robots.txt`, `sitemap.xml` - SEO crawl files

## Preview

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

Then open `http://127.0.0.1:4173/`.
