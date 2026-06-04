import React from 'react';
import Tahun1LessonScrollLayout from '../Tahun1LessonScrollLayout';
import { shuffle } from '../../_shared/utils';

const KONSEP = [
  {
    icon: '🌟', label: 'Al-Amin', sublabel: 'Yang dipercayai',
    desc: 'Nabi Muhammad digelar Al-Amin yang bermaksud "yang amanah" atau "yang dipercayai". Golongan Quraisy sendiri menggelar baginda Al-Amin kerana sifat jujur dan amanah.',
  },
  {
    icon: '⚖️', label: 'Jujur & Amanah', sublabel: 'Sejak kecil',
    desc: 'Sejak kecil, Nabi terkenal dengan sifat jujur dan amanah. Setiap kata-kata baginda boleh dipercayai. Baginda tidak pernah berdusta walau sekali pun.',
  },
  {
    icon: '🐑', label: 'Mengembala Kambing', sublabel: 'Usia remaja',
    desc: 'Nabi mengembala kambing milik orang Quraisy. Baginda menjaga kambing dengan baik dan bertanggungjawab, tidak pernah hilang atau cuai dalam tugas.',
  },
  {
    icon: '🧳', label: 'Berniaga untuk Khadijah', sublabel: 'Dagangan yang jujur',
    desc: 'Nabi berniaga modal Khadijah. Baginda berniaga dengan jujur dan mendapat keuntungan yang banyak. Khadijah kagum dengan kejujuran dan sifat amanah baginda.',
  },
  {
    icon: '🕋', label: 'Peletakan Hajar Aswad', sublabel: 'Keputusan bijak',
    desc: 'Ketika pembinaan Kaabah, kabilah Quraisy bertengkar siapa yang berhak meletakkan Hajar Aswad. Nabi menyelesaikan dengan meletakkan Hajar Aswad di atas kain dan semua kabilah memegang kain bersama-sama.',
  },
  {
    icon: '🤝', label: 'Teladan Terbaik', sublabel: 'Ikuti sifat Nabi',
    desc: 'Kita hendaklah mencontohi sifat amanah, jujur dan bertanggungjawab Nabi Muhammad SAW dalam kehidupan seharian. Itulah akhlak yang mulia.',
  },
];

const QUESTIONS = shuffle([
  { question: 'Apakah gelaran Nabi Muhammad SAW?', answer: 'Al-Amin', options: ['Al-Amin', 'Al-Khaliq', 'Ar-Rahman', 'Al-Malik'] },
  { question: 'Maksud Al-Amin?', answer: 'Yang dipercayai', options: ['Yang dipercayai', 'Yang kuat', 'Yang kaya', 'Yang mulia'] },
  { question: 'Siapa yang memberi modal kepada Nabi untuk berniaga?', answer: 'Khadijah', options: ['Khadijah', 'Abu Talib', 'Aminah', 'Abdul Muttalib'] },
  { question: 'Apa pekerjaan Nabi sebelum dilantik menjadi rasul?', answer: 'Berniaga & mengembala', options: ['Berniaga & mengembala', 'Bertani', 'Memancing', 'Memburu'] },
  { question: 'Peristiwa apa yang menunjukkan sifat amanah Nabi?', answer: 'Peletakan Hajar Aswad', options: ['Peletakan Hajar Aswad', 'Pembukaan Mekah', 'Hijrah ke Madinah', 'Perang Badar'] },
  { question: 'Bagaimana Nabi menyelesaikan pertelingkahan Hajar Aswad?', answer: 'Guna kain diangkat bersama', options: ['Guna kain diangkat bersama', 'Dengan undian', 'Dengan pertandingan', 'Dengan pilihan raya'] },
  { question: 'Siapa yang menggelar Nabi sebagai Al-Amin?', answer: 'Orang Quraisy', options: ['Orang Quraisy', 'Ahli keluarga', 'Para malaikat', 'Pemerintah Rom'] },
  { question: 'Apa yang dikagumi Khadijah tentang Nabi?', answer: 'Kejujuran & amanah', options: ['Kejujuran & amanah', 'Kekayaan', 'Kekuatan', 'Keturunan'] },
  { question: 'Nabi pernah mengembala apa?', answer: 'Kambing', options: ['Kambing', 'Unta', 'Lembu', 'Kerbau'] },
  { question: 'Kita patut mencontohi sifat Nabi yang?', answer: 'Amanah dan jujur', options: ['Amanah dan jujur', 'Kaya dan kuat', 'Tampan dan gagah', 'Pandai dan bijak'] },
]);

const TOTAL_ROUNDS = 10;

const THEME = {
  pageGradient: 'linear-gradient(180deg,#FFE9F3 0%,#FFBFDD 50%,#FF9EC8 100%)',
  dark: '#9D174D',
  accent: '#EC4899',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#FFE9F3 0%,#FFBFDD 55%,#FF8CBF 100%)',
  pillGradient: 'linear-gradient(180deg,#FFBFDD,#EC4899)',
};

export default function SifatAlAmin({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Sirah › "
      breadcrumbActive={language === 'bm' ? 'Sifat Al-Amin' : 'The Trustworthy'}
      title={language === 'bm' ? 'Sifat Terpuji: Al-Amin' : 'Noble Trait: Al-Amin'}
      lead={language === 'bm'
        ? 'Nabi Muhammad SAW digelar Al-Amin — yang amanah dan dipercayai. Mari belajar sifat-sifat terpuji baginda.'
        : 'Prophet Muhammad SAW was called Al-Amin — the trustworthy. Learn his noble traits.'}
      icon="🌟"
      theme={THEME}
      topics={KONSEP.map(k => ({
        visual: <span style={{ fontSize: '3.2rem', lineHeight: 1 }}>{k.icon}</span>,
        title: k.label,
        sublabel: k.sublabel,
        desc: k.desc,
      }))}
      questions={QUESTIONS}
      totalRounds={TOTAL_ROUNDS}
      accentColor="#EC4899"
    />
  );
}
