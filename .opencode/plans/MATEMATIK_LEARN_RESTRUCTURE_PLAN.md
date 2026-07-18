# 📐 Matematik — Learn-First Topic Restructure Plan

> **Type:** Planning / build guideline (no code is written by this document)
> **Author:** Planning agent · **Date:** 2026-06-20
> **Build model:** Incremental, ONE topic per slice. Build agents **STOP** after each
> slice and mark it **🔍 Pending Verification**. The owner (user) then checks against
> the Definition of Done and promotes it to **✅ Completed**.
> **Status key:** ⬜ Not started · 🔄 In progress · 🔍 Pending verification · ✅ Completed · ⛔ Blocked

---

## ⚠️ UI/UX RENDERING CONTRACT — Read Before Every Slice (2026-07-11)

> **Why this exists:** Every new slice that bypassed this contract resulted in a white/plain
> background, non-responsive content, or layout that didn't match previous slices. These rules
> are **mandatory and non-negotiable** for every topic component built in this project.
> They override convenience. Check these before marking any slice 🔍.

### CONTRACT A — Background & Shell Wiring

`MatematikTopicShell` **automatically renders `MatematikSceneBackground`** — the light-mode
orbit-and-grid backdrop tinted with the module's `--mt-accent` colour (line 1044 of the
shell file). Build agents must NOT fight this or add competing backgrounds.

**Rule 1 — Never add your own background to an explore component root div.**
The shell provides it. Any `background:` style on the top-level div of a primitive
will either paint over the scene or cause a jarring colour clash.

**Rule 2 — THEME must always have `accent`, `dark`, AND `cd`.**
```js
// ✅ Required — all three present
const THEME = {
  accent: '#F59E0B',   // → --mt-accent (scene tint, toggle, buttons)
  dark:   '#B45309',   // → --mt-dark   (text, borders)
  cd:     '#D97706',   // → --mt-cd     (button shadow)
};
// ❌ Wrong — missing cd causes broken button shadow + scene fallback
const THEME = { accent: '#F59E0B', dark: '#B45309' };
```

**Rule 3 — Pass theme to BOTH Shell AND Explore in every topic page wrapper.**
```jsx
// ✅ Correct: theme flows page → shell (scene tint) and page → explore (content colours)
<MatematikTopicShell theme={THEME} onBack={onBack} showToggle={false} showReadyCta={false}
  learn={<MatematikExplore config={CONFIG} language={language} theme={THEME} onExit={onBack} />}
/>
// ❌ Wrong: theme missing from explore — content colours fall back to amber defaults
<MatematikTopicShell theme={THEME}
  learn={<MatematikExplore config={CONFIG} language={language} onExit={onBack} />}
/>
```

### CONTRACT B — Layout Inheritance Chain

When `showToggle={false}`, the shell wraps the `learn` child in:
```css
.mt-shell-body-plain { flex:1; min-height:0; display:flex; flex-direction:column; }
```
The explore component **must fill this container**. If it doesn't, you get a tiny content
island floating in empty space (looks like a white rectangle in the centre of the screen).

**Rule 4 — Explore component root: `display:'flex'; flexDirection:'column'; height:'100%'; minHeight:0`**
```jsx
// ✅ Correct — fills the shell body
<div style={{ display:'flex', flexDirection:'column', height:'100%', minHeight:0, width:'100%' }}>
  <MatematikActivityFrame ... />
</div>

// Or just return MatematikActivityFrame directly (it already has the right root styles)
return <MatematikActivityFrame buildRound={buildRound} renderQuestion={...} theme={theme} onExit={onExit} />;
```

**Rule 5 — Never wrap `MatematikActivityFrame` in a div with fixed height or `overflow:hidden`.**
The frame has its own internal scroll management. Wrapping it clips that scroll.

**Rule 6 — Any intermediate wrapper div between shell and frame must propagate flex fill.**
```jsx
// ✅ If you need a wrapper (e.g. for a level picker):
<div style={{ display:'flex', flexDirection:'column', flex:1, minHeight:0 }}>
  {level === null ? <LevelPicker /> : <MatematikActivityFrame ... />}
</div>
// ❌ Wrong — missing flex:1 causes the frame to collapse to 0 height
<div>
  <MatematikActivityFrame ... />
</div>
```

### CONTRACT C — Responsive Sizing

**Rule 7 — All sizes in question content use `clamp(min, Nvmin, max)`.**
Never use plain `px` values for fonts, padding, icon sizes, or gap inside question content.
Use `vmin` (not `vw`) so the layout scales correctly in both portrait and landscape.

```css
/* ✅ vmin scales with the shortest viewport dimension — phone or tablet */
font-size: clamp(16px, 2.8vmin, 28px);
padding: clamp(10px, 1.6vmin, 20px);
gap: clamp(8px, 1.4vmin, 16px);
width: clamp(80px, 18vmin, 160px);

/* ❌ Fixed px — breaks on small phone or fails to grow on desktop */
font-size: 18px;
gap: 14px;
```

**Rule 8 — Question content must fit in one viewport on tablet/desktop (768px height).**
The frame scrolls on phones; it must NOT scroll on tablets and desktops. If your stage
content is taller than ~460px at desktop, use `clamp()` to make it shorter.

**Rule 9 — Tap targets ≥ 44px.** All interactive elements (answer buttons, tick boxes,
option cards) must have a minimum hit area of 44 × 44 px. Use `minHeight: clamp(44px, ...)`.

### CONTRACT D — Pre-🔍 Checklist

Before marking any slice 🔍, verify every item:

- [ ] **THEME:** has `accent`, `dark`, `cd` — no field missing
- [ ] **Topic page:** passes `theme={THEME}` to BOTH `MatematikTopicShell` and `MatematikExplore`
- [ ] **Shell props:** `showToggle={false}`, `showReadyCta={false}`, `emoji=""`, `titleBM=""`
- [ ] **Background:** NOT overridden in any explore component — shell provides it
- [ ] **Explore root div:** `display:'flex'`, `flexDirection:'column'`, `height:'100%'`, `minHeight:0`
- [ ] **No fixed-height wrappers** around `MatematikActivityFrame`
- [ ] **All sizes** in question content use `clamp(min, Nvmin, max)` (vmin)
- [ ] **Hub card:** ROBOT visual, UPPERCASE pill, desc ≤10 words, NOT disabled
- [ ] **App.jsx:** lazy import + `if (matematikTopic === '...')` route added
- [ ] **`npm run build` exit 0**; no console errors

