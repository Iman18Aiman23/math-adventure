import React, { useEffect, useState, useCallback } from 'react';
import XpToast from './XpToast';

/**
 * App-level "+XP" toast. Mounted once inside .app-container; listens for window
 * 'xp-toast' CustomEvents (dispatched by useTopicGamification.awardCorrect) and
 * shows the reward animation centered within the play area, over any topic UI.
 * This lets every standardized topic get the toast with zero per-topic JSX.
 * (.app-container is position:relative, so the absolute overlay below centers to
 * it — automatically offset from the desktop sidebar.)
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
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 3000,
        pointerEvents: 'none',
      }}
    >
      <XpToast key={toast.id} xp={toast.xp} streakBonus={toast.streakBonus} visible={toast.show} onDone={hide} />
    </div>
  );
}
