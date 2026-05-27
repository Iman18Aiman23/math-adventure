Plan & Strategize: Inside the Main Page maintain the existing button Reading, Speaking, Jawi Script and Mathematics.

Step 1: 
Create new button professional age-based categories and curate game ideas.

**RESTRUCTURED AGE GROUPS (Updated 2026-05-27)**

1. Age 4-6 (COMBINED)
Button Name: Early Explorers & Kindergarten Scholars (Teroka Awal & Cendekiawan Tadika)
Focus: Basic recognition, phonics, counting, syllables, simple words, basic addition, and counting to 20.

2. Age 7
Button Name: Grade 1 Adventurers (Tahun 1)
Focus: Reading simple sentences, basic grammar, subtraction, and time.

3. Age 8
Button Name: Grade 2 Discoverers (Penjelajah Gred 2)
Focus: "Imbuhan" (prefixes/suffixes), multiplication intro, money, and tenses.

4. Age 9
Button Name: Grade 3 Achievers (Pencapaian Gred 3)
Focus: Grammar, punctuation, division, fractions, and complex vocabulary.

---

Step 2: 
Master Game Development Workflow
Objective.

You are a Senior React Frontend Engineer and Educational Content Strategist. Your goal is to plan and build high-performance, lightweight educational games for children aged 4-9.

1. Domain Knowledge (Fixed Context)
A. Main Page Categories (Fixed Navigation)
The application uses four main subject pillars. All game ideas must fall under one of these:
    Reading (Literacy, Phonics, Vocabulary).
    Speaking (Pronunciation, Audio interaction).
    Jawi Script (Jawi characters, reading).
    Mathematics (Numbers, Logic, Shapes).

B. Age-Based Levels (Fixed Curriculum) - UPDATED
You must use these exact professional names and focus areas for age groups:

Age 4-6: Early Explorers & Kindergarten Scholars (Teroka Awal & Cendekiawan Tadika)
Focus: Basic recognition, phonics, syllables, words, counting to 20, basic addition, and motor skills.

Age 7: Grade 1 Adventurers (Tahun 1)
Focus: Reading simple sentences, basic grammar, subtraction, and time.

Age 8: Grade 2 Discoverers (Penjelajah Gred 2)
Focus: "Imbuhan" (prefixes/suffixes), multiplication intro, money, and tenses.

Age 9: Grade 3 Achievers (Pencapaian Gred 3)
Focus: Grammar, punctuation, division, fractions, and complex vocabulary.

---

2. 📂 File Organization by Age Group (CRITICAL) - UPDATED STRUCTURE

**IMPORTANT:** All game component files must be stored in age-group-specific folders:

```
src/components/
├── AgeGroup-4-6/          ← Age 4-6 Early Explorers & Kindergarten games (COMBINED)
│   ├── EarlyExplorersHome.jsx
│   ├── AlphabetSafari.jsx
│   ├── LetterTrace.jsx
│   ├── TraceCanvas.jsx
│   └── [All Age 4-6 games here]
├── AgeGroup-7/            ← Age 7 Grade 1 Adventurers games (RENAMED from AgeGroup-6-7)
│   ├── Grade1AdventurersHome.jsx
│   └── [All Age 7 games here]
├── AgeGroup-8/            ← Age 8 Grade 2 Discoverers games (RENAMED from AgeGroup-7-8)
│   ├── Grade2DiscoverersHome.jsx
│   └── [All Age 8 games here]
├── AgeGroup-9/            ← Age 9 Grade 3 Achievers games (RENAMED from AgeGroup-8-9)
│   ├── Grade3AchieversHome.jsx
│   └── [All Age 9 games here]
├── ReadingPage/           ← (Legacy - DO NOT USE for new games)
├── MathematicsPage/       ← (Legacy - DO NOT USE for new games)
├── SpeakingPage/          ← (Legacy - DO NOT USE for new games)
└── JawiScriptPage/        ← (Legacy - DO NOT USE for new games)
```

**MIGRATION NOTES:**
- AgeGroup-4-5 has been RENAMED to AgeGroup-4-6 (merged with age-5-6 content)
- AgeGroup-5-6 has been DELETED (content merged into AgeGroup-4-6)
- AgeGroup-6-7 has been RENAMED to AgeGroup-7
- AgeGroup-7-8 has been RENAMED to AgeGroup-8
- AgeGroup-8-9 has been RENAMED to AgeGroup-9

