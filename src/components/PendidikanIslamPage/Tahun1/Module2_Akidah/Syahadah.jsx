import React, { useState, useCallback } from 'react';
import BackButton from '../../../BackButton';
import { playHoverSound, playSound } from '../../../../utils/soundManager';
import { ARABIC_FONT, FONT_IMPORT } from '../../_shared/arabic';
import { shuffle } from '../../_shared/utils';
import Celebration from '../../_shared/Celebration';

// ── Kalimah Syahadah data ─────────────────────────────────────────────────────
// Arabic text: public domain Islamic religious text.
// Rumi, meaning, and explanations: originally written for this app.
const KALIMAH = [
  {
    n: 1,
    label: 'Kalimah Pertama',
    ar: 'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللهُ',
    rumi: 'Asyhadu allaa ilaaha illallah',
    meaning: 'Aku bersaksi bahawa tiada Tuhan yang berhak disembah selain Allah.',
    meaningEng: 'I bear witness that there is no god worthy of worship except Allah.',
    about: 'Kalimah ini menegaskan bahawa Allah sahaja yang wajib disembah. Tiada sebarang makhluk atau benda lain yang layak dijadikan Tuhan.',
    icon: '☝️',
    color: '#4C1D95', accent: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #E7D9FF 0%, #B79CFF 55%, #7A55E0 100%)',
    border: 'rgba(122,85,224,0.5)', glow: 'rgba(122,85,224,0.3)',
  },
  {
    n: 2,
    label: 'Kalimah Kedua',
    ar: 'وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللهِ',
    rumi: 'wa asyhadu anna Muhammadan Rasuulullah',
    meaning: 'Dan aku bersaksi bahawa Nabi Muhammad itu adalah Rasul (utusan) Allah.',
    meaningEng: 'And I bear witness that Muhammad is the Messenger of Allah.',
    about: 'Kalimah ini mengiktiraf bahawa Nabi Muhammad SAW adalah nabi dan rasul terakhir yang diutuskan Allah kepada umat manusia.',
    icon: '🌟',
    color: '#065F46', accent: '#10B981',
    gradient: 'linear-gradient(135deg, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
    border: 'rgba(42,154,108,0.5)', glow: 'rgba(42,154,108,0.3)',
  },
];

// Combined full syahadah (both kalimah as one lafaz)
const FULL_AR = 'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللهِ';

// Kepentingan (importance) points — originally written for this app
const KEPENTINGAN = [
  { icon: '🏳️', text: 'Merupakan Rukun Islam yang pertama.' },
  { icon: '💫', text: 'Syarat masuk ke dalam agama Islam.' },
  { icon: '❤️', text: 'Menunjukkan keimanan seseorang kepada Allah dan Rasul-Nya.' },
  { icon: '🌍', text: 'Diucapkan sekurang-kurangnya sekali seumur hidup dengan ikhlas.' },
];

// ── Quiz questions ─────────────────────────────────────────────────────────────
const QUESTIONS = shuffle([
  {
    question: 'Berapa kalimahkah dalam Dua Kalimah Syahadah?',
    answer: '2 kalimah',
    options: ['1 kalimah', '2 kalimah', '3 kalimah', '4 kalimah'],
  },
  {
    question: 'Apakah maksud "Asyhadu allaa ilaaha illallah"?',
    answer: 'Aku bersaksi tiada Tuhan selain Allah',
    options: [
      'Aku bersaksi tiada Tuhan selain Allah',
      'Muhammad itu Rasul Allah',
      'Allah Maha Pencipta',
      'Allah Maha Esa',
    ],
  },
  {
    question: 'Apakah maksud "wa asyhadu anna Muhammadan Rasuulullah"?',
    answer: 'Muhammad itu Rasul Allah',
    options: [
      'Allah Maha Pemurah',
      'Muhammad itu Rasul Allah',
      'Tiada Tuhan selain Allah',
      'Allah adalah Pencipta',
    ],
  },
  {
    question: 'Syahadah merupakan Rukun Islam yang ke berapa?',
    answer: 'Yang ke-1',
    options: ['Yang ke-1', 'Yang ke-2', 'Yang ke-3', 'Yang ke-5'],
  },
  {
    question: 'Apakah kepentingan utama mengucap Syahadah?',
    answer: 'Syarat masuk Islam',
    options: [
      'Syarat masuk Islam',
      'Syarat pergi haji',
      'Syarat membayar zakat',
      'Syarat berpuasa',
    ],
  },
  {
    question: 'Siapakah yang disebut dalam Kalimah Syahadah kedua?',
    answer: 'Nabi Muhammad SAW',
    options: ['Nabi Isa AS', 'Nabi Ibrahim AS', 'Nabi Muhammad SAW', 'Nabi Musa AS'],
  },
  {
    question: 'Berapa kali sekurang-kurangnya Syahadah diucapkan dalam hidup?',
    answer: 'Sekali',
    options: ['Sekali', 'Lima kali', 'Setiap hari', 'Setiap solat'],
  },
  {
    question: 'Kata "أَشْهَدُ" (asyhadu) bermaksud?',
    answer: 'Aku bersaksi',
    options: ['Aku bersaksi', 'Aku percaya', 'Aku memohon', 'Aku berdoa'],
  },
  {
    question: 'Apakah nama lain bagi Dua Kalimah Syahadah?',
    answer: 'Kalimah Tauhid',
    options: ['Kalimah Tauhid', 'Kalimah Basmala', 'Kalimah Takbir', 'Kalimah Salam'],
  },
  {
    question: 'Kalimah Syahadah pertama menegaskan tentang apa?',
    answer: 'Keesaan Allah',
    options: ['Keesaan Allah', 'Kerasulan Muhammad', 'Hari Kiamat', 'Malaikat Allah'],
  },
]);

