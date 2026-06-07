import React from 'react';
import Tahun1LessonScrollLayout from '../../Tahun1/Tahun1LessonScrollLayout';
import { shuffle } from '../../_shared/utils';

const MARKS = [
  { id: 'koma', mark: '،', name: 'Koma', desc: 'Tanda koma dalam Jawi digunakan untuk memisahkan ayat atau kata.', descEn: 'Comma in Jawi is used to separate clauses or words.', contoh: 'ساي مماكي، منوم، دان ممباخ' },
  { id: 'tanya', mark: '؟', name: 'Tanya', desc: 'Tanda soal dalam Jawi diletakkan di hujung ayat tanya.', descEn: 'Question mark in Jawi is placed at the end of a question.', contoh: 'أڤ كابر نام ايبو؟' },
  { id: 'seru', mark: '!', name: 'Seruan', desc: 'Tanda seruan menunjukkan perasaan terkejut, gembira atau marah.', descEn: 'Exclamation mark shows surprise, joy or anger.', contoh: 'باغوسث!' },
  { id: 'titik', mark: '۔', name: 'Titik', desc: 'Tanda noktah menandakan tamatnya sesuatu ayat.', descEn: 'Full stop marks the end of a sentence.', contoh: 'ساي سوکا مالن. ابو مالم' },
];

const TOTAL_ROUNDS = 10;

function buildQuestions() {
  const qs = MARKS.map(m => {
    const wrong = shuffle(MARKS.filter(x => x.id !== m.id)).slice(0, 3).map(x => x.name);
    return { question: `Apakah nama tanda baca Jawi "${m.mark}"?`, answer: m.name, options: shuffle([m.name, ...wrong]) };
  });
  MARKS.forEach(m => {
    const wrongDesc = shuffle(MARKS.filter(x => x.id !== m.id)).slice(0, 3).map(x => x.desc);
    qs.push({ question: `Apakah fungsi tanda "${m.mark}" dalam Jawi?`, answer: m.desc, options: shuffle([m.desc, ...wrongDesc]) });
  });
  return qs.slice(0, TOTAL_ROUNDS);
}

const THEME = {
  pageGradient: 'radial-gradient(ellipse at top, #FEF3C7 0%, #FDBA74 55%, #F97316 100%)',
  dark: '#C2410C',
  accent: '#F97316',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#FFEDD5 0%,#FDBA74 55%,#F97316 100%)',
  pillGradient: 'linear-gradient(180deg,#FDBA74,#F97316)',
};

export default function TandaBacaJawi({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Celik Jawi › "
      breadcrumbActive="Tanda Baca Jawi"
      title="Tanda Baca Jawi"
      lead={language === 'bm'
        ? 'Mari kenali 4 tanda baca dalam tulisan Jawi — koma, tanya, seruan dan noktah.'
        : 'Learn 4 punctuation marks in Jawi script — comma, question mark, exclamation, and full stop.'}
      icon="✏️"
      theme={THEME}
      topics={MARKS.map(m => ({
        visual: (
          <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '2.5rem', color: '#C2410C', lineHeight: 1 }}>{m.mark}</span>
        ),
        title: m.name,
        sublabel: m.contoh,
        desc: m.desc,
      }))}
      questions={buildQuestions()}
      totalRounds={TOTAL_ROUNDS}
      accentColor="#F97316"
    />
  );
}
