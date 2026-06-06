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
    id: '2-masa',
    pill: 'TOPIK 2.1',
    title: 'Masa dan Waktu',
    desc: 'Baca jam dalam minit dan fahami perkaitan unit masa.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(99,102,241,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#6366F1" />
        <rect x="12" y="24" width="76" height="12" fill="#6366F1" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 2.1</text>
        <circle cx="50" cy="55" r="18" fill="#E0E7FF" stroke="#6366F1" strokeWidth="2" />
        <circle cx="50" cy="55" r="1.5" fill="#4338CA" />
        <line x1="50" y1="55" x2="50" y2="41" stroke="#4338CA" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="50" y1="55" x2="62" y2="53" stroke="#4338CA" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="50" y1="55" x2="41" y2="62" stroke="#6366F1" strokeWidth="1" strokeLinecap="round" opacity=".6" />
        <text x="50" y="33" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="4" fill="#4338CA">12</text>
        <text x="72" y="56" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="4" fill="#4338CA">3</text>
        <text x="50" y="78" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="4" fill="#4338CA">6</text>
        <text x="28" y="56" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="4" fill="#4338CA">9</text>
      </svg>
    ),
  },
  {
    id: '2-ukuran-panjang',
    pill: 'TOPIK 2.2',
    title: 'Ukuran Panjang',
    desc: 'Gunakan meter dan sentimeter untuk mengukur panjang.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(99,102,241,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#6366F1" />
        <rect x="12" y="24" width="76" height="12" fill="#6366F1" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 2.2</text>
        <rect x="18" y="48" width="64" height="14" rx="4" fill="#FDE68A" stroke="#D97706" strokeWidth="1.2" />
        {[0,7,14,21,28,35,42,49,56].map((x,i) => (
          <line key={i} x1={26+x} y1="48" x2={26+x} y2={i%5===0?56:53} stroke="#D97706" strokeWidth="1" />
        ))}
        <text x="22" y="76" fontFamily="'Fredoka',sans-serif" fontSize="5" fill="#4338CA">0</text>
        <text x="50" y="76" fontFamily="'Fredoka',sans-serif" fontSize="5" fill="#4338CA">5</text>
        <text x="78" y="76" fontFamily="'Fredoka',sans-serif" fontSize="5" fill="#4338CA">10</text>
        <text x="32" y="68" fontFamily="'Fredoka',sans-serif" fontSize="5" fill="#4338CA" opacity=".6">cm</text>
      </svg>
    ),
  },
  {
    id: '2-ukuran-jisim-cecair',
    pill: 'TOPIK 2.2',
    title: 'Jisim & Isi Padu Cecair',
    desc: 'Timbang jisim dalam kg dan g, sukat isi padu cecair dalam l dan ml.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(99,102,241,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#6366F1" />
        <rect x="12" y="24" width="76" height="12" fill="#6366F1" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 2.2</text>
        <rect x="18" y="48" width="28" height="22" rx="4" fill="#E0E7FF" stroke="#6366F1" strokeWidth="1" />
        <text x="32" y="62" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="10" fontWeight="800" fill="#4338CA">1kg</text>
        <rect x="52" y="50" width="28" height="20" rx="4" fill="#E0E7FF" stroke="#6366F1" strokeWidth="1" />
        <text x="66" y="63" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="8" fontWeight="800" fill="#4338CA">500g</text>
        <line x1="30" y1="44" x2="30" y2="48" stroke="#6366F1" strokeWidth="1.5" />
        <line x1="70" y1="44" x2="70" y2="48" stroke="#6366F1" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: '2-geometri',
    pill: 'TOPIK 2.3',
    title: 'Ruang (Geometri)',
    desc: 'Kenali bentuk 2D dan 3D serta ciri-ciri seperti sisi, sudut dan bucu.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(99,102,241,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#6366F1" />
        <rect x="12" y="24" width="76" height="12" fill="#6366F1" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 2.3</text>
        <rect x="24" y="48" width="18" height="18" rx="2" fill="#C7D2FE" stroke="#6366F1" strokeWidth="1.5" />
        <circle cx="62" cy="57" r="10" fill="#C7D2FE" stroke="#6366F1" strokeWidth="1.5" />
        <text x="33" y="80" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="5" fill="#4338CA">segi empat</text>
        <text x="62" y="80" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="5" fill="#4338CA">bulatan</text>
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
