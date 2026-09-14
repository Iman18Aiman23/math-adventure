import { useId } from 'react';

// Page-specific artwork: no robot frames or small labels on the topic tiles.
export function MathTopicArtwork({ topic }) {
  const id = useId().replace(/:/g, '');
  const url = name => `url(#${id}-${name})`;
  const operation = topic === 'operations';
  const division = topic === 'faq';
  const journey = topic === 'journey';
  const colors = operation ? ['#56B8FF', '#0874E9'] : division ? ['#FFA8AF', '#F75D67'] : journey ? ['#FFD857', '#F5A400'] : ['#6AE5D1', '#21C4AC'];
  return (
    <svg viewBox="0 0 200 200" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-tile`} x1="20" y1="4" x2="164" y2="200" gradientUnits="userSpaceOnUse"><stop stopColor={colors[0]} /><stop offset="1" stopColor={colors[1]} /></linearGradient>
        <linearGradient id={`${id}-shine`} x2=".7" y2="1"><stop stopColor="white" stopOpacity=".38" /><stop offset="1" stopColor="white" stopOpacity="0" /></linearGradient>
        <linearGradient id={`${id}-green`} x2=".5" y2="1"><stop stopColor="#80DE87" /><stop offset="1" stopColor="#32BA59" /></linearGradient>
        <linearGradient id={`${id}-red`} x2=".5" y2="1"><stop stopColor="#FF8087" /><stop offset="1" stopColor="#FF3E4C" /></linearGradient>
        <linearGradient id={`${id}-yellow`} x2=".6" y2="1"><stop stopColor="#FFD25B" /><stop offset="1" stopColor="#FFA51C" /></linearGradient>
        <linearGradient id={`${id}-purple`} x2=".5" y2="1"><stop stopColor="#CB8AFF" /><stop offset="1" stopColor="#9939EC" /></linearGradient>
        <linearGradient id={`${id}-paper`} x2=".6" y2="1"><stop stopColor="#FFFCED" /><stop offset="1" stopColor="#FFF0CD" /></linearGradient>
        <linearGradient id={`${id}-blue`} x2=".7" y2="1"><stop stopColor="#2E9AFF" /><stop offset="1" stopColor="#0053C1" /></linearGradient>
        <filter id={`${id}-shadow`} x="-30%" y="-25%" width="170%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="2.8" floodColor="#17375B" floodOpacity=".25" /></filter>
      </defs>
      <rect x="3" y="3" width="194" height="194" rx="38" fill={url('tile')} />
      <path d="M13 61C13 30 30 12 62 12H140" stroke={url('shine')} strokeWidth="8" strokeLinecap="round" />
      {operation ? (
        <g filter={url('shadow')}>
          {[['green', 29, 26], ['red', 108, 26], ['yellow', 29, 106], ['purple', 108, 106]].map(([color, x, y]) => <g key={color}>
            <rect x={x} y={y + 3} width="65" height="65" rx="15" fill={color === 'green' ? '#229D44' : color === 'red' ? '#DB283E' : color === 'yellow' ? '#E99015' : '#8025CB'} />
            <rect x={x} y={y} width="65" height="65" rx="15" fill={url(color)} />
            <path d={`M${x + 6} ${y + 26}Q${x + 6} ${y + 5} ${x + 26} ${y + 5}`} stroke="white" strokeOpacity=".16" strokeWidth="4" strokeLinecap="round" />
          </g>)}
          <g stroke="white" strokeWidth="8" strokeLinecap="round">
            <path d="M48 58H75M61.5 44.5V71.5M128 58H153M50 126L74 150M74 126L50 150M128 139H153" />
          </g>
          <g fill="white"><circle cx="140.5" cy="122" r="5" /><circle cx="140.5" cy="156" r="5" /></g>
        </g>
      ) : journey ? (
        <g filter={url('shadow')}>
          <path d="M58 58H142V86C142 116 124 137 104 143V159H127V176H73V159H96V143C76 137 58 116 58 86Z" fill="#B97900" opacity=".58" />
          <path d="M62 48H138V82C138 114 120 132 100 138C80 132 62 114 62 82Z" fill={url('yellow')} />
          <path d="M65 58H39C39 89 52 107 72 112M135 58H161C161 89 148 107 128 112" stroke="#FFF4B8" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M83 70L96 70L100 57L104 70H117L106 78L111 91L100 83L89 91L94 78Z" fill="#FFF8D8" />
          <rect x="84" y="138" width="32" height="27" rx="8" fill="#D59000" />
          <rect x="68" y="160" width="64" height="19" rx="9.5" fill="#7B4E00" />
          <path d="M41 143C68 123 93 124 116 143C132 156 149 156 166 144" stroke="#0956A4" strokeWidth="7" strokeLinecap="round" strokeDasharray="1 17" />
          <g fill="#FFFFFF">
            <circle cx="42" cy="143" r="6" />
            <circle cx="100" cy="133" r="6" />
            <circle cx="166" cy="144" r="6" />
          </g>
        </g>
      ) : division ? (
        <>
          <g filter={url('shadow')}>
            <rect x="23" y="27" width="140" height="148" rx="17" fill="#DAC799" />
            <rect x="23" y="24" width="140" height="148" rx="17" fill={url('paper')} stroke="#FFFBEA" strokeWidth="2" />
            <path d="M37 48H149M37 70H149M37 92H149M37 114H149M37 136H149M37 158H149" stroke="#FAE6C7" strokeWidth="2" />
            <g fontFamily="Arial, sans-serif" fontWeight="700" fontSize="25" textAnchor="middle">
              <text x="96" y="64" fill="#24A453">6</text><text x="49" y="94" fill="#EF3F37">4</text>
              <text x="96" y="94" fill="#14243E">24</text><text x="97" y="126" fill="#3D3540" fontSize="22">−24</text><text x="98" y="155" fill="#8F4037" fontSize="21">0</text>
            </g>
            <path d="M124 72H65V103M78 133H119" stroke="#27303B" strokeWidth="2.5" strokeLinecap="round" />
          </g>
          <g transform="rotate(19 164 124)" filter={url('shadow')}>
            <path d="M152 79Q152 73 158 73H170Q176 73 176 79V157H152Z" fill="#FFCB37" />
            <path d="M152 88H159V157H152Z" fill="#FFE27D" /><path d="M169 88H176V157H169Z" fill="#F3A011" />
            <path d="M152 157L164 180L176 157Z" fill="#F5CE91" /><path d="M159 171L164 180L169 171Z" fill="#925339" />
            <path d="M152 78V71Q152 63 160 63H168Q176 63 176 71V78Z" fill="#EF5559" /><path d="M152 79H176V89H152Z" fill="#FFE7A6" />
          </g>
        </>
      ) : (
        <g filter={url('shadow')}>
          <path d="M58 166L49 180M144 166L153 180" stroke="#0757A4" strokeWidth="8" strokeLinecap="round" />
          <path d="M60 43L54 32M140 43L147 32" stroke="#0878BF" strokeWidth="7" strokeLinecap="round" />
          <path d="M38 56Q29 38 48 28Q66 19 75 37Z" fill={url('yellow')} /><path d="M124 37Q134 20 152 29Q171 38 162 56Z" fill={url('yellow')} />
          <path d="M41 41Q46 30 57 31M141 30Q151 30 157 38" stroke="#FFE56E" strokeWidth="5" strokeLinecap="round" />
          <circle cx="100" cy="111" r="66" fill={url('blue')} /><circle cx="100" cy="109" r="56" fill="#BEE3FF" />
          <circle cx="100" cy="109" r="52" fill="#FFFFFF" />
          <g fill="#0860BD" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="16" textAnchor="middle"><text x="100" y="72">12</text><text x="142" y="115">3</text><text x="100" y="154">6</text><text x="58" y="115">9</text></g>
          <path d="M100 109L73 84" stroke="#FF4A54" strokeWidth="7" strokeLinecap="round" /><path d="M100 109L129 85" stroke="#0662BA" strokeWidth="7" strokeLinecap="round" />
          <circle cx="100" cy="109" r="8" fill="#075CAC" /><circle cx="100" cy="109" r="4.5" fill="#FFD134" />
        </g>
      )}
    </svg>
  );
}

export function MathBookMascot() {
  const id = useId().replace(/:/g, '');
  const url = name => `url(#${id}-${name})`;
  return (
    <svg viewBox="0 0 300 380" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-white`} x1="65" y1="80" x2="260" y2="290" gradientUnits="userSpaceOnUse"><stop stopColor="white" /><stop offset=".55" stopColor="#F7F8FF" /><stop offset="1" stopColor="#C8CCE7" /></linearGradient>
        <linearGradient id={`${id}-face`} x1="90" y1="111" x2="235" y2="219" gradientUnits="userSpaceOnUse"><stop stopColor="#354B7A" /><stop offset=".6" stopColor="#17284F" /><stop offset="1" stopColor="#111C3E" /></linearGradient>
        <linearGradient id={`${id}-ear`} x2=".7" y2="1"><stop stopColor="#58BDFF" /><stop offset=".5" stopColor="#258AFF" /><stop offset="1" stopColor="#0750E7" /></linearGradient>
        <linearGradient id={`${id}-book`} x2="1" y2=".6"><stop stopColor="#74CD70" /><stop offset=".5" stopColor="#3FAB50" /><stop offset="1" stopColor="#158938" /></linearGradient>
        <linearGradient id={`${id}-cap`} x2=".7" y2="1"><stop stopColor="#3D4D7B" /><stop offset="1" stopColor="#142244" /></linearGradient>
        <radialGradient id={`${id}-hand`} cx=".3" cy=".2" r=".9"><stop stopColor="white" /><stop offset=".6" stopColor="#F3F3FF" /><stop offset="1" stopColor="#C0C8E4" /></radialGradient>
        <filter id={`${id}-soft`} x="-25%" y="-25%" width="160%" height="160%"><feDropShadow dx="1" dy="4" stdDeviation="3" floodColor="#234478" floodOpacity=".16" /></filter>
      </defs>
      <path d="M17 115L30 134M7 150L27 155" stroke="#FFD037" strokeWidth="12" strokeLinecap="round" />
      <path d="M119 260Q176 233 227 279L237 377H104Z" fill={url('white')} />
      <path d="M207 259Q248 259 256 295Q266 327 231 340L212 314Z" fill={url('white')} />
      <path d="M227 286Q258 286 259 312Q254 335 234 333L217 315Z" fill={url('face')} />
      <g transform="rotate(9 162 168)">
        <ellipse cx="64" cy="162" rx="20" ry="35" fill={url('ear')} /><ellipse cx="57" cy="155" rx="8" ry="22" fill="#8AD2FF" opacity=".6" />
        <rect x="67" y="81" width="193" height="186" rx="76" fill={url('white')} stroke="#D8E0F0" strokeWidth="1.5" />
        <rect x="85" y="105" width="154" height="128" rx="45" fill={url('face')} />
        <ellipse cx="116" cy="122" rx="24" ry="9" transform="rotate(-29 116 122)" fill="#7991BA" opacity=".24" />
        <ellipse cx="259" cy="171" rx="18" ry="34" fill={url('ear')} /><ellipse cx="258" cy="161" rx="9" ry="20" fill="#78C5FF" opacity=".45" />
        <g stroke="white" strokeWidth="7" strokeLinecap="round"><path d="M112 166Q119 143 131 164M194 169Q202 147 212 171" /></g>
        <path d="M149 182Q163 193 179 183Q177 206 162 205Q150 202 149 182Z" fill="white" />
        <ellipse cx="110" cy="190" rx="10" ry="6" fill="#E580A6" opacity=".75" /><ellipse cx="215" cy="199" rx="10" ry="6" fill="#E580A6" opacity=".75" />
        <ellipse cx="99" cy="236" rx="9" ry="4" fill="#F3CEE1" opacity=".5" /><ellipse cx="226" cy="238" rx="9" ry="4" fill="#F3CEE1" opacity=".5" />
      </g>
      <g transform="rotate(8 182 60)" filter={url('soft')}>
        <path d="M89 45L160 17L269 53L197 87Z" fill={url('cap')} stroke="#465680" strokeWidth="3" strokeLinejoin="round" />
        <path d="M135 58Q174 40 223 67L221 103Q177 84 137 85Z" fill={url('cap')} />
        <path d="M148 62L144 75" stroke="#52628B" strokeWidth="7" strokeLinecap="round" opacity=".5" />
        <path d="M201 33L262 54L275 110" stroke="#FFCD32" strokeWidth="4" strokeLinecap="round" />
        <circle cx="275" cy="113" r="6" fill="#FFCA29" /><path d="M272 120L270 142Q276 146 284 140L279 119Z" fill="#FFC52A" />
      </g>
      <g transform="rotate(9 139 293)" filter={url('soft')}>
        <rect x="63" y="229" width="135" height="130" rx="10" fill="#248E39" />
        <path d="M68 230Q70 221 81 223L187 229Q196 230 196 241Z" fill="#F7FFF0" stroke="#86CF7A" strokeWidth="3" />
        <rect x="63" y="231" width="133" height="130" rx="9" fill={url('book')} />
        <path d="M75 237V353" stroke="#A5DD8B" strokeWidth="4" opacity=".45" />
        <path d="M113 294H153M133 273V315" stroke="white" strokeWidth="11" strokeLinecap="round" />
      </g>
      <ellipse cx="64" cy="289" rx="23" ry="30" transform="rotate(17 64 289)" fill={url('hand')} />
      <ellipse cx="211" cy="318" rx="25" ry="29" transform="rotate(24 211 318)" fill={url('hand')} />
    </svg>
  );
}
