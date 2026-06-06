import React, { useState, useCallback, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../../../utils/soundManager';
import BackButton from '../../../BackButton';

// Basic fractions for Grade 2: 1/2, 1/3, 1/4, 2/3, 3/4, 1/5
const FRACTIONS = [
  { num: 1, den: 2, label: '1/2', words_bm: 'satu per dua', words_eng: 'one half' },
  { num: 1, den: 3, label: '1/3', words_bm: 'satu per tiga', words_eng: 'one third' },
  { num: 1, den: 4, label: '1/4', words_bm: 'satu per empat', words_eng: 'one quarter' },
  { num: 2, den: 3, label: '2/3', words_bm: 'dua per tiga', words_eng: 'two thirds' },
  { num: 3, den: 4, label: '3/4', words_bm: 'tiga per empat', words_eng: 'three quarters' },
  { num: 1, den: 5, label: '1/5', words_bm: 'satu per lima', words_eng: 'one fifth' },
];

// Circle (pizza) fraction visualization
function CircleFraction({ num, den, size = 150, color = '#FF6B6B' }) {
  const cx = size / 2, cy = size / 2, r = size * 0.4;
  const slices = [];

  for (let i = 0; i < den; i++) {
    const startAngle = (i * 360) / den - 90;
    const endAngle = ((i + 1) * 360) / den - 90;
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);

    const largeArc = (endAngle - startAngle) > 180 ? 1 : 0;
    const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    const filled = i < num;

    slices.push(
      <path
        key={i}
        d={path}
        fill={filled ? color : '#FFF'}
        stroke="#333"
        strokeWidth="2"
      />
    );
  }

  return <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>{slices}</svg>;
}

// Rectangle (bar) fraction visualization
function BarFraction({ num, den, width = 250, height = 50, color = '#4CAF50' }) {
  const segments = [];
  const segWidth = width / den;

  for (let i = 0; i < den; i++) {
    segments.push(
      <rect
        key={i}
        x={i * segWidth}
        y={0}
        width={segWidth}
        height={height}
        fill={i < num ? color : '#FFF'}
        stroke="#333"
        strokeWidth="2"
      />
    );
  }

  return <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>{segments}</svg>;
}

// Generate question for each mechanic
function generateQuestion(mechanic) {
  if (mechanic === 'kenali') {
    // Identify the fraction shown in picture
    const fraction = FRACTIONS[Math.floor(Math.random() * FRACTIONS.length)];
    const shape = Math.random() > 0.5 ? 'circle' : 'bar';

    const options = [fraction.label];
    while (options.length < 3) {
      const wrong = FRACTIONS[Math.floor(Math.random() * FRACTIONS.length)].label;
      if (!options.includes(wrong)) options.push(wrong);
    }

    return {
      type: 'kenali',
      question_bm: 'Apakah pecahan ini?',
      question_eng: 'What fraction is this?',
      fraction: fraction,
      shape: shape,
      options: options.sort(() => Math.random() - 0.5),
      answer: fraction.label,
      explanation_bm: `Pecahan ini ialah ${fraction.label} (${fraction.words_bm}). ${fraction.num} bahagian berwarna daripada ${fraction.den} bahagian semuanya.`,
    };
  } else if (mechanic === 'banding') {
    // Compare two fractions visually
    const f1 = FRACTIONS[Math.floor(Math.random() * FRACTIONS.length)];
    let f2 = FRACTIONS[Math.floor(Math.random() * FRACTIONS.length)];
    while (f1.num / f1.den === f2.num / f2.den) {
      f2 = FRACTIONS[Math.floor(Math.random() * FRACTIONS.length)];
    }

    const f1Value = f1.num / f1.den;
    const f2Value = f2.num / f2.den;
    const larger = f1Value > f2Value ? f1.label : f2.label;

    return {
      type: 'banding',
      question_bm: 'Pecahan yang manakah lebih besar?',
      question_eng: 'Which fraction is bigger?',
      fractions: [f1, f2],
      options: [f1.label, f2.label],
      answer: larger,
      explanation_bm: `${larger} lebih besar. ${f1.label} = ${f1Value.toFixed(2)}, ${f2.label} = ${f2Value.toFixed(2)}.`,
    };
  } else {
    // Word problem - cerita
    const scenarios = [
      {
        bm: (n, d) => `Pizza dibahagikan kepada ${d} bahagian. Ali makan ${n} bahagian. Berapakah pecahan pizza yang Ali makan?`,
        eng: (n, d) => `A pizza is divided into ${d} parts. Ali ate ${n} parts. What fraction of the pizza did Ali eat?`,
        emoji: '🍕',
      },
      {
        bm: (n, d) => `Kek dibahagikan kepada ${d} bahagian sama besar. Ibu memberi Siti ${n} bahagian. Berapa pecahan kek yang Siti dapat?`,
        eng: (n, d) => `A cake is divided into ${d} equal parts. Mom gave Siti ${n} parts. What fraction of the cake did Siti get?`,
        emoji: '🎂',
      },
      {
        bm: (n, d) => `Coklat ada ${d} bahagian. Adam makan ${n} bahagian. Berapa pecahan coklat yang dimakan Adam?`,
        eng: (n, d) => `A chocolate has ${d} parts. Adam ate ${n} parts. What fraction of the chocolate did Adam eat?`,
        emoji: '🍫',
      },
    ];

    const fraction = FRACTIONS[Math.floor(Math.random() * FRACTIONS.length)];
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];

    const options = [fraction.label];
    while (options.length < 3) {
      const wrong = FRACTIONS[Math.floor(Math.random() * FRACTIONS.length)].label;
      if (!options.includes(wrong)) options.push(wrong);
    }

    return {
      type: 'cerita',
      question_bm: scenario.bm(fraction.num, fraction.den),
      question_eng: scenario.eng(fraction.num, fraction.den),
      emoji: scenario.emoji,
      options: options.sort(() => Math.random() - 0.5),
      answer: fraction.label,
      explanation_bm: `${fraction.num} bahagian daripada ${fraction.den} bahagian = ${fraction.label} (${fraction.words_bm}).`,
    };
  }
}

