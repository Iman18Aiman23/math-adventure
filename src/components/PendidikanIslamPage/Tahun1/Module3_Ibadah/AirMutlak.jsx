import React, { useState, useCallback, useEffect } from 'react';
import { playHoverSound } from '../../../../utils/soundManager';
import { shuffle } from '../../_shared/utils';
import SpeechManager from '../../../../services/SpeechManager';
import Tahun1LessonLayout, { QuizScreen, ResultScreen } from '../Tahun1LessonLayout';

const JENIS_AIR = [
  {
    icon: '✅', title: 'Air Mutlak', verdict: 'BOLEH bersuci', verdictColor: '#065F46',
    desc: 'Air semula jadi yang belum tercemar. Boleh digunakan untuk wuduk, mandi wajib, dan istinja\'.',
    examples: ['🌧️ Hujan', '🏞️ Sungai', '🚰 Paip', '🌊 Laut', '🧊 Salji', '🪨 Perigi'],
    gradient: 'linear-gradient(135deg, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
    border: 'rgba(42,154,108,0.5)', accent: '#10B981',
  },
  {
    icon: '⚠️', title: "Air Musta'mal", verdict: 'TIDAK BOLEH bersuci lagi', verdictColor: '#92400E',
    desc: "Air yang sudah digunakan untuk bersuci. Air ini masih suci tetapi tidak boleh digunakan lagi untuk wuduk atau mandi wajib.",
    examples: ['🪣 Bekas wuduk', '🛁 Bekas mandi'],
    gradient: 'linear-gradient(135deg, #FFF7D6 0%, #FDD97A 55%, #D4960A 100%)',
    border: 'rgba(212,150,10,0.5)', accent: '#F59E0B',
  },
  {
    icon: '❌', title: 'Air Najis', verdict: 'HARAM untuk bersuci', verdictColor: '#7F1D1D',
    desc: 'Air yang telah bercampur dengan najis (kotoran). Tidak boleh digunakan untuk bersuci langsung.',
    examples: ['🚫 Air kencing', '🚫 Air campur najis'],
    gradient: 'linear-gradient(135deg, #FEE2E2 0%, #FCA5A5 55%, #EF4444 100%)',
    border: 'rgba(239,68,68,0.5)', accent: '#EF4444',
  },
];

const QUESTIONS = shuffle([
  { question: 'Air hujan adalah jenis apa?', answer: 'Air mutlak', options: ['Air mutlak', "Air musta'mal", 'Air najis', 'Air kotor'] },
  { question: 'Air mutlak boleh digunakan untuk?', answer: 'Wuduk', options: ['Wuduk', 'Memasak sahaja', 'Minum sahaja', 'Menyiram pokok'] },
  { question: 'Air bekas wuduk dipanggil?', answer: "Air musta'mal", options: ['Air mutlak', "Air musta'mal", 'Air najis', 'Air bersih'] },
  { question: "Boleh wuduk guna air musta'mal?", answer: 'Tidak boleh', options: ['Boleh', 'Tidak boleh', 'Kadang-kadang', 'Terpulang'] },
  { question: 'Air laut termasuk jenis?', answer: 'Air mutlak', options: ['Air mutlak', "Air musta'mal", 'Air najis', 'Air masin'] },
  { question: 'Air kencing adalah jenis apa?', answer: 'Air najis', options: ['Air mutlak', "Air musta'mal", 'Air najis', 'Air kotor'] },
  { question: 'Berapa jenis air dalam Islam?', answer: '3 jenis', options: ['2 jenis', '3 jenis', '4 jenis', '5 jenis'] },
  { question: 'Air paip dari rumah termasuk?', answer: 'Air mutlak', options: ['Air mutlak', "Air musta'mal", 'Air najis', 'Air biasa'] },
  { question: 'Air salji adalah jenis apa?', answer: 'Air mutlak', options: ['Air mutlak', "Air musta'mal", 'Air najis', 'Air beku'] },
  { question: 'Air mutlak bermaksud?', answer: 'Suci dan menyucikan', options: ['Suci dan menyucikan', 'Kotor', 'Sudah digunakan', 'Bercampur najis'] },
]);

const TOTAL_ROUNDS = 10;

