import React from 'react';
import Tahun1ModuleHubLayout from '../../Tahun1/Tahun1ModuleHubLayout';

const CARD_BG = '#FFFDF8';
const THEME = {
  pageGradient: 'radial-gradient(ellipse at top, #E7D9FF 0%, #B79CFF 55%, #7A55E0 100%)',
  stageGradient: 'radial-gradient(ellipse at 50% 34%, #E7D9FF 0%, #B79CFF 55%, #7A55E0 100%)',
  accent: '#8B5CF6',
  dark: '#5B21B6',
  light: '#E7D9FF',
  mid: '#B79CFF',
  pillGradient: 'linear-gradient(180deg, #8B5CF6, #5B21B6)',
};

const TOPICS = [
  {
    id: 'hijrah-madinah',
    pill: 'TOPIK 4.1',
    title: 'Hijrah ke Madinah',
    desc: 'Sebab, kronologi dan kesan peristiwa hijrah ke Madinah.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(139,92,246,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#8B5CF6" />
        <rect x="12" y="24" width="76" height="12" fill="#8B5CF6" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 4.1</text>
        <g transform="translate(50,52)">
          <path d="M-18,10 Q-20,0 -14,-4 Q-8,-8 0,-10 Q8,-8 14,-4 Q20,0 18,10Z" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="1.5" />
          <path d="M-12,6 Q-14,2 -10,-2 Q-6,-5 0,-6 Q6,-5 10,-2 Q14,2 12,6Z" fill="#C4B5FD" />
          <circle cx="0" cy="-2" r="4" fill="#8B5CF6" className="pulse" opacity=".6" />
          <path d="M-4,2 L-6,8 L2,8 L0,2Z" fill="#FDE68A" />
        </g>
        <circle cx="20" cy="75" r="1.3" fill="#8B5CF6" opacity=".5" />
        <circle cx="50" cy="75" r="1.3" fill="#8B5CF6" opacity=".5" />
        <circle cx="80" cy="75" r="1.3" fill="#8B5CF6" opacity=".5" />
      </svg>
    ),
  },
  {
    id: 'piagam-madinah',
    pill: 'TOPIK 4.2',
    title: 'Piagam Madinah',
    desc: 'Pembentukan Negara Madinah & piagam secara asas.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(139,92,246,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#8B5CF6" />
        <rect x="12" y="24" width="76" height="12" fill="#8B5CF6" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 4.2</text>
        <g transform="translate(50,52)">
          <rect x="-18" y="-14" width="36" height="28" rx="4" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="1.5" />
          <rect x="-14" y="-10" width="28" height="20" rx="2" fill="#FFF" />
          <line x1="-10" y1="-5" x2="10" y2="-5" stroke="#8B5CF6" strokeWidth="1" />
          <line x1="-10" y1="-1" x2="10" y2="-1" stroke="#8B5CF6" strokeWidth="1" />
          <line x1="-10" y1="3" x2="7" y2="3" stroke="#8B5CF6" strokeWidth="1" />
        </g>
        <circle cx="20" cy="75" r="1.3" fill="#8B5CF6" opacity=".5" />
        <circle cx="50" cy="75" r="1.3" fill="#8B5CF6" opacity=".5" />
        <circle cx="80" cy="75" r="1.3" fill="#8B5CF6" opacity=".5" />
      </svg>
    ),
  },
  {
    id: 'kepimpinan-nabi',
    pill: 'TOPIK 4.3',
    title: 'Sifat Kepimpinan Nabi',
    desc: 'Sifat kepimpinan Nabi Muhammad SAW contoh ikutan.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(139,92,246,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#8B5CF6" />
        <rect x="12" y="24" width="76" height="12" fill="#8B5CF6" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 4.3</text>
        <g transform="translate(50,52)">
          <circle cx="0" cy="0" r="18" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="2" />
          <path d="M-8,-8 Q0,-14 8,-8" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
          <circle cx="-3" cy="-4" r="1.5" fill="#5B21B6" />
          <circle cx="3" cy="-4" r="1.5" fill="#5B21B6" />
          <path d="M-4,2 Q0,6 4,2" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M-8,4 L-12,8 M8,4 L12,8" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        <circle cx="20" cy="75" r="1.3" fill="#8B5CF6" opacity=".5" />
        <circle cx="50" cy="75" r="1.3" fill="#8B5CF6" opacity=".5" />
        <circle cx="80" cy="75" r="1.3" fill="#8B5CF6" opacity=".5" />
      </svg>
    ),
  },
];

export default function SirahModuleT3({ onBack, onSelectTopic, language = 'bm' }) {
  return (
    <Tahun1ModuleHubLayout moduleNum={4} moduleName="Sirah" moduleNameEn="Biography" theme={THEME} topics={TOPICS} onBack={onBack} onSelectTopic={onSelectTopic} language={language} />
  );
}