### CONTRACT E — Layout Memory

Treat this as the default visual rule for every new slice:

- Keep the existing `MatematikTopicShell` background scene. Do not add a new page
  background on the explore root or replace the shell tint.
- Keep the content area centered inside the available shell body.
- Keep Section 1 close to Section 2, then keep Sections 2, 3, and 4 on a consistent gap.
- Keep the page responsive on small phones and wide screens with `clamp()` sizing and
  `flex`-based centering, not fixed pixel spacing.
- Keep the same header and footer behaviour as the previous module/question pages.
- If a slice needs custom layout, it still has to inherit the same shell background and
  width rhythm before adding any custom details.

Question-page content structure is locked to this 4-section layout:

- Section 1 = the question header inside the content area. It is the content header, not part of the page header.
- Section 2 = the main visual prompt zone such as emoji, number, card, or illustration.
- Section 3 = the answer interaction zone.
- Section 4 = the action zone, usually the primary next button or retry button.

Spacing memory:

- The whole content block should stay vertically centered between the existing header and footer.
- Section 1 must have a visible bottom gap before Section 2.
- Sections 2, 3, and 4 should use the same baseline gap rhythm.
- Remove extra celebration text banners like `Betul! 🎉` when they create dead space; confetti and the action button are enough.

Verification memory:

- A slice is not considered stable from build output alone.
- Always check the real Matematik question page in the browser, not only an isolated harness.
- Layout verification includes background scene, content centering, spacing rhythm, and footer alignment on small and large screens.

### CONTRACT F — Ujian Page Standard (copy Ujian Wang)

Every module-level **Ujian / Cabar Minda** page must reuse the completed **Ujian Wang**
interaction and layout pattern. Do not invent a new exam chrome per module.

Required behaviour:

- Active exam questions must fit in one screen without internal page scrolling on all target
  screen sizes; use compact `examMode` sizing for tall visual question types.
- User cannot go next until the current question is answered.
- Footer is always one row: **left** = `Soalan answered/total` button, **right** = timer only.
  Do not show a separate `Hantar lengkap` button. Do not duplicate `n/total` beside the timer.
- The `Soalan answered/total` button opens a fixed, single-screen question-map dialog.
  The dialog shows all question numbers, highlights current/answered state, and lets the
  user jump to any question to edit the answer before submit.
- The question-map dialog must fit one viewport without scrolling.
- The main action button shows `Tamat` / `Finish` only when the user is on the last question
  **and** every question has been answered. If the last question is reached while some
  questions are unanswered, keep the normal next label and open the question-map dialog
  instead of submitting.
- Ujian question banks must be built only from that module's completed learning/problem
  banks. Do not pull from a drill-only `Latih Diri` generator unless the owner explicitly
  asks for that module.
- Results page review is mandatory. `✅ Betul: {n}` and `❌ Salah: {n}` are buttons, not
  static chips. `Betul` opens a popup listing all correct questions; `Salah` opens a popup
  listing all wrong questions.
- Each review popup must render each question with the same Ujian/Cabar Minda question UI
  used during the exam, including prompt text, cards, emoji-style visuals, money/fraction
  visuals, keypad/long-method/math layouts, and other custom question content.
- Correct-question review shows `Jawapan anda`. Wrong-question review shows both
  `Jawapan anda` and `Jawapan betul`.
- Review popups must use a portal or equivalent fixed overlay with a very high z-index
  (higher than the back button, stats bar, footer, and question-map dialog).

---

## 0. How to read & use this plan (build agents MUST read first)

1. **You build ONE topic per slice.** Never bulk-process multiple topics. After
   finishing a slice, **stop and wait** — do not start the next topic.
2. When a slice's code is done, set its row in the **Status Board (§8)** to
   **🔍 Pending Verification** and write a one-line note of what you changed. Then end
   your turn with a short summary. **Do not mark anything ✅** — only the owner does that
   after manual verification.
3. Before starting a slice, confirm with the owner which topic/slice to build. If the
   owner says "continue", build the next ⬜ row in board order.
4. Respect the project's standing rules (these override convenience):
   - **iOS-safe CSS** — resting state visible (no `opacity:0`+entrance reveal); SVGs use
     `width`/`height` attrs + `height:auto`; self-contained SVGs (no cross-root `<use>`);
     hover only behind `@media (hover:hover)`.
   - **Lazy-loading** — leaf topic components stay lazy in `App.jsx`; don't eager-import.
   - **TTS** — Malay (`ms-MY`) voices are unreliable; fall back to `id-*` (Indonesian)
     when no Malay voice exists, exactly as existing games do. Reuse the shared TTS
     helper rather than calling `speechSynthesis` ad-hoc. Audio must **stop on unmount /
     navigation** (no audio leaking across screens).
   - **No Python/Playwright test scripts** — verify by reading code + running the dev app.
5. **Reuse, don't rewrite.** The quiz already exists for every topic. You are *adding* a
   Belajar phase and *wrapping* the existing quiz — you are not rebuilding quizzes
   (except the small, explicitly-listed mismatch fixes in §6).

---

## 1. Problem statement

Today every Matematik topic page is **quiz-only**. Tapping a topic card drops the child
straight into multiple-choice questions. There is no "teach me first" step.

**Worked example — Tahun 1 · Nombor 1–100** (`Nombor100.jsx`):
the page immediately asks *"Apakah nama nombor ini?"*, *"Mana lebih besar?"*, *"Berapa
puluh?"*. A child who does not yet **know** the numbers 1–100 has nothing to learn from —
they can only guess. The topic title promises *"Belajar 1–100"* but the page never lets
the child *explore and get to know* the numbers.

**Goal:** Every topic becomes **Belajar → Kuiz**:
- **Belajar (Learn)** — a clean, simple, **interactive explore** screen where the child
  *plays to discover* the concept (tap a number → hear it, see it in words, see its place
  value). No reading-heavy lessons. Low text, high interaction.
