# Math Journey Challenge System — Full Implementation Documentation

## 1. Project Goal

Implement a new **Math Journey** challenge system into the existing Mathematics web app without changing, removing, or breaking any existing functions, page templates, navigation logic, exercise engines, question generators, settings, scoring logic, assets, or responsive behavior.

The existing three Mathematics topics must remain fully functional:

1. Math Operation
2. Math Long Method
3. Clock & Time

A new fourth menu/card will be added:

4. **Math Journey**

The Math Journey is a separate structured challenge/progression mode. Existing topic pages remain the place for unlimited practice.

## 1A. Design Reference: Flow Progress Mockup

IMPORTANT: Before starting implementation, review the official reference image at:

`docs/images/math-journey-flow.png`

This file is the primary visual and interaction reference for the Math Journey implementation. The agent must review this image before coding the flow, UI layout, state progression, or styling so the implementation remains aligned with the approved design.

This reference image defines the core UI/UX direction for the Journey experience:

- Math Home → Journey Overview → Unit & Level → Challenge Info → Challenge Question → Result → Unit Progress → Next Unit
- Top navigation with back button, title, and star counter
- Compact rounded cards with soft borders and gentle elevation
- Strong green primary CTA buttons for action states
- Calm pastel status cards for unlocked, current, locked, and completed states
- Simple progress indicators and reward badges
- Child-friendly mascot/character styling and supportive feedback messages
- Clean, single-screen layout with no unnecessary page scrolling

This mockup should be treated as the visual guideline for layout hierarchy, spacing rhythm, card structure, color balance, and interaction tone.

The implementation must follow the same style language even if the final production code uses existing app components and theme tokens. The flow should feel like the same mathematics app, but with a guided challenge progression system built around the approved Journey visual pattern.

---

# 2. Core Product Rule

The app must have two clearly separated learning experiences.

## Practice Mode

Existing topic pages remain unchanged in purpose:

- Math Operation
- Math Long Method
- Clock & Time

Practice mode must remain:

- Unlimited
- Configurable
- No challenge lives required
- No forced progression
- No locked practice
- Existing settings continue to work
- Existing question templates continue to work
- Existing answer logic continues to work

## Math Journey Mode

Math Journey is the new structured challenge mode.

Journey mode must include:

- Units
- Levels
- Challenge progression
- Lock/unlock states
- Lives
- Stars
- Diamonds
- Challenge results
- Unit completion
- Journey progress
- Rewards
- Clear next-step navigation

Journey mode should reuse the existing exercise/question engines wherever possible.

Do not duplicate math logic unnecessarily.

---

# 3. Non-Negotiable Existing-System Protection

## DO NOT change

Do not rewrite or redesign existing working systems unless required for the Journey integration.

Do not change:

- Existing math calculation logic
- Existing question generation logic
- Existing answer validation
- Existing Math Operation settings
- Existing Math Long Method logic
- Existing Clock & Time logic
- Existing component structure unless required
- Existing route behavior
- Existing local storage keys unless migration is necessary
- Existing visual templates used by current practice pages
- Existing navigation/footer structure
- Existing app theme
- Existing typography system
- Existing global spacing system
- Existing responsive rules
- Existing audio/sound logic
- Existing animation behavior
- Existing scoring logic used by practice
- Existing user profile data
- Existing game state

When integrating Journey, extend the system rather than replace it.

---

# 4. Design Direction

Follow the provided approved Math Journey reference design as closely as possible.

The UI direction is:

- Simple
- Professional
- Child friendly
- Duolingo-inspired
- Minimal visual noise
- Soft rounded cards
- Light backgrounds
- Strong green primary action
- Navy text
- Soft pastel status colors
- Small controlled animations only
- No heavy rendering effects
- No excessive gradients
- No large background animation
- No unnecessary particle effects
- No complex 3D effects

The app should feel lightweight and fast.

---

# 5. Responsive Layout Rule — Critical

Every Journey page must behave as a **single-screen application view**.

## Required behavior

The entire page must fit inside the available viewport.

There must be:

- No vertical page scrolling
- No horizontal page scrolling
- No left/right overflow
- No component extending outside the viewport
- No clipped primary controls
- No hidden CTA buttons
- No overlapping text
- No fixed-size content that breaks smaller screens

## Main viewport

Use the application viewport correctly:

```css
height: 100dvh;
width: 100%;
overflow: hidden;
```

Prefer `100dvh` instead of only `100vh` on mobile browsers.

Fallback may be included:

```css
min-height: 100vh;
height: 100dvh;
```

