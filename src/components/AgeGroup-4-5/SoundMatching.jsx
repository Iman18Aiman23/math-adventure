import React, { useState, useEffect, useCallback } from 'react';
import { playSound } from '../../utils/soundManager';
import SpeechManager from '../../services/SpeechManager';
import confetti from 'canvas-confetti';
import { LOCALIZATION } from '../../utils/localization';
import { Volume2, RotateCcw, ArrowLeft } from 'lucide-react';
import { useGameStateContext } from '../../App';
import { getGameData, addCorrectAnswer, deductHeart } from '../../utils/gameStatsManager';
import AppHeader from '../AppHeader';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const PHONETIC_SOUNDS = {
  'A': { sound: 'æ', word: 'Apple', phonetic: '/æ/' },
  'B': { sound: 'b', word: 'Ball', phonetic: '/b/' },
  'C': { sound: 'k', word: 'Cat', phonetic: '/k/' },
  'D': { sound: 'd', word: 'Dog', phonetic: '/d/' },
  'E': { sound: 'ɛ', word: 'Egg', phonetic: '/ɛ/' },
  'F': { sound: 'f', word: 'Fish', phonetic: '/f/' },
  'G': { sound: 'g', word: 'Gate', phonetic: '/g/' },
  'H': { sound: 'h', word: 'Hat', phonetic: '/h/' },
  'I': { sound: 'ɪ', word: 'Ice', phonetic: '/ɪ/' },
  'J': { sound: 'dʒ', word: 'Jump', phonetic: '/dʒ/' },
  'K': { sound: 'k', word: 'Kite', phonetic: '/k/' },
  'L': { sound: 'l', word: 'Lion', phonetic: '/l/' },
  'M': { sound: 'm', word: 'Moon', phonetic: '/m/' },
  'N': { sound: 'n', word: 'Nest', phonetic: '/n/' },
  'O': { sound: 'ɑ', word: 'Orange', phonetic: '/ɑ/' },
  'P': { sound: 'p', word: 'Pig', phonetic: '/p/' },
  'Q': { sound: 'kw', word: 'Queen', phonetic: '/kw/' },
  'R': { sound: 'r', word: 'Rabbit', phonetic: '/r/' },
  'S': { sound: 's', word: 'Sun', phonetic: '/s/' },
  'T': { sound: 't', word: 'Tiger', phonetic: '/t/' },
  'U': { sound: 'ʌ', word: 'Umbrella', phonetic: '/ʌ/' },
  'V': { sound: 'v', word: 'Van', phonetic: '/v/' },
  'W': { sound: 'w', word: 'Water', phonetic: '/w/' },
  'X': { sound: 'ks', word: 'Xylophone', phonetic: '/ks/' },
  'Y': { sound: 'j', word: 'Yellow', phonetic: '/j/' },
  'Z': { sound: 'z', word: 'Zebra', phonetic: '/z/' }
};