**When developing a new game:**
1. ✅ Create component file in the **corresponding age group folder** (e.g., `src/components/AgeGroup-7/MyNewGame.jsx`)
2. ✅ Update **imports in `src/App.jsx`** to point to the new age group folder
3. ✅ Do NOT store files in the old ReadingPage, MathematicsPage, SpeakingPage, JawiScriptPage folders
4. ✅ All relative imports (`../../utils`, `../../services`) will work the same way

**Example for Age 7 Reading Game:**
```javascript
// src/components/AgeGroup-7/MyGame.jsx
import { playSound } from '../../utils/soundManager';
import SpeechManager from '../../services/SpeechManager';
import AppHeader from '../AppHeader';

export default function MyGame({ onBack, language }) {
  // Game code here
}

// Then add to src/App.jsx:
import MyGame from './components/AgeGroup-7/MyGame';
```

---

3. Technical Standards & Constraints (CRITICAL)
When entering Coding Mode, you MUST adhere to these strict requirements:

Tech Stack: React (Functional Components with Hooks only), inline styles using the Duolingo design tokens from `src/index.css` (e.g. `var(--duo-green)`, `var(--duo-blue)`, `var(--font-heading)`). Do NOT introduce Tailwind, styled-components, or any other CSS framework — this project uses inline styles + CSS custom properties consistently across all components.

Libraries:
AVOID: Phaser, Three.js, jQuery, or heavy game engines.
USE: Lucide-react or Heroicons for icons. NO heavy JPG/PNG images.

Performance Optimization (Mandatory):
Use React.memo for child components to prevent unnecessary re-renders.
Use useCallback for all event handlers.
Use useMemo for heavy data computations.
Ensure useEffect has a cleanup function (e.g., clearing timers) to prevent memory leaks.
Code Quality: Clean, modular, readable code. Hardcode game data inside the file to avoid external API latency.

---

4. Iterative Workflow
IMPORTANT: Do NOT generate the full list of 100 games at once. You must proceed one category at a time to ensure quality and allow for user adjustments.

Step 1: Initialization
When you start, do not generate games. Instead, ask the user:"I am ready to build the curriculum. Which Age Group and Subject would you like to start with? (e.g., 'Age 4-6 Reading' or 'Age 9 Math')".

Step 2: Execution (Per Request)
Once the user selects a specific Age Group + Subject (e.g., Age 4-6 Reading):
-  Generate exactly 5 game ideas for that specific cell.
- Output the Progress Update Block (see below) marking this cell as "✅ COMPLETE" and all others as "⏳ PENDING".

Step 3: Iterative Coding (Building the Game)
Once the 5 ideas are generated, you must proactively ask the user:"Which game would you like me to build first? (e.g., 'Build Alphabet Safari')"

Once the user selects a game:
- Generate the full React component (Code) for that specific game.
- Update the Progress Block (see below) to mark that specific game as "✅ COMPLETE".
- After coding one game, ask: "Shall I proceed to code the next game: [Next Game Name]?"

Step 4: The Progress Update Block
After generating ideas OR coding a game, you MUST output the following MD block. If a category has been planned, list the games inside it. If a game has been coded, mark it ✅.

---

### 📋 Project Curriculum Status (UPDATED 2026-05-27)

🟢 **Age 4–6: Early Explorers & Kindergarten Scholars (COMBINED)**

📖 Reading: ✅ COMPLETE (7/7) — Phonics + Learn Card!
  - **Belajar A–Z** ✅ COMPLETE — Tap-through A-Z flashcards; "A untuk Ayam" BM-first words; tap-to-listen TTS
    - `src/components/AgeGroup-4-6/AlphabetCards.jsx`
  - Alphabet Safari ✅ COMPLETE (A-Z with animals)
    - `src/components/AgeGroup-4-6/AlphabetSafari.jsx`
  - Letter Trace ✅ COMPLETE (A-Z tracing)
    - `src/components/AgeGroup-4-6/LetterTrace.jsx`
    - `src/components/AgeGroup-4-6/TraceCanvas.jsx`
    - `src/hooks/useTraceCanvas.js`
  - Phonics Pop ✅ COMPLETE (Bubble popping phonetics game)
    - `src/components/AgeGroup-4-6/PhoneticsPop.jsx`
  - Sound Matching ✅ COMPLETE (Listen and match letter to sound)
    - `src/components/AgeGroup-4-6/SoundMatching.jsx`
  - Letter-Sound Puzzle ✅ COMPLETE (Drag letters to match sounds)
    - `src/components/AgeGroup-4-6/LetterSoundPuzzle.jsx`
  - Phonics Sprint ✅ COMPLETE (Racing game to collect letter sounds)
    - `src/components/AgeGroup-4-6/PhoneticsSprint.jsx`

