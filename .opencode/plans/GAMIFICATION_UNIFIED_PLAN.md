# Unified Gamification — BM / Matematik / Pendidikan Islam

> **Goal:** Standardise all three KSSR subjects (Bahasa Melayu, Matematik, Pendidikan Islam) under one Duolingo-style gamification system — shared XP, streaks, crowns, unlocking, review, and dashboard. The storage layer is designed for seamless migration from localStorage to MySQL/NoSQL later.
>
> **Decisions:**
> - **Unified** — one repo layer + hooks with subject namespace; shared XP/level/streak across all 3 subjects
> - **Consolidate** — new system replaces both existing `useGameState` (System A) and `gameStatsManager` (System B)
> - **Feature-first across all 3** — build one feature (e.g. XP tracking) across BM + MT + PI simultaneously
>
> **Status:** Plan ready
> **Target:** Incremental delivery over 8 phases (~4 weeks)

---

## Table of Contents

1. [Current State](#1-current-state)
2. [Architecture](#2-architecture)
3. [Storage Schema](#3-storage-schema)
4. [XP Economy](#4-xp-economy)
5. [Phase 0: Shared Foundation](#5-phase-0-shared-foundation)
6. [Phase 1: XP Tracking (All 3 Subjects)](#6-phase-1-xp-tracking-all-3-subjects)
7. [Phase 2: Streaks & Daily Goals](#7-phase-2-streaks--daily-goals)
8. [Phase 3: Crown Mastery](#8-phase-3-crown-mastery)
9. [Phase 4: Progressive Unlocking](#9-phase-4-progressive-unlocking)
10. [Phase 5: Legacy Consolidation](#10-phase-5-legacy-consolidation)
11. [Phase 6: Review Mode](#11-phase-6-review-mode)
12. [Phase 7: Unified Dashboard](#12-phase-7-unified-dashboard)
13. [Phase 8: API Migration Readiness](#13-phase-8-api-migration-readiness)
14. [File Change Inventory](#14-file-change-inventory)
15. [Backward Compatibility & Migration](#15-backward-compatibility--migration)
16. [DB Mapping & Migration Strategy](#16-db-mapping--migration-strategy)
17. [Testing Plan](#17-testing-plan)
18. [Implementation Timeline](#18-implementation-timeline)
19. [Appendix: XP Economy Balance](#19-appendix-xp-economy-balance)

---

## 1. Current State

### Three Subjects Today

| Aspect | BM | Matematik | PI |
|--------|----|-----------|-----|
| Gamification plan | ✅ Full 7-phase plan (BM-specific) | ❌ None | ❌ None |
| Per-topic persistence | ❌ (binary only via `useModuleProgress`) | ❌ None | ❌ None |
| XP/coins/level | ❌ | ❌ | ❌ (Jawi games only via `useGameState`) |
| Crowns/mastery | ❌ | ❌ | ❌ |
| Streaks | ❌ | ❌ | ❌ |
| Topic pages / games | ~15+ topic pages | 26 game files | 55+ topic pages |
| `useGameState` wired | ❌ | ❌ | ❌ (only 2 Jawi games) |
| Own `_shared/` dir | ✅ | ❌ | ✅ |
| Quiz answer security | ✅ `ansRef` pattern | N/A (internal game state) | ✅ `ansRef` pattern |
| Confetti | ✅ `canvas-confetti` | ✅ `canvas-confetti` | ⚠️ emoji-only `Celebration.jsx` |
| Audio | ✅ | ✅ | ✅ |

### Two Existing Legacy Systems

```
System A (useGameState + storageService)    System B (gameStatsManager)
  localStorage key: 'mathAdventureData'        localStorage key: 'gameData'
  ├── games: { gameId: { XP, coins, items } }  ├── hearts, maxHearts
  ├── loginDates[]                              ├── gems
  └── playerName                                ├── stars
                                                └── streak

  20+ consumers (Jawi, Reading, Speaking,       AppHeader, HeartShopModal,
  Mathematics age-group pages, ProfileHome,      ProfileHome, LeaderboardHome,
  LeaderboardHome, AchievementHome)              DesktopSidebar, BMLessonQuizLayout
```

**Critical issue:** All 3 KSSR subjects share the `'home'` game state slot in `getActiveGameId()` — XP/coins earned in one subject can overwrite another. Both legacy systems remain siloed and incompatible.

---

## 2. Architecture

### Layered Design

```
┌──────────────────────────────────────────────────────────────┐
│                    React Components                           │
│  (BMLessonQuizLayout, MT-games, PI-LessonScrollLayout,       │
│   Module hubs, StatsBar, Dashboard, AppHeader, Profile)       │
└─────────────────────┬────────────────────────────────────────┘
                      │ uses
┌─────────────────────▼────────────────────────────────────────┐
│                    Hooks Layer                                │
│  useGamification(subject)   useDailyStreak   useReviewMode   │
│  (business logic: XP calc, level thresholds, crown logic)    │
└─────────────────────┬────────────────────────────────────────┘
                      │ calls
┌─────────────────────▼────────────────────────────────────────┐
│              GamificationRepo (abstract contract)              │
│  getPlayerData / savePlayerData / getTopicProgress / ...      │
└─────────────────────┬────────────────────────────────────────┘
                      │ implements
              ┌───────┴────────┐
              ▼                 ▼
  ┌──────────────────┐  ┌──────────────────┐
  │ LocalGamification│  │ ApiGamification  │ ← Phase 8
  │ Repo (Phase 0-7) │  │ Repo             │
  └──────────────────┘  └──────────────────┘
```

### Key Design Rules

1. **All methods return Promises** — even localStorage. The hook contract never changes when a remote API is introduced.
2. **Subject namespacing** — every data key includes a `{subject}` prefix (`bm:`, `mt:`, `pi:`). Repo accepts subject as a parameter.
3. **Shared XP/level/streak** — one player profile across all subjects. Topic progress is per-subject.
4. **Single source of truth** — new system replaces both `useGameState` and `gameStatsManager`. No dual systems.

### Repository Interface

**File:** `src/services/GamificationRepo.js`

```js
export class GamificationRepository {
  // ── Player (subject-agnostic, shared across all subjects) ──
  async getPlayerData(userId)     { throw new Error('NYI'); }
  async savePlayerData(userId, data) { throw new Error('NYI'); }

  // ── Topics (namespaced by subject) ──
  async getAllTopicProgress(userId, subject)          { throw new Error('NYI'); }
  async saveTopicProgress(userId, subject, topicId, data) { throw new Error('NYI'); }

  // ── Streak (shared) ──
  async getStreakData(userId)  { throw new Error('NYI'); }
  async saveStreakData(userId, data) { throw new Error('NYI'); }

  // ── Daily XP Log ──
  async getDailyXpLog(userId, date)      { throw new Error('NYI'); }
  async appendDailyXpLog(userId, entry)  { throw new Error('NYI'); }

  // ── Bulk / Migration ──
  async exportAll(userId) { throw new Error('NYI'); }
  async importAll(userId, fullData) { throw new Error('NYI'); }
}
```

### LocalStorage Implementation

**File:** `src/services/LocalGamificationRepo.js`

Uses a single localStorage key `math-adventure-v2` with structured data (atomic saves, simpler than per-bucket keys). Schema in §3.

```js
import { GamificationRepository } from './GamificationRepo';

const STORAGE_KEY = 'math-adventure-v2';

function read() {
  try { const r = localStorage.getItem(STORAGE_KEY); return r ? JSON.parse(r) : null; }
  catch { return null; }
}
function write(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch { /* quota */ }
}

export class LocalGamificationRepo extends GamificationRepository {
  async getPlayerData(userId) {
    const store = read();
    if (!store?.player) return { xp: 0, coins: 0, level: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    return store.player;
  }
  async savePlayerData(userId, data) {
    const store = read() || {};
    store.player = { ...data, updatedAt: new Date().toISOString() };
    write(store);
  }
  async getAllTopicProgress(userId, subject) {
    const store = read();
    return store?.subjects?.[subject]?.topics || {};
  }
  async saveTopicProgress(userId, subject, topicId, data) {
    const store = read() || {};
    if (!store.subjects) store.subjects = {};
    if (!store.subjects[subject]) store.subjects[subject] = { topics: {} };
    store.subjects[subject].topics[topicId] = data;
    write(store);
  }
  async getStreakData(userId) {
    const store = read();
    return store?.streak || { count: 0, lastActiveDate: null, highestStreak: 0, freezesAvailable: 0, goalXP: 50 };
  }
  async saveStreakData(userId, data) {
    const store = read() || {};
    store.streak = data;
    write(store);
  }
  async getDailyXpLog(userId, date) {
    const store = read();
    return store?.dailyLogs?.[date] || { xp: 0, sessions: [], subjects: [] };
  }
  async appendDailyXpLog(userId, entry) {
    const store = read() || {};
    if (!store.dailyLogs) store.dailyLogs = {};
    const date = entry.date;
    const existing = store.dailyLogs[date] || { xp: 0, sessions: [], subjects: [] };
    existing.xp += entry.xpEarned;
    existing.sessions.push({ source: entry.source, topicId: entry.topicId, subject: entry.subject, xpEarned: entry.xpEarned, timestamp: new Date().toISOString() });
    if (!existing.subjects.includes(entry.subject)) existing.subjects.push(entry.subject);
    store.dailyLogs[date] = existing;
    write(store);
  }
  async exportAll(userId) {
    return read();
  }
  async importAll(userId, fullData) {
    write(fullData);
  }
}
```

### User ID Utility

**File:** `src/services/UserId.js`

```js
const KEY = 'math-adventure-user-id';

export function getUserId() {
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = crypto.randomUUID
      ? crypto.randomUUID()
      : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
          const r = Math.random() * 16 | 0;
          return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    localStorage.setItem(KEY, id);
  }
  return id;
}

export function setUserId(id) { localStorage.setItem(KEY, id); }
export function clearUserId() { localStorage.removeItem(KEY); }
```

### React Context

**File:** `src/contexts/GamificationContext.js`

```jsx
import React, { createContext, useContext } from 'react';
import { LocalGamificationRepo } from '../services/LocalGamificationRepo';

export const GamificationContext = createContext(new LocalGamificationRepo());
export const useGamificationRepo = () => useContext(GamificationContext);

export function GamificationProvider({ repo, children }) {
  return (
    <GamificationContext.Provider value={repo}>
      {children}
    </GamificationContext.Provider>
  );
}
```

### Unified Hook

**File:** `src/hooks/useGamification.js`

```js
import { useState, useEffect, useCallback, useContext } from 'react';
import { GamificationContext, useGamificationRepo } from '../contexts/GamificationContext';
import { getUserId } from '../services/UserId';

const XP_PER_CORRECT = 10;
const XP_PER_STREAK_BONUS = 5;
const XP_PER_COMPLETION_BONUS = 15;
const COINS_PER_10_XP = 1;

const LEVEL_THRESHOLDS = [
  0, 100, 250, 500, 800, 1200, 1700, 2300, 3000, 4000,
];

export function levelForXp(xp) {
  let lv = 0;
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) { lv = i + 1; break; }
  }
  return Math.min(lv, 10);
}

export default function useGamification(subject) {
  const repo = useGamificationRepo();
  const uid = getUserId();

  const [player, setPlayer] = useState(null);
  const [topics, setTopics] = useState({});
  const [streak, setStreak] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!subject) return;
    Promise.all([
      repo.getPlayerData(uid),
      repo.getAllTopicProgress(uid, subject),
      repo.getStreakData(uid),
    ]).then(([p, t, s]) => {
      setPlayer(p);
      setTopics(t);
      setStreak(s);
      setLoading(false);
    });
  }, [repo, uid, subject]);

  const awardXP = useCallback(async (amount, source = 'quiz', topicId = null, sub = subject) => {
    const p = await repo.getPlayerData(uid);
    const updated = {
      ...p,
      xp: p.xp + amount,
      coins: p.coins + Math.floor(amount / 10),
      level: levelForXp(p.xp + amount),
    };
    await repo.savePlayerData(uid, updated);
    await repo.appendDailyXpLog(uid, {
      date: new Date().toISOString().slice(0, 10),
      xpEarned: amount,
      source,
      topicId,
      subject: sub,
    });
    setPlayer(updated);
  }, [repo, uid]);

  const completeTopicAttempt = useCallback(async (topicId, score, total, wrongAnswers = [], sub = subject) => {
    const all = await repo.getAllTopicProgress(uid, sub);
    const prev = all[topicId] || { crownLevel: 0, lastPracticed: null, xpEarned: 0, bestScore: 0, bestTotal: 0, attempts: 0, wrongQuestions: [] };
    const newLevel = Math.min(prev.crownLevel + 1, 5);
    const pct = Math.round((score / total) * 100);
    const xpGain = Math.round(pct * 0.5) + newLevel * 8;
    const mergedWrong = [...new Set([...(prev.wrongQuestions || []), ...wrongAnswers])].slice(0, 30);
    const updated = {
      ...prev,
      crownLevel: newLevel,
      lastPracticed: new Date().toISOString(),
      xpEarned: (prev.xpEarned || 0) + xpGain,
      bestScore: Math.max(prev.bestScore || 0, score),
      bestTotal: Math.max(prev.bestTotal || 0, total),
      attempts: (prev.attempts || 0) + 1,
      wrongQuestions: mergedWrong,
    };
    await repo.saveTopicProgress(uid, sub, topicId, updated);
    setTopics(p => ({ ...p, [topicId]: updated }));
    await awardXP(xpGain, 'topic_completion', topicId, sub);
  }, [repo, uid, awardXP, subject]);

  return {
    loading,
    xp: player?.xp || 0,
    coins: player?.coins || 0,
    level: player?.level || 1,
    streak: streak?.count || 0,
    completedTopics: topics,
    awardXP,
    completeTopicAttempt,
    getTopicLevel: (id) => topics[id]?.crownLevel || 0,
    isTopicCompleted: (id) => (topics[id]?.crownLevel || 0) >= 1,
    getTopicWrongQuestions: (id) => topics[id]?.wrongQuestions || [],
  };
}
```

---

## 3. Storage Schema

Single localStorage key `math-adventure-v2`:

```json
{
  "userId": "uuid-v4",
  "player": {
    "xp": 1840,
    "coins": 156,
    "level": 5,
    "createdAt": "2026-06-01T00:00:00Z",
    "updatedAt": "2026-06-11T12:00:00Z"
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
    "mt": {
      "topics": {
        "nombor-100": {
          "crownLevel": 2,
          "lastPracticed": "2026-06-09T10:00:00Z",
          "xpEarned": 120,
          "bestScore": 9,
          "bestTotal": 10,
          "attempts": 3,
          "wrongQuestions": []
        }
      }
    },
    "pi": {
      "topics": {
        "1-al-quran-huruf-hijaiyah": {
          "crownLevel": 3,
          "lastPracticed": "2026-06-08T14:00:00Z",
          "xpEarned": 200,
          "bestScore": 11,
          "bestTotal": 12,
          "attempts": 4,
          "wrongQuestions": ["ث", "خ"]
        }
      }
    }
  },
  "streak": {
    "count": 7,
    "lastActiveDate": "2026-06-10",
    "highestStreak": 14,
    "freezesAvailable": 1,
    "goalXP": 50
  },
  "dailyLogs": {
    "2026-06-10": {
      "xp": 120,
      "sessions": [
        { "source": "quiz", "topicId": "nombor-100", "subject": "mt", "xpEarned": 60, "timestamp": "..." },
        { "source": "quiz", "topicId": "1-1-1-mendengar-menyebut", "subject": "bm", "xpEarned": 60, "timestamp": "..." }
      ],
      "subjects": ["mt", "bm"]
    }
  }
}
```

### Key Decisions

| Decision | Rationale |
|----------|-----------|
| Single key vs per-bucket keys | Single key `math-adventure-v2` for atomic `JSON.parse`/`JSON.stringify`. When migrating to DB, the repo decomposes naturally into tables. |
| `subjects.{subject}.topics.{topicId}` | Each subject's topic progress is isolated. Cross-subject stats (XP, level, streak) are flat in `player`. |
| `dailyLogs.{date}.sessions[]` | Array of individual session events enables accurate activity history and "last 10 sessions" dashboard. |
| `dailyLogs.{date}.subjects[]` | Quick lookup of which subjects were active on a given day (for cross-subject streak tracking). |

---

## 4. XP Economy

### XP Sources

| Action | XP | Scope | Condition |
|--------|:---|:------|:----------|
| Correct answer | **10** | Per-question | Each correct answer in a quiz/game |
| Streak bonus (≥3 correct) | **+5 per correct** | Per-question | Consecutive correct answers; resets on wrong |
| Topic completion bonus | **15** | Per-session | End of each quiz/game |
| Crown level bonus | **+8 × new crown level** | Per-level-up | When crown levels up (e.g., crown 3 → 24 XP) |
| Level-up reward | **50** | One-time | Per player level (not per-subject) |
| Daily goal met | **20** | Daily | When daily XP ≥ goal |
| Streak milestone (7 days) | **100 + 1 freeze** | Weekly | Every 7-day streak |

### Level Thresholds

| Level | XP Required | Cumulative XP |
|:------|:-----------|:-------------|
| 1 | 0 | 0 |
| 2 | 100 | 100 |
| 3 | 250 | 350 |
| 4 | 500 | 850 |
| 5 | 800 | 1,650 |
| 6 | 1,200 | 2,850 |
| 7 | 1,700 | 4,550 |
| 8 | 2,300 | 6,850 |
| 9 | 3,000 | 9,850 |
| 10 | 4,000 | 13,850 (cap) |

### Coin Economy

- **1 coin per 10 XP earned** (automatic, calculated in `awardXP`)
- Coins displayed in StatsBar; future use: shop for power-ups, avatar items

### Quiz-Level XP Formula

```
correctXP = score * 10
streakBonus = (streakCount >= 3) ? streakCount * 5 : 0
levelBonus = quizLevel * 3
totalXP = correctXP + streakBonus + levelBonus
```

### Engagement Loop

1. User opens app → sees streak fire (🔥) + daily goal progress ring
2. User completes 1-2 topic attempts in any subject → earns 50-120 XP
3. Crown progress updates on hub → XP bar animation
4. Next day: streak count ticks up → dopamine → habit formation

---

## 5. Phase 0: Shared Foundation

### Deliverables

Create 7 shared infrastructure files:

| File | Purpose |
|:-----|:--------|
| `src/services/GamificationRepo.js` | Abstract interface base class |
| `src/services/LocalGamificationRepo.js` | localStorage implementation |
| `src/services/UserId.js` | `crypto.randomUUID()` with polyfill |
| `src/services/gamificationConstants.js` | XP rates, level thresholds, crown levels |
| `src/contexts/GamificationContext.js` | React Context + Provider + `useGamificationRepo` hook |
| `src/hooks/useGamification.js` | Unified hook accepting `subject` param |
| `src/services/legacyMigration.js` | Absorbs old `mathAdventureData` + `gameData` keys |

### App.jsx Changes

- Replace `GameStateContext` with `GamificationContext`
- Wrap app in `<GamificationProvider>`
- Remove `getActiveGameId()` fallback (no longer needed)
- Update scroll-reset effect if needed
- Remove `useGameState()` call from App level (replaced by new system)

```jsx
// Before:
<GameStateContext.Provider value={gameState}>
  {currentView}
</GameStateContext.Provider>

// After:
<GamificationProvider repo={new LocalGamificationRepo()}>
  {currentView}
</GamificationProvider>
```

### Legacy Migration Logic

In `src/services/legacyMigration.js`:

```js
export function migrateLegacyData() {
  const STORE = new LocalGamificationRepo();
  const uid = getUserId();
  let migrated = false;

  // System A: mathAdventureData
  const oldA = localStorage.getItem('mathAdventureData');
  if (oldA) {
    const parsed = JSON.parse(oldA);
    // Absorb total XP/coins from all games into new player
    const games = parsed.games || {};
    const totalXP = Object.values(games).reduce((sum, g) => sum + (g.totalXP || 0), 0);
    const totalCoins = Object.values(games).reduce((sum, g) => sum + (g.mathCoins || 0), 0);
    // Store in new format...
    localStorage.removeItem('mathAdventureData');
    migrated = true;
  }

  // System B: gameData
  const oldB = localStorage.getItem('gameData');
  if (oldB) {
    // Absorb gems, stars into coins equivalent...
    localStorage.removeItem('gameData');
    migrated = true;
  }

  return migrated;
}
```

---

## 6. Phase 1: XP Tracking (All 3 Subjects)

### BM Changes

**File:** `src/components/BahasaMelayuPage/_shared/BMLessonQuizLayout.jsx`
- Import `useGamification('bm')`
- On correct answer: `gamification.awardXP(10, 'quiz', topicId)`
- On streak-of-3: bonus `awardXP(5, 'streak_bonus')`
- On quiz finish: `gamification.completeTopicAttempt(topicId, score, total, wrongAnswers)`
- Show XP earned per answer + total on result screen

### Matematik Changes

**File:** All 26 game files in `src/components/MatematikPage/Tahun*/Module*/`
- Import `useGamification('mt')`
- On correct answer in each game: `gamification.awardXP(10, 'quiz', topicId)`
- On game completion: `gamification.completeTopicAttempt(topicId, score, total, wrongAnswers)`

**Pattern for each game:**
```jsx
import useGamification from '../../hooks/useGamification';
// Inside component:
const gamification = useGamification('mt');
// In correct-answer handler:
gamification.awardXP(10, 'quiz', 'nombor-100');
// In game-over handler:
gamification.completeTopicAttempt('nombor-100', score, total, wrongAnswers);
```

### PI Changes

**File:** `src/components/PendidikanIslamPage/Tahun1/Tahun1LessonScrollLayout.jsx`
- Import `useGamification('pi')`
- On correct answer: `gamification.awardXP(10, 'quiz', topicId)`
- On quiz finish: `gamification.completeTopicAttempt(topicId, score, total, wrongAnswers)`
- Replace emoji `Celebration.jsx` with `canvas-confetti` pattern for consistency

**File:** `src/components/PendidikanIslamPage/_shared/Celebration.jsx`
- Replace emoji confetti with `canvas-confetti` library (matching all other subjects)
- Or deprecate in favour of inline `confetti({...})` calls

### Confetti Standardisation

All subjects must use the same pattern per AGENTS.md:

```jsx
import confetti from 'canvas-confetti';
import { playSound } from '../../../utils/soundManager';

playSound('correct');
confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 }, scalar: 0.8 });
```

Update PI's `Celebration.jsx` and any emoji-only celebration components.

---

## 7. Phase 2: Streaks & Daily Goals

### Shared Hook

**File:** `src/hooks/useDailyStreak.js`

```js
import { useState, useCallback, useEffect } from 'react';
import { useGamificationRepo } from '../contexts/GamificationContext';
import { getUserId } from '../services/UserId';

export default function useDailyStreak(todayXP = 0) {
  const repo = useGamificationRepo();
  const uid = getUserId();
  const [streakData, setStreakData] = useState(null);

  useEffect(() => {
    repo.getStreakData(uid).then(setStreakData);
  }, [repo, uid]);

  const tick = useCallback(async () => {
    const prev = await repo.getStreakData(uid);
    const today = new Date().toISOString().slice(0, 10);
    const yesterday = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
    let count = prev.count;
    let highest = prev.highestStreak;
    if (prev.lastActiveDate === yesterday) {
      count = prev.count + 1;
      highest = Math.max(highest, count);
    } else if (prev.lastActiveDate !== today) {
      if (prev.freezesAvailable > 0) {
        count = prev.count + 1;
        await repo.saveStreakData(uid, { ...prev, freezesAvailable: prev.freezesAvailable - 1 });
      } else {
        count = 1;
      }
      highest = Math.max(highest, count);
    }
    let freezes = prev.freezesAvailable;
    if (count > 0 && count % 7 === 0) freezes = Math.min(freezes + 1, 2);
    const newData = { ...prev, count, highestStreak: highest, lastActiveDate: today, freezesAvailable: freezes };
    await repo.saveStreakData(uid, newData);
    setStreakData(newData);
  }, [repo, uid]);

  const goalProgress = streakData?.goalXP > 0 ? Math.min(todayXP / streakData.goalXP, 1) : 0;
  const goalMet = streakData?.goalXP > 0 && todayXP >= streakData.goalXP;

  return {
    streakCount: streakData?.count || 0,
    highestStreak: streakData?.highestStreak || 0,
    freezesAvailable: streakData?.freezesAvailable || 0,
    goalXP: streakData?.goalXP || 50,
    goalProgress, goalMet, todayXP, tick,
    setGoalXP: async (g) => {
      const d = await repo.getStreakData(uid);
      const updated = { ...d, goalXP: g };
      await repo.saveStreakData(uid, updated);
      setStreakData(updated);
    },
  };
}
```

### Integration

- `useGamification.js` calls `tick()` inside `awardXP` (streak runs on any activity in any subject)
- All subject quiz layouts show streak fire icon if `streakCount >= 2`
- Result screens show streak bonus XP

---

## 8. Phase 3: Crown Mastery

### Crown Levels (per topic, per subject)

| Level | Rounds | Pass Threshold | Reward XP |
|-------|--------|---------------|-----------|
| 1 | 8 | ≥60% | 25 |
| 2 | 10 | ≥70% | 40 |
| 3 | 12 | ≥70% | 55 |
| 4 | 15 | ≥80% | 75 |
| 5 | 20 | ≥80% | 100 |

### Visual

- Level 0: grey circle with lock icon
- Level 1: 1 filled crown (bronze)
- Level 2: 2 filled (silver)
- Level 3: 3 filled (gold)
- Level 4: 4 filled (emerald)
- Level 5: 5 filled (diamond + sparkle)

### BM Hub Changes

**File:** `BMModuleHubLayout.jsx`
- Replace `isTopicCompleted` binary check with `getTopicLevel()`
- Show crown dots (1-5) on each node button
- Show XP/coins/level in hub header

### MT Hub Changes

**File:** All 9 module hub files (`NomborModule.jsx`, `SukatanModule.jsx`, `StatistikModule.jsx`)
- Import `useGamification('mt')`
- Add `getTopicLevel()` check to each topic card
- Show crown indicators on topic cards
- Show user stats in header

### PI Hub Changes

**File:** `Tahun1ModuleHubLayout.jsx` (shared by all PI modules)
- Import `useGamification('pi')`
- Add `getTopicLevel()` check to each topic card
- Show crown indicators on topic cards (via `crownLevel` prop or internal state)
- Show user stats in header

**File:** `ModuleNavBar.jsx`
- Add completion checkmarks to module tabs (show crown progress per module)

---

## 9. Phase 4: Progressive Unlocking

### Rules

- Topics within a module chain sequentially: topic N requires topic N-1 at crown ≥ 1
- Module N unlocks only after ALL topics in Module N-1 have crown ≥ 1
- Exception: Module 1 always fully open
- Inter-year: Year 2 unlocks when Year 1 ≥70% complete; Year 3 when Year 2 ≥70%

### Data Changes

Add `prerequisites` array to topic data in all three subjects:

**BM:** `ModuleData.js` — already planned in original BM doc

**MT:** Each module hub's `TOPICS` array — add `prerequisites` IDs:

```js
// In NomborModule.jsx (Tahun 1):
const TOPICS = [
  { id: 'nombor-100', pill: 'Belajar', title: 'Nombor 1–100', prerequisites: [] },
  { id: 'tambah-100', pill: 'Belajar', title: 'Tambah dalam 100', prerequisites: ['nombor-100'] },
  // ...
];
```

**PI:** Each module hub's `topics` array — add `prerequisites`:

```js
// In AlQuranTajwidModule.jsx:
const topics = [
  { id: '1-al-quran-huruf-hijaiyah', pill: 'Belajar', prerequisites: [] },
  { id: '1-al-quran-tanda-bacaan', pill: 'Belajar', prerequisites: ['1-al-quran-huruf-hijaiyah'] },
  // ...
];
```

### Hub Changes

In each hub layout (`BMModuleHubLayout`, `Tahun1ModuleHubLayout`, and all 9 MT hubs):

```jsx
const locked = topic.prerequisites?.some(pid => gamification.getTopicLevel(pid) < 1);
if (locked) return; // onClick is no-op; card greyed out
```

### Nav Bar Changes

**`MatematikModuleNavBar.jsx`** and **`ModuleNavBar.jsx`** (PI):
- Grey out module tabs whose prerequisites (≥70% of previous module's topics at crown ≥1) aren't met

---

## 10. Phase 5: Legacy Consolidation

### Migrate System A Consumers

All components currently using `useGameState()` from `App.jsx`:

| Component | Current Use | Migration |
|-----------|------------|-----------|
| AppHeader | Shows hearts/gems/stars | Read from new system (coins → gems, streak → hearts) |
| App LevelUpToast | Uses `levelUpInfo` from `useGameState` | Read from `useGamification` |
| ProfileHome | Uses both `gameState` and `gameStatsManager` | Read entirely from new system |
| LeaderboardHome | Uses `gameStatsManager.getGameData()` | Read from new repo + static mock |
| AchievementHome | Uses `gameStatsManager.getGameData()` + `storageService.loadLoginDates()` | Read from new repo |
| DesktopSidebar | Shows stars/gems/hearts | Read from new system |
| JawiSyllablesGame | Uses `useGameStateContext` + `gameStatsManager` | Migrate to `useGamification('pi')` |
| Jawi100WordsGame | Uses `useGameStateContext` + `gameStatsManager` | Migrate to `useGamification('pi')` |
| ReadingPage | Uses `useGameStateContext` | Migrate to `useGamification` (add 'reading' subject) |
| SpeakingPage | Uses `useGameStateContext` | Migrate to `useGamification` (add 'speaking' subject) |
| MathematicsPage | Uses `useGameStateContext` | Migrate to `useGamification` (add 'math-age' subject) |
| AgeGroup games | Uses `useGameStateContext` | Migrate to `useGamification` (add subject per group) |
| HeartShopModal | Reads/writes `gameStatsManager` | Use new coin economy (coins → hearts exchange rate) |

### Remove Deprecated Files

| File | After Migration |
|:-----|:----------------|
| `src/hooks/useGameState.js` | Delete (replaced by `useGamification`) |
| `src/utils/gameStatsManager.js` | Delete (replaced by new repo + hook) |
| `src/services/storageService.js` | Delete (replaced by `LocalGamificationRepo`) |

### `GameStateContext` Removal

In `App.jsx`:
- Remove `GameStateContext` creation
- Remove `useGameState()` call
- Remove `<GameStateContext.Provider>` wrapper
- Remove `LevelUpToast` references (moved into new system)

---

## 11. Phase 6: Review Mode

### Shared Hook

**File:** `src/hooks/useReviewMode.js`

Builds a weighted question pool from all completed topics in a given subject:

- 60%: wrongly-answered questions
- 30%: low-crown topics (levels 1-2)
- 10%: random

Uses same `ansRef` security pattern as BM's existing quiz system.

### Integration

- Add "Latihan Ulang" button to each subject's module hub header
- Badge showing total wrong answers across all completed topics in that subject
- Subject-specific question bank integration:
  - BM: reads from `ModuleData.js`
  - MT: reads from each game's question pool (needs central question bank per module)
  - PI: reads from each topic's question data (needs central question bank)

---

## 12. Phase 7: Unified Dashboard

### StatsBar (persistent top bar in all subject pages)

**File:** `src/components/_shared/StatsBar.jsx`

```jsx
export default function StatsBar({ gamification, streakCount }) {
  return (
    <div className="stats-bar">
      <span>🔥 {streakCount}</span>
      <span>⭐ {gamification.xp} XP</span>
      <span>Lv {gamification.level}</span>
      <span>🪙 {gamification.coins}</span>
    </div>
  );
}
```

Shown in:
- BM module pages
- MT module pages
- PI module pages

### Progress Dashboard

**File:** `src/components/Dashboard/ProgressDashboard.jsx`

Full-page dashboard accessible from each subject's homepage:

1. **Overview** — Total XP, Level, Streak, Coins
2. **Cross-Subject Progress** — 3 donut charts (BM, MT, PI) showing % completion + topics mastered per subject
3. **Daily Goal** — Ring progress chart, "Set Goal" button
4. **Module Breakdown per Subject** — Horizontal bars showing crown completion per module
5. **Recent Activity** — Last 10 sessions (subject, topic, score, XP earned)
6. **Weakest Topics** — Topics with most wrong answers across all subjects, sorted by need

---

## 13. Phase 8: API Migration Readiness

### API Implementation

**File:** `src/services/ApiGamificationRepo.js`

Same contract as `LocalGamificationRepo` but hits REST endpoints:

```
GET    /api/player/{userId}
PUT    /api/player/{userId}
GET    /api/topics/{userId}/{subject}
PUT    /api/topics/{userId}/{subject}/{topicId}
GET    /api/streak/{userId}
PUT    /api/streak/{userId}
GET    /api/daily-xp/{userId}?date={date}
POST   /api/daily-xp/{userId}
GET    /api/export/{userId}
POST   /api/import/{userId}
```

### Dual-Write Bridge

**File:** `src/services/DualWriteRepo.js`

Wraps both `LocalGamificationRepo` and `ApiGamificationRepo`:
- Writes go to both (API errors silently caught)
- Reads return local data immediately; background-sync from remote
- Enables zero-downtime migration

### Switch Day

```jsx
// Before:
const repo = new LocalGamificationRepo();
// After (ONE line change):
const repo = new ApiGamificationRepo('https://api.example.com');
```

### MySQL DDL

```sql
CREATE TABLE player_stats (
  user_id    CHAR(36) PRIMARY KEY,
  xp         INT NOT NULL DEFAULT 0,
  coins      INT NOT NULL DEFAULT 0,
  level      INT NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE topic_progress (
  user_id         CHAR(36) NOT NULL,
  subject         VARCHAR(8) NOT NULL,
  topic_id        VARCHAR(64) NOT NULL,
  crown_level     TINYINT NOT NULL DEFAULT 0,
  last_practiced  TIMESTAMP NULL,
  xp_earned       INT NOT NULL DEFAULT 0,
  best_score      INT NOT NULL DEFAULT 0,
  best_total      INT NOT NULL DEFAULT 0,
  attempts        INT NOT NULL DEFAULT 0,
  wrong_questions JSON,
  PRIMARY KEY (user_id, subject, topic_id),
  FOREIGN KEY (user_id) REFERENCES player_stats(user_id)
);

CREATE TABLE daily_streaks (
  user_id           CHAR(36) PRIMARY KEY,
  streak_count      INT NOT NULL DEFAULT 0,
  highest_streak    INT NOT NULL DEFAULT 0,
  last_active_date  DATE NULL,
  freezes_available TINYINT NOT NULL DEFAULT 0,
  goal_xp           INT NOT NULL DEFAULT 50,
  FOREIGN KEY (user_id) REFERENCES player_stats(user_id)
);

CREATE TABLE daily_xp_log (
  id         BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id    CHAR(36) NOT NULL,
  date       DATE NOT NULL,
  xp_earned  INT NOT NULL,
  source     VARCHAR(32) NOT NULL,
  subject    VARCHAR(8) NOT NULL,
  topic_id   VARCHAR(64) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES player_stats(user_id)
);
```

---

## 14. File Change Inventory

### New Files (14)

| File | Phase | Purpose |
|:-----|:------|:--------|
| `src/services/GamificationRepo.js` | P0 | Abstract interface |
| `src/services/LocalGamificationRepo.js` | P0 | localStorage implementation |
| `src/services/ApiGamificationRepo.js` | P8 | REST implementation |
| `src/services/DualWriteRepo.js` | P8 | Migration bridge |
| `src/services/UserId.js` | P0 | UUID utility |
| `src/services/gamificationConstants.js` | P0 | Shared constants |
| `src/services/legacyMigration.js` | P0 | Legacy data absorption |
| `src/contexts/GamificationContext.js` | P0 | React Context + Provider |
| `src/hooks/useGamification.js` | P0 | Unified hook |
| `src/hooks/useDailyStreak.js` | P2 | Streak + daily goal |
| `src/hooks/useReviewMode.js` | P6 | Review/retention hook |
| `src/components/_shared/StatsBar.jsx` | P1 | Persistent top bar |
| `src/components/Dashboard/ProgressDashboard.jsx` | P7 | Full dashboard |
| `src/components/_shared/AnimatedCounter.jsx` | P1 | Animated XP counter |

### Modified Files (~60+)

#### Shared Infrastructure

| File | Phase | Changes |
|:-----|:------|:--------|
| `src/App.jsx` | P0 | Replace `GameStateContext` with `GamificationProvider`; remove `getActiveGameId`; remove `useGameState` |

#### BM Subject Files

| File | Phase | Changes |
|:-----|:------|:--------|
| `BMLessonQuizLayout.jsx` | P1, P3, P5 | XP awards, crown result, animated counter, "Teruskan" button |
| `BMModuleHubLayout.jsx` | P3, P4, P6 | Crown display, locked nodes, review button, stats bar |
| `useBMQuiz.js` | P3 | Accept `level` param, scale rounds, filter by difficulty |
| `ModuleData.js` | P3, P4 | Add `prerequisites` + `difficulty` to topics |
| `useModuleProgress.js` | P5 | Deprecate in favour of `useGamification` |
| `BahasaMelayuModuleNavBar.jsx` | P4 | Grey-out locked modules |
| `BahasaMelayuHomePage.jsx` | P7 | Link to progress dashboard |

#### Matematik Subject Files

| File | Phase | Changes |
|:-----|:------|:--------|
| All 26 game files in `Tahun*/Module*/` | P1 | Add `useGamification('mt')`, award XP, completeTopicAttempt |
| All 9 module hub files | P3, P4 | Crown display, locked nodes, stats bar |
| `MatematikModulePage.jsx` | P1 | Pass gamification props |
| `MatematikModuleNavBar.jsx` | P4 | Grey-out locked modules, completion indicators |
| `MatematikHomePage.jsx` | P7 | Link to progress dashboard |

#### PI Subject Files

| File | Phase | Changes |
|:-----|:------|:--------|
| `Tahun1LessonScrollLayout.jsx` | P1, P3 | XP awards, crown result display |
| `Tahun1ModuleHubLayout.jsx` | P3, P4 | Crown display, locked nodes, review button, stats bar |
| `Celebration.jsx` | P1 | Replace emoji confetti with `canvas-confetti` |
| `ModuleNavBar.jsx` | P4 | Completion indicators, grey-out |
| `PendidikanIslamHomePage.jsx` | P7 | Link to progress dashboard |

#### Legacy Components to Migrate

| File | Phase | Changes |
|:-----|:------|:--------|
| `src/hooks/useGameState.js` | P5 | Delete |
| `src/utils/gameStatsManager.js` | P5 | Delete |
| `src/services/storageService.js` | P5 | Delete |
| `AppHeader.jsx` | P5 | Read from new system |
| `HeartShopModal.jsx` | P5 | Use new coin economy |
| `ProfileHome.jsx` | P5 | Read from new system |
| `LeaderboardHome.jsx` | P5 | Read from new system |
| `AchievementHome.jsx` | P5 | Read from new system |
| `DesktopSidebar.jsx` | P5 | Read from new system |
| `JawiSyllablesGame.jsx` | P5 | Migrate to `useGamification('pi')` |
| `Jawi100WordsGame.jsx` | P5 | Migrate to `useGamification('pi')` |
| ReadingPage games (6) | P5 | Migrate to `useGamification('reading')` |
| SpeakingPage games (2) | P5 | Migrate to `useGamification('speaking')` |
| MathematicsPage games (6) | P5 | Migrate to `useGamification('math-age')` |
| AgeGroup games (3) | P5 | Migrate to `useGamification('age-group')` |

---

## 15. Backward Compatibility & Migration

### Old `mathAdventureData` Key (System A)

```js
// In legacyMigration.js:
// 1. Read old 'mathAdventureData' blob
// 2. Sum totalXP and totalCoins across all games
// 3. Store in player under new 'math-adventure-v2' key
// 4. Remove old key
// 5. Returns true if migration happened
```

### Old `gameData` Key (System B)

```js
// In legacyMigration.js:
// 1. Read old 'gameData' blob
// 2. Convert gems/stars → coins (e.g., 1 star = 5 coins, 1 gem = 1 coin)
// 3. Store in player under new key
// 4. Remove old key
// 5. Returns true if migration happened
```

### Old `bm-progress` (binary true/false)

```js
// In legacyMigration.js:
// 1. Read old 'bm-progress' key: { "topicId": true }
// 2. Convert each true entry to crownLevel=1 in new format
// 3. Remove old key
```

### `useModuleProgress.js` Backward Compat

Keep as thin wrapper that delegates to `useGamification('bm')` so existing BM consumers don't break.

### `useGameState` Shimming

During Phase 1-4 (Phase 0-4), keep `GameStateContext` alive alongside the new system. Legacy components continue working while gradually migrating.

After Phase 5: remove entirely.

---

## 16. DB Mapping & Migration Strategy

### localStorage → SQL Mapping

| Schema Key | SQL Table | Notes |
|:-----------|:----------|:------|
| `player` | `player_stats` | One row per user |
| `subjects.{s}.topics.{t}` | `topic_progress` | Row per (user, subject, topic) |
| `streak` | `daily_streaks` | One row per user |
| `dailyLogs.{date}` | `daily_xp_log` | One row per session |

### Migration Bridge

Same DualWrite pattern as BM plan (§12 of BM doc) — adapted for unified schema:
1. Deploy `DualWriteRepo` — writes to both localStorage and API
2. Monitor API logs
3. Switch day: change ONE line in `App.jsx`
4. After 1 week, remove `DualWriteRepo`

### Rollback

```js
// Instant rollback — ONE line change:
repo = new LocalGamificationRepo();
```

---

## 17. Testing Plan

### Unit Tests (manual checklist)

| Test | Phase | Scenario | Pass Condition |
|:-----|:------|:---------|:---------------|
| XP Award | P1 | Answer correctly → +10 XP | player.xp increments |
| Streak Bonus | P1 | 3 consecutive correct → +5 XP | xp increments by extra 5 |
| Level Up | P1 | XP exceeds threshold → level up | Correct level number |
| Coin Award | P1 | Earn 10 XP → +1 coin | player.coins increments |
| Topic Completion | P1, P3 | Finish quiz → crownLevel increments | Correct crown level capped at 5 |
| Cross-Subject XP | P1 | XP in BM + XP in MT → shared total | Total XP is sum of both |
| Prerequisite Lock | P4 | Topic with unmet prereq shows locked | Node grey + click-blocked |
| Crown Visual | P3 | Level 3 topic → shows 3 crown dots | Correct crown count |
| Daily Streak | P2 | Day 1 → streak=1; Day 2 → streak=2 | Correct streak count |
| Streak Freeze | P2 | Miss 1 day with freeze → streak preserved | Count doesn't reset |
| Legacy Migration A | P0 | Old `mathAdventureData` → new format | Data preserved, old key removed |
| Legacy Migration B | P0 | Old `gameData` → new format | Data preserved, old key removed |
| Confetti Standard | P1 | PI quiz correct → `canvas-confetti` fires | Confetti + sound, not emoji |
| Repo Swap | P8 | Switch Local → DualWrite → Api | All methods return same shape |
| Offline Fallback | P8 | API offline → reads from localStorage | Zero user-facing errors |

### Browser Tests

- Chrome, Firefox, Safari, Edge
- localStorage quota (~50 KB well under 5 MB limit)
- No console errors on first visit (empty localStorage)
- No console errors during legacy migration

---

## 18. Implementation Timeline

```
Phase 0 — Foundation (Days 1-3)
  Day 1: Create 7 shared service files + Context + hook
  Day 2: Wire App.jsx with GamificationProvider; write legacyMigration.js
  Day 3: Test legacy migration with existing data; verify no regressions

Phase 1 — XP Tracking Across All 3 Subjects (Days 4-8)
  Day 4: Integrate useGamification('bm') into BMLessonQuizLayout
  Day 5: Integrate useGamification('mt') into 26 MT game files
  Day 6: Integrate useGamification('pi') into Tahun1LessonScrollLayout
  Day 7: Standardise PI Celebration.jsx → canvas-confetti
  Day 8: Testing + edge cases across all 3 subjects

Phase 2 — Streaks & Daily Goals (Days 9-10)
  Day 9: useDailyStreak.js + tick() integration in awardXP
  Day 10: Streak UI in all subject pages

Phase 3 — Crown Mastery (Days 11-14)
  Day 11: Crown display in BMModuleHubLayout
  Day 12: Crown display in all 9 MT module hubs
  Day 13: Crown display in Tahun1ModuleHubLayout + PI ModuleNavBar
  Day 14: Testing crown progression across all subjects

Phase 4 — Progressive Unlocking (Days 15-17)
  Day 15: Add prerequisites to BM ModuleData.js + hub locking
  Day 16: Add prerequisites to MT module hubs + nav bar
  Day 17: Add prerequisites to PI module hubs + nav bar

Phase 5 — Legacy Consolidation (Days 18-22)
  Day 18: Migrate Jawi games (2 files) + AppHeader
  Day 19: Migrate ReadingPage games (6 files)
  Day 20: Migrate SpeakingPage + MathematicsPage + AgeGroup games
  Day 21: Migrate Profile, Leaderboard, Achievement, HeartShopModal, DesktopSidebar
  Day 22: Remove deprecated files (useGameState.js, gameStatsManager.js, storageService.js)

Phase 6 — Review Mode (Days 23-24)
  Day 23: useReviewMode.js + BM review integration
  Day 24: MT + PI review integration

Phase 7 — Unified Dashboard (Days 25-27)
  Day 25: StatsBar component → all 3 subjects
  Day 26: ProgressDashboard page
  Day 27: Link dashboard from all subject homepages

Phase 8 — API Readiness (Days 28-30)
  Day 28: ApiGamificationRepo + DualWriteRepo
  Day 29: Migration verification script + rollback test
  Day 30: Documentation + final testing pass
```

---

## 19. Appendix: XP Economy Balance

### Full Breakdwon

| Action | XP | Frequency | Notes |
|:-------|:---|:----------|:------|
| Correct answer | 10 | Per question | Core XP source |
| Streak bonus (≥3) | +5 per correct | While streak active | Resets on wrong answer |
| Topic completion | 15 | Per session | Once per quiz/game |
| Crown level bonus | 8 × level | Per level-up | E.g., crown 3 → +24 XP |
| Player level-up | 50 | Per player level | One-time per level (not per subject) |
| Daily goal met | 20 | Daily | Bonus for reaching goal |
| Streak milestone (7d) | 100 | Weekly | Plus 1 freeze |
| Streak milestone (30d) | 500 | Monthly | Plus 2 freezes |

### Typical Session XP

| Scenario | Questions | Correct | Streak | Total XP |
|:---------|:----------|:-------:|:------:|:--------:|
| Quick PI quiz (8 Qs) | 8 | 6/8 (75%) | 3 streak | 60 + 15 + 15 = 90 |
| Standard BM lesson (10 Qs) | 10 | 8/10 (80%) | 5 streak | 80 + 25 + 15 = 120 |
| Hard MT game (12 Qs) | 12 | 10/12 (83%) | 6 streak | 100 + 30 + 15 = 145 |
| Crown level-up bonus | — | — | — | +16 to +40 |

### Daily Goal Suggestions

| User Profile | Recommended Goal | Time Required |
|:-------------|:-----------------|:--------------|
| Casual | 30 XP | 1 quick lesson |
| Regular | 50 XP (default) | 1-2 lessons |
| Active | 100 XP | 2-3 lessons |
| Dedicated | 150 XP | 3-4 lessons |

### Level-Up Pacing

| Sessions per Day | XP per Session | Days to Level 5 | Days to Level 10 |
|:-----------------|:---------------|:---------------:|:----------------:|
| 1 | 90 | ~19 | ~154 |
| 2 | 120 | ~7 | ~58 |
| 3 | 145 | ~4 | ~32 |

---

> *End of planning document. Each phase should be implemented independently and verified before moving to the next.*
