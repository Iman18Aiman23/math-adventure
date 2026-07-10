# EXPLORE_SPLIT_PLAN.md
# explorePrimitives.jsx — Complete Split Execution Plan

> **For executing agent:** Read this entire document before writing any code.
> 
> **File to split:** `src/components/MatematikPage/_shared/explorePrimitives.jsx`  
> **Current size:** 8,737 lines / ~409 KB  
> **Only consumer:** `src/components/MatematikPage/_shared/MatematikExplore.jsx` (line 2)

---

## Overview

Split one monolithic file into **9 scoped files**:

| # | New File | KSSR Topic | Est. Lines |
|---|----------|-----------|-----------|
| 1 | `explorePrimitives_shared.jsx` | Shared utils & widgets | ~650 |
| 2 | `explore_T1_1_Nombor.jsx` | T1.1 Nombor Bulat hingga 100 | ~3,200 |
| 3 | `explore_T1_2_KenaliTambah.jsx` | T1.2 Kenali Tambah | ~500 |
| 4 | `explore_T1_2_LatihanTambah.jsx` | T1.2 Latihan Tambah | ~600 |
| 5 | `explore_T1_2_KenaliTolak.jsx` | T1.2 Kenali Tolak | ~800 |
| 6 | `explore_T1_2_LatihanTolak.jsx` | T1.2 Latihan Tolak | ~600 |
| 7 | `explore_T1_2_CeritaTambahTolak.jsx` | T1.2 Cerita Tambah & Tolak | ~400 |
| 8 | `explore_T1_2_TambahBerulang.jsx` | T1.2 Tambah Berulang | ~350 |
| 9 | `explore_T1_2_SelesaikanCabaran.jsx` | T1.2 Selesaikan + Latih Diri + Cabar Minda | ~800 |
| 10 | `explore_T1_3_Pecahan.jsx` | T1.3 Pecahan Asas | ~350 |

The original `explorePrimitives.jsx` becomes a **thin barrel re-export** (~30 lines) so
`MatematikExplore.jsx` needs **zero changes**.

> **Performance note:** No lag risk. Vite bundles all synchronous imports into one chunk at
> build time — file boundaries do not exist at runtime. The `React.lazy()` split happens at
> the MatematikExplore feature level, not at this primitive level.

---

## SHARED DEPENDENCIES — Must Know Before Coding

These symbols are used across **multiple** topic sections. They must live in
`explorePrimitives_shared.jsx` and be imported wherever needed.

| Symbol | Defined at line (original) | Used in |
|--------|---------------------------|---------|
| `BOX_COLORS` | 8 | T1.1 AND T1.2 LatihanTambah, TambahBerulang |
| `SPLATTER_PATHS` | 21 | T1.1 KombinasiExplore region |
| `randInt` | 101 | ALL sections |
| `pick` | 102 | ALL sections |
| `shuffle` | 103 | ALL sections |
| `NumOptionsGrid` | 995 | T1.1 AND T1.2 LatihanTambah, LatihanTolak, TambahBerulang |
| `WordOptionsGrid` | 1303 | T1.1 AND T1.2 KenaliTambah, KenaliTolak |
| `BM_ONES`, `BM_TEENS`, `BM_TENS` | 1121–1123 | T1.1 AND T1.2 SelesaikanCabaran |
| `numToBM` | 1125 | T1.1 AND T1.2 SelesaikanCabaran |
| `KeypadInput` | 4328 | T1.2 KenaliTambah, KenaliTolak, LatihanTambah, LatihanTolak, SelesaikanCabaran |

> **WARNING:** `NumOptionsGrid` (line 995), `WordOptionsGrid` (line 1303), `BM_ONES/TEENS/TENS`
> (line 1121), and `numToBM` (line 1125) are defined **inside the T1.1 line range** but also used
> in T1.2. They MUST be moved to `_shared` and their definitions REMOVED from the T1.1 section.
> Duplicating them in two files will cause a runtime crash.

---

## FILE 1 — `explorePrimitives_shared.jsx` (CREATE NEW)

### Content to extract from original file

