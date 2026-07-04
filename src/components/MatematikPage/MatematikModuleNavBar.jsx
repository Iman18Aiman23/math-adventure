import React from 'react';
import { playHoverSound } from '../../utils/soundManager';
import StatsBar from '../_shared/StatsBar';

export const MT_MODULES_T1 = [
  { id: 'nombor-hingga-100', num: 1, labelBM: 'Nombor Hingga 100', labelEN: 'Numbers to 100', c: '#3B82F6', cd: '#1D4ED8', pg: 'transparent' },
  { id: 'tambah-dan-tolak', num: 2, labelBM: 'Tambah dan Tolak', labelEN: 'Addition & Subtraction', c: '#3B82F6', cd: '#1D4ED8', pg: 'transparent' },
  { id: 'pecahan', num: 3, labelBM: 'Pecahan', labelEN: 'Fractions', c: '#3B82F6', cd: '#1D4ED8', pg: 'transparent' },
  { id: 'wang', num: 4, labelBM: 'Wang', labelEN: 'Money', c: '#3B82F6', cd: '#1D4ED8', pg: 'transparent' },
  { id: 'masa-dan-waktu', num: 5, labelBM: 'Masa dan Waktu', labelEN: 'Time', c: '#3B82F6', cd: '#1D4ED8', pg: 'transparent' },
];

const MT_MODULES_T2T3 = [
  { id: 'nombor', num: 1, labelBM: 'Nombor & Operasi', labelEN: 'Numbers & Operations', c: '#FF8F3D', cd: '#FF6F00', pg: 'linear-gradient(180deg,#FFF4E6 0%,#FACD94 50%,#E8821A 100%)' },
  { id: 'sukatan', num: 2, labelBM: 'Sukatan & Geometri', labelEN: 'Measurement & Geometry', c: '#36A9F0', cd: '#1A78C7', pg: 'linear-gradient(180deg,#E6F1FB 0%,#9FC9F2 50%,#1E7AC9 100%)' },
  { id: 'statistik', num: 3, labelBM: 'Statistik', labelEN: 'Statistics', c: '#A368F0', cd: '#7038D6', pg: 'linear-gradient(180deg,#F0EBFB 0%,#C3ABF0 50%,#7A4FD0 100%)' },
];

const MT_YEAR_TAB_THEME = {
  2: { c: '#36A9F0', cd: '#1A78C7' },
  3: { c: '#A368F0', cd: '#7038D6' },
};

export function getMtModuleTheme(activeModule, year) {
  const strip = (id) => (id || '').replace(/^\d-/, '');
  const current = strip(activeModule);
  const yearTheme = MT_YEAR_TAB_THEME[year];
  if (yearTheme) {
    return { ...yearTheme, pageGradient: 'transparent' };
  }

  const all = [...MT_MODULES_T1, ...MT_MODULES_T2T3];
  const m = all.find(x => x.id === current);
  return {
    c: m?.c || '#3B82F6',
    cd: m?.cd || '#1D4ED8',
    pageGradient: m?.pg || 'transparent',
  };
}

