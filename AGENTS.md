# Math Adventure — Project Conventions

## Architecture

- **No React Router** — all navigation is state-driven via `useState` in `App.jsx`
- State vars: `currentSubject`, `matematikModule`, `matematikTopic`, `matematikYear` (and corresponding `islam*` for PI)
- Navigation wrapped in `startTransition` via `navigate(fn)` so UI stays responsive while lazy chunks load
- All feature components loaded via `React.lazy()` + `<Suspense>`
- **Key App.jsx patterns:**
  ```
  case 'matematik-kssr':
    if (matematikTopic) return <TopicPage ... />;
    if (matematikModule) return <ModulePage ... />;
    return <MatematikHomePage ... />;
  ```

## Layout System (shared across subjects)

### `Tahun1ModuleHubLayout` — Module hub grid
- Props: `moduleNum`, `moduleName`, `moduleNameEn`, `theme`, `topics[]`, `onBack`, `onSelectTopic`, `language`
- Topics: `{ id, pill, title, desc, visual: <svg> }`

### `Tahun1LessonScrollLayout` — Lesson + quiz page
- Props: `onBack`, `language`, `breadcrumb`, `breadcrumbActive`, `title`, `lead`, `icon`, `theme`, `topics[]`, `questions[]`, `totalRounds`, `accentColor`
- Contains: hero section, topic cards (Belajar), built-in MCQ quiz (Kuiz)
- Quiz uses answer security pattern (see below)
- Topics: `{ visual, title, sublabel, desc }`

## Scroll Reset on Navigation

The shared `.view-container` div is the page scroll container (`overflow-y: auto`). Top-level navigation changes (`currentSubject`, `activeTab`, etc.) are baked into `viewKey`, which remounts the div and auto-resets scroll. Sub-navigation within a subject (`islamModule`, `islamTopic`, `matematikModule`, `matematikTopic`, etc.) does NOT change `viewKey`, so scroll must be reset manually.

**Pattern in App.jsx:**
```jsx
const viewContainerRef = useRef(null);
useEffect(() => {
  if (viewContainerRef.current) viewContainerRef.current.scrollTop = 0;
}, [islamModule, islamTopic, islamYear, matematikModule, matematikTopic, matematikYear]);
// ...
<div key={viewKey} ref={viewContainerRef} className="view-container">
```

**Rule:** Whenever you add a new subject with sub-navigation state variables, add those variables to the `useEffect` dependency array above. Failure to do this causes the new page to open mid-scroll at the previous page's position.

## Desktop Full-Bleed Exception Rule

At `min-width: 768px`, `index.css` applies `max-width: var(--content-max)` (700–800px) to every direct child of `.view-container`. Any page whose root **manages its own internal max-width** (e.g. a centred `.wrap` inside) must be added to the exceptions list or it will be squeezed to 700–800px on desktop.

**Location:** `src/index.css` line ~2031 — the `.view-container > *` full-bleed exceptions block:

```css
/* Full-bleed exceptions (saga map, game pages, PI, Matematik) */
.view-container > .game-container,
.view-container > .ops-game-shell,
.view-container > .pi-home-root,
.view-container > .pi-module-page,
.view-container > .mt-home-root,
.view-container > .mt-module-page,
.view-container > div[style] {
  max-width: 100%;
}
```

**Rule:** Whenever you create a new subject home page or module wrapper page, add its root CSS class to this list. Failure to do this causes the desktop layout to be narrow/clipped on the right. Signs of the bug: content visually stretched or clipped on the right side at desktop widths.

**Pattern for a full-bleed page:**
- Root element: `width: 100%; overflow: hidden;` — no max-width here
- Inner scroll/wrap element: `max-width: 1040px; margin: 0 auto; padding: 46px 24px;` — centring happens here
- Root class added to the exceptions list in `index.css`

## Subject HomePage Year Selector Layout Standard

Every subject homepage (e.g. `MatematikHomePage`, `PendidikanIslamHomePage`) must follow this shared layout for the "Pilih Tahun" year-selector screen.

### CSS Classes (subject-prefixed)