| Symbol | Line range | Action |
|--------|-----------|--------|
| All imports (React, confetti, playSound, etc.) | 1–6 | Copy as-is |
| `BOX_COLORS` | 8–16 | Copy as-is |
| `SPLATTER_PATHS` | 21–30 | Copy as-is |
| `randInt`, `pick`, `shuffle` | 101–110 | Copy + add `export` keyword |
| `NumOptionsGrid` | 995–1038 | Copy + add `export` keyword |
| `BM_ONES`, `BM_TEENS`, `BM_TENS` | 1121–1124 | Copy + add `export` keyword |
| `numToBM` | 1125–1132 | Copy + add `export` keyword |
| `WordOptionsGrid` | 1303–1380 | Copy + add `export` keyword |
| Stub exports (NumberGridExplore etc.) | 40–88 | Copy as-is (already exported) |
| `KeypadInput` | 4328–4642 | Copy as-is (already exported) |

### EmptyTray and ObjectsGrid

`EmptyTray` (line 612) and `ObjectsGrid` (line 161) — check if used outside their own section.
`ObjectsGrid` is used in `CompareExplore` (T1.1) AND in `GabungKumpulanContent` (T1.2 KenaliTambah).
`EmptyTray` is used in T1.2 KenaliTambah. Both must go to `_shared`.

| Symbol | Line | Action |
|--------|------|--------|
| `ObjectsGrid` (the CompareExplore version at line 161) | 161–177 | Copy to `_shared`, add `export` |
| `EmptyTray` | 612–622 | Copy to `_shared`, add `export` |

---

## FILE 2 — `explore_T1_1_Nombor.jsx` (CREATE NEW)

**KSSR Topic:** Topik 1.1 — Nombor Bulat hingga 100

### File header

```js
import React, { useState, useContext } from 'react';
import confetti from 'canvas-confetti';
import { playSound } from '../../../utils/soundManager';
import MatematikActivityFrame, { recordActivityScore } from './MatematikActivityFrame';
import { MatematikNavContext } from './MatematikNavContext';
import {
  BOX_COLORS, SPLATTER_PATHS,
  randInt, pick, shuffle,
  NumOptionsGrid, WordOptionsGrid,
  BM_ONES, BM_TEENS, BM_TENS, numToBM,
  ObjectsGrid, EmptyTray,
} from './explorePrimitives_shared';
```

### Line range from original

Copy lines **90–4327**, SKIPPING these sub-ranges (moved to `_shared`):
- Lines 101–110 (`randInt`, `pick`, `shuffle`)
- Lines 161–177 (`ObjectsGrid` — the CompareExplore version)
- Lines 612–622 (`EmptyTray`)
- Lines 995–1038 (`NumOptionsGrid`)
- Lines 1121–1132 (`BM_ONES`, `BM_TEENS`, `BM_TENS`, `numToBM`)
- Lines 1303–1380 (`WordOptionsGrid`)

### Exports

- `CompareExplore`
- `KenaliNomborExplore`
- `KombinasiExplore`
- `Kenali21Hingga100Explore`
- `NilaiTempatExplore`
- `SusunanNomborExplore`
- `PolaNomborExplore`
- `AnggarBundarExplore`
- `SelesaikanExplore`
- `LatihDiriExplore`
- `CabarMindaExplore`
- `SelesaikanCeritaM1Explore`
- `CabarMindaM1Explore`

### Local-only symbols (stay in this file, do NOT move)

- `CMP_ICONS` (line 99) — CompareExplore only
- `KENALI_WORDS` (line 510), `DEFAULT_KENALI_CONFIG` (line 513) — KenaliNombor only
- `KOMBINASI_ICONS` (line 905) — Kombinasi only
- `DOT_SHAPES` (line 1947) — Susunan only
- `STEP_WORD` (line 2518) — Pola only
- `PLACE_LABELS` (line 1862) — NilaiTempat only
- All internal helper functions and sub-components

---

## FILE 3 — `explore_T1_2_KenaliTambah.jsx` (CREATE NEW)

**KSSR Topic:** T1.2 Kenali Tambah (Slice 2.1, lines 4413–4659 in original)

### File header

```js
import React from 'react';
import { randInt, pick, shuffle, WordOptionsGrid, KeypadInput, ObjectsGrid, EmptyTray } from './explorePrimitives_shared';
import MatematikActivityFrame, { recordActivityScore } from './MatematikActivityFrame';
```

