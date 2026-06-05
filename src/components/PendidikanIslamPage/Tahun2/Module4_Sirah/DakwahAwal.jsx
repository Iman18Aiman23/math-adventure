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
  { icon: '🤫', label: 'Dakwah Secara Sembunyi', sublabel: '3 tahun pertama', desc: 'Nabi berdakwah secara sembunyi selama 3 tahun. Seruan hanya kepada keluarga terdekat dan sahabat karib.' },
  { icon: '👥', label: 'Orang Pertama Memeluk Islam', sublabel: 'As-Sabiqun al-Awwalun', desc: 'Orang pertama memeluk Islam: Siti Khadijah, Ali bin Abi Talib, Abu Bakar, dan Zaid bin Harithah.' },
  { icon: '📢', label: 'Dakwah Terang-terangan', sublabel: 'Seruan di Bukit Safa', desc: 'Selepas 3 tahun, Allah memerintahkan Nabi berdakwah secara terang-terangan di Bukit Safa.' },
  { icon: '😤', label: 'Reaksi Kafir Quraisy', sublabel: 'Ejekan & ancaman', desc: 'Kaum kafir Quraisy mengejek, mengancam, dan menentang Nabi. Abu Lahab sangat giat memusuhi Nabi.' },
  { icon: '⛓️', label: 'Sekatan & Pemulauan', sublabel: 'Boikot Bani Hashim', desc: 'Kafir Quraisy memulau Bani Hashim — tidak berniaga, berkahwin, atau bergaul dengan Nabi. Berlangsung 3 tahun.' },
  { icon: '🔥', label: 'Penyeksaan terhadap Bilal', sublabel: 'Diseksa di padang pasir', desc: 'Bilal bin Rabah diseksa dengan dibaringkan di padang pasir dan diletakkan batu besar di dada. Beliau tetap setia.' },
  { icon: '💔', label: 'Penyeksaan terhadap Ammar & Sumayyah', sublabel: 'Keluarga Yasir', desc: 'Keluarga Yasir diseksa dengan kejam. Sumayyah dan Yasir mati syahid — syuhada pertama dalam Islam.' },
  { icon: '🚢', label: 'Hijrah Pertama ke Habsyah', sublabel: 'Perlindungan di Abbysinia', desc: 'Nabi memerintahkan sebahagian sahabat berhijrah ke Habsyah. Raja Najashi yang adil memberi perlindungan.' },
];

const TOPICS = KONSEP.map(k => ({
  visual: <span style={{ fontSize: '2.8rem', lineHeight: 1 }}>{k.icon}</span>,
  title: k.label,
  sublabel: k.sublabel,
  desc: k.desc,
}));

const QUESTIONS = shuffle([
  { question: 'Berapa lama Nabi berdakwah secara sembunyi?', answer: '3 tahun', options: ['3 tahun', '1 tahun', '5 tahun', '10 tahun'] },
  { question: 'Siapa orang pertama memeluk Islam?', answer: 'Siti Khadijah', options: ['Siti Khadijah', 'Abu Bakar', 'Ali bin Abi Talib', 'Zaid bin Harithah'] },
  { question: 'Di mana Nabi menyeru dakwah secara terang-terangan?', answer: 'Bukit Safa', options: ['Bukit Safa', 'Gua Hira\'', 'Masjidil Haram', 'Pasar Mekah'] },
  { question: 'Siapa yang sangat memusuhi Nabi dari kalangan bapa saudara?', answer: 'Abu Lahab', options: ['Abu Lahab', 'Abu Talib', 'Hamzah', 'Abbas'] },
  { question: 'Apa yang dilakukan kafir Quraisy untuk menyekat dakwah?', answer: 'Sekatan dan pemulauan', options: ['Sekatan dan pemulauan', 'Perang', 'Berdakwah balik', 'Lari'] },
  { question: 'Siapa sahabat yang diseksa dengan batu di dada?', answer: 'Bilal bin Rabah', options: ['Bilal bin Rabah', 'Ammar bin Yasir', 'Abu Bakar', 'Ali bin Abi Talib'] },
  { question: 'Siapa syuhada pertama dalam Islam?', answer: 'Sumayyah', options: ['Sumayyah', 'Khadijah', 'Fatimah', 'Aisyah'] },
  { question: 'Ke mana sahabat berhijrah untuk selamat dari penyiksaan?', answer: 'Habsyah', options: ['Habsyah', 'Madinah', 'Taif', 'Mesir'] },
  { question: 'Siapa raja Habsyah yang melindungi sahabat?', answer: 'Najashi', options: ['Najashi', 'Heraclius', 'Kisra', 'Firaun'] },
  { question: 'Siapa yang menyertai Nabi sebagai pemeluk Islam awal selain Khadijah?', answer: 'Ali, Abu Bakar, Zaid', options: ['Ali, Abu Bakar, Zaid', 'Umar, Hamzah, Khalid', 'Uthman, Talhah, Zubair', 'Abu Lahab, Abu Sufyan'] },
]);

export default function DakwahAwal({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Sirah › "
      breadcrumbActive={language === 'bm' ? 'Dakwah Awal & Penentangan' : 'Early Da\'wah & Opposition'}
      title={language === 'bm' ? 'Dakwah Awal & Penentangan' : 'Early Da\'wah & Opposition'}
      lead={language === 'bm'
        ? 'Mari belajar bagaimana Nabi Muhammad SAW berdakwah dan menghadapi penentangan kaum Quraisy.'
        : 'Let\'s learn how Prophet Muhammad SAW conveyed the message and faced opposition from the Quraish.'}
      icon="🕊️"
      theme={THEME}
      topics={TOPICS}
      questions={QUESTIONS}
      totalRounds={10}
      accentColor="#8B5CF6"
    />
  );
}
