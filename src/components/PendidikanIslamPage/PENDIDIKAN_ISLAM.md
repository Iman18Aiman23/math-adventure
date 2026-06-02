# 🕌 Pendidikan Islam — Project Reference

> KSSR Pendidikan Islam Tahap 1 (Tahun 1–3)
> Status key: ✅ Complete | 🔄 In Progress | ⏳ Pending

---

## Table of Contents

1. [Scope & Sequence (Silibus)](#1-scope--sequence-silibus)
2. [Build Plan & Status](#2-build-plan--status)
3. [Homepage Visual Wireframe](#3-homepage-visual-wireframe)
4. [Module Card Anatomy](#4-module-card-anatomy)
5. [Architecture Overview](#5-architecture-overview)
6. [Shared Components](#6-shared-components)
7. [Module Hub Template](#7-module-hub-template)
8. [Topic Component Template](#8-topic-component-template)
9. [SVG Illustration Style Guide](#9-svg-illustration-style-guide)
10. [Module Colour System](#10-module-colour-system)
11. [Responsive Grid Spec](#11-responsive-grid-spec)
12. [Architecture Notes](#12-architecture-notes)
13. [File Checklist](#13-file-checklist)

---

## 1. Scope & Sequence (Silibus)

### Tahun 1

| Modul | Topik |
|-------|-------|
| **1. Al-Quran & Tajwid** | 1.1 Kenali Huruf Hijaiyah Tunggal (Alif hingga Ya) |
| | 1.2 Mengenal Tanda Bacaan Asas (Baris Fathah, Kasrah, Dammah) |
| | 1.3 Mengenal Tanwin (Baris Dua) |
| | 1.4 Tilawah & Hafazan: Al-Fatihah, Al-Ikhlas, Al-Falaq, An-Nas, Al-Asr |
| **2. Akidah** | 2.1 Rukun Iman (6 Perkara) |
| | 2.2 Rukun Islam (5 Perkara) |
| | 2.3 Dua Kalimah Syahadah |
| | 2.4 Asmaul Husna: Al-Khaliq |
| **3. Ibadah** | 3.1 Konsep Istinja' |
| | 3.2 Air Mutlak dan Kegunaannya |
| | 3.3 Amali Wuduk |
| **4. Sirah** | 4.1 Nasab dan Keturunan Nabi Muhammad SAW |
| | 4.2 Peristiwa Kelahiran dan Penyusuan |
| | 4.3 Sifat Terpuji: Al-Amin |
| **5. Adab & Akhlak** | 5.1 Adab Makan dan Minum |
| | 5.2 Adab Tidur dan Bangun Tidur |
| | 5.3 Adab Masuk dan Keluar Tandas |
| **6. Celik Jawi** | 6.1 Mengenal Huruf Jawi Tunggal |
| | 6.2 Suku Kata Terbuka (Vokal: Alif, Wau, Ya) |

### Tahun 2

| Modul | Topik |
|-------|-------|
| **1. Al-Quran, Tajwid & Hadis** | 1.1 Kalimah Berbaris Sukun & Syaddah |
| | 1.2 Idgham Maal Ghunnah & Bila Ghunnah |
| | 1.3 Tilawah & Hafazan: Al-Masad, An-Nasr, Al-Kafirun, Al-Ma'un, Al-Quraish |
| | 1.4 Hadis: Menghormati Orang Tua |
| **2. Akidah** | 2.1 Beriman kepada Malaikat (10 Nama) |
| | 2.2 Asmaul Husna: Al-Ahad & As-Samad |
| | 2.3 Kesan Menyekutukan Allah |
| **3. Ibadah** | 3.1 Syarat Wajib & Sah Solat |
| | 3.2 Rukun-Rukun Solat |
| | 3.3 Menghayati Azan dan Iqamah |
| **4. Sirah** | 4.1 Tanda-tanda Kerasulan |
| | 4.2 Wahyu Pertama di Gua Hira' |
| | 4.3 Dakwah Peringkat Awal |
| **5. Adab & Akhlak** | 5.1 Adab Berpakaian |
| | 5.2 Adab Kasih Sayang |
| | 5.3 Adab Berkawan |
| **6. Celik Jawi** | 6.1 Suku Kata Tertutup |
| | 6.2 Rangkai Kata Jawi |

### Tahun 3

| Modul | Topik |
|-------|-------|
| **1. Al-Quran, Tajwid & Hadis** | 1.1 Hukum Mim Sakinah |
| | 1.2 Tilawah & Hafazan: Al-Qari'ah, Al-Humazah, At-Takathur, Al-Adiyat |
| | 1.3 Kefahaman Surah Al-Asr |
| | 1.4 Hadis: Adab Islamiah |
| **2. Akidah** | 2.1 Kitab-Kitab Allah |
| | 2.2 Al-Quran sebagai Panduan |
| | 2.3 Asmaul Husna: Al-Alim & Al-Hakim |
| **3. Ibadah** | 3.1 Perkara Membatalkan Solat |
| | 3.2 Khusyuk dalam Solat |
| | 3.3 Fardu Ain vs Fardu Kifayah |
| **4. Sirah** | 4.1 Hijrah ke Madinah |
| | 4.2 Piagam Madinah |
| | 4.3 Sifat Kepimpinan Nabi |
| **5. Adab & Akhlak** | 5.1 Adab Menuntut Ilmu |
| | 5.2 Menghormati Guru & Ibu Bapa |
| | 5.3 Adab Kemudahan Awam |
| **6. Celik Jawi** | 6.1 Imbuhan Awalan & Akhiran |
| | 6.2 Teks/Petikan Jawi |
| | 6.3 Tanda Baca Jawi |

---

## 2. Build Plan & Status

### Phase 0 — App Integration

| # | Task | Status |
|---|------|--------|
| 0.1 | Add "Pendidikan Islam V1" button on HomePage | ✅ Complete |
| 0.2 | Wire button to route `pendidikan-islam-v1` in App.jsx | ✅ Complete |
| 0.3 | Create `src/components/PendidikanIslamPage/` folder | ✅ Complete |
| 0.4 | Create `PendidikanIslamHomePage.jsx` (homepage shell) | ✅ Complete |
| 0.5 | Update App.jsx route to point to `PendidikanIslamHomePage` | ✅ Complete |

### Phase 1 — Homepage Shell

| # | Task | Status |
|---|------|--------|
| 1.1 | Hero banner — teal/cyan gradient + crescent moon SVG | ✅ Complete |
| 1.2 | Year selector tabs — Tahun 1 / 2 / 3 | ✅ Complete |
| 1.3 | Module grid — responsive 3 columns | ✅ Complete |
| 1.4 | 6 module cards with color, icon, title, desc, topic count | ✅ Complete |
| 1.5 | Lock/unlock state — Year 1 active, Years 2 & 3 locked | ✅ Complete |
| 1.6 | BackButton wired to return to HomePage | ✅ Complete |
| 1.7 | Responsive breakpoints (mobile-first) | ✅ Complete |

### Phase 2 — Tahun 1 Content

#### Module 1: Al-Quran & Tajwid

| # | Task | Status |
|---|------|--------|
| 2.1.1 | Topic 1.1 — Kenali Huruf Hijaiyah Tunggal | ✅ Complete |
| 2.1.2 | Topic 1.2 — Tanda Bacaan Asas | ✅ Complete |
| 2.1.3 | Topic 1.3 — Tanwin | ✅ Complete |
| 2.1.4 | Topic 1.4 — Tilawah & Hafazan | ✅ Complete |

#### Module 2: Akidah

| # | Task | Status |
|---|------|--------|
| 2.2.1 | Topic 2.1 — Rukun Iman | ✅ Complete |
| 2.2.2 | Topic 2.2 — Rukun Islam | ✅ Complete |
| 2.2.3 | Topic 2.3 — Dua Kalimah Syahadah | ✅ Complete |
| 2.2.4 | Topic 2.4 — Asmaul Husna: Al-Khaliq | ✅ Complete |

#### Module 3: Ibadah

| # | Task | Status |
|---|------|--------|
| 2.3.1 | Topic 3.1 — Konsep Istinja' | ✅ Complete |
| 2.3.2 | Topic 3.2 — Air Mutlak | ✅ Complete |
| 2.3.3 | Topic 3.3 — Amali Wuduk | ✅ Complete |

#### Module 4: Sirah

| # | Task | Status |
|---|------|--------|
| 2.4.1 | Topic 4.1 — Nasab dan Keturunan | ✅ Complete |
| 2.4.2 | Topic 4.2 — Kelahiran dan Penyusuan | ✅ Complete |
| 2.4.3 | Topic 4.3 — Sifat Al-Amin | ✅ Complete |

#### Module 5: Adab & Akhlak

| # | Task | Status |
|---|------|--------|
| 2.5.1 | Topic 5.1 — Adab Makan dan Minum | ✅ Complete |
| 2.5.2 | Topic 5.2 — Adab Tidur dan Bangun Tidur | ✅ Complete |
| 2.5.3 | Topic 5.3 — Adab Masuk dan Keluar Tandas | ✅ Complete |

#### Module 6: Celik Jawi

| # | Task | Status |
|---|------|--------|
| 2.6.1 | Topic 6.1 — Huruf Jawi Tunggal | ✅ Complete |
| 2.6.2 | Topic 6.2 — Suku Kata Terbuka | ✅ Complete |

### Phase 3 — Tahun 2 Content

| Module | Status |
|--------|--------|
| 1. Al-Quran, Tajwid & Hadis | ⏳ Pending |
| 2. Akidah | ⏳ Pending |
| 3. Ibadah | ⏳ Pending |
| 4. Sirah | ⏳ Pending |
| 5. Adab & Akhlak | ⏳ Pending |
| 6. Celik Jawi | ⏳ Pending |

### Phase 4 — Tahun 3 Content

| Module | Status |
|--------|--------|
| 1. Al-Quran, Tajwid & Hadis | ⏳ Pending |
| 2. Akidah | ⏳ Pending |
| 3. Ibadah | ⏳ Pending |
| 4. Sirah | ⏳ Pending |
| 5. Adab & Akhlak | ⏳ Pending |
| 6. Celik Jawi | ⏳ Pending |

---

## 3. Homepage Visual Wireframe

### Desktop (≥ 1024px) — 3 columns × 2 rows

```
┌──────────────────────────────────────────────────────────────────┐
│  HERO BANNER  (teal/cyan gradient)                               │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  🕌  Pendidikan Islam          [ crescent moon SVG art ] │    │
│  │  Belajar dengan seronok & penuh berkat                   │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                  │
│  YEAR TABS                                                       │
│  [ Tahun 1 ● active ]   [ Tahun 2 🔒 ]   [ Tahun 3 🔒 ]         │
│                                                                  │
│  MODULE GRID  — 3 columns × 2 rows (6 cards total)              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ 🟡 Modul 1   │  │ 🟢 Modul 2   │  │ 🔵 Modul 3   │           │
│  │ Al-Quran     │  │ Akidah       │  │ Ibadah       │           │
│  │ & Tajwid     │  │              │  │              │           │
│  │ ████░ 4 topik│  │ ████░ 4 topik│  │ ███░ 3 topik │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ 🟣 Modul 4   │  │ 🌸 Modul 5   │  │ 🩵 Modul 6   │           │
│  │ Sirah        │  │ Adab &       │  │ Celik Jawi   │           │
│  │              │  │ Akhlak       │  │              │           │
│  │ ███░ 3 topik │  │ ███░ 3 topik │  │ ██░ 2 topik  │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
└──────────────────────────────────────────────────────────────────┘
```

### Tablet (768px – 1023px) — 2 columns × 3 rows

```
┌────────────────────────────────────────┐
│  HERO BANNER                           │
│  🕌 Pendidikan Islam    [ moon art ]   │
├────────────────────────────────────────┤
│  [ Tahun 1 ● ]  [ Tahun 2 🔒 ]  [ T3 ]│
├───────────────────┬────────────────────┤
│ 🟡 Modul 1        │ 🟢 Modul 2         │
│ Al-Quran & Tajwid │ Akidah             │
│ ████░ 4 topik     │ ████░ 4 topik      │
├───────────────────┼────────────────────┤
│ 🔵 Modul 3        │ 🟣 Modul 4         │
│ Ibadah            │ Sirah              │
│ ███░ 3 topik      │ ███░ 3 topik       │
├───────────────────┼────────────────────┤
│ 🌸 Modul 5        │ 🩵 Modul 6         │
│ Adab & Akhlak     │ Celik Jawi         │
│ ███░ 3 topik      │ ██░ 2 topik        │
└───────────────────┴────────────────────┘
```

### Mobile (< 640px) — 1 column × 6 rows

```
┌───────────────────────────┐
│  HERO BANNER (compact)    │
│  🕌 Pendidikan Islam      │
├───────────────────────────┤
│ [ T1 ● ] [ T2 🔒 ] [ T3 ] │
├───────────────────────────┤
│ 🟡 Modul 1                │
│ Al-Quran & Tajwid         │
│ ████░ 4 topik          →  │
├───────────────────────────┤
│ 🟢 Modul 2                │
│ Akidah                    │
│ ████░ 4 topik          →  │
├───────────────────────────┤
│ 🔵 Modul 3                │
│ Ibadah                    │
│ ███░ 3 topik           →  │
├───────────────────────────┤
│ 🟣 Modul 4                │
│ Sirah                     │
│ ███░ 3 topik           →  │
├───────────────────────────┤
│ 🌸 Modul 5                │
│ Adab & Akhlak             │
│ ███░ 3 topik           →  │
├───────────────────────────┤
│ 🩵 Modul 6                │
│ Celik Jawi                │
│ ██░ 2 topik            →  │
└───────────────────────────┘
```

---

## 4. Module Card Anatomy

### Active Card
```
┌──────────────────────────────┐
│  [ colored icon / emoji ]    │  ← 48×48px icon
│  Modul 1                     │  ← small uppercase label
│  Al-Quran & Tajwid           │  ← bold title (Fredoka/Baloo2)
│  Kenali huruf, baris &       │  ← short desc (2 lines max)
│  hafazan surah pilihan       │
│                              │
│  ████████░░  4 topik    →    │  ← progress bar + topic count
└──────────────────────────────┘
```

### Lock State (Tahun 2 & 3)
```
┌──────────────────────────────┐
│  🔒                          │
│  Akan Datang                 │
│  (opacity 0.45, no pointer)  │
└──────────────────────────────┘
```

---

## 5. Architecture Overview

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
│   ├── AkidahModule.jsx
│   ├── RukunIman.jsx
│   ├── RukunIslam.jsx
│   ├── Syahadah.jsx
│   └── AsmaulHusnaKhaliq.jsx
├── Module3_Ibadah/               ★ Migrated to standard
│   ├── IbadahModule.jsx
│   ├── Istinja.jsx
│   ├── AirMutlak.jsx
│   └── AmaliWuduk.jsx
├── Module4_Sirah/                ★ Migrated to standard
│   ├── SirahModule.jsx
│   ├── NasabKeturunan.jsx
│   ├── KelahiranPenyusuan.jsx
│   └── SifatAlAmin.jsx
├── Module5_Adab/                 ★ Migrated to standard
│   ├── AdabModule.jsx
│   ├── AdabMakanMinum.jsx
│   ├── AdabTidur.jsx
│   └── AdabTandas.jsx
└── Module6_Jawi/                 ★ Migrated to standard
    ├── JawiModule.jsx
    ├── HurufJawiTunggal.jsx
    └── SukuKataTerbuka.jsx
```

### Component Tree

```
PendidikanIslamHomePage
  └── YearSelector
  └── ModuleGrid
        └── ModuleCard * 6
              └── onClick → ModuleHub (e.g. AkidahModule)
                    └── Tahun1ModuleHubLayout
                          └── TopicCard * N
                                └── onClick → TopicPage (e.g. RukunIman)
                                      └── Tahun1LessonLayout
                                            ├── Belajar tab → ConceptCard * N
                                            └── Kuiz tab → QuizScreen → ResultScreen
```

---

## 6. Shared Components

### 6.1 `Tahun1ModuleHubLayout.jsx`

A single reusable component for all module hub (topic listing) pages.

**Props:**

| Prop | Type | Description |
|---|---|---|
| `moduleNum` | `number` | Module number (1–6) |
| `moduleName` | `string` | Bahasa Malaysia name |
| `moduleNameEn` | `string` | English name |
| `theme` | `object` | Colour configuration |
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

**CSS classes:**

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

### 6.2 `Tahun1LessonLayout.jsx`

Individual topic pages use this shared lesson layout. It provides:

- Back button
- Breadcrumb + title
- Belajar / Kuiz tab navigation
- Content area (`children`)

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

## 7. Module Hub Template

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

---

## 8. Topic Component Template

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
      <button onClick={() => onPlayAudio(item)}>
        {playing ? '🔊' : '🔈'}
      </button>
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
            onDone={(s) => { setFinalScore(s); setQuizDone(true); }}
          />
        </div>
      )}
    </Tahun1LessonLayout>
  );
}
```

---

## 9. SVG Illustration Style Guide

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

## 10. Module Colour System

| Module | Name | Light | Mid | Dark | Accent | Card Gradient |
|--------|------|-------|-----|------|--------|---------------|
| 1 | Al-Quran & Tajwid | `#FFF7D6` | `#FDD97A` | `#D4960A` | `#F59E0B` | Gold / Amber |
| 2 | Akidah | `#D6F5DD` | `#8AD9A8` | `#2A9A6C` | `#10B981` | Emerald Green |
| 3 | Ibadah | `#D6EEFF` | `#6BAEE8` | `#2563EB` | `#3B82F6` | Sky Blue |
| 4 | Sirah | `#E7D9FF` | `#B79CFF` | `#7A55E0` | `#8B5CF6` | Purple / Violet |
| 5 | Adab | `#FFE9F3` | `#FFBFDD` | `#FF8CBF` | `#EC4899` | Rose / Pink |
| 6 | Jawi | `#FEF3C7` | `#FDBA74` | `#F97316` | `#F97316` | Orange |

> Note: The module hub themes in `ModuleX_*` use actual radial/linear gradients derived from these colour values.

---

## 11. Responsive Grid Spec

| Breakpoint | Columns | Gap | Card min-height |
|------------|---------|-----|-----------------|
| Mobile `< 640px` | 1 | `0.85rem` | `80px` |
| Tablet `768px` | 2 | `1rem` | `200px` |
| Desktop `≥ 1024px` | 3 | `1.25rem` | `220px` |

### CSS Grid Pattern (mobile-first)
```css
.module-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.85rem;
}
@media (min-width: 768px) {
  .module-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}
@media (min-width: 1024px) {
  .module-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }
}
```

### Typography — fluid scale
```css
.module-title  { font-size: clamp(1rem,   2.5vw, 1.25rem); }
.module-desc   { font-size: clamp(0.75rem, 1.8vw, 0.9rem);  }
.hero-title    { font-size: clamp(1.5rem,  4vw,   2.25rem); }
```

---

## 12. Architecture Notes

- **Audio**: Use existing `SpeechManager` + `soundManager` for TTS playback (ms-MY locale, rate 0.8)
- **Quiz format**: Short 4-choice MCQ at end of each topic (consistent across all subjects)
- **Routing**: Each module routes via `currentAgeGame`-style game ID pattern in App.jsx
- **Grid**: Mobile-first CSS grid — 1 col → 2 col (768px) → 3 col (1024px)
- **Typography**: `clamp()` fluid scale for all text, `%`/`rem`/`vw` units only
- **Images/SVG**: `max-width: 100%`, explicit `width`/`height` attrs, `height: auto` override
- **TTS cleanup**: Every topic component includes `useEffect(() => () => SpeechManager.stopSpeaking(), [])`
- **Ibadah visuals**: SVG illustrated step cards — no external video dependency
- **Celik Jawi**: Reuses existing Jawi game components (BacaSukuKataJawi, etc.)

### When Creating a New Module

1. Create module folder: `Module{X}_{Name}/`
2. Create `{Name}Module.jsx` using the **Module Hub Template**
3. Create one `.jsx` per topic using the **Topic Component Template**
4. Add lazy imports in `src/App.jsx`
5. Add routing in the `case 'pendidikan-islam-v1':` block

---

## 13. File Checklist

| File | Module | Hub Standard? | Shared Quiz/Result? | TTS Cleanup? | SVG Visuals? |
|---|---|---|---|---|---|
| `AkidahModule.jsx` | 2 Akidah | ✅ | — | — | ✅ 4 custom |
| `RukunIman.jsx` | 2.1 | — | ✅ | ✅ | — |
| `RukunIslam.jsx` | 2.2 | — | ✅ | ✅ | — |
| `Syahadah.jsx` | 2.3 | — | ✅ | ✅ | — |
| `AsmaulHusnaKhaliq.jsx` | 2.4 | — | ✅ + headerContent | ✅ | — |
| `IbadahModule.jsx` | 3 Ibadah | ✅ | — | — | ✅ 3 custom |
| `Istinja.jsx` | 3.1 | — | ✅ | ✅ | — |
| `AirMutlak.jsx` | 3.2 | — | ✅ | ✅ | — |
| `AmaliWuduk.jsx` | 3.3 | — | ✅ | ✅ | — |
| `SirahModule.jsx` | 4 Sirah | ✅ | — | — | ✅ 3 custom |
| `NasabKeturunan.jsx` | 4.1 | — | ✅ | ✅ | — |
| `KelahiranPenyusuan.jsx` | 4.2 | — | ✅ | ✅ | — |
| `SifatAlAmin.jsx` | 4.3 | — | ✅ | ✅ | — |
| `AdabModule.jsx` | 5 Adab | ✅ | — | — | ✅ 3 custom |
| `AdabMakanMinum.jsx` | 5.1 | — | ✅ | ✅ | — |
| `AdabTidur.jsx` | 5.2 | — | ✅ | ✅ | — |
| `AdabTandas.jsx` | 5.3 | — | ✅ | ✅ | — |
| `JawiModule.jsx` | 6 Jawi | ✅ | — | — | ✅ 2 custom |
| `HurufJawiTunggal.jsx` | 6.1 | — | ✅ | ✅ | — |
| `SukuKataTerbuka.jsx` | 6.2 | — | ✅ | ✅ | — |

**Legend:** ✅ = conforms to standard | — = not applicable (hub file)
