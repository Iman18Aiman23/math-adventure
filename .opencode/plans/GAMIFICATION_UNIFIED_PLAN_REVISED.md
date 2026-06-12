# Unified Gamification — BM / Matematik / Pendidikan Islam (REVISED)

> **Goal:** Standardise all three KSSR subjects (Bahasa Melayu, Matematik, Pendidikan Islam) under one Duolingo-style gamification system — shared XP, streaks, crowns, unlocking, review, and dashboard. The storage layer is designed for seamless migration from localStorage to MySQL/NoSQL later.
>
> **Key Changes from v1:**
> - **Critical gaps patched:** localStorage quota + cross-tab sync + rate limiting + error recovery + offline conflict resolution + TypeScript types
> - **Timeline realistic:** Phase 0 (+2 days), Phase 1 (+2 days), Phase 5 (+5 days) = **36-37 days total** (suggest 5-6 weeks)
> - **UX/A11y:** Accessibility spec + mobile guidelines + analytics events + user onboarding + dark mode
> - **Post-launch:** Phases 6-7 deferred to week 3+ (focus on solid core first)

---

## Table of Contents

1. [Current State](#1-current-state)
2. [Architecture](#2-architecture)
3. [Storage Schema](#3-storage-schema)
4. [XP Economy](#4-xp-economy)
5. [Critical Gaps & Mitigations](#5-critical-gaps--mitigations)
6. [Phase 0: Shared Foundation (REVISED)](#6-phase-0-shared-foundation-revised)
7. [Phase 1: XP Tracking (REVISED)](#7-phase-1-xp-tracking-revised)
8. [Phase 2: Streaks & Daily Goals](#8-phase-2-streaks--daily-goals)
9. [Phase 3: Crown Mastery](#9-phase-3-crown-mastery)
10. [Phase 4: Progressive Unlocking](#10-phase-4-progressive-unlocking)
11. [Phase 5: Legacy Consolidation (REVISED)](#11-phase-5-legacy-consolidation-revised)
12. [Phase 6: Review Mode (DEFERRED)](#12-phase-6-review-mode-deferred)
13. [Phase 7: Unified Dashboard (DEFERRED)](#13-phase-7-unified-dashboard-deferred)
14. [Phase 8: API Migration Readiness](#14-phase-8-api-migration-readiness)
15. [File Change Inventory](#15-file-change-inventory)
16. [Revised Timeline](#16-revised-implementation-timeline)
17. [Testing Plan](#17-testing-plan)
18. [Post-Launch Roadmap](#18-post-launch-roadmap)

---

## 1. Current State

*(Identical to v1 — see original document)*

---

## 2. Architecture

*(Identical to v1 — see original document)*

---

## 3. Storage Schema

Expanded to include quota tracking and data compression metadata:

```json
{
  "userId": "uuid-v4",
  "storageMetadata": {
    "version": 2,
    "quotaBytes": 512000,
    "quotaUsed": 245000,
    "lastCompression": "2026-06-12T10:00:00Z",
    "compressionEnabled": true
  },
  "player": {
    "xp": 1840,
    "coins": 156,
    "level": 5,
    "createdAt": "2026-06-01T00:00:00Z",
    "updatedAt": "2026-06-11T12:00:00Z",
    "_version": 42
  },
  "subjects": {
    "bm": {
      "topics": {
        "1-1-1-mendengar-menyebut": {
          "crownLevel": 4,
          "lastPracticed": "2026-06-10T15:30:00Z",
          "xpEarned": 340,
          "bestScore": 14,
          "bestTotal": 15,
          "attempts": 6,
          "wrongQuestions": ["Api", "Orang"]
        }
      }
    },
    "mt": { "topics": {} },
    "pi": { "topics": {} }
  },
  "streak": {
    "count": 7,
    "lastActiveDate": "2026-06-10",
    "highestStreak": 14,
    "freezesAvailable": 1,
    "goalXP": 50,
    "_version": 8
  },
  "dailyLogs": {
    "2026-06-10": {
      "xp": 120,
      "sessions": [
        { "source": "quiz", "topicId": "nombor-100", "subject": "mt", "xpEarned": 60, "timestamp": "2026-06-10T10:30:00Z" }
      ],
      "subjects": ["mt", "bm"]
    },
    "_archived": {
      "2026-05-01_to_2026-05-31": "base64-compressed-blob"
    }
  }
}
```

**New Fields:**
- `storageMetadata._version` on `player` and `streak` — optimistic locking for cross-tab sync
- `storageMetadata.quotaBytes / quotaUsed / compressionEnabled` — quota monitoring
- `dailyLogs._archived` — old logs compressed and archived (keep last 30 days live)

---

## 4. XP Economy

*(Identical to v1 — see original document)*

---

## 5. Critical Gaps & Mitigations

### 5.1 localStorage Quota Management

**Problem:** localStorage ~5 MB limit. At 200 daily sessions × 180 bytes/session + other data = ~400KB/year/user. After 2-3 years, quota exceeded → app crashes.

**Solution:**
- **Quota Monitoring** (Phase 0): Check `localStorage.length` vs ~5 MB estimate; warn at 80%
- **Auto-Archiving** (Phase 0): Daily logs >30 days old → compress to gzip + base64, store in `_archived` bucket
- **Compression** (Phase 0): Wrong question arrays → keep only last 10 per topic; compress old crown data
- **User Control** (Phase 5): Add "Clear Old Data" button in settings (keeps only last 30 days)

```js
// In LocalGamificationRepo.js:
function estimateSize(obj) {
  return new Blob([JSON.stringify(obj)]).size;
}

async getQuotaStatus(userId) {
  const store = read();
  const used = estimateSize(store);
  return { 
    used, 
    limit: 5242880, 
    percentage: (used / 5242880) * 100 
  };
}

async archiveOldLogs(userId) {
  // Move logs >30 days old to _archived.{date-range}.gz
  // Implement weekly cleanup task
}
```

### 5.2 Cross-Tab Synchronization

**Problem:** User opens app in 2 tabs → both read localStorage, modify independently → last write wins, data loss.

**Solution:**
- **Optimistic Locking** (Phase 0): Each `player` and `streak` record has `_version` field (integer, increments on write)
- **Conflict Resolution** (Phase 0): On write conflict (version mismatch), merge:
  - `player`: take max XP, max coins, max level
  - `streak`: take max count + highestStreak, most recent lastActiveDate
  - `topics`: take max crownLevel + attempts
  
- **Storage Event Listener** (Phase 0): Listen to `storage` event (fired when tab A writes); trigger reload if version changed

```js
// In LocalGamificationRepo.js:
async savePlayerData(userId, data) {
  const store = read() || {};
  const current = store.player || { _version: 0 };
  
  if (data._version && data._version !== current._version) {
    // Conflict: merge intelligently
    const merged = {
      xp: Math.max(data.xp, current.xp),
      coins: Math.max(data.coins, current.coins),
      level: Math.max(data.level, current.level),
      _version: current._version + 1,
      ...data
    };
    store.player = merged;
  } else {
    data._version = (current._version || 0) + 1;
    store.player = data;
  }
  write(store);
}

// Listen for changes from other tabs:
window.addEventListener('storage', (e) => {
  if (e.key === STORAGE_KEY) {
    // Reload gamification data
    window.dispatchEvent(new CustomEvent('gamification-sync'));
  }
});
```

### 5.3 Rate Limiting for XP Awards

**Problem:** No protection against spam. User can (a) click "correct" repeatedly, or (b) inspect console and call `awardXP(999)`.

**Solution:**
- **Time-based throttling** (Phase 1): Reject awards <2s apart (client-side soft check; not security)
- **Suspicious pattern logging** (Phase 1): Log awards to client-side audit trail (subject, XP, timestamp); flag >3 awards/second
- **Server-side validation** (Phase 8): When API introduced, validate against submitted answers server-side

```js
// In useGamification.js:
const AWARD_COOLDOWN_MS = 2000;
let lastAwardTime = 0;

const awardXP = useCallback(async (amount, source = 'quiz', topicId = null, sub = subject) => {
  const now = Date.now();
  if (now - lastAwardTime < AWARD_COOLDOWN_MS && source === 'quiz') {
    console.warn('[Gamification] Award throttled; too frequent');
    return;
  }
  lastAwardTime = now;
  
  // Log suspicious patterns
  if (amount > 500) {
    console.warn(`[Gamification] Unusually high XP award: ${amount}. Source: ${source}`);
  }
  
  // ... proceed with award
}, [repo, uid]);
```

### 5.4 Error Handling & Data Corruption Recovery

**Problem:** If localStorage JSON corrupts (partial write, user clears data mid-session), no graceful fallback.

**Solution:**
- **Try-catch with defaults** (Phase 0): On parse error, log and return safe defaults (player starts fresh)
- **Data repair UI** (Phase 5): Add "Repair Data" button in settings (triggers `validateAndRepair()`)
- **Validation function** (Phase 0): Check required fields on read; reconstruct missing nested objects

```js
// In LocalGamificationRepo.js:
function read() {
  try { 
    const r = localStorage.getItem(STORAGE_KEY); 
    if (!r) return null;
    const parsed = JSON.parse(r);
    // Validate structure
    if (!parsed.player || typeof parsed.player.xp !== 'number') {
      throw new Error('Invalid player structure');
    }
    return parsed;
  } catch (e) {
    console.error('[LocalGamificationRepo] Parse error:', e);
    return null; // Triggers defaults in getPlayerData()
  }
}

async validateAndRepair(userId) {
  const store = read();
  if (!store) return { status: 'corrupted', fixed: false };
  
  const fixed = {
    userId: store.userId || crypto.randomUUID(),
    player: store.player || { xp: 0, coins: 0, level: 1, _version: 0 },
    subjects: store.subjects || { bm: {}, mt: {}, pi: {} },
    streak: store.streak || { count: 0, lastActiveDate: null, _version: 0 },
    dailyLogs: store.dailyLogs || {},
    storageMetadata: store.storageMetadata || { version: 2, quotaBytes: 512000 }
  };
  
  write(fixed);
  return { status: 'repaired', fixed: true };
}
```

### 5.5 Offline Persistence & Sync Conflict Resolution

**Problem:** User earns XP offline → API comes back online → which version wins?

**Solution:**
- **Pending Queue** (Phase 8, DualWriteRepo): Buffer all writes while offline in `_pendingQueue`
- **Timestamp-based merge** (Phase 8): On sync, compare timestamps; prefer later write
- **Exponential backoff** (Phase 8): API retry with 1s → 2s → 4s → 8s → 16s → 32s delays
- **User notification** (Phase 5): Show "Syncing..." badge while queue processing

```js
// In DualWriteRepo.js:
export class DualWriteRepo extends GamificationRepository {
  constructor(local, api) {
    this.local = local;
    this.api = api;
    this.pending = [];
    this.online = navigator.onLine;
    window.addEventListener('online', () => this.sync());
    window.addEventListener('offline', () => { this.online = false; });
  }

  async savePlayerData(userId, data) {
    const timestamped = { ...data, _syncTime: Date.now() };
    await this.local.savePlayerData(userId, timestamped);
    
    if (this.online) {
      try {
        await this.api.savePlayerData(userId, timestamped);
      } catch (e) {
        console.warn('API write failed, queued for retry:', e);
        this.pending.push({ method: 'savePlayerData', args: [userId, timestamped] });
        this.scheduleRetry();
      }
    } else {
      this.pending.push({ method: 'savePlayerData', args: [userId, timestamped] });
    }
  }

  async sync() {
    let retries = 0;
    const maxRetries = 5;
    
    while (this.pending.length > 0 && retries < maxRetries) {
      const task = this.pending[0];
      try {
        await this.api[task.method](...task.args);
        this.pending.shift();
        retries = 0;
      } catch (e) {
        retries++;
        const delay = Math.min(1000 * Math.pow(2, retries), 32000);
        await new Promise(r => setTimeout(r, delay));
      }
    }
  }
}
```

### 5.6 TypeScript Definitions

**Problem:** No type safety for consumers; IDE autocomplete fails.

**Solution:** Create `src/types/gamification.d.ts` (see separate doc `GAMIFICATION_TYPES.md`)

**Key Interfaces:**
- `PlayerStats` — xp, coins, level, createdAt, updatedAt
- `TopicProgress` — crownLevel, lastPracticed, xpEarned, bestScore, bestTotal, attempts, wrongQuestions
- `StreakData` — count, lastActiveDate, highestStreak, freezesAvailable, goalXP
- `DailyLogEntry` — date, source, topicId, subject, xpEarned, timestamp
- `GamificationRepository` — abstract interface
- `GamificationHookReturn` — return type of `useGamification()`

---

## 6. Phase 0: Shared Foundation (REVISED)

**Timeline: Days 1–5 (was 1–3; +2 days for critical gaps)**

### Deliverables

Create 9 shared infrastructure files (was 7; +2 new):

| File | Purpose |
|:-----|:--------|
| `src/services/GamificationRepo.js` | Abstract interface base class |
| `src/services/LocalGamificationRepo.js` | localStorage implementation + quota + versioning + error handling |
| `src/services/UserId.js` | UUID utility |
| `src/services/gamificationConstants.js` | XP rates, level thresholds, crown levels |
| `src/contexts/GamificationContext.js` | React Context + Provider |
| `src/hooks/useGamification.js` | Unified hook + rate limiting |
| `src/services/legacyMigration.js` | Legacy data absorption |
| **`src/types/gamification.d.ts`** | TypeScript definitions (NEW) |
| **`src/services/QuotaManager.js`** | Quota monitoring + archiving (NEW) |

### Key Changes vs v1

1. **LocalGamificationRepo enhancements:**
   - Add `_version` field management (optimistic locking)
   - Add storage event listener (cross-tab sync)
   - Add error recovery in `read()` function
   - Add `validateAndRepair()` method

2. **useGamification enhancements:**
   - Add rate limiting in `awardXP()` (2s cooldown)
   - Add suspicious pattern logging
   - Call `tick()` on streak after award (Phase 2 integrated)

3. **New QuotaManager service:**
   ```js
   export function getQuotaStatus() { /* returns % used */ }
   export function archiveOldLogs(daysToKeep = 30) { /* compress + archive */ }
   export function estimateSize(obj) { /* returns bytes */ }
   ```

4. **App.jsx changes** (same as v1):
   - Replace `GameStateContext` with `GamificationProvider`
   - Import `legacyMigration.migrateLegacyData()` in useEffect on mount
   - Call it once, log result

### Testing Checklist (Phase 0)

- ✓ Create localStorage key, write player data, read back (no corruption)
- ✓ Parse error: JSON.parse fails → recovers to defaults
- ✓ Two tabs: write in tab A, tab B receives `storage` event, reloads data
- ✓ Version conflict: both tabs increment player.xp simultaneously → merge takes max
- ✓ Quota status: estimateSize() returns reasonable byte count
- ✓ Rate limit: awardXP() called twice <2s apart → 2nd call rejected
- ✓ Legacy migration: old `mathAdventureData` present → absorbed into new format

---

## 7. Phase 1: XP Tracking (REVISED)

**Timeline: Days 6–12 (was 4–8; +2 days for phased rollout)**

### Phased Rollout Strategy

**Day 6–7: BM Only**
- Integrate `useGamification('bm')` into `BMLessonQuizLayout.jsx`
- On correct answer: `gamification.awardXP(10, 'quiz', topicId)`
- On quiz finish: `gamification.completeTopicAttempt(topicId, score, total, wrongAnswers)`
- Add StatsBar (temporary, will be moved to layout in Phase 7)
- **Test thoroughly** on all BM topics before moving to MT

**Day 8–9: Matematik (All 26 games)**
- Integrate `useGamification('mt')` into all 26 game files in `Tahun*/Module*/`
- Same XP award pattern as BM
- **Test on subset** (Tahun1 Module1) before rolling out all 9 hubs

**Day 10–11: Pendidikan Islam**
- Integrate `useGamification('pi')` into `Tahun1LessonScrollLayout.jsx`
- Replace emoji confetti in `Celebration.jsx` with `canvas-confetti`
- Sync confetti pattern across all subjects

**Day 12: Cross-Subject Testing**
- Verify XP shared across subjects (earn XP in BM, check total in MT)
- Verify no subject name conflicts
- Test roll-back: disable all XP awards, verify no console errors

### Confetti Standardisation

Update PI's `Celebration.jsx`:
```jsx
import confetti from 'canvas-confetti';
import { playSound } from '../utils/soundManager';

export function Celebration() {
  playSound('correct');
  confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 }, scalar: 0.8 });
  return null;
}
```

### New Components (P1)

| Component | File | Purpose |
|-----------|------|---------|
| StatsBar | `src/components/_shared/StatsBar.jsx` | Shows 🔥 streak, ⭐ XP, Lv, 🪙 coins (temp in quiz layouts; moved to persistent header in P7) |
| AnimatedCounter | `src/components/_shared/AnimatedCounter.jsx` | Animates XP gain from 0 → earned amount over 1s |

### Testing Checklist (P1)

- ✓ Answer correct in BM → XP increments by 10
- ✓ Answer correct in MT → shared player.xp increments
- ✓ Answer correct in PI → shared player.xp increments
- ✓ Earn 10 XP → +1 coin
- ✓ Streak 3 correct answers → quiz shows "+5 streak bonus"
- ✓ Complete quiz → crownLevel increments (test in P3 when crown display added)
- ✓ Cross-subject: BM 50 XP + MT 40 XP → total 90 XP visible in both subjects
- ✓ PI confetti fires on correct → canvas-confetti, not emoji

---

## 8. Phase 2: Streaks & Daily Goals

**Timeline: Days 13–14 (unchanged)**

*(See original document; no changes to architecture)*

### Integration Notes

- Call `useDailyStreak()` in App.jsx root level (not per-subject)
- Pass `todayXP` from daily logs to `useDailyStreak()` hook
- `tick()` is called inside `useGamification.awardXP()` after any XP award

---

## 9. Phase 3: Crown Mastery

**Timeline: Days 15–18 (unchanged)**

*(See original document; crown display logic identical)*

---

## 10. Phase 4: Progressive Unlocking

**Timeline: Days 19–21 (unchanged)**

*(See original document; prerequisite system identical)*

---

## 11. Phase 5: Legacy Consolidation (REVISED)

**Timeline: Days 22–31 (was 18–22; +5 days for 20+ file migration)**

### Realistic Scope Breakdown

This phase touches 20+ consumer files. Spread across 8 days:

**Days 22–23: Jawi Games + AppHeader**
- Migrate `JawiSyllablesGame.jsx` → `useGamification('pi')`
- Migrate `Jawi100WordsGame.jsx` → `useGamification('pi')`
- Update `AppHeader.jsx` to read from `useGamification()` instead of `gameStatsManager`
- Test Jawi games + header stats display

**Days 24–25: Reading + Speaking Pages**
- Migrate 6 reading games → `useGamification('reading')`
- Migrate 2 speaking games → `useGamification('speaking')`
- Update `ReadingPage.jsx` + `SpeakingPage.jsx` to display stats
- Test all games + cross-subject XP visible

**Days 26–27: Math Age-Groups + Dashboard Pages**
- Migrate 6 MathematicsPage age-group games → `useGamification('math-age')`
- Update `MathematicsPage.jsx` to display stats
- Update `ProfileHome.jsx`, `LeaderboardHome.jsx`, `AchievementHome.jsx` to read from new system
- Test profile page displays correct XP + coins

**Day 28–29: Heart Shop + Sidebars**
- Update `HeartShopModal.jsx` to use new coin economy (coins → hearts exchange rate TBD)
- Update `DesktopSidebar.jsx` to read `gamification.xp`, `gamification.coins` instead of `gameStatsManager`
- Add "Data Repair" button in settings (calls `repo.validateAndRepair()`)

**Days 30–31: Cleanup + Testing**
- Delete deprecated files:
  - `src/hooks/useGameState.js`
  - `src/utils/gameStatsManager.js`
  - `src/services/storageService.js`
- Remove `GameStateContext` from App.jsx entirely
- Verify no console errors; test all legacy consumers work
- Full cross-subject XP tracking test

### Testing Checklist (P5)

- ✓ AppHeader shows XP + coins from new system
- ✓ Reading game XP increments shared player.xp
- ✓ Speaking game XP increments shared player.xp
- ✓ Jawi games use new system
- ✓ ProfileHome displays correct level + XP
- ✓ LeaderboardHome displays user rank (by XP)
- ✓ AchievementHome displays progress toward achievements
- ✓ HeartShopModal coin→heart exchange works
- ✓ No console errors after removing deprecated files
- ✓ App works in new mode (no old `GameStateContext` references)

---

## 12. Phase 6: Review Mode (DEFERRED)

**Status: Post-launch (Week 3+)**

Rationale: Review mode requires central question bank per subject, which is complex. Focus on core XP/crowns/streaks first; add review after 1-2 weeks of real user feedback.

### Planned for Later

- `src/hooks/useReviewMode.js` — weighted question pool
- Review button in each subject's module hub
- Subject-specific question bank integration

---

## 13. Phase 7: Unified Dashboard (DEFERRED)

**Status: Post-launch (Week 3+)**

Rationale: Dashboard complex (6 sub-components); defer to allow core features stabilization. Analytics from Phase 5 will inform dashboard priorities.

### Planned for Later

- `src/components/_shared/StatsBar.jsx` — move from P1 temp location to persistent header
- `src/components/Dashboard/ProgressDashboard.jsx` — full-page stats
- Analytics events (see separate section)
- Dark mode variants

---

## 14. Phase 8: API Migration Readiness

**Timeline: Days 32–34 (unchanged, but now comes AFTER phases 1-5 stabilize)**

*(See original document; REST API + DualWrite + MySQL DDL identical)*

### Phase 8 Enhancements

- Implement offline sync queue (resolve with timestamp-based merging)
- Add exponential backoff for API retries
- Test offline→online transition with queued XP

---

## 15. File Change Inventory

### New Files (16, was 14; +2 for critical gaps)

| File | Phase | Purpose |
|:-----|:------|:--------|
| `src/services/GamificationRepo.js` | P0 | Abstract interface |
| `src/services/LocalGamificationRepo.js` | P0 | localStorage impl (enhanced: versioning, quota, error handling) |
| `src/services/UserId.js` | P0 | UUID utility |
| `src/services/gamificationConstants.js` | P0 | XP rates, level thresholds |
| `src/services/legacyMigration.js` | P0 | Legacy data absorption |
| **`src/services/QuotaManager.js`** | P0 | Quota monitoring + archiving (NEW) |
| **`src/types/gamification.d.ts`** | P0 | TypeScript definitions (NEW) |
| `src/contexts/GamificationContext.js` | P0 | React Context + Provider |
| `src/hooks/useGamification.js` | P0 | Unified hook (enhanced: rate limiting) |
| `src/hooks/useDailyStreak.js` | P2 | Streak + daily goal |
| `src/hooks/useReviewMode.js` | P6 | Review/retention (DEFERRED) |
| `src/components/_shared/StatsBar.jsx` | P1 | Persistent top bar (temp in P1, finalized in P7 DEFERRED) |
| `src/components/_shared/AnimatedCounter.jsx` | P1 | Animated XP counter |
| `src/components/Dashboard/ProgressDashboard.jsx` | P7 | Full dashboard (DEFERRED) |
| `src/services/ApiGamificationRepo.js` | P8 | REST implementation |
| `src/services/DualWriteRepo.js` | P8 | Migration bridge |

### Modified Files (~60+, unchanged from v1)

*(See original document for full list)*

---

## 16. Revised Implementation Timeline

```
PHASE 0 — Foundation (Days 1–5, was 1–3)
  Day 1: Create 7 service + context files + types + quota manager
  Day 2: Integrate versioning + cross-tab sync + error recovery
  Day 3: Write legacyMigration.js; integrate into App.jsx
  Day 4: Test all Phase 0 scenarios (quota, cross-tab, error handling)
  Day 5: Manual testing with real legacy data; verify no regressions

PHASE 1 — XP Tracking (Days 6–12, was 4–8)
  Day 6–7: BM only: useGamification('bm') in BMLessonQuizLayout; test thoroughly
  Day 8–9: MT: integrate into all 26 games; subset test first, then full rollout
  Day 10–11: PI: useGamification('pi') in Tahun1LessonScrollLayout; fix confetti
  Day 12: Cross-subject XP testing; verify all subjects share player.xp

PHASE 2 — Streaks (Days 13–14, unchanged)
  Day 13: useDailyStreak.js hook + tick() integration
  Day 14: Streak UI in all subject pages

PHASE 3 — Crowns (Days 15–18, unchanged)
  Day 15: Crown display in BM hubs
  Day 16: Crown display in all MT hubs
  Day 17: Crown display in PI hubs
  Day 18: Crown progression testing

PHASE 4 — Progressive Unlocking (Days 19–21, unchanged)
  Day 19: Add prerequisites to BM ModuleData.js + hub locking
  Day 20: Add prerequisites to MT hubs
  Day 21: Add prerequisites to PI hubs

PHASE 5 — Legacy Consolidation (Days 22–31, was 18–22)
  Day 22–23: Jawi + AppHeader
  Day 24–25: Reading + Speaking
  Day 26–27: Math age-groups + Profile/Leaderboard/Achievement
  Day 28–29: HeartShop + Sidebars + Settings "Data Repair" button
  Day 30–31: Remove deprecated files; full integration testing

PHASE 6 — Review Mode (DEFERRED → Week 3+)
PHASE 7 — Dashboard (DEFERRED → Week 3+)

PHASE 8 — API Readiness (Days 32–34, was 28–30)
  Day 32: ApiGamificationRepo + DualWriteRepo + offline queue
  Day 33: Migration verification + exponential backoff testing
  Day 34: Documentation + final cross-subject testing

Total: 34 days → 7 weeks (realistic pace with full testing between phases)
```

---

## 17. Testing Plan

### Phase 0 Manual Tests

| Test | Scenario | Pass Condition |
|:-----|:---------|:---------------|
| localStorage write | Save player data | Data persists across page reload |
| Quota status | Check quota % | Returns <50% initially |
| Parse error recovery | Corrupt JSON, reload | App loads with defaults, no error thrown |
| Cross-tab sync | Write in tab A, open tab B | Tab B receives `storage` event, reloads |
| Version conflict | Simultaneous xp increment | Both merged; final xp = max(both) |
| Rate limit | awardXP() called twice <2s apart | 2nd call rejected with console warning |

### Phase 1 Manual Tests

| Test | Subject | Expected |
|:-----|:--------|:---------|
| Correct answer → +10 XP | BM, MT, PI | player.xp increments by 10 |
| 3 correct answers → streak bonus | All | Quiz summary shows "+15 XP (streak)" |
| Earn 10 XP → +1 coin | All | player.coins increments |
| Complete quiz → crown update | All | topic.crownLevel increments |
| Cross-subject total | BM + MT | BM 50 XP + MT 40 XP = 90 total visible in both |
| PI confetti | PI quiz correct | canvas-confetti fires (not emoji) |

### Phase 2-5 Tests

*(See original document for full checklist)*

---

## 18. Post-Launch Roadmap

**Week 2 (Days 35–42): Analytics & Monitoring**
- Implement analytics event tracking (all awardXP calls log event)
- Build internal dashboard: "Unique active users", "Avg XP/day", "Engagement by subject"
- Monitor localStorage quota usage across user base

**Week 3 (Days 43–56): Review Mode + Dashboard**
- Implement Phase 6 (useReviewMode.js)
- Implement Phase 7 (ProgressDashboard.jsx + persistent StatsBar)
- Add dark mode variants

**Week 4 (Days 57–70): Achievements + Notifications**
- Design 10–15 achievements (e.g., "Reach Level 5", "7-day streak", "All crowns in BM")
- Implement NotificationManager hook (toast on level-up, streak milestone, daily goal)
- A/B test XP rates (half users get 1.2× XP; measure engagement)

**Week 5+: Refinement + API Migration**
- Based on user data, tune XP economy if needed
- Deploy Phase 8 (API migration) with DualWrite → ApiGamification swap
- Full rollback test

---

## Appendix: Critical Gap Mitigation Summary

| Gap | v1 Status | v2 Status | Owner | Deadline |
|-----|-----------|-----------|-------|----------|
| localStorage quota | ❌ Missing | ✅ Phase 0 (QuotaManager) | Implementation | Day 5 |
| Cross-tab sync | ❌ Missing | ✅ Phase 0 (versioning + event listener) | Implementation | Day 5 |
| Rate limiting | ❌ Missing | ✅ Phase 1 (2s cooldown) | Implementation | Day 12 |
| Error recovery | ❌ Missing | ✅ Phase 0 (try-catch + repair UI) | Implementation | Day 29 |
| Offline sync | ⚠️ Vague | ✅ Phase 8 (timestamp merge + backoff) | Implementation | Day 34 |
| TypeScript types | ❌ Missing | ✅ Phase 0 (gamification.d.ts) | Design doc | Now |

---

> **Implementation Status:** Ready to begin Phase 0. See accompanying docs:
> - `GAMIFICATION_TYPES.md` — TypeScript definitions
> - `GAMIFICATION_A11Y_MOBILE_SPEC.md` — Accessibility + responsive guidelines
> - `GAMIFICATION_UI_MOCKUPS.md` — StatsBar, Crown, Dashboard designs
