/**
 * Gamification system constants: XP rates, level thresholds, crown levels, etc.
 */

// ============================================================================
// XP Awards
// ============================================================================

export const XP_PER_CORRECT = 10;
export const XP_PER_STREAK_BONUS = 5;
export const XP_PER_COMPLETION_BONUS = 15;

// Anti-farming: once a topic is completed (crownLevel >= 1), repeat runs only
// earn this fraction of quiz/streak XP ("practice XP"). Crown level, completion
// bonus and crown bonus are first-completion-only.
export const PRACTICE_XP_MULTIPLIER = 0.2;
export const XP_PER_LEVEL_UP = 50;
export const XP_PER_DAILY_GOAL_MET = 20;
export const XP_PER_STREAK_7_DAYS = 100;
export const XP_PER_STREAK_30_DAYS = 500;

// ============================================================================
// Coin Economy
// ============================================================================

export const COINS_PER_10_XP = 1; // 1 coin per 10 XP earned

// ============================================================================
// Level Thresholds
// ============================================================================

export const LEVEL_THRESHOLDS = [
  0,      // Level 1: 0 XP
  100,    // Level 2: 100 XP
  250,    // Level 3: 250 XP
  500,    // Level 4: 500 XP
  800,    // Level 5: 800 XP
  1200,   // Level 6: 1,200 XP
  1700,   // Level 7: 1,700 XP
  2300,   // Level 8: 2,300 XP
  3000,   // Level 9: 3,000 XP
  4000,   // Level 10: 4,000 XP (cap)
];

export const MAX_LEVEL = LEVEL_THRESHOLDS.length;

// ============================================================================
// Crown Levels
// ============================================================================

export const MAX_CROWN_LEVEL = 5;

export const CROWN_REQUIREMENTS = {
  1: { rounds: 8, passThreshold: 0.6, rewardXP: 25 },
  2: { rounds: 10, passThreshold: 0.7, rewardXP: 40 },
  3: { rounds: 12, passThreshold: 0.7, rewardXP: 55 },
  4: { rounds: 15, passThreshold: 0.8, rewardXP: 75 },
  5: { rounds: 20, passThreshold: 0.8, rewardXP: 100 },
};

// ============================================================================
// Streak & Daily Goals
// ============================================================================

export const DEFAULT_DAILY_GOAL_XP = 50;
export const STREAK_MILESTONE_DAYS = 7;
export const MAX_FREEZES = 2;

// ============================================================================
// Storage
// ============================================================================

export const STORAGE_KEY = 'math-adventure-v2';
export const STORAGE_VERSION = 2;
export const STORAGE_QUOTA_BYTES = 5 * 1024 * 1024; // 5 MB (typical localStorage limit)
export const QUOTA_WARNING_THRESHOLD = 0.8; // Warn at 80% used

// ============================================================================
// Daily Log Archival
// ============================================================================

export const DAYS_TO_KEEP_LIVE_LOGS = 30; // Keep last 30 days uncompressed
export const ARCHIVE_DATE_RANGE_DAYS = 30; // Archive logs in 30-day chunks

// ============================================================================
// Rate Limiting
// ============================================================================

// Loop-rate cap, NOT an answer-rate limit. Only purpose: stop a pathological
// render-loop from spamming awardXP thousands of times/sec. Per-answer awards are
// structurally guarded (event handlers + fire-once refs), and a child answers no
// faster than ~once/sec, so this must stay well below human answering speed — at
// 2000ms it silently dropped legitimate per-answer +10 XP (StatsBar came up short).
export const AWARD_COOLDOWN_MS = 150;

// ============================================================================
// Subject Codes
// ============================================================================

export const SUBJECTS = {
  BM: 'bm',
  MT: 'mt',
  PI: 'pi',
  READING: 'reading',
  SPEAKING: 'speaking',
  MATH_AGE: 'math-age',
  AGE_GROUP: 'age-group',
};

export const DEFAULT_SUBJECTS = ['bm', 'mt', 'pi'];