Do not use:

```css
width: 100vw;
```

for internal content if it causes scrollbar/viewport-width issues.

---

# 6. Responsive Strategy

Every page must scale in both:

- Vertical direction
- Horizontal direction

Do not solve only height responsiveness.

Use:

- CSS Grid
- Flexbox
- `minmax()`
- `clamp()`
- Relative units
- Container-based sizing where appropriate
- Dynamic gaps
- Flexible card sizing
- Flexible typography
- Responsive icons

## Recommended width behavior

```css
width: min(100%, 720px);
margin-inline: auto;
```

Desktop content should remain centered.

Do not stretch mobile-style learning content across very wide desktop screens.

---

# 7. Clamp Rules

All important sizing must be responsive.

Example:

```css
font-size: clamp(0.85rem, 1.5vw, 1rem);
```

Headings:

```css
font-size: clamp(1.25rem, 3vw, 2rem);
```

Section gaps:

```css
gap: clamp(0.4rem, 1.2vh, 1rem);
```

Card padding:

```css
padding: clamp(0.65rem, 1.5vw, 1.25rem);
```

Button height:

```css
min-height: clamp(42px, 6vh, 56px);
```

Icons:

```css
width: clamp(32px, 7vw, 64px);
height: clamp(32px, 7vw, 64px);
```

---

# 8. Single-Screen Vertical Compression

For smaller-height devices, progressively reduce:

- Header height
- Hero height
- Card padding
- Vertical gaps
- Illustration size
- Heading size
- Description spacing

Never remove required controls.

Use height-based media queries where needed.

Example:

```css
@media (max-height: 700px) {
  .journey-hero {
    min-height: 88px;
  }

  .journey-card {
    padding-block: 10px;
  }

  .journey-page {
    gap: 8px;
  }
}
```

For very short screens:

```css
@media (max-height: 600px) {
  .secondary-description {
    display: none;
  }
}
```

Only optional descriptive text may be shortened/hidden.

Never hide:

- Back button
- Current challenge
- Question
- Answers
- Progress
- Lives
- Main CTA

---

# 9. Breakpoint Philosophy

Do not build completely unrelated layouts for every breakpoint.

Use one adaptive system.

Recommended ranges:

### Small mobile
320–389px

### Standard mobile
390–479px

### Large mobile / small tablet
480–767px

### Tablet
768–1023px

### Desktop
1024px+

For desktop:

- Keep Journey content centered
- Reuse existing sidebar if the app currently uses one
- Do not introduce a new sidebar pattern if the existing app template does not use one
- Maintain the same overall app shell

---

# 10. Math Home Integration

The existing Mathematics homepage currently contains:

- Hero
- Math Operation
- Math Long Method
- Clock & Time
- Bottom navigation

Add one new card:

## Math Journey

Suggested content:

**Title**
Math Journey

**Subtitle**
Cabaran merentasi semua topik.

Alternative:

Lengkapkan unit, kumpul bintang dan buka tahap baharu.

Suggested icon:

- Trophy
- Journey path
- Flag
- Existing mascot with trophy

The card must visually match the existing topic card template.

Do not redesign the other three cards.

---

# 11. Math Home Card Order

Recommended:

1. Math Operation
2. Math Long Method
3. Clock & Time
4. Math Journey

Journey may use a slightly stronger border/accent to show that it is special.

It must still belong to the same visual system.

---

# 12. Journey Navigation Flow

The required flow is:

```text
Math Home
   ↓
Math Journey Overview
   ↓
Unit Page
   ↓
Level/Challenge Info
   ↓
Challenge Question
   ↓
Answer Feedback
   ↓
Next Question
   ↓
Challenge Result
   ↓
Unit Progress Updated
   ↓
Next Level / Unit Unlock
```

---

# 13. Screen 1 — Math Home

Purpose:

Provide access to the Journey without changing existing practice behavior.

Required:

- Existing Matematik header
- Existing hero
- Existing 3 topic cards
- New Math Journey card
- Existing footer/navigation

Journey card click:

```text
navigate → MathJourney
```

---

# 14. Screen 2 — Journey Overview

Title:

**Math Journey**

Purpose:

Show the user's overall Mathematics challenge path.

Required header:

- Back button
- Math Journey title
- Current Star count

Optional:

- Diamond count if space allows

Hero:

- Small mascot
- “Cabaran Matematik”
- Short sentence

Example:

> Lengkapkan unit, kumpul bintang dan buka tahap baharu!

Journey must show units vertically as compact cards/path nodes.

Example:

