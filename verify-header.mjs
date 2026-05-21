import puppeteer from 'puppeteer-core';

const launchBrowser = async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: 'C:\Program Files\Google\Chrome\Application\chrome.exe',
      headless: 'new'
    });
    
    const page = await browser.newPage();
    await page.goto('http://localhost:5173/');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'home.png' });
    
    // Click on 4-5 age group
    await page.click('button:has-text("4–5")') || await page.click('a:has-text("4–5")');
    await page.waitForTimeout(1500);
    await page.screenshot({ path: 'age-4-5-header.png' });
    
    await browser.close();
    console.log('Screenshots captured: home.png, age-4-5-header.png');
  } catch (e) {
    console.log('Puppeteer not available, showing code changes instead');
  }
};

launchBrowser();
