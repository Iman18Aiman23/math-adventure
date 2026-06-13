# Gamification Implementation Status

> **Agent handoff doc — read this first.** Last updated: 2026-06-12 (Tasks 1–2 done).
> Plan docs (same folder): `GAMIFICATION_IMPLEMENTATION_INDEX.md` (master index),
> `GAMIFICATION_UNIFIED_PLAN_REVISED.md` (phased plan — the old `GAMIFICATION_UNIFIED_PLAN.md` is superseded),
> `GAMIFICATION_UI_MOCKUPS.md` (component mockups + design tokens),
> `GAMIFICATION_A11Y_MOBILE_SPEC.md` (accessibility/mobile rules),
> `GAMIFICATION_TYPES.md` (TypeScript interfaces).

## Workflow rule (user requirement)

Work **incrementally, one slice at a time**. Ask the user which slice to do next,
deliver it, let the user verify, update this file, then ask again.
**Never bulk-execute multiple phases/slices.**
Do NOT test with Python/Playwright scripts (user finds it too slow) — user tests manually in browser.

## ✅ Done

### Phase 0 — Foundation (complete, verified working)

| File | Purpose |
|---|---|
| `src/services/gamificationConstants.js` | XP economy: 10/correct, +5 streak (3+), +15 completion, crown bonus = crownLevel×8; LEVEL_THRESHOLDS [0,100,250,500,800,1200,1700,2300,3000,4000], max level 10, max crown 5; STORAGE_KEY `math-adventure-v2`; AWARD_COOLDOWN_MS 2000 |
| `src/services/GamificationRepo.js` | Abstract repository base class |
| `src/services/LocalGamificationRepo.js` | localStorage impl: optimistic locking (`_version`), cross-tab `storage`-event → `gamification-sync` CustomEvent, quota status, validateAndRepair |
| `src/services/QuotaManager.js` | Size estimate, archive logs >30 days, compress wrongQuestions |
| `src/services/legacyMigration.js` | Absorbs old keys `mathAdventureData`, `gameData`, `bm-progress` into v2 schema, then deletes them. Idempotent. |
| `src/services/UserId.js` | `getUserId()` etc., key `math-adventure-user-id` |
| `src/contexts/GamificationContext.jsx` | Provider + `useGamificationRepo()`. **Must stay `.jsx`** (contains JSX) |
| `src/hooks/useGamification.js` | Main hook: `{loading, xp, coins, level, streak, completedTopics, awardXP, completeTopicAttempt, getTopicLevel, isTopicCompleted, getTopicWrongQuestions}` |
| `src/types/gamification.d.ts` | Type definitions |
| `src/App.jsx` | Wrapped in `<GamificationProvider>`; runs `migrateLegacyData()` on mount (ref-guarded against StrictMode double-run) |

### Phase 1 — BM Tahun 1 (5 slices done & verified: XP awards, StatsBar, CrownDisplay, XpToast, anti-farming)

1. **XP awards** — `BMLessonQuizLayout.jsx` (shared by all BM T1 quiz topics) now awards:
   +10 XP per correct answer, +5 streak bonus from 3rd consecutive correct,
   and calls `completeTopicAttempt(topicId, score, totalRounds)` on pass (≥70%) → crown level up
   + completion XP. Verified on Modul 1 · Huruf Vokal (`MengenalHuruf.jsx`).

2. **StatsBar** — new `src/components/_shared/StatsBar.jsx`:
   - Shows XP, coins, level, streak in a gradient bar (`#667eea → #764ba2`)
   - Mobile: compact emoji+value layout (no labels), rounded bar
   - Desktop (≥768px): full labels with separators between stats
   - Streak fire emoji has a gentle flicker animation
   - Pulse animation on value changes (detected via XP ref comparison)
   - Dark mode variant (`#1a1a2e → #16213e`)
   - Reduced-motion support
   - Full ARIA: `role="region"`, per-item `aria-label`, `aria-live="polite"` on dynamic values, `aria-hidden="true"` on emojis
   - Integrated at top of result screen in `BMLessonQuizLayout.jsx` (Phase 1 temp placement)
   - **TASK 2 (2026-06-12):** StatsBar now shows on the BM module hub. FINAL placement:
     rendered in the page shell `BahasaMelayuModulePage.jsx` as a third header tier
     (`.bm-stats-band`, white surface, max-width 480px centered) between the module tabs
     (`BahasaMelayuModuleNavBar`) and `.bm-module-content`. It is NOT inside
     `BMModuleHubLayout` — placing it there floated it in the white gap above the orange
     trail (looked disconnected). Header reads: back/year → module tabs → stats → trail.
     Only renders on the hub (topic view bypasses BahasaMelayuModulePage). Covers all BM years.
   - **StatsBar layout fixes (2026-06-12, desktop):** (a) coin emoji `🪙`→`💰` (U+1FA99 has
     no glyph on Windows 10, rendered as □); (b) items now use `flex: 1 1 0` (equal columns,
     each centers its own content) instead of relying on root `justify-content` — desktop
     `justify-content: center` packed all items into the middle of the wide bar. Mobile was
     unaffected because it used `space-around`. flex:1 behaves identically at all widths.
   - **Code-reviewed 2026-06-12**, two bugs found & fixed (see lessons 4–5 below)

## ⚠️ Hard-won lessons (do not regress)

