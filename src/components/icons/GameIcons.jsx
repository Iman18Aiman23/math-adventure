import React, { useId } from 'react';

/**
 * GameIcons — reusable SVG icons converted from Game UI Kit.html
 *
 * Usage:
 *   import { PlayIcon, GearIcon, StarIcon } from './icons/GameIcons';
 *   <PlayIcon size={48} />
 *   <GearIcon size={64} className="text-white" onClick={...} />
 *
 * Every icon accepts:
 *   - size       (number, default 64) → sets width = height = size
 *   - className  (string)             → passed to the <svg>
 *   - ...rest    (any svg prop)       → onClick, style, aria-*, etc.
 *
 * Round-button icons (Lock/Play/Gear/Trophy/Music) are designed to sit on
 * a colored button background — their fills are white, so place them
 * inside a colored container or override via `style={{ color: ... }}` on
 * a parent (these don't use currentColor — original palette preserved).
 */

const cleanId = (raw) => raw.replace(/:/g, '');

// ════════════════════════════════════════════════════════════════════════════
//  ROUND BUTTONS  (designed to sit on a colored circular button background)
// ════════════════════════════════════════════════════════════════════════════

export const LockIcon = ({ size = 48, className, ...rest }) => (
  <svg viewBox="0 0 48 48" fill="none" width={size} height={size} className={className} {...rest}>
    <rect x="11" y="22" width="26" height="20" rx="4" fill="#fff"/>
    <path d="M16 22v-5a8 8 0 0 1 16 0v5" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
    <circle cx="24" cy="31" r="2.6" fill="#8FBE1E"/>
    <rect x="22.7" y="32" width="2.6" height="6" rx="1.2" fill="#8FBE1E"/>
  </svg>
);

export const PlayIcon = ({ size = 48, className, ...rest }) => (
  <svg viewBox="0 0 48 48" fill="none" width={size} height={size} className={className} {...rest}>
    <path d="M17 13.5v21a1.5 1.5 0 0 0 2.3 1.27l17-10.5a1.5 1.5 0 0 0 0-2.54l-17-10.5A1.5 1.5 0 0 0 17 13.5Z" fill="#fff"/>
  </svg>
);

export const GearIcon = ({ size = 48, className, ...rest }) => (
  <svg viewBox="0 0 48 48" fill="none" width={size} height={size} className={className} {...rest}>
    <path d="M24 6.5c1 0 1.9.7 2.1 1.7l.4 2.4c1.6.4 3.1 1 4.5 1.9l2.1-1.3a2.2 2.2 0 0 1 2.9.5l1.8 2.4a2.2 2.2 0 0 1-.4 3l-1.8 1.6c.5 1.5.8 3 .8 4.6 0 .5 0 1 -.1 1.5l2 1.2a2.2 2.2 0 0 1 .9 2.8l-1.2 2.8a2.2 2.2 0 0 1-2.7 1.2l-2.3-.7a14 14 0 0 1-3.6 3l.4 2.3a2.2 2.2 0 0 1-1.5 2.6l-2.9.9a2.2 2.2 0 0 1-2.7-1.3l-.9-2.2a14 14 0 0 1-4.7 0l-.9 2.2a2.2 2.2 0 0 1-2.7 1.3l-2.9-.9a2.2 2.2 0 0 1-1.5-2.6l.4-2.3a14 14 0 0 1-3.6-3l-2.3.7a2.2 2.2 0 0 1-2.7-1.2l-1.2-2.8a2.2 2.2 0 0 1 .9-2.8l2-1.2c0-.5-.1-1-.1-1.5 0-1.6.3-3.1.8-4.6L8.6 16a2.2 2.2 0 0 1-.4-3L10 10.7a2.2 2.2 0 0 1 2.9-.5l2.1 1.3c1.4-.9 2.9-1.5 4.5-1.9l.4-2.4a2.2 2.2 0 0 1 2.1-1.7Z" fill="#fff"/>
    <circle cx="24" cy="24" r="6" fill="#8FBE1E"/>
  </svg>
);

export const TrophyRoundIcon = ({ size = 48, className, ...rest }) => (
  <svg viewBox="0 0 48 48" fill="none" width={size} height={size} className={className} {...rest}>
    <path d="M14 9h20v10a10 10 0 0 1-20 0V9Z" fill="#fff"/>
    <path d="M10 11H6v3.5A5.5 5.5 0 0 0 11.5 20H14" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" fill="none"/>
    <path d="M38 11h4v3.5A5.5 5.5 0 0 1 36.5 20H34" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" fill="none"/>
    <rect x="19" y="31" width="10" height="6" fill="#fff"/>
    <rect x="14" y="37" width="20" height="4.5" rx="1.4" fill="#fff"/>
    <path d="M24 14l1.8 3.6 4 .4-2.9 2.8.7 3.9L24 22.8l-3.6 1.9.7-3.9-2.9-2.8 4-.4L24 14Z" fill="#8FBE1E"/>
  </svg>
);

export const MusicRoundIcon = ({ size = 48, className, ...rest }) => (
  <svg viewBox="0 0 48 48" fill="none" width={size} height={size} className={className} {...rest}>
    <path d="M20 8.5c0-.9.6-1.6 1.5-1.7l16-2.6c1.1-.2 2.1.7 2.1 1.8V30a6 6 0 1 1-3.2-5.3V11.7l-13 2.1V34a6 6 0 1 1-3.2-5.3l-.1-20.2Z" fill="#fff"/>
  </svg>
);

// ════════════════════════════════════════════════════════════════════════════
//  GAME ICONS  (200×200 viewBox — large illustrated)
// ════════════════════════════════════════════════════════════════════════════

export const TreasureChestIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 200 200" fill="none" width={size} height={size} className={className} {...rest}>
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FF6FB5"/><stop offset="1" stopColor="#E0247E"/></linearGradient>
        <linearGradient id={`${id}-lid`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFA6D2"/><stop offset="1" stopColor="#E84BA0"/></linearGradient>
        <linearGradient id={`${id}-band`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFE066"/><stop offset="1" stopColor="#E89A1A"/></linearGradient>
      </defs>
      <ellipse cx="100" cy="178" rx="78" ry="10" fill="rgba(0,0,0,.15)"/>
      <path d="M28 100h144v62c0 6-4.5 10-10 10H38c-5.5 0-10-4-10-10v-62Z" fill={`url(#${id}-body)`}/>
      <path d="M36 108v52c0 4 3 7 7 7h6c-3 0-5-3-5-7v-52h-8Z" fill="rgba(255,255,255,.35)"/>
      <path d="M164 108v52c0 4-3 7-7 7h-6c3 0 5-3 5-7v-52h8Z" fill="rgba(0,0,0,.18)"/>
      <path d="M22 62c0-12 9-22 22-22h112c12 0 22 10 22 22v38H22V62Z" fill={`url(#${id}-lid)`}/>
      <path d="M40 50c1-4 6-7 12-7h6c-7 1-12 5-13 12-.5 6-1 22-1 22h-6S37 64 40 50Z" fill="rgba(255,255,255,.55)"/>
      <path d="M168 100H22v-6h146v6Z" fill="rgba(0,0,0,.18)"/>
      <rect x="20" y="92" width="160" height="14" rx="2" fill={`url(#${id}-band)`}/>
      <rect x="86" y="78" width="28" height="34" rx="4" fill={`url(#${id}-band)`}/>
      <rect x="86" y="78" width="28" height="34" rx="4" fill="none" stroke="rgba(0,0,0,.18)" strokeWidth="2"/>
      <circle cx="100" cy="96" r="4" fill="#7A4D0E"/>
      <rect x="98" y="98" width="4" height="9" rx="1.5" fill="#7A4D0E"/>
      <circle cx="36" cy="120" r="3" fill="#FFD060"/>
      <circle cx="36" cy="150" r="3" fill="#FFD060"/>
      <circle cx="164" cy="120" r="3" fill="#FFD060"/>
      <circle cx="164" cy="150" r="3" fill="#FFD060"/>
      <path d="M22 120c-4 0-8 3-8 7v6c0 4 4 7 8 7" stroke="#7A1C50" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M178 120c4 0 8 3 8 7v6c0 4-4 7-8 7" stroke="#7A1C50" strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  );
};

export const GearsIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 200 200" fill="none" width={size} height={size} className={className} {...rest}>
      <defs>
        <radialGradient id={`${id}-big`} cx="0.35" cy="0.3" r="0.9"><stop offset="0" stopColor="#FFD78F"/><stop offset="0.55" stopColor="#FF9220"/><stop offset="1" stopColor="#C45E08"/></radialGradient>
        <radialGradient id={`${id}-small`} cx="0.4" cy="0.3" r="0.9"><stop offset="0" stopColor="#FFE0A8"/><stop offset="0.55" stopColor="#FFAA3C"/><stop offset="1" stopColor="#B85A0C"/></radialGradient>
      </defs>
      <ellipse cx="100" cy="178" rx="78" ry="10" fill="rgba(0,0,0,.15)"/>
      <g transform="translate(80 86)">
        <g>
          <g>
            <rect x="-9" y="-66" width="18" height="22" rx="3" fill={`url(#${id}-big)`}/>
            <rect x="-9" y="44" width="18" height="22" rx="3" fill={`url(#${id}-big)`}/>
            <rect x="-66" y="-9" width="22" height="18" rx="3" fill={`url(#${id}-big)`}/>
            <rect x="44" y="-9" width="22" height="18" rx="3" fill={`url(#${id}-big)`}/>
            <g transform="rotate(45)">
              <rect x="-9" y="-66" width="18" height="22" rx="3" fill={`url(#${id}-big)`}/>
              <rect x="-9" y="44" width="18" height="22" rx="3" fill={`url(#${id}-big)`}/>
              <rect x="-66" y="-9" width="22" height="18" rx="3" fill={`url(#${id}-big)`}/>
              <rect x="44" y="-9" width="22" height="18" rx="3" fill={`url(#${id}-big)`}/>
            </g>
          </g>
          <circle r="50" fill={`url(#${id}-big)`}/>
          <circle r="50" fill="none" stroke="rgba(0,0,0,.18)" strokeWidth="2"/>
          <circle r="22" fill="#FFE0A8"/>
          <circle r="22" fill="none" stroke="rgba(0,0,0,.18)" strokeWidth="2"/>
          <circle r="9" fill="#C45E08"/>
          <path d="M-30 -34c12 -10 28 -12 38 -8" stroke="rgba(255,255,255,.7)" strokeWidth="7" fill="none" strokeLinecap="round"/>
        </g>
      </g>
      <g transform="translate(140 134)">
        <g>
          <rect x="-6" y="-42" width="12" height="14" rx="2" fill={`url(#${id}-small)`}/>
          <rect x="-6" y="28" width="12" height="14" rx="2" fill={`url(#${id}-small)`}/>
          <rect x="-42" y="-6" width="14" height="12" rx="2" fill={`url(#${id}-small)`}/>
          <rect x="28" y="-6" width="14" height="12" rx="2" fill={`url(#${id}-small)`}/>
          <g transform="rotate(45)">
            <rect x="-6" y="-42" width="12" height="14" rx="2" fill={`url(#${id}-small)`}/>
            <rect x="-6" y="28" width="12" height="14" rx="2" fill={`url(#${id}-small)`}/>
            <rect x="-42" y="-6" width="14" height="12" rx="2" fill={`url(#${id}-small)`}/>
            <rect x="28" y="-6" width="14" height="12" rx="2" fill={`url(#${id}-small)`}/>
          </g>
          <circle r="32" fill={`url(#${id}-small)`}/>
          <circle r="32" fill="none" stroke="rgba(0,0,0,.18)" strokeWidth="2"/>
          <circle r="13" fill="#FFE0A8"/>
          <circle r="13" fill="none" stroke="rgba(0,0,0,.18)" strokeWidth="2"/>
          <circle r="5" fill="#B85A0C"/>
          <path d="M-18 -20c8 -6 16 -7 22 -4" stroke="rgba(255,255,255,.7)" strokeWidth="5" fill="none" strokeLinecap="round"/>
        </g>
      </g>
    </svg>
  );
};

