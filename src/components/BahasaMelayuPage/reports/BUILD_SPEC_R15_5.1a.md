# 🛠️ Build Spec — R15 / Topik 5.1a: Kata Bilangan & Kata Arah (BM Tahun 2)

> **Audience:** an agent/developer with **no prior context**. Everything needed is in this file.
> **Goal:** build ONE new Pattern-1 quiz topic — **5.1a "Kata Bilangan & Kata Arah"** — and wire it into the Bahasa Melayu Tahun 2 trail.
> **Source of truth for the wider plan:** [`T2_COVERAGE_REPORT.md`](./T2_COVERAGE_REPORT.md) (see action **R15** + "Keputusan & Progress").
> **Status when this spec was written:** 2026-06-13. Slice 1 (distractor fixes) already done.

---

## 0. Why this task exists (1-paragraph context)

KSSR Bahasa Melayu **Tahun 2, Topik 5.1** ("Morfologi — Perluasan Golongan Kata") currently **reuses the wrong component** (`MorfologiPerluasan.jsx`, which actually teaches kata hubung/sendi nama — a Tahun-1 objective). The real 5.1 syllabus needs **8 grammar categories**. A product decision was made to **split 5.1 into three separate trail topics** so a child can stop/resume by level:

- **5.1a** — Kata Bilangan & Kata Arah  ← **THIS SPEC**
- 5.1b — Kata Kerja Pasif & Kata Adjektif (waktu/jarak/cara/pancaindera)
- 5.1c — Kata Tugas (Kata Seru, Kata Perintah, Kata Penguat, Kata Nafi)

5.1b and 5.1c are **future slices** — build them later by copying this exact recipe with different content. Do **not** build them now.

---

## 1. The "Pattern 1" recipe (study this first)

A clean BM topic = **3 pieces**:

1. **A question bank** keyed by `TOPIC_ID` in
   [`_shared/ModuleData.js`](../_shared/ModuleData.js) → the exported `BM_QUESTIONS` object.
2. **A component** that renders a *learn page* then hands a quiz to the shared layout.
3. **Two wiring edits**: register the topic node (ModuleData) + route the component (App.jsx).

**Reference implementation to copy — read it before coding:**
[`Tahun2/Module5_Tatabahasa/SintaksisAyatMajmuk.jsx`](../Tahun2/Module5_Tatabahasa/SintaksisAyatMajmuk.jsx) (topic 5.3). It is the cleanest example of this pattern.

### What the shared layout gives you for free

`BMLessonQuizLayout` ([`_shared/BMLessonQuizLayout.jsx`](../_shared/BMLessonQuizLayout.jsx)) **already handles**, so your component must NOT re-implement them:
- The 70% **mastery gate** (`PASS_PCT = 70`) — pass → calls `topicComplete(topicId)` + persists attempt; fail → "Cuba Lagi".
- **Gamification**: +10 XP/correct, +5 streak bonus every 5, hearts ❤️, gems 💎, the shared top-center XP toast, and the crown on completion. **Do not import `useTopicGamification` yourself** — the layout uses `useGamification` internally. (The older `MorfologiPerluasan.jsx` wires gamification by hand; that is the *other*, non-preferred style — **follow `SintaksisAyatMajmuk`, not `MorfologiPerluasan`**.)
- Start card, progress bar, stars, result screen, "Next Topic" button, confetti, TTS replay.

### Question-bank item shape (what `useBMQuiz` + the layout consume)

```js
{
  question: 'Pilih kata bilangan yang betul: "Ali ada ___ biji guli."',
  options: ['banyak', 'di', 'ke', 'sangat'],   // 3–4 options; MUST all be unique
  answer: 'banyak',                              // must be exactly one of options
  emoji: '🔵',                                   // optional; shown in the media circle
  // audioText: 'banyak',                         // optional; if set, auto-TTS + replay btn. OMIT for reading MCQs.
}
```
- **No `explanation` field is rendered** by this layout — don't bother adding one.
- `useBMQuiz(current, review, totalRounds)` shuffles options + picks `totalRounds` questions (70% current / 30% review). With `review = []` it uses all current. Pass `totalRounds = 12`.
- ⚠️ **Distractor rule (we just fixed 21 bugs from this):** within one `options` array, **never repeat a value**, and the `answer` must appear exactly once. Keep all four distinct.

