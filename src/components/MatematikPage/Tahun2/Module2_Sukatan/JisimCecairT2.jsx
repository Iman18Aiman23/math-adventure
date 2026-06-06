import React, { useState, useCallback, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../../../utils/soundManager';
import BackButton from '../../../BackButton';

function MeasuringJug({ level, max = 1000, color = '#6366F1' }) {
  const pct = Math.min(level / max, 1);
  const jugW = 80;
  const jugH = 160;
  const neckW = 40;
  const neckH = 20;
  const liquidH = (jugH - 8) * pct;
  return (
    <svg viewBox="0 0 120 210" width="120" height="210">
      <path d={`M${(120 - neckW) / 2},0 L${(120 - neckW) / 2},${neckH} L${(120 - jugW) / 2},${neckH + 10} L${(120 - jugW) / 2},${neckH + jugH} Q60,${neckH + jugH + 12} ${(120 + jugW) / 2},${neckH + jugH} L${(120 + jugW) / 2},${neckH + 10} L${(120 + neckW) / 2},${neckH} Z`} fill="none" stroke="#999" strokeWidth="2" />
      <rect x={(120 - jugW) / 2 + 4} y={neckH + jugH - liquidH - 4} width={jugW - 8} height={liquidH} rx={2} fill={color} opacity="0.6" />
      <rect x={(120 - jugW) / 2 + 4} y={neckH + jugH - liquidH - 4} width={jugW - 8} height={6} rx={2} fill={color} opacity="0.9" />
      {[0, 0.25, 0.5, 0.75, 1].map(frac => {
        const y = neckH + jugH - (jugH - 8) * frac - 4;
        return (
          <g key={frac}>
            <line x1={(120 + jugW) / 2 - 12} y1={y} x2={(120 + jugW) / 2} y2={y} stroke="#999" strokeWidth="1.5" />
            <text x={(120 + jugW) / 2 - 16} y={y + 4} textAnchor="end" fontSize="9" fill="#666" fontFamily="Fredoka">
              {Math.round(frac * max)}{max > 1000 ? 'l' : 'ml'}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function BalanceScale({ mass, unit = 'g' }) {
  const objSize = Math.min(24 + mass * 0.04, 44);
  const weights = [];
  if (mass >= 1000) {
    weights.push(1000);
  } else {
    let rem = mass;
    [500, 200, 100, 50].forEach(w => {
      while (rem >= w) { weights.push(w); rem -= w; }
    });
  }
  return (
    <svg viewBox="0 0 240 180" width="240" height="180">
      <line x1="120" y1="20" x2="120" y2="80" stroke="#8B4513" strokeWidth="4" />
      <line x1="30" y1="80" x2="210" y2="80" stroke="#8B4513" strokeWidth="5" />
      <line x1="30" y1="80" x2="30" y2="110" stroke="#8B4513" strokeWidth="3" />
      <line x1="210" y1="80" x2="210" y2="110" stroke="#8B4513" strokeWidth="3" />
      <path d="M10,110 Q30,130 50,110" fill="none" stroke="#8B4513" strokeWidth="3" />
      <path d="M190,110 Q210,130 230,110" fill="none" stroke="#8B4513" strokeWidth="3" />
      <rect x={20 - objSize / 2} y={100 - objSize} width={objSize} height={objSize} rx={4} fill="#FF9800" opacity="0.8" />
      <text x={20} y={100 - objSize - 6} textAnchor="middle" fontSize="10" fill="#666" fontFamily="Fredoka">?</text>
      {weights.map((w, i) => (
        <rect key={i} x={200 - 10 * weights.length + i * 20} y={108 - 16 * (w / 100)} width={14} height={16 * (w / 100)} rx={2} fill="#6366F1" />
      ))}
      <text x={210} y={128} textAnchor="middle" fontSize="9" fill="#666" fontFamily="Fredoka">{unit}</text>
    </svg>
  );
}

const OBJECTS = [
  { bm: 'epal', eng: 'apple', mass: 200 },
  { bm: 'buku', eng: 'book', mass: 300 },
  { bm: 'batu', eng: 'stone', mass: 500 },
  { bm: 'tembikai', eng: 'watermelon', mass: 1000 },
  { bm: 'pisang', eng: 'banana', mass: 150 },
  { bm: 'ayam', eng: 'chicken', mass: 1200 },
];

const SHAPES_2D = [
  { id: 'segi-empat-sama', bm: 'Segi Empat Sama', eng: 'Square', sides: 4, corners: 4, path: 'M40,20 L80,20 L80,60 L40,60 Z' },
  { id: 'segi-tiga', bm: 'Segi Tiga', eng: 'Triangle', sides: 3, corners: 3, path: 'M60,20 L90,70 L30,70 Z' },
  { id: 'segi-empat-tepat', bm: 'Segi Empat Tepat', eng: 'Rectangle', sides: 4, corners: 4, path: 'M30,25 L90,25 L90,65 L30,65 Z' },
  { id: 'bulatan', bm: 'Bulatan', eng: 'Circle', sides: 0, corners: 0, path: 'M60,20 A25,25 0 1,1 60,69.9 A25,25 0 1,1 60,20' },
  { id: 'pentagon', bm: 'Pentagon', eng: 'Pentagon', sides: 5, corners: 5, path: 'M60,15 L85,35 L78,65 L42,65 L35,35 Z' },
  { id: 'heksagon', bm: 'Heksagon', eng: 'Hexagon', sides: 6, corners: 6, path: 'M60,15 L85,25 L85,55 L60,65 L35,55 L35,25 Z' },
];

const SHAPES_3D = [
  { id: 'kubus', bm: 'Kubus', eng: 'Cube', vertices: 8, faces: 6, edges: 12 },
  { id: 'kuboid', bm: 'Kuboid', eng: 'Cuboid', vertices: 8, faces: 6, edges: 12 },
  { id: 'sfera', bm: 'Sfera', eng: 'Sphere', vertices: 0, faces: 1, edges: 0 },
  { id: 'kon', bm: 'Kon', eng: 'Cone', vertices: 1, faces: 2, edges: 1 },
  { id: 'silinder', bm: 'Silinder', eng: 'Cylinder', vertices: 0, faces: 3, edges: 2 },
];

function Shape2DSvg({ shape, size = 120, color = '#6366F1' }) {
  const paths = {
    'segi-empat-sama': 'M20,20 L100,20 L100,100 L20,100 Z',
    'segi-tiga': 'M60,15 L110,100 L10,100 Z',
    'segi-empat-tepat': 'M15,30 L105,30 L105,100 L15,100 Z',
    'bulatan': 'M60,15 A45,45 0 1,1 60,104 A45,45 0 1,1 60,15',
    'pentagon': 'M60,12 L98,38 L86,80 L34,80 L22,38 Z',
    'heksagon': 'M60,15 L95,28 L95,72 L60,85 L25,72 L25,28 Z',
  };
  return (
    <svg viewBox="0 0 120 120" width={size} height={size}>
      <path d={paths[shape.id]} fill={color} opacity="0.2" stroke={color} strokeWidth="3" strokeLinejoin="round" />
      <text x="60" y="115" textAnchor="middle" fontSize="11" fill="#666" fontFamily="Fredoka" fontWeight="600">
        {shape.bm}
      </text>
    </svg>
  );
}

function Shape3DSvg({ shape, size = 120, color = '#6366F1' }) {
  if (shape.id === 'kubus') {
    return (
      <svg viewBox="0 0 120 120" width={size} height={size}>
        <polygon points="60,10 105,35 105,90 60,115 15,90 15,35" fill={color} opacity="0.15" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
        <polygon points="60,10 105,35 60,60 15,35" fill={color} opacity="0.3" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
        <polygon points="15,35 60,60 60,115 15,90" fill={color} opacity="0.2" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
    );
  }
  if (shape.id === 'kuboid') {
    return (
      <svg viewBox="0 0 120 120" width={size} height={size}>
        <polygon points="50,15 105,30 105,100 50,115 10,100 10,35" fill={color} opacity="0.15" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
        <polygon points="50,15 105,30 50,55 10,35" fill={color} opacity="0.3" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
        <polygon points="10,35 50,55 50,115 10,100" fill={color} opacity="0.2" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
    );
  }
  if (shape.id === 'sfera') {
    return (
      <svg viewBox="0 0 120 120" width={size} height={size}>
        <ellipse cx="60" cy="60" rx="48" ry="48" fill={color} opacity="0.15" stroke={color} strokeWidth="2.5" />
        <ellipse cx="60" cy="60" rx="48" ry="18" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
        <ellipse cx="60" cy="60" rx="18" ry="48" fill="none" stroke={color} strokeWidth="1" opacity="0.2" />
        <ellipse cx="74" cy="48" rx="12" ry="10" fill={color} opacity="0.15" />
      </svg>
    );
  }
  if (shape.id === 'kon') {
    return (
      <svg viewBox="0 0 120 120" width={size} height={size}>
        <ellipse cx="60" cy="95" rx="40" ry="12" fill={color} opacity="0.2" stroke={color} strokeWidth="2" />
        <path d="M60,10 L20,95 Q60,108 100,95 Z" fill={color} opacity="0.15" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M60,10 L20,95 Q60,108 100,95 Z" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      </svg>
    );
  }
  if (shape.id === 'silinder') {
    return (
      <svg viewBox="0 0 120 120" width={size} height={size}>
        <ellipse cx="60" cy="20" rx="35" ry="10" fill={color} opacity="0.3" stroke={color} strokeWidth="2" />
        <rect x="25" y="20" width="70" height="70" fill={color} opacity="0.1" stroke={color} strokeWidth="2" />
        <ellipse cx="60" cy="90" rx="35" ry="10" fill={color} opacity="0.2" stroke={color} strokeWidth="2" />
        <line x1="25" y1="20" x2="25" y2="90" stroke={color} strokeWidth="2" />
        <line x1="95" y1="20" x2="95" y2="90" stroke={color} strokeWidth="2" />
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
  if (mechanic === 'timbang') {
    const obj = OBJECTS[randInt(0, OBJECTS.length - 1)];
    const mass = obj.mass;
    const display = mass >= 1000 ? `${mass / 1000} kg` : `${mass} g`;
    const distractors = [
      mass >= 1000 ? `${(mass / 1000 + 0.5).toFixed(1)} kg` : `${mass + 100} g`,
      mass >= 1000 ? `${(mass / 1000 - 0.3).toFixed(1)} kg` : `${mass - 50} g`,
      mass >= 1000 ? `${(mass / 1000 + 0.2).toFixed(1)} kg` : `${mass + 200} g`,
    ];
    const options = shuffle([display, ...distractors]);
    return {
      type: 'timbang',
      question_bm: `Berapakah jisim ${obj.bm} ini?`,
      question_eng: `What is the mass of this ${obj.eng}?`,
      mass,
      obj,
      display,
      options,
      answer: display,
      explanation_bm: `Jisim ${obj.bm} ialah ${display}.`,
    };
  } else if (mechanic === 'sukat') {
    const volumes = [100, 200, 250, 300, 400, 500, 600, 700, 750, 800, 900, 1000];
    const vol = volumes[randInt(0, volumes.length - 1)];
    const display = vol >= 1000 ? `${vol / 1000} l` : `${vol} ml`;
    const distractors = [
      vol >= 1000 ? `${(vol / 1000 - 0.25).toFixed(2)} l` : `${vol + 100} ml`,
      vol >= 1000 ? `${(vol / 1000 + 0.5).toFixed(1)} l` : `${vol - 50} ml`,
      vol >= 1000 ? `${(vol / 1000 + 0.1).toFixed(1)} l` : `${vol + 200} ml`,
    ];
    const items = [
      { bm: 'air', eng: 'water' },
      { bm: 'susu', eng: 'milk' },
      { bm: 'jus', eng: 'juice' },
      { bm: 'minyak', eng: 'oil' },
    ];
    const item = items[randInt(0, items.length - 1)];
    const options = shuffle([display, ...distractors]);
    return {
      type: 'sukat',
      question_bm: `Berapakah isi padu ${item.bm} ini?`,
      question_eng: `What is the volume of this ${item.eng}?`,
      vol,
      item,
      display,
      options,
      answer: display,
      explanation_bm: `Isi padu ${item.bm} ialah ${display}.`,
    };
  } else {
    const pairs = [
      { a: 200, b: 300, unit: 'ml' },
      { a: 250, b: 500, unit: 'ml' },
      { a: 150, b: 250, unit: 'ml' },
      { a: 400, b: 350, unit: 'ml' },
      { a: 500, b: 500, unit: 'ml' },
      { a: 300, b: 400, unit: 'ml' },
      { a: 100, b: 200, unit: 'g' },
      { a: 250, b: 350, unit: 'g' },
      { a: 150, b: 300, unit: 'g' },
      { a: 400, b: 400, unit: 'g' },
      { a: 600, b: 200, unit: 'g' },
      { a: 450, b: 250, unit: 'g' },
    ];
    const pair = pairs[randInt(0, pairs.length - 1)];
    const total = pair.a + pair.b;
    const displayA = pair.a >= 1000 ? `${pair.a / 1000} kg` : `${pair.a} ${pair.unit}`;
    const displayB = pair.b >= 1000 ? `${pair.b / 1000} kg` : `${pair.b} ${pair.unit}`;
    const displayTotal = total >= 1000 ? `${total / 1000} ${pair.unit === 'ml' ? 'l' : 'kg'}` : `${total} ${pair.unit}`;
    const itemsA = [
      { bm: 'gula', eng: 'sugar' },
      { bm: 'tepung', eng: 'flour' },
      { bm: 'beras', eng: 'rice' },
      { bm: 'kopi', eng: 'coffee' },
    ];
    const itemsB = [
      { bm: 'susu', eng: 'milk' },
      { bm: 'air', eng: 'water' },
      { bm: 'jus', eng: 'juice' },
      { bm: 'minyak', eng: 'oil' },
    ];
    const isMass = pair.unit === 'g';
    const itemA = itemsA[randInt(0, itemsA.length - 1)];
    const itemB = itemsB[randInt(0, itemsB.length - 1)];
    const distractors = [
      total >= 1000 ? `${(total / 1000 + 0.2).toFixed(1)} ${pair.unit === 'ml' ? 'l' : 'kg'}` : `${total + 100} ${pair.unit}`,
      total >= 1000 ? `${(total / 1000 - 0.1).toFixed(1)} ${pair.unit === 'ml' ? 'l' : 'kg'}` : `${total - 50} ${pair.unit}`,
      total >= 1000 ? `${(total / 1000 + 0.3).toFixed(1)} ${pair.unit === 'ml' ? 'l' : 'kg'}` : `${total + 150} ${pair.unit}`,
    ];
    const options = shuffle([displayTotal, ...distractors]);
    return {
      type: 'tambah',
      question_bm: isMass
        ? `${itemA.bm}: ${displayA}, ${itemB.bm}: ${displayB}. Jumlah jisim?`
        : `${itemA.bm}: ${displayA}, ${itemB.bm}: ${displayB}. Jumlah isi padu?`,
      question_eng: isMass
        ? `${itemA.eng}: ${displayA}, ${itemB.eng}: ${displayB}. Total mass?`
        : `${itemA.eng}: ${displayA}, ${itemB.eng}: ${displayB}. Total volume?`,
      displayA,
      displayB,
      displayTotal,
      options,
      answer: displayTotal,
      explanation_bm: `${displayA} + ${displayB} = ${displayTotal}`,
    };
  }
}

const TOTAL_QUESTIONS = 12;
const QUESTIONS_PER_MECHANIC = 4;

export default function JisimCecairT2({ onBack, language = 'bm' }) {
  const [qIdx, setQIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [mechanicStats, setMechanicStats] = useState({
    timbang: { correct: 0, total: 0 },
    sukat: { correct: 0, total: 0 },
    tambah: { correct: 0, total: 0 },
  });

  const questions = useMemo(() => {
    const qs = [];
    ['timbang', 'sukat', 'tambah'].forEach(mechanic => {
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
    setMechanicStats({ timbang: { correct: 0, total: 0 }, sukat: { correct: 0, total: 0 }, tambah: { correct: 0, total: 0 } });
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
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>⚖️</div>
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
          {['timbang', 'sukat', 'tambah'].map(type => {
            const label = { timbang: '⚖️ Timbang', sukat: '📏 Sukat', tambah: '➕ Tambah' }[type];
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
            {language === 'bm' ? 'Jisim & Isi Padu Cecair' : 'Mass & Liquid Volume'}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Belajar sukatan berat dan isi padu' : 'Learn mass and volume measurement'}
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
            {question.type === 'timbang' && '⚖️ Timbang'}
            {question.type === 'sukat' && '📏 Sukat'}
            {question.type === 'tambah' && '➕ Tambah'}
          </div>
          {question.type === 'timbang' && (
            <div style={{ background: '#EEF2FF', borderRadius: '12px', padding: '1.5rem 1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <BalanceScale mass={question.mass} />
            </div>
          )}
          {question.type === 'sukat' && (
            <div style={{ background: '#EEF2FF', borderRadius: '12px', padding: '1.5rem 1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <MeasuringJug level={question.vol} max={1000} />
            </div>
          )}
          {question.type === 'tambah' && (
            <div style={{ background: '#EEF2FF', borderRadius: '12px', padding: '1.5rem 1rem', marginBottom: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#6366F1', marginBottom: '0.3rem' }}>{question.displayA}</div>
              <div style={{ fontSize: '1.4rem', color: '#888' }}>+</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#6366F1', marginBottom: '0.3rem' }}>{question.displayB}</div>
              <div style={{ borderBottom: '3px dashed #6366F1', width: '60%', margin: '0.5rem auto' }} />
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#A855F7' }}>?</div>
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
