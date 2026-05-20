# ReadingPage.jsx — UI/UX Layout Breakdown

The root element at [ReadingPage.jsx:235](ReadingPage.jsx#L235) is the page-level flex column that lives inside `.app-container`. This document describes the layout, top → bottom, with the spacing logic for each piece.

---

## Component tree

```
.app-container
└── <div flex column, flex:1, overflow:hidden>   ← root wrapper (line 235)
    ├── <AppHeader>                              ← fixed-height top bar
    └── <div flex:1, overflowY:auto>             ← scroll viewport
        └── .rp-body                             ← gradient background canvas
            └── .rp-shell                        ← centered content column (max 980px)
                ├── .rp-hero
                │   ├── .rp-hero-emoji-wrap
                │   │   └── .rp-hero-emoji  (icon)
                │   └── .rp-hero-sub
                ├── .rp-section-label            ← "Choose Level"
                ├── .rp-grid                     ← 2-col (≥760px: 3-col)
                │   └── .rp-tile  ×4
                │       ├── .rp-tile-num
                │       ├── .rp-spark  ×3
                │       ├── .rp-illo  (SVG)
                │       └── .rp-cap
                │           ├── .rp-cap-title
                │           └── .rp-cap-go
                └── .rp-hint
```

---

## 1. Root wrapper — [ReadingPage.jsx:235](ReadingPage.jsx#L235)

Inline-styled `flex column` with `flex:1` and `overflow:hidden`. **No padding, no margin** — it fills `.app-container` exactly. Its job is purely structural: pin the header at the top and give the body a scrollable region below it.

## 2. AppHeader — [ReadingPage.jsx:237](ReadingPage.jsx#L237)

Imported component (back button + score/coins). It owns its own internal padding. It sits flush against the top edge of `.app-container` — no margin around it here, because the parent is a flex column with no `gap`.

## 3. Scroll viewport — [ReadingPage.jsx:239](ReadingPage.jsx#L239)

`flex:1, overflowY:auto, position:relative`. Takes the remaining vertical space below the header. **No padding** here; the inner `.rp-shell` owns the gutters.

## 4. `.rp-body` — [ReadingPage.css:17](ReadingPage.css#L17)

Pure background layer (three radial gradients + cream base). `minHeight:100%` is set inline so the gradient covers the full scroll area even when content is short. No padding/margin of its own — it's a paint layer.

## 5. `.rp-shell` — [ReadingPage.css:35](ReadingPage.css#L35)

The **main content gutter**. This is where the page actually breathes.

- `max-width: 980px` + `margin: 0 auto` → centered column on wide screens.
- `padding: 14px 14px 80px` → 14px side gutters, 14px top, **80px bottom** to clear the mobile bottom-nav and give the last row of tiles air.
- `z-index: 2` (kept; harmless without `.rp-bg-deco`).
- Mobile override at [≤560px](ReadingPage.css#L294): `padding: 10px 10px 80px` (tighter side gutters, bottom kept at 80px).

## 6. `.rp-hero` — [ReadingPage.css:46](ReadingPage.css#L46)

The hero icon block with a bouncing emoji/SVG and the subtitle.

- `padding: 10px 8px 4px` → tiny inner cushion; the wrap below is what controls vertical size.
- `margin-bottom: 6px` → minimal gap because the `.rp-section-label` below has its own large `margin: 18px 0`.
- `.rp-hero-emoji-wrap` has a **fixed `height:130px`** — it reserves vertical space so the bouncing icon animation doesn't push later content around.
- `.rp-hero-emoji` runs the `rp-bounce` keyframe (gentle vertical bob) and projects a radial `::before` glow halo behind the icon.
- `.rp-hero-sub` uses `margin: 6px auto 0` + `max-width: 520px` to keep the subtitle line short and readable, with `gap:8px` between text and the trailing star SVG.

## 7. `.rp-section-label` — [ReadingPage.css:87](ReadingPage.css#L87)

"PILIH TAHAP / CHOOSE LEVEL" divider.

- `margin: 18px 0` → equal breathing room above (separating from hero) and below (separating from grid). This is the **primary vertical rhythm** between hero and grid; the hero deliberately uses small margins so this label owns the space.
- `gap: 14px` between the text and its flanking gradient lines (drawn via `::before` / `::after`).

## 8. `.rp-grid` — [ReadingPage.css:99](ReadingPage.css#L99)

The tile grid (4 tiles across all breakpoints, orphaned 4th centered on mobile).

- Mobile: `repeat(2, 1fr)`, `column-gap:14px`, `row-gap:22px` (rows taller than columns — gives tiles vertical breathing room without wasting horizontal space).
- ≥760px: `repeat(3, 1fr)`, `column-gap:22px`, `row-gap:28px`.
- ≤560px override: `column-gap:10px`, `row-gap:18px` (tighter on phones).
- **No padding** on the grid itself — `.rp-shell` already supplies the page gutters.

## 9. `.rp-tile` — [ReadingPage.css:108](ReadingPage.css#L108)

Each reading level button.

- `padding: 0` — the tile is a positioning context, not a flow container. Every child is absolutely placed.
- `aspect-ratio: 1/1.05` keeps a near-square shape regardless of column width.
- `border-radius: 32px`, clean button without layered shadow effects.
- Color theme injected via `--base`, `--deep`, etc. — overridden per tile by the `.t-*` classes.

### Children of `.rp-tile` (all absolutely positioned — no margin used)

| Child | Positioning | Notes |
|---|---|---|
| `.rp-tile-num` ([css:222](ReadingPage.css#L222)) | `top:14px; left:14px` | 38×38 white circle badge (1–4). Mobile: 32×32. |
| `.rp-spark` ×3 ([css:254](ReadingPage.css#L254)) | inline `top/left/right/bottom` % | Hidden until `:hover`. |
| `.rp-illo` ([css:234](ReadingPage.css#L234)) | `top:14%; left:0; right:0; bottom:30%` | Reserves the upper-middle band of the tile for the SVG illustration. Mobile: `top:16%; bottom:45%` (increased bottom spacing for mobile to prevent overlap with caption). |
| `.rp-cap` ([css:261](ReadingPage.css#L261)) | `bottom:14px; left:14px; right:14px` | White caption pill at the bottom. |

### `.rp-cap` internal spacing

- `padding: 12px 16px` → vertical-tight, horizontal-roomy pill.
- `gap: 8px` between `.rp-cap-title` text and the `.rp-cap-go` arrow circle.
- `.rp-cap-go` is 36×36 (mobile 32×32) with `flex-shrink:0` so the title never squashes it.
- Mobile (`≤560px`): `padding: 10px 12px`, `border-radius: 18px`, font drops to `.98rem`.

## 10. `.rp-hint` — [ReadingPage.css:286](ReadingPage.css#L286)

The "✨ Coming soon ✨" footer line under the grid.

- `margin-top: 26px` → clear separation from the last row of tiles (bigger than the grid's row-gap to feel like a different section).
- `gap: 8px` between the two SVG stars and the italic text.
- No bottom margin — `.rp-shell`'s `padding-bottom:80px` provides the page-end air.

---

## Spacing philosophy summary

1. **One owner per gutter.** `.rp-shell` owns the side/page gutters; child components never re-add side padding.
2. **Margins for flow, padding for containment.** `.rp-hero`, `.rp-section-label`, `.rp-grid`, `.rp-hint` use vertical `margin` to space themselves. Internal pills like `.rp-cap` use `padding` to size their content.
3. **Tile interior uses absolute positioning, not margin.** Every child of `.rp-tile` is pinned with `top/left/right/bottom`, so spacing stays consistent across the differently-themed tiles regardless of content length.
4. **Generous bottom padding (80px on `.rp-shell`)** specifically clears the mobile bottom-nav bar — a known constraint from the global layout.
5. **Mobile tightens the gutters and pill sizes** at the `≤560px` breakpoint but keeps the 80px bottom clearance and the vertical rhythm intact.
