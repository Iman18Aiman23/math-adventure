# 📐 Matematik Tahun 1 — Sub-Topic Re-Modularization + Combination Plan

> **Type:** Planning / build guideline (no code is written by this document)
> **Date:** 2026-06-20 · **Scope:** Tahun 1 (5 modules as supplied by owner)
> **Build model:** Incremental, ONE slice at a time. Build agents **STOP** after each
> slice and mark it **🔍 Pending Verification**; the owner verifies → **✅ Completed**.
> **Status key:** ⬜ Not started · 🔄 In progress · 🔍 Pending verification · ✅ Completed

---

## ⚠️ UI/UX RENDERING CONTRACT — Read Before Every Slice (2026-07-11)

> **Why this exists:** Every new slice that bypassed this contract resulted in a white/plain
> background, non-responsive content, or layout that didn't match previous slices. These rules
> are **mandatory and non-negotiable** for every topic component built in this project.

### CONTRACT A — Background & Shell Wiring

The `MatematikTopicShell` component **automatically renders** `MatematikSceneBackground` —
a light-mode orbit-and-grid backdrop tinted with the module's `--mt-accent` colour.

**Rule 1 — Never add your own background.** Do NOT add a `background` style to the root
`div` of an explore component. The shell provides it. Adding your own background will
paint over or beneath the shared scene.

**Rule 2 — THEME must have `accent`, `dark`, AND `cd`.** The shell injects these as CSS
custom properties (`--mt-accent`, `--mt-dark`, `--mt-cd`). The scene background uses them
for tinting. Missing any one breaks the tint and all `color-mix()` decorations.

```js
// ✅ Correct — all three fields present
const THEME = {
  dark:   '#B45309',
  cd:     '#D97706',
  accent: '#F59E0B',
  // pageGradient, stageGradient, pillGradient only needed for hub cards
};
```

**Rule 3 — Topic page wrapper (`.jsx`) must pass theme to both Shell and Explore.**

```jsx
// ✅ Correct — theme flows from page → shell → scene + explore
<MatematikTopicShell theme={THEME} ... learn={<MatematikExplore config={...} theme={THEME} />} />
```

### CONTRACT B — Layout Inheritance Chain

When `showToggle={false}`, the shell renders `.mt-shell-body-plain`:
```css
.mt-shell-body-plain { flex:1; min-height:0; display:flex; flex-direction:column; }
```
This means the immediate child of `MatematikActivityFrame` (or your explore component) **must
fill its parent height**. The frame already does this correctly via `height:'100%'` on its
root div. Your `renderQuestion` content must NOT set a fixed height or `overflow:hidden` at
its top level — use `flex:1; min-height:0` to fill.

**Rule 4 — `MatematikActivityFrame` root must be `height:'100%'`.**
```jsx
<div style={{ display:'flex', flexDirection:'column', height:'100%', minHeight:0, width:'100%' }}>
  {/* ...frame content... */}
</div>
```
The frame already does this. Any wrapping `div` in your explore component that sits
*between* the shell and the frame must also propagate `flex:1; min-height:0`.

**Rule 5 — Never wrap `MatematikActivityFrame` in a div with `overflow:hidden` or a fixed height.**
These clips the scrollable content area inside the frame.

### CONTRACT C — Responsive Sizing

**Rule 6 — All sizes must use `clamp(min, Nvmin, max)`.** Never use fixed `px` for font
sizes, padding, icon sizes, or gap values on question content. Use `vmin` (not `vw`) so the
component scales correctly in both portrait (phone) and landscape (tablet/desktop).

```css
/* ✅ Correct */
font-size: clamp(16px, 2.8vmin, 28px);
padding: clamp(10px, 1.6vmin, 20px);
gap: clamp(8px, 1.4vmin, 16px);

/* ❌ Wrong — fixed px breaks desktop scaling */
font-size: 18px;
padding: 14px;
```

**Rule 7 — Content must fit one viewport without scrolling on tablet/desktop.**
The `MatematikActivityFrame` manages its own scroll for phones. For the question stage area
(`maf-section-stage`), do NOT add elements so tall they force scrolling on a 768px-tall
screen. Use `clamp()` to shrink on smaller viewports.

### CONTRACT D — The §9 Standard Spec Checklist

Before marking any slice 🔍, check every box:

- [ ] Topic page `.jsx` passes correct `THEME` (accent + dark + cd) to both Shell and Explore
- [ ] Shell config: `showToggle={false}`, `showReadyCta={false}`, `emoji=""`, `titleBM=""`
- [ ] Background is NOT overridden — scene comes from Shell automatically
- [ ] Explore component root div: `height:'100%'`, `display:'flex'`, `flexDirection:'column'`
- [ ] All sizes in `renderQuestion` use `clamp(min, Nvmin, max)` (vmin not vw)
- [ ] No `overflow:hidden` wrapping `MatematikActivityFrame`
- [ ] Pill, desc, ROBOT visual on hub card (§8.5)
- [ ] App.jsx: lazy import + `if (matematikTopic === '...')` route added
- [ ] `npm run build` exit 0; console clean

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

- Do not approve a slice from build output alone.
- Always check the real Matematik question page in the browser, not only a harness or isolated primitive.
- Layout verification includes background scene, content centering, spacing rhythm, and footer alignment on small and large screens.

---

## 0. What the owner asked

1. Restructure the Matematik modules into the granular sub-topic lists supplied.
2. **Check which sub-topics can be combined — combination ONLY within the same module
   (same topik), never across modules.**

This document does the combination analysis and proposes the final structure. It does
**not** build anything. Build agents follow the §0 stop-at-🔍 rule from
`MATEMATIK_LEARN_RESTRUCTURE_PLAN.md`.

---

## 1. Decisions locked by owner (2026-06-20)

### 1.1 Spelling normalisations — ✅ CONFIRMED

| As written | Read as | Module |
|------------|---------|--------|
| `KENALI SIFIR` | **KENALI SIFAR** = the number **0** (confirmed by owner) | 1 |
| `KENALI NILAI TAMPAT` | KENALI NILAI **TEMPAT** | 1 |
| `TMBAH CEPAT` | **TAMBAH** CEPAT | 2 |
| `ROLAK MUDAH` | **TOLAK** MUDAH | 2 |
| `CERIT TAMBAH DAN TOLAK` | **CERITA** TAMBAH DAN TOLAK | 2 |

### 1.2 The recurring trio = the standard module footer — ✅ CONFIRMED

**`SELESAIKAN`, `LATIH DIRI`, `CABAR MINDA` appear at the end of every module.** They are
**not** content topics and are **not combinable** — three fixed "assessment" cards every
module ends with:

| Footer card | Function | Maps to |
|-------------|----------|---------|
| **SELESAIKAN** | Penyelesaian masalah / word-problem quiz | the topic **Kuiz** (Track 1) |
| **LATIH DIRI** | Timed, leveled self-drill | **Latih Tubi** drill (Track 2) |
| **CABAR MINDA** | Harder mixed challenge | new **Cabaran** tier (challenge mode) |

Per module: **[ Belajar cards ] → Selesaikan (Kuiz) → Latih Diri (Drill) → Cabar Minda
(Challenge).**

> **Owner decision:** **BOTH exist** — the per-module **Latih Diri** card *and* the
> separate global **Latih Tubi** module tab (Track 2). They share the same drill engine:
> Latih Diri = that module's drill; the Latih Tubi tab = the cross-module drill hub.

### 1.3 Scope — ✅ CONFIRMED

Tahun 1 first (this document). **Tahun 2 & Tahun 3 get the same sub-topic + combination
treatment later**, as separate slices, reusing whatever this T1 build establishes.

---

## 2. Combination analysis (within-module only)

