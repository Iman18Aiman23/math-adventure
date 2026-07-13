# Explore Primitives Split Plan

## Status

This plan replaces the older raw line-range split plan.

The goal is maintainability as Matematik explore content grows. The split must follow dependencies and topic ownership, not approximate line numbers.

Current decisions:

- Split into fewer ownership files first.
- Keep shared helpers in one shared module.
- Only add more files when each file has a stable public API.
- Treat runtime verification as required, because missing helper dependencies can pass build but still fail in the browser.
- Verify the real Matematik question page, not only isolated harness output.

## Why Split

The old explore monolith had grown too large and would keep growing as more topics were added. A single large file made it harder to:

- find the right topic component
- review changes safely
- avoid accidental cross-topic coupling
- onboard future content work
- isolate regressions when one topic breaks

The split is mainly for scalability and maintainability.

## Performance Impact

The dependency split itself should not create meaningful lag.

There are now two separate concerns:

- dependency split for maintainability
- lazy loading at the explore/topic-group boundary for runtime optimization

The maintainability split alone does not create meaningful extra work. With the current lazy boundary in `MatematikExplore.jsx`, the runtime behavior is now:

- only the selected topic-group chunk is fetched when needed
- initial question-page JavaScript stays smaller than the old monolith
- there is a small one-time load cost when a chunk is first opened
- ongoing runtime work is still effectively unchanged after the chunk is loaded

This is the right tradeoff for scalability: better source ownership, smaller initial payload, and no meaningful steady-state lag.

## Current File Structure

```text
src/components/MatematikPage/_shared/
|- explorePrimitives_shared.jsx
|- explore_T1_1.jsx
|- explore_T1_1_core.jsx
|- explore_T1_1_assessment.jsx
|- explore_T1_2_core.jsx
|- explore_T1_2_assessment.jsx
`- explore_T1_3.jsx
```

Notes:

- `explore_T1_1.jsx` is a compatibility barrel for Module 1.
- The real ownership split is `T1_1_core` plus `T1_1_assessment`.
- `MatematikExplore.jsx` lazy loads the topic-group files directly.

## File Responsibilities

### `explorePrimitives_shared.jsx`

Shared primitives and helpers used by multiple topics.

Examples:

- placeholder explore components
- random helpers such as `randInt`, `pick`, `shuffle`
- shared answer controls
- shared visual helpers such as `ObjectsGrid`
- shared input components such as `Choices` and `KeypadInput`
- shared constants such as colors and SVG path data

Rule: if a topic file needs a helper from another topic file, the helper belongs here unless a deliberate stable API already exists.

### `explore_T1_1.jsx`

Compatibility barrel only.

Responsibilities:

- preserve any existing Module 1 imports during migration
- re-export from `explore_T1_1_core.jsx` and `explore_T1_1_assessment.jsx`
- avoid becoming a second place for real logic

### `explore_T1_1_core.jsx`

Tahun 1, Module 1 number-related learning components.

Examples:

- `CompareExplore`
- `KenaliNomborExplore`
- `KombinasiExplore`
- `Kenali21Hingga100Explore`
- `NilaiTempatExplore`
- `SusunanNomborExplore`
- `PolaNomborExplore`
- `AnggarBundarExplore`

Stable API:

- export public Module 1 learning components
- export `module1CoreApi` for allowed cross-file reuse by `explore_T1_1_assessment.jsx`

### `explore_T1_1_assessment.jsx`

Tahun 1, Module 1 assessment and mixed-practice components.

Examples:

- `SelesaikanExplore`
- `LatihDiriExplore`
- `CabarMindaExplore`
- `SelesaikanCeritaM1Explore`
- `CabarMindaM1Explore`

### `explore_T1_2_core.jsx`

Tahun 1, Module 2 core addition and subtraction learning components.

Examples:

- `KenaliTambahExplore`
- `LatihanTambahExplore`
- `KenaliTolakExplore`
- `LatihanTolakExplore`
- `CeritaTambahTolakExplore`
- `TambahBerulangExplore`

Stable API:

- export public Module 2 learning components
- export `module2CoreApi` for allowed cross-file reuse by `explore_T1_2_assessment.jsx`

### `explore_T1_2_assessment.jsx`

Tahun 1, Module 2 assessment or mixed-practice components.

Examples:

- `SelesaikanM2Explore`
- `LatihDiriM2Explore`
- `CabarMindaM2Explore`

### `explore_T1_3.jsx`

Tahun 1, Module 3 fraction components.

Examples:

- `KenaliPecahanExplore`

## Dependency Rules

Follow these rules before moving code:

1. Move shared dependencies first.
2. Move topic components second.
3. Import shared helpers from `explorePrimitives_shared.jsx`.
4. Keep topic files independent from each other when possible.
5. Do not split by raw line ranges.
6. Do not duplicate helpers just to avoid an import.
7. Do not export private internals from topic files unless another file genuinely needs them.
8. If cross-file reuse is needed, expose one deliberate API object instead of many ad hoc helper exports.

The safe direction currently looks like this:

```text
MatematikExplore.jsx
  -> explorePrimitives_shared.jsx
  -> explore_T1_1_core.jsx
  -> explore_T1_1_assessment.jsx
  -> explore_T1_2_core.jsx
  -> explore_T1_2_assessment.jsx
  -> explore_T1_3.jsx
