// Usage: node scripts/test-welcome-responsive.mjs <directory containing playwright>
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
const require = createRequire(import.meta.url);
const { chromium } = require(process.argv[2] + '/playwright');
const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
mkdirSync('tmp/welcome-responsive.local', { recursive: true });
const errors = [];
const sizes = [[320,568],[360,640],[375,667],[390,844],[412,915],[430,932],
  [768,1024],[820,1180],[1024,768],[1280,720],[1366,768],[1440,900],[1920,1080],
  [2560,1440],[568,320],[667,375],[844,390],[1024,600]];
try {
  const page = await browser.newPage();
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('http://127.0.0.1:5173/math-adventure/');
  await page.locator('.wl-page').waitFor();
  for (const [width, height] of sizes) {
    await page.setViewportSize({ width, height });
    await page.evaluate(() => document.fonts.ready);
    await page.locator('.wl-art img').evaluate(img => img.decode());
    const issues = await page.evaluate(() => {
      const issues = [];
      for (const el of [document.documentElement, document.body, ...document.querySelectorAll('.wl-page, .wl-wrap, .wl-main, .wl-hero, .wl-card, .wl-login-column')]) {
        if (el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1) issues.push('overflow: ' + el.className);
      }
      for (const el of document.querySelectorAll('.wl-wrap *')) {
        if (el instanceof SVGElement || el.matches('br, source, option, .wl-hero-copy, .wl-remember input')) continue;
        // The supplied mobile reference omits desktop-only supporting content.
        if (innerWidth <= 600 && innerHeight >= innerWidth && el.closest('.wl-brand > p, .wl-header nav, .wl-benefits, .wl-art > p, .wl-card-heading')) continue;
        const r = el.getBoundingClientRect(), css = getComputedStyle(el);
        if (!r.width || !r.height || css.visibility === 'hidden' || css.opacity === '0') issues.push('hidden: ' + el.className);
        if (r.left < -1 || r.top < -1 || r.right > innerWidth + 1 || r.bottom > innerHeight + 1) issues.push('outside: ' + el.className);
      }
      const walker = document.createTreeWalker(document.querySelector('.wl-wrap'), NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        const node = walker.currentNode;
        if (!node.textContent.trim() || node.parentElement.closest('select, svg')) continue;
        const range = document.createRange(); range.selectNodeContents(node);
        for (const r of range.getClientRects()) {
          if (r.left < -1 || r.top < -1 || r.right > innerWidth + 1 || r.bottom > innerHeight + 1) issues.push('text outside: ' + node.textContent);
        }
      }
      const boxes = [...document.querySelectorAll('.wl-header, .wl-hero, .wl-login-column')].map(el => el.getBoundingClientRect());
      for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i], b = boxes[j];
        if (Math.min(a.right,b.right) - Math.max(a.left,b.left) > 1 && Math.min(a.bottom,b.bottom) - Math.max(a.top,b.top) > 1) issues.push('sections overlap');
      }
      return issues;
    });
    await page.screenshot({ path: `tmp/welcome-responsive.local/${width}x${height}.png` });
    assert.deepEqual(issues, [], `${width}x${height}`);
    const before = await page.locator('.wl-wrap').boundingBox();
    await page.locator('.wl-guest').click();
    assert.deepEqual(await page.locator('.wl-wrap').boundingBox(), before);
    assert.equal(await page.locator('.wl-wrap').evaluate(el => el.inert), true);
    const popup = await page.locator('.wl-guest-dialog').boundingBox();
    assert.ok(popup.y >= 0 && popup.y + popup.height <= height, 'Guest dialog fits');
    assert.equal(await page.locator('.wl-guest-dialog').evaluate(el => el.scrollHeight > el.clientHeight + 1), false);
    assert.equal(await page.locator('#wl-guest-name').evaluate(el => el === document.activeElement), true);
    await page.locator('#wl-guest-name').fill('Test');
    await page.locator('.wl-guest-form button').focus();
    await page.keyboard.press('Tab');
    assert.equal(await page.locator('.wl-guest-close').evaluate(el => el === document.activeElement), true);
    await page.locator('#wl-guest-name').fill('');
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.wl-guest').evaluate(el => el === document.activeElement), true);
    console.log(`${width}x${height}: bounds, visibility, scrolling and guest dialog passed`);
  }
  assert.equal(await page.locator('.wl-form input:not(:disabled), .wl-form button:not(:disabled), .wl-google:not(:disabled), .wl-facebook:not(:disabled), .wl-register button:not(:disabled)').count(), 0);
  await page.locator('.wl-guest').click();
  await page.locator('.wl-guest-close').click();
  assert.equal(await page.locator('.wl-guest-dialog').evaluate(el => el.open), false);
  await page.locator('.wl-guest').click();
  await page.mouse.click(2, 2);
  assert.equal(await page.locator('.wl-guest-dialog').evaluate(el => el.open), false);
  await page.locator('.wl-guest').click();
  assert.equal(await page.locator('.wl-guest-form button').isDisabled(), true);
  await page.locator('#wl-guest-name').fill('  Aina  ');
  await page.locator('.wl-guest-form button').click();
  await page.locator('.wl-page').waitFor({ state: 'detached' });
  assert.equal(await page.evaluate(() => localStorage.getItem('mathAdventurePlayer')), 'Aina');
  assert.equal(await page.locator('#root').evaluate(el => el.inert), false);
  await page.reload();
  await page.locator('.ih-root').waitFor();
  assert.equal(await page.locator('.wl-page').count(), 0);
  assert.deepEqual(errors, []);
  console.log('All 18 viewports, guest interactions/persistence and browser console passed.');
} finally { await browser.close(); }
