import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/soundManager';

const STREAK_MILESTONE = 10;

function generateProblem(difficulty, op) {
  const operation = op === 'random' ? (Math.random() < 0.5 ? '+' : '-') : op;
  let a, b;

  if (difficulty === 'easy') {
    a = Math.floor(Math.random() * 90) + 10;
    b = Math.floor(Math.random() * 90) + 10;
  } else if (difficulty === 'medium') {
    a = Math.floor(Math.random() * 900) + 100;
    b = Math.floor(Math.random() * 900) + 100;
  } else {
    a = Math.floor(Math.random() * 9000) + 1000;
    b = Math.floor(Math.random() * 9000) + 1000;
  }

  if (operation === '-') {
    const [big, small] = a >= b ? [a, b] : [b, a];
    return { num1: big, num2: small, op: operation, answer: big - small };
  }
  return { num1: a, num2: b, op: operation, answer: a + b };
}

const CHEERS_BM = ['Bagus!', 'Cemerlang!', 'Hebat!', 'Luar Biasa!', 'Menakjubkan!', 'BINTANG!', 'JUARA!', 'PAKAR MATEMATIK!'];
const CHEERS_EN = ['Great!', 'Excellent!', 'Fantastic!', 'Amazing!', 'Incredible!', 'SUPERSTAR!', 'CHAMPION!', 'MATH WIZARD!'];

function StreakPopup({ streak, language, onClose }) {
  const bm = language === 'bm';
  const cheers = bm ? CHEERS_BM : CHEERS_EN;
  const cheer = cheers[Math.min(Math.floor(streak / STREAK_MILESTONE) - 1, cheers.length - 1)];
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: '24px', padding: '2.5rem 2rem', textAlign: 'center', maxWidth: '300px', width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ fontSize: '4rem' }}>🎉</div>
        <div style={{ fontSize: '3.5rem', fontWeight: 900, color: '#FFC800', lineHeight: 1 }}>{streak}</div>
        <div style={{ fontWeight: 700, color: '#777', marginBottom: '0.5rem' }}>{bm ? 'jawapan betul berturut-turut!' : 'correct answers in a row!'}</div>
        <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#FF9600', marginBottom: '1.5rem' }}>{cheer}</div>
        <button onClick={onClose} style={{ background: '#58CC02', color: '#fff', fontWeight: 900, fontSize: '1rem', padding: '0.75rem 2rem', borderRadius: '12px', border: 'none', borderBottom: '4px solid #46A302', cursor: 'pointer' }}>
          {bm ? 'Terus! 🚀' : 'Keep Going! 🚀'}
        </button>
      </div>
    </div>
  );
}

const CELL_W = 48;
const OP_W   = 48;

function computeDisplayInfo(prob, maxLen) {
  const d1 = String(prob.num1).padStart(maxLen, '0').split('').map(Number);
  const d2 = String(prob.num2).padStart(maxLen, '0').split('').map(Number);
  const topRow    = new Array(maxLen).fill(null);
  const struckRow = new Array(maxLen).fill(false);

  if (prob.op === '+') {
    let carry = 0;
    for (let r = 0; r < maxLen; r++) {
      const dc = maxLen - 1 - r;
      const sum = d1[dc] + d2[dc] + carry;
      carry = Math.floor(sum / 10);
      if (carry > 0 && dc > 0) topRow[dc - 1] = carry;
    }
  } else if (prob.op === '-') {
    const eff = [...d1];
    for (let r = 0; r < maxLen; r++) {
      const dc = maxLen - 1 - r;
      if (eff[dc] < d2[dc] && dc > 0) {
        eff[dc] += 10;
        eff[dc - 1] -= 1;
        struckRow[dc - 1] = true;
      }
    }
    for (let dc = 0; dc < maxLen; dc++) {
      if (struckRow[dc]) topRow[dc] = eff[dc];
    }
  }

  return { topRow, struckRow };
}

