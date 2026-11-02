import api from '../services/api';

const STORAGE_KEY = 'gameData';
const STREAK_MILESTONE = 10;

const DEFAULT_GAME_DATA = {
  hearts: 3,
  maxHearts: 3,
  gems: 0,
  stars: 0,
  streak: 0,
};

// Helper to extract userId from the JWT payload
function getUserId() {
  const token = localStorage.getItem('player_token');
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub;
  } catch (e) {
    return null;
  }
}

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
  data.streak += 1;

  if (data.streak % STREAK_MILESTONE === 0) {
    data.stars += 1;
  }

  saveGameData(data);

  // Optimistically update backend
  const userId = getUserId();
  if (userId) {
    api.post('/economy/award-gems', { userId, amount: 1 }).catch(err => console.error('Failed to sync gems:', err));
  }

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

  if (data.hearts > 0) {
    data.hearts -= 1;
  }

  data.streak = 0;
  saveGameData(data);

  // Optimistically update backend
  const userId = getUserId();
  if (userId) {
    api.post('/economy/deduct-heart', { userId }).catch(err => console.error('Failed to sync hearts:', err));
  }

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
