# 🕌 Pendidikan Islam — Build Plan

> Based on KSSR Pendidikan Islam Tahap 1 (Tahun 1–3)
> Status key: ✅ Complete | 🔄 In Progress | ⏳ Pending

---

## Phase 0 — App Integration

| # | Task | Status |
|---|------|--------|
| 0.1 | Add "Pendidikan Islam V1" button on HomePage (teal/cyan color) | ✅ Complete |
| 0.2 | Wire button to route `pendidikan-islam-v1` in App.jsx | ✅ Complete |
| 0.3 | Create `src/components/PendidikanIslamPage/` folder | ✅ Complete |
| 0.4 | Create `PendidikanIslamHomePage.jsx` (homepage shell) | ✅ Complete |
| 0.5 | Update App.jsx route to point to `PendidikanIslamHomePage` | ✅ Complete |

---

## Phase 1 — Homepage Shell

| # | Task | Status |
|---|------|--------|
| 1.1 | Hero banner — teal/cyan gradient + crescent moon SVG art | ✅ Complete |
| 1.2 | Year selector tabs — Tahun 1 / Tahun 2 / Tahun 3 | ✅ Complete |
| 1.3 | Module grid — 3 columns responsive (see grid spec below) | ✅ Complete |
| 1.4 | 6 module cards with color, icon, title, desc, topic count | ✅ Complete |
| 1.5 | Lock/unlock state — Year 1 active, Years 2 & 3 "Akan Datang" | ✅ Complete |
| 1.6 | BackButton wired to return to HomePage | ✅ Complete |
| 1.7 | Responsive breakpoints applied (mobile-first) | ✅ Complete |

---

## Homepage Visual Wireframe

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

## Module Card Anatomy

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

## Responsive Grid Specification

| Breakpoint | Columns | Gap | Card min-height |
|------------|---------|-----|-----------------|
| Mobile `< 640px` | 1 | `0.85rem` | `80px` |
| Tablet `768px` | 2 | `1rem` | `200px` |
| Desktop `≥ 1024px` | 3 | `1.25rem` | `220px` |

### CSS Grid Pattern (mobile-first)
```css
/* Base — mobile */
.module-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.85rem;
}

/* Tablet md: 768px */
@media (min-width: 768px) {
  .module-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}

/* Desktop lg: 1024px */
@media (min-width: 1024px) {
  .module-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }
}
```

### Typography — fluid scale with clamp()
```css
.module-title  { font-size: clamp(1rem,   2.5vw, 1.25rem); }
.module-desc   { font-size: clamp(0.75rem, 1.8vw, 0.9rem);  }
.hero-title    { font-size: clamp(1.5rem,  4vw,   2.25rem); }
```

---

## Module Color System

| Module | Color Name | Card Gradient | Border Tint |
|--------|-----------|---------------|-------------|
| 1. Al-Quran & Tajwid | Gold / Amber | `#FFF7D6 → #FDD97A → #D4960A` | `rgba(212,150,10,0.4)` |
| 2. Akidah | Emerald Green | `#D6F5DD → #8AD9A8 → #2A9A6C` | `rgba(42,154,108,0.4)` |
| 3. Ibadah | Sky Blue | `#D6EEFF → #6BAEE8 → #2563EB` | `rgba(37,99,235,0.4)` |
| 4. Sirah | Purple / Violet | `#E7D9FF → #B79CFF → #7A55E0` | `rgba(122,85,224,0.4)` |
| 5. Adab & Akhlak | Rose / Pink | `#FFE9F3 → #FFBFDD → #FF8CBF` | `rgba(255,128,187,0.4)` |
| 6. Celik Jawi | Teal / Cyan | `#D0F7FA → #67D6E8 → #0891B2` | `rgba(8,145,178,0.4)` |

> Colors reuse the same `radial-gradient(ellipse at 50% 38%, ...)` pattern as subject cards in `HomePage.jsx` for visual consistency.

---

## Phase 2 — Tahun 1 Content (6 Modules)

### Module 1: Al-Quran & Tajwid
> Core mechanic: tap-to-listen audio (TTS / SpeechManager)

| # | Task | Status |
|---|------|--------|
| 2.1.1 | Topic 1.1 — Kenali Huruf Hijaiyah Tunggal (Alif → Ya) | ✅ Complete |
| 2.1.2 | Topic 1.2 — Tanda Bacaan Asas (Fathah, Kasrah, Dammah) | ✅ Complete |
| 2.1.3 | Topic 1.3 — Tanwin (Baris Dua) | ⏳ Pending |
| 2.1.4 | Topic 1.4 — Tilawah & Hafazan: Al-Fatihah, Al-Ikhlas, Al-Falaq, An-Nas, Al-Asr | ⏳ Pending |

### Module 2: Akidah
> Core mechanic: flashcard quiz + matching game

| # | Task | Status |
|---|------|--------|
| 2.2.1 | Topic 2.1 — Rukun Iman (6 Perkara) | ⏳ Pending |
| 2.2.2 | Topic 2.2 — Rukun Islam (5 Perkara) | ⏳ Pending |
| 2.2.3 | Topic 2.3 — Dua Kalimah Syahadah (Lafaz, Makna & Kepentingan) | ⏳ Pending |
| 2.2.4 | Topic 2.4 — Asmaul Husna: Al-Khaliq | ⏳ Pending |