1. **Effect deps**: `useGamification()` returns a NEW object every render. Effects must depend on
   the destructured stable callbacks (`awardXP`, `completeTopicAttempt`) — depending on the whole
   `gamification` object caused an infinite confetti/XP/localStorage loop (severe lag).
   Use fire-once ref guards: `awardedIdxRef` (once per question), `completionHandledRef`
   (once per run). Reset them in a SEPARATE effect keyed ONLY on `[finished]` — resetting inside
   the completion effect (which has `score` in deps) zeroed `streakRef` after every answer,
   so the streak bonus never fired.
2. **Imports**: import `GamificationContext` WITHOUT extension everywhere. A stale duplicate
   `.js` beside the `.jsx` + mixed-extension imports caused a Vite 404 → white screen.
   If module-resolution weirdness appears: delete `node_modules/.vite`, restart dev server.
3. Rate limiter in `awardXP` (`lastAwardTimeRef`) throttles `'quiz'` source via `AWARD_COOLDOWN_MS`.
   ⚠️ It was 2000ms, which SILENTLY DROPPED legitimate per-answer +10 XP (a child answers faster
   than every 2s → StatsBar total came up short; user caught this 2026-06-12). Now **150ms** — it's
   a loop-rate cap only (stops a pathological render-loop), never an answer-rate limit. Don't raise
   it back toward human-answer timescales. `streak_bonus`/`topic_completion` are not throttled.
4. **Repo must be a singleton**: `GamificationContext.jsx` uses a module-level `defaultRepo`.
   Never use `repo = new LocalGamificationRepo()` as a default parameter — it constructs a fresh
   repo (+ leaks a window `storage` listener) on EVERY provider render and churns the context value.
5. **Same-tab sync**: browser `storage` events only fire in OTHER tabs. `LocalGamificationRepo._write()`
   dispatches `gamification-sync` after every write so independent `useGamification` instances
   (e.g. StatsBar vs quiz layout) stay fresh in the same tab. Without this, StatsBar showed stale XP
   (missed the completion bonus). Safe: the sync handler only reads, never writes — no loop.
6. **Timers vs re-renders**: every XP award re-renders the layout (hook state + sync reload), so any
   effect with an unstable callback in its deps (e.g. an inline `onDone`) gets cleaned up mid-flight
   and its `setTimeout` dies. Pattern: keep the callback in a ref, key the timer effect on the
   minimal trigger (`visible`), and `key=`-remount per occurrence to replay CSS animations.

## 🧭 Strategic direction (set 2026-06-12) — BM is the blueprint

Plan change by user: **complete Bahasa Melayu gamification first and treat it as the canonical
blueprint**, then RESTRUCTURE Matematik (MT) and Pendidikan Islam (PI) to match BM's
architecture + UI/UX rather than retrofitting gamification onto their current standalone
structures.

BM blueprint = the pattern to replicate for MT/PI:
- Shared lesson/quiz layout (`BMLessonQuizLayout`) used by all topics in a subject
- Module hub with serpentine trail + crown nodes (`BMModuleHubLayout` + `CrownDisplay`)
- Page-shell header chrome with StatsBar (`BahasaMelayuModulePage` → `.bm-stats-band`)
- XpToast on correct answers; anti-farming + streak in the data layer (already subject-agnostic)

⚠️ **TASK 3 (piecemeal MT wiring) is SUPERSEDED** by this restructure approach. The lone wired
game (Tambah100, `mt-t1-tambah-100`) is now an orphan partial — see open decision below.

## 🔍 BM gamification coverage audit (2026-06-12)

54 BM topic components total (T1/T2/T3, all modules). Gamification flows ONLY through
`BMLessonQuizLayout` — **zero** topics call `useGamification` directly. Coverage:

| Group | Count | Harness | XP/crowns now? | Leverage |
|---|---|---|---|---|
| Gamified | 20 | `BMLessonQuizLayout` | ✅ yes | done |
| Std-shell | 4 | `BMStdShell` + `BMStdComplete` | ✅ DONE 2026-06-12 (wired `BMStdComplete` once) | — |
| Header-quiz | 18 | `BMHeader` only, each owns its quiz state | ❌ no | **mostly NOT MCQ quizzes — see triage** |
| Standalone | 12 | none / `Celebration` only | ❌ no | per-topic; many non-quiz (tracing/writing) |

### ⚠️ Header-quiz group is NOT a wireable batch (investigated 2026-06-12)

Survey of all 18 found they are heterogeneous and mostly do NOT fit the quiz gamification model
(per-correct XP + score% crown gate):
- Only 2 have a `TOPIC_ID` + report completion: **DengarBuat** (`1-1-8-dengar-buat`) and
  **KenalkanDiri** (`1-1-9-kenalkan-diri`) — but BOTH are activities, not scored quizzes:
  DengarBuat = "listen & do", KenalkanDiri = microphone speaking. They complete by progressing
  through items (no pass gate). The quiz XP model doesn't fit cleanly.
- The other 16 never call `topicComplete` (no completion infra) and split on score semantics
  (`+1` vs `+10`); **Dialog, Lagu, ApresiasiSastera have NO scoring** = non-quiz (song / dialogue
  / literature appreciation).
- Standalone 12 similarly include tracing (`KonsonanBJ/KR/SZ`, `MenulisVokal`, `LetterTraceLesson`)
  and open writing — also non-quiz.

**Conclusion:** BM's *scored MCQ quiz* topics are now ALL gamified (24/54). The remaining 30 are
predominantly non-quiz activities (speaking, listening-do, tracing, song, dialogue, open writing)
where forcing per-correct XP would fabricate meaningless rewards. A handful of true-MCQ stragglers
(e.g. some T3 reading/grammar: `MembacaKritikal`, `TeksKompleks`, `ImbuhanMajmukGanda`,
`JenisJenisAyat`) lack shared-layout/completion infra and would each need bespoke structural work.

