from pathlib import Path
import os
import re
from urllib.parse import urlencode

from playwright.sync_api import sync_playwright


BASE_URL = "http://127.0.0.1:5173/math-adventure/codex-explore-harness.html"
SCREEN_DIR = Path(".codex-screens")

PRIMITIVES = [
    "compare",
    "kenali-nombor",
    "kombinasi",
    "kenali-21-100",
    "nilai-tempat",
    "susunan-nombor",
    "pola-nombor",
    "anggar-bundar",
    "selesaikan",
    "latih-diri",
    "cabar-minda",
    "selesaikan-cerita-m1",
    "cabar-minda-m1",
    "kenali-tambah",
    "latihan-tambah",
    "kenali-tolak",
    "latihan-tolak",
    "cerita-tambah-tolak",
    "tambah-berulang",
    "selesaikan-m2",
    "latih-diri-m2",
    "cabar-minda-m2",
    "kenali-pecahan",
    "selesaikan-pecahan",
    "latih-diri-pecahan",
    "cabar-minda-pecahan",
    "kenali-nilai-wang",
    "tukar-wang",
    "dapat-catat-wang",
    "selesaikan-wang",
    "latih-diri-wang",
    "cabar-minda-wang",
    "mengenali-bulan",
    "mengenali-hari",
    "mengenali-masa",
    "selesaikan-masa",
    "selesaikan-waktu",
    "selesaikan-bulan",
    "latih-diri-masa",
    "cabar-minda-masa",
    "kenali-ukur-objek",
    "ukur-banding-panjang",
    "kenali-jisim",
    "kenali-isi-padu",
    "selesaikan-ukuran",
    "latih-diri-ukuran",
    "cabar-minda-ukuran",
]

EXAMS = {
    "cabar-minda-m1",
    "cabar-minda-m2",
    "cabar-minda-pecahan",
    "cabar-minda-wang",
    "cabar-minda-masa",
}

def open_question(page, primitive):
    query = {"primitive": primitive, "scoreId": primitive}
    if primitive == "latih-diri-m2":
        query["initialType"] = "kt-gabung"
    page.goto(f"{BASE_URL}?{urlencode(query)}", wait_until="networkidle")
    page.locator(".mt-question-standard").first.wait_for()

    if primitive in EXAMS:
        page.get_by_role("button", name=re.compile(r"^Mula")).first.click()
    elif primitive == "selesaikan-m2":
        page.get_by_text("Tambah", exact=True).click()
    elif primitive in {"latihan-tambah", "latihan-tolak"}:
        page.locator(".lt-card").first.click()

    page.locator(".mtq-question-header").first.wait_for()


