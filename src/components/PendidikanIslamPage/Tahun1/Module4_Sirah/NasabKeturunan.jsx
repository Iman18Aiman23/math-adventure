import React, { useState, useCallback, useEffect } from 'react';
import { playHoverSound } from '../../../../utils/soundManager';
import { shuffle } from '../../_shared/utils';
import SpeechManager from '../../../../services/SpeechManager';
import { QuizScreen, ResultScreen } from '../Tahun1LessonLayout';
import Tahun1LessonLayout from '../Tahun1LessonLayout';

const KONSEP = [
  {
    icon: '👤', label: 'Nama Nabi', sublabel: 'Muhammad bin Abdullah',
    desc: 'Nabi kita ialah Muhammad bin Abdullah bin Abdul Muttalib bin Hashim. Baginda berasal dari suku Quraisy yang mulia.',
    color: '#4C1D95', accent: '#7A55E0',
    gradient: 'linear-gradient(135deg, #E7D9FF 0%, #B79CFF 55%, #7A55E0 100%)',
    border: 'rgba(122,85,224,0.5)',
  },
  {
    icon: '👨‍👩‍👧', label: 'Ibu & Bapa', sublabel: 'Aminah & Abdullah',
    desc: 'Bapa Nabi bernama Abdullah bin Abdul Muttalib. Ibu Nabi bernama Aminah binti Wahab. Bapa Nabi telah meninggal sebelum Nabi dilahirkan.',
    color: '#065F46', accent: '#10B981',
    gradient: 'linear-gradient(135deg, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
    border: 'rgba(42,154,108,0.5)',
  },
  {
    icon: '🌳', label: 'Salasilah', sublabel: 'Keturunan mulia',
    desc: 'Nasab Nabi sampai kepada Nabi Ibrahim AS. Keturunan baginda dari zuriat Ismail AS, anak Nabi Ibrahim AS. Garis keturunan ini sangat terhormat.',
    color: '#0C4A6E', accent: '#0891B2',
    gradient: 'linear-gradient(135deg, #D0F7FA 0%, #67D6E8 55%, #0891B2 100%)',
    border: 'rgba(8,145,178,0.5)',
  },
  {
    icon: '🏛️', label: 'Suku Quraisy', sublabel: 'Pemimpin Mekah',
    desc: 'Nabi berasal dari suku Quraisy, suku yang paling dihormati di Mekah. Kaum Quraisy adalah penjaga Kaabah dan pemimpin masyarakat Arab.',
    color: '#92400E', accent: '#F59E0B',
    gradient: 'linear-gradient(135deg, #FFF7D6 0%, #FDD97A 55%, #D4960A 100%)',
    border: 'rgba(212,150,10,0.5)',
  },
  {
    icon: '📜', label: 'Datuk Nabi', sublabel: 'Abdul Muttalib',
    desc: 'Datuk Nabi, Abdul Muttalib, adalah ketua suku Quraisy yang sangat dihormati. Selepas Abdullah meninggal, Abdul Muttalib menjaga Nabi.',
    color: '#1E40AF', accent: '#3B82F6',
    gradient: 'linear-gradient(135deg, #D6EEFF 0%, #6BAEE8 55%, #2563EB 100%)',
    border: 'rgba(37,99,235,0.5)',
  },
  {
    icon: '🤲', label: 'Keturunan Mulia', sublabel: 'Daripada zuriat Ismail',
    desc: 'Allah memilih keturunan yang paling mulia untuk Nabi Muhammad SAW, daripada nabi kepada nabi sehingga kepada Nabi Ibrahim AS.',
    color: '#9D174D', accent: '#EC4899',
    gradient: 'linear-gradient(135deg, #FFE9F3 0%, #FFBFDD 55%, #FF8CBF 100%)',
    border: 'rgba(236,72,153,0.5)',
  },
];

