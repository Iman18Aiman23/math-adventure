# Math Adventure - UI/UX Layout System Documentation

## Overview

The **Math Adventure** application uses a responsive, dual-layout design that adapts seamlessly between mobile and desktop experiences. The layout is inspired by Duolingo's interface pattern, featuring a sidebar on desktop and a bottom tab bar on mobile.

---

## 1. Root Layout Structure

### #root (Container)
- **Purpose**: Main application wrapper
- **Max Width**: 1280px (centered on desktop)
- **Padding**: 2rem
- **Layout**: Flexbox row that adapts based on screen size

#### Desktop Layout (≥768px)
```
┌─────────────────────────────────────────┐
│  #root (Flexbox Row)                    │
├──────────────────┬──────────────────────┤
│  Desktop Sidebar │  .app-container      │
│   (240px)        │  (Flex: 1)           │
│                  │                      │
│  - Logo          │  - Header            │
│  - Nav Items     │  - Content           │
│  - Footer Stats  │  - Tab Bar (hidden)  │
│                  │                      │
└──────────────────┴──────────────────────┘
```

#### Mobile Layout (<768px)
```
┌──────────────────────────────┐
│  #root (Flexbox Column)      │
├──────────────────────────────┤
│  .app-container              │
│                              │
│  - Header (varies by page)   │
│  - Content                   │
│  - Tab Bar (visible)         │
│                              │
│  .duo-tab-bar                │
│  (5 Tabs at bottom)          │
└──────────────────────────────┘
```

---

## 2. Desktop Sidebar Component

### `.desktop-sidebar` (Left Navigation Panel)

**Display**: Hidden on mobile, visible on desktop (≥768px)
**Structure**: Vertical flex container
**Width**: 240px
**Background**: `#FFF8F0` (light warm cream)
**Height**: 100% (full viewport height)

#### 2.1 Sidebar Logo Section (`.sidebar-logo`)
- **Container**: Flex column, centered, 12px spacing
- **Size**: 56px × 56px
- **Components**:
  - **Mascot Icon**: Iman mascot character (customizable size)
  - **Logo Text (`.sidebar-logo-text`)**: "ImanCore"
    - Font: Fredoka One (decorative)
    - Size: 1.2rem
    - Weight: 900
    - Color: Gradient (blue to light blue)
    - Letter spacing: 1px
  - **Subtitle Text (`.sidebar-subtitle-text`)**: "Learning Hub"
    - Font: Fredoka One
    - Size: 0.75rem
    - Color: `#F4C430` (gold)
    - Letter spacing: 2px
    - Transform: Uppercase

**Interaction**: Clickable → Navigates to home

#### 2.2 Sidebar Navigation (`.sidebar-nav`)
- **Container**: Flex column
- **Padding**: 12px 16px
- **Gap**: 8px
- **Border**: Bottom divider at 12px vertical margin

##### Navigation Items (`.sidebar-item`)
Each navigation button contains:
- **Icon (`.sidebar-item-icon`)**: Font size 1.4rem, width 32px, centered
- **Label**: Navigation text in user's selected language

**Navigation Tabs**:
1. **Learn / Kursus** (id: 'learn')
   - Icon: LearnIcon component
   - Action: Navigate to home page
   
2. **Leaderboard / Papan Juara** (id: 'leaderboard')
   - Icon: LeaderboardIcon component
   - Status: Placeholder (Coming soon)
   
3. **Profile / Profil** (id: 'profile')
   - Icon: ProfileIcon component
   - Displays user stats
   
4. **Language Toggle** (Below divider)
   - Icon: LanguageIcon component
   - Label: Switches between "English" ↔ "Bahasa Melayu"
   - Action: Toggles language state in app

**States**:
- **Hover**: Background `rgba(107, 203, 119, 0.15)`, text color `#2D4059`
- **Active**: Background `rgba(107, 203, 119, 0.25)`, text color `#2D4059`, weight 800

#### 2.3 Sidebar Footer Stats (`.sidebar-footer`)
- **Position**: Bottom of sidebar
- **Padding**: 16px (top/bottom/left/right varies)
- **Border Top**: 1px solid `rgba(255, 255, 255, 0.2)`
- **Margin Top**: 16px auto (pushes to bottom with flex: 1)

