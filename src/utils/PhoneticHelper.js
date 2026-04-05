/**
 * PhoneticHelper — Global Phonetic Bridge for Speech Recognition
 *
 * Maps common AI "hallucinations" and consonant swaps to target curriculum words.
 * This replaces naive string matching with a phonetic probability model.
 *
 * Architecture:
 *   PHONETIC_MAP: { mishearing → targetText }
 *   resolve(heard) → targetText | null
 *   isMatch(item, transcript, confidence) → { matched, method }
 *
 * Consonant swap rules applied:
 *   p ↔ b, t ↔ d, k ↔ g, f ↔ v, s ↔ z, n ↔ m
 */

// ─── PHONETIC MAP ────────────────────────────────────────────────────────────
// Key: what the AI might hear (lowercase)
// Value: what the target curriculum text actually is (lowercase)
const PHONETIC_MAP = {};

/**
 * Register a target word and all its possible mishearings.
 * @param {string} target — the correct curriculum text
 * @param {string[]} mishearings — what the AI might hear instead
 */
function register(target, mishearings) {
  const t = target.toLowerCase();
  mishearings.forEach((m) => {
    const key = m.toLowerCase().trim();
    if (key && key !== t) {
      // If already mapped to a different target, keep the first mapping
      // (first registration wins — more specific categories registered first)
      if (!PHONETIC_MAP[key]) {
        PHONETIC_MAP[key] = t;
      }
    }
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// BM SUKU KATA KV (Konsonan-Vokal)
// ─────────────────────────────────────────────────────────────────────────────

// BA — consonant swaps p→b, t→d, plus English confusions
register('ba', [
  'pa', 'pah', 'par', 'bar', 'bah', 'baa', 'baah', 'baba',
  'da', 'dah', 'ta', 'fa', 'va',
  'bad', 'bat', 'bag', 'back', 'bath',
  'but', 'buy', 'bye',
]);

// BI — consonant swaps p→b, plus English confusions
register('bi', [
  'pi', 'pee', 'pih', 'bee', 'bih', 'bii', 'bibi',
  'di', 'dee', 'tea', 'ti', 'fee', 'fi',
  'be', 'big', 'bit', 'bid', 'bill',
  'pilly', 'billy', 'lily',
  'me', 'mi', 'my',
]);

// BU — the critical one: "BU" heard as "PU"
register('bu', [
  'pu', 'poo', 'puh', 'boo', 'buu', 'blue',
  'du', 'doo', 'tu', 'too', 'two',
  'fu', 'foo', 'who', 'woo', 'you',
  'ibu', 'buku', 'bubu',
  'boot', 'bull', 'bus', 'but',
  'put', 'pull', 'push',
]);

// BE — consonant swaps
register('be', [
  'pe', 'bay', 'bey', 'beh', 'ber', 'belajar',
  'day', 'they', 'de', 'per', 'pay', 'the',
  'bear', 'bare', 'beer', 'been',
  'pear', 'pair', 'dare',
]);

// BÉ — similar to BE
register('bé', [
  'pe', 'bay', 'bey', 'bear', 'béla', 'bela',
  'play', 'prey', 'pray', 'pay',
]);

// BO — consonant swaps
register('bo', [
  'po', 'poh', 'bow', 'boh', 'boo', 'bola', 'boa',
  'low', 'know', 'go', 'no', 'show', 'so',
  'do', 'doh', 'toe', 'tow',
  'bone', 'bore', 'born', 'boy',
  'pour', 'pole', 'goal',
]);

// ─── KV consonant swap grid (systematic: p↔b, t↔d, k↔g) ─────────────────

// Generate swaps for consonant pairs across all vowels
const VOWELS = ['a', 'i', 'u', 'e', 'o'];
const CONSONANT_SWAPS = [
  ['b', 'p'], ['p', 'b'],
  ['d', 't'], ['t', 'd'],
  ['g', 'k'], ['k', 'g'],
  ['f', 'v'], ['v', 'f'],
  ['s', 'z'], ['z', 's'],
  ['n', 'm'], ['m', 'n'],
];

// For every consonant swap pair, register vowel combinations
CONSONANT_SWAPS.forEach(([from, to]) => {
  VOWELS.forEach((v) => {
    const target = from + v;
    const mishearing = to + v;
    // Only register if not already in the map with a more specific mapping
    if (!PHONETIC_MAP[mishearing]) {
      register(target, [mishearing]);
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// BM SUKU KATA KVK (Konsonan-Vokal-Konsonan)
// ─────────────────────────────────────────────────────────────────────────────

register('ban', [
  'pan', 'band', 'baan', 'barn', 'bang', 'bun', 'ben',
  'van', 'fan', 'dan', 'tan', 'man', 'can',
  'bane', 'pain', 'dane',
]);

register('bin', [
  'pin', 'been', 'bean', 'ben', 'bing', 'bins',
  'fin', 'din', 'tin', 'win', 'gin', 'kin',
  'pine', 'bind', 'blind', 'mine',
]);

register('bun', [
  'pun', 'bone', 'boon', 'bung', 'bunny', 'ban', 'buns',
  'fun', 'done', 'dun', 'gun', 'nun', 'run', 'sun', 'ton',
  'bunt', 'punt', 'stun',
]);

register('ben', [
  'pen', 'ban', 'bin', 'beng', 'bend', 'been', 'bent',
  'den', 'ten', 'hen', 'men', 'ken', 'fen',
  'pain', 'pane',
]);

register('bon', [
  'pon', 'bone', 'born', 'bong', 'bond', 'bonn',
  'don', 'gone', 'tone', 'cone', 'on', 'dawn',
  'phone', 'fon', 'john',
]);

// ─── KVK consonant swap grid ─────────────────────────────────────────────────
// Extend for common KVK endings
const ENDINGS = ['n', 'ng', 'k', 'm', 't', 'l', 'r', 's'];
CONSONANT_SWAPS.slice(0, 6).forEach(([from, to]) => {
  VOWELS.forEach((v) => {
    ENDINGS.forEach((end) => {
      const target = from + v + end;
      const mishearing = to + v + end;
      if (!PHONETIC_MAP[mishearing]) {
        register(target, [mishearing]);
      }
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// ENGLISH PHONICS
// ─────────────────────────────────────────────────────────────────────────────

register('lake', [
  'lakes', 'lace', 'late', 'lay', 'like', 'lack', 'leg',
  'make', 'take', 'fake', 'sake', 'wake', 'bake', 'rake',
  'lick', 'look', 'luck', 'leak', 'link',
]);

register('kite', [
  'kites', 'kit', 'quite', 'knight', 'right', 'kai',
  'bite', 'site', 'sight', 'might', 'fight', 'light', 'night', 'tight', 'white',
  'cat', 'cut', 'coat', 'cute',
]);

register('rope', [
  'ropes', 'robe', 'row', 'road', 'roap',
  'hope', 'cope', 'dope', 'mope', 'pope', 'scope',
  'rob', 'rock', 'role', 'roll', 'rose',
]);

register('tune', [
  'tunes', 'toon', 'too', 'tomb', 'two', 'ton',
  'dune', 'june', 'moon', 'noon', 'soon', 'spoon',
  'teen', 'tin', 'tan', 'ten',
]);

register('cake', [
  'cakes', 'cate', 'cape', 'take', 'kate',
  'make', 'bake', 'fake', 'lake', 'sake', 'wake', 'rake',
  'cook', 'coke', 'cork',
]);

register('bike', [
  'bikes', 'by', 'buy', 'bite', 'like', 'mike',
  'pike', 'hike', 'strike', 'spike',
  'back', 'book', 'buck',
]);

register('home', [
  'homes', 'hole', 'hone', 'ohm', 'foam',
  'dome', 'gnome', 'rome', 'chrome', 'some', 'come',
  'ham', 'him', 'hum', 'helm',
]);

register('cube', [
  'cubes', 'tube', 'cue', 'cute', 'coupe',
  'cub', 'cup', 'curb', 'curve',
  'lube', 'rube',
]);

// ─────────────────────────────────────────────────────────────────────────────
// MATH 0–100 — Number Hallucinations
// ─────────────────────────────────────────────────────────────────────────────

register('0', [
  'zero', 'xero', 'hero', 'nero', 'arrow',
  'kosong', 'sifar', 'sifir', 'nil', 'null', 'none',
  'oh', 'o',
]);

register('1', [
  'one', 'won', 'wan', 'wand', 'once',
  'satu', 'sun', 'son',
  'a', 'an', 'on',
]);

register('2', [
  'two', 'too', 'to', 'tu',
  'dua', 'do a', 'do',
  'true', 'through', 'threw', 'shoe',
]);

register('3', [
  'three', 'tree', 'free', 'fee',
  'tiga', 'trigger',
  'tea', 'the',
]);

register('4', [
  'four', 'for', 'fore', 'ford', 'fourth', 'force',
  'empat', 'empire',
  'far', 'fire', 'fur',
]);

register('5', [
  'five', 'fife', 'hive', 'high five', 'jive',
  'lima', 'lime',
  'fine', 'vine', 'mine', 'line',
]);

register('6', [
  'six', 'sick', 'sex', 'sticks', 'fix', 'mix', 'picks',
  'enam',
  'sit', 'set', 'sing',
]);

register('7', [
  'seven', 'heaven', 'evan', 'eleven',
  'tujuh', 'to joe',
  'send', 'said', 'sedan',
]);

register('8', [
  'eight', 'ate', 'at', 'it', 'eat', 'aide',
  'lapan', 'la pan',
  'age', 'ay', 'hey', 'hate', 'late', 'gate', 'mate', 'wait',
]);

register('9', [
  'nine', 'mine', 'line', 'fine', 'wine', 'dine', 'sign',
  'sembilan',
  'kind', 'mind', 'night', 'nigh',
]);

register('10', [
  'ten', 'tan', 'tin', 'teen', 'den', 'then', 'hen', 'pen',
  'sepuluh',
  'tent', 'tend', 'tense',
]);

register('11', [
  'eleven', 'a levin', 'heaven',
  'sebelas', 'se belas',
]);

register('12', [
  'twelve', 'twelfth', 'shelf',
  'dua belas',
]);

register('13', [
  'thirteen', 'thirty', 'thirsty', 'dirty',
  'tiga belas',
]);

register('14', [
  'fourteen', 'forty', 'fortune', 'forteen',
  'empat belas',
]);

register('15', [
  'fifteen', 'fifty', 'fiction',
  'lima belas',
]);

register('16', [
  'sixteen', 'sixty', 'sister',
  'enam belas',
]);

register('17', [
  'seventeen', 'seventy',
  'tujuh belas',
]);

register('18', [
  'eighteen', 'eighty', 'eating',
  'lapan belas',
]);

register('19', [
  'nineteen', 'ninety', 'night teen',
  'sembilan belas',
]);

register('20', [
  'twenty', 'plenty', 'entry',
  'dua puluh',
]);

// ─── Numbers 21–100: register Malay words as bridges ─────────────────────
// These are generated systematically
const MALAY_TENS = ['', '', 'dua puluh', 'tiga puluh', 'empat puluh', 'lima puluh',
  'enam puluh', 'tujuh puluh', 'lapan puluh', 'sembilan puluh'];
const MALAY_ONES = ['', 'satu', 'dua', 'tiga', 'empat', 'lima',
  'enam', 'tujuh', 'lapan', 'sembilan'];

for (let n = 21; n <= 99; n++) {
  const tens = Math.floor(n / 10);
  const ones = n % 10;
  const malayFull = ones > 0
    ? `${MALAY_TENS[tens]} ${MALAY_ONES[ones]}`
    : MALAY_TENS[tens];
  if (malayFull) {
    register(String(n), [malayFull]);
  }
}
register('100', ['seratus', 'one hundred', 'a hundred', '100']);

// ─────────────────────────────────────────────────────────────────────────────
// PHONETIC HELPER API
// ─────────────────────────────────────────────────────────────────────────────

const PhoneticHelper = {
  /**
   * Reverse-lookup: given what the AI heard, return the target text.
   * @param {string} heard — raw transcript from speech API
   * @returns {string|null} — the curriculum target text, or null
   */
  resolve(heard) {
    if (!heard) return null;
    const clean = heard.toLowerCase().trim();
    return PHONETIC_MAP[clean] || null;
  },

  /**
   * Smart match: check if a transcript matches a curriculum item.
   * Uses a 4-stage pipeline:
   *   1. Direct match (transcript === item.text)
   *   2. validMatches check (item.validMatches includes transcript)
   *   3. Phonetic bridge (PhoneticHelper maps transcript to item.text)
   *   4. Substring/fuzzy check (relaxed containment)
   *
   * @param {object} item — curriculum item { text, validMatches }
   * @param {string} transcript — raw AI transcript
   * @param {number} confidence — 0.0–1.0 from speech API
   * @param {boolean} isMobile — whether on mobile device
   * @returns {{ matched: boolean, method: string }}
   */
  isMatch(item, transcript, confidence = 1.0, isMobile = false) {
    if (!transcript || !item) {
      return { matched: false, method: 'none' };
    }

    const heard = transcript.toLowerCase().trim();
    const target = item.text.toLowerCase().trim();

    // ── Confidence gate ────────────────────────────────────────────────────
    // Tiered threshold: lower on mobile (children's mics are noisy)
    const minConfidence = isMobile ? 0.30 : 0.45;
    if (confidence > 0 && confidence < minConfidence) {
      return { matched: false, method: 'low-confidence' };
    }

    // ── Stage 1: Direct match ──────────────────────────────────────────────
    if (heard === target) {
      return { matched: true, method: 'direct' };
    }

    // ── Stage 2: validMatches check ────────────────────────────────────────
    if (item.validMatches && item.validMatches.some((v) => {
      const vm = v.toLowerCase();
      return heard === vm;
    })) {
      return { matched: true, method: 'validMatch' };
    }

    // ── Stage 3: Phonetic bridge ───────────────────────────────────────────
    const resolved = PHONETIC_MAP[heard];
    if (resolved && resolved === target) {
      return { matched: true, method: 'phonetic' };
    }

    // ── Stage 4: Substring / fuzzy containment ─────────────────────────────
    // Only for short targets (syllables) — check if heard contains the target
    // or target contains heard (for single-syllable matches)
    if (item.validMatches && item.validMatches.some((v) => {
      const vm = v.toLowerCase();
      // heard contains a valid match word, or a valid match word contains heard
      return (heard.length > 1 && vm.length > 1) &&
             (heard.includes(vm) || vm.includes(heard));
    })) {
      return { matched: true, method: 'substring' };
    }

    // ── Stage 5: Phonetic bridge with all alternatives ─────────────────────
    // Check if ANY word the AI heard resolves to our target via the bridge
    const words = heard.split(/\s+/);
    for (const word of words) {
      const wordResolved = PHONETIC_MAP[word];
      if (wordResolved && wordResolved === target) {
        return { matched: true, method: 'phonetic-word' };
      }
    }

    return { matched: false, method: 'none' };
  },

  /**
   * Get all registered curriculum words (for JSGF grammar).
   * Returns a flat array of unique target words.
   */
  getAllTargets() {
    const targets = new Set(Object.values(PHONETIC_MAP));
    // Also add all the keys (mishearings) as they are valid speech
    Object.keys(PHONETIC_MAP).forEach((k) => targets.add(k));
    return [...targets];
  },

  /**
   * Get the raw map for debugging.
   */
  getMap() {
    return { ...PHONETIC_MAP };
  },

  /**
   * Get map size for debugging.
   */
  get size() {
    return Object.keys(PHONETIC_MAP).length;
  },
};

export default PhoneticHelper;
