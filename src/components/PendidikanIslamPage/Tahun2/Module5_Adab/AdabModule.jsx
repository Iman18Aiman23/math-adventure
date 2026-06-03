import React from 'react';
import Tahun1ModuleHubLayout from '../../Tahun1/Tahun1ModuleHubLayout';

const THEME = {
  pageGradient: 'linear-gradient(180deg, #FFE9F3 0%, #FFBFDD 40%, #FFF5F6 100%)',
  dark: '#9F1239',
  accent: '#EC4899',
  stageGradient: 'linear-gradient(145deg, #BE185D, #FF8CBF, #FFE9F3)',
  pillGradient: 'linear-gradient(135deg, #FF8CBF, #EC4899)',
};

const TOPICS = [
  {
    id: 'adab-berpakaian',
    title: 'Adab Berpakaian',
    desc: 'Menjaga kekemasan dan adab berpakaian mengikut Islam.',
    num: '5.1',
    visual: (
      <svg viewBox="0 0 100 100" fill="none">
        <defs>
          <linearGradient id="m5-bp-shirt" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#FFFFFF"/><stop offset="100%" stopColor="#FFD6E6"/></linearGradient>
          <linearGradient id="m5-bp-collar" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#FF8CBF"/><stop offset="100%" stopColor="#EC4899"/></linearGradient>
          <linearGradient id="m5-bp-tag" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#BFEAF2"/><stop offset="100%" stopColor="#46B6D0"/></linearGradient>
        </defs>
        <ellipse cx="50" cy="85" rx="22" ry="4" fill="rgba(190,24,93,.1)"/>
        <g className="floatA">
          <path d="M50 12 L30 26 L34 30 L50 22 L66 30 L70 26 Z" fill="url(#m5-bp-collar)" stroke="#BE185D" strokeWidth="1.2" strokeLinejoin="round"/>
          <path d="M30 26 L28 38 L34 38 L36 28 Z" fill="url(#m5-bp-shirt)" stroke="#BE185D" strokeWidth="1.1"/>
          <path d="M70 26 L72 38 L66 38 L64 28 Z" fill="url(#m5-bp-shirt)" stroke="#BE185D" strokeWidth="1.1"/>
          <path d="M34 38 V80 Q50 86 66 80 V38" fill="url(#m5-bp-shirt)" stroke="#BE185D" strokeWidth="1.3" strokeLinejoin="round"/>
          <path d="M50 22 L50 38" stroke="#BE185D" strokeWidth="1.3"/>
          <rect x="46" y="72" width="8" height="8" rx="2" fill="url(#m5-bp-tag)" stroke="#2E8FA8" strokeWidth=".8"/>
        </g>
        <g className="floatA d1">
          <path d="M18 50 L14 58 M22 50 L26 58" stroke="#EC4899" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M12 58 L28 58" stroke="#EC4899" strokeWidth="2" strokeLinecap="round"/>
        </g>
        <g className="floatA d2">
          <path d="M74 50 L70 58 M78 50 L82 58" stroke="#EC4899" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M68 58 L84 58" stroke="#EC4899" strokeWidth="2" strokeLinecap="round"/>
        </g>
        <g className="floatA">
          <rect x="16" y="82" width="68" height="13" rx="6.5" fill="rgba(255,255,255,.94)" stroke="#BE185D" strokeWidth="1"/>
          <text x="50" y="91" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="6.4" fontWeight="800" letterSpacing=".04em" fill="#BE185D">PAKAIAN MENUTUP AURAT</text>
        </g>
      </svg>
    ),
  },
  {
    id: 'adab-kasih-sayang',
    title: 'Adab Kasih Sayang',
    desc: 'Bersama ibu bapa dan keluarga dengan penuh kasih.',
    num: '5.2',
    visual: (
      <svg viewBox="0 0 100 100" fill="none">
        <defs>
          <radialGradient id="m5-ks-heart" cx="40%" cy="30%" r="75%"><stop offset="0%" stopColor="#FFE9F3"/><stop offset="60%" stopColor="#FF8CBF"/><stop offset="100%" stopColor="#EC4899"/></radialGradient>
          <radialGradient id="m5-ks-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#FFBFDD"/><stop offset="100%" stopColor="rgba(255,191,221,0)"/></radialGradient>
        </defs>
        <circle cx="50" cy="42" r="28" fill="url(#m5-ks-glow)" className="pulse"/>
        <g className="floatA">
          <path d="M50 26 C50 20 42 16 36 20 C30 24 30 34 50 52 C70 34 70 24 64 20 C58 16 50 20 50 26 Z" fill="url(#m5-ks-heart)" stroke="#BE185D" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M38 28 Q50 38 62 28" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity=".5"/>
        </g>
        <g className="floatA d1">
          <circle cx="26" cy="72" r="10" fill="#FFE9F3" stroke="#BE185D" strokeWidth="1.3"/>
          <circle cx="26" cy="69" r="4.5" fill="#FFBFDD" stroke="#BE185D" strokeWidth=".8"/>
          <path d="M18 78 Q22 74 20 78 Q26 76 26 82" stroke="#BE185D" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
          <path d="M22 81 L22 90 M26 81 L26 90 M30 81 L30 90" stroke="#BE185D" strokeWidth="1.5" strokeLinecap="round"/>
        </g>
        <g className="floatA d2">
          <circle cx="74" cy="72" r="10" fill="#FFE9F3" stroke="#BE185D" strokeWidth="1.3"/>
          <circle cx="74" cy="69" r="4.5" fill="#FFBFDD" stroke="#BE185D" strokeWidth=".8"/>
          <path d="M66 78 Q70 74 68 78 Q74 76 74 82" stroke="#BE185D" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
          <path d="M70 81 L70 90 M74 81 L74 90 M78 81 L78 90" stroke="#BE185D" strokeWidth="1.5" strokeLinecap="round"/>
        </g>
        <g className="floatA">
          <rect x="16" y="82" width="68" height="13" rx="6.5" fill="rgba(255,255,255,.94)" stroke="#BE185D" strokeWidth="1"/>
          <text x="50" y="91" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="6.4" fontWeight="800" letterSpacing=".04em" fill="#BE185D">KASIH SAYANG KELUARGA</text>
        </g>
      </svg>
    ),
  },
  {
    id: 'adab-berkawan',
    title: 'Adab Berkawan',
    desc: 'Adab berteman dan menziarahi orang sakit.',
    num: '5.3',
    visual: (
      <svg viewBox="0 0 100 100" fill="none">
        <defs>
          <radialGradient id="m5-bk-glow" cx="50%" cy="40%" r="55%"><stop offset="0%" stopColor="#FFBFDD"/><stop offset="100%" stopColor="rgba(255,191,221,0)"/></radialGradient>
          <linearGradient id="m5-bk-skin" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#FFE9D6"/><stop offset="100%" stopColor="#F5C6A0"/></linearGradient>
        </defs>
        <circle cx="50" cy="40" r="30" fill="url(#m5-bk-glow)" className="pulse"/>
        <g className="floatA">
          <circle cx="35" cy="38" r="11" fill="url(#m5-bk-skin)" stroke="#D4956A" strokeWidth="1.2"/>
          <circle cx="31" cy="35" r="2" fill="#1A202C"/>
          <circle cx="39" cy="35" r="2" fill="#1A202C"/>
          <path d="M31 42 Q35 46 39 42" stroke="#D4956A" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <path d="M35 49 V60 L30 68 M35 60 L40 68" stroke="#D4956A" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M27 55 L35 53 L43 55" stroke="#D4956A" strokeWidth="1.5" strokeLinecap="round"/>
        </g>
        <g className="floatA d1">
          <circle cx="65" cy="38" r="11" fill="url(#m5-bk-skin)" stroke="#D4956A" strokeWidth="1.2"/>
          <circle cx="61" cy="35" r="2" fill="#1A202C"/>
          <circle cx="69" cy="35" r="2" fill="#1A202C"/>
          <path d="M61 42 Q65 46 69 42" stroke="#D4956A" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <path d="M65 49 V60 L60 68 M65 60 L70 68" stroke="#D4956A" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M57 55 L65 53 L73 55" stroke="#D4956A" strokeWidth="1.5" strokeLinecap="round"/>
        </g>
        <g className="floatA">
          <path d="M45 75 Q50 80 55 75" stroke="#EC4899" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </g>
        <g className="floatA" fill="#EC4899">
          <circle cx="40" cy="79" r="1.5"/><circle cx="50" cy="82" r="1.5"/><circle cx="60" cy="79" r="1.5"/>
        </g>
        <g className="floatA">
          <rect x="16" y="82" width="68" height="13" rx="6.5" fill="rgba(255,255,255,.94)" stroke="#BE185D" strokeWidth="1"/>
          <text x="50" y="91" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="6.4" fontWeight="800" letterSpacing=".04em" fill="#BE185D">BERKAWAN BAIK</text>
        </g>
      </svg>
    ),
  },
];

export default function AdabModule({ onBack, onSelectTopic, language = 'bm' }) {
  return (
    <Tahun1ModuleHubLayout
      theme={THEME}
      moduleNum={5}
      moduleName="Adab & Akhlak"
      moduleNameEn="Manners & Morals"
      topics={TOPICS}
      onBack={onBack}
      onSelectTopic={onSelectTopic}
      language={language}
    />
  );
}
