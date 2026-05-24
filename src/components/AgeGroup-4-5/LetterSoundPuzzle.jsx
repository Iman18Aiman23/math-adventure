import React, { useState, useEffect, useCallback, useRef } from 'react';
import { playSound, playHoverSound } from '../../utils/soundManager';
import confetti from 'canvas-confetti';
import { RefreshCw, Trophy } from 'lucide-react';
import BackButton from '../BackButton';

const SOUND_DATA = {
  A: { word: 'Apple',     wordBm: 'Epal',           icon: '🍎', color: '#E91E63' },
  B: { word: 'Ball',      wordBm: 'Bola',            icon: '⚽', color: '#FF9800' },
  C: { word: 'Cat',       wordBm: 'Kucing',          icon: '🐱', color: '#4FC3F7' },
  D: { word: 'Dog',       wordBm: 'Anjing',          icon: '🐶', color: '#66BB6A' },
  E: { word: 'Egg',       wordBm: 'Telur',           icon: '🥚', color: '#FFD54F' },
  F: { word: 'Fish',      wordBm: 'Ikan',            icon: '🐟', color: '#9C27B0' },
  G: { word: 'Gate',      wordBm: 'Pintu',           icon: '🚪', color: '#009688' },
  H: { word: 'Hat',       wordBm: 'Topi',            icon: '🎩', color: '#F44336' },
  I: { word: 'Ice',       wordBm: 'Ais',             icon: '🧊', color: '#3F51B5' },
  J: { word: 'Jump',      wordBm: 'Lompat',          icon: '🦘', color: '#E91E63' },
  K: { word: 'Kite',      wordBm: 'Layang-layang',   icon: '🪁', color: '#FF5722' },
  L: { word: 'Lion',      wordBm: 'Singa',           icon: '🦁', color: '#FFC107' },
  M: { word: 'Moon',      wordBm: 'Bulan',           icon: '🌙', color: '#607D8B' },
  N: { word: 'Nest',      wordBm: 'Sarang',          icon: '🪺', color: '#795548' },
  O: { word: 'Orange',    wordBm: 'Oren',            icon: '🍊', color: '#FF9800' },
  P: { word: 'Pig',       wordBm: 'Babi',            icon: '🐷', color: '#EC407A' },
  Q: { word: 'Queen',     wordBm: 'Permaisuri',      icon: '👑', color: '#9C27B0' },
  R: { word: 'Rabbit',    wordBm: 'Arnab',           icon: '🐰', color: '#F44336' },
  S: { word: 'Sun',       wordBm: 'Matahari',        icon: '☀️', color: '#FF8F00' },
  T: { word: 'Tiger',     wordBm: 'Harimau',         icon: '🐯', color: '#FF5722' },
  U: { word: 'Umbrella',  wordBm: 'Payung',          icon: '☂️', color: '#2196F3' },
  V: { word: 'Van',       wordBm: 'Van',             icon: '🚐', color: '#009688' },
  W: { word: 'Water',     wordBm: 'Air',             icon: '💧', color: '#03A9F4' },
  X: { word: 'Xylophone', wordBm: 'Xilofon',        icon: '🎵', color: '#673AB7' },
  Y: { word: 'Yellow',    wordBm: 'Kuning',          icon: '🌻', color: '#F9A825' },
  Z: { word: 'Zebra',     wordBm: 'Zebra',           icon: '🦓', color: '#424242' },
};

const TOTAL_ROUNDS = 26;