- **Kuiz (Quiz)** — the existing quiz, reused as-is, after a quick check that its
  questions actually match the topic.

---

## 2. The new standard topic structure

Every topic page follows the **same two-phase shape**:

```
┌─────────────────────────────────────────────┐
│  [ ← ]            Nombor 1–100        ⭐ 💎   │  ← top bar (back + stats)
│  ┌───────────────┬───────────────┐           │
│  │   BELAJAR ●   │     KUIZ      │           │  ← segmented toggle (Belajar default)
│  └───────────────┴───────────────┘           │
│                                              │
│   ┌────────────────────────────────────┐     │
│   │   INTERACTIVE EXPLORE (Belajar)     │     │  ← phase 1: discover by tapping
│   │   …or the existing quiz (Kuiz)…     │     │  ← phase 2: existing game
│   └────────────────────────────────────┘     │
│                                              │
│         [  Saya Dah Sedia → Kuiz  ]          │  ← CTA shown only in Belajar
└─────────────────────────────────────────────┘
```

Rules:
- **Belajar is the default phase** when a topic opens. The child always meets the
  teaching screen first.
- A **segmented toggle** (Belajar | Kuiz) lets the child switch freely at any time — a
  child who already knows the topic can jump to Kuiz; a child who struggles in Kuiz can
  flip back to Belajar.
- In **Belajar**, a primary CTA **"Saya Dah Sedia → Kuiz"** (EN: *"I'm Ready → Quiz"*)
  moves to the quiz. This is the encouraged path.
- **Back-button behaviour:**
  - From **Kuiz** → returns to **Belajar** (not straight to the hub), so the toggle stays
    coherent. *(Exception: if the child opened directly into Kuiz via the toggle, back
    still goes to Belajar — Belajar is the home phase.)*
  - From **Belajar** → returns to the **module hub** (existing `onBack`).
- Stats bar / XP / gamification keep working exactly as today (quiz drives XP). The
  Belajar phase awards **no XP** — it is pressure-free exploration.

---

## 3. Architecture — shared shell + explore primitives

We do **not** rewrite 37 components. We add two shared pieces and have each topic file
opt in.

### 3.1 New shared files (built ONCE, in Slice 0)

```
src/components/MatematikPage/_shared/
├── MatematikTopicShell.jsx     ★ owns phase state, toggle, CTA, back routing, top bar
├── MatematikExplore.jsx        ★ the interactive-explore engine (data-driven)
├── explorePrimitives_shared.jsx ★ shared helpers + placeholder explore primitives
├── useMtTts.js                 ★ thin wrapper over the app TTS helper (ms-MY→id-* fallback)
└── learn/                      ★ one tiny data file per topic (content only, no logic)
    ├── nombor-100.js
    ├── tambah-tolak.js
    └── … (one per topic, added per slice)
```

> If a `_shared/` folder already exists under `MatematikPage/`, extend it; otherwise
> create it. Mirror the Pendidikan Islam `_shared/` pattern the project already uses.

### 3.2 `MatematikTopicShell` contract

```jsx
<MatematikTopicShell
  language={language}
  onBack={onBack}                 // from App.jsx → returns to module hub
  theme={THEME}                   // the module's theme object (teal/indigo/purple)
  emoji="💯"
  titleBM="Nombor 1–100"  titleEN="Numbers 1–100"
  subtitleBM="Kenali setiap nombor" subtitleEN="Get to know every number"
  learn={<MatematikExplore config={NOMBOR_100_LEARN} language={language} theme={THEME} />}
  quiz={<Nombor100 embedded onBack={() => {/* shell handles → back to Belajar */}} language={language} />}
/>
```

- Shell owns `phase` state: `'belajar' | 'kuiz'`, default `'belajar'`.
- Shell renders the **top bar** (back + StatsBar) and the **segmented toggle** ONCE, so
  every topic gets an identical frame. The `quiz` child renders **without** its own top
  bar/back when `embedded` is set (see §3.4).
- Shell renders the **"Saya Dah Sedia → Kuiz"** CTA only while `phase === 'belajar'`.

### 3.3 Explore primitives (the reusable interactive widgets)

`MatematikExplore` takes a `config` and renders a primitive. Build only what each slice
needs; the library grows over slices. Target primitives:

| Primitive | What the child does | Used by (examples) |
|-----------|---------------------|--------------------|
| `NumberGridExplore` | Tap any cell in a 1–N grid → hears the name (TTS), sees it in words + place-value blocks (puluh/sa). "Count along" play button reads a row aloud. | Nombor 1–100 / 1–1000 / 1–10000 |
| `BuildAddExplore` | Drag/tap counters into two groups → watch them combine; the sum updates live with the math sentence. | Tambah, Tolak (separate) |
| `GroupsExplore` | Make N groups of M objects → see repeated-addition → ×. | Darab, Bahagi |
| `FractionExplore` | Tap slices of a shape to shade them → see ½, ¼, ¾ named + written. | Pecahan, Perpuluhan, Peratus |
| `MoneyExplore` | Tap coins/notes into a tray → running total in RM/sen. | Wang (all years) |
| `ClockExplore` | Drag clock hands → digital + spoken time updates. | Masa (all years) |
| `MeasureExplore` | Drag a ruler/scale/jug → reads the measurement + unit. | Ukuran panjang/jisim/cecair |
| `ShapeExplore` | Tap a 2D/3D shape → name, sides/faces highlighted + spoken. | Ruang/Geometri |
| `DataExplore` | Tap data items → watch a pictograph/bar chart build, then read it. | Statistik/Data |
| `ProbabilityExplore` | Spin/draw → label outcomes "mungkin / mustahil / pasti". | Kebarangkalian |

Each primitive shares: a teal/indigo/purple `theme` prop, a TTS speak-on-tap, big
tappable targets (≥44px), and **no scoring**. Keep them small — "simple and clean".

### 3.4 Minimal change inside each existing quiz file

The existing quiz component gets a small, mechanical change only:
- Accept an optional `embedded` prop. When `embedded` is true, **hide its own
  `BackButton` and outer top padding** (the shell now owns the frame). All quiz logic,
  questions, scoring, and the results screen stay **byte-for-byte the same**.
- That's it. No question logic changes here (mismatch fixes are tracked separately in §6).

