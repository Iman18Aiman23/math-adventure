/**
 * Main gamification hook for all subjects.
 * Features:
 * - Unified XP/level/coins/streak tracking across all subjects
 * - Per-subject topic progress with crown levels
 * - Rate limiting to prevent XP spam
 * - Suspicious pattern logging
 * - Streak tick integration
 *
 * @param {string} subject - Subject code: 'bm', 'mt', 'pi', 'reading', 'speaking', 'math-age'
 * @returns {UseGamificationReturn}
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { useGamificationRepo } from '../contexts/GamificationContext';
import { getUserId } from '../services/UserId';
import {
  XP_PER_CORRECT,
  XP_PER_STREAK_BONUS,
  XP_PER_COMPLETION_BONUS,
  GEMS_PER_CORRECT,
  LEVEL_THRESHOLDS,
  MAX_LEVEL,
  MAX_CROWN_LEVEL,
  AWARD_COOLDOWN_MS,
  PRACTICE_XP_MULTIPLIER,
  MAX_HEARTS,
  START_HEARTS,
  HEART_REGEN_MS,
} from '../services/gamificationConstants';

/**
 * Current heart count after time-based regeneration (display value).
 * Hearts regenerate +1 every HEART_REGEN_MS up to maxHearts. The stored
 * `hearts` is the value as of `heartsUpdatedAt`; this adds elapsed regen.
 * @param {object} player
 * @returns {number}
 */
export function heartsNow(player) {
  const max = player?.maxHearts ?? MAX_HEARTS;
  const stored = player?.hearts ?? START_HEARTS;
  if (stored >= max) return max;
  const ts = player?.heartsUpdatedAt ? new Date(player.heartsUpdatedAt).getTime() : Date.now();
  const regened = Math.floor((Date.now() - ts) / HEART_REGEN_MS);
  return Math.min(max, stored + Math.max(0, regened));
}

/**
 * Compute player level from total XP.
 * @param {number} xp
 * @returns {number} Level 1-10
 */
export function levelForXp(xp) {
  let level = 1;
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) {
      level = i + 1;
      break;
    }
  }
  return Math.min(level, MAX_LEVEL);
}

