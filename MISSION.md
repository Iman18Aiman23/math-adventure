# Mission Plan

## Tasks
- [x] Investigate audio capture logic for iOS microphone silence.
  - [x] Ensure AudioContext is resumed inside a user interaction (click/touch) handler.
  - [x] Check for `webkitAudioContext` compatibility.
- [x] Fix premature cutoff in voice capture (Wait for Speech logic).
  - [x] Increase silence threshold.
  - [x] Add a minimum duration for recording.
  - [x] Implement trailing silence detection (1.5-2s continuous silence after speech detected).

- [x] Gamified RPG ("Duolingo-style") UI Redesign Checkpoint
  - [x] Update `index.html` viewport meta tag
  - [x] Refactor `index.css` (variables, typography, 3D buttons, safe-area, saga-map path)
  - [x] Create `SagaMap.jsx` with winding path
  - [x] Integrate `SagaMap.jsx` into the app's navigation
  - [x] Refactor `GameHeader.jsx` (Hearts, Streak, Progress Bar)
  - [x] Refactor `QuizArena.jsx` (Progress bar logic, Hearts reset, fixed bottom buttons, slide-up modals)

- [x] Phase 2: Full App Overhaul (Mobile-First Gamified RPG)
  - [x] Refactor `index.css` for 480px constrained layout & GPU swiping.
  - [x] Refactor `App.jsx` — View state, Quick Switch dropdown.
  - [x] Update `SagaMap.jsx` with dynamic map backgrounds.
  - [x] Refactor `QuizArena.jsx` 'Thumb Zone' layout and Overflow protection.

- [x] Phase 3: Complete Duolingo UI Overhaul
  - [x] Full `index.css` rewrite — Duolingo design tokens, white/flat cards, 3D squishy buttons, tab bar, unit banners, feedback drawers.
  - [x] `HomePage.jsx` — Greeting, streak card, course progress cards.
  - [x] `SagaMap.jsx` — Unit Section Banners, Z-path, star/lock/current nodes, START callout.
  - [x] `GameMenu.jsx` — Thin wrapper with SagaMap + sub-header.
  - [x] `MathHome.jsx` — Duolingo flat lesson-row list with icon bubbles.
  - [x] `QuizArena.jsx` — X-close header, progress bar, heart indicators, thumb-zone grid, feedback drawer (GPU slide-up), lesson-complete stats screen.
  - [x] `BMPage.jsx` — Flat category cards with coloured left stripe.
  - [x] `JawiPage.jsx` — Flat lesson-row activity list with coloured icons.
  - [x] `WelcomeModal.jsx` — Full-screen owl onboarding with progress dots.
  - [x] `TimeGameMenu.jsx` — Flat lesson-row list.
  - [x] `App.jsx` — Bottom tab bar (Learn / Ranking / Profile), Leaderboard & Profile placeholder tabs, GPU swipe keys.
  - [x] `GameHeader.jsx` — Cleaned up to match new design system.

- [x] Phase 4: Cross-Platform Web Speech API (React Migration)
  - [x] Fix `SpeechManager.js` — iOS synchronous `.start()` path, disable unsupported VAD flow for iOS Safari.
  - [x] Migrate `BMGameConfig.js` (Phaser Canvas) to pure React component (`BMSpeakGame.jsx`) for instant load time.
  - [x] Refactor `BMPage.jsx` — Remove Phaser references and mount React component directly.
  - [x] `JawiPage.jsx` — Confirmed already pure React (no Phaser/canvas). No migration needed.
  - [x] Verify production build passes (`vite build` — 9.69s, 0 errors).
  - NOTE: `src/game/` folder (BMGameConfig, GameScene, BootScene, MenuScene, MascotSprite) is now orphaned dead code. Safe to delete.

- [x] Phase 5: Global Scroll Fix
  - [x] Fix `.view-container` — changed `overflow: hidden` → `overflow-y: auto` with `-webkit-overflow-scrolling: touch`.
  - [x] Fix `.game-container` — changed `overflow: hidden` → `overflow-y: auto` with `-webkit-overflow-scrolling: touch`.
  - [x] Verified: 100 Perkataan Jawi (topic list + word list), Jawi Alphabet Grid, Match Game selection, Jawi Menu — all scrollable.
  - [x] Verified: QuizArena retains its own `overflow: hidden` (correct for fixed thumb-zone layout).
