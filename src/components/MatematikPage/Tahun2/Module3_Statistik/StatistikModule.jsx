import React from 'react';
import Tahun1ModuleHubLayout from '../../../PendidikanIslamPage/Tahun1/Tahun1ModuleHubLayout';

const CARD_BG = '#FDF4FF';
const THEME = {
  pageGradient: 'linear-gradient(180deg,#F3E8FF 0%,#D8B4FE 50%,#7E22CE 100%)',
  dark: '#7E22CE',
  accent: '#A855F7',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#F3E8FF 0%,#D8B4FE 55%,#7E22CE 100%)',
  pillGradient: 'linear-gradient(180deg,#A855F7,#7E22CE)',
};

const TOPICS = [
  {
    id: '2-data',
    pill: 'TOPIK 3.1',
    title: 'Pengurusan Data',
    desc: 'Baca, tafsir dan banding data daripada piktograf dan carta palang.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(168,85,247,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#A855F7" />
        <rect x="12" y="24" width="76" height="12" fill="#A855F7" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 3.1</text>
        <rect x="22" y="50" width="10" height="18" rx="2" fill="#E9D5FF" stroke="#A855F7" strokeWidth="1" />
        <rect x="38" y="44" width="10" height="24" rx="2" fill="#D8B4FE" stroke="#A855F7" strokeWidth="1" />
        <rect x="54" y="54" width="10" height="14" rx="2" fill="#C084FC" stroke="#A855F7" strokeWidth="1" />
        <rect x="70" y="48" width="10" height="20" rx="2" fill="#E9D5FF" stroke="#A855F7" strokeWidth="1" />
        <text x="32" y="84" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="5" fill="#7E22CE">🍎</text>
        <text x="60" y="84" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="5" fill="#7E22CE">🍊</text>
      </svg>
    ),
  },
];

export default function StatistikModule({ onSelectTopic, language = 'bm' }) {
  return (
    <Tahun1ModuleHubLayout
      moduleNum={3}
      moduleName="Statistik"
      moduleNameEn="Statistics"
      theme={THEME}
      topics={TOPICS}
      onSelectTopic={onSelectTopic}
      language={language}
    />
  );
}
