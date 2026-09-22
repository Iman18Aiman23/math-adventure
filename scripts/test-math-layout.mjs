import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { createServer } from 'vite';
const require = createRequire(import.meta.url);
const { chromium } = require(process.argv[2] || 'playwright');
const server = await createServer({ server: { host: '127.0.0.1', port: 5179, strictPort: true } });
await server.listen();
let browser;
const shots = 'node_modules/.cache/math-layout';
fs.mkdirSync(shots, { recursive: true });
try {
  browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => { errors.push(e.message); console.error(e.message); });
  await page.route('**/layout-check*', route => {
    const query = new URL(route.request().url()).searchParams;
    const game = query.get('game');
    const mode = query.get('mode') || 'multiple';
    return route.fulfill({ contentType: 'text/html', body: `<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><div id="root"></div><script type="module">
import RefreshRuntime from '/math-adventure/@react-refresh';
RefreshRuntime.injectIntoGlobalHook(window);
window.$RefreshReg$ = () => {};
window.$RefreshSig$ = () => type => type;
window.__vite_plugin_react_preamble_installed__ = true;
const {default: React} = await import('/math-adventure/node_modules/.vite/deps/react.js');
const {default: {createRoot}} = await import('/math-adventure/node_modules/.vite/deps/react-dom_client.js');
await import('/math-adventure/src/index.css');
const {default: Game} = await import('/math-adventure/src/components/MathematicsPage/${game}.jsx');
createRoot(document.getElementById('root')).render(React.createElement('div', {className:'app-container'}, React.createElement('div', {className:'app-content'}, React.createElement('div', {className:'view-container'}, React.createElement(Game, {language:'bm', onBack:()=>{}, nums:[1,9], quizType:'${mode}'})))));
</script></body></html>` });
  });
  for (const width of [320, 390, 660, 1366]) {
    await page.setViewportSize({ width, height: width === 1366 ? 768 : 900 });
    let reference;
    for (const game of ['MathOperationsGame', 'MonthsGame', 'ClockGame', 'ColumnMathGame']) {
      await page.goto(`http://127.0.0.1:5179/math-adventure/layout-check?game=${game}`);
      await page.locator('.math-game-toolbar').waitFor();
      if (await page.locator('.ops-settings-close').isVisible()) await page.locator('.ops-settings-close').click();
      await page.waitForTimeout(300);
      const metrics = await page.evaluate(() => {
        const rect = sel => document.querySelector(sel)?.getBoundingClientRect().toJSON();
        const first = document.querySelector('.ops-choice-btn');
        const style = first && getComputedStyle(first);
        return {
          toolbar: rect('.math-game-toolbar'), stats: rect('.math-answer-record'), actions: rect('.math-toolbar-actions'),
          progress: rect('.math-progress-wrap, .ops-progress-wrap'),
          answer: rect('.ops-choices-grid, .cmg-action-area'),
          area: rect('.ops-answer-zone, .cmg-answer-footer'),
          background: style?.backgroundImage, border: style?.borderBottomColor,
          choices: [...document.querySelectorAll('.ops-choice-btn')].map(el => [getComputedStyle(el).backgroundImage, getComputedStyle(el).borderBottomColor]),
          work: rect('.cmg-work-area'), card: rect('.cmg-card'),
          viewportHeight: innerHeight,
        };
      });
      assert(metrics.stats.right <= metrics.actions.left + 1, `${game} ${width}: toolbar overlaps ${JSON.stringify(metrics)}`);
      assert(Math.abs((metrics.stats.top + metrics.stats.bottom - metrics.actions.top - metrics.actions.bottom) / 2) < 2, `${game} ${width}: toolbar not aligned`);
      assert(metrics.actions.right <= metrics.toolbar.right + 1, `${game} ${width}: toolbar overflow`);
      assert(metrics.progress.bottom <= metrics.viewportHeight + 1, `${game} ${width}: progress clipped`);
      assert(metrics.answer.bottom < metrics.progress.top - 10, `${game} ${width}: answers touch footer`);
      assert(Math.abs((metrics.answer.top + metrics.answer.bottom - metrics.area.top - metrics.area.bottom) / 2) < 3, `${game} ${width}: answer area not centered`);
      if (metrics.choices.length) {
        reference ??= [metrics.background, metrics.border];
        for (const choice of metrics.choices) assert.deepEqual(choice, reference, `${game} ${width}: option colors differ`);
      }
      if (metrics.work) {
        assert(metrics.work.top >= metrics.toolbar.bottom && metrics.work.bottom <= metrics.card.bottom + 1, `${game} ${width}: work overlaps toolbar or footer`);
        assert(metrics.work.left >= metrics.card.left - 1 && metrics.work.right <= metrics.card.right + 1, `${game} ${width}: work clipped`);
      }
      await page.screenshot({ path: `${shots}/${game}-${width}.png` });
      console.log(`${game} ${width}: toolbar, answer spacing, progress and colors passed`);
    }
  }
  for (const game of ['MathOperationsGame', 'MonthsGame', 'ClockGame']) {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto(`http://127.0.0.1:5179/math-adventure/layout-check?game=${game}&mode=typing`);
    await page.locator('.math-game-toolbar').waitFor();
    if (game === 'MonthsGame') {
      await page.locator('.math-toolbar-actions .ops-settings-puck').click();
      await page.getByRole('button', { name: 'Menaip', exact: true }).click();
    }
    if (await page.locator('.ops-settings-close').isVisible()) await page.locator('.ops-settings-close').click();
    if (game === 'ClockGame') await page.locator('.math-game-toolbar .ops-mode-pill').click();
    await page.waitForTimeout(300);
    const controls = await page.locator(game === 'ClockGame' ? '.ops-choices-grid' : '.ops-typing-form').boundingBox();
    const progress = await page.locator('.math-progress-wrap, .ops-progress-wrap').boundingBox();
    assert(controls.x >= 0 && controls.x + controls.width <= 321, `${game}: alternate controls overflow`);
    assert(controls.y + controls.height < progress.y && progress.y + progress.height <= 701, `${game}: alternate mode footer clipped`);
    await page.screenshot({ path: `${shots}/${game}-alternate-320.png` });
    console.log(`${game}: alternate mode fits narrow, short screen`);
  }
  assert.deepEqual(errors, []);
} finally {
  await browser?.close();
  await server.close();
}
