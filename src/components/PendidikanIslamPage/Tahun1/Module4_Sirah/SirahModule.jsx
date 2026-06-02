import React from 'react';
import Tahun1ModuleHubLayout from '../Tahun1ModuleHubLayout';

const THEME = {
  pageGradient: 'linear-gradient(180deg, #FAF5FF 0%, #F3E8FF 40%, #FAFAFF 100%)',
  dark: '#4C1D95',
  accent: '#8B5CF6',
  stageGradient: 'linear-gradient(145deg, #5B21B6, #7A55E0, #A78BFA)',
  pillGradient: 'linear-gradient(135deg, #7A55E0, #A78BFA)',
};

const topics = [
  {
    id: 'nasab-keturunan',
    title: "Nasab & Keturunan Nabi SAW",
    desc: 'Mengenal salasilah keturunan Nabi Muhammad SAW yang mulia',
    num: '4.1',
    visual: (
      <svg viewBox="0 0 100 100" fill="none">
        <defs>
          <linearGradient id="m4-na-plate" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#FFFDF6"/><stop offset="100%" stopColor="#FBEAC8"/></linearGradient>
          <linearGradient id="m4-na-nabi" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#5DBE80"/><stop offset="100%" stopColor="#2E8A52"/></linearGradient>
        </defs>
        <ellipse cx="50" cy="95" rx="30" ry="4" fill="rgba(58,36,128,.14)"/>
        <g stroke="#3A2480" strokeWidth="2" strokeLinecap="round" opacity=".7">
          <path d="M50 27 V33"/><path d="M50 53 V59"/>
        </g>
        <g className="floatA">
          <rect x="14" y="7" width="72" height="20" rx="6" fill="url(#m4-na-plate)" stroke="#C9912E" strokeWidth="1.4"/>
          <text x="50" y="13.5" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="4.4" fontWeight="700" letterSpacing=".12em" fill="#B5832F">DATUK</text>
          <text x="50" y="22" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="7.2" fontWeight="800" fill="#241046">Abdul Muttalib</text>
        </g>
        <g className="floatA d1">
          <rect x="14" y="33" width="72" height="20" rx="6" fill="url(#m4-na-plate)" stroke="#C9912E" strokeWidth="1.4"/>
          <text x="50" y="39.5" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="4.4" fontWeight="700" letterSpacing=".12em" fill="#B5832F">AYAH</text>
          <text x="50" y="48" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="7.6" fontWeight="800" fill="#241046">Abdullah</text>
        </g>
        <g className="bob">
          <rect x="11" y="59" width="78" height="24" rx="7" fill="url(#m4-na-nabi)" stroke="#1F6B3C" strokeWidth="1.6"/>
          <rect x="11" y="59" width="78" height="24" rx="7" fill="none" stroke="#C8F0D2" strokeWidth="1" opacity=".6"/>
          <text x="50" y="66.5" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="4.6" fontWeight="700" letterSpacing=".12em" fill="#D6F5DE">NABI</text>
          <text x="50" y="77" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="8.4" fontWeight="800" fill="#fff">Muhammad ﷺ</text>
        </g>
      </svg>
    ),
  },
  {
    id: 'kelahiran-penyusuan',
    title: 'Kelahiran & Penyusuan',
    desc: "Kisah kelahiran Nabi dan penyusuan di perkampungan Bani Sa'ad",
    num: '4.2',
    visual: (
      <svg viewBox="0 0 100 100" fill="none">
        <defs>
          <radialGradient id="m4-kl-star" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#FFFFFF"/><stop offset="45%" stopColor="#FFE066"/><stop offset="100%" stopColor="#E0A012"/></radialGradient>
          <radialGradient id="m4-kl-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#FFF1A8"/><stop offset="100%" stopColor="rgba(255,193,7,0)"/></radialGradient>
          <linearGradient id="m4-kl-tent" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#F4D9B0"/><stop offset="100%" stopColor="#C68A4E"/></linearGradient>
          <linearGradient id="m4-kl-sand" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#F2C57A"/><stop offset="100%" stopColor="#D9A24B"/></linearGradient>
        </defs>
        <ellipse cx="50" cy="93" rx="30" ry="4.5" fill="rgba(58,36,128,.14)"/>
        <circle cx="50" cy="28" r="22" fill="url(#m4-kl-glow)" className="pulse"/>
        <g className="floatA">
          <path d="M50 12l2.6 11 11 2.6-11 2.6-2.6 11-2.6-11-11-2.6 11-2.6z" fill="url(#m4-kl-star)" stroke="#A9740A" strokeWidth=".6"/>
        </g>
        <g className="pulse" fill="#FFF6D6">
          <circle cx="24" cy="22" r="1.6"/><circle cx="78" cy="20" r="1.4"/><circle cx="80" cy="40" r="1.3"/>
        </g>
        <path d="M14 78 Q40 70 60 78 Q76 84 86 78 L86 88 L14 88 Z" fill="url(#m4-kl-sand)" stroke="#B5832F" strokeWidth="1"/>
        <g className="floatA d1">
          <path d="M26 78 Q24 68 25 60" stroke="#3A2480" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
          <g stroke="#2E8A52" strokeWidth="2.2" fill="none" strokeLinecap="round">
            <path d="M25 60 Q18 56 13 59"/><path d="M25 60 Q32 56 37 59"/>
            <path d="M25 60 Q20 53 16 52"/><path d="M25 60 Q30 53 34 52"/>
          </g>
        </g>
        <g className="floatA d2">
          <path d="M48 80 L62 62 L76 80 Z" fill="url(#m4-kl-tent)" stroke="#3A2480" strokeWidth="1.4" strokeLinejoin="round"/>
          <path d="M62 62 L62 80" stroke="#3A2480" strokeWidth="1" opacity=".5"/>
          <path d="M58 80 L62 73 L66 80 Z" fill="#3A2480" opacity=".55"/>
        </g>
      </svg>
    ),
  },
  {
    id: 'sifat-al-amin',
    title: 'Sifat Terpuji: Al-Amin',
    desc: 'Nabi Muhammad digelar Al-Amin kerana sifat amanah dan jujur',
    num: '4.3',
    visual: (
      <>
        <svg viewBox="0 0 100 100" fill="none">
          <defs>
            <radialGradient id="m4-am-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#FFF1A8"/><stop offset="100%" stopColor="rgba(255,193,7,0)"/></radialGradient>
          </defs>
          <ellipse cx="50" cy="93" rx="24" ry="4.5" fill="rgba(58,36,128,.14)"/>
          <circle cx="50" cy="48" r="30" fill="url(#m4-am-glow)" className="pulse"/>
          <g className="pulse" fill="#FFF6D6">
            <path d="M20 30l1.1 2.8 3 .5-3 1.1-1.1 2.8-1.1-2.8-3-1.1 3-.5z"/>
            <path d="M82 30l.9 2.3 2.4.4-2.4.9-.9 2.3-.9-2.3-2.4-.9 2.4-.4z"/>
            <path d="M80 64l.8 2 2 .4-2 .8-.8 2-.8-2-2-.8 2-.4z" style={{animationDelay:'.6s'}}/>
            <path d="M20 66l.8 2 2 .4-2 .8-.8 2-.8-2-2-.8 2-.4z" style={{animationDelay:'.9s'}}/>
          </g>
        </svg>
        <span style={{position:'absolute',left:'50%',top:'48%',transform:'translate(-50%,-50%)',fontSize:'58px',lineHeight:1,pointerEvents:'none',zIndex:3,filter:'drop-shadow(0 4px 7px rgba(58,36,128,.4))'}}>🤝</span>
      </>
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
