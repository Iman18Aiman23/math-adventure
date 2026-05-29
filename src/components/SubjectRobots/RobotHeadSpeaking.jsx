import './robots.css';

/**
 * Speaking robot head only — head + antenna + ears + headphones + singing face.
 * Requires <RobotDefs /> rendered somewhere in the app.
 */
export default function RobotHeadSpeaking({ className = '', style = {}, ...props }) {
  return (
    <svg viewBox="0 0 360 240" className={className} style={style} {...props}>
      <use href="#robotHead" width="360" height="240" />

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

      {/* Eyes & singing O mouth */}
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
        <ellipse cx="180" cy="198" rx="12" ry="15" fill="#0E2A3D" stroke="#46D8FF" strokeWidth="6" filter="url(#fGlow)"/>
        <ellipse cx="176" cy="192" rx="3" ry="5" fill="#46D8FF" opacity=".5"/>
        <ellipse cx="130" cy="196" rx="10" ry="6" fill="#FFB3C7" opacity=".65"/>
        <ellipse cx="230" cy="196" rx="10" ry="6" fill="#FFB3C7" opacity=".65"/>
      </g>
    </svg>
  );
}
