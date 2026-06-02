Plan & Strategize: Inside the Main Page maintain the existing button Reading, Speaking,Jawi Script and Mathematics. 

Step 1 : 
Create new button professional age-based categories and curate game ideas.

1. Age 4-5
Button Name: Early Explorers (or Prasekolah Awal)
Focus: Basic recognition, phonics, counting, and motor skills.

2. Age 5-6
Button Name: Kindergarten Scholars (or Pra-Sekolah)
Focus: Suku kata (syllables), simple words, basic addition, and counting to 20.

3. Age 6-7
Button Name: Grade 1 Adventurers (or Tahun 1)
Focus: Reading simple sentences, basic grammar, subtraction, and time.

4. Age 7-8
Button Name: Grade 2 Discoverers (or Tahun 2)
Focus: "Imbuhan" (prefixes/suffixes), multiplication intro, money, and tenses.

5. Age 8-9
Button Name: Grade 3 Achievers (or Tahun 3)
Focus: Grammar, punctuation, division, fractions, and complex vocabulary.

Step 2 : 
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

B. Age-Based Levels (Fixed Curriculum)
You must use these exact professional names and focus areas for age groups:

Age 4-5: Early Explorers (or Prasekolah Awal)
Focus: Basic recognition, phonics, counting, and motor skills.
Age 5-6: Kindergarten Scholars (or Pra-Sekolah)
Focus: Suku kata (syllables), simple words, basic addition, and counting to 20.
Age 6-7: Grade 1 Adventurers (or Tahun 1)
Focus: Reading simple sentences, basic grammar, subtraction, and time.
Age 7-8: Grade 2 Discoverers (or Tahun 2)
Focus: "Imbuhan" (prefixes/suffixes), multiplication intro, money, and tenses.
Age 8-9: Grade 3 Achievers (or Tahun 3)
Focus: Grammar, punctuation, division, fractions, and complex vocabulary.

2. 📂 File Organization by Age Group (CRITICAL)

**IMPORTANT:** All game component files must be stored in age-group-specific folders:

```
src/components/
├── AgeGroup-4-5/          ← Age 4-5 Early Explorers games
│   ├── AlphabetSafari.jsx
│   ├── LetterTrace.jsx
│   ├── TraceCanvas.jsx
│   └── [All Age 4-5 games here]
├── AgeGroup-5-6/          ← Age 5-6 Kindergarten Scholars games
│   └── [All Age 5-6 games here]
├── AgeGroup-6-7/          ← Age 6-7 Grade 1 Adventurers games
│   └── [All Age 6-7 games here]
├── AgeGroup-7-8/          ← Age 7-8 Grade 2 Discoverers games
│   └── [All Age 7-8 games here]
├── AgeGroup-8-9/          ← Age 8-9 Grade 3 Achievers games
│   └── [All Age 8-9 games here]
├── ReadingPage/           ← (Legacy - DO NOT USE for new games)
├── MathematicsPage/       ← (Legacy - DO NOT USE for new games)
├── SpeakingPage/          ← (Legacy - DO NOT USE for new games)
└── JawiScriptPage/        ← (Legacy - DO NOT USE for new games)
```

**When developing a new game:**
1. ✅ Create component file in the **corresponding age group folder** (e.g., `src/components/AgeGroup-5-6/MyNewGame.jsx`)
2. ✅ Update **imports in `src/App.jsx`** to point to the new age group folder
3. ✅ Do NOT store files in the old ReadingPage, MathematicsPage, SpeakingPage, JawiScriptPage folders
4. ✅ All relative imports (`../../utils`, `../../services`) will work the same way

