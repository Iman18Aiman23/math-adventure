import React, { useEffect, useRef } from 'react';
import MatematikModuleNavBar, { getMtModuleTheme } from './MatematikModuleNavBar';

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
            radial-gradient(circle at 18% 14%, color-mix(in srgb, var(--mt-accent) 14%, transparent) 0, transparent 30%),
            radial-gradient(circle at 84% 18%, rgba(163,104,240,.08) 0, transparent 28%),
            linear-gradient(180deg, #FBFCFD 0%, #F7F8FA 48%, #EEF6F5 100%);
          color: #1F2937;
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
          opacity: .62;
          background-image:
            linear-gradient(rgba(112,112,112,.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(112,112,112,.045) 1px, transparent 1px);
          background-size: 52px 52px;
          mask-image: linear-gradient(180deg, rgba(0,0,0,.72), rgba(0,0,0,.22) 70%, transparent);
        }
        .mt-module-page::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background: radial-gradient(circle at 50% 20%, rgba(255,255,255,.8), transparent 18%);
          opacity: .8;
        }
        .mt-module-atmosphere {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background:
            radial-gradient(circle at 22% 18%, color-mix(in srgb, var(--mt-accent) 12%, transparent), transparent 30%);
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
          padding: clamp(14px, 2.2vw, 24px) clamp(14px, 3vw, 26px) 56px !important;
          min-height: auto !important;
          width: 100% !important;
          max-width: 100% !important;
          background: transparent !important;
          color: #1F2937 !important;
        }
        .mt-module-content .pi-mhub-page.has-dashboard {
          padding: 32px !important;
          background: #F6F9FF !important;
        }
        .mt-module-content .pi-mhub-page.has-dashboard h1,
        .mt-module-content .pi-mhub-page.has-dashboard .pi-mhub-lesson-title,
        .mt-module-content .pi-mhub-page.has-dashboard .pi-mhub-lesson-name {
          font-family: 'Poppins', 'Fredoka', system-ui, sans-serif !important;
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
          color: #1F2937 !important;
          text-shadow: none;
          text-wrap: balance;
        }
        .mt-module-content .pi-mhub-subtitle {
          color: #707070 !important;
          opacity: 1 !important;
        }
        .mt-module-content .pi-mhub-grid {
          width: min(1180px, 100%);
          max-width: 1180px !important;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 230px), 1fr)) !important;
          gap: clamp(14px, 1.8vw, 24px) !important;
          align-items: stretch;
        }

        .mt-module-content .pi-mhub-banner {
          width: min(780px, 100%);
          max-width: 780px !important;
          margin: 0 auto clamp(18px, 2.8vw, 30px) !important;
          padding: clamp(13px, 1.8vw, 18px) clamp(16px, 3vw, 24px) !important;
          border: 3px solid #E6E6E6 !important;
          border-radius: 24px !important;
          background: #ffffff !important;
          box-shadow: none !important;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
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
          background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--mt-accent) 42%, white), transparent);
          opacity: .45;
        }
        .mt-module-content .pi-mhub-banner-kicker {
          color: #9AA0AB !important;
          text-shadow: none !important;
          letter-spacing: .13em !important;
        }
        .mt-module-content .pi-mhub-banner-name {
          color: #1F2937 !important;
          font-family: 'Baloo 2', 'Fredoka', system-ui, sans-serif !important;
          font-weight: 800 !important;
          font-size: clamp(20px, 2.7vw, 28px) !important;
          letter-spacing: 0 !important;
          text-shadow: none !important;
        }
        .mt-module-content .pi-mhub-banner-badge {
          width: clamp(44px, 6vw, 58px) !important;
          height: clamp(44px, 6vw, 58px) !important;
          border-radius: 18px !important;
          background: linear-gradient(180deg, var(--mt-accent), var(--mt-accent-d)) !important;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.24), 0 8px 22px color-mix(in srgb, var(--mt-accent) 34%, transparent) !important;
          font-size: clamp(20px, 4vw, 28px) !important;
        }

        .mt-module-content .pi-mhub-card,
        .mt-module-content .pi-mhub-card--v2 {
          min-height: 100%;
          background: #ffffff !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          border: 3px solid #E6E6E6 !important;
          border-radius: 24px !important;
          box-shadow: none !important;
          position: relative;
          overflow: hidden;
          color: #1F2937 !important;
          transform-origin: center;
          transition:
            transform .28s cubic-bezier(.34,1.56,.64,1),
            border-color .22s ease,
            box-shadow .22s ease,
            background .22s ease !important;
          padding: clamp(20px, 2.4vw, 26px) clamp(16px, 2vw, 22px) clamp(22px, 2.6vw, 28px) !important;
          gap: clamp(12px, 1.6vw, 17px) !important;
        }
        .mt-module-content .pi-mhub-card::before,
        .mt-module-content .pi-mhub-card--v2::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--mt-accent) 11%, transparent), transparent 72%);
          opacity: .65;
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
          background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--mt-accent) 42%, white), transparent);
          opacity: .45;
        }
        .mt-module-content .pi-mhub-card:hover,
        .mt-module-content .pi-mhub-card--v2:hover {
          background: #ffffff !important;
          border-color: var(--mt-accent) !important;
          box-shadow: 0 12px 28px rgba(15,118,110,.10) !important;
          transform: translateY(-4px) !important;
        }
        .mt-module-content .pi-mhub-card > *,
        .mt-module-content .pi-mhub-card--v2 > * {
          position: relative;
          z-index: 1;
        }
        .mt-module-content .pi-mhub-card:focus-visible,
        .mt-module-content .pi-mhub-card--v2:focus-visible {
          outline: 3px solid var(--mt-accent) !important;
          outline-offset: 4px !important;
        }
        .mt-module-content .pi-mhub-stage:not(.pi-mhub-stage--bare) {
          background:
            radial-gradient(circle at 50% 30%, color-mix(in srgb, var(--mt-accent) 22%, #ffffff), #F7F8FA) !important;
          box-shadow: inset 0 2px 0 rgba(255,255,255,.9), 0 8px 18px rgba(15,118,110,.10) !important;
        }
        .mt-module-content .pi-mhub-stage--bare {
          width: min(132px, 46vw) !important;
          height: min(132px, 46vw) !important;
          margin-bottom: 2px !important;
        }
        .mt-module-content .pi-mhub-stage svg {
          filter: drop-shadow(0 12px 16px rgba(15,23,42,.14));
        }
        .mt-module-content .pi-mhub-eyebrow {
          display: none !important;
        }
        .mt-module-content .pi-mhub-pill {
          width: min(100%, 224px) !important;
          min-height: 46px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          position: relative;
          overflow: hidden;
          background:
            linear-gradient(180deg, rgba(255,255,255,.18), transparent 42%),
            linear-gradient(180deg, #3B82F6 0%, #2563EB 100%) !important;
          color: #ffffff !important;
          border: 1px solid rgba(255,255,255,.34);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.34),
            inset 0 -1px 0 rgba(0,0,0,.12),
            0 4px 0 #1D4ED8,
            0 14px 24px rgba(37,99,235,.24) !important;
          border-radius: 15px !important;
          max-width: 100% !important;
          text-wrap: balance;
          line-height: 1.15 !important;
          padding: 9px 16px !important;
          font-size: clamp(15px, 1.7vw, 17px) !important;
          transition: transform .18s ease, box-shadow .18s ease, filter .18s ease;
        }
        .mt-module-content .pi-mhub-pill::after {
          content: "";
          position: absolute;
          inset: 1px 1px auto;
          height: 38%;
          border-radius: 14px 14px 9px 9px;
          background: linear-gradient(180deg, rgba(255,255,255,.22), transparent);
          pointer-events: none;
        }
        .mt-module-content .pi-mhub-card:hover .pi-mhub-pill,
        .mt-module-content .pi-mhub-card--v2:hover .pi-mhub-pill {
          filter: saturate(1.06);
          transform: translateY(-2px);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.36),
            inset 0 -1px 0 rgba(0,0,0,.12),
            0 5px 0 #1D4ED8,
            0 18px 30px rgba(37,99,235,.30) !important;
        }
        .mt-module-content .pi-mhub-card-title {
          color: #fff !important;
          text-wrap: balance;
        }
        .mt-module-content .pi-mhub-card-desc {
          color: #707070 !important;
          opacity: 1 !important;
          max-width: 30ch !important;
          line-height: 1.5 !important;
          margin-top: -2px !important;
          min-height: 42px !important;
        }
        .mt-module-content .pi-mhub-cta {
          margin-top: 2px !important;
          min-height: 36px !important;
          min-width: 82px !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          background:
            linear-gradient(180deg, rgba(255,255,255,.18), transparent 46%),
            linear-gradient(180deg, var(--mt-accent), var(--mt-accent-d)) !important;
          color: #fff !important;
          border: 1px solid rgba(255,255,255,.28);
          border-radius: 999px !important;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.28),
            0 3px 0 var(--mt-accent-d),
            0 10px 18px color-mix(in srgb, var(--mt-accent) 24%, transparent) !important;
          padding: 7px 18px !important;
          transition: transform .16s ease, box-shadow .16s ease, filter .16s ease;
        }
        .mt-module-content .pi-mhub-card:hover .pi-mhub-cta,
        .mt-module-content .pi-mhub-card--v2:hover .pi-mhub-cta {
          filter: saturate(1.06);
          transform: translateY(-2px);
        }
        .mt-module-content .pi-mhub-card-disabled {
          opacity: .54 !important;
          filter: saturate(.65) grayscale(.34) !important;
          border-style: dashed !important;
          cursor: default !important;
        }
        .mt-module-content .pi-mhub-card-disabled:hover {
          transform: none !important;
          box-shadow: none !important;
        }

        .mt-module-content .mt-footer-trio {
          width: min(860px, 100%);
          gap: clamp(12px, 2vw, 18px) !important;
          margin-top: 26px !important;
        }
        .mt-module-content .mt-footer-trio-card {
          background: #ffffff !important;
          border: 3px solid #E6E6E6 !important;
          box-shadow: none !important;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
        }
        .mt-module-content .mt-footer-trio-card.active,
        .mt-module-content .mt-footer-trio-card.is-enabled {
          background: #ffffff !important;
          border-color: var(--mt-accent) !important;
        }
        .mt-module-content .mt-footer-trio-title { color: #1F2937 !important; }
        .mt-module-content .mt-footer-trio-desc { color: #707070 !important; }

        @media (min-width: 1180px) {
          .mt-module-content .pi-mhub-page {
            padding-top: 22px !important;
          }
        }
        @media (max-width: 720px) {
          .mt-module-content .pi-mhub-page.has-dashboard {
            padding: 20px 16px calc(18px + env(safe-area-inset-bottom)) !important;
          }
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
            padding: 20px 16px 22px !important;
            gap: 12px !important;
          }
          .mt-module-content .pi-mhub-card-desc {
            min-height: auto !important;
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
