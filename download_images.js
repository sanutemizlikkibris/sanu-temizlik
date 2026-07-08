const fs = require('fs');
const https = require('https');
const path = require('path');

const htmlFile = 'index.html';
let content = fs.readFileSync(htmlFile, 'utf8');

const regex = /https:\/\/images\.unsplash\.com\/photo-([a-zA-Z0-9\-]+)\?[^"'\s]+/g;
let match;
const downloads = [];

while ((match = regex.exec(content)) !== null) {
  const url = match[0];
  const id = match[1];
  const filename = `photo-${id}.jpg`;
  const filepath = path.join('assets', 'img', filename);
  
  downloads.push({ url, id, filepath, filename });
}

// Remove duplicates
const uniqueDownloads = [];
const seen = new Set();
for (const d of downloads) {
  if (!seen.has(d.id)) {
    seen.add(d.id);
    uniqueDownloads.push(d);
  }
}

async function downloadAll() {
  for (const d of uniqueDownloads) {
    console.log(`Downloading ${d.url} to ${d.filepath}...`);
    await new Promise((resolve, reject) => {
      https.get(d.url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          // Follow redirect
          https.get(res.headers.location, (res2) => {
            const file = fs.createWriteStream(d.filepath);
            res2.pipe(file);
            file.on('finish', () => { file.close(); resolve(); });
          });
        } else {
          const file = fs.createWriteStream(d.filepath);
          res.pipe(file);
          file.on('finish', () => { file.close(); resolve(); });
        }
      }).on('error', reject);
    });
    
    // Replace in content
    const urlRegex = new RegExp(`https://images\\.unsplash\\.com/photo-${d.id}\\?[^"'\\s]*`, 'g');
    content = content.replace(urlRegex, `assets/img/${d.filename}`);
  }
  
  fs.writeFileSync(htmlFile, content);
  console.log('All images downloaded and index.html updated.');
}

downloadAll().catch(console.error);
