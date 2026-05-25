# BMPage.jsx — UI/UX Layout Breakdown

The root element at [BMPage.jsx:235](BMPage.jsx#L235) is the page-level flex column that lives inside `.app-container`. This document describes the layout, top → bottom, with the spacing logic for each piece.

---

## Component tree

```
.app-container
└── <div flex column, flex:1, overflow:hidden>   ← root wrapper (line 235)
    ├── <AppHeader>                              ← fixed-height top bar
    └── <div flex:1, overflowY:auto>             ← scroll viewport
        └── .bp-body                             ← gradient background canvas
            └── .bp-shell                        ← centered content column (max 980px)
                ├── .bp-hero
                │   ├── .bp-hero-emoji-wrap
                │   │   └── .bp-hero-emoji  (icon)
                │   └── .bp-hero-sub
                ├── .bp-section-label            ← "Choose Category"
                ├── .bp-grid                     ← 2-col (≥760px: 3-col)
                │   └── .bp-tile  ×5
                │       ├── .bp-tile-num
                │       ├── .bp-spark  ×3
                │       ├── .bp-illo  (SVG)
                │       └── .bp-plate
                │           ├── .bp-plate-title
                │           └── .bp-go
                ├── .bp-hint
                └── .bm-howto (BMPage-specific)
                    ├── .bm-howto-title
                    └── .bm-howto-steps
                        └── .bm-howto-step  ×3
```

---

## 1. Root wrapper — [BMPage.jsx:235](BMPage.jsx#L235)

Inline-styled `flex column` with `flex:1` and `overflow:hidden`. **No padding, no margin** — it fills `.app-container` exactly. Its job is purely structural: pin the header at the top and give the body a scrollable region below it.

## 2. AppHeader — [BMPage.jsx:237](BMPage.jsx#L237)

Imported component (back button + score/coins). It owns its own internal padding. It sits flush against the top edge of `.app-container` — no margin around it here, because the parent is a flex column with no `gap`.

## 3. Scroll viewport — [BMPage.jsx:239](BMPage.jsx#L239)

`flex:1, overflowY:auto, position:relative`. Takes the remaining vertical space below the header. **No padding** here; the inner `.bp-shell` owns the gutters.

## 4. `.bp-body` — [BMPage.css:17](BMPage.css#L17)

Pure background layer (three radial gradients + cream base). `minHeight:100%` is set inline so the gradient covers the full scroll area even when content is short. No padding/margin of its own — it's a paint layer.

## 5. `.bp-shell` — [BMPage.css:35](BMPage.css#L35)

The **main content gutter**. This is where the page actually breathes.

- `max-width: 980px` + `margin: 0 auto` → centered column on wide screens.
- `padding: 14px 14px 80px` → 14px side gutters, 14px top, **80px bottom** to clear the mobile bottom-nav and give the last row of tiles air.
- `z-index: 2` (kept; harmless without `.bp-bg-deco`).
- Mobile override at [≤560px](BMPage.css#L294): `padding: 10px 10px 80px` (tighter side gutters, bottom kept at 80px).

## 6. `.bp-hero` — [BMPage.css:46](BMPage.css#L46)

The hero icon block with a bouncing emoji/SVG and the subtitle.

- `padding: 10px 8px 4px` → tiny inner cushion; the wrap below is what controls vertical size.
- `margin-bottom: 6px` → minimal gap because the `.bp-section-label` below has its own large `margin: 18px 0`.
- `.bp-hero-emoji-wrap` has a **fixed `height:130px`** — it reserves vertical space so the bouncing icon animation doesn't push later content around.
- `.bp-hero-emoji` runs the `bp-bounce` keyframe (gentle vertical bob) and projects a radial `::before` glow halo behind the icon.
- `.bp-hero-sub` uses `margin: 6px auto 0` + `max-width: 520px` to keep the subtitle line short and readable, with `gap:8px` between text and the trailing star SVG.

## 7. `.bp-section-label` — [BMPage.css:87](BMPage.css#L87)

"PILIH KATEGORI / CHOOSE CATEGORY" divider.

- `margin: 18px 0` → equal breathing room above (separating from hero) and below (separating from grid). This is the **primary vertical rhythm** between hero and grid; the hero deliberately uses small margins so this label owns the space.
- `gap: 14px` between the text and its flanking gradient lines (drawn via `::before` / `::after`).

## 8. `.bp-grid` — [BMPage.css:99](BMPage.css#L99)

The 5-tile category grid.

- Mobile: `repeat(2, 1fr)`, `column-gap:14px`, `row-gap:22px` (rows taller than columns — gives tiles vertical breathing room without wasting horizontal space).
- ≥760px: `repeat(3, 1fr)`, `column-gap:22px`, `row-gap:28px`.
- ≤560px override: `column-gap:10px`, `row-gap:18px` (tighter on phones).
- **No padding** on the grid itself — `.bp-shell` already supplies the page gutters.

## 9. `.bp-tile` — [BMPage.css:108](BMPage.css#L108)

Each speaking category button.

- `padding: 0` — the tile is a positioning context, not a flow container. Every child is absolutely placed.
- `aspect-ratio: 1/1.05` keeps a near-square shape regardless of column width.
- `border-radius: 32px`, clean button without layered shadow effects.
- Color theme injected via `--base`, `--deep`, etc. — overridden per tile by the `.cat-*` classes (`.cat-kv`, `.cat-kvk`, `.cat-phonics`, `.cat-numbers`, `.cat-objects`).

### Children of `.bp-tile` (all absolutely positioned — no margin used)

| Child | Positioning | Notes |
|---|---|---|
| `.bp-tile-num` ([css:222](BMPage.css#L222)) | `top:14px; left:14px` | 38×38 white circle badge (1–5). Mobile: 32×32. |
| `.bp-spark` ×3 ([css:254](BMPage.css#L254)) | inline `top/left/right/bottom` % | Hidden until `:hover`. |
| `.bp-illo` ([css:234](BMPage.css#L234)) | `top:14%; left:0; right:0; bottom:30%` | Reserves the upper-middle band of the tile for the SVG illustration. Mobile: `top:16%; bottom:45%` (increased bottom spacing for mobile to prevent overlap with caption). Includes floating SVG elements (`.float-a`, `.float-b`, `.float-c`, `.wobble`). |
| `.bp-plate` ([css:261](BMPage.css#L261)) | `bottom:14px; left:14px; right:14px` | White caption pill at the bottom. |

### `.bp-plate` internal spacing

- `padding: 12px 16px` → vertical-tight, horizontal-roomy pill.
- `gap: 8px` between `.bp-plate-title` text and the `.bp-go` arrow circle.
- `.bp-go` is 36×36 (mobile 32×32) with `flex-shrink:0` so the title never squashes it.
- Mobile (`≤560px`): `padding: 10px 12px`, `border-radius: 18px`, font drops to `.98rem`.

## 10. `.bp-hint` — [BMPage.css:286](BMPage.css#L286)

The "✨ Coming soon ✨" footer line under the grid.

- `margin-top: 26px` → clear separation from the last row of tiles (bigger than the grid's row-gap to feel like a different section).
- `gap: 8px` between the two SVG stars and the italic text.
- No bottom margin — followed by `.bm-howto` section.

## 11. `.bm-howto` — [BMPage.css:271](BMPage.css#L271)

The "How to Play" instructions section specific to BMPage.

- `margin-top: 18px` → separation from the hint above.
- `background: #fff; border-radius: 24px; padding: 20px` → white card with subtle shadow.
- `.bm-howto-title` displays the section heading with icon and `margin: 0 0 14px`.
- `.bm-howto-steps` uses `grid-template-columns: repeat(3, 1fr); gap: 14px` on desktop; mobile override at [≤560px](BMPage.css#L294) changes to `grid-template-columns: 1fr` (single column).
- `.bm-howto-step` is a flex pill with `padding: 14px`, `background: #FFF8EB`, border, and centered step number.
- `.bm-step-num` is a 36×36 gradient circle with `flex-shrink:0`.
- No bottom margin — `.bp-shell`'s `padding-bottom:80px` provides the page-end air.

---

## Spacing philosophy summary

1. **One owner per gutter.** `.bp-shell` owns the side/page gutters; child components never re-add side padding.
2. **Margins for flow, padding for containment.** `.bp-hero`, `.bp-section-label`, `.bp-grid`, `.bp-hint`, `.bm-howto` use vertical `margin` to space themselves. Internal pills like `.bp-plate` and `.bm-howto-step` use `padding` to size their content.
3. **Tile interior uses absolute positioning, not margin.** Every child of `.bp-tile` is pinned with `top/left/right/bottom`, so spacing stays consistent across the 5 differently-themed tiles regardless of content length.
4. **Generous bottom padding (80px on `.bp-shell`)** specifically clears the mobile bottom-nav bar — a known constraint from the global layout.
5. **Mobile tightens the gutters and pill sizes** at the `≤560px` breakpoint but keeps the 80px bottom clearance and the vertical rhythm intact.
6. **BMPage extends the base pattern** with a dedicated "How to Play" instructional card after the hint, maintaining the same card styling (white background, rounded border, step indicators) as the rest of the page.
