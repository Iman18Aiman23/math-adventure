# Plan — Rebuild T2 M2 TOPIK 2.1 "Perkataan Sukar (Digraf & Diftong)"

**Owner of spec:** Claude (planning)
**Implemented by:** other agent(s)
**Verified by:** Claude → user marks complete

> **Workflow (per project build→verify loop):**
> 1. Implementing agent builds a slice exactly to this spec.
> 2. Agent flips that slice's status to **🔍 Pending verification** in the Status Board (§8) and writes a one-line note of what was done.
> 3. User asks Claude to verify against the DoD (§7). Claude confirms → marks **✅ Complete**, or sends it back with findings.
> 4. Do **not** bulk-build all slices. One slice at a time, in order. Slice 1 first.

---

## 1. Goal

Replace the current quiz-only "Perkataan Sukar" learn page with a **KV-style trilingual flashcard module** that teaches Malay digraf (ng, ny, kh, sy) and diftong (ai, au, oi) words, reusing the exact UI/UX of [`src/components/ReadingPage/KVLearningPage.jsx`](../../src/components/ReadingPage/KVLearningPage.jsx).

It stays the **single existing hub node** `2-2-1-perkataan-sukar` (display num **2.1**). No new hub nodes, no new routes.

Decisions already locked with the user:
- **Nav = one node, 3 levels:** category → letter → flashcards.
- **Coverage = real words only, varying count** per letter. Omit any letter that has no genuine Malay word for that sound. No contrived/archaic filler.
- **Every word is trilingual:** RUMI (ms), ENG (en), JAWI.

---

## 2. Final UX

```
TOPIK 2.1 Perkataan Sukar (Digraf & Diftong)
 │
 ├─ VIEW 1 — Category picker (7 tiles, reuse .kv-letter-tile grid styling)
 │     Digraf ng · Digraf ny · Digraf kh · Digraf sy · Diftong ai · Diftong au · Diftong oi
 │     (each tile shows its sound + count of letters available)
 │
 ├─ VIEW 2 — Letter grid (only letters that have ≥1 real word for the chosen sound)
 │     e.g. Digraf ng → B C D ... (varies)
 │
 └─ VIEW 3 — Flashcards (identical to KV flashcard view)
       • RUMI / ENG / JAWI script toggle (Jawi = RTL + Lateef font)
       • Big word in selected script + translation line + emoji
       • "Dengar" tap-to-listen (SpeechManager: ms-MY for RUMI/JAWI, en-US for ENG)
       • Prev / Next, and "Siri selesai!" completion popup → next letter or back to letters
       • Optional "🎯 Sedia untuk Kuiz?" button retained (see §5, Step 3)
```

