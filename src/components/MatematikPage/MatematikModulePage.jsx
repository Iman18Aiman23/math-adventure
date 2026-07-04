import React, { useEffect, useRef } from 'react';
import MatematikModuleNavBar, { getMtModuleTheme } from './MatematikModuleNavBar';
import GalaxyCanvas from './_shared/GalaxyCanvas';

export default function MatematikModulePage({ year, activeModule, onModuleChange, onBack, onSelectTopic, children, language }) {
  const contentRef = useRef(null);
  const theme = getMtModuleTheme(activeModule, year);

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [activeModule]);

  return (
    <div
      className={`mt-module-page mt-module-page--mission mt-module-page--y${year}`}
      style={{ '--mt-accent': theme.c, '--mt-accent-d': theme.cd }}
    >
      <GalaxyCanvas />
      <div className="mt-module-atmosphere" aria-hidden="true" />
      <MatematikModuleNavBar
        year={year}
        activeModule={activeModule}
        onModuleChange={onModuleChange}
        onBack={onBack}
        language={language}
      />
      <main className="mt-module-content" ref={contentRef}>
        {React.isValidElement(children)
          ? React.cloneElement(children, { language, onSelectTopic })
          : children}
      </main>
      <style>{`
        .mt-module-page {
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 0;
          background:
            radial-gradient(circle at 18% 12%, color-mix(in srgb, var(--mt-accent) 24%, transparent) 0, transparent 32%),
            radial-gradient(circle at 84% 18%, rgba(255, 191, 71, .14) 0, transparent 30%),
            radial-gradient(circle at 56% 88%, color-mix(in srgb, var(--mt-accent-d) 34%, transparent) 0, transparent 44%),
            linear-gradient(180deg, #06142E 0%, #071B3E 48%, #030714 100%);
          color: #EAF6FF;
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }
        .mt-module-page::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          opacity: .46;
          background-image:
            linear-gradient(color-mix(in srgb, var(--mt-accent) 18%, transparent) 1px, transparent 1px),
            linear-gradient(90deg, color-mix(in srgb, var(--mt-accent) 18%, transparent) 1px, transparent 1px);
          background-size: 52px 52px;
          mask-image: linear-gradient(180deg, rgba(0,0,0,.8), rgba(0,0,0,.26) 70%, transparent);
        }
        .mt-module-page::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background:
            repeating-linear-gradient(135deg, rgba(255,255,255,.045) 0 1px, transparent 1px 18px),
            radial-gradient(circle at 50% 20%, rgba(255,255,255,.10), transparent 18%);
          opacity: .38;
          mix-blend-mode: screen;
        }
        .mt-module-atmosphere {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background:
            linear-gradient(120deg, transparent 0 42%, color-mix(in srgb, var(--mt-accent) 13%, transparent) 43%, transparent 44% 100%),
            linear-gradient(180deg, rgba(3,7,20,.08), rgba(3,7,20,.58));
        }
        .mt-module-content {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          position: relative;
          z-index: 2;
          scroll-behavior: smooth;
        }

        .mt-module-content .pi-mhub-page {
          margin: 0 !important;
          padding: clamp(18px, 3vw, 34px) clamp(14px, 4vw, 30px) 76px !important;
          min-height: auto !important;
          width: 100% !important;
          max-width: 100% !important;
          background: transparent !important;
          color: #EAF6FF !important;
        }
        .mt-module-content .pi-mhub-page h1,
        .mt-module-content .pi-mhub-card-title,
        .mt-module-content .pi-mhub-pill {
          font-family: 'Fredoka', system-ui, sans-serif !important;
        }
        .mt-module-content .pi-mhub-subtitle,
        .mt-module-content .pi-mhub-card-desc {
          font-family: 'Fredoka', system-ui, sans-serif !important;
        }
        .mt-module-content .pi-mhub-page h1 {
          color: #fff !important;
          text-shadow: 0 0 24px color-mix(in srgb, var(--mt-accent) 32%, transparent);
          text-wrap: balance;
        }
        .mt-module-content .pi-mhub-subtitle {
          color: rgba(234,246,255,.72) !important;
          opacity: 1 !important;
        }
        .mt-module-content .pi-mhub-grid {
          width: min(1180px, 100%);
          max-width: 1180px !important;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 230px), 1fr)) !important;
          gap: clamp(16px, 2.4vw, 28px) !important;
          align-items: stretch;
        }

        .mt-module-content .pi-mhub-banner {
          width: min(780px, 100%);
          max-width: 780px !important;
          margin: 2px auto clamp(24px, 4vw, 38px) !important;
          padding: clamp(15px, 2.2vw, 22px) clamp(16px, 3vw, 26px) !important;
          border: 1px solid color-mix(in srgb, var(--mt-accent) 38%, rgba(255,255,255,.08)) !important;
          border-radius: 24px !important;
          background:
            linear-gradient(135deg, color-mix(in srgb, var(--mt-accent) 24%, rgba(255,255,255,.08)), rgba(255,255,255,.055)),
            radial-gradient(circle at 0% 0%, color-mix(in srgb, var(--mt-accent) 22%, transparent), transparent 58%) !important;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.18),
            0 22px 50px -28px color-mix(in srgb, var(--mt-accent) 70%, #000) !important;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          overflow: hidden;
          position: relative;
        }
        .mt-module-content .pi-mhub-banner::after {
          content: "";
          position: absolute;
          left: 18px;
          right: 18px;
          bottom: 10px;
          height: 1px;
          background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--mt-accent) 80%, white), transparent);
          opacity: .8;
        }
        .mt-module-content .pi-mhub-banner-kicker {
          color: color-mix(in srgb, var(--mt-accent) 25%, #EAF6FF) !important;
          text-shadow: none !important;
          letter-spacing: .13em !important;
        }
        .mt-module-content .pi-mhub-banner-name {
          color: #fff !important;
          font-family: 'Baloo 2', 'Fredoka', system-ui, sans-serif !important;
          font-weight: 800 !important;
          font-size: clamp(20px, 3vw, 30px) !important;
          letter-spacing: 0 !important;
          text-shadow: 0 0 24px color-mix(in srgb, var(--mt-accent) 36%, transparent) !important;
        }
        .mt-module-content .pi-mhub-banner-badge {
          width: clamp(44px, 8vw, 62px) !important;
          height: clamp(44px, 8vw, 62px) !important;
          border-radius: 18px !important;
          background: linear-gradient(180deg, var(--mt-accent), var(--mt-accent-d)) !important;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.24), 0 8px 22px color-mix(in srgb, var(--mt-accent) 34%, transparent) !important;
          font-size: clamp(20px, 4vw, 28px) !important;
        }

        .mt-module-content .pi-mhub-card,
        .mt-module-content .pi-mhub-card--v2 {
          min-height: 100%;
          background:
            linear-gradient(180deg, rgba(255,255,255,.108), rgba(255,255,255,.046)),
            radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--mt-accent) 16%, transparent), transparent 72%) !important;
          backdrop-filter: blur(18px) !important;
          -webkit-backdrop-filter: blur(18px) !important;
          border: 1px solid rgba(255,255,255,.12) !important;
          border-radius: 24px !important;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.14),
            0 14px 34px rgba(0,0,0,.27) !important;
          position: relative;
          overflow: hidden;
          color: #EAF6FF !important;
          transform-origin: center;
          transition:
            transform .28s cubic-bezier(.34,1.56,.64,1),
            border-color .22s ease,
            box-shadow .22s ease,
            background .22s ease !important;
        }
        .mt-module-content .pi-mhub-card::before,
        .mt-module-content .pi-mhub-card--v2::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(118deg, rgba(255,255,255,.18), transparent 36% 100%);
          opacity: .52;
        }
        .mt-module-content .pi-mhub-card::after,
        .mt-module-content .pi-mhub-card--v2::after {
          content: "";
          position: absolute;
          left: 18px;
          right: 18px;
          bottom: 13px;
          height: 1px;
          pointer-events: none;
          background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--mt-accent) 76%, white), transparent);
          opacity: .78;
        }
        .mt-module-content .pi-mhub-card:hover,
        .mt-module-content .pi-mhub-card--v2:hover {
          background:
            linear-gradient(180deg, rgba(255,255,255,.145), rgba(255,255,255,.06)),
            radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--mt-accent) 24%, transparent), transparent 72%) !important;
          border-color: color-mix(in srgb, var(--mt-accent) 58%, rgba(255,255,255,.16)) !important;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.18),
            0 0 26px -8px color-mix(in srgb, var(--mt-accent) 82%, transparent),
            0 22px 48px rgba(0,0,0,.34) !important;
          transform: translateY(-7px) scale(1.014) !important;
        }
        .mt-module-content .pi-mhub-card > *,
        .mt-module-content .pi-mhub-card--v2 > * {
          position: relative;
          z-index: 1;
        }
        .mt-module-content .pi-mhub-card:focus-visible,
        .mt-module-content .pi-mhub-card--v2:focus-visible {
          outline: 3px solid color-mix(in srgb, var(--mt-accent) 72%, white) !important;
          outline-offset: 4px !important;
        }
        .mt-module-content .pi-mhub-stage:not(.pi-mhub-stage--bare) {
          background:
            radial-gradient(circle at 50% 30%, color-mix(in srgb, var(--mt-accent) 24%, rgba(255,255,255,.12)), rgba(5,10,26,.34)) !important;
          box-shadow:
            inset 0 -10px 24px rgba(0,0,0,.36),
            inset 0 2px 0 rgba(255,255,255,.10),
            0 16px 30px rgba(0,0,0,.22) !important;
        }
        .mt-module-content .pi-mhub-stage--bare {
          width: min(156px, 54vw) !important;
          height: min(156px, 54vw) !important;
        }
        .mt-module-content .pi-mhub-stage svg {
          filter: drop-shadow(0 18px 20px rgba(0,0,0,.24));
        }
        .mt-module-content .pi-mhub-eyebrow {
          color: color-mix(in srgb, var(--mt-accent) 35%, #DFFBFF) !important;
          text-shadow: 0 0 18px color-mix(in srgb, var(--mt-accent) 38%, transparent);
        }
        .mt-module-content .pi-mhub-pill {
          background: linear-gradient(180deg, var(--mt-accent), var(--mt-accent-d)) !important;
          color: #fff !important;
          box-shadow: 0 3px 0 rgba(0,0,0,.35), 0 0 20px color-mix(in srgb, var(--mt-accent) 26%, transparent) !important;
          border-radius: 16px !important;
          max-width: 94% !important;
          text-wrap: balance;
        }
        .mt-module-content .pi-mhub-card-title {
          color: #fff !important;
          text-wrap: balance;
        }
        .mt-module-content .pi-mhub-card-desc {
          color: rgba(218,233,255,.74) !important;
          opacity: 1 !important;
          max-width: 29ch !important;
        }
        .mt-module-content .pi-mhub-cta {
          margin-top: auto !important;
          background: linear-gradient(180deg, var(--mt-accent), var(--mt-accent-d)) !important;
          color: #fff !important;
          box-shadow: 0 3px 0 rgba(0,0,0,.38), 0 0 20px color-mix(in srgb, var(--mt-accent) 26%, transparent) !important;
        }
        .mt-module-content .pi-mhub-card-disabled {
          opacity: .54 !important;
          filter: saturate(.65) grayscale(.34) !important;
          border-style: dashed !important;
          cursor: default !important;
        }
        .mt-module-content .pi-mhub-card-disabled:hover {
          transform: none !important;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.12), 0 14px 34px rgba(0,0,0,.24) !important;
        }

        .mt-module-content .mt-footer-trio {
          width: min(860px, 100%);
          gap: clamp(12px, 2vw, 18px) !important;
        }
        .mt-module-content .mt-footer-trio-card {
          background:
            linear-gradient(180deg, rgba(255,255,255,.10), rgba(255,255,255,.045)) !important;
          border: 1px solid rgba(255,255,255,.12) !important;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.12), 0 12px 30px rgba(0,0,0,.24) !important;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .mt-module-content .mt-footer-trio-card.active,
        .mt-module-content .mt-footer-trio-card.is-enabled {
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--mt-accent) 18%, rgba(255,255,255,.10)), rgba(255,255,255,.052)) !important;
          border-color: color-mix(in srgb, var(--mt-accent) 46%, rgba(255,255,255,.12)) !important;
        }
        .mt-module-content .mt-footer-trio-title { color: #fff !important; }
        .mt-module-content .mt-footer-trio-desc { color: rgba(218,233,255,.70) !important; }

        @media (min-width: 1180px) {
          .mt-module-content .pi-mhub-page {
            padding-top: 28px !important;
          }
        }
        @media (max-width: 720px) {
          .mt-module-content .pi-mhub-banner {
            border-radius: 20px !important;
            gap: 12px !important;
          }
          .mt-module-content .pi-mhub-grid {
            grid-template-columns: 1fr !important;
            max-width: 390px !important;
          }
          .mt-module-content .pi-mhub-card,
          .mt-module-content .pi-mhub-card--v2 {
            padding: 18px 16px 21px !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .mt-module-content,
          .mt-module-content .pi-mhub-card,
          .mt-module-content .pi-mhub-card--v2 {
            scroll-behavior: auto;
            transition: none !important;
          }
          .mt-module-content .pi-mhub-card:hover,
          .mt-module-content .pi-mhub-card--v2:hover {
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}
