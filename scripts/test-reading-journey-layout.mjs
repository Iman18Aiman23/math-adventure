import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
import { createServer } from 'vite';
const require = createRequire(import.meta.url);
const { chromium } = require(process.argv[2] || 'playwright');
const server = await createServer({server:{host:'127.0.0.1',port:5193,strictPort:true}});
await server.listen();
let browser;
const output = 'node_modules/.cache/reading-journey-layout';
mkdirSync(output,{recursive:true});
try {
  browser = await chromium.launch({channel:'msedge',headless:true});
  const page = await browser.newPage();
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/journey-layout-check*',route=>route.fulfill({contentType:'text/html',body:`<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800&family=Fredoka:wght@500;600;700&display=swap" rel="stylesheet"></head><body><div id="root"></div><script type="module">
import RefreshRuntime from '/math-adventure/@react-refresh';
RefreshRuntime.injectIntoGlobalHook(window);window.$RefreshReg$=()=>{};window.$RefreshSig$=()=>type=>type;window.__vite_plugin_react_preamble_installed__=true;
const {default:React}=await import('/math-adventure/node_modules/.vite/deps/react.js');
const {default:{createRoot}}=await import('/math-adventure/node_modules/.vite/deps/react-dom_client.js');
await import('/math-adventure/src/index.css');
const {default:Journey}=await import('/math-adventure/src/components/ReadingPage/games/ReadingJourney.jsx');
createRoot(document.getElementById('root')).render(React.createElement('div',{className:'app-container'},React.createElement('div',{className:'app-content'},React.createElement('div',{className:'view-container'},React.createElement(Journey,{onBack:()=>{window.didBack=true},language:new URLSearchParams(location.search).get('lang')||'bm'})))));
</script></body></html>`}));
  for(const width of [320,390,768,1024,1366,1920]) {
    await page.setViewportSize({width,height:width<500?844:900});
    await page.goto('http://127.0.0.1:5193/math-adventure/journey-layout-check');
    await page.locator('.rg-level').first().waitFor();
    await page.evaluate(()=>document.fonts.ready);
    assert.equal(await page.locator('.rg-world').count(),5);
    assert.equal(await page.locator('.rg-level:disabled').count(),0);
    assert.equal(await page.locator('.bm-header').count(),1);
    const metrics=await page.evaluate(()=>{
      const view=document.querySelector('.view-container');
      const hero=document.querySelector('.rg-journey-hero').getBoundingClientRect();
      const body=document.querySelector('.rg-journey-body').getBoundingClientRect();
      const cards=[...document.querySelectorAll('.rg-level')];
      return {overflow:view.scrollWidth>view.clientWidth||document.documentElement.scrollWidth>innerWidth,
        overlap:hero.bottom>body.top+1,
        columns:getComputedStyle(document.querySelector('.rg-levels')).gridTemplateColumns.split(' ').length,
        clipped:cards.some(c=>c.scrollWidth>c.clientWidth+1),
        small:cards.some(c=>c.getBoundingClientRect().height<44)};
    });
    assert(!metrics.overflow&&!metrics.overlap&&!metrics.clipped&&!metrics.small,`${width}: ${JSON.stringify(metrics)}`);
    assert.equal(metrics.columns,width<=700?1:3);
    await page.hover('.rg-world-heading');
    await page.mouse.wheel(0, 10000);
    await page.waitForFunction(() => document.querySelector('.view-container').scrollTop > 0);
    await page.locator('.rg-journey-progress').scrollIntoViewIfNeeded();
    assert(await page.locator('.rg-journey-progress').evaluate(el => {
      const rect = el.getBoundingClientRect();
      const view = document.querySelector('.view-container').getBoundingClientRect();
      return rect.top >= view.top && rect.bottom <= view.bottom + 1;
    }), `${width}: bottom of journey is clipped`);
    await page.locator('.view-container').evaluate(el => { el.scrollTop = 0; });
    await page.screenshot({path:`${output}/journey-${width}.png`,fullPage:true});
    await page.locator('.rg-level').first().click();
    await page.locator('.rg-question').waitFor();
    await page.getByRole('button',{name:'Kembali',exact:true}).click();
    await page.locator('.rg-journey').waitFor();
    assert.equal(await page.locator('.view-container').evaluate(el=>el.scrollTop),0);
    console.log(`${width}px: header, hero, body, 15 cards, locks and game/back passed`);
  }
  await page.evaluate(()=>{
    localStorage.setItem('mathAdventureData',JSON.stringify({games:{'reading-challenge':{totalXP:0,mathCoins:0,unlockedItems:['reading-complete-1']}}}));
  });
  await page.goto('http://127.0.0.1:5193/math-adventure/journey-layout-check?lang=en');
  await page.locator('.rg-level').first().waitFor();
  assert.equal(await page.locator('.rg-level.is-done').count(),1);
  assert.equal(await page.locator('.rg-level:disabled').count(),0);
  await page.getByRole('button',{name:'Back',exact:true}).click();
  assert(await page.evaluate(()=>window.didBack));
  const asset=await page.request.get('http://127.0.0.1:5193/math-adventure/images/reading/journey-clay-atlas.png');
  assert(asset.ok());
  await page.evaluate(()=>{
    localStorage.setItem('mathAdventurePlayer','Tester');
    localStorage.setItem('mathAdventureNavigation:v1',JSON.stringify({activeTab:'learn',currentSubject:'reading'}));
  });
  await page.setViewportSize({width:1366,height:900});
  await page.goto('http://127.0.0.1:5193/math-adventure/');
  await page.locator('.mh-topic-card').last().click();
  await page.locator('.rg-journey-clay').waitFor();
  await page.evaluate(()=>document.fonts.ready);
  await page.hover('.rg-world-heading');
  await page.mouse.wheel(0,10000);
  await page.waitForFunction(()=>document.querySelector('.view-container').scrollTop>0);
  await page.locator('.rg-journey-progress').scrollIntoViewIfNeeded();
  assert(await page.locator('.rg-journey-progress').evaluate(el=>el.getBoundingClientRect().bottom<=innerHeight));
  await page.locator('.view-container').evaluate(el=>{el.scrollTop=0;});
  await page.screenshot({path:`${output}/journey-app-desktop.png`,fullPage:true});
  await page.locator('.rg-level').first().click();
  await page.locator('.rg-question').waitFor();
  await page.evaluate(()=>history.back());
  await page.locator('.rg-journey-clay').waitFor();
  await page.getByRole('button',{name:'Kembali',exact:true}).click();
  await page.locator('.mh-topic-card').last().waitFor();
  assert.deepEqual(errors,[]);
  console.log('Saved progression, English controls and artwork loading passed.');
} finally {await browser?.close();await server.close();}
