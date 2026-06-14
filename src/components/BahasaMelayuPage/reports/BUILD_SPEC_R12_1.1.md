# 🛠️ Build Spec — R12 / Topik 1.1: Mendengar, Memahami & Merespons (BM Tahun 2)

> ## 🔁 SUPERSEDED (2026-06-14) — DO NOT BUILD AS-IS
> Per the owner's decision, topic 1.1 is **split into 3 separate topics** (not one two-tier topic): **1.1a Merespons Soalan** (bertumpu + bercapah, STT) · **1.1b Melaksanakan Arahan** · **1.1c Pesanan & Permintaan**. This file is kept only as a **content/pattern source** (the Q&A bank, instruction bank, bercapah grading helper, and the "copy BerceritaBincang.jsx + completedRef gate" guidance still apply per-topic). Build from the dedicated `BUILD_SPEC_*_1.1a/1.1b/1.1c.md` specs once written. See the task board in [`T2_COVERAGE_REPORT.md`](./T2_COVERAGE_REPORT.md).

> **Audience:** an agent/developer with **no prior context**. Read the whole file first.
> **Goal:** rebuild T2 topic **1.1** into a **two-tier** component: **Tier A — Soalan (bertumpu + bercapah, STT)** + **Tier B — Arahan/Pesanan/Permintaan berbilang maklumat (multi-step, self-report)**, with a 70% gate.
> **This is a medium-large custom build** (like 1.2). Your best template is the **already-built, already-verified [`BerceritaBincang.jsx`](../Tahun2/Module1_Mendengar/BerceritaBincang.jsx)** (topic 1.2) — it's a two-tier STT + self-report component with the *correct* completion pattern. Copy its structure.
> **Source of truth:** [`T2_COVERAGE_REPORT.md`](./T2_COVERAGE_REPORT.md) → action **R12**.

---

## 0. Context

T2 topic **1.1** syllabus: "Memberikan respons terhadap soalan **bertumpu** dan **bercapah**. Melaksanakan **arahan, pesanan, dan permintaan** yang mengandungi **beberapa maklumat**."

Current component ([`MendengarMerespons.jsx`](../Tahun2/Module1_Mendengar/MendengarMerespons.jsx), exports `JawabSoalan`) only covers **bertumpu** Q&A (10 factual items), is **un-gated** (`completeActivity`), and has **no** bercapah / arahan / pesanan / permintaan. Gaps: A2 (bercapah), A3 (arahan), A4 (pesanan), A5 (permintaan), B6 (≥12 items), B7 (gate).

