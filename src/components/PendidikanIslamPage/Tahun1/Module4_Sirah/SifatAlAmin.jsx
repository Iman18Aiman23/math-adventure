import React, { useState, useCallback, useEffect } from 'react';
import { playHoverSound } from '../../../../utils/soundManager';
import { shuffle } from '../../_shared/utils';
import SpeechManager from '../../../../services/SpeechManager';
import { QuizScreen, ResultScreen } from '../Tahun1LessonLayout';
import Tahun1LessonLayout from '../Tahun1LessonLayout';

const KONSEP = [
  {
    icon: '🌟', label: 'Al-Amin', sublabel: 'Yang dipercayai',
    desc: 'Nabi Muhammad digelar Al-Amin yang bermaksud "yang amanah" atau "yang dipercayai". Golongan Quraisy sendiri menggelar baginda Al-Amin kerana sifat jujur dan amanah.',
    color: '#9D174D', accent: '#EC4899',
    gradient: 'linear-gradient(135deg, #FFE9F3 0%, #FFBFDD 55%, #FF8CBF 100%)',
    border: 'rgba(236,72,153,0.5)',
  },
  {
    icon: '⚖️', label: 'Jujur & Amanah', sublabel: 'Sejak kecil',
    desc: 'Sejak kecil, Nabi terkenal dengan sifat jujur dan amanah. Setiap kata-kata baginda boleh dipercayai. Baginda tidak pernah berdusta walau sekali pun.',
    color: '#4C1D95', accent: '#7A55E0',
    gradient: 'linear-gradient(135deg, #E7D9FF 0%, #B79CFF 55%, #7A55E0 100%)',
    border: 'rgba(122,85,224,0.5)',
  },
  {
    icon: '🐑', label: 'Mengembala Kambing', sublabel: 'Usia remaja',
    desc: 'Nabi mengembala kambing milik orang Quraisy. Baginda menjaga kambing dengan baik dan bertanggungjawab, tidak pernah hilang atau cuai dalam tugas.',
    color: '#065F46', accent: '#10B981',
    gradient: 'linear-gradient(135deg, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
    border: 'rgba(42,154,108,0.5)',
  },
  {
    icon: '🧳', label: 'Berniaga untuk Khadijah', sublabel: 'Dagangan yang jujur',
    desc: 'Nabi berniaga modal Khadijah. Baginda berniaga dengan jujur dan mendapat keuntungan yang banyak. Khadijah kagum dengan kejujuran dan sifat amanah baginda.',
    color: '#92400E', accent: '#F59E0B',
    gradient: 'linear-gradient(135deg, #FFF7D6 0%, #FDD97A 55%, #D4960A 100%)',
    border: 'rgba(212,150,10,0.5)',
  },
  {
    icon: '🕋', label: 'Peletakan Hajar Aswad', sublabel: 'Keputusan bijak',
    desc: 'Ketika pembinaan Kaabah, kabilah Quraisy bertengkar siapa yang berhak meletakkan Hajar Aswad. Nabi menyelesaikan dengan meletakkan Hajar Aswad di atas kain dan semua kabilah memegang kain bersama-sama.',
    color: '#0C4A6E', accent: '#0891B2',
    gradient: 'linear-gradient(135deg, #D0F7FA 0%, #67D6E8 55%, #0891B2 100%)',
    border: 'rgba(8,145,178,0.5)',
  },
  {
    icon: '🤝', label: 'Teladan Terbaik', sublabel: 'Ikuti sifat Nabi',
    desc: 'Kita hendaklah mencontohi sifat amanah, jujur dan bertanggungjawab Nabi Muhammad SAW dalam kehidupan seharian. Itulah akhlak yang mulia.',
    color: '#1E40AF', accent: '#3B82F6',
    gradient: 'linear-gradient(135deg, #D6EEFF 0%, #6BAEE8 55%, #2563EB 100%)',
    border: 'rgba(37,99,235,0.5)',
  },
];

