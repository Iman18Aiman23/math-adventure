export default function RobotSpeaking({ language = 'bm' }) {
  const label = language === 'bm' ? 'BERCAKAP' : 'SPEAKING';

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" width="100%" height="100%" style={{ display: 'block' }}>
      <defs>
        <radialGradient id="bodyGrad2" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff"/>
          <stop offset="100%" stopColor="#e8e8e8"/>
        </radialGradient>
        <radialGradient id="screenGrad2" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#2a2a2a"/>
          <stop offset="100%" stopColor="#0a0a0a"/>
        </radialGradient>
        <filter id="shadow2" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.15"/>
        </filter>
        <linearGradient id="voiceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9B59B6"/>
          <stop offset="100%" stopColor="#8E44AD"/>
        </linearGradient>
      </defs>

      <circle cx="150" cy="110" r="110" fill="#8E44AD" opacity="0.12" className="rbt4-glow" />

      <ellipse cx="150" cy="370" rx="60" ry="12" fill="#000000" opacity="0.1"/>

      <rect x="100" y="180" width="100" height="120" rx="35" ry="35" fill="url(#bodyGrad2)" filter="url(#shadow2)"/>
      <rect x="100" y="180" width="100" height="120" rx="35" ry="35" fill="none" stroke="#f0f0f0" strokeWidth="2"/>

      <circle cx="150" cy="230" r="28" fill="url(#voiceGrad)" filter="url(#shadow2)"/>
      <rect x="142" y="218" width="16" height="20" rx="8" fill="#ffffff"/>
      <path d="M 138 228 Q 138 242 150 242 Q 162 242 162 228" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="150" y1="242" x2="150" y2="248" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="144" y1="248" x2="156" y2="248" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round"/>

      <ellipse cx="70" cy="220" rx="18" ry="28" fill="url(#bodyGrad2)" transform="rotate(-15 70 220)" filter="url(#shadow2)"/>
      <ellipse cx="70" cy="220" rx="18" ry="28" fill="none" stroke="#f0f0f0" strokeWidth="2" transform="rotate(-15 70 220)"/>

      <ellipse cx="230" cy="220" rx="18" ry="28" fill="url(#bodyGrad2)" transform="rotate(15 230 220)" filter="url(#shadow2)"/>
      <ellipse cx="230" cy="220" rx="18" ry="28" fill="none" stroke="#f0f0f0" strokeWidth="2" transform="rotate(15 230 220)"/>

      <g transform="translate(240, 185) rotate(-15)">
        <path d="M 0 10 L 25 0 L 25 30 L 0 20 Z" fill="#9B59B6" filter="url(#shadow2)"/>
        <rect x="-5" y="12" width="8" height="16" rx="3" fill="#8E44AD"/>
        <path d="M 28 5 Q 35 15 28 25" fill="none" stroke="#9B59B6" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 33 0 Q 42 15 33 30" fill="none" stroke="#9B59B6" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
        <path d="M 38 -5 Q 50 15 38 35" fill="none" stroke="#9B59B6" strokeWidth="2" strokeLinecap="round" opacity="0.3"/>
      </g>

      <path d="M 110 55 Q 90 20 100 50 Q 110 60 110 55" fill="url(#bodyGrad2)" filter="url(#shadow2)"/>
      <path d="M 190 55 Q 210 20 200 50 Q 190 60 190 55" fill="url(#bodyGrad2)" filter="url(#shadow2)"/>

      <rect x="70" y="50" width="160" height="130" rx="45" ry="45" fill="url(#bodyGrad2)" filter="url(#shadow2)"/>
      <rect x="70" y="50" width="160" height="130" rx="45" ry="45" fill="none" stroke="#f0f0f0" strokeWidth="2"/>

      <rect x="85" y="70" width="130" height="90" rx="30" ry="30" fill="url(#screenGrad2)"/>

      <rect x="110" y="100" width="30" height="12" rx="3" fill="#ffffff" opacity="0.9"/>
      <line x1="115" y1="106" x2="135" y2="106" stroke="#0a0a0a" strokeWidth="2"/>

      <rect x="160" y="95" width="30" height="18" rx="4" fill="#ffffff" opacity="0.9"/>
      <circle cx="175" cy="104" r="5" fill="#0a0a0a"/>

      <path d="M 130 130 Q 150 138 170 125" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.9"/>

      <text x="50" y="75" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="#9B59B6" opacity="0.8">♪</text>
      <text x="235" y="65" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="#9B59B6" opacity="0.7">♫</text>
      <text x="245" y="100" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold" fill="#9B59B6" opacity="0.6">♩</text>

      <g filter="url(#car1Glow)">
        <text x="150" y="330" fontSize="22" fontFamily="'Baloo 2', sans-serif" fontWeight="800" fill="#9B59B6" textAnchor="middle" dominantBaseline="central" stroke="#ffffff" strokeWidth="3" paintOrder="stroke" letterSpacing="3">{label}</text>
      </g>
    </svg>
  );
}
