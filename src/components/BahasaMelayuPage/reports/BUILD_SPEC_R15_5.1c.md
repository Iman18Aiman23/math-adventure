# 🛠️ Build Spec — R15 / Topik 5.1c: Kata Tugas (BM Tahun 2)

> **Audience:** an agent/developer with **no prior context**. Everything needed is here.
> **Goal:** build ONE new Pattern-1 quiz topic — **5.1c "Kata Tugas"** — and wire it into the BM Tahun 2 trail. **This completes the R15 split (3 of 3).**
> **Prerequisite already done:** 5.1a (`KataBilanganArah.jsx`) and 5.1b (`KataPasifAdjektif.jsx`) are built, verified, and in the repo. **Copy one of them** — it is your template.
> **Source of truth:** [`T2_COVERAGE_REPORT.md`](./T2_COVERAGE_REPORT.md) → action **R15**.

---

## 0. Context (1 paragraph)

KSSR BM Tahun 2 Topik 5.1 needs **8 grammar categories**, split across three trail topics (5.1a/b/c). This spec is **5.1c "Kata Tugas"** — the four function-word classes:
- **Kata Seru** — interjections (Wah!, Aduh!, Amboi!…).
- **Kata Perintah** — imperatives/commands (Duduk!, Jangan bising!, Sila…, Tolong…).
- **Kata Penguat** — intensifiers (sangat, amat, terlalu, paling…).
- **Kata Nafi** — negators (tidak, bukan, jangan, belum).

5.1a and 5.1b are done. After 5.1c, **R15 is complete and M5 has its 5 topics**.

---

## 1. The pattern (same as 5.1a / 5.1b)

Read these in-repo files first — they ARE the template:
- [`Tahun2/Module5_Tatabahasa/KataBilanganArah.jsx`](../Tahun2/Module5_Tatabahasa/KataBilanganArah.jsx) (or `KataPasifAdjektif.jsx`) ← **copy the whole file**, change only: `TOPIC_ID`, `CATEGORIES`, function/component names, the `<h1>` heading, and `topicTitle`.
- [`_shared/BMLessonQuizLayout.jsx`](../_shared/BMLessonQuizLayout.jsx) — provides the 70% gate + XP/hearts/gems/streak/toast for free. **Do NOT import `useTopicGamification`** and do NOT hand-wire rewards.

**Question-bank item shape:** `{ question, options:[…], answer, emoji }` — 3–4 options, **all unique**, `answer` appears exactly once. No `explanation` field. `useBMQuiz(current, [], 12)`.

---

## 2. Naming & IDs (use exactly)

| Thing | Value |
|---|---|
| `TOPIC_ID` | `2-5-1c-kata-tugas` |
| Display num | `5.1c` |
| Trail label | `Kata Tugas` |
| Component file | `src/components/BahasaMelayuPage/Tahun2/Module5_Tatabahasa/KataTugas.jsx` |
| Component export | `export default function KataTugas(...)` |
| App.jsx lazy var | `KataTugas` |
| Accent colour | `#159E96` (Module 5 teal) |

> The trail node `2-5-1c-kata-tugas` **already exists** in `ModuleData.js` as a disabled placeholder. You only flip it to active — see §5.

---

## 3. Content — ready-to-paste question bank (16 items)

Add as a new key inside `BM_QUESTIONS` in [`_shared/ModuleData.js`](../_shared/ModuleData.js), right **after** the `'2-5-1b-kerja-pasif-adjektif'` block (ends ~line 661). 4 items per sub-type × 4 = 16.

