import React, { useState, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../utils/soundManager';
import BackButton from '../BackButton';

// Age 4-6 Math — Match numeral to dot quantity (1–10)
// Dots are laid out like dice/domino patterns for instant recognition

const DOT_LAYOUTS = {
  1:  [[50, 50]],
  2:  [[30, 50], [70, 50]],
  3:  [[25, 50], [50, 50], [75, 50]],
  4:  [[30, 30], [70, 30], [30, 70], [70, 70]],
  5:  [[30, 30], [70, 30], [50, 50], [30, 70], [70, 70]],
  6:  [[30, 25], [70, 25], [30, 50], [70, 50], [30, 75], [70, 75]],
  7:  [[30, 20], [70, 20], [30, 45], [70, 45], [50, 33], [30, 70], [70, 70]],
  8:  [[25, 20], [50, 20], [75, 20], [25, 50], [75, 50], [25, 80], [50, 80], [75, 80]],
  9:  [[25, 20], [50, 20], [75, 20], [25, 50], [50, 50], [75, 50], [25, 80], [50, 80], [75, 80]],
  10: [[20, 20], [45, 20], [70, 20], [20, 50], [45, 50], [70, 50], [20, 80], [45, 80], [70, 80], [95, 50]],
};

const DOT_COLORS = ['#FF6B9D', '#FF9800', '#58CC02', '#2196F3', '#9C27B0', '#00BCD4', '#F44336', '#673AB7', '#4CAF50', '#FF5722'];

const DotCard = ({ count, size = 100, dotColor = '#333', bg = '#FFF', border = '#58CC02' }) => {
  const dots = DOT_LAYOUTS[count] || [];
  const r = size <= 60 ? 5 : 7;
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ background: bg, borderRadius: '12px', border: `2px solid ${border}` }}>
      {dots.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill={dotColor} />
      ))}
    </svg>
  );
};

const makeOptions = (correct) => {
  const opts = new Set([correct]);
  while (opts.size < 4) {
    const val = Math.floor(Math.random() * 10) + 1;
    opts.add(val);
  }
  return [...opts].sort(() => Math.random() - 0.5);
};

// 10 rounds: show dot card → pick numeral
const generateRounds = () =>
  Array.from({ length: 10 }, (_, i) => {
    const count   = (i % 10) + 1; // cover 1-10 once each
    const options = makeOptions(count);
    return { count, options };
  }).sort(() => Math.random() - 0.5);

export default function NumberMatch({ onBack, language = 'bm' }) {
  const [rounds, setRounds]             = useState(generateRounds);
  const [roundIdx, setRoundIdx]         = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered]     = useState(false);
  const [score, setScore]               = useState(0);
  const [isDone, setIsDone]             = useState(false);

  const round     = rounds[roundIdx];
  const isCorrect = selectedAnswer === round.count;
  const dotColor  = DOT_COLORS[(round.count - 1) % DOT_COLORS.length];

  const handleSelect = useCallback((num) => {
    if (isAnswered) return;
    playHoverSound();
    setSelectedAnswer(num);
    if (num === round.count) {
      playSound('correct');
      setScore(s => s + 10);
      confetti({ particleCount: 55, spread: 60 });
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
    if (num === round.count)     return { bg: '#4CAF50', border: '#388E3C', color: 'white' };
    if (num === selectedAnswer)  return { bg: '#FF6B6B', border: '#D32F2F', color: 'white' };
    return { bg: '#F5F5F5', border: '#DDD', color: '#AAA' };
  };

  if (isDone) {
    return (
      <div style={{ minHeight: '100%', background: '#E6FFD4', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🔢</div>
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
            {language === 'bm' ? 'Padankan Nombor!' : 'Number Match!'}
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Padankan titik dengan nombor yang betul' : 'Match the dots to the correct number'}
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

        {/* Dot card */}
        <div style={{ background: '#FFF', borderRadius: '16px', border: '2px solid #58CC02', padding: '1.5rem', marginBottom: '1.25rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ fontSize: '0.82rem', color: '#888', marginBottom: '0.85rem', fontWeight: 600 }}>
            {language === 'bm' ? 'Pilih nombor yang sepadan:' : 'Pick the matching number:'}
          </p>
          <DotCard
            count={round.count}
            size={140}
            dotColor={isAnswered ? dotColor : '#58CC02'}
            bg="#F9FFF4"
            border="#58CC02"
          />
          {isAnswered && (
            <p style={{ marginTop: '0.75rem', fontSize: '2rem', fontWeight: 900, color: dotColor }}>
              = {round.count}
            </p>
          )}
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
              ? (language === 'bm' ? `✅ Betul! ${round.count} titik = ${round.count}` : `✅ Correct! ${round.count} dots = ${round.count}`)
              : (language === 'bm' ? `❌ Salah. Jawapan: ${round.count}` : `❌ Wrong! Answer: ${round.count}`)}
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
