import subprocess, time, sys, os, signal
from playwright.sync_api import sync_playwright

server = subprocess.Popen(
    ["npx.cmd", "vite", "--port", "5176", "--host"],
    cwd=r"C:\Users\izwan\Desktop\math-adventure",
    stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
    text=True, creationflags=subprocess.CREATE_NO_WINDOW
)

# Wait for server to be ready
for _ in range(30):
    line = server.stdout.readline()
    print(line.strip())
    if "ready in" in line or "Local:" in line:
        break
    if "error" in line.lower():
        break

time.sleep(2)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    
    # Mobile view
    context = browser.new_context(viewport={"width": 390, "height": 844})
    page = context.new_page()
    page.goto("http://localhost:5176/math-adventure/", timeout=20000)
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    
    # Home page screenshot
    page.screenshot(path="s0-home.png", full_page=True)
    
    # Click Matematik link
    page.locator("a[href*='matematik']").first.click()
    page.wait_for_timeout(3000)
    page.screenshot(path="s1-year.png", full_page=True)
    
    # Click Tahun 1 card
    page.locator("button.mt-year, .mt-year").first.click()
    page.wait_for_timeout(3000)
    page.screenshot(path="s2-m1.png", full_page=True)
    
    # Dump the HTML of the module page
    module_html = page.content()
    with open("modul1_html.txt", "w", encoding="utf-8") as f:
        f.write(module_html)
    
    # Open dropdown
    dropdown = page.locator(".mt-mnav-select")
    if dropdown.is_visible():
        dropdown.click()
        page.wait_for_timeout(1000)
        page.screenshot(path="s3-dropdown.png", full_page=True)
    
    # Get all visible text
    text = page.inner_text("body")
    with open("modul1_text.txt", "w", encoding="utf-8") as f:
        f.write(text)
    
    browser.close()

server.terminate()
server.wait(timeout=5)
print("\nDone. Screenshots saved.")
