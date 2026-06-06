import React, { useState, useCallback, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../../../utils/soundManager';
import BackButton from '../../../BackButton';

const DECIMALS = [
  { val: 0.1, num: 1, label_bm: 'satu per sepuluh (0.1)', label_eng: 'one tenth (0.1)' },
  { val: 0.2, num: 2, label_bm: 'dua per sepuluh (0.2)', label_eng: 'two tenths (0.2)' },
  { val: 0.3, num: 3, label_bm: 'tiga per sepuluh (0.3)', label_eng: 'three tenths (0.3)' },
  { val: 0.4, num: 4, label_bm: 'empat per sepuluh (0.4)', label_eng: 'four tenths (0.4)' },
  { val: 0.5, num: 5, label_bm: 'lima per sepuluh (0.5)', label_eng: 'five tenths (0.5)' },
  { val: 0.6, num: 6, label_bm: 'enam per sepuluh (0.6)', label_eng: 'six tenths (0.6)' },
  { val: 0.7, num: 7, label_bm: 'tujuh per sepuluh (0.7)', label_eng: 'seven tenths (0.7)' },
  { val: 0.8, num: 8, label_bm: 'lapan per sepuluh (0.8)', label_eng: 'eight tenths (0.8)' },
  { val: 0.9, num: 9, label_bm: 'sembilan per sepuluh (0.9)', label_eng: 'nine tenths (0.9)' },
];

function TenthsBar({ filled, total = 10, color = '#6366F1', width = 280, height = 36 }) {
  const segW = width / total;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
      {Array.from({ length: total }, (_, i) => (
        <rect key={i} x={i * segW} y={0} width={segW - 2} height={height} rx={4}
          fill={i < filled ? color : '#E8E8E8'} stroke="#CCC" strokeWidth="1" />
      ))}
    </svg>
  );
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randInt(lo, hi) {
  return Math.floor(Math.random() * (hi - lo + 1)) + lo;
}

function generateQuestion(mechanic) {
  if (mechanic === 'kenali') {
    const d = DECIMALS[randInt(0, DECIMALS.length - 1)];
    const options = shuffle([`0.${d.num}`, ...DECIMALS.filter(x => x.num !== d.num).slice(0, 3).map(x => `0.${x.num}`)]);
    return {
      type: 'kenali',
      question_bm: 'Apakah perpuluhan yang ditunjukkan?',
      question_eng: 'What decimal is shown?',
      decimal: d,
      options,
      answer: `0.${d.num}`,
      explanation_bm: `${d.num} bahagian daripada 10 = 0.${d.num} (${d.label_bm}).`,
    };
  } else if (mechanic === 'banding') {
    let a, b;
    const pool = [...DECIMALS];
    do { a = pool[randInt(0, pool.length - 1)]; b = pool[randInt(0, pool.length - 1)]; } while (a.num === b.num);
    const askBigger = Math.random() < 0.5;
    const answer = askBigger ? (a.val > b.val ? `0.${a.num}` : `0.${b.num}`) : (a.val < b.val ? `0.${a.num}` : `0.${b.num}`);
    return {
      type: 'banding',
      question_bm: askBigger ? 'Mana lebih besar?' : 'Mana lebih kecil?',
      question_eng: askBigger ? 'Which is bigger?' : 'Which is smaller?',
      decimals: [a, b],
      options: shuffle([`0.${a.num}`, `0.${b.num}`]),
      answer,
      explanation_bm: `0.${a.num} = ${a.val.toFixed(1)}, 0.${b.num} = ${b.val.toFixed(1)}. ${askBigger ? 'Yang lebih besar' : 'Yang lebih kecil'} ialah ${answer}.`,
    };
  } else {
    const d = DECIMALS[randInt(0, DECIMALS.length - 1)];
    const scenarios = [
      {
        bm: (n) => `Sebuah kek dipotong kepada 10 bahagian. Ali makan ${n} bahagian. Berapakah perpuluhan bagi kek yang telah dimakan?`,
        eng: (n) => `A cake is cut into 10 slices. Ali ate ${n} slices. What decimal of the cake was eaten?`,
      },
      {
        bm: (n) => `Daripada 10 biji guli, ${10 - n} biji berwarna merah dan selebihnya biru. Berapakah perpuluhan bagi guli biru?`,
        eng: (n) => `Out of 10 marbles, ${10 - n} are red and the rest are blue. What decimal of marbles are blue?`,
      },
      {
        bm: (n) => `Dalam satu kuiz 10 soalan, Ahmad menjawab ${n} soalan dengan betul. Berapakah perpuluhan soalan yang dijawab dengan betul?`,
        eng: (n) => `In a 10-question quiz, Ahmad answered ${n} questions correctly. What decimal of the questions did he answer correctly?`,
      },
    ];
    const scenario = scenarios[randInt(0, scenarios.length - 1)];
    const options = shuffle([`0.${d.num}`, ...DECIMALS.filter(x => x.num !== d.num).slice(0, 3).map(x => `0.${x.num}`)]);
    return {
      type: 'cerita',
      question_bm: scenario.bm(d.num),
      question_eng: scenario.eng(d.num),
      decimal: d,
      options,
      answer: `0.${d.num}`,
      explanation_bm: `${d.num} daripada 10 = 0.${d.num}.`,
    };
  }
}

const TOTAL_QUESTIONS = 12;
const QUESTIONS_PER_MECHANIC = 4;

export default function PerpuluhanT2({ onBack, language = 'bm' }) {
  const [qIdx, setQIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [mechanicStats, setMechanicStats] = useState({
    kenali: { correct: 0, total: 0 },
    banding: { correct: 0, total: 0 },
    cerita: { correct: 0, total: 0 },
  });

  const questions = useMemo(() => {
    const qs = [];
    ['kenali', 'banding', 'cerita'].forEach(mechanic => {
      for (let i = 0; i < QUESTIONS_PER_MECHANIC; i++) {
        qs.push(generateQuestion(mechanic));
      }
    });
    return shuffle(qs);
  }, []);

  const question = questions[qIdx];
  const isCorrect = selectedAnswer === question.answer;

  const handleSelect = useCallback((option) => {
    if (isAnswered) return;
    playHoverSound();
    setSelectedAnswer(option);
    if (option === question.answer) {
      playSound('correct');
      setScore(s => s + 10);
      setMechanicStats(prev => ({
        ...prev,
        [question.type]: { correct: prev[question.type].correct + 1, total: prev[question.type].total + 1 },
      }));
      confetti({ particleCount: 40, spread: 55 });
    } else {
      playSound('incorrect');
      setMechanicStats(prev => ({
        ...prev,
        [question.type]: { correct: prev[question.type].correct, total: prev[question.type].total + 1 },
      }));
    }
    setIsAnswered(true);
  }, [isAnswered, question.answer, question.type]);

  const handleNext = useCallback(() => {
    if (!isAnswered) return;
    if (qIdx < questions.length - 1) {
      setQIdx(qIdx + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      playSound('levelup');
      confetti({ particleCount: 120, spread: 70 });
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
    setMechanicStats({ kenali: { correct: 0, total: 0 }, banding: { correct: 0, total: 0 }, cerita: { correct: 0, total: 0 } });
  }, []);

  const getOptionStyle = (option) => {
    if (!isAnswered) return { bg: '#FFF', border: '#6366F1', color: '#333' };
    if (option === question.answer) return { bg: '#4CAF50', border: '#388E3C', color: 'white' };
    if (option === selectedAnswer) return { bg: '#FF6B6B', border: '#D32F2F', color: 'white' };
    return { bg: '#F5F5F5', border: '#DDD', color: '#AAA' };
  };

  if (isDone) {
    return (
      <div style={{ minHeight: '100%', background: '#E0E7FF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🔟</div>
        <h2 style={{ color: '#6366F1', fontSize: '2rem', marginBottom: '0.5rem' }}>
          {language === 'bm' ? 'Tahniah!' : 'Well Done!'}
        </h2>
        <p style={{ fontSize: '1.4rem', color: '#555', marginBottom: '1.5rem' }}>
          {language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/{TOTAL_QUESTIONS * 10}
        </p>
        <div style={{ background: '#FFF', borderRadius: '12px', padding: '1rem', marginBottom: '2rem', maxWidth: '400px', width: '100%' }}>
          <h3 style={{ color: '#6366F1', fontSize: '1rem', marginBottom: '0.8rem', textAlign: 'center' }}>
            {language === 'bm' ? 'Keputusan Setiap Jenis' : 'Results by Type'}
          </h3>
          {['kenali', 'banding', 'cerita'].map(type => {
            const label = { kenali: '🔍 Kenali Perpuluhan', banding: '⚖️ Bandingkan', cerita: '📖 Cerita' }[type];
            const stats = mechanicStats[type];
            const pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
            return (
              <div key={type} style={{ marginBottom: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                  <span style={{ fontWeight: 600, color: '#333' }}>{label}</span>
                  <span style={{ color: pct >= 75 ? '#4CAF50' : '#FF6B6B', fontWeight: 700 }}>
                    {stats.correct}/{stats.total} ({pct}%)
                  </span>
                </div>
                <div style={{ background: '#E0E0E0', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ background: pct >= 75 ? '#4CAF50' : '#FF6B6B', height: '100%', width: `${pct}%`, transition: 'width 0.3s' }} />
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={handleResetGame} style={{ padding: '0.75rem 1.5rem', background: '#E0E0E0', color: '#333', border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>
            {language === 'bm' ? 'Main Semula' : 'Play Again'}
          </button>
          <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', background: '#6366F1', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>
            {language === 'bm' ? 'Kembali' : 'Back'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#E0E7FF', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <h1 style={{ color: '#6366F1', marginBottom: '0.25rem', fontSize: '1.6rem' }}>
            {language === 'bm' ? 'Perpuluhan' : 'Decimals'}
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Belajar perpuluhan 0.1 hingga 0.9' : 'Learn decimals 0.1 to 0.9'}
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: 'rgba(99,102,241,0.12)', borderRadius: '10px' }}>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>
            {language === 'bm' ? `Soalan ${qIdx + 1}/${TOTAL_QUESTIONS}` : `Q${qIdx + 1}/${TOTAL_QUESTIONS}`}
          </span>
          <span style={{ fontWeight: 'bold', color: '#6366F1' }}>⭐ {score}</span>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ background: '#FFF', borderRadius: '12px', border: '2px solid #6366F1', padding: '1.1rem 1.25rem', marginBottom: '1rem' }}>
          <div style={{ display: 'inline-block', background: '#EEF2FF', color: '#6366F1', padding: '0.3rem 0.7rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {question.type === 'kenali' && '🔍 Kenali Perpuluhan'}
            {question.type === 'banding' && '⚖️ Bandingkan'}
            {question.type === 'cerita' && '📖 Cerita'}
          </div>
          {question.type === 'kenali' && (
            <div style={{ background: '#EEF2FF', borderRadius: '8px', padding: '1.5rem 1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '0.5rem' }}>
              <TenthsBar filled={question.decimal.num} color="#6366F1" />
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#6366F1' }}>? / 10</div>
            </div>
          )}
          {question.type === 'banding' && (
            <div style={{ background: '#EEF2FF', borderRadius: '8px', padding: '1.5rem 1rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', gap: '1rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <TenthsBar filled={question.decimals[0].num} color="#6366F1" width={120} height={28} />
                  <div style={{ marginTop: '0.5rem', fontWeight: 700, color: '#6366F1', fontSize: '1.5rem' }}>
                    0.{question.decimals[0].num}
                  </div>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#6366F1' }}>vs</div>
                <div style={{ textAlign: 'center' }}>
                  <TenthsBar filled={question.decimals[1].num} color="#A855F7" width={120} height={28} />
                  <div style={{ marginTop: '0.5rem', fontWeight: 700, color: '#A855F7', fontSize: '1.5rem' }}>
                    0.{question.decimals[1].num}
                  </div>
                </div>
              </div>
            </div>
          )}
          {question.type === 'cerita' && (
            <div style={{ background: '#EEF2FF', borderRadius: '8px', padding: '1.5rem 1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <TenthsBar filled={question.decimal.num} color="#6366F1" width={240} height={32} />
            </div>
          )}
          <div style={{ background: '#FFF9C4', borderLeft: '4px solid #FBC02D', padding: '0.9rem 1rem', marginBottom: '1rem', borderRadius: '6px' }}>
            <p style={{ fontSize: '1rem', color: '#333', margin: '0', fontWeight: 600, lineHeight: 1.5 }}>
              {language === 'bm' ? question.question_bm : question.question_eng}
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {question.options.map((option, idx) => {
              const { bg, border, color } = getOptionStyle(option);
              return (
                <button key={idx} onClick={() => handleSelect(option)} disabled={isAnswered}
                  style={{ padding: '0.8rem 1rem', background: bg, color, border: `2px solid ${border}`, borderRadius: '10px', cursor: isAnswered ? 'default' : 'pointer', fontWeight: 'bold', fontSize: '1.1rem', textAlign: 'center', transition: 'all 0.2s' }}>
                  {option}
                </button>
              );
            })}
          </div>
          {isAnswered && (
            <div style={{ padding: '0.85rem 1rem', background: isCorrect ? '#D4EDDA' : '#F8D7DA', color: isCorrect ? '#155724' : '#721C24', borderRadius: '8px', fontWeight: 'bold', marginTop: '1rem' }}>
              <div style={{ marginBottom: '0.4rem' }}>
                {isCorrect
                  ? (language === 'bm' ? '✅ Betul!' : '✅ Correct!')
                  : (language === 'bm' ? `❌ Tidak betul. Jawapan: ${question.answer}` : `❌ Wrong. Answer: ${question.answer}`)}
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 'normal', opacity: 0.9 }}>
                {question.explanation_bm}
              </div>
            </div>
          )}
        </div>
      </div>
      <div style={{ flexShrink: 0, background: '#E0E7FF', borderTop: '2px solid rgba(99,102,241,0.25)', padding: '0.75rem 1rem', display: 'flex', gap: '0.75rem' }}>
        <button onClick={handleResetQuestion} style={{ flex: 1, padding: '0.75rem', background: '#E0E0E0', color: '#555', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
          <RefreshCw size={16} />
          {language === 'bm' ? 'Semula' : 'Reset'}
        </button>
        <button onClick={handleNext} disabled={!isAnswered}
          style={{ flex: 1, padding: '0.75rem', background: isAnswered ? '#6366F1' : '#A5B4FC', color: 'white', border: 'none', borderRadius: '10px', cursor: isAnswered ? 'pointer' : 'not-allowed', fontWeight: 'bold', fontSize: '1rem', boxShadow: isAnswered ? '0 4px 0 #4338CA' : 'none', transition: 'background 0.2s' }}>
          {qIdx < TOTAL_QUESTIONS - 1
            ? (language === 'bm' ? 'Soalan Seterusnya →' : 'Next Question →')
            : (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')}
        </button>
      </div>
    </div>
  );
}
