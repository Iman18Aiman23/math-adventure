export const QuranIcon = ({ size = 200, className }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" className={className}>
    <defs>
      <radialGradient id="qHead" cx="25%" cy="25%" r="75%">
        <stop offset="0%" stopColor="#FFF7D6" />
        <stop offset="50%" stopColor="#FDD97A" />
        <stop offset="100%" stopColor="#D4960A" />
      </radialGradient>
      <radialGradient id="qFace" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#D4960A" />
        <stop offset="100%" stopColor="#92400E" />
      </radialGradient>
      <linearGradient id="qPageLeft" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF8E1" />
        <stop offset="80%" stopColor="#FDE68A" />
        <stop offset="100%" stopColor="#EAB308" />
      </linearGradient>
      <linearGradient id="qPageRight" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFF8E1" />
        <stop offset="80%" stopColor="#FDE68A" />
        <stop offset="100%" stopColor="#EAB308" />
      </linearGradient>
      <linearGradient id="qRibbon" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#166534" />
        <stop offset="100%" stopColor="#14532D" />
      </linearGradient>
      <filter id="qGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#D4960A" floodOpacity="0.4" />
      </filter>
    </defs>
    <rect x="10" y="10" width="180" height="180" rx="30" ry="30" fill="none" stroke="#D4960A" strokeWidth="4" />
    <line x1="100" y1="12" x2="100" y2="32" stroke="#FFF7D6" strokeWidth="4" strokeLinecap="round" />
    <circle cx="100" cy="8" r="8" fill="#FFEB3B" filter="url(#qGlow)" />
    <circle cx="100" cy="8" r="3" fill="#FFF" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="url(#qHead)" filter="url(#qGlow)" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="none" stroke="#FFF7D6" strokeWidth="3" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="url(#qHead)" filter="url(#qGlow)" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="none" stroke="#FFF7D6" strokeWidth="2" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="url(#qHead)" filter="url(#qGlow)" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="none" stroke="#FFF7D6" strokeWidth="2" />
    <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="url(#qFace)" />
    <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="none" stroke="#FDD97A" strokeWidth="2" opacity="0.5" />
    { /* Rehal (wooden book stand) */ }
    <path d="M58 132 L68 108 L74 108 L66 132 Z" fill="#8B5E3C" opacity="0.8" />
    <path d="M58 132 L68 108 Q64 104 62 104 L54 132 Z" fill="#6B3F1A" opacity="0.6" />
    <path d="M142 132 L132 108 L126 108 L134 132 Z" fill="#8B5E3C" opacity="0.8" />
    <path d="M142 132 L132 108 Q136 104 138 104 L146 132 Z" fill="#6B3F1A" opacity="0.6" />
    { /* Book cover edges */ }
    <path d="M60 76 Q80 70 99 76 L99 124 Q80 118 60 124 Z" fill="#5B3A0A" />
    <path d="M101 76 Q120 70 140 76 L140 124 Q120 118 101 124 Z" fill="#5B3A0A" />
    { /* Left pages stack */ }
    <path d="M62 78 Q80 72 99 78 L99 122 Q80 116 62 122 Z" fill="#B8860B" />
    <path d="M64 80 Q80 74 99 80 L99 120 Q80 114 64 120 Z" fill="#D4A017" />
    { /* Left page */ }
    <path d="M66 82 Q82 76 99 82 L99 118 Q82 112 66 118 Z" fill="url(#qPageLeft)" stroke="#B8860B" strokeWidth="1" />
    { /* Right pages stack */ }
    <path d="M101 78 Q120 72 138 78 L138 122 Q120 116 101 122 Z" fill="#B8860B" />
    <path d="M101 80 Q120 74 136 80 L136 120 Q120 114 101 120 Z" fill="#D4A017" />
    { /* Right page */ }
    <path d="M101 82 Q118 76 134 82 L134 118 Q118 112 101 118 Z" fill="url(#qPageRight)" stroke="#B8860B" strokeWidth="1" />
    { /* Spine shadow */ }
    <rect x="97" y="82" width="6" height="36" fill="#5B3A0A" opacity="0.3" rx="1" />
    { /* Gold ornamental borders */ }
    <rect x="70" y="87" width="25" height="26" rx="3" fill="none" stroke="#B8860B" strokeWidth="1.5" opacity="0.8" />
    <rect x="72" y="89" width="21" height="22" rx="2" fill="none" stroke="#D4A017" strokeWidth="0.8" opacity="0.6" />
    <rect x="105" y="87" width="25" height="26" rx="3" fill="none" stroke="#B8860B" strokeWidth="1.5" opacity="0.8" />
    <rect x="107" y="89" width="21" height="22" rx="2" fill="none" stroke="#D4A017" strokeWidth="0.8" opacity="0.6" />
    { /* Arabic text lines - left page */ }
    <line x1="74" y1="94" x2="91" y2="93" stroke="#5B3A0A" strokeWidth="1.8" opacity="0.8" />
    <circle cx="93" cy="93" r="1.5" fill="#B8860B" />
    <line x1="74" y1="100" x2="91" y2="99" stroke="#5B3A0A" strokeWidth="1.8" opacity="0.8" />
    <circle cx="88" cy="99" r="1.5" fill="#B8860B" />
    <line x1="78" y1="106" x2="91" y2="105" stroke="#5B3A0A" strokeWidth="1.8" opacity="0.8" />
    { /* Arabic text lines - right page (Bismillah at top) */ }
    <path d="M107 92 Q112 90 117 92 Q122 90 127 92" fill="none" stroke="#5B3A0A" strokeWidth="2" opacity="0.9" />
    <line x1="107" y1="99" x2="126" y2="98" stroke="#5B3A0A" strokeWidth="1.8" opacity="0.8" />
    <circle cx="128" cy="98" r="1.5" fill="#B8860B" />
    <line x1="107" y1="105" x2="126" y2="104" stroke="#5B3A0A" strokeWidth="1.8" opacity="0.8" />
    { /* Green ribbon bookmark */ }
    <path d="M99 118 L99 134 L103 131 L107 134 L107 118 Z" fill="url(#qRibbon)" />
    { /* Illuminated corner ornaments */ }
    <circle cx="69" cy="86" r="3" fill="#FFD700" opacity="0.7" />
    <circle cx="95" cy="86" r="3" fill="#FFD700" opacity="0.7" />
    <circle cx="105" cy="86" r="3" fill="#FFD700" opacity="0.7" />
    <circle cx="131" cy="86" r="3" fill="#FFD700" opacity="0.7" />
    { /* Sparkle stars */ }
    <polygon points="50,64 52,68 56,70 52,72 50,76 48,72 44,70 48,68" fill="#FFEB3B" opacity="0.9" />
    <polygon points="150,64 152,68 156,70 152,72 150,76 148,72 144,70 148,68" fill="#FFEB3B" opacity="0.7" />
    <text x="100" y="178" fontSize="13" fontFamily="'Fredoka','Baloo 2',sans-serif" fontWeight="700" fill="#D4960A" textAnchor="middle" dominantBaseline="central">Al-Quran</text>
  </svg>
);

