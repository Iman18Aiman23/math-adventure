import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require(`${process.argv[2]}/playwright`);
const executablePath = ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Google/Chrome/Application/chrome.exe'].find(existsSync);
const browser = await chromium.launch({ executablePath });
try {
  for (const [width, height] of [[1024, 768], [1366, 768], [1920, 1080]]) {
    const page = await browser.newPage({ viewport: { width, height } });
    await page.addInitScript(() => {
      localStorage.setItem('mathAdventurePlayer', 'Tester');
      localStorage.setItem('mathAdventureNavigation:v1', JSON.stringify({ activeTab: 'learn', currentSubject: 'math', mathSubGame: 'journey' }));
    });
    await page.goto('http://127.0.0.1:5173/math-adventure/');
    const sidebar = page.locator('.desktop-sidebar');
    await sidebar.waitFor({ state: 'visible' });
    assert.equal(await sidebar.locator('.home-quick-link').count(), 10);
    const dimensions = await sidebar.evaluate(el => ({ height: el.clientHeight, scroll: el.scrollHeight, bottom: el.getBoundingClientRect().bottom }));
    assert.ok(dimensions.scroll <= dimensions.height + 2 && dimensions.bottom <= height, 'sidebar should fit the viewport');
    await sidebar.getByRole('button', { name: /Buka tetapan|Open settings/ }).click();
    const popup = sidebar.getByRole('dialog');
    await popup.waitFor({ state: 'visible' });
    const rect = await popup.boundingBox();
    assert.ok(rect.x >= 0 && rect.x + rect.width <= width && rect.y >= 0, 'settings must remain inside the viewport');
    await page.keyboard.press('Escape');
    await popup.waitFor({ state: 'hidden' });
    if (width === 1366) await page.screenshot({ path: join(tmpdir(), 'math-sidebar-desktop.png') });
    await sidebar.getByRole('button', { name: /Papan Juara|Leaderboard/ }).click();
    await page.waitForFunction(() => document.querySelector('.home-quick-link.active')?.textContent.match(/Papan Juara|Leaderboard/));
    for (const [label, subject] of [['Membaca', 'reading'], ['Sebutan', 'bm'], ['Matematik', 'math'], ['Jawi', 'pendidikan-islam-v1']]) {
      await sidebar.getByRole('button', { name: label, exact: true }).click();
      await page.waitForFunction(expected => {
        const nav = JSON.parse(localStorage.getItem('mathAdventureNavigation:v1'));
        return nav?.currentSubject === expected && nav?.activeTab === 'learn';
      }, subject);
    }
    await sidebar.getByRole('button', { name: 'Profil', exact: true }).click();
    await page.waitForFunction(() => JSON.parse(localStorage.getItem('mathAdventureNavigation:v1'))?.activeTab === 'profile');
    await page.close();
  }
  console.log('Desktop sidebar sizing, settings, keyboard dismissal, and navigation passed.');
  console.log(join(tmpdir(), 'math-sidebar-desktop.png'));
} finally {
  await browser.close();
}
