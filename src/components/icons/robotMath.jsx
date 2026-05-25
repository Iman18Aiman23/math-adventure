export default function RobotMath({ language = 'bm' }) {
  const label = language === 'bm' ? 'MATEMATIK' : 'MATH';

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" width="100%" height="100%" style={{ display: 'block' }}>
      <defs>
        <radialGradient id="bodyGrad3" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff"/>
          <stop offset="100%" stopColor="#e8e8e8"/>
        </radialGradient>
        <radialGradient id="screenGrad3" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#2a2a2a"/>
          <stop offset="100%" stopColor="#0a0a0a"/>
        </radialGradient>
        <filter id="shadow3" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.15"/>
        </filter>
        <linearGradient id="mathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F39C12"/>
          <stop offset="100%" stopColor="#E67E22"/>
        </linearGradient>
      </defs>

      <circle cx="150" cy="110" r="110" fill="#E67E22" opacity="0.12" className="rbt4-glow" />

      <ellipse cx="150" cy="370" rx="60" ry="12" fill="#000000" opacity="0.1"/>

      <rect x="100" y="180" width="100" height="120" rx="35" ry="35" fill="url(#bodyGrad3)" filter="url(#shadow3)"/>
      <rect x="100" y="180" width="100" height="120" rx="35" ry="35" fill="none" stroke="#f0f0f0" strokeWidth="2"/>

      <circle cx="150" cy="230" r="28" fill="url(#mathGrad)" filter="url(#shadow3)"/>
      <text x="150" y="238" fontFamily="'Comic Sans MS', 'Arial Rounded MT Bold', Arial, sans-serif" fontSize="20" fontWeight="bold" fill="#ffffff" textAnchor="middle">123</text>

      <ellipse cx="60" cy="170" rx="18" ry="28" fill="url(#bodyGrad3)" transform="rotate(-50 60 170)" filter="url(#shadow3)"/>
      <ellipse cx="60" cy="170" rx="18" ry="28" fill="none" stroke="#f0f0f0" strokeWidth="2" transform="rotate(-50 60 170)"/>
      <ellipse cx="240" cy="170" rx="18" ry="28" fill="url(#bodyGrad3)" transform="rotate(50 240 170)" filter="url(#shadow3)"/>
      <ellipse cx="240" cy="170" rx="18" ry="28" fill="none" stroke="#f0f0f0" strokeWidth="2" transform="rotate(50 240 170)"/>

      <text x="25" y="140" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" fill="#F39C12" opacity="0.9">+</text>
      <text x="250" y="135" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" fill="#E67E22" opacity="0.9">=</text>

      <rect x="70" y="50" width="160" height="130" rx="45" ry="45" fill="url(#bodyGrad3)" filter="url(#shadow3)"/>
      <rect x="70" y="50" width="160" height="130" rx="45" ry="45" fill="none" stroke="#f0f0f0" strokeWidth="2"/>

      <rect x="85" y="70" width="130" height="90" rx="30" ry="30" fill="url(#screenGrad3)"/>

      <polygon points="125,95 128,103 136,103 130,108 132,116 125,111 118,116 120,108 114,103 122,103" fill="#ffd700"/>
      <polygon points="175,95 178,103 186,103 180,108 182,116 175,111 168,116 170,108 164,103 172,103" fill="#ffd700"/>

      <path d="M 120 125 Q 150 150 180 125" fill="none" stroke="#ff6b6b" strokeWidth="4" strokeLinecap="round"/>
      <path d="M 125 128 Q 150 145 175 128" fill="#ff6b6b" opacity="0.3"/>

      <g filter="url(#car1Glow)">
        <text x="150" y="330" fontSize="22" fontFamily="'Baloo 2', sans-serif" fontWeight="800" fill="#E67E22" textAnchor="middle" dominantBaseline="central" stroke="#ffffff" strokeWidth="3" paintOrder="stroke" letterSpacing="3">{label}</text>
      </g>
    </svg>
  );
}