---

## 2. Naming & IDs (use these exact strings)

| Thing | Value |
|---|---|
| `TOPIC_ID` | `2-5-1a-kata-bilangan-arah` |
| Display num | `5.1a` |
| Trail label | `Kata Bilangan & Kata Arah` |
| Component file | `src/components/BahasaMelayuPage/Tahun2/Module5_Tatabahasa/KataBilanganArah.jsx` |
| Component export | `export default function KataBilanganArah(...)` |
| App.jsx lazy var | `KataBilanganArah` |
| Accent colour | `#159E96` (Module 5 teal — keep module-consistent) |

> IDs are **opaque routing/progress keys**. `2-5-1a-…` is a new key, so it starts with zero saved progress — that's correct and intended.

---

## 3. Content — ready-to-paste question bank (16 items)

Paste this as a new key inside the `BM_QUESTIONS` object in
[`_shared/ModuleData.js`](../_shared/ModuleData.js). Put it **next to the other Module-5 banks** (near `'2-5-3-sintaksis-ayat-majmuk'`, around line 593). 8 Kata Bilangan + 8 Kata Arah = 16 (well above the ≥12 floor).

```js
  // ── T2 M5 T5.1a: Kata Bilangan & Kata Arah ───────────────────
  // Kata Bilangan = number/quantity words. Kata Arah = direction/position words.
  '2-5-1a-kata-bilangan-arah': [
    // ---- Kata Bilangan (quantity) ----
    { question: 'Pilih kata bilangan: "Saya ada ___ biji epal." (2)', emoji: '🍎', answer: 'dua', options: ['dua', 'atas', 'sangat', 'tidak'] },
    { question: 'Pilih kata bilangan: "Ada ___ ekor kucing di situ." (3)', emoji: '🐱', answer: 'tiga', options: ['tiga', 'bawah', 'amat', 'bukan'] },
    { question: 'Pilih kata bilangan yang bermaksud "tidak banyak".', emoji: '🤏', answer: 'sedikit', options: ['sedikit', 'kanan', 'belakang', 'jangan'] },
    { question: 'Pilih kata bilangan: "___ murid hadir ke sekolah hari ini." (semua orang)', emoji: '🧒', answer: 'semua', options: ['semua', 'dalam', 'hadapan', 'kiri'] },
    { question: 'Pilih kata bilangan: "Beri saya ___ buku itu." (jumlah besar)', emoji: '📚', answer: 'banyak', options: ['banyak', 'tepi', 'luar', 'atas'] },
    { question: 'Pilih kata bilangan: "___ orang pelajar perlu beratur." (tiap-tiap)', emoji: '🚶', answer: 'setiap', options: ['setiap', 'bawah', 'kanan', 'dalam'] },
    { question: 'Pilih kata bilangan: "Ada ___ ekor ikan di dalam kolam." (tidak pasti bilangannya)', emoji: '🐟', answer: 'beberapa', options: ['beberapa', 'hadapan', 'belakang', 'kiri'] },
    { question: 'Pilih kata bilangan: "Dia membeli ___ kereta baharu." (1)', emoji: '🚗', answer: 'sebuah', options: ['sebuah', 'atas', 'tepi', 'luar'] },
    // ---- Kata Arah (direction / position) ----
    { question: 'Pilih kata arah: "Buku itu ada di ___ meja." (di permukaan)', emoji: '📖', answer: 'atas', options: ['atas', 'dua', 'semua', 'setiap'] },
    { question: 'Pilih kata arah: "Kucing tidur di ___ kerusi." (di tempat rendah)', emoji: '🐈', answer: 'bawah', options: ['bawah', 'tiga', 'banyak', 'sedikit'] },
    { question: 'Pilih kata arah yang bertentangan dengan "kanan".', emoji: '👈', answer: 'kiri', options: ['kiri', 'sebuah', 'beberapa', 'semua'] },
    { question: 'Pilih kata arah yang bertentangan dengan "kiri".', emoji: '👉', answer: 'kanan', options: ['kanan', 'dua', 'banyak', 'setiap'] },
    { question: 'Pilih kata arah: "Guru berdiri di ___ kelas." (di bahagian depan)', emoji: '🧑‍🏫', answer: 'hadapan', options: ['hadapan', 'tiga', 'sedikit', 'sebuah'] },
    { question: 'Pilih kata arah yang bertentangan dengan "hadapan".', emoji: '🔙', answer: 'belakang', options: ['belakang', 'dua', 'semua', 'beberapa'] },
    { question: 'Pilih kata arah: "Bola itu ada di ___ kotak." (di sebelah)', emoji: '⚽', answer: 'tepi', options: ['tepi', 'banyak', 'setiap', 'tiga'] },
    { question: 'Pilih kata arah: "Ikan berenang di ___ akuarium." (di bahagian dalam)', emoji: '🐠', answer: 'dalam', options: ['dalam', 'dua', 'sedikit', 'semua'] },
  ],
```

