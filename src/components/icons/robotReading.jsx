export default function RobotReading({ language = 'bm' }) {
  const label = language === 'bm' ? 'MEMBACA' : 'READING';

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" width="100%" height="100%" style={{ display: 'block' }}>
      <defs>
        <radialGradient id="bodyGrad1" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff"/>
          <stop offset="100%" stopColor="#e8e8e8"/>
        </radialGradient>
        <radialGradient id="screenGrad1" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#2a2a2a"/>
          <stop offset="100%" stopColor="#0a0a0a"/>
        </radialGradient>
        <filter id="shadow1" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.15"/>
        </filter>
        <linearGradient id="abcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B6B"/>
          <stop offset="50%" stopColor="#4ECDC4"/>
          <stop offset="100%" stopColor="#45B7D1"/>
        </linearGradient>
      </defs>

      <circle cx="150" cy="110" r="110" fill="#45B7D1" opacity="0.12" className="rbt4-glow" />

      <ellipse cx="150" cy="370" rx="60" ry="12" fill="#000000" opacity="0.1"/>

      <rect x="100" y="180" width="100" height="120" rx="35" ry="35" fill="url(#bodyGrad1)" filter="url(#shadow1)"/>
      <rect x="100" y="180" width="100" height="120" rx="35" ry="35" fill="none" stroke="#f0f0f0" strokeWidth="2"/>

      <circle cx="150" cy="230" r="28" fill="url(#abcGrad)" filter="url(#shadow1)"/>
      <text x="150" y="238" fontFamily="'Comic Sans MS', 'Arial Rounded MT Bold', Arial, sans-serif" fontSize="22" fontWeight="bold" fill="#ffffff" textAnchor="middle" letterSpacing="-1">ABC</text>

      <ellipse cx="65" cy="200" rx="18" ry="28" fill="url(#bodyGrad1)" transform="rotate(-30 65 200)" filter="url(#shadow1)"/>
      <ellipse cx="65" cy="200" rx="18" ry="28" fill="none" stroke="#f0f0f0" strokeWidth="2" transform="rotate(-30 65 200)"/>

      <ellipse cx="235" cy="220" rx="18" ry="28" fill="url(#bodyGrad1)" transform="rotate(15 235 220)" filter="url(#shadow1)"/>
      <ellipse cx="235" cy="220" rx="18" ry="28" fill="none" stroke="#f0f0f0" strokeWidth="2" transform="rotate(15 235 220)"/>

      <g transform="translate(245, 195) rotate(-10)">
        <rect x="0" y="0" width="40" height="50" rx="3" fill="#FF6B6B" filter="url(#shadow1)"/>
        <rect x="3" y="3" width="34" height="44" rx="2" fill="#ffffff"/>
        <line x1="8" y1="12" x2="32" y2="12" stroke="#FF6B6B" strokeWidth="2"/>
        <line x1="8" y1="20" x2="28" y2="20" stroke="#4ECDC4" strokeWidth="2"/>
        <line x1="8" y1="28" x2="30" y2="28" stroke="#45B7D1" strokeWidth="2"/>
        <text x="20" y="42" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="#FF6B6B" textAnchor="middle">ABC</text>
      </g>

      <rect x="70" y="50" width="160" height="130" rx="45" ry="45" fill="url(#bodyGrad1)" filter="url(#shadow1)"/>
      <rect x="70" y="50" width="160" height="130" rx="45" ry="45" fill="none" stroke="#f0f0f0" strokeWidth="2"/>

      <rect x="85" y="70" width="130" height="90" rx="30" ry="30" fill="url(#screenGrad1)"/>

      <path d="M 115 105 Q 125 95 135 105" fill="none" stroke="#4fc3f7" strokeWidth="4" strokeLinecap="round"/>
      <path d="M 165 105 Q 175 95 185 105" fill="none" stroke="#4fc3f7" strokeWidth="4" strokeLinecap="round"/>

      <path d="M 125 125 Q 150 145 175 125" fill="none" stroke="#4fc3f7" strokeWidth="4" strokeLinecap="round"/>

      <text x="55" y="80" fontFamily="'Comic Sans MS', Arial, sans-serif" fontSize="18" fontWeight="bold" fill="#FF6B6B" opacity="0.8">A</text>
      <text x="230" y="70" fontFamily="'Comic Sans MS', Arial, sans-serif" fontSize="16" fontWeight="bold" fill="#4ECDC4" opacity="0.8">B</text>
      <text x="240" y="110" fontFamily="'Comic Sans MS', Arial, sans-serif" fontSize="14" fontWeight="bold" fill="#45B7D1" opacity="0.7">C</text>

      <g filter="url(#car1Glow)">
        <text x="150" y="330" fontSize="22" fontFamily="'Baloo 2', sans-serif" fontWeight="800" fill="#45B7D1" textAnchor="middle" dominantBaseline="central" stroke="#ffffff" strokeWidth="3" paintOrder="stroke" letterSpacing="3">{label}</text>
      </g>
    </svg>
  );
}
