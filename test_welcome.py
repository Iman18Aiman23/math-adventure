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
    
    # Check if welcome overlay exists
    overlay = page.locator('.welcome-overlay')
    print(f"Welcome overlay count: {overlay.count()}")
    if overlay.count() > 0:
        # Get the overlay HTML
        html = overlay.first.evaluate('el => el.outerHTML')
        print(f"Overlay HTML (first 2000 chars):")
        print(html[:2000])
    
    # Check for input fields
    inputs = page.locator('input').all()
    print(f"\nInput fields: {len(inputs)}")
    for inp in inputs:
        print(f"  input: type={inp.get_attribute('type')}, placeholder={inp.get_attribute('placeholder')}, id={inp.get_attribute('id')}")
    
    # Check buttons in the overlay
    btns = overlay.first.locator('button').all() if overlay.count() > 0 else []
    print(f"\nOverlay buttons: {len(btns)}")
    for b in btns:
        print(f"  button: text='{b.text_content().strip()[:60]}', disabled={b.is_disabled()}, visible={b.is_visible()}")
    
    browser.close()
