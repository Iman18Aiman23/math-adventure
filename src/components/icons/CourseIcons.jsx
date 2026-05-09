import React, { useState } from 'react';

export function ReadingIcon() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <svg
      viewBox="0 0 200 200"
      width="56"
      height="56"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: 'pointer' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>{`
          @keyframes floatLetter { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-4px) rotate(5deg); } }
          @keyframes pulseStar { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.25); opacity: 0.7; } }
          .svg-hover .fl1 { animation: floatLetter 1s ease-in-out infinite; }
          .svg-hover .fl2 { animation: floatLetter 1s ease-in-out infinite 0.4s; }
          .svg-hover .fl3 { animation: floatLetter 1s ease-in-out infinite 0.9s; }
          .svg-hover .ps { animation: pulseStar 0.8s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
          .svg-hover .ps2 { animation: pulseStar 0.8s ease-in-out infinite 0.6s; transform-box: fill-box; transform-origin: center; }
        `}</style>
      </defs>
      <g className={isHovered ? 'svg-hover' : ''}>
        <ellipse cx="100" cy="180" rx="52" ry="7" fill="rgba(0,0,0,0.07)"/>
        <path d="M95,46 L20,36 C16,35 14,38 14,42 L14,150 C14,154 16,156 20,155 L95,160 Z" fill="#FF6B6B"/>
        <path d="M92,52 L26,43 L26,146 L92,153 Z" fill="#FFFAF5"/>
        <line x1="38" y1="72" x2="80" y2="75" stroke="#FFD4D4" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="38" y1="85" x2="80" y2="88" stroke="#FFD4D4" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="38" y1="98" x2="66" y2="100" stroke="#FFD4D4" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M105,46 L180,36 C184,35 186,38 186,42 L186,150 C186,154 184,156 180,155 L105,160 Z" fill="#FF8E72"/>
        <path d="M108,52 L174,43 L174,146 L108,153 Z" fill="#FFFAF5"/>
        <line x1="120" y1="75" x2="162" y2="72" stroke="#FFD4D4" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="120" y1="88" x2="162" y2="85" stroke="#FFD4D4" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="120" y1="98" x2="150" y2="100" stroke="#FFD4D4" strokeWidth="2.5" strokeLinecap="round"/>
        <rect x="92" y="43" width="16" height="118" rx="3" fill="#E05555"/>
        <g className="eyes">
          <circle cx="72" cy="114" r="6.5" fill="#333"/>
          <circle cx="128" cy="114" r="6.5" fill="#333"/>
          <circle cx="74" cy="112" r="2.8" fill="#FFF"/>
          <circle cx="130" cy="112" r="2.8" fill="#FFF"/>
        </g>
        <circle cx="57" cy="128" r="8" fill="#FF9999" opacity="0.45"/>
        <circle cx="143" cy="128" r="8" fill="#FF9999" opacity="0.45"/>
        <path d="M84,130 Q100,148 116,130" fill="none" stroke="#333" strokeWidth="2.5" strokeLinecap="round"/>
        <g className="fl1"><text x="30" y="28" fontSize="22" fill="#FF6B6B" fontWeight="bold" fontFamily="Fredoka One, sans-serif">A</text></g>
        <g className="fl2"><text x="150" y="22" fontSize="18" fill="#FF8E72" fontWeight="bold" fontFamily="Fredoka One, sans-serif">B</text></g>
        <g className="fl3"><text x="170" y="50" fontSize="15" fill="#FFB4A2" fontWeight="bold" fontFamily="Fredoka One, sans-serif">C</text></g>
        <g className="ps"><polygon points="22,14 24,21 31,21 26,25 28,32 22,27 16,32 18,25 13,21 20,21" fill="#FFD93D"/></g>
        <g className="ps2"><polygon points="175,8 176.5,13 181,13 177.5,16 178.5,21 175,18 171.5,21 172.5,16 169,13 173.5,13" fill="#FFD93D"/></g>
      </g>
    </svg>
  );
}

