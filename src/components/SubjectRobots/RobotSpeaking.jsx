import './robots.css';

export default function RobotSpeaking({ className = '', style = {}, ...props }) {
  return (
    <svg viewBox="0 0 360 400" className={className} style={style} {...props}>
      <circle cx="180" cy="180" r="140" fill="#fff" opacity=".18"/>
      <g className="rb-pulseGlow" fill="#fff">
        <text x="44" y="86" fontFamily="Baloo 2,sans-serif" fontSize="22" fontWeight="800">♪</text>
        <text x="306" y="100" fontFamily="Baloo 2,sans-serif" fontSize="20" fontWeight="800">♫</text>
        <text x="316" y="240" fontFamily="Baloo 2,sans-serif" fontSize="18" fontWeight="800">♪</text>
      </g>

      <g className="rb-floatA rb-delay-1">
        {/* Left arm — microphone hand */}
        <g filter="url(#fShadow)">
          <circle cx="124" cy="262" r="14" fill="url(#gChrome)" stroke="#7C8A9E" strokeWidth="1.5"/>
          <g className="rb-wiggle">
            <rect x="98" y="246" width="40" height="28" rx="14" fill="url(#gBody)" transform="rotate(-50 118 260)"/>
            <rect x="78" y="216" width="36" height="26" rx="13" fill="url(#gBody)" transform="rotate(-70 96 229)"/>
            <use href="#rHand" transform="translate(96 218) rotate(-15)"/>
            {/* Microphone */}
            <g transform="translate(92 196) rotate(-15)">
              <rect x="-5" y="14" width="10" height="22" rx="2" fill="url(#gChrome)" stroke="#7C8A9E" strokeWidth="1.5"/>
              <rect x="-13" y="-22" width="26" height="38" rx="13" fill="#FF4759" stroke="#7E0F20" strokeWidth="2.4"/>
              <path d="M-9 -14h18M-9 -6h18M-9 2h18M-9 10h18" stroke="rgba(255,255,255,.45)" strokeWidth="1.6" strokeLinecap="round"/>
              <ellipse cx="-6" cy="-10" rx="2.5" ry="6" fill="#fff" opacity=".55"/>
              <rect x="-7" y="14" width="14" height="4" fill="#222" stroke="#7C8A9E" strokeWidth=".8"/>
            </g>
          </g>
        </g>

        {/* Right arm — free side */}
        <g filter="url(#fShadow)">
          <circle cx="236" cy="262" r="14" fill="url(#gChrome)" stroke="#7C8A9E" strokeWidth="1.5"/>
          <g className="rb-wiggle" style={{ animationDelay: '.5s' }}>
            <rect x="222" y="266" width="40" height="28" rx="14" fill="url(#gBody)" transform="rotate(30 242 280)"/>
            <rect x="248" y="290" width="38" height="26" rx="13" fill="url(#gBody)" transform="rotate(50 267 303)"/>
            <use href="#rHand" transform="translate(286 318) rotate(-50)"/>
          </g>
        </g>

        <use href="#robotBase" width="360" height="400"/>

        {/* Headphones */}
        <g filter="url(#fShadow)">
          <path d="M86 152 Q86 46 180 46 Q274 46 274 152" stroke="#1B1D29" strokeWidth="11" fill="none" strokeLinecap="round"/>
          <path d="M86 152 Q86 50 180 50 Q274 50 274 152" stroke="url(#gChrome)" strokeWidth="5" fill="none" strokeLinecap="round"/>
          <path d="M100 80 Q180 56 260 80" stroke="#46D8FF" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".75"/>
          <circle cx="86" cy="152" r="22" fill="#1B1D29" stroke="#0E2A3D" strokeWidth="2"/>
          <circle cx="86" cy="152" r="18" fill="#3FB7F1"/>
          <circle cx="86" cy="152" r="13" fill="#1B1D29"/>
          <circle cx="86" cy="152" r="9" fill="#46D8FF" opacity=".7" className="rb-pulseGlow"/>
          <ellipse cx="78" cy="144" rx="4" ry="6" fill="#fff" opacity=".4"/>
          <circle cx="274" cy="152" r="22" fill="#1B1D29" stroke="#0E2A3D" strokeWidth="2"/>
          <circle cx="274" cy="152" r="18" fill="#3FB7F1"/>
          <circle cx="274" cy="152" r="13" fill="#1B1D29"/>
          <circle cx="274" cy="152" r="9" fill="#46D8FF" opacity=".7" className="rb-pulseGlow"/>
          <ellipse cx="266" cy="144" rx="4" ry="6" fill="#fff" opacity=".4"/>
        </g>

        {/* Eyes */}
        <g>
          <g className="rb-blink">
            <circle cx="152" cy="160" r="20" fill="url(#gCyan)" opacity=".55"/>
            <ellipse cx="152" cy="160" rx="15" ry="16" fill="url(#gEye)" filter="url(#fGlow)"/>
            <ellipse cx="152" cy="160" rx="9" ry="9" fill="#0E2A3D"/>
            <circle cx="148" cy="156" r="4" fill="#fff"/>
            <circle cx="156" cy="164" r="2" fill="#fff" opacity=".8"/>
            <circle cx="208" cy="160" r="20" fill="url(#gCyan)" opacity=".55"/>
            <ellipse cx="208" cy="160" rx="15" ry="16" fill="url(#gEye)" filter="url(#fGlow)"/>
            <ellipse cx="208" cy="160" rx="9" ry="9" fill="#0E2A3D"/>
            <circle cx="204" cy="156" r="4" fill="#fff"/>
            <circle cx="212" cy="164" r="2" fill="#fff" opacity=".8"/>
          </g>
          {/* Singing O mouth */}
          <ellipse cx="180" cy="198" rx="12" ry="15" fill="#0E2A3D" stroke="#46D8FF" strokeWidth="6" filter="url(#fGlow)"/>
          <ellipse cx="176" cy="192" rx="3" ry="5" fill="#46D8FF" opacity=".5"/>
          <ellipse cx="130" cy="196" rx="10" ry="6" fill="#FFB3C7" opacity=".65"/>
          <ellipse cx="230" cy="196" rx="10" ry="6" fill="#FFB3C7" opacity=".65"/>
        </g>

        {/* Chest emblem: speaker */}
        <g transform="translate(180 310)">
          <circle r="22" fill="#FF4759"/>
          <circle r="22" fill="none" stroke="#7E0F20" strokeWidth="1.5"/>
          <path d="M-10 -4h6l8 -6v20l-8 -6h-6z" fill="#fff"/>
          <path d="M8 -4q6 4 0 12" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </g>

        {/* Sound waves */}
        <g className="rb-pulseGlow" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" fill="none">
          <path d="M58 150q-10 24 0 50"/>
          <path d="M38 134q-18 36 0 80"/>
          <path d="M20 120q-26 50 0 110"/>
        </g>
      </g>
    </svg>
  );
}
