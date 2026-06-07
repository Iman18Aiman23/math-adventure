import React from 'react';
import Tahun1LessonScrollLayout from '../Tahun1LessonScrollLayout';
import { shuffle } from '../../_shared/utils';

const THEME = {
  pageGradient: 'linear-gradient(180deg, #FFF1F2 0%, #FFE4E6 40%, #FFF5F6 100%)',
  dark: '#9F1239',
  accent: '#F43F5E',
  stageGradient: 'linear-gradient(145deg, #BE185D, #FF8CBF, #FBCFE8)',
  pillGradient: 'linear-gradient(135deg, #FF8CBF, #FDA4AF)',
};

function SvgBasuhTangan() {
  return (
    <svg viewBox="0 0 100 100" fill="none">
      <ellipse cx="50" cy="90" rx="24" ry="4" fill="rgba(168,43,94,.16)"/>
      <g className="floatA">
        <path d="M30 30 H58 V38 H46 V46" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="26" y="26" width="10" height="9" rx="2.5" fill="#fff"/>
        <path d="M34 64 Q34 54 42 54 H58 Q66 54 66 64 Q66 74 50 76 Q34 74 34 64 Z" fill="#FFE3EF" stroke="#fff" strokeWidth="2"/>
        <path d="M50 56 V70" stroke="#F58FB6" strokeWidth="1.6" strokeLinecap="round"/>
      </g>
      <g fill="#fff" className="pulse">
        <path d="M46 48 q3 4 0 7 q-3 -3 0 -7z"/>
        <path d="M53 50 q2.4 3.4 0 6 q-2.4 -2.6 0 -6z"/>
      </g>
      <circle cx="40" cy="78" r="2.4" fill="#fff" className="pulse"/>
      <circle cx="60" cy="80" r="2" fill="#fff" className="pulse"/>
    </svg>
  );
}

