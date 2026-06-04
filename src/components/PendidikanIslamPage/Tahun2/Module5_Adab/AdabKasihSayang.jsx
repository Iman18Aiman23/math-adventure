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
  { emoji: '💬', sublabel: 'Lembut dan hormat', title: 'Bercakap dengan Sopan', desc: 'Bercakaplah dengan sopan dan lembut kepada ibu bapa. Jangan bercakap kasar, meninggikan suara atau membantah kata-kata mereka.' },
  { emoji: '👂', sublabel: 'Ibu bapa dan keluarga', title: 'Mendengar Nasihat', desc: 'Dengarlah nasihat ibu bapa dengan penuh perhatian. Nasihat mereka adalah untuk kebaikan kita. Jangan menentang atau mengabaikan kata-kata mereka.' },
  { emoji: '🧹', sublabel: 'Tolong-menolong', title: 'Membantu Kerja Rumah', desc: 'Bantulah ibu bapa membuat kerja rumah seperti mengemas rumah, membasuh pinggan, atau menyapu lantai. Ini menunjukkan kita sayang kepada mereka.' },
  { emoji: '🤲', sublabel: 'Doa untuk mereka', title: 'Mendoakan Ibu Bapa', desc: 'Jangan lupa mendoakan kedua ibu bapa: "Rabbighfirli wa liwalidayya warhamhuma kama rabbayani saghira." — Ya Allah, ampunilah aku dan kedua ibu bapaku.' },
  { emoji: '✋', sublabel: 'Tanda hormat', title: 'Mencium Tangan Ibu Bapa', desc: 'Biasakan mencium tangan ibu bapa ketika hendak pergi ke sekolah atau sebelum tidur. Ini menunjukkan kasih sayang dan hormat kepada mereka.' },
  { emoji: '🏠', sublabel: 'Jaga maruah', title: 'Menjaga Nama Baik Keluarga', desc: 'Jagalah nama baik keluarga dengan berkelakuan baik di luar rumah. Jangan melakukan perkara yang memalukan ibu bapa dan keluarga.' },
  { emoji: '🙏', sublabel: 'Hargai keluarga', title: 'Bersyukur atas Kasih Sayang', desc: 'Bersyukurlah atas kasih sayang yang diberi oleh ibu bapa dan keluarga. Ucapkan terima kasih dan hargai setiap pengorbanan mereka untuk kita.' },
];

const QUESTIONS = shuffle([
  { question: 'Bagaimana cara bercakap dengan ibu bapa?', answer: 'Sopan dan lembut', options: ['Sopan dan lembut', 'Kasar', 'Bentak', 'Teriak'] },
  { question: 'Apa yang kita buat dengan nasihat ibu bapa?', answer: 'Dengar dan ikut', options: ['Dengar dan ikut', 'Abai', 'Tolak', 'Marah'] },
  { question: 'Antara cara membantu ibu bapa di rumah?', answer: 'Membantu kerja rumah', options: ['Membantu kerja rumah', 'Bermain', 'Menonton TV', 'Tidur'] },
  { question: 'Kita perlu mendoakan?', answer: 'Kedua ibu bapa', options: ['Kedua ibu bapa', 'Diri sendiri', 'Kawan', 'Guru'] },
  { question: 'Apa tanda hormat kepada ibu bapa?', answer: 'Mencium tangan mereka', options: ['Mencium tangan mereka', 'Menjerit', 'Membaling', 'Menghentak'] },
  { question: 'Di luar rumah, kita perlu menjaga?', answer: 'Nama baik keluarga', options: ['Nama baik keluarga', 'Diri sendiri', 'Kawan', 'Harta'] },
  { question: 'Perasaan kita terhadap kasih sayang keluarga?', answer: 'Bersyukur', options: ['Bersyukur', 'Marah', 'Benci', 'Dendam'] },
  { question: 'Kita perlu ucapkan apa kepada ibu bapa?', answer: 'Terima kasih', options: ['Terima kasih', 'Selamat tinggal', 'Maaf', 'Tidak apa'] },
]);

export default function AdabKasihSayang({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Modul 5 · Adab › "
      breadcrumbActive={language === 'bm' ? 'Adab Kasih Sayang' : 'Affection Etiquette'}
      title={language === 'bm' ? 'Adab Kasih Sayang' : 'Affection Etiquette'}
      lead={language === 'bm'
        ? 'Mari belajar adab terhadap ibu bapa dan keluarga sebagai tanda kasih sayang dan ketaatan kepada Allah.'
        : 'Let\'s learn the etiquette towards parents and family as a sign of love and obedience to Allah.'}
      icon="💖"
      theme={THEME}
      topics={EMOJI.map((e) => ({ visual: <span style={{ fontSize: '3.2rem', lineHeight: 1 }}>{e.emoji}</span>, ...e }))}
      questions={QUESTIONS}
      totalRounds={8}
      accentColor="#EC4899"
    />
  );
}