```text
Unit 1
Asas Matematik
████████ 80%
✓

Unit 2
Nombor & Operasi
██░░░░░░ 20%
>

Unit 3
Jam & Masa
🔒

Unit 4
Kaedah Panjang
🔒

Unit 5
Cabaran Campuran
🔒
```

Only the current/unlocked unit can be opened.

Locked units remain visible.

---

# 15. Journey Unit Structure

Recommended V1 structure:

## Unit 1 — Asas Matematik

Focus:

Math Operation basics

Levels:

1. Tambah 1–5
2. Tambah 1–10
3. Tolak 1–5
4. Tolak 1–10
5. Unit Challenge

---

## Unit 2 — Nombor & Operasi

Focus:

Math Operation progression

Levels:

1. Tambah 1–20
2. Tolak 1–20
3. Darab asas
4. Bahagi asas
5. Unit Challenge

---

## Unit 3 — Jam & Masa

Focus:

Clock & Time

Levels:

1. Kenali jam
2. Jam penuh
3. Setengah jam
4. Minit
5. Unit Challenge

---

## Unit 4 — Kaedah Panjang

Focus:

Math Long Method

Levels:

1. Tambah panjang
2. Tolak panjang
3. Darab panjang
4. Bahagi panjang
5. Unit Challenge

---

## Unit 5 — Cabaran Campuran

Focus:

Mixed questions from all topics.

Levels:

1. Operasi campuran
2. Jam & masa
3. Kaedah panjang
4. Mixed challenge
5. Final Mathematics Challenge

---

# 16. Future Journey Expansion

The Journey architecture must allow future units to be added without redesigning the system.

For example:

```js
journeyUnits = [
  {...},
  {...},
  {...}
]
```

Do not hard-code unit UI individually.

Render units from configuration/data.

---

# 17. Screen 3 — Unit Page

Example:

**Unit 2**
Nombor & Operasi

Header:

- Back
- Unit title
- Stars

Progress:

```text
2 / 5 lengkap
████░░░░ 40%
```

Levels appear as a vertical path.

Example:

```text
✓  1   Tambah dalam lingkungan 1–10   ⭐⭐⭐

●  2   Tolak dalam lingkungan 1–10    Mula

🔒 3   Darab asas

🔒 4   Bahagi asas

🔒 🏆  Cabaran Unit 2
```

States:

- Completed
- Current
- Locked

---

# 18. Level State Rules

## Completed

Display:

- Green check
- Earned stars
- Completed styling

## Current

Display:

- Primary accent
- “Mula”
- Touchable/clickable

## Locked

Display:

- Lock icon
- Muted appearance
- Not clickable

---

# 19. Unlock Logic

For normal levels:

```text
Complete current level
→ next level unlocks
```

For Unit Challenge:

```text
Complete all normal levels
→ Unit Challenge unlocks
```

For next Unit:

```text
Pass Unit Challenge
→ next Unit unlocks
```

Do not require perfect score to progress.

---

# 20. Screen 4 — Challenge Info

Before starting a challenge show a compact challenge information screen/card.

Example:

**Cabaran Level 2**

Tolak dalam lingkungan 1–10

Information:

- 10 questions
- 3 lives
- Multiple choice
- Need 8/10 to pass
- Maximum reward

Example:

```text
❓ 10 soalan
❤️ 3 nyawa
▣ Jawab dengan pilihan
⭐ Dapatkan 8/10 untuk lulus
```

CTA:

**Mula Cabaran!**

---

# 21. Challenge Question Screen

Reuse the current exercise design/template.

Do not create a completely different question UI.

The Journey version should reuse:

- Existing question card
- Existing object/number visuals
- Existing option cards
- Existing answer formatting
- Existing math typography
- Existing settings-compatible rendering logic

Journey only adds:

- Challenge progress
- Lives
- Journey score/reward context

---

# 22. Challenge Header

Example:

```text
←  Tolak 1–10            ❤️❤️❤️
```

or if enough space:

```text
← Tolak 1–10      ⭐126  ❤️3
```

Question progress:

```text
Soalan 4 / 10
████████░░
```

Do not overcrowd the header.

---

# 23. Challenge Question Layout

Keep current layout structure.

Recommended order:

```text
Header
Question Progress
Question Card
Answer Options
Optional Current Status
```

Everything must fit within one viewport.

No vertical scrolling.

---

# 24. Lives System

Lives only apply inside Journey challenges.

Start:

```text
❤️❤️❤️
```

Correct answer:

- No life change

Wrong answer:

```text
❤️❤️🤍
```

Second wrong:

