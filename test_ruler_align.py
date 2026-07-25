import sys
sys.stdout.reconfigure(encoding='utf-8')

from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1920, 'height': 1080})
    page.goto('http://localhost:5173/math-adventure/')
    page.wait_for_load_state('networkidle')
    time.sleep(3)

    # Click Matematik KSSR
    btns = page.locator('button:has-text("MATEMATIK KSSR")')
    print(f"Matematik KSSR buttons found: {btns.count()}")
    btns.first.click()
    time.sleep(2)
    
    # Click Tahun 1
    t1 = page.locator('button:has-text("Tahun 1")')
    print(f"Tahun 1 buttons found: {t1.count()}")
    t1.first.click()
    time.sleep(2)
    
    # Open module selector
    mod = page.locator('button:has-text("Pilih Modul")')
    print(f"Pilih Modul buttons found: {mod.count()}")
    mod.first.click()
    time.sleep(1)
    
    # Click Ukuran module
    ukur = page.locator('button:has-text("Panjang, Jisim & Cecair")')
    print(f"Ukuran buttons found: {ukur.count()}")
    ukur.first.click()
    time.sleep(2)
    
    # Now find and click Kenali Panjang dan Jarak
    # Use XPath
    kp = page.locator('xpath=//button[contains(., "Kenali Panjang dan Jarak")]')
    print(f"Kenali Panjang buttons found: {kp.count()}")
    kp.first.click()
    time.sleep(5)
    
    # Check page content
    body_text = page.eval_on_selector('body', 'el => el.textContent')
    print("Page text (first 2000 chars):")
    print(body_text[:2000])
    
    # Look for ruler elements
    rulers = page.locator('.m6-ruler')
    print(f"Ruler elements found: {rulers.count()}")
    
    page.screenshot(path='C:\\Users\\izwan\\Desktop\\math-adventure\\test-screenshot.png', full_page=True)
    print("Screenshot saved")
    
    browser.close()
