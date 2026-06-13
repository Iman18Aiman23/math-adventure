import React, { useCallback, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import SpeechManager from '../../../services/SpeechManager';
import BMHeader from './BMHeader';

import StatsBar from '../../_shared/StatsBar';
import useGamification from '../../../hooks/useGamification';

// Mastery gate: minimum % required to pass a topic quiz. Below this the
// child is asked to "Cuba Lagi" and the topic is NOT marked completed.
export const PASS_PCT = 70;

export default function BMLessonQuizLayout({
  onBack,
  topicTitle,
  quiz,
  language = 'bm',
  accentColor = '#E8821A',
  onShowLearn,
  topicId,
  topicComplete,
  onNextTopic,
  passPct = PASS_PCT,
  subtitle,
  resultExtra,
}) {
  const quizRef = useRef(null);
  // Destructure only the stable callbacks — the hook's return object gets a new
  // identity on every render, so depending on it in effects causes infinite loops.
  const { awardXP, completeTopicAttempt, loseHeart, hearts, gems } = useGamification('bm');
  const streakRef = useRef(0);
  const awardedIdxRef = useRef(-1);
  const completionHandledRef = useRef(false);

  const {
    idx, score, answered, selected, finished,
    correctIdx, correctAnswer, currentQ,
    totalRounds, handleChoose, handleNext, handleRestart, handleStart,
  } = quiz;

  const pct = totalRounds > 0 ? Math.round((score / totalRounds) * 100) : 0;
  const stars = pct >= 80 ? 3 : pct >= 50 ? 2 : 1;
  const passed = pct >= passPct;

  useEffect(() => {
    return () => SpeechManager.stopSpeaking();
  }, []);

  // Reset per-run award guards when a run (re)starts. MUST be keyed only on
  // `finished`: the completion effect below depends on `score`, which changes
  // mid-quiz — resetting there zeroed streakRef after every answer, so the
  // streak bonus could never reach 3.
  useEffect(() => {
    if (!finished) {
      completionHandledRef.current = false;
      awardedIdxRef.current = -1;
      streakRef.current = 0;
    }
  }, [finished]);

  // Completion is only persisted when the mastery gate is met.
  useEffect(() => {
    if (finished && passed && topicId && !completionHandledRef.current) {
      completionHandledRef.current = true;
      topicComplete?.(topicId);
      (async () => {
        await completeTopicAttempt(topicId, score, totalRounds);
      })();
    }
  }, [finished, passed, topicId, topicComplete, completeTopicAttempt, score, totalRounds]);

  useEffect(() => {
    if (finished && passed) {
      confetti({ particleCount: 200, spread: 140, origin: { y: 0.5 }, zIndex: 2000 });
    }
  }, [finished, passed]);

  useEffect(() => {
    if (currentQ?.audioText && !finished) {
      const t = setTimeout(() => {
        SpeechManager.stopSpeaking();
        SpeechManager.speak(currentQ.audioText, 'ms-MY', { rate: 0.7, pitch: 1.2 });
      }, 300);
      return () => { clearTimeout(t); SpeechManager.stopSpeaking(); };
    }
  }, [idx, currentQ?.audioText, finished]);

  useEffect(() => {
    if (!answered) return;
    if (selected === correctIdx) {
      confetti({ particleCount: 90, spread: 75, origin: { y: 0.6 }, zIndex: 2000 });
      // Award XP once per question
      if (awardedIdxRef.current !== idx) {
        awardedIdxRef.current = idx;
        streakRef.current += 1;
        // Streak bonus fires at milestones: 5, 10, 15... consecutive correct
        const isMilestone = streakRef.current % 5 === 0;
        // Toast shows the ACTUAL awarded amounts — repeat runs of a completed
        // topic earn practice-rate XP (see PRACTICE_XP_MULTIPLIER).
        Promise.all([
          awardXP(10, 'quiz', topicId),
          isMilestone ? awardXP(5, 'streak_bonus', topicId) : Promise.resolve(0),
        ]).then(([base, bonus]) => {
          if (base > 0 || bonus > 0) {
            // Fire the shared top-center toast (GlobalXpToast, mounted at app
            // root) so every BM topic shows the reward in the same place.
            window.dispatchEvent(new CustomEvent('xp-toast', { detail: { xp: base, streakBonus: bonus } }));
          }
        });
      }
    } else if (awardedIdxRef.current !== idx) {
      // Once per question: reset streak + lose a heart (gentle, floors at 0)
      awardedIdxRef.current = idx;
      streakRef.current = 0;
      loseHeart();
    }
  }, [answered, selected, correctIdx, idx, awardXP, topicId, loseHeart]);

  const handleReplay = () => {
    if (currentQ?.audioText) {
      SpeechManager.stopSpeaking();
      SpeechManager.speak(currentQ.audioText, 'ms-MY', { rate: 0.7, pitch: 1.2 });
    }
  };

  return (
    <>
      <style>{`
        .bm-lesson-root {
          --sp-1: clamp(4px, 0.8vh, 8px);
          --sp-2: clamp(8px, 1.6vh, 14px);
          --sp-3: clamp(12px, 2.4vh, 22px);
          height: 100dvh; overflow: hidden;
          background:
            radial-gradient(ellipse 75% 55% at 14% 0%, ${accentColor}21 0%, transparent 58%),
            radial-gradient(ellipse 65% 48% at 90% 100%, ${accentColor}1a 0%, transparent 62%),
            linear-gradient(180deg, #FDFEFF 0%, #F3F6FB 100%);
          font-family: 'Fredoka', system-ui, sans-serif;
          color: #1E293B;
          display: flex;
          flex-direction: column;
        }

        .bm-lesson-body {
          flex: 1;
          min-height: 0;
          max-width: 560px;
          margin: 0 auto;
          width: 100%;
          padding: var(--sp-2) clamp(14px, 3.5vw, 28px);
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }
        .bm-quiz-stage {
          width: 100%;
          margin: auto 0; /* safe vertical centering even if content overflows */
          display: flex;
          flex-direction: column;
        }

        .bm-quiz-stats {
          display: flex; align-items: center; justify-content: space-between;
          gap: 8px; margin-bottom: var(--sp-2);
        }
        .bm-pill {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(11px, 2vh, 13px);
          border-radius: 999px;
          padding: clamp(3px, 0.7vh, 5px) clamp(10px, 2.4vw, 14px);
          white-space: nowrap;
        }
        .bm-pill.prog { background: #fff; color: ${accentColor}; border: 1.5px solid ${accentColor}44; box-shadow: 0 2px 6px -2px ${accentColor}33; }
        .bm-pill.star { background: #FFF6D6; color: #B58800; border: 1.5px solid #FFE08A; }
        .bm-pill.life { background: #FFE9EC; color: #E11D48; border: 1.5px solid #FCA5B4; }
        .bm-pill.gem  { background: #E0F2FE; color: #0369A1; border: 1.5px solid #7DD3FC; }
        .bm-pill-group { display: flex; align-items: center; gap: 6px; min-width: 0; }
        @media (max-width: 360px) { .bm-pill-group { gap: 4px; } .bm-pill { padding: 3px 8px; } }

        .bm-quiz-bar-wrap {
          width: 100%; height: clamp(6px, 1.2vh, 9px); border-radius: 999px;
          background: ${accentColor}22; overflow: hidden;
          margin-bottom: var(--sp-3);
        }
        .bm-quiz-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, ${accentColor}, ${accentColor}99);
          border-radius: 999px; transition: width .35s ease;
        }

        .bm-quiz-card {
          background: #fff;
          border: 2.5px solid ${accentColor}33;
          border-radius: clamp(18px, 3vh, 28px);
          padding: clamp(14px, 2.8vh, 26px) clamp(14px, 4vw, 26px) clamp(14px, 2.6vh, 24px);
          box-shadow: 0 clamp(3px, 0.6vh, 5px) 0 ${accentColor}2e, 0 16px 34px -18px rgba(0,0,0,.18);
          display: flex; flex-direction: column;
          position: relative;
        }

        .bm-quiz-media {
          width: clamp(52px, 9vh, 72px); height: clamp(52px, 9vh, 72px);
          margin: 0 auto;
          border-radius: 24px;
          background: linear-gradient(135deg, ${accentColor}1f, ${accentColor}0d);
          border: 1.5px solid ${accentColor}2a;
          display: flex; align-items: center; justify-content: center;
        }
        .bm-quiz-emoji {
          font-size: clamp(28px, 5.4vh, 42px);
          line-height: 1;
          user-select: none;
        }
        .bm-quiz-speaker-icon {
          font-size: clamp(26px, 5vh, 38px);
          line-height: 1;
          animation: bm-speaker-pulse 2s ease-in-out infinite;
        }
        @keyframes bm-speaker-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }

        .bm-quiz-subtitle {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(9px, 1.7vh, 11px);
          letter-spacing: 0.14em; text-transform: uppercase;
          color: ${accentColor};
          background: ${accentColor}12;
          border: 1.5px solid ${accentColor}33;
          border-radius: 999px;
          padding: clamp(3px, 0.6vh, 4px) clamp(12px, 2.6vw, 16px);
          align-self: center;
          margin-top: var(--sp-1);
        }
        .bm-quiz-question {
          text-align: center;
          font-family: 'Baloo 2', sans-serif;
          font-size: clamp(16px, 3vh, 22px);
          font-weight: 700;
          line-height: 1.35;
          margin: var(--sp-1) 0 0;
          color: #1E293B;
        }
        .bm-quiz-replay-btn {
          align-self: center;
          margin-top: var(--sp-1);
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(11px, 2.1vh, 13px); color: #fff;
          background: linear-gradient(180deg, ${accentColor}cc, ${accentColor});
          border: none; border-radius: 999px;
          padding: clamp(4px, 0.9vh, 6px) clamp(14px, 3vw, 18px);
          box-shadow: 0 3px 0 ${accentColor}88;
          cursor: pointer; transition: transform .12s;
        }
        .bm-quiz-replay-btn:active { transform: translateY(2px); box-shadow: 0 1px 0 ${accentColor}88; }

        .bm-quiz-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(6px, 1.3vh, 10px);
          margin-top: var(--sp-2);
        }
        .bm-quiz-grid.long { grid-template-columns: 1fr; }
        .bm-quiz-opt {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(18px, 3.6vh, 26px);
          text-align: center; cursor: pointer;
          background: #FBFCFE; border: 2.5px solid #E4EAF2;
          border-radius: 16px;
          padding: clamp(8px, 1.6vh, 12px) clamp(8px, 2vw, 12px);
          min-height: clamp(44px, 7.4vh, 56px);
          color: #1E293B;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 3px 0 #E2E8F0;
          transition: transform .15s ease, border-color .15s, background .15s, box-shadow .15s;
        }
        @media (hover: hover) {
          .bm-quiz-opt:not(:disabled):hover {
            border-color: ${accentColor};
            background: ${accentColor}0d;
            transform: translateY(-2px);
            box-shadow: 0 5px 0 ${accentColor}44;
          }
        }
        .bm-quiz-opt:not(:disabled):active { transform: translateY(1px); box-shadow: 0 1px 0 #E2E8F0; }
        .bm-quiz-opt .bm-opt-letter-display {
          line-height: 1.25;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }
        .bm-quiz-opt.selected {
          border-color: ${accentColor}; background: ${accentColor}12;
          transform: scale(.97);
        }
        .bm-quiz-opt.correct {
          border-color: #16A34A; background: #F0FDF4; color: #166534;
          box-shadow: 0 3px 0 #BBF7D0;
          animation: bm-correct-pop .35s cubic-bezier(.34,1.56,.64,1);
        }
        .bm-quiz-opt.wrong {
          border-color: #DC2626; background: #FEF2F2; color: #991B1B;
          box-shadow: 0 3px 0 #FECACA;
          animation: bm-shake .3s ease;
        }
        .bm-quiz-opt:disabled { cursor: default; }
        .bm-quiz-opt.word-opt {
          font-family: 'Fredoka', sans-serif;
          font-weight: 600;
          font-size: clamp(13px, 2.5vh, 17px);
          line-height: 1.35;
        }
        @keyframes bm-correct-pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.06); }
          100% { transform: scale(1); }
        }
        @keyframes bm-shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }

        .bm-quiz-feedback-zone {
          min-height: clamp(26px, 4.6vh, 34px);
          margin-top: var(--sp-1);
          display: flex; align-items: center; justify-content: center;
        }
        .bm-quiz-feedback.wrong {
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: clamp(11px, 2.2vh, 13px); text-align: center;
          padding: clamp(4px, 0.9vh, 6px) 10px;
          border-radius: 10px;
          color: #991B1B; background: #FEF2F2; border: 1.5px solid #FECACA;
        }
        .bm-quiz-next-wrap {
          display: flex; justify-content: center; margin-top: var(--sp-1);
        }
        .bm-quiz-next-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, 2.7vh, 17px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(8px, 1.7vh, 12px) clamp(26px, 7vw, 40px);
          color: #fff;
          background: linear-gradient(180deg, ${accentColor}cc, ${accentColor});
          box-shadow: 0 4px 0 ${accentColor}99;
          transition: transform .12s ease, box-shadow .12s;
        }
        @media (hover: hover) {
          .bm-quiz-next-btn:hover { transform: translateY(-1px); box-shadow: 0 5px 0 ${accentColor}99; }
        }
        .bm-quiz-next-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 ${accentColor}99; }
        .bm-quiz-next-btn.hidden-state { visibility: hidden; }

        .bm-quiz-start-card,
        .bm-quiz-result-card {
          background: #fff;
          border: 2.5px solid ${accentColor}33;
          border-radius: clamp(18px, 3vh, 28px);
          padding: clamp(18px, 3.4vh, 30px) clamp(16px, 4.5vw, 30px);
          box-shadow: 0 clamp(3px, 0.6vh, 5px) 0 ${accentColor}2e, 0 16px 34px -18px rgba(0,0,0,.18);
          text-align: center;
        }
        .bm-quiz-start-icon {
          width: clamp(64px, 11vh, 88px); height: clamp(64px, 11vh, 88px);
          margin: 0 auto clamp(8px, 1.6vh, 14px);
          border-radius: 28px;
          background: linear-gradient(135deg, ${accentColor}26, ${accentColor}0f);
          border: 1.5px solid ${accentColor}2a;
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(32px, 6vh, 48px);
        }
        .bm-quiz-start-title {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(20px, 3.8vh, 27px); color: #1E293B;
          margin: 0 0 4px;
        }
        .bm-quiz-start-sub {
          font-weight: 500; font-size: clamp(13px, 2.5vh, 15px);
          color: #64748B; margin: 0 0 clamp(12px, 2.4vh, 18px);
        }
        .bm-quiz-start-actions {
          display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;
        }
        .bm-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(13px, 2.6vh, 16px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(9px, 1.8vh, 12px) clamp(20px, 5vw, 28px);
          transition: transform .12s ease;
        }
        .bm-btn:active { transform: translateY(2px); }
        @media (hover: hover) {
          .bm-btn:hover { transform: translateY(-2px); }
        }
        .bm-btn.primary {
          color: #fff;
          background: linear-gradient(180deg, ${accentColor}cc, ${accentColor});
          box-shadow: 0 4px 0 ${accentColor}99;
        }
        .bm-btn.secondary {
          color: #64748B; background: #F1F5F9;
          box-shadow: 0 4px 0 #CBD5E1;
        }

        .bm-result-stars-row {
          display: flex; align-items: center; justify-content: center;
          gap: 10px; margin-bottom: var(--sp-1);
        }
        .bm-result-stars {
          font-size: clamp(24px, 4.6vh, 32px);
          letter-spacing: 2px;
        }
        .bm-result-score {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(24px, 4.6vh, 32px); color: ${accentColor};
        }
        .bm-result-gate {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(12px, 2.4vh, 14px); border-radius: 999px;
          padding: clamp(4px, 0.9vh, 6px) clamp(14px, 3vw, 18px);
          margin: 2px auto var(--sp-1);
          display: inline-block;
        }
        .bm-result-gate.pass { color: #166534; background: #F0FDF4; border: 1.5px solid #BBF7D0; }
        .bm-result-gate.fail { color: #991B1B; background: #FEF2F2; border: 1.5px solid #FECACA; }
        .bm-result-msg {
          font-weight: 600; font-size: clamp(12px, 2.4vh, 14px); color: #64748B;
          margin: 0 0 clamp(10px, 2vh, 14px);
        }
        .bm-result-extra {
          text-align: left;
          margin: 4px 0 var(--sp-2);
          padding: clamp(8px, 1.6vh, 12px) clamp(12px, 2.8vw, 16px);
          background: linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%);
          border-radius: 14px;
          border: 2px solid #FDE68A;
        }
        .bm-result-extra-label {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: clamp(11px, 2.2vh, 13px);
          color: #B45309;
          margin-bottom: 3px;
          letter-spacing: 0.5px;
        }
        .bm-result-extra-item {
          font-family: 'Fredoka', sans-serif;
          font-size: clamp(11px, 2.1vh, 13px);
          font-weight: 600;
          color: #92400E;
          padding: 1px 0;
          line-height: 1.5;
        }
        .bm-result-actions {
          display: flex; gap: 10px; flex-wrap: wrap;
          justify-content: center;
        }

        .bm-lesson-footer {
          flex-shrink: 0;
          text-align: center;
          padding: var(--sp-1) 20px clamp(10px, 2vh, 16px);
          margin: 0;
          font-size: clamp(10px, 1.9vh, 12px);
          font-weight: 500; color: #94A3B8;
        }

        /* ── Desktop / laptop scale-up (height-aware so it always fits) ── */
        @media (min-width: 900px) {
          .bm-lesson-body { max-width: 820px; }
          .bm-pill { font-size: min(14px, 2.2vh); padding: min(5px, 0.8vh) 18px; }
          .bm-quiz-bar-wrap { height: min(10px, 1.4vh); }
          .bm-quiz-card { padding: min(32px, 3.2vh) 40px min(26px, 2.6vh); border-radius: 32px; }
          .bm-quiz-media { width: min(88px, 11vh); height: min(88px, 11vh); border-radius: min(28px, 3.6vh); }
          .bm-quiz-emoji { font-size: min(50px, 6.2vh); }
          .bm-quiz-speaker-icon { font-size: min(46px, 5.8vh); }
          .bm-quiz-subtitle { font-size: min(12px, 2vh); padding: min(4px, 0.7vh) 18px; margin-top: min(12px, 1.4vh); }
          .bm-quiz-question { font-size: min(27px, 3.6vh); margin-top: min(12px, 1.4vh); }
          .bm-quiz-replay-btn { font-size: min(14px, 2.2vh); padding: min(7px, 1vh) 22px; margin-top: min(12px, 1.4vh); }
          .bm-quiz-grid { gap: min(14px, 1.8vh); margin-top: min(20px, 2.2vh); }
          .bm-quiz-grid.long { grid-template-columns: 1fr 1fr; }
          .bm-quiz-opt { font-size: min(32px, 4.4vh); min-height: min(76px, 9.4vh); border-radius: 18px; }
          .bm-quiz-opt.word-opt { font-size: min(19px, 2.8vh); }
          .bm-quiz-feedback-zone { min-height: min(34px, 4.6vh); margin-top: min(8px, 1vh); }
          .bm-quiz-feedback.wrong { font-size: min(14px, 2.2vh); }
          .bm-quiz-next-wrap { margin-top: min(8px, 1vh); }
          .bm-quiz-next-btn { font-size: min(18px, 2.6vh); padding: min(13px, 1.8vh) 48px; }
          .bm-quiz-start-card, .bm-quiz-result-card { padding: min(40px, 4.4vh) 48px; border-radius: 32px; }
          .bm-quiz-start-icon { width: min(104px, 13vh); height: min(104px, 13vh); font-size: min(56px, 7vh); border-radius: 32px; }
          .bm-quiz-start-title { font-size: min(30px, 4.2vh); }
          .bm-quiz-start-sub { font-size: min(16px, 2.6vh); margin-bottom: min(22px, 2.6vh); }
          .bm-btn { font-size: min(17px, 2.6vh); padding: min(13px, 1.8vh) 32px; }
          .bm-result-stars, .bm-result-score { font-size: min(36px, 5vh); }
          .bm-result-gate { font-size: min(15px, 2.4vh); padding: min(7px, 1vh) 20px; }
          .bm-result-msg { font-size: min(15px, 2.4vh); margin-bottom: min(16px, 2vh); }
          .bm-result-extra-label, .bm-result-extra-item { font-size: min(14px, 2.2vh); }
          .bm-lesson-footer { font-size: min(12px, 2vh); }
        }
      `}</style>

      <div className="bm-lesson-root">
        <BMHeader onBack={onBack} language={language} title={topicTitle} sticky />

        <div className="bm-lesson-body">
          {finished ? (
            <div className="bm-quiz-stage">
              <StatsBar subject="bm" />
              <div className="bm-quiz-result-card">
                <div className="bm-result-stars-row">
                  <div className="bm-result-stars">{'⭐'.repeat(stars)}{'☆'.repeat(3 - stars)}</div>
                  <div className="bm-result-score">{score} / {totalRounds}</div>
                </div>
                {passed ? (
                  <div className="bm-result-gate pass">
                    🎉 {language === 'bm' ? 'LULUS!' : 'PASSED!'} ({pct}%)
                  </div>
                ) : (
                  <div className="bm-result-gate fail">
                    {language === 'bm'
                      ? `Skor minima ${passPct}% diperlukan untuk lulus topik ini.`
                      : `You need at least ${passPct}% to pass this topic.`}
                  </div>
                )}
                <p className="bm-result-msg">
                  {pct >= 80
                    ? (language === 'bm' ? 'Hebat! Kamu memang bijak!' : 'Excellent! You\'re brilliant!')
                    : passed
                    ? (language === 'bm' ? 'Bagus! Teruskan belajar!' : 'Good! Keep learning!')
                    : (language === 'bm' ? 'Jangan putus asa — cuba lagi!' : 'Don\'t give up — try again!')}
                </p>
                {resultExtra && <div className="bm-result-extra">{resultExtra}</div>}
                <div className="bm-result-actions">
                  {passed ? (
                    <>
                      {onNextTopic ? (
                        <button className="bm-btn primary" onClick={onNextTopic}>
                          {language === 'bm' ? 'Topik Seterusnya →' : 'Next Topic →'}
                        </button>
                      ) : (
                        <button className="bm-btn primary" onClick={onBack}>
                          {language === 'bm' ? '← Kembali ke Trail' : '← Back to Trail'}
                        </button>
                      )}
                      <button className="bm-btn secondary" onClick={handleRestart}>
                        🔄 {language === 'bm' ? 'Cuba Lagi' : 'Try Again'}
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="bm-btn primary" onClick={handleRestart}>
                        🔄 {language === 'bm' ? 'Cuba Lagi' : 'Try Again'}
                      </button>
                      <button className="bm-btn secondary" onClick={onBack}>
                        {language === 'bm' ? '← Kembali ke Trail' : '← Back to Trail'}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : !quiz.pool || quiz.pool.length === 0 || !currentQ ? (
            <div className="bm-quiz-stage">
              <div className="bm-quiz-start-card">
                <div className="bm-quiz-start-icon">🎯</div>
                <h3 className="bm-quiz-start-title">
                  {language === 'bm' ? `Kuiz: ${topicTitle}` : `Quiz: ${topicTitle}`}
                </h3>
                <p className="bm-quiz-start-sub">
                  {language === 'bm'
                    ? `Jawab ${totalRounds} soalan`
                    : `Answer ${totalRounds} questions`}
                </p>
                <div className="bm-quiz-start-actions">
                  {onShowLearn && (
                    <button className="bm-btn secondary" onClick={onShowLearn}>
                      📖 {language === 'bm' ? 'Belajar Dulu' : 'Learn First'}
                    </button>
                  )}
                  <button className="bm-btn primary" onClick={handleStart}>
                    🎯 {language === 'bm' ? 'Mula Kuiz' : 'Start Quiz'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bm-quiz-stage" ref={quizRef}>
              <div className="bm-quiz-stats">
                <span className="bm-pill prog">
                  {language === 'bm' ? 'Soalan' : 'Question'} {idx + 1} / {totalRounds}
                </span>
                <span className="bm-pill-group">
                  <span className="bm-pill life">❤️ {hearts}</span>
                  <span className="bm-pill gem">💎 {gems}</span>
                  <span className="bm-pill star">⭐ {score}</span>
                </span>
              </div>
              <div className="bm-quiz-bar-wrap">
                <div className="bm-quiz-bar-fill" style={{ width: `${((idx + 1) / totalRounds) * 100}%` }} />
              </div>

              <div className="bm-quiz-card">
                <div className="bm-quiz-media">
                  {currentQ.emoji ? (
                    <span className="bm-quiz-emoji">{currentQ.emoji}</span>
                  ) : (
                    <span className="bm-quiz-speaker-icon">🔊</span>
                  )}
                </div>
                {subtitle && <div className="bm-quiz-subtitle">{subtitle}</div>}
                <p className="bm-quiz-question">
                  {currentQ.question || (language === 'bm' ? 'Apakah bunyi ini?' : 'What sound is this?')}
                </p>
                {currentQ.audioText && (
                  <button className="bm-quiz-replay-btn" onClick={handleReplay}>
                    🔊 {language === 'bm' ? 'Dengar Semula' : 'Replay'}
                  </button>
                )}

                <div className={'bm-quiz-grid' + (currentQ.options.some(o => o.length > 20) ? ' long' : '')}>
                  {currentQ.options.map((opt, i) => {
                    const isSelected = selected === i;
                    const isCorrectChoice = answered && i === correctIdx;
                    const isWrongChoice = answered && isSelected && i !== correctIdx;
                    // Letters/syllables (≤3 chars) display uppercase at large size;
                    // words/sentences keep natural casing at the smaller word-opt size.
                    const isWordOpt = !!currentQ.emoji || opt.length > 3;
                    let cls = 'bm-quiz-opt';
                    if (isSelected && !answered) cls += ' selected';
                    if (isCorrectChoice) cls += ' correct';
                    if (isWrongChoice) cls += ' wrong';
                    return (
                      <button key={i} className={cls + (isWordOpt ? ' word-opt' : '')} onClick={() => handleChoose(i)} disabled={answered}>
                        <span className="bm-opt-letter-display">
                          {isWordOpt ? opt : opt.toUpperCase()}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="bm-quiz-feedback-zone">
                  {answered && selected !== correctIdx && (
                    <div className="bm-quiz-feedback wrong">
                      ❌ {language === 'bm' ? 'Jawapan' : 'Answer'}: {(currentQ.emoji || correctAnswer.length > 3) ? correctAnswer : correctAnswer.toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="bm-quiz-next-wrap">
                  <button className={'bm-quiz-next-btn' + (answered ? '' : ' hidden-state')} onClick={handleNext}>
                    {idx + 1 >= totalRounds
                      ? (language === 'bm' ? 'Lihat Keputusan →' : 'See Results →')
                      : (language === 'bm' ? 'Seterusnya →' : 'Next →')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {!finished && (
          <p className="bm-lesson-footer">
            Bahasa Melayu KSSR · {topicTitle}
          </p>
        )}
      </div>
    </>
  );
}
