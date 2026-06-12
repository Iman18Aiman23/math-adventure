/**
 * localStorage implementation of GamificationRepository.
 * Features:
 * - Optimistic locking for cross-tab sync (via _version field)
 * - Storage event listener for cross-tab updates
 * - Error recovery (corrupted JSON handling)
 * - Quota monitoring
 */

import { GamificationRepository } from './GamificationRepo';
import {
  STORAGE_KEY,
  STORAGE_VERSION,
  STORAGE_QUOTA_BYTES,
  QUOTA_WARNING_THRESHOLD,
  DEFAULT_DAILY_GOAL_XP,
} from './gamificationConstants';

export class LocalGamificationRepo extends GamificationRepository {
  constructor() {
    super();
    this._setupStorageListener();
  }

  // =========================================================================
  // Public API
  // =========================================================================

  async getPlayerData(userId) {
    const store = this._read();

    if (!store?.player) {
      return {
        xp: 0,
        coins: 0,
        level: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        _version: 0,
      };
    }

    return store.player;
  }

  async savePlayerData(userId, data) {
    const store = this._read() || {};
    const current = store.player || { _version: 0 };

    // Optimistic locking: if version mismatch, merge intelligently
    if (data._version != null && data._version !== current._version) {
      const merged = {
        xp: Math.max(data.xp, current.xp),
        coins: Math.max(data.coins, current.coins),
        level: Math.max(data.level, current.level),
        createdAt: current.createdAt || data.createdAt,
        updatedAt: new Date().toISOString(),
        _version: (current._version || 0) + 1,
      };
      store.player = merged;
    } else {
      data.updatedAt = new Date().toISOString();
      data._version = (current._version || 0) + 1;
      store.player = data;
    }

    this._write(store);
  }

  async getAllTopicProgress(userId, subject) {
    const store = this._read();
    return store?.subjects?.[subject]?.topics || {};
  }

  async saveTopicProgress(userId, subject, topicId, data) {
    const store = this._read() || {};

    if (!store.subjects) store.subjects = {};
    if (!store.subjects[subject]) store.subjects[subject] = { topics: {} };

    store.subjects[subject].topics[topicId] = data;
    this._write(store);
  }

  async getStreakData(userId) {
    const store = this._read();

    return (
      store?.streak || {
        count: 0,
        lastActiveDate: null,
        highestStreak: 0,
        freezesAvailable: 0,
        goalXP: DEFAULT_DAILY_GOAL_XP,
        _version: 0,
      }
    );
  }

  async saveStreakData(userId, data) {
    const store = this._read() || {};
    const current = store.streak || { _version: 0 };

    // Optimistic locking for streak
    if (data._version != null && data._version !== current._version) {
      const merged = {
        count: Math.max(data.count, current.count),
        highestStreak: Math.max(data.highestStreak, current.highestStreak),
        lastActiveDate: data.lastActiveDate > current.lastActiveDate ? data.lastActiveDate : current.lastActiveDate,
        freezesAvailable: Math.max(data.freezesAvailable, current.freezesAvailable),
        goalXP: data.goalXP || current.goalXP,
        _version: (current._version || 0) + 1,
      };
      store.streak = merged;
    } else {
      data._version = (current._version || 0) + 1;
      store.streak = data;
    }

    this._write(store);
  }

  async getDailyXpLog(userId, date) {
    const store = this._read();
    return store?.dailyLogs?.[date] || { xp: 0, sessions: [], subjects: [] };
  }

  async appendDailyXpLog(userId, entry) {
    const store = this._read() || this._initializeStore();

    if (!store.dailyLogs) store.dailyLogs = {};

    const date = entry.date;
    const existing = store.dailyLogs[date] || { xp: 0, sessions: [], subjects: [] };

    existing.xp += entry.xpEarned;
    existing.sessions.push({
      source: entry.source,
      topicId: entry.topicId,
      subject: entry.subject,
      xpEarned: entry.xpEarned,
      timestamp: entry.timestamp || new Date().toISOString(),
    });

    if (!existing.subjects.includes(entry.subject)) {
      existing.subjects.push(entry.subject);
    }

    store.dailyLogs[date] = existing;
    this._write(store);
  }

  async exportAll(userId) {
    return this._read();
  }

  async importAll(userId, fullData) {
    this._write(fullData);
  }

  async getQuotaStatus(userId) {
    const store = this._read();
    const used = this._estimateSize(store);
    const percentage = (used / STORAGE_QUOTA_BYTES) * 100;

    return {
      used,
      limit: STORAGE_QUOTA_BYTES,
      percentage,
      warning: percentage > QUOTA_WARNING_THRESHOLD * 100,
      estimatedDaysUntilFull: this._estimateDaysUntilFull(used),
    };
  }

