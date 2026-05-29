// 14 robot-head learning activity icon components

export const LearnKVWordsIcon = ({ size = 200, className }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" className={className}>
    <defs>
      <radialGradient id="kvHead" cx="25%" cy="25%" r="75%">
        <stop offset="0%" stopColor="#BBDEFB" />
        <stop offset="50%" stopColor="#64B5F6" />
        <stop offset="100%" stopColor="#1976D2" />
      </radialGradient>
      <radialGradient id="kvFace" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#1E88E5" />
        <stop offset="100%" stopColor="#1565C0" />
      </radialGradient>
      <linearGradient id="kvBlockA" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFE082" />
        <stop offset="100%" stopColor="#F57F17" />
      </linearGradient>
      <linearGradient id="kvBlockB" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FF8B95" />
        <stop offset="100%" stopColor="#C62828" />
      </linearGradient>
      <filter id="kvGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#1E88E5" floodOpacity="0.4" />
      </filter>
    </defs>
    <rect x="10" y="10" width="180" height="180" rx="30" ry="30" fill="#FFFFFF" stroke="#1E88E5" strokeWidth="4" />
    <line x1="100" y1="12" x2="100" y2="32" stroke="#BBDEFB" strokeWidth="4" strokeLinecap="round" />
    <circle cx="100" cy="8" r="8" fill="#FFEB3B" filter="url(#kvGlow)" />
    <circle cx="100" cy="8" r="3" fill="#FFF" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="url(#kvHead)" filter="url(#kvGlow)" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="none" stroke="#BBDEFB" strokeWidth="3" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="url(#kvHead)" filter="url(#kvGlow)" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="none" stroke="#BBDEFB" strokeWidth="2" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="url(#kvHead)" filter="url(#kvGlow)" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="none" stroke="#BBDEFB" strokeWidth="2" />
    <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="url(#kvFace)" />
    <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="none" stroke="#64B5F6" strokeWidth="2" opacity="0.5" />
    <g transform="translate(0 10)">
      <rect x="54" y="68" width="40" height="40" rx="6" fill="url(#kvBlockB)" stroke="#7A1010" strokeWidth="2" />
      <rect x="54" y="68" width="40" height="10" rx="6" fill="rgba(255,255,255,.45)" />
      <text x="74" y="100" textAnchor="middle" fontFamily="'Baloo 2','Comic Sans MS',sans-serif" fontWeight="800" fontSize="26" fill="#fff" stroke="#7A1010" strokeWidth=".5">B</text>
      <rect x="106" y="68" width="40" height="40" rx="6" fill="url(#kvBlockA)" stroke="#7A4D02" strokeWidth="2" />
      <rect x="106" y="68" width="40" height="10" rx="6" fill="rgba(255,255,255,.55)" />
      <text x="126" y="100" textAnchor="middle" fontFamily="'Baloo 2','Comic Sans MS',sans-serif" fontWeight="800" fontSize="26" fill="#fff" stroke="#7A4D02" strokeWidth=".5">A</text>
      <circle cx="100" cy="88" r="3" fill="#FFEB3B" />
      <polygon points="50,60 52,64 56,66 52,68 50,72 48,68 44,66 48,64" fill="#FFEB3B" opacity="0.8" />
      <polygon points="150,60 152,64 156,66 152,68 150,72 148,68 144,66 148,64" fill="#FFEB3B" opacity="0.6" />
      <text x="100" y="130" textAnchor="middle" fontFamily="'Baloo 2','Comic Sans MS',sans-serif" fontWeight="800" fontSize="16" fill="#FFEB3B">BA</text>
    </g>
    <text x="100" y="178" fontSize="14" fontFamily="'Fredoka','Baloo 2',sans-serif" fontWeight="700" fill="#1E88E5" textAnchor="middle" dominantBaseline="central">Learn KV Words</text>
  </svg>
);

export const LearnKVKWordsIcon = ({ size = 200, className }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" className={className}>
    <defs>
      <radialGradient id="kvkHead" cx="25%" cy="25%" r="75%">
        <stop offset="0%" stopColor="#C8E6C9" />
        <stop offset="50%" stopColor="#81C784" />
        <stop offset="100%" stopColor="#388E3C" />
      </radialGradient>
      <radialGradient id="kvkFace" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#43A047" />
        <stop offset="100%" stopColor="#2E7D32" />
      </radialGradient>
      <linearGradient id="kvkBlock1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FF8B95" />
        <stop offset="100%" stopColor="#C62828" />
      </linearGradient>
      <linearGradient id="kvkBlock2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFE082" />
        <stop offset="100%" stopColor="#F57F17" />
      </linearGradient>
      <linearGradient id="kvkBlock3" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#90CAF9" />
        <stop offset="100%" stopColor="#1565C0" />
      </linearGradient>
      <filter id="kvkGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#43A047" floodOpacity="0.4" />
      </filter>
    </defs>
    <rect x="10" y="10" width="180" height="180" rx="30" ry="30" fill="#FFFFFF" stroke="#43A047" strokeWidth="4" />
    <line x1="100" y1="12" x2="100" y2="32" stroke="#C8E6C9" strokeWidth="4" strokeLinecap="round" />
    <circle cx="100" cy="8" r="8" fill="#FFEB3B" filter="url(#kvkGlow)" />
    <circle cx="100" cy="8" r="3" fill="#FFF" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="url(#kvkHead)" filter="url(#kvkGlow)" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="none" stroke="#C8E6C9" strokeWidth="3" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="url(#kvkHead)" filter="url(#kvkGlow)" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="none" stroke="#C8E6C9" strokeWidth="2" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="url(#kvkHead)" filter="url(#kvkGlow)" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="none" stroke="#C8E6C9" strokeWidth="2" />
    <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="url(#kvkFace)" />
    <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="none" stroke="#66BB6A" strokeWidth="2" opacity="0.5" />
    <g transform="translate(0 8)">
      <rect x="44" y="72" width="32" height="36" rx="5" fill="url(#kvkBlock1)" stroke="#7A1010" strokeWidth="2" />
      <rect x="44" y="72" width="32" height="9" rx="5" fill="rgba(255,255,255,.45)" />
      <text x="60" y="100" textAnchor="middle" fontFamily="'Baloo 2','Comic Sans MS',sans-serif" fontWeight="800" fontSize="22" fill="#fff" stroke="#7A1010" strokeWidth=".5">K</text>
      <rect x="84" y="72" width="32" height="36" rx="5" fill="url(#kvkBlock2)" stroke="#7A4D02" strokeWidth="2" />
      <rect x="84" y="72" width="32" height="9" rx="5" fill="rgba(255,255,255,.55)" />
      <text x="100" y="100" textAnchor="middle" fontFamily="'Baloo 2','Comic Sans MS',sans-serif" fontWeight="800" fontSize="22" fill="#fff" stroke="#7A4D02" strokeWidth=".5">A</text>
      <rect x="124" y="72" width="32" height="36" rx="5" fill="url(#kvkBlock3)" stroke="#0B4A8E" strokeWidth="2" />
      <rect x="124" y="72" width="32" height="9" rx="5" fill="rgba(255,255,255,.45)" />
      <text x="140" y="100" textAnchor="middle" fontFamily="'Baloo 2','Comic Sans MS',sans-serif" fontWeight="800" fontSize="22" fill="#fff" stroke="#0B4A8E" strokeWidth=".5">N</text>
      <text x="100" y="128" textAnchor="middle" fontFamily="'Baloo 2','Comic Sans MS',sans-serif" fontWeight="800" fontSize="16" fill="#FFEB3B">KAN</text>
      <polygon points="48,62 50,66 54,68 50,70 48,74 46,70 42,68 46,66" fill="#FFEB3B" opacity="0.8" />
      <polygon points="152,62 154,66 158,68 154,70 152,74 150,70 146,68 150,66" fill="#FFEB3B" opacity="0.6" />
    </g>
    <text x="100" y="178" fontSize="13" fontFamily="'Fredoka','Baloo 2',sans-serif" fontWeight="700" fill="#43A047" textAnchor="middle" dominantBaseline="central">Learn KVK Words</text>
  </svg>
);

