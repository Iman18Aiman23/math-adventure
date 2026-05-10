import React, { useState } from 'react';

export function LearnIcon() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <svg
      viewBox="0 0 200 200"
      width="52"
      height="52"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: 'pointer' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>{`
          @keyframes wiggle { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-7deg); } 75% { transform: rotate(7deg); } }
          @keyframes blinkEyes { 0%, 92%, 100% { transform: scaleY(1); } 96% { transform: scaleY(0.08); } }
          @keyframes pulseStar { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.3); opacity: 0.7; } }
          .svg-hover .wg { animation: wiggle 0.8s ease-in-out infinite; transform-box: fill-box; transform-origin: center top; }
          .svg-hover .eyes { animation: blinkEyes 2s ease-in-out infinite; transform-origin: center; }
          .svg-hover .ps { animation: pulseStar 0.8s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
          .svg-hover .ps2 { animation: pulseStar 0.8s ease-in-out infinite 0.4s; transform-box: fill-box; transform-origin: center; }
        `}</style>
      </defs>
      <g className={isHovered ? 'svg-hover' : ''}>
        {/* Papan atas topi */}
        <path d="M40,110 L100,80 L160,110 L100,140 Z" fill="#4A6FA5"/>
        {/* Badan topi */}
        <path d="M55,112 L55,130 C55,145 145,145 145,130 L145,112 L100,137 Z" fill="#3B5998"/>
        {/* Kilauan */}
        <path d="M65,115 C65,125 75,130 80,125" fill="none" stroke="#6B8FC7" strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
        {/* Tassel / Tali */}
        <g className="wg">
          <circle cx="140" cy="107" r="5" fill="#FFD93D"/>
          <line x1="140" y1="112" x2="135" y2="150" stroke="#F4C430" strokeWidth="3" strokeLinecap="round"/>
          <rect x="130" y="148" width="10" height="18" rx="3" fill="#FFD93D"/>
        </g>
        {/* Muka pada badan topi */}
        <g className="eyes">
          <circle cx="88" cy="125" r="4.5" fill="#FFF"/>
          <circle cx="88" cy="125" r="2.5" fill="#333"/>
          <circle cx="112" cy="125" r="4.5" fill="#FFF"/>
          <circle cx="112" cy="125" r="2.5" fill="#333"/>
          <circle cx="89" cy="124" r="1" fill="#FFF"/>
          <circle cx="113" cy="124" r="1" fill="#FFF"/>
        </g>
        {/* Pipi */}
        <circle cx="78" cy="135" r="5" fill="#8FAEE0" opacity="0.5"/>
        <circle cx="122" cy="135" r="5" fill="#8FAEE0" opacity="0.5"/>
        {/* Senyuman */}
        <path d="M92,135 Q100,143 108,135" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round"/>
        {/* Bintang ilmu */}
        <g className="ps"><polygon points="50,70 52,76 58,76 53,80 55,86 50,82 45,86 47,80 42,76 48,76" fill="#FFD93D"/></g>
        <g className="ps2"><polygon points="150,70 152,76 158,76 153,80 155,86 150,82 145,86 147,80 142,76 148,76" fill="#FFD93D"/></g>
      </g>
    </svg>
  );
}

