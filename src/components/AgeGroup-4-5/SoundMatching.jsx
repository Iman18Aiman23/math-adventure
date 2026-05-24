import React, { useState, useEffect, useCallback } from 'react';
import { playSound, playHoverSound } from '../../utils/soundManager';
import SpeechManager from '../../services/SpeechManager';
import confetti from 'canvas-confetti';
import { Volume2, RefreshCw, Trophy } from 'lucide-react';
import BackButton from '../BackButton';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const PHONETIC_SOUNDS = {
  A: { word: 'Apple',     wordBm: 'Epal',      icon: '🍎' },
  B: { word: 'Ball',      wordBm: 'Bola',      icon: '⚽' },
  C: { word: 'Cat',       wordBm: 'Kucing',     icon: '🐱' },
  D: { word: 'Dog',       wordBm: 'Anjing',     icon: '🐶' },
  E: { word: 'Egg',       wordBm: 'Telur',      icon: '🥚' },
  F: { word: 'Fish',      wordBm: 'Ikan',       icon: '🐟' },
  G: { word: 'Gate',      wordBm: 'Pintu',      icon: '🚪' },
  H: { word: 'Hat',       wordBm: 'Topi',       icon: '🎩' },
  I: { word: 'Ice',       wordBm: 'Ais',        icon: '🧊' },
  J: { word: 'Jump',      wordBm: 'Lompat',     icon: '🦘' },
  K: { word: 'Kite',      wordBm: 'Layang-layang', icon: '🪁' },
  L: { word: 'Lion',      wordBm: 'Singa',      icon: '🦁' },
  M: { word: 'Moon',      wordBm: 'Bulan',      icon: '🌙' },
  N: { word: 'Nest',      wordBm: 'Sarang',     icon: '🪺' },
  O: { word: 'Orange',    wordBm: 'Oren',       icon: '🍊' },
  P: { word: 'Pig',       wordBm: 'Babi',       icon: '🐷' },
  Q: { word: 'Queen',     wordBm: 'Permaisuri', icon: '👑' },
  R: { word: 'Rabbit',    wordBm: 'Arnab',      icon: '🐰' },
  S: { word: 'Sun',       wordBm: 'Matahari',   icon: '☀️' },
  T: { word: 'Tiger',     wordBm: 'Harimau',    icon: '🐯' },
  U: { word: 'Umbrella',  wordBm: 'Payung',     icon: '☂️' },
  V: { word: 'Van',       wordBm: 'Van',        icon: '🚐' },
  W: { word: 'Water',     wordBm: 'Air',        icon: '💧' },
  X: { word: 'Xylophone', wordBm: 'Xilofon',   icon: '🎵' },
  Y: { word: 'Yellow',    wordBm: 'Kuning',     icon: '🌻' },
  Z: { word: 'Zebra',     wordBm: 'Zebra',      icon: '🦓' },
};

const CARD_COLORS = [
  { bg: '#FFF0F6', border: '#F48FB1', text: '#C2185B' },
  { bg: '#FFF8E1', border: '#FFD54F', text: '#F57F17' },
  { bg: '#E8F5E9', border: '#A5D6A7', text: '#2E7D32' },
  { bg: '#E3F2FD', border: '#90CAF9', text: '#1565C0' },
];

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

