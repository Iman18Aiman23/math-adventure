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

    # Click input and type name
    input_el = page.locator('input[type=text]').first
    input_el.click()
    input_el.fill('Test')
    time.sleep(0.5)
    
    # Check if button is now enabled
    mula_btn = page.locator('button:has-text("Mula Belajar")').first
    print(f"Mula Belajar enabled: {mula_btn.is_enabled()}")
    mula_btn.click()
    time.sleep(3)
    
    # Check for overlays
    overlay = page.locator('.welcome-overlay')
    print(f"Welcome overlay visible: {overlay.count()}")
    
    # Take screenshot at this point
    page.screenshot(path='C:\\Users\\izwan\\Desktop\\math-adventure\\step1.png', full_page=True)
    
    # Find clickable subject cards
    subjects = page.locator('[role=button]').all()
    print(f"\nRole=button elements after welcome:")
    for s in subjects:
        cls = s.get_attribute('class')
        text = s.text_content().strip()[:60]
        visible = s.is_visible()
        print(f"  class={cls}, visible={visible}, text='{text}'")
    
    # Try clicking on MATEMATIK KSSR using position
    mtk_subject = page.locator('[role=button]:has-text("MATEMATIK KSSR")').first
    print(f"\nMTK subject exists: {mtk_subject.count()}")
    print(f"MTK subject visible: {mtk_subject.is_visible()}")
    
    if mtk_subject.count() > 0 and mtk_subject.is_visible():
        mtk_subject.click()
        time.sleep(4)
        
        # Take screenshot after click
        page.screenshot(path='C:\\Users\\izwan\\Desktop\\math-adventure\\step2.png', full_page=True)
        
        # Check what's on the page now
        vc = page.locator('.view-container').first
        vhtml = vc.evaluate('el => el.innerHTML.substring(0, 3000)')
        print("\nView container after MTK click:")
        if 'mt-home-root' in vhtml or 'mt-module' in vhtml or 'Tahun' in vhtml:
            print("NAVIGATION WORKED!")
        print(vhtml[:1500])
    
    browser.close()
