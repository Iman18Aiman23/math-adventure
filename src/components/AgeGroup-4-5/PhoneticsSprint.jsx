import React, { useState, useEffect, useCallback, useRef } from 'react';
import { playSound, playHoverSound } from '../../utils/soundManager';
import confetti from 'canvas-confetti';
import { RefreshCw, Trophy } from 'lucide-react';
import BackButton from '../BackButton';

const PHONETIC_DATA = {
  A: { word: 'Apple',     wordBm: 'Epal',           icon: '🍎' },
  B: { word: 'Ball',      wordBm: 'Bola',            icon: '⚽' },
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

const CARD_COLORS = [
  { bg: '#FFF0F6', border: '#F48FB1', text: '#C2185B' },
  { bg: '#FFF8E1', border: '#FFD54F', text: '#F57F17' },
  { bg: '#E8F5E9', border: '#A5D6A7', text: '#2E7D32' },
  { bg: '#E3F2FD', border: '#90CAF9', text: '#1565C0' },
];

const TOTAL_ROUNDS = 26;
const ALL_KEYS = Object.keys(PHONETIC_DATA);

export default function PhoneticsSprint({ onBack, language = 'bm', theme = {} }) {
  const [gameState, setGameState]             = useState('menu');
  const [score, setScore]                     = useState(0);
  const [obstacles, setObstacles]             = useState([]);
  const [collected, setCollected]             = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isAnswered, setIsAnswered]           = useState(false);
  const [feedback, setFeedback]               = useState({ idx: null, type: null });
  const [gameTime, setGameTime]               = useState(0);
  const usedQuestionsRef = useRef(new Set());

  useEffect(() => {
    let timer;
    if (gameState === 'playing') {
      timer = setInterval(() => setGameTime(t => t + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [gameState]);

  const generateQuestion = useCallback(() => {
    // Pick correct answer from unused questions; reset pool if exhausted
    const available = ALL_KEYS.filter(k => !usedQuestionsRef.current.has(k));
    const pool = available.length >= 4 ? available : ALL_KEYS;
    if (available.length < 4) usedQuestionsRef.current = new Set();

    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const correct  = shuffled[0];
    usedQuestionsRef.current.add(correct);

    // Pick 3 different wrong options from all keys
    const wrongs = ALL_KEYS.filter(k => k !== correct).sort(() => Math.random() - 0.5).slice(0, 3);
    const obs = [correct, ...wrongs]
      .map((letter, idx) => ({ id: idx, letter, isCorrect: letter === correct }))
      .sort(() => Math.random() - 0.5); // randomize position of correct answer

    setObstacles(obs);
    setCurrentQuestion(correct);
    setIsAnswered(false);
    setFeedback({ idx: null, type: null });
  }, []);

  useEffect(() => {
    if (gameState === 'playing') generateQuestion();
  }, [gameState]);

  const handleObstacleClick = useCallback((obstacle, idx) => {
    if (isAnswered) return;
    setIsAnswered(true);

    if (obstacle.isCorrect) {
      setFeedback({ idx, type: 'correct' });
      playSound('correct');
      setScore(s => s + 100);
      const next = collected.length + 1;
      setCollected(prev => [...prev, obstacle.letter]);
      setTimeout(() => {
        if (next >= TOTAL_ROUNDS) {
          confetti({ particleCount: 150, spread: 90, origin: { y: 0.55 } });
          setGameState('won');
        } else {
          generateQuestion();
        }
      }, 800);
    } else {
      setFeedback({ idx, type: 'wrong' });
      playSound('wrong');
      setTimeout(() => generateQuestion(), 900);
    }
  }, [isAnswered, collected, generateQuestion]);

  const handleRestart = useCallback(() => {
    usedQuestionsRef.current = new Set();
    setScore(0);
    setCollected([]);
    setGameTime(0);
    setFeedback({ idx: null, type: null });
    setGameState('playing');
  }, []);

  const progress   = (collected.length / TOTAL_ROUNDS) * 100;
  const mins       = Math.floor(gameTime / 60);
  const secs       = (gameTime % 60).toString().padStart(2, '0');
  const currentData = currentQuestion ? PHONETIC_DATA[currentQuestion] : null;

  const heroBg     = theme.heroBg     || 'linear-gradient(135deg, #1B5E20 0%, #43A047 50%, #F9A825 100%)';
  const heroBorder = theme.heroBorder || '#A5D6A7';
  const swatch     = theme.swatch     || '#2E7D32';

  // ── Menu ─────────────────────────────────────────────────────────
  if (gameState === 'menu') {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', flex: 1,
        background: '#F8FAFC',
      }}>
        <style>{`
          .ps-start-btn:hover { transform: translateY(-3px) scale(1.04) !important; }
          .ps-start-btn:active { transform: translateY(2px) scale(0.97) !important; }
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
              🚗 GAME 🚗
            </div>
            <h1 style={{
              fontWeight: 900, fontSize: '2.2rem', margin: '0 0 0.75rem',
              color: '#fff',
              filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.2))',
              fontFamily: 'var(--font-heading)',
            }}>
              {language === 'bm' ? 'Lumba Fonetik' : 'Phonics Sprint'}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.92)', fontWeight: 700, fontSize: '0.95rem', margin: 0, lineHeight: 1.5 }}>
              {language === 'bm'
                ? 'Ketuk item yang betul untuk berlari ke garisan penamat!'
                : 'Tap the correct item to sprint to the finish line!'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              ['🚗', language === 'bm' ? '26 Item'    : '26 Items'],
              ['⏱️', language === 'bm' ? 'Perlumbaan' : 'Race'],
              ['⭐', language === 'bm' ? 'Kumpul Mata' : 'Earn Points'],
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
            className="ps-start-btn"
            onClick={() => {
              playHoverSound();
              usedQuestionsRef.current = new Set();
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
          <div style={{ fontSize: '4rem' }}>🏁</div>
          <h1 style={{ fontWeight: 900, fontSize: '2rem', color: '#58CC02', margin: 0, fontFamily: 'var(--font-heading)' }}>
            {language === 'bm' ? '🏆 Juara Sprint!' : '🏆 Sprint Champion!'}
          </h1>
          <p style={{ color: '#64748B', fontWeight: 700, margin: 0, fontSize: '1.05rem', textAlign: 'center' }}>
            {language === 'bm' ? 'Kamu habiskan perlumbaan fonetik!' : 'You completed the phonics sprint!'}
          </p>
          <div style={{
            background: '#fff', border: '2px solid #E2E8F0', borderRadius: '20px',
            padding: '1rem 1.5rem', display: 'flex', gap: '1.5rem',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>{language === 'bm' ? 'Item' : 'Items'}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#66BB6A' }}>26/26</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>{language === 'bm' ? 'Masa' : 'Time'}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#F9A825' }}>{mins}:{secs}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>Score</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#58CC02' }}>{score}</div>
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
              {language === 'bm' ? 'Lumba Lagi' : 'Sprint Again'}
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
        @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }
        @keyframes runnerBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
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
              background: 'linear-gradient(90deg, #66BB6A, #F9A825)',
              width: `${progress}%`,
              transition: 'width 0.5s cubic-bezier(0.34,1.56,0.64,1)',
            }} />
          </div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94A3B8', textAlign: 'right' }}>
            {collected.length} / {TOTAL_ROUNDS}
          </div>
        </div>
        <div style={{
          background: '#FFF7ED', border: '2px solid #FED7AA',
          borderRadius: '999px', padding: '0.2rem 0.65rem',
          fontWeight: 800, fontSize: '0.85rem', color: '#EA580C', flexShrink: 0,
        }}>
          ⏱️ {mins}:{secs}
        </div>
      </div>

      {/* Content */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-evenly',
        padding: '0.5rem 1.25rem 1rem', gap: '0.75rem', overflowY: 'auto',
      }}>
        {/* Racing track */}
        <div style={{
          width: '100%', maxWidth: 480,
          background: '#fff', border: '2px solid #E2E8F0',
          borderRadius: '18px', padding: '0.75rem 1rem',
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              fontSize: '1.8rem', flexShrink: 0,
              animation: 'runnerBounce 0.7s ease-in-out infinite',
            }}>🚗</div>
            <div style={{
              flex: 1, height: 20, borderRadius: 999,
              background: '#F1F5F9', overflow: 'hidden',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
            }}>
              <div style={{
                height: '100%', borderRadius: 999,
                background: 'linear-gradient(90deg, #66BB6A, #43A047)',
                width: `${progress}%`,
                transition: 'width 0.5s cubic-bezier(0.34,1.56,0.64,1)',
                boxShadow: '0 0 8px rgba(102,187,106,0.6)',
              }} />
            </div>
            <div style={{ fontSize: '1.8rem', flexShrink: 0 }}>🏁</div>
          </div>
          <div style={{
            textAlign: 'center', marginTop: '0.35rem',
            fontSize: '0.78rem', fontWeight: 700, color: '#94A3B8',
          }}>
            {language === 'bm'
              ? `Kumpul ${TOTAL_ROUNDS - collected.length} lagi item!`
              : `Collect ${TOTAL_ROUNDS - collected.length} more items!`}
          </div>
        </div>

        {/* Question card */}
        {currentData && (
          <div style={{
            background: '#fff', border: '3px solid #FED7AA',
            borderRadius: '20px', padding: '0.9rem 1.5rem',
            textAlign: 'center', width: '100%', maxWidth: 480,
            boxShadow: '0 4px 0 #FED7AA, 0 8px 20px rgba(0,0,0,0.08)',
          }}>
            <p style={{ margin: '0 0 0.3rem', fontSize: '0.82rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              {language === 'bm' ? '⚡ Ketuk item yang betul!' : '⚡ Tap the correct item!'}
            </p>
            <div style={{ fontSize: '3.2rem', fontWeight: 900, fontFamily: 'var(--font-heading)', lineHeight: 1.1, color: '#1E293B' }}>
              {currentData.icon} {currentQuestion}
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#EA580C', marginTop: '0.2rem' }}>
              {language === 'bm' ? currentData.wordBm : currentData.word}
            </div>
          </div>
        )}

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', maxWidth: 480 }}>
          <div style={{ flex: 1, height: 1, background: '#E2E8F0' }} />
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {language === 'bm' ? 'Pilih Jawapan' : 'Choose Answer'}
          </span>
          <div style={{ flex: 1, height: 1, background: '#E2E8F0' }} />
        </div>

        {/* Obstacle choices — 2×2 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', width: '100%', maxWidth: 480 }}>
          {obstacles.map((obstacle, idx) => {
            const isCorrect = feedback.idx === idx && feedback.type === 'correct';
            const isWrong   = feedback.idx === idx && feedback.type === 'wrong';
            const data = PHONETIC_DATA[obstacle.letter];
            const col  = CARD_COLORS[idx % CARD_COLORS.length];
            return (
              <button
                key={obstacle.id}
                onClick={() => { playHoverSound(); handleObstacleClick(obstacle, idx); }}
                disabled={isAnswered}
                style={{
                  background: isCorrect ? '#D7FFB8' : isWrong ? '#FFDFE0' : '#FFFFFF',
                  border: `3px solid ${isCorrect ? '#58CC02' : isWrong ? '#FF4B4B' : col.border}`,
                  borderRadius: '20px',
                  padding: '1rem 0.75rem',
                  boxShadow: isCorrect
                    ? '0 6px 0 #46A302, 0 10px 24px rgba(88,204,2,0.2)'
                    : isWrong
                    ? '0 6px 0 #CC0000, 0 10px 24px rgba(255,75,75,0.2)'
                    : `0 4px 0 ${col.border}, 0 8px 20px rgba(0,0,0,0.06)`,
                  cursor: isAnswered ? 'default' : 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.3rem',
                  animation: isWrong ? 'shake 0.4s ease-in-out' : 'none',
                  transition: 'transform 0.15s cubic-bezier(0.34,1.56,0.64,1), border-color 0.2s, box-shadow 0.2s, background 0.2s',
                  fontFamily: 'var(--font-heading)',
                  minHeight: 90,
                }}
                onMouseEnter={(e) => { if (!isAnswered) { playHoverSound(); e.currentTarget.style.transform = 'translateY(-4px)'; } }}
                onMouseLeave={(e) => { if (!isAnswered) e.currentTarget.style.transform = 'translateY(0)'; }}
                onMouseDown={(e)  => { if (!isAnswered) e.currentTarget.style.transform = 'translateY(1px)'; }}
                onMouseUp={(e)    => { if (!isAnswered) e.currentTarget.style.transform = 'translateY(-4px)'; }}
              >
                <span style={{ fontSize: '2rem', lineHeight: 1 }}>
                  {isCorrect ? '✓' : isWrong ? '✕' : data?.icon}
                </span>
                <span style={{
                  fontSize: '0.85rem', fontWeight: 800,
                  color: isCorrect ? '#46A302' : isWrong ? '#CC0000' : col.text,
                }}>
                  {language === 'bm' ? data?.wordBm : data?.word}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
