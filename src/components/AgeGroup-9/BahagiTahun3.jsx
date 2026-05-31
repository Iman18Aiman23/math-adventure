import React, { useState, useCallback, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../utils/soundManager';
import BackButton from '../BackButton';

// KSSR Matematik Tahun 3 — Nombor dan Operasi
// Bahagi ÷2–÷9: bahagi terus, hasil bahagi hilang, masalah cerita

const C = { bg: '#EDD9FF', primary: '#9C27B0', primaryDark: '#6A1B9A', light: '#F3E5F5' };

const DIVISORS    = [2, 3, 4, 5, 6, 7, 8, 9];
const QUOTIENTS   = [2, 3, 4, 5, 6, 7, 8, 9];

function randFrom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function quotientDistr(correct, divisor) {
  const pool = [...new Set([
    correct - 1, correct + 1, correct - 2, correct + 2,
    correct + divisor, correct - divisor,
  ].filter(x => x > 0 && x !== correct))];
  const result = [];
  while (result.length < 3 && pool.length > 0) {
    result.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
  }
  while (result.length < 3) {
    const c = Math.floor(Math.random() * 8) + 2;
    if (c !== correct && !result.includes(c)) result.push(c);
  }
  return result;
}

function dividendDistr(correct, divisor) {
  const pool = [...new Set([
    correct - divisor, correct + divisor,
    correct - divisor * 2, correct + divisor * 2,
  ].filter(x => x > 0 && x !== correct))];
  const result = [];
  while (result.length < 3 && pool.length > 0) {
    result.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
  }
  while (result.length < 3) {
    const c = Math.floor(Math.random() * 72) + 4;
    if (c !== correct && !result.includes(c)) result.push(c);
  }
  return result;
}

const STORIES = [
  { dividend: 48, divisor: 6, icon: '🍊', bm: 'Ibu membeli 48 biji oren. Oren itu dibahagi sama rata kepada 6 orang anak.', eng: 'Mum bought 48 oranges shared equally among 6 children.' },
  { dividend: 63, divisor: 7, icon: '🍬', bm: 'Cikgu mempunyai 63 biji gula-gula untuk dibahagikan kepada 7 kumpulan.', eng: 'Teacher has 63 sweets to share among 7 groups.' },
  { dividend: 72, divisor: 8, icon: '📚', bm: 'Terdapat 72 buku dalam 8 rak. Setiap rak ada buku yang sama banyak.', eng: 'There are 72 books in 8 shelves with equal amounts each.' },
  { dividend: 54, divisor: 9, icon: '🌸', bm: 'Seorang peniaga menyusun 54 kuntum bunga ke dalam 9 pasu.', eng: 'A trader arranges 54 flowers equally into 9 vases.' },
  { dividend: 42, divisor: 6, icon: '🖊️', bm: 'Pak Ali mempunyai 42 batang pensel untuk diberikan kepada 6 murid.', eng: 'Pak Ali has 42 pencils to give to 6 students.' },
  { dividend: 56, divisor: 7, icon: '🍕', bm: 'Ayah memotong 56 hirisan pizza untuk 7 orang tetamu.', eng: 'Dad cuts 56 pizza slices for 7 guests.' },
  { dividend: 64, divisor: 8, icon: '⚽', bm: 'Sebanyak 64 bola dibahagikan sama rata kepada 8 pasukan.', eng: '64 balls are shared equally among 8 teams.' },
  { dividend: 45, divisor: 9, icon: '🍩', bm: 'Terdapat 45 biji donut untuk dibahagikan kepada 9 orang.', eng: 'There are 45 donuts to share among 9 people.' },
];

function generateQuestion(mechanic, usedStories) {
  if (mechanic === 'bahagi') {
    const divisor  = randFrom(DIVISORS);
    const quotient = randFrom(QUOTIENTS);
    const dividend = divisor * quotient;
    return {
      type: 'bahagi', dividend, divisor, answer: quotient,
      options: [quotient, ...quotientDistr(quotient, divisor)].sort(() => Math.random() - 0.5),
      q_bm: `Berapakah hasil bahagi ${dividend} ÷ ${divisor}?`,
      q_eng: `What is ${dividend} ÷ ${divisor}?`,
      exp_bm: `${dividend} ÷ ${divisor} = ${quotient}`,
    };
  }

  if (mechanic === 'dividend') {
    const divisor  = randFrom(DIVISORS);
    const quotient = randFrom(QUOTIENTS);
    const dividend = divisor * quotient;
    return {
      type: 'dividend', dividend, divisor, quotient, answer: dividend,
      options: [dividend, ...dividendDistr(dividend, divisor)].sort(() => Math.random() - 0.5),
      q_bm: `Cari nombor yang hilang: ? ÷ ${divisor} = ${quotient}`,
      q_eng: `Find the missing number: ? ÷ ${divisor} = ${quotient}`,
      exp_bm: `${dividend} ÷ ${divisor} = ${quotient}`,
    };
  }

  // cerita
  const available = STORIES.map((s, i) => ({ s, i })).filter(({ i }) => !usedStories.has(i));
  const pool = available.length > 0 ? available : STORIES.map((s, i) => ({ s, i }));
  const { s: story, i: idx } = pool[Math.floor(Math.random() * pool.length)];
  usedStories.add(idx);
  const answer = story.dividend / story.divisor;
  return {
    type: 'cerita', story, answer,
    options: [answer, ...quotientDistr(answer, story.divisor)].sort(() => Math.random() - 0.5),
    q_bm: 'Berapakah jumlah setiap bahagian?',
    q_eng: 'How many in each share?',
    exp_bm: `${story.dividend} ÷ ${story.divisor} = ${answer}`,
  };
}

const TOTAL = 12;
const PER_M = 4;

export default function BahagiTahun3({ onBack, language = 'bm' }) {
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [stats, setStats] = useState({
    bahagi:   { c: 0, t: 0 },
    dividend: { c: 0, t: 0 },
    cerita:   { c: 0, t: 0 },
  });

  const questions = useMemo(() => {
    const qs = [];
    const usedStories = new Set();
    ['bahagi', 'dividend', 'cerita'].forEach(m => {
      for (let i = 0; i < PER_M; i++) qs.push(generateQuestion(m, usedStories));
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
    setStats({ bahagi: { c: 0, t: 0 }, dividend: { c: 0, t: 0 }, cerita: { c: 0, t: 0 } });
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
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>➗</div>
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
            ['bahagi',   '➗ Bahagi Terus'],
            ['dividend', '❓ Nombor Hilang'],
            ['cerita',   '📖 Masalah Cerita'],
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
            {q.type === 'bahagi'   && '➗ Bahagi Terus'}
            {q.type === 'dividend' && '❓ Nombor Hilang'}
            {q.type === 'cerita'   && '📖 Masalah Cerita'}
          </div>

          {/* visual area */}
          {q.type === 'bahagi' && (
            <div style={{ flexShrink: 0, background: C.light, borderRadius: '8px', padding: '0.75rem', marginBottom: '0.45rem', textAlign: 'center' }}>
              <span style={{ fontSize: '2.8rem', fontWeight: 800, color: '#E53935' }}>{q.dividend}</span>
              <span style={{ fontSize: '2.3rem', fontWeight: 800, color: '#555', margin: '0 0.3rem' }}>÷</span>
              <span style={{ fontSize: '2.8rem', fontWeight: 800, color: '#2E7D32' }}>{q.divisor}</span>
              <span style={{ fontSize: '2.3rem', fontWeight: 800, color: '#555', margin: '0 0.3rem' }}>=</span>
              <span style={{ fontSize: '2.8rem', fontWeight: 800, color: C.primary }}>?</span>
            </div>
          )}

          {q.type === 'dividend' && (
            <div style={{ flexShrink: 0, background: C.light, borderRadius: '8px', padding: '0.75rem', marginBottom: '0.45rem', textAlign: 'center' }}>
              <span style={{ fontSize: '2.8rem', fontWeight: 800, color: C.primary }}>?</span>
              <span style={{ fontSize: '2.3rem', fontWeight: 800, color: '#555', margin: '0 0.3rem' }}>÷</span>
              <span style={{ fontSize: '2.8rem', fontWeight: 800, color: '#2E7D32' }}>{q.divisor}</span>
              <span style={{ fontSize: '2.3rem', fontWeight: 800, color: '#555', margin: '0 0.3rem' }}>=</span>
              <span style={{ fontSize: '2.8rem', fontWeight: 800, color: '#555' }}>{q.quotient}</span>
            </div>
          )}

          {q.type === 'cerita' && (
            <div style={{ flexShrink: 0, background: C.light, borderRadius: '8px', padding: '0.65rem 0.85rem', marginBottom: '0.45rem', display: 'flex', gap: '0.55rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '1.7rem', lineHeight: 1.2, flexShrink: 0 }}>{q.story.icon}</span>
              <p style={{ fontSize: '0.88rem', color: '#333', margin: 0, lineHeight: 1.5, fontWeight: 500 }}>
                {language === 'bm' ? q.story.bm : q.story.eng}
              </p>
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
                  style={{ flex: 1, minHeight: 40, padding: '0 0.85rem', background: bg, color, border: `2px solid ${border}`, borderRadius: '10px', cursor: answered ? 'default' : 'pointer', fontWeight: 700, fontSize: '1.05rem', textAlign: 'center', transition: 'background 0.15s, border-color 0.15s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
