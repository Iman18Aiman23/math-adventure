import React from 'react';
import Tahun1LessonScrollLayout from '../../Tahun1/Tahun1LessonScrollLayout';
import { shuffle } from '../../_shared/utils';

const THEME = {
  pageGradient: 'radial-gradient(ellipse at top,#FEF2F2 0%,#FECACA 60%,#EF4444 100%)',
  dark: '#991B1B',
  accent: '#EF4444',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#FEE2E2 0%,#FCA5A5 55%,#EF4444 100%)',
  pillGradient: 'linear-gradient(180deg,#F87171,#DC2626)',
};

const TOPICS = [
  {
    visual: <span style={{ fontSize: '3rem', lineHeight: 1 }}>⚠️</span>,
    title: 'Maksud Syirik',
    sublabel: 'Dosa besar',
    desc: 'Syirik bermaksud menyekutukan Allah dengan sesuatu yang lain — sama ada dalam ibadah, keyakinan, atau perbuatan.',
  },
  {
    visual: <span style={{ fontSize: '3rem', lineHeight: 1 }}>🔍</span>,
    title: 'Jenis Syirik',
    sublabel: 'Besar & kecil',
    desc: 'Syirik Besar — menyembah selain Allah. Syirik Kecil — riya\' (menunjuk-nunjuk) dan bergantung pada tangkal.',
  },
  {
    visual: <span style={{ fontSize: '3rem', lineHeight: 1 }}>🚫</span>,
    title: 'Contoh Syirik',
    sublabel: 'Perbuatan tercela',
    desc: 'Menyembah patung atau berhala, riya\' dalam ibadah, percaya pada tangkal atau azimat, dan meramal nasib.',
  },
  {
    visual: <span style={{ fontSize: '3rem', lineHeight: 1 }}>🔥</span>,
    title: 'Kesan Syirik',
    sublabel: 'Akibat dosa',
    desc: 'Syirik adalah dosa besar yang tidak akan diampuni Allah jika tidak bertaubat. Pelaku syirik akan kekal dalam neraka.',
  },
];

const QUESTIONS = shuffle([
  { question: 'Apakah maksud syirik?', answer: 'Menyekutukan Allah', options: ['Menyekutukan Allah', 'Mengingati Allah', 'Bersyukur kepada Allah', 'Beriman kepada Allah'] },
  { question: 'Syirik besar bermaksud?', answer: 'Menyembah selain Allah', options: ['Menyembah selain Allah', 'Menunjuk-nunjuk ibadah', 'Bercakap bohong', 'Meninggalkan solat'] },
  { question: 'Apakah contoh syirik kecil?', answer: 'Riya\' (menunjuk-nunjuk)', options: ['Riya\' (menunjuk-nunjuk)', 'Menyembah berhala', 'Membunuh', 'Mencuri'] },
  { question: 'Syirik adalah dosa yang ___ jika tidak bertaubat.', answer: 'Tidak diampuni Allah', options: ['Tidak diampuni Allah', 'Kecil dan mudah', 'Diampuni Allah pasti', 'Tidak perlu taubat'] },
  { question: 'Yang manakah contoh syirik?', answer: 'Bergantung pada tangkal', options: ['Bergantung pada tangkal', 'Bersedekah', 'Berpuasa', 'Membaca al-Quran'] },
  { question: 'Orang yang melakukan syirik besar dan tidak bertaubat akan?', answer: 'Kekal dalam neraka', options: ['Kekal dalam neraka', 'Masuk syurga', 'Dapat ampunan pasti', 'Menjadi malaikat'] },
  { question: 'Apakah yang dimaksudkan dengan riya\'?', answer: 'Menunjuk-nunjuk ibadah', options: ['Menunjuk-nunjuk ibadah', 'Bersedekah diam-diam', 'Beribadah ikhlas', 'Belajar agama'] },
  { question: 'Bagaimana cara menjauhi syirik?', answer: 'Ikhlas beribadah hanya kepada Allah', options: ['Ikhlas beribadah hanya kepada Allah', 'Banyak tidur', 'Malas beribadah', 'Ikut hawa nafsu'] },
  { question: 'Hukum syirik dalam Islam adalah?', answer: 'Dosa besar', options: ['Dosa besar', 'Dosa kecil', 'Harus', 'Sunat'] },
  { question: 'Allah berfirman tentang syirik dalam Surah?', answer: 'Surah An-Nisa\' ayat 48', options: ['Surah An-Nisa\' ayat 48', 'Surah Al-Fatihah ayat 1', 'Surah Al-Ikhlas ayat 1', 'Surah An-Nas ayat 1'] },
]);

export default function Syirik({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Akidah › "
      breadcrumbActive={language === 'bm' ? 'Kesan Menyekutukan Allah (Syirik)' : 'Consequences of Shirk'}
      title={language === 'bm' ? 'Kesan Menyekutukan Allah (Syirik)' : 'Consequences of Shirk'}
      lead={language === 'bm'
        ? 'Syirik adalah dosa besar dalam Islam. Mari belajar maksud, jenis, contoh, dan kesan syirik.'
        : 'Shirk is a major sin in Islam. Let\'s learn the meaning, types, examples, and consequences of shirk.'}
      icon="⚠️"
      theme={THEME}
      topics={TOPICS}
      questions={QUESTIONS}
      totalRounds={8}
      accentColor="#EF4444"
    />
  );
}
