import React from "react";

interface RobotIconProps {
  className?: string;
  size?: number;
}

const RobotTeacher: React.FC<RobotIconProps> = ({ className = "", size = 200 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <radialGradient id="teacherBG" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFD700" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="teacherBody" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#FFA500" />
      </linearGradient>
      <linearGradient id="teacherGradCap" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#4A90E2" />
        <stop offset="100%" stopColor="#2C5F8A" />
      </linearGradient>
      <radialGradient id="teacherGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFD700" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="teacherVisor" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#222" />
        <stop offset="50%" stopColor="#00E5FF" />
        <stop offset="100%" stopColor="#222" />
      </linearGradient>
    </defs>

    {/* Background glow */}
    <circle cx="100" cy="100" r="80" fill="url(#teacherBG)" />

    {/* Stars around */}
    <circle cx="40" cy="50" r="2" fill="#FFD700" opacity="0.8">
      <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="160" cy="40" r="1.5" fill="#FFD700" opacity="0.6">
      <animate attributeName="opacity" values="0.6;0.1;0.6" dur="1.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="150" cy="160" r="2" fill="#FFD700" opacity="0.7">
      <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="35" cy="140" r="1" fill="#FFD700" opacity="0.5">
      <animate attributeName="opacity" values="0.5;0.1;0.5" dur="1.8s" repeatCount="indefinite" />
    </circle>

    {/* Graduation cap */}
    <rect x="70" y="55" width="60" height="10" rx="2" fill="url(#teacherGradCap)" />
    <polygon points="100,25 130,55 70,55" fill="url(#teacherGradCap)" />
    <rect x="98" y="20" width="4" height="15" fill="#4A90E2" />
    <circle cx="100" cy="18" r="4" fill="#FFD700">
      <animate attributeName="r" values="4;5;4" dur="2s" repeatCount="indefinite" />
    </circle>

    {/* Robot body */}
    <rect x="65" y="75" width="70" height="60" rx="15" fill="url(#teacherBody)" stroke="#FFA500" strokeWidth="2" />
    
    {/* Visor/face */}
    <rect x="75" y="85" width="50" height="25" rx="12" fill="url(#teacherVisor)" />
    
    {/* Eyes */}
    <circle cx="88" cy="97.5" r="6" fill="#FFD700">
      <animate attributeName="opacity" values="1;0.7;1" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle cx="112" cy="97.5" r="6" fill="#FFD700">
      <animate attributeName="opacity" values="1;0.7;1" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle cx="88" cy="96" r="2.5" fill="#FFFFFF" />
    <circle cx="112" cy="96" r="2.5" fill="#FFFFFF" />

    {/* Book in hands */}
    <rect x="55" y="135" width="90" height="20" rx="4" fill="#4A90E2" stroke="#2C5F8A" strokeWidth="2" />
    <rect x="60" y="138" width="80" height="14" rx="2" fill="#6BB3FF" />
    <line x1="100" y1="138" x2="100" y2="152" stroke="#2C5F8A" strokeWidth="2" />
    <rect x="65" y="142" width="30" height="4" rx="2" fill="#FFFFFF" opacity="0.6" />
    <rect x="105" y="142" width="25" height="4" rx="2" fill="#FFFFFF" opacity="0.6" />

    {/* Arms */}
    <rect x="50" y="90" width="15" height="40" rx="7.5" fill="url(#teacherBody)" stroke="#FFA500" strokeWidth="1.5" />
    <rect x="135" y="90" width="15" height="40" rx="7.5" fill="url(#teacherBody)" stroke="#FFA500" strokeWidth="1.5" />
    <circle cx="57.5" cy="130" r="7" fill="#FFD700" />
    <circle cx="142.5" cy="130" r="7" fill="#FFD700" />

    {/* Legs */}
    <rect x="75" y="135" width="18" height="35" rx="9" fill="url(#teacherBody)" stroke="#FFA500" strokeWidth="1.5" />
    <rect x="107" y="135" width="18" height="35" rx="9" fill="url(#teacherBody)" stroke="#FFA500" strokeWidth="1.5" />

    {/* Feet */}
    <ellipse cx="84" cy="172" rx="14" ry="7" fill="#4A90E2" stroke="#2C5F8A" strokeWidth="2" />
    <ellipse cx="116" cy="172" rx="14" ry="7" fill="#4A90E2" stroke="#2C5F8A" strokeWidth="2" />

    {/* Antenna */}
    <line x1="100" y1="55" x2="100" y2="40" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="100" cy="38" r="5" fill="#FFD700">
      <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
    </circle>
  </svg>
);

export default RobotTeacher;
