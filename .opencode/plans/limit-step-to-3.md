# Limit number gap (step) to max 3

**File:** `explorePrimitives.jsx`  
**Function:** `genLengkapkanUrutan()`  
**Line:** ~1708

**Change:**
```js
// Before:
const step = pick([1, 2, 4, 5, 10]);

// After:
const step = pick([1, 2, 3]);
```

**Effect:** Bilang menurun / Bilang menaik / Tulis nombor di antara will only have counting steps of 1, 2, or 3. The gap between any two adjacent visible numbers will be at most 3.