### Line range from original

Copy lines **4413–4659** (from the `/* Slice 2.1 */` comment to end of `KenaliTambahExplore`).

### Exports — TWO LAYERS

**Public export (the explore component):**
- `export function KenaliTambahExplore`

**Named exports for use by SelesaikanCabaran (add `export` keyword to each):**
- `export function GabungKumpulanContent`
- `export function GarisNomborContent`
- `export function PerkataanContent` (the Tambah version)
- `export function AyatContent` (the Tambah version)
- `export function genGabungKumpulan`
- `export function genGarisNombor`
- `export function genPilihPerkataan`
- `export function genLengkapkanAyat`
- `export function NumberTrackAdd` (SVG component, used by Cerita too)

### Local-only (stays private, no export)

- `KT_ICONS` (line 4421)
- `buildKenaliTambahRound`

---

## FILE 4 — `explore_T1_2_LatihanTambah.jsx` (CREATE NEW)

**KSSR Topic:** T1.2 Latihan Tambah (Slice 2.2, lines ~4962–6185 in original)

### File header

```js
import React, { useRef } from 'react';
import { BOX_COLORS, randInt, pick, shuffle, NumOptionsGrid, KeypadInput } from './explorePrimitives_shared';
import MatematikActivityFrame, { recordActivityScore } from './MatematikActivityFrame';
```

### Line range from original

Copy lines **4962–6185** (the Latihan Tambah section, including all the generator functions
starting at the `/* Mudah M1 */` comment at line 4962 through end of `LatihanTambahExplore`).

### Exports — TWO LAYERS

**Public export:**
- `export function LatihanTambahExplore`

**Named exports for SelesaikanCabaran:**
- `export function MudahM1Content`
- `export function WarnaiContent`
- `export function PadankanContent`
- `export function BondContent`
- `export function AbacusBuildContent`
- `export function ColumnAddContent`
- `export function genMudahM1`
- `export function genWarnai`
- `export function genPadankan`
- `export function genBond`
- `export function genAbacusBuild` (called as `() => genAbacusBuild('sukar')` in CabarMinda)
- `export function genSederhanaS1`
- `export function genSukarK1`

### Local-only

- All internal constants and sub-generators not listed above

---

## FILE 5 — `explore_T1_2_KenaliTolak.jsx` (CREATE NEW)

**KSSR Topic:** T1.2 Kenali Tolak (Slice 2.3, lines ~4661–4961 in original)

> **Note:** KenaliTolak code appears BEFORE LatihanTambah in the file (lines 4661–4961),
> but is logically its own topic. Copy this range for KenaliTolak.

### File header

```js
import React from 'react';
import { randInt, pick, shuffle, WordOptionsGrid, KeypadInput, ObjectsGrid } from './explorePrimitives_shared';
import MatematikActivityFrame, { recordActivityScore } from './MatematikActivityFrame';
```

### Line range from original

Copy lines **4661–4961** (from `/* Slice 2.3 — Kenali Tolak */` to end of `KenaliTolakExplore`).

### Exports — TWO LAYERS

**Public export:**
- `export function KenaliTolakExplore`

**Named exports for SelesaikanCabaran:**
- `export function BuangKumpulanContent`
- `export function GarisNomborSubContent`
- `export function PerkataanTolakContent`
- `export function AyatTolakContent`
- `export function genBuangKumpulan`
- `export function genGarisNomborSub`
- `export function genPilihPerkataanTolak`
- `export function genLengkapkanAyatTolak`
- `export function NumberTrackSub` (SVG component, if defined here)

### Local-only

- `buildKenaliTolakRound`

---

## FILE 6 — `explore_T1_2_LatihanTolak.jsx` (CREATE NEW)

**KSSR Topic:** T1.2 Latihan Tolak (lines ~5737–6527 in original)

### File header

```js
import React, { useRef } from 'react';
import { BOX_COLORS, randInt, pick, shuffle, NumOptionsGrid, KeypadInput } from './explorePrimitives_shared';
import MatematikActivityFrame, { recordActivityScore } from './MatematikActivityFrame';
```

### Line range from original

Copy lines **5737–6527** (from `/* Mudah M1: a - b */` at line 5737 through end of
`LatihanTolakExplore` at ~line 6527).

