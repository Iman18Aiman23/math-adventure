import React, { useState, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../utils/soundManager';
import BackButton from '../BackButton';

// Age 4-6 Math — Find the missing number in a sequence
// Sequences: consecutive 1-20, skip-count by 2s up to 20
const generateRounds = () => {
  const rounds = [];

  // 7 consecutive sequences
  for (let i = 0; i < 7; i++) {
    const start  = Math.floor(Math.random() * 16) + 1; // 1–16 so we get 5 terms ≤ 20
    const seq    = [start, start + 1, start + 2, start + 3, start + 4];
    const blankPos = Math.floor(Math.random() * 5);     // which position is blank
    const answer = seq[blankPos];
    const opts   = makeOptions(answer, 1, 20);
    rounds.push({ seq, blankPos, answer, opts, type: 'consecutive' });
  }

  // 3 skip-count by 2
  for (let i = 0; i < 3; i++) {
    const start   = (Math.floor(Math.random() * 5) + 1) * 2 - 1; // odd start so values go 1,3,5… or even 2,4,6…
    const isEven  = Math.random() < 0.5;
    const base    = isEven ? Math.floor(Math.random() * 5) * 2 + 2 : Math.floor(Math.random() * 5) * 2 + 1;
    const seq     = [base, base + 2, base + 4, base + 6, base + 8].filter(v => v <= 20);
    if (seq.length < 4) { i--; continue; }
    const limited = seq.slice(0, 5);
    const blankPos = Math.floor(Math.random() * limited.length);
    const answer   = limited[blankPos];
    const opts     = makeOptions(answer, 1, 20);
    rounds.push({ seq: limited, blankPos, answer, opts, type: 'skip2' });
  }

  return rounds.sort(() => Math.random() - 0.5);
};

const makeOptions = (answer, min, max) => {
  const opts = new Set([answer]);
  let attempts = 0;
  while (opts.size < 4 && attempts < 40) {
    const delta = Math.floor(Math.random() * 4) + 1;
    const sign  = Math.random() < 0.5 ? 1 : -1;
    const val   = answer + sign * delta;
    if (val >= min && val <= max) opts.add(val);
    attempts++;
  }
  for (let v = min; opts.size < 4; v++) {
    if (!opts.has(v)) opts.add(v);
  }
  return [...opts].sort(() => Math.random() - 0.5);
};

export default function MissingNumber({ onBack, language = 'bm' }) {
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
      confetti({ particleCount: 55, spread: 60 });
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
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🔍</div>
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
            {language === 'bm' ? 'Nombor Hilang!' : 'Missing Number!'}
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Cari nombor yang hilang dalam turutan' : 'Find the missing number in the sequence'}
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: 'rgba(88,204,2,0.12)', borderRadius: '10px' }}>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Soalan' : 'Question'} {roundIdx + 1}/{rounds.length}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {round.type === 'skip2' && (
              <span style={{ fontSize: '0.7rem', background: '#E3F2FD', color: '#1565C0', padding: '0.15rem 0.5rem', borderRadius: '6px', fontWeight: 700 }}>
                {language === 'bm' ? '+2' : 'by 2'}
              </span>
            )}
            <span style={{ fontWeight: 'bold', color: '#58CC02' }}>⭐ {score}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>

        {/* Sequence display */}
        <div style={{ background: '#FFF', borderRadius: '16px', border: '2px solid #58CC02', padding: '1.5rem', marginBottom: '1.25rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.82rem', color: '#888', marginBottom: '1rem', fontWeight: 600 }}>
            {language === 'bm' ? 'Nombor mana yang hilang?' : 'Which number is missing?'}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {round.seq.map((num, i) => {
              const isBlank = i === round.blankPos;
              const showFilled = isBlank && isAnswered;
              return (
                <div key={i} style={{
                  width: '52px', height: '52px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '10px',
                  border: isBlank ? '2px dashed #FF9800' : '2px solid #58CC02',
                  background: isBlank ? (showFilled ? '#FFF9C4' : '#FFF3E0') : 'rgba(88,204,2,0.08)',
                  fontWeight: 900,
                  fontSize: '1.3rem',
                  color: isBlank ? (showFilled ? '#FF9800' : 'transparent') : '#333',
                }}>
                  {isBlank ? (showFilled ? round.answer : '?') : num}
                </div>
              );
            })}
          </div>
          {round.type === 'skip2' && (
            <p style={{ fontSize: '0.78rem', color: '#888', marginTop: '0.75rem' }}>
              {language === 'bm' ? 'Turutan: tambah 2 setiap kali' : 'Pattern: add 2 each time'}
            </p>
          )}
        </div>

        {/* Number choices — 2×2 grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
          {round.opts.map((num, idx) => {
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
              ? (language === 'bm' ? `✅ Betul! Nombor yang hilang ialah ${round.answer}` : `✅ Correct! The missing number is ${round.answer}`)
              : (language === 'bm' ? `❌ Salah. Jawapan: ${round.answer}` : `❌ Wrong! Answer: ${round.answer}`)}
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
