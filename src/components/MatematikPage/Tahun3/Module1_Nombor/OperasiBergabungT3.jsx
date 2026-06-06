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

function generateTambahDarab() {
  const type = Math.random() < 0.5 ? 'add-then-multiply' : 'multiply-then-add';
  let a, b, c, correct, wrongOrder, expression;

  if (type === 'add-then-multiply') {
    b = randInt(2, 4);
    c = randInt(2, 4);
    const product = b * c;
    a = randInt(1, Math.min(12, 20 - product));
    correct = a + product;
    wrongOrder = (a + b) * c;
    expression = `${a} + ${b} \u00D7 ${c}`;
  } else {
    a = randInt(2, 4);
    b = randInt(2, 4);
    const product = a * b;
    c = randInt(1, Math.min(12, 20 - product));
    correct = product + c;
    wrongOrder = a * (b + c);
    expression = `${a} \u00D7 ${b} + ${c}`;
  }

  const wrongSet = new Set();
  wrongSet.add(wrongOrder);
  wrongSet.add(Math.abs(a * b * c > 50 ? Math.round((a + b + c) / 2) : a + b + c));
  for (const v of [a * b, b * c, a + b + c, Math.abs(correct - randInt(2, 5))]) {
    if (v !== correct && v > 0 && Number.isInteger(v)) wrongSet.add(v);
  }
  const wrongs = [...wrongSet].filter(v => v !== correct && v > 0).slice(0, 3);
  while (wrongs.length < 3) {
    const v = Math.max(1, correct + randInt(-4, 4));
    if (v !== correct && !wrongs.includes(v)) wrongs.push(v);
  }

  return {
    type: 'tambah-darab',
    question_bm: `Kirakan: ${expression} = ?`,
    question_eng: `Calculate: ${expression} = ?`,
    options: shuffle([correct.toString(), ...wrongs.slice(0, 3).map(String)]),
    answer: correct.toString(),
    label_bm: '\u2795\u2716\ufe0f Tambah-Darab',
    label_eng: '\u2795\u2716\ufe0f Add-Multiply',
  };
}

function generateTolakBahagi() {
  let c = randInt(2, 4);
  let k = randInt(2, 4);
  let b = c * k;
  let division = b / c;
  let a = randInt(division + 2, Math.min(20, 20));
  const correct = a - division;
  const wrongOrder = Math.floor((a - b) / c);
  const expression = `${a} \u2212 ${b} \u00F7 ${c}`;

  const wrongSet = new Set();
  if (wrongOrder !== correct && wrongOrder > 0) wrongSet.add(wrongOrder);
  for (const v of [a - b, division, a - division + randInt(1, 3), Math.abs(a - b - division)]) {
    if (v !== correct && v > 0) wrongSet.add(v);
  }
  const wrongs = [...wrongSet].filter(v => v !== correct && v > 0).slice(0, 3);
  while (wrongs.length < 3) {
    const v = Math.max(1, correct + randInt(-3, 3));
    if (v !== correct && !wrongs.includes(v)) wrongs.push(v);
  }

  return {
    type: 'tolak-bahagi',
    question_bm: `Kirakan: ${expression} = ?`,
    question_eng: `Calculate: ${expression} = ?`,
    options: shuffle([correct.toString(), ...wrongs.slice(0, 3).map(String)]),
    answer: correct.toString(),
    label_bm: '\u2796\u2797 Tolak-Bahagi',
    label_eng: '\u2796\u2797 Subtract-Divide',
  };
}

