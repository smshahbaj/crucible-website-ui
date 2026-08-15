import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, 'public');

const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#180b2d"/>
      <stop offset="50%" stop-color="#0a0514"/>
      <stop offset="100%" stop-color="#05020a"/>
    </linearGradient>
    <linearGradient id="eyeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="35%" stop-color="#f0abfc"/>
      <stop offset="70%" stop-color="#c084fc"/>
      <stop offset="100%" stop-color="#9333ea"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="120" fill="url(#bgGrad)"/>
  <rect x="12" y="12" width="488" height="488" rx="108" fill="none" stroke="#c084fc" stroke-width="4" stroke-opacity="0.35"/>
  <path d="M140 175 C190 175,190 225,256 225 C322 225,322 175,372 175 C385 255,350 365,256 385 C162 365,127 255,140 175 Z" fill="url(#eyeGrad)"/>
  <path d="M256 115 C280 150,285 180,256 205 C227 180,232 150,256 115 Z" fill="#0a0514"/>
  <circle cx="256" cy="280" r="24" fill="#0a0514"/>
  <circle cx="248" cy="272" r="8" fill="#fff"/>
</svg>`;

const svgOGImage = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#080312"/>
  <rect x="24" y="24" width="1152" height="582" rx="24" fill="none" stroke="#a855f7" stroke-width="2" stroke-opacity=".25"/>
  <text x="90" y="180" font-family="Arial,sans-serif" font-weight="900" font-size="68" fill="#fff">CRUCIBLE</text>
  <text x="90" y="225" font-family="Arial,sans-serif" font-weight="700" font-size="20" fill="#c084fc">ADAPTIVE DECISION PRESSURE-TESTING</text>
  <text x="90" y="290" font-family="Arial,sans-serif" font-size="34" fill="#fff">for Claude Code</text>
  <text x="90" y="350" font-family="Arial,sans-serif" font-size="21" fill="#d4d4d8">Second-opinion decision review with adaptive specialist lenses.</text>
  <text x="1100" y="575" font-family="monospace" font-weight="700" font-size="20" fill="#c084fc" text-anchor="end">crucible.smshahbaj.com</text>
</svg>`;

function pngToIco(pngBuffers) {
  // ICO directory with PNG payloads. Valid ICO readers accept PNG-compressed frames.
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);

  const entries = [];
  let offset = 6 + count * 16;
  for (const { width, height, data } of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(width === 256 ? 0 : width, 0);
    entry.writeUInt8(height === 256 ? 0 : height, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += data.length;
  }
  return Buffer.concat([header, ...entries, ...pngBuffers.map(x => x.data)]);
}

async function pngFromSvg(size) {
  return sharp(Buffer.from(svgFavicon))
    .resize(size, size, { fit: 'cover' })
    .png()
    .toBuffer();
}

async function build() {
  fs.mkdirSync(PUBLIC, { recursive: true });

  fs.writeFileSync(path.join(PUBLIC, 'favicon.svg'), svgFavicon);

  const sizes = [16, 32, 48, 192, 512];
  for (const size of sizes) {
    const data = await pngFromSvg(size);
    if (size === 16 || size === 32) {
      fs.writeFileSync(path.join(PUBLIC, `favicon-${size}x${size}.png`), data);
    }
    if (size === 192 || size === 512) {
      fs.writeFileSync(path.join(PUBLIC, `android-chrome-${size}x${size}.png`), data);
    }
  }

  const apple = await pngFromSvg(180);
  fs.writeFileSync(path.join(PUBLIC, 'apple-touch-icon.png'), apple);

  const icoFrames = [];
  for (const size of [16, 32, 48]) {
    icoFrames.push({ width: size, height: size, data: await pngFromSvg(size) });
  }
  fs.writeFileSync(path.join(PUBLIC, 'favicon.ico'), pngToIco(icoFrames));

  // Keep the existing high-quality production OG image if present.
  // This generator must never replace it with a lower-fidelity fallback.
  const ogPath = path.join(PUBLIC, 'og-image.png');
  if (!fs.existsSync(ogPath)) {
    await sharp(Buffer.from(svgOGImage)).png().toFile(ogPath);
  }

  console.log('Favicon/manifest assets generated; existing OG image preserved.');
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
