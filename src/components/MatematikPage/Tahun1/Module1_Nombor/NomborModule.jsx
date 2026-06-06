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
    id: 'nombor-100',
    pill: 'TOPIK 1.1',
    title: 'Nombor Bulat hingga 100',
    desc: 'Kenali nombor 1 hingga 100, nilai tempat, dan pola nombor.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(20,184,166,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#14B8A6" />
        <rect x="12" y="24" width="76" height="12" fill="#14B8A6" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 1.1</text>
        <text x="14" y="28" fontSize="7" fontFamily="sans-serif" fill="#FF6B9D" opacity=".5">✦</text>
        <text x="82" y="42" fontSize="5" fontFamily="sans-serif" fill="#FFD93D" opacity=".6">✦</text>
        <text x="12" y="74" fontSize="4" fontFamily="sans-serif" fill="#44CC77" opacity=".4">✦</text>
        <rect x="18" y="48" width="18" height="22" rx="5" fill="#FF6B9D" />
        <text x="27" y="63" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="14" fontWeight="800" fill="#fff">1</text>
        <rect x="40" y="40" width="18" height="22" rx="5" fill="#FFD93D" />
        <text x="49" y="55" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="14" fontWeight="800" fill="#fff">0</text>
        <rect x="62" y="32" width="18" height="22" rx="5" fill="#44CC77" />
        <text x="71" y="47" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="14" fontWeight="800" fill="#fff">0</text>
        <rect x="38" y="66" width="10" height="10" rx="3" fill="#A855F7" opacity=".55" />
        <text x="43" y="74" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="7" fontWeight="800" fill="#fff">5</text>
        <rect x="56" y="58" width="10" height="10" rx="3" fill="#FF9944" opacity=".55" />
        <text x="61" y="66" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="7" fontWeight="800" fill="#fff">2</text>
        <line x1="14" y1="78" x2="86" y2="78" stroke="#0F766E" strokeWidth="1.5" strokeLinecap="round" opacity=".15" />
        <circle cx="46" cy="36" r="2" fill="#FFD93D" opacity=".8" />
        <circle cx="60" cy="28" r="1.5" fill="#44CC77" opacity=".7" />
        <circle cx="80" cy="28" r="1.8" fill="#FF6B9D" opacity=".6" />
      </svg>
    ),
  },
  {
    id: 'tambah-tolak',
    pill: 'TOPIK 1.2',
    title: 'Operasi Tambah',
    desc: 'Belajar menambah nombor dalam lingkungan 100 dengan mudah.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="10" y="14" width="80" height="72" rx="12" fill={CARD_BG} stroke="rgba(20,184,166,0.35)" strokeWidth="2" />
        <rect x="10" y="14" width="80" height="16" rx="12" fill="#14B8A6" />
        <rect x="10" y="20" width="80" height="10" fill="#14B8A6" />
        <text x="50" y="26" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 1.2</text>
        <text x="18" y="74" fontSize="6" fontFamily="sans-serif" fill="#FF6B9D" opacity=".5">✦</text>
        <text x="78" y="36" fontSize="5" fontFamily="sans-serif" fill="#FFD93D" opacity=".6">✦</text>
        <circle cx="22" cy="50" r="7" fill="#FF4455" />
        <line x1="20" y1="44" x2="24" y2="50" stroke="#33AA55" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="34" cy="50" r="7" fill="#FF4455" />
        <line x1="32" y1="44" x2="36" y2="50" stroke="#33AA55" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="46" cy="50" r="7" fill="#FF4455" />
        <line x1="44" y1="44" x2="48" y2="50" stroke="#33AA55" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="58" cy="50" r="7" fill="#44CC77" />
        <circle cx="70" cy="50" r="7" fill="#44CC77" />
        <text x="52" y="49" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="12" fontWeight="800" fill="#FF8800">+</text>
        <circle cx="52" cy="49" r="10" fill="none" stroke="#FFD93D" strokeWidth="1.5" opacity=".6" />
        <line x1="28" y1="62" x2="62" y2="62" stroke="#14B8A6" strokeWidth="1.2" strokeLinecap="round" opacity=".4" />
        <text x="45" y="74" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="13" fontWeight="800" fill="#0F766E">5</text>
        <circle cx="78" cy="74" r="1.5" fill="#FFD93D" opacity=".7" />
        <circle cx="82" cy="70" r="1" fill="#44CC77" opacity=".6" />
      </svg>
    ),
  },
  {
    id: 'tambah-cerita',
    pill: 'TOPIK 1.2',
    title: 'Cerita Tolak',
    desc: 'Selesaikan masalah harian dengan operasi tolak.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="10" y="14" width="80" height="72" rx="12" fill={CARD_BG} stroke="rgba(20,184,166,0.35)" strokeWidth="2" />
        <rect x="10" y="14" width="80" height="16" rx="12" fill="#14B8A6" />
        <rect x="10" y="20" width="80" height="10" fill="#14B8A6" />
        <text x="50" y="26" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 1.2</text>
        <text x="12" y="40" fontSize="5" fontFamily="sans-serif" fill="#38BDF8" opacity=".5">✦</text>
        <circle cx="28" cy="64" r="8" fill="#FFE4B5" stroke="#FF9944" strokeWidth="1.2" />
        <circle cx="28" cy="62" r="3" fill="#FFE4B5" stroke="#FF9944" strokeWidth=".8" />
        <circle cx="24" cy="60" r="1" fill="#4338CA" />
        <circle cx="32" cy="60" r="1" fill="#4338CA" />
        <path d="M24 68 Q28 72 32 68" stroke="#FF6B6B" strokeWidth="1" fill="none" strokeLinecap="round" />
        <line x1="28" y1="56" x2="28" y2="52" stroke="#FF9944" strokeWidth="1.2" />
        <circle cx="62" cy="42" r="5.5" fill="#FF4455" />
        <line x1="62" y1="36" x2="62" y2="32" stroke="#FF6B6B" strokeWidth=".8" />
        <circle cx="74" cy="30" r="5" fill="#38BDF8" />
        <line x1="74" y1="24" x2="74" y2="20" stroke="#38BDF8" strokeWidth=".8" />
        <circle cx="68" cy="20" r="4.5" fill="#A855F7" />
        <line x1="68" y1="15.5" x2="68" y2="14" stroke="#A855F7" strokeWidth=".8" />
        <line x1="28" y1="56" x2="62" y2="42" stroke="#D1D5DB" strokeWidth="1" strokeDasharray="2 2" opacity=".5" />
        <text x="46" y="50" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="9" fontWeight="800" fill="#FF6B6B">-3</text>
        <text x="46" y="82" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="6" fontWeight="600" fill="#0F766E" opacity=".6">7 - 3 = 4</text>
      </svg>
    ),
  },
  {
    id: 'pecahan-asas',
    pill: 'TOPIK 1.3',
    title: 'Pecahan Asas',
    desc: 'Kenali pecahan 1/2, 1/4 dan 3/4 melalui bentuk dan gambar rajah.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(20,184,166,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#14B8A6" />
        <rect x="12" y="24" width="76" height="12" fill="#14B8A6" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 1.3</text>
        <text x="14" y="74" fontSize="5" fontFamily="sans-serif" fill="#FFD93D" opacity=".5">✦</text>
        <circle cx="50" cy="52" r="22" fill="#FFF3E0" stroke="#FF9944" strokeWidth="1.5" />
        <path d="M50 30 L50 52 L68 52 Z" fill="#FF4455" opacity=".7" />
        <path d="M50 30 L50 52 L32 52 Z" fill="#44CC77" opacity=".6" />
        <path d="M50 52 L68 52 L68 74 A22 22 0 0 1 50 74 Z" fill="#4488FF" opacity=".5" />
        <path d="M50 52 L32 52 L32 74 A22 22 0 0 0 50 74 Z" fill="#FFD93D" opacity=".6" />
        <circle cx="50" cy="52" r="22" fill="none" stroke="#FF9944" strokeWidth="1.5" />
        <line x1="50" y1="30" x2="50" y2="74" stroke="#FF9944" strokeWidth="1.2" opacity=".5" />
        <line x1="32" y1="52" x2="68" y2="52" stroke="#FF9944" strokeWidth="1.2" opacity=".5" />
        <path d="M50 30 L50 52 L42 52 Z" fill="none" stroke="#fff" strokeWidth=".8" opacity=".4" />
        <text x="50" y="54" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="9" fontWeight="800" fill="#fff">1/4</text>
        <rect x="72" y="38" width="14" height="8" rx="3" fill="#44CC77" opacity=".7" />
        <text x="79" y="45" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="6" fontWeight="700" fill="#fff">1/2</text>
        <rect x="72" y="50" width="14" height="8" rx="3" fill="#FF4455" opacity=".6" />
        <text x="79" y="57" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="6" fontWeight="700" fill="#fff">1/4</text>
        <circle cx="82" cy="46" r="1.2" fill="#FFD93D" opacity=".8" />
      </svg>
    ),
  },
  {
    id: 'wang-t1',
    pill: 'TOPIK 1.4',
    title: 'Wang (Ringgit & Sen)',
    desc: 'Kenali wang Malaysia dan kira nilai ringgit dan sen.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="10" y="14" width="80" height="72" rx="12" fill={CARD_BG} stroke="rgba(20,184,166,0.35)" strokeWidth="2" />
        <rect x="10" y="14" width="80" height="16" rx="12" fill="#14B8A6" />
        <rect x="10" y="20" width="80" height="10" fill="#14B8A6" />
        <text x="50" y="26" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 1.4</text>
        <text x="12" y="42" fontSize="5" fontFamily="sans-serif" fill="#FFD93D" opacity=".6">✦</text>
        <text x="84" y="74" fontSize="4" fontFamily="sans-serif" fill="#44CC77" opacity=".5">✦</text>
        <ellipse cx="50" cy="58" rx="16" ry="18" fill="#FF6B9D" />
        <ellipse cx="50" cy="58" rx="16" ry="18" fill="none" stroke="#E0527A" strokeWidth="1.2" />
        <ellipse cx="50" cy="42" rx="10" ry="3" fill="#FF8CB3" />
        <circle cx="50" cy="40" r="2.5" fill="#FF6B9D" />
        <circle cx="50" cy="40" r="1.5" fill="#FFD93D" />
        <path d="M46 42 Q44 36 38 34" stroke="#FF6B9D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <circle cx="36" cy="32" r="2.5" fill="#FFD700" />
        <circle cx="34" cy="30" r="1.5" fill="#FFD700" opacity=".7" />
        <rect x="62" y="46" width="16" height="12" rx="2" fill="#10B981" stroke="#059669" strokeWidth="1" />
        <text x="70" y="55" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="6" fontWeight="800" fill="#fff">RM1</text>
        <rect x="60" y="62" width="14" height="10" rx="2" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
        <text x="67" y="70" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="5" fontWeight="800" fill="#fff">50s</text>
        <line x1="28" y1="76" x2="72" y2="76" stroke="#0F766E" strokeWidth="1.5" strokeLinecap="round" opacity=".12" />
        <circle cx="30" cy="78" r="1.5" fill="#FFD700" opacity=".4" />
        <circle cx="42" cy="80" r="1" fill="#FFD700" opacity=".3" />
        <circle cx="58" cy="79" r="1.2" fill="#10B981" opacity=".35" />
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
