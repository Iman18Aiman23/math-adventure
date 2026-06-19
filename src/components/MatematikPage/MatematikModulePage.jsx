import React, { useEffect, useRef } from 'react';
import MatematikModuleNavBar from './MatematikModuleNavBar';

export default function MatematikModulePage({ year, activeModule, onModuleChange, onBack, onSelectTopic, children, language }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [activeModule]);

  return (
    <div className="mt-module-page">
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
          /* Flat, uniform light surface — identical to the Bahasa Melayu module
             page (#F7F8FA). Colour identity lives in the banner / tabs, not the
             body. The nav bar and hub body are transparent over this. */
          background: #F7F8FA;
        }
        .mt-module-content {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          position: relative;
        }
        /* Hub paints no background of its own — it inherits the page wrapper's
           flat #F7F8FA so nav + body read as one uniform surface (like BM).
           Top padding trimmed to 34px to match BM's banner-to-nav spacing. */
        .mt-module-content .pi-mhub-page {
          margin: 0 !important;
          background: transparent !important;
          padding-top: 34px !important;
        }
        /* Standardize the hub typography onto the same families as the nav bar
           (Fredoka display + Nunito body) — scoped to Matematik so the shared
           Pendidikan Islam hub keeps its own fonts. */
        .mt-module-content .pi-mhub-page h1,
        .mt-module-content .pi-mhub-card-title,
        .mt-module-content .pi-mhub-pill {
          font-family: 'Fredoka', system-ui, sans-serif !important;
        }
        .mt-module-content .pi-mhub-subtitle,
        .mt-module-content .pi-mhub-card-desc {
          font-family: 'Nunito', sans-serif !important;
        }
      `}</style>
    </div>
  );
}
