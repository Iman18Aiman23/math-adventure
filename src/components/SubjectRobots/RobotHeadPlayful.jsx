import './robots.css';

/**
 * Playful robot head only — head + antenna + ears + excited wide eyes + O mouth.
 * Requires <RobotDefs /> rendered somewhere in the app.
 */
export default function RobotHeadPlayful({ className = '', style = {}, ...props }) {
  return (
    <svg viewBox="0 0 360 240" className={className} style={style} {...props}>
      <use href="#robotHead" width="360" height="240" />

      {/* Excited wide eyes */}
      <g className="rb-blink">
        <circle cx="152" cy="160" r="22" fill="url(#gCyan)" opacity=".55"/>
        <ellipse cx="152" cy="160" rx="16" ry="17" fill="url(#gEye)" filter="url(#fGlow)"/>
        <ellipse cx="152" cy="160" rx="10" ry="10" fill="#0E2A3D"/>
        <circle cx="148" cy="156" r="5" fill="#fff"/>
        <path d="M158 152l1 2.5 2.5 .5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-.5z" fill="#fff"/>
        <circle cx="208" cy="160" r="22" fill="url(#gCyan)" opacity=".55"/>
        <ellipse cx="208" cy="160" rx="16" ry="17" fill="url(#gEye)" filter="url(#fGlow)"/>
        <ellipse cx="208" cy="160" rx="10" ry="10" fill="#0E2A3D"/>
        <circle cx="204" cy="156" r="5" fill="#fff"/>
        <path d="M214 152l1 2.5 2.5 .5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-.5z" fill="#fff"/>
      </g>

      {/* Excited O mouth */}
      <ellipse cx="180" cy="198" rx="14" ry="17" fill="#0E2A3D" stroke="#46D8FF" strokeWidth="7" filter="url(#fGlow)"/>
      <ellipse cx="176" cy="190" rx="4" ry="6" fill="#46D8FF" opacity=".5"/>
      <ellipse cx="124" cy="196" rx="11" ry="7" fill="#FFB3C7" opacity=".7"/>
      <ellipse cx="236" cy="196" rx="11" ry="7" fill="#FFB3C7" opacity=".7"/>
    </svg>
  );
}
