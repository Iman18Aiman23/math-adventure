import React from 'react';
import Tahun1ModuleHubLayout from '../../../PendidikanIslamPage/Tahun1/Tahun1ModuleHubLayout';

const CARD_BG = '#F3FDFA';
const THEME = {
  pageGradient: 'linear-gradient(180deg,#CCFBF1 0%,#5EEAD4 50%,#0F766E 100%)',
  dark: '#0F766E',
  accent: '#14B8A6',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#CCFBF1 0%,#5EEAD4 55%,#0F766E 100%)',
  pillGradient: 'linear-gradient(180deg,#14B8A6,#0F766E)',
};

const TOPICS = [
  {
    id: '2-nombor-1000',
    pill: 'TOPIK 1.1',
    title: 'Nombor Bulat hingga 1,000',
    desc: 'Kenali nombor 1 hingga 1,000 dengan nilai tempat dan bundaran.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(20,184,166,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#14B8A6" />
        <rect x="12" y="24" width="76" height="12" fill="#14B8A6" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 1.1</text>
        <rect x="18" y="46" width="18" height="22" rx="3" fill="#0F766E" opacity=".12" />
        <text x="27" y="61" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="12" fontWeight="800" fill="#0F766E">2</text>
        <rect x="40" y="46" width="18" height="22" rx="3" fill="#0F766E" opacity=".2" />
        <text x="49" y="61" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="12" fontWeight="800" fill="#0F766E">5</text>
        <rect x="62" y="46" width="18" height="22" rx="3" fill="#0F766E" opacity=".3" />
        <text x="71" y="61" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="12" fontWeight="800" fill="#0F766E">0</text>
        <rect x="27" y="72" width="6" height="8" rx="1" fill="#14B8A6" opacity=".3" />
        <text x="30" y="79" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="5" fill="#0F766E">ratus</text>
        <rect x="49" y="72" width="6" height="8" rx="1" fill="#14B8A6" opacity=".3" />
        <text x="52" y="79" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="5" fill="#0F766E">puluh</text>
        <rect x="71" y="72" width="6" height="8" rx="1" fill="#14B8A6" opacity=".3" />
        <text x="76" y="79" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="5" fill="#0F766E">sa</text>
      </svg>
    ),
  },
  {
    id: '2-tambah',
    pill: 'TOPIK 1.2',
    title: 'Operasi Tambah',
    desc: 'Tambah nombor hingga tiga digit dengan pelbagai kaedah.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="10" y="14" width="80" height="72" rx="12" fill={CARD_BG} stroke="rgba(20,184,166,0.35)" strokeWidth="2" />
        <rect x="10" y="14" width="80" height="16" rx="12" fill="#14B8A6" />
        <rect x="10" y="20" width="80" height="10" fill="#14B8A6" />
        <text x="50" y="26" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 1.2</text>
        <rect x="20" y="46" width="14" height="18" rx="2" fill="#0F766E" opacity=".1" />
        <text x="27" y="59" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="10" fontWeight="800" fill="#0F766E">45</text>
        <text x="40" y="59" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="10" fontWeight="800" fill="#14B8A6">+</text>
        <rect x="48" y="46" width="14" height="18" rx="2" fill="#0F766E" opacity=".15" />
        <text x="55" y="59" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="10" fontWeight="800" fill="#0F766E">38</text>
        <text x="68" y="59" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="10" fontWeight="800" fill="#14B8A6">=</text>
        <text x="78" y="59" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="10" fontWeight="800" fill="#0F766E">83</text>
        <circle cx="27" cy="74" r="2" fill="#14B8A6" opacity=".4" />
        <circle cx="55" cy="74" r="2" fill="#14B8A6" opacity=".4" />
      </svg>
    ),
  },
  {
    id: '2-tolak',
    pill: 'TOPIK 1.2',
    title: 'Operasi Tolak',
    desc: 'Tolak nombor hingga tiga digit dengan mudah.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="10" y="14" width="80" height="72" rx="12" fill={CARD_BG} stroke="rgba(20,184,166,0.35)" strokeWidth="2" />
        <rect x="10" y="14" width="80" height="16" rx="12" fill="#14B8A6" />
        <rect x="10" y="20" width="80" height="10" fill="#14B8A6" />
        <text x="50" y="26" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 1.2</text>
        <rect x="20" y="46" width="14" height="18" rx="2" fill="#0F766E" opacity=".1" />
        <text x="27" y="59" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="10" fontWeight="800" fill="#0F766E">76</text>
        <text x="40" y="59" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="10" fontWeight="800" fill="#14B8A6">-</text>
        <rect x="48" y="46" width="14" height="18" rx="2" fill="#0F766E" opacity=".15" />
        <text x="55" y="59" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="10" fontWeight="800" fill="#0F766E">42</text>
        <text x="68" y="59" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="10" fontWeight="800" fill="#14B8A6">=</text>
        <text x="78" y="59" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="10" fontWeight="800" fill="#0F766E">34</text>
        <line x1="20" y1="72" x2="35" y2="72" stroke="#14B8A6" strokeWidth="1.2" opacity=".3" />
        <line x1="48" y1="72" x2="63" y2="72" stroke="#14B8A6" strokeWidth="1.2" opacity=".3" />
      </svg>
    ),
  },
  {
    id: '2-darab',
    pill: 'TOPIK 1.3',
    title: 'Darab',
    desc: 'Pelajari konsep darab dengan sifir 2 hingga 10.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="10" y="14" width="80" height="72" rx="12" fill={CARD_BG} stroke="rgba(20,184,166,0.35)" strokeWidth="2" />
        <rect x="10" y="14" width="80" height="16" rx="12" fill="#14B8A6" />
        <rect x="10" y="20" width="80" height="10" fill="#14B8A6" />
        <text x="50" y="26" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 1.3</text>
        <rect x="22" y="46" width="14" height="18" rx="2" fill="#0F766E" opacity=".1" />
        <text x="29" y="59" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="10" fontWeight="800" fill="#0F766E">4</text>
        <text x="40" y="59" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="10" fontWeight="800" fill="#14B8A6">&#215;</text>
        <rect x="48" y="46" width="14" height="18" rx="2" fill="#0F766E" opacity=".15" />
        <text x="55" y="59" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="10" fontWeight="800" fill="#0F766E">3</text>
        <text x="66" y="59" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="10" fontWeight="800" fill="#14B8A6">=</text>
        <text x="76" y="59" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="10" fontWeight="800" fill="#0F766E">12</text>
        <circle cx="29" cy="76" r="2" fill="#14B8A6" opacity=".3" />
        <circle cx="55" cy="76" r="2" fill="#14B8A6" opacity=".3" />
      </svg>
    ),
  },
  {
    id: '2-bahagi',
    pill: 'TOPIK 1.3',
    title: 'Bahagi',
    desc: 'Bahagi nombor dalam lingkungan 100 dengan konsep kumpulan sama banyak.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(20,184,166,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#14B8A6" />
        <rect x="12" y="24" width="76" height="12" fill="#14B8A6" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 1.3</text>
        <rect x="20" y="46" width="14" height="18" rx="2" fill="#0F766E" opacity=".1" />
        <text x="27" y="59" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="10" fontWeight="800" fill="#0F766E">12</text>
        <text x="40" y="59" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="10" fontWeight="800" fill="#14B8A6">&#247;</text>
        <rect x="48" y="46" width="14" height="18" rx="2" fill="#0F766E" opacity=".15" />
        <text x="55" y="59" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="10" fontWeight="800" fill="#0F766E">3</text>
        <text x="66" y="59" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="10" fontWeight="800" fill="#14B8A6">=</text>
        <text x="78" y="59" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="10" fontWeight="800" fill="#0F766E">4</text>
        <circle cx="27" cy="76" r="2" fill="#14B8A6" opacity=".3" />
        <circle cx="55" cy="76" r="2" fill="#14B8A6" opacity=".3" />
      </svg>
    ),
  },
  {
    id: '2-pecahan',
    pill: 'TOPIK 1.4',
    title: 'Pecahan',
    desc: 'Kenali pecahan wajar dan bandingkan nilai pecahan.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="10" y="14" width="80" height="72" rx="12" fill={CARD_BG} stroke="rgba(20,184,166,0.35)" strokeWidth="2" />
        <rect x="10" y="14" width="80" height="16" rx="12" fill="#14B8A6" />
        <rect x="10" y="20" width="80" height="10" fill="#14B8A6" />
        <text x="50" y="26" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 1.4</text>
        <circle cx="50" cy="56" r="18" fill="#E0F2FE" stroke="#14B8A6" strokeWidth="2" />
        <path d="M50 38 L50 56 L64 56 Z" fill="#0F766E" opacity=".3" />
        <path d="M50 38 L50 56 L36 56 Z" fill="#0F766E" opacity=".15" />
        <text x="50" y="86" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="6" fill="#0F766E">1/4</text>
      </svg>
    ),
  },
  {
    id: '2-perpuluhan',
    pill: 'TOPIK 1.4',
    title: 'Perpuluhan',
    desc: 'Kenali perpuluhan 0.1 hingga 0.9 menggunakan visual grid.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="10" y="14" width="80" height="72" rx="12" fill={CARD_BG} stroke="rgba(20,184,166,0.35)" strokeWidth="2" />
        <rect x="10" y="14" width="80" height="16" rx="12" fill="#14B8A6" />
        <rect x="10" y="20" width="80" height="10" fill="#14B8A6" />
        <text x="50" y="26" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 1.4</text>
        <rect x="14" y="46" width="72" height="14" rx="2" fill="#CCFBF1" />
        {Array.from({length:10},(_,i)=>(
          <rect key={i} x={14 + i * 7.2} y={46} width="6.2" height="14" rx="1.5" fill={i < 5 ? '#14B8A6' : '#CCFBF1'} />
        ))}
        <text x="50" y="74" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="13" fontWeight="800" fill="#0F766E">0.5</text>
      </svg>
    ),
  },
  {
    id: '2-wang',
    pill: 'TOPIK 1.5',
    title: 'Wang hingga RM100',
    desc: 'Kira wang dan lakukan operasi tambah tolak dalam lingkungan RM100.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="10" y="14" width="80" height="72" rx="12" fill={CARD_BG} stroke="rgba(20,184,166,0.35)" strokeWidth="2" />
        <rect x="10" y="14" width="80" height="16" rx="12" fill="#14B8A6" />
        <rect x="10" y="20" width="80" height="10" fill="#14B8A6" />
        <text x="50" y="26" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 1.5</text>
        <rect x="54" y="42" width="22" height="30" rx="3" fill="#10B981" stroke="#059669" strokeWidth="1" />
        <text x="65" y="63" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="9" fontWeight="800" fill="#fff">RM50</text>
        <rect x="24" y="44" width="20" height="28" rx="3" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" />
        <text x="34" y="63" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="8" fontWeight="800" fill="#92400E">RM20</text>
      </svg>
    ),
  },
];

export default function NomborModule({ onSelectTopic, language = 'bm' }) {
  return (
    <Tahun1ModuleHubLayout
      moduleNum={1}
      moduleName="Nombor dan Operasi"
      moduleNameEn="Numbers and Operations"
      theme={THEME}
      topics={TOPICS}
      onSelectTopic={onSelectTopic}
      language={language}
    />
  );
}
