/**
 * Curriculum Index — Unified barrel for the bilingual icon-quiz curriculum
 *
 * Re-exports all curriculum modules + provides bilingual matching utilities.
 */

import bm_kv from './bm_kv.js';
import bm_kvk from './bm_kvk.js';
import en_long_vowels from './en_long_vowels.js';
import numbers from './numbers.js';
import common_objects from './common_objects.js';
import { getIcon, getIconKeys } from './IconFactory.js';

// ── Unified curriculum object ────────────────────────────────────────────────
export const CURRICULUM = {
  bm_kv,
  bm_kvk,
  en_long_vowels,
  numbers,
  common_objects,
};

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Get a shuffled copy of items for a category, optionally limited and filtered by subtheme */
export function getShuffledItems(categoryKey, limit = 0, subtheme = null) {
  const items = CURRICULUM[categoryKey];
  if (!items) return [];
  
  // Filter by subtheme if requested
  const pool = subtheme ? items.filter(item => item.subtheme === subtheme) : items;
  if (!pool.length) return [];
  
  const copy = [...pool];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return limit > 0 ? copy.slice(0, limit) : copy;
}

/** Get all available category keys */
export function getCurrencyKeys() {
  return Object.keys(CURRICULUM);
}

/**
 * Bilingual speech matching — language-aware.
 *
 * @param {object} item — curriculum item { id, icon, ms:{}, en:{} }
 * @param {string} lang — 'ms' or 'en'
 * @param {string} transcript — raw speech transcript
 * @param {number} confidence — 0.0–1.0
 * @param {boolean} isMobile
 * @returns {{ matched: boolean, method: string, crossLang: boolean }}
 */
export function checkBilingualMatch(item, lang, transcript, confidence = 1.0, isMobile = false) {
  if (!transcript || !item) {
    return { matched: false, method: 'none', crossLang: false };
  }

  const heard = transcript.toLowerCase().trim();
  const otherLang = lang === 'ms' ? 'en' : 'ms';

  // Confidence gate
  const minConfidence = isMobile ? 0.30 : 0.45;
  if (confidence > 0 && confidence < minConfidence) {
    return { matched: false, method: 'low-confidence', crossLang: false };
  }

  const target = item[lang];   // { word, prompt, matches }
  const other = item[otherLang];

  if (!target) return { matched: false, method: 'no-target', crossLang: false };

  // ── Stage 1: Direct word match ──────────────────────────────────────────
  const targetWord = (target.word || target.syllable || '').toLowerCase();
  if (heard === targetWord) {
    return { matched: true, method: 'direct', crossLang: false };
  }

  // ── Stage 2: Matches array ──────────────────────────────────────────────
  if (target.matches) {
    for (const m of target.matches) {
      if (heard === m.toLowerCase()) {
        return { matched: true, method: 'match-list', crossLang: false };
      }
    }
  }

  // ── Stage 3: Substring / fuzzy ──────────────────────────────────────────
  if (target.matches) {
    for (const m of target.matches) {
      const ml = m.toLowerCase();
      if (heard.length > 1 && ml.length > 1) {
        if (heard.includes(ml) || ml.includes(heard)) {
          return { matched: true, method: 'substring', crossLang: false };
        }
      }
    }
  }

  // ── Stage 4: Cross-language check ───────────────────────────────────────
  if (other && other.matches) {
    const otherWord = (other.word || other.syllable || '').toLowerCase();
    if (heard === otherWord) {
      return { matched: false, method: 'cross-lang-direct', crossLang: true };
    }
    for (const m of other.matches) {
      if (heard === m.toLowerCase()) {
        return { matched: false, method: 'cross-lang-match', crossLang: true };
      }
    }
  }

  // ── Stage 5: Word-level substring check ─────────────────────────────────
  const words = heard.split(/\s+/);
  for (const word of words) {
    if (word === targetWord) {
      return { matched: true, method: 'word-direct', crossLang: false };
    }
    if (target.matches) {
      for (const m of target.matches) {
        if (word === m.toLowerCase()) {
          return { matched: true, method: 'word-match', crossLang: false };
        }
      }
    }
  }

  return { matched: false, method: 'none', crossLang: false };
}

// Re-export IconFactory
export { getIcon, getIconKeys };
