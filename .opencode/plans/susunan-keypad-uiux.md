# Susunan Keypad UI/UX Redesign

**Target:** `SusunanKeypadContent` in `explorePrimitives.jsx` (lines 1836-1922)  
**Affects:** Bilang menurun, Bilang menaik, Tulis nombor di antara, Tulis nombor sebelum/selepas  
**Does NOT affect:** Confetti or sounds (kept from `MatematikActivityFrame`)

---

## Change 1 — Number Boxes (colorful `displayParts`)

Replace the current number-box rendering with HTML-inspired colorful boxes.

| State | Before | After |
|-------|--------|-------|
| Normal number | White bg, grey border | Colorful bg (shuffled from red/orange/yellow/green/blue/purple/pink), `border-bottom: 4px` solid darker shade, white text, `rounded-2xl` |
| Gap (unanswered) | Amber border, light yellow bg | Dashed grey border, `#E5E7EB` bg, `?` text in grey |
| Gap (correct) | Green border, green tint bg | Solid green bg, white text, `.bounce` animation (translateY -20px) |
| Gap (wrong) | Red border, red tint bg | Solid red bg, white text, `.shake` animation (translateX ±10px) |

**New behavior:**
- `hover: translateY(-5px)` on all boxes
- `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)` on all boxes

### CSS keyframes (inline `<style>` in return):

```css
@keyframes snkBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}
@keyframes snkShake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}
```

### Color palette for boxes:
```js
const BOX_COLORS = [
  { bg: '#F87171', border: '#DC2626' },  // red
  { bg: '#FB923C', border: '#EA580C' },  // orange
  { bg: '#FBBF24', border: '#D97706' },  // yellow (dark text)
  { bg: '#34D399', border: '#059669' },  // green
  { bg: '#60A5FA', border: '#2563EB' },  // blue
  { bg: '#A78BFA', border: '#7C3AED' },  // purple
  { bg: '#F472B6', border: '#DB2777' },  // pink
];
```

---

## Change 2 — Input Display

Add `boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.06)'` and `background: '#F9FAFB'` for the inset shadow look from the HTML.

---

## Change 3 — Keypad Buttons

| State | Before | After |
|-------|--------|-------|
| Digit (1-9, 0) | White bg, grey border, grey text | **Blue** bg `#3B82F6`, **4px darker border-bottom** `#2563EB`, white text, `rounded-xl`, `active:translateY(4px)` |
| Clear (⌫) | Same as digits | **Red** bg `#EF4444`, border `#DC2626` |
| Submit (✓) | Green bg, no border | **Green** bg `#22C55E`, border `#16A34A` |

**Disabled submit:** grey bg `#E5E7EB`, no border-bottom.

### Keypad button base style:
```js
{
  minHeight: 'clamp(44px, 8vmin, 64px)',
  border: 'none',
  borderBottom: '4px solid ${darkerShade}',
  borderRadius: 'clamp(12px, 1.6vmin, 16px)',
  fontFamily: "'Baloo 2', sans-serif",
  fontWeight: 800,
  fontSize: 'clamp(20px, 3.4vmin, 30px)',
  cursor: 'pointer',
  color: '#fff',
  WebkitTapHighlightColor: 'transparent',
  transition: 'all .08s ease',
  // Active (pressed) effect handled via :active pseudo-class via <style> tag
}
```

### Active state (via inline `<style>`):
```css
.snk-kp-btn:active {
  transform: translateY(4px);
  border-bottom-width: 0;
}
```

---

## Files Changed

**Only:** `src/components/MatematikPage/_shared/explorePrimitives.jsx`  
**Scope:** `SusunanKeypadContent` function block (lines 1836-1922)

---

## Testing

- `npm run build` — must compile without errors
- Check that number boxes render with colors on sequence questions
- Check that gap box gets dashed border before answering
- Check correct answer fills gap with green + bounce
- Check wrong answer shows shake + red
- Check keypad buttons have blue/red/green colors with bottom border
