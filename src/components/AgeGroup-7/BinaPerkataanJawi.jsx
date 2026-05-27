import React, { useState, useCallback, useMemo } from 'react';
import { RefreshCw, Volume2, Undo2, Eraser } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../utils/soundManager';
import SpeechManager from '../../services/SpeechManager';
import { JAWI_TOPICS } from '../../utils/jawiWordsData';
import BackButton from '../BackButton';

// Age 7 Jawi — KSSR Pendidikan Islam Obj 10 (Membina tulisan jawi)
// Show emoji + rumi word; child taps Jawi letter tiles in correct RIGHT-TO-LEFT
// order to build the Jawi spelling. The core "membina" skill of Obj 10.
const JAWI_FONT = "'Traditional Arabic','Scheherazade New','Amiri','Noto Naskh Arabic',serif";
const ROUNDS = 8;

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

// Short, clean words only (3–4 Jawi letters) — appropriate for Tahun 1 building.
const WORD_POOL = JAWI_TOPICS.flatMap(t => t.words).filter((w) => {
  const len = Array.from(w.jawi).length;
  return len >= 3 && len <= 4;
});

const generateRounds = () => {
  return shuffle(WORD_POOL).slice(0, ROUNDS).map((word) => {
    const target = Array.from(word.jawi);
    const tiles = shuffle(target.map((char, i) => ({ id: i, char })));
    return { word, target, tiles };
  });
};

