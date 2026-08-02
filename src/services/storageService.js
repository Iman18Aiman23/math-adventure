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
const NAVIGATION_KEY = 'mathAdventureNavigation:v1';

const DEFAULT_GAME_STATE = {
  totalXP: 0,
  mathCoins: 0,
  unlockedItems: [],
};

const DEFAULT_NAVIGATION_STATE = {
  activeTab: 'learn',
  currentSubject: null,
  mathSubGame: null,
  dateTimeSubGame: null,
  isPlaying: false,
  gameConfig: { operation: 'add', difficulty: 'easy', nums: [], quizType: 'multiple' },
  selectedAssessmentId: null,
  currentAgeGroup: null,
  currentAgeGame: null,
  islamModule: null,
  islamTopic: null,
  islamYear: 1,
  matematikModule: null,
  matematikTopic: null,
  matematikYear: 1,
  bmModule: null,
  bmTopic: null,
  bmYear: 1,
};

function cleanNavigationState(saved = {}) {
  const text = (key) => typeof saved[key] === 'string' ? saved[key] : null;
  const year = (key) => [1, 2, 3].includes(saved[key]) ? saved[key] : 1;
  const config = saved.gameConfig && typeof saved.gameConfig === 'object' && !Array.isArray(saved.gameConfig)
    ? saved.gameConfig
    : {};

  return {
    activeTab: ['learn', 'leaderboard', 'profile', 'achievement'].includes(saved.activeTab) ? saved.activeTab : 'learn',
    currentSubject: text('currentSubject'),
    mathSubGame: text('mathSubGame'),
    dateTimeSubGame: text('dateTimeSubGame'),
    isPlaying: saved.isPlaying === true,
    gameConfig: {
      operation: typeof config.operation === 'string' ? config.operation : 'add',
      difficulty: typeof config.difficulty === 'string' ? config.difficulty : 'easy',
      nums: Array.isArray(config.nums) ? config.nums.filter(Number.isFinite) : [],
      quizType: typeof config.quizType === 'string' ? config.quizType : 'multiple',
    },
    selectedAssessmentId: Number.isInteger(saved.selectedAssessmentId) ? saved.selectedAssessmentId : null,
    currentAgeGroup: text('currentAgeGroup'),
    currentAgeGame: text('currentAgeGame'),
    islamModule: text('islamModule'),
    islamTopic: text('islamTopic'),
    islamYear: year('islamYear'),
    matematikModule: text('matematikModule'),
    matematikTopic: text('matematikTopic'),
    matematikYear: year('matematikYear'),
    bmModule: text('bmModule'),
    bmTopic: text('bmTopic'),
    bmYear: year('bmYear'),
  };
}

export function loadNavigationState() {
  try {
    const raw = localStorage.getItem(NAVIGATION_KEY);
    return raw ? cleanNavigationState(JSON.parse(raw)) : cleanNavigationState(DEFAULT_NAVIGATION_STATE);
  } catch {
    return cleanNavigationState(DEFAULT_NAVIGATION_STATE);
  }
}

export function saveNavigationState(state) {
  try { localStorage.setItem(NAVIGATION_KEY, JSON.stringify(cleanNavigationState(state))); }
  catch (err) { console.warn('[storageService] Failed to save navigation state:', err); }
}

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

// ── Login streak tracking ───────────────────────────────────────────────────

const toDateStr = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

/**
 * Record today's visit and return updated login data.
 * Structure stored inside mathAdventureData:
 *   { loginDates: ["2026-04-19", "2026-04-20", "2026-04-21", ...] }
 */
export function recordLogin() {
  try {
    const today = toDateStr();
    const raw = localStorage.getItem(STORAGE_KEY);
    const all = raw ? JSON.parse(raw) : {};
    const dates = Array.isArray(all.loginDates) ? all.loginDates : [];

    // Add today if not already present
    if (!dates.includes(today)) {
      dates.push(today);
      all.loginDates = dates;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    }
    return dates;
  } catch (err) {
    console.warn('[storageService] Failed to record login:', err);
    return [];
  }
}

/**
 * Load all recorded login dates (sorted ascending).
 */
export function loadLoginDates() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const all = JSON.parse(raw);
    return Array.isArray(all.loginDates) ? [...all.loginDates].sort() : [];
  } catch { return []; }
}

/**
 * Calculate the current consecutive-day streak ending on today (or yesterday).
 * Returns 0 if the user hasn't logged in recently.
 */
export function calcStreak(dates = []) {
  if (!dates.length) return 0;

  const sorted = [...dates].sort().reverse(); // most recent first
  const today  = toDateStr();
  const ONE_DAY_MS = 86400000;

  // streak requires today OR yesterday as the most recent date
  const mostRecent = sorted[0];
  const diffFromToday = (new Date(today) - new Date(mostRecent)) / ONE_DAY_MS;
  if (diffFromToday > 1) return 0; // missed more than 1 day → streak broken

  let streak = 1;
  for (let i = 1; i < sorted.length; i++) {
    const diff = (new Date(sorted[i - 1]) - new Date(sorted[i])) / ONE_DAY_MS;
    if (diff === 1) {
      streak++;
    } else {
      break; // gap found
    }
  }
  return streak;
}
