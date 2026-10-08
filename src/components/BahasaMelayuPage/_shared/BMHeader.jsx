import React from 'react';
import useBrowserBack from '../../../hooks/useBrowserBack';

export default function BMHeader({ onBack, language = 'bm', title, sectionLabel, sticky, actions, leading }) {
  const handleBack = useBrowserBack(onBack);

  return (
    <>
      <style>{`
        .bm-header {
          flex-shrink: 0; position: relative; z-index: 1;
          display: flex; flex-direction: column;
          padding: clamp(16px, 1.8vw, 24px) clamp(12px, 1.6vw, 24px) clamp(10px, 1.2vw, 16px);
          background: rgba(255,255,255,.88);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0,0,0,.06);
        }
        .bm-header--sticky { position: sticky; top: 0; z-index: 40; }
        .bm-header-row {
          display: flex; align-items: center; gap: 4px;
          min-height: clamp(50px, 5.6vw, 68px);
        }
        .bm-header-row--leading { display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr); }
        .bm-header-row--leading::after { display: none; }
        .bm-header-leading { min-width: 0; justify-self: start; }
        .bm-header-leading .ih-mobile-logo { display: block; width: clamp(100px, 10vw, 140px); min-width: 0; padding: 0; background: transparent; }
        .bm-header-row--leading .bm-header-actions { justify-self: end; width: auto; flex: 0 0 auto; }
        .bm-header .ih-top-actions-cluster { display: flex; }
        .bm-header .ih-points { height: 40px; min-height: 40px; min-width: 76px; padding: 7px 14px; font-size: 19px; }
        .bm-header .ih-points svg { width: 24px; height: 24px; }
        .bm-header .ih-account { height: 44px; min-height: 44px; padding: 3px 12px 3px 5px; gap: 8px; }
        .bm-header .ih-account .ih-avatar { width: 34px; height: 34px; border-width: 2px; }
        .bm-header .ih-account .ih-avatar svg { width: 27px; height: 27px; }
        .bm-header .ih-account > svg { width: 19px; height: 19px; }
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
          .bm-header { padding: clamp(12px, 3vw, 16px) clamp(8px, 2.5vw, 10px) clamp(5px, 1.75vw, 7px); }
          .bm-header-row { width: 100%; min-width: 0; min-height: clamp(38px, 11.5vw, 44px); flex-wrap: nowrap; gap: clamp(2px, 1vw, 4px); }
          .bm-header-back-label { display: none; }
          .bm-header-row::after { flex-basis: clamp(30px, 10vw, 42px); }
          .bm-header-actions { min-width: 0; flex-basis: clamp(30px, 10vw, 42px); }
          .bm-header-back { padding-inline: clamp(6px, 2vw, 10px); }
          .bm-header-back svg { width: clamp(18px, 5.5vw, 22px); height: clamp(18px, 5.5vw, 22px); }
          .bm-header-title { font-size: clamp(12px, 3.5vw, 14px); }
          .bm-header-actions .kv-settings summary { width: clamp(30px, 10vw, 42px); height: clamp(30px, 10vw, 42px); border-radius: clamp(10px, 2.5vw, 12px); }
          .bm-header-actions .kv-settings summary svg { width: clamp(18px, 5.5vw, 22px); height: clamp(18px, 5.5vw, 22px); }
          .bm-header-leading .ih-mobile-logo { width: clamp(76px, 22vw, 100px); }
          .bm-header .ih-points { min-width: 60px; max-width: 84px; height: 36px; min-height: 36px; padding: 5px 8px; font-size: 16px; }
          .bm-header .ih-points svg { width: 20px; height: 20px; }
          .bm-header .ih-account { height: 36px; min-height: 36px; padding: 3px 7px 3px 4px; gap: 3px; }
          .bm-header .ih-account .ih-avatar { width: 26px; height: 26px; border-width: 1px; }
          .bm-header .ih-account .ih-avatar svg { width: 23px; height: 23px; }
          .bm-header .ih-account > svg { width: 16px; height: 16px; }
        }
        @container iman-page (min-width: 1001px) {
          .bm-header-leading .ih-mobile-logo { display: none; }
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
        <div className={`bm-header-row${leading ? ' bm-header-row--leading' : actions ? ' bm-header-row--actions' : ''}`}>
          {leading ? <div className="bm-header-leading">{leading}</div> : <button type="button" className="bm-header-back" onClick={handleBack} aria-label={language === 'bm' ? 'Kembali' : 'Back'}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span className="bm-header-back-label">{language === 'bm' ? 'Kembali' : 'Back'}</span>
          </button>}
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