export const EnglishPhonicsIcon = ({ size = 200, className }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" className={className}>
    <defs>
      <radialGradient id="phHead" cx="25%" cy="25%" r="75%">
        <stop offset="0%" stopColor="#FCE4EC" />
        <stop offset="50%" stopColor="#F06292" />
        <stop offset="100%" stopColor="#C2185B" />
      </radialGradient>
      <radialGradient id="phFace" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#E91E63" />
        <stop offset="100%" stopColor="#C2185B" />
      </radialGradient>
      <linearGradient id="phLetterA" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFE082" />
        <stop offset="100%" stopColor="#F57F17" />
      </linearGradient>
      <linearGradient id="phLetterB" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#81D4FA" />
        <stop offset="100%" stopColor="#0277BD" />
      </linearGradient>
      <linearGradient id="phLetterC" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#A5D6A7" />
        <stop offset="100%" stopColor="#2E7D32" />
      </linearGradient>
      <filter id="phGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#E91E63" floodOpacity="0.4" />
      </filter>
    </defs>
    <rect x="10" y="10" width="180" height="180" rx="30" ry="30" fill="#FFFFFF" stroke="#E91E63" strokeWidth="4" />
    <line x1="100" y1="12" x2="100" y2="32" stroke="#F8BBD0" strokeWidth="4" strokeLinecap="round" />
    <circle cx="100" cy="8" r="8" fill="#FFEB3B" filter="url(#phGlow)" />
    <circle cx="100" cy="8" r="3" fill="#FFF" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="url(#phHead)" filter="url(#phGlow)" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="none" stroke="#F8BBD0" strokeWidth="3" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="url(#phHead)" filter="url(#phGlow)" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="none" stroke="#F8BBD0" strokeWidth="2" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="url(#phHead)" filter="url(#phGlow)" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="none" stroke="#F8BBD0" strokeWidth="2" />
    <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="url(#phFace)" />
    <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="none" stroke="#F48FB1" strokeWidth="2" opacity="0.5" />
    <g transform="translate(0 6)">
      <circle cx="65" cy="95" r="18" fill="url(#phLetterA)" stroke="#7A4D02" strokeWidth="2" />
      <ellipse cx="60" cy="88" rx="5" ry="7" fill="#fff" opacity=".4" transform="rotate(-20 60 88)" />
      <text x="65" y="103" textAnchor="middle" fontFamily="'Baloo 2','Comic Sans MS',sans-serif" fontWeight="800" fontSize="22" fill="#fff" stroke="#7A4D02" strokeWidth=".5">A</text>
      <circle cx="100" cy="80" r="18" fill="url(#phLetterB)" stroke="#0B4A6F" strokeWidth="2" />
      <ellipse cx="95" cy="73" rx="5" ry="7" fill="#fff" opacity=".4" transform="rotate(-20 95 73)" />
      <text x="100" y="88" textAnchor="middle" fontFamily="'Baloo 2','Comic Sans MS',sans-serif" fontWeight="800" fontSize="22" fill="#fff" stroke="#0B4A6F" strokeWidth=".5">B</text>
      <circle cx="135" cy="95" r="18" fill="url(#phLetterC)" stroke="#1F4A00" strokeWidth="2" />
      <ellipse cx="130" cy="88" rx="5" ry="7" fill="#fff" opacity=".4" transform="rotate(-20 130 88)" />
      <text x="135" y="103" textAnchor="middle" fontFamily="'Baloo 2','Comic Sans MS',sans-serif" fontWeight="800" fontSize="22" fill="#fff" stroke="#1F4A00" strokeWidth=".5">C</text>
      <path d="M50 128 Q60 122 70 128 T90 128 T110 128 T130 128 T150 128" stroke="#F48FB1" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity=".85" />
      <polygon points="48,62 50,66 54,68 50,70 48,74 46,70 42,68 46,66" fill="#FFEB3B" opacity="0.8" />
      <polygon points="152,62 154,66 158,68 154,70 152,74 150,70 146,68 150,66" fill="#FFEB3B" opacity="0.6" />
    </g>
    <text x="100" y="178" fontSize="13" fontFamily="'Fredoka','Baloo 2',sans-serif" fontWeight="700" fill="#E91E63" textAnchor="middle" dominantBaseline="central">English Phonics</text>
  </svg>
);

export const Number1to100Icon = ({ size = 200, className }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" className={className}>
    <defs>
      <radialGradient id="numHead" cx="25%" cy="25%" r="75%">
        <stop offset="0%" stopColor="#FFF8E1" />
        <stop offset="50%" stopColor="#FFCA28" />
        <stop offset="100%" stopColor="#FB8C00" />
      </radialGradient>
      <radialGradient id="numFace" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#FB8C00" />
        <stop offset="100%" stopColor="#EF6C00" />
      </radialGradient>
      <linearGradient id="numBubble" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFF59D" />
        <stop offset="100%" stopColor="#FBC02D" />
      </linearGradient>
      <linearGradient id="numBubble2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#81D4FA" />
        <stop offset="100%" stopColor="#0277BD" />
      </linearGradient>
      <filter id="numGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#FFB300" floodOpacity="0.4" />
      </filter>
    </defs>
    <rect x="10" y="10" width="180" height="180" rx="30" ry="30" fill="#FFFFFF" stroke="#FFB300" strokeWidth="4" />
    <line x1="100" y1="12" x2="100" y2="32" stroke="#FFE082" strokeWidth="4" strokeLinecap="round" />
    <circle cx="100" cy="8" r="8" fill="#FFEB3B" filter="url(#numGlow)" />
    <circle cx="100" cy="8" r="3" fill="#FFF" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="url(#numHead)" filter="url(#numGlow)" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="none" stroke="#FFE082" strokeWidth="3" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="url(#numHead)" filter="url(#numGlow)" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="none" stroke="#FFE082" strokeWidth="2" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="url(#numHead)" filter="url(#numGlow)" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="none" stroke="#FFE082" strokeWidth="2" />
    <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="url(#numFace)" />
    <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="none" stroke="#FF9800" strokeWidth="2" opacity="0.5" />
    <g transform="translate(0 6)">
      <circle cx="64" cy="92" r="22" fill="url(#numBubble)" stroke="#8F5300" strokeWidth="2" />
      <ellipse cx="58" cy="84" rx="6" ry="9" fill="#fff" opacity=".45" transform="rotate(-20 58 84)" />
      <text x="64" y="102" textAnchor="middle" fontFamily="'Baloo 2','Comic Sans MS',sans-serif" fontWeight="800" fontSize="28" fill="#8F5300">1</text>
      <path d="M88 92 q12 -8 24 0" stroke="#FFEB3B" strokeWidth="3" fill="none" strokeLinecap="round" />
      <polygon points="112,88 118,92 112,96" fill="#FFEB3B" />
      <circle cx="138" cy="92" r="22" fill="url(#numBubble2)" stroke="#0B4A6F" strokeWidth="2" />
      <ellipse cx="132" cy="84" rx="6" ry="9" fill="#fff" opacity=".4" transform="rotate(-20 132 84)" />
      <text x="138" y="100" textAnchor="middle" fontFamily="'Baloo 2','Comic Sans MS',sans-serif" fontWeight="800" fontSize="18" fill="#fff" stroke="#0B4A6F" strokeWidth=".5">100</text>
      <text x="56" y="68" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="700" fontSize="12" fill="#FFE066" opacity=".85">7</text>
      <text x="148" y="68" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="700" fontSize="12" fill="#FFE066" opacity=".85">42</text>
      <text x="100" y="60" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="700" fontSize="11" fill="#FFE066" opacity=".75">25</text>
      <polygon points="48,62 50,66 54,68 50,70 48,74 46,70 42,68 46,66" fill="#FFEB3B" opacity="0.8" />
      <polygon points="152,62 154,66 158,68 154,70 152,74 150,70 146,68 150,66" fill="#FFEB3B" opacity="0.6" />
    </g>
    <text x="100" y="178" fontSize="14" fontFamily="'Fredoka','Baloo 2',sans-serif" fontWeight="700" fill="#FFB300" textAnchor="middle" dominantBaseline="central">Number 1–100</text>
  </svg>
);