def assert_layout(page, primitive, viewport_name):
    headers = page.locator(".mtq-question-header").count()
    if headers < 1:
        raise AssertionError(f"{primitive}/{viewport_name}: missing Section 1 header")

    activity = page.locator(".mtq-activity-label").first.inner_text().strip()
    skill = page.locator(".mtq-skill-label").first.inner_text().strip()
    question = page.locator(".mtq-question-label").first.inner_text().strip()
    if not activity.startswith("Aktiviti ") or not skill or not question:
        raise AssertionError(f"{primitive}/{viewport_name}: incomplete Section 1 labels")

    activity_inset = page.locator(".mtq-question-header").first.evaluate(
        """header => {
          const badge = header.querySelector('.mtq-activity-label');
          const headerRect = header.getBoundingClientRect();
          const badgeRect = badge.getBoundingClientRect();
          const style = getComputedStyle(header);
          return {
            top: badgeRect.top - headerRect.top - parseFloat(style.borderTopWidth),
            left: badgeRect.left - headerRect.left - parseFloat(style.borderLeftWidth),
          };
        }"""
    )
    if activity_inset["top"] < 3.5 or activity_inset["left"] < 3.5:
        raise AssertionError(
            f"{primitive}/{viewport_name}: activity badge lacks header padding "
            f"{activity_inset}"
        )

    required_sections = {
        "Section 2 card": ".mtq-card-section",
        "Section 3 options": ".mtq-options-section",
        "Section 4 actions": ".mtq-actions-section",
    }
    missing = [
        name for name, selector in required_sections.items()
        if page.locator(selector).count() < 1
    ]
    if missing:
        raise AssertionError(f"{primitive}/{viewport_name}: missing {', '.join(missing)}")

    same_line_actions = page.locator(".mtq-actions-section").evaluate_all(
        """sections => sections.flatMap(section => {
          const report = section.querySelector('.qir-button');
          const action = [...section.querySelectorAll('button:not(.qir-button)')]
            .find(button => button.getBoundingClientRect().height > 0);
          if (!report || !action || report.getBoundingClientRect().height === 0) return [];
          const actionRect = action.getBoundingClientRect();
          const reportRect = report.getBoundingClientRect();
          return actionRect.bottom > reportRect.top + 1
            ? [`${action.className} + ${report.className}`]
            : [];
        })"""
    )
    if same_line_actions:
        raise AssertionError(
            f"{primitive}/{viewport_name}: Seterusnya and Report share a line "
            f"{same_line_actions}"
        )

    styled_card_containers = page.locator(".mtq-card-section").first.evaluate(
        """section => [...section.querySelectorAll(
          ':scope > .mtq-options-section > :not(style):not(button):not([role="button"])'
        )].filter(el => {
          const style = getComputedStyle(el);
          const hasBorder = ['Top', 'Right', 'Bottom', 'Left']
            .some(side => parseFloat(style[`border${side}Width`]) > 0);
          const background = style.backgroundColor.match(/[\\d.]+/g)?.map(Number) || [];
          const hasBackground = background.length === 3 || background[3] > 0;
          return hasBorder || hasBackground;
        }).map(el => `${el.tagName}.${el.className}`)"""
    )
    if styled_card_containers:
        raise AssertionError(
            f"{primitive}/{viewport_name}: Section 2 main container is styled "
            f"{styled_card_containers}"
        )

    overflowing_card_content = page.locator(".mtq-card-section").first.evaluate(
        """section => [...section.querySelectorAll('button, [role="button"]')]
          .flatMap(card => {
            const cardRect = card.getBoundingClientRect();
            return [...card.querySelectorAll('*')]
              .filter(el => !['STYLE', 'SCRIPT'].includes(el.tagName))
              .filter(el => {
                const rect = el.getBoundingClientRect();
                return rect.width > 0 && rect.height > 0
                  && (rect.left < cardRect.left - 1
                    || rect.right > cardRect.right + 1
                    || rect.top < cardRect.top - 1
                    || rect.bottom > cardRect.bottom + 1);
              })
              .map(el => `${card.className} > ${el.tagName}.${el.className}`);
          }).slice(0, 8)"""
    )
    if overflowing_card_content:
        raise AssertionError(
            f"{primitive}/{viewport_name}: icon or content escapes answer card "
            f"{overflowing_card_content}"
        )

    hover_target = page.locator(".mt-question-standard button:enabled").first
    if hover_target.count():
        hover_target.hover(force=True)

    shadows = page.locator(".mt-question-standard").first.evaluate(
        """root => [...root.querySelectorAll('*')].filter(el => {
          const style = getComputedStyle(el);
          return style.boxShadow !== 'none'
            || style.textShadow !== 'none'
            || style.filter !== 'none';
        }).slice(0, 8).map(el => `${el.tagName}.${el.className}`)"""
    )
    if shadows:
        raise AssertionError(f"{primitive}/{viewport_name}: shadow effects remain: {shadows}")

    overflow = page.evaluate(
        """() => ({
          body: document.body.scrollWidth - document.body.clientWidth,
          root: Math.max(...[...document.querySelectorAll('.mt-question-standard')]
            .map(el => el.scrollWidth - el.clientWidth))
        })"""
    )
    if overflow["body"] > 2 or overflow["root"] > 2:
        raise AssertionError(f"{primitive}/{viewport_name}: horizontal overflow {overflow}")

    fit = page.locator(".mt-question-standard").first.evaluate(
        """root => {
          const rootRect = root.getBoundingClientRect();
          const selectors = [
            '.mtq-question-header', '.mtq-card-section', '.mtq-options-section',
            '.mtq-actions-section', '.mtq-actions-section button',
            '.mtq-actions-section .qir-button', '.maf-footer'
          ];
          const outside = [...root.querySelectorAll(selectors.join(','))]
            .filter(el => {
              const rect = el.getBoundingClientRect();
              return rect.width > 0 && rect.height > 0
                && (rect.top < rootRect.top - 2 || rect.bottom > rootRect.bottom + 2);
            })
            .slice(0, 8)
            .map(el => `${el.tagName}.${el.className}`);
          const scrollContainers = [...root.querySelectorAll(
            '.maf-scroll,.maf-scroll-q,.cm1-scroll,.cm2-scroll,.ujian-scroll,.ujian-masa-main,.ld-drill-scroll'
          )]
            .filter(el => el.clientHeight > 0 && el.scrollHeight - el.clientHeight > 3)
            .slice(0, 8)
            .map(el => `${el.className}:${el.scrollHeight - el.clientHeight}px`);
          return {
            rootOverflow: root.scrollHeight - root.clientHeight,
            outside,
            scrollContainers,
            background: getComputedStyle(root).backgroundColor,
          };
        }"""
    )
    if fit["rootOverflow"] > 3 or fit["outside"] or fit["scrollContainers"]:
        raise AssertionError(f"{primitive}/{viewport_name}: page does not fit {fit}")
    if fit["background"] != "rgb(255, 255, 255)":
        raise AssertionError(f"{primitive}/{viewport_name}: background is not white {fit['background']}")


