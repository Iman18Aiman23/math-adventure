import './robots.css';

export default function RobotArabic({ className = '', style = {}, ...props }) {
  return (
    <svg viewBox="0 0 360 400" className={className} style={style} {...props}>
      {/* Decorative arabesque */}
      <g opacity=".22" fill="none" stroke="#FFE066" strokeWidth="1.8">
        <circle cx="60" cy="80" r="16"/>
        <circle cx="60" cy="80" r="9"/>
        <path d="M44 80h32M60 64v32"/>
        <circle cx="300" cy="80" r="16"/>
        <circle cx="300" cy="80" r="9"/>
        <path d="M284 80h32M300 64v32"/>
        <circle cx="50" cy="280" r="12"/>
        <circle cx="310" cy="280" r="12"/>
      </g>
      {/* Crescent moon */}
      <g transform="translate(64 64)" className="rb-pulseGlow">
        <path d="M-12 -8a14 14 0 1 0 0 24 11 11 0 1 1 0-24z" fill="#FFE066" stroke="#8F5300" strokeWidth="1.5"/>
        <path d="M10 -4l1 2.5 2.5 .5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-.5z" fill="#FFE066"/>
      </g>

      <g className="rb-floatA rb-delay-3">
        {/* Left arm — welcoming gesture */}
        <g filter="url(#fShadow)">
          <circle cx="124" cy="262" r="14" fill="url(#gChrome)" stroke="#7C8A9E" strokeWidth="1.5"/>
          <rect x="98" y="266" width="40" height="28" rx="14" fill="url(#gBody)" transform="rotate(-30 118 280)"/>
          <rect x="74" y="290" width="38" height="26" rx="13" fill="url(#gBody)" transform="rotate(-50 92 303)"/>
          <use href="#rHand" transform="translate(78 318) rotate(54)"/>
        </g>

        {/* Right arm — holds glowing tablet */}
        <g filter="url(#fShadow)">
          <circle cx="236" cy="262" r="14" fill="url(#gChrome)" stroke="#7C8A9E" strokeWidth="1.5"/>
          <rect x="222" y="266" width="40" height="28" rx="14" fill="url(#gBody)" transform="rotate(30 242 280)"/>
          <rect x="248" y="290" width="38" height="26" rx="13" fill="url(#gBody)" transform="rotate(50 267 303)"/>
          <use href="#rHand" transform="translate(284 318) rotate(-54)"/>
        </g>

        <use href="#robotBase" width="360" height="400"/>

        {/* Eyes — proud and friendly */}
        <use href="#eyesHappy" x="120" y="130" width="120" height="60"/>
        {/* Big warm smile */}
        <path d="M150 198 Q180 222 210 198" stroke="url(#gEye)" strokeWidth="7" strokeLinecap="round" fill="none" filter="url(#fGlow)"/>
        <ellipse cx="132" cy="194" rx="9" ry="6" fill="#FFB3C7" opacity=".6"/>
        <ellipse cx="228" cy="194" rx="9" ry="6" fill="#FFB3C7" opacity=".6"/>

        {/* Chest emblem: crescent */}
        <g transform="translate(180 310)">
          <circle r="22" fill="url(#gGold)" stroke="#8F5300" strokeWidth="1.5"/>
          <path d="M-4 -10a10 10 0 1 0 0 20 7 7 0 1 1 0-20z" fill="#fff" stroke="#8F5300" strokeWidth="1.5"/>
          <path d="M10 0l1 2.5 2.5 .5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-.5z" fill="#fff"/>
        </g>

        {/* Glowing tablet with Arabic Alif */}
        <g transform="translate(300 320) rotate(12)" filter="url(#fShadow)">
          <ellipse rx="50" ry="60" fill="#FFE066" opacity=".5" filter="url(#fBigGlow)" className="rb-pulseGlow"/>
          <rect x="-36" y="-50" width="72" height="92" rx="9" fill="url(#gTablet)" stroke="#0B7CA8" strokeWidth="2.5"/>
          <rect x="-30" y="-44" width="60" height="76" rx="4" fill="#06192C"/>
          <ellipse rx="28" ry="34" fill="#FFE066" opacity=".4" filter="url(#fBigGlow)" className="rb-pulseGlow"/>
          <text y="16" textAnchor="middle" fontFamily="'Amiri Quran',serif" fontWeight="700" fontSize="68" fill="#FFE066" filter="url(#fGlow)">ا</text>
          <rect x="-8" y="36" width="16" height="3" rx="1.5" fill="#46D8FF"/>
          <path d="M-42 -42l1.4 3 3 .6-3 1.4-1.4 3-1.4-3-3-1.4 3-.6z" fill="#FFE066" className="rb-pulseGlow"/>
          <path d="M42 -10l1.4 3 3 .6-3 1.4-1.4 3-1.4-3-3-1.4 3-.6z" fill="#FFE066" className="rb-pulseGlow"/>
          <path d="M42 30l1 2.5 2.5 .5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-.5z" fill="#fff" className="rb-pulseGlow"/>
        </g>
      </g>
    </svg>
  );
}
