import React from 'react';
import Tahun1ModuleHubLayout from '../Tahun1ModuleHubLayout';

const THEME = {
  pageGradient: 'linear-gradient(180deg, #ECFDF5 0%, #D1FAE5 40%, #F0FDFA 100%)',
  dark: '#065F46',
  accent: '#10B981',
  stageGradient: 'linear-gradient(145deg, #065F46, #10B981, #34D399)',
  pillGradient: 'linear-gradient(135deg, #10B981, #34D399)',
};

const topics = [
  {
    id: 'huruf-jawi-tunggal',
    title: 'Huruf Jawi Tunggal',
    desc: 'Mengenal, menyebut dan menulis 37 huruf Jawi tunggal',
    num: '6.1',
    visual: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="120" rx="20" fill="url(#jp-g)" />
        <defs>
          <linearGradient id="jp-g" x1="0" y1="0" x2="120" y2="120">
            <stop offset="0%" stopColor="#D1FAE5" />
            <stop offset="100%" stopColor="#A7F3D0" />
          </linearGradient>
        </defs>
        <path
          d="M60 20 Q75 35 70 50 Q65 60 60 55 Q55 50 50 55 Q45 60 40 50 Q35 35 60 20Z"
          fill="#065F46"
          opacity="0.9"
        />
        <path
          d="M28 88 Q40 70 55 78 Q62 82 58 90 Q54 98 42 94 Q30 90 28 88Z"
          fill="#10B981"
          opacity="0.7"
        />
        <rect x="68" y="30" width="4" height="65" rx="2" fill="#065F46" opacity="0.8" />
        <circle cx="70" cy="28" r="5" fill="#065F46" />
        <line x1="72" y1="35" x2="88" y2="40" stroke="#065F46" strokeWidth="2" opacity="0.5" />
        <line x1="72" y1="42" x2="85" y2="48" stroke="#065F46" strokeWidth="2" opacity="0.5" />
        <line x1="72" y1="49" x2="86" y2="56" stroke="#065F46" strokeWidth="2" opacity="0.5" />
        <text
          x="60"
          y="110"
          textAnchor="middle"
          fontFamily="Amiri, serif"
          fontSize="20"
          fill="#065F46"
          fontWeight="bold"
        >
          أ ب ت
        </text>
      </svg>
    ),
  },
  {
    id: 'suku-kata-terbuka-jawi',
    title: 'Suku Kata Terbuka',
    desc: 'Membaca suku kata terbuka Jawi dengan vokal Alif, Wau dan Ya',
    num: '6.2',
    visual: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="120" rx="20" fill="url(#sk-g)" />
        <defs>
          <linearGradient id="sk-g" x1="0" y1="0" x2="120" y2="120">
            <stop offset="0%" stopColor="#D1FAE5" />
            <stop offset="100%" stopColor="#A7F3D0" />
          </linearGradient>
        </defs>
        <rect x="18" y="30" width="36" height="36" rx="8" fill="#065F46" opacity="0.9" />
        <text
          x="36"
          y="54"
          textAnchor="middle"
          fontFamily="Amiri, serif"
          fontSize="22"
          fill="#FFFFFF"
          fontWeight="bold"
        >
          با
        </text>
        <rect x="66" y="30" width="36" height="36" rx="8" fill="#10B981" opacity="0.85" />
        <text
          x="84"
          y="54"
          textAnchor="middle"
          fontFamily="Amiri, serif"
          fontSize="22"
          fill="#FFFFFF"
          fontWeight="bold"
        >
          بي
        </text>
        <rect x="42" y="72" width="36" height="36" rx="8" fill="#34D399" opacity="0.8" />
        <text
          x="60"
          y="96"
          textAnchor="middle"
          fontFamily="Amiri, serif"
          fontSize="22"
          fill="#FFFFFF"
          fontWeight="bold"
        >
          بو
        </text>
      </svg>
    ),
  },
];

export default function JawiModule({ onBack, onSelectTopic, language = 'bm' }) {
  return (
    <Tahun1ModuleHubLayout
      theme={THEME}
      moduleNum={6}
      moduleName="Jawi"
      moduleNameEn="Jawi"
      topics={topics}
      onBack={onBack}
      onSelectTopic={onSelectTopic}
      language={language}
    />
  );
}
