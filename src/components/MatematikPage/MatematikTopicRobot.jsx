import React, { useId } from 'react';

/**
 * MatematikTopicRobot — shared robot-head icon for Matematik module topic cards.
 *
 * The robot recolors itself from the module THEME so each module gets its own
 * neon accent (eyes / smile / antenna / ears / chin), while the dark screen,
 * white shell and badge stay constant for contrast across every theme.
 *
 * All SVG <defs> ids are made unique per instance via useId so multiple robots
 * can render on the same hub page without filter / gradient collisions.
 *
 * Usage:
 *   <MatematikTopicRobot theme={THEME} />
 *   <MatematikTopicRobot accent="#14B8A6" dark="#0F766E" symbol="+" />
 */
export default function MatematikTopicRobot({
  theme,
  accent,
  dark,
  glow,        // neon colour: eyes, smile, antenna ball, chin
  earTop,      // ear gradient (top)
  earBottom,   // ear gradient (bottom) + stroke
  badge = '#ff8c42',
  symbol = 'π',
  className = '',
  style = {},
  ...props
}) {
  const a = accent || theme?.accent || '#14B8A6';
  const d = dark || theme?.dark || '#0F766E';
  const cGlow = glow || a;
  const cEarTop = earTop || a;
  const cEarBottom = earBottom || d;

  const raw = useId();
  const uid = raw.replace(/[^a-zA-Z0-9]/g, '');
  const id = (name) => `${name}-${uid}`;

  return (
    <svg viewBox="24 4 252 240" className={className} style={style} {...props}>
      <defs>
        {/* Glow filter for the neon parts */}
        <filter id={id('glow')} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Screen gradient — constant dark navy for contrast */}
        <radialGradient id={id('screen')} cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#1a2a4a" />
          <stop offset="100%" stopColor="#0a1525" />
        </radialGradient>
        {/* Body gradient — constant white shell */}
        <linearGradient id={id('body')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#d8e4f0" />
        </linearGradient>
        {/* Antenna glow — themed */}
        <radialGradient id={id('antenna')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor={cGlow} />
        </radialGradient>
        {/* Ear gradient — themed */}
        <linearGradient id={id('ear')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={cEarTop} />
          <stop offset="100%" stopColor={cEarBottom} />
        </linearGradient>
      </defs>

      {/* ===== ANTENNAS ===== */}
      <line x1="110" y1="70" x2="95" y2="30" stroke="#c0d8e8" strokeWidth="5" strokeLinecap="round" />
      <circle cx="95" cy="26" r="8" fill={`url(#${id('antenna')})`} filter={`url(#${id('glow')})`} />

      <line x1="190" y1="70" x2="205" y2="30" stroke="#c0d8e8" strokeWidth="5" strokeLinecap="round" />
      <circle cx="205" cy="26" r="8" fill={`url(#${id('antenna')})`} filter={`url(#${id('glow')})`} />

      {/* ===== HEAD BODY (outer shell) ===== */}
      <rect x="55" y="60" width="190" height="175" rx="55" ry="55"
            fill={`url(#${id('body')})`} stroke="#b8cce0" strokeWidth="2" />

      {/* ===== EAR / SIDE PIECES ===== */}
      <rect x="30" y="110" width="30" height="60" rx="12" ry="12"
            fill={`url(#${id('ear')})`} stroke={cEarBottom} strokeWidth="1.5" />
      <rect x="36" y="120" width="18" height="40" rx="7" ry="7" fill="#e0f4f8" opacity="0.6" />

      <rect x="240" y="110" width="30" height="60" rx="12" ry="12"
            fill={`url(#${id('ear')})`} stroke={cEarBottom} strokeWidth="1.5" />
      <rect x="246" y="120" width="18" height="40" rx="7" ry="7" fill="#e0f4f8" opacity="0.6" />

      {/* ===== FACE SCREEN ===== */}
      <rect x="75" y="80" width="150" height="130" rx="35" ry="35"
            fill={`url(#${id('screen')})`} stroke="#2a4a6a" strokeWidth="2" />
      <ellipse cx="130" cy="105" rx="35" ry="15" fill="#ffffff" opacity="0.06" />

      {/* ===== EYES ===== */}
      <ellipse cx="118" cy="140" rx="16" ry="18" fill={cGlow} filter={`url(#${id('glow')})`} opacity="0.4" />
      <ellipse cx="118" cy="140" rx="13" ry="15" fill={cGlow} />
      <ellipse cx="113" cy="134" rx="5" ry="6" fill="#ffffff" opacity="0.7" />

      <ellipse cx="182" cy="140" rx="16" ry="18" fill={cGlow} filter={`url(#${id('glow')})`} opacity="0.4" />
      <ellipse cx="182" cy="140" rx="13" ry="15" fill={cGlow} />
      <ellipse cx="177" cy="134" rx="5" ry="6" fill="#ffffff" opacity="0.7" />

      {/* ===== SMILE ===== */}
      <path d="M 130 175 Q 150 192 170 175"
            fill="none" stroke={cGlow} strokeWidth="4" strokeLinecap="round" filter={`url(#${id('glow')})`} />

      {/* ===== BOTTOM CHIN LINE (decorative) ===== */}
      <rect x="120" y="218" width="60" height="6" rx="3" ry="3" fill={cEarBottom} opacity="0.5" />

      {/* ===== MATH SYMBOL BADGE ===== */}
      <circle cx="230" cy="210" r="18" fill={badge} stroke="#ffffff" strokeWidth="2" />
      <text x="230" y="216" textAnchor="middle" fontFamily="Arial, sans-serif"
            fontSize="18" fontWeight="bold" fill="#ffffff">{symbol}</text>
    </svg>
  );
}
