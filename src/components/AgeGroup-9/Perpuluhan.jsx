import React, { useState, useCallback, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../utils/soundManager';
import BackButton from '../BackButton';

// KSSR Matematik Tahun 3 — Nombor dan Operasi
// Perpuluhan: tukar pecahan↔perpuluhan, bandingkan, tambah (persepuluhan)

const C = { bg: '#EDD9FF', primary: '#9C27B0', primaryDark: '#6A1B9A', light: '#F3E5F5' };

function randFrom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// Render a tenths fraction inline (n/10)
function TenthsFrac({ n, color = '#333', size = '2.4rem' }) {
  return (
    <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', verticalAlign: 'middle', lineHeight: 1, gap: '1px' }}>
      <span style={{ fontSize: size, fontWeight: 800, color, lineHeight: 1 }}>{n}</span>
      <span style={{ width: '1.5em', height: '2.5px', background: color, display: 'block', borderRadius: '2px' }} />
      <span style={{ fontSize: size, fontWeight: 800, color, lineHeight: 1 }}>10</span>
    </span>
  );
}

function generateQuestion(mechanic) {
  if (mechanic === 'tukar') {
    const n = Math.floor(Math.random() * 9) + 1; // 1–9
    const toDecimal = Math.random() < 0.5;

    if (toDecimal) {
      // Show n/10, pick the decimal 0.n
      const correct = `0.${n}`;
      const distractors = [`0.0${n}`, `${n}.0`, `0.${n === 9 ? 8 : n + 1}`]
        .filter(x => x !== correct);
      return {
        type: 'tukar', sub: 'fracToDec', n,
        answer: correct,
        options: [correct, ...distractors].slice(0, 4).sort(() => Math.random() - 0.5),
        q_bm: 'Tukar pecahan ini kepada perpuluhan:',
        q_eng: 'Convert this fraction to a decimal:',
        exp_bm: `${n}/10 = 0.${n}`,
      };
    } else {
      // Show 0.n, find the numerator for ?/10
      const correct = String(n);
      const pool = [n - 2, n - 1, n + 1, n + 2].filter(x => x >= 1 && x <= 9 && x !== n);
      const used = new Set([n]);
      const opts = [correct];
      while (opts.length < 4 && pool.length > 0) {
        const v = pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
        if (!used.has(v)) { used.add(v); opts.push(String(v)); }
      }
      while (opts.length < 4) {
        let v;
        do { v = Math.floor(Math.random() * 9) + 1; } while (used.has(v));
        used.add(v); opts.push(String(v));
      }
      return {
        type: 'tukar', sub: 'decToFrac', n,
        answer: correct,
        options: opts.sort(() => Math.random() - 0.5),
        q_bm: `Cari nilai yang hilang: 0.${n} = ?/10`,
        q_eng: `Find the missing value: 0.${n} = ?/10`,
        exp_bm: `0.${n} = ${n}/10`,
      };
    }
  }

  if (mechanic === 'bandingkan') {
    const nums = new Set();
    while (nums.size < 4) nums.add(Math.floor(Math.random() * 9) + 1);
    const numArr = [...nums];
    const correct = Math.max(...numArr);
    return {
      type: 'bandingkan', nums: numArr,
      answer: `0.${correct}`,
      options: numArr.map(n => `0.${n}`).sort(() => Math.random() - 0.5),
      q_bm: 'Pilih perpuluhan yang paling besar:',
      q_eng: 'Pick the largest decimal:',
      exp_bm: `0.${correct} adalah yang paling besar (digit persepuluhan terbesar).`,
    };
  }

  // tambah — tenths only, sum ≤ 0.9
  const a = Math.floor(Math.random() * 8) + 1;        // 1–8
  const b = Math.floor(Math.random() * (9 - a)) + 1;  // 1 to (9-a)
  const sum = a + b;
  const correct = `0.${sum}`;
  const used = new Set([sum]);
  const distractors = [];
  while (distractors.length < 3) {
    let n;
    do { n = Math.floor(Math.random() * 9) + 1; } while (used.has(n));
    used.add(n); distractors.push(`0.${n}`);
  }
  return {
    type: 'tambah', a, b, sum,
    answer: correct,
    options: [correct, ...distractors].sort(() => Math.random() - 0.5),
    q_bm: 'Berapakah hasil tambahnya?',
    q_eng: 'What is the sum?',
    exp_bm: `0.${a} + 0.${b} = 0.${sum}`,
  };
}

const TOTAL = 12;
const PER_M = 4;

export default function Perpuluhan({ onBack, language = 'bm' }) {
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [stats, setStats] = useState({
    tukar:      { c: 0, t: 0 },
    bandingkan: { c: 0, t: 0 },
    tambah:     { c: 0, t: 0 },
  });

  const questions = useMemo(() => {
    const qs = [];
    ['tukar', 'bandingkan', 'tambah'].forEach(m => {
      for (let i = 0; i < PER_M; i++) qs.push(generateQuestion(m));
    });
    return qs.sort(() => Math.random() - 0.5);
  }, []);

  const q = questions[qIdx];
  const isCorrect = selected === q.answer;

  const handleSelect = useCallback((opt) => {
    if (answered) return;
    playHoverSound();
    setSelected(opt);
    const ok = opt === q.answer;
    if (ok) { playSound('correct'); setScore(s => s + 10); confetti({ particleCount: 40, spread: 55 }); }
    else playSound('incorrect');
    setStats(prev => ({
      ...prev,
      [q.type]: { c: prev[q.type].c + (ok ? 1 : 0), t: prev[q.type].t + 1 },
    }));
    setAnswered(true);
  }, [answered, q]);

  const handleNext = useCallback(() => {
    if (!answered) return;
    if (qIdx < questions.length - 1) {
      setQIdx(i => i + 1); setSelected(null); setAnswered(false);
    } else {
      playSound('levelup'); confetti({ particleCount: 120, spread: 70 }); setDone(true);
    }
  }, [answered, qIdx, questions.length]);

  const handleReset  = useCallback(() => { setSelected(null); setAnswered(false); }, []);
  const handleReplay = useCallback(() => {
    setQIdx(0); setSelected(null); setAnswered(false); setScore(0); setDone(false);
    setStats({ tukar: { c: 0, t: 0 }, bandingkan: { c: 0, t: 0 }, tambah: { c: 0, t: 0 } });
  }, []);

  const optStyle = (opt) => {
    if (!answered) return { bg: '#FFF', border: C.primary, color: '#333' };
    if (opt === q.answer) return { bg: '#4CAF50', border: '#388E3C', color: 'white' };
    if (opt === selected) return { bg: '#FF6B6B', border: '#D32F2F', color: 'white' };
    return { bg: '#F5F5F5', border: '#DDD', color: '#AAA' };
  };

  if (done) {
    return (
      <div style={{ minHeight: '100%', background: C.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🔟</div>
        <h2 style={{ color: C.primary, fontSize: '2rem', marginBottom: '0.5rem' }}>
          {language === 'bm' ? 'Tahniah!' : 'Well Done!'}
        </h2>
        <p style={{ fontSize: '1.4rem', color: '#555', marginBottom: '1.5rem' }}>
          {language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/{TOTAL * 10}
        </p>
        <div style={{ background: '#FFF', borderRadius: '12px', padding: '1rem', marginBottom: '2rem', maxWidth: '400px', width: '100%' }}>
          <h3 style={{ color: C.primary, fontSize: '1rem', marginBottom: '0.8rem', textAlign: 'center' }}>
            {language === 'bm' ? 'Keputusan Setiap Jenis' : 'Results by Type'}
          </h3>
          {[
            ['tukar',      '🔄 Tukar Perpuluhan'],
            ['bandingkan', '⚖️ Bandingkan'],
            ['tambah',     '➕ Tambah Perpuluhan'],
          ].map(([type, label]) => {
            const s = stats[type];
            const pct = s.t > 0 ? Math.round((s.c / s.t) * 100) : 0;
            return (
              <div key={type} style={{ marginBottom: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                  <span style={{ fontWeight: 600, color: '#333' }}>{label}</span>
                  <span style={{ color: pct >= 75 ? '#4CAF50' : '#FF6B6B', fontWeight: 700 }}>{s.c}/{s.t} ({pct}%)</span>
                </div>
                <div style={{ background: '#E0E0E0', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ background: pct >= 75 ? '#4CAF50' : '#FF6B6B', height: '100%', width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={handleReplay}
            style={{ padding: '0.75rem 1.5rem', background: '#E0E0E0', color: '#333', border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>
            {language === 'bm' ? 'Main Semula' : 'Play Again'}
          </button>
          <button onClick={onBack}
            style={{ padding: '0.75rem 1.5rem', background: C.primary, color: 'white', border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>
            {language === 'bm' ? 'Kembali' : 'Back'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.bg, overflow: 'hidden' }}>
      <BackButton onClick={onBack} />

      {/* compact progress bar */}
      <div style={{ flexShrink: 0, padding: '3.2rem 1rem 0.4rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.45rem 0.9rem', background: `${C.primary}18`, borderRadius: '10px' }}>
          <span style={{ color: '#555', fontSize: '0.85rem', fontWeight: 600 }}>
            {language === 'bm' ? `Soalan ${qIdx + 1} / ${TOTAL}` : `Q ${qIdx + 1} / ${TOTAL}`}
          </span>
          <span style={{ fontWeight: 800, color: C.primary, fontSize: '0.9rem' }}>⭐ {score}</span>
        </div>
      </div>

      {/* card fills remaining space — no scroll */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0.4rem 1rem 0.4rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box', minHeight: 0 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#FFF', borderRadius: '14px', border: `2px solid ${C.primary}`, padding: '0.7rem 1rem', minHeight: 0 }}>

          {/* type badge */}
          <div style={{ flexShrink: 0, alignSelf: 'flex-start', background: C.light, color: C.primary, padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700, marginBottom: '0.45rem', textTransform: 'uppercase' }}>
            {q.type === 'tukar'      && '🔄 Tukar Perpuluhan'}
            {q.type === 'bandingkan' && '⚖️ Bandingkan'}
            {q.type === 'tambah'     && '➕ Tambah Perpuluhan'}
          </div>

          {/* visual area */}
          {q.type === 'tukar' && q.sub === 'fracToDec' && (
            <div style={{ flexShrink: 0, background: C.light, borderRadius: '8px', padding: '0.75rem', marginBottom: '0.45rem', textAlign: 'center' }}>
              <TenthsFrac n={q.n} color={C.primary} size="2.5rem" />
            </div>
          )}

          {q.type === 'tukar' && q.sub === 'decToFrac' && (
            <div style={{ flexShrink: 0, background: C.light, borderRadius: '8px', padding: '0.75rem', marginBottom: '0.45rem', textAlign: 'center' }}>
              <span style={{ fontSize: '3rem', fontWeight: 800, color: C.primary }}>0.{q.n}</span>
            </div>
          )}

          {q.type === 'bandingkan' && (
            <div style={{ flexShrink: 0, background: C.light, borderRadius: '8px', padding: '0.6rem 0.5rem', marginBottom: '0.45rem' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.65rem' }}>
                {q.options.map((opt, i) => (
                  <div key={i} style={{ background: '#fff', borderRadius: '8px', padding: '0.4rem 0.6rem', border: `2px solid ${C.primary}55`, minWidth: '46px', textAlign: 'center' }}>
                    <span style={{ fontSize: '1.15rem', fontWeight: 800, color: C.primary }}>{opt}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {q.type === 'tambah' && (
            <div style={{ flexShrink: 0, background: C.light, borderRadius: '8px', padding: '0.75rem', marginBottom: '0.45rem', textAlign: 'center' }}>
              <span style={{ fontSize: '2.6rem', fontWeight: 800, color: '#E53935' }}>0.{q.a}</span>
              <span style={{ fontSize: '2.2rem', fontWeight: 800, color: '#555', margin: '0 0.3rem' }}>+</span>
              <span style={{ fontSize: '2.6rem', fontWeight: 800, color: '#2E7D32' }}>0.{q.b}</span>
              <span style={{ fontSize: '2.2rem', fontWeight: 800, color: '#555', margin: '0 0.3rem' }}>=</span>
              <span style={{ fontSize: '2.6rem', fontWeight: 800, color: C.primary }}>?</span>
            </div>
          )}

          {/* question text */}
          <div style={{ flexShrink: 0, background: '#FFF9C4', borderLeft: '4px solid #FBC02D', padding: '0.55rem 0.75rem', marginBottom: '0.45rem', borderRadius: '6px' }}>
            <p style={{ fontSize: '0.92rem', color: '#333', margin: 0, fontWeight: 600, lineHeight: 1.4 }}>
              {language === 'bm' ? q.q_bm : q.q_eng}
            </p>
          </div>

          {/* options — flex:1, fill remaining height */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.35rem', minHeight: 0 }}>
            {q.options.map((opt, i) => {
              const { bg, border, color } = optStyle(opt);
              return (
                <button key={i} onClick={() => handleSelect(opt)} disabled={answered}
                  style={{ flex: 1, minHeight: 40, padding: '0 0.85rem', background: bg, color, border: `2px solid ${border}`, borderRadius: '10px', cursor: answered ? 'default' : 'pointer', fontWeight: 700, fontSize: '1.1rem', textAlign: 'center', transition: 'background 0.15s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {opt}
                </button>
              );
            })}
          </div>

          {/* feedback */}
          {answered && (
            <div style={{ flexShrink: 0, padding: '0.55rem 0.75rem', background: isCorrect ? '#D4EDDA' : '#F8D7DA', color: isCorrect ? '#155724' : '#721C24', borderRadius: '8px', fontWeight: 700, marginTop: '0.35rem' }}>
              <div style={{ marginBottom: '0.15rem', fontSize: '0.88rem' }}>
                {isCorrect
                  ? (language === 'bm' ? '✅ Betul!' : '✅ Correct!')
                  : (language === 'bm' ? `❌ Tidak betul. Jawapan: ${q.answer}` : `❌ Wrong. Answer: ${q.answer}`)}
              </div>
              <div style={{ fontSize: '0.78rem', fontWeight: 400, opacity: 0.9 }}>{q.exp_bm}</div>
            </div>
          )}
        </div>
      </div>

      {/* footer */}
      <div style={{ flexShrink: 0, background: C.bg, borderTop: `2px solid ${C.primary}33`, padding: '0.6rem 1rem', display: 'flex', gap: '0.75rem' }}>
        <button onClick={handleReset}
          style={{ flex: 1, padding: '0.65rem', background: '#E0E0E0', color: '#555', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
          <RefreshCw size={16} />
          {language === 'bm' ? 'Semula' : 'Reset'}
        </button>
        <button onClick={handleNext} disabled={!answered}
          style={{ flex: 1, padding: '0.65rem', background: answered ? C.primary : `${C.primary}66`, color: 'white', border: 'none', borderRadius: '10px', cursor: answered ? 'pointer' : 'not-allowed', fontWeight: 'bold', fontSize: '1rem', boxShadow: answered ? `0 4px 0 ${C.primaryDark}` : 'none' }}>
          {qIdx < TOTAL - 1
            ? (language === 'bm' ? 'Soalan Seterusnya →' : 'Next Question →')
            : (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')}
        </button>
      </div>
    </div>
  );
}
