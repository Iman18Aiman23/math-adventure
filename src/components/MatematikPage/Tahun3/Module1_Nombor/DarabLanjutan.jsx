import React, { useState, useCallback, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../../../utils/soundManager';
import BackButton from '../../../BackButton';

// KSSR Matematik Tahun 3 — Nombor dan Operasi
// Darab Lanjutan ×6–×9: darab terus, faktor hilang, masalah cerita

const C = { bg: '#EDD9FF', primary: '#9C27B0', primaryDark: '#6A1B9A', light: '#F3E5F5' };

const MULTIPLIERS   = [6, 7, 8, 9];
const MULTIPLICANDS = [2, 3, 4, 5, 6, 7, 8, 9];

function randFrom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function productDistr(correct, a, b) {
  const pool = [...new Set([
    correct - b, correct + b, correct - a, correct + a,
    a * (b + 1), a * (b - 1), (a + 1) * b, (a - 1) * b,
  ].filter(x => x > 0 && x !== correct))];
  const result = [];
  while (result.length < 3 && pool.length > 0) {
    result.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
  }
  while (result.length < 3) {
    const c = Math.floor(Math.random() * 72) + 12;
    if (c !== correct && !result.includes(c)) result.push(c);
  }
  return result;
}

function factorDistr(correct) {
  const pool = [correct - 2, correct - 1, correct + 1, correct + 2, correct + 3]
    .filter(x => x >= 2 && x <= 9 && x !== correct);
  const result = [];
  while (result.length < 3 && pool.length > 0) {
    result.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
  }
  while (result.length < 3) {
    let c;
    do { c = Math.floor(Math.random() * 8) + 2; } while (c === correct || result.includes(c));
    result.push(c);
  }
  return result;
}

const STORIES = [
  { a: 6, b: 8, icon: '🐦', bm: 'Pak Din mempunyai 6 sangkar burung. Setiap sangkar ada 8 ekor burung.', eng: 'Pak Din has 6 bird cages. Each cage has 8 birds.' },
  { a: 6, b: 7, icon: '🥚', bm: 'Satu kotak mengandungi 6 baris telur. Setiap baris ada 7 biji telur.', eng: 'A box has 6 rows of eggs. Each row has 7 eggs.' },
  { a: 7, b: 9, icon: '🪑', bm: 'Sebuah dewan ada 7 baris kerusi. Setiap baris ada 9 kerusi.', eng: 'A hall has 7 rows of chairs. Each row has 9 chairs.' },
  { a: 7, b: 6, icon: '🌱', bm: 'Encik Razi menanam 7 baris pokok tomato. Setiap baris ada 6 pokok.', eng: 'Encik Razi plants 7 rows of tomato plants. Each row has 6 plants.' },
  { a: 8, b: 9, icon: '👦', bm: 'Terdapat 8 kumpulan murid. Setiap kumpulan ada 9 orang murid.', eng: 'There are 8 groups of students. Each group has 9 students.' },
  { a: 8, b: 6, icon: '📖', bm: 'Setiap hari Hafiz membaca 8 halaman buku. Berapa halaman dalam 6 hari?', eng: 'Hafiz reads 8 pages a day. How many pages in 6 days?' },
  { a: 9, b: 6, icon: '🍡', bm: 'Seorang peniaga menjual 9 peket kuih. Setiap peket ada 6 biji kuih.', eng: 'A trader sells 9 packets of kuih. Each packet has 6 pieces.' },
  { a: 9, b: 8, icon: '🏢', bm: 'Sebuah bangunan mempunyai 9 tingkat. Setiap tingkat ada 8 bilik.', eng: 'A building has 9 floors. Each floor has 8 rooms.' },
];

function generateQuestion(mechanic, usedStories) {
  if (mechanic === 'darab') {
    const a = randFrom(MULTIPLIERS);
    const b = randFrom(MULTIPLICANDS);
    const correct = a * b;
    return {
      type: 'darab', a, b, answer: correct,
      options: [correct, ...productDistr(correct, a, b)].sort(() => Math.random() - 0.5),
      q_bm: `Berapakah hasil darab ${a} × ${b}?`,
      q_eng: `What is the product of ${a} × ${b}?`,
      exp_bm: `${a} × ${b} = ${correct}`,
    };
  }

  if (mechanic === 'faktor') {
    const a = randFrom(MULTIPLIERS);
    const b = randFrom(MULTIPLICANDS);
    const product = a * b;
    const missingLeft = Math.random() < 0.5;
    const correct = missingLeft ? a : b;
    return {
      type: 'faktor', a, b, product, missingLeft, answer: correct,
      options: [correct, ...factorDistr(correct)].sort(() => Math.random() - 0.5),
      q_bm: `Cari nombor yang hilang:`,
      q_eng: `Find the missing number:`,
      exp_bm: `${a} × ${b} = ${product}`,
    };
  }

  // cerita
  const available = STORIES.map((s, i) => ({ s, i })).filter(({ i }) => !usedStories.has(i));
  const pool = available.length > 0 ? available : STORIES.map((s, i) => ({ s, i }));
  const { s: story, i: idx } = pool[Math.floor(Math.random() * pool.length)];
  usedStories.add(idx);
  const correct = story.a * story.b;
  return {
    type: 'cerita', story, answer: correct,
    options: [correct, ...productDistr(correct, story.a, story.b)].sort(() => Math.random() - 0.5),
    q_bm: 'Berapakah jumlahnya?',
    q_eng: 'What is the total?',
    exp_bm: `${story.a} × ${story.b} = ${correct}`,
  };
}

const TOTAL = 12;
const PER_M = 4;

export default function DarabLanjutan({ onBack, language = 'bm' }) {
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [stats, setStats] = useState({
    darab:  { c: 0, t: 0 },
    faktor: { c: 0, t: 0 },
    cerita: { c: 0, t: 0 },
  });

  const questions = useMemo(() => {
    const qs = [];
    const usedStories = new Set();
    ['darab', 'faktor', 'cerita'].forEach(m => {
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
    setStats({ darab: { c: 0, t: 0 }, faktor: { c: 0, t: 0 }, cerita: { c: 0, t: 0 } });
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
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>✖️</div>
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
            ['darab',  '✖️ Darab Terus'],
            ['faktor', '❓ Faktor Hilang'],
            ['cerita', '📖 Masalah Cerita'],
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
            {q.type === 'darab'  && '✖️ Darab Terus'}
            {q.type === 'faktor' && '❓ Faktor Hilang'}
            {q.type === 'cerita' && '📖 Masalah Cerita'}
          </div>

          {/* visual area */}
          {q.type === 'darab' && (
            <div style={{ flexShrink: 0, background: C.light, borderRadius: '8px', padding: '0.75rem', marginBottom: '0.45rem', textAlign: 'center' }}>
              <span style={{ fontSize: '2.8rem', fontWeight: 800, color: '#E53935' }}>{q.a}</span>
              <span style={{ fontSize: '2.3rem', fontWeight: 800, color: '#555', margin: '0 0.3rem' }}>×</span>
              <span style={{ fontSize: '2.8rem', fontWeight: 800, color: '#2E7D32' }}>{q.b}</span>
              <span style={{ fontSize: '2.3rem', fontWeight: 800, color: '#555', margin: '0 0.3rem' }}>=</span>
              <span style={{ fontSize: '2.8rem', fontWeight: 800, color: C.primary }}>?</span>
            </div>
          )}

          {q.type === 'faktor' && (
            <div style={{ flexShrink: 0, background: C.light, borderRadius: '8px', padding: '0.75rem', marginBottom: '0.45rem', textAlign: 'center' }}>
              <span style={{ fontSize: '2.8rem', fontWeight: 800, color: q.missingLeft ? C.primary : '#E53935' }}>
                {q.missingLeft ? '?' : q.a}
              </span>
              <span style={{ fontSize: '2.3rem', fontWeight: 800, color: '#555', margin: '0 0.3rem' }}>×</span>
              <span style={{ fontSize: '2.8rem', fontWeight: 800, color: q.missingLeft ? '#2E7D32' : C.primary }}>
                {q.missingLeft ? q.b : '?'}
              </span>
              <span style={{ fontSize: '2.3rem', fontWeight: 800, color: '#555', margin: '0 0.3rem' }}>=</span>
              <span style={{ fontSize: '2.8rem', fontWeight: 800, color: '#555' }}>{q.product}</span>
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

          {/* feedback — flexShrink:0, options shrink to make room */}
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
