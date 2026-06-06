import React, { useState, useCallback, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../../../../utils/soundManager';
import BackButton from '../../../BackButton';

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randInt(lo, hi) {
  return Math.floor(Math.random() * (hi - lo + 1)) + lo;
}

function BallsInBox({ red, blue }) {
  const r = 14;
  const gap = 6;
  const total = red + blue;
  const cols = Math.min(total, 5);
  const rows = Math.ceil(total / cols);
  const w = cols * (r * 2 + gap) + gap;
  const h = rows * (r * 2 + gap) + gap + 20;
  const balls = [];
  for (let i = 0; i < red; i++) balls.push({ color: '#EF4444' });
  for (let i = 0; i < blue; i++) balls.push({ color: '#3B82F6' });
  const shuffled = shuffle(balls);
  return (
    <svg viewBox={'0 0 ' + w + ' ' + h} style={{ width: '100%', maxWidth: w, display: 'block' }}>
      <rect x={0} y={0} width={w} height={h} rx={12} fill='#FEF3C7' stroke='#F59E0B' strokeWidth='2' />
      <text x={w / 2} y={16} textAnchor="middle" fontSize="11" fill="#92400E" fontWeight="700">Kotak</text>
      {shuffled.map((ball, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const cx = gap + col * (r * 2 + gap) + r;
        const cy = 28 + row * (r * 2 + gap) + r;
        return <circle key={i} cx={cx} cy={cy} r={r} fill={ball.color} stroke={ball.color === '#EF4444' ? '#DC2626' : '#2563EB'} strokeWidth='1' />;
      })}
    </svg>
  );
}

function DiceSVG({ value }) {
  const dotPositions = {
    1: [[50, 50]],
    2: [[25, 25], [75, 75]],
    3: [[25, 25], [50, 50], [75, 75]],
    4: [[25, 25], [75, 25], [25, 75], [75, 75]],
    5: [[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]],
    6: [[25, 20], [75, 20], [25, 50], [75, 50], [25, 80], [75, 80]],
  };
  const dots = dotPositions[value] || [];
  return (
    <svg viewBox="0 0 100 100" width="80" height="80">
      <rect x="2" y="2" width="96" height="96" rx="16" fill="#FFF" stroke="#7C3AED" strokeWidth="3" />
      {dots.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="7" fill="#7C3AED" />
      ))}
    </svg>
  );
}

function CoinSVG({ side }) {
  return (
    <svg viewBox="0 0 100 100" width="80" height="80">
      <circle cx="50" cy="50" r="45" fill="#FCD34D" stroke="#F59E0B" strokeWidth="3" />
      <circle cx="50" cy="50" r="35" fill="none" stroke="#FBBF24" strokeWidth="1.5" />
      <text x="50" y="56" textAnchor="middle" fontSize="22" fontWeight="800" fill="#92400E">
        {side === 'gambar' ? 'G' : 'A'}
      </text>
    </svg>
  );
}

const CERTAINTY_SCENARIOS = [
  {
    bm: 'Matahari terbit di sebelah timur.',
    eng: 'The sun rises in the east.',
    answer: 'Mesti berlaku',
  },
  {
    bm: 'Seekor kucing boleh terbang.',
    eng: 'A cat can fly.',
    answer: 'Tidak mungkin berlaku',
  },
  {
    bm: 'Esok akan hujan.',
    eng: 'It will rain tomorrow.',
    answer: 'Mungkin berlaku',
  },
  {
    bm: 'Manusia bernafas dengan udara.',
    eng: 'Humans breathe air.',
    answer: 'Mesti berlaku',
  },
  {
    bm: 'Seekor ikan boleh hidup di darat.',
    eng: 'A fish can live on land.',
    answer: 'Tidak mungkin berlaku',
  },
  {
    bm: 'Kamu akan mendapat hadiah esok.',
    eng: 'You will get a gift tomorrow.',
    answer: 'Mungkin berlaku',
  },
  {
    bm: 'Air membeku menjadi ais pada suhu 0°C.',
    eng: 'Water freezes into ice at 0°C.',
    answer: 'Mesti berlaku',
  },
  {
    bm: 'Bulan diperbuat daripada keju.',
    eng: 'The moon is made of cheese.',
    answer: 'Tidak mungkin berlaku',
  },
  {
    bm: 'Ibu kamu memasak untuk makan malam.',
    eng: 'Your mother will cook dinner.',
    answer: 'Mungkin berlaku',
  },
  {
    bm: 'Api akan panas apabila disentuh.',
    eng: 'Fire is hot when touched.',
    answer: 'Mesti berlaku',
  },
  {
    bm: 'Kita boleh berjalan di atas air.',
    eng: 'We can walk on water.',
    answer: 'Tidak mungkin berlaku',
  },
  {
    bm: 'Kelas akan bermula esok pagi.',
    eng: 'School will start tomorrow morning.',
    answer: 'Mungkin berlaku',
  },
];

