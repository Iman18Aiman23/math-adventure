import React from 'react';
import Tahun1LessonScrollLayout from '../../Tahun1/Tahun1LessonScrollLayout';
import { shuffle } from '../../_shared/utils';

const CONCEPTS = [
  { id: 'ain', type: 'Fardu Ain', icon: '👤', desc: 'Kewajipan individu yang wajib ditunaikan setiap orang Islam yang mukallaf.', descEn: 'Individual obligation that every Muslim must fulfill.', contoh: 'Solat 5 waktu, Puasa Ramadhan, Zakat', warna: '#1E40AF' },
  { id: 'kifayah', type: 'Fardu Kifayah', icon: '👥', desc: 'Kewajipan bersama yang gugur apabila sudah ada yang melakukannya.', descEn: 'Collective obligation dropped once some fulfill it.', contoh: 'Solat jenazah, Ilmu perubatan, Azan', warna: '#3B82F6' },
];

const EXAMPLES_AIN = [
  'Solat fardu 5 waktu', 'Puasa bulan Ramadhan', 'Membayar zakat', 'Mengerjakan haji (jika mampu)', 'Mengucap dua kalimah syahadah', 'Beriman kepada Allah',
];
const EXAMPLES_KIFAYAH = [
  'Solat jenazah', 'Mandi jenazah', 'Menguruskan jenazah', 'Ilmu kedoktoran', 'Jawatan mufti', 'Azan di kampung',
];

const TOTAL_ROUNDS = 10;

function buildQuestions() {
  const qs = CONCEPTS.map(c => {
    const wrong = shuffle(CONCEPTS.filter(x => x.id !== c.id)).slice(0, 3).map(x => x.type);
    return { question: `Apakah yang dimaksudkan dengan ${c.type}?`, answer: c.desc, options: shuffle([c.desc, ...wrong.map(w => CONCEPTS.find(x => x.type === w)?.desc || '')]) };
  });
  EXAMPLES_AIN.slice(0, 3).forEach(ex => {
    const wrong = shuffle(EXAMPLES_KIFAYAH).slice(0, 3);
    qs.push({ question: `Adakah "${ex}" termasuk Fardu Ain atau Fardu Kifayah?`, answer: 'Fardu Ain', options: shuffle(['Fardu Ain', 'Fardu Kifayah', 'Sunat', 'Harus']) });
  });
  EXAMPLES_KIFAYAH.slice(0, 3).forEach(ex => {
    qs.push({ question: `Adakah "${ex}" termasuk Fardu Ain atau Fardu Kifayah?`, answer: 'Fardu Kifayah', options: shuffle(['Fardu Ain', 'Fardu Kifayah', 'Sunat', 'Harus']) });
  });
  return qs;
}

const THEME = {
  pageGradient: 'radial-gradient(ellipse at top,#EFF6FF 0%,#DBEAFE 60%,#BFDBFE 100%)',
  dark: '#1E40AF',
  accent: '#3B82F6',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#DBEAFE 0%,#93C5FD 55%,#3B82F6 100%)',
  pillGradient: 'linear-gradient(180deg,#93C5FD,#3B82F6)',
};

export default function FarduAinKifayah({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Ibadah › "
      breadcrumbActive={language === 'bm' ? 'Fardu Ain vs Fardu Kifayah' : 'Fard Ain vs Fard Kifayah'}
      title={language === 'bm' ? 'Fardu Ain vs Fardu Kifayah' : 'Fard Ain vs Fard Kifayah'}
      lead={language === 'bm'
        ? 'Mari fahami perbezaan Fardu Ain (kewajipan individu) dan Fardu Kifayah (kewajipan bersama).'
        : 'Understand the difference between Fard Ain (individual obligation) and Fard Kifayah (collective obligation).'}
      icon="⚖️"
      theme={THEME}
      topics={CONCEPTS.map(c => ({
        visual: <span style={{ fontSize: '3rem', lineHeight: 1 }}>{c.icon}</span>,
        title: c.type,
        sublabel: '',
        desc: `${c.desc}\n📌 Contoh: ${c.contoh}`,
      }))}
      questions={buildQuestions()}
      totalRounds={TOTAL_ROUNDS}
      accentColor="#3B82F6"
    />
  );
}
