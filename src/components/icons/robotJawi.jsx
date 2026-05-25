export default function RobotJawi({ language = 'bm' }) {
  const label = 'JAWI';

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" width="100%" height="100%" style={{ display: 'block' }}>
      <defs>
        <radialGradient id="bodyGrad4" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff"/>
          <stop offset="100%" stopColor="#e8e8e8"/>
        </radialGradient>
        <radialGradient id="screenGrad4" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#2a2a2a"/>
          <stop offset="100%" stopColor="#0a0a0a"/>
        </radialGradient>
        <filter id="shadow4" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.15"/>
        </filter>
        <linearGradient id="arabicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#27AE60"/>
          <stop offset="100%" stopColor="#1E8449"/>
        </linearGradient>
      </defs>

      <circle cx="150" cy="110" r="110" fill="#27AE60" opacity="0.12" className="rbt4-glow" />

      <ellipse cx="150" cy="370" rx="60" ry="12" fill="#000000" opacity="0.1"/>

      <rect x="100" y="180" width="100" height="120" rx="35" ry="35" fill="url(#bodyGrad4)" filter="url(#shadow4)"/>
      <rect x="100" y="180" width="100" height="120" rx="35" ry="35" fill="none" stroke="#f0f0f0" strokeWidth="2"/>

      <circle cx="150" cy="230" r="28" fill="url(#arabicGrad)" filter="url(#shadow4)"/>
      <text x="150" y="240" fontFamily="'Arial', 'Tahoma', sans-serif" fontSize="20" fontWeight="bold" fill="#ffffff" textAnchor="middle" dir="rtl">أ ب ت</text>

      <ellipse cx="75" cy="220" rx="18" ry="28" fill="url(#bodyGrad4)" transform="rotate(-15 75 220)" filter="url(#shadow4)"/>
      <ellipse cx="75" cy="220" rx="18" ry="28" fill="none" stroke="#f0f0f0" strokeWidth="2" transform="rotate(-15 75 220)"/>

      <ellipse cx="225" cy="220" rx="18" ry="28" fill="url(#bodyGrad4)" transform="rotate(15 225 220)" filter="url(#shadow4)"/>
      <ellipse cx="225" cy="220" rx="18" ry="28" fill="none" stroke="#f0f0f0" strokeWidth="2" transform="rotate(15 225 220)"/>

      <rect x="70" y="50" width="160" height="130" rx="45" ry="45" fill="url(#bodyGrad4)" filter="url(#shadow4)"/>
      <rect x="70" y="50" width="160" height="130" rx="45" ry="45" fill="none" stroke="#f0f0f0" strokeWidth="2"/>

      <rect x="85" y="70" width="130" height="90" rx="30" ry="30" fill="url(#screenGrad4)"/>

      <text x="120" y="115" fontFamily="'Comic Sans MS', Arial, sans-serif" fontSize="28" fontWeight="bold" fill="#4fc3f7" textAnchor="middle">⭐</text>
      <text x="180" y="115" fontFamily="'Comic Sans MS', Arial, sans-serif" fontSize="28" fontWeight="bold" fill="#4fc3f7" textAnchor="middle">⭐</text>

      <line x1="135" y1="135" x2="165" y2="135" stroke="#4fc3f7" strokeWidth="3" strokeLinecap="round"/>

      <g filter="url(#car1Glow)">
        <text x="150" y="330" fontSize="22" fontFamily="'Baloo 2', sans-serif" fontWeight="800" fill="#27AE60" textAnchor="middle" dominantBaseline="central" stroke="#ffffff" strokeWidth="3" paintOrder="stroke" letterSpacing="3">{label}</text>
      </g>
    </svg>
  );
}
