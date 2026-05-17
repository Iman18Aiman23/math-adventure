import React, { useState, useEffect, useCallback, useRef } from 'react';
import { playSound } from '../../utils/soundManager';
import confetti from 'canvas-confetti';
import { LOCALIZATION } from '../../utils/localization';
import { RotateCcw, ArrowLeft } from 'lucide-react';
import { useGameStateContext } from '../../App';
import { getGameData, addCorrectAnswer, deductHeart } from '../../utils/gameStatsManager';
import AppHeader from '../AppHeader';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const SOUND_DATA = {
  'A': { sound: 'æ', word: 'Apple', phonetic: '/æ/', color: '#FF6B9D' },
  'B': { sound: 'b', word: 'Ball', phonetic: '/b/', color: '#FF9800' },
  'C': { sound: 'k', word: 'Cat', phonetic: '/k/', color: '#4FC3F7' },
  'D': { sound: 'd', word: 'Dog', phonetic: '/d/', color: '#66BB6A' },
  'E': { sound: 'ɛ', word: 'Egg', phonetic: '/ɛ/', color: '#FFD54F' },
  'F': { sound: 'f', word: 'Fish', phonetic: '/f/', color: '#9C27B0' },
  'G': { sound: 'g', word: 'Gate', phonetic: '/g/', color: '#009688' },
  'H': { sound: 'h', word: 'Hat', phonetic: '/h/', color: '#F44336' },
  'I': { sound: 'ɪ', word: 'Ice', phonetic: '/ɪ/', color: '#3F51B5' },
  'J': { sound: 'dʒ', word: 'Jump', phonetic: '/dʒ/', color: '#E91E63' }
};

