import React from 'react';
import Tahun1LessonScrollLayout from '../Tahun1LessonScrollLayout';
import { shuffle } from '../../_shared/utils';
import { ARABIC_FONT } from '../../_shared/arabic';

const RUKUN = [
  {
    n: 1,
    ar: 'الإِيمَانُ بِاللهِ',
    name: 'Beriman kepada Allah',
    icon: '🌟',
    desc: 'Percaya bahawa Allah itu wujud, Esa, dan tiada Tuhan selain-Nya.',
    color: '#065F46', accent: '#10B981',
  },
  {
    n: 2,
    ar: 'الإِيمَانُ بِالمَلَائِكَةِ',
    name: 'Beriman kepada Malaikat',
    icon: '😇',
    desc: 'Percaya wujudnya malaikat yang diciptakan daripada cahaya dan sentiasa taat kepada Allah.',
    color: '#1E40AF', accent: '#3B82F6',
  },
  {
    n: 3,
    ar: 'الإِيمَانُ بِالكُتُبِ',
    name: 'Beriman kepada Kitab-kitab Allah',
    icon: '📚',
    desc: 'Percaya bahawa Allah menurunkan kitab-Nya kepada rasul-rasul, termasuk al-Quran.',
    color: '#92400E', accent: '#F59E0B',
  },
  {
    n: 4,
    ar: 'الإِيمَانُ بِالرُّسُلِ',
    name: 'Beriman kepada Rasul-rasul Allah',
    icon: '🕌',
    desc: 'Percaya bahawa Allah mengutuskan rasul-rasul untuk menyampaikan ajaran Islam.',
    color: '#4C1D95', accent: '#8B5CF6',
  },
  {
    n: 5,
    ar: 'الإِيمَانُ بِاليَوْمِ الآخِرِ',
    name: 'Beriman kepada Hari Kiamat',
    icon: '⏳',
    desc: 'Percaya akan berlakunya hari kiamat di mana semua manusia akan dibangkitkan dan dihisab.',
    color: '#9D174D', accent: '#EC4899',
  },
  {
    n: 6,
    ar: 'الإِيمَانُ بِالقَدَرِ',
    name: 'Beriman kepada Qada dan Qadar',
    icon: '⚖️',
    desc: 'Percaya bahawa segala yang berlaku — baik mahupun buruk — adalah dengan ketentuan Allah.',
    color: '#0C4A6E', accent: '#0891B2',
  },
];

const NOT_RUKUN_IMAN = [
  'Mendirikan Solat',
  'Menunaikan Zakat',
  'Berpuasa di Bulan Ramadan',
  'Menunaikan Ibadah Haji',
];

function buildQuestions() {
  const qs = [];
  RUKUN.forEach(r => {
    const wrong = shuffle(RUKUN.filter(x => x.n !== r.n)).slice(0, 3).map(x => x.name);
    qs.push({
      question: `Apakah Rukun Iman yang ke-${r.n}?`,
      answer: r.name,
      options: shuffle([r.name, ...wrong]),
    });
  });
  RUKUN.forEach(r => {
    const wrongNums = shuffle([1,2,3,4,5,6].filter(n => n !== r.n)).slice(0, 3).map(n => `Yang ke-${n}`);
    qs.push({
      question: `Rukun Iman yang ke berapa ialah "${r.name}"?`,
      answer: `Yang ke-${r.n}`,
      options: shuffle([`Yang ke-${r.n}`, ...wrongNums]),
    });
  });
  qs.push({
    question: 'Berapakah bilangan Rukun Iman?',
    answer: '6',
    options: ['4', '5', '6', '7'],
  });
  NOT_RUKUN_IMAN.forEach(distractor => {
    const real = shuffle(RUKUN).slice(0, 3).map(r => r.name);
    qs.push({
      question: 'Yang manakah BUKAN Rukun Iman?',
      answer: distractor,
      options: shuffle([distractor, ...real]),
    });
  });
  return qs;
}

const TOTAL_ROUNDS = 10;

const THEME = {
  pageGradient: 'linear-gradient(180deg,#D6F5DD 0%,#8AD9A8 50%,#5BBF8A 100%)',
  dark: '#065F46',
  accent: '#10B981',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#D6F5DD 0%,#8AD9A8 55%,#2A9A6C 100%)',
  pillGradient: 'linear-gradient(180deg,#8AD9A8,#10B981)',
};

export default function RukunIman({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Akidah › "
      breadcrumbActive={language === 'bm' ? 'Rukun Iman' : 'Pillars of Faith'}
      title={language === 'bm' ? 'Rukun Iman (6 Perkara)' : 'Pillars of Faith (6)'}
      lead={language === 'bm'
        ? 'Mari belajar 6 rukun iman yang wajib diketahui oleh setiap Muslim.'
        : 'Learn the 6 pillars of faith every Muslim must know.'}
      icon="🌟"
      theme={THEME}
      topics={RUKUN.map(r => ({
        visual: (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <span style={{ fontSize: '2rem', lineHeight: 1 }}>{r.icon}</span>
            <span style={{ fontFamily: ARABIC_FONT, fontSize: '0.65rem', color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,0.3)', direction: 'rtl' }}>{r.ar}</span>
          </div>
        ),
        title: r.name,
        sublabel: `Rukun ke-${r.n}`,
        desc: r.desc,
      }))}
      questions={buildQuestions()}
      totalRounds={TOTAL_ROUNDS}
      accentColor="#10B981"
    />
  );
}
