import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.argv[2] || 'playwright');
const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
try {
  for (const [width, height] of [[320, 480], [320, 568], [390, 844], [568, 320], [667, 375], [844, 390], [768, 1024], [1366, 768]]) {
    const page = await browser.newPage({ viewport: { width, height } });
    await page.addInitScript(() => {
      localStorage.setItem('mathAdventurePlayer', 'Tester');
      localStorage.setItem('mathAdventureNavigation:v1', JSON.stringify({ activeTab: 'learn', currentAgeGroup: '4-6', currentAgeGame: 'alphabet-cards' }));
    });
    await page.goto('http://127.0.0.1:5185/math-adventure/');
    await page.locator('.kv-letter-tile').first().click();
    await page.evaluate(() => document.fonts.ready);
    for (const script of ['RUMI', 'ENG', 'JAWI']) {
      await page.locator('.kv-settings summary').click();
      await page.getByRole('button', { name: script, exact: true }).click();
      const errors = await page.evaluate(() => {
        const errors = [];
        for (const selector of ['.view-container', '.kv-learning', '.kv-learning-body', '.kv-flashcard']) {
          const el = document.querySelector(selector);
          if (el.scrollHeight > el.clientHeight + 2 || el.scrollWidth > el.clientWidth + 2) errors.push(selector + ' overflows');
        }
        for (const selector of ['.kv-flashcard', '.kv-listen', '.kv-learning-footer']) {
          const r = document.querySelector(selector).getBoundingClientRect();
          if (r.top < 0 || r.bottom > innerHeight + 1 || r.left < 0 || r.right > innerWidth + 1) errors.push(selector + ' outside viewport');
        }
        return errors;
      });
      assert.deepEqual(errors, [], `${width}x${height} ${script}: ${errors}`);
    }
    await page.locator('.kv-settings summary').click();
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.kv-settings').getAttribute('open'), null);
    console.log(`PASS ${width}x${height} all scripts`);
    await page.close();
  }
} finally { await browser.close(); }
