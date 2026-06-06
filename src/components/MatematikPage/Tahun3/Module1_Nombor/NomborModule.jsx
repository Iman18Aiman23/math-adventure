import React from 'react';
import Tahun1ModuleHubLayout from '../../../PendidikanIslamPage/Tahun1/Tahun1ModuleHubLayout';

const CARD_BG = '#F3FDFA';
const THEME = {
  pageGradient: 'linear-gradient(180deg,#CCFBF1 0%,#5EEAD4 50%,#0F766E 100%)',
  dark: '#0F766E',
  accent: '#14B8A6',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#CCFBF1 0%,#5EEAD4 55%,#0F766E 100%)',
  pillGradient: 'linear-gradient(180deg,#14B8A6,#0F766E)',
};

const TOPICS = [
  {
    id: '3-nombor-10000',
    pill: 'TOPIK 1.1',
    title: 'Nombor Bulat hingga 10,000',
    desc: 'Kenali nombor hingga 10,000 dengan nilai tempat dan bundaran.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(20,184,166,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#14B8A6" />
        <rect x="12" y="24" width="76" height="12" fill="#14B8A6" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 1.1</text>
        <rect x="18" y="46" width="14" height="22" rx="2" fill="#0F766E" opacity=".1" />
        <text x="25" y="61" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="10" fontWeight="800" fill="#0F766E">4</text>
        <rect x="34" y="46" width="14" height="22" rx="2" fill="#0F766E" opacity=".16" />
        <text x="41" y="61" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="10" fontWeight="800" fill="#0F766E">7</text>
        <rect x="50" y="46" width="14" height="22" rx="2" fill="#0F766E" opacity=".22" />
        <text x="57" y="61" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="10" fontWeight="800" fill="#0F766E">2</text>
        <rect x="66" y="46" width="14" height="22" rx="2" fill="#0F766E" opacity=".28" />
        <text x="73" y="61" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="10" fontWeight="800" fill="#0F766E">5</text>
        <text x="25" y="76" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="5" fill="#0F766E">ribu</text>
        <text x="41" y="76" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="5" fill="#0F766E">ratus</text>
        <text x="57" y="76" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="5" fill="#0F766E">puluh</text>
        <text x="73" y="76" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="5" fill="#0F766E">sa</text>
      </svg>
    ),
  },
  {
    id: '3-darab',
    pill: 'TOPIK 1.2',
    title: 'Darab',
    desc: 'Darab nombor hingga empat digit dengan satu digit.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="10" y="14" width="80" height="72" rx="12" fill={CARD_BG} stroke="rgba(20,184,166,0.35)" strokeWidth="2" />
        <rect x="10" y="14" width="80" height="16" rx="12" fill="#14B8A6" />
        <rect x="10" y="20" width="80" height="10" fill="#14B8A6" />
        <text x="50" y="26" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 1.2</text>
        <rect x="18" y="46" width="20" height="18" rx="2" fill="#0F766E" opacity=".1" />
        <text x="28" y="59" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="10" fontWeight="800" fill="#0F766E">123</text>
        <text x="42" y="59" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="10" fontWeight="800" fill="#14B8A6">&#215;</text>
        <rect x="50" y="46" width="16" height="18" rx="2" fill="#0F766E" opacity=".15" />
        <text x="58" y="59" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="10" fontWeight="800" fill="#0F766E">4</text>
        <text x="70" y="59" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="10" fontWeight="800" fill="#14B8A6">=</text>
        <text x="82" y="59" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="10" fontWeight="800" fill="#0F766E">492</text>
      </svg>
    ),
  },
  {
    id: '3-bahagi',
    pill: 'TOPIK 1.2',
    title: 'Bahagi',
    desc: 'Bahagi nombor hingga empat digit dengan satu digit.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="10" y="14" width="80" height="72" rx="12" fill={CARD_BG} stroke="rgba(20,184,166,0.35)" strokeWidth="2" />
        <rect x="10" y="14" width="80" height="16" rx="12" fill="#14B8A6" />
        <rect x="10" y="20" width="80" height="10" fill="#14B8A6" />
        <text x="50" y="26" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 1.2</text>
        <rect x="18" y="46" width="20" height="18" rx="2" fill="#0F766E" opacity=".1" />
        <text x="28" y="59" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="10" fontWeight="800" fill="#0F766E">96</text>
        <text x="42" y="59" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="10" fontWeight="800" fill="#14B8A6">&#247;</text>
        <rect x="50" y="46" width="16" height="18" rx="2" fill="#0F766E" opacity=".15" />
        <text x="58" y="59" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="10" fontWeight="800" fill="#0F766E">4</text>
        <text x="70" y="59" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="10" fontWeight="800" fill="#14B8A6">=</text>
        <text x="82" y="59" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="10" fontWeight="800" fill="#0F766E">24</text>
      </svg>
    ),
  },
  {
    id: '3-operasi-bergabung',
    pill: 'TOPIK 1.2',
    title: 'Operasi Bergabung',
    desc: 'Gabung tambah, tolak, darab dan bahagi dalam satu soalan.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(20,184,166,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#14B8A6" />
        <rect x="12" y="24" width="76" height="12" fill="#14B8A6" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 1.2</text>
        <text x="50" y="56" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="18" fontWeight="800" fill="#0F766E">5+3x2</text>
        <text x="50" y="80" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="8" fontWeight="700" fill="#14B8A6">=11</text>
      </svg>
    ),
  },
  {
    id: '3-pecahan',
    pill: 'TOPIK 1.3',
    title: 'Pecahan',
    desc: 'Pecahan wajar, pecahan setara, tambah dan tolak pecahan.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="10" y="14" width="80" height="72" rx="12" fill={CARD_BG} stroke="rgba(20,184,166,0.35)" strokeWidth="2" />
        <rect x="10" y="14" width="80" height="16" rx="12" fill="#14B8A6" />
        <rect x="10" y="20" width="80" height="10" fill="#14B8A6" />
        <text x="50" y="26" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 1.3</text>
        <circle cx="34" cy="56" r="14" fill="#E0F2FE" stroke="#14B8A6" strokeWidth="1.5" />
        <path d="M34 42 L34 56 L44 56 Z" fill="#0F766E" opacity=".3" />
        <circle cx="68" cy="56" r="14" fill="#E0F2FE" stroke="#14B8A6" strokeWidth="1.5" />
        <path d="M68 42 L68 56 L58 56 Z" fill="#0F766E" opacity=".2" />
        <text x="34" y="80" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="5" fill="#0F766E">1/4</text>
        <text x="68" y="80" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="5" fill="#0F766E">1/2</text>
      </svg>
    ),
  },
  {
    id: '3-perpuluhan',
    pill: 'TOPIK 1.3',
    title: 'Perpuluhan',
    desc: 'Baca, tulis dan banding nilai perpuluhan hingga dua tempat.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="10" y="14" width="80" height="72" rx="12" fill={CARD_BG} stroke="rgba(20,184,166,0.35)" strokeWidth="2" />
        <rect x="10" y="14" width="80" height="16" rx="12" fill="#14B8A6" />
        <rect x="10" y="20" width="80" height="10" fill="#14B8A6" />
        <text x="50" y="26" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 1.3</text>
        <rect x="30" y="46" width="40" height="24" rx="4" fill="#E0F2FE" stroke="#14B8A6" strokeWidth="1" />
        <text x="50" y="63" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="16" fontWeight="800" fill="#0F766E">0.75</text>
        <rect x="24" y="46" width="6" height="24" rx="1" fill="#0F766E" opacity=".08" />
        <rect x="70" y="46" width="6" height="24" rx="1" fill="#0F766E" opacity=".08" />
      </svg>
    ),
  },
  {
    id: '3-peratus',
    pill: 'TOPIK 1.3',
    title: 'Peratus',
    desc: 'Kenali peratus sebagai per-seratus dan kira peratus suatu kuantiti.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(20,184,166,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#14B8A6" />
        <rect x="12" y="24" width="76" height="12" fill="#14B8A6" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 1.3</text>
        <rect x="26" y="44" width="6" height="26" rx="1" fill="#0F766E" opacity=".1" />
        <rect x="34" y="44" width="6" height="26" rx="1" fill="#0F766E" opacity=".2" />
        <rect x="42" y="44" width="6" height="26" rx="1" fill="#0F766E" opacity=".3" />
        <rect x="50" y="44" width="6" height="26" rx="1" fill="#0F766E" opacity=".4" />
        <rect x="58" y="44" width="6" height="26" rx="1" fill="#0F766E" opacity=".5" />
        <rect x="66" y="44" width="6" height="26" rx="1" fill="#0F766E" opacity=".6" />
        <text x="50" y="64" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="8" fontWeight="800" fill="#0F766E">60%</text>
        <text x="50" y="82" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="5" fill="#0F766E">60 daripada 100</text>
      </svg>
    ),
  },
  {
    id: '3-wang',
    pill: 'TOPIK 1.4',
    title: 'Wang hingga RM10,000',
    desc: 'Kira wang dan operasi dalam lingkungan nilai RM10,000.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="10" y="14" width="80" height="72" rx="12" fill={CARD_BG} stroke="rgba(20,184,166,0.35)" strokeWidth="2" />
        <rect x="10" y="14" width="80" height="16" rx="12" fill="#14B8A6" />
        <rect x="10" y="20" width="80" height="10" fill="#14B8A6" />
        <text x="50" y="26" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 1.4</text>
        <rect x="20" y="44" width="22" height="28" rx="3" fill="#10B981" stroke="#059669" strokeWidth="1" />
        <text x="31" y="63" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="8" fontWeight="800" fill="#fff">RM50</text>
        <rect x="48" y="46" width="22" height="26" rx="3" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" />
        <text x="59" y="64" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="7" fontWeight="800" fill="#92400E">RM20</text>
        <rect x="72" y="42" width="12" height="30" rx="2" fill="#8B5CF6" stroke="#7C3AED" strokeWidth="1" />
        <text x="78" y="62" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="6" fontWeight="800" fill="#fff">RM100</text>
      </svg>
    ),
  },
];

export default function NomborModule({ onSelectTopic, language = 'bm' }) {
  return (
    <Tahun1ModuleHubLayout
      moduleNum={1}
      moduleName="Nombor dan Operasi"
      moduleNameEn="Numbers and Operations"
      theme={THEME}
      topics={TOPICS}
      onSelectTopic={onSelectTopic}
      language={language}
    />
  );
}
