import React, { useState, useCallback, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../../utils/soundManager';
import BackButton from '../BackButton';

// KSSR Matematik Tahun 1 — Bidang Pembelajaran 6: Ukuran Panjang.
// Three rotating mechanics cover the bidang's core Standard Pembelajaran:
//   1. Banding         — compare 2 bars, pick the panjang / pendek colour
//   2. Ukur cm         — read length off a ruler (cm = unit piawai); object label
//                        varies (pensel/krayon/daun/kayu/pen/ulat) for variety
//   3. Paling …        — pick the paling panjang / paling pendek from 3 bars
// 12 questions/round, per-mechanic stats. Bars are pixel-precise inline rects
// so kids can visually verify length differences against the ruler markings.

// ── Helpers ───────────────────────────────────────────────────────────────────
const randInt = (lo, hi) => Math.floor(Math.random() * (hi - lo + 1)) + lo;
const shuffle = (arr)    => [...arr].sort(() => Math.random() - 0.5);
const UNIT_PX = 26;  // pixel width per length unit

// ── Colour palette for the bars (BM names) ────────────────────────────────────
const COLOURS = [
  { id: 'merah',  name: { bm: 'Merah',  eng: 'Red'    }, css: '#E53935', dark: '#B71C1C' },
  { id: 'biru',   name: { bm: 'Biru',   eng: 'Blue'   }, css: '#1E88E5', dark: '#0D47A1' },
  { id: 'hijau',  name: { bm: 'Hijau',  eng: 'Green'  }, css: '#43A047', dark: '#1B5E20' },
  { id: 'kuning', name: { bm: 'Kuning', eng: 'Yellow' }, css: '#F9A825', dark: '#F57F17' },
  { id: 'ungu',   name: { bm: 'Ungu',   eng: 'Purple' }, css: '#8E24AA', dark: '#4A148C' },
  { id: 'oren',   name: { bm: 'Oren',   eng: 'Orange' }, css: '#FB8C00', dark: '#E65100' },
];
const colourById = (id) => COLOURS.find(c => c.id === id);

// Object pool for the cm ruler measurement — gives each measure question variety.
const OBJECTS = [
  { id: 'pensel', emoji: '✏️', name: { bm: 'pensel', eng: 'pencil' } },
  { id: 'krayon', emoji: '🖍️', name: { bm: 'krayon', eng: 'crayon' } },
  { id: 'pen',    emoji: '🖊️', name: { bm: 'pen',    eng: 'pen'    } },
  { id: 'daun',   emoji: '🍃', name: { bm: 'daun',   eng: 'leaf'   } },
  { id: 'kayu',   emoji: '🪵', name: { bm: 'kayu',   eng: 'stick'  } },
  { id: 'ulat',   emoji: '🐛', name: { bm: 'ulat',   eng: 'worm'   } },
];

// ── Question generators ───────────────────────────────────────────────────────
function genCompareQ() {
  const [c1, c2] = shuffle(COLOURS).slice(0, 2);
  let l1, l2;
  do {
    l1 = randInt(3, 9);
    l2 = randInt(3, 9);
  } while (Math.abs(l1 - l2) < 2); // ensure clearly different lengths
  const askLonger = Math.random() < 0.5;
  const winner = (askLonger ? (l1 > l2 ? c1 : c2) : (l1 < l2 ? c1 : c2));
  return {
    type: 'compare',
    bars: [{ ...c1, len: l1 }, { ...c2, len: l2 }],
    askLonger,
    question_bm:  askLonger ? 'Mana lebih panjang?' : 'Mana lebih pendek?',
    question_eng: askLonger ? 'Which is longer?'    : 'Which is shorter?',
    options: shuffle([
      { key: c1.id, label_bm: c1.name.bm, label_eng: c1.name.eng, css: c1.css },
      { key: c2.id, label_bm: c2.name.bm, label_eng: c2.name.eng, css: c2.css },
    ]),
    answer: winner.id,
  };
}

function genMeasureQ() {
  const c   = COLOURS[Math.floor(Math.random() * COLOURS.length)];
  const obj = OBJECTS[Math.floor(Math.random() * OBJECTS.length)];
  const len = randInt(3, 10); // cm
  // Distractors: ±1, ±2 — clamped to >0 and ≠ answer.
  const cands = new Set([len - 1, len + 1, len - 2, len + 2].filter(x => x > 0 && x !== len));
  const distractors = shuffle([...cands]).slice(0, 3).map(String);
  return {
    type: 'measure',
    bar: { ...c, len },
    object: obj,
    question_bm:  `Berapa cm panjang ${obj.name.bm} ini?`,
    question_eng: `How many cm long is this ${obj.name.eng}?`,
    options: shuffle([String(len), ...distractors]).map(v => ({ key: v, label_bm: `${v} cm`, label_eng: `${v} cm` })),
    answer: String(len),
  };
}

function genSuperlativeQ() {
  const three = shuffle(COLOURS).slice(0, 3);
  // Distinct lengths with gap of ≥1 in 3..9
  let lens;
  do {
    lens = [randInt(3, 9), randInt(3, 9), randInt(3, 9)];
  } while (new Set(lens).size < 3);
  const bars = three.map((c, i) => ({ ...c, len: lens[i] }));
  const askLongest = Math.random() < 0.5;
  const sorted = [...bars].sort((a, b) => a.len - b.len);
  const winner = askLongest ? sorted[sorted.length - 1] : sorted[0];
  return {
    type: 'superlative',
    bars,
    askLongest,
    question_bm:  askLongest ? 'Mana yang paling panjang?' : 'Mana yang paling pendek?',
    question_eng: askLongest ? 'Which is the longest?'      : 'Which is the shortest?',
    options: shuffle(bars).map(b => ({ key: b.id, label_bm: b.name.bm, label_eng: b.name.eng, css: b.css })),
    answer: winner.id,
  };
}

function buildQuestions() {
  const qs = [];
  for (let i = 0; i < 4; i++) qs.push(genCompareQ());
  for (let i = 0; i < 4; i++) qs.push(genMeasureQ());
  for (let i = 0; i < 4; i++) qs.push(genSuperlativeQ());
  return shuffle(qs);
}

const TYPE_META = {
  compare:     { bm: 'Banding',         eng: 'Compare',  emoji: '⚖️' },
  measure:     { bm: 'Ukur cm',         eng: 'Measure',  emoji: '📏' },
  superlative: { bm: 'Paling Panjang',  eng: 'Longest',  emoji: '🏆' },
};
const emptyStats = () => ({ compare: { c: 0, t: 0 }, measure: { c: 0, t: 0 }, superlative: { c: 0, t: 0 } });

// ── Reusable Bar (rounded inline rect with depth shadow) ──────────────────────
function Bar({ len, css, dark }) {
  return (
    <div style={{
      width: `${len * UNIT_PX}px`,
      height: '24px',
      background: css,
      borderRadius: '999px',
      boxShadow: `0 3px 0 ${dark}`,
      flexShrink: 0,
    }} />
  );
}

// ── Ruler (cm marks 0..maxCm with numbers underneath) ─────────────────────────
// Tick marks and numbers are positioned absolutely at exact i * UNIT_PX so they
// align with the bar above to the pixel. Two-digit numbers (10, 11) fit because
// each cm cell is UNIT_PX = 26 px wide and the number font is small (0.66rem).
const RULER_MAX = 11;
function Ruler({ maxCm = RULER_MAX }) {
  const width = maxCm * UNIT_PX;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      {/* Ruler body with tick marks on top */}
      <div style={{
        width: `${width}px`,
        height: '14px',
        background: '#FFE082',
        border: '1.5px solid #F9A825',
        borderTop: '2px solid #F9A825',
        borderRadius: '2px 2px 4px 4px',
        position: 'relative',
        boxSizing: 'content-box',
      }}>
        {Array.from({ length: maxCm + 1 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${i * UNIT_PX}px`,
            top: 0,
            width: '2px',
            height: i % 5 === 0 ? '12px' : '7px',
            background: '#5D4037',
            transform: 'translateX(-1px)',
          }} />
        ))}
      </div>
      {/* Numbers below each cm mark */}
      <div style={{ width: `${width}px`, position: 'relative', height: '14px', marginTop: '3px' }}>
        {Array.from({ length: maxCm + 1 }).map((_, i) => (
          <span key={i} style={{
            position: 'absolute',
            left: `${i * UNIT_PX}px`,
            top: 0,
            fontSize: '0.66rem',
            fontWeight: 800,
            color: i % 5 === 0 ? '#3E2723' : '#888',
            transform: 'translateX(-50%)',
          }}>
            {i}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function UkurPanjang({ onBack, language = 'bm' }) {
  const [questions, setQuestions]   = useState(() => buildQuestions());
  const [index,     setIndex]       = useState(0);
  const [selected,  setSelected]    = useState(null);
  const [score,     setScore]       = useState(0);
  const [streak,    setStreak]      = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [stats,     setStats]       = useState(emptyStats);
  const [complete,  setComplete]    = useState(false);

  const current    = questions[index];
  const isAnswered = selected !== null;
  const isCorrect  = isAnswered && selected === current?.answer;
  const isLastQ    = index + 1 >= questions.length;

  const handleSelect = useCallback((optionKey) => {
    if (isAnswered || !current) return;
    setSelected(optionKey);
    const correct = optionKey === current.answer;
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
    if (isLastQ) {
      setComplete(true);
      confetti({ particleCount: 200, spread: 160, origin: { y: 0.4 } });
      return;
    }
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
    setIndex(0);
    setSelected(null);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setStats(emptyStats());
    setComplete(false);
  }, []);

  // ── Complete screen ────────────────────────────────────────────────────────
  if (complete) {
    const pct = Math.round((score / questions.length) * 100);
    const verdict = pct >= 90 ? { bm: 'Cemerlang!', eng: 'Excellent!', color: '#2E7D32' }
                  : pct >= 70 ? { bm: 'Bagus!',     eng: 'Good job!',   color: '#388E3C' }
                  : pct >= 50 ? { bm: 'Boleh lagi!', eng: 'Keep going!', color: '#F57C00' }
                              : { bm: 'Cuba lagi!', eng: 'Try again!',  color: '#C62828' };
    return (
      <div style={{ minHeight: '100%', background: '#FFE9CC', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        <BackButton onClick={onBack} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3.5rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
          <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>📏</div>
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
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '0.75rem' }}>
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
                    <span style={{ fontWeight: 900, fontSize: '0.85rem', color: barColor }}>
                      {s.c}/{s.t} · {p}%
                    </span>
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

  // ── Active game ────────────────────────────────────────────────────────────
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FFE9CC', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />

      {/* ── Header ── */}
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div>
            <h1 style={{ color: '#FF9600', fontSize: '1.4rem', fontWeight: 900, marginBottom: '0.1rem' }}>
              📏 {language === 'bm' ? 'Ukur Panjang' : 'Measure Length'}
            </h1>
            <p style={{ color: '#888', fontSize: '0.82rem' }}>
              {language === 'bm' ? 'Banding, ukur & cari paling panjang' : 'Compare, measure & find the longest'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
            <div style={{ background: '#FFF6D6', borderRadius: '999px', padding: '4px 12px', fontWeight: 900, fontSize: '0.82rem', color: '#B58800', border: '1.5px solid #FFE08A' }}>
              ⭐ {score}
            </div>
            <div style={{ background: '#FFEAD0', borderRadius: '999px', padding: '4px 12px', fontWeight: 900, fontSize: '0.82rem', color: '#D9610B', border: '1.5px solid #FFC081' }}>
              🔥 {streak}
            </div>
          </div>
        </div>
        <div style={{ background: '#FFD9A8', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
          <div style={{ background: '#FF9600', height: '100%', borderRadius: '999px', width: `${(index / questions.length) * 100}%`, transition: 'width 0.3s' }} />
        </div>
        <p style={{ textAlign: 'center', color: '#888', fontSize: '0.78rem', marginTop: '0.35rem' }}>
          {index + 1} / {questions.length}
        </p>
      </div>

      {/* ── Body ── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>

        {/* Question card */}
        <div style={{ background: '#FFFFFF', border: '3px solid #FFCF80', borderRadius: '24px', padding: '1.25rem 1rem', textAlign: 'center', marginBottom: '1rem', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 800, color: '#00897B', marginBottom: '0.75rem', letterSpacing: '0.6px' }}>
            {typeLabel.emoji} {language === 'bm' ? typeLabel.bm.toUpperCase() : typeLabel.eng.toUpperCase()}
          </p>

          {/* Compare — 2 bars stacked, both left-aligned */}
          {current.type === 'compare' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'flex-start', padding: '0.5rem 0.25rem 0.75rem' }}>
              {current.bars.map((b) => (
                <Bar key={b.id} len={b.len} css={b.css} dark={b.dark} />
              ))}
            </div>
          )}

          {/* Measure — coloured bar starting at cm 0, extending to cm len,
              with a cm-numbered ruler underneath. Bar width is pixel-precise
              (len × UNIT_PX) so the kid reads the cm where the bar ends.
              Object emoji is intentionally NOT shown — the object name in the
              question text ("…panjang pen ini?") tells them what it is. */}
          {current.type === 'measure' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px', padding: '0.75rem 0.25rem 0.5rem' }}>
              <Bar len={current.bar.len} css={current.bar.css} dark={current.bar.dark} />
              <Ruler maxCm={RULER_MAX} />
            </div>
          )}

          {/* Superlative — 3 bars stacked, left-aligned with colour label on the left */}
          {current.type === 'superlative' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start', padding: '0.5rem 0.25rem 0.75rem' }}>
              {current.bars.map((b) => (
                <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '60px', textAlign: 'left', fontWeight: 800, fontSize: '0.82rem', color: b.css }}>
                    {b.name[language] ?? b.name.bm}
                  </span>
                  <Bar len={b.len} css={b.css} dark={b.dark} />
                </div>
              ))}
            </div>
          )}

          <p style={{ fontSize: '1rem', fontWeight: 800, color: '#333', marginTop: '0.5rem' }}>
            {language === 'bm' ? current.question_bm : current.question_eng}
          </p>
        </div>

        {/* MCQ options */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: current.type === 'superlative' ? '1fr 1fr 1fr' : '1fr 1fr',
          gap: '0.6rem',
        }}>
          {current.options.map((opt, idx) => {
            const chosen      = selected === opt.key;
            const isAnswerOpt = opt.key === current.answer;
            const showCorrect = isAnswered && isAnswerOpt;
            const showWrong   = isAnswered && chosen && !isAnswerOpt;
            let bg = '#FFFFFF', border = opt.css || '#FFCF80', color = '#333';
            if (showCorrect) { bg = '#E8F5E9'; border = '#4CAF50'; color = '#2E7D32'; }
            else if (showWrong) { bg = '#FFEBEE'; border = '#FF6B6B'; color = '#C62828'; }
            else if (opt.css) { color = opt.css; }
            return (
              <button
                key={idx}
                onClick={() => handleSelect(opt.key)}
                disabled={isAnswered}
                style={{
                  background: bg,
                  border: `3px solid ${border}`,
                  borderRadius: '14px',
                  padding: '0.85rem 0.5rem',
                  fontWeight: 900,
                  fontSize: current.type === 'measure' ? '1.5rem' : '1.05rem',
                  color,
                  cursor: isAnswered ? 'default' : 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'center',
                }}>
                {language === 'bm' ? opt.label_bm : opt.label_eng}
                {showCorrect && ' ✓'}
                {showWrong && ' ✗'}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {isAnswered && (
          <div style={{ marginTop: '0.75rem', textAlign: 'center', fontSize: '0.9rem', fontWeight: 700, color: isCorrect ? '#2E7D32' : '#C62828' }}>
            {isCorrect
              ? (language === 'bm' ? '✓ Betul!' : '✓ Correct!')
              : (language === 'bm'
                  ? `Jawapan: ${current.type === 'measure' ? current.answer + ' cm' : colourById(current.answer)?.name.bm}`
                  : `Answer: ${current.type === 'measure' ? current.answer + ' cm' : colourById(current.answer)?.name.eng}`)}
          </div>
        )}
      </div>

      {/* ── Footer ── */}
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