export const ObjectsIcon = ({ size = 200, className }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" className={className}>
    <defs>
      <radialGradient id="objHead" cx="25%" cy="25%" r="75%">
        <stop offset="0%" stopColor="#B2DFDB" />
        <stop offset="50%" stopColor="#4DB6AC" />
        <stop offset="100%" stopColor="#00796B" />
      </radialGradient>
      <radialGradient id="objFace" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#26A69A" />
        <stop offset="100%" stopColor="#00897B" />
      </radialGradient>
      <linearGradient id="objApple" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FF8B95" />
        <stop offset="100%" stopColor="#C62828" />
      </linearGradient>
      <linearGradient id="objBall" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#90CAF9" />
        <stop offset="100%" stopColor="#1565C0" />
      </linearGradient>
      <linearGradient id="objBook" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFE082" />
        <stop offset="100%" stopColor="#F57F17" />
      </linearGradient>
      <filter id="objGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#00897B" floodOpacity="0.4" />
      </filter>
    </defs>
    <rect x="10" y="10" width="180" height="180" rx="30" ry="30" fill="#FFFFFF" stroke="#00897B" strokeWidth="4" />
    <line x1="100" y1="12" x2="100" y2="32" stroke="#B2DFDB" strokeWidth="4" strokeLinecap="round" />
    <circle cx="100" cy="8" r="8" fill="#FFEB3B" filter="url(#objGlow)" />
    <circle cx="100" cy="8" r="3" fill="#FFF" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="url(#objHead)" filter="url(#objGlow)" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="none" stroke="#B2DFDB" strokeWidth="3" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="url(#objHead)" filter="url(#objGlow)" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="none" stroke="#B2DFDB" strokeWidth="2" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="url(#objHead)" filter="url(#objGlow)" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="none" stroke="#B2DFDB" strokeWidth="2" />
    <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="url(#objFace)" />
    <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="none" stroke="#26A69A" strokeWidth="2" opacity="0.5" />
    <g transform="translate(0 8)">
      <path d="M58 88c-1-2 1-4 3-4M58 88c0-8 6-12 12-12s12 4 12 12-6 18-12 18-12-10-12-18z" fill="url(#objApple)" stroke="#7A1010" strokeWidth="2" strokeLinejoin="round" />
      <path d="M68 76c2-4 6-4 8 0" fill="#86E067" stroke="#1F4A00" strokeWidth="1.5" strokeLinejoin="round" />
      <ellipse cx="64" cy="90" rx="2" ry="4" fill="#fff" opacity=".55" transform="rotate(-20 64 90)" />
      <circle cx="100" cy="98" r="13" fill="url(#objBall)" stroke="#0B4A8E" strokeWidth="2" />
      <path d="M87 98h26M100 85v26M91 89q9 9 18 18M109 89q-9 9 -18 18" stroke="#0B4A8E" strokeWidth="1.5" fill="none" opacity=".55" />
      <ellipse cx="94" cy="92" rx="3" ry="5" fill="#fff" opacity=".4" transform="rotate(-20 94 92)" />
      <rect x="124" y="84" width="22" height="26" rx="3" fill="url(#objBook)" stroke="#7A4D02" strokeWidth="2" />
      <rect x="124" y="84" width="22" height="6" rx="3" fill="rgba(255,255,255,.5)" />
      <path d="M128 92h14M128 96h12M128 100h14M128 104h10" stroke="#7A4D02" strokeWidth="1.2" strokeLinecap="round" opacity=".75" />
      <circle cx="68" cy="122" r="2" fill="#FFEB3B" />
      <circle cx="100" cy="124" r="2" fill="#FFEB3B" />
      <circle cx="135" cy="122" r="2" fill="#FFEB3B" />
      <polygon points="48,62 50,66 54,68 50,70 48,74 46,70 42,68 46,66" fill="#FFEB3B" opacity="0.8" />
      <polygon points="152,62 154,66 158,68 154,70 152,74 150,70 146,68 150,66" fill="#FFEB3B" opacity="0.6" />
    </g>
    <text x="100" y="178" fontSize="14" fontFamily="'Fredoka','Baloo 2',sans-serif" fontWeight="700" fill="#00897B" textAnchor="middle" dominantBaseline="central">Objects</text>
  </svg>
);

export const SpellingwordsIcon = ({ size = 200, className }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" className={className}>
    <defs>
      <radialGradient id="spHead" cx="25%" cy="25%" r="75%">
        <stop offset="0%" stopColor="#D1C4E9" />
        <stop offset="50%" stopColor="#9575CD" />
        <stop offset="100%" stopColor="#5E35B1" />
      </radialGradient>
      <radialGradient id="spFace" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#5E35B1" />
        <stop offset="100%" stopColor="#4527A0" />
      </radialGradient>
      <linearGradient id="spTile" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFF6E2" />
        <stop offset="100%" stopColor="#E0BD7A" />
      </linearGradient>
      <linearGradient id="spTileGold" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFE082" />
        <stop offset="100%" stopColor="#F57F17" />
      </linearGradient>
      <filter id="spGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#5E35B1" floodOpacity="0.4" />
      </filter>
    </defs>
    <rect x="10" y="10" width="180" height="180" rx="30" ry="30" fill="#FFFFFF" stroke="#5E35B1" strokeWidth="4" />
    <line x1="100" y1="12" x2="100" y2="32" stroke="#D1C4E9" strokeWidth="4" strokeLinecap="round" />
    <circle cx="100" cy="8" r="8" fill="#FFEB3B" filter="url(#spGlow)" />
    <circle cx="100" cy="8" r="3" fill="#FFF" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="url(#spHead)" filter="url(#spGlow)" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="none" stroke="#D1C4E9" strokeWidth="3" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="url(#spHead)" filter="url(#spGlow)" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="none" stroke="#D1C4E9" strokeWidth="2" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="url(#spHead)" filter="url(#spGlow)" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="none" stroke="#D1C4E9" strokeWidth="2" />
    <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="url(#spFace)" />
    <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="none" stroke="#9575CD" strokeWidth="2" opacity="0.5" />
    <g transform="translate(0 6)">
      <rect x="56" y="80" width="24" height="28" rx="3" fill="none" stroke="#D1C4E9" strokeWidth="1.5" strokeDasharray="3 3" />
      <rect x="84" y="80" width="24" height="28" rx="3" fill="none" stroke="#D1C4E9" strokeWidth="1.5" strokeDasharray="3 3" />
      <rect x="112" y="80" width="24" height="28" rx="3" fill="none" stroke="#D1C4E9" strokeWidth="1.5" strokeDasharray="3 3" />
      <rect x="56" y="80" width="24" height="28" rx="3" fill="url(#spTile)" stroke="#5B3A0A" strokeWidth="1.6" />
      <rect x="56" y="80" width="24" height="6" rx="3" fill="rgba(255,255,255,.55)" />
      <text x="68" y="100" textAnchor="middle" fontFamily="'Baloo 2','Comic Sans MS',sans-serif" fontWeight="800" fontSize="18" fill="#5B3A0A">C</text>
      <text x="76" y="106" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="700" fontSize="7" fill="#5B3A0A" opacity=".7">3</text>
      <rect x="84" y="80" width="24" height="28" rx="3" fill="url(#spTile)" stroke="#5B3A0A" strokeWidth="1.6" />
      <rect x="84" y="80" width="24" height="6" rx="3" fill="rgba(255,255,255,.55)" />
      <text x="96" y="100" textAnchor="middle" fontFamily="'Baloo 2','Comic Sans MS',sans-serif" fontWeight="800" fontSize="18" fill="#5B3A0A">A</text>
      <text x="104" y="106" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="700" fontSize="7" fill="#5B3A0A" opacity=".7">1</text>
      <g transform="translate(124 68) rotate(-8)">
        <rect width="24" height="28" rx="3" fill="url(#spTileGold)" stroke="#7A4D02" strokeWidth="1.6" />
        <rect width="24" height="6" rx="3" fill="rgba(255,255,255,.55)" />
        <text x="12" y="20" textAnchor="middle" fontFamily="'Baloo 2','Comic Sans MS',sans-serif" fontWeight="800" fontSize="18" fill="#7A4D02">T</text>
        <text x="20" y="26" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="700" fontSize="7" fill="#7A4D02" opacity=".7">1</text>
      </g>
      <path d="M124 92 v8" stroke="#FFEB3B" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="2 2" />
      <polygon points="120,100 124,106 128,100" fill="#FFEB3B" />
      <polygon points="48,62 50,66 54,68 50,70 48,74 46,70 42,68 46,66" fill="#FFEB3B" opacity="0.8" />
      <polygon points="152,62 154,66 158,68 154,70 152,74 150,70 146,68 150,66" fill="#FFEB3B" opacity="0.6" />
    </g>
    <text x="100" y="178" fontSize="14" fontFamily="'Fredoka','Baloo 2',sans-serif" fontWeight="700" fill="#5E35B1" textAnchor="middle" dominantBaseline="central">Spelling</text>
  </svg>
);

