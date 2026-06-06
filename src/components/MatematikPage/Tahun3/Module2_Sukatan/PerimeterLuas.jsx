import React, { useState, useCallback, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../../../utils/soundManager';
import BackButton from '../../../BackButton';

// KSSR Matematik Tahun 3 — Sukatan dan Geometri
// Perimeter & Luas: kira perimeter, kira luas, cari dimensi

const C = { bg: '#EDD9FF', primary: '#9C27B0', primaryDark: '#6A1B9A', light: '#F3E5F5' };

// Rectangle dimension pool [length, width] — all produce clean integer P and A
const RECT_POOL = [
  [5,3],[6,4],[7,3],[8,4],[9,5],[6,2],[7,5],[8,3],[10,4],[6,6],
  [4,3],[8,2],[9,3],[5,5],[7,2],[4,4],[6,3],[5,4],[9,2],[7,4],
];

function randFrom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function perimDistr(l, w, P) {
  const pool = [...new Set([l*w, l+w, 2*l+w, 2*l+2*w-2, P-2, P+2, P-4, P+4]
    .filter(x => x > 0 && x !== P))];
  const r = [];
  while (r.length < 3 && pool.length > 0)
    r.push(pool.splice(Math.floor(Math.random()*pool.length),1)[0]);
  while (r.length < 3) { const c=(Math.floor(Math.random()*20)+2)*2; if(c!==P&&!r.includes(c))r.push(c); }
  return r;
}

function luasDistr(l, w, A) {
  const pool = [...new Set([2*(l+w), l+w, A+l, A-l, A+w, A-w, A+2, A-2]
    .filter(x => x > 0 && x !== A))];
  const r = [];
  while (r.length < 3 && pool.length > 0)
    r.push(pool.splice(Math.floor(Math.random()*pool.length),1)[0]);
  while (r.length < 3) { const c=Math.floor(Math.random()*40)+4; if(c!==A&&!r.includes(c))r.push(c); }
  return r;
}

function dimDistr(correct) {
  const pool = [correct-2,correct-1,correct+1,correct+2,correct+3].filter(x=>x>=1&&x!==correct);
  const r = [];
  while (r.length < 3 && pool.length > 0)
    r.push(pool.splice(Math.floor(Math.random()*pool.length),1)[0]);
  while (r.length < 3) { let c; do{c=Math.floor(Math.random()*10)+1;}while(c===correct||r.includes(c)); r.push(c); }
  return r;
}

function pickRect(used) {
  const avail = RECT_POOL.map((d,i)=>({d,i})).filter(({i})=>!used.has(i));
  const src = avail.length > 0 ? avail : RECT_POOL.map((d,i)=>({d,i}));
  const {d:[l,w],i:idx} = src[Math.floor(Math.random()*src.length)];
  used.add(idx);
  return {l, w};
}

function generateQuestion(mechanic, used) {
  const {l, w} = pickRect(used);

  if (mechanic === 'perimeter') {
    const P = 2*(l+w);
    const correct = `${P} cm`;
    return {
      type: 'perimeter', l, w, hideSide: null, answer: correct,
      options: [correct, ...perimDistr(l,w,P).map(x=>`${x} cm`)].sort(()=>Math.random()-0.5),
      q_bm: 'Kira perimeter segi empat tepat ini:',
      q_eng: 'Find the perimeter of this rectangle:',
      exp_bm: `P = 2 × (${l} + ${w}) = 2 × ${l+w} = ${P} cm`,
    };
  }

  if (mechanic === 'luas') {
    const A = l*w;
    const correct = `${A} cm²`;
    return {
      type: 'luas', l, w, hideSide: null, answer: correct,
      options: [correct, ...luasDistr(l,w,A).map(x=>`${x} cm²`)].sort(()=>Math.random()-0.5),
      q_bm: 'Kira luas segi empat tepat ini:',
      q_eng: 'Find the area of this rectangle:',
      exp_bm: `L = ${l} × ${w} = ${l*w} cm²`,
    };
  }

  // cari dimensi
  const findByP = Math.random() < 0.5;
  const correct = w;
  if (findByP) {
    const P = 2*(l+w);
    return {
      type: 'cari', l, w, hideSide: 'w', answer: `${correct} cm`,
      options: [correct,...dimDistr(correct)].map(x=>`${x} cm`).sort(()=>Math.random()-0.5),
      q_bm: `Perimeter = ${P} cm, panjang = ${l} cm. Cari lebarnya:`,
      q_eng: `Perimeter = ${P} cm, length = ${l} cm. Find the width:`,
      exp_bm: `Lebar = (${P} ÷ 2) − ${l} = ${P/2} − ${l} = ${correct} cm`,
    };
  } else {
    const A = l*w;
    return {
      type: 'cari', l, w, hideSide: 'w', answer: `${correct} cm`,
      options: [correct,...dimDistr(correct)].map(x=>`${x} cm`).sort(()=>Math.random()-0.5),
      q_bm: `Luas = ${A} cm², panjang = ${l} cm. Cari lebarnya:`,
      q_eng: `Area = ${A} cm², length = ${l} cm. Find the width:`,
      exp_bm: `Lebar = ${A} ÷ ${l} = ${correct} cm`,
    };
  }
}

// Scaled rectangle SVG for the visual area
function RectSVG({ l, w, hideSide }) {
  const rw = Math.max(60, Math.min(124, l * 14));
  const rh = Math.max(34, Math.min(68, w * 11));
  const cx = 100, cy = 64;
  const rx = cx - rw/2, ry = cy - rh/2;
  const svgH = ry + rh + 22;

  return (
    <svg width="200" height={svgH} viewBox={`0 0 200 ${svgH}`}
      style={{ maxWidth: '100%', height: 'auto' }} aria-hidden="true">
      <rect x={rx} y={ry} width={rw} height={rh}
        fill={`${C.primary}18`} stroke={C.primary} strokeWidth="2.5" rx="3" />
      {/* top label (length) */}
      <text x={cx} y={ry - 10} textAnchor="middle" dominantBaseline="central"
        fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="15"
        fill={hideSide === 'l' ? C.primary : '#E53935'}>
        {hideSide === 'l' ? '? cm' : `${l} cm`}
      </text>
      {/* left label (width) */}
      <text x={rx - 14} y={cy} textAnchor="middle" dominantBaseline="central"
        fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="15"
        fill={hideSide === 'w' ? C.primary : '#2E7D32'}
        transform={`rotate(-90, ${rx - 14}, ${cy})`}>
        {hideSide === 'w' ? '? cm' : `${w} cm`}
      </text>
    </svg>
  );
}

const TOTAL = 12;
const PER_M = 4;

export default function PerimeterLuas({ onBack, language = 'bm' }) {
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [stats, setStats] = useState({
    perimeter: { c: 0, t: 0 },
    luas:      { c: 0, t: 0 },
    cari:      { c: 0, t: 0 },
  });

  const questions = useMemo(() => {
    const used = new Set();
    const qs = [];
    ['perimeter', 'luas', 'cari'].forEach(m => {
      for (let i = 0; i < PER_M; i++) qs.push(generateQuestion(m, used));
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
    setStats({ perimeter: { c: 0, t: 0 }, luas: { c: 0, t: 0 }, cari: { c: 0, t: 0 } });
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
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>📐</div>
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
            ['perimeter', '📏 Perimeter'],
            ['luas',      '🔲 Luas'],
            ['cari',      '❓ Cari Dimensi'],
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
            {q.type === 'perimeter' && '📏 Perimeter'}
            {q.type === 'luas'      && '🔲 Luas'}
            {q.type === 'cari'      && '❓ Cari Dimensi'}
          </div>

          {/* visual area — rectangle diagram */}
          <div style={{ flexShrink: 0, background: C.light, borderRadius: '8px', padding: '0.3rem 0.5rem', marginBottom: '0.45rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <RectSVG l={q.l} w={q.w} hideSide={q.hideSide} />
          </div>

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
