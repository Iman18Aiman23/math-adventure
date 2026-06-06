import React, { useState, useCallback, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../../../utils/soundManager';
import BackButton from '../../../BackButton';

// KSSR Matematik Tahun 3 — Sukatan dan Geometri / Wang
// Wang: tambah harga, kira baki, masalah cerita

const C = { bg: '#EDD9FF', primary: '#9C27B0', primaryDark: '#6A1B9A', light: '#F3E5F5' };

function randFrom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function toRM(sen) {
  const rm = Math.floor(sen / 100);
  const s  = sen % 100;
  return `RM${rm}.${String(s).padStart(2, '0')}`;
}

// Nearby amounts (in sen) for distractors
function wangDistr(correct, maxSen = 9999) {
  const pool = [...new Set(
    [-50, 50, -100, 100, -150, 150, -200, 200]
      .map(d => correct + d)
      .filter(x => x > 0 && x !== correct && x <= maxSen),
  )];
  const result = [];
  while (result.length < 3 && pool.length > 0) {
    result.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
  }
  while (result.length < 3) {
    const c = (Math.floor(Math.random() * 15) + 1) * 50;
    if (c !== correct && !result.includes(c) && c <= maxSen) result.push(c);
  }
  return result;
}

// Nice prices in sen: RM1.00–RM5.00 in 50 sen steps
const NICE = [100, 150, 200, 250, 300, 350, 400, 450, 500];
const PAYMENTS = [500, 1000, 2000]; // RM5, RM10, RM20

const STORIES = [
  { type: 'tambah', icon: '🍎', p1: 250, p2: 150,  bm: 'Ali membeli epal RM2.50 dan air mineral RM1.50.', eng: 'Ali buys an apple for RM2.50 and water for RM1.50.' },
  { type: 'tambah', icon: '🍜', p1: 450, p2: 200,  bm: 'Mee goreng berharga RM4.50 dan teh tarik RM2.00.', eng: 'Mee goreng costs RM4.50 and teh tarik costs RM2.00.' },
  { type: 'tambah', icon: '📚', p1: 800, p2: 350,  bm: 'Buku cerita RM8.00 dan buku latihan RM3.50.', eng: 'A story book costs RM8.00 and a workbook costs RM3.50.' },
  { type: 'tambah', icon: '🎒', p1: 1200, p2: 250, bm: 'Beg sekolah RM12.00 dan pensel warna RM2.50.', eng: 'A school bag costs RM12.00 and colour pencils cost RM2.50.' },
  { type: 'baki',   icon: '🛒', price: 350,  payment: 500,  bm: 'Ibu membeli sayur RM3.50 dan bayar dengan RM5.00.', eng: 'Mum buys vegetables for RM3.50 and pays RM5.00.' },
  { type: 'baki',   icon: '🍊', price: 280,  payment: 500,  bm: 'Harga oren RM2.80. Aminah bayar dengan RM5.00.', eng: 'Oranges cost RM2.80. Aminah pays RM5.00.' },
  { type: 'baki',   icon: '🎁', price: 850,  payment: 1000, bm: 'Hadiah berharga RM8.50. Dibayar dengan RM10.00.', eng: 'A gift costs RM8.50. Paid with RM10.00.' },
  { type: 'baki',   icon: '👕', price: 1450, payment: 2000, bm: 'Baju berharga RM14.50. Dibayar dengan RM20.00.', eng: 'A shirt costs RM14.50. Paid with RM20.00.' },
];

function generateQuestion(mechanic, usedStories) {
  if (mechanic === 'tambah') {
    const p1 = randFrom(NICE);
    const p2 = randFrom(NICE);
    const total = p1 + p2;
    const correct = toRM(total);
    return {
      type: 'tambah', p1, p2,
      answer: correct,
      options: [correct, ...wangDistr(total).map(toRM)].sort(() => Math.random() - 0.5),
      q_bm: 'Berapakah jumlah kedua-dua harga?',
      q_eng: 'What is the total of both prices?',
      exp_bm: `${toRM(p1)} + ${toRM(p2)} = ${correct}`,
    };
  }

  if (mechanic === 'baki') {
    const payment = randFrom(PAYMENTS);
    const validPrices = NICE.filter(n => n < payment - 49);
    const price = randFrom(validPrices.length > 0 ? validPrices : [payment - 50]);
    const change = payment - price;
    const correct = toRM(change);
    return {
      type: 'baki', price, payment,
      answer: correct,
      options: [correct, ...wangDistr(change, payment - 1).map(toRM)].sort(() => Math.random() - 0.5),
      q_bm: 'Berapakah baki wang yang diterima?',
      q_eng: 'How much change is received?',
      exp_bm: `${toRM(payment)} − ${toRM(price)} = ${correct}`,
    };
  }

  // cerita
  const available = STORIES.map((s, i) => ({ s, i })).filter(({ i }) => !usedStories.has(i));
  const pool = available.length > 0 ? available : STORIES.map((s, i) => ({ s, i }));
  const { s: story, i: idx } = pool[Math.floor(Math.random() * pool.length)];
  usedStories.add(idx);
  const ans = story.type === 'tambah' ? story.p1 + story.p2 : story.payment - story.price;
  const correct = toRM(ans);
  return {
    type: 'cerita', story,
    answer: correct,
    options: [correct, ...wangDistr(ans).map(toRM)].sort(() => Math.random() - 0.5),
    q_bm: story.type === 'tambah' ? 'Berapakah jumlah harga semuanya?' : 'Berapakah baki wang yang diterima?',
    q_eng: story.type === 'tambah' ? 'What is the total price?' : 'How much change is received?',
    exp_bm: story.type === 'tambah'
      ? `${toRM(story.p1)} + ${toRM(story.p2)} = ${correct}`
      : `${toRM(story.payment)} − ${toRM(story.price)} = ${correct}`,
  };
}

const TOTAL = 12;
const PER_M = 4;

export default function WangTahun3({ onBack, language = 'bm' }) {
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [stats, setStats] = useState({
    tambah: { c: 0, t: 0 },
    baki:   { c: 0, t: 0 },
    cerita: { c: 0, t: 0 },
  });

  const questions = useMemo(() => {
    const qs = [];
    const usedStories = new Set();
    ['tambah', 'baki', 'cerita'].forEach(m => {
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
    setStats({ tambah: { c: 0, t: 0 }, baki: { c: 0, t: 0 }, cerita: { c: 0, t: 0 } });
  }, []);

  const optStyle = (opt) => {
    if (!answered) return { bg: '#FFF', border: C.primary, color: '#333' };
    if (opt === q.answer) return { bg: '#4CAF50', border: '#388E3C', color: 'white' };
    if (opt === selected) return { bg: '#FF6B6B', border: '#D32F2F', color: 'white' };
    return { bg: '#F5F5F5', border: '#DDD', color: '#AAA' };
  };

  const priceBox = (label, amount, amtColor) => (
    <div style={{ background: '#fff', border: `2px solid ${C.primary}55`, borderRadius: '8px', padding: '0.4rem 0.7rem', textAlign: 'center' }}>
      <div style={{ fontSize: '0.65rem', color: '#888', fontWeight: 700, textTransform: 'uppercase', marginBottom: '2px' }}>{label}</div>
      <div style={{ fontSize: '1.45rem', fontWeight: 800, color: amtColor }}>{amount}</div>
    </div>
  );

  if (done) {
    return (
      <div style={{ minHeight: '100%', background: C.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>💰</div>
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
            ['tambah', '➕ Tambah Harga'],
            ['baki',   '💵 Kira Baki'],
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
            {q.type === 'tambah' && '➕ Tambah Harga'}
            {q.type === 'baki'   && '💵 Kira Baki'}
            {q.type === 'cerita' && '📖 Masalah Cerita'}
          </div>

          {/* visual area */}
          {q.type === 'tambah' && (
            <div style={{ flexShrink: 0, background: C.light, borderRadius: '8px', padding: '0.65rem 0.5rem', marginBottom: '0.45rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem' }}>
              {priceBox(language === 'bm' ? 'Harga 1' : 'Price 1', toRM(q.p1), '#E53935')}
              <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#555' }}>+</span>
              {priceBox(language === 'bm' ? 'Harga 2' : 'Price 2', toRM(q.p2), '#2E7D32')}
              <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#555' }}>=</span>
              <span style={{ fontSize: '1.8rem', fontWeight: 800, color: C.primary }}>?</span>
            </div>
          )}

          {q.type === 'baki' && (
            <div style={{ flexShrink: 0, background: C.light, borderRadius: '8px', padding: '0.65rem 0.5rem', marginBottom: '0.45rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem' }}>
              {priceBox(language === 'bm' ? 'Harga' : 'Price', toRM(q.price), '#E53935')}
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#555' }}>←</span>
              {priceBox(language === 'bm' ? 'Bayar' : 'Pay', toRM(q.payment), '#2E7D32')}
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#555' }}>→</span>
              {priceBox(language === 'bm' ? 'Baki' : 'Change', '?', C.primary)}
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
                  style={{ flex: 1, minHeight: 40, padding: '0 0.85rem', background: bg, color, border: `2px solid ${border}`, borderRadius: '10px', cursor: answered ? 'default' : 'pointer', fontWeight: 700, fontSize: '1.05rem', textAlign: 'center', transition: 'background 0.15s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