export const RocketIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 200 200" fill="none" width={size} height={size} className={className} {...rest}>
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFE9E9"/><stop offset="0.45" stopColor="#FF7878"/><stop offset="1" stopColor="#C42626"/></linearGradient>
        <linearGradient id={`${id}-band`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFD56B"/><stop offset="1" stopColor="#E8961D"/></linearGradient>
        <radialGradient id={`${id}-window`} cx="0.35" cy="0.35" r="0.8"><stop offset="0" stopColor="#D6F4FF"/><stop offset="0.6" stopColor="#3FB7F1"/><stop offset="1" stopColor="#1F6D9E"/></radialGradient>
        <linearGradient id={`${id}-flame`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFE166"/><stop offset="0.6" stopColor="#FF8A2A"/><stop offset="1" stopColor="#FF3C2F"/></linearGradient>
      </defs>
      <ellipse cx="100" cy="184" rx="60" ry="8" fill="rgba(0,0,0,.18)"/>
      <path d="M82 156c2 14 6 22 18 30 12-8 16-16 18-30-4 4-10 6-18 6s-14-2-18-6Z" fill={`url(#${id}-flame)`}/>
      <path d="M92 162c2 8 4 12 8 18 4-6 6-10 8-18-2 2-5 3-8 3s-6-1-8-3Z" fill="#FFF1AE"/>
      <path d="M70 110c-12 6-18 16-20 30 12 0 22-4 28-12l-8-18Z" fill="#C42626"/>
      <path d="M130 110c12 6 18 16 20 30-12 0-22-4-28-12l8-18Z" fill="#C42626"/>
      <path d="M72 116c-8 4-12 12-14 22 8-1 14-4 18-9l-4-13Z" fill="rgba(255,255,255,.35)"/>
      <path d="M100 16c-22 18-32 44-32 78v44c0 6 4 10 10 10h44c6 0 10-4 10-10v-44c0-34-10-60-32-78Z" fill={`url(#${id}-body)`}/>
      <path d="M78 60c0-18 6-32 14-44-14 12-22 30-22 56v44c0 4 2 6 6 6h4c-2 0-2-2-2-6V60Z" fill="rgba(255,255,255,.45)"/>
      <path d="M100 16c4 4 8 10 12 16-3-2-8-3-12-3s-9 1-12 3c4-6 8-12 12-16Z" fill="#FFE7E7"/>
      <rect x="68" y="130" width="64" height="14" rx="3" fill={`url(#${id}-band)`}/>
      <rect x="68" y="130" width="64" height="14" rx="3" fill="none" stroke="rgba(0,0,0,.18)" strokeWidth="2"/>
      <circle cx="100" cy="86" r="20" fill="#7A1A1A"/>
      <circle cx="100" cy="86" r="16" fill={`url(#${id}-window)`}/>
      <ellipse cx="93" cy="80" rx="6" ry="4" fill="rgba(255,255,255,.7)"/>
    </svg>
  );
};

// ════════════════════════════════════════════════════════════════════════════
//  STATS & REWARDS
// ════════════════════════════════════════════════════════════════════════════

export const StarIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs><linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFE066"/><stop offset=".55" stopColor="#FFC107"/><stop offset="1" stopColor="#C77800"/></linearGradient></defs>
      <ellipse cx="50" cy="92" rx="32" ry="4" fill="rgba(0,0,0,.15)"/>
      <path d="M50 8l11 24 26 3-19 18 5 26-23-13-23 13 5-26L13 35l26-3z" fill={`url(#${id}-g)`} stroke="#8F5300" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M44 18l4 9 10 1-7 6 2 10" stroke="rgba(255,255,255,.7)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export const HeartIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs><linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FF8B95"/><stop offset=".6" stopColor="#FF4759"/><stop offset="1" stopColor="#B5172A"/></linearGradient></defs>
      <ellipse cx="50" cy="92" rx="34" ry="4" fill="rgba(0,0,0,.15)"/>
      <path d="M50 88c-2 0-4-1-6-3L18 60a18 18 0 0 1 26-26l6 6 6-6a18 18 0 0 1 26 26L56 85c-2 2-4 3-6 3z" fill={`url(#${id}-g)`} stroke="#7E0F20" strokeWidth="3" strokeLinejoin="round"/>
      <ellipse cx="34" cy="38" rx="6" ry="9" fill="rgba(255,255,255,.55)" transform="rotate(-30 34 38)"/>
    </svg>
  );
};

export const HealthPotionIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFFFFF"/><stop offset=".5" stopColor="#E1F5E5"/><stop offset="1" stopColor="#B9E0BD"/></linearGradient>
        <linearGradient id={`${id}-liq`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#86E067"/><stop offset="1" stopColor="#3F8F12"/></linearGradient>
      </defs>
      <ellipse cx="50" cy="92" rx="26" ry="4" fill="rgba(0,0,0,.15)"/>
      <rect x="40" y="6" width="20" height="14" rx="3" fill="#C45E08" stroke="#7A3A02" strokeWidth="2.5"/>
      <rect x="42" y="20" width="16" height="10" fill="#fff" stroke="#3F6A07" strokeWidth="2.5"/>
      <path d="M30 32c0-2 2-4 4-4h32c2 0 4 2 4 4v44a14 14 0 0 1-14 14H44a14 14 0 0 1-14-14V32z" fill={`url(#${id}-body)`} stroke="#3F6A07" strokeWidth="3"/>
      <path d="M30 52v24a14 14 0 0 0 14 14h12a14 14 0 0 0 14-14V52H30z" fill={`url(#${id}-liq)`}/>
      <rect x="46" y="56" width="8" height="22" rx="2" fill="#fff"/>
      <rect x="39" y="63" width="22" height="8" rx="2" fill="#fff"/>
      <rect x="36" y="36" width="6" height="34" rx="3" fill="rgba(255,255,255,.55)"/>
    </svg>
  );
};

export const GemIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs>
        <linearGradient id={`${id}-top`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#C7F2FF"/><stop offset="1" stopColor="#3FB7F1"/></linearGradient>
        <linearGradient id={`${id}-mid`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5EC8F5"/><stop offset="1" stopColor="#1F6FA0"/></linearGradient>
      </defs>
      <ellipse cx="50" cy="92" rx="30" ry="4" fill="rgba(0,0,0,.18)"/>
      <path d="M22 36L34 18h32l12 18-28 6z" fill={`url(#${id}-top)`} stroke="#0A4D74" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M22 36h56L50 86z" fill={`url(#${id}-mid)`} stroke="#0A4D74" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M34 18L50 36 66 18M34 18l-12 18M66 18l12 18M22 36L50 86M78 36L50 86M50 36v50" stroke="rgba(0,0,0,.18)" strokeWidth="1.4" fill="none"/>
      <path d="M28 40l8 22" stroke="rgba(255,255,255,.85)" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  );
};

export const CoinIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs><radialGradient id={`${id}-g`} cx=".35" cy=".35" r=".75"><stop offset="0" stopColor="#FFF1A8"/><stop offset=".55" stopColor="#FFC800"/><stop offset="1" stopColor="#A97500"/></radialGradient></defs>
      <ellipse cx="50" cy="92" rx="32" ry="4" fill="rgba(0,0,0,.15)"/>
      <ellipse cx="50" cy="56" rx="36" ry="32" fill="#8F5300"/>
      <ellipse cx="50" cy="50" rx="36" ry="32" fill={`url(#${id}-g)`} stroke="#8F5300" strokeWidth="3"/>
      <ellipse cx="50" cy="50" rx="28" ry="24" fill="none" stroke="#8F5300" strokeWidth="2" strokeDasharray="2 3"/>
      <path d="M50 30l4 12 12 1-9 8 3 12-10-7-10 7 3-12-9-8 12-1z" fill="#FFE066" stroke="#8F5300" strokeWidth="2"/>
    </svg>
  );
};

