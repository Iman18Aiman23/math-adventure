import React from 'react';
import { playHoverSound } from '../../utils/soundManager';
import StatsBar from '../_shared/StatsBar';

// Each module carries a face colour (c), darker border colour (cd), and the
// full page gradient (pg) — mirroring the Bahasa Melayu module tab themes
// (M1 orange, M2 blue, M3 purple). The page wrapper paints `pg` as the single
// shared background so the nav bar and hub body read as one continuous colour.
export const MT_MODULES = [
  { id: 'nombor',    num: 1, labelBM: 'Nombor & Operasi',  labelEN: 'Numbers & Operations',   c: '#FF8F3D', cd: '#FF6F00', pg: 'linear-gradient(180deg,#FFF4E6 0%,#FACD94 50%,#E8821A 100%)' },
  { id: 'sukatan',   num: 2, labelBM: 'Sukatan & Geometri', labelEN: 'Measurement & Geometry', c: '#36A9F0', cd: '#1A78C7', pg: 'linear-gradient(180deg,#E6F1FB 0%,#9FC9F2 50%,#1E7AC9 100%)' },
  { id: 'statistik', num: 3, labelBM: 'Statistik',          labelEN: 'Statistics',             c: '#A368F0', cd: '#7038D6', pg: 'linear-gradient(180deg,#F0EBFB 0%,#C3ABF0 50%,#7A4FD0 100%)' },
];

// Theme for the active module — shared with the page wrapper so it can paint
// the same background as the selected tab.
export function getMtModuleTheme(activeModule) {
  const current = (activeModule || '').replace(/^\d-/, '');
  const m = MT_MODULES.find(x => x.id === current);
  return {
    c: m?.c || '#FF8F3D',
    cd: m?.cd || '#FF6F00',
    pageGradient: m?.pg || MT_MODULES[0].pg,
  };
}