const TOTAL_QUESTIONS = 12;
const QUESTIONS_PER_MECHANIC = 4;

export default function Pecahan({ onBack, language = 'bm' }) {
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
    const mechanics = ['kenali', 'banding', 'cerita'];
    mechanics.forEach(mechanic => {
      for (let i = 0; i < QUESTIONS_PER_MECHANIC; i++) {
        qs.push(generateQuestion(mechanic));
      }
    });
    return qs.sort(() => Math.random() - 0.5);
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
        [question.type]: {
          correct: prev[question.type].correct + 1,
          total: prev[question.type].total + 1,
        },
      }));
      confetti({ particleCount: 40, spread: 55 });
    } else {
      playSound('incorrect');
      setMechanicStats(prev => ({
        ...prev,
        [question.type]: {
          correct: prev[question.type].correct,
          total: prev[question.type].total + 1,
        },
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
    setMechanicStats({
      kenali: { correct: 0, total: 0 },
      banding: { correct: 0, total: 0 },
      cerita: { correct: 0, total: 0 },
    });
  }, []);

  const getOptionStyle = (option) => {
    if (!isAnswered) return { bg: '#FFF', border: '#1CB0F6', color: '#333' };
    if (option === question.answer) return { bg: '#4CAF50', border: '#388E3C', color: 'white' };
    if (option === selectedAnswer) return { bg: '#FF6B6B', border: '#D32F2F', color: 'white' };
    return { bg: '#F5F5F5', border: '#DDD', color: '#AAA' };
  };

  if (isDone) {
    return (
      <div style={{ minHeight: '100%', background: '#D0F0FF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🍕</div>
        <h2 style={{ color: '#1CB0F6', fontSize: '2rem', marginBottom: '0.5rem' }}>
          {language === 'bm' ? 'Tahniah!' : 'Well Done!'}
        </h2>
        <p style={{ fontSize: '1.4rem', color: '#555', marginBottom: '1.5rem' }}>
          {language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/{TOTAL_QUESTIONS * 10}
        </p>

        <div style={{ background: '#FFF', borderRadius: '12px', padding: '1rem', marginBottom: '2rem', maxWidth: '400px', width: '100%' }}>
          <h3 style={{ color: '#1CB0F6', fontSize: '1rem', marginBottom: '0.8rem', textAlign: 'center' }}>
            {language === 'bm' ? 'Keputusan Setiap Jenis' : 'Results by Type'}
          </h3>
          {['kenali', 'banding', 'cerita'].map(type => {
            const label = { kenali: '🔍 Kenali Pecahan', banding: '⚖️ Bandingkan', cerita: '📖 Cerita' }[type];
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
          <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', background: '#1CB0F6', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>
            {language === 'bm' ? 'Kembali' : 'Back'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#D0F0FF', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />

      {/* Header */}
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <h1 style={{ color: '#1CB0F6', marginBottom: '0.25rem', fontSize: '1.6rem' }}>
            {language === 'bm' ? 'Pecahan' : 'Fractions'}
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Belajar pecahan asas' : 'Learn basic fractions'}
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: 'rgba(28,176,246,0.12)', borderRadius: '10px' }}>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>
            {language === 'bm' ? `Soalan ${qIdx + 1}/${TOTAL_QUESTIONS}` : `Q${qIdx + 1}/${TOTAL_QUESTIONS}`}
          </span>
          <span style={{ fontWeight: 'bold', color: '#1CB0F6' }}>⭐ {score}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>

        <div style={{ background: '#FFF', borderRadius: '12px', border: '2px solid #1CB0F6', padding: '1.1rem 1.25rem', marginBottom: '1rem' }}>

          {/* Type indicator badge */}
          <div style={{ display: 'inline-block', background: '#E3F2FD', color: '#1CB0F6', padding: '0.3rem 0.7rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {question.type === 'kenali' && '🔍 Kenali Pecahan'}
            {question.type === 'banding' && '⚖️ Bandingkan'}
            {question.type === 'cerita' && '📖 Cerita'}
          </div>

          {/* Visual: Single fraction for kenali */}
          {question.type === 'kenali' && (
            <div style={{ background: '#E3F2FD', borderRadius: '8px', padding: '1.5rem 1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {question.shape === 'circle' ? (
                <CircleFraction num={question.fraction.num} den={question.fraction.den} size={150} color="#FF6B6B" />
              ) : (
                <BarFraction num={question.fraction.num} den={question.fraction.den} width={280} height={50} color="#4CAF50" />
              )}
            </div>
          )}

          {/* Visual: Two fractions for banding */}
          {question.type === 'banding' && (
            <div style={{ background: '#E3F2FD', borderRadius: '8px', padding: '1.5rem 1rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', gap: '1rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <CircleFraction num={question.fractions[0].num} den={question.fractions[0].den} size={120} color="#FF6B6B" />
                  <div style={{ marginTop: '0.5rem', fontWeight: 700, color: '#FF6B6B', fontSize: '1.5rem' }}>
                    {question.fractions[0].label}
                  </div>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1CB0F6' }}>vs</div>
                <div style={{ textAlign: 'center' }}>
                  <CircleFraction num={question.fractions[1].num} den={question.fractions[1].den} size={120} color="#4CAF50" />
                  <div style={{ marginTop: '0.5rem', fontWeight: 700, color: '#4CAF50', fontSize: '1.5rem' }}>
                    {question.fractions[1].label}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Visual: Emoji for cerita */}
          {question.type === 'cerita' && (
            <div style={{ background: '#E3F2FD', borderRadius: '8px', padding: '2rem 1rem', marginBottom: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '5rem' }}>{question.emoji}</div>
            </div>
          )}

          {/* Question text */}
          <div style={{ background: '#FFF9C4', borderLeft: '4px solid #FBC02D', padding: '0.9rem 1rem', marginBottom: '1rem', borderRadius: '6px' }}>
            <p style={{ fontSize: '1rem', color: '#333', margin: '0', fontWeight: 600, lineHeight: 1.5 }}>
              {language === 'bm' ? question.question_bm : question.question_eng}
            </p>
          </div>

          {/* Options */}
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

          {/* Feedback */}
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

      {/* Footer */}
      <div style={{ flexShrink: 0, background: '#D0F0FF', borderTop: '2px solid rgba(28,176,246,0.25)', padding: '0.75rem 1rem', display: 'flex', gap: '0.75rem' }}>
        <button onClick={handleResetQuestion} style={{ flex: 1, padding: '0.75rem', background: '#E0E0E0', color: '#555', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
          <RefreshCw size={16} />
          {language === 'bm' ? 'Semula' : 'Reset'}
        </button>
        <button onClick={handleNext} disabled={!isAnswered}
          style={{ flex: 1, padding: '0.75rem', background: isAnswered ? '#1CB0F6' : '#7FD4FF', color: 'white', border: 'none', borderRadius: '10px', cursor: isAnswered ? 'pointer' : 'not-allowed', fontWeight: 'bold', fontSize: '1rem', boxShadow: isAnswered ? '0 4px 0 #0B8DC0' : 'none', transition: 'background 0.2s' }}>
          {qIdx < TOTAL_QUESTIONS - 1
            ? (language === 'bm' ? 'Soalan Seterusnya →' : 'Next Question →')
            : (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')}
        </button>
      </div>
    </div>
  );
}