Legend: ✅ Strong (do it) · 🟡 Optional (owner's call) · ➖ keep standalone.
Footer trio (Selesaikan / Latih Diri / Cabar Minda) is omitted from the counts below — it
is always present and never combined.

### Module 1 — NOMBOR HINGGA 100  (14 content cards → 10) — ✅ per owner

Owner's rule: separate "recognise" (Kenali) from "write" (Tulis); group the Tulis
activities together; merge the two quantity-comparison intros; keep ordering separate.

| # | Combine | Into | Why | Status |
|---|---------|------|-----|--------|
| C1 | Kenali Sifar **+** Kenali 1–10 | **Kenali 0 hingga 10** | Sifar (0) belongs with recognising 1–10 | ✅ |
| C2 | Tulis 0–10 **+** Tulis 11–20 | **Tulis 0 hingga 20** | Owner: group the writing activities together | ✅ owner |
| C3 | Banyak dan Sedikit **+** Lebih atau Kurang | **Banyak, Sedikit, Lebih atau Kurang** | Owner: both are quantity comparison | ✅ owner |
| C4 | Kenali Anggaran **+** Kenali Bundar | **Anggar & Bundar** | KSSR teaches estimate → round to nearest ten together | ✅ |
| — | Kenali 11 hingga 20 | — | Recognition range kept separate (Tulis pulled out) | ➖ |
| — | Susunan Nombor | — | **Owner: keep ordering separate** from Lebih/Kurang | ➖ |
| — | Kombinasi Nombor | — | Number bonds — distinct skill | ➖ |
| — | Kenali 21 hingga 100 | — | Large-range recognition; its own card | ➖ |
| — | Nilai Tempat dan Nilai Digit | — | Already a sensible combined card | ➖ |
| — | Pola Nombor | — | Pattern skill — distinct | ➖ |

**Resulting Belajar cards (10):** Banyak, Sedikit, Lebih atau Kurang · Kenali 0 hingga 10 ·
Kenali 11 hingga 20 · Tulis 0 hingga 20 · Kombinasi Nombor · Kenali 21 hingga 100 · Nilai
Tempat & Nilai Digit · Susunan Nombor · Pola Nombor · Anggar & Bundar.

### Module 2 — TAMBAH DAN TOLAK  (11 content cards → 6)

| # | Combine | Into | Why | Strength |
|---|---------|------|-----|----------|
| C1 | Tambah Cepat **+** Tambah Mudah **+** Tambah Lagi | **Latihan Tambah** (levels: Mudah / Sederhana / Sukar) | All three are the *same* skill at different difficulty — perfect for tiered levels | ✅ |
| C2 | Tolak Cepat **+** Tolak Mudah **+** Tolak Lagi | **Latihan Tolak** (levels: Mudah / Sederhana / Sukar) | Same as C1 for subtraction | ✅ |
| C3 | Tambah Berulang **+** Tolak Berturut-turut | **Tambah Berulang & Tolak Berturut** | Both are "repeated operation" — the bridge to ×/÷, taught as a pair | ✅ owner |
| — | Kenali Tambah | — | Addition concept intro (Belajar) | ➖ |
| — | Kenali Tolak | — | Subtraction concept intro (Belajar) | ➖ |
| — | Cerita Tambah dan Tolak | — | Already combined (word problems for both) | ➖ |

> **Note on "Cepat":** "Cepat/Mudah/Lagi" mix *speed* and *difficulty*. Recommended:
> treat **Mudah → Sederhana → Sukar** as the three levels, and offer **Cepat** as a
> *timed mode toggle* inside Latihan Tambah/Tolak (reuses the Latih Tubi 60-second timer).

**Resulting Belajar/practice cards (6):** Kenali Tambah · Latihan Tambah · Kenali Tolak ·
Latihan Tolak · Cerita Tambah & Tolak · Tambah Berulang & Tolak Berturut.

### Module 3 — PECAHAN  (1 content card → 1)

| Card | Action |
|------|--------|
| Kenali Pecahan | ➖ standalone — nothing to combine |

Only one content card + the footer trio. (Confirms the trio is universal.)

### Module 4 — WANG  (4 content cards → 3)

| # | Combine | Into | Why | Strength |
|---|---------|------|-----|----------|
| C1 | Kenali Wang **+** Nilai Wang | **Kenali & Nilai Wang** | Recognising coins/notes and knowing their value are taught together | ✅ |
| — | Tukar Wang | — | Making equivalent amounts — distinct | ➖ |
| — | Dapat Wang dan Catat Wang | — | Already combined (earn + record) | ➖ |

**Resulting cards (3):** Kenali & Nilai Wang · Tukar Wang · Dapat & Catat Wang.

### Module 5 — MASA DAN WAKTU  (4 content cards → 3)

| # | Combine | Into | Why | Strength |
|---|---------|------|-----|----------|
| C1 | Kenali Jam dan Waktu **+** Sebut dan Tulis Waktu | **Baca, Sebut & Tulis Waktu** | Reading the clock then saying/writing the time is one continuous skill | ✅ |
| — | Kenali Waktu | — | Parts of the day (pagi/tengah hari/petang/malam) — the gentle intro; keep separate | ➖ |
| — | Kenali Hari, Minggu dan Bulan | — | Calendar (already combined) — distinct from clock | ➖ |

**Resulting cards (3):** Kenali Waktu · Baca, Sebut & Tulis Waktu · Hari, Minggu & Bulan.

---

## 3. Proposed final Tahun 1 structure (after combinations)

Each module = **Belajar cards** + the fixed **footer trio**.

| Module | Belajar cards (combined) | Footer (always) |
|--------|--------------------------|-----------------|
| **1. Nombor Hingga 100** | Banyak, Sedikit, Lebih atau Kurang · Kenali 0 hingga 10 · Kenali 11 hingga 20 · Tulis 0 hingga 20 · Kombinasi Nombor · Kenali 21 hingga 100 · Nilai Tempat & Nilai Digit · Susunan Nombor · Pola Nombor · Anggar & Bundar | Selesaikan · Latih Diri · Cabar Minda |
| **2. Tambah dan Tolak** | Kenali Tambah · Latihan Tambah · Kenali Tolak · Latihan Tolak · Cerita Tambah & Tolak · Tambah Berulang & Tolak Berturut | Selesaikan · Latih Diri · Cabar Minda |
| **3. Pecahan** | Kenali Pecahan | Selesaikan · Latih Diri · Cabar Minda |
| **4. Wang** | Kenali & Nilai Wang · Tukar Wang · Dapat & Catat Wang | Selesaikan · Latih Diri · Cabar Minda |
| **5. Masa dan Waktu** | Kenali Waktu · Baca, Sebut & Tulis Waktu · Hari, Minggu & Bulan | Selesaikan · Latih Diri · Cabar Minda |

**Card-count reduction from combinations:**

| Module | Content (as listed) | After combine | Saved |
|--------|--------------------|---------------|-------|
| 1 Nombor Hingga 100 | 14 | 10 | −4 |
| 2 Tambah dan Tolak | 11 | 6 | −5 |
| 3 Pecahan | 1 | 1 | 0 |
| 4 Wang | 4 | 3 | −1 |
| 5 Masa dan Waktu | 4 | 3 | −1 |
| **Total** | **34** | **23** | **−11** |

(Plus the 3-card footer trio per module, unchanged.)

---

## 4. How this maps onto the existing Matematik architecture

- **Modules:** ✅ **Owner: these 5 modules are the complete new Tahun 1 tab layout,
  replacing today's Nombor / Sukatan / Statistik.** So the T1 nav becomes **5 tabs**:
  Nombor Hingga 100 · Tambah dan Tolak · Pecahan · Wang · Masa dan Waktu. The old
  Nombor & Operasi splits into the first four; **Masa** is pulled out of Sukatan into its
  own tab. `MatematikModuleNavBar` `MT_MODULES`, the `MatematikHomePage` "N Modul" meta,
  the colour system (5 module colours), and the mobile tab grid (5 tabs → e.g. 3+2 or
  scroll) all change. *(T2/T3 keep their current tabs until they get the same treatment.)*

  > ✅ **COVERAGE — owner decision (2026-06-20): DROP them.** Tahun 1 is intentionally just
  > these 5 modules. The old T1 **Ukuran** (`UkurPanjang`, `Jisim`, `IsiPaduCecair`),
  > **Ruang/Bentuk** (`Bentuk3D`), and **Statistik/Piktograf** (`BacaPictograph`) are
  > **removed from the Tahun 1 Matematik-KSSR nav and topic routing**.
  >
  > **DO NOT DELETE the game files.** Those components are still used by the age-group
  > `'math'` routes (Grade 1 screens reference them via CURRICULUM data IDs). The build
  > only: (1) removes them from the T1 `MT_MODULES` nav + the old `sukatan`/`statistik`
  > module hubs, and (2) removes their `matematik-kssr` T1 topic routes
  > (`ukuran-t1-*`, `ruang-t1`, `data-t1`) from `App.jsx`. The files, their lazy imports
  > used by age-group routes, and T2/T3 routing stay untouched. If a route/hub is now
  > fully unused after this, leave the file in place and note it — do not git-rm.
- **Belajar cards:** each combined sub-topic is one interactive-explore card, built with
  the shared `MatematikExplore` engine + a primitive (see the main restructure plan §3).
- **Selesaikan / Latih Diri / Cabar Minda:** reuse Track 1 Kuiz, Track 2 Latih Tubi
  drill, and a new Cabaran tier respectively. Existing T1 quizzes (`Nombor100`,
  `Tambah100`, etc.) become the **Selesaikan** card content where they fit.

---

## 5. Build sequence (revised per owner — nav foundation first, then Module 1 card-by-card)

**Order rationale:** the 5-tab nav is a prerequisite for every module, so it is built
first as its own slice. Then we build **Module 1 (Nombor Hingga 100) one Belajar card per
slice, in curriculum order** — the highest-value module and the original motivation. The
**first card doubles as the pilot** that proves the shared shell on real content, so we
still de-risk the framework on a single card (not all 10 at once) without detouring to a
different module.

1. **Slice 0 — Nav foundation + shared shell.**
   - Rebuild `MT_MODULES` → the **5 new tabs** (Nombor Hingga 100 · Tambah dan Tolak ·
     Pecahan · Wang · Masa dan Waktu), with 5 module colours and a phone-friendly tab grid.
   - **Drop** old T1 Ukuran/Ruang/Statistik from the T1 nav + their `matematik-kssr` T1
     topic routes (`ukuran-t1-*`, `ruang-t1`, `data-t1`). **Do not delete files** (§4).
   - Update `MatematikHomePage` meta → "5 Modul".
   - Build the shared `MatematikTopicShell` + `MatematikExplore` engine + footer-trio
     wiring (Selesaikan / Latih Diri / Cabar Minda scaffolding, reusing the Track 2 drill
     engine). Empty module hubs are fine — cards arrive in later slices. → 🔍
2. **Slices 1.1 … 1.10 — Module 1 “Nombor Hingga 100”, ONE Belajar card per slice**, in
   the order in §6. **Slice 1.1 is the pilot** — it proves the shell end-to-end; keep it
   simple and get it verified before 1.2. → 🔍 each.
3. **Slice 1.F — Module 1 footer trio:** Selesaikan (reuse the existing `Nombor100` quiz),
   Latih Diri (timed leveled drill), Cabar Minda (harder challenge). May split into 3
   sub-slices if large. → 🔍.
4. **Modules 2 → 3 → 4 → 5** in listed order, each built the same way (Belajar cards
   one-per-slice, then its footer trio).

Within every slice: build, run `npm run build`, set the §6 row to **🔍**, summarise, and
**stop**. Never start the next slice yourself.

---

## 6. Status Board

> Agent sets row to **🔍** + note; owner promotes to **✅**. "Cards" = combined Belajar
> cards (footer trio assumed in every module).

**Foundation**

| Slice | What | Status | Note |
|-------|------|--------|------|
| 0 | 5-tab nav + drop old tabs/routes (no file delete) + homepage "5 Modul" + shared `MatematikTopicShell`/`MatematikExplore`/footer scaffolding | ✅ | **Verified by owner-agent 2026-06-20** vs DoD: MT_MODULES split T1(5)/T2T3(3); old `ukuran-t1-*`/`ruang-t1`/`data-t1` routes removed; dropped games still imported+used by age routes (not deleted); homepage "5 Modul"; footer trio renders; build exit 0. Nits (fix later): redundant `tabCount===5?3:3` ternary; orphaned old T1 hubs + topic routes (`nombor-100`, `tambah-tolak`, `wang-t1`, `masa-t1`) still in App.jsx — remove when new cards replace them. |

**Module 1 — Nombor Hingga 100 (10 Belajar cards, one per slice, in order)**

| Slice | Belajar card | Primitive (est.) | Status | Note |
|-------|--------------|------------------|--------|------|
| 1.1 | Banyak, Sedikit, Lebih atau Kurang | Compare (tick-box Q) | ✅ | **Reworked per owner 2026-06-20 (code+build, §8.2 revised):** Belajar = tick-the-correct-group questions (5 types incl sama-banyak reference form); prompt card + 🔊; ✓/✗ feedback; "Seterusnya →" (enabled after answering); removed ⚖️ emoji + subtitle + mode chips + Ready CTA; Malay only; shared ROBOT card + chip BANYAK DAN SEDIKIT; build exit 0. Decisions to confirm: (a) sama-banyak uses a reference group (vs Ya/Tidak); (b) Seterusnya gated on answering; (c) shell Back-from-Kuiz → hub not Belajar (toggle works). |
| 1.2 | Kenali 0 hingga 10 | Bilang+KenalNombor+Sifar | ✅ | **Verified 2026-06-20 (code+build) vs §10.5:** shared `MatematikActivityFrame` extracted (good); round 4 Bilang + 3 Kenal Nombor + 3 Kenali Sifar; Bilang options numeral/word; Kenali Sifar "Yang manakah sifar?" + empty dashed tray; zero = dashed tray (no 🍽️); §9 chrome; build exit 0; 1.1 not regressed. Count-reveal fixed: KenalNombor & Sifar boxes are empty until answered (child must count), then flip ✓/✗. |
| 1.3 | Kenali 11 hingga 20 | Bilang+KenalNombor | ✅ | **Verified 2026-06-20 (code+build):** config refactor `{min,max,bilang,kenal,sifar}`; 1.2 explicit `{0,10,4,3,3}` = unchanged; 1.3 `{11,20,5,5,0}` (5 Bilang + 5 Kenal Nombor, no Sifar); range 11–20 in all gens; ten-frame (rows of 5 + gap after 10) for >10; BM words 0–20; word options 2-across no-clip; boxes empty until answered; topic page §9; route + live hub card; build exit 0; 1.1/1.2 not regressed. |
| 1.4 | Tulis 0 hingga 20 | Trace/Write | ✅ | **Verified 2026-06-20 (code+build, §9.9):** numberPaths.js digits 0–9 authored + visually fixed via headless-Edge render (2/3/5/6/8/9 reworked; owner refined 3/5) — all render clean, no clip; NumberTraceLesson mirrors LetterTraceLesson (amber); 0–20 each traced on a SINGLE card (owner 2026-06-21: two-digit numbers like 10/14/20 show both digits side by side via `getNumberGlyph`, not split into Digit1/Digit2); numToBM TTS ms-MY; per-glyph confetti + "Tahniah!" completion (Cuba Lagi/Kembali/Topik Seterusnya); reuses TraceCanvas; topic page + route + live hub card; build exit 0. Trace card = no tick-quiz frame/footer (correct). |
| 1.5 | Kombinasi Nombor | Kombinasi (bonds) | ✅ | **Verified 2026-06-20 (code+build) vs §11.4:** round 4 Jumlah + 3 Lengkapkan + 3 Jadikan 10; whole ≤10; Jumlah=two groups+dan, Lengkapkan="A dan ? ialah C"+chip, Jadikan10=2×5 ten-frame; 4 numeral options ✓/✗ + confetti; §9 chrome via frame; topic page §9; live hub card; build exit 0; 1.1–1.4 not regressed. |
| 1.6 | Kenali 21 hingga 100 | Bilang+Word↔Num | ✅ | **Verified 2026-06-21 (code+build) vs §12.5:** Kenali21Hingga100Explore on frame; round (owner 2026-06-21) 2 Susun Perkataan (word-ordering builder, Aktiviti 5) + 3 Tulis Angka (KEYPAD+keyboard, Aktiviti 4) + 2 Bilang (wide spaced tens-box) + 3 Angka→Perkataan; tick options capped at 3; numToBM 21–100 + seratus; distractors digit-swap/±10/±1; word options stacked 1-col nowrap (no clip); **Bilang tens+ones visual fixed by me** (was loose pile → now rows-of-ten box + ones, countable, responsive, verified at 360px); topic page §9 + route + live hub card; build exit 0; 1.1–1.5 not regressed. Abacus (Aktiviti 6) deferred to 1.7. |
| 1.7 | Nilai Tempat & Nilai Digit | PlaceValue (keyin + pick place) | ✅ | **Verified 2026-06-21 (code+build) vs §13.4:** round 5 Bilang&Tulis + 5 Nilai Tempat; BilangTulis = TensOnesGrid + PULUH/SA boxes (active highlight) + keypad **+ keyboard**, auto-advance + auto-submit, wrong shows decomposition (n 10–99); NilaiTempat = up-to-3-digit, underlined digit bold-red-bigger-underline, 3 opts Ratus/Puluh/Sa mapped by pos-from-right; topic page §9 + route + live hub card; build exit 0; 1.1–1.6 not regressed. |
| 1.8 | Susunan Nombor | Order | ✅ | **Verified 2026-06-21 (Claude):** 4 types (3 Susun+2 Jiran+3 Lengkapkan+2 Sambung Titik = round 10); Susun tap-to-order (asc/desc) + undo + auto-check; Jiran/Lengkapkan keypad+keyboard (submit only ✓/Enter, no auto-submit confirmed); Sambung Titik SVG dot-to-dot (advances only on next-expected dot, `[done]` effect transition-safe); generators bounded 1–100; live hub card pill `SUSUNAN NOMBOR` desc 6 words; §9 chrome (showToggle/showReadyCta false); lazy-routed; build exit 0. |
| 1.9 | Pola Nombor | Pattern | ✅ | **Built + verified 2026-06-21 (Claude):** PolaNomborExplore, 4 types (3 Berulang-seterusnya + 2 Berulang-lengkap via NumOptionsGrid; 3 Bilang-lengkap via keypad reuse; 2 Bilang-terang rule-pick via WordOptionsGrid = round 10). New PolaSeqTiles read-only sequence row. Generators bounded 1–100, invariants asserted over 20k iters (cyclic answers, internal gaps, exactly-one-correct, 4 unique rule options). Wired: PolaNombor.jsx (§9), App.jsx lazy route, MatematikExplore case, hub card pill `POLA NOMBOR` desc 6 words. Build exit 0; visual confirmed via headless-Edge. |
| 1.10 | Anggar & Bundar | Estimate/Round | ✅ | **Built + verified 2026-06-21 (Claude), image-grounded p59–62:** AnggarBundarExplore, 4 types — 3 Anggar lebih/kurang daripada (WordOptions) + 2 Anggar lebih-kurang nearest-ten (NumOptions) + 2 Bundar garis nombor (new SVG NumberLine + 2 tens) + 3 Bundar pilih (big number + 4 tens) = round 10 (Anggar 5 / Bundar 5). Rounding = nearest ten, 5→UP (Math.round). Invariants + workbook spot-checks (25→30, 55→60, 95→100, 24→20…) asserted over 30k iters. Wired: AnggarBundar.jsx (§9), App.jsx lazy route, MatematikExplore case, hub pill `ANGGAR & BUNDAR`. Build exit 0; visuals confirmed via headless-Edge. **Module 1 COMPLETE (10/10 Belajar cards).** |
| 1.F | Footer: Selesaikan · Latih Diri · Cabar Minda | image-grounded p63–68; split into 3 | ✅ | **(a) Selesaikan ✅ built+verified 2026-06-21 (Claude), p63–66:** SelesaikanExplore, round 10 = 3 Banding (paling kecil/besar, 4 cards) + 2 Bina (2-digit terkecil/terbesar from 2 digit cards, keypad) + 3 Cerita (+/− word problems: beli lagi / diberi / lebih daripada, keypad) + 2 Bundar (which of 4 cards rounds to T). Invariants over 30k iters (compare target, bina min/max, story results 1–100, exactly-one-rounds-to-T). FooterTrio now clickable per-item (`is-enabled`); Selesaikan.jsx (§9), App route, MatematikExplore case wired; build exit 0; long story+keypad fits single page (headless-Edge). **(b) Latih Diri ✅ built+verified 2026-06-21 (Claude), p67 station path:** LatihDiriExplore, round 10 = 2 each — Perkataan→Angka (numToBM word, digit-reversed distractor) · Berapa (count objects) · Lebih besar daripada N (exactly one option >N) · Lengkapkan pola (skip-count MC, reuses PolaTilesContent) · Bundar (reuses BundarPilihContent). All multiple-choice (fast drill). Invariants over 30k iters. Footer card enabled; LatihDiri.jsx (§9), App route, MatematikExplore case wired; build exit 0. **(c) Cabar Minda ✅ built+verified 2026-06-21 (Claude), p68:** CabarMindaExplore, round 10 = 2 each — Di antara (exactly one option strictly inside L..H) · Nilai digit/place value (exactly one option with digit in tens place) · Bundar forward · Reverse-round (which→T) · Lengkapkan (steps 2/3/5/10). Invariants over 40k iters. Footer card enabled; CabarMinda.jsx (§9), App route, MatematikExplore case wired; build exit 0. **Slice 1.F COMPLETE — all 3 footer items live. MODULE 1 FULLY COMPLETE (10 Belajar + 3 footer trio).** |

**Modules 2–5 (expand into card-by-card slices when reached)**

| Module | Belajar cards | Status | Note |
|--------|---------------|--------|------|
| 2 · Tambah dan Tolak | 6 (incl. leveled Latihan Tambah/Tolak) | ✅ | **Slice 2.6 Tambah Berulang & Tolak Berturut ✅ built+verified 2026-06-24:** TambahBerulangExplore, round 10 = 3 Type A (Kira Kumpulan — N groups of M emoji, answer N×M) + 2 Type B (SVG number line N forward arcs +M, answer N×M) + 2 Type C (Lengkapkan satu tempat kosong dalam ayat tambah berulang, answer M) + 2 Type D (Tolak Berturut Kumpulan — objects in N groups + repeated subtraction sentence, answer 0) + 1 Type E (SVG number line N backward arcs −M, answer 0). Generators constrained N∈{2,3,4,5}, M∈{2,3,4,5,10}, N×M≤50; invariants asserted over 20k iters. Hub card 6th: pill `TAMBAH BERULANG & TOLAK BERTURUT`, ROBOT visual. TambahBerulang.jsx (§9 showToggle false, showReadyCta false, no banner). Blue Mod-2 theme. Wired: App.jsx lazy route + MT_MODULE2_ORDER append, MatematikExplore case. Build exit 0. **2.1 Kenali Tambah ✅ verified 2026-06-22 (Claude), §17, p69–74:**** KenaliTambahExplore, round 10 = 3 Gabung Kumpulan (objects + KeypadInput) + 2 Garis Nombor (new SVG NumberTrackAdd count-on jumps) + 2 Pilih Perkataan (add-word vs sub-word, WordOptionsGrid) + 3 Lengkapkan Ayat (a+b=? / a+?=c, keypad). Addends 0–9, sums ≤18; invariants over 40k iters. New shared **KeypadInput** extracted (submit only ✓/Enter, no auto-submit). Blue Module-2 theme; KenaliTambah.jsx (§9), App route + **MT_MODULE2_ORDER + nav lookup picks the module array holding current topic** (80% gate + advance work), MatematikExplore case, hub placeholder replaced (pill `KENALI TAMBAH`). Scene bg inherits. Build exit 0. **2.2 Latihan Tambah ✅ verified 2026-06-22 (Claude), §18, p75–87:** LatihanTambahExplore — level picker (Mudah/Sederhana/Sukar, `Tukar Aras ⟲` strip) → per-level round of 10. Mudah 6 `a+b=?`(≤18)+4 which-equals-target (WordOptionsGrid, exactly 1 correct); Sederhana 6 column add (new `VerticalSum`)+4 missing-addend, ALL no-carry; Sukar 6 column+4 missing-addend, ALL need-carry; sums ≤99; KeypadInput. Invariants 40k iters × 6 gens all pass; level picker + VerticalSum + chips visually verified (headless-Edge). Wired: LatihanTambah.jsx (§9), App route + MT_MODULE2_ORDER append, MatematikExplore case, hub card `LATIHAN TAMBAH`. Cepat/timed deferred to Latih Tubi. Build exit 0; no regression. **VARIETY RETROFIT 2026-06-23 (owner: cards too samey/keypad-heavy): each level now uses 4 distinct formats — 4 new widgets Warnai (tap-all multi-select), Padankan (tap-two-sum), Bina Blok (base-ten puluh/sa builder), Ikatan Nombor (number-bond). Keypad ≤2/10. New gens invariants 40k iters pass; widgets visually verified; build exit 0.** **2.3 Kenali Tolak ✅ verified 2026-06-23 (Claude), §17 mirror:** KenaliTolakExplore, round 10 = 3 Buang Kumpulan (objects with `b` crossed-out + KeypadInput) + 2 Garis Nombor (new SVG NumberTrackSub count-BACK jumps) + 2 Pilih Perkataan (subtraction word {Baki/Beza/Tinggal/Tolak} vs addition distractor, WordOptionsGrid) + 3 Lengkapkan Ayat (a−b=? / a−?=c, keypad). a≥b enforced everywhere → baki≥0; minuend ≤9. Blue Module-2 theme; KenaliTolak.jsx (§9), App lazy route + MT_MODULE2_ORDER append, MatematikExplore case, hub card (pill `KENALI TOLAK`). Build exit 0; no regression. **2.4 Latihan Tolak ✅ verified 2026-06-23 (Claude), §18 mirror:** LatihanTolakExplore — level picker → per-level round of 10. Mudah 2 keypad `a−b=?` + 3 Warnai (beza-N, exactly 1 correct) + 3 Padankan (`{given}−?={target}`) + 2 Bond; Sederhana 2 column (new `VerticalDiff`) + 3 Bina Blok (TolakBlok) + 3 Padankan + 2 Bond; Sukar 2 column + 3 Bina Blok + 3 Bond + 2 Padankan. Sukar borrow guaranteed; all answers ≥0. **⚠️ Verifier fix:** `genSederhanaTolakS1` leaked ~15.5% borrow-required problems (bOnes unconstrained when bTens<aTens) → constrained `bOnes=randInt(0,aOnes)` so NO-borrow is now guaranteed (0 borrow / 0 negative over 300k iters). Wired: LatihanTolak.jsx (§9), App route + MT_MODULE2_ORDER append, MatematikExplore case, hub card `LATIHAN TOLAK`. Cepat/timed deferred to Latih Tubi. Build exit 0; no regression. **Polish 2026-06-23 (owner):** (1) zero/trivial answers removed across 2.3+2.4 subtraction gens (no `a−a=0`, no `b=0` no-ops; 0% over 300k iters); (2) `VerticalDiff` leading-zero grading bug fixed (`"02"`→`"2"` via parseInt); (3) **borrow scaffolding ported into `VerticalDiff` from `ColumnMathGame`** — Sukar borrow problems now gate submit until the child taps the tens digit and answers the "Pinjam dari rumah sebelah — {tens}−1=?" mini-step (strike lender + show ones as +10); single ones→tens borrow always sufficient since `bTens≤aTens−1`; no-borrow problems unaffected; also added `q.qid` reset effect (fixes stale-digit reuse on consecutive same-type Qs). Build exit 0. **2.5 Cerita Tambah & Tolak ✅ built+verified 2026-06-23 (Claude):** CeritaTambahTolakExplore, round 10 = 3× Type A (Cerita Tambah, keypad) + 3× Type B (Cerita Tolak, keypad) + 2× Type C (Kenalpasti Operasi, Tambah/Tolak MC) + 2× Type D (Padankan Ayat Matematik, 3-opt equation MC). StoryText shows blank replaced by answer after answering Type A/B. Type C guarantees 1 Add + 1 Sub per round; Type D same (wrong op + wrong answer distractors). Blue M2 theme. Wired: CeritaTambahDanTolak.jsx (§9), App lazy route + MT_MODULE2_ORDER append, MatematikExplore case, hub card 5th topic (pill `CERITA TAMBAH & TOLAK`). Build exit 0; no regression. **Slice 2.F Footer ✅ COMPLETE. MODULE 2 FULLY COMPLETE (6 Belajar + 3 footer trio).** |
| 3 · Pecahan | 1 | ✅ | **Verified 2026-07-12:** PecahanModule shows 4 live cards (Kenali Pecahan, Jawab Pecahan, Latih Tubi Pecahan, Ujian Pecahan). Runtime check on the real app passed: module hub loads, all 4 cards open from the hub, Kenali mounts via `KenaliPecahanExplore`, Jawab Pecahan mounts its custom `MatematikActivityFrame` flow, Latih Diri mounts via `LatihDiriPecahanExplore`, and Ujian reaches the 30-soalan pre-start screen via `CabarMindaPecahanExplore`. `npm run build` passes. **MODULE 3 COMPLETE (1 Belajar + 3 footer trio).** |
| 4 · Wang | 3 | ✅ | **Slice 4.1 verified 2026-07-12:** KenaliNilaiWangExplore is live in `explore_T1_4.jsx` with the final `Q1–Q5` rule: each session randomly picks 2 question types from `Q1` `Yang manakah {value}?`, `Q2` `Yang manakah {value}?`, `Q3` `Berapa jumlah wang ini?`, `Q4` `Mana lebih kecil?`, `Q5` `Mana lebih besar?`, then builds a 10-question round from those 2 types. `Q1/Q2` use no main card visual and 4 answer options; duplicate prompt rendering was removed so question text appears once. Money SVGs cover 5/10/20/50 sen + RM1/RM5/RM10. KenaliNilaiWang.jsx topic page (§9), WangModule live hub card, App.jsx lazy import/route/`MT_MODULE4_ORDER`, and MatematikExplore entry are all wired. Owner verified runtime correct; build passes. Remaining Module 4 cards stay pending.<br>**Slice 4.2 verified 2026-07-12:** TukarWangExplore in `explore_T1_4.jsx` uses the locked `4× Type A + 3× Type B + 3× Type C` round. Type C now shows one complete money representation on screen and asks for a different but equivalent representation, so it matches the `Pilih cara lain` spec. Uses `MatematikActivityFrame`, shared MoneyVisual, `TukarWang.jsx` (§9 shell), live WangModule card, `MatematikExplore` primitive, and App.jsx lazy route + `MT_MODULE4_ORDER`. Build exit 0. **Slice 4.2 COMPLETE.**<br>**Slice 4.3 verified 2026-07-13:** `DapatCatatWangExplore` in `explore_T1_4.jsx` keeps the locked round split `4× Type A + 3× Type B + 3× Type C`. Real-app runtime check passed on desktop and mobile from the actual Wang hub: topic opens, question screen stays single-screen (`.maf-scroll` clientHeight matched scrollHeight in both viewports), answer flow reveals feedback + `Seterusnya`, and no page exceptions fired. Shared Module 4 money labels were normalized at source to the consistent format `5 sen` / `50 sen` / `RM1` / `RM5` / `RM10` via `formatMoney()` + `DENOMS`, so recording text now matches §22.5. `DapatCatatWang.jsx` shell, WangModule live hub card, `MatematikExplore` primitive, App.jsx lazy route + `MT_MODULE4_ORDER` all remain wired. Build exit 0. **Slice 4.3 COMPLETE.**<br>**Slice 4.F built 2026-07-14:** SelesaikanWang, LatihDiriWang, CabarMindaWang shell pages created in `Module4_Wang/`. Explore exports in `explore_T1_4.jsx` (SelesaikanWangExplore, LatihDiriWangExplore, CabarMindaWangExplore). Primitive entries in `MatematikExplore.jsx`. Lazy imports + routes + `MT_MODULE4_ORDER` in `App.jsx`. WangModule hub cards replaced from disabled placeholders to active footer cards (selesaikan-wang, latih-diri-wang, cabar-minda-wang). Build exit 0 (3 new chunks generated). **Slice 4.F verified 2026-07-14:** Runtime smoke passed from the real Wang hub on desktop (1094x768) and mobile (390x844): Selesaikan Wang and Latih Diri Wang load active question screens with no overflow, Ujian Wang intro is single-screen/non-scrolling, Mula Ujian enters question 1/30, no error boundary or page exceptions. Build exit 0 after fixing the missing React hook imports in `explore_T1_4.jsx`. **Slice 4.F COMPLETE.** |
| 5 · Masa dan Waktu | 3 | ⬜ | + footer |

### Open decisions

1. ✅ **§1.1 typos** — confirmed (Sifar = 0).
2. ✅ **§1.2 trio** — confirmed; **both** per-module Latih Diri *and* the separate Latih
   Tubi tab exist (shared drill engine).
3. ✅ **§1.3 scope** — T1 now; T2 & T3 same treatment later.
4. ✅ **Module 2 C3** — combined (Tambah Berulang & Tolak Berturut). Module 1: keep Susunan
   separate; merge Banyak/Sedikit with Lebih/Kurang.
5. ✅ **§4 module set** — 5 modules **replace** today's Nombor/Sukatan/Statistik (T1 nav =
   5 tabs).
