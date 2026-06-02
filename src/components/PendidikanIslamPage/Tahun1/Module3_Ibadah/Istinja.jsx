import React, { useState, useCallback, useEffect } from 'react';
import { playHoverSound } from '../../../../utils/soundManager';
import { shuffle } from '../../_shared/utils';
import SpeechManager from '../../../../services/SpeechManager';
import Tahun1LessonLayout, { QuizScreen, ResultScreen } from '../Tahun1LessonLayout';

const KONSEP = [
  {
    icon: '📖', label: "Apa itu Istinja'?", sublabel: 'Bersih selepas buang air',
    desc: "Istinja' ialah membersihkan najis yang keluar dari tempat buang air besar atau air kecil.",
    color: '#1E40AF', accent: '#3B82F6',
    gradient: 'linear-gradient(135deg, #D6EEFF 0%, #6BAEE8 55%, #2563EB 100%)',
    border: 'rgba(37,99,235,0.5)',
  },
  {
    icon: '⚖️', label: 'Hukum: WAJIB', sublabel: 'Mesti dilakukan',
    desc: "Hukum melakukan istinja' adalah WAJIB bagi setiap Muslim selepas buang air besar atau kecil.",
    color: '#065F46', accent: '#10B981',
    gradient: 'linear-gradient(135deg, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
    border: 'rgba(42,154,108,0.5)',
  },
  {
    icon: '💧', label: 'Cara Terbaik', sublabel: 'Guna air bersih',
    desc: "Cara terbaik ialah menggunakan air bersih (air mutlak) untuk membersihkan najis dengan sempurna.",
    color: '#0C4A6E', accent: '#0891B2',
    gradient: 'linear-gradient(135deg, #D0F7FA 0%, #67D6E8 55%, #0891B2 100%)',
    border: 'rgba(8,145,178,0.5)',
  },
  {
    icon: '🪣', label: 'Tiada Air?', sublabel: 'Tisu/batu — 3 kali sapu',
    desc: "Jika tiada air, boleh gunakan tisu, batu, atau kertas bersih. Sapu sekurang-kurangnya 3 kali sehingga bersih.",
    color: '#92400E', accent: '#F59E0B',
    gradient: 'linear-gradient(135deg, #FFF7D6 0%, #FDD97A 55%, #D4960A 100%)',
    border: 'rgba(212,150,10,0.5)',
  },
  {
    icon: '🚻', label: 'Masuk Tandas', sublabel: 'Kaki kiri dahulu',
    desc: "Apabila masuk tandas, mulakan dengan kaki kiri dan baca doa masuk tandas.",
    color: '#4C1D95', accent: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #E7D9FF 0%, #B79CFF 55%, #7A55E0 100%)',
    border: 'rgba(122,85,224,0.5)',
  },
  {
    icon: '🚪', label: 'Keluar Tandas', sublabel: 'Kaki kanan dahulu',
    desc: "Apabila keluar dari tandas, mulakan dengan kaki kanan dan baca doa syukur.",
    color: '#9D174D', accent: '#EC4899',
    gradient: 'linear-gradient(135deg, #FFE9F3 0%, #FFBFDD 55%, #FF8CBF 100%)',
    border: 'rgba(236,72,153,0.5)',
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
        <button
          onClick={() => { setShowDesc(s => !s); playHoverSound(); }}
          style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '0.72rem', color: k.color, background: 'rgba(255,255,255,0.45)', border: 'none', borderRadius: 999, padding: '3px 12px', cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}
        >
          {showDesc ? '▲ Tutup' : 'ℹ️ Penjelasan'}
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); SpeechManager.stopSpeaking(); SpeechManager.speak(k.desc, 'ms-MY', { rate: 0.8 }); }}
          style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '0.72rem', color: k.color, background: 'rgba(255,255,255,0.45)', border: 'none', borderRadius: 999, padding: '3px 12px', cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}
        >
          🔊
        </button>
      </div>
    </div>
  );
}

export default function Istinja({ onBack, language = 'bm' }) {
  const [tab, setTab] = useState('belajar');
  const [quizDone, setQuizDone] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [quizKey, setQuizKey] = useState(0);
  useEffect(() => () => SpeechManager.stopSpeaking(), []);
  return (
    <Tahun1LessonLayout
      onBack={onBack}
      language={language}
      breadcrumb="Ibadah › Topik 3.1"
      title={language === 'bm' ? "Istinja'" : "Istinja'"}
      accentColor="#2563EB"
      tab={tab}
      onTabChange={(id) => { playHoverSound(); if (id === 'kuiz') { setQuizDone(false); setQuizKey(k => k + 1); } setTab(id); }}
    >
      {tab === 'belajar' ? (
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 1.25rem calc(80px + var(--safe-bottom, 0px))' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.8rem' }}>
            {KONSEP.map((k, i) => <ConceptCard key={i} k={k} />)}
          </div>
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button onClick={() => { setTab('kuiz'); setQuizDone(false); setQuizKey(k => k + 1); playHoverSound(); }} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '1.05rem', background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)', color: '#fff', border: 'none', borderRadius: 999, padding: '12px 32px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(37,99,235,0.4)' }}>🎯 {language === 'bm' ? 'Mula Kuiz' : 'Start Quiz'} →</button>
          </div>
        </div>
      ) : quizDone ? (
        <ResultScreen
          score={finalScore}
          totalRounds={TOTAL_ROUNDS}
          onRetry={() => { setQuizDone(false); setQuizKey(k => k + 1); }}
          onBack={() => setTab('belajar')}
          language={language}
          accentColor="#2563EB"
          accentGradient="linear-gradient(135deg, #1D4ED8, #3B82F6)"
        />
      ) : (
        <QuizScreen
          key={quizKey}
          language={language}
          questions={QUESTIONS}
          totalRounds={TOTAL_ROUNDS}
          accentColor="#2563EB"
          onDone={(s) => { setFinalScore(s); setQuizDone(true); }}
          emoji="💧"
        />
      )}
    </Tahun1LessonLayout>
  );
}
