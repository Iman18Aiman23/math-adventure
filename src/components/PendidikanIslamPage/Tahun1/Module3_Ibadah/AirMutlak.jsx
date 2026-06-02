import React, { useState, useCallback } from 'react';
import { playHoverSound, playSound } from '../../../../utils/soundManager';
import { shuffle } from '../../_shared/utils';
import Celebration from '../../_shared/Celebration';
import Tahun1LessonLayout from '../Tahun1LessonLayout';

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

      {/* Example chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', justifyContent: 'center' }}>
        {j.examples.map((ex, i) => (
          <span key={i} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 'clamp(0.68rem, 1.5vw, 0.78rem)', color: j.verdictColor, background: 'rgba(255,255,255,0.45)', padding: '2px 9px', borderRadius: 999 }}>{ex}</span>
        ))}
      </div>

      {/* Toggle explanation */}
      {showDesc && (
        <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 'clamp(0.72rem, 1.8vw, 0.84rem)', color: '#374151', margin: 0, lineHeight: 1.5, background: 'rgba(255,255,255,0.55)', borderRadius: 10, padding: '7px 10px', width: '100%', boxSizing: 'border-box' }}>
          {j.desc}
        </p>
      )}
      <button
        onClick={() => { setShowDesc(s => !s); playHoverSound(); }}
        style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '0.72rem', color: j.verdictColor, background: 'rgba(255,255,255,0.45)', border: 'none', borderRadius: 999, padding: '3px 12px', cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}
      >
        {showDesc ? '▲ Tutup' : 'ℹ️ Penjelasan'}
      </button>
    </div>
  );
}

function QuizScreen({ language, onDone }) {
  const [pool] = useState(() => shuffle(QUESTIONS).slice(0, TOTAL_ROUNDS));
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [correct, setCorrect] = useState(null);
  const [animating, setAnimating] = useState(false);
  const q = pool[round];
  const handleAnswer = useCallback((opt) => {
    if (animating || chosen) return;
    const isCorrect = opt === q.answer;
    setChosen(opt); setCorrect(isCorrect);
    if (isCorrect) { setScore(s => s + 1); playSound('correct'); } else playSound('wrong');
    setAnimating(true);
    setTimeout(() => { setChosen(null); setCorrect(null); setAnimating(false); if (round + 1 >= TOTAL_ROUNDS) onDone(isCorrect ? score + 1 : score); else setRound(r => r + 1); }, 900);
  }, [animating, chosen, q, round, score, onDone]);
  if (!q) return null;
  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '0.75rem 1.25rem calc(0.75rem + var(--safe-bottom, 0px))', overflow: 'hidden' }}>
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ flex: 1, height: 8, borderRadius: 99, background: 'rgba(0,0,0,0.08)', overflow: 'hidden' }}><div style={{ height: '100%', width: `${(round / TOTAL_ROUNDS) * 100}%`, background: 'linear-gradient(90deg, #0891B2, #67E8F9)', borderRadius: 99, transition: 'width 0.4s ease' }} /></div>
        <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '0.85rem', color: '#67E8F9', whiteSpace: 'nowrap' }}>{round + 1} / {TOTAL_ROUNDS}</span>
        <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '0.85rem', color: '#F59E0B' }}>⭐ {score}</span>
      </div>
      <div style={{ flex: 1, minHeight: 0, background: '#FFFFFF', border: '2px solid rgba(0,0,0,0.06)', borderRadius: 20, padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', textAlign: 'center', position: 'relative', overflow: 'visible' }}>
        {chosen && correct && <Celebration />}
        <span style={{ fontSize: '3rem' }}>🌊</span>
        <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: 'var(--pi-ink)', margin: 0, lineHeight: 1.4, maxWidth: 320 }}>{q.question}</p>
      </div>
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {q.options.map(opt => {
          const isChosen = chosen === opt, isCorrect = isChosen && correct, isWrong = isChosen && !correct, isAnswer = chosen && opt === q.answer && !isChosen;
          return <button key={opt} onClick={() => handleAnswer(opt)} disabled={!!chosen} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.9rem, 2.2vw, 1.05rem)', padding: '13px 16px', borderRadius: 14, border: '2.5px solid', cursor: chosen ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all 0.2s ease', background: isCorrect ? '#10B981' : isWrong ? '#EF4444' : isAnswer ? 'rgba(16,185,129,0.2)' : '#FFFFFF', borderColor: isCorrect ? '#10B981' : isWrong ? '#EF4444' : isAnswer ? '#10B981' : 'rgba(0,0,0,0.1)', color: isCorrect || isWrong ? '#fff' : 'var(--pi-ink)', transform: isChosen ? 'scale(1.02)' : 'scale(1)' }}><span>{opt}</span><span>{isCorrect ? '✅' : isWrong ? '❌' : isAnswer ? '✅' : ''}</span></button>;
        })}
      </div>
    </div>
  );
}