### Exports — TWO LAYERS

**Public export:**
- `export function LatihanTolakExplore`

**Named exports for SelesaikanCabaran:**
- `export function MudahTolakContent` (may share name with Tambah — disambiguate if needed)
- `export function WarnaiTolakContent`
- `export function PadankanTolakContent`
- `export function BondTolakContent`
- `export function TolakBlokContent`
- `export function VerticalDiffContent`
- `export function genMudahTolakM1`
- `export function genWarnaiTolak`
- `export function genPadankanTolak`
- `export function genBondTolak`
- `export function genAbacusBuildTolak` (called as `() => genAbacusBuildTolak('sukar')`)
- `export function genSederhanaTolakS1`
- `export function genSukarTolakK1`

---

## FILE 7 — `explore_T1_2_CeritaTambahTolak.jsx` (CREATE NEW)

**KSSR Topic:** T1.2 Cerita Tambah & Tolak (lines ~6528–6826 in original)

### File header

```js
import React from 'react';
import { randInt, pick, shuffle, NumOptionsGrid, KeypadInput } from './explorePrimitives_shared';
import MatematikActivityFrame, { recordActivityScore } from './MatematikActivityFrame';
```

### Line range from original

Copy lines **6528–6826** (from `CeritaTambahTolakExplore` section through its closing brace).

### Exports — TWO LAYERS

**Public export:**
- `export function CeritaTambahTolakExplore`

**Named exports for SelesaikanCabaran:**
- `export function CeritaKeypadContent`
- `export function CeritaOperasiContent`
- `export function CeritaAyatContent`
- `export function StoryText`
- `export function genTypeA`
- `export function genTypeB`
- `export function genTypeCWithOp`
- `export function genTypeDWithOp`

### Local-only

- `CTT_NAMES`, `CTT_EMOJIS`, `CTT_ADD_FN`, `CTT_SUB_FN`, `CTT_C_ADD_FN`, `CTT_C_SUB_FN` (lines 6252–6279)
- `buildCeritaTambahTolakRound`

---

## FILE 8 — `explore_T1_2_TambahBerulang.jsx` (CREATE NEW)

**KSSR Topic:** T1.2 Tambah Berulang / Tambah Tolak Berulang (lines ~6827–6896 in original)

### File header

```js
import React from 'react';
import { BOX_COLORS, randInt, pick, shuffle, NumOptionsGrid } from './explorePrimitives_shared';
import MatematikActivityFrame, { recordActivityScore } from './MatematikActivityFrame';
```

### Line range from original

Copy lines **6827–6896** (from `TambahBerulangExplore` through its closing brace).
Also include all helper functions that appear BEFORE this export:
`genTbParams`, `tbOpts`, `genTbAddGroups`, `genTbAddLine`, `genTbAddComplete`,
`genTbSubParams`, `tbSubOpts`, `genTbSubGroups`, `genTbSubLine`, `buildTambahBerulangRound`,
`GroupsGrid`, `NumberLineAdd`, `NumberLineSub`, and the content components.
These are at lines ~6551–6826.

So the actual range to copy is **6551–6896**.

### Exports — TWO LAYERS

**Public export:**
- `export function TambahBerulangExplore`

**Named exports for SelesaikanCabaran:**
- `export function TbAddGroupsContent`
- `export function TbAddLineContent`
- `export function TbAddCompleteContent`
- `export function TbSubGroupsContent`
- `export function TbSubLineContent`
- `export function genTbAddGroups`
- `export function genTbAddLine`
- `export function genTbAddComplete`
- `export function genTbSubGroups`
- `export function genTbSubLine`

### Local-only

- `TB_ICONS`, `TB_M`, `TB_N` (lines 6551–6553)
- `GroupsGrid`, `NumberLineAdd`, `NumberLineSub` (internal display components)

---

## FILE 9 — `explore_T1_2_SelesaikanCabaran.jsx` (CREATE NEW)

**KSSR Topics:** T1.2 Selesaikan Cerita M2 + Latih Diri M2 + Cabar Minda M2  
This file **imports from all 6 other T1.2 topic files**. This is intentional and correct —
`renderQuestionM2All()` (line 7256) is a dispatcher that references components from every topic.

