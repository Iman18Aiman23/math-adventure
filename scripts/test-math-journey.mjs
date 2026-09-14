import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { existsSync } from 'node:fs';

const playwrightRoot = process.argv[2];
const baseUrl = process.argv[3] || 'http://127.0.0.1:5173/math-adventure/';
const require = createRequire(import.meta.url);
const { chromium } = playwrightRoot
  ? require(`${playwrightRoot}/playwright`)
  : require('playwright');

if (playwrightRoot) {
  process.env.NODE_PATH = playwrightRoot;
}

const VIEWPORTS = [
  [320, 568],
  [360, 640],
  [375, 667],
  [390, 844],
  [412, 915],
  [430, 932],
  [768, 1024],
  [820, 1180],
  [1024, 1366],
  [1280, 720],
  [1366, 768],
  [1440, 900],
  [1920, 1080],
  [812, 375],
];

const NAV_STATE = {
  activeTab: 'learn',
  currentSubject: 'math',
  mathSubGame: null,
  dateTimeSubGame: null,
  isPlaying: false,
  gameConfig: { operation: 'add', difficulty: 'easy', nums: [], quizType: 'multiple' },
  selectedAssessmentId: null,
  currentAgeGroup: null,
  currentAgeGame: null,
  islamModule: null,
  islamTopic: null,
  islamYear: 1,
  matematikModule: null,
  matematikTopic: null,
  matematikYear: 1,
  bmModule: null,
  bmTopic: null,
  bmYear: 1,
};

async function prepare(page, resetJourney = true) {
  await page.addInitScript(({ nav, reset }) => {
    localStorage.setItem('mathAdventurePlayer', 'Tester');
    localStorage.setItem('mathAdventureNavigation:v1', JSON.stringify(nav));
    localStorage.setItem('gameData', JSON.stringify({ hearts: 3, maxHearts: 3, gems: 0, stars: 0, streak: 0 }));
    if (reset && !sessionStorage.getItem('mathJourneyResetDone')) {
      localStorage.removeItem('mathJourneyProgress');
      sessionStorage.setItem('mathJourneyResetDone', '1');
    }
  }, { nav: NAV_STATE, reset: resetJourney });
}

async function assertNoOverflow(page, label) {
  const result = await page.evaluate(() => {
    const root = document.documentElement;
    const body = document.body;
    const view = document.querySelector('.view-container');
    const screen = document.querySelector('.mj-screen, .mh-screen');
    const card = document.querySelector('.mj-panel, .mh-wrap');
    const rect = card?.getBoundingClientRect();
    return {
      htmlX: root.scrollWidth - root.clientWidth,
      htmlY: root.scrollHeight - root.clientHeight,
      bodyX: body.scrollWidth - body.clientWidth,
      bodyY: body.scrollHeight - body.clientHeight,
      viewX: view ? view.scrollWidth - view.clientWidth : 0,
      viewY: view ? view.scrollHeight - view.clientHeight : 0,
      screenX: screen ? screen.scrollWidth - screen.clientWidth : 0,
      screenY: screen ? screen.scrollHeight - screen.clientHeight : 0,
      rect,
      viewport: { w: root.clientWidth, h: root.clientHeight },
    };
  });
  const tolerance = 2;
  assert.ok(result.htmlX <= tolerance, `${label}: document horizontal overflow ${JSON.stringify(result)}`);
  assert.ok(result.htmlY <= tolerance, `${label}: document vertical overflow ${JSON.stringify(result)}`);
  assert.ok(result.bodyX <= tolerance, `${label}: body horizontal overflow ${JSON.stringify(result)}`);
  assert.ok(result.bodyY <= tolerance, `${label}: body vertical overflow ${JSON.stringify(result)}`);
  assert.ok(result.viewX <= tolerance, `${label}: view horizontal overflow ${JSON.stringify(result)}`);
  assert.ok(result.viewY <= tolerance, `${label}: view vertical overflow ${JSON.stringify(result)}`);
  assert.ok(result.screenX <= tolerance, `${label}: screen horizontal overflow ${JSON.stringify(result)}`);
  assert.ok(result.screenY <= tolerance, `${label}: screen vertical overflow ${JSON.stringify(result)}`);
  if (result.rect) {
    assert.ok(result.rect.left >= -tolerance, `${label}: panel leaves left viewport ${JSON.stringify(result)}`);
    assert.ok(result.rect.right <= result.viewport.w + tolerance, `${label}: panel leaves right viewport ${JSON.stringify(result)}`);
    assert.ok(result.rect.top >= -tolerance, `${label}: panel leaves top viewport ${JSON.stringify(result)}`);
    assert.ok(result.rect.bottom <= result.viewport.h + tolerance, `${label}: panel leaves bottom viewport ${JSON.stringify(result)}`);
  }
}

async function openJourney(page) {
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /Math Journey/i }).click();
  await page.locator('.mj-screen').waitFor({ state: 'visible' });
}

async function goToFirstChallenge(page) {
  await page.getByRole('button', { name: /Unit 1/i }).click();
  await page.getByRole('button', { name: /Tambah 1-5/i }).click();
  await page.getByRole('button', { name: /Mula Cabaran/i }).click();
  await page.locator('.mj-challenge').waitFor({ state: 'visible' });
}

