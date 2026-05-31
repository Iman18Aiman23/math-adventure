import React, { useState, useCallback, useEffect } from 'react';
import BackButton from '../../BackButton';
import SpeechManager from '../../../services/SpeechManager';
import { playHoverSound } from '../../../utils/soundManager';

const ARABIC_FONT = "'Traditional Arabic','Scheherazade New','Amiri','Noto Naskh Arabic',serif";

// ── Arabic keyboard harakat constants ─────────────────────────────────────────
// Shift+Q = Fathah  (baris atas)   U+064E
// Shift+A = Kasrah  (baris bawah)  U+0650
// Shift+E = Dammah  (baris depan)  U+064F
const FATHAH = 'َ'; // ب + Shift+Q → بَ
const KASRAH  = 'ِ'; // ب + Shift+A → بِ
const DAMMAH  = 'ُ'; // ب + Shift+E → بُ

// ── Harakat data ──────────────────────────────────────────────────────────────
// markPadding: asymmetric top/bottom so the white box always contains the mark
//   Fathah/Dammah → mark floats ABOVE letter → need extra paddingTop
//   Kasrah         → mark floats BELOW letter → need extra paddingBottom
const HARAKAT = [
  {
    id: 'fathah',
    name: 'Fathah',
    arabicName: 'فَتْحَة', // فَتْحَة
    symbol: 'ب' + FATHAH,   // بَ
    mark: FATHAH,
    markPadding: '22px 20px 4px', // extra top for above-mark
    exPadding:   '12px 6px 2px',  // example box: extra top
    position: 'Terdapat baris diatas huruf',
    positionEng: 'The mark sits above the letter',
    sound: '"a"',
    desc: 'Bunyi pendek "a" seperti dalam kata "ada"',
    descEng: 'Short "a" sound like in "cat"',
    examples: [
      { arabic: 'ب' + FATHAH, rumi: 'ba' }, // بَ
      { arabic: 'ت' + FATHAH, rumi: 'ta' }, // تَ
      { arabic: 'ك' + FATHAH, rumi: 'ka' }, // كَ
      { arabic: 'م' + FATHAH, rumi: 'ma' }, // مَ
    ],
    gradient: 'linear-gradient(135deg, #FFF7D6 0%, #FDD97A 55%, #D4960A 100%)',
    color: '#92400E', accent: '#F59E0B',
    border: 'rgba(212,150,10,0.5)', glow: 'rgba(212,150,10,0.3)',
    speakText: 'فَتْحَة', // فَتْحَة
  },
  {
    id: 'kasrah',
    name: 'Kasrah',
    arabicName: 'كَسْرَة', // كَسْرَة
    symbol: 'ب' + KASRAH,   // بِ
    mark: KASRAH,
    markPadding: '4px 20px 22px', // extra bottom for below-mark
    exPadding:   '2px 6px 12px',  // example box: extra bottom
    position: 'Terdapat baris dibawah huruf',
    positionEng: 'The mark sits below the letter',
    sound: '"i"',
    desc: 'Bunyi pendek "i" seperti dalam kata "ibu"',
    descEng: 'Short "i" sound like in "bit"',
    examples: [
      { arabic: 'ب' + KASRAH, rumi: 'bi' }, // بِ
      { arabic: 'ت' + KASRAH, rumi: 'ti' }, // تِ
      { arabic: 'ك' + KASRAH, rumi: 'ki' }, // كِ
      { arabic: 'م' + KASRAH, rumi: 'mi' }, // مِ
    ],
    gradient: 'linear-gradient(135deg, #D6EEFF 0%, #6BAEE8 55%, #2563EB 100%)',
    color: '#1E40AF', accent: '#3B82F6',
    border: 'rgba(37,99,235,0.5)', glow: 'rgba(37,99,235,0.3)',
    speakText: 'كَسْرَة', // كَسْرَة
  },
  {
    id: 'dammah',
    name: 'Dammah',
    arabicName: 'ضَمَّة', // ضَمَّة
    symbol: 'ب' + DAMMAH,   // بُ
    mark: DAMMAH,
    markPadding: '22px 20px 4px', // extra top for above-mark
    exPadding:   '12px 6px 2px',  // example box: extra top
    position: 'Terdapat baris diatas huruf',
    positionEng: 'The mark sits above the letter',
    sound: '"u"',
    desc: 'Bunyi pendek "u" seperti dalam kata "ular"',
    descEng: 'Short "u" sound like in "put"',
    examples: [
      { arabic: 'ب' + DAMMAH, rumi: 'bu' }, // بُ
      { arabic: 'ت' + DAMMAH, rumi: 'tu' }, // تُ
      { arabic: 'ك' + DAMMAH, rumi: 'ku' }, // كُ
      { arabic: 'م' + DAMMAH, rumi: 'mu' }, // مُ
    ],
    gradient: 'linear-gradient(135deg, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
    color: '#065F46', accent: '#10B981',
    border: 'rgba(42,154,108,0.5)', glow: 'rgba(42,154,108,0.3)',
    speakText: 'ضَمَّة', // ضَمَّة
  },
];

