import React from 'react';
import Tahun1LessonScrollLayout from '../../Tahun1/Tahun1LessonScrollLayout';
import { shuffle } from '../../_shared/utils';

const ETIQUETTES = [
  { id: 'niat', icon: '🎯', label: 'Niat Ikhlas', desc: 'Niat menuntut ilmu kerana Allah SWT, bukan kerana dunia.', descEn: 'Intend to seek knowledge for Allah, not for worldly gains.' },
  { id: 'hormat', icon: '🙏', label: 'Hormati Guru', desc: 'Bersikap sopan, dengar ajaran guru dan jangan memotong cakap guru.', descEn: 'Be polite, listen to the teacher, don\'t interrupt.' },
  { id: 'tekun', icon: '📚', label: 'Tekun Belajar', desc: 'Rajin membaca, mengulang kaji dan membuat latihan yang diberi.', descEn: 'Diligently read, revise, and do assigned exercises.' },
  { id: 'tanya', icon: '❓', label: 'Bertanya', desc: 'Bertanya jika tidak faham dengan cara yang sopan.', descEn: 'Ask questions politely if you don\'t understand.' },
  { id: 'disiplin', icon: '⏰', label: 'Disiplin', desc: 'Datang awal ke sekolah, berpakaian kemas dan menjaga masa.', descEn: 'Come early to school, dress neatly, and manage time.' },
  { id: 'doa', icon: '🤲', label: 'Bersyukur & Berdoa', desc: 'Bersyukur dengan ilmu dan berdoa agar ilmu diberkati.', descEn: 'Be grateful for knowledge and pray for it to be blessed.' },
];

const TOTAL_ROUNDS = 10;

function buildQuestions() {
  const qs = ETIQUETTES.map(e => {
    const wrong = shuffle(ETIQUETTES.filter(x => x.id !== e.id)).slice(0, 3).map(x => x.label);
    return { question: `Apakah adab "${e.label}" dalam menuntut ilmu?`, answer: e.desc, options: shuffle([e.desc, ...wrong.map(w => ETIQUETTES.find(x => x.label === w)?.desc || '')]) };
  });
  qs.push({ question: 'Siapa yang patut kita hormati ketika menuntut ilmu?', answer: 'Guru', options: shuffle(['Guru', 'Kawan', 'Adik', 'Jiran']) });
  return qs;
}

const THEME = {
  pageGradient: 'radial-gradient(ellipse at top,#FFF1F2 0%,#FDF2F8 60%,#FCE7F3 100%)',
  dark: '#BE185D',
  accent: '#EC4899',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#FDF2F8 0%,#FBCFE8 55%,#EC4899 100%)',
  pillGradient: 'linear-gradient(180deg,#FBCFE8,#EC4899)',
};

export default function AdabMenuntutIlmu({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Adab & Akhlak › "
      breadcrumbActive="Adab Menuntut Ilmu"
      title="Adab Menuntut Ilmu"
      lead={language === 'bm'
        ? 'Mari pelajari 6 adab menuntut ilmu — niat ikhlas, hormati guru, tekun, bertanya, disiplin dan berdoa.'
        : 'Learn 6 etiquette of seeking knowledge — sincere intention, respect teachers, diligence, ask, discipline, and pray.'}
      icon="📚"
      theme={THEME}
      topics={ETIQUETTES.map(e => ({
        visual: <span style={{ fontSize: '3rem', lineHeight: 1 }}>{e.icon}</span>,
        title: e.label,
        sublabel: '',
        desc: e.desc,
      }))}
      questions={buildQuestions()}
      totalRounds={TOTAL_ROUNDS}
      accentColor="#EC4899"
    />
  );
}
