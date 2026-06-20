import React, { useState } from 'react';
import BackButton from '../../BackButton';
import StatsBar from '../../_shared/StatsBar';

/**
 * Shared shell for every Matematik topic page.
 * Owns phase state (Belajar / Kuiz), segmented toggle, CTA, and back routing.
 *
 * Props:
 *   language    — 'bm' | 'en'
 *   onBack      — returns to module hub
 *   theme       — { accent, dark, cd } from the module
 *   emoji       — topic emoji (e.g. '💯')
 *   titleBM     — BM topic title
 *   titleEN     — EN topic title
 *   subtitleBM  — BM subtitle / description
 *   subtitleEN  — EN subtitle / description
 *   learn       — <MatematikExplore /> for the Belajar phase
 *   quiz        — the existing quiz component with embedded prop
 */
export default function MatematikTopicShell({
  language = 'bm',
  onBack,
  theme = { accent: '#F59E0B', dark: '#D97706', cd: '#B45309' },
  emoji = '📖',
  titleBM = '',
  titleEN = '',
  subtitleBM = '',
  subtitleEN = '',
  learn = null,
  quiz = null,
  showReadyCta = true,
  showToggle = true,
}) {
  const [phase, setPhase] = useState('belajar');

  const title = language === 'bm' ? titleBM : titleEN;
  const subtitle = language === 'bm' ? subtitleBM : subtitleEN;

  return (
    <div className="mt-topic-shell" style={{ '--mt-accent': theme.accent, '--mt-dark': theme.dark, '--mt-cd': theme.cd }}>
      <style>{`
        .mt-topic-shell {
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 0;
          background: #F7F8FA;
        }
        .mt-shell-top {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          flex-shrink: 0;
          background: transparent;
        }
        .mt-shell-top .mt-top-back {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: none;
          background: #ffffff;
          color: #10243A;
          cursor: pointer;
          flex-shrink: 0;
          padding: 0;
          box-shadow: none;
          transition: transform .1s ease;
        }
        .mt-shell-top .mt-top-back:hover { transform: translateY(-1px); }
        .mt-shell-top .mt-top-back:active { transform: translateY(1px); }
        .mt-shell-top .mt-top-stats {
          flex: 1 1 auto;
          min-width: 0;
          margin-left: auto;
          display: flex;
          justify-content: flex-end;
        }
        .mt-shell-top .mt-top-stats .sb-root { margin-bottom: 0; width: 100%; }
        @media (min-width: 768px) {
          .mt-shell-top .mt-top-stats { flex: 0 0 auto; }
          .mt-shell-top .mt-top-stats .sb-root {
            width: auto;
            min-width: 0;
            padding: 8px 18px;
            gap: 12px;
          }
          .mt-shell-top .mt-top-stats .sb-item { flex: 0 0 auto; }
        }

        .mt-shell-toggle {
          display: flex;
          align-items: center;
          gap: 0;
          margin: 0 16px 12px;
          padding: 4px;
          border-radius: 16px;
          background: #E8EAF0;
          flex-shrink: 0;
        }
        .mt-shell-toggle-btn {
          flex: 1;
          border: none;
          background: transparent;
          padding: 8px 16px;
          border-radius: 12px;
          font-family: 'Fredoka', system-ui, sans-serif;
          font-weight: 700;
          font-size: 15px;
          color: #5B6B7B;
          cursor: pointer;
          transition: all .2s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .mt-shell-toggle-btn.active {
          background: #ffffff;
          color: var(--mt-dark);
          box-shadow: 0 2px 8px rgba(0,0,0,.08);
        }
        .mt-shell-toggle-btn:not(.active):hover { color: var(--mt-dark); }

        .mt-shell-body {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          padding: 0 16px 80px;
        }
        /* Plain body (no Belajar/Kuiz toggle): the learn content owns the full
           area, including its own scroll + footer. */
        .mt-shell-body-plain {
          flex: 1;
          min-height: 0;
          display: flex;
          flex-direction: column;
        }

        .mt-shell-banner {
          text-align: center;
          padding: 20px 0 12px;
        }
        .mt-shell-banner-emoji {
          font-size: clamp(40px, 10vw, 64px);
          display: block;
          margin-bottom: 6px;
        }
        .mt-shell-banner h2 {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: clamp(22px, 5vw, 32px);
          color: var(--mt-dark);
          margin: 0 0 4px;
        }
        .mt-shell-banner p {
          font-family: 'Fredoka', sans-serif;
          font-weight: 500;
          font-size: 14px;
          color: #5B6B7B;
          margin: 0;
        }

        .mt-shell-cta {
          display: block;
          margin: 24px auto 0;
          padding: 12px 28px;
          border: none;
          border-radius: 999px;
          background: var(--mt-accent);
          color: #fff;
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: 18px;
          cursor: pointer;
          box-shadow: 0 4px 0 var(--mt-cd);
          transition: transform .1s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .mt-shell-cta:hover { transform: translateY(-2px); }
        .mt-shell-cta:active { transform: translateY(2px); }
        .mt-shell-cta:focus-visible {
          outline: 3px solid var(--mt-dark);
          outline-offset: 3px;
        }
      `}</style>

      <div className="mt-shell-top">
        <button type="button" className="mt-top-back" onClick={onBack}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <div className="mt-top-stats">
          <StatsBar subject="mt" />
        </div>
      </div>

      {showToggle && (
        <div className="mt-shell-toggle">
          <button
            className={`mt-shell-toggle-btn${phase === 'belajar' ? ' active' : ''}`}
            onClick={() => setPhase('belajar')}
            type="button"
          >
            {language === 'bm' ? 'Belajar' : 'Learn'}
          </button>
          <button
            className={`mt-shell-toggle-btn${phase === 'kuiz' ? ' active' : ''}`}
            onClick={() => setPhase('kuiz')}
            type="button"
          >
            {language === 'bm' ? 'Kuiz' : 'Quiz'}
          </button>
        </div>
      )}

      {!showToggle ? (
        <div className="mt-shell-body-plain">
          {learn}
        </div>
      ) : (
        <div className="mt-shell-body">
          {phase === 'belajar' ? (
            <>
              {(emoji || title || subtitle) && (
                <div className="mt-shell-banner">
                  {emoji && <span className="mt-shell-banner-emoji">{emoji}</span>}
                  {title && <h2>{title}</h2>}
                  {subtitle && <p>{subtitle}</p>}
                </div>
              )}

              {learn}

              {showReadyCta && (
                <button
                  className="mt-shell-cta"
                  onClick={() => setPhase('kuiz')}
                  type="button"
                >
                  {language === 'bm' ? 'Saya Dah Sedia → Kuiz' : "I'm Ready → Quiz"}
                </button>
              )}
            </>
          ) : (
            quiz
          )}
        </div>
      )}
    </div>
  );
}
