import './robots.css';

/**
 * Brand robot head only — head + antenna + ears + glowing lightbulb + sparkly eyes + heartwarming smile.
 * Requires <RobotDefs /> rendered somewhere in the app.
 */
export default function RobotHeadBrand({ className = '', style = {}, ...props }) {
  return (
    <svg viewBox="0 -40 360 280" className={className} style={style} {...props}>
      <use href="#robotHead" width="360" height="240" />

      {/* Glowing lightbulb above head */}
      <g transform="translate(180 36)">
        <circle r="44" fill="#FFE066" opacity=".4" className="rb-pulseGlow" filter="url(#fBigGlow)"/>
        <g stroke="#FFC107" strokeWidth="3.5" strokeLinecap="round" className="rb-pulseGlow">
          <path d="M0 -40v-10"/>
          <path d="M28 -28l8 -8"/>
          <path d="M-28 -28l-8 -8"/>
          <path d="M40 0h10"/>
          <path d="M-40 0h-10"/>
          <path d="M28 28l8 8"/>
          <path d="M-28 28l-8 8"/>
        </g>
        <ellipse rx="22" ry="26" cy="-4" fill="url(#gBulb)" filter="url(#fGlow)"/>
        <path d="M0 -32a22 22 0 0 0-15 38c4 4 5 6 5 9h20c0-3 1-5 5-9a22 22 0 0 0-15-38z" fill="none" stroke="#8F5300" strokeWidth="2.5"/>
        <path d="M-8 -10c5-6 11-6 16 0" stroke="#8F5300" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M-6 -6c4-4 8-4 12 0" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity=".6"/>
        <rect x="-9" y="17" width="18" height="7" fill="#8E8E96" stroke="#3E3E46" strokeWidth="1.5"/>
        <rect x="-8" y="24" width="16" height="4" fill="#5E5E66"/>
        <rect x="-7" y="28" width="14" height="4" rx="1.5" fill="#3E3E46"/>
        <ellipse cx="-6" cy="-12" rx="4" ry="8" fill="#fff" opacity=".7"/>
      </g>

      {/* Extra sparkly intelligent eyes */}
      <g className="rb-blink">
        <circle cx="152" cy="160" r="22" fill="url(#gCyan)" opacity=".55" filter="url(#fBigGlow)"/>
        <ellipse cx="152" cy="160" rx="16" ry="17" fill="url(#gEye)" filter="url(#fGlow)"/>
        <ellipse cx="152" cy="160" rx="10" ry="10" fill="#0E2A3D"/>
        <circle cx="148" cy="156" r="5" fill="#fff"/>
        <circle cx="157" cy="166" r="2.5" fill="#fff" opacity=".9"/>
        <path d="M159 152l1 2.5 2.5 .5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-.5z" fill="#fff"/>
        <circle cx="208" cy="160" r="22" fill="url(#gCyan)" opacity=".55" filter="url(#fBigGlow)"/>
        <ellipse cx="208" cy="160" rx="16" ry="17" fill="url(#gEye)" filter="url(#fGlow)"/>
        <ellipse cx="208" cy="160" rx="10" ry="10" fill="#0E2A3D"/>
        <circle cx="204" cy="156" r="5" fill="#fff"/>
        <circle cx="213" cy="166" r="2.5" fill="#fff" opacity=".9"/>
        <path d="M215 152l1 2.5 2.5 .5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-.5z" fill="#fff"/>
      </g>

      {/* Huge heartwarming smile */}
      <path d="M142 196 Q180 226 218 196" stroke="url(#gEye)" strokeWidth="8" strokeLinecap="round" fill="none" filter="url(#fGlow)"/>
      <path d="M158 204q22 10 44 0" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".7"/>
      <ellipse cx="124" cy="198" rx="10" ry="7" fill="#FFB3C7" opacity=".6"/>
      <ellipse cx="236" cy="198" rx="10" ry="7" fill="#FFB3C7" opacity=".6"/>
    </svg>
  );
}