```text
❤️🤍🤍
```

Third wrong:

```text
🤍🤍🤍
```

Challenge ends when lives reach zero.

Practice mode must not consume Journey lives.

---

# 25. Life Behavior

Important:

Lives are **per challenge attempt**, not a global waiting mechanic.

After failure:

```text
[Cuba Lagi]
```

Child can immediately retry.

Do not implement:

- Waiting timer
- Paid refill
- Diamond refill
- Daily heart regeneration

V1 should keep the educational experience friendly.

---

# 26. Correct Answer Feedback

After a correct answer:

Use existing answer feedback style where possible.

Example:

```text
✓

Betul!

7 − 3 = 4

[Soalan Seterusnya]
```

Recommended:

- Green success state
- Very short micro-animation
- Optional existing success sound

Avoid full-page heavy animation.

---

# 27. Wrong Answer Feedback

Example:

```text
✕

Hampir betul!

Jawapan yang betul ialah:

7 − 3 = 4

❤️ 1 nyawa berkurang.

[Soalan Seterusnya]
```

Do not shame the learner.

Avoid text like:

- Salah!
- Teruk!
- Gagal!

Prefer supportive language.

---

# 28. Pass Requirement

Recommended standard:

```text
80%
```

For 10 questions:

```text
8/10
```

For special beginner levels, this may later become configurable.

Store it in level data:

```js
passScore: 0.8
```

Do not hard-code 8/10 globally.

---

# 29. Challenge Result Screen

After the final question, display result.

Example:

```text
🏆

Syabas!

Anda telah menyelesaikan cabaran!

8 / 10
80% Betul

⭐⭐☆

Ganjaran
⭐ +3
💎 +2

[Cuba Lagi] [Teruskan]
```

Everything must fit one viewport.

---

# 30. Challenge Reward Rules

Recommended V1 rewards:

## Pass 80–89%

```text
⭐ +2
```

## 90–99%

```text
⭐ +3
💎 +1
```

## Perfect 100%

```text
⭐ +5
💎 +2
```

Unit Challenge may award more:

```text
⭐ +5
💎 +3
```

Keep reward rules configurable.

---

# 31. Star Purpose

Stars represent learning progress.

Stars are earned from:

- Completing Journey levels
- Passing challenges
- Perfect results
- Unit completion

Stars must not be deducted.

Stars should not be used as spending currency.

---

# 32. Diamond Purpose

Diamonds represent special achievement rewards.

V1:

Diamonds are collectible only.

Future use:

- Avatar accessories
- Mascot customization
- Profile frames
- Cosmetic rewards

Do not tie learning access to diamonds.

---

# 33. Journey Stars vs Existing Stars

If the current app already has a star balance:

Reuse the same balance unless doing so breaks existing logic.

Do not create duplicate star counters such as:

```text
practiceStars
journeyStars
globalStars
```

unless there is a strong architectural reason.

Prefer one global star reward system.

---

# 34. Progress Calculation

## Level progress

```text
completed / totalQuestions
```

## Unit progress

```text
completedLevels / totalLevels
```

Example:

```text
3 / 5
60%
```

## Journey progress

```text
completedJourneyLevels / totalJourneyLevels
```

---

# 35. Unit Completion Screen

When the Unit Challenge is passed:

Display:

```text
Unit 2 Selesai!

🎉

Hebat!

Anda telah menyelesaikan Unit 2.

Unit 3 kini dibuka.

[Teruskan ke Unit 3]
```

Optional reward summary:

```text
⭐ +5
💎 +3
```

---

# 36. Unit Unlock Animation

Keep animation lightweight.

Allowed:

- Small lock → unlock transition
- Checkmark pop
- Trophy scale-in
- Small confetti burst

Avoid:

- Full-screen continuous particles
- Large video backgrounds
- WebGL
- Heavy canvas effects
- Large Lottie animation unless already optimized

Animation should normally finish in approximately:

```text
300–900ms
```

---

# 37. Suggested Data Model

Use a data-driven structure.

Example:

```js
const MATH_JOURNEY_UNITS = [
  {
    id: "unit-1",
    title: "Asas Matematik",
    description: "Kuasi asas tambah dan tolak.",
    topic: "math-operation",
    levels: [
      {
        id: "u1-l1",
        title: "Tambah 1–5",
        type: "challenge",
        source: "math-operation",
        operation: "addition",
        numberRange: [1, 5],
        questionCount: 10,
        lives: 3,
        passScore: 0.8,
        reward: {
          passStars: 2,
          perfectStars: 5,
          perfectDiamonds: 2
        }
      }
    ]
  }
];
```

