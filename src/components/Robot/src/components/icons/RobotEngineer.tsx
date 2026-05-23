import React from "react";

interface RobotIconProps {
  className?: string;
  size?: number;
}

const RobotEngineer: React.FC<RobotIconProps> = ({ className = "", size = 200 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="engBG" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FF8C00" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#FF8C00" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="engBody" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFB347" />
        <stop offset="100%" stopColor="#FF8C00" />
      </linearGradient>
      <linearGradient id="engVisor" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#222" />
        <stop offset="50%" stopColor="#FF8C00" />
        <stop offset="100%" stopColor="#222" />
      </linearGradient>
      <linearGradient id="hardHat" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#FFA500" />
      </linearGradient>
    </defs>

    <circle cx="100" cy="100" r="80" fill="url(#engBG)" />

    <circle cx="35" cy="40" r="2" fill="#FF8C00" opacity="0.8">
      <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="160" cy="35" r="1.5" fill="#FF8C00" opacity="0.6">
      <animate attributeName="opacity" values="0.6;0.1;0.6" dur="1.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="155" cy="160" r="2" fill="#FF8C00" opacity="0.7">
      <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="30" cy="145" r="1" fill="#FF8C00" opacity="0.5">
      <animate attributeName="opacity" values="0.5;0.1;0.5" dur="1.8s" repeatCount="indefinite" />
    </circle>

    {/* Hard hat */}
    <ellipse cx="100" cy="52" rx="38" ry="10" fill="url(#hardHat)" stroke="#FFA500" strokeWidth="1.5" />
    <path d="M 68 52 L 68 40 Q 100 25 132 40 L 132 52" fill="url(#hardHat)" stroke="#FFA500" strokeWidth="1.5" />
    <rect x="75" y="52" width="50" height="6" rx="3" fill="#FFA500" />

    {/* Wrench symbol glow */}
    <circle cx="150" cy="150" r="15" fill="#FF8C00" opacity="0.15">
      <animate attributeName="r" values="15;18;15" dur="2s" repeatCount="indefinite" />
    </circle>

    {/* Robot body */}
    <rect x="65" y="70" width="70" height="65" rx="15" fill="url(#engBody)" stroke="#FF8C00" strokeWidth="2" />

    {/* Gear symbol on chest */}
    <g transform="translate(100, 112) scale(0.6)">
      <circle cx="0" cy="0" r="14" fill="none" stroke="#333" strokeWidth="3" />
      <circle cx="0" cy="0" r="8" fill="none" stroke="#333" strokeWidth="2" />
      <circle cx="0" cy="0" r="3" fill="#333" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = Math.cos(rad) * 10;
        const y1 = Math.sin(rad) * 10;
        const x2 = Math.cos(rad) * 18;
        const y2 = Math.sin(rad) * 18;
        return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#333" strokeWidth="3" strokeLinecap="round" />;
      })}
      <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="8s" repeatCount="indefinite" additive="sum" />
    </g>

    {/* Visor/face */}
    <rect x="75" y="82" width="50" height="25" rx="12" fill="url(#engVisor)" />

    <circle cx="88" cy="94.5" r="6" fill="#FF8C00">
      <animate attributeName="opacity" values="1;0.7;1" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle cx="112" cy="94.5" r="6" fill="#FF8C00">
      <animate attributeName="opacity" values="1;0.7;1" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle cx="88" cy="93" r="2.5" fill="#FFFFFF" />
    <circle cx="112" cy="93" r="2.5" fill="#FFFFFF" />

    {/* Wrench in hand */}
    <g transform="translate(38, 115) rotate(-30)">
      <rect x="-3" y="-20" width="6" height="40" rx="3" fill="#C0C0C0" stroke="#808080" strokeWidth="1" />
      <circle cx="0" cy="-20" r="7" fill="#C0C0C0" stroke="#808080" strokeWidth="1.5" />
      <circle cx="0" cy="-20" r="3" fill="#666" />
      <rect x="-6" y="18" width="12" height="8" rx="2" fill="#C0C0C0" stroke="#808080" strokeWidth="1" />
    </g>

    {/* Arms */}
    <rect x="48" y="90" width="17" height="38" rx="8.5" fill="url(#engBody)" stroke="#FF8C00" strokeWidth="1.5" />
    <rect x="135" y="90" width="17" height="38" rx="8.5" fill="url(#engBody)" stroke="#FF8C00" strokeWidth="1.5" />
    <circle cx="56.5" cy="128" r="8" fill="#FFD700" />
    <circle cx="143.5" cy="128" r="8" fill="#FFD700" />

    {/* Legs */}
    <rect x="75" y="135" width="18" height="32" rx="9" fill="url(#engBody)" stroke="#FF8C00" strokeWidth="1.5" />
    <rect x="107" y="135" width="18" height="32" rx="9" fill="url(#engBody)" stroke="#FF8C00" strokeWidth="1.5" />

    {/* Feet */}
    <ellipse cx="84" cy="169" rx="14" ry="7" fill="#FFD700" stroke="#FFA500" strokeWidth="2" />
    <ellipse cx="116" cy="169" rx="14" ry="7" fill="#FFD700" stroke="#FFA500" strokeWidth="2" />

    <line x1="100" y1="55" x2="100" y2="40" stroke="#FF8C00" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="100" cy="38" r="5" fill="#FF8C00">
      <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
    </circle>
  </svg>
);

export default RobotEngineer;
