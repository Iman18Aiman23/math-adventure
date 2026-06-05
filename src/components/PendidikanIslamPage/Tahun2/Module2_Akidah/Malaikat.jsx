import React from 'react';
import Tahun1LessonScrollLayout from '../../Tahun1/Tahun1LessonScrollLayout';
import { ARABIC_FONT } from '../../_shared/arabic';
import { shuffle } from '../../_shared/utils';

const THEME = {
  pageGradient: 'radial-gradient(ellipse at top,#ECFDF5 0%,#A7F3D0 60%,#10B981 100%)',
  dark: '#065F46',
  accent: '#10B981',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#D1FAE5 0%,#6EE7B7 55%,#10B981 100%)',
  pillGradient: 'linear-gradient(180deg,#34D399,#059669)',
};

const MALAIKAT = [
  { n: 1, ar: 'جِبْرِيل', name: 'Jibril', icon: '📜', duty: 'Menyampaikan wahyu', dutyEn: 'Delivers revelation' },
  { n: 2, ar: 'مِيكَائِيل', name: 'Mikail', icon: '🌧️', duty: 'Membahagikan rezeki', dutyEn: 'Distributes sustenance' },
  { n: 3, ar: 'إِسْرَافِيل', name: 'Israfil', icon: '📯', duty: 'Meniup sangkakala', dutyEn: 'Blows the trumpet' },
  { n: 4, ar: 'عِزْرَائِيل', name: 'Izrail', icon: '🌙', duty: 'Mencabut nyawa', dutyEn: 'Takes souls' },
  { n: 5, ar: 'مُنكَر', name: 'Munkar', icon: '❓', duty: 'Menyoal di kubur', dutyEn: 'Questions in the grave' },
  { n: 6, ar: 'نَكِير', name: 'Nakir', icon: '❔', duty: 'Menyoal di kubur', dutyEn: 'Questions in the grave' },
  { n: 7, ar: 'رَقِيب', name: 'Raqib', icon: '✍️', duty: 'Mencatat amal baik', dutyEn: 'Records good deeds' },
  { n: 8, ar: 'عَتِيد', name: 'Atid', icon: '📝', duty: 'Mencatat amal buruk', dutyEn: 'Records bad deeds' },
  { n: 9, ar: 'مَالِك', name: 'Malik', icon: '🔥', duty: 'Menjaga neraka', dutyEn: 'Guards hell' },
  { n: 10, ar: 'رِضْوَان', name: 'Ridwan', icon: '🌿', duty: 'Menjaga syurga', dutyEn: 'Guards paradise' },
];

const TOPICS = MALAIKAT.map(m => ({
  visual: (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <span style={{ fontFamily: ARABIC_FONT, fontSize: '1.6rem', lineHeight: 1.2, color: '#065F46', direction: 'rtl' }}>{m.ar}</span>
      <span style={{ fontSize: '1.8rem', lineHeight: 1 }}>{m.icon}</span>
    </div>
  ),
  title: m.name,
  sublabel: `Malaikat ke-${m.n}`,
  desc: m.duty,
}));

const TOTAL_ROUNDS = 10;

function buildQuestions() {
  const qs = [];
  const names = MALAIKAT.map(m => m.name);
  const duties = MALAIKAT.map(m => m.duty);
  MALAIKAT.slice(0, 5).forEach(m => {
    const wrong = shuffle(names.filter(x => x !== m.name)).slice(0, 3);
    qs.push({ question: `Siapakah Malaikat yang ke-${m.n}?`, answer: m.name, options: shuffle([m.name, ...wrong]) });
  });
  MALAIKAT.slice(0, 5).forEach(m => {
    const wrong = shuffle(duties.filter(x => x !== m.duty)).slice(0, 3);
    qs.push({ question: `Apakah tugas Malaikat ${m.name}?`, answer: m.duty, options: shuffle([m.duty, ...wrong]) });
  });
  qs.push({ question: 'Berapakah jumlah malaikat yang wajib diketahui?', answer: '10', options: ['5', '8', '10', '25'] });
  qs.push({ question: 'Malaikat diciptakan Allah daripada apa?', answer: 'Cahaya', options: ['Cahaya', 'Tanah', 'Api', 'Angin'] });
  const dummy = shuffle(names).slice(0, 3);
  qs.push({ question: 'Yang manakah BUKAN nama Malaikat?', answer: 'Iblis', options: shuffle(['Iblis', ...dummy]) });
  return qs;
}

const QUESTIONS = shuffle(buildQuestions());

export default function Malaikat({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Akidah › "
      breadcrumbActive={language === 'bm' ? 'Beriman kepada Malaikat' : 'Belief in Angels'}
      title={language === 'bm' ? 'Beriman kepada Malaikat' : 'Belief in Angels'}
      lead={language === 'bm'
        ? 'Mari belajar 10 Malaikat utama yang wajib diketahui — nama, tulisan Arab, dan tugas masing-masing.'
        : 'Let\'s learn the 10 main Angels we must know — their names, Arabic script, and duties.'}
      icon="😇"
      theme={THEME}
      topics={TOPICS}
      questions={QUESTIONS}
      totalRounds={TOTAL_ROUNDS}
      accentColor="#10B981"
    />
  );
}
