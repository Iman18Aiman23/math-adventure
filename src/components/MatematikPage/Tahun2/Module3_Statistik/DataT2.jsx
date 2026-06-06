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

const EMOJIS = ['\uD83C\uDF4E', '\uD83C\uDF4A', '\uD83C\uDF4B', '\uD83C\uDF47'];
const FRUIT_BM = ['Epal', 'Oren', 'Limau', 'Anggur'];
const FRUIT_EN = ['Apple', 'Orange', 'Lemon', 'Grape'];

function Pictograph({ data }) {
  const rowH = 38;
  const labelW = 75;
  const totalH = data.length * rowH + 20;
  return (
    <svg viewBox={`0 0 320 ${totalH}`} style={{ width: '100%', maxWidth: 320, display: 'block' }}>
      {data.map((item, i) => (
        <g key={i}>
          <text x={5} y={i * rowH + rowH * 0.65} fontSize="13" fill="#7E22CE" fontWeight="700">
            {item.label}
          </text>
          {Array.from({ length: item.count }, (_, j) => (
            <text key={j} x={labelW + j * 30} y={i * rowH + rowH * 0.65} fontSize="22">
              {item.emoji}
            </text>
          ))}
        </g>
      ))}
    </svg>
  );
}

function generateQuestion(mechanic) {
  const numCats = randInt(3, 4);
  const idxs = shuffle([0, 1, 2, 3]).slice(0, numCats);
  const data = idxs.map(i => ({
    emoji: EMOJIS[i],
    label: FRUIT_BM[i],
    labelEn: FRUIT_EN[i],
    count: randInt(2, 6),
  }));
  const allFruitBM = ['Epal', 'Oren', 'Limau', 'Anggur'];
  const allFruitEN = ['Apple', 'Orange', 'Lemon', 'Grape'];

  if (mechanic === 'baca-carta') {
    const target = data[randInt(0, data.length - 1)];
    const wrongs = shuffle(
      [target.count - 1, target.count + 1, target.count + 2, target.count - 2, randInt(1, 4), randInt(5, 9)]
        .filter(n => n !== target.count && n > 0 && n < 10)
    ).slice(0, 3);
    const options = shuffle([target.count.toString(), ...wrongs.map(String)]);
    return {
      type: 'baca-carta',
      question_bm: 'Ada berapa biji ' + target.label.toLowerCase() + '?',
      question_eng: 'How many ' + target.labelEn.toLowerCase() + 's are there?',
      data,
      options,
      answer: target.count.toString(),
      explanation_bm: target.label + ' ada ' + target.count + ' biji di dalam piktograf.',
    };
  } else if (mechanic === 'banding') {
    const askMost = Math.random() < 0.5;
    const sorted = [...data].sort((a, b) => a.count - b.count);
    const correct = askMost ? sorted[sorted.length - 1] : sorted[0];
    let optionLabels = data.map(d => d.label);
    if (optionLabels.length < 4) {
      const missing = [0, 1, 2, 3].filter(i => !idxs.includes(i));
      optionLabels.push(allFruitBM[missing[0]]);
    }
    optionLabels = shuffle(optionLabels);
    return {
      type: 'banding',
      question_bm: askMost ? 'Buah yang manakah paling banyak?' : 'Buah yang manakah paling sedikit?',
      question_eng: askMost ? 'Which fruit has the most?' : 'Which fruit has the least?',
      data,
      options: optionLabels,
      answer: correct.label,
      explanation_bm: correct.label + ' ada ' + correct.count + ' biji, ' + (askMost ? 'paling banyak' : 'paling sedikit') + '.',
    };
  } else {
    const total = data.reduce((sum, d) => sum + d.count, 0);
    const wrongs = shuffle(
      [total - 1, total + 1, total - 2, total + 2, randInt(1, 4), randInt(7, 15)]
        .filter(n => n !== total && n > 0 && n < 20)
    ).slice(0, 3);
    const options = shuffle([total.toString(), ...wrongs.map(String)]);
    return {
      type: 'jumlah',
      question_bm: 'Ada berapa jumlah semua buah?',
      question_eng: 'How many fruits are there in total?',
      data,
      options,
      answer: total.toString(),
      explanation_bm: 'Jumlah: ' + data.map(d => d.label + ' (' + d.count + ')').join(' + ') + ' = ' + total + '.',
    };
  }
}

const TOTAL_QUESTIONS = 12;
const QUESTIONS_PER_MECHANIC = 4;
const MECHANICS = ['baca-carta', 'banding', 'jumlah'];

export default function DataT2({ onBack, language = 'bm' }) {
  const [isStarted, setIsStarted] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [mechanicStats, setMechanicStats] = useState({
    'baca-carta': { correct: 0, total: 0 },
    banding: { correct: 0, total: 0 },
    jumlah: { correct: 0, total: 0 },
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
      'baca-carta': { correct: 0, total: 0 },
      banding: { correct: 0, total: 0 },
      jumlah: { correct: 0, total: 0 },
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
          <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>📊</div>
          <h1 style={{ color: '#FFF', fontSize: '2.2rem', marginBottom: '0.5rem', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
            {language === 'bm' ? 'Pengurusan Data' : 'Data Management'}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.6 }}>
            {language === 'bm' ? 'Belajar membaca piktograf, banding data, dan kira jumlah!' : 'Learn to read pictographs, compare data, and count totals!'}
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
            const label = { 'baca-carta': '📖 Baca Carta', 'banding': '⚖️ Banding', 'jumlah': '➕ Jumlah' }[type];
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
            {language === 'bm' ? 'Pengurusan Data' : 'Data Management'}
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
            {question.type === 'baca-carta' ? '📖 Baca Carta' : question.type === 'banding' ? '⚖️ Banding' : '➕ Jumlah'}
          </div>
          <div style={{ background: '#F3E8FF', borderRadius: '12px', padding: '1.5rem 1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
            <Pictograph data={question.data} />
          </div>
          <div style={{ background: '#FFF9C4', borderLeft: '4px solid #FBC02D', padding: '0.9rem 1rem', marginBottom: '1rem', borderRadius: '8px' }}>
            <p style={{ fontSize: '1rem', color: '#333', margin: '0', fontWeight: 600, lineHeight: 1.5 }}>
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
