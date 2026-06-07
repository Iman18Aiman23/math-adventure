const STORAGE_KEY = 'bm-progress';

function getProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function isTopicCompleted(topicId) {
  const prog = getProgress();
  return prog[topicId] === true;
}

export function markTopicCompleted(topicId) {
  const prog = getProgress();
  prog[topicId] = true;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prog));
  } catch {
    /* localStorage full or unavailable */
  }
}

export function clearAllProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* unavailable */
  }
}
