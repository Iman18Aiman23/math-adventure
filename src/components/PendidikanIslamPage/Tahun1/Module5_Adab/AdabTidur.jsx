import React, { useState, useCallback, useEffect } from 'react';
import Tahun1LessonLayout, { QuizScreen, ResultScreen } from '../Tahun1LessonLayout';
import { playHoverSound } from '../../../../utils/soundManager';
import { shuffle } from '../../_shared/utils';
import SpeechManager from '../../../../services/SpeechManager';

const KONSEP = [
  {
    icon: '🌙', label: 'Doa Sebelum Tidur', sublabel: 'Baca doa tidur',
    desc: 'Sebelum tidur, bacalah doa: "Bismikallahumma ahya wa amut" — Dengan nama-Mu Ya Allah aku hidup dan mati. Juga baca Al-Ikhlas, Al-Falaq dan An-Nas.',
    color: '#0C4A6E', accent: '#0891B2',
    gradient: 'linear-gradient(135deg, #D0F7FA 0%, #67D6E8 55%, #0891B2 100%)',
    border: 'rgba(8,145,178,0.5)',
  },
  {
    icon: '➡️', label: 'Tidur Mengiring ke Kanan', sublabel: 'Sunat Nabi',
    desc: 'Tidurlah mengiring ke sebelah kanan, menghadap kiblat. Ini adalah cara tidur yang paling baik dan sunnah Nabi. Jangan tidur meniarap.',
    color: '#1E40AF', accent: '#3B82F6',
    gradient: 'linear-gradient(135deg, #D6EEFF 0%, #6BAEE8 55%, #2563EB 100%)',
    border: 'rgba(37,99,235,0.5)',
  },
  {
    icon: '🧹', label: 'Kemas Tempat Tidur', sublabel: 'Sejadah & bantal',
    desc: 'Sebelum tidur, kemas dan lap tempat tidur. Sapu tempat tidur dengan kain untuk membuang habuk dan kotoran.',
    color: '#065F46', accent: '#10B981',
    gradient: 'linear-gradient(135deg, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
    border: 'rgba(42,154,108,0.5)',
  },
  {
    icon: '🕰️', label: 'Jangan Tidur Lewat', sublabel: 'Tidur awal, bangun awal',
    desc: 'Tidurlah awal supaya dapat bangun awal untuk solat Subuh. Rasulullah tidak suka tidur lewat selepas Isyak tanpa ada keperluan.',
    color: '#92400E', accent: '#F59E0B',
    gradient: 'linear-gradient(135deg, #FFF7D6 0%, #FDD97A 55%, #D4960A 100%)',
    border: 'rgba(212,150,10,0.5)',
  },
  {
    icon: '☀️', label: 'Doa Bangun Tidur', sublabel: 'Syukur pada Allah',
    desc: 'Apabila bangun tidur, bacalah doa: "Alhamdulillahillazi ahyana ba\'da ma amatana wa ilaihin nusyur" — Segala puji bagi Allah yang menghidupkan kami selepas mematikan kami.',
    color: '#4C1D95', accent: '#7A55E0',
    gradient: 'linear-gradient(135deg, #E7D9FF 0%, #B79CFF 55%, #7A55E0 100%)',
    border: 'rgba(122,85,224,0.5)',
  },
  {
    icon: '🫡', label: 'Bersih & Gosok Gigi', sublabel: 'Selepas bangun',
    desc: 'Selepas bangun tidur, basuh muka dan gosok gigi. Rasulullah menggunakan siwak untuk membersihkan mulut selepas bangun.',
    color: '#9D174D', accent: '#EC4899',
    gradient: 'linear-gradient(135deg, #FFE9F3 0%, #FFBFDD 55%, #FF8CBF 100%)',
    border: 'rgba(236,72,153,0.5)',
  },
];

const QUESTIONS = shuffle([
  { question: 'Apa doa sebelum tidur?', answer: 'Bismikallahumma ahya wa amut', options: ['Bismikallahumma ahya wa amut', 'Alhamdulillahillazi ahyana', 'Rabbana atina', 'Subhanallah'] },
  { question: 'Cara tidur yang sunnah?', answer: 'Mengiring ke kanan', options: ['Mengiring ke kanan', 'Meniarap', 'Telentang', 'Mengiring ke kiri'] },
  { question: 'Apa doa bangun tidur?', answer: 'Alhamdulillahillazi ahyana', options: ['Alhamdulillahillazi ahyana', 'Bismikallahumma', 'Allahuakbar', 'Laa ilaha illallah'] },
  { question: 'Apa yang dilakukan sebelum tidur?', answer: 'Kemas & lap tempat tidur', options: ['Kemas & lap tempat tidur', 'Makan', 'Main', 'Baca buku'] },
  { question: 'Nabi menggunakan apa untuk bersihkan mulut?', answer: 'Siwak', options: ['Siwak', 'Berus gigi', 'Ubat gigi', 'Air garam'] },
  { question: 'Tidur yang baik adalah?', answer: 'Tidur awal, bangun awal', options: ['Tidur awal, bangun awal', 'Tidur lewat', 'Tidur petang', 'Tidur sepanjang hari'] },
  { question: 'Sebelum tidur kita baca surah?', answer: 'Al-Ikhlas, Al-Falaq, An-Nas', options: ['Al-Ikhlas, Al-Falaq, An-Nas', 'Al-Fatihah', 'Al-Baqarah', 'Yasin'] },
  { question: 'Tidur meniarap adalah?', answer: 'Tidak digalakkan', options: ['Tidak digalakkan', 'Digalakkan', 'Sunat', 'Wajib'] },
  { question: 'Rasulullah tidak suka tidur lewat selepas?', answer: 'Solat Isyak', options: ['Solat Isyak', 'Solat Maghrib', 'Solat Subuh', 'Solat Zuhur'] },
  { question: 'Selepas bangun tidur kita patut?', answer: 'Basuh muka & gosok gigi', options: ['Basuh muka & gosok gigi', 'Terus makan', 'Main', 'Tidur lagi'] },
]);

