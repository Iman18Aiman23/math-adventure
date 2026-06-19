import React from 'react';
import Tahun1ModuleHubLayout from '../../../PendidikanIslamPage/Tahun1/Tahun1ModuleHubLayout';

const CARD_BG = '#F3FDFA';
const THEME = {
  pageGradient: 'linear-gradient(180deg,#FFF4E6 0%,#FACD94 50%,#E8821A 100%)',
  dark: '#C2410C',
  cd: '#FF6F00',
  accent: '#FF8F3D',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#FEE9C8 0%,#F5B76A 55%,#E8821A 100%)',
  pillGradient: 'linear-gradient(180deg,#FF8F3D,#FF6F00)',
};

const TOPICS = [
  {
    id: '3-nombor-10000',
    pill: 'TOPIK 1.1',
    title: 'Nombor Bulat hingga 10,000',
    desc: 'Kenali nombor hingga 10,000 dengan nilai tempat dan bundaran.',
    visual: (
      <svg viewBox="0 0 100 100">
        <defs>
          <filter id="b-shadow-1"><feDropShadow dx="0" dy="1.5" stdDeviation="1" floodColor="#0F766E" floodOpacity=".25"/></filter>
          <filter id="b-shadow-2"><feDropShadow dx="0" dy="1" stdDeviation=".6" floodColor="#0F766E" floodOpacity=".2"/></filter>
        </defs>
        <g className="floatA">
          <rect x="13" y="42" width="15" height="28" rx="4" fill="#F97316" filter="url(#b-shadow-1)"/>
          <rect x="13" y="34" width="15" height="10" rx="3" fill="#FB923C" filter="url(#b-shadow-2)"/>
          <rect x="13" y="26" width="15" height="10" rx="3" fill="#FDBA74" filter="url(#b-shadow-2)"/>
          <text x="20" y="61" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="9" fontWeight="800" fill="#fff">4</text>
        </g>
        <g className="floatA d2">
          <rect x="32" y="34" width="15" height="36" rx="4" fill="#14B8A6" filter="url(#b-shadow-1)"/>
          <rect x="32" y="26" width="15" height="10" rx="3" fill="#2DD4BF" filter="url(#b-shadow-2)"/>
          <rect x="32" y="18" width="15" height="10" rx="3" fill="#5EEAD4" filter="url(#b-shadow-2)"/>
          <text x="39" y="53" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="9" fontWeight="800" fill="#fff">7</text>
        </g>
        <g className="floatA d3">
          <rect x="51" y="46" width="15" height="24" rx="4" fill="#EC4899" filter="url(#b-shadow-1)"/>
          <rect x="51" y="38" width="15" height="10" rx="3" fill="#F472B6" filter="url(#b-shadow-2)"/>
          <text x="58" y="62" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="9" fontWeight="800" fill="#fff">2</text>
        </g>
        <g className="floatA">
          <rect x="70" y="52" width="15" height="18" rx="4" fill="#8B5CF6" filter="url(#b-shadow-1)"/>
          <rect x="70" y="44" width="15" height="10" rx="3" fill="#A78BFA" filter="url(#b-shadow-2)"/>
          <text x="77" y="65" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="9" fontWeight="800" fill="#fff">5</text>
        </g>
        <text x="20" y="80" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="5" fontWeight="600" fill="#0F766E">ribu</text>
        <text x="39" y="80" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="5" fontWeight="600" fill="#0F766E">ratus</text>
        <text x="58" y="80" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="5" fontWeight="600" fill="#0F766E">puluh</text>
        <text x="77" y="80" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="5" fontWeight="600" fill="#0F766E">sa</text>
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
        <g className="floatA">
          <circle cx="28" cy="30" r="7" fill="#FB923C"/><circle cx="50" cy="30" r="7" fill="#EC4899"/><circle cx="72" cy="30" r="7" fill="#14B8A6"/>
        </g>
        <g className="floatA d2">
          <circle cx="28" cy="48" r="7" fill="#A78BFA"/><circle cx="50" cy="48" r="7" fill="#FBBF24"/><circle cx="72" cy="48" r="7" fill="#F97316"/>
        </g>
        <g className="floatA d3">
          <circle cx="28" cy="66" r="7" fill="#34D399"/><circle cx="50" cy="66" r="7" fill="#60A5FA"/><circle cx="72" cy="66" r="7" fill="#F472B6"/>
        </g>
        <text x="50" y="87" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="9" fontWeight="800" fill="#0F766E">3 x 4</text>
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
        <g className="floatA">
          <path d="M14 72 Q22 52 30 72 Z" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1.2"/>
          <path d="M16 68 L24 68" stroke="#F59E0B" strokeWidth="1"/>
          <circle cx="22" cy="59" r="3" fill="#EC4899"/><circle cx="18" cy="62" r="3" fill="#FB923C"/><circle cx="26" cy="62" r="3" fill="#14B8A6"/>
        </g>
        <g className="floatA d2">
          <path d="M38 72 Q46 52 54 72 Z" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1.2"/>
          <path d="M40 68 L48 68" stroke="#F59E0B" strokeWidth="1"/>
          <circle cx="46" cy="59" r="3" fill="#FB923C"/><circle cx="42" cy="62" r="3" fill="#A78BFA"/><circle cx="50" cy="62" r="3" fill="#34D399"/>
        </g>
        <g className="floatA d3">
          <path d="M62 72 Q70 52 78 72 Z" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1.2"/>
          <path d="M64 68 L72 68" stroke="#F59E0B" strokeWidth="1"/>
          <circle cx="70" cy="59" r="3" fill="#60A5FA"/><circle cx="66" cy="62" r="3" fill="#F472B6"/><circle cx="74" cy="62" r="3" fill="#F97316"/>
        </g>
        <g className="floatA">
          <path d="M86 72 Q94 52 102 72 Z" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1.2" opacity=".1"/>
          <circle cx="94" cy="62" r="3" fill="#0F766E" opacity=".08"/>
        </g>
        <text x="50" y="90" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="9" fontWeight="800" fill="#0F766E">12 ÷ 4 = 3</text>
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
        <defs>
          <filter id="b-shadow-op"><feDropShadow dx="0" dy="1.5" stdDeviation="1" floodColor="#0F766E" floodOpacity=".25"/></filter>
        </defs>
        <g className="floatA">
          <circle cx="20" cy="38" r="12" fill="#FB923C" filter="url(#b-shadow-op)"/>
          <text x="20" y="43" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="12" fontWeight="800" fill="#fff">5</text>
        </g>
        <text x="38" y="42" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="14" fontWeight="800" fill="#14B8A6">+</text>
        <g className="floatA d2">
          <circle cx="52" cy="38" r="12" fill="#A78BFA" filter="url(#b-shadow-op)"/>
          <text x="52" y="43" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="12" fontWeight="800" fill="#fff">3</text>
        </g>
        <text x="70" y="42" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="14" fontWeight="800" fill="#14B8A6">x</text>
        <g className="floatA d3">
          <circle cx="84" cy="38" r="12" fill="#F472B6" filter="url(#b-shadow-op)"/>
          <text x="84" y="43" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="12" fontWeight="800" fill="#fff">2</text>
        </g>
        <rect x="30" y="60" width="40" height="20" rx="10" fill="#0F766E"/>
        <text x="50" y="75" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="12" fontWeight="800" fill="#fff">= 11</text>
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
        <circle cx="50" cy="48" r="26" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2"/>
        <circle cx="50" cy="48" r="26" fill="none" stroke="#F59E0B" strokeWidth="0.5" opacity=".4"/>
        <path d="M50 22 L50 48 L68 36 Z" fill="#FB923C"/>
        <path d="M50 22 L50 48 L32 36 Z" fill="#F97316" opacity=".7"/>
        <path d="M50 48 L68 36 Q72 62 50 74 Z" fill="#FCD34D" opacity=".5"/>
        <path d="M50 48 L32 36 Q28 62 50 74 Z" fill="#FDE68A" opacity=".4"/>
        <text x="50" y="72" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="7" fontWeight="800" fill="#B45309">4</text>
        <text x="61" y="41" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="5" fontWeight="600" fill="#fff">pew</text>
        <text x="39" y="41" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="5" fontWeight="600" fill="#fff">keju</text>
        <text x="50" y="88" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="5" fontWeight="600" fill="#0F766E">1/4</text>
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
        {Array.from({ length: 100 }, (_, i) => {
          const row = Math.floor(i / 10);
          const col = i % 10;
          const filled = i < 75;
          return (
            <rect key={i} x={8 + col * 8.4} y={14 + row * 7} width="7.2" height="5.8" rx="1.2"
              fill={filled ? '#14B8A6' : '#E2E8F0'}
              opacity={filled ? (0.5 + (i / 75) * 0.4) : 0.35}
            />
          );
        })}
        <rect x="70" y="74" width="24" height="14" rx="7" fill="#0F766E"/>
        <text x="82" y="84" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="8" fontWeight="800" fill="#fff">0.75</text>
        <text x="26" y="84" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="4.5" fontWeight="600" fill="#0F766E">75</text>
        <text x="42" y="84" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="4.5" fontWeight="600" fill="#0F766E">daripada</text>
        <text x="62" y="84" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="4.5" fontWeight="600" fill="#0F766E">100</text>
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
        <rect x="32" y="18" width="36" height="54" rx="10" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1.5"/>
        <rect x="38" y="22" width="24" height="44" rx="6" fill="#E2E8F0"/>
        <rect x="38" y="38" width="24" height="28" rx="6" fill="url(#gBattFill)"/>
        <defs>
          <linearGradient id="gBattFill" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#34D399"/>
            <stop offset="1" stopColor="#FBBF24"/>
          </linearGradient>
        </defs>
        <rect x="42" y="14" width="16" height="6" rx="3" fill="#94A3B8"/>
        <circle cx="50" cy="48" r="6" fill="#fff" opacity=".3"/>
        <circle cx="50" cy="48" r="3" fill="#fff" opacity=".6"/>
        <path d="M44 38 Q50 42 56 38" stroke="#fff" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity=".7"/>
        <text x="50" y="82" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="11" fontWeight="800" fill="#0F766E">60%</text>
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
        <ellipse cx="46" cy="58" rx="28" ry="22" fill="#FBCFE8" stroke="#F472B6" strokeWidth="2"/>
        <ellipse cx="46" cy="55" rx="22" ry="16" fill="#FDF2F8" stroke="#F472B6" strokeWidth="1" strokeDasharray="2 2"/>
        <path d="M37 48 Q32 40 30 38 Q28 34 32 32 Q36 32 38 36 Q40 40 42 42 Q44 44 46 46" fill="none" stroke="#F472B6" strokeWidth="2" strokeLinecap="round"/>
        <ellipse cx="46" cy="37" rx="4" ry="2.5" fill="#F472B6"/>
        <circle cx="34" cy="36" r="1.5" fill="#F472B6"/>
        <circle cx="59" cy="36" r="1.5" fill="#F472B6"/>
        <rect x="20" y="64" width="8" height="8" rx="2" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1"/>
        <text x="24" y="70" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="3.5" fontWeight="800" fill="#92400E">RM1</text>
        <rect x="30" y="62" width="10" height="10" rx="2.5" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1"/>
        <text x="35" y="70" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="4" fontWeight="800" fill="#92400E">RM5</text>
        <rect x="16" y="68" width="7" height="7" rx="1.5" fill="#FDE68A" stroke="#F59E0B" strokeWidth=".8"/>
        <g className="drip">
          <ellipse cx="44" cy="16" rx="2" ry="3" fill="#FCD34D"/>
          <circle cx="44" cy="11" r="1.5" fill="#FCD34D" opacity=".8"/>
          <circle cx="44" cy="9" r="1" fill="#FCD34D" opacity=".5"/>
        </g>
        <text x="50" y="88" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="9" fontWeight="800" fill="#14B8A6">RM</text>
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
      headerVariant="banner"
      topics={TOPICS}
      onSelectTopic={onSelectTopic}
      language={language}
    />
  );
}
