/**
 * storageService.js
 *
 * Abstraction layer for all game-state persistence.
 * Currently backed by localStorage.
 * To migrate to Firebase (or any other backend), only change this file.
 *
 * Storage shape:
 * {
 *   playerName: "Iman",
 *   games: {
 *     "math-operations": { totalXP: 0, mathCoins: 0, unlockedItems: [] },
 *     "math-datetime":   { totalXP: 0, mathCoins: 0, unlockedItems: [] },
 *     "jawi":            { totalXP: 0, mathCoins: 0, unlockedItems: [] },
 *     "bm":              { totalXP: 0, mathCoins: 0, unlockedItems: [] }
 *   }
 * }
 */

const STORAGE_KEY = 'mathAdventureData';
const PLAYER_KEY  = 'mathAdventurePlayer';

const DEFAULT_GAME_STATE = {
  totalXP: 0,
  mathCoins: 0,
  unlockedItems: [],
};

// ── Player name ────────────────────────────────────────────────────────────
export function loadPlayerName() {
  try { return localStorage.getItem(PLAYER_KEY) || null; }
  catch { return null; }
}

export function savePlayerName(name) {
  try { localStorage.setItem(PLAYER_KEY, name.trim()); }
  catch (err) { console.warn('[storageService] Failed to save player name:', err); }
}

// ── Per-game state ─────────────────────────────────────────────────────────
/**
 * Load a single game's state.
 * @param {string} gameId  e.g. 'math-operations'
 */
export function loadGameData(gameId) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_GAME_STATE };
    const all = JSON.parse(raw);
    return { ...DEFAULT_GAME_STATE, ...(all.games?.[gameId] ?? {}) };
  } catch (err) {
    console.warn('[storageService] Failed to load game data:', err);
    return { ...DEFAULT_GAME_STATE };
  }
}

/**
 * Save a single game's state (merges into the top-level object).
 * @param {string} gameId
 * @param {{ totalXP: number, mathCoins: number, unlockedItems: string[] }} data
 */
export function saveGameData(gameId, data) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const all = raw ? JSON.parse(raw) : { games: {} };
    if (!all.games) all.games = {};
    all.games[gameId] = data;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch (err) {
    console.warn('[storageService] Failed to save game data:', err);
  }
}

/**
 * Load ALL games' data (for a summary/overview screen if needed).
 */
export function loadAllGamesData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw).games ?? {};
  } catch { return {}; }
}