export const SpellingIcon = ({ size = 200, className }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" className={className}>
    <defs>
      <radialGradient id="spHead" cx="25%" cy="25%" r="75%">
        <stop offset="0%" stopColor="#D1C4E9" />
        <stop offset="50%" stopColor="#9575CD" />
        <stop offset="100%" stopColor="#5E35B1" />
      </radialGradient>
      <radialGradient id="spFace" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#5E35B1" />
        <stop offset="100%" stopColor="#4527A0" />
      </radialGradient>
      <linearGradient id="spTile" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFF6E2" />
        <stop offset="100%" stopColor="#E0BD7A" />
      </linearGradient>
      <linearGradient id="spTileGold" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFE082" />
        <stop offset="100%" stopColor="#F57F17" />
      </linearGradient>
      <filter id="spGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#5E35B1" floodOpacity="0.4" />
      </filter>
    </defs>
    <rect x="10" y="10" width="180" height="180" rx="30" ry="30" fill="#FFFFFF" stroke="#5E35B1" strokeWidth="4" />
    <line x1="100" y1="12" x2="100" y2="32" stroke="#D1C4E9" strokeWidth="4" strokeLinecap="round" />
    <circle cx="100" cy="8" r="8" fill="#FFEB3B" filter="url(#spGlow)" />
    <circle cx="100" cy="8" r="3" fill="#FFF" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="url(#spHead)" filter="url(#spGlow)" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="none" stroke="#D1C4E9" strokeWidth="3" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="url(#spHead)" filter="url(#spGlow)" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="none" stroke="#D1C4E9" strokeWidth="2" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="url(#spHead)" filter="url(#spGlow)" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="none" stroke="#D1C4E9" strokeWidth="2" />
    <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="url(#spFace)" />
    <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="none" stroke="#9575CD" strokeWidth="2" opacity="0.5" />
    <g transform="translate(0 6)">
      <rect x="56" y="80" width="24" height="28" rx="3" fill="none" stroke="#D1C4E9" strokeWidth="1.5" strokeDasharray="3 3" />
      <rect x="84" y="80" width="24" height="28" rx="3" fill="none" stroke="#D1C4E9" strokeWidth="1.5" strokeDasharray="3 3" />
      <rect x="112" y="80" width="24" height="28" rx="3" fill="none" stroke="#D1C4E9" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* Tile 1: Alif */}
      <rect x="56" y="80" width="24" height="28" rx="3" fill="url(#spTile)" stroke="#5B3A0A" strokeWidth="1.6" />
      <rect x="56" y="80" width="24" height="6" rx="3" fill="rgba(255,255,255,.55)" />
      <text x="68" y="100" textAnchor="middle" fontFamily="'Baloo 2','Noto Sans Arabic',sans-serif" fontWeight="800" fontSize="18" fill="#5B3A0A">ت</text>
      <text x="76" y="106" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="700" fontSize="7" fill="#5B3A0A" opacity=".7">1</text>

      {/* Tile 2: Ba */}
      <rect x="84" y="80" width="24" height="28" rx="3" fill="url(#spTile)" stroke="#5B3A0A" strokeWidth="1.6" />
      <rect x="84" y="80" width="24" height="6" rx="3" fill="rgba(255,255,255,.55)" />
      <text x="96" y="100" textAnchor="middle" fontFamily="'Baloo 2','Noto Sans Arabic',sans-serif" fontWeight="800" fontSize="18" fill="#5B3A0A">ب</text>
      <text x="104" y="106" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="700" fontSize="7" fill="#5B3A0A" opacity=".7">2</text>

      {/* Tile 3: Ta (Gold) */}
      <g transform="translate(124 68) rotate(-8)">
        <rect width="24" height="28" rx="3" fill="url(#spTileGold)" stroke="#7A4D02" strokeWidth="1.6" />
        <rect width="24" height="6" rx="3" fill="rgba(255,255,255,.55)" />
        <text x="12" y="20" textAnchor="middle" fontFamily="'Baloo 2','Noto Sans Arabic',sans-serif" fontWeight="800" fontSize="18" fill="#7A4D02">ا</text>
        <text x="20" y="26" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="700" fontSize="7" fill="#7A4D02" opacity=".7">3</text>
      </g>

      <path d="M124 92 v8" stroke="#FFEB3B" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="2 2" />
      <polygon points="120,100 124,106 128,100" fill="#FFEB3B" />
      <polygon points="48,62 50,66 54,68 50,70 48,74 46,70 42,68 46,66" fill="#FFEB3B" opacity="0.8" />
      <polygon points="152,62 154,66 158,68 154,70 152,74 150,70 146,68 150,66" fill="#FFEB3B" opacity="0.6" />
    </g>
    <text x="100" y="178" fontSize="12" fontFamily="'Fredoka','Baloo 2',sans-serif" fontWeight="700" fill="#5E35B1" textAnchor="middle" dominantBaseline="central">Alif Ba Ta</text>
  </svg>
);

