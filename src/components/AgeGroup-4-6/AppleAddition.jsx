import React, { useState, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../utils/soundManager';
import BackButton from '../BackButton';

// Age 4-6 Math — Simple addition up to 10 with visual fruit counters
const FRUIT_PAIRS = [
  { emoji: '🍎', name: { bm: 'epal', eng: 'apples' } },
  { emoji: '🍊', name: { bm: 'oren', eng: 'oranges' } },
  { emoji: '🍌', name: { bm: 'pisang', eng: 'bananas' } },
  { emoji: '🍓', name: { bm: 'strawberi', eng: 'strawberries' } },
  { emoji: '🍇', name: { bm: 'anggur', eng: 'grapes' } },
];

// All valid addition pairs where a + b <= 10, a >= 1, b >= 1
const ALL_PAIRS = [];
for (let a = 1; a <= 9; a++) {
  for (let b = 1; b <= 10 - a; b++) {
    ALL_PAIRS.push([a, b]);
  }
}

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const makeOptions = (answer) => {
  const opts = new Set([answer]);
  while (opts.size < 4) {
    const delta = Math.floor(Math.random() * 4) + 1;
    const sign  = Math.random() < 0.5 ? 1 : -1;
    const val   = answer + sign * delta;
    if (val >= 2 && val <= 10) opts.add(val);
  }
  for (let v = 2; opts.size < 4; v++) {
    if (!opts.has(v)) opts.add(v);
  }
  return [...opts].sort(() => Math.random() - 0.5);
};

const generateRounds = () => {
  const pairs = shuffle(ALL_PAIRS).slice(0, 10);
  return pairs.map(([a, b]) => {
    const fruit   = FRUIT_PAIRS[Math.floor(Math.random() * FRUIT_PAIRS.length)];
    const answer  = a + b;
    return { a, b, answer, fruit, options: makeOptions(answer) };
  });
};

export default function AppleAddition({ onBack, language = 'bm' }) {
  const [rounds, setRounds]             = useState(generateRounds);
  const [roundIdx, setRoundIdx]         = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered]     = useState(false);
  const [score, setScore]               = useState(0);
  const [isDone, setIsDone]             = useState(false);

  const round     = rounds[roundIdx];
  const isCorrect = selectedAnswer === round.answer;

  const handleSelect = useCallback((num) => {
    if (isAnswered) return;
    playHoverSound();
    setSelectedAnswer(num);
    if (num === round.answer) {
      playSound('correct');
      setScore(s => s + 10);
      confetti({ particleCount: 60, spread: 65 });
    } else {
      playSound('incorrect');
    }
    setIsAnswered(true);
  }, [isAnswered, round.answer]);

  const handleNext = useCallback(() => {
    if (roundIdx < rounds.length - 1) {
      setRoundIdx(i => i + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      playSound('levelup');
      confetti({ particleCount: 120, spread: 80 });
      setIsDone(true);
    }
  }, [roundIdx, rounds.length]);

  const handleReset = useCallback(() => {
    setRounds(generateRounds());
    setRoundIdx(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsDone(false);
  }, []);

  const getOptionStyle = (num) => {
    if (!isAnswered) return { bg: '#FFF', border: '#58CC02', color: '#333' };
    if (num === round.answer)    return { bg: '#4CAF50', border: '#388E3C', color: 'white' };
    if (num === selectedAnswer)  return { bg: '#FF6B6B', border: '#D32F2F', color: 'white' };
    return { bg: '#F5F5F5', border: '#DDD', color: '#AAA' };
  };

  if (isDone) {
    return (
      <div style={{ minHeight: '100%', background: '#E6FFD4', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🍎</div>
        <h2 style={{ color: '#58CC02', fontSize: '2rem', marginBottom: '0.5rem' }}>
          {language === 'bm' ? 'Tahniah!' : 'Well Done!'}
        </h2>
        <p style={{ fontSize: '1.4rem', color: '#555', marginBottom: '2rem' }}>
          {language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/{rounds.length * 10}
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

  const { a, b, answer, fruit } = round;
  const fruitName = language === 'bm' ? fruit.name.bm : fruit.name.eng;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#E6FFD4', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />

      {/* Header */}
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <h1 style={{ color: '#58CC02', marginBottom: '0.25rem', fontSize: '1.6rem' }}>
            {language === 'bm' ? 'Tambah Buah!' : 'Fruit Addition!'}
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Tambahkan buah-buahan dan cari jumlahnya' : 'Add the fruits together and find the total'}
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: 'rgba(88,204,2,0.12)', borderRadius: '10px' }}>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Pusingan' : 'Round'} {roundIdx + 1}/{rounds.length}
          </span>
          <span style={{ fontWeight: 'bold', color: '#58CC02' }}>⭐ {score}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>

        {/* Addition display */}
        <div style={{ background: '#FFF', borderRadius: '16px', border: '2px solid #58CC02', padding: '1.25rem', marginBottom: '1.25rem', textAlign: 'center' }}>
          {/* Equation row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '2rem', fontWeight: 900, color: '#333' }}>{a}</span>
            <span style={{ fontSize: '2rem', color: '#FF9800', fontWeight: 900 }}>+</span>
            <span style={{ fontSize: '2rem', fontWeight: 900, color: '#333' }}>{b}</span>
            <span style={{ fontSize: '2rem', color: '#888', fontWeight: 900 }}>=</span>
            <span style={{ fontSize: '2rem', fontWeight: 900, color: isAnswered ? '#58CC02' : '#CCC', minWidth: '40px' }}>
              {isAnswered ? answer : '?'}
            </span>
          </div>

          {/* Visual fruit groups */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {/* Group A */}
            <div style={{ background: 'rgba(88,204,2,0.08)', borderRadius: '10px', padding: '0.5rem 0.75rem', border: '1.5px solid rgba(88,204,2,0.3)' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px', maxWidth: '120px', justifyContent: 'center' }}>
                {Array.from({ length: a }, (_, i) => (
                  <span key={i} style={{ fontSize: a <= 5 ? '1.8rem' : '1.3rem' }}>{fruit.emoji}</span>
                ))}
              </div>
            </div>

            <span style={{ fontSize: '1.8rem', color: '#FF9800', fontWeight: 900 }}>+</span>

            {/* Group B */}
            <div style={{ background: 'rgba(255,152,0,0.08)', borderRadius: '10px', padding: '0.5rem 0.75rem', border: '1.5px solid rgba(255,152,0,0.3)' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px', maxWidth: '120px', justifyContent: 'center' }}>
                {Array.from({ length: b }, (_, i) => (
                  <span key={i} style={{ fontSize: b <= 5 ? '1.8rem' : '1.3rem' }}>{fruit.emoji}</span>
                ))}
              </div>
            </div>
          </div>

          <p style={{ fontSize: '0.82rem', color: '#888', marginTop: '0.65rem' }}>
            {language === 'bm'
              ? `${a} ${fruitName} + ${b} ${fruitName} = ?`
              : `${a} ${fruitName} + ${b} ${fruitName} = ?`}
          </p>
        </div>

        {/* Number choices — 2×2 grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
          {round.options.map((num, idx) => {
            const { bg, border, color } = getOptionStyle(num);
            return (
              <button key={idx} onClick={() => handleSelect(num)} disabled={isAnswered}
                style={{ padding: '1.1rem', background: bg, color, border: `2px solid ${border}`, borderRadius: '12px', cursor: isAnswered ? 'default' : 'pointer', fontWeight: 'bold', fontSize: '1.8rem', transition: 'all 0.2s', textAlign: 'center' }}>
                {num}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {isAnswered && (
          <div style={{ padding: '0.85rem 1rem', background: isCorrect ? '#D4EDDA' : '#F8D7DA', color: isCorrect ? '#155724' : '#721C24', borderRadius: '8px', fontWeight: 'bold', textAlign: 'center' }}>
            {isCorrect
              ? (language === 'bm' ? `✅ Betul! ${a} + ${b} = ${answer}` : `✅ Correct! ${a} + ${b} = ${answer}`)
              : (language === 'bm' ? `❌ Salah. ${a} + ${b} = ${answer}` : `❌ Wrong! ${a} + ${b} = ${answer}`)}
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
          {roundIdx < rounds.length - 1
            ? (language === 'bm' ? 'Seterusnya →' : 'Next →')
            : (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')}
        </button>
      </div>
    </div>
  );
}
