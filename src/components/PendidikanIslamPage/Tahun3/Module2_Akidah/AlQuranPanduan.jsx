import React from 'react';
import Tahun1LessonScrollLayout from '../../Tahun1/Tahun1LessonScrollLayout';
import { shuffle } from '../../_shared/utils';

const GUIDES = [
  { id: 'petunjuk', icon: '🧭', label: 'Petunjuk Hidup', desc: 'Al-Quran adalah petunjuk lengkap untuk seluruh umat manusia.', descEn: 'The Quran is complete guidance for all mankind.' },
  { id: 'akidah', icon: '🤲', label: 'Asas Akidah', desc: 'Mengajarkan tauhid dan keesaan Allah serta rukun iman.', descEn: 'Teaches tawhid and the oneness of Allah.' },
  { id: 'ibadah', icon: '🕌', label: 'Panduan Ibadah', desc: 'Menerangkan cara beribadah yang betul mengikut syariat.', descEn: 'Explains correct worship according to shariah.' },
  { id: 'akhlak', icon: '💚', label: 'Panduan Akhlak', desc: 'Mengajar adab dan akhlak mulia dalam kehidupan seharian.', descEn: 'Teaches good manners and morals in daily life.' },
  { id: 'hukum', icon: '⚖️', label: 'Sumber Hukum', desc: 'Menjadi sumber utama hukum Islam dan syariat.', descEn: 'The primary source of Islamic law.' },
  { id: 'kisah', icon: '📖', label: 'Kisah Teladan', desc: 'Mengandungi kisah para nabi dan umat terdahulu untuk pengajaran.', descEn: 'Contains stories of prophets and past nations for lessons.' },
];

const TOTAL_ROUNDS = 10;

function buildQuestions() {
  const qs = GUIDES.map(g => {
    const wrong = shuffle(GUIDES.filter(x => x.id !== g.id)).slice(0, 3).map(x => x.label);
    return { question: `Al-Quran sebagai ${g.label.toLowerCase()} — apakah fungsinya?`, answer: g.desc, options: shuffle([g.desc, ...wrong.map(w => GUIDES.find(x => x.label === w)?.desc || '')]), };
  });
  qs.push({
    question: 'Al-Quran diturunkan kepada siapakah?',
    answer: 'Nabi Muhammad SAW',
    options: shuffle(['Nabi Muhammad SAW', 'Nabi Musa a.s.', 'Nabi Isa a.s.', 'Nabi Daud a.s.']),
  });
  return qs;
}

const THEME = {
  pageGradient: 'linear-gradient(180deg,#D6F5DD 0%,#8AD9A8 50%,#5BBF8A 100%)',
  dark: '#065F46',
  accent: '#10B981',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#D6F5DD 0%,#8AD9A8 55%,#2A9A6C 100%)',
  pillGradient: 'linear-gradient(180deg,#8AD9A8,#10B981)',
};

export default function AlQuranPanduan({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Akidah › "
      breadcrumbActive={language === 'bm' ? 'Al-Quran sebagai Panduan Hidup' : 'The Quran as a Life Guide'}
      title={language === 'bm' ? 'Al-Quran sebagai Panduan Hidup' : 'The Quran as a Life Guide'}
      lead={language === 'bm'
        ? 'Al-Quran adalah panduan lengkap — merangkumi akidah, ibadah, akhlak, hukum dan kisah teladan.'
        : 'The Quran is a complete guide — covering faith, worship, manners, law, and exemplary stories.'}
      icon="📖"
      theme={THEME}
      topics={GUIDES.map(g => ({
        visual: <span style={{ fontSize: '3rem', lineHeight: 1 }}>{g.icon}</span>,
        title: g.label,
        sublabel: '',
        desc: g.desc,
      }))}
      questions={buildQuestions()}
      totalRounds={TOTAL_ROUNDS}
      accentColor="#10B981"
    />
  );
}
