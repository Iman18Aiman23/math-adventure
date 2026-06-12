# TypeScript Definitions for Gamification System

**File Location:** `src/types/gamification.d.ts`

This document defines all TypeScript interfaces and types for the unified gamification system. Use these as JSDoc annotations in `.js` files, or migrate to `.ts` files in the future.

---

## Core Interfaces

### PlayerStats

Player-level data shared across all subjects.

```typescript
interface PlayerStats {
  xp: number;                    // Total XP earned across all subjects
  coins: number;                 // Total coins (1 per 10 XP earned)
  level: number;                 // Player level (1–10)
  createdAt: string;             // ISO 8601 timestamp
  updatedAt: string;             // ISO 8601 timestamp
  _version?: number;             // Optimistic locking version (for cross-tab sync)
}
```

**Constraints:**
- `level` is capped at 10 (use `levelForXp()` to compute)
- `coins` auto-calculated as `Math.floor(totalXP / 10)`
- `xp` always >= 0

---

### TopicProgress

Per-subject, per-topic progress tracking.

```typescript
interface TopicProgress {
  crownLevel: number;            // 0–5 (0 = locked/not started)
  lastPracticed: string | null;  // ISO 8601 timestamp of last attempt
  xpEarned: number;              // Cumulative XP from all attempts on this topic
  bestScore: number;             // Highest score achieved
  bestTotal: number;             // Total questions in quiz when bestScore achieved
  attempts: number;              // Number of attempts
  wrongQuestions?: string[];     // IDs of frequently-missed questions (limit 10 in v2)
}
```

**Constraints:**
- `crownLevel` capped at 5
- `bestScore` <= `bestTotal`
- `wrongQuestions` array max 10 elements (older entries discarded)
- `lastPracticed` updated on every `completeTopicAttempt()`

---

### StreakData

Daily engagement streak and goal tracking (shared across subjects).

```typescript
interface StreakData {
  count: number;                 // Current streak days (0 = no active streak)
  lastActiveDate: string | null; // ISO 8601 date of last activity (YYYY-MM-DD)
  highestStreak: number;         // All-time highest streak
  freezesAvailable: number;      // Number of times user can skip a day without breaking streak (0–2)
  goalXP: number;                // Daily XP goal (default 50, user-configurable)
  _version?: number;             // Optimistic locking version (for cross-tab sync)
}
```

**Rules:**
- `count` increments if `lastActiveDate` = yesterday
- `count` resets to 1 if `lastActiveDate` < yesterday AND `freezesAvailable` = 0
- `freezesAvailable` grants one skip; replenished every 7-day streak
- `highestStreak` never decreases

---

### DailyLogEntry

Individual session entry in daily XP log.

```typescript
interface DailyLogEntry {
  date: string;                  // ISO 8601 date (YYYY-MM-DD)
  source: 'quiz' | 'game' | 'reading' | 'speaking' | 'jawi' | 'practice';
  topicId: string;               // ID of topic/game played
  subject: 'bm' | 'mt' | 'pi' | 'reading' | 'speaking' | 'math-age';
  xpEarned: number;              // XP from this session
  timestamp: string;             // ISO 8601 timestamp of session end
}
```

---

### DailyLogSummary

Aggregated daily log for a given date.

```typescript
interface DailyLogSummary {
  xp: number;                    // Total XP earned on this date
  sessions: DailyLogEntry[];     // Array of individual sessions
  subjects: string[];            // Unique subjects active on this date (for quick lookup)
}
```

---

### StorageMetadata

Quota and versioning metadata.

```typescript
interface StorageMetadata {
  version: number;               // Storage schema version (currently 2)
  quotaBytes: number;            // localStorage size limit (typically 5MB = 5242880)
  quotaUsed: number;             // Estimated bytes used (computed on read)
  lastCompression: string;       // ISO 8601 timestamp of last archive operation
  compressionEnabled: boolean;   // Whether auto-compression is enabled
}
```

---

### GamificationState

Complete localStorage state (root object).

```typescript
interface GamificationState {
  userId: string;                // UUID-v4
  storageMetadata: StorageMetadata;
  player: PlayerStats;
  subjects: {
    [subject in 'bm' | 'mt' | 'pi' | 'reading' | 'speaking' | 'math-age']: {
      topics: {
        [topicId: string]: TopicProgress;
      };
    };
  };
  streak: StreakData;
  dailyLogs: {
    [dateYYYYMMDD: string]: DailyLogSummary;
    _archived?: {
      [dateRange: string]: string; // e.g., "2026-05-01_to_2026-05-31": "base64-gzip"
    };
  };
}
```

---

## Repository Interface

### GamificationRepository

Abstract base class (all methods return Promise for API compatibility).

