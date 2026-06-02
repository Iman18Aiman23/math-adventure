import React from 'react';
import Tahun1ModuleHubLayout from '../Tahun1ModuleHubLayout';
import { ARABIC_FONT } from '../../_shared/arabic';

const THEME = {
  pageGradient: 'radial-gradient(ellipse at top, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
  stageGradient: 'radial-gradient(ellipse at 50% 34%, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
  accent: '#2A9A6C',
  dark: '#065F46',
  light: '#D6F5DD',
  mid: '#8AD9A8',
  pillGradient: 'linear-gradient(180deg, #2A9A6C, #065F46)',
};

const CARD_BG = '#FFFDF8';

const TOPICS = [
  {
    id: 'rukun-iman',
    pill: 'TOPIK 2.1',
    title: 'Rukun Iman',
    desc: 'Enam perkara yang wajib diimani oleh setiap Muslim.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(42,154,108,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#2A9A6C" />
        <rect x="12" y="24" width="76" height="12" fill="#2A9A6C" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Modul 2.1</text>

        {/* Sparkles */}
        <text x="18" y="42" fontSize="4.5" fill="#F59E0B" opacity="0.6">✦</text>
        <text x="80" y="44" fontSize="4" fill="#EC4899" opacity="0.5">✦</text>
        <text x="24" y="76" fontSize="3.5" fill="#8B5CF6" opacity="0.4">✧</text>
        <text x="78" y="78" fontSize="3" fill="#10B981" opacity="0.4">✧</text>

        {/* Constellation web connecting the 6 pillars */}
        <path d="M29 49 L50 49 M50 49 L71 49 M29 49 L29 65 M50 49 L50 65 M71 49 L71 65 M29 65 L50 65 M50 65 L71 65" stroke="#2A9A6C" strokeWidth="0.7" strokeDasharray="2.5,2.5" opacity="0.25" />
        <path d="M29 49 L50 65 M50 49 L71 65 M71 49 L50 65 M50 49 L29 65 M29 65 L71 65" stroke="#065F46" strokeWidth="0.4" strokeDasharray="1,3" opacity="0.1" />

        {/* Row 1 — 3 colorful orbs */}
        {/* 1. Iman kepada Allah */}
        <circle cx="29" cy="49" r="9" fill="#FDE8E8" stroke="#EF4444" strokeWidth="1.5" />
        <circle cx="29" cy="49" r="6.5" fill="#FCA5A5" />
        <text x="29" y="52" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="800" fill="#991B1B">1</text>

        {/* 2. Iman kepada Malaikat */}
        <circle cx="50" cy="49" r="9" fill="#CCFBF1" stroke="#14B8A6" strokeWidth="1.5" />
        <circle cx="50" cy="49" r="6.5" fill="#5EEAD4" />
        <text x="50" y="52" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="800" fill="#115E59">2</text>

        {/* 3. Iman kepada Kitab */}
        <circle cx="71" cy="49" r="9" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
        <circle cx="71" cy="49" r="6.5" fill="#FCD34D" />
        <text x="71" y="52" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="800" fill="#92400E">3</text>

        {/* Row 2 — 3 colorful orbs */}
        {/* 4. Iman kepada Rasul */}
        <circle cx="29" cy="70" r="9" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="1.5" />
        <circle cx="29" cy="70" r="6.5" fill="#C4B5FD" />
        <text x="29" y="73" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="800" fill="#5B21B6">4</text>

        {/* 5. Iman kepada Hari Kiamat */}
        <circle cx="50" cy="70" r="9" fill="#FFEDD5" stroke="#F97316" strokeWidth="1.5" />
        <circle cx="50" cy="70" r="6.5" fill="#FDBA74" />
        <text x="50" y="73" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="800" fill="#9A3412">5</text>

        {/* 6. Iman kepada Qada dan Qadar */}
        <circle cx="71" cy="70" r="9" fill="#E0F2FE" stroke="#0EA5E9" strokeWidth="1.5" />
        <circle cx="71" cy="70" r="6.5" fill="#7DD3FC" />
        <text x="71" y="73" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="800" fill="#075985">6</text>
      </svg>
    ),
  },
  {
    id: 'rukun-islam',
    pill: 'TOPIK 2.2',
    title: 'Rukun Islam',
    desc: 'Lima amalan asas yang menjadi tiang agama Islam.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(42,154,108,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#2A9A6C" />
        <rect x="12" y="24" width="76" height="12" fill="#2A9A6C" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Modul 2.2</text>

        {/* Ground platform */}
        <rect x="18" y="72" width="64" height="4" rx="2" fill="#2A9A6C" opacity="0.3" />

        {/* Sparkles */}
        <text x="20" y="42" fontSize="4" fill="#F59E0B" opacity="0.6">✦</text>
        <text x="80" y="41" fontSize="3.5" fill="#EC4899" opacity="0.5">✦</text>
        <text x="16" y="66" fontSize="3" fill="#8B5CF6" opacity="0.4">✧</text>

        {/* Pillar 1 — Mengucap dua kalimah syahadah (tallest) */}
        <rect x="20" y="44" width="10" height="28" rx="3" fill="#FCA5A5" stroke="#EF4444" strokeWidth="1.2" />
        <path d="M20 44 Q25 38 30 44" fill="#FDE8E8" stroke="#EF4444" strokeWidth="1" />
        <text x="25" y="62" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="7" fontWeight="800" fill="#991B1B">1</text>
        <text x="20" y="41" fontSize="5.5">🌙</text>

        {/* Pillar 2 — Menunaikan solat */}
        <rect x="33" y="46" width="10" height="26" rx="3" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1.2" />
        <path d="M33 46 Q38 40 43 46" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1" />
        <text x="38" y="63" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="7" fontWeight="800" fill="#92400E">2</text>
        <text x="33" y="43" fontSize="5.5">🌙</text>

        {/* Pillar 3 — Menunaikan zakat */}
        <rect x="46" y="48" width="10" height="24" rx="3" fill="#A7F3D0" stroke="#10B981" strokeWidth="1.2" />
        <path d="M46 48 Q51 42 56 48" fill="#D1FAE5" stroke="#10B981" strokeWidth="1" />
        <text x="51" y="64" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="7" fontWeight="800" fill="#065F46">3</text>
        <text x="46" y="45" fontSize="5.5">🌙</text>

        {/* Pillar 4 — Berpuasa di bulan Ramadan */}
        <rect x="59" y="50" width="10" height="22" rx="3" fill="#BFDBFE" stroke="#3B82F6" strokeWidth="1.2" />
        <path d="M59 50 Q64 44 69 50" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1" />
        <text x="64" y="65" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="7" fontWeight="800" fill="#1E40AF">4</text>
        <text x="59" y="47" fontSize="5.5">🌙</text>

        {/* Pillar 5 — Menunaikan haji (shortest) */}
        <rect x="72" y="52" width="10" height="20" rx="3" fill="#DDD6FE" stroke="#8B5CF6" strokeWidth="1.2" />
        <path d="M72 52 Q77 46 82 52" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="1" />
        <text x="77" y="65" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="7" fontWeight="800" fill="#5B21B6">5</text>
        <text x="72" y="49" fontSize="5.5">🌙</text>
      </svg>
    ),
  },
  {
    id: 'syahadah',
    pill: 'TOPIK 2.3',
    title: 'Dua Kalimah Syahadah',
    desc: 'Lafaz, makna dan kepentingan mengucap syahadah.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(42,154,108,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#2A9A6C" />
        <rect x="12" y="24" width="76" height="12" fill="#2A9A6C" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Modul 2.3</text>
        <text x="50" y="52" textAnchor="middle" fontFamily={ARABIC_FONT} fontSize="9" fontWeight="700" fill="#4C1D95" direction="rtl">لا إله إلا الله</text>
        <text x="50" y="66" textAnchor="middle" fontFamily={ARABIC_FONT} fontSize="9" fontWeight="700" fill="#065F46" direction="rtl">محمد رسول الله</text>
        <line x1="28" y1="72" x2="72" y2="72" stroke="#2A9A6C" strokeWidth=".6" opacity=".3" />
        <circle cx="30" cy="75" r="1.2" fill="#2A9A6C" opacity=".4" />
        <circle cx="50" cy="75" r="1.2" fill="#2A9A6C" opacity=".4" />
        <circle cx="70" cy="75" r="1.2" fill="#2A9A6C" opacity=".4" />
      </svg>
    ),
  },
  {
    id: 'asmaul-husna-khaliq',
    pill: 'TOPIK 2.4',
    title: 'Asmaul Husna: Al-Khaliq',
    desc: 'Mengenal Allah sebagai Pencipta segala-galanya.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(42,154,108,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#2A9A6C" />
        <rect x="12" y="24" width="76" height="12" fill="#2A9A6C" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Modul 2.4</text>
        <text x="50" y="54" textAnchor="middle" fontFamily={ARABIC_FONT} fontSize="14" fontWeight="700" fill="#065F46" direction="rtl">الخالق</text>
        <circle cx="20" cy="68" r="2.5" fill="#FDE68A" opacity=".6" />
        <circle cx="32" cy="75" r="1.5" fill="#FDE68A" opacity=".5" />
        <circle cx="68" cy="68" r="2.5" fill="#FDE68A" opacity=".6" />
        <circle cx="80" cy="75" r="1.5" fill="#FDE68A" opacity=".5" />
        <circle cx="50" cy="76" r="1" fill="#FDE68A" opacity=".4" />
        <circle cx="16" cy="74" r=".8" fill="#FDE68A" opacity=".3" />
        <circle cx="84" cy="74" r=".8" fill="#FDE68A" opacity=".3" />
      </svg>
    ),
  },
];

export default function AkidahModule({ onBack, onSelectTopic, language = 'bm' }) {
  return (
    <Tahun1ModuleHubLayout
      moduleNum={2}
      moduleName="Akidah"
      moduleNameEn="Akidah"
      theme={THEME}
      topics={TOPICS}
      onBack={onBack}
      onSelectTopic={onSelectTopic}
      language={language}
    />
  );
}
