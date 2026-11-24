import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import SpeechManager from '../../../services/SpeechManager';
import BMHeader from './BMHeader';
import { PageHeader } from '../../_shared/PageHeaderHero';
import useBrowserBack from '../../../hooks/useBrowserBack';

import StatsBar from '../../_shared/StatsBar';
import HomeHeaderActions from '../../_shared/HomeHeaderActions';
import useGamification from '../../../hooks/useGamification';

// Mastery gate: minimum % required to pass a topic quiz. Below this the
// child is asked to "Cuba Lagi" and the topic is NOT marked completed.
export const PASS_PCT = 70;

function QuizSpeakerIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" />
      <path
        d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MatchLearnShell({ children }) {
  return <div className="bm-match-wrap mh-wrap page-container">{children}</div>;
}

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
  footerText,
  resultExtra,
  // When true, `audioText` is shown as on-screen INSTRUCTION text (no speaker
  // icon, no auto-TTS, no "Dengar Semula" replay) — for read-the-instruction
  // topics (1.1b/1.1c). Default false keeps the audio-dictation behaviour
  // (auto-play + replay, text hidden) that 2.1/3.1 rely on.
  instructionMode = false,
  // When true, hides the emoji/speaker media section above the question.
  hideEmoji = false,
  // When true, a feedback dialog with `penerangan` text appears after each
  // answer (correct or wrong) so the child reads why the action matters.
  showFeedback = false,
  matchLearn = false,
  // Compact completion quiz variant used by the Huruf KV B-G lesson.
  kvQuiz = false,
  ...accountProps
}) {
  const quizRef = useRef(null);
  const [peneranganDismissed, setPeneranganDismissed] = useState(false);
  // Destructure only the stable callbacks — the hook's return object gets a new
  // identity on every render, so depending on it in effects causes infinite loops.
  const { awardXP, completeTopicAttempt, loseHeart, hearts, gems } = useGamification('bm');
  const headerBack = useBrowserBack(onBack);
  const streakRef = useRef(0);
  const awardedIdxRef = useRef(-1);
  const completionHandledRef = useRef(false);

  const {
    idx, score, answered, selected, finished,
    correctIdx, correctAnswer, currentQ,
    totalRounds, handleChoose, handleNext, handleRestart, handleStart,
  } = quiz;

  const pct = totalRounds > 0 ? Math.round((score / totalRounds) * 100) : 0;
  const hasLongOptions = !!currentQ?.options?.some((option) => option.length > 20);
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
    if (currentQ?.audioText && !finished && !instructionMode) {
      const t = setTimeout(() => {
        SpeechManager.stopSpeaking();
        SpeechManager.speak(currentQ.audioText, 'ms-MY', { rate: 0.7, pitch: 1.2 });
      }, 300);
      return () => { clearTimeout(t); SpeechManager.stopSpeaking(); };
    }
  }, [idx, currentQ?.audioText, finished, instructionMode]);

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

  const replayLabel = language === 'bm' ? 'Dengar semula' : 'Replay audio';
  const LessonShell = matchLearn ? MatchLearnShell : React.Fragment;

  const handleReplay = () => {
    if (currentQ?.audioText) {
      SpeechManager.stopSpeaking();
      SpeechManager.speak(currentQ.audioText, 'ms-MY', { rate: 0.7, pitch: 1.2 });
    }
  };

  const handleNextQuestion = () => {
    setPeneranganDismissed(false);
    handleNext();
  };

  const handleRestartQuiz = () => {
    setPeneranganDismissed(false);
    handleRestart();
  };

  return (
    <>
      <style>{`
        .bm-lesson-root {
          --sp-1: clamp(4px, 0.8vh, 8px);
          --sp-2: clamp(8px, 1.6vh, 14px);
          --sp-3: clamp(12px, 2.4vh, 22px);
          height: 100dvh; overflow: hidden;
          /* Plain white shell so kids focus on the Q&A (matches MathOperationsGame) */
          background: #FFFFFF;
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
        /* Reward chips — standardized to match StatsBar (solid candy chip, white text) */
        .bm-pill.life, .bm-pill.gem, .bm-pill.star {
          color: #fff; border: none;
          box-shadow: 0 2px 0 rgba(0,0,0,.12), inset 0 1px 0 rgba(255,255,255,.30);
        }
        .bm-pill.life { background: #FF4B4B; }
        .bm-pill.gem  { background: #1CC8EE; }
        .bm-pill.star { background: #A560FF; }
        /* emoji glyph styled to match StatsBar: soft cast shadow + thin white
           glow so it reads crisply on the candy chip, and a springy pop that
           replays whenever the pill's value changes (keyed remount in JSX) */
        .bm-pill-emoji {
          display: inline-block;
          filter:
            drop-shadow(0 1px 1px rgba(0,0,0,.28))
            drop-shadow(0 0 1px rgba(255,255,255,.55));
          animation: bm-pill-pop .35s cubic-bezier(.34,1.56,.64,1);
        }
        @keyframes bm-pill-pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.18); }
          100% { transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bm-pill-emoji { animation: none; }
        }
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
        .bm-lesson-root--kv .bm-quiz-card {
          border-color: #BFDBFE;
          box-shadow: 0 5px 0 #93C5FD, 0 18px 34px -18px rgba(37, 99, 235, .28);
        }
        .bm-quiz-kv-prompt {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; gap: 3px;
          padding: clamp(12px, 2vh, 18px) 12px;
          margin-bottom: var(--sp-1);
          border: 2px solid #E2E8F0; border-radius: 18px;
          background: #F8FAFC;
        }
        .bm-quiz-kv-illustration {
          display: grid; place-items: center;
          width: clamp(64px, 10vh, 84px); height: clamp(64px, 10vh, 84px);
          margin-bottom: 2px;
          font-size: clamp(42px, 7vh, 58px); line-height: 1;
          filter: drop-shadow(0 3px 2px rgba(15, 23, 42, .1));
        }
        .bm-quiz-kv-word-hint {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(25px, 4.2vh, 34px); line-height: 1.05;
          letter-spacing: .02em; color: #1E293B;
        }
        .bm-quiz-kv-word-hint .is-blank {
          color: #2563EB; text-decoration: underline dashed;
          text-underline-offset: 5px;
        }
        .bm-quiz-kv-jawi {
          min-height: 1.2em;
          font-family: 'Amiri', 'Noto Naskh Arabic', serif;
          font-size: clamp(21px, 3.8vh, 29px); font-weight: 700;
          line-height: 1; color: #64748B; direction: rtl;
        }
        .bm-quiz-kv-prompt .bm-quiz-replay-btn {
          margin-top: 8px;
          color: #2563EB; background: #EFF6FF; border: 1px solid #BFDBFE;
          box-shadow: none;
        }
        .bm-quiz-kv-prompt .bm-quiz-replay-btn:active {
          box-shadow: none; transform: scale(.97);
        }
        .bm-lesson-root--kv .bm-quiz-grid:not(.long) {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
        .bm-lesson-root--kv .bm-quiz-opt {
          min-height: clamp(50px, 8vh, 66px);
          border-radius: 18px;
          border-color: #CBD5E1;
          box-shadow: 0 4px 0 #E2E8F0;
        }
        .bm-quiz-feedback.correct {
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: clamp(11px, 2.2vh, 13px); text-align: center;
          padding: clamp(4px, 0.9vh, 6px) 10px;
          border-radius: 10px;
          color: #047857; background: #ECFDF5; border: 1.5px solid #A7F3D0;
        }
        @keyframes bm-speaker-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        .bm-quiz-instruction {
          text-align: center;
          font-family: 'Fredoka', system-ui, sans-serif;
          font-size: clamp(15px, 2.8vh, 19px);
          font-weight: 600; line-height: 1.5;
          color: #334155;
          background: ${accentColor}10;
          border: 1.5px solid ${accentColor}33;
          border-radius: 14px;
          padding: clamp(10px, 1.8vh, 14px) clamp(12px, 3vw, 18px);
          margin-bottom: var(--sp-1);
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
        .bm-situasi {
          text-align: center;
          font-family: 'Baloo 2', sans-serif;
          font-size: 1.4rem;
          font-weight: 800;
          color: #64748B;
          margin: 0 0 10px;
          line-height: 1.4;
        }
        .bm-soalan {
          text-align: center;
          font-family: 'Fredoka', sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          color: #D97706;
          margin: 0;
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

        .bm-feedback-overlay {
          position: absolute; inset: 0;
          background: rgba(30,41,59,.45);
          backdrop-filter: blur(3px);
          display: flex; align-items: center; justify-content: center;
          z-index: 50;
          border-radius: inherit;
          animation: bm-fade-in .2s ease;
        }
        .bm-feedback-dialog {
          background: #fff;
          border-radius: 20px;
          padding: clamp(18px, 3vh, 28px) clamp(16px, 4vw, 24px);
          max-width: 400px; width: 90%;
          text-align: center;
          box-shadow: 0 20px 50px -12px rgba(0,0,0,.35);
          animation: bm-pop-in .25s cubic-bezier(.34,1.56,.64,1);
        }
        .bm-feedback-icon {
          font-size: clamp(36px, 6vh, 48px);
          margin-bottom: clamp(8px, 1.2vh, 12px);
          line-height: 1;
        }
        .bm-feedback-text {
          font-size: clamp(14px, 2.6vh, 18px);
          font-weight: 600; line-height: 1.5;
          color: #334155; margin: 0 0 clamp(14px, 2.4vh, 20px);
        }
        .bm-feedback-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, 2.6vh, 17px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(9px, 1.6vh, 12px) clamp(28px, 6vw, 40px);
          color: #fff;
          background: linear-gradient(180deg, ${accentColor}cc, ${accentColor});
          box-shadow: 0 4px 0 ${accentColor}99;
          transition: transform .12s ease;
        }
        .bm-feedback-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 ${accentColor}99; }
        @keyframes bm-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes bm-pop-in { from { transform: scale(.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }

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

        .bm-lesson-root--match {
          min-height: 100dvh; height: auto;
          overflow-x: clip; overflow-y: visible;
          background: #F8FAFC;
        }
        .bm-match-wrap {
          display: flex; flex: 1 1 auto; flex-direction: column;
          min-height: 0; gap: 0;
        }
        .bm-match-wrap > .ip-header { flex-shrink: 0; }
        .bm-lesson-root--match .bm-header {
          background: transparent; border-bottom: 0; backdrop-filter: none;
          padding: clamp(10px, 1.6vh, 18px) clamp(12px, 1.6vw, 24px) 4px;
        }
        .bm-lesson-root--match .bm-header-row { min-height: 44px; justify-content: space-between; }
        .bm-lesson-root--match .bm-header-row--actions::after { display: none; }
        .bm-lesson-root--match .bm-header-title { display: none; }
        .bm-lesson-root--match .bm-header-actions { flex: 0 0 auto; }
        .bm-lesson-root--match .bm-header-back {
          height: 44px; padding-inline: 14px; border-radius: 999px;
          color: #1E293B; border: 1.5px solid rgba(255,255,255,.9);
          background: rgba(255,255,255,.92);
          box-shadow: 0 4px 12px -6px rgba(100,116,139,.45);
        }
        .bm-lesson-root--match .bm-header .ih-points,
        .bm-lesson-root--match .bm-header .ih-account {
          background: rgba(255,255,255,.92) !important;
          border: 1.5px solid rgba(255,255,255,.9);
          border-radius: 999px;
          box-shadow: 0 4px 12px -6px rgba(100,116,139,.45);
        }
        .bm-lesson-root--match .bm-lesson-body {
          max-width: none;
          justify-content: center;
          justify-content: safe center;
          align-items: center;
          align-items: safe center;
          overflow-x: clip;
          overflow-y: visible;
          padding: clamp(10px, 2vh, 20px) 0 var(--sp-2);
        }
        .bm-lesson-root--match .bm-quiz-stage { width: 100%; max-width: none; margin: 0; }
        .bm-lesson-root--match .bm-quiz-stats {
          width: 100%; max-width: none; margin: 0 auto 7px;
        }
        .bm-lesson-root--match .bm-pill.prog {
          color: #1D4ED8; background: #EFF6FF;
          border-color: #3B82F6;
          box-shadow: 0 2px 6px -3px rgba(59,130,246,.5);
        }
        .bm-lesson-root--match .bm-pill-group { display: none; }
        .bm-lesson-root--match .bm-quiz-bar-wrap {
          width: 100%; max-width: none; height: 18px;
          margin: 0 auto clamp(12px, 2vh, 18px); padding: 3px;
          background: #EFF6FF; border: 1.5px solid #DBEAFE;
          box-shadow: inset 0 2px 3px rgba(59,130,246,.16);
        }
        .bm-lesson-root--match .bm-quiz-bar-fill {
          background: linear-gradient(90deg, #93C5FD, #60A5FA 55%, #3B82F6);
          border-radius: 999px;
          box-shadow: 0 2px 5px -2px rgba(59,130,246,.55);
        }
        .bm-lesson-root--match .bm-quiz-card,
        .bm-lesson-root--match .bm-quiz-start-card,
        .bm-lesson-root--match .bm-quiz-result-card {
          background: linear-gradient(160deg, #FFFFFF 0%, #F8FAFC 58%, #F1F5F9 100%);
          border: 1.5px solid #E2E8F0;
          border-radius: clamp(24px, 3.6vh, 34px);
          box-shadow: 0 2px 0 #E2E8F0, 0 18px 40px -22px rgba(71,85,105,.55);
        }
        .bm-lesson-root--match .bm-quiz-card {
          width: 100%; max-width: none; margin-inline: auto;
          justify-content: center; gap: clamp(3px, .6vh, 7px);
          padding: clamp(16px, 2.8vh, 28px) clamp(18px, 3vw, 30px) clamp(14px, 2.4vh, 24px);
        }
        .bm-lesson-root--match .bm-quiz-media {
          position: relative;
          width: clamp(78px, 10.8vh, 104px); height: clamp(78px, 10.8vh, 104px);
          margin: 0 auto; padding: 0; appearance: none;
          border-radius: 50%;
          background: linear-gradient(145deg, #DBEAFE 0%, #EFF6FF 100%);
          border: 2px solid #BFDBFE;
          box-shadow: 0 6px 14px -8px rgba(59,130,246,.75), inset 0 2px 0 rgba(255,255,255,.8);
          display: flex; align-items: center; justify-content: center;
        }
        .bm-lesson-root--match .bm-quiz-media--audio {
          cursor: pointer;
          transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease;
        }
        @media (hover: hover) {
          .bm-lesson-root--match .bm-quiz-media--audio:hover {
            transform: translateY(-2px); border-color: #60A5FA;
            box-shadow: 0 9px 18px -9px rgba(59,130,246,.85), inset 0 2px 0 rgba(255,255,255,.85);
          }
        }
        .bm-lesson-root--match .bm-quiz-media--audio:active {
          transform: translateY(1px);
          box-shadow: 0 4px 10px -8px rgba(59,130,246,.8), inset 0 2px 0 rgba(255,255,255,.7);
        }
        .bm-lesson-root--match .bm-quiz-media-audio-badge {
          position: absolute; right: -5px; bottom: -5px;
          width: 34px; height: 34px; border-radius: 50%;
          background: #FFFFFF; border: 2px solid #CBD5E1; color: #1D4ED8;
          display: grid; place-items: center;
          box-shadow: 0 3px 8px -3px rgba(15,23,42,.35), inset 0 1px 0 rgba(255,255,255,.9);
        }
        .bm-lesson-root--match .bm-quiz-media-audio-badge svg {
          width: 18px; height: 18px;
        }
        .bm-lesson-root--match .bm-quiz-emoji { font-size: clamp(40px, 6.4vh, 56px); }
        .bm-lesson-root--match .bm-quiz-question-row {
          display: flex; justify-content: center; width: 100%;
        }
        .bm-lesson-root--match .bm-quiz-question { margin: 0; font-weight: 800; }
        .bm-lesson-root--match .bm-quiz-replay-btn { display: none; }
        .bm-lesson-root--match .bm-quiz-grid {
          width: 100%; max-width: 320px; margin: clamp(4px, .8vh, 8px) auto 0;
        }
        .bm-lesson-root--match .bm-quiz-grid.long { max-width: 380px; }
        .bm-lesson-root--match .bm-quiz-opt {
          position: relative;
          background: #F1F5F9; border: 2px solid #CBD5E1; border-radius: 18px;
          color: #1E293B;
          font-size: clamp(20px, 3.2vh, 26px); font-weight: 800;
          box-shadow: 0 4px 0 #94A3B8, 0 10px 18px -12px rgba(71,85,105,.7);
        }
        .bm-lesson-root--match .bm-quiz-opt.word-opt {
          font-size: clamp(15px, 2.7vh, 20px); font-weight: 800;
        }
        .bm-lesson-root--match .bm-quiz-opt.selected {
          border-color: #3B82F6; background: #EFF6FF; color: #1D4ED8;
          box-shadow: 0 4px 0 #93C5FD, 0 10px 18px -12px rgba(59,130,246,.65);
          transform: scale(.98);
        }
        .bm-lesson-root--match .bm-quiz-opt:not(:disabled):active {
          transform: translateY(2px);
          box-shadow: 0 2px 0 #94A3B8, 0 6px 12px -10px rgba(71,85,105,.65);
        }
        @media (hover: hover) {
          .bm-lesson-root--match .bm-quiz-opt:not(:disabled):hover {
            transform: translateY(-2px); border-color: #94A3B8; background: #E2E8F0;
            box-shadow: 0 6px 0 #94A3B8, 0 14px 20px -12px rgba(71,85,105,.75);
          }
        }
        .bm-lesson-root--match .bm-quiz-opt.correct {
          border-color: #15803D; background: #F0FDF4; color: #15803D;
          box-shadow: 0 5px 0 #15803D, 0 12px 20px -12px rgba(22,163,74,.55);
          animation: bm-match-correct-in .28s cubic-bezier(.34,1.56,.64,1) both;
        }
        .bm-lesson-root--match .bm-quiz-opt.correct .bm-opt-letter-display {
          color: #15803D;
        }
        .bm-lesson-root--match .bm-quiz-opt.wrong {
          border-color: #B91C1C; background: #FEF2F2; color: #B91C1C;
          box-shadow: 0 5px 0 #B91C1C, 0 12px 20px -12px rgba(220,38,38,.5);
          animation: bm-match-wrong-in .34s ease-in-out both;
        }
        .bm-lesson-root--match .bm-quiz-opt.wrong .bm-opt-letter-display {
          color: #B91C1C;
        }
        @keyframes bm-match-correct-in {
          0% { opacity: .35; transform: translateY(-8px) scale(.98); background: #F1F5F9; border-color: #CBD5E1; color: #1E293B; box-shadow: 0 4px 0 #94A3B8, 0 10px 18px -12px rgba(71,85,105,.7); }
          70% { opacity: 1; transform: translateY(2px) scale(1.015); }
          100% { opacity: 1; transform: translateY(0) scale(1); background: #F0FDF4; border-color: #15803D; color: #15803D; box-shadow: 0 5px 0 #15803D, 0 12px 20px -12px rgba(22,163,74,.55); }
        }
        @keyframes bm-match-wrong-in {
          0%, 20%, 40%, 60%, 76% { background: #F1F5F9; border-color: #CBD5E1; color: #1E293B; box-shadow: 0 4px 0 #94A3B8, 0 10px 18px -12px rgba(71,85,105,.7); }
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-5px); }
          76% { transform: translateX(4px); }
          88%, 100% { background: #FEF2F2; border-color: #B91C1C; color: #B91C1C; box-shadow: 0 5px 0 #B91C1C, 0 12px 20px -12px rgba(220,38,38,.5); }
        }
        .bm-lesson-root--match .bm-quiz-opt.correct::after,
        .bm-lesson-root--match .bm-quiz-opt.wrong::after {
          position: absolute; top: -8px; right: -8px;
          width: 24px; height: 24px; border-radius: 50%;
          color: #fff; font-size: 14px; line-height: 1;
          display: grid; place-items: center;
          box-shadow: 0 2px 6px -2px rgba(15,23,42,.4);
        }
        .bm-lesson-root--match .bm-quiz-opt.correct::after { content: '✓'; background: #15803D; animation: bm-match-badge-in .2s ease-out .16s both; }
        .bm-lesson-root--match .bm-quiz-opt.wrong::after { content: '✕'; background: #B91C1C; animation: bm-match-badge-in .2s ease-out .3s both; }
        @keyframes bm-match-badge-in {
          from { opacity: 0; transform: scale(.5); }
          to { opacity: 1; transform: scale(1); }
        }
        .bm-lesson-root--match .bm-quiz-media--audio:focus-visible,
        .bm-lesson-root--match .bm-quiz-opt:focus-visible {
          outline: 3px solid #3B82F6; outline-offset: 3px;
        }
        .bm-lesson-root--match .bm-quiz-feedback-zone {
          min-height: clamp(22px, 3.6vh, 30px); margin-top: 4px;
        }
        .bm-lesson-root--match .bm-quiz-feedback.wrong {
          color: #7F1D1D; background: #FFF1F2; border-color: #FDA4AF;
          font-weight: 800;
          animation: bm-match-feedback-in .24s ease-out .12s both;
        }
        @keyframes bm-match-feedback-in {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .bm-lesson-root--match .bm-quiz-next-wrap {
          width: 100%; max-width: 320px; margin: clamp(2px, .5vh, 5px) auto 0;
          transition: margin-top .15s ease;
        }
        .bm-lesson-root--match .bm-quiz-next-wrap.after-wrong {
          margin-top: clamp(10px, 1.8vh, 16px);
        }
        .bm-lesson-root--match .bm-quiz-next-wrap.long { max-width: 380px; }
        .bm-lesson-root--match .bm-quiz-next-btn {
          width: 100%; padding-inline: 12px;
          background: linear-gradient(180deg, #60A5FA, #2563EB);
          box-shadow: 0 4px 0 #1D4ED8, 0 8px 16px -10px rgba(37,99,235,.75);
          transition: transform .12s ease, box-shadow .12s ease, background .12s ease;
        }
        @media (hover: hover) {
          .bm-lesson-root--match .bm-quiz-next-btn:hover {
            transform: translateY(-1px);
            background: linear-gradient(180deg, #3B82F6, #1D4ED8);
            box-shadow: 0 5px 0 #1E40AF, 0 12px 20px -10px rgba(37,99,235,.8);
          }
        }
        .bm-lesson-root--match .bm-quiz-next-btn:active {
          transform: translateY(2px) scale(.98);
          background: linear-gradient(180deg, #2563EB, #1E40AF);
          box-shadow: 0 2px 0 #1E3A8A, 0 5px 10px -8px rgba(37,99,235,.75);
        }
        .bm-lesson-root--match .bm-quiz-next-btn.hidden-state { display: none; }
        .bm-lesson-root--match .bm-lesson-footer { color: #64748B; }
        @media (prefers-reduced-motion: reduce) {
          .bm-lesson-root--match .bm-quiz-opt.correct,
          .bm-lesson-root--match .bm-quiz-opt.wrong,
          .bm-lesson-root--match .bm-quiz-opt.correct::after,
          .bm-lesson-root--match .bm-quiz-opt.wrong::after,
          .bm-lesson-root--match .bm-quiz-feedback.wrong { animation: none; }
        }
        @media (max-width: 560px) {
          .bm-lesson-root--match .bm-quiz-card { padding: 12px 10px 10px; border-radius: 22px; }
          .bm-lesson-root--match .bm-quiz-media { width: 74px; height: 74px; }
          .bm-lesson-root--match .bm-quiz-emoji { font-size: 38px; }
          .bm-lesson-root--match .bm-quiz-question { font-size: 20px; }
          .bm-lesson-root--match .bm-quiz-grid,
          .bm-lesson-root--match .bm-quiz-grid.long {
            grid-template-columns: 1fr 1fr;
            max-width: min(100%, 340px);
            gap: 7px;
          }
          .bm-lesson-root--match .bm-quiz-opt {
            min-height: 52px; padding: 8px 6px; border-radius: 14px;
            font-size: clamp(17px, 5vw, 22px);
          }
          .bm-lesson-root--match .bm-quiz-opt.word-opt {
            font-size: clamp(12px, 3.4vw, 15px);
            line-height: 1.2;
          }
          .bm-lesson-root--match .bm-quiz-opt .bm-opt-letter-display {
            overflow-wrap: anywhere; hyphens: auto;
          }
          .bm-lesson-root--match .bm-quiz-feedback.wrong { font-size: 12px; padding: 5px 8px; }
          .bm-lesson-root--match .bm-quiz-next-wrap,
          .bm-lesson-root--match .bm-quiz-next-wrap.long { max-width: min(100%, 340px); }
          .bm-lesson-root--match .bm-quiz-next-btn { font-size: 16px; padding-block: 10px; }
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
          .bm-lesson-root--match .bm-quiz-next-btn { padding: min(13px, 1.8vh) 12px; }
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
        /* ── Large desktop: fill the area beside the sidebar ── */
        @media (min-width: 1024px) {
          .bm-lesson-root--match .bm-lesson-body {
            max-width: none;
            padding: 8px 0 12px;
          }
          .bm-lesson-root--match .bm-header { padding-top: clamp(6px, 1vh, 12px); }
          .bm-lesson-root--match .bm-quiz-stage { width: 100%; max-width: none; margin-inline: auto; }
          .bm-lesson-root--match .bm-quiz-stats {
            width: 100%; max-width: none;
            margin: 0 auto 8px;
            justify-content: center;
          }
          .bm-lesson-root--match .bm-pill { font-size: 16px; padding: 6px 20px; }
          .bm-lesson-root--match .bm-quiz-bar-wrap {
            max-width: none; height: 24px; padding: 3px;
            margin: 0 auto clamp(14px, 2vh, 22px);
          }
          .bm-lesson-root--match .bm-quiz-card {
            max-width: none;
            padding: clamp(20px, 2.8vh, 34px) clamp(28px, 4vw, 56px) clamp(4px, 0.8vh, 10px);
            gap: clamp(8px, 1.4vh, 16px);
            border-radius: 36px;
          }
          .bm-lesson-root--match .bm-quiz-media {
            width: clamp(110px, 14vh, 148px); height: clamp(110px, 14vh, 148px);
          }
          .bm-lesson-root--match .bm-quiz-media-audio-badge { width: 44px; height: 44px; }
          .bm-lesson-root--match .bm-quiz-media-audio-badge svg { width: 24px; height: 24px; }
          .bm-lesson-root--match .bm-quiz-emoji { font-size: clamp(64px, 9vh, 92px); }
          .bm-lesson-root--match .bm-quiz-question {
            font-size: clamp(28px, 4.2vh, 40px); line-height: 1.2;
          }
          .bm-lesson-root--match .bm-quiz-grid,
          .bm-lesson-root--match .bm-quiz-grid.long {
            max-width: min(100%, 820px);
            gap: clamp(14px, 2vh, 22px);
            margin-top: clamp(12px, 2vh, 22px);
          }
          .bm-lesson-root--match .bm-quiz-opt {
            min-height: clamp(88px, 12vh, 120px);
            font-size: clamp(30px, 4.8vh, 46px);
            border-radius: 24px;
            box-shadow: 0 6px 0 #94A3B8, 0 18px 26px -16px rgba(71,85,105,.7);
          }
          .bm-lesson-root--match .bm-quiz-opt.word-opt {
            font-size: clamp(21px, 3.2vh, 30px); line-height: 1.25;
          }
          .bm-lesson-root--match .bm-quiz-feedback-zone { min-height: 34px; margin-top: 8px; }
          .bm-lesson-root--match .bm-quiz-feedback.wrong { font-size: 17px; }
          .bm-lesson-root--match .bm-quiz-next-wrap,
          .bm-lesson-root--match .bm-quiz-next-wrap.long {
            max-width: min(100%, 420px); margin-top: 4px;
          }
          .bm-lesson-root--match .bm-quiz-next-btn { font-size: 22px; padding-block: 16px; }
          .bm-lesson-root--match .bm-lesson-footer { padding-bottom: 12px; }
        }
        @media (max-width: 767px) {
          .bm-lesson-root--match.mh-screen.page-layout-root {
            padding-top: calc(6px + env(safe-area-inset-top, 0px));
          }
          .bm-lesson-root--match .bm-header,
          .bm-match-wrap > .ip-header {
            align-items: center;
          }
          .bm-lesson-root--match .bm-lesson-body {
            justify-content: center;
            justify-content: safe center;
            align-items: stretch;
            padding-top: 8px;
            padding-bottom: 40px;
          }
          .bm-lesson-root--match .bm-quiz-stage {
            width: 100%;
            max-width: none;
            margin: 0;
          }
          .bm-lesson-root--match .bm-quiz-stats {
            justify-content: center;
          }
          .bm-lesson-root--match .bm-quiz-bar-wrap {
            margin-bottom: 10px;
          }
          .bm-lesson-root--match .bm-lesson-footer {
            padding-bottom: calc(12px + env(safe-area-inset-bottom, 0px));
          }
        }
      `}</style>

      <div className={`bm-lesson-root${matchLearn ? ' bm-lesson-root--match mh-screen page-layout-root iman-layout' : ''}${kvQuiz ? ' bm-lesson-root--kv' : ''}`}>
        <LessonShell>
        {matchLearn ? (
          <PageHeader {...accountProps} onBack={headerBack} language={language} backOnly />
        ) : (
          <BMHeader
            onBack={onBack}
            language={language}
            title={topicTitle}
            sticky
          />
        )}

        <div className="bm-lesson-body">
          {finished ? (
            <div className="bm-quiz-stage">
              {!matchLearn && <StatsBar subject="bm" />}
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
                      <button className="bm-btn secondary" onClick={handleRestartQuiz}>
                        🔄 {language === 'bm' ? 'Cuba Lagi' : 'Try Again'}
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="bm-btn primary" onClick={handleRestartQuiz}>
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
                  <span className="bm-pill life"><span className="bm-pill-emoji" key={hearts}>❤️</span> {hearts}</span>
                  <span className="bm-pill gem"><span className="bm-pill-emoji" key={gems}>💎</span> {gems}</span>
                  <span className="bm-pill star"><span className="bm-pill-emoji" key={score}>⭐</span> {score}</span>
                </span>
              </div>
              <div className="bm-quiz-bar-wrap">
                <div className="bm-quiz-bar-fill" style={{ width: `${((idx + 1) / totalRounds) * 100}%` }} />
              </div>

              <div className="bm-quiz-card">
                {kvQuiz && subtitle && <div className="bm-quiz-subtitle">{subtitle}</div>}
                {kvQuiz ? (
                  <div className="bm-quiz-kv-prompt">
                    <div className="bm-quiz-kv-illustration" aria-hidden="true">
                      {currentQ.emoji || '🔊'}
                    </div>
                    <div className="bm-quiz-kv-word-hint">
                      {answered ? (
                        <span className={selected === correctIdx ? 'is-correct' : ''}>{currentQ.word}</span>
                      ) : (
                        <>
                          <span className="is-blank">__</span>{currentQ.rest}
                        </>
                      )}
                    </div>
                    <div className="bm-quiz-kv-jawi" lang="ms">{currentQ.jawi}</div>
                    <button className="bm-quiz-replay-btn" onClick={handleReplay}>
                      🔊 {language === 'bm' ? 'Dengar Semula' : 'Replay'}
                    </button>
                  </div>
                ) : instructionMode ? (
                  currentQ.audioText && (
                    <div className="bm-quiz-instruction">{currentQ.audioText}</div>
                  )
                ) : hideEmoji ? null : matchLearn && currentQ.audioText && !instructionMode ? (
                  <button
                    type="button"
                    className="bm-quiz-media bm-quiz-media--audio"
                    onClick={handleReplay}
                    aria-label={replayLabel}
                    title={replayLabel}
                  >
                    {currentQ.emoji ? (
                      <span className="bm-quiz-emoji">{currentQ.emoji}</span>
                    ) : (
                      <span className="bm-quiz-speaker-icon">🔊</span>
                    )}
                    <span className="bm-quiz-media-audio-badge" aria-hidden="true"><QuizSpeakerIcon /></span>
                  </button>
                ) : (
                  <div className="bm-quiz-media">
                    {currentQ.emoji ? (
                      <span className="bm-quiz-emoji">{currentQ.emoji}</span>
                    ) : (
                      <span className="bm-quiz-speaker-icon">🔊</span>
                    )}
                  </div>
                )}
                {!kvQuiz && subtitle && <div className="bm-quiz-subtitle">{subtitle}</div>}
                {hideEmoji && currentQ.question ? (
                  (() => {
                    const parts = currentQ.question.split('\n');
                    return (
                      <div className="bm-quiz-split-wrap">
                        {parts.map((part, i) => (
                          <p key={i} className={i === 0 ? 'bm-situasi' : 'bm-soalan'}>{part}</p>
                        ))}
                      </div>
                    );
                  })()
                ) : (
                  <div className="bm-quiz-question-row">
                    <p className="bm-quiz-question">
                      {currentQ.question || (language === 'bm' ? 'Apakah bunyi ini?' : 'What sound is this?')}
                    </p>
                  </div>
                )}
                {!kvQuiz && !instructionMode && currentQ.audioText && !matchLearn && (
                  <button className="bm-quiz-replay-btn" onClick={handleReplay}>
                    🔊 {language === 'bm' ? 'Dengar Semula' : 'Replay'}
                  </button>
                )}

                <div className={'bm-quiz-grid' + (hasLongOptions ? ' long' : '')}>
                  {currentQ.options.map((opt, i) => {
                    const isSelected = selected === i;
                    const isCorrectChoice = answered && i === correctIdx;
                    const isWrongChoice = answered && isSelected && i !== correctIdx;
                    // Letters/syllables (≤3 chars) display uppercase at large size;
                    // words/sentences keep natural casing at the smaller word-opt size.
                    const isWordOpt = !kvQuiz && (!!currentQ.emoji || opt.length > 2);
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
                  {kvQuiz && answered && selected === correctIdx && (
                    <div className="bm-quiz-feedback correct">
                      🎉 {language === 'bm' ? `Hebat! Jawapan betul: “${currentQ.word}”` : `Great! Correct answer: “${currentQ.word}”`}
                    </div>
                  )}
                  {answered && selected !== correctIdx && (
                    <div className="bm-quiz-feedback wrong">
                      {matchLearn ? '💡' : '❌'} {language === 'bm' ? 'Jawapan' : 'Answer'}: {kvQuiz ? correctAnswer : ((currentQ.emoji || correctAnswer.length > 3) ? correctAnswer : correctAnswer.toUpperCase())}
                    </div>
                  )}
                </div>

                {showFeedback && answered && currentQ?.penerangan && !peneranganDismissed && (
                  <div className="bm-feedback-overlay">
                    <div className="bm-feedback-dialog">
                      <div className="bm-feedback-icon">{selected === correctIdx ? '✅' : '❌'}</div>
                      <p className="bm-feedback-text">{currentQ.penerangan}</p>
                      <button className="bm-feedback-btn" onClick={() => setPeneranganDismissed(true)}>
                        {language === 'bm' ? 'Teruskan →' : 'Continue →'}
                      </button>
                    </div>
                  </div>
                )}

                <div className={'bm-quiz-next-wrap' + (hasLongOptions ? ' long' : '') + (answered && selected !== correctIdx ? ' after-wrong' : '')}>
                  {showFeedback && answered && currentQ?.penerangan && !peneranganDismissed ? null : (
                    <button className={'bm-quiz-next-btn' + (answered ? '' : ' hidden-state')} onClick={handleNextQuestion}>
                      {idx + 1 >= totalRounds
                        ? (language === 'bm' ? 'Lihat Keputusan →' : 'See Results →')
                        : (language === 'bm' ? 'Seterusnya →' : 'Next →')}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {!finished && (
          <p className="bm-lesson-footer">
            {footerText || `Bahasa Melayu KSSR · ${topicTitle}`}
          </p>
        )}
        </LessonShell>
      </div>
    </>
  );
}
