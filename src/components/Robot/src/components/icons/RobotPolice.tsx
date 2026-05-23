import React from "react";

interface RobotIconProps {
  className?: string;
  size?: number;
}

const RobotPolice: React.FC<RobotIconProps> = ({ className = "", size = 200 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="policeBG" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0066CC" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#0066CC" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="policeBody" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0066CC" />
        <stop offset="100%" stopColor="#004C99" />
      </linearGradient>
      <linearGradient id="policeVisor" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#222" />
        <stop offset="50%" stopColor="#0066CC" />
        <stop offset="100%" stopColor="#222" />
      </linearGradient>
    </defs>

    <circle cx="100" cy="100" r="80" fill="url(#policeBG)" />

    <circle cx="35" cy="50" r="2" fill="#0066CC" opacity="0.8">
      <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="160" cy="40" r="1.5" fill="#FFD700" opacity="0.6">
      <animate attributeName="opacity" values="0.6;0.1;0.6" dur="1.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="155" cy="160" r="2" fill="#FF0000" opacity="0.7">
      <animate attributeName="opacity" values="0.7;0.3;0.7" dur="1.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="30" cy="145" r="1" fill="#0066CC" opacity="0.5">
      <animate attributeName="opacity" values="0.5;0.1;0.5" dur="1.8s" repeatCount="indefinite" />
    </circle>

    {/* Police hat */}
    <path d="M 60 55 L 65 30 L 135 30 L 140 55 Z" fill="#0066CC" stroke="#004C99" strokeWidth="2" />
    <rect x="58" y="52" width="84" height="10" rx="3" fill="#111" />
    <rect x="90" y="35" width="20" height="12" rx="2" fill="#FFD700" />
    <circle cx="100" cy="41" r="4" fill="#111" />
    <path d="M 96 38 Q 100 35 104 38 Q 100 44 96 38" fill="#FFD700" />
    {/* Police badge on hat */}
    <polygon points="100,32 102,37 107,37 103,40 105,45 100,42 95,45 97,40 93,37 98,37" fill="#FFD700" />

    {/* Shield glow */}
    <circle cx="148" cy="145" r="16" fill="#0066CC" opacity="0.2">
      <animate attributeName="r" values="16;20;16" dur="2s" repeatCount="indefinite" />
    </circle>

    {/* Robot body */}
    <rect x="65" y="70" width="70" height="65" rx="15" fill="url(#policeBody)" stroke="#0066CC" strokeWidth="2" />

    {/* Police badge on chest */}
    <path d="M 100 95 L 108 103 L 108 113 L 100 120 L 92 113 L 92 103 Z" fill="#FFD700" stroke="#CCAA00" strokeWidth="1.5" />
    <text x="100" y="113" fontSize="10" fontWeight="bold" fill="#111" textAnchor="middle">★</text>

    {/* Belt */}
    <rect x="65" y="130" width="70" height="8" rx="2" fill="#111" />
    <rect x="92" y="128" width="16" height="12" rx="3" fill="#C0C0C0" stroke="#999" strokeWidth="1" />
    <rect x="94" y="130" width="12" height="8" rx="2" fill="#FFD700" />

    {/* Visor/face */}
    <rect x="75" y="82" width="50" height="25" rx="12" fill="url(#policeVisor)" />

    <circle cx="88" cy="94.5" r="6" fill="#0066CC">
      <animate attributeName="opacity" values="1;0.7;1" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle cx="112" cy="94.5" r="6" fill="#0066CC">
      <animate attributeName="opacity" values="1;0.7;1" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle cx="88" cy="93" r="2.5" fill="#FFFFFF" />
    <circle cx="112" cy="93" r="2.5" fill="#FFFFFF" />

    {/* Police baton in hand */}
    <g transform="translate(38, 108) rotate(-30)">
      <rect x="-3" y="-30" width="6" height="55" rx="3" fill="#111" />
      <rect x="-3" y="-32" width="6" height="6" rx="2" fill="#FFD700" />
      <rect x="-4" y="-20" width="8" height="4" rx="1" fill="#FFD700" />
      <rect x="-4" y="10" width="8" height="4" rx="1" fill="#FFD700" />
    </g>

    {/* Arms */}
    <rect x="48" y="90" width="17" height="38" rx="8.5" fill="url(#policeBody)" stroke="#0066CC" strokeWidth="1.5" />
    <rect x="135" y="90" width="17" height="38" rx="8.5" fill="url(#policeBody)" stroke="#0066CC" strokeWidth="1.5" />
    <circle cx="56.5" cy="128" r="8" fill="#111" />
    <circle cx="143.5" cy="128" r="8" fill="#111" />

    {/* Legs */}
    <rect x="75" y="135" width="18" height="32" rx="9" fill="#111" stroke="#000" strokeWidth="1.5" />
    <rect x="107" y="135" width="18" height="32" rx="9" fill="#111" stroke="#000" strokeWidth="1.5" />

    {/* Boots */}
    <ellipse cx="84" cy="169" rx="14" ry="7" fill="#111" stroke="#000" strokeWidth="2" />
    <ellipse cx="116" cy="169" rx="14" ry="7" fill="#111" stroke="#000" strokeWidth="2" />

    <line x1="100" y1="55" x2="100" y2="40" stroke="#0066CC" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="100" cy="38" r="5" fill="#0066CC">
      <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
    </circle>
  </svg>
);

export default RobotPolice;
