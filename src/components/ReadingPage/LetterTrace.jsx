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
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: 'var(--bg-body)' }}>
      <AppHeader onBack={onBack} gameState={gameState} language={language} />

      <div style={{ padding: '0.75rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', flex: 1, overflowY: 'auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '520px' }}>
          <div style={{ background: '#fff', border: '2px solid #E5E5E5', borderRadius: '999px', padding: '6px 16px', fontWeight: 800, color: 'var(--duo-blue)', fontSize: '0.95rem' }}>
            {currentLetterIndex + 1} / {LETTERS_UPPER.length}
          </div>
          <div style={{ background: '#FFF0CC', border: '2px solid #FFC800', borderRadius: '999px', padding: '6px 16px', fontWeight: 800, color: '#B8860B', fontSize: '0.95rem' }}>
            ⭐ {score}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-secondary)', letterSpacing: '0.08em' }}>
            {language === 'bm' ? 'SURIH HURUF BESAR & KECIL' : 'TRACE UPPER & LOWER'}
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
            <div style={{ fontWeight: 900, fontSize: '2.5rem', color: 'var(--duo-blue)' }}>
              {upperLetter.char}
            </div>
            <div style={{ fontWeight: 900, fontSize: '2.5rem', color: 'var(--duo-blue)' }}>
              {lowerLetter.char}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={handleSpeakLetter}
            onMouseEnter={playHoverSound}
            style={{
              background: '#fff', border: '2px solid var(--duo-blue)', borderRadius: '999px',
              padding: '6px 16px', color: 'var(--duo-blue)', fontWeight: 800, fontSize: '0.85rem',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
            }}
          >
            <Volume2 size={16} />
            {language === 'bm' ? 'Dengar' : 'Listen'}
          </button>
          <button
            onClick={handleReset}
            onMouseEnter={playHoverSound}
            style={{
              background: '#fff', border: '2px solid #E5E5E5', borderRadius: '999px',
              padding: '6px 16px', color: 'var(--text-secondary)', fontWeight: 800, fontSize: '0.85rem',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
            }}
          >
            <RotateCcw size={16} />
            {language === 'bm' ? 'Cuba Lagi' : 'Retry'}
          </button>
        </div>

        {/* Side-by-side canvases */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.75rem',
          width: '100%',
          maxWidth: '520px',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
            <div style={{
              fontWeight: 900, fontSize: '0.75rem', color: upperDone ? 'var(--duo-green)' : 'var(--text-secondary)',
              letterSpacing: '0.08em',
            }}>
              {upperDone ? '✓ ' : ''}{language === 'bm' ? 'BESAR' : 'UPPER'} — {upperLetter.char}
            </div>
            <div style={{
              width: '100%', aspectRatio: '1 / 1',
              background: '#fff', borderRadius: '20px',
              border: `2px solid ${upperDone ? 'var(--duo-green)' : '#E5E5E5'}`,
              boxShadow: `0 6px 0 ${upperDone ? 'var(--duo-green-dark)' : '#E5E5E5'}`,
              padding: '0.4rem', overflow: 'hidden',
            }}>
              <TraceCanvas
                ref={upperCanvasRef}
                letter={upperLetter}
                strokeColor="#58CC02"
                strokeWidth={12}
                onProgress={handleUpperProgress}
                onComplete={handleUpperComplete}
                resetSignal={resetSignal}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
            <div style={{
              fontWeight: 900, fontSize: '0.75rem', color: lowerDone ? 'var(--duo-green)' : 'var(--text-secondary)',
              letterSpacing: '0.08em',
            }}>
              {lowerDone ? '✓ ' : ''}{language === 'bm' ? 'KECIL' : 'LOWER'} — {lowerLetter.char}
            </div>
            <div style={{
              width: '100%', aspectRatio: '1 / 1',
              background: '#fff', borderRadius: '20px',
              border: `2px solid ${lowerDone ? 'var(--duo-green)' : '#E5E5E5'}`,
              boxShadow: `0 6px 0 ${lowerDone ? 'var(--duo-green-dark)' : '#E5E5E5'}`,
              padding: '0.4rem', overflow: 'hidden',
            }}>
              <TraceCanvas
                ref={lowerCanvasRef}
                letter={lowerLetter}
                strokeColor="#58CC02"
                strokeWidth={12}
                onProgress={handleLowerProgress}
                onComplete={handleLowerComplete}
                resetSignal={resetSignal}
              />
            </div>
          </div>
        </div>

        {/* Combined progress bar */}
        <div style={{ width: '100%', maxWidth: '520px', height: '10px', background: '#E5E5E5', borderRadius: '999px', overflow: 'hidden' }}>
          <div style={{
            width: `${Math.round(combinedProgress * 100)}%`, height: '100%',
            background: 'linear-gradient(90deg, #58CC02, #46A302)',
            transition: 'width 0.12s ease-out',
          }} />
        </div>

        {/* Next button — only visible when both halves are complete */}
        {bothComplete ? (
          <button
            onClick={handleNext}
            onMouseEnter={playHoverSound}
            style={{
              padding: '0.9rem 2rem', background: 'var(--duo-green)', color: '#fff',
              border: 'none', borderRadius: '16px', boxShadow: '0 6px 0 var(--duo-green-dark)',
              fontWeight: 900, fontSize: '1.1rem', cursor: 'pointer',
              fontFamily: 'var(--font-heading)', letterSpacing: '0.05em',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              animation: 'pulse 0.6s ease-in-out',
            }}
          >
            {currentLetterIndex < LETTERS_UPPER.length - 1
              ? (language === 'bm' ? 'SETERUSNYA' : 'NEXT')
              : (language === 'bm' ? 'SELESAI' : 'FINISH')}
            <ArrowRight size={20} />
          </button>
        ) : (
          <p style={{ color: 'var(--text-light)', fontWeight: 700, fontSize: '0.8rem', textAlign: 'center', maxWidth: '420px', margin: 0 }}>
            {language === 'bm'
              ? 'Surih kedua-dua huruf untuk teruskan'
              : 'Trace both letters to continue'}
          </p>
        )}
      </div>
    </div>
  );
}
