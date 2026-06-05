import React from 'react';
import Tahun1LessonScrollLayout from '../../Tahun1/Tahun1LessonScrollLayout';
import { shuffle } from '../../_shared/utils';

const EVENTS = [
  { n: 1, icon: '🗣️', label: 'Dakwah Makkah', desc: 'Nabi berdakwah di Makkah selama 13 tahun. Penentangan semakin kuat.', descEn: 'Prophet preached in Mecca for 13 years. Opposition grew stronger.' },
  { n: 2, icon: '🤝', label: 'Perjanjian Aqabah', desc: 'Orang Madinah berjanji melindungi dan menyokong Nabi SAW.', descEn: 'People of Madinah pledged to protect and support the Prophet.' },
  { n: 3, icon: '🐪', label: 'Perjalanan Hijrah', desc: 'Nabi dan Abu Bakar bersembunyi di Gua Thur. Tiba Madinah 8 Rabiulawal.', descEn: 'Prophet and Abu Bakr hid in Cave Thawr. Arrived Madinah on 8 Rabiulawal.' },
  { n: 4, icon: '🕌', label: 'Masjid Quba', desc: 'Nabi membina masjid pertama di Quba sebagai pusat ibadat dan masyarakat.', descEn: 'Prophet built the first mosque in Quba as community center.' },
  { n: 5, icon: '🤲', label: 'Persaudaraan Ansar-Muhajirin', desc: 'Nabi mempersaudarakan orang Ansar dan Muhajirin.', descEn: 'Prophet established brotherhood between Ansar and Muhajirin.' },
  { n: 6, icon: '📜', label: 'Piagam Madinah', desc: 'Piagam yang mengatur kehidupan masyarakat pelbagai agama.', descEn: 'A charter organizing the multi-religious community.' },
];

const TOTAL_ROUNDS = 10;

function buildQuestions() {
  const qs = EVENTS.map(e => {
    const wrong = shuffle(EVENTS.filter(x => x.n !== e.n)).slice(0, 3).map(x => x.label);
    return { question: `Apakah peristiwa ke-${e.n} dalam hijrah?`, answer: e.label, options: shuffle([e.label, ...wrong]) };
  });
  qs.push({ question: 'Siapakah yang menemani Nabi SAW ketika hijrah?', answer: 'Abu Bakar as-Siddiq', options: shuffle(['Abu Bakar as-Siddiq', 'Umar al-Khattab', 'Ali bin Abi Talib', 'Uthman bin Affan']) });
  qs.push({ question: 'Di manakah Nabi bersembunyi ketika hijrah?', answer: 'Gua Thur', options: shuffle(['Gua Thur', 'Gua Hira\'', 'Gua Uhud', 'Bukit Safa']) });
  return qs;
}

const THEME = {
  pageGradient: 'radial-gradient(ellipse at top,#F5F3FF 0%,#EDE9FE 60%,#DDD6FE 100%)',
  dark: '#5B21B6',
  accent: '#8B5CF6',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#EDE9FE 0%,#C4B5FD 55%,#8B5CF6 100%)',
  pillGradient: 'linear-gradient(180deg,#C4B5FD,#8B5CF6)',
};

export default function HijrahMadinah({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Sirah › "
      breadcrumbActive="Hijrah ke Madinah"
      title="Hijrah ke Madinah"
      lead={language === 'bm'
        ? 'Mari ikuti 6 peristiwa penting dalam hijrah Nabi Muhammad SAW ke Madinah.'
        : 'Follow 6 important events in the Prophet Muhammad\'s migration to Madinah.'}
      icon="🐪"
      theme={THEME}
      topics={EVENTS.map(e => ({
        visual: <span style={{ fontSize: '3rem', lineHeight: 1 }}>{e.icon}</span>,
        title: e.label,
        sublabel: `Langkah ${e.n}`,
        desc: e.desc,
      }))}
      questions={buildQuestions()}
      totalRounds={TOTAL_ROUNDS}
      accentColor="#8B5CF6"
    />
  );
}
