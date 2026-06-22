import React, { useState, useContext } from 'react';
import confetti from 'canvas-confetti';
import { playSound } from '../../../utils/soundManager';
import { MatematikNavContext } from './MatematikNavContext';

const PASS_RATIO = 0.8; // 80% needed to unlock "Topik Seterusnya →"

export default function MatematikActivityFrame({
  buildRound,
  renderQuestion,
  theme,
  onExit,
}) {
  const nav = useContext(MatematikNavContext);
  const [questions, setQuestions] = useState(() => buildRound());
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [streak, setStreak] = useState(0);
  const [complete, setComplete] = useState(false);

  const q = questions[idx];
  if (!q) return null;

  const answered = selected !== null;
  const isCorrect = answered && selected === q.answer;
  const isLast = idx + 1 >= questions.length;

  const total = questions.length;
  const scorePct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const passMark = Math.ceil(total * PASS_RATIO);
  const passed = correct >= passMark;

  const C = {
    accent: theme.accent || '#F59E0B',
    dark: theme.dark || '#B45309',
    cd: theme.cd || '#92400E',
    green: '#16A34A',
    red: '#DC2626',
  };

  const handlePick = (value) => {
    if (answered) return;
    setSelected(value);
    if (value === q.answer) {
      setCorrect(c => c + 1);
      setStreak(s => s + 1);
      playSound('correct');
      confetti({ particleCount: 45, spread: 60, startVelocity: 32, origin: { y: 0.7 }, scalar: 0.85 });
    } else {
      setWrong(w => w + 1);
      setStreak(0);
      playSound('wrong');
    }
  };

  const handleNext = () => {
    if (isLast) {
      setComplete(true);
      playSound('streak');
      confetti({ particleCount: 200, spread: 160, origin: { y: 0.4 } });
      setTimeout(() => confetti({ particleCount: 140, spread: 120, startVelocity: 45, origin: { y: 0.55 } }), 250);
      return;
    }
    setSelected(null);
    setIdx(idx + 1);
  };

  const handleRedo = () => {
    setQuestions(buildRound());
    setIdx(0);
    setSelected(null);
    setCorrect(0);
    setWrong(0);
    setStreak(0);
    setComplete(false);
  };

  const progressInGroup = streak > 0 && streak % 10 === 0 ? 10 : streak % 10;

  const ctx = { answered, selected, answer: q.answer, isCorrect, handlePick, handleNext, streak, correct, wrong, theme: C };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, width: '100%' }}>
      <style>{`
        .maf-scroll { flex: 1; min-height: 0; overflow-y: auto; -webkit-overflow-scrolling: touch; }
        .maf-center {
          min-height: 100%; box-sizing: border-box;
          display: flex; flex-direction: column; justify-content: center; align-items: center;
          padding: clamp(14px, 3vmin, 40px);
        }
        .maf-content {
          width: 100%; max-width: min(94vw, 860px);
          display: flex; flex-direction: column; align-items: center;
          gap: clamp(8px, 1.6vmin, 18px);
        }
        .maf-head {
          font-family: 'Fredoka', sans-serif; font-weight: 700;
          font-size: clamp(14px, 2.4vmin, 24px); color: #64748B; text-align: center; letter-spacing: .01em;
        }
        /* Header sits as a TITLE near the top; body centred in the space below. */
        .maf-scroll-q { display: flex; flex-direction: column; }
        .maf-head-title { flex-shrink: 0; padding: clamp(10px, 2.4vmin, 22px) 16px clamp(2px, 0.6vmin, 8px); }
        .maf-body {
          flex: 1 0 auto; box-sizing: border-box;
          display: flex; flex-direction: column; justify-content: center; align-items: center;
          padding: clamp(6px, 1.4vmin, 14px) clamp(14px, 3vmin, 40px) clamp(8px, 1.6vmin, 16px);
        }
        .maf-question {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(22px, 4.6vmin, 44px); color: #1E293B; text-align: center; line-height: 1.15;
        }
        .maf-feedback {
          font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(17px, 2.6vmin, 28px);
          text-align: center; min-height: clamp(24px, 3.4vmin, 38px);
          display: flex; align-items: center; justify-content: center;
        }
        .maf-feedback.ok { color: ${C.green}; }
        .maf-feedback.no { color: ${C.red}; }
        .maf-next {
          padding: clamp(11px, 1.5vmin, 17px) clamp(28px, 4vmin, 52px); border: none; border-radius: 999px;
          background: ${C.accent}; color: #fff;
          font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(17px, 2.6vmin, 26px);
          cursor: pointer; box-shadow: 0 4px 0 ${C.cd}; transition: transform .1s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .maf-next:hover:not(:disabled) { transform: translateY(-2px); }
        .maf-next:active:not(:disabled) { transform: translateY(2px); }
        .maf-next:disabled { background: #E5E7EB; color: #9CA3AF; box-shadow: 0 4px 0 #D1D5DB; cursor: not-allowed; }
        .maf-footer {
          flex-shrink: 0; display: flex; align-items: center; justify-content: space-between;
          gap: 10px; padding: clamp(8px, 1.2vmin, 15px) clamp(16px, 2.4vmin, 34px);
          background: rgba(255,255,255,.85); backdrop-filter: blur(12px);
          border-top: 1px solid #E2E8F0;
        }
        .maf-footer-tally {
          display: flex; align-items: center; gap: 6px 10px; flex-wrap: wrap;
          font-family: 'Fredoka', sans-serif; font-size: clamp(13px, 1.7vmin, 18px); font-weight: 600; color: #64748B;
        }
        .maf-stats { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
        .maf-stats .maf-stat { display: inline-flex; align-items: center; gap: 3px; }
        .maf-stats .maf-divider { color: #CBD5E1; font-weight: 400; }
        .maf-done-emoji { font-size: clamp(52px, 14vmin, 120px); line-height: 1; }
        .maf-summary { display: flex; flex-direction: column; gap: clamp(8px, 1.4vmin, 14px); width: 100%; max-width: 340px; }
        .maf-summary-row {
          display: flex; align-items: center; justify-content: space-between;
          background: #fff; border: 2px solid #E2E8F0; border-radius: 14px;
          padding: clamp(10px, 1.6vmin, 16px) clamp(16px, 2.4vmin, 26px);
          font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(16px, 2.4vmin, 22px); color: #334155;
        }
        .maf-summary-row b { font-size: clamp(20px, 3vmin, 28px); }
        .maf-summary-row.ok b { color: ${C.green}; }
        .maf-summary-row.no b { color: ${C.red}; }
        .maf-complete-actions { display: flex; flex-wrap: wrap; gap: clamp(10px, 1.6vmin, 16px); justify-content: center; }
        .maf-btn-secondary {
          padding: clamp(11px, 1.5vmin, 17px) clamp(24px, 3.4vmin, 44px); border-radius: 999px;
          border: 2px solid ${C.accent}; background: #fff; color: ${C.dark};
          font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(16px, 2.4vmin, 24px);
          cursor: pointer; -webkit-tap-highlight-color: transparent; transition: transform .1s ease;
        }
        .maf-btn-secondary:active { transform: translateY(1px); }
        @keyframes snkBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes snkShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
      `}</style>

      {complete ? (
        <div className="maf-scroll">
          <div className="maf-center">
            <div className="maf-content" style={{ textAlign: 'center' }}>
              <div className="maf-done-emoji">{passed ? '🎉' : '💪'}</div>
              <div className="maf-question">{passed ? 'Tahniah!' : 'Cuba lagi!'}</div>
              <div className="maf-head">Skor kamu: {correct}/{questions.length} ({scorePct}%)</div>
              <div className="maf-summary">
                <div className="maf-summary-row ok"><span>✅ Betul</span><b>{correct}</b></div>
                <div className="maf-summary-row no"><span>❌ Salah</span><b>{wrong}</b></div>
              </div>
              {!passed && (
                <div className="maf-head" style={{ color: '#B45309' }}>
                  Dapat {passMark}/{questions.length} (80%) untuk buka topik seterusnya
                </div>
              )}
              <div className="maf-complete-actions">
                <button className="maf-btn-secondary" type="button" onClick={handleRedo}>↻ Main Semula</button>
                <button className="maf-next" type="button" disabled={!passed}
                  onClick={() => (nav?.goNext ? nav.goNext() : onExit?.())}>
                  {nav?.hasNext === false ? 'Selesai ✓' : 'Topik Seterusnya →'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="maf-scroll maf-scroll-q">
            <div className="maf-head maf-head-title">{q.header}</div>
            <div className="maf-body">
              <div className="maf-content">
                {q.prompt && <div className="maf-question">{q.prompt}</div>}
                {renderQuestion(q, ctx)}
                <div className={`maf-feedback ${answered ? (isCorrect ? 'ok' : 'no') : ''}`}>
                  {answered ? (isCorrect ? 'Betul! 🎉' : 'Cuba lagi') : ''}
                </div>
                {/* Advance button appears only AFTER answering (keypad uses Semak to submit) */}
                {answered && (
                  <button className="maf-next" type="button" onClick={handleNext}>
                    {isLast ? 'Tamat 🎉' : 'Seterusnya →'}
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="maf-footer">
            <div className="maf-footer-tally">
              <span>Jawapan :</span>
              <span className="maf-stats">
                <span className="maf-stat" style={{ color: '#1E293B' }}>
                  <span>✅</span><span>{correct}</span><span style={{ color: '#94A3B8', fontWeight: 500 }}>Betul</span>
                </span>
                <span className="maf-divider">|</span>
                <span className="maf-stat" style={{ color: '#EF4444' }}>
                  <span>❌</span><span>{wrong}</span><span style={{ color: '#94A3B8', fontWeight: 500 }}>salah</span>
                </span>
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: 18 }}>🏆</span>
              <div style={{ width: 70, height: 7, background: 'rgba(204,119,0,0.15)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${(progressInGroup / 10) * 100}%`, height: '100%', background: '#FFB800', borderRadius: 4, transition: 'width .3s ease-out' }} />
              </div>
              <span style={{ color: '#CC7700', fontSize: '0.85rem', fontWeight: 900, minWidth: 28, textAlign: 'right' }}>
                {progressInGroup}/10
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