🗣 Speaking: ✅ COMPLETE (3/3) — Voice (STT) Games! (built 2026-05-27)
  > Uses SpeechManager (Web Speech API STT+TTS). Shared component `SpeakingGame4to6.jsx` with `category` prop. Visible mic-error handling (permission / network / no-speech). Cross-platform: iPhone/iPad sync-gesture path, Android tap, macOS/desktop auto-listen.
  - **Sebut Huruf** ✅ COMPLETE — TTS says "A untuk Ayam"; child speaks letter/word/phrase; A–Z
    - `src/components/AgeGroup-4-6/SpeakingGame4to6.jsx` (category="huruf")
  - **Sebut Perkataan** ✅ COMPLETE — Emoji + word shown; child says the BM word; 20-word bank
    - `src/components/AgeGroup-4-6/SpeakingGame4to6.jsx` (category="perkataan")
  - **Sebut Nombor** ✅ COMPLETE — Numeral + ⭐ dots; child says BM number 1–10
    - `src/components/AgeGroup-4-6/SpeakingGame4to6.jsx` (category="nombor")

✒ Jawi Script: ✅ COMPLETE (2/2) — Learn Card + Match Game! (built 2026-05-27)
  > Most basic Jawi foundation for ages 4–6: recognising the 36 Huruf Jawi + their names, read right-to-left. Uses `src/utils/jawiData.js` (JAWI_ALPHABET).
  - **Belajar Huruf Jawi** ✅ COMPLETE — Tap-through flashcards of all 36 Jawi letters (big glyph + rumi name); tap-to-listen; RTL note + RTL jump grid
    - `src/components/AgeGroup-4-6/JawiLetterCards.jsx`
  - **Padan Huruf Jawi** ✅ COMPLETE — Show Jawi glyph → pick correct rumi name (4-choice); 10 rounds; distractors deduped by name (ت/ط both "Ta", ح/ه both "Ha")
    - `src/components/AgeGroup-4-6/JawiLetterMatch.jsx`

🔢 Mathematics: ✅ COMPLETE (6/6) — Learn Card + 5 Games! (built 2026-05-27)
  - **Belajar 1–20** ✅ COMPLETE — Tap-through 1-20 flashcards; emoji quantity visual; tap-to-listen TTS
    - `src/components/AgeGroup-4-6/NumberCards.jsx`
  - **Kira Bintang** ✅ COMPLETE — Count a random emoji cluster (1–20); 4-choice MCQ; 10 rounds
    - `src/components/AgeGroup-4-6/CountingStars.jsx`
  - **Isih Bentuk** ✅ COMPLETE — Identify shape (Circle/Square/Triangle/Rectangle); inline SVG previews; fun facts
    - `src/components/AgeGroup-4-6/ShapeSorter.jsx`
  - **Padankan Nombor** ✅ COMPLETE — Match dot-card to numeral (1–10); SVG dot layouts; covers all 10 digits per session
    - `src/components/AgeGroup-4-6/NumberMatch.jsx`
  - **Tambah Buah** ✅ COMPLETE — Visual fruit addition (a+b ≤ 10); two boxed groups + equation; random fruit per round
    - `src/components/AgeGroup-4-6/AppleAddition.jsx`
  - **Nombor Hilang** ✅ COMPLETE — Find missing number in sequence; 7 consecutive + 3 skip-by-2 rounds; dashed blank box
    - `src/components/AgeGroup-4-6/MissingNumber.jsx`

---

🟡 **Age 7: Grade 1 Adventurers (FORMERLY Age 6-7)**

> KSSR BM Tahun 1 coverage: **15/21 objectives** (Obj 1, 2, 4, 5, 6, 7, 8, 9, 10, 12, 16, 17, 18, 19, 21)
> Practical ceiling is **15/21** — 6 remaining objectives require oral production or creative writing (not feasible digitally).
> Badge in Grade1AdventurersHome.jsx shows "KSSR 15/21".

