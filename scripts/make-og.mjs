// Собирает public/og.png из SVG. Запуск: yarn og
import sharp from 'sharp'

const grid = Array.from({ length: 25 }, (_, i) => `<path d="M${i * 50} 0V630" stroke="#e18246" stroke-opacity=".3"/>`).join('')
  + Array.from({ length: 13 }, (_, i) => `<path d="M0 ${i * 50}H1200" stroke="#e18246" stroke-opacity=".3"/>`).join('')

const line = (text, y, size, italic) => `
  <text x="70" y="${y}" font-family="Georgia, serif" font-weight="900" font-size="${size}" ${italic ? 'font-style="italic"' : ''} fill="#f7cb3f" stroke="#f7cb3f" stroke-width="16" stroke-linejoin="round">${text}</text>
  <text x="70" y="${y}" font-family="Georgia, serif" font-weight="900" font-size="${size}" ${italic ? 'font-style="italic"' : ''} fill="#2a1930">${text}</text>
  <text x="70" y="${y}" font-family="Georgia, serif" font-weight="900" font-size="${size}" ${italic ? 'font-style="italic"' : ''} fill="none" stroke="#ab1049" stroke-width="2" stroke-dasharray="7 5">${text}</text>`

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#fff9ec"/>${grid}
  <rect width="1200" height="40" fill="#f7cb3f"/>
  ${line('Шью косплей.', 250, 136, false)}
  ${line('Считаю производство.', 410, 104, true)}
  <text x="74" y="530" font-family="Helvetica, Arial, sans-serif" font-size="38" fill="#2a1930">Анна Швецова, швея-технолог</text>
</svg>`

await sharp(Buffer.from(svg)).png({ compressionLevel: 9, palette: true }).toFile('public/og.png')
