# 🛠️ Build Spec — R13 / Topik 1.2: Bercerita (Baca Kuat) & Berbincang (BM Tahun 2)

> **Audience:** an agent/developer with **no prior context**. Read this whole file first.
> **Goal:** replace the wrong-syllabus reuse at T2 topic **1.2** with a real **two-tier** component: **Bercerita (read-aloud, STT)** + **Berbincang (guided-discussion MCQ)**.
> ⚠️ **This is the biggest build in T2 — NOT a copy-template job** (unlike 5.1a/b/c). Budget accordingly. It reuses the existing STT engine and an existing component's phase-machine scaffolding.
> **Source of truth:** [`T2_COVERAGE_REPORT.md`](./T2_COVERAGE_REPORT.md) → action **R13** + Keputusan Soalan 3.

---

## 0. Context & the key product decision

KSSR T2 topic **1.2** syllabus = "Bercerita dengan sebutan betul… Berbincang secara berpandu untuk memberi idea/pendapat." The current component is a **misnamed politeness drill** (`BerceritaBerbincang.jsx` still exports `BertuturBertatasusila`, teaches "Terima kasih" etc.) — wrong syllabus.

**Decision (Soalan 3) — DO NOT build free-form storytelling.** Free-form speech can't be graded meaningfully (keyword matching on invented stories is *sia-sia*). Instead:
- **Tier A — Bercerita = READ ALOUD a provided story.** STT checks pronunciation against the **known sentence text** (reliably gradeable). Variety of short stories ("berbagai jenis cerita untuk dibaca").
- **Tier B — Berbincang = guided MCQ.** Scenario → child picks the appropriate idea/opinion. No open-ended STT grading.

**Confirmed build decisions:**
- **Grading:** per-sentence, **lenient** (pass if the child says most key content words of that sentence).
- **Mic fallback:** if STT is unavailable (iOS Safari/no mic/offline), **self-report** — show the sentence + a "Saya dah baca ✅" button so the child can still complete. **STT is a bonus, not a gate-blocker.**

---

## 1. Architecture & the file/coupling situation (read carefully)

There are **two** politeness files today:
- [`Tahun2/Module1_Mendengar/BerceritaBerbincang.jsx`](../Tahun2/Module1_Mendengar/BerceritaBerbincang.jsx) — misnamed politeness drill (exports `BertuturBertatasusila`). **Currently wired** to BOTH the T2 `2-1-2-bercerita` route AND the AgeGroup-7 `bertutur-bertatasusila` standalone (via the aliased import at `App.jsx:61`).
- [`AgeGroup-7/BertuturBertatasusila.jsx`](../../AgeGroup-7/BertuturBertatasusila.jsx) — the original AG7 politeness game, **orphaned** (not imported).

