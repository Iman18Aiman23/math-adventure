import React, { useState, useCallback, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../../../../utils/soundManager';
import BackButton from '../../../BackButton';

// KSSR Matematik Tahun 1 — Bidang 8: Isi Padu Cecair.
// Three mechanics (12 qs / round, 4 each, shuffled):
//   1. Kenali Tahap  — container at kosong/separuh/penuh; pick the label
//   2. Banding       — two containers, pick mana lebih banyak/sedikit air
//   3. Baca Liter    — container with scale markings; pick the correct litre count

const randInt = (lo, hi) => Math.floor(Math.random() * (hi - lo + 1)) + lo;
const shuffle  = arr => [...arr].sort(() => Math.random() - 0.5);
const pick     = arr => arr[Math.floor(Math.random() * arr.length)];

// ── Container SVG components ────────────────────────────────────────────────

// Simple beaker without scale markings — used for Kenali and Banding
const Beaker = ({ fraction, label, size = 'md' }) => {
  const isSmall = size === 'sm';
  const w = isSmall ? 60 : 80;
  const vH = isSmall ? 90 : 110;
  const cX = isSmall ? 10 : 12;
  const cW = isSmall ? 40 : 56;
  const cY = 10;
  const cH = isSmall ? 65 : 80;
  const waterH  = Math.round(cH * Math.max(0, Math.min(1, fraction)));
  const waterY  = cY + cH - waterH;

  return (
    <svg width={w} height={vH} viewBox={`0 0 ${w} ${vH}`}>
      {/* Water fill */}
      {waterH > 0 && (
        <rect x={cX} y={waterY} width={cW} height={waterH} fill="#42A5F5" opacity="0.75" />
      )}
      {/* Container walls (U-shape, open top) */}
      <path
        d={`M${cX},${cY} L${cX},${cY + cH} L${cX + cW},${cY + cH} L${cX + cW},${cY}`}
        fill="none" stroke="#1565C0" strokeWidth="2.5" strokeLinejoin="round"
      />
      {/* Base */}
      <rect x={cX - 4} y={cY + cH} width={cW + 8} height="5" rx="2.5" fill="#1565C0" />
      {/* Optional label (A/B) */}
      {label && (
        <text x={cX + cW / 2} y={vH - 2} textAnchor="middle" fontSize="11" fontWeight="900" fill="#1565C0">
          {label}
        </text>
      )}
    </svg>
  );
};

// Beaker with litre scale on the right — used for Baca Liter
const BeakerScale = ({ fraction, maxL = 5 }) => {
  const cX = 12; const cW = 54; const cY = 10; const cH = 80;
  const waterH = Math.round(cH * Math.max(0, Math.min(1, fraction)));
  const waterY = cY + cH - waterH;

  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      {waterH > 0 && (
        <rect x={cX} y={waterY} width={cW} height={waterH} fill="#42A5F5" opacity="0.75" />
      )}
      <path
        d={`M${cX},${cY} L${cX},${cY + cH} L${cX + cW},${cY + cH} L${cX + cW},${cY}`}
        fill="none" stroke="#1565C0" strokeWidth="2.5" strokeLinejoin="round"
      />
      {/* Scale ticks */}
      {Array.from({ length: maxL }, (_, i) => {
        const l = i + 1;
        const y = cY + cH - Math.round((cH * l) / maxL);
        return (
          <g key={l}>
            <line x1={cX + cW} y1={y} x2={cX + cW + 8} y2={y} stroke="#0D47A1" strokeWidth="1.5" />
            <text x={cX + cW + 11} y={y + 4} fontSize="9" fontWeight="800" fill="#0D47A1">{l} L</text>
          </g>
        );
      })}
      <rect x={cX - 4} y={cY + cH} width={cW + 8} height="5" rx="2.5" fill="#1565C0" />
    </svg>
  );
};

// ── Data ────────────────────────────────────────────────────────────────────

const LEVELS = [
  { id: 'kosong',  fraction: 0.0, bm: 'Kosong',        eng: 'Empty'     },
  { id: 'separuh', fraction: 0.5, bm: 'Separuh Penuh', eng: 'Half Full' },
  { id: 'penuh',   fraction: 1.0, bm: 'Penuh',         eng: 'Full'      },
];

const BAND_FRACS = [0.15, 0.3, 0.55, 0.75, 1.0];
const LITER_MAX  = 5;

// ── Question generators ─────────────────────────────────────────────────────