const TOTAL_ROUNDS = 10;

function ConceptCard({ k }) {
  const [showDesc, setShowDesc] = useState(false);
  return (
    <div style={{ background: k.gradient, border: `2.5px solid ${k.border}`, borderRadius: 20, padding: '16px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, boxShadow: '0 2px 0 rgba(255,255,255,0.35) inset, 0 8px 20px rgba(0,0,0,0.1)', textAlign: 'center' }}>
      <span style={{ fontSize: '2.6rem', lineHeight: 1 }}>{k.icon}</span>
      <p style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(0.85rem, 2.2vw, 1rem)', color: '#1A202C', margin: 0, lineHeight: 1.2 }}>{k.label}</p>
      <span style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.68rem, 1.6vw, 0.8rem)', color: k.color, background: 'rgba(255,255,255,0.5)', padding: '2px 10px', borderRadius: 999 }}>{k.sublabel}</span>
      {showDesc && (
        <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 'clamp(0.72rem, 1.8vw, 0.84rem)', color: '#374151', margin: 0, lineHeight: 1.5, background: 'rgba(255,255,255,0.55)', borderRadius: 10, padding: '7px 10px', width: '100%', boxSizing: 'border-box' }}>
          {k.desc}
        </p>
      )}
      <button onClick={() => { setShowDesc(s => !s); playHoverSound(); }} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '0.72rem', color: k.color, background: 'rgba(255,255,255,0.45)', border: 'none', borderRadius: 999, padding: '3px 12px', cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}>
        {showDesc ? '▲ Tutup' : 'ℹ️ Penjelasan'}
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); SpeechManager.stopSpeaking(); SpeechManager.speak(k.desc, 'ms-MY', { rate: 0.8 }); }}
        style={{
          fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700,
          fontSize: '0.72rem', color: k.color,
          background: 'rgba(255,255,255,0.45)', border: 'none', borderRadius: 999,
          padding: '3px 12px', cursor: 'pointer',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        🔊
      </button>
    </div>
  );
}

export default function AdabTidur({ onBack, language = 'bm' }) {
  const [tab, setTab] = useState('belajar');
  const [quizDone, setQuizDone] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [quizKey, setQuizKey] = useState(0);

  useEffect(() => () => SpeechManager.stopSpeaking(), []);

  const handleTabChange = useCallback((t) => {
    setTab(t);
    playHoverSound();
    if (t === 'kuiz') {
      setQuizDone(false);
      setQuizKey(k => k + 1);
    }
  }, []);

  return (
    <Tahun1LessonLayout
      onBack={onBack}
      language={language}
      breadcrumb="Adab &amp; Akhlak › Topik 5.2"
      title={language === 'bm' ? 'Adab Tidur &amp; Bangun' : 'Sleeping &amp; Waking Etiquette'}
      accentColor="#0891B2"
      tab={tab}
      onTabChange={handleTabChange}
    >
      <style>{`.at-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.8rem; }`}</style>
      {tab === 'belajar' ? (
        <div style={{ padding: '0 1.25rem' }}>
          <div className="at-grid">
            {KONSEP.map((k, i) => <ConceptCard key={i} k={k} />)}
          </div>
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button onClick={() => { setTab('kuiz'); setQuizDone(false); setQuizKey(k => k + 1); playHoverSound(); }} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '1.05rem', background: 'linear-gradient(135deg, #0E7490, #0891B2)', color: '#fff', border: 'none', borderRadius: 999, padding: '12px 32px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(8,145,178,0.4)' }}>🎯 {language === 'bm' ? 'Mula Kuiz' : 'Start Quiz'} →</button>
          </div>
        </div>
      ) : quizDone ? (
        <ResultScreen score={finalScore} totalRounds={TOTAL_ROUNDS} onRetry={() => { setQuizDone(false); setQuizKey(k => k + 1); }} onBack={() => setTab('belajar')} language={language} accentColor="#0891B2" accentGradient="linear-gradient(135deg, #0E7490, #0891B2)" />
      ) : (
        <QuizScreen key={quizKey} language={language} questions={QUESTIONS} totalRounds={TOTAL_ROUNDS} accentColor="#0891B2" onDone={(s) => { setFinalScore(s); setQuizDone(true); }} emoji="🌙" />
      )}
    </Tahun1LessonLayout>
  );
}