### Module 3: Ibadah
> Core mechanic: illustrated step-by-step cards (no video needed)

| # | Task | Status |
|---|------|--------|
| 2.3.1 | Topic 3.1 — Konsep Istinja' | ⏳ Pending |
| 2.3.2 | Topic 3.2 — Air Mutlak dan Kegunaannya | ⏳ Pending |
| 2.3.3 | Topic 3.3 — Amali Wuduk (Rukun, Sunat & Perkara Membatalkan) | ⏳ Pending |

### Module 4: Sirah
> Core mechanic: story card sequence + fill-in-the-blank quiz

| # | Task | Status |
|---|------|--------|
| 2.4.1 | Topic 4.1 — Nasab dan Keturunan Nabi Muhammad SAW | ⏳ Pending |
| 2.4.2 | Topic 4.2 — Peristiwa Kelahiran dan Penyusuan | ⏳ Pending |
| 2.4.3 | Topic 4.3 — Sifat Terpuji: Al-Amin | ⏳ Pending |

### Module 5: Adab & Akhlak
> Core mechanic: scenario cards — child picks correct adab action

| # | Task | Status |
|---|------|--------|
| 2.5.1 | Topic 5.1 — Adab Makan dan Minum | ⏳ Pending |
| 2.5.2 | Topic 5.2 — Adab Tidur dan Bangun Tidur | ⏳ Pending |
| 2.5.3 | Topic 5.3 — Adab Masuk dan Keluar Tandas | ⏳ Pending |

### Module 6: Celik Jawi
> Core mechanic: reuse existing Jawi game components from Age 7

| # | Task | Status |
|---|------|--------|
| 2.6.1 | Topic 6.1 — Mengenal, Menyebut dan Menulis Huruf Jawi Tunggal | ⏳ Pending |
| 2.6.2 | Topic 6.2 — Suku Kata Terbuka (Vokal: Alif, Wau, Ya) | ⏳ Pending |

---

## Phase 3 — Tahun 2 Content (6 Modules)
> ⏳ Stub only — build after Tahun 1 is complete

| Module | Topics | Status |
|--------|--------|--------|
| 1. Al-Quran, Tajwid & Hadis | Sukun/Syaddah, Idgham rules, 5 surahs, Hadis | ⏳ Pending |
| 2. Akidah | 10 Malaikat, Asmaul Husna: Al-Ahad/As-Samad, Syirik | ⏳ Pending |
| 3. Ibadah | Syarat & Rukun Solat, Azan & Iqamah | ⏳ Pending |
| 4. Sirah | Tanda Kerasulan, Wahyu Pertama, Dakwah Awal | ⏳ Pending |
| 5. Adab & Akhlak | Berpakaian, Kasih sayang keluarga, Berkawan | ⏳ Pending |
| 6. Celik Jawi | Suku Kata Tertutup, Rangkai Kata | ⏳ Pending |

---

## Phase 4 — Tahun 3 Content (6 Modules)
> ⏳ Stub only — build after Tahun 2 is complete

| Module | Topics | Status |
|--------|--------|--------|
| 1. Al-Quran, Tajwid & Hadis | Mim Sakinah, 4 surahs, Surah Al-Asr pengajaran, Hadis | ⏳ Pending |
| 2. Akidah | Kitab-kitab Allah, Al-Quran sebagai panduan, Al-Alim/Al-Hakim | ⏳ Pending |
| 3. Ibadah | Batal solat, Khusyuk, Fardu Ain vs Fardu Kifayah | ⏳ Pending |
| 4. Sirah | Hijrah ke Madinah, Piagam Madinah, Sifat Kepimpinan Nabi | ⏳ Pending |
| 5. Adab & Akhlak | Adab menuntut ilmu, Menghormati guru, Kemudahan awam | ⏳ Pending |
| 6. Celik Jawi | Imbuhan jawi, Teks/petikan jawi, Tanda baca jawi | ⏳ Pending |

---

## Architecture Notes

- **Audio**: Use existing `SpeechManager` + `soundManager` for Al-Quran TTS playback
- **Celik Jawi**: Reuse `BacaSukuKataJawi`, `BinaPerkataanJawi`, `JawiLetterCards` from Age 7
- **Ibadah visuals**: SVG illustrated step cards — no external video dependency
- **Quiz format**: Short 4-choice MCQ at end of each topic (consistent with other subjects)
- **Routing**: Each module routes via `currentAgeGame`-style game ID pattern already in App.jsx
- **Grid**: Mobile-first CSS grid — 1 col → 2 col (768px) → 3 col (1024px)
- **Typography**: `clamp()` fluid scale for all text, `%`/`rem`/`vw` units only (no fixed `px` for text)
- **Images/SVG**: `max-width: 100%`, explicit `width`/`height` attrs, `height: auto` override

---

*Last updated: 2026-05-31*
