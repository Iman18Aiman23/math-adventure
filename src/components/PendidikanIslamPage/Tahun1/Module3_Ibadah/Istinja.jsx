import React from 'react';
import Tahun1LessonScrollLayout from '../Tahun1LessonScrollLayout';
import { shuffle } from '../../_shared/utils';

const KONSEP = [
  {
    icon: '📖', label: "Apa itu Istinja'?", sublabel: 'Bersih selepas buang air',
    desc: "Istinja' ialah membersihkan najis yang keluar dari tempat buang air besar atau air kecil.",
  },
  {
    icon: '⚖️', label: 'Hukum: WAJIB', sublabel: 'Mesti dilakukan',
    desc: "Hukum melakukan istinja' adalah WAJIB bagi setiap Muslim selepas buang air besar atau kecil.",
  },
  {
    icon: '💧', label: 'Cara Terbaik', sublabel: 'Guna air bersih',
    desc: "Cara terbaik ialah menggunakan air bersih (air mutlak) untuk membersihkan najis dengan sempurna.",
  },
  {
    icon: '🪣', label: 'Tiada Air?', sublabel: 'Tisu/batu — 3 kali sapu',
    desc: "Jika tiada air, boleh gunakan tisu, batu, atau kertas bersih. Sapu sekurang-kurangnya 3 kali sehingga bersih.",
  },
  {
    icon: '🚻', label: 'Masuk Tandas', sublabel: 'Kaki kiri dahulu',
    desc: "Apabila masuk tandas, mulakan dengan kaki kiri dan baca doa masuk tandas.",
  },
  {
    icon: '🚪', label: 'Keluar Tandas', sublabel: 'Kaki kanan dahulu',
    desc: "Apabila keluar dari tandas, mulakan dengan kaki kanan dan baca doa syukur.",
  },
];

const QUESTIONS = shuffle([
  { question: "Istinja' perlu dilakukan selepas?", answer: 'Buang air', options: ['Buang air', 'Makan', 'Tidur', 'Solat'] },
  { question: "Hukum istinja'?", answer: 'Wajib', options: ['Wajib', 'Sunat', 'Harus', 'Makruh'] },
  { question: "Cara terbaik istinja' ialah?", answer: 'Air bersih', options: ['Air bersih', 'Tisu sahaja', 'Batu sahaja', 'Daun'] },
  { question: 'Kaki mana untuk masuk tandas?', answer: 'Kaki kiri', options: ['Kaki kiri', 'Kaki kanan', 'Mana-mana', 'Dua kaki'] },
  { question: 'Kaki mana untuk keluar tandas?', answer: 'Kaki kanan', options: ['Kaki kiri', 'Kaki kanan', 'Mana-mana', 'Dua kaki'] },
  { question: 'Minimum berapa kali sapu tisu?', answer: '3 kali', options: ['1 kali', '2 kali', '3 kali', '5 kali'] },
  { question: "Istinja' membersihkan apa?", answer: 'Najis', options: ['Najis', 'Habuk', 'Air', 'Keringat'] },
  { question: "Istinja' wajib untuk siapa?", answer: 'Semua Muslim', options: ['Semua Muslim', 'Kanak-kanak', 'Lelaki sahaja', 'Orang dewasa'] },
  { question: 'Air bersih untuk istinja\' dipanggil?', answer: 'Air mutlak', options: ['Air mutlak', 'Air masin', 'Air sejuk', 'Air panas'] },
  { question: 'Apa dibaca sebelum masuk tandas?', answer: 'Doa', options: ['Doa', 'Lagu', 'Syair', 'Puisi'] },
]);

const TOTAL_ROUNDS = 10;

const THEME = {
  pageGradient: 'linear-gradient(180deg, #EBF8FF 0%, #E0F2FE 40%, #F0F9FF 100%)',
  dark: '#0C4A6E',
  accent: '#0891B2',
  stageGradient: 'linear-gradient(145deg, #0E7490, #0891B2, #06B6D4)',
  pillGradient: 'linear-gradient(135deg, #0891B2, #06B6D4)',
};

export default function Istinja({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Ibadah › "
      breadcrumbActive={language === 'bm' ? "Istinja'" : "Istinja'"}
      title={language === 'bm' ? "Istinja' — Bersuci Selepas Buang Air" : "Istinja' — Purification After Relief"}
      lead={language === 'bm'
        ? "Belajar cara bersuci yang betul selepas buang air besar atau kecil mengikut syariat Islam."
        : "Learn the proper way to purify yourself after answering the call of nature according to Islamic teachings."}
      icon="💧"
      theme={THEME}
      topics={KONSEP.map(k => ({
        visual: <span style={{ fontSize: '3.2rem', lineHeight: 1 }}>{k.icon}</span>,
        title: k.label,
        sublabel: k.sublabel,
        desc: k.desc,
      }))}
      questions={QUESTIONS}
      totalRounds={TOTAL_ROUNDS}
      accentColor="#0891B2"
    />
  );
}
