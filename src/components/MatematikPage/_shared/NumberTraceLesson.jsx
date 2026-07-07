import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { playSound } from '../../../utils/soundManager';
import SpeechManager from '../../../services/SpeechManager';
import TraceCanvas from '../../AgeGroup-4-6/TraceCanvas';
import { getNumberGlyph } from '../../../data/numberPaths';
import Celebration from '../../PendidikanIslamPage/_shared/Celebration';
import useTopicGamification from '../../../hooks/useTopicGamification';
import { recordActivityScore } from './MatematikActivityFrame';

const ONES  = ['sifar','satu','dua','tiga','empat','lima','enam','tujuh','lapan','sembilan'];
const TEENS = ['sepuluh','sebelas','dua belas','tiga belas','empat belas','lima belas','enam belas','tujuh belas','lapan belas','sembilan belas'];
const TENS  = ['','','dua puluh','tiga puluh','empat puluh','lima puluh','enam puluh','tujuh puluh','lapan puluh','sembilan puluh'];

function numToBM(n) {
  if (n < 0 || n > 100) return '';
  if (n === 100) return 'seratus';
  if (n < 10)    return ONES[n];
  if (n < 20)    return TEENS[n - 10];
  const t = Math.floor(n / 10), o = n % 10;
  return o === 0 ? TENS[t] : `${TENS[t]} ${ONES[o]}`;
}

const NUMBERS = Array.from({ length: 21 }, (_, i) => i);

