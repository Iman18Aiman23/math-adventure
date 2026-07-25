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
    time.sleep(5)
    
    # Check what buttons are present
    btns = page.locator('.view-container button').all()
    print("Buttons available:")
    for b in btns:
        t = b.text_content().strip()[:60]
        if t:
            print("  " + t)
    
    # Try clicking Pilih Modul through text content of dropdown
    pilih = page.locator('.mt-mnav-select, [class*=mnav] button').first
    print("Pilih element count: " + str(pilih.count()))
    if pilih.count() > 0:
        print("Pilih text: " + pilih.text_content().strip()[:60])
        pilih.click()
        time.sleep(1)
    
    # Check for module options
    options = page.locator('.mt-mnav-menu-option, [class*=mnav-menu] button').all()
    print("\nModule options:")
    for o in options:
        print("  " + o.text_content().strip()[:60])
    
    browser.close()
