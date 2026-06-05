import React from 'react';
import Tahun1LessonScrollLayout from '../../Tahun1/Tahun1LessonScrollLayout';
import { shuffle } from '../../_shared/utils';

const TIPS = [
  { id: 'bersuci', icon: '🚿', label: 'Bersuci', desc: 'Berwuduk dengan sempurna dan bersihkan tempat solat.', descEn: 'Perform wudu properly and clean the prayer area.' },
  { id: 'niat', icon: '🎯', label: 'Fokus Niat', desc: 'Niatkan solat hanya kerana Allah dan fokus pada makna bacaan.', descEn: 'Intend prayer only for Allah and focus on the meaning.' },
  { id: 'tenang', icon: '🧘', label: 'Tenang & Perlahan', desc: 'Lakukan setiap pergerakan dengan tenang, tidak tergesa-gesa.', descEn: 'Perform each movement calmly, not rushing.' },
  { id: 'pandangan', icon: '👁️', label: 'Jaga Pandangan', desc: 'Pandang tempat sujud dan elakkan pandangan meliar.', descEn: 'Look at the prostration spot and avoid wandering eyes.' },
  { id: 'faham', icon: '📖', label: 'Fahami Bacaan', desc: 'Fahami maksud bacaan untuk menghayati solat.', descEn: 'Understand the meaning of recitations to appreciate prayer.' },
  { id: 'hiasan', icon: '🚫', label: 'Elakkan Gangguan', desc: 'Solat di tempat sunyi dan matikan telefon bimbit.', descEn: 'Pray in a quiet place and turn off your phone.' },
];

const TOTAL_ROUNDS = 10;

function buildQuestions() {
  const qs = TIPS.map(t => {
    const wrong = shuffle(TIPS.filter(x => x.id !== t.id)).slice(0, 3).map(x => x.label);
    return { question: `Bagaimana cara untuk ${t.label.toLowerCase()} dalam solat?`, answer: t.desc, options: shuffle([t.desc, ...wrong.map(w => TIPS.find(x => x.label === w)?.desc || '')]) };
  });
  qs.push({ question: 'Apakah maksud khusyuk?', answer: 'Fokus dan tenang dalam solat', options: shuffle(['Fokus dan tenang dalam solat', 'Solat cepat selesai', 'Solat berjemaah', 'Banyak pergerakan']) });
  return qs;
}

const THEME = {
  pageGradient: 'radial-gradient(ellipse at top,#EFF6FF 0%,#DBEAFE 60%,#BFDBFE 100%)',
  dark: '#1E40AF',
  accent: '#3B82F6',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#DBEAFE 0%,#93C5FD 55%,#3B82F6 100%)',
  pillGradient: 'linear-gradient(180deg,#93C5FD,#3B82F6)',
};

export default function KhusyukSolat({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Ibadah › "
      breadcrumbActive="Khusyuk dalam Solat"
      title="Khusyuk dalam Solat"
      lead={language === 'bm'
        ? 'Mari pelajari 6 cara untuk mencapai khusyuk dalam solat — bersuci, fokus, tenang, dan fahami bacaan.'
        : 'Learn 6 ways to achieve focus in prayer — purification, intention, calmness, and understanding.'}
      icon="🧘"
      theme={THEME}
      topics={TIPS.map(t => ({
        visual: <span style={{ fontSize: '3rem', lineHeight: 1 }}>{t.icon}</span>,
        title: t.label,
        sublabel: '',
        desc: t.desc,
      }))}
      questions={buildQuestions()}
      totalRounds={TOTAL_ROUNDS}
      accentColor="#3B82F6"
    />
  );
}
