// Global Reward System - Shared across all games
// One localStorage key: gameData

const STORAGE_KEY = 'gameData';
const STREAK_MILESTONE = 10;

const DEFAULT_GAME_DATA = {
  hearts: 3,
  maxHearts: 3,
  gems: 0,
  stars: 0,
  streak: 0,
};

/**
 * Get current game data from localStorage
 * Returns default data if not found
 */
export function getGameData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      saveGameData(DEFAULT_GAME_DATA);
      return { ...DEFAULT_GAME_DATA };
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error reading game data:', error);
    return { ...DEFAULT_GAME_DATA };
  }
}

/**
 * Save game data to localStorage
 */
export function saveGameData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving game data:', error);
  }
}

/**
 * Handle correct answer
 * - Add 1 gem
 * - Increase streak by 1
 * - Check if streak milestone (10) reached and award star
 * Returns updated game data
 */
export function addCorrectAnswer() {
  const data = getGameData();

  // Add gem for correct answer
  data.gems += 1;

  // Increase streak
  data.streak += 1;

  // Check for star milestone (every 10 correct answers)
  if (data.streak % STREAK_MILESTONE === 0) {
    data.stars += 1;
  }

  saveGameData(data);
  return data;
}

/**
 * Handle wrong answer
 * - Deduct 1 heart (minimum 0)
 * - Reset streak to 0
 * Returns updated game data
 */
export function deductHeart() {
  const data = getGameData();

  // Deduct heart (don't go below 0)
  if (data.hearts > 0) {
    data.hearts -= 1;
  }

  // Reset streak on wrong answer
  data.streak = 0;

  saveGameData(data);
  return data;
}

/**
 * Restore 1 heart (maximum maxHearts)
 * Returns updated game data
 */
export function restoreHeart() {
  const data = getGameData();

  if (data.hearts < data.maxHearts) {
    data.hearts += 1;
  }

  saveGameData(data);
  return data;
}

/**
 * Restore all hearts to maximum
 * Returns updated game data
 */
export function restoreAllHearts() {
  const data = getGameData();
  data.hearts = data.maxHearts;
  saveGameData(data);
  return data;
}

/**
 * Reset streak to 0
 * Used when quitting a game or for other streak resets
 * Returns updated game data
 */
export function resetStreak() {
  const data = getGameData();
  data.streak = 0;
  saveGameData(data);
  return data;
}

/**
 * Reset all game data to defaults
 * Only call this intentionally (e.g., user resets game or settings reset)
 * Returns default game data
 */
export function resetGameData() {
  saveGameData(DEFAULT_GAME_DATA);
  return { ...DEFAULT_GAME_DATA };
}

/**
 * Get current streak value
 */
export function getStreak() {
  const data = getGameData();
  return data.streak;
}

/**
 * Get hearts value
 */
export function getHearts() {
  const data = getGameData();
  return data.hearts;
}

/**
 * Get gems value
 */
export function getGems() {
  const data = getGameData();
  return data.gems;
}

/**
 * Get stars value
 */
export function getStars() {
  const data = getGameData();
  return data.stars;
}
