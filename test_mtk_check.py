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
    time.sleep(5)
    
    # Full HTML of view container
    full_html = page.evaluate('document.querySelector(".view-container").innerHTML')
    print("mt-home-root in HTML:", "mt-home-root" in full_html)
    print("mt-module-page in HTML:", "mt-module-page" in full_html)
    print("Tahun in HTML:", "Tahun" in full_html)
    print("HTML length:", len(full_html))
    
    # Search for specific keywords
    keywords = ["mt-home-root", "mt-module-page", "mt-year", "Tahun 1", "Tahun 2"]
    for kw in keywords:
        idx = full_html.find(kw)
        if idx >= 0:
            print(f"Found '{kw}' at position {idx}, context: ...{full_html[max(0,idx-30):idx+len(kw)+30]}...")
    
    browser.close()
