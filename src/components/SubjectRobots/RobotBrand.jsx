import './robots.css';

export default function RobotBrand({ className = '', style = {}, ...props }) {
  return (
    <svg viewBox="0 -40 360 440" className={className} style={style} {...props}>
      {/* Background halos */}
      <circle cx="180" cy="180" r="150" fill="#fff" opacity=".2"/>
      <circle cx="180" cy="180" r="110" fill="#fff" opacity=".18"/>
      {/* Sparkles */}
      <g className="rb-pulseGlow" fill="#FFE066">
        <path d="M52 110l2 5 5 1-5 2-2 5-2-5-5-2 5-1z"/>
        <path d="M306 130l2 5 5 1-5 2-2 5-2-5-5-2 5-1z"/>
        <path d="M48 250l1.6 4 4 .8-4 1.6-1.6 4-1.6-4-4-1.6 4-.8z"/>
        <path d="M312 280l1.6 4 4 .8-4 1.6-1.6 4-1.6-4-4-1.6 4-.8z"/>
        <circle cx="80" cy="60" r="3" fill="#fff"/>
        <circle cx="290" cy="70" r="3" fill="#fff"/>
      </g>

      <g className="rb-floatA rb-delay-5">
        {/* Lightbulb above head */}
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

        {/* Left arm — wide welcoming */}
        <g filter="url(#fShadow)">
          <circle cx="124" cy="262" r="15" fill="url(#gChrome)" stroke="#7C8A9E" strokeWidth="1.5"/>
          <rect x="94" y="266" width="44" height="30" rx="15" fill="url(#gBody)" transform="rotate(-36 116 281)"/>
          <rect x="66" y="288" width="40" height="28" rx="14" fill="url(#gBody)" transform="rotate(-58 86 302)"/>
          <circle cx="62" cy="318" r="17" fill="url(#gBody)" stroke="#C9D4E0" strokeWidth="1.2"/>
          <ellipse cx="50" cy="306" rx="4" ry="8" fill="url(#gBody)" stroke="#C9D4E0" strokeWidth="1" transform="rotate(-30 50 306)"/>
          <ellipse cx="58" cy="300" rx="4" ry="8" fill="url(#gBody)" stroke="#C9D4E0" strokeWidth="1" transform="rotate(-15 58 300)"/>
          <ellipse cx="68" cy="298" rx="4" ry="8" fill="url(#gBody)" stroke="#C9D4E0" strokeWidth="1"/>
          <ellipse cx="76" cy="302" rx="4" ry="8" fill="url(#gBody)" stroke="#C9D4E0" strokeWidth="1" transform="rotate(15 76 302)"/>
        </g>

        {/* Right arm — wide welcoming */}
        <g filter="url(#fShadow)">
          <circle cx="236" cy="262" r="15" fill="url(#gChrome)" stroke="#7C8A9E" strokeWidth="1.5"/>
          <rect x="222" y="266" width="44" height="30" rx="15" fill="url(#gBody)" transform="rotate(36 244 281)"/>
          <rect x="254" y="288" width="40" height="28" rx="14" fill="url(#gBody)" transform="rotate(58 274 302)"/>
          <circle cx="298" cy="318" r="17" fill="url(#gBody)" stroke="#C9D4E0" strokeWidth="1.2"/>
          <ellipse cx="310" cy="306" rx="4" ry="8" fill="url(#gBody)" stroke="#C9D4E0" strokeWidth="1" transform="rotate(30 310 306)"/>
          <ellipse cx="302" cy="300" rx="4" ry="8" fill="url(#gBody)" stroke="#C9D4E0" strokeWidth="1" transform="rotate(15 302 300)"/>
          <ellipse cx="292" cy="298" rx="4" ry="8" fill="url(#gBody)" stroke="#C9D4E0" strokeWidth="1"/>
          <ellipse cx="284" cy="302" rx="4" ry="8" fill="url(#gBody)" stroke="#C9D4E0" strokeWidth="1" transform="rotate(-15 284 302)"/>
        </g>

        <use href="#robotBase" width="360" height="400"/>

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

        {/* Chest emblem: gold star badge */}
        <g transform="translate(180 310)">
          <circle r="24" fill="url(#gGold)" stroke="#8F5300" strokeWidth="2"/>
          <circle r="24" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="1" strokeDasharray="2 3"/>
          <path d="M0 -14l3.5 8 8.5 1-6.5 5.5 2 8.5L0 4.5l-7.5 4 2-8.5L-12 -5l8.5-1z" fill="#fff" stroke="#8F5300" strokeWidth="1.6" strokeLinejoin="round"/>
        </g>
      </g>
    </svg>
  );
}
