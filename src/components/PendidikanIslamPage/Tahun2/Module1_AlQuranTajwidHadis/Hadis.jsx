import React from 'react';
import Tahun1LessonScrollLayout from '../../Tahun1/Tahun1LessonScrollLayout';
import { ARABIC_FONT } from '../../_shared/arabic';
import { shuffle } from '../../_shared/utils';

const THEME = {
  pageGradient: 'radial-gradient(ellipse at top, #FFF7D6 0%, #FDD97A 55%, #F5CD6D 100%)',
  dark: '#92400E',
  accent: '#F59E0B',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#FFFBEB 0%,#FDE68A 55%,#F59E0B 100%)',
  pillGradient: 'linear-gradient(180deg,#FBBF24,#D4960A)',
};

const TOPICS = [
  {
    visual: (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <span style={{ fontFamily: ARABIC_FONT, fontSize: '1.8rem', lineHeight: 1.3, color: '#92400E', direction: 'rtl', textAlign: 'center' }}>إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ</span>
        <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '0.85rem', color: '#92400E', fontStyle: 'italic', marginTop: 4 }}>"Innamal a\'malu binniyat"</span>
      </div>
    ),
    title: 'Hadis tentang Niat',
    sublabel: 'Riwayat Bukhari & Muslim',
    desc: 'Setiap amalan bergantung pada niat. Niat yang baik akan menghasilkan amalan yang baik dan diterima Allah.',
  },
  {
    visual: (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <span style={{ fontFamily: ARABIC_FONT, fontSize: '1.6rem', lineHeight: 1.3, color: '#1E40AF', direction: 'rtl', textAlign: 'center' }}>الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ</span>
        <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '0.85rem', color: '#1E40AF', fontStyle: 'italic', marginTop: 4 }}>"Ar-rahimuna yarhamuhumur-rahman"</span>
      </div>
    ),
    title: 'Hadis tentang Kasih Sayang',
    sublabel: 'Riwayat Abu Daud & Tirmidzi',
    desc: 'Orang yang penyayang akan disayangi oleh Allah. Islam menggalakkan umatnya saling mengasihi dan menyayangi.',
  },
];

const QUESTIONS = shuffle([
  { question: '"Innamal a\'malu binniyat" bermaksud...', answer: 'Setiap amalan bergantung pada niat', options: ['Setiap amalan bergantung pada niat', 'Allah Maha Penyayang', 'Bersyukur kepada Allah', 'Berbuat baik sesama manusia'] },
  { question: 'Siapa yang akan disayangi oleh Allah?', answer: 'Orang yang penyayang', options: ['Orang yang kaya', 'Orang yang penyayang', 'Orang yang pandai', 'Orang yang kuat'] },
  { question: 'Hadis tentang niat diriwayatkan oleh...', answer: 'Bukhari & Muslim', options: ['Bukhari & Muslim', 'Abu Daud', 'Tirmidzi', 'Ahmad'] },
  { question: 'Hadis tentang kasih sayang diriwayatkan oleh...', answer: 'Abu Daud & Tirmidzi', options: ['Bukhari & Muslim', 'Abu Daud & Tirmidzi', 'Ahmad & Nasai', 'Ibnu Majah'] },
]);

export default function Hadis({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Al-Quran, Tajwid & Hadis › "
      breadcrumbActive="Hadis"
      title={language === 'bm' ? 'Hadis' : 'Hadith'}
      lead={language === 'bm'
        ? 'Mari belajar dua hadis penting: tentang niat dan kasih sayang sebagai panduan hidup.'
        : 'Let\'s learn two important hadiths: on intention and compassion as life guidance.'}
      icon="📜"
      theme={THEME}
      topics={TOPICS}
      questions={QUESTIONS}
      totalRounds={4}
      accentColor="#F59E0B"
    />
  );
}