const CERTAINTY_OPTIONS = ['Mesti berlaku', 'Mungkin berlaku', 'Tidak mungkin berlaku'];

function generateQuestion(mechanic) {
  if (mechanic === 'kepastian') {
    const scenario = CERTAINTY_SCENARIOS[randInt(0, CERTAINTY_SCENARIOS.length - 1)];
    return {
      type: 'kepastian',
      question_bm: scenario.bm + '\n\nApakah kebarangkaliannya?',
      question_eng: scenario.eng + '\n\nWhat is the probability?',
      options: shuffle(CERTAINTY_OPTIONS),
      answer: scenario.answer,
      explanation_bm: 'Perkara tersebut adalah "' + scenario.answer.toLowerCase() + '".',
    };
  } else if (mechanic === 'bola') {
    const red = randInt(1, 5);
    const blue = randInt(1, 5);
    const total = red + blue;
    const correctNum = red;
    const correctDen = total;
    const wrongPairs = [[1, 2], [1, 3], [1, 4], [2, 3], [2, 5], [3, 4], [3, 5], [4, 5], [1, 6]]
      .filter(p => p[0] !== correctNum || p[1] !== correctDen);
    const selectedWrongs = shuffle(wrongPairs).slice(0, 3);
    const options = shuffle([
      correctNum + '/' + correctDen,
      ...selectedWrongs.map(p => p[0] + '/' + p[1]),
    ]);
    return {
      type: 'bola',
      question_bm: 'Dalam kotak ada ' + red + ' bola merah dan ' + blue + ' bola biru. Apakah kebarangkalian untuk mengambil bola merah?',
      question_eng: 'In a box there are ' + red + ' red balls and ' + blue + ' blue balls. What is the probability of picking a red ball?',
      data: { red, blue },
      options,
      answer: correctNum + '/' + correctDen,
      explanation_bm: 'Bola merah: ' + red + '/' + total + ' = ' + correctNum + '/' + correctDen + '.',
    };
  } else {
    const isCoin = Math.random() < 0.5;
    if (isCoin) {
      const options = shuffle(['1/2', '1/3', '1/4', '2/3']);
      return {
        type: 'dadu-syiling',
        question_bm: 'Sebiji syiling dilambung. Apakah kebarangkalian untuk mendapat gambar?',
        question_eng: 'A coin is tossed. What is the probability of getting heads?',
        isCoin: true,
        options,
        answer: '1/2',
        explanation_bm: 'Syiling ada 2 sisi. Kebarangkalian dapat gambar = 1/2.',
      };
    } else {
      const diceNum = randInt(1, 6);
      const options = shuffle(['1/6', '2/6', '3/6', '1/3']);
      return {
        type: 'dadu-syiling',
        question_bm: 'Sebiji dadu dilambung. Apakah kebarangkalian untuk mendapat nombor ' + diceNum + '?',
        question_eng: 'A dice is rolled. What is the probability of getting number ' + diceNum + '?',
        isCoin: false,
        diceValue: diceNum,
        options,
        answer: '1/6',
        explanation_bm: 'Dadu ada 6 muka. Kebarangkalian dapat nombor ' + diceNum + ' = 1/6.',
      };
    }
  }
}

const TOTAL_QUESTIONS = 12;
const QUESTIONS_PER_MECHANIC = 4;
const MECHANICS = ['kepastian', 'bola', 'dadu-syiling'];