const QUESTIONS = shuffle([
  { question: 'Siapakah nama ibu Nabi Muhammad SAW?', answer: 'Aminah', options: ['Aminah', 'Aisyah', 'Khadijah', 'Fatimah'] },
  { question: 'Siapakah nama bapa Nabi Muhammad SAW?', answer: 'Abdullah', options: ['Abdullah', 'Abdul Muttalib', 'Abu Talib', 'Hashim'] },
  { question: 'Nabi Muhammad SAW berasal dari suku apa?', answer: 'Quraisy', options: ['Quraisy', 'Aus', 'Khazraj', 'Thaqif'] },
  { question: 'Siapakah nama datuk Nabi Muhammad SAW?', answer: 'Abdul Muttalib', options: ['Abdul Muttalib', 'Abdullah', 'Hashim', 'Abu Talib'] },
  { question: 'Bapa Nabi meninggal ketika Nabi berusia?', answer: 'Sebelum lahir', options: ['Sebelum lahir', '6 tahun', '2 tahun', '8 tahun'] },
  { question: 'Nabi Muhammad SAW adalah keturunan nabi?', answer: 'Nabi Ibrahim AS', options: ['Nabi Ibrahim AS', 'Nabi Musa AS', 'Nabi Isa AS', 'Nabi Nuh AS'] },
  { question: 'Siapakah penjaga Kaabah di Mekah?', answer: 'Kaum Quraisy', options: ['Kaum Quraisy', 'Kaum Aus', 'Kaum Thamud', 'Kaum Ad'] },
  { question: 'Nama penuh Nabi Muhammad SAW bin?', answer: 'Abdullah', options: ['Abdullah', 'Abdul Muttalib', 'Hashim', 'Abu Talib'] },
  { question: 'Keturunan Nabi Muhammad sampai kepada Nabi?', answer: 'Ismail AS', options: ['Ismail AS', 'Ishak AS', 'Yaakub AS', 'Yusuf AS'] },
  { question: 'Suku Quraisy terkenal sebagai?', answer: 'Pemimpin Mekah', options: ['Pemimpin Mekah', 'Pedagang Madinah', 'Petani Taif', 'Penternak Arab'] },
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

export default function NasabKeturunan({ onBack, language = 'bm' }) {
  const [tab, setTab] = useState('belajar');
  const [quizDone, setQuizDone] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [quizKey, setQuizKey] = useState(0);
  useEffect(() => () => SpeechManager.stopSpeaking(), []);
  return (
    <Tahun1LessonLayout
      onBack={onBack}
      language={language}
      breadcrumb="Sirah › Topik 4.1"
      title={language === 'bm' ? 'Nasab & Keturunan Nabi SAW' : 'Lineage of Prophet SAW'}
      accentColor="#7A55E0"
      tab={tab}
      onTabChange={(id) => { setTab(id); playHoverSound(); if (id === 'kuiz') { setQuizDone(false); setQuizKey(k => k + 1); } }}
    >
      {tab === 'belajar' ? (
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 1.25rem calc(80px + var(--safe-bottom, 0px))' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.8rem' }}>
            {KONSEP.map((k, i) => <ConceptCard key={i} k={k} />)}
          </div>
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button onClick={() => { setTab('kuiz'); setQuizDone(false); setQuizKey(k => k + 1); playHoverSound(); }} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '1.05rem', background: 'linear-gradient(135deg, #5B21B6, #7A55E0)', color: '#fff', border: 'none', borderRadius: 999, padding: '12px 32px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(122,85,224,0.4)' }}>🎯 {language === 'bm' ? 'Mula Kuiz' : 'Start Quiz'} →</button>
          </div>
        </div>
      ) : quizDone ? (
        <div style={{ flex: 1, overflowY: 'auto' }}><ResultScreen score={finalScore} totalRounds={TOTAL_ROUNDS} onRetry={() => { setQuizDone(false); setQuizKey(k => k + 1); }} onBack={() => setTab('belajar')} language={language} accentColor="#7A55E0" accentGradient='linear-gradient(135deg, #5B21B6, #7A55E0)' /></div>
      ) : (
        <div style={{ flex: 1, minHeight: 0, display: 'flex', overflow: 'hidden' }}><QuizScreen key={quizKey} language={language} questions={QUESTIONS} totalRounds={TOTAL_ROUNDS} accentColor="#7A55E0" emoji="🕌" onDone={(s) => { setFinalScore(s); setQuizDone(true); }} /></div>
      )}
    </Tahun1LessonLayout>
  );
}
