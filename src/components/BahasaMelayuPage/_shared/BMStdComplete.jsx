import React, { useEffect, useRef, useState } from 'react';
import BMHeader from './BMHeader';
import Celebration from '../../PendidikanIslamPage/_shared/Celebration';
import useGamification from '../../../hooks/useGamification';

// Shared "result" screen for BMStdShell-based topics (Modul 5 Tatabahasa).
// Mirrors the modern result card from BMLessonQuizLayout.
export default function BMStdComplete({
  onBack,
  language = 'bm',
  title,
  score,
  total,
  passPct = 70,
  accentColor = '#159E96',
  onRestart,
  onNextTopic,
  topicId = null,
  subject = 'bm',
}) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const stars = pct >= 80 ? 3 : pct >= 50 ? 2 : 1;
  const passed = pct >= passPct;
  const [showCelebration, setShowCelebration] = useState(false);

  // Gamification: per-answer XP is now awarded LIVE in each lesson via
  // useTopicGamification.awardCorrect() (so the StatsBar climbs and the toast
  // fires during play, exactly like BMLessonQuizLayout topics). This shared
  // result screen only records the crown + first-completion bonus.
  // Destructure only the stable callback (hook return object changes identity
  // every render — see lesson 1).
  const { completeTopicAttempt } = useGamification(subject);
  const gamifiedRef = useRef(false);

  useEffect(() => {
    // Mounts fresh on each completion, unmounts on restart → simple once-guard.
    if (!topicId || gamifiedRef.current || !passed) return;
    gamifiedRef.current = true;
    completeTopicAttempt(topicId, score, total);
  }, [topicId, score, total, passed, completeTopicAttempt]);

  useEffect(() => {
    if (passed) {
      const show = setTimeout(() => setShowCelebration(true), 0);
      const hide = setTimeout(() => setShowCelebration(false), 2500);
      return () => { clearTimeout(show); clearTimeout(hide); };
    }
  }, [passed]);

  return (
    <>
      <style>{`
        .bsc-root {
          --sp-1: clamp(4px, 0.8vh, 8px);
          --sp-2: clamp(8px, 1.6vh, 14px);
          height: 100dvh; overflow: hidden;
          background:
            radial-gradient(ellipse 75% 55% at 14% 0%, ${accentColor}21 0%, transparent 58%),
            radial-gradient(ellipse 65% 48% at 90% 100%, ${accentColor}1a 0%, transparent 62%),
            linear-gradient(180deg, #FDFEFF 0%, #F3F6FB 100%);
          font-family: 'Fredoka', system-ui, sans-serif;
          color: #1E293B;
          display: flex; flex-direction: column;
        }
        .bsc-body {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          width: 100%; max-width: 560px;
          margin: 0 auto;
          padding: var(--sp-2) clamp(14px, 3.5vw, 28px);
        }
        .bsc-card {
          position: relative;
          width: 100%;
          background: #fff;
          border: 2.5px solid ${accentColor}33;
          border-radius: clamp(18px, 3vh, 28px);
          padding: clamp(18px, 3.4vh, 30px) clamp(16px, 4.5vw, 30px);
          box-shadow: 0 clamp(3px, 0.6vh, 5px) 0 ${accentColor}2e, 0 16px 34px -18px rgba(0,0,0,.18);
          text-align: center;
        }
        .bsc-stars-row {
          display: flex; align-items: center; justify-content: center;
          gap: 10px; margin-bottom: var(--sp-1);
        }
        .bsc-stars {
          font-size: clamp(24px, 4.6vh, 32px);
          letter-spacing: 2px;
        }
        .bsc-score {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(24px, 4.6vh, 32px); color: ${accentColor};
        }
        .bsc-gate {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(12px, 2.4vh, 14px); border-radius: 999px;
          padding: clamp(4px, 0.9vh, 6px) clamp(14px, 3vw, 18px);
          margin: 2px auto var(--sp-1);
          display: inline-block;
        }
        .bsc-gate.pass { color: #166534; background: #F0FDF4; border: 1.5px solid #BBF7D0; }
        .bsc-gate.fail { color: #991B1B; background: #FEF2F2; border: 1.5px solid #FECACA; }
        .bsc-msg {
          font-weight: 600; font-size: clamp(12px, 2.4vh, 14px); color: #64748B;
          margin: 0 0 clamp(10px, 2vh, 14px);
        }
        .bsc-actions {
          display: flex; gap: 10px; flex-wrap: wrap;
          justify-content: center;
        }
        .bsc-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(13px, 2.6vh, 16px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(9px, 1.8vh, 12px) clamp(20px, 5vw, 28px);
          transition: transform .12s ease;
        }
        .bsc-btn:active { transform: translateY(2px); }
        @media (hover: hover) {
          .bsc-btn:hover { transform: translateY(-2px); }
        }
        .bsc-btn.primary {
          color: #fff;
          background: linear-gradient(180deg, ${accentColor}cc, ${accentColor});
          box-shadow: 0 4px 0 ${accentColor}99;
        }
        .bsc-btn.secondary {
          color: #64748B; background: #F1F5F9;
          box-shadow: 0 4px 0 #CBD5E1;
        }

        /* ── Desktop / laptop scale-up ── */
        @media (min-width: 900px) {
          .bsc-body { max-width: 640px; }
          .bsc-card { padding: min(40px, 4.4vh) 48px; border-radius: 32px; }
          .bsc-stars, .bsc-score { font-size: min(36px, 5vh); }
          .bsc-gate { font-size: min(15px, 2.4vh); padding: min(7px, 1vh) 20px; }
          .bsc-msg { font-size: min(15px, 2.4vh); margin-bottom: min(16px, 2vh); }
          .bsc-btn { font-size: min(17px, 2.6vh); padding: min(13px, 1.8vh) 32px; }
        }
      `}</style>
      <div className="bsc-root">
        <BMHeader onBack={onBack} language={language} title={title} />
        <div className="bsc-body">
          <div className="bsc-card">
            {showCelebration && <Celebration count={20} />}
            <div className="bsc-stars-row">
              <div className="bsc-stars">{'⭐'.repeat(stars)}{'☆'.repeat(3 - stars)}</div>
              <div className="bsc-score">{score} / {total}</div>
            </div>
            {passed ? (
              <div className="bsc-gate pass">
                🎉 {language === 'bm' ? 'LULUS!' : 'PASSED!'} ({pct}%)
              </div>
            ) : (
              <div className="bsc-gate fail">
                {language === 'bm'
                  ? `Skor minima ${passPct}% diperlukan untuk lulus topik ini.`
                  : `You need at least ${passPct}% to pass this topic.`}
              </div>
            )}
            <p className="bsc-msg">
              {pct >= 80
                ? (language === 'bm' ? 'Hebat! Kamu memang bijak!' : "Excellent! You're brilliant!")
                : passed
                ? (language === 'bm' ? 'Bagus! Teruskan belajar!' : 'Good! Keep learning!')
                : (language === 'bm' ? 'Jangan putus asa — cuba lagi!' : "Don't give up — try again!")}
            </p>
            <div className="bsc-actions">
              {passed ? (
                <>
                  {onNextTopic ? (
                    <button className="bsc-btn primary" onClick={onNextTopic}>
                      {language === 'bm' ? 'Topik Seterusnya →' : 'Next Topic →'}
                    </button>
                  ) : (
                    <button className="bsc-btn primary" onClick={onBack}>
                      {language === 'bm' ? '← Kembali ke Trail' : '← Back to Trail'}
                    </button>
                  )}
                  <button className="bsc-btn secondary" onClick={onRestart}>
                    🔄 {language === 'bm' ? 'Cuba Lagi' : 'Try Again'}
                  </button>
                </>
              ) : (
                <>
                  <button className="bsc-btn primary" onClick={onRestart}>
                    🔄 {language === 'bm' ? 'Cuba Lagi' : 'Try Again'}
                  </button>
                  <button className="bsc-btn secondary" onClick={onBack}>
                    {language === 'bm' ? '← Kembali ke Trail' : '← Back to Trail'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
