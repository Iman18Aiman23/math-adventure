import React from 'react';
import Tahun1LessonScrollLayout from '../../Tahun1/Tahun1LessonScrollLayout';
import { ARABIC_FONT } from '../../_shared/arabic';
import { shuffle } from '../../_shared/utils';

const THEME = {
  pageGradient: 'radial-gradient(ellipse at top,#EFF6FF 0%,#BFDBFE 60%,#3B82F6 100%)',
  dark: '#1E40AF',
  accent: '#3B82F6',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#DBEAFE 0%,#93C5FD 55%,#3B82F6 100%)',
  pillGradient: 'linear-gradient(180deg,#60A5FA,#2563EB)',
};

const TOPICS = [
  {
    visual: (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <span style={{ fontFamily: ARABIC_FONT, fontSize: '2rem', lineHeight: 1, color: '#1E40AF', direction: 'rtl' }}>ل, ر</span>
        <span style={{ fontFamily: ARABIC_FONT, fontSize: '1.4rem', lineHeight: 1, color: '#1E40AF', direction: 'rtl', opacity: 0.7 }}>مِنْ رَبِّهِمْ</span>
      </div>
    ),
    title: 'Idgham Bila Ghunnah',
    sublabel: 'Huruf: ل, ر',
    desc: 'Idgham tanpa dengung — nun sakinah atau tanwin bertemu huruf lam (ل) atau ra (ر), dibaca terus tanpa dengung.',
  },
  {
    visual: (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <span style={{ fontFamily: ARABIC_FONT, fontSize: '2rem', lineHeight: 1, color: '#065F46', direction: 'rtl' }}>ي, ن, م, و</span>
        <span style={{ fontFamily: ARABIC_FONT, fontSize: '1.4rem', lineHeight: 1, color: '#065F46', direction: 'rtl', opacity: 0.7 }}>مَنْ يَّعْمَلْ</span>
      </div>
    ),
    title: 'Idgham Ma`al Ghunnah',
    sublabel: 'Huruf: ي, ن, م, و',
    desc: 'Idgham dengan dengung — nun sakinah atau tanwin bertemu huruf ya (ي), nun (ن), mim (م), atau wau (و), dibaca dengan dengung.',
  },
];

const QUESTIONS = shuffle([
  { question: 'Apakah huruf idgham bila ghunnah?', answer: 'ل, ر', options: ['ي, ن, م, و', 'ل, ر', 'ب, ت, ث', 'ص, ض, ط'] },
  { question: 'Apakah huruf idgham ma\'al ghunnah?', answer: 'ي, ن, م, و', options: ['ل, ر', 'ب, ج, د', 'ي, ن, م, و', 'ف, ق, ك'] },
  { question: 'Idgham bila ghunnah bermaksud...', answer: 'Tanpa dengung', options: ['Dengung', 'Tanpa dengung', 'Panjang', 'Pendek'] },
  { question: 'Idgham ma\'al ghunnah bermaksud...', answer: 'Dengung', options: ['Tanpa dengung', 'Dengung', 'Terputus', 'Panjang 2 harakat'] },
  { question: 'Berapa huruf idgham ma\'al ghunnah?', answer: '4', options: ['2', '3', '4', '5'] },
]);

export default function Idgham({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Al-Quran, Tajwid & Hadis › "
      breadcrumbActive="Idgham"
      title="Idgham"
      lead={language === 'bm'
        ? 'Mari belajar hukum idgham — cara membaca nun sakinah atau tanwin apabila bertemu huruf tertentu.'
        : 'Let\'s learn the rule of idgham — how to pronounce nun sakinah or tanwin when meeting certain letters.'}
      icon="📖"
      theme={THEME}
      topics={TOPICS}
      questions={QUESTIONS}
      totalRounds={5}
      accentColor="#3B82F6"
    />
  );
}
