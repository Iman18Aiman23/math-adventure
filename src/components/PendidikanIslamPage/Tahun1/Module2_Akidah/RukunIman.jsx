import React, { useState, useCallback } from 'react';
import Tahun1LessonLayout from '../Tahun1LessonLayout';
import { playHoverSound, playSound } from '../../../../utils/soundManager';
import { shuffle } from '../../_shared/utils';
import Celebration from '../../_shared/Celebration';

// ── Rukun Iman data ────────────────────────────────────────────────────────────
// Arabic text: original Islamic content (public domain religious text).
// Malay descriptions: originally written for this app.
const RUKUN = [
  {
    n: 1,
    ar: 'الإِيمَانُ بِاللهِ',
    name: 'Beriman kepada Allah',
    icon: '🌟',
    desc: 'Percaya bahawa Allah itu wujud, Esa, dan tiada Tuhan selain-Nya.',
    color: '#065F46', accent: '#10B981',
    gradient: 'linear-gradient(135deg, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
    border: 'rgba(42,154,108,0.5)',
  },
  {
    n: 2,
    ar: 'الإِيمَانُ بِالمَلَائِكَةِ',
    name: 'Beriman kepada Malaikat',
    icon: '😇',
    desc: 'Percaya wujudnya malaikat yang diciptakan daripada cahaya dan sentiasa taat kepada Allah.',
    color: '#1E40AF', accent: '#3B82F6',
    gradient: 'linear-gradient(135deg, #D6EEFF 0%, #6BAEE8 55%, #2563EB 100%)',
    border: 'rgba(37,99,235,0.5)',
  },
  {
    n: 3,
    ar: 'الإِيمَانُ بِالكُتُبِ',
    name: 'Beriman kepada Kitab-kitab Allah',
    icon: '📚',
    desc: 'Percaya bahawa Allah menurunkan kitab-Nya kepada rasul-rasul, termasuk al-Quran.',
    color: '#92400E', accent: '#F59E0B',
    gradient: 'linear-gradient(135deg, #FFF7D6 0%, #FDD97A 55%, #D4960A 100%)',
    border: 'rgba(212,150,10,0.5)',
  },
  {
    n: 4,
    ar: 'الإِيمَانُ بِالرُّسُلِ',
    name: 'Beriman kepada Rasul-rasul Allah',
    icon: '🕌',
    desc: 'Percaya bahawa Allah mengutuskan rasul-rasul untuk menyampaikan ajaran Islam.',
    color: '#4C1D95', accent: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #E7D9FF 0%, #B79CFF 55%, #7A55E0 100%)',
    border: 'rgba(122,85,224,0.5)',
  },
  {
    n: 5,
    ar: 'الإِيمَانُ بِاليَوْمِ الآخِرِ',
    name: 'Beriman kepada Hari Kiamat',
    icon: '⏳',
    desc: 'Percaya akan berlakunya hari kiamat di mana semua manusia akan dibangkitkan dan dihisab.',
    color: '#9D174D', accent: '#EC4899',
    gradient: 'linear-gradient(135deg, #FFE9F3 0%, #FFBFDD 55%, #FF8CBF 100%)',
    border: 'rgba(236,72,153,0.5)',
  },
  {
    n: 6,
    ar: 'الإِيمَانُ بِالقَدَرِ',
    name: 'Beriman kepada Qada dan Qadar',
    icon: '⚖️',
    desc: 'Percaya bahawa segala yang berlaku — baik mahupun buruk — adalah dengan ketentuan Allah.',
    color: '#0C4A6E', accent: '#0891B2',
    gradient: 'linear-gradient(135deg, #D0F7FA 0%, #67D6E8 55%, #0891B2 100%)',
    border: 'rgba(8,145,178,0.5)',
  },
];

// Distractors for "which is NOT Rukun Iman" questions
const NOT_RUKUN_IMAN = [
  'Mendirikan Solat',
  'Menunaikan Zakat',
  'Berpuasa di Bulan Ramadan',
  'Menunaikan Ibadah Haji',
];

