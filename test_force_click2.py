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

    # Click Mula Belajar - enter name first
    page.locator('input').first.fill('Test')
    time.sleep(0.5)
    page.locator('button:has-text("Mula Belajar")').first.click()
    time.sleep(3)
    
    # Try clicking with force=True
    mtk = page.locator('[role=button]:has-text("MATEMATIK KSSR")').first
    mtk.click(force=True)
    time.sleep(4)
    
    # Check what happened
    vhtml = page.locator('.view-container').first.evaluate('el => el.outerHTML')
    print("View container outer HTML (first 2000):")
    print(vhtml[:2000])
    
    # Check all text looking for Tahun or mt-home
    body = page.evaluate('document.body.textContent')
    if 'mt-home' in vhtml:
        print("FOUND mt-home!")
    if 'Tahun 1' in body:
        print("FOUND Tahun 1 text!")
    if 'matematik' in body.lower():
        print("FOUND matematik!")
    
    browser.close()
