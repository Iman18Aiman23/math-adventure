import React, { useState, useCallback, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../../../utils/soundManager';
import BackButton from '../../../BackButton';

const SHAPES_2D = [
  { id: 'square', bm: 'Segi Empat Sama', eng: 'Square', sides: 4, corners: 4 },
  { id: 'triangle', bm: 'Segi Tiga', eng: 'Triangle', sides: 3, corners: 3 },
  { id: 'rectangle', bm: 'Segi Empat Tepat', eng: 'Rectangle', sides: 4, corners: 4 },
  { id: 'circle', bm: 'Bulatan', eng: 'Circle', sides: 0, corners: 0 },
  { id: 'pentagon', bm: 'Pentagon', eng: 'Pentagon', sides: 5, corners: 5 },
  { id: 'hexagon', bm: 'Heksagon', eng: 'Hexagon', sides: 6, corners: 6 },
];

const SHAPES_3D = [
  { id: 'cube', bm: 'Kubus', eng: 'Cube', vertices: 8, faces: 6, edges: 12 },
  { id: 'cuboid', bm: 'Kuboid', eng: 'Cuboid', vertices: 8, faces: 6, edges: 12 },
  { id: 'sphere', bm: 'Sfera', eng: 'Sphere', vertices: 0, faces: 1, edges: 0 },
  { id: 'cone', bm: 'Kon', eng: 'Cone', vertices: 1, faces: 2, edges: 1 },
  { id: 'cylinder', bm: 'Silinder', eng: 'Cylinder', vertices: 0, faces: 3, edges: 2 },
];

function Shape2DSvg({ shape, size = 140, color = '#6366F1' }) {
  const p = {
    square: 'M25,25 L95,25 L95,95 L25,95 Z',
    triangle: 'M60,18 L108,95 L12,95 Z',
    rectangle: 'M15,30 L105,30 L105,95 L15,95 Z',
    circle: 'M60,18 A44,44 0 1,1 60,106 A44,44 0 1,1 60,18',
    pentagon: 'M60,15 L100,42 L88,88 L32,88 L20,42 Z',
    hexagon: 'M60,18 L97,33 L97,75 L60,90 L23,75 L23,33 Z',
  };
  return (
    <svg viewBox="0 0 120 120" width={size} height={size}>
      <path d={p[shape.id]} fill={color} opacity="0.18" stroke={color} strokeWidth="3.5" strokeLinejoin="round" />
    </svg>
  );
}

function Shape3DSvg({ shape, size = 140, color = '#6366F1' }) {
  if (shape.id === 'cube') {
    return (
      <svg viewBox="0 0 120 120" width={size} height={size}>
        <polygon points="60,12 108,38 108,92 60,118 12,92 12,38" fill={color} opacity="0.12" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
        <polygon points="60,12 108,38 60,62 12,38" fill={color} opacity="0.25" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
        <polygon points="12,38 60,62 60,118 12,92" fill={color} opacity="0.18" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
    );
  }
  if (shape.id === 'cuboid') {
    return (
      <svg viewBox="0 0 120 120" width={size} height={size}>
        <polygon points="45,12 108,30 108,100 45,118 10,100 10,35" fill={color} opacity="0.12" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
        <polygon points="45,12 108,30 45,55 10,35" fill={color} opacity="0.25" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
        <polygon points="10,35 45,55 45,118 10,100" fill={color} opacity="0.18" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
    );
  }
  if (shape.id === 'sphere') {
    return (
      <svg viewBox="0 0 120 120" width={size} height={size}>
        <circle cx="60" cy="60" r="48" fill={color} opacity="0.12" stroke={color} strokeWidth="2.5" />
        <ellipse cx="60" cy="60" rx="48" ry="16" fill="none" stroke={color} strokeWidth="1.2" opacity="0.3" />
        <ellipse cx="60" cy="60" rx="16" ry="48" fill="none" stroke={color} strokeWidth="1.2" opacity="0.2" />
        <ellipse cx="76" cy="46" rx="14" ry="12" fill={color} opacity="0.12" />
      </svg>
    );
  }
  if (shape.id === 'cone') {
    return (
      <svg viewBox="0 0 120 120" width={size} height={size}>
        <ellipse cx="60" cy="98" rx="42" ry="12" fill={color} opacity="0.18" stroke={color} strokeWidth="2" />
        <path d="M60,12 L18,98 Q60,112 102,98 Z" fill={color} opacity="0.12" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M60,12 L60,105" stroke={color} strokeWidth="1.2" opacity="0.2" strokeDasharray="4,3" />
      </svg>
    );
  }
  if (shape.id === 'cylinder') {
    return (
      <svg viewBox="0 0 120 120" width={size} height={size}>
        <ellipse cx="60" cy="18" rx="36" ry="10" fill={color} opacity="0.25" stroke={color} strokeWidth="2" />
        <rect x="24" y="18" width="72" height="78" fill={color} opacity="0.08" stroke={color} strokeWidth="2" />
        <ellipse cx="60" cy="96" rx="36" ry="10" fill={color} opacity="0.18" stroke={color} strokeWidth="2" />
        <line x1="24" y1="18" x2="24" y2="96" stroke={color} strokeWidth="2" />
        <line x1="96" y1="18" x2="96" y2="96" stroke={color} strokeWidth="2" />
      </svg>
    );
  }
  return null;
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randInt(lo, hi) {
  return Math.floor(Math.random() * (hi - lo + 1)) + lo;
}

function generateQuestion(mechanic) {
  if (mechanic === 'bentuk-2d') {
    const shape = SHAPES_2D[randInt(0, SHAPES_2D.length - 1)];
    const allNames = SHAPES_2D.map(s => s.bm);
    const distractors = shuffle(allNames.filter(n => n !== shape.bm)).slice(0, 3);
    const options = shuffle([shape.bm, ...distractors]);
    return {
      type: 'bentuk-2d',
      question_bm: 'Apakah bentuk 2D ini?',
      question_eng: 'What 2D shape is this?',
      shape,
      options,
      answer: shape.bm,
      explanation_bm: `Bentuk ini ialah ${shape.bm}.`,
    };
  } else if (mechanic === 'bentuk-3d') {
    const shape = SHAPES_3D[randInt(0, SHAPES_3D.length - 1)];
    const allNames = SHAPES_3D.map(s => s.bm);
    const distractors = shuffle(allNames.filter(n => n !== shape.bm)).slice(0, 3);
    const options = shuffle([shape.bm, ...distractors]);
    return {
      type: 'bentuk-3d',
      question_bm: 'Apakah bentuk 3D ini?',
      question_eng: 'What 3D shape is this?',
      shape,
      options,
      answer: shape.bm,
      explanation_bm: `Bentuk ini ialah ${shape.bm}.`,
    };
  } else {
    const use3D = Math.random() < 0.5;
    const pool = use3D ? SHAPES_3D : SHAPES_2D;
    const shape = pool[randInt(0, pool.length - 1)];
    const askSides = Math.random() < 0.5;
    const answer = askSides
      ? (use3D ? `${shape.edges}` : `${shape.sides}`)
      : (use3D ? `${shape.vertices}` : `${shape.corners}`);
    const attr = askSides
      ? { bm: 'sisi', eng: 'sides' }
      : (use3D ? { bm: 'bucu', eng: 'vertices' } : { bm: 'bucu', eng: 'corners' });
    const allAnswers = [...Array(13).keys()].map(String).filter(x => x !== answer);
    const distractors = shuffle(allAnswers).slice(0, 3);
    const options = shuffle([answer, ...distractors]);
    const shapeName = use3D ? shape.bm : shape.bm;
    return {
      type: 'ciri-ciri',
      question_bm: `Berapakah bilangan ${attr.bm} bagi ${shapeName}?`,
      question_eng: `How many ${attr.eng} does a ${shape.eng} have?`,
      shape,
      attr: attr.bm,
      options,
      answer,
      explanation_bm: `${shapeName} mempunyai ${answer} ${attr.bm}.`,
    };
  }
}

const TOTAL_QUESTIONS = 12;
const QUESTIONS_PER_MECHANIC = 4;

export default function GeometriT2({ onBack, language = 'bm' }) {
  const [qIdx, setQIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [mechanicStats, setMechanicStats] = useState({
    'bentuk-2d': { correct: 0, total: 0 },
    'bentuk-3d': { correct: 0, total: 0 },
    'ciri-ciri': { correct: 0, total: 0 },
  });

  const questions = useMemo(() => {
    const qs = [];
    ['bentuk-2d', 'bentuk-3d', 'ciri-ciri'].forEach(mechanic => {
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
    setMechanicStats({ 'bentuk-2d': { correct: 0, total: 0 }, 'bentuk-3d': { correct: 0, total: 0 }, 'ciri-ciri': { correct: 0, total: 0 } });
  }, []);

  const getOptionStyle = (option) => {
    if (!isAnswered) return { bg: '#FFF', border: '#6366F1', color: '#333' };
    if (option === question.answer) return { bg: '#4CAF50', border: '#388E3C', color: 'white' };
    if (option === selectedAnswer) return { bg: '#FF6B6B', border: '#D32F2F', color: 'white' };
    return { bg: '#F5F5F5', border: '#DDD', color: '#AAA' };
  };

  if (isDone) {
    return (
      <div style={{ minHeight: '100%', background: 'linear-gradient(135deg,#E0E7FF 0%,#A5B4FC 50%,#4338CA 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>📐</div>
        <h2 style={{ color: 'white', fontSize: '2rem', marginBottom: '0.5rem' }}>
          {language === 'bm' ? 'Tahniah!' : 'Well Done!'}
        </h2>
        <p style={{ fontSize: '1.4rem', color: 'rgba(255,255,255,0.9)', marginBottom: '1.5rem' }}>
          {language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/{TOTAL_QUESTIONS * 10}
        </p>
        <div style={{ background: '#FFF', borderRadius: '12px', padding: '1rem', marginBottom: '2rem', maxWidth: '400px', width: '100%' }}>
          <h3 style={{ color: '#6366F1', fontSize: '1rem', marginBottom: '0.8rem', textAlign: 'center' }}>
            {language === 'bm' ? 'Keputusan Setiap Jenis' : 'Results by Type'}
          </h3>
          {['bentuk-2d', 'bentuk-3d', 'ciri-ciri'].map(type => {
            const label = { 'bentuk-2d': '🔷 Bentuk 2D', 'bentuk-3d': '🧊 Bentuk 3D', 'ciri-ciri': '🔍 Ciri-ciri' }[type];
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
          <button onClick={handleResetGame} style={{ padding: '0.75rem 1.5rem', background: 'rgba(255,255,255,0.2)', color: 'white', border: '2px solid white', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>
            {language === 'bm' ? 'Cuba Lagi' : 'Try Again'}
          </button>
          <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', background: 'white', color: '#4338CA', border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>
            {language === 'bm' ? 'Kembali' : 'Back'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg,#E0E7FF 0%,#A5B4FC 50%,#4338CA 100%)', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <h1 style={{ color: 'white', marginBottom: '0.25rem', fontSize: '1.6rem' }}>
            {language === 'bm' ? 'Ruang (Geometri)' : 'Space (Geometry)'}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Kenali bentuk 2D, 3D dan ciri-cirinya' : 'Learn 2D, 3D shapes and their properties'}
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: 'rgba(255,255,255,0.2)', borderRadius: '10px' }}>
          <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem' }}>
            {language === 'bm' ? `Soalan ${qIdx + 1}/${TOTAL_QUESTIONS}` : `Q${qIdx + 1}/${TOTAL_QUESTIONS}`}
          </span>
          <span style={{ fontWeight: 'bold', color: 'white' }}>⭐ {score}</span>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ background: '#FFF', borderRadius: '16px', border: '2px solid rgba(99,102,241,0.3)', padding: '1.1rem 1.25rem', marginBottom: '1rem' }}>
          <div style={{ display: 'inline-block', background: '#EEF2FF', color: '#6366F1', padding: '0.3rem 0.7rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {question.type === 'bentuk-2d' && '🔷 Bentuk 2D'}
            {question.type === 'bentuk-3d' && '🧊 Bentuk 3D'}
            {question.type === 'ciri-ciri' && '🔍 Ciri-ciri'}
          </div>
          {question.type === 'bentuk-2d' && (
            <div style={{ background: '#EEF2FF', borderRadius: '12px', padding: '1.5rem 1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Shape2DSvg shape={question.shape} />
            </div>
          )}
          {question.type === 'bentuk-3d' && (
            <div style={{ background: '#EEF2FF', borderRadius: '12px', padding: '1.5rem 1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Shape3DSvg shape={question.shape} />
            </div>
          )}
          {question.type === 'ciri-ciri' && (
            <div style={{ background: '#EEF2FF', borderRadius: '12px', padding: '1.5rem 1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#6366F1' }}>{question.shape.bm}</div>
              {(question.shape.id in { square: 1, triangle: 1, rectangle: 1, circle: 1, pentagon: 1, hexagon: 1 })
                ? <Shape2DSvg shape={question.shape} size={100} />
                : <Shape3DSvg shape={question.shape} size={100} />}
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
                  style={{ padding: '0.8rem 1rem', background: bg, color, border: `2px solid ${border}`, borderRadius: '12px', cursor: isAnswered ? 'default' : 'pointer', fontWeight: 'bold', fontSize: '1.1rem', textAlign: 'center', transition: 'all 0.2s' }}>
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
                  : (language === 'bm' ? `❌ Tidak betul. Jawapan: ${question.answer}` : `❌ Wrong. Answer: ${question.answer}`)}
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 'normal', opacity: 0.9 }}>
                {question.explanation_bm}
              </div>
            </div>
          )}
        </div>
      </div>
      <div style={{ flexShrink: 0, background: 'rgba(255,255,255,0.15)', borderTop: '2px solid rgba(255,255,255,0.2)', padding: '0.75rem 1rem', display: 'flex', gap: '0.75rem' }}>
        <button onClick={handleResetQuestion} style={{ flex: 1, padding: '0.75rem', background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
          <RefreshCw size={16} />
          {language === 'bm' ? 'Semula' : 'Reset'}
        </button>
        <button onClick={handleNext} disabled={!isAnswered}
          style={{ flex: 1, padding: '0.75rem', background: isAnswered ? 'white' : 'rgba(255,255,255,0.3)', color: isAnswered ? '#4338CA' : 'rgba(255,255,255,0.5)', border: 'none', borderRadius: '12px', cursor: isAnswered ? 'pointer' : 'not-allowed', fontWeight: 'bold', fontSize: '1rem', boxShadow: isAnswered ? '0 4px 0 rgba(67,56,202,0.3)' : 'none', transition: 'all 0.2s' }}>
          {qIdx < TOTAL_QUESTIONS - 1
            ? (language === 'bm' ? 'Soalan Seterusnya →' : 'Next Question →')
            : (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')}
        </button>
      </div>
    </div>
  );
}
