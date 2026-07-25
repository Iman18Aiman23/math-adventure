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

    # Fill name and click Mula Belajar
    page.locator('input').first.fill('Test')
    time.sleep(0.5)
    page.locator('button:has-text("Mula Belajar")').first.click()
    time.sleep(3)
    
    # Check all buttons on page
    btns = page.locator('button, [role=button]').all()
    print("All clickable elements:")
    for b in btns:
        text = b.text_content().strip()[:100]
        tag = b.evaluate('el => el.tagName')
        if text:
            print(f"  <{tag}>: '{text}'")
    
    browser.close()
