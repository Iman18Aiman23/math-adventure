import React from 'react';
import Tahun1LessonScrollLayout from '../../Tahun1/Tahun1LessonScrollLayout';
import { shuffle } from '../../_shared/utils';

const THEME = {
  pageGradient: 'radial-gradient(ellipse at top,#FEF1F5 0%,#FDE2EA 60%,#FCD2DF 100%)',
  dark: '#831743',
  accent: '#EC4899',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#FFE9F3 0%,#FFBFDD 55%,#EC4899 100%)',
  pillGradient: 'linear-gradient(180deg,#FF8CBF,#EC4899)',
};

const EMOJI = [
  { emoji: '👕', sublabel: 'Pakaian menutup aurat', title: 'Menutup Aurat', desc: 'Pakaian hendaklah menutup aurat mengikut syariat Islam. Lelaki menutup dari pusat ke lutut, manakala perempuan menutup seluruh badan kecuali muka dan tangan.' },
  { emoji: '⚖️', sublabel: 'Tidak mewah/tidak buruk', title: 'Sederhana', desc: 'Pakaian hendaklah sederhana — tidak terlalu mewah dan tidak terlalu buruk. Islam menggalakkan kita berpakaian kemas dan sopan tanpa berlebih-lebihan.' },
  { emoji: '🧼', sublabel: 'Pakaian bersih dan kemas', title: 'Bersih', desc: 'Pastikan pakaian bersih dan kemas. Pakaian yang kotor dan berbau tidak elok dipakai terutamanya ketika solat dan ke masjid.' },
  { emoji: '🚫', sublabel: 'Lelaki & perempuan', title: 'Tidak Menyerupai Lawan Jenis', desc: 'Lelaki tidak boleh memakai pakaian perempuan dan perempuan tidak boleh memakai pakaian lelaki. Islam melarang menyerupai lawan jenis.' },
  { emoji: '🤲', sublabel: 'Baca doa ketika memakai', title: 'Doa Berpakaian', desc: 'Baca doa ketika memakai pakaian: "Alhamdulillahillazi kasani haza wa razaqanihi min ghairi haulin minni wa la quwwah." Bersyukur pada Allah atas pakaian yang diberi.' },
  { emoji: '🙏', sublabel: 'Baca doa membuka', title: 'Doa Membuka Pakaian', desc: 'Baca doa ketika membuka pakaian: "Bismillah" — dengan nama Allah. Jangan membuka pakaian di tempat terbuka tanpa ada tutupan.' },
];

const QUESTIONS = shuffle([
  { question: 'Pakaian orang Islam hendaklah menutup?', answer: 'Aurat', options: ['Aurat', 'Tangan', 'Kaki', 'Kepala'] },
  { question: 'Kita tidak boleh memakai pakaian yang?', answer: 'Terlalu mewah atau terlalu buruk', options: ['Terlalu mewah atau terlalu buruk', 'Bersih', 'Baru', 'Warna terang'] },
  { question: 'Pakaian yang dipakai hendaklah dalam keadaan?', answer: 'Bersih dan kemas', options: ['Bersih dan kemas', 'Kotor', 'Berbau', 'Rennyek'] },
  { question: 'Lelaki tidak boleh memakai pakaian?', answer: 'Perempuan', options: ['Perempuan', 'Lelaki', 'Warna gelap', 'Panjang'] },
  { question: 'Perempuan tidak boleh memakai pakaian?', answer: 'Lelaki', options: ['Lelaki', 'Perempuan', 'Warna cerah', 'Pendek'] },
  { question: 'Apa yang dibaca ketika memakai pakaian?', answer: 'Doa berpakaian', options: ['Doa berpakaian', 'Al-Fatihah', 'Selawat', 'Doa makan'] },
  { question: 'Apa yang dibaca ketika membuka pakaian?', answer: 'Bismillah', options: ['Bismillah', 'Alhamdulillah', 'Allahuakbar', 'Subhanallah'] },
  { question: 'Islam menggalakkan kita berpakaian secara?', answer: 'Sederhana', options: ['Sederhana', 'Mewah', 'Buruk', 'Mahal'] },
]);

export default function AdabBerpakaian({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Modul 5 · Adab › "
      breadcrumbActive={language === 'bm' ? 'Adab Berpakaian' : 'Dressing Etiquette'}
      title={language === 'bm' ? 'Adab Berpakaian' : 'Dressing Etiquette'}
      lead={language === 'bm'
        ? 'Mari belajar adab berpakaian dalam Islam supaya kita menutup aurat, bersederhana dan sentiasa dalam keredhaan Allah.'
        : 'Let\'s learn the Islamic etiquette of dressing so we cover our aurah, practice moderation, and earn Allah\'s pleasure.'}
      icon="👔"
      theme={THEME}
      topics={EMOJI.map((e) => ({ visual: <span style={{ fontSize: '3.2rem', lineHeight: 1 }}>{e.emoji}</span>, ...e }))}
      questions={QUESTIONS}
      totalRounds={8}
      accentColor="#EC4899"
    />
  );
}
