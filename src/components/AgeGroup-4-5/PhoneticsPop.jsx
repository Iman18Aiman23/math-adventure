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

const BALLOON_COLORS = [
  { fill: 'linear-gradient(145deg, #FF80AB 0%, #FF1744 100%)', shadow: 'rgba(255,23,68,0.45)',   knot: '#B71C1C' },
  { fill: 'linear-gradient(145deg, #FFD740 0%, #FF6D00 100%)', shadow: 'rgba(255,109,0,0.45)',  knot: '#E65100' },
  { fill: 'linear-gradient(145deg, #40C4FF 0%, #0091EA 100%)', shadow: 'rgba(0,145,234,0.45)',  knot: '#01579B' },
  { fill: 'linear-gradient(145deg, #CE93D8 0%, #8E24AA 100%)', shadow: 'rgba(142,36,170,0.45)', knot: '#6A1B9A' },
  { fill: 'linear-gradient(145deg, #A5D6A7 0%, #2E7D32 100%)', shadow: 'rgba(46,125,50,0.45)',  knot: '#1B5E20' },
  { fill: 'linear-gradient(145deg, #FFCC80 0%, #F57C00 100%)', shadow: 'rgba(245,124,0,0.45)',  knot: '#BF360C' },
];

const PARTICLE_COLORS = ['#FF6B9D','#FFD740','#40C4FF','#B388FF','#69F0AE','#FF8A65','#4DD0E1','#FFAB40'];
const BURST_ANGLES    = [0, 45, 90, 135, 180, 225, 270, 315];

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
    colorIdx:   idx % BALLOON_COLORS.length,
    floatDelay: idx * 0.35,
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
          0%   { transform: translateY(0px)   rotate(-3deg) scale(1);    }
          25%  { transform: translateY(-18px) rotate(2deg)  scale(1.03); }
          50%  { transform: translateY(-24px) rotate(-1deg) scale(1.01); }
          75%  { transform: translateY(-12px) rotate(3deg)  scale(1.02); }
          100% { transform: translateY(0px)   rotate(-3deg) scale(1);    }
        }
        @keyframes shake {
          0%,100% { transform: translateX(0) rotate(0deg); }
          20%     { transform: translateX(-10px) rotate(-6deg); }
          40%     { transform: translateX(10px)  rotate(6deg); }
          60%     { transform: translateX(-7px)  rotate(-4deg); }
          80%     { transform: translateX(7px)   rotate(4deg); }
        }
        @keyframes particleFly {
          0%   { transform: rotate(var(--a)) translateX(0)    scale(1.4); opacity: 1; }
          100% { transform: rotate(var(--a)) translateX(62px) scale(0);   opacity: 0; }
        }
        @keyframes shockwave {
          0%   { transform: scale(0.4); opacity: 0.9; border-width: 7px; }
          100% { transform: scale(2.6); opacity: 0;   border-width: 1px; }
        }
        @keyframes popFlash {
          0%   { transform: translate(-50%,-50%) scale(0.4); opacity: 1; }
          55%  { transform: translate(-50%,-50%) scale(1.4); opacity: 1; }
          100% { transform: translate(-50%,-50%) scale(1.8); opacity: 0; }
        }
        @keyframes cloudDrift {
          0%,100% { transform: translateX(0) translateY(0); }
          50%     { transform: translateX(10px) translateY(-4px); }
        }
        @keyframes sparkle {
          0%,100% { transform: scale(1) rotate(0deg);   opacity: 0.5; }
          50%     { transform: scale(1.5) rotate(180deg); opacity: 1; }
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
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '2rem' }}>{currentData?.icon}</span>
            </div>
          </div>
          <button onClick={playLetterSound} onMouseEnter={playHoverSound} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: '#F1F5F9', border: '2px solid #E2E8F0', borderRadius: '999px', padding: '0.4rem 0.8rem', color: '#475569', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', boxShadow: '0 2px 0 #CBD5E1', flexShrink: 0 }}>
            <Volume2 size={14} />{language === 'bm' ? 'Dengar' : 'Listen'}
          </button>
        </div>
      </div>

      {/* Balloon play area */}
      <div style={{ flex: 1, padding: '0.75rem 1.25rem 1rem', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div style={{
          position: 'relative', flex: 1, minHeight: 220,
          background: 'linear-gradient(160deg, #B3E5FC 0%, #CE93D8 35%, #F48FB1 65%, #FFE082 100%)',
          borderRadius: '28px',
          border: '3px solid rgba(255,255,255,0.7)',
          overflow: 'hidden',
          boxShadow: '0 8px 28px rgba(0,0,0,0.12), inset 0 2px 0 rgba(255,255,255,0.6)',
        }}>
          {/* Inner glow overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.35) 0%, transparent 65%)', pointerEvents: 'none' }} />

          {/* Clouds */}
          {[
            { top: '5%',  left: '4%',  size: '2.4rem', opacity: 0.65, dur: 8  },
            { top: '3%',  left: '58%', size: '1.7rem', opacity: 0.5,  dur: 11 },
            { top: '22%', left: '26%', size: '1.5rem', opacity: 0.4,  dur: 9  },
            { top: '18%', left: '74%', size: '1.3rem', opacity: 0.35, dur: 13 },
          ].map((c, i) => (
            <div key={i} style={{
              position: 'absolute', top: c.top, left: c.left, fontSize: c.size, opacity: c.opacity,
              animation: `cloudDrift ${c.dur}s ease-in-out infinite`, animationDelay: `${i * 1.5}s`,
              pointerEvents: 'none', filter: 'drop-shadow(0 2px 4px rgba(255,255,255,0.5))',
            }}>☁️</div>
          ))}

          {/* Colorful sparkle dots */}
          {[
            { top: '8%',  left: '83%', color: '#FF6B9D', size: 14 },
            { top: '16%', left: '10%', color: '#FFD740', size: 10 },
            { top: '38%', left: '91%', color: '#40C4FF', size: 12 },
            { top: '52%', left: '4%',  color: '#B388FF', size: 10 },
            { top: '68%', left: '68%', color: '#69F0AE', size: 14 },
            { top: '78%', left: '18%', color: '#FF8A65', size: 10 },
            { top: '85%', left: '85%', color: '#FFD740', size: 8  },
            { top: '45%', left: '48%', color: '#FF6B9D', size: 8  },
          ].map((dot, i) => (
            <div key={i} style={{
              position: 'absolute', top: dot.top, left: dot.left,
              width: dot.size, height: dot.size, borderRadius: '50%',
              background: dot.color,
              animation: `sparkle ${1.8 + i * 0.3}s ease-in-out infinite`,
              animationDelay: `${i * 0.28}s`,
              pointerEvents: 'none',
              boxShadow: `0 0 8px ${dot.color}, 0 0 14px ${dot.color}55`,
            }} />
          ))}

          {/* Star emojis */}
          {[
            { top: '12%', left: '44%', emoji: '⭐', size: '1.1rem', delay: 0   },
            { top: '30%', left: '62%', emoji: '✨', size: '0.9rem', delay: 0.9 },
            { top: '60%', left: '35%', emoji: '🌟', size: '1rem',   delay: 0.5 },
          ].map((s, i) => (
            <div key={i} style={{
              position: 'absolute', top: s.top, left: s.left, fontSize: s.size, opacity: 0.6,
              animation: `sparkle ${2.2 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${s.delay}s`, pointerEvents: 'none',
            }}>{s.emoji}</div>
          ))}

          {/* Balloons */}
          {bubbles.map((bubble) => {
            const bc = BALLOON_COLORS[bubble.colorIdx];
            return (
              <div
                key={bubble.id}
                onClick={!locked && !bubble.popped ? () => handleBubbleClick(bubble) : undefined}
                style={{
                  position: 'absolute', left: `${bubble.x}%`, top: `${bubble.y}%`,
                  width: 84, height: 104, userSelect: 'none',
                  cursor: (!locked && !bubble.popped) ? 'pointer' : 'default',
                }}
              >
                {!bubble.popped ? (
                  /* ── Floating balloon ── */
                  <div style={{
                    animation: bubble.shaking
                      ? 'shake 0.5s ease'
                      : `balloonFloat ${2.8 + bubble.floatDelay}s ease-in-out infinite`,
                    animationDelay: bubble.shaking ? '0s' : `${bubble.floatDelay}s`,
                  }}>
                    {/* Body */}
                    <div style={{
                      width: 80, height: 86,
                      borderRadius: '50% 50% 48% 48% / 56% 56% 44% 44%',
                      background: bc.fill,
                      boxShadow: `0 10px 28px ${bc.shadow}, inset -10px -8px 18px rgba(0,0,0,0.15), inset 10px 10px 16px rgba(255,255,255,0.28)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: '2.5px solid rgba(255,255,255,0.55)', position: 'relative',
                    }}>
                      <span style={{ fontSize: '2.6rem', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-heading)', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                        {bubble.letter}
                      </span>
                      {/* Main shine */}
                      <div style={{ position: 'absolute', top: 10, left: 14, width: 22, height: 13, borderRadius: '50%', background: 'rgba(255,255,255,0.48)', transform: 'rotate(-32deg)', pointerEvents: 'none' }} />
                      {/* Secondary shine */}
                      <div style={{ position: 'absolute', top: 22, left: 13, width: 10, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.28)', transform: 'rotate(-32deg)', pointerEvents: 'none' }} />
                    </div>
                    {/* Knot */}
                    <div style={{ width: 10, height: 7, margin: '0 auto', background: bc.knot, borderRadius: '50% 50% 45% 45% / 55% 55% 45% 45%' }} />
                    {/* String */}
                    <svg width={14} height={18} style={{ display: 'block', margin: '0 auto' }}>
                      <path d="M7 0 Q4 9 7 18" stroke="rgba(0,0,0,0.22)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    </svg>
                  </div>
                ) : (
                  /* ── Pop burst ── */
                  <div style={{ position: 'relative', width: 84, height: 90, pointerEvents: 'none' }}>
                    {/* Outer shockwave ring */}
                    <div style={{
                      position: 'absolute', top: 0, left: 2,
                      width: 80, height: 80, borderRadius: '50%',
                      border: `7px solid ${bc.shadow}`,
                      animation: 'shockwave 0.52s ease-out forwards',
                    }} />
                    {/* Inner shockwave ring */}
                    <div style={{
                      position: 'absolute', top: 14, left: 16,
                      width: 52, height: 52, borderRadius: '50%',
                      border: '4px solid rgba(255,240,80,0.85)',
                      animation: 'shockwave 0.42s 0.06s ease-out forwards',
                    }} />
                    {/* 8 round particles */}
                    {BURST_ANGLES.map((angle, i) => (
                      <div key={i} style={{
                        position: 'absolute', top: 32, left: 32,
                        width: 13, height: 13, borderRadius: '50%',
                        background: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
                        '--a': `${angle}deg`,
                        animation: 'particleFly 0.55s ease-out forwards',
                        animationDelay: `${i * 0.015}s`,
                        boxShadow: `0 0 7px ${PARTICLE_COLORS[i % PARTICLE_COLORS.length]}`,
                      }} />
                    ))}
                    {/* 8 diamond particles (offset angles) */}
                    {[22,67,112,157,202,247,292,337].map((angle, i) => (
                      <div key={`d${i}`} style={{
                        position: 'absolute', top: 34, left: 34,
                        width: 8, height: 8,
                        background: PARTICLE_COLORS[(i + 3) % PARTICLE_COLORS.length],
                        '--a': `${angle}deg`,
                        transform: 'rotate(45deg)',
                        animation: 'particleFly 0.5s 0.04s ease-out forwards',
                      }} />
                    ))}
                    {/* Center flash emoji */}
                    <div style={{
                      position: 'absolute', top: '50%', left: '50%',
                      fontSize: '2.6rem', lineHeight: 1,
                      animation: 'popFlash 0.48s ease forwards',
                    }}>💥</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
