# Sambung Titik UI/UX Redesign

**Target:** `explorePrimitives.jsx` — `DOT_SHAPES`, `genSambungTitik()`, `SambungTitikContent`  
**Keep:** Confetti + sounds from `MatematikActivityFrame`, "✅ Hebat! Lengkap" text

---

## Change 1 — Shapes (replace `DOT_SHAPES`)

3 shapes total. "Mahkota" uses current house points. Each has `color` + `fillColor`.

**Bintang** (color: `#EC4899` / pink):
```js
{ name: 'bintang', label: 'Bintang', color: '#EC4899', fillColor: 'rgba(236,72,153,0.15)',
  pts: [{x:50,y:15},{x:61,y:38},{x:86,y:40},{x:68,y:58},{x:73,y:83},
        {x:50,y:72},{x:27,y:83},{x:32,y:58},{x:14,y:40},{x:39,y:38}] }
```

**Hati** (color: `#F43F5E` / rose):
```js
{ name: 'hati', label: 'Hati', color: '#F43F5E', fillColor: 'rgba(244,63,94,0.15)',
  pts: [{x:50,y:32},{x:35,y:18},{x:18,y:28},{x:15,y:48},{x:30,y:69},
        {x:50,y:88},{x:70,y:69},{x:85,y:48},{x:82,y:28},{x:65,y:18}] }
```

**Mahkota** (color: `#EAB308` / amber — uses current house points, 9 dots):
```js
{ name: 'mahkota', label: 'Mahkota', color: '#EAB308', fillColor: 'rgba(234,179,8,0.15)',
  pts: [{x:50,y:6},{x:5,y:42},{x:5,y:96},{x:35,y:96},{x:35,y:70},
        {x:65,y:70},{x:65,y:96},{x:95,y:96},{x:95,y:42}] }
```

---

## Change 2 — `genSambungTitik()` 

Include `color` + `fillColor` from the picked shape in the returned object.

---

## Change 3 — `SambungTitikContent` visual overhaul

### Dot styling (per dot state):

| State | Fill | Stroke | Text |
|-------|------|--------|------|
| Completed | `shape.color` | `#fff` 3px | `shape.color`, 10px |
| Target (next) | `#fff` | `shape.color` 4px + glow ring | `#0f172a`, 19px |
| Future | `#F1F5F9` | `#CBD5E1` 3px | `#64748B`, 10px |
| Wrong | `#DC2626` | `#DC2626` | `#DC2626` |

### Target glow:
- CSS `@keyframes sndPulse`: scale 1 ↔ 1.25  
- Semi-transparent circle behind target dot with pulse animation

### Number label positioning (smart offset):
- Calculate shape center: `cx = (minX+maxX)/2`, `cy = (minY+maxY)/2`  
- For each dot: `dx = pt.x - cx`, `dy = pt.y - cy`, normalize, offset label by `dx*0.3, dy*0.3`

### Connected lines:
- `stroke={shape.color}`, `strokeWidth="6"`, rounded caps, rounded join

### Closing line (NEW — user request):
- When `done`, draw line from **last point** `pts[pts.length-1]` back to **first point** `pts[0]`
- This closes the house (mahkota) shape — dot 9 → dot 1

### Shape fill on completion:
- `<polygon>` over all connected dots with `fill={shape.fillColor}`

### Remove:
- Waving animation (replaced by glow pulse)

---

## Files Changed

**Only:** `src/components/MatematikPage/_shared/explorePrimitives.jsx`  

---

## Testing

- `npm run build` — must compile
- Mahkota renders as house shape with 9 dots
- On completion, line draws from dot 9 back to dot 1, closing the house
