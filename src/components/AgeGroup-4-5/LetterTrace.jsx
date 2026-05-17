import React, { useState, useCallback, useEffect, useRef } from 'react';
import { RefreshCw, RotateCcw, Volume2, Trophy, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../utils/soundManager';
import SpeechManager from '../../services/SpeechManager';
import { useGameStateContext } from '../../App';
import AppHeader from '../AppHeader';
import TraceCanvas from './TraceCanvas';
import { LETTERS_UPPER, LETTERS_LOWER } from '../../data/letterPaths';

export default function LetterTrace({ onBack, language = 'bm' }) {
  const gameState = useGameStateContext();

  const [localGameState, setLocalGameState] = useState('menu');
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [upperProgress, setUpperProgress] = useState(0);
  const [lowerProgress, setLowerProgress] = useState(0);
  const [upperDone, setUpperDone] = useState(false);
  const [lowerDone, setLowerDone] = useState(false);
  const [resetSignal, setResetSignal] = useState(0);

  const upperCanvasRef = useRef(null);
  const lowerCanvasRef = useRef(null);

  const upperLetter = LETTERS_UPPER[currentLetterIndex];
  const lowerLetter = LETTERS_LOWER[currentLetterIndex];
  const bothComplete = upperDone && lowerDone;

  // Voice prompt when each new pair appears.
  useEffect(() => {
    if (localGameState !== 'playing' || !upperLetter) return;
    const t = setTimeout(() => {
      const phrase = language === 'bm'
        ? `Surih huruf ${upperLetter.char} dan ${lowerLetter.char}`
        : `Trace the letter ${upperLetter.char} and ${lowerLetter.char}`;
      SpeechManager.speak(phrase, language === 'bm' ? 'ms-MY' : 'en-US');
    }, 250);
    return () => clearTimeout(t);
  }, [currentLetterIndex, localGameState, upperLetter, lowerLetter, language]);

  // Score increment + celebration when both halves are completed.
  useEffect(() => {
    if (bothComplete && localGameState === 'playing') {
      playSound('correct');
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.55 } });
      setScore(s => s + 1);
    }
  }, [bothComplete, localGameState]);

  const handleStart = useCallback(() => {
    playHoverSound();
    setCurrentLetterIndex(0);
    setScore(0);
    setUpperProgress(0);
    setLowerProgress(0);
    setUpperDone(false);
    setLowerDone(false);
    setResetSignal(s => s + 1);
    setLocalGameState('playing');
  }, []);

  const handleNext = useCallback(() => {
    playHoverSound();
    if (currentLetterIndex < LETTERS_UPPER.length - 1) {
      setCurrentLetterIndex(i => i + 1);
      setUpperProgress(0);
      setLowerProgress(0);
      setUpperDone(false);
      setLowerDone(false);
      setResetSignal(s => s + 1);
    } else {
      setLocalGameState('finished');
      confetti({ particleCount: 160, spread: 100, origin: { y: 0.5 } });
    }
  }, [currentLetterIndex]);

  const handleReset = useCallback(() => {
    playHoverSound();
    setUpperProgress(0);
    setLowerProgress(0);
    setUpperDone(false);
    setLowerDone(false);
    setResetSignal(s => s + 1);
    upperCanvasRef.current?.reset();
    lowerCanvasRef.current?.reset();
  }, []);

  const handleSpeakLetter = useCallback(() => {
    if (!upperLetter) return;
    const text = `${upperLetter.char} ${lowerLetter.char}`;
    SpeechManager.speak(text, language === 'bm' ? 'ms-MY' : 'en-US');
  }, [upperLetter, lowerLetter, language]);

  const handleUpperProgress = useCallback((p) => setUpperProgress(p), []);
  const handleLowerProgress = useCallback((p) => setLowerProgress(p), []);
  const handleUpperComplete = useCallback(() => setUpperDone(true), []);
  const handleLowerComplete = useCallback(() => setLowerDone(true), []);

  // ── Menu ──────────────────────────────────────────────────────────────
  if (localGameState === 'menu') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: 'var(--bg-body)' }}>
        <AppHeader onBack={onBack} gameState={gameState} language={language} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', gap: '1.25rem' }}>
          <div style={{ fontSize: '4.5rem', lineHeight: 1 }}>✏️</div>
          <h1 style={{ fontWeight: 900, fontSize: '2rem', color: 'var(--duo-blue)', margin: 0, textAlign: 'center' }}>
            Letter Trace
          </h1>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '340px', fontWeight: 700, fontSize: '1rem', margin: 0 }}>
            {language === 'bm'
              ? 'Surih huruf besar dan kecil dengan satu gerakan lancar!'
              : 'Trace each uppercase and lowercase letter with one smooth motion!'}
          </p>

          <div style={{
            display: 'flex', gap: '0.75rem', alignItems: 'center',
            background: '#fff', border: '2px solid #E5E5E5', borderRadius: '16px',
            padding: '0.75rem 1.25rem',
          }}>
            <div style={{ fontWeight: 900, fontSize: '2rem', color: 'var(--duo-blue)', fontFamily: 'var(--font-heading)' }}>A</div>
            <div style={{ fontWeight: 900, fontSize: '2rem', color: 'var(--duo-blue)', fontFamily: 'var(--font-heading)' }}>a</div>
            <div style={{ width: '1px', height: '32px', background: '#E5E5E5' }} />
            <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
              {language === 'bm' ? 'BESAR & KECIL' : 'UPPER & LOWER'}
            </div>
          </div>

          <button
            onClick={handleStart}
            onMouseEnter={playHoverSound}
            style={{
              padding: '1rem 2.5rem', background: 'var(--duo-green)', color: '#fff',
              border: 'none', borderRadius: '16px', boxShadow: '0 6px 0 var(--duo-green-dark)',
              fontWeight: 900, fontSize: '1.25rem', cursor: 'pointer',
              fontFamily: 'var(--font-heading)', letterSpacing: '0.05em',
            }}
          >
            {language === 'bm' ? 'MULA' : 'START'}
          </button>
        </div>
      </div>
    );
  }

  // ── Finished ──────────────────────────────────────────────────────────
  if (localGameState === 'finished') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: 'var(--bg-body)' }}>
        <AppHeader onBack={onBack} gameState={gameState} language={language} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', gap: '1.25rem' }}>
          <Trophy size={96} color="#FFC800" />
          <h1 style={{ fontWeight: 900, fontSize: '2rem', color: 'var(--duo-green)', margin: 0 }}>
            {language === 'bm' ? 'Syabas!' : 'Well done!'}
          </h1>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {score} / {LETTERS_UPPER.length}
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={handleStart}
              onMouseEnter={playHoverSound}
              style={{
                padding: '0.9rem 1.75rem', background: 'var(--duo-blue)', color: '#fff',
                border: 'none', borderRadius: '16px', boxShadow: '0 6px 0 var(--duo-blue-dark)',
                fontWeight: 900, fontSize: '1.1rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}
            >
              <RefreshCw size={20} />
              {language === 'bm' ? 'Main Lagi' : 'Play Again'}
            </button>
            <button
              onClick={onBack}
              onMouseEnter={playHoverSound}
              style={{
                padding: '0.9rem 1.75rem', background: '#fff', color: 'var(--text-secondary)',
                border: '2px solid #E5E5E5', borderRadius: '16px', boxShadow: '0 6px 0 #E5E5E5',
                fontWeight: 900, fontSize: '1.1rem', cursor: 'pointer',
              }}
            >
              {language === 'bm' ? 'Keluar' : 'Exit'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Playing ───────────────────────────────────────────────────────────
  const combinedProgress = (upperProgress + lowerProgress) / 2;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      background: 'linear-gradient(135deg, #E1F5FE 0%, #F3E5F5 50%, #FFF3E0 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {['✍️', '🎨', '⭐', '✨', '🖌️', '🌈', '💫', '🎯'].map((emoji, i) => (
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

      <AppHeader onBack={onBack} gameState={gameState} language={language} />

      <div style={{ padding: '0.3rem 1rem 0.4rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', flex: 1, overflow: 'auto', minHeight: 0, position: 'relative', zIndex: 1 }}>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: '480px', flex: 'none' }}>
          <div style={{
            background: 'linear-gradient(135deg, #FFFFFF, #E1F5FE)',
            border: '2px solid #4FC3F7',
            borderRadius: '999px',
            padding: '5px 16px',
            fontWeight: 800,
            fontSize: '0.9rem',
            boxShadow: '0 6px 18px rgba(79,195,247,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            animation: 'statPulse 2s ease-in-out infinite'
          }}>
            <span style={{ fontSize: '1.1rem' }}>✍️</span>
            <span style={{
              background: 'linear-gradient(135deg, #0277BD, #29B6F6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {currentLetterIndex + 1} / {LETTERS_UPPER.length}
            </span>
          </div>
        </div>

        {/* Always stacked vertically */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '0.6rem',
          width: '100%',
          maxWidth: '420px',
          flex: 'none'
        }}>
          {/* Uppercase canvas with header inside */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: '0.3rem',
            background: 'linear-gradient(135deg, #FFFFFF, #F3E5F5)',
            borderRadius: '22px',
            border: `4px solid ${upperDone ? '#43A047' : '#BA68C8'}`,
            boxShadow: upperDone
              ? '0 10px 28px rgba(102,187,106,0.4), inset 0 -4px 0 rgba(0,0,0,0.08)'
              : '0 10px 28px rgba(186,104,200,0.3), inset 0 -4px 0 rgba(0,0,0,0.08)',
            padding: '0.5rem',
            overflow: 'hidden',
            transition: 'all 0.3s'
          }}>
            {/* Header with letter and label */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              paddingBottom: '0.25rem', borderBottom: '2px solid rgba(186,104,200,0.2)', flex: 'none'
            }}>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                fontSize: '1.4rem',
                lineHeight: 1,
                background: 'linear-gradient(135deg, #BA68C8, #9C27B0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                {upperLetter.char}
              </div>
              <div style={{
                fontWeight: 900,
                fontSize: '0.7rem',
                color: upperDone ? '#43A047' : '#7B1FA2',
                letterSpacing: '0.08em',
                textAlign: 'right',
                fontFamily: "'Baloo 2', cursive"
              }}>
                {upperDone ? '✅ ' : '✏️ '}{language === 'bm' ? 'BESAR' : 'UPPER'} — {upperLetter.char}
              </div>
            </div>
            {/* Canvas */}
            <div style={{
              width: '100%', aspectRatio: '1 / 1',
              overflow: 'hidden',
              borderRadius: '14px',
              background: 'rgba(255,255,255,0.5)'
            }}>
              <TraceCanvas
                ref={upperCanvasRef}
                letter={upperLetter}
                strokeColor="#9C27B0"
                strokeWidth={12}
                onProgress={handleUpperProgress}
                onComplete={handleUpperComplete}
                resetSignal={resetSignal}
              />
            </div>
          </div>

          {upperDone && (
            <div style={{
              display: 'flex', flexDirection: 'column', gap: '0.3rem',
              background: 'linear-gradient(135deg, #FFFFFF, #FFF3E0)',
              borderRadius: '22px',
              border: `4px solid ${lowerDone ? '#43A047' : '#FF9800'}`,
              boxShadow: lowerDone
                ? '0 10px 28px rgba(102,187,106,0.4), inset 0 -4px 0 rgba(0,0,0,0.08)'
                : '0 10px 28px rgba(255,152,0,0.3), inset 0 -4px 0 rgba(0,0,0,0.08)',
              padding: '0.5rem',
              overflow: 'hidden',
              transition: 'all 0.3s',
              animation: 'bounceIn 0.4s ease'
            }}>
              {/* Header with letter and label */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                paddingBottom: '0.25rem', borderBottom: '2px solid rgba(255,152,0,0.2)', flex: 'none'
              }}>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 900,
                  fontSize: '1.4rem',
                  lineHeight: 1,
                  background: 'linear-gradient(135deg, #FF9800, #E65100)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  {lowerLetter.char}
                </div>
                <div style={{
                  fontWeight: 900,
                  fontSize: '0.7rem',
                  color: lowerDone ? '#43A047' : '#E65100',
                  letterSpacing: '0.08em',
                  textAlign: 'right',
                  fontFamily: "'Baloo 2', cursive"
                }}>
                  {lowerDone ? '✅ ' : '✏️ '}{language === 'bm' ? 'KECIL' : 'LOWER'} — {lowerLetter.char}
                </div>
              </div>
              {/* Canvas */}
              <div style={{
                width: '100%', aspectRatio: '1 / 1',
                overflow: 'hidden',
                borderRadius: '14px',
                background: 'rgba(255,255,255,0.5)'
              }}>
                <TraceCanvas
                  ref={lowerCanvasRef}
                  letter={lowerLetter}
                  strokeColor="#FF6F00"
                  strokeWidth={12}
                  onProgress={handleLowerProgress}
                  onComplete={handleLowerComplete}
                  resetSignal={resetSignal}
                />
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flex: 'none' }}>
          <button
            onClick={handleSpeakLetter}
            onMouseEnter={(e) => { playHoverSound(); e.currentTarget.style.transform = 'scale(1.06)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            style={{
              background: 'linear-gradient(135deg, #4FC3F7, #BA68C8, #FF6B9D)',
              backgroundSize: '200% 200%',
              border: 'none',
              borderRadius: '999px',
              padding: '6px 18px',
              color: 'white',
              fontWeight: 800,
              fontSize: '0.85rem',
              fontFamily: 'var(--font-heading)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 5px 16px rgba(186,104,200,0.45)',
              animation: 'rainbowShift 3s ease infinite',
              transition: 'transform 0.2s'
            }}
          >
            <Volume2 size={16} />
            {language === 'bm' ? 'Dengar 🔊' : 'Listen 🔊'}
          </button>
          <button
            onClick={handleReset}
            onMouseEnter={(e) => { playHoverSound(); e.currentTarget.style.transform = 'scale(1.06)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            style={{
              background: 'white',
              border: '2.5px solid #FF6B9D',
              borderRadius: '999px',
              padding: '6px 18px',
              color: '#FF6B9D',
              fontWeight: 800,
              fontSize: '0.85rem',
              fontFamily: 'var(--font-heading)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 5px 16px rgba(255,107,157,0.25)',
              transition: 'transform 0.2s'
            }}
          >
            <RotateCcw size={16} />
            {language === 'bm' ? 'Cuba Lagi' : 'Retry'}
          </button>
        </div>

        {/* Combined progress bar */}
        <div style={{
          width: '100%',
          maxWidth: '480px',
          height: '12px',
          background: 'repeating-linear-gradient(90deg, #E0E0E0 0px, #E0E0E0 14px, #EEEEEE 14px, #EEEEEE 28px)',
          borderRadius: '999px',
          overflow: 'hidden',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.12)',
          flex: 'none'
        }}>
          <div style={{
            width: `${Math.round(combinedProgress * 100)}%`,
            height: '100%',
            background: 'linear-gradient(135deg, #66BB6A, #43A047, #2E7D32)',
            transition: 'width 0.18s ease-out',
            boxShadow: '0 0 12px rgba(102,187,106,0.6)',
            borderRadius: '999px'
          }} />
        </div>

        {/* Next button — only visible when both halves are complete */}
        {bothComplete ? (
          <button
            onClick={handleNext}
            onMouseEnter={(e) => { playHoverSound(); e.currentTarget.style.transform = 'scale(1.06)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            style={{
              padding: '0.7rem 1.7rem',
              background: 'linear-gradient(135deg, #66BB6A, #43A047, #2E7D32)',
              color: '#fff',
              border: 'none',
              borderRadius: '50px',
              boxShadow: '0 8px 22px rgba(102,187,106,0.5), inset 0 -4px 0 rgba(0,0,0,0.15)',
              fontWeight: 900,
              fontSize: '1rem',
              cursor: 'pointer',
              fontFamily: 'var(--font-heading)',
              letterSpacing: '0.05em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              animation: 'bounceIn 0.5s ease',
              transition: 'transform 0.2s',
              flex: 'none'
            }}
          >
            🎉 {currentLetterIndex < LETTERS_UPPER.length - 1
              ? (language === 'bm' ? 'SETERUSNYA' : 'NEXT')
              : (language === 'bm' ? 'SELESAI' : 'FINISH')}
            <ArrowRight size={20} />
          </button>
        ) : (
          <p style={{
            color: '#7B1FA2',
            fontWeight: 800,
            fontSize: '0.85rem',
            textAlign: 'center',
            maxWidth: '420px',
            margin: 0,
            fontFamily: 'var(--font-heading)',
            flex: 'none'
          }}>
            ✨ {language === 'bm'
              ? 'Surih kedua-dua huruf untuk teruskan'
              : 'Trace both letters to continue'} ✨
          </p>
        )}
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
        @keyframes statPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
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
