import React, { useEffect, useRef } from 'react';
import MatematikModuleNavBar, { getMtModuleTheme } from './MatematikModuleNavBar';

export default function MatematikModulePage({ year, activeModule, onModuleChange, onBack, onSelectTopic, children, language }) {
  const contentRef = useRef(null);
  const theme = getMtModuleTheme(activeModule, year);

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [activeModule]);

  return (
    <div
      className={`mt-module-page mt-module-page--mission mt-module-page--y${year}`}
      style={{ '--mt-accent': theme.c, '--mt-accent-d': theme.cd }}
    >
      <MatematikModuleNavBar
        year={year}
        activeModule={activeModule}
        onModuleChange={onModuleChange}
        onBack={onBack}
        language={language}
      />
      <main className="mt-module-content" ref={contentRef}>
        {React.isValidElement(children)
          ? React.cloneElement(children, { language, onSelectTopic })
          : children}
      </main>
      <style>{`
        .mt-module-page {
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 0;
          overflow: hidden;
          isolation: isolate;
          position: relative;
          color: #1F2937;
          background:
            radial-gradient(circle at 12% 4%, rgba(88, 204, 2, .09), transparent 24rem),
            radial-gradient(circle at 90% 34%, rgba(88, 204, 2, .055), transparent 20rem),
            #F7FDF6;
        }
        .mt-module-page::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          opacity: .32;
          background-image: radial-gradient(rgba(76, 139, 46, .16) .8px, transparent .8px);
          background-size: 20px 20px;
          mask-image: linear-gradient(180deg, #000, transparent 66%);
        }
        .mt-module-header,
        .mt-module-content { position: relative; }
        .mt-module-header {
          z-index: 10;
          flex-shrink: 0;
          padding: 14px clamp(14px, 2.4vw, 30px) 0 !important;
          background: linear-gradient(180deg, rgba(247,253,246,.98), rgba(247,253,246,.82)) !important;
        }
        .mt-module-page .mt-top-bar {
          width: min(1460px, 100%) !important;
          min-height: 60px !important;
          margin: 0 auto !important;
          padding: 7px 10px !important;
          border: 1px solid #DDE9D9 !important;
          border-radius: 22px !important;
          background: rgba(255,255,255,.92) !important;
          box-shadow: 0 12px 34px rgba(73, 125, 50, .09) !important;
          backdrop-filter: blur(14px) !important;
          -webkit-backdrop-filter: blur(14px) !important;
        }
        .mt-module-page .mt-top-back {
          border: 1px solid #DCE8D8 !important;
          border-radius: 15px !important;
          color: #52614E !important;
          box-shadow: 0 3px 0 #DCE8D8 !important;
        }
        .mt-module-page .mt-top-back:hover {
          color: var(--mt-accent-d) !important;
          border-color: color-mix(in srgb, var(--mt-accent) 50%, #DCE8D8) !important;
          transform: translateY(-2px) !important;
        }
        .mt-module-page .mt-top-back:active {
          box-shadow: none !important;
          transform: translateY(2px) !important;
        }
        .mt-module-page .mt-mnav-select-shell {
          border: 0 !important;
          background: #F6FAF4 !important;
          box-shadow: none !important;
        }
        .mt-module-page .mt-mnav-current-num {
          color: #fff !important;
          background: linear-gradient(180deg, #74D839, var(--mt-accent)) !important;
          box-shadow: 0 3px 0 var(--mt-accent-d) !important;
        }
        .mt-module-page .mt-mnav-select { color: #273126 !important; }
        .mt-module-page .mt-mnav-select-arrow { color: var(--mt-accent-d) !important; }
        .mt-module-page .mt-mnav-menu {
          border: 1px solid #DCE8D8 !important;
          border-radius: 20px !important;
          box-shadow: 0 20px 45px rgba(56, 100, 37, .16) !important;
        }
        .mt-module-page .mt-mnav-menu-option.active {
          color: var(--mt-accent-d) !important;
          background: #EFFAE9 !important;
        }
        .mt-module-content {
          z-index: 1;
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;
          container: mt-module / inline-size;
        }
        .mt-module-content .pi-mhub-page,
        .mt-module-content .pi-mhub-page.has-dashboard {
          width: 100% !important;
          max-width: none !important;
          min-height: auto !important;
          margin: 0 !important;
          padding: clamp(22px, 3vw, 38px) clamp(16px, 3vw, 34px) 70px !important;
          color: #1F2937 !important;
          background: transparent !important;
          font-family: 'Fredoka', system-ui, sans-serif !important;
        }
        .mt-module-content .pi-mhub-dashboard {
          width: min(1460px, 100%) !important;
          margin: 0 auto !important;
          display: grid !important;
          grid-template-columns: minmax(220px, 280px) minmax(440px, 1fr) minmax(220px, 260px) !important;
          align-items: start !important;
          gap: clamp(18px, 2vw, 28px) !important;
          font-family: 'Fredoka', system-ui, sans-serif !important;
        }

        .mt-module-content .pi-mhub-coach,
        .mt-module-content .pi-mhub-insights {
          position: sticky;
          top: 24px;
        }
        .mt-module-content .pi-mhub-coach {
          grid-column: 1;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          padding: 24px 20px 20px;
          border: 1px solid #DDEAD8;
          border-radius: 30px;
          background: rgba(255,255,255,.94);
          box-shadow: 0 18px 48px rgba(66, 115, 44, .11);
          overflow: hidden;
        }
        .mt-module-content .pi-mhub-coach::before {
          content: "";
          position: absolute;
          width: 180px;
          height: 180px;
          top: -72px;
          right: -62px;
          border-radius: 50%;
          background: #EAF8E4;
          pointer-events: none;
        }
        .mt-module-content .pi-mhub-coach-main {
          display: flex;
          flex-direction: column;
        }
        .mt-module-content .pi-mhub-progress-stage { display: contents; }
        .mt-module-content .pi-mhub-coach-art {
          order: -1;
          height: 164px;
          display: grid;
          place-items: center;
          position: relative;
          z-index: 1;
          margin: -8px 0 4px;
        }
        .mt-module-content .pi-mhub-coach-art svg {
          width: 170px !important;
          height: 170px !important;
          filter: drop-shadow(0 14px 18px rgba(55, 110, 30, .16)) !important;
          animation: mt-coach-float 4s ease-in-out infinite;
        }
        .mt-module-content .pi-mhub-coach-kicker,
        .mt-module-content .pi-mhub-path-kicker {
          color: var(--mt-accent-d);
          font-weight: 800;
          font-size: 11px;
          letter-spacing: .12em;
          text-transform: uppercase;
        }
        .mt-module-content .pi-mhub-coach h2 {
          margin: 6px 0 18px;
          color: #1F2937;
          font-family: 'Baloo 2', 'Fredoka', sans-serif;
          font-size: clamp(24px, 2vw, 30px);
          font-weight: 800;
          line-height: 1.05;
          text-wrap: balance;
        }
        .mt-module-content .pi-mhub-progress-label {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          color: #677064;
          font-size: 13px;
          font-weight: 700;
        }
        .mt-module-content .pi-mhub-progress-label strong {
          color: var(--mt-accent-d);
          font-variant-numeric: tabular-nums;
        }
        .mt-module-content .pi-mhub-progress-track {
          height: 12px;
          margin-top: 9px;
          padding: 2px;
          border-radius: 999px;
          background: #E7EFE3;
          overflow: hidden;
        }
        .mt-module-content .pi-mhub-progress-track span {
          display: block;
          height: 100%;
          min-width: 4px;
          border-radius: inherit;
          background: linear-gradient(90deg, #8EEB52, var(--mt-accent));
          box-shadow: 0 0 14px rgba(88,204,2,.35);
          transition: width .7s ease;
        }
        .mt-module-content .pi-mhub-ring-value { display: none; }
        .mt-module-content .pi-mhub-continue {
          min-height: 50px;
          margin-top: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px 16px;
          border: 0;
          border-radius: 16px;
          color: #fff;
          background: linear-gradient(180deg, #76D93B, var(--mt-accent));
          box-shadow: 0 5px 0 var(--mt-accent-d), 0 14px 24px rgba(88,204,2,.2);
          cursor: pointer;
          font-family: 'Baloo 2', 'Fredoka', sans-serif;
          font-size: 16px;
          font-weight: 800;
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .mt-module-content .pi-mhub-continue:hover {
          transform: translateY(-2px);
          box-shadow: 0 7px 0 var(--mt-accent-d), 0 18px 30px rgba(88,204,2,.24);
        }
        .mt-module-content .pi-mhub-continue:active {
          transform: translateY(4px);
          box-shadow: 0 1px 0 var(--mt-accent-d);
        }
        .mt-module-content .pi-mhub-continue:focus-visible,
        .mt-module-content .pi-mhub-lesson-head:focus-visible,
        .mt-module-content .pi-mhub-lesson-button:focus-visible,
        .mt-module-content .pi-mhub-bottom-item:focus-visible {
          outline: 3px solid color-mix(in srgb, var(--mt-accent) 48%, #1F2937);
          outline-offset: 3px;
        }
        .mt-module-content .pi-mhub-coach-summary {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-top: 20px;
        }
        .mt-module-content .pi-mhub-coach-summary span {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 1px;
          padding: 10px;
          border-radius: 14px;
          background: #F4F9F1;
          color: #7A8476;
          font-size: 11px;
          font-weight: 700;
          text-align: center;
        }
        .mt-module-content .pi-mhub-coach-summary strong {
          color: #263224;
          font-size: 18px;
          font-variant-numeric: tabular-nums;
        }
        .mt-module-content .pi-mhub-motivation {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          margin: 16px 0 0;
          padding: 12px;
          border-radius: 14px;
          color: #5D6B58;
          background: #FFF9DF;
          font-size: 12px;
          font-weight: 600;
          line-height: 1.4;
        }
        .mt-module-content .pi-mhub-motivation svg {
          flex: none;
          color: #F5B301;
          fill: #FFD84D;
        }

        .mt-module-content .pi-mhub-center { grid-column: 2; min-width: 0; }
        .mt-module-content .pi-mhub-center .pi-mhub-banner {
          width: 100% !important;
          max-width: none !important;
          min-height: 184px;
          display: grid !important;
          grid-template-columns: minmax(0, 1fr) 88px;
          align-items: center;
          gap: 20px !important;
          margin: 0 0 26px !important;
          padding: clamp(26px, 4vw, 42px) !important;
          border: 1px solid #DCE9D8 !important;
          border-radius: 30px !important;
          color: #1F2937 !important;
          background:
            radial-gradient(circle at 88% 18%, rgba(88,204,2,.18), transparent 18%),
            linear-gradient(135deg, #FFFFFF 0%, #F0FAEC 100%) !important;
          box-shadow: 0 18px 48px rgba(66, 115, 44, .09) !important;
          overflow: hidden;
        }
        .mt-module-content .pi-mhub-banner-text { min-width: 0; }
        .mt-module-content .pi-mhub-banner-kicker {
          color: var(--mt-accent-d) !important;
          font-size: 12px !important;
          font-weight: 800 !important;
          letter-spacing: .12em !important;
          text-shadow: none !important;
        }
        .mt-module-content .pi-mhub-banner-name {
          margin-top: 7px;
          color: #1F2937 !important;
          font-family: 'Baloo 2', 'Fredoka', sans-serif !important;
          font-size: clamp(34px, 4vw, 52px) !important;
          font-weight: 800 !important;
          line-height: .98 !important;
          letter-spacing: -.025em !important;
          text-shadow: none !important;
          text-wrap: balance;
        }
        .mt-module-content .pi-mhub-banner-lead {
          max-width: 58ch;
          margin: 13px 0 0;
          color: #667064;
          font-size: clamp(14px, 1.5vw, 17px);
          font-weight: 600;
          line-height: 1.5;
          text-wrap: pretty;
        }
        .mt-module-content .pi-mhub-banner-badge {
          grid-column: 2;
          grid-row: 1;
          width: 76px !important;
          height: 76px !important;
          justify-self: end;
          border-radius: 25px !important;
          color: #fff !important;
          background: linear-gradient(180deg, #80E34A, var(--mt-accent)) !important;
          box-shadow: 0 7px 0 var(--mt-accent-d), 0 18px 28px rgba(88,204,2,.2) !important;
          font-family: 'Baloo 2', sans-serif;
          font-size: 38px !important;
          font-weight: 800;
          transform: rotate(3deg);
        }

        .mt-module-content .pi-mhub-path {
          padding: clamp(22px, 3vw, 32px);
          border: 1px solid #DFEBDD;
          border-radius: 30px;
          background: rgba(255,255,255,.8);
          box-shadow: 0 18px 46px rgba(66, 115, 44, .075);
        }
        .mt-module-content .pi-mhub-path-heading {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 26px;
          padding-bottom: 20px;
          border-bottom: 1px solid #E5EEE2;
        }
        .mt-module-content .pi-mhub-path-heading h2 {
          margin: 5px 0 0;
          color: #1F2937;
          font-family: 'Baloo 2', 'Fredoka', sans-serif;
          font-size: clamp(25px, 2.7vw, 34px);
          font-weight: 800;
          line-height: 1.05;
        }
        .mt-module-content .pi-mhub-path-count {
          min-width: 62px;
          padding: 8px 13px;
          border-radius: 999px;
          color: var(--mt-accent-d);
          background: #EDF9E7;
          font-size: 13px;
          font-weight: 800;
          text-align: center;
          font-variant-numeric: tabular-nums;
        }
        .mt-module-content .pi-mhub-sections {
          counter-reset: mt-path;
          display: grid !important;
          gap: 26px !important;
        }
        .mt-module-content .pi-mhub-lesson-card {
          counter-increment: mt-path;
          width: 100%;
          display: block !important;
          position: relative;
          padding-left: 48px;
          border: 0 !important;
          border-radius: 0 !important;
          background: transparent !important;
          box-shadow: none !important;
          overflow: visible !important;
        }
        .mt-module-content .pi-mhub-lesson-card::before {
          content: counter(mt-path);
          position: absolute;
          top: 4px;
          left: 0;
          z-index: 2;
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border: 4px solid #fff;
          border-radius: 50%;
          color: #fff;
          background: var(--mt-accent);
          box-shadow: 0 0 0 2px #CDEABE, 0 6px 13px rgba(88,204,2,.18);
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
        }
        .mt-module-content .pi-mhub-lesson-card:not(:last-child)::after {
          content: "";
          position: absolute;
          top: 40px;
          bottom: -28px;
          left: 20px;
          width: 3px;
          border-radius: 999px;
          background: repeating-linear-gradient(180deg, #CDEABE 0 9px, transparent 9px 15px);
        }
        .mt-module-content .pi-mhub-lesson-head {
          width: 100%;
          height: auto !important;
          min-height: 0 !important;
          display: grid !important;
          grid-template-columns: minmax(0, 1fr) 42px !important;
          grid-template-rows: auto !important;
          align-items: center !important;
          justify-items: stretch !important;
          gap: 14px !important;
          margin: 0 0 12px;
          padding: 0 0 2px !important;
          border: 0 !important;
          border-radius: 0 !important;
          color: #1F2937 !important;
          background: transparent !important;
          box-shadow: none !important;
          cursor: pointer !important;
          text-align: left !important;
        }
        .mt-module-content .pi-mhub-lesson-robot { display: none !important; }
        .mt-module-content .pi-mhub-lesson-copy {
          width: auto !important;
          min-width: 0;
          display: block !important;
          margin: 0 !important;
        }
        .mt-module-content .pi-mhub-lesson-title {
          min-height: 0 !important;
          display: block !important;
          margin: 0 0 4px !important;
          padding: 0 !important;
          border-radius: 0 !important;
          color: #263224 !important;
          background: transparent !important;
          box-shadow: none !important;
          font-family: 'Baloo 2', 'Fredoka', sans-serif !important;
          font-size: clamp(21px, 2vw, 27px) !important;
          font-weight: 800 !important;
          line-height: 1.08 !important;
          text-align: left !important;
        }
        .mt-module-content .pi-mhub-lesson-desc {
          display: block !important;
          max-width: 60ch !important;
          margin: 0 !important;
          color: #7A8476 !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          line-height: 1.4 !important;
          text-align: left !important;
        }
        .mt-module-content .pi-mhub-expand {
          width: 40px !important;
          height: 40px !important;
          display: grid !important;
          place-items: center;
          justify-self: end;
          border-radius: 14px !important;
          color: var(--mt-accent-d) !important;
          background: #EFF9EA !important;
          transition: transform .25s ease, background .2s ease !important;
        }
        .mt-module-content .pi-mhub-lesson-card:not(.is-open) .pi-mhub-expand { transform: rotate(180deg); }
        .mt-module-content .pi-mhub-lesson-panel {
          display: grid !important;
          grid-template-rows: 0fr !important;
          transition: grid-template-rows .3s ease !important;
        }
        .mt-module-content .pi-mhub-lesson-card.is-open .pi-mhub-lesson-panel { grid-template-rows: 1fr !important; }
        .mt-module-content .pi-mhub-lesson-panel-inner {
          height: auto !important;
          min-height: 0 !important;
          overflow: hidden !important;
        }
        .mt-module-content .pi-mhub-lesson-list,
        .mt-module-content .pi-mhub-lesson-card.is-open .pi-mhub-lesson-list {
          height: auto !important;
          display: grid !important;
          container: mt-actions / inline-size;
          gap: 11px !important;
          padding: 0 !important;
          opacity: 1 !important;
          transform: none !important;
        }
        .mt-module-content .pi-mhub-lesson-button,
        .mt-module-content .pi-mhub-lesson-button--no-score {
          width: 100%;
          min-height: 84px !important;
          display: grid !important;
          grid-template-columns: 48px minmax(0, 1fr) max-content 76px 38px !important;
          align-items: center;
          gap: 13px !important;
          padding: 13px 14px !important;
          border: 1px solid #E0EAE0 !important;
          border-left: 1px solid #E0EAE0 !important;
          border-radius: 22px !important;
          color: #273126 !important;
          background: #fff !important;
          box-shadow: 0 6px 18px rgba(66, 115, 44, .065) !important;
          text-align: left;
          transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease !important;
        }
        .mt-module-content .pi-mhub-lesson-button:hover {
          z-index: 2;
          border-color: color-mix(in srgb, var(--mt-accent) 52%, #DDE8D9) !important;
          box-shadow: 0 12px 24px rgba(66, 115, 44, .11) !important;
          transform: translateY(-3px) !important;
        }
        .mt-module-content .pi-mhub-lesson-button:active { transform: translateY(1px) scale(.995) !important; }
        .mt-module-content .pi-mhub-lesson-button.is-current {
          min-height: 98px !important;
          border: 2px solid var(--mt-accent) !important;
          background: linear-gradient(90deg, #F2FCEB, #FFFFFF 46%) !important;
          box-shadow: 0 12px 28px rgba(88,204,2,.14) !important;
        }
        .mt-module-content .pi-mhub-lesson-button[data-status="passed"] {
          border-color: #BDE7A9 !important;
          background: linear-gradient(90deg, #F0FAEC, #FFFFFF 48%) !important;
        }
        .mt-module-content .pi-mhub-lesson-button:disabled {
          opacity: .62 !important;
          filter: grayscale(.55) !important;
          cursor: not-allowed !important;
          background: #F0F2EF !important;
          box-shadow: none !important;
        }
        .mt-module-content .pi-mhub-lesson-button:disabled:hover { transform: none !important; }
        .mt-module-content .pi-mhub-lesson-icon {
          width: 46px !important;
          height: 46px !important;
          display: grid;
          place-items: center;
          border-radius: 16px !important;
          color: var(--mt-accent-d) !important;
          background: #EEF9E9 !important;
        }
        .mt-module-content .pi-mhub-lesson-button[data-status="passed"] .pi-mhub-lesson-icon {
          color: #fff !important;
          background: var(--mt-accent) !important;
        }
        .mt-module-content .pi-mhub-lesson-details {
          min-width: 0;
          display: grid;
          gap: 3px;
        }
        .mt-module-content .pi-mhub-lesson-name {
          color: #263224 !important;
          font-family: 'Baloo 2', 'Fredoka', sans-serif !important;
          font-size: 18px !important;
          font-weight: 800 !important;
          line-height: 1.12 !important;
        }
        .mt-module-content .pi-mhub-lesson-meta {
          max-width: 48ch;
          overflow: hidden;
          color: #7A8476;
          font-size: 12px;
          font-weight: 600;
          line-height: 1.3;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .mt-module-content .pi-mhub-difficulty {
          width: max-content;
          margin-top: 2px;
          color: #78926C;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .06em;
          text-transform: uppercase;
        }
        .mt-module-content .pi-mhub-status {
          min-height: 29px !important;
          padding: 5px 11px !important;
          border-radius: 999px !important;
          font-size: 11px !important;
          font-weight: 800 !important;
          white-space: nowrap;
        }
        .mt-module-content .pi-mhub-status--passed { color: #15803D !important; background: #DCFCE7 !important; border-color: #86EFAC !important; }
        .mt-module-content .pi-mhub-status--failed { color: #C2413A !important; background: #FFF0EF !important; border-color: #F7B8B3 !important; }
        .mt-module-content .pi-mhub-status--unplayed { color: #71806C !important; background: #F3F6F1 !important; border-color: #E0E8DD !important; }
        .mt-module-content .pi-mhub-completion {
          color: #6D7B68;
          font-size: 10px;
          font-weight: 800;
          text-align: center;
          text-transform: uppercase;
        }
        .mt-module-content .pi-mhub-lesson-button.is-current .pi-mhub-completion,
        .mt-module-content .pi-mhub-lesson-button[data-status="passed"] .pi-mhub-completion { color: var(--mt-accent-d); }
        .mt-module-content .pi-mhub-row-chevron {
          width: 36px !important;
          height: 36px !important;
          display: grid;
          place-items: center;
          justify-self: end;
          border-radius: 50% !important;
          color: var(--mt-accent-d) !important;
          background: #EEF9E9 !important;
        }
        .mt-module-content .pi-mhub-progress-strip {
          min-height: 62px !important;
          margin-top: 22px;
          padding: 12px 18px !important;
          border: 1px solid #F4DEA0 !important;
          border-radius: 20px !important;
          color: #7E681D !important;
          background: #FFF9DF !important;
          font-size: 13px !important;
          line-height: 1.35;
        }
        .mt-module-content .pi-mhub-progress-left { gap: 12px !important; }
        .mt-module-content .pi-mhub-progress-left svg { color: #F5B301 !important; fill: #FFD84D !important; }

        .mt-module-content .pi-mhub-insights {
          grid-column: 3;
          display: grid;
          gap: 13px;
        }
        .mt-module-content .pi-mhub-side-card {
          border: 1px solid #DFEBDD;
          border-radius: 22px;
          padding: 17px;
          background: rgba(255,255,255,.94);
          box-shadow: 0 12px 30px rgba(66, 115, 44, .075);
        }
        .mt-module-content .pi-mhub-side-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 13px;
          color: #354032;
          font-family: 'Baloo 2', 'Fredoka', sans-serif;
          font-size: 15px;
          font-weight: 800;
        }
        .mt-module-content .pi-mhub-side-heading svg { color: var(--mt-accent-d); }
        .mt-module-content .pi-mhub-goal-card > strong { display: block; color: #354032; font-size: 14px; }
        .mt-module-content .pi-mhub-goal-card p { margin: 5px 0 0; color: #7A8476; font-size: 11px; line-height: 1.4; }
        .mt-module-content .pi-mhub-week-dots { display: grid; grid-template-columns: repeat(7, 1fr); gap: 5px; }
        .mt-module-content .pi-mhub-week-dots span { height: 24px; border-radius: 8px; background: #EAF0E7; }
        .mt-module-content .pi-mhub-week-dots span.is-done { background: linear-gradient(180deg, #8EEB52, var(--mt-accent)); }
        .mt-module-content .pi-mhub-week-card > small { display: block; margin-top: 8px; color: #84907F; font-size: 10px; text-align: right; }
        .mt-module-content .pi-mhub-achievement-card { display: flex; align-items: center; gap: 12px; }
        .mt-module-content .pi-mhub-achievement-icon {
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          flex: none;
          border-radius: 15px;
          color: #B47700;
          background: #FFF4CA;
        }
        .mt-module-content .pi-mhub-achievement-card > span:last-child { display: grid; gap: 1px; }
        .mt-module-content .pi-mhub-achievement-card small { color: #7A8476; font-size: 10px; font-weight: 700; }
        .mt-module-content .pi-mhub-achievement-card strong { color: #273126; font-size: 20px; }
        .mt-module-content .pi-mhub-activity-card strong {
          display: block;
          overflow: hidden;
          color: #53604F;
          font-size: 12px;
          line-height: 1.35;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .mt-module-content .pi-mhub-bottom-nav { display: none; }

        @container mt-module (max-width: 920px) {
          .mt-module-content .pi-mhub-dashboard {
            grid-template-columns: minmax(210px, 250px) minmax(0, 1fr) !important;
          }
          .mt-module-content .pi-mhub-coach { grid-column: 1; grid-row: 1; }
          .mt-module-content .pi-mhub-center { grid-column: 2; grid-row: 1 / span 2; }
          .mt-module-content .pi-mhub-insights {
            grid-column: 1;
            grid-row: 2;
            position: static;
          }
          .mt-module-content .pi-mhub-goal-card,
          .mt-module-content .pi-mhub-week-card,
          .mt-module-content .pi-mhub-activity-card { display: none; }
          .mt-module-content .pi-mhub-lesson-button,
          .mt-module-content .pi-mhub-lesson-button--no-score {
            grid-template-columns: 46px minmax(0, 1fr) max-content 36px !important;
          }
        }

        @container mt-module (max-width: 800px) {
          .mt-module-content .pi-mhub-page.has-dashboard { padding-inline: 20px !important; }
          .mt-module-content .pi-mhub-dashboard { grid-template-columns: 1fr !important; gap: 18px !important; }
          .mt-module-content .pi-mhub-coach {
            grid-column: 1;
            grid-row: 1;
            position: relative;
            display: grid;
            grid-template-columns: minmax(0, 1fr) 180px;
            align-items: center;
            column-gap: 22px;
          }
          .mt-module-content .pi-mhub-coach-main,
          .mt-module-content .pi-mhub-progress-stage { display: contents; }
          .mt-module-content .pi-mhub-coach-art { order: initial; }
          .mt-module-content .pi-mhub-coach-art { grid-column: 2; grid-row: 1 / span 5; }
          .mt-module-content .pi-mhub-coach-kicker,
          .mt-module-content .pi-mhub-coach h2,
          .mt-module-content .pi-mhub-coach-progress,
          .mt-module-content .pi-mhub-continue,
          .mt-module-content .pi-mhub-coach-summary { grid-column: 1; }
          .mt-module-content .pi-mhub-motivation { display: none; }
          .mt-module-content .pi-mhub-center { grid-column: 1; grid-row: 2; }
          .mt-module-content .pi-mhub-center .pi-mhub-banner { display: none !important; }
          .mt-module-content .pi-mhub-insights { display: none; }
        }

        @container mt-actions (max-width: 560px) {
          .mt-module-content .pi-mhub-lesson-button,
          .mt-module-content .pi-mhub-lesson-button--no-score {
            grid-template-columns: 46px minmax(0, 1fr) 36px !important;
            grid-template-rows: auto auto;
          }
          .mt-module-content .pi-mhub-lesson-icon { grid-column: 1; grid-row: 1 / span 2; }
          .mt-module-content .pi-mhub-lesson-details { grid-column: 2; grid-row: 1; }
          .mt-module-content .pi-mhub-status {
            grid-column: 2;
            grid-row: 2;
            width: max-content;
            justify-self: start;
          }
          .mt-module-content .pi-mhub-completion {
            grid-column: 2;
            grid-row: 2;
            justify-self: end;
          }
          .mt-module-content .pi-mhub-row-chevron { grid-column: 3; grid-row: 1 / span 2; }
        }

        @media (max-width: 768px) {
          .mt-module-page .mt-module-header {
            padding: max(8px, env(safe-area-inset-top)) 10px 7px !important;
            background: rgba(247,253,246,.94) !important;
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
          }
          .mt-module-page .mt-top-bar {
            min-height: 58px !important;
            border-radius: 18px !important;
            box-shadow: 0 8px 24px rgba(66, 115, 44, .08) !important;
          }
          .mt-module-page .mt-mnav-select-label { display: none !important; }
          .mt-module-page .mt-top-module { width: 100% !important; }
          .mt-module-content .pi-mhub-page.has-dashboard {
            padding: 12px 14px calc(112px + env(safe-area-inset-bottom)) !important;
          }
          .mt-module-content .pi-mhub-coach {
            --mt-coach-art-size: clamp(104px, 32vw, 124px);
            --mt-progress-ring-size: clamp(48px, 14vw, 54px);
            min-height: 0;
            display: grid;
            grid-template-columns: minmax(0, 1fr) var(--mt-coach-art-size);
            grid-template-rows: auto auto auto auto;
            align-items: start;
            align-content: start;
            gap: 0 clamp(6px, 2vw, 10px);
            padding: clamp(18px, 5vw, 23px) clamp(16px, 5vw, 20px) 20px;
            border-radius: 28px;
            overflow: hidden;
          }
          .mt-module-content .pi-mhub-progress-stage {
            display: contents;
          }
          .mt-module-content .pi-mhub-coach-art {
            grid-column: 2;
            grid-row: 1 / span 3;
            position: static;
            width: var(--mt-coach-art-size);
            height: var(--mt-coach-art-size);
            align-self: center;
            justify-self: center;
            margin: 0;
            transform: none;
          }
          .mt-module-content .pi-mhub-coach-art svg {
            width: clamp(110px, calc(34vw - 2px), 130px) !important;
            height: clamp(110px, calc(34vw - 2px), 130px) !important;
          }
          .mt-module-content .pi-mhub-coach-kicker { grid-column: 1; grid-row: 1; }
          .mt-module-content .pi-mhub-coach h2 {
            grid-column: 1;
            grid-row: 2;
            margin: 7px 0 clamp(8px, 2.5vw, 11px);
            font-size: clamp(27px, 8vw, 36px);
          }
          .mt-module-content .pi-mhub-coach-progress {
            grid-column: 1;
            grid-row: 3;
            display: grid;
            grid-template-columns: max-content var(--mt-progress-ring-size);
            align-items: center;
            justify-content: start;
            gap: clamp(7px, 2vw, 9px);
            margin-top: 0;
          }
          .mt-module-content .pi-mhub-progress-label {
            grid-column: 1;
            grid-row: 1;
            min-width: 0;
            margin: 0;
            font-size: clamp(11px, 3.3vw, 13px);
          }
          .mt-module-content .pi-mhub-progress-label span {
            white-space: nowrap;
          }
          .mt-module-content .pi-mhub-progress-track {
            grid-column: 2;
            grid-row: 1;
            width: var(--mt-progress-ring-size);
            height: var(--mt-progress-ring-size);
            justify-self: center;
            position: relative;
            z-index: 1;
            margin: 0;
            padding: clamp(6px, 2vw, 7px);
            border-radius: 50%;
            background: conic-gradient(var(--mt-accent) var(--module-progress), #E7EFE3 0);
          }
          .mt-module-content .pi-mhub-progress-track::after {
            content: "";
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: #fff;
          }
          .mt-module-content .pi-mhub-progress-track span { display: none; }
          .mt-module-content .pi-mhub-progress-value {
            position: absolute;
            width: 1px;
            height: 1px;
            overflow: hidden;
            clip-path: inset(50%);
            white-space: nowrap;
          }
          .mt-module-content .pi-mhub-ring-value {
            position: absolute;
            inset: 0;
            z-index: 2;
            display: grid;
            place-items: center;
            color: var(--mt-accent-d);
            font-family: 'Baloo 2', 'Fredoka', sans-serif;
            font-size: clamp(11px, 3.5vw, 13px);
            font-weight: 800;
            font-variant-numeric: tabular-nums;
            line-height: 1;
          }
          .mt-module-content .pi-mhub-continue {
            grid-column: 1 / -1;
            grid-row: 4;
            min-height: 52px;
            margin-top: 20px;
            border-radius: 17px;
          }
          .mt-module-content .pi-mhub-coach-summary,
          .mt-module-content .pi-mhub-motivation { display: none; }
          .mt-module-content .pi-mhub-center .pi-mhub-banner { display: none !important; }
          .mt-module-content .pi-mhub-path {
            padding: 22px 14px 24px;
            border: 0;
            border-radius: 28px;
            background: rgba(255,255,255,.66);
            box-shadow: none;
          }
          .mt-module-content .pi-mhub-path-heading {
            align-items: center;
            margin-bottom: 24px;
            padding: 0 4px 18px;
          }
          .mt-module-content .pi-mhub-path-heading h2 { font-size: 27px; }
          .mt-module-content .pi-mhub-lesson-card { padding-left: 34px; }
          .mt-module-content .pi-mhub-lesson-card::before {
            width: 27px;
            height: 27px;
            left: 0;
            border-width: 3px;
            font-size: 12px;
          }
          .mt-module-content .pi-mhub-lesson-card:not(:last-child)::after { left: 15px; top: 34px; bottom: -28px; }
          .mt-module-content .pi-mhub-lesson-head {
            grid-template-columns: minmax(0, 1fr) 38px !important;
            gap: 9px !important;
            margin-bottom: 12px;
          }
          .mt-module-content .pi-mhub-lesson-title { font-size: 20px !important; }
          .mt-module-content .pi-mhub-lesson-desc {
            display: -webkit-box !important;
            overflow: hidden;
            font-size: 12px !important;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .mt-module-content .pi-mhub-expand { width: 36px !important; height: 36px !important; border-radius: 13px !important; }
          .mt-module-content .pi-mhub-lesson-list { gap: 14px !important; }
          .mt-module-content .pi-mhub-lesson-button,
          .mt-module-content .pi-mhub-lesson-button--no-score {
            min-height: 92px !important;
            grid-template-columns: 46px minmax(0, 1fr) 34px !important;
            grid-template-rows: auto auto;
            gap: 6px 10px !important;
            padding: 13px !important;
            border-radius: 25px !important;
          }
          .mt-module-content .pi-mhub-lesson-button.is-current { min-height: 108px !important; }
          .mt-module-content .pi-mhub-lesson-icon { grid-column: 1; grid-row: 1 / span 2; }
          .mt-module-content .pi-mhub-lesson-details { grid-column: 2; grid-row: 1; }
          .mt-module-content .pi-mhub-lesson-name { font-size: 16px !important; }
          .mt-module-content .pi-mhub-lesson-meta {
            display: -webkit-box;
            overflow: hidden;
            white-space: normal;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .mt-module-content .pi-mhub-difficulty { display: none; }
          .mt-module-content .pi-mhub-status {
            grid-column: 2;
            grid-row: 2;
            width: max-content;
            min-height: 24px !important;
            padding: 3px 9px !important;
            font-size: 9px !important;
            justify-self: start !important;
          }
          .mt-module-content .pi-mhub-completion { display: none; }
          .mt-module-content .pi-mhub-row-chevron { grid-column: 3; grid-row: 1 / span 2; width: 34px !important; height: 34px !important; }
          .mt-module-content .pi-mhub-progress-strip { margin-top: 18px; }
          .mt-module-content .pi-mhub-bottom-nav {
            position: fixed;
            right: 14px;
            bottom: calc(12px + env(safe-area-inset-bottom));
            left: 14px;
            z-index: 30;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 4px;
            max-width: 520px;
            margin: 0 auto;
            padding: 7px;
            border: 1px solid #DCE8D8;
            border-radius: 24px;
            background: rgba(255,255,255,.94);
            box-shadow: 0 16px 42px rgba(44, 84, 28, .18);
            backdrop-filter: blur(18px);
            -webkit-backdrop-filter: blur(18px);
          }
          .mt-module-content .pi-mhub-bottom-item {
            min-height: 54px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 2px;
            border: 0;
            border-radius: 18px;
            color: #82907C;
            background: transparent;
            font-family: 'Fredoka', sans-serif;
            font-size: 9px;
            font-weight: 700;
          }
          .mt-module-content .pi-mhub-bottom-item.is-active {
            color: var(--mt-accent-d);
            background: #EDF9E7;
          }
        }

        @media (max-width: 420px) {
          .mt-module-content .pi-mhub-page.has-dashboard { padding-inline: 10px !important; }
          .mt-module-content .pi-mhub-path-heading h2 { font-size: 23px; }
          .mt-module-content .pi-mhub-path-count { min-width: 52px; padding-inline: 9px; }
          .mt-module-content .pi-mhub-lesson-card { padding-left: 30px; }
          .mt-module-content .pi-mhub-lesson-card:not(:last-child)::after { left: 13px; }
          .mt-module-content .pi-mhub-lesson-button,
          .mt-module-content .pi-mhub-lesson-button--no-score { grid-template-columns: 42px minmax(0, 1fr) 30px !important; padding: 11px !important; }
          .mt-module-content .pi-mhub-lesson-icon { width: 42px !important; height: 42px !important; border-radius: 14px !important; }
          .mt-module-content .pi-mhub-row-chevron { width: 30px !important; height: 30px !important; }
        }

        @media (max-height: 560px) and (orientation: landscape) and (max-width: 960px) {
          .mt-module-content .pi-mhub-coach { min-height: 208px; grid-template-columns: minmax(0, 1fr) 118px; }
          .mt-module-content .pi-mhub-coach-art { height: 104px; }
          .mt-module-content .pi-mhub-coach h2 { font-size: 26px; margin-bottom: 10px; }
          .mt-module-content .pi-mhub-continue { min-height: 46px; margin-top: 12px; }
        }

        @keyframes mt-coach-float {
          0%, 100% { transform: translateY(0) rotate(-1deg); }
          50% { transform: translateY(-7px) rotate(1deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .mt-module-content,
          .mt-module-content .pi-mhub-coach-art svg,
          .mt-module-content .pi-mhub-progress-track span,
          .mt-module-content .pi-mhub-continue,
          .mt-module-content .pi-mhub-lesson-button,
          .mt-module-content .pi-mhub-expand {
            scroll-behavior: auto;
            animation: none !important;
            transition: none !important;
          }
          .mt-module-content .pi-mhub-continue:hover,
          .mt-module-content .pi-mhub-lesson-button:hover { transform: none !important; }
        }
      `}</style>
    </div>
  );
}
