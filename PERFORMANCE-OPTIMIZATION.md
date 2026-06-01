# Performance Audit & Optimization: Bundle Size Reduction

> **Status: IMPLEMENTED** ✅ — This document was originally a plan; it now records what was actually shipped and the measured results.

## Issue Summary

The app's main JavaScript bundle was **882 kB** (211 kB gzipped), and the Achievement tab pulled in a **619 kB** chunk. All of it was downloaded up front or on first tab open, hurting Time-to-Interactive — especially on slower mobile connections.

---

## Results

| Metric | Before | After |
|---|---|---|
| Main bundle | 882 kB (211 kB gz) | **341 kB (97 kB gz)** |
| Achievement tab load | 619 kB (181 kB gz) | **33 kB (7.5 kB gz)** |
| Build warnings | 3 dup-import + 1 dup-key + 1 chunk-size | **0** |
| Largest chunk | 882 kB | < 400 kB (no >500 kB warning) |
| Loading UX | shimmer skeleton flash on blank screen | spinner overlay on the current page |

---

## What was fixed

### 1. Duplicate static + dynamic imports (defeated code-splitting)

When a module is statically imported by a file in the main bundle, Vite ignores any `React.lazy()` for it and bundles it into the static importer's chunk — so the lazy call was a no-op. Fixed by converting the static importers to lazy:

| Component | Was statically imported from | Fix |
|---|---|---|
| `KVLearningPage` / `KVKLearningPage` | `ReadingPage.jsx` | `React.lazy()` + `<Suspense>` in ReadingPage |
| `JawiKVLearningPage` / `JawiKVKLearningPage` | `JawiSyllablesLearningPage.jsx` | `React.lazy()` + `<Suspense>` in JawiSyllablesLearningPage |

Also removed two genuinely unused imports (`JawiKVLearningPage` in `SukuKataTerbuka.jsx`, `JawiKVKLearningPage` in `HurufJawiTunggal.jsx`).

### 2. Page-level components statically imported in App.jsx

Converted 16 always-loaded imports to `React.lazy()`: `BMPage`, `JawiPage`, `MathHome`, `OpsLandingPage`, `TimeGameMenu`, `ReadingPage`, all four age-group homes, `ProfileHome`, `PendidikanIslamHomePage`, `AssessmentSelector`, `AssessmentPage`, `WelcomeModal`, `LevelUpToast`. `WelcomeModal` and `LevelUpToast` render outside the main Suspense boundary, so each got its own `<Suspense fallback={null}>`.

Kept static (needed for first paint): `HomePage`, `DesktopSidebar`, `CosmicMobileNav`, `LoadingSpinner`, utility modules.

### 3. AchievementHome — heavy libraries deferred to point-of-use

`AchievementHome` eagerly imported `html2canvas` (~200 kB), `jsPDF` (~150 kB + deps), and `canvas-confetti`. These are only needed when a certificate/badge is actually **downloaded**. Fixed by:
- Moving `html2canvas` and `jsPDF` to dynamic `await import()` calls **inside the download handlers** (`handleDownloadBadge`, `handleDownloadAchievement`). PNG downloads load only `html2canvas`; PDF downloads also load `jsPDF`.
- Removing the unused `canvas-confetti` import (it was imported but never called in this file; the package stays — it is used directly by ~80 game components for celebrations).

Opening the Achievement tab now costs ~7.5 kB gz instead of 181 kB; the heavy libs download only on a deliberate download action (already behind a loading state).

### 4. Loading UX — spinner overlay instead of a skeleton flash

Replaced the shimmer `LoadingSkeleton` with a `LoadingSpinner` that has two modes:
- **overlay** — a translucent veil with a centered spinner that sits *on top* of the current page, driven by `isPending` from `useTransition`, so the page you're leaving stays visible while the next chunk loads.
- **block** — a centered spinner used as the Suspense fallback safety-net for genuine cold mounts.

Both fade in after a 220 ms delay, so fast/cached loads show nothing flicker. The spinner is iOS-Safari safe (time-based keyframe, no opacity-on-reveal trap).

Crucial fix for "blank/white screen": the App-level `<Suspense>` was **inside** the `key={viewKey}` div, so every navigation discarded the boundary and dropped to the fallback. Moving `<Suspense>` *outside* the keyed container gives it a stable identity, letting `useTransition` keep the current page on screen. Navigation entry points (`onSelectSubject`, `onSelectAgeGroup`, all `onTabChange`) were routed through `navigate()` (the existing transition), and `ReadingPage` / `JawiSyllablesLearningPage` got their own `useTransition` for level selection.

### 5. Misc

- Fixed a duplicate `fontSize` key in `SusunAyatJawi.jsx` (esbuild warning).

---

## Files changed

| File | Change |
|---|---|
| `src/App.jsx` | 16 imports → `React.lazy()`; Suspense moved outside keyed container; navigations routed through `useTransition`; overlay spinner |
| `src/components/LoadingSpinner.jsx` | **New** — overlay/block spinner with anti-flash delay |
| `src/components/LoadingSkeleton.jsx` | **Deleted** — replaced by LoadingSpinner |
| `src/components/Achievement/AchievementHome.jsx` | `html2canvas` + `jsPDF` → dynamic import in download handlers; removed dead `canvas-confetti` import |
| `src/components/ReadingPage/ReadingPage.jsx` | KV/KVK → `React.lazy()`; `useTransition` for level select |
| `src/components/JawiScriptPage/JawiSyllablesLearningPage.jsx` | JawiKV/KVK → `React.lazy()`; `useTransition` for level select |
| `src/components/PendidikanIslamPage/Tahun1/Module6_Jawi/SukuKataTerbuka.jsx` | Removed unused import |
| `src/components/PendidikanIslamPage/Tahun1/Module6_Jawi/HurufJawiTunggal.jsx` | Removed unused import |
| `src/components/AgeGroup-8/SusunAyatJawi.jsx` | Fixed duplicate `fontSize` key |

---

## Verification

```bash
npm run build
```

Confirmed: no duplicate static/dynamic-import warnings, no duplicate-key warning, no chunk exceeds 500 kB, and each converted component emits its own chunk in `dist/assets/`.
