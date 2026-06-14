# 🛠️ Build Spec — Split Topik 1.2 → 1.2a Bercerita + 1.2b Berbincang (BM Tahun 2)

> **Audience:** an agent/developer with **no prior context**. Read the whole file first.
> **Goal:** split the **already-built** combined topic 1.2 (`BerceritaBincang.jsx`, route `2-1-2-bercerita`) into **two separate topics**, each its own node + gate, each expanded to **≥12 items**:
> - **1.2a Bercerita** — read-aloud stories (STT). Keep the custom component (it's the existing Tier A).
> - **1.2b Berbincang** — guided-discussion MCQ. **Convert to a standard Pattern-1 `BMLessonQuizLayout` topic** (it has no STT — pure MCQ).
> **This is ONE task building BOTH topics** (they come from one source component).
> **Source of truth:** [`T2_COVERAGE_REPORT.md`](./T2_COVERAGE_REPORT.md) — M1 split decision (2026-06-14).

---

## 0. Context

Topic 1.2 was built as one two-tier component ([`BerceritaBincang.jsx`](../Tahun2/Module1_Mendengar/BerceritaBincang.jsx)): Tier A = read-aloud stories (STT), Tier B = discussion MCQs. Per the owner's decision it's split into two focused topics so a child can stop/resume by level, and each must meet the ≥12-item minima. The existing component is the **content + code source** — nothing is thrown away.

Result for Modul 1 after this task: `1.1` (old reuse, untouched here) + **`1.2a`** + **`1.2b`**. (1.1 is split later in its own specs.)

---

## 1. IDs, files, naming

| | 1.2a Bercerita | 1.2b Berbincang |
|---|---|---|
| `TOPIC_ID` | `2-1-2a-bercerita` | `2-1-2b-berbincang` |
| Display num | `1.2a` | `1.2b` |
| Trail label | `Bercerita (Baca Kuat)` | `Berbincang` |
| Component file | `Tahun2/Module1_Mendengar/Bercerita.jsx` | `Tahun2/Module1_Mendengar/Berbincang.jsx` |
| Export | `Bercerita` | `Berbincang` |
| App.jsx lazy var | `Bercerita` | `Berbincang` |
| Pattern | **Custom STT** (copy from `BerceritaBincang.jsx` Tier A) | **Pattern-1 MCQ** (copy from `KataBilanganArah.jsx`) |
| Items / gate | 12 sentences (4 stories × 3) / 70% | 12 MCQ / 70% |

**Migration / cleanup (do after both are wired):**
- Remove the old combined route `2-1-2-bercerita` from `App.jsx` and its lazy import (`BerceritaBincang`).
- **Delete** `Tahun2/Module1_Mendengar/BerceritaBincang.jsx` (only the retired route used it — confirm with a repo search before deleting; the AG7 standalone uses `BerceritaBerbincang.jsx`, a *different* file, so it's unaffected).
- In `ModuleData.js`, replace the single `2-1-2-bercerita` trail node with the two new nodes (see §4).

---

## 2. Topic 1.2a — Bercerita (custom STT read-aloud)

**Build:** copy [`BerceritaBincang.jsx`](../Tahun2/Module1_Mendengar/BerceritaBincang.jsx) → `Bercerita.jsx`, then **delete the entire Tier B (discussion) path**: the `DISCUSSIONS`/`DISCUSSIONS_SHUFFLED` data, the `tier`/`discuss` states, `advanceT2`, `handleMCQ`, the Tier-B render block, and the `'discuss'` branch. Keep only the read-aloud flow.

Changes:
1. `const TOPIC_ID = '2-1-2a-bercerita';`
2. `const TOTAL_ITEMS = 12;` (was 15).
3. Add a **4th story** to `STORIES` (→ 4 × 3 = 12 sentences):
```js
  { id: 's4', emoji: '🛒', title: 'Di Kedai', sentences: [
    'Ibu dan Sara pergi ke kedai.',
    'Mereka membeli roti dan susu.',
    'Sara membantu ibu membawa beg.',
  ]},
```
4. After the last story's last sentence, go straight to `PHASE_RESULT` (there's no Tier B anymore). In `advanceT1`, replace the `else { setTier('discuss'); ... }` branch with `else { setPhase(PHASE_RESULT); }`.
5. **Keep** the `completedRef`-guarded completion `useEffect` exactly as in the fixed `BerceritaBincang.jsx` — it already calls `completeTopic(score, TOTAL_ITEMS, 70)` + `topicComplete?.(TOPIC_ID)` once, off-render. ⚠️ Do NOT move completion into render.
6. Keep: per-sentence lenient match (`lenientPass`, ≥60% key words), `grammarWords`, 3 attempts then reveal+TTS, self-report fallback ("Saya dah baca ✅" on `permanentFallback` / perm / net), ❤️/💎/⭐ HUD, result screen.
7. `topicTitle` = `language === 'bm' ? 'Bercerita (Baca Kuat)' : 'Read Aloud'`.

---

## 3. Topic 1.2b — Berbincang (Pattern-1 MCQ via BMLessonQuizLayout)

**Build:** copy [`KataBilanganArah.jsx`](../Tahun2/Module5_Tatabahasa/KataBilanganArah.jsx) → `Berbincang.jsx` (the standard learn-page → `BMLessonQuizLayout` pattern). It has **no STT** — it's pure MCQ, so the shared layout gives you the gate + XP/hearts/gems/toast for free.

Changes:
1. `const TOPIC_ID = '2-1-2b-berbincang';`
2. `const ACCENT = '#E8821A';` (Module 1 orange — see `M1_THEME` in `ModuleData.js`).
3. Replace `CATEGORIES` (the learn-page cards) with a short "how to respond well" intro:
```js
const CATEGORIES = [
  { title: 'Beri Pendapat yang Baik', desc: 'Fikir dahulu, kemudian beri jawapan yang sopan dan menolong.',
    example: 'Kawan jatuh → "Tolong dia bangun." · Kawan sedih → "Pujuk dan tanya dia."',
    usage: 'Pilih tindakan yang baik hati dan bertanggungjawab.' },
  { title: 'Nilai Murni', desc: 'Jawapan yang baik menunjukkan nilai seperti tolong-menolong, hormat, dan jujur.',
    example: 'Jumpa dompet → beri kepada guru (jujur) · Bilik kotor → bersihkan (bertanggungjawab)',
    usage: 'Tanya: "Apa yang baik untuk semua orang?"' },
];
```
4. Rename component/function: `KataBilanganArahLearnPage` → `BerbincangLearnPage`; `export default function KataBilanganArah` → `Berbincang`. `<h1>` → `{language === 'bm' ? 'Berbincang 💬' : 'Discuss 💬'}`. `topicTitle` → `'Berbincang'` / `'Discuss'`. Keep `useBMQuiz(currentQs, reviewQs, 12)`.

**Bank — paste into `BM_QUESTIONS` in [`_shared/ModuleData.js`](../_shared/ModuleData.js)** (put it in the M1 area; 12 items — 6 reused from the built component + 6 new):
```js
  // ── T2 M1 T1.2b: Berbincang (guided discussion — pick the good response) ──
  '2-1-2b-berbincang': [
    { question: 'Rani nampak kawan jatuh basikal. Apa patut Rani buat?', emoji: '🚲', answer: 'Tolong kawan itu bangun.', options: ['Tolong kawan itu bangun.', 'Ketawakan dia.', 'Lari pergi.', 'Buat tak nampak.'] },
    { question: 'Kamu jumpa dompet di sekolah. Apa patut kamu buat?', emoji: '👛', answer: 'Beri kepada guru.', options: ['Beri kepada guru.', 'Simpan duitnya.', 'Buang dompet itu.', 'Biarkan sahaja.'] },
    { question: 'Kawan kamu nampak sedih hari ini. Apa kamu boleh buat?', emoji: '😢', answer: 'Tanya dan pujuk dia.', options: ['Tanya dan pujuk dia.', 'Abaikan dia.', 'Ketawakan dia.', 'Marah dia.'] },
    { question: 'Bilik darjah kotor selepas rehat. Apa patut murid buat?', emoji: '🧹', answer: 'Bersihkan bersama-sama.', options: ['Bersihkan bersama-sama.', 'Tunggu orang lain.', 'Tinggalkan begitu.', 'Tambah lagi sampah.'] },
    { question: 'Kamu tidak faham soalan cikgu. Apa patut kamu buat?', emoji: '🙋', answer: 'Angkat tangan dan bertanya.', options: ['Angkat tangan dan bertanya.', 'Diam sahaja.', 'Tiru kawan.', 'Tinggalkan kosong.'] },
    { question: 'Adik kamu mahu bermain alat permainan kamu. Apa elok kamu buat?', emoji: '🧸', answer: 'Berkongsi dengan adik.', options: ['Berkongsi dengan adik.', 'Rebut balik.', 'Marah adik.', 'Sorok alat itu.'] },
    { question: 'Kamu nampak murid baharu duduk seorang diri. Apa elok kamu buat?', emoji: '🧑‍🤝‍🧑', answer: 'Ajak dia bermain bersama.', options: ['Ajak dia bermain bersama.', 'Biarkan dia.', 'Ketawakan dia.', 'Buat bising.'] },
    { question: 'Hujan turun semasa waktu rehat. Apa patut kamu buat?', emoji: '🌧️', answer: 'Berteduh di dalam kelas.', options: ['Berteduh di dalam kelas.', 'Bermain dalam hujan.', 'Berlari jauh.', 'Basahkan kawan.'] },
    { question: 'Kamu terpijak kaki kawan tidak sengaja. Apa patut kamu kata?', emoji: '🙇', answer: 'Minta maaf kepadanya.', options: ['Minta maaf kepadanya.', 'Diam sahaja.', 'Marah dia.', 'Lari pergi.'] },
    { question: 'Cikgu sedang bercakap di hadapan kelas. Apa patut kamu buat?', emoji: '👂', answer: 'Dengar dengan teliti.', options: ['Dengar dengan teliti.', 'Bercakap dengan kawan.', 'Tidur di meja.', 'Main di belakang.'] },
    { question: 'Kamu dapat markah rendah dalam ujian. Apa elok kamu buat?', emoji: '📝', answer: 'Belajar lebih rajin lain kali.', options: ['Belajar lebih rajin lain kali.', 'Putus asa.', 'Salahkan cikgu.', 'Sembunyikan kertas.'] },
    { question: 'Kawan kamu lupa membawa pensel. Apa elok kamu buat?', emoji: '✏️', answer: 'Pinjamkan pensel kamu.', options: ['Pinjamkan pensel kamu.', 'Biarkan dia.', 'Ejek dia.', 'Sorok pensel.'] },
    { question: 'Kamu nampak sampah di lantai kelas. Apa patut kamu buat?', emoji: '🗑️', answer: 'Pungut dan buang ke tong sampah.', options: ['Pungut dan buang ke tong sampah.', 'Tendang ke tepi.', 'Biarkan sahaja.', 'Pijak sampah itu.'] },
  ],
```
All option arrays are duplicate-free with `answer` included.

---

## 4. Wiring

### ModuleData.js — trail nodes (M1 T2 list, ~lines 125-128)
Replace the single `2-1-2-bercerita` node with two:
```js
      { id: '2-1-2a-bercerita',  num: '1.2a', label: 'Bercerita (Baca Kuat)', icon: M2_M1T2, disabled: false },
      { id: '2-1-2b-berbincang', num: '1.2b', label: 'Berbincang',            icon: M2_M1T2, disabled: false },
```
(Leave the `2-1-1-mendengar-merespons` node as-is — 1.1 is split later. Reusing `M2_M1T2` icon for both is fine.)

### App.jsx
- Add lazy imports:
```js
const Bercerita = React.lazy(() => import('./components/BahasaMelayuPage/Tahun2/Module1_Mendengar/Bercerita'));
const Berbincang = React.lazy(() => import('./components/BahasaMelayuPage/Tahun2/Module1_Mendengar/Berbincang'));
```
- Replace the old `2-1-2-bercerita` route block with two Pattern-1 routes:
```jsx
          if (bmTopic === '2-1-2a-bercerita')
            return <Suspense fallback={<LoadingSpinner />}>
              <Bercerita onBack={topicOnBack} language={language}
                topicComplete={(id) => markTopicCompleted(id)}
                onNextTopic={bmNextTopic} key={bmTopic} />
            </Suspense>;
          if (bmTopic === '2-1-2b-berbincang')
            return <Suspense fallback={<LoadingSpinner />}>
              <Berbincang onBack={topicOnBack} language={language}
                topicComplete={(id) => markTopicCompleted(id)}
                onNextTopic={bmNextTopic} key={bmTopic} />
            </Suspense>;
```
- Remove the old `BerceritaBincang` import + the `2-1-2-bercerita` route.

---

## 5. Definition of Done

**1.2a Bercerita**
- [ ] `Bercerita.jsx` exists; Tier B fully removed; single read-aloud flow.
- [ ] 4 stories / **12 sentences**; lenient ≥60% match; `grammarWords`; 3 attempts → reveal+TTS; self-report fallback works.
- [ ] Completion in the `completedRef`-guarded `useEffect` (NOT in render); `completeTopic(score, 12, 70)`; result screen pass/fail + Next/Retry/Back.
- [ ] ❤️/💎/⭐ HUD; XP toast.

**1.2b Berbincang**
- [ ] `Berbincang.jsx` exists (Pattern-1, `BMLessonQuizLayout`, no `useTopicGamification`/no STT).
- [ ] `BM_QUESTIONS['2-1-2b-berbincang']` = **12 items**, options duplicate-free, `answer` ∈ options.
- [ ] Learn page (2 cards) + 70% gate via the shared layout.

**Shared**
- [ ] `BerceritaBincang.jsx` deleted; old `2-1-2-bercerita` import + route removed; ModuleData node replaced with `2-1-2a` + `2-1-2b`.
- [ ] AG7 standalone untouched; `npm run build` green; no console errors.

### Verify (manual)
`run-math-adventure` / `npm run dev` → BM → Tahun 2 → Modul 1. **1.2a**: read 12 sentences aloud (test mic-denied self-report); confirm gate. **1.2b**: answer 12 MCQs, confirm 70% gate + learn page. Confirm the old combined 1.2 node is gone and nothing else broke.

---

## 6. Out of scope
- 1.1 split (1.1a/b/c) — separate specs.
- Spaced repetition (`reviewQuestions = []`) — R22.
- The AG7 `bertutur-bertatasusila`/`jawab-soalan` standalones + their files.

## 7. After you finish — STOP at "pending verification"
1. In [`T2_COVERAGE_REPORT.md`](./T2_COVERAGE_REPORT.md), set **both** the 1.2a and 1.2b rows to **🔍 Pending verification** (NOT ✅).
2. Add a slice-log handoff note: files changed/created/deleted, summary, how tested (incl. mic-denied path for 1.2a).
3. Commit on `main`.
4. **Do not self-mark ✅** — owner verifies first. If gaps found, fix and return to 🔍.
