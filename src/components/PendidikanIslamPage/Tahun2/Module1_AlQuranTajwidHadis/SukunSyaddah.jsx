import React from 'react';
import Tahun1LessonScrollLayout from '../../Tahun1/Tahun1LessonScrollLayout';
import { ARABIC_FONT } from '../../_shared/arabic';
import { shuffle } from '../../_shared/utils';

const THEME = {
  pageGradient: 'radial-gradient(ellipse at top,#FFFBEB 0%,#FDE68A 60%,#F59E0B 100%)',
  dark: '#92400E',
  accent: '#F59E0B',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#FFFBEB 0%,#FDE68A 55%,#F59E0B 100%)',
  pillGradient: 'linear-gradient(180deg,#FBBF24,#D4960A)',
};

const TOPICS = [
  {
    visual: <span style={{ fontFamily: ARABIC_FONT, fontSize: '3.2rem', lineHeight: 1, color: '#92400E', direction: 'rtl' }}>بْ</span>,
    title: 'Sukun (Tanda Mati)',
    sublabel: 'بْت · تْب · كْت · مْت',
    desc: 'Tanda bulat kecil di atas huruf menunjukkan huruf itu dimatikan. Huruf bersukun dibaca secara terputus atau mati tanpa dengung.',
  },
  {
    visual: <span style={{ fontFamily: ARABIC_FONT, fontSize: '3.2rem', lineHeight: 1, color: '#1E40AF', direction: 'rtl' }}>بّ</span>,
    title: 'Syaddah (Tanda Tekan)',
    sublabel: 'بَّ · تَّ · كَّ · مَّ',
    desc: 'Tanda seperti huruf "w" kecil di atas huruf menunjukkan huruf ditekan dua kali. Huruf bersyaddah dibaca dengan tekanan dua kali.',
  },
];

const QUESTIONS = shuffle([
  { question: 'Apakah tanda ini: بْ ?', answer: 'Sukun', options: ['Sukun', 'Syaddah', 'Fathah', 'Kasrah'] },
  { question: 'Apakah tanda ini: بّ ?', answer: 'Syaddah', options: ['Kasrah', 'Syaddah', 'Sukun', 'Dammah'] },
  { question: 'Huruf bersukun dibaca secara...', answer: 'Terputus/mati', options: ['Panjang', 'Terputus/mati', 'Ditekan', 'Dengung'] },
  { question: 'Huruf bersyaddah dibaca dengan...', answer: 'Tekanan dua kali', options: ['Mati', 'Panjang', 'Tekanan dua kali', 'Dengung'] },
]);

export default function SukunSyaddah({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Al-Quran, Tajwid & Hadis › "
      breadcrumbActive={language === 'bm' ? 'Sukun & Syaddah' : 'Sukun & Shaddah'}
      title={language === 'bm' ? 'Sukun & Syaddah' : 'Sukun & Shaddah'}
      lead={language === 'bm'
        ? 'Mari belajar dua tanda penting dalam bacaan Al-Quran: sukun (tanda mati) dan syaddah (tanda tekan).'
        : 'Let\'s learn two important signs in Quranic recitation: sukun (silence mark) and shaddah (stress mark).'}
      icon="📖"
      theme={THEME}
      topics={TOPICS}
      questions={QUESTIONS}
      totalRounds={4}
      accentColor="#F59E0B"
    />
  );
}
