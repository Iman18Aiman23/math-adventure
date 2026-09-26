import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';

const require = createRequire(import.meta.url);
const { chromium } = require(process.argv[2] || 'playwright');
const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
const output = 'node_modules/.cache/subject-menus';
mkdirSync(output, { recursive: true });
const errors = [];
try {
  for (const [width, height] of [[320, 568], [390, 844], [540, 900], [844, 390], [1024, 768], [1366, 768]]) {
    let reference;
    for (const [subject, subGame, count] of [['math', 'datetime', 3], ['math', null, 4], ['reading', null, 5], ['bm', null, 5]]) {
      const page = await browser.newPage({ viewport: { width, height } });
      page.on('pageerror', error => errors.push(error.message));
      await page.addInitScript(({ subject, subGame }) => {
        localStorage.setItem('mathAdventurePlayer', 'Tester');
        localStorage.setItem('mathAdventureNavigation:v1', JSON.stringify({ activeTab: 'learn', currentSubject: subject, mathSubGame: subGame }));
      }, { subject, subGame });
      await page.goto('http://127.0.0.1:5183/math-adventure/');
      await page.locator('.mh-screen').waitFor();
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator('.mh-topic-card').count(), count);
      assert.equal(await page.locator('.subject-menu-footer').count(), 1);
      assert.equal(await page.locator('.cosmic-nav:visible').count(), width < 768 ? 1 : 0);
      assert.equal(await page.locator('.desktop-sidebar:visible').count(), width >= 768 ? 1 : 0);
      const metrics = await page.evaluate(() => {
        const select = s => document.querySelector(s);
        const rect = s => select(s).getBoundingClientRect();
        const style = s => getComputedStyle(select(s));
        const header = rect('.mh-header');
        const hero = rect('.mh-hero');
        const heading = rect('.mh-section-heading');
        const grid = rect('.mh-topic-grid');
        const view = select('.view-container');
        const signature = ['.mh-wrap', '.mh-header', '.mh-hero', '.mh-topic-card'].map(s => {
          const css = style(s);
          return [css.display, css.padding, css.borderRadius, css.fontFamily, css.columnGap];
        });
        signature.push([hero.x, hero.y, hero.width, hero.height, heading.y, heading.height, grid.y]);
        const firstCard = rect('.mh-topic-card');
        signature.push([firstCard.width, firstCard.height]);
        for (const card of document.querySelectorAll('.mh-topic-card')) {
          const bounds = card.getBoundingClientRect();
          if (Math.abs(bounds.height - firstCard.height) > 1 || Math.abs(bounds.width - firstCard.width) > 1) {
            throw new Error('Activity cards have different dimensions');
          }
        }
        return { signature, overflow: view.scrollWidth > view.clientWidth + 1,
          overlap: header.bottom > hero.top + 1 || heading.bottom > grid.top + 1,
          bodyOutside: grid.right > view.getBoundingClientRect().right + 1 };
      });
      assert(!metrics.overflow && !metrics.overlap && !metrics.bodyOutside, `${subject}/${subGame} ${width}: ${JSON.stringify(metrics)}`);
      reference ??= metrics.signature;
      assert.deepEqual(metrics.signature, reference, `${subject} ${width}: shared styles differ`);
      await page.screenshot({ path: `${output}/${subject}-${subGame || 'menu'}-${width}.png`, fullPage: true });
      await page.locator('.mh-topic-card').last().scrollIntoViewIfNeeded();
      if (subject === 'reading') {
        assert(await page.locator('.mh-topic-card').last().isEnabled());
        await page.locator('.mh-topic-card').last().click();
        await page.locator('.rg-journey').waitFor();
        await page.getByRole('button', { name: 'Kembali', exact: true }).click();
        await page.locator('.mh-screen').waitFor();
        await page.locator('.mh-topic-card').nth(2).click();
        await page.locator('.mh-screen').waitFor({ state: 'detached' });
        assert.equal(await page.locator('.subject-menu-footer').count(), 0);
        await page.evaluate(() => history.back());
        await page.locator('.mh-screen').waitFor();
        assert.equal(await page.locator('.subject-menu-footer').count(), 1);
        assert.equal(await page.locator('.view-container').evaluate(el => el.scrollTop), 0);
      } else if (subject === 'bm') {
        const image = await page.request.get('http://127.0.0.1:5183/math-adventure/images/speaking/sebutan-reference.png');
        assert(image.ok(), 'Speaking artwork is missing');
        await page.locator('.mh-menu-help summary').click();
        assert.equal(await page.locator('.mh-menu-help li:visible').count(), 3);
        await page.locator('.mh-menu-help summary').click();
        for (const [index, label] of [[0, 'Suku Kata KV'], [1, 'Suku Kata KVK'], [2, 'Long Vowels'], [3, 'Numbers 1'], [4, 'Common Objects']]) {
          await page.locator('.mh-topic-card').nth(index).click();
          await page.locator('.mh-screen').waitFor({ state: 'detached' });
          await page.getByText(label, { exact: false }).first().waitFor();
          assert.equal(await page.locator('.subject-menu-footer').count(), 0);
          await page.evaluate(() => history.back());
          await page.locator('.mh-screen').waitFor();
          assert.equal(await page.locator('.view-container').evaluate(el => el.scrollTop), 0);
          if (width !== 390) break;
        }
      } else if (!subGame) {
        await page.locator('.mh-topic-card').nth(2).click();
        await page.getByRole('heading', { name: 'Bulan & Masa', exact: true }).waitFor();
        await page.locator('.mh-back').click();
        await page.getByRole('heading', { name: 'Matematik', exact: true }).waitFor();
      }
      console.log(`${subject}/${subGame || 'menu'} ${width}x${height}: passed`);
      await page.close();
    }
  }
  const unsupported = await browser.newPage({ viewport: { width: 390, height: 844 } });
  unsupported.on('pageerror', error => errors.push(error.message));
  await unsupported.addInitScript(() => {
    Object.defineProperty(window, 'SpeechRecognition', { value: undefined, configurable: true });
    Object.defineProperty(window, 'webkitSpeechRecognition', { value: undefined, configurable: true });
    localStorage.setItem('mathAdventurePlayer', 'Tester');
    localStorage.setItem('mathAdventureNavigation:v1', JSON.stringify({ activeTab: 'learn', currentSubject: 'bm' }));
  });
  await unsupported.goto('http://127.0.0.1:5183/math-adventure/');
  await unsupported.locator('.mh-menu-notice').waitFor();
  assert.equal(await unsupported.locator('.mh-topic-card:disabled').count(), 5);
  assert(!await unsupported.locator('.mh-screen').innerText().then(text => text.includes('Segera Hadir')));
  await unsupported.close();
  console.log('Speaking unsupported-browser state: passed');
  assert.deepEqual(errors, []);
} finally {
  await browser.close();
}