| Element | Maths prefix | PI prefix | Role |
|---------|-------------|-----------|------|
| Root | `.mt-home-root` | `.pi-home-root` | Full-bleed flex column, no max-width |
| Scroll wrapper | `.mt-home-scroll` | `.pi-home-scroll` | `flex:1; overflow-y:auto; overflow-x:hidden; display:flex; flex-direction:column` |
| Body | `.mt-body` | `.pi-body` | `flex:1; display:flex; flex-direction:column` |
| Wrap | `.mt-home-wrap` | `.pi-home-wrap` | `flex:1; max-width:1040px; margin:0 auto; padding:30px 24px;` |
| Grid | `.mt-years` | `.pi-years` | 3-column grid (see below) |
| Card | `.mt-year` | `.pi-year` | Single year-selector card |

### Grid Specification

```css
/* Desktop: 3 equal columns */
.{prefix}-years {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  width: 100%;
  flex: 1;
  align-content: center;
}

/* Mobile / tablet: single column */
@media (max-width: 840px) {
  .{prefix}-years { grid-template-columns: 1fr; max-width: 380px; }
}
```

### No Desktop Scroll Rule

On laptop/desktop (≥841px), the entire page must fit in one viewport — **no scrollbar**. Achieved via the flex chain:
```
.{prefix}-home-root (flex column, flex:1)
  → .{prefix}-home-scroll (flex column, flex:1, overflow-y:auto)
    → .{prefix}-body (flex column, flex:1)
      → .{prefix}-home-wrap (flex column, flex:1, padding:30px 24px)
        → brand, tagline, h1, hint (fixed height)
        → .{prefix}-years (flex:1, align-content:center)
```
The cards expand to fill remaining vertical space and center themselves. On mobile (≤840px, single column), `overflow-y: auto` allows scrolling since 3 stacked cards exceed the viewport.

### Year Card Sizing (Desktop)

| Property | Value |
|----------|-------|
| Card padding | `20px 18px 18px` |
| Card border-radius | `24px` |
| Disc diameter | `150px` |
| Robot SVG | `118px × 148px` |
| Ribbon margin-top / font / padding | `6px / 17px / 6px 22px` |
| Meta margin-top | `6px` |
| Go (Mula ▸) margin-top / padding | `6px / 5px 14px` |

### Mobile Overrides (≤560px)

| Property | Value |
|----------|-------|
| Wrap padding | `20px 14px 40px` |
| H1 font-size | `28px` |
| Card padding | `16px 14px 16px` |
| Card border-radius | `20px` |
| Disc diameter | `140px` |
| Robot SVG | `110px × 138px` |
| Ribbon font / padding | `16px / 5px 18px` |
| Grid gap | `16px` |

### Consistency Rules

1. **Always use `repeat(3, 1fr)`** for the year grid on desktop — never `auto-fit`/`auto-fill` with fixed min-widths, which can cause 2-column fallback.
2. **Always use `flex: 1; align-content: center`** on the grid to fill remaining viewport height and center cards vertically.
3. **Always add the root class** to the full-bleed exceptions list in `index.css` (see Desktop Full-Bleed Exception Rule above).
4. **Scroll container must use `overflow-y: auto`** (not `hidden`) — desktop content fits without scrollbar, mobile needs scroll.
5. **Keep compact sizing** — discs at 150px, ribbons at 17px font. The original 224px disc + 46px h1 caused content to overflow laptop screens (1366×768).

## Component Blueprint (subject lesson page)

```jsx
export default function TopicName({ onBack, language = 'bm' }) {
  const THEME = { pageGradient, dark, accent, stageGradient, pillGradient };
  const TOPICS = [{ visual, title, sublabel, desc }];
  const QUESTIONS = buildQuestions(); // [{ question, answer, options }]
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack} language={language}
      breadcrumb="Module › " breadcrumbActive="Topic"
      title="..." lead="..." icon="📖"
      theme={THEME} topics={TOPICS}
      questions={QUESTIONS} totalRounds={10}
      accentColor="#..."
    />
  );
}
```

## Quiz Answer Security

Answers stored in React `useState` are visible via React DevTools — anyone with F12 can cheat.

