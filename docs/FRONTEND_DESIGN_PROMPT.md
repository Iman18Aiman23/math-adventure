# Frontend-Design Skill — Ready-to-Use Prompts

Copy a block below, fill the `<...>` placeholders, and paste it to Claude.
The 5 parts (Target → Audience → Direction → Constraints → Scope) are what make
the `frontend-design` skill produce great, project-safe results.

---

## ✅ Ready-to-use template (fill the blanks)

```
Use the frontend-design skill to <build | restyle | redesign> the <SCREEN/COMPONENT NAME>
(file: <path/to/File.jsx>).

Audience & purpose: <who uses it + the feeling it should give>.
Aesthetic direction: <pick one: playful/toy-like | soft/pastel | bold & celebratory | clean/minimal | editorial>.

Constraints (must follow):
- React + Vite (this project's stack).
- iOS-Safari safe: resting state visible (NO opacity:0 + entrance reveal),
  SVGs use width/height attrs + height:auto (NOT aspect-ratio),
  self-contained SVGs (no cross-root <use>), hover only behind @media(hover:hover).
- Reuse existing tokens/components: <e.g. GameCard, BackButton API, pillar color system>.
- <Stay consistent with the ImanCore identity | Explore a fresh direction> for this screen.

Scope (do NOT exceed): only change <layout + visuals of this one screen>.
Do not touch game logic, routing, or state.

After building, run the webapp-testing skill to screenshot it live so I can review.
```

---

## 🎯 Concrete example — Tahun 2 course screen (copy as-is)

```
Use the frontend-design skill to redesign the Age 8 (Tahun 2) course-selection screen
(file: src/components/.../Tahun2 hub).

Audience & purpose: Malaysian 8-year-olds; it should feel celebratory and game-like,
rewarding to open — not like a worksheet.
Aesthetic direction: playful, rounded, warm and tactile (soft 3D buttons, friendly depth).

Constraints (must follow):
- React + Vite.
- iOS-Safari safe: resting state visible (NO opacity:0 entrance reveals),
  SVGs use width/height attrs + height:auto (NOT aspect-ratio), self-contained SVGs,
  hover only behind @media(hover:hover).
- Reuse the existing GameCard, BackButton API, and pillar color system.
- Stay consistent with the ImanCore visual identity.

Scope (do NOT exceed): only the layout and visuals of this one screen.
Do not change navigation, game state, or routing.

After building, run the webapp-testing skill to screenshot it live so I can review.
```

---

## 🔁 Iteration phrases (after the first result)

- "More playful — bigger rounded shapes, bouncier load animation (keep it iOS-safe)."
- "Tone down the motion; keep only the staggered page-load reveal."
- "Match the existing pillar colors exactly instead of inventing new ones."
- "Increase contrast on the labels for young readers."
- "Now apply the same treatment to the Tahun 1 and Tahun 3 hubs for consistency."

---

## ⚠️ Reminders specific to this project

1. **iOS-safe CSS is mandatory** — the skill loves entrance animations; always anchor it
   to the resting-state-visible rule or screens can render blank on iOS Safari.
2. **One screen at a time** — don't ask it to redesign the whole app in one go.
3. **Identity choice matters** — by default the skill wants a *new* look each time.
   Say "stay on-brand with ImanCore" to keep consistency, or "explore a fresh direction"
   to experiment.
4. **Menus/hubs/landing only** — not Phaser game canvases (those are engine-rendered, not CSS).
5. **Always pair with webapp-testing** — screenshot the live result to judge it for real.
