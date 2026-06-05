import React from 'react';
import Tahun1LessonScrollLayout from '../../Tahun1/Tahun1LessonScrollLayout';
import { shuffle } from '../../_shared/utils';

const ARTICLES = [
  { id: 'umat', icon: '🤝', label: 'Kesatuan Umat', desc: 'Semua penduduk Madinah adalah satu umat yang bersatu padu.', descEn: 'All Madinah residents are one united community.' },
  { id: 'agama', icon: '🕊️', label: 'Kebebasan Beragama', desc: 'Setiap golongan bebas mengamalkan agama masing-masing.', descEn: 'Each group is free to practice their own religion.' },
  { id: 'bantuan', icon: '🤲', label: 'Bantuan Bersama', desc: 'Semua pihak membantu antara satu sama lain ketika kesusahan.', descEn: 'All parties help each other in times of difficulty.' },
  { id: 'keadilan', icon: '⚖️', label: 'Keadilan', desc: 'Keadilan ditegakkan tanpa mengira latar belakang.', descEn: 'Justice is upheld regardless of background.' },
  { id: 'pertahanan', icon: '🛡️', label: 'Pertahanan Bersama', desc: 'Semua pihak bersama-sama mempertahankan Madinah dari serangan luar.', descEn: 'All parties jointly defend Madinah from outside attack.' },
  { id: 'damaian', icon: '☮️', label: 'Perdamaian', desc: 'Tidak boleh mengadakan perjanjian damai sendiri tanpa persetujuan Nabi.', descEn: 'No separate peace treaties without the Prophet\'s consent.' },
];

const TOTAL_ROUNDS = 10;

function buildQuestions() {
  const qs = ARTICLES.map(a => {
    const wrong = shuffle(ARTICLES.filter(x => x.id !== a.id)).slice(0, 3).map(x => x.label);
    return { question: `Apakah isi Piagam Madinah tentang "${a.label}"?`, answer: a.desc, options: shuffle([a.desc, ...wrong.map(w => ARTICLES.find(x => x.label === w)?.desc || '')]) };
  });
  qs.push({ question: 'Piagam Madinah mengandungi peraturan untuk masyarakat apa?', answer: 'Masyarakat pelbagai agama', options: shuffle(['Masyarakat pelbagai agama', 'Masyarakat Islam sahaja', 'Masyarakat Yahudi sahaja', 'Masyarakat Arab sahaja']) });
  return qs;
}

const THEME = {
  pageGradient: 'radial-gradient(ellipse at top,#F5F3FF 0%,#EDE9FE 60%,#DDD6FE 100%)',
  dark: '#5B21B6',
  accent: '#8B5CF6',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#EDE9FE 0%,#C4B5FD 55%,#8B5CF6 100%)',
  pillGradient: 'linear-gradient(180deg,#C4B5FD,#8B5CF6)',
};

export default function PiagamMadinah({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Sirah › "
      breadcrumbActive="Piagam Madinah"
      title="Piagam Madinah"
      lead={language === 'bm'
        ? 'Mari pelajari 6 isi penting Piagam Madinah — kesatuan, kebebasan, keadilan dan pertahanan bersama.'
        : 'Learn 6 key articles of the Constitution of Madinah — unity, freedom, justice and mutual defense.'}
      icon="📜"
      theme={THEME}
      topics={ARTICLES.map(a => ({
        visual: <span style={{ fontSize: '3rem', lineHeight: 1 }}>{a.icon}</span>,
        title: a.label,
        sublabel: '',
        desc: a.desc,
      }))}
      questions={buildQuestions()}
      totalRounds={TOTAL_ROUNDS}
      accentColor="#8B5CF6"
    />
  );
}
