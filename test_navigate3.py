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

    # Fill name and click Mula Belajar
    page.locator('input').first.fill('Test')
    time.sleep(1)
    page.locator('button:has-text("Mula Belajar")').first.click()
    time.sleep(2)

    # Click MATEMATIK KSSR
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
    
    # Click Kenali Panjang dan Jarak
    page.locator('button:has-text("Kenali Panjang dan Jarak")').first.click()
    time.sleep(5)
    
    # Check what's on the page now
    print("--- Page after clicking topic ---")
    body_text = page.evaluate('document.body.textContent')
    print(body_text[:2000])
    
    # Check if m6-ruler exists
    ruler_count = page.locator('.m6-ruler').count()
    print(f"\nm6-ruler elements: {ruler_count}")
    if ruler_count > 0:
        ruler = page.locator('.m6-ruler').first
        print("Ruler outer HTML:")
        print(ruler.evaluate('el => el.outerHTML')[:2000])
    
    # Get bounding rects
    ruler_count = page.locator('.m6-ruler').count()
    if ruler_count > 0:
        obj = page.locator('.m6-ruler-object').first
        box = obj.evaluate('el => { const r = el.getBoundingClientRect(); return {left: r.left, top: r.top, width: r.width, height: r.height} }')
        print(f"\nObject bounding rect: {box}")
        
        end_marker = page.locator('.m6-ruler-end').first
        end_box = end_marker.evaluate('el => { const r = el.getBoundingClientRect(); return {left: r.left, top: r.top, width: r.width, height: r.height} }')
        print(f"End marker: {end_box}")
        
        scale = page.locator('.m6-ruler-scale').first
        scale_box = scale.evaluate('el => { const r = el.getBoundingClientRect(); return {left: r.left, top: r.top, width: r.width, height: r.height} }')
        print(f"SVG: {scale_box}")
        
        ruler = page.locator('.m6-ruler').first
        ruler_box = ruler.evaluate('el => { const r = el.getBoundingClientRect(); return {left: r.left, top: r.top, width: r.width, height: r.height, pl: window.getComputedStyle(el).paddingLeft, pr: window.getComputedStyle(el).paddingRight} }')
        print(f"Ruler: {ruler_box}")
        
        # SVG 0 mark = svg_left + 14/550 * svg_width
        svg_zero_x = scale_box['left'] + 14/550 * scale_box['width']
        obj_left = box['left']
        print(f"\nSVG zero mark X: {svg_zero_x:.2f}")
        print(f"Object left edge X: {obj_left:.2f}")
        print(f"Difference: {obj_left - svg_zero_x:.2f}px")
        
        # Also check the right edge alignment
        obj_right = box['left'] + box['width']
        end_x = end_box['left']
        print(f"Object right edge X: {obj_right:.2f}")
        print(f"End marker X: {end_x:.2f}")
        print(f"End diff: {end_x - obj_right:.2f}px")
    
    page.screenshot(path='C:\\Users\\izwan\\Desktop\\math-adventure\\test-ruler.png', full_page=True)
    print("\nScreenshot saved")
    
    browser.close()