const QUESTIONS = shuffle([
  { question: 'Apakah gelaran Nabi Muhammad SAW?', answer: 'Al-Amin', options: ['Al-Amin', 'Al-Khaliq', 'Ar-Rahman', 'Al-Malik'] },
  { question: 'Maksud Al-Amin?', answer: 'Yang dipercayai', options: ['Yang dipercayai', 'Yang kuat', 'Yang kaya', 'Yang mulia'] },
  { question: 'Siapa yang memberi modal kepada Nabi untuk berniaga?', answer: 'Khadijah', options: ['Khadijah', 'Abu Talib', 'Aminah', 'Abdul Muttalib'] },
  { question: 'Apa pekerjaan Nabi sebelum dilantik menjadi rasul?', answer: 'Berniaga & mengembala', options: ['Berniaga & mengembala', 'Bertani', 'Memancing', 'Memburu'] },
  { question: 'Peristiwa apa yang menunjukkan sifat amanah Nabi?', answer: 'Peletakan Hajar Aswad', options: ['Peletakan Hajar Aswad', 'Pembukaan Mekah', 'Hijrah ke Madinah', 'Perang Badar'] },
  { question: 'Bagaimana Nabi menyelesaikan pertelingkahan Hajar Aswad?', answer: 'Guna kain diangkat bersama', options: ['Guna kain diangkat bersama', 'Dengan undian', 'Dengan pertandingan', 'Dengan pilihan raya'] },
  { question: 'Siapa yang menggelar Nabi sebagai Al-Amin?', answer: 'Orang Quraisy', options: ['Orang Quraisy', 'Ahli keluarga', 'Para malaikat', 'Pemerintah Rom'] },
  { question: 'Apa yang dikagumi Khadijah tentang Nabi?', answer: 'Kejujuran & amanah', options: ['Kejujuran & amanah', 'Kekayaan', 'Kekuatan', 'Keturunan'] },
  { question: 'Nabi pernah mengembala apa?', answer: 'Kambing', options: ['Kambing', 'Unta', 'Lem bu', 'Kerbau'] },
  { question: 'Kita patut mencontohi sifat Nabi yang?', answer: 'Amanah dan jujur', options: ['Amanah dan jujur', 'Kaya dan kuat', 'Tampan dan gagah', 'Pandai dan bijak'] },
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
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
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
    </div>
  );
}

export default function SifatAlAmin({ onBack, language = 'bm' }) {
  const [tab, setTab] = useState('belajar');
  const [quizDone, setQuizDone] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [quizKey, setQuizKey] = useState(0);
  useEffect(() => () => SpeechManager.stopSpeaking(), []);
  return (
    <Tahun1LessonLayout
      onBack={onBack}
      language={language}
      breadcrumb="Sirah › Topik 4.3"
      title={language === 'bm' ? 'Sifat Terpuji: Al-Amin' : 'Noble Trait: Al-Amin'}
      accentColor="#EC4899"
      tab={tab}
      onTabChange={(id) => { setTab(id); playHoverSound(); if (id === 'kuiz') { setQuizDone(false); setQuizKey(k => k + 1); } }}
    >
      {tab === 'belajar' ? (
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 1.25rem calc(80px + var(--safe-bottom, 0px))' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.8rem' }}>
            {KONSEP.map((k, i) => <ConceptCard key={i} k={k} />)}
          </div>
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button onClick={() => { setTab('kuiz'); setQuizDone(false); setQuizKey(k => k + 1); playHoverSound(); }} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '1.05rem', background: 'linear-gradient(135deg, #BE185D, #FF8CBF)', color: '#fff', border: 'none', borderRadius: 999, padding: '12px 32px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(255,140,191,0.4)' }}>🎯 {language === 'bm' ? 'Mula Kuiz' : 'Start Quiz'} →</button>
          </div>
        </div>
      ) : quizDone ? (
        <div style={{ flex: 1, overflowY: 'auto' }}><ResultScreen score={finalScore} totalRounds={TOTAL_ROUNDS} onRetry={() => { setQuizDone(false); setQuizKey(k => k + 1); }} onBack={() => setTab('belajar')} language={language} accentColor="#EC4899" accentGradient='linear-gradient(135deg, #BE185D, #FF8CBF)' /></div>
      ) : (
        <div style={{ flex: 1, minHeight: 0, display: 'flex', overflow: 'hidden' }}><QuizScreen key={quizKey} language={language} questions={QUESTIONS} totalRounds={TOTAL_ROUNDS} accentColor="#EC4899" emoji="🌟" onDone={(s) => { setFinalScore(s); setQuizDone(true); }} /></div>
      )}
    </Tahun1LessonLayout>
  );
}
