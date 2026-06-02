# Pendidikan Islam Tahun 1 — Standardised Module Structure

## Overview

This document defines the standardised architecture for all Tahun 1 Pendidikan Islam modules (Modules 1–6).  
Each module consists of:

- **1 Module Hub** — topic listing page with SVG-illustrated cards
- **N Topic Components** — learn + quiz pages per topic

---

## Architecture

```
Tahun1/
├── Tahun1ModuleHubLayout.jsx     ★ Shared hub component (all modules)
├── Tahun1LessonLayout.jsx        ★ Shared lesson layout + QuizScreen + ResultScreen
├── Module1_AlQuran/              (reference — may migrate later)
│   ├── AlQuranTajwidModule.jsx
│   ├── HurufHijaiyah.jsx
│   ├── TandaBacaan.jsx
│   ├── Tanwin.jsx
│   └── Hafazan.jsx
├── Module2_Akidah/               ★ Migrated to standard
│   ├── AkidahModule.jsx          ~60 lines — data + thin wrapper
│   ├── RukunIman.jsx
│   ├── RukunIslam.jsx
│   ├── Syahadah.jsx
│   └── AsmaulHusnaKhaliq.jsx
├── Module3_Ibadah/               FUTURE — same pattern
├── Module4_Sirah/                FUTURE
├── Module5_Adab/                 FUTURE
└── Module6_Jawi/                 FUTURE
```

---

## Shared Components

### 1. `Tahun1ModuleHubLayout.jsx`

A single reusable component for all module hub (topic listing) pages.

**Props:**

| Prop | Type | Description |
|---|---|---|
| `moduleNum` | `number` | Module number (1–6) |
| `moduleName` | `string` | Bahasa Malaysia name (e.g. `"Al-Quran & Tajwid"`) |
| `moduleNameEn` | `string` | English name (e.g. `"Al-Quran & Tajwid"`) |
| `theme` | `object` | Colour configuration (see below) |
| `topics` | `array` | Topic definitions with SVG `visual` |
| `onBack` | `func` | Navigate back to module list |
| `onSelectTopic` | `func` | Called with `topic.id` on card click |
| `language` | `'bm' \| 'en'` | Default: `'bm'` |

**`theme` object:**

```js
{
  pageGradient:   'radial-gradient(...)',
  stageGradient:  'radial-gradient(...)',
  accent:         '#2A9A6C',
  dark:           '#065F46',
  light:          '#D6F5DD',
  mid:            '#8AD9A8',
  pillGradient:   'linear-gradient(180deg, #2A9A6C, #065F46)',
}
```

**`topics[]` object:**

```js
{
  id:    'rukun-iman',           // unique topic ID
  pill:  'TOPIK 2.1',            // badge text
  title: 'Rukun Iman',           // card title
  desc:  'Enam perkara yang...', // card description
  visual: <svg>...</svg>,        // inline SVG illustration
}
```

**CSS classes** (generated inside inline `<style>`):

| Class | Purpose |
|---|---|
| `.pi-mhub-page` | Full-page container with radial gradient |
| `.pi-mhub-grid` | Responsive grid (`auto-fit, minmax(230px, 1fr)`) |
| `.pi-mhub-card` | White card with hover lift |
| `.pi-mhub-stage` | 170×170 circular SVG container |
| `.pi-mhub-pill` | Topic number badge |
| `.pi-mhub-card-title` | Card heading |
| `.pi-mhub-card-desc` | Card description |
| `.pi-mhub-stage svg` | SVG floating animation |

---

### 2. `Tahun1LessonLayout.jsx` (Enhanced)

Individual topic pages use this shared lesson layout. It provides:

- Back button
- Breadcrumb + title
- Belajar / Kuiz tab navigation
- Content area (`children`)

**Named exports (shared beyond layout):**

#### `QuizScreen`

```jsx
<QuizScreen
  language        // 'bm' | 'en'
  questions       // array of { question, answer, options[] }
  totalRounds     // number (default: 10)
  accentColor     // string CSS colour
  onDone          // func(score)
  emoji           // string emoji (default: '📝')
  headerContent   // ★ optional ReactNode — replaces emoji in question card
/>
```

**Quiz question shape:**

```js
{
  question: 'Apakah Rukun Iman yang ke-1?',
  answer: 'Beriman kepada Allah',
  options: ['Beriman kepada Allah', 'Beriman kepada Malaikat', ...],
}
```

#### `ResultScreen`