export const JawiAlphabetIcon = ({ size = 200, className }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" className={className}>
    <defs>
      <radialGradient id="jaHead" cx="25%" cy="25%" r="75%">
        <stop offset="0%" stopColor="#E1BEE7" />
        <stop offset="50%" stopColor="#BA68C8" />
        <stop offset="100%" stopColor="#7B1FA2" />
      </radialGradient>
      <radialGradient id="jaFace" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#8E24AA" />
        <stop offset="100%" stopColor="#6A1B9A" />
      </radialGradient>
      <linearGradient id="jaCard" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFF6E2" />
        <stop offset="100%" stopColor="#FFCC80" />
      </linearGradient>
      <filter id="jaGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#7B1FA2" floodOpacity="0.4" />
      </filter>
    </defs>
    <rect x="10" y="10" width="180" height="180" rx="30" ry="30" fill="#FFFFFF" stroke="#7B1FA2" strokeWidth="4" />
    <line x1="100" y1="12" x2="100" y2="32" stroke="#E1BEE7" strokeWidth="4" strokeLinecap="round" />
    <circle cx="100" cy="8" r="8" fill="#FFEB3B" filter="url(#jaGlow)" />
    <circle cx="100" cy="8" r="3" fill="#FFF" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="url(#jaHead)" filter="url(#jaGlow)" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="none" stroke="#E1BEE7" strokeWidth="3" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="url(#jaHead)" filter="url(#jaGlow)" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="none" stroke="#E1BEE7" strokeWidth="2" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="url(#jaHead)" filter="url(#jaGlow)" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="none" stroke="#E1BEE7" strokeWidth="2" />
    <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="url(#jaFace)" />
    <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="none" stroke="#9C27B0" strokeWidth="2" opacity="0.5" />
    <g transform="translate(0 8)">
      <rect x="48" y="72" width="28" height="38" rx="5" fill="url(#jaCard)" stroke="#5B3A0A" strokeWidth="2" />
      <rect x="48" y="72" width="28" height="8" rx="5" fill="rgba(255,255,255,.55)" />
      <text x="62" y="100" textAnchor="middle" fontFamily="'Amiri Quran','Scheherazade New',serif" fontWeight="700" fontSize="24" fill="#5B3A0A">ت </text>
      <g transform="rotate(-6 100 90)">
        <rect x="86" y="68" width="28" height="38" rx="5" fill="#fff" stroke="#5B3A0A" strokeWidth="2" />
        <rect x="86" y="68" width="28" height="8" rx="5" fill="rgba(123,31,162,.18)" />
        <text x="100" y="96" textAnchor="middle" fontFamily="'Amiri Quran','Scheherazade New',serif" fontWeight="700" fontSize="24" fill="#5B3A0A">ب</text>
      </g>
      <rect x="124" y="72" width="28" height="38" rx="5" fill="url(#jaCard)" stroke="#5B3A0A" strokeWidth="2" />
      <rect x="124" y="72" width="28" height="8" rx="5" fill="rgba(255,255,255,.55)" />
      <text x="138" y="100" textAnchor="middle" fontFamily="'Amiri Quran','Scheherazade New',serif" fontWeight="700" fontSize="24" fill="#5B3A0A">ا</text>
      <polygon points="48,62 50,66 54,68 50,70 48,74 46,70 42,68 46,66" fill="#FFEB3B" opacity="0.8" />
      <polygon points="152,62 154,66 158,68 154,70 152,74 150,70 146,68 150,66" fill="#FFEB3B" opacity="0.6" />
    </g>
    <text x="100" y="178" fontSize="14" fontFamily="'Fredoka','Baloo 2',sans-serif" fontWeight="700" fill="#7B1FA2" textAnchor="middle" dominantBaseline="central">Jawi Alphabet</text>
  </svg>
);

export const JawiWordsIcon = ({ size = 200, className }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" className={className}>
    <defs>
      <radialGradient id="jwHead" cx="25%" cy="25%" r="75%">
        <stop offset="0%" stopColor="#F8BBD0" />
        <stop offset="50%" stopColor="#EC407A" />
        <stop offset="100%" stopColor="#C2185B" />
      </radialGradient>
      <radialGradient id="jwFace" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#D81B60" />
        <stop offset="100%" stopColor="#AD1457" />
      </radialGradient>
      <linearGradient id="jwCard" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFF6E2" />
        <stop offset="100%" stopColor="#FFCC80" />
      </linearGradient>
      <filter id="jwGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#D81B60" floodOpacity="0.4" />
      </filter>
    </defs>
    <rect x="10" y="10" width="180" height="180" rx="30" ry="30" fill="#FFFFFF" stroke="#D81B60" strokeWidth="4" />
    <line x1="100" y1="12" x2="100" y2="32" stroke="#F8BBD0" strokeWidth="4" strokeLinecap="round" />
    <circle cx="100" cy="8" r="8" fill="#FFEB3B" filter="url(#jwGlow)" />
    <circle cx="100" cy="8" r="3" fill="#FFF" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="url(#jwHead)" filter="url(#jwGlow)" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="none" stroke="#F8BBD0" strokeWidth="3" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="url(#jwHead)" filter="url(#jwGlow)" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="none" stroke="#F8BBD0" strokeWidth="2" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="url(#jwHead)" filter="url(#jwGlow)" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="none" stroke="#F8BBD0" strokeWidth="2" />
    <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="url(#jwFace)" />
    <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="none" stroke="#EC407A" strokeWidth="2" opacity="0.5" />
    <g transform="translate(0 6)">
      <rect x="50" y="72" width="100" height="44" rx="8" fill="url(#jwCard)" stroke="#5B3A0A" strokeWidth="2" />
      <rect x="50" y="72" width="100" height="10" rx="8" fill="rgba(216,27,96,.2)" />
      <text x="100" y="104" textAnchor="middle" fontFamily="'Amiri Quran','Scheherazade New',serif" fontWeight="700" fontSize="26" fill="#5B3A0A">كتاب</text>
      <rect x="74" y="120" width="52" height="14" rx="7" fill="#fff" stroke="#D81B60" strokeWidth="1.5" />
      <text x="100" y="131" textAnchor="middle" fontFamily="'Baloo 2','Comic Sans MS',sans-serif" fontWeight="700" fontSize="9" fill="#D81B60">KITAB</text>
      <polygon points="48,62 50,66 54,68 50,70 48,74 46,70 42,68 46,66" fill="#FFEB3B" opacity="0.8" />
      <polygon points="152,62 154,66 158,68 154,70 152,74 150,70 146,68 150,66" fill="#FFEB3B" opacity="0.6" />
    </g>
    <text x="100" y="178" fontSize="14" fontFamily="'Fredoka','Baloo 2',sans-serif" fontWeight="700" fill="#D81B60" textAnchor="middle" dominantBaseline="central">Jawi Words</text>
  </svg>
);

