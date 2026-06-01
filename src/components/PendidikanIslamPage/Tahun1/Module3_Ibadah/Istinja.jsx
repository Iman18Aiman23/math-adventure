import React, { useState, useCallback } from 'react';
import BackButton from '../../../BackButton';
import { playHoverSound, playSound } from '../../../../utils/soundManager';
import { FONT_IMPORT } from '../../_shared/arabic';
import { shuffle } from '../../_shared/utils';
import Celebration from '../../_shared/Celebration';

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

      {/* Toggle explanation */}
      {showDesc && (
        <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 'clamp(0.72rem, 1.8vw, 0.84rem)', color: '#374151', margin: 0, lineHeight: 1.5, background: 'rgba(255,255,255,0.55)', borderRadius: 10, padding: '7px 10px', width: '100%', boxSizing: 'border-box' }}>
          {k.desc}
        </p>
      )}
      <button
        onClick={() => { setShowDesc(s => !s); playHoverSound(); }}
        style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '0.72rem', color: k.color, background: 'rgba(255,255,255,0.45)', border: 'none', borderRadius: 999, padding: '3px 12px', cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}
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
        <div style={{ flex: 1, height: 8, borderRadius: 99, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}><div style={{ height: '100%', width: `${(round / TOTAL_ROUNDS) * 100}%`, background: 'linear-gradient(90deg, #2563EB, #60A5FA)', borderRadius: 99, transition: 'width 0.4s ease' }} /></div>
        <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '0.85rem', color: '#60A5FA', whiteSpace: 'nowrap' }}>{round + 1} / {TOTAL_ROUNDS}</span>
        <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '0.85rem', color: '#F59E0B' }}>⭐ {score}</span>
      </div>
      <div style={{ flex: 1, minHeight: 0, background: 'rgba(255,255,255,0.06)', border: '2px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', textAlign: 'center', position: 'relative', overflow: 'visible' }}>
        {chosen && correct && <Celebration />}
        <span style={{ fontSize: '3rem' }}>💧</span>
        <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: '#E2E8F0', margin: 0, lineHeight: 1.4, maxWidth: 320 }}>{q.question}</p>
      </div>
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {q.options.map(opt => {
          const isChosen = chosen === opt, isCorrect = isChosen && correct, isWrong = isChosen && !correct, isAnswer = chosen && opt === q.answer && !isChosen;
          return <button key={opt} onClick={() => handleAnswer(opt)} disabled={!!chosen} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.9rem, 2.2vw, 1.05rem)', padding: '13px 16px', borderRadius: 14, border: '2.5px solid', cursor: chosen ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all 0.2s ease', background: isCorrect ? '#10B981' : isWrong ? '#EF4444' : isAnswer ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.07)', borderColor: isCorrect ? '#10B981' : isWrong ? '#EF4444' : isAnswer ? '#10B981' : 'rgba(255,255,255,0.15)', color: isCorrect || isWrong ? '#fff' : '#E2E8F0', transform: isChosen ? 'scale(1.02)' : 'scale(1)' }}><span>{opt}</span><span>{isCorrect ? '✅' : isWrong ? '❌' : isAnswer ? '✅' : ''}</span></button>;
        })}
      </div>
    </div>
  );
}

function ResultScreen({ score, onRetry, onBack, language }) {
  const pct = Math.round((score / TOTAL_ROUNDS) * 100);
  const star = pct >= 80 ? '🌟🌟🌟' : pct >= 50 ? '⭐⭐' : '⭐';
  const msg = pct >= 80 ? (language === 'bm' ? "Hebat! Kamu tahu tentang istinja'!" : "Great!") : pct >= 50 ? (language === 'bm' ? 'Bagus! Cuba lagi!' : 'Good! Try again!') : (language === 'bm' ? 'Cuba lagi ya!' : 'Try again!');
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center', gap: '1.25rem' }}>
      <div style={{ fontSize: '3rem' }}>{star}</div>
      <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(1.4rem, 4vw, 2rem)', color: '#60A5FA', margin: 0 }}>{score} / {TOTAL_ROUNDS}</h2>
      <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: '1.05rem', color: '#CBD5E0', margin: 0 }}>{msg}</p>
      <div style={{ width: '100%', maxWidth: 300, height: 12, borderRadius: 99, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}><div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #2563EB, #60A5FA)', borderRadius: 99, transition: 'width 0.8s ease' }} /></div>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button onClick={onRetry} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '1rem', background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)', color: '#fff', border: 'none', borderRadius: 999, padding: '10px 28px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(37,99,235,0.4)' }}>🔁 {language === 'bm' ? 'Cuba Lagi' : 'Try Again'}</button>
        <button onClick={onBack} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '1rem', background: 'rgba(255,255,255,0.1)', color: '#CBD5E0', border: '2px solid rgba(255,255,255,0.15)', borderRadius: 999, padding: '10px 28px', cursor: 'pointer' }}>← {language === 'bm' ? 'Kembali' : 'Back'}</button>
      </div>
    </div>
  );
}

export default function Istinja({ onBack, language = 'bm' }) {
  const [tab, setTab] = useState('belajar');
  const [quizDone, setQuizDone] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [quizKey, setQuizKey] = useState(0);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0B1A2E', color: '#F1F5F9', fontFamily: 'Inter, sans-serif' }}>
      <BackButton onClick={onBack} />
      <style>{`${FONT_IMPORT}`}</style>
      <div style={{ padding: '1.5rem 3.5rem 0.75rem', flexShrink: 0, textAlign: 'center' }}>
        <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 'clamp(0.65rem, 1.4vw, 0.75rem)', color: 'rgba(255,255,255,0.45)', margin: '0 0 0.35rem' }}>Ibadah &rsaquo; Topik 3.1</p>
        <h1 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(1.1rem, 3.5vw, 1.5rem)', color: '#60A5FA', margin: '0 0 0.75rem' }}>{language === 'bm' ? "Istinja'" : "Istinja'"}</h1>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          {[{ id: 'belajar', label: '📖 Belajar' }, { id: 'kuiz', label: '🎯 Kuiz' }].map(t => (
            <button key={t.id} onClick={() => { setTab(t.id); playHoverSound(); if (t.id === 'kuiz') { setQuizDone(false); setQuizKey(k => k + 1); } }} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.82rem, 2vw, 0.95rem)', padding: '8px 22px', borderRadius: 999, border: '2px solid', cursor: 'pointer', transition: 'all 0.2s ease', background: tab === t.id ? 'linear-gradient(135deg, #1D4ED8, #3B82F6)' : 'rgba(255,255,255,0.07)', borderColor: tab === t.id ? '#3B82F6' : 'rgba(255,255,255,0.15)', color: tab === t.id ? '#fff' : '#94A3B8', boxShadow: tab === t.id ? '0 4px 14px rgba(37,99,235,0.35)' : 'none' }}>{t.label}</button>
          ))}
        </div>
      </div>
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
        <div style={{ flex: 1, overflowY: 'auto' }}><ResultScreen score={finalScore} onRetry={() => { setQuizDone(false); setQuizKey(k => k + 1); }} onBack={() => setTab('belajar')} language={language} /></div>
      ) : (
        <div style={{ flex: 1, minHeight: 0, display: 'flex', overflow: 'hidden' }}><QuizScreen key={quizKey} language={language} onDone={(s) => { setFinalScore(s); setQuizDone(true); }} /></div>
      )}
    </div>
  );
}
