import React, { useState, useEffect, useCallback } from 'react';
import { playSound } from '../../utils/soundManager';
import SpeechManager from '../../services/SpeechManager';
import confetti from 'canvas-confetti';
import { LOCALIZATION } from '../../utils/localization';
import { Volume2, Heart, RotateCcw, ArrowLeft } from 'lucide-react';
import { useGameStateContext } from '../../App';
import { getGameData, addCorrectAnswer, deductHeart } from '../../utils/gameStatsManager';
import BackButton from '../BackButton';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const PHONETIC_SOUNDS = {
  'A': { sound: 'æ', word: 'Apple' },
  'B': { sound: 'b', word: 'Ball' },
  'C': { sound: 'k', word: 'Cat' },
  'D': { sound: 'd', word: 'Dog' },
  'E': { sound: 'ɛ', word: 'Egg' },
  'F': { sound: 'f', word: 'Fish' },
  'G': { sound: 'g', word: 'Gate' },
  'H': { sound: 'h', word: 'Hat' },
  'I': { sound: 'ɪ', word: 'Ice' },
  'J': { sound: 'dʒ', word: 'Jump' },
  'K': { sound: 'k', word: 'Kite' },
  'L': { sound: 'l', word: 'Lion' },
  'M': { sound: 'm', word: 'Moon' },
  'N': { sound: 'n', word: 'Nest' },
  'O': { sound: 'ɑ', word: 'Orange' },
  'P': { sound: 'p', word: 'Pig' },
  'Q': { sound: 'kw', word: 'Queen' },
  'R': { sound: 'r', word: 'Rabbit' },
  'S': { sound: 's', word: 'Sun' },
  'T': { sound: 't', word: 'Tiger' },
  'U': { sound: 'ʌ', word: 'Umbrella' },
  'V': { sound: 'v', word: 'Van' },
  'W': { sound: 'w', word: 'Water' },
  'X': { sound: 'ks', word: 'Xylophone' },
  'Y': { sound: 'j', word: 'Yellow' },
  'Z': { sound: 'z', word: 'Zebra' }
};

