// Usage: node scripts/test-welcome.mjs <directory containing playwright>
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
const require = createRequire(import.meta.url);
const { chromium } = require(process.argv[2] + '/playwright');
const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
mkdirSync('tmp/welcome-checks', { recursive: true });
const errors = [];
try {
  const page = await browser.newPage();
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:5173/math-adventure/');
  await page.locator('.wl-page').waitFor();
  for (const [width, height] of [[1920, 1080], [1536, 1024], [1366, 768], [1280, 600], [1024, 768], [1024, 1536], [768, 1024], [728, 885], [390, 844], [375, 667], [320, 568], [320, 480], [844, 390], [667, 375], [568, 320]]) {
    await page.setViewportSize({ width, height });
    await page.evaluate(() => document.fonts.ready);
    await page.locator('.wl-art img').evaluate(img => img.decode());
    assert.equal(await page.locator('.wl-page').evaluate(el => el.scrollWidth > el.clientWidth), false, 'No horizontal overflow at ' + width);
    assert.equal(await page.locator('.wl-page').evaluate(el => el.scrollHeight > el.clientHeight + 1), false, 'No vertical overflow at ' + width + 'x' + height);
    assert.equal(await page.locator('#root').evaluate(el => el.inert), true);
    const controlsOutside = await page.locator('.wl-page button, .wl-page input, .wl-page select').evaluateAll(elements => elements.filter(el => {
      if (!el.getClientRects().length) return false;
      const r = el.getBoundingClientRect();
      return r.left < -1 || r.right > innerWidth + 1 || r.top < -1 || r.bottom > innerHeight + 1;
    }).map(el => el.textContent));
    assert.deepEqual(controlsOutside, [], 'Controls fit at ' + width);
    if (width <= 900 || (width <= 1100 && height > width)) {
      const wrap = await page.locator('.wl-wrap').boundingBox();
      assert.ok(Math.abs(wrap.y + wrap.height / 2 - height / 2) < 2, 'Mobile content vertically centred at ' + width);
      if (height > width) {
        const language = await page.locator('.wl-language').boundingBox();
        assert.ok(Math.abs(language.y - 16) < 1, 'Mobile language button pinned to top');
        assert.ok(Math.abs(width - language.x - language.width - 16) < 1, 'Mobile language button pinned to right');
      }
    }
    await page.screenshot({ path: 'tmp/welcome-checks/' + width + 'x' + height + '.png' });
    for (const selector of ['.wl-guest', '.wl-google']) {
      const before = await page.locator('.wl-wrap').boundingBox();
      await page.locator(selector).click();
      assert.equal(await page.locator('.wl-page').evaluate(el => el.scrollHeight > el.clientHeight + 1), false, 'Expanded state fits at ' + width + 'x' + height);
      if (selector === '.wl-guest') {
        assert.deepEqual(await page.locator('.wl-wrap').boundingBox(), before, 'Guest popup does not move or resize page');
        assert.equal(await page.locator('.wl-wrap').evaluate(el => el.inert), true);
        const popup = await page.locator('.wl-guest-dialog').boundingBox();
        assert.ok(popup.y >= 0 && popup.y + popup.height <= height, 'Popup fits viewport');
        assert.equal(await page.locator('.wl-guest-dialog').evaluate(el => el.scrollHeight > el.clientHeight + 1), false, 'Popup does not scroll');
        await page.locator('.wl-guest-dialog .wl-primary').focus();
        await page.locator('#wl-guest-name').fill('Test');
        await page.locator('.wl-guest-dialog .wl-primary').focus();
        await page.keyboard.press('Tab');
        assert.equal(await page.locator('.wl-guest-close').evaluate(el => el === document.activeElement), true, 'Popup traps focus');
        await page.locator('#wl-guest-name').fill('');
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('.wl-guest').evaluate(el => el === document.activeElement), true, 'Closing restores guest button focus');
        assert.deepEqual(await page.locator('.wl-wrap').boundingBox(), before);
      }
      else await page.locator('.wl-notice button').click();
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('.wl-language select').selectOption('en');
  assert.equal(await page.locator('#wl-title').innerText(), 'Welcome!');
  await page.getByLabel('Password', { exact: true }).fill('not-a-real-password');
  await page.getByRole('button', { name: 'Show password' }).click();
  assert.equal(await page.getByLabel('Password', { exact: true }).getAttribute('type'), 'text');
  await page.getByRole('button', { name: 'Hide password' }).click();
  await page.getByRole('checkbox').uncheck();
  assert.equal(await page.getByRole('checkbox').isChecked(), false);
  for (const selector of ['.wl-form .wl-primary', '.wl-google', '.wl-facebook', '.wl-register button', '.wl-link']) {
    await page.locator(selector).click();
    assert.match(await page.locator('.wl-notice').innerText(), /not available yet/);
    assert.equal(await page.evaluate(() => localStorage.getItem('mathAdventurePlayer')), null);
    await page.locator('.wl-notice button').click();
  }
  const storage = await page.evaluate(() => JSON.stringify({ ...localStorage }));
  assert.equal(storage.includes('not-a-real-password'), false);
  await page.locator('.wl-guest').click();
  await page.locator('.wl-guest-close').click();
  assert.equal(await page.locator('.wl-guest-dialog').evaluate(el => el.open), false);
  await page.locator('.wl-guest').click();
  await page.mouse.click(2, 2);
  assert.equal(await page.locator('.wl-guest-dialog').evaluate(el => el.open), false, 'Backdrop closes popup');
  await page.locator('.wl-guest').click();
  assert.equal(await page.locator('#wl-guest-name').evaluate(el => el === document.activeElement), true);
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
  console.log('Welcome: 15 viewports, mobile centring, stable guest popup layout, popup focus/close, no scrolling and guest persistence passed.');
} finally {
  await browser.close();
}
