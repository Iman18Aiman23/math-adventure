import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:5175';

async function verifyPages() {
  const browser = await chromium.launch();
  const context = await browser.createContext();
  const page = await context.newPage();

  console.log('🔍 Verifying PageLayout refactoring...\n');

  // Test pages to verify
  const pages = [
    {
      name: 'MathHome',
      path: '/',
      steps: [
        { action: 'click', selector: 'button:has-text("Mathematics")' },
        { action: 'wait', selector: '.mh-hero-emoji' },
      ]
    },
    {
      name: 'ReadingPage',
      path: '/',
      steps: [
        { action: 'click', selector: 'button:has-text("Reading")' },
        { action: 'wait', selector: '.rp-hero-emoji' },
      ]
    },
    {
      name: 'BMPage (Speaking)',
      path: '/',
      steps: [
        { action: 'click', selector: 'button:has-text("Speaking")' },
        { action: 'wait', selector: '.bp-hero-emoji' },
      ]
    },
    {
      name: 'JawiPage',
      path: '/',
      steps: [
        { action: 'click', selector: 'button:has-text("Jawi")' },
        { action: 'wait', selector: '.jw-hero-emoji' },
      ]
    }
  ];

  try {
    for (const testPage of pages) {
      console.log(`Testing ${testPage.name}...`);

      // Navigate to home
      await page.goto(`${BASE_URL}${testPage.path}`);
      await page.waitForLoadState('networkidle');

      // Execute steps
      for (const step of testPage.steps) {
        if (step.action === 'click') {
          try {
            await page.click(step.selector);
            await page.waitForLoadState('networkidle');
          } catch (e) {
            console.log(`  ⚠️  Could not click selector: ${step.selector}`);
          }
        } else if (step.action === 'wait') {
          try {
            await page.waitForSelector(step.selector, { timeout: 5000 });
          } catch (e) {
            console.log(`  ❌ Selector not found: ${step.selector}`);
            continue;
          }
        }
      }

      // Check for PageLayout elements
      const hasShell = await page.locator(`.${testPage.name.toLowerCase()}-shell`).isVisible().catch(() => false);
      const hasHero = await page.locator(`[class*="-hero-emoji"]`).isVisible().catch(() => false);
      const hasGrid = await page.locator(`[class*="-grid"]`).isVisible().catch(() => false);
      const hasBackButton = await page.locator('button[type="button"]').first().isVisible().catch(() => false);

      if (hasHero && hasGrid && hasBackButton) {
        console.log(`  ✅ ${testPage.name} - Layout verified`);
        console.log(`     ✓ Hero section present`);
        console.log(`     ✓ Grid/tiles rendered`);
        console.log(`     ✓ Back button present\n`);
      } else {
        console.log(`  ⚠️  ${testPage.name} - Some elements missing`);
        console.log(`     ${hasHero ? '✓' : '✗'} Hero section`);
        console.log(`     ${hasGrid ? '✓' : '✗'} Grid/tiles`);
        console.log(`     ${hasBackButton ? '✓' : '✗'} Back button\n`);
      }
    }

    console.log('✅ Verification complete!');
  } catch (error) {
    console.error('❌ Error during verification:', error.message);
  } finally {
    await browser.close();
  }
}

verifyPages();
