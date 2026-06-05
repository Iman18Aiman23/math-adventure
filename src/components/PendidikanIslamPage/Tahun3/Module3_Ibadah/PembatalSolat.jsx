import React from 'react';
import Tahun1LessonScrollLayout from '../../Tahun1/Tahun1LessonScrollLayout';
import { shuffle } from '../../_shared/utils';

const INVALIDATORS = [
  { id: 'hadas', icon: '💨', label: 'Berhadas', desc: 'Keluar angin atau hadas kecil/besar semasa solat.', descEn: 'Passing wind or having minor/major impurity during prayer.' },
  { id: 'batal-wuduk', icon: '🚰', label: 'Batal Wuduk', desc: 'Segala yang membatalkan wuduk turut membatalkan solat.', descEn: 'Anything that invalidates wudu also invalidates prayer.' },
  { id: 'bercakap', icon: '💬', label: 'Bercakap', desc: 'Bercakap dengan sengaja walaupun satu perkataan.', descEn: 'Speaking intentionally, even one word.' },
  { id: 'bergerak', icon: '🏃', label: 'Banyak Gerak', desc: 'Bergerak berturut-turut tiga kali di luar pergerakan solat.', descEn: 'Three consecutive movements outside prayer actions.' },
  { id: 'makan-minum', icon: '🍽️', label: 'Makan & Minum', desc: 'Makan atau minum dengan sengaja semasa solat.', descEn: 'Eating or drinking intentionally during prayer.' },
  { id: 'qiblat', icon: '🕋', label: 'Membelakangi Qiblat', desc: 'Berpaling atau membelakangi arah kiblat tanpa uzur.', descEn: 'Turning away from the qiblah without excuse.' },
  { id: 'niat', icon: '📝', label: 'Ubah Niat', desc: 'Mengubah niat atau ragu-ragu dalam solat.', descEn: 'Changing intention or doubting during prayer.' },
  { id: 'aurat', icon: '👕', label: 'Terdedah Aurat', desc: 'Anggota aurat terbuka tanpa segera ditutup.', descEn: 'Awrah exposed without immediate covering.' },
];

const TOTAL_ROUNDS = 10;

function buildQuestions() {
  const qs = INVALIDATORS.map(v => {
    const wrong = shuffle(INVALIDATORS.filter(x => x.id !== v.id)).slice(0, 3).map(x => x.label);
    return { question: `Apakah yang membatalkan solat jika dilakukan dengan sengaja?`, answer: v.label, options: shuffle([v.label, ...wrong]) };
  });
  qs.push({ question: 'Adakah ketawa membatalkan solat?', answer: 'Ya', options: shuffle(['Ya', 'Tidak', 'Bergantung situasi', 'Makruh sahaja']) });
  return qs;
}

const THEME = {
  pageGradient: 'radial-gradient(ellipse at top,#EFF6FF 0%,#DBEAFE 60%,#BFDBFE 100%)',
  dark: '#1E40AF',
  accent: '#3B82F6',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#DBEAFE 0%,#93C5FD 55%,#3B82F6 100%)',
  pillGradient: 'linear-gradient(180deg,#93C5FD,#3B82F6)',
};

export default function PembatalSolat({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Ibadah › "
      breadcrumbActive="Perkara Membatalkan Solat"
      title="Perkara Membatalkan Solat"
      lead={language === 'bm'
        ? 'Mari ketahui 8 perkara yang membatalkan solat supaya kita dapat menjaga solat dengan sempurna.'
        : 'Learn 8 things that invalidate prayer so we can perform it perfectly.'}
      icon="🚫"
      theme={THEME}
      topics={INVALIDATORS.map(v => ({
        visual: <span style={{ fontSize: '3rem', lineHeight: 1 }}>{v.icon}</span>,
        title: v.label,
        sublabel: '',
        desc: v.desc,
      }))}
      questions={buildQuestions()}
      totalRounds={TOTAL_ROUNDS}
      accentColor="#3B82F6"
    />
  );
}
