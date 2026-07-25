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

    # Click Mula Belajar
    page.locator('input').first.fill('Test')
    time.sleep(0.5)
    page.locator('button:has-text("Mula Belajar")').first.click()
    time.sleep(3)
    
    # Click MATEMATIK KSSR
    page.locator('[role=button]:has-text("MATEMATIK KSSR")').first.click()
    time.sleep(4)
    
    # Check view container
    view = page.locator('.view-container')
    print(f"View container found: {view.count()}")
    if view.count() > 0:
        vhtml = view.first.evaluate('el => el.innerHTML.substring(0, 5000)')
        print("View container HTML (first 5000 chars):")
        print(vhtml[:5000])
    
    browser.close()
