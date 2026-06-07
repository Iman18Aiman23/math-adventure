import React from 'react';
import Tahun1ModuleHubLayout from '../../Tahun1/Tahun1ModuleHubLayout';

const CARD_BG = '#FFFDF8';
const THEME = {
  pageGradient: 'radial-gradient(ellipse at top, #FEF3C7 0%, #FDBA74 55%, #F97316 100%)',
  stageGradient: 'radial-gradient(ellipse at 50% 34%, #FEF3C7 0%, #FDBA74 55%, #F97316 100%)',
  accent: '#F97316',
  dark: '#C2410C',
  light: '#FEF3C7',
  mid: '#FDBA74',
  pillGradient: 'linear-gradient(180deg, #F97316, #C2410C)',
};

const TOPICS = [
  {
    id: 'imbuhan-jawi',
    pill: 'TOPIK 6.1',
    title: 'Imbuhan Awalan & Akhiran Jawi',
    desc: 'Pengenalan dan penggunaan imbuhan awalan dan akhiran dalam Jawi.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(249,115,22,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#F97316" />
        <rect x="12" y="24" width="76" height="12" fill="#F97316" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 6.1</text>
        <g transform="translate(50,52)">
          <text x="0" y="2" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="14" fontWeight="800" fill="#C2410C">Jawi</text>
          <text x="0" y="-8" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="8" fontWeight="700" fill="#F97316">Imbuhan</text>
          <path d="M-12,8 L12,8" stroke="#FDBA74" strokeWidth="1.5" />
        </g>
        <circle cx="20" cy="75" r="1.3" fill="#F97316" opacity=".5" />
        <circle cx="50" cy="75" r="1.3" fill="#F97316" opacity=".5" />
        <circle cx="80" cy="75" r="1.3" fill="#F97316" opacity=".5" />
      </svg>
    ),
  },
  {
    id: 'petikan-jawi',
    pill: 'TOPIK 6.2',
    title: 'Petikan Jawi Pendek',
    desc: 'Membaca, membina dan menulis teks atau petikan Jawi pendek.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(249,115,22,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#F97316" />
        <rect x="12" y="24" width="76" height="12" fill="#F97316" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 6.2</text>
        <g transform="translate(50,52)">
          <rect x="-18" y="-14" width="36" height="28" rx="4" fill="#FFF7ED" stroke="#F97316" strokeWidth="1.5" />
          <line x1="-12" y1="-6" x2="12" y2="-6" stroke="#FDBA74" strokeWidth="1.5" />
          <line x1="-12" y1="0" x2="12" y2="0" stroke="#FDBA74" strokeWidth="1.5" />
          <line x1="-12" y1="6" x2="8" y2="6" stroke="#FDBA74" strokeWidth="1.5" />
        </g>
        <circle cx="20" cy="75" r="1.3" fill="#F97316" opacity=".5" />
        <circle cx="50" cy="75" r="1.3" fill="#F97316" opacity=".5" />
        <circle cx="80" cy="75" r="1.3" fill="#F97316" opacity=".5" />
      </svg>
    ),
  },
  {
    id: 'tanda-baca-jawi',
    pill: 'TOPIK 6.3',
    title: 'Tanda Baca Jawi',
    desc: 'Penggunaan tanda baca Jawi yang betul dalam penulisan.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(249,115,22,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#F97316" />
        <rect x="12" y="24" width="76" height="12" fill="#F97316" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 6.3</text>
        <g transform="translate(50,52)">
          <text x="0" y="2" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="18" fontWeight="800" fill="#C2410C">، ؟</text>
          <text x="0" y="-10" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="7" fontWeight="700" fill="#F97316">Tanda Baca</text>
        </g>
        <circle cx="20" cy="75" r="1.3" fill="#F97316" opacity=".5" />
        <circle cx="50" cy="75" r="1.3" fill="#F97316" opacity=".5" />
        <circle cx="80" cy="75" r="1.3" fill="#F97316" opacity=".5" />
      </svg>
    ),
  },
  {
    id: 'ayat-panjang',
    pill: 'TOPIK 6.4',
    title: 'Ayat Panjang',
    desc: 'Membaca ayat penuh berserta makna',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(249,115,22,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#F97316" />
        <rect x="12" y="24" width="76" height="12" fill="#F97316" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Tahap 4</text>
        <g transform="translate(50,52)">
          <rect x="-18" y="-14" width="36" height="28" rx="4" fill="#FFF7ED" stroke="#F97316" strokeWidth="1.5" />
          <line x1="-12" y1="-6" x2="12" y2="-6" stroke="#FDBA74" strokeWidth="1.5" />
          <line x1="-12" y1="0" x2="12" y2="0" stroke="#FDBA74" strokeWidth="1.5" />
          <line x1="-12" y1="6" x2="12" y2="6" stroke="#FDBA74" strokeWidth="1.5" />
          <line x1="-12" y1="12" x2="4" y2="12" stroke="#FDBA74" strokeWidth="1.5" />
        </g>
        <circle cx="20" cy="75" r="1.3" fill="#F97316" opacity=".5" />
        <circle cx="50" cy="75" r="1.3" fill="#F97316" opacity=".5" />
        <circle cx="80" cy="75" r="1.3" fill="#F97316" opacity=".5" />
      </svg>
    ),
  },
  {
    id: 'short_stories',
    pill: 'TOPIK 6.5',
    title: 'Cerita Jawi',
    desc: 'Membaca cerita pendek dalam Jawi',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(249,115,22,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#F97316" />
        <rect x="12" y="24" width="76" height="12" fill="#F97316" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">TOPIK 6.5</text>
        <g transform="translate(50,52)">
          <rect x="-18" y="-14" width="36" height="28" rx="4" fill="#FFF7ED" stroke="#F97316" strokeWidth="1.5" />
          <line x1="-12" y1="-6" x2="12" y2="-6" stroke="#FDBA74" strokeWidth="1.5" />
          <line x1="-12" y1="0" x2="12" y2="0" stroke="#FDBA74" strokeWidth="1.5" />
          <line x1="-12" y1="6" x2="8" y2="6" stroke="#FDBA74" strokeWidth="1.5" />
          <circle cx="0" cy="8" r="6" fill="#F97316" opacity=".3" />
          <circle cx="-8" cy="8" r="3" fill="#FDBA74" />
          <circle cx="8" cy="8" r="3" fill="#FDBA74" />
        </g>
        <circle cx="20" cy="75" r="1.3" fill="#F97316" opacity=".5" />
        <circle cx="50" cy="75" r="1.3" fill="#F97316" opacity=".5" />
        <circle cx="80" cy="75" r="1.3" fill="#F97316" opacity=".5" />
      </svg>
    ),
  },
];

export default function JawiModuleT3({ onBack, onSelectTopic, language = 'bm' }) {
  return (
    <Tahun1ModuleHubLayout
      moduleNum={6}
      moduleName="Celik Jawi"
      moduleNameEn="Jawi Literacy"
      theme={THEME}
      topics={TOPICS}
      onBack={onBack}
      onSelectTopic={onSelectTopic}
      language={language}
    />
  );
}
