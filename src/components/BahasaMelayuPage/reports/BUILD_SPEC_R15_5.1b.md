# 🛠️ Build Spec — R15 / Topik 5.1b: Kata Kerja Pasif & Kata Adjektif (BM Tahun 2)

> **Audience:** an agent/developer with **no prior context**. Everything needed is here.
> **Goal:** build ONE new Pattern-1 quiz topic — **5.1b "Kata Kerja Pasif & Kata Adjektif"** — and wire it into the BM Tahun 2 trail.
> **Prerequisite already done:** 5.1a (`KataBilanganArah.jsx`) is built, verified, and in the repo. **Copy it** — it is your template.
> **Source of truth:** [`T2_COVERAGE_REPORT.md`](./T2_COVERAGE_REPORT.md) → action **R15** (split into 5.1a/b/c; this is part 2 of 3).

---

## 0. Context (1 paragraph)

KSSR BM Tahun 2 Topik 5.1 needs **8 grammar categories**, split across three trail topics. This spec is **5.1b**, covering two of them:
- **Kata Kerja Pasif** — passive verbs formed with the **di-** prefix (dibaca, dimakan, ditulis…).
- **Kata Adjektif** — describing words across **4 sub-types**: **Waktu** (time), **Jarak** (distance), **Cara** (manner), **Pancaindera** (senses).

5.1a (Kata Bilangan & Kata Arah) is done; 5.1c (Kata Tugas) is a later slice — **do not build 5.1c here.**

> ⚠️ **Overlap note with 5.2:** topic 5.2 (`PembentukanPerkataan`, action R16) will later teach the **di-** prefix as *word formation / morphology* (root + imbuhan). Here in 5.1b, treat di- verbs as a **golongan kata** — i.e. *recognising/using a passive verb in a sentence* ("Buku itu **dibaca** oleh Ali"), **not** the affixation mechanics. Keep the angle on identification + sentence use so the two topics don't become duplicates.

---

## 1. The pattern (same as every Pattern-1 BM topic)

Read these two in-repo files first — they ARE the template:
- [`Tahun2/Module5_Tatabahasa/KataBilanganArah.jsx`](../Tahun2/Module5_Tatabahasa/KataBilanganArah.jsx) ← **copy this whole file**, then change only: `TOPIC_ID`, `CATEGORIES`, the `<h1>` heading text, the `topicTitle`, and the component/function names.
- [`_shared/BMLessonQuizLayout.jsx`](../_shared/BMLessonQuizLayout.jsx) — provides the 70% gate, XP/hearts/gems, streak, toast, result screen **for free**. **Do NOT import `useTopicGamification`** and do NOT hand-wire rewards.

**Question-bank item shape** (consumed by `useBMQuiz` + the layout):
```js
{ question: '…', options: ['…','…','…','…'], answer: '…', emoji: '📖' }
```
- 3–4 options; **every option in an array must be unique**; `answer` must appear exactly once in `options`. (We fixed 21 duplicate-distractor bugs earlier — do not reintroduce any.)
- No `explanation` field is rendered — omit it.
- `useBMQuiz(current, [], 12)` → pass `totalRounds = 12`, `reviewQs = []`.

---

## 2. Naming & IDs (use exactly)

| Thing | Value |
|---|---|
| `TOPIC_ID` | `2-5-1b-kerja-pasif-adjektif` |
| Display num | `5.1b` |
| Trail label | `Kata Kerja Pasif & Kata Adjektif` |
| Component file | `src/components/BahasaMelayuPage/Tahun2/Module5_Tatabahasa/KataPasifAdjektif.jsx` |
| Component export | `export default function KataPasifAdjektif(...)` |
| App.jsx lazy var | `KataPasifAdjektif` |
| Accent colour | `#159E96` (Module 5 teal) |

> The trail node `2-5-1b-kerja-pasif-adjektif` **already exists** in `ModuleData.js` (added as a disabled placeholder during the 5.1a slice). You only need to flip it to active — see §5.

---

## 3. Content — ready-to-paste question bank (16 items)

Add this as a new key inside `BM_QUESTIONS` in [`_shared/ModuleData.js`](../_shared/ModuleData.js), right **after** the `'2-5-1a-kata-bilangan-arah'` block (which ends around line 635). 8 Kata Kerja Pasif + 8 Kata Adjektif (2 per sub-type) = 16.