export function SpeakingIcon() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <svg
      viewBox="0 0 200 200"
      width="56"
      height="56"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: 'pointer' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>{`
          @keyframes waveArc { 0%, 100% { transform: scaleX(1); opacity: 0.7; } 50% { transform: scaleX(1.35); opacity: 1; } }
          @keyframes floatLetter { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-4px) rotate(5deg); } }
          @keyframes pulseStar { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.25); opacity: 0.7; } }
          .svg-hover .wa { animation: waveArc 0.5s ease-in-out infinite; transform-box: fill-box; transform-origin: left center; }
          .svg-hover .wa2 { animation: waveArc 0.5s ease-in-out infinite 0.25s; transform-box: fill-box; transform-origin: left center; }
          .svg-hover .wa3 { animation: waveArc 0.5s ease-in-out infinite 0.5s; transform-box: fill-box; transform-origin: left center; }
          .svg-hover .war { animation: waveArc 0.5s ease-in-out infinite; transform-box: fill-box; transform-origin: right center; }
          .svg-hover .war2 { animation: waveArc 0.5s ease-in-out infinite 0.25s; transform-box: fill-box; transform-origin: right center; }
          .svg-hover .war3 { animation: waveArc 0.5s ease-in-out infinite 0.5s; transform-box: fill-box; transform-origin: right center; }
          .svg-hover .fl2 { animation: floatLetter 1s ease-in-out infinite 0.4s; }
          .svg-hover .fl3 { animation: floatLetter 1s ease-in-out infinite 0.9s; }
          .svg-hover .ps { animation: pulseStar 0.8s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        `}</style>
      </defs>
      <g className={isHovered ? 'svg-hover' : ''}>
        <ellipse cx="100" cy="182" rx="35" ry="6" fill="rgba(0,0,0,0.07)"/>
        <rect x="95" y="142" width="10" height="32" rx="5" fill="#3DB8B0"/>
        <ellipse cx="100" cy="178" rx="22" ry="5" fill="#3DB8B0"/>
        <rect x="76" y="52" width="48" height="96" rx="24" fill="#4ECDC4"/>
        <line x1="88" y1="68" x2="112" y2="68" stroke="#3DB8B0" strokeWidth="1.5" opacity="0.45"/>
        <line x1="86" y1="77" x2="114" y2="77" stroke="#3DB8B0" strokeWidth="1.5" opacity="0.45"/>
        <line x1="86" y1="86" x2="114" y2="86" stroke="#3DB8B0" strokeWidth="1.5" opacity="0.45"/>
        <line x1="88" y1="95" x2="112" y2="95" stroke="#3DB8B0" strokeWidth="1.5" opacity="0.45"/>
        <line x1="90" y1="104" x2="110" y2="104" stroke="#3DB8B0" strokeWidth="1.5" opacity="0.45"/>
        <rect x="80" y="56" width="8" height="38" rx="4" fill="#7EDDD7" opacity="0.5"/>
        <g className="eyes">
          <circle cx="90" cy="118" r="5.5" fill="#333"/>
          <circle cx="110" cy="118" r="5.5" fill="#333"/>
          <circle cx="91.5" cy="116.5" r="2.2" fill="#FFF"/>
          <circle cx="111.5" cy="116.5" r="2.2" fill="#FFF"/>
        </g>
        <circle cx="81" cy="130" r="6" fill="#3DB8B0" opacity="0.35"/>
        <circle cx="119" cy="130" r="6" fill="#3DB8B0" opacity="0.35"/>
        <path d="M93,131 Q100,141 107,131" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
        <g className="wa"><path d="M70,78 Q58,100 70,122" fill="none" stroke="#4ECDC4" strokeWidth="3.5" strokeLinecap="round" opacity="0.7"/></g>
        <g className="wa2"><path d="M58,68 Q40,100 58,132" fill="none" stroke="#4ECDC4" strokeWidth="3" strokeLinecap="round" opacity="0.45"/></g>
        <g className="wa3"><path d="M46,58 Q22,100 46,142" fill="none" stroke="#4ECDC4" strokeWidth="2.5" strokeLinecap="round" opacity="0.25"/></g>
        <g className="war"><path d="M130,78 Q142,100 130,122" fill="none" stroke="#4ECDC4" strokeWidth="3.5" strokeLinecap="round" opacity="0.7"/></g>
        <g className="war2"><path d="M142,68 Q160,100 142,132" fill="none" stroke="#4ECDC4" strokeWidth="3" strokeLinecap="round" opacity="0.45"/></g>
        <g className="war3"><path d="M154,58 Q178,100 154,142" fill="none" stroke="#4ECDC4" strokeWidth="2.5" strokeLinecap="round" opacity="0.25"/></g>
        <g className="fl2"><text x="18" y="40" fontSize="22" fill="#4ECDC4" fontFamily="serif">♪</text></g>
        <g className="fl3"><text x="165" y="42" fontSize="18" fill="#7EDDD7" fontFamily="serif">♫</text></g>
        <g className="ps"><polygon points="38,52 39.5,57 44,57 40.5,60 41.5,65 38,62 34.5,65 35.5,60 32,57 36.5,57" fill="#FFD93D"/></g>
      </g>
    </svg>
  );
}