export default function BinaPerkataanJawi({ onBack, language = 'bm' }) {
  const [rounds, setRounds]       = useState(generateRounds);
  const [roundIdx, setRoundIdx]   = useState(0);
  const [placed, setPlaced]       = useState([]);          // [{ id, char }] in tap order
  const [wrongId, setWrongId]     = useState(null);        // tile flashed red on wrong tap
  const [score, setScore]         = useState(0);
  const [isDone, setIsDone]       = useState(false);

  const round      = rounds[roundIdx];
  const isComplete = placed.length === round.target.length;
  const usedIds    = useMemo(() => new Set(placed.map(p => p.id)), [placed]);

  const handleListen = useCallback(() => {
    playHoverSound();
    SpeechManager.speak(round.word.rumi, 'ms');
  }, [round.word.rumi]);

  const handleTileTap = useCallback((tile) => {
    if (isComplete || usedIds.has(tile.id)) return;
    const expected = round.target[placed.length];
    if (tile.char === expected) {
      playHoverSound();
      const next = [...placed, tile];
      setPlaced(next);
      if (next.length === round.target.length) {
        playSound('correct');
        setScore(s => s + 10);
        confetti({ particleCount: 60, spread: 65 });
        SpeechManager.speak(round.word.rumi, 'ms');
      }
    } else {
      playSound('incorrect');
      setWrongId(tile.id);
      setTimeout(() => setWrongId(null), 350);
    }
  }, [isComplete, usedIds, round.target, round.word.rumi, placed]);

  const handleUndo = useCallback(() => {
    if (isComplete) return;
    setPlaced(p => p.slice(0, -1));
  }, [isComplete]);

  const handleClear = useCallback(() => {
    if (isComplete) return;
    setPlaced([]);
  }, [isComplete]);

  const handleNext = useCallback(() => {
    if (!isComplete) return;
    if (roundIdx < rounds.length - 1) {
      setRoundIdx(i => i + 1);
      setPlaced([]);
    } else {
      playSound('levelup');
      confetti({ particleCount: 120, spread: 80 });
      setIsDone(true);
    }
  }, [isComplete, roundIdx, rounds.length]);

  const handleReset = useCallback(() => {
    setRounds(generateRounds());
    setRoundIdx(0);
    setPlaced([]);
    setScore(0);
    setIsDone(false);
  }, []);

  if (isDone) {
    return (
      <div style={{ minHeight: '100%', background: '#FFE9CC', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🧱</div>
        <h2 style={{ color: '#FF9600', fontSize: '2rem', marginBottom: '0.5rem' }}>
          {language === 'bm' ? 'Tahniah!' : 'Well Done!'}
        </h2>
        <p style={{ fontSize: '1.4rem', color: '#555', marginBottom: '2rem' }}>
          {language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/{rounds.length * 10}
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={handleReset} style={{ padding: '0.75rem 1.5rem', background: '#E0E0E0', color: '#333', border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>
            {language === 'bm' ? 'Main Semula' : 'Play Again'}
          </button>
          <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', background: '#FF9600', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>
            {language === 'bm' ? 'Kembali' : 'Back'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FFE9CC', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />

      {/* Header */}
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <h1 style={{ color: '#FF9600', marginBottom: '0.25rem', fontSize: '1.6rem' }}>
            {language === 'bm' ? 'Bina Perkataan Jawi' : 'Build Jawi Words'}
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Susun huruf dari kanan ke kiri →' : 'Arrange the letters right to left →'}
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: 'rgba(255,150,0,0.12)', borderRadius: '10px' }}>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Perkataan' : 'Word'} {roundIdx + 1}/{rounds.length}
          </span>
          <span style={{ fontWeight: 'bold', color: '#FF9600' }}>⭐ {score}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>

        {/* Target word: emoji + rumi */}
        <div style={{ background: '#FFF', borderRadius: '16px', border: '2px solid #FF9600', padding: '1.25rem', marginBottom: '1rem', textAlign: 'center', position: 'relative' }}>
          <div style={{ fontSize: '3.5rem', lineHeight: 1.1 }}>{round.word.emoji}</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#333', marginTop: '0.25rem' }}>{round.word.rumi}</div>
          <div style={{ fontSize: '0.8rem', color: '#999' }}>{round.word.eng}</div>
          <button onClick={handleListen}
            style={{ position: 'absolute', top: '12px', right: '12px', background: '#FFE9CC', border: '2px solid #FFD299', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#FF9600' }}
            title={language === 'bm' ? 'Dengar' : 'Listen'}>
            <Volume2 size={20} />
          </button>
        </div>

        {/* Build slots (right-to-left) */}
        <div style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.1rem', minHeight: '70px', alignItems: 'center' }}>
          {round.target.map((_, i) => {
            const filled = i < placed.length;
            return (
              <div key={i} style={{
                width: '60px', height: '70px', borderRadius: '12px',
                border: filled ? '2px solid #FF9600' : '2px dashed #FFB861',
                background: filled ? '#FFF7EC' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2.4rem', fontFamily: JAWI_FONT, color: '#333',
                boxShadow: isComplete ? '0 0 0 2px #4CAF50 inset' : 'none',
              }}>
                {filled ? placed[i].char : ''}
              </div>
            );
          })}
        </div>

        {/* Success banner */}
        {isComplete && (
          <div style={{ padding: '0.75rem 1rem', background: '#D4EDDA', color: '#155724', borderRadius: '8px', fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem' }}>
            {language === 'bm'
              ? `✅ Hebat! "${round.word.rumi}" = `
              : `✅ Great! "${round.word.rumi}" = `}
            <span style={{ fontFamily: JAWI_FONT, fontSize: '1.4rem', direction: 'rtl' }}>{round.word.jawi}</span>
          </div>
        )}

        {/* Letter tiles */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.6rem' }}>
          {round.tiles.map((tile) => {
            const used = usedIds.has(tile.id);
            const isWrong = wrongId === tile.id;
            return (
              <button key={tile.id} onClick={() => handleTileTap(tile)} disabled={used || isComplete}
                style={{
                  width: '64px', height: '64px', borderRadius: '14px',
                  background: used ? '#F0F0F0' : (isWrong ? '#FF6B6B' : '#FFF'),
                  border: `2px solid ${used ? '#DDD' : (isWrong ? '#D32F2F' : '#FF9600')}`,
                  color: used ? '#CCC' : (isWrong ? '#FFF' : '#333'),
                  fontSize: '2.2rem', fontFamily: JAWI_FONT,
                  cursor: used || isComplete ? 'default' : 'pointer',
                  opacity: used ? 0.5 : 1, transition: 'all 0.15s',
                }}>
                {tile.char}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div style={{ flexShrink: 0, background: '#FFE9CC', borderTop: '2px solid rgba(255,150,0,0.25)', padding: '0.75rem 1rem', display: 'flex', gap: '0.6rem' }}>
        <button onClick={handleUndo} disabled={isComplete || placed.length === 0}
          style={{ flex: 1, padding: '0.75rem', background: '#E0E0E0', color: '#555', border: 'none', borderRadius: '10px', cursor: (isComplete || placed.length === 0) ? 'not-allowed' : 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', opacity: (isComplete || placed.length === 0) ? 0.6 : 1 }}>
          <Undo2 size={16} />
          {language === 'bm' ? 'Undur' : 'Undo'}
        </button>
        <button onClick={handleClear} disabled={isComplete || placed.length === 0}
          style={{ flex: 1, padding: '0.75rem', background: '#E0E0E0', color: '#555', border: 'none', borderRadius: '10px', cursor: (isComplete || placed.length === 0) ? 'not-allowed' : 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', opacity: (isComplete || placed.length === 0) ? 0.6 : 1 }}>
          <Eraser size={16} />
          {language === 'bm' ? 'Padam' : 'Clear'}
        </button>
        <button onClick={handleNext} disabled={!isComplete}
          style={{ flex: 1.3, padding: '0.75rem', background: isComplete ? '#FF9600' : '#FFCF80', color: 'white', border: 'none', borderRadius: '10px', cursor: isComplete ? 'pointer' : 'not-allowed', fontWeight: 'bold', fontSize: '1rem', boxShadow: isComplete ? '0 4px 0 #D47A00' : 'none', transition: 'background 0.2s' }}>
          {roundIdx < rounds.length - 1
            ? (language === 'bm' ? 'Seterusnya →' : 'Next →')
            : (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')}
        </button>
      </div>
    </div>
  );
}
