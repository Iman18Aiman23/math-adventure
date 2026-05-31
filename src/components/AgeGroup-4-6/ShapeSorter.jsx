import React, { useState, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../utils/soundManager';
import BackButton from '../BackButton';

// Age 4-6 Math — Identify 12 2D shapes, no repeat questions
const SHAPES = [
  {
    id: 'circle',
    name: { bm: 'Bulatan', eng: 'Circle' },
    color: '#FF6B9D',
    fact: { bm: 'Bulatan tidak mempunyai sudut!', eng: 'A circle has no corners!' },
    svg: (color) => (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <circle cx="50" cy="50" r="42" fill={color} stroke="#333" strokeWidth="3" />
      </svg>
    ),
  },
  {
    id: 'square',
    name: { bm: 'Segi Empat Sama', eng: 'Square' },
    color: '#58CC02',
    fact: { bm: 'Segi empat sama ada 4 sisi yang sama panjang!', eng: 'A square has 4 equal sides!' },
    svg: (color) => (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <rect x="9" y="9" width="82" height="82" fill={color} stroke="#333" strokeWidth="3" />
      </svg>
    ),
  },
  {
    id: 'triangle',
    name: { bm: 'Segi Tiga', eng: 'Triangle' },
    color: '#FF9800',
    fact: { bm: 'Segi tiga ada 3 sisi dan 3 sudut!', eng: 'A triangle has 3 sides and 3 corners!' },
    svg: (color) => (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <polygon points="50,7 93,91 7,91" fill={color} stroke="#333" strokeWidth="3" />
      </svg>
    ),
  },
  {
    id: 'rectangle',
    name: { bm: 'Segi Empat Tepat', eng: 'Rectangle' },
    color: '#2196F3',
    fact: { bm: 'Segi empat tepat ada 4 sudut tepat!', eng: 'A rectangle has 4 right angles!' },
    svg: (color) => (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <rect x="6" y="22" width="88" height="56" fill={color} stroke="#333" strokeWidth="3" />
      </svg>
    ),
  },
  {
    id: 'oval',
    name: { bm: 'Bujur', eng: 'Oval' },
    color: '#E91E8C',
    fact: { bm: 'Bujur seperti bulatan yang ditarik panjang!', eng: 'An oval is like a stretched circle!' },
    svg: (color) => (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <ellipse cx="50" cy="50" rx="44" ry="29" fill={color} stroke="#333" strokeWidth="3" />
      </svg>
    ),
  },
  {
    id: 'star',
    name: { bm: 'Bintang', eng: 'Star' },
    color: '#FF5722',
    fact: { bm: 'Bintang lima mempunyai 5 mata!', eng: 'A five-point star has 5 points!' },
    svg: (color) => (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <polygon points="50,6 62,34 92,36 69,56 76,86 50,70 24,86 31,56 8,36 38,34"
          fill={color} stroke="#333" strokeWidth="3" />
      </svg>
    ),
  },
  {
    id: 'diamond',
    name: { bm: 'Berlian', eng: 'Diamond' },
    color: '#9C27B0',
    fact: { bm: 'Berlian mempunyai 4 sisi yang sama!', eng: 'A diamond has 4 equal sides!' },
    svg: (color) => (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <polygon points="50,5 95,50 50,95 5,50" fill={color} stroke="#333" strokeWidth="3" />
      </svg>
    ),
  },
  {
    id: 'heart',
    name: { bm: 'Hati', eng: 'Heart' },
    color: '#F44336',
    fact: { bm: 'Bentuk hati adalah simbol kasih sayang!', eng: 'A heart shape is a symbol of love!' },
    svg: (color) => (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <path d="M50,80 C50,80 12,55 12,33 C12,18 24,10 35,17 C40,20 45,26 50,32 C55,26 60,20 65,17 C76,10 88,18 88,33 C88,55 50,80 50,80 Z"
          fill={color} stroke="#333" strokeWidth="3" />
      </svg>
    ),
  },
  {
    id: 'trapezoid',
    name: { bm: 'Trapezoid', eng: 'Trapezoid' },
    color: '#00BCD4',
    fact: { bm: 'Trapezoid mempunyai sepasang sisi selari!', eng: 'A trapezoid has one pair of parallel sides!' },
    svg: (color) => (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <polygon points="20,78 80,78 65,22 35,22" fill={color} stroke="#333" strokeWidth="3" />
      </svg>
    ),
  },
  {
    id: 'pentagon',
    name: { bm: 'Pentagon', eng: 'Pentagon' },
    color: '#4CAF50',
    fact: { bm: 'Pentagon mempunyai 5 sisi dan 5 sudut!', eng: 'A pentagon has 5 sides and 5 angles!' },
    svg: (color) => (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <polygon points="50,7 91,37 75,85 25,85 9,37" fill={color} stroke="#333" strokeWidth="3" />
      </svg>
    ),
  },
  {
    id: 'hexagon',
    name: { bm: 'Heksagon', eng: 'Hexagon' },
    color: '#673AB7',
    fact: { bm: 'Heksagon mempunyai 6 sisi — seperti sarang lebah!', eng: 'A hexagon has 6 sides — like a honeycomb!' },
    svg: (color) => (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <polygon points="50,6 88,28 88,72 50,94 12,72 12,28" fill={color} stroke="#333" strokeWidth="3" />
      </svg>
    ),
  },
  {
    id: 'octagon',
    name: { bm: 'Oktagon', eng: 'Octagon' },
    color: '#607D8B',
    fact: { bm: 'Oktagon mempunyai 8 sisi — seperti tanda berhenti!', eng: 'An octagon has 8 sides — like a stop sign!' },
    svg: (color) => (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <polygon points="50,8 80,20 92,50 80,80 50,92 20,80 8,50 20,20" fill={color} stroke="#333" strokeWidth="3" />
      </svg>
    ),
  },
];

const SHAPE_MAP = Object.fromEntries(SHAPES.map(s => [s.id, s]));

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

// Each shape appears exactly once — 12 non-repeating questions
const generateQuestions = () =>
  shuffle(SHAPES).map(shape => {
    const others  = shuffle(SHAPES.filter(s => s.id !== shape.id)).slice(0, 3).map(s => s.id);
    const options = shuffle([shape.id, ...others]);
    return { shapeId: shape.id, options };
  });

export default function ShapeSorter({ onBack, language = 'bm' }) {
  const [questions, setQuestions]           = useState(generateQuestions);
  const [qIdx, setQIdx]                     = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered]         = useState(false);
  const [score, setScore]                   = useState(0);
  const [isDone, setIsDone]                 = useState(false);

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
            {language === 'bm' ? 'Bentuk' : 'Shapes'}
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
            let bg = '#FFF', border = '#58CC02', color = '#333';
            if (isAnswered) {
              if (id === q.shapeId)           { bg = '#4CAF50'; border = '#388E3C'; color = 'white'; }
              else if (id === selectedAnswer) { bg = '#FF6B6B'; border = '#D32F2F'; color = 'white'; }
              else                            { bg = '#F5F5F5'; border = '#DDD';    color = '#AAA'; }
            }
            return (
              <button key={idx} onClick={() => handleSelect(id)} disabled={isAnswered}
                style={{ padding: '0.9rem 0.5rem', background: bg, color, border: `2px solid ${border}`, borderRadius: '12px', cursor: isAnswered ? 'default' : 'pointer', fontWeight: 700, fontSize: '0.85rem', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
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
