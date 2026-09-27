import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
const require = createRequire(import.meta.url);
const { chromium } = require(process.argv[2] || 'playwright');
const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
const output = 'node_modules/.cache/achievement-checks';
mkdirSync(output, { recursive: true });
const errors = [];
try {
 const page = await browser.newPage();
 page.on('pageerror', e => errors.push(e.message));
 await page.addInitScript(() => {
  localStorage.setItem('mathAdventurePlayer', 'ImanAI');
  localStorage.setItem('mathAdventureNavigation:v1', JSON.stringify({ activeTab: 'achievement' }));
  localStorage.setItem('gameData', JSON.stringify({gems:48,streak:12,stars:0,hearts:3}));
 });
 await page.goto('http://127.0.0.1:5173/math-adventure/');
 await page.locator('.ac-grid').waitFor();
 await page.evaluate(() => document.fonts.ready);
 for (const [width,height] of [[320,568],[390,844],[430,932],[660,1199],[768,1024],[1024,768],[1366,768],[1584,993],[1920,1080]]) {
  await page.setViewportSize({width,height});
  for (const tab of ['assessments','achievements','badges']) {
   await page.locator(`#ac-tab-${tab}`).click();
   await page.waitForTimeout(100);
   const overflow = await page.evaluate(() => [...document.querySelectorAll('.ac-wrap,.ac-tabs,.ac-grid,.ac-assessment,.ac-badge,.ac-start,.ac-stats,.ac-completed-grid,.ac-completed-card,.ac-completed-levels')].filter(e => e.scrollWidth > e.clientWidth+2).map(e => [e.className,e.clientWidth,e.scrollWidth]));
   assert.deepEqual(overflow,[],`${width}px ${tab} overflow`);
   await page.screenshot({path:`${output}/${tab}-${width}.png`,fullPage:true});
  }
  if(width<768) assert.equal(await page.locator('.subject-menu-footer .cosmic-nav').isVisible(),true);
 }
 assert.equal(await page.locator('.ac-badge').count(),11);
 assert.equal(await page.locator('.ac-badge progress').first().getAttribute('value'),'12');
 await page.locator('#ac-tab-badges').focus();
 await page.keyboard.press('ArrowRight');
 assert.equal(await page.locator('#ac-tab-achievements').getAttribute('aria-selected'),'true');
 await page.locator('.ac-completed-preview').first().click();
 await page.getByRole('button',{name:'Tutup',exact:true}).click();
 await page.locator('#ac-tab-badges').click();
 await page.evaluate(() => {
  const data=JSON.parse(localStorage.getItem('math-adventure-v2'));
  data.player.coins=125;
  localStorage.setItem('math-adventure-v2',JSON.stringify(data));
  window.dispatchEvent(new Event('gamification-sync'));
 });
 await page.waitForFunction(() => document.querySelectorAll('.ac-downloads button').length > 0);
 const downloadEvent = page.waitForEvent('download');
 await page.locator('.ac-downloads button').first().click();
 const download = await downloadEvent;
 assert.match(download.suggestedFilename(), /Badge\.png$/);
 assert.equal(await download.failure(), null);
 await page.locator('.ac-loading').waitFor({state:'hidden'});
 await page.locator('#ac-tab-assessments').click();
 assert.equal(await page.locator('.ac-start:disabled').count(),5);
 await page.locator('.ac-start:not(:disabled)').first().click();
 await page.waitForFunction(() => !document.querySelector('.ac-root'));
 assert.deepEqual(errors,[]);
 console.log('Achievement responsive layouts, badges, keyboard tabs, certificate preview, coming-soon cards, assessment navigation and mobile menu passed.');
} finally { await browser.close(); }


