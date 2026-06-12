/**
 * Standardized per-topic gamification entry point for BM/MT/PI topic components.
 * Mirrors BMLessonQuizLayout behaviour so every topic feels identical — live XP,
 * streak bonus, and the "+10 XP" toast, with no per-topic toast JSX required.
 *
 *  - awardCorrect()  — call on EACH correct answer. +10 'quiz' XP LIVE, +5 streak
 *    bonus on every 5th consecutive correct (streak tracked inside the hook), and
 *    fires the global "+XP" toast (see GlobalXpToast, mounted once at app root).
 *  - awardWrong()    — call on each wrong answer. Resets the streak counter.
 *  - completeTopic(correctCount, total, passPct=70) — at completion: crown +
 *    completion bonus via completeTopicAttempt (first-completion-only).
 *  - completeActivity() — finishable non-quiz (speaking/tracing/read-aloud).
 *
 * Why live, not batched: a child who plays half a quiz keeps the XP earned and the
 * StatsBar already reflects it. The toast is dispatched as a window 'xp-toast' event
 * so it works in any topic UI without layout surgery.
 *
 * Wiring rule (lesson 1): destructure only the stable callbacks; never depend on the
 * whole hook object in an effect. Call awardCorrect/awardWrong from the answer EVENT
 * handler (not inside a state-updater — StrictMode double-invokes those).
 */
import { useCallback, useRef } from 'react';
import useGamification from './useGamification';
import { XP_PER_CORRECT, XP_PER_STREAK_BONUS } from '../services/gamificationConstants';

export default function useTopicGamification(topicId, subject = 'bm') {
  const { awardXP, completeTopicAttempt, markActivityComplete } = useGamification(subject);
  const streakRef = useRef(0);

  const awardCorrect = useCallback(async () => {
    if (!topicId) return;
    const base = await awardXP(XP_PER_CORRECT, 'quiz', topicId);
    streakRef.current += 1;
    let bonus = 0;
    if (streakRef.current % 5 === 0) {
      bonus = await awardXP(XP_PER_STREAK_BONUS, 'streak_bonus', topicId);
    }
    // Toast only reflects XP actually awarded (base may be 0 if rate-limited).
    if (base > 0) {
      window.dispatchEvent(new CustomEvent('xp-toast', { detail: { xp: base, streakBonus: bonus } }));
    }
  }, [topicId, awardXP]);

  const awardWrong = useCallback(() => {
    streakRef.current = 0;
  }, []);

  const completeTopic = useCallback(
    async (correctCount, questionCount, passPct = 70) => {
      if (!topicId) return;
      const pct = questionCount > 0 ? (correctCount / questionCount) * 100 : 0;
      if (pct >= passPct) await completeTopicAttempt(topicId, correctCount, questionCount);
    },
    [topicId, completeTopicAttempt]
  );

  const completeActivity = useCallback(async () => {
    if (!topicId) return;
    await markActivityComplete(topicId);
  }, [topicId, markActivityComplete]);

  return { awardCorrect, awardWrong, completeTopic, completeActivity };
}
