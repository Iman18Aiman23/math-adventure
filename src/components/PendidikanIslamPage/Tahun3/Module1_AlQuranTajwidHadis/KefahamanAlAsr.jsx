import React from 'react';
import Tahun1LessonScrollLayout from '../../Tahun1/Tahun1LessonScrollLayout';
import { ARABIC_FONT } from '../../_shared/arabic';
import { shuffle } from '../../_shared/utils';

const LESSONS = [
  { id: 'time', icon: '⏳', label: 'Demi Masa', desc: 'Allah bersumpah dengan masa untuk menunjukkan kepentingannya.', descEn: 'Allah swears by time to show its importance.', color: '#B45309' },
  { id: 'loss', icon: '⚠️', label: 'Kerugian Manusia', desc: 'Semua manusia berada dalam kerugian kecuali yang beriman dan beramal soleh.', descEn: 'All mankind is at loss except those who believe and do good.', color: '#D4960A' },
  { id: 'faith', icon: '🤲', label: 'Iman & Amal', desc: 'Beriman kepada Allah dan melakukan amal kebajikan adalah penyelamat.', descEn: 'Faith in Allah and good deeds are the salvation.', color: '#B45309' },
  { id: 'truth', icon: '📜', label: 'Nasihat Kebenaran', desc: 'Saling menasihati supaya mentaati kebenaran dan kesabaran.', descEn: 'Mutual advice to uphold truth and patience.', color: '#D4960A' },
  { id: 'patience', icon: '🌱', label: 'Nasihat Kesabaran', desc: 'Saling menasihati supaya bersabar dalam menegakkan kebenaran.', descEn: 'Mutual advice to be patient in upholding truth.', color: '#B45309' },
];

const TOTAL_ROUNDS = 10;

function buildQuestions() {
  const qs = [];
  LESSONS.forEach(l => {
    const wrong = shuffle(LESSONS.filter(x => x.id !== l.id)).slice(0, 3).map(x => x.label);
    qs.push({
      question: `Apakah pengajaran yang ke-${LESSONS.indexOf(l) + 1} dari Surah Al-Asr?`,
      answer: l.label,
      options: shuffle([l.label, ...wrong]),
    });
  });
  qs.push({
    question: 'Siapakah yang TIDAK rugi menurut Surah Al-Asr?',
    answer: 'Orang yang beriman dan beramal soleh',
    options: shuffle(['Orang yang beriman dan beramal soleh', 'Orang yang kaya', 'Orang yang pandai', 'Orang yang kuat']),
  });
  qs.push({
    question: 'Berapa ayatkah Surah Al-Asr?',
    answer: '3',
    options: shuffle(['3', '5', '7', '11']),
  });
  return qs;
}

const THEME = {
  pageGradient: 'radial-gradient(ellipse at top,#FFFBEB 0%,#FEF3C7 60%,#FDE68A 100%)',
  dark: '#92400E',
  accent: '#F59E0B',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#FFFBEB 0%,#FDE68A 55%,#D97706 100%)',
  pillGradient: 'linear-gradient(180deg,#FDE68A,#F59E0B)',
};

export default function KefahamanAlAsr({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Al-Quran & Tajwid › "
      breadcrumbActive="Kefahaman Surah Al-Asr"
      title="Kefahaman Surah Al-Asr"
      lead={language === 'bm'
        ? 'Mari hayati pengajaran dari Surah Al-Asr — tentang masa, kerugian, iman, kebenaran dan kesabaran.'
        : 'Let\'s appreciate the lessons from Surah Al-Asr — about time, loss, faith, truth, and patience.'}
      icon="📖"
      theme={THEME}
      topics={[
        {
          visual: (
            <div style={{
              fontFamily: ARABIC_FONT, fontWeight: 700, fontSize: '1.1rem',
              color: '#B45309', textAlign: 'center', lineHeight: 1.6,
            }}>
              وَالْعَصْرِ ﴿١﴾ إِنَّ الْإِنسَانَ لَفِي خُسْرٍ ﴿٢﴾ إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ ﴿٣﴾
            </div>
          ),
          title: 'Surah Al-Asr',
          sublabel: '3 ayat',
          desc: 'Allah bersumpah dengan masa. Sesungguhnya manusia berada dalam kerugian, kecuali mereka yang beriman, beramal soleh, dan saling menasihati dengan kebenaran dan kesabaran.',
        },
        ...LESSONS.map(l => ({
          visual: <span style={{ fontSize: '3rem', lineHeight: 1 }}>{l.icon}</span>,
          title: l.label,
          sublabel: '',
          desc: l.desc,
        })),
      ]}
      questions={buildQuestions()}
      totalRounds={TOTAL_ROUNDS}
      accentColor="#F59E0B"
    />
  );
}
