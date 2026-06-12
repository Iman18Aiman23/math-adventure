# UI Mockups & Design Specifications

**For:** Unified Gamification System Components

This document provides ASCII mockups, design rationale, and detailed specifications for all new UI components in Phases 1, 2, 3, 5, and 7 (deferred).

---

## 1. StatsBar (Persistent Header)

### Purpose
Display player XP, level, streak, and coins at a glance. Always visible during gameplay.

### Placement
- **Phase 1 (temp):** At top of each quiz/game result screen
- **Phase 7 (final):** Persistent bar above main content in all subject pages

### Mobile Layout (375px)

```
┌────────────────────────────────────────┐
│ 🔥5    ⭐340    Lv3    🪙32           │
│ Streak  XP      Level  Coins           │
└────────────────────────────────────────┘
```

**Height:** 60px (includes label + value)
**Gap:** 8px between items
**Font:** 12px label, 14px value (bold)

### Tablet Layout (768px)

```
┌────────────────────────────────────────┐
│ 🔥 Streak: 5  |  ⭐ 340 XP  |  Lv 3  |  🪙 32  │
└────────────────────────────────────────┘
```

**Height:** 44px
**Font:** 12px label (light gray), 16px value (white, bold)
**Gap:** 16px between groups
**Separator:** 1px vertical line (opacity 0.3)

### Desktop Layout (1024px+)

```
┌─────────────────────────────────────────────┐
│ 🔥 Streak: 5 days  |  ⭐ 340 XP  |  Level 3  |  🪙 32 Coins │
└─────────────────────────────────────────────┘
```

**Height:** 48px
**Font:** 14px label, 18px value
**Background:** `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
**Text:** White, anti-aliased
**Radius:** 8px (optional rounded corners on card variant)

### States

**Default (in-game):**
- All values visible, no animation
- Streak fire emoji flickers slightly (0.8s loop)

**After XP earned:**
```
┌────────────────────────────────────────┐
│ 🔥5    ⭐ 340 ➜ 350 (↑10)    Lv3    🪙33 │  ← animated transition
└────────────────────────────────────────┘
```

**Design Notes:**
- Emoji colors are semantic (fire = red intent, star = reward, coin = currency)
- No shadows on light backgrounds (keep flat per your design system)
- Touch targets: ensure each stat item ≥44×44px on mobile

### CSS Variables

```css
:root {
  --stats-bar-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --stats-bar-height-mobile: 60px;
  --stats-bar-height-desktop: 48px;
  --stats-bar-padding: 12px;
  --stats-bar-gap: 8px;
  --stats-value-color: white;
  --stats-label-color: rgba(255, 255, 255, 0.8);
}

