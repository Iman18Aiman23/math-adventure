import React, { useState } from 'react';
import BackButton from '../../BackButton';
import StatsBar from '../../_shared/StatsBar';
import useGamification from '../../../hooks/useGamification';
import MatematikSceneBackground from './MatematikSceneBackground';

function MbScoreBar() {
  const { xp, streak, loading } = useGamification('mt');
  const score = loading ? '—' : xp;
  const streakVal = loading ? '—' : streak;
  const pill = {
    display: 'flex', alignItems: 'center', gap: '6px',
    fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '17px',
    padding: '7px 13px', borderRadius: '13px',
    background: 'rgba(20,18,52,.6)',
  };
  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <div style={{ ...pill, color: '#FFD23F', border: '1px solid rgba(255,210,63,.4)', boxShadow: '0 0 14px rgba(255,210,63,.18)' }}>⭐ {score}</div>
      <div style={{ ...pill, color: '#2DE2E6', border: '1px solid rgba(45,226,230,.4)', boxShadow: '0 0 14px rgba(45,226,230,.18)' }}>⚡ {streakVal}</div>
    </div>
  );
}

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
  background = null,
  darkChrome = false,
}) {
  const [phase, setPhase] = useState('belajar');

  const title = language === 'bm' ? titleBM : titleEN;
  const subtitle = language === 'bm' ? subtitleBM : subtitleEN;

  return (
    <div
      className={`mt-topic-shell${darkChrome ? ' mt-dark-chrome' : ''}`}
      style={{ '--mt-accent': theme.accent, '--mt-dark': theme.dark, '--mt-cd': theme.cd, ...(background ? { background: '#05030F' } : null) }}
    >
      <style>{`
        .mt-topic-shell {
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 0;
          position: relative;
          background: #F7F8FA;
        }
        /* keep all content above the decorative landscape scene */
        .mt-topic-shell > .mt-shell-top,
        .mt-topic-shell > .mt-shell-toggle,
        .mt-topic-shell > .mt-shell-body,
        .mt-topic-shell > .mt-shell-body-plain,
        .mt-topic-shell > .mb-header { position: relative; z-index: 1; }
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
        /* Dark chrome: blend the back button into a dark / galaxy background */
        .mt-dark-chrome .mt-shell-top .mt-top-back {
          background: rgba(255,255,255,.12);
          color: #fff;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,.18);
          backdrop-filter: blur(8px);
        }
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

        /* ── Math Buddies header (darkChrome pages) ── */
        .mb-header {
          display: flex; align-items: center;
          padding: 20px 16px 10px; flex-shrink: 0;
          background: transparent;
          position: relative;
        }
        .mb-brand-center {
          position: absolute; left: 50%; transform: translateX(-50%);
          display: flex; align-items: center; gap: 8px; pointer-events: none;
          max-width: calc(100% - 88px);
          overflow: hidden;
        }
        .mb-back {
          display: flex; align-items: center; justify-content: center;
          width: 36px; height: 36px; border-radius: 50%; border: none; padding: 0;
          background: rgba(255,255,255,.1); color: #fff; cursor: pointer;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,.15); flex-shrink: 0;
          transition: transform .1s;
        }
        .mb-back:hover { transform: scale(1.08); }
        .mb-back:active { transform: scale(.95); }
        .mb-planet-icon {
          position: relative; width: 38px; height: 38px; flex-shrink: 0;
          border-radius: 50%;
          background: radial-gradient(circle at 34% 28%, #C9A9FF, #6E3CE0 80%);
          border: 1.5px solid rgba(255,255,255,.4);
          box-shadow: 0 0 18px rgba(124,77,238,.7), inset -4px -5px 8px rgba(0,0,0,.35);
        }
        .mb-planet-ring {
          position: absolute; top: 50%; left: 50%; width: 52px; height: 17px;
          transform: translate(-50%,-50%) rotate(-20deg);
          border: 2.5px solid rgba(45,226,230,.7); border-radius: 50%;
          box-shadow: 0 0 8px rgba(45,226,230,.6);
        }
        .mb-brand-text { min-width: 0; overflow: hidden; }
        .mb-brand-title {
          font-family: 'Space Grotesk', sans-serif; font-weight: 700;
          font-size: clamp(14px,4vw,20px); color: #fff; letter-spacing: .4px;
          text-shadow: 0 0 16px rgba(124,77,238,.6); line-height: 1;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .mb-brand-sub {
          font-family: 'Orbitron', sans-serif; font-weight: 600;
          font-size: 8px; letter-spacing: 2px; color: #2DE2E6; margin-top: 4px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        @media (max-width: 400px) {
          .mb-planet-icon { width: 30px; height: 30px; }
          .mb-planet-ring { width: 42px; height: 13px; }
          .mb-brand-sub { font-size: 7px; letter-spacing: 1px; }
          .mb-brand-title { font-size: 13px; }
        }
      `}</style>

      {darkChrome && <style>{`
        /* ── Dark mode overrides for galaxy background ── */
        .mt-dark-chrome .maf-head { color: rgba(255,255,255,.6) !important; }
        .mt-dark-chrome .maf-question { color: #fff !important; }
        .mt-dark-chrome .maf-footer { background: rgba(10,12,40,.55) !important; border-top-color: rgba(255,255,255,.08) !important; }
        .mt-dark-chrome .maf-top-strip { background: rgba(14,10,46,.75) !important; border-bottom-color: rgba(255,255,255,.1) !important; }
        .mt-dark-chrome .maf-tukar-btn { color: #2DE2E6 !important; }
        .mt-dark-chrome .maf-tukar-btn:hover { background: rgba(255,255,255,.08) !important; }
        .mt-dark-chrome .maf-footer-tally { color: rgba(255,255,255,.55) !important; }
        .mt-dark-chrome .maf-stats .maf-divider { color: rgba(255,255,255,.18) !important; }
        .mt-dark-chrome .maf-summary-row { background: rgba(255,255,255,.06) !important; border-color: rgba(255,255,255,.1) !important; color: rgba(255,255,255,.85) !important; }
        .mt-dark-chrome .maf-btn-secondary { background: rgba(255,255,255,.08) !important; border-color: rgba(255,255,255,.2) !important; color: #fff !important; }
        .mt-dark-chrome .maf-next:disabled { background: rgba(255,255,255,.06) !important; color: rgba(255,255,255,.25) !important; box-shadow: none !important; }
        .mt-dark-chrome .maf-feedback.ok { color: #4ADE80 !important; }
        .mt-dark-chrome .maf-feedback.no { color: #F87171 !important; }
        .mt-dark-chrome .maf-stat[style*="color: #1E293B"] span { color: #fff !important; }
        .mt-dark-chrome .maf-stat[style*="color: #94A3B8"] span { color: rgba(255,255,255,.45) !important; }

        /* Content card backgrounds → semi-transparent dark */
        .mt-dark-chrome [style*="background: #F8FAFC"] { background: rgba(255,255,255,.06) !important; }
        .mt-dark-chrome [style*="background: #EFF6FF"] { background: rgba(45,226,230,.12) !important; }
        .mt-dark-chrome [style*="background: #FEF3C7"] { background: rgba(245,158,11,.12) !important; }
        .mt-dark-chrome [style*="background: #DBEAFE"] { background: rgba(45,226,230,.08) !important; }
        .mt-dark-chrome [style*="background: #FFFBEB"] { background: rgba(245,158,11,.08) !important; }
        .mt-dark-chrome [style*="background: #FFF7ED"] { background: rgba(234,88,12,.08) !important; }
        .mt-dark-chrome [style*="background: #F0FDF4"] { background: rgba(22,163,74,.08) !important; }
        .mt-dark-chrome [style*="background: #F3F4F6"] { background: rgba(255,255,255,.04) !important; }
        .mt-dark-chrome [style*="background: #F1F5F9"] { background: rgba(255,255,255,.04) !important; }
        .mt-dark-chrome [style*="background: #fff"] { background: rgba(255,255,255,.06) !important; }
        .mt-dark-chrome [style*="background: #ffffff"] { background: rgba(255,255,255,.06) !important; }
        .mt-dark-chrome [style*="background: white"] { background: rgba(255,255,255,.06) !important; }
        .mt-dark-chrome [style*="linear-gradient(180deg,#EFF6FF"] { background: transparent !important; }

        /* Semi-transparent white bars → dark bars */
        .mt-dark-chrome [style*="rgba(255,255,255"] { background: rgba(10,12,40,.55) !important; }

        /* Content card text colors → light on dark */
        .mt-dark-chrome [style*="color: #334155"] { color: rgba(255,255,255,.85) !important; }
        .mt-dark-chrome [style*="color: #1E293B"] { color: #fff !important; }
        .mt-dark-chrome [style*="color: #1E3A8A"] { color: #2DE2E6 !important; }
        .mt-dark-chrome [style*="color: #475569"] { color: rgba(255,255,255,.7) !important; }
        .mt-dark-chrome [style*="color: #64748B"] { color: rgba(255,255,255,.55) !important; }
        .mt-dark-chrome [style*="color: #94A3B8"] { color: rgba(255,255,255,.45) !important; }
        .mt-dark-chrome [style*="color: #5B6B7B"] { color: rgba(255,255,255,.55) !important; }
        .mt-dark-chrome [style*="color: #9CA3AF"] { color: rgba(255,255,255,.35) !important; }

        /* Content card borders */
        .mt-dark-chrome [style*="solid #E2E8F0"],
        .mt-dark-chrome [style*="solid #e2e8f0"] { border-color: rgba(255,255,255,.12) !important; }
        .mt-dark-chrome [style*="solid #BFDBFE"],
        .mt-dark-chrome [style*="solid #bfdbfe"] { border-color: rgba(45,226,230,.2) !important; }
        .mt-dark-chrome [style*="solid #93C5FD"],
        .mt-dark-chrome [style*="solid #93c5fd"] { border-color: rgba(45,226,230,.25) !important; }

        /* SVG text elements on dark bg */
        .mt-dark-chrome svg text { fill: rgba(255,255,255,.9) !important; }
        .mt-dark-chrome svg text[fill="#16A34A"] { fill: #4ADE80 !important; }
        .mt-dark-chrome svg text[fill="#F59E0B"] { fill: #FBBF24 !important; }
        .mt-dark-chrome svg text[fill="#2563EB"] { fill: #2DE2E6 !important; }
        .mt-dark-chrome svg text[fill="#3B82F6"] { fill: #2DE2E6 !important; }

        /* SVG circle/line fills */
        .mt-dark-chrome svg circle[fill="#CBD5E1"] { fill: rgba(255,255,255,.2) !important; }
        .mt-dark-chrome svg line { stroke: rgba(255,255,255,.25) !important; }
        .mt-dark-chrome svg path[stroke="#3B82F6"] { stroke: #2DE2E6 !important; }
        .mt-dark-chrome svg line[stroke="#94A3B8"] { stroke: rgba(255,255,255,.3) !important; }

        /* M2 drill / exam — Latih Diri */
        .mt-dark-chrome .ld-drill-question { color: #fff !important; }
        .mt-dark-chrome .ld-drill-summary-row { background: rgba(255,255,255,.06) !important; border-color: rgba(255,255,255,.1) !important; color: rgba(255,255,255,.85) !important; }
        .mt-dark-chrome .ld-drill-btn-secondary { background: rgba(255,255,255,.08) !important; border-color: rgba(255,255,255,.2) !important; color: #fff !important; }

        /* M2 exam — Cabar Minda */
        .mt-dark-chrome .cm-exam-q { color: #fff !important; }
        .mt-dark-chrome .cm-exam-feedback.ok { color: #4ADE80 !important; }
        .mt-dark-chrome .cm-exam-feedback.no { color: #F87171 !important; }
        .mt-dark-chrome .cm-results-badge { background: rgba(10,12,40,.5) !important; border-color: rgba(255,255,255,.15) !important; }
        .mt-dark-chrome .cm-results-stat { background: rgba(10,12,40,.5) !important; }
        .mt-dark-chrome .cm-results-row { border-bottom-color: rgba(255,255,255,.08) !important; }

        /* M2 Level Picker (LatihanTambah / LatihanTolak) */
        .mt-dark-chrome .lt-picker-heading { color: #fff !important; }
        .mt-dark-chrome .lt-card { background: rgba(14,10,46,.82) !important; border-color: rgba(255,255,255,.18) !important; }
        .mt-dark-chrome .lt-card-label { color: #fff !important; }
        .mt-dark-chrome .lt-card-desc { color: rgba(255,255,255,.62) !important; }

        /* M2 Level strip (Aras: Mudah / Tukar Aras) */
        .mt-dark-chrome .lt-level-strip { background: rgba(14,10,46,.7) !important; border-bottom-color: rgba(255,255,255,.1) !important; color: rgba(255,255,255,.6) !important; }
        .mt-dark-chrome .lt-level-label { color: rgba(255,255,255,.6) !important; }
        .mt-dark-chrome .lt-level-label b { color: #fff !important; font-weight: 800; }
        .mt-dark-chrome .lt-tukar-btn { color: #2DE2E6 !important; }

        /* M2 Warnai answer options (plain mode — transparent bg, dark text) */
        .mt-dark-chrome .word-opt-plain { background: rgba(255,255,255,.08) !important; color: #fff !important; }

        /* Math Buddies: question prompt card */
        .mt-dark-chrome .maf-question:not(:empty) {
          background: rgba(28,25,64,.85) !important;
          border: 1.5px solid rgba(45,226,230,.4) !important;
          border-radius: 14px !important;
          padding: 10px 16px !important;
          box-shadow: 0 0 14px rgba(45,226,230,.18) !important;
          color: #EAEAFF !important;
        }
      `}</style>}

      {darkChrome && <style>{`@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600&family=Space+Grotesk:wght@700&display=swap');`}</style>}

      {background || <MatematikSceneBackground />}


      {darkChrome ? (
        <>
          <div className="mb-header">
            <button type="button" className="mb-back" onClick={onBack}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            <div className="mb-brand-center">
              <div className="mb-planet-icon">
                <div className="mb-planet-ring" />
              </div>
              <div className="mb-brand-text">
                <div className="mb-brand-title">Math Buddies</div>
                <div className="mb-brand-sub">IMAN&nbsp;SPACE&nbsp;LAB</div>
              </div>
            </div>
          </div>
        </>
      ) : (
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
      )}

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
