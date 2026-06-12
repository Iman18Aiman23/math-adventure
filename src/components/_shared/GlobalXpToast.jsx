import React, { useEffect, useState, useCallback } from 'react';
import XpToast from './XpToast';

/**
 * App-level "+XP" toast. Mounted once near the app root; listens for window
 * 'xp-toast' CustomEvents (dispatched by useTopicGamification.awardCorrect) and
 * shows the reward animation fixed at top-center, over any topic UI. This lets
 * every standardized topic get the toast with zero per-topic JSX.
 *
 * Note: BMLessonQuizLayout has its OWN inline XpToast and does not use the event,
 * so there is no double-toast.
 */
export default function GlobalXpToast() {
  const [toast, setToast] = useState({ id: 0, xp: 0, streakBonus: 0, show: false });

  useEffect(() => {
    const handler = (e) => {
      const { xp = 10, streakBonus = 0 } = e.detail || {};
      setToast((t) => ({ id: t.id + 1, xp, streakBonus, show: true }));
    };
    window.addEventListener('xp-toast', handler);
    return () => window.removeEventListener('xp-toast', handler);
  }, []);

  const hide = useCallback(() => setToast((t) => ({ ...t, show: false })), []);

  return (
    <div
      style={{
        position: 'fixed',
        top: '12px',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        zIndex: 3000,
        pointerEvents: 'none',
      }}
    >
      <XpToast key={toast.id} xp={toast.xp} streakBonus={toast.streakBonus} visible={toast.show} onDone={hide} />
    </div>
  );
}
