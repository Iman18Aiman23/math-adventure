import React from 'react';
import { Settings, UserRound } from 'lucide-react';
import { playHoverSound } from '../../utils/soundManager';
import StatsBar from '../_shared/StatsBar';

export const MT_MODULES_T1 = [
  { id: 'nombor-hingga-100', num: 1, labelBM: 'Nombor Hingga 100', labelEN: 'Numbers to 100', c: '#22C55E', cd: '#16A34A', pg: 'transparent' },
  { id: 'tambah-dan-tolak', num: 2, labelBM: 'Tambah dan Tolak', labelEN: 'Addition & Subtraction', c: '#22C55E', cd: '#16A34A', pg: 'transparent' },
  { id: 'pecahan', num: 3, labelBM: 'Pecahan', labelEN: 'Fractions', c: '#22C55E', cd: '#16A34A', pg: 'transparent' },
  { id: 'wang', num: 4, labelBM: 'Wang', labelEN: 'Money', c: '#22C55E', cd: '#16A34A', pg: 'transparent' },
  { id: 'masa-dan-waktu', num: 5, labelBM: 'Masa dan Waktu', labelEN: 'Time', c: '#22C55E', cd: '#16A34A', pg: 'transparent' },
  { id: 'ukuran', num: 6, labelBM: 'Panjang, Jisim & Cecair', labelEN: 'Length, Mass & Volume', c: '#22C55E', cd: '#16A34A', pg: 'transparent' },
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

export default function MatematikModuleNavBar({
  year,
  activeModule,
  onModuleChange,
  onBack,
  onProfile,
  onToggleLanguage,
  theme,
  themes,
  onThemeChange,
  language = 'bm',
}) {
  const isT1 = year === 1;
  const modules = isT1 ? MT_MODULES_T1 : MT_MODULES_T2T3;
  const stripPrefix = (id) => id.replace(/^\d-/, '');
  const current = stripPrefix(activeModule);
  const activeMod = modules.find(m => m.id === current);
  const activeLabel = activeMod ? (language === 'bm' ? activeMod.labelBM : activeMod.labelEN) : '';
  const yearTheme = MT_YEAR_TAB_THEME[year];
  const accent = yearTheme?.c || activeMod?.c || '#3B82F6';
  const accentD = yearTheme?.cd || activeMod?.cd || '#1D4ED8';
  const [isSelectOpen, setIsSelectOpen] = React.useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);
  const settingsRef = React.useRef(null);
  const listboxId = React.useId();

  React.useEffect(() => {
    const handlePointerDown = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        setIsSelectOpen(false);
      }
      if (!settingsRef.current?.contains(event.target)) {
        setIsSettingsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsSelectOpen(false);
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const hasSettings = onToggleLanguage || (themes && onThemeChange);

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
          grid-template-columns: 44px minmax(0, 1fr) max-content;
          align-items: center;
          gap: 8px;
          width: min(1180px, calc(100% - 24px));
          min-height: 54px;
          height: auto;
          margin: 0 auto;
          padding: 8px 10px;
          box-sizing: border-box;
          background: #ffffff;
          border: 3px solid #E6E6E6;
          border-radius: 22px;
          box-shadow: none;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          position: relative;
          z-index: 10;
          overflow: visible;
        }
        .mt-top-back {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 16px;
          border: 3px solid #E6E6E6;
          background: #ffffff;
          color: #707070;
          cursor: pointer;
          flex-shrink: 0;
          padding: 0;
          box-shadow: none;
          transition: transform .16s ease, background .16s ease, border-color .16s ease;
        }
        .mt-top-back:hover {
          transform: translateY(-1px);
          background: #ffffff;
          border-color: var(--accent);
          box-shadow: none;
        }
        .mt-top-back:active { transform: translateY(1px); }
        .mt-top-back:focus-visible {
          outline: 3px solid var(--accent);
          outline-offset: 2px;
        }
        .mt-top-actions {
          grid-column: 3;
          max-width: 100%;
          margin-left: auto;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 4px;
          padding: 3px;
          border: 1px solid #E7EEE4;
          border-radius: 17px;
          background: #F6F9F4;
        }
        .mt-top-stats {
          min-width: 0;
          width: max-content;
          display: flex;
          justify-content: flex-end;
        }
        .mt-top-module {
          grid-column: 2;
          min-width: 0;
          width: min(460px, 100%);
          justify-self: start;
          position: relative;
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
          background: #ffffff;
          border: 3px solid #E6E6E6;
          box-shadow: none;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
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
          box-shadow: none;
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
          color: #1F2937;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-shadow: none;
        }
        .mt-module-brand-sub {
          margin-top: 3px;
          font-family: 'Fredoka', sans-serif;
          font-size: 9px;
          font-weight: 900;
          color: #9AA0AB;
          letter-spacing: .8px;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .mt-top-stats .sb-container { width: auto; max-width: 100%; justify-content: flex-end; }
        .mt-top-stats .sb-mb-wrap { justify-content: flex-end; }
        .mt-top-stats .sb-root { margin-bottom: 0; width: 100%; }
        .mt-top-stats .sb-mb-pill {
          min-height: 34px;
        }
        .mt-top-stats .sb-bundle-btn {
          min-width: 82px;
          min-height: 40px;
          padding: 8px 11px;
          border: 0;
          border-radius: 13px;
          color: #314339;
          background: #FFFFFF;
          box-shadow: 0 1px 0 rgba(53, 83, 62, .07);
        }
        .mt-top-stats .sb-popover {
          right: 0;
        }
        .mt-top-utility {
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          flex: none;
          padding: 0;
          border: 0;
          border-radius: 13px;
          color: #6E776C;
          background: transparent;
          cursor: pointer;
          transition: color .18s ease, background .18s ease, transform .16s ease;
        }
        .mt-top-utility:hover {
          color: var(--accent-d);
          background: color-mix(in srgb, var(--accent) 11%, #fff);
          transform: translateY(-1px);
        }
        .mt-top-utility:active { transform: translateY(1px); }
        .mt-top-utility:focus-visible {
          outline: 3px solid color-mix(in srgb, var(--accent) 55%, #fff);
          outline-offset: 2px;
        }
        .mt-top-settings {
          position: relative;
          display: flex;
        }
        .mt-settings-popover {
          position: absolute;
          top: calc(100% + 11px);
          right: -44px;
          z-index: 40;
          width: 252px;
          padding: 16px;
          border: 1px solid #DEE8DA;
          border-radius: 20px;
          background: rgba(255,255,255,.98);
          box-shadow: 0 18px 42px rgba(48, 82, 57, .16);
          animation: mtMenuDrop .16s ease-out both;
        }
        .mt-settings-heading {
          margin: 0 0 13px;
          color: #344039;
          font-family: 'Baloo 2', 'Fredoka', sans-serif;
          font-size: 16px;
          font-weight: 800;
          line-height: 1;
        }
        .mt-settings-group + .mt-settings-group {
          margin-top: 14px;
          padding-top: 14px;
          border-top: 1px solid #E8EEE5;
        }
        .mt-settings-label {
          display: block;
          margin-bottom: 8px;
          color: #7A8578;
          font-family: 'Fredoka', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
        }
        .mt-settings-languages {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 7px;
          padding: 4px;
          border-radius: 14px;
          background: #F2F6F0;
        }
        .mt-settings-language {
          min-height: 36px;
          border: 0;
          border-radius: 10px;
          color: #687266;
          background: transparent;
          cursor: pointer;
          font-family: 'Fredoka', sans-serif;
          font-size: 12px;
          font-weight: 700;
        }
        .mt-settings-language.active {
          color: #fff;
          background: var(--accent-d);
          box-shadow: 0 4px 10px color-mix(in srgb, var(--accent-d) 24%, transparent);
        }
        .mt-settings-language:focus-visible,
        .mt-settings-swatch:focus-visible {
          outline: 3px solid color-mix(in srgb, var(--accent) 55%, #fff);
          outline-offset: 2px;
        }
        .mt-settings-swatches {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .mt-settings-swatch {
          width: 34px;
          height: 34px;
          padding: 0;
          border: 3px solid #fff;
          border-radius: 11px;
          background: var(--swatch);
          box-shadow: 0 0 0 1px #DDE5DA;
          cursor: pointer;
          transition: transform .16s ease, box-shadow .16s ease;
        }
        .mt-settings-swatch:hover { transform: translateY(-2px); }
        .mt-settings-swatch.active {
          transform: translateY(-1px);
          box-shadow: 0 0 0 3px var(--accent-d);
        }
        @media (min-width: 1181px) {
          .mt-top-module {
            width: min(520px, 100%);
          }
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
          background: #ffffff;
          box-shadow: none;
          border: 3px solid #E6E6E6;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          transition: background .35s ease, border-color .35s ease;
          font-family: 'Fredoka', system-ui, sans-serif;
          position: relative;
          z-index: 1;
        }
        .mt-top-module .mt-mnav-select-wrap {
          display: block;
          width: 100%;
        }
        .mt-top-module .mt-mnav-select-label {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
        }
        .mt-top-module .mt-mnav-select-shell {
          min-height: 44px;
          padding: 5px;
          background: #F7F8FA;
        }
        .mt-top-module .mt-mnav-current-num {
          width: 46px;
          height: 34px;
          font-size: 10px;
          border-radius: 12px;
        }
        .mt-top-module .mt-mnav-select {
          min-height: 34px;
          padding: 7px 10px;
          font-size: 14px;
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
          color: #9AA0AB;
          margin: 0 0 8px 3px;
        }
        .mt-mnav-select-shell {
          min-height: 58px;
          display: flex;
          align-items: center;
          gap: 8px;
          border-radius: 18px;
          padding: 8px;
          background: #F7F8FA;
          border: 3px solid #E6E6E6;
          box-shadow: none;
          transition: border-color .18s ease, background .18s ease;
        }
        .mt-mnav-select-shell.open {
          border-color: var(--accent);
          box-shadow: none;
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
          box-shadow: none;
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
          border: 0;
          border-radius: 14px;
          background: transparent;
          color: #1F2937;
          font-family: 'Fredoka', system-ui, sans-serif;
          font-size: 16px;
          font-weight: 800;
          line-height: 1.2;
          text-align: left;
          padding: 10px 12px;
          cursor: pointer;
          box-shadow: none;
          transition: background .18s ease, border-color .18s ease, transform .16s ease;
        }
        .mt-mnav-select:hover {
          background: #ffffff;
        }
        .mt-mnav-select:active {
          transform: translateY(1px);
        }
        .mt-mnav-select-text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-shadow: none;
        }
        .mt-mnav-select-arrow {
          flex: 0 0 auto;
          color: var(--accent);
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
          border: 3px solid #E6E6E6;
          background: #ffffff;
          box-shadow: none;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
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
          background: #ffffff;
          color: #707070;
          font-family: 'Fredoka', system-ui, sans-serif;
          font-size: 15px;
          font-weight: 750;
          text-align: left;
          cursor: pointer;
          transition: transform .16s ease, background .18s ease, color .18s ease, border-color .18s ease;
        }
        .mt-mnav-menu-option:hover {
          transform: translateY(-1px);
          color: #4A4A4A;
          background: #F7F8FA;
          border-color: #E6E6E6;
        }
        .mt-mnav-menu-option:active {
          transform: translateY(1px);
        }
        .mt-mnav-menu-option.active {
          color: #fff;
          background: var(--accent);
          border-color: var(--accent-d);
          box-shadow: none;
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
          border: 3px solid #E6E6E6;
          background: #ffffff;
          border-radius: 16px;
          padding: 11px 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          line-height: 1.15;
          gap: 2px;
          color: #707070;
          transition: transform .16s ease, border-color .18s ease, color .18s ease, background .18s ease;
          min-width: 64px;
          flex: 1;
          box-shadow: none;
          -webkit-tap-highlight-color: transparent;
        }
        .mt-mnav-tab:not(.active):hover {
          transform: translateY(-2px);
          color: #4A4A4A;
          border-color: #D8D8D8;
          background: #ffffff;
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
          box-shadow: none;
        }
        .mt-mnav-tab.active:active { transform: translateY(2px); }
        .mt-mnav-tab b {
          font-family: 'Fredoka', sans-serif;
          font-weight: 700;
          font-size: 20px;
          color: #9AA0AB;
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
            grid-template-columns: repeat(3, 1fr);
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
            grid-template-columns: 44px minmax(0, 1fr) max-content;
            border-radius: 18px;
            padding: 7px;
          }
          .mt-top-actions {
            grid-column: 3;
            width: auto;
            gap: 0;
            padding: 0;
            border: 0;
            background: transparent;
          }
          .mt-top-utility { display: none; }
          .mt-top-stats .sb-bundle-btn {
            min-width: 86px;
            min-height: 40px;
            border-radius: 17px;
          }
          .mt-mnav {
            display: none;
          }
        }
        @media (max-width: 380px) {
          .mt-top-bar {
            grid-template-columns: 40px minmax(0, 1fr) auto;
            gap: 6px;
          }
          .mt-top-back { width: 40px; height: 40px; border-radius: 14px; }
          .mt-top-module .mt-mnav-current-num { width: 38px; font-size: 9px; }
          .mt-top-module .mt-mnav-select { font-size: 12px; padding-inline: 7px; }
        }
        @media (max-width: 480px) {
          .mt-top-stats .sb-bundle-btn {
            min-width: 40px;
            padding: 8px;
            gap: 0;
          }
          .mt-top-stats .sb-bundle-text {
            display: none;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .mt-top-back,
          .mt-top-utility,
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
        <div className="mt-top-module">
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
        </div>
        <div className="mt-top-actions">
          <div className="mt-top-stats">
            <StatsBar subject="mt" variant="mb" forceBundled />
          </div>
          {hasSettings ? (
            <div className="mt-top-settings" ref={settingsRef}>
              <button
                type="button"
                className="mt-top-utility"
                onClick={() => {
                  playHoverSound();
                  setIsSettingsOpen(open => !open);
                }}
                aria-label={language === 'bm' ? 'Buka tetapan' : 'Open settings'}
                aria-expanded={isSettingsOpen}
                aria-haspopup="dialog"
              >
                <Settings size={22} strokeWidth={2.4} aria-hidden="true" />
              </button>
              {isSettingsOpen ? (
                <div
                  className="mt-settings-popover"
                  role="dialog"
                  aria-label={language === 'bm' ? 'Tetapan' : 'Settings'}
                >
                  <h2 className="mt-settings-heading">{language === 'bm' ? 'Tetapan' : 'Settings'}</h2>
                  {onToggleLanguage ? (
                    <div className="mt-settings-group">
                      <span className="mt-settings-label">{language === 'bm' ? 'Bahasa' : 'Language'}</span>
                      <div className="mt-settings-languages">
                        {['bm', 'eng'].map(lang => (
                          <button
                            key={lang}
                            type="button"
                            className={`mt-settings-language${language === lang ? ' active' : ''}`}
                            onClick={() => {
                              if (language !== lang) onToggleLanguage();
                            }}
                          >
                            {lang === 'bm' ? 'Bahasa Melayu' : 'English'}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  {themes && onThemeChange ? (
                    <div className="mt-settings-group">
                      <span className="mt-settings-label">{language === 'bm' ? 'Tema aplikasi' : 'App theme'}</span>
                      <div className="mt-settings-swatches">
                        {Object.values(themes).map(item => (
                          <button
                            key={item.key}
                            type="button"
                            className={`mt-settings-swatch${theme?.key === item.key ? ' active' : ''}`}
                            style={{ '--swatch': item.swatch }}
                            onClick={() => onThemeChange(item.key)}
                            aria-label={item.label}
                            title={item.label}
                          />
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : null}
          <button
            type="button"
            className="mt-top-utility"
            onClick={() => {
              playHoverSound();
              onProfile?.();
            }}
            aria-label={language === 'bm' ? 'Buka profil' : 'Open profile'}
          >
            <UserRound size={23} strokeWidth={2.4} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
