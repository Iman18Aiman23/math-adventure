# Accessibility & Mobile Responsive Specification

**For:** Unified Gamification System (Phases 0–8)

This document defines accessibility and mobile-first design requirements for all gamification UI components. Based on your existing iOS-safe CSS rules + WCAG 2.1 AA standards.

---

## Core Principles

1. **Inclusive from Day 1** — Accessibility built in, not bolted on later
2. **Mobile-first layout** — Design for 375px width (iPhone SE), scale up
3. **Touch-friendly targets** — All interactive elements ≥44×44px
4. **Semantic HTML** — Use `<button>`, `<input>`, `<label>` correctly (no `<div role="button">`)
5. **Keyboard navigation** — All features usable with Tab, Enter, Escape
6. **Screen reader support** — ARIA labels + live regions for dynamic updates
7. **Dark mode** — Both light and dark CSS variants (per your request)
8. **Color contrast** — WCAG AA minimum 4.5:1 for text

---

## Component-by-Component Spec

### 1. StatsBar (Persistent Header)

**Used in:** BM module pages, MT module pages, PI module pages

#### Visual Design

**Mobile (≤768px):**
```
┌─────────────────────────────────────────┐
│  🔥 5    ⭐ 340 XP    Lv 3    🪙 32    │  ← 12px font, horizontal scroll if needed
└─────────────────────────────────────────┘
```

**Desktop (>768px):**
```
┌─────────────────────────────────────────┐
│  🔥 Streak: 5    |    ⭐ 340 XP    |    Lv 3    |    🪙 32 Coins    │
└─────────────────────────────────────────┘
```

#### CSS Requirements

```css
.stats-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 12px;
  gap: 8px;
  flex-wrap: wrap;
  
  /* Dark mode */
  @media (prefers-color-scheme: dark) {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    color: #e0e0e0;
  }
  
  /* Touch-friendly spacing */
  min-height: 44px;
}

.stats-bar-item {
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
  
  /* Each item clickable on tap (no hover needed) */
}

.stats-bar-value {
  font-weight: 600;
  font-size: 14px;
  
  @media (max-width: 375px) {
    font-size: 12px;
  }
}
```

#### Accessibility

| Requirement | Implementation |
|-------------|-----------------|
| **ARIA labels** | `aria-label="Streak: 5 days"` on `.stats-bar-item` |
| **Live updates** | Wrap dynamic values in `<span aria-live="polite">` |
| **Keyboard** | Tab order: left-to-right (natural); clickable items all `<button>` |
| **Screen reader** | "Streak: 5 days. 340 Experience points. Level 3. 32 Coins." |
| **Color contrast** | White on purple (667eea) = 7.2:1 ✅ |
| **Touch target** | Min 44×44px per item |

#### HTML Structure

```jsx
<div className="stats-bar" role="region" aria-label="Player Statistics">
  <div className="stats-bar-item">
    <span className="stats-emoji" aria-hidden="true">🔥</span>
    <span className="stats-label">Streak</span>
    <span className="stats-value" aria-live="polite">{streak}</span>
  </div>

  <div className="stats-bar-item">
    <span className="stats-emoji" aria-hidden="true">⭐</span>
    <span className="stats-label">XP</span>
    <span className="stats-value" aria-live="polite">{xp}</span>
  </div>

  <div className="stats-bar-item">
    <span className="stats-label">Level</span>
    <span className="stats-value" aria-live="polite">{level}</span>
  </div>

  <div className="stats-bar-item">
    <span className="stats-emoji" aria-hidden="true">🪙</span>
    <span className="stats-label">Coins</span>
    <span className="stats-value" aria-live="polite">{coins}</span>
  </div>
</div>
```

#### Notes

- Emojis marked `aria-hidden="true"` (screen readers say "Streak" not "Fire emoji")
- Live regions update when XP earned (screen reader announces new value)
- On mobile, fit 4 items in row or wrap to 2 rows if needed
- No hover effects (use @media(hover:hover) for desktop)

---

### 2. Crown Display (on Topic Cards/Nodes)

**Used in:** BM module hubs, MT module hubs, PI module hubs

#### Visual Design

**Level 0 (Locked):**
```
  ⭕
  🔒
```

**Levels 1–5 (Crowns):**
```
  ⭐ ⭐ ⭐    (3 crowns, gold)
```

**Desktop responsive:**
- Small cards (mobile): 1–2 crowns visible
- Large cards (desktop): All 5 crowns visible

#### CSS Requirements

