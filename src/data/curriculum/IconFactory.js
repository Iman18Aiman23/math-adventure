/**
 * IconFactory — Simple Flat Vector SVG Icons for the Curriculum
 *
 * STYLE: Modern Minimalist (like a premium UI icon set)
 * RULES:
 *   - Max 15 lines of code per icon
 *   - Single <path d="..." /> or simple <circle>/<rect> tags only
 *   - No gradients, no complex filters
 *   - ViewBox: 0 0 64 64
 *   - All icons accept optional size (default 64) and color props
 */

/**
 * Returns an SVG string for the given icon key.
 * @param {string} key   — icon name (e.g. 'ball', 'book')
 * @param {object} opts  — { size: 64, color: '#333' }
 * @returns {string} SVG markup string
 */
export function getIcon(key, opts = {}) {
  const size = opts.size || 64;
  const color = opts.color || '#333333';
  const fn = ICONS[key];
  if (!fn) {
    console.warn(`[IconFactory] Unknown icon: "${key}"`);
    return _placeholder(size, color);
  }
  return fn(size, color);
}

/**
 * Returns a list of all registered icon keys.
 */
export function getIconKeys() {
  return Object.keys(ICONS);
}

// ── Placeholder for missing icons ──────────────────────────────────────────────
function _placeholder(s, c) {
  return `<svg viewBox="0 0 64 64" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="28" fill="none" stroke="${c}" stroke-width="2" stroke-dasharray="4 4"/>
    <text x="32" y="38" text-anchor="middle" font-size="20" fill="${c}">?</text>
  </svg>`;
}

