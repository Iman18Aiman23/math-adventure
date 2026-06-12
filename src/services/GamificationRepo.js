/**
 * Abstract base class for gamification repository.
 * Defines the contract that all implementations (Local, API, DualWrite) must fulfill.
 * All methods return Promises for consistency (even localStorage ops, for future API swap).
 *
 * @abstract
 */

export class GamificationRepository {
  /**
   * Get player data (XP, level, coins, createdAt, updatedAt).
   * Player data is shared across all subjects.
   * @param {string} userId
   * @returns {Promise<PlayerStats>}
   */
  async getPlayerData(userId) {
    throw new Error('getPlayerData() not implemented');
  }

  /**
   * Save player data.
   * @param {string} userId
   * @param {PlayerStats} data
   * @returns {Promise<void>}
   */
  async savePlayerData(userId, data) {
    throw new Error('savePlayerData() not implemented');
  }

  /**
   * Get all topic progress for a subject.
   * Returns object keyed by topicId: { "topic-1": { crownLevel: 2, ... }, ... }
   * @param {string} userId
   * @param {string} subject - e.g., 'bm', 'mt', 'pi'
   * @returns {Promise<Record<string, TopicProgress>>}
   */
  async getAllTopicProgress(userId, subject) {
    throw new Error('getAllTopicProgress() not implemented');
  }

  /**
   * Save progress for a single topic in a subject.
   * @param {string} userId
   * @param {string} subject - e.g., 'bm', 'mt', 'pi'
   * @param {string} topicId
   * @param {TopicProgress} data
   * @returns {Promise<void>}
   */
  async saveTopicProgress(userId, subject, topicId, data) {
    throw new Error('saveTopicProgress() not implemented');
  }

  /**
   * Get streak data (count, lastActiveDate, highestStreak, freezesAvailable, goalXP).
   * Streak is shared across all subjects.
   * @param {string} userId
   * @returns {Promise<StreakData>}
   */
  async getStreakData(userId) {
    throw new Error('getStreakData() not implemented');
  }

  /**
   * Save streak data.
   * @param {string} userId
   * @param {StreakData} data
   * @returns {Promise<void>}
   */
  async saveStreakData(userId, data) {
    throw new Error('saveStreakData() not implemented');
  }

  /**
   * Get daily XP log for a specific date.
   * Returns aggregated log with sessions array.
   * @param {string} userId
   * @param {string} date - ISO 8601 date (YYYY-MM-DD)
   * @returns {Promise<DailyLogSummary>}
   */
  async getDailyXpLog(userId, date) {
    throw new Error('getDailyXpLog() not implemented');
  }

  /**
   * Append a single session entry to daily log.
   * Automatically updates date aggregate.
   * @param {string} userId
   * @param {DailyLogEntry} entry
   * @returns {Promise<void>}
   */
  async appendDailyXpLog(userId, entry) {
    throw new Error('appendDailyXpLog() not implemented');
  }

  /**
   * Export all gamification data for a user (backup/migration).
   * @param {string} userId
   * @returns {Promise<GamificationState | null>}
   */
  async exportAll(userId) {
    throw new Error('exportAll() not implemented');
  }

  /**
   * Import full gamification state (restore/migration).
   * @param {string} userId
   * @param {GamificationState} fullData
   * @returns {Promise<void>}
   */
  async importAll(userId, fullData) {
    throw new Error('importAll() not implemented');
  }

  /**
   * Get quota usage status (optional, for localStorage implementations).
   * @param {string} userId
   * @returns {Promise<QuotaStatus>}
   */
  async getQuotaStatus(userId) {
    return { used: 0, limit: 5242880, percentage: 0, warning: false, estimatedDaysUntilFull: 0 };
  }

  /**
   * Validate and repair corrupted data (optional, for localStorage implementations).
   * @param {string} userId
   * @returns {Promise<RepairResult>}
   */
  async validateAndRepair(userId) {
    return { status: 'ok', fixed: false };
  }
}
