import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.argv[2] || 'playwright');
const source = fs.readFileSync('src/components/MathematicsPage/ColumnMathGame.jsx', 'utf8');
const generate = vm.runInNewContext(`${source.slice(source.indexOf('function generateProblem'), source.indexOf('const CHEERS_BM'))}; generateProblem`);
for (const [level, min, max] of [['easy', 1, 9], ['medium', 10, 99], ['hard', 100, 999]]) {
  for (const op of ['+', '-', '\u00d7', '\u00f7', 'random']) {
    for (let i = 0; i < 300; i++) {
      const p = generate(level, op);
      assert(p.num1 >= min && p.num1 <= max, `${level}: first operand ${p.num1}`);
      if (p.op === '\u00f7') {
        assert(p.num2 >= 1 && p.num2 <= 9);
        assert.equal(p.answer * p.num2, p.num1);
      } else {
        assert(p.num2 >= min && p.num2 <= max, `${level}: second operand ${p.num2}`);
      }
      if (p.hasPartials) assert.equal(p.partial1 + p.partial2 * 10 + (p.partial3 ?? 0) * 100, p.answer);
      if (p.op === '-') assert(p.answer >= 0);
    }
  }
}
console.log('4,500 generated problems: digit ranges and arithmetic passed');

const screenshots = 'node_modules/.cache/column-math';
fs.mkdirSync(screenshots, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 660 } });
const errors = [];
page.on('pageerror', error => { errors.push(error.message); console.error(error.message); });
await page.route('**/column-math-check', route => route.fulfill({ contentType: 'text/html', body: `<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body><div id="root"></div><script type="module">
import RefreshRuntime from '/math-adventure/@react-refresh';
RefreshRuntime.injectIntoGlobalHook(window);
window.$RefreshReg$ = () => {};
window.$RefreshSig$ = () => type => type;
window.__vite_plugin_react_preamble_installed__ = true;
const {default: React} = await import('/math-adventure/node_modules/.vite/deps/react.js');
const {default: {createRoot}} = await import('/math-adventure/node_modules/.vite/deps/react-dom_client.js');
import '/math-adventure/src/index.css';
const {default: ColumnMathGame} = await import('/math-adventure/src/components/MathematicsPage/ColumnMathGame.jsx');
createRoot(document.getElementById('root')).render(React.createElement(ColumnMathGame, {language:'bm',onBack:()=>{}}));
</script></body></html>` }));
await page.goto('http://127.0.0.1:5173/math-adventure/column-math-check');
try { await page.locator('.cmg-card').waitFor(); }
catch (error) { await browser.close(); throw error; }
await page.evaluate(() => { Math.random = () => 0.5; });

async function select(level, op) {
  await page.getByRole('button', { name: 'Tetapan', exact: true }).click();
  await page.locator('.cmg-settings-option').filter({ hasText: level }).click();
  await page.locator('.cmg-settings-option').filter({ hasText: op }).click();
  await page.locator('.cmg-settings-close').click();
}

async function fitCheck(name) {
  await page.waitForTimeout(200);
  const result = await page.locator('.cmg-card').evaluate(card => {
    const box = card.getBoundingClientRect();
    const work = card.querySelector('.cmg-work-area').getBoundingClientRect();
    return { box: box.toJSON(), work: work.toJSON() };
  });
  assert(result.work.left >= result.box.left - 1 && result.work.right <= result.box.right + 1, `${name}: horizontal clipping ${JSON.stringify(result)}`);
  assert(result.work.top >= result.box.top - 1 && result.work.bottom <= result.box.bottom + 1, `${name}: vertical clipping ${JSON.stringify(result)}`);
  const overlaps = await page.locator('.cmg-card-info').evaluate(info => {
    const button = info.getBoundingClientRect();
    const work = info.parentElement.querySelector('.cmg-work-area').getBoundingClientRect();
    return work.left < button.right && work.right > button.left && work.top < button.bottom && work.bottom > button.top;
  });
  assert(!overlaps, `${name}: working overlaps information button`);
  const counterOverlaps = await page.locator('.cmg-question-counter').evaluate(counter => {
    const box = counter.getBoundingClientRect();
    const work = counter.parentElement.querySelector('.cmg-work-area').getBoundingClientRect();
    return work.left < box.right && work.right > box.left && work.top < box.bottom && work.bottom > box.top;
  });
  assert(!counterOverlaps, `${name}: working overlaps question counter`);
  await page.screenshot({ path: path.join(screenshots, `${name}.png`) });
}

