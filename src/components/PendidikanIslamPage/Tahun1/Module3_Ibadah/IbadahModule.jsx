import React from 'react';
import Tahun1ModuleHubLayout from '../Tahun1ModuleHubLayout';

const THEME = {
  pageGradient: 'linear-gradient(180deg, #EBF8FF 0%, #E0F2FE 40%, #F0F9FF 100%)',
  dark: '#0C4A6E',
  accent: '#0891B2',
  stageGradient: 'linear-gradient(145deg, #0E7490, #0891B2, #06B6D4)',
  pillGradient: 'linear-gradient(135deg, #0891B2, #06B6D4)',
};

const topics = [
  {
    id: 'istinja',
    title: "Konsep Istinja'",
    desc: 'Cara membersihkan diri selepas buang air besar atau kecil',
    num: '3.1',
    visual: (
      <svg viewBox="0 0 100 100" fill="none">
        <defs>
          <radialGradient id="m3-ja-drop" cx="38%" cy="28%" r="82%"><stop offset="0%" stopColor="#EAFBFF"/><stop offset="45%" stopColor="#6CCDF2"/><stop offset="100%" stopColor="#1683B8"/></radialGradient>
          <linearGradient id="m3-ja-box" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#3CB6E0"/><stop offset="100%" stopColor="#1E7FB0"/></linearGradient>
          <linearGradient id="m3-ja-rock" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#BAC6D2"/><stop offset="100%" stopColor="#7B8997"/></linearGradient>
        </defs>
        <ellipse cx="50" cy="90" rx="36" ry="6" fill="rgba(11,92,132,.12)"/>
        <g className="floatA">
          <path d="M50 12 C 61 30, 61 40, 50 44 C 39 40, 39 30, 50 12 Z" fill="url(#m3-ja-drop)" stroke="#0B5C84" strokeWidth="1.5"/>
          <ellipse cx="45.5" cy="32" rx="2.6" ry="4.6" fill="#fff" opacity=".7"/>
          <circle cx="52" cy="38" r="1.4" fill="#fff" opacity=".5"/>
        </g>
        <g className="floatA d1">
          <path d="M22 64 q6 -16 12 0 z" fill="#FBFEFF" stroke="#B8C4D0" strokeWidth="1.1" strokeLinejoin="round"/>
          <rect x="12" y="63" width="36" height="22" rx="4" fill="#fff" stroke="#0B5C84" strokeWidth="1.5"/>
          <path d="M12 71 h36" stroke="#0B5C84" strokeWidth="1" opacity=".5"/>
          <rect x="12" y="63" width="36" height="8" rx="4" fill="url(#m3-ja-box)"/>
          <ellipse cx="30" cy="71" rx="9" ry="2.4" fill="#0B5C84" opacity=".28"/>
        </g>
        <g className="floatA d2">
          <ellipse cx="68" cy="80" rx="14" ry="9.5" fill="url(#m3-ja-rock)" stroke="#5E6F80" strokeWidth="1.3"/>
          <ellipse cx="83" cy="84" rx="9" ry="6.5" fill="url(#m3-ja-rock)" stroke="#5E6F80" strokeWidth="1.3"/>
          <ellipse cx="63" cy="76" rx="4.5" ry="2.6" fill="#fff" opacity=".4"/>
          <ellipse cx="80" cy="81" rx="2.6" ry="1.6" fill="#fff" opacity=".35"/>
        </g>
      </svg>
    ),
  },
  {
    id: 'air-mutlak',
    title: 'Air Mutlak',
    desc: 'Mengenal air suci yang boleh digunakan untuk bersuci',
    num: '3.2',
    visual: (
      <svg viewBox="0 0 100 100" fill="none">
        <defs>
          <radialGradient id="m3-am-drop" cx="38%" cy="28%" r="82%"><stop offset="0%" stopColor="#EAFBFF"/><stop offset="45%" stopColor="#6CCDF2"/><stop offset="100%" stopColor="#1683B8"/></radialGradient>
          <linearGradient id="m3-am-water" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#9EE0F7"/><stop offset="100%" stopColor="#27A0CE"/></linearGradient>
        </defs>
        <ellipse cx="50" cy="92" rx="28" ry="5" fill="rgba(11,92,132,.12)"/>
        <g className="pulse" fill="#fff">
          <path d="M20 30l1.2 3 3 .6-3 1.2-1.2 3-1.2-3-3-1.2 3-.6z"/>
          <path d="M82 36l1 2.4 2.4 .5-2.4 1-1 2.4-1-2.4-2.4-1 2.4-.5z"/>
          <circle cx="24" cy="64" r="1.8"/>
          <circle cx="80" cy="68" r="1.5"/>
        </g>
        <g className="floatA">
          <path d="M50 16 C 57 27, 57 34, 50 37 C 43 34, 43 27, 50 16 Z" fill="url(#m3-am-drop)" stroke="#0B5C84" strokeWidth="1.3"/>
          <ellipse cx="47" cy="29" rx="1.8" ry="3.2" fill="#fff" opacity=".7"/>
        </g>
        <g className="floatA d1">
          <path d="M33 42 L67 42 L62 86 Q50 91 38 86 Z" fill="rgba(255,255,255,.34)" stroke="#0B5C84" strokeWidth="1.8" strokeLinejoin="round"/>
          <path d="M35.6 54 L64.4 54 L60.6 84.5 Q50 88.5 39.4 84.5 Z" fill="url(#m3-am-water)"/>
          <ellipse cx="50" cy="54" rx="14.4" ry="2.6" fill="#EAFBFF" opacity=".85"/>
          <path d="M40 47 L37.5 82" stroke="#fff" strokeWidth="3" opacity=".55" strokeLinecap="round"/>
          <ellipse cx="50" cy="42" rx="17" ry="3" fill="none" stroke="#0B5C84" strokeWidth="1.8"/>
        </g>
      </svg>
    ),
  },
  {
    id: 'amali-wuduk',
    title: 'Amali Wuduk',
    desc: 'Rukun, sunat dan perkara yang membatalkan wuduk',
    num: '3.3',
    visual: (
      <>
        <svg viewBox="0 0 100 100" fill="none">
          <defs>
            <linearGradient id="m3-wu-tap" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#E8EEF4"/><stop offset="50%" stopColor="#B2C0CE"/><stop offset="100%" stopColor="#76889A"/></linearGradient>
            <linearGradient id="m3-wu-water" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#9EE0F7"/><stop offset="100%" stopColor="#27A0CE"/></linearGradient>
            <linearGradient id="m3-wu-skin" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#FFE2C4"/><stop offset="100%" stopColor="#F3C193"/></linearGradient>
          </defs>
          <ellipse cx="52" cy="92" rx="30" ry="5" fill="rgba(11,92,132,.12)"/>
          <g className="floatA d2">
            <rect x="6" y="18" width="9" height="12" rx="2" fill="url(#m3-wu-tap)" stroke="#5E6F80" strokeWidth="1"/>
            <path d="M12 24 h30 q8 0 8 8 v6" fill="none" stroke="url(#m3-wu-tap)" strokeWidth="8" strokeLinecap="round"/>
            <path d="M12 24 h30 q8 0 8 8 v6" fill="none" stroke="#5E6F80" strokeWidth="1"/>
            <rect x="34" y="9" width="11" height="8" rx="2.5" fill="url(#m3-wu-tap)" stroke="#5E6F80" strokeWidth="1"/>
            <rect x="38" y="5" width="3" height="6" rx="1.5" fill="#76889A"/>
            <rect x="45.5" y="36" width="9" height="5" rx="2" fill="url(#m3-wu-tap)" stroke="#5E6F80" strokeWidth="1"/>
          </g>
          <path className="pulse" d="M50 42 q-1.5 12 -2 20" stroke="url(#m3-wu-water)" strokeWidth="5" fill="none" strokeLinecap="round"/>
          <circle className="drip" cx="52" cy="64" r="1.8" fill="#5BC8F5"/>
          <circle cx="42" cy="80" r="1.6" fill="#5BC8F5" opacity=".75"/>
          <circle cx="66" cy="82" r="1.5" fill="#5BC8F5" opacity=".7"/>
          <circle cx="60" cy="90" r="1.3" fill="#5BC8F5" opacity=".6"/>
        </svg>
        <span className="bubble" style={{position:'absolute',left:'12px',top:'55px',width:'11px',height:'11px',borderRadius:'50%',pointerEvents:'none',zIndex:999,background:'radial-gradient(circle at 35% 30%,#ffffff 0%,#DAF4FF 45%,#9FD8F2 100%)',boxShadow:'0 0 4px rgba(255,255,255,.6)'}}></span>
        <span className="bubble b2" style={{position:'absolute',left:'76px',top:'47px',width:'14px',height:'14px',borderRadius:'50%',pointerEvents:'none',zIndex:999,background:'radial-gradient(circle at 35% 30%,#ffffff 0%,#DAF4FF 45%,#9FD8F2 100%)',boxShadow:'0 0 4px rgba(255,255,255,.6)'}}></span>
        <span className="bubble b3" style={{position:'absolute',left:'24px',top:'77px',width:'8px',height:'8px',borderRadius:'50%',pointerEvents:'none',zIndex:999,background:'radial-gradient(circle at 35% 30%,#ffffff 0%,#DAF4FF 45%,#9FD8F2 100%)',boxShadow:'0 0 4px rgba(255,255,255,.6)'}}></span>
        <span className="bubble b4" style={{position:'absolute',left:'64px',top:'79px',width:'10px',height:'10px',borderRadius:'50%',pointerEvents:'none',zIndex:999,background:'radial-gradient(circle at 35% 30%,#ffffff 0%,#DAF4FF 45%,#9FD8F2 100%)',boxShadow:'0 0 4px rgba(255,255,255,.6)'}}></span>
        <span className="bubble b5" style={{position:'absolute',left:'46px',top:'87px',width:'7px',height:'7px',borderRadius:'50%',pointerEvents:'none',zIndex:999,background:'radial-gradient(circle at 35% 30%,#ffffff 0%,#DAF4FF 45%,#9FD8F2 100%)',boxShadow:'0 0 4px rgba(255,255,255,.6)'}}></span>
        <span style={{position:'absolute',left:'50%',top:'62%',transform:'translate(-50%,-50%)',fontSize:'56px',lineHeight:1,pointerEvents:'none',zIndex:2,filter:'drop-shadow(0 4px 6px rgba(11,92,132,.35))'}}>👏</span>
      </>
    ),
  },
];

export default function IbadahModule({ onBack, onSelectTopic, language = 'bm' }) {
  return (
    <Tahun1ModuleHubLayout
      moduleNum={3}
      moduleName="Ibadah"
      moduleNameEn="Ibadah"
      theme={THEME}
      topics={topics}
      onBack={onBack}
      onSelectTopic={onSelectTopic}
      language={language}
    />
  );
}
