import os

from playwright.sync_api import sync_playwright


URL = os.environ.get("TEST_URL", "http://127.0.0.1:5173/math-adventure/")


def click(locator):
    locator.evaluate("element => element.click()")


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 390, "height": 844})
    page.set_default_timeout(60_000)
    page.route("https://**", lambda route: route.abort())
    page.goto(URL, wait_until="networkidle", timeout=120_000)
    page.evaluate("localStorage.setItem('mathAdventurePlayer', 'Tester')")
    page.reload(wait_until="networkidle", timeout=120_000)

    home = page.locator(".card-matematik-kssr")
    year_page = page.locator(".mt-home-root")
    module_page = page.locator(".mt-module-page")

    click(home)
    year_page.wait_for(state="visible")
    click(page.locator(".mt-year.t1"))
    module_page.wait_for(state="visible")

    # The app header, phone Back, and browser Back must follow the same trail.
    click(page.locator(".mt-top-back"))
    year_page.wait_for(state="visible")
    click(page.locator(".mt-year.t1"))
    module_page.wait_for(state="visible")

    page.go_back(timeout=15_000)
    year_page.wait_for(state="visible")
    page.go_back(timeout=15_000)
    home.wait_for(state="visible")

    click(home)
    year_page.wait_for(state="visible")
    click(page.locator(".mt-home-back button"))
    home.wait_for(state="visible")

    click(page.locator(".card-reading"))
    reading_level = page.locator(".rp-icon-card.level-3")
    reading_level.wait_for(state="visible")
    click(reading_level)
    page.locator(".reading-page-wrapper").wait_for(state="visible")
    page.go_back(timeout=15_000)
    reading_level.wait_for(state="visible")
    page.go_back(timeout=15_000)
    home.wait_for(state="visible")

    # Mobile browsers discard background tabs; a reload must restore the route.
    click(home)
    year_page.wait_for(state="visible")
    click(page.locator(".mt-year.t1"))
    module_page.wait_for(state="visible")
    click(page.locator(".pi-mhub-lesson-button", has_text="Banding Banyak Sedikit"))
    topic_page = page.locator(".mt-topic-shell")
    topic_page.wait_for(state="visible")
    page.reload(wait_until="networkidle", timeout=120_000)
    topic_page.wait_for(state="visible")

    browser.close()
    print("PASS: Back navigation works and a discarded tab restores its last page")
