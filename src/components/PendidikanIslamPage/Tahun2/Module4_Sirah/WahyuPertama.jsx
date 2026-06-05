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
  { icon: '🏔️', label: 'Berkhalwat di Gua Hira\'', sublabel: 'Mengasingkan diri', desc: 'Nabi Muhammad SAW sering berkhalwat di Gua Hira\' untuk beribadat dan merenung ciptaan Allah.' },
  { icon: '👼', label: 'Malaikat Jibril Datang', sublabel: 'Utusan Allah', desc: 'Malaikat Jibril datang kepada Nabi ketika baginda sedang berkhalwat di Gua Hira\'.' },
  { icon: '📖', label: 'Perintah "Iqra!"', sublabel: 'Bacalah!', desc: 'Jibril memerintahkan Nabi membaca dengan berkata "Iqra!" (Bacalah!), diulang sebanyak tiga kali.' },
  { icon: '📜', label: 'Surah Al-Alaq 1-5', sublabel: 'Wahyu pertama', desc: 'Surah Al-Alaq ayat 1 hingga 5 diturunkan sebagai wahyu pertama, menyeru manusia membaca dan belajar.' },
  { icon: '😰', label: 'Nabi Rasa Takut', sublabel: 'Menggigil ketakutan', desc: 'Selepas menerima wahyu, Nabi berasa sangat takut dan pulang kepada Siti Khadijah dalam keadaan cemas.' },
  { icon: '🤱', label: 'Khadijah Menenangkan', sublabel: 'Isteri yang setia', desc: 'Siti Khadijah menenangkan Nabi dan meyakinkan baginda bahawa Allah tidak akan menghinakan orang yang baik.' },
  { icon: '👴', label: 'Waraqah bin Naufal', sublabel: 'Mengesahkan kenabian', desc: 'Waraqah bin Naufal mengesahkan yang datang kepada Nabi adalah Jibril, malaikat yang sama diutus kepada Nabi Musa.' },
];

const TOPICS = KONSEP.map(k => ({
  visual: <span style={{ fontSize: '2.8rem', lineHeight: 1 }}>{k.icon}</span>,
  title: k.label,
  sublabel: k.sublabel,
  desc: k.desc,
}));

const QUESTIONS = shuffle([
  { question: 'Di manakah Nabi berkhalwat sebelum menerima wahyu?', answer: 'Gua Hira\'', options: ['Gua Hira\'', 'Gua Thur', 'Masjidil Haram', 'Rumah Khadijah'] },
  { question: 'Malaikat apa yang menyampaikan wahyu pertama?', answer: 'Jibril', options: ['Jibril', 'Mikail', 'Israfil', 'Izrail'] },
  { question: 'Apa perintah pertama yang disampaikan oleh Jibril?', answer: 'Iqra! (Bacalah!)', options: ['Iqra! (Bacalah!)', 'Sembahyanglah!', 'Berpuasalah!', 'Bersedekahlah!'] },
  { question: 'Berapa kali Jibril menyuruh Nabi membaca?', answer: '3 kali', options: ['3 kali', '1 kali', '2 kali', '5 kali'] },
  { question: 'Surah apa yang diturunkan sebagai wahyu pertama?', answer: 'Al-Alaq', options: ['Al-Alaq', 'Al-Fatihah', 'Al-Ikhlas', 'An-Nas'] },
  { question: 'Siapa yang menenangkan Nabi selepas menerima wahyu?', answer: 'Siti Khadijah', options: ['Siti Khadijah', 'Abu Bakar', 'Ali bin Abi Talib', 'Aminah'] },
  { question: 'Siapa yang mengesahkan kenabian Nabi Muhammad?', answer: 'Waraqah bin Naufal', options: ['Waraqah bin Naufal', 'Abu Lahab', 'Abdul Muttalib', 'Abu Talib'] },
  { question: 'Apa perasaan Nabi selepas menerima wahyu pertama?', answer: 'Takut dan menggigil', options: ['Takut dan menggigil', 'Gembira', 'Marah', 'Biasa sahaja'] },
]);

export default function WahyuPertama({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Sirah › "
      breadcrumbActive={language === 'bm' ? 'Wahyu Pertama di Gua Hira\'' : 'First Revelation at Cave Hira\''}
      title={language === 'bm' ? 'Wahyu Pertama di Gua Hira\'' : 'First Revelation at Cave Hira\''}
      lead={language === 'bm'
        ? 'Mari belajar kisah turunnya wahyu pertama kepada Nabi Muhammad SAW di Gua Hira\'.'
        : 'Let\'s learn the story of the first revelation to Prophet Muhammad SAW at Cave Hira\'.'}
      icon="📖"
      theme={THEME}
      topics={TOPICS}
      questions={QUESTIONS}
      totalRounds={8}
      accentColor="#8B5CF6"
    />
  );
}
