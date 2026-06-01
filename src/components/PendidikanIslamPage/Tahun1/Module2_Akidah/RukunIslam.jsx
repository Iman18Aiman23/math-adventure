import React, { useState, useCallback } from 'react';
import BackButton from '../../../BackButton';
import { playHoverSound, playSound } from '../../../../utils/soundManager';
import { FONT_IMPORT } from '../../_shared/arabic';
import { shuffle } from '../../_shared/utils';
import Celebration from '../../_shared/Celebration';

// ── Rukun Islam data ──────────────────────────────────────────────────────────
// Arabic text: original Islamic content (public domain religious text).
// Malay descriptions: originally written for this app.
const RUKUN = [
  {
    n: 1,
    ar: 'الشَّهَادَتَانِ',
    name: 'Mengucap Dua Kalimah Syahadah',
    shortName: 'Syahadah',
    icon: '🗣️',
    desc: 'Mengucap bahawa tiada Tuhan selain Allah dan Muhammad itu Rasul Allah.',
    color: '#065F46', accent: '#10B981',
    gradient: 'linear-gradient(135deg, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
    border: 'rgba(42,154,108,0.5)',
  },
  {
    n: 2,
    ar: 'الصَّلَاةُ',
    name: 'Mendirikan Solat',
    shortName: 'Solat',
    icon: '🙏',
    desc: 'Melakukan solat fardu 5 waktu sehari semalam — Subuh, Zohor, Asar, Maghrib, Isyak.',
    color: '#1E40AF', accent: '#3B82F6',
    gradient: 'linear-gradient(135deg, #D6EEFF 0%, #6BAEE8 55%, #2563EB 100%)',
    border: 'rgba(37,99,235,0.5)',
  },
  {
    n: 3,
    ar: 'الزَّكَاةُ',
    name: 'Menunaikan Zakat',
    shortName: 'Zakat',
    icon: '💰',
    desc: 'Mengeluarkan sebahagian harta kepada golongan yang berhak menerimanya.',
    color: '#92400E', accent: '#F59E0B',
    gradient: 'linear-gradient(135deg, #FFF7D6 0%, #FDD97A 55%, #D4960A 100%)',
    border: 'rgba(212,150,10,0.5)',
  },
  {
    n: 4,
    ar: 'الصِّيَامُ',
    name: 'Berpuasa di Bulan Ramadan',
    shortName: 'Puasa',
    icon: '🌙',
    desc: 'Menahan diri daripada makan, minum dan perkara yang membatalkan puasa sepanjang Ramadan.',
    color: '#4C1D95', accent: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #E7D9FF 0%, #B79CFF 55%, #7A55E0 100%)',
    border: 'rgba(122,85,224,0.5)',
  },
  {
    n: 5,
    ar: 'الحَجُّ',
    name: 'Menunaikan Ibadah Haji',
    shortName: 'Haji',
    icon: '🕋',
    desc: 'Pergi ke Makkah untuk menunaikan ibadah haji bagi yang berkemampuan.',
    color: '#9D174D', accent: '#EC4899',
    gradient: 'linear-gradient(135deg, #FFE9F3 0%, #FFBFDD 55%, #FF8CBF 100%)',
    border: 'rgba(236,72,153,0.5)',
  },
];

// Distractors for "which is NOT Rukun Islam"
const NOT_RUKUN_ISLAM = [
  'Beriman kepada Allah',
  'Beriman kepada Malaikat',
  'Beriman kepada Hari Kiamat',
  'Beriman kepada Qada dan Qadar',
];

