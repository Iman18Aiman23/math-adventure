import React from 'react';
import Tahun1ModuleHubLayout from '../../Tahun1/Tahun1ModuleHubLayout';

const CARD_BG = '#FFFDF8';
const THEME = {
  pageGradient: 'radial-gradient(ellipse at top, #FFE9F3 0%, #FFBFDD 55%, #FF8CBF 100%)',
  stageGradient: 'radial-gradient(ellipse at 50% 34%, #FFE9F3 0%, #FFBFDD 55%, #FF8CBF 100%)',
  accent: '#EC4899',
  dark: '#BE185D',
  light: '#FFE9F3',
  mid: '#FFBFDD',
  pillGradient: 'linear-gradient(180deg, #EC4899, #BE185D)',
};

const TOPICS = [
  {
    id: 'adab-menuntut-ilmu',
    pill: 'TOPIK 5.1',
    title: 'Adab Menuntut Ilmu',
    desc: 'Adab dan etika menuntut ilmu di sekolah dan di rumah.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(236,72,153,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#EC4899" />
        <rect x="12" y="24" width="76" height="12" fill="#EC4899" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 5.1</text>
        <g transform="translate(50,52)">
          <rect x="-16" y="-14" width="32" height="28" rx="6" fill="#FDF2F8" stroke="#EC4899" strokeWidth="1.5" />
          <text x="0" y="4" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="12" fontWeight="800" fill="#BE185D">Ilmu</text>
          <path d="M-10,-6 L10,-6" stroke="#F9A8D4" strokeWidth="1.5" />
        </g>
        <circle cx="20" cy="75" r="1.3" fill="#EC4899" opacity=".5" />
        <circle cx="50" cy="75" r="1.3" fill="#EC4899" opacity=".5" />
        <circle cx="80" cy="75" r="1.3" fill="#EC4899" opacity=".5" />
      </svg>
    ),
  },
  {
    id: 'adab-hormat-guru',
    pill: 'TOPIK 5.2',
    title: 'Adab Hormat Guru & Ibu Bapa',
    desc: 'Cara menghormati guru, ibu bapa dan orang lebih tua.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(236,72,153,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#EC4899" />
        <rect x="12" y="24" width="76" height="12" fill="#EC4899" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 5.2</text>
        <g transform="translate(50,52)">
          <circle cx="-8" cy="-4" r="10" fill="#FDF2F8" stroke="#EC4899" strokeWidth="1.5" />
          <circle cx="-8" cy="-8" r="4" fill="#F9A8D4" />
          <circle cx="8" cy="-4" r="10" fill="#FDF2F8" stroke="#EC4899" strokeWidth="1.5" />
          <circle cx="8" cy="-8" r="4" fill="#F9A8D4" />
          <path d="M-14,6 Q-8,12 0,12 Q8,12 14,6" fill="none" stroke="#EC4899" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        <circle cx="20" cy="75" r="1.3" fill="#EC4899" opacity=".5" />
        <circle cx="50" cy="75" r="1.3" fill="#EC4899" opacity=".5" />
        <circle cx="80" cy="75" r="1.3" fill="#EC4899" opacity=".5" />
      </svg>
    ),
  },
  {
    id: 'adab-kemudahan-awam',
    pill: 'TOPIK 5.3',
    title: 'Adab Kemudahan Awam',
    desc: 'Adab menggunakan kemudahan awam dengan sifat prihatin.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(236,72,153,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#EC4899" />
        <rect x="12" y="24" width="76" height="12" fill="#EC4899" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 5.3</text>
        <g transform="translate(50,52)">
          <rect x="-16" y="-12" width="32" height="24" rx="4" fill="#FDF2F8" stroke="#EC4899" strokeWidth="1.5" />
          <rect x="-10" y="-6" width="8" height="8" rx="2" fill="#F9A8D4" />
          <circle cx="10" cy="-2" r="4" fill="#F9A8D4" />
        </g>
        <circle cx="20" cy="75" r="1.3" fill="#EC4899" opacity=".5" />
        <circle cx="50" cy="75" r="1.3" fill="#EC4899" opacity=".5" />
        <circle cx="80" cy="75" r="1.3" fill="#EC4899" opacity=".5" />
      </svg>
    ),
  },
];

export default function AdabModuleT3({ onBack, onSelectTopic, language = 'bm' }) {
  return (
    <Tahun1ModuleHubLayout moduleNum={5} moduleName="Adab & Akhlak" moduleNameEn="Manners" theme={THEME} topics={TOPICS} onBack={onBack} onSelectTopic={onSelectTopic} language={language} />
  );
}