### File header

```js
import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { playSound } from '../../../utils/soundManager';
import MatematikActivityFrame, { recordActivityScore } from './MatematikActivityFrame';
import { MatematikNavContext } from './MatematikNavContext';
import useGamification from '../../../hooks/useGamification';
import {
  BOX_COLORS, randInt, pick, shuffle,
  NumOptionsGrid, BM_ONES, BM_TEENS, BM_TENS, numToBM,
} from './explorePrimitives_shared';

// ── T1.2 topic components (for renderQuestionM2All dispatcher) ──
import {
  GabungKumpulanContent, GarisNomborContent, PerkataanContent, AyatContent,
  genGabungKumpulan, genGarisNombor, genPilihPerkataan, genLengkapkanAyat,
} from './explore_T1_2_KenaliTambah';

import {
  MudahM1Content, WarnaiContent, PadankanContent, BondContent,
  AbacusBuildContent, ColumnAddContent,
  genMudahM1, genWarnai, genPadankan, genBond, genAbacusBuild,
  genSederhanaS1, genSukarK1,
} from './explore_T1_2_LatihanTambah';

import {
  BuangKumpulanContent, GarisNomborSubContent, PerkataanTolakContent, AyatTolakContent,
  genBuangKumpulan, genGarisNomborSub, genPilihPerkataanTolak, genLengkapkanAyatTolak,
} from './explore_T1_2_KenaliTolak';

import {
  VerticalDiffContent, TolakBlokContent, PadankanTolakContent,
  BondTolakContent, WarnaiTolakContent, MudahTolakContent,
  genMudahTolakM1, genWarnaiTolak, genPadankanTolak, genBondTolak,
  genAbacusBuildTolak, genSederhanaTolakS1, genSukarTolakK1,
} from './explore_T1_2_LatihanTolak';

import {
  CeritaKeypadContent, CeritaOperasiContent, CeritaAyatContent, StoryText,
  genTypeA, genTypeB, genTypeCWithOp, genTypeDWithOp,
} from './explore_T1_2_CeritaTambahTolak';

import {
  TbAddGroupsContent, TbAddLineContent, TbAddCompleteContent,
  TbSubGroupsContent, TbSubLineContent,
  genTbAddGroups, genTbAddLine, genTbAddComplete, genTbSubGroups, genTbSubLine,
} from './explore_T1_2_TambahBerulang';
```

### Line range from original

Copy lines **6860–8717** (from `buildSelesaikanM2Round` at line 6860 through end of
`CabarMindaM2Explore`).

### Exports

- `export function SelesaikanM2Explore`
- `export function LatihDiriM2Explore`
- `export function CabarMindaM2Explore`

### Local-only

- `buildSelesaikanM2Round`
- `renderQuestionM2All` — the cross-topic dispatcher (stays private, internal only)
- `buildM2DrillRound`
- `M2DrillScreen`
- `buildCabarMindaM2Round`
- `LD_SECTIONS`, `LD_TYPE_LABELS`, `SECTOR_META`, `LD_SCORES_KEY`, `LD_PASS_RATIO` (lines 7338–7395)
- `CM_SLICES` (line 8003)

---

## FILE 10 — `explore_T1_3_Pecahan.jsx` (CREATE NEW)

**KSSR Topic:** Topik 1.3 — Pecahan Asas

### File header

```js
import React, { useState, useContext } from 'react';
import confetti from 'canvas-confetti';
import { playSound } from '../../../utils/soundManager';
import MatematikActivityFrame, { recordActivityScore } from './MatematikActivityFrame';
import { MatematikNavContext } from './MatematikNavContext';
import { randInt, pick, shuffle } from './explorePrimitives_shared';
```

### Line range from original

Copy lines **8385–8737** (Pecahan helpers start at `FRAC_WORDS` at line 8385, not at the export
at line 8718 — all local helpers must be included).

### Exports

- `export function KenaliPecahanExplore`

### Local-only

- `FRAC_WORDS`, `FractionSvg`, `EqualSvg`, `UnequalSvg`
- `FRAC_QUESTION_ANSWER`, `makeOptions`
- `genSamaBesar`, `genNamakanPecahan`, `genPilihGambar`, `buildKenaliPecahanRound`
- `SamaBesarContent`, `NamakanContent`, `PilihGambarContent`