> **Not feasible digitally (6 objectives):** Obj 3 (bertutur bertatasusila), Obj 11 (membaca kuat dengan sebutan), Obj 13, Obj 14 (menyoal), Obj 15 (menyanyi/deklamasi), Obj 20 (menulis kreatif).

📖 Reading: ✅ COMPLETE (9/9) — KSSR BM Tahun 1 Batch 1 + Batch 2 done!

**Batch 1 (6 games):**
  - Bina Ayat (Sentence Builder) ✅ COMPLETE — KSSR Obj 8, 21: Membina ayat penyata mudah
    - `src/components/AgeGroup-7/SentenceBuilder.jsx`
  - Suku Kata (Syllable Builder) ✅ COMPLETE — KSSR Obj 1, 4, 7: Suku kata KVKV & membaca
    - `src/components/AgeGroup-7/SukuKataBinaPerkataan.jsx`
  - Jenis Kata (Word Types) ✅ COMPLETE — KSSR Obj 16, 17: Kata Nama Am/Khas, Kata Kerja, Kata Adjektif
    - `src/components/AgeGroup-7/JenisKata.jsx`
  - Kata Tanya (Question Words) ✅ COMPLETE — KSSR Obj 2: Siapa, Apa, Di mana, Bila, Mengapa
    - `src/components/AgeGroup-7/KataTanya.jsx`
  - Kata Hubung & Sendi ✅ COMPLETE — KSSR Obj 18: dan/tetapi/atau, di/ke/dari
    - `src/components/AgeGroup-7/KataHubungSendi.jsx`
  - Kata Imbuhan (Word Prefixes) ✅ COMPLETE — KSSR Obj 19: Awalan ber-, me-
    - `src/components/AgeGroup-7/KataImbuhan.jsx`

**Batch 2 (3 games) — ✅ COMPLETE (built 2026-05-27):**
  - Ejaan & Tanda Baca ✅ COMPLETE — KSSR Obj 5, 6: Pick correct spelling (2-choice) / punctuation mark (. ! ?); 8 alternating questions
    - `src/components/AgeGroup-7/EjaanTandaBaca.jsx`
  - Kata Ganda ✅ COMPLETE — KSSR Obj 9, 10: Show kata ganda + context sentence → pick correct meaning; Penuh & Berentak types; 8 questions
    - `src/components/AgeGroup-7/KataGanda.jsx`
  - Kefahaman Bacaan ✅ COMPLETE — KSSR Obj 12: 3 passages × 3 comprehension questions; passage always visible while answering
    - `src/components/AgeGroup-7/KefahamanBacaan.jsx`

> ⚠️ NOTE: WordFamilyMatch.jsx and GrammarDetective.jsx were REMOVED — they used English phonics/grammar which is wrong for BM Tahun 1 KSSR. Replaced by SukuKataBinaPerkataan and JenisKata respectively.

📖 Reading Batch 3 — ⏳ PENDING (no games planned yet):
  > KSSR practical ceiling reached at 15/21. All remaining objectives require oral/creative skills. No further BM reading games needed unless new objectives are identified.

🗣 Speaking: ⏳ PENDING
✒ Jawi Script: ✅ COMPLETE (5/5) — KSSR Pendidikan Islam Obj 10 (built 2026-05-27)
  > Maps to KSSR Pendidikan Islam Tahun 1 **Objektif 10**: "Membaca, membina dan menulis ayat atau teks dalam tulisan jawi dan khat." Step up from Age 4–6 (letter recognition) → syllables, words, sentences, writing. Reuses existing data: `jawiSukuKataData.js`, `jawiWordsData.js`, `jawiStoriesData.js`, `jawiData.js`.
  - **Baca Suku Kata Jawi** ✅ COMPLETE — Obj 10 (Membaca): show Jawi syllable glyph → pick correct rumi reading; 10 rounds; distractors from different base letters so glyph is unambiguous; tap-to-listen TTS
    - `src/components/AgeGroup-7/BacaSukuKataJawi.jsx`
  - **Bina Perkataan Jawi** ✅ COMPLETE — Obj 10 (Membina): show emoji + rumi word → tap Jawi letter tiles in correct right-to-left order; only-correct-next-tile accepted; Undo/Clear; 8 short words (3–4 letters)
    - `src/components/AgeGroup-7/BinaPerkataanJawi.jsx`
  - **Padan Perkataan Jawi** ✅ COMPLETE — Obj 10 (Membaca perkataan): show whole Jawi word → pick correct meaning (emoji + rumi, 4-choice); 10 rounds; tap-to-listen
    - `src/components/AgeGroup-7/PadanPerkataanJawi.jsx`
  - **Baca Ayat Jawi** ✅ COMPLETE — Obj 10 (Membaca ayat/teks): Jawi sentence cloze — pick the missing Jawi word; BM/eng meaning shown as reading aid; uses clean story paragraphs (no "/" or "*" tokens); 8 rounds
    - `src/components/AgeGroup-7/BacaAyatJawi.jsx`
  - **Tulis Jawi (Khat)** ✅ COMPLETE — Obj 10 (Menulis/khat): free-draw canvas over a faint model glyph; Clear, Show/Hide guide, Prev/Next across all 36 letters; tap-to-listen. (Free-draw, not segment-validated — Jawi has no vector path data like the Latin tracer.)
    - `src/components/AgeGroup-7/TulisJawi.jsx`