// ── SVG wrapper helper ─────────────────────────────────────────────────────────
function _svg(s, inner) {
  return `<svg viewBox="0 0 64 64" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
}

// ═══════════════════════════════════════════════════════════════════════════════
//  ICON REGISTRY — Phase 1: First 10 Icons
// ═══════════════════════════════════════════════════════════════════════════════

const ICONS = {

  // 1. Ball — simple circle with a curved line
  ball: (s, c) => _svg(s, `
    <circle cx="32" cy="32" r="24" fill="${c}" opacity="0.15"/>
    <circle cx="32" cy="32" r="24" fill="none" stroke="${c}" stroke-width="2.5"/>
    <path d="M18 20 Q32 38 46 20" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round"/>
  `),

  // 2. Book — open book shape
  book: (s, c) => _svg(s, `
    <path d="M32 14 L12 18 L12 50 L32 46 L52 50 L52 18 Z" fill="${c}" opacity="0.12"/>
    <path d="M32 14 L12 18 L12 50 L32 46 L52 50 L52 18 Z" fill="none" stroke="${c}" stroke-width="2.5" stroke-linejoin="round"/>
    <line x1="32" y1="14" x2="32" y2="46" stroke="${c}" stroke-width="2"/>
  `),

  // 3. Sun — circle with rays
  sun: (s, c) => _svg(s, `
    <circle cx="32" cy="32" r="12" fill="${c}" opacity="0.2"/>
    <circle cx="32" cy="32" r="12" fill="none" stroke="${c}" stroke-width="2.5"/>
    <path d="M32 8 L32 14 M32 50 L32 56 M8 32 L14 32 M50 32 L56 32 M15 15 L19 19 M45 45 L49 49 M49 15 L45 19 M19 45 L15 49" stroke="${c}" stroke-width="2.5" stroke-linecap="round"/>
  `),

  // 4. Cat — minimal cat face
  cat: (s, c) => _svg(s, `
    <circle cx="32" cy="36" r="18" fill="${c}" opacity="0.12"/>
    <circle cx="32" cy="36" r="18" fill="none" stroke="${c}" stroke-width="2.5"/>
    <polygon points="16,22 12,6 24,18" fill="none" stroke="${c}" stroke-width="2.5" stroke-linejoin="round"/>
    <polygon points="48,22 52,6 40,18" fill="none" stroke="${c}" stroke-width="2.5" stroke-linejoin="round"/>
    <circle cx="26" cy="34" r="2.5" fill="${c}"/>
    <circle cx="38" cy="34" r="2.5" fill="${c}"/>
    <path d="M29 40 Q32 43 35 40" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round"/>
  `),

  // 5. Apple — apple shape with stem
  apple: (s, c) => _svg(s, `
    <path d="M32 16 Q44 16 48 30 Q52 48 32 54 Q12 48 16 30 Q20 16 32 16 Z" fill="${c}" opacity="0.15"/>
    <path d="M32 16 Q44 16 48 30 Q52 48 32 54 Q12 48 16 30 Q20 16 32 16 Z" fill="none" stroke="${c}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M32 16 Q34 8 38 6" fill="none" stroke="${c}" stroke-width="2.5" stroke-linecap="round"/>
  `),

  // 6. Star — 5-point star
  star: (s, c) => _svg(s, `
    <path d="M32 8 L37 24 L54 24 L40 34 L45 50 L32 40 L19 50 L24 34 L10 24 L27 24 Z" fill="${c}" opacity="0.15"/>
    <path d="M32 8 L37 24 L54 24 L40 34 L45 50 L32 40 L19 50 L24 34 L10 24 L27 24 Z" fill="none" stroke="${c}" stroke-width="2.5" stroke-linejoin="round"/>
  `),

  // 7. Fish — simple fish shape
  fish: (s, c) => _svg(s, `
    <path d="M14 32 Q24 16 42 28 L54 18 L54 46 L42 36 Q24 48 14 32 Z" fill="${c}" opacity="0.12"/>
    <path d="M14 32 Q24 16 42 28 L54 18 L54 46 L42 36 Q24 48 14 32 Z" fill="none" stroke="${c}" stroke-width="2.5" stroke-linejoin="round"/>
    <circle cx="24" cy="30" r="2.5" fill="${c}"/>
  `),

  // 8. Tree — simple tree with trunk
  tree: (s, c) => _svg(s, `
    <rect x="28" y="40" width="8" height="16" rx="2" fill="${c}" opacity="0.3"/>
    <path d="M32 8 L48 42 L16 42 Z" fill="${c}" opacity="0.15"/>
    <path d="M32 8 L48 42 L16 42 Z" fill="none" stroke="${c}" stroke-width="2.5" stroke-linejoin="round"/>
    <rect x="28" y="40" width="8" height="16" rx="2" fill="none" stroke="${c}" stroke-width="2.5"/>
  `),

  // 9. House — simple house shape
  house: (s, c) => _svg(s, `
    <path d="M32 10 L54 30 L54 54 L10 54 L10 30 Z" fill="${c}" opacity="0.12"/>
    <path d="M32 10 L54 30 L54 54 L10 54 L10 30 Z" fill="none" stroke="${c}" stroke-width="2.5" stroke-linejoin="round"/>
    <rect x="26" y="38" width="12" height="16" rx="1" fill="none" stroke="${c}" stroke-width="2.5"/>
  `),

  // 10. Flower — simple 5-petal flower
  flower: (s, c) => _svg(s, `
    <circle cx="32" cy="28" r="7" fill="${c}" opacity="0.12" stroke="${c}" stroke-width="2"/>
    <circle cx="24" cy="34" r="7" fill="${c}" opacity="0.12" stroke="${c}" stroke-width="2"/>
    <circle cx="40" cy="34" r="7" fill="${c}" opacity="0.12" stroke="${c}" stroke-width="2"/>
    <circle cx="26" cy="42" r="7" fill="${c}" opacity="0.12" stroke="${c}" stroke-width="2"/>
    <circle cx="38" cy="42" r="7" fill="${c}" opacity="0.12" stroke="${c}" stroke-width="2"/>
    <circle cx="32" cy="36" r="5" fill="${c}"/>
    <line x1="32" y1="42" x2="32" y2="58" stroke="${c}" stroke-width="3" stroke-linecap="round"/>
  `),

  // ═══════════════════════════════════════════════════════════════════════════
  //  Phase 2: BM Curriculum Icons
  // ═══════════════════════════════════════════════════════════════════════════

  cup: (s, c) => _svg(s, `
    <rect x="18" y="16" width="24" height="32" rx="4" fill="${c}" opacity="0.12" stroke="${c}" stroke-width="2.5"/>
    <path d="M42 24 Q52 24 52 32 Q52 40 42 40" fill="none" stroke="${c}" stroke-width="2.5"/>
  `),

  ring: (s, c) => _svg(s, `
    <circle cx="32" cy="38" r="14" fill="none" stroke="${c}" stroke-width="3"/>
    <path d="M26 26 L32 14 L38 26" fill="${c}" opacity="0.2" stroke="${c}" stroke-width="2.5" stroke-linejoin="round"/>
  `),

  dice: (s, c) => _svg(s, `
    <rect x="14" y="14" width="36" height="36" rx="6" fill="${c}" opacity="0.12" stroke="${c}" stroke-width="2.5"/>
    <circle cx="24" cy="24" r="3" fill="${c}"/><circle cx="32" cy="32" r="3" fill="${c}"/><circle cx="40" cy="40" r="3" fill="${c}"/>
  `),

  coin: (s, c) => _svg(s, `
    <circle cx="32" cy="32" r="20" fill="${c}" opacity="0.12" stroke="${c}" stroke-width="2.5"/>
    <circle cx="32" cy="32" r="13" fill="none" stroke="${c}" stroke-width="1.5" stroke-dasharray="4 3"/>
  `),

  fork: (s, c) => _svg(s, `
    <path d="M22 10 L22 28 M32 10 L32 28 M42 10 L42 28" stroke="${c}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M22 28 Q22 36 32 36 Q42 36 42 28" fill="none" stroke="${c}" stroke-width="2.5"/>
    <line x1="32" y1="36" x2="32" y2="56" stroke="${c}" stroke-width="3" stroke-linecap="round"/>
  `),

  tooth: (s, c) => _svg(s, `
    <path d="M20 12 Q18 30 22 46 Q24 52 28 42 L32 36 L36 42 Q40 52 42 46 Q46 30 44 12 Q38 8 32 8 Q26 8 20 12 Z" fill="${c}" opacity="0.12" stroke="${c}" stroke-width="2.5"/>
  `),

  mountain: (s, c) => _svg(s, `
    <path d="M4 52 L24 16 L34 32 L44 18 L60 52 Z" fill="${c}" opacity="0.12" stroke="${c}" stroke-width="2.5" stroke-linejoin="round"/>
  `),

  rain: (s, c) => _svg(s, `
    <path d="M18 30 Q14 18 26 14 Q32 8 40 14 Q50 12 50 24 Q56 28 50 34 L14 34 Q8 30 18 30 Z" fill="${c}" opacity="0.12" stroke="${c}" stroke-width="2"/>
    <line x1="22" y1="42" x2="20" y2="52" stroke="${c}" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="32" y1="42" x2="30" y2="52" stroke="${c}" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="42" y1="42" x2="40" y2="52" stroke="${c}" stroke-width="2.5" stroke-linecap="round"/>
  `),

  clock: (s, c) => _svg(s, `
    <circle cx="32" cy="32" r="22" fill="${c}" opacity="0.12" stroke="${c}" stroke-width="2.5"/>
    <line x1="32" y1="32" x2="32" y2="16" stroke="${c}" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="32" y1="32" x2="44" y2="38" stroke="${c}" stroke-width="2" stroke-linecap="round"/>
    <circle cx="32" cy="32" r="2.5" fill="${c}"/>
  `),

  heart: (s, c) => _svg(s, `
    <path d="M32 50 Q12 36 12 22 Q12 12 22 12 Q32 12 32 22 Q32 12 42 12 Q52 12 52 22 Q52 36 32 50 Z" fill="${c}" opacity="0.15" stroke="${c}" stroke-width="2.5" stroke-linejoin="round"/>
  `),

  ship: (s, c) => _svg(s, `
    <path d="M8 42 L16 28 L48 28 L56 42 Z" fill="${c}" opacity="0.12" stroke="${c}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M32 28 L32 8 L50 26" fill="none" stroke="${c}" stroke-width="2.5" stroke-linejoin="round"/>
    <line x1="6" y1="50" x2="58" y2="50" stroke="${c}" stroke-width="2.5" stroke-linecap="round"/>
  `),

  hand: (s, c) => _svg(s, `
    <path d="M22 50 L22 22 Q22 12 32 12 Q42 12 42 22 L42 50 Z" fill="${c}" opacity="0.12" stroke="${c}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M42 30 Q50 28 50 34 Q50 40 42 38" fill="none" stroke="${c}" stroke-width="2.5"/>
  `),

  moon: (s, c) => _svg(s, `
    <path d="M40 8 Q14 16 14 32 Q14 48 40 56 Q26 48 26 32 Q26 16 40 8 Z" fill="${c}" opacity="0.15" stroke="${c}" stroke-width="2.5"/>
  `),

  candle: (s, c) => _svg(s, `
    <rect x="26" y="26" width="12" height="28" rx="2" fill="${c}" opacity="0.15" stroke="${c}" stroke-width="2.5"/>
    <path d="M32 26 L32 18 Q28 12 32 6 Q36 12 32 18" fill="${c}" opacity="0.3" stroke="${c}" stroke-width="2"/>
  `),

  wave: (s, c) => _svg(s, `
    <path d="M8 24 Q16 16 24 24 Q32 32 40 24 Q48 16 56 24" fill="none" stroke="${c}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M8 36 Q16 28 24 36 Q32 44 40 36 Q48 28 56 36" fill="none" stroke="${c}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M8 48 Q16 40 24 48 Q32 56 40 48 Q48 40 56 48" fill="none" stroke="${c}" stroke-width="2.5" stroke-linecap="round"/>
  `),

  bird: (s, c) => _svg(s, `
    <circle cx="22" cy="24" r="8" fill="${c}" opacity="0.12" stroke="${c}" stroke-width="2.5"/>
    <ellipse cx="36" cy="32" rx="16" ry="10" fill="${c}" opacity="0.12" stroke="${c}" stroke-width="2.5"/>
    <path d="M14 24 L6 22 L14 26" fill="${c}" stroke="${c}" stroke-width="2"/><circle cx="20" cy="22" r="2" fill="${c}"/>
    <line x1="30" y1="42" x2="28" y2="52" stroke="${c}" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="42" x2="38" y2="52" stroke="${c}" stroke-width="2.5" stroke-linecap="round"/>
  `),

  umbrella: (s, c) => _svg(s, `
    <path d="M8 32 Q8 10 32 10 Q56 10 56 32" fill="${c}" opacity="0.12" stroke="${c}" stroke-width="2.5"/>
    <line x1="32" y1="10" x2="32" y2="50" stroke="${c}" stroke-width="2.5"/>
    <path d="M32 50 Q32 56 26 56" fill="none" stroke="${c}" stroke-width="2.5" stroke-linecap="round"/>
  `),

  knife: (s, c) => _svg(s, `
    <path d="M32 6 L38 36 L32 38 L26 36 Z" fill="${c}" opacity="0.12" stroke="${c}" stroke-width="2.5" stroke-linejoin="round"/>
    <rect x="28" y="38" width="8" height="18" rx="2" fill="${c}" opacity="0.2" stroke="${c}" stroke-width="2.5"/>
  `),

  cloud: (s, c) => _svg(s, `
    <path d="M18 40 Q8 40 8 30 Q8 22 18 22 Q20 12 32 12 Q44 12 46 22 Q56 22 56 32 Q56 40 46 40 Z" fill="${c}" opacity="0.12" stroke="${c}" stroke-width="2.5"/>
  `),

  crown: (s, c) => _svg(s, `
    <path d="M10 46 L10 22 L22 34 L32 16 L42 34 L54 22 L54 46 Z" fill="${c}" opacity="0.12" stroke="${c}" stroke-width="2.5" stroke-linejoin="round"/>
  `),

  car: (s, c) => _svg(s, `
    <path d="M8 40 L14 40 L18 28 L44 28 L50 40 L56 40 L56 46 L8 46 Z" fill="${c}" opacity="0.12" stroke="${c}" stroke-width="2.5" stroke-linejoin="round"/>
    <circle cx="20" cy="46" r="5" fill="${c}" opacity="0.2" stroke="${c}" stroke-width="2.5"/>
    <circle cx="44" cy="46" r="5" fill="${c}" opacity="0.2" stroke="${c}" stroke-width="2.5"/>
  `),

  music: (s, c) => _svg(s, `
    <circle cx="24" cy="46" r="8" fill="${c}" opacity="0.15" stroke="${c}" stroke-width="2.5"/>
    <line x1="32" y1="46" x2="32" y2="10" stroke="${c}" stroke-width="2.5"/>
    <path d="M32 10 Q44 8 48 16 Q44 20 32 18" fill="${c}" opacity="0.3" stroke="${c}" stroke-width="2"/>
  `),
};

export default ICONS;
