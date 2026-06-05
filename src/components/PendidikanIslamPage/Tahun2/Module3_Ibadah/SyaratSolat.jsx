import React from 'react';
import Tahun1LessonScrollLayout from '../../Tahun1/Tahun1LessonScrollLayout';
import { shuffle } from '../../_shared/utils';

const THEME = {
  pageGradient: 'radial-gradient(ellipse at top,#EFF6FF 0%,#BFDBFE 60%,#3B82F6 100%)',
  dark: '#1E40AF',
  accent: '#3B82F6',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#DBEAFE 0%,#93C5FD 55%,#3B82F6 100%)',
  pillGradient: 'linear-gradient(180deg,#60A5FA,#2563EB)',
};

const SYARAT_WAJIB = [
  { icon: '☪️', label: 'Islam', desc: 'Hanya orang Islam diwajibkan menunaikan solat.' },
  { icon: '🧑', label: 'Baligh (cukup umur)', desc: 'Telah mencapai umur dewasa — mimpi basah (lelaki) atau haid (perempuan).' },
  { icon: '🧠', label: 'Berakal (siuman)', desc: 'Sedar dan siuman; tidak sah solat orang yang gila atau tidak sedar.' },
  { icon: '♀️', label: 'Suci haid & nifas', desc: 'Bagi perempuan, wajib suci daripada haid dan nifas.' },
  { icon: '📢', label: 'Sampai seruan Islam', desc: 'Telah sampai kepadanya dakwah dan seruan Islam.' },
];

const SYARAT_SAH = [
  { icon: '🧼', label: 'Suci badan, pakaian & tempat', desc: 'Badan, pakaian dan tempat solat hendaklah bersih daripada najis.' },
  { icon: '👗', label: 'Menutup aurat', desc: 'Lelaki: pusat hingga lutut. Perempuan: seluruh tubuh kecuali muka dan tapak tangan.' },
  { icon: '🕋', label: 'Menghadap kiblat', desc: 'Menghadap ke arah Kaabah di Masjidil Haram, Mekah.' },
  { icon: '⏰', label: 'Masuk waktu solat', desc: 'Setiap solat fardu mempunyai waktu yang telah ditetapkan.' },
];

const TOPICS_WAJIB = SYARAT_WAJIB.map(w => ({
  visual: <span style={{ fontSize: '2.6rem', lineHeight: 1 }}>{w.icon}</span>,
  title: w.label,
  sublabel: 'Syarat Wajib',
  desc: w.desc,
}));

const TOPICS_SAH = SYARAT_SAH.map(s => ({
  visual: <span style={{ fontSize: '2.6rem', lineHeight: 1 }}>{s.icon}</span>,
  title: s.label,
  sublabel: 'Syarat Sah',
  desc: s.desc,
}));

const TOPICS = [...TOPICS_WAJIB, ...TOPICS_SAH];

function buildQuestions() {
  const qs = [];
  const allWajib = SYARAT_WAJIB.map(w => w.label);
  const allSah = SYARAT_SAH.map(s => s.label);
  const allMix = [...allWajib, ...allSah];

  SYARAT_WAJIB.forEach(w => {
    const wrong = shuffle(allMix.filter(x => x !== w.label)).slice(0, 3);
    qs.push({ question: 'Antara berikut, yang manakah SYARAT WAJIB solat?', answer: w.label, options: shuffle([w.label, ...wrong]) });
  });

  SYARAT_SAH.forEach(s => {
    const wrong = shuffle(allMix.filter(x => x !== s.label)).slice(0, 3);
    qs.push({ question: 'Antara berikut, yang manakah SYARAT SAH solat?', answer: s.label, options: shuffle([s.label, ...wrong]) });
  });

  qs.push({ question: 'Berapakah bilangan Syarat Wajib Solat?', answer: '5', options: ['3', '4', '5', '6'] });
  qs.push({ question: 'Berapakah bilangan Syarat Sah Solat?', answer: '4', options: ['2', '3', '4', '5'] });
  qs.push({ question: '"Menutup aurat" termasuk dalam?', answer: 'Syarat Sah', options: shuffle(['Syarat Sah', 'Syarat Wajib', 'Rukun Solat', 'Sunat Solat']) });
  qs.push({ question: '"Baligh" termasuk dalam?', answer: 'Syarat Wajib', options: shuffle(['Syarat Wajib', 'Syarat Sah', 'Rukun Solat', 'Sunat Solat']) });
  qs.push({ question: 'Yang manakah BUKAN syarat sah solat?', answer: 'Islam', options: shuffle(['Islam', 'Menutup aurat', 'Menghadap kiblat', 'Masuk waktu solat']) });
  qs.push({ question: 'Yang manakah BUKAN syarat wajib solat?', answer: 'Menghadap kiblat', options: shuffle(['Menghadap kiblat', 'Islam', 'Baligh', 'Berakal']) });

  return shuffle(qs);
}

const QUESTIONS = buildQuestions();

export default function SyaratSolat({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Ibadah › "
      breadcrumbActive={language === 'bm' ? 'Syarat Wajib & Sah Solat' : 'Conditions of Prayer'}
      title={language === 'bm' ? 'Syarat Wajib & Sah Solat' : 'Conditions of Prayer'}
      lead={language === 'bm'
        ? 'Mari belajar syarat-syarat yang mewajibkan dan mensahkan solat sebelum menunaikannya.'
        : 'Let\'s learn the conditions that obligate and validate prayer before performing it.'}
      icon="🧎"
      theme={THEME}
      topics={TOPICS}
      questions={QUESTIONS}
      totalRounds={10}
      accentColor="#3B82F6"
    />
  );
}