### 3.5 Routing change in `App.jsx`

Each topic route changes from rendering the bare quiz to rendering the shell. Example:

```js
// BEFORE
if (matematikTopic === 'nombor-100') return <Nombor100 onBack={…} language={language} />;

// AFTER
if (matematikTopic === 'nombor-100')
  return <NomborTopic100 onBack={() => setMatematikTopic(null)} language={language} />;
//        ^ a thin wrapper file that composes MatematikTopicShell + MatematikExplore + Nombor100
```

> **Decision for build agents:** prefer composing the shell **inside the topic's own
> folder** as a tiny wrapper (e.g. `Nombor100Topic.jsx`) and pointing the lazy import at
> it, OR converting the existing file to render the shell internally. Pick whichever keeps
> the diff smallest for that topic and note your choice in the slice. Keep lazy-loading
> intact either way.

---

## 3.6 Explore Split — Completed Split (Executed)

> **Status:** ✅ Completed — the old monolithic explore file has been split into topic-scoped files plus `explorePrimitives_shared.jsx`, following the dependency-based split plan in `src/components/MatematikPage/_shared/EXPLORE_SPLIT_PLAN.md`. `MatematikExplore.jsx` now lazy-loads the split topic-group files directly, and the temporary `explorePrimitives.jsx` barrel has since been removed.

### Final File Structure

```
src/components/MatematikPage/_shared/
├── explorePrimitives_shared.jsx          ← shared utils, KeypadInput, stubs
├── explore_T1_1.jsx                      ← compatibility barrel for Module 1
├── explore_T1_1_core.jsx                 ← T1.1 learning topics
├── explore_T1_1_assessment.jsx           ← T1.1 assessment + mixed-practice
├── explore_T1_2_core.jsx                 ← NEW: T1.2 core addition & subtraction learning (~2,650 lines)
├── explore_T1_2_assessment.jsx           ← NEW: T1.2 assessment/mixed-practice (~1,550 lines)
└── explore_T1_3.jsx                      ← NEW: T1.3 Pecahan Asas (~350 lines)
```

### Shared Dependencies (in `explorePrimitives_shared.jsx`)

These symbols are used across multiple topic files and exist **only once** in `_shared`:

| Symbol | Used In |
|--------|---------|
| `randInt`, `pick`, `shuffle` | ALL sections |
| `NumOptionsGrid` | T1.1, LatihanTambah, LatihanTolak, TambahBerulang |
| `WordOptionsGrid` | T1.1, KenaliTambah, KenaliTolak |
| `BM_ONES`, `BM_TEENS`, `BM_TENS`, `numToBM` | T1.1, SelesaikanCabaran |
| `KeypadInput` | KenaliTambah, KenaliTolak, LatihanTambah, LatihanTolak, SelesaikanCabaran |
| `ObjectsGrid` | CompareExplore (T1.1), GabungKumpulanContent (KenaliTambah) |
| `EmptyTray` | KenaliTambah |
| `BOX_COLORS`, `SPLATTER_PATHS` | T1.1, LatihanTambah, TambahBerulang |
| Stub exports (`NumberGridExplore`, `BuildAddExplore`, etc.) | `MatematikExplore.jsx` fallback |

### File Responsibilities (per EXPLORE_SPLIT_PLAN.md)

| File | Components |
|------|------------|
| `explore_T1_1_core.jsx` | CompareExplore, KenaliNomborExplore, KombinasiExplore, Kenali21Hingga100Explore, NilaiTempatExplore, SusunanNomborExplore, PolaNomborExplore, AnggarBundarExplore |
| `explore_T1_1_assessment.jsx` | SelesaikanExplore, LatihDiriExplore, CabarMindaExplore, SelesaikanCeritaM1Explore, CabarMindaM1Explore |
| `explore_T1_2_core.jsx` | KenaliTambahExplore, LatihanTambahExplore, KenaliTolakExplore, LatihanTolakExplore, CeritaTambahTolakExplore, TambahBerulangExplore |
| `explore_T1_2_assessment.jsx` | SelesaikanM2Explore, LatihDiriM2Explore, CabarMindaM2Explore |
| `explore_T1_3.jsx` | KenaliPecahanExplore |

### Cross-File Dependency Flow

```
explorePrimitives_shared.jsx  ← imported by ALL topic files
explore_T1_1_core.jsx         ← independent
explore_T1_1_assessment.jsx   ← imports module1CoreApi from explore_T1_1_core.jsx
explore_T1_2_core.jsx         ← independent (exports components for explore_T1_2_assessment.jsx)
explore_T1_2_assessment.jsx   ← imports from explore_T1_2_core.jsx
explore_T1_3.jsx              ← independent
```

**No circular dependencies.** Flow is one-way: explore_T1_1_core.jsx -> explore_T1_1_assessment.jsx and explore_T1_2_core.jsx -> explore_T1_2_assessment.jsx.



### Verification Checklist (All Passed)

- [x] `npm run dev` starts without errors/warnings
- [x] Matematik → Tahun 1 → Module 1 (Nombor) → any Belajar topic → activity loads
- [x] Matematik → Tahun 1 → Module 2 (Operasi Asas) → Kenali Tambah Belajar → loads
- [x] Matematik → Tahun 1 → Module 2 → Latihan Tambah Belajar → loads
- [x] Matematik → Tahun 1 → Module 2 → Kenali Tolak Belajar → loads
- [x] Matematik → Tahun 1 → Module 2 → Latihan Tolak Belajar → loads
- [x] Matematik → Tahun 1 → Module 2 → Cerita Tambah & Tolak Belajar → loads
- [x] Matematik → Tahun 1 → Module 2 → Tambah Berulang Belajar → loads
- [x] Matematik → Tahun 1 → Module 2 → Selesaikan Cerita M2 Belajar → loads (uses all topic components)
- [x] Matematik → Tahun 1 → Module 2 → Latih Diri M2 Belajar → loads (drill mode works)
- [x] Matematik → Tahun 1 → Module 2 → Cabar Minda M2 Belajar → loads (mixed exam works)
- [x] Matematik → Tahun 1 → Module 3 (Pecahan) → Kenali Pecahan Belajar → loads
- [x] No "Cannot find module" / "is not exported" / duplicate declaration errors
- [x] Runtime verification: compare, keypad pages, and ObjectsGrid all mount without ReferenceError

