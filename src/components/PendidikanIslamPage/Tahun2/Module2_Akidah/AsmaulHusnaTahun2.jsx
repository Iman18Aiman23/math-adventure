import React from 'react';
import Tahun1LessonScrollLayout from '../../Tahun1/Tahun1LessonScrollLayout';
import { ARABIC_FONT } from '../../_shared/arabic';
import { shuffle } from '../../_shared/utils';

const THEME = {
  pageGradient: 'radial-gradient(ellipse at top, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
  dark: '#065F46',
  accent: '#2A9A6C',
  stageGradient: 'radial-gradient(ellipse at 50% 34%, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
  pillGradient: 'linear-gradient(180deg, #2A9A6C, #065F46)',
};

const NAMES = [
  {
    n: 1, ar: 'الأَحَد', rumi: 'Al-Ahad',
    meaning: 'Yang Maha Esa', meaningEng: 'The One',
    desc: 'Allah itu satu, tiada sekutu bagi-Nya. Allah tidak beranak dan tidak diperanakkan. Tiada sesuatu pun yang setara dengan Allah.',
    descEng: 'Allah is One, no partner unto Him. He neither begets nor is born. Nothing is comparable to Him.',
    icon: '🤲',
  },
  {
    n: 2, ar: 'الصَّمَد', rumi: 'As-Samad',
    meaning: 'Tempat Meminta', meaningEng: 'The Self-Sufficient',
    desc: 'Allah tempat meminta segala hajat. Hanya kepada Allah kita memohon pertolongan, kerana Allah Maha Kaya dan tidak bergantung kepada sesiapa.',
    descEng: 'Allah is the one upon whom all depend. Only to Allah we ask for help, for Allah is Self-Sufficient and needs no one.',
    icon: '🙏',
  },
];

const TOPICS = NAMES.map(k => ({
  visual: (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <span style={{ fontFamily: ARABIC_FONT, fontSize: '2.4rem', lineHeight: 1.2, color: '#065F46', direction: 'rtl' }}>{k.ar}</span>
      <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '1rem', color: '#065F46' }}>{k.rumi}</span>
    </div>
  ),
  title: `${k.icon} ${k.rumi}`,
  sublabel: `Nama ke-${k.n} · ${k.meaning}`,
  desc: k.desc,
}));

const QUESTIONS = shuffle([
  { question: 'Apakah maksud Al-Ahad?', answer: 'Yang Maha Esa', options: ['Yang Maha Esa', 'Tempat Meminta', 'Maha Pemurah', 'Maha Pengampun'] },
  { question: 'Apakah maksud As-Samad?', answer: 'Tempat Meminta', options: ['Maha Pencipta', 'Tempat Meminta', 'Maha Mengetahui', 'Yang Maha Esa'] },
  { question: '"الأَحَد" dibaca sebagai?', answer: 'Al-Ahad', options: ['Al-Ahad', 'As-Samad', 'Al-Khaliq', 'Ar-Rahim'] },
  { question: '"الصَّمَد" dibaca sebagai?', answer: 'As-Samad', options: ['Al-Ahad', 'As-Samad', 'Al-Wahhab', 'Al-Karim'] },
  { question: 'Al-Ahad bermaksud Allah itu ___.', answer: 'Maha Esa', options: ['Maha Esa', 'Maha Kaya', 'Maha Kuasa', 'Maha Bijaksana'] },
  { question: 'As-Samad bermaksud Allah itu tempat ___.', answer: 'Meminta', options: ['Meminta', 'Bertanya', 'Bersyukur', 'Berzikir'] },
  { question: 'Kepada siapakah kita memohon pertolongan?', answer: 'Allah', options: ['Allah', 'Malaikat', 'Nabi', 'Ibu bapa'] },
  { question: 'Apakah kesan daripada mengimani Al-Ahad?', answer: 'Kita hanya menyembah Allah', options: ['Kita hanya menyembah Allah', 'Kita hanya meminta pada manusia', 'Kita boleh menyembah selain Allah', 'Kita tidak perlu berdoa'] },
  { question: 'Al-Ahad terdapat dalam Surah apa?', answer: 'Surah Al-Ikhlas', options: ['Surah Al-Fatihah', 'Surah Al-Ikhlas', 'Surah An-Nas', 'Surah Al-Falaq'] },
  { question: 'Berapa kalimah Asmaul Husna keseluruhannya?', answer: '99', options: ['66', '77', '99', '100'] },
]);

export default function AsmaulHusnaTahun2({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Akidah › "
      breadcrumbActive={language === 'bm' ? 'Asmaul Husna: Al-Ahad & As-Samad' : 'Beautiful Names: Al-Ahad & As-Samad'}
      title={language === 'bm' ? 'Asmaul Husna: Al-Ahad & As-Samad' : 'Beautiful Names: Al-Ahad & As-Samad'}
      lead={language === 'bm'
        ? 'Mari belajar dua nama Allah yang indah: Al-Ahad (Yang Maha Esa) dan As-Samad (Tempat Meminta).'
        : 'Let\'s learn two beautiful names of Allah: Al-Ahad (The One) and As-Samad (The Self-Sufficient).'}
      icon="✨"
      theme={THEME}
      topics={TOPICS}
      questions={QUESTIONS}
      totalRounds={8}
      accentColor="#2A9A6C"
    />
  );
}
