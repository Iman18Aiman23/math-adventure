import React from 'react';

/**
 * "Galaxy" robot head — a cosmic-visor variant in the spirit of
 * <BMUnifiedRobotM2>, intended as a candidate shared topic-node head.
 *
 * PERF — this is the OPTIMIZED port of the original 512×512 galaxy SVG, which
 * was unusable as a repeated node icon. Three changes make it cheap enough to
 * render ~9 per page on mobile / iOS Safari:
 *   1. NO feGaussianBlur. The original had ~11 blur-based passes (nebulaBlur ×3,
 *      glow ×7, strongGlow ×1). Blur is the costly SVG op, so every "glow" here
 *      is FAKED with a static low-opacity halo shape, and the nebulas rely on
 *      their radial gradients (which already fade to transparent) for softness.
 *   2. ONE filter only — a single feDropShadow on the root group → one pass.
 *   3. Per-instance unique ids via React.useId(). The original hard-coded every
 *      id ("glow", "bodyGrad", "visorClip"…); rendering >1 copy made every
 *      instance resolve url(#id) to the FIRST match → broken visors/glows on
 *      iOS. Unique ids fix that.
 *
 * Static + prop-less → React.memo so it never re-renders with the hub.
 * Cropped viewBox so the head fills a round node (mirrors BMUnifiedRobotM2).
 */