### Confirmed design decisions (consistent with the project's STT philosophy)
- **Bercapah = opinion → accept ANY reasonable spoken response** (non-empty, ≥2 words). There is no "wrong" opinion; affirm and move on. (Same reasoning as Soalan 3: don't keyword-grade open-ended speech.)
- **Bertumpu = keyword-graded** (real right/wrong) — this is what gives the 70% gate its teeth.
- **Arahan/Pesanan/Permintaan = listen to a 2–3 part instruction (TTS), then SELF-REPORT "✅ Sudah!"** (with a "🔊 Dengar semula" replay). The child performs the action / relays the message aloud; the mic is optional and **not** graded (these are *laksanakan* skills). Self-report counts as done. (Consistent with the 1.2 self-report decision.)

---

## 1. File/coupling situation (same trap as 1.2)

`MendengarMerespons.jsx` is **dual-used**: the T2 `2-1-1-mendengar-merespons` route AND the AgeGroup-7 `jawab-soalan` standalone (via the aliased `JawabSoalan` import at `App.jsx:63`).

**Low-risk approach (do exactly this):**
1. Create a **NEW** file `Tahun2/Module1_Mendengar/MendengarArahan.jsx` (export `MendengarArahan`).
2. Repoint **only** the T2 `2-1-1-mendengar-merespons` route to it.
3. **Leave `MendengarMerespons.jsx` and the AG7 `jawab-soalan` standalone untouched.**

---

## 2. Naming & IDs (use exactly)

| Thing | Value |
|---|---|
| `TOPIC_ID` | `2-1-1-mendengar-merespons` (existing route id — keep it) |
| Component file | `src/components/BahasaMelayuPage/Tahun2/Module1_Mendengar/MendengarArahan.jsx` |
| Component export | `export default function MendengarArahan(...)` |
| App.jsx lazy var | `MendengarArahan` |
| Trail node | already exists in `ModuleData.js` ("Mendengar, Memahami & Merespons") — **no ModuleData change** |
| Total items | **13** (Tier A = 8 Q&A, Tier B = 5 instructions); gate **70%** |

---

## 3. Build from the 1.2 template — what to copy and what to change

Copy [`BerceritaBincang.jsx`](../Tahun2/Module1_Mendengar/BerceritaBincang.jsx) as your starting point. It already gives you, **correctly**:
- Two-tier flow (`tier` state: `'story'`→`'discuss'`; here rename to `'soalan'`→`'arahan'`).
- The STT phase machine (`READY/LISTENING/CORRECT/WRONG`), `SpeechManager.listen(...)`, mic-error handling, repeat/skip.
- **The completion pattern you MUST keep:** a `completedRef`-guarded `useEffect` that calls `completeTopic(score, TOTAL_ITEMS, 70)` + `topicComplete?.(TOPIC_ID)` **once, off-render**. ⚠️ Do NOT call completion inside render / `startTransition` (that bug was found and fixed in 1.2 — don't reintroduce it).
- `useTopicGamification` (`awardCorrect`/`awardWrong`/`completeTopic`/`hearts`/`gems`), ❤️/💎/⭐ HUD pills, result screen with pass/fail gate + Next/Retry/Back, self-report button pattern.

**Changes vs the 1.2 template:**

### Tier A — Soalan (Q&A), 8 items
- Instead of "read this sentence aloud", here **TTS asks the question** then the child answers (copy the *ask-aloud* flow from [`MendengarMerespons.jsx`](../Tahun2/Module1_Mendengar/MendengarMerespons.jsx): `PHASE_SPEAKING` reads `question.bm`, then opens the mic).
- **Grading depends on item `type`:**
  - `type: 'bertumpu'` → keyword match against `accept[]` (reuse `checkMatch`/`grammarFor` from `MendengarMerespons.jsx`). Real right/wrong.
  - `type: 'bercapah'` → **pass if the transcript has ≥2 words** (any reasonable opinion). No `accept[]`. Praise + advance. On a too-short/no-speech answer, gently re-prompt (don't hard-fail).
- Self-report fallback (STT unavailable / perm / net): show "✅ Saya dah jawab" → counts as done (same fallback pattern as 1.2). For bercapah this is the natural path; for bertumpu it's the inclusive fallback.

### Tier B — Arahan / Pesanan / Permintaan, 5 items (self-report)
- For each item: **TTS speaks the multi-step instruction** (`SpeechManager.speak(text,'ms')`), show the type badge (Arahan / Pesanan / Permintaan) + emoji. **Do not show the instruction text** (it's a listening skill) — but provide "🔊 Dengar semula" to replay.
- The child performs/relays it, then taps **"✅ Sudah!"** → `awardCorrect()`, score++, advance. (No keyword grading; these are *laksanakan* skills.)
- This tier always passes per item — the **gate's teeth come from Tier A's bertumpu items** (a child who fails most factual questions lands below 70%).

### Gate
`TOTAL_ITEMS = 13`. In the `completedRef`-guarded `useEffect`: `completeTopic(score, 13, 70)` and, if `score/13*100 ≥ 70`, `topicComplete?.(TOPIC_ID)`.

---

## 4. Content — ready-to-paste data

```js
// Tier A — 8 questions: 6 bertumpu (keyword-graded) + 2 bercapah (opinion, accept any answer).
const QUESTIONS = [
  { id: 'q1', emoji: '☁️', type: 'bertumpu', question: 'Apakah warna langit?', answer: 'Biru', accept: ['biru', 'blue'] },
  { id: 'q2', emoji: '🌱', type: 'bertumpu', question: 'Apakah warna rumput?', answer: 'Hijau', accept: ['hijau', 'green'] },
  { id: 'q3', emoji: '🐱', type: 'bertumpu', question: 'Berapa kaki seekor kucing?', answer: 'Empat', accept: ['empat', '4', 'four'] },
  { id: 'q4', emoji: '🍌', type: 'bertumpu', question: 'Apakah warna pisang yang masak?', answer: 'Kuning', accept: ['kuning', 'yellow'] },
  { id: 'q5', emoji: '🐔', type: 'bertumpu', question: 'Haiwan apakah yang berkokok pada waktu pagi?', answer: 'Ayam', accept: ['ayam', 'ayam jantan', 'rooster', 'chicken'] },
  { id: 'q6', emoji: '📅', type: 'bertumpu', question: 'Berapa hari dalam seminggu?', answer: 'Tujuh', accept: ['tujuh', '7', 'seven'] },
  { id: 'q7', emoji: '🤔', type: 'bercapah', question: 'Pada pendapat kamu, apakah haiwan yang paling comel? Mengapa?' },
  { id: 'q8', emoji: '💭', type: 'bercapah', question: 'Mengapa kita perlu rajin belajar di sekolah?' },
];

// Tier B — 5 multi-info instructions. Listen → do/relay → "✅ Sudah!".
const INSTRUCTIONS = [
  { id: 'a1', emoji: '✏️', label: 'Arahan',    text: 'Ambil pensel, lukis sebuah bulatan, kemudian warnakan ia kuning.' },
  { id: 'a2', emoji: '📖', label: 'Arahan',    text: 'Buka buku, cari muka surat lima, dan baca ayat pertama.' },
  { id: 'a3', emoji: '💌', label: 'Pesanan',   text: 'Sampaikan kepada emak: kelas tambahan pada hari Sabtu pukul lapan pagi.' },
  { id: 'a4', emoji: '🙋', label: 'Permintaan', text: 'Minta tolong kawan ambil beg biru di atas meja.' },
  { id: 'a5', emoji: '🗣️', label: 'Pesanan',   text: 'Beritahu abang: jemput adik di tadika pukul satu petang.' },
];
```
> Bertumpu items reuse the proven content + `accept[]` arrays from `MendengarMerespons.jsx`. Keep all `accept` arrays sensible; bercapah items have no `accept`.

**Bercapah grading helper:**
```js
const wordCount = (t) => normalize(t).split(' ').filter(Boolean).length;
// in onResult: const pass = item.type === 'bercapah' ? wordCount(transcript) >= 2 : checkMatch(transcript, item);
```

---

## 5. Wiring (App.jsx only — ModuleData unchanged)

In [`src/App.jsx`](../../../App.jsx):

**(a)** Lazy import near the other Module-1 BM imports (~line 63):
```js
const MendengarArahan = React.lazy(() => import('./components/BahasaMelayuPage/Tahun2/Module1_Mendengar/MendengarArahan'));
```
**(b)** Repoint the T2 route (currently the `2-1-1-mendengar-merespons` `<ProgressWrapper>` block, ~line 945-950) to the **Pattern-1 style** (no `ProgressWrapper`):
```jsx
          if (bmTopic === '2-1-1-mendengar-merespons')
            return <Suspense fallback={<LoadingSpinner />}>
              <MendengarArahan onBack={topicOnBack} language={language}
                topicComplete={(id) => markTopicCompleted(id)}
                onNextTopic={bmNextTopic} key={bmTopic} />
            </Suspense>;
```
**(c)** **Leave** the `JawabSoalan` import (line 63) and the AG7 `jawab-soalan` standalone route (~line 1212) exactly as they are.

---

## 6. Definition of Done

- [ ] New `MendengarArahan.jsx` exists; `MendengarMerespons.jsx` + AG7 standalone untouched.
- [ ] **Tier A:** 8 Q&A; 6 bertumpu keyword-graded + 2 bercapah (pass on ≥2 words, any opinion); TTS asks each question; self-report fallback when STT unavailable.
- [ ] **Tier B:** 5 instructions; TTS speaks each (text hidden, replay available); "✅ Sudah!" self-report advances; type badge (Arahan/Pesanan/Permintaan) shown.
- [ ] **Completion is in a `completedRef`-guarded `useEffect` (NOT during render / not `startTransition`).** `completeTopic(score, 13, 70)`; crown only ≥70%; result screen pass/fail + Next/Retry/Back.
- [ ] XP/hearts/gems via `useTopicGamification`; ❤️/💎/⭐ HUD pills shown; streak toast works.
- [ ] T2 route repointed (no `ProgressWrapper`); AG7 standalone still works.
- [ ] `npm run build` passes; no console errors (incl. no "Cannot update a component while rendering").

### Verify (manual)
`run-math-adventure` / `npm run dev` → BM → Tahun 2 → Modul 1 → **1.1**. Answer the bertumpu questions (try a wrong one to see it fail), give any opinion for bercapah, then do the instruction tier via "✅ Sudah!". Test the mic-denied self-report path. Confirm gate + rewards. Also confirm the AG7 "Jawab Soalan" standalone still works. **No Python/Playwright tests.**

---

## 7. Out of scope
- Renaming/cleaning the old `MendengarMerespons.jsx` or AG7 file (cosmetic).
- `reviewQuestions` / spaced repetition (R22).
- STT-grading the relayed pesanan/permintaan (kept as self-report by decision).

## 8. After you finish — STOP at "pending verification"
1. In [`T2_COVERAGE_REPORT.md`](./T2_COVERAGE_REPORT.md), set the **R12 / 1.1** row to **🔍 Pending verification** (NOT ✅).
2. Add a slice-log handoff note: files changed, summary, how tested (incl. mic-denied path + a deliberately-failed bertumpu answer).
3. Commit on `main`.
4. **Do not self-mark ✅** — owner verifies first. If gaps found, fix and return to 🔍.
