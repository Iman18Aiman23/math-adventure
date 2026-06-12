/**
 * Legacy System Migration
 * Absorbs data from old systems (System A: useGameState, System B: gameStatsManager)
 * into new unified gamification system.
 *
 * Old keys:
 * - 'mathAdventureData' (System A): games { xp, coins }, loginDates, playerName
 * - 'gameData' (System B): hearts, maxHearts, gems, stars, streak
 * - 'bm-progress' (binary completion tracking): { topicId: true }
 */

import { LocalGamificationRepo } from './LocalGamificationRepo';
import { getUserId, setUserId } from './UserId';

const OLD_KEY_SYSTEM_A = 'mathAdventureData';
const OLD_KEY_SYSTEM_B = 'gameData';
const OLD_KEY_BM_PROGRESS = 'bm-progress';

/**
 * Run legacy migration.
 * Checks for old data; if found, absorbs into new system and removes old keys.
 * Safe to call multiple times (idempotent).
 *
 * @returns {Object} { migrated: boolean, systemAData: any, systemBData: any, errors: string[] }
 */
export async function migrateLegacyData() {
  const repo = new LocalGamificationRepo();
  const uid = getUserId();
  const errors = [];
  let migrated = false;

  let systemAData = null;
  let systemBData = null;

  // =========================================================================
  // Migrate System A: mathAdventureData
  // =========================================================================

  try {
    const oldA = localStorage.getItem(OLD_KEY_SYSTEM_A);

    if (oldA) {
      systemAData = JSON.parse(oldA);
      const games = systemAData.games || {};

      // Sum XP and coins from all games
      let totalXP = 0;
      let totalCoins = 0;

      Object.values(games).forEach((game) => {
        if (typeof game.totalXP === 'number') {
          totalXP += game.totalXP;
        }
        if (typeof game.mathCoins === 'number') {
          totalCoins += game.mathCoins;
        }
      });

      // Load current player data and merge
      const current = await repo.getPlayerData(uid);
      const merged = {
        ...current,
        xp: Math.max(current.xp, totalXP),
        coins: Math.max(current.coins, totalCoins),
        level: calculateLevel(Math.max(current.xp, totalXP)),
      };

      await repo.savePlayerData(uid, merged);

      // Log migrated games for debugging
      console.log('[Migration] System A absorbed:', {
        games: Object.keys(games).length,
        totalXP,
        totalCoins,
        timestamp: new Date().toISOString(),
      });

      // Remove old key
      localStorage.removeItem(OLD_KEY_SYSTEM_A);
      migrated = true;
    }
  } catch (e) {
    errors.push(`System A migration failed: ${e.message}`);
    console.error('[Migration] System A error:', e);
  }

  // =========================================================================
  // Migrate System B: gameData
  // =========================================================================

  try {
    const oldB = localStorage.getItem(OLD_KEY_SYSTEM_B);

    if (oldB) {
      systemBData = JSON.parse(oldB);

      // Convert System B currency → new system
      // System B: hearts, gems, stars → new system: coins + streak
      const gems = systemBData.gems || 0;
      const stars = systemBData.stars || 0;
      const oldStreak = systemBData.streak || 0;

      // Exchange rates: 1 star = 5 coins, 1 gem = 1 coin
      const coinsFromCurrency = stars * 5 + gems * 1;

      // Merge into player data
      const current = await repo.getPlayerData(uid);
      const merged = {
        ...current,
        coins: current.coins + coinsFromCurrency,
      };

      await repo.savePlayerData(uid, merged);

      // Merge streak (take max)
      const currentStreak = await repo.getStreakData(uid);
      const mergedStreak = {
        ...currentStreak,
        count: Math.max(currentStreak.count, oldStreak),
        highestStreak: Math.max(currentStreak.highestStreak, oldStreak),
      };

      await repo.saveStreakData(uid, mergedStreak);

      console.log('[Migration] System B absorbed:', {
        gems,
        stars,
        coinsAwarded: coinsFromCurrency,
        oldStreak,
        timestamp: new Date().toISOString(),
      });

      // Remove old key
      localStorage.removeItem(OLD_KEY_SYSTEM_B);
      migrated = true;
    }
  } catch (e) {
    errors.push(`System B migration failed: ${e.message}`);
    console.error('[Migration] System B error:', e);
  }

  // =========================================================================
  // Migrate BM Progress: binary completion tracking
  // =========================================================================

  try {
    const oldBMProgress = localStorage.getItem(OLD_KEY_BM_PROGRESS);

    if (oldBMProgress) {
      const progress = JSON.parse(oldBMProgress);

      // Convert each { topicId: true } → { topicId: { crownLevel: 1, ... } }
      const allProgress = await repo.getAllTopicProgress(uid, 'bm');

      Object.entries(progress).forEach(([topicId, wasCompleted]) => {
        if (wasCompleted === true && !allProgress[topicId]) {
          // Topic was completed in old system; set crownLevel = 1
          allProgress[topicId] = {
            crownLevel: 1,
            lastPracticed: new Date().toISOString(),
            xpEarned: 0,
            bestScore: 0,
            bestTotal: 0,
            attempts: 1,
            wrongQuestions: [],
          };
        }
      });

      // Save all updated BM progress
      const bmTopicsToSave = Object.entries(allProgress).filter(
        ([, data]) => data && typeof data === 'object'
      );

      for (const [topicId, data] of bmTopicsToSave) {
        await repo.saveTopicProgress(uid, 'bm', topicId, data);
      }

      console.log('[Migration] BM progress absorbed:', {
        topics: Object.keys(progress).length,
        timestamp: new Date().toISOString(),
      });

      // Remove old key
      localStorage.removeItem(OLD_KEY_BM_PROGRESS);
      migrated = true;
    }
  } catch (e) {
    errors.push(`BM progress migration failed: ${e.message}`);
    console.error('[Migration] BM progress error:', e);
  }

  // =========================================================================
  // Return Summary
  // =========================================================================

  return {
    migrated,
    systemAData,
    systemBData,
    errors,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Calculate player level from XP.
 * Simple version of levelForXp.
 * @private
 * @param {number} xp
 * @returns {number}
 */
function calculateLevel(xp) {
  const thresholds = [0, 100, 250, 500, 800, 1200, 1700, 2300, 3000, 4000];
  let level = 1;
  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (xp >= thresholds[i]) {
      level = i + 1;
      break;
    }
  }
  return Math.min(level, 10);
}

/**
 * Check if legacy data exists (for diagnostics).
 * @returns {Object} { systemA: boolean, systemB: boolean, bmProgress: boolean }
 */
export function checkLegacyData() {
  return {
    systemA: localStorage.getItem(OLD_KEY_SYSTEM_A) !== null,
    systemB: localStorage.getItem(OLD_KEY_SYSTEM_B) !== null,
    bmProgress: localStorage.getItem(OLD_KEY_BM_PROGRESS) !== null,
  };
}