@media (prefers-color-scheme: dark) {
  :root {
    --stats-bar-bg: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    --stats-value-color: #fef3c7;
  }
}
```

---

## 2. Crown Display (Topic Cards)

### Purpose
Show topic mastery level visually. Used on hub pages when selecting topics.

### Crown Levels

| Level | Visual | XP Required | Description |
|-------|--------|-------------|-------------|
| 0 | 🔒 | — | Locked / not started |
| 1 | ⭐ | ~25 | Bronze (started) |
| 2 | ⭐⭐ | ~40 | Silver (basic) |
| 3 | ⭐⭐⭐ | ~55 | Gold (proficient) |
| 4 | ⭐⭐⭐⭐ | ~75 | Emerald (advanced) |
| 5 | ⭐⭐⭐⭐⭐ ✨ | ~100 | Diamond (mastered) |

### Card Layout (Topic/Game Node)

**Mobile (≤480px):**
```
┌──────────────────┐
│    [Topic Name]  │
│   Nominative ...  │
│                  │
│   ⭐ ⭐ ☆ ☆ ☆  │  ← Crown level (3/5)
│                  │
│   6 XP • 3/4 ✓   │  ← XP earned, attempts
└──────────────────┘
Button height: 100px
Padding: 12px
Font: 14px name, 12px metadata
```

**Desktop (>768px):**
```
┌─────────────────────────────────────┐
│   Nominative (Tajuk 1)              │
│                                     │
│   ⭐ ⭐ ⭐ ☆ ☆                   │ ← Larger, easier to parse
│                                     │
│   60 XP earned • 3 attempts ✓       │
│   Best: 8/10  •  Last: Jun 10       │
└─────────────────────────────────────┘
Button height: 120px
Padding: 16px
Font: 16px name, 13px metadata
```

### Locked State (Level 0)

```
┌──────────────────┐
│  Nominative ...  │
│  (Locked)        │
│                  │
│      🔒          │  ← Lock icon centered
│  Prerequisite:   │
│  Complete "X"    │
└──────────────────┘
```

**Styling:**
- Background: grayscale or opacity 0.6
- Text color: gray (#999)
- Border: 1px dashed (#ccc)
- Cursor: not-allowed (no click)

### Mastered State (Level 5)

```
┌──────────────────┐
│  Nominative ...  │
│                  │
│  ⭐⭐⭐⭐⭐ ✨ │  ← Sparkle animation on level 5
│   MASTERED       │
│                  │
│   100 XP • 7 att │
└──────────────────┘
```

**Animation:** Sparkle emoji (✨) rotates/pulses on hover
**Badge:** Optional "MASTERED" label under crowns

### Detailed Metadata (Desktop Only)

```
┌──────────────────────────────────┐
│ Nominative (Tajuk 1)             │
│                                  │
│ ⭐ ⭐ ⭐ ☆ ☆                  │
│                                  │
│ Progress: 60 XP earned           │
│ Best Score: 8/10 (80%)           │
│ Attempts: 3                      │
│ Last Practiced: Jun 10, 2:30 PM  │
└──────────────────────────────────┘
```

**Font sizes:**
- Title: 16px bold
- Crowns: 20px
- Label: 12px gray
- Value: 13px black (dark mode: #f3f4f6)

### Interactive States

**Hover (desktop only):**
```
┌──────────────────┐
│ Nominative ...   │ ← Subtle shadow lift
│                  │
│ ⭐ ⭐ ⭐ ☆ ☆  │ ← Crowns glow/brighten
│                  │
│ 60 XP • 3 att    │ ← Cursor: pointer
└──────────────────┘
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15)
background: subtle lighten
```

**Active/Focused (keyboard):**
```
┌──────────────────┐
│ Nominative ...   │
│                  │
│ ⭐ ⭐ ⭐ ☆ ☆  │ ← Ring border: 2px #667eea
│                  │
│ 60 XP • 3 att    │
└──────────────────┘
outline: 2px solid #667eea
outline-offset: 4px
```

---

## 3. Animated XP Counter

### Purpose
Show XP earned at end of quiz/game. Reinforces reward loop.

### Animation Sequence

**0ms:** Hidden (opacity 0, translateY +20px)
**100ms:** Begin slide-in
**400ms:** Full visible (opacity 1, translateY 0)
**800ms:** Hold visible (user reads)
**1000ms:** End animation (stays visible for copy)

### Display Variations

**Positive gain:**
```
          + 120 XP ✨
        (streak +15)

          💫 LEVEL UP! 🎉
          You reached Level 5
```

**Exactly bonus (streak milestone):**
```
          + 100 XP 🔥
        STREAK 7 DAYS!
        Freeze token earned
```

**Daily goal met:**
```
          + 50 XP 🎯
        DAILY GOAL MET!
        Return tomorrow for bonus
```

### Mobile Layout (≤480px)

```
┌─────────────────────┐
│                     │
│   + 120 XP ✨       │  ← 16px font, center-aligned
│   Streak +15        │  ← 12px gray
│                     │
└─────────────────────┘
Width: 200px
```

### Desktop Layout (>768px)

```
┌──────────────────────────────┐
│                              │
│        + 120 XP ✨           │  ← 20px font
│     (You earned a streak!)   │  ← 14px gray
│                              │
└──────────────────────────────┘
Width: 300px
```

### CSS

```css
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

.xp-counter {
  animation: slideInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  color: #fbbf24;
  font-weight: 700;
  text-align: center;
  
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
  }
}