6. ✅ **§4 coverage** — **DROP** the old T1 Ukuran / Ruang/Bentuk / Statistik from the T1
   nav + topic routing. **Files are NOT deleted** (still used by age-group `'math'`
   routes). All open decisions resolved — plan is build-ready.

## 7. Definition of Done (per module slice)

- [ ] Module tab opens a hub showing the **combined Belajar cards** (per §3) + the
      **Selesaikan / Latih Diri / Cabar Minda** footer.
- [ ] Each Belajar card is interactive, matches its (combined) sub-topic, BM/EN, TTS with
      ms-MY→id-* fallback, no XP, audio stops on navigate.
- [ ] **Selesaikan** = working problem-solving quiz; **Latih Diri** = timed leveled drill
      (Mudah/Sederhana/Sukar, best score saved); **Cabar Minda** = harder challenge.
- [ ] Back chain coherent; iOS-safe CSS; lazy-loading intact; `npm run build` passes;
      console clean.
- [ ] Nav/`MT_MODULES`/homepage "N Modul" meta updated if this slice adds a module tab.

---

## 8. Card spec — Slice 1.1 "Banyak, Sedikit, Lebih atau Kurang" (image-grounded)

> Grounded in the KSSR Tahun 1 workbook pages (Nombor Hingga 100 → Banyak dan Sedikit,
> Aktiviti 1–5) the owner supplied. This is the **pilot card** that first exercises the
> shared `MatematikTopicShell` + `MatematikExplore`. Build the **Belajar** explore now;
> the graded Aktiviti formats are mapped to Kuiz/Selesaikan for Slice 1.F (don't build
> those here).