async function answerCurrent(page, correct) {
  const data = await page.evaluate((shouldPickCorrect) => {
    const expression = document.querySelector('.mj-expression')?.textContent || '';
    const values = [...document.querySelectorAll('.mj-option b')].map(el => Number(el.textContent));
    const match = expression.match(/(\d+)\s*([+\-x÷])\s*(\d+)/);
    if (!match) throw new Error(`Cannot parse expression: ${expression}`);
    const a = Number(match[1]);
    const op = match[2];
    const b = Number(match[3]);
    const answer = op === '+' ? a + b : op === '-' ? a - b : op === 'x' ? a * b : Math.floor(a / b);
    const pick = shouldPickCorrect ? answer : values.find(value => value !== answer);
    return { pick };
  }, correct);
  await page.locator('.mj-option').filter({ hasText: String(data.pick) }).first().click();
  await page.locator('.mj-answer-feedback').waitFor({ state: 'visible' });
}

async function continueQuestion(page) {
  await page.getByRole('button', { name: /Soalan Seterusnya|Lihat Keputusan/i }).click();
}

async function fullFlowCheck(page) {
  await openJourney(page);
  await assertNoOverflow(page, 'overview full flow');
  await page.getByRole('button', { name: /Unit 2/i }).click({ trial: true }).catch(() => {});
  await goToFirstChallenge(page);
  await assertNoOverflow(page, 'challenge full flow');

  await answerCurrent(page, false);
  await continueQuestion(page);
  const emptyLives = await page.locator('.mj-lives:visible .is-empty').count();
  assert.equal(emptyLives, 1, 'wrong answer should remove one challenge life');

  for (let i = 1; i < 10; i += 1) {
    await answerCurrent(page, true);
    await continueQuestion(page);
  }

  await page.locator('.mj-result').waitFor({ state: 'visible' });
  await assertNoOverflow(page, 'result full flow');
  await page.getByRole('button', { name: /Teruskan/i }).click();
  await page.locator('.mj-unit-page').waitFor({ state: 'visible' });
  await expectText(page, /Tambah 1-10/);
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('mathJourneyProgress')));
  assert.ok(saved.completedLevels['u1-l1']?.completed, 'passing level should persist completion');
  assert.equal(saved.completedLevels['u1-l1']?.stars, 3, '90% score should store three-star best reward');
  assert.equal(saved.totalDiamonds, 1, '90% score should store one diamond once');

  await page.reload({ waitUntil: 'networkidle' });
  if (await page.locator('.mj-screen').count() === 0) {
    await page.getByRole('button', { name: /Math Journey/i }).click();
  }
  await page.locator('.mj-screen').waitFor({ state: 'visible' });
  const reloaded = await page.evaluate(() => JSON.parse(localStorage.getItem('mathJourneyProgress')));
  assert.ok(reloaded.completedLevels['u1-l1']?.completed, 'reload should preserve completed level');
  if (await page.locator('.mj-overview').count()) {
    await page.getByRole('button', { name: /Unit 1/i }).click();
  }
  await expectText(page, /Tambah 1-10/);
}

async function expectText(page, pattern) {
  await page.getByText(pattern).first().waitFor({ state: 'visible' });
}

async function responsiveCheck(page, width, height) {
  await page.setViewportSize({ width, height });
  await openJourney(page);
  await assertNoOverflow(page, `overview ${width}x${height}`);
  assert.equal(await page.locator('.cosmic-nav').isVisible(), width < 768, 'Journey menu should be visible only on mobile overview');
  if (width < 768) {
    const menu = await page.locator('.cosmic-nav').boundingBox();
    const body = await page.locator('.mj-screen').boundingBox();
    assert.ok(body.y + body.height <= menu.y + 2, 'menu must not cover Journey content');
    assert.equal(await page.locator('.cosmic-nav button').count(), 5, 'mobile menu should expose all five destinations');
  }
  await page.getByRole('button', { name: /Unit 1/i }).click();
  assert.equal(await page.locator('.cosmic-nav').isVisible(), false, 'menu should be hidden inside a unit');
  await assertNoOverflow(page, `unit ${width}x${height}`);
  await page.getByRole('button', { name: /Tambah 1-5/i }).click();
  await assertNoOverflow(page, `info ${width}x${height}`);
  await page.getByRole('button', { name: /Mula Cabaran/i }).click();
  await assertNoOverflow(page, `challenge ${width}x${height}`);
  await page.getByRole('button', { name: 'Kembali', exact: true }).click();
  const dialog = page.getByRole('dialog');
  await dialog.waitFor({ state: 'visible' });
  assert.equal(await page.getByRole('button', { name: 'Teruskan cabaran', exact: true }).evaluate(el => el === document.activeElement), true, 'dialog should focus the continue action');
  await page.keyboard.press('Escape');
  await dialog.waitFor({ state: 'hidden' });
  assert.equal(await page.locator('.mj-challenge').isVisible(), true, 'Escape should preserve the challenge');
  await page.evaluate(() => history.back());
  await dialog.waitFor({ state: 'visible' });
  await page.getByRole('button', { name: 'Keluar cabaran', exact: true }).click();
  await page.locator('.mj-info').waitFor({ state: 'visible' });
}

const systemBrowser = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
].find(existsSync);

const browser = await chromium.launch(systemBrowser ? { executablePath: systemBrowser } : undefined);
try {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.setViewportSize({ width: 390, height: 844 });
  await prepare(page, true);
  await fullFlowCheck(page);
  await context.close();

  for (const [width, height] of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width, height } });
    const p = await ctx.newPage();
    await prepare(p, true);
    await responsiveCheck(p, width, height);
    await ctx.close();
  }
  console.log('Math Journey flow, persistence, lives, unlock and responsive checks passed');
} finally {
  await browser.close();
}
