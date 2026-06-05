import React from 'react';
import Tahun1LessonScrollLayout from '../../Tahun1/Tahun1LessonScrollLayout';
import { shuffle } from '../../_shared/utils';

const THEME = {
  pageGradient: 'radial-gradient(ellipse at top,#EFF6FF 0%,#BFDBFE 60%,#3B82F6 100%)',
  dark: '#1E40AF',
  accent: '#3B82F6',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#DBEAFE 0%,#93C5FD 55%,#3B82F6 100%)',
  pillGradient: 'linear-gradient(180deg,#60A5FA,#2563EB)',
};

const RUKUN_FILI = [
  { n: 1, name: 'Berdiri tegak (mampu)', desc: 'Berdiri dengan sempurna bagi yang berkemampuan.' },
  { n: 2, name: 'Rukuk dengan tumaninah', desc: 'Membongkok dengan tenang dan sempurna.' },
  { n: 3, name: 'Iktidal dengan tumaninah', desc: 'Bangun dari rukuk dengan tenang.' },
  { n: 4, name: 'Sujud dengan tumaninah', desc: 'Sujud dengan dahi ke lantai dalam keadaan tenang.' },
  { n: 5, name: 'Duduk antara dua sujud', desc: 'Duduk sebentar antara dua sujud dengan tenang.' },
  { n: 6, name: 'Duduk tasyahhud akhir', desc: 'Duduk untuk membaca tasyahhud (tahiyat) akhir.' },
  { n: 7, name: 'Tertib', desc: 'Melakukan semua rukun secara berurutan.' },
];

const RUKUN_QOULI = [
  { n: 8, name: 'Niat', desc: 'Berniat dalam hati untuk melaksanakan solat tertentu.' },
  { n: 9, name: 'Takbiratul Ihram', desc: 'Mengucapkan "Allahu Akbar" pada permulaan solat.' },
  { n: 10, name: 'Membaca Al-Fatihah', desc: 'Membaca surah Al-Fatihah pada setiap rakaat.' },
  { n: 11, name: 'Tasyahhud akhir', desc: 'Membaca tahiyat akhir.' },
  { n: 12, name: 'Selawat ke atas Nabi', desc: 'Membaca selawat ke atas Nabi Muhammad SAW.' },
  { n: 13, name: 'Salam', desc: 'Memberi salam ke kanan dan ke kiri.' },
];

const TOPICS_FILI = RUKUN_FILI.map(r => ({
  visual: <span style={{ fontSize: '2.4rem', lineHeight: 1 }}>🕌</span>,
  title: r.name,
  sublabel: `Rukun Fi'li #${r.n}`,
  desc: r.desc,
}));

const TOPICS_QOULI = RUKUN_QOULI.map(r => ({
  visual: <span style={{ fontSize: '2.4rem', lineHeight: 1 }}>📖</span>,
  title: r.name,
  sublabel: `Rukun Qouli #${r.n}`,
  desc: r.desc,
}));

const TOPICS = [...TOPICS_FILI, ...TOPICS_QOULI];

function buildQuestions() {
  const qs = [];
  const filiNames = RUKUN_FILI.map(r => r.name);
  const qouliNames = RUKUN_QOULI.map(r => r.name);

  RUKUN_FILI.slice(0, 4).forEach(r => {
    const wrong = shuffle(qouliNames).slice(0, 3);
    qs.push({ question: `"${r.name}" termasuk dalam Rukun jenis?`, answer: "Fi'li (Perbuatan)", options: shuffle(["Fi'li (Perbuatan)", 'Qouli (Bacaan)', ...wrong]) });
  });

  RUKUN_QOULI.slice(0, 4).forEach(r => {
    const wrong = shuffle(filiNames).slice(0, 3);
    qs.push({ question: `"${r.name}" termasuk dalam Rukun jenis?`, answer: 'Qouli (Bacaan)', options: shuffle(['Qouli (Bacaan)', "Fi'li (Perbuatan)", ...wrong]) });
  });

  qs.push({ question: 'Berapakah jumlah Rukun Solat keseluruhannya?', answer: '13', options: ['10', '12', '13', '15'] });
  qs.push({ question: 'Berapakah bilangan Rukun Fi\'li?', answer: '7', options: ['5', '6', '7', '8'] });
  qs.push({ question: 'Berapakah bilangan Rukun Qouli?', answer: '6', options: ['4', '5', '6', '7'] });
  qs.push({ question: 'Antara berikut, yang manakah RUKUN QOULI?', answer: 'Niat', options: shuffle(['Niat', 'Rukuk', 'Sujud', 'Iktidal']) });
  qs.push({ question: 'Antara berikut, yang manakah RUKUN FILI?', answer: 'Sujud dengan tumaninah', options: shuffle(['Sujud dengan tumaninah', 'Selawat ke atas Nabi', 'Niat', 'Salam']) });

  return shuffle(qs);
}

const QUESTIONS = buildQuestions();

export default function RukunSolat({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Ibadah › "
      breadcrumbActive={language === 'bm' ? 'Rukun Solat' : 'Pillars of Prayer'}
      title={language === 'bm' ? 'Rukun Solat' : 'Pillars of Prayer'}
      lead={language === 'bm'
        ? 'Mari belajar 13 rukun solat — terbahagi kepada Fi\'li (perbuatan) dan Qouli (bacaan).'
        : 'Let\'s learn the 13 pillars of prayer — divided into Fi\'li (actions) and Qouli (recitations).'}
      icon="🕌"
      theme={THEME}
      topics={TOPICS}
      questions={QUESTIONS}
      totalRounds={10}
      accentColor="#3B82F6"
    />
  );
}
