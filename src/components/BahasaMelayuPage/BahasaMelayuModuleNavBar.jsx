import React from 'react';
import { getModulesForYear } from './_shared/ModuleData';
import { playHoverSound } from '../../utils/soundManager';
import StatsBar from '../_shared/StatsBar';

const NAMES = {
  mendengar:    { bm: 'Mendengar & Bertutur', en: 'Listening & Speaking' },
  membaca:      { bm: 'Membaca',              en: 'Reading' },
  menulis:      { bm: 'Menulis',              en: 'Writing' },
  'seni-bahasa': { bm: 'Seni Bahasa',         en: 'Language Arts' },
  tatabahasa:   { bm: 'Tatabahasa',           en: 'Grammar' },
};

// Per-year overrides — tab labels follow the content names policy
// (what the child actually does), not the silibus strand headings.
const NAMES_BY_YEAR = {
  1: {
    mendengar: { bm: 'Huruf & Frasa', en: 'Letters & Phrases' },
  },
};

export default function BahasaMelayuModuleNavBar({ year, activeModule, onModuleChange, onBack, language = 'bm' }) {
  const stripPrefix = (id) => id.replace(/^\d-/, '');
  const current = stripPrefix(activeModule);
  const modules = getModulesForYear(year);
  const activeMod = modules.find(m => m.id === current);
  const accent = activeMod?.theme?.c || '#7A4FD0';
  const accentD = activeMod?.theme?.cd || '#3F2A86';

  return (
    <header className="bm-module-header" style={{ '--accent': accent, '--accent-d': accentD }}>
      <style>{`
        .bm-module-header {
          flex-shrink: 0;
          /* No panel fill — top bar + nav float as HUD elements over the
             module's own page background. */
          background: transparent;
          position: relative;
          z-index: 2;
        }
        .bm-top-bar {
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
        .bm-top-back {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          /* Solid white "game button" with a chunky brown 3D ledge (palette) */
          border: 3px solid #5C3D2E;
          background: #ffffff;
          color: #5C3D2E;
          cursor: pointer;
          flex-shrink: 0;
          padding: 0;
          box-shadow: 0 5px 0 #5C3D2E;
          transition: transform .1s ease, box-shadow .1s ease;
        }
        .bm-top-back:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 0 #5C3D2E;
        }
        .bm-top-back:active {
          transform: translateY(5px);
          box-shadow: 0 0 0 #5C3D2E;
        }
        /* Phone: fill the remaining row so stats stay readable */
        .bm-top-stats {
          flex: 1 1 auto;
          min-width: 0;
          margin-left: auto;
          display: flex;
          justify-content: flex-end;
        }
        .bm-top-stats .sb-root { margin-bottom: 0; width: 100%; }
        /* Tablet & up: compact HUD pill anchored to the top-right, not full-bleed.
           Items size to their own content (not equal columns) so wider stats like
           "💎 0 Gems" / "⭐ 0 XP" never overflow their slot and collide. */
        @media (min-width: 768px) {
          .bm-top-stats { flex: 0 0 auto; }
          .bm-top-stats .sb-root {
            width: auto;
            min-width: 0;
            padding: 8px 18px;
            gap: 12px;
          }
          .bm-top-stats .sb-item { flex: 0 0 auto; }
        }

        .bm-mnav {
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
        .bm-mnav-tab-wrap {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          flex: 1;
        }
        .bm-mnav-tab {
          font-family: 'Nunito', sans-serif;
          font-weight: 900;
          cursor: pointer;
          /* Resting: white card, gray border + gray 3D ledge (palette) */
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
          box-shadow: 0 8px 0 #D0D0D0;
          -webkit-tap-highlight-color: transparent;
        }
        .bm-mnav-tab:not(.active):hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 0 #D0D0D0;
        }
        /* press → sink down onto the ledge for tactile feedback */
        .bm-mnav-tab:active { transform: translateY(8px); box-shadow: 0 0 0 #D0D0D0; }
        .bm-mnav-tab.active {
          /* Active: vibrant module surface (--tc) + deep module ledge (--tcd),
             e.g. Module 1 = #FF8F3D face with #FF6F00 border + bottom shadow. */
          background: var(--tc);
          border-color: var(--tcd);
          color: #fff;
          box-shadow: 0 8px 0 var(--tcd);
        }
        .bm-mnav-tab.active:active {
          transform: translateY(8px);
          box-shadow: 0 0 0 var(--tcd);
        }
        .bm-mnav-tab b { font-family: 'Fredoka', sans-serif; font-weight: 700; font-size: 20px; color: #A0A0A0; }
        .bm-mnav-tab span { font-family: 'Nunito', sans-serif; font-size: 13px; font-weight: 900; white-space: nowrap; }
        .bm-mnav-tab.active b,
        .bm-mnav-tab.active span { color: #fff; text-shadow: 1px 2px 0 rgba(0,0,0,.15); }

        @media (max-width: 1024px) {
          .bm-mnav { padding: 10px 16px; gap: 8px; }
          .bm-mnav-tab-wrap {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            /* extra row-gap so each tab's 8px bottom ledge clears the next row */
            column-gap: 8px;
            row-gap: 18px;
            width: 100%;
            flex: none;
          }
          .bm-mnav-tab {
            flex: none;
            min-width: 0;
            max-width: none;
            width: 100%;
            padding: 12px 6px;
            border-radius: 12px;
          }
          .bm-mnav-tab b { font-size: 16px; }
          .bm-mnav-tab span { font-size: 10px; }
        }
        @media (max-width: 380px) {
          .bm-mnav { padding: 8px 12px; gap: 6px; }
          .bm-mnav-tab-wrap { column-gap: 6px; row-gap: 16px; }
          .bm-mnav-tab { padding: 10px 5px; border-radius: 10px; }
          .bm-mnav-tab b { font-size: 14px; }
          .bm-mnav-tab span { font-size: 9px; }
        }
      `}</style>

      <div className="bm-top-bar">
        <button type="button" className="bm-top-back" onClick={onBack}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <div className="bm-top-stats">
          <StatsBar subject="bm" />
        </div>
      </div>
      <nav className="bm-mnav">
        <div className="bm-mnav-tab-wrap">
          {modules.map(m => {
            const isActive = current === m.id;
            const name = NAMES_BY_YEAR[year]?.[m.id] || NAMES[m.id] || { bm: m.name, en: m.nameEn };
            return (
              <button
                key={m.id}
                className={`bm-mnav-tab${isActive ? ' active' : ''}`}
                style={{ '--tc': m.theme.c, '--tcd': m.theme.cd }}
                onClick={() => {
                  if (!isActive) {
                    playHoverSound();
                    onModuleChange?.(year === 1 ? m.id : `${year}-${m.id}`);
                  }
                }}
                type="button"
              >
                <b>{m.num}</b>
                <span>{language === 'bm' ? name.bm : name.en}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
