import React from 'react';
import MatematikModuleNavBar from './MatematikModuleNavBar';

export default function MatematikModulePage({ year, activeModule, onModuleChange, onBack, onSelectTopic, children, language }) {
  return (
    <div className="mt-module-page">
      <div className="mt-top-bar">
        <button type="button" className="mt-top-back" onClick={onBack}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <div className="mt-top-year">
          <span className="mt-top-year-label">{language === 'bm' ? 'Tahun' : 'Year'}</span>
          <span className="mt-top-year-num">{year}</span>
        </div>
      </div>
      <MatematikModuleNavBar
        year={year}
        activeModule={activeModule}
        onModuleChange={onModuleChange}
        language={language}
      />
      <div className="mt-module-content">
        {React.isValidElement(children)
          ? React.cloneElement(children, { language, onSelectTopic })
          : children}
      </div>
      <style>{`
        .mt-module-page { position: relative; min-height: 100vh; }
        .mt-module-content { position: relative; }
        .mt-module-content .pi-mhub-page {
          margin: 0 !important;
        }
        .mt-top-bar {
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
        .mt-top-back {
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
        .mt-top-back:hover { background: #F3F4F6; }
        .mt-top-year {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: 20px;
        }
        .mt-top-year-label { color: #10243A; }
        .mt-top-year-num { color: #14B8A6; }
      `}</style>
    </div>
  );
}
