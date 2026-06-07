import React from 'react';
import Tahun1LessonScrollLayout from '../Tahun1LessonScrollLayout';
import { shuffle } from '../../_shared/utils';
import { ARABIC_FONT, FATHATAIN, KASRATAIN, DAMMATAIN } from '../../_shared/arabic';

const THEME = {
  pageGradient: 'radial-gradient(ellipse at top, #FFF7D6 0%, #FDD97A 55%, #F5CD6D 100%)',
  dark: '#92400E',
  accent: '#F59E0B',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#FFF7D6 0%,#FDD97A 55%,#D4960A 100%)',
  pillGradient: 'linear-gradient(180deg,#FDD97A,#F59E0B)',
};

const TANWIN = [
  {
    id: 'fathatain',
    name: 'Tanwin Fathah',
    arabicName: 'فَتْحَتَيْن',
    symbol: 'ب' + FATHATAIN,
    position: 'Dua baris di atas huruf — bunyi "an"',
    desc: 'Seperti baris Fathah dua kali',
    color: '#92400E',
  },
  {
    id: 'kasratain',
    name: 'Tanwin Kasrah',
    arabicName: 'كَسْرَتَيْن',
    symbol: 'ب' + KASRATAIN,
    position: 'Dua baris di bawah huruf — bunyi "in"',
    desc: 'Seperti baris Kasrah dua kali',
    color: '#1E40AF',
  },
  {
    id: 'dammatain',
    name: 'Tanwin Dammah',
    arabicName: 'ضَمَّتَيْن',
    symbol: 'ب' + DAMMATAIN,
    position: 'Dua baris di hadapan huruf — bunyi "un"',
    desc: 'Seperti baris Dammah dua kali',
    color: '#065F46',
  },
];

const TOPICS = TANWIN.map(t => ({
  visual: (
    <span style={{ fontFamily: ARABIC_FONT, fontSize: '3.2rem', lineHeight: 1, color: t.color, direction: 'rtl' }}>
      {t.symbol}
    </span>
  ),
  title: t.name,
  sublabel: t.arabicName,
  desc: `${t.position}. ${t.desc}.`,
}));

function buildQuestions() {
  const qs = [];

  TANWIN.forEach(t => {
    qs.push({
      question: `Apakah nama tanwin ini ${t.symbol}?`,
      answer: t.name,
      options: shuffle(TANWIN.map(x => x.name)),
    });
  });

  const pos = [
    { q: 'Tanwin berbaris dua ATAS', a: 'Tanwin Fathah', d: ['Tanwin Kasrah', 'Tanwin Dammah'] },
    { q: 'Tanwin berbaris dua BAWAH', a: 'Tanwin Kasrah', d: ['Tanwin Fathah', 'Tanwin Dammah'] },
    { q: 'Tanwin berbaris dua DEPAN', a: 'Tanwin Dammah', d: ['Tanwin Fathah', 'Tanwin Kasrah'] },
  ];
  pos.forEach(({ q, a, d }) => {
    qs.push({ question: q, answer: a, options: shuffle([a, ...d]) });
  });

  TANWIN.forEach(t => {
    const bunyi = { fathatain: '"an"', kasratain: '"in"', dammatain: '"un"' };
    qs.push({
      question: `Apakah bunyi huruf ini ${t.symbol}?`,
      answer: bunyi[t.id],
      options: shuffle(['"an"', '"in"', '"un"']),
    });
  });

  TANWIN.forEach(t => {
    const kedudukan = { fathatain: 'ATAS', kasratain: 'BAWAH', dammatain: 'DEPAN' };
    qs.push({
      question: `${t.symbol} berbaris di?`,
      answer: kedudukan[t.id],
      options: shuffle(['ATAS', 'BAWAH', 'DEPAN']),
    });
  });

  const namaLain = [
    { q: 'Nama lain Tanwin Fathah', a: 'Fathatain', d: ['Kasratain', 'Dammatain'] },
    { q: 'Nama lain Tanwin Kasrah', a: 'Kasratain', d: ['Fathatain', 'Dammatain'] },
    { q: 'Nama lain Tanwin Dammah', a: 'Dammatain', d: ['Fathatain', 'Kasratain'] },
  ];
  namaLain.forEach(({ q, a, d }) => {
    qs.push({ question: q, answer: a, options: shuffle([a, ...d]) });
  });

  return shuffle(qs);
}

export default function Tanwin({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Al-Quran & Tajwid › "
      breadcrumbActive={language === 'bm' ? 'Tanwin (Baris Dua)' : 'Tanwin (Double Marks)'}
      title={language === 'bm' ? 'Tanwin (Baris Dua)' : 'Tanwin (Double Marks)'}
      lead={language === 'bm'
        ? 'Mari belajar 3 jenis tanwin — baris dua yang mengubah bunyi huruf.'
        : 'Learn the 3 types of tanwin — double marks that change the letter sound.'}
      icon="📖"
      theme={THEME}
      topics={TOPICS}
      questions={buildQuestions()}
      totalRounds={10}
      accentColor="#F59E0B"
    />
  );
}