export default function PhoneticsPop({ onBack, onHome, isMuted, language }) {
  const t = LOCALIZATION[language].reading || LOCALIZATION[language];
  const gameState = useGameStateContext();
  const [gameState_, setGameState_] = useState('intro');
  const [currentLetterIdx, setCurrentLetterIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [gems, setGems] = useState(0);
  const [stars, setStars] = useState(0);
  const [bubbles, setBubbles] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const gameData = getGameData();
    setHearts(gameData.hearts);
    setGems(gameData.gems);
    setStars(gameData.stars);
  }, []);

  const generateBubbles = useCallback(() => {
    const currentLetter = ALPHABET[currentLetterIdx];

    const wrongLetters = ALPHABET.filter((_, idx) => idx !== currentLetterIdx)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const allLetters = [currentLetter, ...wrongLetters].sort(() => Math.random() - 0.5);

    const newBubbles = allLetters.map((letter, idx) => ({
      id: `${currentLetterIdx}-${idx}-${Date.now()}`,
      letter,
      x: Math.random() * 70 + 15,
      y: Math.random() * 60 + 20,
      isCorrect: letter === currentLetter,
      popped: false,
      size: 70
    }));

    setBubbles(newBubbles);
    setIsLocked(false);
  }, [currentLetterIdx]);

  useEffect(() => {
    if (gameState_ === 'playing') {
      const currentLetter = ALPHABET[currentLetterIdx];

      const wrongLetters = ALPHABET.filter((_, idx) => idx !== currentLetterIdx)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      const allLetters = [currentLetter, ...wrongLetters].sort(() => Math.random() - 0.5);

      const newBubbles = allLetters.map((letter, idx) => ({
        id: `${currentLetterIdx}-${idx}-${Date.now()}`,
        letter,
        x: Math.random() * 70 + 15,
        y: Math.random() * 60 + 20,
        isCorrect: letter === currentLetter,
        popped: false,
        size: 70
      }));

      setBubbles(newBubbles);
      setIsLocked(false);
    }
  }, [gameState_, currentLetterIdx]);

  const handleBubbleClick = useCallback((bubble) => {
    if (isLocked || bubble.popped) return;

    setIsLocked(true);

    if (bubble.isCorrect) {
      playSound('correct');
      const newBubbles = bubbles.map(b =>
        b.id === bubble.id ? { ...b, popped: true } : b
      );
      setBubbles(newBubbles);
      setScore(s => s + 100);

      const gameData = addCorrectAnswer();
      setGems(gameData.gems);
      setStars(gameData.stars);

      const newCount = correctCount + 1;
      setCorrectCount(newCount);

      setTimeout(() => {
        if (newCount >= ALPHABET.length) {
          playSound('correct');
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
          });
          setGameState_('won');
        } else {
          setCurrentLetterIdx(newCount);
          setIsLocked(false);
        }
      }, 500);
    } else {
      playSound('wrong');
      const gameData = deductHeart();
      setHearts(gameData.hearts);

      if (gameData.hearts <= 0) {
        setTimeout(() => {
          setGameState_('lost');
        }, 500);
      } else {
        setTimeout(() => {
          setIsLocked(false);
          generateBubbles();
        }, 800);
      }
    }
  }, [bubbles, isLocked, correctCount]);

  const playLetterSound = useCallback(() => {
    const letter = ALPHABET[currentLetterIdx];
    const data = PHONETIC_SOUNDS[letter];
    if (data) {
      SpeechManager.speak(`${letter} for ${data.word}`, 'en-US', { rate: 0.4 });
    }
  }, [currentLetterIdx]);

  const handleRestart = useCallback(() => {
    setCurrentLetterIdx(0);
    setScore(0);
    setCorrectCount(0);
    setHearts(3);
    setGameState_('playing');
  }, []);

  const currentLetter = ALPHABET[currentLetterIdx];
  const currentSound = PHONETIC_SOUNDS[currentLetter];

  if (gameState_ === 'intro') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#FFF8E1' }}>
        <BackButton onClick={onBack} />
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem 1rem', gap: '1.5rem', textAlign: 'center' }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #4FC3F7, #66BB6A, #FFD54F, #FF6B9D)',
            backgroundSize: '300% 300%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            🎈 Phonics Pop
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#636E72', fontWeight: 600, maxWidth: '500px' }}>
            Pop the bubbles to match the letter sounds! Learn all 26 letters while having fun.
          </p>

          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '2rem 1.5rem',
            maxWidth: '500px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            marginTop: '1rem',
            textAlign: 'left'
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem', color: '#4FC3F7' }}>
              💡 How to Play:
            </h3>
            <ol style={{
              paddingLeft: '1.5rem',
              fontWeight: 600,
              color: '#636E72',
              lineHeight: 2,
              fontSize: '1rem'
            }}>
              <li>👀 Look at the letter shown at the top</li>
              <li>🎵 Hear the sound it makes</li>
              <li>🎈 Pop the bubble with the SAME letter</li>
              <li>⭐ Get 100 points for each correct bubble</li>
              <li>❤️ You have 3 lives - don't lose them all!</li>
              <li>🎉 Pop all 26 letters to win!</li>
            </ol>
          </div>

          <button
            onClick={() => {
              setGameState_('playing');
            }}
            style={{
              padding: '1rem 3rem',
              fontSize: '1.2rem',
              fontWeight: 800,
              fontFamily: "var(--font-heading)",
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              color: 'white',
              background: 'linear-gradient(135deg, #FF6B9D, #E91E63)',
              boxShadow: '0 6px 30px rgba(255,107,157,0.4)',
              marginTop: '2rem'
            }}
          >
            Start Game
          </button>

          <button
            onClick={onBack}
            style={{
              padding: '0.7rem 1.5rem',
              fontSize: '0.95rem',
              fontWeight: 700,
              fontFamily: "var(--font-heading)",
              border: '2px solid #ddd',
              borderRadius: '20px',
              cursor: 'pointer',
              background: 'white',
              color: '#2D3436'
            }}
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  if (gameState_ === 'won') {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.45)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        zIndex: 200
      }}>
        <div style={{
          background: 'white',
          borderRadius: '30px',
          padding: '2.5rem 2rem',
          textAlign: 'center',
          maxWidth: '400px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          animation: 'modalPop 0.5s cubic-bezier(0.34,1.56,0.64,1)'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 800,
            marginBottom: '0.5rem',
            background: 'linear-gradient(135deg, #FFD700, #FF9800)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            🎉 Phonics Master!
          </h2>
          <p style={{ color: '#636E72', marginBottom: '1.5rem', fontWeight: 600 }}>
            You learned all 26 letters!
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.7rem',
            margin: '1.2rem 0'
          }}>
            <div style={{ background: '#f8f9fa', borderRadius: '14px', padding: '0.7rem' }}>
              <div style={{ fontSize: '0.82rem', color: '#636E72', fontWeight: 600 }}>Score</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FF6B9D' }}>{score}</div>
            </div>
            <div style={{ background: '#f8f9fa', borderRadius: '14px', padding: '0.7rem' }}>
              <div style={{ fontSize: '0.82rem', color: '#636E72', fontWeight: 600 }}>Letters</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{correctCount}/26</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.7rem', justifyContent: 'center', marginTop: '1.2rem' }}>
            <button
              onClick={() => onBack?.()}
              style={{
                padding: '0.6rem 1.4rem',
                borderRadius: '14px',
                border: '2px solid #ddd',
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                background: 'white',
                color: '#2D3436',
                transition: 'all 0.25s'
              }}
            >
              <ArrowLeft size={16} style={{ display: 'inline', marginRight: '0.35rem' }} /> Menu
            </button>
            <button
              onClick={handleRestart}
              style={{
                padding: '0.6rem 1.4rem',
                borderRadius: '14px',
                border: '2px solid #4FC3F7',
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                background: 'linear-gradient(135deg, #4FC3F7, #0288D1)',
                color: 'white',
                transition: 'all 0.25s'
              }}
            >
              <RotateCcw size={16} style={{ display: 'inline', marginRight: '0.35rem' }} /> Play Again
            </button>
          </div>
          <style>{`
            @keyframes modalPop {
              0% { transform: scale(0.4); opacity: 0; }
              100% { transform: scale(1); opacity: 1; }
            }
          `}</style>
        </div>
      </div>
    );
  }

  if (gameState_ === 'lost') {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.45)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        zIndex: 200
      }}>
        <div style={{
          background: 'white',
          borderRadius: '30px',
          padding: '2.5rem 2rem',
          textAlign: 'center',
          maxWidth: '400px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            💪 Keep Trying!
          </h2>
          <p style={{ color: '#636E72', marginBottom: '1.5rem', fontWeight: 600 }}>
            You've learned {correctCount} letters. Keep practicing!
          </p>
          <div style={{ display: 'flex', gap: '0.7rem', justifyContent: 'center', marginTop: '1.2rem' }}>
            <button
              onClick={() => onBack?.()}
              style={{
                padding: '0.6rem 1.4rem',
                borderRadius: '14px',
                border: '2px solid #ddd',
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                background: 'white',
                color: '#2D3436'
              }}
            >
              Menu
            </button>
            <button
              onClick={handleRestart}
              style={{
                padding: '0.6rem 1.4rem',
                borderRadius: '14px',
                border: '2px solid #FF6B9D',
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                background: 'linear-gradient(135deg, #FFB0B0, #FF8787)',
                color: 'white'
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const BUBBLE_COLORS = [
    'linear-gradient(135deg, #FF6B9D, #E91E63, #C2185B)',
    'linear-gradient(135deg, #FFD54F, #FFB300, #FF6F00)',
    'linear-gradient(135deg, #4FC3F7, #29B6F6, #0277BD)',
    'linear-gradient(135deg, #BA68C8, #9C27B0, #6A1B9A)'
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: 'linear-gradient(135deg, #FFE5F1 0%, #E1F5FE 50%, #FFF9C4 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Decorations */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {['🎈', '⭐', '🌈', '✨', '🎉', '🌟', '💫', '🎊'].map((emoji, i) => (
          <div key={i} style={{
            position: 'absolute',
            fontSize: '1.8rem',
            opacity: 0.4,
            top: `${(i * 13 + 5) % 90}%`,
            left: `${(i * 17 + 8) % 95}%`,
            animation: `floatBg ${4 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`
          }}>{emoji}</div>
        ))}
      </div>

      <BackButton onClick={onBack} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', position: 'relative', zIndex: 1, minHeight: 0 }}>
        {/* HEADER - Stats */}
        <div style={{
          flex: 'none',
          padding: '0.4rem 1rem 0.3rem',
          display: 'flex',
          gap: '0.7rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #FFFFFF, #FFF3E0)',
            borderRadius: '20px',
            padding: '0.6rem 1.3rem',
            boxShadow: '0 6px 20px rgba(255,107,157,0.25), 0 0 0 3px rgba(255,255,255,0.6)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 700,
            border: '2px solid #FFD54F',
            animation: 'statPulse 2s ease-in-out infinite'
          }}>
            <span style={{ fontSize: '1.5rem' }}>📊</span>
            <span style={{
              fontWeight: 800,
              fontSize: '1.6rem',
              minWidth: '2ch',
              background: 'linear-gradient(135deg, #FF6B9D, #E91E63)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {correctCount}/26
            </span>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #FFFFFF, #FFF9C4)',
            borderRadius: '20px',
            padding: '0.6rem 1.3rem',
            boxShadow: '0 6px 20px rgba(255,213,79,0.35), 0 0 0 3px rgba(255,255,255,0.6)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 700,
            border: '2px solid #FF6B9D'
          }}>
            <span style={{ fontSize: '1.5rem', animation: 'spinSlow 3s linear infinite', display: 'inline-block' }}>⭐</span>
            <span style={{
              fontWeight: 800,
              fontSize: '1.6rem',
              minWidth: '3ch',
              background: 'linear-gradient(135deg, #FFB300, #FF6F00)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {score}
            </span>
          </div>
        </div>

        {/* BODY - Game Area */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0.3rem 1rem',
          width: '100%',
          position: 'relative',
          minHeight: 0,
          overflow: 'hidden'
        }}>
          {/* Letter Display */}
          <div style={{ textAlign: 'center', marginBottom: '0.5rem', flex: 'none' }}>
            <div style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 900,
              marginBottom: '0.1rem',
              fontFamily: "var(--font-heading)",
              background: 'linear-gradient(135deg, #FF6B9D, #FFD54F, #4FC3F7, #BA68C8)',
              backgroundSize: '300% 300%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'rainbowShift 4s ease infinite, bounceLetter 1.5s ease-in-out infinite',
              textShadow: '0 8px 30px rgba(255,107,157,0.3)',
              lineHeight: 1
            }}>
              {currentLetter}
            </div>
            <p style={{
              color: '#FF6B9D',
              fontWeight: 800,
              marginBottom: '0.4rem',
              fontSize: '1rem',
              fontFamily: "var(--font-heading)"
            }}>
              ✨ {currentSound.word} ✨
            </p>
            <button
              onClick={playLetterSound}
              style={{
                padding: '0.5rem 1.2rem',
                borderRadius: '50px',
                border: 'none',
                background: 'linear-gradient(135deg, #4FC3F7, #BA68C8, #FF6B9D)',
                backgroundSize: '200% 200%',
                color: 'white',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.9rem',
                boxShadow: '0 6px 18px rgba(186,104,200,0.5)',
                animation: 'rainbowShift 3s ease infinite, soundPulse 1.8s ease-in-out infinite',
                fontFamily: "var(--font-heading)",
                transform: 'scale(1)',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Volume2 size={18} /> Play Sound 🔊
            </button>
          </div>

          {/* Bubbles */}
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '550px',
            flex: 1,
            minHeight: '240px',
            maxHeight: '420px',
            background: 'linear-gradient(180deg, rgba(186,104,200,0.15), rgba(79,195,247,0.15), rgba(102,187,106,0.15))',
            borderRadius: '25px',
            border: '4px dashed #BA68C8',
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(186,104,200,0.2), inset 0 0 30px rgba(255,255,255,0.5)'
          }}>
            {/* Floating sparkles inside */}
            {['✨', '⭐', '💫'].map((s, i) => (
              <div key={`s-${i}`} style={{
                position: 'absolute',
                fontSize: '1.2rem',
                top: `${20 + i * 25}%`,
                left: `${15 + i * 30}%`,
                animation: `sparkle ${2 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
                opacity: 0.5,
                pointerEvents: 'none'
              }}>{s}</div>
            ))}
            {bubbles.map((bubble, idx) => (
              <div
                key={bubble.id}
                onClick={() => handleBubbleClick(bubble)}
                style={{
                  position: 'absolute',
                  left: `${bubble.x}%`,
                  top: `${bubble.y}%`,
                  width: `${bubble.size}px`,
                  height: `${bubble.size}px`,
                  borderRadius: '50%',
                  background: bubble.popped && bubble.isCorrect
                    ? 'radial-gradient(circle at 30% 30%, #C8E6C9, #66BB6A, #2E7D32)'
                    : `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.7), ${BUBBLE_COLORS[idx % BUBBLE_COLORS.length].match(/#[A-F0-9]{6}/gi)?.[1] || '#4FC3F7'})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.2rem',
                  fontWeight: 900,
                  color: 'white',
                  cursor: isLocked ? 'not-allowed' : 'pointer',
                  textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  boxShadow: bubble.popped
                    ? 'none'
                    : '0 8px 25px rgba(0,0,0,0.25), inset -8px -8px 15px rgba(0,0,0,0.15), inset 5px 5px 10px rgba(255,255,255,0.4)',
                  transform: bubble.popped ? 'scale(0)' : 'scale(1)',
                  transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                  opacity: bubble.popped ? 0 : 1,
                  border: '3px solid rgba(255,255,255,0.8)',
                  animation: bubble.popped ? 'none' : `bubbleFloat ${2.5 + (idx * 0.3)}s ease-in-out infinite, bubbleGlow 2s ease-in-out infinite`,
                  animationDelay: `${idx * 0.2}s`
                }}
                onMouseEnter={(e) => !bubble.popped && !isLocked && (e.currentTarget.style.transform = 'scale(1.15)')}
                onMouseLeave={(e) => !bubble.popped && (e.currentTarget.style.transform = 'scale(1)')}
              >
                {bubble.letter}
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER - Controls */}
        <div style={{
          flex: 'none',
          padding: '0.4rem 1rem 0.6rem',
          display: 'flex',
          gap: '0.7rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          width: '100%'
        }}>
          <button
            onClick={handleRestart}
            style={{
              padding: '0.7rem 1.6rem',
              borderRadius: '50px',
              border: 'none',
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: '1rem',
              cursor: 'pointer',
              background: 'linear-gradient(135deg, #4FC3F7, #29B6F6, #0288D1)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              boxShadow: '0 6px 20px rgba(79,195,247,0.5)',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <RotateCcw size={18} /> Restart
          </button>
          <button
            onClick={onBack}
            style={{
              padding: '0.7rem 1.6rem',
              borderRadius: '50px',
              border: '3px solid #FF6B9D',
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: '1rem',
              cursor: 'pointer',
              background: 'white',
              color: '#FF6B9D',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              boxShadow: '0 6px 20px rgba(255,107,157,0.25)',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            🏠 Menu
          </button>
        </div>
      </div>

      <style>{`
        @keyframes floatBg {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(15deg); }
        }
        @keyframes bubbleFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes bubbleGlow {
          0%, 100% { filter: brightness(1) saturate(1); }
          50% { filter: brightness(1.2) saturate(1.3); }
        }
        @keyframes rainbowShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes bounceLetter {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-8px) scale(1.05); }
        }
        @keyframes soundPulse {
          0%, 100% { box-shadow: 0 8px 25px rgba(186,104,200,0.5); }
          50% { box-shadow: 0 8px 35px rgba(186,104,200,0.8), 0 0 0 8px rgba(186,104,200,0.15); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8) rotate(0deg); }
          50% { opacity: 0.8; transform: scale(1.2) rotate(180deg); }
        }
        @keyframes statPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