function JenisCard({ j }) {
  const [showDesc, setShowDesc] = useState(false);
  return (
    <div style={{ background: j.gradient, border: `2.5px solid ${j.border}`, borderRadius: 20, padding: '18px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, boxShadow: '0 2px 0 rgba(255,255,255,0.35) inset, 0 8px 20px rgba(0,0,0,0.1)', textAlign: 'center' }}>
      <span style={{ fontSize: '2.6rem', lineHeight: 1 }}>{j.icon}</span>
      <p style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', color: '#1A202C', margin: 0 }}>{j.title}</p>
      <span style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 800, fontSize: 'clamp(0.72rem, 1.8vw, 0.85rem)', color: j.verdictColor, background: 'rgba(255,255,255,0.6)', padding: '3px 12px', borderRadius: 999 }}>{j.verdict}</span>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', justifyContent: 'center' }}>
        {j.examples.map((ex, i) => (
          <span key={i} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 'clamp(0.68rem, 1.5vw, 0.78rem)', color: j.verdictColor, background: 'rgba(255,255,255,0.45)', padding: '2px 9px', borderRadius: 999 }}>{ex}</span>
        ))}
      </div>

      {showDesc && (
        <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 'clamp(0.72rem, 1.8vw, 0.84rem)', color: '#374151', margin: 0, lineHeight: 1.5, background: 'rgba(255,255,255,0.55)', borderRadius: 10, padding: '7px 10px', width: '100%', boxSizing: 'border-box' }}>
          {j.desc}
        </p>
      )}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={() => { setShowDesc(s => !s); playHoverSound(); }}
          style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '0.72rem', color: j.verdictColor, background: 'rgba(255,255,255,0.45)', border: 'none', borderRadius: 999, padding: '3px 12px', cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}
        >
          {showDesc ? '▲ Tutup' : 'ℹ️ Penjelasan'}
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); SpeechManager.stopSpeaking(); SpeechManager.speak(j.desc, 'ms-MY', { rate: 0.8 }); }}
          style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '0.72rem', color: j.verdictColor, background: 'rgba(255,255,255,0.45)', border: 'none', borderRadius: 999, padding: '3px 12px', cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}
        >
          🔊
        </button>
      </div>
    </div>
  );
}

export default function AirMutlak({ onBack, language = 'bm' }) {
  const [tab, setTab] = useState('belajar');
  const [quizDone, setQuizDone] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [quizKey, setQuizKey] = useState(0);
  useEffect(() => () => SpeechManager.stopSpeaking(), []);
  return (
    <Tahun1LessonLayout
      onBack={onBack}
      language={language}
      breadcrumb="Ibadah › Topik 3.2"
      title={language === 'bm' ? 'Air Mutlak' : 'Pure Water'}
      accentColor="#0891B2"
      tab={tab}
      onTabChange={(id) => { playHoverSound(); if (id === 'kuiz') { setQuizDone(false); setQuizKey(k => k + 1); } setTab(id); }}
    >
      {tab === 'belajar' ? (
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 1.25rem calc(80px + var(--safe-bottom, 0px))' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {JENIS_AIR.map((j, i) => <JenisCard key={i} j={j} />)}
          </div>
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button onClick={() => { setTab('kuiz'); setQuizDone(false); setQuizKey(k => k + 1); playHoverSound(); }} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '1.05rem', background: 'linear-gradient(135deg, #0E7490, #0891B2)', color: '#fff', border: 'none', borderRadius: 999, padding: '12px 32px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(8,145,178,0.4)' }}>🎯 {language === 'bm' ? 'Mula Kuiz' : 'Start Quiz'} →</button>
          </div>
        </div>
      ) : quizDone ? (
        <ResultScreen
          score={finalScore}
          totalRounds={TOTAL_ROUNDS}
          onRetry={() => { setQuizDone(false); setQuizKey(k => k + 1); }}
          onBack={() => setTab('belajar')}
          language={language}
          accentColor="#0891B2"
          accentGradient="linear-gradient(135deg, #0E7490, #0891B2)"
        />
      ) : (
        <QuizScreen
          key={quizKey}
          language={language}
          questions={QUESTIONS}
          totalRounds={TOTAL_ROUNDS}
          accentColor="#0891B2"
          onDone={(s) => { setFinalScore(s); setQuizDone(true); }}
          emoji="🌊"
        />
      )}
    </Tahun1LessonLayout>
  );
}
