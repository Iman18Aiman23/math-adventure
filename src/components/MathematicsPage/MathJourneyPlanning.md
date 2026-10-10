# Math Journey Redesign Plan

## Goal

Bring `MathJourney.jsx` into visual and interaction alignment with **Cabaran Membaca** in `ReadingPage.jsx` and `ReadingJourney.jsx`. The math journey should feel like part of the same learning product while retaining its math-specific levels, question visuals, progression, rewards and gameplay.

## Reference patterns

- `ReadingPage.jsx` presents its challenge as a level in `SubjectMenuLayout` and lazy-loads `ReadingJourney` after selection. Math already follows the same high-level pattern: `MathHome.jsx` exposes Math Journey and `App.jsx` lazy-loads it.
- `ReadingJourney.jsx` uses `BMHeader`, a wide illustrated title hero, grouped worlds, and clear level cards with artwork, descriptions and a visible status/action.
- `ReadingJourney.css` supplies the visual language to adapt: bright paper-like background, large outlined display title, restrained world surfaces, responsive card grid, clear progress states and hover/focus feedback.
- Shared subject page chrome is owned by the app shell. Keep journey-specific header and content styling scoped to the `mj-` namespace.

## Current Math Journey

`MathJourney.jsx` currently combines the full progression model and quiz gameplay in one component. It contains five units with five levels each, challenge setup and feedback, rewards and persistence. Its overview uses a compact landscape hero and a five-row unit list; unit and level selection, info, challenge, result and completion states use a tightly constrained full-height panel layout. The UI is currently Malay-only despite the app passing a `language` prop.

## Proposed experience

### Journey overview

- Replace the cramped full-height overview treatment with the Reading Journey's page-flow structure: shared `BMHeader`, spacious hero, then five clearly separated unit/world sections.
- Use an adapted math illustration/mascot in the hero. Retain Math Journey's existing art unless a suitable project asset already exists; do not make new artwork a prerequisite.
- Give each unit a short description, completion count/progress and a responsive set of five level cards.
- Cards should communicate unit/level number, title, a concise math-specific description or operation icon, completion stars, and an explicit `Mula`/`Main lagi`/locked status.
- Maintain the current order and unlock rules: only the first unfinished level in an unlocked unit is current; locked units/levels remain visible.
- Show overall progress in a compact, accessible summary after or alongside the unit groups.

### Unit and level flow

- Decide whether the unit overview is a distinct screen or an anchor/expanded section in the page flow. Preferred: make each unit section directly scannable and selectable, avoiding a second navigation layer where practical.
- Preserve an information/ready state before starting a level, but restyle it as an inline or focused start panel consistent with the reading flow. Keep the confirmation dialog when leaving an active attempt.
- Browser back should move from an active game to its level/journey context, and from the journey to Math Home, without discarding saved completion or rewards.

### Challenge/game screens

- Keep challenge gameplay focused and full-screen where useful; the reading reference does not require quiz controls to adopt the overview's card layout.
- Retain expression, analog-clock and long-method question visuals, three-life model, immediate feedback, answer reveal, retry/results, confetti and sound.
- Apply the shared product typography, color hierarchy, visible focus rings, hover/pressed feedback and reduced-motion behavior to controls.

## Visual direction

- Align with the reading journey's bright, friendly editorial hierarchy: large display heading, pale tinted canvas, clear color-coded unit sections, and generous spacing.
- Keep math's identity with a focused green/gold accent and its operation/clock/trophy iconography; avoid copying reading's blue accent and reading-specific artwork verbatim.
- Use `Baloo 2` for display headings and level numerals, `Fredoka` for learner-facing copy and existing global body styles where appropriate.
- Use a responsive desktop grid for levels and a single-column mobile layout. Avoid fixed viewport-height clipping so all five units are reachable by scrolling.
- Scope all styles under `.mj-journey`/`.mj-*`; do not change Reading Journey styles.

## Functional requirements to preserve

- Existing unit/level definitions, generated question types and ten-question attempts.
- Existing pass threshold, lives, reward tiers, best score and no-duplicate-reward behavior.
- Existing `mathJourneyProgress` localStorage shape/version and integration with `getGameData`/`saveGameData`.
- Existing unlock sequence, completion/replay behavior, global storage event, sounds, confetti and browser-back exit protection.
- App-level lazy loading and state-driven Math Home navigation.

## Implementation outline

1. Refactor the overview/unit/level presentation from the gameplay and progression logic so UI changes do not rewrite scoring or persistence.
2. Add `language = 'bm'` support and translate navigation labels, unit/level descriptions, challenge prompts, feedback, rules and result copy to English while keeping generated curriculum content in Malay if that matches the reading journey's content policy.
3. Build the journey hero and grouped unit/level presentation using the Reading Journey information hierarchy and `BMHeader` behavior.
4. Update `MathJourney.css` for natural page scrolling on overview, responsive grouped cards, focus/hover/pressed states, reduced motion and the existing focused challenge layout.
5. Check `App.jsx` integration and browser-back behavior; verify progress/reward compatibility against existing stored data.

## Acceptance criteria

- The Math Journey overview is visibly consistent with Cabaran Membaca's shared header, hero, section hierarchy and level-card status language.
- All five units and all 25 levels remain discoverable, including locked content; mobile users can scroll through the complete journey.
- Completing, failing, replaying and leaving an attempt preserve the current gameplay and reward rules.
- Existing progress stored under `mathJourneyProgress` continues to load without reset or migration.
- The `language` prop is honored by the journey UI, and back navigation returns to the correct parent state.
- Keyboard focus, disabled/locked status and reduced-motion preferences are handled clearly.

## Risks / decisions for implementation

- The existing component has a single unit selection screen and an info screen. Flattening these into a long overview can improve consistency but may make the journey page very long; retain a unit detail transition if usability suffers.
- Math's existing overview intentionally fits a constrained screen, while the reading journey scrolls naturally. Confirm the shared app shell scroll behavior remains correct once `MathJourney.css` no longer clips the overview.
- Validate whether `getGameData().stars` should continue to represent cumulative math stars and `journey.totalDiamonds` the math journey diamonds; do not silently alter this established accounting.
- `MathJourney` is imported by `App.jsx` as a lazy component and receives `language`; implementation should not introduce a new route or change app-level navigation state.
