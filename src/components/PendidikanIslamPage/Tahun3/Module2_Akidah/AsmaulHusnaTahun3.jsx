import React from 'react';
import Tahun1LessonScrollLayout from '../../Tahun1/Tahun1LessonScrollLayout';
import { ARABIC_FONT } from '../../_shared/arabic';
import { shuffle } from '../../_shared/utils';

const NAMES = [
  { id: 'al-alim', ar: 'العليم', name: 'Al-Alim', arti: 'Maha Mengetahui', artiEn: 'All-Knowing', desc: 'Allah mengetahui segala sesuatu yang telah berlaku, sedang berlaku, dan akan berlaku.', descEn: 'Allah knows everything that has happened, is happening, and will happen.' },
  { id: 'al-hakim', ar: 'الحكيم', name: 'Al-Hakim', arti: 'Maha Bijaksana', artiEn: 'All-Wise', desc: 'Allah Maha Bijaksana dalam setiap ketentuan dan perintahNya.', descEn: 'Allah is All-Wise in every decree and command.' },
];

const TOTAL_ROUNDS = 10;

function buildQuestions() {
  const qs = [];
  NAMES.forEach(n => {
    const wrong = shuffle(NAMES.filter(x => x.id !== n.id)).slice(0, 3).map(x => x.arti);
    qs.push({ question: `Apakah maksud ${n.name}?`, answer: n.arti, options: shuffle([n.arti, ...wrong]) });
    const wrongDesc = shuffle(NAMES.filter(x => x.id !== n.id)).slice(0, 3).map(x => x.desc);
    qs.push({ question: `Apakah pengertian ${n.name}?`, answer: n.desc, options: shuffle([n.desc, ...wrongDesc]) });
  });
  if (qs.length > 10) qs.length = 10;
  return qs;
}

const THEME = {
  pageGradient: 'linear-gradient(180deg,#D6F5DD 0%,#8AD9A8 50%,#5BBF8A 100%)',
  dark: '#065F46',
  accent: '#10B981',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#D6F5DD 0%,#8AD9A8 55%,#2A9A6C 100%)',
  pillGradient: 'linear-gradient(180deg,#8AD9A8,#10B981)',
};

export default function AsmaulHusnaTahun3({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Akidah › "
      breadcrumbActive={language === 'bm' ? 'Asmaul Husna: Al-Alim & Al-Hakim' : 'Asmaul Husna: Al-Alim & Al-Hakim'}
      title={language === 'bm' ? 'Asmaul Husna: Al-Alim & Al-Hakim' : 'Asmaul Husna: Al-Alim & Al-Hakim'}
      lead={language === 'bm'
        ? 'Mari mengenali dua nama Allah yang indah — Al-Alim (Maha Mengetahui) dan Al-Hakim (Maha Bijaksana).'
        : 'Learn two beautiful names of Allah — Al-Alim (All-Knowing) and Al-Hakim (All-Wise).'}
      icon="🤲"
      theme={THEME}
      topics={NAMES.map(n => ({
        visual: (
          <span style={{ fontFamily: ARABIC_FONT, fontWeight: 700, fontSize: '2.2rem', color: '#065F46' }}>{n.ar}</span>
        ),
        title: n.name,
        sublabel: n.arti,
        desc: n.desc,
      }))}
      questions={buildQuestions()}
      totalRounds={TOTAL_ROUNDS}
      accentColor="#10B981"
    />
  );
}
