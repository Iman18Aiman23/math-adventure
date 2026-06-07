# HomePage UI/UX Layout Structure
**Project:** Math Adventure — Malaysian Primary Learning App  
**Date:** 2026-06-06  
**Scope:** Full homepage redesign — replacing Age Groups with Tahun Tabs + Continue Learning

---

## 1. Design Philosophy

| Principle | Application |
|---|---|
| **Grade-first navigation** | User declares their Tahun once; the whole page adapts |
| **Progress visibility** | Every subject card shows how far the child has gone |
| **Re-entry friction = zero** | "Continue Learning" strip is the first thing after the hero |
| **5 distinct subjects max** | Consolidate overlapping cards (Jawi → inside Pendidikan Islam; Math v1 → remove) |
| **Mobile-first** | 2-column grid on phone, 4-column on desktop |

---

## 2. Page Layout — Top to Bottom

```
┌──────────────────────────────────────────────────────────┐
│  A. TOP NAV BAR                                          │
├──────────────────────────────────────────────────────────┤
│  B. HERO SECTION                                         │
│     • Welcome greeting + Level badge                     │
│     • Streak fire pill (top-right)                       │
│     • Mon–Sun streak bar                                 │
│     • Planet decoration (absolute, right)                │
├──────────────────────────────────────────────────────────┤
│  C. TAHUN SELECTOR TABS  ← NEW (replaces Age Groups)     │
│     [ Tadika ] [ Tahun 1 ] [ Tahun 2 ] [ Tahun 3 ]       │
├──────────────────────────────────────────────────────────┤
│  D. CONTINUE LEARNING STRIP  ← NEW                       │
│     Horizontal scroll · last 2–3 visited modules         │
├──────────────────────────────────────────────────────────┤
│  E. SUBJECT CARDS GRID  (5 consolidated cards)           │
│     2-col mobile · 4-col desktop (last card centered)    │
├──────────────────────────────────────────────────────────┤
│  F. BOTTOM SAFE AREA (nav bar clearance)                  │
└──────────────────────────────────────────────────────────┘
```

---

## 3. Section A — Top Nav Bar

> Already handled by App.jsx shell — no changes needed on HomePage.

---

## 4. Section B — Hero Section (Revised)

### Layout
```
┌─────────────────────────────────────┬──────────┐
│  SELAMAT DATANG                     │  🔥  7   │
│  Hei, Iman! 🚀                      │          │
│  ⭐ LEVEL 3                          │   [PLANET]│
│                                     │          │
│  ┌──────────────────────────────┐   │          │
│  │ Isn  Sel  Rab  Kha  Jum  Sab  Aha│          │
│  │  ○   ○   🔥   ○   ○   ○   ○  │          │
│  └──────────────────────────────┘   │          │
└─────────────────────────────────────┴──────────┘
```

### Changes from current
- **Keep:** All existing hero elements unchanged
- **Remove:** Nothing from hero
- **Add:** Below the streak bar, a small **Tahun badge chip** showing the currently selected year
  ```
  📚 Tahun 2  [Tukar →]
  ```
  This chip links to the Tahun Selector (Section C).

---

## 5. Section C — Tahun Selector Tabs ⬅ NEW

Replaces the "Kumpulan Umur" section entirely.

### Visual Layout
```
  TAHUN PELAJARAN
  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
  │ Tadika   │  │ Tahun 1  │  │ Tahun 2  │  │ Tahun 3  │
  │ 4–6 thn  │  │ 7 thn    │  │ 8 thn    │  │ 9 thn    │
  └──────────┘  └──────────┘  └──────────┘  └──────────┘
     inactive      ACTIVE        inactive      inactive
```

### Behaviour
- Tapping a tab sets `selectedTahun` state in App.jsx (persisted to localStorage)
- All subject cards below immediately reflect that year's module data
- Active tab has filled background; inactive tabs are ghost/outlined
- On mobile: tabs scroll horizontally (no wrap) — `overflow-x: auto; white-space: nowrap`

### Tab States
| State | Style |
|---|---|
| **Active** | Solid gradient bg, white text, drop shadow |
| **Inactive** | Transparent bg, muted text, thin border |
| **Hover** | Subtle lift + brightness increase |

### Color per Tab
| Tab | Gradient | Glow |
|---|---|---|
| Tadika | `#FF4757 → #991B1B` | red |
| Tahun 1 | `#FCD34D → #92400E` | gold |
| Tahun 2 | `#22D3EE → #0E4D6E` | cyan |
| Tahun 3 | `#A78BFA → #4C1D95` | violet |