export const TrophyIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs><linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFE066"/><stop offset=".55" stopColor="#FFC107"/><stop offset="1" stopColor="#A97500"/></linearGradient></defs>
      <ellipse cx="50" cy="94" rx="28" ry="4" fill="rgba(0,0,0,.18)"/>
      <path d="M28 22h-6a8 8 0 0 0 0 16h6M72 22h6a8 8 0 0 1 0 16h-6" stroke="#8F5300" strokeWidth="5" fill="none" strokeLinecap="round"/>
      <path d="M28 14h44v22a22 22 0 0 1-44 0V14z" fill={`url(#${id}-g)`} stroke="#8F5300" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M50 26l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" fill="#fff" opacity=".8"/>
      <rect x="44" y="58" width="12" height="14" fill={`url(#${id}-g)`} stroke="#8F5300" strokeWidth="3"/>
      <rect x="32" y="72" width="36" height="12" rx="3" fill={`url(#${id}-g)`} stroke="#8F5300" strokeWidth="3"/>
      <rect x="28" y="82" width="44" height="6" rx="2" fill="#8F5300"/>
    </svg>
  );
};

export const MedalIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs><radialGradient id={`${id}-g`} cx=".35" cy=".3" r=".8"><stop offset="0" stopColor="#FFF1A8"/><stop offset=".55" stopColor="#FFC107"/><stop offset="1" stopColor="#8F5300"/></radialGradient></defs>
      <path d="M30 6l10 38 10-8 10 8 10-38h-8l-8 26-4-2-4 2-8-26z" fill="#FF4759" stroke="#7E0F20" strokeWidth="2.5" strokeLinejoin="round"/>
      <ellipse cx="50" cy="94" rx="28" ry="4" fill="rgba(0,0,0,.18)"/>
      <circle cx="50" cy="62" r="26" fill={`url(#${id}-g)`} stroke="#8F5300" strokeWidth="3"/>
      <circle cx="50" cy="62" r="18" fill="none" stroke="#8F5300" strokeWidth="1.6" strokeDasharray="2 3"/>
      <text x="50" y="74" textAnchor="middle" fontFamily="'Baloo 2', sans-serif" fontWeight="800" fontSize="30" fill="#8F5300">1</text>
    </svg>
  );
};

export const CrownIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs><linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFE066"/><stop offset=".55" stopColor="#FFC107"/><stop offset="1" stopColor="#A97500"/></linearGradient></defs>
      <ellipse cx="50" cy="92" rx="32" ry="4" fill="rgba(0,0,0,.18)"/>
      <path d="M14 30l12 24 10-30 14 28 14-28 10 30 12-24v50H14z" fill={`url(#${id}-g)`} stroke="#8F5300" strokeWidth="3" strokeLinejoin="round"/>
      <rect x="14" y="70" width="72" height="14" fill="#C45E08" stroke="#8F5300" strokeWidth="3"/>
      <circle cx="50" cy="60" r="6" fill="#FF4759" stroke="#7E0F20" strokeWidth="2"/>
      <circle cx="28" cy="58" r="4" fill="#3FB7F1" stroke="#0A4D74" strokeWidth="2"/>
      <circle cx="72" cy="58" r="4" fill="#86E067" stroke="#3F6A07" strokeWidth="2"/>
      <circle cx="14" cy="30" r="3" fill="#fff"/>
      <circle cx="36" cy="24" r="3" fill="#fff"/>
      <circle cx="50" cy="22" r="3" fill="#fff"/>
      <circle cx="64" cy="24" r="3" fill="#fff"/>
      <circle cx="86" cy="30" r="3" fill="#fff"/>
    </svg>
  );
};

export const FlameIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs><linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFE066"/><stop offset=".45" stopColor="#FF8A1F"/><stop offset="1" stopColor="#D32A2A"/></linearGradient></defs>
      <ellipse cx="50" cy="92" rx="26" ry="4" fill="rgba(0,0,0,.18)"/>
      <path d="M50 6c2 14-18 22-18 42 0 14 8 24 18 24s18-10 18-24c0-8-3-13-3-22 0 4-3 6-6 6 0-10-6-16-9-26z" fill={`url(#${id}-g)`} stroke="#7E0F20" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M50 38c-4 6-8 12-8 22 0 6 4 12 8 12s8-6 8-12c0-4-2-6-2-12 0 2-2 4-3 4 0-4-1-8-3-14z" fill="#FFF1A8" opacity=".85"/>
    </svg>
  );
};

export const LightningIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs><linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFE066"/><stop offset=".55" stopColor="#FFC107"/><stop offset="1" stopColor="#C77800"/></linearGradient></defs>
      <ellipse cx="50" cy="92" rx="26" ry="4" fill="rgba(0,0,0,.18)"/>
      <path d="M52 6L18 56h22l-8 38 36-50H46l10-38z" fill={`url(#${id}-g)`} stroke="#8F5300" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M48 20l-18 30h10" stroke="rgba(255,255,255,.7)" strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  );
};

export const ShieldIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs><linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9EE2FF"/><stop offset=".5" stopColor="#3FB7F1"/><stop offset="1" stopColor="#0D5784"/></linearGradient></defs>
      <ellipse cx="50" cy="92" rx="28" ry="4" fill="rgba(0,0,0,.18)"/>
      <path d="M50 8L18 16v30c0 22 14 36 32 44 18-8 32-22 32-44V16L50 8z" fill={`url(#${id}-g)`} stroke="#0A4D74" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M50 30v32M34 46h32" stroke="#fff" strokeWidth="6" strokeLinecap="round"/>
      <path d="M28 22v22" stroke="rgba(255,255,255,.55)" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  );
};

export const KeyIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs><radialGradient id={`${id}-g`} cx=".35" cy=".35" r=".75"><stop offset="0" stopColor="#FFF1A8"/><stop offset=".55" stopColor="#FFC107"/><stop offset="1" stopColor="#A97500"/></radialGradient></defs>
      <ellipse cx="50" cy="92" rx="28" ry="4" fill="rgba(0,0,0,.18)"/>
      <circle cx="32" cy="38" r="20" fill={`url(#${id}-g)`} stroke="#8F5300" strokeWidth="3"/>
      <circle cx="32" cy="38" r="8" fill="#8F5300"/>
      <rect x="48" y="32" width="42" height="12" rx="2" fill={`url(#${id}-g)`} stroke="#8F5300" strokeWidth="3"/>
      <rect x="68" y="44" width="6" height="10" fill={`url(#${id}-g)`} stroke="#8F5300" strokeWidth="3"/>
      <rect x="82" y="44" width="6" height="10" fill={`url(#${id}-g)`} stroke="#8F5300" strokeWidth="3"/>
      <path d="M18 28a18 18 0 0 1 14-12" stroke="rgba(255,255,255,.7)" strokeWidth="4" fill="none" strokeLinecap="round"/>
    </svg>
  );
};

// ════════════════════════════════════════════════════════════════════════════
//  LEARNING
// ════════════════════════════════════════════════════════════════════════════

export const BookClosedIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs><linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FF8B95"/><stop offset="1" stopColor="#D32A2A"/></linearGradient></defs>
      <ellipse cx="50" cy="92" rx="26" ry="4" fill="rgba(0,0,0,.18)"/>
      <rect x="22" y="14" width="56" height="72" rx="3" fill="#FFF1D2" stroke="#A87A2B" strokeWidth="2.5"/>
      <path d="M28 22v60M32 22v60" stroke="#E0CDA0" strokeWidth="1.4"/>
      <path d="M20 12h54a6 6 0 0 1 6 6v60a6 6 0 0 1-6 6H20V12z" fill={`url(#${id}-g)`} stroke="#7E0F20" strokeWidth="3" strokeLinejoin="round"/>
      <rect x="20" y="30" width="60" height="6" fill="#FFE066" stroke="#7E0F20" strokeWidth="2"/>
      <path d="M58 12v22l6-6 6 6V12z" fill="#FFC107" stroke="#7E0F20" strokeWidth="2" strokeLinejoin="round"/>
      <rect x="30" y="48" width="34" height="3" rx="1.5" fill="rgba(255,255,255,.85)"/>
      <rect x="30" y="56" width="26" height="3" rx="1.5" fill="rgba(255,255,255,.85)"/>
    </svg>
  );
};

export const OpenBookIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs>
        <linearGradient id={`${id}-l`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFF1D2"/><stop offset="1" stopColor="#FFD699"/></linearGradient>
        <linearGradient id={`${id}-r`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFE2A6"/><stop offset="1" stopColor="#FF9600"/></linearGradient>
      </defs>
      <ellipse cx="50" cy="92" rx="34" ry="4" fill="rgba(0,0,0,.18)"/>
      <path d="M6 28c14-8 36-10 42 0v54c-6-10-28-8-42 0V28z" fill={`url(#${id}-l)`} stroke="#8F5300" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M94 28c-14-8-36-10-42 0v54c6-10 28-8 42 0V28z" fill={`url(#${id}-r)`} stroke="#8F5300" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M48 30v52M52 30v52" stroke="#8F5300" strokeWidth="1.6"/>
      <path d="M14 42h26M14 50h22M14 58h26M14 66h18" stroke="rgba(143,83,0,.45)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M60 42h26M60 50h22M60 58h26M60 66h18" stroke="rgba(255,255,255,.75)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
};

export const PencilIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs><linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFE066"/><stop offset="1" stopColor="#E89A1A"/></linearGradient></defs>
      <ellipse cx="50" cy="92" rx="28" ry="4" fill="rgba(0,0,0,.18)"/>
      <g transform="rotate(-30 50 50)">
        <rect x="20" y="42" width="50" height="16" fill={`url(#${id}-g)`} stroke="#8F5300" strokeWidth="3"/>
        <rect x="14" y="42" width="10" height="16" rx="3" fill="#FF8B95" stroke="#7E0F20" strokeWidth="3"/>
        <rect x="22" y="42" width="6" height="16" fill="#C8C8D0" stroke="#7E7E88" strokeWidth="2"/>
        <path d="M70 42l16 8-16 8z" fill="#FFE2A6" stroke="#8F5300" strokeWidth="3" strokeLinejoin="round"/>
        <path d="M82 50l4 0z" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round"/>
        <rect x="36" y="42" width="3" height="16" fill="#8F5300"/>
        <rect x="60" y="42" width="3" height="16" fill="#8F5300"/>
      </g>
    </svg>
  );
};