export const AkidahIcon = ({ size = 200, className }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" className={className}>
    <defs>
      <radialGradient id="aHead" cx="25%" cy="25%" r="75%">
        <stop offset="0%" stopColor="#D6F5DD" />
        <stop offset="50%" stopColor="#8AD9A8" />
        <stop offset="100%" stopColor="#2A9A6C" />
      </radialGradient>
      <radialGradient id="aFace" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#2A9A6C" />
        <stop offset="100%" stopColor="#065F46" />
      </radialGradient>
      <linearGradient id="aSky" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,215,0,.25)" />
        <stop offset="40%" stopColor="rgba(255,215,0,.1)" />
        <stop offset="100%" stopColor="rgba(255,255,255,.05)" />
      </linearGradient>
      <linearGradient id="aDomeGold" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="40%" stopColor="#DAA520" />
        <stop offset="100%" stopColor="#B8860B" />
      </linearGradient>
      <linearGradient id="aWall" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,.4)" />
        <stop offset="100%" stopColor="rgba(255,255,255,.2)" />
      </linearGradient>
      <linearGradient id="aBase" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#22C55E" />
        <stop offset="100%" stopColor="#15803D" />
      </linearGradient>
      <linearGradient id="aMinaret" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FEF3C7" />
        <stop offset="50%" stopColor="#D97706" />
        <stop offset="100%" stopColor="#B45309" />
      </linearGradient>
      <radialGradient id="aCrescent" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#FFD60A" />
        <stop offset="100%" stopColor="#FF8C00" />
      </radialGradient>
      <filter id="aGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#2A9A6C" floodOpacity="0.4" />
      </filter>
    </defs>
    <rect x="10" y="10" width="180" height="180" rx="30" ry="30" fill="none" stroke="#2A9A6C" strokeWidth="4" />
    <line x1="100" y1="12" x2="100" y2="32" stroke="#D6F5DD" strokeWidth="4" strokeLinecap="round" />
    <circle cx="100" cy="8" r="8" fill="#FFEB3B" filter="url(#aGlow)" />
    <circle cx="100" cy="8" r="3" fill="#FFF" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="url(#aHead)" filter="url(#aGlow)" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="none" stroke="#D6F5DD" strokeWidth="3" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="url(#aHead)" filter="url(#aGlow)" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="none" stroke="#D6F5DD" strokeWidth="2" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="url(#aHead)" filter="url(#aGlow)" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="none" stroke="#D6F5DD" strokeWidth="2" />
    <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="url(#aFace)" />
    <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="none" stroke="#8AD9A8" strokeWidth="2" opacity="0.5" />
    { /* Sky glow */ }
    <rect x="42" y="56" width="116" height="88" rx="28" fill="url(#aSky)" />
    { /* Base of mosque */ }
    <rect x="62" y="116" width="76" height="18" rx="5" fill="url(#aBase)" stroke="#166534" strokeWidth="1" />
    { /* Main wall */ }
    <rect x="70" y="86" width="60" height="30" rx="3" fill="url(#aWall)" stroke="rgba(255,255,255,.25)" strokeWidth="1" />
    { /* Wall decorative band */ }
    <rect x="70" y="100" width="60" height="4" fill="#D97706" opacity="0.6" />
    { /* Entrance arch */ }
    <path d="M88 116 L88 104 Q88 94 100 94 Q112 94 112 104 L112 116 Z" fill="rgba(255,255,255,.5)" stroke="rgba(255,255,255,.3)" strokeWidth="1" />
    { /* Main dome - gold */ }
    <path d="M72 86 Q72 58 100 52 Q128 58 128 86 Z" fill="url(#aDomeGold)" stroke="#B8860B" strokeWidth="1" />
    { /* Dome highlight */ }
    <path d="M82 64 Q86 58 100 55 Q114 58 118 64" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="1.5" opacity="0.7" />
    { /* Spire */ }
    <rect x="98" y="48" width="4" height="6" fill="#FFD700" rx="1" />
    <circle cx="100" cy="47" r="3" fill="#FFD700" />
    { /* Crescent on dome */ }
    <path d="M94 54 Q100 48 106 52 Q102 50 98 52 Q94 50 94 54 Z" fill="#FF8C00" />
    { /* Left minaret */ }
    <rect x="58" y="82" width="10" height="52" rx="3" fill="url(#aMinaret)" />
    <rect x="56" y="82" width="14" height="5" rx="2" fill="#FEF3C7" />
    <rect x="57" y="92" width="12" height="3" rx="1" fill="#D97706" opacity="0.7" />
    <rect x="57" y="100" width="12" height="3" rx="1" fill="#D97706" opacity="0.7" />
    <rect x="58" y="130" width="10" height="4" rx="1" fill="#FEF3C7" />
    { /* Left minaret crescent */ }
    <path d="M61 80 Q63 76 66 78 Q63 77 62 78 Q61 77 61 80 Z" fill="#FFD60A" />
    { /* Right minaret */ }
    <rect x="132" y="82" width="10" height="52" rx="3" fill="url(#aMinaret)" />
    <rect x="130" y="82" width="14" height="5" rx="2" fill="#FEF3C7" />
    <rect x="131" y="92" width="12" height="3" rx="1" fill="#D97706" opacity="0.7" />
    <rect x="131" y="100" width="12" height="3" rx="1" fill="#D97706" opacity="0.7" />
    <rect x="132" y="130" width="10" height="4" rx="1" fill="#FEF3C7" />
    { /* Right minaret crescent */ }
    <path d="M135 80 Q137 76 140 78 Q137 77 136 78 Q135 77 135 80 Z" fill="#FFD60A" />
    { /* Colored windows */ }
    <circle cx="86" cy="98" r="3" fill="#60A5FA" stroke="rgba(255,255,255,.3)" strokeWidth="0.8" />
    <circle cx="114" cy="98" r="3" fill="#60A5FA" stroke="rgba(255,255,255,.3)" strokeWidth="0.8" />
    <circle cx="100" cy="106" r="2.5" fill="#F87171" stroke="rgba(255,255,255,.3)" strokeWidth="0.8" />
    { /* Decorative arch pattern on wall */ }
    <path d="M74 86 L74 100 L80 100 L80 86" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="0.8" />
    <path d="M120 86 L120 100 L126 100 L126 86" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="0.8" />
    { /* Stars */ }
    <polygon points="50,66 52,70 56,72 52,74 50,78 48,74 44,72 48,70" fill="#FFEB3B" opacity="0.8" />
    <polygon points="148,66 150,70 154,72 150,74 148,78 146,74 142,72 146,70" fill="#FFEB3B" opacity="0.6" />
    <circle cx="144" cy="70" r="1.5" fill="#60A5FA" opacity="0.7" />
    <circle cx="56" cy="72" r="1.2" fill="#F87171" opacity="0.7" />
    <circle cx="140" cy="78" r="1" fill="#FFEB3B" opacity="0.5" />
    <circle cx="62" cy="68" r="1" fill="#A78BFA" opacity="0.6" />
    <text x="100" y="178" fontSize="14" fontFamily="'Fredoka','Baloo 2',sans-serif" fontWeight="700" fill="#2A9A6C" textAnchor="middle" dominantBaseline="central">Akidah</text>
  </svg>
);

