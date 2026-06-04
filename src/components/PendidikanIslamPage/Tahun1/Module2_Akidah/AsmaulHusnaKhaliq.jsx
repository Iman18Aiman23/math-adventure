import React from 'react';
import Tahun1LessonScrollLayout from '../Tahun1LessonScrollLayout';
import { ARABIC_FONT } from '../../_shared/arabic';
import { shuffle } from '../../_shared/utils';

const CIPTAAN = [
  { icon: '🌍', name: 'Bumi & Langit', desc: 'Allah mencipta langit dan bumi beserta segala isinya.' },
  { icon: '🌟', name: 'Bintang & Bulan', desc: 'Allah mencipta matahari, bulan, dan bintang-bintang di langit.' },
  { icon: '🌊', name: 'Laut & Sungai', desc: 'Allah mencipta lautan, sungai, dan semua air di bumi.' },
  { icon: '👤', name: 'Manusia', desc: 'Allah mencipta manusia dari tanah dan meniupkan roh ke dalamnya.' },
  { icon: '🐘', name: 'Haiwan', desc: 'Allah mencipta pelbagai haiwan — dari semut kecil hingga gajah besar.' },
  { icon: '🌺', name: 'Tumbuhan', desc: 'Allah mencipta pokok, bunga, buah-buahan, dan semua tumbuhan.' },
];

const QUESTIONS = shuffle([
  {
    question: 'Apakah maksud nama Allah "Al-Khaliq"?',
    answer: 'Yang Maha Pencipta',
    options: ['Yang Maha Pencipta', 'Yang Maha Pemurah', 'Yang Maha Mengetahui', 'Yang Maha Pengasih'],
  },
  {
    question: 'Siapakah yang mencipta langit dan bumi?',
    answer: 'Allah',
    options: ['Allah', 'Malaikat', 'Manusia', 'Jin'],
  },
  {
    question: 'Al-Khaliq bermaksud Allah itu Maha ___.',
    answer: 'Pencipta',
    options: ['Pencipta', 'Pengampun', 'Pembalas', 'Penguasa'],
  },
  {
    question: 'Yang manakah BUKAN ciptaan Allah?',
    answer: 'Kereta buatan manusia',
    options: ['Kereta buatan manusia', 'Haiwan', 'Manusia', 'Bintang di langit'],
  },
  {
    question: 'Bagaimana Allah mencipta segala sesuatu?',
    answer: 'Dari tiada menjadi ada',
    options: ['Dari tiada menjadi ada', 'Dari air dan api', 'Dari logam dan kayu', 'Dari batu dan pasir'],
  },
  {
    question: '"الْخَالِقُ" dibaca sebagai?',
    answer: 'Al-Khaliq',
    options: ['Al-Khaliq', 'Al-Karim', 'Al-Hakim', 'Al-Rahim'],
  },
  {
    question: 'Manusia diciptakan Allah daripada apa?',
    answer: 'Tanah',
    options: ['Tanah', 'Air', 'Cahaya', 'Api'],
  },
  {
    question: 'Malaikat diciptakan Allah daripada apa?',
    answer: 'Cahaya',
    options: ['Cahaya', 'Tanah', 'Api', 'Angin'],
  },
  {
    question: 'Berapa bilangannya Asmaul Husna?',
    answer: '99',
    options: ['25', '66', '99', '114'],
  },
  {
    question: 'Asmaul Husna bermaksud?',
    answer: 'Nama-nama Allah yang indah',
    options: ['Nama-nama Allah yang indah', 'Sifat-sifat malaikat', 'Nama-nama Nabi', 'Ayat-ayat al-Quran'],
  },
]);

const TOTAL_ROUNDS = 10;

const THEME = {
  pageGradient: 'linear-gradient(180deg,#FFF7D6 0%,#FDD97A 50%,#F2C44D 100%)',
  dark: '#92400E',
  accent: '#F59E0B',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#FFF7D6 0%,#FDD97A 55%,#D4960A 100%)',
  pillGradient: 'linear-gradient(180deg,#FDD97A,#F59E0B)',
};

export default function AsmaulHusnaKhaliq({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Akidah › "
      breadcrumbActive={language === 'bm' ? 'Al-Khaliq' : 'Al-Khaliq'}
      title={language === 'bm' ? 'Asmaul Husna: Al-Khaliq' : 'Beautiful Names: Al-Khaliq'}
      lead={language === 'bm'
        ? 'Al-Khaliq — Yang Maha Pencipta. Allah menciptakan langit, bumi, dan segala isinya.'
        : 'Al-Khaliq — The Creator. Allah created the heavens, the earth, and everything in between.'}
      icon="✨"
      theme={THEME}
      topics={CIPTAAN.map(c => ({
        visual: <span style={{ fontSize: '3.2rem', lineHeight: 1 }}>{c.icon}</span>,
        title: c.name,
        sublabel: language === 'bm' ? 'Ciptaan Allah' : "Allah's Creation",
        desc: c.desc,
      }))}
      questions={QUESTIONS}
      totalRounds={TOTAL_ROUNDS}
      accentColor="#F59E0B"
    />
  );
}
