import React from 'react';

/**
 * Early Explorers game-card robots.
 *
 * One shared robot-head FRAME per pillar (from the LearningIcons robots) is
 * defined ONCE as an SVG <symbol>. Each game card instantiates its pillar's
 * frame with <use> and drops its own artwork (EarlyExplorersScreens.jsx) inside
 * the face screen, clipped to the screen rect.
 *
 * Pillar → frame colour (exact homepage .subject-card gradient stops):
 *   reading  → orange (#FFF4DF → #FFDFB4 → #FFB86E)
 *   speaking → pink   (#FFE9F3 → #FFBFDD → #FF8CBF)
 *   jawi     → green  (#D6F5DD → #8AD9A8 → #2A9A6C)
 *   math     → purple (#E7D9FF → #B79CFF → #7A55E0)
 *
 * Performance rules baked in (see project memory "flat + static, no filters"):
 *   - NO SVG <filter> anywhere — cards are flat (no drop-shadow).
 *   - Static art; the only motion is the hover `transform` on `.ee-robot-media`.
 *   - Frame markup exists once per pillar (symbol), referenced cheaply via <use>.
 *
 * Geometry matches the original Early Explorers SVGs (200×200, screen at
 * x38 y52 w124 h96), so transplanted screen art lines up without repositioning.
 */

// Per-pillar frame colour sets, from the homepage SUBJECTS palette.
//   cardBg  = light subject tint (the rounded card background)
//   bgStroke= subject main colour (card border)
//   head    = light → mid → main radial (the colourful robot head)
//   face    = mid → deep (the screen the art sits on)
const FRAMES = [
  { key: 'reading',  cardBg: '#FFF4DF', bgStroke: '#FFB86E', edge: '#FFDFB4', faceEdge: '#FFCB90', head: ['#FFF4DF', '#FFDFB4', '#FFB86E'], face: ['#FFA94D', '#E07F1F'] },
  { key: 'speaking', cardBg: '#FFE9F3', bgStroke: '#FF8CBF', edge: '#FFBFDD', faceEdge: '#FFA6CE', head: ['#FFE9F3', '#FFBFDD', '#FF8CBF'], face: ['#FF7AAE', '#D94E86'] },
  { key: 'jawi',     cardBg: '#D6F5DD', bgStroke: '#2A9A6C', edge: '#8AD9A8', faceEdge: '#6FCB95', head: ['#D6F5DD', '#8AD9A8', '#2A9A6C'], face: ['#2A9A6C', '#1B6E4B'] },
  { key: 'math',     cardBg: '#E7D9FF', bgStroke: '#7A55E0', edge: '#B79CFF', faceEdge: '#A78BFA', head: ['#E7D9FF', '#B79CFF', '#7A55E0'], face: ['#7A55E0', '#5F3FC0'] },
];

/* ── Rendered ONCE on the page (next to <RobotDefs/>). Holds every pillar's
   frame symbol + gradients, plus the shared screen clip-path. ── */
export function EEGameRobotDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        {/* Inner art is clipped to the face screen so it can never spill out. */}
        <clipPath id="eeScreen">
          <rect x="38" y="52" width="124" height="96" rx="32" ry="32" />
        </clipPath>

        {FRAMES.map((f) => (
          <React.Fragment key={f.key}>
            <radialGradient id={`eeHead-${f.key}`} cx="25%" cy="25%" r="75%">
              <stop offset="0%" stopColor={f.head[0]} />
              <stop offset="50%" stopColor={f.head[1]} />
              <stop offset="100%" stopColor={f.head[2]} />
            </radialGradient>
            <radialGradient id={`eeFace-${f.key}`} cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor={f.face[0]} />
              <stop offset="100%" stopColor={f.face[1]} />
            </radialGradient>

            {/* Shared robot-head frame (no filters, no baked title). */}
            <symbol id={`eeFrame-${f.key}`} viewBox="0 0 200 200">
              <rect x="10" y="10" width="180" height="180" rx="30" ry="30" fill={f.cardBg} stroke={f.bgStroke} strokeWidth="4" />
              <line x1="100" y1="12" x2="100" y2="32" stroke={f.edge} strokeWidth="4" strokeLinecap="round" />
              <circle cx="100" cy="8" r="8" fill="#FFEB3B" />
              <circle cx="100" cy="8" r="3" fill="#FFF" />
              <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill={`url(#eeHead-${f.key})`} />
              <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="none" stroke={f.edge} strokeWidth="3" />
              <ellipse cx="15" cy="100" rx="12" ry="22" fill={`url(#eeHead-${f.key})`} />
              <ellipse cx="15" cy="100" rx="12" ry="22" fill="none" stroke={f.edge} strokeWidth="2" />
              <ellipse cx="185" cy="100" rx="12" ry="22" fill={`url(#eeHead-${f.key})`} />
              <ellipse cx="185" cy="100" rx="12" ry="22" fill="none" stroke={f.edge} strokeWidth="2" />
              <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill={`url(#eeFace-${f.key})`} />
              <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="none" stroke={f.faceEdge} strokeWidth="2" opacity="0.5" />
            </symbol>
          </React.Fragment>
        ))}
      </defs>
    </svg>
  );
}

/* ── Card icon: pillar frame + per-game screen art (clipped). ── */
export function EEGameRobot({ children, frame = 'reading' }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true">
      <use href={`#eeFrame-${frame}`} width="200" height="200" />
      <g clipPath="url(#eeScreen)">{children}</g>
    </svg>
  );
}