export const BackpackIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs><linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9EE2FF"/><stop offset=".55" stopColor="#3FB7F1"/><stop offset="1" stopColor="#0D5784"/></linearGradient></defs>
      <ellipse cx="50" cy="92" rx="28" ry="4" fill="rgba(0,0,0,.18)"/>
      <path d="M40 14a10 10 0 0 1 20 0v8" stroke="#0A4D74" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <rect x="20" y="22" width="60" height="62" rx="14" fill={`url(#${id}-g)`} stroke="#0A4D74" strokeWidth="3"/>
      <rect x="30" y="44" width="40" height="28" rx="6" fill="rgba(255,255,255,.55)" stroke="#0A4D74" strokeWidth="3"/>
      <rect x="42" y="56" width="16" height="4" rx="2" fill="#0A4D74"/>
      <rect x="34" y="22" width="32" height="8" rx="2" fill="rgba(0,0,0,.18)"/>
    </svg>
  );
};

export const GradCapIcon = ({ size = 64, className, ...rest }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
    <ellipse cx="50" cy="92" rx="30" ry="4" fill="rgba(0,0,0,.18)"/>
    <path d="M50 22L8 40l42 18 42-18z" fill="#1B1D29" stroke="#000" strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M22 48v14c0 6 12 12 28 12s28-6 28-12V48L50 60z" fill="#1B1D29" stroke="#000" strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M14 40l34 14" stroke="rgba(255,255,255,.18)" strokeWidth="3"/>
    <path d="M86 40v22" stroke="#FFC107" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="86" cy="40" r="3" fill="#FFC107"/>
    <path d="M86 62l-3 8M86 62l3 8M86 62v8" stroke="#FFC107" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

export const LightbulbIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs><radialGradient id={`${id}-g`} cx=".4" cy=".3" r=".8"><stop offset="0" stopColor="#FFFFFF"/><stop offset=".5" stopColor="#FFE066"/><stop offset="1" stopColor="#E89A1A"/></radialGradient></defs>
      <ellipse cx="50" cy="92" rx="22" ry="4" fill="rgba(0,0,0,.18)"/>
      <g stroke="#FFC107" strokeWidth="3.5" strokeLinecap="round">
        <path d="M50 4v6M22 12l4 4M78 12l-4 4M10 30l5 1M90 30l-5 1"/>
      </g>
      <path d="M50 14a22 22 0 0 0-14 38c4 4 5 6 5 10v2h18v-2c0-4 1-6 5-10A22 22 0 0 0 50 14z" fill={`url(#${id}-g)`} stroke="#8F5300" strokeWidth="3" strokeLinejoin="round"/>
      <rect x="38" y="64" width="24" height="8" fill="#8E8E96" stroke="#3E3E46" strokeWidth="2"/>
      <rect x="40" y="72" width="20" height="6" fill="#5E5E66" stroke="#3E3E46" strokeWidth="2"/>
      <rect x="42" y="78" width="16" height="6" rx="2" fill="#3E3E46"/>
      <path d="M44 32c4-4 12-4 16 0" stroke="rgba(255,255,255,.7)" strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  );
};

export const BrainIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs><linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFC2D1"/><stop offset="1" stopColor="#FF6F8E"/></linearGradient></defs>
      <ellipse cx="50" cy="92" rx="28" ry="4" fill="rgba(0,0,0,.18)"/>
      <path d="M48 16c-12 0-22 8-22 18 0 4 1 6 1 8-4 3-7 8-7 14 0 8 6 14 14 14 4 0 6-1 8-2v8h6V18c-2-1-3-2-6-2z" fill={`url(#${id}-g)`} stroke="#9D1A40" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M52 16c12 0 22 8 22 18 0 4-1 6-1 8 4 3 7 8 7 14 0 8-6 14-14 14-4 0-6-1-8-2v8h-6V18c2-1 3-2 6-2z" fill={`url(#${id}-g)`} stroke="#9D1A40" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M36 32c4 2 6 6 6 10M62 32c-4 2-6 6-6 10M30 52c4 2 8 6 12 6M68 52c-4 2-8 6-12 6" stroke="#9D1A40" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
};

export const AppleIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs><linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFB3BF"/><stop offset=".5" stopColor="#FF4759"/><stop offset="1" stopColor="#B5172A"/></linearGradient></defs>
      <ellipse cx="50" cy="92" rx="26" ry="4" fill="rgba(0,0,0,.18)"/>
      <path d="M52 14c8-6 18-6 22 0-2 8-12 12-22 4z" fill="#86E067" stroke="#3F6A07" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M50 16v6" stroke="#5C4128" strokeWidth="3" strokeLinecap="round"/>
      <path d="M50 22c-14 0-30 12-30 30 0 18 14 32 30 32s30-14 30-32c0-18-16-30-30-30z" fill={`url(#${id}-g)`} stroke="#7E0F20" strokeWidth="3" strokeLinejoin="round"/>
      <ellipse cx="36" cy="40" rx="5" ry="9" fill="rgba(255,255,255,.6)" transform="rotate(-30 36 40)"/>
    </svg>
  );
};

// ════════════════════════════════════════════════════════════════════════════
//  READING
// ════════════════════════════════════════════════════════════════════════════

export const SpeechBubbleIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs><linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFFFFF"/><stop offset="1" stopColor="#D0F0FF"/></linearGradient></defs>
      <ellipse cx="50" cy="92" rx="28" ry="4" fill="rgba(0,0,0,.18)"/>
      <path d="M14 22a8 8 0 0 1 8-8h56a8 8 0 0 1 8 8v34a8 8 0 0 1-8 8H50l-18 14v-14h-10a8 8 0 0 1-8-8z" fill={`url(#${id}-g)`} stroke="#0A4D74" strokeWidth="3" strokeLinejoin="round"/>
      <rect x="26" y="28" width="48" height="4" rx="2" fill="#3FB7F1"/>
      <rect x="26" y="38" width="36" height="4" rx="2" fill="#3FB7F1"/>
      <rect x="26" y="48" width="42" height="4" rx="2" fill="#3FB7F1"/>
    </svg>
  );
};

export const LetterCubeIcon = ({ size = 64, className, ...rest }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
    <ellipse cx="50" cy="92" rx="28" ry="4" fill="rgba(0,0,0,.18)"/>
    <rect x="22" y="22" width="56" height="56" rx="8" fill="#FFD699" stroke="#8F5300" strokeWidth="3"/>
    <path d="M22 28L34 16h54l-12 12z" fill="#FFE2A6" stroke="#8F5300" strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M78 22l12-12v56l-12 12z" fill="#FFC766" stroke="#8F5300" strokeWidth="2.5" strokeLinejoin="round"/>
    <text x="50" y="65" textAnchor="middle" fontFamily="'Baloo 2', sans-serif" fontWeight="800" fontSize="38" fill="#8F5300">A</text>
  </svg>
);

export const BookmarkIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs><linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FF8B95"/><stop offset=".5" stopColor="#FF4759"/><stop offset="1" stopColor="#9D1A40"/></linearGradient></defs>
      <ellipse cx="50" cy="92" rx="22" ry="4" fill="rgba(0,0,0,.18)"/>
      <path d="M28 8h44v82L50 72 28 90z" fill={`url(#${id}-g)`} stroke="#7E0F20" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M50 28l3 8 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1z" fill="#FFE066" stroke="#7E0F20" strokeWidth="2"/>
    </svg>
  );
};

export const MagnifierIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs><radialGradient id={`${id}-g`} cx=".35" cy=".3" r=".8"><stop offset="0" stopColor="#FFFFFF"/><stop offset=".5" stopColor="#D0F0FF"/><stop offset="1" stopColor="#3FB7F1"/></radialGradient></defs>
      <ellipse cx="50" cy="92" rx="28" ry="4" fill="rgba(0,0,0,.18)"/>
      <rect x="60" y="60" width="14" height="34" rx="4" fill="#8F5300" stroke="#5C3702" strokeWidth="3" transform="rotate(40 67 77)"/>
      <circle cx="42" cy="42" r="28" fill={`url(#${id}-g)`} stroke="#0A4D74" strokeWidth="4"/>
      <circle cx="42" cy="42" r="22" fill="rgba(255,255,255,.3)"/>
      <ellipse cx="32" cy="32" rx="6" ry="9" fill="rgba(255,255,255,.85)" transform="rotate(-30 32 32)"/>
    </svg>
  );
};

// ════════════════════════════════════════════════════════════════════════════
//  SPEAKING
// ════════════════════════════════════════════════════════════════════════════

export const MicrophoneIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs>
        <linearGradient id={`${id}-head`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FF8B95"/><stop offset="1" stopColor="#B5172A"/></linearGradient>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#E0E0E8"/><stop offset="1" stopColor="#888894"/></linearGradient>
      </defs>
      <ellipse cx="50" cy="94" rx="22" ry="4" fill="rgba(0,0,0,.18)"/>
      <path d="M18 50a14 14 0 0 0 14 14M82 50a14 14 0 0 1-14 14" stroke="#3FB7F1" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <rect x="34" y="10" width="32" height="50" rx="16" fill={`url(#${id}-head)`} stroke="#7E0F20" strokeWidth="3"/>
      <path d="M38 20h24M38 30h24M38 40h24M38 50h24" stroke="rgba(255,255,255,.45)" strokeWidth="2" strokeLinecap="round"/>
      <rect x="46" y="60" width="8" height="20" fill={`url(#${id}-body)`} stroke="#3E3E46" strokeWidth="2.5"/>
      <rect x="34" y="78" width="32" height="8" rx="3" fill={`url(#${id}-body)`} stroke="#3E3E46" strokeWidth="2.5"/>
      <ellipse cx="42" cy="22" rx="3" ry="6" fill="rgba(255,255,255,.55)"/>
    </svg>
  );
};

