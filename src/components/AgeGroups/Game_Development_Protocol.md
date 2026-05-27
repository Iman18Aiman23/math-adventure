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
📖 Reading: ✅ COMPLETE (6/6) - All Phonics Games Integrated!
  - Alphabet Safari ✅ COMPLETE (A-Z with animals)
    - `src/components/AgeGroup-4-6/AlphabetSafari.jsx`
    - `src/utils/localization.js` (text/language strings)
    - `src/utils/soundManager.js` (audio feedback)
    - `src/utils/gameStatsManager.js` (game progress tracking)
  - Letter Trace ✅ COMPLETE (A-Z tracing)
    - `src/components/AgeGroup-4-6/LetterTrace.jsx` (main component)
    - `src/components/AgeGroup-4-6/TraceCanvas.jsx` (canvas drawing)
    - `src/hooks/useTraceCanvas.js` (canvas drawing logic)
    - `src/utils/localization.js` (text/language strings)
    - `src/utils/soundManager.js` (audio feedback)
    - `src/utils/gameStatsManager.js` (game progress tracking)
  - Phonics Pop ✅ COMPLETE (Bubble popping phonetics game)
    - `src/components/AgeGroup-4-6/PhoneticsPop.jsx`
    - `src/utils/soundManager.js`
    - `src/utils/gameStatsManager.js`
  - Sound Matching ✅ COMPLETE (Listen and match letter to sound)
    - `src/components/AgeGroup-4-6/SoundMatching.jsx`
    - `src/utils/soundManager.js`
    - `src/utils/gameStatsManager.js`
  - Letter-Sound Puzzle ✅ COMPLETE (Drag letters to match sounds)
    - `src/components/AgeGroup-4-6/LetterSoundPuzzle.jsx`
    - `src/utils/soundManager.js`
    - `src/utils/gameStatsManager.js`
  - Phonics Sprint ✅ COMPLETE (Racing game to collect letter sounds)
    - `src/components/AgeGroup-4-6/PhoneticsSprint.jsx`
    - `src/utils/soundManager.js`
    - `src/utils/gameStatsManager.js`

🗣 Speaking: ⏳ PENDING
✒ Jawi Script: ⏳ PENDING
🔢 Mathematics: ⏳ PENDING

---

🟡 **Age 7: Grade 1 Adventurers (FORMERLY Age 6-7)**
📖 Reading: ✅ COMPLETE (3/3) - Sentence Building & Grammar Games!
  - Sentence Builder ✅ COMPLETE (Arrange words in order)
    - `src/components/AgeGroup-7/SentenceBuilder.jsx`
    - `src/utils/soundManager.js` (audio feedback)
    - `src/utils/gameStatsManager.js` (game progress tracking)
  - Word Family Match ✅ COMPLETE (Rhyming word families)
    - `src/components/AgeGroup-7/WordFamilyMatch.jsx`
    - `src/utils/soundManager.js`
    - `src/utils/gameStatsManager.js`
  - Grammar Detective ✅ COMPLETE (Correct grammar detection)
    - `src/components/AgeGroup-7/GrammarDetective.jsx`
    - `src/utils/soundManager.js`
    - `src/utils/gameStatsManager.js`

🗣 Speaking: ⏳ PENDING
✒ Jawi Script: ⏳ PENDING
🔢 Mathematics: ✅ COMPLETE (3/3) - Time & Money Games!
  - Time Teller ✅ COMPLETE (Read analog clock)
    - `src/components/AgeGroup-7/TimeTeller.jsx`
    - `src/utils/soundManager.js`
    - `src/utils/gameStatsManager.js`
  - Counting Money ✅ COMPLETE (Count coins and calculate)
    - `src/components/AgeGroup-7/CountingMoney.jsx`
    - `src/utils/soundManager.js`
    - `src/utils/gameStatsManager.js`
  - Subtraction Story ✅ COMPLETE (Word problems with subtraction)
    - `src/components/AgeGroup-7/SubtractionStory.jsx`
    - `src/utils/soundManager.js`
    - `src/utils/gameStatsManager.js`

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
| Games (Age 4-6) | 6 games | 6 games | ✅ Preserved |
| Games (Age 7-9) | None | None | ⏳ Pending |

---

**Last Updated:** 2026-05-27  
**Version:** 2.0 (Post-Restructuring)  
**Status:** Ready for Game Development Continuation
