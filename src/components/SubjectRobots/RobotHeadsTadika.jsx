import './kidRobots.css';

/**
 * Tadika (age 4–6) robot heads — one per pillar, themed for little kids.
 *
 * Distinct from the older `RobotHead*` set: chubbier round head, bigger eyes,
 * rosy cheeks. FLAT + STATIC by design (no `filter=` attributes, no rb-blink /
 * rb-pulseGlow), so dropping several on one page stays lag-free.
 *
 * Colours reuse the shared gradients (gHead / gScreen / gEye / gChrome) defined
 * in <RobotDefs />, so RobotDefs must be rendered once on the page.
 */

// Shared chubby toddler-bot head + face. Pillar accessories are passed as children.
function KidHead({ className = '', style = {}, accent = '#46D8FF', children, ...props }) {
  return (
    <svg viewBox="0 0 360 240" className={`rbk-head ${className}`} style={style} {...props}>
      {/* Antenna with a pillar-coloured bulb */}
      <line x1="180" y1="64" x2="180" y2="40" stroke="#A8B5C5" strokeWidth="6" strokeLinecap="round" />
      <circle cx="180" cy="33" r="10" fill={accent} />
      <circle cx="177" cy="30" r="3" fill="#fff" opacity=".7" />

      {/* Ears */}
      <rect x="78" y="128" width="18" height="42" rx="9" fill="url(#gChrome)" stroke="#7C8A9E" strokeWidth="2" />
      <rect x="264" y="128" width="18" height="42" rx="9" fill="url(#gChrome)" stroke="#7C8A9E" strokeWidth="2" />
      <circle cx="87" cy="149" r="4" fill={accent} />
      <circle cx="273" cy="149" r="4" fill={accent} />

      {/* Chubby round head + glossy highlight */}
      <rect x="92" y="62" width="176" height="160" rx="64" fill="url(#gHead)" stroke="#C9D4E0" strokeWidth="3" />
      <rect x="112" y="74" width="118" height="34" rx="17" fill="#fff" opacity=".5" />

      {/* Face screen */}
      <rect x="116" y="92" width="128" height="116" rx="46" fill="url(#gScreen)" />

      {/* Accessories that sit ON TOP of the head (hats, blocks, songkok…) */}
      {children}

      {/* Big friendly eyes */}
      <g>
        <ellipse cx="150" cy="152" rx="21" ry="23" fill="url(#gEye)" />
        <ellipse cx="150" cy="153" rx="11" ry="11" fill="#0E2A3D" />
        <circle cx="145" cy="148" r="5" fill="#fff" />
        <circle cx="154" cy="158" r="2.4" fill="#fff" opacity=".8" />
        <ellipse cx="210" cy="152" rx="21" ry="23" fill="url(#gEye)" />
        <ellipse cx="210" cy="153" rx="11" ry="11" fill="#0E2A3D" />
        <circle cx="205" cy="148" r="5" fill="#fff" />
        <circle cx="214" cy="158" r="2.4" fill="#fff" opacity=".8" />
      </g>

      {/* Rosy cheeks + little smile */}
      <ellipse cx="124" cy="184" rx="12" ry="7.5" fill="#FFB3C7" opacity=".75" />
      <ellipse cx="236" cy="184" rx="12" ry="7.5" fill="#FFB3C7" opacity=".75" />
      <path d="M158 188 Q180 206 202 188" stroke="#46D8FF" strokeWidth="7" strokeLinecap="round" fill="none" />
    </svg>
  );
}

const FONT = 'Baloo 2, system-ui, sans-serif';

/* ── Membaca (Reading) — open picture book on the head ─────────────────────── */
export function RobotHeadTadikaReading(props) {
  return (
    <KidHead accent="#FF4757" {...props}>
      <g transform="translate(180 62)">
        <path d="M-48 8 Q-24 -8 0 0 L0 18 Q-24 10 -48 18 Z" fill="#FF8B95" stroke="#C0392B" strokeWidth="2" strokeLinejoin="round" />
        <path d="M48 8 Q24 -8 0 0 L0 18 Q24 10 48 18 Z" fill="#86E0BA" stroke="#1F8A5B" strokeWidth="2" strokeLinejoin="round" />
        <path d="M0 0 V18" stroke="#7A4A2B" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M-40 6 q16 -6 34 -2 M-40 11 q16 -6 34 -2" stroke="#fff" strokeWidth="1.6" fill="none" opacity=".85" />
        <path d="M40 6 q-16 -6 -34 -2 M40 11 q-16 -6 -34 -2" stroke="#fff" strokeWidth="1.6" fill="none" opacity=".85" />
      </g>
    </KidHead>
  );
}

