// Browser regression checks: viewport fit, reachable actions, and existing routes.
// Usage: node scripts/test-homepage.mjs <directory containing playwright> [--layout-only]
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
const require = createRequire(import.meta.url);
const { chromium } = require(`${process.argv[2]}/playwright`);
const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
const output = 'tmp/homepage-checks';
mkdirSync(output, { recursive: true });
const errors = [];
const failures = [];
const url = 'http://127.0.0.1:5173/math-adventure/';
try {
  const page = await browser.newPage();
  page.on('pageerror', error => errors.push(error.message));
  await page.addInitScript(() => {
    localStorage.setItem('mathAdventurePlayer', 'Iman');
    localStorage.removeItem('mathAdventureNavigation:v1');
  });
  await page.goto(url);
  await page.locator('.ih-root').waitFor();
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => [...document.images].every(image => image.complete));
  await page.evaluate(async () => { const img = new Image(); img.src = '/math-adventure/images/home/robots.webp'; await img.decode(); });

  for (const [width, height] of [[1366, 768], [1440, 900], [1920, 1080], [1108, 1024], [1280, 720], [1280, 540], [1024, 600], [1024, 768], [768, 1024], [900, 600], [800, 600], [320, 568], [375, 667], [390, 844], [430, 932]]) {
    await page.setViewportSize({ width, height });
    await page.waitForTimeout(180);
    const dimensions = await page.evaluate(() => {
      const nodes = ['html', 'body', '#root', '.view-container', '.ih-root', '.desktop-sidebar', '.home-quick-nav'];
      return nodes.flatMap(selector => {
        const node = document.querySelector(selector);
        if (!node || !node.getClientRects().length) return [];
        return [{ selector, width: node.clientWidth, scrollWidth: node.scrollWidth, height: node.clientHeight, scrollHeight: node.scrollHeight }];
      });
    });
    for (const d of dimensions) {
      if (d.scrollWidth > d.width + 2) failures.push(`${width}x${height}: horizontal overflow ${JSON.stringify(d)}`);
      if (width >= 768 && d.scrollHeight > d.height + 2) failures.push(`${width}x${height}: vertical overflow ${JSON.stringify(d)}`);
    }
    const outOfBounds = await page.locator('.ih-subject, .ih-age').evaluateAll(nodes => nodes.filter(node => {
      const r = node.getBoundingClientRect();
      return r.left < 0 || r.right > innerWidth + 1 || (innerWidth >= 768 && r.bottom > innerHeight + 1);
    }).map(node => node.textContent));
    if (outOfBounds.length) failures.push(`${width}x${height}: clipped cards ${outOfBounds.join(', ')}`);
    await page.screenshot({ path: `${output}/${width}x${height}.png`, fullPage: true });
    console.log(`${width}x${height}: viewport checked`);
    assert.equal(await page.locator('.ih-subject').count(), 7);
    assert.equal(await page.locator('.ih-age').count(), 4);
  }

  // Mobile's last age card must scroll above the fixed navigation.
  await page.locator('.ih-age').last().scrollIntoViewIfNeeded();
  const lastAge = await page.locator('.ih-age').last().boundingBox();
  const mobileNav = await page.locator('.ih-mobile-nav').boundingBox();
  if (lastAge.y + lastAge.height > mobileNav.y) failures.push('Mobile bottom navigation covers the last age card');
  await page.locator('.ih-mobile-settings').click();
  await page.locator('.ih-language').getByRole('button', { name: 'English', exact: true }).click();
  await page.keyboard.press('Escape');
  assert.match(await page.locator('.ih-hero h1').innerText(), /Hey, Iman/);
  await page.locator('.ih-points').click();
  await page.getByRole('heading', { name: 'Weekly progress' }).waitFor();
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.ih-popover').count(), 0);
  await page.screenshot({ path: `${output}/mobile-english.png` });

  if (!process.argv.includes('--layout-only')) {
    await page.setViewportSize({ width: 1366, height: 768 });
    for (const id of ['reading', 'bm', 'math', 'pendidikan-islam-v1', 'matematik-kssr', 'bm-kssr']) {
      await page.locator(`.ih-subject[aria-labelledby="ih-title-${id}"]`).click();
      await page.waitForFunction(expected => JSON.parse(localStorage.getItem('mathAdventureNavigation:v1'))?.currentSubject === expected, id);
      await page.goto(url);
      await page.locator('.ih-root').waitFor();
    }
    await page.locator('.ih-subject--robot').click();
    await page.locator('.ih-robot-interface').waitFor();
    await page.locator('.ih-return').click();
    await page.locator('.ih-root').waitFor();
    for (let i = 0; i < 4; i++) {
      await page.locator('.ih-age').nth(i).click();
      await page.waitForFunction(expected => JSON.parse(localStorage.getItem('mathAdventureNavigation:v1'))?.currentAgeGroup === expected, ['age-4-6', 'age-7', 'age-8', 'age-9'][i]);
      await page.goto(url);
      await page.locator('.ih-root').waitFor();
    }
    await page.locator('.ih-account').click();
    await page.locator('.ih-themes button').last().click();
    assert.equal(await page.locator('.ih-themes button').last().getAttribute('aria-pressed'), 'true');
    await page.locator('.ih-profile-link').click();
    await page.waitForFunction(() => JSON.parse(localStorage.getItem('mathAdventureNavigation:v1'))?.activeTab === 'profile');
    await page.setViewportSize({ width: 390, height: 844 });
    for (const tab of ['leaderboard', 'achievement', 'profile']) {
      await page.goto(url);
      await page.locator('.ih-root').waitFor();
      await page.locator('.ih-mobile-nav button').nth({ leaderboard: 2, achievement: 3, profile: 4 }[tab]).click();
      await page.waitForFunction(expected => JSON.parse(localStorage.getItem('mathAdventureNavigation:v1'))?.activeTab === expected, tab);
    }
  }
  // Touch landscape uses the mobile layout despite its wider viewport.
  const landscape = await browser.newPage({ viewport: { width: 844, height: 390 }, isMobile: true, hasTouch: true });
  await landscape.addInitScript(() => localStorage.setItem('mathAdventurePlayer', 'Nur Muhammad Iman Abdullah'));
  await landscape.goto(url);
  await landscape.locator('.ih-root').waitFor();
  assert.equal(await landscape.locator('.desktop-sidebar').isVisible(), false);
  assert.equal(await landscape.locator('.ih-mobile-nav').isVisible(), true);
  assert.equal(await landscape.locator('.ih-root').evaluate(node => node.scrollWidth <= node.clientWidth), true);
  await landscape.locator('.ih-age').last().scrollIntoViewIfNeeded();
  const landscapeCard = await landscape.locator('.ih-age').last().boundingBox();
  const landscapeNav = await landscape.locator('.ih-mobile-nav').boundingBox();
  assert.ok(landscapeCard.y + landscapeCard.height <= landscapeNav.y);
  await landscape.screenshot({ path: `${output}/touch-landscape.png` });
  await landscape.close();
  assert.deepEqual(errors, [], 'No browser runtime errors');
  assert.deepEqual(failures, [], 'Responsive layout checks');
  console.log('Homepage viewport, language, progress, and navigation checks passed.');
} finally { await browser.close(); }