```typescript
abstract class GamificationRepository {
  // ── Player (subject-agnostic, shared) ──
  abstract getPlayerData(userId: string): Promise<PlayerStats>;
  abstract savePlayerData(userId: string, data: PlayerStats): Promise<void>;

  // ── Topics (namespaced by subject) ──
  abstract getAllTopicProgress(userId: string, subject: Subject): Promise<Record<string, TopicProgress>>;
  abstract saveTopicProgress(userId: string, subject: Subject, topicId: string, data: TopicProgress): Promise<void>;

  // ── Streak (shared) ──
  abstract getStreakData(userId: string): Promise<StreakData>;
  abstract saveStreakData(userId: string, data: StreakData): Promise<void>;

  // ── Daily XP Log ──
  abstract getDailyXpLog(userId: string, date: string): Promise<DailyLogSummary>;
  abstract appendDailyXpLog(userId: string, entry: DailyLogEntry): Promise<void>;

  // ── Bulk / Migration ──
  abstract exportAll(userId: string): Promise<GamificationState | null>;
  abstract importAll(userId: string, fullData: GamificationState): Promise<void>;

  // ── Quota (localStorage implementations) ──
  abstract getQuotaStatus(userId: string): Promise<QuotaStatus>;
  abstract validateAndRepair(userId: string): Promise<RepairResult>;
}
```

---

## Hook Return Types

### useGamification(subject: Subject)

```typescript
interface UseGamificationReturn {
  // State
  loading: boolean;              // true while initial data loads
  xp: number;                    // Current XP (shared across subjects)
  coins: number;                 // Current coins (shared)
  level: number;                 // Current level (1–10, shared)
  streak: number;                // Current streak count (shared)
  completedTopics: Record<string, TopicProgress>; // All topics in this subject

  // Actions
  awardXP(
    amount: number,
    source?: string,
    topicId?: string,
    subject?: string
  ): Promise<void>;

  completeTopicAttempt(
    topicId: string,
    score: number,
    total: number,
    wrongAnswers?: string[],
    subject?: string
  ): Promise<void>;

  // Queries
  getTopicLevel(topicId: string): number;         // 0–5 crown level
  isTopicCompleted(topicId: string): boolean;     // true if crownLevel >= 1
  getTopicWrongQuestions(topicId: string): string[]; // List of wrong question IDs
}
```

---

### useDailyStreak(todayXP?: number)

```typescript
interface UseDailyStreakReturn {
  streakCount: number;           // Current streak days
  highestStreak: number;         // All-time record
  freezesAvailable: number;      // Remaining freeze tokens
  goalXP: number;                // Daily XP target
  goalProgress: number;          // 0–1 (percent of daily goal met)
  goalMet: boolean;              // true if todayXP >= goalXP
  todayXP: number;               // Total XP earned today
  
  tick(): Promise<void>;         // Increment streak if eligible
  setGoalXP(goal: number): Promise<void>; // Update daily goal
}
```

---

### useReviewMode(subject: Subject)

```typescript
interface UseReviewModeReturn {
  loading: boolean;
  currentQuestion: ReviewQuestion | null;
  questionPool: ReviewQuestion[];
  poolStats: {
    totalQuestions: number;
    fromWrongAnswers: number;     // 60% of pool
    fromLowCrowns: number;        // 30% of pool
    random: number;               // 10% of pool
  };

  submitAnswer(answer: string): Promise<boolean>;
  nextQuestion(): void;
  endSession(): Promise<void>;
  sessionStats: {
    correct: number;
    total: number;
    accuracy: number;             // 0–1
  };
}
```

---

## Utility Types

### Subject

Enum-like union of all valid subject codes.

```typescript
type Subject = 'bm' | 'mt' | 'pi' | 'reading' | 'speaking' | 'math-age' | 'age-group';
```

---

### QuotaStatus

Returned by `repo.getQuotaStatus()`.

```typescript
interface QuotaStatus {
  used: number;                  // Bytes currently used
  limit: number;                 // Total quota bytes (typically 5MB)
  percentage: number;            // 0–100
  warning: boolean;              // true if >80% used
  estimatedDaysUntilFull: number; // Projection based on daily logs growth
}
```

---

### RepairResult

Returned by `repo.validateAndRepair()`.

```typescript
interface RepairResult {
  status: 'ok' | 'corrupted' | 'repaired';
  fixed: boolean;                // true if data was repaired
  errors?: string[];             // List of issues found and fixed
}
```

---

### ReviewQuestion

Question object in review mode pool.

```typescript
interface ReviewQuestion {
  id: string;
  subject: Subject;
  topicId: string;
  text: string;
  options?: string[];            // For multiple choice
  correctAnswer: string;
  source: 'wrong_answer' | 'low_crown' | 'random';
}
```

---

## Helper Functions (Type Exports)

