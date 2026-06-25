import React, { useEffect, useRef } from 'react';
import MatematikModuleNavBar from './MatematikModuleNavBar';
import GalaxyCanvas from './_shared/GalaxyCanvas';

export default function MatematikModulePage({ year, activeModule, onModuleChange, onBack, onSelectTopic, children, language }) {
  const contentRef = useRef(null);
  const isGalaxy = year === 1;

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [activeModule]);

  return (
    <div className={`mt-module-page${isGalaxy ? ' mt-module-page--galaxy' : ''}`}>
      {isGalaxy && <GalaxyCanvas />}
      <MatematikModuleNavBar
        year={year}
        activeModule={activeModule}
        onModuleChange={onModuleChange}
        onBack={onBack}
        language={language}
      />
      <div className="mt-module-content" ref={contentRef}>
        {React.isValidElement(children)
          ? React.cloneElement(children, { language, onSelectTopic })
          : children}
      </div>
      <style>{`
        .mt-module-page {
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 0;
          background: transparent;
          position: relative;
        }
        .mt-module-content {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          position: relative;
          z-index: 1;
        }
        /* Hub pages own their own background; trim padding to match nav spacing. */
        .mt-module-content .pi-mhub-page {
          margin: 0 !important;
          padding-top: 34px !important;
        }
        /* Standardize hub typography */
        .mt-module-content .pi-mhub-page h1,
        .mt-module-content .pi-mhub-card-title,
        .mt-module-content .pi-mhub-pill {
          font-family: 'Fredoka', system-ui, sans-serif !important;
        }
        .mt-module-content .pi-mhub-subtitle,
        .mt-module-content .pi-mhub-card-desc {
          font-family: 'Nunito', sans-serif !important;
        }

        /* ── Galaxy mode (T1) — all hub pages go dark & transparent ── */
        .mt-module-page--galaxy .mt-module-content .pi-mhub-page {
          background: transparent !important;
        }

        /* Robot cards → same subtle glass as nav tabs */
        .mt-module-page--galaxy .pi-mhub-card--v2 {
          background: rgba(255,255,255,.05) !important;
          backdrop-filter: blur(16px) !important;
          -webkit-backdrop-filter: blur(16px) !important;
          border: 1px solid rgba(255,255,255,.1) !important;
          box-shadow: 0 8px 32px rgba(0,0,0,.25) !important;
        }
        .mt-module-page--galaxy .pi-mhub-card--v2:hover {
          background: rgba(255,255,255,.10) !important;
          border-color: rgba(255,255,255,.22) !important;
          box-shadow: 0 0 24px rgba(147,51,234,.3), 0 16px 44px rgba(0,0,0,.35) !important;
          transform: translateY(-6px) scale(1.015);
        }
        .mt-module-page--galaxy .pi-mhub-card--v2 .pi-mhub-card-title { color: #fff !important; }
        .mt-module-page--galaxy .pi-mhub-card--v2 .pi-mhub-card-desc  { color: rgba(186,213,255,.72) !important; opacity: 1 !important; }
        .mt-module-page--galaxy .pi-mhub-card--v2 .pi-mhub-cta {
          box-shadow: 0 3px 0 rgba(0,0,0,.35) !important;
        }

        /* Stage (robot head container) → transparent disc so robot floats on galaxy */
        .mt-module-page--galaxy .pi-mhub-stage:not(.pi-mhub-stage--bare) {
          background: rgba(20,10,50,.45) !important;
          box-shadow: inset 0 -8px 24px rgba(0,0,0,.4), inset 0 2px 0 rgba(255,255,255,.08) !important;
        }

        /* Footer trio cards → dark glass */
        .mt-module-page--galaxy .mt-footer-trio-card {
          background: rgba(8,14,40,.55) !important;
          border-color: rgba(255,255,255,.1) !important;
          box-shadow: 0 4px 16px rgba(0,0,0,.4) !important;
        }
        .mt-module-page--galaxy .mt-footer-trio-card.active,
        .mt-module-page--galaxy .mt-footer-trio-card.is-enabled {
          background: rgba(14,24,60,.7) !important;
          border-color: rgba(147,51,234,.35) !important;
        }
        .mt-module-page--galaxy .mt-footer-trio-title { color: #fff !important; }
        .mt-module-page--galaxy .mt-footer-trio-desc  { color: rgba(186,213,255,.7) !important; }
      `}</style>
    </div>
  );
}
