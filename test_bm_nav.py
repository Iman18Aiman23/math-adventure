from playwright.sync_api import sync_playwright

URL = "http://localhost:5173/math-adventure/"
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
        # try typing a name then clicking start
        inp = overlay.locator('input')
        if inp.count() > 0:
            inp.first.fill("Tester")
        overlay.locator('button:has-text("Mula Belajar")').first.click()
        page.wait_for_timeout(1000)
    safe_print("overlay still present:", page.locator('.welcome-overlay').count())

    # Click "B. MELAYU KSSR" card
    page.locator("text=B. MELAYU KSSR").first.click()
    page.wait_for_timeout(1500)
    safe_print("After clicking BM KSSR:", page.locator('button, a').all_inner_texts()[:30])
    page.screenshot(path='./01_bm_home.png')

    # Click Tahun 1
    page.locator("text=Tahun 1").first.click()
    page.wait_for_timeout(1500)
    safe_print("After clicking Tahun 1:", page.locator('button, a').all_inner_texts()[:80])
    page.screenshot(path='./02_bm_year1_modules.png')

    browser.close()
    safe_print("CONSOLE ERRORS:", errors)
