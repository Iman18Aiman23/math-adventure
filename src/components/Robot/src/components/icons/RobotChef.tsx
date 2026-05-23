import React from "react";

interface RobotIconProps {
  className?: string;
  size?: number;
}

const RobotChef: React.FC<RobotIconProps> = ({ className = "", size = 200 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="chefBG" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FF5E00" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#FF5E00" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="chefBody" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#F0F0F0" />
      </linearGradient>
      <linearGradient id="chefVisor" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#222" />
        <stop offset="50%" stopColor="#FF5E00" />
        <stop offset="100%" stopColor="#222" />
      </linearGradient>
    </defs>

    <circle cx="100" cy="100" r="80" fill="url(#chefBG)" />

    <circle cx="40" cy="45" r="2" fill="#FF5E00" opacity="0.8">
      <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="160" cy="35" r="1.5" fill="#FF5E00" opacity="0.6">
      <animate attributeName="opacity" values="0.6;0.1;0.6" dur="1.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="155" cy="160" r="2" fill="#FF5E00" opacity="0.7">
      <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="35" cy="150" r="1" fill="#FF5E00" opacity="0.5">
      <animate attributeName="opacity" values="0.5;0.1;0.5" dur="1.8s" repeatCount="indefinite" />
    </circle>

    {/* Chef hat */}
    <rect x="72" y="42" width="56" height="6" rx="3" fill="#FFFFFF" stroke="#CCCCCC" strokeWidth="1.5" />
    <path d="M 75 42 L 75 22 Q 75 8 90 15 Q 100 5 110 15 Q 125 8 125 22 L 125 42" fill="#FFFFFF" stroke="#CCCCCC" strokeWidth="1.5" />
    <path d="M 85 22 Q 90 12 100 18 Q 110 12 115 22" fill="none" stroke="#CCCCCC" strokeWidth="1" opacity="0.5" />

    {/* Steam glow */}
    <circle cx="145" cy="140" r="15" fill="#FF5E00" opacity="0.15">
      <animate attributeName="r" values="15;20;15" dur="2s" repeatCount="indefinite" />
    </circle>

    {/* Robot body */}
    <rect x="65" y="68" width="70" height="67" rx="15" fill="url(#chefBody)" stroke="#CCCCCC" strokeWidth="2" />

    {/* Apron */}
    <rect x="72" y="95" width="56" height="40" rx="8" fill="#FF5E00" />
    <rect x="72" y="95" width="56" height="8" rx="4" fill="#E55200" />
    {/* Apron strings */}
    <path d="M 75 95 L 70 85" stroke="#FF5E00" strokeWidth="2" strokeLinecap="round" />
    <path d="M 125 95 L 130 85" stroke="#FF5E00" strokeWidth="2" strokeLinecap="round" />
    {/* Apron pocket */}
    <rect x="88" y="115" width="24" height="14" rx="4" fill="#E55200" />
    <rect x="90" y="117" width="6" height="6" rx="1" fill="#FFD700" />
    <rect x="104" y="117" width="6" height="6" rx="1" fill="#FFD700" />

    {/* Visor/face */}
    <rect x="75" y="80" width="50" height="25" rx="12" fill="url(#chefVisor)" />

    <circle cx="88" cy="92.5" r="6" fill="#FF5E00">
      <animate attributeName="opacity" values="1;0.7;1" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle cx="112" cy="92.5" r="6" fill="#FF5E00">
      <animate attributeName="opacity" values="1;0.7;1" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle cx="88" cy="91" r="2.5" fill="#FFFFFF" />
    <circle cx="112" cy="91" r="2.5" fill="#FFFFFF" />

    {/* Spoon in hand */}
    <g transform="translate(38, 110) rotate(-25)">
      <rect x="-2" y="-28" width="4" height="40" rx="2" fill="#C0C0C0" stroke="#999" strokeWidth="1" />
      <ellipse cx="0" cy="-32" rx="8" ry="6" fill="#C0C0C0" stroke="#999" strokeWidth="1" />
    </g>

    {/* Steam lines */}
    <path d="M 140 120 Q 135 110 140 100" stroke="#FF5E00" strokeWidth="2" strokeLinecap="round" opacity="0.5">
      <animate attributeName="d" values="M 140 120 Q 135 110 140 100;M 140 115 Q 145 105 140 95;M 140 120 Q 135 110 140 100" dur="3s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3s" repeatCount="indefinite" />
    </path>
    <path d="M 150 125 Q 145 115 150 105" stroke="#FF5E00" strokeWidth="2" strokeLinecap="round" opacity="0.4">
      <animate attributeName="d" values="M 150 125 Q 145 115 150 105;M 150 120 Q 155 110 150 100;M 150 125 Q 145 115 150 105" dur="2.5s" repeatCount="indefinite" />
    </path>

    {/* Arms */}
    <rect x="48" y="88" width="17" height="38" rx="8.5" fill="url(#chefBody)" stroke="#CCCCCC" strokeWidth="1.5" />
    <rect x="135" y="88" width="17" height="38" rx="8.5" fill="url(#chefBody)" stroke="#CCCCCC" strokeWidth="1.5" />
    <circle cx="56.5" cy="126" r="8" fill="#FF5E00" />
    <circle cx="143.5" cy="126" r="8" fill="#FF5E00" />

    {/* Legs */}
    <rect x="75" y="135" width="18" height="32" rx="9" fill="#333" stroke="#222" strokeWidth="1.5" />
    <rect x="107" y="135" width="18" height="32" rx="9" fill="#333" stroke="#222" strokeWidth="1.5" />

    {/* Feet */}
    <ellipse cx="84" cy="169" rx="14" ry="7" fill="#333" stroke="#222" strokeWidth="2" />
    <ellipse cx="116" cy="169" rx="14" ry="7" fill="#333" stroke="#222" strokeWidth="2" />

    <line x1="100" y1="53" x2="100" y2="38" stroke="#FF5E00" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="100" cy="36" r="5" fill="#FF5E00">
      <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
    </circle>
  </svg>
);

export default RobotChef;
