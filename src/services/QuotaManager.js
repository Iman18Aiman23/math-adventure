/**
 * Quota Manager: Monitor and manage localStorage quota.
 * Features:
 * - Estimate current usage
 * - Archive old daily logs (>30 days)
 * - Compress wrong question arrays
 * - Warn when approaching quota limit
 */

import {
  STORAGE_KEY,
  STORAGE_QUOTA_BYTES,
  QUOTA_WARNING_THRESHOLD,
  DAYS_TO_KEEP_LIVE_LOGS,
} from './gamificationConstants';

/**
 * Estimate byte size of a JavaScript object when stringified.
 * @param {any} obj
 * @returns {number} Approximate bytes
 */
export function estimateSize(obj) {
  if (!obj) return 0;
  try {
    return new Blob([JSON.stringify(obj)]).size;
  } catch {
    return 0;
  }
}

/**
 * Get current quota usage status.
 * @returns {QuotaStatus}
 */
export function getQuotaStatus() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const store = raw ? JSON.parse(raw) : null;

    if (!store) {
      return {
        used: 0,
        limit: STORAGE_QUOTA_BYTES,
        percentage: 0,
        warning: false,
        estimatedDaysUntilFull: 999,
      };
    }

    const used = estimateSize(store);
    const percentage = (used / STORAGE_QUOTA_BYTES) * 100;
    const remainingBytes = STORAGE_QUOTA_BYTES - used;
    const bytesPerDay = 400; // ~200 bytes per session × 2 sessions/day
    const daysUntilFull = Math.max(1, Math.floor(remainingBytes / bytesPerDay));

    return {
      used,
      limit: STORAGE_QUOTA_BYTES,
      percentage,
      warning: percentage > QUOTA_WARNING_THRESHOLD * 100,
      estimatedDaysUntilFull: daysUntilFull,
    };
  } catch (e) {
    console.error('[QuotaManager] getQuotaStatus error:', e);
    return {
      used: 0,
      limit: STORAGE_QUOTA_BYTES,
      percentage: 0,
      warning: false,
      estimatedDaysUntilFull: 0,
    };
  }
}

/**
 * Archive daily logs older than specified days.
 * Moves old logs to _archived bucket, compresses to base64.
 * Keeps only recent logs uncompressed for fast access.
 *
 * @param {number} [daysToKeep=30] - Days of logs to keep live
 * @returns {Object} { archived: number of entries, freed: bytes freed }
 */
export function archiveOldLogs(daysToKeep = DAYS_TO_KEEP_LIVE_LOGS) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { archived: 0, freed: 0 };

    const store = JSON.parse(raw);
    if (!store.dailyLogs) return { archived: 0, freed: 0 };

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
    const cutoffISO = cutoffDate.toISOString().slice(0, 10);

    let archivedCount = 0;
    let freedBytes = 0;
    const toArchive = {};

    // Identify old logs to archive
    Object.entries(store.dailyLogs).forEach(([date, data]) => {
      if (date !== '_archived' && date < cutoffISO && typeof data === 'object') {
        toArchive[date] = data;
        freedBytes += estimateSize(data);
        archivedCount++;
        delete store.dailyLogs[date];
      }
    });

    // Compress to base64 if any old logs exist
    if (archivedCount > 0) {
      if (!store.dailyLogs._archived) {
        store.dailyLogs._archived = {};
      }

      const archiveKey = `${Object.keys(toArchive)[0]}_to_${Object.keys(toArchive).pop()}`;
      try {
        const compressed = btoa(JSON.stringify(toArchive));
        store.dailyLogs._archived[archiveKey] = compressed;
      } catch {
        // If btoa fails, store uncompressed in archive
        store.dailyLogs._archived[archiveKey] = toArchive;
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    }

    return { archived: archivedCount, freed: freedBytes };
  } catch (e) {
    console.error('[QuotaManager] archiveOldLogs error:', e);
    return { archived: 0, freed: 0 };
  }
}

/**
 * Compress wrong question arrays to reduce storage.
 * Keeps only last 10 per topic (instead of potentially unlimited).
 * @returns {Object} { compressed: number of topics, freed: bytes freed }
 */
export function compressWrongQuestions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { compressed: 0, freed: 0 };

    const store = JSON.parse(raw);
    if (!store.subjects) return { compressed: 0, freed: 0 };

    let compressedCount = 0;
    let freedBytes = 0;

    // Iterate all subjects → topics → wrongQuestions
    Object.values(store.subjects).forEach((subjectData) => {
      Object.values(subjectData.topics || {}).forEach((topic) => {
        if (topic.wrongQuestions && topic.wrongQuestions.length > 10) {
          const before = estimateSize(topic.wrongQuestions);
          topic.wrongQuestions = topic.wrongQuestions.slice(-10);
          const after = estimateSize(topic.wrongQuestions);
          freedBytes += before - after;
          compressedCount++;
        }
      });
    });

    if (compressedCount > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    }

    return { compressed: compressedCount, freed: freedBytes };
  } catch (e) {
    console.error('[QuotaManager] compressWrongQuestions error:', e);
    return { compressed: 0, freed: 0 };
  }
}

/**
 * Run full cleanup: archive old logs + compress wrong questions.
 * Called periodically (e.g., on app startup or weekly).
 * @returns {Object} { archived, compressed, totalFreed }
 */
export function runFullCleanup() {
  const archive = archiveOldLogs();
  const compress = compressWrongQuestions();

  return {
    archived: archive.archived,
    compressed: compress.compressed,
    totalFreed: archive.freed + compress.freed,
  };
}

/**
 * Clear all old archived logs (>90 days old).
 * Destructive operation; use with caution.
 * @returns {Object} { deleted: number of archived chunks, freed: bytes }
 */
export function purgeArchivedLogs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { deleted: 0, freed: 0 };

    const store = JSON.parse(raw);
    if (!store.dailyLogs?._archived) return { deleted: 0, freed: 0 };

    let deletedCount = 0;
    let freedBytes = 0;

    const archived = store.dailyLogs._archived;
    Object.entries(archived).forEach(([dateRange, data]) => {
      // Parse start date from key (e.g., "2026-05-01_to_2026-05-31" → "2026-05-01")
      const startDate = dateRange.split('_to_')[0];
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - 90);
      const cutoffISO = cutoff.toISOString().slice(0, 10);

      if (startDate < cutoffISO) {
        freedBytes += estimateSize(data);
        delete archived[dateRange];
        deletedCount++;
      }
    });

    if (deletedCount > 0) {
      if (Object.keys(archived).length === 0) {
        delete store.dailyLogs._archived;
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    }

    return { deleted: deletedCount, freed: freedBytes };
  } catch (e) {
    console.error('[QuotaManager] purgeArchivedLogs error:', e);
    return { deleted: 0, freed: 0 };
  }
}
