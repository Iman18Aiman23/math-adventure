import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
const require = createRequire(import.meta.url);
const { chromium } = require(process.argv[2] || 'playwright');
const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
const output = 'node_modules/.cache/leaderboard-checks';
mkdirSync(output, { recursive: true });
const errors = [];
try {
 const page = await browser.newPage();
 page.on('pageerror', e => errors.push(e.message));
 await page.addInitScript(() => {
  localStorage.setItem('mathAdventurePlayer', 'ImanAI');
  localStorage.setItem('mathAdventureNavigation:v1', JSON.stringify({ activeTab: 'leaderboard' }));
 });
 await page.goto('http://127.0.0.1:5173/math-adventure/');
 await page.locator('.lb-table').waitFor();
 await page.evaluate(() => document.fonts.ready);
 for (const [width, height] of [[320,568],[390,844],[430,932],[768,1024],[941,1672],[1024,768],[1366,768],[1586,992],[1920,1080]]) {
  await page.setViewportSize({width,height});
  await page.waitForTimeout(100);
  const overflow = await page.evaluate(() => [...document.querySelectorAll('.lb-wrap,.lb-hero,.lb-subject,.lb-podium,.lb-table-wrap,.lb-table th,.lb-table td')].filter(e => e.clientWidth && e.scrollWidth > e.clientWidth + 2).map(e => [e.className, e.textContent,e.clientWidth,e.scrollWidth]));
  assert.deepEqual(overflow, [], `${width}px overflow`);
  if (width < 768) assert.equal(await page.locator('.subject-menu-footer .cosmic-nav').isVisible(), true);
  assert.equal(await page.locator('.lb-table tbody tr').count(), 7);
  await page.screenshot({path: `${output}/${width}.png`, fullPage: true});
 }
 await page.setViewportSize({width:390,height:844});
 await page.locator('.lb-subject-math').click();
 assert.equal(await page.locator('.lb-subject-math').getAttribute('aria-pressed'),'true');
 assert.match(await page.locator('.lb-demo-note').textContent(),/Matematik|Mathematics/);
 await page.locator('.lb-shell .ih-account').click();
 await page.locator('.ih-account-menu').waitFor();
 await page.keyboard.press('Escape');
 assert.equal(await page.locator('.ih-account-menu').count(),0);
 assert.deepEqual(errors,[]);
 console.log('Leaderboard responsive widths, subject selection, mobile menu, account dismissal and runtime checks passed.');
} finally { await browser.close(); }
