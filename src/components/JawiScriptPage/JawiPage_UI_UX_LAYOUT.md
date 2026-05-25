# JawiPage.jsx — UI/UX Layout Breakdown

The root element at [JawiPage.jsx:235](JawiPage.jsx#L235) is the page-level flex column that lives inside `.app-container`. This document describes the layout, top → bottom, with the spacing logic for each piece.

---

## Component tree

```
.app-container
└── <div flex column, flex:1, overflow:hidden>   ← root wrapper (line 235)
    ├── <AppHeader>                              ← fixed-height top bar
    └── <div flex:1, overflowY:auto>             ← scroll viewport
        └── .jw-body                             ← gradient background canvas
            └── .jw-shell                        ← centered content column (max 980px)
                ├── .jw-hero
                │   ├── .jw-hero-emoji-wrap
                │   │   └── .jw-hero-emoji  (icon)
                │   └── .jw-hero-sub
                ├── .jw-section-label            ← "Choose Activity"
                ├── .jw-grid                     ← 2-col (≥760px: 3-col)
                │   └── .jw-tile  ×6
                │       ├── .jw-tile-num
                │       ├── .jw-spark  ×3
                │       ├── .jw-illo  (SVG)
                │       └── .jw-cap
                │           ├── .jw-cap-title
                │           └── .jw-cap-go
                └── .jw-hint
```

---

## 1. Root wrapper — [JawiPage.jsx:235](JawiPage.jsx#L235)

Inline-styled `flex column` with `flex:1` and `overflow:hidden`. **No padding, no margin** — it fills `.app-container` exactly. Its job is purely structural: pin the header at the top and give the body a scrollable region below it.

## 2. AppHeader — [JawiPage.jsx:237](JawiPage.jsx#L237)

Imported component (back button + score/coins). It owns its own internal padding. It sits flush against the top edge of `.app-container` — no margin around it here, because the parent is a flex column with no `gap`.

## 3. Scroll viewport — [JawiPage.jsx:239](JawiPage.jsx#L239)

`flex:1, overflowY:auto, position:relative`. Takes the remaining vertical space below the header. **No padding** here; the inner `.jw-shell` owns the gutters.

## 4. `.jw-body` — [JawiPage.css:17](JawiPage.css#L17)

Pure background layer (three radial gradients + cream base). `minHeight:100%` is set inline so the gradient covers the full scroll area even when content is short. No padding/margin of its own — it's a paint layer.

## 5. `.jw-shell` — [JawiPage.css:35](JawiPage.css#L35)

The **main content gutter**. This is where the page actually breathes.

- `max-width: 980px` + `margin: 0 auto` → centered column on wide screens.
- `padding: 14px 14px 80px` → 14px side gutters, 14px top, **80px bottom** to clear the mobile bottom-nav and give the last row of tiles air.
- `z-index: 2` (kept; harmless without `.jw-bg-deco`).
- Mobile override at [≤560px](JawiPage.css#L294): `padding: 10px 10px 80px` (tighter side gutters, bottom kept at 80px).

## 6. `.jw-hero` — [JawiPage.css:46](JawiPage.css#L46)

The hero icon block with a bouncing emoji/SVG and the subtitle.

- `padding: 10px 8px 4px` → tiny inner cushion; the wrap below is what controls vertical size.
- `margin-bottom: 6px` → minimal gap because the `.jw-section-label` below has its own large `margin: 18px 0`.
- `.jw-hero-emoji-wrap` has a **fixed `height:130px`** — it reserves vertical space so the bouncing icon animation doesn't push later content around.
- `.jw-hero-emoji` runs the `jw-bounce` keyframe (gentle vertical bob) and projects a radial `::before` glow halo behind the icon.
- `.jw-hero-sub` uses `margin: 6px auto 0` + `max-width: 520px` to keep the subtitle line short and readable, with `gap:8px` between text and the trailing star SVG.

## 7. `.jw-section-label` — [JawiPage.css:87](JawiPage.css#L87)

"PILIH AKTIVITI / CHOOSE ACTIVITY" divider.

- `margin: 18px 0` → equal breathing room above (separating from hero) and below (separating from grid). This is the **primary vertical rhythm** between hero and grid; the hero deliberately uses small margins so this label owns the space.
- `gap: 14px` between the text and its flanking gradient lines (drawn via `::before` / `::after`).

## 8. `.jw-grid` — [JawiPage.css:99](JawiPage.css#L99)

The 6-tile grid.

- Mobile: `repeat(2, 1fr)`, `column-gap:14px`, `row-gap:22px` (rows taller than columns — gives tiles vertical breathing room without wasting horizontal space).
- ≥760px: `repeat(3, 1fr)`, `column-gap:22px`, `row-gap:28px`.
- ≤560px override: `column-gap:10px`, `row-gap:18px` (tighter on phones).
- **No padding** on the grid itself — `.jw-shell` already supplies the page gutters.

## 9. `.jw-tile` — [JawiPage.css:108](JawiPage.css#L108)

Each activity button.

- `padding: 0` — the tile is a positioning context, not a flow container. Every child is absolutely placed.
- `aspect-ratio: 1/1.05` keeps a near-square shape regardless of column width.
- `border-radius: 32px`, clean button without layered shadow effects.
- Color theme injected via `--base`, `--deep`, etc. — overridden per tile by the `.t-alphabet`, `.t-syllables`, etc. classes.

### Children of `.jw-tile` (all absolutely positioned — no margin used)

| Child | Positioning | Notes |
|---|---|---|
| `.jw-tile-num` ([css:222](JawiPage.css#L222)) | `top:14px; left:14px` | 38×38 white circle badge (1–6). Mobile: 32×32. |
| `.jw-spark` ×3 ([css:254](JawiPage.css#L254)) | inline `top/left/right/bottom` % | Hidden until `:hover`. |
| `.jw-illo` ([css:234](JawiPage.css#L234)) | `top:14%; left:0; right:0; bottom:30%` | Reserves the upper-middle band of the tile for the SVG illustration. Mobile: `top:16%; bottom:45%` (increased bottom spacing for mobile to prevent overlap with caption). |
| `.jw-cap` ([css:261](JawiPage.css#L261)) | `bottom:14px; left:14px; right:14px` | White caption pill at the bottom. |

### `.jw-cap` internal spacing

- `padding: 12px 16px` → vertical-tight, horizontal-roomy pill.
- `gap: 8px` between `.jw-cap-title` text and the `.jw-cap-go` arrow circle.
- `.jw-cap-go` is 36×36 (mobile 32×32) with `flex-shrink:0` so the title never squashes it.
- Mobile (`≤560px`): `padding: 10px 12px`, `border-radius: 18px`, font drops to `.98rem`.

## 10. `.jw-hint` — [JawiPage.css:286](JawiPage.css#L286)

The "✨ Coming soon ✨" footer line under the grid.

- `margin-top: 26px` → clear separation from the last row of tiles (bigger than the grid's row-gap to feel like a different section).
- `gap: 8px` between the two SVG stars and the italic text.
- No bottom margin — `.jw-shell`'s `padding-bottom:80px` provides the page-end air.

---

## Spacing philosophy summary

1. **One owner per gutter.** `.jw-shell` owns the side/page gutters; child components never re-add side padding.
2. **Margins for flow, padding for containment.** `.jw-hero`, `.jw-section-label`, `.jw-grid`, `.jw-hint` use vertical `margin` to space themselves. Internal pills like `.jw-cap` use `padding` to size their content.
3. **Tile interior uses absolute positioning, not margin.** Every child of `.jw-tile` is pinned with `top/left/right/bottom`, so spacing stays consistent across the 6 differently-themed tiles regardless of content length.
4. **Generous bottom padding (80px on `.jw-shell`)** specifically clears the mobile bottom-nav bar — a known constraint from the global layout.
5. **Mobile tightens the gutters and pill sizes** at the `≤560px` breakpoint but keeps the 80px bottom clearance and the vertical rhythm intact.
