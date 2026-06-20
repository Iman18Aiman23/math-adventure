import React, { useId } from 'react';

/**
 * MatematikTopicRobotT3 — the Tahun 2 "energy" robot head (metallic shell, LED
 * strips, circuit overlay, neon eyes, math badge) GRADUATED for Tahun 3: it wears
 * a flat-diamond graduation mortarboard (Bahasa Melayu T3 style), kept black with
 * gold accents. The twin antennas peek up beside the cap like a graduate's.
 *
 * Recolours from the module THEME exactly like the T2 robot:
 *   - the cyan energy family  -> theme.accent
 *   - the purple accent family -> theme.dark
 * The metallic shell, deep-space screen and the black/gold mortarboard stay
 * constant across every theme.
 *
 * Self-contained: every <defs> id is uniquified per instance via useId so many
 * robots can render on one hub page without filter / gradient / clip-path
 * collisions, and there is no cross-root <use> (per the iOS-safe SVG rules).
 *
 * The viewBox (30 14 260 246) is near-square so the head fills the square topic
 * card stage. Usage: <MatematikTopicRobotT3 theme={THEME} />
 */

// Mix a hex colour toward white (amt > 0) or black (amt < 0). amt in [-1, 1].
function shade(hex, amt) {
  const c = hex.replace('#', '');
  const n = parseInt(c.length === 3 ? c.replace(/(.)/g, '$1$1') : c, 16);
  let r = (n >> 16) & 255;
  let g = (n >> 8) & 255;
  let b = n & 255;
  if (amt >= 0) {
    r += (255 - r) * amt; g += (255 - g) * amt; b += (255 - b) * amt;
  } else {
    const k = 1 + amt; r *= k; g *= k; b *= k;
  }
  const h = (v) => Math.round(v).toString(16).padStart(2, '0');
  return `#${h(r)}${h(g)}${h(b)}`;
}