export const SoundWavesIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs><linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9EE2FF"/><stop offset=".5" stopColor="#3FB7F1"/><stop offset="1" stopColor="#0D5784"/></linearGradient></defs>
      <ellipse cx="50" cy="92" rx="28" ry="4" fill="rgba(0,0,0,.18)"/>
      <path d="M14 36h16l18-16v60L30 64H14z" fill={`url(#${id}-g)`} stroke="#0A4D74" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M60 36a16 16 0 0 1 0 28" stroke="#0A4D74" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <path d="M70 28a26 26 0 0 1 0 44" stroke="#0A4D74" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <path d="M80 20a36 36 0 0 1 0 60" stroke="#0A4D74" strokeWidth="4" fill="none" strokeLinecap="round"/>
    </svg>
  );
};

export const MegaphoneIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs><linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFC766"/><stop offset=".5" stopColor="#FF8A1F"/><stop offset="1" stopColor="#C45E08"/></linearGradient></defs>
      <ellipse cx="50" cy="92" rx="28" ry="4" fill="rgba(0,0,0,.18)"/>
      <path d="M14 40v20l24 8 36 14V20L38 32z" fill={`url(#${id}-g)`} stroke="#7A3A02" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M38 32v36" stroke="#7A3A02" strokeWidth="3"/>
      <rect x="74" y="14" width="10" height="72" rx="4" fill={`url(#${id}-g)`} stroke="#7A3A02" strokeWidth="3"/>
      <rect x="38" y="68" width="8" height="20" rx="2" fill="#7A3A02"/>
      <path d="M28 40v20" stroke="rgba(255,255,255,.55)" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  );
};

export const MusicNoteIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs><linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#E0B6FF"/><stop offset=".5" stopColor="#9013FE"/><stop offset="1" stopColor="#4A0784"/></linearGradient></defs>
      <ellipse cx="50" cy="92" rx="28" ry="4" fill="rgba(0,0,0,.18)"/>
      <path d="M40 14L82 8v18l-42 6z" fill={`url(#${id}-g)`} stroke="#3F0866" strokeWidth="3" strokeLinejoin="round"/>
      <rect x="36" y="14" width="6" height="56" rx="2" fill={`url(#${id}-g)`} stroke="#3F0866" strokeWidth="3"/>
      <rect x="76" y="8" width="6" height="56" rx="2" fill={`url(#${id}-g)`} stroke="#3F0866" strokeWidth="3"/>
      <ellipse cx="30" cy="74" rx="14" ry="10" fill={`url(#${id}-g)`} stroke="#3F0866" strokeWidth="3" transform="rotate(-12 30 74)"/>
      <ellipse cx="70" cy="68" rx="14" ry="10" fill={`url(#${id}-g)`} stroke="#3F0866" strokeWidth="3" transform="rotate(-12 70 68)"/>
      <ellipse cx="26" cy="70" rx="4" ry="2.5" fill="rgba(255,255,255,.65)" transform="rotate(-12 26 70)"/>
    </svg>
  );
};

// ════════════════════════════════════════════════════════════════════════════
//  MATHEMATICS
// ════════════════════════════════════════════════════════════════════════════

export const PlusBlockIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs><linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#86E067"/><stop offset=".5" stopColor="#58CC02"/><stop offset="1" stopColor="#2E6B00"/></linearGradient></defs>
      <ellipse cx="50" cy="92" rx="28" ry="4" fill="rgba(0,0,0,.18)"/>
      <rect x="14" y="14" width="72" height="72" rx="14" fill={`url(#${id}-g)`} stroke="#2E6B00" strokeWidth="3"/>
      <rect x="44" y="24" width="12" height="52" rx="3" fill="#fff"/>
      <rect x="24" y="44" width="52" height="12" rx="3" fill="#fff"/>
      <rect x="20" y="20" width="10" height="42" rx="3" fill="rgba(255,255,255,.4)"/>
    </svg>
  );
};

export const MinusIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs><linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9EE2FF"/><stop offset=".5" stopColor="#1CB0F6"/><stop offset="1" stopColor="#06628A"/></linearGradient></defs>
      <ellipse cx="50" cy="92" rx="28" ry="4" fill="rgba(0,0,0,.18)"/>
      <rect x="14" y="14" width="72" height="72" rx="14" fill={`url(#${id}-g)`} stroke="#06628A" strokeWidth="3"/>
      <rect x="24" y="44" width="52" height="12" rx="3" fill="#fff"/>
      <rect x="20" y="20" width="10" height="42" rx="3" fill="rgba(255,255,255,.4)"/>
    </svg>
  );
};

export const MultiplyIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs><linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#E0B6FF"/><stop offset=".5" stopColor="#CE82FF"/><stop offset="1" stopColor="#6E3B85"/></linearGradient></defs>
      <ellipse cx="50" cy="92" rx="28" ry="4" fill="rgba(0,0,0,.18)"/>
      <rect x="14" y="14" width="72" height="72" rx="14" fill={`url(#${id}-g)`} stroke="#6E3B85" strokeWidth="3"/>
      <path d="M30 30l40 40M70 30L30 70" stroke="#fff" strokeWidth="12" strokeLinecap="round"/>
      <rect x="20" y="20" width="10" height="42" rx="3" fill="rgba(255,255,255,.4)"/>
    </svg>
  );
};

export const DivideIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs><linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFC766"/><stop offset=".5" stopColor="#FF8A1F"/><stop offset="1" stopColor="#7A3A02"/></linearGradient></defs>
      <ellipse cx="50" cy="92" rx="28" ry="4" fill="rgba(0,0,0,.18)"/>
      <rect x="14" y="14" width="72" height="72" rx="14" fill={`url(#${id}-g)`} stroke="#7A3A02" strokeWidth="3"/>
      <circle cx="50" cy="32" r="6" fill="#fff"/>
      <circle cx="50" cy="68" r="6" fill="#fff"/>
      <rect x="24" y="44" width="52" height="12" rx="3" fill="#fff"/>
      <rect x="20" y="20" width="10" height="42" rx="3" fill="rgba(255,255,255,.4)"/>
    </svg>
  );
};

export const CalculatorIcon = ({ size = 64, className, ...rest }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
    <ellipse cx="50" cy="94" rx="28" ry="4" fill="rgba(0,0,0,.18)"/>
    <rect x="18" y="8" width="64" height="84" rx="10" fill="#3FB7F1" stroke="#06628A" strokeWidth="3"/>
    <rect x="24" y="16" width="52" height="20" rx="4" fill="#E1F5E5" stroke="#06628A" strokeWidth="2"/>
    <text x="70" y="32" textAnchor="end" fontFamily="'Baloo 2', sans-serif" fontWeight="800" fontSize="16" fill="#2E6B00">123</text>
    <g fill="#fff" stroke="#06628A" strokeWidth="2">
      <rect x="26" y="42" width="12" height="10" rx="2"/>
      <rect x="44" y="42" width="12" height="10" rx="2"/>
      <rect x="62" y="42" width="12" height="10" rx="2"/>
      <rect x="26" y="56" width="12" height="10" rx="2"/>
      <rect x="44" y="56" width="12" height="10" rx="2"/>
      <rect x="62" y="56" width="12" height="10" rx="2" fill="#FFC107"/>
      <rect x="26" y="70" width="12" height="10" rx="2"/>
      <rect x="44" y="70" width="12" height="10" rx="2"/>
      <rect x="62" y="70" width="12" height="10" rx="2" fill="#58CC02"/>
    </g>
  </svg>
);

export const RulerIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs><linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFE066"/><stop offset="1" stopColor="#E89A1A"/></linearGradient></defs>
      <ellipse cx="50" cy="94" rx="28" ry="4" fill="rgba(0,0,0,.18)"/>
      <g transform="rotate(-40 50 50)">
        <rect x="10" y="38" width="80" height="24" rx="3" fill={`url(#${id}-g)`} stroke="#8F5300" strokeWidth="3"/>
        <g stroke="#8F5300" strokeWidth="2.2">
          <path d="M18 38v8M26 38v6M34 38v8M42 38v6M50 38v10M58 38v6M66 38v8M74 38v6M82 38v8"/>
        </g>
        <text x="50" y="58" textAnchor="middle" fontFamily="'Baloo 2', sans-serif" fontWeight="800" fontSize="9" fill="#8F5300">1 2 3 4 5</text>
      </g>
    </svg>
  );
};

export const AbacusIcon = ({ size = 64, className, ...rest }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
    <ellipse cx="50" cy="94" rx="32" ry="4" fill="rgba(0,0,0,.18)"/>
    <rect x="10" y="14" width="80" height="72" rx="6" fill="#8F5300" stroke="#5C3702" strokeWidth="3"/>
    <rect x="14" y="20" width="72" height="60" fill="#FFE2A6" stroke="#5C3702" strokeWidth="2"/>
    <g stroke="#5C3702" strokeWidth="2">
      <path d="M14 30h72M14 44h72M14 58h72M14 72h72"/>
    </g>
    <g stroke="#3E3E46" strokeWidth="1.4">
      <circle cx="24" cy="30" r="5" fill="#FF4759"/>
      <circle cx="36" cy="30" r="5" fill="#FF4759"/>
      <circle cx="64" cy="30" r="5" fill="#FFC107"/>
      <circle cx="76" cy="30" r="5" fill="#FFC107"/>
      <circle cx="24" cy="44" r="5" fill="#3FB7F1"/>
      <circle cx="36" cy="44" r="5" fill="#3FB7F1"/>
      <circle cx="48" cy="44" r="5" fill="#3FB7F1"/>
      <circle cx="60" cy="58" r="5" fill="#58CC02"/>
      <circle cx="72" cy="58" r="5" fill="#58CC02"/>
      <circle cx="24" cy="72" r="5" fill="#CE82FF"/>
      <circle cx="36" cy="72" r="5" fill="#CE82FF"/>
      <circle cx="48" cy="72" r="5" fill="#CE82FF"/>
      <circle cx="60" cy="72" r="5" fill="#CE82FF"/>
    </g>
  </svg>
);