// ── Quiz letter pool ──────────────────────────────────────────────────────────
const QUIZ_LETTERS = [
  'ب', // ب Ba
  'ت', // ت Ta
  'ث', // ث Tha
  'ج', // ج Jim
  'ح', // ح Ha
  'د', // د Dal
  'ر', // ر Ra
  'س', // س Sin
  'ش', // ش Syin
  'م', // م Mim
  'ن', // ن Nun
  'و', // و Wau
  'ه', // ه Ha
  'ي', // ي Ya
  'ك', // ك Kaf
  'ل', // ل Lam
];

function buildQuizPool() {
  const pool = [];
  QUIZ_LETTERS.forEach(letter => {
    HARAKAT.forEach(h => {
      pool.push({ letter, harakat: h, display: letter + h.mark });
    });
  });
  return pool;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const TOTAL_ROUNDS = 10;

// ── Learn card ────────────────────────────────────────────────────────────────
function LearnCard({ h, language, active, onTap }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onTap}
      onKeyDown={e => e.key === 'Enter' && onTap()}
      onMouseEnter={playHoverSound}
      style={{
        background: h.gradient,
        border: `2.5px solid ${h.border}`,
        borderRadius: 22,
        padding: '16px 14px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        cursor: 'pointer',
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent',
        boxSizing: 'border-box',
        width: '100%',
        boxShadow: active
          ? `0 0 0 3px ${h.accent}, 0 12px 32px ${h.glow}`
          : `0 2px 0 rgba(255,255,255,0.35) inset, 0 8px 20px rgba(0,0,0,0.1)`,
        transform: active ? 'translateY(-4px) scale(1.02)' : 'none',
        transition: 'all 0.25s cubic-bezier(.34,1.56,.64,1)',
        textAlign: 'center',
      }}
    >
      {/* Glyph box — padding is asymmetric per harakat so mark never overflows */}
      <div style={{
        background: 'rgba(255,255,255,0.5)',
        borderRadius: 20,
        padding: h.markPadding,
        boxShadow: 'inset 0 -3px 10px rgba(0,0,0,0.06)',
        boxSizing: 'border-box',
      }}>
        <span style={{
          fontFamily: ARABIC_FONT,
          fontSize: 'clamp(3rem, 9vw, 4.2rem)',
          color: h.color,
          lineHeight: 1,
          direction: 'rtl',
          display: 'block',
          textAlign: 'center',
        }}>
          {h.symbol}
        </span>
      </div>

      {/* Name row */}
      <div>
        <p style={{
          fontFamily: "'Baloo 2', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(1.05rem, 3vw, 1.3rem)',
          color: h.color,
          margin: '0 0 2px',
          lineHeight: 1,
        }}>{h.name}</p>
        <p style={{
          fontFamily: ARABIC_FONT,
          fontSize: 'clamp(0.82rem, 2vw, 0.95rem)',
          color: h.color,
          margin: 0,
          opacity: 0.8,
          direction: 'rtl',
          lineHeight: 1.5,
        }}>{h.arabicName}</p>
      </div>

      {/* Info box */}
      <div style={{
        background: 'rgba(255,255,255,0.55)',
        borderRadius: 12,
        padding: '8px 12px',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        <p style={{
          fontFamily: "'Fredoka', system-ui, sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(0.68rem, 1.6vw, 0.8rem)',
          color: h.color,
          margin: '0 0 4px',
          lineHeight: 1.4,
        }}>
          {language === 'bm' ? h.position : h.positionEng}
        </p>
        <p style={{
          fontFamily: "'Fredoka', system-ui, sans-serif",
          fontWeight: 600,
          fontSize: 'clamp(0.65rem, 1.5vw, 0.78rem)',
          color: h.color,
          margin: 0,
          opacity: 0.85,
          lineHeight: 1.4,
        }}>
          🔊 {language === 'bm' ? h.desc : h.descEng}
        </p>
      </div>

      {/* Example syllables — exPadding gives room for mark above/below */}
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap', width: '100%' }}>
        {h.examples.map(ex => (
          <div key={ex.rumi} style={{
            background: 'rgba(255,255,255,0.6)',
            borderRadius: 10,
            padding: h.exPadding,
            textAlign: 'center',
            minWidth: 38,
            boxSizing: 'border-box',
          }}>
            <span style={{
              fontFamily: ARABIC_FONT,
              fontSize: '1.15rem',
              color: h.color,
              direction: 'rtl',
              display: 'block',
              lineHeight: 1,
            }}>{ex.arabic}</span>
            <span style={{
              fontFamily: "'Fredoka', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: '0.68rem',
              color: h.color,
              display: 'block',
              marginTop: 2,
            }}>{ex.rumi}</span>
          </div>
        ))}
      </div>

      {/* Tap hint */}
      <p style={{
        fontFamily: "'Fredoka', system-ui, sans-serif",
        fontWeight: 600,
        fontSize: 'clamp(0.62rem, 1.4vw, 0.72rem)',
        color: h.color,
        margin: 0,
        opacity: 0.65,
      }}>
        {active ? '🔊 Memainkan...' : '👆 Ketuk untuk dengar'}
      </p>
    </div>
  );
}

// ── Quiz screen ───────────────────────────────────────────────────────────────
function QuizScreen({ language, onDone }) {
  const [pool]      = useState(() => shuffle(buildQuizPool()));
  const [round,     setRound]     = useState(0);
  const [score,     setScore]     = useState(0);
  const [chosen,    setChosen]    = useState(null);
  const [correct,   setCorrect]   = useState(null);
  const [animating, setAnimating] = useState(false);

  const q = pool[round];

  useEffect(() => {
    if (q) SpeechManager.speak(q.display, 'ar-SA');
  }, [round]);

  const handleAnswer = useCallback((harakatId) => {
    if (animating || chosen) return;
    const isCorrect = harakatId === q.harakat.id;
    setChosen(harakatId);
    setCorrect(isCorrect);
    if (isCorrect) setScore(s => s + 1);
    setAnimating(true);
    setTimeout(() => {
      setChosen(null); setCorrect(null); setAnimating(false);
      if (round + 1 >= TOTAL_ROUNDS) {
        onDone(isCorrect ? score + 1 : score);
      } else {
        setRound(r => r + 1);
      }
    }, 900);
  }, [animating, chosen, q, round, score, onDone]);

  if (!q) return null;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '0 1.25rem 80px' }}>
      {/* Progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ flex: 1, height: 8, borderRadius: 99, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(round / TOTAL_ROUNDS) * 100}%`, background: 'linear-gradient(90deg, #10B981, #6EE7B7)', borderRadius: 99, transition: 'width 0.4s ease' }} />
        </div>
        <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '0.85rem', color: '#10B981', whiteSpace: 'nowrap' }}>
          {round + 1} / {TOTAL_ROUNDS}
        </span>
        <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '0.85rem', color: '#F59E0B' }}>
          ⭐ {score}
        </span>
      </div>

      {/* Question card — generous padding so any mark never clips */}
      <div style={{
        background: 'rgba(255,255,255,0.06)', border: '2px solid rgba(255,255,255,0.1)',
        borderRadius: 20, padding: '1.5rem 1rem',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', textAlign: 'center',
      }}>
        <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 'clamp(0.8rem, 2vw, 0.95rem)', color: '#94A3B8', margin: 0 }}>
          {language === 'bm' ? 'Apakah nama baris pada huruf ini?' : 'What is the name of this harakat?'}
        </p>
        <div
          onClick={() => SpeechManager.speak(q.display, 'ar-SA')}
          style={{
            background: 'rgba(255,255,255,0.08)', borderRadius: 18,
            border: '2px solid rgba(255,255,255,0.12)',
            padding: q.harakat.id === 'kasrah' ? '12px 32px 28px' : '28px 32px 12px',
            cursor: 'pointer', userSelect: 'none',
          }}
        >
          <span style={{
            fontFamily: ARABIC_FONT,
            fontSize: 'clamp(3.5rem, 12vw, 6rem)',
            color: '#FFFFFF',
            lineHeight: 1,
            direction: 'rtl',
            display: 'block',
          }}>
            {q.display}
          </span>
        </div>
        <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', margin: 0 }}>
          🔊 {language === 'bm' ? 'Ketuk huruf untuk dengar' : 'Tap letter to hear'}
        </p>
      </div>

      {/* Answer buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {HARAKAT.map(h => {
          const isChosen  = chosen === h.id;
          const isCorrect = isChosen && correct;
          const isWrong   = isChosen && !correct;
          const isAnswer  = chosen && h.id === q.harakat.id && !isChosen;
          return (
            <button
              key={h.id}
              onClick={() => handleAnswer(h.id)}
              disabled={!!chosen}
              onMouseEnter={!chosen ? playHoverSound : undefined}
              style={{
                fontFamily: "'Fredoka', system-ui, sans-serif",
                fontWeight: 700, fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
                padding: '14px 20px', borderRadius: 16, border: '2.5px solid',
                cursor: chosen ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                transition: 'all 0.2s ease',
                background: isCorrect ? '#10B981' : isWrong ? '#EF4444' : isAnswer ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.07)',
                borderColor: isCorrect ? '#10B981' : isWrong ? '#EF4444' : isAnswer ? '#10B981' : 'rgba(255,255,255,0.15)',
                color: isCorrect || isWrong ? '#fff' : '#E2E8F0',
                transform: isChosen ? 'scale(1.02)' : 'scale(1)',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {/* Answer symbol — uses same asymmetric padding as LearnCard */}
                <span style={{
                  fontFamily: ARABIC_FONT,
                  fontSize: '1.3rem',
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: 10,
                  padding: h.id === 'kasrah' ? '2px 10px 10px' : '10px 10px 2px',
                  direction: 'rtl',
                  display: 'inline-block',
                  lineHeight: 1,
                }}>
                  {'ب' + h.mark}
                </span>
                {h.name}
              </span>
              <span>{isCorrect ? '✅' : isWrong ? '❌' : isAnswer ? '✅' : ''}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Result screen ─────────────────────────────────────────────────────────────
