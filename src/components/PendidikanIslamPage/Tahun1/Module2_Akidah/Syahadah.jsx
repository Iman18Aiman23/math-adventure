import React from 'react';
import Tahun1LessonScrollLayout from '../Tahun1LessonScrollLayout';
import { ARABIC_FONT } from '../../_shared/arabic';
import { shuffle } from '../../_shared/utils';

const KALIMAH = [
  {
    n: 1,
    label: 'Kalimah Pertama',
    ar: 'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللهُ',
    rumi: 'Asyhadu allaa ilaaha illallah',
    meaning: 'Aku bersaksi bahawa tiada Tuhan yang berhak disembah selain Allah.',
    meaningEng: 'I bear witness that there is no god worthy of worship except Allah.',
    about: 'Kalimah ini menegaskan bahawa Allah sahaja yang wajib disembah. Tiada sebarang makhluk atau benda lain yang layak dijadikan Tuhan.',
    icon: '☝️',
  },
  {
    n: 2,
    label: 'Kalimah Kedua',
    ar: 'وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللهِ',
    rumi: 'wa asyhadu anna Muhammadan Rasuulullah',
    meaning: 'Dan aku bersaksi bahawa Nabi Muhammad itu adalah Rasul (utusan) Allah.',
    meaningEng: 'And I bear witness that Muhammad is the Messenger of Allah.',
    about: 'Kalimah ini mengiktiraf bahawa Nabi Muhammad SAW adalah nabi dan rasul terakhir yang diutuskan Allah kepada umat manusia.',
    icon: '🌟',
  },
];

const KEPENTINGAN = [
  { icon: '🏳️', text: 'Merupakan Rukun Islam yang pertama.' },
  { icon: '💫', text: 'Syarat masuk ke dalam agama Islam.' },
  { icon: '❤️', text: 'Menunjukkan keimanan seseorang kepada Allah dan Rasul-Nya.' },
  { icon: '🌍', text: 'Diucapkan sekurang-kurangnya sekali seumur hidup dengan ikhlas.' },
];

const QUESTIONS = shuffle([
  {
    question: 'Berapa kalimahkah dalam Dua Kalimah Syahadah?',
    answer: '2 kalimah',
    options: ['1 kalimah', '2 kalimah', '3 kalimah', '4 kalimah'],
  },
  {
    question: 'Apakah maksud "Asyhadu allaa ilaaha illallah"?',
    answer: 'Aku bersaksi tiada Tuhan selain Allah',
    options: ['Aku bersaksi tiada Tuhan selain Allah', 'Muhammad itu Rasul Allah', 'Allah Maha Pencipta', 'Allah Maha Esa'],
  },
  {
    question: 'Apakah maksud "wa asyhadu anna Muhammadan Rasuulullah"?',
    answer: 'Muhammad itu Rasul Allah',
    options: ['Allah Maha Pemurah', 'Muhammad itu Rasul Allah', 'Tiada Tuhan selain Allah', 'Allah adalah Pencipta'],
  },
  {
    question: 'Syahadah merupakan Rukun Islam yang ke berapa?',
    answer: 'Yang ke-1',
    options: ['Yang ke-1', 'Yang ke-2', 'Yang ke-3', 'Yang ke-5'],
  },
  {
    question: 'Apakah kepentingan utama mengucap Syahadah?',
    answer: 'Syarat masuk Islam',
    options: ['Syarat masuk Islam', 'Syarat pergi haji', 'Syarat membayar zakat', 'Syarat berpuasa'],
  },
  {
    question: 'Siapakah yang disebut dalam Kalimah Syahadah kedua?',
    answer: 'Nabi Muhammad SAW',
    options: ['Nabi Isa AS', 'Nabi Ibrahim AS', 'Nabi Muhammad SAW', 'Nabi Musa AS'],
  },
  {
    question: 'Berapa kali sekurang-kurangnya Syahadah diucapkan dalam hidup?',
    answer: 'Sekali',
    options: ['Sekali', 'Lima kali', 'Setiap hari', 'Setiap solat'],
  },
  {
    question: 'Kata "أَشْهَدُ" (asyhadu) bermaksud?',
    answer: 'Aku bersaksi',
    options: ['Aku bersaksi', 'Aku percaya', 'Aku memohon', 'Aku berdoa'],
  },
  {
    question: 'Apakah nama lain bagi Dua Kalimah Syahadah?',
    answer: 'Kalimah Tauhid',
    options: ['Kalimah Tauhid', 'Kalimah Basmala', 'Kalimah Takbir', 'Kalimah Salam'],
  },
  {
    question: 'Kalimah Syahadah pertama menegaskan tentang apa?',
    answer: 'Keesaan Allah',
    options: ['Keesaan Allah', 'Kerasulan Muhammad', 'Hari Kiamat', 'Malaikat Allah'],
  },
]);

const TOTAL_ROUNDS = 10;

const THEME = {
  pageGradient: 'linear-gradient(180deg,#E7D9FF 0%,#B79CFF 50%,#9D7AEA 100%)',
  dark: '#4C1D95',
  accent: '#8B5CF6',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#E7D9FF 0%,#B79CFF 55%,#7A55E0 100%)',
  pillGradient: 'linear-gradient(180deg,#B79CFF,#8B5CF6)',
};

export default function Syahadah({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Akidah › "
      breadcrumbActive={language === 'bm' ? 'Dua Kalimah Syahadah' : 'The Two Declarations of Faith'}
      title={language === 'bm' ? 'Dua Kalimah Syahadah' : 'The Two Declarations of Faith'}
      lead={language === 'bm'
        ? 'Syahadah adalah pintu masuk ke dalam agama Islam — mari kita fahami dua kalimah syahadah.'
        : 'The Shahada is the gateway to Islam — let us understand the two declarations of faith.'}
      icon="☝️"
      theme={THEME}
      topics={[
        ...KALIMAH.map(k => ({
          visual: (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <span style={{ fontSize: '2rem', lineHeight: 1 }}>{k.icon}</span>
              <span style={{ fontFamily: ARABIC_FONT, fontSize: '0.55rem', color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,0.3)', direction: 'rtl', lineHeight: 1.3 }}>{k.ar}</span>
            </div>
          ),
          title: k.label,
          sublabel: k.rumi,
          desc: language === 'bm' ? `${k.meaning} ${k.about}` : `${k.meaningEng}`,
        })),
        ...KEPENTINGAN.map(k => ({
          visual: <span style={{ fontSize: '3.2rem', lineHeight: 1 }}>{k.icon}</span>,
          title: '',
          sublabel: 'Kepentingan',
          desc: k.text,
        })),
      ]}
      questions={QUESTIONS}
      totalRounds={TOTAL_ROUNDS}
      accentColor="#8B5CF6"
    />
  );
}