---

## Replace Original File — Barrel Re-export

Replace the **entire content** of `explorePrimitives.jsx` with:

```js
/**
 * explorePrimitives.jsx — barrel re-export
 *
 * This file was split into topic-scoped files for maintainability.
 * Import directly from specific files for new code:
 *   - explorePrimitives_shared.jsx          (shared utils, KeypadInput, stubs)
 *   - explore_T1_1_Nombor.jsx               (KSSR T1.1 — Nombor Bulat hingga 100)
 *   - explore_T1_2_KenaliTambah.jsx         (KSSR T1.2 — Kenali Tambah)
 *   - explore_T1_2_LatihanTambah.jsx        (KSSR T1.2 — Latihan Tambah)
 *   - explore_T1_2_KenaliTolak.jsx          (KSSR T1.2 — Kenali Tolak)
 *   - explore_T1_2_LatihanTolak.jsx         (KSSR T1.2 — Latihan Tolak)
 *   - explore_T1_2_CeritaTambahTolak.jsx    (KSSR T1.2 — Cerita Tambah & Tolak)
 *   - explore_T1_2_TambahBerulang.jsx       (KSSR T1.2 — Tambah Berulang)
 *   - explore_T1_2_SelesaikanCabaran.jsx    (KSSR T1.2 — Selesaikan + Latih Diri + Cabar Minda)
 *   - explore_T1_3_Pecahan.jsx              (KSSR T1.3 — Pecahan Asas)
 */

// Shared utilities and stubs
export {
  NumberGridExplore, BuildAddExplore, FractionExplore,
  MoneyExplore, ClockExplore, KeypadInput,
} from './explorePrimitives_shared';

// KSSR T1.1 — Nombor Bulat hingga 100
export {
  CompareExplore, KenaliNomborExplore, KombinasiExplore,
  Kenali21Hingga100Explore, NilaiTempatExplore, SusunanNomborExplore,
  PolaNomborExplore, AnggarBundarExplore, SelesaikanExplore,
  LatihDiriExplore, CabarMindaExplore,
  SelesaikanCeritaM1Explore, CabarMindaM1Explore,
} from './explore_T1_1_Nombor';

// KSSR T1.2 — Operasi Asas (Tambah & Tolak)
export { KenaliTambahExplore } from './explore_T1_2_KenaliTambah';
export { LatihanTambahExplore } from './explore_T1_2_LatihanTambah';
export { KenaliTolakExplore } from './explore_T1_2_KenaliTolak';
export { LatihanTolakExplore } from './explore_T1_2_LatihanTolak';
export { CeritaTambahTolakExplore } from './explore_T1_2_CeritaTambahTolak';
export { TambahBerulangExplore } from './explore_T1_2_TambahBerulang';
export {
  SelesaikanM2Explore, LatihDiriM2Explore, CabarMindaM2Explore,
} from './explore_T1_2_SelesaikanCabaran';

// KSSR T1.3 — Pecahan Asas
export { KenaliPecahanExplore } from './explore_T1_3_Pecahan';
```

> **MatematikExplore.jsx needs ZERO changes** — the barrel re-export preserves all existing
> named exports at the same import path.

---

## Execution Order (MUST follow this sequence)

1. **CREATE** `explorePrimitives_shared.jsx`
2. **CREATE** `explore_T1_1_Nombor.jsx`
3. **CREATE** `explore_T1_2_KenaliTambah.jsx`
4. **CREATE** `explore_T1_2_KenaliTolak.jsx`
5. **CREATE** `explore_T1_2_LatihanTambah.jsx`
6. **CREATE** `explore_T1_2_LatihanTolak.jsx`
7. **CREATE** `explore_T1_2_CeritaTambahTolak.jsx`
8. **CREATE** `explore_T1_2_TambahBerulang.jsx`
9. **CREATE** `explore_T1_2_SelesaikanCabaran.jsx` (depends on steps 3–8)
10. **CREATE** `explore_T1_3_Pecahan.jsx`
11. **REPLACE** `explorePrimitives.jsx` with the barrel re-export
12. **VERIFY** dev server starts and all activities load

---

## Critical Warnings