```

Topic files may import from `explorePrimitives_shared.jsx`.

Topic files should not import from each other unless a stable public API is deliberately created.

Current allowed exceptions:

- `explore_T1_1_assessment.jsx` consumes `module1CoreApi`
- `explore_T1_2_assessment.jsx` consumes `module2CoreApi`

## Public API Rule

Only export the explore components that `MatematikExplore.jsx` needs, plus the small deliberate API objects needed for cross-file reuse.

Avoid exporting many private helpers. If the split grows beyond the current topic-group files, define a stable public API for each file first:

- exported component names
- shared data contracts
- allowed helper exports
- ownership boundaries
- test or harness coverage expectations

Current stable APIs already in use:

- `module1CoreApi`
- `module2CoreApi`

Only move toward 10+ files after those APIs are clear.

## Verification Checklist

After any split or dependency movement:

- Run `npm.cmd run build`.
- Open the real Matematik question/explore page in the browser.
- Verify at least one primitive from each file mounts.
- Verify `compare`, because it uses shared visual helpers.
- Verify numeric keypad pages, because they depend on `KeypadInput`.
- Verify one real assessment page from Module 1 and Module 2, because they consume core APIs.
- Verify the shell background and standardized content layout still render correctly.
- Watch for runtime `ReferenceError` issues, not only build failures.

Recommended local harness coverage:

- render every explore primitive in isolation
- wrap each primitive in an error boundary
- show a visible `ok` or error status per primitive

## Known Regression From Split

A previous split caused a white screen because `ObjectsGrid` moved into shared, but its helper `objEmojiSize` did not move with it.

Lesson:

- dependency movement must be graph-based
- browser runtime verification is required
- successful production build is not enough for this refactor type

## Lazy Splitting Recommendation

Do not start with deeper file splitting for performance.

This step is now partially implemented. `MatematikExplore.jsx` lazy loads the current topic-group files:

- `explore_T1_1_core.jsx`
- `explore_T1_1_assessment.jsx`
- `explore_T1_2_core.jsx`
- `explore_T1_2_assessment.jsx`
- `explore_T1_3.jsx`

Next performance work, if needed, should only go one level deeper if:

- a topic-group chunk becomes too large again
- each new file has a stable public API
- the real page is verified after the split

## Final Recommendation

Keep the current dependency-graph split and current topic-group lazy loading.

This gives the project a cleaner structure while keeping risk low. It supports future growth without adding unnecessary public APIs too early. Move to more files only when the content volume or ownership boundaries make that extra structure clearly useful.