export const IbadahIcon = ({ size = 200, className }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" className={className}>
    <defs>
      <radialGradient id="iHead" cx="25%" cy="25%" r="75%">
        <stop offset="0%" stopColor="#D6EEFF" />
        <stop offset="50%" stopColor="#6BAEE8" />
        <stop offset="100%" stopColor="#2563EB" />
      </radialGradient>
      <radialGradient id="iFace" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#2563EB" />
        <stop offset="100%" stopColor="#1E40AF" />
      </radialGradient>
      <linearGradient id="iMat" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,.25)" />
        <stop offset="50%" stopColor="rgba(255,255,255,.4)" />
        <stop offset="100%" stopColor="rgba(255,255,255,.2)" />
      </linearGradient>
      <linearGradient id="iPageLeft" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF8E1" />
        <stop offset="80%" stopColor="#FDE68A" />
        <stop offset="100%" stopColor="#EAB308" />
      </linearGradient>
      <linearGradient id="iPageRight" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFF8E1" />
        <stop offset="80%" stopColor="#FDE68A" />
        <stop offset="100%" stopColor="#EAB308" />
      </linearGradient>
      <linearGradient id="iRibbon" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#166534" />
        <stop offset="100%" stopColor="#14532D" />
      </linearGradient>
      <filter id="iGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#2563EB" floodOpacity="0.4" />
      </filter>
    </defs>
    <rect x="10" y="10" width="180" height="180" rx="30" ry="30" fill="none" stroke="#2563EB" strokeWidth="4" />
    <line x1="100" y1="12" x2="100" y2="32" stroke="#D6EEFF" strokeWidth="4" strokeLinecap="round" />
    <circle cx="100" cy="8" r="8" fill="#FFEB3B" filter="url(#iGlow)" />
    <circle cx="100" cy="8" r="3" fill="#FFF" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="url(#iHead)" filter="url(#iGlow)" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="none" stroke="#D6EEFF" strokeWidth="3" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="url(#iHead)" filter="url(#iGlow)" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="none" stroke="#D6EEFF" strokeWidth="2" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="url(#iHead)" filter="url(#iGlow)" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="none" stroke="#D6EEFF" strokeWidth="2" />
    <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="url(#iFace)" />
    <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="none" stroke="#6BAEE8" strokeWidth="2" opacity="0.5" />
    { /* Al-Quran & Tajwid inner icon (original Y centered at 100) */ }
    <g>
      <path d="M58 132 L68 108 L74 108 L66 132 Z" fill="#8B5E3C" opacity="0.8" />
      <path d="M58 132 L68 108 Q64 104 62 104 L54 132 Z" fill="#6B3F1A" opacity="0.6" />
      <path d="M142 132 L132 108 L126 108 L134 132 Z" fill="#8B5E3C" opacity="0.8" />
      <path d="M142 132 L132 108 Q136 104 138 104 L146 132 Z" fill="#6B3F1A" opacity="0.6" />
      <path d="M60 76 Q80 70 99 76 L99 124 Q80 118 60 124 Z" fill="#5B3A0A" />
      <path d="M101 76 Q120 70 140 76 L140 124 Q120 118 101 124 Z" fill="#5B3A0A" />
      <path d="M62 78 Q80 72 99 78 L99 122 Q80 116 62 122 Z" fill="#B8860B" />
      <path d="M64 80 Q80 74 99 80 L99 120 Q80 114 64 120 Z" fill="#D4A017" />
      <path d="M66 82 Q82 76 99 82 L99 118 Q82 112 66 118 Z" fill="url(#iPageLeft)" stroke="#B8860B" strokeWidth="1" />
      <path d="M101 78 Q120 72 138 78 L138 122 Q120 116 101 122 Z" fill="#B8860B" />
      <path d="M101 80 Q120 74 136 80 L136 120 Q120 114 101 120 Z" fill="#D4A017" />
      <path d="M101 82 Q118 76 134 82 L134 118 Q118 112 101 118 Z" fill="url(#iPageRight)" stroke="#B8860B" strokeWidth="1" />
      <rect x="97" y="82" width="6" height="36" fill="#5B3A0A" opacity="0.3" rx="1" />
      <rect x="70" y="87" width="25" height="26" rx="3" fill="none" stroke="#B8860B" strokeWidth="1.5" opacity="0.8" />
      <rect x="72" y="89" width="21" height="22" rx="2" fill="none" stroke="#D4A017" strokeWidth="0.8" opacity="0.6" />
      <rect x="105" y="87" width="25" height="26" rx="3" fill="none" stroke="#B8860B" strokeWidth="1.5" opacity="0.8" />
      <rect x="107" y="89" width="21" height="22" rx="2" fill="none" stroke="#D4A017" strokeWidth="0.8" opacity="0.6" />
      <line x1="74" y1="94" x2="91" y2="93" stroke="#5B3A0A" strokeWidth="1.8" opacity="0.8" />
      <circle cx="93" cy="93" r="1.5" fill="#B8860B" />
      <line x1="74" y1="100" x2="91" y2="99" stroke="#5B3A0A" strokeWidth="1.8" opacity="0.8" />
      <circle cx="88" cy="99" r="1.5" fill="#B8860B" />
      <line x1="78" y1="106" x2="91" y2="105" stroke="#5B3A0A" strokeWidth="1.8" opacity="0.8" />
      <path d="M107 92 Q112 90 117 92 Q122 90 127 92" fill="none" stroke="#5B3A0A" strokeWidth="2" opacity="0.9" />
      <line x1="107" y1="99" x2="126" y2="98" stroke="#5B3A0A" strokeWidth="1.8" opacity="0.8" />
      <circle cx="128" cy="98" r="1.5" fill="#B8860B" />
      <line x1="107" y1="105" x2="126" y2="104" stroke="#5B3A0A" strokeWidth="1.8" opacity="0.8" />
      <path d="M99 118 L99 134 L103 131 L107 134 L107 118 Z" fill="url(#iRibbon)" />
      <circle cx="69" cy="86" r="3" fill="#FFD700" opacity="0.7" />
      <circle cx="95" cy="86" r="3" fill="#FFD700" opacity="0.7" />
      <circle cx="105" cy="86" r="3" fill="#FFD700" opacity="0.7" />
      <circle cx="131" cy="86" r="3" fill="#FFD700" opacity="0.7" />
    </g>
    { /* 🤲 emoji at bottom of Quran (z-index 999) */ }
    <text x="100" y="130" fontSize="28" fontFamily="'Segoe UI Emoji','Apple Color Emoji','Noto Color Emoji',sans-serif" textAnchor="middle" dominantBaseline="central">🤲</text>
    { /* Sparkles */ }
    <polygon points="52,68 53.5,71 57,72 54,74 52,78 50,74 47,72 50.5,71" fill="#FFEB3B" opacity="0.7" />
    <polygon points="148,68 149.5,71 153,72 150,74 148,78 146,74 143,72 146.5,71" fill="#FFEB3B" opacity="0.5" />
    <text x="100" y="178" fontSize="14" fontFamily="'Fredoka','Baloo 2',sans-serif" fontWeight="700" fill="#2563EB" textAnchor="middle" dominantBaseline="central">Ibadah</text>
  </svg>
);

