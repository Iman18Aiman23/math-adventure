import React, { useState, useCallback, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../../../../utils/soundManager';
import BackButton from '../../../BackButton';

// KSSR Matematik Tahun 1 — Bidang Pembelajaran 10: Pengurusan Data.
// Three rotating mechanics, all reading the same kind of simple emoji
// pictograph (1 emoji = 1 unit, which is the KSSR Tahun 1 convention):
//   1. Kira       — count one category from the pictograph
//   2. Paling …   — pick paling banyak / paling sedikit
//   3. Beza       — difference between two categories ("berapa lebih X daripada Y?")
// 12 questions/round, per-mechanic stats. Theme + counts regenerate each round.

// ── Helpers ───────────────────────────────────────────────────────────────────
const randInt = (lo, hi) => Math.floor(Math.random() * (hi - lo + 1)) + lo;
const shuffle = (arr)    => [...arr].sort(() => Math.random() - 0.5);
const pick    = (arr)    => arr[Math.floor(Math.random() * arr.length)];

// ── Pictograph themes ─────────────────────────────────────────────────────────
const THEMES = [
  {
    id: 'fruits',
    title: { bm: 'Buah Kegemaran Murid',  eng: "Pupils' Favourite Fruits" },
    categories: [
      { id: 'epal',   label: { bm: 'Epal',   eng: 'Apple'  }, emoji: '🍎' },
      { id: 'pisang', label: { bm: 'Pisang', eng: 'Banana' }, emoji: '🍌' },
      { id: 'oren',   label: { bm: 'Oren',   eng: 'Orange' }, emoji: '🍊' },
      { id: 'anggur', label: { bm: 'Anggur', eng: 'Grapes' }, emoji: '🍇' },
    ],
  },
  {
    id: 'pets',
    title: { bm: 'Haiwan Peliharaan', eng: 'Pets at Home' },
    categories: [
      { id: 'kucing', label: { bm: 'Kucing', eng: 'Cat'    }, emoji: '🐱' },
      { id: 'anjing', label: { bm: 'Anjing', eng: 'Dog'    }, emoji: '🐶' },
      { id: 'arnab',  label: { bm: 'Arnab',  eng: 'Rabbit' }, emoji: '🐰' },
      { id: 'ikan',   label: { bm: 'Ikan',   eng: 'Fish'   }, emoji: '🐠' },
    ],
  },
  {
    id: 'sports',
    title: { bm: 'Sukan Kegemaran', eng: 'Favourite Sports' },
    categories: [
      { id: 'bola',    label: { bm: 'Bola Sepak', eng: 'Football'   }, emoji: '⚽' },
      { id: 'jaring',  label: { bm: 'Bola Jaring',eng: 'Netball'    }, emoji: '🏐' },
      { id: 'badminton', label: { bm: 'Badminton',eng: 'Badminton'  }, emoji: '🏸' },
      { id: 'lari',    label: { bm: 'Lari',       eng: 'Running'    }, emoji: '🏃' },
    ],
  },
  {
    id: 'flowers',
    title: { bm: 'Bunga di Taman', eng: 'Flowers in the Garden' },
    categories: [
      { id: 'mawar',    label: { bm: 'Mawar',    eng: 'Rose'         }, emoji: '🌹' },
      { id: 'matahari', label: { bm: 'Matahari', eng: 'Sunflower'    }, emoji: '🌻' },
      { id: 'tulip',    label: { bm: 'Tulip',    eng: 'Tulip'        }, emoji: '🌷' },
      { id: 'sakura',   label: { bm: 'Sakura',   eng: 'Cherry Blossom'}, emoji: '🌸' },
    ],
  },
];

// Build a fresh pictograph: pick 3 categories from a theme + random counts (2–8).
// Counts must all be DISTINCT so "paling banyak" / "paling sedikit" have a unique answer.
function buildPictograph(theme) {
  const cats = shuffle(theme.categories).slice(0, 3);
  let counts;
  do {
    counts = cats.map(() => randInt(2, 8));
  } while (new Set(counts).size < cats.length);
  return cats.map((c, i) => ({ ...c, count: counts[i] }));
}

// ── Question generators ───────────────────────────────────────────────────────
function makeNumDistractors(answer, count = 3) {
  const cands = new Set([answer - 1, answer + 1, answer - 2, answer + 2, answer + 3]
    .filter(x => x > 0 && x !== answer));
  return shuffle([...cands]).slice(0, count).map(String);
}

function genCountQ() {
  const theme = pick(THEMES);
  const data  = buildPictograph(theme);
  const target = pick(data);
  return {
    type: 'count',
    theme, data,
    question_bm:  `Berapa ${target.label.bm.toLowerCase()}?`,
    question_eng: `How many ${target.label.eng.toLowerCase()}?`,
    options: shuffle([String(target.count), ...makeNumDistractors(target.count)])
      .map(v => ({ key: v, label_bm: v, label_eng: v })),
    answer: String(target.count),
  };
}

function genMostLeastQ() {
  const theme = pick(THEMES);
  const data  = buildPictograph(theme);
  const askMost = Math.random() < 0.5;
  const sorted = [...data].sort((a, b) => a.count - b.count);
  const winner = askMost ? sorted[sorted.length - 1] : sorted[0];
  return {
    type: 'mostleast',
    theme, data, askMost,
    question_bm:  askMost ? 'Mana paling banyak?'   : 'Mana paling sedikit?',
    question_eng: askMost ? 'Which has the most?'   : 'Which has the least?',
    options: shuffle(data).map(c => ({
      key: c.id,
      label_bm: c.label.bm,
      label_eng: c.label.eng,
      emoji: c.emoji,
    })),
    answer: winner.id,
  };
}

function genDifferenceQ() {
  const theme = pick(THEMES);
  const data  = buildPictograph(theme);
  // pick the two with the largest gap so the difference is meaningful
  const sorted = [...data].sort((a, b) => b.count - a.count);
  const high = sorted[0];
  const low  = sorted[sorted.length - 1];
  const diff = high.count - low.count;
  return {
    type: 'difference',
    theme, data, high, low,
    question_bm:  `Berapa lebih ${high.label.bm.toLowerCase()} daripada ${low.label.bm.toLowerCase()}?`,
    question_eng: `How many more ${high.label.eng.toLowerCase()} than ${low.label.eng.toLowerCase()}?`,
    options: shuffle([String(diff), ...makeNumDistractors(diff)])
      .map(v => ({ key: v, label_bm: v, label_eng: v })),
    answer: String(diff),
  };
}

function buildQuestions() {
  const qs = [];
  for (let i = 0; i < 4; i++) qs.push(genCountQ());
  for (let i = 0; i < 4; i++) qs.push(genMostLeastQ());
  for (let i = 0; i < 4; i++) qs.push(genDifferenceQ());
  return shuffle(qs);
}

const TYPE_META = {
  count:      { bm: 'Kira',           eng: 'Count',       emoji: '🔢' },
  mostleast:  { bm: 'Paling Banyak',  eng: 'Most/Least',  emoji: '🏆' },
  difference: { bm: 'Beza',           eng: 'Difference',  emoji: '➖' },
};
const emptyStats = () => ({ count: { c: 0, t: 0 }, mostleast: { c: 0, t: 0 }, difference: { c: 0, t: 0 } });

// ── Pictograph rendering ──────────────────────────────────────────────────────
const Pictograph = React.memo(function Pictograph({ data, language }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {data.map(cat => (
        <div key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ width: '78px', fontWeight: 800, fontSize: '0.82rem', color: '#5D4037', textAlign: 'left', lineHeight: 1.2 }}>
            {cat.label[language] ?? cat.label.bm}
          </span>
          <div style={{ display: 'flex', gap: '2px', flexWrap: 'wrap' }}>
            {Array.from({ length: cat.count }).map((_, i) => (
              <span key={i} style={{ fontSize: '1.2rem', lineHeight: 1 }}>{cat.emoji}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});

// ── Component ─────────────────────────────────────────────────────────────────
export default function BacaPictograph({ onBack, language = 'bm' }) {
  const [questions, setQuestions]   = useState(() => buildQuestions());
  const [index,     setIndex]       = useState(0);
  const [selected,  setSelected]    = useState(null);
  const [score,     setScore]       = useState(0);
  const [streak,    setStreak]      = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [stats,     setStats]       = useState(emptyStats);
  const [complete,  setComplete]    = useState(false);

  const current    = questions[index];
  const isAnswered = selected !== null;
  const isCorrect  = isAnswered && selected === current?.answer;
  const isLastQ    = index + 1 >= questions.length;

  const handleSelect = useCallback((optionKey) => {
    if (isAnswered || !current) return;
    setSelected(optionKey);
    const correct = optionKey === current.answer;
    setStats(s => ({
      ...s,
      [current.type]: { c: s[current.type].c + (correct ? 1 : 0), t: s[current.type].t + 1 },
    }));
    if (correct) {
      playSound('correct');
      setScore(s => s + 1);
      setStreak(s => {
        const next = s + 1;
        if (next % 4 === 0) confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        setBestStreak(b => Math.max(b, next));
        return next;
      });
    } else {
      playSound('wrong');
      setStreak(0);
    }
  }, [current, isAnswered]);

  const handleNext = useCallback(() => {
    if (!isAnswered) return;
    if (isLastQ) {
      setComplete(true);
      confetti({ particleCount: 200, spread: 160, origin: { y: 0.4 } });
      return;
    }
    setIndex(i => i + 1);
    setSelected(null);
  }, [isAnswered, isLastQ]);

  useEffect(() => {
    if (!complete && isLastQ && isAnswered) {
      const id = setTimeout(() => {
        setComplete(true);
        confetti({ particleCount: 200, spread: 160, origin: { y: 0.4 } });
      }, 2000);
      return () => clearTimeout(id);
    }
  }, [complete, isLastQ, isAnswered]);

  const handleReset = useCallback(() => {
    setQuestions(buildQuestions());
    setIndex(0);
    setSelected(null);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setStats(emptyStats());
    setComplete(false);
  }, []);

  // ── Complete screen ────────────────────────────────────────────────────────
  if (complete) {
    const pct = Math.round((score / questions.length) * 100);
    const verdict = pct >= 90 ? { bm: 'Cemerlang!', eng: 'Excellent!', color: '#2E7D32' }
                  : pct >= 70 ? { bm: 'Bagus!',     eng: 'Good job!',   color: '#388E3C' }
                  : pct >= 50 ? { bm: 'Boleh lagi!', eng: 'Keep going!', color: '#F57C00' }
                              : { bm: 'Cuba lagi!', eng: 'Try again!',  color: '#C62828' };
    return (
      <div style={{ minHeight: '100%', background: '#FFE9CC', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        <BackButton onClick={onBack} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3.5rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
          <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>📊</div>
          <h2 style={{ color: verdict.color, fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.25rem' }}>
            {language === 'bm' ? verdict.bm : verdict.eng}
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#888', marginBottom: '1rem' }}>
            {language === 'bm' ? 'Laporan Markah' : 'Score Report'}
          </p>

          <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '1.25rem 1.5rem', border: '3px solid #FFCF80', marginBottom: '1rem', textAlign: 'center', width: '100%', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#888', letterSpacing: '0.5px', marginBottom: '0.25rem' }}>
              {language === 'bm' ? 'MARKAH KESELURUHAN' : 'TOTAL SCORE'}
            </div>
            <div style={{ fontSize: '3rem', fontWeight: 900, color: '#FF9600', lineHeight: 1 }}>
              {score}<span style={{ fontSize: '1.5rem', color: '#999' }}> / {questions.length}</span>
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: verdict.color, marginTop: '0.25rem' }}>{pct}%</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '0.75rem' }}>
              <div style={{ background: '#FFEAD0', borderRadius: '999px', padding: '4px 12px', fontWeight: 900, fontSize: '0.82rem', color: '#D9610B', border: '1.5px solid #FFC081' }}>
                🔥 {language === 'bm' ? 'Streak terbaik' : 'Best streak'}: {bestStreak}
              </div>
            </div>
          </div>

          <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '1rem 1.25rem', border: '2px solid #FFCF80', marginBottom: '1rem', width: '100%' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#888', letterSpacing: '0.5px', marginBottom: '0.65rem' }}>
              {language === 'bm' ? 'PRESTASI MENGIKUT KEMAHIRAN' : 'PERFORMANCE BY SKILL'}
            </div>
            {Object.entries(TYPE_META).map(([key, meta]) => {
              const s = stats[key];
              const p = s.t ? Math.round((s.c / s.t) * 100) : 0;
              const barColor = p >= 75 ? '#4CAF50' : p >= 50 ? '#FF9600' : '#FF6B6B';
              return (
                <div key={key} style={{ marginBottom: '0.65rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.88rem', color: '#333' }}>
                      {meta.emoji} {language === 'bm' ? meta.bm : meta.eng}
                    </span>
                    <span style={{ fontWeight: 900, fontSize: '0.85rem', color: barColor }}>
                      {s.c}/{s.t} · {p}%
                    </span>
                  </div>
                  <div style={{ background: '#F5F5F5', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
                    <div style={{ background: barColor, height: '100%', width: `${p}%`, borderRadius: '999px', transition: 'width 0.4s' }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', width: '100%' }}>
            <button onClick={handleReset} style={{ flex: 1, padding: '0.85rem', background: '#FFFFFF', color: '#FF9600', border: '2px solid #FF9600', borderRadius: '12px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>
              {language === 'bm' ? 'Main Semula' : 'Play Again'}
            </button>
            <button onClick={onBack} style={{ flex: 1, padding: '0.85rem', background: '#FF9600', color: 'white', border: 'none', borderRadius: '12px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 0 #D47A00' }}>
              {language === 'bm' ? 'Kembali' : 'Back'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!current) return null;

  const typeLabel = TYPE_META[current.type];

  // Look up the friendly label for the answer (for feedback line on mostleast)
  const answerLabel = (() => {
    if (current.type === 'mostleast') {
      const cat = current.data.find(c => c.id === current.answer);
      return cat ? (cat.label[language] ?? cat.label.bm) : current.answer;
    }
    return current.answer;
  })();

  // ── Active game ────────────────────────────────────────────────────────────
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FFE9CC', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />

      {/* ── Header ── */}
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div>
            <h1 style={{ color: '#FF9600', fontSize: '1.4rem', fontWeight: 900, marginBottom: '0.1rem' }}>
              📊 {language === 'bm' ? 'Baca Pictograph' : 'Read Pictograph'}
            </h1>
            <p style={{ color: '#888', fontSize: '0.82rem' }}>
              {language === 'bm' ? 'Kira, banding & beza' : 'Count, compare & differ'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
            <div style={{ background: '#FFF6D6', borderRadius: '999px', padding: '4px 12px', fontWeight: 900, fontSize: '0.82rem', color: '#B58800', border: '1.5px solid #FFE08A' }}>
              ⭐ {score}
            </div>
            <div style={{ background: '#FFEAD0', borderRadius: '999px', padding: '4px 12px', fontWeight: 900, fontSize: '0.82rem', color: '#D9610B', border: '1.5px solid #FFC081' }}>
              🔥 {streak}
            </div>
          </div>
        </div>
        <div style={{ background: '#FFD9A8', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
          <div style={{ background: '#FF9600', height: '100%', borderRadius: '999px', width: `${(index / questions.length) * 100}%`, transition: 'width 0.3s' }} />
        </div>
        <p style={{ textAlign: 'center', color: '#888', fontSize: '0.78rem', marginTop: '0.35rem' }}>
          {index + 1} / {questions.length}
        </p>
      </div>

      {/* ── Body ── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>

        {/* Question card */}
        <div style={{ background: '#FFFFFF', border: '3px solid #FFCF80', borderRadius: '24px', padding: '1.25rem 1rem', textAlign: 'center', marginBottom: '1rem', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 800, color: '#FF7043', marginBottom: '0.5rem', letterSpacing: '0.6px' }}>
            {typeLabel.emoji} {language === 'bm' ? typeLabel.bm.toUpperCase() : typeLabel.eng.toUpperCase()}
          </p>

          {/* Pictograph — same renderer for all 3 mechanics */}
          <p style={{ fontSize: '0.92rem', fontWeight: 900, color: '#5D4037', marginBottom: '0.75rem' }}>
            {current.theme.title[language] ?? current.theme.title.bm}
          </p>
          <div style={{
            background: '#FFF8E1',
            border: '2px solid #FBC02D',
            borderRadius: '14px',
            padding: '0.75rem 0.85rem',
            marginBottom: '0.75rem',
            textAlign: 'left',
          }}>
            <Pictograph data={current.data} language={language} />
          </div>

          <p style={{ fontSize: '1rem', fontWeight: 800, color: '#333', marginTop: '0.5rem' }}>
            {language === 'bm' ? current.question_bm : current.question_eng}
          </p>
        </div>

        {/* MCQ options */}
        <div style={{ display: 'grid', gridTemplateColumns: current.options.length === 3 ? '1fr 1fr 1fr' : '1fr 1fr', gap: '0.6rem' }}>
          {current.options.map((opt, idx) => {
            const chosen      = selected === opt.key;
            const isAnswerOpt = opt.key === current.answer;
            const showCorrect = isAnswered && isAnswerOpt;
            const showWrong   = isAnswered && chosen && !isAnswerOpt;
            let bg = '#FFFFFF', border = '#FFCF80', color = '#333';
            if (showCorrect) { bg = '#E8F5E9'; border = '#4CAF50'; color = '#2E7D32'; }
            else if (showWrong) { bg = '#FFEBEE'; border = '#FF6B6B'; color = '#C62828'; }
            else if (isAnswered) { color = '#999'; }
            return (
              <button
                key={idx}
                onClick={() => handleSelect(opt.key)}
                disabled={isAnswered}
                style={{
                  background: bg, border: `3px solid ${border}`, borderRadius: '14px',
                  padding: '0.85rem 0.5rem',
                  fontWeight: 900,
                  fontSize: current.type === 'mostleast' ? '0.95rem' : '1.5rem',
                  color, cursor: isAnswered ? 'default' : 'pointer',
                  transition: 'all 0.2s', textAlign: 'center',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px',
                }}>
                {opt.emoji && <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>{opt.emoji}</span>}
                <span>{language === 'bm' ? opt.label_bm : opt.label_eng}</span>
                {showCorrect && <span style={{ fontSize: '1rem' }}>✓</span>}
                {showWrong && <span style={{ fontSize: '1rem' }}>✗</span>}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {isAnswered && (
          <div style={{ marginTop: '0.75rem', textAlign: 'center', fontSize: '0.9rem', fontWeight: 700, color: isCorrect ? '#2E7D32' : '#C62828' }}>
            {isCorrect
              ? (language === 'bm' ? '✓ Betul!' : '✓ Correct!')
              : (language === 'bm' ? `Jawapan: ${answerLabel}` : `Answer: ${answerLabel}`)}
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <div style={{ flexShrink: 0, background: '#FFE9CC', borderTop: '2px solid rgba(255,150,0,0.25)', padding: '0.75rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box', display: 'flex', gap: '0.75rem' }}>
        <button onClick={handleReset}
          style={{ flex: 1, padding: '0.75rem', background: '#E0E0E0', color: '#555', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
          <RefreshCw size={18} /> {language === 'bm' ? 'Mula Semula' : 'Reset'}
        </button>
        <button onClick={handleNext} disabled={!isAnswered}
          style={{ flex: 1, padding: '0.75rem', background: isAnswered ? '#FF9600' : '#FFCF80', color: 'white', border: 'none', borderRadius: '10px', cursor: isAnswered ? 'pointer' : 'not-allowed', fontWeight: 'bold', fontSize: '1rem', boxShadow: isAnswered ? '0 4px 0 #D47A00' : 'none', transition: 'background 0.2s' }}>
          {isLastQ
            ? (language === 'bm' ? 'Tamat ✓' : 'Finish ✓')
            : (language === 'bm' ? 'Seterusnya →' : 'Next →')}
        </button>
      </div>
    </div>
  );
}
