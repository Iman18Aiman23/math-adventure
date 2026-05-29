import './robots.css';

/**
 * Math robot head only — head + antenna + ears + graduation cap + confident wink.
 * Requires <RobotDefs /> rendered somewhere in the app.
 */
export default function RobotHeadMath({ className = '', style = {}, ...props }) {
  return (
    <svg viewBox="0 0 360 240" className={className} style={style} {...props}>
      <use href="#robotHead" width="360" height="240" />

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
    </svg>
  );
}