export const SirahIcon = ({ size = 200, className }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" className={className}>
    <defs>
      <radialGradient id="sHead" cx="25%" cy="25%" r="75%">
        <stop offset="0%" stopColor="#E7D9FF" />
        <stop offset="50%" stopColor="#B79CFF" />
        <stop offset="100%" stopColor="#7A55E0" />
      </radialGradient>
      <radialGradient id="sFace" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#7A55E0" />
        <stop offset="100%" stopColor="#4C1D95" />
      </radialGradient>
      <linearGradient id="sSky" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="rgba(251,191,36,.25)" />
        <stop offset="50%" stopColor="rgba(251,191,36,.1)" />
        <stop offset="100%" stopColor="rgba(255,255,255,.05)" />
      </linearGradient>
      <linearGradient id="sGreenDome" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#4ADE80" />
        <stop offset="30%" stopColor="#22C55E" />
        <stop offset="100%" stopColor="#166534" />
      </linearGradient>
      <linearGradient id="sWall" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,.4)" />
        <stop offset="100%" stopColor="rgba(255,255,255,.15)" />
      </linearGradient>
      <linearGradient id="sBase" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <linearGradient id="sMinaret" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FEF3C7" />
        <stop offset="50%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <linearGradient id="sPalm" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4ADE80" />
        <stop offset="100%" stopColor="#166534" />
      </linearGradient>
      <radialGradient id="sMoon" cx="35%" cy="35%" r="70%">
        <stop offset="0%" stopColor="#FFD60A" />
        <stop offset="100%" stopColor="#FF8C00" />
      </radialGradient>
      <filter id="sGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#7A55E0" floodOpacity="0.4" />
      </filter>
    </defs>
    <rect x="10" y="10" width="180" height="180" rx="30" ry="30" fill="none" stroke="#7A55E0" strokeWidth="4" />
    <line x1="100" y1="12" x2="100" y2="32" stroke="#E7D9FF" strokeWidth="4" strokeLinecap="round" />
    <circle cx="100" cy="8" r="8" fill="#FFEB3B" filter="url(#sGlow)" />
    <circle cx="100" cy="8" r="3" fill="#FFF" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="url(#sHead)" filter="url(#sGlow)" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="none" stroke="#E7D9FF" strokeWidth="3" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="url(#sHead)" filter="url(#sGlow)" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="none" stroke="#E7D9FF" strokeWidth="2" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="url(#sHead)" filter="url(#sGlow)" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="none" stroke="#E7D9FF" strokeWidth="2" />
    <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="url(#sFace)" />
    <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="none" stroke="#B79CFF" strokeWidth="2" opacity="0.5" />
    { /* Sky glow */ }
    <rect x="42" y="56" width="116" height="88" rx="28" fill="url(#sSky)" />
    { /* Masjid Nabawi - Green Dome */ }
    { /* Base platform */ }
    <rect x="64" y="126" width="72" height="8" rx="3" fill="url(#sBase)" stroke="#B45309" strokeWidth="0.8" />
    { /* Base wall */ }
    <rect x="68" y="108" width="64" height="18" rx="3" fill="url(#sWall)" stroke="rgba(255,255,255,.2)" strokeWidth="0.8" />
    { /* Wall decorative band */ }
    <rect x="68" y="114" width="64" height="3" fill="#D97706" opacity="0.6" />
    { /* Dome drum (octagonal base of dome) */ }
    <rect x="76" y="96" width="48" height="12" rx="2" fill="rgba(255,255,255,.25)" stroke="rgba(255,255,255,.15)" strokeWidth="0.8" />
    { /* The iconic green dome */ }
    <path d="M70 96 Q70 62 100 56 Q130 62 130 96 Z" fill="url(#sGreenDome)" stroke="rgba(255,255,255,.3)" strokeWidth="1" />
    { /* Dome highlight */ }
    <path d="M84 68 Q88 62 100 60 Q112 62 116 68" fill="none" stroke="rgba(255,255,255,.45)" strokeWidth="2" opacity="0.6" />
    { /* Dome shadow */ }
    <path d="M90 94 Q100 88 110 94" fill="none" stroke="rgba(0,0,0,.15)" strokeWidth="2" opacity="0.4" />
    { /* Gold spire */ }
    <rect x="98" y="52" width="4" height="6" rx="2" fill="#FFD700" />
    <circle cx="100" cy="51" r="3" fill="#FFD700" />
    { /* Minaret (right) */ }
    <rect x="130" y="80" width="8" height="54" rx="2" fill="url(#sMinaret)" />
    <rect x="128" y="80" width="12" height="4" rx="1.5" fill="#FEF3C7" />
    <rect x="129" y="88" width="10" height="3" rx="1" fill="#D97706" opacity="0.7" />
    <rect x="129" y="96" width="10" height="3" rx="1" fill="#D97706" opacity="0.7" />
    <rect x="129" y="130" width="10" height="4" rx="1" fill="#FEF3C7" />
    <path d="M132 78 Q134 74 136 78" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="1.5" />
    { /* Entrance archway */ }
    <path d="M92 132 L92 116 Q92 108 100 108 Q108 108 108 116 L108 132 Z" fill="rgba(255,255,255,.4)" stroke="rgba(255,255,255,.25)" strokeWidth="1" />
    { /* Green curtain/door */ }
    <path d="M96 132 L96 116 Q96 112 100 112 Q104 112 104 116 L104 132 Z" fill="#166534" opacity="0.5" />
    { /* Cold windows */ }
    <circle cx="84" cy="120" r="2.5" fill="#60A5FA" stroke="rgba(255,255,255,.3)" strokeWidth="0.8" />
    <circle cx="116" cy="120" r="2.5" fill="#60A5FA" stroke="rgba(255,255,255,.3)" strokeWidth="0.8" />
    { /* Palm tree on the right */ }
    <path d="M 148 80 L 149 128" stroke="url(#sPalm)" strokeWidth="3" strokeLinecap="round" />
    { /* Palm fronds */ }
    <path d="M 148 84 Q 138 74 132 78" fill="none" stroke="url(#sPalm)" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M 148 84 Q 158 74 164 78" fill="none" stroke="url(#sPalm)" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M 148 92 Q 136 84 130 88" fill="none" stroke="url(#sPalm)" strokeWidth="2" strokeLinecap="round" />
    <path d="M 148 92 Q 160 84 166 88" fill="none" stroke="url(#sPalm)" strokeWidth="2" strokeLinecap="round" />
    <path d="M 148 100 Q 140 96 136 100" fill="none" stroke="url(#sPalm)" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M 148 100 Q 156 96 160 100" fill="none" stroke="url(#sPalm)" strokeWidth="1.8" strokeLinecap="round" />
    { /* Dates on palm */ }
    <circle cx="133" cy="82" r="2" fill="#D97706" opacity="0.8" />
    <circle cx="162" cy="82" r="2" fill="#D97706" opacity="0.8" />
    { /* Moon */ }
    <circle cx="60" cy="68" r="6" fill="url(#sMoon)" opacity="0.85" />
    <circle cx="58" cy="66" r="4.5" fill="#4C1D95" opacity="0.7" />
    { /* Stars */ }
    <polygon points="52,78 53.5,81 57,82 54,84 52,88 50,84 46.5,82 50.5,81" fill="#FFEB3B" opacity="0.6" />
    <polygon points="70,62 71.5,65 75,66 72,68 70,72 68,68 64.5,66 68.5,65" fill="#FFEB3B" opacity="0.5" />
    <circle cx="76" cy="74" r="1" fill="#FFEB3B" opacity="0.7" />
    <circle cx="134" cy="72" r="1.2" fill="#FFEB3B" opacity="0.5" />
    <text x="100" y="178" fontSize="14" fontFamily="'Fredoka','Baloo 2',sans-serif" fontWeight="700" fill="#7A55E0" textAnchor="middle" dominantBaseline="central">Sirah</text>
  </svg>
);

export const AdabIcon = ({ size = 200, className }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" className={className}>
    <defs>
      <radialGradient id="adHead" cx="25%" cy="25%" r="75%">
        <stop offset="0%" stopColor="#FFE9F3" />
        <stop offset="50%" stopColor="#FFBFDD" />
        <stop offset="100%" stopColor="#FF8CBF" />
      </radialGradient>
      <radialGradient id="adFace" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#FF8CBF" />
        <stop offset="100%" stopColor="#9F1239" />
      </radialGradient>

      <filter id="adGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#FF8CBF" floodOpacity="0.4" />
      </filter>
      <mask id="adMoonMask">
        <rect x="0" y="0" width="200" height="200" fill="white" />
        <circle cx="112" cy="82" r="12" fill="black" />
      </mask>
    </defs>
    <rect x="10" y="10" width="180" height="180" rx="30" ry="30" fill="none" stroke="#FF8CBF" strokeWidth="4" />
    <line x1="100" y1="12" x2="100" y2="32" stroke="#FFE9F3" strokeWidth="4" strokeLinecap="round" />
    <circle cx="100" cy="8" r="8" fill="#FFEB3B" filter="url(#adGlow)" />
    <circle cx="100" cy="8" r="3" fill="#FFF" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="url(#adHead)" filter="url(#adGlow)" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="none" stroke="#FFE9F3" strokeWidth="3" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="url(#adHead)" filter="url(#adGlow)" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="none" stroke="#FFE9F3" strokeWidth="2" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="url(#adHead)" filter="url(#adGlow)" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="none" stroke="#FFE9F3" strokeWidth="2" />
    <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="url(#adFace)" />
    <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="none" stroke="#FFBFDD" strokeWidth="2" opacity="0.5" />
    { /* Moon */ }
    <circle cx="100" cy="82" r="16" fill="#FFD700" mask="url(#adMoonMask)" filter="url(#adGlow)" />
    { /* Stars & dots */ }
    <circle cx="60" cy="72" r="2" fill="#FFEB3B" opacity="0.9" />
    <circle cx="72" cy="62" r="1.5" fill="#FFEB3B" opacity="0.7" />
    <circle cx="84" cy="66" r="1" fill="#FFEB3B" opacity="0.6" />
    <circle cx="118" cy="66" r="1.5" fill="#FFEB3B" opacity="0.8" />
    <circle cx="130" cy="74" r="2" fill="#FFEB3B" opacity="0.7" />
    <circle cx="140" cy="84" r="1" fill="#FFEB3B" opacity="0.5" />
    <circle cx="65" cy="92" r="1.5" fill="#FFEB3B" opacity="0.6" />
    { /* Handshake */ }
    <text x="100" y="124" fontSize="36" fontFamily="'Segoe UI Emoji','Apple Color Emoji','Noto Color Emoji',sans-serif" textAnchor="middle" dominantBaseline="central">🤝</text>
    <text x="100" y="178" fontSize="13" fontFamily="'Fredoka','Baloo 2',sans-serif" fontWeight="700" fill="#FF8CBF" textAnchor="middle" dominantBaseline="central">Adab & Akhlak</text>
  </svg>
);

export const JawiIcon = ({ size = 200, className }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" className={className}>
    <defs>
      <radialGradient id="jHead" cx="25%" cy="25%" r="75%">
        <stop offset="0%" stopColor="#D0F7FA" />
        <stop offset="50%" stopColor="#67D6E8" />
        <stop offset="100%" stopColor="#0891B2" />
      </radialGradient>
      <radialGradient id="jFace" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#0891B2" />
        <stop offset="100%" stopColor="#0C4A6E" />
      </radialGradient>
      <linearGradient id="jPage" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFF8E1" />
        <stop offset="100%" stopColor="#FFE0B2" />
      </linearGradient>
      <linearGradient id="jPen" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(255,255,255,.5)" />
        <stop offset="100%" stopColor="rgba(255,255,255,.2)" />
      </linearGradient>
      <filter id="jGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#0891B2" floodOpacity="0.4" />
      </filter>
    </defs>
    <rect x="10" y="10" width="180" height="180" rx="30" ry="30" fill="none" stroke="#0891B2" strokeWidth="4" />
    <line x1="100" y1="12" x2="100" y2="32" stroke="#D0F7FA" strokeWidth="4" strokeLinecap="round" />
    <circle cx="100" cy="8" r="8" fill="#FFEB3B" filter="url(#jGlow)" />
    <circle cx="100" cy="8" r="3" fill="#FFF" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="url(#jHead)" filter="url(#jGlow)" />
    <rect x="22" y="32" width="156" height="136" rx="42" ry="42" fill="none" stroke="#D0F7FA" strokeWidth="3" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="url(#jHead)" filter="url(#jGlow)" />
    <ellipse cx="15" cy="100" rx="12" ry="22" fill="none" stroke="#D0F7FA" strokeWidth="2" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="url(#jHead)" filter="url(#jGlow)" />
    <ellipse cx="185" cy="100" rx="12" ry="22" fill="none" stroke="#D0F7FA" strokeWidth="2" />
    <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="url(#jFace)" />
    <rect x="38" y="52" width="124" height="96" rx="32" ry="32" fill="none" stroke="#67D6E8" strokeWidth="2" opacity="0.5" />
    { /* Open book with Jawi text */ }
    { /* Book cover */ }
    <path d="M56 78 Q80 72 100 78 L100 122 Q80 116 56 122 Z" fill="#0C4A6E" />
    <path d="M100 78 Q120 72 144 78 L144 122 Q120 116 100 122 Z" fill="#0C4A6E" />
    { /* Left page */ }
    <path d="M60 82 Q82 76 100 82 L100 118 Q82 112 60 118 Z" fill="url(#jPage)" stroke="#0891B2" strokeWidth="0.8" />
    { /* Right page */ }
    <path d="M100 82 Q118 76 140 82 L140 118 Q118 112 100 118 Z" fill="url(#jPage)" stroke="#0891B2" strokeWidth="0.8" />
    { /* Spine highlight */ }
    <rect x="97" y="82" width="6" height="36" fill="rgba(8,145,178,.15)" rx="1" />
    { /* Jawi text - Left page: "جاوي" (Jawi) */ }
    <text x="80" y="100" textAnchor="middle" fontFamily="'Amiri Quran','Scheherazade New',serif" fontWeight="600" fontSize="20" fill="#064E7A">جاوي</text>
    <path d="M 64 110 Q 72 108 80 110 Q 88 108 96 110" fill="none" stroke="rgba(8,145,178,.15)" strokeWidth="0.8" strokeDasharray="2 2" />
    { /* Jawi text - Right page: "باچ" (Baca) */ }
    <text x="120" y="100" textAnchor="middle" fontFamily="'Amiri Quran','Scheherazade New',serif" fontWeight="600" fontSize="20" fill="#064E7A">باچ</text>
    <path d="M 104 110 Q 112 108 120 110 Q 128 108 136 110" fill="none" stroke="rgba(8,145,178,.15)" strokeWidth="0.8" strokeDasharray="2 2" />
    { /* Decorative title line on left page */ }
    <path d="M 66 88 Q 72 86 80 88 Q 88 86 94 88" fill="none" stroke="#0891B2" strokeWidth="1.5" opacity="0.5" />
    { /* Decorative title line on right page */ }
    <path d="M 106 88 Q 112 86 120 88 Q 128 86 134 88" fill="none" stroke="#0891B2" strokeWidth="1.5" opacity="0.5" />
    { /* Bamboo pen (kalam) resting diagonally */ }
    <g transform="rotate(25 138 92)">
      <rect x="128" y="90" width="22" height="4" rx="2" fill="url(#jPen)" stroke="rgba(255,255,255,.3)" strokeWidth="0.5" />
      <path d="M150 90 L155 92 L150 94 Z" fill="rgba(255,255,255,.5)" />
      <path d="M128 90 L125 88 Q124 92 125 94 Z" fill="rgba(255,255,255,.25)" />
    </g>
    { /* Ink pot */ }
    <ellipse cx="68" cy="122" rx="5" ry="3" fill="rgba(255,255,255,.25)" />
    <rect x="65" y="118" width="6" height="5" rx="2" fill="rgba(255,255,255,.2)" />
    { /* Stars */ }
    <polygon points="52,66 53.5,69 57,70 54,72 52,76 50,72 47,70 50.5,69" fill="#FFEB3B" opacity="0.7" />
    <polygon points="148,66 149.5,69 153,70 150,72 148,76 146,72 143,70 146.5,69" fill="#FFEB3B" opacity="0.5" />
    <text x="100" y="178" fontSize="13" fontFamily="'Fredoka','Baloo 2',sans-serif" fontWeight="700" fill="#0891B2" textAnchor="middle" dominantBaseline="central">Celik Jawi</text>
  </svg>
);

const ICONS = {
  'al-quran':  QuranIcon,
  'akidah':    AkidahIcon,
  'ibadah':    IbadahIcon,
  'sirah':     SirahIcon,
  'adab':      AdabIcon,
  'jawi':      JawiIcon,
};

export default ICONS;
