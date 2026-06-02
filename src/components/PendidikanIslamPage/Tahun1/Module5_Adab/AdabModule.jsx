import React from 'react';
import Tahun1ModuleHubLayout from '../Tahun1ModuleHubLayout';

const THEME = {
  pageGradient: 'linear-gradient(180deg, #FFF1F2 0%, #FFE4E6 40%, #FFF5F6 100%)',
  dark: '#9F1239',
  accent: '#F43F5E',
  stageGradient: 'linear-gradient(145deg, #BE185D, #FF8CBF, #FBCFE8)',
  pillGradient: 'linear-gradient(135deg, #FF8CBF, #FDA4AF)',
};

const TOPICS = [
  {
    id: 'adab-makan-minum',
    title: 'Adab Makan & Minum',
    desc: 'Belajar adab sebelum, semasa dan selepas makan serta minum',
    num: '5.1',
    visual: (
      <svg viewBox="0 0 100 100" fill="none">
        <defs>
          <radialGradient id="m5-mk-plate" cx="40%" cy="32%" r="75%"><stop offset="0%" stopColor="#FFFFFF"/><stop offset="100%" stopColor="#E7D2DC"/></radialGradient>
          <linearGradient id="m5-mk-cutlery" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#F2F5F8"/><stop offset="100%" stopColor="#AEBDCC"/></linearGradient>
          <linearGradient id="m5-mk-glass" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#BFEAF2"/><stop offset="100%" stopColor="#46B6D0"/></linearGradient>
          <linearGradient id="m5-mk-food" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#FFC97A"/><stop offset="100%" stopColor="#E8893C"/></linearGradient>
        </defs>
        <g className="floatA d1">
          <path d="M45 15 L55 15 L53.3 33 Q50 35 46.7 33 Z" fill="rgba(255,255,255,.45)" stroke="#2E8FA8" strokeWidth="1.3" strokeLinejoin="round"/>
          <path d="M46.2 23 L53.8 23 L52.3 32 Q50 33.6 47.7 32 Z" fill="url(#m5-mk-glass)"/>
          <ellipse cx="50" cy="23" rx="3.9" ry="1.2" fill="#EAFBFF" opacity=".85"/>
          <path d="M47.5 18 L46.5 31" stroke="#fff" strokeWidth="1.3" opacity=".5" strokeLinecap="round"/>
        </g>
        <g className="floatA">
          <path d="M13.5 40 V46 M16 40 V46 M18.5 40 V46" stroke="url(#m5-mk-cutlery)" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M13 46 Q16 50 19 46" fill="url(#m5-mk-cutlery)"/>
          <rect x="14.5" y="48" width="3" height="24" rx="1.5" fill="url(#m5-mk-cutlery)" stroke="#8295A8" strokeWidth=".5"/>
        </g>
        <g className="floatA">
          <ellipse cx="84" cy="44" rx="5.5" ry="8" fill="url(#m5-mk-cutlery)" stroke="#8295A8" strokeWidth=".6"/>
          <rect x="82.5" y="50" width="3" height="22" rx="1.5" fill="url(#m5-mk-cutlery)" stroke="#8295A8" strokeWidth=".5"/>
        </g>
        <g className="floatA d2">
          <ellipse cx="50" cy="71" rx="6" ry="2" fill="rgba(168,43,94,.12)"/>
          <ellipse cx="50" cy="60" rx="22" ry="8" fill="url(#m5-mk-plate)" stroke="#C9A5B5" strokeWidth="1.4"/>
          <ellipse cx="50" cy="58.5" rx="16" ry="5.4" fill="none" stroke="#D9BECB" strokeWidth="1"/>
          <path d="M40 59 Q50 47 60 59 Z" fill="url(#m5-mk-food)" stroke="#C2702E" strokeWidth="1.1" strokeLinejoin="round"/>
          <ellipse cx="50" cy="53.5" rx="3.6" ry="2.2" fill="#FFE3B8" opacity=".7"/>
        </g>
        <g className="floatA">
          <rect x="16" y="82" width="68" height="13" rx="6.5" fill="rgba(255,255,255,.94)" stroke="#C9A5B5" strokeWidth="1"/>
          <text x="50" y="91" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="6.4" fontWeight="800" letterSpacing=".04em" fill="#A82B5E">BACA BISMILLAH</text>
        </g>
      </svg>
    ),
  },
  {
    id: 'adab-tidur',
    title: 'Adab Tidur & Bangun',
    desc: 'Amalan dan doa sebelum tidur serta selepas bangun tidur',
    num: '5.2',
    visual: (
      <svg viewBox="0 0 100 100" fill="none">
        <defs>
          <radialGradient id="m5-td-moon" cx="38%" cy="30%" r="80%"><stop offset="0%" stopColor="#FFF6D6"/><stop offset="55%" stopColor="#FFD050"/><stop offset="100%" stopColor="#E0A012"/></radialGradient>
          <radialGradient id="m5-td-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#FFF1A8"/><stop offset="100%" stopColor="rgba(255,193,7,0)"/></radialGradient>
          <linearGradient id="m5-td-pillow" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#FFFFFF"/><stop offset="100%" stopColor="#F0D6E1"/></linearGradient>
          <linearGradient id="m5-td-bed" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#F58FB6"/><stop offset="100%" stopColor="#C94B82"/></linearGradient>
        </defs>
        <ellipse cx="50" cy="77" rx="24" ry="3.2" fill="rgba(168,43,94,.1)"/>
        <circle cx="42" cy="34" r="22" fill="url(#m5-td-glow)" className="pulse"/>
        <g className="floatA">
          <path d="M50 18 A18 18 0 1 0 50 54 A14 14 0 1 1 50 18 Z" fill="url(#m5-td-moon)" stroke="#A9740A" strokeWidth="1.2"/>
        </g>
        <g fill="#FFF6D6" fontFamily="Baloo 2,sans-serif" fontWeight="800">
          <text className="zzz" x="62" y="40" fontSize="9">z</text>
          <text className="zzz" style={{animationDelay:'.6s'}} x="68" y="32" fontSize="11">z</text>
          <text className="zzz" style={{animationDelay:'1.2s'}} x="75" y="24" fontSize="13">Z</text>
        </g>
        <g className="pulse" fill="#FFF6D6">
          <path d="M22 24l.9 2.2 2.3.4-2.3.9-.9 2.2-.9-2.2-2.3-.9 2.3-.4z"/>
          <circle cx="26" cy="50" r="1.4"/><circle cx="80" cy="52" r="1.5"/>
        </g>
        <g className="floatA d2">
          <rect x="22" y="62" width="56" height="12" rx="5" fill="url(#m5-td-bed)" stroke="#A82B5E" strokeWidth="1.3"/>
          <rect x="25" y="56" width="24" height="10" rx="5" fill="url(#m5-td-pillow)" stroke="#C9A5B5" strokeWidth="1.2"/>
          <path d="M37 58 q-3 3 0 6" stroke="#D9BECB" strokeWidth="1" fill="none" strokeLinecap="round"/>
        </g>
        <g className="floatA">
          <rect x="16" y="82" width="68" height="13" rx="6.5" fill="rgba(255,255,255,.94)" stroke="#C9A5B5" strokeWidth="1"/>
          <text x="50" y="91" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="6.4" fontWeight="800" letterSpacing=".04em" fill="#A82B5E">BACA DOA TIDUR</text>
        </g>
      </svg>
    ),
  },
  {
    id: 'adab-tandas',
    title: 'Adab Masuk & Keluar Tandas',
    desc: 'Tata cara masuk dan keluar tandas mengikut sunnah Nabi',
    num: '5.3',
    visual: (
      <svg viewBox="0 0 100 100" fill="none">
        <defs>
          <linearGradient id="m5-tn-door" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#FFFFFF"/><stop offset="100%" stopColor="#EAD6E0"/></linearGradient>
          <linearGradient id="m5-tn-sign" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#BFEAF2"/><stop offset="100%" stopColor="#46B6D0"/></linearGradient>
        </defs>
        <ellipse cx="50" cy="90" rx="30" ry="5" fill="rgba(168,43,94,.14)"/>
        <g className="floatA">
          <path d="M32 78 V34 Q32 18 50 18 Q68 18 68 34 V78 Z" fill="#C97AA0" stroke="#A82B5E" strokeWidth="1.6"/>
          <path d="M35 76 V35 Q35 21 50 21 Q65 21 65 35 V76 Z" fill="url(#m5-tn-door)" stroke="#C9A5B5" strokeWidth="1.2"/>
          <rect x="40" y="34" width="20" height="20" rx="4" fill="url(#m5-tn-sign)" stroke="#2E8FA8" strokeWidth="1.2"/>
          <path d="M45 40 q0 5 5 5 q5 0 5 -5 z" fill="#fff"/>
          <rect x="48.5" y="44" width="3" height="5" fill="#fff"/>
          <rect x="46" y="48.5" width="8" height="2.5" rx="1" fill="#fff"/>
          <circle cx="61" cy="58" r="2" fill="#E0A012" stroke="#A9740A" strokeWidth=".6"/>
        </g>
        <g className="floatA d1">
          <path d="M14 84 H26 M22 80 L27 84 L22 88" stroke="#2E8A52" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <text x="20" y="76" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="6" fontWeight="800" fill="#2E8A52">MASUK</text>
        </g>
        <g className="floatA d2">
          <path d="M74 84 H86 M82 80 L87 84 L82 88" stroke="#A82B5E" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <text x="81" y="76" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="6" fontWeight="800" fill="#A82B5E">KELUAR</text>
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
      moduleName="Adab"
      moduleNameEn="Manners"
      topics={TOPICS}
      onBack={onBack}
      onSelectTopic={onSelectTopic}
      language={language}
    />
  );
}