🔢 Mathematics: ✅ COMPLETE (3/3) - KSSR Matematik Tahun 1 Games!
  - Time Teller ✅ COMPLETE (Read analog clock — masa)
    - `src/components/AgeGroup-7/TimeTeller.jsx`
  - Counting Money ✅ COMPLETE (Count coins and calculate — wang)
    - `src/components/AgeGroup-7/CountingMoney.jsx`
  - Subtraction Story ✅ COMPLETE (Word problems — cerita penolakan)
    - `src/components/AgeGroup-7/SubtractionStory.jsx`

---

🟠 **Age 8: Grade 2 Discoverers (FORMERLY Age 7-8)**
📖 Reading: ⏳ PENDING
🗣 Speaking: ⏳ PENDING
✒ Jawi Script: ⏳ PENDING
🔢 Mathematics: ⏳ PENDING

---

🔵 **Age 9: Grade 3 Achievers (FORMERLY Age 8-9)**
📖 Reading: ⏳ PENDING
🗣 Speaking: ⏳ PENDING
✒ Jawi Script: ⏳ PENDING
🔢 Mathematics: ⏳ PENDING

---

## Summary of Changes from Restructuring

| Component | Before | After | Status |
|-----------|--------|-------|--------|
| Age Groups | 5 groups | 4 groups | ✅ Updated |
| Age 4-5 & 5-6 | Separate | Merged to age-4-6 | ✅ Combined |
| Folder Names | AgeGroup-4-5, 5-6, 6-7, 7-8, 8-9 | AgeGroup-4-6, 7, 8, 9 | ✅ Renamed |
| Home Pages | Generic | Dedicated per age | ✅ Standardized |
| Games (Age 4-6) Reading | 6 phonics games | 7 games (+ Belajar A–Z learn card) | ✅ Complete |
| Games (Age 4-6) Math | 0 | 6 games (Belajar 1–20 + 5 quiz games) | ✅ Complete |
| Games (Age 4-6) Speaking | 0 | 3 voice/STT games (Sebut Huruf, Perkataan, Nombor) | ✅ Complete |
| Games (Age 4-6) Jawi | 0 | 2 games (Belajar Huruf Jawi + Padan Huruf Jawi) | ✅ Complete |
| Games (Age 7) BM | WordFamilyMatch, GrammarDetective (English, wrong) | 9 KSSR-aligned BM games (Batch 1 + 2) | ✅ Rebuilt |
| Games (Age 7) Jawi | 0 | 5 games (KSSR Pendidikan Islam Obj 10) | ✅ Complete |
| Games (Age 7) Math | 3 games | 3 games | ✅ Preserved |
| Games (Age 7) KSSR coverage | — | 15/21 BM objectives (practical ceiling reached) | ✅ Done |
| Games (Age 8-9) | None | None | ⏳ Pending |

---

**Last Updated:** 2026-05-27  
**Version:** 2.6 (Age 7 Jawi COMPLETE — KSSR Pendidikan Islam Obj 10)  
**Status:** Age 4–6 fully complete: Reading 7/7, Speaking 3/3, Jawi 2/2, Math 6/6. Age 7 Reading 9/9 (15/21 KSSR BM), Jawi 5/5 (PI Obj 10), Math 3/3 complete — only Age 7 Speaking pending. Age 8 & 9 pending.
