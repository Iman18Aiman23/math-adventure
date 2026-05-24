import './robots.css';

export default function RobotReading({ className = '', style = {}, ...props }) {
  return (
    <svg viewBox="0 0 360 400" className={className} style={style} {...props}>
      <circle cx="180" cy="180" r="140" fill="#fff" opacity=".18"/>
      <g className="rb-pulseGlow">
        <path d="M50 90l2 5 5 1-5 2-2 5-2-5-5-2 5-1z" fill="#FFE066"/>
        <path d="M310 100l1.6 4 4 .8-4 1.6-1.6 4-1.6-4-4-1.6 4-.8z" fill="#fff"/>
        <circle cx="42" cy="220" r="3" fill="#fff"/>
        <circle cx="316" cy="240" r="3" fill="#FFE066"/>
      </g>

      <g className="rb-floatA">
        {/* Left arm — holds left side of book */}
        <g filter="url(#fShadow)">
          <circle cx="124" cy="262" r="14" fill="url(#gChrome)" stroke="#7C8A9E" strokeWidth="1.5"/>
          <rect x="98" y="266" width="40" height="28" rx="14" fill="url(#gBody)" transform="rotate(-22 118 280)"/>
          <rect x="76" y="288" width="36" height="26" rx="13" fill="url(#gBody)" transform="rotate(-40 94 301)"/>
          <use href="#rHand" transform="translate(80 312) rotate(40)"/>
        </g>
        {/* Right arm — holds right side of book */}
        <g filter="url(#fShadow)">
          <circle cx="236" cy="262" r="14" fill="url(#gChrome)" stroke="#7C8A9E" strokeWidth="1.5"/>
          <g>
            <rect x="222" y="266" width="40" height="28" rx="14" fill="url(#gBody)" transform="rotate(22 242 280)"/>
            <rect x="248" y="288" width="36" height="26" rx="13" fill="url(#gBody)" transform="rotate(40 266 301)"/>
            <use href="#rHand" transform="translate(280 312) rotate(-40)"/>
          </g>
        </g>

        <use href="#robotBase" x="0" y="0" width="360" height="400" transform="rotate(-3 180 180)"/>

        {/* Gold glasses */}
        <g transform="rotate(-3 180 180)" filter="url(#fShadowSoft)">
          <path d="M170 160h20" stroke="#FFC107" strokeWidth="4" strokeLinecap="round"/>
          <circle cx="152" cy="160" r="24" fill="rgba(255,255,255,.12)" stroke="#FFC107" strokeWidth="4"/>
          <circle cx="208" cy="160" r="24" fill="rgba(255,255,255,.12)" stroke="#FFC107" strokeWidth="4"/>
          <path d="M128 156q-12 -2 -18 -6" stroke="#FFC107" strokeWidth="4" strokeLinecap="round" fill="none"/>
          <path d="M232 156q12 -2 18 -6" stroke="#FFC107" strokeWidth="4" strokeLinecap="round" fill="none"/>
          <path d="M142 148q8 -8 16 0" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".8"/>
          <path d="M198 148q8 -8 16 0" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".8"/>
        </g>

        {/* Eyes and face */}
        <g transform="rotate(-3 180 180)">
          <g className="rb-blink">
            <ellipse cx="152" cy="160" rx="12" ry="13" fill="url(#gEye)" filter="url(#fGlow)"/>
            <ellipse cx="152" cy="160" rx="7" ry="7" fill="#0E2A3D"/>
            <circle cx="149" cy="157" r="3" fill="#fff"/>
            <ellipse cx="208" cy="160" rx="12" ry="13" fill="url(#gEye)" filter="url(#fGlow)"/>
            <ellipse cx="208" cy="160" rx="7" ry="7" fill="#0E2A3D"/>
            <circle cx="205" cy="157" r="3" fill="#fff"/>
          </g>
          <path d="M156 192 Q180 210 204 192" stroke="#46D8FF" strokeWidth="6.5" strokeLinecap="round" fill="none" filter="url(#fGlow)"/>
          <ellipse cx="138" cy="192" rx="8" ry="5" fill="#FFB3C7" opacity=".55"/>
          <ellipse cx="222" cy="192" rx="8" ry="5" fill="#FFB3C7" opacity=".55"/>
        </g>

        {/* Chest emblem: open book */}
        <g transform="translate(180 310)">
          <circle r="22" fill="#46D8FF"/>
          <circle r="22" fill="none" stroke="#0B7CA8" strokeWidth="1.5"/>
          <path d="M-12 -2 Q-2 -8 0 -2 L0 8 Q-2 4 -12 8 Z M12 -2 Q2 -8 0 -2 L0 8 Q2 4 12 8 Z" fill="#fff"/>
        </g>

        {/* Open book prop */}
        <g transform="translate(180 332) scale(1.6)" filter="url(#fShadow)">
          <ellipse cy="38" rx="40" ry="3" fill="rgba(16,36,58,.25)"/>
          <path d="M-44 -26 c14 -8 36 -10 42 0 v54 c-6 -10 -28 -8 -42 0 z" fill="url(#gObL)" stroke="#8F5300" strokeWidth="2.5" strokeLinejoin="round"/>
          <path d="M44 -26 c-14 -8 -36 -10 -42 0 v54 c6 -10 28 -8 42 0 z" fill="url(#gObR)" stroke="#8F5300" strokeWidth="2.5" strokeLinejoin="round"/>
          <path d="M-2 -24 v52 M2 -24 v52" stroke="#8F5300" strokeWidth="1.4"/>
          <g stroke="rgba(143,83,0,.5)" strokeWidth="1.8" strokeLinecap="round">
            <path d="M-36 -12 h26"/>
            <path d="M-36 -4 h22"/>
            <path d="M-36 4 h26"/>
            <path d="M-36 12 h18"/>
          </g>
          <g stroke="rgba(255,255,255,.8)" strokeWidth="1.8" strokeLinecap="round">
            <path d="M10 -12 h26"/>
            <path d="M10 -4 h22"/>
            <path d="M10 4 h26"/>
            <path d="M10 12 h18"/>
          </g>
          <path d="M30 -22l1 2.5 2.5 .5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-.5z" fill="#fff" className="rb-pulseGlow"/>
          <path d="M-32 22l.8 2 2 .4-2 .8-.8 2-.8-2-2-.8 2-.4z" fill="#FFE066" className="rb-pulseGlow"/>
        </g>
      </g>
    </svg>
  );
}
