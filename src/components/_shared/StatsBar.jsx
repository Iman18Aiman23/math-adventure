import React, { useEffect, useRef } from 'react';
import useGamification from '../../hooks/useGamification';

export default function StatsBar({ subject = 'bm', variant }) {
  const { loading, xp, gems, level, streak, hearts, maxHearts } = useGamification(subject);
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

  if (variant === 'mb') {
    const val = loading ? '—' : null;
    return (
      <>
        <style>{`
          .sb-mb-wrap {
            display: flex;
            gap: 5px;
            align-items: center;
            flex-wrap: nowrap;
            width: 100%;
          }
          .sb-mb-pill {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4px;
            flex: 1 1 0;
            min-width: 0;
            font-family: 'Space Grotesk', 'Fredoka', sans-serif;
            font-weight: 700;
            font-size: 13px;
            padding: 6px 8px;
            border-radius: 12px;
            background: rgba(20,18,52,.6);
            white-space: nowrap;
            overflow: hidden;
          }
          .sb-mb-em { font-size: 13px; flex-shrink: 0; line-height: 1; }
          .sb-mb-val { overflow: hidden; text-overflow: ellipsis; line-height: 1; }
          @media (max-width: 400px) {
            .sb-mb-wrap { gap: 3px; }
            .sb-mb-pill { font-size: 11px; padding: 5px 5px; border-radius: 9px; gap: 3px; }
            .sb-mb-em { font-size: 11px; }
          }
        `}</style>
        <div className="sb-mb-wrap">
          <div className="sb-mb-pill"
            style={{ color: '#FF6B6B', border: '1px solid rgba(255,107,107,.4)', boxShadow: '0 0 10px rgba(255,107,107,.18)' }}
            aria-label={`Hearts: ${hearts} of ${maxHearts}`}>
            <span className="sb-mb-em" aria-hidden="true">❤️</span>
            <span className="sb-mb-val">{val ?? hearts}</span>
          </div>
          <div className="sb-mb-pill"
            style={{ color: '#2DE2E6', border: '1px solid rgba(45,226,230,.4)', boxShadow: '0 0 10px rgba(45,226,230,.18)' }}
            aria-label={`${gems} gems`}>
            <span className="sb-mb-em" aria-hidden="true">💎</span>
            <span className="sb-mb-val">{val ?? gems}</span>
          </div>
          <div className="sb-mb-pill"
            style={{ color: '#FFD23F', border: '1px solid rgba(255,210,63,.4)', boxShadow: '0 0 10px rgba(255,210,63,.18)' }}
            aria-label={`${xp} experience points`}>
            <span className="sb-mb-em" aria-hidden="true">⭐</span>
            <span className="sb-mb-val">{val ?? xp}</span>
          </div>
          <div className="sb-mb-pill"
            style={{ color: '#FF9600', border: '1px solid rgba(255,150,0,.4)', boxShadow: '0 0 10px rgba(255,150,0,.18)' }}
            aria-label={`Streak: ${streak}`}>
            <span className="sb-mb-em" aria-hidden="true">🔥</span>
            <span className="sb-mb-val">{val ?? streak}</span>
          </div>
          <div className="sb-mb-pill"
            style={{ color: '#58CC02', border: '1px solid rgba(88,204,2,.4)', boxShadow: '0 0 10px rgba(88,204,2,.18)' }}
            aria-label={`Level ${level}`}>
            <span className="sb-mb-em" style={{ fontSize: 'inherit' }}>Lv</span>
            <span className="sb-mb-val">{val ?? level}</span>
          </div>
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <div
        className="sb-root"
        role="region"
        aria-label="Loading stats"
        style={{ opacity: 0.5, pointerEvents: 'none' }}
      >
        <div className="sb-item"><span className="sb-value">—</span></div>
        <div className="sb-sep" aria-hidden="true" />
        <div className="sb-item"><span className="sb-value">—</span></div>
        <div className="sb-sep" aria-hidden="true" />
        <div className="sb-item"><span className="sb-value">—</span></div>
        <div className="sb-sep" aria-hidden="true" />
        <div className="sb-item"><span className="sb-value">—</span></div>
        <div className="sb-sep" aria-hidden="true" />
        <div className="sb-item"><span className="sb-value">—</span></div>
      </div>
    );
  }

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
          background: #ffffff;
          color: #fff;
          font-family: 'Fredoka', system-ui, sans-serif;
          user-select: none;
          -webkit-user-select: none;
          border-radius: 14px;
          border: 1px solid rgba(20,40,70,.06);
          box-shadow: 0 4px 12px rgba(20,40,70,.12);
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
        .sb-item {
          flex: 1 1 0; /* equal-width columns, each centers its own content */
          min-width: 0;
          display: flex;
          align-items: center;
          gap: 4px;
          white-space: nowrap;
          justify-content: center;
          /* solid candy chip per stat — bright reward color on the white bar,
             with a slight bottom ledge for depth (white numerals stay readable) */
          padding: 9px 9px;
          border-radius: 11px;
          background: var(--chip, #94a3b8);
          box-shadow: 0 2px 0 rgba(0,0,0,.12), 0 1px 0 rgba(255,255,255,.30) inset;
        }
        /* reward colors: ❤️ red · 💎 cyan · ⭐ purple · 🔥 orange · Lv green
           (children are item,sep,item,sep,… so stats are at odd nth-child) */
        .sb-item:nth-child(1) { --chip: #FF4B4B; }
        .sb-item:nth-child(3) { --chip: #1CC8EE; }
        .sb-item:nth-child(5) { --chip: #A560FF; }
        .sb-item:nth-child(7) { --chip: #FF9600; }
        .sb-item:nth-child(9) { --chip: #58CC02; }
        .sb-emoji {
          font-size: 16px;
          line-height: 1;
          /* lift the glyph off the colored chip: soft cast shadow + a thin
             white outline glow so the emoji reads crisply on any chip color */
          filter:
            drop-shadow(0 1px 1px rgba(0,0,0,.28))
            drop-shadow(0 0 1px rgba(255,255,255,.55));
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
        .sb-pulse .sb-value,
        .sb-pulse .sb-emoji {
          animation: sb-pop .35s cubic-bezier(.34,1.56,.64,1);
        }
        @media (prefers-reduced-motion: reduce) {
          .sb-pulse .sb-value,
          .sb-pulse .sb-emoji { animation: none; }
        }
      `}</style>

      <div
        className="sb-root"
        ref={pulseRef}
        role="region"
        aria-label={`${hearts} of ${maxHearts} hearts, ${gems} gems, ${xp} experience points, streak ${streak} days, level ${level}`}
      >
        <div className="sb-item" aria-label={`Hearts: ${hearts} of ${maxHearts}`}>
          <span className="sb-emoji" aria-hidden="true">❤️</span>
          <span className="sb-value" aria-live="polite">{hearts}</span>
        </div>

        <div className="sb-sep" aria-hidden="true" />

        <div className="sb-item" aria-label={`${gems} gems`}>
          {/* 💎 gem — the single spendable currency (earned +1 per correct) */}
          <span className="sb-emoji" aria-hidden="true">💎</span>
          <span className="sb-value" aria-live="polite">{gems}</span>
        </div>

        <div className="sb-sep" aria-hidden="true" />

        <div className="sb-item" aria-label={`${xp} experience points`}>
          <span className="sb-emoji" aria-hidden="true">⭐</span>
          <span className="sb-value" aria-live="polite">{xp}</span>
        </div>

        <div className="sb-sep" aria-hidden="true" />

        <div className="sb-item" aria-label={`Streak: ${streak} days`}>
          <span className="sb-emoji sb-streak-emoji" aria-hidden="true">🔥</span>
          <span className="sb-value">{streak}</span>
        </div>

        <div className="sb-sep" aria-hidden="true" />

        <div className="sb-item" aria-label={`Level ${level}`}>
          <span className="sb-value">{level}</span>
          <span className="sb-label">Lv</span>
        </div>
      </div>
    </>
  );
}
