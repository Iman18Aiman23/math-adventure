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
    
    # Try force clicking MATEMATIK KSSR 
    mtk = page.locator('[role=button]:has-text("MATEMATIK KSSR")').first
    mtk.dispatch_event('click')
    time.sleep(4)
    
    # Check view container content
    vhtml = page.locator('.view-container').first.evaluate('el => el.innerHTML.substring(0, 2000)')
    print("View HTML after MTK click:")
    if 'mt-home-root' in vhtml or 'pi-home-root' in vhtml or 'mt-module' in vhtml:
        print("Found subject-specific content!")
    print(vhtml[:2000])
    
    # Check for year buttons
    year_btns = page.locator('button:has-text("Tahun")').all()
    print(f"\nYear buttons: {len(year_btns)}")
    for b in year_btns:
        print(f"  '{b.text_content().strip()[:80]}'")
    
    browser.close()
