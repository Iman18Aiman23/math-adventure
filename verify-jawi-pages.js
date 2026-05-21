import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:5176';

async function verifyJawiPages() {
  const browser = await chromium.launch();
  const context = await browser.createContext();
  const page = await context.newPage();

  console.log('🔍 Verifying JawiScriptPage BackButton implementation...\n');

  // Test pages to verify
  const pages = [
    {
      name: 'JawiAlphabetPage',
      path: '/',
      steps: [
        { action: 'click', selector: 'button:has-text("Jawi")' },
        { action: 'wait', selector: '.jw-hero-emoji' },
        { action: 'click', selector: 'button:has-text("Huruf")' },
        { action: 'wait', selector: 'button[type="button"]' },
      ]
    },
    {
      name: 'JawiWordsPage',
      path: '/',
      steps: [
        { action: 'click', selector: 'button:has-text("Jawi")' },
        { action: 'wait', selector: '.jw-hero-emoji' },
        { action: 'click', selector: 'button:has-text("Perkataan")' },
        { action: 'wait', selector: '[style*="gridTemplateColumns"]' },
      ]
    },
    {
      name: 'JawiShortStoriesPage',
      path: '/',
      steps: [
        { action: 'click', selector: 'button:has-text("Jawi")' },
        { action: 'wait', selector: '.jw-hero-emoji' },
        { action: 'click', selector: 'button:has-text("Cerita")' },
        { action: 'wait', selector: 'select' },
      ]
    },
    {
      name: 'JawiSyllablesLearningPage',
      path: '/',
      steps: [
        { action: 'click', selector: 'button:has-text("Jawi")' },
        { action: 'wait', selector: '.jw-hero-emoji' },
        { action: 'click', selector: 'button:has-text("Suku Kata")' },
        { action: 'wait', selector: 'button' },
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

      // Check for BackButton
      const backButtonVisible = await page.locator('button[type="button"] svg').first().isVisible().catch(() => false);
      const hasConsoleErrors = await page.evaluate(() => {
        return window.__consoleErrors?.length > 0;
      }).catch(() => false);

      if (backButtonVisible && !hasConsoleErrors) {
        console.log(`  ✅ ${testPage.name} - BackButton working`);
        console.log(`     ✓ BackButton is visible\n`);
      } else {
        console.log(`  ⚠️  ${testPage.name} - Issue detected`);
        console.log(`     ${backButtonVisible ? '✓' : '✗'} BackButton visible\n`);
      }
    }

    console.log('✅ Verification complete!');
  } catch (error) {
    console.error('❌ Error during verification:', error.message);
  } finally {
    await browser.close();
  }
}

verifyJawiPages();