export default function MatematikTopicRobotT3({
  theme,
  accent,
  dark,
  badge = '∑', // ∑
  className = '',
  style = {},
  ...props
}) {
  const primary = accent || theme?.accent || '#00bfff';
  const secondary = dark || theme?.dark || '#7c4dff';

  const pLight = shade(primary, 0.4);
  const pDark = shade(primary, -0.3);
  const sLight = shade(secondary, 0.4);

  const raw = useId();
  const uid = raw.replace(/[^a-zA-Z0-9]/g, '');
  const id = (name) => `${name}-${uid}`;
  const u = (name) => `url(#${id(name)})`;

  return (
    <svg viewBox="30 14 260 246" className={className} style={style} {...props}>
      <defs>
        <filter id={id('glowCyan')} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id={id('glowPurple')} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id={id('glowSoft')} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id={id('shadow')} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.15" />
        </filter>

        <linearGradient id={id('metal')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8f9fa" />
          <stop offset="30%" stopColor="#e9ecef" />
          <stop offset="70%" stopColor="#dee2e6" />
          <stop offset="100%" stopColor="#ced4da" />
        </linearGradient>

        <radialGradient id={id('screen')} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#1a1a3e" />
          <stop offset="50%" stopColor="#0d0d2b" />
          <stop offset="100%" stopColor="#050515" />
        </radialGradient>

        {/* primary energy family */}
        <linearGradient id={id('energy')} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={pLight} />
          <stop offset="50%" stopColor={primary} />
          <stop offset="100%" stopColor={pDark} />
        </linearGradient>

        {/* secondary accent family */}
        <linearGradient id={id('accent2')} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={sLight} />
          <stop offset="100%" stopColor={secondary} />
        </linearGradient>

        <radialGradient id={id('orb')} cx="40%" cy="35%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor={primary} />
          <stop offset="100%" stopColor={pDark} />
        </radialGradient>

        <radialGradient id={id('iris')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor={primary} />
          <stop offset="100%" stopColor={pDark} />
        </radialGradient>

        <pattern id={id('circuit')} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 0 10 L 8 10 L 8 2 L 12 2 L 12 10 L 20 10" fill="none" stroke={primary} strokeWidth="0.5" opacity="0.15" />
          <circle cx="10" cy="10" r="1" fill={primary} opacity="0.2" />
        </pattern>

        <clipPath id={id('screenClip')}>
          <rect x="80" y="95" width="160" height="120" rx="30" ry="30" />
        </clipPath>

        {/* graduation mortarboard gold */}
        <linearGradient id={id('gold')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF1A8" />
          <stop offset="50%" stopColor="#FFC107" />
          <stop offset="100%" stopColor="#8F5300" />
        </linearGradient>
      </defs>

      {/* ===== ANTENNAS (peek up beside the mortarboard) ===== */}
      <line x1="115" y1="80" x2="100" y2="40" stroke="#b0bec5" strokeWidth="4" strokeLinecap="round" />
      <line x1="115" y1="80" x2="100" y2="40" stroke={u('energy')} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <circle cx="100" cy="38" r="10" fill={u('orb')} filter={u('glowCyan')} />
      <circle cx="97" cy="35" r="3" fill="#ffffff" opacity="0.8" />

      <line x1="205" y1="80" x2="220" y2="40" stroke="#b0bec5" strokeWidth="4" strokeLinecap="round" />
      <line x1="205" y1="80" x2="220" y2="40" stroke={u('accent2')} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <circle cx="220" cy="38" r="10" fill={u('orb')} filter={u('glowPurple')} />
      <circle cx="217" cy="35" r="3" fill="#ffffff" opacity="0.8" />

      {/* ===== HEAD BODY ===== */}
      <rect x="60" y="75" width="200" height="180" rx="60" ry="60" fill={u('metal')} stroke="#90a4ae" strokeWidth="2" filter={u('shadow')} />
      <rect x="60" y="75" width="200" height="180" rx="60" ry="60" fill={u('circuit')} opacity="0.5" />
      <path d="M 100 85 Q 160 75 220 85" fill="none" stroke="#ffffff" strokeWidth="3" opacity="0.6" strokeLinecap="round" />

      {/* ===== GRADUATION MORTARBOARD (Bahasa Melayu T3 style, kept black) =====
          Flat-diamond mortarboard sitting on the crown: forehead cap band + thick
          board edge + diamond top + centre button + fringed tassel down the right.
          BM's white-armour body is rendered black and its cyan accent gold. */}
      <g transform="translate(-57.6 -27.6) scale(0.85)" filter={u('shadow')}>
        {/* Cap band hugging the forehead crown, with a small power gem */}
        <path d="M188 122 Q256 106 324 122 L320 142 Q256 130 192 142 Z" fill="#1B1D29" stroke="#000" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M256 124 L266 134 L256 146 L246 134 Z" fill="#FFC107" opacity="0.28" />
        <path d="M256 128 L263 134 L256 142 L249 134 Z" fill={u('gold')} />
        {/* Board thickness — a glowing gold front rim under the flat board */}
        <path d="M156 96 L256 136 L356 96 L356 105 L256 145 L156 105 Z" fill={u('gold')} />
        <path d="M156 96 L256 136 L356 96 L356 105 L256 145 L156 105 Z" fill="#0a0a0a" opacity="0.25" />
        {/* Flat board (diamond top) */}
        <path d="M256 56 L356 96 L256 136 L156 96 Z" fill="#222433" stroke="#000" strokeWidth="3.5" strokeLinejoin="round" />
        {/* board top sheen */}
        <path d="M256 64 L320 90 L256 100 L192 90 Z" fill="#fff" opacity="0.16" />
        {/* Center button (with halo) */}
        <circle cx="256" cy="96" r="13" fill="#FFC107" opacity="0.24" />
        <circle cx="256" cy="96" r="8" fill={u('gold')} />
        <circle cx="252" cy="92" r="2.6" fill="#fff" opacity="0.9" />
        {/* Tassel — cord drapes down the right side to a fringed bundle */}
        <path d="M256 96 Q338 88 356 112 Q366 128 360 170" fill="none" stroke={u('gold')} strokeWidth="4" strokeLinecap="round" />
        <circle cx="360" cy="172" r="10" fill="#FFC107" opacity="0.24" />
        <rect x="351" y="166" width="18" height="14" rx="6" fill={u('gold')} />
        <g stroke={u('gold')} strokeWidth="2.6" strokeLinecap="round">
          <line x1="353" y1="180" x2="352" y2="198" />
          <line x1="358" y1="180" x2="358" y2="200" />
          <line x1="363" y1="180" x2="364" y2="198" />
          <line x1="368" y1="180" x2="369" y2="196" />
        </g>
      </g>

      {/* ===== LED STRIP ACCENTS ===== */}
      <rect x="72" y="130" width="4" height="40" rx="2" fill={u('energy')} filter={u('glowSoft')} />
      <rect x="244" y="130" width="4" height="40" rx="2" fill={u('accent2')} filter={u('glowSoft')} />

      {/* ===== EARS ===== */}
      <rect x="35" y="125" width="28" height="55" rx="10" ry="10" fill="#e0e0e0" stroke="#90a4ae" strokeWidth="1.5" />
      <rect x="40" y="132" width="18" height="41" rx="6" ry="6" fill={u('energy')} opacity="0.3" />
      <circle cx="49" cy="145" r="2" fill={primary} />
      <circle cx="49" cy="155" r="2" fill={primary} />
      <circle cx="49" cy="165" r="2" fill={primary} />

      <rect x="257" y="125" width="28" height="55" rx="10" ry="10" fill="#e0e0e0" stroke="#90a4ae" strokeWidth="1.5" />
      <rect x="262" y="132" width="18" height="41" rx="6" ry="6" fill={u('accent2')} opacity="0.3" />
      <circle cx="271" cy="145" r="2" fill={sLight} />
      <circle cx="271" cy="155" r="2" fill={sLight} />
      <circle cx="271" cy="165" r="2" fill={sLight} />

      {/* ===== FACE SCREEN ===== */}
      <rect x="78" y="93" width="164" height="124" rx="32" ry="32" fill="none" stroke={u('energy')} strokeWidth="2" filter={u('glowCyan')} opacity="0.5" />
      <rect x="80" y="95" width="160" height="120" rx="30" ry="30" fill={u('screen')} stroke="#1a1a3e" strokeWidth="2" />

      <g clipPath={u('screenClip')} opacity="0.1">
        <line x1="80" y1="115" x2="240" y2="115" stroke={primary} strokeWidth="0.5" />
        <line x1="80" y1="135" x2="240" y2="135" stroke={primary} strokeWidth="0.5" />
        <line x1="80" y1="155" x2="240" y2="155" stroke={primary} strokeWidth="0.5" />
        <line x1="80" y1="175" x2="240" y2="175" stroke={primary} strokeWidth="0.5" />
        <line x1="120" y1="95" x2="120" y2="215" stroke={primary} strokeWidth="0.5" />
        <line x1="160" y1="95" x2="160" y2="215" stroke={primary} strokeWidth="0.5" />
        <line x1="200" y1="95" x2="200" y2="215" stroke={primary} strokeWidth="0.5" />
      </g>

      <ellipse cx="130" cy="115" rx="40" ry="12" fill="#ffffff" opacity="0.05" />

      {/* ===== EYES ===== */}
      <ellipse cx="120" cy="148" rx="20" ry="22" fill={primary} filter={u('glowCyan')} opacity="0.3" />
      <ellipse cx="120" cy="148" rx="16" ry="18" fill="#e0f7ff" />
      <ellipse cx="120" cy="148" rx="12" ry="14" fill={u('iris')} />
      <ellipse cx="120" cy="148" rx="6" ry="7" fill="#0a0a2e" />
      <ellipse cx="115" cy="142" rx="4" ry="5" fill="#ffffff" opacity="0.9" />
      <ellipse cx="124" cy="152" rx="2" ry="2.5" fill="#ffffff" opacity="0.5" />

      <ellipse cx="200" cy="148" rx="20" ry="22" fill={primary} filter={u('glowCyan')} opacity="0.3" />
      <ellipse cx="200" cy="148" rx="16" ry="18" fill="#e0f7ff" />
      <ellipse cx="200" cy="148" rx="12" ry="14" fill={u('iris')} />
      <ellipse cx="200" cy="148" rx="6" ry="7" fill="#0a0a2e" />
      <ellipse cx="195" cy="142" rx="4" ry="5" fill="#ffffff" opacity="0.9" />
      <ellipse cx="204" cy="152" rx="2" ry="2.5" fill="#ffffff" opacity="0.5" />

      {/* ===== SMILE ===== */}
      <path d="M 135 185 Q 160 202 185 185" fill="none" stroke={u('energy')} strokeWidth="4" strokeLinecap="round" filter={u('glowCyan')} />
      <path d="M 138 186 Q 160 200 182 186" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

      {/* ===== CHEEK BLUSH ===== */}
      <ellipse cx="95" cy="170" rx="10" ry="6" fill="#ff4081" opacity="0.2" />
      <ellipse cx="225" cy="170" rx="10" ry="6" fill="#ff4081" opacity="0.2" />

      {/* ===== BOTTOM ENERGY CORE ===== */}
      <rect x="130" y="235" width="60" height="8" rx="4" ry="4" fill={u('energy')} filter={u('glowCyan')} />
      <rect x="140" y="237" width="40" height="4" rx="2" ry="2" fill="#ffffff" opacity="0.5" />

      {/* ===== MATH BADGE ===== */}
      <circle cx="250" cy="210" r="24" fill="none" stroke={u('energy')} strokeWidth="2" filter={u('glowCyan')} opacity="0.6" />
      <circle cx="250" cy="210" r="22" fill={u('screen')} stroke={u('energy')} strokeWidth="2" />
      <circle cx="250" cy="210" r="17" fill="none" stroke={u('energy')} strokeWidth="1" opacity="0.4" />
      <circle cx="250" cy="210" r="19" fill="none" stroke={u('accent2')} strokeWidth="1.5" strokeDasharray="8 4" opacity="0.5" />
      <text x="250" y="218" textAnchor="middle" fontFamily="'Courier New', monospace" fontSize="20" fontWeight="bold" fill={u('energy')} filter={u('glowSoft')}>{badge}</text>
    </svg>
  );
}
