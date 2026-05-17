import React, { useState, useEffect, useCallback } from 'react';
import { playSound } from '../../utils/soundManager';
import confetti from 'canvas-confetti';
import { LOCALIZATION } from '../../utils/localization';
import { RotateCcw, ArrowLeft, Trophy } from 'lucide-react';
import { useGameStateContext } from '../../App';
import { getGameData, addCorrectAnswer, deductHeart } from '../../utils/gameStatsManager';
import AppHeader from '../AppHeader';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const PHONETIC_DATA = {
  'A': { sound: 'æ', word: 'Apple', phonetic: '/æ/', icon: '🍎' },
  'B': { sound: 'b', word: 'Ball', phonetic: '/b/', icon: '⚽' },
  'C': { sound: 'k', word: 'Cat', phonetic: '/k/', icon: '🐱' },
  'D': { sound: 'd', word: 'Dog', phonetic: '/d/', icon: '🐶' },
  'E': { sound: 'ɛ', word: 'Egg', phonetic: '/ɛ/', icon: '🥚' },
  'F': { sound: 'f', word: 'Fish', phonetic: '/f/', icon: '🐟' },
  'G': { sound: 'g', word: 'Gate', phonetic: '/g/', icon: '🚪' },
  'H': { sound: 'h', word: 'Hat', phonetic: '/h/', icon: '🎩' },
  'I': { sound: 'ɪ', word: 'Ice', phonetic: '/ɪ/', icon: '🧊' },
  'J': { sound: 'dʒ', word: 'Jump', phonetic: '/dʒ/', icon: '🦘' }
};

