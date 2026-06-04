import React from 'react';
import Tahun1LessonScrollLayout from '../Tahun1LessonScrollLayout';
import { shuffle } from '../../_shared/utils';

const JENIS_AIR = [
  {
    icon: '✅', title: 'Air Mutlak', verdict: 'BOLEH bersuci',
    desc: 'Air semula jadi yang belum tercemar. Boleh digunakan untuk wuduk, mandi wajib, dan istinja\'.',
    examples: ['🌧️ Hujan', '🏞️ Sungai', '🚰 Paip', '🌊 Laut', '🧊 Salji', '🪨 Perigi'],
  },
  {
    icon: '⚠️', title: "Air Musta'mal", verdict: 'TIDAK BOLEH bersuci lagi',
    desc: "Air yang sudah digunakan untuk bersuci. Air ini masih suci tetapi tidak boleh digunakan lagi untuk wuduk atau mandi wajib.",
    examples: ['🪣 Bekas wuduk', '🛁 Bekas mandi'],
  },
  {
    icon: '❌', title: 'Air Najis', verdict: 'HARAM untuk bersuci',
    desc: 'Air yang telah bercampur dengan najis (kotoran). Tidak boleh digunakan untuk bersuci langsung.',
    examples: ['🚫 Air kencing', '🚫 Air campur najis'],
  },
];

const QUESTIONS = shuffle([
  { question: 'Air hujan adalah jenis apa?', answer: 'Air mutlak', options: ['Air mutlak', "Air musta'mal", 'Air najis', 'Air kotor'] },
  { question: 'Air mutlak boleh digunakan untuk?', answer: 'Wuduk', options: ['Wuduk', 'Memasak sahaja', 'Minum sahaja', 'Menyiram pokok'] },
  { question: 'Air bekas wuduk dipanggil?', answer: "Air musta'mal", options: ['Air mutlak', "Air musta'mal", 'Air najis', 'Air bersih'] },
  { question: "Boleh wuduk guna air musta'mal?", answer: 'Tidak boleh', options: ['Boleh', 'Tidak boleh', 'Kadang-kadang', 'Terpulang'] },
  { question: 'Air laut termasuk jenis?', answer: 'Air mutlak', options: ['Air mutlak', "Air musta'mal", 'Air najis', 'Air masin'] },
  { question: 'Air kencing adalah jenis apa?', answer: 'Air najis', options: ['Air mutlak', "Air musta'mal", 'Air najis', 'Air kotor'] },
  { question: 'Berapa jenis air dalam Islam?', answer: '3 jenis', options: ['2 jenis', '3 jenis', '4 jenis', '5 jenis'] },
  { question: 'Air paip dari rumah termasuk?', answer: 'Air mutlak', options: ['Air mutlak', "Air musta'mal", 'Air najis', 'Air biasa'] },
  { question: 'Air salji adalah jenis apa?', answer: 'Air mutlak', options: ['Air mutlak', "Air musta'mal", 'Air najis', 'Air beku'] },
  { question: 'Air mutlak bermaksud?', answer: 'Suci dan menyucikan', options: ['Suci dan menyucikan', 'Kotor', 'Sudah digunakan', 'Bercampur najis'] },
]);

const TOTAL_ROUNDS = 10;

const THEME = {
  pageGradient: 'linear-gradient(180deg,#D0F7FA 0%,#67D6E8 50%,#3BC4D8 100%)',
  dark: '#0C4A6E',
  accent: '#0891B2',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#D0F7FA 0%,#67D6E8 55%,#0891B2 100%)',
  pillGradient: 'linear-gradient(180deg,#67D6E8,#0891B2)',
};

export default function AirMutlak({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Ibadah › "
      breadcrumbActive={language === 'bm' ? 'Air Mutlak' : 'Pure Water'}
      title={language === 'bm' ? 'Jenis-jenis Air dalam Islam' : 'Types of Water in Islam'}
      lead={language === 'bm'
        ? 'Tahukah kamu ada 3 jenis air dalam Islam? Mari belajar mana yang boleh dan tidak boleh digunakan untuk bersuci.'
        : 'Did you know there are 3 types of water in Islam? Learn which can and cannot be used for purification.'}
      icon="🌊"
      theme={THEME}
      topics={JENIS_AIR.map(j => ({
        visual: <span style={{ fontSize: '3.2rem', lineHeight: 1 }}>{j.icon}</span>,
        title: j.title,
        sublabel: j.verdict,
        desc: `${j.desc} Contoh: ${j.examples.join(' ')}`,
      }))}
      questions={QUESTIONS}
      totalRounds={TOTAL_ROUNDS}
      accentColor="#0891B2"
    />
  );
}