---

# 38. Mixed Challenge Data

Mixed unit challenges should declare their source composition.

Example:

```js
{
  id: "unit-5-final",
  title: "Cabaran Matematik",
  type: "mixed",
  questionCount: 10,
  lives: 3,
  passScore: 0.8,
  sources: [
    {
      source: "math-operation",
      count: 4
    },
    {
      source: "clock-time",
      count: 3
    },
    {
      source: "long-method",
      count: 3
    }
  ]
}
```

Reuse existing generators.

---

# 39. Journey Player State

Recommended state:

```js
{
  currentUnitId: "unit-2",
  currentLevelId: "u2-l2",

  completedLevels: {
    "u1-l1": {
      completed: true,
      bestScore: 10,
      stars: 3
    }
  },

  completedUnits: ["unit-1"],

  unlockedUnits: ["unit-1", "unit-2"],

  totalStars: 126,
  totalDiamonds: 8,

  journeyProgress: 0.28
}
```

---

# 40. Save Progress

Persist Journey progress.

Use the app's current persistence method.

If current app uses:

- localStorage → continue using localStorage
- React Context → integrate with Context
- global store → integrate with existing store
- backend/database → use current backend approach

Do not introduce an unrelated state library only for Journey.

---

# 41. Suggested Local Storage Key

Only if the app currently uses localStorage.

Example:

```js
mathJourneyProgress
```

Version the structure:

```js
{
  version: 1,
  ...
}
```

This allows future migration.

---

# 42. Existing Question Generator Integration

Journey should call existing question generators.

Example conceptual interface:

```js
generateQuestion({
  source: "math-operation",
  operation: "subtraction",
  difficulty: "easy",
  numberRange: [1, 10]
})
```

Do not copy existing calculation logic into Journey components.

Journey should be an orchestration layer.

---

# 43. Suggested Component Architecture

Use the existing project naming convention.

Conceptual structure:

```text
MathHome
│
├── Existing topic cards
└── MathJourneyCard

MathJourney
│
├── JourneyHeader
├── JourneyHero
├── JourneyUnitList
│   └── JourneyUnitCard
│
└── ExistingNavigation
```

Unit:

```text
JourneyUnitPage
│
├── JourneyHeader
├── UnitProgress
├── JourneyLevelPath
│   └── JourneyLevelCard
└── MascotHint
```

Challenge:

```text
JourneyChallenge
│
├── ChallengeHeader
├── ChallengeProgress
├── ExistingQuestionRenderer
├── ExistingAnswerOptions
└── ChallengeFeedback
```

Result:

```text
JourneyResult
│
├── ResultSummary
├── RewardSummary
└── ResultActions
```

---

# 44. Do Not Duplicate Existing Templates

If a reusable component already exists, use it.

Examples:

- Existing BackButton
- Existing SettingsButton
- Existing QuestionCard
- Existing AnswerButton
- Existing BottomNavigation
- Existing ScoreBadge
- Existing mascot component

Do not create:

```text
JourneyBackButton
JourneyQuestionCard2
JourneyAnswerButtonNew
```

unless the existing component cannot support required props.

Extend reusable components through props/variants.

---

# 45. Suggested Component Variants

Example:

```jsx
<QuestionCard mode="practice" />
```

and:

```jsx
<QuestionCard mode="journey" />
```

Instead of duplicating the component.

---

# 46. Navigation Behavior

Back behavior must be predictable.

Math Home:

```text
Back → previous app page
```

Journey Overview:

```text
Back → Math Home
```

Unit Page:

```text
Back → Journey Overview
```

Challenge Info:

```text
Back → Unit Page
```

During active Challenge:

If back is pressed, show confirmation:

```text
Keluar daripada cabaran?

Kemajuan cabaran semasa akan hilang.

[Batal] [Keluar]
```

Do not accidentally exit challenge.

---

# 47. Settings During Journey

The Journey defines its own challenge parameters.

Therefore the child should not be able to change:

- Required operation
- Required number range
- Challenge question count
- Challenge pass requirement

If the current exercise page has a settings button:

Either:

1. Hide it only in Journey mode, or
2. Show only non-gameplay settings

Allowed settings:

- Sound
- Music
- Accessibility
- Display preferences

Do not allow challenge rules to be modified.

---

# 48. Practice Settings Remain Unchanged

Existing Practice mode should still allow its existing:

- Difficulty selection
- Operation selection
- Number selection
- Answer method selection

Do not remove these.

---

# 49. Question Randomization

