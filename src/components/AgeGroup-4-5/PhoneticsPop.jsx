import React, { useState, useEffect, useCallback } from 'react';
import { playSound, playHoverSound } from '../../utils/soundManager';
import SpeechManager from '../../services/SpeechManager';
import confetti from 'canvas-confetti';
import { Volume2, RefreshCw, Trophy } from 'lucide-react';
import BackButton from '../BackButton';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const PHONETIC_SOUNDS = {
  A: { word: 'Apple',     wordBm: 'Epal',          icon: '🍎' },
  B: { word: 'Ball',      wordBm: 'Bola',           icon: '⚽' },
  C: { word: 'Cat',       wordBm: 'Kucing',          icon: '🐱' },
  D: { word: 'Dog',       wordBm: 'Anjing',          icon: '🐶' },
  E: { word: 'Egg',       wordBm: 'Telur',           icon: '🥚' },
  F: { word: 'Fish',      wordBm: 'Ikan',            icon: '🐟' },
  G: { word: 'Gate',      wordBm: 'Pintu',           icon: '🚪' },
  H: { word: 'Hat',       wordBm: 'Topi',            icon: '🎩' },
  I: { word: 'Ice',       wordBm: 'Ais',             icon: '🧊' },
  J: { word: 'Jump',      wordBm: 'Lompat',          icon: '🦘' },
  K: { word: 'Kite',      wordBm: 'Layang-layang',   icon: '🪁' },
  L: { word: 'Lion',      wordBm: 'Singa',           icon: '🦁' },
  M: { word: 'Moon',      wordBm: 'Bulan',           icon: '🌙' },
  N: { word: 'Nest',      wordBm: 'Sarang',          icon: '🪺' },
  O: { word: 'Orange',    wordBm: 'Oren',            icon: '🍊' },
  P: { word: 'Pig',       wordBm: 'Babi',            icon: '🐷' },
  Q: { word: 'Queen',     wordBm: 'Permaisuri',      icon: '👑' },
  R: { word: 'Rabbit',    wordBm: 'Arnab',           icon: '🐰' },
  S: { word: 'Sun',       wordBm: 'Matahari',        icon: '☀️' },
  T: { word: 'Tiger',     wordBm: 'Harimau',         icon: '🐯' },
  U: { word: 'Umbrella',  wordBm: 'Payung',          icon: '☂️' },
  V: { word: 'Van',       wordBm: 'Van',             icon: '🚐' },
  W: { word: 'Water',     wordBm: 'Air',             icon: '💧' },
  X: { word: 'Xylophone', wordBm: 'Xilofon',        icon: '🎵' },
  Y: { word: 'Yellow',    wordBm: 'Kuning',          icon: '🌻' },
  Z: { word: 'Zebra',     wordBm: 'Zebra',           icon: '🦓' },
};

const BALLOON_FILLS = [
  'linear-gradient(145deg, #FF6B9D, #E91E63)',
  'linear-gradient(145deg, #FFD54F, #FF9800)',
  'linear-gradient(145deg, #4FC3F7, #0288D1)',
  'linear-gradient(145deg, #BA68C8, #7B1FA2)',
];

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

// Build 4 balloons for a given letter string
const makeBubbles = (letter) => {
  const wrongs = ALPHABET.filter(l => l !== letter)
    .sort(() => Math.random() - 0.5).slice(0, 3);
  const all = shuffle([letter, ...wrongs]);

  const QUADRANTS = [
    { xBase: 10, yBase: 10 },
    { xBase: 55, yBase: 10 },
    { xBase: 10, yBase: 52 },
    { xBase: 55, yBase: 52 },
  ];
  const shuffledQ = shuffle(QUADRANTS);

  return all.map((l, idx) => ({
    id:         `${l}-${idx}-${Date.now()}`,
    letter:     l,
    isCorrect:  l === letter,
    x:          shuffledQ[idx].xBase + Math.random() * 22,
    y:          shuffledQ[idx].yBase + Math.random() * 20,
    popped:     false,
    colorIdx:   idx,
    floatDelay: idx * 0.3,
  }));
};