### levelForXp

```typescript
function levelForXp(xp: number): number;
// Returns player level (1–10) for given total XP
// Uses LEVEL_THRESHOLDS array: [0, 100, 250, 500, 800, 1200, 1700, 2300, 3000, 4000]
```

**Example:**
```typescript
levelForXp(0)    // → 1
levelForXp(100)  // → 2
levelForXp(350)  // → 3
levelForXp(13850) // → 10
levelForXp(99999) // → 10 (capped)
```

---

### estimateSize

```typescript
function estimateSize(obj: any): number;
// Returns approximate byte size of object when stringified
// Used by QuotaManager to track localStorage usage
```

---

## JSDoc Annotations (for .js files)

If not migrating to TypeScript, use JSDoc annotations in `.js` files:

```javascript
/**
 * @typedef {Object} PlayerStats
 * @property {number} xp
 * @property {number} coins
 * @property {number} level
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {number} [_version]
 */

/**
 * @param {string} subject
 * @returns {UseGamificationReturn}
 */
export default function useGamification(subject) {
  // ...
}
```

---

## Backward Compatibility Notes

### Legacy Type Mapping

If importing old system data:

```typescript
// Old: useGameState()
interface OldGameState {
  games: Record<string, { totalXP: number; mathCoins: number; }>;
  loginDates: string[];
  playerName: string;
}

// Maps to new PlayerStats + DailyLogSummary

// Old: gameStatsManager.getGameData()
interface OldGameData {
  hearts: number;
  maxHearts: number;
  gems: number;
  stars: number;
  streak: number;
}

// Maps to new StreakData + coins (gems/stars → coins conversion in legacyMigration.js)
```

---

## File Organization

```
src/
├── types/
│   └── gamification.d.ts          (this file)
├── services/
│   ├── GamificationRepo.js        (abstract class)
│   ├── LocalGamificationRepo.js   (uses PlayerStats, TopicProgress, etc.)
│   ├── ApiGamificationRepo.js     (same interfaces)
│   └── QuotaManager.js            (uses QuotaStatus)
├── contexts/
│   └── GamificationContext.js     (provides GamificationRepository)
├── hooks/
│   ├── useGamification.js         (returns UseGamificationReturn)
│   ├── useDailyStreak.js          (returns UseDailyStreakReturn)
│   └── useReviewMode.js           (returns UseReviewModeReturn)
└── components/
    ├── BahasaMelayuPage/
    │   └── _shared/
    │       └── BMLessonQuizLayout.jsx (uses useGamification, PlayerStats)
    ├── MatematikPage/
    │   └── Tahun1/
    │       └── Module1/
    │           └── Game.jsx         (uses useGamification, TopicProgress)
    └── _shared/
        └── StatsBar.jsx             (displays PlayerStats fields)
```

---

## Usage Examples

### In a Quiz Component

```javascript
import useGamification from '@/hooks/useGamification';

export function MyQuiz() {
  /** @type {UseGamificationReturn} */
  const gamification = useGamification('bm');

  const handleCorrect = async () => {
    // Award XP (type-safe)
    await gamification.awardXP(10, 'quiz', 'topic-123');
  };

  const handleQuizEnd = async (score, total) => {
    // Complete topic attempt
    await gamification.completeTopicAttempt('topic-123', score, total, []);
  };

  return (
    <div>
      <p>Level: {gamification.level}</p>
      <p>XP: {gamification.xp}</p>
    </div>
  );
}
```

### In a Dashboard Component

```javascript
import useGamification from '@/hooks/useGamification';

export function Dashboard() {
  /** @type {UseGamificationReturn} */
  const bmGamification = useGamification('bm');
  /** @type {UseGamificationReturn} */
  const mtGamification = useGamification('mt');

  // Both refer to same player (shared xp, coins, level)
  const totalXP = bmGamification.xp; // Same as mtGamification.xp
  
  // But topics are per-subject
  const bmTopics = bmGamification.completedTopics;
  const mtTopics = mtGamification.completedTopics;

  return (
    <div>
      <p>Total XP: {totalXP}</p>
      <p>BM Topics Completed: {Object.keys(bmTopics).length}</p>
      <p>MT Topics Completed: {Object.keys(mtTopics).length}</p>
    </div>
  );
}
```

---

## Future: TypeScript Migration

When migrating to TypeScript:

1. Rename all `.js` files to `.ts`
2. Move `src/types/gamification.d.ts` → inline in respective files
3. Enable strict mode in `tsconfig.json`
4. Run `tsc --noEmit` to validate

Example post-migration:

```typescript
// src/hooks/useGamification.ts
export default function useGamification(subject: Subject): UseGamificationReturn {
  // Return type automatically inferred
}
```

---

End of TypeScript definitions document.
