import React, { useState, useCallback, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../../../utils/soundManager';
import BackButton from '../../../BackButton';

// KSSR Matematik Tahun 3 — Sukatan dan Geometri / Masa
// Masa: tukar 12jam→24jam, tukar 24jam→12jam, tempoh masa

const C = { bg: '#EDD9FF', primary: '#9C27B0', primaryDark: '#6A1B9A', light: '#F3E5F5' };

// ── Question pools ─────────────────────────────────────────────────────────

// 12h → 24h: common distractor = forgetting to add 12 for PM, or ±1h
const Q_12TO24 = [
  { t12: '7:30',  pd: 'pagi',        ans: '07:30', opts: ['07:30','19:30','06:30','08:30'] },
  { t12: '10:00', pd: 'pagi',        ans: '10:00', opts: ['10:00','22:00','09:00','11:00'] },
  { t12: '11:45', pd: 'pagi',        ans: '11:45', opts: ['11:45','23:45','10:45','12:45'] },
  { t12: '12:00', pd: 'tengah hari', ans: '12:00', opts: ['12:00','00:00','11:00','13:00'] },
  { t12: '2:30',  pd: 'petang',      ans: '14:30', opts: ['14:30','02:30','13:30','15:30'] },
  { t12: '3:00',  pd: 'petang',      ans: '15:00', opts: ['15:00','03:00','14:00','16:00'] },
  { t12: '5:45',  pd: 'petang',      ans: '17:45', opts: ['17:45','05:45','16:45','18:45'] },
  { t12: '7:00',  pd: 'malam',       ans: '19:00', opts: ['19:00','07:00','18:00','20:00'] },
  { t12: '9:30',  pd: 'malam',       ans: '21:30', opts: ['21:30','09:30','20:30','22:30'] },
  { t12: '11:00', pd: 'malam',       ans: '23:00', opts: ['23:00','11:00','22:00','24:00'] },
];

// 24h → 12h: common distractor = wrong period (pagi/malam swap), ±1h
const Q_24TO12 = [
  { t24: '08:00', ans: '8:00 pagi',   opts: ['8:00 pagi',  '8:00 malam',  '9:00 pagi',   '7:00 pagi'  ] },
  { t24: '09:30', ans: '9:30 pagi',   opts: ['9:30 pagi',  '9:30 petang', '8:30 pagi',   '10:30 pagi' ] },
  { t24: '11:15', ans: '11:15 pagi',  opts: ['11:15 pagi', '11:15 malam', '10:15 pagi',  '12:15 pagi' ] },
  { t24: '13:00', ans: '1:00 petang', opts: ['1:00 petang','1:00 pagi',   '2:00 petang', '12:00 petang'] },
  { t24: '14:30', ans: '2:30 petang', opts: ['2:30 petang','2:30 pagi',   '3:30 petang', '1:30 petang' ] },
  { t24: '16:15', ans: '4:15 petang', opts: ['4:15 petang','4:15 pagi',   '3:15 petang', '5:15 petang' ] },
  { t24: '19:00', ans: '7:00 malam',  opts: ['7:00 malam', '7:00 pagi',   '6:00 malam',  '8:00 malam'  ] },
  { t24: '20:30', ans: '8:30 malam',  opts: ['8:30 malam', '8:30 pagi',   '7:30 malam',  '9:30 malam'  ] },
  { t24: '22:45', ans: '10:45 malam', opts: ['10:45 malam','10:45 pagi',  '9:45 malam',  '11:45 malam' ] },
];

// Elapsed time: whole-hour durations 1–4h
const Q_TEMPOH = [
  { startL: '8:00 pagi',    endL: '10:00 pagi',         dur: 2 },
  { startL: '9:00 pagi',    endL: '12:00 tengah hari',  dur: 3 },
  { startL: '10:00 pagi',   endL: '1:00 petang',        dur: 3 },
  { startL: '2:00 petang',  endL: '4:00 petang',        dur: 2 },
  { startL: '1:00 petang',  endL: '5:00 petang',        dur: 4 },
  { startL: '7:00 malam',   endL: '9:00 malam',         dur: 2 },
  { startL: '7:00 pagi',    endL: '11:00 pagi',         dur: 4 },
  { startL: '8:00 malam',   endL: '11:00 malam',        dur: 3 },
  { startL: '9:00 pagi',    endL: '10:00 pagi',         dur: 1 },
  { startL: '3:00 petang',  endL: '7:00 malam',         dur: 4 },
];

const TEMPOH_OPTS = ['1 jam', '2 jam', '3 jam', '4 jam'];

function pickUnused(pool, used) {
  const available = pool.map((q, i) => ({ q, i })).filter(({ i }) => !used.has(i));
  const src = available.length > 0 ? available : pool.map((q, i) => ({ q, i }));
  const { q, i } = src[Math.floor(Math.random() * src.length)];
  used.add(i);
  return q;
}

function generateQuestion(mechanic, pools) {
  if (mechanic === 'tukar12') {
    const q = pickUnused(Q_12TO24, pools.used12);
    return {
      type: 'tukar12', t12: q.t12, pd: q.pd,
      answer: q.ans,
      options: [...q.opts].sort(() => Math.random() - 0.5),
      q_bm: 'Tukar kepada waktu 24 jam:',
      q_eng: 'Convert to 24-hour time:',
      exp_bm: `${q.t12} ${q.pd} = ${q.ans}`,
    };
  }

  if (mechanic === 'tukar24') {
    const q = pickUnused(Q_24TO12, pools.used24);
    return {
      type: 'tukar24', t24: q.t24,
      answer: q.ans,
      options: [...q.opts].sort(() => Math.random() - 0.5),
      q_bm: 'Tukar kepada waktu 12 jam:',
      q_eng: 'Convert to 12-hour time:',
      exp_bm: `${q.t24} = ${q.ans}`,
    };
  }

  // tempoh
  const q = pickUnused(Q_TEMPOH, pools.usedT);
  const ans = `${q.dur} jam`;
  const opts = [...TEMPOH_OPTS];
  if (!opts.includes(ans)) opts[3] = ans; // ensure answer is in options
  return {
    type: 'tempoh', startL: q.startL, endL: q.endL, dur: q.dur,
    answer: ans,
    options: opts.sort(() => Math.random() - 0.5),
    q_bm: 'Berapa lama tempoh masa tersebut?',
    q_eng: 'How long is the time period?',
    exp_bm: `Dari ${q.startL} hingga ${q.endL} = ${ans}.`,
  };
}

const TOTAL = 12;
const PER_M = 4;

export default function MasaTahun3({ onBack, language = 'bm' }) {
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [stats, setStats] = useState({
    tukar12: { c: 0, t: 0 },
    tukar24: { c: 0, t: 0 },
    tempoh:  { c: 0, t: 0 },
  });

  const questions = useMemo(() => {
    const pools = { used12: new Set(), used24: new Set(), usedT: new Set() };
    const qs = [];
    ['tukar12', 'tukar24', 'tempoh'].forEach(m => {
      for (let i = 0; i < PER_M; i++) qs.push(generateQuestion(m, pools));
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
    setStats({ tukar12: { c: 0, t: 0 }, tukar24: { c: 0, t: 0 }, tempoh: { c: 0, t: 0 } });
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
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>⏰</div>
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
            ['tukar12', '🔄 12 Jam → 24 Jam'],
            ['tukar24', '🔄 24 Jam → 12 Jam'],
            ['tempoh',  '⏱️ Tempoh Masa'],
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

  const clockBox = (label, time, clr) => (
    <div style={{ background: '#1A1A2E', borderRadius: '8px', padding: '0.4rem 0.7rem', textAlign: 'center', border: `2px solid ${clr}55` }}>
      <div style={{ fontSize: '0.62rem', color: clr, fontWeight: 700, textTransform: 'uppercase', marginBottom: '2px' }}>{label}</div>
      <div style={{ fontFamily: "'Courier New', monospace", fontSize: '1.4rem', fontWeight: 800, color: clr }}>{time}</div>
    </div>
  );

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
            {q.type === 'tukar12' && '🔄 12 Jam → 24 Jam'}
            {q.type === 'tukar24' && '🔄 24 Jam → 12 Jam'}
            {q.type === 'tempoh'  && '⏱️ Tempoh Masa'}
          </div>

          {/* visual area */}
          {q.type === 'tukar12' && (
            <div style={{ flexShrink: 0, background: C.light, borderRadius: '8px', padding: '0.7rem', marginBottom: '0.45rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem' }}>
              {clockBox(language === 'bm' ? 'Masa' : 'Time', q.t12, '#E53935')}
              <div style={{ background: C.primary, borderRadius: '6px', padding: '0.2rem 0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#fff', textTransform: 'uppercase' }}>{q.pd}</span>
              </div>
              <span style={{ fontSize: '1.5rem', color: '#555' }}>→</span>
              {clockBox(language === 'bm' ? '24 Jam' : '24hr', '?', C.primary)}
            </div>
          )}

          {q.type === 'tukar24' && (
            <div style={{ flexShrink: 0, background: C.light, borderRadius: '8px', padding: '0.7rem', marginBottom: '0.45rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem' }}>
              {clockBox('24 jam', q.t24, '#E53935')}
              <span style={{ fontSize: '1.5rem', color: '#555' }}>→</span>
              {clockBox(language === 'bm' ? '12 Jam' : '12hr', '?', C.primary)}
            </div>
          )}

          {q.type === 'tempoh' && (
            <div style={{ flexShrink: 0, background: C.light, borderRadius: '8px', padding: '0.7rem', marginBottom: '0.45rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              {clockBox(language === 'bm' ? 'Mula' : 'Start', q.startL, '#2E7D32')}
              <span style={{ fontSize: '1.5rem', color: '#555' }}>→</span>
              {clockBox(language === 'bm' ? 'Tamat' : 'End', q.endL, '#E53935')}
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
                  style={{ flex: 1, minHeight: 40, padding: '0 0.85rem', background: bg, color, border: `2px solid ${border}`, borderRadius: '10px', cursor: answered ? 'default' : 'pointer', fontWeight: 700, fontSize: '1rem', textAlign: 'center', fontFamily: opt.includes(':') && !opt.includes(' ') ? "'Courier New', monospace" : 'inherit', transition: 'background 0.15s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
