import React from 'react';

/**
 * "Voyager" robot head used by every Bahasa Melayu Tahun 3 (Grade 3) topic node.
 *
 * Phase 4 of the age-progression family. It is deliberately the SAME guardian
 * lineage as <BMUnifiedRobotM2> (Tahun 2) — same elliptical head, rounded visor
 * and glowing eyes — but "grown up" and GRADUATING: it wears a graduation
 * mortarboard (built in the robot's own white-armor + glowing-cyan language,
 * with a cyan board edge, button and tassel), plus multi-segment ears with
 * sensors, HUD brow + side notches, cheek panels and a chin/collar plate. The
 * cap + extra gear are the visual cue that the robot matured Tahun 2 → Tahun 3.
 *
 * PERF (mirrors the rest of the family — see BMGalaxyRobot for the full notes):
 *   1. NO feGaussianBlur — every "glow" is a static low-opacity halo shape.
 *   2. ONE filter only — a single feDropShadow on the root group.
 *   3. Per-instance unique ids via React.useId() so gradients/clip/filter never
 *      collide when many nodes render on one page (esp. iOS Safari).
 *
 * Static + prop-less → React.memo so it never re-renders with the hub. Cropped
 * viewBox so the head fills a round node (mirrors the sibling robots).
 */
function BMVoyagerRobotM3() {
  const uid = React.useId().replace(/[:.]/g, '');
  const body = `vy-body-${uid}`;
  const accent = `vy-accent-${uid}`;
  const face = `vy-face-${uid}`;
  const shadow = `vy-shadow-${uid}`;
  const visor = `vy-visor-${uid}`;

  return (
    <svg viewBox="78 14 356 356" width="100" height="100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
          <feDropShadow dx="0" dy="11" stdDeviation="11" floodColor="#000000" floodOpacity="0.2" />
        </filter>

        <clipPath id={visor}>
          <rect x="150" y="160" width="212" height="94" rx="40" />
        </clipPath>
      </defs>

      {/* Same guardian lineage as <BMUnifiedRobotM2> (Tahun 2), grown up: the
          elliptical head + visor + glowing eyes are kept, then upgraded with a
          crowned crest, a third antenna, multi-segment ears, HUD notches, cheek
          panels and a chin/collar plate. Everything in one shadowed group → one
          drop-shadow pass. */}
      <g filter={`url(#${shadow})`}>
        {/* ── Twin side antennas (peek out beside the mortarboard) ── */}
        <line x1="178" y1="150" x2="150" y2="96" stroke="#b8c7dd" strokeWidth="6" strokeLinecap="round" />
        <line x1="334" y1="150" x2="362" y2="96" stroke="#b8c7dd" strokeWidth="6" strokeLinecap="round" />
        <circle cx="147" cy="90" r="16" fill="#5ef2ff" opacity="0.26" />
        <circle cx="365" cy="90" r="16" fill="#5ef2ff" opacity="0.26" />
        <circle cx="147" cy="90" r="10" fill={`url(#${accent})`} />
        <circle cx="365" cy="90" r="10" fill={`url(#${accent})`} />

        {/* ── Upgraded ear pieces (outer plate + 2 accent segments + sensor) ── */}
        <rect x="92" y="170" width="50" height="112" rx="24" fill={`url(#${body})`} stroke="#c8d6eb" strokeWidth="3" />
        <rect x="370" y="170" width="50" height="112" rx="24" fill={`url(#${body})`} stroke="#c8d6eb" strokeWidth="3" />
        <rect x="85" y="190" width="9" height="34" rx="4" fill={`url(#${accent})`} />
        <rect x="85" y="232" width="9" height="28" rx="4" fill={`url(#${accent})`} />
        <rect x="418" y="190" width="9" height="34" rx="4" fill={`url(#${accent})`} />
        <rect x="418" y="232" width="9" height="28" rx="4" fill={`url(#${accent})`} />
        <circle cx="117" cy="248" r="8" fill={`url(#${accent})`} opacity="0.9" />
        <circle cx="395" cy="248" r="8" fill={`url(#${accent})`} opacity="0.9" />

        {/* ── Main head (elliptical guardian — same as Tahun 2, slightly bigger) ── */}
        <ellipse cx="256" cy="216" rx="120" ry="106" fill={`url(#${body})`} stroke="#c8d6eb" strokeWidth="4" />
        <ellipse cx="256" cy="211" rx="105" ry="94" fill="#f0f6ff" stroke="#dbe8ff" strokeWidth="2" />
        {/* top sheen */}
        <ellipse cx="212" cy="156" rx="58" ry="24" fill="white" opacity="0.6" />

        {/* ── Graduation mortarboard (Tahun 3 = the graduate) ──
            Built in the robot's own language: white-armor cap band, a glowing
            cyan board edge, and a cyan button + tassel. */}
        {/* Cap band hugging the forehead crown, with a small power gem */}
        <path d="M188 122 Q256 106 324 122 L320 142 Q256 130 192 142 Z" fill={`url(#${body})`} stroke="#c8d6eb" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M256 124 L266 134 L256 146 L246 134 Z" fill="#5ef2ff" opacity="0.28" />
        <path d="M256 128 L263 134 L256 142 L249 134 Z" fill={`url(#${accent})`} />
        {/* Board thickness — a glowing cyan front rim under the flat board */}
        <path d="M156 96 L256 136 L356 96 L356 105 L256 145 L156 105 Z" fill={`url(#${accent})`} />
        <path d="M156 96 L256 136 L356 96 L356 105 L256 145 L156 105 Z" fill="#0a1626" opacity="0.18" />
        {/* Flat board (diamond top) */}
        <path d="M256 56 L356 96 L256 136 L156 96 Z" fill={`url(#${body})`} stroke="#c8d6eb" strokeWidth="3.5" strokeLinejoin="round" />
        {/* board top sheen */}
        <path d="M256 64 L320 90 L256 100 L192 90 Z" fill="white" opacity="0.45" />
        {/* Center button (with halo) */}
        <circle cx="256" cy="96" r="13" fill="#5ef2ff" opacity="0.24" />
        <circle cx="256" cy="96" r="8" fill={`url(#${accent})`} />
        <circle cx="252" cy="92" r="2.6" fill="white" opacity="0.9" />
        {/* Tassel — cord drapes down the right side to a fringed bundle */}
        <path d="M256 96 Q338 88 356 112 Q366 128 360 170" fill="none" stroke={`url(#${accent})`} strokeWidth="4" strokeLinecap="round" />
        <circle cx="360" cy="172" r="10" fill="#5ef2ff" opacity="0.24" />
        <rect x="351" y="166" width="18" height="14" rx="6" fill={`url(#${accent})`} />
        <g stroke={`url(#${accent})`} strokeWidth="2.6" strokeLinecap="round">
          <line x1="353" y1="180" x2="352" y2="198" />
          <line x1="358" y1="180" x2="358" y2="200" />
          <line x1="363" y1="180" x2="364" y2="198" />
          <line x1="368" y1="180" x2="369" y2="196" />
        </g>

        {/* ── Visor screen (rounded guardian visor) ── */}
        <rect x="150" y="160" width="212" height="94" rx="40" fill={`url(#${face})`} stroke="#1d2a44" strokeWidth="4" />
        <g clipPath={`url(#${visor})`}>
          {/* faint starfield inside the dark visor */}
          <g fill="white">
            <circle cx="186" cy="178" r="1.4" opacity="0.7" />
            <circle cx="330" cy="182" r="1.4" opacity="0.7" />
            <circle cx="256" cy="172" r="1.1" opacity="0.5" />
            <circle cx="200" cy="236" r="1" opacity="0.5" />
            <circle cx="316" cy="238" r="1" opacity="0.5" />
          </g>
          {/* HUD brow ridge */}
          <rect x="162" y="168" width="188" height="9" rx="4.5" fill="#5ef2ff" opacity="0.16" />
        </g>
        {/* visor glare + side HUD notches */}
        <path d="M168 176 Q256 164 344 176" fill="none" stroke="white" strokeWidth="3" opacity="0.16" strokeLinecap="round" />
        <rect x="156" y="198" width="6" height="22" rx="3" fill={`url(#${accent})`} opacity="0.7" />
        <rect x="350" y="198" width="6" height="22" rx="3" fill={`url(#${accent})`} opacity="0.7" />

        {/* ── Glowing eyes (static halo + bright eye + sparkle) ── */}
        <ellipse cx="206" cy="202" rx="30" ry="36" fill="#5ef2ff" opacity="0.22" />
        <ellipse cx="306" cy="202" rx="30" ry="36" fill="#5ef2ff" opacity="0.22" />
        <ellipse cx="206" cy="202" rx="20" ry="26" fill="#53f3ff" />
        <ellipse cx="306" cy="202" rx="20" ry="26" fill="#53f3ff" />
        <circle cx="200" cy="195" r="7" fill="white" opacity="0.9" />
        <circle cx="300" cy="195" r="7" fill="white" opacity="0.9" />
        <circle cx="211" cy="210" r="3" fill="white" opacity="0.7" />
        <circle cx="311" cy="210" r="3" fill="white" opacity="0.7" />

        {/* confident smile — matured from Tahun 2's serious line (faked glow) */}
        <path d="M226 234 Q256 250 286 234" fill="none" stroke="#53f3ff" strokeWidth="9" strokeLinecap="round" opacity="0.22" />
        <path d="M226 234 Q256 250 286 234" fill="none" stroke="#53f3ff" strokeWidth="4.5" strokeLinecap="round" />

        {/* ── Cheek panels on the white armor (with rivets) ── */}
        <rect x="146" y="248" width="30" height="22" rx="9" fill="#f0f6ff" stroke="#dbe8ff" strokeWidth="2" />
        <rect x="336" y="248" width="30" height="22" rx="9" fill="#f0f6ff" stroke="#dbe8ff" strokeWidth="2" />
        <circle cx="155" cy="259" r="2.5" fill={`url(#${accent})`} opacity="0.8" />
        <circle cx="167" cy="259" r="2.5" fill={`url(#${accent})`} opacity="0.8" />
        <circle cx="345" cy="259" r="2.5" fill={`url(#${accent})`} opacity="0.8" />
        <circle cx="357" cy="259" r="2.5" fill={`url(#${accent})`} opacity="0.8" />

        {/* ── Chin / collar armor plate (the "bigger build" cue) ── */}
        <path d="M204 296 L308 296 L324 330 L188 330 Z" fill={`url(#${body})`} stroke="#c8d6eb" strokeWidth="3" strokeLinejoin="round" />
        <rect x="210" y="306" width="92" height="8" rx="4" fill={`url(#${accent})`} opacity="0.9" />
        <circle cx="224" cy="322" r="3" fill={`url(#${accent})`} opacity="0.8" />
        <circle cx="256" cy="322" r="3" fill={`url(#${accent})`} opacity="0.8" />
        <circle cx="288" cy="322" r="3" fill={`url(#${accent})`} opacity="0.8" />

        {/* nebula deco */}
        <circle cx="178" cy="150" r="4" fill="#5ef2ff" opacity="0.7" />
        <circle cx="336" cy="152" r="3" fill="#5ef2ff" opacity="0.7" />
      </g>
    </svg>
  );
}

// Static + prop-less → memoize so it never re-renders when the hub re-renders.
export default React.memo(BMVoyagerRobotM3);