// ── Quiz question builder ──────────────────────────────────────────────────────
function buildQuestions() {
  const qs = [];

  // Type A: "Apakah Rukun Islam yang ke-N?"
  RUKUN.forEach(r => {
    const wrong = shuffle(RUKUN.filter(x => x.n !== r.n)).slice(0, 3).map(x => x.name);
    qs.push({
      question: `Apakah Rukun Islam yang ke-${r.n}?`,
      answer: r.name,
      options: shuffle([r.name, ...wrong]),
    });
  });

  // Type B: "Rukun Islam yang ke berapa ialah [name]?"
  RUKUN.forEach(r => {
    const wrongNums = shuffle([1,2,3,4,5].filter(n => n !== r.n)).slice(0, 3).map(n => `Yang ke-${n}`);
    qs.push({
      question: `Rukun Islam yang ke berapa ialah "${r.shortName}"?`,
      answer: `Yang ke-${r.n}`,
      options: shuffle([`Yang ke-${r.n}`, ...wrongNums]),
    });
  });

  // Type C: bilangan
  qs.push({
    question: 'Berapakah bilangan Rukun Islam?',
    answer: '5',
    options: ['4', '5', '6', '7'],
  });

  // Type D: BUKAN Rukun Islam
  NOT_RUKUN_ISLAM.forEach(d => {
    const real = shuffle(RUKUN).slice(0, 3).map(r => r.name);
    qs.push({
      question: 'Yang manakah BUKAN Rukun Islam?',
      answer: d,
      options: shuffle([d, ...real]),
    });
  });

  return qs;
}

const TOTAL_ROUNDS = 10;

// ── Learn card ─────────────────────────────────────────────────────────────────
function LearnCard({ r }) {
  return (
    <div style={{
      background: r.gradient, border: `2.5px solid ${r.border}`,
      borderRadius: 20, padding: '16px 14px',
      display: 'flex', flexDirection: 'column', gap: 8,
      boxShadow: '0 2px 0 rgba(255,255,255,0.35) inset, 0 8px 20px rgba(0,0,0,0.1)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{
          width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
          background: r.accent, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '1rem',
          boxShadow: `0 3px 8px ${r.border}`,
        }}>{r.n}</span>
        <p style={{
          fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
          fontSize: 'clamp(0.85rem, 2.2vw, 1rem)', color: '#1A202C',
          margin: 0, lineHeight: 1.2, flex: 1,
        }}>{r.name}</p>
      </div>
      <p style={{
        fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600,
        fontSize: 'clamp(0.72rem, 1.8vw, 0.85rem)', color: '#374151',
        margin: 0, lineHeight: 1.5,
        background: 'rgba(255,255,255,0.5)', borderRadius: 10, padding: '8px 12px',
      }}>{r.desc}</p>
    </div>
  );
}

