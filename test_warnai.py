from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 800})
    
    # 1. Home page
    page.goto("http://localhost:5174/math-adventure/")
    page.wait_for_load_state("networkidle")
    page.screenshot(path="C:\\Users\\izwan\\Desktop\\math-adventure\\test_screens\\01-home.png", full_page=True)
    print("01-home.png saved")

    # 2. Click Matematik subject
    mt = page.locator("text=Matematik").first()
    if mt.is_visible():
        mt.click()
        page.wait_for_timeout(2000)
        page.screenshot(path="C:\\Users\\izwan\\Desktop\\math-adventure\\test_screens\\02-matematik-home.png", full_page=True)
        print("02-matematik-home.png saved")

        # 3. Click Tahun 1
        t1 = page.locator("text=Tahun 1").first()
        if t1.is_visible():
            t1.click()
            page.wait_for_timeout(2000)
            page.screenshot(path="C:\\Users\\izwan\\Desktop\\math-adventure\\test_screens\\03-modules.png", full_page=True)
            print("03-modules.png saved")

            # 4. Click Modul 2 - Tambah dan Tolak
            mod2 = page.locator("text=Tambah dan Tolak").first()
            if mod2.is_visible():
                mod2.click()
                page.wait_for_timeout(2000)
                page.screenshot(path="C:\\Users\\izwan\\Desktop\\math-adventure\\test_screens\\04-module2.png", full_page=True)
                print("04-module2.png saved")

                # 5. Look for Latihan Tambah or Warnai
                # Try clicking Latih Diri first (which likely contains Warnai)
                latih_diri = page.locator("text=Latih Diri").first()
                if latih_diri.is_visible():
                    latih_diri.click()
                    page.wait_for_timeout(3000)
                    page.screenshot(path="C:\\Users\\izwan\\Desktop\\math-adventure\\test_screens\\05-latihan.png", full_page=True)
                    print("05-latihan.png saved")
                    
                    # Check page content
                    content = page.content()
                    with open("C:\\Users\\izwan\\Desktop\\math-adventure\\test_screens\\page05.html", "w", encoding="utf-8") as f:
                        f.write(content)
                    print("page05.html saved")
                    
                    # Try to find Mudah level button
                    mudah = page.locator("text=Mudah").first()
                    if mudah.is_visible():
                        mudah.click()
                        page.wait_for_timeout(3000)
                        page.screenshot(path="C:\\Users\\izwan\\Desktop\\math-adventure\\test_screens\\06-warnai.png", full_page=True)
                        print("06-warnai.png saved")
                        
                        content2 = page.content()
                        with open("C:\\Users\\izwan\\Desktop\\math-adventure\\test_screens\\page06.html", "w", encoding="utf-8") as f:
                            f.write(content2)
                        print("page06.html saved")
                        
                        # Take another screenshot after animations settle
                        page.wait_for_timeout(1000)
                        page.screenshot(path="C:\\Users\\izwan\\Desktop\\math-adventure\\test_screens\\07-warnai-settled.png", full_page=True)
                        print("07-warnai-settled.png saved")

    browser.close()
    print("Done")