const TOTAL_ROUNDS = 10;

// ── Kalimah card ───────────────────────────────────────────────────────────────
function KalimahCard({ k, language, showMeaning }) {
  return (
    <div style={{
      background: k.gradient, border: `2.5px solid ${k.border}`,
      borderRadius: 22, padding: '20px 16px',
      display: 'flex', flexDirection: 'column', gap: 12,
      boxShadow: '0 2px 0 rgba(255,255,255,0.35) inset, 0 10px 28px rgba(0,0,0,0.1)',
    }}>
      {/* Label */}
      <span style={{
        fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
        fontSize: 'clamp(0.72rem, 1.6vw, 0.85rem)', color: k.color,
        background: 'rgba(255,255,255,0.45)', padding: '3px 10px', borderRadius: 999,
        alignSelf: 'flex-start',
      }}>{k.label}</span>

      {/* Arabic lafaz */}
      <div style={{
        background: 'rgba(255,255,255,0.5)', borderRadius: 16, padding: '14px 16px',
        textAlign: 'right', direction: 'rtl',
      }}>
        <p style={{
          fontFamily: ARABIC_FONT, fontSize: 'clamp(1.35rem, 5vw, 1.9rem)',
          color: k.color, margin: 0, lineHeight: 2,
        }}>{k.ar}</p>
      </div>

      {/* Rumi */}
      <p style={{
        fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontStyle: 'italic',
        fontSize: 'clamp(0.78rem, 2vw, 0.92rem)', color: k.accent,
        margin: 0, lineHeight: 1.5,
      }}>{k.rumi}</p>

      {/* Meaning */}
      {showMeaning && (
        <div style={{ background: 'rgba(255,255,255,0.55)', borderRadius: 12, padding: '10px 12px' }}>
          <p style={{
            fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700,
            fontSize: 'clamp(0.74rem, 1.8vw, 0.88rem)', color: k.color, margin: '0 0 4px', lineHeight: 1.4,
          }}>
            {language === 'bm' ? k.meaning : k.meaningEng}
          </p>
          <p style={{
            fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 500,
            fontSize: 'clamp(0.68rem, 1.6vw, 0.8rem)', color: '#374151', margin: 0, lineHeight: 1.5,
          }}>{k.about}</p>
        </div>
      )}
    </div>
  );
}

