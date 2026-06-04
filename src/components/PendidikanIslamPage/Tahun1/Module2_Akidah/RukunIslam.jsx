import React from 'react';
import Tahun1LessonScrollLayout from '../Tahun1LessonScrollLayout';
import { shuffle } from '../../_shared/utils';
import { ARABIC_FONT } from '../../_shared/arabic';

const RUKUN = [
  {
    n: 1,
    ar: 'الشَّهَادَتَانِ',
    name: 'Mengucap Dua Kalimah Syahadah',
    shortName: 'Syahadah',
    icon: '🗣️',
    desc: 'Mengucap bahawa tiada Tuhan selain Allah dan Muhammad itu Rasul Allah.',
  },
  {
    n: 2,
    ar: 'الصَّلَاةُ',
    name: 'Mendirikan Solat',
    shortName: 'Solat',
    icon: '🙏',
    desc: 'Melakukan solat fardu 5 waktu sehari semalam — Subuh, Zohor, Asar, Maghrib, Isyak.',
  },
  {
    n: 3,
    ar: 'الزَّكَاةُ',
    name: 'Menunaikan Zakat',
    shortName: 'Zakat',
    icon: '💰',
    desc: 'Mengeluarkan sebahagian harta kepada golongan yang berhak menerimanya.',
  },
  {
    n: 4,
    ar: 'الصِّيَامُ',
    name: 'Berpuasa di Bulan Ramadan',
    shortName: 'Puasa',
    icon: '🌙',
    desc: 'Menahan diri daripada makan, minum dan perkara yang membatalkan puasa sepanjang Ramadan.',
  },
  {
    n: 5,
    ar: 'الحَجُّ',
    name: 'Menunaikan Ibadah Haji',
    shortName: 'Haji',
    icon: '🕋',
    desc: 'Pergi ke Makkah untuk menunaikan ibadah haji bagi yang berkemampuan.',
  },
];

const NOT_RUKUN_ISLAM = [
  'Beriman kepada Allah',
  'Beriman kepada Malaikat',
  'Beriman kepada Hari Kiamat',
  'Beriman kepada Qada dan Qadar',
];

function buildQuestions() {
  const qs = [];
  RUKUN.forEach(r => {
    const wrong = shuffle(RUKUN.filter(x => x.n !== r.n)).slice(0, 3).map(x => x.name);
    qs.push({
      question: `Apakah Rukun Islam yang ke-${r.n}?`,
      answer: r.name,
      options: shuffle([r.name, ...wrong]),
    });
  });
  RUKUN.forEach(r => {
    const wrongNums = shuffle([1,2,3,4,5].filter(n => n !== r.n)).slice(0, 3).map(n => `Yang ke-${n}`);
    qs.push({
      question: `Rukun Islam yang ke berapa ialah "${r.shortName}"?`,
      answer: `Yang ke-${r.n}`,
      options: shuffle([`Yang ke-${r.n}`, ...wrongNums]),
    });
  });
  qs.push({
    question: 'Berapakah bilangan Rukun Islam?',
    answer: '5',
    options: ['4', '5', '6', '7'],
  });
  NOT_RUKUN_ISLAM.forEach(d => {
    const real = shuffle(RUKUN).slice(0, 3).map(r => r.name);
    qs.push({
      question: 'Yang manakah BUKAN Rukun Islam?',
      answer: d,
      options: shuffle([d, ...real]),
    });
  });
  return qs;
}

const TOTAL_ROUNDS = 10;

const THEME = {
  pageGradient: 'linear-gradient(180deg,#D6EEFF 0%,#6BAEE8 50%,#4299E0 100%)',
  dark: '#1E40AF',
  accent: '#3B82F6',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#D6EEFF 0%,#6BAEE8 55%,#2563EB 100%)',
  pillGradient: 'linear-gradient(180deg,#6BAEE8,#3B82F6)',
};

export default function RukunIslam({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Akidah › "
      breadcrumbActive={language === 'bm' ? 'Rukun Islam' : 'Pillars of Islam'}
      title={language === 'bm' ? 'Rukun Islam (5 Perkara)' : 'Pillars of Islam (5)'}
      lead={language === 'bm'
        ? 'Mari belajar 5 rukun Islam — tiang agama yang wajib diamalkan oleh setiap Muslim.'
        : 'Learn the 5 pillars of Islam — the foundation every Muslim must practice.'}
      icon="🌙"
      theme={THEME}
      topics={RUKUN.map(r => ({
        visual: (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <span style={{ fontSize: '2rem', lineHeight: 1 }}>{r.icon}</span>
            <span style={{ fontFamily: ARABIC_FONT, fontSize: '0.65rem', color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,0.3)', direction: 'rtl' }}>{r.ar}</span>
          </div>
        ),
        title: r.name,
        sublabel: `Rukun ke-${r.n}`,
        desc: r.desc,
      }))}
      questions={buildQuestions()}
      totalRounds={TOTAL_ROUNDS}
      accentColor="#3B82F6"
    />
  );
}
