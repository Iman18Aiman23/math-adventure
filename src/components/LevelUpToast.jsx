import React, { useEffect } from 'react';

/**
 * LevelUpToast
 *
 * Shows a celebratory toast when the player reaches a new level.
 * Auto-dismisses after `duration` ms.
 *
 * Props:
 *  level      – the new level number (renders when truthy)
 *  onDismiss  – callback to clear levelUpInfo from parent
 *  duration   – ms before auto-dismiss (default 2500)
 */
export default function LevelUpToast({ level, onDismiss, duration = 2500 }) {
  useEffect(() => {
    if (!level) return;
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [level, onDismiss, duration]);

  if (!level) return null;

  return (
    <div className="level-up-toast" onClick={onDismiss} role="status" aria-live="polite">
      <div className="level-up-toast-inner">
        <div className="level-up-stars">⭐</div>
        <div className="level-up-title">Level Up!</div>
        <div className="level-up-level">Level {level}</div>
        <div className="level-up-subtitle">Keep going, superstar! 🚀</div>
      </div>
    </div>
  );
}