export const ShapesIcon = ({ size = 64, className, ...rest }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
    <ellipse cx="50" cy="94" rx="32" ry="4" fill="rgba(0,0,0,.18)"/>
    <path d="M28 14l18 30H10z" fill="#FF4759" stroke="#7E0F20" strokeWidth="3" strokeLinejoin="round"/>
    <circle cx="72" cy="30" r="18" fill="#3FB7F1" stroke="#0A4D74" strokeWidth="3"/>
    <rect x="10" y="56" width="36" height="32" rx="4" fill="#58CC02" stroke="#2E6B00" strokeWidth="3"/>
    <path d="M70 50l20 18-20 18-20-18z" fill="#FFC107" stroke="#8F5300" strokeWidth="3" strokeLinejoin="round"/>
  </svg>
);

// ════════════════════════════════════════════════════════════════════════════
//  ARABIC · JAWI
// ════════════════════════════════════════════════════════════════════════════

const ARABIC_FONT = "'Amiri','Lateef',serif";

export const AlifIcon = ({ size = 64, className, ...rest }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
    <ellipse cx="50" cy="92" rx="28" ry="4" fill="rgba(0,0,0,.18)"/>
    <rect x="22" y="22" width="56" height="56" rx="10" fill="#86E067" stroke="#2E6B00" strokeWidth="3"/>
    <rect x="22" y="22" width="56" height="14" rx="10" fill="rgba(255,255,255,.35)"/>
    <text x="50" y="70" textAnchor="middle" fontFamily={ARABIC_FONT} fontWeight="700" fontSize="48" fill="#fff" stroke="#2E6B00" strokeWidth="1">ا</text>
  </svg>
);

export const BaIcon = ({ size = 64, className, ...rest }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
    <ellipse cx="50" cy="92" rx="28" ry="4" fill="rgba(0,0,0,.18)"/>
    <rect x="22" y="22" width="56" height="56" rx="10" fill="#3FB7F1" stroke="#06628A" strokeWidth="3"/>
    <rect x="22" y="22" width="56" height="14" rx="10" fill="rgba(255,255,255,.35)"/>
    <text x="50" y="62" textAnchor="middle" fontFamily={ARABIC_FONT} fontWeight="700" fontSize="40" fill="#fff" stroke="#06628A" strokeWidth="1">ب</text>
  </svg>
);

export const TaIcon = ({ size = 64, className, ...rest }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
    <ellipse cx="50" cy="92" rx="28" ry="4" fill="rgba(0,0,0,.18)"/>
    <rect x="22" y="22" width="56" height="56" rx="10" fill="#CE82FF" stroke="#6E3B85" strokeWidth="3"/>
    <rect x="22" y="22" width="56" height="14" rx="10" fill="rgba(255,255,255,.35)"/>
    <text x="50" y="62" textAnchor="middle" fontFamily={ARABIC_FONT} fontWeight="700" fontSize="40" fill="#fff" stroke="#6E3B85" strokeWidth="1">ت</text>
  </svg>
);

export const QuranIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs><linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#86E067"/><stop offset=".5" stopColor="#3F8F12"/><stop offset="1" stopColor="#1F4A00"/></linearGradient></defs>
      <ellipse cx="50" cy="92" rx="30" ry="4" fill="rgba(0,0,0,.22)"/>
      <path d="M14 78l36-10 36 10v6H14z" fill="#8F5300" stroke="#5C3702" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M18 70l32-8 32 8-32 6z" fill="#FFE2A6" stroke="#8F5300" strokeWidth="2"/>
      <path d="M22 32a18 6 0 0 1 26 0v34l-26-6z" fill={`url(#${id}-g)`} stroke="#1F4A00" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M78 32a18 6 0 0 0-26 0v34l26-6z" fill={`url(#${id}-g)`} stroke="#1F4A00" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M46 40h8v18h-8z" fill="#FFC107" stroke="#1F4A00" strokeWidth="2"/>
      <circle cx="50" cy="36" r="3" fill="#FFC107" stroke="#1F4A00" strokeWidth="1.5"/>
      <path d="M30 46c4 -2 8 -2 12 0M58 46c4 -2 8 -2 12 0M30 54c4 -2 8 -2 12 0M58 54c4 -2 8 -2 12 0" stroke="#FFC107" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  );
};

export const CrescentStarIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs>
        <radialGradient id={`${id}-moon`} cx=".35" cy=".35" r=".75"><stop offset="0" stopColor="#FFF1A8"/><stop offset=".55" stopColor="#FFC107"/><stop offset="1" stopColor="#A97500"/></radialGradient>
        <radialGradient id={`${id}-star`} cx=".4" cy=".3" r=".7"><stop offset="0" stopColor="#FFFFFF"/><stop offset=".5" stopColor="#FFE066"/><stop offset="1" stopColor="#C77800"/></radialGradient>
      </defs>
      <ellipse cx="50" cy="92" rx="28" ry="4" fill="rgba(0,0,0,.18)"/>
      <path d="M62 14a36 36 0 1 0 0 72 28 28 0 1 1 0-72z" fill={`url(#${id}-moon)`} stroke="#8F5300" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M72 50l4 9 10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1z" fill={`url(#${id}-star)`} stroke="#8F5300" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M30 36c-4 4-6 10-6 14" stroke="rgba(255,255,255,.7)" strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  );
};

export const MosqueIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs><linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9EE2FF"/><stop offset=".5" stopColor="#3FB7F1"/><stop offset="1" stopColor="#0A4D74"/></linearGradient></defs>
      <ellipse cx="50" cy="92" rx="34" ry="4" fill="rgba(0,0,0,.22)"/>
      <rect x="10" y="46" width="10" height="38" fill="#FFE2A6" stroke="#8F5300" strokeWidth="2.5"/>
      <path d="M10 46l5-10 5 10z" fill={`url(#${id}-g)`} stroke="#0A4D74" strokeWidth="2.5" strokeLinejoin="round"/>
      <rect x="80" y="46" width="10" height="38" fill="#FFE2A6" stroke="#8F5300" strokeWidth="2.5"/>
      <path d="M80 46l5-10 5 10z" fill={`url(#${id}-g)`} stroke="#0A4D74" strokeWidth="2.5" strokeLinejoin="round"/>
      <rect x="22" y="50" width="56" height="36" fill="#FFE2A6" stroke="#8F5300" strokeWidth="3"/>
      <path d="M22 50a28 28 0 0 1 56 0z" fill={`url(#${id}-g)`} stroke="#0A4D74" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M50 12a6 6 0 1 0 0 12 4 4 0 1 1 0-12z" fill="#FFC107" stroke="#8F5300" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M44 70a6 6 0 0 1 12 0v16h-12z" fill="#8F5300" stroke="#5C3702" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M28 64a4 4 0 0 1 8 0v6h-8z" fill="rgba(0,0,0,.3)"/>
      <path d="M64 64a4 4 0 0 1 8 0v6h-8z" fill="rgba(0,0,0,.3)"/>
    </svg>
  );
};

export const TasbihIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs><radialGradient id={`${id}-g`} cx=".35" cy=".35" r=".8"><stop offset="0" stopColor="#FFB3BF"/><stop offset=".5" stopColor="#9013FE"/><stop offset="1" stopColor="#4A0784"/></radialGradient></defs>
      <ellipse cx="50" cy="92" rx="28" ry="4" fill="rgba(0,0,0,.18)"/>
      <path d="M50 14C20 14 14 40 14 56s8 30 36 30 36-14 36-30S80 14 50 14z" fill="none" stroke="#5C3702" strokeWidth="2.5"/>
      <g fill={`url(#${id}-g)`} stroke="#3F0866" strokeWidth="2">
        <circle cx="24" cy="32" r="6"/>
        <circle cx="38" cy="20" r="6"/>
        <circle cx="50" cy="16" r="6"/>
        <circle cx="62" cy="20" r="6"/>
        <circle cx="76" cy="32" r="6"/>
        <circle cx="84" cy="46" r="6"/>
        <circle cx="84" cy="60" r="6"/>
        <circle cx="76" cy="74" r="6"/>
        <circle cx="62" cy="84" r="6"/>
        <circle cx="38" cy="84" r="6"/>
        <circle cx="24" cy="74" r="6"/>
        <circle cx="16" cy="60" r="6"/>
        <circle cx="16" cy="46" r="6"/>
      </g>
      <circle cx="50" cy="50" r="6" fill="#FFC107" stroke="#8F5300" strokeWidth="2"/>
      <path d="M50 56v14M47 56v14M53 56v14" stroke="#FFC107" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
};

// ════════════════════════════════════════════════════════════════════════════
//  READING · ACTIVITIES  (Tahap 1–4)
// ════════════════════════════════════════════════════════════════════════════

export const KvIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFC766"/><stop offset=".55" stopColor="#FF9600"/><stop offset="1" stopColor="#8F5300"/></linearGradient>
      </defs>
      <ellipse cx="50" cy="94" rx="32" ry="4" fill="rgba(0,0,0,.22)"/>
      <rect x="8" y="8" width="84" height="84" rx="18" fill={`url(#${id}-bg)`} stroke="#8F5300" strokeWidth="3"/>
      <rect x="12" y="12" width="76" height="28" rx="14" fill="rgba(255,255,255,.28)"/>
      <g>
        <rect x="20" y="36" width="30" height="38" rx="6" fill="#FFE2A6" stroke="#8F5300" strokeWidth="2.6"/>
        <rect x="20" y="36" width="30" height="10" rx="6" fill="rgba(255,255,255,.55)"/>
        <text x="35" y="66" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="22" fill="#8F5300">B</text>
      </g>
      <g>
        <rect x="52" y="42" width="30" height="38" rx="6" fill="#fff" stroke="#8F5300" strokeWidth="2.6"/>
        <rect x="52" y="42" width="30" height="10" rx="6" fill="rgba(255,200,0,.4)"/>
        <text x="67" y="72" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="22" fill="#8F5300">A</text>
      </g>
      <path d="M80 18l2 5 5 1-5 2-2 5-2-5-5-2 5-1z" fill="#fff"/>
    </svg>
  );
};

