import React, { useState, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../utils/soundManager';
import BackButton from '../BackButton';

// Age 4-6 Math — Count objects 1 to 20
const EMOJIS = ['⭐', '🍎', '🐱', '🌸', '🦋', '🐶', '🍭', '🎈', '🐸', '🌟'];

const makeOptions = (count) => {
  const opts = new Set([count]);
  let attempts = 0;
  while (opts.size < 4 && attempts < 40) {
    const delta = Math.floor(Math.random() * 5) + 1;
    const sign  = Math.random() < 0.5 ? 1 : -1;
    const val   = count + sign * delta;
    if (val >= 1 && val <= 20) opts.add(val);
    attempts++;
  }
  // Fill edge cases
  for (let v = 1; opts.size < 4; v++) {
    if (!opts.has(v)) opts.add(v);
  }
  return [...opts].sort(() => Math.random() - 0.5);
};

const generateRounds = () =>
  Array.from({ length: 10 }, () => {
    const count = Math.floor(Math.random() * 20) + 1;
    const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    return { count, emoji, options: makeOptions(count) };
  });

export default function CountingStars({ onBack, language = 'bm' }) {
  const [rounds, setRounds]             = useState(generateRounds);
  const [roundIdx, setRoundIdx]         = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered]     = useState(false);
  const [score, setScore]               = useState(0);
  const [isDone, setIsDone]             = useState(false);

  const round     = rounds[roundIdx];
  const isCorrect = selectedAnswer === round.count;
  const starSize  = round.count <= 5 ? '2.5rem' : round.count <= 10 ? '2rem' : round.count <= 15 ? '1.6rem' : '1.3rem';

  const handleSelect = useCallback((num) => {
    if (isAnswered) return;
    playHoverSound();
    setSelectedAnswer(num);
    if (num === round.count) {
      playSound('correct');
      setScore(s => s + 10);
      confetti({ particleCount: 60, spread: 60 });
    } else {
      playSound('incorrect');
    }
    setIsAnswered(true);
  }, [isAnswered, round.count]);

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
    if (num === round.count)      return { bg: '#4CAF50', border: '#388E3C', color: 'white' };
    if (num === selectedAnswer)   return { bg: '#FF6B6B', border: '#D32F2F', color: 'white' };
    return { bg: '#F5F5F5', border: '#DDD', color: '#AAA' };
  };

  if (isDone) {
    return (
      <div style={{ minHeight: '100%', background: '#E6FFD4', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>⭐</div>
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

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#E6FFD4', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />

      {/* Header */}
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <h1 style={{ color: '#58CC02', marginBottom: '0.25rem', fontSize: '1.6rem' }}>
            {language === 'bm' ? 'Kira Bintang!' : 'Counting Stars!'}
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Kira benda dan pilih nombor yang betul' : 'Count the objects and pick the right number'}
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

        {/* Object display card */}
        <div style={{ background: '#FFF', borderRadius: '16px', border: '2px solid #58CC02', padding: '1.25rem', marginBottom: '1.25rem', textAlign: 'center', minHeight: '150px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ fontSize: '0.82rem', color: '#888', marginBottom: '0.75rem', fontWeight: 600 }}>
            {language === 'bm' ? 'Berapa banyak?' : 'How many?'}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '3px', maxWidth: '300px' }}>
            {Array.from({ length: round.count }, (_, i) => (
              <span key={i} style={{ fontSize: starSize, lineHeight: 1.2 }}>{round.emoji}</span>
            ))}
          </div>
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
              ? (language === 'bm' ? `✅ Betul! Ada ${round.count} ${round.emoji}` : `✅ Correct! There are ${round.count}`)
              : (language === 'bm' ? `❌ Salah. Jawapan: ${round.count} ${round.emoji}` : `❌ Wrong! Answer: ${round.count}`)}
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
