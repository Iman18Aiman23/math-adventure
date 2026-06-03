import React from 'react';
import Tahun1ModuleHubLayout from '../../Tahun1/Tahun1ModuleHubLayout';

const THEME = {
  pageGradient: 'linear-gradient(180deg, #D6EEFF 0%, #EBF5FF 40%, #F5F9FF 100%)',
  dark: '#2563EB',
  accent: '#3B82F6',
  stageGradient: 'linear-gradient(145deg, #2563EB, #3B82F6, #60A5FA)',
  pillGradient: 'linear-gradient(135deg, #3B82F6, #60A5FA)',
};

const topics = [
  {
    id: 'syarat-solat',
    title: 'Syarat Solat',
    desc: 'Syarat wajib dan syarat sah solat fardu.',
    num: '3.1',
    visual: (
      <svg viewBox="0 0 100 100" fill="none">
        <defs>
          <linearGradient id="m3-sy-box" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#60A5FA"/><stop offset="100%" stopColor="#2563EB"/></linearGradient>
          <linearGradient id="m3-sy-doc" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#FFFFFF"/><stop offset="100%" stopColor="#DBEAFE"/></linearGradient>
        </defs>
        <rect x="12" y="18" width="76" height="64" rx="12" fill="url(#m3-sy-doc)" stroke="#2563EB" strokeWidth="1.8"/>
        <rect x="12" y="18" width="76" height="16" rx="12" fill="url(#m3-sy-box)"/>
        <rect x="16" y="22" width="68" height="8" rx="3" fill="#fff" opacity=".3"/>
        <g className="floatA">
          <circle cx="22" cy="48" r="4" fill="#10B981"/>
          <circle cx="22" cy="58" r="4" fill="#10B981"/>
          <circle cx="22" cy="68" r="4" fill="#10B981"/>
          <line x1="32" y1="48" x2="70" y2="48" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="32" y1="58" x2="64" y2="58" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="32" y1="68" x2="78" y2="68" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round"/>
        </g>
      </svg>
    ),
  },
  {
    id: 'rukun-solat',
    title: 'Rukun Solat',
    desc: "Rukun Fi'li, Qouli & Qalbi dalam solat.",
    num: '3.2',
    visual: (
      <svg viewBox="0 0 100 100" fill="none">
        <defs>
          <linearGradient id="m3-rk-box" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#60A5FA"/><stop offset="100%" stopColor="#2563EB"/></linearGradient>
        </defs>
        <rect x="12" y="18" width="76" height="64" rx="12" fill="#FFFFFF" stroke="#2563EB" strokeWidth="1.8"/>
        <rect x="12" y="18" width="76" height="16" rx="12" fill="url(#m3-rk-box)"/>
        <rect x="16" y="22" width="68" height="8" rx="3" fill="#fff" opacity=".3"/>
        <g className="floatA">
          <circle cx="28" cy="46" r="7" fill="#3B82F6"/><text x="28" y="49" textAnchor="middle" fill="#fff" fontSize="9" fontFamily="Fredoka" fontWeight="700">1</text>
          <circle cx="50" cy="46" r="7" fill="#3B82F6"/><text x="50" y="49" textAnchor="middle" fill="#fff" fontSize="9" fontFamily="Fredoka" fontWeight="700">2</text>
          <circle cx="72" cy="46" r="7" fill="#3B82F6"/><text x="72" y="49" textAnchor="middle" fill="#fff" fontSize="9" fontFamily="Fredoka" fontWeight="700">3</text>
          <circle cx="34" cy="66" r="7" fill="#60A5FA"/><text x="34" y="69" textAnchor="middle" fill="#fff" fontSize="9" fontFamily="Fredoka" fontWeight="700">4</text>
          <circle cx="56" cy="66" r="7" fill="#60A5FA"/><text x="56" y="69" textAnchor="middle" fill="#fff" fontSize="9" fontFamily="Fredoka" fontWeight="700">5</text>
          <circle cx="78" cy="66" r="7" fill="#60A5FA"/><text x="78" y="69" textAnchor="middle" fill="#fff" fontSize="9" fontFamily="Fredoka" fontWeight="700">6</text>
        </g>
        <text x="50" y="82" textAnchor="middle" fill="#2563EB" fontSize="7" fontFamily="Fredoka" fontWeight="600">+ 7 lagi</text>
      </svg>
    ),
  },
  {
    id: 'azan-iqamah',
    title: 'Azan & Iqamah',
    desc: 'Lafaz azan, iqamah dan cara menjawabnya.',
    num: '3.3',
    visual: (
      <svg viewBox="0 0 100 100" fill="none">
        <defs>
          <linearGradient id="m3-az-box" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#60A5FA"/><stop offset="100%" stopColor="#2563EB"/></linearGradient>
          <linearGradient id="m3-az-dome" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#93C5FD"/><stop offset="100%" stopColor="#3B82F6"/></linearGradient>
        </defs>
        <rect x="12" y="18" width="76" height="64" rx="12" fill="#EBF5FF" stroke="#2563EB" strokeWidth="1.8"/>
        <rect x="12" y="18" width="76" height="16" rx="12" fill="url(#m3-az-box)"/>
        <rect x="16" y="22" width="68" height="8" rx="3" fill="#fff" opacity=".3"/>
        <g className="floatA">
          <path d="M50 30 l-14 24 h28 z" fill="url(#m3-az-dome)" stroke="#2563EB" strokeWidth="1.3" strokeLinejoin="round"/>
          <path d="M50 30 v-12" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round"/>
          <circle cx="50" cy="16" r="2.8" fill="#FBBF24"/>
          <rect x="40" y="54" width="20" height="18" rx="2" fill="url(#m3-az-dome)" stroke="#2563EB" strokeWidth="1"/>
          <path d="M44 54 v18 M48 54 v18 M52 54 v18 M56 54 v18" stroke="#2563EB" strokeWidth="0.7"/>
          <path d="M32 58 h6 v10 h-6 z" fill="#2563EB" opacity=".5" rx="2"/>
          <path d="M62 58 h6 v10 h-6 z" fill="#2563EB" opacity=".5" rx="2"/>
        </g>
        <g className="pulse">
          <ellipse cx="30" cy="38" rx="6" ry="4" fill="#FEF3C7" stroke="#F59E0B" strokeWidth=".8" opacity=".7"/>
          <path d="M70 38 q3 -3 6 0" fill="none" stroke="#3B82F6" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M70 48 q3 -3 6 0" fill="none" stroke="#3B82F6" strokeWidth="1.2" strokeLinecap="round"/>
        </g>
      </svg>
    ),
  },
];

export default function IbadahModule({ onBack, onSelectTopic, language = 'bm' }) {
  return (
    <Tahun1ModuleHubLayout
      moduleNum={3}
      moduleName="Ibadah"
      moduleNameEn="Worship"
      theme={THEME}
      topics={topics}
      onBack={onBack}
      onSelectTopic={onSelectTopic}
      language={language}
    />
  );
}
