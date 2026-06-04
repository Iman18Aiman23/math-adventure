import React from 'react';
import Tahun1LessonScrollLayout from '../Tahun1LessonScrollLayout';
import { shuffle } from '../../_shared/utils';

const THEME = {
  pageGradient: 'linear-gradient(180deg,#EBF5FF 0%,#D6EEFF 50%,#C0E4FF 100%)',
  dark: '#0C4A6E',
  accent: '#0891B2',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#D6EEFF 0%,#67D6E8 55%,#0891B2 100%)',
  pillGradient: 'linear-gradient(180deg,#67D6E8,#0891B2)',
};

const EMOJI = [
  { emoji: '🌙', sublabel: 'Baca doa tidur', title: 'Doa Sebelum Tidur', desc: 'Sebelum tidur, bacalah doa: "Bismikallahumma ahya wa amut" — Dengan nama-Mu Ya Allah aku hidup dan mati. Juga baca Al-Ikhlas, Al-Falaq dan An-Nas.' },
  { emoji: '➡️', sublabel: 'Sunat Nabi', title: 'Tidur Mengiring ke Kanan', desc: 'Tidurlah mengiring ke sebelah kanan, menghadap kiblat. Ini adalah cara tidur yang paling baik dan sunnah Nabi. Jangan tidur meniarap.' },
  { emoji: '🧹', sublabel: 'Sejadah & bantal', title: 'Kemas Tempat Tidur', desc: 'Sebelum tidur, kemas dan lap tempat tidur. Sapu tempat tidur dengan kain untuk membuang habuk dan kotoran.' },
  { emoji: '🕰️', sublabel: 'Tidur awal, bangun awal', title: 'Jangan Tidur Lewat', desc: 'Tidurlah awal supaya dapat bangun awal untuk solat Subuh. Rasulullah tidak suka tidur lewat selepas Isyak tanpa ada keperluan.' },
  { emoji: '☀️', sublabel: 'Syukur pada Allah', title: 'Doa Bangun Tidur', desc: 'Apabila bangun tidur, bacalah doa: "Alhamdulillahillazi ahyana ba\'da ma amatana wa ilaihin nusyur" — Segala puji bagi Allah yang menghidupkan kami selepas mematikan kami.' },
  { emoji: '🫡', sublabel: 'Selepas bangun', title: 'Bersih & Gosok Gigi', desc: 'Selepas bangun tidur, basuh muka dan gosok gigi. Rasulullah menggunakan siwak untuk membersihkan mulut selepas bangun.' },
];

const QUESTIONS = shuffle([
  { question: 'Apa doa sebelum tidur?', answer: 'Bismikallahumma ahya wa amut', options: ['Bismikallahumma ahya wa amut', 'Alhamdulillahillazi ahyana', 'Rabbana atina', 'Subhanallah'] },
  { question: 'Cara tidur yang sunnah?', answer: 'Mengiring ke kanan', options: ['Mengiring ke kanan', 'Meniarap', 'Telentang', 'Mengiring ke kiri'] },
  { question: 'Apa doa bangun tidur?', answer: 'Alhamdulillahillazi ahyana', options: ['Alhamdulillahillazi ahyana', 'Bismikallahumma', 'Allahuakbar', 'Laa ilaha illallah'] },
  { question: 'Apa yang dilakukan sebelum tidur?', answer: 'Kemas & lap tempat tidur', options: ['Kemas & lap tempat tidur', 'Makan', 'Main', 'Baca buku'] },
  { question: 'Nabi menggunakan apa untuk bersihkan mulut?', answer: 'Siwak', options: ['Siwak', 'Berus gigi', 'Ubat gigi', 'Air garam'] },
  { question: 'Tidur yang baik adalah?', answer: 'Tidur awal, bangun awal', options: ['Tidur awal, bangun awal', 'Tidur lewat', 'Tidur petang', 'Tidur sepanjang hari'] },
  { question: 'Sebelum tidur kita baca surah?', answer: 'Al-Ikhlas, Al-Falaq, An-Nas', options: ['Al-Ikhlas, Al-Falaq, An-Nas', 'Al-Fatihah', 'Al-Baqarah', 'Yasin'] },
  { question: 'Tidur meniarap adalah?', answer: 'Tidak digalakkan', options: ['Tidak digalakkan', 'Digalakkan', 'Sunat', 'Wajib'] },
  { question: 'Rasulullah tidak suka tidur lewat selepas?', answer: 'Solat Isyak', options: ['Solat Isyak', 'Solat Maghrib', 'Solat Subuh', 'Solat Zuhur'] },
  { question: 'Selepas bangun tidur kita patut?', answer: 'Basuh muka & gosok gigi', options: ['Basuh muka & gosok gigi', 'Terus makan', 'Main', 'Tidur lagi'] },
]);

export default function AdabTidur({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Modul 5 · Adab › "
      breadcrumbActive={language === 'bm' ? 'Adab Tidur dan Bangun' : 'Sleeping & Waking Etiquette'}
      title={language === 'bm' ? 'Adab Tidur dan Bangun' : 'Sleeping & Waking Etiquette'}
      lead={language === 'bm'
        ? 'Mari belajar adab tidur dan bangun yang diajar oleh Rasulullah ﷺ supaya tidur kita menjadi ibadah.'
        : 'Let\'s learn the Islamic etiquette of sleeping and waking so our rest becomes an act of worship.'}
      icon="🌙"
      theme={THEME}
      topics={EMOJI.map((e, i) => ({ visual: <span style={{ fontSize: '3.2rem', lineHeight: 1 }}>{e.emoji}</span>, ...e }))}
      questions={QUESTIONS}
      totalRounds={10}
      accentColor="#0891B2"
    />
  );
}