export default function MatematikModuleNavBar({ year, activeModule, onModuleChange, onBack, language = 'bm' }) {
  const isT1 = year === 1;
  const modules = isT1 ? MT_MODULES_T1 : MT_MODULES_T2T3;
  const stripPrefix = (id) => id.replace(/^\d-/, '');
  const current = stripPrefix(activeModule);
  const activeMod = modules.find(m => m.id === current);
  const activeLabel = activeMod ? (language === 'bm' ? activeMod.labelBM : activeMod.labelEN) : '';
  const yearTheme = MT_YEAR_TAB_THEME[year];
  const accent = yearTheme?.c || activeMod?.c || '#3B82F6';
  const accentD = yearTheme?.cd || activeMod?.cd || '#1D4ED8';
  const tabCount = modules.length;
  const [isSelectOpen, setIsSelectOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);
  const listboxId = React.useId();

  React.useEffect(() => {
    const handlePointerDown = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        setIsSelectOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsSelectOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <header className="mt-module-header" style={{ '--accent': accent, '--accent-d': accentD }}>
      <style>{`
        .mt-module-header {
          flex-shrink: 0;
          background: transparent;
          position: relative;
          z-index: 4;
          padding-top: 10px;
        }
        .mt-top-bar {
          display: grid;
          grid-template-columns: 44px minmax(220px, auto) minmax(0, 1fr);
          align-items: center;
          gap: 10px;
          width: min(1180px, calc(100% - 24px));
          min-height: 62px;
          height: auto;
          margin: 0 auto;
          padding: 9px 12px;
          box-sizing: border-box;
          background:
            linear-gradient(180deg, rgba(255,255,255,.105), rgba(255,255,255,.05)),
            radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--accent) 17%, transparent), transparent 48%);
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 22px;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.16), 0 16px 36px rgba(0,0,0,.24);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          position: relative;
          z-index: 10;
        }
        .mt-top-back {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,.14);
          background: rgba(255,255,255,.08);
          color: #EAF6FF;
          cursor: pointer;
          flex-shrink: 0;
          padding: 0;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.16), 0 8px 18px rgba(0,0,0,.18);
          transition: transform .16s ease, background .16s ease, border-color .16s ease, box-shadow .16s ease;
        }
        .mt-top-back:hover {
          transform: translateY(-1px);
          background: color-mix(in srgb, var(--accent) 18%, rgba(255,255,255,.10));
          border-color: color-mix(in srgb, var(--accent) 42%, rgba(255,255,255,.16));
          box-shadow: inset 0 1px 0 rgba(255,255,255,.18), 0 0 18px color-mix(in srgb, var(--accent) 28%, transparent);
        }
        .mt-top-back:active { transform: translateY(1px); }
        .mt-top-back:focus-visible {
          outline: 3px solid var(--accent);
          outline-offset: 2px;
        }
        .mt-top-stats {
          grid-column: 3;
          min-width: 0;
          margin-left: auto;
          display: flex;
          justify-content: flex-end;
        }
        .mt-module-brand {
          grid-column: 2;
          justify-self: start;
          min-width: 0;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 7px 14px 7px 9px;
          border-radius: 18px;
          background:
            linear-gradient(180deg, rgba(255,255,255,.13), rgba(255,255,255,.055)),
            radial-gradient(circle at 0% 0%, rgba(245,158,11,.25), transparent 55%),
            rgba(7,20,48,.55);
          border: 1px solid rgba(183, 247, 255, .18);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.16), inset 0 -14px 28px rgba(0,0,0,.10), 0 14px 30px rgba(0,0,0,.22);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .mt-module-brand-mark {
          width: 34px;
          height: 34px;
          border-radius: 13px;
          flex: 0 0 auto;
          display: grid;
          place-items: center;
          background:
            radial-gradient(circle at 30% 22%, #FFFFFF 0 12%, transparent 13%),
            linear-gradient(135deg, #FBBF24 0%, var(--accent) 48%, #14B8A6 100%);
          color: #fff;
          font-family: 'Baloo 2', sans-serif;
          font-size: 23px;
          font-weight: 900;
          line-height: 1;
          box-shadow: 0 4px 0 color-mix(in srgb, var(--accent-d) 65%, #000), 0 0 18px color-mix(in srgb, var(--accent) 34%, transparent);
          text-shadow: 0 1px 0 rgba(0,0,0,.22);
        }
        .mt-module-brand-text {
          min-width: 0;
          display: flex;
          flex-direction: column;
          line-height: 1;
        }
        .mt-module-brand-title {
          font-family: 'Baloo 2', sans-serif;
          font-size: clamp(18px, 2.3vw, 23px);
          font-weight: 900;
          color: #EAF6FF;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-shadow: 0 1px 0 rgba(0,0,0,.22);
        }
        .mt-module-brand-sub {
          margin-top: 3px;
          font-family: 'Fredoka', sans-serif;
          font-size: 9px;
          font-weight: 900;
          color: color-mix(in srgb, var(--accent) 38%, #EAF6FF);
          letter-spacing: .8px;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .mt-top-stats .sb-container { width: 100%; justify-content: flex-end; }
        .mt-top-stats .sb-mb-wrap { justify-content: flex-end; }
        .mt-top-stats .sb-root { margin-bottom: 0; width: 100%; }
        .mt-top-stats .sb-mb-pill {
          min-height: 34px;
        }
        .mt-top-stats .sb-bundle-btn {
          min-width: 86px;
        }
        .mt-top-stats .sb-popover {
          right: 0;
        }
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
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: min(1180px, calc(100% - 24px));
          padding: 10px;
          margin: 10px auto 18px;
          border-radius: 22px;
          background:
            linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.035)),
            radial-gradient(circle at 18% 0%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 52%);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.12), 0 16px 34px rgba(0,0,0,.20);
          border: 1px solid rgba(255,255,255,.10);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          transition: background .35s ease, box-shadow .35s ease, border-color .35s ease;
          font-family: 'Fredoka', system-ui, sans-serif;
          position: relative;
          z-index: 1;
        }
        .mt-mnav-tab-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          flex: 1;
        }
        .mt-mnav-select-wrap {
          display: none;
          width: 100%;
          position: relative;
        }
        .mt-mnav-select-label {
          display: block;
          font-family: 'Fredoka', system-ui, sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: color-mix(in srgb, var(--accent) 32%, #EAF6FF);
          margin: 0 0 8px 3px;
        }
        .mt-mnav-select-shell {
          min-height: 58px;
          display: flex;
          align-items: center;
          gap: 8px;
          border-radius: 18px;
          padding: 8px;
          background:
            linear-gradient(180deg, rgba(255,255,255,.13), rgba(255,255,255,.045)),
            radial-gradient(circle at 8% 0%, color-mix(in srgb, var(--accent) 24%, transparent), transparent 58%),
            rgba(6,12,32,.58);
          border: 1px solid color-mix(in srgb, var(--accent) 40%, rgba(255,255,255,.14));
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.18),
            inset 0 -16px 30px rgba(0,0,0,.08),
            0 14px 30px rgba(0,0,0,.23);
          transition: border-color .18s ease, box-shadow .18s ease, background .18s ease;
        }
        .mt-mnav-select-shell.open {
          border-color: color-mix(in srgb, var(--accent) 72%, rgba(255,255,255,.18));
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.20),
            inset 0 -16px 30px rgba(0,0,0,.08),
            0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent),
            0 18px 38px rgba(0,0,0,.30);
        }
        .mt-mnav-current-num {
          width: 46px;
          height: 36px;
          border-radius: 14px;
          flex: 0 0 auto;
          display: grid;
          place-items: center;
          font-family: 'Fredoka', sans-serif;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .02em;
          color: #fff;
          background: linear-gradient(180deg, color-mix(in srgb, var(--accent) 86%, white), var(--accent-d));
          box-shadow: inset 0 1px 0 rgba(255,255,255,.24), 0 4px 0 rgba(0,0,0,.24);
          text-shadow: 0 1px 0 rgba(0,0,0,.18);
        }
        .mt-mnav-select {
          min-height: 40px;
          width: 100%;
          min-width: 0;
          flex: 1 1 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 14px;
          background: transparent;
          color: #fff;
          font-family: 'Fredoka', system-ui, sans-serif;
          font-size: 16px;
          font-weight: 800;
          line-height: 1.2;
          text-align: left;
          padding: 10px 12px;
          cursor: pointer;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.06);
          transition: background .18s ease, border-color .18s ease, transform .16s ease;
        }
        .mt-mnav-select:hover {
          background: rgba(255,255,255,.06);
          border-color: color-mix(in srgb, var(--accent) 32%, rgba(255,255,255,.12));
        }
        .mt-mnav-select:active {
          transform: translateY(1px);
        }
        .mt-mnav-select-text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-shadow: 0 1px 0 rgba(0,0,0,.18);
        }
        .mt-mnav-select-arrow {
          flex: 0 0 auto;
          color: color-mix(in srgb, var(--accent) 38%, #EAF6FF);
          pointer-events: none;
          transition: transform .18s ease;
        }
        .mt-mnav-select[aria-expanded="true"] .mt-mnav-select-arrow {
          transform: rotate(180deg);
        }
        .mt-mnav-select:focus-visible {
          outline: 3px solid var(--accent);
          outline-offset: 3px;
        }
        .mt-mnav-menu {
          position: absolute;
          left: 0;
          right: 0;
          top: calc(100% + 9px);
          z-index: 30;
          display: grid;
          gap: 6px;
          padding: 8px;
          border-radius: 18px;
          border: 1px solid color-mix(in srgb, var(--accent) 34%, rgba(255,255,255,.14));
          background:
            linear-gradient(180deg, rgba(16,29,62,.96), rgba(6,12,32,.96)),
            radial-gradient(circle at 12% 0%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 58%);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.12),
            0 20px 46px rgba(0,0,0,.38);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          animation: mtMenuDrop .16s ease-out both;
        }
        .mt-mnav-menu-option {
          min-height: 46px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          border: 1px solid transparent;
          border-radius: 14px;
          padding: 10px 12px;
          background: rgba(255,255,255,.045);
          color: rgba(234,246,255,.82);
          font-family: 'Fredoka', system-ui, sans-serif;
          font-size: 15px;
          font-weight: 750;
          text-align: left;
          cursor: pointer;
          transition: transform .16s ease, background .18s ease, color .18s ease, border-color .18s ease;
        }
        .mt-mnav-menu-option:hover {
          transform: translateY(-1px);
          color: #fff;
          background: color-mix(in srgb, var(--accent) 18%, rgba(255,255,255,.07));
          border-color: color-mix(in srgb, var(--accent) 34%, rgba(255,255,255,.10));
        }
        .mt-mnav-menu-option:active {
          transform: translateY(1px);
        }
        .mt-mnav-menu-option.active {
          color: #fff;
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--accent) 35%, rgba(255,255,255,.10)), color-mix(in srgb, var(--accent-d) 22%, rgba(255,255,255,.06)));
          border-color: color-mix(in srgb, var(--accent) 54%, rgba(255,255,255,.16));
          box-shadow: inset 0 1px 0 rgba(255,255,255,.16);
        }
        .mt-mnav-menu-option:focus-visible {
          outline: 3px solid var(--accent);
          outline-offset: 2px;
        }
        .mt-mnav-menu-check {
          flex: 0 0 auto;
          color: color-mix(in srgb, var(--accent) 28%, #fff);
          opacity: .95;
        }
        @keyframes mtMenuDrop {
          from { opacity: 0; transform: translateY(-6px) scale(.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .mt-mnav-tab {
          font-family: 'Fredoka', sans-serif;
          font-weight: 900;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,.10);
          background:
            linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.035));
          border-radius: 16px;
          padding: 11px 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          line-height: 1.15;
          gap: 2px;
          color: rgba(234,246,255,.58);
          transition: transform .16s ease, border-color .18s ease, color .18s ease, box-shadow .18s ease, background .18s ease;
          min-width: 64px;
          flex: 1;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.08);
          -webkit-tap-highlight-color: transparent;
        }
        .mt-mnav-tab:not(.active):hover {
          transform: translateY(-2px);
          color: #EAF6FF;
          border-color: color-mix(in srgb, var(--tcd) 42%, rgba(255,255,255,.16));
          background:
            linear-gradient(180deg, rgba(255,255,255,.12), rgba(255,255,255,.045));
        }
        .mt-mnav-tab:active { transform: translateY(2px); }
        .mt-mnav-tab:focus-visible {
          outline: 3px solid var(--tcd);
          outline-offset: 2px;
        }
        .mt-mnav-tab.active {
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--tc) 88%, white), var(--tc));
          border-color: var(--tcd);
          color: #fff;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.22), 0 4px 0 rgba(0,0,0,.28), 0 0 22px color-mix(in srgb, var(--tc) 42%, transparent);
        }
        .mt-mnav-tab.active:active { transform: translateY(2px); }
        .mt-mnav-tab b {
          font-family: 'Fredoka', sans-serif;
          font-weight: 700;
          font-size: 20px;
          color: rgba(234,246,255,.48);
          font-variant-numeric: tabular-nums;
        }
        .mt-mnav-tab span {
          font-family: 'Fredoka', sans-serif;
          font-size: 13px;
          font-weight: 700;
          white-space: nowrap;
        }
        .mt-mnav-tab.active b,
        .mt-mnav-tab.active span {
          color: #fff;
          text-shadow: 1px 2px 0 rgba(0,0,0,.15);
        }

        @media (max-width: 1024px) {
          .mt-module-header { padding-top: 8px; }
          .mt-top-bar,
          .mt-mnav { width: min(860px, calc(100% - 20px)); }
          .mt-mnav { padding: 10px; gap: 8px; }
          .mt-mnav-tab-wrap {
            display: grid;
            grid-template-columns: repeat(${tabCount === 5 ? 3 : 3}, 1fr);
            column-gap: 8px;
            row-gap: 10px;
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
        @media (max-width: 840px) {
          .mt-top-bar {
            width: calc(100% - 16px);
            grid-template-columns: 44px minmax(0, 1fr) auto;
            border-radius: 18px;
            padding: 8px;
          }
          .mt-module-brand {
            grid-column: 2;
            justify-self: center;
            max-width: min(250px, 54vw);
            padding: 7px 12px 7px 9px;
          }
          .mt-module-brand-title {
            font-size: clamp(17px, 4.4vw, 22px);
          }
          .mt-module-brand-sub {
            font-size: 8px;
            letter-spacing: .6px;
          }
          .mt-top-stats {
            grid-column: 3;
            width: auto;
          }
          .mt-top-stats .sb-bundle-btn {
            min-width: 86px;
            min-height: 40px;
            border-radius: 17px;
          }
          .mt-mnav {
            width: calc(100% - 16px);
            margin-top: 8px;
            margin-bottom: 12px;
            border-radius: 18px;
            overflow: visible;
            justify-content: stretch;
            padding: 8px;
          }
          .mt-mnav-tab-wrap {
            display: none;
          }
          .mt-mnav-select-wrap {
            display: block;
          }
        }
        @media (max-width: 380px) {
          .mt-module-brand {
            max-width: min(220px, 50vw);
            gap: 7px;
            padding-right: 9px;
          }
          .mt-module-brand-mark {
            width: 30px;
            height: 30px;
            border-radius: 11px;
            font-size: 20px;
          }
          .mt-module-brand-sub { display: none; }
          .mt-mnav { padding: 7px; gap: 6px; }
          .mt-mnav-tab-wrap { gap: 7px; }
          .mt-mnav-tab {
            padding: 10px 5px;
            border-radius: 10px;
          }
          .mt-mnav-tab b { font-size: 14px; }
          .mt-mnav-tab span { font-size: 9px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .mt-top-back,
          .mt-mnav-select,
          .mt-mnav-select-arrow,
          .mt-mnav-select-shell,
          .mt-mnav-menu-option,
          .mt-mnav-tab {
            transition: none !important;
          }
          .mt-mnav-menu {
            animation: none !important;
          }
          .mt-mnav-tab:not(.active):hover {
            transform: none;
          }
          .mt-mnav-menu-option:hover {
            transform: none;
          }
        }
      `}</style>

      <div className="mt-top-bar">
        <button
          type="button"
          className="mt-top-back"
          onClick={onBack}
          aria-label={language === 'bm' ? 'Kembali ke pilih tahun' : 'Back to year selection'}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="mt-module-brand" aria-label="Math Buddies">
          <div className="mt-module-brand-mark" aria-hidden="true">+</div>
          <div className="mt-module-brand-text">
            <div className="mt-module-brand-title">Math Buddies</div>
            <div className="mt-module-brand-sub">Iman Math Playground</div>
          </div>
        </div>
        <div className="mt-top-stats">
          <StatsBar subject="mt" variant="mb" />
        </div>
      </div>
      <nav className="mt-mnav" aria-label={language === 'bm' ? 'Modul Matematik' : 'Math modules'}>
        <div className="mt-mnav-select-wrap" ref={dropdownRef}>
          <label className="mt-mnav-select-label" htmlFor="mt-module-select">
            {language === 'bm' ? 'Pilih Modul' : 'Choose Module'}
          </label>
          <div className={`mt-mnav-select-shell${isSelectOpen ? ' open' : ''}`}>
            <span className="mt-mnav-current-num" aria-hidden="true">
              {language === 'bm' ? 'Modul' : 'Module'}
            </span>
            <button
              type="button"
              id="mt-module-select"
              className="mt-mnav-select"
              aria-haspopup="listbox"
              aria-expanded={isSelectOpen}
              aria-controls={listboxId}
              onClick={() => {
                playHoverSound();
                setIsSelectOpen(open => !open);
              }}
              aria-label={language === 'bm' ? 'Pilih modul Matematik' : 'Choose math module'}
            >
              <span className="mt-mnav-select-text">{activeLabel || (language === 'bm' ? 'Pilih modul' : 'Choose module')}</span>
              <svg className="mt-mnav-select-arrow" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
          {isSelectOpen && (
            <div
              id={listboxId}
              className="mt-mnav-menu"
              role="listbox"
              aria-label={language === 'bm' ? 'Senarai modul Matematik' : 'Math module list'}
            >
              {modules.map(m => {
                const isActive = current === m.id;
                const label = language === 'bm' ? m.labelBM : m.labelEN;
                return (
                  <button
                    key={m.id}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    className={`mt-mnav-menu-option${isActive ? ' active' : ''}`}
                    onClick={() => {
                      setIsSelectOpen(false);
                      if (!isActive) {
                        playHoverSound();
                        onModuleChange?.(year === 1 ? m.id : `${year}-${m.id}`);
                      }
                    }}
                  >
                    <span>{label}</span>
                    {isActive && (
                      <svg className="mt-mnav-menu-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <div className="mt-mnav-tab-wrap">
          {modules.map(m => {
            const isActive = current === m.id;
            const tabAccent = yearTheme?.c || m.c;
            const tabAccentD = yearTheme?.cd || m.cd;
            return (
              <button
                key={m.id}
                className={`mt-mnav-tab${isActive ? ' active' : ''}`}
                style={{ '--tc': tabAccent, '--tcd': tabAccentD }}
                onClick={() => {
                  if (!isActive) {
                    playHoverSound();
                    onModuleChange?.(year === 1 ? m.id : `${year}-${m.id}`);
                  }
                }}
                type="button"
                aria-current={isActive ? 'page' : undefined}
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
