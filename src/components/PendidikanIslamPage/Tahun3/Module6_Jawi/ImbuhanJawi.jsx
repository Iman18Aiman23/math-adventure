import React from 'react';
import Tahun1LessonScrollLayout from '../../Tahun1/Tahun1LessonScrollLayout';
import { shuffle } from '../../_shared/utils';

const IMBUHAN = [
  { type: 'Awalan', imbuhan: 'di-', contoh: 'دباخ', maksud: 'dibaca', warna: '#C2410C' },
  { type: 'Awalan', imbuhan: 'meN-', contoh: 'ممباخ', maksud: 'membaca', warna: '#EA580C' },
  { type: 'Awalan', imbuhan: 'teR-', contoh: 'ترباخ', maksud: 'terbaca', warna: '#F97316' },
  { type: 'Awalan', imbuhan: 'ber-', contoh: 'برلاري', maksud: 'berlari', warna: '#C2410C' },
  { type: 'Akhiran', imbuhan: '-an', contoh: 'ماجان', maksud: 'majaan', warna: '#EA580C' },
  { type: 'Akhiran', imbuhan: '-kan', contoh: 'بريكن', maksud: 'berikan', warna: '#F97316' },
  { type: 'Akhiran', imbuhan: '-i', contoh: 'داتڠي', maksud: 'datangi', warna: '#C2410C' },
  { type: 'Apitan', imbuhan: 'meN-...-kan', contoh: 'ممباخكن', maksud: 'membacakan', warna: '#EA580C' },
];

const TOTAL_ROUNDS = 10;

function buildQuestions() {
  const qs = IMBUHAN.slice(0, 6).map(i => {
    const wrong = shuffle(IMBUHAN.filter(x => x.imbuhan !== i.imbuhan)).slice(0, 3).map(x => x.imbuhan);
    return { question: `Imbuhan apakah yang menghasilkan perkataan "${i.maksud}"?`, answer: i.imbuhan, options: shuffle([i.imbuhan, ...wrong]) };
  });
  qs.push({ question: '\'di-\' dalam Jawi ditulis sebagai?', answer: 'دي', options: shuffle(['دي', 'د', 'دأ', 'دإ']) });
  qs.push({ question: 'Imbuhan \'ber-\' dalam Jawi ditulis sebagai?', answer: 'بر', options: shuffle(['بر', 'بار', 'بور', 'بير']) });
  return qs;
}

const THEME = {
  pageGradient: 'radial-gradient(ellipse at top,#FFF7ED 0%,#FFEDD5 60%,#FED7AA 100%)',
  dark: '#C2410C',
  accent: '#F97316',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#FFEDD5 0%,#FDBA74 55%,#F97316 100%)',
  pillGradient: 'linear-gradient(180deg,#FDBA74,#F97316)',
};

export default function ImbuhanJawi({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Celik Jawi › "
      breadcrumbActive="Imbuhan Awalan & Akhiran Jawi"
      title="Imbuhan Awalan & Akhiran Jawi"
      lead={language === 'bm'
        ? 'Mari pelajari imbuhan Jawi — awalan (di-, meN-, teR-, ber-), akhiran (-an, -kan, -i) dan apitan.'
        : 'Learn Jawi affixes — prefixes, suffixes, and circumfixes with examples.'}
      icon="✍️"
      theme={THEME}
      topics={IMBUHAN.map(i => ({
        visual: (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: '0.65rem', color: '#FFF', background: i.warna, padding: '2px 10px', borderRadius: 999 }}>{i.type}</span>
            <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '1.2rem', color: '#7C2D12' }}>{i.imbuhan}</span>
          </div>
        ),
        title: i.imbuhan,
        sublabel: i.contoh,
        desc: `Maksud: ${i.maksud}`,
      }))}
      questions={buildQuestions()}
      totalRounds={TOTAL_ROUNDS}
      accentColor="#F97316"
    />
  );
}