// ── Quiz screen ────────────────────────────────────────────────────────────────
function QuizScreen({ language, onDone }) {
  const [pool]      = useState(() => shuffle(QUESTIONS).slice(0, TOTAL_ROUNDS));
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
          <div style={{ height: '100%', width: `${(round / TOTAL_ROUNDS) * 100}%`, background: 'linear-gradient(90deg, #8B5CF6, #C4B5FD)', borderRadius: 99, transition: 'width 0.4s ease' }} />
        </div>
        <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '0.85rem', color: '#A78BFA', whiteSpace: 'nowrap' }}>{round + 1} / {TOTAL_ROUNDS}</span>
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
        <span style={{ fontSize: '2.5rem' }}>✨</span>
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
    ? (language === 'bm' ? 'Cemerlang! Kamu faham Kalimah Syahadah dengan baik!' : 'Excellent! You understand the Syahadah well!')
    : pct >= 50
      ? (language === 'bm' ? 'Bagus! Teruskan berlatih.' : 'Good! Keep practising.')
      : (language === 'bm' ? 'Teruskan berlatih! Kamu pasti boleh!' : 'Keep going! You can do it!');
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center', gap: '1.25rem' }}>
      <div style={{ fontSize: '3rem' }}>{star}</div>
      <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(1.4rem, 4vw, 2rem)', color: '#A78BFA', margin: 0 }}>{score} / {TOTAL_ROUNDS}</h2>
      <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 'clamp(0.88rem, 2.2vw, 1.05rem)', color: '#CBD5E0', margin: 0, lineHeight: 1.5, maxWidth: 320 }}>{msg}</p>
      <div style={{ width: '100%', maxWidth: 300, height: 12, borderRadius: 99, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #8B5CF6, #C4B5FD)', borderRadius: 99, transition: 'width 0.8s ease' }} />
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button onClick={onRetry} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.85rem, 2vw, 1rem)', background: 'linear-gradient(135deg, #7C3AED, #8B5CF6)', color: '#fff', border: 'none', borderRadius: 999, padding: '10px 28px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(124,58,237,0.4)' }}>
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
export default function Syahadah({ onBack, language = 'bm' }) {
  const [tab,        setTab]        = useState('belajar');
  const [showMeaning, setShowMeaning] = useState(true);
  const [quizDone,   setQuizDone]   = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [quizKey,    setQuizKey]    = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0B1A2E', color: '#F1F5F9', fontFamily: 'Inter, sans-serif' }}>
      <BackButton onClick={onBack} />
      <style>{`${FONT_IMPORT}`}</style>

      <div style={{ padding: '1.5rem 3.5rem 0.75rem', flexShrink: 0, textAlign: 'center' }}>
        <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 'clamp(0.65rem, 1.4vw, 0.75rem)', color: 'rgba(255,255,255,0.45)', margin: '0 0 0.35rem' }}>
          Akidah &rsaquo; Topik 2.3
        </p>
        <h1 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(1.1rem, 3.5vw, 1.5rem)', color: '#C4B5FD', margin: '0 0 0.75rem' }}>
          {language === 'bm' ? 'Dua Kalimah Syahadah' : 'The Two Declarations of Faith'}
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
                background: tab === t.id ? 'linear-gradient(135deg, #7C3AED, #8B5CF6)' : 'rgba(255,255,255,0.07)',
                borderColor: tab === t.id ? '#8B5CF6' : 'rgba(255,255,255,0.15)',
                color: tab === t.id ? '#fff' : '#94A3B8',
                boxShadow: tab === t.id ? '0 4px 14px rgba(124,58,237,0.35)' : 'none',
              }}
            >{t.label}</button>
          ))}
        </div>
      </div>

      {tab === 'belajar' ? (
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 1.25rem calc(80px + var(--safe-bottom, 0px))' }}>
          {/* Full lafaz banner */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.25), rgba(139,92,246,0.15))',
            border: '2px solid rgba(139,92,246,0.35)', borderRadius: 18,
            padding: '16px', marginBottom: '1.1rem', textAlign: 'right', direction: 'rtl',
          }}>
            <p style={{ fontFamily: ARABIC_FONT, fontSize: 'clamp(1.1rem, 3.5vw, 1.5rem)', color: '#E9D5FF', margin: 0, lineHeight: 2 }}>
              {FULL_AR}
            </p>
          </div>

          {/* Toggle meaning */}
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <button onClick={() => { setShowMeaning(m => !m); playHoverSound(); }}
              style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '0.88rem', background: showMeaning ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.06)', color: '#E2E8F0', border: '2px solid rgba(255,255,255,0.15)', borderRadius: 999, padding: '7px 20px', cursor: 'pointer' }}>
              {showMeaning
                ? (language === 'bm' ? '🕌 Sembunyi Maksud' : '🕌 Hide Meaning')
                : (language === 'bm' ? '🕌 Tunjuk Maksud' : '🕌 Show Meaning')}
            </button>
          </div>

          {/* Kalimah cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {KALIMAH.map(k => <KalimahCard key={k.n} k={k} language={language} showMeaning={showMeaning} />)}
          </div>

          {/* Kepentingan section */}
          <div style={{ marginTop: '1.5rem' }}>
            <h3 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(0.85rem, 2.2vw, 1rem)', color: '#C4B5FD', margin: '0 0 0.75rem', paddingLeft: 10, borderLeft: '4px solid #8B5CF6' }}>
              {language === 'bm' ? 'Kepentingan Syahadah' : 'Importance of Syahadah'}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {KEPENTINGAN.map((k, i) => (
                <div key={i} style={{
                  background: 'rgba(139,92,246,0.1)', border: '1.5px solid rgba(139,92,246,0.25)',
                  borderRadius: 12, padding: '10px 14px',
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{k.icon}</span>
                  <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 'clamp(0.78rem, 2vw, 0.9rem)', color: '#E2E8F0', margin: 0, lineHeight: 1.4 }}>{k.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button onClick={() => { setTab('kuiz'); setQuizDone(false); setQuizKey(k => k + 1); playHoverSound(); }}
              style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.9rem, 2.2vw, 1.05rem)', background: 'linear-gradient(135deg, #7C3AED, #8B5CF6)', color: '#fff', border: 'none', borderRadius: 999, padding: '12px 32px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(124,58,237,0.4)' }}>
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
