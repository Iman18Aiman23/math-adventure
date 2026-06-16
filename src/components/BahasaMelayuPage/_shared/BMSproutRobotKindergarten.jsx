import React from 'react';

/**
 * "Sprout" robot head — Phase 1 of the age-progression family, intended for the
 * youngest learners (kindergarten / prasekolah).
 *
 * It shares the cosmic white-armor + cyan-accent language of its older siblings
 * (<BMGalaxyRobot> = Tahun 1, <BMUnifiedRobotM2> = Tahun 2, <BMVoyagerRobotM3> =
 * Tahun 3) but is the ROUNDEST / CUTEST of the set: a big circular head, one
 * single bouncy antenna with a star orb, oversized friendly eyes, rosy cheeks
 * and a wide happy smile.
 *
 * STANDALONE for now — created as a reusable component; not yet wired into any
 * hub (BM has no kindergarten tier today).
 *
 * PERF (mirrors the rest of the family — see BMGalaxyRobot for the full notes):
 *   1. NO feGaussianBlur — every "glow" is a static low-opacity halo shape.
 *   2. ONE filter only — a single feDropShadow on the root group.
 *   3. Per-instance unique ids via React.useId() so gradients/filter never
 *      collide when many copies render on one page (esp. iOS Safari).
 *
 * Static + prop-less → React.memo so it never re-renders with its host.
 */
function BMSproutRobotKindergarten() {
  const uid = React.useId().replace(/[:.]/g, '');
  const body = `sp-body-${uid}`;
  const accent = `sp-accent-${uid}`;
  const face = `sp-face-${uid}`;
  const shadow = `sp-shadow-${uid}`;

  return (
    <svg viewBox="76 20 360 360" width="100" height="100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={body} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#dbe8ff" />
        </linearGradient>
        <linearGradient id={accent} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5ef2ff" />
          <stop offset="100%" stopColor="#00b7ff" />
        </linearGradient>
        <linearGradient id={face} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1d2a44" />
          <stop offset="100%" stopColor="#09111f" />
        </linearGradient>

        {/* the only filter — one soft drop shadow for the whole robot */}
        <filter id={shadow} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="10" stdDeviation="11" floodColor="#000000" floodOpacity="0.2" />
        </filter>
      </defs>

      {/* Everything sits in one shadowed group → a single drop-shadow pass */}
      <g filter={`url(#${shadow})`}>
        {/* ── Single bouncy antenna with a star orb ── */}
        <path d="M256 118 Q244 80 268 58" fill="none" stroke="#b8c7dd" strokeWidth="7" strokeLinecap="round" />
        <circle cx="272" cy="50" r="24" fill="#5ef2ff" opacity="0.26" />
        <path
          d="M272 34 L278 47 L292 49 L281 58 L284 72 L272 65 L260 72 L263 58 L252 49 L266 47 Z"
          fill={`url(#${accent})`}
        />

        {/* ── Round side ears ── */}
        <circle cx="116" cy="230" r="26" fill={`url(#${body})`} stroke="#c8d6eb" strokeWidth="3" />
        <circle cx="396" cy="230" r="26" fill={`url(#${body})`} stroke="#c8d6eb" strokeWidth="3" />
        <circle cx="116" cy="230" r="10" fill={`url(#${accent})`} />
        <circle cx="396" cy="230" r="10" fill={`url(#${accent})`} />

        {/* ── Big round head ── */}
        <circle cx="256" cy="232" r="132" fill={`url(#${body})`} stroke="#c8d6eb" strokeWidth="4" />
        {/* soft top sheen */}
        <ellipse cx="212" cy="172" rx="62" ry="26" fill="white" opacity="0.7" />

        {/* ── Big friendly visor ── */}
        <rect x="150" y="188" width="212" height="108" rx="54" fill={`url(#${face})`} stroke="#1d2a44" strokeWidth="4" />
        <ellipse cx="206" cy="214" rx="36" ry="15" fill="white" opacity="0.12" transform="rotate(-12 206 214)" />

        {/* ── Oversized cute eyes (static halo + big bright eye + sparkle) ── */}
        <circle cx="210" cy="240" r="34" fill="#5ef2ff" opacity="0.22" />
        <circle cx="302" cy="240" r="34" fill="#5ef2ff" opacity="0.22" />
        <circle cx="210" cy="240" r="24" fill="#53f3ff" />
        <circle cx="302" cy="240" r="24" fill="#53f3ff" />
        <circle cx="202" cy="232" r="9" fill="white" opacity="0.95" />
        <circle cx="294" cy="232" r="9" fill="white" opacity="0.95" />
        <circle cx="218" cy="248" r="4" fill="white" opacity="0.7" />
        <circle cx="310" cy="248" r="4" fill="white" opacity="0.7" />

        {/* big happy smile (faked glow behind) */}
        <path d="M222 270 Q256 292 290 270" fill="none" stroke="#53f3ff" strokeWidth="12" strokeLinecap="round" opacity="0.22" />
        <path d="M222 270 Q256 292 290 270" fill="none" stroke="#53f3ff" strokeWidth="6" strokeLinecap="round" />

        {/* rosy cheeks (outside the visor, on the white armor) */}
        <circle cx="166" cy="288" r="13" fill="#ff9bb3" opacity="0.55" />
        <circle cx="346" cy="288" r="13" fill="#ff9bb3" opacity="0.55" />
      </g>
    </svg>
  );
}

// Static + prop-less → memoize so it never re-renders when its host re-renders.
export default React.memo(BMSproutRobotKindergarten);
