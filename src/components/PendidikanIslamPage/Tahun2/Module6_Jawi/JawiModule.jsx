import React from 'react';
import Tahun1ModuleHubLayout from '../../Tahun1/Tahun1ModuleHubLayout';
import { ARABIC_FONT } from '../../_shared/arabic';

const THEME = {
  pageGradient: 'linear-gradient(180deg, #FEF3C7 0%, #FDE68A 40%, #FFF7ED 100%)',
  dark: '#9A3412',
  accent: '#F97316',
  stageGradient: 'linear-gradient(145deg, #9A3412, #F97316, #FDBA74)',
  pillGradient: 'linear-gradient(135deg, #F97316, #FB923C)',
};

const topics = [
  {
    id: 'suku-kata-tertutup',
    pill: 'TOPIK 6.1',
    title: 'Suku Kata Tertutup (KVK)',
    desc: 'Membaca dan menulis suku kata tertutup dalam Jawi.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill="#FFFDF8" stroke="rgba(249,115,22,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#F97316" />
        <rect x="12" y="24" width="76" height="12" fill="#F97316" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">TOPIK 6.1</text>
        <text x="34" y="56" textAnchor="middle" fontFamily={ARABIC_FONT} fontSize="20" fontWeight="700" fill="#9A3412">باب</text>
        <text x="66" y="56" textAnchor="middle" fontFamily={ARABIC_FONT} fontSize="20" fontWeight="700" fill="#9A3412">كاس</text>
        <rect x="24" y="64" width="52" height="10" rx="5" fill="#F97316" opacity=".15" />
        <text x="50" y="72" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="6.5" fontWeight="700" fill="#9A3412">KVK</text>
        <circle cx="34" cy="78" r="1.3" fill="#F97316" opacity=".5" />
        <circle cx="66" cy="78" r="1.3" fill="#F97316" opacity=".5" />
      </svg>
    ),
  },
  {
    id: 'rangkai-kata-jawi',
    pill: 'TOPIK 6.2',
    title: 'Rangkai Kata Jawi',
    desc: 'Membina dan menulis rangkai kata Jawi. Contoh: Pasu bunga, Kasut sekolah.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="10" y="14" width="80" height="72" rx="12" fill="#FFFDF8" stroke="rgba(249,115,22,0.35)" strokeWidth="2" />
        <rect x="10" y="14" width="80" height="16" rx="12" fill="#F97316" />
        <rect x="10" y="20" width="80" height="10" fill="#F97316" />
        <text x="50" y="26" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">TOPIK 6.2</text>
        <text x="30" y="48" textAnchor="middle" fontFamily={ARABIC_FONT} fontSize="14" fontWeight="700" fill="#9A3412">ڤاسو بوڠا</text>
        <text x="65" y="66" textAnchor="middle" fontFamily={ARABIC_FONT} fontSize="12" fontWeight="600" fill="#C2410C">كاسوت سكوله</text>
        <rect x="20" y="74" width="60" height="8" rx="4" fill="#F97316" opacity=".12" />
        <text x="50" y="80" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="5.5" fontWeight="700" fill="#9A3412">RANGKAI KATA</text>
        <circle cx="26" cy="82" r="1.3" fill="#F97316" opacity=".5" />
        <circle cx="50" cy="82" r="1.3" fill="#F97316" opacity=".5" />
        <circle cx="74" cy="82" r="1.3" fill="#F97316" opacity=".5" />
      </svg>
    ),
  },
  {
    id: 'jawi-ayat-pendek',
    pill: 'TOPIK 6.3',
    title: 'Tahap 3 (Ayat Pendek)',
    desc: 'Gabungan perkataan (Contoh: Buku Baru)',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="10" y="14" width="80" height="72" rx="12" fill="#FFFDF8" stroke="rgba(249,115,22,0.35)" strokeWidth="2" />
        <rect x="10" y="14" width="80" height="16" rx="12" fill="#F97316" />
        <rect x="10" y="20" width="80" height="10" fill="#F97316" />
        <text x="50" y="26" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">TOPIK 6.3</text>
        <text x="35" y="48" textAnchor="middle" fontFamily={ARABIC_FONT} fontSize="14" fontWeight="700" fill="#9A3412">بوكو</text>
        <text x="65" y="48" textAnchor="middle" fontFamily={ARABIC_FONT} fontSize="14" fontWeight="700" fill="#9A3412">بارو</text>
        <rect x="20" y="58" width="60" height="10" rx="5" fill="#F97316" opacity=".12" />
        <text x="50" y="66" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="6.5" fontWeight="700" fill="#9A3412">Buku Baru</text>
        <circle cx="34" cy="78" r="1.3" fill="#F97316" opacity=".5" />
        <circle cx="66" cy="78" r="1.3" fill="#F97316" opacity=".5" />
      </svg>
    ),
  },
];

export default function JawiModule({ onBack, onSelectTopic, language = 'bm' }) {
  return (
    <Tahun1ModuleHubLayout
      theme={THEME}
      moduleNum={6}
      moduleName="Celik Jawi"
      moduleNameEn="Jawi Literacy"
      topics={topics}
      onBack={onBack}
      onSelectTopic={onSelectTopic}
      language={language}
    />
  );
}