**DECISION (user, 2026-06-12):** completion crowns for FINISHABLE activities; open-ended
creative stay exempt. This is the blueprint rule for MT/PI too.

### ✅ Completion-crown primitive + first 2 activities (2026-06-12) — awaiting user verify

New data-layer primitive `markActivityComplete(topicId, subject='bm')` in `useGamification.js`
(exposed in hook return). For NON-quiz activities: finishing once → crown 1 + flat
`XP_PER_COMPLETION_BONUS` (15) XP. Idempotent/first-completion-capped (repeats only bump
`attempts`, no XP/crown). Distinct from `completeTopicAttempt` (scored quizzes). This is the
blueprint primitive for all finishable activities across BM/MT/PI.

Two BLUEPRINT PRIMITIVES now exist — pick per topic type:
- `completeTopicAttempt(topicId, score, total)` — scored MCQ quizzes (XP scales with %, crown).
- `markActivityComplete(topicId)` — finishable activities (no score; flat XP + crown on finish).

Wired (both call it in their `advanceItem` end-branch, alongside the existing `topicComplete`):
- **DengarBuat** `1-1-8-dengar-buat` (listen-and-do) ✅
- **KenalkanDiri** `1-1-9-kenalkan-diri` (mic speaking) ✅
Both IDs verified in `ModuleData.js` → crowns show on trail. No once-guard needed (data layer
is first-completion-capped; advanceItem fires once at end).

**BM coverage now 26/54.** Remaining finishable activities to wire with `markActivityComplete`
(next): tracing topics — `KonsonanBJ/KR/SZ`, `MenulisVokal`, `LetterTraceLesson` (T1 Menulis);
plus verify each has a TOPIC_ID matching ModuleData + a clear completion point. Exempt (creative,
no crown): Lagu, ApresiasiSastera, Dialog, open-writing/karangan-style. A few true-MCQ stragglers
(`MembacaKritikal`, `TeksKompleks`, `ImbuhanMajmukGanda`, `JenisJenisAyat`) → `completeTopicAttempt`
if/when given shared completion infra.

**Now gamified: 24 of 54.** Std-shell slice done — see below.

### ✅ Std-shell slice (4 topics, 2026-06-12) — awaiting user verify

Gamified `BMStdComplete.jsx` (the shared result screen) ONCE: added `useGamification(subject)`
+ a once-guarded effect that, on mount, awards `score × XP_PER_CORRECT` as `'quiz'` XP and (if
passed) calls `completeTopicAttempt(topicId, score, total)`. New props `topicId` (required to
fire) + `subject='bm'`. Order matters: per-answer XP awarded BEFORE `completeTopicAttempt` so the
first completion gets full rate (anti-farming reads crownLevel, which completion bumps to 1) —
repeats auto-drop to practice-rate. The 4 topics now pass `topicId={TOPIC_ID}`:
- GolonganNamaLesson → `1-5-1-morfologi-kata`
- KerjaAdjektifLesson → `1-5-6-kerja-adjektif`
- HubungSendiLesson → `1-5-7-hubung-sendi`
- TanyaGantiLesson → `1-5-8-tanya-ganti`

All 4 IDs verified against `ModuleData.js` → crowns show on the BM trail. With SintaksisAyat (5.5,
already on BMLessonQuizLayout), **Module 5 Tatabahasa is fully covered.**

⚠️ ~~Tradeoff: std-shell topics batch per-answer XP at completion, no live toast/streak.~~
**SUPERSEDED 2026-06-13** — see "Std-shell → live per-answer XP" below.

### ✅ Std-shell → live per-answer XP + streak + toast (2026-06-13) — awaiting user verify

User report: StatsBar XP didn't reflect during play for Modul 5 topics (+ activities 1.8/1.9),
and the toast looked different from 1.1. Root cause: BMStdComplete BATCHED per-answer XP at the
result screen (no live StatsBar movement, no toast, no consecutive-streak bonus) — unlike 1.1's
live BMLessonQuizLayout. Fix (this slice): moved per-answer XP to LIVE in each Modul 5 lesson via
`useTopicGamification(TOPIC_ID)` → `awardCorrect()` on the correct branch of `handleSelect`,
`awardWrong()` on the wrong branch (both added to the callback deps). This gives +10 live XP,
the +5 every-5th streak bonus, and the GlobalXpToast — identical to 1.1. `BMStdComplete` no longer
calls `awardXP` (removed the `score×XP_PER_CORRECT` batch + the `XP_PER_CORRECT` import); it now
ONLY records the crown + first-completion bonus via `completeTopicAttempt`, gated on `passed`.
Files: BMStdComplete.jsx + GolonganNamaLesson / KerjaAdjektifLesson / HubungSendiLesson /
TanyaGantiLesson (4 lessons). SintaksisAyat (5.5) already live via BMLessonQuizLayout.
### ✅ Toast position unified (2026-06-13) — awaiting user verify

