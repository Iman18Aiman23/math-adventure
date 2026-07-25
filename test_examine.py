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
    
    mtk = page.locator('[role=button]:has-text("MATEMATIK KSSR")').first
    mtk.click(force=True)
    time.sleep(4)
    
    vc = page.locator('.view-container').first
    inner = vc.evaluate('el => el.innerHTML.substring(0, 12000)')
    print("View container inner HTML (first 12000 chars):")
    print(inner)
    
    browser.close()
