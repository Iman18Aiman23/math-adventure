import React from 'react';
import Tahun1ModuleHubLayout from '../../Tahun1/Tahun1ModuleHubLayout';

const CARD_BG = '#FFFDF8';
const THEME = {
  pageGradient: 'radial-gradient(ellipse at top, #D6EEFF 0%, #6BAEE8 55%, #2563EB 100%)',
  stageGradient: 'radial-gradient(ellipse at 50% 34%, #D6EEFF 0%, #6BAEE8 55%, #2563EB 100%)',
  accent: '#3B82F6',
  dark: '#1E40AF',
  light: '#D6EEFF',
  mid: '#6BAEE8',
  pillGradient: 'linear-gradient(180deg, #3B82F6, #1E40AF)',
};

const TOPICS = [
  {
    id: 'pembatal-solat',
    pill: 'TOPIK 3.1',
    title: 'Pembatal Solat',
    desc: 'Perkara-perkara yang membatalkan solat dan cara mengelakkannya.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(59,130,246,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#3B82F6" />
        <rect x="12" y="24" width="76" height="12" fill="#3B82F6" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 3.1</text>
        <g transform="translate(50,52)">
          <circle cx="0" cy="0" r="18" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2" className="pulse"/>
          <line x1="-9" y1="-9" x2="9" y2="9" stroke="#EF4444" strokeWidth="3" strokeLinecap="round"/>
          <line x1="9" y1="-9" x2="-9" y2="9" stroke="#EF4444" strokeWidth="3" strokeLinecap="round"/>
        </g>
        <circle cx="20" cy="75" r="1.3" fill="#3B82F6" opacity=".5" />
        <circle cx="50" cy="75" r="1.3" fill="#3B82F6" opacity=".5" />
        <circle cx="80" cy="75" r="1.3" fill="#3B82F6" opacity=".5" />
      </svg>
    ),
  },
  {
    id: 'khusyuk-solat',
    pill: 'TOPIK 3.2',
    title: 'Khusyuk dalam Solat',
    desc: 'Kepentingan khusyuk dan cara untuk mendapatkannya.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(59,130,246,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#3B82F6" />
        <rect x="12" y="24" width="76" height="12" fill="#3B82F6" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 3.2</text>
        <g transform="translate(50,52)">
          <circle cx="0" cy="0" r="18" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" />
          <path d="M-6,-4 Q0,-10 6,-4 Q8,0 6,4 Q2,8 0,8 Q-2,8 -6,4 Q-8,0 -6,-4Z" fill="#93C5FD" opacity=".7" />
          <circle cx="0" cy="0" r="4" fill="#FFF" className="pulse" />
        </g>
        <circle cx="20" cy="75" r="1.3" fill="#3B82F6" opacity=".5" />
        <circle cx="50" cy="75" r="1.3" fill="#3B82F6" opacity=".5" />
        <circle cx="80" cy="75" r="1.3" fill="#3B82F6" opacity=".5" />
      </svg>
    ),
  },
  {
    id: 'fardu-ain-kifayah',
    pill: 'TOPIK 3.3',
    title: 'Fardu Ain & Kifayah',
    desc: 'Memahami konsep Fardu Ain dan Fardu Kifayah.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(59,130,246,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#3B82F6" />
        <rect x="12" y="24" width="76" height="12" fill="#3B82F6" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 3.3</text>
        <g transform="translate(50,52)">
          <circle cx="-10" cy="0" r="10" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" />
          <text x="-10" y="4" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="7" fontWeight="800" fill="#1E40AF">AIN</text>
          <circle cx="10" cy="0" r="10" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" />
          <text x="10" y="4" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="5" fontWeight="800" fill="#1E40AF">KIFAYAH</text>
        </g>
        <circle cx="20" cy="75" r="1.3" fill="#3B82F6" opacity=".5" />
        <circle cx="50" cy="75" r="1.3" fill="#3B82F6" opacity=".5" />
        <circle cx="80" cy="75" r="1.3" fill="#3B82F6" opacity=".5" />
      </svg>
    ),
  },
];

export default function IbadahModuleT3({ onBack, onSelectTopic, language = 'bm' }) {
  return (
    <Tahun1ModuleHubLayout moduleNum={3} moduleName="Ibadah" moduleNameEn="Worship" theme={THEME} topics={TOPICS} onBack={onBack} onSelectTopic={onSelectTopic} language={language} />
  );
}
