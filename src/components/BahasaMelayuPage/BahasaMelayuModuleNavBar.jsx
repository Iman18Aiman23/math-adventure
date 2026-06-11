import React from 'react';
import { getModulesForYear } from './_shared/ModuleData';
import { playHoverSound } from '../../utils/soundManager';

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

export default function BahasaMelayuModuleNavBar({ year, activeModule, onModuleChange, language = 'bm' }) {
  const stripPrefix = (id) => id.replace(/^\d-/, '');
  const current = stripPrefix(activeModule);
  const modules = getModulesForYear(year);

  return (
    <>
      <style>{`
        .bm-mnav {
          position: sticky; top: 56px; z-index: 100;
          display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 10px;
          padding: 10px 60px;
          background: rgba(255,255,255,.92);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid #E6E9F0;
          box-shadow: 0 4px 16px rgba(20,40,70,.06);
          font-family: 'Fredoka', system-ui, sans-serif;
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
          background: #fff;
          border-radius: 14px;
          padding: 6px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          line-height: 1.15;
          gap: 1px;
          color: #5B6F86;
          transition: all .2s ease;
          min-width: 64px;
          flex: 1;
          -webkit-tap-highlight-color: transparent;
        }
        .bm-mnav-tab:hover { transform: translateY(-2px); border-color: var(--tc); color: var(--tc); }
        .bm-mnav-tab:active { transform: scale(.95); }
        .bm-mnav-tab.active {
          background: var(--tc);
          border-color: var(--tc);
          color: #fff;
          box-shadow: 0 4px 12px rgba(0,0,0,.15);
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
    </>
  );
}