`BMLessonQuizLayout` (the 1.1-style quiz layout) now fires the SHARED `GlobalXpToast` instead of its
own inline toast: in the per-answer award effect it dispatches `window 'xp-toast'` (detail `{xp,
streakBonus}`) instead of `setXpToast`. Removed the inline `<XpToast>` render, the `.bm-quiz-toast-area`
CSS, the `xpToast` state, `handleToastDone`, the `XpToast` import, and the now-unused `useState`
import. Net: EVERY BM topic now shows the identical toast in the identical place via the single
GlobalXpToast. **Position (2026-06-13, user request):** GlobalXpToast is mounted INSIDE
`.app-container` (not app root) and uses `position:absolute; inset:0; flex center both axes` so the
toast appears dead-center of the play area — `.app-container` is position:relative, so on desktop it
auto-offsets from the sidebar (was previously fixed top-center of the viewport).

### ✅ T1 finish-up — Menulis tracing (M3) + Dialog (M4) (2026-06-13) — awaiting user verify

Wired the remaining Tahun 1 activities:
- **Tracing (T1 M3 Menulis)** — wired the SHARED `LetterTraceLesson` ONCE (it already receives
  `topicId` from each wrapper): added `useTopicGamification(topicId)` + a once-guarded effect on
  `finished` → `completeActivity()`. Covers all 4 wrappers: MenulisVokal `1-3-1`, KonsonanBJ `1-3-2`,
  KonsonanKR `1-3-3`, KonsonanSZ `1-3-4` (IDs verified vs ModuleData). Two finish paths (auto on last
  letter / Finish button) both set `finished`; the single effect awards once. No per-stroke XP (pure
  tracing, no scored answers) — completion crown + flat bonus only.
- **Dialog (T1 M4)** `1-4-1-dialog` — roleplay HAS real right/wrong line-picks, so full treatment in
  `DialogRoleplayPage`: `awardCorrect()`/`awardWrong()` in `handlePick`, `completeActivity()` in
  `advance()` when the scene ends (RP_COMPLETE). Added `TOPIC_ID` const (was missing). Lagu `1-4-3`
  stays EXEMPT (creative/song — no scoring).

**BM coverage now ~39/54.** T1 modules 1–5 effectively complete (every scored/finishable topic
gamified; only creative Lagu exempt). Remaining: T2 header-quiz (6) + T3 quiz stragglers + a couple
of T3 creative-exempt. Then freeze BM and start MT (TASK 3).

### ✅ Hearts (life) + Gems added to v2 (2026-06-13) — awaiting user verify

User asked for the fuller HUD that the OLD `gameStatsManager` games (e.g. MathOperationsGame) have:
XP + Life + Gems. Decisions: **gems REPLACE coins** (+1 per correct answer), **hearts are gentle**
(regenerate over time, NEVER lock the lesson). Built into the v2 data layer + the single
`useTopicGamification` choke point, so every already-wired topic inherits them for free.
- `gamificationConstants.js`: `GEMS_PER_CORRECT=1`; `MAX_HEARTS=5`, `START_HEARTS=5`,
  `HEART_REGEN_MS=5min`. `COINS_PER_10_XP` kept but deprecated/unused.
