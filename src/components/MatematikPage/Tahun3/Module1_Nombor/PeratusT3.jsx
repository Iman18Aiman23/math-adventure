import React, { useState, useCallback, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../../../utils/soundManager';
import BackButton from '../../../BackButton';

const ACCENT = '#14B8A6';
const DARK = '#0F766E';

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randInt(lo, hi) {
  return Math.floor(Math.random() * (hi - lo + 1)) + lo;
}

function PercentGrid({ filled, total = 100, color = ACCENT }) {
  const cols = 10;
  const cellSize = 8;
  const gap = 1.2;
  const gridW = cols * (cellSize + gap) - gap;
  const rows = 10;
  const gridH = rows * (cellSize + gap) - gap;
  return (
    <svg viewBox={`0 0 ${gridW} ${gridH}`} width={gridW * 1.8} height={gridH * 1.8}>
      {Array.from({ length: total }, (_, i) => {
        const x = (i % cols) * (cellSize + gap);
        const y = Math.floor(i / cols) * (cellSize + gap);
        return (
          <rect key={i} x={x} y={y} width={cellSize} height={cellSize} rx={1.2}
            fill={i < filled ? color : '#E8E8E8'}
            stroke={i < filled ? 'rgba(15,118,110,0.2)' : '#D0D0D0'}
            strokeWidth="0.3" />
        );
      })}
    </svg>
  );
}

const FRACTION_PCT = [
  { frac: '1/2', pct: '50%', decimal: 0.5 },
  { frac: '1/4', pct: '25%', decimal: 0.25 },
  { frac: '3/4', pct: '75%', decimal: 0.75 },
  { frac: '1/10', pct: '10%', decimal: 0.1 },
  { frac: '1/5', pct: '20%', decimal: 0.2 },
  { frac: '1/100', pct: '1%', decimal: 0.01 },
  { frac: '2/5', pct: '40%', decimal: 0.4 },
  { frac: '3/5', pct: '60%', decimal: 0.6 },
  { frac: '2/4', pct: '50%', decimal: 0.5 },
  { frac: '5/10', pct: '50%', decimal: 0.5 },
];

const PCT_CALCS = [
  { pct: 10, num: 50, ans: 5 },
  { pct: 25, num: 40, ans: 10 },
  { pct: 50, num: 60, ans: 30 },
  { pct: 20, num: 50, ans: 10 },
  { pct: 10, num: 80, ans: 8 },
  { pct: 25, num: 20, ans: 5 },
  { pct: 50, num: 20, ans: 10 },
  { pct: 20, num: 100, ans: 20 },
  { pct: 10, num: 30, ans: 3 },
  { pct: 75, num: 40, ans: 30 },
  { pct: 50, num: 100, ans: 50 },
  { pct: 25, num: 100, ans: 25 },
  { pct: 10, num: 90, ans: 9 },
  { pct: 20, num: 30, ans: 6 },
  { pct: 75, num: 20, ans: 15 },
  { pct: 5, num: 60, ans: 3 },
];

function generateGrid() {
  const filled = randInt(2, 9) * 5;
  const correct = `${filled}%`;
  const allPcts = [];
  for (let p = 5; p <= 95; p += 5) {
    allPcts.push(`${p}%`);
  }
  const wrongs = shuffle(allPcts.filter(p => p !== correct)).slice(0, 3);
  return {
    type: 'grid',
    question_bm: 'Berapa peratus berlorek?',
    question_eng: 'What percentage is shaded?',
    filled,
    options: shuffle([correct, ...wrongs]),
    answer: correct,
    label_bm: '\uD83D\uDDF2\ufe0f Grid Peratus',
    label_eng: '\uD83D\uDDF2\ufe0f Percent Grid',
  };
}

function generateTukar() {
  const item = FRACTION_PCT[randInt(0, FRACTION_PCT.length - 1)];
  const allPcts = [];
  for (const f of FRACTION_PCT) {
    if (!allPcts.includes(f.pct)) allPcts.push(f.pct);
  }
  const wrongs = shuffle(allPcts.filter(p => p !== item.pct)).slice(0, 3);
  return {
    type: 'tukar',
    question_bm: `Tukarkan ${item.frac} kepada peratus.`,
    question_eng: `Convert ${item.frac} to a percentage.`,
    options: shuffle([item.pct, ...wrongs]),
    answer: item.pct,
    label_bm: '\uD83D\uDD04 Tukar Peratus',
    label_eng: '\uD83D\uDD04 Convert Percentage',
  };
}

function generateKira() {
  const calc = PCT_CALCS[randInt(0, PCT_CALCS.length - 1)];
  const correct = calc.ans.toString();
  const wrongs = new Set();
  for (const v of [calc.ans + randInt(1, 3), Math.max(1, calc.ans - randInt(1, 3)), calc.num - calc.ans, Math.round(calc.num * calc.pct / 100 + randInt(2, 5)), Math.max(1, calc.ans * 2)]) {
    if (v !== calc.ans && v > 0) wrongs.add(v);
  }
  const filtered = [...wrongs].slice(0, 3).map(String);
  while (filtered.length < 3) {
    const v = Math.max(1, calc.ans + randInt(-3, 3));
    const vs = v.toString();
    if (vs !== correct && !filtered.includes(vs)) filtered.push(vs);
  }
  return {
    type: 'kira',
    question_bm: `${calc.pct}% daripada ${calc.num} = ?`,
    question_eng: `${calc.pct}% of ${calc.num} = ?`,
    options: shuffle([correct, ...filtered]),
    answer: correct,
    label_bm: '\uD83E\uDDE9 Kira Peratus',
    label_eng: '\uD83E\uDDE9 Calculate Percentage',
    calc,
  };
}

function generateQuestion(mechanic) {
  if (mechanic === 'grid') return generateGrid();
  if (mechanic === 'tukar') return generateTukar();
  return generateKira();
}

const TOTAL_QUESTIONS = 12;
const QUESTIONS_PER_MECHANIC = 4;
const MECHANICS = ['grid', 'tukar', 'kira'];

export default function PeratusT3({ onBack, language = 'bm' }) {
  const [gameStarted, setGameStarted] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const questions = useMemo(() => {
    const qs = [];
    MECHANICS.forEach(mechanic => {
      for (let i = 0; i < QUESTIONS_PER_MECHANIC; i++) {
        qs.push(generateQuestion(mechanic));
      }
    });
    return shuffle(qs);
  }, []);

  const question = questions[qIdx];
  const isCorrect = selectedAnswer === question?.answer;

  const handleSelect = useCallback((option) => {
    if (isAnswered || !question) return;
    playHoverSound();
    setSelectedAnswer(option);
    if (option === question.answer) {
      playSound('correct');
      setScore(s => s + 1);
      confetti({ particleCount: 40, spread: 55, colors: ['#14B8A6', '#0F766E', '#5EEAD4'] });
    } else {
      playSound('incorrect');
    }
    setIsAnswered(true);
  }, [isAnswered, question]);

  const handleNext = useCallback(() => {
    if (!isAnswered) return;
    if (qIdx < questions.length - 1) {
      setQIdx(qIdx + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      playSound('levelup');
      confetti({ particleCount: 120, spread: 70, colors: ['#14B8A6', '#0F766E', '#5EEAD4'] });
      setIsDone(true);
    }
  }, [isAnswered, qIdx, questions.length]);

  const handleResetQuestion = useCallback(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, []);

  const handleResetGame = useCallback(() => {
    setQIdx(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsDone(false);
  }, []);

  const getOptionStyle = (option) => {
    if (!isAnswered) return { bg: '#FFF', border: ACCENT, color: '#333' };
    if (option === question.answer) return { bg: '#4CAF50', border: '#388E3C', color: 'white' };
    if (option === selectedAnswer) return { bg: '#FF6B6B', border: '#D32F2F', color: 'white' };
    return { bg: '#F0FDFA', border: '#CCFBF1', color: '#94A3B8' };
  };

  if (!gameStarted) {
    return (
      <div style={{ minHeight: '100%', background: 'linear-gradient(135deg,#CCFBF1 0%,#5EEAD4 50%,#0F766E 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem', lineHeight: 1 }}>{'%'}</div>
        <h1 style={{ fontFamily: "'Baloo 2',sans-serif", color: '#FFF', fontSize: '2.4rem', textAlign: 'center', marginBottom: '0.5rem', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
          {language === 'bm' ? 'Peratus' : 'Percentages'}
        </h1>
        <p style={{ fontFamily: "'Fredoka',sans-serif", color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', textAlign: 'center', maxWidth: '320px', marginBottom: '2.5rem' }}>
          {language === 'bm'
            ? 'Belajar maksud peratus — per makna "daripada setiap seratus"!'
            : 'Learn the meaning of percent — "out of every hundred"!'}
        </p>
        <button onClick={() => setGameStarted(true)}
          style={{ padding: '1rem 3rem', background: '#FFF', color: DARK, border: 'none', borderRadius: '16px', fontFamily: "'Baloo 2',sans-serif", fontSize: '1.6rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 6px 0 #0F766E, 0 8px 20px rgba(0,0,0,0.15)', transition: 'transform 0.1s, boxShadow 0.1s' }}>
          {language === 'bm' ? '\u{1F680} Mula' : '\u{1F680} Start'}
        </button>
      </div>
    );
  }

  if (isDone) {
    return (
      <div style={{ minHeight: '100%', background: 'linear-gradient(135deg,#CCFBF1 0%,#5EEAD4 50%,#0F766E 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>{'\uD83C\uDF89'}</div>
        <h2 style={{ fontFamily: "'Baloo 2',sans-serif", color: '#FFF', fontSize: '2rem', marginBottom: '0.5rem', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
          {language === 'bm' ? 'Tahniah!' : 'Well Done!'}
        </h2>
        <p style={{ fontFamily: "'Fredoka',sans-serif", fontSize: '1.4rem', color: 'rgba(255,255,255,0.9)', marginBottom: '1.5rem' }}>
          {language === 'bm' ? 'Markah: ' : 'Score: '}<strong style={{ fontSize: '2rem' }}>{score}</strong>/{TOTAL_QUESTIONS}
        </p>
        <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: '16px', padding: '1.5rem 2rem', marginBottom: '2rem', textAlign: 'center', maxWidth: '360px', width: '100%' }}>
          <div style={{ fontFamily: "'Baloo 2',sans-serif", color: DARK, fontSize: '3rem', fontWeight: 800 }}>
            {score >= 10 ? '\uD83C\uDF1F' : score >= 7 ? '\u2B50' : '\uD83D\uDCA1'}
          </div>
          <p style={{ fontFamily: "'Fredoka',sans-serif", color: '#555', fontSize: '1rem', marginTop: '0.5rem' }}>
            {score === TOTAL_QUESTIONS
              ? (language === 'bm' ? 'Hebat! Kamu menjawab semua dengan betul!' : 'Amazing! You got all correct!')
              : score >= 8
                ? (language === 'bm' ? 'Syabas! Teruskan usaha!' : 'Great job! Keep it up!')
                : (language === 'bm' ? 'Jangan putus asa! Cuba lagi!' : 'Don\'t give up! Try again!')}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={handleResetGame} style={{ padding: '0.85rem 2rem', background: 'rgba(255,255,255,0.3)', color: '#FFF', border: '2px solid rgba(255,255,255,0.6)', borderRadius: '12px', fontFamily: "'Baloo 2',sans-serif", fontSize: '1.1rem', cursor: 'pointer', fontWeight: 700 }}>
            {language === 'bm' ? 'Cuba Lagi' : 'Try Again'}
          </button>
          <button onClick={onBack} style={{ padding: '0.85rem 2rem', background: '#FFF', color: DARK, border: 'none', borderRadius: '12px', fontFamily: "'Baloo 2',sans-serif", fontSize: '1.1rem', cursor: 'pointer', fontWeight: 700, boxShadow: '0 3px 0 #0F766E' }}>
            {language === 'bm' ? 'Kembali' : 'Back'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg,#CCFBF1 0%,#5EEAD4 50%,#0F766E 100%)', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <h1 style={{ fontFamily: "'Baloo 2',sans-serif", color: '#FFF', marginBottom: '0.25rem', fontSize: '1.6rem', textShadow: '0 1px 3px rgba(0,0,0,0.15)' }}>
            {language === 'bm' ? 'Peratus' : 'Percentages'}
          </h1>
          <p style={{ fontFamily: "'Fredoka',sans-serif", color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Peratus bermaksud "daripada seratus"' : 'Percent means "out of a hundred"'}
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(4px)', borderRadius: '10px' }}>
          <span style={{ fontFamily: "'Fredoka',sans-serif", color: '#FFF', fontSize: '0.9rem', fontWeight: 600 }}>
            {language === 'bm' ? `Soalan ${qIdx + 1}/${TOTAL_QUESTIONS}` : `Q${qIdx + 1}/${TOTAL_QUESTIONS}`}
          </span>
          <span style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 700, color: '#FFF', fontSize: '1.1rem' }}>
            {'\u2605'} {score}
          </span>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ background: '#FFF', borderRadius: '16px', border: '2px solid rgba(20,184,166,0.3)', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', padding: '1.1rem 1.25rem', marginBottom: '1rem' }}>
          <div style={{ display: 'inline-block', background: '#CCFBF1', color: DARK, padding: '0.3rem 0.7rem', borderRadius: '8px', fontFamily: "'Fredoka',sans-serif", fontSize: '0.75rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {language === 'bm' ? question.label_bm : question.label_eng}
          </div>
          {question.type === 'grid' && (
            <div style={{ background: '#F0FDFA', borderRadius: '12px', padding: '1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px dashed rgba(20,184,166,0.3)' }}>
              <PercentGrid filled={question.filled} color={ACCENT} />
            </div>
          )}
          {question.type === 'tukar' && (
            <div style={{ background: '#F0FDFA', borderRadius: '12px', padding: '1.5rem', marginBottom: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px dashed rgba(20,184,166,0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Baloo 2',sans-serif", fontSize: '1.6rem', fontWeight: 800, color: DARK }}>
                    {(() => {
                      const item = FRACTION_PCT.find(f => f.pct === question.answer);
                      return item ? item.frac : '';
                    })()}
                  </div>
                </div>
                <span style={{ fontFamily: "'Baloo 2',sans-serif", fontSize: '1.8rem', color: ACCENT, fontWeight: 800 }}>{'\u2192'}</span>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Baloo 2',sans-serif", fontSize: '1.6rem', fontWeight: 800, color: '#94A3B8' }}>?%</div>
                </div>
              </div>
            </div>
          )}
          {question.type === 'kira' && (
            <div style={{ background: '#F0FDFA', borderRadius: '12px', padding: '1.5rem', marginBottom: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px dashed rgba(20,184,166,0.3)' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Baloo 2',sans-serif", fontSize: '2.5rem', fontWeight: 800, color: DARK }}>
                  {question.calc.pct}%
                </div>
                <div style={{ fontFamily: "'Fredoka',sans-serif", fontSize: '0.9rem', color: '#64748B', marginTop: '0.2rem' }}>
                  {language === 'bm' ? 'daripada' : 'of'} {question.calc.num}
                </div>
              </div>
            </div>
          )}
          <div style={{ background: '#FFF9C4', borderLeft: '4px solid #FBC02D', padding: '0.9rem 1rem', marginBottom: '1rem', borderRadius: '8px' }}>
            <p style={{ fontFamily: "'Fredoka',sans-serif", fontSize: '1rem', color: '#333', margin: '0', fontWeight: 600, lineHeight: 1.5 }}>
              {language === 'bm' ? question.question_bm : question.question_eng}
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {question.options.map((option, idx) => {
              const { bg, border, color } = getOptionStyle(option);
              return (
                <button key={idx} onClick={() => handleSelect(option)} disabled={isAnswered}
                  style={{ padding: '0.8rem 1rem', background: bg, color, border: `2px solid ${border}`, borderRadius: '12px', cursor: isAnswered ? 'default' : 'pointer', fontFamily: "'Baloo 2',sans-serif", fontWeight: 700, fontSize: '1.2rem', textAlign: 'center', transition: 'all 0.2s', boxShadow: isAnswered ? 'none' : '0 2px 4px rgba(0,0,0,0.05)' }}>
                  {option}
                </button>
              );
            })}
          </div>
          {isAnswered && (
            <div style={{ padding: '0.85rem 1rem', background: isCorrect ? '#D4EDDA' : '#F8D7DA', color: isCorrect ? '#155724' : '#721C24', borderRadius: '10px', fontWeight: 'bold', marginTop: '1rem', animation: isCorrect ? 'popSuccess 0.3s' : 'shakeError 0.4s', fontFamily: "'Fredoka',sans-serif" }}>
              {isCorrect
                ? (language === 'bm' ? '\u2705 Betul!' : '\u2705 Correct!')
                : (language === 'bm' ? `\u274C Tidak betul. Jawapan: ${question.answer}` : `\u274C Wrong. Answer: ${question.answer}`)}
            </div>
          )}
        </div>
      </div>
      <div style={{ flexShrink: 0, padding: '0.75rem 1rem', display: 'flex', gap: '0.75rem', background: 'rgba(15,118,110,0.15)', backdropFilter: 'blur(4px)' }}>
        <button onClick={handleResetQuestion} style={{ flex: 1, padding: '0.75rem', background: 'rgba(255,255,255,0.3)', color: '#FFF', border: '2px solid rgba(255,255,255,0.4)', borderRadius: '12px', cursor: 'pointer', fontFamily: "'Fredoka',sans-serif", fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.9rem' }}>
          <RefreshCw size={16} />
          {language === 'bm' ? 'Semula' : 'Reset'}
        </button>
        <button onClick={handleNext} disabled={!isAnswered}
          style={{ flex: 1, padding: '0.75rem', background: isAnswered ? '#FFF' : 'rgba(255,255,255,0.3)', color: isAnswered ? DARK : 'rgba(255,255,255,0.5)', border: 'none', borderRadius: '12px', cursor: isAnswered ? 'pointer' : 'not-allowed', fontFamily: "'Baloo 2',sans-serif", fontWeight: 700, fontSize: '1.1rem', boxShadow: isAnswered ? '0 4px 0 #0F766E' : 'none', transition: 'background 0.2s' }}>
          {qIdx < TOTAL_QUESTIONS - 1
            ? (language === 'bm' ? 'Seterusnya \u2192' : 'Next \u2192')
            : (language === 'bm' ? 'Selesai \u2713' : 'Finish \u2713')}
        </button>
      </div>
      <style>{`
        @keyframes popSuccess {
          0% { transform: scale(0.95); }
          50% { transform: scale(1.03); }
          100% { transform: scale(1); }
        }
        @keyframes shakeError {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}
