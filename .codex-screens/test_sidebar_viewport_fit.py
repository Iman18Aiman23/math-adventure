from pathlib import Path

from playwright.sync_api import TimeoutError as PlaywrightTimeoutError
from playwright.sync_api import sync_playwright


URL = "http://127.0.0.1:5173/math-adventure/"
SCREENSHOT = Path(__file__).with_name("sidebar-fit-1366x630.png")


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1366, "height": 630})
    errors = []
    page.on("console", lambda message: errors.append(f"console:{message.type}:{message.text}") if message.type == "error" else None)
    page.on("pageerror", lambda error: errors.append(f"pageerror:{error}"))
    page.add_init_script("localStorage.setItem('mathAdventurePlayer', 'Iman')")
    page.goto(URL, wait_until="domcontentloaded")
    try:
        page.wait_for_load_state("networkidle", timeout=10_000)
    except PlaywrightTimeoutError:
        pass  # Vite's development connection can remain active.
    try:
        page.locator(".home-settings-btn").wait_for()
    except PlaywrightTimeoutError:
        page.screenshot(path=str(SCREENSHOT))
        print({"url": page.url, "errors": errors, "body": page.locator("body").inner_text()[:500]})
        raise

    result = page.evaluate(
        """() => {
          const sidebar = document.querySelector('.desktop-sidebar');
          const panel = document.querySelector('.sidebar-menu-panel');
          const stats = document.querySelector('.sb-bundle-btn');
          const settings = document.querySelector('.home-settings-btn');
          const rect = element => {
            const box = element.getBoundingClientRect();
            return { x: box.x, y: box.y, width: box.width, height: box.height };
          };
          return {
            geometry: {
              clientHeight: sidebar.clientHeight,
              scrollHeight: sidebar.scrollHeight,
              scrollTop: sidebar.scrollTop,
              overflowY: getComputedStyle(sidebar).overflowY,
            },
            panelBackground: getComputedStyle(panel).backgroundColor,
            sidebarBox: rect(sidebar),
            statsBox: rect(stats),
            settingsBox: rect(settings),
          };
        }"""
    )
    page.screenshot(path=str(SCREENSHOT))
    browser.close()

print(result)
assert result["panelBackground"] == "rgba(0, 0, 0, 0)"
assert abs(result["statsBox"]["y"] - result["settingsBox"]["y"]) <= 1, "Stats and Settings must share one row"
assert max(result["statsBox"]["y"] + result["statsBox"]["height"], result["settingsBox"]["y"] + result["settingsBox"]["height"]) <= result["sidebarBox"]["y"] + result["sidebarBox"]["height"]
assert result["geometry"]["scrollHeight"] <= result["geometry"]["clientHeight"], result["geometry"]