### 3.6.1 Current Architecture Lock (2026-07-11)

Treat the notes above as historical context only. The current enforced split shape is:

```text
src/components/MatematikPage/_shared/
├── explorePrimitives_shared.jsx
├── explore_T1_1.jsx
├── explore_T1_1_core.jsx
├── explore_T1_1_assessment.jsx
├── explore_T1_2_core.jsx
├── explore_T1_2_assessment.jsx
└── explore_T1_3.jsx
```

Locked rules from the executed refactor:

- Split by dependency graph, never by raw line ranges.
- Keep fewer ownership files first, then grow only when boundaries are clear.
- Use stable public APIs before further fragmentation.
- `explore_T1_1_assessment.jsx` may consume `module1CoreApi`.
- `explore_T1_2_assessment.jsx` may consume `module2CoreApi`.
- `MatematikExplore.jsx` now lazy-loads the topic-group files directly.
- The temporary `explorePrimitives.jsx` barrel is gone; shared helpers live in `explorePrimitives_shared.jsx`.
- Real browser verification on the actual Matematik question flow is mandatory after each split change.
- Layout verification must include shell background, centered content area, section-gap rhythm, and footer alignment.

This is the reference architecture for future explore/topic splitting.

---

## 4. Belajar content per topic (what "interactive explore" means here)

Each topic's `learn/*.js` supplies **data only** (numbers, labels, BM/EN strings, the
primitive to use). Reference content per family:

- **Nombor (1–100 / 1–1000 / 1–10000):** `NumberGridExplore`. Tap → speak name + show
  words + puluh/ratus/ribu/sa blocks. "Count along" reads a row. Range scales per year.
- **Tambah / Tolak:** `BuildAddExplore`. Two object groups combine/separate with a live
  math sentence (e.g. `3 + 2 = 5`).
- **Darab / Bahagi:** `GroupsExplore`. N groups of M → repeated addition → ×/÷ sentence.
- **Pecahan / Perpuluhan / Peratus:** `FractionExplore`. Shade parts of a whole; show the
  fraction, its decimal, and (T3) its percent.
- **Wang:** `MoneyExplore`. Build an amount from Malaysian coins/notes; running total.
- **Masa:** `ClockExplore`. Drag hands; digital + spoken time; (T1) parts of day.
- **Ukuran:** `MeasureExplore`. Drag ruler/scale/jug; reads value + standard/non-standard
  unit per year.
- **Ruang / Geometri:** `ShapeExplore`. Tap shapes; name + sides/faces/edges; (T1) 2D & 3D.
- **Data / Statistik:** `DataExplore`. Tap to build a pictograph/bar chart, then read it.
- **Kebarangkalian:** `ProbabilityExplore`. Outcomes labelled mungkin/mustahil/pasti.

Keep each Belajar screen to **one clear idea + one interaction**. If a topic spans several
sub-skills, the explore can have 2–3 tappable tabs, but never a wall of text.

---

## 5. Definition of Done (DoD) — used by the owner to verify each slice

A topic slice is verifiable as ✅ only when **all** of the following hold:

- [ ] Opening the topic shows **Belajar** first, with the segmented **Belajar | Kuiz**
      toggle and a **"Saya Dah Sedia → Kuiz"** CTA.
- [ ] The Belajar screen is **interactive** (tappable), matches the topic, and **teaches
      the thing the title promises** (e.g. Nombor 1–100 actually lets you get to know the
      numbers 1–100). Tapping speaks via TTS with the **ms-MY→id-\*** fallback.
- [ ] Belajar awards **no XP/score**; audio **stops on navigate/unmount**.
- [ ] Toggling to **Kuiz** shows the existing quiz, fully working (scoring, results,
      reset, confetti) with **no regression** vs. before.
- [ ] **Back** from Kuiz → Belajar; **Back** from Belajar → module hub.
- [ ] Quiz content **matches the topic** (or the specific §6 mismatch fix is applied).
- [ ] Works in **BM and EN** (`language` prop honoured throughout).
- [ ] **iOS-safe CSS** rules honoured; resting state visible; no layout break on phone
      width; lazy-loading intact; `npm run build` passes with 0 errors.
- [ ] No console errors; no audio bleed; no stuck phase after navigating away and back.

---

## 6. Quiz mismatch audit (reuse + verify)

Per the chosen approach, quizzes are **reused**, but each slice must include a 2-minute
check that the quiz actually tests its topic. If it matches → no quiz change. If it does
**not** match, log it here and apply the **smallest** fix.

> **Slice 0 deliverable:** open each topic's quiz, confirm it tests the topic, and fill
> this table. Most are expected to match (e.g. `Nombor100` correctly tests read/compare/
> place-value). Only genuine mismatches get a fix task.

| Topic | Quiz file | Matches topic? | Fix needed (if any) |
|-------|-----------|----------------|---------------------|
| _to be filled in Slice 0_ | | | |

---

## 7. Build sequence

1. **Slice 0 — Foundation (no topic yet):** build `MatematikTopicShell`,
   `MatematikExplore`, `useMtTts`, the `_shared/learn/` folder, and the first primitive
   needed by the pilot (`NumberGridExplore`). Wire the `embedded` prop into one quiz.
   Complete the §6 mismatch audit table. → 🔍
2. **Slice 1 — Pilot: T1 · Nombor 1–100** (the worked example). Full Belajar+Kuiz using
   the foundation. This is the **reference implementation** every later topic copies. → 🔍
3. **Owner verifies Slice 0 + Slice 1.** Once ✅, the pattern is locked.
4. **Slices 2…N — one topic at a time**, Tahun 1 first (finish the year), then Tahun 2,
   then Tahun 3, in Status Board order. Each new primitive is built the first time a topic
   needs it, then reused.

---

## 8. Status Board

> Build agents: set your slice to **🔍** and add a note. Owner promotes to **✅**.
> All 37 topics already have a working quiz, so every row is "add Belajar + wrap".

### Slice 0 — Foundation

