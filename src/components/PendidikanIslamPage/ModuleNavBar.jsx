import React from 'react';
import { playHoverSound } from '../../utils/soundManager';

const MODULES = [
  { id: 'al-quran', num: 1, labelBM: 'Al-Quran & Tajwid', labelEN: 'Quran & Tajweed', color: '#D4960A' },
  { id: 'akidah',   num: 2, labelBM: 'Akidah',            labelEN: 'Faith',           color: '#2A9A6C' },
  { id: 'ibadah',   num: 3, labelBM: 'Ibadah',            labelEN: 'Worship',         color: '#2563EB' },
  { id: 'sirah',    num: 4, labelBM: 'Sirah',             labelEN: 'Biography',       color: '#7A55E0' },
  { id: 'adab',     num: 5, labelBM: 'Adab & Akhlak',     labelEN: 'Manners',         color: '#FF8CBF' },
  { id: 'jawi',     num: 6, labelBM: 'Celik Jawi',        labelEN: 'Jawi Literacy',   color: '#1E9AC9' },
];

export default function ModuleNavBar({ year, activeModule, onModuleChange, language = 'bm' }) {
  const stripPrefix = (id) => id.replace(/^\d-/, '');
  const current = stripPrefix(activeModule);

  return (
    <>
      <style>{`
        .pi-mnav {
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
        .pi-mnav-tab-wrap {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          flex: 1;
        }
        .pi-mnav-tab {
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
        .pi-mnav-tab:hover { transform: translateY(-2px); border-color: var(--tc); color: var(--tc); }
        .pi-mnav-tab:active { transform: scale(.95); }
        .pi-mnav-tab.active {
          background: var(--tc);
          border-color: var(--tc);
          color: #fff;
          box-shadow: 0 4px 12px rgba(0,0,0,.15);
        }
        .pi-mnav-tab b { font-size: 18px; }
        .pi-mnav-tab span { font-size: 13px; font-weight: 700; opacity: .78; white-space: nowrap; }
        .pi-mnav-tab.active span { opacity: .92; }

        @media (max-width: 1024px) {
          .pi-mnav { padding: 10px 16px; gap: 8px; }
          .pi-mnav-tab-wrap {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            width: 100%;
            flex: none;
          }
          .pi-mnav-tab {
            flex: none;
            min-width: 0;
            max-width: none;
            width: 100%;
            padding: 12px 8px;
            border-radius: 12px;
          }
          .pi-mnav-tab b { font-size: 17px; }
          .pi-mnav-tab span { font-size: 12px; }
        }
        @media (max-width: 380px) {
          .pi-mnav { padding: 8px 12px; gap: 6px; }
          .pi-mnav-tab-wrap { gap: 6px; }
          .pi-mnav-tab { padding: 10px 6px; border-radius: 10px; }
          .pi-mnav-tab b { font-size: 15px; }
          .pi-mnav-tab span { font-size: 11px; }
        }
      `}</style>

      <nav className="pi-mnav">
        <div className="pi-mnav-tab-wrap">
          {MODULES.map(m => {
            const isActive = current === m.id;
            return (
              <button
                key={m.id}
                className={`pi-mnav-tab${isActive ? ' active' : ''}`}
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
