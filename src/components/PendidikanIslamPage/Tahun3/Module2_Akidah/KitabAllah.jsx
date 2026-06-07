import React from 'react';
import Tahun1LessonScrollLayout from '../../Tahun1/Tahun1LessonScrollLayout';
import { shuffle } from '../../_shared/utils';

const KITABS = [
  { id: 'taurat', name: 'Taurat', rasul: 'Nabi Musa a.s.', icon: '📜', desc: 'Kitab Taurat diturunkan kepada Nabi Musa a.s. sebagai petunjuk bagi Bani Israel.', descEn: 'The Torah was revealed to Prophet Moses as guidance for the Children of Israel.' },
  { id: 'zabur', name: 'Zabur', rasul: 'Nabi Daud a.s.', icon: '🎵', desc: 'Kitab Zabur diturunkan kepada Nabi Daud a.s. berisi puji-pujian dan doa.', descEn: 'The Zabur was revealed to Prophet David, containing praises and prayers.' },
  { id: 'injil', name: 'Injil', rasul: 'Nabi Isa a.s.', icon: '✝️', desc: 'Kitab Injil diturunkan kepada Nabi Isa a.s. sebagai petunjuk bagi pengikutnya.', descEn: 'The Gospel was revealed to Prophet Jesus as guidance for his followers.' },
  { id: 'al-quran', name: 'Al-Quran', rasul: 'Nabi Muhammad SAW', icon: '📖', desc: 'Al-Quran diturunkan kepada Nabi Muhammad SAW. Kitab terakhir dan paling lengkap.', descEn: 'The Quran was revealed to Prophet Muhammad. The final and most complete book.' },
];

const TOTAL_ROUNDS = 10;

function buildQuestions() {
  const qs = [];
  KITABS.forEach(k => {
    const wrong = shuffle(KITABS.filter(x => x.id !== k.id)).slice(0, 3).map(x => x.name);
    qs.push({
      question: `Siapakah rasul yang menerima Kitab ${k.name}?`,
      answer: k.rasul,
      options: shuffle([k.rasul, ...wrong.map(w => KITABS.find(x => x.name === w)?.rasul || '')]),
    });
    const wrongDesc = shuffle(KITABS.filter(x => x.id !== k.id)).slice(0, 3).map(x => x.desc);
    qs.push({
      question: `Apakah keterangan tentang Kitab ${k.name}?`,
      answer: k.desc,
      options: shuffle([k.desc, ...wrongDesc]),
    });
  });
  qs.push({
    question: 'Berapakah jumlah kitab yang wajib diketahui?',
    answer: '4',
    options: ['3', '4', '5', '6'],
  });
  qs.push({
    question: 'Kitab manakah yang paling akhir diturunkan?',
    answer: 'Al-Quran',
    options: shuffle(['Al-Quran', 'Taurat', 'Zabur', 'Injil']),
  });
  return qs;
}

const THEME = {
  pageGradient: 'radial-gradient(ellipse at top, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
  dark: '#065F46',
  accent: '#2A9A6C',
  stageGradient: 'radial-gradient(ellipse at 50% 34%, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
  pillGradient: 'linear-gradient(180deg, #2A9A6C, #065F46)',
};

export default function KitabAllah({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Akidah › "
      breadcrumbActive={language === 'bm' ? 'Beriman kepada Kitab-Kitab Allah' : 'Belief in the Books of Allah'}
      title={language === 'bm' ? 'Beriman kepada Kitab-Kitab Allah' : 'Belief in the Books of Allah'}
      lead={language === 'bm'
        ? 'Mari mengenali 4 kitab Allah yang wajib diketahui — Taurat, Zabur, Injil dan Al-Quran.'
        : 'Learn about the 4 books of Allah — Torah, Zabur, Gospel and Quran.'}
      icon="📚"
      theme={THEME}
      topics={KITABS.map(k => ({
        visual: <span style={{ fontSize: '3rem', lineHeight: 1 }}>{k.icon}</span>,
        title: k.name,
        sublabel: k.rasul,
        desc: k.desc,
      }))}
      questions={buildQuestions()}
      totalRounds={TOTAL_ROUNDS}
      accentColor="#2A9A6C"
    />
  );
}