```js
  // ── T2 M5 T5.1b: Kata Kerja Pasif & Kata Adjektif ────────────
  // Kata Kerja Pasif = di- passive verbs (recognise/use in a sentence).
  // Kata Adjektif = describing words: waktu, jarak, cara, pancaindera.
  '2-5-1b-kerja-pasif-adjektif': [
    // ---- Kata Kerja Pasif (di- passive) ----
    { question: 'Pilih kata kerja pasif: "Buku itu ___ oleh Ali."', emoji: '📖', answer: 'dibaca', options: ['dibaca', 'membaca', 'baca', 'pembaca'] },
    { question: 'Pilih kata kerja pasif: "Nasi itu ___ oleh kucing."', emoji: '🍚', answer: 'dimakan', options: ['dimakan', 'makan', 'memakan', 'pemakan'] },
    { question: 'Pilih kata kerja pasif: "Surat itu ___ oleh guru."', emoji: '✉️', answer: 'ditulis', options: ['ditulis', 'menulis', 'tulis', 'penulis'] },
    { question: 'Pilih kata kerja pasif: "Pintu itu ___ oleh adik."', emoji: '🚪', answer: 'dibuka', options: ['dibuka', 'membuka', 'buka', 'pembuka'] },
    { question: 'Pilih kata kerja pasif: "Baju itu ___ oleh emak."', emoji: '👕', answer: 'dibasuh', options: ['dibasuh', 'membasuh', 'basuh', 'pembasuh'] },
    { question: 'Pilih kata kerja pasif: "Bola itu ___ oleh Amin."', emoji: '⚽', answer: 'ditendang', options: ['ditendang', 'menendang', 'tendang', 'penendang'] },
    { question: 'Kata kerja pasif biasanya bermula dengan imbuhan...?', emoji: '🔤', answer: 'di-', options: ['di-', 'me-', 'pe-', 'ber-'] },
    { question: 'Yang manakah kata kerja pasif?', emoji: '✅', answer: 'diambil', options: ['diambil', 'mengambil', 'ambil', 'pengambil'] },
    // ---- Kata Adjektif: Waktu ----
    { question: 'Pilih kata adjektif waktu: "Ali bangun ___ pagi untuk ke sekolah."', emoji: '⏰', answer: 'awal', options: ['awal', 'jauh', 'harum', 'dibaca'] },
    { question: 'Pilih kata adjektif waktu: "Kura-kura bergerak ___."', emoji: '🐢', answer: 'lambat', options: ['lambat', 'dekat', 'manis', 'ditulis'] },
    // ---- Kata Adjektif: Jarak ----
    { question: 'Pilih kata adjektif jarak: "Rumah Ali ___ dari sekolah, jadi dia berjalan kaki."', emoji: '🏠', answer: 'dekat', options: ['dekat', 'awal', 'busuk', 'dimakan'] },
    { question: 'Pilih kata adjektif jarak: "Bandar itu sangat ___ dari kampung kami."', emoji: '🛣️', answer: 'jauh', options: ['jauh', 'cepat', 'kasar', 'dibuka'] },
    // ---- Kata Adjektif: Cara ----
    { question: 'Pilih kata adjektif cara: "Dia berjalan ___ supaya tidak jatuh."', emoji: '🚶', answer: 'perlahan-lahan', options: ['perlahan-lahan', 'jauh', 'manis', 'ditulis'] },
    { question: 'Pilih kata adjektif cara: "Ibu bercakap dengan ___ kepada bayi."', emoji: '🤱', answer: 'lemah-lembut', options: ['lemah-lembut', 'dekat', 'awal', 'dibaca'] },
    // ---- Kata Adjektif: Pancaindera ----
    { question: 'Pilih kata adjektif pancaindera: "Bunga mawar itu ___ baunya."', emoji: '🌹', answer: 'harum', options: ['harum', 'jauh', 'lambat', 'dimakan'] },
    { question: 'Pilih kata adjektif pancaindera: "Ubat itu rasanya ___."', emoji: '💊', answer: 'pahit', options: ['pahit', 'dekat', 'awal', 'ditulis'] },
  ],
```
> Distractors deliberately mix the *other* category's words (passive verbs offered against adjective questions and vice versa) so the child must truly discriminate. All option arrays are duplicate-free.

---

## 4. The component — copy `KataBilanganArah.jsx`, change 5 things

Create `src/components/BahasaMelayuPage/Tahun2/Module5_Tatabahasa/KataPasifAdjektif.jsx` as a copy of `KataBilanganArah.jsx`, with these exact changes:

1. `const TOPIC_ID = '2-5-1b-kerja-pasif-adjektif';`
2. Replace the `CATEGORIES` array with:
```js
const CATEGORIES = [
  {
    title: 'Kata Kerja Pasif',
    desc: 'Perbuatan yang dikenakan ke atas sesuatu — biasanya berimbuhan "di-".',
    example: 'Buku itu dibaca · Nasi dimakan · Surat ditulis · Pintu dibuka',
    usage: 'Objek + di- + kata kerja + (oleh + pelaku)',
  },
  {
    title: 'Kata Adjektif',
    desc: 'Perkataan yang menerangkan sifat/keadaan. Jenis: Waktu, Jarak, Cara, Pancaindera.',
    example: 'Waktu: awal/lambat · Jarak: jauh/dekat · Cara: perlahan-lahan · Pancaindera: harum/pahit',
    usage: 'Kata Nama + Kata Adjektif (cth. "bunga harum")',
  },
];
```
3. Rename the function/component: `KataBilanganArahLearnPage` → `KataPasifAdjektifLearnPage`, and `export default function KataBilanganArah` → `KataPasifAdjektif` (update the JSX reference inside too).
4. `<h1>` heading text → `{language === 'bm' ? 'Kata Kerja Pasif & Kata Adjektif 🔄🎨' : 'Passive Verbs & Adjectives 🔄🎨'}`
5. `topicTitle` → `language === 'bm' ? 'Kata Kerja Pasif & Kata Adjektif' : 'Passive Verbs & Adjectives'`

Everything else (CSS class names `kba-*`, the `useBMQuiz(currentQs, reviewQs, 12)` call, the `BMLessonQuizLayout` block) stays identical. The `kba-` class prefix can stay as-is (scoped inside an inline `<style>`); no need to rename.

---

## 5. Wiring edit #1 — activate the trail node

In [`_shared/ModuleData.js`](../_shared/ModuleData.js) the node already exists (~line 157) as a disabled placeholder. Flip `disabled` to `false`:

**Before:**
```js
      { id: '2-5-1b-kerja-pasif-adjektif', num: '5.1b', label: 'Kata Kerja Pasif & Kata Adjektif',   icon: M2_M5T1, disabled: true  },
```
**After:**
```js
      { id: '2-5-1b-kerja-pasif-adjektif', num: '5.1b', label: 'Kata Kerja Pasif & Kata Adjektif',   icon: M2_M5T1, disabled: false },
```
(Leave 5.1c `disabled: true` — that's the next slice.)

---

## 6. Wiring edit #2 — route the component (App.jsx)

In [`src/App.jsx`](../../../App.jsx):

**(a)** Lazy import, next to `KataBilanganArah` (~line 146):
```js
const KataPasifAdjektif = React.lazy(() => import('./components/BahasaMelayuPage/Tahun2/Module5_Tatabahasa/KataPasifAdjektif'));
```
**(b)** Route block, next to the `2-5-1a` block (~line 923), **Pattern-1 style (no `ProgressWrapper`)**:
```jsx
          if (bmTopic === '2-5-1b-kerja-pasif-adjektif')
            return <Suspense fallback={<LoadingSpinner />}>
              <KataPasifAdjektif onBack={topicOnBack} language={language}
                topicComplete={(id) => markTopicCompleted(id)}
                onNextTopic={bmNextTopic} key={bmTopic} />
            </Suspense>;
```

---

## 7. Definition of Done

- [ ] `KataPasifAdjektif.jsx` exists, copied from `KataBilanganArah.jsx` with the 5 changes; uses `BMLessonQuizLayout`; does **not** import `useTopicGamification`.
- [ ] `BM_QUESTIONS['2-5-1b-kerja-pasif-adjektif']` has **16 items**; every `options` array duplicate-free; each `answer` ∈ its `options`; adjektif covers all **4 sub-types** (waktu/jarak/cara/pancaindera).
- [ ] Trail node 5.1b flipped to `disabled: false`; 5.1c still `disabled: true`.
- [ ] App.jsx: lazy import + Pattern-1 route for `2-5-1b-kerja-pasif-adjektif`.
- [ ] Gate ≥70% completes (crown) / <70% blocks; XP/hearts/gems appear without manual wiring.
- [ ] `npm run build` passes; no console errors.

### Verify (manual)
`run-math-adventure` skill (or `npm run dev`) → BM → Tahun 2 → Modul 5 → **5.1b**. Confirm learn cards, 12-question quiz, gate + rewards. **No Python/Playwright tests.**

---

## 8. Out of scope
- 5.1c (Kata Tugas) — later slice.
- Morphology/affixation mechanics of di- (that's 5.2 / R16) — keep 5.1b at recognition + sentence use.
- `reviewQuestions` / spaced repetition — leave `[]` (R22).
- Don't touch `MorfologiPerluasan.jsx`, `PembentukanPerkataan.jsx`, or AgeGroup-7 routes.

## 9. After you finish — STOP at "pending verification"
1. In [`T2_COVERAGE_REPORT.md`](./T2_COVERAGE_REPORT.md), set the **5.1b** row in the task board to **🔍 Pending verification** (NOT ✅).
2. Add a slice-log handoff note: files changed, summary, how tested.
3. Commit on `main`.
4. **Do not self-mark ✅** — the owner runs an independent verification first. If gaps are found, fix and return to 🔍.