### Anatomy of each tab pill
```
┌──────────────────────┐
│  [icon]  Tahun 1     │  ← title
│          7 tahun     │  ← subtitle / age hint
└──────────────────────┘
```
Icons: Tadika = ⭐, Tahun 1 = 📗, Tahun 2 = 📘, Tahun 3 = 📙

---

## 6. Section D — Continue Learning Strip ⬅ NEW

Shown only when the user has previously visited at least one module.  
Hidden (or shows "Mula Belajar!" CTA) on first-time use.

### Visual Layout — horizontal scroll
```
  TERUSKAN BELAJAR
  ┌──────────────────────────┐   ┌──────────────────────────┐
  │  🟣 Matematik T2          │   │  🔵 Pend. Islam T2        │
  │  Modul 2 · Penambahan    │   │  Modul 1 · Akidah        │
  │  ████████░░░░  67%       │   │  ██░░░░░░░░░░  20%       │
  │              [Teruskan →]│   │              [Teruskan →]│
  └──────────────────────────┘   └──────────────────────────┘
```

### Card Anatomy
```
┌─────────────────────────────────┐
│  [Subject colour dot]  Subject  │  ← subject name (small caps)
│  Module title                   │  ← bold, 1 line max, truncate
│  Chapter / lesson name          │  ← muted, smaller
│  ████████░░░░  67%              │  ← progress bar + % label
│  [icon]  [Teruskan →]           │  ← CTA button
└─────────────────────────────────┘
```

### Rules
- Max **3 cards** shown; sorted by `lastAccessed` (most recent first)
- Card width: `260px` fixed; container `overflow-x: auto; scroll-snap-type: x mandatory`
- Each card: `scroll-snap-align: start`
- Progress bar: accent colour matches the subject card colour
- If no history: replace strip with a motivational chip — `✨ Pilih subjek untuk mula!`

---

## 7. Section E — Subject Cards Grid (Consolidated)

### Consolidation Map

| Old Cards (7) | New Cards (5) | Reason |
|---|---|---|
| Belajar Membaca | **Membaca** | keep |
| Belajar Sebutan | **Sebutan BM** | keep |
| Jawi (standalone) | ❌ removed | now lives inside Pendidikan Islam |
| Matematik (old) | ❌ removed | replaced by Matematik KSSR |
| Pendidikan Islam V1 | **Pendidikan Islam** | merged with Jawi entry point |
| Matematik KSSR | **Matematik** | renamed, keep |
| Robot & Kod | **Robot & Kod** | keep |

**Final 5 subject cards:**
1. Membaca
2. Sebutan BM
3. Pendidikan Islam *(includes Jawi module inside)*
4. Matematik
5. Robot & Kod

### Grid Layout
```
Desktop (≥1024px) — 4 columns:
┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐
│ Membaca │  │ Sebutan │  │ Pend.   │  │Matematik│
│         │  │         │  │ Islam   │  │         │
└─────────┘  └─────────┘  └─────────┘  └─────────┘
                      ┌─────────┐
                      │ Robot & │
                      │  Kod    │
                      └─────────┘  (centered, col 2–3)

Tablet (768–1023px) — 2 columns + 1 centered:
┌─────────┐  ┌─────────┐
│ Membaca │  │ Sebutan │
└─────────┘  └─────────┘
┌─────────┐  ┌─────────┐
│ Pend.   │  │Matematik│
│ Islam   │  │         │
└─────────┘  └─────────┘
      ┌─────────┐
      │ Robot   │  (centered)
      └─────────┘

Mobile (<768px) — 2 columns:
Same as tablet
```

### Subject Card Anatomy (updated)
```
┌──────────────────────────┐
│  ┌──────────────────┐    │
│  │   Robot Head SVG │    │  ← rb-stage (110px sq.)
│  │   + deco dots    │    │
│  └──────────────────┘    │
│                          │
│  ┌── PILL LABEL ────┐    │  ← rb-pill (existing)
│  └──────────────────┘    │
│                          │
│  Card description text   │  ← rb-desc (existing)
│                          │
│  ──────────────────────  │  ← NEW: divider line
│  ████░░░░░  3/8 modul    │  ← NEW: progress bar (year-aware)
└──────────────────────────┘
```

### NEW: Progress Bar on Card (year-aware)
- Shows progress for the **currently selected Tahun** only
- Format: `[filled bar]  3/8 modul`
- Bar colour: matches the card's accent colour
- If Tahun has 0 progress: show `Mulakan →` text in accent colour instead of bar
- Hidden on Tadika tab if subject has no Tadika content