export default function ColumnMathGame({ onBack, language }) {
  const bm = language === 'bm';

  const [difficulty,      setDifficulty]      = useState('easy');
  const [op,              setOp]              = useState('random');
  const [problem,         setProblem]         = useState(null);
  const [inputDigits,     setInputDigits]     = useState([]);
  const [activeIdx,       setActiveIdx]       = useState(0);
  const [topRowInputs,    setTopRowInputs]    = useState([]);
  const [activeSection,   setActiveSection]   = useState('answer');
  const [activeTopIdx,    setActiveTopIdx]    = useState(0);
  const [status,          setStatus]          = useState('playing');
  const [score,           setScore]           = useState(0);
  const [streak,          setStreak]          = useState(0);
  const [showStreak,      setShowStreak]      = useState(false);
  const [userStruckRow,   setUserStruckRow]   = useState([]);
  const [confirmBorrowIdx, setConfirmBorrowIdx] = useState(null);

  const inputRefs   = useRef([]);
  const topRowRefs  = useRef([]);

  const newProblem = useCallback(() => {
    const p = generateProblem(difficulty, op);
    const ml = Math.max(String(p.num1).length, String(p.num2).length, String(p.answer).length);
    setProblem(p);
    setInputDigits(Array(String(p.answer).length).fill(''));
    setTopRowInputs(Array(ml).fill(''));
    setUserStruckRow(Array(ml).fill(false));
    setActiveIdx(0);
    setActiveSection('answer');
    setActiveTopIdx(0);
    setConfirmBorrowIdx(null);
    setStatus('playing');
    setShowStreak(false);
  }, [difficulty, op]);

  useEffect(() => { newProblem(); }, [newProblem]);

  // Focus the active input whenever section or index changes
  useEffect(() => {
    if (status !== 'playing') return;
    if (activeSection === 'answer') {
      inputRefs.current[activeIdx]?.focus();
    } else {
      topRowRefs.current[activeTopIdx]?.focus();
    }
  }, [activeSection, activeIdx, activeTopIdx, status, problem]);

  const checkAnswer = useCallback((digits) => {
    const correct = digits.join('') === String(problem.answer);
    if (correct) {
      setStatus('correct');
      setScore(s => s + 10);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak % STREAK_MILESTONE === 0) {
        playSound('streak');
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
        setTimeout(() => setShowStreak(true), 400);
      } else {
        playSound('correct');
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
      }
    } else {
      setStatus('wrong');
      setStreak(0);
      playSound('wrong');
      if (navigator.vibrate) navigator.vibrate([60, 30, 60]);
    }
  }, [problem, streak]);

  const handleAnswerChange = (i, rawValue) => {
    if (status !== 'playing') return;
    const digit = rawValue.replace(/[^0-9]/g, '').slice(-1);
    if (!digit) return;
    const digits = [...inputDigits];
    digits[i] = digit;
    setInputDigits(digits);
    if (!digits.includes('')) {
      checkAnswer(digits);
    } else if (i < digits.length - 1) {
      setActiveIdx(i + 1);
    }
  };

  const handleAnswerKeyDown = (i, e) => {
    if (status !== 'playing') return;
    if (e.key === 'Backspace') {
      e.preventDefault();
      const digits = [...inputDigits];
      if (digits[i] !== '') {
        digits[i] = '';
        setInputDigits(digits);
      } else if (i > 0) {
        digits[i - 1] = '';
        setInputDigits(digits);
        setActiveIdx(i - 1);
      }
    }
  };

  const handleTopRowChange = (i, rawValue) => {
    if (status !== 'playing') return;
    const digit = rawValue.replace(/[^0-9]/g, '').slice(-1);
    const inputs = [...topRowInputs];
    inputs[i] = digit;
    setTopRowInputs(inputs);
  };

  if (!problem) return null;

  const s1 = String(problem.num1);
  const s2 = String(problem.num2);
  const sa = String(problem.answer);
  const maxLen    = Math.max(s1.length, s2.length, sa.length);
  const p1        = s1.padStart(maxLen, ' ');
  const p2        = s2.padStart(maxLen, ' ');
  const answerPad = maxLen - sa.length;
  const totalW    = OP_W + CELL_W * maxLen;

  const { topRow } = computeDisplayInfo(problem, maxLen);
  const hasTopRow = topRow.some((v, i) => v !== null && !(p1[i] === ' ' && p2[i] === ' '));
  const showTopRow = problem.op === '+'
    ? hasTopRow && inputDigits.some(d => d !== '')
    : userStruckRow.some(v => v);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', background: '#f7f7f7' }}>
      {showStreak && <StreakPopup streak={streak} language={language} onClose={() => { setShowStreak(false); newProblem(); }} />}

      {/* Borrow confirmation dialog */}
      {confirmBorrowIdx !== null && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: '20px', padding: '2rem 1.5rem', textAlign: 'center', maxWidth: '280px', width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }}>🤔</div>
            <div style={{ fontWeight: 900, fontSize: '1rem', color: '#3C3C3C', marginBottom: '0.5rem' }}>
              {bm ? 'Pinjam daripada digit ini?' : 'Borrow from this digit?'}
            </div>
            <div style={{ fontSize: '3.5rem', fontWeight: 900, fontFamily: '"Courier New", monospace', color: '#FF4B4B', marginBottom: '1.25rem', lineHeight: 1 }}>
              {p1[confirmBorrowIdx]}
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => {
                  const newStruck = [...userStruckRow];
                  newStruck[confirmBorrowIdx] = true;
                  setUserStruckRow(newStruck);
                  setActiveSection('topRow');
                  setActiveTopIdx(confirmBorrowIdx);
                  setConfirmBorrowIdx(null);
                }}
                style={{ flex: 1, padding: '0.75rem', background: '#58CC02', color: '#fff', fontWeight: 900, fontSize: '1rem', borderRadius: '12px', border: 'none', borderBottom: '4px solid #46A302', cursor: 'pointer' }}
              >
                {bm ? 'Ya! ✓' : 'Yes! ✓'}
              </button>
              <button
                onClick={() => setConfirmBorrowIdx(null)}
                style={{ flex: 1, padding: '0.75rem', background: '#FF4B4B', color: '#fff', fontWeight: 900, fontSize: '1rem', borderRadius: '12px', border: 'none', borderBottom: '4px solid #CC0000', cursor: 'pointer' }}
              >
                {bm ? 'Tidak' : 'No'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '2px solid #E5E5E5', padding: '0 1rem', height: '56px', display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: 'transparent', color: '#AFAFAF', display: 'flex', alignItems: 'center' }}>
          <ArrowLeft size={24} />
        </button>
        <div style={{ flex: 1, textAlign: 'center', fontWeight: 900, fontSize: '1rem', color: '#3C3C3C' }}>
          ❓ {bm ? 'Soalan Lazim' : 'Practice Problems'}
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <span style={{ fontWeight: 800, color: '#FFC800', fontSize: '0.9rem' }}>⭐ {score}</span>
          <span style={{ fontWeight: 800, color: '#FF9600', fontSize: '0.9rem' }}>🔥 {streak}</span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.25rem 1rem', gap: '1.25rem' }}>

        {/* Settings */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
          {[
            { id: 'easy',   label: bm ? '🌱 Senang' : '🌱 Easy',      color: '#58CC02' },
            { id: 'medium', label: bm ? '⭐ Sederhana' : '⭐ Medium',  color: '#FFC800' },
            { id: 'hard',   label: bm ? '🔥 Susah' : '🔥 Hard',       color: '#FF4B4B' },
          ].map(d => (
            <button key={d.id} onClick={() => setDifficulty(d.id)} style={{
              padding: '0.35rem 0.9rem', borderRadius: '999px', fontWeight: 700, fontSize: '0.8rem',
              background: difficulty === d.id ? d.color : '#E5E5E5',
              color: difficulty === d.id ? '#fff' : '#777', border: 'none', cursor: 'pointer',
            }}>{d.label}</button>
          ))}
          <span style={{ color: '#C0C0C0', fontWeight: 300 }}>│</span>
          {[
            { id: 'random', label: '🎲' },
            { id: '+',      label: '➕' },
            { id: '-',      label: '➖' },
          ].map(o => (
            <button key={o.id} onClick={() => setOp(o.id)} style={{
              padding: '0.35rem 0.75rem', borderRadius: '999px', fontWeight: 700, fontSize: '1rem',
              background: op === o.id ? '#1CB0F6' : '#E5E5E5',
              color: op === o.id ? '#fff' : '#777', border: 'none', cursor: 'pointer',
            }}>{o.label}</button>
          ))}
        </div>

        {/* Column problem card */}
        <div style={{ background: '#fff', borderRadius: '20px', padding: '1.75rem 2rem', border: '3px solid #E5E5E5', boxShadow: '0 4px 0 #E5E5E5' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', width: totalW }}>

            {/* Carry / Borrow row */}
            {showTopRow && (
              <div style={{ display: 'flex', alignItems: 'center', height: '38px' }}>
                <div style={{ width: OP_W }} />
                {topRow.map((val, i) => {
                  const hide = p1[i] === ' ' && p2[i] === ' ';
                  const hasCarry = problem.op === '+' ? (val !== null && !hide) : userStruckRow[i];
                  const isTopActive = activeSection === 'topRow' && activeTopIdx === i && status === 'playing';
                  return (
                    <div key={i} style={{ width: CELL_W, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      {hasCarry && (
                        <input
                          ref={el => topRowRefs.current[i] = el}
                          type="text"
                          inputMode="numeric"
                          maxLength={2}
                          value={topRowInputs[i] ?? ''}
                          readOnly={status !== 'playing'}
                          onChange={e => handleTopRowChange(i, e.target.value)}
                          onFocus={() => { setActiveSection('topRow'); setActiveTopIdx(i); }}
                          style={{
                            width: '32px', height: '32px',
                            border: `2px solid ${isTopActive ? '#1CB0F6' : '#C0C0C0'}`,
                            borderRadius: '8px',
                            background: isTopActive ? '#EAF7FF' : '#fafafa',
                            textAlign: 'center',
                            fontSize: '1.1rem', fontWeight: 900,
                            fontFamily: '"Courier New", monospace',
                            color: problem.op === '+' ? '#58CC02' : '#FF4B4B',
                            outline: 'none',
                            caretColor: 'transparent',
                            cursor: status === 'playing' ? 'pointer' : 'default',
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Row 1 — num1 */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: OP_W }} />
              {p1.split('').map((d, i) => {
                const isStruck = userStruckRow[i];
                const canBorrow = problem.op === '-' && status === 'playing' && d !== ' ' && !isStruck;
                return (
                  <div key={i}
                    onClick={() => { if (canBorrow) setConfirmBorrowIdx(i); }}
                    style={{
                      width: CELL_W, textAlign: 'center', fontSize: '2.4rem', fontWeight: 700,
                      fontFamily: '"Courier New", monospace',
                      color: isStruck ? '#AFAFAF' : '#3C3C3C',
                      textDecoration: isStruck ? 'line-through' : 'none',
                      cursor: canBorrow ? 'pointer' : 'default',
                      borderRadius: '8px',
                    }}>
                    {d === ' ' ? '' : d}
                  </div>
                );
              })}
            </div>

            {/* Row 2 — op + num2 */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: OP_W, textAlign: 'center', fontSize: '2.4rem', fontWeight: 900, fontFamily: '"Courier New", monospace', color: '#1CB0F6' }}>
                {problem.op}
              </div>
              {p2.split('').map((d, i) => (
                <div key={i} style={{ width: CELL_W, textAlign: 'center', fontSize: '2.4rem', fontWeight: 700, fontFamily: '"Courier New", monospace', color: '#3C3C3C' }}>
                  {d === ' ' ? '' : d}
                </div>
              ))}
            </div>

            {/* Top separator */}
            <div style={{ borderTop: '3px solid #3C3C3C', margin: '4px 0' }} />

            {/* Row 3 — answer inputs */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: OP_W }} />
              {Array(answerPad).fill(null).map((_, i) => (
                <div key={`pad-${i}`} style={{ width: CELL_W }} />
              ))}
              {inputDigits.map((d, i) => {
                const isActive  = status === 'playing' && i === activeIdx && activeSection === 'answer';
                const correctD  = sa[i];
                const isWrong   = status === 'wrong' && d !== correctD;
                const isCorrect = status === 'correct';
                return (
                  <input
                    key={i}
                    ref={el => inputRefs.current[i] = el}
                    type="text"
                    inputMode="numeric"
                    maxLength={2}
                    value={d}
                    readOnly={status !== 'playing'}
                    onChange={e => handleAnswerChange(i, e.target.value)}
                    onKeyDown={e => handleAnswerKeyDown(i, e)}
                    onFocus={() => { if (status === 'playing') { setActiveIdx(i); setActiveSection('answer'); } }}
                    style={{
                      width: CELL_W - 6, height: '3.2rem', margin: '0 3px',
                      border: `3px solid ${isActive ? '#1CB0F6' : isWrong ? '#FF4B4B' : isCorrect ? '#58CC02' : '#ADADAD'}`,
                      borderRadius: '10px',
                      background: isActive ? '#EAF7FF' : isWrong ? '#FFEBEB' : isCorrect ? '#EFFFEA' : '#fafafa',
                      textAlign: 'center',
                      fontSize: '2.2rem', fontWeight: 700, fontFamily: '"Courier New", monospace',
                      color: isWrong ? '#FF4B4B' : isCorrect ? '#58CC02' : '#3C3C3C',
                      outline: 'none',
                      caretColor: 'transparent',
                      cursor: 'pointer', transition: 'all 0.12s',
                    }}
                  />
                );
              })}
            </div>

            {/* Bottom separator */}
            <div style={{ borderTop: '3px solid #3C3C3C', marginTop: '4px' }} />
          </div>
        </div>

        {/* Feedback banner + Next button */}
        {status !== 'playing' && (
          <>
            <div style={{
              fontWeight: 800, fontSize: '1.05rem', padding: '0.6rem 1.5rem', borderRadius: '12px',
              color:      status === 'correct' ? '#2d8a00' : '#c0392b',
              background: status === 'correct' ? '#EFFFEA' : '#FFEBEB',
              border: `2px solid ${status === 'correct' ? '#58CC02' : '#FF4B4B'}`,
            }}>
              {status === 'correct'
                ? (bm ? '✅ Betul!' : '✅ Correct!')
                : (bm ? `❌ Jawapan betul: ${problem.answer}` : `❌ Correct answer: ${problem.answer}`)}
            </div>
            <button onClick={newProblem} style={{
              padding: '1rem 3rem', background: '#58CC02', color: '#fff',
              fontWeight: 900, fontSize: '1.1rem',
              borderRadius: '16px', border: 'none', borderBottom: '4px solid #46A302', cursor: 'pointer',
            }}>
              {bm ? 'Soalan Seterusnya →' : 'Next Question →'}
            </button>
          </>
        )}

      </div>
    </div>
  );
}