export default function LetterSoundPuzzle({ onBack, onHome, isMuted, language }) {
  const t = LOCALIZATION[language].reading || LOCALIZATION[language];
  const gameState = useGameStateContext();
  const [gameState_, setGameState_] = useState('playing');
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [gems, setGems] = useState(0);
  const [stars, setStars] = useState(0);
  const [soundSlots, setSoundSlots] = useState([]);
  const [letterDragItems, setLetterDragItems] = useState([]);
  const [draggedLetter, setDraggedLetter] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [completedPairs, setCompletedPairs] = useState(new Set());
  const touchDragRef = useRef({ letter: null, clone: null, sourceEl: null });

  useEffect(() => {
    const gameData = getGameData();
    setHearts(gameData.hearts);
    setGems(gameData.gems);
    setStars(gameData.stars);
  }, []);

  const generateRound = useCallback(() => {
    const soundKeys = Object.keys(SOUND_DATA);
    const randomSounds = soundKeys
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);

    const slots = randomSounds.map(key => ({
      id: `slot-${key}`,
      letter: key,
      sound: SOUND_DATA[key].sound,
      word: SOUND_DATA[key].word,
      color: SOUND_DATA[key].color,
      matched: false
    }));

    const letters = randomSounds
      .sort(() => Math.random() - 0.5)
      .map((letter, idx) => ({
        id: `letter-${idx}`,
        letter,
        slotId: `slot-${letter}`,
        placed: false
      }));

    setSoundSlots(slots);
    setLetterDragItems(letters);
    setDraggedLetter(null);
    setFeedback('');
  }, []);

  useEffect(() => {
    if (gameState_ === 'playing' && soundSlots.length === 0) {
      generateRound();
    }
  }, [gameState_, soundSlots.length, generateRound]);

  const handleLetterDragStart = (letter) => {
    if (completedPairs.has(letter.slotId)) return;
    setDraggedLetter(letter);
  };

  const handleSoundSlotDrop = (slot, letterOverride) => {
    const activeLetter = letterOverride || draggedLetter;
    if (!activeLetter || completedPairs.has(slot.id)) return;

    if (activeLetter.slotId === slot.id && activeLetter.letter.toUpperCase() === slot.letter.toUpperCase()) {
      playSound('correct');
      setFeedback('✅ Correct Match!');

      const newCompleted = new Set(completedPairs);
      newCompleted.add(slot.id);
      setCompletedPairs(newCompleted);

      setScore(s => s + 100);
      const gameData = addCorrectAnswer();
      setGems(gameData.gems);
      setStars(gameData.stars);

      const newCount = correctCount + 1;
      setCorrectCount(newCount);

      const allCurrentRoundMatched = soundSlots.every(s => newCompleted.has(s.id));

      setTimeout(() => {
        setFeedback('');
        if (newCount >= 10) {
          playSound('correct');
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
          });
          setGameState_('won');
        } else if (allCurrentRoundMatched) {
          setCurrentRound(newCount);
          setCompletedPairs(new Set());
          setSoundSlots([]);
          setLetterDragItems([]);
        }
      }, 800);
    } else {
      playSound('wrong');
      setFeedback('❌ Try Again!');
      const gameData = deductHeart();
      setHearts(gameData.hearts);

      if (gameData.hearts <= 0) {
        setTimeout(() => {
          setGameState_('lost');
        }, 500);
      } else {
        setTimeout(() => {
          setFeedback('');
        }, 1000);
      }
    }

    setDraggedLetter(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // ── Touch drag-and-drop (mobile / small screens) ───────────────────
  const handleTouchStart = (e, letter) => {
    if (completedPairs.has(letter.slotId)) return;
    e.preventDefault();

    const touch = e.touches[0];
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();

    // Floating clone that follows the finger
    const clone = target.cloneNode(true);
    clone.style.position = 'fixed';
    clone.style.width = rect.width + 'px';
    clone.style.height = rect.height + 'px';
    clone.style.left = (touch.clientX - rect.width / 2) + 'px';
    clone.style.top = (touch.clientY - rect.height / 2) + 'px';
    clone.style.zIndex = '9999';
    clone.style.pointerEvents = 'none';
    clone.style.opacity = '0.9';
    clone.style.transform = 'scale(1.15) rotate(-3deg)';
    clone.style.transition = 'none';
    clone.style.animation = 'none';
    clone.style.boxShadow = '0 16px 48px rgba(0,0,0,0.35)';
    clone.id = 'touch-drag-clone';
    document.body.appendChild(clone);

    target.style.opacity = '0.35';
    touchDragRef.current = { letter, clone, sourceEl: target };
    setDraggedLetter(letter);
  };

  const handleTouchMove = (e) => {
    const { clone } = touchDragRef.current;
    if (!clone) return;
    e.preventDefault();
    const touch = e.touches[0];
    clone.style.left = (touch.clientX - clone.offsetWidth / 2) + 'px';
    clone.style.top = (touch.clientY - clone.offsetHeight / 2) + 'px';
  };

  const handleTouchEnd = (e) => {
    const { letter, clone, sourceEl } = touchDragRef.current;

    // Remove clone BEFORE elementFromPoint so the clone doesn't intercept
    if (clone) clone.remove();
    if (sourceEl) sourceEl.style.opacity = '';

    if (!letter) {
      touchDragRef.current = { letter: null, clone: null, sourceEl: null };
      return;
    }

    const touch = e.changedTouches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY);

    // Walk up to find a [data-slot-id] drop target
    let slotEl = el;
    while (slotEl && !slotEl.dataset?.slotId) {
      slotEl = slotEl.parentElement;
    }

    if (slotEl) {
      const slot = soundSlots.find(s => s.id === slotEl.dataset.slotId);
      if (slot) handleSoundSlotDrop(slot, letter);
    }

    touchDragRef.current = { letter: null, clone: null, sourceEl: null };
    setDraggedLetter(null);
  };

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
            🧩 Puzzle Master!
          </h2>
          <p style={{ color: '#636E72', marginBottom: '1.5rem', fontWeight: 600 }}>
            You matched 10 letter-sound pairs!
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.7rem',
            margin: '1.2rem 0'
          }}>
            <div style={{ background: '#f8f9fa', borderRadius: '14px', padding: '0.7rem' }}>
              <div style={{ fontSize: '0.82rem', color: '#636E72', fontWeight: 600 }}>Pairs</div>
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
              onClick={() => {
                setCurrentRound(0);
                setScore(0);
                setCorrectCount(0);
                setHearts(3);
                setCompletedPairs(new Set());
                setGameState_('playing');
              }}
              style={{
                padding: '0.6rem 1.4rem',
                borderRadius: '14px',
                border: '2px solid #4FC3F7',
                fontFamily: "var(--font-heading)",
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
            💪 Keep Trying!
          </h2>
          <p style={{ color: '#636E72', marginBottom: '1.5rem', fontWeight: 600 }}>
            You matched {correctCount} pairs. Try again!
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
              onClick={() => {
                setCurrentRound(0);
                setScore(0);
                setCorrectCount(0);
                setHearts(3);
                setCompletedPairs(new Set());
                setGameState_('playing');
              }}
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

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: 'linear-gradient(135deg, #FCE4EC 0%, #E8F5E9 50%, #FFF3E0 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {['🧩', '🎯', '⭐', '✨', '🎨', '🌈', '💎', '🎁'].map((emoji, i) => (
          <div key={i} style={{
            position: 'absolute',
            fontSize: '1.8rem',
            opacity: 0.3,
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
          gap: '0.7rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #FFFFFF, #F3E5F5)',
            borderRadius: '20px',
            padding: '0.6rem 1.3rem',
            boxShadow: '0 6px 20px rgba(186,104,200,0.25), 0 0 0 3px rgba(255,255,255,0.6)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 700,
            border: '2px solid #BA68C8',
            animation: 'statPulse 2s ease-in-out infinite'
          }}>
            <span style={{ fontSize: '1.5rem' }}>🧩</span>
            <span style={{
              fontWeight: 800,
              fontSize: '1.6rem',
              minWidth: '2ch',
              background: 'linear-gradient(135deg, #9C27B0, #6A1B9A)',
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
          justifyContent: 'flex-start',
          padding: '0.3rem 1rem',
          width: '100%',
          overflow: 'hidden',
          minHeight: 0
        }}>
          <p style={{
            color: '#7B1FA2',
            fontWeight: 800,
            marginBottom: '0.4rem',
            fontSize: '1rem',
            fontFamily: "var(--font-heading)",
            textAlign: 'center',
            flex: 'none'
          }}>
            🎯 Drag uppercase letters to lowercase pairs!
          </p>

          {feedback && (
            <div style={{
              background: feedback.includes('✅')
                ? 'linear-gradient(135deg, #A5D6A7, #66BB6A, #43A047)'
                : 'linear-gradient(135deg, #FFB0B0, #FF8787, #E91E63)',
              color: 'white',
              padding: '0.5rem 1.2rem',
              borderRadius: '16px',
              marginBottom: '0.4rem',
              fontWeight: 800,
              textAlign: 'center',
              fontSize: '0.95rem',
              boxShadow: feedback.includes('✅')
                ? '0 6px 20px rgba(102,187,106,0.5)'
                : '0 6px 20px rgba(233,30,99,0.4)',
              animation: 'bounceIn 0.4s ease',
              fontFamily: "var(--font-heading)",
              flex: 'none'
            }}>
              {feedback}
            </div>
          )}

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.8rem',
            maxWidth: '720px',
            width: '100%',
            margin: '0 auto',
            flex: 1,
            minHeight: 0,
            overflow: 'hidden'
          }}>
            {/* Sound Slots */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', minHeight: 0 }}>
              <h3 style={{
                fontWeight: 900,
                color: '#7B1FA2',
                margin: 0,
                fontFamily: "var(--font-heading)",
                fontSize: '1rem',
                textAlign: 'center',
                textShadow: '0 2px 8px rgba(123,31,162,0.2)',
                flex: 'none'
              }}>
                🎯 Drop Here
              </h3>
              {soundSlots.map((slot, idx) => (
                <div
                  key={slot.id}
                  data-slot-id={slot.id}
                  onDragOver={handleDragOver}
                  onDrop={() => handleSoundSlotDrop(slot)}
                  style={{
                    padding: '0.4rem',
                    borderRadius: '16px',
                    background: completedPairs.has(slot.id)
                      ? 'linear-gradient(135deg, #A5D6A7, #66BB6A, #43A047)'
                      : `linear-gradient(135deg, ${slot.color}30, ${slot.color}15, white)`,
                    border: `3px dashed ${completedPairs.has(slot.id) ? '#2E7D32' : slot.color}`,
                    cursor: 'drop-target',
                    flex: 1,
                    minHeight: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                    textAlign: 'center',
                    boxShadow: completedPairs.has(slot.id)
                      ? '0 6px 18px rgba(102,187,106,0.5)'
                      : `0 4px 14px ${slot.color}30`,
                    animation: completedPairs.has(slot.id)
                      ? 'matchSuccess 0.5s ease'
                      : draggedLetter ? `slotGlow 1s ease-in-out infinite` : 'none',
                    animationDelay: `${idx * 0.1}s`
                  }}
                >
                  {completedPairs.has(slot.id) ? (
                    <>
                      <div style={{
                        fontSize: '1.6rem',
                        fontWeight: 900,
                        color: 'white',
                        fontFamily: "var(--font-heading)",
                        textShadow: '0 3px 10px rgba(0,0,0,0.3)',
                        lineHeight: 1
                      }}>
                        ✅ {slot.letter}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'white', fontWeight: 700 }}>
                        {slot.word}
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{
                        fontSize: '1.9rem',
                        color: slot.color,
                        fontWeight: 900,
                        fontFamily: "var(--font-heading)",
                        lineHeight: 1,
                        textShadow: `0 4px 12px ${slot.color}50`
                      }}>
                        {slot.letter.toLowerCase()}
                      </div>
                      <div style={{
                        fontSize: '0.78rem',
                        color: slot.color,
                        fontWeight: 800,
                        marginTop: '0.1rem'
                      }}>
                        {slot.word}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Letters to Drag */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', minHeight: 0 }}>
              <h3 style={{
                fontWeight: 900,
                color: '#0277BD',
                margin: 0,
                fontFamily: "var(--font-heading)",
                fontSize: '1rem',
                textAlign: 'center',
                textShadow: '0 2px 8px rgba(2,119,189,0.2)',
                flex: 'none'
              }}>
                🖱️ Drag Me
              </h3>
              {letterDragItems.map((letter, idx) => {
                const slotColor = SOUND_DATA[letter.letter]?.color || '#4FC3F7';
                return (
                  <div
                    key={letter.id}
                    draggable={!completedPairs.has(letter.slotId)}
                    onDragStart={() => handleLetterDragStart(letter)}
                    onTouchStart={(e) => handleTouchStart(e, letter)}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={{
                      padding: '0.4rem',
                      borderRadius: '16px',
                      background: completedPairs.has(letter.slotId)
                        ? 'linear-gradient(135deg, #E0E0E0, #BDBDBD, #9E9E9E)'
                        : `linear-gradient(135deg, ${slotColor}, ${slotColor}dd, ${slotColor}aa)`,
                      color: 'white',
                      fontSize: '1.9rem',
                      fontWeight: 900,
                      cursor: completedPairs.has(letter.slotId) ? 'not-allowed' : 'grab',
                      textAlign: 'center',
                      transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                      opacity: draggedLetter?.id === letter.id ? 0.5 : completedPairs.has(letter.slotId) ? 0.5 : 1,
                      transform: draggedLetter?.id === letter.id ? 'scale(1.15) rotate(-5deg)' : 'scale(1)',
                      fontFamily: "var(--font-heading)",
                      boxShadow: completedPairs.has(letter.slotId)
                        ? '0 4px 10px rgba(0,0,0,0.1)'
                        : `0 6px 18px ${slotColor}50, inset 0 -5px 0 rgba(0,0,0,0.15), inset 0 3px 0 rgba(255,255,255,0.3)`,
                      border: '3px solid rgba(255,255,255,0.8)',
                      textShadow: '0 3px 10px rgba(0,0,0,0.3)',
                      flex: 1,
                      minHeight: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      animation: completedPairs.has(letter.slotId)
                        ? 'none'
                        : `letterBounce ${2.5 + (idx * 0.3)}s ease-in-out infinite`,
                      animationDelay: `${idx * 0.15}s`
                    }}
                    onMouseEnter={(e) => !completedPairs.has(letter.slotId) && (e.currentTarget.style.transform = 'scale(1.1) rotate(3deg)')}
                    onMouseLeave={(e) => !completedPairs.has(letter.slotId) && (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    {letter.letter}
                  </div>
                );
              })}
            </div>
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
              setCurrentRound(0);
              setScore(0);
              setCorrectCount(0);
              setHearts(3);
              setCompletedPairs(new Set());
              setSoundSlots([]);
              setLetterDragItems([]);
              setGameState_('playing');
            }}
            style={{
              padding: '0.7rem 1.6rem',
              borderRadius: '50px',
              border: 'none',
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: '1rem',
              cursor: 'pointer',
              background: 'linear-gradient(135deg, #BA68C8, #9C27B0, #6A1B9A)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              boxShadow: '0 6px 20px rgba(186,104,200,0.5)',
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
        @keyframes letterBounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes matchSuccess {
          0% { transform: scale(1); }
          50% { transform: scale(1.15) rotate(3deg); }
          100% { transform: scale(1); }
        }
        @keyframes slotGlow {
          0%, 100% { box-shadow: 0 6px 20px rgba(186,104,200,0.3); }
          50% { box-shadow: 0 10px 35px rgba(186,104,200,0.7), 0 0 0 8px rgba(186,104,200,0.2); }
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
