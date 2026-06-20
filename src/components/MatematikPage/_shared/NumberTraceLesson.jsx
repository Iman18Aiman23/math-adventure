import React, { useCallback, useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { playSound } from '../../../utils/soundManager';
import SpeechManager from '../../../services/SpeechManager';
import TraceCanvas from '../../AgeGroup-4-6/TraceCanvas';
import { DIGIT_PATHS } from '../../../data/numberPaths';
import Celebration from '../../PendidikanIslamPage/_shared/Celebration';
import useTopicGamification from '../../../hooks/useTopicGamification';

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

function getDigitPath(char) {
  return DIGIT_PATHS.find(d => d.char === char);
}

const NUMBERS = Array.from({ length: 21 }, (_, i) => i);

export default function NumberTraceLesson({
  onBack, language = 'bm', topicComplete, onNextTopic,
  topicId, topicLabel, accentColor = '#F59E0B',
}) {
  const [idx, setIdx] = useState(0);
  const [digit1Done, setDigit1Done] = useState(false);
  const [digit2Done, setDigit2Done] = useState(false);
  const [finished, setFinished] = useState(false);
  const [resetSignal, setResetSignal] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [digitStep, setDigitStep] = useState('first');

  const digit1Ref = useRef(null);
  const digit2Ref = useRef(null);
  const singleRef = useRef(null);
  const advanceTimerRef = useRef(null);

  const { completeActivity } = useTopicGamification(topicId);
  const completedRef = useRef(false);

  useEffect(() => {
    if (finished && !completedRef.current) {
      completedRef.current = true;
      completeActivity();
    }
  }, [finished, completeActivity]);

  const current = NUMBERS[idx];
  const isLast = idx >= NUMBERS.length - 1;
  const isFirst = idx <= 0;
  const isTwoDigit = current >= 10;

  const tensPath = isTwoDigit ? getDigitPath(String(Math.floor(current / 10))) : null;
  const onesPath = isTwoDigit ? getDigitPath(String(current % 10)) : null;
  const singlePath = !isTwoDigit ? getDigitPath(String(current)) : null;

  const bothDone = digit1Done && (!isTwoDigit || digit2Done);

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

  const handleDigit1Complete = useCallback(() => {
    setDigit1Done(true);
    playSound('correct');
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 }, scalar: 0.7 });
    if (isTwoDigit && !digit2Done) {
      clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = setTimeout(() => setDigitStep('second'), 900);
    }
  }, [isTwoDigit, digit2Done]);

  const handleDigit2Complete = useCallback(() => {
    setDigit2Done(true);
    playSound('correct');
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 }, scalar: 0.7 });
  }, []);

  const goToNumber = useCallback((i) => {
    clearTimeout(advanceTimerRef.current);
    setIdx(i);
    setDigit1Done(false);
    setDigit2Done(false);
    setDigitStep('first');
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

  const showDigit = useCallback((step) => {
    clearTimeout(advanceTimerRef.current);
    setDigitStep(step);
  }, []);

  const handleReplay = useCallback(() => {
    SpeechManager.stopSpeaking();
    SpeechManager.speak(numToBM(current), 'ms-MY', { rate: 0.6, pitch: 1.1 });
  }, [current]);

  const handleBack = () => onBack?.();

  const handleRestart = () => {
    clearTimeout(advanceTimerRef.current);
    setIdx(0);
    setDigit1Done(false);
    setDigit2Done(false);
    setDigitStep('first');
    setFinished(false);
    setResetSignal(s => s + 1);
    setShowCelebration(false);
  };

  if (finished) {
    const title = language === 'bm' ? 'Tahniah! Semua nombor selesai!' : 'Congratulations! All numbers done!';
    const msg = language === 'bm'
      ? `Kamu telah berjaya menulis ${topicLabel}!`
      : `You have completed tracing ${topicLabel}!`;
    const gradient = 'linear-gradient(180deg, #FFFBEB 0%, #FDE68A 50%, #F59E0B 100%)';
    return (
      <>
        {showCelebration && <Celebration count={30} />}
        <div style={{
          minHeight: '100dvh',
          background: gradient,
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
            <button onClick={() => onNextTopic ? onNextTopic() : onBack?.()} style={{
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 15,
              cursor: 'pointer', border: 'none', borderRadius: 999, padding: '12px 28px',
              marginTop: 12, color: '#fff',
              background: `linear-gradient(180deg, ${accentColor}, #B45309)`,
              boxShadow: `0 4px 0 #92400E`,
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
          height: 100dvh; overflow: hidden;
          background: linear-gradient(180deg, #FFFBEB 0%, #FDE68A 50%, #F59E0B 100%);
          font-family: 'Fredoka', system-ui, sans-serif;
          display: flex; flex-direction: column;
          color: #1E293B;
        }
        .ntl-topbar {
          flex-shrink: 0; position: relative;
          display: flex; align-items: center; gap: 4px;
          padding: 10px 12px; min-height: 44px;
          background: rgba(255,255,255,.88);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0,0,0,.06);
        }
        .ntl-topbar::after { content: ''; flex: 0 1 88px; }
        .ntl-back {
          flex-shrink: 0;
          display: flex; align-items: center; gap: 4px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 13px; color: #64748B;
          background: none; border: none; cursor: pointer; padding: 6px 10px;
          border-radius: 10px;
        }
        .ntl-back:hover { background: #F1F5F9; }
        @media (max-width: 480px) {
          .ntl-back-label { display: none; }
          .ntl-topbar::after { flex-basis: 42px; }
        }
        .ntl-title {
          flex: 1; min-width: 0;
          text-align: center;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(12px, 3.4vw, 14px); color: #1E293B;
        }
        .ntl-body {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column;
          padding: clamp(8px, 1.6vh, 16px) 16px;
          overflow: hidden;
        }
        .ntl-picker-wrap {
          flex-shrink: 0;
          margin-bottom: clamp(6px, 1.2vh, 12px);
          display: flex; align-items: center; gap: 10px;
          width: 100%;
        }
        .ntl-picker-label {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(11px, 2vw, 14px);
          color: #64748B; white-space: nowrap;
        }
        .ntl-picker {
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
        .ntl-picker option {
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 14px; padding: 4px 8px;
        }
        .ntl-picker option:checked {
          background: ${accentColor}20;
        }
        .ntl-digit-pills {
          flex-shrink: 0;
          display: flex; gap: 10px; justify-content: center;
          margin-bottom: clamp(6px, 1.2vh, 12px);
        }
        .ntl-digit-pill {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(13px, 2.6vw, 16px);
          display: flex; align-items: center; gap: 7px;
          padding: clamp(6px, 1vh, 9px) clamp(14px, 3.4vw, 24px);
          border-radius: 999px; cursor: pointer;
          border: 2px solid #E2E8F0; background: #fff; color: #64748B;
          transition: background .2s, border-color .2s, color .2s;
        }
        .ntl-digit-pill .pill-digit {
          font-weight: 900; font-size: 1.3em; line-height: 1;
          font-family: 'Baloo 2', sans-serif;
        }
        .ntl-digit-pill.active {
          border-color: ${accentColor}; background: ${accentColor}14; color: ${accentColor};
        }
        .ntl-digit-pill.done {
          border-color: #58CC02; background: #F0FBE6; color: #46A302;
        }
        .ntl-digit-pill.done.active {
          background: #E2F7CC;
        }
        .ntl-canvas-area {
          flex: 1; min-height: 0;
          display: flex; justify-content: center;
          width: 100%;
        }
        .ntl-card {
          flex: 1; min-width: 0; max-width: 560px;
          background: #fff;
          border-radius: 20px;
          display: flex; flex-direction: column;
          overflow: hidden;
          border: 3px solid #E2E8F0;
          box-shadow: 0 4px 0 #CBD5E1, 0 6px 16px rgba(0,0,0,.06);
          transition: border-color .3s, box-shadow .3s;
        }
        .ntl-card.done {
          border-color: #58CC02;
          box-shadow: 0 6px 0 #46A302, 0 8px 20px rgba(88,204,2,.12);
        }
        .ntl-card-canvas {
          flex: 1; min-height: 0;
          background: #F8FAFC;
        }
        .ntl-controls {
          flex-shrink: 0;
          display: flex; justify-content: center; gap: 12px;
          padding: clamp(6px, 1vh, 12px) 0 0;
        }
        .ntl-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(12px, min(2.6vw, 2vh), 15px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(7px, 1.2vh, 10px) clamp(16px, 3vw, 24px);
          transition: transform .12s;
        }
        .ntl-btn:hover { transform: translateY(-2px); }
        .ntl-btn:active { transform: translateY(1px); }
        .ntl-btn.ghost {
          color: #64748B; background: #F1F5F9;
          box-shadow: 0 3px 0 #CBD5E1;
        }
        .ntl-btn.primary {
          color: #fff;
          background: linear-gradient(180deg, ${accentColor}cc, ${accentColor});
          box-shadow: 0 3px 0 ${accentColor}66;
        }
        .ntl-btn.primary:disabled {
          opacity: .4; cursor: default; transform: none;
        }
        .ntl-footer {
          flex-shrink: 0; text-align: center;
          padding: clamp(2px, .4vh, 4px) 16px clamp(4px, .6vh, 8px);
          font-size: 10px; font-weight: 500; color: #94A3B8;
        }
        @media (max-height: 480px) {
          .ntl-footer { display: none; }
        }
      `}</style>

      <div className="ntl-root">
        <div className="ntl-topbar">
          <button className="ntl-back" onClick={handleBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span className="ntl-back-label">{language === 'bm' ? 'Kembali' : 'Back'}</span>
          </button>
          <span className="ntl-title">{topicLabel}</span>
        </div>

        <div className="ntl-body">
          <div className="ntl-picker-wrap">
            <span className="ntl-picker-label">{language === 'bm' ? 'Nombor:' : 'Number:'}</span>
            <select className="ntl-picker" value={idx}
              onChange={e => goToNumber(Number(e.target.value))}
            >
              {NUMBERS.map((n, i) => {
                const isDone = i < idx || (i === idx && bothDone);
                return (
                  <option key={n} value={i}
                    style={{ color: isDone ? '#16A34A' : '#1E293B' }}
                  >{n} {isDone ? '✓' : ''}</option>
                );
              })}
            </select>
          </div>

          {isTwoDigit && (
            <div className="ntl-digit-pills">
              <button
                className={`ntl-digit-pill${digitStep === 'first' ? ' active' : ''}${digit1Done ? ' done' : ''}`}
                onClick={() => showDigit('first')}
              >
                <span className="pill-digit">{tensPath.char}</span>
                {language === 'bm' ? 'Digit 1' : 'Digit 1'}{digit1Done ? ' ✓' : ''}
              </button>
              <button
                className={`ntl-digit-pill${digitStep === 'second' ? ' active' : ''}${digit2Done ? ' done' : ''}`}
                onClick={() => showDigit('second')}
              >
                <span className="pill-digit">{onesPath.char}</span>
                {language === 'bm' ? 'Digit 2' : 'Digit 2'}{digit2Done ? ' ✓' : ''}
              </button>
            </div>
          )}

          <div className="ntl-canvas-area">
            {isTwoDigit ? (
              <>
                <div
                  className={`ntl-card${digit1Done ? ' done' : ''}`}
                  style={{ display: digitStep === 'first' ? undefined : 'none' }}
                >
                  <div className="ntl-card-canvas">
                    <TraceCanvas
                      ref={digit1Ref}
                      letter={tensPath}
                      strokeColor={accentColor}
                      strokeWidth={3}
                      onComplete={handleDigit1Complete}
                      resetSignal={resetSignal}
                    />
                  </div>
                </div>
                <div
                  className={`ntl-card${digit2Done ? ' done' : ''}`}
                  style={{ display: digitStep === 'second' ? undefined : 'none' }}
                >
                  <div className="ntl-card-canvas">
                    <TraceCanvas
                      ref={digit2Ref}
                      letter={onesPath}
                      strokeColor={accentColor}
                      strokeWidth={3}
                      onComplete={handleDigit2Complete}
                      resetSignal={resetSignal}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div
                className={`ntl-card${digit1Done ? ' done' : ''}`}
              >
                <div className="ntl-card-canvas">
                  <TraceCanvas
                    ref={singleRef}
                    letter={singlePath}
                    strokeColor={accentColor}
                    strokeWidth={3}
                    onComplete={handleDigit1Complete}
                    resetSignal={resetSignal}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="ntl-controls">
            <button className="ntl-btn ghost" onClick={() => goToNumber(Math.max(0, idx - 1))} disabled={isFirst}>
              ← {language === 'bm' ? 'Sebelum' : 'Prev'}
            </button>
            <button className="ntl-btn ghost" onClick={handleReplay}>
              🔊 {language === 'bm' ? 'Dengar' : 'Listen'}
            </button>
            <button className="ntl-btn primary" disabled={!bothDone} onClick={handleNext}>
              {isLast
                ? (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')
                : (language === 'bm' ? 'Seterusnya →' : 'Next →')}
            </button>
          </div>
        </div>

        <div className="ntl-footer">
          Matematik KSSR · {topicLabel}
        </div>
      </div>
    </>
  );
}
