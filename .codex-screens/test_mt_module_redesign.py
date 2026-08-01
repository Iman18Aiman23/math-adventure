from pathlib import Path
from playwright.sync_api import sync_playwright


BASE_URL = "http://127.0.0.1:5173"
OUT = Path(__file__).parent


def open_module(page, module_name="Nombor Hingga 100"):
    page.route("https://**", lambda route: route.abort())
    page.goto(BASE_URL, wait_until="networkidle")
    page.evaluate("localStorage.setItem('mathAdventurePlayer', 'Iman')")
    page.reload(wait_until="networkidle")
    page.locator(".card-matematik-kssr").click()
    page.locator(".mt-year.t1").wait_for(state="visible")
    page.locator(".mt-year.t1").click()
    page.locator(".mt-module-page").wait_for(state="visible")
    page.locator("#mt-module-select").click()
    page.get_by_role("option", name=module_name).click()
    page.get_by_text(module_name, exact=True).first.wait_for(state="visible")


def check_layout(page, name, size, module_name="Nombor Hingga 100"):
    page.set_viewport_size(size)
    open_module(page, module_name)
    page.wait_for_timeout(700)

    coach = page.locator(".pi-mhub-coach")
    center = page.locator(".pi-mhub-center")
    insights = page.locator(".pi-mhub-insights")
    assert coach.is_visible()
    assert center.is_visible()
    assert page.locator(".pi-mhub-lesson-button").count() >= 4
    assert page.get_by_text("Statistik kamu", exact=True).count() == 0

    if size["width"] >= 769:
        assert page.locator(".desktop-sidebar").count() == 0
        assert page.locator(".mt-top-stats").is_visible()
        first_button = page.locator(".pi-mhub-lesson-button").first
        first_name = first_button.locator(".pi-mhub-lesson-name")
        first_status = first_button.locator(".pi-mhub-status")
        first_completion = first_button.locator(".pi-mhub-completion")
        button_box = first_button.bounding_box()
        assert first_name.bounding_box()["width"] >= 120
        assert first_status.is_visible()
        for item in (first_status, first_completion, first_button.locator(".pi-mhub-row-chevron")):
            item_box = item.bounding_box()
            assert item_box["x"] >= button_box["x"]
            assert item_box["x"] + item_box["width"] <= button_box["x"] + button_box["width"]
            assert item_box["y"] >= button_box["y"]
            assert item_box["y"] + item_box["height"] <= button_box["y"] + button_box["height"]
        status_box = first_status.bounding_box()
        completion_box = first_completion.bounding_box()
        if status_box["y"] < completion_box["y"] + completion_box["height"] and completion_box["y"] < status_box["y"] + status_box["height"]:
            assert status_box["x"] + status_box["width"] <= completion_box["x"]

    if size["width"] >= 1366:
        assert insights.is_visible()
        boxes = [item.bounding_box() for item in (coach, center, insights)]
        assert boxes[0]["x"] < boxes[1]["x"] < boxes[2]["x"], boxes
    elif size["width"] <= 768:
        assert page.locator(".pi-mhub-mobile-stats").count() == 0
        assert page.locator(".pi-mhub-bottom-nav").is_visible()
        assert not insights.is_visible()
        hero_box = coach.bounding_box()
        art_box = page.locator(".pi-mhub-coach-art").bounding_box()
        title_box = page.locator(".pi-mhub-coach h2").bounding_box()
        progress_box = page.locator(".pi-mhub-coach-progress").bounding_box()
        kicker_box = page.locator(".pi-mhub-coach-kicker").bounding_box()
        continue_box = page.locator(".pi-mhub-continue").bounding_box()
        ring_box = page.locator(".pi-mhub-progress-track").bounding_box()
        label_box = page.locator(".pi-mhub-progress-label span").bounding_box()
        percent = page.locator(".pi-mhub-ring-value")
        percent_box = percent.bounding_box()
        assert ring_box["x"] >= hero_box["x"]
        assert ring_box["x"] + ring_box["width"] <= hero_box["x"] + hero_box["width"]
        assert ring_box["x"] + ring_box["width"] <= art_box["x"]
        assert 0 <= ring_box["x"] - (label_box["x"] + label_box["width"]) <= 12
        left_center = (kicker_box["y"] + progress_box["y"] + progress_box["height"]) / 2
        alignment_delta = abs((art_box["y"] + art_box["height"] / 2) - left_center)
        assert alignment_delta <= 8, {"art": art_box, "left_center": left_center, "delta": alignment_delta}
        assert art_box["x"] >= progress_box["x"] + progress_box["width"]
        assert ring_box["y"] >= title_box["y"] + title_box["height"]
        assert progress_box["y"] - (title_box["y"] + title_box["height"]) <= 12
        content_bottom = max(progress_box["y"] + progress_box["height"], art_box["y"] + art_box["height"])
        cta_gap = continue_box["y"] - content_bottom
        assert cta_gap >= 14, {"content_bottom": content_bottom, "continue": continue_box, "gap": cta_gap}
        assert percent.is_visible()
        assert percent_box["x"] >= ring_box["x"]
        assert percent_box["x"] + percent_box["width"] <= ring_box["x"] + ring_box["width"]

    page.screenshot(path=str(OUT / f"mt-redesign-{name}.png"), full_page=False)

    first_group = page.locator(".pi-mhub-lesson-card").first
    first_head = first_group.locator(".pi-mhub-lesson-head")
    assert "is-open" in (first_group.get_attribute("class") or "")
    first_head.click()
    assert "is-open" not in (first_group.get_attribute("class") or "")
    first_head.click()
    assert "is-open" in (first_group.get_attribute("class") or "")

    page.locator(".pi-mhub-continue").click()
    page.locator(".mt-module-page").wait_for(state="detached")


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    errors = []
    for name, size in (
        ("desktop", {"width": 1536, "height": 864}),
        ("laptop", {"width": 1366, "height": 768}),
        ("tablet", {"width": 1024, "height": 768}),
        ("mobile", {"width": 390, "height": 844}),
        ("small-mobile", {"width": 320, "height": 720}),
        ("landscape", {"width": 844, "height": 390}),
    ):
        page = browser.new_page(viewport=size)
        page.on("console", lambda message: errors.append(f"console:{message.type}:{message.text}") if message.type == "error" and "ERR_NETWORK_ACCESS_DENIED" not in message.text and "AudioContext encountered an error from the audio device" not in message.text else None)
        page.on("pageerror", lambda error: errors.append(f"page:{error}"))
        check_layout(page, name, size)
        page.close()
    page = browser.new_page(viewport={"width": 504, "height": 640})
    page.on("console", lambda message: errors.append(f"console:{message.type}:{message.text}") if message.type == "error" and "ERR_NETWORK_ACCESS_DENIED" not in message.text and "AudioContext encountered an error from the audio device" not in message.text else None)
    page.on("pageerror", lambda error: errors.append(f"page:{error}"))
    check_layout(page, "module-one", {"width": 504, "height": 640}, "Nombor Hingga 100")
    page.close()
    browser.close()
    assert not errors, "\n".join(errors)
    print("PASS: responsive layout, dropdown, accordion, and continue navigation")