export const Jawi100WordsIcon = ({ size = 200, className }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" className={className}>
    <defs>
      <radialGradient id="j100Head" cx="25%" cy="25%" r="75%">
        <stop offset="0%" stopColor="#FFE0B2" />
        <stop offset="50%" stopColor="#FFA726" />
        <stop offset="100%" stopColor="#EF6C00" />
      </radialGradient>
      <radialGradient id="j100Face" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#EF6C00" />
        <stop offset="100%" stopColor="#D84315" />
      </radialGradient>
      <radialGradient id="j100Badge" cx="35%" cy="35%" r="75%">
        <stop offset="0%" stopColor="#FFF59D" />
        <stop offset="55%" stopColor="#FFC107" />
        <stop offset="100%" stopColor="#8F5300" />
      </radialGradient>
      <linearGradient id="j100Card" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFF6E2" />
        <stop offset="100%" stopColor="#FFCC80" />
      </linearGradient>
      <filter id="j100Glow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#EF6C00" floodOpacity="0.4" />
      </filter>
    </defs>
    <rect x="10" y="10" width="180" height="180" rx="30" ry="30" fill="#FFFFFF" stroke="#EF6C00" strokeWidth="4" />
    <line x1="100" y1="12" x2="100" y2="32" stroke="#FFE0B2" strokeWidth="4" strokeLinecap="round" />
    <circle cx="100" cy="8" r="8" fill="#FFEB3B" filter="url(#j100Glow)" />
    <circle cx="100" cy="8" r="3" fill="#FFF" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="url(#j100Head)" filter="url(#j100Glow)" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="none" stroke="#FFE0B2" strokeWidth="3" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="url(#j100Head)" filter="url(#j100Glow)" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="none" stroke="#FFE0B2" strokeWidth="2" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="url(#j100Head)" filter="url(#j100Glow)" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="none" stroke="#FFE0B2" strokeWidth="2" />
    <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="url(#j100Face)" />
    <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="none" stroke="#FF9800" strokeWidth="2" opacity="0.5" />
    <g transform="translate(0 5)">
      <g transform="rotate(-8 70 92)">
        <rect x="44" y="76" width="52" height="32" rx="5" fill="url(#j100Card)" stroke="#5B3A0A" strokeWidth="1.8" />
        <text x="70" y="100" textAnchor="middle" fontFamily="'Amiri Quran',serif" fontWeight="700" fontSize="18" fill="#5B3A0A"></text>
      </g>
      <g transform="rotate(2 76 96)">
        <rect x="50" y="80" width="52" height="32" rx="5" fill="#fff" stroke="#5B3A0A" strokeWidth="1.8" />
        <text x="76" y="104" textAnchor="middle" fontFamily="'Amiri Quran',serif" fontWeight="700" fontSize="18" fill="#5B3A0A">ايات</text>
      </g>
      <circle cx="138" cy="92" r="22" fill="url(#j100Badge)" stroke="#8F5300" strokeWidth="2" />
      <ellipse cx="132" cy="84" rx="6" ry="9" fill="#fff" opacity=".45" transform="rotate(-20 132 84)" />
      <text x="138" y="100" textAnchor="middle" fontFamily="'Baloo 2','Comic Sans MS',sans-serif" fontWeight="800" fontSize="20" fill="#8F5300">100</text>
      <polygon points="48,62 50,66 54,68 50,70 48,74 46,70 42,68 46,66" fill="#FFEB3B" opacity="0.8" />
      <polygon points="152,62 154,66 158,68 154,70 152,74 150,70 146,68 150,66" fill="#FFEB3B" opacity="0.6" />
    </g>
    <text x="100" y="178" fontSize="12" fontFamily="'Fredoka','Baloo 2',sans-serif" fontWeight="700" fill="#EF6C00" textAnchor="middle" dominantBaseline="central">1st 100 Jawi Words</text>
  </svg>
);

export const JawiStoriesIcon = ({ size = 200, className }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" className={className}>
    <defs>
      <radialGradient id="jsHead" cx="25%" cy="25%" r="75%">
        <stop offset="0%" stopColor="#D7CCC8" />
        <stop offset="50%" stopColor="#8D6E63" />
        <stop offset="100%" stopColor="#5D4037" />
      </radialGradient>
      <radialGradient id="jsFace" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#6D4C41" />
        <stop offset="100%" stopColor="#5D4037" />
      </radialGradient>
      <linearGradient id="jsBookL" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFF1D2" />
        <stop offset="100%" stopColor="#FFD699" />
      </linearGradient>
      <linearGradient id="jsBookR" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFE2A6" />
        <stop offset="100%" stopColor="#E89A1A" />
      </linearGradient>
      <filter id="jsGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#6D4C41" floodOpacity="0.4" />
      </filter>
    </defs>
    <rect x="10" y="10" width="180" height="180" rx="30" ry="30" fill="#FFFFFF" stroke="#6D4C41" strokeWidth="4" />
    <line x1="100" y1="12" x2="100" y2="32" stroke="#D7CCC8" strokeWidth="4" strokeLinecap="round" />
    <circle cx="100" cy="8" r="8" fill="#FFEB3B" filter="url(#jsGlow)" />
    <circle cx="100" cy="8" r="3" fill="#FFF" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="url(#jsHead)" filter="url(#jsGlow)" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="none" stroke="#D7CCC8" strokeWidth="3" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="url(#jsHead)" filter="url(#jsGlow)" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="none" stroke="#D7CCC8" strokeWidth="2" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="url(#jsHead)" filter="url(#jsGlow)" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="none" stroke="#D7CCC8" strokeWidth="2" />
    <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="url(#jsFace)" />
    <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="none" stroke="#8D6E63" strokeWidth="2" opacity="0.5" />
    <g transform="translate(0 8)">
      <path d="M150 64 a8 8 0 1 0 0 16 6 6 0 1 1 0 -16z" fill="#FFE066" stroke="#8F5300" strokeWidth="1.4" />
      <path d="M58 64l1 2.5 2.5 .5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-.5z" fill="#FFE066" />
      <path d="M132 92l.8 2 2 .4-2 .8-.8 2-.8-2-2-.8 2-.4z" fill="#FFE066" />
      <ellipse cx="100" cy="128" rx="44" ry="3" fill="rgba(0,0,0,.35)" />
      <path d="M50 88 q24 -10 50 -2 v36 q-24 -10 -50 0 z" fill="url(#jsBookL)" stroke="#5B3A0A" strokeWidth="2" strokeLinejoin="round" />
      <path d="M150 88 q-24 -10 -50 -2 v36 q24 -10 50 0 z" fill="url(#jsBookR)" stroke="#5B3A0A" strokeWidth="2" strokeLinejoin="round" />
      <path d="M99 86 v36 M101 86 v36" stroke="#5B3A0A" strokeWidth="1.2" />
      <text x="72" y="100" textAnchor="middle" fontFamily="'Amiri Quran',serif" fontWeight="700" fontSize="13" fill="#5B3A0A">كتاب</text>
      <text x="72" y="114" textAnchor="middle" fontFamily="'Amiri Quran',serif" fontWeight="700" fontSize="11" fill="#5B3A0A" opacity=".7">سيتى</text>
      <text x="128" y="100" textAnchor="middle" fontFamily="'Amiri Quran',serif" fontWeight="700" fontSize="13" fill="#5B3A0A">بومي</text>
      <text x="128" y="114" textAnchor="middle" fontFamily="'Amiri Quran',serif" fontWeight="700" fontSize="11" fill="#5B3A0A" opacity=".7">انق</text>
    </g>
    <text x="100" y="178" fontSize="14" fontFamily="'Fredoka','Baloo 2',sans-serif" fontWeight="700" fill="#6D4C41" textAnchor="middle" dominantBaseline="central">Jawi Stories</text>
  </svg>
);

