import React from 'react';
import Tahun1ModuleHubLayout from '../../../PendidikanIslamPage/Tahun1/Tahun1ModuleHubLayout';

const CARD_BG = '#F3F4FF';
const THEME = {
  pageGradient: 'linear-gradient(180deg,#E0E7FF 0%,#A5B4FC 50%,#4338CA 100%)',
  dark: '#4338CA',
  accent: '#6366F1',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#E0E7FF 0%,#A5B4FC 55%,#4338CA 100%)',
  pillGradient: 'linear-gradient(180deg,#6366F1,#4338CA)',
};

const TOPICS = [
  {
    id: '3-masa',
    pill: 'TOPIK 2.1',
    title: 'Masa dan Waktu',
    desc: 'Baca waktu dalam minit dan saat, serta operasi melibatkan masa.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(99,102,241,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#6366F1" />
        <rect x="12" y="24" width="76" height="12" fill="#6366F1" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 2.1</text>
        <circle cx="34" cy="55" r="14" fill="#E0E7FF" stroke="#6366F1" strokeWidth="1.5" />
        <circle cx="34" cy="55" r="1.2" fill="#4338CA" />
        <line x1="34" y1="55" x2="34" y2="45" stroke="#4338CA" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="34" y1="55" x2="42" y2="53" stroke="#4338CA" strokeWidth="1.2" strokeLinecap="round" />
        <text x="50" y="76" fontFamily="'Fredoka',sans-serif" fontSize="5" fill="#4338CA">minit</text>
        <circle cx="70" cy="55" r="14" fill="#E0E7FF" stroke="#6366F1" strokeWidth="1.5" />
        <circle cx="70" cy="55" r="1.2" fill="#4338CA" />
        <line x1="70" y1="55" x2="70" y2="45" stroke="#4338CA" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="70" y1="55" x2="72" y2="63" stroke="#4338CA" strokeWidth="1.2" strokeLinecap="round" />
        <text x="86" y="76" fontFamily="'Fredoka',sans-serif" fontSize="5" fill="#4338CA">saat</text>
      </svg>
    ),
  },
  {
    id: '3-ukuran',
    pill: 'TOPIK 2.2',
    title: 'Ukuran (Panjang, Jisim & Cecair)',
    desc: 'Tukar unit panjang, jisim dan isi padu cecair antara unit metrik.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(99,102,241,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#6366F1" />
        <rect x="12" y="24" width="76" height="12" fill="#6366F1" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 2.2</text>
        <rect x="18" y="46" width="24" height="14" rx="2" fill="#C7D2FE" stroke="#6366F1" strokeWidth="1" />
        <text x="30" y="56" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="6" fontWeight="800" fill="#4338CA">3m</text>
        <text x="44" y="56" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="8" fontWeight="800" fill="#6366F1">=</text>
        <rect x="54" y="46" width="28" height="14" rx="2" fill="#E0E7FF" stroke="#6366F1" strokeWidth="1" />
        <text x="68" y="56" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="6" fontWeight="800" fill="#4338CA">?cm</text>
        <text x="36" y="74" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="5" fill="#4338CA">1m=100cm</text>
        <text x="68" y="74" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="5" fill="#4338CA">1kg=1000g</text>
      </svg>
    ),
  },
  {
    id: '3-perimeter',
    pill: 'TOPIK 2.3',
    title: 'Luas dan Perimeter',
    desc: 'Kira luas menggunakan petak segi empat sama dan perimeter bentuk 2D.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(99,102,241,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#6366F1" />
        <rect x="12" y="24" width="76" height="12" fill="#6366F1" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 2.3</text>
        <rect x="24" y="44" width="28" height="22" fill="#C7D2FE" stroke="#6366F1" strokeWidth="1.5" rx="2" />
        <rect x="52" y="44" width="22" height="22" fill="#D8B4FE" stroke="#6366F1" strokeWidth="1.5" rx="2" />
        <text x="38" y="58" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#4338CA">L</text>
        <text x="63" y="58" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#4338CA">P</text>
        <text x="38" y="80" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="5" fill="#4338CA">Luas</text>
        <text x="63" y="80" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="5" fill="#4338CA">Perimeter</text>
      </svg>
    ),
  },
];

export default function SukatanModule({ onSelectTopic, language = 'bm' }) {
  return (
    <Tahun1ModuleHubLayout
      moduleNum={2}
      moduleName="Sukatan dan Geometri"
      moduleNameEn="Measurement and Geometry"
      theme={THEME}
      topics={TOPICS}
      onSelectTopic={onSelectTopic}
      language={language}
    />
  );
}