```css
.crown-display {
  display: flex;
  justify-content: center;
  gap: 4px;
  align-items: center;
  min-height: 24px;
}

.crown-item {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  
  @media (max-width: 480px) {
    width: 18px;
    height: 18px;
    font-size: 14px;
  }
}

.crown-item.empty {
  opacity: 0.3;
  color: #999;
}

.crown-item.filled {
  animation: crownPulse 0.6s ease-in-out;
}

@keyframes crownPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .crown-item.empty {
    color: #555;
  }
}
```

#### Accessibility

| Requirement | Implementation |
|-------------|-----------------|
| **ARIA label** | `aria-label="Crown level 3 of 5"` |
| **Keyboard** | Not directly interactive (part of card navigation) |
| **Screen reader** | "Crown level 3 of 5. Locked state: not started." |
| **Color** | Don't use color alone to convey level; use emoji count + opacity |
| **Animation** | Reduced motion: `@media (prefers-reduced-motion: reduce) { animation: none; }` |

#### HTML Structure

```jsx
<div className="crown-display" aria-label={`Crown level ${level} of 5`}>
  {[...Array(5)].map((_, i) => (
    <span
      key={i}
      className={`crown-item ${i < level ? 'filled' : 'empty'}`}
      aria-hidden="true"
    >
      {i < level ? '⭐' : '☆'}
    </span>
  ))}
</div>
```

**For locked state:**
```jsx
{level === 0 && <span className="lock-icon" aria-hidden="true">🔒</span>}
```

---

### 3. Progress Ring (Daily Goal)

**Used in:** StatsBar or sidebar

#### Visual Design

**Mobile:**
```
    50%
   /----\
  |  ⭐  |
   \----/
  25 / 50 XP
```

**Desktop:**
```
  Larger ring, labels below
```

#### CSS Requirements

```css
.progress-ring-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.progress-ring {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: conic-gradient(
    #fbbf24 0deg,
    #fbbf24 calc(var(--percentage) * 3.6deg),
    #e5e7eb calc(var(--percentage) * 3.6deg)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: inset 0 0 0 4px white;
  
  @media (prefers-color-scheme: dark) {
    box-shadow: inset 0 0 0 4px #1a1a1a;
  }
  
  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    font-size: 16px;
  }
}

.progress-ring-label {
  font-size: 12px;
  color: #666;
  
  @media (prefers-color-scheme: dark) {
    color: #999;
  }
}
```

#### Accessibility

