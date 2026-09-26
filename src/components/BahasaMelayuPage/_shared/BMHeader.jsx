import React from 'react';
import useBrowserBack from '../../../hooks/useBrowserBack';

export default function BMHeader({ onBack, language, title, sectionLabel, sticky, actions }) {
  const handleBack = useBrowserBack(onBack);

  return (
    <>
      <style>{`
        .bm-header {
          flex-shrink: 0; position: relative; z-index: 1;
          display: flex; flex-direction: column;
          padding: clamp(8px, 1.1vw, 14px) clamp(12px, 1.6vw, 24px) clamp(10px, 1.2vw, 16px);
          background: rgba(255,255,255,.88);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0,0,0,.06);
        }
        .bm-header--sticky { position: sticky; top: 0; z-index: 40; }
        .bm-header-row {
          display: flex; align-items: center; gap: 4px;
          min-height: clamp(50px, 5.6vw, 68px);
        }
        .bm-header-row::after { content: ''; flex: 0 1 clamp(64px, 7vw, 104px); }
        .bm-header-row--actions::after { display: none; }
        .bm-header-actions { flex: 0 0 clamp(64px, 7vw, 104px); display: flex; justify-content: flex-end; }
        .bm-header-back {
          flex-shrink: 0;
          display: flex; align-items: center; gap: 4px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: clamp(15px, 1.45vw, 20px); color: #64748B;
          background: none; border: none; cursor: pointer; padding: clamp(6px, .7vw, 10px) clamp(10px, 1vw, 16px);
          border-radius: 10px;
        }
        .bm-header-back svg { width: clamp(24px, 2vw, 30px); height: clamp(24px, 2vw, 30px); }
        .bm-header-actions .kv-settings summary {
          width: clamp(46px, 4.2vw, 58px); height: clamp(46px, 4.2vw, 58px);
          border-radius: clamp(12px, 1.2vw, 18px);
        }
        .bm-header-actions .kv-settings summary svg { width: clamp(22px, 2vw, 29px); height: clamp(22px, 2vw, 29px); }
        @media (hover: hover) {
          .bm-header-back:hover { background: #F1F5F9; }
        }
        @media (max-width: 480px) {
          .bm-header { padding: clamp(4px, 1.25vw, 6px) clamp(8px, 2.5vw, 10px) clamp(5px, 1.75vw, 7px); }
          .bm-header-row { width: 100%; min-width: 0; min-height: clamp(38px, 11.5vw, 44px); flex-wrap: nowrap; gap: clamp(2px, 1vw, 4px); }
          .bm-header-back-label { display: none; }
          .bm-header-row::after { flex-basis: clamp(30px, 10vw, 42px); }
          .bm-header-actions { min-width: 0; flex-basis: clamp(30px, 10vw, 42px); }
          .bm-header-back { padding-inline: clamp(6px, 2vw, 10px); }
          .bm-header-back svg { width: clamp(18px, 5.5vw, 22px); height: clamp(18px, 5.5vw, 22px); }
          .bm-header-title { font-size: clamp(12px, 3.5vw, 14px); }
          .bm-header-actions .kv-settings summary { width: clamp(30px, 10vw, 42px); height: clamp(30px, 10vw, 42px); border-radius: clamp(10px, 2.5vw, 12px); }
          .bm-header-actions .kv-settings summary svg { width: clamp(18px, 5.5vw, 22px); height: clamp(18px, 5.5vw, 22px); }
        }
        .bm-header-title {
          flex: 1; min-width: 0;
          text-align: center;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(16px, 1.6vw, 22px); color: #1E293B;
        }
        .bm-header-section-label {
          font-family: 'Fredoka',sans-serif; font-weight: 700; font-size: clamp(17px, 2.2vw, 28px);
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
        <div className={`bm-header-row${actions ? ' bm-header-row--actions' : ''}`}>
          <button type="button" className="bm-header-back" onClick={handleBack} aria-label={language === 'bm' ? 'Kembali' : 'Back'}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span className="bm-header-back-label">{language === 'bm' ? 'Kembali' : 'Back'}</span>
          </button>
          <span className="bm-header-title">{title}</span>
          {actions && <div className="bm-header-actions">{actions}</div>}
        </div>
        {sectionLabel && (
          <div className="bm-header-section-label">{sectionLabel}</div>
        )}
      </div>
    </>
  );
}