export function LeaderboardIcon() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <svg
      viewBox="0 0 200 200"
      width="52"
      height="52"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: 'pointer' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>{`
          @keyframes blinkEyes { 0%, 92%, 100% { transform: scaleY(1); } 96% { transform: scaleY(0.08); } }
          @keyframes pulseStar { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.3); opacity: 0.7; } }
          @keyframes floatItem { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-5px) rotate(5deg); } }
          .svg-hover .eyes { animation: blinkEyes 2s ease-in-out infinite; transform-origin: center; }
          .svg-hover .ps { animation: pulseStar 0.8s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
          .svg-hover .ps2 { animation: pulseStar 0.8s ease-in-out infinite 0.4s; transform-box: fill-box; transform-origin: center; }
          .svg-hover .fl1 { animation: floatItem 1s ease-in-out infinite 0.6s; }
        `}</style>
      </defs>
      <g className={isHovered ? 'svg-hover' : ''}>
        <path d="M70,60 L70,110 C70,135 130,135 130,110 L130,60 Z" fill="#FFD080"/>
        <path d="M60,45 L60,110 C60,145 140,145 140,110 L140,45 Z" fill="#FFB347"/>
        <path d="M75,55 C72,75 74,95 80,105" fill="none" stroke="#FFE0A6" strokeWidth="5" strokeLinecap="round" opacity="0.5"/>
        <path d="M60,65 C30,65 30,110 60,110" fill="none" stroke="#E89F2C" strokeWidth="8" strokeLinecap="round"/>
        <path d="M140,65 C170,65 170,110 140,110" fill="none" stroke="#E89F2C" strokeWidth="8" strokeLinecap="round"/>
        <rect x="85" y="135" width="30" height="12" rx="3" fill="#E89F2C"/>
        <rect x="75" y="147" width="50" height="10" rx="4" fill="#E89F2C"/>
        <g className="eyes">
          <circle cx="88" cy="90" r="6" fill="#333"/><circle cx="112" cy="90" r="6" fill="#333"/>
          <circle cx="89.5" cy="88.5" r="2.5" fill="#FFF"/><circle cx="113.5" cy="88.5" r="2.5" fill="#FFF"/>
        </g>
        <circle cx="78" cy="105" r="7" fill="#FFD93D" opacity="0.5"/><circle cx="122" cy="105" r="7" fill="#FFD93D" opacity="0.5"/>
        <path d="M92,104 Q100,116 108,104" fill="none" stroke="#333" strokeWidth="2.5" strokeLinecap="round"/>
        <g className="ps"><polygon points="100,15 105,28 118,28 108,36 112,50 100,42 88,50 92,36 82,28 95,28" fill="#FFD93D"/></g>
        <g className="ps2"><polygon points="45,40 46.5,45 51,45 47.5,48 48.5,53 45,50 41.5,53 42.5,48 39,45 43.5,45" fill="#FFD93D"/></g>
        <g className="fl1"><polygon points="155,40 156.5,45 161,45 157.5,48 158.5,53 155,50 151.5,53 152.5,48 149,45 153.5,45" fill="#FFD93D"/></g>
      </g>
    </svg>
  );
}

export function ProfileIcon() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <svg
      viewBox="0 0 200 200"
      width="52"
      height="52"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: 'pointer' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>{`
          @keyframes floatItem { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-5px) rotate(5deg); } }
          @keyframes blinkEyes { 0%, 92%, 100% { transform: scaleY(1); } 96% { transform: scaleY(0.08); } }
          @keyframes pulseStar { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.3); opacity: 0.7; } }
          .svg-hover .fl1 { animation: floatItem 1s ease-in-out infinite; }
          .svg-hover .eyes { animation: blinkEyes 2s ease-in-out infinite; transform-origin: center; }
          .svg-hover .ps { animation: pulseStar 0.8s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        `}</style>
      </defs>
      <g className={isHovered ? 'svg-hover' : ''}>
        {/* Klip kad atas */}
        <g className="fl1">
          <rect x="85" y="32" width="30" height="18" rx="4" fill="#2EC4B6"/>
          <circle cx="100" cy="32" r="9" fill="#2EC4B6"/>
          <circle cx="100" cy="32" r="5" fill="#E8FAF8"/>
        </g>
        {/* Badan Kad */}
        <rect x="50" y="45" width="100" height="120" rx="12" fill="#E0F7F5" stroke="#2EC4B6" strokeWidth="3"/>
        {/* Avatar bulat */}
        <circle cx="100" cy="95" r="25" fill="#FF9F1C"/>
        {/* Rambut avatar */}
        <path d="M75,88 C75,68 125,68 125,88 C125,80 115,72 100,72 C85,72 75,80 75,88 Z" fill="#333"/>
        {/* Muka pada avatar */}
        <g className="eyes">
          <circle cx="92" cy="92" r="3" fill="#333"/>
          <circle cx="108" cy="92" r="3" fill="#333"/>
          <circle cx="92.5" cy="91" r="1.2" fill="#FFF"/>
          <circle cx="108.5" cy="91" r="1.2" fill="#FFF"/>
        </g>
        <path d="M94,100 Q100,106 106,100" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
        {/* Garisan teks pada kad */}
        <line x1="70" y1="135" x2="130" y2="135" stroke="#2EC4B6" strokeWidth="4" strokeLinecap="round" opacity="0.5"/>
        <line x1="85" y1="148" x2="115" y2="148" stroke="#2EC4B6" strokeWidth="4" strokeLinecap="round" opacity="0.3"/>
        {/* Bintang */}
        <g className="ps"><polygon points="45,55 46.5,60 51,60 47.5,63 48.5,68 45,65 41.5,68 42.5,63 39,60 43.5,60" fill="#FFD93D"/></g>
      </g>
    </svg>
  );
}

