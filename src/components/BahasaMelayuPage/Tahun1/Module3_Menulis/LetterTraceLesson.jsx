import React, { useCallback, useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { playSound } from '../../../../utils/soundManager';
import SpeechManager from '../../../../services/SpeechManager';
import TraceCanvas from '../../../AgeGroup-4-6/TraceCanvas';
import { LETTERS_UPPER, LETTERS_LOWER } from '../../../../data/letterPaths';
import Celebration from '../../../PendidikanIslamPage/_shared/Celebration';
import useTopicGamification from '../../../../hooks/useTopicGamification';

function getLetterPair(char) {
  const upper = LETTERS_UPPER.find(l => l.char === char);
  const lower = LETTERS_LOWER.find(l => l.char === char.toLowerCase());
  return { upper, lower };
}

export default function LetterTraceLesson({
  onBack, language = 'bm', topicComplete, onNextTopic,
  topicId, topicLabel, letters = [], accentColor = '#7A4FD0',
}) {
  const [idx, setIdx] = useState(0);
  const [upperDone, setUpperDone] = useState(false);
  const [lowerDone, setLowerDone] = useState(false);
  const [finished, setFinished] = useState(false);
  const [resetSignal, setResetSignal] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [caseStep, setCaseStep] = useState('upper');

  const upperRef = useRef(null);
  const lowerRef = useRef(null);
  const advanceTimerRef = useRef(null);

  // Tracing is a finishable ACTIVITY (no scored answers) → completion crown +
  // flat completion bonus, once. Two finish paths (auto on last letter / Finish
  // button) both set `finished`, so award from a single once-guarded effect.
  const { completeActivity } = useTopicGamification(topicId);
  const completedRef = useRef(false);
  useEffect(() => {
    if (finished && !completedRef.current) {
      completedRef.current = true;
      completeActivity();
    }
  }, [finished, completeActivity]);

  const letterPairs = letters.map(getLetterPair).filter(p => p.upper);
  const current = letterPairs[idx];
  const isLast = idx >= letterPairs.length - 1;
  const isFirst = idx <= 0;
  const bothDone = upperDone && lowerDone;

  useEffect(() => {
    return () => {
      SpeechManager.stopSpeaking();
      clearTimeout(advanceTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!current) return;
    SpeechManager.stopSpeaking();
    const t = setTimeout(() => {
      SpeechManager.speak(current.upper.char, 'ms-MY', { rate: 0.6, pitch: 1.1 });
    }, 400);
    return () => { clearTimeout(t); SpeechManager.stopSpeaking(); };
  }, [idx, current]);

  useEffect(() => {
    if (!bothDone) return;
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
  }, [bothDone, isLast, topicId, topicComplete]);

  const handleUpperComplete = useCallback(() => {
    setUpperDone(true);
    playSound('correct');
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 }, scalar: 0.7 });
    if (!lowerDone) {
      clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = setTimeout(() => setCaseStep('lower'), 900);
    }
  }, [lowerDone]);

  const handleLowerComplete = useCallback(() => {
    setLowerDone(true);
    playSound('correct');
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 }, scalar: 0.7 });
    if (!upperDone) {
      clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = setTimeout(() => setCaseStep('upper'), 900);
    }
  }, [upperDone]);

  const goToLetter = useCallback((i) => {
    clearTimeout(advanceTimerRef.current);
    setIdx(i);
    setUpperDone(false);
    setLowerDone(false);
    setCaseStep('upper');
    setResetSignal(s => s + 1);
  }, []);

  const handleNext = useCallback(() => {
    if (isLast) {
      setShowCelebration(true);
      setFinished(true);
      if (topicComplete) topicComplete(topicId);
      return;
    }
    goToLetter(idx + 1);
  }, [isLast, idx, goToLetter, topicId, topicComplete]);

  const showCase = useCallback((step) => {
    clearTimeout(advanceTimerRef.current);
    setCaseStep(step);
  }, []);

  const handleReplay = useCallback(() => {
    if (!current) return;
    SpeechManager.stopSpeaking();
    SpeechManager.speak(current.upper.char, 'ms-MY', { rate: 0.6, pitch: 1.1 });
  }, [current]);

  const handleBack = () => onBack?.();

  const handleRestart = () => {
    clearTimeout(advanceTimerRef.current);
    setIdx(0);
    setUpperDone(false);
    setLowerDone(false);
    setCaseStep('upper');
    setFinished(false);
    setResetSignal(s => s + 1);
    setShowCelebration(false);
  };

  if (finished) {
    const title = language === 'bm' ? 'Tahniah! Semua huruf selesai!' : 'Congratulations! All letters done!';
    const msg = language === 'bm'
      ? `Kamu telah berjaya menulis ${topicLabel}!`
      : `You have completed tracing ${topicLabel}!`;
    return (
      <>
        {showCelebration && <Celebration count={30} />}
        <div style={{
          minHeight: '100dvh',
          background: `linear-gradient(180deg, #F0EBFB 0%, #DCD2F4 50%, #C4B5ED 100%)`,
          fontFamily: "'Fredoka', system-ui, sans-serif",
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '24px', color: '#1E293B',
        }}>
          <div style={{
            background: '#fff', borderRadius: 28, padding: 'clamp(32px,5vw,48px)',
            textAlign: 'center', maxWidth: 400, width: '100%',
            border: `1px solid ${accentColor}1A`, boxShadow: '0 12px 32px -16px rgba(0,0,0,.1)',
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
                color: '#64748B', background: '#F1F5F9', boxShadow: '0 4px 0 #CBD5E1',
              }}>
                ← {language === 'bm' ? 'Kembali' : 'Back'}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!current) {
    return <div style={{ padding: 40, textAlign: 'center', color: '#94A3B8' }}>Loading...</div>;
  }

  return (
    <>
      <style>{`
        .ltl-root {
          height: 100dvh; overflow: hidden;
          background: linear-gradient(180deg, #F0EBFB 0%, #DCD2F4 50%, #C4B5ED 100%);
          font-family: 'Fredoka', system-ui, sans-serif;
          display: flex; flex-direction: column;
          color: #1E293B;
        }
        .ltl-topbar {
          flex-shrink: 0; position: relative;
          display: flex; align-items: center; gap: 4px;
          padding: 10px 12px; min-height: 44px;
          background: rgba(255,255,255,.88);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0,0,0,.06);
        }
        .ltl-topbar::after { content: ''; flex: 0 1 88px; }
        .ltl-back {
          flex-shrink: 0;
          display: flex; align-items: center; gap: 4px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 13px; color: #64748B;
          background: none; border: none; cursor: pointer; padding: 6px 10px;
          border-radius: 10px;
        }
        .ltl-back:hover { background: #F1F5F9; }
        @media (max-width: 480px) {
          .ltl-back-label { display: none; }
          .ltl-topbar::after { flex-basis: 42px; }
        }
        .ltl-title {
          flex: 1; min-width: 0;
          text-align: center;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(12px, 3.4vw, 14px); color: #1E293B;
        }
        .ltl-body {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column;
          padding: clamp(8px, 1.6vh, 16px) 16px;
          overflow: hidden;
        }
        .ltl-picker-wrap {
          flex-shrink: 0;
          margin-bottom: clamp(6px, 1.2vh, 12px);
          display: flex; align-items: center; gap: 10px;
          width: 100%;
        }
        .ltl-picker-label {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(11px, 2vw, 14px);
          color: #64748B; white-space: nowrap;
        }
        .ltl-picker {
          flex: 1;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: clamp(13px, 2.4vw, 16px);
          padding: clamp(5px, .8vh, 8px) clamp(8px, 1.4vw, 12px);
          border: 2px solid ${accentColor}44;
          border-radius: 12px;
          background: #fff;
          color: #1E293B;
          cursor: pointer;
          outline: none;
          min-height: 36px;
          -webkit-appearance: none;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 10px center;
          padding-right: 32px;
        }
        .ltl-picker optgroup {
          font-family: 'Fredoka', sans-serif; font-weight: 600;
          font-size: 12px; color: #94A3B8;
        }
        .ltl-picker option {
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 14px; padding: 4px 8px;
        }
        .ltl-picker option:checked {
          background: ${accentColor}20;
        }
        .ltl-case-pills {
          flex-shrink: 0;
          display: flex; gap: 10px; justify-content: center;
          margin-bottom: clamp(6px, 1.2vh, 12px);
        }
        .ltl-case-pill {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(13px, 2.6vw, 16px);
          display: flex; align-items: center; gap: 7px;
          padding: clamp(6px, 1vh, 9px) clamp(14px, 3.4vw, 24px);
          border-radius: 999px; cursor: pointer;
          border: 2px solid #E2E8F0; background: #fff; color: #64748B;
          transition: background .2s, border-color .2s, color .2s;
        }
        .ltl-case-pill .pill-char {
          font-weight: 900; font-size: 1.3em; line-height: 1;
        }
        .ltl-case-pill.active {
          border-color: ${accentColor}; background: ${accentColor}14; color: ${accentColor};
        }
        .ltl-case-pill.done {
          border-color: #58CC02; background: #F0FBE6; color: #46A302;
        }
        .ltl-case-pill.done.active {
          background: #E2F7CC;
        }
        .ltl-canvas-area {
          flex: 1; min-height: 0;
          display: flex; justify-content: center;
          width: 100%;
        }
        .ltl-card {
          flex: 1; min-width: 0; max-width: 560px;
          background: #fff;
          border-radius: 20px;
          display: flex; flex-direction: column;
          overflow: hidden;
          border: 3px solid #E2E8F0;
          box-shadow: 0 4px 0 #CBD5E1, 0 6px 16px rgba(0,0,0,.06);
          transition: border-color .3s, box-shadow .3s;
        }
        .ltl-card.done {
          border-color: #58CC02;
          box-shadow: 0 6px 0 #46A302, 0 8px 20px rgba(88,204,2,.12);
        }
        .ltl-card-canvas {
          flex: 1; min-height: 0;
          background: #F8FAFC;
        }
        .ltl-controls {
          flex-shrink: 0;
          display: flex; justify-content: center; gap: 12px;
          padding: clamp(6px, 1vh, 12px) 0 0;
        }
        .ltl-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(12px, min(2.6vw, 2vh), 15px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(7px, 1.2vh, 10px) clamp(16px, 3vw, 24px);
          transition: transform .12s;
        }
        .ltl-btn:hover { transform: translateY(-2px); }
        .ltl-btn:active { transform: translateY(1px); }
        .ltl-btn.ghost {
          color: #64748B; background: #F1F5F9;
          box-shadow: 0 3px 0 #CBD5E1;
        }
        .ltl-btn.primary {
          color: #fff;
          background: linear-gradient(180deg, ${accentColor}cc, ${accentColor});
          box-shadow: 0 3px 0 ${accentColor}66;
        }
        .ltl-btn.primary:disabled {
          opacity: .4; cursor: default; transform: none;
        }
        .ltl-footer {
          flex-shrink: 0; text-align: center;
          padding: clamp(2px, .4vh, 4px) 16px clamp(4px, .6vh, 8px);
          font-size: 10px; font-weight: 500; color: #94A3B8;
        }
        @media (max-height: 480px) {
          .ltl-footer { display: none; }
        }
      `}</style>

      <div className="ltl-root">
        <div className="ltl-topbar">
          <button className="ltl-back" onClick={handleBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span className="ltl-back-label">{language === 'bm' ? 'Kembali' : 'Back'}</span>
          </button>
          <span className="ltl-title">{topicLabel}</span>
        </div>

        <div className="ltl-body">
          <div className="ltl-picker-wrap">
            <span className="ltl-picker-label">{language === 'bm' ? 'Huruf:' : 'Letter:'}</span>
            <select className="ltl-picker" value={idx}
              onChange={e => goToLetter(Number(e.target.value))}
            >
              <optgroup label={language === 'bm' ? '— Pilih Huruf —' : '— Select Letter —'}>
                {letterPairs.map((p, i) => (
                  <option key={p.upper.char} value={i}
                    style={{ color: i < idx || (i === idx && bothDone) ? '#16A34A' : '#1E293B' }}
                  >{p.upper.char} {i < idx || (i === idx && bothDone) ? '✓' : ''}</option>
                ))}
              </optgroup>
            </select>
          </div>

          <div className="ltl-case-pills">
            <button
              className={`ltl-case-pill${caseStep === 'upper' ? ' active' : ''}${upperDone ? ' done' : ''}`}
              onClick={() => showCase('upper')}
            >
              <span className="pill-char">{current.upper.char}</span>
              {language === 'bm' ? 'Besar' : 'Big'}{upperDone ? ' ✓' : ''}
            </button>
            <button
              className={`ltl-case-pill${caseStep === 'lower' ? ' active' : ''}${lowerDone ? ' done' : ''}`}
              onClick={() => showCase('lower')}
            >
              <span className="pill-char">{current.lower?.char || current.upper.char.toLowerCase()}</span>
              {language === 'bm' ? 'Kecil' : 'Small'}{lowerDone ? ' ✓' : ''}
            </button>
          </div>

          <div className="ltl-canvas-area">
            <div
              className={`ltl-card${upperDone ? ' done' : ''}`}
              style={{ display: caseStep === 'upper' ? undefined : 'none' }}
            >
              <div className="ltl-card-canvas">
                <TraceCanvas
                  ref={upperRef}
                  letter={current.upper}
                  strokeColor={accentColor}
                  strokeWidth={3}
                  onComplete={handleUpperComplete}
                  resetSignal={resetSignal}
                />
              </div>
            </div>

            <div
              className={`ltl-card${lowerDone ? ' done' : ''}`}
              style={{ display: caseStep === 'lower' ? undefined : 'none' }}
            >
              <div className="ltl-card-canvas">
                <TraceCanvas
                  ref={lowerRef}
                  letter={current.lower}
                  strokeColor={accentColor}
                  strokeWidth={3}
                  onComplete={handleLowerComplete}
                  resetSignal={resetSignal}
                />
              </div>
            </div>
          </div>

          <div className="ltl-controls">
            <button className="ltl-btn ghost" onClick={() => goToLetter(Math.max(0, idx - 1))} disabled={isFirst}>
              ← {language === 'bm' ? 'Sebelum' : 'Prev'}
            </button>
            <button className="ltl-btn ghost" onClick={handleReplay}>
              🔊 {language === 'bm' ? 'Dengar' : 'Listen'}
            </button>
            <button className="ltl-btn primary" disabled={!bothDone} onClick={handleNext}>
              {isLast
                ? (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')
                : (language === 'bm' ? 'Seterusnya →' : 'Next →')}
            </button>
          </div>
        </div>

        <div className="ltl-footer">
          Bahasa Melayu KSSR · {topicLabel}
        </div>
      </div>
    </>
  );
}