| # | Task | Status | Note |
|---|------|--------|------|
| 0.1 | `MatematikTopicShell.jsx` (phase, toggle, CTA, back routing, top bar) | ⬜ | |
| 0.2 | `MatematikExplore.jsx` engine + `useMtTts.js` (ms-MY→id-* fallback) | ⬜ | |
| 0.3 | `NumberGridExplore` primitive (for pilot) | ⬜ | |
| 0.4 | `embedded` prop added to one quiz (`Nombor100`) | ⬜ | |
| 0.5 | §6 quiz-mismatch audit table filled for all 37 topics | ⬜ | |

### Tahun 1 (teal · Module 1 Nombor / 2 Sukatan / 3 Statistik)

| # | Topic ID | Title | Quiz file | Primitive | Status | Note |
|---|----------|-------|-----------|-----------|--------|------|
| T1-1 | `nombor-100` | Nombor 1–100 *(PILOT)* | `Nombor100` | NumberGrid | ⬜ | reference impl |
| T1-2 | `tambah-tolak` | Operasi Tambah | `Tambah100` | BuildAdd | ⬜ | |
| T1-3 | `tambah-cerita` | Cerita Tolak | `SubtractionStory` | BuildAdd | ⬜ | |
| T1-4 | `pecahan-asas` | Pecahan Asas | `PecahanAsasT1` | Fraction | ⬜ | |
| T1-5 | `wang-t1` | Wang | `CountingMoney` | Money | ⬜ | |
| T1-6 | `masa-t1` | Masa & Waktu | `TimeTeller` | Clock | ⬜ | |
| T1-7 | `ukuran-t1-panjang` | Ukur Panjang | `UkurPanjang` | Measure | ⬜ | |
| T1-8 | `ukuran-t1-jisim` | Jisim | `Jisim` | Measure | ⬜ | |
| T1-9 | `ukuran-t1-cecair` | Isi Padu Cecair | `IsiPaduCecair` | Measure | ⬜ | |
| T1-10 | `ruang-t1` | Bentuk 3D/2D | `Bentuk3D` | Shape | ⬜ | |
| T1-11 | `data-t1` | Piktograf | `BacaPictograph` | Data | ⬜ | |

### Tahun 2 (indigo)

| # | Topic ID | Title | Quiz file | Primitive | Status | Note |
|---|----------|-------|-----------|-----------|--------|------|
| T2-1 | `2-nombor-1000` | Nombor 1–1,000 | `Nombor1000` | NumberGrid | ⬜ | |
| T2-2 | `2-tambah` | Tambah | `TambahTahun2` | BuildAdd | ⬜ | |
| T2-3 | `2-tolak` | Tolak | `TolakTahun2` | BuildAdd | ⬜ | |
| T2-4 | `2-darab` | Darab | `DarabMudah` | Groups | ⬜ | |
| T2-5 | `2-bahagi` | Bahagi | `BahagiT2` | Groups | ⬜ | |
| T2-6 | `2-pecahan` | Pecahan | `Pecahan` | Fraction | ⬜ | |
| T2-7 | `2-perpuluhan` | Perpuluhan | `PerpuluhanT2` | Fraction | ⬜ | |
| T2-8 | `2-wang` | Wang hingga RM100 | `Wang` | Money | ⬜ | |
| T2-9 | `2-masa` | Masa & Waktu | `Masa` | Clock | ⬜ | |
| T2-10 | `2-ukuran-panjang` | Ukuran Panjang | `UkuranPanjangTahun2` | Measure | ⬜ | |
| T2-11 | `2-ukuran-jisim-cecair` | Jisim & Isi Padu | `JisimCecairT2` | Measure | ⬜ | |
| T2-12 | `2-geometri` | Geometri | `GeometriT2` | Shape | ⬜ | |
| T2-13 | `2-data` | Pengurusan Data | `DataT2` | Data | ⬜ | |

### Tahun 3 (purple)

| # | Topic ID | Title | Quiz file | Primitive | Status | Note |
|---|----------|-------|-----------|-----------|--------|------|
| T3-1 | `3-nombor-10000` | Nombor 1–10,000 | `Nombor10000` | NumberGrid | ⬜ | |
| T3-2 | `3-darab` | Darab Lanjutan | `DarabLanjutan` | Groups | ⬜ | |
| T3-3 | `3-bahagi` | Bahagi | `BahagiTahun3` | Groups | ⬜ | |
| T3-4 | `3-operasi-bergabung` | Operasi Bergabung | `OperasiBergabungT3` | BuildAdd | ⬜ | |
| T3-5 | `3-pecahan` | Pecahan Lanjutan | `PecahanLanjutan` | Fraction | ⬜ | |
| T3-6 | `3-perpuluhan` | Perpuluhan | `Perpuluhan` | Fraction | ⬜ | |
| T3-7 | `3-peratus` | Peratus | `PeratusT3` | Fraction | ⬜ | |
| T3-8 | `3-wang` | Wang hingga RM10,000 | `WangTahun3` | Money | ⬜ | |
| T3-9 | `3-masa` | Masa & Waktu | `MasaTahun3` | Clock | ⬜ | |
| T3-10 | `3-ukuran` | Ukuran | `UkuranT3` | Measure | ⬜ | |
| T3-11 | `3-perimeter` | Perimeter & Luas | `PerimeterLuas` | Shape | ⬜ | |
| T3-12 | `3-data` | Pengurusan Data | `DataT3` | Data | ⬜ | |
| T3-13 | `3-kebarangkalian` | Kebarangkalian | `KebarangkalianT3` | Probability | ⬜ | |

---

## 9. Reference implementation — T1 · Nombor 1–100 (Slice 1, fully specced)

This is the pattern every later topic copies. Build it exactly; later slices are
"same shape, different data + primitive".

### 9.1 Belajar screen — `NumberGridExplore`

- **Layout:** title chip "BELAJAR · Nombor 1–100", a scrollable **10×10 grid of 1–100**
  (start showing 1–50, "Lihat lagi" reveals 51–100 to keep it phone-friendly), and a
  hint line *"Ketik nombor untuk dengar"* (EN: *"Tap a number to hear it"*).
- **On tap a cell:**
  - TTS speaks the BM number name (`numToBM`, already in `Nombor100.jsx` — reuse it),
    falling back id-* if no ms voice.
  - A **focus card** shows: the big numeral, its **name in words** (`dua puluh tiga`),
    and **place-value blocks** (puluh bars indigo + sa dots orange — reuse
    `PlaceValueBlocks` from `Nombor100.jsx`).
