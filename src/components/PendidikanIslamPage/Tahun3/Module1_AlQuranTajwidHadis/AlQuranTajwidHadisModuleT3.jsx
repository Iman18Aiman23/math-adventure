import React from 'react';
import Tahun1ModuleHubLayout from '../../Tahun1/Tahun1ModuleHubLayout';
import { ARABIC_FONT } from '../../_shared/arabic';

const CARD_BG = '#FFFDF8';
const THEME = {
  pageGradient: 'radial-gradient(ellipse at top, #FFF7D6 0%, #FDD97A 55%, #D4960A 100%)',
  stageGradient: 'radial-gradient(ellipse at 50% 34%, #FFF7D6 0%, #FDD97A 55%, #D4960A 100%)',
  accent: '#F59E0B',
  dark: '#B45309',
  light: '#FFF7D6',
  mid: '#FDD97A',
  pillGradient: 'linear-gradient(180deg, #F59E0B, #B45309)',
};

const TOPICS = [
  {
    id: 'mim-sakinah',
    pill: 'TOPIK 1.1',
    title: 'Mim Sakinah',
    desc: 'Ikhfa\' Syafawi, Idgham Mithlain & Izhar Syafawi.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(245,158,11,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#F59E0B" />
        <rect x="12" y="24" width="76" height="12" fill="#F59E0B" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 1.1</text>
        <g transform="translate(50,52)">
          <circle cx="0" cy="0" r="18" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
          <text x="0" y="6" textAnchor="middle" fontFamily={ARABIC_FONT} fontSize="18" fontWeight="700" fill="#B45309">م</text>
          <text x="-28" y="0" textAnchor="middle" fontFamily={ARABIC_FONT} fontSize="6" fill="#D4960A">م</text>
          <text x="28" y="0" textAnchor="middle" fontFamily={ARABIC_FONT} fontSize="6" fill="#D4960A">م</text>
        </g>
        <circle cx="20" cy="75" r="1.3" fill="#F59E0B" opacity=".5" />
        <circle cx="50" cy="75" r="1.3" fill="#F59E0B" opacity=".5" />
        <circle cx="80" cy="75" r="1.3" fill="#F59E0B" opacity=".5" />
      </svg>
    ),
  },
  {
    id: 'tilawah-tahun3',
    pill: 'TOPIK 1.2',
    title: 'Tilawah & Hafazan',
    desc: 'Surah Al-Qari\'ah, Al-Humazah, At-Takathur & Al-Adiyat.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(245,158,11,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#F59E0B" />
        <rect x="12" y="24" width="76" height="12" fill="#F59E0B" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 1.2</text>
        <g transform="translate(50,52)">
          <circle cx="0" cy="0" r="18" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" className="pulse" />
          <path d="M-8,-10 Q0,-14 8,-10 Q10,-4 8,2 Q4,8 0,10 Q-4,8 -8,2 Q-10,-4 -8,-10Z" fill="#FDE68A" />
          <path d="M-5,-8 Q0,-11 5,-8 Q6,-4 5,0 Q3,4 0,6 Q-3,4 -5,0 Q-6,-4 -5,-8Z" fill="#FFF" />
        </g>
        <circle cx="20" cy="75" r="1.3" fill="#F59E0B" opacity=".5" />
        <circle cx="50" cy="75" r="1.3" fill="#F59E0B" opacity=".5" />
        <circle cx="80" cy="75" r="1.3" fill="#F59E0B" opacity=".5" />
      </svg>
    ),
  },
  {
    id: 'kefahaman-al-asr',
    pill: 'TOPIK 1.3',
    title: 'Kefahaman Surah Al-Asr',
    desc: 'Pengajaran dan pesanan dari Surah Al-Asr.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(245,158,11,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#F59E0B" />
        <rect x="12" y="24" width="76" height="12" fill="#F59E0B" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 1.3</text>
        <g transform="translate(50,52)">
          <text x="0" y="4" textAnchor="middle" fontFamily={ARABIC_FONT} fontSize="14" fontWeight="700" fill="#B45309">وَالْعَصْرِ</text>
          <text x="0" y="-8" textAnchor="middle" fontFamily={ARABIC_FONT} fontSize="8" fontWeight="600" fill="#D4960A">العصر</text>
        </g>
        <circle cx="20" cy="75" r="1.3" fill="#F59E0B" opacity=".5" />
        <circle cx="50" cy="75" r="1.3" fill="#F59E0B" opacity=".5" />
        <circle cx="80" cy="75" r="1.3" fill="#F59E0B" opacity=".5" />
      </svg>
    ),
  },
  {
    id: 'hadis-tahun3',
    pill: 'TOPIK 1.4',
    title: 'Hadis: Adab Islamiah',
    desc: 'Tuntutan mengamalkan adab Islamiah & menjauhi akhlak buruk.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(245,158,11,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#F59E0B" />
        <rect x="12" y="24" width="76" height="12" fill="#F59E0B" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 1.4</text>
        <g transform="translate(50,52)">
          <rect x="-16" y="-12" width="32" height="28" rx="6" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
          <text x="0" y="4" textAnchor="middle" fontFamily={ARABIC_FONT} fontSize="10" fontWeight="700" fill="#B45309">حديث</text>
          <path d="M-10,-6 L10,-6" stroke="#F59E0B" strokeWidth="1" opacity=".5" />
          <path d="M-8,-1 L8,-1" stroke="#F59E0B" strokeWidth="1" opacity=".5" />
        </g>
        <circle cx="20" cy="75" r="1.3" fill="#F59E0B" opacity=".5" />
        <circle cx="50" cy="75" r="1.3" fill="#F59E0B" opacity=".5" />
        <circle cx="80" cy="75" r="1.3" fill="#F59E0B" opacity=".5" />
      </svg>
    ),
  },
];

export default function AlQuranTajwidHadisModuleT3({ onBack, onSelectTopic, language = 'bm' }) {
  return (
    <Tahun1ModuleHubLayout
      moduleNum={1}
      moduleName="Al-Quran, Tajwid & Hadis"
      moduleNameEn="Quran, Tajweed & Hadith"
      theme={THEME}
      topics={TOPICS}
      onBack={onBack}
      onSelectTopic={onSelectTopic}
      language={language}
    />
  );
}
