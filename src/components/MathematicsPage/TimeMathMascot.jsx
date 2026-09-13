import { useId } from 'react';

// An inquisitive math tutor: open eyes, raised finger, and a time equation tablet.
export default function TimeMathMascot() {
  const id = useId().replace(/:/g, '');
  const url = name => `url(#${id}-${name})`;
  return (
    <svg viewBox="0 0 300 380" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-shell`} x1="67" y1="70" x2="247" y2="310" gradientUnits="userSpaceOnUse"><stop stopColor="white" /><stop offset=".55" stopColor="#F1FAFF" /><stop offset="1" stopColor="#B5CADD" /></linearGradient>
        <linearGradient id={`${id}-face`} x1="84" y1="89" x2="220" y2="198" gradientUnits="userSpaceOnUse"><stop stopColor="#315675" /><stop offset=".55" stopColor="#193551" /><stop offset="1" stopColor="#112640" /></linearGradient>
        <linearGradient id={`${id}-teal`} x2=".7" y2="1"><stop stopColor="#89EEDD" /><stop offset=".45" stopColor="#31BFAE" /><stop offset="1" stopColor="#0D887F" /></linearGradient>
        <linearGradient id={`${id}-tablet`} x2=".7" y2="1"><stop stopColor="#53779E" /><stop offset="1" stopColor="#244266" /></linearGradient>
        <radialGradient id={`${id}-hand`} cx=".25" cy=".2" r=".9"><stop stopColor="white" /><stop offset=".6" stopColor="#EFF8FF" /><stop offset="1" stopColor="#B9CEDF" /></radialGradient>
        <linearGradient id={`${id}-gold`} x2=".7" y2="1"><stop stopColor="#FFEA88" /><stop offset="1" stopColor="#F6B931" /></linearGradient>
        <filter id={`${id}-shadow`} x="-25%" y="-25%" width="160%" height="170%"><feDropShadow dx="1" dy="4" stdDeviation="3" floodColor="#224D69" floodOpacity=".18" /></filter>
      </defs>
      {/* A single idea bubble gives the raised-finger pose a clear focal point. */}
      <g filter={url('shadow')}>
        <path d="M239 25H268Q285 25 285 42V67Q285 82 269 82H260L247 94L249 82H239Q223 82 223 66V42Q223 25 239 25Z" fill="#FFFCED" />
        <path d="M238 51H252M245 44V58M262 47H274M262 56H274" stroke="#DDA02E" strokeWidth="4" strokeLinecap="round" />
      </g>
      <path d="M104 238Q153 217 204 246L222 373H86Z" fill={url('shell')} />
      <path d="M122 247Q151 259 185 247" stroke="#C5D9E5" strokeWidth="5" strokeLinecap="round" />
      {/* Bent raised arm and extended index finger. */}
      <path d="M202 261Q236 269 249 249L263 200" stroke="#C2D5E2" strokeWidth="32" strokeLinecap="round" />
      <path d="M204 255Q235 263 246 244L257 201" stroke={url('shell')} strokeWidth="25" strokeLinecap="round" />
      <ellipse cx="259" cy="192" rx="23" ry="25" transform="rotate(12 259 192)" fill={url('hand')} />
      <rect x="250" y="149" width="16" height="48" rx="8" transform="rotate(9 258 173)" fill={url('hand')} />
      <path d="M243 188Q246 177 254 186L260 195" stroke="#D6E4EF" strokeWidth="9" strokeLinecap="round" />
      {/* Head tilts toward the raised hand; asymmetrical brows suggest discovery. */}
      <g transform="rotate(-8 149 146)" filter={url('shadow')}>
        <path d="M148 67V46" stroke="#72B4BE" strokeWidth="7" strokeLinecap="round" />
        <circle cx="148" cy="38" r="12" fill={url('gold')} /><circle cx="145" cy="34" r="4" fill="#FFF8D1" />
        <ellipse cx="58" cy="148" rx="17" ry="31" fill={url('teal')} />
        <rect x="63" y="67" width="175" height="174" rx="66" fill={url('shell')} stroke="#D6E5EF" strokeWidth="1.5" />
        <rect x="80" y="88" width="141" height="123" rx="40" fill={url('face')} />
        <ellipse cx="107" cy="106" rx="20" ry="8" transform="rotate(-27 107 106)" fill="#9AB4D1" opacity=".18" />
        <ellipse cx="237" cy="150" rx="16" ry="30" fill={url('teal')} /><ellipse cx="237" cy="141" rx="7" ry="17" fill="#ABF5E7" opacity=".45" />
        <path d="M103 126Q113 118 122 122M169 119Q182 108 194 115" stroke="#85EADD" strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="114" cy="147" rx="12" ry="17" fill="#F4FFFF" /><ellipse cx="182" cy="143" rx="15" ry="19" fill="#F4FFFF" />
        <ellipse cx="119" cy="145" rx="6" ry="9" fill="#27AA9D" /><ellipse cx="188" cy="141" rx="7" ry="10" fill="#27AA9D" />
        <circle cx="121" cy="142" r="3" fill="white" /><circle cx="190" cy="137" r="3.5" fill="white" />
        <path d="M132 177Q149 190 168 173Q165 195 150 196Q138 195 132 177Z" fill="white" />
        <ellipse cx="103" cy="179" rx="9" ry="5" fill="#E6A0B2" opacity=".6" /><ellipse cx="194" cy="174" rx="9" ry="5" fill="#E6A0B2" opacity=".6" />
      </g>
      {/* The equation connects mathematics to measuring time. */}
      <g transform="rotate(7 125 303)" filter={url('shadow')}>
        <rect x="48" y="245" width="151" height="116" rx="17" fill={url('tablet')} />
        <rect x="55" y="252" width="137" height="100" rx="11" fill="#F1FCF9" />
        <circle cx="81" cy="276" r="15" fill={url('teal')} /><circle cx="81" cy="276" r="11" fill="white" />
        <path d="M81 268V276H87" stroke="#244B65" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M107 270H174M107 280H148" stroke="#B8DFD5" strokeWidth="5" strokeLinecap="round" />
        <text x="123" y="312" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="19" fontWeight="700" fill="#254969">30 + 30</text>
        <text x="123" y="338" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="23" fontWeight="700" fill="#168E7B">= 60</text>
      </g>
      <ellipse cx="53" cy="309" rx="21" ry="27" transform="rotate(-15 53 309)" fill={url('hand')} />
    </svg>
  );
}