**Example for Age 5-6 Reading Game:**
```javascript
// src/components/AgeGroup-5-6/MyGame.jsx
import { playSound } from '../../utils/soundManager';
import SpeechManager from '../../services/SpeechManager';
import AppHeader from '../AppHeader';

export default function MyGame({ onBack, language }) {
  // Game code here
}

// Then add to src/App.jsx:
import MyGame from './components/AgeGroup-5-6/MyGame';
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

3. Iterative Workflow
IMPORTANT: Do NOT generate the full list of 100 games at once. You must proceed one category at a time to ensure quality and allow for user adjustments.

Step 1: Initialization
When you start, do not generate games. Instead, ask the user:"I am ready to build the curriculum. Which Age Group and Subject would you like to start with? (e.g., 'Age 4-5 Reading' or 'Age 8-9 Math')".

Step 2: Execution (Per Request)
Once the user selects a specific Age Group + Subject (e.g., Age 4-5 Reading):
-  Generate exactly 5 game ideas for that specific cell.
- Output the Progress Update Block (see below) marking this cell as "✅ COMPLETE" and all others as "⏳ PENDING".

Step 3: Iterative Coding (Building the Game)Once the 5 ideas are generated, you must proactively ask the user:"Which game would you like me to build first? (e.g., 'Build Alphabet Safari')"

Once the user selects a game:

Generate the full React component (Code) for that specific game.
Update the Progress Block (see below) to mark that specific game as "✅ COMPLETE".
After coding one game, ask: "Shall I proceed to code the next game: [Next Game Name]?"

Step 4: The Progress Update BlockAfter generating ideas OR coding a game, you MUST output the following MD block.If a category has been planned, list the games inside it.If a game has been coded, mark it ✅.


🟢 Age 4–5: Early Explorers📖 Reading: [STATUS]
Alphabet Safari [STATUS]
Letter Trace [STATUS]
Phonics Pop [STATUS]
Picture–Letter Match [STATUS]
Big Letter Hunt [STATUS]
🗣 Speaking: [STATUS]✒ Jawi Script: [STATUS]🔢 Mathematics: [STATUS]

🟡 Age 5–6: Kindergarten Scholars📖 Reading: [STATUS]... (Repeat for all groups)



Update the progress..
### 📋 Project Curriculum Status🟢 
🟢 Age 4–5: Early Explorers
📖 Reading: ✅ COMPLETE (6/6) - All Phonics Games Integrated!
  - Alphabet Safari ✅ COMPLETE (A-Z with animals)
    - `src/components/AgeGroup-4-5/AlphabetSafari.jsx`
    - `src/utils/localization.js` (text/language strings)
    - `src/utils/soundManager.js` (audio feedback)
    - `src/utils/gameStatsManager.js` (game progress tracking)
  - Letter Trace ✅ COMPLETE (A-Z tracing)
    - `src/components/AgeGroup-4-5/LetterTrace.jsx` (main component)
    - `src/components/AgeGroup-4-5/TraceCanvas.jsx` (canvas drawing)
    - `src/hooks/useTraceCanvas.js` (canvas drawing logic)
    - `src/utils/localization.js` (text/language strings)
    - `src/utils/soundManager.js` (audio feedback)
    - `src/utils/gameStatsManager.js` (game progress tracking)
  - Phonics Pop ✅ COMPLETE (Bubble popping phonetics game)
    - `src/components/AgeGroup-4-5/PhoneticsPop.jsx`
    - `src/utils/soundManager.js`
    - `src/utils/gameStatsManager.js`
  - Sound Matching ✅ COMPLETE (Listen and match letter to sound)
    - `src/components/AgeGroup-4-5/SoundMatching.jsx`
    - `src/utils/soundManager.js`
    - `src/utils/gameStatsManager.js`
  - Letter-Sound Puzzle ✅ COMPLETE (Drag letters to match sounds)
    - `src/components/AgeGroup-4-5/LetterSoundPuzzle.jsx`
    - `src/utils/soundManager.js`
    - `src/utils/gameStatsManager.js`
  - Phonics Sprint ✅ COMPLETE (Racing game to collect letter sounds)
    - `src/components/AgeGroup-4-5/PhoneticsSprint.jsx`
    - `src/utils/soundManager.js`
    - `src/utils/gameStatsManager.js`
🗣 Speaking: ⏳ PENDING
✒ Jawi Script: ⏳ PENDING
🔢 Mathematics: ⏳ PENDING

🟡 Age 5–6: Kindergarten Scholars
📖 Reading: ⏳ PENDING
🗣 Speaking: ⏳ PENDING
✒ Jawi Script: ⏳ PENDING
🔢 Mathematics: ⏳ PENDING

🟠 Age 6–7: Grade 1 Adventurers
📖 Reading: ⏳ PENDING
🗣 Speaking: ⏳ PENDING
✒ Jawi Script: ⏳ PENDING
🔢 Mathematics: ⏳ PENDING

🔵 Age 7–8: Grade 2 Discoverers
📖 Reading: ⏳ PENDING
🗣 Speaking: ⏳ PENDING
✒ Jawi Script: ⏳ PENDING
🔢 Mathematics: ⏳ PENDING

🔴 Age 8–9: Grade 3 Achievers
📖 Reading: ⏳ PENDING
🗣 Speaking: ⏳ PENDING
✒ Jawi Script: ⏳ PENDING
🔢 Mathematics: ⏳ PENDING