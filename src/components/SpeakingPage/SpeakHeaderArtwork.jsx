// Decorative vector artwork keeps the reference's controls and text live HTML.
export default function SpeakHeaderArtwork() {
  return <>
    <svg className="bm-speak-block-art" viewBox="0 0 90 85" aria-hidden="true">
      <g transform="rotate(-15 28 32)">
        <rect x="8" y="12" width="37" height="42" rx="7" fill="#ef416d" />
        <rect x="7" y="9" width="34" height="40" rx="7" fill="#ff6488" />
        <path d="M13 15h19" stroke="#ffb4c8" strokeWidth="4" strokeLinecap="round" />
        <text x="24" y="40" textAnchor="middle" fill="white" fontFamily="Fredoka, sans-serif" fontWeight="600" fontSize="30">B</text>
      </g>
      <g transform="rotate(10 57 53)">
        <rect x="36" y="31" width="41" height="44" rx="7" fill="#ffbd25" />
        <rect x="34" y="28" width="38" height="43" rx="7" fill="#ffdc55" />
        <path d="M42 33h21" stroke="#ffe994" strokeWidth="4" strokeLinecap="round" />
        <text x="53" y="61" textAnchor="middle" fill="white" fontFamily="Fredoka, sans-serif" fontWeight="600" fontSize="32">A</text>
      </g>
      <path d="m66 14 6-8m2 17 10-5" fill="none" stroke="#ffd52e" strokeWidth="6" strokeLinecap="round" />
    </svg>
    <svg className="bm-speak-robot-art" viewBox="0 0 110 118" aria-hidden="true">
      <path d="m14 32-6-8m1 19-8-4" stroke="#ffd52e" strokeWidth="5" strokeLinecap="round" />
      <path d="M22 59C15 6 91 3 94 53" fill="#e9faff" stroke="#35adf9" strokeWidth="4" />
      <ellipse cx="61" cy="98" rx="35" ry="12" fill="#183350" transform="rotate(8 61 98)" />
      <rect x="41" y="72" width="40" height="32" rx="15" fill="#ecf9ff" />
      <g transform="rotate(8 60 53)">
        <rect x="24" y="24" width="68" height="60" rx="24" fill="#a4d9f5" />
        <rect x="22" y="21" width="68" height="60" rx="24" fill="#f5fcff" />
        <rect x="29" y="32" width="54" height="43" rx="17" fill="#112342" />
        <path d="M39 50q4-6 8 0m18 0q4-6 8 0" fill="none" stroke="#f5fdff" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M49 58q8 11 15 0" fill="white" />
        <ellipse cx="36" cy="58" rx="4" ry="2" fill="#ff7a9e" />
        <ellipse cx="76" cy="58" rx="4" ry="2" fill="#ff7a9e" />
      </g>
      <rect x="17" y="47" width="11" height="25" rx="6" fill="#268eec" />
      <rect x="88" y="45" width="12" height="27" rx="6" fill="#188ef1" />
      <rect x="88" y="48" width="7" height="20" rx="4" fill="#3cbeff" />
      <g transform="rotate(-12 35 92)">
        <rect x="19" y="76" width="30" height="33" rx="6" fill="#ff547e" />
        <path d="M24 80h17" stroke="#ff9bb5" strokeWidth="3" strokeLinecap="round" />
        <text x="34" y="101" textAnchor="middle" fill="white" fontFamily="Fredoka, sans-serif" fontWeight="600" fontSize="26">B</text>
      </g>
      <g transform="rotate(14 65 99)">
        <rect x="49" y="85" width="32" height="32" rx="6" fill="#ffc732" />
        <path d="M55 89h18" stroke="#ffe888" strokeWidth="3" strokeLinecap="round" />
        <text x="65" y="111" textAnchor="middle" fill="white" fontFamily="Fredoka, sans-serif" fontWeight="600" fontSize="26">A</text>
      </g>
      <ellipse cx="17" cy="97" rx="7" ry="8" fill="#f5fcff" />
      <ellipse cx="83" cy="108" rx="7" ry="8" fill="#f5fcff" />
    </svg>
  </>;
}
