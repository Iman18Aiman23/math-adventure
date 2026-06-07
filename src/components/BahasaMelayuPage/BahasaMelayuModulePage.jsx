import React from 'react';

export default function BahasaMelayuModulePage({ year, activeModule, onModuleChange, onBack, onSelectTopic, children, language }) {
  return (
    <div className="bm-module-page">
      <div className="bm-top-bar">
        <button type="button" className="bm-top-back" onClick={onBack}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <div className="bm-top-year">
          <span className="bm-top-year-label">{language === 'bm' ? 'Tahun' : 'Year'}</span>
          <span className="bm-top-year-num">{year}</span>
        </div>
      </div>
      <div className="bm-module-content">
        {React.isValidElement(children)
          ? React.cloneElement(children, { language, onSelectTopic })
          : children}
      </div>
      <style>{`
        .bm-module-page { position: relative; min-height: 100vh; }
        .bm-module-content { position: relative; }
        .bm-module-content .pi-mhub-page {
          margin: 0 !important;
        }
        .bm-top-bar {
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
        .bm-top-back {
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
        .bm-top-back:hover { background: #F3F4F6; }
        .bm-top-year {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: 20px;
        }
        .bm-top-year-label { color: #10243A; }
        .bm-top-year-num { color: #0284C7; }
      `}</style>
    </div>
  );
}