  async validateAndRepair(userId) {
    const store = this._read();

    if (!store) {
      return { status: 'corrupted', fixed: false, errors: ['No data found in localStorage'] };
    }

    const errors = [];
    const fixed = {
      userId: store.userId || this._generateUUID(),
      storageMetadata: store.storageMetadata || this._defaultMetadata(),
      player: store.player || this._defaultPlayer(),
      subjects: store.subjects || { bm: { topics: {} }, mt: { topics: {} }, pi: { topics: {} } },
      streak: store.streak || this._defaultStreak(),
      dailyLogs: store.dailyLogs || {},
    };

    // Validate required fields
    if (!fixed.player || typeof fixed.player.xp !== 'number') {
      errors.push('Repaired player stats structure');
    }

    if (!fixed.streak || typeof fixed.streak.count !== 'number') {
      errors.push('Repaired streak data structure');
    }

    if (!fixed.subjects || typeof fixed.subjects !== 'object') {
      errors.push('Repaired subjects structure');
    }

    this._write(fixed);

    return {
      status: errors.length > 0 ? 'repaired' : 'ok',
      fixed: errors.length > 0,
      errors,
    };
  }

  // =========================================================================
  // Private Methods
  // =========================================================================

  /**
   * Read localStorage, parse JSON, handle errors gracefully.
   * @private
   * @returns {GamificationState | null}
   */
  _read() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;

      const parsed = JSON.parse(raw);

      // Basic structure validation
      if (!parsed.player || typeof parsed.player.xp !== 'number') {
        console.error('[LocalGamificationRepo] Invalid player structure');
        return null;
      }

      return parsed;
    } catch (e) {
      console.error('[LocalGamificationRepo] Parse error:', e);
      return null;
    }
  }

  /**
   * Write store to localStorage atomically.
   * @private
   * @param {GamificationState} store
   */
  _write(store) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
      // The browser only fires 'storage' events in OTHER tabs. Broadcast to this
      // tab too, so independent useGamification instances (e.g. StatsBar) stay fresh.
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('gamification-sync'));
      }
    } catch (e) {
      if (e.name === 'QuotaExceededError') {
        console.error('[LocalGamificationRepo] localStorage quota exceeded');
      } else {
        console.error('[LocalGamificationRepo] Write error:', e);
      }
    }
  }

  /**
   * Setup listener for changes from other tabs.
   * @private
   */
  _setupStorageListener() {
    if (typeof window === 'undefined') return;

    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY) {
        // Data changed in another tab
        window.dispatchEvent(new CustomEvent('gamification-sync'));
      }
    });
  }

  /**
   * Estimate byte size of object when stringified.
   * @private
   * @param {any} obj
   * @returns {number}
   */
  _estimateSize(obj) {
    if (!obj) return 0;
    try {
      return new Blob([JSON.stringify(obj)]).size;
    } catch {
      return 0;
    }
  }

  /**
   * Estimate days until localStorage quota exceeded.
   * Assumes ~200 bytes per daily log session.
   * @private
   * @param {number} currentBytes
   * @returns {number}
   */
  _estimateDaysUntilFull(currentBytes) {
    const remainingBytes = STORAGE_QUOTA_BYTES - currentBytes;
    const bytesPerDay = 200 * 2; // 2 sessions per day average
    return Math.max(1, Math.floor(remainingBytes / bytesPerDay));
  }

  /**
   * Initialize a fresh store.
   * @private
   * @returns {GamificationState}
   */
  _initializeStore() {
    return {
      userId: this._generateUUID(),
      storageMetadata: this._defaultMetadata(),
      player: this._defaultPlayer(),
      subjects: {
        bm: { topics: {} },
        mt: { topics: {} },
        pi: { topics: {} },
      },
      streak: this._defaultStreak(),
      dailyLogs: {},
    };
  }

  /**
   * Default player stats.
   * @private
   * @returns {PlayerStats}
   */
  _defaultPlayer() {
    return {
      xp: 0,
      coins: 0,
      level: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      _version: 0,
    };
  }

  /**
   * Default streak data.
   * @private
   * @returns {StreakData}
   */
  _defaultStreak() {
    return {
      count: 0,
      lastActiveDate: null,
      highestStreak: 0,
      freezesAvailable: 0,
      goalXP: DEFAULT_DAILY_GOAL_XP,
      _version: 0,
    };
  }

  /**
   * Default storage metadata.
   * @private
   * @returns {StorageMetadata}
   */
  _defaultMetadata() {
    return {
      version: STORAGE_VERSION,
      quotaBytes: STORAGE_QUOTA_BYTES,
      quotaUsed: 0,
      lastCompression: new Date().toISOString(),
      compressionEnabled: true,
    };
  }

  /**
   * Generate a UUID v4.
   * @private
   * @returns {string}
   */
  _generateUUID() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
