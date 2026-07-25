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

    page.locator('[role=button]:has-text("MATEMATIK KSSR")').first.click()
    time.sleep(4)
    page.locator('.mt-year.t1').first.click()
    time.sleep(5)
    
    # Click the module selector button (currently shows "Nombor Hingga 100")
    page.locator('.mt-mnav-select').first.click()
    time.sleep(1)
    
    # Now click Panjang, Jisim & Cecair from the menu
    page.locator('.mt-mnav-menu-option:has-text("Panjang, Jisim & Cecair")').first.click()
    time.sleep(3)
    
    # Now click Kenali Panjang dan Jarak
    page.locator('button:has-text("Kenali Panjang dan Jarak")').first.click()
    time.sleep(5)
    
    for i in range(10):
        ruler_count = page.locator('.m6-ruler').count()
        print("Attempt " + str(i+1) + ": m6-ruler count = " + str(ruler_count))
        if ruler_count > 0:
            break
        time.sleep(2)
    
    if page.locator('.m6-ruler').count() > 0:
        js_get_box = """
        function(el) {
            var r = el.getBoundingClientRect();
            var cs = window.getComputedStyle(el);
            return {
                left: r.left, top: r.top, width: r.width, height: r.height,
                pl: cs.paddingLeft, pr: cs.paddingRight
            };
        }
        """
        ruler_el = page.locator('.m6-ruler').first
        ruler_box = ruler_el.evaluate(js_get_box.strip())
        print("Ruler box: " + str(ruler_box))
        
        obj = page.locator('.m6-ruler-object').first
        obj_box = obj.evaluate("function(el) { var r = el.getBoundingClientRect(); return {left: r.left, top: r.top, width: r.width, height: r.height, right: r.right} }")
        print("Object box: " + str(obj_box))
        
        end = page.locator('.m6-ruler-end').first
        end_box = end.evaluate("function(el) { var r = el.getBoundingClientRect(); return {left: r.left, width: r.width, right: r.right} }")
        print("End marker: " + str(end_box))
        
        scale = page.locator('.m6-ruler-scale').first
        scale_box = scale.evaluate("function(el) { var r = el.getBoundingClientRect(); return {left: r.left, width: r.width, right: r.right} }")
        print("SVG: " + str(scale_box))
        
        lane = page.locator('.m6-ruler-object-lane').first
        lane_box = lane.evaluate("function(el) { var r = el.getBoundingClientRect(); return {left: r.left, width: r.width, right: r.right} }")
        print("Lane: " + str(lane_box))
        
        svg_zero = scale_box['left'] + 14/550 * scale_box['width']
        pl_px = float(ruler_box['pl'].replace('px',''))
        content_edge = ruler_box['left'] + pl_px
        
        print("\nRuler content left edge (after padding): " + str(round(content_edge, 2)))
        print("SVG zero mark (viewBox x=14): " + str(round(svg_zero, 2)))
        print("Object left edge: " + str(round(obj_box['left'], 2)))
        print("Object offset from content edge: " + str(round(obj_box['left'] - content_edge, 2)) + "px")
        print("Object offset from SVG zero: " + str(round(obj_box['left'] - svg_zero, 2)) + "px")
        
        green = page.locator('.m6-measure-line').first
        green_box = green.evaluate("function(el) { var r = el.getBoundingClientRect(); return {left: r.left, width: r.width, right: r.right} }")
        print("\nGreen line: " + str(green_box))
        print("Green line offset from object: " + str(round(green_box['left'] - obj_box['left'], 2)) + "px")
        
        obj_left_css = obj.evaluate("function(el) { return window.getComputedStyle(el).left }")
        print("Object computed left: " + obj_left_css)
        
        page.screenshot(path='C:\\Users\\izwan\\Desktop\\math-adventure\\ruler-test.png', full_page=True)
        print("\nScreenshot saved")
    else:
        body_text = page.evaluate('document.querySelector(".view-container").textContent')
        print("Page text:")
        print(body_text[:1500])
    
    browser.close()