export const KvkIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9EE2FF"/><stop offset=".55" stopColor="#1CB0F6"/><stop offset="1" stopColor="#06628A"/></linearGradient>
      </defs>
      <ellipse cx="50" cy="94" rx="32" ry="4" fill="rgba(0,0,0,.22)"/>
      <rect x="8" y="8" width="84" height="84" rx="18" fill={`url(#${id}-bg)`} stroke="#06628A" strokeWidth="3"/>
      <rect x="12" y="12" width="76" height="28" rx="14" fill="rgba(255,255,255,.28)"/>
      <g>
        <rect x="14" y="42" width="24" height="32" rx="5" fill="#fff" stroke="#06628A" strokeWidth="2.4"/>
        <text x="26" y="66" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="18" fill="#06628A">K</text>
      </g>
      <g>
        <rect x="38" y="46" width="24" height="32" rx="5" fill="#D0F0FF" stroke="#06628A" strokeWidth="2.4"/>
        <text x="50" y="70" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="18" fill="#06628A">A</text>
      </g>
      <g>
        <rect x="62" y="42" width="24" height="32" rx="5" fill="#fff" stroke="#06628A" strokeWidth="2.4"/>
        <text x="74" y="66" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="18" fill="#06628A">N</text>
      </g>
      <path d="M20 22l2 4 4 1-4 2-2 4-2-4-4-2 4-1z" fill="#fff"/>
    </svg>
  );
};

export const AyatPendekIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#EDD9FF"/><stop offset=".55" stopColor="#CE82FF"/><stop offset="1" stopColor="#6E3B85"/></linearGradient>
        <linearGradient id={`${id}-book`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFF1D2"/><stop offset="1" stopColor="#FFD699"/></linearGradient>
      </defs>
      <ellipse cx="50" cy="94" rx="32" ry="4" fill="rgba(0,0,0,.22)"/>
      <rect x="8" y="8" width="84" height="84" rx="18" fill={`url(#${id}-bg)`} stroke="#6E3B85" strokeWidth="3"/>
      <rect x="12" y="12" width="76" height="28" rx="14" fill="rgba(255,255,255,.28)"/>
      <path d="M14 46c10-6 24-6 36 0v34c-10-6-26-4-36 0z" fill={`url(#${id}-book)`} stroke="#6E3B85" strokeWidth="2.6" strokeLinejoin="round"/>
      <path d="M86 46c-10-6-24-6-36 0v34c10-6 26-4 36 0z" fill={`url(#${id}-book)`} stroke="#6E3B85" strokeWidth="2.6" strokeLinejoin="round"/>
      <path d="M50 48v32" stroke="#6E3B85" strokeWidth="1.6"/>
      <rect x="20" y="54" width="22" height="3" rx="1.5" fill="#CE82FF"/>
      <rect x="20" y="62" width="16" height="3" rx="1.5" fill="#CE82FF"/>
      <rect x="56" y="54" width="22" height="3" rx="1.5" fill="#CE82FF"/>
      <rect x="56" y="62" width="14" height="3" rx="1.5" fill="#CE82FF"/>
      <path d="M76 22l2 5 5 1-5 2-2 5-2-5-5-2 5-1z" fill="#FFE066"/>
    </svg>
  );
};

export const AyatPanjangIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#B6F08A"/><stop offset=".55" stopColor="#58CC02"/><stop offset="1" stopColor="#2E6B00"/></linearGradient>
        <linearGradient id={`${id}-book`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFFFFF"/><stop offset="1" stopColor="#E1F5E5"/></linearGradient>
      </defs>
      <ellipse cx="50" cy="94" rx="32" ry="4" fill="rgba(0,0,0,.22)"/>
      <rect x="8" y="8" width="84" height="84" rx="18" fill={`url(#${id}-bg)`} stroke="#2E6B00" strokeWidth="3"/>
      <rect x="12" y="12" width="76" height="28" rx="14" fill="rgba(255,255,255,.28)"/>
      <circle cx="78" cy="22" r="6" fill="#FFE066" stroke="#2E6B00" strokeWidth="1.6"/>
      <rect x="18" y="40" width="64" height="44" rx="4" fill={`url(#${id}-book)`} stroke="#2E6B00" strokeWidth="2.6"/>
      <rect x="18" y="48" width="64" height="4" fill="#46A302"/>
      <g stroke="#46A302" strokeWidth="2.4" strokeLinecap="round">
        <path d="M24 58h52"/>
        <path d="M24 64h44"/>
        <path d="M24 70h52"/>
        <path d="M24 76h36"/>
      </g>
      <path d="M68 40v16l4-4 4 4V40z" fill="#FFC107" stroke="#2E6B00" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  );
};

// ════════════════════════════════════════════════════════════════════════════
//  SPEAKING · ACTIVITIES
// ════════════════════════════════════════════════════════════════════════════

export const EnglishPhonicsIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FF8FBF"/><stop offset=".55" stopColor="#FF1F7A"/><stop offset="1" stopColor="#8C0438"/></linearGradient>
      </defs>
      <ellipse cx="50" cy="94" rx="32" ry="4" fill="rgba(0,0,0,.22)"/>
      <rect x="8" y="8" width="84" height="84" rx="18" fill={`url(#${id}-bg)`} stroke="#8C0438" strokeWidth="3"/>
      <rect x="12" y="12" width="76" height="28" rx="14" fill="rgba(255,255,255,.28)"/>
      <g>
        <rect x="22" y="40" width="22" height="22" rx="4" fill="#fff" stroke="#8C0438" strokeWidth="2.2"/>
        <text x="33" y="58" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="16" fill="#8C0438">A</text>
      </g>
      <g>
        <rect x="39" y="48" width="22" height="22" rx="4" fill="#FFD6E6" stroke="#8C0438" strokeWidth="2.2"/>
        <text x="50" y="66" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="16" fill="#8C0438">B</text>
      </g>
      <g>
        <rect x="56" y="40" width="22" height="22" rx="4" fill="#fff" stroke="#8C0438" strokeWidth="2.2"/>
        <text x="67" y="58" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="16" fill="#8C0438">C</text>
      </g>
      <g stroke="#fff" strokeWidth="2.4" strokeLinecap="round" fill="none">
        <path d="M28 78q4-4 8 0t8 0 8 0 8 0 8 0"/>
        <path d="M34 84q2-2 4 0t4 0 4 0 4 0 4 0 4 0"/>
      </g>
    </svg>
  );
};

export const CommonObjectsIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#86E0BA"/><stop offset=".55" stopColor="#16A87A"/><stop offset="1" stopColor="#0B5C44"/></linearGradient>
        <linearGradient id={`${id}-apple`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFB3BF"/><stop offset="1" stopColor="#B5172A"/></linearGradient>
      </defs>
      <ellipse cx="50" cy="94" rx="32" ry="4" fill="rgba(0,0,0,.22)"/>
      <rect x="8" y="8" width="84" height="84" rx="18" fill={`url(#${id}-bg)`} stroke="#0B5C44" strokeWidth="3"/>
      <rect x="12" y="12" width="76" height="28" rx="14" fill="rgba(255,255,255,.28)"/>
      <path d="M40 24c4-3 9-3 11 0z" fill="#86E067" stroke="#0B5C44" strokeWidth="1.8"/>
      <path d="M44 36c-9 0-19 8-19 19s8 22 19 22 19-12 19-22-10-19-19-19z" fill={`url(#${id}-apple)`} stroke="#7E0F20" strokeWidth="2.4"/>
      <ellipse cx="36" cy="48" rx="3" ry="6" fill="rgba(255,255,255,.55)" transform="rotate(-25 36 48)"/>
      <g>
        <path d="M62 38h22a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H72l-6 6v-6h-4a4 4 0 0 1-4-4V42a4 4 0 0 1 4-4z" fill="#fff" stroke="#0B5C44" strokeWidth="2.2" strokeLinejoin="round"/>
        <text x="73" y="54" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="11" fill="#0B5C44">APPLE</text>
      </g>
    </svg>
  );
};

export const Numbers100Icon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFD86B"/><stop offset=".55" stopColor="#FFB300"/><stop offset="1" stopColor="#8C5D00"/></linearGradient>
      </defs>
      <ellipse cx="50" cy="94" rx="32" ry="4" fill="rgba(0,0,0,.22)"/>
      <rect x="8" y="8" width="84" height="84" rx="18" fill={`url(#${id}-bg)`} stroke="#8C5D00" strokeWidth="3"/>
      <rect x="12" y="12" width="76" height="28" rx="14" fill="rgba(255,255,255,.28)"/>
      <path d="M18 36h64a6 6 0 0 1 6 6v22a6 6 0 0 1-6 6H40l-10 10V70h-12a6 6 0 0 1-6-6V42a6 6 0 0 1 6-6z" fill="#fff" stroke="#8C5D00" strokeWidth="2.6" strokeLinejoin="round"/>
      <text x="50" y="62" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="22" fill="#8C5D00">1-100</text>
      <circle cx="80" cy="22" r="6" fill="#fff" stroke="#8C5D00" strokeWidth="1.8"/>
      <rect x="77.6" y="18" width="4.8" height="8" rx="2.4" fill="#FF4759"/>
    </svg>
  );
};

// ════════════════════════════════════════════════════════════════════════════
//  JAWI · ACTIVITIES
// ════════════════════════════════════════════════════════════════════════════

export const JawiAlphabetIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#D8A8FF"/><stop offset=".55" stopColor="#9D4EDD"/><stop offset="1" stopColor="#5B2A8A"/></linearGradient>
      </defs>
      <ellipse cx="50" cy="94" rx="32" ry="4" fill="rgba(0,0,0,.22)"/>
      <rect x="8" y="8" width="84" height="84" rx="18" fill={`url(#${id}-bg)`} stroke="#5B2A8A" strokeWidth="3"/>
      <rect x="12" y="12" width="76" height="28" rx="14" fill="rgba(255,255,255,.28)"/>
      <g>
        <rect x="14" y="40" width="22" height="36" rx="5" fill="#F1E2FF" stroke="#5B2A8A" strokeWidth="2.4"/>
        <text x="25" y="68" textAnchor="middle" fontFamily={ARABIC_FONT} fontWeight="700" fontSize="22" fill="#5B2A8A">ا</text>
      </g>
      <g transform="rotate(-6 50 58)">
        <rect x="39" y="36" width="22" height="36" rx="5" fill="#fff" stroke="#5B2A8A" strokeWidth="2.4"/>
        <text x="50" y="62" textAnchor="middle" fontFamily={ARABIC_FONT} fontWeight="700" fontSize="22" fill="#5B2A8A">ب</text>
      </g>
      <g>
        <rect x="64" y="40" width="22" height="36" rx="5" fill="#F1E2FF" stroke="#5B2A8A" strokeWidth="2.4"/>
        <text x="75" y="64" textAnchor="middle" fontFamily={ARABIC_FONT} fontWeight="700" fontSize="22" fill="#5B2A8A">ت</text>
      </g>
    </svg>
  );
};