### 8.1 The six target words (the whole point of the card)

| Word (BM) | EN | Meaning shown |
|-----------|-----|---------------|
| **banyak** | many / a lot | the group with the larger count |
| **sedikit** | few | the group with the smaller count |
| **lebih** | more | one group has more than the other |
| **kurang** | less / fewer | one group has fewer than the other |
| **sama banyak** | same amount (equal) | both groups have the **same** count |
| **tidak sama banyak** | not the same (unequal) | the counts **differ** |

Every word is always tied to a **visible, countable quantity** — never abstract.

### 8.2 Belajar = tick-the-correct-group questions (REVISED per owner 2026-06-20)

Modelled on the workbook **Aktiviti 1** ("Tandakan ✓ kumpulan yang banyak"). The Belajar
phase is **not** a free explore — it is a sequence of **questions** where the child reads
the question and taps the **tick box** under the correct group. **Malay only** (never
Indonesian text).

**Per question:**
- A prominent **question card** at the top (the question itself, e.g. *"Yang manakah
  banyak?"*) with a small **🔊** button to hear it. *(No "Ketik kumpulan…" hint line.)*
- **Two option groups** side by side, each = objects + a **tick box (□)** underneath.
- Tap a group/box → marks it: correct box → green ✓, wrong box → red ✗ (and the correct
  one shows green ✓). Feedback line: **"Betul! 🎉"** / **"Cuba lagi"**.
- **"Seterusnya →"** button advances to the next question (enabled only after answering).

**Five question types** (the prompts the owner specified):

| `type` | Prompt (BM) | Correct group |
|--------|-------------|---------------|
| `banyak` | Yang manakah banyak? | the larger count |
| `sedikit` | Yang manakah sedikit? | the smaller count |
| `lebih` | Yang manakah lebih? | the larger count |
| `kurang` | Yang manakah kurang? | the smaller count |
| `sama-banyak` | Yang manakah sama banyak? | shows a **reference group** ("Sama dengan ini") + 2 options; tick the option whose count **equals** the reference |

**Question data — randomly generated (owner 2026-06-20):** a **round = 10 questions** =
**4 Banyak/Sedikit + 4 Lebih/Kurang + 2 Sama Banyak**, **shuffled** into random order.
Each question randomises its object icon (20-emoji pool), counts (1–9, two groups differ),
and the exact word within its category. No visible "x / N" counter. Tick box shows each
group's **count**, flipping to ✓ (correct) / ✗ (wrong pick) on answer; emoji grid is 4-wide.

**Confetti + completion (owner 2026-06-20):** each **correct** answer fires a small
confetti burst. After the 10th question the **Tamat 🎉** button shows a **completion
screen** (full confetti): "Tahniah!" + **Betul / Salah** totals + **Main Semula** (fresh
round) and **Topik Seterusnya →**.
> ⚠️ "Topik Seterusnya" currently calls `onExit` = back to the **module hub** (the next
> card, Kenali 0 hingga 10, isn't built yet). Re-point it to the real next topic once that
> card exists.

**Removed from the earlier design** (owner): the ⚖️ emoji, the banner subtitle, the
de-highlighted "Ketik kumpulan…" ribbon, the **mode chips** (Banyak/Sedikit · Lebih/Kurang
· Sama/Tidak Sama), and the **"Saya Dah Sedia → Kuiz"** CTA.

**Refinement 2 (owner 2026-06-20):**
- **No Belajar/Kuiz toggle** — shell `showToggle={false}` (new prop): plain full-height
  body, no banner. Top bar (back + StatsBar) stays.
- **Dynamic header per question category** (gray, borderless): `Pembelajaran Banyak atau
  Sedikit` (banyak/sedikit Qs) · `Pembelajaran Lebih atau Kurang` (lebih/kurang) ·
  `Pembelajaran Sama Banyak`. Question itself near-black, borderless (no card/box).
- **Removed the 🔊 speaker** and the **`x / N` progress**.
- **Footer mirrored from `Jawi100WordsGame.jsx`**: `Jawapan : ✅ n Betul ❌ n salah` on the
  left + a 🏆 streak progress bar (`streak%10 /10`) on the right, pinned to the bottom.
  Belajar now keeps a light **session Betul/Salah + streak** counter (still no global XP).

**Rules:** **No XP, no score, no timer** (Belajar/practice). TTS via `useMtTts` speaks the
question / feedback in **Malay** (`ms-MY`; device may fall back to an `id-*` voice — a
device limitation, text stays Malay). Audio stops on navigate. Resting state visible
(no opacity-0 reveal). Tap targets ≥44px. Card visual on the hub = shared `ROBOT` (§8.5).

**Phase frame:** still rendered through `MatematikTopicShell` (Belajar-first + Belajar|Kuiz
toggle), but **no banner emoji, no subtitle, no Ready CTA**. **Kuiz** = labelled **"Segera
Hadir"** stub (real Kuiz comes from Selesaikan in 1.F).

> **Design note — `sama-banyak`:** with only two option groups you cannot ask "which is
> sama banyak", so this type adds a **reference group** and the child ticks the option that
> matches it. If the owner prefers a Ya/Tidak ("Adakah sama banyak?") form instead, swap
> later — flagged, not blocking.

### 8.3 Graded Aktiviti → Kuiz/Selesaikan mapping (Slice 1.F — DO NOT build now, just record)

| Workbook | Becomes (graded) |
|----------|------------------|
| Aktiviti 1 — Tandakan kumpulan yang banyak/sedikit | "Ketik kumpulan yang **banyak**" / "…**sedikit**" |
| Aktiviti 2 — Padankan Sama/Tidak sama | Match each pair → **sama banyak / tidak sama banyak** |
| Aktiviti 3 — Warnakan yang lebih/kurang | Tap the group that is **lebih** / **kurang** |
| Aktiviti 4 — Isi tempat kosong | Fill: "Kucing __ . Ikan __ ." choose banyak/sedikit |
| Aktiviti 5 — Gariskan (Zoo) | Scene + multiple-choice: pick the correct word by counting |

### 8.4 Slice 1.1 Definition of Done (card-level)

- [ ] `NomborHingga100Module` shows the **"Banyak, Sedikit, Lebih atau Kurang"** card
      (shared ROBOT, chip `BANYAK DAN SEDIKIT`); tapping opens it via `MatematikTopicShell`.
- [ ] Belajar = **tick-the-correct-group questions** (§8.2): prompt card + 🔊, two option
      groups with tick boxes, correct/wrong ✓/✗ feedback, **"Seterusnya →"** advances
      (enabled after answering), all 5 question types incl. `sama-banyak` reference form.
- [ ] **Malay only** (no Indonesian text); **no** ⚖️ emoji, **no** subtitle, **no** Ready
      CTA. Belajar = no score/XP; audio stops on navigate; iOS-safe CSS.
- [ ] Belajar shows first; **Belajar | Kuiz** toggle + "Saya Dah Sedia → Kuiz" CTA present;
      Kuiz is a working quiz **or** a labelled "Segera Hadir" stub (noted).
- [ ] `npm run build` passes; console clean. Footer trio untouched (still disabled).

### 8.5 Card design conventions — apply to EVERY Belajar card (owner, 2026-06-20)

These are global rules for the **hub topic cards** (the `TOPICS` entries in each module
hub). They keep all cards consistent and cheap to build:

1. **Visual = the shared robot head only.** Use the module's `ROBOT`
   (`<MatematikTopicRobot theme={THEME} />`) for **every** topic card. **Do NOT create a
   custom per-topic SVG** — same robot head across all topics in a module.
2. **Chip (`pill`) = the KSSR sub-topic name, in UPPERCASE.** e.g. `BANYAK DAN SEDIKIT`,
   `KENALI 0 HINGGA 10`, `TULIS 0 HINGGA 20`. (Not "BELAJAR" / "TOPIK 1.1".)
3. **Description (`desc`) = short, ≤ 10 words**, plain BM. e.g.
   *"Bandingkan banyak atau sedikit, lebih atau kurang."* No long sentences, no listing
   every keyword.
4. `title` stays the combined card name from §3 (the interactive content still teaches the
   full combined scope).

> Applied to 1.1 already: chip `BANYAK DAN SEDIKIT`, desc *"Bandingkan banyak atau
> sedikit, lebih atau kurang."*, visual = shared `ROBOT` (custom `ComparisonSvg` removed).

---

## 9. ⭐ STANDARD TOPIC SPEC — auto-apply to EVERY topic (owner, 2026-06-20)

> **This section is the default contract for every Matematik topic card going forward.**
> When building any new topic (1.2 … and Modules 2–5, later T2/T3), the build agent must
> apply ALL of these **without being asked**. They were locked in while iterating on the
> Slice 1.1 pilot (`BandingBanyakSedikit` / `CompareExplore`). Only deviate if the owner
> explicitly says so for that topic. Copy the pilot as the reference implementation.

### 9.1 Shell configuration (`MatematikTopicShell`)
- `showToggle={false}` — **no Belajar/Kuiz toggle**. Each card is a single activity.
- `emoji=""`, `titleBM/EN=""`, `subtitleBM/EN=""` — **no banner** (no emoji, no title line,
  no subtitle). The heading lives **inside** the activity (see §9.3).
- `showReadyCta={false}` — **no "Saya Dah Sedia → Kuiz"** button.
- Keep the **top bar** (back button + `StatsBar`).
- Pass `onExit={onBack}` down to the explore (used by the completion screen).

### 9.2 Layout & responsiveness (REQUIRED on every component)
- **Everything sizes with `clamp(min, Nvmin, max)`** (use **vmin**, not vw). This makes the
  whole component scale to the screen and **fit a single page without scrolling on
  tablet/desktop**, grow **larger on big screens**, and stay compact on phones.
- **Vertically centered** in the page: scroll wrapper (`flex:1; overflow-y:auto`) + inner
  `min-height:100%; justify-content:center; align-items:center`.
- **Reserve the height of any element that appears later** (e.g. the feedback line uses a
  fixed `min-height` always rendered) so revealing it never pushes content into a scroll.
- Content `max-width: min(94vw, 860px)`, centered. Tap targets ≥ 44px.
- A scroll fallback stays for tiny/landscape phones; tablet/desktop must not need it.

### 9.3 Heading & question (plain, borderless)
- **Dynamic header per question category**, gray `#64748B`, borderless plain text, format
  `Pembelajaran <Kategori>` (e.g. `Pembelajaran Banyak atau Sedikit`). **It is a TITLE
  pinned near the top** of the page (just under the top bar), kept clear of the body — the
  body (question + card + Seterusnya) is centred in the space below it.
- **Question** near-black `#1E293B`, bold, **borderless** (no card/box/shadow).
- **No 🔊 speaker icon. No `x / N` progress counter.**
- **Malay only** — never Indonesian text. (TTS, if used, prefers `ms-MY`; the `id-*` voice
  fallback is a device limitation, but on-screen text must be Malay.)

### 9.4 Activity model
- Workbook-style **interactive**: tap/tick the correct answer (objects shown as emoji).
- **A round = 10 questions**, with **randomised content and sequence** (the per-category
  mix is topic-specific — e.g. Banding = 4 Banyak/Sedikit + 4 Lebih/Kurang + 2 Sama Banyak).
- Answer boxes show the **count number**, flipping to **✓** (correct) / **✗** (wrong pick)
  on selection. Emoji groups in a **4-wide** grid. *(Where the box reveals the answer — e.g.
  "tick the group of N" or "find the empty" — keep boxes empty until answered so the child
  must actually count.)*
- **Answer options that are WORDS must NOT clip.** Long BM words (e.g. `sembilan`,
  `sepuluh`) overflow a 4-across grid → render word options **2-across** with a smaller font
  + `white-space: nowrap`; keep **numeral** options 4-across.
- Feedback line: **`Betul! 🎉`** / **`Cuba lagi`**.
- **Sound:** `playSound('correct')` / `playSound('wrong')` on each answer (alongside confetti).
- **Confetti:** small burst on **each correct** answer.
- **Seterusnya → button:** accent-coloured when active; **neutral gray when disabled**
  (`#E5E7EB` bg / `#9CA3AF` text — not the bluish slate).
- **After 10 → completion screen** (full confetti **+ `playSound('streak')` cheer**):
  **`Tahniah!`** + **Betul / Salah** totals + two buttons: **`↻ Main Semula`** (fresh round) and
  **`Topik Seterusnya →`** (`onExit`; re-point to the real next topic once it exists).

### 9.5 Footer — IDENTICAL on every topic
Mirror of `PendidikanIslamPage/.../Jawi100WordsGame.jsx`, pinned to the bottom, frosted
white (`rgba(255,255,255,.85)` + blur, top border):
- **Left:** `Jawapan :` + the two stats **grouped as one nowrap unit** with a divider:
  `✅ <n> Betul | ❌ <n> salah`. On small screens "Jawapan :" sits on its own line and the
  grouped stats wrap together below it (never split mid-pair).
- **Right:** 🏆 streak progress bar = `streak % 10` out of `/10`.
- Drives a **light session counter** (correct / wrong / streak) only — **no global XP**.

### 9.6 Hub topic card (the `TOPICS` entry) — see §8.5
- `visual` = shared **`ROBOT`** head (no custom SVG).
- `pill` = **KSSR sub-topic name, UPPERCASE**.
- `desc` = **≤ 10 words**, plain BM.

### 9.7 Standing project rules (still apply)
- **iOS-safe CSS** (resting state visible; SVG `width`/`height` attrs + self-contained).
- **Lazy-loading** intact (one `App.jsx` route + lazy import per topic page).
- `npm run build` must pass; console clean.

### 9.8 Reuse note (recommended)
The pilot's chrome — **centered responsive scroll + Jawi footer + confetti +
completion screen** — is generic. Prefer extracting it into a **shared activity frame**
(e.g. `MatematikActivityFrame`) so each new primitive only supplies its question content
and answer-check, and automatically inherits §9.2–§9.5. Until then, copy `CompareExplore`.

### 9.9 Exception — "Tulis" (trace) cards are a different activity type
**Writing/tracing cards** (e.g. 1.4 Tulis 0 hingga 20) do **NOT** use the tick-quiz frame:
no 10-question round, no Betul/Salah footer, no answer options. They **mirror the Bahasa
Melayu trace lesson** `BahasaMelayuPage/Tahun1/Module3_Menulis/LetterTraceLesson.jsx` +
`AgeGroup-4-6/TraceCanvas.jsx` (finger-trace stroke paths; per-glyph confetti; "Tahniah!"
completion with Cuba Lagi / Kembali). Still apply: **Malay only**, single-page responsive,
iOS-safe, lazy-load, ROBOT hub card, build passes. **Glyph data:** letters live in
`data/letterPaths.js` as `segments` (type `L`/`C`, points in a 100×100 box) → **digits 0–9
must be authored** in the same shape (no number paths exist yet).

---

## 10. Card spec — Slice 1.2 "Kenali 0 hingga 10" (image-grounded)

> Combined card = **Kenali 1 hingga 10 + Kenali Sifar (0)**. Grounded in the KSSR Tahun 1
> workbook samples the owner supplied. Build on the §9 standard spec (frame, confetti,
> completion, Jawi footer, vmin single-page responsive, ROBOT card, **Malay only**).

### 10.1 Activity formats (from the workbook) — THREE types
- **Bilang (count → number)** — *"Bilang dan warnakan jawapan yang betul"*: show N objects
  (emoji, 4-wide) → child picks the correct number. **Options = 4 choices, randomly
  NUMERALS (e.g. 5 6 4 7) or BM number WORDS (lima/enam/empat/tujuh).** Header
  `Pembelajaran Mengira`, prompt **"Berapakah bilangannya?"**. N = 0–10.
- **Kenal Nombor (number → group)** — *"Warnakan objek ikut bilangan yang diberikan"* /
  *"Padankan"*: show a big numeral N → tick the group (of 2–3) that has N objects. Header
  `Pembelajaran Nombor`, prompt **"Yang manakah <N>?"**. *(Already built — keep.)*
- **Kenali Sifar (find zero)** — *"Tandakan bilangan yang menunjukkan sifar"*: show **3
  groups**, exactly **one empty** (empty dashed tray = no objects), others with objects.
  Header `Pembelajaran Sifar`, prompt **"Yang manakah sifar?"** → tick the empty one.
  *(MISSING — must be added.)*
- Zero also appears inside Bilang/Kenal Nombor when N = 0 → show the **empty dashed tray**,
  not a plate/“0” emoji.

### 10.2 Round composition (10 questions, randomised order) — REVISED
- **4 × Bilang** (count → number; mix numeral/word options)
- **3 × Kenal Nombor** (number → tick the matching group)
- **3 × Kenali Sifar** (find the empty group among 3)

### 10.3 BM number words (for word-option questions)
`sifar, satu, dua, tiga, empat, lima, enam, tujuh, lapan, sembilan, sepuluh`.

### 10.4 Deferred
The **abacus** activity (workbook Aktiviti 3 — "ikut abakus") is **not** in this card; it
belongs to **Nilai Tempat & Nilai Digit** (place value). Note, don't build here.

### 10.5 DoD (card-level) — in addition to §9
- [ ] Round of 10 = **4 Bilang + 3 Kenal Nombor + 3 Kenali Sifar**, shuffled; random.
- [ ] Bilang: 4 options **randomly numerals OR BM words**; correct pick → ✓ + confetti.
- [ ] Kenal Nombor: numeral shown, tick the group with that count (kept from current build).
- [ ] Kenali Sifar: 3 groups incl. one **empty dashed tray**; prompt "Yang manakah sifar?";
      ticking the empty one = correct.
- [ ] Zero shown as an **empty dashed tray** — **never a "0" or 🍽️ emoji**. Malay only.
- [ ] Everything from §9 (frame, footer, completion, vmin single-page, ROBOT card, §8.5).

### 10.6 Build status (2026-06-20)
First 1.2 build = 5 Bilang + 5 Kenal Nombor, numerals-only options, 🍽️ plate for zero.
**Gaps to fix:** add **Kenali Sifar** type; **numeral-OR-word** Bilang options; **empty
dashed tray** for zero (drop 🍽️); rebalance to **4 / 3 / 3**. Frame + Kenal Nombor are good
— keep them.

---

## 11. Card spec — Slice 1.5 "Kombinasi Nombor" (image-grounded)

> Number bonds / part–part–whole (combine numbers to a whole ≤ 10). Grounded in the KSSR
> Tahun 1 workbook (Kombinasi Nombor, Aktiviti 1–3). Build on the §9 standard spec (frame,
> confetti, completion, Jawi footer, vmin single-page, ROBOT card, **Malay only**) — this
> is a tick-the-answer card like 1.2/1.3, a NEW primitive on `MatematikActivityFrame`.

### 11.1 Activity formats (from the workbook) — THREE types
- **Jumlah (combine → whole)** — *"Padankan supaya jadi 6"*, *"… dan … ialah …"*: show two
  object groups (A and B emoji, with "dan" / "+" between) → prompt **"Berapa jumlahnya?"**
  (header `Pembelajaran Kombinasi`). 4 NUMBER options; answer = A + B. Whole ≤ 10.
- **Lengkapkan (missing part)** — *"Isi tempat kosong"*, *"kombinasi 7 dan 9"*: a part–part–
  whole bond — show part A + the whole C, second part shown as **"?"**; prompt
  **"[A] dan ? ialah [C]"** (header `Pembelajaran Lengkapkan`). 4 number options; answer =
  C − A.
- **Jadikan 10 (ten-frame complement)** — *"Jadikan 10"*: a 2×5 **ten-frame** with A cells
  filled (coloured emoji) + (10−A) empty (outline); prompt **"Berapa lagi untuk jadi 10?"**
  (header `Pembelajaran Jadikan 10`). 4 number options; answer = 10 − A.

### 11.2 Round composition (10 questions, randomised order)
- **4 × Jumlah** (A + B → whole; A,B ≥1, A+B ≤ 10)
- **3 × Lengkapkan** (A and ? → C; whole C ≤ 10)
- **3 × Jadikan 10** (ten-frame complement to 10)

### 11.3 Notes
- Number options: 4 choices, the correct answer + 3 near distractors (in range). Tick →
  ✓/✗ + confetti (frame). 4-wide emoji groups; ten-frame = 2 rows × 5.
- BM: Jumlah · dan · ialah · "Berapa jumlahnya?" · "Berapa lagi untuk jadi 10?".
- Whole stays ≤ 10 (KSSR T1 bonds). Objects = kid-friendly emoji.

### 11.4 DoD (card-level) — in addition to §9
- [ ] Round of 10 = 4 Jumlah + 3 Lengkapkan + 3 Jadikan 10, shuffled; numbers random in range.
- [ ] Jumlah: two groups shown, pick the total; Lengkapkan: "A dan ? ialah C", pick missing
      part; Jadikan 10: ten-frame, pick how many more to reach 10.
- [ ] Number options (4), correct → ✓ + confetti; Malay only; whole ≤ 10.
- [ ] Everything from §9 (frame, footer, completion, vmin single-page, ROBOT card, §8.5).

---

## 12. Card spec — Slice 1.6 "Kenali 21 hingga 100" (image-grounded)

> Recognise numbers 21–100. Grounded in the KSSR Tahun 1 workbook (Kenali 21 hingga 100,
> Aktiviti 1–6). **New question types** (NOT just a `min/max` config bump — you cannot show
> 87 loose objects). Build a new generator set on `MatematikActivityFrame` (copy the
> KenaliNombor pattern), reuse `NumOptionsGrid` + a `numToBM`-style word helper. Apply §9.

### 12.1 Activity formats (cover ALL six workbook activities) — THREE types
- **Bilang puluh & sa (count tens + ones → numeral)** — *Aktiviti 1 "Padankan"* (groups→number)
  + *Aktiviti 2 "Bilang dan warnakan"*: show the number as **T groups of ten + O ones**
    (rows-of-ten box + ones below — countable by 10s; responsive). Header `Pembelajaran
    Mengira`, prompt **"Berapakah bilangannya?"** → **3** numeral options (tick).
- **Tulis Angka (word → TYPE the numeral, keypad)** — *Aktiviti 3②* + *Aktiviti 4 "Tulis
  nombor dalam angka"*: show the BM **word** (e.g. `empat puluh tujuh`) + a number display +
  a **0–9 keypad** (⌫ / ✓). Header `Pembelajaran Tulis`, prompt **"Tulis nombor dalam
  angka"**. Submit → `handlePick(typed)` checked vs `String(n)`; wrong shows `Jawapan: <n>`.
  *(Replaced the earlier pick-numeral version — typing is the authentic Aktiviti 4 skill.)*
- **Angka → Perkataan (numeral → word)** — *Aktiviti 3①* + *Aktiviti 5 "Tulis dalam perkataan"*:
  show the **numeral** (e.g. 57) → header `Pembelajaran Perkataan`, prompt
  **"Apakah nama nombor ini?"** → **3** **word** options (stacked, no clip).

### 12.2 Round composition (10 questions, randomised order) — owner 2026-06-21
- **2 × Susun Perkataan** (numeral → arrange scrambled word-parts in order — *Aktiviti 5
  "Tulis nombor dalam perkataan"*; word-ordering builder like AgeGroup-7 `SentenceBuilder`,
  e.g. 53 → tap `lima` `puluh` `tiga`; parts carry stable ids so duplicates like
  `lima puluh lima` work; assembled string auto-submits when all placed)
- **3 × Tulis Angka** (word → type numeral, keypad + external keyboard)
- **2 × Bilang** (tens + ones → numeral, tick; 3 options)
- **3 × Angka → Perkataan** (numeral → tick word; "Apakah nama nombor ini?")

> **Options capped at 3** (answer + 2 distractors) for tick types — owner: "max 3 options".

### 12.3 Numbers & words
- Range **21–100** (include 100 = `seratus`). Distractors are near/plausible (digit-swap like
  57↔75, ±1 ten, ±1 sa) — mirror the workbook's choices.
- BM words via a `numToBM` helper (port from `Nombor100.jsx`/`NumberTraceLesson`): tens
  `dua puluh … sembilan puluh`, + sa, `seratus`.
- **Word options are LONG** (e.g. `tujuh puluh lima`, `lapan puluh tiga`). They MUST NOT clip
  (§9.4): render word options **1-across (stacked) or 2-across with a smaller font** +
  `white-space: nowrap`; numeral options stay 4-across.

### 12.4 Deferred
The **abacus** activity (*Aktiviti 6* — "padankan dengan abakus") is **place value** → build
it in **1.7 Nilai Tempat & Nilai Digit**, not here.

### 12.5 DoD (card-level) — in addition to §9
- [ ] Round of 10 = 4 Bilang + 3 Tulis Angka (keypad) + 3 Angka→Perkataan, shuffled; numbers
      random in 21–100 (incl. some round tens + 100).
- [ ] Bilang shows **tens groups + ones** (not loose 87 objects), responsive (no overflow);
      **3** tick options.
- [ ] **Tulis Angka:** word + number display + 0–9 keypad (⌫/✓); typed = correct → ✓ +
      confetti/sound; wrong shows `Jawapan: <n>`; input resets between questions.
- [ ] Angka→Perkataan: **3** word options, **never clip** (stacked, nowrap).
- [ ] Tick options **max 3** (answer + 2 distractors); Malay only.
- [ ] Everything from §9 (frame, footer, completion, vmin single-page, ROBOT card, §8.5).

---

## 13. Card spec — Slice 1.7 "Nilai Tempat & Nilai Digit" (image-grounded)

> Place value & digit value. Grounded in the KSSR Tahun 1 workbook (Kenali Nilai Tempat dan
> Nilai Digit, Aktiviti 1–2) the owner supplied. **New primitive on `MatematikActivityFrame`**
> (copy the Kenali21 pattern; reuse `TensOnesGrid` + the keypad). Apply §9. Round = **5 + 5**.

### 13.1 Activity formats — TWO types
- **Bilang & Tulis (count → keyin puluh + sa)** — *Aktiviti 1 "Bilang dan tulis nombor"*:
  show the number as **tens groups + ones** (reuse the wide, spaced `TensOnesGrid`). Below it,
  **two labelled boxes — `PULUH` and `SA`** — the child **types** the tens digit and the ones
  digit (keypad **+** external keyboard, like Tulis Angka). Active box auto-advances
  (puluh → sa); tap a box to refocus; **auto-submit when both filled** → `handlePick(puluh+sa)`
  checked vs `String(n)`. Numbers **10–99**. Header `Pembelajaran Nilai Tempat`, prompt
  **"Bilang dan tulis nombor"**. Wrong → show `Jawapan: <p> puluh <s> sa`.
- **Nilai Tempat (underlined digit → pick the place)** — *Aktiviti 2 "Tulis nilai tempat bagi
  digit yang bergaris"*: show a number (**up to 3 digits / ratus**, e.g. `323`) with **one digit
  underlined & styled — bold, RED, slightly bigger, underlined** (others plain black). 3 tick
  options **`Ratus` / `Puluh` / `Sa`**; answer = the place of the underlined digit. Header
  `Pembelajaran Nilai Tempat`, prompt **"Tulis nilai tempat bagi nombor bergaris"**.

### 13.2 Round composition (10 questions, randomised order)
- **5 × Bilang & Tulis** (keyin puluh + sa; n 10–99, random)
- **5 × Nilai Tempat** (underlined digit → Ratus/Puluh/Sa; number up to 3 digits, random digit
  underlined)

### 13.3 Notes
- Reuse `MatematikActivityFrame` chrome (header title, sound, confetti, completion, Jawi
  footer) + `TensOnesGrid` (wide/spaced) + the keypad styling/keyboard handler from Tulis Angka.
- **Place-value styling** (type B): the underlined digit is the only red/bold/bigger/underlined
  glyph; the rest of the number is plain `#1E293B`.
- Malay only; responsive (no overflow); tap targets ≥44px.
- *(Abacus from 1.6 Aktiviti 6 / this Aktiviti 1 is NOT required — owner wants emoji objects.)*

### 13.4 DoD (card-level) — in addition to §9
- [ ] Round of 10 = 5 Bilang & Tulis + 5 Nilai Tempat, shuffled; numbers random.
- [ ] Bilang & Tulis: tens+ones objects + **PULUH/SA boxes**, keypad + keyboard, auto-advance,
      auto-submit; correct → ✓ + confetti/sound; wrong shows the decomposition.
- [ ] Nilai Tempat: number up to 3 digits, one digit **bold-red-bigger-underlined**; 3 options
      Ratus/Puluh/Sa; correct place = answer.
- [ ] Topic page §9 (no toggle/banner/CTA, onExit); route + **live hub card** (pill
      `NILAI TEMPAT & NILAI DIGIT`, ROBOT, desc ≤10 words); build exit 0; no regression to 1.1–1.6.

---

## 14. Card spec — Slice 1.8 "Susunan Nombor" (image-grounded)

> Ordering / sequencing. Grounded in the KSSR Tahun 1 workbook (Susunan Nombor, Aktiviti 1–7).
> **Bigger card — FOUR question types**, on `MatematikActivityFrame` (copy the Kenali21 /
> NilaiTempat patterns; reuse the keypad + keyboard handler + the Susun-Perkataan tap-to-order
> pattern). One type uses an **SVG/canvas** (dot-to-dot). Apply §9. Numbers ≤ 100.

### 14.1 Activity formats — cover ALL workbook activities, FOUR types
- **Susun (order ascending/descending)** — *Aktiviti 1② "tertib menaik" + Aktiviti 3 "tertib
  menurun"*: show 4–5 **scrambled number tiles**; child taps them into the correct order
  (reuse the Susun-Perkataan tap-to-build pattern, number tiles). Header `Pembelajaran Susunan`,
  prompt **"Susun mengikut tertib menaik"** / **"… menurun"** (randomly). Auto-checks when all
  placed; tap a placed tile to undo.
- **Jiran (sebelum / selepas / di antara)** — *Aktiviti 4*: show a short run with ONE gap —
  `__ , 31` (sebelum), `71 , __` (selepas), `47 , __ , 49` (di antara) — child **types** the
  missing number (keypad + keyboard, ✓/Enter to submit; NO auto-submit). Header
  `Pembelajaran Susunan`, prompt **"Tulis nombor sebelum / selepas / di antara"** (match case).
- **Lengkapkan Urutan (missing number / skip-count)** — *Aktiviti 3 + 4 (2s) + 5 (5s) + 6 (10s)
  + 7 (4s)*: show a stepped sequence with ONE missing slot, step ∈ {1,2,4,5,10}, menaik OR
  menurun, e.g. `2 4 6 __ 10`, `100 90 __ 70`. Child **types** the missing number (keypad +
  keyboard). Header `Pembelajaran Susunan`, prompt **"Bilang menaik/menurun <N>-<N>"** (or
  "Lengkapkan urutan"). All numbers ≤ 100, no negatives.
- **Sambung Titik (connect-the-dots, SVG/canvas)** — *Aktiviti 2*: numbered dots (≈8–14) laid
  out to form a **simple shape** (e.g. star/fish/house); child taps dots **in number order**;
  a line draws between correctly-connected dots; tapping the wrong dot is ignored. Completing
  the sequence → correct (`handlePick('done')`). Header `Pembelajaran Susunan`, prompt
  **"Sambung titik ikut urutan nombor"**. Use SVG (or canvas) so it looks like the worksheet.

### 14.2 Round composition (10 questions, randomised order)
- **3 × Susun** (ascending/descending, random scrambled set)
- **2 × Jiran** (sebelum / selepas / di antara, random)
- **3 × Lengkapkan Urutan** (random step 1/2/4/5/10, menaik/menurun, random gap position)
- **2 × Sambung Titik** (random shape from a small predefined set)

### 14.3 Notes
- Reuse `MatematikActivityFrame` chrome + the keypad (Jiran/Lengkapkan) + Susun-Perkataan
  tap-to-order (Susun). Sambung Titik is bespoke SVG inside `renderQuestion`.
- Keypad types: **no auto-submit** — ✓ / Enter only (per owner). Editable (overwrite box).
- Wrong → show the correct answer (the number / the ordered list).
- Malay only; responsive (no overflow); tap targets ≥ 44px; all numbers 1–100.

### 14.4 DoD (card-level) — in addition to §9
- [ ] Round of 10 = 3 Susun + 2 Jiran + 3 Lengkapkan + 2 Sambung Titik, shuffled; random.
- [ ] Susun: tap scrambled tiles into ascending/descending order; undo; auto-check on complete.
- [ ] Jiran: before/after/between gap; keypad + keyboard; ✓/Enter submit (no auto-submit).
- [ ] Lengkapkan: step 1/2/4/5/10 up/down, one gap; keypad + keyboard; numbers ≤ 100.
- [ ] Sambung Titik: SVG dots in order → lines connect → completing = correct; looks worksheet-like.
- [ ] Topic page §9; route; **live hub card** (pill `SUSUNAN NOMBOR`, ROBOT, desc ≤10 words);
      build exit 0; no regression to 1.1–1.7.

---

## 15. Card spec — Slice 1.9 "Pola Nombor" (image-grounded)

> Number patterns. Grounded in the KSSR Tahun 1 workbook (Pola Nombor, Aktiviti 1–2, pp.57–58).
> Two distinct concepts: **pola berulang** (repeating/cyclic patterns) + **pola bilang**
> (skip-counting arithmetic sequences, incl. naming the rule). New file
> `PolaNomborExplore` in `explore_T1_1_core.jsx`; primitive key `'pola-nombor'`. Reuse the
> §9 `MatematikActivityFrame`, the number-options grid (1.6 `NumOptionsGrid`), the keypad
> (1.8 `SusunanKeypadContent` pattern — keypad + external keyboard, submit ONLY via ✓/Enter,
> NO auto-submit), and the stacked word-options grid (1.6 `WordOptionsGrid`). Header on every
> question = `Pembelajaran Pola`.

### 15.1 Type A — Pola Berulang: nombor seterusnya (Aktiviti 1①)
- Cyclic pattern, period P ∈ {2,3}, values 0–9 (e.g. `[2,5]`→ `2 5 2 5 2 5 ?`; `[6,6,3]`→ `6 6 3 6 6 3 ?`).
- Render ~6–7 tiles ending in a highlighted `?`; **answer = next value in the cycle**.
- Input = `NumOptionsGrid` (distinct pattern values + 1–2 distractors from 0–9, capped 3–4, shuffled).
- prompt **"Tulis nombor seterusnya"** (match case).

### 15.2 Type B — Pola Berulang: lengkapkan (Aktiviti 1②, rocket columns)
- Same cyclic pattern but the `?` is an **internal** cell (not the last). answer = `pattern[gapIdx % P]`.
- Input = `NumOptionsGrid` (same option rule). prompt **"Lengkapkan pola"**.

### 15.3 Type C — Pola Bilang: lengkapkan (Aktiviti 2, fill gap)
- Arithmetic sequence: step ∈ {1,2,3,4,5,10}, dir asc/desc; **6 terms**, all 1–100; ONE internal gap.
- answer = missing term. Input = keypad + external keyboard (submit ONLY ✓/Enter, NO auto-submit).
- prompt **"Lengkapkan pola nombor"**.

### 15.4 Type D — Pola Bilang: terangkan pola (Aktiviti 2 "Terangkan polanya")
- Show a full skip-count sequence (5–6 terms); ask for the **rule**.
- answer = rule string `Menaik|Menurun <step-word>-<step-word>` where step-word: 1 satu, 2 dua,
  3 tiga, 4 empat, 5 lima, 10 sepuluh (e.g. `"Menaik dua-dua"`, `"Menurun empat-empat"`).
- Input = `WordOptionsGrid` (4 options: correct + 3 distractors that vary dir and/or step), stacked 1-col.
- prompt **"Terangkan pola nombor"**.

### 15.5 DoD (card-level) — in addition to §9
- [ ] Round of 10 = 3 Type A + 2 Type B + 3 Type C + 2 Type D, shuffled; all random-generated.
- [ ] Repeating patterns are truly cyclic (period 2–3); gap answer = correct cyclic value.
- [ ] Skip-count sequences stay within 1–100; single internal gap; one unambiguous answer.
- [ ] Terangkan: 4 rule options, exactly one correct; distractors differ in direction and/or step.
- [ ] Keypad type: keypad + external keyboard; submit ONLY ✓/Enter (NO auto-submit) — match 1.8.
- [ ] New primitive `'pola-nombor'` wired: topic page `PolaNombor.jsx` (§9, showToggle/showReadyCta
      false, onExit), App.jsx lazy route, `MatematikExplore` case, hub card (pill `POLA NOMBOR`,
      ROBOT, desc ≤10 words); build exit 0; no regression to 1.1–1.8.

---

## 16. Card spec — Slice 1.10 "Anggar & Bundar" (image-grounded)

> Estimate & round. Grounded in the KSSR Tahun 1 workbook (Kenali Anggaran p59 + Kenali
> Bundar p60–62). Two concepts, 5 + 5 split. New `AnggarBundarExplore` in
> `explore_T1_1_core.jsx`; primitive key `'anggar-bundar'`. Reuse §9 `MatematikActivityFrame`,
> `RenderObjects` (object clusters), `NumOptionsGrid` (number tiles), `WordOptionsGrid`
> (lebih/kurang). ONE new visual: an SVG `NumberLine`. Rounding rule = nearest ten, **5 rounds
> UP** (`Math.round(n/10)*10` — matches workbook: 25→30, 55→60, 95→100). Header = `Pembelajaran
> Anggaran` (Anggar types) / `Pembelajaran Bundar` (Bundar types).

### 16.1 Type A — Anggar: lebih / kurang daripada (p59 Aktiviti 1)
- Reference `R` ∈ {10,20,30}; show a cluster of `C` objects (`C = R ± randInt(3,9)`, clamp ≥1).
- prompt **"Lebih atau kurang daripada {R}?"**; answer = `Lebih daripada` or `Kurang daripada`.
- Input = `WordOptionsGrid` (2 options). Visual = `RenderObjects(icon, C)`.

### 16.2 Type B — Bundar kepada puluh terdekat: garis nombor (p60)
- `lowTen` = randInt(1,9)×10, `highTen = lowTen+10`; `n` in (lowTen, highTen), not a multiple of 10.
- prompt **"Bundarkan {n} kepada puluh terdekat"**; answer = nearest ten.
- Visual = SVG `NumberLine(low, high, n)` (ticks each 1, two tens labelled, marker+label at n).
- Input = `NumOptionsGrid` with the **two bracketing tens** only.

### 16.3 Type C — Bundar kepada puluh terdekat: pilih (p61–62)
- `n` = randInt(11,96), not a multiple of 10; answer = nearest ten (can be 100).
- prompt **"Bundarkan {n} kepada puluh terdekat"**; big `{n}` display (no line).
- Input = `NumOptionsGrid`: nearest ten + 3 distractor tens (from n±10/±20, valid 10–100), shuffled.

### 16.4 Type D — Anggar: lebih kurang / anggaran terbaik (p59 Aktiviti 2)
- Cluster of `C` objects (`C = randInt(11,38)`); answer = nearest ten to `C`.
- prompt **"Lebih kurang berapa?"**; Visual = `RenderObjects(icon, C)`.
- Input = `NumOptionsGrid` of tens (nearest + neighbouring tens), shuffled.

### 16.5 DoD (card-level) — in addition to §9
- [ ] Round of 10 = 3 Type A + 2 Type D (Anggar=5) + 2 Type B + 3 Type C (Bundar=5), shuffled, random.
- [ ] Rounding uses nearest ten with 5→UP; every Bundar answer matches the workbook rule.
- [ ] Type B number line: ticks per unit, two tens labelled, marker+label at n; options = the 2 tens.
- [ ] Type C/D: NumOptionsGrid, exactly one correct, distractors are distinct valid tens (10–100).
- [ ] Type A: 2 word options (Lebih/Kurang daripada), correct per C vs R.
- [ ] New primitive `'anggar-bundar'` wired: topic page `AnggarBundar.jsx` (§9, showToggle/
      showReadyCta false, onExit), App.jsx lazy route, `MatematikExplore` case, hub card (pill
      `ANGGAR & BUNDAR`, ROBOT, desc ≤10 words); build exit 0; no regression to 1.1–1.9.

---

## 17. Card spec — Slice 2.1 "Kenali Tambah" (Module 2, image-grounded)

> Intro to addition. KSSR T1 Module 2 "Tambah dan Tolak" → Kenali Tambah (Aktiviti 1–6,
> pp.69–74). Module-2 theme = **BLUE** (accent #3B82F6, dark #1E3A8A — copy from
> `TambahDanTolakModule`). New `KenaliTambahExplore` in `explore_T1_2_core.jsx`; primitive
> key `'kenali-tambah'`. Reuse §9 `MatematikActivityFrame`, `WordOptionsGrid`, `ObjectsGrid`/
> `RenderObjects`, the keypad pattern (extract a shared `KeypadInput` from
> `SusunanKeypadContent`: display slot + 3×3 keypad + ⌫/✓ + keyboard; submit ONLY ✓/Enter, NO
> auto-submit). Addends 0–9, **sums ≤ 18**. Header = `Pembelajaran Tambah`.

### 17.1 Type A — Gabung Kumpulan (3) [Akt 1,4,5]
- Two object groups (`a`, `b`) shown with a `+` between; keypad → sum `a+b`.
- Prompt randomly one of: `{a} dan {b} jadi?` · `{a} tambah {b} sama dengan?` · `Jumlah {a} dan {b} ialah?`.

### 17.2 Type B — Garis Nombor (2) [Akt 6]
- Number track boxes 1..N (N=a+b, ≤18) with count-on jump arcs from `a` over `b` steps; keypad → `a+b`.
- prompt **"{a} + {b} = ?"**. New small SVG `NumberTrackAdd` (boxes + arcs, landing box emphasised).

### 17.3 Type C — Pilih Perkataan (2) [Akt 2]
- Short scenario → choose the correct addition word. Answer ∈ {Jumlah, Semua, Tambah, Masukkan};
  distractor ∈ {Baki, Beza, Tinggal, Asingkan}. `WordOptionsGrid` (2 options).

### 17.4 Type D — Lengkapkan Ayat Matematik (3) [Akt 3,4,5]
- Abstract number sentence via keypad: either `a + b = ?` (sum) or `a + ? = c` (missing addend = c−a).
- Reuse the keypad with a `display` string (e.g. `"3 + 5 = ?"` / `"3 + ? = 8"`); answer = the number.

### 17.5 DoD (card-level) — in addition to §9
- [ ] Round of 10 = 3 Gabung + 2 Garis Nombor + 2 Pilih Perkataan + 3 Lengkapkan, shuffled, random.
- [ ] Addends 0–9, sums ≤ 18; every answer correct; keypad submit ONLY ✓/Enter (no auto-submit).
- [ ] Pilih Perkataan: exactly one correct word; distractor is a subtraction/other term.
- [ ] Garis Nombor shows count-on jumps landing on the sum.
- [ ] Module-2 BLUE theme; new primitive `'kenali-tambah'` wired: topic page `KenaliTambah.jsx`
      (§9, showToggle/showReadyCta false, onExit), App.jsx lazy route + **topic-advance order
      (new `MT_MODULE2_ORDER`; nav lookup picks whichever module array holds the current topic)**,
      `MatematikExplore` case, hub card in `TambahDanTolakModule` (pill `KENALI TAMBAH`, ROBOT,
      desc ≤10 words; replace the placeholder). Build exit 0; scene background + 80% gate inherit
      automatically; no regression to Module 1.

## 18. Card spec — Slice 2.2 "Latihan Tambah" (Module 2, image-grounded)

> Tiered **addition practice** (the C1 combine: *Tambah Cepat + Tambah Mudah + Tambah Lagi*).
> KSSR T1 Module 2, pp.75–87. Module-2 theme = **BLUE** (copy `TambahDanTolakModule` THEME).
> New `LatihanTambahExplore` in `explore_T1_2_core.jsx`; primitive key `'latihan-tambah'`.
> Reuse §9 `MatematikActivityFrame`, the shared `KeypadInput` (from 2.1), `WordOptionsGrid`.
> Header = `Latihan Tambah`. **No regression to 2.1.**
>
> **Three difficulty levels** (worksheet sub-units map 1:1):
> - **Mudah** ← *Tambah Cepat* (p75–77): single-digit facts, **sums ≤ 18**.
> - **Sederhana** ← *Tambah Mudah* (p78–82): 2-digit add, **NO regrouping** (no carry).
> - **Sukar** ← *Tambah Lagi* (p83–87): 2-digit add **WITH regrouping** (ones carry), sum ≤ 99.

### 18.1 Level select (intro screen — the one allowed §9 deviation)
- `LatihanTambahExplore` holds `level` state (`null` initially). When `null`, render a **level
  picker**: title `Pilih aras latihan`, three stacked tappable cards — **Mudah** (🟢, `●○○`,
  desc `Fakta asas hingga 18`) · **Sederhana** (🟡, `●●○`, `Tambah 2 digit tanpa mengumpul`) ·
  **Sukar** (🔴, `●●●`, `Tambah 2 digit dengan mengumpul`). Tap → set level → render
  `MatematikActivityFrame` keyed by level with `buildRound={() => buildLatihanTambahRound(level)}`.
- The frame fills the remaining height; render a thin top strip above it: `Aras: {label}` + a
  small `Tukar Aras ⟲` button that resets `level` to `null`. Keep the strip ≤ ~40px so the
  keypad round still fits one page. `Main Semula` (frame completion) rebuilds the **same** level.

**VARIETY RETROFIT (owner 2026-06-23):** original draft was keypad-heavy (5/6 types). Reworked
so each level uses **4 distinct interaction formats**, keypad kept only for light fluency. Four
new reusable widgets: **Warnai** ("which a+b = target?", p75) and **Padankan** ("which number
pairs with {given} to make {target}?", p76–77) are **single-select 4-option MC** — exactly 1
correct, tap auto-submits & flips colour via `WordOptionsGrid`/`NumOptionsGrid` (owner 2026-06-23,
simpler than the original multi-select/pair versions); **Bina Blok** (base-ten puluh/sa builder
+/−, p79/p85) and **Ikatan Nombor** (bond diagram + pick missing part, p84/p86). Bina Blok
self-judges → `handlePick('ok'|'no')` via shared `SemakButton`; the other three use the options
grids (answer = correct option id). `BondDiagram` SVG. Round compositions (10 each):

### 18.2 Mudah
- **2 M1** keypad `a+b=?` (`a,b∈1..9`, sum ≤18) · **3 Warnai** (4 expr options, target 11–16,
  exactly 1 == target) · **3 Padankan** (`{given}+?={target}`, 4 number options 1–9, exactly 1
  correct) · **2 Bond** (whole 8–18).

### 18.3 Sederhana — NO regrouping
- **2 S1** keypad column (`VerticalSum`, no-carry) · **3 Bina Blok** (no-carry sum) ·
  **3 Padankan** · **2 Bond**.

### 18.4 Sukar — WITH regrouping
- **2 K1** keypad column (`VerticalSum`, needs-carry) · **3 Bina Blok** (carry sum) ·
  **3 Bond** · **2 Padankan**.

`VerticalSum` (column add) reused by S1+K1; `genSederhanaS1`/`genSukarK1` also feed Bina Blok.
Removed the old keypad-only M2/S2/K2 generators + content comps.

### 18.5 DoD (card-level) — in addition to §9
- [ ] Level picker (Mudah/Sederhana/Sukar) → per-level round of 10; `Tukar Aras` resets to picker.
- [ ] Each level uses ≥4 distinct interaction formats; keypad ≤2 of 10.
- [ ] Warnai: 4 expr options, exactly 1 == target, all distinct, answer id maps to it.
- [ ] Padankan: 4 number options (1–9), exactly 1 completes `{given}+?={target}`, answer maps to it.
- [ ] Bond: 3 distinct options incl. the missing part; answer id maps to it; part+missing=whole.
- [ ] Bina Blok: total = a+b, **buildable** (tens ≤9, ones ≤9, sum ≤99); Sederhana no-carry,
      Sukar needs-carry. Self-judges built === total.
- [ ] All self-judged widgets reset internal state on `qid`; submit ONLY via Semak (no auto).
- [ ] `VerticalSum`, `BondDiagram`, Bina-Blok blocks all self-contained (iOS-safe).
- [ ] Module-2 BLUE theme; primitive `'latihan-tambah'` wired: topic page `LatihanTambah.jsx`
      (§9, showToggle/showReadyCta false, onExit), App.jsx lazy route + **append to
      `MT_MODULE2_ORDER` after `kenali-tambah`**, `MatematikExplore` case, hub card in
      `TambahDanTolakModule` TOPICS (pill `LATIHAN TAMBAH`, ROBOT, desc ≤10 words). Build exit 0;
      scene bg + 80% gate inherit; no regression to 2.1 or Module 1.
- [ ] *Cepat* timed-mode toggle is **deferred** to the Latih Tubi track (do NOT build here).

---

## 19. Module 4 blueprint — WANG (use Modules 1–3 as the locked implementation style)

> This module must follow the exact implementation discipline already proven in Modules 1–3.
> Treat Module 1–3 as the build blueprint, not inspiration.

### 19.1 Locked implementation rules for every Module 4 slice

- Use the **same shell contract** as Modules 1–3:
  - `MatematikTopicShell`
  - `MatematikExplore` where practical
  - `showToggle={false}`
  - `showReadyCta={false}`
  - empty hero title/banner fields unless the card explicitly needs a formal header
- Use the **same responsive layout discipline** as Modules 1–3:
  - fully responsive on phone + tablet + desktop
  - all sizes with `clamp(min, Nvmin, max)`
  - no content clipping
  - no horizontal overflow
  - single-screen question layout on tablet/desktop
  - avoid page scroll during active questions unless completion/report state genuinely needs it
- Use the **same interaction rhythm** as Modules 1–3:
  - one prompt
  - one main visual focus
  - one answer zone
  - one action zone
- Use the **same answer feedback pattern**:
  - correct = sound + confetti
  - wrong = clear correction state
  - no extra dead-space celebration banners
- Use the **same score/report framing** as Modules 1–3:
  - 10-question rounds for Belajar cards unless a spec below says otherwise
  - footer trio uses the same hard-gated challenge style proven in Module 3
  - `Cabar Minda` / exam must stay on a **single-screen pre-start page** with no scroll
- Reuse existing helpers and patterns before inventing new ones:
  - `MatematikActivityFrame`
  - `NumOptionsGrid`
  - `WordOptionsGrid`
  - `KeypadInput`
  - shared shell/topbar/theme patterns
  - any reusable money visuals extracted cleanly from `CountingMoney.jsx`

### 19.2 Source-of-truth content reference for Module 4

Use these as the primary content blueprints:

- `src/components/MatematikPage/Tahun1/Module1_Nombor/CountingMoney.jsx`
- `src/components/MatematikPage/MATEMATIK.md` Tahun 1 wang scope

The Year 1 money scope to preserve:

- recognise Malaysian money
- know the value of coins / notes
- count totals
- simple exchange / equivalent amount thinking
- simple story problems about price, pay, and change

### 19.3 Locked Module 4 card list

Module 4 must be built as:

1. `Kenali & Nilai Wang`
2. `Tukar Wang`
3. `Dapat & Catat Wang`
4. footer trio:
   - `Selesaikan`
   - `Latih Diri`
   - `Cabar Minda`

### 19.4 Locked Module 4 theme

Use a money-specific green theme, not the old purple placeholder:

```js
const THEME = {
  accent: '#10B981',
  dark: '#047857',
  cd: '#065F46',
};
```

Page/stage gradients may be richer, but the shell contract above still applies.

---

## 20. Card spec — Slice 4.1 "Kenali & Nilai Wang" (image-grounded)

> Combines **Kenali Wang + Nilai Wang**. Ground this card in the old Year 1 money game
> (`CountingMoney.jsx`) but rebuild it in the Module 1–3 style. New file:
> `KenaliNilaiWang.jsx`. Prefer `MatematikExplore` + a dedicated money primitive or a
> compact local `MatematikActivityFrame` implementation if that is the smaller diff.

### 20.1 Learning goal

The child can:

- recognise common Malaysian money visuals
- match a coin/note to its value
- identify the total of a very small same-screen set

### 20.2 Allowed denominations for Tahun 1

Use a small, clean Year 1 set:

- syiling: `5 sen`, `10 sen`, `20 sen`, `50 sen`
- wang kertas / ringgit: `RM1`, `RM5`, `RM10`

Keep visuals simple, countable, and readable on small screens.

### 20.3 Activity formats — FIVE question types

- **Q1 — Yang manakah `{nilai RM}`?**
  - no main card visual
  - prompt names one specific ringgit value such as `RM1.00`, `RM5.00`, or `RM10.00`
  - show 4 answer options
  - exactly 1 option matches that prompt value
  - the other 3 are sen distractors
- **Q2 — Yang manakah `{nilai sen}`?**
  - no main card visual
  - prompt names one specific sen value such as `5 sen`, `20 sen`, or `50 sen`
  - show 4 answer options
  - exactly 1 option matches that prompt value
  - the other 3 are ringgit distractors
- **Q3 — Kira jumlah kecil**
  - show a very small set of 2–4 coins/notes
  - child picks the total
  - keep totals simple and visually countable
- **Q4 — Mana lebih kecil?**
  - show two money visuals or two tiny groups
  - ask `Mana lebih kecil?`
  - exactly one correct answer
- **Q5 — Mana lebih besar?**
  - show two money visuals or two tiny groups
  - ask `Mana lebih besar?`
  - exactly one correct answer

### 20.4 Round composition

Each session:

- randomly choose **2 question types** from `Q1` to `Q5`
- build a **10-question round**
- use only those 2 chosen types for that round
- shuffle the final round before play

### 20.5 UI / layout rules

- question screen must fit on one screen on tablet/desktop
- visuals must stay large enough to recognise instantly
- answer buttons must remain at least 44px hit area
- no scroll during active questions
- keep options to 2–4 only

### 20.6 DoD (card-level)

- [ ] Round = 10 using the random 2-type session rule above
- [ ] Q1/Q2 use no main card visual, only 4 answer options with exactly 1 correct option
- [ ] All money visuals are readable and distinct on mobile
- [ ] Totals are simple and unambiguous
- [ ] No clipped notes/coins or overflowing labels
- [ ] Topic page follows §19.1 shell/layout contract
- [ ] Build exit 0 and no regression to Modules 1–3

---

## 21. Card spec — Slice 4.2 "Tukar Wang" (image-grounded)

> Focus this card on **equivalent amounts / exchange**, not story problems. New file:
> `TukarWang.jsx`.

### 21.1 Learning goal

The child can see that the same value can be made with different coins/notes.

### 21.2 Allowed scope

Keep every amount within easy Tahun 1 mental range:

- `10 sen` to `RM10`
- use only denominations listed in §20.2
- avoid dense arithmetic
- the point is equivalence, not long calculation

### 21.3 Activity formats — THREE types

- **Type A — Padan nilai sama**
  - show one target amount on the left
  - child picks which option has the same value
  - examples:
    - `50 sen` ↔ two `20 sen` + one `10 sen`
    - `RM 2` ↔ two `RM 1`
- **Type B — Lengkapkan tukaran**
  - show a partly built exchange such as:
    - `RM5 = RM1 + RM1 + RM1 + ?`
    - `50 sen = 20 sen + 20 sen + ?`
  - child picks the missing denomination
- **Type C — Pilih cara lain**
  - show one complete amount and ask for another way to make it
  - 3–4 options, exactly one equivalent

### 21.4 Round composition

10 questions total, shuffled:

- 4 × Type A
- 3 × Type B
- 3 × Type C

### 21.5 UI / layout rules

- always keep the full equation/group visible on one screen
- use compact note/coin chips, not giant banners
- avoid long text
- the equivalence must be visually obvious after reveal

### 21.6 DoD (card-level)

- [ ] Every question has exactly one valid equivalent answer
- [ ] No hidden overflow in long money combinations
- [ ] All active questions stay single-screen on tablet/desktop
- [ ] Topic page follows §19.1 shell/layout contract
- [ ] Build exit 0 and no regression

---

## 22. Card spec — Slice 4.3 "Dapat & Catat Wang" (image-grounded)

> This card covers simple money-gain situations plus recording the amount. New file:
> `DapatCatatWang.jsx`.

### 22.1 Learning goal

The child can:

- see money received
- total it correctly
- match or record the amount

### 22.2 Activity formats — THREE types

- **Type A — Dapat wang, kira jumlah**
  - show a child receiving 2–4 coins/notes
  - child picks total value
- **Type B — Catat jumlah**
  - show a small set of money
  - child records/selects the written amount
  - prefer keypad only if it stays simple and single-screen; otherwise use options
- **Type C — Pilih catatan yang betul**
  - show the money set
  - 3–4 written amount options
  - exactly one correct

### 22.3 Round composition

10 questions total, shuffled:

- 4 × Type A
- 3 × Type B
- 3 × Type C

### 22.4 UI / layout rules

- keep the “received money” story tiny and visual-first
- no long paragraphs
- if keypad is used, it must still fit one screen without pushing the footer off-screen
- if keypad makes the layout cramped, use multiple-choice instead

### 22.5 DoD (card-level)

- [ ] Round = 10 with the split above
- [ ] Recording format is consistent (`5 sen`, `50 sen`, `RM1`, `RM10`, etc.)
- [ ] Active question layout remains single-screen on tablet/desktop
- [ ] Topic page follows §19.1 shell/layout contract
- [ ] Build exit 0 and no regression

---

## 23. Footer trio spec — Slice 4.F "Selesaikan · Latih Diri · Cabar Minda"

> Build this exactly in the spirit of Module 3 and the completed Module 1/2 footer work.
> The footer trio must feel like the same family as Modules 1–3, not a new system.

### 23.1 Selesaikan Wang

- Use practical money word problems
- Keep Year 1 level only
- Focus on:
  - total price
  - paying with a note
  - simple change / baki
- 10-question round
- may reuse clean parts of old `CountingMoney.jsx`

### 23.2 Latih Diri Wang

- Fast mixed drill, lighter than `Selesaikan`
- 10-question round
- all questions should resolve quickly
- prefer multiple-choice first
- good types:
  - identify value
  - count total
  - choose equivalent amount
  - choose correct record

### 23.3 Cabar Minda Wang

- Use the **same formal exam format style as Module 3**
- Pre-start screen must stay on one screen with no scroll
- Formal header and start CTA
- harder mixed paper from the Module 4 content pool
- **30 questions**
- **30-minute** pre-start copy is acceptable if the implementation mirrors Module 3
- **80% pass gate**
- no repeated question signatures within one exam run

### 23.4 Footer DoD

- [ ] all 3 footer cards are live from the Wang hub
- [ ] `Selesaikan` works as a proper problem-solving set
- [ ] `Latih Diri` works as a fast mixed drill
- [ ] `Cabar Minda` matches the same formal exam style used in Module 3
- [ ] exam intro is single-screen and non-scrolling
- [ ] build exit 0, runtime clean
