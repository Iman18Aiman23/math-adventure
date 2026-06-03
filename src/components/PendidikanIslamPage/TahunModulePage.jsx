import React from 'react';
import ModuleNavBar from './ModuleNavBar';

export default function TahunModulePage({ year, activeModule, onModuleChange, onBack, onSelectTopic, children, language }) {
  return (
    <div className="pi-module-page">
      <div className="pi-top-bar">
        <button type="button" className="pi-top-back" onClick={onBack}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <div className="pi-top-year">
          <span className="pi-top-year-label">{language === 'bm' ? 'Tahun' : 'Year'}</span>
          <span className="pi-top-year-num">{year}</span>
        </div>
      </div>
      <ModuleNavBar
        year={year}
        activeModule={activeModule}
        onModuleChange={onModuleChange}
        language={language}
      />
      <div className="pi-module-content">
        {React.isValidElement(children)
          ? React.cloneElement(children, { language, onSelectTopic })
          : children}
      </div>
      <style>{`
        .pi-module-page { position: relative; min-height: 100vh; }
        .pi-module-content { position: relative; }
        .pi-module-content .aq-page,
        .pi-module-content .pi-mhub-page {
          margin: 0 !important;
        }
        .pi-top-bar {
          position: sticky;
          top: 0;
          z-index: 110;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 56px;
          padding: 10px 16px;
          background: #fff;
          box-sizing: border-box;
        }
        .pi-top-back {
          position: absolute;
          left: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 2px solid #E5E7EB;
          background: #fff;
          color: #6B7280;
          cursor: pointer;
          flex-shrink: 0;
          padding: 0;
          transition: background 0.12s;
        }
        .pi-top-back:hover { background: #F3F4F6; }
        .pi-top-year {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: 20px;
        }
        .pi-top-year-label { color: #10243A; }
        .pi-top-year-num { color: #1E9AC9; }
      `}</style>
    </div>
  );
}
