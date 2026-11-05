# Home page and desktop sidebar UX audit

**Reviewed:** 5 November 2026  
**Scope:** `HomePage.jsx`, `HomePage.css`, `DesktopSidebar.jsx`, and `DesktopSidebar.css`, with shared header/card components and app integration checked where needed.  
**Method:** Source and responsive CSS review; live browser review at 1366 × 768 and 390 × 844; account-popover and guest/locked states checked. No automated accessibility scanner or contrast checker was run; color ratios below are calculated from the source color values.

## Executive summary

The page has a clear learning-first concept, a friendly personalized hero, and a distinct subject choice area. Its strongest interaction is the direct subject-card navigation, supported by a persistent desktop sidebar and mobile bottom navigation.

The main opportunities are:

1. The desktop page is substantially taller than the viewport: at 1366 × 768 the home root measured about 1000 px high, placing all age-group choices below the fold.
2. The account/avatar control has no accessible name, despite opening the account and settings menu.
3. Small white text on the sidebar subscription gradient and the pink brand tagline do not meet WCAG AA contrast for normal-size text.
4. Locked subjects and age choices do not explain the access requirement; the visible subject badge is English-only.
5. The hero’s prominent “Explore Subjects” action only scrolls to the subject list, while the actual learning actions are the subject buttons.

The mobile layout is readable and scrollable, and its bottom navigation stays available. It is intentionally much longer than one screen.

## 1. Screenshot and state review

Screenshots were reviewed at **1366 × 768** (desktop) and **390 × 844** (mobile), plus the account popover. The browser was continued as a guest with the display name “Iman”; this exposed the access-limited state.

### Desktop, 1366 × 768

- The sidebar and dashboard form a coherent two-column layout. The sidebar is about 320 px wide; its blue “Continue Learning” action is visually prominent.
- The hero occupies about 330 px in height. The subject section starts around y=427 and the age section around y=869.
- The home root measured about **1000 px** high against a **768 px** viewport. The age-group section is entirely below the initial viewport, and the final subject card is also below the fold.
- This is not a dead end: the content remains scrollable. It does mean that the first-screen view is mostly hero plus subject selection, not the complete dashboard.

### Mobile, 390 × 844

- The desktop sidebar is replaced by a fixed bottom navigation with Course, Ranking, Profile, Achievement, and Settings.
- The header keeps the logo, XP, and account control. The hero stacks its mascot, greeting, streak, and action; subject cards become single-column rows.
- The main page is vertically scrollable. At the captured scroll position, only the first few subjects are visible; age choices require scrolling.
- The page reserves bottom padding for the fixed navigation, but the last-card position should still be regression-tested on small devices and touch landscape.

### Account popover and access-limited state

- The account popover contains profile, reports, settings, and logout actions. It opens as a popover, not a blocking modal; Escape and outside-click dismissal are implemented.
- The progress popover includes a “No recent activity” message, which covers the basic empty state.
- In the guest state, Math KSSR, Malay KSSR, and Robot & Code are disabled and marked locked. All four age-group buttons are disabled, but their labels do not say why.
- No error state was visible or defined for the home dashboard. The robot interface has a loading status, but the reviewed page does not provide an error/retry treatment for a failed lazy load.

## 2. Markup, semantics, and responsive CSS

### Structure and hierarchy

- The home page is a `<main>` with a clear `<h1>` greeting, followed by separate subject and age-group sections with `<h2>` headings.
- Subject and age choices are native buttons. Subject-card accessible names include the subject and locked status; decorative imagery is hidden from assistive technology.
- The desktop sidebar uses an `<aside>` and a navigation landmark for Home. Subjects and Rewards are outside that inner `<nav>` and are grouped as sections; moving the interactive navigation groups into a single, clearly named landmark would make the structure more consistent.
- Sidebar current-page items expose `aria-current="page"`. Expand/collapse controls expose `aria-expanded` and `aria-controls`.

### Responsive behavior

- The sidebar appears from 768 px upward and changes from 320 px to 284 px through tablet widths; below 768 px it is hidden and mobile navigation takes over.
- Home subject cards use three columns on desktop, two at up to 767 px, and one at up to 600 px. Age groups change from four columns to two on tablet and one on mobile.
- Short-height desktop media rules adjust some spacing and row sizes, but the live 1366 × 768 result still exceeds the viewport. The actual rendered geometry is more useful than the CSS intent here.
- Focus-visible outlines, hover/pressed feedback, and reduced-motion overrides are present. Scrollbars in the sidebar are hidden while scrolling remains available.

## 3. Page walkthrough, top to bottom

### Home header

The mobile header shows the ImanAI logo, XP total, and avatar/chevron. The desktop dashboard header presents XP and the account control, while the sidebar carries the brand. The visual treatment is compact and leaves the hero as the main content focus.

