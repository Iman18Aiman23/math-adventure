import React from 'react';

/**
 * "Guardian" robot head used by every Bahasa Melayu Tahun 2 topic node (all
 * modules share this one elliptical guardian design).
 *
 * PERF: deliberately uses only ONE feDropShadow (at the root group) and NO
 * feGaussianBlur — the "glow" on eyes/antennas is faked with cheap static halo
 * shapes. SVG blur filters are the costly part, so this keeps the look while
 * staying light enough to render many nodes (esp. on mobile / iOS Safari).
 *
 * SELF-CONTAINED inline <svg> with per-instance unique ids (React.useId) so the
 * gradients/filter never collide across the multiple nodes on the page.
 */
function BMUnifiedRobotM2() {
  const uid = React.useId().replace(/[:.]/g, '');
  const bodyGrad = `body-${uid}`;
  const faceGrad = `face-${uid}`;
  const accentGrad = `accent-${uid}`;
  const shadow = `shadow-${uid}`;

  return (
    <svg viewBox="84 6 344 344" width="100" height="100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={bodyGrad} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#dbe8ff" />
        </linearGradient>

        <linearGradient id={faceGrad} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1d2a44" />
          <stop offset="100%" stopColor="#09111f" />
        </linearGradient>

        <linearGradient id={accentGrad} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5ef2ff" />
          <stop offset="100%" stopColor="#00b7ff" />
        </linearGradient>

        {/* the only filter — one soft drop shadow for the whole robot */}
        <filter id={shadow} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#000000" floodOpacity="0.2" />
        </filter>
      </defs>

      {/* Everything sits in one shadowed group → a single drop-shadow pass */}
      <g filter={`url(#${shadow})`}>
        {/* Dual antennas (with static halo tips) */}
        <line x1="175" y1="135" x2="155" y2="65" stroke="#b8c7dd" strokeWidth="6" strokeLinecap="round" />
        <line x1="337" y1="135" x2="357" y2="65" stroke="#b8c7dd" strokeWidth="6" strokeLinecap="round" />
        <circle cx="155" cy="60" r="19" fill="#5ef2ff" opacity="0.28" />
        <circle cx="357" cy="60" r="19" fill="#5ef2ff" opacity="0.28" />
        <circle cx="155" cy="60" r="12" fill={`url(#${accentGrad})`} />
        <circle cx="357" cy="60" r="12" fill={`url(#${accentGrad})`} />

        {/* Ear pieces */}
        <rect x="95" y="175" width="45" height="100" rx="22" fill={`url(#${bodyGrad})`} stroke="#c8d6eb" strokeWidth="2" />
        <rect x="372" y="175" width="45" height="100" rx="22" fill={`url(#${bodyGrad})`} stroke="#c8d6eb" strokeWidth="2" />
        <rect x="88" y="200" width="10" height="55" rx="5" fill={`url(#${accentGrad})`} />
        <rect x="414" y="200" width="10" height="55" rx="5" fill={`url(#${accentGrad})`} />

        {/* Main head (elliptical guardian design) */}
        <ellipse cx="256" cy="210" rx="115" ry="100" fill={`url(#${bodyGrad})`} stroke="#c8d6eb" strokeWidth="4" />
        {/* Inner face area */}
        <ellipse cx="256" cy="205" rx="100" ry="90" fill="#f0f6ff" stroke="#dbe8ff" strokeWidth="2" />
        {/* Visor screen */}
        <rect x="150" y="155" width="212" height="85" rx="35" fill={`url(#${faceGrad})`} stroke="#1d2a44" strokeWidth="2" />
        {/* Visor highlight */}
        <ellipse cx="210" cy="180" rx="35" ry="15" fill="rgba(255,255,255,0.15)" opacity="0.2" transform="rotate(-15 210 180)" />

        {/* Glowing eyes — static halo + bright eye (no blur) */}
        <ellipse cx="205" cy="195" rx="30" ry="37" fill="#5ef2ff" opacity="0.22" />
        <ellipse cx="307" cy="195" rx="30" ry="37" fill="#5ef2ff" opacity="0.22" />
        <ellipse cx="205" cy="195" rx="20" ry="26" fill="#53f3ff" />
        <ellipse cx="307" cy="195" rx="20" ry="26" fill="#53f3ff" />
        <circle cx="200" cy="190" r="7" fill="white" opacity="0.9" />
        <circle cx="302" cy="190" r="7" fill="white" opacity="0.9" />
        <circle cx="203" cy="188" r="3" fill="white" />
        <circle cx="305" cy="188" r="3" fill="white" />

        {/* Serious mouth (guardian characteristic) */}
        <line x1="226" y1="260" x2="286" y2="260" stroke={`url(#${accentGrad})`} strokeWidth="6" strokeLinecap="round" />

        {/* Nebula decorations */}
        <circle cx="175" cy="170" r="4" fill="#5ef2ff" opacity="0.7" />
        <circle cx="337" cy="175" r="3" fill="#5ef2ff" opacity="0.7" />
        <circle cx="256" cy="145" r="2.5" fill="#00b7ff" opacity="0.6" />
      </g>
    </svg>
  );
}

// Static + prop-less → memoize so it never re-renders when the hub re-renders
// (gamification/hover state changes). Big win given many nodes per page.
export default React.memo(BMUnifiedRobotM2);
