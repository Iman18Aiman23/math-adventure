import './robots.css';

export default function RobotMath({ className = '', style = {}, ...props }) {
  return (
    <svg viewBox="0 0 360 400" className={className} style={style} {...props}>
      <circle cx="180" cy="180" r="140" fill="#fff" opacity=".18"/>

      {/* Swirling math symbols — spin around the head */}
      <g style={{ transformOrigin: '180px 160px' }} className="rb-spin">
        <g className="rb-pulseGlow" filter="url(#fGlow)">
          <text x="46" y="110" fontFamily="Baloo 2,sans-serif" fontSize="32" fontWeight="800" fill="#FFE066">+</text>
          <text x="294" y="92" fontFamily="Baloo 2,sans-serif" fontSize="30" fontWeight="800" fill="#FF4759">÷</text>
          <text x="32" y="220" fontFamily="Baloo 2,sans-serif" fontSize="28" fontWeight="800" fill="#86E067">=</text>
          <text x="306" y="230" fontFamily="Baloo 2,sans-serif" fontSize="30" fontWeight="800" fill="#FFE066">−</text>
          <text x="82" y="56" fontFamily="Baloo 2,sans-serif" fontSize="22" fontWeight="800" fill="#7BE7FF">π</text>
          <text x="262" y="48" fontFamily="Baloo 2,sans-serif" fontSize="22" fontWeight="800" fill="#FFE066">∞</text>
          <text x="58" y="300" fontFamily="Baloo 2,sans-serif" fontSize="24" fontWeight="800" fill="#FF8B95">×</text>
          <text x="290" y="296" fontFamily="Baloo 2,sans-serif" fontSize="24" fontWeight="800" fill="#fff">√</text>
        </g>
      </g>

      <g className="rb-floatA rb-delay-2">
        {/* Left arm — holds tablet */}
        <g filter="url(#fShadow)">
          <circle cx="124" cy="262" r="14" fill="url(#gChrome)" stroke="#7C8A9E" strokeWidth="1.5"/>
          <rect x="98" y="266" width="40" height="28" rx="14" fill="url(#gBody)" transform="rotate(-26 118 280)"/>
          <rect x="76" y="288" width="36" height="26" rx="13" fill="url(#gBody)" transform="rotate(-46 94 301)"/>
          <use href="#rHand" transform="translate(80 312) rotate(50)"/>
        </g>

        {/* Right arm — holds stylus */}
        <g filter="url(#fShadow)">
          <circle cx="236" cy="262" r="14" fill="url(#gChrome)" stroke="#7C8A9E" strokeWidth="1.5"/>
          <g className="rb-pointArm">
            <rect x="222" y="266" width="40" height="28" rx="14" fill="url(#gBody)" transform="rotate(26 242 280)"/>
            <rect x="248" y="288" width="36" height="26" rx="13" fill="url(#gBody)" transform="rotate(46 266 301)"/>
            <use href="#rHand" transform="translate(280 312) rotate(-50)"/>
            <rect x="292" y="304" width="8" height="36" rx="4" fill="url(#gChrome)" stroke="#7C8A9E" strokeWidth="1.5" transform="rotate(36 296 322)"/>
            <circle cx="308" cy="336" r="3.5" fill="#46D8FF" className="rb-pulseGlow"/>
          </g>
        </g>

        <use href="#robotBase" width="360" height="400"/>

        {/* Graduation cap */}
        <g transform="translate(180 78) rotate(-15)" filter="url(#fShadow)">
          <path d="M-32 8 q32 -14 64 0 v6 q-32 14 -64 0 z" fill="#1B1D29" stroke="#000" strokeWidth="2"/>
          <path d="M-46 -2 L0 -16 L46 -2 L0 12 Z" fill="#222433" stroke="#000" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M-46 -2 L0 -16 L46 -2" stroke="url(#gGold)" strokeWidth="1.5" fill="none"/>
          <circle r="3" cx="0" cy="-2" fill="url(#gGold)" stroke="#8F5300" strokeWidth="1"/>
          <path d="M0 -2 L40 8" stroke="#FFC107" strokeWidth="2.4" strokeLinecap="round"/>
          <circle cx="40" cy="8" r="3" fill="#FFC107"/>
          <path d="M40 8l-4 12M40 8l0 12M40 8l4 12" stroke="#FFC107" strokeWidth="2.4" strokeLinecap="round"/>
        </g>

        {/* Eyes — wink left, open right */}
        <g>
          <path d="M138 162 q14 -10 28 0" stroke="url(#gEye)" strokeWidth="6" strokeLinecap="round" fill="none" filter="url(#fGlow)"/>
          <g className="rb-blink">
            <circle cx="208" cy="160" r="20" fill="url(#gCyan)" opacity=".55"/>
            <ellipse cx="208" cy="160" rx="15" ry="16" fill="url(#gEye)" filter="url(#fGlow)"/>
            <ellipse cx="208" cy="160" rx="9" ry="9" fill="#0E2A3D"/>
            <circle cx="204" cy="156" r="4" fill="#fff"/>
            <path d="M214 152l.8 2 2 .4-2 .8-.8 2-.8-2-2-.8 2-.4z" fill="#fff"/>
          </g>
          {/* Confident smirk */}
          <path d="M156 196 Q180 212 206 188" stroke="url(#gEye)" strokeWidth="6.5" strokeLinecap="round" fill="none" filter="url(#fGlow)"/>
          <ellipse cx="134" cy="196" rx="8" ry="5" fill="#FFB3C7" opacity=".5"/>
          <ellipse cx="226" cy="196" rx="8" ry="5" fill="#FFB3C7" opacity=".5"/>
        </g>

        {/* Chest emblem: x² */}
        <g transform="translate(180 310)">
          <circle r="22" fill="#9013FE"/>
          <circle r="22" fill="none" stroke="#4A0784" strokeWidth="1.5"/>
          <text y="6" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontWeight="800" fontSize="22" fill="#fff">x²</text>
        </g>

        {/* Mini tablet in left hand */}
        <g transform="translate(58 322) rotate(-14)" filter="url(#fShadow)">
          <rect x="-30" y="-22" width="60" height="44" rx="6" fill="url(#gTablet)" stroke="#0B7CA8" strokeWidth="2"/>
          <rect x="-26" y="-18" width="52" height="36" rx="3" fill="#0E3D5C"/>
          <text y="2" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontWeight="800" fontSize="14" fill="#46D8FF" filter="url(#fGlow)" className="rb-pulseGlow">2+2=4</text>
          <g stroke="#46D8FF" strokeWidth=".5" opacity=".3">
            <path d="M-26 8h52"/><path d="M-26 14h52"/>
          </g>
          <circle cx="0" cy="20" r="2" fill="#46D8FF"/>
        </g>
      </g>
    </svg>
  );
}
