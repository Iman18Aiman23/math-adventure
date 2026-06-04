import React from 'react';
import Tahun1LessonScrollLayout from '../Tahun1LessonScrollLayout';
import { shuffle } from '../../_shared/utils';

const KONSEP = [
  {
    icon: '🐘', label: 'Tahun Gajah', sublabel: '12 Rabiulawal',
    desc: 'Nabi Muhammad SAW dilahirkan pada hari Isnin, 12 Rabiulawal Tahun Gajah (570 Masihi). Tahun Gajah dinamakan sempena tentera bergajah Abrahah yang menyerang Kaabah.',
  },
  {
    icon: '🤱', label: 'Penyusuan Pertama', sublabel: 'Thuwaibah',
    desc: 'Nabi mula disusukan oleh Thuwaibah, hamba kepada Abu Lahab. Ini adalah susuan pertama baginda sebelum dipelihara oleh Halimah.',
  },
  {
    icon: '🏕️', label: "Halimah As-Sa'diyah", sublabel: 'Ibu susuan',
    desc: "Halimah As-Sa'diyah dari Bani Sa'ad menjadi ibu susuan Nabi. Bersama Halimah, Nabi membesar di perkampungan Bani Sa'ad yang segar dan sihat.",
  },
  {
    icon: '✨', label: 'Pembelahan Dada', sublabel: 'Pembersihan hati',
    desc: 'Ketika bersama Halimah, malaikat Jibril datang membelah dada Nabi untuk mengeluarkan segumpal darah dan membersihkan hati baginda dengan air zamzam.',
  },
  {
    icon: '👶', label: 'Kembali ke Mekah', sublabel: 'Usia 5-6 tahun',
    desc: 'Selepas beberapa tahun, Nabi dikembalikan kepada ibunya Aminah. Baginda membesar bersama ibunya sehingga usia 6 tahun, kemudian ibunya meninggal dunia.',
  },
  {
    icon: '👴', label: 'Dipelihara Datuk', sublabel: 'Abdul Muttalib',
    desc: 'Setelah Aminah wafat, Nabi dipelihara oleh datuknya Abdul Muttalib. Namun Abdul Muttalib juga wafat ketika Nabi berusia 8 tahun. Kemudian Nabi dijaga bapa saudaranya, Abu Talib.',
  },
];

const QUESTIONS = shuffle([
  { question: 'Bilakah Nabi Muhammad SAW dilahirkan?', answer: '12 Rabiulawal', options: ['12 Rabiulawal', '1 Muharram', '10 Zulhijjah', '27 Rejab'] },
  { question: 'Tahun kelahiran Nabi dipanggil?', answer: 'Tahun Gajah', options: ['Tahun Gajah', 'Tahun Ular', 'Tahun Kuda', 'Tahun Unta'] },
  { question: 'Siapakah ibu susuan pertama Nabi?', answer: 'Thuwaibah', options: ['Thuwaibah', 'Halimah', 'Aminah', 'Fatimah'] },
  { question: 'Siapakah ibu susuan Nabi dari Bani Sa\'ad?', answer: "Halimah As-Sa'diyah", options: ["Halimah As-Sa'diyah", 'Thuwaibah', 'Aminah', 'Siti Hajar'] },
  { question: 'Apa peristiwa yang berlaku ketika bersama Halimah?', answer: 'Pembelahan dada', options: ['Pembelahan dada', 'Pertama bercakap', 'Berjalan', 'Berpuasa'] },
  { question: 'Malaikat apa yang membelah dada Nabi?', answer: 'Jibril', options: ['Jibril', 'Mikail', 'Israfil', 'Izrail'] },
  { question: 'Siapa yang menyerang Kaabah pada Tahun Gajah?', answer: 'Abrahah', options: ['Abrahah', 'Firaun', 'Namrud', 'Qarun'] },
  { question: 'Di manakah Nabi membesar bersama Halimah?', answer: "Bani Sa'ad", options: ["Bani Sa'ad", 'Mekah', 'Madinah', 'Taif'] },
  { question: 'Siapa yang menjaga Nabi selepas Aminah wafat?', answer: 'Abdul Muttalib', options: ['Abdul Muttalib', 'Abu Talib', 'Khadijah', 'Hamzah'] },
  { question: 'Hati Nabi dibersihkan dengan?', answer: 'Air zamzam', options: ['Air zamzam', 'Air mutlak', 'Air mawar', 'Air madu'] },
]);

const TOTAL_ROUNDS = 10;

const THEME = {
  pageGradient: 'linear-gradient(180deg,#D0F7FA 0%,#67D6E8 50%,#3BC4D8 100%)',
  dark: '#0C4A6E',
  accent: '#0891B2',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#D0F7FA 0%,#67D6E8 55%,#0891B2 100%)',
  pillGradient: 'linear-gradient(180deg,#67D6E8,#0891B2)',
};

export default function KelahiranPenyusuan({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Sirah › "
      breadcrumbActive={language === 'bm' ? 'Kelahiran & Penyusuan' : 'Birth & Nursing'}
      title={language === 'bm' ? 'Kelahiran & Penyusuan' : 'Birth & Nursing'}
      lead={language === 'bm'
        ? 'Mari belajar tentang kelahiran Nabi Muhammad SAW, ibu susuan baginda, dan peristiwa awal kehidupan baginda.'
        : 'Learn about the birth of Prophet Muhammad SAW, his wet nurses, and the early events of his life.'}
      icon="👶"
      theme={THEME}
      topics={KONSEP.map(k => ({
        visual: <span style={{ fontSize: '3.2rem', lineHeight: 1 }}>{k.icon}</span>,
        title: k.label,
        sublabel: k.sublabel,
        desc: k.desc,
      }))}
      questions={QUESTIONS}
      totalRounds={TOTAL_ROUNDS}
      accentColor="#0891B2"
    />
  );
}