export default function PhoneticsPop({ onBack, language = 'bm', theme = {} }) {
  const [gameState,    setGameState]    = useState('menu');
  const [letterQueue,  setLetterQueue]  = useState([]);   // shuffled A-Z
  const [queueIdx,     setQueueIdx]     = useState(0);    // current position
  const [score,        setScore]        = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [bubbles,      setBubbles]      = useState([]);
  const [locked,       setLocked]       = useState(false);

  // Build new bubbles whenever the current letter changes
  useEffect(() => {
    if (gameState === 'playing' && letterQueue.length > 0) {
      setBubbles(makeBubbles(letterQueue[queueIdx]));
      setLocked(false);
    }
  }, [gameState, letterQueue, queueIdx]);

  const startGame = useCallback(() => {
    const q = shuffle(ALPHABET);
    setLetterQueue(q);
    setQueueIdx(0);
    setScore(0);
    setCorrectCount(0);
    setLocked(false);
    setGameState('playing');
  }, []);

  const currentLetter = letterQueue[queueIdx] ?? 'A';
  const currentData   = PHONETIC_SOUNDS[currentLetter];

  const playLetterSound = useCallback(() => {
    const data = PHONETIC_SOUNDS[currentLetter];
    SpeechManager.speak(`${currentLetter} for ${data.word}`, 'en-US', { rate: 0.4 });
  }, [currentLetter]);

  const handleBubbleClick = useCallback((bubble) => {
    if (locked || bubble.popped) return;
    setLocked(true);

    if (bubble.isCorrect) {
      setBubbles(prev => prev.map(b => b.id === bubble.id ? { ...b, popped: true } : b));
      playSound('correct');
      setScore(s => s + 100);
      const next = correctCount + 1;
      setCorrectCount(next);

      setTimeout(() => {
        if (next >= ALPHABET.length) {
          confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });
          setGameState('won');
        } else {
          setQueueIdx(i => i + 1);
        }
      }, 600);
    } else {
      playSound('wrong');
      setBubbles(prev => prev.map(b => b.id === bubble.id ? { ...b, shaking: true } : b));
      setTimeout(() => {
        setBubbles(makeBubbles(currentLetter));
        setLocked(false);
      }, 700);
    }
  }, [locked, correctCount, currentLetter]);

  const progress = (correctCount / ALPHABET.length) * 100;

  // ── Theme helpers ─────────────────────────────────────────────────
  const heroBg     = theme.heroBg     || 'linear-gradient(135deg, #E91E63 0%, #F06292 50%, #CE93D8 100%)';
  const heroBorder = theme.heroBorder || '#F48FB1';
  const swatch     = theme.swatch     || '#E91E63';

  // ── Menu ─────────────────────────────────────────────────────────
  if (gameState === 'menu') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#F8FAFC' }}>
        <style>{`
          .pop-start-btn:hover  { transform: translateY(-3px) scale(1.04) !important; }
          .pop-start-btn:active { transform: translateY(2px)  scale(0.97) !important; }
        `}</style>
        <BackButton onClick={onBack} />
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', padding: '2rem 1.5rem', gap: '1.5rem',
        }}>
          {/* Themed hero card */}
          <div style={{
            background: heroBg,
            borderRadius: '28px', padding: '1.75rem 2rem',
            border: `2px solid ${heroBorder}`,
            boxShadow: `0 12px 40px ${swatch}40`,
            textAlign: 'center', maxWidth: '360px', width: '100%',
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎈</div>
            <h1 style={{
              fontWeight: 900, fontSize: '2.2rem', margin: '0 0 0.6rem',
              color: '#fff', fontFamily: 'var(--font-heading)',
              textShadow: '0 3px 8px rgba(0,0,0,0.25)',
            }}>
              {language === 'bm' ? 'Pop Fonetik' : 'Phonics Pop'}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600, fontSize: '0.95rem', margin: 0, lineHeight: 1.5 }}>
              {language === 'bm'
                ? 'Pecahkan belon yang mempunyai huruf betul!'
                : 'Pop the balloon with the correct letter!'}
            </p>
          </div>

          {/* Themed stat badges */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              ['📚', language === 'bm' ? '26 Huruf' : '26 Letters'],
              ['🎈', language === 'bm' ? '4 Belon'  : '4 Balloons'],
              ['⭐', language === 'bm' ? 'Kumpul Mata' : 'Earn Points'],
            ].map(([icon, label]) => (
              <div key={label} style={{
                background: `${swatch}18`,
                border: `2px solid ${heroBorder}`,
                borderRadius: '999px', padding: '0.35rem 0.9rem',
                display: 'flex', alignItems: 'center', gap: '0.35rem',
                fontWeight: 800, fontSize: '0.82rem', color: swatch,
              }}>
                {icon} {label}
              </div>
            ))}
          </div>

          <button
            className="pop-start-btn"
            onClick={() => { playHoverSound(); startGame(); }}
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
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', gap: '1.25rem' }}>
          <Trophy size={80} color="#FFC800" />
          <h1 style={{ fontWeight: 900, fontSize: '2rem', color: '#58CC02', margin: 0, fontFamily: 'var(--font-heading)' }}>
            {language === 'bm' ? '🎉 Syabas!' : '🎉 Well Done!'}
          </h1>
          <p style={{ color: '#64748B', fontWeight: 700, margin: 0, fontSize: '1.05rem', textAlign: 'center' }}>
            {language === 'bm' ? 'Kamu belajar semua 26 huruf!' : 'You learned all 26 letters!'}
          </p>
          <div style={{ background: '#fff', border: '2px solid #E2E8F0', borderRadius: '20px', padding: '1rem 2rem', display: 'flex', gap: '2rem', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>Score</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: swatch }}>{score}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>{language === 'bm' ? 'Huruf' : 'Letters'}</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#1E293B' }}>26/26</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button onClick={startGame} onMouseEnter={playHoverSound} style={{ padding: '0.9rem 1.75rem', background: '#1CB0F6', color: '#fff', border: 'none', borderRadius: '16px', boxShadow: '0 6px 0 #0091D0', fontWeight: 900, fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-heading)' }}>
              <RefreshCw size={20} /> {language === 'bm' ? 'Main Lagi' : 'Play Again'}
            </button>
            <button onClick={onBack} onMouseEnter={playHoverSound} style={{ padding: '0.9rem 1.75rem', background: '#fff', color: '#64748B', border: '2px solid #E2E8F0', borderRadius: '16px', boxShadow: '0 6px 0 #E2E8F0', fontWeight: 900, fontSize: '1.1rem', cursor: 'pointer', fontFamily: 'var(--font-heading)' }}>
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
        @keyframes balloonFloat {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50%       { transform: translateY(-14px) rotate(2deg); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-8px); }
          40%       { transform: translateX(8px); }
          60%       { transform: translateX(-6px); }
          80%       { transform: translateX(6px); }
        }
        @keyframes popBurst {
          0%   { transform: scale(1); opacity: 1; }
          50%  { transform: scale(1.5); opacity: 0.5; }
          100% { transform: scale(0); opacity: 0; }
        }
      `}</style>

      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: 'max(0.75rem, env(safe-area-inset-top)) 1rem 0.5rem' }}>
        <BackButton onClick={onBack} style={{ position: 'static', flexShrink: 0 }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          <div style={{ height: 10, borderRadius: 999, background: '#E2E8F0', overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: 999, background: heroBg, width: `${progress}%`, transition: 'width 0.4s cubic-bezier(0.4,0,0.2,1)' }} />
          </div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94A3B8', textAlign: 'right' }}>{correctCount} / {ALPHABET.length}</div>
        </div>
        <div style={{ background: '#FFF7ED', border: '2px solid #FED7AA', borderRadius: '999px', padding: '0.2rem 0.65rem', fontWeight: 800, fontSize: '0.85rem', color: '#EA580C', flexShrink: 0 }}>
          ⭐ {score}
        </div>
      </div>

      {/* Letter prompt card */}
      <div style={{ padding: '0.25rem 1.25rem 0' }}>
        <div style={{ background: '#fff', border: '2px solid #E2E8F0', borderRadius: '20px', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 4px 0 #E2E8F0' }}>
          <div style={{ width: 72, height: 72, borderRadius: '18px', background: heroBg, border: `2px solid ${heroBorder}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <div style={{ fontSize: '2.8rem', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>{currentLetter}</div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.15rem' }}>
              {language === 'bm' ? 'Pecahkan belon huruf ini' : 'Pop the balloon for this letter'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontSize: '1.4rem' }}>{currentData?.icon}</span>
              <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#1E293B' }}>
                {language === 'bm' ? currentData?.wordBm : currentData?.word}
              </span>
            </div>
          </div>
          <button onClick={playLetterSound} onMouseEnter={playHoverSound} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: '#F1F5F9', border: '2px solid #E2E8F0', borderRadius: '999px', padding: '0.4rem 0.8rem', color: '#475569', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', boxShadow: '0 2px 0 #CBD5E1', flexShrink: 0 }}>
            <Volume2 size={14} />{language === 'bm' ? 'Dengar' : 'Listen'}
          </button>
        </div>
      </div>

      {/* Balloon play area */}
      <div style={{ flex: 1, padding: '0.75rem 1.25rem 1rem', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div style={{ position: 'relative', flex: 1, minHeight: 220, background: 'linear-gradient(180deg, #EEF2FF 0%, #F0FDF4 100%)', borderRadius: '24px', border: '2px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.05) inset' }}>
          {['☁️', '☁️', '☁️'].map((c, i) => (
            <div key={i} style={{ position: 'absolute', fontSize: '2rem', opacity: 0.25, top: `${10 + i * 25}%`, left: `${i * 30 + 5}%`, pointerEvents: 'none' }}>{c}</div>
          ))}
          {bubbles.map((bubble) => {
            const fill = BALLOON_FILLS[bubble.colorIdx % BALLOON_FILLS.length];
            return (
              <div
                key={bubble.id}
                style={{
                  position: 'absolute', left: `${bubble.x}%`, top: `${bubble.y}%`,
                  width: 80, height: 88,
                  cursor: (locked && !bubble.popped) ? 'default' : bubble.popped ? 'default' : 'pointer',
                  animation: bubble.popped
                    ? 'popBurst 0.4s ease forwards'
                    : bubble.shaking
                    ? 'shake 0.5s ease'
                    : `balloonFloat ${2.5 + bubble.floatDelay}s ease-in-out infinite`,
                  animationDelay: bubble.popped || bubble.shaking ? '0s' : `${bubble.floatDelay}s`,
                  userSelect: 'none',
                }}
                onClick={() => handleBubbleClick(bubble)}
              >
                <div style={{
                  width: 76, height: 76,
                  borderRadius: '50% 50% 50% 50% / 55% 55% 45% 45%',
                  background: fill,
                  boxShadow: '0 8px 20px rgba(0,0,0,0.2), inset -8px -8px 16px rgba(0,0,0,0.15), inset 6px 6px 12px rgba(255,255,255,0.35)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid rgba(255,255,255,0.5)', position: 'relative',
                }}>
                  <span style={{ fontSize: '2.4rem', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-heading)', textShadow: '0 2px 6px rgba(0,0,0,0.3)' }}>
                    {bubble.letter}
                  </span>
                  <div style={{ position: 'absolute', top: 10, left: 14, width: 20, height: 12, borderRadius: '50%', background: 'rgba(255,255,255,0.4)', pointerEvents: 'none' }} />
                </div>
                <div style={{ width: 2, height: 12, background: 'rgba(0,0,0,0.2)', margin: '0 auto' }} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
