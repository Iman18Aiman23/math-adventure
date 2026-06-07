import React from 'react';
import Tahun1LessonScrollLayout from '../../Tahun1/Tahun1LessonScrollLayout';
import { ARABIC_FONT } from '../../_shared/arabic';
import { shuffle } from '../../_shared/utils';

const HADIS = [
  { id: 'adab-makan', icon: '🍽️', title: 'Adab Makan', ar: 'إِذَا أَكَلَ أَحَدُكُمْ فَلْيَأْكُلْ بِيَمِينِهِ', hadis: 'Apabila seorang daripada kamu makan, hendaklah dia makan dengan tangan kanannya.', hadisEn: 'When one of you eats, let him eat with his right hand.', source: 'HR Muslim' },
  { id: 'adab-salam', icon: '🤝', title: 'Memberi Salam', ar: 'أَفْشُوا السَّلَامَ بَيْنَكُمْ', hadis: 'Sebarkanlah salam di antara kamu.', hadisEn: 'Spread peace among yourselves.', source: 'HR Muslim' },
  { id: 'adab-senyum', icon: '😊', title: 'Senyum Sedekah', ar: 'تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ صَدَقَةٌ', hadis: 'Senyumanmu kepada saudaramu adalah sedekah.', hadisEn: 'Your smile at your brother is charity.', source: 'HR Tirmidhi' },
  { id: 'adab-berkata', icon: '💬', title: 'Berkata Baik', ar: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ', hadis: 'Barangsiapa beriman kepada Allah dan hari akhirat, hendaklah berkata baik atau diam.', hadisEn: 'Whoever believes in Allah and the Last Day, let him speak good or remain silent.', source: 'HR Bukhari & Muslim' },
];

const TOTAL_ROUNDS = 10;

function buildQuestions() {
  const qs = [];
  HADIS.forEach(h => {
    const wrong = shuffle(HADIS.filter(x => x.id !== h.id)).slice(0, 3).map(x => x.title);
    qs.push({
      question: `Apakah hadis tentang "${h.title}"?`,
      answer: h.hadis,
      options: shuffle([h.hadis, ...shuffle(HADIS.filter(x => x.id !== h.id)).slice(0, 3).map(x => x.hadis)]),
    });
  });
  qs.push({
    question: 'Yang manakah BUKAN adab yang dituntut dalam Islam?',
    answer: 'Berkata kasar dan mengejek',
    options: shuffle(['Berkata kasar dan mengejek', 'Memberi salam', 'Senyum', 'Makan dengan tangan kanan']),
  });
  return qs;
}

const THEME = {
  pageGradient: 'radial-gradient(ellipse at top, #FFF7D6 0%, #FDD97A 55%, #D4960A 100%)',
  dark: '#B45309',
  accent: '#F59E0B',
  stageGradient: 'radial-gradient(ellipse at 50% 34%, #FFF7D6 0%, #FDD97A 55%, #D4960A 100%)',
  pillGradient: 'linear-gradient(180deg, #F59E0B, #B45309)',
};

export default function HadisTahun3({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Al-Quran & Tajwid › "
      breadcrumbActive="Hadis: Tuntutan Adab Islamiah"
      title="Hadis: Tuntutan Adab Islamiah"
      lead={language === 'bm'
        ? 'Mari pelajari hadis-hadis tentang adab — makan dengan tangan kanan, memberi salam, senyum, dan berkata baik.'
        : 'Learn hadiths about etiquette — eating with the right hand, greeting, smiling, and speaking kindly.'}
      icon="📜"
      theme={THEME}
      topics={HADIS.map(h => ({
        visual: (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <span style={{ fontSize: '2rem', lineHeight: 1 }}>{h.icon}</span>
            <span style={{ fontFamily: ARABIC_FONT, fontSize: '0.6rem', color: '#92400E', direction: 'rtl', lineHeight: 1.3 }}>{h.ar}</span>
          </div>
        ),
        title: h.title,
        sublabel: `📚 ${h.source}`,
        desc: h.hadis,
      }))}
      questions={buildQuestions()}
      totalRounds={TOTAL_ROUNDS}
      accentColor="#F59E0B"
    />
  );
}