export default function LetterSoundPuzzle({ onBack, language = 'bm', theme = {} }) {
  const [gameState, setGameState]           = useState('menu');
  const [soundSlots, setSoundSlots]         = useState([]);
  const [letterItems, setLetterItems]       = useState([]);
  const [draggedLetter, setDraggedLetter]   = useState(null);
  const [completedPairs, setCompletedPairs] = useState(new Set());
  const [correctCount, setCorrectCount]     = useState(0);
  const [feedback, setFeedback]             = useState('');
  const [score, setScore]                   = useState(0);
  const touchDragRef   = useRef({ letter: null, clone: null, sourceEl: null });
  const letterQueueRef = useRef([]);

  const generateRound = useCallback(() => {
    const queue = letterQueueRef.current;
    const batchSize = Math.min(4, queue.length);
    if (batchSize === 0) return;
    const batch = queue.slice(0, batchSize);
    letterQueueRef.current = queue.slice(batchSize);

    const slots = batch.map(key => ({
      id: `slot-${key}`, letter: key,
      word: SOUND_DATA[key].word, wordBm: SOUND_DATA[key].wordBm,
      icon: SOUND_DATA[key].icon, color: SOUND_DATA[key].color,
      matched: false,
    }));
    const items = [...batch].sort(() => Math.random() - 0.5).map((letter, idx) => ({
      id: `item-${idx}`, letter, slotId: `slot-${letter}`, placed: false,
    }));
    setSoundSlots(slots);
    setLetterItems(items);
    setDraggedLetter(null);
    setFeedback('');
  }, []);

  useEffect(() => {
    if (gameState === 'playing' && soundSlots.length === 0) generateRound();
  }, [gameState, soundSlots.length, generateRound]);

  const handleDrop = useCallback((slot, letterOverride) => {
    const active = letterOverride || draggedLetter;
    if (!active || completedPairs.has(slot.id)) return;

    if (active.slotId === slot.id) {
      playSound('correct');
      setFeedback('correct');
      const newCompleted = new Set(completedPairs);
      newCompleted.add(slot.id);
      setCompletedPairs(newCompleted);
      setScore(s => s + 100);
      const next = correctCount + 1;
      setCorrectCount(next);
      const allMatched = soundSlots.every(s => newCompleted.has(s.id));
      setTimeout(() => {
        setFeedback('');
        if (next >= TOTAL_ROUNDS) {
          confetti({ particleCount: 150, spread: 90, origin: { y: 0.55 } });
          setGameState('won');
        } else if (allMatched) {
          setCompletedPairs(new Set());
          setSoundSlots([]);
          setLetterItems([]);
        }
      }, 700);
    } else {
      playSound('wrong');
      setFeedback('wrong');
      setTimeout(() => setFeedback(''), 700);
    }
    setDraggedLetter(null);
  }, [draggedLetter, completedPairs, correctCount, soundSlots]);

  // Touch drag support
  const handleTouchStart = (e, letter) => {
    if (completedPairs.has(letter.slotId)) return;
    e.preventDefault();
    const touch = e.touches[0];
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const clone = target.cloneNode(true);
    Object.assign(clone.style, {
      position: 'fixed', width: rect.width + 'px', height: rect.height + 'px',
      left: (touch.clientX - rect.width / 2) + 'px', top: (touch.clientY - rect.height / 2) + 'px',
      zIndex: '9999', pointerEvents: 'none', opacity: '0.9',
      transform: 'scale(1.1)', transition: 'none', animation: 'none',
      boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
    });
    clone.id = 'touch-drag-clone';
    document.body.appendChild(clone);
    target.style.opacity = '0.3';
    touchDragRef.current = { letter, clone, sourceEl: target };
    setDraggedLetter(letter);
  };

  const handleTouchMove = (e) => {
    const { clone } = touchDragRef.current;
    if (!clone) return;
    e.preventDefault();
    const touch = e.touches[0];
    clone.style.left = (touch.clientX - clone.offsetWidth / 2) + 'px';
    clone.style.top  = (touch.clientY - clone.offsetHeight / 2) + 'px';
  };

  const handleTouchEnd = (e) => {
    const { letter, clone, sourceEl } = touchDragRef.current;
    if (clone) clone.remove();
    if (sourceEl) sourceEl.style.opacity = '';
    if (!letter) { touchDragRef.current = { letter: null, clone: null, sourceEl: null }; return; }
    const touch = e.changedTouches[0];
    let el = document.elementFromPoint(touch.clientX, touch.clientY);
    while (el && !el.dataset?.slotId) el = el.parentElement;
    if (el) {
      const slot = soundSlots.find(s => s.id === el.dataset.slotId);
      if (slot) handleDrop(slot, letter);
    }
    touchDragRef.current = { letter: null, clone: null, sourceEl: null };
    setDraggedLetter(null);
  };

  const handleRestart = useCallback(() => {
    letterQueueRef.current = Object.keys(SOUND_DATA).sort(() => Math.random() - 0.5);
    setCorrectCount(0);
    setScore(0);
    setCompletedPairs(new Set());
    setSoundSlots([]);
    setLetterItems([]);
    setFeedback('');
    setGameState('playing');
  }, []);

  const progress = (correctCount / TOTAL_ROUNDS) * 100;

  const heroBg     = theme.heroBg     || 'linear-gradient(135deg, #E65100 0%, #FF9800 50%, #FFB74D 100%)';
  const heroBorder = theme.heroBorder || '#FFB74D';
  const swatch     = theme.swatch     || '#E65100';

  // ── Menu ─────────────────────────────────────────────────────────
  if (gameState === 'menu') {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', flex: 1,
        background: '#F8FAFC',
      }}>
        <style>{`
          .lsp-start-btn:hover { transform: translateY(-3px) scale(1.04) !important; }
          .lsp-start-btn:active { transform: translateY(2px) scale(0.97) !important; }
        `}</style>
        <BackButton onClick={onBack} />
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', padding: '2rem 1.5rem', gap: '1.5rem',
        }}>
          <div style={{
            background: heroBg,
            borderRadius: '28px', padding: '1.5rem 2rem',
            border: `2px solid ${heroBorder}`,
            boxShadow: `0 12px 40px ${swatch}40`,
            textAlign: 'center', maxWidth: '360px', width: '100%',
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.2em', marginBottom: '0.4rem' }}>
              🧩 GAME 🧩
            </div>
            <h1 style={{
              fontWeight: 900, fontSize: '2.1rem', margin: '0 0 0.75rem',
              color: '#fff',
              filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.2))',
              fontFamily: 'var(--font-heading)',
            }}>
              {language === 'bm' ? 'Padan Huruf' : 'Letter Match'}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.92)', fontWeight: 700, fontSize: '0.95rem', margin: 0, lineHeight: 1.5 }}>
              {language === 'bm'
                ? 'Padankan huruf besar dan huruf kecil dengan betul!'
                : 'Match uppercase and lowercase letters correctly!'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              ['🧩', language === 'bm' ? '26 Pasangan' : '26 Pairs'],
              ['🖐️', language === 'bm' ? 'Seret & Letak' : 'Drag & Drop'],
              ['⭐', language === 'bm' ? 'Kumpul Mata'  : 'Earn Points'],
            ].map(([icon, label]) => (
              <div key={label} style={{
                background: `${swatch}18`,
                border: `2px solid ${heroBorder}`, borderRadius: '999px',
                padding: '0.35rem 0.9rem', display: 'flex', alignItems: 'center', gap: '0.35rem',
                fontWeight: 800, fontSize: '0.82rem', color: swatch,
              }}>
                {icon} {label}
              </div>
            ))}
          </div>

          <button
            className="lsp-start-btn"
            onClick={() => {
              playHoverSound();
              letterQueueRef.current = Object.keys(SOUND_DATA).sort(() => Math.random() - 0.5);
              setGameState('playing');
            }}
            style={{
              padding: '1.1rem 3.5rem',
              background: heroBg,
              color: '#fff', border: `2px solid ${heroBorder}`,
              borderRadius: '999px', fontWeight: 900, fontSize: '1.5rem',
              cursor: 'pointer', fontFamily: 'var(--font-heading)',
              boxShadow: `0 8px 0 rgba(0,0,0,0.25), 0 12px 24px ${swatch}40`,
              transition: 'transform 0.18s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            {language === 'bm' ? '🚀 MULA!' : '🚀 START!'}
          </button>
        </div>
      </div>
    );
  }

  // ── Won ──────────────────────────────────────────────────────────
  if (gameState === 'won') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#F8FAFC' }}>
        <BackButton onClick={onBack} />
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '1.5rem', gap: '1.25rem',
        }}>
          <Trophy size={80} color="#FFC800" />
          <h1 style={{ fontWeight: 900, fontSize: '2rem', color: '#58CC02', margin: 0, fontFamily: 'var(--font-heading)' }}>
            {language === 'bm' ? '🧩 Syabas!' : '🧩 Puzzle Master!'}
          </h1>
          <p style={{ color: '#64748B', fontWeight: 700, margin: 0, fontSize: '1.05rem', textAlign: 'center' }}>
            {language === 'bm'
              ? `Kamu padankan semua ${TOTAL_ROUNDS} pasangan huruf-bunyi!`
              : `You matched all ${TOTAL_ROUNDS} letter-sound pairs!`}
          </p>
          <div style={{
            background: '#fff', border: '2px solid #E2E8F0', borderRadius: '20px',
            padding: '1rem 2rem', display: 'flex', gap: '2rem',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>{language === 'bm' ? 'Pasangan' : 'Pairs'}</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#FF9800' }}>{TOTAL_ROUNDS}/{TOTAL_ROUNDS}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>Score</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#58CC02' }}>{score}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={handleRestart}
              onMouseEnter={playHoverSound}
              style={{
                padding: '0.9rem 1.75rem', background: '#1CB0F6', color: '#fff',
                border: 'none', borderRadius: '16px', boxShadow: '0 6px 0 #0091D0',
                fontWeight: 900, fontSize: '1.1rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                fontFamily: 'var(--font-heading)',
              }}
            >
              <RefreshCw size={20} />
              {language === 'bm' ? 'Main Lagi' : 'Play Again'}
            </button>
            <button
              onClick={onBack}
              onMouseEnter={playHoverSound}
              style={{
                padding: '0.9rem 1.75rem', background: '#fff', color: '#64748B',
                border: '2px solid #E2E8F0', borderRadius: '16px', boxShadow: '0 6px 0 #E2E8F0',
                fontWeight: 900, fontSize: '1.1rem', cursor: 'pointer',
                fontFamily: 'var(--font-heading)',
              }}
            >
              {language === 'bm' ? 'Keluar' : 'Exit'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Playing ──────────────────────────────────────────────────────
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#F8FAFC', overflow: 'hidden' }}>
      <style>{`
        @keyframes matchPop { 0%{transform:scale(1)} 50%{transform:scale(1.12)} 100%{transform:scale(1)} }
        @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }
      `}</style>

      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        padding: 'max(0.75rem, env(safe-area-inset-top)) 1rem 0.5rem',
      }}>
        <BackButton onClick={onBack} style={{ position: 'static', flexShrink: 0 }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          <div style={{ height: 10, borderRadius: 999, background: '#E2E8F0', overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 999,
              background: 'linear-gradient(90deg, #FFB74D, #FF7043)',
              width: `${progress}%`,
              transition: 'width 0.4s cubic-bezier(0.4,0,0.2,1)',
            }} />
          </div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94A3B8', textAlign: 'right' }}>
            {correctCount} / {TOTAL_ROUNDS}
          </div>
        </div>
        <div style={{
          background: '#FFF7ED', border: '2px solid #FED7AA',
          borderRadius: '999px', padding: '0.2rem 0.65rem',
          fontWeight: 800, fontSize: '0.85rem', color: '#EA580C', flexShrink: 0,
        }}>
          ⭐ {score}
        </div>
      </div>

      {/* Feedback banner */}
      {feedback && (
        <div style={{
          margin: '0 1rem 0.4rem',
          background: feedback === 'correct' ? '#D7FFB8' : '#FFDFE0',
          border: `2px solid ${feedback === 'correct' ? '#58CC02' : '#FF4B4B'}`,
          borderRadius: '12px', padding: '0.5rem 1rem',
          fontWeight: 800, textAlign: 'center', fontSize: '0.95rem',
          color: feedback === 'correct' ? '#46A302' : '#CC0000',
          fontFamily: 'var(--font-heading)',
          animation: 'matchPop 0.4s ease',
        }}>
          {feedback === 'correct'
            ? (language === 'bm' ? '✓ Betul!' : '✓ Correct!')
            : (language === 'bm' ? '✕ Cuba lagi!' : '✕ Try Again!')}
        </div>
      )}

      {/* Instruction */}
      <p style={{
        textAlign: 'center', margin: '0 1rem 0.4rem',
        fontSize: '0.82rem', fontWeight: 700,
        color: '#94A3B8', letterSpacing: '0.1em', textTransform: 'uppercase',
      }}>
        {language === 'bm' ? 'Padankan huruf besar dan huruf kecil' : 'Match uppercase and lowercase letters'}
      </p>

      {/* Main drag area */}
      <div style={{
        flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '0.75rem', padding: '0 1rem 1rem',
        minHeight: 0, overflow: 'hidden',
      }}>
        {/* Drag items (uppercase) — LEFT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', minHeight: 0 }}>
          {letterItems.map((item) => {
            const placed = completedPairs.has(item.slotId);
            const col = SOUND_DATA[item.letter]?.color || '#64748B';
            return (
              <div
                key={item.id}
                draggable={!placed}
                onDragStart={() => !placed && setDraggedLetter(item)}
                onTouchStart={(e) => handleTouchStart(e, item)}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                  flex: 1, minHeight: 0,
                  borderRadius: '16px',
                  background: placed ? '#F1F5F9' : '#fff',
                  border: `3px solid ${placed ? '#E2E8F0' : col}`,
                  boxShadow: placed
                    ? '0 2px 0 #E2E8F0'
                    : `0 6px 0 ${col}60, 0 8px 20px rgba(0,0,0,0.08)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: placed ? 'not-allowed' : 'grab',
                  opacity: placed ? 0.4 : draggedLetter?.id === item.id ? 0.4 : 1,
                  transition: 'all 0.2s',
                  userSelect: 'none',
                }}
                onMouseEnter={(e) => { if (!placed) { playHoverSound(); e.currentTarget.style.transform = 'translateY(-3px)'; } }}
                onMouseLeave={(e) => { if (!placed) e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <span style={{
                  fontSize: '2.8rem', fontWeight: 900,
                  color: placed ? '#CBD5E1' : col,
                  fontFamily: 'var(--font-heading)',
                  textShadow: placed ? 'none' : `0 3px 8px ${col}40`,
                }}>
                  {item.letter}
                </span>
              </div>
            );
          })}
        </div>

        {/* Drop targets (lowercase + word) — RIGHT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', minHeight: 0 }}>
          {soundSlots.map((slot) => {
            const matched = completedPairs.has(slot.id);
            return (
              <div
                key={slot.id}
                data-slot-id={slot.id}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(slot)}
                style={{
                  flex: 1, minHeight: 0,
                  borderRadius: '16px',
                  background: matched ? '#D7FFB8' : '#fff',
                  border: `3px ${matched ? 'solid' : 'dashed'} ${matched ? '#58CC02' : slot.color}`,
                  boxShadow: matched
                    ? '0 6px 0 #46A302, 0 8px 20px rgba(88,204,2,0.15)'
                    : `0 4px 0 ${slot.color}40, 0 6px 16px rgba(0,0,0,0.05)`,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  gap: '0.2rem', padding: '0.5rem',
                  transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                  animation: matched ? 'matchPop 0.5s ease' : 'none',
                }}
              >
                {matched ? (
                  <>
                    <span style={{ fontSize: '1.5rem' }}>✓</span>
                    <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#46A302', fontFamily: 'var(--font-heading)' }}>{slot.letter}</span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#46A302' }}>
                      {language === 'bm' ? slot.wordBm : slot.word}
                    </span>
                  </>
                ) : (
                  <>
                    <span style={{ fontSize: '1.8rem' }}>{slot.icon}</span>
                    <span style={{ fontSize: '1.8rem', fontWeight: 900, color: slot.color, fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
                      {slot.letter.toLowerCase()}
                    </span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94A3B8', textAlign: 'center' }}>
                      {language === 'bm' ? slot.wordBm : slot.word}
                    </span>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
