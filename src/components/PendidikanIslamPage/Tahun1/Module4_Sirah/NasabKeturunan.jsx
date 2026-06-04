import React from 'react';
import Tahun1LessonScrollLayout from '../Tahun1LessonScrollLayout';
import { shuffle } from '../../_shared/utils';

const KONSEP = [
  {
    icon: '👤', label: 'Nama Nabi', sublabel: 'Muhammad bin Abdullah',
    desc: 'Nabi kita ialah Muhammad bin Abdullah bin Abdul Muttalib bin Hashim. Baginda berasal dari suku Quraisy yang mulia.',
  },
  {
    icon: '👨‍👩‍👧', label: 'Ibu & Bapa', sublabel: 'Aminah & Abdullah',
    desc: 'Bapa Nabi bernama Abdullah bin Abdul Muttalib. Ibu Nabi bernama Aminah binti Wahab. Bapa Nabi telah meninggal sebelum Nabi dilahirkan.',
  },
  {
    icon: '🌳', label: 'Salasilah', sublabel: 'Keturunan mulia',
    desc: 'Nasab Nabi sampai kepada Nabi Ibrahim AS. Keturunan baginda dari zuriat Ismail AS, anak Nabi Ibrahim AS. Garis keturunan ini sangat terhormat.',
  },
  {
    icon: '🏛️', label: 'Suku Quraisy', sublabel: 'Pemimpin Mekah',
    desc: 'Nabi berasal dari suku Quraisy, suku yang paling dihormati di Mekah. Kaum Quraisy adalah penjaga Kaabah dan pemimpin masyarakat Arab.',
  },
  {
    icon: '📜', label: 'Datuk Nabi', sublabel: 'Abdul Muttalib',
    desc: 'Datuk Nabi, Abdul Muttalib, adalah ketua suku Quraisy yang sangat dihormati. Selepas Abdullah meninggal, Abdul Muttalib menjaga Nabi.',
  },
  {
    icon: '🤲', label: 'Keturunan Mulia', sublabel: 'Daripada zuriat Ismail',
    desc: 'Allah memilih keturunan yang paling mulia untuk Nabi Muhammad SAW, daripada nabi kepada nabi sehingga kepada Nabi Ibrahim AS.',
  },
];

const QUESTIONS = shuffle([
  { question: 'Siapakah nama ibu Nabi Muhammad SAW?', answer: 'Aminah', options: ['Aminah', 'Aisyah', 'Khadijah', 'Fatimah'] },
  { question: 'Siapakah nama bapa Nabi Muhammad SAW?', answer: 'Abdullah', options: ['Abdullah', 'Abdul Muttalib', 'Abu Talib', 'Hashim'] },
  { question: 'Nabi Muhammad SAW berasal dari suku apa?', answer: 'Quraisy', options: ['Quraisy', 'Aus', 'Khazraj', 'Thaqif'] },
  { question: 'Siapakah nama datuk Nabi Muhammad SAW?', answer: 'Abdul Muttalib', options: ['Abdul Muttalib', 'Abdullah', 'Hashim', 'Abu Talib'] },
  { question: 'Bapa Nabi meninggal ketika Nabi berusia?', answer: 'Sebelum lahir', options: ['Sebelum lahir', '6 tahun', '2 tahun', '8 tahun'] },
  { question: 'Nabi Muhammad SAW adalah keturunan nabi?', answer: 'Nabi Ibrahim AS', options: ['Nabi Ibrahim AS', 'Nabi Musa AS', 'Nabi Isa AS', 'Nabi Nuh AS'] },
  { question: 'Siapakah penjaga Kaabah di Mekah?', answer: 'Kaum Quraisy', options: ['Kaum Quraisy', 'Kaum Aus', 'Kaum Thamud', 'Kaum Ad'] },
  { question: 'Nama penuh Nabi Muhammad SAW bin?', answer: 'Abdullah', options: ['Abdullah', 'Abdul Muttalib', 'Hashim', 'Abu Talib'] },
  { question: 'Keturunan Nabi Muhammad sampai kepada Nabi?', answer: 'Ismail AS', options: ['Ismail AS', 'Ishak AS', 'Yaakub AS', 'Yusuf AS'] },
  { question: 'Suku Quraisy terkenal sebagai?', answer: 'Pemimpin Mekah', options: ['Pemimpin Mekah', 'Pedagang Madinah', 'Petani Taif', 'Penternak Arab'] },
]);

const TOTAL_ROUNDS = 10;

const THEME = {
  pageGradient: 'linear-gradient(180deg,#E7D9FF 0%,#B79CFF 50%,#9D7AEA 100%)',
  dark: '#4C1D95',
  accent: '#7A55E0',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#E7D9FF 0%,#B79CFF 55%,#7A55E0 100%)',
  pillGradient: 'linear-gradient(180deg,#B79CFF,#7A55E0)',
};

export default function NasabKeturunan({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Sirah › "
      breadcrumbActive={language === 'bm' ? 'Nasab & Keturunan' : 'Lineage of Prophet SAW'}
      title={language === 'bm' ? 'Nasab & Keturunan Nabi SAW' : 'Lineage of Prophet SAW'}
      lead={language === 'bm'
        ? 'Mari mengenali salasilah keturunan Nabi Muhammad SAW yang mulia — daripada ibubapa baginda hingga ke suku Quraisy.'
        : 'Learn about the noble lineage of Prophet Muhammad SAW — from his parents to the Quraysh tribe.'}
      icon="🕌"
      theme={THEME}
      topics={KONSEP.map(k => ({
        visual: <span style={{ fontSize: '3.2rem', lineHeight: 1 }}>{k.icon}</span>,
        title: k.label,
        sublabel: k.sublabel,
        desc: k.desc,
      }))}
      questions={QUESTIONS}
      totalRounds={TOTAL_ROUNDS}
      accentColor="#7A55E0"
    />
  );
}