```js
  // ── T2 M5 T5.1c: Kata Tugas ──────────────────────────────────
  // Kata Tugas: Kata Seru, Kata Perintah, Kata Penguat, Kata Nafi.
  '2-5-1c-kata-tugas': [
    // ---- Kata Seru (interjections) ----
    { question: 'Pilih kata seru: "___! Sakitnya kaki saya!"', emoji: '😣', answer: 'Aduh', options: ['Aduh', 'sangat', 'jangan', 'Sila'] },
    { question: 'Pilih kata seru kekaguman: "___! Besarnya rumah itu!"', emoji: '😮', answer: 'Wah', options: ['Wah', 'tidak', 'Duduk', 'amat'] },
    { question: 'Pilih kata seru: "___! Comelnya kucing itu!"', emoji: '😍', answer: 'Amboi', options: ['Amboi', 'belum', 'sangat', 'Berhenti'] },
    { question: 'Yang manakah kata seru?', emoji: '❗', answer: 'Oh', options: ['Oh', 'Duduk', 'sangat', 'tidak'] },
    // ---- Kata Perintah (imperatives) ----
    { question: 'Pilih kata perintah: "___ di kerusi itu." (arahan supaya duduk)', emoji: '🪑', answer: 'Duduk', options: ['Duduk', 'Wah', 'sangat', 'tidak'] },
    { question: 'Pilih ayat perintah yang betul.', emoji: '🚪', answer: 'Tolong tutup pintu itu.', options: ['Tolong tutup pintu itu.', 'Pintu itu cantik.', 'Saya tutup pintu.', 'Pintu sangat besar.'] },
    { question: 'Pilih kata perintah yang sopan: "___ duduk di sini."', emoji: '🙏', answer: 'Sila', options: ['Sila', 'Amboi', 'amat', 'bukan'] },
    { question: 'Yang manakah ayat perintah?', emoji: '🤫', answer: 'Jangan bising di dalam kelas!', options: ['Jangan bising di dalam kelas!', 'Kelas itu bising.', 'Saya suka kelas.', 'Kelas sangat besar.'] },
    // ---- Kata Penguat (intensifiers) ----
    { question: 'Pilih kata penguat: "Budak itu ___ pandai."', emoji: '🧠', answer: 'sangat', options: ['sangat', 'Duduk', 'tidak', 'Wah'] },
    { question: 'Pilih kata penguat: "Cuaca hari ini ___ panas."', emoji: '☀️', answer: 'amat', options: ['amat', 'jangan', 'Sila', 'Aduh'] },
    { question: 'Pilih kata penguat: "Dia ___ rajin dalam kelas." (paling tinggi)', emoji: '🏆', answer: 'paling', options: ['paling', 'bukan', 'Duduk', 'Amboi'] },
    { question: 'Pilih kata penguat: "Air ini ___ sejuk sehingga menggigil."', emoji: '🥶', answer: 'terlalu', options: ['terlalu', 'belum', 'Sila', 'Wah'] },
    // ---- Kata Nafi (negators) ----
    { question: 'Pilih kata nafi: "Saya ___ suka makanan pedas."', emoji: '🌶️', answer: 'tidak', options: ['tidak', 'sangat', 'Duduk', 'Wah'] },
    { question: 'Pilih kata nafi: "Itu ___ buku saya." (menafikan benda)', emoji: '📕', answer: 'bukan', options: ['bukan', 'amat', 'Sila', 'Aduh'] },
    { question: 'Pilih kata nafi (larangan): "___ buang sampah di sini!"', emoji: '🚮', answer: 'Jangan', options: ['Jangan', 'paling', 'Amboi', 'sangat'] },
    { question: 'Pilih kata nafi: "Dia ___ habis membaca buku itu." (not yet)', emoji: '⏳', answer: 'belum', options: ['belum', 'terlalu', 'Wah', 'Duduk'] },
  ],
```
> Distractors mix words from the other three Kata Tugas sub-types so the child must distinguish them. All option arrays are duplicate-free. (Note: "jangan" is officially a *kata nafi* that functions in commands — item 15 frames it as kata nafi, which is correct.)

---

## 4. The component — copy `KataBilanganArah.jsx`, change 5 things

Create `src/components/BahasaMelayuPage/Tahun2/Module5_Tatabahasa/KataTugas.jsx` as a copy of `KataBilanganArah.jsx`, with:

