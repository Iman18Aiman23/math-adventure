// Re-encode generated artwork as WebP, preserving transparency.
// Usage: node scripts/prepare-home-art.mjs <playwright parent> <generated PNG>
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
const require = createRequire(import.meta.url);
const { chromium } = require(`${process.argv[2]}/playwright`);
const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
try {
  const page = await browser.newPage();
  for (const [source, target, maxWidth] of [
    [process.argv[3], 'public/images/home/robots.webp', 1776],
    ['public/brand/imanai-horizontal.png', 'public/brand/imanai-horizontal.webp', 868],
  ]) {
    const png = readFileSync(source);
    const result = await page.evaluate(async ({ data, maxWidth }) => {
      const image = new Image();
      image.src = `data:image/png;base64,${data}`;
      await image.decode();
      const canvas = document.createElement('canvas');
      canvas.width = Math.min(image.width, maxWidth);
      canvas.height = Math.round(canvas.width * image.height / image.width);
      canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
      return { data: canvas.toDataURL('image/webp', .86).split(',')[1], width: canvas.width, height: canvas.height };
    }, { data: png.toString('base64'), maxWidth });
    mkdirSync(target.slice(0, target.lastIndexOf('/')), { recursive: true });
    const webp = Buffer.from(result.data, 'base64');
    writeFileSync(target, webp);
    console.log(`${target}: ${result.width}x${result.height}, ${Math.round(webp.length / 1024)} KB (source ${Math.round(png.length / 1024)} KB)`);
  }
} finally { await browser.close(); }
