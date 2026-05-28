import React, { useState, useCallback, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../../utils/soundManager';
import BackButton from '../BackButton';

// KSSR Matematik Tahun 1 — Bidang Pembelajaran 2: Tambah dalam lingkungan 100.
// Three rotating mechanics test the bidang from concrete → abstract → applied:
//   1. Tambah Gambar (visual)   — count two emoji groups, sum ≤ 25
//   2. Operasi Tambah (symbolic)— a + b, mixed 1d/2d, up to 100, with/without carry
//   3. Cerita Tambah (story)    — BM word problems
// 12 questions/round (4 of each), shuffled. Per-mechanic stats in the report.

// ── Helpers ───────────────────────────────────────────────────────────────────
const randInt = (lo, hi) => Math.floor(Math.random() * (hi - lo + 1)) + lo;
const shuffle = (arr)    => [...arr].sort(() => Math.random() - 0.5);
const pick    = (arr)    => arr[Math.floor(Math.random() * arr.length)];

const EMOJIS = ['🍎', '🍌', '🍊', '🐠', '⭐', '🔵', '🍇', '🌸', '🍓', '🐝'];

// Distractors: ±1, ±2, ±10 — clamped to >0 and ≠ answer, deduped.
function makeDistractors(answer, count = 3) {
  const cands = new Set([answer + 1, answer - 1, answer + 10, answer - 10, answer + 2, answer - 2]
    .filter(x => x > 0 && x !== answer));
  return shuffle([...cands]).slice(0, count).map(String);
}

// ── Question generators ───────────────────────────────────────────────────────
function genVisualQ() {
  const a = randInt(4, 13);
  const b = randInt(3, 25 - a);     // sum ≤ 25
  const answer = a + b;
  return {
    type: 'visual',
    a, b, answer,
    emoji: pick(EMOJIS),
    question_bm:  'Kira jumlah.',
    question_eng: 'Find the total.',
    options: shuffle([String(answer), ...makeDistractors(answer)]),
    answerStr: String(answer),
  };
}

function genSymbolicQ() {
  const r = Math.random();
  let a, b;
  if (r < 0.35) {            // 1d + 1d
    a = randInt(2, 9);  b = randInt(2, 9);
  } else if (r < 0.65) {     // 2d + 1d
    a = randInt(11, 50); b = randInt(2, 9);
  } else {                   // 2d + 2d (mix of with/without carry)
    a = randInt(10, 50); b = randInt(10, 50);
    if (a + b > 99) b = randInt(10, Math.max(11, 99 - a));
  }
  const answer = a + b;
  return {
    type: 'symbolic',
    a, b, answer,
    question_bm:  'Berapa jumlahnya?',
    question_eng: 'What is the sum?',
    options: shuffle([String(answer), ...makeDistractors(answer)]),
    answerStr: String(answer),
  };
}

// Story pool — fixed bank of 12, shuffled per round.
const STORIES = [
  { emoji: '🍎', a: 12, b: 8,  bm: 'Ada 12 epal. Adik beri 8 lagi. Berapa semua?',                    eng: 'There are 12 apples. My sister gives 8 more. How many in all?' },
  { emoji: '🔵', a: 24, b: 15, bm: 'Saya ada 24 guli. Ali beri 15 lagi. Berapa semua guli?',          eng: 'I have 24 marbles. Ali gives 15 more. How many marbles in all?' },
  { emoji: '🎒', a: 35, b: 28, bm: 'Ada 35 pelajar lelaki dan 28 pelajar perempuan. Berapa semua?',   eng: 'There are 35 boys and 28 girls. How many pupils in all?' },
  { emoji: '💵', a: 18, b: 7,  bm: 'Ibu beri saya RM18. Ayah beri RM7. Berapa jumlah duit?',          eng: 'Mother gave me RM18. Father gave RM7. How much money in all?' },
  { emoji: '🐠', a: 14, b: 6,  bm: 'Ada 14 ikan dalam akuarium. 6 lagi dimasukkan. Berapa semua?',    eng: 'There are 14 fish in the tank. 6 more are added. How many in all?' },
  { emoji: '🥚', a: 17, b: 8,  bm: 'Burung ada 17 telur. 8 lagi diletak. Berapa semua telur?',        eng: 'A bird has 17 eggs. 8 more are laid. How many eggs in all?' },
  { emoji: '🔴', a: 22, b: 19, bm: 'Saya beli 22 manik biru dan 19 manik merah. Berapa manik semua?', eng: 'I bought 22 blue beads and 19 red beads. How many beads in all?' },
  { emoji: '🚗', a: 30, b: 25, bm: 'Ada 30 kereta di tempat letak. 25 buah masuk lagi. Berapa semua?', eng: 'There are 30 cars parked. 25 more come in. How many cars in all?' },
  { emoji: '🍬', a: 7,  b: 12, bm: 'Adik makan 7 gula-gula pagi. 12 gula-gula petang. Berapa semua?', eng: 'My sister ate 7 sweets in the morning, 12 in the afternoon. How many in all?' },
  { emoji: '📚', a: 45, b: 38, bm: 'Ada 45 buku di rak. 38 lagi dibeli. Berapa buku semua?',          eng: 'There are 45 books on the shelf. 38 more are bought. How many books in all?' },
  { emoji: '🌸', a: 13, b: 18, bm: 'Saya jumpa 13 bunga merah dan 18 bunga kuning. Berapa semua?',    eng: 'I found 13 red flowers and 18 yellow flowers. How many in all?' },
  { emoji: '👧', a: 28, b: 32, bm: 'Kelas A ada 28 murid. Kelas B ada 32 murid. Berapa murid semua?', eng: 'Class A has 28 pupils. Class B has 32 pupils. How many pupils in all?' },
];

function genStoryQ(story) {
  const answer = story.a + story.b;
  // story-specific distractors: include the two operands themselves (common mistake)
  const cands = new Set([answer + 1, answer - 1, answer + 10, story.a, story.b]
    .filter(x => x > 0 && x !== answer));
  const distractors = shuffle([...cands]).slice(0, 3).map(String);
  return {
    type: 'story',
    a: story.a, b: story.b, answer,
    emoji: story.emoji,
    question_bm:  story.bm,
    question_eng: story.eng,
    options: shuffle([String(answer), ...distractors]),
    answerStr: String(answer),
  };
}

function buildQuestions() {
  const stories = shuffle(STORIES).slice(0, 4);
  const qs = [];
  for (let i = 0; i < 4; i++) qs.push(genVisualQ());
  for (let i = 0; i < 4; i++) qs.push(genSymbolicQ());
  stories.forEach(s => qs.push(genStoryQ(s)));
  return shuffle(qs);
}

const TYPE_META = {
  visual:   { bm: 'Tambah Gambar',  eng: 'Visual Add',  emoji: '🖼️' },
  symbolic: { bm: 'Operasi Tambah', eng: 'Equations',   emoji: '➕' },
  story:    { bm: 'Cerita Tambah',  eng: 'Word Story',  emoji: '📖' },
};
const emptyStats = () => ({ visual: { c: 0, t: 0 }, symbolic: { c: 0, t: 0 }, story: { c: 0, t: 0 } });

// ── Component ─────────────────────────────────────────────────────────────────
export default function Tambah100({ onBack, language = 'bm' }) {
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
  const isCorrect  = isAnswered && selected === current?.answerStr;
  const isLastQ    = index + 1 >= questions.length;

  const handleSelect = useCallback((option) => {
    if (isAnswered || !current) return;
    setSelected(option);
    const correct = option === current.answerStr;
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

  // Safety net: auto-advance to report 2s after final answer if user
  // ignores the Tamat button.
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
          <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>➕</div>
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
              ➕ {language === 'bm' ? 'Tambah dalam 100' : 'Add within 100'}
            </h1>
            <p style={{ color: '#888', fontSize: '0.82rem' }}>
              {language === 'bm' ? 'Gambar, operasi & cerita' : 'Visual, equation & word problem'}
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
          <p style={{ fontSize: '0.72rem', fontWeight: 800, color: '#E53935', marginBottom: '0.5rem', letterSpacing: '0.6px' }}>
            {typeLabel.emoji} {language === 'bm' ? typeLabel.bm.toUpperCase() : typeLabel.eng.toUpperCase()}
          </p>

          {/* Visual addition — two emoji groups */}
          {current.type === 'visual' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', margin: '0.5rem 0' }}>
                {/* Group A */}
                <div style={{ background: '#FFEBEE', border: '2px solid #FFCDD2', borderRadius: '14px', padding: '0.5rem 0.75rem', maxWidth: '180px' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2px', fontSize: '1.25rem', lineHeight: 1.1 }}>
                    {Array.from({ length: current.a }).map((_, i) => <span key={i}>{current.emoji}</span>)}
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#E53935', marginTop: '4px' }}>{current.a}</div>
                </div>

                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#E53935' }}>+</div>

                {/* Group B */}
                <div style={{ background: '#E3F2FD', border: '2px solid #BBDEFB', borderRadius: '14px', padding: '0.5rem 0.75rem', maxWidth: '180px' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2px', fontSize: '1.25rem', lineHeight: 1.1 }}>
                    {Array.from({ length: current.b }).map((_, i) => <span key={i}>{current.emoji}</span>)}
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1976D2', marginTop: '4px' }}>{current.b}</div>
                </div>
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#333', marginTop: '0.5rem' }}>
                {current.a} + {current.b} = <span style={{ color: '#E53935' }}>?</span>
              </div>
            </>
          )}

          {/* Symbolic addition */}
          {current.type === 'symbolic' && (
            <div style={{ fontSize: '3rem', fontWeight: 900, color: '#333', margin: '0.5rem 0', lineHeight: 1.2 }}>
              {current.a} <span style={{ color: '#E53935' }}>+</span> {current.b} = <span style={{ color: '#E53935' }}>?</span>
            </div>
          )}

          {/* Story problem */}
          {current.type === 'story' && (
            <>
              <div style={{ fontSize: '3.5rem', lineHeight: 1, marginBottom: '0.5rem' }}>{current.emoji}</div>
              <p style={{ fontSize: '1rem', fontWeight: 800, color: '#333', lineHeight: 1.4 }}>
                {language === 'bm' ? current.question_bm : current.question_eng}
              </p>
            </>
          )}

          {/* Prompt line for visual/symbolic */}
          {current.type !== 'story' && (
            <p style={{ fontSize: '0.95rem', fontWeight: 700, color: '#888', marginTop: '0.5rem' }}>
              {language === 'bm' ? current.question_bm : current.question_eng}
            </p>
          )}
        </div>

        {/* MCQ options */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
          {current.options.map((option, idx) => {
            const chosen      = selected === option;
            const isAnswerOpt = option === current.answerStr;
            const showCorrect = isAnswered && isAnswerOpt;
            const showWrong   = isAnswered && chosen && !isAnswerOpt;
            let bg = '#FFFFFF', border = '#FFCF80', color = '#333';
            if (showCorrect) { bg = '#E8F5E9'; border = '#4CAF50'; color = '#2E7D32'; }
            else if (showWrong) { bg = '#FFEBEE'; border = '#FF6B6B'; color = '#C62828'; }
            else if (isAnswered) { color = '#999'; }
            return (
              <button
                key={idx}
                onClick={() => handleSelect(option)}
                disabled={isAnswered}
                style={{
                  background: bg,
                  border: `3px solid ${border}`,
                  borderRadius: '14px',
                  padding: '0.9rem',
                  fontWeight: 900,
                  fontSize: '1.6rem',
                  color,
                  cursor: isAnswered ? 'default' : 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'center',
                }}
              >
                {option}
                {showCorrect && ' ✓'}
                {showWrong && ' ✗'}
              </button>
            );
          })}
        </div>

        {/* Feedback line */}
        {isAnswered && (
          <div style={{ marginTop: '0.75rem', textAlign: 'center', fontSize: '0.9rem', fontWeight: 700, color: isCorrect ? '#2E7D32' : '#C62828' }}>
            {isCorrect
              ? (language === 'bm' ? '✓ Betul!' : '✓ Correct!')
              : (language === 'bm' ? `Jawapan: ${current.a} + ${current.b} = ${current.answer}` : `Answer: ${current.a} + ${current.b} = ${current.answer}`)}
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