##### Statistics Rows (`.sidebar-stat-row`)
Each row displays:
- **Emoji Icon**: Left side (1rem)
- **Label**: Left aligned with 8px gap
- **Value**: Colored text matching stat type

**Stats Displayed**:
1. 👤 Player Name
   - Color: `var(--text-primary)` (gray/dark)
   
2. ⭐ Total XP
   - Color: `var(--duo-yellow)` (#FFC800)
   - Format: "X XP"
   
3. 🏆 Level
   - Color: `var(--duo-purple)` (#CE82FF)
   - Format: "Level X"
   
4. 🔥 Streak
   - Color: `var(--duo-orange)` (#FF9600)
   - Format: "X Streak"
   
5. 💰 Coins
   - Color: `var(--duo-blue)` (#1CB0F6)
   - Format: "X Coins"

---

## 3. Main App Container

### `.app-container` (Main Content Wrapper)
**Purpose**: Primary content container, visible on all screen sizes
**Display**: Flex column
**Height**: 100% (mobile) / Flex: 1 (desktop)
**Responsive**: Becomes right-side column on desktop

#### 3.1 App Content (`.app-content`)
- **Purpose**: Primary content area for pages
- **Position**: Relative (for animations)
- **Flex**: 1 (fills available space)
- **Min Height**: 0 (allows flex shrinking)
- **Overflow**: Vertical scroll
- **Background**: `#ffffff`

##### View Container (`.view-container`)
- **Purpose**: Wraps individual page content
- **Class**: `.swipe-enter` (animation class)
- **Key Prop**: Updates on route/state change (smooth transitions)

**Content Pages**:
1. **HomePage** - Course selection and daily streak
2. **BMPage** - Speaking/Bahasa Melayu learning
3. **JawiPage** - Jawi script learning
4. **MathHome** - Mathematics subject selection
5. **OpsLandingPage** - Math operations menu
6. **TimeGameMenu** - Date/time games menu
7. **ReadingPage** - Reading syllables practice
8. **Placeholder Pages** - Leaderboard, Profile

---

## 4. Header Components

### A. Game Header (`.game-header`)

Used in games and lessons for in-game UI
**Position**: Top of content area
**Display**: Flex, space-between, center alignment
**Height**: `var(--header-h)` = 56px
**Padding**: 0 1rem
**Background**: `var(--bg-white)` (#ffffff)
**Border Bottom**: 2px solid `var(--border-color)` (#E5E5E5)
**Box Shadow**: 0 2px 4px rgba(0, 0, 0, 0.08)

#### 4.1 Header Sections (`.header-section`)
Game header divided into 3 sections:

##### Left Section (`.header-section.left`)
- **Flex**: 0 0 auto
- **Justify**: flex-start
- **Contents**: Back button
  - **Component**: `ArrowLeft` icon (lucide-react)
  - **Size**: 22px
  - **Color**: `#AFAFAF` (gray)
  - **Background**: Transparent
  - **Interaction**: Goes back to previous screen

##### Middle Section (`.header-section.middle`)
- **Flex**: 1 (grows to fill)
- **Justify**: center
- **Contents**: Either progress bar OR title

**Progress Bar (`.lesson-progress-track`)**:
- Width: 100%
- Height: 4px
- Background: `#E5E5E5`
- Border Radius: 2px

**Progress Fill (`.lesson-progress-fill`)**:
- Background: Color varies by game (green/blue/orange)
- Animation: Smooth width transition

**Header Title (`.header-title`)**:
- Font Family: `var(--font-heading)` (Fredoka)
- Font Size: 1rem
- Weight: 800
- Color: `#2D4059`

##### Right Section (`.header-section.right`)
- **Flex**: 0 0 auto
- **Justify**: flex-end
- **Gap**: 8px
- **Contents**: Lives, streak, mute button

**Stats Items (`.stat-item`)**:
- Display: Flex, center
- Gap: 4px

- **Lives Counter**:
  - Color: `#FF4B4B` (red)
  - Display: 3 hearts max
  - Opacity: 100% filled, 20% empty
  
- **Streak Display**:
  - Color: `#FF9600` (orange)
  - Icon: 🔥 (large)
  - Text: Streak number (0.95rem)
  - Weight: 800

**Mute Button**:
- Background: Transparent
- Color: `#AFAFAF`
- Icons: 
  - Muted: `VolumeX` icon
  - Unmuted: `Volume2` icon
- Size: 20px

### B. Home Header (`.duo-home-header`)

Used on the home/dashboard page
**Background**: `var(--bg-white)`
**Padding**: 0.85rem 1.25rem
**Display**: Flex, space-between, center
**Border Bottom**: 1px solid `var(--border-color)`
**Gap**: 1rem

#### 4.2.1 Language Flag (`.duo-home-flag`)
- **Content**: 🇲🇾 Bahasa Malaysia (or Malaysia)
- **Font Size**: 0.9rem
- **Font Weight**: 700
- **Color**: `#2D4059`
- **Gap**: 8px

#### 4.2.2 Stats Display (`.duo-home-stats`)
- **Display**: Flex
- **Gap**: 16px
- **Position**: Right side

**Stat Items** (`.duo-home-stat`):
- Display: Flex, center
- Gap: 6px
- Font Weight: 700
- Font Size: 0.9rem

- **Streak** 🔥:
  - Color: `#FF9600` (orange)
  - Icon: 1.4rem
  
- **Hearts** ❤️:
  - Color: `#FF4B4B` (red)
  - Icon: 1.4rem
  
- **Coins/Gems** 💎:
  - Color: `#CE82FF` (purple)
  - Icon: 1.4rem

### C. Operations Game Header (`.ops-game-header`)

Special header for math operations games
**Display**: Flex, space-between, center
**Padding**: 0 1rem
**Height**: `var(--header-h)` = 56px
**Border Bottom**: 4px solid `var(--border-color)`
**Background**: `var(--bg-white)`
**Flex Shrink**: 0

#### 4.3.1 Header Buttons (`.ops-header-btn`)
- **Width**: 40px
- **Height**: 40px
- **Border Radius**: 50% (circular)
- **Background**: Transparent
- **Color**: `#AFAFAF`
- **Transition**: 0.15s
- **Hover**: Background `#f5f5f5`
- **Active**: Background `#f0f0f0`

#### 4.3.2 Streak Badge (`.ops-streak-badge`)
- **Display**: Flex, center, gap 6px
- **Font Weight**: 800
- **Color**: `#FF9600`
- **Icon**: 🔥

### D. Operations Menu Header (`.ops-menu-header`)

Header for menu pages in math section
**Background**: `var(--bg-white)`
**Padding**: 0 1rem
**Height**: `var(--header-h)`
**Border Bottom**: 2px solid `var(--border-color)`
**Display**: Flex, space-between, center

---

## 5. Main Content Areas

### Page Layouts

#### 5.1 Home Page

**Structure**:
```
.duo-home-header
  ├─ .duo-home-flag
  └─ .duo-home-stats

Content Area (scrollable)
  ├─ Greeting section
  │  ├─ "Selamat Datang" label
  │  └─ "Hei, [PlayerName]! 👋"
  │
  ├─ Daily Streak Card
  │  ├─ 🔥 Icon (2.75rem)
  │  ├─ "[X] Hari Berturut" title
  │  └─ "Terus belajar hari ini!" subtitle
  │
  ├─ "KURSUS ANDA" section header
  │
  └─ Course Cards Grid
     ├─ .duo-course-card (4 courses)
     │  ├─ .duo-course-icon
     │  ├─ .duo-course-info
     │  │  ├─ .duo-course-title
     │  │  ├─ .duo-course-desc
     │  │  └─ .duo-course-progress-bar
     │  └─ .duo-course-cta
     │
     ├─ Course 1: Reading / Belajar Membaca
     │  - Color: #FF6B6B (red/coral)
     │  - Background: #FFF0F0
     │
     ├─ Course 2: Speaking / Belajar Sebutan
     │  - Color: #4ECDC4 (teal)
     │  - Background: #EAFAF8
     │
     ├─ Course 3: Jawi Script / Jawi
     │  - Color: #FFB347 (orange)
     │  - Background: #FFF7EC
     │
     └─ Course 4: Mathematics / Matematik
        - Color: #6BCB77 (green)
        - Background: #EEFBF0
```

**Course Card Details**:
- **Display**: Flex, space-between
- **Padding**: 1rem 1.25rem
- **Border**: 2px solid (course color)
- **Border Radius**: 16px
- **Gap**: 1rem
- **Transition**: 0.2s
- **Hover**: Slight scale and shadow lift
- **Cursor**: Pointer (clickable)

#### 5.2 Profile Page (Profile Placeholder)

**Structure**:
```
Profile Header
  ├─ Mascot Icon (80px)
  ├─ Player Name
  └─ "Level [X] Explorer"

Stats Grid (2 columns)
  ├─ Total XP ⭐ (#FFC800)
  ├─ Coins 💰 (#1CB0F6)
  ├─ Level 🏆 (#CE82FF)
  └─ Streak 🔥 (#FF9600)
```

**Header Section**:
- Background: White
- Padding: 2rem 1.5rem
- Border Bottom: 2px solid #E5E5E5
- Text Alignment: Center

**Stats Grid (`.duo-stats-grid`)**:
- Display: Grid (2 columns)
- Gap: 0.75rem
- Padding: 1.25rem 1rem
- Max Width: 700px

**Stat Cards**:
- Background: White
- Border: 2px solid #E5E5E5
- Border Radius: 16px
- Padding: 1rem
- Text Alignment: Center

---

## 6. Footer / Bottom Tab Bar

### `.duo-tab-bar` (Mobile Bottom Navigation)

**Display**: Flex, space-around, stretch
**Position**: Sticky bottom
**Height**: `var(--tab-bar-h)` = 66px
**Background**: White
**Border Top**: 2px solid `var(--border-color)`
**Box Shadow**: 0 -2px 8px rgba(0, 0, 0, 0.06)
**Padding Bottom**: `calc(var(--safe-bottom))` (for mobile notches)
**Visibility**: Mobile only (hidden on desktop via `.duo-tab-bar { display: none !important }`)

### `.duo-tab-container` (Tab Items Wrapper)

**Updated Behavior (May 2026)**:
- **Display**: Flex
- **Justify-Content**: `space-evenly` (distributes items evenly with equal spacing)
- **Flex-Wrap**: `nowrap` (all items visible, no wrapping)
- **Width**: 100% (full container width)
- **Flex**: 1 (fills available space)

**Previous Issues Fixed**:
- ✅ Removed `overflow-x: auto` (no horizontal scrolling)
- ✅ Removed `scroll-snap-type` (not needed with space-evenly)
- ✅ Removed `scroll-behavior: smooth` (not needed)
- ✅ Added `flex-wrap: nowrap` (ensures items always visible)

#### 6.1 Tab Items (`.duo-tab-item`)

**Structure** (per tab):
```
.duo-tab-item
  ├─ .duo-tab-icon
  │  └─ SVG/Icon component
  └─ .duo-tab-label
     └─ Text label
```

**Styling** (Updated May 2026):
- **Display**: Flex, column, center
- **Flex**: 1 (equal width distribution across all items)
- **Min Height**: 56px (minimum touch target size)
- **Padding**: 10px top (adjusted for better spacing)
- **Background**: Transparent
- **Border**: None
- **Gap**: 6px
- **Font Weight**: 700
- **Font Size**: 0.65rem
- **Color**: `#999` (inactive)
- **Transition**: 0.2s color ease
- **Cursor**: Pointer

**Previous Issues Fixed**:
- ✅ Changed from `flex-shrink: 0; min-width: 80px` to `flex: 1`
- ✅ Removed `scroll-snap-align: start` (not needed without scrolling)
- ✅ Added `min-height: 56px` for consistency

**States**:
- **Hover**: Color `#2D4059`, background `#f5f5f5`
- **Active**: 
  - Border Top Color: 3px solid (tab color)
  - Color: Tab's primary color
  - Font Weight: 800

#### 6.2 Tab Items List

1. **Learn / Kursus** (id: 'learn')
   - Icon: LearnIcon
   - Color: `#2D4059` (blue-gray)
   - Action: Navigate to home

2. **Leaderboard / Ranking** (id: 'leaderboard')
   - Icon: LeaderboardIcon
   - Color: `#4ECDC4` (teal)
   - Status: Placeholder

3. **Profile / Profil** (id: 'profile')
   - Icon: ProfileIcon
   - Color: `#CE82FF` (purple)

4. **Language Toggle**
   - Icon: LanguageIcon
   - Label: Switches between "English" ↔ "BM"
   - Color: `#FFB347` (orange)

#### 6.3 Stats Footer (`.ops-footer-stats`)

Used in game screens at bottom
**Display**: Flex, center, space-around
**Padding**: 0.75rem 1rem + safe-area-bottom
**Background**: White
**Border Top**: 2px solid `var(--border-color)`
**Gap**: 1rem
**Position**: Fixed/Sticky bottom (mobile)

**Stat Components**:
- **Icon**: Large emoji or icon
- **Label**: Stat name
- **Value**: Number or indicator
- **Color**: Theme-specific

---

## 7. Animation & Transitions

### View Transitions
- **Class**: `.swipe-enter`
- **Duration**: 0.3s
- **Easing**: `ease-in-out`
- **Effect**: Slide in from right

### Button Interactions
- **All buttons**: 0.15s transition on background/color
- **Scale**: Minimal (0.98x on active)
- **Touch feedback**: Opacity or background change

### Course Card Animations
- **Class**: `.fade-in`
- **Stagger**: Based on index (i * 0.08s)
- **Effect**: Fade + slight slide up

---

## 8. Responsive Breakpoints

### Mobile (< 768px)
- **Layout**: Single column
- **Sidebar**: Hidden
- **Tab Bar**: Visible (bottom)
- **Content**: Full width minus padding
- **Header**: Sticky top
- **Footer**: Sticky bottom

#### Mobile Landscape Handling (Orientation: Landscape, max-height: 800px)
**Special Considerations**:
- Content extends **edge-to-edge** (no padding)
- No box-shadow on #root for cleaner display
- Body: `justify-content: flex-start` (removes centering)
- #root: `max-width: 100%` with `margin: 0`
- Menu bar uses `justify-content: space-evenly` with `flex-wrap: nowrap`

**Key CSS Rules**:
```css
@media (orientation: landscape) and (max-height: 800px) {
  body { justify-content: flex-start !important; }
  #root {
    max-width: 100% !important;
    width: 100% !important;
    margin: 0 !important;
    box-shadow: none !important;
  }
  .duo-tab-container {
    justify-content: space-evenly;
    flex-wrap: nowrap;
  }
}
```

**Impact**:
- Eliminates left/right gaps on mobile landscape rotation
- Menu bar items distribute evenly across full width
- All tabs visible without scrolling
- Smooth transition when device is rotated

### Tablet (768px - 1023px)
- **Layout**: Sidebar + Content (768px width breakpoint)
- **Sidebar**: Visible (240px fixed)
- **Tab Bar**: Hidden
- **Content**: Flex: 1 (fills remaining space)
- **Max Content**: 700px (centered with margins)

### Desktop (≥ 1024px)
- **Layout**: Sidebar + Content
- **Sidebar**: Fixed 240px width
- **Content**: Centered with max-width
- **Full viewport height**: Utilized

---

## 9. CSS Variables (Theme System)

### Color Variables
```css
--bg-white: #ffffff
--bg-light: #f7f7f7
--text-primary: #3C3C3C
--text-secondary: #AFAFAF
--border-color: #E5E5E5

--duo-yellow: #FFC800 (XP/Stars)
--duo-blue: #1CB0F6 (Coins/Health)
--duo-purple: #CE82FF (Level/Gems)
--duo-orange: #FF9600 (Streak/Fire)
--duo-red: #FF4B4B (Lives/Hearts)
--duo-green: #6BCB77 (Math)
--duo-teal: #4ECDC4 (Speaking)
```

### Layout Variables
```css
--header-h: 56px
--tab-bar-h: 66px
--sidebar-w: 240px (desktop only)
--content-max: 700px
--safe-bottom: env(safe-area-inset-bottom, 0px)
```

### Spacing Variables
```css
--sp-1: 8px
--sp-2: 12px
--sp-3: 16px
--sp-4: 24px
--sp-5: 32px
```

### Font Variables
```css
--font-heading: 'Fredoka One', cursive
--font-body: 'Segoe UI', system-ui, sans-serif
```

---

## 10. Component Summary Table

| Component | Class | Purpose | Visible |
|-----------|-------|---------|---------|
| Root Container | `#root` | Main app wrapper | Always |
| Desktop Sidebar | `.desktop-sidebar` | Left navigation (desktop) | ≥768px |
| App Container | `.app-container` | Main content wrapper | Always |
| App Content | `.app-content` | Scrollable content area | Always |
| Game Header | `.game-header` | In-game top bar | Games/Lessons |
| Home Header | `.duo-home-header` | Dashboard top bar | Home page |
| Tab Bar | `.duo-tab-bar` | Mobile bottom nav | <768px |
| Course Cards | `.duo-course-card` | Course selection | Home page |
| Header Sections | `.header-section` | Header parts (left/middle/right) | With game header |

---

## 11. Key Interaction Patterns

### Navigation Flow
1. **Home Page** → (Click course) → **Course Home** → (Click game) → **Game** → (Back) → **Course Home** → (Back) → **Home**

2. **Sidebar Navigation** (Desktop):
   - Click "Learn" → Home
   - Click "Profile" → Profile stats
   - Click "Leaderboard" → Leaderboard (placeholder)
   - Click "Language" → Toggle language

3. **Mobile Tab Navigation**:
   - Tap "Kursus" → Home
   - Tap "Profil" → Profile
   - Tap "Ranking" → Leaderboard
   - Tap "Language Icon" → Toggle language

### Game Header Interactions
- **Back Button**: Navigate to previous screen
- **Mute Button**: Toggle audio on/off
- **Progress Bar**: Visual feedback of progress
- **Stats**: Real-time updates during gameplay

---

## 12. Accessibility Notes

- **Semantic HTML**: All buttons use `<button>` elements
- **Color Contrast**: Text colors meet WCAG AA standards
- **Touch Targets**: Buttons minimum 44px × 44px
- **Keyboard Navigation**: Tab order follows visual flow
- **Icons**: Always paired with text labels (except clear icons like X)
- **ARIA Labels**: Tooltips on hover for icon-only buttons

---

## 13. File References

**Key Component Files**:
- `src/App.jsx` - Main app logic, layout, and TABS definition for mobile menu bar
- `src/components/DesktopSidebar.jsx` - Sidebar component
- `src/components/GameHeader.jsx` - Game header component
- `src/components/HomePage.jsx` - Home page layout
- `src/components/ReadingPage/ReadingPage.jsx` - Reading page with landscape fixes

**Critical CSS Files**:
- `src/index.css` - **All layout and styling** including:
  - Lines 110-135: `#root` element with landscape media query
  - Lines 206-275: `.duo-tab-bar` and menu bar styling with space-evenly distribution
  - Line 125-135: Landscape orientation media query (@media (orientation: landscape) and (max-height: 800px))
- `src/App.css` - Desktop container styling (mostly unused after refactor)

**Icon Files**:
- `src/components/icons/SidebarIcons.jsx` - Sidebar navigation icons (LearnIcon, etc.)
- `src/components/icons/CourseIcons.jsx` - Course card icons
- `src/components/icons/MascotIcon.jsx` - Iman mascot character

**Icon Files**:
- `src/components/icons/SidebarIcons.jsx` - Sidebar navigation icons
- `src/components/icons/CourseIcons.jsx` - Course card icons
- `src/components/icons/MascotIcon.jsx` - Iman mascot character

---

## 14. Mobile Responsiveness Best Practices & Fixes

### Root Container Constraints (May 2026 Update)

**Issue**: Mobile devices showed left/right gaps when rotated to landscape orientation.

**Root Causes Identified**:
1. `#root { max-width: 480px; margin: 0 auto; }` - Constrained width with centering
2. `body { justify-content: center; }` - Centered content on wider screens
3. Menu bar used horizontal scrolling instead of space distribution
4. ReadingPage had unused `.app-container` CSS creating conflicting padding

**Solutions Implemented**:

#### 1. Root Element Constraints (src/index.css)
```css
/* Desktop default */
#root {
  max-width: 480px;
  margin: 0 auto;
  box-shadow: 0 0 40px rgba(0,0,0,0.15);
}

/* Mobile landscape fix */
@media (orientation: landscape) and (max-height: 800px) {
  body {
    justify-content: flex-start !important;
  }
  #root {
    max-width: 100% !important;
    width: 100% !important;
    margin: 0 !important;
    box-shadow: none !important;
  }
}
```

#### 2. Menu Bar Distribution (src/index.css)
```css
.duo-tab-container {
  display: flex;
  flex: 1;
  justify-content: space-evenly;  /* Even distribution */
  align-items: stretch;
  gap: 0;
  flex-wrap: nowrap;  /* No wrapping */
  width: 100%;
}

.duo-tab-item {
  flex: 1;  /* Equal width items */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 56px;
}
```

#### 3. ReadingPage Cleanup
- Removed unused `.app-container` CSS definition with conflicting padding
- Applied `clamp()` for responsive padding that scales properly
- Added landscape-specific classes for content areas

### Testing Landscape Responsiveness

**Device Rotation Test**:
1. Rotate mobile device to landscape
2. Verify NO gaps on left/right edges
3. Check menu bar extends fully to both sides
4. Confirm all tabs visible without scrolling

**Supported Breakpoint**: Devices with max-height ≤ 800px in landscape
- iPhone 5/6/7/8: ~667px portrait → ~375px landscape ✓
- iPhone 11/12/13: ~812px portrait → ~375px landscape ✓
- iPad Mini: ~1024px landscape (desktop mode, sidebar shown)
- Honor 400 Lite: Tested and verified ✓

### Future Development Guidelines

**Do's**:
- ✅ Use `justify-content: space-evenly` for even distribution
- ✅ Use `flex-wrap: nowrap` to prevent item wrapping
- ✅ Use `flex: 1` for items that should grow equally
- ✅ Test landscape orientation on all device sizes
- ✅ Remove `overflow-x: auto` if content should not scroll horizontally
- ✅ Use `max-width: 100%` for mobile containers

**Don'ts**:
- ❌ Don't use `overflow-x: auto` without proper scroll handling
- ❌ Don't use `margin: 0 auto` on root containers for mobile
- ❌ Don't use `justify-content: center` on full-width containers
- ❌ Don't leave unused CSS classes with conflicting styles
- ❌ Don't use fixed `min-width` that prevents responsive scaling
- ❌ Don't forget to test landscape rotation

### Commits Related to Mobile Responsiveness
- `ff24ad6`: Remove unused `.app-container` CSS from ReadingPage
- `042701d`: Fix mobile landscape rotation layout gaps
- `a4cd264`: Aggressive landscape mode fix (remove all padding/margins)
- `db02694`: Refine landscape mode (target both wrapper and content)
- `f2c5fff`: Fix gaps in index.css #root styling
- `4516af0`: Fix menu bar gap by removing body centering
- `29b6486`: Make mobile menu bar use space-evenly distribution

---

## 15. Summary

The **Math Adventure** UI is built with a **mobile-first responsive design**:

- **Mobile**: Bottom-tab navigation, full-width content
- **Desktop**: Left sidebar navigation, centered content
- **Consistent headers**: Game headers for lessons, home headers for dashboard
- **Color-coded sections**: Each course has distinct color theming
- **Smooth animations**: Swipe transitions between pages
- **Bilingual support**: All text supports Bahasa Melayu and English

This documentation provides the complete structure for understanding, maintaining, and extending the UI/UX system.
