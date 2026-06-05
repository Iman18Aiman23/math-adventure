import React from 'react';
import Tahun1LessonScrollLayout from '../../Tahun1/Tahun1LessonScrollLayout';
import { shuffle } from '../../_shared/utils';

const ADABS = [
  { id: 'salam', icon: '🤝', label: 'Memberi Salam', desc: 'Memberi salam kepada guru, ibu bapa dan orang tua apabila bertemu.', descEn: 'Greet teachers, parents and elders when meeting them.' },
  { id: 'sopan', icon: '🙇', label: 'Bersikap Sopan', desc: 'Bercakap dengan nada suara yang lembut dan menggunakan bahasa yang sopan.', descEn: 'Speak with a soft tone and use polite language.' },
  { id: 'dengar', icon: '👂', label: 'Mendengar', desc: 'Mendengar dengan penuh perhatian apabila orang tua bercakap.', descEn: 'Listen attentively when elders are speaking.' },
  { id: 'bantu', icon: '🤲', label: 'Membantu', desc: 'Membantu guru dan ibu bapa dengan kerja-kerja yang mampu dilakukan.', descEn: 'Help teachers and parents with力所能及 tasks.' },
  { id: 'tunduk', icon: '🚶', label: 'Berjalan Sopan', desc: 'Berjalan dengan sopan di hadapan orang tua, tidak melintas di hadapan mereka.', descEn: 'Walk politely in front of elders, don\'t cut across them.' },
  { id: 'doa', icon: '🤲', label: 'Mendoakan', desc: 'Sentiasa mendoakan kebaikan untuk guru, ibu bapa dan orang tua.', descEn: 'Always pray for the well-being of teachers, parents and elders.' },
];

const TOTAL_ROUNDS = 10;

function buildQuestions() {
  const qs = ADABS.map(a => {
    const wrong = shuffle(ADABS.filter(x => x.id !== a.id)).slice(0, 3).map(x => x.label);
    return { question: `Apakah adab "${a.label}" terhadap guru dan ibu bapa?`, answer: a.desc, options: shuffle([a.desc, ...wrong.map(w => ADABS.find(x => x.label === w)?.desc || '')]) };
  });
  qs.push({ question: 'Bagaimana cara berjalan di hadapan orang tua?', answer: 'Berjalan dengan sopan', options: shuffle(['Berjalan dengan sopan', 'Berlari-lari', 'Bergegas', 'Berdiam diri']) });
  return qs;
}

const THEME = {
  pageGradient: 'radial-gradient(ellipse at top,#FFF1F2 0%,#FDF2F8 60%,#FCE7F3 100%)',
  dark: '#BE185D',
  accent: '#EC4899',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#FDF2F8 0%,#FBCFE8 55%,#EC4899 100%)',
  pillGradient: 'linear-gradient(180deg,#FBCFE8,#EC4899)',
};

export default function AdabHormatGuru({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Adab & Akhlak › "
      breadcrumbActive="Adab Menghormati Guru & Ibu Bapa"
      title="Adab Menghormati Guru & Ibu Bapa"
      lead={language === 'bm'
        ? 'Mari pelajari 6 adab menghormati guru, ibu bapa dan orang tua — salam, sopan, dengar, bantu, tunduk, doa.'
        : 'Learn 6 etiquette of respecting teachers, parents, and elders.'}
      icon="🙏"
      theme={THEME}
      topics={ADABS.map(a => ({
        visual: <span style={{ fontSize: '3rem', lineHeight: 1 }}>{a.icon}</span>,
        title: a.label,
        sublabel: '',
        desc: a.desc,
      }))}
      questions={buildQuestions()}
      totalRounds={TOTAL_ROUNDS}
      accentColor="#EC4899"
    />
  );
}
