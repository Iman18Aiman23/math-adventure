import React from 'react';
import Tahun1LessonScrollLayout from '../../Tahun1/Tahun1LessonScrollLayout';
import { ARABIC_FONT } from '../../_shared/arabic';
import { shuffle } from '../../_shared/utils';

const THEME = {
  pageGradient: 'radial-gradient(ellipse at top,#FFF7ED 0%,#FED7AA 60%,#F97316 100%)',
  dark: '#9A3412',
  accent: '#F97316',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#FFF7ED 0%,#FDBA74 55%,#F97316 100%)',
  pillGradient: 'linear-gradient(180deg,#FB923C,#EA580C)',
};

const rangkaiKata = [
  { jawi: 'ڤاسو بوڠا', rumi: 'Pasu bunga', maksud: 'Flower vase' },
  { jawi: 'كاسوت سكوله', rumi: 'Kasut sekolah', maksud: 'School shoes' },
  { jawi: 'بوڠا راي', rumi: 'Bunga raya', maksud: 'Hibiscus' },
  { jawi: 'اير ماته', rumi: 'Air mata', maksud: 'Tears' },
  { jawi: 'اورڠ توا', rumi: 'Orang tua', maksud: 'Parents / elderly' },
  { jawi: 'تانه اير', rumi: 'Tanah air', maksud: 'Homeland' },
];

const TOPICS = rangkaiKata.map(item => ({
  visual: (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <span style={{ fontFamily: ARABIC_FONT, fontSize: '1.8rem', lineHeight: 1.2, color: '#9A3412', direction: 'rtl' }}>{item.jawi}</span>
    </div>
  ),
  title: item.rumi,
  sublabel: item.maksud,
  desc: `Tulisan Jawi untuk "${item.rumi}" yang bermaksud ${item.maksud}.`,
}));

function buildQuizPool() {
  const pool = [];
  rangkaiKata.forEach(item => {
    const wrongRumi = shuffle(rangkaiKata.filter(i => i.rumi !== item.rumi)).slice(0, 3).map(i => i.rumi);
    pool.push({
      question: `Apakah bacaan rumi bagi: "${item.jawi}"`,
      options: shuffle([item.rumi, ...wrongRumi]),
      answer: item.rumi,
    });
    const wrongJawi = shuffle(rangkaiKata.filter(i => i.jawi !== item.jawi)).slice(0, 3).map(i => i.jawi);
    pool.push({
      question: `Pilih tulisan Jawi yang betul untuk: "${item.rumi}"`,
      options: shuffle([item.jawi, ...wrongJawi]),
      answer: item.jawi,
    });
  });
  return pool;
}

const quizPool = shuffle(buildQuizPool());

export default function RangkaiKataJawi({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Celik Jawi › "
      breadcrumbActive="Rangkai Kata Jawi"
      title="Rangkai Kata Jawi"
      lead={language === 'bm'
        ? 'Mari belajar membaca rangkai kata dalam tulisan Jawi — gabungan dua perkataan.'
        : 'Let\'s learn to read word pairs in Jawi script — combinations of two words.'}
      icon="📝"
      theme={THEME}
      topics={TOPICS}
      questions={quizPool.slice(0, 10)}
      totalRounds={8}
      accentColor="#F97316"
    />
  );
}