/* ── Bertutur (Speaking) — chubby toy mic + music notes + bib ──────────────── */
export function RobotHeadTadikaSpeaking(props) {
  return (
    <KidHead accent="#FFA502" {...props}>
      {/* bib collar */}
      <path d="M150 214 Q180 230 210 214 L208 220 Q180 234 152 220 Z" fill="#FFA502" opacity=".9" />
      {/* music notes (top-left) */}
      <g fill="#FFA502">
        <circle cx="108" cy="78" r="6" />
        <rect x="112.5" y="56" width="3.5" height="24" rx="1.5" />
        <circle cx="132" cy="70" r="5" />
        <rect x="135.5" y="52" width="3" height="20" rx="1.5" />
      </g>
      {/* toy microphone (right) */}
      <g transform="translate(262 168) rotate(22)">
        <circle cx="0" cy="-8" r="14" fill="#5B6472" stroke="#2C3340" strokeWidth="2" />
        <path d="M-9 -12 h18 M-9 -8 h18 M-9 -4 h18" stroke="#2C3340" strokeWidth="1.4" />
        <rect x="-5" y="2" width="10" height="22" rx="5" fill="#8E99A8" stroke="#2C3340" strokeWidth="2" />
        <ellipse cx="0" cy="-13" rx="4" ry="2.5" fill="#fff" opacity=".5" />
      </g>
    </KidHead>
  );
}

/* ── Tulisan Jawi — songkok (kopiah) + crescent & star ─────────────────────── */
export function RobotHeadTadikaJawi(props) {
  return (
    <KidHead accent="#FFD60A" {...props}>
      <g transform="translate(180 80)">
        {/* dome */}
        <path d="M-60 8 Q-60 -34 0 -34 Q60 -34 60 8 Z" fill="#1B1D29" />
        {/* band */}
        <rect x="-62" y="6" width="124" height="15" rx="7" fill="#0E0F18" />
        <path d="M-58 6 Q0 -1 58 6" stroke="#3A3D52" strokeWidth="2" fill="none" opacity=".8" />
        {/* crescent + star badge */}
        <path d="M-6 -16 a11 11 0 1 0 0 22 a8.5 8.5 0 1 1 0 -22 z" fill="#FFD60A" />
        <path d="M11 -8 l1.6 4 4.2 .3 -3.2 2.7 1 4.1 -3.6 -2.2 -3.6 2.2 1 -4.1 -3.2 -2.7 4.2 -.3 z" fill="#FFD60A" />
      </g>
    </KidHead>
  );
}

/* ── Matematik (Math) — stacked 1·2·3 number blocks ────────────────────────── */
export function RobotHeadTadikaMath(props) {
  return (
    <KidHead accent="#00BCD4" {...props}>
      <g fontFamily={FONT} fontWeight="800" fontSize="20" textAnchor="middle">
        <g transform="translate(150 64) rotate(-8)">
          <rect x="-15" y="-30" width="30" height="30" rx="7" fill="#FF6B6B" stroke="#D64545" strokeWidth="2" />
          <text x="0" y="-8" fill="#fff">1</text>
        </g>
        <g transform="translate(182 60)">
          <rect x="-15" y="-30" width="30" height="30" rx="7" fill="#4DD0E1" stroke="#2A9DAD" strokeWidth="2" />
          <text x="0" y="-8" fill="#fff">2</text>
        </g>
        <g transform="translate(214 64) rotate(8)">
          <rect x="-15" y="-30" width="30" height="30" rx="7" fill="#FFD166" stroke="#E0A93B" strokeWidth="2" />
          <text x="0" y="-8" fill="#7A5B12">3</text>
        </g>
      </g>
    </KidHead>
  );
}