export function JawiIcon() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <svg
      viewBox="0 0 200 200"
      width="56"
      height="56"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: 'pointer' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>{`
          @keyframes wiggle { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-6deg); } 75% { transform: rotate(6deg); } }
          @keyframes inkDrip { 0%, 100% { transform: translateY(0) scale(1); opacity: 0.8; } 50% { transform: translateY(5px) scale(0.7); opacity: 0.4; } }
          @keyframes floatLetter { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-4px) rotate(5deg); } }
          @keyframes pulseStar { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.25); opacity: 0.7; } }
          .svg-hover .wg { animation: wiggle 1s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
          .svg-hover .ink { animation: inkDrip 1.5s ease-in-out infinite; transform-box: fill-box; transform-origin: center top; }
          .svg-hover .fl1 { animation: floatLetter 1s ease-in-out infinite; }
          .svg-hover .fl2 { animation: floatLetter 1s ease-in-out infinite 0.4s; }
          .svg-hover .fl3 { animation: floatLetter 1s ease-in-out infinite 0.9s; }
          .svg-hover .ps { animation: pulseStar 0.8s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
          .svg-hover .ps2 { animation: pulseStar 0.8s ease-in-out infinite 0.6s; transform-box: fill-box; transform-origin: center; }
        `}</style>
      </defs>
      <g className={isHovered ? 'svg-hover' : ''}>
        <ellipse cx="100" cy="182" rx="45" ry="6" fill="rgba(0,0,0,0.07)"/>
        <rect x="118" y="55" width="62" height="80" rx="6" fill="#FFF9F0" stroke="#E8D5B7" strokeWidth="1.5"/>
        <ellipse cx="149" cy="55" rx="33" ry="6" fill="#F5E6D0" stroke="#E8D5B7" strokeWidth="1"/>
        <ellipse cx="149" cy="135" rx="33" ry="6" fill="#F5E6D0" stroke="#E8D5B7" strokeWidth="1"/>
        <line x1="128" y1="75" x2="170" y2="75" stroke="#EDE0CF" strokeWidth="1.2"/>
        <line x1="128" y1="88" x2="170" y2="88" stroke="#EDE0CF" strokeWidth="1.2"/>
        <line x1="128" y1="101" x2="170" y2="101" stroke="#EDE0CF" strokeWidth="1.2"/>
        <line x1="128" y1="114" x2="170" y2="114" stroke="#EDE0CF" strokeWidth="1.2"/>
        <text x="149" y="97" fontSize="26" fill="#E89F2C" textAnchor="middle" fontFamily="serif" className="wg">ب</text>
        <rect x="83" y="16" width="28" height="16" rx="8" fill="#FF8FA3"/>
        <rect x="80" y="30" width="34" height="10" rx="2" fill="#D4A373"/>
        <rect x="82" y="40" width="30" height="105" rx="2" fill="#FFB347"/>
        <rect x="82" y="40" width="30" height="18" fill="#E89F2C"/>
        <rect x="86" y="44" width="6" height="50" rx="3" fill="#FFD080" opacity="0.5"/>
        <polygon points="82,145 112,145 97,172" fill="#FFD4A3"/>
        <polygon points="92,163 102,163 97,174" fill="#444"/>
        <g className="eyes">
          <circle cx="91" cy="88" r="5" fill="#333"/>
          <circle cx="105" cy="88" r="5" fill="#333"/>
          <circle cx="92.2" cy="86.5" r="2" fill="#FFF"/>
          <circle cx="106.2" cy="86.5" r="2" fill="#FFF"/>
        </g>
        <circle cx="84" cy="100" r="5.5" fill="#E89F2C" opacity="0.35"/>
        <circle cx="112" cy="100" r="5.5" fill="#E89F2C" opacity="0.35"/>
        <path d="M93,101 Q97,110 103,101" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
        <g className="ink fl1"><circle cx="130" cy="45" r="3" fill="#FFB347" opacity="0.6"/></g>
        <g className="ink fl3"><circle cx="165" cy="38" r="2.5" fill="#E89F2C" opacity="0.5"/></g>
        <g className="ink fl2"><circle cx="142" cy="30" r="2" fill="#FFD080" opacity="0.7"/></g>
        <g className="ps"><polygon points="55,28 56.5,33 61,33 57.5,36 58.5,41 55,38 51.5,41 52.5,36 49,33 53.5,33" fill="#FF6B6B"/></g>
        <g className="ps2"><polygon points="68,55 69.2,59 73,59 70,61.5 71,65.5 68,63 65,65.5 66,61.5 63,59 66.8,59" fill="#FF6B6B"/></g>
      </g>
    </svg>
  );
}