export const JawiGameIcon = ({ size = 200, className }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" className={className}>
    <defs>
      <radialGradient id="jgHead" cx="25%" cy="25%" r="75%">
        <stop offset="0%" stopColor="#F0F4C3" />
        <stop offset="50%" stopColor="#AED581" />
        <stop offset="100%" stopColor="#689F38" />
      </radialGradient>
      <radialGradient id="jgFace" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#7CB342" />
        <stop offset="100%" stopColor="#558B2F" />
      </radialGradient>
      <linearGradient id="jgDie" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#E0F2D0" />
      </linearGradient>
      <linearGradient id="jgDie2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFCC80" />
        <stop offset="100%" stopColor="#F57F17" />
      </linearGradient>
      <linearGradient id="jgDie3" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#90CAF9" />
        <stop offset="100%" stopColor="#1565C0" />
      </linearGradient>
      <filter id="jgGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#9CCC65" floodOpacity="0.4" />
      </filter>
    </defs>
    <rect x="10" y="10" width="180" height="180" rx="30" ry="30" fill="#FFFFFF" stroke="#9CCC65" strokeWidth="4" />
    <line x1="100" y1="12" x2="100" y2="32" stroke="#DCE775" strokeWidth="4" strokeLinecap="round" />
    <circle cx="100" cy="8" r="8" fill="#FFEB3B" filter="url(#jgGlow)" />
    <circle cx="100" cy="8" r="3" fill="#FFF" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="url(#jgHead)" filter="url(#jgGlow)" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="none" stroke="#DCE775" strokeWidth="3" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="url(#jgHead)" filter="url(#jgGlow)" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="none" stroke="#DCE775" strokeWidth="2" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="url(#jgHead)" filter="url(#jgGlow)" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="none" stroke="#DCE775" strokeWidth="2" />
    <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="url(#jgFace)" />
    <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="none" stroke="#AED581" strokeWidth="2" opacity="0.5" />
    <g transform="translate(0 6)">
      <g transform="rotate(-10 62 96)">
        <rect x="48" y="80" width="28" height="32" rx="5" fill="url(#jgDie)" stroke="#33691E" strokeWidth="2" />
        <rect x="48" y="80" width="28" height="8" rx="5" fill="rgba(255,255,255,.65)" />
        <text x="62" y="104" textAnchor="middle" fontFamily="'Amiri Quran',serif" fontWeight="700" fontSize="22" fill="#33691E">ت</text>
      </g>
      <g transform="rotate(5 100 92)">
        <rect x="86" y="76" width="28" height="32" rx="5" fill="url(#jgDie2)" stroke="#7A4D02" strokeWidth="2" />
        <rect x="86" y="76" width="28" height="8" rx="5" fill="rgba(255,255,255,.55)" />
        <text x="100" y="100" textAnchor="middle" fontFamily="'Amiri Quran',serif" fontWeight="700" fontSize="22" fill="#fff" stroke="#7A4D02" strokeWidth=".5">ب</text>
      </g>
      <g transform="rotate(-6 138 96)">
        <rect x="124" y="80" width="28" height="32" rx="5" fill="url(#jgDie3)" stroke="#0B4A8E" strokeWidth="2" />
        <rect x="124" y="80" width="28" height="8" rx="5" fill="rgba(255,255,255,.5)" />
        <text x="138" y="104" textAnchor="middle" fontFamily="'Amiri Quran',serif" fontWeight="700" fontSize="22" fill="#fff" stroke="#0B4A8E" strokeWidth=".5">ا</text>
      </g>
      <path d="M60 124 q40 -8 80 0" stroke="#FFEB3B" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeDasharray="3 3" />
      <circle cx="100" cy="130" r="6" fill="#FFEB3B" stroke="#33691E" strokeWidth="1.5" />
      <polygon points="98,127 98,133 103,130" fill="#33691E" />
      <polygon points="48,62 50,66 54,68 50,70 48,74 46,70 42,68 46,66" fill="#FFEB3B" opacity="0.8" />
      <polygon points="152,62 154,66 158,68 154,70 152,74 150,70 146,68 150,66" fill="#FFEB3B" opacity="0.6" />
    </g>
    <text x="100" y="178" fontSize="14" fontFamily="'Fredoka','Baloo 2',sans-serif" fontWeight="700" fill="#689F38" textAnchor="middle" dominantBaseline="central">Jawi Game</text>
  </svg>
);

export const MathOperationIcon = ({ size = 200, className }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" className={className}>
    <defs>
      <radialGradient id="moHead" cx="25%" cy="25%" r="75%">
        <stop offset="0%" stopColor="#BBDEFB" />
        <stop offset="50%" stopColor="#42A5F5" />
        <stop offset="100%" stopColor="#1976D2" />
      </radialGradient>
      <radialGradient id="moFace" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#1976D2" />
        <stop offset="100%" stopColor="#1565C0" />
      </radialGradient>
      <linearGradient id="moPlus" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#A5D6A7" />
        <stop offset="100%" stopColor="#2E7D32" />
      </linearGradient>
      <linearGradient id="moMinus" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FF8B95" />
        <stop offset="100%" stopColor="#C62828" />
      </linearGradient>
      <linearGradient id="moMul" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFE082" />
        <stop offset="100%" stopColor="#F57F17" />
      </linearGradient>
      <linearGradient id="moDiv" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#CE93D8" />
        <stop offset="100%" stopColor="#6A1B9A" />
      </linearGradient>
      <filter id="moGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#1565C0" floodOpacity="0.4" />
      </filter>
    </defs>
    <rect x="10" y="10" width="180" height="180" rx="30" ry="30" fill="#FFFFFF" stroke="#1565C0" strokeWidth="4" />
    <line x1="100" y1="12" x2="100" y2="32" stroke="#BBDEFB" strokeWidth="4" strokeLinecap="round" />
    <circle cx="100" cy="8" r="8" fill="#FFEB3B" filter="url(#moGlow)" />
    <circle cx="100" cy="8" r="3" fill="#FFF" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="url(#moHead)" filter="url(#moGlow)" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="none" stroke="#BBDEFB" strokeWidth="3" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="url(#moHead)" filter="url(#moGlow)" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="none" stroke="#BBDEFB" strokeWidth="2" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="url(#moHead)" filter="url(#moGlow)" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="none" stroke="#BBDEFB" strokeWidth="2" />
    <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="url(#moFace)" />
    <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="none" stroke="#42A5F5" strokeWidth="2" opacity="0.5" />
    <g transform="translate(0 6)">
      <rect x="56" y="68" width="34" height="30" rx="6" fill="url(#moPlus)" stroke="#1F4A00" strokeWidth="2" />
      <rect x="56" y="68" width="34" height="8" rx="6" fill="rgba(255,255,255,.45)" />
      <text x="73" y="92" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="22" fill="#fff" stroke="#1F4A00" strokeWidth=".5">+</text>
      <rect x="110" y="68" width="34" height="30" rx="6" fill="url(#moMinus)" stroke="#7A1010" strokeWidth="2" />
      <rect x="110" y="68" width="34" height="8" rx="6" fill="rgba(255,255,255,.45)" />
      <text x="127" y="92" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="22" fill="#fff" stroke="#7A1010" strokeWidth=".5">−</text>
      <rect x="56" y="104" width="34" height="30" rx="6" fill="url(#moMul)" stroke="#7A4D02" strokeWidth="2" />
      <rect x="56" y="104" width="34" height="8" rx="6" fill="rgba(255,255,255,.55)" />
      <text x="73" y="128" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="22" fill="#fff" stroke="#7A4D02" strokeWidth=".5">×</text>
      <rect x="110" y="104" width="34" height="30" rx="6" fill="url(#moDiv)" stroke="#3F0866" strokeWidth="2" />
      <rect x="110" y="104" width="34" height="8" rx="6" fill="rgba(255,255,255,.45)" />
      <text x="127" y="128" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="22" fill="#fff" stroke="#3F0866" strokeWidth=".5">÷</text>
      <polygon points="48,62 50,66 54,68 50,70 48,74 46,70 42,68 46,66" fill="#FFEB3B" opacity="0.8" />
      <polygon points="152,62 154,66 158,68 154,70 152,74 150,70 146,68 150,66" fill="#FFEB3B" opacity="0.6" />
    </g>
    <text x="100" y="178" fontSize="14" fontFamily="'Fredoka','Baloo 2',sans-serif" fontWeight="700" fill="#1565C0" textAnchor="middle" dominantBaseline="central">Math Operation</text>
  </svg>
);

