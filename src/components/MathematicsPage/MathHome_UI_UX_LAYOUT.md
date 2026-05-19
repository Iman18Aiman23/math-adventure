# MathHome.jsx — UI/UX Layout Breakdown

The root element at [MathHome.jsx:235](MathHome.jsx#L235) is the page-level flex column that lives inside `.app-container`. This document describes the layout, top → bottom, with the spacing logic for each piece.

---

## Component tree

```
.app-container
└── <div flex column, flex:1, overflow:hidden>   ← root wrapper (line 235)
    ├── <AppHeader>                              ← fixed-height top bar
    └── <div flex:1, overflowY:auto>             ← scroll viewport
        └── .mh-body                             ← gradient background canvas
            └── .mh-shell                        ← centered content column (max 980px)
                ├── .mh-hero
                │   ├── .mh-hero-emoji-wrap
                │   │   └── .mh-hero-emoji  (icon)
                │   └── .mh-hero-sub
                ├── .mh-section-label            ← "Choose Topic"
                ├── .mh-grid                     ← 2-col (≥760px: 3-col)
                │   └── .mh-tile  ×3
                │       ├── .mh-tile-num
                │       ├── .mh-spark  ×3
                │       ├── .mh-illo  (SVG)
                │       └── .mh-plate
                │           ├── .mh-plate-title
                │           └── .mh-go
                └── .mh-hint
```

---

## 1. Root wrapper — [MathHome.jsx:235](MathHome.jsx#L235)

Inline-styled `flex column` with `flex:1` and `overflow:hidden`. **No padding, no margin** — it fills `.app-container` exactly. Its job is purely structural: pin the header at the top and give the body a scrollable region below it.

## 2. AppHeader — [MathHome.jsx:237](MathHome.jsx#L237)

Imported component (back button + score/coins). It owns its own internal padding. It sits flush against the top edge of `.app-container` — no margin around it here, because the parent is a flex column with no `gap`.

## 3. Scroll viewport — [MathHome.jsx:239](MathHome.jsx#L239)

`flex:1, overflowY:auto, position:relative`. Takes the remaining vertical space below the header. **No padding** here; the inner `.mh-shell` owns the gutters.

## 4. `.mh-body` — [MathHome.css:17](MathHome.css#L17)

Pure background layer (three radial gradients + cream base). `minHeight:100%` is set inline so the gradient covers the full scroll area even when content is short. No padding/margin of its own — it's a paint layer.

## 5. `.mh-shell` — [MathHome.css:35](MathHome.css#L35)

The **main content gutter**. This is where the page actually breathes.

- `max-width: 980px` + `margin: 0 auto` → centered column on wide screens.
- `padding: 14px 14px 80px` → 14px side gutters, 14px top, **80px bottom** to clear the mobile bottom-nav and give the last row of tiles air.
- `z-index: 2` (kept; harmless without `.mh-bg-deco`).
- Mobile override at [≤560px](MathHome.css#L294): `padding: 10px 10px 80px` (tighter side gutters, bottom kept at 80px).

## 6. `.mh-hero` — [MathHome.css:46](MathHome.css#L46)

The hero icon block with a bouncing emoji/SVG and the subtitle.

- `padding: 10px 8px 4px` → tiny inner cushion; the wrap below is what controls vertical size.
- `margin-bottom: 6px` → minimal gap because the `.mh-section-label` below has its own large `margin: 18px 0`.
- `.mh-hero-emoji-wrap` has a **fixed `height:130px`** — it reserves vertical space so the bouncing icon animation doesn't push later content around.
- `.mh-hero-emoji` runs the `mh-bounce` keyframe (gentle vertical bob) and projects a radial `::before` glow halo behind the icon.
- `.mh-hero-sub` uses `margin: 6px auto 0` + `max-width: 520px` to keep the subtitle line short and readable, with `gap:8px` between text and the trailing star SVG.

## 7. `.mh-section-label` — [MathHome.css:87](MathHome.css#L87)

"PILIH TOPIK / CHOOSE TOPIC" divider.

- `margin: 18px 0` → equal breathing room above (separating from hero) and below (separating from grid). This is the **primary vertical rhythm** between hero and grid; the hero deliberately uses small margins so this label owns the space.
- `gap: 14px` between the text and its flanking gradient lines (drawn via `::before` / `::after`).

## 8. `.mh-grid` — [MathHome.css:99](MathHome.css#L99)

The 3-tile mathematics topic grid.

- Mobile: `repeat(2, 1fr)`, `column-gap:14px`, `row-gap:22px` (rows taller than columns — gives tiles vertical breathing room without wasting horizontal space).
- ≥760px: `repeat(3, 1fr)`, `column-gap:22px`, `row-gap:28px`.
- ≤560px override: `column-gap:10px`, `row-gap:18px` (tighter on phones).
- **No padding** on the grid itself — `.mh-shell` already supplies the page gutters.

## 9. `.mh-tile` — [MathHome.css:108](MathHome.css#L108)

Each mathematics topic button.

- `padding: 0` — the tile is a positioning context, not a flow container. Every child is absolutely placed.
- `aspect-ratio: 1/1.05` keeps a near-square shape regardless of column width.
- `border-radius: 32px`, layered `box-shadow` for the 3D "stacked" look (top highlight, bottom inner shadow, 10px solid drop = "puff" effect).
- Color theme injected via `--base`, `--deep`, etc. — overridden per tile by the `.t-*` classes (`.t-green`, `.t-orange`, `.t-sky`).

### Children of `.mh-tile` (all absolutely positioned — no margin used)

| Child | Positioning | Notes |
|---|---|---|
| `.mh-tile-num` ([css:222](MathHome.css#L222)) | `top:14px; left:14px` | 38×38 white circle badge (1–3). Mobile: 32×32. |
| `.mh-spark` ×3 ([css:254](MathHome.css#L254)) | inline `top/left/right/bottom` % | Hidden until `:hover`. |
| `.mh-illo` ([css:234](MathHome.css#L234)) | `top:14%; left:0; right:0; bottom:30%` | Reserves the upper-middle band of the tile for the SVG illustration. Mobile: `top:16%`. |
| `.mh-plate` ([css:261](MathHome.css#L261)) | `bottom:14px; left:14px; right:14px` | White caption pill at the bottom. |

### `.mh-plate` internal spacing

- `padding: 12px 16px` → vertical-tight, horizontal-roomy pill.
- `gap: 8px` between `.mh-plate-title` text and the `.mh-go` arrow circle.
- `.mh-go` is 36×36 (mobile 32×32) with `flex-shrink:0` so the title never squashes it.
- Mobile (`≤560px`): `padding: 10px 12px`, `border-radius: 18px`, font drops to `.98rem`.

## 10. `.mh-hint` — [MathHome.css:286](MathHome.css#L286)

The "✨ Pick a topic to start learning! ✨" footer line under the grid.

- `margin-top: 26px` → clear separation from the last row of tiles (bigger than the grid's row-gap to feel like a different section).
- `gap: 8px` between the two SVG stars and the italic text.
- No bottom margin — `.mh-shell`'s `padding-bottom:80px` provides the page-end air.

---

## Spacing philosophy summary

1. **One owner per gutter.** `.mh-shell` owns the side/page gutters; child components never re-add side padding.
2. **Margins for flow, padding for containment.** `.mh-hero`, `.mh-section-label`, `.mh-grid`, `.mh-hint` use vertical `margin` to space themselves. Internal pills like `.mh-plate` use `padding` to size their content.
3. **Tile interior uses absolute positioning, not margin.** Every child of `.mh-tile` is pinned with `top/left/right/bottom`, so spacing stays consistent across the 3 differently-themed tiles regardless of content length.
4. **Generous bottom padding (80px on `.mh-shell`)** specifically clears the mobile bottom-nav bar — a known constraint from the global layout.
5. **Mobile tightens the gutters and pill sizes** at the `≤560px` breakpoint but keeps the 80px bottom clearance and the vertical rhythm intact.
