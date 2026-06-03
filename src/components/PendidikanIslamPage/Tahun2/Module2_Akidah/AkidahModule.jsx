import React from 'react';
import Tahun1ModuleHubLayout from '../../Tahun1/Tahun1ModuleHubLayout';
import { ARABIC_FONT } from '../../_shared/arabic';

const CARD_BG = '#FFFDF8';
const THEME = {
  pageGradient: 'radial-gradient(ellipse at top, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
  stageGradient: 'radial-gradient(ellipse at 50% 34%, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
  accent: '#2A9A6C',
  dark: '#065F46',
  light: '#D6F5DD',
  mid: '#8AD9A8',
  pillGradient: 'linear-gradient(180deg, #2A9A6C, #065F46)',
};

const TOPICS = [
  {
    id: 'malaikat',
    pill: 'TOPIK 2.1',
    title: 'Malaikat',
    desc: 'Kenali 10 Malaikat utama dan tugas-tugas mereka.',
    visual: (
      <svg viewBox="0 0 100 100">
        <defs>
          <radialGradient id="m2-ak-wing" cx="50%" cy="60%" r="60%"><stop offset="0%" stopColor="#FFFBE6"/><stop offset="100%" stopColor="#FDE68A"/></radialGradient>
        </defs>
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(16,185,129,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#10B981" />
        <rect x="12" y="24" width="76" height="12" fill="#10B981" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 2.1</text>
        <g transform="translate(50,54)">
          <g className="pulse" opacity=".9">
            <circle cx="-16" cy="-12" r="2.8" fill="#FDE68A"/>
            <circle cx="-8" cy="-18" r="2.2" fill="#FEF3C7"/>
            <circle cx="2" cy="-20" r="2.5" fill="#FDE68A"/>
            <circle cx="12" cy="-16" r="2" fill="#FEF3C7"/>
            <circle cx="18" cy="-10" r="2.5" fill="#FDE68A"/>
          </g>
          <ellipse cx="0" cy="6" rx="20" ry="14" fill="url(#m2-ak-wing)" opacity=".7"/>
          <path d="M-24,16 Q-22,-8 -6,-10 Q8,-12 16,-6 Q24,0 22,12 Q16,22 2,22 Q-12,22 -24,16Z" fill="#FFF7D6" stroke="#F59E0B" strokeWidth="1" opacity=".95"/>
          <path d="M-18,12 Q-16,-3 -4,-5 Q6,-7 12,-2 Q16,4 14,11 Q10,16 2,16 Q-6,16 -18,12Z" fill="#fff" opacity=".85"/>
          <path d="M-12,8 Q-10,0 -2,-2 Q5,-4 9,0 Q12,4 10,8 Q7,11 2,11 Q-3,11 -12,8Z" fill="#FDE68A" opacity=".5"/>
          <circle cx="0" cy="3" r="4.5" fill="#FDE68A" className="pulse" opacity=".9"/>
          <circle cx="0" cy="3" r="2.5" fill="#FFF" opacity=".95"/>
          <circle cx="-1" cy="2" r="1.2" fill="#F59E0B" opacity=".6"/>
        </g>
        <circle cx="20" cy="75" r="1.3" fill="#10B981" opacity=".5" />
        <circle cx="50" cy="75" r="1.3" fill="#10B981" opacity=".5" />
        <circle cx="80" cy="75" r="1.3" fill="#10B981" opacity=".5" />
      </svg>
    ),
  },
  {
    id: 'asmaul-husna-tahun2',
    pill: 'TOPIK 2.2',
    title: 'Asmaul Husna',
    desc: 'Al-Ahad (Maha Esa) & As-Samad (Tempat Meminta).',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(16,185,129,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#10B981" />
        <rect x="12" y="24" width="76" height="12" fill="#10B981" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 2.2</text>
        <g className="floatA" transform="translate(0,4)">
          <text x="30" y="48" textAnchor="middle" fontFamily={ARABIC_FONT} fontSize="20" fontWeight="700" fill="#065F46" direction="rtl">الأحد</text>
          <text x="70" y="48" textAnchor="middle" fontFamily={ARABIC_FONT} fontSize="20" fontWeight="700" fill="#065F46" direction="rtl">الصمد</text>
          <text x="30" y="66" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="7" fontWeight="800" fill="#2A9A6C">Al-Ahad</text>
          <text x="70" y="66" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="7" fontWeight="800" fill="#2A9A6C">As-Samad</text>
        </g>
        <circle cx="20" cy="75" r="1.3" fill="#10B981" opacity=".5" />
        <circle cx="50" cy="75" r="1.3" fill="#10B981" opacity=".5" />
        <circle cx="80" cy="75" r="1.3" fill="#10B981" opacity=".5" />
      </svg>
    ),
  },
  {
    id: 'syirik',
    pill: 'TOPIK 2.3',
    title: 'Syirik',
    desc: 'Kesan menyekutukan Allah dan cara menjauhinya.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(16,185,129,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#10B981" />
        <rect x="12" y="24" width="76" height="12" fill="#10B981" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 2.3</text>
        <g transform="translate(50,54)">
          <circle cx="0" cy="0" r="18" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2.5" className="pulse"/>
          <line x1="-9" y1="-9" x2="9" y2="9" stroke="#EF4444" strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="9" y1="-9" x2="-9" y2="9" stroke="#EF4444" strokeWidth="3.5" strokeLinecap="round"/>
          <circle cx="0" cy="0" r="7" fill="none" stroke="#EF4444" strokeWidth="1.5" opacity=".4"/>
        </g>
        <circle cx="20" cy="75" r="1.3" fill="#10B981" opacity=".5" />
        <circle cx="50" cy="75" r="1.3" fill="#10B981" opacity=".5" />
        <circle cx="80" cy="75" r="1.3" fill="#10B981" opacity=".5" />
      </svg>
    ),
  },
];

export default function AkidahModule({ onBack, onSelectTopic, language = 'bm' }) {
  return (
    <Tahun1ModuleHubLayout
      moduleNum={2}
      moduleName="Akidah"
      moduleNameEn="Faith"
      theme={THEME}
      topics={TOPICS}
      onBack={onBack}
      onSelectTopic={onSelectTopic}
      language={language}
    />
  );
}