function generateCerita() {
  const stories = [
    {
      setup: (a, b, c) => ({
        bm: `Siti ada ${a} kotak pensel. Setiap kotak ada ${b} pensel. Dia beri ${c} pensel kepada kawan. Berapa pensel tinggal?`,
        eng: `Siti has ${a} boxes of pencils. Each box has ${b} pencils. She gives ${c} pencils to a friend. How many pencils are left?`,
      }),
      calc: (a, b, c) => a * b - c,
      range: [[2, 5], [3, 6], [2, 10]],
    },
    {
      setup: (a, b, c) => ({
        bm: `Ahmad ada ${a} peket biskut. Setiap peket ada ${b} biskut. Dia makan ${c} biskut. Berapa biskut tinggal?`,
        eng: `Ahmad has ${a} packets of biscuits. Each packet has ${b} biscuits. He eats ${c} biscuits. How many biscuits are left?`,
      }),
      calc: (a, b, c) => a * b - c,
      range: [[2, 5], [3, 5], [2, 8]],
    },
    {
      setup: (a, b, c) => ({
        bm: `Cikgu ada ${a} bekas warna. Setiap bekas ada ${b} batang pensel. Cikgu beli lagi ${c} batang. Berapa jumlah pensel semuanya?`,
        eng: `Teacher has ${a} boxes of crayons. Each box has ${b} crayons. Teacher buys ${c} more. How many crayons in total?`,
      }),
      calc: (a, b, c) => a * b + c,
      range: [[2, 5], [3, 6], [2, 10]],
    },
    {
      setup: (a, b, c) => ({
        bm: `Rina ada ${a} kotak guli. Setiap kotak ada ${b} biji guli. Dia beri ${c} biji kepada adik. Berapa biji guli tinggal?`,
        eng: `Rina has ${a} boxes of marbles. Each box has ${b} marbles. She gives ${c} marbles to her brother. How many marbles are left?`,
      }),
      calc: (a, b, c) => a * b - c,
      range: [[2, 4], [4, 6], [3, 10]],
    },
    {
      setup: (a, b, c) => ({
        bm: `Ada ${a} meja di dalam kelas. Setiap meja ada ${b} buah buku. Cikgu tambah ${c} buah buku lagi. Berapa jumlah buku semuanya?`,
        eng: `There are ${a} desks in class. Each desk has ${b} books. Teacher adds ${c} more books. How many books in total?`,
      }),
      calc: (a, b, c) => a * b + c,
      range: [[3, 6], [2, 5], [2, 10]],
    },
  ];

  const story = stories[randInt(0, stories.length - 1)];
  const a = randInt(story.range[0][0], story.range[0][1]);
  const b = randInt(story.range[1][0], story.range[1][1]);
  const c = randInt(story.range[2][0], story.range[2][1]);
  const correct = story.calc(a, b, c);
  const text = story.setup(a, b, c);

  const wrongSet = new Set();
  for (const v of [a * b, a * b + c + 1, a + b + c, Math.abs(a * b - c - 1), a * c + b, Math.max(1, correct - randInt(2, 5))]) {
    if (v !== correct && v > 0) wrongSet.add(v);
  }
  const wrongs = [...wrongSet].filter(v => v !== correct).slice(0, 3);
  while (wrongs.length < 3) {
    const v = Math.max(1, correct + randInt(-4, 4));
    if (v !== correct && !wrongs.includes(v)) wrongs.push(v);
  }

  return {
    type: 'cerita',
    question_bm: text.bm,
    question_eng: text.eng,
    options: shuffle([correct.toString(), ...wrongs.slice(0, 3).map(String)]),
    answer: correct.toString(),
    label_bm: '\uD83D\uDCD6 Cerita Bergabung',
    label_eng: '\uD83D\uDCD6 Mixed Story',
  };
}

function generateQuestion(mechanic) {
  if (mechanic === 'tambah-darab') return generateTambahDarab();
  if (mechanic === 'tolak-bahagi') return generateTolakBahagi();
  return generateCerita();
}

const TOTAL_QUESTIONS = 12;
const QUESTIONS_PER_MECHANIC = 4;

const MECHANICS = ['tambah-darab', 'tolak-bahagi', 'cerita'];

export default function OperasiBergabungT3({ onBack, language = 'bm' }) {
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
        <div style={{ fontSize: '5rem', marginBottom: '1rem', lineHeight: 1 }}>{'\u2795\u2796\u2716\ufe0f\u2797'}</div>
        <h1 style={{ fontFamily: "'Baloo 2',sans-serif", color: '#FFF', fontSize: '2.4rem', textAlign: 'center', marginBottom: '0.5rem', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
          {language === 'bm' ? 'Operasi Bergabung' : 'Mixed Operations'}
        </h1>
        <p style={{ fontFamily: "'Fredoka',sans-serif", color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', textAlign: 'center', maxWidth: '320px', marginBottom: '2.5rem' }}>
          {language === 'bm'
            ? 'Belajar tertib operasi — darab dan bahagi dulu, baru tambah dan tolak!'
            : 'Learn order of operations — multiply and divide first, then add and subtract!'}
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
            {language === 'bm' ? 'Operasi Bergabung' : 'Mixed Operations'}
          </h1>
          <p style={{ fontFamily: "'Fredoka',sans-serif", color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Tertib operasi ( \u00D7 \u00F7 dulu, + \u2212 kemudian )' : 'Order of operations ( \u00D7 \u00F7 first, + \u2212 next )'}
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
          {question.type === 'cerita' && (
            <div style={{ background: '#F0FDFA', borderRadius: '12px', padding: '1.2rem', marginBottom: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px dashed rgba(20,184,166,0.3)' }}>
              <span style={{ fontSize: '2.5rem' }}>{'\uD83D\uDCD6'}</span>
            </div>
          )}
          {question.type !== 'cerita' && (
            <div style={{ background: '#F0FDFA', borderRadius: '12px', padding: '1.5rem', marginBottom: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px dashed rgba(20,184,166,0.3)' }}>
              <span style={{ fontFamily: "'Baloo 2',sans-serif", fontSize: '2rem', fontWeight: 800, color: DARK, letterSpacing: '2px' }}>
                {question.expression || question.answer}
              </span>
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
