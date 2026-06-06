import React, { useState, useCallback, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../../../../utils/soundManager';
import BackButton from '../../../BackButton';

// KSSR Matematik Tahun 1 — Bidang 4: Wang hingga RM10.
// Three mechanics (12 qs / round, 4 each, shuffled):
//   1. kira    — count a collection of RM notes → total?
//   2. nilai   — show one note, "ini RM berapa?"
//   3. masalah — simple change story: "bayar RM X, harga RM Y, baki?"

const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
const pick    = arr => arr[Math.floor(Math.random() * arr.length)];

// ── Denominations ───────────────────────────────────────────────────────────
const RM_NOTES = [
  { value: 1,  label: 'RM 1',  color: '#1565C0' },
  { value: 2,  label: 'RM 2',  color: '#7B1FA2' },
  { value: 5,  label: 'RM 5',  color: '#2E7D32' },
  { value: 10, label: 'RM 10', color: '#B71C1C' },
];

// ── Note visual ─────────────────────────────────────────────────────────────
const MoneyNote = ({ denom, size = 'md' }) => {
  const w = size === 'lg' ? 130 : 80;
  const h = size === 'lg' ? 70  : 44;
  return (
    <div style={{
      width: w, height: h, background: denom.color, borderRadius: '8px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      border: '2.5px solid rgba(255,255,255,0.35)',
      boxShadow: '0 3px 8px rgba(0,0,0,0.25)', flexShrink: 0,
    }}>
      <span style={{ color: 'white', fontWeight: 900, fontSize: size === 'lg' ? '1.3rem' : '0.9rem', letterSpacing: '1px' }}>
        {denom.label}
      </span>
    </div>
  );
};

// ── Pre-designed Kira scenarios (mix of denominations summing ≤ RM10) ────────
const KIRA_SCENARIOS = [
  [{ value: 2, label: 'RM 2', color: '#7B1FA2' }, { value: 1, label: 'RM 1', color: '#1565C0' }],                                                               // RM3
  [{ value: 5, label: 'RM 5', color: '#2E7D32' }, { value: 2, label: 'RM 2', color: '#7B1FA2' }],                                                               // RM7
  [{ value: 10, label: 'RM 10', color: '#B71C1C' }],                                                                                                             // RM10
  [{ value: 2, label: 'RM 2', color: '#7B1FA2' }, { value: 2, label: 'RM 2', color: '#7B1FA2' }, { value: 1, label: 'RM 1', color: '#1565C0' }],                // RM5
  [{ value: 5, label: 'RM 5', color: '#2E7D32' }, { value: 1, label: 'RM 1', color: '#1565C0' }, { value: 1, label: 'RM 1', color: '#1565C0' }],                // RM7
  [{ value: 5, label: 'RM 5', color: '#2E7D32' }, { value: 5, label: 'RM 5', color: '#2E7D32' }],                                                               // RM10
  [{ value: 2, label: 'RM 2', color: '#7B1FA2' }, { value: 2, label: 'RM 2', color: '#7B1FA2' }],                                                               // RM4
  [{ value: 1, label: 'RM 1', color: '#1565C0' }, { value: 2, label: 'RM 2', color: '#7B1FA2' }, { value: 5, label: 'RM 5', color: '#2E7D32' }],                // RM8
  [{ value: 2, label: 'RM 2', color: '#7B1FA2' }, { value: 5, label: 'RM 5', color: '#2E7D32' }, { value: 1, label: 'RM 1', color: '#1565C0' }],                // RM8 (different order)
  [{ value: 1, label: 'RM 1', color: '#1565C0' }, { value: 1, label: 'RM 1', color: '#1565C0' }, { value: 1, label: 'RM 1', color: '#1565C0' }],                // RM3
];

// ── Pre-designed Masalah scenarios ──────────────────────────────────────────
const MASALAH_POOL = [
  { item_bm: 'pen', item_eng: 'a pen',            price: 3, pay: 5,  change: 2 },
  { item_bm: 'buku', item_eng: 'a book',           price: 7, pay: 10, change: 3 },
  { item_bm: 'mainan', item_eng: 'a toy',          price: 8, pay: 10, change: 2 },
  { item_bm: 'minuman', item_eng: 'a drink',       price: 2, pay: 5,  change: 3 },
  { item_bm: 'coklat', item_eng: 'chocolate',      price: 4, pay: 5,  change: 1 },
  { item_bm: 'pensil warna', item_eng: 'colour pencils', price: 6, pay: 10, change: 4 },
  { item_bm: 'getah', item_eng: 'an eraser',       price: 1, pay: 2,  change: 1 },
  { item_bm: 'beg', item_eng: 'a bag',             price: 9, pay: 10, change: 1 },
];

// ── Question generators ─────────────────────────────────────────────────────
function makeRmDistractors(total, count = 3) {
  const offsets = shuffle([-3, -2, -1, 1, 2, 3, -4, 4]).slice(0, count + 3);
  const cands = offsets.map(o => total + o).filter(x => x > 0 && x !== total);
  return [...new Set(cands)].slice(0, count);
}

function genKiraQ(notes) {
  const total = notes.reduce((s, n) => s + n.value, 0);
  return {
    type: 'kira',
    notes,
    question_bm:  'Berapa jumlah wang ini?',
    question_eng: 'What is the total amount?',
    options: shuffle([total, ...makeRmDistractors(total)]).map(v => ({
      key: String(v), label_bm: `RM ${v}`, label_eng: `RM ${v}`,
    })),
    answer: String(total),
  };
}

function genNilaiQ(denom) {
  const others = shuffle(RM_NOTES.filter(n => n.value !== denom.value)).slice(0, 3);
  return {
    type: 'nilai',
    denom,
    question_bm:  'Ini wang RM berapa?',
    question_eng: 'What is the value of this note?',
    options: shuffle([denom, ...others]).map(n => ({
      key: String(n.value), label_bm: `RM ${n.value}`, label_eng: `RM ${n.value}`,
    })),
    answer: String(denom.value),
  };
}

function genMasalahQ(t) {
  return {
    type: 'masalah',
    ...t,
    story_bm:  `Ali beli ${t.item_bm} berharga RM${t.price}. Ali bayar RM${t.pay}. Berapa baki?`,
    story_eng: `Ali buys ${t.item_eng} for RM${t.price}. Ali pays RM${t.pay}. How much change?`,
    options: shuffle([t.change, ...makeRmDistractors(t.change, 3)]).map(v => ({
      key: String(v), label_bm: `RM ${v}`, label_eng: `RM ${v}`,
    })),
    answer: String(t.change),
  };
}

function buildQuestions() {
  const kiraQs    = shuffle(KIRA_SCENARIOS).slice(0, 4).map(genKiraQ);
  const nilaiQs   = shuffle(RM_NOTES).map(genNilaiQ);
  const masalahQs = shuffle(MASALAH_POOL).slice(0, 4).map(genMasalahQ);
  return shuffle([...kiraQs, ...nilaiQs, ...masalahQs]);
}

const TYPE_META = {
  kira:    { bm: 'Kira Wang',    eng: 'Count Money',  emoji: '💰' },
  nilai:   { bm: 'Nilai Wang',   eng: 'Note Value',   emoji: '🏷️' },
  masalah: { bm: 'Masalah Wang', eng: 'Money Problem', emoji: '🛒' },
};
const emptyStats = () => ({
  kira:    { c: 0, t: 0 },
  nilai:   { c: 0, t: 0 },
  masalah: { c: 0, t: 0 },
});

// ── Component ───────────────────────────────────────────────────────────────
export default function CountingMoney({ onBack, language = 'bm' }) {
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
          <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>💰</div>
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

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FFE9CC', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />

      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div>
            <h1 style={{ color: '#FF9600', fontSize: '1.4rem', fontWeight: 900, marginBottom: '0.1rem' }}>
              💰 {language === 'bm' ? 'Pengira Wang' : 'Counting Money'}
            </h1>
            <p style={{ color: '#888', fontSize: '0.82rem' }}>
              {language === 'bm' ? 'Wang ringgit hingga RM10' : 'Malaysian Ringgit up to RM10'}
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

          {/* Kira: collection of notes */}
          {current.type === 'kira' && (
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginBottom: '0.75rem', padding: '0.5rem' }}>
              {current.notes.map((note, i) => (
                <MoneyNote key={i} denom={note} size="md" />
              ))}
            </div>
          )}

          {/* Nilai: single large note */}
          {current.type === 'nilai' && (
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
              <MoneyNote denom={current.denom} size="lg" />
            </div>
          )}

          {/* Masalah: story text */}
          {current.type === 'masalah' && (
            <div style={{ textAlign: 'left', background: '#FFF8F0', border: '2px solid #FFCF80', borderRadius: '14px', padding: '0.85rem 1rem', marginBottom: '0.75rem', fontSize: '0.95rem', lineHeight: 1.6, color: '#333', fontWeight: 700 }}>
              <span style={{ fontSize: '1.3rem', marginRight: '0.4rem' }}>🛒</span>
              {language === 'bm' ? current.story_bm : current.story_eng}
            </div>
          )}

          <p style={{ fontSize: '1rem', fontWeight: 800, color: '#333', marginTop: '0.25rem' }}>
            {language === 'bm' ? current.question_bm : current.question_eng}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
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
                  padding: '0.9rem 0.5rem', fontWeight: 900, fontSize: '1.15rem', color,
                  cursor: isAnswered ? 'default' : 'pointer',
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
