import React from "react";

interface RobotIconProps {
  className?: string;
  size?: number;
}

const RobotAstronaut: React.FC<RobotIconProps> = ({ className = "", size = 200 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="astroBG" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#00D2FF" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#00D2FF" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="astroBody" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E8E8E8" />
        <stop offset="100%" stopColor="#C0C0C0" />
      </linearGradient>
      <linearGradient id="astroVisor" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#111" />
        <stop offset="50%" stopColor="#00D2FF" />
        <stop offset="100%" stopColor="#111" />
      </linearGradient>
      <linearGradient id="helmetGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#F0F0F0" />
        <stop offset="100%" stopColor="#C0C0C0" />
      </linearGradient>
    </defs>

    <circle cx="100" cy="100" r="80" fill="url(#astroBG)" />

    {/* Planet in background */}
    <circle cx="40" cy="55" r="20" fill="#8B5CF6" opacity="0.2" />
    <ellipse cx="40" cy="55" rx="20" ry="5" fill="none" stroke="#A78BFA" strokeWidth="1" opacity="0.4" transform="rotate(-20 40 55)" />

    {/* Stars */}
    <circle cx="160" cy="40" r="2" fill="#00D2FF" opacity="0.8">
      <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="155" cy="160" r="1.5" fill="#00D2FF" opacity="0.6">
      <animate attributeName="opacity" values="0.6;0.1;0.6" dur="1.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="30" cy="140" r="2" fill="#00D2FF" opacity="0.7">
      <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="165" cy="130" r="1" fill="#00D2FF" opacity="0.5">
      <animate attributeName="opacity" values="0.5;0.1;0.5" dur="1.8s" repeatCount="indefinite" />
    </circle>

    {/* Rocket glow */}
    <circle cx="148" cy="148" r="15" fill="#00D2FF" opacity="0.15">
      <animate attributeName="r" values="15;20;15" dur="2s" repeatCount="indefinite" />
    </circle>

    {/* Space helmet */}
    <ellipse cx="100" cy="55" rx="42" ry="38" fill="url(#helmetGrad)" stroke="#999" strokeWidth="2" />
    <ellipse cx="100" cy="55" rx="42" ry="10" fill="#F8F8F8" stroke="#999" strokeWidth="1" opacity="0.5" />

    {/* Helmet visor */}
    <rect x="70" y="45" width="60" height="35" rx="17" fill="url(#astroVisor)" />

    {/* Eyes inside visor */}
    <circle cx="88" cy="62.5" r="7" fill="#00D2FF">
      <animate attributeName="opacity" values="1;0.7;1" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle cx="112" cy="62.5" r="7" fill="#00D2FF">
      <animate attributeName="opacity" values="1;0.7;1" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle cx="88" cy="61" r="3" fill="#FFFFFF" />
    <circle cx="112" cy="61" r="3" fill="#FFFFFF" />

    {/* Helmet antenna */}
    <line x1="100" y1="17" x2="100" y2="5" stroke="#999" strokeWidth="2" />
    <circle cx="100" cy="3" r="4" fill="#00D2FF">
      <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
    </circle>

    {/* Robot body - spacesuit */}
    <rect x="65" y="88" width="70" height="55" rx="15" fill="url(#astroBody)" stroke="#999" strokeWidth="2" />

    {/* NASA-style patch */}
    <circle cx="100" cy="115" r="12" fill="#FF0000" stroke="#CC0000" strokeWidth="1.5" />
    <polygon points="100,107 102,112 108,112 103,116 105,122 100,118 95,122 97,116 92,112 98,112" fill="#FFD700" />

    {/* Suit details */}
    <rect x="85" y="95" width="30" height="8" rx="4" fill="#999" opacity="0.5" />

    {/* Backpack / oxygen tank */}
    <rect x="52" y="82" width="12" height="50" rx="6" fill="#C0C0C0" stroke="#999" strokeWidth="1.5" />
    <rect x="136" y="82" width="12" height="50" rx="6" fill="#C0C0C0" stroke="#999" strokeWidth="1.5" />

    {/* Arms */}
    <rect x="48" y="95" width="17" height="35" rx="8.5" fill="url(#astroBody)" stroke="#999" strokeWidth="1.5" />
    <rect x="135" y="95" width="17" height="35" rx="8.5" fill="url(#astroBody)" stroke="#999" strokeWidth="1.5" />
    <circle cx="56.5" cy="130" r="8" fill="#00D2FF" />
    <circle cx="143.5" cy="130" r="8" fill="#00D2FF" />

    {/* Legs */}
    <rect x="75" y="143" width="18" height="28" rx="9" fill="url(#astroBody)" stroke="#999" strokeWidth="1.5" />
    <rect x="107" y="143" width="18" height="28" rx="9" fill="url(#astroBody)" stroke="#999" strokeWidth="1.5" />

    {/* Boots */}
    <ellipse cx="84" cy="172" rx="15" ry="8" fill="#00D2FF" stroke="#0099CC" strokeWidth="2" />
    <ellipse cx="116" cy="172" rx="15" ry="8" fill="#00D2FF" stroke="#0099CC" strokeWidth="2" />
  </svg>
);

export default RobotAstronaut;
