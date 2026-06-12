import React, { useEffect, useRef } from 'react';
import useGamification from '../../hooks/useGamification';

export default function StatsBar({ subject = 'bm' }) {
  const { xp, coins, level, streak } = useGamification(subject);
  const prevXpRef = useRef(xp);
  const pulseRef = useRef(null);

  useEffect(() => {
    if (prevXpRef.current !== xp && pulseRef.current) {
      pulseRef.current.classList.remove('sb-pulse');
      void pulseRef.current.offsetWidth;
      pulseRef.current.classList.add('sb-pulse');
    }
    prevXpRef.current = xp;
  }, [xp]);

  return (
    <>
      <style>{`
        .sb-root {
          display: flex;
          align-items: center;
          justify-content: space-around;
          gap: 4px;
          padding: 8px 10px;
          min-height: 48px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
          font-family: 'Fredoka', system-ui, sans-serif;
          user-select: none;
          -webkit-user-select: none;
          border-radius: 12px;
          margin-bottom: 12px;
        }
        @media (max-width: 480px) {
          .sb-root {
            padding: 8px 6px;
            gap: 2px;
            border-radius: 10px;
            min-height: 44px;
          }
        }
        @media (prefers-color-scheme: dark) {
          .sb-root {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          }
        }

        .sb-item {
          flex: 1 1 0; /* equal-width columns, each centers its own content */
          min-width: 0;
          display: flex;
          align-items: center;
          gap: 4px;
          white-space: nowrap;
          justify-content: center;
        }
        .sb-emoji {
          font-size: 16px;
          line-height: 1;
        }
        @media (max-width: 480px) {
          .sb-emoji { font-size: 14px; }
        }

        .sb-label {
          font-size: 11px;
          font-weight: 500;
          line-height: 1; /* match emoji/value so flex centers all on one axis */
          color: rgba(255,255,255,0.75);
        }
        .sb-value {
          font-size: 14px;
          font-weight: 700;
          line-height: 1;
          color: #fff;
          transition: transform .25s ease;
        }
        @media (max-width: 480px) {
          .sb-label { display: none; }
          .sb-value { font-size: 12px; }
        }
        @media (min-width: 768px) {
          .sb-root {
            justify-content: center;
            gap: 4px;
            padding: 8px 16px;
            min-height: 44px;
          }
          .sb-item { gap: 6px; }
          .sb-label { font-size: 12px; }
          .sb-value { font-size: 16px; }
        }

        .sb-sep {
          width: 1px;
          height: 24px;
          background: rgba(255,255,255,0.25);
          flex-shrink: 0;
        }
        @media (max-width: 480px) {
          .sb-sep { display: none; }
        }
        @media (min-width: 768px) {
          .sb-sep { height: 28px; }
        }

        .sb-streak-emoji {
          animation: sb-flicker 0.8s ease-in-out infinite;
        }
        @keyframes sb-flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sb-streak-emoji { animation: none; }
        }

        @keyframes sb-pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.18); }
          100% { transform: scale(1); }
        }
        .sb-pulse .sb-value {
          animation: sb-pop .35s cubic-bezier(.34,1.56,.64,1);
        }
        @media (prefers-reduced-motion: reduce) {
          .sb-pulse .sb-value { animation: none; }
        }
      `}</style>

      <div
        className="sb-root"
        ref={pulseRef}
        role="region"
        aria-label={`Streak ${streak} days, ${xp} experience points, level ${level}, ${coins} coins`}
      >
        <div className="sb-item" aria-label={`Streak: ${streak} days`}>
          <span className="sb-emoji sb-streak-emoji" aria-hidden="true">🔥</span>
          <span className="sb-value">{streak}</span>
        </div>

        <div className="sb-sep" aria-hidden="true" />

        <div className="sb-item" aria-label={`${xp} experience points`}>
          <span className="sb-emoji" aria-hidden="true">⭐</span>
          <span className="sb-value" aria-live="polite">{xp}</span>
          <span className="sb-label">XP</span>
        </div>

        <div className="sb-sep" aria-hidden="true" />

        <div className="sb-item" aria-label={`Level ${level}`}>
          <span className="sb-value">{level}</span>
          <span className="sb-label">Lv</span>
        </div>

        <div className="sb-sep" aria-hidden="true" />

        <div className="sb-item" aria-label={`${coins} coins`}>
          {/* 💰 not 🪙 — U+1FA99 has no glyph on Windows 10 (renders as □) */}
          <span className="sb-emoji" aria-hidden="true">💰</span>
          <span className="sb-value" aria-live="polite">{coins}</span>
          <span className="sb-label">Coins</span>
        </div>
      </div>
    </>
  );
}