export default function SoundMatching({ onBack, language = 'bm', theme = {} }) {
  const [gameState, setGameState]         = useState('menu');
  const [letterQueue, setLetterQueue]     = useState([]);
  const [queueIdx, setQueueIdx]           = useState(0);
  const [correctLetter, setCorrectLetter] = useState('');
  const [choices, setChoices]             = useState([]);
  const [feedback, setFeedback]           = useState({ idx: null, type: null });
  const [locked, setLocked]               = useState(false);
  const [showHint, setShowHint]           = useState(false);
  const [correctCount, setCorrectCount]   = useState(0);
  const [score, setScore]                 = useState(0);

  const loadRound = useCallback((letter) => {
    const wrongs = ALPHABET.filter(l => l !== letter).sort(() => Math.random() - 0.5).slice(0, 3);
    const all    = shuffle([letter, ...wrongs]);
    setCorrectLetter(letter);
    setChoices(all);
    setFeedback({ idx: null, type: null });
    setShowHint(false);
    setLocked(false);
    setTimeout(() => SpeechManager.speak(`${letter} for ${PHONETIC_SOUNDS[letter].word}`, 'en-US', { rate: 0.4 }), 400);
  }, []);

  const startGame = useCallback(() => {
    const q = shuffle(ALPHABET);
    setLetterQueue(q);
    setQueueIdx(0);
    setCorrectCount(0);
    setScore(0);
    setFeedback({ idx: null, type: null });
    setLocked(false);
    setShowHint(false);
    setGameState('playing');
    setTimeout(() => loadRound(q[0]), 50);
  }, [loadRound]);

  // Load new round whenever queueIdx advances (skip index 0 — startGame handles it)
  useEffect(() => {
    if (gameState === 'playing' && queueIdx > 0 && letterQueue.length > 0) {
      loadRound(letterQueue[queueIdx]);
    }
  }, [queueIdx]);              // eslint-disable-line react-hooks/exhaustive-deps

  const playLetterSound = useCallback(() => {
    if (!correctLetter) return;
    SpeechManager.speak(`${correctLetter} for ${PHONETIC_SOUNDS[correctLetter].word}`, 'en-US', { rate: 0.4 });
  }, [correctLetter]);

  const handleChoice = useCallback((letter, idx) => {
    if (locked || !correctLetter) return;
    setLocked(true);

    if (letter === correctLetter) {
      setFeedback({ idx, type: 'correct' });
      playSound('correct');
      setScore(s => s + 100);
      const next = correctCount + 1;
      setCorrectCount(next);
      setTimeout(() => {
        if (next >= ALPHABET.length) {
          confetti({ particleCount: 150, spread: 90, origin: { y: 0.55 } });
          setGameState('won');
        } else {
          setQueueIdx(i => i + 1);
        }
      }, 900);
    } else {
      setFeedback({ idx, type: 'wrong' });
      playSound('wrong');
      setShowHint(true);
      setTimeout(() => {
        setFeedback({ idx: null, type: null });
        setLocked(false);
      }, 900);
    }
  }, [locked, correctLetter, correctCount]);

  const handleRestart = useCallback(() => startGame(), [startGame]);

  const progress = (correctCount / ALPHABET.length) * 100;
  const currentData = correctLetter ? PHONETIC_SOUNDS[correctLetter] : null;

  // ── Menu ─────────────────────────────────────────────────────────
  const heroBg     = theme.heroBg     || 'linear-gradient(135deg, #1565C0 0%, #1CB0F6 50%, #7C4DFF 100%)';
  const heroBorder = theme.heroBorder || '#90CAF9';
  const swatch     = theme.swatch     || '#1565C0';

  if (gameState === 'menu') {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', flex: 1,
        background: '#F8FAFC',
      }}>
        <style>{`
          .sm-start-btn:hover { transform: translateY(-3px) scale(1.04) !important; }
          .sm-start-btn:active { transform: translateY(2px) scale(0.97) !important; }
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
              🎵 GAME 🎵
            </div>
            <h1 style={{
              fontWeight: 900, fontSize: '2.2rem', margin: '0 0 0.75rem',
              background: 'linear-gradient(135deg, #fff 0%, #E1F5FE 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.2))',
              fontFamily: 'var(--font-heading)',
            }}>
              {language === 'bm' ? 'Padanan Bunyi' : 'Sound Matching'}
            </h1>
            <p style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', margin: 0, lineHeight: 1.5 }}>
              {language === 'bm'
                ? 'Dengar bunyi dan pecahkan huruf yang betul!'
                : 'Listen and find the correct letter!'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              ['👂', language === 'bm' ? '26 Huruf'   : '26 Letters'],
              ['🎵', language === 'bm' ? '4 Pilihan'  : '4 Choices'],
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
            className="sm-start-btn"
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
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '1.5rem', gap: '1.25rem',
        }}>
          <Trophy size={80} color="#FFC800" />
          <h1 style={{ fontWeight: 900, fontSize: '2rem', color: '#58CC02', margin: 0, fontFamily: 'var(--font-heading)' }}>
            {language === 'bm' ? '🎉 Syabas!' : '🎉 Excellent Listener!'}
          </h1>
          <p style={{ color: '#64748B', fontWeight: 700, margin: 0, fontSize: '1.05rem', textAlign: 'center' }}>
            {language === 'bm' ? `Kamu padankan semua 26 huruf dengan betul!` : `You matched all 26 letters perfectly!`}
          </p>
          <div style={{
            background: '#fff', border: '2px solid #E2E8F0', borderRadius: '20px',
            padding: '1rem 2rem', display: 'flex', gap: '2rem',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>{language === 'bm' ? 'Padanan' : 'Matches'}</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#1CB0F6' }}>26/26</div>
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
        @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }
        @keyframes soundRing { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(1.5);opacity:0} }
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
              background: 'linear-gradient(90deg, #4FC3F7, #7C4DFF)',
              width: `${progress}%`,
              transition: 'width 0.4s cubic-bezier(0.4,0,0.2,1)',
            }} />
          </div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94A3B8', textAlign: 'right' }}>
            {correctCount} / {ALPHABET.length}
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

      {/* Content */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-evenly',
        padding: '0.5rem 1.25rem 1rem', gap: '1rem', overflowY: 'auto',
      }}>
        {/* Listen section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
          <p style={{ margin: 0, fontSize: '0.82rem', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            {language === 'bm' ? 'Dengar dan ketuk huruf yang betul!' : 'Listen and tap the correct letter!'}
          </p>

          {/* Sound wave button */}
          <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              position: 'absolute', inset: '-16px', borderRadius: '50%',
              border: '3px solid rgba(79,195,247,0.35)',
              animation: 'soundRing 2s ease-out infinite',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', inset: '-28px', borderRadius: '50%',
              border: '3px solid rgba(124,77,255,0.25)',
              animation: 'soundRing 2s ease-out infinite',
              animationDelay: '0.7s',
              pointerEvents: 'none',
            }} />
            <button
              onClick={playLetterSound}
              onMouseEnter={playHoverSound}
              style={{
                width: 120, height: 120, borderRadius: '50%',
                background: 'linear-gradient(135deg, #4FC3F7, #7C4DFF)',
                boxShadow: '0 8px 0 rgba(0,0,0,0.18), 0 16px 40px rgba(79,195,247,0.4)',
                border: 'none', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.25rem',
                color: '#fff',
              }}
            >
              <Volume2 size={36} />
              <span style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.08em' }}>
                {language === 'bm' ? 'DENGAR' : 'LISTEN'}
              </span>
            </button>
          </div>

          {/* Hint */}
          {showHint && correctLetter && (
            <div style={{
              background: '#FFF9C4', border: '2px solid #FFD54F',
              borderRadius: '14px', padding: '0.6rem 1.2rem',
              fontWeight: 800, color: '#F57F17', fontSize: '1rem',
              fontFamily: 'var(--font-heading)',
            }}>
              {language === 'bm' ? `Petunjuk: Huruf ` : `Hint: The letter is `}
              <span style={{ fontSize: '1.3rem' }}>{correctLetter}</span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', maxWidth: 480 }}>
          <div style={{ flex: 1, height: 1, background: '#E2E8F0' }} />
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {language === 'bm' ? 'Pilih Huruf' : 'Choose Letter'}
          </span>
          <div style={{ flex: 1, height: 1, background: '#E2E8F0' }} />
        </div>

        {/* Choice grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', width: '100%', maxWidth: 480 }}>
          {choices.map((letter, idx) => {
            const isCorrect = feedback.idx === idx && feedback.type === 'correct';
            const isWrong   = feedback.idx === idx && feedback.type === 'wrong';
            const isHintLit = showHint && letter === correctLetter && !isCorrect;
            const col = CARD_COLORS[idx % CARD_COLORS.length];
            return (
              <button
                key={`${correctLetter}-${idx}`}
                onClick={() => { playHoverSound(); handleChoice(letter, idx); }}
                disabled={locked}
                style={{
                  background: isCorrect ? '#D7FFB8' : isWrong ? '#FFDFE0' : isHintLit ? '#FFFDE7' : '#FFFFFF',
                  border: `3px solid ${isCorrect ? '#58CC02' : isWrong ? '#FF4B4B' : isHintLit ? '#FFD54F' : '#E2E8F0'}`,
                  borderRadius: '20px',
                  padding: '1.5rem 0.75rem',
                  boxShadow: isCorrect
                    ? '0 6px 0 #46A302, 0 10px 24px rgba(88,204,2,0.2)'
                    : isWrong
                    ? '0 6px 0 #CC0000, 0 10px 24px rgba(255,75,75,0.2)'
                    : '0 4px 0 #CBD5E1, 0 8px 20px rgba(0,0,0,0.06)',
                  cursor: locked ? 'default' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  animation: isWrong ? 'shake 0.4s ease-in-out' : 'none',
                  transition: 'transform 0.15s cubic-bezier(0.34,1.56,0.64,1), border-color 0.2s, box-shadow 0.2s, background 0.2s',
                  fontFamily: 'var(--font-heading)',
                  minHeight: 90,
                }}
                onMouseEnter={(e) => { if (!locked) { playHoverSound(); e.currentTarget.style.transform = 'translateY(-4px)'; } }}
                onMouseLeave={(e) => { if (!locked) e.currentTarget.style.transform = 'translateY(0)'; }}
                onMouseDown={(e)  => { if (!locked) e.currentTarget.style.transform = 'translateY(1px)'; }}
                onMouseUp={(e)    => { if (!locked) e.currentTarget.style.transform = 'translateY(-4px)'; }}
              >
                <span style={{
                  fontSize: '3rem', fontWeight: 900,
                  color: isCorrect ? '#46A302' : isWrong ? '#CC0000' : col.text,
                  transition: 'color 0.2s',
                }}>
                  {isCorrect ? '✓' : isWrong ? '✕' : letter}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
