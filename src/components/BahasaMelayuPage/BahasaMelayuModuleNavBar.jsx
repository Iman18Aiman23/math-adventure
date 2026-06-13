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
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          /* 3D beveled "game button" — accent-tinted with a raised highlight */
          background:
            linear-gradient(180deg, #ffffff 0%, #eef1f6 100%);
          color: var(--accent-d);
          cursor: pointer;
          flex-shrink: 0;
          padding: 0;
          box-shadow: 0 3px 0 #c7ccd6, 0 5px 10px rgba(20,40,70,.18);
          box-shadow:
            0 3px 0 color-mix(in srgb, var(--accent) 45%, #c7ccd6),
            0 5px 10px rgba(20,40,70,.18),
            0 1px 0 rgba(255,255,255,.9) inset;
          transition: transform .12s ease, box-shadow .12s ease, color .35s ease;
        }
        .bm-top-back:hover {
          transform: translateY(-1px);
          color: var(--accent);
          box-shadow:
            0 4px 0 color-mix(in srgb, var(--accent) 55%, #c7ccd6),
            0 7px 14px rgba(20,40,70,.22),
            0 1px 0 rgba(255,255,255,.9) inset;
        }
        .bm-top-back:active {
          transform: translateY(2px);
          box-shadow:
            0 1px 0 color-mix(in srgb, var(--accent) 45%, #c7ccd6),
            0 2px 5px rgba(20,40,70,.18),
            0 1px 0 rgba(255,255,255,.9) inset;
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
          /* Recessed "slot" tray, tinted with the active module accent so it sits
             on the colored page background instead of clashing as flat gray.
             Solid fallback first for browsers without color-mix support. */
          background: rgba(255,255,255,.55);
          background: color-mix(in srgb, var(--accent) 14%, rgba(255,255,255,.72));
          /* Accent glow lifts the tray off the page + a beveled inset edge. */
          box-shadow:
            0 1px 2px rgba(255,255,255,.7),
            0 8px 22px rgba(20,40,70,.16),
            0 2px 6px rgba(20,40,70,.08) inset;
          box-shadow:
            0 1px 2px rgba(255,255,255,.7),
            0 8px 26px color-mix(in srgb, var(--accent) 38%, transparent),
            0 2px 6px rgba(20,40,70,.08) inset;
          border: 1px solid color-mix(in srgb, var(--accent) 22%, transparent);
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
          font-family: 'Baloo 2', sans-serif;
          font-weight: 700;
          cursor: pointer;
          border: 2px solid #E6E9F0;
          background: linear-gradient(180deg, #ffffff 0%, #f4f6fa 100%);
          border-radius: 14px;
          padding: 7px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          line-height: 1.15;
          gap: 1px;
          color: #5B6F86;
          transition: transform .15s ease, border-color .15s ease, color .15s ease, box-shadow .15s ease, background .15s ease;
          min-width: 64px;
          flex: 1;
          box-shadow: 0 1px 0 rgba(255,255,255,.8) inset, 0 2px 4px rgba(20,40,70,.06);
          -webkit-tap-highlight-color: transparent;
        }
        .bm-mnav-tab:hover {
          transform: translateY(-2px);
          border-color: var(--tc);
          color: var(--tc);
          box-shadow: 0 1px 0 rgba(255,255,255,.8) inset, 0 6px 12px color-mix(in srgb, var(--tc) 22%, transparent);
        }
        .bm-mnav-tab:active { transform: scale(.95); }
        .bm-mnav-tab.active {
          /* Lit-up active state: filled gradient + accent glow ring.
             Solid fallbacks first for browsers without color-mix support. */
          background: var(--tc);
          background: linear-gradient(180deg,
            color-mix(in srgb, var(--tc) 88%, white) 0%, var(--tc) 100%);
          border-color: var(--tc);
          border-color: color-mix(in srgb, var(--tc) 70%, white);
          color: #fff;
          box-shadow: 0 4px 12px rgba(0,0,0,.15);
          box-shadow:
            0 0 0 3px color-mix(in srgb, var(--tc) 28%, transparent),
            0 4px 14px color-mix(in srgb, var(--tc) 45%, transparent),
            0 1px 0 rgba(255,255,255,.4) inset;
        }
        .bm-mnav-tab b { font-size: 16px; }
        .bm-mnav-tab span { font-size: 11px; font-weight: 700; opacity: .78; white-space: nowrap; }
        .bm-mnav-tab.active span { opacity: .92; }

        @media (max-width: 1024px) {
          .bm-mnav { padding: 10px 16px; gap: 8px; }
          .bm-mnav-tab-wrap {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
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
          .bm-mnav-tab-wrap { gap: 6px; }
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
                style={{ '--tc': m.theme.c }}
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
