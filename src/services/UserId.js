/**
 * User ID utility: Generate and retrieve unique user ID.
 * Uses crypto.randomUUID() with fallback polyfill for older browsers.
 */

const KEY = 'math-adventure-user-id';

/**
 * Get or create a unique user ID.
 * ID persists in localStorage; same ID across all sessions.
 * @returns {string} UUID v4
 */
export function getUserId() {
  let id = localStorage.getItem(KEY);

  if (!id) {
    id = generateUUID();
    localStorage.setItem(KEY, id);
  }

  return id;
}

/**
 * Set a user ID (e.g., when user logs in with account).
 * @param {string} id
 */
export function setUserId(id) {
  localStorage.setItem(KEY, id);
}

/**
 * Clear user ID (e.g., on logout).
 */
export function clearUserId() {
  localStorage.removeItem(KEY);
}

/**
 * Generate a UUID v4.
 * Uses crypto.randomUUID() if available, otherwise simple polyfill.
 * @private
 * @returns {string}
 */
function generateUUID() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Polyfill for older browsers
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
