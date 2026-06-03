import React from 'react';
import Tahun1ModuleHubLayout from '../../Tahun1/Tahun1ModuleHubLayout';

const THEME = {
  pageGradient: 'linear-gradient(180deg, #FAF5FF 0%, #F3E8FF 40%, #FAFAFF 100%)',
  dark: '#7A55E0',
  accent: '#8B5CF6',
  stageGradient: 'linear-gradient(145deg, #7A55E0, #8B5CF6, #B79CFF)',
  pillGradient: 'linear-gradient(135deg, #7A55E0, #B79CFF)',
};

const topics = [
  {
    id: 'tanda-kerasulan',
    title: 'Tanda Kerasulan',
    desc: 'Mukjizat dan tanda-tanda awal kenabian Nabi Muhammad SAW.',
    num: '4.1',
    visual: (
      <svg viewBox="0 0 100 100" fill="none">
        <defs>
          <radialGradient id="t4-tk-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#FFF1A8"/><stop offset="100%" stopColor="rgba(255,193,7,0)"/></radialGradient>
        </defs>
        <ellipse cx="50" cy="93" rx="24" ry="4.5" fill="rgba(58,36,128,.14)"/>
        <circle cx="50" cy="44" r="28" fill="url(#t4-tk-glow)" className="pulse"/>
        <g className="floatA">
          <path d="M50 14l2.6 11 11 2.6-11 2.6-2.6 11-2.6-11-11-2.6 11-2.6z" fill="#FFE066" stroke="#A9740A" strokeWidth=".6"/>
        </g>
        <g className="pulse" fill="#FFF6D6">
          <circle cx="22" cy="26" r="1.6"/><circle cx="78" cy="24" r="1.4"/><circle cx="72" cy="44" r="1.3"/><circle cx="28" cy="56" r="1.2"/>
        </g>
        <g className="bob">
          <text x="50" y="68" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="7" fontWeight="700" fill="#7A55E0" letterSpacing=".06em">TOPIK 4.1</text>
          <text x="50" y="86" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="9" fontWeight="800" fill="#4C1D95">Tanda</text>
          <text x="50" y="96" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="9" fontWeight="800" fill="#4C1D95">Kerasulan</text>
        </g>
      </svg>
    ),
  },
  {
    id: 'wahyu-pertama',
    title: 'Wahyu Pertama',
    desc: 'Peristiwa menerima wahyu pertama di Gua Hira\'.',
    num: '4.2',
    visual: (
      <svg viewBox="0 0 100 100" fill="none">
        <defs>
          <linearGradient id="t4-wp-mtn" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#A78BFA"/><stop offset="100%" stopColor="#5B21B6"/></linearGradient>
          <radialGradient id="t4-wp-sky" cx="50%" cy="30%" r="60%"><stop offset="0%" stopColor="#E7D9FF"/><stop offset="100%" stopColor="#C4B5FD"/></radialGradient>
        </defs>
        <ellipse cx="50" cy="93" rx="28" ry="4.5" fill="rgba(58,36,128,.14)"/>
        <rect x="0" y="0" width="100" height="100" rx="14" fill="url(#t4-wp-sky)"/>
        <g className="pulse" fill="#FFF6D6">
          <circle cx="15" cy="18" r="1.3"/><circle cx="85" cy="14" r="1.1"/><circle cx="50" cy="10" r="1.5"/>
        </g>
        <path d="M20 88 L40 42 L60 64 L80 20 L90 36 L90 88 Z" fill="url(#t4-wp-mtn)" stroke="#4C1D95" strokeWidth="1" strokeLinejoin="round"/>
        <g className="floatA">
          <ellipse cx="45" cy="48" rx="8" ry="6" fill="#3A2480" opacity=".25"/>
          <path d="M37 52 Q37 42 45 40 Q53 42 53 52" fill="#1E1040" opacity=".6"/>
          <circle cx="45" cy="45" r="1.5" fill="#FFF1A8" className="pulse"/>
        </g>
        <g className="bob">
          <text x="50" y="78" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="6.5" fontWeight="700" fill="#fff" letterSpacing=".06em">TOPIK 4.2</text>
          <text x="50" y="90" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="9" fontWeight="800" fill="#F3E8FF">Wahyu</text>
          <text x="50" y="100" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="9" fontWeight="800" fill="#F3E8FF">Pertama</text>
        </g>
      </svg>
    ),
  },
  {
    id: 'dakwah-awal',
    title: 'Dakwah Awal',
    desc: 'Dakwah peringkat awal dan penentangan kafir Quraisy.',
    num: '4.3',
    visual: (
      <svg viewBox="0 0 100 100" fill="none">
        <defs>
          <radialGradient id="t4-da-glow" cx="50%" cy="40%" r="50%"><stop offset="0%" stopColor="#FFF1A8"/><stop offset="100%" stopColor="rgba(255,193,7,0)"/></radialGradient>
        </defs>
        <ellipse cx="50" cy="93" rx="26" ry="4.5" fill="rgba(58,36,128,.14)"/>
        <circle cx="50" cy="36" r="30" fill="url(#t4-da-glow)" className="pulse"/>
        <g className="pulse" fill="#FFF6D6">
          <path d="M22 26l.8 2 2 .4-2 .8-.8 2-.8-2-2-.8 2-.4z"/>
          <path d="M80 26l.8 2 2 .4-2 .8-.8 2-.8-2-2-.8 2-.4z"/>
        </g>
        <g className="floatA">
          <circle cx="30" cy="50" r="7" fill="#7A55E0" opacity=".2"/>
          <circle cx="30" cy="50" r="5" fill="#B79CFF" stroke="#7A55E0" strokeWidth="1"/>
          <circle cx="30" cy="47" r="1.8" fill="#4C1D95"/>
          <circle cx="30" cy="53" r="1.5" fill="#4C1D95"/>
          <circle cx="30" cy="59" r="1.2" fill="#4C1D95"/>
        </g>
        <g className="floatA d1">
          <circle cx="50" cy="55" r="7" fill="#7A55E0" opacity=".2"/>
          <circle cx="50" cy="55" r="5" fill="#B79CFF" stroke="#7A55E0" strokeWidth="1"/>
          <circle cx="50" cy="52" r="1.8" fill="#4C1D95"/>
          <circle cx="50" cy="58" r="1.5" fill="#4C1D95"/>
          <circle cx="50" cy="64" r="1.2" fill="#4C1D95"/>
        </g>
        <g className="floatA d2">
          <circle cx="70" cy="50" r="7" fill="#7A55E0" opacity=".2"/>
          <circle cx="70" cy="50" r="5" fill="#B79CFF" stroke="#7A55E0" strokeWidth="1"/>
          <circle cx="70" cy="47" r="1.8" fill="#4C1D95"/>
          <circle cx="70" cy="53" r="1.5" fill="#4C1D95"/>
          <circle cx="70" cy="59" r="1.2" fill="#4C1D95"/>
        </g>
        <g className="bob">
          <text x="50" y="80" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="6.5" fontWeight="700" fill="#7A55E0" letterSpacing=".06em">TOPIK 4.3</text>
          <text x="50" y="92" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="9" fontWeight="800" fill="#4C1D95">Dakwah Awal</text>
        </g>
      </svg>
    ),
  },
];

export default function SirahModule({ onBack, onSelectTopic, language = 'bm' }) {
  return (
    <Tahun1ModuleHubLayout
      theme={THEME}
      moduleNum={4}
      moduleName="Sirah"
      moduleNameEn="Biography"
      topics={topics}
      onBack={onBack}
      onSelectTopic={onSelectTopic}
      language={language}
    />
  );
}
