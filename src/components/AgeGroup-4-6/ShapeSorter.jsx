import React, { useState, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../utils/soundManager';
import BackButton from '../BackButton';

// Age 4-6 Math — Identify basic 2D shapes
const SHAPES = [
  {
    id: 'circle',
    name: { bm: 'Bulatan', eng: 'Circle' },
    svg: (color) => (
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
        <circle cx="50" cy="50" r="42" fill={color} stroke="#333" strokeWidth="3" />
      </svg>
    ),
    color: '#FF6B9D',
    fact: { bm: 'Bulatan tidak mempunyai sudut!', eng: 'A circle has no corners!' },
  },
  {
    id: 'square',
    name: { bm: 'Segi Empat Sama', eng: 'Square' },
    svg: (color) => (
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
        <rect x="10" y="10" width="80" height="80" fill={color} stroke="#333" strokeWidth="3" />
      </svg>
    ),
    color: '#58CC02',
    fact: { bm: 'Segi empat sama ada 4 sisi yang sama panjang!', eng: 'A square has 4 equal sides!' },
  },
  {
    id: 'triangle',
    name: { bm: 'Segi Tiga', eng: 'Triangle' },
    svg: (color) => (
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
        <polygon points="50,8 92,90 8,90" fill={color} stroke="#333" strokeWidth="3" />
      </svg>
    ),
    color: '#FF9800',
    fact: { bm: 'Segi tiga ada 3 sisi dan 3 sudut!', eng: 'A triangle has 3 sides and 3 corners!' },
  },
  {
    id: 'rectangle',
    name: { bm: 'Segi Empat Tepat', eng: 'Rectangle' },
    svg: (color) => (
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
        <rect x="6" y="22" width="88" height="56" fill={color} stroke="#333" strokeWidth="3" />
      </svg>
    ),
    color: '#2196F3',
    fact: { bm: 'Segi empat tepat ada 4 sudut tepat!', eng: 'A rectangle has 4 right angles!' },
  },
];

const SHAPE_MAP = Object.fromEntries(SHAPES.map(s => [s.id, s]));

const generateQuestions = () => {
  const pool = [];
  // Each shape appears twice = 8 questions
  SHAPES.forEach(s => { pool.push(s.id, s.id); });
  pool.sort(() => Math.random() - 0.5);
  return pool.map(id => {
    const correct = SHAPE_MAP[id];
    const wrongs  = SHAPES.filter(s => s.id !== id).map(s => s.id).sort(() => Math.random() - 0.5);
    const options = [id, ...wrongs].sort(() => Math.random() - 0.5);
    return { shapeId: id, options };
  });
};

export default function ShapeSorter({ onBack, language = 'bm' }) {
  const [questions, setQuestions]       = useState(generateQuestions);
  const [qIdx, setQIdx]                 = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered]     = useState(false);
  const [score, setScore]               = useState(0);
  const [isDone, setIsDone]             = useState(false);

  const q         = questions[qIdx];
  const shape     = SHAPE_MAP[q.shapeId];
  const isCorrect = selectedAnswer === q.shapeId;

  const handleSelect = useCallback((id) => {
    if (isAnswered) return;
    playHoverSound();
    setSelectedAnswer(id);
    if (id === q.shapeId) {
      playSound('correct');
      setScore(s => s + 10);
      confetti({ particleCount: 55, spread: 60 });
    } else {
      playSound('incorrect');
    }
    setIsAnswered(true);
  }, [isAnswered, q.shapeId]);

  const handleNext = useCallback(() => {
    if (qIdx < questions.length - 1) {
      setQIdx(i => i + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      playSound('levelup');
      confetti({ particleCount: 120, spread: 80 });
      setIsDone(true);
    }
  }, [qIdx, questions.length]);

  const handleReset = useCallback(() => {
    setQuestions(generateQuestions());
    setQIdx(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsDone(false);
  }, []);

  if (isDone) {
    return (
      <div style={{ minHeight: '100%', background: '#E6FFD4', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🔵</div>
        <h2 style={{ color: '#58CC02', fontSize: '2rem', marginBottom: '0.5rem' }}>
          {language === 'bm' ? 'Tahniah!' : 'Well Done!'}
        </h2>
        <p style={{ fontSize: '1.4rem', color: '#555', marginBottom: '2rem' }}>
          {language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/{questions.length * 10}
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={handleReset} className="ee-btn ee-btn--muted" style={{ padding: '0.8rem 1.5rem' }}>
            {language === 'bm' ? 'Main Semula' : 'Play Again'}
          </button>
          <button onClick={onBack} className="ee-btn" style={{ padding: '0.8rem 1.5rem', '--btn-bg': '#58CC02', '--btn-shadow': '#46A302' }}>
            {language === 'bm' ? 'Kembali' : 'Back'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#E6FFD4', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />

      {/* Header */}
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <h1 style={{ color: '#58CC02', marginBottom: '0.25rem', fontSize: '1.6rem' }}>
            {language === 'bm' ? 'Isih Bentuk!' : 'Shape Sorter!'}
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Namakan bentuk yang ditunjukkan' : 'Name the shape shown'}
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: 'rgba(88,204,2,0.12)', borderRadius: '10px' }}>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Soalan' : 'Question'} {qIdx + 1}/{questions.length}
          </span>
          <span style={{ fontWeight: 'bold', color: '#58CC02' }}>⭐ {score}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>

        {/* Shape display */}
        <div style={{ background: '#FFF', borderRadius: '16px', border: '2px solid #58CC02', padding: '1.5rem', marginBottom: '1.25rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.82rem', color: '#888', marginBottom: '0.75rem', fontWeight: 600 }}>
            {language === 'bm' ? 'Apakah bentuk ini?' : 'What shape is this?'}
          </p>
          <div style={{ width: '140px', height: '140px', margin: '0 auto' }}>
            {shape.svg(isAnswered ? shape.color : '#A8D5A2')}
          </div>
          {isAnswered && (
            <p style={{ marginTop: '0.65rem', fontWeight: 700, color: shape.color, fontSize: '1rem' }}>
              {language === 'bm' ? shape.fact.bm : shape.fact.eng}
            </p>
          )}
        </div>

        {/* Options — 2×2 grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
          {q.options.map((id, idx) => {
            const s = SHAPE_MAP[id];
            let bg = '#FFF', border = '#58CC02', color = '#333', fw = '700';
            if (isAnswered) {
              if (id === q.shapeId)        { bg = '#4CAF50'; border = '#388E3C'; color = 'white'; }
              else if (id === selectedAnswer) { bg = '#FF6B6B'; border = '#D32F2F'; color = 'white'; }
              else                           { bg = '#F5F5F5'; border = '#DDD'; color = '#AAA'; }
            }
            return (
              <button key={idx} onClick={() => handleSelect(id)} disabled={isAnswered}
                style={{ padding: '0.9rem 0.5rem', background: bg, color, border: `2px solid ${border}`, borderRadius: '12px', cursor: isAnswered ? 'default' : 'pointer', fontWeight: fw, fontSize: '0.95rem', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                <div style={{ width: '36px', height: '36px' }}>{s.svg(isAnswered ? s.color : '#888')}</div>
                <span>{language === 'bm' ? s.name.bm : s.name.eng}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {isAnswered && (
          <div style={{ padding: '0.85rem 1rem', background: isCorrect ? '#D4EDDA' : '#F8D7DA', color: isCorrect ? '#155724' : '#721C24', borderRadius: '8px', fontWeight: 'bold', textAlign: 'center' }}>
            {isCorrect
              ? (language === 'bm' ? `✅ Betul! Ini ialah ${shape.name.bm}!` : `✅ Correct! It's a ${shape.name.eng}!`)
              : (language === 'bm' ? `❌ Salah. Ini ialah ${shape.name.bm}.` : `❌ Wrong. It's a ${shape.name.eng}.`)}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ flexShrink: 0, background: '#E6FFD4', borderTop: '2px solid rgba(88,204,2,0.25)', padding: '0.75rem 1rem', display: 'flex', gap: '0.75rem' }}>
        <button onClick={handleReset} className="ee-btn ee-btn--muted" style={{ flex: 1 }}>
          <RefreshCw size={16} />
          {language === 'bm' ? 'Semula' : 'Reset'}
        </button>
        <button onClick={handleNext} disabled={!isAnswered}
          className="ee-btn" style={{ flex: 1, '--btn-bg': '#58CC02', '--btn-shadow': '#46A302' }}>
          {qIdx < questions.length - 1
            ? (language === 'bm' ? 'Seterusnya →' : 'Next →')
            : (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')}
        </button>
      </div>
    </div>
  );
}