export default function MatematikModuleNavBar({ year, activeModule, onModuleChange, onBack, language = 'bm' }) {
  const stripPrefix = (id) => id.replace(/^\d-/, '');
  const current = stripPrefix(activeModule);
  const activeMod = MT_MODULES.find(m => m.id === current);
  const accent = activeMod?.c || '#FF8F3D';
  const accentD = activeMod?.cd || '#FF6F00';

  return (
    <header className="mt-module-header" style={{ '--accent': accent, '--accent-d': accentD }}>
      <style>{`
        .mt-module-header {
          flex-shrink: 0;
          /* No panel fill — top bar + nav float as HUD elements over the
             module's own page background. */
          background: transparent;
          position: relative;
          z-index: 2;
        }
        .mt-top-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          height: 60px;
          padding: 12px 16px;
          box-sizing: border-box;
          background: transparent;
          position: relative;
          z-index: 1;
        }
        .mt-top-back {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          /* Solid white "game button" — flat, no border or 3D shadow ledge */
          border: none;
          background: #ffffff;
          color: #10243A;
          cursor: pointer;
          flex-shrink: 0;
          padding: 0;
          box-shadow: none;
          transition: transform .1s ease;
        }
        .mt-top-back:hover { transform: translateY(-1px); }
        .mt-top-back:active { transform: translateY(1px); }
        .mt-top-back:focus-visible {
          outline: 3px solid var(--accent);
          outline-offset: 2px;
        }
        /* Phone: fill the remaining row so stats stay readable */
        .mt-top-stats {
          flex: 1 1 auto;
          min-width: 0;
          margin-left: auto;
          display: flex;
          justify-content: flex-end;
        }
        .mt-top-stats .sb-root { margin-bottom: 0; width: 100%; }
        /* Tablet & up: compact HUD pill anchored to the top-right, not full-bleed. */
        @media (min-width: 768px) {
          .mt-top-stats { flex: 0 0 auto; }
          .mt-top-stats .sb-root {
            width: auto;
            min-width: 0;
            padding: 8px 18px;
            gap: 12px;
          }
          .mt-top-stats .sb-item { flex: 0 0 auto; }
        }

        .mt-mnav {
          display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 10px;
          padding: 8px 14px;
          margin: 0 12px 14px;
          border-radius: 18px;
          /* No tray fill — tabs float directly over the page background, each
             carrying its own 3D bubble depth. */
          background: transparent;
          box-shadow: none;
          border: none;
          transition: background .35s ease, box-shadow .35s ease, border-color .35s ease;
          font-family: 'Fredoka', system-ui, sans-serif;
          position: relative;
          z-index: 1;
        }
        .mt-mnav-tab-wrap {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          flex: 1;
        }
        .mt-mnav-tab {
          font-family: 'Nunito', sans-serif;
          font-weight: 900;
          cursor: pointer;
          /* Resting: white card, gray border + gray 3D ledge */
          border: 4px solid #E0E0E0;
          background: #ffffff;
          border-radius: 20px;
          padding: 10px 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          line-height: 1.15;
          gap: 2px;
          color: #707070;
          transition: transform .1s ease, border-color .15s ease, color .15s ease, box-shadow .1s ease, background .15s ease;
          min-width: 64px;
          flex: 1;
          box-shadow: none;
          -webkit-tap-highlight-color: transparent;
        }
        .mt-mnav-tab:not(.active):hover { transform: translateY(-2px); }
        .mt-mnav-tab:active { transform: translateY(2px); }
        .mt-mnav-tab:focus-visible {
          outline: 3px solid var(--tcd);
          outline-offset: 2px;
        }
        .mt-mnav-tab.active {
          /* Active: vibrant module surface (--tc) + module border (--tcd) */
          background: var(--tc);
          border-color: var(--tcd);
          color: #fff;
        }
        .mt-mnav-tab.active:active { transform: translateY(2px); }
        .mt-mnav-tab b { font-family: 'Fredoka', sans-serif; font-weight: 700; font-size: 20px; color: #A0A0A0; }
        .mt-mnav-tab span { font-family: 'Nunito', sans-serif; font-size: 13px; font-weight: 900; white-space: nowrap; }
        .mt-mnav-tab.active b,
        .mt-mnav-tab.active span { color: #fff; text-shadow: 1px 2px 0 rgba(0,0,0,.15); }

        @media (max-width: 1024px) {
          .mt-mnav { padding: 10px 16px; gap: 8px; }
          .mt-mnav-tab-wrap {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            /* extra row-gap so each tab's bottom ledge clears the next row */
            column-gap: 8px;
            row-gap: 18px;
            width: 100%;
            flex: none;
          }
          .mt-mnav-tab {
            flex: none;
            min-width: 0;
            max-width: none;
            width: 100%;
            padding: 12px 6px;
            border-radius: 12px;
          }
          .mt-mnav-tab b { font-size: 16px; }
          .mt-mnav-tab span { font-size: 10px; }
        }
        @media (max-width: 380px) {
          .mt-mnav { padding: 8px 12px; gap: 6px; }
          .mt-mnav-tab-wrap { column-gap: 6px; row-gap: 16px; }
          .mt-mnav-tab { padding: 10px 5px; border-radius: 10px; }
          .mt-mnav-tab b { font-size: 14px; }
          .mt-mnav-tab span { font-size: 9px; }
        }
      `}</style>

      <div className="mt-top-bar">
        <button type="button" className="mt-top-back" onClick={onBack}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <div className="mt-top-stats">
          <StatsBar subject="mt" />
        </div>
      </div>
      <nav className="mt-mnav">
        <div className="mt-mnav-tab-wrap">
          {MT_MODULES.map(m => {
            const isActive = current === m.id;
            return (
              <button
                key={m.id}
                className={`mt-mnav-tab${isActive ? ' active' : ''}`}
                style={{ '--tc': m.c, '--tcd': m.cd }}
                onClick={() => {
                  if (!isActive) {
                    playHoverSound();
                    onModuleChange?.(year === 1 ? m.id : `${year}-${m.id}`);
                  }
                }}
                type="button"
              >
                <b>{m.num}</b>
                <span>{language === 'bm' ? m.labelBM : m.labelEN}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
