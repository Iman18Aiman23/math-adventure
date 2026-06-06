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
    id: '3-data',
    pill: 'TOPIK 3.1',
    title: 'Pengurusan Data',
    desc: 'Baca dan tafsir data daripada carta palang, jadual dan jadual kekerapan.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(168,85,247,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#A855F7" />
        <rect x="12" y="24" width="76" height="12" fill="#A855F7" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 3.1</text>
        <rect x="22" y="50" width="10" height="18" rx="2" fill="#E9D5FF" stroke="#A855F7" strokeWidth="1" />
        <rect x="38" y="44" width="10" height="24" rx="2" fill="#D8B4FE" stroke="#A855F7" strokeWidth="1" />
        <rect x="54" y="48" width="10" height="20" rx="2" fill="#C084FC" stroke="#A855F7" strokeWidth="1" />
        <rect x="70" y="46" width="10" height="22" rx="2" fill="#E9D5FF" stroke="#A855F7" strokeWidth="1" />
        <text x="27" y="82" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="4" fill="#7E22CE">10</text>
        <text x="43" y="82" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="4" fill="#7E22CE">15</text>
        <text x="59" y="82" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="4" fill="#7E22CE">8</text>
        <text x="75" y="82" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="4" fill="#7E22CE">12</text>
      </svg>
    ),
  },
  {
    id: '3-kebarangkalian',
    pill: 'TOPIK 3.2',
    title: 'Kebarangkalian Asas',
    desc: 'Fahami konsep mesti, mungkin dan tidak mungkin berlaku.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(168,85,247,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#A855F7" />
        <rect x="12" y="24" width="76" height="12" fill="#A855F7" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 3.2</text>
        <circle cx="34" cy="52" r="12" fill="#E9D5FF" stroke="#A855F7" strokeWidth="1.5" />
        <text x="34" y="56" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="11" fontWeight="800" fill="#7E22CE">&#10003;</text>
        <text x="34" y="72" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="4" fill="#7E22CE">mesti</text>
        <circle cx="66" cy="52" r="12" fill="#E9D5FF" stroke="#A855F7" strokeWidth="1.5" />
        <text x="66" y="56" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="11" fontWeight="800" fill="#7E22CE">?</text>
        <text x="66" y="72" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="4" fill="#7E22CE">mungkin</text>
        <circle cx="50" cy="80" r="8" fill="#E9D5FF" stroke="#A855F7" strokeWidth="1.2" />
        <text x="50" y="83" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="7" fontWeight="800" fill="#7E22CE">x</text>
        <text x="50" y="91" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="4" fill="#7E22CE">tak mungkin</text>
      </svg>
    ),
  },
];

export default function StatistikModule({ onSelectTopic, language = 'bm' }) {
  return (
    <Tahun1ModuleHubLayout
      moduleNum={3}
      moduleName="Statistik dan Kebarangkalian"
      moduleNameEn="Statistics and Probability"
      theme={THEME}
      topics={TOPICS}
      onSelectTopic={onSelectTopic}
      language={language}
    />
  );
}