Each challenge attempt should produce a fresh question set.

Avoid identical sequences where possible.

Requirements:

- Prevent obvious consecutive duplicates
- Keep questions within level rules
- Maintain valid answer choices
- Ensure only one correct multiple-choice answer
- Shuffle answer order

---

# 50. Retry Behavior

When user taps:

**Cuba Lagi**

Reset:

- Question index
- Lives
- Attempt score
- Correct count
- Wrong count

Do not remove:

- Previous best score
- Earned permanent rewards

Avoid duplicate farming of one-time rewards.

---

# 51. Reward Farming Protection

Recommended:

Base pass stars may only be awarded once per level.

A later improved score may award the difference.

Example:

First attempt:

```text
8/10 → earned 2 stars
```

Second attempt:

```text
10/10 → level maximum is 5 stars
```

Award only:

```text
+3 additional stars
```

not another full +5.

Diamonds for first perfect result should be awarded once.

---

# 52. Best Score

Store best score per level.

Example:

```text
Best: 9/10
```

If new result is worse:

Do not reduce best score.

---

# 53. Journey Progress Card on Math Home

Optional but recommended after initial implementation.

The Math Journey card may show:

```text
Unit 2 • Tahap 2
████████░░ 28%

❤️ 3     ⭐ 126     💎 8
```

CTA:

```text
Teruskan
```

This allows fast return to current progress.

---

# 54. Visual Status Colors

Use the app's existing theme variables.

Recommended semantic use:

- Green = active/success
- Navy = primary text
- Gray = locked/inactive
- Yellow = stars/reward
- Red/Pink = lives/error feedback
- Blue = diamond/info

Do not introduce many extra colors.

---

# 55. Accessibility

Required:

- Minimum touch target approximately 44×44px
- High text contrast
- Do not communicate status by color alone
- Locked states need lock icon
- Completed states need check icon
- Buttons need clear labels
- Keyboard focus should remain visible on desktop
- Use semantic buttons
- Add accessible labels to icon-only buttons

---

# 56. Touch Behavior

Buttons/cards must work well on mobile.

Avoid:

- Tiny arrow-only hit areas
- Hover-only functionality
- Accidental double-submit
- Long-press requirements

Entire current level card can be clickable.

---

# 57. Performance Requirements

The Journey system must stay lightweight.

Avoid:

- Large image assets
- Full-screen video backgrounds
- Multiple simultaneous animated SVGs
- Heavy animation libraries if not already used
- Unnecessary rerenders
- Rebuilding question generator logic

Prefer:

- Existing optimized SVG/WebP mascot assets
- CSS animation
- Conditional rendering
- Memoized derived state where useful

---

# 58. No Layout Shift

When:

- Lives change
- Scores update
- Feedback appears
- Progress changes

Do not allow the layout to jump dramatically.

Reserve required space.

---

# 59. Text Overflow Rules

All labels must remain safe.

Use:

```css
min-width: 0;
overflow-wrap: anywhere;
```

Use controlled line clamp only for secondary descriptions.

Important titles should not be truncated unnecessarily.

---

# 60. Mobile Typography

Do not shrink text until unreadable just to fit.

Recommended minimum body text:

```text
13–14px
```

Primary labels:

```text
15–18px
```

Question content:

```text
24px+
```

Use `clamp()`.

---

# 61. Desktop Behavior

On desktop:

- Do not simply stretch cards full width
- Center core learning content
- Preserve existing sidebar/template if one exists
- Journey path may use additional horizontal breathing room
- Maintain single-screen height
- Do not introduce page scrolling

If sidebar exists:

```text
Sidebar | Main Journey Content
```

Only the main content should resize within available space.

---

# 62. Tablet Behavior

Tablet may:

- Increase card width
- Increase question card size
- Use larger gaps

Do not convert into a completely different page architecture.

---

# 63. Landscape Mobile

Landscape mode must still avoid scrolling.

Compress:

- Hero
- Vertical gaps
- Header
- Optional helper text

Use wider horizontal space intelligently.

For challenge questions, answers may remain 2×2.

---

# 64. Loading State

If Journey state requires loading:

Show:

- Existing app loading pattern
- Small skeleton or spinner

Do not flash locked/unlocked incorrect states before data loads.

---

# 65. Empty/Error State

If Journey data fails:

Show a child-friendly fallback:

```text
Oops, perjalanan belum dapat dimuatkan.

[Cuba Lagi]
```

Do not break the whole Mathematics homepage.

---

# 66. Challenge Failure State

If lives reach zero before completion:

Example:

