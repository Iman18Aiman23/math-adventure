import React, { useEffect, useRef, useState } from 'react';
import useGamification from '../../hooks/useGamification';

export default function StatsBar({ subject = 'bm', variant }) {
  const { loading, xp, gems, level, streak, hearts, maxHearts } = useGamification(subject);
  const prevXpRef = useRef(xp);
  const pulseRef = useRef(null);

  const [isBundled, setIsBundled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);

  useEffect(() => {
    if (prevXpRef.current !== xp && pulseRef.current) {
      pulseRef.current.classList.remove('sb-pulse');
      void pulseRef.current.offsetWidth;
      pulseRef.current.classList.add('sb-pulse');
    }
    prevXpRef.current = xp;
  }, [xp]);

  useEffect(() => {
    const handleResize = () => {
      // If window is small (e.g. tablet or mobile < 840px), there might not be enough space
      // safely display all 5 items side-by-side with large numbers, so we bundle it.
      if (window.innerWidth <= 840) {
        setIsBundled(true);
      } else {
        setIsBundled(false);
        setIsOpen(false);
      }
    };
    handleResize(); // Init
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Click outside to close popover
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

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

  const val = loading ? '—' : null;

  // The actual 5 stats items (shared between expanded popover and inline bar)
  const renderStats = (isPopover = false) => {
    if (variant === 'mb') {
      return (
        <div className={isPopover ? "sb-mb-wrap popover-mode" : "sb-mb-wrap"}>
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
      );
    }

    return (
      <div
        className={isPopover ? "sb-root popover-mode" : "sb-root"}
        ref={isPopover ? null : pulseRef}
        role="region"
        aria-label={`${hearts} of ${maxHearts} hearts, ${gems} gems, ${xp} experience points, streak ${streak} days, level ${level}`}
      >
        <div className="sb-item" aria-label={`Hearts: ${hearts} of ${maxHearts}`}>
          <span className="sb-emoji" aria-hidden="true">❤️</span>
          <span className="sb-value" aria-live="polite">{hearts}</span>
        </div>
        <div className="sb-sep" aria-hidden="true" />
        <div className="sb-item" aria-label={`${gems} gems`}>
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
    );
  };

  return (
    <>
      <style>{`
        .sb-container {
          position: relative;
          display: inline-flex;
          align-items: center;
        }
        .sb-bundle-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: ${variant === 'mb' ? 'rgba(20,18,52,0.8)' : '#ffffff'};
          color: ${variant === 'mb' ? '#fff' : '#10243A'};
          border: ${variant === 'mb' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(20,40,70,.06)'};
          padding: 8px 14px;
          border-radius: 12px;
          font-family: 'Fredoka', system-ui, sans-serif;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          box-shadow: ${variant === 'mb' ? '0 0 10px rgba(0,0,0,0.2)' : '0 4px 12px rgba(20,40,70,.12)'};
          transition: transform 0.1s ease, box-shadow 0.1s ease;
        }
        .sb-bundle-btn:active { transform: translateY(1px); }
        .sb-bundle-btn:hover { box-shadow: ${variant === 'mb' ? '0 0 14px rgba(255,255,255,0.1)' : '0 6px 16px rgba(20,40,70,.15)'}; }
        
        .sb-popover {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          z-index: 100;
          background: ${variant === 'mb' ? '#0F0D28' : '#ffffff'};
          padding: 12px;
          border-radius: 16px;
          box-shadow: 0 10px 24px rgba(0,0,0,0.4);
          border: ${variant === 'mb' ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(20,40,70,.1)'};
          backdrop-filter: blur(10px);
          animation: sb-fade-in 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform-origin: top right;
        }
        @keyframes sb-fade-in {
          0% { opacity: 0; transform: scale(0.95) translateY(-5px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* Adjustments for popover mode */
        .sb-mb-wrap.popover-mode {
          flex-direction: column;
          align-items: stretch;
          gap: 8px;
          width: 120px;
        }
        .sb-mb-wrap.popover-mode .sb-mb-pill {
          flex: none;
          width: 100%;
          height: 34px;
          justify-content: flex-start;
          padding: 0 14px;
          box-sizing: border-box;
        }
        .sb-mb-wrap.popover-mode .sb-mb-em {
          width: 24px;
          text-align: left;
        }

        .sb-root.popover-mode {
          flex-direction: column;
          gap: 8px;
          padding: 0;
          border: none;
          box-shadow: none;
          background: transparent;
          min-height: auto;
          margin-bottom: 0;
          width: 120px;
        }
        .sb-root.popover-mode .sb-item {
          flex: none;
          width: 100%;
          height: 34px;
          justify-content: flex-start;
          padding: 0 14px;
          box-sizing: border-box;
        }
        .sb-root.popover-mode .sb-emoji,
        .sb-root.popover-mode .sb-label {
          width: 24px;
          text-align: left;
        }
        .sb-root.popover-mode .sb-sep {
          display: none;
        }

        /* Existing styles */
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
          flex: none; /* NEVER squish */
          font-family: 'Space Grotesk', 'Fredoka', sans-serif;
          font-weight: 700;
          font-size: 13px;
          padding: 6px 10px;
          border-radius: 12px;
          background: rgba(20,18,52,.6);
          white-space: nowrap;
        }
        .sb-mb-em { font-size: 13px; flex-shrink: 0; line-height: 1; }
        .sb-mb-val { line-height: 1; }
        @media (max-width: 400px) {
          .sb-mb-wrap:not(.popover-mode) { gap: 3px; }
          .sb-mb-pill { font-size: 11px; padding: 5px 5px; border-radius: 9px; gap: 3px; }
          .sb-mb-em { font-size: 11px; }
        }
        @media (min-width: 768px) {
          .sb-mb-wrap:not(.popover-mode) { width: auto; gap: 8px; }
          .sb-mb-pill { flex: 0 0 auto; padding: 6px 12px; font-size: 14px; }
          .sb-mb-em { font-size: 14px; }
        }

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
          .sb-root:not(.popover-mode) {
            padding: 8px 6px;
            gap: 2px;
            border-radius: 10px;
            min-height: 44px;
          }
        }
        .sb-item {
          flex: 1 1 0; 
          min-width: 0;
          display: flex;
          align-items: center;
          gap: 4px;
          white-space: nowrap;
          justify-content: center;
          padding: 9px 9px;
          border-radius: 11px;
          background: var(--chip, #94a3b8);
          box-shadow: 0 2px 0 rgba(0,0,0,.12), 0 1px 0 rgba(255,255,255,.30) inset;
        }
        .sb-item:nth-child(1) { --chip: #FF4B4B; }
        .sb-item:nth-child(3) { --chip: #1CC8EE; }
        .sb-item:nth-child(5) { --chip: #A560FF; }
        .sb-item:nth-child(7) { --chip: #FF9600; }
        .sb-item:nth-child(9) { --chip: #58CC02; }
        .sb-emoji {
          font-size: 16px;
          line-height: 1;
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
          line-height: 1; 
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
          .sb-root:not(.popover-mode) {
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
      <div className="sb-container">
        {isBundled ? (
          <div ref={popoverRef}>
            <button
              className="sb-bundle-btn"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
            >
              <span className="sb-emoji">⭐</span>
              <span>Stats</span>
            </button>
            {isOpen && (
              <div className="sb-popover">
                {renderStats(true)}
              </div>
            )}
          </div>
        ) : (
          renderStats(false)
        )}
      </div>
    </>
  );
}