- Player schema (`LocalGamificationRepo`): added `hearts`, `maxHearts`, `heartsUpdatedAt` to both
  defaults + `_defaultPlayer` + the optimistic-lock merge branch (hearts take writer's value, not max).
  **Gems are stored in the existing `coins` field** (no migration; legacy consumers unaffected).
- `useGamification`: `heartsNow(player)` computes display hearts incl. time regen (stored value is
  as-of `heartsUpdatedAt`); `awardXP` now grants +1 gem only on `source==='quiz'` (per correct) instead
  of deriving coins from XP; new `loseHeart()` (realizes regen, −1 floor 0, resets clock); returns
  `hearts`, `maxHearts`, `gems` (+ `coins` alias), `loseHeart`.
- `useTopicGamification`: `awardWrong()` now also calls `loseHeart()`. `awardCorrect()` already routes
  through `awardXP('quiz')` → +1 gem automatically.
- `StatsBar`: now shows ❤️ hearts · 💎 Gems · ⭐ XP · 🔥 streak · Lv (was 🔥/⭐/Lv/💰). 5 items.
- Build verified clean (1m31s).
⚠️ NOT YET DONE (future slices if wanted): a SHOP to spend gems (earn→spend loop still open); hearts
have no live ticking timer (refresh on navigate/answer/sync — fine for gentle); the OLD
`gameStatsManager` games (MathOperationsGame, PI/Reading) still use their own separate `gameData`
hearts/gems — not unified with v2 yet. Hearts/gems are GLOBAL (on player), shared across subjects.

### ✅ In-quiz HUD: ❤️/💎 on the progress bar — BMLessonQuizLayout (2026-06-13) — awaiting user verify

During play the quizzes only showed a local `⭐ score` pill; hearts/gems lived only on the hub
StatsBar. Added live ❤️ hearts + 💎 gems pills to the in-quiz stats row of `BMLessonQuizLayout`
(right group: ❤️ · 💎 · ⭐), reading `hearts`/`gems` from `useGamification`.
**Also fixed a real gap:** BMLessonQuizLayout uses its OWN inline `awardXP` path (not
useTopicGamification), so its wrong branch never lost a heart — only reset the streak. Now the wrong
branch calls `loseHeart()` (guarded by the same `awardedIdxRef !== idx` once-per-question check that
gates the award). Gems already worked there (awardXP('quiz') → +1 gem). New pill CSS: `.bm-pill.life`
(rose) + `.bm-pill.gem` (sky) + `.bm-pill-group`.
### ✅ In-quiz HUD ❤️/💎 extended to ALL T1 (2026-06-13) — awaiting user verify

Added live ❤️/💎 pills to the remaining in-play headers so every T1 Kuiz/activity HUD is consistent:
- `useTopicGamification` now ALSO returns `hearts`, `gems`, `maxHearts` (for display) — so any topic
  using the hook can render the HUD with no extra wiring.
- **BMStdShell** (Modul 5, shared): added `useGamification(subject)` (new `subject='bm'` prop) →
  ❤️ · 💎 · ⭐ group. Covers all 4 Modul 5 lessons.
- **DengarBuat / KenalkanDiri / Dialog**: destructure `hearts`/`gems` from their existing
  `useTopicGamification` call; added ❤️/💎 pills to each bespoke stats row (inline styles for
  DengarBuat; `.kd-pill.life/.gem`, `.drp-pill.life/.gem` for the others). Note DengarBuat has no
  wrong path so its hearts don't drop there (display only) — by design.
- Pill palette is consistent everywhere: life = rose (#FFE9EC/#E11D48/#FCA5B4), gem = sky
  (#E0F2FE/#0369A1/#7DD3FC). Build verified clean (44s).

**All of T1 now shows ❤️/💎 live in-play.** Open items unchanged: gem SHOP (earn→spend) not built;
old gameStatsManager games not unified.

### ✅ T2 coverage — all 6 remaining quizzes wired (2026-06-13) — awaiting user verify

Wired the 6 not-yet-gamified Tahun 2 topics via `useTopicGamification` (none had a TOPIC_ID before —
added each, verified vs ModuleData). Two patterns:
- **Pattern A (MCQ `handleSelect`, score+=10, `isDone`)** → `completeTopic(correct, total, 70)` via a
  once-guarded `useEffect` on `isDone`; `awardCorrect`/`awardWrong` in handleSelect:
  PembentukanPerkataan `2-5-2` + MorfologiPerluasan `2-5-1` (both track `totalCorrect` → pass that),
  MentafsirMenaakul `2-2-3` + TeksPelbagaiGaya `2-2-2` (no totalCorrect → pass `score/10`,
  totals `TOTAL_ITEMS`/`TOTAL_QUESTIONS`).
- **Pattern B (speak/listen `handleCorrect`/`handleWrong`, score+=1, `PHASE_COMPLETE`)** → like
  KenalkanDiri: `awardCorrect`/`awardWrong` + `completeActivity()` in advanceItem's end branch:
  MendengarMerespons `2-1-1`, BerceritaBerbincang `2-1-2`.
All get +10 XP + gem on correct, heart loss on wrong, streak bonus + toast, crown on completion.
ApresiasiSastera `2-4-1` stays EXEMPT (creative). Already-gamified T2 (PerkataanSukar,
HasilkanPenulisan, JawapanPemahaman, MenulisMekanis, PersembahanKarya, SintaksisAyatMajmuk) untouched.
Build verified clean (43s). **BM coverage now ~45/54 — T1+T2 effectively complete.**
⚠️ These T2 headers still show their own ⭐ (and 🔥) pills only — in-quiz ❤️/💎 DISPLAY not added to
T2 yet (logic works; display is the same follow-up as before). Remaining: T3 quiz stragglers. The award/streak logic (awardedIdxRef once-
guard, streakRef, Promise.all for actual amounts) is unchanged. `XpToast.jsx` is still used (by
GlobalXpToast) — not orphaned.

### ✅ Activities 1.8 / 1.9 → live per-item XP + streak + toast (2026-06-13) — awaiting user verify

Modul 5 verified by user. Then converted the two listen/speak ACTIVITIES from flat +15-once
(markActivityComplete) to LIVE per-item XP via `useTopicGamification(TOPIC_ID)`:
- **DengarBuat** `1-1-8-dengar-buat` (listen-and-do): `awardCorrect()` in `handleDone` (every "Sudah!"
  tap → +10 live + streak + toast); end of activity → `completeActivity()` (crown). No wrong path.
- **KenalkanDiri** `1-1-9-kenalkan-diri` (speaking + polite-MCQ): single `handleCorrect()`/`handleWrong()`
  funnel — `awardCorrect()` in handleCorrect, `awardWrong()` in handleWrong AND the polite-tap wrong
  branch (keeps hook streak in sync with local streak). End → `completeActivity()`. No-speech timeout
  path left as-is (not a wrong answer; local streak isn't reset there either).
Both replaced `useGamification('bm')` import with `useTopicGamification`. crownLevel still gates
first-completion (completeActivity → markActivityComplete is first-completion-capped). On replays,
awardCorrect drops to practice-rate (×0.2) like every other topic.

⚠️ `MorfologiGolonganKata.jsx` was mis-counted as std-shell. It uses `BMStdShell` for the question
screen but has its OWN inline result screen (not `BMStdComplete`), no `TOPIC_ID`, and `score += 10`
semantics (points, not count). NOT covered by this slice. Verify whether it's even routed
(ModuleData T1 M5 maps 5.1–5.5 to GolonganNama/KerjaAdjektif/HubungSendi/TanyaGanti/SintaksisAyat —
MorfologiGolonganKata may be unused/alternate). Treat as header-quiz/standalone if live.

**Gamified (20):** T1: DengarTeka, MengenalHuruf, SukuKata, FahamiCerita, MencatatMaklumat,
Pantun, JenisKataLesson, SintaksisAyat. T2: PerkataanSukar, HasilkanPenulisan, JawapanPemahaman,
MenulisMekanis, PersembahanKarya, SintaksisAyatMajmuk. T3: KomunikasiBertatasusila,
MendengarMengulas, KelancaranMembaca, MenulisKarangan, MenulisKreatif, MorfologiLanjutan.

**Std-shell (5, T1 Module5):** GolonganNamaLesson, HubungSendiLesson, KerjaAdjektifLesson,
TanyaGantiLesson, MorfologiGolonganKata. → `BMStdComplete` is the completion screen (has
`score`, `total`, `pct`, stars) — the natural single place to call `completeTopicAttempt`;
`BMStdShell` is where per-answer XP would hook. One wiring covers all 5.

**Header-quiz (17):** T1: BacaFrasaBergambar, DengarBuat, KenalkanDiri, AsasMembaca, BacaPerkataan,
MembacaMekanis, MembacaMenaakul, BinaAyat, Dialog, Lagu. T2: BerceritaBerbincang,
MendengarMerespons, MentafsirMenaakul, TeksPelbagaiGaya, ApresiasiSastera, MorfologiPerluasan,
PembentukanPerkataan. Each has its own `score`/`isDone`/mastery-gate + a legacy `topicComplete`
prop (old binary completion via `useModuleProgress`, NOT crowns).

**Standalone (12):** KonsonanBJ, KonsonanKR, KonsonanSZ, MenulisVokal, LetterTraceLesson (T1
Menulis); MembacaKritikal, TeksKompleks, MengeditTeks, ApresiasiKaryaSeni, EstetikaBahasa,
ImbuhanMajmukGanda, JenisJenisAyat (T3). ⚠️ Some are NOT multiple-choice quizzes (letter tracing,
open writing/karangan) — the per-correct-answer + score% XP model may not fit; decide per topic
whether they award XP at all.

**Note:** `topicComplete` prop (legacy binary completion) is separate from the new crown system.
Both can coexist; crowns come from `completeTopicAttempt`.

**Recommended path to "BM complete":** (1) wire `BMStdShell`/`BMStdComplete` → +5 quick;
(2) decide Header-quiz strategy — migrate the 17 onto a shared gamified harness (cleaner blueprint)
vs wire each in place; (3) triage the 12 standalone — gamify the quiz-shaped ones, exempt the
tracing/open-writing ones. Then freeze BM as the MT/PI blueprint.

## 🔧 STANDARDIZATION IN PROGRESS (2026-06-12) — gamify ALL BM topics

User: "make all Kuiz BM use the gamification path, standardize everything." Approach: every BM
topic awards XP/crowns via the right primitive. Built shared hook
`src/hooks/useTopicGamification.js` (the standardized entry point):
- `awardCorrect()` — call on EACH correct answer → +10 'quiz' XP LIVE (StatsBar updates as you
  play; partial play still counts). Mirrors BMLessonQuizLayout.
- `completeTopic(correctCount, questionCount, passPct=70)` — at completion → crown + completion
  bonus (completeTopicAttempt, first-completion-only). ⚠️ Pass CORRECT COUNT not a ×10 point
  score: topics with `score += 10` pass `score / 10`; `score += 1` topics pass `score`.
- `completeActivity()` — finishable non-quiz (speaking, tracing, read-aloud).

⚠️ **DO NOT batch XP at completion** — an earlier `completeQuiz()` version did, and the user
caught it: half-played quizzes awarded nothing and the StatsBar never moved. XP MUST be live
per-answer via `awardCorrect()`. (The old 2s award throttle that dropped fast per-answer XP is
fixed — `AWARD_COOLDOWN_MS` is now 150ms; see lesson 3.)

**XpToast + streak bonus are now standardized too (2026-06-12):** the hook tracks streak
INTERNALLY and fires the toast via a window `xp-toast` event — no per-topic streak state or toast
JSX needed. `awardCorrect()` = +10 XP, +5 every 5th consecutive correct, and dispatches the toast.
`awardWrong()` resets the streak. A single `GlobalXpToast` (in `src/components/_shared/`, mounted
once in `App.jsx` inside `GamificationProvider`) renders the fixed top-center toast over any topic
UI. BMLessonQuizLayout keeps its own inline XpToast (doesn't use the event) → no double-toast.
MT/PI inherit all of this for free.

**Recipe per quiz topic:** import hook → `const { awardCorrect, awardWrong, completeTopic } =
useTopicGamification('<id>')` → call `awardCorrect()` in the CORRECT-answer branch and
`awardWrong()` in the WRONG branch (both outside any state-updater — StrictMode double-invokes
updaters) + add both to that handler's deps → call `completeTopic(correct, total, PASS_PCT)` at the
finish branch (next to legacy `topicComplete(id)`) + add to deps. Activities: `completeActivity()`
at the end point. Use the SAME id the topic passes to `topicComplete` (verified against
`ModuleData.js`). IDs live in App.jsx routing (aliases resolve to files) — not always a const.

All 5 Module 1/2/3 quizzes wired this turn now have live XP + streak bonus + toast (awardCorrect/
awardWrong/completeTopic). MembacaMekanis = activity (completeActivity, no toast/streak).

**Progress (BM now 32/54):**
- ✅ Module 2 Membaca (T1): AsasMembaca `1-2-1` (quiz, score÷10), BacaPerkataan `1-2-4` (quiz,
  score÷10), MembacaMenaakul `1-2-3` (quiz, score÷10, TOTAL_QUESTIONS), MembacaMekanis `1-2-2`
  (read-aloud → completeActivity). All IDs verified in ModuleData.
- ✅ T1 M1 BacaFrasaBergambar `1-1-2-bertutur-maklumat` (quiz, PHASE_COMPLETE, +1 counts → pass
  totalScore/totalItems). ✅ T1 M3 BinaAyat `1-3-5-bina-ayat` (quiz, score÷10). IDs verified.

**Remaining to standardize (next batches, same recipe):**
- T1 M3 Menulis: tracing → completeActivity: MenulisVokal
  `1-3-1`, KonsonanBJ `1-3-2`, KonsonanKR `1-3-3`, KonsonanSZ `1-3-4` — ⚠️ these delegate to
  shared `LetterTraceLesson` (completion fires there via `setFinished`/`topicComplete`); wire at
  whichever level actually calls topicComplete.
- T1 M4 SeniBahasa: Dialog `1-4-1` (no score — activity if it has a clear end), Lagu `1-4-3`
  (creative → EXEMPT per decision).
- T2 (tc:0, need each topic's completion point): BerceritaBerbincang, MendengarMerespons,
  MentafsirMenaakul, TeksPelbagaiGaya, MorfologiPerluasan, PembentukanPerkataan (quizzes);
  ApresiasiSastera (creative → exempt).
- T3: MembacaKritikal, MengeditTeks, EstetikaBahasa(?), ImbuhanMajmukGanda, JenisJenisAyat,
  ApresiasiKaryaSeni (quizzes); TeksKompleks (no score — activity/exempt).
- MorfologiGolonganKata (T1 M5): bespoke result screen, score×10, no TOPIC_ID — verify if routed.

## 📋 Task queue (do ONE task at a time, in order; update this doc + ask user to verify after each)

### TASK 3 — Roll out gamification to MT (Matematik) — INCREMENTAL

**Goal:** math games award XP/crowns like BM does. Data layer is already multi-subject — use
`useGamification('mt')`.

**KEY DIFFERENCE FROM BM:** MT games do NOT share a quiz layout. Each game under
`src/components/MatematikPage/**` is fully standalone (own quiz state, confetti, sound). So each
game must be wired individually — no single-file shortcut. Wire one, user verifies, then next.

**Per-game pattern (established on Tambah100):** destructure ONLY stable callbacks
(`awardXP`, `completeTopicAttempt`) — lesson 1. MT games award in their answer EVENT HANDLER
(e.g. `handleSelect`), which is simpler/safer than BM's effect — event handlers fire once per
real click, no effect-deps loop. Put `awardXP(10,'quiz',TOPIC_ID)` there + streak bonus
(`awardXP(5,'streak_bonus',TOPIC_ID)` every 5th). Do NOT call awardXP inside a state-updater
(StrictMode double-invokes updaters → double XP); read streak from deps instead. Completion:
one `useEffect` keyed on the game's `complete` flag, ref-guarded to fire once, gated on a
mastery % (PASS_PCT 70), calling `completeTopicAttempt(TOPIC_ID, score, total)`.

**MT topic IDs (record each as wired):**
- `mt-t1-tambah-100` → Tambah100 (Tahun 1, route `tambah-tolak`). ✅ DONE 2026-06-12, awaiting verify.

**Wired games:**
1. **Tambah100** (`MatematikPage/Tahun1/Module1_Nombor/Tambah100.jsx`) — +10/correct, +5 streak
   at every 5th, crown+completion XP on `complete` if ≥70%. ⚠️ This component is ALSO reused as
   an age-group game (`App.jsx:1203`, `currentAgeGame`) — it will award 'mt' XP under the same
   topicId in that context too. Acceptable (same skill); flag if undesired. No XpToast/StatsBar
   in MT yet (optional — ask user).

**Next MT games (ask user which):** Nombor100, CountingMoney, SubtractionStory, Tambah… (T1
Nombor first, then Sukatan/Statistik). MT has no crown trail UI yet — crowns persist in data but
aren't shown on the MT module hub (`NomborModule.jsx` uses `Tahun1ModuleHubLayout`); a future
slice could add CrownDisplay there like the BM trail.

### TASK 4 — Crown mastery, levels 2–5 (OPTIONAL — confirm with user before starting)

**Goal:** crowns 2–5 are currently unreachable (anti-farming caps first completion at crown 1).
Unlock them via `CROWN_REQUIREMENTS` in `gamificationConstants.js`: a repeat run raises the
crown by 1 only if `score/total >= CROWN_REQUIREMENTS[nextCrown].passThreshold`; award that
tier's `rewardXP` (via `awardXP(..., 'topic_completion', ...)`) ONLY when the crown actually
increases. Non-qualifying repeats keep earning practice-rate XP and no crown. Implement entirely
inside `completeTopicAttempt`.

## ⏭️ Recently completed (kept for context)

### 1. Anti-farming — first-completion rewards (2026-06-12)

**Status:** ✅ Done — verified by user 2026-06-12 (covers XpToast redesign verification too).

User noticed repeating an easy quiz farms level. Chosen design (option 1): full rewards on
FIRST completion only. Implemented in the **data layer** so MT/PI inherit it automatically:
- `useGamification.awardXP`: if the topic's `crownLevel >= 1`, sources `quiz`/`streak_bonus`
  earn `PRACTICE_XP_MULTIPLIER` (0.2) of normal XP → repeats give +2/answer, +1 streak bonus.
  `awardXP` now RETURNS the actual amount awarded (0 when throttled/error).
- `useGamification.completeTopicAttempt`: crown level, completion bonus and crown-bonus XP fire
  only when `prev.crownLevel === 0` (first completion). Repeats still update
  attempts/bestScore/lastPracticed/wrongQuestions.
- `BMLessonQuizLayout`: toast shows the ACTUAL awarded amounts via
  `Promise.all([awardXP(10,…), milestone ? awardXP(5,…) : 0]).then(([base,bonus]) => setXpToast…)`;
  no toast if both are 0 (throttled).
- ⚠️ Crown levels 2–5 are currently UNREACHABLE (reserved for a future mastery mechanic,
  e.g. `CROWN_REQUIREMENTS` higher-score tiers in constants). CrownDisplay still renders 5 slots.
- **Coin-rate bug fixed in the same pass**: formula was `amount / COINS_PER_10_XP` (= ÷1 →
  1 coin per XP, 10× the documented rate). Now `Math.floor(xp / 10) * COINS_PER_10_XP`.
  Existing saves hold inflated coins; reset `math-adventure-v2` for clean testing.

### 2. XP Toast — `src/components/_shared/XpToast.jsx`

**Status:** ✅ Done — redesigned, verified by user 2026-06-12.

Shows "+10 XP" centered above the quiz card, with "+5 🔥" at streak milestones (5, 10, 15...).
Auto-dismisses after 1.8s (CSS out-animation starts at 1.45s). ARIA `role="status"
aria-live="polite"`. Dark mode + reduced-motion. Confetti stays in the layout's answer
effect — XpToast is purely presentational.

Integration in `BMLessonQuizLayout.jsx` (the `answered` effect, same `awardedIdxRef` guard
as XP awards): `setXpToast({ show, xp, streakBonus, qIdx: idx })`, rendered as
`<XpToast key={xpToast.qIdx} … onDone={handleToastDone} />` inside `.bm-quiz-toast-area`
(height:0, absolute-positioned — zero layout shift).

**Playful redesign (2026-06-12, user request):**
- Warm gradient background: `#FFFBEB`→`#FDE68A` with gold `#FBBF24` border (regular);
  `#FED7AA`→`#FB923C` with `#EA580C` border (streak)
- `::before` blur glow pulse animates while visible
- Larger sizing: number `clamp(22px, 3.6vh, 34px)`, emoji `clamp(20px, 3.2vh, 30px)`
- Three staggered bounce-ins using `cubic-bezier(.34,1.56,.64,1)`:
  emoji at 0s (rotate + scale), XP number at 0.08s (translateY + scale), streak badge at 0.16s
- Streak badge: orange gradient pill with `::before` blur glow + fire emoji wobble animation
- Shine sweep retained. Reduced motion disables all animations.

**Streak milestone fix (2026-06-12):**
- `BMLessonQuizLayout.jsx` L101: `streakRef.current >= 3 ? 5 : 0` →
  `streakRef.current % 5 === 0 ? 5 : 0`
- Bonus XP + toast badge fire ONLY at streak = 5, 10, 15... not every answer after 3.

**Lesson 6 — Timer guard vs re-renders:**
- `onDoneRef` stabilises the dismiss callback across parent re-renders (new identity each
  render would kill the timer via effect cleanup otherwise)
- `key={qIdx}` forces fresh component mount per question so CSS keyframe animation replays
- `height: 0` + `position: absolute` on toast area eliminates layout shift

### 3. Crown Display — `src/components/_shared/CrownDisplay.jsx` ✅

**Status:** ✅ Done — delivered, reviewed, verified.

Review fixes applied: (a) CrownDisplay size-dependent CSS moved from interpolated global classes
to inline styles; (b) disabled-crown dim selector corrected to `.node-disabled + .node-meta .node-crown`;
(c) dead `.completed-badge` CSS removed.
Verified topic IDs in `ModuleData.js` match `completeTopicAttempt` keys.

### 4. Daily streak tick — TASK 1 ✅

**Status:** ✅ Done — implemented 2026-06-12.

**What:** Daily streak increment logic inside `awardXP` in `src/hooks/useGamification.js:149-165`,
after player data saves. Uses local-date comparison (`en-CA` format, NOT `toISOString`):
- `lastActiveDate === today` → skip (already ticked)
- `lastActiveDate === yesterday` → `count + 1`
- otherwise → `count = 1`
- Updates `lastActiveDate`, `highestStreak`, saves via `repo.saveStreakData`, calls `setStreak`.

**Pitfalls avoided:** Lesson 1 (no new effect deps — all inside existing `awardXP` async flow);
Lesson 5 (`saveStreakData` → `_write` → `gamification-sync` so StatsBar updates automatically).

- New `CrownDisplay` component at `src/components/_shared/CrownDisplay.jsx`
  - `loading` → empty placeholder (no layout shift), `level=0` → 🔒, `level=1..5` → ⭐×level + ☆×(5−level)
  - `size='sm'` (11px), `size='md'` (15px), full ARIA, dark mode, reduced-motion
- Replaced green checkmark with `CrownDisplay` in BM trail nodes (`BMModuleHubLayout.jsx`)
- Uses `getTopicLevel(topic.id)` from `useGamification('bm')` with loading guard
- BM-only; MT/PI deferred to roll-out phase.

## Testing checklist (manual, in browser)

- Play Modul 1 Huruf Vokal quiz → correct answer fires confetti ONCE, no lag.
- localStorage `math-adventure-v2`: `player.xp/coins` increase; on pass,
  `subjects.bm.topics['1-1-1-mendengar-menyebut'].crownLevel` increments (cap 5).
- Old keys `mathAdventureData` / `gameData` / `bm-progress` absent after first load.
- To reset test data: `localStorage.removeItem('math-adventure-v2')` in console.