function ResultScreen({ score, onRetry, onBack, language }) {
  const pct = Math.round((score / TOTAL_ROUNDS) * 100);
  const star = pct >= 80 ? '🌟🌟🌟' : pct >= 50 ? '⭐⭐' : '⭐';
  const msg = pct >= 80 ? (language === 'bm' ? 'Hebat! Kamu tahu jenis-jenis air!' : 'Great!') : pct >= 50 ? (language === 'bm' ? 'Bagus! Cuba lagi!' : 'Good!') : (language === 'bm' ? 'Cuba lagi ya!' : 'Try again!');
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center', gap: '1.25rem' }}>
      <div style={{ fontSize: '3rem' }}>{star}</div>
      <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(1.4rem, 4vw, 2rem)', color: '#67E8F9', margin: 0 }}>{score} / {TOTAL_ROUNDS}</h2>
      <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: '1.05rem', color: 'var(--pi-muted)', margin: 0 }}>{msg}</p>
      <div style={{ width: '100%', maxWidth: 300, height: 12, borderRadius: 99, background: 'rgba(0,0,0,0.08)', overflow: 'hidden' }}><div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #0891B2, #67E8F9)', borderRadius: 99, transition: 'width 0.8s ease' }} /></div>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button onClick={onRetry} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '1rem', background: 'linear-gradient(135deg, #0E7490, #0891B2)', color: '#fff', border: 'none', borderRadius: 999, padding: '10px 28px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(8,145,178,0.4)' }}>🔁 {language === 'bm' ? 'Cuba Lagi' : 'Try Again'}</button>
        <button onClick={onBack} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '1rem', background: 'rgba(0,0,0,0.04)', color: 'var(--pi-muted)', border: '2px solid rgba(0,0,0,0.1)', borderRadius: 999, padding: '10px 28px', cursor: 'pointer' }}>← {language === 'bm' ? 'Kembali' : 'Back'}</button>
      </div>
    </div>
  );
}

export default function AirMutlak({ onBack, language = 'bm' }) {
  const [tab, setTab] = useState('belajar');
  const [quizDone, setQuizDone] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [quizKey, setQuizKey] = useState(0);
  return (
    <Tahun1LessonLayout
      onBack={onBack}
      language={language}
      breadcrumb="Ibadah › Topik 3.2"
      title={language === 'bm' ? 'Air Mutlak' : 'Pure Water'}
      accentColor="#2563EB"
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
        <div style={{ flex: 1, overflowY: 'auto' }}><ResultScreen score={finalScore} onRetry={() => { setQuizDone(false); setQuizKey(k => k + 1); }} onBack={() => setTab('belajar')} language={language} /></div>
      ) : (
        <div style={{ flex: 1, minHeight: 0, display: 'flex', overflow: 'hidden' }}><QuizScreen key={quizKey} language={language} onDone={(s) => { setFinalScore(s); setQuizDone(true); }} /></div>
      )}
    </Tahun1LessonLayout>
  );
}
