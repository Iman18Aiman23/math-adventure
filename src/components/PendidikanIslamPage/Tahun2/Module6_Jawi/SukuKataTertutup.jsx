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

const groups = [
  {
    id: 'alif',
    label: 'Alif (ا)',
    items: [
      { jawi: 'باب', rumi: 'bap' },
      { jawi: 'باج', rumi: 'baj' },
      { jawi: 'كاس', rumi: 'kas' },
      { jawi: 'ماس', rumi: 'mas' },
    ],
  },
  {
    id: 'wau',
    label: 'Wau (و)',
    items: [
      { jawi: 'بوك', rumi: 'buk' },
      { jawi: 'توت', rumi: 'tut' },
      { jawi: 'دود', rumi: 'dud' },
      { jawi: 'سوس', rumi: 'sus' },
    ],
  },
  {
    id: 'ya',
    label: 'Ya (ي)',
    items: [
      { jawi: 'تيت', rumi: 'tit' },
      { jawi: 'ديد', rumi: 'did' },
      { jawi: 'سيس', rumi: 'sis' },
      { jawi: 'ليل', rumi: 'lil' },
    ],
  },
];

function renderJawiItems(items) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <span style={{ fontFamily: ARABIC_FONT, fontSize: '1.8rem', lineHeight: 1.2, color: '#9A3412', direction: 'rtl' }}>{item.jawi}</span>
          <span style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 600, fontSize: '0.75rem', color: '#9A3412', opacity: 0.8 }}>{item.rumi}</span>
        </div>
      ))}
    </div>
  );
}

const TOPICS = [
  { visual: renderJawiItems(groups[0].items), title: `Suku Kata Tertutup ${groups[0].label}`, sublabel: 'Vokal alif (ا)', desc: 'Suku kata tertutup KVK dengan vokal alif (ا). Bunyi "a" diikuti konsonan penutup.' },
  { visual: renderJawiItems(groups[1].items), title: `Suku Kata Tertutup ${groups[1].label}`, sublabel: 'Vokal wau (و)', desc: 'Suku kata tertutup KVK dengan vokal wau (و). Bunyi "u" diikuti konsonan penutup.' },
  { visual: renderJawiItems(groups[2].items), title: `Suku Kata Tertutup ${groups[2].label}`, sublabel: 'Vokal ya (ي)', desc: 'Suku kata tertutup KVK dengan vokal ya (ي). Bunyi "i" diikuti konsonan penutup.' },
];

function buildQuizPool() {
  const pool = [];
  const allItems = groups.flatMap(g => g.items);
  allItems.forEach(item => {
    const wrongOptions = shuffle(allItems.filter(i => i.jawi !== item.jawi)).slice(0, 3).map(i => i.jawi);
    pool.push({
      question: `Pilih tulisan Jawi yang betul untuk: "${item.rumi}"`,
      options: shuffle([item.jawi, ...wrongOptions]),
      answer: item.jawi,
    });
    const wrongRumi = shuffle(allItems.filter(i => i.rumi !== item.rumi)).slice(0, 3).map(i => i.rumi);
    pool.push({
      question: `Apakah bacaan rumi bagi: "${item.jawi}"`,
      options: shuffle([item.rumi, ...wrongRumi]),
      answer: item.rumi,
    });
  });
  return pool;
}

const quizPool = shuffle(buildQuizPool());

export default function SukuKataTertutup({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Celik Jawi › "
      breadcrumbActive="Suku Kata Tertutup (KVK)"
      title="Suku Kata Tertutup (KVK)"
      lead={language === 'bm'
        ? 'Mari belajar suku kata tertutup KVK dalam tulisan Jawi yang diakhiri konsonan.'
        : 'Let\'s learn closed syllables (KVK) in Jawi script ending with a consonant.'}
      icon="✏️"
      theme={THEME}
      topics={TOPICS}
      questions={quizPool.slice(0, 12)}
      totalRounds={10}
      accentColor="#F97316"
    />
  );
}
