import './robots.css';

/**
 * Reading robot head only — head + antenna + ears + gold reading glasses + cheery face.
 * Requires <RobotDefs /> rendered somewhere in the app.
 */
export default function RobotHeadReading({ className = '', style = {}, ...props }) {
  return (
    <svg viewBox="0 0 360 240" className={className} style={style} {...props}>
      <use href="#robotHead" width="360" height="240" />

      {/* Gold reading glasses */}
      <g transform="rotate(-3 180 180)" filter="url(#fShadowSoft)">
        <path d="M170 160h20" stroke="#FFC107" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="152" cy="160" r="24" fill="rgba(255,255,255,.12)" stroke="#FFC107" strokeWidth="4"/>
        <circle cx="208" cy="160" r="24" fill="rgba(255,255,255,.12)" stroke="#FFC107" strokeWidth="4"/>
        <path d="M128 156q-12 -2 -18 -6" stroke="#FFC107" strokeWidth="4" strokeLinecap="round" fill="none"/>
        <path d="M232 156q12 -2 18 -6" stroke="#FFC107" strokeWidth="4" strokeLinecap="round" fill="none"/>
        <path d="M142 148q8 -8 16 0" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".8"/>
        <path d="M198 148q8 -8 16 0" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".8"/>
      </g>

      {/* Eyes and smile */}
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
    </svg>
  );
}
