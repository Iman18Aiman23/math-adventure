"""Test the dropdown menu in the Latihan dan cabaran topic."""
from playwright.sync_api import sync_playwright
import sys

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 800})
    page.goto('http://localhost:5174/math-adventure/')
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(2000)

    # Dismiss welcome overlay if present
    close_btn = page.locator('.welcome-overlay button, .welcome-modal button, .welcome button, [class*="welcome"] button, .close-button, [aria-label="Close"]')
    if close_btn.count() > 0:
        close_btn.first.click()
        page.wait_for_timeout(500)
        print('OK: Dismissed welcome overlay')

    page.screenshot(path='C:\\Users\\izwan\\Desktop\\math-adventure\\.claude\\skills\\run-math-adventure\\screenshot-home.png', full_page=True)

    # Click Matematik KSSR
    page.get_by_role("button", name="Matematik KSSR").click()
    page.wait_for_timeout(1500)
    page.screenshot(path='C:\\Users\\izwan\\Desktop\\math-adventure\\.claude\\skills\\run-math-adventure\\screenshot-matematik.png', full_page=True)

    # Click Tahun 1
    page.locator('text=Tahun 1').click()
    page.wait_for_timeout(1500)
    page.screenshot(path='C:\\Users\\izwan\\Desktop\\math-adventure\\.claude\\skills\\run-math-adventure\\screenshot-tahun1.png', full_page=True)

    # Click Nombor Hingga 100
    page.locator('text=Nombor Hingga 100').click()
    page.wait_for_timeout(1500)
    page.screenshot(path='C:\\Users\\izwan\\Desktop\\math-adventure\\.claude\\skills\\run-math-adventure\\screenshot-module.png', full_page=True)

    # Find and click "Latihan dan cabaran" accordion
    panel = page.locator('text=Latihan dan cabaran')
    panel.scroll_into_view_if_needed()
    panel.click()
    page.wait_for_timeout(1000)
    page.screenshot(path='C:\\Users\\izwan\\Desktop\\math-adventure\\.claude\\skills\\run-math-adventure\\screenshot-latihan.png', full_page=True)

    # Check for the dropdown button
    dropdown_btn = page.locator('button:has-text("Pilih Aktiviti")')
    if dropdown_btn.is_visible():
        print('OK: Dropdown button "Pilih Aktiviti" is visible')
        dropdown_btn.click()
        page.wait_for_timeout(500)
        page.screenshot(path='C:\\Users\\izwan\\Desktop\\math-adventure\\.claude\\skills\\run-math-adventure\\screenshot-dropdown-open.png', full_page=True)

        # Check dropdown items
        item1 = page.locator('text=Selesaikan Cerita')
        item2 = page.locator('text=Cabar Minda')

        if item1.is_visible():
            print('OK: "Selesaikan Cerita" dropdown item is visible')
        else:
            print('FAIL: "Selesaikan Cerita" dropdown item is NOT visible')

        if item2.is_visible():
            print('OK: "Cabar Minda" dropdown item is visible')
        else:
            print('FAIL: "Cabar Minda" dropdown item is NOT visible')

        # Click the first dropdown item
        item1.click()
        page.wait_for_timeout(2000)
        page.screenshot(path='C:\\Users\\izwan\\Desktop\\math-adventure\\.claude\\skills\\run-math-adventure\\screenshot-wheel.png', full_page=True)
        print('OK: Clicked "Selesaikan Cerita" - wheel should be visible')
    else:
        print('FAIL: Dropdown button "Pilih Aktiviti" is NOT visible')

    browser.close()
