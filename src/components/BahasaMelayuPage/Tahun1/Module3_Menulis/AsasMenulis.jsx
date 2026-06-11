import React, { useCallback, useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { playSound } from '../../../../utils/soundManager';
import SpeechManager from '../../../../services/SpeechManager';
import TraceCanvas from '../../../AgeGroup-4-6/TraceCanvas';
import { LETTERS_UPPER, LETTERS_LOWER } from '../../../../data/letterPaths';
import Celebration from '../../../PendidikanIslamPage/_shared/Celebration';

const TOPIC_ID = '1-3-1-asas-menulis';
const ACCENT = '#7A4FD0';
const ALL_LETTERS = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

function getLetterPair(char) {
  const upper = LETTERS_UPPER.find(l => l.char === char);
  const lower = LETTERS_LOWER.find(l => l.char === char.toLowerCase());
  return { upper, lower };
}

const LETTER_PAIRS = ALL_LETTERS.map(getLetterPair).filter(p => p.upper);

export default function AsasMenulis({ onBack, language = 'bm', topicComplete }) {
  const [idx, setIdx] = useState(0);
  const [upperDone, setUpperDone] = useState(false);
  const [lowerDone, setLowerDone] = useState(false);
  const [finished, setFinished] = useState(false);
  const [resetSignal, setResetSignal] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const upperRef = useRef(null);
  const lowerRef = useRef(null);

  const current = LETTER_PAIRS[idx];
  const isLast = idx >= LETTER_PAIRS.length - 1;
  const isFirst = idx <= 0;
  const bothDone = upperDone && lowerDone;

  useEffect(() => {
    return () => SpeechManager.stopSpeaking();
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
      const t = setTimeout(() => { setShowCelebration(true); setFinished(true); }, 700);
      return () => clearTimeout(t);
    }
  }, [bothDone, isLast]);

  const handleUpperComplete = useCallback(() => {
    setUpperDone(true);
    playSound('correct');
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 }, scalar: 0.7 });
  }, []);

  const handleLowerComplete = useCallback(() => {
    setLowerDone(true);
    playSound('correct');
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 }, scalar: 0.7 });
  }, []);

  const handleNext = useCallback(() => {
    if (isLast) {
      setShowCelebration(true);
      setFinished(true);
      return;
    }
    setIdx(i => i + 1);
    setUpperDone(false);
    setLowerDone(false);
    setResetSignal(s => s + 1);
  }, [isLast]);

  const handleReplay = useCallback(() => {
    if (!current) return;
    SpeechManager.stopSpeaking();
    SpeechManager.speak(current.upper.char, 'ms-MY', { rate: 0.6, pitch: 1.1 });
  }, [current]);

  const handleBack = () => {
    topicComplete?.(TOPIC_ID);
    onBack?.();
  };

  const handleRestart = () => {
    setIdx(0);
    setUpperDone(false);
    setLowerDone(false);
    setFinished(false);
    setResetSignal(s => s + 1);
    setShowCelebration(false);
  };

  const topicTitle = language === 'bm' ? 'Asas Menulis' : 'Basic Writing';

  if (finished) {
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
            border: `1px solid ${ACCENT}1A`, boxShadow: '0 12px 32px -16px rgba(0,0,0,.1)',
          }}>
            <span style={{ fontSize: 'clamp(48px,10vw,72px)', display: 'block', marginBottom: 8 }}>✏️</span>
            <h2 style={{
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
              fontSize: 'clamp(22px,4vw,28px)', margin: '0 0 6px',
            }}>
              {language === 'bm' ? 'Tahniah! Semua huruf selesai!' : 'Congratulations! All letters done!'}
            </h2>
            <p style={{ fontWeight: 500, fontSize: 15, color: '#64748B', margin: '0 0 24px' }}>
              {language === 'bm'
                ? 'Kamu telah berjaya menulis semua huruf A hingga Z!'
                : 'You have successfully traced all letters A to Z!'}
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={handleRestart} style={{
                fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 15,
                cursor: 'pointer', border: 'none', borderRadius: 999, padding: '12px 28px',
                color: '#fff',
                background: `linear-gradient(180deg, ${ACCENT}cc, ${ACCENT})`,
                boxShadow: `0 4px 0 ${ACCENT}66`,
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
        .am-trace-root {
          height: 100dvh; overflow: hidden;
          background: linear-gradient(180deg, #F0EBFB 0%, #DCD2F4 50%, #C4B5ED 100%);
          font-family: 'Fredoka', system-ui, sans-serif;
          display: flex; flex-direction: column;
          color: #1E293B;
        }
        .am-trace-topbar {
          flex-shrink: 0; position: relative;
          display: flex; align-items: center; gap: 4px;
          padding: 10px 12px; min-height: 44px;
          background: rgba(255,255,255,.88);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0,0,0,.06);
        }
        .am-trace-topbar::after { content: ''; flex: 0 1 88px; }
        .am-trace-back {
          flex-shrink: 0;
          display: flex; align-items: center; gap: 4px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 13px; color: #64748B;
          background: none; border: none; cursor: pointer; padding: 6px 10px;
          border-radius: 10px;
        }
        .am-trace-back:hover { background: #F1F5F9; }
        @media (max-width: 480px) {
          .am-back-label { display: none; }
          .am-trace-topbar::after { flex-basis: 42px; }
        }
        .am-trace-title {
          flex: 1; min-width: 0;
          text-align: center;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(12px, 3.4vw, 14px); color: #1E293B;
        }
        .am-trace-body {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column;
          padding: clamp(8px, 1.6vh, 16px) 16px;
          overflow: hidden;
        }
        .am-trace-picker-wrap {
          flex-shrink: 0;
          margin-bottom: clamp(6px, 1.2vh, 12px);
          display: flex; align-items: center; gap: 10px;
          width: 100%;
        }
        .am-trace-picker-label {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(11px, 2vw, 14px);
          color: #64748B; white-space: nowrap;
        }
        .am-trace-picker {
          flex: 1;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: clamp(13px, 2.4vw, 16px);
          padding: clamp(5px, .8vh, 8px) clamp(8px, 1.4vw, 12px);
          border: 2px solid ${ACCENT}44;
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
        .am-trace-picker optgroup {
          font-family: 'Fredoka', sans-serif; font-weight: 600;
          font-size: 12px; color: #94A3B8;
        }
        .am-trace-picker option {
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 14px; padding: 4px 8px;
        }
        .am-trace-picker option:checked {
          background: ${ACCENT}20;
        }
        .am-trace-canvas-area {
          flex: 1; min-height: 0;
          display: flex; gap: clamp(8px, 1.4vh, 14px);
          width: 100%;
        }
        .am-trace-card {
          flex: 1; min-width: 0;
          background: #fff;
          border-radius: 20px;
          display: flex; flex-direction: column;
          overflow: hidden;
          border: 3px solid #E2E8F0;
          box-shadow: 0 4px 0 #CBD5E1, 0 6px 16px rgba(0,0,0,.06);
          transition: border-color .3s, box-shadow .3s;
        }
        .am-trace-card.done {
          border-color: #58CC02;
          box-shadow: 0 6px 0 #46A302, 0 8px 20px rgba(88,204,2,.12);
        }
        .am-trace-card-header {
          flex-shrink: 0;
          display: flex; justify-content: space-between; align-items: center;
          padding: clamp(4px, .6vh, 8px) clamp(8px, 1.2vw, 14px);
          border-bottom: 2px solid #F1F5F9;
        }
        .am-trace-card-char {
          font-family: 'Baloo 2', sans-serif; font-weight: 900;
          font-size: clamp(18px, 3.4vw, 28px);
          line-height: 1;
        }
        .am-trace-card-label {
          font-weight: 800; font-size: clamp(9px, 1.6vw, 12px);
          letter-spacing: .06em;
        }
        .am-trace-card-canvas {
          flex: 1; min-height: 0;
          background: #F8FAFC;
        }
        .am-trace-controls {
          flex-shrink: 0;
          display: flex; justify-content: center; gap: 12px;
          padding: clamp(6px, 1vh, 12px) 0 0;
        }
        .am-trace-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(12px, min(2.6vw, 2vh), 15px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(7px, 1.2vh, 10px) clamp(16px, 3vw, 24px);
          transition: transform .12s;
        }
        .am-trace-btn:hover { transform: translateY(-2px); }
        .am-trace-btn:active { transform: translateY(1px); }
        .am-trace-btn.ghost {
          color: #64748B; background: #F1F5F9;
          box-shadow: 0 3px 0 #CBD5E1;
        }
        .am-trace-btn.primary {
          color: #fff;
          background: linear-gradient(180deg, ${ACCENT}cc, ${ACCENT});
          box-shadow: 0 3px 0 ${ACCENT}66;
        }
        .am-trace-btn.primary:disabled {
          opacity: .4; cursor: default; transform: none;
        }
        .am-trace-footer {
          flex-shrink: 0; text-align: center;
          padding: clamp(2px, .4vh, 4px) 16px clamp(4px, .6vh, 8px);
          font-size: 10px; font-weight: 500; color: #94A3B8;
        }
        @media (max-height: 480px) {
          .am-trace-footer { display: none; }
        }
      `}</style>

      <div className="am-trace-root">
        <div className="am-trace-topbar">
          <button className="am-trace-back" onClick={handleBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span className="am-back-label">{language === 'bm' ? 'Kembali' : 'Back'}</span>
          </button>
          <span className="am-trace-title">{topicTitle}</span>
        </div>

        <div className="am-trace-body">
          <div className="am-trace-picker-wrap">
            <span className="am-trace-picker-label">{language === 'bm' ? 'Huruf:' : 'Letter:'}</span>
            <select className="am-trace-picker" value={idx}
              onChange={e => {
                setIdx(Number(e.target.value));
                setUpperDone(false);
                setLowerDone(false);
                setResetSignal(s => s + 1);
              }}
            >
              <optgroup label={language === 'bm' ? '— Pilih Huruf —' : '— Select Letter —'}>
                {LETTER_PAIRS.map((p, i) => (
                  <option key={p.upper.char} value={i}
                    style={{ color: i < idx || (i === idx && bothDone) ? '#16A34A' : '#1E293B' }}
                  >{p.upper.char} {i < idx || (i === idx && bothDone) ? '✓' : ''}</option>
                ))}
              </optgroup>
            </select>
          </div>

          <div className="am-trace-canvas-area">
            <div className={`am-trace-card${upperDone ? ' done' : ''}`}>
              <div className="am-trace-card-header">
                <span className="am-trace-card-char" style={{ color: upperDone ? '#46A302' : '#334155' }}>
                  {current.upper.char}
                </span>
                <span className="am-trace-card-label" style={{ color: upperDone ? '#46A302' : '#94A3B8' }}>
                  {upperDone ? '✓ Besar' : language === 'bm' ? 'Huruf Besar' : 'Uppercase'}
                </span>
              </div>
              <div className="am-trace-card-canvas">
                <TraceCanvas
                  ref={upperRef}
                  letter={current.upper}
                  strokeColor={ACCENT}
                  strokeWidth={3}
                  onComplete={handleUpperComplete}
                  resetSignal={resetSignal}
                />
              </div>
            </div>

            <div className={`am-trace-card${lowerDone ? ' done' : ''}`}>
              <div className="am-trace-card-header">
                <span className="am-trace-card-char" style={{ color: lowerDone ? '#46A302' : '#334155' }}>
                  {current.lower?.char || current.upper.char.toLowerCase()}
                </span>
                <span className="am-trace-card-label" style={{ color: lowerDone ? '#46A302' : '#94A3B8' }}>
                  {lowerDone ? '✓ Kecil' : language === 'bm' ? 'Huruf Kecil' : 'Lowercase'}
                </span>
              </div>
              <div className="am-trace-card-canvas">
                <TraceCanvas
                  ref={lowerRef}
                  letter={current.lower}
                  strokeColor={ACCENT}
                  strokeWidth={3}
                  onComplete={handleLowerComplete}
                  resetSignal={resetSignal}
                />
              </div>
            </div>
          </div>

          <div className="am-trace-controls">
            <button className="am-trace-btn ghost" onClick={() => { setUpperDone(false); setLowerDone(false); setResetSignal(s => s + 1); setIdx(Math.max(0, idx - 1)); }} disabled={isFirst}>
              ← {language === 'bm' ? 'Sebelum' : 'Prev'}
            </button>
            <button className="am-trace-btn ghost" onClick={handleReplay}>
              🔊 {language === 'bm' ? 'Dengar' : 'Listen'}
            </button>
            <button className="am-trace-btn primary" disabled={!bothDone} onClick={handleNext}>
              {isLast
                ? (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')
                : (language === 'bm' ? 'Seterusnya →' : 'Next →')}
            </button>
          </div>
        </div>

        <div className="am-trace-footer">
          Bahasa Melayu KSSR · {topicTitle}
        </div>
      </div>
    </>
  );
}
