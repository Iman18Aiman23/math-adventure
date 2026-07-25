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
    
    # Get buttons in view container
    btns = page.locator('.view-container button').all()
    print("Buttons in view container:")
    for b in btns:
        print("  '" + b.text_content().strip()[:80] + "'")
    
    # Check for clickable elements with Tahun text  
    tahun_btns = page.locator('button:has-text("Tahun")').all()
    print("\nTahun buttons:")
    for b in tahun_btns:
        print("  '" + b.text_content().strip()[:80] + "'")
    
    browser.close()