> The distractors deliberately mix the *other* category's words (a direction word offered against a quantity question, etc.) so the child must truly distinguish the two categories. All option arrays are duplicate-free.

---

## 4. The component (copy `SintaksisAyatMajmuk.jsx`, swap content)

Create `src/components/BahasaMelayuPage/Tahun2/Module5_Tatabahasa/KataBilanganArah.jsx`.
Start from `SintaksisAyatMajmuk.jsx` and change: `TOPIC_ID`, the learn-card data, the title, and `totalRounds` (12). Full working file below — you can paste it as-is.

```jsx
import React, { useState } from 'react';
import useBMQuiz from '../../_shared/useBMQuiz';
import BMLessonQuizLayout from '../../_shared/BMLessonQuizLayout';
import { BM_QUESTIONS } from '../../_shared/ModuleData';

const TOPIC_ID = '2-5-1a-kata-bilangan-arah';
const ACCENT = '#159E96';

// Two categories shown as expandable learn cards before the quiz.
const CATEGORIES = [
  {
    title: 'Kata Bilangan',
    desc: 'Perkataan yang menunjukkan bilangan atau kuantiti.',
    example: 'dua buku · tiga kucing · beberapa orang · semua murid · setiap hari',
    usage: 'Kata Bilangan + (penjodoh bilangan) + Kata Nama',
  },
  {
    title: 'Kata Arah',
    desc: 'Perkataan yang menunjukkan arah atau kedudukan sesuatu.',
    example: 'atas meja · bawah kerusi · kiri / kanan · hadapan / belakang · dalam / tepi',
    usage: 'di / ke + Kata Arah + Kata Nama',
  },
];

function KataBilanganArahLearnPage({ onBack, onStartQuiz, topicTitle, language }) {
  const [expandedIdx, setExpandedIdx] = useState(null);

  return (
    <>
      <style>{`
        .kba-learn-root { height: 100dvh; overflow: hidden; background: linear-gradient(180deg, #E6F6F4 0%, #C6E9E5 50%, #A0DBD4 100%); font-family: 'Fredoka', system-ui, sans-serif; display: flex; flex-direction: column; }
        .kba-topbar { flex-shrink: 0; position: relative; display: flex; align-items: center; gap: 4px; padding: 10px 12px; min-height: 44px; background: rgba(255,255,255,.88); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(0,0,0,.06); }
        .kba-topbar::after { content: ''; flex: 0 1 88px; }
        .kba-back { flex-shrink: 0; display: flex; align-items: center; gap: 4px; font-family: 'Baloo 2', sans-serif; font-weight: 700; font-size: 13px; color: #64748B; background: none; border: none; cursor: pointer; padding: 6px 10px; border-radius: 10px; }
        .kba-back:hover { background: #F1F5F9; }
        @media (max-width: 480px) { .kba-back-label { display: none; } .kba-topbar::after { flex-basis: 42px; } }
        .kba-title { flex: 1; min-width: 0; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(12px, 3.4vw, 14px); color: #1E293B; }
        .kba-body { flex: 1; min-height: 0; display: flex; flex-direction: column; align-items: center; width: 100%; padding: clamp(6px, 1.6vh, 16px) 16px clamp(4px, 1.2vh, 12px); overflow: hidden; }
        .kba-heading { flex-shrink: 0; text-align: center; width: 100%; margin-bottom: clamp(8px, 2vh, 18px); }
        .kba-heading h1 { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(15px, min(4.4vw, 4.2vh), 24px); color: #1E293B; margin: 0; }
        .kba-heading p { font-size: clamp(10px, min(2.6vw, 1.8vh), 13px); font-weight: 500; color: #475569; margin: 4px 0 0; }
        .kba-cards { flex: 1; min-height: 0; width: 100%; max-width: 540px; overflow-y: auto; padding: 2px 4px; display: flex; flex-direction: column; gap: clamp(8px, 1.4vh, 14px); }
        .kba-card { flex-shrink: 0; background: #fff; border-radius: clamp(14px, 2.4vw, 18px); padding: clamp(10px, 1.4vh, 16px) clamp(12px, 1.8vw, 18px); border: 2px solid ${ACCENT}18; box-shadow: 0 4px 12px -6px rgba(0,0,0,.06); cursor: pointer; transition: all .2s ease; }
        .kba-card:hover { border-color: ${ACCENT}44; }
        .kba-card.expanded { border-color: ${ACCENT}; }
        .kba-card-header { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
        .kba-card-title { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(13px, min(3.2vw, 2.8vh), 17px); color: ${ACCENT}; }
        .kba-card-toggle { flex-shrink: 0; font-size: 16px; color: ${ACCENT}; transition: transform .2s ease; }
        .kba-card-toggle.open { transform: rotate(180deg); }
        .kba-card-content { overflow: hidden; max-height: 0; transition: max-height .3s ease; }
        .kba-card-content.open { max-height: 400px; }
        .kba-card-desc { margin-top: 8px; font-size: clamp(10px, min(2.4vw, 1.8vh), 13px); color: #64748B; font-weight: 500; font-style: italic; }
        .kba-card-example { margin-top: 8px; font-size: clamp(11px, min(2.6vw, 2vh), 14px); font-weight: 600; color: #334155; line-height: 1.6; padding: 8px 10px; background: #F0FDF9; border-radius: 10px; border-left: 4px solid ${ACCENT}55; }
        .kba-card-usage { margin-top: 6px; font-size: clamp(10px, min(2.2vw, 1.6vh), 12px); color: ${ACCENT}; font-weight: 700; }
        .kba-cta { flex-shrink: 0; text-align: center; width: 100%; max-width: 360px; margin-top: clamp(6px, 1.4vh, 14px); }
        .kba-cta-btn { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(14px, min(3.8vw, 2.6vh), 18px); cursor: pointer; border: none; border-radius: 999px; padding: clamp(9px, 1.8vh, 13px) 28px; color: #fff; width: 100%; background: linear-gradient(180deg, ${ACCENT}cc, ${ACCENT}); box-shadow: 0 4px 0 ${ACCENT}66, 0 10px 20px -10px ${ACCENT}80; transition: transform .12s ease, box-shadow .12s; }
        .kba-cta-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 ${ACCENT}66; }
        .kba-footer { flex-shrink: 0; text-align: center; padding: clamp(2px, .6vh, 6px) 16px clamp(4px, 1vh, 10px); font-size: 10px; font-weight: 500; color: #94A3B8; }
        @media (max-height: 480px) { .kba-heading p, .kba-footer { display: none; } }
      `}</style>

      <div className="kba-learn-root">
        <div className="kba-topbar">
          <button className="kba-back" onClick={onBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span className="kba-back-label">{language === 'bm' ? 'Kembali' : 'Back'}</span>
          </button>
          <span className="kba-title">{topicTitle}</span>
        </div>

        <div className="kba-body">
          <div className="kba-heading">
            <h1>{language === 'bm' ? 'Kata Bilangan & Kata Arah 🔢🧭' : 'Quantity & Direction Words 🔢🧭'}</h1>
            <p>{language === 'bm' ? 'Ketuk untuk belajar setiap golongan kata' : 'Tap to learn each word class'}</p>
          </div>

          <div className="kba-cards">
            {CATEGORIES.map((c, i) => (
              <div key={i} className={`kba-card${expandedIdx === i ? ' expanded' : ''}`} onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}>
                <div className="kba-card-header">
                  <span className="kba-card-title">{c.title}</span>
                  <span className={`kba-card-toggle${expandedIdx === i ? ' open' : ''}`}>▼</span>
                </div>
                <div className={`kba-card-content${expandedIdx === i ? ' open' : ''}`}>
                  <div className="kba-card-desc">{c.desc}</div>
                  <div className="kba-card-example">📖 {c.example}</div>
                  <div className="kba-card-usage">💡 Pola: {c.usage}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="kba-cta">
            <button className="kba-cta-btn" onClick={onStartQuiz}>🎯 {language === 'bm' ? 'Sedia untuk Kuiz?' : 'Ready for Quiz?'}</button>
          </div>
        </div>

        <div className="kba-footer">Bahasa Melayu KSSR · {topicTitle}</div>
      </div>
    </>
  );
}

export default function KataBilanganArah({ onBack, language = 'bm', topicComplete, onNextTopic }) {
  const [page, setPage] = useState('learn');

  const currentQs = BM_QUESTIONS[TOPIC_ID] || [];
  const reviewQs = [];
  const quiz = useBMQuiz(currentQs, reviewQs, 12);

  const topicTitle = language === 'bm' ? 'Kata Bilangan & Kata Arah' : 'Quantity & Direction Words';

  if (page === 'learn') {
    return (
      <KataBilanganArahLearnPage
        onBack={() => onBack?.()}
        onStartQuiz={() => setPage('quiz')}
        topicTitle={topicTitle}
        language={language}
      />
    );
  }

  return (
    <BMLessonQuizLayout
      onBack={() => onBack?.()} topicId={TOPIC_ID} topicComplete={topicComplete} onNextTopic={onNextTopic}
      topicTitle={topicTitle}
      quiz={quiz}
      language={language}
      accentColor={ACCENT}
      onShowLearn={() => setPage('learn')}
    />
  );
}
```

---

## 5. Wiring edit #1 — register the trail node

In [`_shared/ModuleData.js`](../_shared/ModuleData.js), the **Tahun-2 Module 5** topic list is around **lines 156–158**. Replace the single 5.1 entry so the split is visible. Recommended incremental approach: activate 5.1a now, add 5.1b/5.1c as **disabled placeholders** (greyed/locked in the trail) for the future slices.

**Before:**
```js
      { id: '2-5-1-morfologi-perluasan',  num: '5.1', label: 'Morfologi (Perluasan Golongan Kata)', icon: M2_M5T1, disabled: false },
      { id: '2-5-2-pembentukan-perkataan', num: '5.2', label: 'Pembentukan Perkataan',             icon: M2_M5T2, disabled: false },
      { id: '2-5-3-sintaksis-ayat-majmuk', num: '5.3', label: 'Sintaksis (Ayat Majmuk)',           icon: M2_M5T3, disabled: false },
```

**After:**
```js
      { id: '2-5-1a-kata-bilangan-arah',   num: '5.1a', label: 'Kata Bilangan & Kata Arah',          icon: M2_M5T1, disabled: false },
      { id: '2-5-1b-kerja-pasif-adjektif', num: '5.1b', label: 'Kata Kerja Pasif & Kata Adjektif',   icon: M2_M5T1, disabled: true  },
      { id: '2-5-1c-kata-tugas',           num: '5.1c', label: 'Kata Tugas',                          icon: M2_M5T1, disabled: true  },
      { id: '2-5-2-pembentukan-perkataan', num: '5.2', label: 'Pembentukan Perkataan',              icon: M2_M5T2, disabled: false },
      { id: '2-5-3-sintaksis-ayat-majmuk', num: '5.3', label: 'Sintaksis (Ayat Majmuk)',            icon: M2_M5T3, disabled: false },
```

Notes:
- Icons: reusing `M2_M5T1` for all three split nodes is acceptable. (Optional polish: add 3 new SVG icons in `BMJourneySvgs.js` and import them. Not required for this slice.)
- The old `2-5-1-morfologi-perluasan` node is **removed from the T2 trail** here. The underlying `MorfologiPerluasan.jsx` file is **kept** — it's still used as a standalone AgeGroup-7 game via a different route. **Do not delete that file.**

---

## 6. Wiring edit #2 — route the component (App.jsx)

In [`src/App.jsx`](../../../App.jsx):

**(a)** Add a lazy import near the other Tahun-2 Module-5 imports (around line 145, beside `SintaksisAyatMajmuk`):
```js
const KataBilanganArah = React.lazy(() => import('./components/BahasaMelayuPage/Tahun2/Module5_Tatabahasa/KataBilanganArah'));
```

**(b)** Add a route block. Match the **Pattern-1 style used by `2-5-3-sintaksis-ayat-majmuk`** (around line 916) — i.e. pass `topicComplete` + `onNextTopic`, and **do NOT wrap in `ProgressWrapper`** (the layout handles completion itself):
```jsx
          if (bmTopic === '2-5-1a-kata-bilangan-arah')
            return <Suspense fallback={<LoadingSpinner />}>
              <KataBilanganArah onBack={topicOnBack} language={language}
                topicComplete={(id) => markTopicCompleted(id)}
                onNextTopic={bmNextTopic} key={bmTopic} />
            </Suspense>;
```
> Contrast: the old `2-5-1-morfologi-perluasan` block uses `<ProgressWrapper>` (the Pattern-2 style). Your new topic must use the Pattern-1 style above. You may leave the old `2-5-1-…` route in place (harmless dead route) or remove it — since its trail node is gone, it's unreachable either way.

---

## 7. Definition of Done (acceptance criteria)

- [ ] New file `KataBilanganArah.jsx` exists and follows the `SintaksisAyatMajmuk` structure (learn page → `BMLessonQuizLayout`).
- [ ] `BM_QUESTIONS['2-5-1a-kata-bilangan-arah']` has **16 items**, every `options` array duplicate-free, each `answer` ∈ its `options`.
- [ ] Trail shows **5.1a** as an active node; 5.1b/5.1c appear (disabled) as planned placeholders.
- [ ] App.jsx routes `2-5-1a-kata-bilangan-arah` in the **Pattern-1 style** (no `ProgressWrapper`; passes `topicComplete`/`onNextTopic`).
- [ ] Scoring ≥ 70% marks the topic complete (crown) and offers "Topik Seterusnya →"; < 70% blocks completion and offers "Cuba Lagi".
- [ ] XP toast (+10/correct), hearts, gems, and streak all appear — **without** the component importing `useTopicGamification` (the layout provides them).
- [ ] No console errors; lazy import resolves.

### How to verify (manual)
Use the **`run-math-adventure`** skill (or `npm run dev`) to launch the app, then navigate: Bahasa Melayu → Tahun 2 → Modul 5 (Tatabahasa) → **5.1a Kata Bilangan & Kata Arah**. Confirm learn cards expand, quiz runs 12 questions, gate + rewards behave as above.
> ⚠️ The project owner does **not** want Python/Playwright test scripts for this app — verify in the browser manually.

---

## 8. Out of scope (do NOT do here)
- 5.1b and 5.1c content/components (future slices — same recipe).
- Touching `MorfologiPerluasan.jsx` / `PembentukanPerkataan.jsx` internals, or the AgeGroup-7 standalone routes.
- Spaced repetition (`reviewQuestions`) — leave `reviewQs = []` (a separate cross-cutting task, R22).

## 9. After you finish — STOP at "pending verification" (do NOT self-mark done)

This task is part of a **build → verify loop** (see "Alur kerja & pengesahan" in [`T2_COVERAGE_REPORT.md`](./T2_COVERAGE_REPORT.md)). When your build is complete:

1. In [`T2_COVERAGE_REPORT.md`](./T2_COVERAGE_REPORT.md), set this task's row in the **Papan status tugas** to **🔍 Pending verification** (NOT ✅).
2. Add a **handoff note** to the slice log with: (a) files changed, (b) summary of changes, (c) how you tested it (which screen/path you navigated).
3. Commit on `main` with a clear message (this repo commits directly to main).
4. **Do not mark ✅ Completed yourself.** The owner will request an independent verification; only then does the status become ✅. If verification finds gaps, fix them and return to 🔍.