export function AchievementIcon() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <svg
      viewBox="0 0 200 200"
      width="52"
      height="52"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: 'pointer' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>{`
          @keyframes sparkle { 0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; } 50% { transform: scale(1.3) rotate(15deg); opacity: 0.7; } }
          @keyframes floatMedal { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-6px) rotate(5deg); } }
          @keyframes blinkEyes { 0%, 92%, 100% { transform: scaleY(1); } 96% { transform: scaleY(0.08); } }
          .svg-hover .sp1 { animation: sparkle 0.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
          .svg-hover .sp2 { animation: sparkle 0.6s ease-in-out infinite 0.3s; transform-box: fill-box; transform-origin: center; }
          .svg-hover .fm { animation: floatMedal 1.2s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
          .svg-hover .eyes { animation: blinkEyes 2s ease-in-out infinite; transform-origin: center; }
        `}</style>
      </defs>
      <g className={isHovered ? 'svg-hover' : ''}>
        {/* Ribbon Left */}
        <rect x="40" y="20" width="18" height="70" rx="4" fill="#FF6B6B"/>
        {/* Ribbon Right */}
        <rect x="142" y="20" width="18" height="70" rx="4" fill="#FF6B6B"/>
        {/* Medal Body - Floating */}
        <g className="fm">
          {/* Outer Circle */}
          <circle cx="100" cy="95" r="48" fill="#FFD93D" stroke="#F4C430" strokeWidth="3"/>
          {/* Inner Circle */}
          <circle cx="100" cy="95" r="40" fill="#FFF8DC"/>
          {/* Inner Glow */}
          <circle cx="100" cy="95" r="35" fill="none" stroke="#FFE5A6" strokeWidth="2" opacity="0.6"/>
          {/* Trophy/Badge Shape */}
          <path d="M85,80 L115,80 L115,110 C115,125 100,130 100,130 C100,130 85,125 85,110 Z" fill="#FF9500"/>
          {/* Trophy Shine */}
          <ellipse cx="100" cy="85" rx="12" ry="8" fill="#FFD93D" opacity="0.6"/>
        </g>
        {/* Eyes on Medal */}
        <g className="eyes">
          <circle cx="92" cy="95" r="3.5" fill="#333"/>
          <circle cx="108" cy="95" r="3.5" fill="#333"/>
          <circle cx="92.8" cy="93.5" r="1.2" fill="#FFF"/>
          <circle cx="108.8" cy="93.5" r="1.2" fill="#FFF"/>
        </g>
        {/* Smile */}
        <path d="M94,105 Q100,110 106,105" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
        {/* Sparkles */}
        <g className="sp1"><polygon points="50,50 51.5,55 56,55 52.5,58 53.5,63 50,60 46.5,63 47.5,58 44,55 48.5,55" fill="#FFD93D"/></g>
        <g className="sp2"><polygon points="150,60 151.5,65 156,65 152.5,68 153.5,73 150,70 146.5,73 147.5,68 144,65 148.5,65" fill="#FF6B6B"/></g>
        {/* Crown on top */}
        <g>
          <polygon points="100,50 92,65 96,65 88,80 112,80 104,65 108,65" fill="#FFD93D" stroke="#F4C430" strokeWidth="1.5"/>
          <circle cx="88" cy="62" r="4" fill="#FF6B6B"/>
          <circle cx="100" cy="55" r="5" fill="#FF6B6B"/>
          <circle cx="112" cy="62" r="4" fill="#FF6B6B"/>
        </g>
      </g>
    </svg>
  );
}