// ── Quiz question builder ──────────────────────────────────────────────────────
function buildQuestions() {
  const qs = [];

  // Q type A: "Apakah Rukun Iman yang ke-N?"
  RUKUN.forEach(r => {
    const wrong = shuffle(RUKUN.filter(x => x.n !== r.n)).slice(0, 3).map(x => x.name);
    qs.push({
      question: `Apakah Rukun Iman yang ke-${r.n}?`,
      answer: r.name,
      options: shuffle([r.name, ...wrong]),
    });
  });

  // Q type B: "Rukun Iman yang ke berapa ialah [name]?"
  RUKUN.forEach(r => {
    const wrongNums = shuffle([1,2,3,4,5,6].filter(n => n !== r.n)).slice(0, 3).map(n => `Yang ke-${n}`);
    qs.push({
      question: `Rukun Iman yang ke berapa ialah "${r.name}"?`,
      answer: `Yang ke-${r.n}`,
      options: shuffle([`Yang ke-${r.n}`, ...wrongNums]),
    });
  });

  // Q type C: "Berapakah bilangan Rukun Iman?"
  qs.push({
    question: 'Berapakah bilangan Rukun Iman?',
    answer: '6',
    options: ['4', '5', '6', '7'],
  });

  // Q type D: "Yang manakah BUKAN Rukun Iman?"
  NOT_RUKUN_IMAN.forEach(distractor => {
    const real = shuffle(RUKUN).slice(0, 3).map(r => r.name);
    qs.push({
      question: 'Yang manakah BUKAN Rukun Iman?',
      answer: distractor,
      options: shuffle([distractor, ...real]),
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
      {/* Header row */}
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

      {/* Description — always visible */}
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
    if (isCorrect) { setScore(s => s + 1); playSound('correct'); }
    else playSound('wrong');
    setAnimating(true);
    setTimeout(() => {
      setChosen(null); setCorrect(null); setAnimating(false);
      if (round + 1 >= TOTAL_ROUNDS) onDone(isCorrect ? score + 1 : score);
      else setRound(r => r + 1);
    }, 900);
  }, [animating, chosen, q, round, score, onDone]);

  if (!q) return null;

  return (
    <div style={{
      flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem',
      padding: '0.75rem 1.25rem calc(0.75rem + var(--safe-bottom, 0px))', overflow: 'hidden',
    }}>
      {/* Progress */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ flex: 1, height: 8, borderRadius: 99, background: 'rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(round / TOTAL_ROUNDS) * 100}%`, background: 'linear-gradient(90deg, #10B981, #6EE7B7)', borderRadius: 99, transition: 'width 0.4s ease' }} />
        </div>
        <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '0.85rem', color: '#10B981', whiteSpace: 'nowrap' }}>{round + 1} / {TOTAL_ROUNDS}</span>
        <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '0.85rem', color: '#F59E0B' }}>⭐ {score}</span>
      </div>

      {/* Question card */}
      <div style={{
        flex: 1, minHeight: 0,
        background: '#FFFFFF', border: '2px solid rgba(0,0,0,0.06)',
        borderRadius: 20, padding: '1rem',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: '0.5rem', textAlign: 'center', position: 'relative', overflow: 'visible',
      }}>
        {chosen && correct && <Celebration />}
        <span style={{ fontSize: '2.5rem' }}>🕌</span>
        <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 'clamp(0.88rem, 2.2vw, 1.05rem)', color: 'var(--pi-ink)', margin: 0, lineHeight: 1.4, maxWidth: 340 }}>
          {q.question}
        </p>
      </div>

      {/* Options */}
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {q.options.map(opt => {
          const isChosen  = chosen === opt;
          const isCorrect = isChosen && correct;
          const isWrong   = isChosen && !correct;
          const isAnswer  = chosen && opt === q.answer && !isChosen;
          return (
            <button key={opt} onClick={() => handleAnswer(opt)} disabled={!!chosen}
              style={{
                fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700,
                fontSize: 'clamp(0.82rem, 2vw, 0.95rem)',
                padding: '11px 16px', borderRadius: 14, border: '2.5px solid',
                cursor: chosen ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                transition: 'all 0.2s ease', textAlign: 'left',
                background: isCorrect ? '#10B981' : isWrong ? '#EF4444' : isAnswer ? 'rgba(16,185,129,0.2)' : '#FFFFFF',
                borderColor: isCorrect ? '#10B981' : isWrong ? '#EF4444' : isAnswer ? '#10B981' : 'rgba(0,0,0,0.1)',
                color: isCorrect || isWrong ? '#fff' : 'var(--pi-ink)',
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
  const pct  = Math.round((score / TOTAL_ROUNDS) * 100);
  const star = pct >= 80 ? '🌟🌟🌟' : pct >= 50 ? '⭐⭐' : '⭐';
  const msg  = pct >= 80
    ? (language === 'bm' ? 'Cemerlang! Kamu faham semua Rukun Iman!' : 'Excellent! You know all the Pillars of Faith!')
    : pct >= 50
      ? (language === 'bm' ? 'Bagus! Teruskan berlatih.' : 'Good! Keep practising.')
      : (language === 'bm' ? 'Teruskan berlatih! Kamu pasti boleh!' : 'Keep going! You can do it!');
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center', gap: '1.25rem' }}>
      <div style={{ fontSize: '3rem' }}>{star}</div>
      <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(1.4rem, 4vw, 2rem)', color: '#10B981', margin: 0 }}>{score} / {TOTAL_ROUNDS}</h2>
      <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 'clamp(0.88rem, 2.2vw, 1.05rem)', color: 'var(--pi-muted)', margin: 0, lineHeight: 1.5, maxWidth: 320 }}>{msg}</p>
      <div style={{ width: '100%', maxWidth: 300, height: 12, borderRadius: 99, background: 'rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #10B981, #6EE7B7)', borderRadius: 99, transition: 'width 0.8s ease' }} />
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button onClick={onRetry} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.85rem, 2vw, 1rem)', background: 'linear-gradient(135deg, #10B981, #065F46)', color: '#fff', border: 'none', borderRadius: 999, padding: '10px 28px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(16,185,129,0.4)' }}>
          🔁 {language === 'bm' ? 'Cuba Lagi' : 'Try Again'}
        </button>
        <button onClick={onBack} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.85rem, 2vw, 1rem)', background: 'rgba(0,0,0,0.04)', color: 'var(--pi-muted)', border: '2px solid rgba(0,0,0,0.1)', borderRadius: 999, padding: '10px 28px', cursor: 'pointer' }}>
          ← {language === 'bm' ? 'Kembali' : 'Back'}
        </button>
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
export default function RukunIman({ onBack, language = 'bm' }) {
  const [tab,        setTab]        = useState('belajar');
  const [quizDone,   setQuizDone]   = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [quizKey,    setQuizKey]    = useState(0);

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
      breadcrumb="Akidah &rsaquo; Topik 2.1"
      title={language === 'bm' ? 'Rukun Iman (6 Perkara)' : 'Pillars of Faith (6)'}
      accentColor="#2A9A6C"
      tab={tab}
      onTabChange={handleTabChange}
    >

      {tab === 'belajar' ? (
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 1.25rem calc(80px + var(--safe-bottom, 0px))' }}>
          {/* Bilangan note */}
          <div style={{
            background: 'rgba(16,185,129,0.12)', border: '1.5px solid rgba(16,185,129,0.3)',
            borderRadius: 14, padding: '10px 14px', marginBottom: '1rem',
            fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600,
            fontSize: 'clamp(0.78rem, 2vw, 0.9rem)', color: '#6EE7B7', textAlign: 'center',
          }}>
            {language === 'bm'
              ? '🕌 Rukun Iman ada 6 perkara · Ketuk kad untuk keterangan'
              : '🕌 There are 6 Pillars of Faith · Tap a card for details'}
          </div>
          <div className="ri-grid">
            {RUKUN.map(r => <LearnCard key={r.n} r={r} />)}
          </div>
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button
              onClick={() => { setTab('kuiz'); setQuizDone(false); setQuizKey(k => k + 1); playHoverSound(); }}
              style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.9rem, 2.2vw, 1.05rem)', background: 'linear-gradient(135deg, #065F46, #10B981)', color: '#fff', border: 'none', borderRadius: 999, padding: '12px 32px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(16,185,129,0.4)' }}>
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
    </Tahun1LessonLayout>
  );
}
