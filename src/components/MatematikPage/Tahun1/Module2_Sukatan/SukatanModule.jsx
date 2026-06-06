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
    id: 'masa-t1',
    pill: 'TOPIK 2.1',
    title: 'Masa dan Waktu',
    desc: 'Belajar membaca jam dan memahami waktu dalam sehari.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(99,102,241,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#6366F1" />
        <rect x="12" y="24" width="76" height="12" fill="#6366F1" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 2.1</text>
        <circle cx="50" cy="55" r="18" fill="#E0E7FF" stroke="#6366F1" strokeWidth="2" />
        <circle cx="50" cy="55" r="1.5" fill="#4338CA" />
        <line x1="50" y1="55" x2="50" y2="43" stroke="#4338CA" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="50" y1="55" x2="60" y2="55" stroke="#4338CA" strokeWidth="1.6" strokeLinecap="round" />
        <text x="50" y="33" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="4" fill="#4338CA">12</text>
        <text x="72" y="56" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="4" fill="#4338CA">3</text>
        <text x="50" y="78" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="4" fill="#4338CA">6</text>
        <text x="28" y="56" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="4" fill="#4338CA">9</text>
      </svg>
    ),
  },
  {
    id: 'ukuran-t1-panjang',
    pill: 'TOPIK 2.2',
    title: 'Ukuran Panjang',
    desc: 'Ukur panjang menggunakan jengkal, langkah dan pembaris.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(99,102,241,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#6366F1" />
        <rect x="12" y="24" width="76" height="12" fill="#6366F1" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 2.2</text>
        <rect x="18" y="48" width="64" height="14" rx="4" fill="#FDE68A" stroke="#D97706" strokeWidth="1.2" />
        {[0,8,16,24,32,40,48,56].map((x,i) => (
          <line key={i} x1={26+x} y1="48" x2={26+x} y2={i%2===0?56:54} stroke="#D97706" strokeWidth="1" />
        ))}
        <text x="22" y="76" fontFamily="'Fredoka',sans-serif" fontSize="5" fill="#4338CA">0</text>
        <text x="42" y="76" fontFamily="'Fredoka',sans-serif" fontSize="5" fill="#4338CA">5</text>
        <text x="62" y="76" fontFamily="'Fredoka',sans-serif" fontSize="5" fill="#4338CA">10</text>
        <text x="78" y="76" fontFamily="'Fredoka',sans-serif" fontSize="5" fill="#4338CA">15</text>
      </svg>
    ),
  },
  {
    id: 'ukuran-t1-jisim',
    pill: 'TOPIK 2.2',
    title: 'Ukuran Jisim',
    desc: 'Timbang objek dan bandingkan berat menggunakan unit bukan piawai.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(99,102,241,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#6366F1" />
        <rect x="12" y="24" width="76" height="12" fill="#6366F1" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 2.2</text>
        <line x1="50" y1="42" x2="50" y2="48" stroke="#4338CA" strokeWidth="2" />
        <line x1="50" y1="48" x2="34" y2="72" stroke="#4338CA" strokeWidth="2" strokeLinecap="round" />
        <line x1="50" y1="48" x2="66" y2="72" stroke="#4338CA" strokeWidth="2" strokeLinecap="round" />
        <circle cx="34" cy="76" r="6" fill="#C7D2FE" stroke="#6366F1" strokeWidth="1.2" />
        <text x="34" y="79" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="6" fontWeight="800" fill="#4338CA">?</text>
        <circle cx="66" cy="76" r="6" fill="#C7D2FE" stroke="#6366F1" strokeWidth="1.2" />
        <text x="66" y="79" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="6" fontWeight="800" fill="#4338CA">?</text>
      </svg>
    ),
  },
  {
    id: 'ukuran-t1-cecair',
    pill: 'TOPIK 2.2',
    title: 'Isi Padu Cecair',
    desc: 'Sukat isi padu cecair menggunakan cawan dan botol.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(99,102,241,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#6366F1" />
        <rect x="12" y="24" width="76" height="12" fill="#6366F1" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 2.2</text>
        <rect x="36" y="40" width="28" height="40" rx="4" fill="#E0E7FF" stroke="#6366F1" strokeWidth="1.5" />
        <rect x="36" y="58" width="28" height="22" rx="2" fill="#93C5FD" opacity=".7" />
        <rect x="34" y="38" width="32" height="5" rx="2" fill="#6366F1" />
        <line x1="42" y1="50" x2="58" y2="50" stroke="#6366F1" strokeWidth=".8" opacity=".4" />
        <line x1="42" y1="56" x2="58" y2="56" stroke="#6366F1" strokeWidth=".8" opacity=".4" />
        <line x1="42" y1="62" x2="58" y2="62" stroke="#6366F1" strokeWidth=".8" opacity=".4" />
      </svg>
    ),
  },
  {
    id: 'ruang-t1',
    pill: 'TOPIK 2.3',
    title: 'Ruang (Bentuk 3D)',
    desc: 'Kenali bentuk 3D seperti kubus, silinder dan kon.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(99,102,241,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#6366F1" />
        <rect x="12" y="24" width="76" height="12" fill="#6366F1" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 2.3</text>
        <rect x="20" y="46" width="20" height="20" fill="#C7D2FE" stroke="#6366F1" strokeWidth="1.5" rx="2" />
        <rect x="20" y="46" width="20" height="20" fill="none" stroke="#6366F1" strokeWidth="1" rx="2" transform="skewX(0) skewY(0)" />
        <rect x="28" y="42" width="20" height="20" fill="#E0E7FF" stroke="#6366F1" strokeWidth="1.2" rx="2" />
        <rect x="28" y="42" width="20" height="20" fill="none" stroke="#6366F1" strokeWidth="1" rx="2" />
        <line x1="40" y1="46" x2="48" y2="42" stroke="#6366F1" strokeWidth="1.2" />
        <line x1="20" y1="66" x2="28" y2="62" stroke="#6366F1" strokeWidth="1.2" />
        <line x1="40" y1="66" x2="48" y2="62" stroke="#6366F1" strokeWidth="1.2" />
        <circle cx="70" cy="56" r="14" fill="#C7D2FE" stroke="#6366F1" strokeWidth="1.5" />
        <ellipse cx="70" cy="56" rx="14" ry="5" fill="none" stroke="#6366F1" strokeWidth="1" />
        <ellipse cx="70" cy="56" rx="14" ry="5" fill="#93C5FD" opacity=".3" />
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
