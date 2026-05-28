import React, { useState, useCallback, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../../utils/soundManager';
import BackButton from '../BackButton';

// KSSR Matematik Tahun 1 — Bidang Pembelajaran 1: Nombor Bulat hingga 100.
// Three rotating mechanics test the bidang's main Standard Pembelajaran:
//   1. Read & name numerals 0-100         (Sebut Nombor — pick BM name)
//   2. Compare two numbers                (Banding — bigger/smaller)
//   3. Place value (puluh dan sa)         (Nilai Tempat — visual base-10 blocks)
// 12 questions/round (4 of each), shuffled. Distractors are crafted to expose
// the common Tahun 1 mistakes (reversed digits, ±10, ±1, confused puluh/sa).

// ── BM number names ───────────────────────────────────────────────────────────
const ONES  = ['sifar','satu','dua','tiga','empat','lima','enam','tujuh','lapan','sembilan'];
const TEENS = ['sepuluh','sebelas','dua belas','tiga belas','empat belas','lima belas','enam belas','tujuh belas','lapan belas','sembilan belas'];
const TENS  = ['','','dua puluh','tiga puluh','empat puluh','lima puluh','enam puluh','tujuh puluh','lapan puluh','sembilan puluh'];

function numToBM(n) {
  if (n < 0 || n > 100) return '';
  if (n === 100) return 'seratus';
  if (n < 10)    return ONES[n];
  if (n < 20)    return TEENS[n - 10];
  const t = Math.floor(n / 10), o = n % 10;
  return o === 0 ? TENS[t] : `${TENS[t]} ${ONES[o]}`;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const randInt   = (lo, hi) => Math.floor(Math.random() * (hi - lo + 1)) + lo;
const shuffle   = (arr) => [...arr].sort(() => Math.random() - 0.5);
const QUESTIONS_PER_ROUND = 12;

// ── Question generators ───────────────────────────────────────────────────────
function genReadQ() {
  const n = randInt(10, 99);
  const t = Math.floor(n / 10), o = n % 10;
  const candidates = new Set();
  const reversed = o === 0 ? -1 : o * 10 + t;
  if (reversed >= 10 && reversed <= 99 && reversed !== n) candidates.add(reversed);
  if (n - 10 >= 10) candidates.add(n - 10);
  if (n + 10 <= 99) candidates.add(n + 10);
  if (n - 1  >= 10) candidates.add(n - 1);
  if (n + 1  <= 99) candidates.add(n + 1);
  const distractors = shuffle([...candidates]).slice(0, 3);
  const options = shuffle([n, ...distractors].map(numToBM));
  return {
    type: 'read',
    n,
    question_bm:  'Apakah nama nombor ini?',
    question_eng: 'What is the name of this number?',
    options,
    answer: numToBM(n),
  };
}

function genCompareQ() {
  let a, b;
  do { a = randInt(10, 99); b = randInt(10, 99); } while (a === b);
  const askBigger = Math.random() < 0.5;
  const answer = askBigger ? Math.max(a, b) : Math.min(a, b);
  return {
    type: 'compare',
    a, b, askBigger,
    question_bm:  askBigger ? 'Mana lebih besar?' : 'Mana lebih kecil?',
    question_eng: askBigger ? 'Which is bigger?' : 'Which is smaller?',
    options: shuffle([String(a), String(b)]),
    answer: String(answer),
  };
}

function genPlaceQ() {
  const n = randInt(11, 99); // need both digits non-trivial
  const t = Math.floor(n / 10), o = n % 10;
  const askTens = Math.random() < 0.5;
  const answer  = askTens ? t : o;
  const other   = askTens ? o : t;
  // distractors: the other digit, ±1, +5 — all mod 10, deduped, != answer
  const cands = new Set([other, (answer + 1) % 10, (answer + 9) % 10, (answer + 5) % 10]);
  cands.delete(answer);
  const distractors = [...cands].slice(0, 3);
  return {
    type: 'place',
    n, askTens,
    question_bm:  askTens ? 'Berapa puluh?' : 'Berapa sa?',
    question_eng: askTens ? 'How many tens?' : 'How many ones?',
    options: shuffle([String(answer), ...distractors.map(String)]),
    answer: String(answer),
  };
}

function buildQuestions() {
  const qs = [];
  for (let i = 0; i < 4; i++) qs.push(genReadQ());
  for (let i = 0; i < 4; i++) qs.push(genCompareQ());
  for (let i = 0; i < 4; i++) qs.push(genPlaceQ());
  return shuffle(qs).slice(0, QUESTIONS_PER_ROUND);
}

const TYPE_META = {
  read:    { bm: 'Sebut Nombor',  eng: 'Read Number',  emoji: '🔢' },
  compare: { bm: 'Banding',       eng: 'Compare',      emoji: '⚖️' },
  place:   { bm: 'Nilai Tempat',  eng: 'Place Value',  emoji: '🟦' },
};
const emptyStats = () => ({ read: { c: 0, t: 0 }, compare: { c: 0, t: 0 }, place: { c: 0, t: 0 } });

// ── Place-value visual (base-10 blocks) ───────────────────────────────────────
// Bars (puluh, indigo) and dots (sa, orange) shown side-by-side, each with its
// own label directly underneath — the visual link between the digit colour in
// the number above and the block group is the whole point.
const PlaceValueBlocks = React.memo(function PlaceValueBlocks({ n }) {
  const tens = Math.floor(n / 10);
  const ones = n % 10;
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '28px', padding: '0.5rem 0' }}>
      {/* Tens column */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
        <div style={{ display: 'flex', gap: '5px', alignItems: 'flex-end', minHeight: '70px' }}>
          {tens > 0 ? Array.from({ length: tens }).map((_, i) => (
            <div key={`t${i}`} style={{ width: '14px', height: '70px', background: '#3F51B5', borderRadius: '3px', boxShadow: '0 2px 0 #303F9F' }} />
          )) : <div style={{ width: '14px', height: '70px', border: '2px dashed #C5CAE9', borderRadius: '3px' }} />}
        </div>
        <div style={{ fontSize: '0.78rem', fontWeight: 900, color: '#3F51B5', letterSpacing: '0.5px' }}>PULUH</div>
        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#9FA8DA' }}>× 10</div>
      </div>

      {/* Ones column */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px', minWidth: '76px', minHeight: '70px', alignContent: 'flex-end' }}>
          {ones > 0 ? Array.from({ length: ones }).map((_, i) => (
            <div key={`o${i}`} style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF9800', boxShadow: '0 1px 0 #D47A00' }} />
          )) : <div style={{ gridColumn: '1 / -1', alignSelf: 'flex-end', textAlign: 'center', fontSize: '0.7rem', fontWeight: 700, color: '#FFCC80' }}>—</div>}
        </div>
        <div style={{ fontSize: '0.78rem', fontWeight: 900, color: '#E68900', letterSpacing: '0.5px' }}>SA</div>
        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#FFCC80' }}>× 1</div>
      </div>
    </div>
  );
});

// ── Component ─────────────────────────────────────────────────────────────────
export default function Nombor100({ onBack, language = 'bm' }) {
  const [questions, setQuestions] = useState(() => buildQuestions());
  const [index,     setIndex]     = useState(0);
  const [selected,  setSelected]  = useState(null);
  const [score,     setScore]     = useState(0);
  const [streak,    setStreak]    = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [stats,     setStats]     = useState(emptyStats);
  const [complete,  setComplete]  = useState(false);

  const current      = questions[index];
  const isAnswered   = selected !== null;
  const isCorrect    = isAnswered && selected === current?.answer;
  const isLastQ      = index + 1 >= questions.length;

  const handleSelect = useCallback((option) => {
    if (isAnswered || !current) return;
    setSelected(option);
    const correct = option === current.answer;
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

  // Safety net: even if the user misses the Tamat button on the last question,
  // auto-advance to the report 2s after they've answered so it can't be missed.
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

  // ── Complete screen — report with per-mechanic breakdown ───────────────────
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

          {/* Header */}
          <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>💯</div>
          <h2 style={{ color: verdict.color, fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.25rem' }}>
            {language === 'bm' ? verdict.bm : verdict.eng}
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#888', marginBottom: '1rem' }}>
            {language === 'bm' ? 'Laporan Markah' : 'Score Report'}
          </p>

          {/* Big score card */}
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

          {/* Per-mechanic breakdown */}
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

          {/* Actions */}
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

  // ── Question label per type ────────────────────────────────────────────────
  const typeLabel = current.type === 'read'
    ? { bm: 'SEBUT NOMBOR', eng: 'READ THE NUMBER' }
    : current.type === 'compare'
      ? { bm: 'BANDING NOMBOR', eng: 'COMPARE' }
      : { bm: 'NILAI TEMPAT', eng: 'PLACE VALUE' };

  // ── Active game ────────────────────────────────────────────────────────────
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FFE9CC', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />

      {/* ── Header ── */}
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div>
            <h1 style={{ color: '#FF9600', fontSize: '1.4rem', fontWeight: 900, marginBottom: '0.1rem' }}>
              💯 {language === 'bm' ? 'Nombor 1–100' : 'Numbers 1–100'}
            </h1>
            <p style={{ color: '#888', fontSize: '0.82rem' }}>
              {language === 'bm' ? 'Baca, banding & nilai tempat' : 'Read, compare & place value'}
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
        {/* Progress bar */}
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
          <p style={{ fontSize: '0.72rem', fontWeight: 800, color: '#3F51B5', marginBottom: '0.5rem', letterSpacing: '0.6px' }}>
            {language === 'bm' ? typeLabel.bm : typeLabel.eng}
          </p>

          {/* Visual — varies by type */}
          {current.type === 'read' && (
            <div style={{ fontSize: '5.5rem', fontWeight: 900, color: '#3F51B5', lineHeight: 1, margin: '0.25rem 0' }}>
              {current.n}
            </div>
          )}
          {current.type === 'compare' && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', margin: '0.5rem 0' }}>
              <span style={{ fontSize: '3.5rem', fontWeight: 900, color: '#3F51B5' }}>{current.a}</span>
              <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#888' }}>vs</span>
              <span style={{ fontSize: '3.5rem', fontWeight: 900, color: '#3F51B5' }}>{current.b}</span>
            </div>
          )}
          {current.type === 'place' && (
            <>
              {/* Number with colour-coded digits — tens=indigo (matches bars), ones=orange (matches dots) */}
              <div style={{ fontSize: '3.6rem', fontWeight: 900, lineHeight: 1, margin: '0.25rem 0' }}>
                <span style={{ color: '#3F51B5' }}>{Math.floor(current.n / 10)}</span>
                <span style={{ color: '#FF9800' }}>{current.n % 10}</span>
              </div>
              <PlaceValueBlocks n={current.n} />
            </>
          )}

          {/* Question text — colour-highlight "puluh"/"sa" so the question links to the visual */}
          {current.type === 'place' ? (
            <p style={{ fontSize: '1.15rem', fontWeight: 800, color: '#333', marginTop: '0.75rem' }}>
              {language === 'bm' ? 'Berapa ' : 'How many '}
              <span style={{ color: current.askTens ? '#3F51B5' : '#E68900', fontWeight: 900, textDecoration: 'underline', textDecorationThickness: '3px', textUnderlineOffset: '3px' }}>
                {language === 'bm' ? (current.askTens ? 'puluh' : 'sa') : (current.askTens ? 'tens' : 'ones')}
              </span>
              {language === 'bm' ? '?' : '?'}
            </p>
          ) : (
            <p style={{ fontSize: '1rem', fontWeight: 800, color: '#333', marginTop: '0.75rem' }}>
              {language === 'bm' ? current.question_bm : current.question_eng}
            </p>
          )}
        </div>

        {/* MCQ options */}
        <div style={{ display: 'grid', gridTemplateColumns: current.options.length === 2 ? '1fr 1fr' : '1fr', gap: '0.6rem' }}>
          {current.options.map((option, idx) => {
            const chosen      = selected === option;
            const isAnswerOpt = option === current.answer;
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
                  padding: current.options.length === 2 ? '1rem' : '0.85rem 1rem',
                  fontWeight: 800,
                  fontSize: current.type === 'read' ? '0.95rem' : '1.3rem',
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

        {/* Feedback line — for compare/place, show the BM name of the correct answer too */}
        {isAnswered && (
          <div style={{ marginTop: '0.75rem', textAlign: 'center', fontSize: '0.85rem', fontWeight: 700, color: isCorrect ? '#2E7D32' : '#C62828' }}>
            {isCorrect
              ? (language === 'bm' ? '✓ Betul!' : '✓ Correct!')
              : (language === 'bm' ? `Jawapan: ${current.answer}` : `Answer: ${current.answer}`)}
            {current.type === 'read' && !isCorrect && (
              <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '2px' }}>({current.n} = {numToBM(current.n)})</div>
            )}
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
          {index + 1 >= questions.length
            ? (language === 'bm' ? 'Tamat ✓' : 'Finish ✓')
            : (language === 'bm' ? 'Seterusnya →' : 'Next →')}
        </button>
      </div>
    </div>
  );
}
