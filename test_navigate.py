import sys
sys.stdout.reconfigure(encoding='utf-8')

from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1920, 'height': 1080})
    page.goto('http://localhost:5173/math-adventure/', timeout=60000)
    page.wait_for_load_state('networkidle')
    time.sleep(4)

    # Click MATEMATIK KSSR button
    page.locator('[role=button]:has-text("MATEMATIK KSSR")').first.click()
    time.sleep(2)

    # Click Tahun 1
    page.locator('button:has-text("Tahun 1")').first.click()
    time.sleep(2)
    
    # Click Pilih Modul to open dropdown
    page.locator('button:has-text("Pilih Modul")').first.click()
    time.sleep(1)
    
    # Click Panjang, Jisim & Cecair
    page.locator('button:has-text("Panjang, Jisim & Cecair")').first.click()
    time.sleep(2)
    
    # Now find all topic hub cards
    hub_buttons = page.locator('button').all()
    print("Module hub buttons:")
    for b in hub_buttons:
        text = b.text_content().strip()
        if text:
            print(f"  '{text[:80]}'")
    
    # Click Kenali Panjang dan Jarak
    page.locator('button:has-text("Kenali Panjang dan Jarak")').first.click()
    time.sleep(5)
    
    # Check what's on the page now
    print("\n--- Page after clicking topic ---")
    texts = page.locator('h1, h2, h3, p, .m6-question-card, .m6-ruler, [class*=question]')
    count = texts.count()
    print(f"Found {count} element texts:")
    for i in range(min(count, 30)):
        t = texts.nth(i)
        tag = t.evaluate('el => el.tagName')
        text = t.text_content().strip()[:100]
        if text:
            print(f"  <{tag}>: {text}")
    
    # Take a full page screenshot
    page.screenshot(path='C:\\Users\\izwan\\Desktop\\math-adventure\\test-activity.png', full_page=True)
    print("\nScreenshot saved")
    
    # Check if m6-ruler exists
    ruler_count = page.locator('.m6-ruler').count()
    print(f"m6-ruler elements: {ruler_count}")
    if ruler_count > 0:
        ruler = page.locator('.m6-ruler').first
        print("Ruler outer HTML:")
        print(ruler.evaluate('el => el.outerHTML')[:2000])
    
    browser.close()