export default function NumberTraceLesson({
  onBack, language = 'bm', topicComplete, onNextTopic,
  topicId, topicLabel, accentColor = '#F59E0B',
  scoreStorageKey,
  scoreId,
  hideTopbar,
}) {
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState(false);
  const [finished, setFinished] = useState(false);
  const [resetSignal, setResetSignal] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const canvasRef = useRef(null);
  const advanceTimerRef = useRef(null);

  const { completeActivity } = useTopicGamification(topicId);
  const completedRef = useRef(false);

  useEffect(() => {
    if (finished && !completedRef.current) {
      completedRef.current = true;
      recordActivityScore(scoreStorageKey, scoreId, 10, 10);
      completeActivity();
    }
  }, [finished, completeActivity, scoreStorageKey, scoreId]);

  const current = NUMBERS[idx];
  const isLast = idx >= NUMBERS.length - 1;
  const isFirst = idx <= 0;

  // Whole number on ONE card — single digit full size, two digits side by side.
  // Memoised so the glyph keeps a STABLE reference per number; otherwise a new
  // object each render makes TraceCanvas reset the stroke (→ forces a re-trace).
  const glyph = useMemo(() => getNumberGlyph(current), [current]);

  useEffect(() => {
    return () => {
      SpeechManager.stopSpeaking();
      clearTimeout(advanceTimerRef.current);
    };
  }, []);

  useEffect(() => {
    SpeechManager.stopSpeaking();
    const t = setTimeout(() => {
      SpeechManager.speak(numToBM(current), 'ms-MY', { rate: 0.6, pitch: 1.1 });
    }, 400);
    return () => { clearTimeout(t); SpeechManager.stopSpeaking(); };
  }, [idx, current]);

  useEffect(() => {
    if (!done) return;
    playSound('correct');
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 }, scalar: 0.8 });
    if (isLast) {
      const t = setTimeout(() => {
        setShowCelebration(true);
        setFinished(true);
        if (topicComplete) topicComplete(topicId);
      }, 700);
      return () => clearTimeout(t);
    }
  }, [done, isLast, topicId, topicComplete]);

  const handleComplete = useCallback(() => {
    setDone(true);
    playSound('correct');
    confetti({ particleCount: 50, spread: 65, origin: { y: 0.6 }, scalar: 0.75 });
  }, []);

  const goToNumber = useCallback((i) => {
    clearTimeout(advanceTimerRef.current);
    setIdx(i);
    setDone(false);
    setResetSignal(s => s + 1);
  }, []);

  const handleNext = useCallback(() => {
    if (isLast) {
      setShowCelebration(true);
      setFinished(true);
      if (topicComplete) topicComplete(topicId);
      return;
    }
    goToNumber(idx + 1);
  }, [isLast, idx, goToNumber, topicId, topicComplete]);

  const handleReplay = useCallback(() => {
    SpeechManager.stopSpeaking();
    SpeechManager.speak(numToBM(current), 'ms-MY', { rate: 0.6, pitch: 1.1 });
  }, [current]);

  const handleBack = () => onBack?.();

  const handleRestart = () => {
    clearTimeout(advanceTimerRef.current);
    setIdx(0);
    setDone(false);
    setFinished(false);
    setResetSignal(s => s + 1);
    setShowCelebration(false);
  };

  if (finished) {
    const title = language === 'bm' ? 'Tahniah! Semua nombor selesai!' : 'Congratulations! All numbers done!';
    const msg = language === 'bm'
      ? `Kamu telah berjaya menulis ${topicLabel}!`
      : `You have completed tracing ${topicLabel}!`;
    const gradient = 'linear-gradient(180deg, #FFFBEB 0%, #FDE68A 50%, #D97706 100%)';
    return (
      <>
        {showCelebration && <Celebration count={30} />}
        <div style={{
          minHeight: '100%', boxSizing: 'border-box',
          background: gradient,
            fontFamily: "'Fredoka', system-ui, sans-serif",
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '24px', color: '#1E293B',
          }}>
            <div style={{
              background: '#fff', borderRadius: 28, padding: 'clamp(32px,5vw,48px)',
              textAlign: 'center', maxWidth: 400, width: '100%',
              border: `1px solid ${accentColor}1A`, boxShadow: '0 20px 44px rgba(0,0,0,.35), 0 0 0 1px rgba(255,255,255,.08)',
            }}>
            <span style={{ fontSize: 'clamp(48px,10vw,72px)', display: 'block', marginBottom: 8 }}>✏️</span>
            <h2 style={{
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
              fontSize: 'clamp(22px,4vw,28px)', margin: '0 0 6px',
            }}>
              {title}
            </h2>
            <p style={{ fontWeight: 500, fontSize: 15, color: '#64748B', margin: '0 0 24px' }}>
              {msg}
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={handleRestart} style={{
                fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 15,
                cursor: 'pointer', border: 'none', borderRadius: 999, padding: '12px 28px',
                color: '#fff',
                background: `linear-gradient(180deg, ${accentColor}cc, ${accentColor})`,
                boxShadow: `0 4px 0 ${accentColor}66`,
              }}>
                🔄 {language === 'bm' ? 'Cuba Lagi' : 'Try Again'}
              </button>
              <button onClick={handleBack} style={{
                fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 15,
                cursor: 'pointer', border: 'none', borderRadius: 999, padding: '12px 28px',
                color: '#92400E', background: '#FFFBEB', boxShadow: '0 4px 0 #FDE68A',
              }}>
                ← {language === 'bm' ? 'Kembali' : 'Back'}
              </button>
            </div>
            <button onClick={() => onNextTopic ? onNextTopic() : onBack?.()} style={{
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 15,
              cursor: 'pointer', border: 'none', borderRadius: 999, padding: '12px 28px',
              marginTop: 12, color: '#fff',
              background: `linear-gradient(180deg, ${accentColor}, #B45309)`,
              boxShadow: `0 4px 0 #78350F`,
            }}>
              {language === 'bm' ? 'Topik Seterusnya →' : 'Next Topic →'}
            </button>
          </div>
        </div>
      </>
    );
  }

  if (current === undefined) {
    return <div style={{ padding: 40, textAlign: 'center', color: '#94A3B8' }}>Loading...</div>;
  }

  return (
    <>
      <style>{`
        .ntl-root {
          flex: 1; min-height: 0; overflow: hidden;
          font-family: 'Fredoka', system-ui, sans-serif;
          display: flex; flex-direction: column;
          color: #1E293B;
          position: relative;
        }
        .ntl-topbar {
          flex-shrink: 0; position: relative; z-index: 2;
          display: flex; align-items: center;
          padding: 12px 16px; min-height: 52px;
          background: rgba(255,255,255,.82);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(0,0,0,.06);
        }
        .ntl-back {
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          width: 44px; height: 44px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 14px; color: #B45309;
          background: linear-gradient(180deg, rgba(255,255,255,.96), rgba(255,245,230,.90));
          border: 1px solid rgba(255,255,255,.82);
          cursor: pointer; border-radius: 16px; padding: 0;
          transition: background .2s, transform .14s;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.96), 0 12px 26px rgba(180,83,9,.12);
        }
        .ntl-back:hover { transform: translateY(-1px); }
        .ntl-back:active { transform: translateY(1px); }
        .ntl-back-label { display: none; }
        .ntl-title {
          flex: 1; min-width: 0; text-align: center;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, 3.6vw, 17px);
          color: #B45309;
        }
        .ntl-body {
          flex: 1; min-height: 0; position: relative; z-index: 1;
          display: flex; flex-direction: column;
          padding: clamp(10px, 2vh, 20px) clamp(12px, 2.4vw, 28px) clamp(8px, 1.2vh, 14px);
          overflow: hidden;
        }
        .ntl-picker-wrap {
          flex-shrink: 0;
          margin-bottom: clamp(8px, 1.4vh, 14px);
          display: flex; align-items: center; gap: 10px;
          width: 100%;
        }
        .ntl-picker-label {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(12px, 2vw, 15px);
          color: #92400E; white-space: nowrap;
        }
        .ntl-picker {
          flex: 1;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: clamp(14px, 2.6vw, 17px);
          padding: clamp(6px, .9vh, 10px) clamp(10px, 1.6vw, 14px);
          border: 2px solid ${accentColor}44;
          border-radius: 14px;
          background: #fff;
          color: #1E293B;
          cursor: pointer;
          outline: none;
          min-height: 40px;
          -webkit-appearance: none;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23${accentColor.replace('#','')}' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          padding-right: 36px;
          box-shadow: 0 2px 0 ${accentColor}22;
        }
        .ntl-picker option {
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 14px; padding: 4px 8px;
        }
        .ntl-picker option:checked {
          background: ${accentColor}20;
        }
        .ntl-canvas-area {
          flex: 1; min-height: 0;
          display: flex; justify-content: center;
          width: 100%;
        }
        .ntl-card {
          flex: 1; min-width: 0; max-width: 600px;
          background: #fff;
          border-radius: 28px;
          display: flex; flex-direction: column;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,.82);
          box-shadow: 0 4px 0 ${accentColor}26, 0 16px 40px rgba(0,0,0,.3), 0 0 0 1px rgba(255,255,255,.1);
          transition: border-color .3s, box-shadow .3s;
        }
        .ntl-card.done {
          border-color: #58CC02;
          box-shadow: 0 6px 0 #46A302, 0 18px 44px rgba(88,204,2,.18), 0 0 0 1px rgba(88,204,2,.2);
        }
        .ntl-card-canvas {
          flex: 1; min-height: 0;
          background: #FAFCFE;
          border-radius: 25px 25px 0 0;
        }
        .ntl-controls {
          flex-shrink: 0;
          display: flex; justify-content: center; gap: 10px;
          padding: clamp(8px, 1.4vh, 14px) 0 clamp(2px, .4vh, 6px);
        }
        .ntl-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, min(2.8vw, 2.4vh), 17px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(8px, 1.4vh, 12px) clamp(20px, 3.6vw, 30px);
          transition: transform .12s, box-shadow .12s;
          -webkit-tap-highlight-color: transparent;
        }
        .ntl-btn:hover { transform: translateY(-2px); }
        .ntl-btn:active { transform: translateY(1px); }
        .ntl-btn.ghost {
          color: #92400E;
          background: #fff;
          box-shadow: 0 3px 0 #D9770644, 0 4px 10px rgba(0,0,0,.06);
        }
        .ntl-btn.ghost:hover { filter: brightness(1.03); }
        .ntl-btn.ghost:disabled {
          opacity: .3; cursor: default; transform: none;
          color: #94A3B8; box-shadow: 0 3px 0 #CBD5E1;
        }
        .ntl-btn.primary {
          color: #B45309;
          background: #fff;
          box-shadow: 0 3px 0 #D9770644, 0 4px 10px rgba(0,0,0,.06);
        }
        .ntl-btn.primary:disabled {
          opacity: .3; cursor: default; transform: none;
          color: #94A3B8;
          box-shadow: 0 3px 0 #CBD5E1;
        }
      `}</style>

      <div className="ntl-root">
        {!hideTopbar && (
          <div className="ntl-topbar">
            <button className="ntl-back" onClick={handleBack}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              <span className="ntl-back-label">{language === 'bm' ? 'Kembali' : 'Back'}</span>
            </button>
            <span className="ntl-title">{topicLabel}</span>
          </div>
        )}

        <div className="ntl-body">
          <div className="ntl-picker-wrap">
            <span className="ntl-picker-label">{language === 'bm' ? 'Nombor:' : 'Number:'}</span>
            <select className="ntl-picker" value={idx}
              onChange={e => goToNumber(Number(e.target.value))}
            >
              {NUMBERS.map((n, i) => {
                const isDone = i < idx || (i === idx && done);
                return (
                  <option key={n} value={i}
                    style={{ color: isDone ? '#16A34A' : '#1E293B' }}
                  >{n} {isDone ? '✓' : ''}</option>
                );
              })}
            </select>
          </div>

          <div className="ntl-canvas-area">
            <div className={`ntl-card${done ? ' done' : ''}`}>
              <div className="ntl-card-canvas">
                <TraceCanvas
                  ref={canvasRef}
                  letter={glyph}
                  strokeColor={accentColor}
                  strokeWidth={3}
                  onComplete={handleComplete}
                  resetSignal={resetSignal}
                />
              </div>
            </div>
          </div>

          <div className="ntl-controls">
            <button className="ntl-btn ghost" onClick={() => goToNumber(Math.max(0, idx - 1))} disabled={isFirst}>
              ← {language === 'bm' ? 'Sebelum' : 'Prev'}
            </button>
            <button className="ntl-btn ghost" onClick={handleReplay}>
              🔊 {language === 'bm' ? 'Dengar' : 'Listen'}
            </button>
            <button className="ntl-btn primary" disabled={!done} onClick={handleNext}>
              {isLast
                ? (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')
                : (language === 'bm' ? 'Seterusnya →' : 'Next →')}
            </button>
          </div>
        </div>

      </div>
    </>
  );
}