function BMGalaxyRobot() {
  const uid = React.useId().replace(/[:.]/g, '');
  const body = `gx-body-${uid}`;
  const accent = `gx-accent-${uid}`;
  const space = `gx-space-${uid}`;
  const shadow = `gx-shadow-${uid}`;
  const visor = `gx-visor-${uid}`;

  return (
    <svg viewBox="46 4 420 420" width="100" height="100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={body} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#dbe8ff" />
        </linearGradient>
        <linearGradient id={accent} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5ef2ff" />
          <stop offset="100%" stopColor="#00b7ff" />
        </linearGradient>
        <linearGradient id={space} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#050510" />
          <stop offset="100%" stopColor="#0a0a1a" />
        </linearGradient>
        {/* the only filter — one soft drop shadow for the whole robot */}
        <filter id={shadow} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="15" stdDeviation="15" floodColor="#000000" floodOpacity="0.2" />
        </filter>

        <clipPath id={visor}>
          <rect x="110" y="160" width="292" height="140" rx="60" />
        </clipPath>
      </defs>

      {/* Everything in one shadowed group → a single drop-shadow pass */}
      <g filter={`url(#${shadow})`}>
        {/* ── Antennas (floating planets) ── */}
        <line x1="170" y1="110" x2="140" y2="50" stroke="#b8c7dd" strokeWidth="6" strokeLinecap="round" />
        <line x1="342" y1="110" x2="372" y2="50" stroke="#b8c7dd" strokeWidth="6" strokeLinecap="round" />
        {/* faked orb glow = static halo behind each orb */}
        <circle cx="140" cy="45" r="26" fill="#5ef2ff" opacity="0.28" />
        <circle cx="372" cy="45" r="26" fill="#5ef2ff" opacity="0.28" />
        <circle cx="140" cy="45" r="16" fill={`url(#${accent})`} />
        <circle cx="372" cy="45" r="16" fill={`url(#${accent})`} />
        <ellipse cx="140" cy="45" rx="26" ry="8" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.6" transform="rotate(-30 140 45)" />
        <ellipse cx="372" cy="45" rx="26" ry="8" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.6" transform="rotate(30 372 45)" />

        {/* ── Side ears (cosmic receivers) ── */}
        <path d="M95 180 C 60 180, 60 280, 95 280 Z" fill={`url(#${body})`} stroke="#c8d6eb" strokeWidth="3" />
        <path d="M417 180 C 452 180, 452 280, 417 280 Z" fill={`url(#${body})`} stroke="#c8d6eb" strokeWidth="3" />
        {/* faked ear-bar glow */}
        <rect x="71" y="196" width="20" height="68" rx="10" fill="#5ef2ff" opacity="0.25" />
        <rect x="421" y="196" width="20" height="68" rx="10" fill="#5ef2ff" opacity="0.25" />
        <rect x="75" y="200" width="12" height="60" rx="6" fill={`url(#${accent})`} />
        <rect x="425" y="200" width="12" height="60" rx="6" fill={`url(#${accent})`} />

        {/* ── Main head (white cosmic armor) ── */}
        <rect x="90" y="100" width="332" height="260" rx="100" fill={`url(#${body})`} stroke="#c8d6eb" strokeWidth="4" />
        <ellipse cx="180" cy="140" rx="60" ry="25" fill="white" opacity="0.8" />
        {/* constellations on the armor */}
        <g stroke="#00b7ff" strokeWidth="1.5" opacity="0.4" fill="#5ef2ff">
          <circle cx="130" cy="140" r="2.5" />
          <circle cx="150" cy="130" r="1.5" />
          <circle cx="160" cy="150" r="2" />
          <line x1="130" y1="140" x2="150" y2="130" />
          <line x1="150" y1="130" x2="160" y2="150" />
          <circle cx="382" cy="140" r="2.5" />
          <circle cx="362" cy="130" r="1.5" />
          <circle cx="352" cy="150" r="2" />
          <line x1="382" y1="140" x2="362" y2="130" />
          <line x1="362" y1="130" x2="352" y2="150" />
        </g>

        {/* ── Galaxy visor ── */}
        <rect x="110" y="160" width="292" height="140" rx="60" fill={`url(#${space})`} />
        <g clipPath={`url(#${visor})`}>
          {/* no nebulas — clean dark-space visor (just the starfield) */}
          <g fill="white">
            <circle cx="140" cy="180" r="1.5" opacity="0.9" />
            <circle cx="180" cy="240" r="1" opacity="0.6" />
            <circle cx="220" cy="190" r="2" opacity="0.8" />
            <circle cx="260" cy="250" r="1.5" opacity="0.7" />
            <circle cx="300" cy="180" r="1" opacity="0.5" />
            <circle cx="340" cy="220" r="2" opacity="0.9" />
            <circle cx="370" cy="190" r="1.5" opacity="0.6" />
            <circle cx="150" cy="260" r="1" opacity="0.8" />
            <circle cx="280" cy="210" r="1.5" opacity="0.7" />
            <circle cx="200" cy="210" r="1" opacity="0.5" />
            <circle cx="350" cy="270" r="1.5" opacity="0.8" />
            {/* bright star: faked glow = halo + core */}
            <circle cx="240" cy="220" r="6" opacity="0.45" />
            <circle cx="240" cy="220" r="2.5" opacity="1" />
          </g>
        </g>
        {/* glass glare */}
        <ellipse cx="190" cy="190" rx="50" ry="20" fill="white" opacity="0.1" transform="rotate(-15 190 190)" />
        <path d="M120 180 Q256 150 392 180" fill="none" stroke="white" strokeWidth="3" opacity="0.15" strokeLinecap="round" />
        <rect x="110" y="160" width="292" height="140" rx="60" fill="none" stroke="#1d2a44" strokeWidth="4" />

        {/* ── Eyes & mouth (faked glow via halos) ── */}
        <ellipse cx="195" cy="225" rx="32" ry="38" fill="#53f3ff" opacity="0.22" />
        <ellipse cx="317" cy="225" rx="32" ry="38" fill="#53f3ff" opacity="0.22" />
        <ellipse cx="195" cy="225" rx="22" ry="28" fill="#53f3ff" />
        <ellipse cx="317" cy="225" rx="22" ry="28" fill="#53f3ff" />
        <ellipse cx="190" cy="218" rx="8" ry="10" fill="white" opacity="0.9" />
        <ellipse cx="312" cy="218" rx="8" ry="10" fill="white" opacity="0.9" />

        {/* smile: a wider low-opacity stroke behind fakes the glow */}
        <path d="M226 265 Q256 285 286 265" fill="none" stroke="#53f3ff" strokeWidth="11" strokeLinecap="round" opacity="0.25" />
        <path d="M226 265 Q256 285 286 265" fill="none" stroke="#53f3ff" strokeWidth="5" strokeLinecap="round" />

        {/* bottom tech accent */}
        <rect x="210" y="316" width="92" height="14" rx="7" fill="#5ef2ff" opacity="0.22" />
        <rect x="216" y="320" width="80" height="6" rx="3" fill={`url(#${accent})`} opacity="0.9" />
      </g>
    </svg>
  );
}

// Static + prop-less → memoize so it never re-renders when the hub re-renders.
export default React.memo(BMGalaxyRobot);