function SvgBacaDoa() {
  return (
    <svg viewBox="0 0 100 100" fill="none">
      <ellipse cx="50" cy="90" rx="24" ry="4" fill="rgba(168,43,94,.16)"/>
      <circle cx="50" cy="40" r="20" fill="#fff" opacity=".35" className="pulse"/>
      <g className="floatA">
        <path d="M50 24 l2.4 6.5 6.5 2.4 -6.5 2.4 -2.4 6.5 -2.4 -6.5 -6.5 -2.4 6.5 -2.4z" fill="#FFF1A8" stroke="#fff" strokeWidth="1"/>
        <path d="M28 60 Q34 52 42 56 Q50 50 58 56 Q66 52 72 60 Q66 78 50 80 Q34 78 28 60 Z" fill="#FFE3EF" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M50 56 V78" stroke="#F58FB6" strokeWidth="1.6" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

function SvgTanganKanan() {
  return (
    <svg viewBox="0 0 100 100" fill="none">
      <ellipse cx="50" cy="90" rx="24" ry="4" fill="rgba(168,43,94,.16)"/>
      <g className="floatA">
        <path d="M38 56 Q38 44 50 44 Q62 44 62 56 L62 70 Q62 80 50 80 Q38 80 38 70 Z" fill="#FFE3EF" stroke="#fff" strokeWidth="2"/>
        <g stroke="#fff" strokeWidth="5" strokeLinecap="round">
          <line x1="42" y1="48" x2="42" y2="38"/>
          <line x1="50" y1="46" x2="50" y2="34"/>
          <line x1="58" y1="48" x2="58" y2="38"/>
        </g>
        <path d="M38 60 Q30 58 30 66" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <circle cx="50" cy="66" r="6" fill="#FFF1A8" stroke="#fff" strokeWidth="1.5"/>
      </g>
      <circle cx="68" cy="34" r="9" fill="#2E9C57"/>
      <path d="M64 34 l3 3 5.5 -6" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SvgDudukSopan() {
  return (
    <svg viewBox="0 0 100 100" fill="none">
      <ellipse cx="50" cy="90" rx="24" ry="4" fill="rgba(168,43,94,.16)"/>
      <g className="floatA">
        <circle cx="50" cy="34" r="9" fill="#fff"/>
        <path d="M40 48 Q50 42 60 48 L58 66 L42 66 Z" fill="#FFE3EF" stroke="#fff" strokeWidth="2"/>
        <path d="M34 70 Q50 60 66 70 Q60 78 50 76 Q40 78 34 70 Z" fill="#fff"/>
        <circle cx="44" cy="64" r="3" fill="#F58FB6"/>
        <circle cx="56" cy="64" r="3" fill="#F58FB6"/>
      </g>
    </svg>
  );
}

function SvgTidakMembazir() {
  return (
    <svg viewBox="0 0 100 100" fill="none">
      <ellipse cx="50" cy="90" rx="24" ry="4" fill="rgba(168,43,94,.16)"/>
      <g className="floatA">
        <ellipse cx="50" cy="58" rx="28" ry="10" fill="#fff"/>
        <ellipse cx="50" cy="56" rx="20" ry="7" fill="#FFE3EF"/>
        <path d="M50 50 l1.6 4 4 1.6 -4 1.6 -1.6 4 -1.6 -4 -4 -1.6 4 -1.6z" fill="#FFF1A8" className="pulse"/>
      </g>
      <circle cx="68" cy="38" r="10" fill="#2E9C57"/>
      <path d="M63 38 l3.4 3.4 6 -7" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SvgBerkongsiRezeki() {
  return (
    <svg viewBox="0 0 100 100" fill="none">
      <ellipse cx="50" cy="90" rx="24" ry="4" fill="rgba(168,43,94,.16)"/>
      <g className="floatA">
        <path d="M30 54 H70 Q66 72 50 72 Q34 72 30 54 Z" fill="#fff" stroke="#F58FB6" strokeWidth="1.5"/>
        <ellipse cx="50" cy="54" rx="20" ry="5" fill="#FFE3EF"/>
        <path d="M22 60 Q26 54 32 56 L34 62" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M78 60 Q74 54 68 56 L66 62" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M50 30 C47 26 41 27 41 32 C41 37 50 42 50 42 C50 42 59 37 59 32 C59 27 53 26 50 30 Z" fill="#FFF1A8" stroke="#fff" strokeWidth="1.2"/>
      </g>
    </svg>
  );
}

const TOPICS = [
  {
    visual: <SvgBasuhTangan />,
    sublabel: 'Sebelum & Selepas',
    title: 'Basuh Tangan',
    desc: 'Basuh tangan dengan air bersih sebelum dan selepas makan. Ini menjaga kebersihan dan kesihatan kita.',
  },
  {
    visual: <SvgBacaDoa />,
    sublabel: 'Sebelum & Selepas',
    title: 'Baca Doa',
    desc: 'Baca "Bismillah" sebelum makan dan "Alhamdulillah" selepas makan. Makan yang berkat dimulakan dengan doa.',
  },
  {
    visual: <SvgTanganKanan />,
    sublabel: 'Sunnah Rasulullah ﷺ',
    title: 'Makan Dengan Tangan Kanan',
    desc: 'Gunakan tangan kanan ketika makan dan minum kerana ia adab yang diajar oleh Rasulullah ﷺ.',
  },
  {
    visual: <SvgDudukSopan />,
    sublabel: 'Adab Ketika Makan',
    title: 'Duduk Dengan Sopan',
    desc: 'Duduk dengan tertib dan sopan ketika makan supaya menunjukkan akhlak yang baik.',
  },
  {
    visual: <SvgTidakMembazir />,
    sublabel: 'Ambil Sekadar Perlu',
    title: 'Tidak Membazir',
    desc: 'Ambil makanan mengikut keperluan dan habiskan makanan yang diambil.',
  },
  {
    visual: <SvgBerkongsiRezeki />,
    sublabel: 'Sikap Mulia',
    title: 'Berkongsi Rezeki',
    desc: 'Berkongsi makanan dengan keluarga dan rakan dapat mengeratkan hubungan serta mendapat pahala.',
  },
];

const QUESTIONS = shuffle([
  { question: 'Apa yang kita baca sebelum makan?', answer: 'Bismillah', options: ['Bismillah', 'Alhamdulillah', 'Subhanallah', 'Allahuakbar'] },
  { question: 'Tangan mana untuk makan?', answer: 'Tangan kanan', options: ['Tangan kanan', 'Tangan kiri', 'Dua-dua', 'Mana-mana'] },
  { question: 'Bila kita basuh tangan?', answer: 'Sebelum & selepas makan', options: ['Sebelum & selepas makan', 'Sebelum sahaja', 'Selepas sahaja', 'Tak perlu basuh'] },
  { question: 'Apa yang kita baca selepas makan?', answer: 'Alhamdulillah', options: ['Alhamdulillah', 'Bismillah', 'Astaghfirullah', 'Laa ilaha illallah'] },
  { question: 'Minum sebaiknya secara?', answer: 'Duduk', options: ['Duduk', 'Berdiri', 'Berjalan', 'Berlari'] },
  { question: 'Perbuatan membazir makanan adalah?', answer: 'Tidak baik', options: ['Tidak baik', 'Bagus', 'Biasa', 'Tak apa'] },
  { question: 'Nabi mengajar kita makan dengan?', answer: 'Tangan kanan', options: ['Tangan kanan', 'Tangan kiri', 'Sudu', 'Garpu'] },
  { question: 'Kita patut mengambil makanan?', answer: 'Secukupnya', options: ['Secukupnya', 'Banyak-banyak', 'Sedikit sahaja', 'Mewah'] },
  { question: 'Apa sikap yang betul terhadap makanan?', answer: 'Tidak membazir', options: ['Tidak membazir', 'Membazir makanan', 'Ambil banyak-banyak', 'Buang makanan'] },
  { question: 'Berkongsi makanan dengan kawan adalah?', answer: 'Perbuatan mulia', options: ['Perbuatan mulia', 'Perbuatan sia-sia', 'Perbuatan buruk', 'Perbuatan dilarang'] },
]);

export default function AdabMakanMinum({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Modul 5 · Adab › "
      breadcrumbActive={language === 'bm' ? 'Adab Makan dan Minum' : 'Eating & Drinking Etiquette'}
      title={language === 'bm' ? 'Adab Makan dan Minum' : 'Eating & Drinking Etiquette'}
      lead={language === 'bm'
        ? 'Mari belajar adab makan dan minum yang diajar dalam Islam supaya kita sentiasa sihat, bersih dan mendapat keberkatan Allah.'
        : 'Let\'s learn the Islamic etiquette of eating and drinking so we stay healthy, clean, and blessed by Allah.'}
      icon="🍽️"
      theme={THEME}
      topics={TOPICS}
      questions={QUESTIONS}
      totalRounds={10}
      accentColor="#F43F5E"
    />
  );
}
