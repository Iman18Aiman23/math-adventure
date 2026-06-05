import React from 'react';
import Tahun1LessonScrollLayout from '../../Tahun1/Tahun1LessonScrollLayout';
import { shuffle } from '../../_shared/utils';

const THEME = {
  pageGradient: 'radial-gradient(ellipse at top,#F5F3FF 0%,#DDD6FE 60%,#8B5CF6 100%)',
  dark: '#4C1D95',
  accent: '#8B5CF6',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#EDE9FE 0%,#C4B5FD 55%,#8B5CF6 100%)',
  pillGradient: 'linear-gradient(180deg,#A78BFA,#7C3AED)',
};

const KONSEP = [
  { icon: '🪨', label: 'Batu Memberi Salam', sublabel: 'Sebelum kerasulan', desc: 'Sebelum diangkat menjadi rasul, batu-batu di Mekah memberi salam kepada Nabi Muhammad SAW.' },
  { icon: '🌴', label: 'Pokok Memberi Perlindungan', sublabel: 'Naungan dari alam', desc: 'Pokok dan pepohon memberikan perlindungan kepada Nabi ketika musim panas yang terik.' },
  { icon: '📜', label: 'Disebut dalam Kitab', sublabel: 'Taurat & Injil', desc: 'Nama Nabi Muhammad SAW telah disebut dalam kitab Taurat dan Injil sebagai nabi terakhir.' },
  { icon: '✨', label: 'Cahaya di Wajah', sublabel: 'Sejak kecil', desc: 'Sejak kecil, cahaya kenabian kelihatan pada wajah Nabi Muhammad SAW.' },
  { icon: '🫀', label: 'Pembelahan Dada', sublabel: 'Pembersihan oleh malaikat', desc: 'Malaikat Jibril membelah dada Nabi untuk membersihkan hatinya dengan air zamzam.' },
  { icon: '🌿', label: 'Rahmat & Keberkatan', sublabel: 'Menyertai Baginda', desc: 'Di mana sahaja Nabi berada, rahmat dan keberkatan menyertai baginda.' },
];

const TOPICS = KONSEP.map(k => ({
  visual: <span style={{ fontSize: '2.8rem', lineHeight: 1 }}>{k.icon}</span>,
  title: k.label,
  sublabel: k.sublabel,
  desc: k.desc,
}));

const QUESTIONS = shuffle([
  { question: 'Apa yang memberi salam kepada Nabi sebelum kerasulan?', answer: 'Batu', options: ['Batu', 'Pokok', 'Malaikat', 'Haiwan'] },
  { question: 'Apa tanda alam yang menunjukkan kemuliaan Nabi?', answer: 'Pokok memberi perlindungan', options: ['Pokok memberi perlindungan', 'Pokok berbuah', 'Pokok bercakap', 'Pokok menari'] },
  { question: 'Di mana nama Nabi disebut sebelum kelahirannya?', answer: 'Taurat dan Injil', options: ['Taurat dan Injil', 'Zabur sahaja', 'Kitab Mesir', 'Kitab Yunani'] },
  { question: 'Apa yang kelihatan pada wajah Nabi sejak kecil?', answer: 'Cahaya', options: ['Cahaya', 'Bintik hitam', 'Peluh', 'Air mata'] },
  { question: 'Siapa yang membelah dada Nabi untuk dibersihkan?', answer: 'Malaikat Jibril', options: ['Malaikat Jibril', 'Malaikat Mikail', 'Malaikat Israfil', 'Malaikat Izrail'] },
  { question: 'Hati Nabi dibersihkan dengan apa?', answer: 'Air zamzam', options: ['Air zamzam', 'Air mawar', 'Air madu', 'Air sungai'] },
  { question: 'Apa tanda kerasulan yang berkaitan dengan kitab?', answer: 'Nama Nabi disebut dalam kitab', options: ['Nama Nabi disebut dalam kitab', 'Nabi menulis kitab', 'Nabi membaca kitab', 'Kitab turun kepada Nabi'] },
  { question: 'Keberkatan dan rahmat menyertai Nabi di mana?', answer: 'Di mana sahaja', options: ['Di mana sahaja', 'Di Mekah sahaja', 'Di Madinah sahaja', 'Di masjid sahaja'] },
]);

export default function TandaKerasulan({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Sirah › "
      breadcrumbActive={language === 'bm' ? 'Tanda-tanda Kerasulan' : 'Signs of Prophethood'}
      title={language === 'bm' ? 'Tanda-tanda Kerasulan' : 'Signs of Prophethood'}
      lead={language === 'bm'
        ? 'Mari belajar tanda-tanda kerasulan Nabi Muhammad SAW sebelum baginda diangkat menjadi rasul.'
        : 'Let\'s learn the signs of prophethood of Prophet Muhammad SAW before he was appointed as a messenger.'}
      icon="🌟"
      theme={THEME}
      topics={TOPICS}
      questions={QUESTIONS}
      totalRounds={8}
      accentColor="#8B5CF6"
    />
  );
}