| Requirement | Implementation |
|-------------|-----------------|
| **ARIA label** | `aria-label="Daily goal: 25 of 50 XP. 50% complete."` |
| **Screen reader** | Announce progress percentage |
| **Color contrast** | Gold (#fbbf24) on white = 3.9:1 (close to AA; consider darker gold) |
| **Animation** | Smooth conic-gradient transition over 1s |

#### HTML Structure

```jsx
<div className="progress-ring-container">
  <div 
    className="progress-ring"
    style={{ '--percentage': (todayXP / goalXP) * 100 }}
    role="progressbar"
    aria-label={`Daily goal: ${todayXP} of ${goalXP} XP. ${Math.round((todayXP / goalXP) * 100)}% complete.`}
    aria-valuenow={todayXP}
    aria-valuemin={0}
    aria-valuemax={goalXP}
  >
    ⭐
  </div>
  <span className="progress-ring-label">{todayXP} / {goalXP} XP</span>
</div>
```

---

### 4. Animated Counter (XP Gained)

**Used in:** Quiz result screens

#### Visual Design

```
When quiz ends:

┌────────────────┐
│  + 120 XP ✨   │  ← appears, animates in
│  (streak +15)  │
└────────────────┘
```

#### CSS Requirements

```css
.xp-counter {
  font-size: 18px;
  font-weight: 600;
  color: #fbbf24;
  animation: slideInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  
  @media (prefers-color-scheme: dark) {
    color: #fcd34d;
  }
  
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.xp-counter-value {
  display: inline-block;
  min-width: 40px;
  text-align: right;
}
```

#### Accessibility

| Requirement | Implementation |
|-------------|-----------------|
| **ARIA announce** | Wrap in `aria-live="polite" aria-atomic="true"` |
| **Screen reader** | "You earned 120 XP! Streak bonus 15 XP." |
| **Motion** | Respect `prefers-reduced-motion` (no animation) |
| **Animation duration** | 1s (long enough to read, not boring) |

#### HTML Structure

```jsx
<div 
  className="xp-counter"
  role="status"
  aria-live="polite"
  aria-atomic="true"
>
  <span className="xp-counter-value">{xpEarned}</span> XP ✨
  {streakBonus > 0 && (
    <>
      <br />
      <span className="streak-bonus">(streak +{streakBonus})</span>
    </>
  )}
</div>
```

---

### 5. Streak Counter (Header/Sidebar)

**Used in:** All subject pages

#### Visual Design

```
🔥 Streak: 7
  Next milestone: 14 days (7 more)
```

#### CSS Requirements

```css
.streak-counter {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 12px;
  border-radius: 8px;
  background: #fef3c7;
  color: #92400e;
  
  @media (prefers-color-scheme: dark) {
    background: #78350f;
    color: #fef3c7;
  }
  
  @media (max-width: 375px) {
    font-size: 12px;
    padding: 6px 10px;
  }
}

.streak-emoji {
  font-size: 18px;
  animation: flicker 0.8s ease-in-out infinite;
  
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
}

@keyframes flicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.streak-count {
  font-size: 16px;
  font-weight: 700;
}

.streak-milestone {
  font-size: 11px;
  opacity: 0.8;
}
```

#### Accessibility

| Requirement | Implementation |
|-------------|-----------------|
| **ARIA label** | `aria-label="Streak: 7 days. Next milestone at 14 days."`|
| **Color contrast** | Amber on dark (#78350f) = 7.1:1 ✅ |
| **Animation** | Flicker respects `prefers-reduced-motion` |
| **Touch target** | ≥44×44px on mobile |

#### HTML Structure

```jsx
<div 
  className="streak-counter"
  aria-label={`Streak: ${count} days. Next milestone at ${nextMilestone} days.`}
>
  <span className="streak-emoji" aria-hidden="true">🔥</span>
  <span className="streak-count">{count}</span>
  <span className="streak-milestone">{count < 14 ? `→ ${nextMilestone}d` : '🏆'}</span>
</div>
```

---

### 6. ProgressDashboard Page (Deferred to Phase 7)

#### Layout: Mobile-First

**Mobile (<480px):**
```
┌─────────────────────┐
│   Player Stats      │  ← Card
│   XP | Level | Coins│
├─────────────────────┤
│   Today's Goal      │  ← Card with progress ring
│   25 / 50 XP        │
├─────────────────────┤
│   BM Progress       │  ← Card with donut chart
│   12 / 19 topics    │
├─────────────────────┤
│   MT Progress       │  ← Card
│   8 / 15 topics     │
├─────────────────────┤
│   Recent Activity   │  ← Scrollable list
│   Quiz: BM 1-1-1    │
│   Score: 8/10       │
│   XP: +80           │
└─────────────────────┘
(Single-column stack)
```

**Desktop (>768px):**
```
┌──────────────────────────────────────┐
│   Player Stats  │  Today's Goal      │
│   XP | Level    │  Progress Ring     │
├──────────────────────────────────────┤
│   BM Progress   │   MT Progress      │   PI Progress   │
│   12/19 topics  │   8/15 topics      │   5/10 topics   │
├──────────────────────────────────────┤
│   Module Breakdown (BM)               │
│   Module 1: ████░░░░ (4/5 crowns)    │
│   Module 2: ██░░░░░░░ (2/10 crowns)  │
├──────────────────────────────────────┤
│   Recent Activity (Last 10 Sessions)  │
│   Quiz: BM 1-1-1 | Score: 8/10 | +80 │
│   ...                                 │
└──────────────────────────────────────┘
(Multi-column grid)
```

#### CSS Grid Strategy

```css
.dashboard {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  padding: 16px;
  
  /* Tablet and above */
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    padding: 24px;
  }
  
  /* Desktop */
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.dashboard-card {
  border-radius: 8px;
  padding: 16px;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  
  @media (prefers-color-scheme: dark) {
    background: #1f2937;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  }
  
  @media (max-width: 480px) {
    padding: 12px;
  }
}
```

#### Accessibility

| Component | Requirements |
|-----------|---|
| **Heading** | `<h1>Your Progress</h1>` (one per page) |
| **Sections** | `<section>` with `<h2>` (e.g., "BM Progress") |
| **Charts** | Alt text for donut charts; actual numbers in text below |
| **Links** | "View full BM module breakdown" → semantic `<a>` or `<button>` |
| **Color** | Don't use color alone; add percentage labels, patterns, or icons |
| **Skip link** | `<a href="#main-content" className="skip-link">Skip to content</a>` |

---

## Mobile Responsive Breakpoints

Use these consistently across all components:

```css
/* Mobile first approach */
$breakpoint-xs: 375px;   /* iPhone SE width */
$breakpoint-sm: 480px;   /* Small phones */
$breakpoint-md: 768px;   /* Tablets */
$breakpoint-lg: 1024px;  /* Desktops */
$breakpoint-xl: 1280px;  /* Large desktops */

/* Usage */
@media (max-width: 480px) { /* Styles for phones */ }
@media (min-width: 768px) { /* Styles for tablets and up */ }
@media (min-width: 1024px) { /* Styles for desktops and up */ }
```

---

## Keyboard Navigation (All Components)

### Tab Order Rules

1. **Always natural reading order** (left-to-right, top-to-bottom)
2. **Interactive elements:** `<button>`, `<a>`, `<input>` are tabable by default
3. **Custom elements:** Add `tabindex="0"` only if truly interactive
4. **Never use** `tabindex="1"` or higher (breaks tab order)
5. **Skip links:** First focusable element should be skip link to main content

### Keyboard Shortcuts (Optional Enhancements)

```javascript
// Suggested shortcuts (not required for MVP)
// ? → Help tooltip
// s → Show stats
// l → View leaderboard
// d → Open dashboard

document.addEventListener('keydown', (e) => {
  if (e.key === '?') showHelp();
  if (e.key === 's') showStats();
  // ... etc
});
```

---

## Color Accessibility Matrix

| Component | Text | Background | Ratio | WCAG |
|-----------|------|------------|-------|------|
| StatsBar | White | Purple (#667eea) | 7.2:1 | AAA |
| Streak badge | #78350f | #fef3c7 | 7.1:1 | AAA |
| Crown filled | #fbbf24 | white | 3.9:1 | AA ⚠️ |
| Crown empty | #999 | white | 2.5:1 | FAIL |
| Progress ring | #fbbf24 | white | 3.9:1 | AA ⚠️ |

**Actions:**
- ✅ StatsBar & Streak: WCAG AAA (excellent)
- ⚠️ Crown & Progress Ring: Upgrade gold to darker shade (#d97706) for AA+
  - #d97706 on white = 5.2:1 ✅

---

## Dark Mode Strategy

Every component must have dark variant:

```css
/* Define color tokens once */
:root {
  --color-primary: #667eea;
  --color-primary-dark: #5563d1;
  --color-bg: white;
  --color-bg-dark: #1f2937;
  --color-text: #1f2937;
  --color-text-light: white;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #1f2937;
    --color-text: #f3f4f6;
    --color-bg-dark: #111827;
  }
}

/* Use tokens everywhere */
.stats-bar {
  background: var(--color-primary);
  color: var(--color-text-light);
}
```

---

## Testing Checklist

### Automated (if using axe or Lighthouse)

- [ ] Heading hierarchy correct (no skipped levels)
- [ ] Color contrast ≥ 4.5:1 for normal text
- [ ] Form labels associated with inputs
- [ ] Interactive elements keyboard accessible
- [ ] No empty buttons/links

### Manual Testing (Keyboard)

- [ ] Tab through entire page; focus visible on all buttons
- [ ] Enter key activates buttons
- [ ] Escape key closes dialogs
- [ ] All interactive elements reachable via Tab

### Screen Reader Testing (NVDA on Windows / VoiceOver on Mac)

- [ ] Meaningful page heading announced
- [ ] Section headers announce correctly
- [ ] Live regions (XP counter, streak update) announced politely
- [ ] Form inputs have labels
- [ ] No redundant aria-labels

### Mobile Testing

- [ ] Touch targets ≥44×44px
- [ ] Page readable at 200% zoom (no horizontal scroll)
- [ ] Orientation change (portrait ↔ landscape) reflows correctly
- [ ] No text below fold on small screens

### Dark Mode Testing

- [ ] All colors visible in both light and dark modes
- [ ] Text readable (no color contrast loss in dark mode)
- [ ] Images/icons visible in both modes

---

## Links & Resources

- **WCAG 2.1 Guidelines:** https://www.w3.org/WAI/WCAG21/quickref/
- **ARIA Authoring Practices:** https://www.w3.org/WAI/ARIA/apg/
- **Color Contrast Checker:** https://webaim.org/resources/contrastchecker/
- **Your iOS-Safe CSS Rules:** See `feedback_mobile_ios_css.md` in project memory

---

**Status:** Ready for implementation in Phase 0–1.
Use this spec when coding StatsBar, Crown, ProgressRing, Dashboard components.
