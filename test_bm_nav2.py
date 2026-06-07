from playwright.sync_api import sync_playwright

URL = "http://localhost:5175/math-adventure/"
errors = []

def safe_print(*a):
    print(*[str(x).encode('ascii', 'replace').decode('ascii') for x in a])

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, args=["--no-sandbox", "--disable-dev-shm-usage"])
    page = browser.new_page(viewport={"width": 430, "height": 850})
    page.on("console", lambda msg: errors.append(msg.text) if msg.type == "error" else None)
    page.on("pageerror", lambda exc: errors.append(str(exc)))

    page.goto(URL)
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(1500)

    overlay = page.locator('.welcome-overlay')
    if overlay.count() > 0:
        inp = overlay.locator('input')
        if inp.count() > 0:
            inp.first.fill("Tester")
        overlay.locator('button:has-text("Mula Belajar")').first.click()
        page.wait_for_timeout(1000)

    page.locator("text=B. MELAYU KSSR").first.click()
    page.wait_for_timeout(1500)

    for year in [2, 3]:
        page.locator(f"text=Tahun {year}").first.click()
        page.wait_for_timeout(1200)
        safe_print(f"Tahun {year} tabs:", page.locator('button, a').all_inner_texts()[:20])
        page.screenshot(path=f'./03_bm_year{year}_modules.png')
        page.go_back()
        page.wait_for_timeout(1000)
        page.locator("text=B. MELAYU KSSR").first.click()
        page.wait_for_timeout(1200)

    browser.close()
    safe_print("CONSOLE ERRORS:", errors)
