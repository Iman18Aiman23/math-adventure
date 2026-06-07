import React from 'react';
import Tahun1LessonScrollLayout from '../../Tahun1/Tahun1LessonScrollLayout';
import { shuffle } from '../../_shared/utils';

const TRAITS = [
  { id: 'amanah', icon: '🤲', label: 'Amanah', desc: 'Nabi SAW sangat amanah dalam setiap urusan, tidak pernah mengkhianati amanah yang diberi.', descEn: 'The Prophet was trustworthy in all matters, never betraying any trust.' },
  { id: 'siddiq', icon: '💎', label: 'Siddiq (Benar)', desc: 'Nabi SAW sentiasa berkata benar dalam setiap perkataan dan perbuatan.', descEn: 'The Prophet always spoke the truth in word and deed.' },
  { id: 'tabligh', icon: '📢', label: 'Tabligh (Menyampai)', desc: 'Nabi SAW menyampaikan semua perintah Allah tanpa mengubah atau menyembunyikannya.', descEn: 'The Prophet conveyed all of Allah\'s commands without changing or hiding them.' },
  { id: 'fatanah', icon: '🧠', label: 'Fatanah (Bijaksana)', desc: 'Nabi SAW sangat bijaksana dalam memimpin dan menyelesaikan masalah umat.', descEn: 'The Prophet was very wise in leading and solving community problems.' },
  { id: 'pemaaf', icon: '💚', label: 'Pemaaf', desc: 'Nabi SAW mudah memaafkan kesalahan orang lain, walaupun musuh.', descEn: 'The Prophet easily forgave others\' mistakes, even enemies.' },
  { id: 'syura', icon: '🗣️', label: 'Bermesyuarat', desc: 'Nabi SAW mengamalkan syura (perundingan) dalam membuat keputusan penting.', descEn: 'The Prophet practiced consultation in making important decisions.' },
];

const TOTAL_ROUNDS = 10;

function buildQuestions() {
  const qs = TRAITS.map(t => {
    const wrong = shuffle(TRAITS.filter(x => x.id !== t.id)).slice(0, 3).map(x => x.label);
    return { question: `Apakah sifat ${t.label} yang ditunjukkan oleh Nabi SAW?`, answer: t.desc, options: shuffle([t.desc, ...wrong.map(w => TRAITS.find(x => x.label === w)?.desc || '')]) };
  });
  qs.push({ question: 'Sifat apakah yang bermaksud "Menyampaikan"?', answer: 'Tabligh', options: shuffle(['Tabligh', 'Siddiq', 'Amanah', 'Fatanah']) });
  return qs;
}

const THEME = {
  pageGradient: 'radial-gradient(ellipse at top, #E7D9FF 0%, #B79CFF 55%, #7A55E0 100%)',
  dark: '#5B21B6',
  accent: '#8B5CF6',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#EDE9FE 0%,#C4B5FD 55%,#8B5CF6 100%)',
  pillGradient: 'linear-gradient(180deg,#C4B5FD,#8B5CF6)',
};

export default function KepimpinanNabi({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Sirah › "
      breadcrumbActive="Sifat Kepimpinan Nabi"
      title="Sifat Kepimpinan Nabi Muhammad SAW"
      lead={language === 'bm'
        ? 'Mari pelajari 6 sifat kepimpinan Nabi SAW — amanah, siddiq, tabligh, fatanah, pemaaf dan syura.'
        : 'Learn 6 leadership qualities of the Prophet — trustworthy, truthful, conveying, wise, forgiving, and consultative.'}
      icon="👑"
      theme={THEME}
      topics={TRAITS.map(t => ({
        visual: <span style={{ fontSize: '3rem', lineHeight: 1 }}>{t.icon}</span>,
        title: t.label,
        sublabel: '',
        desc: t.desc,
      }))}
      questions={buildQuestions()}
      totalRounds={TOTAL_ROUNDS}
      accentColor="#8B5CF6"
    />
  );
}