// ── Quiz screen ────────────────────────────────────────────────────────────────
function QuizScreen({ language, onDone }) {
  const [pool]      = useState(() => shuffle(buildQuestions()).slice(0, TOTAL_ROUNDS));
  const [round,     setRound]     = useState(0);
  const [score,     setScore]     = useState(0);
  const [chosen,    setChosen]    = useState(null);
  const [correct,   setCorrect]   = useState(null);
  const [animating, setAnimating] = useState(false);
  const q = pool[round];

  const handleAnswer = useCallback((opt) => {
    if (animating || chosen) return;
    const isCorrect = opt === q.answer;
    setChosen(opt); setCorrect(isCorrect);
    if (isCorrect) { setScore(s => s + 1); playSound('correct'); } else playSound('wrong');
    setAnimating(true);
    setTimeout(() => {
      setChosen(null); setCorrect(null); setAnimating(false);
      if (round + 1 >= TOTAL_ROUNDS) onDone(isCorrect ? score + 1 : score);
      else setRound(r => r + 1);
    }, 900);
  }, [animating, chosen, q, round, score, onDone]);

  if (!q) return null;
  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '0.75rem 1.25rem calc(0.75rem + var(--safe-bottom, 0px))', overflow: 'hidden' }}>
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ flex: 1, height: 8, borderRadius: 99, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(round / TOTAL_ROUNDS) * 100}%`, background: 'linear-gradient(90deg, #3B82F6, #93C5FD)', borderRadius: 99, transition: 'width 0.4s ease' }} />
        </div>
        <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '0.85rem', color: '#3B82F6', whiteSpace: 'nowrap' }}>{round + 1} / {TOTAL_ROUNDS}</span>
        <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '0.85rem', color: '#F59E0B' }}>⭐ {score}</span>
      </div>
      <div style={{
        flex: 1, minHeight: 0,
        background: 'rgba(255,255,255,0.06)', border: '2px solid rgba(255,255,255,0.1)',
        borderRadius: 20, padding: '1rem',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: '0.5rem', textAlign: 'center', position: 'relative', overflow: 'visible',
      }}>
        {chosen && correct && <Celebration />}
        <span style={{ fontSize: '2.5rem' }}>🌙</span>
        <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 'clamp(0.88rem, 2.2vw, 1.05rem)', color: '#E2E8F0', margin: 0, lineHeight: 1.4, maxWidth: 340 }}>
          {q.question}
        </p>
      </div>
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {q.options.map(opt => {
          const isChosen = chosen === opt, isCorrect = isChosen && correct, isWrong = isChosen && !correct, isAnswer = chosen && opt === q.answer && !isChosen;
          return (
            <button key={opt} onClick={() => handleAnswer(opt)} disabled={!!chosen}
              style={{
                fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700,
                fontSize: 'clamp(0.82rem, 2vw, 0.95rem)', padding: '11px 16px',
                borderRadius: 14, border: '2.5px solid', cursor: chosen ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                transition: 'all 0.2s ease', textAlign: 'left',
                background: isCorrect ? '#10B981' : isWrong ? '#EF4444' : isAnswer ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.07)',
                borderColor: isCorrect ? '#10B981' : isWrong ? '#EF4444' : isAnswer ? '#10B981' : 'rgba(255,255,255,0.15)',
                color: isCorrect || isWrong ? '#fff' : '#E2E8F0',
                transform: isChosen ? 'scale(1.02)' : 'scale(1)',
              }}>
              <span>{opt}</span>
              <span>{isCorrect ? '✅' : isWrong ? '❌' : isAnswer ? '✅' : ''}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Result screen ──────────────────────────────────────────────────────────────
function ResultScreen({ score, onRetry, onBack, language }) {
  const pct = Math.round((score / TOTAL_ROUNDS) * 100);
  const star = pct >= 80 ? '🌟🌟🌟' : pct >= 50 ? '⭐⭐' : '⭐';
  const msg = pct >= 80
    ? (language === 'bm' ? 'Cemerlang! Kamu faham semua Rukun Islam!' : 'Excellent! You know all the Pillars of Islam!')
    : pct >= 50
      ? (language === 'bm' ? 'Bagus! Teruskan berlatih.' : 'Good! Keep practising.')
      : (language === 'bm' ? 'Teruskan berlatih! Kamu pasti boleh!' : 'Keep going! You can do it!');
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center', gap: '1.25rem' }}>
      <div style={{ fontSize: '3rem' }}>{star}</div>
      <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(1.4rem, 4vw, 2rem)', color: '#3B82F6', margin: 0 }}>{score} / {TOTAL_ROUNDS}</h2>
      <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 'clamp(0.88rem, 2.2vw, 1.05rem)', color: '#CBD5E0', margin: 0, lineHeight: 1.5, maxWidth: 320 }}>{msg}</p>
      <div style={{ width: '100%', maxWidth: 300, height: 12, borderRadius: 99, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #3B82F6, #93C5FD)', borderRadius: 99, transition: 'width 0.8s ease' }} />
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button onClick={onRetry} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.85rem, 2vw, 1rem)', background: 'linear-gradient(135deg, #2563EB, #3B82F6)', color: '#fff', border: 'none', borderRadius: 999, padding: '10px 28px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(37,99,235,0.4)' }}>
          🔁 {language === 'bm' ? 'Cuba Lagi' : 'Try Again'}
        </button>
        <button onClick={onBack} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.85rem, 2vw, 1rem)', background: 'rgba(255,255,255,0.1)', color: '#CBD5E0', border: '2px solid rgba(255,255,255,0.15)', borderRadius: 999, padding: '10px 28px', cursor: 'pointer' }}>
          ← {language === 'bm' ? 'Kembali' : 'Back'}
        </button>
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
export default function RukunIslam({ onBack, language = 'bm' }) {
  const [tab,        setTab]        = useState('belajar');
  const [quizDone,   setQuizDone]   = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [quizKey,    setQuizKey]    = useState(0);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0B1A2E', color: '#F1F5F9', fontFamily: 'Inter, sans-serif' }}>
      <BackButton onClick={onBack} />
      <style>{`
        ${FONT_IMPORT}
        .rsl-grid { display: grid; grid-template-columns: 1fr; gap: 0.85rem; }
        @media (min-width: 640px) { .rsl-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; } }
      `}</style>
      <div style={{ padding: '1.5rem 3.5rem 0.75rem', flexShrink: 0, textAlign: 'center' }}>
        <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 'clamp(0.65rem, 1.4vw, 0.75rem)', color: 'rgba(255,255,255,0.45)', margin: '0 0 0.35rem' }}>
          Akidah &rsaquo; Topik 2.2
        </p>
        <h1 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(1.1rem, 3.5vw, 1.5rem)', color: '#93C5FD', margin: '0 0 0.75rem' }}>
          {language === 'bm' ? 'Rukun Islam (5 Perkara)' : 'Pillars of Islam (5)'}
        </h1>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          {[
            { id: 'belajar', label: language === 'bm' ? '📖 Belajar' : '📖 Learn' },
            { id: 'kuiz',    label: language === 'bm' ? '🎯 Kuiz'   : '🎯 Quiz'  },
          ].map(t => (
            <button key={t.id}
              onClick={() => { setTab(t.id); playHoverSound(); if (t.id === 'kuiz') { setQuizDone(false); setQuizKey(k => k + 1); } }}
              style={{
                fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700,
                fontSize: 'clamp(0.82rem, 2vw, 0.95rem)', padding: '8px 22px',
                borderRadius: 999, border: '2px solid', cursor: 'pointer', transition: 'all 0.2s ease',
                background: tab === t.id ? 'linear-gradient(135deg, #2563EB, #3B82F6)' : 'rgba(255,255,255,0.07)',
                borderColor: tab === t.id ? '#3B82F6' : 'rgba(255,255,255,0.15)',
                color: tab === t.id ? '#fff' : '#94A3B8',
                boxShadow: tab === t.id ? '0 4px 14px rgba(37,99,235,0.35)' : 'none',
              }}
            >{t.label}</button>
          ))}
        </div>
      </div>
      {tab === 'belajar' ? (
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 1.25rem calc(80px + var(--safe-bottom, 0px))' }}>
          <div style={{
            background: 'rgba(59,130,246,0.12)', border: '1.5px solid rgba(59,130,246,0.3)',
            borderRadius: 14, padding: '10px 14px', marginBottom: '1rem',
            fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600,
            fontSize: 'clamp(0.78rem, 2vw, 0.9rem)', color: '#93C5FD', textAlign: 'center',
          }}>
            {language === 'bm'
              ? '🌙 Rukun Islam ada 5 perkara · Ketuk kad untuk keterangan'
              : '🌙 There are 5 Pillars of Islam · Tap a card for details'}
          </div>
          <div className="rsl-grid">
            {RUKUN.map(r => <LearnCard key={r.n} r={r} />)}
          </div>
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button
              onClick={() => { setTab('kuiz'); setQuizDone(false); setQuizKey(k => k + 1); playHoverSound(); }}
              style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.9rem, 2.2vw, 1.05rem)', background: 'linear-gradient(135deg, #2563EB, #3B82F6)', color: '#fff', border: 'none', borderRadius: 999, padding: '12px 32px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(37,99,235,0.4)' }}>
              🎯 {language === 'bm' ? 'Mula Kuiz' : 'Start Quiz'} →
            </button>
          </div>
        </div>
      ) : quizDone ? (
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <ResultScreen score={finalScore} onRetry={() => { setQuizDone(false); setQuizKey(k => k + 1); }} onBack={() => setTab('belajar')} language={language} />
        </div>
      ) : (
        <div style={{ flex: 1, minHeight: 0, display: 'flex', overflow: 'hidden' }}>
          <QuizScreen key={quizKey} language={language} onDone={(s) => { setFinalScore(s); setQuizDone(true); }} />
        </div>
      )}
    </div>
  );
}
