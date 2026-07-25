from pathlib import Path
from playwright.sync_api import sync_playwright


BASE = "http://127.0.0.1:5173/math-adventure/codex-explore-harness.html"
PRIMITIVES = [
    "kenali-ukur-objek",
    "ukur-banding-panjang",
    "kenali-jisim",
    "timbang-banding-jisim",
    "kenali-isi-padu",
    "sukat-banding-cecair",
    "selesaikan-ukuran",
    "latih-diri-ukuran",
    "cabar-minda-ukuran",
]
VIEWPORTS = [(390, 844), (768, 600), (1366, 768)]


def assert_fits(page, label):
    result = page.evaluate("""
      () => {
        const nodes = [document.documentElement, document.body,
          document.querySelector('.maf-scroll-q'), document.querySelector('.m6-question-card')].filter(Boolean);
        return {
          overflow: nodes.map(node => ({
            name: node.className || node.tagName,
            vertical: node.scrollHeight - node.clientHeight,
            horizontal: node.scrollWidth - node.clientWidth,
          })),
          badUnicode: document.body.innerText.includes('\\\\u{') || document.body.innerText.includes('\\\\u2'),
          wide: [...document.querySelectorAll('body *')].filter(node => {
            const rect = node.getBoundingClientRect();
            return rect.right > innerWidth + 2 || rect.left < -2;
          }).map(node => ({name: node.className || node.tagName, left: node.getBoundingClientRect().left, right: node.getBoundingClientRect().right})).slice(0, 12),
          cardWide: (() => {
            const card = document.querySelector('.m6-question-card');
            if (!card) return [];
            const bounds = card.getBoundingClientRect();
            return [...card.querySelectorAll('*')].filter(node => {
              const rect = node.getBoundingClientRect();
              return rect.right > bounds.right + 2 || rect.left < bounds.left - 2;
            }).map(node => ({name: node.className || node.tagName, left: node.getBoundingClientRect().left, right: node.getBoundingClientRect().right, cardLeft: bounds.left, cardRight: bounds.right})).slice(0, 12);
          })(),
        };
      }
    """)
    assert not result["badUnicode"], f"{label}: escaped Unicode is visible"
    for item in result["overflow"]:
        assert item["vertical"] <= 2, f"{label}: vertical overflow in {item['name']}: {item['vertical']}px"
        assert item["horizontal"] <= 2, f"{label}: horizontal overflow in {item['name']}: {item['horizontal']}px; wide={result['wide']}; cardWide={result['cardWide']}"


def main():
    screenshots = Path(".codex-screens")
    screenshots.mkdir(exist_ok=True)
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        page = browser.new_page()
        errors = []
        page.on("console", lambda message: errors.append(message.text) if message.type == "error" else None)
        page.on("pageerror", lambda error: errors.append(str(error)))

        for width, height in VIEWPORTS:
            page.set_viewport_size({"width": width, "height": height})
            for primitive in PRIMITIVES:
                page.goto(f"{BASE}?primitive={primitive}", wait_until="networkidle")
                page.add_style_tag(content="""
                  html, body, #root { width:100%; height:100%; min-height:0 !important; overflow:hidden !important; }
                  .shell { width:100%; height:calc(100% - 84px); min-height:0 !important; margin-top:84px; padding:0 !important; overflow:hidden !important; }
                  .ok { display:none !important; }
                """)
                page.locator(".m6-question-card").wait_for()
                label = f"{primitive} {width}x{height} unanswered"
                assert_fits(page, label)
                page.locator(".m6-options button").first.click()
                page.locator(".maf-next").wait_for()
                page.wait_for_timeout(650)
                assert_fits(page, f"{primitive} {width}x{height} answered")

                if primitive in {"ukur-banding-panjang", "kenali-jisim", "sukat-banding-cecair", "selesaikan-ukuran"} and width in {390, 1366}:
                    page.screenshot(path=screenshots / f"m6-{primitive}-{width}x{height}.png")

        browser.close()
        assert not errors, "Browser errors:\n" + "\n".join(errors)
    print(f"PASS: {len(PRIMITIVES)} activities x {len(VIEWPORTS)} viewports, unanswered and answered")


if __name__ == "__main__":
    main()