def assert_actions_after_answer(page):
    page.locator(".cmp-standard-option").first.click()
    actions = page.locator(".mtq-actions-section").first
    next_button = actions.locator(".maf-next")
    report_button = actions.locator(".qir-button")
    next_button.wait_for()
    report_button.wait_for()
    next_box = next_button.bounding_box()
    report_box = report_button.bounding_box()
    if next_box["y"] + next_box["height"] > report_box["y"]:
        raise AssertionError("Seterusnya and Report must be on separate lines")


def run():
    SCREEN_DIR.mkdir(exist_ok=True)
    viewports = {
        "small-phone": {"width": 280, "height": 640},
        "phone": {"width": 390, "height": 844},
        "tablet": {"width": 768, "height": 1024},
        "laptop": {"width": 1366, "height": 768},
        "landscape": {"width": 844, "height": 390},
    }
    only_primitive = os.getenv("QUESTION_PRIMITIVE")
    only_viewport = os.getenv("QUESTION_VIEWPORT")
    repeats = max(1, int(os.getenv("QUESTION_REPEATS", "1")))
    selected_viewports = (
        {only_viewport: viewports[only_viewport]} if only_viewport else viewports
    )
    primitives = [only_primitive] * repeats if only_primitive else PRIMITIVES

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        context = browser.new_context(viewport=viewports["phone"])
        page = context.new_page()
        page.on("pageerror", lambda error: (_ for _ in ()).throw(error))
        for viewport_name, viewport in selected_viewports.items():
            page.set_viewport_size(viewport)
            for primitive in primitives:
                open_question(page, primitive)
                if only_primitive:
                    page.screenshot(
                        path=str(SCREEN_DIR / f"inspect-{primitive}-{viewport_name}.png"),
                        full_page=True,
                    )
                assert_layout(page, primitive, viewport_name)
                if primitive == "compare" and viewport_name == "phone":
                    assert_actions_after_answer(page)
                if primitive in {"compare", "kenali-ukur-objek"}:
                    page.screenshot(
                        path=str(SCREEN_DIR / f"year1-{primitive}-{viewport_name}.png"),
                        full_page=True,
                    )
                print(f"PASS {viewport_name:9} {primitive}")
        context.close()
        browser.close()


if __name__ == "__main__":
    run()