- **"Kira sekali" (Count along) button:** highlights cells 1→10 one-by-one and speaks
  each — a gentle guided count. Pressing again stops it (and stops audio).
- **No score, no timer, no streak.** Pure exploration.
- **CTA:** "Saya Dah Sedia → Kuiz" beneath the grid.

### 9.2 Kuiz screen

- Render the **existing `Nombor100`** quiz unchanged, with `embedded` so it drops its own
  back button/top padding. Read/compare/place-value questions already match the topic →
  **no quiz changes** (confirm in the §6 audit).

### 9.3 Files touched in Slice 1

| File | Change |
|------|--------|
| `_shared/learn/nombor-100.js` | NEW — config: range 1–100, labels, primitive `NumberGrid` |
| `Tahun1/Module1_Nombor/Nombor100Topic.jsx` | NEW — composes Shell + Explore + `Nombor100` |
| `Tahun1/Module1_Nombor/Nombor100.jsx` | add `embedded` prop handling only |
| `App.jsx` | point `nombor-100` route + lazy import at `Nombor100Topic` |
| §8 board | set T1-1 → 🔍 with a note |

### 9.4 Stop condition for Slice 1

When 9.1–9.3 are done and `npm run build` passes: set **T1-1 → 🔍 Pending Verification**,
write a one-line note, summarise, and **stop**. Do not start T1-2.

---

## 10. Out of scope (do NOT do in the **Belajar restructure** track, §1–§9)

- Building brand-new quizzes for topics that lack one — **none lack one**; all 37 already
  have a quiz. If a gap is discovered, log it, don't silently build.
- Changing the year selector, module hubs, nav bar, colour system, or routing *shape*
  (only the per-topic render target changes).
  > **Exception:** the **Latih Tubi** track (§12) *intentionally* adds a 4th module tab,
  > a 4th module colour, and a new module hub. Those nav/colour changes belong to §12, not
  > to the Belajar restructure — keep the two tracks' diffs separate.
- Reworking gamification/XP — the quiz keeps driving it; Belajar stays XP-free.
- Touching non-Matematik subjects.

---

## 11. Quick reference — owner verification ritual

When the owner says "verify <topic>":
1. Open the topic in the running app. Confirm Belajar-first + toggle + CTA.
2. Tap around the explore — does it *teach the title's promise*? Audio + fallback OK?
3. Toggle to Kuiz — quiz works, matches topic, no regression.
4. Check back-button chain, BM/EN, phone width, console clean.
5. If all §5 DoD boxes pass → flip the board row to **✅**. Otherwise note what failed and
   send it back to 🔄.

---

# 📦 TRACK 2 — New Module: "Latih Tubi" (Drills)

> This is a **separate build track** from the Belajar restructure (§1–§11). It can be
> built in parallel. It uses the **same incremental + 🔍 Pending Verification protocol**
> (§0): one slice at a time, agents stop and mark 🔍, owner promotes to ✅.

## 12. Latih Tubi — overview & decisions

A **4th module** added to every Tahun, beside Nombor & Operasi / Sukatan & Geometri /
Statistik. While those three are **Belajar → Kuiz** (learn then test), **Latih Tubi is
pure practice** — no Belajar phase, no new teaching. It builds **fluency/automaticity**
in the basic operations through fast, repetitive, timed drills.

**Owner decisions (2026-06-20):**
- **Content = Operasi-asas fluency** — Tambah (+), Tolak (−), Darab/Sifir (×), Bahagi (÷),
  plus Ikatan Nombor (number bonds) for the youngest. No topic-mirroring drills.
- **Format = Timed challenge** — 60-second sprint; count how many correct; **best score
  saved** per drill+level. Auto-advance on answer (no "Next" button) for speed.
- **Levels = Tiered Mudah / Sederhana / Sukar** — child picks the level before each drill.

### 12.1 What's in Latih Tubi per year (KSSR-aligned)

| Year (theme) | Drill cards |
|--------------|-------------|
| **Tahun 1** (teal) | Ikatan Nombor · Tambah · Tolak  *(KSSR T1 has no ×/÷ yet)* |
| **Tahun 2** (indigo) | Tambah · Tolak · Sifir (Darab) · Bahagi |
| **Tahun 3** (purple) | Tambah · Tolak · Darab · Bahagi  *(larger ranges)* |

### 12.2 Level ranges (guidance — build agent finalises exact bounds, keep KSSR-sane)

| Drill | Mudah | Sederhana | Sukar |
|-------|-------|-----------|-------|
| Ikatan Nombor (T1) | bonds to 10 | bonds to 20 | missing-addend to 20 |
| Tambah (T1 / T2 / T3) | ≤10 / ≤20 / ≤100 | ≤20 / ≤100 / ≤1,000 | ≤100 / ≤1,000 / ≤10,000 |
| Tolak (T1 / T2 / T3) | ≤10 / ≤20 / ≤100 | ≤20 / ≤100 / ≤1,000 | ≤100 / ≤1,000 / ≤10,000 |
| Sifir/Darab (T2 / T3) | ×2,5,10 | ×3,4,6 | ×7,8,9 (T3: to ×12) |
| Bahagi (T2 / T3) | ÷2,5,10 | ÷3,4,6 | ÷7,8,9 (T3: to ÷12) |

### 12.3 Flow (self-contained inside the module — no per-drill App.jsx routes)

```
Latih Tubi module hub
  → tap a drill card (e.g. Tambah)
    → Level picker: [ Mudah ] [ Sederhana ] [ Sukar ]   (each shows best score)
      → 3·2·1 countdown
        → 60-second timed drill (auto-advance, live timer + score)
          → Results: skor, skor terbaik (new-best badge if beaten), ketepatan
             [ Cuba Lagi ]  [ Tukar Aras ]  [ ← Latih Tubi ]
```

- **Back chain is internal:** drill → level picker → drill-card menu (the module hub) →
  (module hub `onBack`) → year hub. App.jsx only needs the **module-hub route**, not one
  route per drill. This keeps `App.jsx` small.