> **Do NOT duplicate shared symbols.** `NumOptionsGrid`, `WordOptionsGrid`, `randInt`, `pick`,
> `shuffle`, `numToBM`, `BM_ONES/TEENS/TENS`, `ObjectsGrid`, `EmptyTray` must exist in
> `explorePrimitives_shared.jsx` ONLY. Remove them from T1.1 when copying it.

> **Pecahan helpers start at line 8385**, not 8718. The export `KenaliPecahanExplore` is at line
> 8718 but its local helpers (`FRAC_WORDS`, `FractionSvg`, etc.) start at line 8385. Copy
> everything from 8385 onward.

> **`useGamification`** is only needed in `SelesaikanCabaran.jsx` (used by `LatihDiriM2Explore`).
> Do not include it in T1.1, KenaliTambah, LatihanTambah, or other files.

> **Internal components must be exported** from topic files so `SelesaikanCabaran` can import
> them. Without the `export` keyword on `GabungKumpulanContent`, `ColumnAddContent`, etc., the
> import in `SelesaikanCabaran` will fail with "is not exported" error.

> **No circular dependencies.** The dependency flows one direction: all T1.2 topic files →
> `SelesaikanCabaran`. Never have a topic file import from `SelesaikanCabaran`.

---

## Final File Structure

```
src/components/MatematikPage/_shared/
├── explorePrimitives.jsx                 ← REPLACE: barrel re-export (~40 lines)
├── explorePrimitives_shared.jsx          ← NEW: shared utils, KeypadInput, stubs (~650 lines)
├── explore_T1_1_Nombor.jsx               ← NEW: T1.1 Nombor Bulat hingga 100 (~3,200 lines)
├── explore_T1_2_KenaliTambah.jsx         ← NEW: T1.2 Kenali Tambah (~500 lines)
├── explore_T1_2_LatihanTambah.jsx        ← NEW: T1.2 Latihan Tambah (~600 lines)
├── explore_T1_2_KenaliTolak.jsx          ← NEW: T1.2 Kenali Tolak (~800 lines)
├── explore_T1_2_LatihanTolak.jsx         ← NEW: T1.2 Latihan Tolak (~600 lines)
├── explore_T1_2_CeritaTambahTolak.jsx    ← NEW: T1.2 Cerita Tambah & Tolak (~400 lines)
├── explore_T1_2_TambahBerulang.jsx       ← NEW: T1.2 Tambah Berulang (~350 lines)
├── explore_T1_2_SelesaikanCabaran.jsx    ← NEW: T1.2 Selesaikan + Latih Diri + Cabar Minda (~800 lines)
└── explore_T1_3_Pecahan.jsx              ← NEW: T1.3 Pecahan Asas (~350 lines, grows in future)
```

---

## Verification Checklist

- [ ] `npm run dev` starts without errors or warnings
- [ ] Matematik → Tahun 1 → Module 1 (Nombor) → any Belajar topic → activity loads correctly
- [ ] Matematik → Tahun 1 → Module 2 (Operasi Asas) → Kenali Tambah Belajar → loads
- [ ] Matematik → Tahun 1 → Module 2 → Latihan Tambah Belajar → loads
- [ ] Matematik → Tahun 1 → Module 2 → Kenali Tolak Belajar → loads
- [ ] Matematik → Tahun 1 → Module 2 → Latihan Tolak Belajar → loads
- [ ] Matematik → Tahun 1 → Module 2 → Cerita Tambah & Tolak Belajar → loads
- [ ] Matematik → Tahun 1 → Module 2 → Tambah Berulang Belajar → loads
- [ ] Matematik → Tahun 1 → Module 2 → Selesaikan Cerita M2 Belajar → loads (uses all topic components)
- [ ] Matematik → Tahun 1 → Module 2 → Latih Diri M2 Belajar → loads (drill mode works)
- [ ] Matematik → Tahun 1 → Module 2 → Cabar Minda M2 Belajar → loads (mixed exam works)
- [ ] Matematik → Tahun 1 → Module 3 (Pecahan) → Kenali Pecahan Belajar → loads
- [ ] No "Cannot find module" errors in browser console
- [ ] No "is not exported" errors in browser console
- [ ] No duplicate declaration runtime errors
