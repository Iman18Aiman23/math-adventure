import React from 'react';
import Tahun1ModuleHubLayout from '../Tahun1ModuleHubLayout';

const THEME = {
  pageGradient: 'radial-gradient(ellipse at top, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
  stageGradient: 'radial-gradient(ellipse at 50% 34%, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
  accent: '#2A9A6C',
  dark: '#065F46',
  light: '#D6F5DD',
  mid: '#8AD9A8',
  pillGradient: 'linear-gradient(180deg, #2A9A6C, #065F46)',
};

const TOPICS = [
  {
    id: 'rukun-iman',
    pill: 'TOPIK 2.1',
    title: 'Rukun Iman',
    desc: 'Enam perkara yang wajib diimani oleh setiap Muslim.',
    visual: (
      <svg viewBox="0 0 100 100" fill="none">
        <defs>
          <radialGradient id="m2-ri-badge" cx="38%" cy="30%" r="80%"><stop offset="0%" stopColor="#FFF6D6"/><stop offset="50%" stopColor="#FFD050"/><stop offset="100%" stopColor="#E0A012"/></radialGradient>
          <radialGradient id="m2-ri-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#FFF1A8"/><stop offset="100%" stopColor="rgba(255,193,7,0)"/></radialGradient>
        </defs>
        <ellipse cx="50" cy="93" rx="26" ry="4.5" fill="rgba(27,94,32,.14)"/>
        <circle cx="50" cy="50" r="30" fill="url(#m2-ri-glow)" className="pulse"/>
        <g fill="#F2C033" stroke="#A9740A" strokeWidth=".5">
          <g className="pulse">
            <text x="50" y="18" textAnchor="middle" dominantBaseline="central" fontFamily="Amiri,serif" fontSize="13" fontWeight="700" fill="#FFE9A8" stroke="#A9740A" strokeWidth=".3">الله</text>
          </g>
          <g className="pulse" style={{animationDelay:'.25s'}}>
            <path d="M77 29 a5.4 5.4 0 1 0 0 10.8 4 4 0 1 1 0 -10.8z"/>
            <path d="M83 31l.8 2 2.1.18-1.6 1.3.5 2.1-1.8-1.1-1.8 1.1.5-2.1-1.6-1.3 2.1-.18z"/>
          </g>
          <g className="pulse" style={{animationDelay:'.5s'}} fill="none" stroke="#F2C033" strokeWidth="1.7">
            <rect x="72.7" y="61" width="10" height="10" rx="1"/>
            <rect x="72.7" y="61" width="10" height="10" rx="1" transform="rotate(45 77.7 66)"/>
            <circle cx="77.7" cy="66" r="1.4" fill="#FFD66B" stroke="none"/>
          </g>
          <g className="pulse" style={{animationDelay:'.75s'}}>
            <path d="M43 80 q7 -2.6 7 0 q0 -2.6 7 0 l0 6.4 q-7 -2.6 -7 0 q0 -2.6 -7 0 z" fill="#FFF1C4" stroke="#A9740A" strokeWidth="1.2" strokeLinejoin="round"/>
            <path d="M50 80 v6.4" stroke="#A9740A" strokeWidth="1"/>
            <path d="M45 82 h3.5 M45 84 h3.5 M51.5 82 h3.5 M51.5 84 h3.5" stroke="#C9A24A" strokeWidth=".6"/>
          </g>
          <g className="pulse" style={{animationDelay:'1s'}}>
            <circle cx="22.3" cy="57.5" r="1.1"/>
            <path d="M17 67 q0 -7.5 5.3 -7.5 q5.3 0 5.3 7.5 z"/>
            <rect x="16.4" y="67" width="11.8" height="4.5" rx="1"/>
          </g>
          <g className="pulse" style={{animationDelay:'1.25s'}}>
            <path d="M22.3 27.5 v-1.6" stroke="#A9740A" strokeWidth=".8"/>
            <rect x="20" y="28" width="4.6" height="2.6" rx=".8"/>
            <path d="M19 31 q-1.2 5 .4 8.3 q1 1.6 2.9 1.6 q1.9 0 2.9 -1.6 q1.6 -3.3 .4 -8.3 z"/>
            <ellipse cx="22.3" cy="35.5" rx="1.5" ry="2.6" fill="#FFF1C4" stroke="none"/>
          </g>
        </g>
        <g className="bob">
          <circle cx="50" cy="50" r="16" fill="url(#m2-ri-badge)" stroke="#A9740A" strokeWidth="1.6"/>
          <circle cx="50" cy="50" r="16" fill="none" stroke="#FFF6D6" strokeWidth="1" opacity=".7"/>
          <circle cx="50" cy="50" r="12.2" fill="none" stroke="#A9740A" strokeWidth=".8" strokeDasharray="2 2.5" opacity=".55"/>
          <text x="50" y="51" textAnchor="middle" dominantBaseline="central" fontFamily="Baloo 2,sans-serif" fontSize="20" fontWeight="800" fill="#1B5E20">6</text>
          <ellipse cx="44.5" cy="44.5" rx="4" ry="5.5" fill="#fff" opacity=".4"/>
        </g>
      </svg>
    ),
  },
  {
    id: 'rukun-islam',
    pill: 'TOPIK 2.2',
    title: 'Rukun Islam',
    desc: 'Lima amalan asas yang menjadi tiang agama Islam.',
    visual: (
      <svg viewBox="0 0 100 100" fill="none">
        <defs>
          <linearGradient id="m2-is-dome" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#FFF1A8"/><stop offset="100%" stopColor="#E0A012"/></linearGradient>
          <linearGradient id="m2-is-wall" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#FFFFFF"/><stop offset="100%" stopColor="#DCF0E4"/></linearGradient>
          <linearGradient id="m2-is-col" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#BFE6CC"/><stop offset="50%" stopColor="#FFFFFF"/><stop offset="100%" stopColor="#BFE6CC"/></linearGradient>
          <radialGradient id="m2-ri-glow-is" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#FFF1A8"/><stop offset="100%" stopColor="rgba(255,193,7,0)"/></radialGradient>
        </defs>
        <ellipse cx="50" cy="92" rx="34" ry="4.5" fill="rgba(27,94,32,.14)"/>
        <g className="floatA">
          <path d="M50 12 a4 4 0 1 0 0 8 3 3 0 1 1 0-8z" fill="url(#m2-is-dome)" stroke="#A9740A" strokeWidth=".6" className="pulse"/>
          <path d="M34 44 Q34 22 50 22 Q66 22 66 44 Z" fill="url(#m2-is-dome)" stroke="#A9740A" strokeWidth="1.3"/>
          <rect x="30" y="44" width="40" height="5" fill="url(#m2-is-dome)" stroke="#A9740A" strokeWidth="1"/>
          <rect x="28" y="49" width="44" height="33" rx="2" fill="url(#m2-is-wall)" stroke="#7CB494" strokeWidth="1.2"/>
          <g>
            <rect x="32" y="55" width="5.5" height="27" rx="2.5" fill="url(#m2-is-col)" stroke="#7CB494" strokeWidth=".8"/>
            <rect x="40" y="55" width="5.5" height="27" rx="2.5" fill="url(#m2-is-col)" stroke="#7CB494" strokeWidth=".8"/>
            <rect x="48" y="55" width="5.5" height="27" rx="2.5" fill="url(#m2-is-col)" stroke="#7CB494" strokeWidth=".8"/>
            <rect x="56" y="55" width="5.5" height="27" rx="2.5" fill="url(#m2-is-col)" stroke="#7CB494" strokeWidth=".8"/>
            <rect x="64" y="55" width="5.5" height="27" rx="2.5" fill="url(#m2-is-col)" stroke="#7CB494" strokeWidth=".8"/>
          </g>
          <g fontFamily="Baloo 2,sans-serif" fontSize="6" fontWeight="800" fill="#1F9A5E" textAnchor="middle">
            <text x="34.75" y="71">1</text>
            <text x="42.75" y="71">2</text>
            <text x="50.75" y="71">3</text>
            <text x="58.75" y="71">4</text>
            <text x="66.75" y="71">5</text>
          </g>
          <path d="M32 56 Q50 50 70 56" fill="none" stroke="#E0A012" strokeWidth="1.4"/>
          <rect x="26" y="82" width="48" height="4" rx="1.5" fill="url(#m2-is-dome)" stroke="#A9740A" strokeWidth=".8"/>
        </g>
        <g className="bob">
          <circle cx="74" cy="27" r="9" fill="url(#m2-ri-glow-is)" className="pulse"/>
          <circle cx="74" cy="27" r="13" fill="url(#m2-is-dome)" stroke="#A9740A" strokeWidth="1.5"/>
          <circle cx="74" cy="27" r="13" fill="none" stroke="#FFF6D6" strokeWidth="1" opacity=".7"/>
          <text x="74" y="28" textAnchor="middle" dominantBaseline="central" fontFamily="Baloo 2,sans-serif" fontSize="17" fontWeight="800" fill="#1B5E20">5</text>
          <ellipse cx="69.5" cy="22.5" rx="3" ry="4" fill="#fff" opacity=".45"/>
        </g>
      </svg>
    ),
  },
  {
    id: 'syahadah',
    pill: 'TOPIK 2.3',
    title: 'Dua Kalimah Syahadah',
    desc: 'Lafaz, makna dan kepentingan mengucap syahadah.',
    visual: (
      <>
        <svg viewBox="0 0 100 100" fill="none">
          <defs>
            <radialGradient id="m2-sy-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#FFF1A8"/><stop offset="100%" stopColor="rgba(255,193,7,0)"/></radialGradient>
          </defs>
          <ellipse cx="50" cy="92" rx="24" ry="4.5" fill="rgba(27,94,32,.14)"/>
          <circle cx="50" cy="46" r="26" fill="url(#m2-sy-glow)" className="pulse"/>
          <path d="M72 22l1.4 3.6 3.8.3-2.9 2.5.9 3.7-3.2-2-3.2 2 .9-3.7-2.9-2.5 3.8-.3z" fill="#FFD66B" stroke="#A9740A" strokeWidth=".5" className="pulse"/>
          <path d="M26 30l1.1 2.8 3 .25-2.3 2 .75 3-2.55-1.6-2.55 1.6.75-3-2.3-2 3-.25z" fill="#FFD66B" stroke="#A9740A" strokeWidth=".4" className="pulse" style={{animationDelay:'.6s'}}/>
        </svg>
        <span style={{position:'absolute',left:'50%',top:'55%',transform:'translate(-50%,-50%)',fontSize:'60px',lineHeight:1,pointerEvents:'none',zIndex:3,filter:'drop-shadow(0 4px 7px rgba(27,94,32,.4))'}}>☝️</span>
      </>
    ),
  },
  {
    id: 'asmaul-husna-khaliq',
    pill: 'TOPIK 2.4',
    title: 'Asmaul Husna: Al-Khaliq',
    desc: 'Mengenal Allah sebagai Pencipta segala-galanya.',
    visual: (
      <svg viewBox="0 0 100 100" fill="none">
        <defs>
          <radialGradient id="m2-kh-globe" cx="36%" cy="30%" r="78%"><stop offset="0%" stopColor="#BFE9FF"/><stop offset="45%" stopColor="#4FA8E0"/><stop offset="100%" stopColor="#1E5BA8"/></radialGradient>
          <linearGradient id="m2-kh-land" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#8BE08B"/><stop offset="100%" stopColor="#2E9A5E"/></linearGradient>
          <linearGradient id="m2-kh-star" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#FFF1A8"/><stop offset="100%" stopColor="#E0A012"/></linearGradient>
        </defs>
        <ellipse cx="50" cy="92" rx="26" ry="4.5" fill="rgba(27,94,32,.14)"/>
        <g className="floatA">
          <path d="M50 14l1.3 3.3 3.6.3-2.7 2.3.9 3.5-3.1-1.9-3.1 1.9.9-3.5-2.7-2.3 3.6-.3z" fill="url(#m2-kh-star)" stroke="#A9740A" strokeWidth=".5"/>
          <path d="M86 50l1.1 2.8 3 .25-2.3 2 .75 3-2.55-1.6-2.55 1.6.75-3-2.3-2 3-.25z" fill="url(#m2-kh-star)" stroke="#A9740A" strokeWidth=".4"/>
          <path d="M14 50l1.1 2.8 3 .25-2.3 2 .75 3-2.55-1.6-2.55 1.6.75-3-2.3-2 3-.25z" fill="url(#m2-kh-star)" stroke="#A9740A" strokeWidth=".4"/>
        </g>
        <g className="pulse" fill="#fff">
          <circle cx="28" cy="30" r="1.6"/><circle cx="74" cy="28" r="1.4"/>
          <circle cx="80" cy="70" r="1.5"/><circle cx="22" cy="68" r="1.3"/>
        </g>
        <g className="floatA d2">
          <circle cx="50" cy="54" r="22" fill="url(#m2-kh-globe)" stroke="#16407A" strokeWidth="1.5"/>
          <path d="M38 44 q6 -3 11 1 q4 4 -1 7 q-7 2 -10 -2 q-3 -4 0 -6z" fill="url(#m2-kh-land)" opacity=".95"/>
          <path d="M55 56 q7 -2 9 3 q1 5 -5 7 q-7 1 -8 -4 q-1 -4 4 -6z" fill="url(#m2-kh-land)" opacity=".95"/>
          <ellipse cx="42" cy="46" rx="5" ry="7" fill="#fff" opacity=".35"/>
        </g>
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
