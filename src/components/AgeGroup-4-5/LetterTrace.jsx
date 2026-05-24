import React, { useState, useCallback, useEffect, useRef } from 'react';
import { RefreshCw, RotateCcw, Volume2, Trophy, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../utils/soundManager';
import SpeechManager from '../../services/SpeechManager';
import BackButton from '../BackButton';
import TraceCanvas from './TraceCanvas';
import { LETTERS_UPPER, LETTERS_LOWER } from '../../data/letterPaths';

function CanvasCard({ char, label, done, locked, children }) {
  return (
    <div style={{
      flex: 1, minHeight: 0, minWidth: 0,
      display: 'flex', flexDirection: 'column',
      background: '#FFFFFF',
      borderRadius: '20px',
      border: `3px solid ${done ? '#58CC02' : locked ? '#E2E8F0' : '#E2E8F0'}`,
      boxShadow: done
        ? '0 6px 0 #46A302, 0 8px 20px rgba(88,204,2,0.12)'
        : '0 4px 0 #CBD5E1, 0 6px 16px rgba(0,0,0,0.06)',
      padding: '0.5rem',
      overflow: 'hidden',
      transition: 'border-color 0.3s, box-shadow 0.3s',
      opacity: locked ? 0.45 : 1,
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        paddingBottom: '0.3rem', marginBottom: '0.3rem', flexShrink: 0,
        borderBottom: `2px solid ${done ? '#D7FFB8' : '#F1F5F9'}`,
      }}>
        <span style={{
          fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.5rem',
          color: done ? '#46A302' : '#334155',
        }}>
          {char}
        </span>
        <span style={{
          fontWeight: 800, fontSize: '0.68rem', letterSpacing: '0.08em',
          color: done ? '#46A302' : '#94A3B8',
        }}>
          {done ? '✓ ' : locked ? '🔒 ' : '✏️ '}{label}
        </span>
      </div>
      {/* Canvas */}
      <div style={{
        flex: 1, minHeight: 0, borderRadius: '12px', overflow: 'hidden', background: '#F8FAFC',
        pointerEvents: locked ? 'none' : 'auto',
      }}>
        {children}
      </div>
    </div>
  );
}

export default function LetterTrace({ onBack, language = 'bm', theme = {} }) {
  const [localGameState, setLocalGameState] = useState('menu');
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [upperProgress, setUpperProgress] = useState(0);
  const [lowerProgress, setLowerProgress] = useState(0);
  const [upperDone, setUpperDone] = useState(false);
  const [lowerDone, setLowerDone] = useState(false);
  const [resetSignal, setResetSignal] = useState(0);
  const [slideToLower, setSlideToLower] = useState(false);
  const [showSideBySide, setShowSideBySide] = useState(false);
  const [upperImageData, setUpperImageData] = useState(null);
  const [lowerImageData, setLowerImageData] = useState(null);

  const upperCanvasRef = useRef(null);
  const lowerCanvasRef = useRef(null);

  const upperLetter = LETTERS_UPPER[currentLetterIndex];
  const lowerLetter = LETTERS_LOWER[currentLetterIndex];
  const bothComplete = upperDone && lowerDone;

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

  useEffect(() => {
    if (bothComplete && localGameState === 'playing') {
      playSound('correct');
      confetti({ particleCount: 120, spread: 90, origin: { y: 0.55 } });
      setScore(s => s + 1);
      setTimeout(() => setShowSideBySide(true), 900);
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
    setSlideToLower(false);
    setShowSideBySide(false);
    setUpperImageData(null);
    setLowerImageData(null);
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
      setSlideToLower(false);
      setShowSideBySide(false);
      setUpperImageData(null);
      setLowerImageData(null);
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
    setSlideToLower(false);
    setShowSideBySide(false);
    setUpperImageData(null);
    setLowerImageData(null);
    upperCanvasRef.current?.reset();
    lowerCanvasRef.current?.reset();
  }, []);

  const handleSlideToLower = useCallback(() => {
    playHoverSound();
    setSlideToLower(true);
  }, []);

  const handleSpeakLetter = useCallback(() => {
    if (!upperLetter) return;
    const phrase = language === 'bm'
      ? `Surih huruf ${upperLetter.char} dan ${lowerLetter.char}`
      : `Trace the letter ${upperLetter.char} and ${lowerLetter.char}`;
    SpeechManager.speak(phrase, language === 'bm' ? 'ms-MY' : 'en-US');
  }, [upperLetter, lowerLetter, language]);

  const handleUpperProgress = useCallback((p) => setUpperProgress(p), []);
  const handleLowerProgress = useCallback((p) => setLowerProgress(p), []);

  const handleUpperComplete = useCallback(() => {
    setUpperDone(true);
    // Defer by one rAF so the frame loop repaints the completed segments first
    requestAnimationFrame(() => {
      setUpperImageData(upperCanvasRef.current?.getImageData() ?? null);
    });
  }, []);

  const handleLowerComplete = useCallback(() => {
    setLowerDone(true);
    requestAnimationFrame(() => {
      setLowerImageData(lowerCanvasRef.current?.getImageData() ?? null);
    });
  }, []);

  const heroBg     = theme.heroBg     || 'linear-gradient(135deg, #4A148C 0%, #7B1FA2 50%, #CE93D8 100%)';
  const heroBorder = theme.heroBorder || '#CE93D8';
  const swatch     = theme.swatch     || '#7B1FA2';

  // ── Menu ──────────────────────────────────────────────────────────────
  if (localGameState === 'menu') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#F8FAFC' }}>
        <style>{`
          .lt-start-btn:hover  { transform: translateY(-3px) scale(1.04) !important; }
          .lt-start-btn:active { transform: translateY(2px)  scale(0.97) !important; }
        `}</style>

        <BackButton onClick={onBack} />

        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', padding: '2rem 1.5rem', gap: '1.5rem',
        }}>
          {/* Themed hero card */}
          <div style={{
            background: heroBg,
            borderRadius: '28px', padding: '1.25rem 2rem',
            border: `2px solid ${heroBorder}`,
            boxShadow: `0 12px 40px ${swatch}40`,
            textAlign: 'center', maxWidth: '360px', width: '100%',
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.2em', marginBottom: '0.4rem' }}>
              ✨ GAME ✨
            </div>
            <h1 style={{
              fontWeight: 900, fontSize: '2.4rem', margin: '0 0 0.75rem',
              color: '#fff', fontFamily: 'var(--font-heading)',
              textShadow: '0 3px 8px rgba(0,0,0,0.25)',
            }}>
              Letter Trace
            </h1>
            <p style={{
              color: 'rgba(255,255,255,0.92)', fontWeight: 700, fontSize: '1rem', margin: 0, lineHeight: 1.5,
            }}>
              {language === 'bm'
                ? 'Surih huruf besar dan kecil dengan satu gerakan lancar!'
                : 'Trace each uppercase and lowercase letter with one smooth motion!'}
            </p>
          </div>

          {/* Themed stat badges */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              ['✏️', language === 'bm' ? '26 Huruf'     : '26 Letters'],
              ['🔠', language === 'bm' ? 'Besar & Kecil' : 'Upper & Lower'],
              ['⭐', language === 'bm' ? 'Surih Terus'   : 'Trace Along'],
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

          {/* Themed start button */}
          <button
            className="lt-start-btn"
            onClick={handleStart}
            onMouseEnter={playHoverSound}
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

  // ── Finished ──────────────────────────────────────────────────────────
  if (localGameState === 'finished') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#F8FAFC' }}>
        <BackButton onClick={onBack} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', gap: '1.25rem' }}>
          <Trophy size={96} color="#FFC800" />
          <h1 style={{ fontWeight: 900, fontSize: '2rem', color: '#58CC02', margin: 0 }}>
            {language === 'bm' ? 'Syabas!' : 'Well done!'}
          </h1>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1E293B' }}>
            {score} / {LETTERS_UPPER.length}
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={handleStart}
              onMouseEnter={playHoverSound}
              style={{
                padding: '0.9rem 1.75rem',
                background: 'linear-gradient(135deg, #58CC02, #46A302)',
                color: '#fff', border: 'none',
                borderRadius: '999px', boxShadow: '0 6px 0 #2E7D32',
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
                padding: '0.9rem 1.75rem', background: '#fff', color: '#64748B',
                border: '2.5px solid #E2E8F0', borderRadius: '999px', boxShadow: '0 6px 0 #CBD5E1',
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
  const progress = (currentLetterIndex / LETTERS_UPPER.length) * 100;
  const combinedProgress = (upperProgress + lowerProgress) / 2;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#F8FAFC', overflow: 'hidden', height: '100%' }}>
      <style>{`
        @keyframes bounceIn {
          0%   { transform: scale(0.3); opacity: 0; }
          50%  { transform: scale(1.1); }
          100% { transform: scale(1);   opacity: 1; }
        }
        @keyframes sideBySideIn {
          0%   { transform: scale(0.92); opacity: 0; }
          100% { transform: scale(1);    opacity: 1; }
        }
      `}</style>

      {/* Top bar: back + progress + score */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0,
        padding: '0.6rem 1rem 0.4rem',
        paddingTop: 'max(0.6rem, env(safe-area-inset-top))',
      }}>
        <BackButton onClick={onBack} style={{ position: 'static', flexShrink: 0 }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          <div style={{ height: 10, borderRadius: 999, background: '#E2E8F0', overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 999,
              background: theme.planetBody || 'linear-gradient(90deg, #6366F1, #8B5CF6)',
              width: `${progress}%`,
              transition: 'width 0.4s cubic-bezier(0.4,0,0.2,1)',
            }} />
          </div>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#94A3B8', textAlign: 'right' }}>
            {currentLetterIndex + 1} / {LETTERS_UPPER.length}
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

      {/* Heading */}
      <div style={{ textAlign: 'center', flexShrink: 0, padding: '0 1rem 0.25rem' }}>
        <p style={{ margin: 0, fontSize: '0.78rem', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {language === 'bm'
            ? `Surih huruf ${upperLetter.char} dan ${lowerLetter.char}`
            : `Trace letter ${upperLetter.char} and ${lowerLetter.char}`}
        </p>
      </div>

      {/* Canvas area */}
      <div style={{ flex: 1, minHeight: 0, position: 'relative', overflow: 'hidden' }}>

        {/* ── Phase 3: both complete — side by side with captured drawings ── */}
        {showSideBySide && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'row',
            gap: '0.5rem', padding: '0.5rem 0.75rem',
            animation: 'sideBySideIn 0.5s cubic-bezier(0.34,1.56,0.64,1)',
          }}>
            {[
              { char: upperLetter.char, label: language === 'bm' ? 'BESAR' : 'UPPER', img: upperImageData },
              { char: lowerLetter.char, label: language === 'bm' ? 'KECIL' : 'LOWER', img: lowerImageData },
            ].map(({ char, label, img }) => (
              <div key={char} style={{
                flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column',
                background: '#F0FDF4', borderRadius: '20px',
                border: '3px solid #58CC02',
                boxShadow: '0 6px 0 #46A302, 0 8px 20px rgba(88,204,2,0.12)',
                padding: '0.5rem', overflow: 'hidden',
              }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  paddingBottom: '0.3rem', marginBottom: '0.3rem', flexShrink: 0,
                  borderBottom: '2px solid #D7FFB8',
                }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.5rem', color: '#46A302' }}>
                    {char}
                  </span>
                  <span style={{ fontWeight: 800, fontSize: '0.65rem', color: '#46A302', letterSpacing: '0.08em' }}>
                    ✓ {label}
                  </span>
                </div>
                <div style={{ flex: 1, minHeight: 0, borderRadius: '12px', overflow: 'hidden', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {img
                    ? <img src={img} alt={char} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
                    : <span style={{ fontSize: '4rem', fontFamily: 'var(--font-heading)', fontWeight: 900, color: '#58CC02' }}>{char}</span>
                  }
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Phase 1 & 2: slider ── */}
        {!showSideBySide && (
          <div style={{
            position: 'absolute',
            left: '0.75rem', right: '0.75rem',
            top: 0, height: '200%',
            display: 'flex', flexDirection: 'column',
            transform: slideToLower ? 'translateY(-50%)' : 'translateY(0)',
            transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)',
          }}>
            {/* Uppercase panel — top half, fills full visible area */}
            <div style={{ height: '50%', paddingBottom: '0.25rem', display: 'flex', flexDirection: 'column', position: 'relative' }}>
              <CanvasCard
                label={language === 'bm' ? 'HURUF BESAR' : 'UPPERCASE'}
                char={upperLetter.char}
                done={upperDone}
                locked={false}
              >
                <TraceCanvas
                  ref={upperCanvasRef}
                  letter={upperLetter}
                  strokeColor={upperDone ? '#58CC02' : (theme.swatch || '#9C27B0')}
                  strokeWidth={12}
                  onProgress={handleUpperProgress}
                  onComplete={handleUpperComplete}
                  resetSignal={resetSignal}
                />
              </CanvasCard>

            </div>

            {/* Lowercase panel — bottom half, revealed by slide */}
            <div style={{ height: '50%', paddingTop: '0.25rem', display: 'flex', flexDirection: 'column' }}>
              <CanvasCard
                label={language === 'bm' ? 'HURUF KECIL' : 'LOWERCASE'}
                char={lowerLetter.char}
                done={lowerDone}
                locked={!slideToLower}
              >
                <TraceCanvas
                  ref={lowerCanvasRef}
                  letter={lowerLetter}
                  strokeColor={lowerDone ? '#58CC02' : (theme.swatch || '#FF6F00')}
                  strokeWidth={12}
                  onProgress={handleLowerProgress}
                  onComplete={handleLowerComplete}
                  resetSignal={resetSignal}
                />
              </CanvasCard>
            </div>
          </div>
        )}
      </div>

      {/* Bottom zone — always fixed, never scrolls */}
      <div style={{
        flexShrink: 0,
        padding: '0.5rem 1rem',
        paddingBottom: 'max(0.65rem, env(safe-area-inset-bottom))',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.45rem',
      }}>
        {/* Trace progress bar */}
        <div style={{ width: '100%', maxWidth: 480, height: 8, borderRadius: 999, background: '#E2E8F0', overflow: 'hidden' }}>
          <div style={{
            width: `${Math.round(combinedProgress * 100)}%`,
            height: '100%', borderRadius: 999,
            background: 'linear-gradient(90deg, #58CC02, #46A302)',
            transition: 'width 0.18s ease-out',
          }} />
        </div>

        {/* ── Phase 3: both done, side by side visible ── */}
        {showSideBySide ? (
          <button
            onClick={handleNext}
            onMouseEnter={e => { playHoverSound(); e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.55rem 2.25rem',
              background: 'linear-gradient(135deg, #58CC02, #46A302)',
              color: '#fff', border: 'none', borderRadius: '999px',
              boxShadow: '0 4px 0 #2E7D32',
              fontWeight: 900, fontSize: '1rem',
              cursor: 'pointer', fontFamily: 'var(--font-heading)',
              transition: 'transform 0.15s',
              animation: 'bounceIn 0.4s ease',
            }}
          >
            {currentLetterIndex < LETTERS_UPPER.length - 1 ? (
              <>
                ✏️ {language === 'bm'
                  ? `Surih huruf ${LETTERS_UPPER[currentLetterIndex + 1].char}${LETTERS_LOWER[currentLetterIndex + 1].char}`
                  : `Trace letter ${LETTERS_UPPER[currentLetterIndex + 1].char}${LETTERS_LOWER[currentLetterIndex + 1].char}`}
                <ArrowRight size={16} />
              </>
            ) : (language === 'bm' ? 'SELESAI' : 'FINISH')}
          </button>

        /* ── Phase 1b: uppercase done — keep Listen + Retry, show trace-lower button ── */
        ) : upperDone && !slideToLower ? (
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={handleSpeakLetter}
              onMouseEnter={playHoverSound}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
              onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                background: '#F1F5F9', border: '2px solid #E2E8F0',
                borderRadius: '999px', padding: '0.4rem 1rem',
                color: '#475569', fontWeight: 700, fontSize: '0.85rem',
                cursor: 'pointer', boxShadow: '0 2px 0 #CBD5E1',
                transition: 'transform 0.15s',
              }}
            >
              <Volume2 size={15} />
              {language === 'bm' ? 'Dengar' : 'Listen'}
            </button>

            <button
              onClick={handleReset}
              onMouseEnter={playHoverSound}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
              onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                background: '#FFF1F2', border: '2px solid #FDA4AF',
                borderRadius: '999px', padding: '0.4rem 1rem',
                color: '#BE123C', fontWeight: 700, fontSize: '0.85rem',
                cursor: 'pointer', boxShadow: '0 2px 0 #FDA4AF',
                transition: 'transform 0.15s',
              }}
            >
              <RotateCcw size={15} />
              {language === 'bm' ? 'Cuba Lagi' : 'Retry'}
            </button>

            <button
              onClick={handleSlideToLower}
              onMouseEnter={e => { playHoverSound(); e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.4rem 1rem',
                background: 'linear-gradient(135deg, #58CC02, #46A302)',
                color: '#fff', border: 'none', borderRadius: '999px',
                boxShadow: '0 4px 0 #2E7D32',
                fontWeight: 900, fontSize: '0.85rem',
                cursor: 'pointer', fontFamily: 'var(--font-heading)',
                transition: 'transform 0.15s',
                animation: 'bounceIn 0.4s ease',
              }}
            >
              ✏️ {language === 'bm'
                ? `Surih huruf ${lowerLetter.char}`
                : `Trace letter ${lowerLetter.char}`}
              <ArrowRight size={15} />
            </button>
          </div>

        /* ── Phase 1 & 2: actively tracing — Listen + Retry + disabled NEXT ── */
        ) : !bothComplete ? (
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={handleSpeakLetter}
              onMouseEnter={playHoverSound}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
              onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                background: '#F1F5F9', border: '2px solid #E2E8F0',
                borderRadius: '999px', padding: '0.4rem 1rem',
                color: '#475569', fontWeight: 700, fontSize: '0.85rem',
                cursor: 'pointer', boxShadow: '0 2px 0 #CBD5E1',
                transition: 'transform 0.15s',
              }}
            >
              <Volume2 size={15} />
              {language === 'bm' ? 'Dengar' : 'Listen'}
            </button>

            <button
              onClick={handleReset}
              onMouseEnter={playHoverSound}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
              onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                background: '#FFF1F2', border: '2px solid #FDA4AF',
                borderRadius: '999px', padding: '0.4rem 1rem',
                color: '#BE123C', fontWeight: 700, fontSize: '0.85rem',
                cursor: 'pointer', boxShadow: '0 2px 0 #FDA4AF',
                transition: 'transform 0.15s',
              }}
            >
              <RotateCcw size={15} />
              {language === 'bm' ? 'Cuba Lagi' : 'Retry'}
            </button>

            <button
              disabled
              style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.4rem 1.1rem',
                background: '#E2E8F0', color: '#94A3B8',
                border: 'none', borderRadius: '999px',
                boxShadow: '0 2px 0 #CBD5E1',
                fontWeight: 900, fontSize: '0.85rem',
                cursor: 'not-allowed', fontFamily: 'var(--font-heading)',
              }}
            >
              {currentLetterIndex < LETTERS_UPPER.length - 1
                ? (language === 'bm' ? 'SETERUSNYA' : 'NEXT')
                : (language === 'bm' ? 'SELESAI' : 'FINISH')}
              <ArrowRight size={15} />
            </button>
          </div>
        ) : null /* 900ms confetti window — hide controls */ }
      </div>
    </div>
  );
}
