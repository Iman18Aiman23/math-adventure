import sys
sys.stdout.reconfigure(encoding='utf-8')

from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1920, 'height': 1080})
    page.goto('http://localhost:5173/math-adventure/', timeout=60000)
    page.wait_for_load_state('networkidle')
    time.sleep(5)
    
    # Find all button-like elements
    all_buttons = page.locator('button').all()
    print(f"Total buttons: {len(all_buttons)}")
    for b in all_buttons:
        text = b.text_content().strip()
        if text:
            print(f"  button: '{text[:80]}'")
    
    # Also look for clickable divs
    clickables = page.locator('[role="button"]').all()
    print(f"\nRole=button elements: {len(clickables)}")
    for c in clickables[:10]:
        text = c.text_content().strip()
        if text:
            print(f"  [role=button]: '{text[:80]}'")
    
    browser.close()
