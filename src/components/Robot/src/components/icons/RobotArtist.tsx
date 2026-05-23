import React from "react";

interface RobotIconProps {
  className?: string;
  size?: number;
}

const RobotArtist: React.FC<RobotIconProps> = ({ className = "", size = 200 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="artBG" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FF007F" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#FF007F" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="artBody" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF6B9D" />
        <stop offset="100%" stopColor="#FF007F" />
      </linearGradient>
      <linearGradient id="artVisor" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#222" />
        <stop offset="50%" stopColor="#FF007F" />
        <stop offset="100%" stopColor="#222" />
      </linearGradient>
      <linearGradient id="paletteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B4513" />
        <stop offset="100%" stopColor="#654321" />
      </linearGradient>
    </defs>

    <circle cx="100" cy="100" r="80" fill="url(#artBG)" />

    <circle cx="35" cy="40" r="2" fill="#FF007F" opacity="0.8">
      <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="160" cy="50" r="1.5" fill="#FFD700" opacity="0.6">
      <animate attributeName="opacity" values="0.6;0.1;0.6" dur="1.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="155" cy="160" r="2" fill="#00D2FF" opacity="0.7">
      <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="30" cy="150" r="1" fill="#FF007F" opacity="0.5">
      <animate attributeName="opacity" values="0.5;0.1;0.5" dur="1.8s" repeatCount="indefinite" />
    </circle>

    {/* Artist beret */}
    <ellipse cx="100" cy="50" rx="35" ry="8" fill="#333" stroke="#222" strokeWidth="1.5" />
    <path d="M 72 50 Q 100 20 128 50" fill="#333" stroke="#222" strokeWidth="1.5" />
    <rect x="98" y="30" width="4" height="8" fill="#333" />

    {/* Paint splatter glow */}
    <circle cx="145" cy="145" r="18" fill="#FF007F" opacity="0.15">
      <animate attributeName="r" values="18;22;18" dur="2s" repeatCount="indefinite" />
    </circle>

    {/* Robot body */}
    <rect x="65" y="70" width="70" height="65" rx="15" fill="url(#artBody)" stroke="#FF007F" strokeWidth="2" />

    {/* Artist palette on chest */}
    <ellipse cx="100" cy="110" rx="22" ry="14" fill="url(#paletteGrad)" stroke="#654321" strokeWidth="1.5" />
    <circle cx="100" cy="110" r="4" fill="#D2B48C" />
    <circle cx="90" cy="106" r="4" fill="#FF0000" />
    <circle cx="110" cy="106" r="4" fill="#00FF00" />
    <circle cx="90" cy="116" r="4" fill="#0000FF" />
    <circle cx="110" cy="116" r="4" fill="#FFD700" />

    {/* Visor/face */}
    <rect x="75" y="82" width="50" height="25" rx="12" fill="url(#artVisor)" />

    <circle cx="88" cy="94.5" r="6" fill="#FF007F">
      <animate attributeName="opacity" values="1;0.7;1" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle cx="112" cy="94.5" r="6" fill="#FF007F">
      <animate attributeName="opacity" values="1;0.7;1" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle cx="88" cy="93" r="2.5" fill="#FFFFFF" />
    <circle cx="112" cy="93" r="2.5" fill="#FFFFFF" />

    {/* Paintbrush in hand */}
    <g transform="translate(38, 112) rotate(-35)">
      <rect x="-2" y="-25" width="4" height="45" rx="2" fill="#8B4513" stroke="#654321" strokeWidth="1" />
      <polygon points="-6,-25 6,-25 4,-35 -4,-35" fill="#C0C0C0" stroke="#999" strokeWidth="1" />
      <polygon points="-4,-35 4,-35 2,-42 -2,-42" fill="#FF007F" />
    </g>

    {/* Arms */}
    <rect x="48" y="90" width="17" height="38" rx="8.5" fill="url(#artBody)" stroke="#FF007F" strokeWidth="1.5" />
    <rect x="135" y="90" width="17" height="38" rx="8.5" fill="url(#artBody)" stroke="#FF007F" strokeWidth="1.5" />
    <circle cx="56.5" cy="128" r="8" fill="#FFD700" />
    <circle cx="143.5" cy="128" r="8" fill="#FFD700" />

    {/* Legs */}
    <rect x="75" y="135" width="18" height="32" rx="9" fill="url(#artBody)" stroke="#FF007F" strokeWidth="1.5" />
    <rect x="107" y="135" width="18" height="32" rx="9" fill="url(#artBody)" stroke="#FF007F" strokeWidth="1.5" />

    {/* Feet */}
    <ellipse cx="84" cy="169" rx="14" ry="7" fill="#333" stroke="#222" strokeWidth="2" />
    <ellipse cx="116" cy="169" rx="14" ry="7" fill="#333" stroke="#222" strokeWidth="2" />

    <line x1="100" y1="55" x2="100" y2="40" stroke="#FF007F" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="100" cy="38" r="5" fill="#FF007F">
      <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
    </circle>
  </svg>
);

export default RobotArtist;