```jsx
<ResultScreen
  score           // number
  totalRounds     // number
  accentColor     // string CSS colour (default: '#2A9A6C')
  accentGradient  // string CSS gradient for button (default: 'linear-gradient(135deg, #2A9A6C, #065F46)')
  onRetry         // func
  onBack          // func
  language        // 'bm' | 'en'
/>
```

---

## Module Hub Template (for Modules 2–6)

Each module hub file follows this exact pattern:

```jsx
import Tahun1ModuleHubLayout from '../Tahun1ModuleHubLayout';

const THEME = {
  pageGradient:  'radial-gradient(ellipse at top, {LIGHT} 0%, {MID} 55%, {DARK} 100%)',
  stageGradient: 'radial-gradient(ellipse at 50% 34%, {LIGHT} 0%, {MID} 55%, {DARK} 100%)',
  accent:        '{ACCENT}',
  dark:          '{DARK}',
  light:         '{LIGHT}',
  mid:           '{MID}',
  pillGradient:  'linear-gradient(180deg, {ACCENT}, {DARK})',
};

const TOPICS = [
  {
    id: 'topic-id',
    pill: 'TOPIK X.Y',
    title: 'Topic Title',
    desc: 'Topic description.',
    visual: (
      <svg viewBox="0 0 100 100">
        {/* SVG frame: rect frame + header bar + content */}
      </svg>
    ),
  },
  // ...
];

export default function ModuleName({ onBack, onSelectTopic, language = 'bm' }) {
  return (
    <Tahun1ModuleHubLayout
      moduleNum={X}
      moduleName="Nama Modul"
      moduleNameEn="Module Name"
      theme={THEME}
      topics={TOPICS}
      onBack={onBack}
      onSelectTopic={onSelectTopic}
      language={language}
    />
  );
}
```

### Theme Colors (from `--c-*` CSS vars)

| Module | Name | Light | Mid | Dark | Accent |
|---|---|---|---|---|---|
| 1 | Al-Quran & Tajwid | `#FFF7D6` | `#FDD97A` | `#D4960A` | `#F59E0B` |
| 2 | Akidah | `#D6F5DD` | `#8AD9A8` | `#2A9A6C` | `#10B981` |
| 3 | Ibadah | `#D6EEFF` | `#6BAEE8` | `#2563EB` | `#3B82F6` |
| 4 | Sirah | `#E7D9FF` | `#B79CFF` | `#7A55E0` | `#8B5CF6` |
| 5 | Adab | `#FFE9F3` | `#FFBFDD` | `#FF8CBF` | `#EC4899` |
| 6 | Jawi | `#FEF3C7` | `#FDBA74` | `#F97316` | `#F97316` |

---

## Topic Component Template

