import React from 'react';

export default function BMHeader({ onBack, language, title, sectionLabel, sticky }) {
  return (
    <>
      <style>{`
        .bm-header {
          flex-shrink: 0; position: relative; z-index: 1;
          display: flex; flex-direction: column;
          padding: 8px 12px 10px;
          background: rgba(255,255,255,.88);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0,0,0,.06);
        }
        .bm-header--sticky { position: sticky; top: 0; z-index: 40; }
        .bm-header-row {
          display: flex; align-items: center; gap: 4px;
          min-height: 44px;
        }
        .bm-header-row::after { content: ''; flex: 0 1 88px; }
        .bm-header-back {
          flex-shrink: 0;
          display: flex; align-items: center; gap: 4px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 13px; color: #64748B;
          background: none; border: none; cursor: pointer; padding: 6px 10px;
          border-radius: 10px;
        }
        @media (hover: hover) {
          .bm-header-back:hover { background: #F1F5F9; }
        }
        @media (max-width: 480px) {
          .bm-header-back-label { display: none; }
          .bm-header-row::after { flex-basis: 42px; }
        }
        .bm-header-title {
          flex: 1; min-width: 0;
          text-align: center;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(12px, 3.4vw, 14px); color: #1E293B;
        }
        .bm-header-section-label {
          font-family: 'Fredoka',sans-serif; font-weight: 700; font-size: 1.05rem;
          color: #374151; text-align: center; letter-spacing: .04em;
          margin: 2px 0 6px;
          display: flex; align-items: center; gap: 14px; justify-content: center;
        }
        .bm-header-section-label::before, .bm-header-section-label::after {
          content: ""; height: 3px; flex: 1; max-width: 80px; border-radius: 999px;
          background: linear-gradient(90deg, rgba(34,197,94,.6), rgba(249,115,22,.7), rgba(60,203,255,.7), rgba(139,92,246,.6));
        }
      `}</style>

      <div className={`bm-header${sticky ? ' bm-header--sticky' : ''}`}>
        <div className="bm-header-row">
          <button className="bm-header-back" onClick={onBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span className="bm-header-back-label">{language === 'bm' ? 'Kembali' : 'Back'}</span>
          </button>
          <span className="bm-header-title">{title}</span>
        </div>
        {sectionLabel && (
          <div className="bm-header-section-label">{sectionLabel}</div>
        )}
      </div>
    </>
  );
}