function genKenaliQ() {
  const level = pick(LEVELS);
  return {
    type: 'kenali',
    fraction: level.fraction,
    question_bm:  'Air dalam bekas ini ___?',
    question_eng: 'The water in this container is ___?',
    options: shuffle(LEVELS.map(l => ({ key: l.id, label_bm: l.bm, label_eng: l.eng }))),
    answer: level.id,
  };
}

function genBandingQ() {
  const [fracA, fracB] = shuffle(BAND_FRACS);
  const askMore = Math.random() < 0.5;
  const answer = askMore ? (fracA > fracB ? 'A' : 'B') : (fracA < fracB ? 'A' : 'B');
  return {
    type: 'banding',
    fracA, fracB,
    question_bm:  askMore ? 'Mana lebih banyak air?' : 'Mana lebih sedikit air?',
    question_eng: askMore ? 'Which has more water?'  : 'Which has less water?',
    options: [
      { key: 'A', label_bm: 'Bekas A', label_eng: 'Container A' },
      { key: 'B', label_bm: 'Bekas B', label_eng: 'Container B' },
    ],
    answer,
  };
}

function genBacaLiterQ() {
  const liters = randInt(1, LITER_MAX);
  const fraction = liters / LITER_MAX;
  const dist = new Set();
  while (dist.size < 3) {
    const d = randInt(1, LITER_MAX);
    if (d !== liters) dist.add(d);
  }
  return {
    type: 'baca-liter',
    liters, fraction,
    question_bm:  'Berapa liter air dalam bekas ini?',
    question_eng: 'How many litres of water are in this container?',
    options: shuffle([liters, ...[...dist]]).map(v => ({
      key: String(v), label_bm: `${v} liter`, label_eng: `${v} litre${v !== 1 ? 's' : ''}`,
    })),
    answer: String(liters),
  };
}

function buildQuestions() {
  const qs = [];
  for (let i = 0; i < 4; i++) qs.push(genKenaliQ());
  for (let i = 0; i < 4; i++) qs.push(genBandingQ());
  for (let i = 0; i < 4; i++) qs.push(genBacaLiterQ());
  return shuffle(qs);
}

const TYPE_META = {
  kenali:      { bm: 'Kenali Tahap',  eng: 'Identify Level', emoji: '💧' },
  banding:     { bm: 'Banding',       eng: 'Compare',        emoji: '🔀' },
  'baca-liter':{ bm: 'Baca Liter',    eng: 'Read Litres',    emoji: '📏' },
};
const emptyStats = () => ({
  kenali:      { c: 0, t: 0 },
  banding:     { c: 0, t: 0 },
  'baca-liter':{ c: 0, t: 0 },
});

// ── Component ───────────────────────────────────────────────────────────────

export default function IsiPaduCecair({ onBack, language = 'bm' }) {
  const [questions,  setQuestions]  = useState(() => buildQuestions());
  const [index,      setIndex]      = useState(0);
  const [selected,   setSelected]   = useState(null);
  const [score,      setScore]      = useState(0);
  const [streak,     setStreak]     = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [stats,      setStats]      = useState(emptyStats);
  const [complete,   setComplete]   = useState(false);

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
          <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>💧</div>
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
    const opt = current.options.find(o => o.key === current.answer);
    return opt ? (language === 'bm' ? opt.label_bm : opt.label_eng) : current.answer;
  })();

  const gridCols = current.type === 'kenali' ? '1fr 1fr 1fr'
                 : current.type === 'banding' ? '1fr 1fr'
                 : '1fr 1fr';

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FFE9CC', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />

      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div>
            <h1 style={{ color: '#FF9600', fontSize: '1.4rem', fontWeight: 900, marginBottom: '0.1rem' }}>
              💧 {language === 'bm' ? 'Isi Padu Cecair' : 'Liquid Volume'}
            </h1>
            <p style={{ color: '#888', fontSize: '0.82rem' }}>
              {language === 'bm' ? 'Penuh, separuh & liter' : 'Full, half & litres'}
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

          {/* Kenali: single beaker */}
          {current.type === 'kenali' && (
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
              <Beaker fraction={current.fraction} size="md" />
            </div>
          )}

          {/* Banding: two beakers side by side */}
          {current.type === 'banding' && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '0.75rem', alignItems: 'flex-end' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <Beaker fraction={current.fracA} label="A" size="sm" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <Beaker fraction={current.fracB} label="B" size="sm" />
              </div>
            </div>
          )}

          {/* Baca Liter: beaker with scale */}
          {current.type === 'baca-liter' && (
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
              <BeakerScale fraction={current.fraction} maxL={LITER_MAX} />
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
                  fontSize: current.type === 'baca-liter' ? '1.2rem' : '0.95rem',
                  color, cursor: isAnswered ? 'default' : 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                }}>
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
