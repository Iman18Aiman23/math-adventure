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
    time.sleep(4)
    
    page.locator('.mt-mnav-select').first.click()
    time.sleep(1)
    page.locator('.mt-mnav-menu-option:has-text("Panjang, Jisim & Cecair")').first.click()
    time.sleep(4)
    
    page.locator('button:has-text("Kenali Panjang dan Jarak")').first.click()
    time.sleep(8)
    
    # Advance through questions until we see a ruler
    # The structure: Activity 1 has comparison buttons, Activity 2 has the ruler
    for attempt in range(15):
        ruler_count = page.locator('.m6-ruler').count()
        qcard = page.locator('.m6-question-card').first
        has_ruler = ruler_count > 0
        print(f"Attempt {attempt}: m6-ruler={ruler_count}, question card visible={qcard.count()}")
        
        if has_ruler:
            print("RULER FOUND!")
            break
        
        # Check for comparison buttons and click one
        comp_btns = page.locator('.m6-length-comparison-row.is-button, .m6-object-tile button').all()
        if comp_btns:
            comp_btns[0].click()
            time.sleep(3)
            
            # Look for next button (arrow/continue)
            next_btns = page.locator('button:has-text("Next"), button:has-text("Seterusnya"), button:has-text("Lanjut"), [class*=next], [class*=continue], [class*=lanjut]').all()
            if next_btns:
                next_btns[0].click()
                time.sleep(3)
            else:
                time.sleep(2)
        else:
            # No comparison buttons - maybe there's a word options grid
            opt_btns = page.locator('.m6-options button, .m6-options-grid button, [class*=OptionGrid] button').all()
            if opt_btns:
                opt_btns[0].click()
                time.sleep(3)
                
                next_btns = page.locator('button:has-text("Next"), button:has-text("Seterusnya"), button:has-text("Lanjut"), [class*=next], [class*=continue], [class*=lanjut]').all()
                if next_btns:
                    next_btns[0].click()
                    time.sleep(3)
                else:
                    time.sleep(2)
            else:
                time.sleep(3)
    
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
        print("Lane left edge: " + str(round(lane_box['left'], 2)))
        print("Lane width: " + str(round(lane_box['width'], 2)))
        print("SVG width: " + str(round(scale_box['width'], 2)))
        print("Object offset from SVG zero: " + str(round(obj_box['left'] - svg_zero, 2)) + "px")
        print("Object offset from content edge: " + str(round(obj_box['left'] - content_edge, 2)) + "px")
        
        post_expected = 14/550 * scale_box['width']
        print("Expected object left offset (2.545% of SVG width): " + str(round(post_expected, 2)) + "px")
        
        green = page.locator('.m6-measure-line').first
        green_box = green.evaluate("function(el) { var r = el.getBoundingClientRect(); return {left: r.left, width: r.width, right: r.right} }")
        print("\nGreen line left: " + str(round(green_box['left'], 2)))
        print("Green offset from object: " + str(round(green_box['left'] - obj_box['left'], 2)) + "px")
        print("Green offset from SVG zero: " + str(round(green_box['left'] - svg_zero, 2)) + "px")
        
        obj_left_css = obj.evaluate("function(el) { return window.getComputedStyle(el).left }")
        print("Object computed left: " + obj_left_css)
        print("Object computed width: " + obj.evaluate("function(el) { return window.getComputedStyle(el).width }"))
        
        page.screenshot(path='C:\\Users\\izwan\\Desktop\\math-adventure\\ruler-test.png', full_page=True)
        print("\nRuler screenshot saved")
    else:
        page.screenshot(path='C:\\Users\\izwan\\Desktop\\math-adventure\\no-ruler.png', full_page=True)
        print("No ruler found, screenshot saved")
    
    browser.close()
