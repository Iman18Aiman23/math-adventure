import React, { useEffect, useRef } from 'react';

export default function XpToast({ xp = 0, streakBonus = 0, visible = false, onDone }) {
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => onDoneRef.current?.(), 1800);
    return () => clearTimeout(t);
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      <style>{`
        .xp-toast {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: clamp(7px, 1.2vh, 10px) clamp(18px, 3vw, 28px) clamp(7px, 1.2vh, 10px) clamp(14px, 2.6vw, 22px);
          border-radius: 999px;
          background: linear-gradient(135deg, #FFFBEB 0%, #FDE68A 100%);
          border: 2px solid #FBBF24;
          box-shadow:
            0 6px 24px -6px rgba(251, 191, 36, .55),
            0 2px 8px rgba(0, 0, 0, .08);
          color: #92400E;
          font-family: 'Baloo 2', system-ui, sans-serif;
          line-height: 1.1;
          white-space: nowrap;
          pointer-events: none;
          z-index: 20;
          position: relative;
          overflow: visible;
          will-change: transform, opacity;
          animation:
            xp-pop-in .5s cubic-bezier(.34, 1.56, .64, 1),
            xp-float-out .35s ease-in 1.45s forwards;
        }

        /* glow pulse while visible */
        .xp-toast::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: inherit;
          background: inherit;
          filter: blur(10px);
          opacity: .45;
          z-index: -1;
          animation: xp-glow-pulse .9s ease-in-out infinite;
        }

        .xp-toast.has-streak {
          background: linear-gradient(135deg, #FED7AA 0%, #FB923C 100%);
          border-color: #EA580C;
          color: #7C2D12;
          box-shadow:
            0 6px 28px -6px rgba(249, 115, 22, .6),
            0 2px 8px rgba(0, 0, 0, .08);
        }
        .xp-toast.has-streak::before {
          background: linear-gradient(135deg, #FED7AA 0%, #FB923C 100%);
        }

        /* shine sweep */
        .xp-toast::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(115deg, transparent 30%, rgba(255, 255, 255, .38) 48%, transparent 66%);
          transform: translateX(-110%);
          animation: xp-shine .9s ease-out .3s 1 forwards;
          pointer-events: none;
        }

        /* ---- emoji ---- */
        .xp-toast-emoji {
          font-size: clamp(20px, 3.2vh, 30px);
          line-height: 1;
          transform-origin: center;
          animation: xp-emoji-bounce .55s cubic-bezier(.34, 1.56, .64, 1) 0s backwards;
        }
        .has-streak .xp-toast-emoji {
          animation-name: xp-emoji-bounce-streak;
        }

        /* ---- XP number ---- */
        .xp-toast-main {
          display: inline-flex;
          align-items: baseline;
          gap: 2px;
          font-size: clamp(22px, 3.6vh, 34px);
          font-weight: 800;
          line-height: 1;
          animation: xp-num-bounce .5s cubic-bezier(.34, 1.56, .64, 1) .08s backwards;
        }
        .xp-toast-unit {
          font-size: .45em;
          font-weight: 700;
          opacity: .7;
          margin-left: 1px;
        }

        /* ---- streak badge ---- */
        .xp-toast-streak {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 14px 4px 10px;
          border-radius: 999px;
          background: linear-gradient(135deg, #FB923C, #EA580C);
          color: #fff;
          font-size: clamp(14px, 2.4vh, 18px);
          font-weight: 800;
          line-height: 1;
          box-shadow: 0 2px 12px rgba(249, 115, 22, .55);
          animation: xp-streak-pop .55s cubic-bezier(.34, 1.56, .64, 1) .16s backwards;
          position: relative;
        }
        .xp-toast-streak::before {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: inherit;
          background: inherit;
          filter: blur(6px);
          opacity: .5;
          z-index: -1;
          animation: xp-streak-glow .8s ease-in-out infinite;
        }
        .xp-toast-streak-icon {
          font-size: 1.15em;
          line-height: 1;
          animation: xp-rocket-thrust .4s ease-in-out .2s 4 alternate;
          transform-origin: center 55%;
        }

        /* ---- keyframes ---- */
        @keyframes xp-pop-in {
          0%   { opacity: 0; transform: translateY(12px) scale(.65); }
          55%  { opacity: 1; transform: translateY(-4px) scale(1.06); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes xp-emoji-bounce {
          0%   { transform: scale(0) rotate(-35deg); opacity: 0; }
          50%  { transform: scale(1.4) rotate(12deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes xp-emoji-bounce-streak {
          0%   { transform: scale(0) rotate(-35deg); opacity: 0; }
          50%  { transform: scale(1.5) rotate(15deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes xp-num-bounce {
          0%   { transform: translateY(18px) scale(.35); opacity: 0; }
          50%  { transform: translateY(-5px) scale(1.14); opacity: 1; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes xp-streak-pop {
          0%   { transform: scale(0) rotate(-160deg); opacity: 0; }
          55%  { transform: scale(1.28) rotate(10deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes xp-rocket-thrust {
          0%   { transform: scale(1) translateY(0); }
          50%  { transform: scale(1.18) translateY(-2px); }
          100% { transform: scale(0.92) translateY(1px); }
        }
        @keyframes xp-float-out {
          to { opacity: 0; transform: translateY(-22px) scale(.82); }
        }
        @keyframes xp-shine {
          to { transform: translateX(110%); }
        }
        @keyframes xp-glow-pulse {
          0%, 100% { opacity: .35; transform: scale(1); }
          50%      { opacity: .6; transform: scale(1.04); }
        }
        @keyframes xp-streak-glow {
          0%, 100% { opacity: .4; transform: scale(1); }
          50%      { opacity: .65; transform: scale(1.06); }
        }

        @media (prefers-color-scheme: dark) {
          .xp-toast {
            background: linear-gradient(135deg, #78350F, #92400E);
            border-color: #F59E0B;
            color: #FDE68A;
          }
          .xp-toast.has-streak {
            background: linear-gradient(135deg, #9A3412, #C2410C);
            border-color: #FB923C;
            color: #FED7AA;
          }
          .xp-toast.has-streak::before {
            background: linear-gradient(135deg, #9A3412, #C2410C);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .xp-toast,
          .xp-toast::before,
          .xp-toast::after,
          .xp-toast-emoji,
          .xp-toast-main,
          .xp-toast-streak,
          .xp-toast-streak-icon {
            animation: none !important;
          }
          .xp-toast::before { display: none; }
        }
      `}</style>

      <div
        className={`xp-toast${streakBonus > 0 ? ' has-streak' : ''}`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="xp-toast-emoji" aria-hidden="true">
          {streakBonus > 0 ? '🚀' : '✨'}
        </span>
        <span className="xp-toast-main">
          +{xp} <span className="xp-toast-unit">XP</span>
        </span>
        {streakBonus > 0 && (
          <span className="xp-toast-streak">
            <span className="xp-toast-streak-icon" aria-hidden="true">🚀</span>
            +{streakBonus}
          </span>
        )}
      </div>
    </>
  );
}
