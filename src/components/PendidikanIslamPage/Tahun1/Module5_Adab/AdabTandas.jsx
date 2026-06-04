import React from 'react';
import Tahun1LessonScrollLayout from '../Tahun1LessonScrollLayout';
import { shuffle } from '../../_shared/utils';

const THEME = {
  pageGradient: 'linear-gradient(180deg,#EDF4FF 0%,#DAEAFF 50%,#C8DFFF 100%)',
  dark: '#1E3A5F',
  accent: '#2563EB',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#D6EEFF 0%,#6BAEE8 55%,#2563EB 100%)',
  pillGradient: 'linear-gradient(180deg,#6BAEE8,#2563EB)',
};

const EMOJI = [
  { emoji: '🚪', sublabel: 'Baca doa', title: 'Masuk Kaki Kiri', desc: 'Apabila masuk tandas, mulakan dengan kaki kiri dan baca doa masuk tandas: "Allahumma inni a\'uzu bika minal khubusi wal khaba\'is."' },
  { emoji: '🚻', sublabel: 'Jangan sebut nama Allah', title: 'Jangan Bawa Nama Allah', desc: 'Di dalam tandas, jangan menyebut nama Allah atau membaca ayat Al-Quran. Ini kerana tandas adalah tempat yang kotor dan najis.' },
  { emoji: '🚫', sublabel: 'Juga membelakangi', title: 'Jangan Menghadap Kiblat', desc: 'Jangan menghadap atau membelakangi kiblat ketika berada di dalam tandas. Ini adalah adab yang diajarkan oleh Rasulullah SAW.' },
  { emoji: '🧻', sublabel: 'Istinja\' dengan bersih', title: 'Bersih dengan Air/Tisu', desc: 'Selepas buang air, bersihkan dengan air bersih (istinja\') atau tisu. Pastikan bersih sehingga tiada lagi najis yang tinggal.' },
  { emoji: '🚶', sublabel: 'Baca doa keluar', title: 'Keluar Kaki Kanan', desc: 'Apabila keluar tandas, mulakan dengan kaki kanan dan baca doa: "Ghufranak, Alhamdulillahillazi azhaba annil aza wa afani."' },
  { emoji: '🧼', sublabel: 'Selepas dari tandas', title: 'Basuh Tangan', desc: 'Selepas keluar tandas, basuh tangan dengan air bersih dan sabun. Ini untuk menjaga kebersihan dan kesihatan diri.' },
];

const QUESTIONS = shuffle([
  { question: 'Kaki mana untuk masuk tandas?', answer: 'Kaki kiri', options: ['Kaki kiri', 'Kaki kanan', 'Dua-dua', 'Mana-mana'] },
  { question: 'Kaki mana untuk keluar tandas?', answer: 'Kaki kanan', options: ['Kaki kanan', 'Kaki kiri', 'Dua-dua', 'Mana-mana'] },
  { question: 'Apa yang kita baca sebelum masuk tandas?', answer: 'Doa masuk tandas', options: ['Doa masuk tandas', 'Al-Fatihah', 'Bismillah', 'Selawat'] },
  { question: 'Di dalam tandas, kita tidak boleh?', answer: 'Sebut nama Allah', options: ['Sebut nama Allah', 'Berdiri', 'Duduk', 'Berjalan'] },
  { question: 'Ketika di tandas, kita tidak boleh menghadap?', answer: 'Kiblat', options: ['Kiblat', 'Pintu', 'Tingkap', 'Cermin'] },
  { question: 'Selepas buang air, kita perlu?', answer: 'Istinja\' dengan air/tisu', options: ['Istinja\' dengan air/tisu', 'Terus keluar', 'Pakai seluar', 'Baca doa'] },
  { question: 'Apa yang dibaca semasa keluar tandas?', answer: 'Ghufranak', options: ['Ghufranak', 'Bismillah', 'Alhamdulillah', 'Allahuakbar'] },
  { question: 'Selepas keluar tandas, kita perlu?', answer: 'Basuh tangan', options: ['Basuh tangan', 'Makan', 'Minum', 'Tidur'] },
  { question: 'Jika tiada air, istinja\' boleh guna?', answer: 'Tisu atau batu', options: ['Tisu atau batu', 'Daun', 'Pasir', 'Apa-apa'] },
  { question: 'Tandas adalah tempat yang?', answer: 'Kotor dan najis', options: ['Kotor dan najis', 'Bersih dan suci', 'Indah dan cantik', 'Sunyi dan senyap'] },
]);

export default function AdabTandas({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Modul 5 · Adab › "
      breadcrumbActive={language === 'bm' ? 'Adab Masuk dan Keluar Tandas' : 'Toilet Etiquette'}
      title={language === 'bm' ? 'Adab Masuk dan Keluar Tandas' : 'Toilet Etiquette'}
      lead={language === 'bm'
        ? 'Mari belajar adab masuk dan keluar tandas mengikut sunnah Rasulullah ﷺ supaya kita sentiasa dalam perlindungan Allah.'
        : 'Let\'s learn the Islamic etiquette for entering and leaving the toilet so we remain under Allah\'s protection.'}
      icon="🚻"
      theme={THEME}
      topics={EMOJI.map((e) => ({ visual: <span style={{ fontSize: '3.2rem', lineHeight: 1 }}>{e.emoji}</span>, ...e }))}
      questions={QUESTIONS}
      totalRounds={10}
      accentColor="#2563EB"
    />
  );
}
