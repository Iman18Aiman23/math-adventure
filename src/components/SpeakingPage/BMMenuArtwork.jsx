const BASE = `${import.meta.env.BASE_URL}images/`;

const ARTWORK = {
  robot: `speaking/HeroRobotSpeaking.webp`,
  bm_kv: `speaking/Suku Kata (KV).webp`,
  bm_kvk: `speaking/Suku Kata (KVK).webp`,
  en_long_vowels: `speaking/Bunyi Huruf Bahasa Inggeris.webp`,
  numbers: `speaking/Nombor 1 – 100.webp`,
  common_objects: `speaking/Objek.webp`,
};

function ClayMicrophone() {
  return <svg className="bm-menu-category-art bm-menu-microphone-art" viewBox="0 0 80 80" fill="none">
    <defs>
      <linearGradient id="bm-mic-shell" x1="25" y1="11" x2="55" y2="49" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF83C5" />
        <stop offset=".45" stopColor="#F33C9B" />
        <stop offset="1" stopColor="#C71970" />
      </linearGradient>
      <linearGradient id="bm-mic-metal" x1="30" y1="46" x2="51" y2="70" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFC0E0" />
        <stop offset=".52" stopColor="#F052A4" />
        <stop offset="1" stopColor="#B91C67" />
      </linearGradient>
      <filter id="bm-mic-shadow" x="6" y="3" width="68" height="76" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#8A1B56" floodOpacity=".22" />
      </filter>
    </defs>
    <g filter="url(#bm-mic-shadow)">
      <rect x="27" y="9" width="26" height="39" rx="13" fill="url(#bm-mic-shell)" />
      <rect x="31" y="13" width="5" height="27" rx="2.5" fill="#FFD5EA" fillOpacity=".72" />
      <path d="M20 34v4a20 20 0 0 0 40 0v-4" stroke="url(#bm-mic-metal)" strokeWidth="7" strokeLinecap="round" />
      <path d="M40 58v9" stroke="url(#bm-mic-metal)" strokeWidth="7" strokeLinecap="round" />
      <path d="M29 70h22" stroke="url(#bm-mic-metal)" strokeWidth="7" strokeLinecap="round" />
      <path d="M35 23h10M35 29h10" stroke="#C51C70" strokeOpacity=".62" strokeWidth="2" strokeLinecap="round" />
    </g>
  </svg>;
}

export default function BMMenuArtwork({ topic }) {
  if (topic === 'bm_kv') return <ClayMicrophone />;
  const className = topic === 'robot' ? 'bm-menu-robot-art' : 'bm-menu-category-art';
  return <img className={className} src={`${BASE}${encodeURI(ARTWORK[topic])}`} alt="" />;
}
