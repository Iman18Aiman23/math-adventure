import React from 'react';
import Tahun1LessonScrollLayout from '../Tahun1LessonScrollLayout';
import { shuffle } from '../../_shared/utils';

const RUKUN = [
  { n: 1, icon: '🙏', label: 'Niat', desc: 'Berniat dalam hati untuk berwuduk kerana Allah.' },
  { n: 2, icon: '👤', label: 'Basuh Muka', desc: 'Membasuh seluruh muka dari dahi hingga dagu, dan dari telinga ke telinga.' },
  { n: 3, icon: '💪', label: 'Basuh Tangan', desc: 'Membasuh kedua-dua belah tangan hingga siku, termasuk siku.' },
  { n: 4, icon: '🤚', label: 'Sapu Kepala', desc: 'Menyapu sebahagian rambut kepala dengan tangan yang basah.' },
  { n: 5, icon: '🦶', label: 'Basuh Kaki', desc: 'Membasuh kedua-dua belah kaki hingga buku lali, termasuk buku lali.' },
  { n: 6, icon: '🔢', label: 'Tertib', desc: 'Melakukan semua rukun mengikut susunan yang betul dari mula hingga akhir.' },
];

const SUNAT = [
  { icon: '🗣️', label: 'Baca Bismillah', desc: 'Membaca "Bismillah" sebelum memulakan wuduk.' },
  { icon: '🦷', label: 'Gosok Gigi', desc: 'Menggosok gigi (bersiwak) sebelum berwuduk.' },
  { icon: '🖐️', label: 'Basuh Tangan 3×', desc: 'Membasuh kedua-dua belah tangan hingga pergelangan terlebih dahulu.' },
  { icon: '👄', label: 'Kumur-kumur', desc: 'Memasukkan air ke dalam mulut dan berkumur.' },
  { icon: '👃', label: 'Air ke Hidung', desc: 'Memasukkan air ke dalam lubang hidung kemudian menghembusnya keluar.' },
  { icon: '3️⃣', label: 'Basuh 3 Kali', desc: 'Membasuh setiap anggota wuduk sebanyak tiga kali.' },
];

const BATAL = [
  { icon: '🚽', label: 'Keluar dari Qubul/Dubur', desc: 'Keluar apa-apa sahaja dari tempat buang air — seperti air kencing, angin, atau najis.' },
  { icon: '😴', label: 'Tidur / Pengsan', desc: 'Tidur nyenyak, pengsan, atau hilang akal menyebabkan wuduk batal.' },
  { icon: '✋', label: 'Sentuh Kemaluan', desc: 'Menyentuh kemaluan sendiri dengan tapak tangan tanpa lapik.' },
  { icon: '🤝', label: 'Sentuh Bukan Mahram', desc: 'Bersentuhan kulit antara lelaki dan perempuan yang bukan mahram.' },
];

const QUESTIONS = shuffle([
  { question: 'Berapakah rukun wuduk?', answer: '6', options: ['4', '5', '6', '7'] },
  { question: 'Rukun wuduk ke-1?', answer: 'Niat', options: ['Niat', 'Basuh muka', 'Basuh kaki', 'Tertib'] },
  { question: 'Rukun wuduk ke-2?', answer: 'Basuh muka', options: ['Niat', 'Basuh muka', 'Sapu kepala', 'Basuh kaki'] },
  { question: 'Rukun wuduk ke-3?', answer: 'Basuh tangan', options: ['Basuh muka', 'Basuh tangan', 'Sapu kepala', 'Tertib'] },
  { question: 'Rukun wuduk ke-4?', answer: 'Sapu kepala', options: ['Basuh tangan', 'Sapu kepala', 'Basuh kaki', 'Niat'] },
  { question: 'Rukun wuduk ke-5?', answer: 'Basuh kaki', options: ['Niat', 'Basuh muka', 'Basuh kaki', 'Tertib'] },
  { question: 'Rukun wuduk ke-6?', answer: 'Tertib', options: ['Niat', 'Sapu kepala', 'Basuh kaki', 'Tertib'] },
  { question: 'Basuh tangan — hingga mana?', answer: 'Siku', options: ['Siku', 'Bahu', 'Jari sahaja', 'Pergelangan'] },
  { question: 'Basuh kaki — hingga mana?', answer: 'Buku lali', options: ['Lutut', 'Buku lali', 'Betis', 'Jari kaki'] },
  { question: 'Wuduk batal jika?', answer: 'Tidur nyenyak', options: ['Tidur nyenyak', 'Bersolat', 'Makan', 'Berjalan'] },
  { question: 'Wuduk batal jika?', answer: 'Keluar angin', options: ['Keluar angin', 'Minum air', 'Membaca', 'Duduk'] },
  { question: 'Sunat wuduk yang pertama?', answer: 'Baca Bismillah', options: ['Baca Bismillah', 'Kumur-kumur', 'Basuh tangan', 'Gosok gigi'] },
]);

const TOTAL_ROUNDS = 10;

const THEME = {
  pageGradient: 'linear-gradient(180deg, #EBF8FF 0%, #E0F2FE 40%, #F0F9FF 100%)',
  dark: '#0C4A6E',
  accent: '#0891B2',
  stageGradient: 'linear-gradient(145deg, #0E7490, #0891B2, #06B6D4)',
  pillGradient: 'linear-gradient(135deg, #0891B2, #06B6D4)',
};

export default function AmaliWuduk({ onBack, language = 'bm' }) {
  const ALL_ITEMS = [
    { section: 'Rukun Wuduk', items: RUKUN.map(r => ({ icon: r.icon, title: r.label, sublabel: `Rukun ke-${r.n}`, desc: r.desc })) },
    { section: 'Sunat Wuduk', items: SUNAT.map(s => ({ icon: s.icon, title: s.label, sublabel: 'Sunat', desc: s.desc })) },
    { section: 'Perkara Membatalkan', items: BATAL.map(b => ({ icon: b.icon, title: b.label, sublabel: 'Batal', desc: b.desc })) },
  ];
  const topics = ALL_ITEMS.flatMap(group =>
    group.items.map(item => ({
      visual: <span style={{ fontSize: '3.2rem', lineHeight: 1 }}>{item.icon}</span>,
      title: item.title,
      sublabel: item.sublabel,
      desc: item.desc,
    }))
  );

  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Ibadah › "
      breadcrumbActive={language === 'bm' ? 'Amali Wuduk' : 'Wuduk Practice'}
      title={language === 'bm' ? 'Amali Wuduk' : 'Wuduk Practice'}
      lead={language === 'bm'
        ? 'Mari belajar rukun wuduk, sunat wuduk, dan perkara yang membatalkan wuduk.'
        : 'Learn the pillars, recommended acts, and invalidators of wuduk (ablution).'}
      icon="🤲"
      theme={THEME}
      topics={topics}
      questions={QUESTIONS}
      totalRounds={TOTAL_ROUNDS}
      accentColor="#0891B2"
    />
  );
}