export function MathIcon() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <svg
      viewBox="0 0 200 200"
      width="56"
      height="56"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: 'pointer' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>{`
          @keyframes mathSpin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          @keyframes numberPop { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.18); } }
          @keyframes floatLetter { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-4px) rotate(5deg); } }
          @keyframes pulseStar { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.25); opacity: 0.7; } }
          @keyframes wiggle { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-6deg); } 75% { transform: rotate(6deg); } }
          .svg-hover .msp { animation: mathSpin 3s linear infinite; transform-box: fill-box; transform-origin: center; }
          .svg-hover .np { animation: numberPop 0.7s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
          .svg-hover .np2 { animation: numberPop 0.7s ease-in-out infinite 0.5s; transform-box: fill-box; transform-origin: center; }
          .svg-hover .np3 { animation: numberPop 0.7s ease-in-out infinite 1s; transform-box: fill-box; transform-origin: center; }
          .svg-hover .fl1 { animation: floatLetter 1s ease-in-out infinite; }
          .svg-hover .fl2 { animation: floatLetter 1s ease-in-out infinite 0.4s; }
          .svg-hover .fl3 { animation: floatLetter 1s ease-in-out infinite 0.9s; }
          .svg-hover .fl4 { animation: floatLetter 1s ease-in-out infinite 0.2s; }
          .svg-hover .ps { animation: pulseStar 0.8s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
          .svg-hover .ps2 { animation: pulseStar 0.8s ease-in-out infinite 0.6s; transform-box: fill-box; transform-origin: center; }
          .svg-hover .wg { animation: wiggle 1s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
        `}</style>
      </defs>
      <g className={isHovered ? 'svg-hover' : ''}>
        <ellipse cx="100" cy="182" rx="40" ry="6" fill="rgba(0,0,0,0.07)"/>
        <rect x="55" y="22" width="90" height="150" rx="16" fill="#6BCB77"/>
        <rect x="66" y="34" width="68" height="36" rx="7" fill="#2D6A4F"/>
        <g className="eyes">
          <circle cx="84" cy="48" r="4" fill="#95E1C3"/>
          <circle cx="108" cy="48" r="4" fill="#95E1C3"/>
          <circle cx="85" cy="46.5" r="1.6" fill="#2D6A4F"/>
          <circle cx="109" cy="46.5" r="1.6" fill="#2D6A4F"/>
        </g>
        <path d="M86,57 Q96,66 106,57" fill="none" stroke="#95E1C3" strokeWidth="1.8" strokeLinecap="round"/>
        <rect x="70" y="80" width="15" height="14" rx="4" fill="#A8E6CF"/>
        <rect x="90" y="80" width="15" height="14" rx="4" fill="#A8E6CF"/>
        <rect x="110" y="80" width="15" height="14" rx="4" fill="#FF8E72"/>
        <text x="77.5" y="91" fontSize="9" fill="#2D6A4F" textAnchor="middle" fontFamily="Fredoka One, sans-serif">7</text>
        <text x="97.5" y="91" fontSize="9" fill="#2D6A4F" textAnchor="middle" fontFamily="Fredoka One, sans-serif">8</text>
        <text x="117.5" y="91" fontSize="11" fill="#FFF" textAnchor="middle" fontFamily="Fredoka One, sans-serif">+</text>
        <rect x="70" y="100" width="15" height="14" rx="4" fill="#A8E6CF"/>
        <rect x="90" y="100" width="15" height="14" rx="4" fill="#A8E6CF"/>
        <rect x="110" y="100" width="15" height="14" rx="4" fill="#FF8E72"/>
        <text x="77.5" y="111" fontSize="9" fill="#2D6A4F" textAnchor="middle" fontFamily="Fredoka One, sans-serif">4</text>
        <text x="97.5" y="111" fontSize="9" fill="#2D6A4F" textAnchor="middle" fontFamily="Fredoka One, sans-serif">5</text>
        <text x="117.5" y="111" fontSize="11" fill="#FFF" textAnchor="middle" fontFamily="Fredoka One, sans-serif">−</text>
        <rect x="70" y="120" width="15" height="14" rx="4" fill="#A8E6CF"/>
        <rect x="90" y="120" width="15" height="14" rx="4" fill="#A8E6CF"/>
        <rect x="110" y="120" width="15" height="14" rx="4" fill="#FF8E72"/>
        <text x="77.5" y="131" fontSize="9" fill="#2D6A4F" textAnchor="middle" fontFamily="Fredoka One, sans-serif">1</text>
        <text x="97.5" y="131" fontSize="9" fill="#2D6A4F" textAnchor="middle" fontFamily="Fredoka One, sans-serif">2</text>
        <text x="117.5" y="131" fontSize="10" fill="#FFF" textAnchor="middle" fontFamily="Fredoka One, sans-serif">×</text>
        <rect x="70" y="140" width="35" height="14" rx="4" fill="#A8E6CF"/>
        <rect x="110" y="140" width="15" height="14" rx="4" fill="#FFB347"/>
        <text x="87.5" y="151" fontSize="9" fill="#2D6A4F" textAnchor="middle" fontFamily="Fredoka One, sans-serif">0</text>
        <text x="117.5" y="151.5" fontSize="10" fill="#2D6A4F" textAnchor="middle" fontFamily="Fredoka One, sans-serif">=</text>
        <rect x="60" y="26" width="10" height="40" rx="5" fill="#95E1C3" opacity="0.25"/>
        <g className="np fl1"><text x="25" y="50" fontSize="20" fill="#6BCB77" fontWeight="bold" fontFamily="Fredoka One, sans-serif">3</text></g>
        <g className="np2 fl2"><text x="168" y="45" fontSize="18" fill="#4AA85B" fontWeight="bold" fontFamily="Fredoka One, sans-serif">9</text></g>
        <g className="np3 fl4"><text x="30" y="165" fontSize="16" fill="#A8E6CF" fontWeight="bold" fontFamily="Fredoka One, sans-serif">6</text></g>
        <g className="msp fl3">
          <polygon points="170,155 180,175 160,175" fill="none" stroke="#6BCB77" strokeWidth="2.5" strokeLinejoin="round"/>
        </g>
        <g className="ps" style={{ animationDelay: '0.3s' }}>
          <circle cx="28" cy="105" r="8" fill="none" stroke="#FFB347" strokeWidth="2.5"/>
        </g>
        <g className="wg" style={{ transformOrigin: '170px 100px' }}>
          <rect x="162" y="92" width="16" height="16" rx="2" fill="none" stroke="#FF6B6B" strokeWidth="2.5"/>
        </g>
        <g className="ps2"><polygon points="42,25 43.5,30 48,30 44.5,33 45.5,38 42,35 38.5,38 39.5,33 36,30 40.5,30" fill="#FF6B6B"/></g>
      </g>
    </svg>
  );
}