export default function PhoneticsSprint({ onBack, onHome, isMuted, language }) {
  const t = LOCALIZATION[language].reading || LOCALIZATION[language];
  const gameState = useGameStateContext();
  const [gameState_, setGameState_] = useState('playing');
  const [playerPosition, setPlayerPosition] = useState(0);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [gems, setGems] = useState(0);
  const [stars, setStars] = useState(0);
  const [obstacles, setObstacles] = useState([]);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [questionIdx, setQuestionIdx] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [gameTime, setGameTime] = useState(0);

  useEffect(() => {
    const gameData = getGameData();
    setHearts(gameData.hearts);
    setGems(gameData.gems);
    setStars(gameData.stars);
    generateNewQuestion();
  }, []);

  useEffect(() => {
    let timer;
    if (gameState_ === 'playing') {
      timer = setInterval(() => {
        setGameTime(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState_]);

  const generateNewQuestion = useCallback(() => {
    const randomLetters = Object.keys(PHONETIC_DATA)
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);

    const correctLetter = randomLetters[0];
    const wrong = randomLetters.slice(1);

    setObstacles(
      randomLetters.map((letter, idx) => ({
        id: idx,
        letter,
        isCorrect: letter === correctLetter,
        collected: false,
        x: 20 + idx * 20
      }))
    );

    setCurrentQuestion(correctLetter);
    setIsAnswered(false);
  }, []);

  const handleObstacleClick = useCallback((obstacle) => {
    if (isAnswered) return;

    setIsAnswered(true);

    if (obstacle.isCorrect) {
      playSound('correct');
      setPlayerPosition(p => Math.min(p + 25, 100));
      setScore(s => s + 100);

      const gameData = addCorrectAnswer();
      setGems(gameData.gems);
      setStars(gameData.stars);

      const newCorrect = correctLetters.length + 1;
      setCorrectLetters([...correctLetters, obstacle.letter]);

      setTimeout(() => {
        if (newCorrect >= 10) {
          playSound('correct');
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
          });
          setGameState_('won');
        } else {
          setQuestionIdx(newCorrect);
          generateNewQuestion();
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
        setTimeout(() => {
          generateNewQuestion();
        }, 1000);
      }
    }
  }, [isAnswered, correctLetters, currentQuestion]);

  if (gameState_ === 'won') {
    const minutes = Math.floor(gameTime / 60);
    const seconds = gameTime % 60;

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
          <div style={{
            fontSize: '3rem',
            marginBottom: '0.5rem'
          }}>
            🏁
          </div>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 800,
            marginBottom: '0.5rem',
            background: 'linear-gradient(135deg, #FFD700, #FF9800)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Sprint Champion!
          </h2>
          <p style={{ color: '#636E72', marginBottom: '1.5rem', fontWeight: 600 }}>
            You completed the phonics sprint!
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '0.7rem',
            margin: '1.2rem 0'
          }}>
            <div style={{ background: '#f8f9fa', borderRadius: '14px', padding: '0.7rem' }}>
              <div style={{ fontSize: '0.75rem', color: '#636E72', fontWeight: 600 }}>Items</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>10</div>
            </div>
            <div style={{ background: '#f8f9fa', borderRadius: '14px', padding: '0.7rem' }}>
              <div style={{ fontSize: '0.75rem', color: '#636E72', fontWeight: 600 }}>Time</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>
                {minutes}:{seconds.toString().padStart(2, '0')}
              </div>
            </div>
            <div style={{ background: '#f8f9fa', borderRadius: '14px', padding: '0.7rem' }}>
              <div style={{ fontSize: '0.75rem', color: '#636E72', fontWeight: 600 }}>Score</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FF6B9D' }}>{score}</div>
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
                setPlayerPosition(0);
                setScore(0);
                setCorrectLetters([]);
                setHearts(3);
                setGameTime(0);
                setGameState_('playing');
                setQuestionIdx(0);
                generateNewQuestion();
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
              Sprint Again
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
            💪 Keep Running!
          </h2>
          <p style={{ color: '#636E72', marginBottom: '1.5rem', fontWeight: 600 }}>
            You collected {correctLetters.length} items. Try again!
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
                setPlayerPosition(0);
                setScore(0);
                setCorrectLetters([]);
                setHearts(3);
                setGameTime(0);
                setGameState_('playing');
                setQuestionIdx(0);
                generateNewQuestion();
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

  const currentData = PHONETIC_DATA[currentQuestion];
  const OBSTACLE_COLORS = [
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
      background: 'linear-gradient(135deg, #E1F5FE 0%, #FFF9C4 50%, #FFE0B2 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {['☁️', '🌤️', '⚡', '🏃', '💨', '🌟', '🎯', '🏆'].map((emoji, i) => (
          <div key={i} style={{
            position: 'absolute',
            fontSize: '1.8rem',
            opacity: 0.35,
            top: `${(i * 13 + 8) % 90}%`,
            left: `${(i * 17 + 5) % 95}%`,
            animation: `floatBg ${4 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`
          }}>{emoji}</div>
        ))}
      </div>

      <AppHeader onBack={onBack} gameState={gameState} language={language} hearts={hearts} gems={gems} stars={stars} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', position: 'relative', zIndex: 1, minHeight: 0, overflow: 'hidden' }}>
        {/* HEADER */}
        <div style={{
          flex: 'none',
          padding: '0.4rem 1rem 0.3rem',
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #FFFFFF, #E1F5FE)',
            borderRadius: '20px',
            padding: '0.5rem 1.1rem',
            boxShadow: '0 6px 20px rgba(79,195,247,0.3), 0 0 0 3px rgba(255,255,255,0.6)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontWeight: 700,
            border: '2px solid #4FC3F7',
            animation: 'statPulse 2s ease-in-out infinite'
          }}>
            <span style={{ fontSize: '1.4rem' }}>🏃</span>
            <span style={{
              fontWeight: 800,
              fontSize: '1.4rem',
              background: 'linear-gradient(135deg, #0277BD, #29B6F6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {correctLetters.length}/10
            </span>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #FFFFFF, #FFE0B2)',
            borderRadius: '20px',
            padding: '0.5rem 1.1rem',
            boxShadow: '0 6px 20px rgba(255,152,0,0.3), 0 0 0 3px rgba(255,255,255,0.6)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontWeight: 700,
            border: '2px solid #FF9800'
          }}>
            <span style={{ fontSize: '1.4rem' }}>⏱️</span>
            <span style={{
              fontWeight: 800,
              fontSize: '1.4rem',
              background: 'linear-gradient(135deg, #E65100, #FF6F00)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {Math.floor(gameTime / 60)}:{(gameTime % 60).toString().padStart(2, '0')}
            </span>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #FFFFFF, #FFF9C4)',
            borderRadius: '20px',
            padding: '0.5rem 1.1rem',
            boxShadow: '0 6px 20px rgba(255,213,79,0.35), 0 0 0 3px rgba(255,255,255,0.6)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontWeight: 700,
            border: '2px solid #FFD54F'
          }}>
            <span style={{ fontSize: '1.4rem', animation: 'spinSlow 3s linear infinite', display: 'inline-block' }}>⭐</span>
            <span style={{
              fontWeight: 800,
              fontSize: '1.4rem',
              background: 'linear-gradient(135deg, #FFB300, #FF6F00)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {score}
            </span>
          </div>
        </div>

        {/* BODY - Racing Area */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '0.3rem 1rem',
          width: '100%',
          gap: '0.4rem',
          minHeight: 0,
          overflow: 'hidden'
        }}>
          {/* Progress Bar - Racing Track */}
          <div style={{
            width: '100%',
            maxWidth: '600px',
            background: 'linear-gradient(135deg, #FFFFFF, #E1F5FE)',
            borderRadius: '18px',
            padding: '0.5rem 0.8rem',
            boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
            border: '2px solid rgba(79,195,247,0.3)',
            flex: 'none'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              marginBottom: '0.3rem'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4FC3F7, #29B6F6, #0277BD)',
                color: 'white',
                fontSize: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                boxShadow: '0 4px 12px rgba(79,195,247,0.5)',
                animation: 'runnerBounce 0.6s ease-in-out infinite',
                flex: 'none'
              }}>
                🏃
              </div>
              <div style={{
                flex: 1,
                height: '24px',
                background: 'repeating-linear-gradient(90deg, #E0E0E0 0px, #E0E0E0 18px, #EEEEEE 18px, #EEEEEE 36px)',
                borderRadius: '12px',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.15)'
              }}>
                <div style={{
                  height: '100%',
                  width: `${playerPosition}%`,
                  background: 'linear-gradient(135deg, #66BB6A, #43A047, #2E7D32)',
                  transition: 'width 0.5s cubic-bezier(0.34,1.56,0.64,1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  paddingRight: '0.4rem',
                  boxShadow: '0 0 12px rgba(102,187,106,0.6), inset 0 -3px 0 rgba(0,0,0,0.15)'
                }}>
                  {playerPosition > 0 && (
                    <span style={{ color: 'white', fontWeight: 900, fontSize: '0.8rem', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                      {Math.floor(playerPosition)}%
                    </span>
                  )}
                </div>
              </div>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FFD700, #FF9800, #FF6F00)',
                color: 'white',
                fontSize: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                boxShadow: '0 4px 12px rgba(255,152,0,0.5)',
                animation: 'flagWave 1.5s ease-in-out infinite',
                flex: 'none'
              }}>
                🏁
              </div>
            </div>
            <div style={{
              textAlign: 'center',
              fontWeight: 800,
              fontFamily: 'var(--font-heading)',
              fontSize: '0.85rem',
              background: 'linear-gradient(135deg, #FF6B9D, #E91E63)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              🎯 Collect {10 - correctLetters.length} more items to finish!
            </div>
          </div>

          {/* Question */}
          <div style={{
            background: 'linear-gradient(135deg, #FFFFFF, #FFF3E0)',
            borderRadius: '22px',
            padding: '1rem 1.5rem',
            textAlign: 'center',
            maxWidth: '600px',
            width: '100%',
            boxShadow: '0 10px 28px rgba(0,0,0,0.12)',
            border: '4px solid #FFD54F',
            animation: 'questionPulse 2s ease-in-out infinite',
            flex: 'none'
          }}>
            <p style={{
              color: '#7B1FA2',
              fontWeight: 800,
              margin: 0,
              marginBottom: '0.4rem',
              fontFamily: 'var(--font-heading)',
              fontSize: '1.05rem'
            }}>
              ⚡ Tap the matching item! ⚡
            </p>
            <div style={{
              fontSize: '3.4rem',
              fontWeight: 900,
              fontFamily: 'var(--font-heading)',
              background: 'linear-gradient(135deg, #FF6B9D, #FFD54F, #4FC3F7, #BA68C8)',
              backgroundSize: '300% 300%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'rainbowShift 4s ease infinite',
              lineHeight: 1.1,
              marginBottom: '0.2rem'
            }}>
              {currentData?.icon} {currentQuestion}
            </div>
            <p style={{
              color: '#FF6B9D',
              fontWeight: 800,
              fontSize: '1.2rem',
              margin: 0,
              fontFamily: "var(--font-heading)"
            }}>
              ✨ {currentData?.word} ✨
            </p>
          </div>

          {/* Obstacles/Items — 2x2 grid with auto height */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gridAutoRows: 'auto',
            gap: '1rem',
            maxWidth: '600px',
            width: '100%',
            flex: 'none'
          }}>
            {obstacles.map((obstacle, idx) => {
              const obsData = PHONETIC_DATA[obstacle.letter];
              return (
                <button
                  key={obstacle.id}
                  onClick={() => handleObstacleClick(obstacle)}
                  disabled={isAnswered}
                  style={{
                    padding: '1.1rem 1.2rem',
                    borderRadius: '22px',
                    border: '4px solid rgba(255,255,255,0.8)',
                    background: OBSTACLE_COLORS[idx % OBSTACLE_COLORS.length],
                    color: 'white',
                    fontWeight: 800,
                    cursor: isAnswered ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                    opacity: isAnswered ? 0.6 : 1,
                    fontFamily: 'var(--font-heading)',
                    boxShadow: '0 10px 26px rgba(0,0,0,0.2), inset 0 -6px 0 rgba(0,0,0,0.15), inset 0 4px 0 rgba(255,255,255,0.3)',
                    textShadow: '0 2px 6px rgba(0,0,0,0.3)',
                    animation: `obstacleFloat ${2.5 + (idx * 0.3)}s ease-in-out infinite`,
                    animationDelay: `${idx * 0.15}s`,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.7rem'
                  }}
                  onMouseEnter={(e) => !isAnswered && (e.currentTarget.style.transform = 'scale(1.05) rotate(-2deg)')}
                  onMouseLeave={(e) => !isAnswered && (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <div style={{ fontSize: '2.6rem', lineHeight: 1 }}>
                    {obsData?.icon}
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{obsData?.word}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* FOOTER */}
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
            onClick={() => {
              setPlayerPosition(0);
              setScore(0);
              setCorrectLetters([]);
              setHearts(3);
              setGameTime(0);
              setGameState_('playing');
              setQuestionIdx(0);
              generateNewQuestion();
            }}
            style={{
              padding: '0.7rem 1.6rem',
              borderRadius: '50px',
              border: 'none',
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '1rem',
              cursor: 'pointer',
              background: 'linear-gradient(135deg, #66BB6A, #43A047, #2E7D32)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              boxShadow: '0 6px 20px rgba(102,187,106,0.5)',
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
        @keyframes obstacleFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes runnerBounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes flagWave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-10deg); }
          75% { transform: rotate(10deg); }
        }
        @keyframes questionPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 10px 30px rgba(0,0,0,0.12), 0 0 0 4px rgba(255,255,255,0.6); }
          50% { transform: scale(1.02); box-shadow: 0 15px 40px rgba(255,213,79,0.4), 0 0 0 4px rgba(255,255,255,0.8); }
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