export function LanguageIcon() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <svg
      viewBox="0 0 200 200"
      width="52"
      height="52"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: 'pointer' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>{`
          @keyframes wiggle { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-7deg); } 75% { transform: rotate(7deg); } }
          @keyframes blinkEyes { 0%, 92%, 100% { transform: scaleY(1); } 96% { transform: scaleY(0.08); } }
          @keyframes floatBubble { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-6px) scale(1.05); } }
          @keyframes swapBounce { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(5px); } }
          @keyframes swapBounceReverse { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(-5px); } }
          @keyframes pulseStar { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.3); opacity: 0.7; } }
          .svg-hover .wg { animation: wiggle 0.8s ease-in-out infinite; transform-box: fill-box; transform-origin: center top; }
          .svg-hover .eyes { animation: blinkEyes 2s ease-in-out infinite; transform-origin: center; }
          .svg-hover .bb { animation: floatBubble 1.2s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
          .svg-hover .bb2 { animation: floatBubble 1.2s ease-in-out infinite 0.4s; transform-box: fill-box; transform-origin: center; }
          .svg-hover .sw1 { animation: swapBounce 1s ease-in-out infinite; }
          .svg-hover .sw2 { animation: swapBounceReverse 1s ease-in-out infinite; }
          .svg-hover .ps { animation: pulseStar 0.8s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
          .svg-hover .ps2 { animation: pulseStar 0.8s ease-in-out infinite 0.4s; transform-box: fill-box; transform-origin: center; }
        `}</style>
      </defs>
      <g className={isHovered ? 'svg-hover' : ''}>
        {/* Globe */}
        <g className="wg">
          <circle cx="100" cy="110" r="45" fill="#5DADE2"/>
          <ellipse cx="100" cy="110" rx="45" ry="15" fill="none" stroke="#87CEEB" strokeWidth="1.5" opacity="0.6"/>
          <ellipse cx="100" cy="110" rx="45" ry="30" fill="none" stroke="#87CEEB" strokeWidth="1.5" opacity="0.4"/>
          <ellipse cx="100" cy="110" rx="18" ry="45" fill="none" stroke="#87CEEB" strokeWidth="1.5" opacity="0.5"/>
          <line x1="55" y1="110" x2="145" y2="110" stroke="#87CEEB" strokeWidth="1.5" opacity="0.4"/>
        </g>
        {/* Muka globe */}
        <g className="eyes">
          <circle cx="88" cy="108" r="4.5" fill="#333"/>
          <circle cx="112" cy="108" r="4.5" fill="#333"/>
          <circle cx="89.2" cy="106.5" r="1.8" fill="#FFF"/>
          <circle cx="113.2" cy="106.5" r="1.8" fill="#FFF"/>
        </g>
        <path d="M92,118 Q100,126 108,118" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
        {/* Buih EN */}
        <g className="bb sw1">
          <rect x="20" y="35" width="42" height="28" rx="8" fill="#FF6B6B"/>
          <polygon points="50,63 55,72 45,63" fill="#FF6B6B"/>
          <text x="41" y="54" fontSize="13" fill="#FFF" textAnchor="middle" fontWeight="bold" fontFamily="Fredoka One, sans-serif">EN</text>
        </g>
        {/* Buih MS */}
        <g className="bb2 sw2">
          <rect x="138" y="45" width="42" height="28" rx="8" fill="#FFD93D"/>
          <polygon points="150,73 145,82 155,73" fill="#FFD93D"/>
          <text x="159" y="64" fontSize="13" fill="#333" textAnchor="middle" fontWeight="bold" fontFamily="Fredoka One, sans-serif">MS</text>
        </g>
        {/* Bintang */}
        <g className="ps"><polygon points="30,85 31.5,90 36,90 32.5,93 33.5,98 30,95 26.5,98 27.5,93 24,90 28.5,90" fill="#FFD93D"/></g>
        <g className="ps2"><polygon points="170,95 171.5,100 176,100 172.5,103 173.5,108 170,105 166.5,108 167.5,103 164,100 168.5,100" fill="#FF6B6B"/></g>
      </g>
    </svg>
  );
}
