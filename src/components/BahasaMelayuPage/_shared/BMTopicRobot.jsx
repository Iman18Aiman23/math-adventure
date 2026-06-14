import React from 'react';

/**
 * BM topic-node robot head — a shared frame per Module, with per-topic artwork
 * shown inside the face "screen" (mirrors <EEGameRobot> in
 * AgeGroup-4-6/EarlyExplorersRobots.jsx).
 *
 * SELF-CONTAINED inline <svg>: frame shapes + gradients live in the same root as
 * the screen art (no cross-<svg> <use> — iOS Safari fails to resolve gradients
 * across SVG roots). Flat & static: no <filter>, no per-element animation — so it
 * is lighter than the multi-animation topic illustrations it replaces.
 *
 * viewBox 0 0 100 100 to fill the round hub node; screen at x19 y36 w62 h44.
 * Frame colours track the vibrant per-module palette (synced with ModuleData).
 */
const MOD_FRAMES = {
  1: { head: ['#FFE7CC', '#FFC084', '#FF8F3D'], face: ['#FFA755', '#F07712'], edge: '#FFD3A3', faceEdge: '#FFC089', stroke: '#FF6F00' },
  2: { head: ['#D8EEFC', '#8FCEF6', '#36A9F0'], face: ['#4DB4F2', '#1E86D4'], edge: '#A9D8F8', faceEdge: '#86C4F0', stroke: '#1A78C7' },
  3: { head: ['#E7D8FB', '#C3A0F4', '#A368F0'], face: ['#B07EF2', '#7E45DC'], edge: '#CBB0F6', faceEdge: '#B79CF2', stroke: '#7038D6' },
  4: { head: ['#FFD9E8', '#FFA8C9', '#FF6FA8'], face: ['#FF82B4', '#E2528C'], edge: '#FFB6D2', faceEdge: '#FF9FC2', stroke: '#DB3E7F' },
  5: { head: ['#CFF4EF', '#86E0D5', '#1EC9B7'], face: ['#34D0BF', '#119C8E'], edge: '#A6E8DF', faceEdge: '#86DACE', stroke: '#0E9488' },
};

export default function BMTopicRobot({ mod = 1, children }) {
  const f = MOD_FRAMES[mod] || MOD_FRAMES[1];
  const uid = React.useId().replace(/[:.]/g, '');
  const headId = `bmH-${uid}`;
  const faceId = `bmF-${uid}`;
  const clipId = `bmS-${uid}`;

  return (
    <svg viewBox="0 0 100 100" width="100" height="100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id={headId} cx="30%" cy="26%" r="78%">
          <stop offset="0%" stopColor={f.head[0]} />
          <stop offset="52%" stopColor={f.head[1]} />
          <stop offset="100%" stopColor={f.head[2]} />
        </radialGradient>
        <radialGradient id={faceId} cx="32%" cy="30%" r="72%">
          <stop offset="0%" stopColor={f.face[0]} />
          <stop offset="100%" stopColor={f.face[1]} />
        </radialGradient>
        <clipPath id={clipId}>
          <rect x="19" y="36" width="62" height="44" rx="12" ry="12" />
        </clipPath>
      </defs>

      {/* Antenna */}
      <line x1="50" y1="5" x2="50" y2="15" stroke={f.edge} strokeWidth="3" strokeLinecap="round" />
      <circle cx="50" cy="5" r="4" fill="#FFEB3B" />
      <circle cx="50" cy="5" r="1.6" fill="#fff" />
      {/* Ears */}
      <ellipse cx="4" cy="58" rx="5" ry="12" fill={`url(#${headId})`} stroke={f.edge} strokeWidth="1.5" />
      <ellipse cx="96" cy="58" rx="5" ry="12" fill={`url(#${headId})`} stroke={f.edge} strokeWidth="1.5" />
      {/* Head */}
      <rect x="6" y="14" width="88" height="82" rx="24" ry="24" fill={`url(#${headId})`} stroke={f.stroke} strokeWidth="2.5" />
      {/* Glossy top highlight */}
      <ellipse cx="34" cy="28" rx="18" ry="8" fill="rgba(255,255,255,.5)" />
      {/* Face screen */}
      <rect x="19" y="36" width="62" height="44" rx="12" ry="12" fill={`url(#${faceId})`} />
      <rect x="19" y="36" width="62" height="44" rx="12" ry="12" fill="none" stroke={f.faceEdge} strokeWidth="1.5" opacity="0.55" />

      {/* Per-topic artwork, clipped to the screen */}
      <g clipPath={`url(#${clipId})`}>{children}</g>
    </svg>
  );
}