Accent colour for this module = M2 blue **`#1E7AC9`** (replaces KV's orange `#E8821A` CTA / green accents where a single accent is used).

---

## 3. Files to create / edit

| # | File | Action |
|---|------|--------|
| 3.1 | `src/data/curriculum/bm_perkataan_sukar.js` | **Create** — the trilingual dataset + helpers |
| 3.2 | `src/components/BahasaMelayuPage/Tahun2/Module2_Membaca/PerkataanSukarLearningPage.jsx` | **Create** — fork of `KVLearningPage.jsx` with the extra category level |
| 3.3 | `src/components/BahasaMelayuPage/Tahun2/Module2_Membaca/PerkataanSukar.jsx` | **Edit** — swap its in-file `GROUPS` learn page for `<PerkataanSukarLearningPage>`; keep quiz |
| 3.4 | `src/components/BahasaMelayuPage/BAHASA_MELAYU.md` | **Edit** — note 2.1 is now a trilingual flashcard module |

**No changes** to `ModuleData.js` topic list or `App.jsx` routing — the node id `2-2-1-perkataan-sukar` and its route already exist.

---

## 4. Data module spec — `bm_perkataan_sukar.js`

### 4.1 Item shape
```js
{
  id:   'ng_b_bangku',          // `${category}_${letter}_${rumiword}`, unique, lowercase
  word: 'bangku',               // rumi base (lowercase)
  syl:  'bang-ku',              // rumi split into suku kata, hyphen-separated, lowercase
  letter: 'B',                  // UPPERCASE grouping letter (the letter this word is filed under)
  ms:   { word: 'bangku', prompt: 'Sebut: bangku' },
  en:   { word: 'stool',  prompt: 'Say: stool' },
  jawi: { word: 'بڠكو',   prompt: 'Sebut: bangku' },
  contoh: 'Saya duduk di atas bangku.',  // short, kid-friendly Malay example sentence
}
```
> **No `icon`/emoji** — the card no longer shows an emoji. The card now shows the
> **syllable-split word** (`syl`, e.g. "Gan-tung"), the English translation line, and a
> **"Contoh ayat"** block with `contoh`. Syllabification rule: `ng`/`ny`/`sy`/`kh` are one
> consonant; intervocalic single `ng` joins the following vowel (ta-ngan, si-nga), but `ng`
> before another consonant is a coda (bang-ku, tang-ga). Diphthongs ai/au/oi are one nucleus.

### 4.2 Top-level structure
```js
// Category metadata — drives VIEW 1 tiles + accent
export const PSK_CATEGORIES = [
  { id: 'ng', kind: 'digraf',  label: 'Digraf ng', sound: 'ng', desc: 'Bunyi "ng"' },
  { id: 'ny', kind: 'digraf',  label: 'Digraf ny', sound: 'ny', desc: 'Bunyi "ny"' },
  { id: 'kh', kind: 'digraf',  label: 'Digraf kh', sound: 'kh', desc: 'Bunyi "kh"' },
  { id: 'sy', kind: 'digraf',  label: 'Digraf sy', sound: 'sy', desc: 'Bunyi "sy"' },
  { id: 'ai', kind: 'diftong', label: 'Diftong ai', sound: 'ai', desc: 'Gabungan a + i' },
  { id: 'au', kind: 'diftong', label: 'Diftong au', sound: 'au', desc: 'Gabungan a + u' },
  { id: 'oi', kind: 'diftong', label: 'Diftong oi', sound: 'oi', desc: 'Gabungan o + i' },
];

// The words, keyed by category id. Author letter-by-letter, A→Z order within each.
const PSK_DATA = {
  ng: [ /* items */ ],
  ny: [ /* items */ ],
  kh: [ /* items */ ],
  sy: [ /* items */ ],
  ai: [ /* items */ ],
  au: [ /* items */ ],
  oi: [ /* items */ ],
};

export default PSK_DATA;
```

### 4.3 Helpers (export these — the component depends on them)
```js
// Unique grouping letters present for a category, in A→Z order
export function getPskLettersByCategory(catId) {
  return [...new Set((PSK_DATA[catId] || []).map(i => i.letter))]
    .sort((a, b) => a.localeCompare(b));
}

// All word items for a category + letter
export function getPskSeriesByCategoryLetter(catId, letter) {
  return (PSK_DATA[catId] || []).filter(i => i.letter === letter);
}

// Count of available letters (for the category tile caption)
export function getPskLetterCount(catId) {
  return getPskLettersByCategory(catId).length;
}
```

### 4.4 Authoring rules (STRICT)
1. **Real, common Malay words only.** Each word must genuinely contain the target sound. Skip any letter that yields no real word. Variable count per letter (the example below has 6 for ng+B; others may have 2–4).
2. **`letter` = the consonant/initial the word is filed under**, matching the user's worked example (ng+B includes `abang`, `lombong`, `lambung` — words that *feature* the letter B together with the sound, not only word-initial B). Use sensible judgement: file a word under its most salient consonant letter; do not duplicate the same word under multiple letters.
3. **Trilingual, every entry.** `ms.word` = rumi (lowercase). `en.word` = accurate English gloss (lowercase). `jawi.word` = correct Jawi spelling.
4. **Jawi is hand-authored and error-prone.** Author carefully; if unsure of a spelling, flag it in the slice note for review rather than guessing silently. Use proper Jawi letters (e.g. ڠ for "ng", ث/ش for "sy/syin" as appropriate, خ for "kh", پ ڤ ݢ چ ۏ ڽ where needed). Diftong ai/au/oi typically use ا+ي / ا+و / و+ي patterns.
   - **Final-vowel convention (school standard, confirmed by reviewer 2026-06-17):** use the FULL spelling — a word ending in the vowel **-a must end with alif ا** (e.g. singa → سيڠا, mangga → ماڠݢا, tangga → تڠݢا, rongga → روڠݢا, sangka → سڠکا, sengaja → سڠاجا). Do **not** use the short form that drops the final vowel. Be consistent across every slice.
5. **`prompt` strings:** `ms`/`jawi` → `Sebut: <rumi>`; `en` → `Say: <english>`.
6. **No KV/KVK syllable rule here** — these are whole words for Tahun 2, digraphs/diphthongs expected.

### 4.5 Worked example — Digraf ng, letter B (use as the template)
```js
{ id:'ng_b_bangku',  word:'bangku',  letter:'B', icon:'🪑', ms:{word:'bangku', prompt:'Sebut: bangku'},  en:{word:'stool',          prompt:'Say: stool'},          jawi:{word:'بڠكو',   prompt:'Sebut: bangku'} },
{ id:'ng_b_abang',   word:'abang',   letter:'B', icon:'👦', ms:{word:'abang',  prompt:'Sebut: abang'},   en:{word:'elder brother',  prompt:'Say: elder brother'},  jawi:{word:'ابڠ',    prompt:'Sebut: abang'} },
{ id:'ng_b_bingkai', word:'bingkai', letter:'B', icon:'🖼️', ms:{word:'bingkai',prompt:'Sebut: bingkai'}, en:{word:'frame',          prompt:'Say: frame'},          jawi:{word:'بيڠكاي', prompt:'Sebut: bingkai'} },
{ id:'ng_b_bungkam', word:'bungkam', letter:'B', icon:'🤐', ms:{word:'bungkam',prompt:'Sebut: bungkam'}, en:{word:'silent',         prompt:'Say: silent'},         jawi:{word:'بوڠكم',  prompt:'Sebut: bungkam'} },
{ id:'ng_b_lombong', word:'lombong', letter:'B', icon:'⛏️', ms:{word:'lombong',prompt:'Sebut: lombong'}, en:{word:'mine',           prompt:'Say: mine'},           jawi:{word:'لومبوڠ', prompt:'Sebut: lombong'} },
{ id:'ng_b_lambung', word:'lambung', letter:'B', icon:'🏐', ms:{word:'lambung',prompt:'Sebut: lambung'}, en:{word:'bounce',         prompt:'Say: bounce'},         jawi:{word:'لمبوڠ',  prompt:'Sebut: lambung'} },
```
> The Jawi above is a starting point — the implementing agent must double-check each spelling and flag any uncertain ones in the slice note.

---

## 5. Component spec

### Step 1 — `PerkataanSukarLearningPage.jsx` (fork of KVLearningPage)
Copy `KVLearningPage.jsx` verbatim, then change:

- **Imports:** swap `bm_kv` imports for `bm_perkataan_sukar` (`PSK_CATEGORIES`, `getPskLettersByCategory`, `getPskSeriesByCategoryLetter`, `getPskLetterCount`). Keep `SpeechManager`, `BMHeader`, lucide icons.
- **State:** add `const [selectedCategory, setSelectedCategory] = useState(null)` above `selectedLetter`.
- **VIEW 1 (NEW) — category picker:** render when `!selectedCategory`. Reuse the `.kv-grid` + `.kv-letter-tile` markup/styles. Each tile shows the sound (e.g. "ng") big + `label` + `${getPskLetterCount(id)} huruf` caption. Clicking sets `selectedCategory`. `BMHeader` `onBack={onBack}`, `sectionLabel` = `'Pilih Bunyi'` (bm) / `'Choose a Sound'` (en).
- **VIEW 2 — letter picker:** render when `selectedCategory && !selectedLetter`. Same grid; letters come from `getPskLettersByCategory(selectedCategory)`; caption = `${series.length} kad`. `BMHeader` back button returns to category picker (clear `selectedCategory`). Add a small "← Bunyi" affordance / breadcrumb showing the active category label.
- **VIEW 3 — flashcards:** as KV, but series = `getPskSeriesByCategoryLetter(selectedCategory, selectedLetter)`.
  - Big card text = the **word** in the selected script (`mainWord`), not a syllable. Drop the separate `capKV`/lowercase-syllable lines (or repurpose the small line to show the rumi word under a Jawi/Eng main word). Keep emoji, translation line, listen cue exactly as KV.
  - The vowel-chip pill at top becomes a **sound chip**: `${category.label} — ${cardIndex+1} / ${series.length}`.
  - Use single accent `#1E7AC9` wherever KV used per-vowel colours (`vowelColor`/`vowelBg`). Define `const ACCENT='#1E7AC9'` and a light tint `#E7F1FB`.
  - `speak()`: `script==='ENG'` → `item.en.word` @ `en-US`; else `item.ms.word` @ `ms-MY` (Jawi reads the rumi pronunciation). Keep `SpeechManager.stopSpeaking()` cleanup on unmount.
  - Completion popup: "Siri **{letter}** Selesai!" → next letter within the category, else back to letter picker (NOT `onBack` to hub). "Pilih Huruf Lain" returns to letter picker.
- **Props:** `({ onBack, language, onStartQuiz })`. Mirror KV's signature.

### Step 2 — keep it iOS-safe & lazy
- Resting state visible (no opacity:0 entrance-only reveals beyond the existing `kvTileIn` which animates to visible — fine).
- SVG/emoji self-contained. Hover rules already behind `@media (hover:hover)` in KV — preserve.
- Component is already lazy-loaded via `App.jsx` (`PerkataanSukar` is `React.lazy`).

### Step 3 — rewire `PerkataanSukar.jsx`
Current file: `learn` page = in-file `GROUPS`; `quiz` page = `BMLessonQuizLayout`. Change only the learn branch:
```jsx
if (page === 'learn') {
  return (
    <PerkataanSukarLearningPage
      onBack={handleBack}
      language={language}
      onStartQuiz={() => setPage('quiz')}
    />
  );
}
```
- Delete the now-unused `GROUPS` array and `PerkataanLearnPage` function.
- **Keep** `TOPIC_ID = '2-2-1-perkataan-sukar'`, `useBMQuiz`, `BMLessonQuizLayout`, and the `BM_QUESTIONS[TOPIC_ID]` quiz untouched — finishing the quiz is what fires `topicComplete` (crown/XP). The "🎯 Sedia untuk Kuiz?" button (rendered by the learning page on the category-picker view) drives `onStartQuiz`.
- Keep `topicComplete` / `onNextTopic` props flowing to `BMLessonQuizLayout`.

---

## 6. Docs update (Step 3.4)
In `BAHASA_MELAYU.md`, Tahun 2 file table (~line 905) change the `PerkataanSukar.jsx` row description to:
`✅ Rebuilt — trilingual (RUMI/ENG/JAWI) digraf & diftong flashcard module, KV-style 3-level nav; quiz retained for crown.`

---

## 7. Definition of Done (verification checklist)

**Per data slice (each category):**
- [ ] All entries trilingual (ms/en/jawi all present, non-empty).
- [ ] `id` unique & lowercase; `letter` uppercase; `word` lowercase rumi.
- [ ] Words are real, common Malay words genuinely containing the target sound.
- [ ] Letters with no real word are omitted (no empty letters, no filler).
- [ ] Jawi spellings authored; uncertain ones flagged in the slice note.
- [ ] A→Z order within the category; words grouped sensibly by `letter`.

**Slice 1 (also includes plumbing):**
- [ ] `npm run build` passes (no import/lint errors).
- [ ] App: Tahun 2 → Modul 2 → TOPIK 2.1 opens the **category picker** (7 tiles).
- [ ] Picking "Digraf ng" → letter grid → a letter → flashcards render.
- [ ] RUMI/ENG/JAWI toggle switches the big word; Jawi shows RTL in Lateef font.
- [ ] "Dengar" speaks the word; ms-MY for RUMI/JAWI, en-US for ENG.
- [ ] Prev/Next + "Siri selesai" popup work; popup advances to next letter, last letter offers back-to-letters.
- [ ] Back buttons: flashcards→letters→categories→hub (each one level).
- [ ] "🎯 Sedia untuk Kuiz?" still opens the existing quiz; finishing it still earns the crown.
- [ ] Categories without data yet (ny/kh/sy/ai/au/oi) show a tile but an empty/graceful letter grid (acceptable until their slice lands — do NOT crash).

---

## 8. Status Board  *(implementing agent updates this)*

Legend: ⬜ Not started · 🔍 Pending verification · ✅ Complete

| Slice | Scope | Status | Agent note (what was done / Jawi to review) |
|-------|-------|--------|----------------------------------------------|
| 1 | Digraf **ng** (A–Z) + data file + `PerkataanSukarLearningPage.jsx` + rewire `PerkataanSukar.jsx` + docs | ✅ Complete | **Verified by Claude 2026-06-17.** Data file (72 ng words / 14 letters B/C/D/G/H/J/K/L/M/N/P/R/S/T — note: build report of "54/13" was inaccurate), forked component with correct 3-level nav, node rewired, docs updated, `npm run build` ✅, integrity check ✅ (unique ids, all trilingual, correct casing). **Fixed during verification:** removed `pendek` (filed under ng but contains "nd", not the ng digraph). **Outstanding (non-blocking):** (a) Jawi spellings NOT yet checked by a Jawi-literate reviewer — see list below; (b) minor: component lacks TTS-stop-on-unmount cleanup that the old component had. **Jawi update 2026-06-17 (reviewer):** final-`-a` alif convention applied to all 9 affected ng words — mangga/rongga/singa/tangga (mandatory) + jangka/nangka/rangka/sangka/sengaja (consistency) now end in ا. Convention recorded in §4.4 rule 4. **Other Jawi still to review:** cengang (چڠاڠ), daging (داݢيڠ vs دݢيڠ), dengar (دڠر), dendang (دندڠ), genggam (ݢڠݢم), gerbang (ݢربڠ), hangat (هڠت), jenguk (جڠوق), jingga (جيڠݢا), janggut (جاڠݢوت), jangka (جاڠک), kembang (کمبڠ), kentang (كنتڠ), langkah (لاڠکه), mangga (ماڠݢ), mengantuk (مڠانتوق), nangka (نڠک), pendek (ڤندق), petang (ڤتڠ), rangka (رڠک), rongga (روڠݢ), sangka (سڠک), sangkar (سڠکر), sengaja (سڠاج), sering (سريڠ), singa (سيڠ), sungguh (سوڠݢوه), tangga (تڠݢ), tanggung (تڠݢوڠ), tengah (تڠه), tengok (تڠوق), tenggiri (تڠݢيري), tunggu (توڠݢو). Final 'a' spelling (with/without alif) is inconsistent — needs a project-wide convention decision. |
| 2 | Digraf **ny** (data only) | ✅ Complete | **Verified by Claude 2026-06-17.** 23 ny words / 10 letters (A B H K L N P R S T); integrity ✅ (all trilingual, unique ids, syl rejoins, every word has "ny", final-`-a` alif applied: hanya/nyata/punya/tanya), build + lint ✅. Jawi (ڽ) still pending human Jawi review. Optional: common words minyak/monyet/kunyit not included — can add later if desired. |
| 3 | Digraf **kh** (data only) | ⬜ | |
| 4 | Digraf **sy** (data only) | ⬜ | |
| 5 | Diftong **ai** (data only) | ⬜ | |
| 6 | Diftong **au** (data only) | ⬜ | |
| 7 | Diftong **oi** (data only) | ⬜ | |

**Build one slice, set it to 🔍, stop, and wait for verification before the next.**

---

## 9. Reference files (read before building)
- UI/UX to clone: `src/components/ReadingPage/KVLearningPage.jsx`
- Data shape to clone: `src/data/curriculum/bm_kv.js`
- Node component to edit: `src/components/BahasaMelayuPage/Tahun2/Module2_Membaca/PerkataanSukar.jsx`
- Header component: `src/components/BahasaMelayuPage/_shared/BMHeader.jsx`
- Quiz layout (unchanged): `src/components/BahasaMelayuPage/_shared/BMLessonQuizLayout.jsx`, `useBMQuiz`
- Existing quiz dataset (unchanged): `BM_QUESTIONS['2-2-1-perkataan-sukar']` in `src/components/BahasaMelayuPage/_shared/ModuleData.js`
