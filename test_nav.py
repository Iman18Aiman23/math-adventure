from playwright.sync_api import sync_playwright
import time, sys

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1280, 'height': 800})
    page.goto('http://localhost:5173/math-adventure/', wait_until='networkidle')
    page.wait_for_timeout(3000)
    
    # Click Matematik
    page.locator('button:has-text("Matematik")').first.click()
    page.wait_for_timeout(2000)
    
    # Click Tahun 1
    page.locator('button:has-text("Tahun 1")').first.click()
    page.wait_for_timeout(2000)
    
    page.screenshot(path='C:\\Users\\izwan\\Desktop\\math-adventure\\test_m1_hub.png', full_page=True)
    print("Modul 1 hub screenshot taken")
    
    # Check visible text on page
    text = page.locator('.view-container').inner_text()
    print("Page text:", text[:1000])
    
    # Look for the Latihan dan cabaran section
    cabaran = page.locator('button:has-text("Latihan dan cabaran")')
    print("Found Latihan dan cabaran button:", cabaran.count())
    if cabaran.count() > 0:
        cabaran.click()
        page.wait_for_timeout(500)
        page.screenshot(path='C:\\Users\\izwan\\Desktop\\math-adventure\\test_expanded.png', full_page=True)
        print("Accordion expanded")
        
        # Look for dropdown button
        dropdown = page.locator('button:has-text("Pilih Aktiviti")')
        print("Found Pilih Aktiviti button:", dropdown.count())
        if dropdown.count() > 0:
            dropdown.click()
            page.wait_for_timeout(300)
            page.screenshot(path='C:\\Users\\izwan\\Desktop\\math-adventure\\test_dropdown_open.png', full_page=True)
            print("Dropdown opened")
            
            # Look for dropdown items
            selesai = page.locator('button:has-text("Selesaikan Cerita")')
            print("Found Selesaikan Cerita:", selesai.count())
            
            cabaran_btn = page.locator('button:has-text("Cabaran")')
            print("Found Cabaran button:", cabaran_btn.count())
            
            # Try clicking Selesaikan Cerita
            if selesai.count() > 0:
                selesai.click()
                page.wait_for_timeout(3000)
                page.screenshot(path='C:\\Users\\izwan\\Desktop\\math-adventure\\test_wheel.png', full_page=True)
                print("Clicked Selesaikan Cerita, title:", page.title())
                wheel_text = page.locator('.view-container').inner_text()
                print("Wheel page text:", wheel_text[:500])
    
    browser.close()
