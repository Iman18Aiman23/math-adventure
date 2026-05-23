import React from "react";

interface RobotIconProps {
  className?: string;
  size?: number;
}

const RobotMusician: React.FC<RobotIconProps> = ({ className = "", size = 200 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="musicBG" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#9B59B6" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#9B59B6" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="musicBody" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#BB8FCE" />
        <stop offset="100%" stopColor="#9B59B6" />
      </linearGradient>
      <linearGradient id="musicVisor" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#222" />
        <stop offset="50%" stopColor="#9B59B6" />
        <stop offset="100%" stopColor="#222" />
      </linearGradient>
    </defs>

    <circle cx="100" cy="100" r="80" fill="url(#musicBG)" />

    {/* Musical notes floating */}
    <g opacity="0.7">
      <text x="30" y="50" fontSize="20" fill="#9B59B6">
        ♪
        <animate attributeName="y" values="50;40;50" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2s" repeatCount="indefinite" />
      </text>
      <text x="160" y="45" fontSize="18" fill="#FFD700">
        ♫
        <animate attributeName="y" values="45;35;45" dur="1.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0.2;0.7" dur="1.8s" repeatCount="indefinite" />
      </text>
      <text x="155" y="165" fontSize="22" fill="#9B59B6">
        ♪
        <animate attributeName="y" values="165;155;165" dur="2.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2.2s" repeatCount="indefinite" />
      </text>
      <text x="25" y="155" fontSize="16" fill="#FFD700">
        ♫
        <animate attributeName="y" values="155;145;155" dur="1.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0.1;0.5" dur="1.6s" repeatCount="indefinite" />
      </text>
    </g>

    <circle cx="40" cy="70" r="2" fill="#9B59B6" opacity="0.8">
      <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="160" cy="120" r="1.5" fill="#FFD700" opacity="0.6">
      <animate attributeName="opacity" values="0.6;0.1;0.6" dur="1.5s" repeatCount="indefinite" />
    </circle>

    {/* Musical glow */}
    <circle cx="148" cy="148" r="16" fill="#9B59B6" opacity="0.2">
      <animate attributeName="r" values="16;20;16" dur="2s" repeatCount="indefinite" />
    </circle>

    {/* Headphones */}
    <path d="M 58 75 Q 58 30 100 30 Q 142 30 142 75" fill="none" stroke="#333" strokeWidth="6" strokeLinecap="round" />
    <rect x="52" y="65" width="14" height="22" rx="7" fill="#333" />
    <rect x="134" y="65" width="14" height="22" rx="7" fill="#333" />
    {/* Headphone accent */}
    <rect x="55" y="68" width="8" height="16" rx="4" fill="#9B59B6" />
    <rect x="137" y="68" width="8" height="16" rx="4" fill="#9B59B6" />

    {/* Robot body */}
    <rect x="65" y="72" width="70" height="63" rx="15" fill="url(#musicBody)" stroke="#9B59B6" strokeWidth="2" />

    {/* Music note on chest */}
    <g transform="translate(100, 108) scale(1.3)">
      <rect x="-2" y="-10" width="4" height="18" rx="1" fill="#FFD700" />
      <ellipse cx="-4" cy="10" rx="5" ry="4" fill="#FFD700" />
      <rect x="-2" y="-10" width="12" height="3" rx="1" fill="#FFD700" />
    </g>

    {/* Visor/face */}
    <rect x="75" y="84" width="50" height="25" rx="12" fill="url(#musicVisor)" />

    <circle cx="88" cy="96.5" r="6" fill="#9B59B6">
      <animate attributeName="opacity" values="1;0.7;1" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle cx="112" cy="96.5" r="6" fill="#9B59B6">
      <animate attributeName="opacity" values="1;0.7;1" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle cx="88" cy="95" r="2.5" fill="#FFFFFF" />
    <circle cx="112" cy="95" r="2.5" fill="#FFFFFF" />

    {/* Guitar in hand */}
    <g transform="translate(140, 118) rotate(15)">
      <ellipse cx="0" cy="15" rx="10" ry="14" fill="#8B4513" stroke="#654321" strokeWidth="1.5" />
      <rect x="-2" y="-22" width="4" height="40" rx="2" fill="#8B4513" stroke="#654321" strokeWidth="1" />
      <rect x="-6" y="-26" width="12" height="6" rx="2" fill="#333" />
      {/* Strings */}
      <line x1="-2" y1="-24" x2="-2" y2="28" stroke="#C0C0C0" strokeWidth="0.5" />
      <line x1="0" y1="-24" x2="0" y2="28" stroke="#C0C0C0" strokeWidth="0.5" />
      <line x1="2" y1="-24" x2="2" y2="28" stroke="#C0C0C0" strokeWidth="0.5" />
    </g>

    {/* Arms */}
    <rect x="48" y="92" width="17" height="36" rx="8.5" fill="url(#musicBody)" stroke="#9B59B6" strokeWidth="1.5" />
    <rect x="135" y="92" width="17" height="36" rx="8.5" fill="url(#musicBody)" stroke="#9B59B6" strokeWidth="1.5" />
    <circle cx="56.5" cy="128" r="8" fill="#FFD700" />
    <circle cx="143.5" cy="128" r="8" fill="#FFD700" />

    {/* Legs */}
    <rect x="75" y="135" width="18" height="32" rx="9" fill="url(#musicBody)" stroke="#9B59B6" strokeWidth="1.5" />
    <rect x="107" y="135" width="18" height="32" rx="9" fill="url(#musicBody)" stroke="#9B59B6" strokeWidth="1.5" />

    {/* Feet */}
    <ellipse cx="84" cy="169" rx="14" ry="7" fill="#333" stroke="#222" strokeWidth="2" />
    <ellipse cx="116" cy="169" rx="14" ry="7" fill="#333" stroke="#222" strokeWidth="2" />

    <line x1="100" y1="57" x2="100" y2="42" stroke="#9B59B6" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="100" cy="40" r="5" fill="#9B59B6">
      <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
    </circle>
  </svg>
);

export default RobotMusician;