**Low-risk approach for THIS task (do exactly this):**
1. Create a **NEW** file `Tahun2/Module1_Mendengar/BerceritaBincang.jsx` (export `BerceritaBincang`) with the real two-tier content.
2. Repoint **only** the T2 `2-1-2-bercerita` route to it.
3. **Leave the old `BerceritaBerbincang.jsx` and the AgeGroup-7 standalone route untouched** — the AG7 standalone keeps showing politeness. (The misleading filename stays — that's an accepted cosmetic wart, cleanup is out of scope.)

> Do NOT overwrite `BerceritaBerbincang.jsx` (it would change the AG7 standalone too).

---

## 2. Reuse — copy the STT scaffolding, don't reinvent it

**Copy the phase-machine + mic UX from** [`Tahun2/Module1_Mendengar/BerceritaBerbincang.jsx`](../Tahun2/Module1_Mendengar/BerceritaBerbincang.jsx) (the politeness drill). It already implements everything you need for Tier A:
- Phases: `SPEAKING / READY / LISTENING / CORRECT / WRONG / COMPLETE`.
- `SpeechManager.listen('ms-MY', onResult, onError, { grammarWords, retries })`, `.speak(text,'ms')`, `.stop()`, `.stopSpeaking()`, `.isMobile()`, `.isSupported()`, `.getUnsupportedReason()`.
- Mic-error handling (`perm` / `net` / `nospeech`), `listenActiveRef` double-start guard, repeat/hint/skip buttons, the `.bb-*` CSS, and the complete screen.

**Gamification** — use the hook directly (this is NOT a `BMLessonQuizLayout` topic):
```js
import useTopicGamification from '../../../../hooks/useTopicGamification';
const { awardCorrect, awardWrong, completeTopic, hearts, gems } = useTopicGamification(TOPIC_ID);
```
- `awardCorrect()` on each passed sentence / correct MCQ (+10 XP, gem, streak, toast — automatic).
- `awardWrong()` on a failed attempt (resets streak, loses a heart, gentle).
- **At the very end, gate it:** `completeTopic(totalCorrect, totalItems, 70)` — crown only if ≥70%. (Do **not** use the un-gated `completeActivity()`.)

---

## 3. Naming & IDs (use exactly)

| Thing | Value |
|---|---|
| `TOPIC_ID` | `2-1-2-bercerita` (existing route id — keep it) |
| Component file | `src/components/BahasaMelayuPage/Tahun2/Module1_Mendengar/BerceritaBincang.jsx` |
| Component export | `export default function BerceritaBincang(...)` |
| App.jsx lazy var | `BerceritaBincang` |
| Trail node | already exists in `ModuleData.js` (label "Bercerita & Berbincang") — **no ModuleData change needed** |

---

## 4. Flow (two tiers in one component)

Total graded items = **9 read-aloud sentences (Tier A) + 6 discussion MCQs (Tier B) = 15**. Run Tier A first, then Tier B, then the combined result screen with the 70% gate.

### Tier A — Bercerita (read aloud), per-sentence, lenient
For each of 3 stories, present its sentences one at a time:
1. Show story emoji + the **sentence text on screen** (the child reads it — this is reading practice, so DON'T auto-TTS it; offer a "🔊 Dengar" model button instead).
2. `READY` → child taps 🎤 → `LISTENING` → `SpeechManager.listen(...)` → on result, run **lenient match** (below).
3. Pass → `awardCorrect()`, score++, advance. Fail → `awardWrong()`, up to `MAX_ATTEMPTS=3`; after the last attempt, TTS-read the sentence (`.speak`) and advance (that sentence scores 0).
4. **Self-report fallback:** if `SpeechManager.getUnsupportedReason()` is truthy, OR a `perm`/`net` mic error occurs, render the sentence + "🔊 Dengar" + a **"Saya dah baca ✅"** button. Tapping it counts the sentence as passed (`awardCorrect()`, score++) and advances. (STT is a bonus, not a blocker.)

**Lenient match helper** (paste into the component):
```js
const normalize = (s) => s.toLowerCase().replace(/[.,!?]/g, '').replace(/\s+/g, ' ').trim();
const STOP = new Set(['di','ke','dan','itu','dia','yang','ada','seekor','dengan','pada','ini','para','se','ku','mu']);
const keyWords = (sentence) => normalize(sentence).split(' ').filter(w => w.length > 2 && !STOP.has(w));
function lenientPass(transcript, sentence, alts = []) {
  const tryOne = (t) => {
    const said = normalize(t).split(' ');
    const keys = keyWords(sentence);
    if (!keys.length) return false;
    const hit = keys.filter(k => said.some(w => w.includes(k) || k.includes(w))).length;
    return hit / keys.length >= 0.6;   // ≥60% of key words present = pass
  };
  return tryOne(transcript) || alts.some(a => tryOne(a.transcript));
}
```
Pass `grammarWords: keyWords(currentSentence)` into `SpeechManager.listen(...)` to bias recognition (as the politeness drill does with `grammarFor`).

### Tier B — Berbincang (guided MCQ)
For each of 6 scenarios: TTS reads the scenario (`.speak`), show 3–4 option buttons, child taps. Correct → `awardCorrect()`, score++. Wrong → `awardWrong()`, highlight the right answer. Then a "Seterusnya →" button. (Simple MCQ — you may reuse the option-button styling from `MorfologiPerluasan.jsx` or the `.bb-*` look; keep it consistent and child-friendly.)

### Result
After Tier B's last item: `completeTopic(totalCorrect, 15, 70)`; show stars/score + crown if passed, "Topik Seterusnya →" (calls `onNextTopic`) / "Cuba Lagi" (restart) / "Kembali" (`onBack`). Mirror the result UX of the politeness drill's COMPLETE screen, but add the **70% gate** wording (pass/fail), like `BMLessonQuizLayout` does.

---

## 5. Content — ready-to-paste data

Put these near the top of the new component.

```js
// Tier A — 3 short stories of different kinds (routine / animal / kindness). 9 sentences.
const STORIES = [
  { id: 's1', emoji: '🌅', title: 'Pagi Ali', sentences: [
    'Ali bangun awal pagi.',
    'Dia gosok gigi dan mandi.',
    'Kemudian Ali naik bas ke sekolah.',
  ]},
  { id: 's2', emoji: '🐱', title: 'Kucing Comel', sentences: [
    'Seekor kucing duduk di atas pagar.',
    'Kucing itu nampak seekor burung.',
    'Burung itu terbang tinggi ke langit.',
  ]},
  { id: 's3', emoji: '🤝', title: 'Menolong Kawan', sentences: [
    'Rani nampak kawannya jatuh.',
    'Dia membantu kawannya bangun.',
    'Mereka berkawan baik semula.',
  ]},
];

// Tier B — 6 guided-discussion MCQs (pick the appropriate idea/response).
const DISCUSSIONS = [
  { id: 'd1', emoji: '🚲', scenario: 'Rani nampak kawan jatuh basikal. Apa patut Rani buat?',
    answer: 'Tolong kawan itu bangun.', options: ['Tolong kawan itu bangun.', 'Ketawakan dia.', 'Lari pergi.', 'Buat tak nampak.'] },
  { id: 'd2', emoji: '👛', scenario: 'Kamu jumpa dompet di sekolah. Apa patut kamu buat?',
    answer: 'Beri kepada guru.', options: ['Beri kepada guru.', 'Simpan duitnya.', 'Buang dompet itu.', 'Biarkan sahaja.'] },
  { id: 'd3', emoji: '😢', scenario: 'Kawan kamu nampak sedih hari ini. Apa kamu boleh buat?',
    answer: 'Tanya dan pujuk dia.', options: ['Tanya dan pujuk dia.', 'Abaikan dia.', 'Ketawakan dia.', 'Marah dia.'] },
  { id: 'd4', emoji: '🧹', scenario: 'Bilik darjah kotor selepas rehat. Apa patut murid buat?',
    answer: 'Bersihkan bersama-sama.', options: ['Bersihkan bersama-sama.', 'Tunggu orang lain.', 'Tinggalkan begitu.', 'Tambah lagi sampah.'] },
  { id: 'd5', emoji: '🙋', scenario: 'Kamu tidak faham soalan cikgu. Apa patut kamu buat?',
    answer: 'Angkat tangan dan bertanya.', options: ['Angkat tangan dan bertanya.', 'Diam sahaja.', 'Tiru kawan.', 'Tinggalkan kosong.'] },
  { id: 'd6', emoji: '🧸', scenario: 'Adik kamu mahu bermain alat permainan kamu. Apa elok kamu buat?',
    answer: 'Berkongsi dengan adik.', options: ['Berkongsi dengan adik.', 'Rebut balik.', 'Marah adik.', 'Sorok alat itu.'] },
];
```
> Every `options` array is duplicate-free with `answer` included (apply the same rule we enforce everywhere).

---

## 6. Wiring (App.jsx only — ModuleData needs no change)

In [`src/App.jsx`](../../../App.jsx):

**(a)** Add a lazy import (near the other Module-1 BM imports, ~line 62):
```js
const BerceritaBincang = React.lazy(() => import('./components/BahasaMelayuPage/Tahun2/Module1_Mendengar/BerceritaBincang'));
```
**(b)** Repoint the T2 route (currently ~line 951–956, the `<ProgressWrapper>` version). Replace that whole block with the **Pattern-1 style** (no `ProgressWrapper`, pass `topicComplete`/`onNextTopic`):
```jsx
          if (bmTopic === '2-1-2-bercerita')
            return <Suspense fallback={<LoadingSpinner />}>
              <BerceritaBincang onBack={topicOnBack} language={language}
                topicComplete={(id) => markTopicCompleted(id)}
                onNextTopic={bmNextTopic} key={bmTopic} />
            </Suspense>;
```
**(c)** **Leave** the `BertuturBertatasusila` import (line 61) and the AgeGroup-7 standalone route (`currentAgeGame === 'bertutur-bertatasusila'`, ~line 1209) **exactly as they are.**

---

## 7. Definition of Done

- [ ] New `BerceritaBincang.jsx` exists; old `BerceritaBerbincang.jsx` + AG7 standalone untouched.
- [ ] **Tier A:** 3 stories / 9 sentences; per-sentence read-aloud; lenient match (≥60% key words); `grammarWords` passed to `listen`; 3 attempts then reveal+TTS.
- [ ] **Self-report fallback** works: with STT unavailable (or perm/net error), the "Saya dah baca ✅" path lets the child complete. Verify by checking the unsupported/perm branch renders the button.
- [ ] **Tier B:** 6 discussion MCQs; options duplicate-free; `answer` ∈ options.
- [ ] Combined gate: `completeTopic(totalCorrect, 15, 70)` — crown only ≥70%; result screen shows pass/fail + Next/Retry/Back.
- [ ] XP/hearts/gems via `useTopicGamification` (live), streak toast appears.
- [ ] T2 route repointed (no `ProgressWrapper`); AG7 standalone still shows politeness.
- [ ] `npm run build` passes; no console errors.

### Verify (manual)
`run-math-adventure` / `npm run dev` → BM → Tahun 2 → Modul 1 → **1.2 Bercerita & Berbincang**. Read a story aloud (and test the "Saya dah baca" fallback by denying mic), then answer the discussion MCQs; confirm gate + rewards. Also open the AG7 standalone "Bertutur Bertatasusila" and confirm it still works. **No Python/Playwright tests.**

---

## 8. Out of scope
- Renaming/cleaning up the misnamed `BerceritaBerbincang.jsx` or the orphaned AG7 file (cosmetic; later).
- `reviewQuestions` / spaced repetition (R22).
- Bercapah extension of topic 1.1 (that's R12, a different task).

## 9. After you finish — STOP at "pending verification"
1. In [`T2_COVERAGE_REPORT.md`](./T2_COVERAGE_REPORT.md), set the **R13 / 1.2** row to **🔍 Pending verification** (NOT ✅).
2. Add a slice-log handoff note: files changed, summary, how tested (including the mic-denied fallback path).
3. Commit on `main`.
4. **Do not self-mark ✅** — owner verifies first. If gaps found, fix and return to 🔍.
