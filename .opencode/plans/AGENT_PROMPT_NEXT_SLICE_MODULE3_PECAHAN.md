# Agent Prompt — Next Slice: Module 3 Pecahan

Use this prompt with the other agent.

## Which Prompt To Use

Use this file first.

This is the slice-specific prompt for the next active pending slice, so you do not need the earlier generic prompt unless you want to delegate a different slice later.

---

You are continuing the active Matematik Tahun 1 restructure in this repo:

`C:\Users\izwan\Desktop\math-adventure`

Your task:
Complete the next pending item in the active board:

`Module 3 · Pecahan`

Source of truth for status:

`C:\Users\izwan\Desktop\math-adventure\.opencode\plans\MATEMATIK_T1_SUBTOPIC_RESTRUCTURE.md`

Target row:

`| 3 · Pecahan | 1 | ⬜ | + footer |`

Your job is to bring this Module 3 row to:

`🔍 Pending Verification`

Important:

- Do only `Module 3 · Pecahan`.
- Do not start Module 4.
- Do not bulk-continue the roadmap.
- When done, mark the row `Pending Verification`, add a short note, and stop.

## Read These First

1. `C:\Users\izwan\Desktop\math-adventure\.opencode\plans\MATEMATIK_T1_SUBTOPIC_RESTRUCTURE.md`
2. `C:\Users\izwan\Desktop\math-adventure\.opencode\plans\MATEMATIK_LEARN_RESTRUCTURE_PLAN.md`
3. `C:\Users\izwan\Desktop\math-adventure\src\components\MatematikPage\_shared\EXPLORE_SPLIT_PLAN.md`
4. `C:\Users\izwan\Desktop\math-adventure\src\components\MatematikPage\Tahun1\Module3_Pecahan\PecahanModule.jsx`
5. `C:\Users\izwan\Desktop\math-adventure\src\components\MatematikPage\Tahun1\Module3_Pecahan\KenaliPecahan.jsx`
6. `C:\Users\izwan\Desktop\math-adventure\src\components\MatematikPage\_shared\explore_T1_3.jsx`
7. `C:\Users\izwan\Desktop\math-adventure\src\components\MatematikPage\_shared\MatematikExplore.jsx`
8. `C:\Users\izwan\Desktop\math-adventure\src\components\MatematikPage\_shared\MatematikTopicShell.jsx`
9. `C:\Users\izwan\Desktop\math-adventure\src\components\MatematikPage\_shared\MatematikActivityFrame.jsx`

## What Already Exists

- `PecahanModule.jsx` already exists.
- `KenaliPecahan.jsx` already exists.
- `KenaliPecahanExplore` already exists in `explore_T1_3.jsx`.
- `MatematikExplore.jsx` already lazy-loads `explore_T1_3.jsx`.
- The Pecahan hub currently has placeholder / disabled footer items.
- Reuse what exists. Do not rewrite working pieces.

## Architecture Rules Already Locked

- Split by dependency graph, not raw line ranges.
- Keep fewer files first.
- Do not split further unless there is a stable public API.
- Do not break the existing lazy-loading structure in `MatematikExplore.jsx`.
- Do not refactor unrelated modules.

## UI / Layout Rules Already Locked

- Keep the existing `MatematikTopicShell` background scene.
- Do not add a new root background that overrides the shell.
- Content area must remain vertically centered between the existing header and footer.
- Question-page content uses 4 sections:
  1. Question header inside content area
  2. Main visual prompt zone
  3. Answer interaction zone
  4. Action zone
- Section 1 needs a visible bottom gap before Section 2.
- Sections 2, 3, and 4 should follow the same gap rhythm.
- Keep header and footer behavior unchanged.
- Remove extra celebration text banners if they create dead space.
- Preserve responsive layout on small and large screens.

## Implementation Goal

Complete `Module 3 · Pecahan` in the current 5-module Tahun 1 structure with the smallest correct diff.

Minimum expected outcome:

1. `Kenali Pecahan` is live and correctly wired in the current Module 3 flow.
2. The Module 3 hub is no longer left in a placeholder-only state for the footer area if there is a clear existing pattern to reuse.
3. Do not invent a brand-new architecture if an existing Module 1 / Module 2 pattern already solves it.
4. If a part is genuinely under-specified, choose the smallest consistent implementation that matches existing live modules.
5. If something cannot be completed without guessing beyond the current project patterns, stop and state that clearly instead of inventing a new system.

## Files Likely Involved

- `src/components/MatematikPage/Tahun1/Module3_Pecahan/PecahanModule.jsx`
- `src/components/MatematikPage/Tahun1/Module3_Pecahan/KenaliPecahan.jsx`
- `src/components/MatematikPage/_shared/explore_T1_3.jsx`
- Possibly `App.jsx` if routing is missing or incomplete
- Only touch shared files if Module 3 truly needs it

## What Not To Do

- Do not rewrite Module 1 or Module 2.
- Do not change planning docs except to mark Module 3 as `Pending Verification` and add the note.
- Do not start Module 4.
- Do not add speculative abstractions.
- Do not revert unrelated user changes.
- Do not mark the slice `Completed`.

## Verification Required Before Stopping

1. Run `npm.cmd run build`
2. Verify the real Matematik Module 3 / Pecahan page in the app, not only a harness
3. Check for:
   - no white screen
   - no missing shell background
   - no broken spacing / layout drift
   - no runtime `ReferenceError`
   - no broken lazy import / export
   - no placeholder-only broken state for the delivered Module 3 flow

## After Finishing

1. Update the Module 3 · Pecahan row in:
   `C:\Users\izwan\Desktop\math-adventure\.opencode\plans\MATEMATIK_T1_SUBTOPIC_RESTRUCTURE.md`
2. Change status from `⬜` to `🔍`
3. Add a one-line note describing what was implemented
4. Stop immediately

## Required Final Report Format

- Slice completed: Module 3 · Pecahan
- Marked: Pending Verification
- Files changed: [short list]
- Build: passed / failed
- Real page check: passed / failed
- Notes: [1-3 short lines]
