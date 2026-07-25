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
    mtk.click()
    time.sleep(4)
    
    # Find and click the Tahun 1 year card
    tahun1 = page.locator('.mt-year.t1').first
    print(f"Tahun 1 card found: {tahun1.count()}")
    if tahun1.count() > 0:
        tahun1.click()
        time.sleep(4)
        
        # Check what's now in the view
        full_html = page.evaluate('document.querySelector(".view-container").innerHTML')
        print("mt-module-page in HTML:", "mt-module-page" in full_html)
        print("mt-module-page" in full_html)
        
        # Find all text content
        body_text = page.evaluate('document.querySelector(".view-container").textContent')
        keywords = ["Pilih Modul", "Nombor", "Ukuran", "Panjang", "Modul 6"]
        for kw in keywords:
            print(f"'{kw}' found: {kw in body_text}")
        
        # Take screenshot
        page.screenshot(path='C:\\Users\\izwan\\Desktop\\math-adventure\\step-module.png', full_page=True)
        print("\nScreenshot saved")
    
    browser.close()
