import React, { useState, useCallback, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../../utils/soundManager';
import BackButton from '../BackButton';

// KSSR Matematik Tahun 1 — Bidang 7: Jisim.
// Three mechanics (12 qs / round, 4 each, shuffled):
//   1. Banding  — two objects with kg labels, "mana lebih berat/ringan?"
//   2. Timbang  — object + digital scale display, "berapa kg?"
//   3. Susunan  — three objects with kg labels, "mana paling berat/ringan?"

const OBJECTS = [
  { id: 'buku',     emoji: '📚', bm: 'buku',      eng: 'books'      },
  { id: 'bola',     emoji: '⚽', bm: 'bola',      eng: 'ball'       },
  { id: 'beg',      emoji: '🎒', bm: 'beg',       eng: 'bag'        },
  { id: 'tembikai', emoji: '🍉', bm: 'tembikai',  eng: 'watermelon' },
  { id: 'pisang',   emoji: '🍌', bm: 'pisang',    eng: 'banana'     },
  { id: 'nanas',    emoji: '🍍', bm: 'nanas',     eng: 'pineapple'  },
  { id: 'kotak',    emoji: '📦', bm: 'kotak',     eng: 'box'        },
  { id: 'bakul',    emoji: '🧺', bm: 'bakul',     eng: 'basket'     },
  { id: 'kucing',   emoji: '🐱', bm: 'kucing',    eng: 'cat'        },
  { id: 'ayam',     emoji: '🐔', bm: 'ayam',      eng: 'chicken'    },
];

const randInt = (lo, hi) => Math.floor(Math.random() * (hi - lo + 1)) + lo;
const shuffle  = arr => [...arr].sort(() => Math.random() - 0.5);
const pick     = arr => arr[Math.floor(Math.random() * arr.length)];

function pickN(arr, n) {
  return shuffle(arr).slice(0, n);
}

function uniqueKg(n) {
  const vals = new Set();
  while (vals.size < n) vals.add(randInt(1, 10));
  return [...vals];
}

function genBandingQ() {
  const [a, b] = pickN(OBJECTS, 2);
  const [kgA, kgB] = uniqueKg(2);
  const askHeavier = Math.random() < 0.5;
  const answer = askHeavier ? (kgA > kgB ? a.id : b.id) : (kgA < kgB ? a.id : b.id);
  return {
    type: 'banding',
    items: [{ ...a, kg: kgA }, { ...b, kg: kgB }],
    askHeavier,
    question_bm:  askHeavier ? 'Mana lebih berat?' : 'Mana lebih ringan?',
    question_eng: askHeavier ? 'Which is heavier?'  : 'Which is lighter?',
    options: shuffle([
      { key: a.id, label_bm: a.bm, label_eng: a.eng, emoji: a.emoji },
      { key: b.id, label_bm: b.bm, label_eng: b.eng, emoji: b.emoji },
    ]),
    answer,
  };
}

function genTimbangQ() {
  const obj = pick(OBJECTS);
  const kg  = randInt(1, 10);
  const dist = new Set();
  while (dist.size < 3) {
    const d = randInt(1, 10);
    if (d !== kg) dist.add(d);
  }
  return {
    type: 'timbang',
    obj, kg,
    question_bm:  `Berapa kg berat ${obj.bm} ini?`,
    question_eng: `How many kg does this ${obj.eng} weigh?`,
    options: shuffle([kg, ...[...dist]]).map(v => ({
      key: String(v), label_bm: `${v} kg`, label_eng: `${v} kg`,
    })),
    answer: String(kg),
  };
}

function genSusunanQ() {
  const three = pickN(OBJECTS, 3);
  const kgs   = uniqueKg(3);
  const items = three.map((o, i) => ({ ...o, kg: kgs[i] }));
  const askHeaviest = Math.random() < 0.5;
  const sorted = [...items].sort((a, b) => a.kg - b.kg);
  const answer = askHeaviest ? sorted[sorted.length - 1].id : sorted[0].id;
  return {
    type: 'susunan',
    items,
    askHeaviest,
    question_bm:  askHeaviest ? 'Mana paling berat?' : 'Mana paling ringan?',
    question_eng: askHeaviest ? 'Which is the heaviest?' : 'Which is the lightest?',
    options: shuffle(items).map(o => ({
      key: o.id, label_bm: o.bm, label_eng: o.eng, emoji: o.emoji,
    })),
    answer,
  };
}

function buildQuestions() {
  const qs = [];
  for (let i = 0; i < 4; i++) qs.push(genBandingQ());
  for (let i = 0; i < 4; i++) qs.push(genTimbangQ());
  for (let i = 0; i < 4; i++) qs.push(genSusunanQ());
  return shuffle(qs);
}

const TYPE_META = {
  banding:  { bm: 'Banding Jisim',       eng: 'Compare Weight',      emoji: '⚖️' },
  timbang:  { bm: 'Baca Timbangan',      eng: 'Read the Scale',      emoji: '🏋️' },
  susunan:  { bm: 'Paling Berat/Ringan', eng: 'Heaviest / Lightest', emoji: '🏆' },
};
const emptyStats = () => ({ banding: { c: 0, t: 0 }, timbang: { c: 0, t: 0 }, susunan: { c: 0, t: 0 } });

// Simple platform scale showing kg on a digital display
const ScaleSvg = ({ kg }) => (
  <svg width="130" height="100" viewBox="0 0 130 100">
    <rect x="42" y="78" width="46" height="10" rx="5" fill="#8D6E63" />
    <rect x="60" y="48" width="10" height="30" rx="4" fill="#A1887F" />
    <ellipse cx="65" cy="48" rx="36" ry="9" fill="#D7CCC8" stroke="#8D6E63" strokeWidth="2" />
    <rect x="29" y="18" width="72" height="26" rx="8" fill="#E3F2FD" stroke="#42A5F5" strokeWidth="2.5" />
    <text x="65" y="36" textAnchor="middle" fontSize="16" fontWeight="900" fill="#1565C0">{kg} kg</text>
  </svg>
);

export default function Jisim({ onBack, language = 'bm' }) {
  const [questions,   setQuestions]   = useState(() => buildQuestions());
  const [index,       setIndex]       = useState(0);
  const [selected,    setSelected]    = useState(null);
  const [score,       setScore]       = useState(0);
  const [streak,      setStreak]      = useState(0);
  const [bestStreak,  setBestStreak]  = useState(0);
  const [stats,       setStats]       = useState(emptyStats);
  const [complete,    setComplete]    = useState(false);

  const current    = questions[index];
  const isAnswered = selected !== null;
  const isCorrect  = isAnswered && selected === current?.answer;
  const isLastQ    = index + 1 >= questions.length;

  const handleSelect = useCallback((key) => {
    if (isAnswered || !current) return;
    setSelected(key);
    const correct = key === current.answer;
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
    if (isLastQ) { setComplete(true); confetti({ particleCount: 200, spread: 160, origin: { y: 0.4 } }); return; }
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
    setIndex(0); setSelected(null); setScore(0); setStreak(0); setBestStreak(0);
    setStats(emptyStats()); setComplete(false);
  }, []);

  if (complete) {
    const pct = Math.round((score / questions.length) * 100);
    const verdict = pct >= 90 ? { bm: 'Cemerlang!',  eng: 'Excellent!',  color: '#2E7D32' }
                  : pct >= 70 ? { bm: 'Bagus!',      eng: 'Good job!',   color: '#388E3C' }
                  : pct >= 50 ? { bm: 'Boleh lagi!', eng: 'Keep going!', color: '#F57C00' }
                              : { bm: 'Cuba lagi!',  eng: 'Try again!',  color: '#C62828' };
    return (
      <div style={{ minHeight: '100%', background: '#FFE9CC', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        <BackButton onClick={onBack} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3.5rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
          <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>⚖️</div>
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
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.75rem' }}>
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
                    <span style={{ fontWeight: 900, fontSize: '0.85rem', color: barColor }}>{s.c}/{s.t} · {p}%</span>
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

  const answerLabel = (() => {
    if (current.type === 'banding' || current.type === 'susunan') {
      const opt = current.options.find(o => o.key === current.answer);
      return opt ? (language === 'bm' ? opt.label_bm : opt.label_eng) : current.answer;
    }
    return `${current.answer} kg`;
  })();

  const gridCols = current.type === 'susunan' ? '1fr 1fr 1fr' : '1fr 1fr';

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FFE9CC', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />

      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div>
            <h1 style={{ color: '#FF9600', fontSize: '1.4rem', fontWeight: 900, marginBottom: '0.1rem' }}>
              ⚖️ {language === 'bm' ? 'Jisim' : 'Mass & Weight'}
            </h1>
            <p style={{ color: '#888', fontSize: '0.82rem' }}>
              {language === 'bm' ? 'Berat, ringan & kilogram' : 'Heavy, light & kilograms'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
            <div style={{ background: '#FFF6D6', borderRadius: '999px', padding: '4px 12px', fontWeight: 900, fontSize: '0.82rem', color: '#B58800', border: '1.5px solid #FFE08A' }}>⭐ {score}</div>
            <div style={{ background: '#FFEAD0', borderRadius: '999px', padding: '4px 12px', fontWeight: 900, fontSize: '0.82rem', color: '#D9610B', border: '1.5px solid #FFC081' }}>🔥 {streak}</div>
          </div>
        </div>
        <div style={{ background: '#FFD9A8', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
          <div style={{ background: '#FF9600', height: '100%', borderRadius: '999px', width: `${(index / questions.length) * 100}%`, transition: 'width 0.3s' }} />
        </div>
        <p style={{ textAlign: 'center', color: '#888', fontSize: '0.78rem', marginTop: '0.35rem' }}>{index + 1} / {questions.length}</p>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ background: '#FFFFFF', border: '3px solid #FFCF80', borderRadius: '24px', padding: '1.25rem 1rem', textAlign: 'center', marginBottom: '1rem', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 800, color: '#FF7043', marginBottom: '0.5rem', letterSpacing: '0.6px' }}>
            {typeLabel.emoji} {language === 'bm' ? typeLabel.bm.toUpperCase() : typeLabel.eng.toUpperCase()}
          </p>

          {/* Banding: two objects side by side */}
          {current.type === 'banding' && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
              {current.items.map(item => (
                <div key={item.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flex: 1 }}>
                  <span style={{ fontSize: '3rem' }}>{item.emoji}</span>
                  <span style={{ background: '#FFF3E0', border: '2px solid #FF9600', borderRadius: '999px', padding: '3px 14px', fontWeight: 900, fontSize: '1rem', color: '#E65100' }}>
                    {item.kg} kg
                  </span>
                  <span style={{ fontWeight: 700, fontSize: '0.82rem', color: '#555' }}>
                    {language === 'bm' ? item.bm : item.eng}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Timbang: object + platform scale */}
          {current.type === 'timbang' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '3.5rem' }}>{current.obj.emoji}</span>
              <ScaleSvg kg={current.kg} />
            </div>
          )}

          {/* Susunan: three objects in a row */}
          {current.type === 'susunan' && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              {current.items.map(item => (
                <div key={item.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flex: 1 }}>
                  <span style={{ fontSize: '2.4rem' }}>{item.emoji}</span>
                  <div style={{ background: '#FFF3E0', border: '2px solid #FF9600', borderRadius: '8px', padding: '2px 8px', fontWeight: 900, fontSize: '0.85rem', color: '#E65100' }}>
                    {item.kg} kg
                  </div>
                  <span style={{ fontWeight: 700, fontSize: '0.72rem', color: '#666' }}>
                    {language === 'bm' ? item.bm : item.eng}
                  </span>
                </div>
              ))}
            </div>
          )}

          <p style={{ fontSize: '1rem', fontWeight: 800, color: '#333', marginTop: '0.25rem' }}>
            {language === 'bm' ? current.question_bm : current.question_eng}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: gridCols, gap: '0.6rem' }}>
          {current.options.map((opt, idx) => {
            const chosen      = selected === opt.key;
            const isAnswerOpt = opt.key === current.answer;
            const showCorrect = isAnswered && isAnswerOpt;
            const showWrong   = isAnswered && chosen && !isAnswerOpt;
            let bg = '#FFFFFF', border = '#FFCF80', color = '#333';
            if (showCorrect)     { bg = '#E8F5E9'; border = '#4CAF50'; color = '#2E7D32'; }
            else if (showWrong)  { bg = '#FFEBEE'; border = '#FF6B6B'; color = '#C62828'; }
            else if (isAnswered) { color = '#999'; }
            return (
              <button
                key={idx}
                onClick={() => handleSelect(opt.key)}
                disabled={isAnswered}
                style={{
                  background: bg, border: `3px solid ${border}`, borderRadius: '14px',
                  padding: '0.85rem 0.5rem', fontWeight: 900,
                  fontSize: current.type === 'timbang' ? '1.25rem' : '0.95rem',
                  color, cursor: isAnswered ? 'default' : 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                }}>
                {opt.emoji && <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>{opt.emoji}</span>}
                <span>{language === 'bm' ? opt.label_bm : opt.label_eng}</span>
                {showCorrect && <span style={{ fontSize: '1rem' }}>✓</span>}
                {showWrong   && <span style={{ fontSize: '1rem' }}>✗</span>}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div style={{ marginTop: '0.75rem', textAlign: 'center', fontSize: '0.9rem', fontWeight: 700, color: isCorrect ? '#2E7D32' : '#C62828' }}>
            {isCorrect
              ? (language === 'bm' ? '✓ Betul!' : '✓ Correct!')
              : (language === 'bm' ? `Jawapan: ${answerLabel}` : `Answer: ${answerLabel}`)}
          </div>
        )}
      </div>

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
