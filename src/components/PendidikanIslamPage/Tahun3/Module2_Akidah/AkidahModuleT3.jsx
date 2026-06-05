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
    id: 'kitab-allah',
    pill: 'TOPIK 2.1',
    title: 'Kitab-Kitab Allah',
    desc: 'Beriman kepada kitab-kitab Allah & rasul penerimanya.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(16,185,129,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#10B981" />
        <rect x="12" y="24" width="76" height="12" fill="#10B981" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 2.1</text>
        <g transform="translate(50,52)">
          <rect x="-16" y="-14" width="32" height="28" rx="4" fill="#FEF3C7" stroke="#D4960A" strokeWidth="1.5" />
          <rect x="-12" y="-10" width="24" height="20" rx="2" fill="#FFF" stroke="#D4960A" strokeWidth=".8" />
          <line x1="-8" y1="-4" x2="8" y2="-4" stroke="#D4960A" strokeWidth="1" />
          <line x1="-8" y1="0" x2="8" y2="0" stroke="#D4960A" strokeWidth="1" />
          <line x1="-8" y1="4" x2="5" y2="4" stroke="#D4960A" strokeWidth="1" />
        </g>
        <circle cx="20" cy="75" r="1.3" fill="#10B981" opacity=".5" />
        <circle cx="50" cy="75" r="1.3" fill="#10B981" opacity=".5" />
        <circle cx="80" cy="75" r="1.3" fill="#10B981" opacity=".5" />
      </svg>
    ),
  },
  {
    id: 'al-quran-panduan',
    pill: 'TOPIK 2.2',
    title: 'Al-Quran Panduan Hidup',
    desc: 'Al-Quran sebagai panduan hidup utama umat Islam.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(16,185,129,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#10B981" />
        <rect x="12" y="24" width="76" height="12" fill="#10B981" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 2.2</text>
        <g transform="translate(50,52)">
          <rect x="-14" y="-16" width="28" height="32" rx="4" fill="#065F46" />
          <text x="0" y="4" textAnchor="middle" fontFamily={ARABIC_FONT} fontSize="16" fontWeight="700" fill="#FDE68A">قرآن</text>
          <path d="M-8,-10 L8,-10" stroke="#FDE68A" strokeWidth=".8" opacity=".5" />
          <path d="M-8,10 L8,10" stroke="#FDE68A" strokeWidth=".8" opacity=".5" />
        </g>
        <circle cx="20" cy="75" r="1.3" fill="#10B981" opacity=".5" />
        <circle cx="50" cy="75" r="1.3" fill="#10B981" opacity=".5" />
        <circle cx="80" cy="75" r="1.3" fill="#10B981" opacity=".5" />
      </svg>
    ),
  },
  {
    id: 'asmaul-husna-tahun3',
    pill: 'TOPIK 2.3',
    title: 'Asmaul Husna',
    desc: 'Al-Alim (Maha Mengetahui) & Al-Hakim (Maha Bijaksana).',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(16,185,129,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#10B981" />
        <rect x="12" y="24" width="76" height="12" fill="#10B981" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 2.3</text>
        <g className="floatA" transform="translate(0,4)">
          <text x="30" y="48" textAnchor="middle" fontFamily={ARABIC_FONT} fontSize="20" fontWeight="700" fill="#065F46" direction="rtl">العليم</text>
          <text x="70" y="48" textAnchor="middle" fontFamily={ARABIC_FONT} fontSize="20" fontWeight="700" fill="#065F46" direction="rtl">الحكيم</text>
          <text x="30" y="66" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="7" fontWeight="800" fill="#2A9A6C">Al-Alim</text>
          <text x="70" y="66" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="7" fontWeight="800" fill="#2A9A6C">Al-Hakim</text>
        </g>
        <circle cx="20" cy="75" r="1.3" fill="#10B981" opacity=".5" />
        <circle cx="50" cy="75" r="1.3" fill="#10B981" opacity=".5" />
        <circle cx="80" cy="75" r="1.3" fill="#10B981" opacity=".5" />
      </svg>
    ),
  },
];

export default function AkidahModuleT3({ onBack, onSelectTopic, language = 'bm' }) {
  return (
    <Tahun1ModuleHubLayout moduleNum={2} moduleName="Akidah" moduleNameEn="Faith" theme={THEME} topics={TOPICS} onBack={onBack} onSelectTopic={onSelectTopic} language={language} />
  );
}
