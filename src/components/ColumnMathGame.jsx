import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/soundManager';

const STREAK_MILESTONE = 10;

function generateProblem(difficulty, op) {
  const operation = op === 'random'
    ? ['+', '-', '×'][Math.floor(Math.random() * 3)]
    : op;

  if (operation === '×') {
    let a, b;
    if (difficulty === 'easy') {
      a = Math.floor(Math.random() * 9) + 1;
      b = Math.floor(Math.random() * 9) + 1;
    } else if (difficulty === 'medium') {
      a = Math.floor(Math.random() * 90) + 10;
      const t = Math.floor(Math.random() * 9) + 1;
      const o = Math.floor(Math.random() * 9) + 1;
      b = t * 10 + o;
    } else {
      a = Math.floor(Math.random() * 900) + 100;
      const t = Math.floor(Math.random() * 9) + 1;
      const o = Math.floor(Math.random() * 9) + 1;
      b = t * 10 + o;
    }
    const prob = { num1: a, num2: b, op: '×', answer: a * b };
    if (difficulty !== 'easy') {
      prob.partial1 = a * (b % 10);
      prob.partial2 = a * Math.floor(b / 10);
      prob.hasPartials = true;
    }
    return prob;
  }

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

function useIsDesktop(bp = 768) {
  const [isDesk, setIsDesk] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= bp : false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia(`(min-width: ${bp}px)`);
    const h = (e) => setIsDesk(e.matches);
    mql.addEventListener('change', h);
    setIsDesk(mql.matches);
    return () => mql.removeEventListener('change', h);
  }, [bp]);
  return isDesk;
}

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

function computeMultiplicationInfo(prob, maxLen) {
  const p1Carries = new Array(maxLen).fill(null);
  const p2Carries = new Array(maxLen).fill(null);
  const addCarries = new Array(maxLen).fill(null);

  if (!prob || prob.op !== '×' || !prob.hasPartials) return { p1Carries, p2Carries, addCarries };

  const s1 = String(prob.num1);
  const m1 = prob.num2 % 10;
  const m2 = Math.floor(prob.num2 / 10);
  
  let c = 0;
  for (let i = s1.length - 1; i >= 0; i--) {
    const d = parseInt(s1[i], 10);
    const prod = d * m1 + c;
    c = Math.floor(prod / 10);
    const colIdx = maxLen - s1.length + i;
    if (c > 0 && i > 0) p1Carries[colIdx - 1] = c;
  }

  c = 0;
  for (let i = s1.length - 1; i >= 0; i--) {
    const d = parseInt(s1[i], 10);
    const prod = d * m2 + c;
    c = Math.floor(prod / 10);
    const colIdx = maxLen - s1.length + i;
    if (c > 0 && i > 0) p2Carries[colIdx - 1] = c;
  }

  const pp1 = String(prob.partial1).padStart(maxLen, '0').split('').map(Number);
  const pp2 = (String(prob.partial2) + '0').padStart(maxLen, '0').split('').map(Number);
  let ac = 0;
  for (let r = 0; r < maxLen; r++) {
    const dc = maxLen - 1 - r;
    const sum = pp1[dc] + pp2[dc] + ac;
    ac = Math.floor(sum / 10);
    if (ac > 0 && dc > 0) addCarries[dc - 1] = ac;
  }

  return { p1Carries, p2Carries, addCarries };
}