```text
Cuba Lagi!

Anda hampir berjaya.

6 / 10 dijawab dengan betul.

[Cuba Lagi] [Kembali]
```

Do not unlock next level.

Do not award pass rewards.

Optional small participation feedback is okay, but avoid exploitable permanent currency rewards.

---

# 67. Unit Challenge

Each unit ends with a special Unit Challenge.

Unit Challenge should:

- Mix previous skills from that unit
- Be slightly harder
- Use 3 lives
- Require 80% pass
- Give stronger reward
- Unlock next unit

---

# 68. Final Journey Challenge

Unit 5 Final Challenge should mix:

- Math Operation
- Math Long Method
- Clock & Time

Example:

10 questions:

- 4 Math Operation
- 3 Clock & Time
- 3 Math Long Method

Reward:

- Trophy
- Stars
- Diamonds
- Achievement badge

---

# 69. Achievement Integration

If the app already has a Pencapaian page, connect Journey achievements there.

Suggested badges:

- First Challenge
- Perfect Score
- Unit 1 Complete
- Unit 2 Complete
- Clock Master
- Long Method Master
- Mathematics Journey Complete

Do not create a second achievement page.

---

# 70. Ranking Integration

Do not modify Ranking initially unless already compatible.

Future possibility:

- Weekly stars
- Journey units completed

V1 Journey should not depend on leaderboard functionality.

---

# 71. Profile Integration

Optional later:

Show:

- Journey completion %
- Stars
- Diamonds
- Best badges

Do not block V1 implementation on this.

---

# 72. Analytics — Recommended

Track anonymous learning events if an analytics system already exists.

Useful events:

```text
journey_opened
unit_opened
challenge_started
question_answered
challenge_passed
challenge_failed
challenge_retried
unit_completed
journey_completed
```

Do not add a new analytics provider only for this unless requested.

---

# 73. Parent Progress — Future Ready

Journey data should be structured so future parent reports can show:

- Units completed
- Skills completed
- Best scores
- Accuracy
- Attempts
- Weak topics
- Strong topics
- Learning streak
- Total Journey progress

Do not need to build parent dashboard in this implementation unless requested.

---

# 74. Recommended Implementation Phases

## Phase 1 — Journey foundation

Implement:

- Math Journey card
- Journey Overview
- Unit configuration
- Unit page
- Unlock system
- Persistence

Do not touch existing practice logic.

---

## Phase 2 — Challenge integration

Implement:

- Challenge info screen
- Existing question generator reuse
- Challenge progress
- Lives
- Correct/wrong feedback
- Challenge result

---

## Phase 3 — Rewards

Implement:

- Stars
- Diamonds
- Best score
- Reward protection
- Unit completion
- Next unit unlock

---

## Phase 4 — Polish

Implement:

- Responsive audit
- Compact-height behavior
- Small animations
- Empty states
- Accessibility
- Landscape testing

---

# 75. Testing Requirements

Test all Journey screens at minimum:

### Mobile

- 320 × 568
- 360 × 640
- 375 × 667
- 390 × 844
- 412 × 915
- 430 × 932

### Tablet

- 768 × 1024
- 820 × 1180
- 1024 × 1366

### Desktop

- 1280 × 720
- 1366 × 768
- 1440 × 900
- 1920 × 1080

Also test:

- Mobile landscape
- Browser zoom
- Long Malay labels
- Small-height laptop windows

---

# 76. Responsive Acceptance Rule

Every test size must satisfy:

```text
document.documentElement.scrollHeight
<=
document.documentElement.clientHeight
```

and:

```text
document.documentElement.scrollWidth
<=
document.documentElement.clientWidth
```

Allow a tiny browser rounding tolerance if necessary.

There must be no user-visible page scrollbar.

---

# 77. Functional Regression Testing

After Journey implementation, verify:

## Existing Math Operation

- Opens normally
- Settings still work
- Addition works
- Subtraction works
- Multiplication works
- Division works
- Answer options work
- Score/progress works

## Math Long Method

- Existing question formatting unchanged
- Existing long-method calculation unchanged
- Existing answer flow unchanged

## Clock & Time

- Existing clock questions unchanged
- Existing time logic unchanged

---

# 78. Journey Functional Testing

Verify:

- New Journey card opens
- Unit 1 initially available
- Locked units cannot open
- Level 1 starts
- Questions respect level configuration
- Wrong answer removes one life
- Correct answer does not remove life
- Zero lives ends attempt
- Passing score unlocks next level
- Failing score does not unlock next level
- Best score persists
- Stars persist
- Diamonds persist
- Rewards cannot be repeatedly farmed
- Unit Challenge unlocks correctly
- Next Unit unlocks correctly
- Refresh preserves progress