export default function KebarangkalianT3({ onBack, language = 'bm' }) {
  const [isStarted, setIsStarted] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [mechanicStats, setMechanicStats] = useState({
    kepastian: { correct: 0, total: 0 },
    bola: { correct: 0, total: 0 },
    'dadu-syiling': { correct: 0, total: 0 },
  });

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
    if (isAnswered) return;
    setSelectedAnswer(option);
    if (option === question.answer) {
      playSound('correct');
      setScore(s => s + 1);
      setMechanicStats(prev => ({
        ...prev,
        [question.type]: { correct: prev[question.type].correct + 1, total: prev[question.type].total + 1 },
      }));
      confetti({ particleCount: 40, spread: 55 });
    } else {
      playSound('wrong');
      setMechanicStats(prev => ({
        ...prev,
        [question.type]: { correct: prev[question.type].correct, total: prev[question.type].total + 1 },
      }));
    }
    setIsAnswered(true);
  }, [isAnswered, qIdx]);

  const handleNext = useCallback(() => {
    if (!isAnswered) return;
    if (qIdx < questions.length - 1) {
      setQIdx(qIdx + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      playSound('correct');
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
    setMechanicStats({
      kepastian: { correct: 0, total: 0 },
      bola: { correct: 0, total: 0 },
      'dadu-syiling': { correct: 0, total: 0 },
    });
  }, []);

  const handleStart = useCallback(() => setIsStarted(true), []);

  const getOptionStyle = (option) => {
    if (!isAnswered) return { bg: '#FFF', border: '#D8B4FE', color: '#333' };
    if (option === question.answer) return { bg: '#4CAF50', border: '#388E3C', color: 'white' };
    if (option === selectedAnswer) return { bg: '#FF6B6B', border: '#D32F2F', color: 'white' };
    return { bg: '#F5F5F5', border: '#DDD', color: '#AAA' };
  };

  if (!isStarted) {
    return (
      <div style={{ minHeight: '100%', background: 'linear-gradient(135deg,#F3E8FF 0%,#D8B4FE 50%,#7E22CE 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative' }}>
        <BackButton onClick={onBack} />
        <div style={{ textAlign: 'center', maxWidth: 400 }}>
          <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>🎲</div>
          <h1 style={{ color: '#FFF', fontSize: '2.2rem', marginBottom: '0.5rem', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
            {language === 'bm' ? 'Kebarangkalian' : 'Probability'}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.6 }}>
            {language === 'bm' ? 'Belajar tentang kebarangkalian, kemungkinan, dan peluang!' : 'Learn about probability, likelihood, and chance!'}
          </p>
          <button onClick={handleStart}
            style={{ padding: '1rem 3rem', background: '#FFF', color: '#7E22CE', border: 'none', borderRadius: '16px', fontSize: '1.4rem', fontWeight: 800, cursor: 'pointer', boxShadow: '0 6px 0 #6B21A8', transition: 'all 0.1s' }}>
            {language === 'bm' ? 'Mula!' : 'Start!'}
          </button>
        </div>
      </div>
    );
  }

  if (isDone) {
    return (
      <div style={{ minHeight: '100%', background: 'linear-gradient(135deg,#F3E8FF 0%,#D8B4FE 50%,#7E22CE 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🏆</div>
        <h2 style={{ color: '#FFF', fontSize: '2rem', marginBottom: '0.5rem', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
          {language === 'bm' ? 'Tahniah!' : 'Well Done!'}
        </h2>
        <p style={{ fontSize: '1.4rem', color: 'rgba(255,255,255,0.9)', marginBottom: '1.5rem' }}>
          {language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/{TOTAL_QUESTIONS}
        </p>
        <div style={{ background: '#FFF', borderRadius: '16px', padding: '1.2rem', marginBottom: '2rem', maxWidth: '400px', width: '100%' }}>
          <h3 style={{ color: '#7E22CE', fontSize: '1rem', marginBottom: '0.8rem', textAlign: 'center' }}>
            {language === 'bm' ? 'Keputusan Setiap Jenis' : 'Results by Type'}
          </h3>
          {MECHANICS.map(type => {
            const label = { 'kepastian': '🎯 Kepastian', 'bola': '🔴 Bola', 'dadu-syiling': '🎲 Dadu & Syiling' }[type];
            const stats = mechanicStats[type];
            const pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
            return (
              <div key={type} style={{ marginBottom: '0.6rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                  <span style={{ fontWeight: 600, color: '#333', fontSize: '0.9rem' }}>{label}</span>
                  <span style={{ color: pct >= 75 ? '#4CAF50' : '#FF6B6B', fontWeight: 700, fontSize: '0.9rem' }}>
                    {stats.correct}/{stats.total} ({pct}%)
                  </span>
                </div>
                <div style={{ background: '#E0E0E0', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ background: pct >= 75 ? '#4CAF50' : '#FF6B6B', height: '100%', width: pct + '%', transition: 'width 0.3s' }} />
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={handleResetGame} style={{ padding: '0.75rem 1.5rem', background: 'rgba(255,255,255,0.8)', color: '#7E22CE', border: 'none', borderRadius: '12px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>
            {language === 'bm' ? 'Cuba Lagi' : 'Try Again'}
          </button>
          <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', background: '#FFF', color: '#7E22CE', border: '2px solid #7E22CE', borderRadius: '12px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>
            {language === 'bm' ? 'Kembali' : 'Back'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg,#F3E8FF 0%,#D8B4FE 50%,#7E22CE 100%)', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <h1 style={{ color: '#FFF', marginBottom: '0.25rem', fontSize: '1.6rem', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
            {language === 'bm' ? 'Kebarangkalian' : 'Probability'}
          </h1>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: 'rgba(255,255,255,0.25)', borderRadius: '12px' }}>
          <span style={{ color: '#FFF', fontSize: '0.9rem', fontWeight: 600 }}>
            {language === 'bm' ? 'Soalan ' + (qIdx + 1) + '/' + TOTAL_QUESTIONS : 'Q' + (qIdx + 1) + '/' + TOTAL_QUESTIONS}
          </span>
          <span style={{ fontWeight: 'bold', color: '#FFF' }}>⭐ {score}</span>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ background: '#FFF', borderRadius: '16px', border: '2px solid #D8B4FE', padding: '1.1rem 1.25rem', marginBottom: '1rem' }}>
          <div style={{ display: 'inline-block', background: '#F3E8FF', color: '#7E22CE', padding: '0.3rem 0.7rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {question.type === 'kepastian' ? '🎯 Kepastian' : question.type === 'bola' ? '🔴 Bola' : '🎲 Dadu & Syiling'}
          </div>
          <div style={{ background: '#F3E8FF', borderRadius: '12px', padding: '1.5rem 1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 80 }}>
            {question.type === 'bola' && <BallsInBox red={question.data.red} blue={question.data.blue} />}
            {question.type === 'dadu-syiling' && (
              question.isCoin ? <CoinSVG side="gambar" /> : <DiceSVG value={question.diceValue} />
            )}
            {question.type === 'kepastian' && (
              <div style={{ fontSize: '2.5rem' }}>🤔</div>
            )}
          </div>
          <div style={{ background: '#FFF9C4', borderLeft: '4px solid #FBC02D', padding: '0.9rem 1rem', marginBottom: '1rem', borderRadius: '8px' }}>
            <p style={{ fontSize: '1rem', color: '#333', margin: '0', fontWeight: 600, lineHeight: 1.5, whiteSpace: 'pre-line' }}>
              {language === 'bm' ? question.question_bm : question.question_eng}
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {question.options.map((option, idx) => {
              const { bg, border, color } = getOptionStyle(option);
              return (
                <button key={idx} onClick={() => handleSelect(option)} disabled={isAnswered}
                  style={{ padding: '0.8rem 1rem', background: bg, color, border: '2px solid ' + border, borderRadius: '12px', cursor: isAnswered ? 'default' : 'pointer', fontWeight: 'bold', fontSize: '1.1rem', textAlign: 'center', transition: 'all 0.2s' }}>
                  {option}
                </button>
              );
            })}
          </div>
          {isAnswered && (
            <div style={{ padding: '0.85rem 1rem', background: isCorrect ? '#D4EDDA' : '#F8D7DA', color: isCorrect ? '#155724' : '#721C24', borderRadius: '10px', fontWeight: 'bold', marginTop: '1rem' }}>
              <div style={{ marginBottom: '0.4rem' }}>
                {isCorrect
                  ? (language === 'bm' ? '✅ Betul!' : '✅ Correct!')
                  : (language === 'bm' ? '❌ Tidak betul. Jawapan: ' + question.answer : '❌ Wrong. Answer: ' + question.answer)}
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 'normal', opacity: 0.9 }}>
                {question.explanation_bm}
              </div>
            </div>
          )}
        </div>
      </div>
      <div style={{ flexShrink: 0, background: 'rgba(255,255,255,0.15)', borderTop: '2px solid rgba(255,255,255,0.3)', padding: '0.75rem 1rem', display: 'flex', gap: '0.75rem' }}>
        <button onClick={handleResetQuestion} style={{ flex: 1, padding: '0.75rem', background: 'rgba(255,255,255,0.7)', color: '#7E22CE', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
          <RefreshCw size={16} />
          {language === 'bm' ? 'Semula' : 'Reset'}
        </button>
        <button onClick={handleNext} disabled={!isAnswered}
          style={{ flex: 1, padding: '0.75rem', background: isAnswered ? '#7E22CE' : '#D8B4FE', color: 'white', border: 'none', borderRadius: '12px', cursor: isAnswered ? 'pointer' : 'not-allowed', fontWeight: 'bold', fontSize: '1rem', boxShadow: isAnswered ? '0 4px 0 #6B21A8' : 'none', transition: 'background 0.2s' }}>
          {qIdx < TOTAL_QUESTIONS - 1
            ? (language === 'bm' ? 'Soalan Seterusnya →' : 'Next Question →')
            : (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')}
        </button>
      </div>
    </div>
  );
}
