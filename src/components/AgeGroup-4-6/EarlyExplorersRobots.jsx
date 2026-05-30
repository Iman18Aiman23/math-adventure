import React from 'react';

/**
 * Early Explorers / Grade 1 game-card robots.
 *
 * Each card renders a SELF-CONTAINED inline <svg> — the robot-head frame shapes
 * and its gradients live in the same <svg> as the screen art. We deliberately do
 * NOT use <use href="#symbol"> referencing a shared hidden <svg>, because iOS
 * Safari/WebKit fails to resolve gradients inside a <use> shadow tree across SVG
 * roots (shapes render invisible). Self-contained = renders everywhere.
 *
 * Pillar → frame colour (homepage .subject-card gradient stops):
 *   reading  → orange (#FFF4DF → #FFDFB4 → #FFB86E)
 *   speaking → pink   (#FFE9F3 → #FFBFDD → #FF8CBF)
 *   jawi     → green  (#D6F5DD → #8AD9A8 → #2A9A6C)
 *   math     → purple (#E7D9FF → #B79CFF → #7A55E0)
 *
 * Performance: no SVG <filter> (cards are flat — shadows removed); static art;
 * the only motion is the hover transform on `.ee-robot-media`.
 */

// Per-pillar frame colour sets.
//   cardBg  = light subject tint (card background)
//   bgStroke= subject main colour (card border)
//   head    = light → mid → main radial (the colourful robot head)
//   face    = mid → deep (the screen the art sits on)
const FRAMES = {
  reading:  { cardBg: '#FFF4DF', bgStroke: '#FFB86E', edge: '#FFDFB4', faceEdge: '#FFCB90', head: ['#FFF4DF', '#FFDFB4', '#FFB86E'], face: ['#FFA94D', '#E07F1F'] },
  speaking: { cardBg: '#FFE9F3', bgStroke: '#FF8CBF', edge: '#FFBFDD', faceEdge: '#FFA6CE', head: ['#FFE9F3', '#FFBFDD', '#FF8CBF'], face: ['#FF7AAE', '#D94E86'] },
  jawi:     { cardBg: '#D6F5DD', bgStroke: '#2A9A6C', edge: '#8AD9A8', faceEdge: '#6FCB95', head: ['#D6F5DD', '#8AD9A8', '#2A9A6C'], face: ['#2A9A6C', '#1B6E4B'] },
  math:     { cardBg: '#E7D9FF', bgStroke: '#7A55E0', edge: '#B79CFF', faceEdge: '#A78BFA', head: ['#E7D9FF', '#B79CFF', '#7A55E0'], face: ['#7A55E0', '#5F3FC0'] },
};

/**
 * Deprecated no-op. Frames are now inlined per card (iOS-safe), so no shared
 * <defs> are needed. Kept exported so existing <EEGameRobotDefs/> mounts don't
 * break; renders nothing.
 */
export function EEGameRobotDefs() {
  return null;
}

/* ── Card icon: self-contained frame + per-game screen art (clipped). ── */
export function EEGameRobot({ children, frame = 'reading' }) {
  const f = FRAMES[frame] || FRAMES.reading;
  // Unique ids per instance so inline gradients/clip never collide and never
  // need cross-<svg> references (the part iOS chokes on).
  const uid = React.useId().replace(/:/g, '');
  const headId = `eeHead-${uid}`;
  const faceId = `eeFace-${uid}`;
  const clipId = `eeScreen-${uid}`;

  return (
    <svg viewBox="0 0 200 200" width="200" height="200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id={headId} cx="25%" cy="25%" r="75%">
          <stop offset="0%" stopColor={f.head[0]} />
          <stop offset="50%" stopColor={f.head[1]} />
          <stop offset="100%" stopColor={f.head[2]} />
        </radialGradient>
        <radialGradient id={faceId} cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor={f.face[0]} />
          <stop offset="100%" stopColor={f.face[1]} />
        </radialGradient>
        <clipPath id={clipId}>
          <rect x="38" y="52" width="124" height="96" rx="32" ry="32" />
        </clipPath>
      </defs>

      {/* Card background + border */}
      <rect x="10" y="10" width="180" height="180" rx="30" ry="30" fill={f.cardBg} stroke={f.bgStroke} strokeWidth="4" />
      {/* Antenna */}
      <line x1="100" y1="12" x2="100" y2="32" stroke={f.edge} strokeWidth="4" strokeLinecap="round" />
      <circle cx="100" cy="8" r="8" fill="#FFEB3B" />
      <circle cx="100" cy="8" r="3" fill="#FFF" />
      {/* Head */}
      <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill={`url(#${headId})`} />
      <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="none" stroke={f.edge} strokeWidth="3" />
      {/* Ears */}
      <ellipse cx="15" cy="100" rx="12" ry="22" fill={`url(#${headId})`} />
      <ellipse cx="15" cy="100" rx="12" ry="22" fill="none" stroke={f.edge} strokeWidth="2" />
      <ellipse cx="185" cy="100" rx="12" ry="22" fill={`url(#${headId})`} />
      <ellipse cx="185" cy="100" rx="12" ry="22" fill="none" stroke={f.edge} strokeWidth="2" />
      {/* Face screen */}
      <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill={`url(#${faceId})`} />
      <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="none" stroke={f.faceEdge} strokeWidth="2" opacity="0.5" />

      {/* Per-game artwork, clipped to the screen */}
      <g clipPath={`url(#${clipId})`}>{children}</g>
    </svg>
  );
}
