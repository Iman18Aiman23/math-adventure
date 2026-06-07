import React from 'react';
import Tahun1LessonScrollLayout from '../../Tahun1/Tahun1LessonScrollLayout';
import { ARABIC_FONT } from '../../_shared/arabic';
import { shuffle } from '../../_shared/utils';

const THEME = {
  pageGradient: 'linear-gradient(180deg, #D6EEFF 0%, #EBF5FF 40%, #F5F9FF 100%)',
  dark: '#2563EB',
  accent: '#3B82F6',
  stageGradient: 'linear-gradient(145deg, #2563EB, #3B82F6, #60A5FA)',
  pillGradient: 'linear-gradient(135deg, #3B82F6, #60A5FA)',
};

const AZAN = [
  { n: 1, ar: 'ٱللَّهُ أَكْبَرُ، ٱللَّهُ أَكْبَرُ', label: 'Allahu Akbar, Allahu Akbar', response: 'ٱللَّهُ أَكْبَرُ، ٱللَّهُ أَكْبَرُ' },
  { n: 2, ar: 'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا ٱللَّهُ', label: "Ashhadu alla ilaha illallah", response: 'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا ٱللَّهُ' },
  { n: 3, ar: 'أَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ ٱللَّهِ', label: "Ashhadu anna Muhammadar Rasulullah", response: 'أَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ ٱللَّهِ' },
  { n: 4, ar: 'حَيَّ عَلَى ٱلصَّلَاةِ', label: 'Hayya alas-solah', response: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِٱللَّهِ' },
  { n: 5, ar: 'حَيَّ عَلَى ٱلْفَلَاحِ', label: 'Hayya alal-falah', response: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِٱللَّهِ' },
  { n: 6, ar: 'ٱللَّهُ أَكْبَرُ، ٱللَّهُ أَكْبَرُ', label: 'Allahu Akbar, Allahu Akbar', response: 'ٱللَّهُ أَكْبَرُ، ٱللَّهُ أَكْبَرُ' },
  { n: 7, ar: 'لَا إِلَٰهَ إِلَّا ٱللَّهُ', label: 'La ilaha illallah', response: 'لَا إِلَٰهَ إِلَّا ٱللَّهُ' },
];

const IQAMAH = [
  { n: 1, ar: 'ٱللَّهُ أَكْبَرُ، ٱللَّهُ أَكْبَرُ', label: 'Allahu Akbar, Allahu Akbar' },
  { n: 2, ar: 'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا ٱللَّهُ', label: "Ashhadu alla ilaha illallah" },
  { n: 3, ar: 'أَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ ٱللَّهِ', label: "Ashhadu anna Muhammadar Rasulullah" },
  { n: 4, ar: 'حَيَّ عَلَى ٱلصَّلَاةِ', label: 'Hayya alas-solah' },
  { n: 5, ar: 'حَيَّ عَلَى ٱلْفَلَاحِ', label: 'Hayya alal-falah' },
  { n: 6, ar: 'قَدْ قَامَتِ ٱلصَّلَاةُ', label: 'Qad qamatis-solah, Qad qamatis-solah' },
  { n: 7, ar: 'لَا إِلَٰهَ إِلَّا ٱللَّهُ', label: 'Allahu Akbar, Allahu Akbar · La ilaha illallah' },
];

const TOPICS_AZAN = AZAN.map(a => ({
  visual: <span style={{ fontFamily: ARABIC_FONT, fontSize: '1.4rem', lineHeight: 1.2, color: '#1E40AF', direction: 'rtl', textAlign: 'center' }}>{a.ar}</span>,
  title: a.label,
  sublabel: `Azan #${a.n}`,
  desc: `Jawab: ${a.response}`,
}));

const TOPICS_IQAMAH = IQAMAH.map(i => ({
  visual: <span style={{ fontFamily: ARABIC_FONT, fontSize: '1.4rem', lineHeight: 1.2, color: '#1E40AF', direction: 'rtl', textAlign: 'center' }}>{i.ar}</span>,
  title: i.label,
  sublabel: `Iqamah #${i.n}`,
  desc: 'Lafaz iqamah untuk memulakan solat berjemaah.',
}));

const TOPICS = [...TOPICS_AZAN, ...TOPICS_IQAMAH];

function buildQuestions() {
  const qs = [];
  const azanLabels = AZAN.map(a => a.label);
  const iqamahLabels = IQAMAH.map(i => i.label);

  AZAN.slice(0, 4).forEach(a => {
    const wrong = shuffle(azanLabels.filter(x => x !== a.label)).slice(0, 3);
    qs.push({ question: 'Antara berikut, yang manakah lafaz AZAN?', answer: a.label, options: shuffle([a.label, ...wrong]) });
  });

  IQAMAH.slice(0, 3).forEach(i => {
    const wrong = shuffle(iqamahLabels.filter(x => x !== i.label)).slice(0, 3);
    qs.push({ question: 'Antara berikut, yang manakah lafaz IQAMAH?', answer: i.label, options: shuffle([i.label, ...wrong]) });
  });

  qs.push({ question: 'Apakah lafaz yang hanya ada dalam IQAMAH (tidak dalam AZAN)?', answer: 'Qad qamatis-solah, Qad qamatis-solah', options: shuffle(['Qad qamatis-solah, Qad qamatis-solah', 'Hayya alal-falah', 'Hayya alas-solah', 'Allahu Akbar, Allahu Akbar']) });
  qs.push({ question: 'Apakah jawapan ketika mendengar "Hayya alas-solah"?', answer: 'La haula wala quwwata illa billah', options: shuffle(['La haula wala quwwata illa billah', 'Allahu Akbar', 'Ashhadu alla ilaha illallah', 'Sami allahu liman hamidah']) });
  qs.push({ question: 'Apakah jawapan ketika mendengar "Hayya alal-falah"?', answer: 'La haula wala quwwata illa billah', options: shuffle(['La haula wala quwwata illa billah', 'Allahu Akbar', 'Ashhadu anna Muhammadar Rasulullah', 'Alhamdulillah']) });
  qs.push({ question: 'Apakah lafaz pertama dalam Azan?', answer: 'Allahu Akbar, Allahu Akbar', options: shuffle(['Allahu Akbar, Allahu Akbar', "Ashhadu alla ilaha illallah", "Ashhadu anna Muhammadar Rasulullah", 'Hayya alas-solah']) });
  qs.push({ question: 'Apakah lafaz terakhir dalam Azan?', answer: 'La ilaha illallah', options: shuffle(['La ilaha illallah', 'Allahu Akbar, Allahu Akbar', 'Hayya alal-falah', 'Qad qamatis-solah']) });

  return shuffle(qs);
}

const QUESTIONS = buildQuestions();

export default function AzanIqamah({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Ibadah › "
      breadcrumbActive={language === 'bm' ? 'Azan & Iqamah' : 'Adhan & Iqamah'}
      title={language === 'bm' ? 'Azan & Iqamah' : 'Adhan & Iqamah'}
      lead={language === 'bm'
        ? 'Mari belajar lafaz azan dan iqamah serta cara menjawab azan dengan betul.'
        : 'Let\'s learn the phrases of adhan and iqamah and how to respond to the call to prayer.'}
      icon="🔊"
      theme={THEME}
      topics={TOPICS}
      questions={QUESTIONS}
      totalRounds={8}
      accentColor="#3B82F6"
    />
  );
}