export const MathLongMethodIcon = ({ size = 200, className }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" className={className}>
    <defs>
      <radialGradient id="mlHead" cx="25%" cy="25%" r="75%">
        <stop offset="0%" stopColor="#FFCDD2" />
        <stop offset="50%" stopColor="#E57373" />
        <stop offset="100%" stopColor="#C62828" />
      </radialGradient>
      <radialGradient id="mlFace" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#FFF6E2" />
        <stop offset="100%" stopColor="#FFD699" />
      </radialGradient>
      <filter id="mlGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#D32F2F" floodOpacity="0.4" />
      </filter>
    </defs>
    <rect x="10" y="10" width="180" height="180" rx="30" ry="30" fill="#FFFFFF" stroke="#D32F2F" strokeWidth="4" />
    <line x1="100" y1="12" x2="100" y2="32" stroke="#FFCDD2" strokeWidth="4" strokeLinecap="round" />
    <circle cx="100" cy="8" r="8" fill="#FFEB3B" filter="url(#mlGlow)" />
    <circle cx="100" cy="8" r="3" fill="#FFF" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="url(#mlHead)" filter="url(#mlGlow)" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="none" stroke="#FFCDD2" strokeWidth="3" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="url(#mlHead)" filter="url(#mlGlow)" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="none" stroke="#FFCDD2" strokeWidth="2" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="url(#mlHead)" filter="url(#mlGlow)" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="none" stroke="#FFCDD2" strokeWidth="2" />
    <rect x="38" y="52" width="124" height="96" rx="14" ry="14" fill="url(#mlFace)" />
    <rect x="38" y="52" width="124" height="96" rx="14" ry="14" fill="none" stroke="#8F5300" strokeWidth="2" opacity=".55" />
    <g stroke="#D32F2F" strokeWidth=".8" opacity=".25">
      <path d="M44 70h112M44 84h112M44 98h112M44 112h112M44 126h112M44 140h112" />
    </g>
    <g transform="translate(0 4)">
      <text x="62" y="92" textAnchor="end" fontFamily="'Baloo 2','Comic Sans MS',sans-serif" fontWeight="800" fontSize="22" fill="#D32F2F">4</text>
      <path d="M68 76 v18 q0 4 4 4" stroke="#D32F2F" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M72 76 h44" stroke="#D32F2F" strokeWidth="2.4" strokeLinecap="round" />
      <text x="94" y="92" textAnchor="middle" fontFamily="'Baloo 2','Comic Sans MS',sans-serif" fontWeight="800" fontSize="22" fill="#5B0A0A">24</text>
      <text x="94" y="110" textAnchor="middle" fontFamily="'Baloo 2','Comic Sans MS',sans-serif" fontWeight="700" fontSize="14" fill="#5B0A0A">−24</text>
      <line x1="78" y1="116" x2="112" y2="116" stroke="#5B0A0A" strokeWidth="1.6" />
      <text x="94" y="130" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="700" fontSize="14" fill="#5B0A0A">0</text>
      <text x="94" y="74" textAnchor="middle" fontFamily="'Baloo 2','Comic Sans MS',sans-serif" fontWeight="800" fontSize="22" fill="#43A047">6</text>
      <path d="M126 72 q8 0 6 -8" stroke="#43A047" strokeWidth="2" fill="none" strokeLinecap="round" />
      <polygon points="130,62 134,66 138,62" fill="#43A047" />
      <g transform="translate(138 110) rotate(-30)">
        <rect x="0" y="0" width="6" height="24" rx="2" fill="#FFE082" stroke="#5B3A0A" strokeWidth="1" />
        <polygon points="0,24 3,30 6,24" fill="#FFCC80" stroke="#5B3A0A" strokeWidth="1" />
        <polygon points="2,28 3,30 4,28" fill="#212121" />
        <rect x="0" y="-4" width="6" height="4" rx="1" fill="#FF8B95" stroke="#7A1010" strokeWidth="1" />
      </g>
      <polygon points="48,62 50,66 54,68 50,70 48,74 46,70 42,68 46,66" fill="#FFC107" opacity="0.8" />
      <polygon points="152,62 154,66 158,68 154,70 152,74 150,70 146,68 150,66" fill="#FFC107" opacity="0.6" />
    </g>
    <text x="100" y="178" fontSize="13" fontFamily="'Fredoka','Baloo 2',sans-serif" fontWeight="700" fill="#D32F2F" textAnchor="middle" dominantBaseline="central">Math Long Method</text>
  </svg>
);

export const ClockAndTimeIcon = ({ size = 200, className }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" className={className}>
    <defs>
      <radialGradient id="ctHead" cx="25%" cy="25%" r="75%">
        <stop offset="0%" stopColor="#B2EBF2" />
        <stop offset="50%" stopColor="#4DD0E1" />
        <stop offset="100%" stopColor="#00838F" />
      </radialGradient>
      <radialGradient id="ctFace" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#00ACC1" />
        <stop offset="100%" stopColor="#00838F" />
      </radialGradient>
      <radialGradient id="ctClock" cx="35%" cy="35%" r="75%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#B2EBF2" />
      </radialGradient>
      <filter id="ctGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#00ACC1" floodOpacity="0.4" />
      </filter>
    </defs>
    <rect x="10" y="10" width="180" height="180" rx="30" ry="30" fill="#FFFFFF" stroke="#00ACC1" strokeWidth="4" />
    <line x1="100" y1="12" x2="100" y2="32" stroke="#B2EBF2" strokeWidth="4" strokeLinecap="round" />
    <circle cx="100" cy="8" r="8" fill="#FFEB3B" filter="url(#ctGlow)" />
    <circle cx="100" cy="8" r="3" fill="#FFF" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="url(#ctHead)" filter="url(#ctGlow)" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="none" stroke="#B2EBF2" strokeWidth="3" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="url(#ctHead)" filter="url(#ctGlow)" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="none" stroke="#B2EBF2" strokeWidth="2" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="url(#ctHead)" filter="url(#ctGlow)" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="none" stroke="#B2EBF2" strokeWidth="2" />
    <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="url(#ctFace)" />
    <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="none" stroke="#26C6DA" strokeWidth="2" opacity="0.5" />
    <g transform="translate(0 4)">
      <ellipse cx="80" cy="68" rx="8" ry="6" fill="#FFEB3B" stroke="#0B4A6F" strokeWidth="2" />
      <ellipse cx="120" cy="68" rx="8" ry="6" fill="#FFEB3B" stroke="#0B4A6F" strokeWidth="2" />
      <circle cx="100" cy="100" r="28" fill="url(#ctClock)" stroke="#0B4A6F" strokeWidth="3" />
      <circle cx="100" cy="100" r="24" fill="none" stroke="#00ACC1" strokeWidth="1.2" opacity=".4" />
      <text x="100" y="82" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="9" fill="#0B4A6F">12</text>
      <text x="120" y="103" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="9" fill="#0B4A6F">3</text>
      <text x="100" y="122" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="9" fill="#0B4A6F">6</text>
      <text x="80" y="103" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="9" fill="#0B4A6F">9</text>
      <g stroke="#00ACC1" strokeWidth="1.2" strokeLinecap="round" opacity=".75">
        <path d="M110 74 l1 -2" />
        <path d="M124 88 l2 -1" />
        <path d="M124 112 l2 1" />
        <path d="M110 126 l1 2" />
        <path d="M90 126 l-1 2" />
        <path d="M76 112 l-2 1" />
        <path d="M76 88 l-2 -1" />
        <path d="M90 74 l-1 -2" />
      </g>
      <line x1="100" y1="100" x2="86" y2="86" stroke="#FF5252" strokeWidth="3" strokeLinecap="round" />
      <line x1="100" y1="100" x2="115" y2="92" stroke="#0B4A6F" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="100" cy="100" r="3.5" fill="#FFEB3B" stroke="#0B4A6F" strokeWidth="1.6" />
      <line x1="80" y1="130" x2="74" y2="138" stroke="#0B4A6F" strokeWidth="3" strokeLinecap="round" />
      <line x1="120" y1="130" x2="126" y2="138" stroke="#0B4A6F" strokeWidth="3" strokeLinecap="round" />
      <polygon points="48,62 50,66 54,68 50,70 48,74 46,70 42,68 46,66" fill="#FFEB3B" opacity="0.8" />
      <polygon points="152,62 154,66 158,68 154,70 152,74 150,70 146,68 150,66" fill="#FFEB3B" opacity="0.6" />
    </g>
    <text x="100" y="178" fontSize="14" fontFamily="'Fredoka','Baloo 2',sans-serif" fontWeight="700" fill="#00ACC1" textAnchor="middle" dominantBaseline="central">Clock &amp; Time</text>
  </svg>
);
