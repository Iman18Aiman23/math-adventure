import React from 'react';
import { FONT_IMPORT } from '../_shared/arabic';

export default function Tahun1ModuleHubLayout({
  moduleNum,
  moduleName,
  moduleNameEn,
  theme,
  topics,
  onSelectTopic,
  language = 'bm',
  footer,
  // 'default' = centered title + subtitle; 'banner' = Bahasa Melayu-style
  // coloured unit banner (kicker + module name + badge).
  headerVariant = 'default',
  // when true, the topic stage has no background/shadow — the visual (e.g. a
  // robot head) floats directly on the card.
  bareStage = false,
}) {
  return (
    <>
      <style>{`
        ${FONT_IMPORT}
        .pi-mhub-page {
          padding: 56px 24px 80px;
          width: 100%;
          max-width: 100%;
          background: ${theme.pageGradient};
          min-height: 100dvh;
          font-family: 'Fredoka', system-ui, sans-serif;
          color: #10243A;
          position: relative;
        }
        .pi-mhub-page h1 {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: clamp(22px, 5vw, 38px);
          color: ${theme.dark};
          text-align: center;
          margin: 0 0 6px;
        }
        .pi-mhub-subtitle {
          text-align: center;
          color: ${theme.dark};
          opacity: 0.8;
          font-weight: 600;
          font-size: clamp(11px, 2.5vw, 13px);
          letter-spacing: .14em;
          text-transform: uppercase;
          margin: 0 0 48px;
        }
        /* Bahasa Melayu-style coloured unit banner (--c face / --cd border).
           Width mirrors BM's .journey-inner (460px), centered. */
        .pi-mhub-banner {
          max-width: 460px;
          margin: 6px auto 34px;
          display: flex;
          align-items: center;
          gap: 14px;
          color: #fff;
          background: linear-gradient(135deg, color-mix(in srgb, var(--c) 86%, white), var(--c));
          border: 5px solid var(--cd);
          border-radius: 28px;
          padding: 18px 22px;
          box-shadow: 0 15px 25px rgba(0,0,0,.1);
        }
        .pi-mhub-banner-text { flex: 1; min-width: 0; }
        .pi-mhub-banner-kicker {
          font-family: 'Fredoka', system-ui, sans-serif;
          font-weight: 700;
          font-size: 11px;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: #fff;
          text-shadow: 2px 3px 0 var(--cd);
          margin-bottom: 4px;
        }
        .pi-mhub-banner-name {
          font-family: 'Fredoka', system-ui, sans-serif;
          font-weight: 700;
          font-size: 21px;
          line-height: 1.1;
          letter-spacing: -.01em;
          text-shadow: 2px 3px 0 var(--cd);
          text-wrap: balance;
        }
        .pi-mhub-banner-badge {
          width: 46px;
          height: 46px;
          flex: 0 0 auto;
          border-radius: 14px;
          background: rgba(255,255,255,.22);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Fredoka', system-ui, sans-serif;
          font-weight: 700;
          font-size: 22px;
          color: #fff;
        }
        .pi-mhub-grid {
          max-width: 1080px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
          gap: 28px;
        }
        .pi-mhub-card {
          background: linear-gradient(180deg, #fff, #FFF8EC);
          border-radius: 28px;
          padding: 24px 20px 26px;
          border: 1px solid ${theme.accent}2E;
          box-shadow: 0 12px 32px -12px ${theme.dark}38, 0 2px 6px ${theme.accent}1A;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          transition: transform .32s cubic-bezier(.34,1.56,.64,1);
          cursor: pointer;
          will-change: transform;
        }
        .pi-mhub-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 22px 48px -14px ${theme.dark}52;
        }
        .pi-mhub-card:focus-visible {
          outline: 3px solid ${theme.accent};
          outline-offset: 3px;
        }
        .pi-mhub-stage {
          width: min(170px, 65vw);
          height: min(170px, 65vw);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          background: ${theme.stageGradient};
          box-shadow: inset 0 -8px 24px ${theme.dark}33, inset 0 2px 0 rgba(255,255,255,.5);
        }
        /* Bare stage — no disc behind the visual (robot head floats on the card). */
        .pi-mhub-stage--bare {
          background: none;
          box-shadow: none;
          border-radius: 0;
        }
        .pi-mhub-stage svg {
          width: 90%;
          height: 90%;
          overflow: visible;
          animation: pi-mhub-float 3.4s ease-in-out infinite;
        }
        /* Title chip — holds the topic title in the coloured box. */
        .pi-mhub-pill {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: 18px;
          letter-spacing: .01em;
          color: #fff;
          padding: 8px 16px;
          border-radius: 16px;
          background: ${theme.accent};
          box-shadow: 0 3px 0 ${theme.cd || theme.dark};
          text-align: center;
          line-height: 1.25;
          max-width: 92%;
        }
        .pi-mhub-card-title {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: 18px;
          color: ${theme.dark};
          margin: 0;
          text-align: center;
        }
        .pi-mhub-card-desc {
          font-family: 'Fredoka', sans-serif;
          font-weight: 500;
          font-size: 12.5px;
          color: ${theme.dark};
          opacity: 0.7;
          margin: 0;
          text-align: center;
          line-height: 1.5;
          padding: 0 4px;
        }
        .pi-mhub-card-disabled {
          opacity: 0.6;
          cursor: default;
          pointer-events: none;
          filter: grayscale(0.6);
        }
        .pi-mhub-card-disabled:hover {
          transform: none;
          box-shadow: 0 12px 32px -12px ${theme.dark}38, 0 2px 6px ${theme.accent}1A;
        }

        /* ── "v2" topic card (Matematik) — cleaner white game-style surface
           with a TOPIK pill, readable copy, and a "Mula ▸" button cue ── */
        .pi-mhub-card--v2 {
          background: #ffffff;
          border: 2px solid ${theme.accent}33;
          border-radius: 24px;
          padding: 20px 18px 22px;
          gap: 11px;
          box-shadow: 0 10px 26px -14px ${theme.dark}40, 0 2px 4px ${theme.accent}14;
        }
        .pi-mhub-card--v2:hover {
          transform: translateY(-6px) scale(1.015);
          border-color: ${theme.accent}66;
          box-shadow: 0 20px 40px -16px ${theme.dark}5C;
        }
        .pi-mhub-card--v2:active { transform: translateY(2px) scale(.99); }
        .pi-mhub-card--v2 .pi-mhub-stage {
          width: min(150px, 58vw);
          height: min(150px, 58vw);
        }
        .pi-mhub-card--v2 .pi-mhub-pill {
          font-size: 18px;
        }
        .pi-mhub-card--v2 .pi-mhub-card-title {
          font-size: 17px;
          line-height: 1.25;
          color: ${theme.dark};
          text-wrap: balance;
        }
        .pi-mhub-card--v2 .pi-mhub-card-desc {
          color: #5B6B7B;
          opacity: 1;
          font-size: 12.5px;
          line-height: 1.55;
          max-width: 26ch;
          margin: 0 auto;
          text-wrap: pretty;
        }
        .pi-mhub-card--v2 .pi-mhub-cta {
          margin-top: 4px;
          font-family: 'Fredoka', system-ui, sans-serif;
          font-weight: 700;
          font-size: 12px;
          letter-spacing: .02em;
          color: #fff;
          background: ${theme.accent};
          padding: 6px 18px;
          border-radius: 999px;
          box-shadow: 0 3px 0 ${theme.cd || theme.dark};
          transition: transform .12s ease;
        }
        .pi-mhub-card--v2:hover .pi-mhub-cta { transform: translateY(-1px); }
        @keyframes pi-mhub-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .pi-mhub-stage svg { animation: none; }
        }
        .floatA{animation:floatA 3.6s ease-in-out infinite;transform-origin:center}
        .floatA.d1{animation-delay:.4s}.floatA.d2{animation-delay:.8s}.floatA.d3{animation-delay:1.2s}
        @keyframes floatA{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        .pulse{animation:pulse 2.2s ease-in-out infinite}
        @keyframes pulse{0%,100%{opacity:.5}50%{opacity:1}}
        .bob{animation:bob 2.6s ease-in-out infinite;transform-origin:center}
        @keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        .spin{animation:spin 18s linear infinite;transform-origin:50px 32px}
        @keyframes spin{to{transform:rotate(360deg)}}
        .drip{animation:drip 2.2s ease-in infinite}
        @keyframes drip{0%{transform:translateY(-2px);opacity:0}30%{opacity:1}100%{transform:translateY(12px);opacity:0}}
        .bubble{transform-origin:center;animation:bubble 3s ease-in-out infinite}
        .bubble.b2{animation-delay:.6s}.bubble.b3{animation-delay:1.2s}.bubble.b4{animation-delay:1.8s}.bubble.b5{animation-delay:2.4s}
        @keyframes bubble{0%{transform:translateY(4px) scale(.6);opacity:0}25%{opacity:.9}70%{opacity:.7}100%{transform:translateY(-16px) scale(1.05);opacity:0}}
        .zzz{animation:zzz 3s ease-in-out infinite}
        @keyframes zzz{0%{transform:translateY(2px);opacity:0}30%{opacity:1}100%{transform:translate(4px,-12px);opacity:0}}
        .wave{animation:wave 1.8s ease-in-out infinite}
        .wave.w2{animation-delay:.3s}.wave.w3{animation-delay:.6s}
        @keyframes wave{0%,100%{opacity:.35;transform:scale(.9)}50%{opacity:1;transform:scale(1.05)}}
      `}</style>

      <div className="pi-mhub-page">
        {headerVariant === 'banner' ? (
          <div className="pi-mhub-banner" style={{ '--c': theme.accent, '--cd': theme.cd || theme.dark }}>
            <div className="pi-mhub-banner-text">
              <div className="pi-mhub-banner-kicker">
                {language === 'bm'
                  ? `Modul ${moduleNum} · Unit Pembelajaran`
                  : `Module ${moduleNum} · Learning Unit`}
              </div>
              <div className="pi-mhub-banner-name">
                {language === 'bm' ? moduleName : moduleNameEn}
              </div>
            </div>
            <div className="pi-mhub-banner-badge">{moduleNum}</div>
          </div>
        ) : (
          <>
            <h1>
              {language === 'bm'
                ? `MODUL ${moduleNum} : ${moduleName}`
                : `MODULE ${moduleNum} : ${moduleNameEn}`}
            </h1>
            <p className="pi-mhub-subtitle">
              {language === 'bm'
                ? 'PILIH TOPIK UNTUK MEMULAKAN PEMBELAJARAN'
                : 'SELECT A TOPIC TO START LEARNING'}
            </p>
          </>
        )}

        <div className="pi-mhub-grid">
          {topics.map((t) => (
            <div
              key={t.id}
              className={`pi-mhub-card${headerVariant === 'banner' ? ' pi-mhub-card--v2' : ''}${t.disabled ? ' pi-mhub-card-disabled' : ''}`}
              role="button"
              tabIndex={t.disabled ? -1 : 0}
              aria-disabled={t.disabled || undefined}
              onClick={() => { if (!t.disabled) onSelectTopic?.(t.id); }}
              onKeyDown={(e) => {
                if (!t.disabled && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  onSelectTopic?.(t.id);
                }
              }}
            >
              <div className={`pi-mhub-stage${bareStage ? ' pi-mhub-stage--bare' : ''}`}>
                {t.visual}
              </div>
              {headerVariant === 'banner' ? (
                <span className="pi-mhub-pill">{t.title}</span>
              ) : (
                <h3 className="pi-mhub-card-title">{t.title}</h3>
              )}
              <p className="pi-mhub-card-desc">{t.desc}</p>
              {headerVariant === 'banner' && !t.disabled && (
                <span className="pi-mhub-cta">{language === 'bm' ? 'Mula ▸' : 'Start ▸'}</span>
              )}
            </div>
          ))}
        </div>

        {footer && (
          <div style={{ marginTop: '3rem' }}>
            {footer}
          </div>
        )}
      </div>
    </>
  );
}
