import React from 'react';
import Tahun1LessonScrollLayout from '../../Tahun1/Tahun1LessonScrollLayout';
import { ARABIC_FONT } from '../../_shared/arabic';
import { shuffle } from '../../_shared/utils';

const RULES = [
  { id: 'ikhfa-syafawi', ar: 'إخفاء شفوي', name: 'Ikhfa\' Syafawi', rule: 'م mati bertemu ب', desc: 'Sebutan mim mati tersembunyi apabila bertemu huruf ba. Keluaran bunyi dari bibir dengan dengung.', descEn: 'Hidden pronunciation when meem sakinah meets ba. Sound from lips with nasalization.', icon: '👄', example: 'تَرْمِيهِم بِحِجَارَةٍ' },
  { id: 'idgham-mithlain', ar: 'إدغام متماثلين', name: 'Idgham Mithlain', rule: 'م mati bertemu م', desc: 'Cara bacaan: mim mati dimasukkan ke dalam mim berbaris dengan dengung.', descEn: 'Meem sakinah merges into meem with vowel, with nasalization.', icon: '🔗', example: 'عَلَيْهِم مَّغْضُوبِ' },
  { id: 'izhar-syafawi', ar: 'إظهار شفوي', name: 'Izhar Syafawi', rule: 'م mati bertemu selain ب & م', desc: 'Mim mati disebut jelas tanpa dengung. Bibir tidak rapat.', descEn: 'Meem sakinah pronounced clearly without nasalization. Lips not pressed together.', icon: '🔊', example: 'أَنْعَمْتَ عَلَيْهِمْ' },
];

const TOTAL_ROUNDS = 10;

function buildQuestions() {
  const qs = [];
  RULES.forEach(r => {
    const wrong = shuffle(RULES.filter(x => x.id !== r.id)).slice(0, 3).map(x => x.name);
    qs.push({
      question: `Apakah hukum tajwid apabila mim mati (مْ) bertemu huruf ${r.rule.split(' ').pop()}?`,
      answer: r.name,
      options: shuffle([r.name, ...wrong]),
    });
    const wrongDesc = shuffle(RULES.filter(x => x.id !== r.id)).slice(0, 3).map(x => x.desc);
    qs.push({
      question: `Apakah cara bacaan yang betul bagi ${r.name}?`,
      answer: r.desc,
      options: shuffle([r.desc, ...wrongDesc]),
    });
  });
  const all = ['Ikhfa\' Syafawi', 'Idgham Mithlain', 'Izhar Syafawi', 'Iqlab'];
  qs.push({
    question: 'Yang manakah BUKAN hukum tajwid Mim Sakinah?',
    answer: 'Iqlab',
    options: shuffle(all),
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

export default function MimSakinah({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Al-Quran & Tajwid › "
      breadcrumbActive="Mim Sakinah"
      title="Mim Sakinah (مْ)"
      lead={language === 'bm'
        ? 'Mari belajar 3 hukum tajwid berkaitan mim mati (مْ) — Ikhfa\' Syafawi, Idgham Mithlain, dan Izhar Syafawi.'
        : 'Learn 3 tajweed rules related to meem sakinah — Ikhfa Shafawi, Idgham Mithlain, and Izhar Shafawi.'}
      icon="📖"
      theme={THEME}
      topics={RULES.map(r => ({
        visual: (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <span style={{ fontSize: '2rem', lineHeight: 1 }}>{r.icon}</span>
            <span style={{ fontFamily: ARABIC_FONT, fontSize: '0.65rem', color: '#92400E', textShadow: '0 1px 2px rgba(0,0,0,0.1)', direction: 'rtl' }}>{r.ar}</span>
          </div>
        ),
        title: r.name,
        sublabel: r.rule,
        desc: r.desc,
      }))}
      questions={buildQuestions()}
      totalRounds={TOTAL_ROUNDS}
      accentColor="#F59E0B"
    />
  );
}