try {
  await select('Sederhana', '+');
  const answers = page.locator('.cmg-work-area > div').filter({ has: page.locator('input:not(.cmg-carry-field)') }).last().locator('input');
  await answers.last().fill('10');
  await answers.last().press('Enter');
  await page.locator('.cmg-carry-field').first().waitFor();
  const carry = await page.locator('.cmg-carry-field').first().evaluate(el => ({ value: el.value, width: el.clientWidth, height: el.clientHeight, font: parseFloat(getComputedStyle(el).fontSize), radius: parseFloat(getComputedStyle(el).borderRadius) }));
  assert.equal(carry.value, '1');
  assert(carry.font < carry.height && carry.radius <= 8, `carry clipped: ${JSON.stringify(carry)}`);
  await fitCheck('addition-carry');

  await select('Senang', '\u00d7');
  await answers.last().fill('25');
  await answers.last().press('Enter');
  assert.equal(await page.locator('.cmg-carry-field').first().inputValue(), '2');
  await fitCheck('easy-multiplication-carry');

  for (const [level, products, result] of [['Sederhana', [275, 275], 3025], ['Susah', [2750, 2750, 2750], 305250]]) {
    await select(level, '\u00d7');
    if (level === 'Sederhana') {
      const firstPartial = page.locator('[data-partial="1"] input');
      await firstPartial.last().fill('25');
      await firstPartial.last().press('Enter');
      assert.equal(await page.locator('div.cmg-carry-field').first().innerText(), '2');
      await fitCheck('partial-multiplication-carry');
    }
    for (let row = 0; row < products.length; row++) {
      const inputs = page.locator(`[data-partial="${row + 1}"] input`);
      await inputs.first().waitFor();
      const digits = String(products[row]);
      for (let i = digits.length - 1; i >= 0; i--) {
        await inputs.nth(i).fill(digits[i]);
        await inputs.nth(i).press('Enter');
        await page.waitForTimeout(100);
      }
    }
    for (const [w, h] of [[1200, 660], [788, 450], [390, 844], [320, 568]]) {
      await page.setViewportSize({ width: w, height: h });
      await fitCheck(`${level}-${w}x${h}`);
    }
    const digits = String(result);
    for (let i = digits.length - 1; i >= 0; i--) {
      await answers.nth(i).fill(digits[i]);
      await answers.nth(i).press('Enter');
    }
    await page.getByRole('button', { name: /Hantar/ }).click();
    await page.waitForTimeout(150);
    assert.equal(await page.locator('.cmg-shake').count(), 0, `${level} multiplication rejected correct answer`);
    assert.equal(await page.getByRole('button', { name: /Hantar/ }).count(), 0);
    await page.waitForTimeout(1300);
  }

  await page.setViewportSize({ width: 1200, height: 660 });
  await select('Susah', '\u00f7');
  await page.locator('.cmg-work-area.is-division').waitFor();
  const quotient = page.locator('.is-division input');
  assert.equal(await quotient.count(), 3);
  assert.equal(await quotient.first().evaluate(el => getComputedStyle(el).borderTopColor), 'rgb(255, 150, 0)');
  assert.equal(await page.locator('.is-division').innerText().then(text => text.includes('\u00f7')), false);
  for (const [w, h] of [[1200, 660], [788, 450], [390, 844], [320, 568]]) {
    await page.setViewportSize({ width: w, height: h });
    await fitCheck(`division-${w}x${h}`);
  }
  for (const [i, digit] of [...'110'].entries()) {
    await quotient.nth(i).fill(digit);
    await quotient.nth(i).press('Enter');
    await page.waitForTimeout(100);
    if (i < 2) assert(await quotient.nth(i + 1).evaluate(el => el === document.activeElement));
  }
  await fitCheck('division-working');
  await page.getByRole('button', { name: /Hantar/ }).click();
  await page.waitForTimeout(100);
  assert.equal(await page.locator('.cmg-shake').count(), 0, 'division rejected correct answer');
  assert.equal(await page.getByRole('button', { name: /Hantar/ }).count(), 0);
  assert.deepEqual(errors, []);
  console.log('Settings, carries, multiplication submissions, division submission and responsive screenshots passed');
} finally {
  await browser.close();
}
