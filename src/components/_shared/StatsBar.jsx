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
      // If window is tablet/mobile sized, there might not be enough space
      // safely display all 5 items side-by-side with large numbers, so we bundle it.
      if (window.innerWidth <= 1024) {
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

  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
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
          <div className="sb-mb-pill sb-mb-heart" data-label="Hearts"
            style={{ color: '#FF6B6B', border: '1px solid rgba(255,107,107,.4)', boxShadow: '0 0 10px rgba(255,107,107,.18)' }}
            aria-label={`Hearts: ${hearts} of ${maxHearts}`}>
            <span className="sb-mb-em" aria-hidden="true">❤️</span>
            <span className="sb-mb-val">{val ?? hearts}</span>
          </div>
          <div className="sb-mb-pill sb-mb-gems" data-label="Gems"
            style={{ color: '#2DE2E6', border: '1px solid rgba(45,226,230,.4)', boxShadow: '0 0 10px rgba(45,226,230,.18)' }}
            aria-label={`${gems} gems`}>
            <span className="sb-mb-em" aria-hidden="true">💎</span>
            <span className="sb-mb-val">{val ?? gems}</span>
          </div>
          <div className="sb-mb-pill sb-mb-xp" data-label="XP"
            style={{ color: '#FFD23F', border: '1px solid rgba(255,210,63,.4)', boxShadow: '0 0 10px rgba(255,210,63,.18)' }}
            aria-label={`${xp} experience points`}>
            <span className="sb-mb-em" aria-hidden="true">⭐</span>
            <span className="sb-mb-val">{val ?? xp}</span>
          </div>
          <div className="sb-mb-pill sb-mb-streak" data-label="Streak"
            style={{ color: '#FF9600', border: '1px solid rgba(255,150,0,.4)', boxShadow: '0 0 10px rgba(255,150,0,.18)' }}
            aria-label={`Streak: ${streak}`}>
            <span className="sb-mb-em" aria-hidden="true">🔥</span>
            <span className="sb-mb-val">{val ?? streak}</span>
          </div>
          <div className="sb-mb-pill sb-mb-level" data-label="Level"
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
          isolation: isolate;
          z-index: 9999;
        }
        .sb-bundle-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          min-height: ${variant === 'mb' ? '42px' : '38px'};
          background: ${variant === 'mb' ? 'linear-gradient(180deg, rgba(255,255,255,.96), rgba(241,248,252,.88)), linear-gradient(135deg, rgba(20,184,166,.12), rgba(99,102,241,.08))' : '#ffffff'};
          color: ${variant === 'mb' ? '#1D3A43' : '#10243A'};
          border: ${variant === 'mb' ? '1px solid rgba(255,255,255,.88)' : '1px solid rgba(20,40,70,.06)'};
          padding: ${variant === 'mb' ? '8px 12px 8px 10px' : '8px 14px'};
          border-radius: ${variant === 'mb' ? '18px' : '12px'};
          font-family: 'Fredoka', system-ui, sans-serif;
          font-weight: 800;
          font-size: 14px;
          cursor: pointer;
          letter-spacing: 0;
          box-shadow: none;
          transition: transform .16s ease, border-color .18s ease, background .18s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .sb-bundle-btn .sb-emoji {
          font-size: 16px;
          filter: none;
        }
        .sb-bundle-text {
          line-height: 1;
          text-shadow: none;
        }
        .sb-bundle-btn:active { transform: translateY(1px) scale(.99); }
        .sb-bundle-btn:hover {
          border-color: ${variant === 'mb' ? 'rgba(20,184,166,.24)' : 'rgba(20,40,70,.10)'};
          box-shadow: none;
        }
        .sb-bundle-btn:focus-visible {
          outline: 3px solid ${variant === 'mb' ? '#14B8A6' : '#2563EB'};
          outline-offset: 3px;
        }
        
        .sb-popover {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          z-index: 9999;
          min-width: ${variant === 'mb' ? '168px' : '144px'};
          background: ${variant === 'mb' ? 'linear-gradient(180deg, rgba(255,255,255,.98), rgba(243,249,252,.96))' : '#ffffff'};
          padding: ${variant === 'mb' ? '10px' : '12px'};
          border-radius: ${variant === 'mb' ? '20px' : '16px'};
          box-shadow: none;
          border: ${variant === 'mb' ? '1px solid #E6E6E6' : '1px solid rgba(20,40,70,.1)'};
          overflow: hidden;
          animation: sb-fade-in .18s cubic-bezier(.34,1.56,.64,1);
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
          gap: 7px;
          width: 100%;
          position: relative;
          z-index: 1;
        }
        .sb-mb-wrap.popover-mode .sb-mb-pill {
          flex: none;
          width: 100%;
          height: 40px;
          justify-content: flex-start;
          padding: 0 12px;
          box-sizing: border-box;
        }
        .sb-mb-wrap.popover-mode .sb-mb-em {
          width: 22px;
          height: 22px;
          display: grid;
          place-items: center;
          text-align: center;
        }
        .sb-mb-wrap.popover-mode .sb-mb-pill::after {
          display: block;
        }
        .sb-mb-wrap.popover-mode .sb-mb-val {
          margin-left: auto;
          font-size: 14px;
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
          gap: 6px;
          align-items: center;
          flex-wrap: nowrap;
          width: 100%;
        }
        .sb-mb-pill {
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          flex: none; /* NEVER squish */
          font-family: 'Fredoka', system-ui, sans-serif;
          font-weight: 800;
          font-size: 13px;
          padding: 7px 10px;
          border-radius: 14px;
          background:
            linear-gradient(180deg, rgba(255,255,255,.98), rgba(243,248,252,.92)),
            linear-gradient(135deg, color-mix(in srgb, currentColor 10%, transparent), rgba(255,255,255,.16)) !important;
          border: 1px solid color-mix(in srgb, currentColor 22%, rgba(255,255,255,.82)) !important;
          box-shadow: none !important;
          white-space: nowrap;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: transform .16s ease, background .18s ease, border-color .18s ease;
        }
        .sb-mb-pill::before {
          content: "";
          position: absolute;
          inset: 0 auto 0 0;
          width: 3px;
          background: currentColor;
          opacity: .26;
          box-shadow: none;
        }
        .sb-mb-pill::after {
          content: attr(data-label);
          display: none;
          order: 2;
          color: rgba(62, 92, 101, .70);
          font-size: 10px;
          font-weight: 700;
          line-height: 1;
        }
        .sb-mb-pill:hover {
          transform: translateY(-1px);
          background:
            linear-gradient(180deg, #FFFFFF, rgba(243,248,252,.96)),
            linear-gradient(135deg, color-mix(in srgb, currentColor 13%, transparent), rgba(255,255,255,.20)) !important;
        }
        .sb-mb-em {
          order: 1;
          font-size: 13px;
          flex-shrink: 0;
          line-height: 1;
          filter: none;
        }
        .sb-mb-val {
          order: 3;
          line-height: 1;
          color: currentColor;
          font-variant-numeric: tabular-nums;
          text-shadow: none;
        }
        @media (max-width: 400px) {
          .sb-mb-wrap:not(.popover-mode) { gap: 3px; }
          .sb-mb-pill { font-size: 11px; padding: 6px 6px; border-radius: 11px; gap: 4px; }
          .sb-mb-em { font-size: 11px; }
        }
        @media (min-width: 768px) {
          .sb-mb-wrap:not(.popover-mode) { width: auto; gap: 8px; }
          .sb-mb-pill { flex: 0 0 auto; padding: 7px 12px; font-size: 14px; }
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
          box-shadow: none;
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
          box-shadow: none;
        }
        .sb-item:nth-child(1) { --chip: #FF4B4B; }
        .sb-item:nth-child(3) { --chip: #1CC8EE; }
        .sb-item:nth-child(5) { --chip: #A560FF; }
        .sb-item:nth-child(7) { --chip: #FF9600; }
        .sb-item:nth-child(9) { --chip: #58CC02; }
        .sb-emoji {
          font-size: 16px;
          line-height: 1;
          filter: none;
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
          .sb-bundle-btn,
          .sb-mb-pill {
            transition: none;
          }
          .sb-popover {
            animation: none;
          }
          .sb-mb-pill:hover {
            transform: none;
          }
          .sb-pulse .sb-value,
          .sb-pulse .sb-emoji { animation: none; }
        }
      `}</style>
      <div className="sb-container">
        {isBundled ? (
          <div ref={popoverRef}>
            <button
              type="button"
              className={`sb-bundle-btn${variant === 'mb' ? ' sb-bundle-btn--mb' : ''}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close stats' : 'Open stats'}
            >
              <span className="sb-emoji">⭐</span>
              <span className="sb-bundle-text">Stats</span>
            </button>
            {isOpen && (
              <div className={`sb-popover${variant === 'mb' ? ' sb-popover--mb' : ''}`}>
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