**Issue:** The account button contains only an avatar and chevron and has no `aria-label` or text. The live accessibility snapshot reports it as an unnamed button. See [HomeHeaderActions.jsx](../src/components/_shared/HomeHeaderActions.jsx#L61).

### Personalized hero and streak

The greeting and robot establish a friendly identity; the streak widget adds progress context, and the blue action is the strongest color accent on the page. On mobile, the hero expands into a tall stacked panel.

**Friction:** “Explore Subjects” is visually a primary CTA but only scrolls to the subject section. The user must then choose a card. Consider “Choose a subject” for a more literal label or reduce the button’s visual weight if the subject list is already nearby. The action is defined in [HomePage.jsx](../src/components/HomePage.jsx#L207).

### Subject selection

Seven choices are displayed, with image-led cards, short descriptions, and consistent card affordances. On desktop they occupy three columns; on mobile they are easy to scan as full-width rows. Access-limited items are visibly muted and disabled.

**Friction:** The visible `LOCKED` badge is hard-coded in English, while the accessible name is localized. Also, disabled subjects do not say what unlocks them or provide an adjacent path to the upgrade action. See [HomePage.jsx](../src/components/HomePage.jsx#L226).

### Age-group selection

Age choices are distinct, include grade/age labels, and use large native-button targets. The desktop version has four columns; mobile uses one column.

**Friction:** All four choices are disabled for the reviewed guest, with no visible explanation or action next to them. The subscription panel is in the desktop sidebar and is not visible on mobile, so the relationship between access and upgrade is especially unclear on mobile. See [HomePage.jsx](../src/components/HomePage.jsx#L243).

### Desktop sidebar

The sidebar’s order is sensible: Continue Learning, Home, Subjects, Rewards, then subscription. Active items receive visual treatment and `aria-current`; Subjects are expanded by default and Rewards start collapsed. The collapse control preserves icon navigation and tooltips.

**Friction:** The subscription card is a strong, colorful promotion, but its “500+” access claim has no price, trial, or plan-detail context in this component. If those details are supplied in the upgrade flow, ensure the button leads directly to them.

## 4. Assessment

### Visual hierarchy

The eye lands on the greeting/robot hero, then the blue hero action, then the subject cards. The hierarchy is child-friendly and supports the likely primary task—choosing what to learn. XP and streak provide useful progress signals without overpowering the greeting.

The hero is large relative to the choices: on desktop it uses about 330 px before the subject list begins. At 1366 × 768, the age selector is not visible at all. If age-group selection is a first-class route, give it more first-screen space; otherwise the current prioritization is defensible.

### Layout structure

The two-column desktop shell is clear and the content width is constrained. Mobile conversion to a single card column is predictable. The main measurable issue is desktop vertical density: the page root is about 1000 px tall at a 768 px viewport, with the age section starting around y=869. Scrolling makes it usable, but the initial screen does not show the full dashboard.

The sidebar consumes a fixed 320 px at desktop, which is proportionally heavy at narrower desktop/tablet widths. Confirm the 768–1099 px range visually because the home grid remains three columns while the main pane is narrower.

### Typography

Outfit/Baloo 2/Fredoka give the interface a playful identity; Inter supports body text. The heading hierarchy is clear, and text on subject cards is short.

The narrowest breakpoint reduces section helper copy to **9 px** ([HomePage.css](../src/components/HomePage.css#L372)), which is difficult to read. Keep supporting text at a more comfortable size or hide it before reducing it that far. The English title-casing conversion also turns “Math KSSR” into “Math Kssr”; preserve acronyms explicitly.

### Primary and secondary actions

- The subject cards are the clearest actionable items.
- “Continue Learning” is the sidebar’s prominent return action.
- “Explore Subjects” scrolls rather than starting an activity; make its label and visual weight match that behavior.
- “Upgrade Now” is clearly identifiable, but locked items do not connect users to the upgrade action or explain eligibility.
- Home, subject, and reward navigation expose active states; this is a strong orientation cue.

### Friction and states

- **Access clarity:** Disabled age buttons and locked subject cards need a short localized reason and a clear next step.
- **Empty state:** “No recent activity” is explicit, but it is plain text without a suggested first activity. Consider a small “Choose a subject” action.
- **Error state:** No home-level error or retry state was found. If these panels depend on local data only, this may be low risk; if data can fail to load, define a visible recovery path.
- **Account accessibility:** Give the avatar control an explicit localized name such as “Account and settings.”
- **Navigation semantics:** Consider including Subject and Rewards groups within the sidebar’s named navigation landmark.
- **Color contrast:** The pink tagline (`#ec4899` on white) is about **3.53:1**. White text over the subscription gradient ranges from about **2.15:1 to 3.53:1** across its declared stops. Both fail the 4.5:1 WCAG AA target for normal-size text; the subscription paragraph is only 12 px. Darken the gradient or use darker text and verify the actual rendered gradient.

## 5. Prioritized recommendations

| Priority | Finding | Recommended follow-up |
|---|---|---|
| High | Account/avatar button is unnamed to assistive technology. | Add a localized accessible name and verify the account/settings trigger with a screen reader. |
| High | Subscription text and brand tagline have insufficient normal-text contrast. | Adjust foreground/background colors and recheck all gradient stops against WCAG AA. |
| Medium | Desktop content exceeds the viewport; age choices begin below the fold. | Decide whether scrolling is intentional. If not, shorten the hero and/or compact the subject block at laptop heights. |
| Medium | Locked subject and age states provide little eligibility guidance; `LOCKED` is not localized. | Localize the badge and explain the access requirement with a nearby upgrade path. |
| Medium | Hero CTA scrolls to the subject list rather than selecting a learning action. | Clarify the label and keep its visual prominence proportional to its scroll-only behavior. |
| Low | Helper copy shrinks to 9 px at the narrowest breakpoint; empty-state copy is inert. | Preserve readable helper text and provide a first-activity suggestion for empty progress. |

## Files reviewed

- [HomePage.jsx](../src/components/HomePage.jsx)
- [HomePage.css](../src/components/HomePage.css)
- [DesktopSidebar.jsx](../src/components/DesktopSidebar.jsx)
- [DesktopSidebar.css](../src/components/DesktopSidebar.css)
- Supporting behavior: [HomeHeaderActions.jsx](../src/components/_shared/HomeHeaderActions.jsx), [StandardHeroBanner.jsx](../src/components/_shared/StandardHeroBanner.jsx), [SubjectMenuLayout.jsx](../src/components/_shared/SubjectMenuLayout.jsx), and the home/sidebar integration in [App.jsx](../src/App.jsx#L1748).
