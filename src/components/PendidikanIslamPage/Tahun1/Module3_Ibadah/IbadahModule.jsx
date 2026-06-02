import Tahun1ModuleHubLayout from '../Tahun1ModuleHubLayout';

const THEME = {
  pageGradient: 'linear-gradient(180deg, #EBF8FF 0%, #E0F2FE 40%, #F0F9FF 100%)',
  dark: '#0C4A6E',
  accent: '#0891B2',
  stageGradient: 'linear-gradient(145deg, #0E7490, #0891B2, #06B6D4)',
  pillGradient: 'linear-gradient(135deg, #0891B2, #06B6D4)',
};

const topics = [
  {
    id: 'istinja',
    title: "Konsep Istinja'",
    desc: 'Cara membersihkan diri selepas buang air besar atau kecil',
    num: '3.1',
    visual: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M26 8 Q32 24 32 34 Q32 42 26 42 Q20 42 20 34 Q20 24 26 8Z" fill="#0EA5E9" />
        <path d="M24 16 Q28 26 28 32 Q28 36 26 36 Q24 36 24 32 Q24 26 24 16Z" fill="#7DD3FC" opacity="0.5" />
        <circle cx="16" cy="38" r="3.5" fill="#38BDF8" opacity="0.7" />
        <circle cx="36" cy="36" r="2.5" fill="#38BDF8" opacity="0.6" />
        <circle cx="14" cy="46" r="2" fill="#7DD3FC" opacity="0.5" />
        <circle cx="36" cy="44" r="1.8" fill="#7DD3FC" opacity="0.4" />
        <rect x="40" y="56" width="8" height="36" rx="2" fill="#FDE68A" />
        <rect x="48" y="52" width="10" height="40" rx="2" fill="#FEF3C7" />
        <rect x="58" y="48" width="12" height="44" rx="2" fill="#FFFBEB" />
        <rect x="70" y="48" width="10" height="44" rx="3" fill="#FEF3C7" />
        <rect x="80" y="54" width="8" height="38" rx="2" fill="#FDE68A" />
        <path d="M58 48 Q61 42 64 48 Q67 42 70 48" fill="#FFFBEB" />
        <line x1="62" y1="48" x2="62" y2="92" stroke="#FDE68A" strokeWidth="1" opacity="0.7" />
        <line x1="66" y1="48" x2="66" y2="92" stroke="#FDE68A" strokeWidth="1" opacity="0.7" />
        <line x1="74" y1="48" x2="74" y2="92" stroke="#FDE68A" strokeWidth="1" opacity="0.6" />
        <line x1="52" y1="52" x2="52" y2="92" stroke="#FDE68A" strokeWidth="1" opacity="0.6" />
        <line x1="44" y1="56" x2="44" y2="92" stroke="#FDE68A" strokeWidth="1" opacity="0.5" />
        <ellipse cx="98" cy="74" rx="11" ry="8" fill="#A8A29E" />
        <ellipse cx="98" cy="72" rx="8" ry="5" fill="#C4BFB8" opacity="0.6" />
        <ellipse cx="95" cy="70" rx="3.5" ry="2.5" fill="#E7E5E4" opacity="0.4" />
        <ellipse cx="86" cy="82" rx="8" ry="6" fill="#A78B5A" />
        <ellipse cx="86" cy="80" rx="6" ry="3.5" fill="#C4A97D" opacity="0.6" />
        <ellipse cx="84" cy="78" rx="2.5" ry="2" fill="#D4C5A9" opacity="0.4" />
        <ellipse cx="108" cy="82" rx="6" ry="5" fill="#9CA3AF" />
        <ellipse cx="108" cy="81" rx="4" ry="3" fill="#C4CBD1" opacity="0.5" />
        <ellipse cx="106" cy="80" rx="2" ry="1.5" fill="#E5E7EB" opacity="0.4" />
        <path d="M8 98 L112 98" stroke="#D4D4D8" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <text x="6" y="26" fontSize="7" fill="#F59E0B" opacity="0.6">✦</text>
        <text x="100" y="16" fontSize="6" fill="#EC4899" opacity="0.5">✦</text>
      </svg>
    ),
  },
  {
    id: 'air-mutlak',
    title: 'Air Mutlak',
    desc: 'Mengenal air suci yang boleh digunakan untuk bersuci',
    num: '3.2',
    visual: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M60 18 Q64 28 64 36 Q64 42 60 42 Q56 42 56 36 Q56 28 60 18Z" fill="#0891B2" opacity="0.9" />
        <path d="M60 18 Q63 26 63 34 Q63 38 60 38 Q57 38 57 34 Q57 26 60 18Z" fill="#67E8F9" opacity="0.5" />
        <path d="M36 48 Q40 58 40 66 Q40 72 36 72 Q32 72 32 66 Q32 58 36 48Z" fill="#A78BFA" opacity="0.85" />
        <path d="M36 48 Q39 56 39 64 Q39 68 36 68 Q33 68 33 64 Q33 56 36 48Z" fill="#DDD6FE" opacity="0.5" />
        <path d="M84 48 Q88 58 88 66 Q88 72 84 72 Q80 72 80 66 Q80 58 84 48Z" fill="#F59E0B" opacity="0.85" />
        <path d="M84 48 Q87 56 87 64 Q87 68 84 68 Q81 68 81 64 Q81 56 84 48Z" fill="#FDE68A" opacity="0.5" />
        <circle cx="60" cy="86" r="10" fill="#22D3EE" opacity="0.7" />
        <circle cx="60" cy="86" r="5" fill="#A5F3FC" opacity="0.5" />
        <circle cx="60" cy="86" r="2" fill="#ECFEFF" opacity="0.8" />
        <circle cx="48" cy="80" r="2" fill="#EC4899" opacity="0.6" />
        <circle cx="72" cy="80" r="2" fill="#A78BFA" opacity="0.5" />
        <circle cx="54" cy="96" r="2" fill="#F59E0B" opacity="0.5" />
        <circle cx="66" cy="96" r="2" fill="#22D3EE" opacity="0.5" />
      </svg>
    ),
  },
  {
    id: 'amali-wuduk',
    title: 'Amali Wuduk',
    desc: 'Rukun, sunat dan perkara yang membatalkan wuduk',
    num: '3.3',
    visual: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="45" cy="50" rx="14" ry="18" fill="#FFEDD5" />
        <ellipse cx="75" cy="50" rx="14" ry="18" fill="#FFEDD5" />
        <circle cx="45" cy="40" r="8" fill="#0C4A6E" opacity="0.8" />
        <circle cx="75" cy="40" r="8" fill="#0C4A6E" opacity="0.8" />
        <path d="M28 44 Q28 30 35 24 Q42 18 45 18" stroke="#06B6D4" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M62 44 Q62 30 69 24 Q76 18 79 18" stroke="#A78BFA" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M20 66 Q28 58 40 58 Q52 58 60 66" stroke="#22D3EE" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
        <path d="M60 66 Q68 58 80 58 Q92 58 100 66" stroke="#A78BFA" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
        <circle cx="28" cy="30" r="3" fill="#22D3EE" opacity="0.7" />
        <circle cx="24" cy="38" r="2.5" fill="#A78BFA" opacity="0.6" />
        <circle cx="32" cy="38" r="2" fill="#F59E0B" opacity="0.65" />
        <circle cx="65" cy="30" r="3" fill="#A78BFA" opacity="0.7" />
        <circle cx="61" cy="38" r="2.5" fill="#22D3EE" opacity="0.55" />
        <circle cx="69" cy="38" r="2" fill="#EC4899" opacity="0.6" />
        <circle cx="34" cy="26" r="2" fill="#F59E0B" opacity="0.5" />
        <circle cx="70" cy="26" r="2" fill="#22D3EE" opacity="0.5" />
      </svg>
    ),
  },
];

export default function IbadahModule({ onBack, onSelectTopic, language = 'bm' }) {
  return (
    <Tahun1ModuleHubLayout
      moduleNum={3}
      moduleName="Ibadah"
      moduleNameEn="Ibadah"
      theme={THEME}
      topics={topics}
      onBack={onBack}
      onSelectTopic={onSelectTopic}
      language={language}
    />
  );
}