.xp-bonus {
  display: block;
  font-size: 12px;
  color: #666;
  margin-top: 4px;
  font-weight: 400;
  
  @media (prefers-color-scheme: dark) {
    color: #999;
  }
}
```

### Placement

**On Quiz Result Screen:**
- Above the "Next" / "Teruskan" button
- Centered
- Appears AFTER score is shown (not simultaneously)

---

## 4. Streak Counter (Sidebar / Header)

### Purpose
Show current streak and next milestone. Encourages daily return.

### Default State (Mobile)

```
🔥 5
Next: 14d
```

**Height:** 44px
**Width:** Min 80px
**Font:** 12px

### Default State (Desktop)

```
🔥 Streak: 5 days
→ Next milestone: 14 days
```

**Height:** 54px (2 lines)
**Font:** 12px label, 14px value

### States

**Active Streak (1–6 days):**
```
┌──────────────┐
│🔥 5 days    │
│→ 14 days    │  ← "14 days" in lighter gray
└──────────────┘
Background: amber gradient (#fef3c7)
Text: dark brown (#92400e)
Animation: Flicker on fire emoji (0.8s loop)
```

**Milestone Reached (7+ days):**
```
┌──────────────┐
│🔥 7 days 🏆  │
│→ 30 days    │  ← Target updated
└──────────────┘
Background: gold gradient (#fcd34d)
Text: dark brown (#78350f)
Animation: Sparkle on trophy
```

**Broken Streak (0 days):**
```
┌──────────────┐
│⏸️  Streak lost │
│🔥 Start today!│
└──────────────┘
Background: light gray (#f3f4f6)
Text: gray (#666)
CTA: "Tap to start" or auto-dismiss after 5s
```

**With Freeze Used:**
```
┌──────────────┐
│🔥 5 days 🛡️  │
│→ 14 days    │  ← Shield icon (freeze token used)
│(1 freeze left)│
└──────────────┘
```

---

## 5. Daily Goal Progress Ring

### Purpose
Show progress toward daily XP goal. Motivates multiple sessions.

### Mobile Layout (≤480px)

```
  50% complete

    ╭──────╮
   │  ⭐   │  ← Ring: 60px
   │ 25/50 │  ← label below
    ╰──────╯
   
   25 / 50 XP
   (50% complete)
```

**Ring size:** 60px diameter
**Border:** 4px (conic-gradient, yellow)
**Label font:** 11px
**Gap from ring:** 8px

### Desktop Layout (>768px)

```
    ╭──────────╮
   │   ⭐ 25%  │  ← Center text
   │  25 / 50  │
    ╰──────────╯
    
    Daily Goal
```

**Ring size:** 80px diameter
**Center text:** 12px label, 14px value
**Border:** 5px

### Ring Color Progression

| Progress | Color | Emoji |
|----------|-------|-------|
| 0% | #e5e7eb (gray) | ⭐ |
| 25% | #fed7aa (light amber) | ⭐ |
| 50% | #fbbf24 (gold) | ✨ |
| 75% | #f59e0b (amber) | 💫 |
| 100% | #10b981 (green) | 🎉 |

### Animation

- Smooth conic-gradient transition (1s)
- On 100% reached: ring pulses + emoji changes to 🎉 (5 bounces)

### CSS (Conic Gradient)

```css
.progress-ring {
  --percentage: 50; /* CSS custom property set via React */
  background: conic-gradient(
    from 0deg,
    #fbbf24 0deg,
    #fbbf24 calc(var(--percentage) * 3.6deg),
    #e5e7eb calc(var(--percentage) * 3.6deg)
  );
  transition: background 1s ease;
}

/* At 100% */
@keyframes ringPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.progress-ring.complete {
  animation: ringPulse 0.6s ease-in-out 5;
}
```

---

## 6. Progress Dashboard (Phase 7, Deferred)

### Full Page Layout

#### Mobile (Single-column)

```
┌─────────────────────────────────┐
│  Your Progress                  │  ← Page title
│                                 │
│  ┌───────────────────────────┐  │
│  │ Player Stats              │  │
│  │ 340 XP  |  Lv 3 | 32 💰   │
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │ Today's Goal              │  │
│  │   Ring: 25/50 XP          │  │
│  │   (50% complete)          │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │ BM Progress               │  │
│  │ Donut: 12/19 topics       │  │
│  │ 8 crowns earned           │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │ MT Progress               │  │
│  │ Donut: 8/15 topics        │  │
│  │ 5 crowns earned           │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │ PI Progress               │  │
│  │ Donut: 5/10 topics        │  │
│  │ 2 crowns earned           │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │ Recent Activity           │  │
│  │ Quiz: BM 1-1-1           │  │
│  │ Score: 8/10 | XP: +80    │  │
│  │ Time: 2:30 PM            │  │
│  │                          │  │
│  │ Game: MT Nombor-100      │  │
│  │ Score: 9/12 | XP: +120   │  │
│  │ Time: 2:15 PM            │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

**Padding:** 16px
**Card gap:** 16px
**Card radius:** 8px
**Card shadow:** 0 1px 3px rgba(0,0,0,0.12)

#### Tablet (2-column)

```
┌─────────────────────────────────────────────┐
│  Your Progress                              │
│                                             │
│  ┌──────────────────┐  ┌──────────────────┐│
│  │ Player Stats     │  │ Today's Goal     ││
│  │ 340 XP  Lv 3 💰  │  │ Ring: 25/50 XP   ││
│  └──────────────────┘  └──────────────────┘│
│                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ BM: 12/19│  │ MT: 8/15 │  │ PI: 5/10 │  │
│  └──────────┘  └──────────┘  └──────────┘  │
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │ Recent Activity (Last 10 Sessions)   │  │
│  │ ...list...                           │  │
│  └──────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

#### Desktop (Full layout)

```
┌───────────────────────────────────────────────────────┐
│  Your Progress                                        │
│                                                       │
│  ┌────────────────┐  ┌────────────────────────────┐  │
│  │ Player Stats   │  │ BM Progress               │  │
│  │ 340 XP         │  │ Donut: 12/19              │  │
│  │ Lv 3           │  │ 8 crowns                  │  │
│  │ 32 Coins       │  │ [View breakdown →]        │  │
│  └────────────────┘  └────────────────────────────┘  │
│                                                       │
│  ┌────────────────────┐  ┌────────────────────────┐  │
│  │ Today's Goal       │  │ MT & PI Progress       │  │
│  │ Ring: 25/50 XP     │  │ MT: 8/15 crowns        │  │
│  │ (50%)              │  │ PI: 5/10 crowns        │  │
│  └────────────────────┘  └────────────────────────┘  │
│                                                       │
│  ┌───────────────────────────────────────────────┐   │
│  │ Recent Activity (Last 10 Sessions)            │   │
│  │ Quiz: BM 1-1-1 | Score: 8/10 | XP: +80 | 2:30PM│
│  │ Game: MT Nombor-100 | Score: 9/12 | XP: +120   │
│  │ Quiz: PI Tajweed | Score: 7/8 | XP: +45 | 1:45PM│
│  └───────────────────────────────────────────────┘   │
└───────────────────────────────────────────────────────┘
```

### Card Components

**Player Stats Card:**
```
┌─────────────────────┐
│ Total Stats         │
│ ────────────────    │
│ 340 XP              │
│ Level 3 (250/500)   │  ← progress to next level
│ 32 Coins            │
│                     │
│ Streak: 5 days      │
│ Best: 14 days       │
└─────────────────────┘
```

**Subject Progress Card (Donut):**
```
┌──────────────────┐
│ Bahasa Melayu    │
│                  │
│   ╱─────────────╲ │
│  ╱   12/19  😊   ╲│  ← Completion %, emoji
│ │    60% done     │ │
│  ╲               ╱ │
│   ╲─────────────╱  │
│                  │
│ 8 crowns earned  │
│ Module: 2 topics │  ← breakdown link
│ [View →]         │
└──────────────────┘
```

**Module Breakdown (Bar chart):**
```
BM Progress by Module
─────────────────────
Module 1: ████████░░░░░░░░ (4/5 topics)
Module 2: ████░░░░░░░░░░░░░ (2/10 topics)

MT Progress by Module
─────────────────────
Module 1: ███████░░░░░░░░░░░ (3/6 topics)
Module 2: ██░░░░░░░░░░░░░░░░ (1/9 topics)
```

**Font:** 12px label, 13px value
**Bar color:** Golden gradient (#fbbf24 → #f59e0b)
**Spacing:** 8px between rows

### Recent Activity List

**Item structure:**
```
┌────────────────────────────────────┐
│ Quiz: BM 1-1-1 Tajuk               │  ← Type & Topic
│ Score: 8/10 (80%)  |  XP: +80      │  ← Results
│ Jun 12, 2:30 PM                    │  ← Timestamp
└────────────────────────────────────┘
```

**Font:**
- Title: 13px bold
- Metadata: 12px gray
- Timestamp: 11px light gray

**Styling:**
- Border-left: 4px solid (color by subject: BM=teal, MT=blue, PI=red)
- Padding: 12px
- Hover: light background (#f3f4f6)

---

## 7. Topic Prerequisite Lock Screen (Phase 4)

### Modal / Overlay

**When user clicks locked topic:**

```
┌──────────────────────────────────┐
│  🔒 Topic Locked                 │
│                                  │
│  You must complete these first:  │
│                                  │
│  ✓ Nominative (Tajuk 1)          │  ← Completed (green check)
│  ✗ Vocative (Tajuk 2)            │  ← Incomplete (red X)
│    Complete to unlock this       │
│                                  │
│  Progress: 1/2 prerequisites     │
│                                  │
│  [Go to Vocative] [Close]        │  ← Buttons
└──────────────────────────────────┘
```

**Width:** 90% mobile, 400px desktop
**Background:** Semi-transparent dark overlay
**Modal radius:** 12px
**Button:** Outline style (blue border, blue text)

---

## 8. Analytics Events (Phase 5+)

### Event Schema

Every gamification action logs an event (client-side, sent to server in Phase 8):

```json
{
  "eventType": "xp_awarded",
  "userId": "uuid-v4",
  "timestamp": "2026-06-12T14:30:00Z",
  "data": {
    "amount": 80,
    "source": "quiz",
    "subject": "bm",
    "topicId": "1-1-1-mendengar-menyebut",
    "sessionDuration": 120000
  }
}
```

**Event types to track:**
- `xp_awarded` → XP gain
- `level_up` → Player level increased
- `crown_level_up` → Topic crown advanced
- `streak_milestone` → 7/30/100 day streak
- `daily_goal_met` → User reached daily goal
- `quiz_completed` → Quiz finished with score
- `review_session_started` → Review mode started
- `dashboard_viewed` → User opened progress dashboard

**Use case:** Measure engagement, tune XP economy, identify pain points

---

## 9. Design System Tokens

### Colors

**Primary (Gamification):**
```
--color-primary: #667eea        (Purple, stats bar)
--color-primary-dark: #5563d1
--color-success: #10b981        (Green, goals met)
--color-warning: #fbbf24        (Gold, crowns)
--color-danger: #ef4444         (Red, streak lost)
--color-info: #3b82f6           (Blue, info)
```

**Neutral:**
```
--color-bg-light: #f9fafb
--color-bg-white: white
--color-text-dark: #1f2937
--color-text-light: #6b7280
--color-border: #e5e7eb
```

**Dark Mode:**
```
--color-bg-dark: #1f2937
--color-text-dark: #f3f4f6
--color-border-dark: #374151
```

### Typography

```
--font-primary: 'Inter', sans-serif (or system font)
--font-size-sm: 12px
--font-size-base: 14px
--font-size-md: 16px
--font-size-lg: 18px
--font-size-xl: 20px

--font-weight-regular: 400
--font-weight-medium: 500
--font-weight-bold: 600
--font-weight-heavy: 700
```

### Spacing

```
--spacing-xs: 4px
--spacing-sm: 8px
--spacing-md: 12px
--spacing-lg: 16px
--spacing-xl: 24px
--spacing-2xl: 32px
```

### Borders & Shadows

```
--radius-sm: 4px
--radius-md: 8px
--radius-lg: 12px

--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05)
--shadow-md: 0 1px 3px rgba(0, 0, 0, 0.12)
--shadow-lg: 0 4px 12px rgba(0, 0, 0, 0.15)
```

---

## 10. Responsive Grid System

### 12-Column Grid

**Mobile (375px):** 1 column (full-width minus padding)
**Tablet (768px):** 2 columns
**Desktop (1024px):** 3 columns
**Large (1280px):** 4 columns

### Example: Dashboard Cards

```html
<!-- Mobile: stack vertically -->
<div class="grid grid-cols-1 gap-4">
  <div class="card">Player Stats</div>
  <div class="card">Daily Goal</div>
  <div class="card">BM Progress</div>
</div>

<!-- Tablet: 2 per row -->
<div class="grid grid-cols-2 gap-4">
  <div class="card">Player Stats</div>
  <div class="card">Daily Goal</div>
  <div class="card span-2">Recent Activity</div>
</div>

<!-- Desktop: 3 per row -->
<div class="grid grid-cols-3 gap-6">
  <div class="card">Player Stats</div>
  <div class="card">Daily Goal</div>
  <div class="card">BM Progress</div>
  ...
</div>
```

---

## Implementation Order

1. **Phase 0:** CSS variables + tokens (foundation)
2. **Phase 1:** StatsBar + AnimatedCounter (simplest, high impact)
3. **Phase 2:** Streak Counter (reuses StatsBar tokens)
4. **Phase 3:** Crown Display (medium complexity)
5. **Phase 5:** Add dark mode variants to all
6. **Phase 7:** Dashboard + Daily Goal Ring (most complex, deferred)

---

## Testing & Validation

- [ ] Mobile layout at 375px (iPhone SE)
- [ ] Tablet layout at 768px
- [ ] Desktop layout at 1024px
- [ ] All components with light + dark mode
- [ ] Touch targets ≥44×44px on mobile
- [ ] Color contrast WCAG AA on all text
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Screenshot each component at each breakpoint

---

End of UI Mockups document. Ready for implementation.