export default function ColumnMathGame({ onBack, language }) {
  const bm = language === 'bm';
  const isDesktop = useIsDesktop();

  // Responsive sizing — question box is the focal point and gets larger on desktop
  const CELL_W   = isDesktop ? 60 : 48;
  const OP_W     = isDesktop ? 60 : 48;
  const DIGIT_FS = isDesktop ? '2.4rem' : '2.4rem';
  const ANS_FS   = isDesktop ? '2.2rem' : '2.2rem';
  const ANS_H    = isDesktop ? '3.2rem' : '3.2rem';
  const TOP_W1   = isDesktop ? '36px'   : '32px';
  const TOP_W2   = isDesktop ? '46px'   : '42px';
  const TOP_H    = isDesktop ? '34px'   : '32px';
  const TOP_FS   = isDesktop ? '1.1rem' : '1.05rem';
  const CARD_MIN = isDesktop ? 480      : 0;

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
  const [totalAnswered,   setTotalAnswered]   = useState(0);
  const [showStreak,      setShowStreak]      = useState(false);
  const [userStruckRow,    setUserStruckRow]    = useState([]);
  const [userBorrowedTo,   setUserBorrowedTo]   = useState([]);
  const [confirmBorrowIdx, setConfirmBorrowIdx] = useState(null);
  const [lockMessage,      setLockMessage]      = useState('');
  const [partial1Inputs,       setPartial1Inputs]       = useState([]);
  const [partial2Inputs,       setPartial2Inputs]       = useState([]);
  const [partial1CarryInputs,  setPartial1CarryInputs]  = useState([]);
  const [partial2CarryInputs,  setPartial2CarryInputs]  = useState([]);
  const [activePartial1Idx,    setActivePartial1Idx]    = useState(0);
  const [activePartial2Idx,    setActivePartial2Idx]    = useState(0);
  const [activePartial1CarryIdx, setActivePartial1CarryIdx] = useState(0);
  const [activePartial2CarryIdx, setActivePartial2CarryIdx] = useState(0);

  const inputRefs            = useRef([]);
  const topRowRefs           = useRef([]);
  const partial1Refs         = useRef([]);
  const partial2Refs         = useRef([]);
  const partial1CarryRefs    = useRef([]);
  const partial2CarryRefs    = useRef([]);
  const feedbackTimer        = useRef(null);

  const needsBorrowAt = (i) => {
    if (!problem || problem.op !== '-') return false;
    const ml = Math.max(String(problem.num1).length, String(problem.num2).length, String(problem.answer).length);
    const sp1 = String(problem.num1).padStart(ml, ' ');
    const sp2 = String(problem.num2).padStart(ml, ' ');
    const ch1 = sp1[i];
    const ch2 = sp2[i];
    if (ch1 === ' ' && ch2 === ' ') return false;
    const t = ch1 === ' ' ? 0 : parseInt(ch1, 10);
    const b = ch2 === ' ' ? 0 : parseInt(ch2, 10);
    let eff = t;
    if (userBorrowedTo[i]) eff += 10;
    if (userStruckRow[i] && !userBorrowedTo[i]) eff -= 1;
    return eff < b;
  };

  const triggerLockMessage = (i) => {
    if (!problem) return;
    const ml = Math.max(String(problem.num1).length, String(problem.num2).length, String(problem.answer).length);
    const sp1 = String(problem.num1).padStart(ml, ' ');
    const sp2 = String(problem.num2).padStart(ml, ' ');
    const tDigit = sp1[i] === ' ' ? '0' : sp1[i];
    const bDigit = sp2[i] === ' ' ? '0' : sp2[i];
    setLockMessage(bm
      ? `${tDigit} lebih kecil daripada ${bDigit}. Anda perlu Pinjam dari Rumah Sebelah!`
      : `${tDigit} is smaller than ${bDigit}. You need to Borrow from the House Next Door!`);
  };

  const newProblem = useCallback(() => {
    const p = generateProblem(difficulty, op);
    const ml = Math.max(String(p.num1).length, String(p.num2).length, String(p.answer).length);
    setProblem(p);
    setInputDigits(Array(ml).fill(''));
    setTopRowInputs(Array(ml).fill(''));
    setUserStruckRow(Array(ml).fill(false));
    setUserBorrowedTo(Array(ml).fill(false));
    setPartial1Inputs(Array(ml).fill(''));
    setPartial2Inputs(Array(ml).fill(''));
    setPartial1CarryInputs(Array(ml).fill(''));
    setPartial2CarryInputs(Array(ml).fill(''));
    setActiveIdx(ml - 1);
    setActiveTopIdx(0);
    if (p.hasPartials) {
      setActiveSection('partial1');
      setActivePartial1Idx(ml - 1);
      setActivePartial1CarryIdx(0);
      setActivePartial2CarryIdx(0);
      setActivePartial2Idx(0);
    } else {
      setActiveSection('answer');
      setActivePartial1Idx(0);
      setActivePartial2Idx(0);
      setActivePartial1CarryIdx(0);
      setActivePartial2CarryIdx(0);
    }
    setConfirmBorrowIdx(null);
    setLockMessage('');
    setStatus('playing');
    setShowStreak(false);
  }, [difficulty, op]);

  useEffect(() => { newProblem(); }, [newProblem]);

  // Cleanup feedback timer on unmount
  useEffect(() => {
    return () => { if (feedbackTimer.current) clearTimeout(feedbackTimer.current); };
  }, []);

  // Focus the active input whenever section or index changes
  useEffect(() => {
    if (status !== 'playing') return;
    if (activeSection === 'answer') {
      inputRefs.current[activeIdx]?.focus();
    } else if (activeSection === 'topRow') {
      topRowRefs.current[activeTopIdx]?.focus();
    } else if (activeSection === 'partial1Carry') {
      partial1CarryRefs.current[activePartial1CarryIdx]?.focus();
    } else if (activeSection === 'partial1') {
      partial1Refs.current[activePartial1Idx]?.focus();
    } else if (activeSection === 'partial2Carry') {
      partial2CarryRefs.current[activePartial2CarryIdx]?.focus();
    } else if (activeSection === 'partial2') {
      partial2Refs.current[activePartial2Idx]?.focus();
    }
  }, [activeSection, activeIdx, activeTopIdx, activePartial1Idx, activePartial2Idx, activePartial1CarryIdx, activePartial2CarryIdx, status, problem]);

  const checkAnswer = useCallback((digits) => {
    const ml = Math.max(String(problem.num1).length, String(problem.num2).length, String(problem.answer).length);
    const padded = String(problem.answer).padStart(ml, '0');
    let correct = digits.join('') === padded;
    if (correct && problem.hasPartials) {
      const N1 = String(problem.partial1).length;
      const N2 = String(problem.partial2).length;
      const cp1 = String(problem.partial1);
      const cp2 = String(problem.partial2);
      for (let i = 0; i < N1; i++) {
        if (partial1Inputs[ml - N1 + i] !== cp1[i]) { correct = false; break; }
      }
      if (correct) {
        for (let i = 0; i < N2; i++) {
          if (partial2Inputs[ml - N2 - 1 + i] !== cp2[i]) { correct = false; break; }
        }
      }
    }
    if (correct) {
      setStatus('correct');
      setScore(s => s + 10);
      setTotalAnswered(t => t + 1);
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

      // Auto-advance after short delay
      feedbackTimer.current = setTimeout(() => {
        newProblem();
      }, 1200);
    } else {
      setStatus('wrong');
      setStreak(0);
      setTotalAnswered(t => t + 1);
      playSound('wrong');
      if (navigator.vibrate) navigator.vibrate([60, 30, 60]);
    }
  }, [problem, streak, partial1Inputs, partial2Inputs, newProblem]);

  const submitAnswer = () => {
    if (status !== 'playing') return;
    if (inputDigits.includes('')) return;

    // Subtraction: every column with top < bottom must have its borrow performed first
    if (problem.op === '-') {
      const ml = Math.max(String(problem.num1).length, String(problem.num2).length, String(problem.answer).length);
      for (let i = 0; i < ml; i++) {
        if (needsBorrowAt(i)) {
          triggerLockMessage(i);
          return;
        }
      }
    }

    if (problem.hasPartials) {
      const ml = Math.max(String(problem.num1).length, String(problem.num2).length, String(problem.answer).length);
      const N1 = String(problem.partial1).length;
      const N2 = String(problem.partial2).length;
      for (let i = ml - N1; i <= ml - 1; i++) {
        if (!partial1Inputs[i]) return;
      }
      for (let i = ml - N2 - 1; i <= ml - 2; i++) {
        if (!partial2Inputs[i]) return;
      }
    }

    checkAnswer(inputDigits);
  };

  const handleAnswerChange = (i, rawValue) => {
    if (status !== 'playing') return;
    const cleaned = rawValue.replace(/[^0-9]/g, '');
    const digit = cleaned.slice(-1); // '' if user cleared the field
    const digits = [...inputDigits];
    digits[i] = digit;
    setInputDigits(digits);

    if (!digit) {
      setLockMessage('');
      return;
    }

    // Subtraction: if this column still needs a borrow, do not advance to the next column
    if (problem.op === '-' && needsBorrowAt(i)) {
      triggerLockMessage(i);
      return;
    }

    setLockMessage('');
    if (i > 0) setActiveIdx(i - 1);
  };

  const handleAnswerKeyDown = (i, e) => {
    if (status !== 'playing') return;
    if (e.key === 'Enter') {
      e.preventDefault();
      submitAnswer();
      return;
    }
    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
      const digits = [...inputDigits];
      if (digits[i] !== '') {
        digits[i] = '';
        setInputDigits(digits);
        setLockMessage('');
      } else if (e.key === 'Backspace' && i < digits.length - 1) {
        digits[i + 1] = '';
        setInputDigits(digits);
        setActiveIdx(i + 1);
        setLockMessage('');
      }
    }
  };

  const handleTopRowChange = (i, rawValue) => {
    if (status !== 'playing') return;
    if (problem.op === '-') return; // subtraction topRow is auto-filled
    const cleaned = rawValue.replace(/[^0-9]/g, '');
    const digit = cleaned.slice(-1);
    const inputs = [...topRowInputs];
    inputs[i] = digit;
    setTopRowInputs(inputs);
  };

  const handleTopRowKeyDown = (i, e) => {
    if (status !== 'playing') return;
    if (problem.op === '-') { e.preventDefault(); return; }
    if (e.key === 'Backspace') {
      e.preventDefault();
      const inputs = [...topRowInputs];
      inputs[i] = '';
      setTopRowInputs(inputs);
    }
  };

  const handlePartial1Change = (i, rawValue) => {
    if (status !== 'playing' || !problem.hasPartials) return;
    const cleaned = rawValue.replace(/[^0-9]/g, '');
    const digit = cleaned.slice(-1);
    const inputs = [...partial1Inputs];
    inputs[i] = digit;
    setPartial1Inputs(inputs);
    if (!digit) return;
    const ml = Math.max(String(problem.num1).length, String(problem.num2).length, String(problem.answer).length);
    const leftmost = ml - String(problem.partial1).length;
    if (i > leftmost) {
      setActivePartial1Idx(i - 1);
    } else {
      setActiveSection('partial1Carry');
      setActivePartial1CarryIdx(ml - 2);
    }
  };

  const handlePartial1KeyDown = (i, e) => {
    if (status !== 'playing') return;
    if (e.key === 'Enter') { e.preventDefault(); submitAnswer(); return; }
    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
      const ml = Math.max(String(problem.num1).length, String(problem.num2).length, String(problem.answer).length);
      const inputs = [...partial1Inputs];
      if (inputs[i] !== '') {
        inputs[i] = '';
        setPartial1Inputs(inputs);
      } else if (e.key === 'Backspace' && i < ml - 1) {
        inputs[i + 1] = '';
        setPartial1Inputs(inputs);
        setActivePartial1Idx(i + 1);
      }
    }
  };

  const handlePartial2Change = (i, rawValue) => {
    if (status !== 'playing' || !problem.hasPartials) return;
    const cleaned = rawValue.replace(/[^0-9]/g, '');
    const digit = cleaned.slice(-1);
    const inputs = [...partial2Inputs];
    inputs[i] = digit;
    setPartial2Inputs(inputs);
    if (!digit) return;
    const ml = Math.max(String(problem.num1).length, String(problem.num2).length, String(problem.answer).length);
    const N2 = String(problem.partial2).length;
    const leftmost = ml - N2 - 1;
    if (i > leftmost) {
      setActivePartial2Idx(i - 1);
    } else {
      setActiveSection('partial2Carry');
      setActivePartial2CarryIdx(ml - N2 - 2);
    }
  };

  const handlePartial2KeyDown = (i, e) => {
    if (status !== 'playing') return;
    if (e.key === 'Enter') { e.preventDefault(); submitAnswer(); return; }
    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
      const ml = Math.max(String(problem.num1).length, String(problem.num2).length, String(problem.answer).length);
      const inputs = [...partial2Inputs];
      if (inputs[i] !== '') {
        inputs[i] = '';
        setPartial2Inputs(inputs);
      } else if (e.key === 'Backspace' && i < ml - 2) {
        inputs[i + 1] = '';
        setPartial2Inputs(inputs);
        setActivePartial2Idx(i + 1);
      }
    }
  };

  const handlePartial1CarryChange = (i, rawValue) => {
    if (status !== 'playing' || !problem.hasPartials) return;
    const cleaned = rawValue.replace(/[^0-9]/g, '');
    const digit = cleaned.slice(-1);
    const inputs = [...partial1CarryInputs];
    inputs[i] = digit;
    setPartial1CarryInputs(inputs);
    if (!digit) return;
    const ml = Math.max(String(problem.num1).length, String(problem.num2).length, String(problem.answer).length);
    const N1 = String(problem.partial1).length;
    const leftmost = ml - N1;
    if (i > leftmost) {
      setActivePartial1CarryIdx(i - 1);
    } else {
      setActiveSection('partial2');
      setActivePartial2Idx(ml - 2);
    }
  };

  const handlePartial1CarryKeyDown = (i, e) => {
    if (status !== 'playing') return;
    if (e.key === 'Backspace') {
      e.preventDefault();
      const inputs = [...partial1CarryInputs];
      if (inputs[i] !== '') {
        inputs[i] = '';
        setPartial1CarryInputs(inputs);
      } else if (i > 0) {
        inputs[i - 1] = '';
        setPartial1CarryInputs(inputs);
        setActivePartial1CarryIdx(i - 1);
      }
    }
  };

  const handlePartial2CarryChange = (i, rawValue) => {
    if (status !== 'playing' || !problem.hasPartials) return;
    const cleaned = rawValue.replace(/[^0-9]/g, '');
    const digit = cleaned.slice(-1);
    const inputs = [...partial2CarryInputs];
    inputs[i] = digit;
    setPartial2CarryInputs(inputs);
    if (!digit) return;
    const ml = Math.max(String(problem.num1).length, String(problem.num2).length, String(problem.answer).length);
    const N2 = String(problem.partial2).length;
    const leftmost = ml - N2 - 1;
    if (i > leftmost) {
      setActivePartial2CarryIdx(i - 1);
    } else {
      setActiveSection('answer');
      setActiveIdx(ml - 1);
    }
  };

  const handlePartial2CarryKeyDown = (i, e) => {
    if (status !== 'playing') return;
    if (e.key === 'Backspace') {
      e.preventDefault();
      const inputs = [...partial2CarryInputs];
      if (inputs[i] !== '') {
        inputs[i] = '';
        setPartial2CarryInputs(inputs);
      } else if (i > 0) {
        inputs[i - 1] = '';
        setPartial2CarryInputs(inputs);
        setActivePartial2CarryIdx(i - 1);
      }
    }
  };

  if (!problem) return null;

  const s1 = String(problem.num1);
  const s2 = String(problem.num2);
  const maxLen = Math.max(s1.length, s2.length, String(problem.answer).length);
  const p1     = s1.padStart(maxLen, ' ');
  const p2     = s2.padStart(maxLen, ' ');
  const sa     = String(problem.answer).padStart(maxLen, '0');
  const totalW = OP_W + CELL_W * maxLen;

  const { topRow } = computeDisplayInfo(problem, maxLen);
  const { p1Carries, p2Carries, addCarries } = computeMultiplicationInfo(problem, maxLen);
  const hasTopRow = topRow.some((v, i) => v !== null && !(p1[i] === ' ' && p2[i] === ' '));
  const showTopRow = problem.op === '+'
    ? hasTopRow && inputDigits.some(d => d !== '')
    : problem.op === '-'
      ? (userStruckRow.some(v => v) || userBorrowedTo.some(v => v))
      : false;

  const opTheme = problem.op === '-'
    ? { main: '#FF4B4B', dark: '#CC0000', soft: '#FFEFEF', stripe: 'linear-gradient(90deg, #FFA8A8, #FF4B4B)' }
    : problem.op === '+'
      ? { main: '#58CC02', dark: '#46A302', soft: '#EEFCDD', stripe: 'linear-gradient(90deg, #9DE85C, #58CC02)' }
      : problem.op === '×'
        ? { main: '#CE82FF', dark: '#9C4DCC', soft: '#F5E5FF', stripe: 'linear-gradient(90deg, #E0B4FF, #CE82FF)' }
        : { main: '#1CB0F6', dark: '#0E8FD0', soft: '#E1F4FF', stripe: 'linear-gradient(90deg, #7AD2FF, #1CB0F6)' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', background: '#FAFAFA' }}>
      <style>{`
        @keyframes cmg-pop { 0%{transform:scale(0.92);opacity:0;} 60%{transform:scale(1.02);} 100%{transform:scale(1);opacity:1;} }
        @keyframes cmg-slide { from{opacity:0;transform:translateY(-6px);} to{opacity:1;transform:translateY(0);} }
        @keyframes cmg-shake { 0%,100%{transform:translateX(0);} 20%{transform:translateX(-6px);} 40%{transform:translateX(6px);} 60%{transform:translateX(-4px);} 80%{transform:translateX(4px);} }
        @keyframes cmg-bounce-in { 0%{transform:scale(0.7);opacity:0;} 70%{transform:scale(1.04);} 100%{transform:scale(1);opacity:1;} }
        @keyframes cmg-pulse-glow { 0%,100%{box-shadow:0 0 0 0 rgba(88,204,2,0.4);} 50%{box-shadow:0 0 0 8px rgba(88,204,2,0);} }
        .cmg-btn { transition: transform 0.08s ease, filter 0.15s ease, background 0.15s ease; }
        .cmg-btn:hover:not(:disabled) { filter: brightness(1.06); }
        .cmg-btn:active:not(:disabled) { transform: translateY(2px); }
        .cmg-card { animation: cmg-pop 0.28s cubic-bezier(.2,.85,.3,1.15) both; }
        .cmg-banner { animation: cmg-slide 0.22s ease-out both; }
        .cmg-shake { animation: cmg-shake 0.42s ease-in-out; }
        .cmg-dialog { animation: cmg-bounce-in 0.32s cubic-bezier(.2,.9,.4,1.3) both; }
        .cmg-submit-ready { animation: cmg-pulse-glow 1.6s ease-in-out infinite; }
        .cmg-digit-cell:focus { transform: scale(1.04); }
      `}</style>

      {showStreak && <StreakPopup streak={streak} language={language} onClose={() => { setShowStreak(false); newProblem(); }} />}

      {/* Borrow confirmation dialog */}
      {confirmBorrowIdx !== null && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(28, 32, 40, 0.55)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(2px)' }}>
          <div className="cmg-dialog" style={{ background: '#fff', borderRadius: '24px', padding: '1.75rem 1.5rem 1.5rem', textAlign: 'center', maxWidth: '320px', width: '100%', boxShadow: '0 24px 60px rgba(0,0,0,0.25)', border: '3px solid #FFE0E0', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: 'linear-gradient(90deg, #FFA8A8, #FF4B4B)' }} />
            <div style={{ fontSize: '2.75rem', marginBottom: '0.25rem' }}>🏠</div>
            <div style={{ fontWeight: 900, fontSize: '1.05rem', color: '#3C3C3C', marginBottom: '0.25rem' }}>
              {bm ? 'Pinjam dari Rumah Sebelah?' : 'Borrow from this neighbour?'}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#777', fontWeight: 600, marginBottom: '0.85rem' }}>
              {bm ? 'Tolak 1 dari digit ini' : 'Subtract 1 from this digit'}
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '88px', height: '88px', borderRadius: '20px', background: '#FFF1F1', border: '3px dashed #FF4B4B', fontSize: '3.5rem', fontWeight: 900, fontFamily: '"Courier New", monospace', color: '#FF4B4B', marginBottom: '1.25rem', lineHeight: 1 }}>
              {p1[confirmBorrowIdx]}
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => {
                  const idx = confirmBorrowIdx;
                  const newStruck = [...userStruckRow];
                  newStruck[idx] = true;
                  newStruck[idx + 1] = true;
                  setUserStruckRow(newStruck);

                  const newBorrowedTo = [...userBorrowedTo];
                  newBorrowedTo[idx + 1] = true;
                  setUserBorrowedTo(newBorrowedTo);

                  const newTopInputs = [...topRowInputs];
                  const srcChar = p1[idx];
                  if (srcChar && srcChar !== ' ') {
                    newTopInputs[idx] = String(parseInt(srcChar, 10) - 1);
                  }
                  // Use current value from topRowInputs if it exists (from cascading borrows), otherwise use original
                  const currentTargetValue = newTopInputs[idx + 1] ? parseInt(newTopInputs[idx + 1], 10) : parseInt(p1[idx + 1], 10);
                  if (!isNaN(currentTargetValue)) {
                    newTopInputs[idx + 1] = String(currentTargetValue + 10);
                  }
                  setTopRowInputs(newTopInputs);

                  // After borrow: move focus to the next column to be answered.
                  // If the borrow target (idx+1) already has a typed digit, advance left to idx.
                  // Otherwise focus stays at idx+1 so the user can answer it now.
                  const nextIdx = inputDigits[idx + 1] !== '' ? idx : idx + 1;
                  setActiveIdx(nextIdx);
                  setActiveSection('answer');
                  setLockMessage('');
                  setConfirmBorrowIdx(null);
                }}
                className="cmg-btn"
                style={{ flex: 1, padding: '0.85rem', background: '#58CC02', color: '#fff', fontWeight: 900, fontSize: '1rem', borderRadius: '14px', border: 'none', borderBottom: '4px solid #46A302', cursor: 'pointer', letterSpacing: '0.02em' }}
              >
                {bm ? '✓ Ya, Pinjam' : '✓ Yes, Borrow'}
              </button>
              <button
                onClick={() => setConfirmBorrowIdx(null)}
                className="cmg-btn"
                style={{ flex: 1, padding: '0.85rem', background: '#fff', color: '#9A9A9A', fontWeight: 900, fontSize: '1rem', borderRadius: '14px', border: '2px solid #E5E5E5', borderBottom: '4px solid #C0C0C0', cursor: 'pointer' }}
              >
                {bm ? 'Batal' : 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '2px solid #E5E5E5', padding: '0 0.85rem', height: '60px', display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
        <button onClick={onBack} className="cmg-btn" style={{ background: 'transparent', color: '#AFAFAF', display: 'flex', alignItems: 'center', padding: '6px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
          <ArrowLeft size={22} />
        </button>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <span style={{ fontSize: '1.15rem' }}>📐</span>
          <span style={{ fontWeight: 900, fontSize: '0.98rem', color: '#3C3C3C', letterSpacing: '0.01em' }}>
            {bm ? 'Soalan Lazim' : 'Practice Problems'}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', background: '#FFF6D6', borderRadius: '999px', fontWeight: 900, fontSize: '0.82rem', color: '#B58800', border: '1.5px solid #FFE08A' }}>
            <span style={{ fontSize: '0.85rem' }}>⭐</span>
            <span>{score}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', background: '#FFEAD0', borderRadius: '999px', fontWeight: 900, fontSize: '0.82rem', color: '#D9610B', border: '1.5px solid #FFC081' }}>
            <span style={{ fontSize: '0.85rem' }}>🔥</span>
            <span>{streak}</span>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: isDesktop ? '0.75rem 1.5rem 1rem' : '1.25rem 1rem', gap: isDesktop ? '0.65rem' : '1.25rem' }}>

        {/* Settings panel — secondary, narrower than the question box */}
        <div style={{
          display: 'flex', gap: '0.85rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start',
          background: '#fff', borderRadius: '16px', padding: '0.65rem 0.9rem',
          border: '2px solid #E5E5E5', boxShadow: '0 3px 0 #E5E5E5',
          maxWidth: isDesktop ? '440px' : '480px', width: '100%',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
            <div style={{ fontSize: '0.62rem', fontWeight: 900, color: '#9A9A9A', letterSpacing: '0.1em' }}>
              {bm ? 'TAHAP' : 'LEVEL'}
            </div>
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              {[
                { id: 'easy',   label: bm ? 'Senang'    : 'Easy',   emoji: '🌱', color: '#58CC02', dark: '#46A302' },
                { id: 'medium', label: bm ? 'Sederhana' : 'Medium', emoji: '⭐', color: '#FFC800', dark: '#C99800' },
                { id: 'hard',   label: bm ? 'Susah'     : 'Hard',   emoji: '🔥', color: '#FF4B4B', dark: '#CC0000' },
              ].map(d => {
                const sel = difficulty === d.id;
                return (
                  <button key={d.id} onClick={() => setDifficulty(d.id)} className="cmg-btn" style={{
                    padding: '0.35rem 0.65rem', borderRadius: '11px',
                    fontWeight: 800, fontSize: '0.76rem',
                    background: sel ? d.color : '#F4F4F4',
                    color: sel ? '#fff' : '#777',
                    border: 'none',
                    borderBottom: sel ? `3px solid ${d.dark}` : '3px solid #DCDCDC',
                    cursor: 'pointer',
                    display: 'inline-flex', gap: '4px', alignItems: 'center',
                  }}>
                    <span style={{ fontSize: '0.85rem' }}>{d.emoji}</span>
                    <span>{d.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ width: 1, alignSelf: 'stretch', background: '#E5E5E5' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
            <div style={{ fontSize: '0.62rem', fontWeight: 900, color: '#9A9A9A', letterSpacing: '0.1em' }}>
              {bm ? 'OPERASI' : 'OPERATION'}
            </div>
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              {[
                { id: 'random', label: '🎲', title: bm ? 'Rawak' : 'Random' },
                { id: '+',      label: '➕', title: bm ? 'Tambah' : 'Add' },
                { id: '-',      label: '➖', title: bm ? 'Tolak' : 'Subtract' },
                { id: '×',      label: '✖️', title: bm ? 'Darab' : 'Multiply' },
              ].map(o => {
                const sel = op === o.id;
                return (
                  <button key={o.id} onClick={() => setOp(o.id)} title={o.title} className="cmg-btn" style={{
                    padding: '0.32rem 0.7rem', borderRadius: '11px',
                    fontWeight: 800, fontSize: '1rem',
                    background: sel ? '#1CB0F6' : '#F4F4F4',
                    border: 'none',
                    borderBottom: sel ? '3px solid #0E8FD0' : '3px solid #DCDCDC',
                    cursor: 'pointer',
                  }}>{o.label}</button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Column problem card — main focus, dominant on desktop */}
        <div
          key={`${problem.num1}-${problem.num2}-${problem.op}`}
          className={`cmg-card ${status === 'wrong' ? 'cmg-shake' : ''}`}
          style={{
            position: 'relative',
            background: '#fff', borderRadius: '24px',
            padding: isDesktop ? '1.5rem 2.5rem 1.75rem' : '2.2rem 2rem 2.4rem',
            border: '3px solid #E5E5E5', boxShadow: '0 6px 0 #E5E5E5',
            minWidth: CARD_MIN ? `${CARD_MIN}px` : undefined,
            width: isDesktop ? 'auto' : '100%',
            maxWidth: '720px',
            boxSizing: 'border-box',
          }}
        >
          {/* Top color stripe themed by operation */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: isDesktop ? '8px' : '6px', background: opTheme.stripe, borderTopLeftRadius: '21px', borderTopRightRadius: '21px' }} />

          {/* Operation badge */}
          <div style={{
            position: 'absolute', top: isDesktop ? '18px' : '14px', right: isDesktop ? '18px' : '14px',
            width: isDesktop ? '42px' : '34px', height: isDesktop ? '42px' : '34px', borderRadius: '50%',
            background: opTheme.main, color: '#fff',
            fontWeight: 900, fontSize: isDesktop ? '1.35rem' : '1.1rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: '"Courier New", monospace',
            boxShadow: `0 3px 0 ${opTheme.dark}`,
          }}>
            {problem.op}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', width: totalW, margin: '0 auto' }}>


            {/* Multiplication Carry Row 2 (Top-most) */}
            {problem.hasPartials && p2Carries.some(v => v !== null) && (
              <div style={{ display: 'flex', alignItems: 'center', height: isDesktop ? '38px' : '30px', marginBottom: '2px' }}>
                <div style={{ width: OP_W }} />
                {Array.from({ length: maxLen }, (_, i) => {
                  const cInfo = p2Carries[i];
                  // Visible if there's a carry needed AND user has reached or passed the active column for it
                  // For partial 2, the ones digit corresponds to index maxLen - 2
                  // The calculation for digit i+1 might generate carry for i
                  // Let's just show it if activeSection is partial2/partial2Carry and activeIdx <= i+1
                  // Actually, just show it when partial1 is done and we are on partial 2
                  const isP1Done = !partial1Inputs.slice(maxLen - String(problem.partial1).length).includes('');
                  const isVisible = cInfo !== null && isP1Done;
                  
                  if (!isVisible) return <div key={i} style={{ width: CELL_W }} />;
                  const c = partial2CarryInputs[i] ?? '';
                  const isActive = status === 'playing' && activeSection === 'partial2Carry' && activePartial2CarryIdx === i;
                  return (
                    <div key={i} style={{ width: CELL_W, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <input
                        ref={el => partial2CarryRefs.current[i] = el}
                        type="text" inputMode="numeric" maxLength={2}
                        value={c} readOnly={status !== 'playing'} tabIndex={status !== 'playing' ? -1 : 0}
                        onChange={e => handlePartial2CarryChange(i, e.target.value)}
                        onKeyDown={e => handlePartial2CarryKeyDown(i, e)}
                        onFocus={() => { if (status === 'playing') { setActiveSection('partial2Carry'); setActivePartial2CarryIdx(i); } }}
                        style={{
                          width: TOP_W1, height: TOP_H, boxSizing: 'border-box',
                          border: `2px solid ${isActive ? '#1CB0F6' : '#C0C0C0'}`,
                          borderRadius: '6px', background: isActive ? '#EAF7FF' : '#fafafa',
                          textAlign: 'center', fontSize: TOP_FS, fontWeight: 900, fontFamily: '"Courier New", monospace',
                          color: '#1CB0F6', outline: 'none', caretColor: 'transparent', cursor: 'pointer'
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {/* Multiplication Carry Row 1 */}
            {problem.hasPartials && p1Carries.some(v => v !== null) && (
              <div style={{ display: 'flex', alignItems: 'center', height: isDesktop ? '38px' : '30px', marginBottom: '4px' }}>
                <div style={{ width: OP_W }} />
                {Array.from({ length: maxLen }, (_, i) => {
                  const cInfo = p1Carries[i];
                  // Visible if there's a carry and we are calculating it or beyond it
                  // activePartial1Idx goes from maxLen-1 down to maxLen - N1.
                  // If activePartial1Idx <= i+1, we have reached the point where this carry is generated.
                  const isVisible = cInfo !== null && (activeSection !== 'answer' && activeSection !== 'topRow') && (activePartial1Idx <= i + 1 || activeSection === 'partial1Carry' || activeSection === 'partial2' || activeSection === 'partial2Carry');
                  
                  if (!isVisible) return <div key={i} style={{ width: CELL_W }} />;
                  const c = partial1CarryInputs[i] ?? '';
                  const isActive = status === 'playing' && activeSection === 'partial1Carry' && activePartial1CarryIdx === i;
                  return (
                    <div key={i} style={{ width: CELL_W, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <input
                        ref={el => partial1CarryRefs.current[i] = el}
                        type="text" inputMode="numeric" maxLength={2}
                        value={c} readOnly={status !== 'playing'} tabIndex={status !== 'playing' ? -1 : 0}
                        onChange={e => handlePartial1CarryChange(i, e.target.value)}
                        onKeyDown={e => handlePartial1CarryKeyDown(i, e)}
                        onFocus={() => { if (status === 'playing') { setActiveSection('partial1Carry'); setActivePartial1CarryIdx(i); } }}
                        style={{
                          width: TOP_W1, height: TOP_H, boxSizing: 'border-box',
                          border: `2px solid ${isActive ? '#CE82FF' : '#C0C0C0'}`,
                          borderRadius: '6px', background: isActive ? '#F3E5FF' : '#fafafa',
                          textAlign: 'center', fontSize: TOP_FS, fontWeight: 900, fontFamily: '"Courier New", monospace',
                          color: '#CE82FF', outline: 'none', caretColor: 'transparent', cursor: 'pointer'
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {/* Carry / Borrow row for Addition / Subtraction */}
            {showTopRow && (
              <div style={{ display: 'flex', alignItems: 'center', height: isDesktop ? '50px' : '38px' }}>
                <div style={{ width: OP_W }} />
                {topRow.map((val, i) => {
                  const hide = p1[i] === ' ' && p2[i] === ' ';
                  const isSubBorrow = problem.op === '-' && (userStruckRow[i] || userBorrowedTo[i]);
                  const isTwoDigit = (topRowInputs[i] ?? '').length >= 2;
                  const hasCarry = problem.op === '+' ? (val !== null && !hide) : isSubBorrow;
                  const isTopActive = activeSection === 'topRow' && activeTopIdx === i && status === 'playing' && problem.op === '+';
                  const isReadonly = status !== 'playing' || problem.op === '-';
                  return (
                    <div key={i} style={{ width: CELL_W, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      {hasCarry && (
                        <input
                          ref={el => topRowRefs.current[i] = el}
                          type="text" inputMode="numeric" maxLength={2}
                          value={topRowInputs[i] ?? ''} readOnly={isReadonly} tabIndex={isReadonly ? -1 : 0}
                          onChange={e => handleTopRowChange(i, e.target.value)}
                          onKeyDown={e => handleTopRowKeyDown(i, e)}
                          onFocus={() => { if (!isReadonly) { setActiveSection('topRow'); setActiveTopIdx(i); } }}
                          style={{
                            width: isTwoDigit ? TOP_W2 : TOP_W1, height: TOP_H, boxSizing: 'border-box',
                            border: `2px solid ${isTopActive ? '#1CB0F6' : '#C0C0C0'}`, borderRadius: '8px',
                            background: isTopActive ? '#EAF7FF' : isReadonly ? '#F0F0F0' : '#fafafa',
                            textAlign: 'center', fontSize: TOP_FS, fontWeight: 900, fontFamily: '"Courier New", monospace',
                            color: problem.op === '+' ? '#58CC02' : '#FF4B4B', outline: 'none', caretColor: 'transparent', cursor: isReadonly ? 'default' : 'pointer',
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
                const canBorrow = problem.op === '-' && status === 'playing' && d !== ' ' && !isStruck && i < maxLen - 1 && !userBorrowedTo[i] && needsBorrowAt(i + 1);
                return (
                  <div key={i}
                    onClick={() => { if (canBorrow) setConfirmBorrowIdx(i); }}
                    title={canBorrow ? (bm ? 'Klik untuk pinjam' : 'Tap to borrow') : undefined}
                    style={{
                      width: CELL_W, textAlign: 'center', fontSize: DIGIT_FS, fontWeight: 700, fontFamily: '"Courier New", monospace',
                      color: isStruck ? '#C8C8C8' : '#3C3C3C', textDecoration: isStruck ? 'line-through' : 'none',
                      textDecorationThickness: isStruck ? '3px' : undefined, textDecorationColor: isStruck ? '#FF4B4B' : undefined,
                      cursor: canBorrow ? 'pointer' : 'default', borderRadius: '10px', transition: 'background 0.15s, transform 0.12s',
                      background: canBorrow ? 'rgba(255, 200, 0, 0.10)' : 'transparent',
                    }}>
                    {d === ' ' ? '' : d}
                  </div>
                );
              })}
            </div>

            {/* Row 2 — op + num2 */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: OP_W, textAlign: 'center', fontSize: DIGIT_FS, fontWeight: 900, fontFamily: '"Courier New", monospace', color: opTheme.main }}>
                {problem.op}
              </div>
              {p2.split('').map((d, i) => (
                <div key={i} style={{ width: CELL_W, textAlign: 'center', fontSize: DIGIT_FS, fontWeight: 700, fontFamily: '"Courier New", monospace', color: '#3C3C3C' }}>
                  {d === ' ' ? '' : d}
                </div>
              ))}
            </div>

            {/* Top separator */}
            <div style={{ borderTop: '3px solid #3C3C3C', margin: '4px 0' }} />

            {/* Partial product rows (multiplication, medium/hard) */}
            {problem.hasPartials && (
              <>
                {/* Partial 1 */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: OP_W }} />
                  {Array.from({ length: maxLen }, (_, i) => {
                    const N1 = String(problem.partial1).length;
                    const inRange = i >= maxLen - N1;
                    if (!inRange) return <div key={i} style={{ width: CELL_W }} />;
                    const d = partial1Inputs[i] ?? '';
                    const isActive = status === 'playing' && activeSection === 'partial1' && activePartial1Idx === i;
                    const correctD = String(problem.partial1)[i - (maxLen - N1)];
                    const isWrong = status === 'wrong' && d !== correctD;
                    const isCorrect = status === 'correct';
                    return (
                      <input
                        key={i} ref={el => partial1Refs.current[i] = el}
                        type="text" inputMode="numeric" maxLength={2} value={d} readOnly={status !== 'playing'}
                        onChange={e => handlePartial1Change(i, e.target.value)} onKeyDown={e => handlePartial1KeyDown(i, e)}
                        onFocus={() => { if (status === 'playing') { setActiveSection('partial1'); setActivePartial1Idx(i); } }}
                        style={{
                          width: CELL_W - 6, height: ANS_H, margin: '0 3px', boxSizing: 'border-box',
                          border: `3px solid ${isActive ? '#1CB0F6' : isWrong ? '#FF4B4B' : isCorrect ? '#58CC02' : '#ADADAD'}`,
                          borderRadius: '12px', background: isActive ? '#EAF7FF' : isWrong ? '#FFEBEB' : isCorrect ? '#EFFFEA' : '#fafafa',
                          textAlign: 'center', fontSize: ANS_FS, fontWeight: 700, fontFamily: '"Courier New", monospace',
                          color: isWrong ? '#FF4B4B' : isCorrect ? '#58CC02' : '#3C3C3C', outline: 'none', caretColor: 'transparent', cursor: 'pointer', transition: 'all 0.12s',
                        }}
                      />
                    );
                  })}
                </div>

                {/* Addition Carry row for final sum */}
                {addCarries.some(v => v !== null) && (
                  <div style={{ display: 'flex', alignItems: 'center', height: isDesktop ? '38px' : '30px', marginTop: '4px' }}>
                    <div style={{ width: OP_W }} />
                    {Array.from({ length: maxLen }, (_, i) => {
                      const cInfo = addCarries[i];
                      const isP1P2Done = !partial1Inputs.slice(maxLen - String(problem.partial1).length).includes('') && !partial2Inputs.slice(maxLen - String(problem.partial2).length - 1, -1).includes('');
                      const isVisible = cInfo !== null && isP1P2Done;
                      
                      if (!isVisible) return <div key={i} style={{ width: CELL_W }} />;
                      const c = topRowInputs[i] ?? '';
                      const isActive = status === 'playing' && activeSection === 'topRow' && activeTopIdx === i;
                      return (
                        <div key={i} style={{ width: CELL_W, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <input
                            ref={el => topRowRefs.current[i] = el}
                            type="text" inputMode="numeric" maxLength={2}
                            value={c} readOnly={status !== 'playing'} tabIndex={status !== 'playing' ? -1 : 0}
                            onChange={e => handleTopRowChange(i, e.target.value)}
                            onKeyDown={e => handleTopRowKeyDown(i, e)}
                            onFocus={() => { if (status === 'playing') { setActiveSection('topRow'); setActiveTopIdx(i); } }}
                            style={{
                              width: TOP_W1, height: TOP_H, boxSizing: 'border-box',
                              border: `2px solid ${isActive ? '#58CC02' : '#C0C0C0'}`,
                              borderRadius: '6px', background: isActive ? '#EEFCDD' : '#fafafa',
                              textAlign: 'center', fontSize: TOP_FS, fontWeight: 900, fontFamily: '"Courier New", monospace',
                              color: '#58CC02', outline: 'none', caretColor: 'transparent', cursor: 'pointer'
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Partial 2 */}
                <div style={{ display: 'flex', alignItems: 'center', marginTop: addCarries.some(v => v !== null) ? '0px' : '4px' }}>
                  {/* + sign appears when p1 is done */}
                  {(() => {
                    const isP1Done = !partial1Inputs.slice(maxLen - String(problem.partial1).length).includes('');
                    return (
                      <div style={{ width: OP_W, textAlign: 'center', fontSize: DIGIT_FS, fontWeight: 900, fontFamily: '"Courier New", monospace', color: isP1Done ? '#58CC02' : 'transparent' }}>+</div>
                    );
                  })()}
                  {Array.from({ length: maxLen }, (_, i) => {
                    const N2 = String(problem.partial2).length;
                    const isLastCol = i === maxLen - 1;
                    const inRange = i >= maxLen - N2 - 1 && i <= maxLen - 2;
                    if (!inRange && !isLastCol) return <div key={i} style={{ width: CELL_W }} />;

                    if (isLastCol) {
                      const isP1Done = !partial1Inputs.slice(maxLen - String(problem.partial1).length).includes('');
                      return (
                        <div key={i} style={{ width: CELL_W - 6, height: ANS_H, margin: '0 3px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: ANS_FS, fontWeight: 700, fontFamily: '"Courier New", monospace', color: isP1Done ? '#999' : 'transparent', background: isP1Done ? '#F5F5F5' : 'transparent', borderRadius: '12px', border: `3px solid ${isP1Done ? '#D0D0D0' : 'transparent'}` }}>
                          {isP1Done ? '0' : ''}
                        </div>
                      );
                    }

                    const d = partial2Inputs[i] ?? '';
                    const isActive = status === 'playing' && activeSection === 'partial2' && activePartial2Idx === i;
                    const correctD = String(problem.partial2)[i - (maxLen - N2 - 1)];
                    const isWrong = status === 'wrong' && d !== correctD;
                    const isCorrect = status === 'correct';
                    return (
                      <input
                        key={i} ref={el => partial2Refs.current[i] = el}
                        type="text" inputMode="numeric" maxLength={2} value={d} readOnly={status !== 'playing'}
                        onChange={e => handlePartial2Change(i, e.target.value)} onKeyDown={e => handlePartial2KeyDown(i, e)}
                        onFocus={() => { if (status === 'playing') { setActiveSection('partial2'); setActivePartial2Idx(i); } }}
                        style={{
                          width: CELL_W - 6, height: ANS_H, margin: '0 3px', boxSizing: 'border-box',
                          border: `3px solid ${isActive ? '#1CB0F6' : isWrong ? '#FF4B4B' : isCorrect ? '#58CC02' : '#ADADAD'}`,
                          borderRadius: '12px', background: isActive ? '#EAF7FF' : isWrong ? '#FFEBEB' : isCorrect ? '#EFFFEA' : '#fafafa',
                          textAlign: 'center', fontSize: ANS_FS, fontWeight: 700, fontFamily: '"Courier New", monospace',
                          color: isWrong ? '#FF4B4B' : isCorrect ? '#58CC02' : '#3C3C3C', outline: 'none', caretColor: 'transparent', cursor: 'pointer', transition: 'all 0.12s',
                        }}
                      />
                    );
                  })}
                </div>

                {/* Separator between partials and final total */}
                <div style={{ borderTop: '3px solid #3C3C3C', margin: '4px 0' }} />
              </>
            )}

            {/* Row 3 — answer inputs */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: OP_W }} />
              {inputDigits.map((d, i) => {
                const isActive = status === 'playing' && i === activeIdx && activeSection === 'answer';
                const correctD = sa[i];
                const isWrong = status === 'wrong' && d !== correctD;
                const isCorrect = status === 'correct';
                return (
                  <input
                    key={i} ref={el => inputRefs.current[i] = el}
                    type="text" inputMode="numeric" maxLength={2} value={d} readOnly={status !== 'playing'}
                    onChange={e => handleAnswerChange(i, e.target.value)} onKeyDown={e => handleAnswerKeyDown(i, e)}
                    onFocus={() => { if (status === 'playing') { setActiveSection('answer'); setActiveIdx(i); } }}
                    style={{
                      width: CELL_W - 6, height: ANS_H, margin: '0 3px', boxSizing: 'border-box',
                      border: `3px solid ${isActive ? '#1CB0F6' : isWrong ? '#FF4B4B' : isCorrect ? '#58CC02' : '#ADADAD'}`,
                      borderRadius: '12px', background: isActive ? '#EAF7FF' : isWrong ? '#FFEBEB' : isCorrect ? '#EFFFEA' : '#fafafa',
                      textAlign: 'center', fontSize: ANS_FS, fontWeight: 700, fontFamily: '"Courier New", monospace',
                      color: isWrong ? '#FF4B4B' : isCorrect ? '#58CC02' : '#3C3C3C', outline: 'none', caretColor: 'transparent', cursor: 'pointer', transition: 'all 0.12s',
                    }}
                  />
                );
              })}
            </div>
            {/* Bottom separator */}
            <div style={{ borderTop: '3px solid #3C3C3C', marginTop: '4px' }} />
          </div>
        </div>

        {/* Borrow guidance message */}
        {lockMessage && status === 'playing' && (
          <div className="cmg-banner" style={{
            display: 'flex', gap: '0.6rem', alignItems: 'flex-start',
            fontWeight: 700, fontSize: '0.92rem', padding: '0.7rem 1rem', borderRadius: '14px',
            color: '#7A4E00', background: '#FFF8E1',
            border: '2px solid #FFC800', borderBottom: '4px solid #E0A800',
            maxWidth: '440px', textAlign: 'left', lineHeight: 1.4,
            boxShadow: '0 3px 0 #F1D89A',
          }}>
            <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>🏠</span>
            <span>{lockMessage}</span>
          </div>
        )}

        {/* Submit button (while playing) */}
        {status === 'playing' && (() => {
          let ready = false;
          if (problem) {
            const ml = Math.max(String(problem.num1).length, String(problem.num2).length, String(problem.answer).length);
            ready = true;
            for (let i = 0; i < ml; i++) {
              if (inputDigits[i] === '') { ready = false; break; }
            }
            if (ready && problem.hasPartials) {
              const N1 = String(problem.partial1).length;
              const N2 = String(problem.partial2).length;
              for (let i = ml - N1; i <= ml - 1; i++) {
                if (!partial1Inputs[i]) { ready = false; break; }
              }
              if (ready) {
                for (let i = ml - N2 - 1; i <= ml - 2; i++) {
                  if (!partial2Inputs[i]) { ready = false; break; }
                }
              }
            }
          }
          return (
            <button
              onClick={submitAnswer}
              disabled={!ready}
              className={`cmg-btn ${ready ? 'cmg-submit-ready' : ''}`}
              style={{
                padding: isDesktop ? '0.7rem 2.5rem' : '0.95rem 3rem',
                background: ready ? '#58CC02' : '#E5E5E5',
                color: ready ? '#fff' : '#AFAFAF',
                fontWeight: 900, fontSize: '1rem',
                letterSpacing: '0.04em', textTransform: 'uppercase',
                borderRadius: '16px', border: 'none',
                borderBottom: ready ? '4px solid #46A302' : '4px solid #C0C0C0',
                cursor: ready ? 'pointer' : 'not-allowed',
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                minWidth: '180px', justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: '1.1rem' }}>✓</span>
              <span>{bm ? 'Hantar' : 'Submit'}</span>
            </button>
          );
        })()}

        {/* Feedback banner (wrong answer only) */}
        {status === 'wrong' && (
          <>
            <div className="cmg-banner" style={{
              display: 'flex', alignItems: 'center', gap: '0.55rem',
              fontWeight: 800, fontSize: '1rem', padding: '0.7rem 1.4rem', borderRadius: '14px',
              color: '#c0392b',
              background: '#FFEBEB',
              border: '2px solid #FF4B4B',
              borderBottom: '4px solid #CC0000',
            }}>
              <span style={{ fontSize: '1.4rem' }}>😅</span>
              <span>{bm ? `Jawapan betul ialah ${problem.answer}` : `Correct answer is ${problem.answer}`}</span>
            </div>
            <button onClick={newProblem} className="cmg-btn" style={{
              padding: isDesktop ? '0.75rem 2.4rem' : '1rem 2.6rem', background: '#1CB0F6', color: '#fff',
              fontWeight: 900, fontSize: '1rem', letterSpacing: '0.04em', textTransform: 'uppercase',
              borderRadius: '16px', border: 'none', borderBottom: '4px solid #0E8FD0', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem', minWidth: '200px', justifyContent: 'center',
            }}>
              <span>{bm ? 'Cuba Lagi' : 'Try Again'}</span>
              <span style={{ fontSize: '1.1rem' }}>→</span>
            </button>
          </>
        )}

      </div>

      {/* Footer stats bar */}
      <div style={{
        background: '#fff', borderTop: '2px solid #E5E5E5', padding: '0.75rem 1rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
        flexShrink: 0, paddingBottom: `calc(0.75rem + ${0}px)`,
      }}>
        {/* Answered count */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '6px 12px', background: '#F0FFF0', borderRadius: '12px',
          fontWeight: 900, fontSize: '0.9rem', color: '#2d8a00',
          border: '1.5px solid #58CC02',
        }}>
          <span style={{ fontSize: '1rem' }}>✅</span>
          <span>{totalAnswered}{bm ? ' dijawab' : ' answered'}</span>
        </div>

        {/* Level progress */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          flex: 1, minWidth: '150px',
        }}>
          <span style={{ fontSize: '1rem', fontWeight: 800 }}>🏆</span>
          <div style={{
            flex: 1, height: '8px', background: '#E5E5E5', borderRadius: '4px',
            overflow: 'hidden', position: 'relative',
          }}>
            <div style={{
              height: '100%', background: 'linear-gradient(90deg, #58CC02, #FFC800)',
              width: `${Math.min((totalAnswered / 10) * 100, 100)}%`,
              transition: 'width 0.4s ease',
            }} />
          </div>
          <span style={{
            fontSize: '0.85rem', fontWeight: 800, color: '#AFAFAF',
            minWidth: '40px', textAlign: 'right',
          }}>
            {Math.min(totalAnswered, 10)}/10
          </span>
        </div>
      </div>
    </div>
  );
}
