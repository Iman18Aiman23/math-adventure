import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    // Navigate to the app
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
    console.log('Page loaded');
    
    // Take initial screenshot
    await page.screenshot({ path: 'c:\temp\1-app-home.png' });
    console.log('Screenshot 1: App home');
    
    // Wait for content to render
    await page.waitForTimeout(1000);
    
    // Check if there are game buttons and click one to go to Early Explorers
    const buttons = await page.$$('button');
    console.log(`Found ${buttons.length} buttons on page`);
    
    // Look for "Early Explorers" or age-group button
    await page.screenshot({ path: 'c:\temp\2-initial-state.png' });
    
    // Evaluate page scroll performance
    const metrics = await page.evaluate(() => {
      return {
        documentHeight: document.documentElement.scrollHeight,
        clientHeight: document.documentElement.clientHeight,
        gameCardsCount: document.querySelectorAll('.game-card').length
      };
    });
    
    console.log('Metrics:', JSON.stringify(metrics));
    
    // Simulate scrolling and measure performance
    const startTime = Date.now();
    for (let i = 0; i < 5; i++) {
      await page.evaluate(() => {
        window.scrollBy(0, 100);
      });
      await page.waitForTimeout(100);
    }
    const scrollTime = Date.now() - startTime;
    
    console.log(`Scroll time for 5 scrolls: ${scrollTime}ms`);
    
    // Take final screenshot
    await page.screenshot({ path: 'c:\temp\3-after-scroll.png' });
    console.log('Screenshot 3: After scroll');
    
    // Test hover performance - check if game cards respond
    const gameCards = await page.$$('.game-card');
    if (gameCards.length > 0) {
      console.log(`Found ${gameCards.length} game cards`);
      // Hover over first card
      await gameCards[0].hover();
      await page.waitForTimeout(300);
      await page.screenshot({ path: 'c:\temp\4-hover-effect.png' });
      console.log('Screenshot 4: Hover effect');
    }
    
    await browser.close();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
})();
