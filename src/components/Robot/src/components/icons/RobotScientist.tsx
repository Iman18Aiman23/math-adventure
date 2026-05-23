import React from "react";

interface RobotIconProps {
  className?: string;
  size?: number;
}

const RobotScientist: React.FC<RobotIconProps> = ({ className = "", size = 200 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="sciBG" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#00FF88" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#00FF88" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="sciBody" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4A90E2" />
        <stop offset="100%" stopColor="#2C5F8A" />
      </linearGradient>
      <linearGradient id="sciVisor" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#222" />
        <stop offset="50%" stopColor="#00FF88" />
        <stop offset="100%" stopColor="#222" />
      </linearGradient>
      <linearGradient id="flaskGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#00FF88" />
        <stop offset="100%" stopColor="#00CC6A" />
      </linearGradient>
    </defs>

    <circle cx="100" cy="100" r="80" fill="url(#sciBG)" />

    <circle cx="35" cy="55" r="2" fill="#00FF88" opacity="0.8">
      <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="165" cy="40" r="1.5" fill="#00FF88" opacity="0.6">
      <animate attributeName="opacity" values="0.6;0.1;0.6" dur="1.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="155" cy="160" r="2" fill="#00FF88" opacity="0.7">
      <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="30" cy="145" r="1" fill="#00FF88" opacity="0.5">
      <animate attributeName="opacity" values="0.5;0.1;0.5" dur="1.8s" repeatCount="indefinite" />
    </circle>

    {/* Lab coat */}
    <rect x="60" y="68" width="80" height="67" rx="15" fill="#FFFFFF" stroke="#CCCCCC" strokeWidth="2" />
    <rect x="65" y="68" width="70" height="30" rx="5" fill="#FFFFFF" stroke="#CCCCCC" strokeWidth="1.5" />

    {/* Atom symbol on chest */}
    <g transform="translate(100, 110) scale(0.8)">
      <circle cx="0" cy="0" r="4" fill="#00FF88" />
      <ellipse cx="0" cy="0" rx="25" ry="10" fill="none" stroke="#00FF88" strokeWidth="2" opacity="0.6">
        <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="6s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="0" cy="0" rx="25" ry="10" fill="none" stroke="#00FF88" strokeWidth="2" opacity="0.6">
        <animateTransform attributeName="transform" type="rotate" from="60 0 0" to="420 0 0" dur="6s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="0" cy="0" rx="25" ry="10" fill="none" stroke="#00FF88" strokeWidth="2" opacity="0.6">
        <animateTransform attributeName="transform" type="rotate" from="120 0 0" to="480 0 0" dur="6s" repeatCount="indefinite" />
      </ellipse>
      <circle cx="15" cy="0" r="3" fill="#00FF88">
        <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="4s" repeatCount="indefinite" />
      </circle>
    </g>

    {/* Visor/face */}
    <rect x="75" y="80" width="50" height="25" rx="12" fill="url(#sciVisor)" />

    <circle cx="88" cy="92.5" r="6" fill="#00FF88">
      <animate attributeName="opacity" values="1;0.7;1" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle cx="112" cy="92.5" r="6" fill="#00FF88">
      <animate attributeName="opacity" values="1;0.7;1" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle cx="88" cy="91" r="2.5" fill="#FFFFFF" />
    <circle cx="112" cy="91" r="2.5" fill="#FFFFFF" />

    {/* Flask in hand */}
    <g transform="translate(145, 118)">
      <path d="M -8 0 L -8 12 L -18 32 L 18 32 L 8 12 L 8 0" fill="url(#flaskGrad)" stroke="#00CC6A" strokeWidth="1.5" />
      <rect x="-8" y="-8" width="16" height="12" rx="2" fill="url(#flaskGrad)" stroke="#00CC6A" strokeWidth="1.5" />
      <ellipse cx="0" cy="25" rx="12" ry="5" fill="#00FF88" opacity="0.6">
        <animate attributeName="ry" values="5;7;5" dur="2s" repeatCount="indefinite" />
      </ellipse>
      {/* Bubbles */}
      <circle cx="-5" cy="22" r="2" fill="#00FF88" opacity="0.8">
        <animate attributeName="cy" values="22;12;22" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="4" cy="26" r="1.5" fill="#00FF88" opacity="0.7">
        <animate attributeName="cy" values="26;16;26" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0;0.7" dur="1.5s" repeatCount="indefinite" />
      </circle>
    </g>

    {/* Arms */}
    <rect x="48" y="88" width="17" height="38" rx="8.5" fill="#FFFFFF" stroke="#CCCCCC" strokeWidth="1.5" />
    <rect x="135" y="88" width="17" height="38" rx="8.5" fill="#FFFFFF" stroke="#CCCCCC" strokeWidth="1.5" />
    <circle cx="56.5" cy="126" r="8" fill="#00FF88" />
    <circle cx="143.5" cy="126" r="8" fill="#00FF88" />

    {/* Legs */}
    <rect x="75" y="135" width="18" height="32" rx="9" fill="#4A90E2" stroke="#2C5F8A" strokeWidth="1.5" />
    <rect x="107" y="135" width="18" height="32" rx="9" fill="#4A90E2" stroke="#2C5F8A" strokeWidth="1.5" />

    {/* Feet */}
    <ellipse cx="84" cy="169" rx="14" ry="7" fill="#FFFFFF" stroke="#CCCCCC" strokeWidth="2" />
    <ellipse cx="116" cy="169" rx="14" ry="7" fill="#FFFFFF" stroke="#CCCCCC" strokeWidth="2" />

    <line x1="100" y1="53" x2="100" y2="38" stroke="#00FF88" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="100" cy="36" r="5" fill="#00FF88">
      <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
    </circle>
  </svg>
);

export default RobotScientist;
