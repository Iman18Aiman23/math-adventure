import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
import { createServer } from 'vite';
import { questionsForLevel, prepareReadingRound, matchesAnswer } from '../src/components/ReadingPage/games/readingContent.js';

const require = createRequire(import.meta.url);
const { chromium } = require(process.argv[2] || 'playwright');
for (let level = 1; level <= 15; level++) {
  const questions = questionsForLevel(level);
  assert(questions.length >= (level < 11 ? 10 : level === 15 ? 5 : 8));
  for (const q of questions) {
    const parts = Array.isArray(q.answer) ? q.answer : [q.answer];
    const available = [...q.options];
    for (const p of parts) { const i = available.indexOf(p); assert(i >= 0, `${q.id}: missing answer tile`); available.splice(i, 1); }
    if (!Array.isArray(q.answer)) assert.equal(new Set(q.options).size, q.options.length);
    assert(matchesAnswer(parts, q.answer));
    assert(!matchesAnswer(['invalid'], q.answer));
  }
  const round = prepareReadingRound(level);
  assert(round.questions.every(q => !('answer' in q) && !('solution' in q)));
}
console.log('Content validation: all 137 questions and repeated builder tiles passed.');
const server = await createServer({ server: { host: '127.0.0.1', port: 5192, strictPort: true } });
await server.listen();
let browser;
const shots = 'node_modules/.cache/reading-challenge';
mkdirSync(shots, { recursive: true });
try {
  browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });
  const errors = [];
  page.on('pageerror', error => { errors.push(error.message); console.error(error.message); });
  await page.route('**/reading-check*', route => {
    const id = new URL(route.request().url()).searchParams.get('level');
    return route.fulfill({ contentType: 'text/html', body: `<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><div id="root"></div><script type="module">
import RefreshRuntime from '/math-adventure/@react-refresh';
RefreshRuntime.injectIntoGlobalHook(window);window.$RefreshReg$=()=>{};window.$RefreshSig$=()=>type=>type;window.__vite_plugin_react_preamble_installed__=true;
const {default:React}=await import('/math-adventure/node_modules/.vite/deps/react.js');
const {default:{createRoot}}=await import('/math-adventure/node_modules/.vite/deps/react-dom_client.js');
await import('/math-adventure/src/index.css');
const {default:Game}=await import('/math-adventure/src/components/ReadingPage/games/${id ? 'ReadingGame' : 'ReadingJourney'}.jsx');
const props={language:'bm',onBack:()=>{window.backCalled=true},onHome:()=>{window.homeCalled=true},onNext:()=>{},onReplay:()=>{},onComplete:()=>{},${id ? `levelId:${Number(id)},` : ''}};
createRoot(document.getElementById('root')).render(React.createElement(React.StrictMode,null,React.createElement('div',{className:'app-container'},React.createElement('div',{className:'app-content'},React.createElement('div',{className:'view-container'},React.createElement(Game,props))))));
</script></body></html>` });
  });
  const url = 'http://127.0.0.1:5192/math-adventure/reading-check';
  if (!process.env.READING_LAYOUT_ONLY) {
  await page.goto(url);
  await page.locator('.rg-level').first().waitFor();
  assert.equal(await page.locator('.rg-level:disabled').count(), 0);
  await page.locator('.rg-level').first().click();
  async function answerQuestion(level, wrongFirst = false) {
    const card = page.locator('.rg-question');
    await card.waitFor();
    const id = await card.getAttribute('data-question-id');
    const q = questionsForLevel(level).find(item => item.id === id);
    const values = Array.isArray(q.answer) ? q.answer : [q.answer];
    const label = v => v === 'true' ? '✓ Betul' : v === 'false' ? '✕ Salah' : v;
    async function choose(value) {
      if (q.sceneOptions) {
        const { scenes } = await import('../src/components/ReadingPage/games/readingContent.js');
        await page.locator('.rg-option').filter({ has: page.getByRole('img', { name: scenes.find(s => s.id === value).sentence, exact: true }) }).click();
      } else if (q.pictureOptions) await page.locator('.rg-option').filter({ has: page.getByRole('img', { name: value, exact: true }) }).click();
      else await page.locator('.rg-option:not(:disabled)').getByText(label(value), { exact: true }).first().click();
    }
    if (wrongFirst) {
      await choose(q.options.find(v => v !== q.answer));
      await page.getByRole('button', { name: 'Semak', exact: true }).click();
      await page.getByRole('button', { name: 'Cuba Lagi', exact: true }).click();
    }
    for (const value of values) await choose(value);
    if (Array.isArray(q.answer)) {
      // Remove and replace the last tile to exercise the assembly controls.
      await page.locator('.rg-slot').last().click();
      await choose(values.at(-1));
    }
    await page.getByRole('button', { name: 'Semak', exact: true }).click();
    await page.getByRole('button', { name: 'Teruskan', exact: true }).waitFor();
    assert(await page.locator('.rg-feedback').textContent().then(t => t.includes('Betul!')), `${id}: incorrect validation`);
    await page.getByRole('button', { name: 'Teruskan', exact: true }).click();
  }
  for (let level = 1; level <= 15; level++) {
    for (let i = 0; i < questionsForLevel(level).length; i++) await answerQuestion(level, level === 1 && i === 0);
    await page.locator('.rg-completion').waitFor();
    if (level === 1) assert((await page.locator('.rg-completion').textContent()).includes('9 betul · 1 salah'));
    const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('mathAdventureData')));
    assert(saved.games['reading-challenge'].unlockedItems.includes(`reading-complete-${level}`));
    console.log(`Level ${level}: every question, completion and saved unlock passed`);
    if (level < 15) await page.getByRole('button', { name: 'Level Seterusnya', exact: true }).click();
  }
  await page.getByRole('button', { name: 'Kembali ke Membaca', exact: true }).click();
  assert(await page.evaluate(() => window.backCalled));
  await page.goto(url);
  await page.locator('.rg-level').first().waitFor();
  assert.equal(await page.locator('.rg-level:disabled').count(), 0);
  await page.locator('.rg-level').first().click();
  await page.getByRole('button', { name: 'Kembali', exact: true }).click();
  await page.locator('.rg-level').first().waitFor();

  // Exercise the actual App -> ReadingPage lazy route and browser Back stack.
  await page.evaluate(() => {
    localStorage.setItem('mathAdventurePlayer', 'Tester');
    localStorage.setItem('mathAdventureNavigation:v1', JSON.stringify({ activeTab: 'learn', currentSubject: 'reading' }));
  });
  await page.goto('http://127.0.0.1:5192/math-adventure/');
  await page.locator('.mh-topic-card').last().click();
  await page.locator('.rg-level').first().click();
  await page.locator('.rg-question').waitFor();
  await page.evaluate(() => history.back());
  await page.locator('.rg-journey').waitFor();
  await page.evaluate(() => history.back());
  await page.locator('.mh-topic-card').last().waitFor();
  assert.equal(await page.locator('.view-container').evaluate(el => el.scrollTop), 0);
  console.log('Actual Reading menu, lazy game route and two browser Back steps passed.');
  }

  const widths = process.env.READING_WIDTHS ? process.env.READING_WIDTHS.split(',').map(Number) : [320, 360, 375, 390, 430, 768, 820, 1024, 1280, 1366, 1440, 1920];
  for (const width of widths) {
    await page.setViewportSize({ width, height: Number(process.env.READING_HEIGHT) || (width < 500 ? 740 : width < 1000 ? 1024 : 768) });
    for (let level = 1; level <= 15; level++) {
      await page.goto(`${url}?level=${level}`);
      await page.locator('.rg-option').first().waitFor();
      const metrics = await page.evaluate(() => {
        const shell = document.querySelector('.rg-shell');
        const board = document.querySelector('.rg-board');
        const footer = document.querySelector('.rg-footer').getBoundingClientRect();
        return { overflow: document.documentElement.scrollWidth > innerWidth || shell.scrollWidth > shell.clientWidth || board.scrollWidth > board.clientWidth,
          footerBottom: footer.bottom, height: innerHeight,
          badButtons: [...document.querySelectorAll('.rg-option, .rg-primary, .rg-audio')].filter(b => b.getBoundingClientRect().height < 44).length };
      });
      assert(!metrics.overflow, `${width} level ${level}: horizontal overflow`);
      assert(metrics.footerBottom <= metrics.height + 1, `${width} level ${level}: footer clipped`);
      assert.equal(metrics.badButtons, 0);
      await page.getByRole('button', { name: 'Semak', exact: true }).scrollIntoViewIfNeeded();
      if ([320, 1366].includes(width) && [1, 9, 12, 15].includes(level)) await page.screenshot({ path: `${shots}/${width}-level-${level}.png` });
    }
    console.log(`${width}px: all 15 levels fit horizontally, footer visible, touch targets passed`);
  }
  await page.goto(`${url}?level=1`);
  await page.locator('.rg-audio').waitFor();
  await page.evaluate(async () => {
    const {default:speech} = await import('/math-adventure/src/services/SpeechManager.js');
    window.audioCalls = [];
    window.audioStops = 0;
    speech.speak = (text, language) => { window.audioCalls.push({text, language}); return new Promise(resolve => { window.finishAudio = resolve; }); };
    speech.stopSpeaking = () => { window.audioStops++; };
  });
  await page.locator('.rg-audio').click();
  assert(await page.locator('.rg-audio').isDisabled());
  await page.evaluate(() => window.finishAudio());
  await page.locator('.rg-audio').click();
  assert.equal(await page.evaluate(() => window.audioCalls.length), 2);
  assert.equal(await page.evaluate(() => window.audioCalls[0].language), 'ms-MY');
  await page.evaluate(() => window.finishAudio());
  const id = await page.locator('.rg-question').getAttribute('data-question-id');
  const answer = questionsForLevel(1).find(q => q.id === id).answer;
  await page.locator('.rg-option').getByText(answer, {exact:true}).click();
  await page.getByRole('button', {name:'Semak', exact:true}).click();
  await page.getByRole('button', {name:'Teruskan', exact:true}).click();
  assert(await page.evaluate(() => window.audioStops > 0));
  console.log('Malay audio, busy state, replay and question-change cleanup passed.');
  assert.deepEqual(errors, []);
} finally { await browser?.close(); await server.close(); }