```jsx
import React, { useState, useCallback, useEffect } from 'react';
import Tahun1LessonLayout, { QuizScreen, ResultScreen } from '../Tahun1LessonLayout';
import { playHoverSound, playSound } from '../../../../utils/soundManager';
import SpeechManager from '../../../../services/SpeechManager';
import { shuffle } from '../../_shared/utils';
import Celebration from '../../_shared/Celebration';

// ── Data ──────────────────────────────────────────────────────────────
const ITEMS = [ /* ... */ ];

// ── Quiz configuration ────────────────────────────────────────────────
const TOTAL_ROUNDS = 10;
function buildQuestions() { /* ... */ }

// ── LearnCard ─────────────────────────────────────────────────────────
function LearnCard({ item, language, playing, onPlayAudio }) {
  return (
    <div style={{ /* card styles */ }}>
      {/* Speaker button for TTS */}
      <button onClick={() => onPlayAudio(item)}>
        {playing ? '🔊' : '🔈'}
      </button>
      {/* Item content */}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────
export default function TopicName({ onBack, language = 'bm' }) {
  const [tab,        setTab]        = useState('belajar');
  const [quizDone,   setQuizDone]   = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [quizKey,    setQuizKey]    = useState(0);
  const [playing,    setPlaying]    = useState(null);

  // TTS cleanup on unmount
  useEffect(() => {
    return () => SpeechManager.stopSpeaking();
  }, []);

  const handlePlayAudio = useCallback((item) => {
    SpeechManager.stopSpeaking();
    setPlaying(item.id);
    SpeechManager.speak(item.speakText || item.desc, 'ms-MY', { rate: 0.8 })
      .then(() => setPlaying(null))
      .catch(() => setPlaying(null));
  }, []);

  const handleTabChange = useCallback((t) => {
    setTab(t);
    playHoverSound();
    if (t === 'kuiz') {
      setQuizDone(false);
      setQuizKey(k => k + 1);
    }
  }, []);

  return (
    <Tahun1LessonLayout
      onBack={onBack}
      language={language}
      breadcrumb="Module › Topik X.Y"
      title="Topic Title"
      accentColor="#ACCENT_HEX"
      tab={tab}
      onTabChange={handleTabChange}
    >
      <style>{`
        .pi-topic-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.85rem;
        }
        @media (min-width: 640px) {
          .pi-topic-grid { grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        }
      `}</style>

      {tab === 'belajar' ? (
        <div style={{ padding: '0 1.25rem' }}>
          <div className="pi-topic-grid">
            {ITEMS.map(item => (
              <LearnCard key={item.id} item={item} language={language}
                playing={playing} onPlayAudio={handlePlayAudio} />
            ))}
          </div>
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button onClick={() => { setTab('kuiz'); setQuizDone(false); setQuizKey(k => k + 1); playHoverSound(); }}
              style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700,
                fontSize: 'clamp(0.9rem, 2.2vw, 1.05rem)',
                background: 'linear-gradient(135deg, {DARK}, {ACCENT})',
                color: '#fff', border: 'none', borderRadius: 999,
                padding: '12px 32px', cursor: 'pointer',
                boxShadow: '0 4px 14px rgba({ACCENT_RGB},0.4)' }}>
              🎯 {language === 'bm' ? 'Mula Kuiz' : 'Start Quiz'} →
            </button>
          </div>
        </div>
      ) : quizDone ? (
        <ResultScreen
          score={finalScore} totalRounds={TOTAL_ROUNDS}
          accentColor="{ACCENT_HEX}" accentGradient="linear-gradient(135deg, {DARK}, {ACCENT})"
          onRetry={() => { setQuizDone(false); setQuizKey(k => k + 1); }}
          onBack={() => setTab('belajar')}
          language={language}
        />
      ) : (
        <div style={{ flex: 1, minHeight: 0, display: 'flex', overflow: 'hidden' }}>
          <QuizScreen
            key={quizKey} language={language}
            questions={buildQuestions()} totalRounds={TOTAL_ROUNDS}
            accentColor="{ACCENT_HEX}"
            emoji="{EMOJI}"
            /* headerContent={ <ArabicHeader/> } — only when needed */
            onDone={(s) => { setFinalScore(s); setQuizDone(true); }}
          />
        </div>
      )}
    </Tahun1LessonLayout>
  );
}
```

---

## SVG Illustration Style Guide

Each topic card visual follows this frame template:

```jsx
<svg viewBox="0 0 100 100">
  <rect x="12" y="18" width="76" height="64" rx="12" fill="#FFFDF8"
    stroke="rgba(ACCENT,0.35)" strokeWidth="2" />
  <rect x="12" y="18" width="76" height="18" rx="12" fill={ACCENT} />
  <rect x="12" y="24" width="76" height="12" fill={ACCENT} />
  <text x="50" y="31" textAnchor="middle"
    fontFamily="'Fredoka',sans-serif" fontSize="8"
    fontWeight="700" fill="#fff">Modul X.Y</text>
  {/* Custom visual content here */}
</svg>
```

---

## When Creating a New Module (3–6)

1. Create module folder: `Module{X}_{Name}/`
2. Create `{Name}Module.jsx` using the **Module Hub Template**
3. Create one `.jsx` per topic using the **Topic Component Template**
4. Add lazy imports in `src/App.jsx`
5. Add routing in the `case 'pendidikan-islam-v1':` block

---

## File Checklist for Module 2 (Reference)

| File | Purpose | Standardised? |
|---|---|---|
| `AkidahModule.jsx` | Module hub — thin wrapper + data | ✅ Uses `Tahun1ModuleHubLayout` |
| `RukunIman.jsx` | Topic 2.1 — Learn + Quiz | ✅ Shared Quiz/Result, inline grid, TTS |
| `RukunIslam.jsx` | Topic 2.2 — Learn + Quiz | ✅ Shared Quiz/Result, inline grid, TTS |
| `Syahadah.jsx` | Topic 2.3 — Learn + Quiz | ✅ Shared Quiz/Result, TTS |
| `AsmaulHusnaKhaliq.jsx` | Topic 2.4 — Learn + Quiz | ✅ Shared Quiz/Result + headerContent, TTS |