---

# 79. Visual Acceptance Criteria

Implementation must match approved reference design closely in:

- Card hierarchy
- Rounded corners
- Whitespace
- Navy typography
- Green CTA
- Soft pastel backgrounds
- Compact progress bars
- Trophy/Journey identity
- Path structure
- Lock states
- Completion checkmarks
- Challenge result presentation

Do not copy only the colors.

Match:

- Layout hierarchy
- Component proportions
- Spacing
- Visual rhythm
- Information density
- Button placement
- Progress presentation

---

# 80. Critical UI Rule

Journey should never look like an unrelated mini-app.

It must look like it belongs to the current Mathematics application.

Reuse:

- Existing fonts
- Existing border radius
- Existing card style
- Existing header
- Existing navigation
- Existing icon language
- Existing mascot styling
- Existing theme tokens

---

# 81. Suggested Math Home Copy

Journey card:

```text
Math Journey

Cabaran merentasi semua topik.
Lengkapkan unit dan buka tahap baharu.
```

If space is limited:

```text
Math Journey
Cabaran & kemajuan Matematik.
```

---

# 82. Suggested Journey Hero Copy

```text
Cabaran Matematik

Lengkapkan unit, kumpul bintang
dan buka tahap baharu!
```

---

# 83. Suggested Supportive Feedback Copy

Correct:

```text
Betul!
Hebat!
Bagus!
Tepat sekali!
```

Wrong:

```text
Hampir betul!
Cuba lagi pada soalan seterusnya.
Jangan putus asa!
```

Completion:

```text
Syabas!
Anda berjaya!
Unit selesai!
Tahap baharu dibuka!
```

---

# 84. Implementation Priority

If compromises are required, prioritize in this order:

1. Existing functionality must remain safe
2. Correct challenge logic
3. Single-screen responsive behavior
4. Progress persistence
5. Clear child-friendly UX
6. Performance
7. Visual polish
8. Optional animation

Never sacrifice existing functionality for visual animation.

---

# 85. Developer / AI Agent Instruction

When implementing this specification:

1. Inspect the existing codebase first.
2. Identify reusable components.
3. Identify existing Math Operation, Math Long Method, and Clock & Time generators.
4. Identify current global game state.
5. Identify current persistence method.
6. Identify responsive layout standards already used.
7. Reuse those systems.
8. Add Journey as an extension.
9. Do not refactor unrelated files.
10. Do not rename existing routes/functions unless necessary.
11. Do not remove existing props.
12. Do not change current practice behavior.
13. Keep changes focused.
14. Test every target screen size.
15. Fix overflow before finishing.

---

# 86. Final Definition of Done

The implementation is complete only when:

- Math Home has a new Math Journey card.
- Existing three topic cards still function exactly as before.
- Math Journey opens a Journey overview.
- Units show correct locked/current/completed states.
- Unit levels unlock sequentially.
- Challenge info displays rules.
- Challenge reuses existing question templates.
- 3-life system functions.
- Correct/wrong feedback functions.
- 80% pass rule functions.
- Results award stars/diamonds correctly.
- Reward farming is prevented.
- Progress persists after refresh.
- Unit completion unlocks the next unit.
- Journey supports mixed-topic challenges.
- UI closely follows the approved reference.
- All Journey screens fit on one viewport.
- No vertical scrolling.
- No horizontal scrolling.
- No clipped primary components.
- Mobile/tablet/desktop are fully responsive.
- Existing practice functions have no regression.
- Performance remains lightweight.

---

# 87. Final Product Structure

```text
MATEMATIK
│
├── Math Operation
│     └── Unlimited Practice
│
├── Math Long Method
│     └── Unlimited Practice
│
├── Clock & Time
│     └── Unlimited Practice
│
└── Math Journey
      │
      ├── Unit 1 — Asas Matematik
      │      ├── Level 1
      │      ├── Level 2
      │      ├── Level 3
      │      ├── Level 4
      │      └── Unit Challenge
      │
      ├── Unit 2 — Nombor & Operasi
      │
      ├── Unit 3 — Jam & Masa
      │
      ├── Unit 4 — Kaedah Panjang
      │
      └── Unit 5 — Cabaran Campuran
             └── Final Mathematics Challenge
```

The existing three Mathematics topics remain **Practice**.

Math Journey becomes the dedicated **Challenge + Progression** system.

This separation is intentional and must remain clear throughout the product.
