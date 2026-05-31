import React, { useState, useCallback, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../utils/soundManager';
import BackButton from '../BackButton';

// KSSR Matematik Tahun 3 — Nombor dan Operasi
// Nombor hingga 10 000: sebut nombor, nilai tempat, bandingkan

const C = { bg: '#EDD9FF', primary: '#9C27B0', primaryDark: '#6A1B9A', light: '#F3E5F5' };

const ONES = ['', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'lapan', 'sembilan'];

function spellNumber(n) {
  if (n === 0) return 'sifar';
  if (n < 10) return ONES[n];
  if (n === 10) return 'sepuluh';
  if (n === 11) return 'sebelas';
  if (n < 20) return `${ONES[n - 10]} belas`;
  if (n < 100) {
    const t = Math.floor(n / 10), r = n % 10;
    return r === 0 ? `${ONES[t]} puluh` : `${ONES[t]} puluh ${ONES[r]}`;
  }
  if (n < 1000) {
    const h = Math.floor(n / 100), r = n % 100;
    const hp = h === 1 ? 'seratus' : `${ONES[h]} ratus`;
    return r === 0 ? hp : `${hp} ${spellNumber(r)}`;
  }
  // 1 000–9 999
  const th = Math.floor(n / 1000), r = n % 1000;
  const tp = th === 1 ? 'seribu' : `${ONES[th]} ribu`;
  return r === 0 ? tp : `${tp} ${spellNumber(r)}`;
}

// KSSR format: thousands separated by space (e.g. "2 345")
const fmt = (n) => n >= 1000
  ? `${Math.floor(n / 1000)} ${String(n % 1000).padStart(3, '0')}`
  : String(n);

// Generate a random 4-digit number 1000–9999
function rand4() { return Math.floor(Math.random() * 9000) + 1000; }

// Generate a nearby number (one digit changed) for plausible distractors
function nearbyNum(n) {
  const d = [Math.floor(n / 1000), Math.floor((n % 1000) / 100), Math.floor((n % 100) / 10), n % 10];
  const pos = Math.floor(Math.random() * 4);
  let nd;
  // thousands digit: 1–9 only; others: 0–9
  do {
    nd = pos === 0
      ? Math.floor(Math.random() * 9) + 1
      : Math.floor(Math.random() * 10);
  } while (nd === d[pos]);
  const c = [...d];
  c[pos] = nd;
  return c[0] * 1000 + c[1] * 100 + c[2] * 10 + c[3];
}

const PLACES = ['ribu', 'ratus', 'puluh', 'sa'];

function generateQuestion(mechanic) {
  if (mechanic === 'sebut') {
    const num = rand4();
    const correct = spellNumber(num);
    const used = new Set([num]);
    const distractors = [];
    while (distractors.length < 3) {
      const cand = nearbyNum(num);
      if (!used.has(cand)) { used.add(cand); distractors.push(spellNumber(cand)); }
    }
    return {
      type: 'sebut', num,
      options: [correct, ...distractors].sort(() => Math.random() - 0.5),
      answer: correct,
      q_bm: `Apakah ejaan nombor ${fmt(num)}?`,
      q_eng: `How do you spell ${fmt(num)}?`,
      exp_bm: `${fmt(num)} = ${correct}`,
    };
  }

  if (mechanic === 'tempat') {
    const num = rand4();
    const digits = {
      ribu:  Math.floor(num / 1000),
      ratus: Math.floor((num % 1000) / 100),
      puluh: Math.floor((num % 100) / 10),
      sa:    num % 10,
    };
    const place = PLACES[Math.floor(Math.random() * 4)];
    const correct = `${digits[place]} ${place}`;
    const used = new Set([correct]);
    const opts = [correct];
    while (opts.length < 4) {
      const d = Math.floor(Math.random() * 10);
      const p = PLACES[Math.floor(Math.random() * 4)];
      const cand = `${d} ${p}`;
      if (!used.has(cand)) { used.add(cand); opts.push(cand); }
    }
    return {
      type: 'tempat', num, digits, place,
      options: opts.sort(() => Math.random() - 0.5),
      answer: correct,
      q_bm: `Apakah nilai digit dalam tempat ${place} bagi nombor ${fmt(num)}?`,
      q_eng: `What is the ${place} digit value of ${fmt(num)}?`,
      exp_bm: `${fmt(num)}: ${digits.ribu} ribu, ${digits.ratus} ratus, ${digits.puluh} puluh, ${digits.sa} sa.`,
    };
  }

  // banding (compare)
  const a = rand4();
  let b = rand4();
  while (b === a) b = rand4();
  const correct = a > b ? `${fmt(a)} > ${fmt(b)}` : `${fmt(a)} < ${fmt(b)}`;
  const options = [
    `${fmt(a)} > ${fmt(b)}`,
    `${fmt(a)} < ${fmt(b)}`,
    `${fmt(a)} = ${fmt(b)}`,
  ].sort(() => Math.random() - 0.5);
  return {
    type: 'banding', a, b,
    options, answer: correct,
    q_bm: 'Bandingkan kedua-dua nombor ini:',
    q_eng: 'Compare these two numbers:',
    exp_bm: `${a > b ? fmt(a) : fmt(b)} ialah lebih besar.`,
  };
}

const TOTAL = 12;
const PER_M = 4;

export default function Nombor10000({ onBack, language = 'bm' }) {
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [stats, setStats] = useState({
    sebut:   { c: 0, t: 0 },
    tempat:  { c: 0, t: 0 },
    banding: { c: 0, t: 0 },
  });

  const questions = useMemo(() => {
    const qs = [];
    ['sebut', 'tempat', 'banding'].forEach(m => {
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
      setQIdx(i => i + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      playSound('levelup');
      confetti({ particleCount: 120, spread: 70 });
      setDone(true);
    }
  }, [answered, qIdx, questions.length]);

  const handleReset   = useCallback(() => { setSelected(null); setAnswered(false); }, []);
  const handleReplay  = useCallback(() => {
    setQIdx(0); setSelected(null); setAnswered(false);
    setScore(0); setDone(false);
    setStats({ sebut: { c: 0, t: 0 }, tempat: { c: 0, t: 0 }, banding: { c: 0, t: 0 } });
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
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🔢</div>
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
            ['sebut',   '📖 Sebut Nombor'],
            ['tempat',  '🔢 Nilai Tempat'],
            ['banding', '⚖️ Bandingkan'],
          ].map(([type, label]) => {
            const s = stats[type];
            const pct = s.t > 0 ? Math.round((s.c / s.t) * 100) : 0;
            return (
              <div key={type} style={{ marginBottom: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                  <span style={{ fontWeight: 600, color: '#333' }}>{label}</span>
                  <span style={{ color: pct >= 75 ? '#4CAF50' : '#FF6B6B', fontWeight: 700 }}>
                    {s.c}/{s.t} ({pct}%)
                  </span>
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

      {/* compact progress bar — no title, saves vertical space */}
      <div style={{ flexShrink: 0, padding: '3.2rem 1rem 0.4rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.45rem 0.9rem', background: `${C.primary}18`, borderRadius: '10px' }}>
          <span style={{ color: '#555', fontSize: '0.85rem', fontWeight: 600 }}>
            {language === 'bm' ? `Soalan ${qIdx + 1} / ${TOTAL}` : `Q ${qIdx + 1} / ${TOTAL}`}
          </span>
          <span style={{ fontWeight: 800, color: C.primary, fontSize: '0.9rem' }}>⭐ {score}</span>
        </div>
      </div>

      {/* card fills all remaining space — no scroll */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0.4rem 1rem 0.4rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box', minHeight: 0 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#FFF', borderRadius: '14px', border: `2px solid ${C.primary}`, padding: '0.7rem 1rem', minHeight: 0 }}>

          {/* type badge */}
          <div style={{ flexShrink: 0, alignSelf: 'flex-start', background: C.light, color: C.primary, padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700, marginBottom: '0.45rem', textTransform: 'uppercase' }}>
            {q.type === 'sebut'   && '📖 Sebut Nombor'}
            {q.type === 'tempat'  && '🔢 Nilai Tempat'}
            {q.type === 'banding' && '⚖️ Bandingkan'}
          </div>

          {/* visual area */}
          {q.type === 'sebut' && (
            <div style={{ flexShrink: 0, background: C.light, borderRadius: '8px', padding: '0.8rem', marginBottom: '0.45rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: C.primary }}>{fmt(q.num)}</div>
            </div>
          )}

          {q.type === 'tempat' && (
            <div style={{ flexShrink: 0, background: C.light, borderRadius: '8px', padding: '0.65rem', marginBottom: '0.45rem' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem' }}>
                {PLACES.map(p => (
                  <div key={p} style={{
                    background: p === q.place ? C.primary : 'white',
                    color:      p === q.place ? 'white'   : C.primary,
                    borderRadius: '8px', padding: '0.4rem 0.5rem',
                    textAlign: 'center', minWidth: '52px',
                    border: `2px solid ${C.primary}`,
                  }}>
                    <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>{q.digits[p]}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {q.type === 'banding' && (
            <div style={{ flexShrink: 0, background: C.light, borderRadius: '8px', padding: '0.8rem', marginBottom: '0.45rem', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#E53935' }}>{fmt(q.a)}</div>
              <div style={{ fontSize: '1.8rem', color: C.primary }}>?</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#2E7D32' }}>{fmt(q.b)}</div>
            </div>
          )}

          {/* question text */}
          <div style={{ flexShrink: 0, background: '#FFF9C4', borderLeft: '4px solid #FBC02D', padding: '0.55rem 0.75rem', marginBottom: '0.45rem', borderRadius: '6px' }}>
            <p style={{ fontSize: '0.92rem', color: '#333', margin: 0, fontWeight: 600, lineHeight: 1.4 }}>
              {language === 'bm' ? q.q_bm : q.q_eng}
            </p>
          </div>

          {/* options — flex:1 so they fill remaining height evenly */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.35rem', minHeight: 0 }}>
            {q.options.map((opt, i) => {
              const { bg, border, color } = optStyle(opt);
              return (
                <button key={i} onClick={() => handleSelect(opt)} disabled={answered}
                  style={{ flex: 1, minHeight: 40, padding: '0 0.85rem', background: bg, color, border: `2px solid ${border}`, borderRadius: '10px', cursor: answered ? 'default' : 'pointer', fontWeight: 700, fontSize: '0.92rem', textAlign: 'left', transition: 'background 0.15s, border-color 0.15s', lineHeight: 1.3, display: 'flex', alignItems: 'center' }}>
                  {opt}
                </button>
              );
            })}
          </div>

          {/* feedback — flexShrink:0 so options shrink to make room */}
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
