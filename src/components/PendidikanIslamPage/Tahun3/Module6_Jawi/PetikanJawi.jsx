import React from 'react';
import Tahun1LessonScrollLayout from '../../Tahun1/Tahun1LessonScrollLayout';
import { shuffle } from '../../_shared/utils';

const AYAT = [
  { id: 'a1', rumi: 'Saya pergi ke sekolah.', jawi: 'ساي ڤرڬي ك سكوله', color: '#C2410C' },
  { id: 'a2', rumi: 'Ibu membaca buku.', jawi: 'ايبو ممباخ بوكو', color: '#EA580C' },
  { id: 'a3', rumi: 'Dia menulis dengan pensel.', jawi: 'دي منوليس دڠن ڤينسل', color: '#F97316' },
  { id: 'a4', rumi: 'Kucing itu sedang tidur.', jawi: 'كوچيڠ ايت سدڠ تيدور', color: '#C2410C' },
  { id: 'a5', rumi: 'Mereka bermain di taman.', jawi: 'مريك برمين د تامن', color: '#EA580C' },
  { id: 'a6', rumi: 'Bunga ini sangat cantik.', jawi: 'بوڠا اين ساڠت چنتيق', color: '#F97316' },
];

const TOTAL_ROUNDS = 10;

function buildQuestions() {
  const qs = AYAT.map(a => {
    const wrong = shuffle(AYAT.filter(x => x.id !== a.id)).slice(0, 3).map(x => x.rumi);
    return { question: `Apakah maksud tulisan Jawi ini?\n${a.jawi}`, answer: a.rumi, options: shuffle([a.rumi, ...wrong]) };
  });
  qs.push({ question: 'Tulisan Jawi ditulis dari arah mana?', answer: 'Kanan ke kiri', options: shuffle(['Kanan ke kiri', 'Kiri ke kanan', 'Atas ke bawah', 'Bawah ke atas']) });
  return qs;
}

const THEME = {
  pageGradient: 'radial-gradient(ellipse at top, #FEF3C7 0%, #FDBA74 55%, #F97316 100%)',
  dark: '#C2410C',
  accent: '#F97316',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#FFEDD5 0%,#FDBA74 55%,#F97316 100%)',
  pillGradient: 'linear-gradient(180deg,#FDBA74,#F97316)',
};

export default function PetikanJawi({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Celik Jawi › "
      breadcrumbActive="Petikan Jawi Pendek"
      title="Petikan Jawi Pendek"
      lead={language === 'bm'
        ? 'Mari baca petikan Jawi mudah — latihan membaca perkataan dan ayat pendek dalam tulisan Jawi.'
        : 'Let\'s read easy Jawi passages — practice reading words and short sentences in Jawi script.'}
      icon="📝"
      theme={THEME}
      topics={AYAT.map(a => ({
        visual: (
          <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: '1.1rem', color: a.color, direction: 'rtl', textAlign: 'center' }}>{a.jawi}</span>
        ),
        title: a.rumi,
        sublabel: '',
        desc: `Tulisan Jawi: ${a.jawi}`,
      }))}
      questions={buildQuestions()}
      totalRounds={TOTAL_ROUNDS}
      accentColor="#F97316"
    />
  );
}
