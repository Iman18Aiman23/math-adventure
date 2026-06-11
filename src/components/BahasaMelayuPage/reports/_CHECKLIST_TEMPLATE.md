# 📋 Module Coverage Checklist — TEMPLATE

> Copy this file to `reports/T{year}_M{module}_COVERAGE_REPORT.md` and fill it in.
> Silibus source of truth: `BAHASA_MELAYU.md` → "Silibus Bahasa Melayu KSSR (Tahap 1)".
>
> **Status key:** ✅ PASS (fully practised AND verified by the app) · ⚠️ PARTIAL (practised but
> not verified, or receptive-only when silibus demands production) · ❌ GAP (no activity) ·
> ➖ N/A (genuinely not feasible digitally — must be justified in notes)
>
> **Honesty rule:** coverage claims use "Berdasarkan KSSR", never "Mengikut KSSR".
> A row is only ✅ if a child actually performs the skill in-app — a label or quiz that
> merely *mentions* the skill does not count.

## Report Header

| Field | Value |
|---|---|
| Tahun / Modul | Tahun _ · Modul _ — _name_ |
| App module name (hub) | |
| Topics audited | _list TOPIK nodes + component files_ |
| Question banks audited | _BM_QUESTIONS keys_ |
| Audit date / by | |
| Overall verdict | _✅ / ⚠️ / ❌ + one sentence_ |

---

## A. Silibus Coverage (one row per silibus bullet, split into atomic skills)

| # | Keperluan silibus (atomic skill) | Status | Evidence (topic / file / bank) | Notes & gap detail |
|---|---|---|---|---|
| A1 | | | | |
| A2 | | | | |

**Score:** _x ✅ · y ⚠️ · z ❌ · n ➖ of N rows_

---

## B. Pedagogy Standards (house rules — same for every module)

| # | Check | Status | Notes |
|---|---|---|---|
| B1 | Learn-before-quiz: every topic has a learn page (or a documented quiz-only decision) | | |
| B2 | Spaced repetition wired (~70/30 via `useBMQuiz` / `REVIEW_SOURCES`) | | |
| B3 | Immediate feedback (correct answer shown on mistakes; celebration on success) | | |
| B4 | Progress persisted (`markTopicCompleted` on back, ✓ shown on hub node) | | |
| B5 | Audio modelling where the skill is oral (TTS model before/after attempt) | | |
| B6 | Question banks ≥ 12 items per topic; distractors plausible (sound/look-alike) | | |
| B7 | Mastery gate: quiz pass ≥ 70% required before topic marked complete; results offer "Topik Seterusnya" (pass) / "Cuba Lagi" (fail) | | |

---

## C. Content Rules (Tahun-specific)

| # | Check | Status | Notes |
|---|---|---|---|
| C1 | Vocabulary level rule for this Tahun (T1: KV/KVK only — no meN-/ber-, no ng/ny, no ai/au/oi) | | |
| C2 | One game serves exactly one topic (no duplicates across topics) | | |
| C3 | Hub labels are child-friendly content names; silibus headings stay in docs | | |
| C4 | Topic IDs unchanged (opaque progress keys — never renumbered) | | |
| C5 | Language quality: BM text natural and age-appropriate, no Indonesian loanwords | | |

---

## D. Technical / UX Standards

| # | Check | Status | Notes |
|---|---|---|---|
| D1 | Leaf games lazy-loaded in App.jsx (menus eager) | | |
| D2 | TTS: `ms-*` voice, `id-*` fallback tier; never default-English; stops on nav | | |
| D3 | STT (if used): double-start guard, mic-denied handling, forgiving matching | | |
| D4 | iOS-safe CSS: resting state visible, svg width/height attrs, hover behind `@media(hover:hover)` | | |
| D5 | Responsive: playable 320px → desktop, no clipped text | | |
| D6 | Hub icons follow the gradient full-cover standard (`BMJourneySvgs.jsx`) | | |

---

## E. Improvement Actions (insight output)

| Priority | Action | Closes rows | Effort | Feasible digitally? |
|---|---|---|---|---|
| P1 | | | | |
| P2 | | | | |
| P3 | | | | |

> P1 = closes a ❌ silibus GAP · P2 = upgrades ⚠️ to ✅ · P3 = polish / rule compliance.
> Anything marked ➖ must be listed here once with the reason it is out of scope.
