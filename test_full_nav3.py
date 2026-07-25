import sys
sys.stdout.reconfigure(encoding='utf-8')

from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1920, 'height': 1080})
    page.goto('http://localhost:5173/math-adventure/', timeout=60000)
    page.wait_for_load_state('networkidle')
    time.sleep(3)

    page.locator('input').first.fill('Test')
    time.sleep(0.5)
    page.locator('button:has-text("Mula Belajar")').first.click()
    time.sleep(3)

    page.locator('[role=button]:has-text("MATEMATIK KSSR")').first.click()
    time.sleep(4)
    page.locator('.mt-year.t1').first.click()
    time.sleep(4)
    
    page.locator('.mt-mnav-select').first.click()
    time.sleep(1)
    page.locator('.mt-mnav-menu-option:has-text("Panjang, Jisim & Cecair")').first.click()
    time.sleep(4)
    
    page.locator('button:has-text("Kenali Panjang dan Jarak")').first.click()
    time.sleep(10)
    
    body_text = page.evaluate('document.querySelector(".view-container").textContent')
    print("Page text (first 3000):")
    print(body_text[:3000])
    
    # Check for Mula aktiviti or other buttons
    btns = page.locator('.view-container button').all()
    print("\nAll buttons on current page:")
    for b in btns:
        t = b.text_content().strip()[:80]
        if t:
            print("  '" + t + "'")
    
    # Check for specific loading elements
    print("\n.explore-message elements:", page.locator('.explore-message').count())
    print("MatematikExplore elements:", page.locator('[class*=MatematikExplore]').count())
    print("m6-question-card elements:", page.locator('.m6-question-card').count())
    
    page.screenshot(path='C:\\Users\\izwan\\Desktop\\math-adventure\\ruler-loading.png', full_page=True)
    print("\nScreenshot saved")
    
    browser.close()
