/**
 * TypeScript Type Definitions for Gamification System
 * Use these interfaces throughout the app via JSDoc annotations
 * or migrate to .ts files in future
 */

// ============================================================================
// Core Data Interfaces
// ============================================================================

export interface PlayerStats {
  xp: number;
  coins: number;
  level: number;
  createdAt: string;
  updatedAt: string;
  _version?: number;
}

export interface TopicProgress {
  crownLevel: number;
  lastPracticed: string | null;
  xpEarned: number;
  bestScore: number;
  bestTotal: number;
  attempts: number;
  wrongQuestions?: string[];
}

export interface StreakData {
  count: number;
  lastActiveDate: string | null;
  highestStreak: number;
  freezesAvailable: number;
  goalXP: number;
  _version?: number;
}

export interface DailyLogEntry {
  date: string;
  source: 'quiz' | 'game' | 'reading' | 'speaking' | 'jawi' | 'practice';
  topicId: string;
  subject: string;
  xpEarned: number;
  timestamp: string;
}

export interface DailyLogSummary {
  xp: number;
  sessions: DailyLogEntry[];
  subjects: string[];
}

export interface StorageMetadata {
  version: number;
  quotaBytes: number;
  quotaUsed: number;
  lastCompression: string;
  compressionEnabled: boolean;
}

export interface GamificationState {
  userId: string;
  storageMetadata: StorageMetadata;
  player: PlayerStats;
  subjects: {
    [key: string]: {
      topics: {
        [topicId: string]: TopicProgress;
      };
    };
  };
  streak: StreakData;
  dailyLogs: {
    [date: string]: DailyLogSummary;
    _archived?: {
      [dateRange: string]: string;
    };
  };
}

// ============================================================================
// Repository Interface
// ============================================================================

export interface IGameificationRepository {
  getPlayerData(userId: string): Promise<PlayerStats>;
  savePlayerData(userId: string, data: PlayerStats): Promise<void>;
  getAllTopicProgress(userId: string, subject: string): Promise<Record<string, TopicProgress>>;
  saveTopicProgress(userId: string, subject: string, topicId: string, data: TopicProgress): Promise<void>;
  getStreakData(userId: string): Promise<StreakData>;
  saveStreakData(userId: string, data: StreakData): Promise<void>;
  getDailyXpLog(userId: string, date: string): Promise<DailyLogSummary>;
  appendDailyXpLog(userId: string, entry: DailyLogEntry): Promise<void>;
  exportAll(userId: string): Promise<GamificationState | null>;
  importAll(userId: string, fullData: GamificationState): Promise<void>;
  getQuotaStatus?(userId: string): Promise<QuotaStatus>;
  validateAndRepair?(userId: string): Promise<RepairResult>;
}

// ============================================================================
// Hook Return Types
// ============================================================================

export interface UseGamificationReturn {
  loading: boolean;
  xp: number;
  coins: number;
  level: number;
  streak: number;
  completedTopics: Record<string, TopicProgress>;
  awardXP(amount: number, source?: string, topicId?: string, subject?: string): Promise<void>;
  completeTopicAttempt(
    topicId: string,
    score: number,
    total: number,
    wrongAnswers?: string[],
    subject?: string
  ): Promise<void>;
  getTopicLevel(topicId: string): number;
  isTopicCompleted(topicId: string): boolean;
  getTopicWrongQuestions(topicId: string): string[];
}

export interface UseDailyStreakReturn {
  streakCount: number;
  highestStreak: number;
  freezesAvailable: number;
  goalXP: number;
  goalProgress: number;
  goalMet: boolean;
  todayXP: number;
  tick(): Promise<void>;
  setGoalXP(goal: number): Promise<void>;
}

export interface UseReviewModeReturn {
  loading: boolean;
  currentQuestion: ReviewQuestion | null;
  questionPool: ReviewQuestion[];
  poolStats: {
    totalQuestions: number;
    fromWrongAnswers: number;
    fromLowCrowns: number;
    random: number;
  };
  submitAnswer(answer: string): Promise<boolean>;
  nextQuestion(): void;
  endSession(): Promise<void>;
  sessionStats: {
    correct: number;
    total: number;
    accuracy: number;
  };
}

// ============================================================================
// Utility Types
// ============================================================================

export type Subject = 'bm' | 'mt' | 'pi' | 'reading' | 'speaking' | 'math-age' | 'age-group';

export interface QuotaStatus {
  used: number;
  limit: number;
  percentage: number;
  warning: boolean;
  estimatedDaysUntilFull: number;
}

export interface RepairResult {
  status: 'ok' | 'corrupted' | 'repaired';
  fixed: boolean;
  errors?: string[];
}

export interface ReviewQuestion {
  id: string;
  subject: Subject;
  topicId: string;
  text: string;
  options?: string[];
  correctAnswer: string;
  source: 'wrong_answer' | 'low_crown' | 'random';
}

// ============================================================================
// Helper Functions
// ============================================================================

export function levelForXp(xp: number): number;
export function estimateSize(obj: any): number;