export const JawiSyllablesIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFD86B"/><stop offset=".55" stopColor="#FFB300"/><stop offset="1" stopColor="#8C5D00"/></linearGradient>
        <linearGradient id={`${id}-page`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFF6E0"/><stop offset="1" stopColor="#FFEFC2"/></linearGradient>
      </defs>
      <ellipse cx="50" cy="94" rx="32" ry="4" fill="rgba(0,0,0,.22)"/>
      <rect x="8" y="8" width="84" height="84" rx="18" fill={`url(#${id}-bg)`} stroke="#8C5D00" strokeWidth="3"/>
      <rect x="12" y="12" width="76" height="28" rx="14" fill="rgba(255,255,255,.28)"/>
      <path d="M14 44c10-6 24-6 36 0v36c-10-6-26-4-36 0z" fill={`url(#${id}-page)`} stroke="#8C5D00" strokeWidth="2.6" strokeLinejoin="round"/>
      <path d="M86 44c-10-6-24-6-36 0v36c10-6 26-4 36 0z" fill={`url(#${id}-page)`} stroke="#8C5D00" strokeWidth="2.6" strokeLinejoin="round"/>
      <path d="M50 46v34" stroke="#8C5D00" strokeWidth="1.6"/>
      <text x="30" y="68" textAnchor="middle" fontFamily={ARABIC_FONT} fontWeight="700" fontSize="18" fill="#8C5D00">با</text>
      <text x="70" y="68" textAnchor="middle" fontFamily={ARABIC_FONT} fontWeight="700" fontSize="18" fill="#8C5D00">تا</text>
    </svg>
  );
};

export const Jawi100WordsIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FF8FBF"/><stop offset=".55" stopColor="#FF1F7A"/><stop offset="1" stopColor="#8C0438"/></linearGradient>
      </defs>
      <ellipse cx="50" cy="94" rx="32" ry="4" fill="rgba(0,0,0,.22)"/>
      <rect x="8" y="8" width="84" height="84" rx="18" fill={`url(#${id}-bg)`} stroke="#8C0438" strokeWidth="3"/>
      <rect x="12" y="12" width="76" height="28" rx="14" fill="rgba(255,255,255,.28)"/>
      <g transform="rotate(-10 50 60)">
        <rect x="20" y="44" width="44" height="30" rx="5" fill="#FFD6E6" stroke="#8C0438" strokeWidth="2.2"/>
        <text x="42" y="64" textAnchor="middle" fontFamily={ARABIC_FONT} fontWeight="700" fontSize="14" fill="#8C0438">كتاب</text>
      </g>
      <g transform="rotate(-2 50 60)">
        <rect x="24" y="46" width="44" height="30" rx="5" fill="#fff" stroke="#8C0438" strokeWidth="2.2"/>
        <text x="46" y="66" textAnchor="middle" fontFamily={ARABIC_FONT} fontWeight="700" fontSize="14" fill="#8C0438">بومي</text>
      </g>
      <circle cx="74" cy="34" r="16" fill="#FFD60A" stroke="#8C0438" strokeWidth="2.4"/>
      <text x="74" y="39" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="14" fill="#8C0438">100</text>
    </svg>
  );
};

export const JawiSpellingIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7CE3EF"/><stop offset=".55" stopColor="#00B8C9"/><stop offset="1" stopColor="#005B66"/></linearGradient>
      </defs>
      <ellipse cx="50" cy="94" rx="32" ry="4" fill="rgba(0,0,0,.22)"/>
      <rect x="8" y="8" width="84" height="84" rx="18" fill={`url(#${id}-bg)`} stroke="#005B66" strokeWidth="3"/>
      <rect x="12" y="12" width="76" height="28" rx="14" fill="rgba(255,255,255,.28)"/>
      <rect x="16" y="56" width="68" height="28" rx="6" fill="#fff" stroke="#005B66" strokeWidth="2.6"/>
      <g fill="#C7F4F9" stroke="#005B66" strokeWidth="1.6">
        <rect x="20" y="60" width="9" height="9" rx="2"/>
        <rect x="31" y="60" width="9" height="9" rx="2"/>
        <rect x="42" y="60" width="9" height="9" rx="2"/>
        <rect x="53" y="60" width="9" height="9" rx="2"/>
        <rect x="64" y="60" width="9" height="9" rx="2"/>
        <rect x="20" y="71" width="9" height="9" rx="2"/>
        <rect x="31" y="71" width="9" height="9" rx="2"/>
        <rect x="42" y="71" width="20" height="9" rx="2" fill="#fff"/>
        <rect x="64" y="71" width="9" height="9" rx="2"/>
      </g>
      <g>
        <circle cx="30" cy="38" r="10" fill="#FFD60A" stroke="#005B66" strokeWidth="2"/>
        <text x="30" y="44" textAnchor="middle" fontFamily={ARABIC_FONT} fontWeight="700" fontSize="14" fill="#005B66">ب</text>
      </g>
      <g>
        <circle cx="52" cy="32" r="10" fill="#FFD6E6" stroke="#005B66" strokeWidth="2"/>
        <text x="52" y="38" textAnchor="middle" fontFamily={ARABIC_FONT} fontWeight="700" fontSize="14" fill="#005B66">و</text>
      </g>
      <g>
        <circle cx="72" cy="40" r="10" fill="#fff" stroke="#005B66" strokeWidth="2"/>
        <text x="72" y="46" textAnchor="middle" fontFamily={ARABIC_FONT} fontWeight="700" fontSize="14" fill="#005B66">م</text>
      </g>
    </svg>
  );
};

export const JawiShortStoriesIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#EE9EFA"/><stop offset=".55" stopColor="#D946EF"/><stop offset="1" stopColor="#6E1C7C"/></linearGradient>
        <linearGradient id={`${id}-page`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFFFFF"/><stop offset="1" stopColor="#F4D2FB"/></linearGradient>
      </defs>
      <ellipse cx="50" cy="94" rx="32" ry="4" fill="rgba(0,0,0,.22)"/>
      <rect x="8" y="8" width="84" height="84" rx="18" fill={`url(#${id}-bg)`} stroke="#6E1C7C" strokeWidth="3"/>
      <rect x="12" y="12" width="76" height="28" rx="14" fill="rgba(255,255,255,.28)"/>
      <circle cx="78" cy="24" r="7" fill="#FFE066" stroke="#6E1C7C" strokeWidth="1.6"/>
      <path d="M14 44c10-6 24-6 36 0v36c-10-6-26-4-36 0z" fill={`url(#${id}-page)`} stroke="#6E1C7C" strokeWidth="2.6" strokeLinejoin="round"/>
      <path d="M86 44c-10-6-24-6-36 0v36c10-6 26-4 36 0z" fill={`url(#${id}-page)`} stroke="#6E1C7C" strokeWidth="2.6" strokeLinejoin="round"/>
      <path d="M50 46v34" stroke="#6E1C7C" strokeWidth="1.6"/>
      <g stroke="#D946EF" strokeWidth="2" strokeLinecap="round">
        <path d="M20 56h22"/><path d="M20 62h18"/><path d="M20 68h22"/><path d="M20 74h14"/>
        <path d="M58 56h22"/><path d="M58 62h18"/><path d="M58 68h22"/><path d="M58 74h16"/>
      </g>
      <path d="M28 22l2 4 4 1-4 2-2 4-2-4-4-2 4-1z" fill="#fff"/>
    </svg>
  );
};

export const JawiMatchGameIcon = ({ size = 64, className, ...rest }) => {
  const id = cleanId(useId());
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} {...rest}>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFC766"/><stop offset=".55" stopColor="#FF9500"/><stop offset="1" stopColor="#8C4F00"/></linearGradient>
      </defs>
      <ellipse cx="50" cy="94" rx="32" ry="4" fill="rgba(0,0,0,.22)"/>
      <rect x="8" y="8" width="84" height="84" rx="18" fill={`url(#${id}-bg)`} stroke="#8C4F00" strokeWidth="3"/>
      <rect x="12" y="12" width="76" height="28" rx="14" fill="rgba(255,255,255,.28)"/>
      <g transform="rotate(-6 28 60)">
        <rect x="16" y="42" width="26" height="36" rx="5" fill="#fff" stroke="#8C4F00" strokeWidth="2.4"/>
        <text x="29" y="68" textAnchor="middle" fontFamily={ARABIC_FONT} fontWeight="700" fontSize="22" fill="#8C4F00">ب</text>
      </g>
      <g transform="rotate(6 72 60)">
        <rect x="58" y="42" width="26" height="36" rx="5" fill="#FFE1B8" stroke="#8C4F00" strokeWidth="2.4"/>
        <rect x="64" y="54" width="14" height="14" rx="2" fill="#FF9500" stroke="#8C4F00" strokeWidth="1.6"/>
        <path d="M64 58h14" stroke="#8C4F00" strokeWidth="1.4"/>
        <text x="71" y="74" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="6" fill="#8C4F00">BUKU</text>
      </g>
      <g stroke="#FFD60A" strokeWidth="3.4" strokeLinecap="round" fill="none">
        <path d="M40 60q10 -8 20 0"/>
      </g>
      <circle cx="50" cy="56" r="4" fill="#FFD60A" stroke="#8C4F00" strokeWidth="1.6"/>
    </svg>
  );
};
