# Susunan Nombor Fix

## Issue 1: Sambung titik logic inverted

**Bug:** Dot 1 must be clicked first to start → user clicks dot 2 to connect 1→2.  
**Desired:** Dot 1 auto-selected. User clicks dot 2 to connect 1→2, then dot 3 to connect 2→3, etc.

### Change: `explorePrimitives.jsx` — SambungTitikContent

**Line ~1920:** `useState([])` → `useState([0])`  
**Line ~1926:** `setConnected([])` → `setConnected([0])`  

This pre-selects dot 1 so `nextIdx` starts at 1. All other logic (dot highlighting, wrong-click check, done detection) works correctly since it's all based on `nextIdx`.

## Issue 2: Jiran questions need number boxes

**Bug:** `98 , __ , 100` is rendered as plain text.  
**Desired:** Each element in a box (same as Bilang menurun).

### Change: `explorePrimitives.jsx` — `genJiran()`

Add `displayParts` array to the return object for all three variants:

| Variant | displayParts |
|---------|-------------|
| sebelum | `[{value:'?', isGap:true}, {value: String(n), isGap:false}]` |
| selepas | `[{value: String(n), isGap:false}, {value:'?', isGap:true}]` |
| di-antara | `[{value: String(mid-1), isGap:false}, {value:'?', isGap:true}, {value: String(mid+1), isGap:false}]` |

**No rendering change needed** — `SusunanKeypadContent` already checks `q.displayParts` and renders boxes when present.