**Pattern: Ref-Hidden Answers** (in `Tahun1LessonScrollLayout.jsx`):
1. `pool` (state) → stores only `{ question, options }` — no answer data
2. `ansRef` (ref) → stores `{ [question]: { answer, correctIndex } }` — invisible to DevTools
3. `correctIdx` / `correctAnswer` derived from `ansRef.current[currentQ.question]` at render
4. Result screen receives `correctAnswer` as a direct prop
5. Restart re-calls `preparePool(allQuestions, totalRounds)` and updates `ansRef.current`

Key function:
```js
function preparePool(allQuestions, totalRounds) {
  const picked = shuffle(allQuestions).slice(0, totalRounds);
  const answers = {};
  const pool = picked.map(q => {
    const opts = shuffle(q.options);
    answers[q.question] = { answer: q.answer, correctIndex: opts.indexOf(q.answer) };
    return { question: q.question, options: opts };
  });
  return { pool, answers };
}
```

## Quiz Question Format

```js
{ question: '...', answer: '...', options: ['A', 'B', 'C'] }
```
- 4 options recommended
- Answer string must match one of the options exactly

## Font System

| Font | Usage | Weights |
|------|-------|---------|
| `'Baloo 2'` | Headings, titles, buttons, badges, score numbers | 700, 800 |
| `'Fredoka'` | Body text, descriptions, quiz options, subtitles | 500, 600, 700 |
| `'Outfit'` | Global heading font (duo-style app shell) | 800, 900 |
| `'Inter'` | Global body font (home, achievement, leaderboard) | 400–700 |
| `'Amiri'` / `ARABIC_FONT` | Arabic/Jawi text | 400, 700 |

## Styling Approach

- **No CSS-in-JS library, no Tailwind** — inline `style={}` objects + static CSS classes
- Dynamic colors injected via `<style>` tags inside components using template literals
- Class prefix conventions:
  - `scl-*` — scroll layout (Tahun1LessonScrollLayout)
  - `pi-*` — Pendidikan Islam pages
  - `mt-*` — Matematik KSSR pages (MatematikHomePage, MatematikModulePage, module hubs)
  - `ops-*` — math operations
  - `rp-*` — reading page
  - `bm-*` — BM speaking
  - `jw-*` — Jawi
- Design tokens in `index.css` `:root`: `--font-heading`, `--font-body`, `--primary`, `--secondary`, `--sp-1` to `--sp-8`, `--border-radius-sm|md|lg|pill`
- Subject-specific custom properties: `--pi-*`, `--rp-*`, `--bp-*`

## Theme System

Each subject module uses a `THEME` object:
```js
{
  pageGradient: 'linear-gradient(180deg,{LIGHT} 0%,{MID} 50%,{DARK} 100%)',
  dark: '#92400E',
  accent: '#F59E0B',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,{LIGHT} 0%,{MID} 55%,{DARK} 100%)',
  pillGradient: 'linear-gradient(180deg,{ACCENT},{DARK})',
}
```

## State Management

- **No Redux** — React Context for game state (`GameStateContext`), `useState` for component state
- `useGameState(gameId)` — central gamification hook (XP, coins, level, unlocks, localStorage)
- `storageService.js` — localStorage persistence for game data, player name, login dates
- `speechManager.js` — Singleton wrapping Web Speech API (TTS + STT)

## Navigation Flow (subject pattern)

```
HomePage → SubjectHomePage (year selector)
         → SubjectModulePage (module hub with nav tabs)   ← PI uses TahunModulePage; Matematik uses MatematikModulePage
         → ModuleHubLayout (topic card grid)
         → TopicPage — two patterns depending on subject:
              PI:        new component using Tahun1LessonScrollLayout (lesson cards + quiz)
              Matematik: existing standalone game from MatematikPage/ (own self-contained UI)
```

## Gap / Coming-Soon Card Pattern

Topics with no game yet (❌ Gap or ⚠️ Partial) must still appear in the module hub as **disabled cards** — never hidden. They show curriculum completeness and signal future content.

```jsx
// Inside a topic array for Tahun1ModuleHubLayout:
{
  id: 'pecahan-asas',
  pill: 'Segera Hadir',
  title: 'Pecahan Asas',
  desc: 'Kandungan akan ditambah tidak lama lagi.',
  visual: <ComingSoonSvg />,
  disabled: true,   // Tahun1ModuleHubLayout reads this to grey-out + block onClick
}
```