export default function useGamification(subject) {
  const repo = useGamificationRepo();
  const uid = getUserId();

  // State
  const [player, setPlayer] = useState(null);
  const [topics, setTopics] = useState({});
  const [streak, setStreak] = useState(null);
  const [loading, setLoading] = useState(true);

  // Rate limiting: track last award time
  const lastAwardTimeRef = useRef(0);

  // =========================================================================
  // Initialize & Load Data
  // =========================================================================

  useEffect(() => {
    if (!subject) return;

    const loadData = async () => {
      try {
        const [playerData, topicData, streakData] = await Promise.all([
          repo.getPlayerData(uid),
          repo.getAllTopicProgress(uid, subject),
          repo.getStreakData(uid),
        ]);

        setPlayer(playerData);
        setTopics(topicData);
        setStreak(streakData);
      } catch (e) {
        console.error('[useGamification] Load error:', e);
      } finally {
        setLoading(false);
      }
    };

    loadData();

    // Listen for cross-tab sync events
    const handleSync = () => loadData();
    window.addEventListener('gamification-sync', handleSync);
    return () => window.removeEventListener('gamification-sync', handleSync);
  }, [repo, uid, subject]);

  // =========================================================================
  // Public Methods
  // =========================================================================

  /**
   * Award XP to player.
   * Updates shared player.xp, automatically calculates coins.
   * Logs to daily XP log.
   * Triggers streak tick.
   * Rate-limited: throttles to 1 award per 2 seconds.
   *
   * @param {number} amount - XP to award
   * @param {string} [source='quiz'] - Source: 'quiz', 'game', 'streak_bonus', etc.
   * @param {string} [topicId] - Topic being played (for analytics)
   * @param {string} [sub] - Subject (defaults to hook's subject)
   */
  const awardXP = useCallback(
    async (amount, source = 'quiz', topicId = null, sub = subject) => {
      const now = Date.now();

      // Rate limiting check
      if (now - lastAwardTimeRef.current < AWARD_COOLDOWN_MS && source === 'quiz') {
        console.warn('[useGamification] Award throttled; too frequent');
        return 0;
      }

      // Log suspicious patterns
      if (amount > 500) {
        console.warn(`[useGamification] Unusually high XP award: ${amount}. Source: ${source}`);
      }

      try {
        // Anti-farming: repeat runs of an already-completed topic earn
        // practice-rate XP only (crown/completion rewards are handled in
        // completeTopicAttempt and are first-completion-only).
        let effectiveAmount = amount;
        if ((source === 'quiz' || source === 'streak_bonus') && topicId) {
          const all = await repo.getAllTopicProgress(uid, sub);
          if ((all[topicId]?.crownLevel || 0) >= 1) {
            effectiveAmount = Math.max(1, Math.round(amount * PRACTICE_XP_MULTIPLIER));
          }
        }

        const p = await repo.getPlayerData(uid);
        const newXP = p.xp + effectiveAmount;
        // Gems (stored in `coins`): +1 per correct answer. Only the per-answer
        // 'quiz' source earns gems — streak/completion bonuses do not.
        const gemGain = source === 'quiz' && effectiveAmount > 0 ? GEMS_PER_CORRECT : 0;
        const newCoins = (p.coins || 0) + gemGain;
        const newLevel = levelForXp(newXP);

        const updated = {
          ...p,
          xp: newXP,
          coins: newCoins,
          level: newLevel,
        };

        await repo.savePlayerData(uid, updated);

        // ---------- Daily streak tick ----------
        const streakData = await repo.getStreakData(uid);
        const today = new Date().toLocaleDateString('en-CA');
        if (streakData.lastActiveDate !== today) {
          const yesterday = new Date(Date.now() - 86400000).toLocaleDateString('en-CA');
          const newCount = streakData.lastActiveDate === yesterday
            ? (streakData.count || 0) + 1
            : 1;
          const updatedStreak = {
            ...streakData,
            count: newCount,
            lastActiveDate: today,
            highestStreak: Math.max(streakData.highestStreak || 0, newCount),
          };
          await repo.saveStreakData(uid, updatedStreak);
          setStreak(updatedStreak);
        }
        // --------------------------------------

        // Log to daily XP log
        const date = new Date().toISOString().slice(0, 10);
        await repo.appendDailyXpLog(uid, {
          date,
          xpEarned: effectiveAmount,
          source,
          topicId: topicId || 'unknown',
          subject: sub,
        });

        setPlayer(updated);

        // Update last award time (for rate limiting)
        lastAwardTimeRef.current = now;

        return effectiveAmount;
      } catch (e) {
        console.error('[useGamification] awardXP error:', e);
        return 0;
      }
    },
    [repo, uid, subject]
  );

  /**
   * Complete a topic attempt.
   * Updates topic progress (crownLevel, lastPracticed, xpEarned, etc.).
   * Awards XP based on score + crown level.
   * Merges wrong questions into running list (limit 10).
   *
   * @param {string} topicId
   * @param {number} score - Number of correct answers
   * @param {number} total - Total questions
   * @param {string[]} [wrongAnswers=[]] - IDs of incorrectly answered questions
   * @param {string} [sub] - Subject (defaults to hook's subject)
   */
  const completeTopicAttempt = useCallback(
    async (topicId, score, total, wrongAnswers = [], sub = subject) => {
      try {
        const all = await repo.getAllTopicProgress(uid, sub);
        const prev = all[topicId] || {
          crownLevel: 0,
          lastPracticed: null,
          xpEarned: 0,
          bestScore: 0,
          bestTotal: 0,
          attempts: 0,
          wrongQuestions: [],
        };

        // Anti-farming: crown level + completion XP are first-completion-only.
        // Repeat runs still update stats (attempts/bestScore/wrongQuestions)
        // but award nothing here; per-answer XP is already reduced to
        // practice-rate in awardXP.
        const isFirstCompletion = (prev.crownLevel || 0) === 0;
        const newCrownLevel = isFirstCompletion
          ? Math.min(1, MAX_CROWN_LEVEL)
          : prev.crownLevel;

        // Calculate XP: percentage of questions correct + crown level bonus
        const percentage = Math.round((score / total) * 100);
        const baseXP = Math.round(percentage * 0.5); // 0.5 XP per 1% correct
        const crownBonus = newCrownLevel * 8; // e.g., crown 3 = +24 XP
        const xpGain = isFirstCompletion ? baseXP + crownBonus + XP_PER_COMPLETION_BONUS : 0;

        // Merge wrong questions (keep last 10)
        const mergedWrong = [...new Set([...(prev.wrongQuestions || []), ...wrongAnswers])].slice(-10);

        const updated = {
          ...prev,
          crownLevel: newCrownLevel,
          lastPracticed: new Date().toISOString(),
          xpEarned: (prev.xpEarned || 0) + xpGain,
          bestScore: Math.max(prev.bestScore || 0, score),
          bestTotal: Math.max(prev.bestTotal || 0, total),
          attempts: (prev.attempts || 0) + 1,
          wrongQuestions: mergedWrong,
        };

        await repo.saveTopicProgress(uid, sub, topicId, updated);
        setTopics((prevTopics) => ({ ...prevTopics, [topicId]: updated }));

        // Award XP for topic completion (first completion only)
        if (xpGain > 0) {
          await awardXP(xpGain, 'topic_completion', topicId, sub);
        }
      } catch (e) {
        console.error('[useGamification] completeTopicAttempt error:', e);
      }
    },
    [repo, uid, subject, awardXP]
  );

  /**
   * Mark a NON-QUIZ activity complete (speaking, listen-and-do, tracing, etc.).
   * Unlike completeTopicAttempt there is no score: finishing the activity once
   * grants crown level 1 + a small flat completion XP. Idempotent — repeat plays
   * only bump `attempts` (first-completion-capped, so no XP/crown farming).
   *
   * @param {string} topicId
   * @param {string} [sub] - Subject (defaults to hook's subject)
   */
  const markActivityComplete = useCallback(
    async (topicId, sub = subject) => {
      try {
        const all = await repo.getAllTopicProgress(uid, sub);
        const prev = all[topicId] || {
          crownLevel: 0, lastPracticed: null, xpEarned: 0,
          bestScore: 0, bestTotal: 0, attempts: 0, wrongQuestions: [],
        };
        const isFirst = (prev.crownLevel || 0) === 0;
        const xpGain = isFirst ? XP_PER_COMPLETION_BONUS : 0; // small, flat

        const updated = {
          ...prev,
          crownLevel: isFirst ? Math.min(1, MAX_CROWN_LEVEL) : prev.crownLevel,
          lastPracticed: new Date().toISOString(),
          xpEarned: (prev.xpEarned || 0) + xpGain,
          attempts: (prev.attempts || 0) + 1,
        };

        await repo.saveTopicProgress(uid, sub, topicId, updated);
        setTopics((prevTopics) => ({ ...prevTopics, [topicId]: updated }));

        if (xpGain > 0) {
          await awardXP(xpGain, 'topic_completion', topicId, sub);
        }
      } catch (e) {
        console.error('[useGamification] markActivityComplete error:', e);
      }
    },
    [repo, uid, subject, awardXP]
  );

  /**
   * Lose one heart (on a wrong answer). Gentle: floors at 0, never locks the
   * lesson — hearts regenerate over time (see heartsNow / HEART_REGEN_MS).
   * Realizes any pending regen first, then subtracts 1 and resets the clock.
   */
  const loseHeart = useCallback(async () => {
    try {
      const p = await repo.getPlayerData(uid);
      const current = heartsNow(p); // includes regen accrued so far
      const newHearts = Math.max(0, current - 1);
      const updated = {
        ...p,
        hearts: newHearts,
        maxHearts: p.maxHearts ?? MAX_HEARTS,
        heartsUpdatedAt: new Date().toISOString(),
      };
      await repo.savePlayerData(uid, updated);
      setPlayer(updated);
    } catch (e) {
      console.error('[useGamification] loseHeart error:', e);
    }
  }, [repo, uid]);

  // =========================================================================
  // Query Methods
  // =========================================================================

  /**
   * Get crown level for a topic (0-5).
   * @param {string} topicId
   * @returns {number}
   */
  const getTopicLevel = useCallback(
    (topicId) => {
      return topics[topicId]?.crownLevel || 0;
    },
    [topics]
  );

  /**
   * Check if topic has been started (crownLevel >= 1).
   * @param {string} topicId
   * @returns {boolean}
   */
  const isTopicCompleted = useCallback(
    (topicId) => {
      return (topics[topicId]?.crownLevel || 0) >= 1;
    },
    [topics]
  );

  /**
   * Get list of wrong questions for a topic.
   * @param {string} topicId
   * @returns {string[]}
   */
  const getTopicWrongQuestions = useCallback(
    (topicId) => {
      return topics[topicId]?.wrongQuestions || [];
    },
    [topics]
  );

  // =========================================================================
  // Return Hook Interface
  // =========================================================================

  return {
    // State
    loading,
    xp: player?.xp || 0,
    gems: player?.coins || 0,        // gems = spendable currency (stored in `coins`)
    coins: player?.coins || 0,       // alias kept for backward-compat
    level: player?.level || 1,
    streak: streak?.count || 0,
    hearts: heartsNow(player),
    maxHearts: player?.maxHearts ?? MAX_HEARTS,
    completedTopics: topics,

    // Actions
    awardXP,
    completeTopicAttempt,
    markActivityComplete,
    loseHeart,

    // Queries
    getTopicLevel,
    isTopicCompleted,
    getTopicWrongQuestions,
  };
}
