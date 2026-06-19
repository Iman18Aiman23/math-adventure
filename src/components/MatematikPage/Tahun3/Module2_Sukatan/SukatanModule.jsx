import React from 'react';
import Tahun1ModuleHubLayout from '../../../PendidikanIslamPage/Tahun1/Tahun1ModuleHubLayout';

const CARD_BG = '#F3F4FF';
const THEME = {
  pageGradient: 'linear-gradient(180deg,#E6F1FB 0%,#9FC9F2 50%,#1E7AC9 100%)',
  dark: '#1A5A96',
  cd: '#1A78C7',
  accent: '#36A9F0',
  stageGradient: 'radial-gradient(ellipse at 50% 34%,#D5E9FA 0%,#7DB8ED 55%,#1E7AC9 100%)',
  pillGradient: 'linear-gradient(180deg,#36A9F0,#1A78C7)',
};

const TOPICS = [
  {
    id: '3-masa',
    pill: 'TOPIK 2.1',
    title: 'Masa dan Waktu',
    desc: 'Baca waktu dalam minit dan saat, serta operasi melibatkan masa.',
    visual: (
      <svg viewBox="0 0 100 100">
        <defs>
          <linearGradient id="gClk" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#EEF2FF"/>
            <stop offset="100%" stopColor="#C7D2FE"/>
          </linearGradient>
        </defs>
        {/* Timer cooldown ring */}
        <circle cx="50" cy="38" r="24" fill="none" stroke="#C7D2FE" strokeWidth="3"/>
        <circle cx="50" cy="38" r="24" fill="none" stroke="#F97316" strokeWidth="3" strokeDasharray="105 151" strokeLinecap="round" transform="rotate(-90 50 38)" className="pulse"/>
        {/* Clock face */}
        <circle cx="50" cy="38" r="19" fill="url(#gClk)" stroke="#4338CA" strokeWidth="2.5"/>
        <line x1="50" y1="22" x2="50" y2="26" stroke="#4338CA" strokeWidth="2" strokeLinecap="round"/>
        <line x1="50" y1="54" x2="50" y2="50" stroke="#4338CA" strokeWidth="2" strokeLinecap="round"/>
        <line x1="34" y1="38" x2="38" y2="38" stroke="#4338CA" strokeWidth="2" strokeLinecap="round"/>
        <line x1="66" y1="38" x2="62" y2="38" stroke="#4338CA" strokeWidth="2" strokeLinecap="round"/>
        {/* Hands */}
        <line x1="50" y1="38" x2="50" y2="27" stroke="#4338CA" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="50" y1="38" x2="58" y2="38" stroke="#F97316" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="50" cy="38" r="3" fill="#4338CA"/>
        {/* Cute face */}
        <circle cx="45" cy="35" r="1.8" fill="#4338CA"/>
        <circle cx="55" cy="35" r="1.8" fill="#4338CA"/>
        <path d="M45 42 Q50 46 55 42" stroke="#4338CA" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* Bells */}
        <g className="pulseGlow">
          <path d="M33 26 Q30 18 35 15 Q40 18 38 26" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1"/>
          <path d="M67 26 Q64 18 69 15 Q74 18 72 26" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1"/>
        </g>
        {/* Digital display */}
        <rect x="36" y="66" width="28" height="14" rx="6" fill="#4338CA"/>
        <text x="50" y="76" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="9" fontWeight="800" fill="#fff">3:15</text>
        {/* Badges */}
        <rect x="22" y="84" width="26" height="10" rx="5" fill="#F97316"/>
        <text x="35" y="91" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="5" fontWeight="700" fill="#fff">minit</text>
        <rect x="52" y="84" width="26" height="10" rx="5" fill="#14B8A6"/>
        <text x="65" y="91" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="5" fontWeight="700" fill="#fff">saat</text>
      </svg>
    ),
  },
  {
    id: '3-ukuran',
    pill: 'TOPIK 2.2',
    title: 'Ukuran (Panjang, Jisim & Cecair)',
    desc: 'Tukar unit panjang, jisim dan isi padu cecair antara unit metrik.',
    visual: (
      <svg viewBox="0 0 100 100">
        <defs>
          <linearGradient id="gLiq" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#14B8A6"/>
            <stop offset="100%" stopColor="#5EEAD4"/>
          </linearGradient>
        </defs>
        {/* Ruler (Panjang) — orange */}
        <g className="floatA">
          <rect x="6" y="18" width="42" height="24" rx="6" fill="#FFF7ED" stroke="#F97316" strokeWidth="1.5"/>
          <rect x="6" y="18" width="42" height="10" rx="6" fill="#F97316"/>
          <rect x="6" y="22" width="42" height="6" fill="#F97316"/>
          <line x1="12" y1="32" x2="12" y2="38" stroke="#4338CA" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="20" y1="32" x2="20" y2="38" stroke="#4338CA" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="28" y1="32" x2="28" y2="38" stroke="#4338CA" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="36" y1="32" x2="36" y2="38" stroke="#4338CA" strokeWidth="1.5" strokeLinecap="round"/>
          <text x="14" y="28" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="4" fontWeight="700" fill="#fff">1</text>
          <text x="22" y="28" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="4" fontWeight="700" fill="#fff">2</text>
          <text x="30" y="28" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="4" fontWeight="700" fill="#fff">3</text>
          <text x="38" y="28" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="4" fontWeight="700" fill="#fff">4</text>
          <text x="27" y="50" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="5.5" fontWeight="700" fill="#F97316">1m = 100cm</text>
        </g>
        {/* Beaker (Cecair) — teal */}
        <g className="floatA d2">
          <rect x="54" y="18" width="42" height="32" rx="6" fill="#F0FDFA" stroke="#14B8A6" strokeWidth="1.5"/>
          <path d="M62 18 L64 34 L58 40 L76 40 L70 34 L72 18 Z" fill="url(#gLiq)" opacity=".7"/>
          <line x1="62" y1="28" x2="72" y2="28" stroke="#14B8A6" strokeWidth="1" strokeDasharray="2 1"/>
          <line x1="60" y1="34" x2="74" y2="34" stroke="#14B8A6" strokeWidth="1" strokeDasharray="2 1"/>
          <text x="67" y="56" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="5.5" fontWeight="700" fill="#14B8A6">1L = 1000ml</text>
          <circle cx="67" cy="32" r="1.5" fill="#fff" opacity=".6" className="bubble"/>
        </g>
        {/* Scale (Jisim) — pink, full width bottom */}
        <g className="floatA d3">
          <polygon points="50,73 36,84 64,84" fill="#FDF2F8" stroke="#EC4899" strokeWidth="1.5"/>
          <line x1="18" y1="70" x2="82" y2="70" stroke="#EC4899" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="22" y1="70" x2="26" y2="74" stroke="#EC4899" strokeWidth="1"/>
          <line x1="78" y1="70" x2="74" y2="74" stroke="#EC4899" strokeWidth="1"/>
          <rect x="16" y="74" width="14" height="8" rx="3" fill="#FDF2F8" stroke="#EC4899" strokeWidth="1.5"/>
          <rect x="70" y="74" width="14" height="8" rx="3" fill="#FDF2F8" stroke="#EC4899" strokeWidth="1.5"/>
          <circle cx="50" cy="72" r="3" fill="#EC4899"/>
          <circle cx="23" cy="77" r="3" fill="#F97316" opacity=".8"/>
          <circle cx="77" cy="77" r="3" fill="#6366F1" opacity=".8"/>
          <text x="50" y="88" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="5.5" fontWeight="700" fill="#EC4899">1kg = 1000g</text>
        </g>
      </svg>
    ),
  },
  {
    id: '3-perimeter',
    pill: 'TOPIK 2.3',
    title: 'Luas dan Perimeter',
    desc: 'Kira luas menggunakan petak segi empat sama dan perimeter bentuk 2D.',
    visual: (
      <svg viewBox="0 0 100 100">
        <defs>
          <linearGradient id="gGrass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#84CC16"/>
            <stop offset="100%" stopColor="#65A30D"/>
          </linearGradient>
        </defs>
        {/* Grid of garden tiles — Luas (Area) */}
        <rect x="14" y="16" width="72" height="48" rx="3" fill="#F7FEE7" stroke="#84CC16" strokeWidth="1"/>
        {[0,1,2,3].map(r => [0,1,2,3,4].map(c => {
          const idx = r*5+c;
          const x = 17+c*14;
          const y = 19+r*12;
          return (
            <rect key={idx} x={x} y={y} width="12" height="10" rx="1.5"
              fill={r < 3 && c < 4 ? '#84CC16' : '#E2E8F0'}
              opacity={r < 3 && c < 4 ? (0.45 + idx*0.03) : 0.25}
            />
          );
        }))}
        {/* Flowers on some tiles */}
        <circle cx="31" cy="24" r="2" fill="#F472B6" className="pulse"/>
        <circle cx="59" cy="36" r="2" fill="#FBBF24" className="pulse"/>
        <circle cx="73" cy="48" r="1.5" fill="#F472B6" className="pulse"/>
        <circle cx="45" cy="48" r="1.5" fill="#60A5FA" className="pulse"/>
        {/* Fence border — Perimeter path */}
        <rect x="14" y="16" width="72" height="48" rx="4" fill="none" stroke="#A18072" strokeWidth="2.5" strokeDasharray="4 5"/>
        {/* Footprint trail along perimeter */}
        <circle cx="14" cy="14" r="1.5" fill="#6366F1" opacity=".5"/>
        <circle cx="50" cy="12" r="1.5" fill="#6366F1" opacity=".6"/>
        <circle cx="86" cy="14" r="1.5" fill="#6366F1" opacity=".5"/>
        <circle cx="88" cy="50" r="1.5" fill="#6366F1" opacity=".6"/>
        <circle cx="86" cy="66" r="1.5" fill="#6366F1" opacity=".5"/>
        <circle cx="50" cy="68" r="1.5" fill="#6366F1" opacity=".7"/>
        <circle cx="14" cy="66" r="1.5" fill="#6366F1" opacity=".5"/>
        <circle cx="12" cy="50" r="1.5" fill="#6366F1" opacity=".6"/>
        {/* Cute bug on perimeter */}
        <g className="floatA">
          <ellipse cx="22" cy="66" rx="3" ry="2" fill="#EC4899"/>
          <circle cx="24" cy="65" r="1.5" fill="#EC4899"/>
          <circle cx="25" cy="64" r="0.8" fill="#fff"/>
        </g>
        {/* Badges */}
        <rect x="8" y="72" width="40" height="14" rx="7" fill="#84CC16"/>
        <text x="28" y="82" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="7" fontWeight="800" fill="#fff">Luas</text>
        <rect x="52" y="72" width="40" height="14" rx="7" fill="#6366F1"/>
        <text x="72" y="82" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="7" fontWeight="800" fill="#fff">Perimeter</text>
        {/* Hint labels */}
        <text x="28" y="92" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="4.5" fontWeight="600" fill="#65A30D">12 petak</text>
        <text x="72" y="92" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="4.5" fontWeight="600" fill="#4338CA">16 unit</text>
      </svg>
    ),
  },
];

export default function SukatanModule({ onSelectTopic, language = 'bm' }) {
  return (
    <Tahun1ModuleHubLayout
      moduleNum={2}
      moduleName="Sukatan dan Geometri"
      moduleNameEn="Measurement and Geometry"
      theme={THEME}
      headerVariant="banner"
      topics={TOPICS}
      onSelectTopic={onSelectTopic}
      language={language}
    />
  );
}