## Matematik KSSR Reference

Before building any Matematik KSSR component (homepage, module hub, nav bar, topic routing), read `src/components/MatematikPage/MATEMATIK.md` in full. It contains the complete colour system, topic ID conventions, routing code, gap card rules, file checklist, and migration map that this file only summarises.

## Game File Migration Rule

Games that are reused from `AgeGroup-*` start there during Phase 1–5. After all phases are complete and routing is verified, each game file moves to its permanent location under the subject folder (e.g. `MatematikPage/Tahun1/Module1_Nombor/`). Imports in App.jsx and the originating `AgeGroup-*` home page must both be updated. See `MATEMATIK.md §Phase 6` for the full migration map.

## File & Folder Conventions

```
src/components/SubjectPage/
├── SubjectHomePage.jsx          ★ Year selector
├── SubjectModulePage.jsx        ★ Hub wrapper + nav
├── SubjectModuleNavBar.jsx      ★ Module tabs
├── SubjectPlanning.md           ★ Planning doc
├── Tahun1/
│   ├── ModuleX_Name/
│   │   ├── ModuleName.jsx       ★ Module hub
│   │   └── TopicName.jsx        ★ Lesson page  (PI pattern — topic file lives here)
│   ...
├── Tahun2/ ...
├── Tahun3/ ...
└── _shared/                     ★ Subject internals
    ├── Celebration.jsx
    └── utils.js
```

> **Matematik note:** `TopicName.jsx` files live permanently under `MatematikPage/Tahun*/Module*/` (migrated in Phase 6). Hub files (`ModuleName.jsx`) are the only files added per folder during Phases 1–5; game files arrive in Phase 6.

- `PascalCase.jsx` — components
- `camelCase.js` — utilities, hooks, services
- `CamelCase.css` or `camelCase.css` — stylesheets

## Optimization

- `React.lazy()` for all game/feature components
- `useTransition()` for navigation — keeps current screen visible during lazy load
- `useMemo` for `preparePool()` in scroll layout
- `useRef` for quiz answers (hides from React DevTools)
- Preload profile/leaderboard/achievement after 2s via `setTimeout` + dynamic `import()`
- `useCallback` for event handlers passed to child components

## Audio

```js
import { playSound, playHoverSound } from '../../../utils/soundManager';

playSound('correct' | 'wrong' | 'streak');
```

- Sound files in `public/sounds/`: `correct.mp3`, `wrong.mp3`, `streak.mp3`
- Hover sound: Web Audio API oscillator (sine wave, 1200→800Hz, 40ms)
- Mute state managed via `getMuted()` / `setMuted()` / `toggleMute()`

## Speech (TTS)

```js
import SpeechManager from '../../../services/SpeechManager';

// Speak
SpeechManager.speak(text, 'ms-MY', { rate: 0.88 });
SpeechManager.speak(text, 'en-US', { rate: 1.0 });

// Listen (STT)
SpeechManager.listen('ms-MY', onResult, onError);
```

- Singleton class wrapping Web Speech API
- Malay: `'ms-MY'`, pitch 1.5, rate 0.88
- English: `'en-US'`, pitch 1.0, rate 1.0

## Animation

Common cubic-bezier for elastic effects:
```
cubic-bezier(.34,1.56,.64,1)
```

Preferred animation names: `bounceIn`, `fadeSlideUp`, `swipeIn`, `popSuccess`, `shakeError`, `scl-bob`, `pi-bounce`

Reduced motion: `@media (prefers-reduced-motion: reduce)` disables all animations.

## Confetti Celebration Pattern (for quiz/game correct answers)

Every quiz or game correct answer MUST use `canvas-confetti` + sound. This is the standard celebration across all subjects.

```js
import confetti from 'canvas-confetti';
import { playSound } from '../../../utils/soundManager';

// For each correct answer (small burst):
playSound('correct');
confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 }, scalar: 0.8 });

// For streak milestone every 5 (big burst):
playSound('streak');
confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
```

No ribbon banners, no slide-down text banners — the confetti burst IS the celebration.