- **Drill screen:** big question (e.g. `7 + 6 = ?`), four tappable answer options, live
  `⏱ 0:47` timer and `Skor: 12`. Correct → instant next + ✓ flash. Wrong → red shake,
  flash the correct answer briefly, continue (clock never stops). At `0:00` → results.
- **High score:** persist with `localStorage` key `mt-latihtubi-{year}-{op}-{level}`.
  Show "🏆 Skor terbaik" and a "Rekod baharu!" badge when beaten.
- **XP/gems:** drills feed the existing gamification per correct answer, same gentle rate
  as quizzes (follow the gamification memory). Keep StatsBar in the top bar.

## 13. Latih Tubi — architecture & files

### 13.1 New shared files (Slice LT-0, built ONCE)

```
src/components/MatematikPage/_shared/
├── LatihTubiDrill.jsx        ★ timed-challenge engine (60s, config-driven, MCQ, high score, results)
├── LatihTubiLevelPicker.jsx  ★ Mudah/Sederhana/Sukar picker showing best scores
└── drills/                   ★ pure range config per operation (no logic)
    ├── ikatan-nombor.js
    ├── tambah.js
    ├── tolak.js
    ├── sifir.js              (darab)
    └── bahagi.js
```

### 13.2 New module hub files (one per year)

```
MatematikPage/Tahun1/Module4_LatihTubi/LatihTubiModule.jsx   ★ cards: Ikatan, Tambah, Tolak
MatematikPage/Tahun2/Module4_LatihTubi/LatihTubiModule.jsx   ★ cards: Tambah, Tolak, Sifir, Bahagi
MatematikPage/Tahun3/Module4_LatihTubi/LatihTubiModule.jsx   ★ cards: Tambah, Tolak, Darab, Bahagi
```

> Each `LatihTubiModule` reuses `Tahun1ModuleHubLayout` (same as the other hubs) for the
> drill-card grid, then owns internal state (`selectedOp → selectedLevel → drilling`) to
> drive `LatihTubiLevelPicker` and `LatihTubiDrill` without leaving the module.

### 13.3 Wiring changes (Slice LT-0)

| File | Change |
|------|--------|
| `MatematikModuleNavBar.jsx` | Add 4th entry to `MT_MODULES`: `{ id:'latih-tubi', num:4, labelBM:'Latih Tubi', labelEN:'Drills', c:'#10B981', cd:'#047857', pg:'linear-gradient(180deg,#D1FAE5 0%,#6EE7B7 50%,#047857 100%)' }`. Change the mobile tab grid from `repeat(3,1fr)` to a **2×2** layout (`repeat(2,1fr)`) so 4 tabs fit on phones. Per-year tab theme still overrides the colour, so the 4th tab matches the year colour automatically. |
| `MatematikHomePage.jsx` | Year-card meta `3 Modul` → `4 Modul`. |
| `App.jsx` | Add module routes `latih-tubi` / `2-latih-tubi` / `3-latih-tubi` → render the year's `LatihTubiModule` inside `MatematikModulePage` (mirror the existing `mod === 'nombor'` branch). Lazy-import the 3 hubs. **No per-drill topic routes.** |

**Latih Tubi module colour (4th):** Emerald — light `#D1FAE5`, mid `#6EE7B7`, dark
`#047857`, accent `#10B981`. (M1 orange · M2 blue · M3 purple · **M4 emerald**.)

## 14. Latih Tubi — Definition of Done (per slice)

- [ ] The **4th "Latih Tubi" tab** appears in the module nav for the year, fits on phone
      (2×2 grid), and opens the drill-card hub.
- [ ] Tapping a drill card shows the **Mudah/Sederhana/Sukar** picker with best scores.
- [ ] Picking a level runs a **60-second timed drill**: live timer + score, auto-advance,
      correct/wrong feedback, clock never pauses.
- [ ] Questions match the **operation + level range** (§12.2) and the **year**.
- [ ] At `0:00` → results with score, **best-score persistence** (localStorage), new-best
      badge, and Cuba Lagi / Tukar Aras / Back.
- [ ] Back chain works internally (drill → picker → hub → year hub); no stuck state.
- [ ] BM & EN both correct; iOS-safe CSS; no console errors; `npm run build` passes.
- [ ] XP/gems update per correct answer consistent with existing gamification.

## 15. Latih Tubi — Status Board

> Same protocol: agent sets row to **🔍** + note; owner promotes to **✅**.

### Slice LT-0 — Foundation (build once)

| # | Task | Status | Note |
|---|------|--------|------|
| LT-0.1 | `LatihTubiDrill.jsx` engine (60s timed, MCQ, high score, results) | ⬜ | |
| LT-0.2 | `LatihTubiLevelPicker.jsx` (Mudah/Sederhana/Sukar + best scores) | ⬜ | |
| LT-0.3 | `drills/*.js` range configs (ikatan, tambah, tolak, sifir, bahagi) | ⬜ | |
| LT-0.4 | Nav 4th tab + 2×2 grid + M4 emerald colour + year-card "4 Modul" | ⬜ | |
| LT-0.5 | App.jsx module routes `latih-tubi` / `2-` / `3-` + lazy imports | ⬜ | |

### Per-year hubs (one slice each)

| # | Year | Hub file | Drill cards | Status | Note |
|---|------|----------|-------------|--------|------|
| LT-1 | Tahun 1 *(PILOT)* | `Tahun1/Module4_LatihTubi/LatihTubiModule.jsx` | Ikatan · Tambah · Tolak | ⬜ | reference impl for drills |
| LT-2 | Tahun 2 | `Tahun2/Module4_LatihTubi/LatihTubiModule.jsx` | Tambah · Tolak · Sifir · Bahagi | ⬜ | |
| LT-3 | Tahun 3 | `Tahun3/Module4_LatihTubi/LatihTubiModule.jsx` | Tambah · Tolak · Darab · Bahagi | ⬜ | |

### Build sequence (Track 2)

1. **Slice LT-0** — foundation (engine + picker + nav/colour/routing). → 🔍
2. **Slice LT-1** — Tahun 1 hub (pilot; locks the drill pattern). → 🔍 → owner verifies.
3. **Slices LT-2, LT-3** — Tahun 2 then Tahun 3, one per slice.
```
