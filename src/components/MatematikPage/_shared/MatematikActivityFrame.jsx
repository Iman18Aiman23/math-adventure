import React, { useContext, useState } from 'react';
import confetti from 'canvas-confetti';
import { playSound } from '../../../utils/soundManager';
import { MatematikNavContext } from './MatematikNavContext';
import QuestionIssueReportButton from './QuestionIssueReportButton';

const PASS_RATIO = 0.8; // 80% needed to unlock "Topik Seterusnya →"

export function recordActivityScore(storageKey, scoreId, correct, total) {
  if (!storageKey || !scoreId || typeof localStorage === 'undefined') return;
  try {
    const scores = JSON.parse(localStorage.getItem(storageKey) || '{}');
    const existing = scores[scoreId];
    if (!existing || correct > existing.best) {
      scores[scoreId] = { best: correct, total, passed: correct / total >= PASS_RATIO };
      localStorage.setItem(storageKey, JSON.stringify(scores));
    }
  } catch {}
}

export default function MatematikActivityFrame({
  buildRound,
  renderQuestion,
  theme,
  onExit,
  scoreStorageKey,
  scoreId,
  showQuestionProgress,
  language = 'bm',
}) {
  const safeTheme = theme || {};
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
  const answer = String(q.answer);
  const isCorrect = answered && String(selected) === answer;
  const isLast = idx + 1 >= questions.length;

  const total = questions.length;
  const scorePct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const passMark = Math.ceil(total * PASS_RATIO);
  const passed = correct >= passMark;

  const C = {
    accent: safeTheme.accent || '#F59E0B',
    dark: safeTheme.dark || '#B45309',
    cd: safeTheme.cd || '#92400E',
    green: '#16A34A',
    red: '#DC2626',
  };

  const handlePick = (value) => {
    if (answered) return;
    setSelected(value);
    if (String(value) === answer) {
      setCorrect((c) => c + 1);
      setStreak((s) => s + 1);
      playSound('correct');
      confetti({ particleCount: 45, spread: 60, startVelocity: 32, origin: { y: 0.7 }, scalar: 0.85 });
    } else {
      setWrong((w) => w + 1);
      setStreak(0);
      playSound('wrong');
    }
  };

  const handleNext = () => {
    if (isLast) {
      recordActivityScore(scoreStorageKey, scoreId, correct, questions.length);
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

  const ctx = {
    answered,
    selected,
    answer,
    isCorrect,
    handlePick,
    handleNext,
    streak,
    correct,
    wrong,
    theme: C,
  };

  const renderPrompt = () => {
    if (!Array.isArray(q.promptParts)) return q.prompt;
    return q.promptParts.map((part, i) => {
      const text = String(part?.text ?? part).trim();
      const space = i > 0 && !/^[?.!,;:]/.test(text) ? ' ' : '';
      return (
        <React.Fragment key={i}>
          {space}
          {part?.focus
            ? <strong style={{ color: C.accent, fontWeight: 900, whiteSpace: 'nowrap' }}>{text}</strong>
            : text}
        </React.Fragment>
      );
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, width: '100%' }}>
      <style>{`
        .maf-scroll { flex: 1; min-height: 0; overflow-y: auto; -webkit-overflow-scrolling: touch; }
        .maf-result-scroll { overflow-y: auto; }
        .maf-center {
          min-height: 100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: clamp(14px, 3vmin, 40px);
        }
        .maf-content {
          width: 100%;
          max-width: min(94vw, 960px);
          display: flex;
          flex-direction: column;
          align-items: stretch;
          justify-content: center;
          gap: clamp(12px, 2.2vh, 26px);
        }
        .maf-head {
          font-family: 'Fredoka', sans-serif;
          font-weight: 700;
          font-size: clamp(14px, 2.4vmin, 24px);
          color: #64748B;
          text-align: center;
          letter-spacing: .01em;
        }
        .maf-scroll-q {
          display: flex;
          flex-direction: column;
        }
        .maf-body {
          flex: 1 1 0;
          min-height: 0;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: stretch;
          padding: clamp(4px, 1vmin, 10px) clamp(14px, 3vmin, 40px) clamp(10px, 2vmin, 18px);
        }
        .maf-content-area {
          --maf-section-gap: clamp(8px, 1.4vh, 16px);
          --maf-question-gap: clamp(18px, 2.8vh, 30px);
          width: 100%;
          max-width: min(94vw, 960px);
          margin: 0 auto;
          flex: 0 1 auto;
          min-height: auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: var(--maf-section-gap);
        }
        .maf-section-question {
          width: 100%;
          max-width: min(100%, 760px);
          align-self: center;
          display: flex;
          justify-content: center;
          margin-bottom: calc(var(--maf-question-gap) - var(--maf-section-gap));
        }
        .maf-section-stage {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: clamp(8px, 1.2vh, 14px);
          padding: clamp(2px, 0.4vh, 6px) 0;
        }
        .maf-section-feedback {
          width: 100%;
          max-width: min(100%, 880px);
          align-self: center;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .maf-action-row {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 8px;
        }
        .maf-question {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: clamp(18px, 3.6vmin, 38px);
          color: #1E293B;
          text-align: center;
          line-height: 1.15;
          margin: 0;
          width: 100%;
          max-width: min(100%, 760px);
          text-wrap: normal;
        }
        .maf-result-title { text-align: center; }
        .maf-question.maf-question-inline {
          display: block !important;
          align-items: initial !important;
          justify-content: initial !important;
          white-space: normal !important;
          text-wrap: normal !important;
          word-break: normal;
          overflow-wrap: normal;
          font-size: clamp(16px, 3.2vmin, 30px);
          text-align: center;
        }
        .maf-question-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin: 0 .28em;
          padding: .12em .48em;
          border-radius: 999px;
          background: rgba(255,255,255,.94);
          border: 2px solid ${C.accent};
          color: ${C.dark};
          font-size: .92em;
          line-height: 1;
          box-shadow: 0 2px 0 rgba(15, 23, 42, 0.08);
          vertical-align: middle;
          white-space: nowrap;
        }
        .maf-feedback {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: clamp(14px, 2vmin, 22px);
          text-align: center;
          min-height: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }
        .maf-feedback.ok { color: ${C.green}; }
        .maf-feedback.no { color: ${C.red}; }
        .maf-next {
          padding: clamp(8px, 1.2vmin, 14px) clamp(20px, 3.2vmin, 44px);
          border: none;
          border-radius: 999px;
          background: ${C.accent};
          color: #fff;
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: clamp(14px, 2.2vmin, 22px);
          cursor: pointer;
          box-shadow: 0 4px 0 ${C.cd};
          transition: transform .1s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .maf-next:hover:not(:disabled) { transform: translateY(-2px); }
        .maf-next:active:not(:disabled) { transform: translateY(2px); }
        .maf-next:disabled {
          background: #E5E7EB;
          color: #9CA3AF;
          box-shadow: 0 4px 0 #D1D5DB;
          cursor: not-allowed;
        }
        .maf-footer {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: clamp(8px, 1.2vmin, 15px) clamp(16px, 2.4vmin, 34px);
          background: rgba(255,255,255,.85);
          backdrop-filter: blur(12px);
          border-top: 1px solid #E2E8F0;
        }
        .maf-footer-tally {
          display: flex;
          align-items: center;
          gap: 6px 10px;
          flex-wrap: wrap;
          font-family: 'Fredoka', sans-serif;
          font-size: clamp(13px, 1.7vmin, 18px);
          font-weight: 600;
          color: #64748B;
        }
        .maf-stats { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
        .maf-stats .maf-stat { display: inline-flex; align-items: center; gap: 3px; }
        .maf-stats .maf-divider { color: #CBD5E1; font-weight: 400; }
        .maf-result-content {
          width: min(92vw, 720px);
          max-width: 720px;
          align-items: center;
          gap: clamp(12px, 2vmin, 22px);
          text-align: center;
        }
        .maf-result-title {
          width: 100%;
          max-width: 620px;
        }
        .maf-result-score {
          color: #64748B;
          text-shadow: 0 1px 0 rgba(255,255,255,.72);
        }
        .maf-done-emoji { font-size: clamp(46px, 10vmin, 90px); line-height: 1; }
        .maf-summary {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.4vmin, 14px);
          width: 100%;
          max-width: 360px;
          align-self: center;
        }
        .maf-summary-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #fff;
          border: 2px solid #E2E8F0;
          border-radius: 14px;
          padding: clamp(10px, 1.6vmin, 16px) clamp(16px, 2.4vmin, 26px);
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: clamp(16px, 2.4vmin, 22px);
          color: #334155;
        }
        .maf-summary-row b { font-size: clamp(20px, 3vmin, 28px); }
        .maf-summary-row.ok b { color: ${C.green}; }
        .maf-summary-row.no b { color: ${C.red}; }
        .maf-complete-actions { display: flex; flex-wrap: wrap; gap: clamp(10px, 1.6vmin, 16px); justify-content: center; align-items: center; width: 100%; }
        .maf-btn-secondary {
          padding: clamp(11px, 1.5vmin, 17px) clamp(24px, 3.4vmin, 44px);
          border-radius: 999px;
          border: 2px solid ${C.accent};
          background: #fff;
          color: ${C.dark};
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: clamp(16px, 2.4vmin, 24px);
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          transition: transform .1s ease;
        }
        .maf-btn-secondary:active { transform: translateY(1px); }
        @media (max-width: 560px) {
          .maf-body {
            padding: 4px 10px 6px;
          }
          .maf-content-area {
            --maf-section-gap: 6px;
            --maf-question-gap: 10px;
          }
          .maf-section-stage {
            gap: 6px;
            padding: 0;
          }
          .maf-question {
            font-size: clamp(15px, 2.8vh, 24px);
            max-width: 100%;
            line-height: 1.08;
          }
          .maf-feedback {
            font-size: 13px;
            min-height: 16px;
          }
          .maf-next {
            padding: 8px 22px;
            font-size: 16px;
          }
          .maf-footer {
            gap: 8px;
            padding: 8px 12px;
          }
          .maf-footer-tally {
            gap: 4px 8px;
            font-size: 12px;
          }
          .maf-stats {
            gap: 6px;
          }
        }
        @media (min-width: 768px) {
          .maf-content-area { gap: clamp(10px, 1.6vh, 18px); }
          .maf-section-stage { gap: clamp(10px, 1.4vh, 16px); }
        }
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
        <div className="maf-scroll maf-result-scroll">
          <div className="maf-center">
              <div className="maf-content maf-result-content">
                <div className="maf-done-emoji">{passed ? '🎉' : '💪'}</div>
                <div className="maf-question maf-result-title">{passed ? 'Tahniah!' : 'Cuba lagi!'}</div>
                <div className="maf-head maf-result-score">Skor kamu: {correct}/{questions.length} ({scorePct}%)</div>
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
                <button
                  className="maf-next"
                  type="button"
                  disabled={!passed}
                  onClick={() => (nav?.goNext ? nav.goNext() : onExit?.())}
                >
                  {nav?.hasNext === false ? 'Selesai ✓' : 'Topik Seterusnya →'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="maf-scroll maf-scroll-q">
            <div className="maf-body">
              <div className="maf-content-area">
                {q.prompt && (
                  <div className="maf-section-question">
                    <div className={`maf-question${Array.isArray(q.promptParts) ? ' maf-question-inline' : ''}`}>
                      {renderPrompt()}
                      {q.promptBadge && <span className="maf-question-badge">{q.promptBadge}</span>}
                      {q.promptNumber != null && <>&nbsp;<strong style={{ fontSize: '1.3em', color: C.accent }}>{q.promptNumber}</strong>&nbsp;?</>}
                      {q.promptBadge ? '?' : ''}
                    </div>
                  </div>
                )}
                <div className="maf-section-stage">
                  {renderQuestion(q, ctx)}
                </div>
                <div className="maf-section-feedback">
                  <div className={`maf-feedback ${answered ? (isCorrect ? 'ok' : 'no') : ''}`}>
                    {answered && !isCorrect ? 'Cuba lagi' : ''}
                  </div>
                  {answered && (
                    <div className="maf-action-row">
                      <button className="maf-next" type="button" onClick={handleNext}>
                        {isLast ? 'Tamat 🎉' : 'Seterusnya →'}
                      </button>
                      <QuestionIssueReportButton
                        language={language}
                        question={q}
                        questionIndex={idx}
                        totalQuestions={questions.length}
                        selected={selected}
                        answered={answered}
                        scoreId={scoreId}
                        source="MatematikActivityFrame"
                      />
                    </div>
                  )}
                </div>
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
            <span style={{ color: '#CC7700', fontSize: '0.85rem', fontWeight: 900, minWidth: 28, textAlign: 'right' }}>
              {showQuestionProgress ? `${idx + 1}/${questions.length}` : `${progressInGroup}/10`}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
