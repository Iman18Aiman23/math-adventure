import React from "react";

interface RobotIconProps {
  className?: string;
  size?: number;
}

const RobotDoctor: React.FC<RobotIconProps> = ({ className = "", size = 200 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="doctorBG" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FF1A3C" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#FF1A3C" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="doctorBody" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#E8E8E8" />
      </linearGradient>
      <linearGradient id="doctorVisor" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#222" />
        <stop offset="50%" stopColor="#FF1A3C" />
        <stop offset="100%" stopColor="#222" />
      </linearGradient>
      <linearGradient id="stethoscopeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#C0C0C0" />
        <stop offset="100%" stopColor="#808080" />
      </linearGradient>
    </defs>

    {/* Background glow */}
    <circle cx="100" cy="100" r="80" fill="url(#doctorBG)" />

    {/* Stars */}
    <circle cx="30" cy="45" r="2" fill="#FF1A3C" opacity="0.7">
      <animate attributeName="opacity" values="0.7;0.2;0.7" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="165" cy="55" r="1.5" fill="#FF1A3C" opacity="0.5">
      <animate attributeName="opacity" values="0.5;0.1;0.5" dur="1.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="155" cy="155" r="2" fill="#FF1A3C" opacity="0.6">
      <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="40" cy="155" r="1.5" fill="#FF1A3C" opacity="0.8">
      <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.8s" repeatCount="indefinite" />
    </circle>

    {/* Medical cross glow behind */}
    <circle cx="155" cy="45" r="18" fill="#FF1A3C" opacity="0.15">
      <animate attributeName="r" values="18;22;18" dur="2s" repeatCount="indefinite" />
    </circle>

    {/* Robot body */}
    <rect x="65" y="70" width="70" height="65" rx="15" fill="url(#doctorBody)" stroke="#CCCCCC" strokeWidth="2" />

    {/* Doctor coat collar */}
    <polygon points="85,70 100,85 115,70" fill="#FFFFFF" stroke="#CCCCCC" strokeWidth="1.5" />

    {/* Medical cross on chest */}
    <rect x="92" y="105" width="16" height="5" rx="1" fill="#FF1A3C" />
    <rect x="97.5" y="99.5" width="5" height="16" rx="1" fill="#FF1A3C" />

    {/* Visor/face */}
    <rect x="75" y="82" width="50" height="25" rx="12" fill="url(#doctorVisor)" />

    {/* Eyes */}
    <circle cx="88" cy="94.5" r="6" fill="#FF1A3C">
      <animate attributeName="opacity" values="1;0.7;1" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle cx="112" cy="94.5" r="6" fill="#FF1A3C">
      <animate attributeName="opacity" values="1;0.7;1" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle cx="88" cy="93" r="2.5" fill="#FFFFFF" />
    <circle cx="112" cy="93" r="2.5" fill="#FFFFFF" />

    {/* Stethoscope */}
    <path d="M 55 130 C 55 80, 70 75, 85 90" stroke="url(#stethoscopeGrad)" strokeWidth="3" fill="none" strokeLinecap="round" />
    <circle cx="55" cy="132" r="8" fill="#C0C0C0" stroke="#808080" strokeWidth="2" />
    <circle cx="55" cy="132" r="5" fill="#E8E8E8" />
    {/* Ear pieces */}
    <path d="M 55 130 L 48 118" stroke="#C0C0C0" strokeWidth="3" strokeLinecap="round" />
    <path d="M 55 130 L 62 118" stroke="#C0C0C0" strokeWidth="3" strokeLinecap="round" />
    <circle cx="48" cy="117" r="3" fill="#C0C0C0" />
    <circle cx="62" cy="117" r="3" fill="#C0C0C0" />

    {/* Arms */}
    <rect x="48" y="90" width="17" height="38" rx="8.5" fill="url(#doctorBody)" stroke="#CCCCCC" strokeWidth="1.5" />
    <rect x="135" y="90" width="17" height="38" rx="8.5" fill="url(#doctorBody)" stroke="#CCCCCC" strokeWidth="1.5" />
    {/* Hands */}
    <circle cx="56.5" cy="128" r="8" fill="#FF1A3C" />
    <circle cx="143.5" cy="128" r="8" fill="#FF1A3C" />

    {/* Legs */}
    <rect x="75" y="135" width="18" height="32" rx="9" fill="url(#doctorBody)" stroke="#CCCCCC" strokeWidth="1.5" />
    <rect x="107" y="135" width="18" height="32" rx="9" fill="url(#doctorBody)" stroke="#CCCCCC" strokeWidth="1.5" />

    {/* Feet */}
    <ellipse cx="84" cy="169" rx="14" ry="7" fill="#FFFFFF" stroke="#CCCCCC" strokeWidth="2" />
    <ellipse cx="116" cy="169" rx="14" ry="7" fill="#FFFFFF" stroke="#CCCCCC" strokeWidth="2" />

    {/* Antenna */}
    <line x1="100" y1="55" x2="100" y2="40" stroke="#FF1A3C" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="100" cy="38" r="5" fill="#FF1A3C">
      <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
    </circle>
  </svg>
);

export default RobotDoctor;