### Subject Card Colour Map (keep existing)
| Subject | Class | Main gradient |
|---|---|---|
| Membaca | `card-reading` | warm orange |
| Sebutan BM | `card-speak` | pink |
| Pendidikan Islam | `card-islamic-v1` | cyan-teal |
| Matematik | `card-matematik-kssr` | emerald |
| Robot & Kod | `card-robot` | orange |

---

## 8. Navigation Flow (Updated)

```
HomePage
│
├── [Tahun tab selected] → sets selectedTahun (persisted)
│       └── subject cards re-render with that year's progress
│
├── [Continue Learning card clicked]
│       └── navigate directly to that module's page
│
├── [Subject card clicked]
│       └── SubjectPage (shows modules for selectedTahun)
│               └── Module clicked → ModulePage
│                       └── Lesson/Game
│
└── [Bottom nav: Home / Progress / Settings]
```

### Key change: Subject → Year → Module (old) becomes Year → Subject → Module (new)
The Tahun selector at the top means the user sets their grade **once** globally, not per-subject.

---

## 9. State Architecture

```js
// App.jsx additions
const [selectedTahun, setSelectedTahun] = useState(
  localStorage.getItem('selectedTahun') || 'tahun-1'
);

// Pass down to HomePage
<HomePage
  selectedTahun={selectedTahun}
  onSelectTahun={(t) => {
    setSelectedTahun(t);
    localStorage.setItem('selectedTahun', t);
  }}
  recentModules={getRecentModules()}   // from gameStatsManager
  ...existingProps
/>
```

### `getRecentModules()` shape
```js
[
  {
    subjectId: 'matematik-kssr',
    subjectLabel: 'Matematik',
    moduleId: 'modul-2',
    moduleLabel: 'Penambahan',
    lessonLabel: 'Bab 3: Tambah hingga 100',
    progress: 0.67,         // 0.0 – 1.0
    total: 8,               // total lessons/games
    completed: 5,
    lastAccessed: 1717632000000,
    route: 'matematik-kssr',
    color: '#0F766E',
  },
  ...
]
```

---

## 10. Responsive Breakpoints

| Breakpoint | Tahun Tabs | Subject Grid | Continue Strip |
|---|---|---|---|
| `< 480px` (phone) | 2×2 grid, no subtitle | 2-col | 1 card visible, snap scroll |
| `480–767px` (large phone) | horizontal scroll row | 2-col | 1–2 cards |
| `768–1023px` (tablet) | horizontal row | 2-col + 1 centered | 2 cards |
| `≥ 1024px` (desktop) | horizontal row | 4-col + 1 centered | 3 cards |

---

## 11. Empty & Loading States

### No history (first visit)
```
  TERUSKAN BELAJAR
  ┌──────────────────────────────────────────────────┐
  │  ✨ Pilih subjek untuk mula pembelajaran!         │
  │                    [Mulakan Sekarang →]            │
  └──────────────────────────────────────────────────┘
```

### Subject with 0 progress for selected Tahun
```
  ┌──────────┐
  │  [robot] │
  │  PILL    │
  │  desc    │
  │ Mulakan →│  ← replaces progress bar
  └──────────┘
```

### Loading skeleton
- Hero: shimmer block (full width, 180px height)
- Tahun tabs: 4 rounded pill skeletons
- Continue strip: 2 card skeletons
- Subject cards: 5 card skeletons

---

## 12. Removed Sections

| Removed | Replacement |
|---|---|
| "KUMPULAN UMUR" heading + 4 age-group buttons | Tahun Selector Tabs (Section C) |
| Standalone Jawi card | Module inside Pendidikan Islam card |
| Old Matematik card (card-math) | Consolidated into Matematik KSSR card |

---

## 13. Implementation Priority

| Order | Task | Effort |
|---|---|---|
| 1 | Consolidate 7 cards → 5 (remove old Math + move Jawi) | Low |
| 2 | Add Tahun Selector Tabs + localStorage persistence | Medium |
| 3 | Wire selectedTahun into subject card click handlers | Low |
| 4 | Add progress bar row to subject cards (year-aware) | Medium |
| 5 | Build Continue Learning strip + `getRecentModules()` | High |

---

## 14. Design Token Reference

```css
/* Tahun tab colours */
--tahun-tadika:  #FF4757;
--tahun-1:       #FCD34D;
--tahun-2:       #22D3EE;
--tahun-3:       #A78BFA;

/* Progress bar */
--progress-track: rgba(0,0,0,0.08);
--progress-radius: 6px;
--progress-height: 6px;

/* Continue card */
--continue-card-bg:    #FFFFFF;
--continue-card-radius: 16px;
--continue-card-shadow: 0 4px 16px rgba(0,0,0,0.08);
--continue-card-width:  260px;
```

---

*End of document — implement section by section, confirm each slice before proceeding.*
