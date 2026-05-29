import React, { useState, useCallback, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../utils/soundManager';
import BackButton from '../BackButton';

// Fruit icons for visual representation
const getFruitIcon = (num) => {
  const fruits = ['🍎', '🍇', '🍌', '🍉', '🍓', '🍒', '🥭', '🍍'];
  return fruits[num % fruits.length];
};

// Generate multiplication questions for Grade 2 level (2×1 to 6×6)
function generateQuestion(mechanic) {
  const num1 = Math.floor(Math.random() * 5) + 2; // 2-6
  const num2 = Math.floor(Math.random() * 6) + 1; // 1-6
  const answer = num1 * num2;

  if (mechanic === 'gambar') {
    // Visual: groups of fruits
    const fruit = getFruitIcon(num1);
    return {
      type: 'gambar',
      question_bm: `Berapa banyak buah kesemuanya?`,
      question_eng: `How many fruits in total?`,
      visual: { groups: num1, itemsPerGroup: num2, fruit },
      options: generateOptions(answer),
      answer: String(answer),
      explanation_bm: `${num1} kumpulan × ${num2} buah setiap kumpulan = ${answer} buah`,
    };
  } else if (mechanic === 'simbolik') {
    // Symbolic: numbers only
    return {
      type: 'simbolik',
      question_bm: `${num1} × ${num2} = ?`,
      question_eng: `${num1} × ${num2} = ?`,
      options: generateOptions(answer),
      answer: String(answer),
      explanation_bm: `${num1} × ${num2} = ${answer}`,
    };
  } else {
    // Story: real-world context
    const stories = [
      { bm: `Rini mempunyai ${num1} kotak. Setiap kotak ada ${num2} pensel. Berapa pensel kesemuanya?`, eng: `Rini has ${num1} boxes. Each box has ${num2} pencils. How many pencils in total?` },
      { bm: `Ibu beli ${num1} beg. Setiap beg ada ${num2} aiskrim. Berapa aiskrim semuanya?`, eng: `Mom bought ${num1} bags. Each bag has ${num2} ice creams. How many ice creams in total?` },
      { bm: `Ali dapat ${num1} keranjang buah. Setiap keranjang ada ${num2} buah epal. Berapa buah epal semuanya?`, eng: `Ali got ${num1} baskets of fruit. Each basket has ${num2} apples. How many apples in total?` },
      { bm: `Sekolah beli ${num1} pak buku. Setiap pak ada ${num2} buah buku. Berapa buah buku semuanya?`, eng: `School bought ${num1} packs of books. Each pack has ${num2} books. How many books in total?` },
    ];
    const story = stories[Math.floor(Math.random() * stories.length)];
    return {
      type: 'cerita',
      question_bm: story.bm,
      question_eng: story.eng,
      options: generateOptions(answer),
      answer: String(answer),
      explanation_bm: `${num1} × ${num2} = ${answer}`,
    };
  }
}

function generateOptions(answer) {
  const options = [answer];
  while (options.length < 3) {
    const wrong = Math.floor(Math.random() * 30) + 2;
    if (wrong !== answer && !options.includes(wrong)) {
      options.push(wrong);
    }
  }
  return options.sort(() => Math.random() - 0.5).map(String);
}

const TOTAL_QUESTIONS = 12;
const QUESTIONS_PER_MECHANIC = 4;

export default function DarabMudah({ onBack, language = 'bm' }) {
  const [qIdx, setQIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [mechanicStats, setMechanicStats] = useState({
    gambar: { correct: 0, total: 0 },
    simbolik: { correct: 0, total: 0 },
    cerita: { correct: 0, total: 0 },
  });

  // Generate questions for this session
  const questions = useMemo(() => {
    const qs = [];
    const mechanics = ['gambar', 'simbolik', 'cerita'];
    mechanics.forEach(mechanic => {
      for (let i = 0; i < QUESTIONS_PER_MECHANIC; i++) {
        qs.push(generateQuestion(mechanic));
      }
    });
    return qs.sort(() => Math.random() - 0.5); // Shuffle
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
      gambar: { correct: 0, total: 0 },
      simbolik: { correct: 0, total: 0 },
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
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>✖️</div>
        <h2 style={{ color: '#1CB0F6', fontSize: '2rem', marginBottom: '0.5rem' }}>
          {language === 'bm' ? 'Tahniah!' : 'Well Done!'}
        </h2>
        <p style={{ fontSize: '1.4rem', color: '#555', marginBottom: '1.5rem' }}>
          {language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/{TOTAL_QUESTIONS * 10}
        </p>

        {/* Stats by mechanic */}
        <div style={{ background: '#FFF', borderRadius: '12px', padding: '1rem', marginBottom: '2rem', maxWidth: '400px', width: '100%' }}>
          <h3 style={{ color: '#1CB0F6', fontSize: '1rem', marginBottom: '0.8rem', textAlign: 'center' }}>
            {language === 'bm' ? 'Keputusan Setiap Jenis' : 'Results by Type'}
          </h3>
          {['gambar', 'simbolik', 'cerita'].map(type => {
            const label = { gambar: '📷 Gambar', simbolik: '🔢 Simbolik', cerita: '📖 Cerita' }[type];
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
            {language === 'bm' ? 'Darab Mudah' : 'Easy Multiplication'}
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Pelajari darab 2×1 hingga 6×6' : 'Learn multiplication 2×1 to 6×6'}
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

        {/* Question card */}
        <div style={{ background: '#FFF', borderRadius: '12px', border: '2px solid #1CB0F6', padding: '1.1rem 1.25rem', marginBottom: '1rem' }}>

          {/* Type indicator */}
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1CB0F6', marginBottom: '0.8rem', textTransform: 'uppercase' }}>
            {question.type === 'gambar' && '📷 Gambar (Visual)'}
            {question.type === 'simbolik' && '🔢 Simbolik (Symbolic)'}
            {question.type === 'cerita' && '📖 Cerita (Story)'}
          </div>

          {/* Visual representation for gambar */}
          {question.type === 'gambar' && (
            <div style={{ background: '#E3F2FD', borderRadius: '8px', padding: '1.5rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                {/* Top - number of groups */}
                <div style={{ display: 'flex', gap: '0.5rem', fontSize: '2.5rem', justifyContent: 'center' }}>
                  {Array(question.visual.groups).fill(0).map((_, idx) => (
                    <span key={idx}>{question.visual.fruit}</span>
                  ))}
                </div>

                {/* × symbol - always in middle */}
                <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1CB0F6' }}>×</span>

                {/* Bottom - items per group (6x6 grid layout) */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.5rem', fontSize: '2.5rem', justifyItems: 'center', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                  {Array(question.visual.itemsPerGroup).fill(0).map((_, idx) => (
                    <span key={idx}>{question.visual.fruit}</span>
                  ))}
                </div>
              </div>

              {/* Equation */}
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1CB0F6', marginTop: '1rem', textAlign: 'center' }}>
                {question.visual.groups} × {question.visual.itemsPerGroup} = ?
              </div>
            </div>
          )}

          {/* Question text */}
          <div style={{ background: '#FFF9C4', borderLeft: '4px solid #FBC02D', padding: '0.8rem 1rem', marginBottom: '1rem', borderRadius: '6px' }}>
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
                  style={{ padding: '0.8rem 1rem', background: bg, color, border: `2px solid ${border}`, borderRadius: '10px', cursor: isAnswered ? 'default' : 'pointer', fontWeight: 'bold', fontSize: '0.95rem', textAlign: 'center', transition: 'all 0.2s' }}>
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
