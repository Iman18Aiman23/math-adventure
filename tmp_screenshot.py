from playwright.sync_api import sync_playwright
import time, sys, re

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 390, "height": 844})
    
    page.goto('http://localhost:5174/math-adventure/')
    page.wait_for_load_state('networkidle')
    time.sleep(3)
    
    # Dismiss welcome overlay
    welcome_btn = page.locator("button.welcome-btn:not([disabled])")
    if welcome_btn.count() > 0:
        welcome_btn.click()
        time.sleep(1)
    else:
        page.evaluate("document.querySelector('.welcome-overlay')?.remove()")
        time.sleep(0.5)
    
    page.wait_for_load_state('networkidle')
    time.sleep(1)
    
    # Navigate through
    page.locator("button:has-text('PENDIDIKAN ISLAM')").click()
    time.sleep(1.5)
    page.wait_for_load_state('networkidle')
    
    page.locator("button:has-text('Tahun 2')").click()
    time.sleep(1.5)
    page.wait_for_load_state('networkidle')
    
    page.locator("button:has-text('Al-Quran')").click()
    time.sleep(1.5)
    page.wait_for_load_state('networkidle')
    
    page.locator("button:has-text('Sukun')").click()
    time.sleep(2)
    page.wait_for_load_state('networkidle')
    
    # Save full page HTML to file
    html = page.content()
    with open('page_dump.html', 'w', encoding='utf-8') as f:
        f.write(html)
    
    # Check what's visible
    page.screenshot(path='screenshot.png', full_page=True)
    
    # Find Topik Pembelajaran in text
    body_text = page.locator("body").inner_text()
    for line in body_text.split('\n'):
        if 'topik' in line.lower() or 'pembelajaran' in line.lower():
            print(f"FOUND: {line.strip()}")
    
    # Check scl-progress elements
    progress = page.locator(".scl-progress")
    print(f"Progress elements: {progress.count()}")
    if progress.count() > 0:
        print(f"Progress text: {progress.inner_text()}")
    
    # Check scl-sec-title elements  
    titles = page.locator(".scl-sec-title")
    print(f"Section titles: {titles.count()}")
    if titles.count() > 0:
        print(f"Title text: {titles.inner_text()}")
    
    # Check scl-topbar breadcrumb
    crumb = page.locator(".scl-crumb")
    print(f"Breadcrumb: {crumb.count()}")
    if crumb.count() > 0:
        print(f"Breadcrumb text: {crumb.inner_text()}")
    
    print("Done! Check screenshot.png and page_dump.html")
    browser.close()