export default function SoundMatching({ onBack, onHome, isMuted, language }) {
  const t = LOCALIZATION[language].reading || LOCALIZATION[language];
  const gameState = useGameStateContext();
  const [gameState_, setGameState_] = useState('playing');
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [gems, setGems] = useState(0);
  const [stars, setStars] = useState(0);
  const [choices, setChoices] = useState([]);
  const [correctLetter, setCorrectLetter] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    const gameData = getGameData();
    setHearts(gameData.hearts);
    setGems(gameData.gems);
    setStars(gameData.stars);
  }, []);

  useEffect(() => {
    if (gameState_ === 'playing') {
      generateRound();
    }
  }, [currentRound, gameState_]);

  const generateRound = useCallback(() => {
    const randomLetter = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
    setCorrectLetter(randomLetter);

    const wrongLetters = ALPHABET.filter(l => l !== randomLetter)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const allChoices = [randomLetter, ...wrongLetters].sort(() => Math.random() - 0.5);
    setChoices(allChoices);
    setShowHint(false);
    setIsLocked(false);

    setTimeout(() => {
      playLetterSound(randomLetter);
    }, 500);
  }, []);

  const playLetterSound = useCallback((letter) => {
    const data = PHONETIC_SOUNDS[letter];
    if (data) {
      SpeechManager.speak(`${letter} for ${data.word}`, 'en-US', { rate: 0.4 });
    }
  }, []);

  const handleChoice = useCallback((letter) => {
    if (isLocked) return;

    setIsLocked(true);

    if (letter === correctLetter) {
      playSound('correct');
      setScore(s => s + 100);

      const gameData = addCorrectAnswer();
      setGems(gameData.gems);
      setStars(gameData.stars);

      const newCount = correctCount + 1;
      setCorrectCount(newCount);

      setTimeout(() => {
        if (newCount >= 10) {
          playSound('correct');
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
          });
          setGameState_('won');
        } else {
          setCurrentRound(newCount);
        }
      }, 800);
    } else {
      playSound('wrong');
      const gameData = deductHeart();
      setHearts(gameData.hearts);

      if (gameData.hearts <= 0) {
        setTimeout(() => {
          setGameState_('lost');
        }, 500);
      } else {
        setShowHint(true);
        setTimeout(() => {
          setIsLocked(false);
        }, 1000);
      }
    }
  }, [correctLetter, isLocked, correctCount]);

  const currentSound = PHONETIC_SOUNDS[correctLetter];

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
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
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
            🎉 Excellent Listener!
          </h2>
          <p style={{ color: '#636E72', marginBottom: '1.5rem', fontWeight: 600 }}>
            You matched 10 sounds perfectly!
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.7rem',
            margin: '1.2rem 0'
          }}>
            <div style={{ background: '#f8f9fa', borderRadius: '14px', padding: '0.7rem' }}>
              <div style={{ fontSize: '0.82rem', color: '#636E72', fontWeight: 600 }}>Matches</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>10/10</div>
            </div>
            <div style={{ background: '#f8f9fa', borderRadius: '14px', padding: '0.7rem' }}>
              <div style={{ fontSize: '0.82rem', color: '#636E72', fontWeight: 600 }}>Score</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FF6B9D' }}>{score}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.7rem', justifyContent: 'center', marginTop: '1.2rem' }}>
            <button
              onClick={() => onBack?.()}
              style={{
                padding: '0.6rem 1.4rem',
                borderRadius: '14px',
                border: '2px solid #ddd',
                fontFamily: 'var(--font-heading)',
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
              onClick={() => {
                setCurrentRound(0);
                setScore(0);
                setCorrectCount(0);
                setHearts(3);
                setGameState_('playing');
              }}
              style={{
                padding: '0.6rem 1.4rem',
                borderRadius: '14px',
                border: '2px solid #4FC3F7',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                background: 'linear-gradient(135deg, #4FC3F7, #0288D1)',
                color: 'white'
              }}
            >
              Play Again
            </button>
          </div>
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
            💪 Keep Practicing!
          </h2>
          <p style={{ color: '#636E72', marginBottom: '1.5rem', fontWeight: 600 }}>
            You matched {correctCount} sounds. Try again!
          </p>
          <div style={{ display: 'flex', gap: '0.7rem', justifyContent: 'center', marginTop: '1.2rem' }}>
            <button
              onClick={() => onBack?.()}
              style={{
                padding: '0.6rem 1.4rem',
                borderRadius: '14px',
                border: '2px solid #ddd',
                fontFamily: 'var(--font-heading)',
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
              onClick={() => {
                setCurrentRound(0);
                setScore(0);
                setCorrectCount(0);
                setHearts(3);
                setGameState_('playing');
              }}
              style={{
                padding: '0.6rem 1.4rem',
                borderRadius: '14px',
                border: '2px solid #FF6B9D',
                fontFamily: 'var(--font-heading)',
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

  const CHOICE_COLORS = [
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
      background: 'linear-gradient(135deg, #E0F7FA 0%, #F3E5F5 50%, #FFF3E0 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {['🎵', '🎶', '🎼', '🔊', '🎤', '🎧', '🌟', '✨'].map((emoji, i) => (
          <div key={i} style={{
            position: 'absolute',
            fontSize: '1.8rem',
            opacity: 0.35,
            top: `${(i * 11 + 8) % 90}%`,
            left: `${(i * 19 + 5) % 95}%`,
            animation: `floatBg ${4 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`
          }}>{emoji}</div>
        ))}
      </div>

      <AppHeader onBack={onBack} gameState={gameState} language={language} hearts={hearts} gems={gems} stars={stars} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', position: 'relative', zIndex: 1 }}>
        {/* HEADER */}
        <div style={{
          flex: 'none',
          padding: '1.25rem 1rem 0.75rem',
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #FFFFFF, #E1F5FE)',
            borderRadius: '20px',
            padding: '0.6rem 1.3rem',
            boxShadow: '0 6px 20px rgba(79,195,247,0.3), 0 0 0 3px rgba(255,255,255,0.6)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 700,
            border: '2px solid #4FC3F7',
            animation: 'statPulse 2s ease-in-out infinite'
          }}>
            <span style={{ fontSize: '1.5rem' }}>🎵</span>
            <span style={{
              fontWeight: 800,
              fontSize: '1.6rem',
              minWidth: '2ch',
              background: 'linear-gradient(135deg, #0277BD, #4FC3F7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {correctCount}/10
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
            border: '2px solid #FFD54F'
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

        {/* BODY */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem 1rem',
          width: '100%'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <p style={{
              color: '#7B1FA2',
              fontWeight: 800,
              marginBottom: '1.2rem',
              fontSize: '1.2rem',
              fontFamily: "var(--font-heading)"
            }}>
              👂 Listen and tap the matching letter!
            </p>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              {/* Sound wave rings */}
              <div style={{
                position: 'absolute',
                inset: '-20px',
                borderRadius: '50%',
                border: '3px solid rgba(79,195,247,0.4)',
                animation: 'soundRing 1.8s ease-out infinite'
              }} />
              <div style={{
                position: 'absolute',
                inset: '-30px',
                borderRadius: '50%',
                border: '3px solid rgba(186,104,200,0.3)',
                animation: 'soundRing 1.8s ease-out infinite',
                animationDelay: '0.6s'
              }} />
              <button
                onClick={() => playLetterSound(correctLetter)}
                style={{
                  padding: '1.3rem 2.5rem',
                  borderRadius: '50px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #4FC3F7, #BA68C8, #FF6B9D)',
                  backgroundSize: '200% 200%',
                  color: 'white',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  fontSize: '1.2rem',
                  fontFamily: 'var(--font-heading)',
                  boxShadow: '0 10px 30px rgba(186,104,200,0.5)',
                  animation: 'rainbowShift 3s ease infinite, soundPulse 1.8s ease-in-out infinite',
                  position: 'relative',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <Volume2 size={28} /> Play Sound 🔊
              </button>
            </div>
          </div>

          {showHint && (
            <div style={{
              background: 'linear-gradient(135deg, #FFE66D, #FFD54F, #FFB300)',
              backgroundSize: '200% 200%',
              color: '#E65100',
              padding: '1rem 1.5rem',
              borderRadius: '20px',
              marginBottom: '1.5rem',
              fontWeight: 800,
              textAlign: 'center',
              fontSize: '1.1rem',
              boxShadow: '0 6px 20px rgba(255,179,0,0.35)',
              animation: 'rainbowShift 2s ease infinite, bounceIn 0.4s ease',
              fontFamily: "var(--font-heading)"
            }}>
              ✨ Hint: The correct letter is <span style={{ fontSize: '1.4rem', fontWeight: 900 }}>{correctLetter}</span> ✨
            </div>
          )}

          {/* Choice Buttons */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.2rem',
            maxWidth: '500px',
            width: '100%'
          }}>
            {choices.map((letter, idx) => (
              <button
                key={idx}
                onClick={() => handleChoice(letter)}
                disabled={isLocked}
                style={{
                  padding: '2rem',
                  borderRadius: '24px',
                  border: '4px solid rgba(255,255,255,0.8)',
                  background: letter === correctLetter && showHint
                    ? 'linear-gradient(135deg, #66BB6A, #43A047, #2E7D32)'
                    : CHOICE_COLORS[idx % CHOICE_COLORS.length],
                  color: 'white',
                  fontSize: '3rem',
                  fontWeight: 900,
                  cursor: isLocked ? 'not-allowed' : 'pointer',
                  fontFamily: 'var(--font-heading)',
                  transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                  transform: isLocked ? 'scale(0.95)' : 'scale(1)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2), inset 0 -6px 0 rgba(0,0,0,0.15), inset 0 4px 0 rgba(255,255,255,0.3)',
                  opacity: isLocked ? 0.7 : 1,
                  textShadow: '0 3px 10px rgba(0,0,0,0.3)',
                  animation: `choiceFloat ${2.5 + (idx * 0.3)}s ease-in-out infinite`,
                  animationDelay: `${idx * 0.15}s`
                }}
                onMouseEnter={(e) => !isLocked && (e.currentTarget.style.transform = 'scale(1.08) rotate(-2deg)')}
                onMouseLeave={(e) => !isLocked && (e.currentTarget.style.transform = 'scale(1)')}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div style={{
          flex: 'none',
          padding: '0.75rem 1rem 1.25rem',
          display: 'flex',
          gap: '0.8rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          width: '100%'
        }}>
          <button
            onClick={() => {
              setCurrentRound(0);
              setScore(0);
              setCorrectCount(0);
              setHearts(3);
              setGameState_('playing');
            }}
            style={{
              padding: '0.7rem 1.6rem',
              borderRadius: '50px',
              border: 'none',
              fontFamily: 'var(--font-heading)',
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
              fontFamily: 'var(--font-heading)',
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
        @keyframes rainbowShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes soundPulse {
          0%, 100% { box-shadow: 0 10px 30px rgba(186,104,200,0.5); }
          50% { box-shadow: 0 10px 40px rgba(186,104,200,0.8), 0 0 0 10px rgba(186,104,200,0.15); }
        }
        @keyframes soundRing {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes choiceFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes statPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
