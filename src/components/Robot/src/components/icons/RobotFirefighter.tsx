import React from "react";

interface RobotIconProps {
  className?: string;
  size?: number;
}

const RobotFirefighter: React.FC<RobotIconProps> = ({ className = "", size = 200 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="fireBG" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FF3300" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#FF3300" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="fireBody" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#CC0000" />
        <stop offset="100%" stopColor="#990000" />
      </linearGradient>
      <linearGradient id="fireVisor" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#222" />
        <stop offset="50%" stopColor="#FF3300" />
        <stop offset="100%" stopColor="#222" />
      </linearGradient>
      <linearGradient id="helmetGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#CC0000" />
      </linearGradient>
    </defs>

    <circle cx="100" cy="100" r="80" fill="url(#fireBG)" />

    <circle cx="35" cy="40" r="2" fill="#FF3300" opacity="0.8">
      <animate attributeName="opacity" values="0.8;0.2;0.8" dur="1.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="160" cy="55" r="1.5" fill="#FFD700" opacity="0.6">
      <animate attributeName="opacity" values="0.6;0.1;0.6" dur="1.2s" repeatCount="indefinite" />
    </circle>
    <circle cx="150" cy="155" r="2" fill="#FF3300" opacity="0.7">
      <animate attributeName="opacity" values="0.7;0.3;0.7" dur="1.8s" repeatCount="indefinite" />
    </circle>
    <circle cx="30" cy="140" r="1.5" fill="#FFD700" opacity="0.5">
      <animate attributeName="opacity" values="0.5;0.1;0.5" dur="1.5s" repeatCount="indefinite" />
    </circle>

    {/* Firefighter helmet */}
    <path d="M 55 60 Q 55 22 100 22 Q 145 22 145 60" fill="#CC0000" stroke="#990000" strokeWidth="2" />
    <path d="M 48 55 Q 100 40 152 55 Q 155 60 150 65 Q 100 55 50 65 Q 45 60 48 55" fill="#CC0000" stroke="#990000" strokeWidth="2" />
    {/* Helmet badge */}
    <rect x="92" y="35" width="16" height="14" rx="3" fill="#FFD700" />
    <polygon points="100,38 102,43 107,43 103,46 105,51 100,48 95,51 97,46 93,43 98,43" fill="#CC0000" />
    {/* Helmet crest */}
    <path d="M 95 22 Q 100 8 105 22" fill="#CC0000" stroke="#990000" strokeWidth="1.5" />

    {/* Hose glow */}
    <circle cx="145" cy="145" r="15" fill="#FF3300" opacity="0.2">
      <animate attributeName="r" values="15;20;15" dur="2s" repeatCount="indefinite" />
    </circle>

    {/* Robot body */}
    <rect x="65" y="70" width="70" height="65" rx="15" fill="url(#fireBody)" stroke="#CC0000" strokeWidth="2" />

    {/* Reflective stripes */}
    <rect x="65" y="90" width="70" height="6" rx="3" fill="#FFD700" opacity="0.8" />
    <rect x="65" y="118" width="70" height="6" rx="3" fill="#FFD700" opacity="0.8" />

    {/* Fire badge */}
    <circle cx="100" cy="108" r="8" fill="#FFD700" />
    <text x="100" y="113" fontSize="12" fontWeight="bold" fill="#CC0000" textAnchor="middle">F</text>

    {/* Visor/face */}
    <rect x="75" y="82" width="50" height="25" rx="12" fill="url(#fireVisor)" />

    <circle cx="88" cy="94.5" r="6" fill="#FF3300">
      <animate attributeName="opacity" values="1;0.7;1" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle cx="112" cy="94.5" r="6" fill="#FF3300">
      <animate attributeName="opacity" values="1;0.7;1" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle cx="88" cy="93" r="2.5" fill="#FFFFFF" />
    <circle cx="112" cy="93" r="2.5" fill="#FFFFFF" />

    {/* Fire hose in hand */}
    <g transform="translate(38, 112)">
      <rect x="-4" y="-18" width="8" height="36" rx="4" fill="#FFD700" stroke="#CCAA00" strokeWidth="1" />
      <rect x="-5" y="-22" width="10" height="8" rx="3" fill="#C0C0C0" stroke="#999" strokeWidth="1" />
      {/* Hose end */}
      <ellipse cx="0" cy="20" rx="6" ry="3" fill="#333" />
      {/* Water drops */}
      <circle cx="5" cy="28" r="2" fill="#00D2FF" opacity="0.7">
        <animate attributeName="cy" values="28;38;28" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0;0.7" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="-3" cy="26" r="1.5" fill="#00D2FF" opacity="0.5">
        <animate attributeName="cy" values="26;36;26" dur="1.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0;0.5" dur="1.2s" repeatCount="indefinite" />
      </circle>
    </g>

    {/* Arms */}
    <rect x="48" y="90" width="17" height="38" rx="8.5" fill="url(#fireBody)" stroke="#CC0000" strokeWidth="1.5" />
    <rect x="135" y="90" width="17" height="38" rx="8.5" fill="url(#fireBody)" stroke="#CC0000" strokeWidth="1.5" />
    <circle cx="56.5" cy="128" r="8" fill="#FFD700" />
    <circle cx="143.5" cy="128" r="8" fill="#FFD700" />

    {/* Legs */}
    <rect x="75" y="135" width="18" height="32" rx="9" fill="#111" stroke="#000" strokeWidth="1.5" />
    <rect x="107" y="135" width="18" height="32" rx="9" fill="#111" stroke="#000" strokeWidth="1.5" />

    {/* Boots */}
    <ellipse cx="84" cy="169" rx="14" ry="7" fill="#FFD700" stroke="#CCAA00" strokeWidth="2" />
    <ellipse cx="116" cy="169" rx="14" ry="7" fill="#FFD700" stroke="#CCAA00" strokeWidth="2" />

    <line x1="100" y1="55" x2="100" y2="40" stroke="#FF3300" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="100" cy="38" r="5" fill="#FF3300">
      <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
    </circle>
  </svg>
);

export default RobotFirefighter;
