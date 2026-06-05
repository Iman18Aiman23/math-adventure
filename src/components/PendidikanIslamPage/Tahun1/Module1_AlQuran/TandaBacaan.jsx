import React from 'react';
import Tahun1LessonScrollLayout from '../Tahun1LessonScrollLayout';
import { shuffle } from '../../_shared/utils';
import { ARABIC_FONT, FATHAH, KASRAH, DAMMAH } from '../../_shared/arabic';

const THEME = {
  pageGradient: 'linear-gradient(180deg,#FFF7D6 0%,#FDD97A 50%,#D4960A 100%)',
  dark: '#92400E',
  accent: '#F59E0B',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#FFF7D6 0%,#FDD97A 55%,#D4960A 100%)',
  pillGradient: 'linear-gradient(180deg,#FDD97A,#F59E0B)',
};

const HARAKAT = [
  {
    id: 'fathah',
    name: 'Fathah',
    arabicName: 'فَتْحَة',
    symbol: 'ب' + FATHAH,
    position: 'Baris di atas huruf — bunyi "a"',
    desc: 'Seperti bunyi "a" dalam kata "ada"',
    color: '#92400E',
  },
  {
    id: 'kasrah',
    name: 'Kasrah',
    arabicName: 'كَسْرَة',
    symbol: 'ب' + KASRAH,
    position: 'Baris di bawah huruf — bunyi "i"',
    desc: 'Seperti bunyi "i" dalam kata "ibu"',
    color: '#1E40AF',
  },
  {
    id: 'dammah',
    name: 'Dammah',
    arabicName: 'ضَمَّة',
    symbol: 'ب' + DAMMAH,
    position: 'Baris di hadapan huruf — bunyi "u"',
    desc: 'Seperti bunyi "u" dalam kata "ular"',
    color: '#065F46',
  },
];

const TOPICS = HARAKAT.map(h => ({
  visual: (
    <span style={{ fontFamily: ARABIC_FONT, fontSize: '3.2rem', lineHeight: 1, color: h.color, direction: 'rtl' }}>
      {h.symbol}
    </span>
  ),
  title: h.name,
  sublabel: h.arabicName,
  desc: `${h.position}. ${h.desc}`,
}));

function buildQuestions() {
  const qs = [];
  HARAKAT.forEach(h => {
    qs.push({
      question: `Apakah nama baris pada huruf ${h.symbol}?`,
      answer: h.name,
      options: shuffle(HARAKAT.map(x => x.name)),
    });
  });
  const qa = [
    { q: 'Huruf yang manakah mempunyai baris di ATAS?', a: 'Fathah', d: ['Kasrah', 'Dammah'] },
    { q: 'Huruf yang manakah mempunyai baris di BAWAH?', a: 'Kasrah', d: ['Fathah', 'Dammah'] },
    { q: 'Bunyi apakah yang dihasilkan oleh baris Fathah?', a: '"a"', d: ['"i"', '"u"'] },
    { q: 'Bunyi apakah yang dihasilkan oleh baris Kasrah?', a: '"i"', d: ['"a"', '"u"'] },
    { q: 'Bunyi apakah yang dihasilkan oleh baris Dammah?', a: '"u"', d: ['"a"', '"i"'] },
  ];
  qa.forEach(({ q, a, d }) => {
    qs.push({ question: q, answer: a, options: shuffle([a, ...d]) });
  });
  return qs;
}

export default function TandaBacaan({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Al-Quran & Tajwid › "
      breadcrumbActive={language === 'bm' ? 'Tanda Bacaan Asas' : 'Basic Diacritical Marks'}
      title={language === 'bm' ? 'Tanda Bacaan Asas' : 'Basic Diacritical Marks'}
      lead={language === 'bm'
        ? 'Mari belajar 3 tanda bacaan asas dalam Al-Quran — Fathah, Kasrah dan Dammah.'
        : 'Learn the 3 basic diacritical marks in the Quran — Fathah, Kasrah and Dammah.'}
      icon="📖"
      theme={THEME}
      topics={TOPICS}
      questions={buildQuestions()}
      totalRounds={10}
      accentColor="#F59E0B"
    />
  );
}
