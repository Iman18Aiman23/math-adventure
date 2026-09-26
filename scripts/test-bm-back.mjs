import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.argv[2] || 'playwright');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const url = process.env.TEST_URL || 'http://127.0.0.1:5185/math-adventure/';

try {
  for (const mode of ['tap', 'no-history-event', 'browser-back', 'desktop-click']) {
    const mobile = mode !== 'desktop-click';
    const page = await browser.newPage({ viewport: mobile ? { width: 390, height: 844 } : { width: 1366, height: 768 }, isMobile: mobile, hasTouch: mobile });
    await page.addInitScript(() => {
      if (!localStorage.getItem('mathAdventurePlayer')) {
        localStorage.setItem('mathAdventurePlayer', 'Tester');
        localStorage.setItem('mathAdventureNavigation:v1', JSON.stringify({
          activeTab: 'learn', currentSubject: 'bm-kssr', bmYear: 1,
          bmModule: 'mendengar', bmTopic: '1-1-1-mendengar-menyebut',
        }));
      }
    });
    await page.goto(url);
    const back = page.locator('.bm-header-back');
    await back.waitFor();
    if (mode === 'no-history-event') {
      // A UI back button must still work when history traversal produces no event.
      await page.evaluate(() => { window.history.back = () => {}; });
    }
    if (mode === 'browser-back') await page.goBack();
    else if (mobile) await back.tap();
    else await back.click();
    await back.waitFor({ state: 'detached', timeout: 5000 });
    assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('mathAdventureNavigation:v1')).bmTopic), null);
    assert.equal(await back.count(), 0);
    // The guard must still support device/browser Back after a header tap.
    await page.goBack();
    await page.waitForFunction(() => JSON.parse(localStorage.getItem('mathAdventureNavigation:v1')).bmModule === null);
    console.log(`PASS BM header ${mode}, then browser Back`);
    await page.close();
  }
} finally {
  await browser.close();
}
