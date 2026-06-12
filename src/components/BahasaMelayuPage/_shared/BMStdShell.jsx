import React from 'react';
import BMHeader from './BMHeader';

export default function BMStdShell({
  onBack,
  language = 'bm',
  title,
  current = 0,
  total = 0,
  score = null,
  accentColor = '#159E96',
  children,
  footer,
  hideProgress = false,
}) {
  return (
    <>
      <style>{`
        .bm-shell-root {
          --sp-1: clamp(4px, 0.8vh, 8px);
          --sp-2: clamp(8px, 1.6vh, 14px);
          --sp-3: clamp(12px, 2.4vh, 22px);
          height: 100dvh; overflow: hidden;
          background:
            radial-gradient(ellipse 75% 55% at 14% 0%, ${accentColor}21 0%, transparent 58%),
            radial-gradient(ellipse 65% 48% at 90% 100%, ${accentColor}1a 0%, transparent 62%),
            linear-gradient(180deg, #FDFEFF 0%, #F3F6FB 100%);
          font-family: 'Fredoka', system-ui, sans-serif;
          display: flex; flex-direction: column;
        }
        .bm-shell-body {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column; align-items: center;
          width: 100%; max-width: 620px;
          margin: 0 auto;
          padding: var(--sp-2) clamp(14px, 3.5vw, 28px) var(--sp-2);
        }
        .bm-shell-stats {
          flex-shrink: 0; width: 100%;
          display: flex; align-items: center; justify-content: space-between;
          gap: 8px;
          margin-bottom: var(--sp-2);
        }
        .bm-shell-pill {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(11px, 2vh, 13px);
          border-radius: 999px;
          padding: clamp(3px, 0.7vh, 5px) clamp(10px, 2.4vw, 14px);
          white-space: nowrap;
        }
        .bm-shell-pill.prog { background: #fff; color: ${accentColor}; border: 1.5px solid ${accentColor}44; box-shadow: 0 2px 6px -2px ${accentColor}33; }
        .bm-shell-pill.star { background: #FFF6D6; color: #B58800; border: 1.5px solid #FFE08A; }
        .bm-shell-bar-wrap {
          flex-shrink: 0; width: 100%;
          background: ${accentColor}22; border-radius: 999px;
          height: clamp(6px, 1.2vh, 9px); overflow: hidden;
          margin-bottom: var(--sp-3);
        }
        .bm-shell-bar-fill {
          background: linear-gradient(90deg, ${accentColor}, ${accentColor}99);
          height: 100%; border-radius: 999px;
          transition: width 0.3s;
        }
        .bm-shell-stage {
          flex: 1; min-height: 0; width: 100%;
          display: flex; flex-direction: column; align-items: center;
          justify-content: center;
          gap: var(--sp-2);
        }
        .bm-shell-footer {
          flex-shrink: 0;
          display: flex; gap: clamp(8px, 2vw, 12px);
          width: 100%; max-width: 620px;
          margin: 0 auto;
          padding: var(--sp-1) clamp(14px, 3.5vw, 28px) clamp(12px, 2.4vh, 20px);
        }

        /* ── Desktop / laptop scale-up (height-aware so it always fits) ── */
        @media (min-width: 900px) {
          .bm-shell-body, .bm-shell-footer { max-width: 820px; }
          .bm-shell-pill { font-size: min(14px, 2.2vh); padding: min(5px, 0.8vh) 18px; }
          .bm-shell-bar-wrap { height: min(10px, 1.4vh); }
          .bm-shell-stage { gap: min(14px, 1.8vh); }
        }
      `}</style>
      <div className="bm-shell-root">
        <BMHeader onBack={onBack} language={language} title={title} />
        <div className="bm-shell-body">
          {!hideProgress && (
            <>
              <div className="bm-shell-stats">
                <span className="bm-shell-pill prog">{current + 1} / {total}</span>
                {score !== null && <span className="bm-shell-pill star">⭐ {score}</span>}
              </div>
              <div className="bm-shell-bar-wrap">
                <div className="bm-shell-bar-fill" style={{ width: `${(current / total) * 100}%` }} />
              </div>
            </>
          )}
          <div className="bm-shell-stage">
            {children}
          </div>
        </div>
        {footer && <div className="bm-shell-footer">{footer}</div>}
      </div>
    </>
  );
}
