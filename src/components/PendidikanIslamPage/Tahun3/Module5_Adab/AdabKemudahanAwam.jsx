import React from 'react';
import Tahun1LessonScrollLayout from '../../Tahun1/Tahun1LessonScrollLayout';
import { shuffle } from '../../_shared/utils';

const TIPS = [
  { id: 'jaga', icon: '🧹', label: 'Menjaga Kebersihan', desc: 'Jangan membuang sampah merata. Gunakan tong sampah yang disediakan.', descEn: 'Don\'t litter. Use the provided trash bins.' },
  { id: 'hemat', icon: '💧', label: 'Berjimat', desc: 'Gunakan air, elektrik dan kemudahan lain secara berhemah.', descEn: 'Use water, electricity and other facilities wisely.' },
  { id: 'rosak', icon: '🛠️', label: 'Tidak Merosakkan', desc: 'Jangan menconteng, merosakkan atau mencuri harta awam.', descEn: 'Don\'t deface, damage or steal public property.' },
  { id: 'gilir', icon: '🔄', label: 'Bergilir-gilir', desc: 'Beratur dengan sabar dan memberi giliran kepada orang lain.', descEn: 'Queue patiently and give turns to others.' },
  { id: 'keselamatan', icon: '⚠️', label: 'Utamakan Keselamatan', desc: 'Patuhi peraturan keselamatan di tempat awam seperti tanda amaran.', descEn: 'Follow safety rules in public places like warning signs.' },
  { id: 'tegur', icon: '💬', label: 'Tegur Secara Baik', desc: 'Tegur dengan baik jika melihat orang lain menyalahgunakan kemudahan.', descEn: 'Politely remind others if they misuse facilities.' },
];

const TOTAL_ROUNDS = 10;

function buildQuestions() {
  const qs = TIPS.map(t => {
    const wrong = shuffle(TIPS.filter(x => x.id !== t.id)).slice(0, 3).map(x => x.label);
    return { question: `Bagaimanakah adab "${t.label}" ketika menggunakan kemudahan awam?`, answer: t.desc, options: shuffle([t.desc, ...wrong.map(w => TIPS.find(x => x.label === w)?.desc || '')]) };
  });
  qs.push({ question: 'Di manakah kita harus membuang sampah?', answer: 'Tong sampah', options: shuffle(['Tong sampah', 'Bawah meja', 'Tepi jalan', 'Dalam longkang']) });
  return qs;
}

const THEME = {
  pageGradient: 'radial-gradient(ellipse at top,#FFF1F2 0%,#FDF2F8 60%,#FCE7F3 100%)',
  dark: '#BE185D',
  accent: '#EC4899',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#FDF2F8 0%,#FBCFE8 55%,#EC4899 100%)',
  pillGradient: 'linear-gradient(180deg,#FBCFE8,#EC4899)',
};

export default function AdabKemudahanAwam({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Adab & Akhlak › "
      breadcrumbActive="Adab Menggunakan Kemudahan Awam"
      title="Adab Menggunakan Kemudahan Awam"
      lead={language === 'bm'
        ? 'Mari pelajari 6 adab menggunakan kemudahan awam — jaga kebersihan, berjimat, bergilir dan utamakan keselamatan.'
        : 'Learn 6 etiquette of using public facilities — cleanliness, saving, queuing, and safety.'}
      icon="🏫"
      theme={THEME}
      topics={TIPS.map(t => ({
        visual: <span style={{ fontSize: '3rem', lineHeight: 1 }}>{t.icon}</span>,
        title: t.label,
        sublabel: '',
        desc: t.desc,
      }))}
      questions={buildQuestions()}
      totalRounds={TOTAL_ROUNDS}
      accentColor="#EC4899"
    />
  );
}