1. `const TOPIC_ID = '2-5-1c-kata-tugas';`
2. Replace `CATEGORIES` with:
```js
const CATEGORIES = [
  {
    title: 'Kata Seru',
    desc: 'Perkataan yang menunjukkan perasaan (terkejut, kagum, sakit). Diikuti tanda seru (!).',
    example: 'Wah! · Aduh! · Amboi! · Cis! · Oh!',
    usage: 'Kata Seru + ! + ayat (cth. "Wah! Cantiknya!")',
  },
  {
    title: 'Kata Perintah',
    desc: 'Perkataan yang memberi arahan, larangan, atau permintaan.',
    example: 'Duduk! · Jangan bising! · Sila masuk · Tolong tutup pintu',
    usage: 'Kata Perintah + (objek/tindakan)',
  },
  {
    title: 'Kata Penguat',
    desc: 'Perkataan yang menguatkan maksud kata adjektif.',
    example: 'sangat · amat · sungguh · terlalu · paling',
    usage: 'Kata Penguat + Kata Adjektif (cth. "sangat pandai")',
  },
  {
    title: 'Kata Nafi',
    desc: 'Perkataan yang menafikan atau menidakkan sesuatu.',
    example: 'tidak · bukan · jangan · belum',
    usage: 'Kata Nafi + (kata kerja/nama) — cth. "tidak suka", "bukan saya"',
  },
];
```
3. Rename: `KataBilanganArahLearnPage` → `KataTugasLearnPage`; `export default function KataBilanganArah` → `KataTugas` (update the JSX reference inside the wrapper too).
4. `<h1>` → `{language === 'bm' ? 'Kata Tugas 💬' : 'Function Words 💬'}`
5. `topicTitle` → `language === 'bm' ? 'Kata Tugas' : 'Function Words'`

Everything else stays identical (CSS `kba-*` prefix is fine to keep; it's scoped to an inline `<style>`). Keep `useBMQuiz(currentQs, reviewQs, 12)`.

---

## 5. Wiring edit #1 — activate the trail node

In [`_shared/ModuleData.js`](../_shared/ModuleData.js) flip the existing 5.1c placeholder (~line 158) to active:

**Before:** `{ id: '2-5-1c-kata-tugas', num: '5.1c', label: 'Kata Tugas', icon: M2_M5T1, disabled: true  },`
**After:**  `{ id: '2-5-1c-kata-tugas', num: '5.1c', label: 'Kata Tugas', icon: M2_M5T1, disabled: false },`

---

## 6. Wiring edit #2 — route the component (App.jsx)

In [`src/App.jsx`](../../../App.jsx):

**(a)** Lazy import, next to `KataPasifAdjektif` (~line 147):
```js
const KataTugas = React.lazy(() => import('./components/BahasaMelayuPage/Tahun2/Module5_Tatabahasa/KataTugas'));
```
**(b)** Route block, next to the `2-5-1b` block (~line 930), **Pattern-1 style (no `ProgressWrapper`)**:
```jsx
          if (bmTopic === '2-5-1c-kata-tugas')
            return <Suspense fallback={<LoadingSpinner />}>
              <KataTugas onBack={topicOnBack} language={language}
                topicComplete={(id) => markTopicCompleted(id)}
                onNextTopic={bmNextTopic} key={bmTopic} />
            </Suspense>;
```

---

## 7. Definition of Done

- [ ] `KataTugas.jsx` exists, copied with the 5 changes; uses `BMLessonQuizLayout`; no `useTopicGamification`.
- [ ] `BM_QUESTIONS['2-5-1c-kata-tugas']` has **16 items**; every `options` array duplicate-free; each `answer` ∈ options; **all 4 sub-types** (seru/perintah/penguat/nafi) covered (4 each).
- [ ] Trail node 5.1c flipped to `disabled: false`. (All of 5.1a/b/c now active → R15 complete.)
- [ ] App.jsx: lazy import + Pattern-1 route for `2-5-1c-kata-tugas`.
- [ ] Gate ≥70% completes / <70% blocks; XP/hearts/gems appear without manual wiring.
- [ ] `npm run build` passes; no console errors.

### Verify (manual)
`run-math-adventure` / `npm run dev` → BM → Tahun 2 → Modul 5 → **5.1c**. Confirm 4 learn cards, 12-question quiz, gate + rewards. **No Python/Playwright tests.**

---

## 8. Out of scope
- Anything beyond 5.1c. (After this, the next planned task is R13 / 1.2.)
- `reviewQuestions` / spaced repetition — leave `[]` (R22).
- Don't touch `MorfologiPerluasan.jsx`, `PembentukanPerkataan.jsx`, or AgeGroup-7 routes.

## 9. After you finish — STOP at "pending verification"
1. In [`T2_COVERAGE_REPORT.md`](./T2_COVERAGE_REPORT.md), set the **5.1c** row to **🔍 Pending verification** (NOT ✅).
2. Add a slice-log handoff note: files changed, summary, how tested.
3. Commit on `main`.
4. **Do not self-mark ✅** — owner verifies first. If gaps found, fix and return to 🔍.