function ResultScreen({ score, onRetry, onBack, language }) {
  const pct  = Math.round((score / TOTAL_ROUNDS) * 100);
  const star = pct >= 80 ? '🌟🌟🌟' : pct >= 50 ? '⭐⭐' : '⭐';
  const msg  = pct >= 80
    ? (language === 'bm' ? 'Cemerlang! Kamu faham tanda bacaan dengan baik!' : 'Excellent! You understand harakat well!')
    : pct >= 50
      ? (language === 'bm' ? 'Bagus! Cuba lagi untuk hasil lebih baik.' : 'Good! Try again for a better score.')
      : (language === 'bm' ? 'Teruskan berlatih! Kamu pasti boleh!' : 'Keep practising! You can do it!');

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center', gap: '1.25rem' }}>
      <div style={{ fontSize: '3rem' }}>{star}</div>
      <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(1.4rem, 4vw, 2rem)', color: '#F59E0B', margin: 0 }}>
        {score} / {TOTAL_ROUNDS}
      </h2>
      <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 'clamp(0.88rem, 2.2vw, 1.05rem)', color: '#CBD5E0', margin: 0, lineHeight: 1.5, maxWidth: 320 }}>
        {msg}
      </p>
      <div style={{ width: '100%', maxWidth: 300, height: 12, borderRadius: 99, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #F59E0B, #FDE68A)', borderRadius: 99, transition: 'width 0.8s ease' }} />
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button onClick={onRetry} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.85rem, 2vw, 1rem)', background: 'linear-gradient(135deg, #F59E0B, #D97706)', color: '#fff', border: 'none', borderRadius: 999, padding: '10px 28px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(217,119,6,0.4)' }}>
          🔁 {language === 'bm' ? 'Cuba Lagi' : 'Try Again'}
        </button>
        <button onClick={onBack} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.85rem, 2vw, 1rem)', background: 'rgba(255,255,255,0.1)', color: '#CBD5E0', border: '2px solid rgba(255,255,255,0.15)', borderRadius: 999, padding: '10px 28px', cursor: 'pointer' }}>
          ← {language === 'bm' ? 'Kembali' : 'Back'}
        </button>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function TandaBacaan({ onBack, language = 'bm' }) {
  const [tab,        setTab]        = useState('belajar');
  const [active,     setActive]     = useState(null);
  const [quizDone,   setQuizDone]   = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [quizKey,    setQuizKey]    = useState(0);

  const handleLearnTap = (h) => {
    setActive(h.id);
    SpeechManager.speak(h.speakText, 'ar-SA');
    setTimeout(() => setActive(null), 1200);
  };

  const handleQuizDone  = (score) => { setFinalScore(score); setQuizDone(true); };
  const handleRetry     = () => { setQuizDone(false); setQuizKey(k => k + 1); };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0B1A2E', color: '#F1F5F9', fontFamily: 'Inter, sans-serif' }}>
      <BackButton onClick={onBack} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Baloo+2:wght@600;700;800&display=swap');
        .tb-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }
        @media (min-width: 640px) { .tb-grid { grid-template-columns: repeat(3, 1fr); gap: 1.1rem; } }
      `}</style>

      {/* Header — fixed height, never shrinks */}
      <div style={{ padding: '4.5rem 1.25rem 1rem', flexShrink: 0 }}>
        <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 'clamp(0.65rem, 1.4vw, 0.75rem)', color: 'rgba(255,255,255,0.4)', margin: '0 0 0.5rem' }}>
          Al-Quran &amp; Tajwid &rsaquo; Topik 1.2
        </p>
        <h1 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(1.1rem, 3.5vw, 1.5rem)', color: '#38BDF8', margin: '0 0 1rem' }}>
          {language === 'bm' ? 'Tanda Bacaan Asas' : 'Basic Diacritical Marks'}
        </h1>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
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
                background: tab === t.id ? 'linear-gradient(135deg, #0891B2, #38BDF8)' : 'rgba(255,255,255,0.07)',
                borderColor: tab === t.id ? '#38BDF8' : 'rgba(255,255,255,0.15)',
                color: tab === t.id ? '#fff' : '#94A3B8',
                boxShadow: tab === t.id ? '0 4px 14px rgba(56,189,248,0.35)' : 'none',
              }}
            >{t.label}</button>
          ))}
        </div>
      </div>

      {/* Content — fills remaining height, scrolls internally */}
      {tab === 'belajar' ? (
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 1.25rem calc(80px + var(--safe-bottom, 0px))' }}>
          <div className="tb-grid">
            {HARAKAT.map(h => (
              <LearnCard key={h.id} h={h} language={language} active={active === h.id} onTap={() => handleLearnTap(h)} />
            ))}
          </div>
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button
              onClick={() => { setTab('kuiz'); setQuizDone(false); setQuizKey(k => k + 1); playHoverSound(); }}
              style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.9rem, 2.2vw, 1.05rem)', background: 'linear-gradient(135deg, #0891B2, #38BDF8)', color: '#fff', border: 'none', borderRadius: 999, padding: '12px 32px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56,189,248,0.4)' }}
            >
              🎯 {language === 'bm' ? 'Mula Kuiz' : 'Start Quiz'} →
            </button>
          </div>
        </div>
      ) : quizDone ? (
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <ResultScreen score={finalScore} onRetry={handleRetry} onBack={() => setTab('belajar')} language={language} />
        </div>
      ) : (
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <QuizScreen key={quizKey} language={language} onDone={handleQuizDone} />
        </div>
      )}
    </div>
  );
}
