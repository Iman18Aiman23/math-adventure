import React, { useState, useCallback } from 'react';
import { RefreshCw, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../utils/soundManager';
import BackButton from '../BackButton';

const EMOJIS = ['⭐', '🍎', '🐱', '🌸', '🦋', '🐶', '🍭', '🎈', '🐸', '🌟'];

const generateRounds = () =>
  Array.from({ length: 20 }, (_, i) => ({
    count: i + 1,
    emoji: EMOJIS[i % EMOJIS.length],
  }));

export default function BelajarMengira({ onBack, language = 'bm' }) {
  const [rounds, setRounds]       = useState(generateRounds);
  const [roundIdx, setRoundIdx]   = useState(0);
  const [clickedSet, setClickedSet] = useState(new Set());
  const [isDone, setIsDone]       = useState(false);

  const round      = rounds[roundIdx];
  const userCount  = clickedSet.size;
  const isComplete = userCount === round.count;
  const emojiSize  = round.count <= 5 ? '3rem' : round.count <= 10 ? '2.5rem' : round.count <= 15 ? '2rem' : '1.6rem';
  const cellSize   = round.count <= 5 ? '60px' : round.count <= 10 ? '52px' : round.count <= 15 ? '44px' : '38px';

  const handleEmojiClick = useCallback((idx) => {
    if (clickedSet.has(idx)) return;
    playHoverSound();
    const next = new Set(clickedSet);
    next.add(idx);
    setClickedSet(next);
    if (next.size === round.count) {
      playSound('correct');
      confetti({ particleCount: 70, spread: 65, origin: { y: 0.6 } });
    }
  }, [clickedSet, round.count]);

  const handleNext = useCallback(() => {
    if (roundIdx < rounds.length - 1) {
      setRoundIdx(i => i + 1);
      setClickedSet(new Set());
    } else {
      playSound('levelup');
      confetti({ particleCount: 130, spread: 90 });
      setIsDone(true);
    }
  }, [roundIdx, rounds.length]);

  const handleResetRound = useCallback(() => {
    setClickedSet(new Set());
  }, []);

  const handleFullReset = useCallback(() => {
    setRounds(generateRounds());
    setRoundIdx(0);
    setClickedSet(new Set());
    setIsDone(false);
  }, []);

  // ── Done screen ──────────────────────────────────────────────────────────
  if (isDone) {
    return (
      <div style={{ minHeight: '100%', background: '#E6FFD4', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🎉</div>
        <h2 style={{ color: '#58CC02', fontSize: '2rem', marginBottom: '0.5rem' }}>
          {language === 'bm' ? 'Tahniah!' : 'Well Done!'}
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: '2rem' }}>
          {language === 'bm' ? 'Anda sudah selesai belajar mengira!' : "You've finished counting practice!"}
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={handleFullReset} className="ee-btn ee-btn--muted" style={{ padding: '0.8rem 1.5rem' }}>
            {language === 'bm' ? 'Main Semula' : 'Play Again'}
          </button>
          <button onClick={onBack} className="ee-btn" style={{ padding: '0.8rem 1.5rem', '--btn-bg': '#58CC02', '--btn-shadow': '#46A302' }}>
            {language === 'bm' ? 'Kembali' : 'Back'}
          </button>
        </div>
      </div>
    );
  }

  // ── Main screen ──────────────────────────────────────────────────────────
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#E6FFD4', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />

      {/* Header */}
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <h1 style={{ color: '#58CC02', marginBottom: '0.25rem', fontSize: '1.6rem' }}>
            {language === 'bm' ? 'Belajar Mengira' : 'Learn to Count'}
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Belajar mengira dengan cara yang seronok!' : 'Learn to count in a fun way!'}
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: 'rgba(88,204,2,0.12)', borderRadius: '10px' }}>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>
            {roundIdx}/{rounds.length}
          </span>
          <button onClick={handleResetRound} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.82rem', fontWeight: 700 }}>
            <RefreshCw size={14} />
            {language === 'bm' ? 'Mula Semula' : 'Restart'}
          </button>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

        {/* Question label */}
        <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666', fontWeight: 700, margin: 0 }}>
          {language === 'bm' ? 'Tekan gambar untuk mengira.' : 'Tap the picture to count.'}
        </p>

        {/* Emoji tap grid */}
        <div style={{ background: '#fff', borderRadius: '20px', border: '2px solid #C8F0A8', padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '120px', overflow: 'hidden' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '6px', maxWidth: `calc(5 * ${cellSize} + 4 * 6px)` }}>
          {Array.from({ length: round.count }, (_, i) => {
            const clicked = clickedSet.has(i);
            return (
              <button
                key={i}
                type="button"
                onClick={() => handleEmojiClick(i)}
                disabled={clicked}
                style={{
                  width: cellSize,
                  height: cellSize,
                  flexShrink: 0,
                  fontSize: emojiSize,
                  lineHeight: 1,
                  background: 'none',
                  border: 'none',
                  cursor: clicked ? 'default' : 'pointer',
                  padding: 0,
                  borderRadius: '10px',
                  opacity: clicked ? 0.25 : 1,
                  filter: clicked ? 'grayscale(1)' : 'none',
                  transform: clicked ? 'scale(0.85)' : 'scale(1)',
                  transition: 'opacity 0.2s, transform 0.2s, filter 0.2s',
                  WebkitTapHighlightColor: 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden',
                }}
                onPointerDown={e => { if (!clicked) e.currentTarget.style.transform = 'scale(0.88)'; }}
                onPointerUp={e => { if (!clicked) e.currentTarget.style.transform = 'scale(1)'; }}
                onPointerLeave={e => { if (!clicked) e.currentTarget.style.transform = 'scale(1)'; }}
              >
                {round.emoji}
              </button>
            );
          })}
          </div>
        </div>

        {/* Counter button */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            minWidth: '110px',
            padding: '0.75rem 1.5rem',
            background: isComplete ? '#58CC02' : '#fff',
            border: `3px solid ${isComplete ? '#46A302' : '#C8F0A8'}`,
            borderBottom: `6px solid ${isComplete ? '#46A302' : '#A8D5A2'}`,
            borderRadius: '20px',
            textAlign: 'center',
            boxShadow: isComplete ? '0 6px 0 rgba(70,163,2,0.3)' : '0 4px 0 rgba(0,0,0,0.06)',
            transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
            transform: isComplete ? 'scale(1.08)' : 'scale(1)',
          }}>
            <div style={{ fontSize: '2.8rem', fontWeight: 900, lineHeight: 1, color: isComplete ? '#fff' : '#3C3C3C' }}>
              {userCount}
            </div>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: isComplete ? 'rgba(255,255,255,0.85)' : '#AFAFAF', marginTop: '2px' }}>
              {isComplete ? (language === 'bm' ? '✓ Betul!' : '✓ Correct!') : (language === 'bm' ? 'Kiraan' : 'Count')}
            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div style={{ flexShrink: 0, background: '#E6FFD4', borderTop: '2px solid rgba(88,204,2,0.25)', padding: '0.75rem 1rem' }}>
        <button onClick={handleNext}
          className="ee-btn"
          style={{ width: '100%', '--btn-bg': isComplete ? '#58CC02' : '#AFAFAF', '--btn-shadow': isComplete ? '#46A302' : '#909090' }}>
          {roundIdx < rounds.length - 1
            ? (language === 'bm' ? 'Seterusnya' : 'Next')
            : (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')}
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
