import React from 'react';
import { playHoverSound } from '../../utils/soundManager';

const MODULES = [
  { id: 'nombor',    num: 1, labelBM: 'Nombor & Operasi',    labelEN: 'Numbers & Operations', color: '#14B8A6' },
  { id: 'sukatan',   num: 2, labelBM: 'Sukatan & Geometri',   labelEN: 'Measurement & Geometry', color: '#6366F1' },
  { id: 'statistik', num: 3, labelBM: 'Statistik',            labelEN: 'Statistics',              color: '#A855F7' },
];

export default function MatematikModuleNavBar({ year, activeModule, onModuleChange, language = 'bm' }) {
  const stripPrefix = (id) => id.replace(/^\d-/, '');
  const current = stripPrefix(activeModule);

  return (
    <>
      <style>{`
        .mt-mnav {
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
        .mt-mnav-tab-wrap {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          flex: 1;
        }
        .mt-mnav-tab {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 700;
          cursor: pointer;
          border: 2px solid #E6E9F0;
          background: #fff;
          border-radius: 14px;
          padding: 6px 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          line-height: 1.15;
          gap: 1px;
          color: #5B6F86;
          transition: all .2s ease;
          min-width: 80px;
          flex: 1;
          -webkit-tap-highlight-color: transparent;
        }
        .mt-mnav-tab:hover { transform: translateY(-2px); border-color: var(--tc); color: var(--tc); }
        .mt-mnav-tab:active { transform: scale(.95); }
        .mt-mnav-tab.active {
          background: var(--tc);
          border-color: var(--tc);
          color: #fff;
          box-shadow: 0 4px 12px rgba(0,0,0,.15);
        }
        .mt-mnav-tab b { font-size: 18px; }
        .mt-mnav-tab span { font-size: 13px; font-weight: 700; opacity: .78; white-space: nowrap; }
        .mt-mnav-tab.active span { opacity: .92; }

        @media (max-width: 1024px) {
          .mt-mnav { padding: 10px 16px; gap: 8px; }
          .mt-mnav-tab-wrap {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            width: 100%;
            flex: none;
          }
          .mt-mnav-tab {
            flex: none;
            min-width: 0;
            max-width: none;
            width: 100%;
            padding: 12px 8px;
            border-radius: 12px;
          }
          .mt-mnav-tab b { font-size: 17px; }
          .mt-mnav-tab span { font-size: 12px; }
        }
        @media (max-width: 380px) {
          .mt-mnav { padding: 8px 12px; gap: 6px; }
          .mt-mnav-tab-wrap { gap: 6px; }
          .mt-mnav-tab { padding: 10px 6px; border-radius: 10px; }
          .mt-mnav-tab b { font-size: 15px; }
          .mt-mnav-tab span { font-size: 11px; }
        }
      `}</style>

      <nav className="mt-mnav">
        <div className="mt-mnav-tab-wrap">
          {MODULES.map(m => {
            const isActive = current === m.id;
            return (
              <button
                key={m.id}
                className={`mt-mnav-tab${isActive ? ' active' : ''}`}
                style={{ '--tc': m.color }}
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
    </>
  );
}
