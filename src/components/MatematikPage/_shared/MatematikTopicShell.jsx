import React, { useState } from 'react';
import useGamification from '../../../hooks/useGamification';
import StatsBar from '../../_shared/StatsBar';
import MatematikSceneBackground from './MatematikSceneBackground';

function MbScoreBar() {
  const { xp, streak, loading } = useGamification('mt');
  const score = loading ? '—' : xp;
  const streakVal = loading ? '—' : streak;
  const pill = {
    display: 'flex', alignItems: 'center', gap: '6px',
    fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '17px',
    padding: '7px 13px', borderRadius: '13px',
    background: 'rgba(20,18,52,.6)',
  };
  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <div style={{ ...pill, color: '#FFD23F', border: '1px solid rgba(255,210,63,.4)', boxShadow: '0 0 14px rgba(255,210,63,.18)' }}>⭐ {score}</div>
      <div style={{ ...pill, color: '#2DE2E6', border: '1px solid rgba(45,226,230,.4)', boxShadow: '0 0 14px rgba(45,226,230,.18)' }}>⚡ {streakVal}</div>
    </div>
  );
}

function MtTopicStats() {
  const { loading, xp, gems, level, streak, hearts, maxHearts } = useGamification('mt');
  const items = [
    { key: 'hearts', icon: '♥', value: loading ? '-' : `${hearts}/${maxHearts}`, label: 'Hati', color: '#FF4B4B' },
    { key: 'gems', icon: '◇', value: loading ? '-' : gems, label: 'Permata', color: '#22D3EE' },
    { key: 'xp', icon: '★', value: loading ? '-' : xp, label: 'XP', color: '#A855F7' },
    { key: 'streak', icon: '♨', value: loading ? '-' : streak, label: 'Rentak', color: '#F59E0B' },
    { key: 'level', icon: 'Lv', value: loading ? '-' : level, label: 'Level', color: '#58CC02' },
  ];

  return (
    <div className="mt-topic-stats" aria-label="Statistik pembelajaran">
      {items.map((item) => (
        <div className="mt-topic-stat" key={item.key} style={{ '--stat-color': item.color }}>
          <span className="mt-topic-stat-icon" aria-hidden="true">{item.icon}</span>
          <span className="mt-topic-stat-value">{item.value}</span>
          <span className="mt-topic-stat-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * Shared shell for every Matematik topic page.
 * Owns phase state (Belajar / Kuiz), segmented toggle, CTA, and back routing.
 *
 * Props:
 *   language    — 'bm' | 'en'
 *   onBack      — returns to module hub
 *   theme       — { accent, dark, cd } from the module
 *   emoji       — topic emoji (e.g. '💯')
 *   titleBM     — BM topic title
 *   titleEN     — EN topic title
 *   subtitleBM  — BM subtitle / description
 *   subtitleEN  — EN subtitle / description
 *   learn       — <MatematikExplore /> for the Belajar phase
 *   quiz        — the existing quiz component with embedded prop
 */
export default function MatematikTopicShell({
  language = 'bm',
  onBack,
  theme = { accent: '#F59E0B', dark: '#D97706', cd: '#B45309' },
  emoji = '📖',
  titleBM = '',
  titleEN = '',
  headerTitleBM = '',
  headerTitleEN = '',
  subtitleBM = '',
  subtitleEN = '',
  learn = null,
  quiz = null,
  showReadyCta = true,
  showToggle = true,
  background = null,
  darkChrome = false,
  formalMode = false,
}) {
  const [phase, setPhase] = useState('belajar');
  const legacyDarkChrome = darkChrome;

  const title = language === 'bm' ? titleBM : titleEN;
  const headerTitle = language === 'bm' ? headerTitleBM : headerTitleEN;
  const subtitle = language === 'bm' ? subtitleBM : subtitleEN;
  const shellTitle = headerTitle || title || subtitle;

  return (
    <div
      className={`mt-topic-shell${legacyDarkChrome ? ' mt-dark-chrome' : ''}`}
      style={{ '--mt-accent': theme.accent, '--mt-dark': theme.dark, '--mt-cd': theme.cd, ...(legacyDarkChrome ? { background: '#05030F' } : (formalMode ? { background: '#fff' } : null)) }}
    >
      <style>{`
        .mt-topic-shell {
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 0;
          position: relative;
          background: #06142E;
        }
        /* keep all content above the decorative landscape scene */
        .mt-topic-shell > .mt-shell-top,
        .mt-topic-shell > .mt-shell-toggle,
        .mt-topic-shell > .mt-shell-body,
        .mt-topic-shell > .mt-shell-body-plain,
        .mt-topic-shell > .mb-header { position: relative; z-index: 1; }
        .mt-topic-shell > .mt-shell-top { z-index: 9000; }
        .mt-shell-top {
          position: relative;
          display: grid;
          grid-template-columns: 48px minmax(0, 1fr) auto;
          align-items: center;
          gap: clamp(10px, 1.8vw, 18px);
          padding: clamp(12px, 1.8vw, 18px) clamp(16px, 2.2vw, 28px) clamp(8px, 1.2vw, 12px);
          flex-shrink: 0;
          background: transparent;
          min-height: clamp(64px, 8vw, 82px);
        }
        .mt-shell-top .mt-top-back {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,.82);
          background:
            linear-gradient(180deg, rgba(255,255,255,.92), rgba(241,249,255,.78)),
            linear-gradient(135deg, color-mix(in srgb, var(--mt-accent) 14%, transparent), transparent 62%);
          color: color-mix(in srgb, var(--mt-dark) 82%, #1E3A8A);
          cursor: pointer;
          flex-shrink: 0;
          padding: 0;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.96),
            0 12px 26px rgba(15, 118, 110, .12);
          backdrop-filter: blur(14px);
          z-index: 2;
          transition: transform .14s ease, box-shadow .18s ease, border-color .18s ease;
        }
        .mt-shell-top .mt-top-back:hover {
          transform: translateY(-1px);
          border-color: color-mix(in srgb, var(--mt-accent) 30%, rgba(255,255,255,.82));
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.98),
            0 16px 30px rgba(15, 118, 110, .16);
        }
        .mt-shell-top .mt-top-back:active { transform: translateY(1px); }
        /* Dark chrome: blend the back button into a dark / galaxy background */
        .mt-dark-chrome .mt-shell-top .mt-top-back {
          background: rgba(255,255,255,.12);
          color: #fff;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,.18);
          backdrop-filter: blur(8px);
        }
        .mt-shell-top .mt-top-stats {
          grid-column: 3;
          flex: 0 0 auto;
          min-width: 0;
          margin-left: auto;
          display: flex;
          justify-content: flex-end;
          position: relative;
          z-index: 9999;
        }
        .mt-shell-topic-label {
          grid-column: 2;
          justify-self: center;
          min-width: 0;
          display: none;
          align-items: center;
          justify-content: center;
          width: fit-content;
          max-width: min(620px, 100%);
          min-height: clamp(38px, 4.4vw, 48px);
          padding: clamp(6px, .9vw, 9px) clamp(14px, 1.8vw, 22px);
          border-radius: clamp(14px, 1.6vw, 18px);
          background:
            linear-gradient(180deg, rgba(18, 34, 62, .96), rgba(8, 18, 40, .92)),
            radial-gradient(circle at 50% -32%, color-mix(in srgb, var(--mt-accent) 30%, transparent), transparent 68%);
          border: 1px solid color-mix(in srgb, var(--mt-accent) 38%, rgba(226, 245, 255, .22));
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.16),
            inset 0 -1px 0 rgba(3,7,20,.62),
            0 14px 32px rgba(3,7,20,.28);
          color: #EAF6FF;
        }
        .mt-shell-topic-label-text {
          min-width: 0;
          font-family: 'Baloo 2', sans-serif;
          font-size: clamp(16px, 2.05vw, 23px);
          font-weight: 900;
          line-height: 1.05;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-shadow: 0 2px 0 rgba(0,0,0,.18);
        }
        .mt-shell-top .mt-top-stats .sb-root { margin-bottom: 0; width: 100%; }
        .mt-shell-top .mt-top-stats .sb-container { justify-content: flex-end; }
        .mt-shell-top .mt-top-stats .sb-mb-wrap { justify-content: flex-end; }
        .mt-shell-top .mt-top-stats .sb-bundle-btn {
          min-width: 86px;
          min-height: 40px;
          border-radius: 17px;
        }
        .mt-shell-top .mt-top-stats .sb-popover {
          right: 0;
          z-index: 9999;
        }
        @media (max-width: 1024px) {
          .mt-shell-top {
            grid-template-columns: 15% minmax(0, 70%) 15%;
            gap: 8px;
            padding: 12px 16px 8px;
            min-height: 62px;
          }
          .mt-shell-top .mt-top-back,
          .mt-shell-top .mt-top-stats {
            position: relative;
            z-index: 2;
          }
          .mt-shell-top .mt-top-stats {
            width: 100%;
          }
          .mt-shell-topic-label {
            position: static;
            transform: none;
            display: flex;
            width: fit-content;
            max-width: 100%;
            min-height: 0;
            padding: 5px 10px;
            border-radius: 999px;
            background:
              linear-gradient(180deg, rgba(255,255,255,.94), rgba(234,245,249,.84));
            border: 1px solid rgba(255,255,255,.86);
            box-shadow: inset 0 1px 0 rgba(255,255,255,.94), 0 8px 18px rgba(15, 118, 110, .10);
            color: color-mix(in srgb, var(--mt-dark) 76%, #1E293B);
            z-index: 1;
          }
          .mt-shell-topic-label-text {
            font-family: 'Fredoka', sans-serif;
            font-size: clamp(10px, 1.85vw, 14px);
            font-weight: 900;
            line-height: 1.1;
            white-space: nowrap;
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            text-shadow: 0 1px 0 rgba(255,255,255,.86);
          }
          .mt-shell-top .mt-top-stats .sb-bundle-btn {
            width: 44px;
            min-width: 44px;
            min-height: 40px;
            padding: 0;
            gap: 0;
            border-radius: 16px;
          }
          .mt-shell-top .mt-top-stats .sb-bundle-text {
            display: none !important;
          }
          .mt-shell-top .mt-top-stats .sb-bundle-btn .sb-emoji {
            font-size: 19px;
          }
        }
        @media (min-width: 1025px) {
          .mt-shell-topic-label { display: none; }
          .mt-shell-top .mt-top-stats { flex: 0 0 auto; }
          .mt-shell-top .mt-top-stats .sb-root {
            width: auto;
            min-width: 0;
            padding: 8px 18px;
            gap: 12px;
          }
          .mt-shell-top .mt-top-stats .sb-item { flex: 0 0 auto; }
        }
        @media (max-width: 840px) {
          .mt-shell-topic-label-text {
            font-size: clamp(11px, 2.1vw, 14px);
          }
        }
        @media (max-width: 560px) {
          .mt-shell-top { grid-template-columns: 15% minmax(0, 70%) 15%; padding: 12px 14px 6px; min-height: 56px; }
          .mt-shell-topic-label { color: color-mix(in srgb, var(--mt-dark) 80%, #1E293B); }
          .mt-shell-topic-label-text {
            font-size: clamp(9px, 2.5vw, 11px);
            line-height: 1.12;
          }
        }
        .mt-topic-stats {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
          padding: 8px 9px;
          border-radius: 18px;
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(183, 247, 255, .16);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.14), 0 16px 34px rgba(0,0,0,.24);
          backdrop-filter: blur(16px);
        }
        .mt-topic-stat {
          min-width: 42px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 5px 8px;
          border-radius: 13px;
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--stat-color) 88%, #ffffff 12%), color-mix(in srgb, var(--stat-color) 72%, #0B1730 28%));
          color: #fff;
          box-shadow: 0 3px 0 color-mix(in srgb, var(--stat-color) 62%, #000), 0 8px 18px color-mix(in srgb, var(--stat-color) 18%, transparent);
          font-family: 'Fredoka', sans-serif;
        }
        .mt-topic-stat-icon {
          font-weight: 900;
          font-size: 15px;
          line-height: 1;
          filter: drop-shadow(0 1px 1px rgba(0,0,0,.28));
        }
        .mt-topic-stat-value {
          font-weight: 900;
          font-size: 15px;
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }
        .mt-topic-stat-label {
          display: none;
          grid-column: 1 / -1;
          font-size: 8px;
          font-weight: 800;
          line-height: 1;
          opacity: .82;
          text-transform: uppercase;
          letter-spacing: .3px;
          text-align: center;
        }
        .mt-topic-stats {
          width: 92px;
          height: 38px;
          padding: 0 8px;
          border-radius: 999px;
          justify-content: center;
          overflow: hidden;
          background: rgba(7, 20, 48, .78);
          border-color: rgba(168, 85, 247, .36);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.14), 0 12px 26px rgba(0,0,0,.25);
        }
        .mt-topic-stat { display: none; }
        .mt-topic-stat:nth-child(3) {
          display: flex;
          min-width: 0;
          width: auto;
          height: 30px;
          padding: 0;
          align-items: center;
          justify-content: center;
          gap: 5px;
          background: transparent;
          box-shadow: none;
        }
        .mt-topic-stat:nth-child(3) .mt-topic-stat-label { display: none; }
        .mt-topic-stat:nth-child(3) .mt-topic-stat-icon,
        .mt-topic-stat:nth-child(3) .mt-topic-stat-value { font-size: 14px; }
        .mt-topic-stat:nth-child(3)::after {
          content: 'XP';
          font-family: 'Fredoka', sans-serif;
          font-size: 9px;
          font-weight: 900;
          color: rgba(234,246,255,.72);
          line-height: 1;
        }
        @media (max-width: 560px) {
          .mt-topic-stats {
            width: 42px;
            height: 38px;
            padding: 0;
            border-radius: 14px;
          }
          .mt-topic-stat:nth-child(3) {
            width: 34px;
            gap: 2px;
          }
          .mt-topic-stat:nth-child(3)::after { display: none; }
          .mt-topic-stat:nth-child(3) .mt-topic-stat-icon,
          .mt-topic-stat:nth-child(3) .mt-topic-stat-value { font-size: 12px; }
        }

        .mt-shell-toggle {
          display: flex;
          align-items: center;
          gap: 0;
          margin: 0 16px 12px;
          padding: 5px;
          border-radius: 18px;
          background:
            linear-gradient(180deg, rgba(255,255,255,.82), rgba(236,244,250,.72)),
            linear-gradient(135deg, color-mix(in srgb, var(--mt-accent) 10%, transparent), transparent 64%);
          border: 1px solid rgba(255,255,255,.82);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.96),
            0 14px 28px rgba(15, 118, 110, .10);
          flex-shrink: 0;
        }
        .mt-shell-toggle-btn {
          flex: 1;
          border: none;
          background: transparent;
          padding: 8px 16px;
          border-radius: 14px;
          font-family: 'Fredoka', system-ui, sans-serif;
          font-weight: 700;
          font-size: 15px;
          color: #597076;
          cursor: pointer;
          transition: all .2s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .mt-shell-toggle-btn.active {
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--mt-accent) 18%, #FFFFFF), #FFFFFF);
          color: color-mix(in srgb, var(--mt-dark) 82%, #1E3A8A);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.98),
            0 8px 18px rgba(15, 118, 110, .12);
        }
        .mt-shell-toggle-btn:not(.active):hover {
          color: color-mix(in srgb, var(--mt-dark) 82%, #1E3A8A);
          background: rgba(255,255,255,.48);
        }

        .mt-shell-body {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          padding: 0 16px 80px;
        }
        /* Plain body (no Belajar/Kuiz toggle): the learn content owns the full
           area, including its own scroll + footer. */
        .mt-shell-body-plain {
          flex: 1;
          min-height: 0;
          display: flex;
          flex-direction: column;
        }

        .mt-shell-banner {
          text-align: center;
          padding: 20px 0 12px;
        }
        .mt-shell-banner-emoji {
          font-size: clamp(40px, 10vw, 64px);
          display: block;
          margin-bottom: 6px;
        }
        .mt-shell-banner h2 {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: clamp(22px, 5vw, 32px);
          color: var(--mt-dark);
          margin: 0 0 4px;
        }
        .mt-shell-banner p {
          font-family: 'Fredoka', sans-serif;
          font-weight: 500;
          font-size: 14px;
          color: #5B6B7B;
          margin: 0;
        }

        .mt-shell-cta {
          display: block;
          margin: 24px auto 0;
          padding: 12px 28px;
          border: none;
          border-radius: 999px;
          background: var(--mt-accent);
          color: #fff;
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: 18px;
          cursor: pointer;
          box-shadow: 0 4px 0 var(--mt-cd);
          transition: transform .1s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .mt-shell-cta:hover { transform: translateY(-2px); }
        .mt-shell-cta:active { transform: translateY(2px); }
        .mt-shell-cta:focus-visible {
          outline: 3px solid var(--mt-dark);
          outline-offset: 3px;
        }

        /* Shared playground polish for the existing activity primitives. */
        .mt-topic-shell .cmp-head,
        .mt-topic-shell .maf-head {
          color: rgba(234,246,255,.72) !important;
          text-shadow: 0 0 18px color-mix(in srgb, var(--mt-accent) 24%, transparent);
        }
        .mt-topic-shell .cmp-head-title {
          display: none !important;
        }
        .mt-topic-shell .cmp-question,
        .mt-topic-shell .maf-question {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          max-width: min(760px, 100%);
          box-sizing: border-box;
          min-height: clamp(48px, 6.6vmin, 70px);
          padding: clamp(10px, 1.5vmin, 16px) clamp(20px, 3vmin, 36px);
          border-radius: clamp(17px, 2.1vmin, 24px);
          background:
            linear-gradient(180deg, rgba(255,255,255,.96), rgba(239,248,255,.88)),
            radial-gradient(circle at 50% -28%, color-mix(in srgb, var(--mt-accent) 18%, transparent), transparent 68%) !important;
          border: 1.5px solid color-mix(in srgb, var(--mt-accent) 34%, rgba(255,255,255,.92)) !important;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.86),
            0 0 0 3px rgba(255,255,255,.48),
            0 16px 32px rgba(15,23,42,.16) !important;
          backdrop-filter: blur(10px) !important;
          color: #1E293B !important;
          text-shadow: 0 1px 0 rgba(255,255,255,.8);
          text-wrap: balance;
        }
        @media (max-width: 560px) {
          .mt-topic-shell .cmp-question,
          .mt-topic-shell .maf-question {
            max-width: min(340px, 92vw);
            min-height: 48px;
            padding-inline: 18px;
          }
        }
        .mt-topic-shell .cmp-panel {
          min-width: 0;
          box-sizing: border-box;
          overflow: hidden;
          background:
            linear-gradient(180deg, rgba(255,255,255,.98), rgba(245,249,255,.94)),
            radial-gradient(circle at 50% -16%, color-mix(in srgb, var(--mt-accent) 12%, transparent), transparent 62%) !important;
          border: 1px solid rgba(220, 232, 244, .96) !important;
          border-bottom-width: 5px !important;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.86), 0 18px 44px rgba(3,7,20,.30) !important;
          backdrop-filter: none;
          gap: clamp(10px, 1.8vmin, 20px) !important;
          padding: clamp(14px, 2.1vmin, 26px) clamp(12px, 1.8vmin, 22px) clamp(12px, 1.9vmin, 22px) !important;
          min-height: clamp(132px, 21vmin, 236px) !important;
        }
        .mt-topic-shell .cmp-panel:hover:not(.done) {
          transform: translateY(-2px);
          border-color: color-mix(in srgb, var(--mt-accent) 48%, #DCE8F4) !important;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.9), 0 0 0 3px color-mix(in srgb, var(--mt-accent) 16%, transparent), 0 24px 52px rgba(3,7,20,.36) !important;
        }
        .mt-topic-shell .cmp-panel.picked {
          border-color: color-mix(in srgb, var(--mt-accent) 55%, #DCE8F4) !important;
        }
        .mt-topic-shell .cmp-panel.is-correct,
        .mt-topic-shell .kog-option.is-correct {
          border-color: #16A34A !important;
          border-bottom-color: #16A34A !important;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.9),
            0 0 0 4px rgba(255,255,255,.78),
            0 0 0 8px rgba(22,163,74,.38),
            0 22px 44px rgba(3,7,20,.26) !important;
        }
        .mt-topic-shell .cmp-panel.is-wrong,
        .mt-topic-shell .kog-option.is-wrong {
          border-color: #EF4444 !important;
          border-bottom-color: #DC2626 !important;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.9),
            0 0 0 4px rgba(255,255,255,.82),
            0 0 0 8px rgba(239,68,68,.42),
            0 22px 44px rgba(3,7,20,.26) !important;
        }
        .mt-topic-shell .cmp-options {
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          gap: clamp(14px, 2.4vmin, 28px) !important;
          margin-top: clamp(8px, 2.2vmin, 22px) !important;
        }
        .mt-topic-shell .kog-options {
          max-width: min(960px, 96vw);
          gap: clamp(14px, 2.6vmin, 28px) !important;
        }
        .mt-topic-shell .cmp-content,
        .mt-topic-shell .maf-content {
          width: 100% !important;
          max-width: min(980px, calc(100% - clamp(24px, 5vw, 48px))) !important;
          box-sizing: border-box;
          gap: clamp(10px, 2.4vmin, 28px) !important;
        }
        .mt-topic-shell .cmp-scroll,
        .mt-topic-shell .maf-scroll {
          overflow: hidden !important;
        }
        .mt-topic-shell .cmp-body,
        .mt-topic-shell .maf-body {
          width: 100%;
          box-sizing: border-box;
          padding-top: clamp(6px, 1.2vmin, 16px) !important;
          padding-left: clamp(14px, 3vmin, 32px) !important;
          padding-right: clamp(14px, 3vmin, 32px) !important;
          padding-bottom: clamp(14px, 2.2vmin, 28px) !important;
        }
        .mt-topic-shell .cmp-objects {
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
          min-height: clamp(58px, 11vmin, 126px);
          padding: clamp(4px, .8vmin, 10px) 0;
        }
        .mt-topic-shell .kog-option {
          background:
            linear-gradient(180deg, rgba(255,255,255,.98), rgba(245,249,255,.94)),
            radial-gradient(circle at 50% -16%, color-mix(in srgb, var(--mt-accent) 12%, transparent), transparent 62%) !important;
          border: 1px solid rgba(220, 232, 244, .96) !important;
          border-bottom-width: 5px !important;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.86), 0 18px 44px rgba(3,7,20,.30) !important;
          gap: clamp(12px, 2vmin, 22px) !important;
          padding: clamp(16px, 2.6vmin, 30px) clamp(12px, 2vmin, 24px) clamp(14px, 2.2vmin, 24px) !important;
          min-height: clamp(144px, 24vmin, 260px) !important;
        }
        .mt-topic-shell .kog-option:hover:not([aria-disabled="true"]) {
          transform: translateY(-2px);
          border-color: color-mix(in srgb, var(--mt-accent) 48%, #DCE8F4) !important;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.9), 0 0 0 3px color-mix(in srgb, var(--mt-accent) 16%, transparent), 0 24px 52px rgba(3,7,20,.36) !important;
        }
        .mt-topic-shell .kog-cell {
          min-height: clamp(68px, 13vmin, 136px);
          padding: clamp(4px, .8vmin, 10px) 0;
        }
        .mt-topic-shell .kog-option > div:last-child {
          box-shadow: inset 0 1px 0 rgba(255,255,255,.42), 0 4px 0 rgba(15,23,42,.14), 0 8px 18px rgba(15,23,42,.14) !important;
        }
        .mt-topic-shell .kog-count-stage {
          gap: clamp(18px, 3vmin, 30px) !important;
        }
        .mt-topic-shell .kog-count-objects {
          min-height: clamp(48px, 10vmin, 118px);
          display: grid;
          place-items: center;
          padding: clamp(4px, .8vmin, 8px) clamp(8px, 1.4vmin, 18px);
          border-radius: 18px;
        }
        .mt-topic-shell .kog-answer-grid {
          max-width: min(520px, 86vw) !important;
          gap: clamp(10px, 1.8vmin, 18px) !important;
        }
        .mt-topic-shell .kog-answer-btn {
          border-radius: 13px !important;
          min-height: clamp(46px, 7vmin, 58px) !important;
          padding: clamp(10px, 1.6vmin, 16px) clamp(12px, 2vmin, 20px) !important;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.36), 0 5px 0 rgba(15,23,42,.20), 0 14px 26px rgba(3,7,20,.22) !important;
          text-shadow: 0 1px 2px rgba(0,0,0,.22);
          transition: transform .14s ease, box-shadow .18s ease, filter .18s ease !important;
        }
        .mt-topic-shell .kog-answer-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          filter: saturate(1.04) brightness(1.02);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.42), 0 6px 0 rgba(15,23,42,.18), 0 18px 32px rgba(3,7,20,.28) !important;
        }
        .mt-topic-shell .kog-answer-btn:active:not(:disabled) {
          transform: translateY(1px);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.34), 0 2px 0 rgba(15,23,42,.20), 0 10px 20px rgba(3,7,20,.22) !important;
        }
        .mt-topic-shell .kog-answer-btn:focus-visible,
        .mt-topic-shell .kog-option:focus-visible,
        .mt-topic-shell .cmp-panel:focus-visible {
          outline: 3px solid color-mix(in srgb, var(--mt-accent) 58%, #FFFFFF);
          outline-offset: 4px;
        }
        .mt-topic-shell .cmp-box,
        .mt-topic-shell .maf-summary-row {
          box-shadow: inset 0 1px 0 rgba(255,255,255,.5);
        }
        .mt-topic-shell .cmp-box {
          border: 0 !important;
          border-radius: 12px !important;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.42), 0 4px 0 rgba(15,23,42,.14), 0 8px 18px rgba(15,23,42,.14) !important;
        }
        .mt-topic-shell .cmp-box.num {
          min-width: clamp(38px, 5vmin, 54px);
        }
        .mt-topic-shell .cmp-ref-label {
          color: rgba(234,246,255,.72) !important;
        }
        .mt-topic-shell .cmp-ref-box {
          background: rgba(255,255,255,.08) !important;
          border: 1px solid rgba(255,255,255,.14);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.12);
        }
        .mt-topic-shell .cmp-footer,
        .mt-topic-shell .maf-footer {
          margin: 0 clamp(10px, 2vmin, 24px) clamp(8px, 1.4vmin, 14px);
          border: 1px solid rgba(255,255,255,.82) !important;
          border-radius: 18px;
          background:
            linear-gradient(180deg, rgba(250,253,255,.92), rgba(232,241,247,.88)) !important;
          color: #587073 !important;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.98), 0 16px 34px rgba(15, 118, 110, .10);
          backdrop-filter: blur(16px);
        }
        .mt-topic-shell .cmp-footer-tally,
        .mt-topic-shell .maf-footer-tally {
          color: #6A8286 !important;
        }
        .mt-topic-shell .maf-top-strip {
          margin: -2px 16px 2px;
          padding: 0 !important;
          background: transparent !important;
          border-bottom: none !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          min-height: 0 !important;
          box-shadow: none !important;
        }
        .mt-topic-shell .maf-tukar-btn {
          margin-left: auto;
          background:
            linear-gradient(180deg, rgba(255,255,255,.96), rgba(240,247,251,.90)) !important;
          border: 1px solid rgba(255,255,255,.88) !important;
          border-radius: 999px !important;
          color: color-mix(in srgb, var(--mt-dark) 78%, #1E3A8A) !important;
          padding: 7px 12px !important;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.98),
            0 10px 22px rgba(15, 118, 110, .10);
          backdrop-filter: blur(10px);
        }
        .mt-topic-shell .maf-next,
        .mt-topic-shell .cmp-next {
          box-shadow: 0 5px 0 color-mix(in srgb, var(--mt-cd) 78%, #000 0%), 0 14px 28px color-mix(in srgb, var(--mt-accent) 22%, transparent) !important;
        }
        @media (max-width: 560px) {
          .mt-topic-shell .cmp-content,
          .mt-topic-shell .maf-content {
            max-width: calc(100% - 20px) !important;
            gap: clamp(8px, 1.8vh, 16px) !important;
          }
          .mt-topic-shell .cmp-body,
          .mt-topic-shell .maf-body {
            justify-content: center !important;
            padding: 4px 10px 6px !important;
          }
          .mt-topic-shell .cmp-question,
          .mt-topic-shell .maf-question {
            max-width: 100%;
            min-height: 0;
            padding: 8px 16px;
            border-radius: 18px;
            font-size: clamp(22px, 6.2vw, 28px);
            line-height: 1.1;
          }
          .mt-topic-shell .cmp-ref {
            gap: 2px !important;
          }
          .mt-topic-shell .cmp-ref-label {
            font-size: 11px !important;
          }
          .mt-topic-shell .cmp-ref-box {
            padding: 4px 10px !important;
            border-radius: 12px !important;
          }
          .mt-topic-shell .cmp-options {
            flex-direction: row;
            gap: clamp(12px, 4vw, 18px) !important;
            margin-top: clamp(6px, 1.4vh, 12px) !important;
          }
          .mt-topic-shell .kog-options {
            gap: 18px !important;
          }
          .mt-topic-shell .kog-option {
            min-height: 128px !important;
            border-radius: 18px !important;
            padding: 14px 12px 12px !important;
            margin-block: 4px;
          }
          .mt-topic-shell .kog-cell {
            min-height: 54px;
          }
          .mt-topic-shell .kog-answer-grid {
            max-width: 100% !important;
          }
          .mt-topic-shell .kog-answer-btn {
            min-height: 44px !important;
            border-radius: 12px !important;
          }
          .mt-topic-shell .cmp-panel {
            min-height: clamp(126px, 18vh, 152px) !important;
            border-radius: 18px !important;
            padding: 10px 10px 8px !important;
            margin-block: 0;
            gap: 4px !important;
          }
          .mt-topic-shell .cmp-objects {
            min-height: 34px;
            padding: 0;
          }
          .mt-topic-shell .cmp-feedback {
            min-height: 18px !important;
            font-size: 16px !important;
          }
          .mt-topic-shell .cmp-next,
          .mt-topic-shell .maf-next {
            padding: 8px 24px !important;
            font-size: 17px !important;
            box-shadow: 0 3px 0 color-mix(in srgb, var(--mt-cd) 78%, #000 0%), 0 10px 18px color-mix(in srgb, var(--mt-accent) 18%, transparent) !important;
          }
          .mt-topic-shell .cmp-footer,
          .mt-topic-shell .maf-footer {
            margin-inline: 8px;
            border-radius: 16px;
            padding: 8px 14px !important;
          }
        }
        @media (min-width: 561px) and (max-height: 620px) {
          .mt-topic-shell .cmp-panel,
          .mt-topic-shell .kog-option {
            min-height: clamp(120px, 19vmin, 170px) !important;
          }
          .mt-topic-shell .cmp-objects,
          .mt-topic-shell .kog-cell {
            min-height: clamp(50px, 9vmin, 86px) !important;
          }
          .mt-topic-shell .cmp-content,
          .mt-topic-shell .maf-content {
            gap: clamp(10px, 1.8vmin, 18px) !important;
          }
          .mt-topic-shell .cmp-options {
            margin-top: clamp(24px, 5.4vmin, 34px) !important;
          }
        }

        /* ── Math Buddies header (darkChrome pages) ── */
        .mb-header {
          display: flex; align-items: center;
          padding: 20px 16px 10px; flex-shrink: 0;
          background: transparent;
          position: relative;
        }
        .mb-brand-center {
          position: absolute; left: 50%; transform: translateX(-50%);
          display: flex; align-items: center; gap: 8px; pointer-events: none;
          max-width: calc(100% - 88px);
          overflow: hidden;
        }
        .mb-back {
          display: flex; align-items: center; justify-content: center;
          width: 36px; height: 36px; border-radius: 50%; border: none; padding: 0;
          background: rgba(255,255,255,.1); color: #fff; cursor: pointer;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,.15); flex-shrink: 0;
          transition: transform .1s;
        }
        .mb-back:hover { transform: scale(1.08); }
        .mb-back:active { transform: scale(.95); }
        .mb-planet-icon {
          position: relative; width: 38px; height: 38px; flex-shrink: 0;
          border-radius: 50%;
          background: radial-gradient(circle at 34% 28%, #C9A9FF, #6E3CE0 80%);
          border: 1.5px solid rgba(255,255,255,.4);
          box-shadow: 0 0 18px rgba(124,77,238,.7), inset -4px -5px 8px rgba(0,0,0,.35);
        }
        .mb-planet-ring {
          position: absolute; top: 50%; left: 50%; width: 52px; height: 17px;
          transform: translate(-50%,-50%) rotate(-20deg);
          border: 2.5px solid rgba(45,226,230,.7); border-radius: 50%;
          box-shadow: 0 0 8px rgba(45,226,230,.6);
        }
        .mb-brand-text { min-width: 0; overflow: hidden; }
        .mb-brand-title {
          font-family: 'Space Grotesk', sans-serif; font-weight: 700;
          font-size: clamp(14px,4vw,20px); color: #fff; letter-spacing: .4px;
          text-shadow: 0 0 16px rgba(124,77,238,.6); line-height: 1;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .mb-brand-sub {
          font-family: 'Orbitron', sans-serif; font-weight: 600;
          font-size: 8px; letter-spacing: 2px; color: #2DE2E6; margin-top: 4px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        @media (max-width: 400px) {
          .mb-planet-icon { width: 30px; height: 30px; }
          .mb-planet-ring { width: 42px; height: 13px; }
          .mb-brand-sub { font-size: 7px; letter-spacing: 1px; }
          .mb-brand-title { font-size: 13px; }
        }
      `}</style>

      {legacyDarkChrome && <style>{`
        /* ── Dark mode overrides for galaxy background ── */
        .mt-dark-chrome .maf-head { color: rgba(255,255,255,.6) !important; }
        .mt-dark-chrome .maf-question { color: #fff !important; }
        .mt-dark-chrome .maf-footer { background: rgba(10,12,40,.55) !important; border-top-color: rgba(255,255,255,.08) !important; }
        .mt-dark-chrome .maf-top-strip { background: rgba(14,10,46,.75) !important; border-bottom-color: rgba(255,255,255,.1) !important; }
        .mt-dark-chrome .maf-tukar-btn { color: #2DE2E6 !important; }
        .mt-dark-chrome .maf-tukar-btn:hover { background: rgba(255,255,255,.08) !important; }
        .mt-dark-chrome .maf-footer-tally { color: rgba(255,255,255,.55) !important; }
        .mt-dark-chrome .maf-stats .maf-divider { color: rgba(255,255,255,.18) !important; }
        .mt-dark-chrome .maf-summary-row { background: rgba(255,255,255,.06) !important; border-color: rgba(255,255,255,.1) !important; color: rgba(255,255,255,.85) !important; }
        .mt-dark-chrome .maf-btn-secondary { background: rgba(255,255,255,.08) !important; border-color: rgba(255,255,255,.2) !important; color: #fff !important; }
        .mt-dark-chrome .maf-next:disabled { background: rgba(255,255,255,.06) !important; color: rgba(255,255,255,.25) !important; box-shadow: none !important; }
        .mt-dark-chrome .maf-feedback.ok { color: #4ADE80 !important; }
        .mt-dark-chrome .maf-feedback.no { color: #F87171 !important; }
        .mt-dark-chrome .maf-stat[style*="color: #1E293B"] span { color: #fff !important; }
        .mt-dark-chrome .maf-stat[style*="color: #94A3B8"] span { color: rgba(255,255,255,.45) !important; }

        /* Content card backgrounds → semi-transparent dark */
        .mt-dark-chrome [style*="background: #F8FAFC"] { background: rgba(255,255,255,.06) !important; }
        .mt-dark-chrome [style*="background: #EFF6FF"] { background: rgba(45,226,230,.12) !important; }
        .mt-dark-chrome [style*="background: #FEF3C7"] { background: rgba(245,158,11,.12) !important; }
        .mt-dark-chrome [style*="background: #DBEAFE"] { background: rgba(45,226,230,.08) !important; }
        .mt-dark-chrome [style*="background: #FFFBEB"] { background: rgba(245,158,11,.08) !important; }
        .mt-dark-chrome [style*="background: #FFF7ED"] { background: rgba(234,88,12,.08) !important; }
        .mt-dark-chrome [style*="background: #F0FDF4"] { background: rgba(22,163,74,.08) !important; }
        .mt-dark-chrome [style*="background: #F3F4F6"] { background: rgba(255,255,255,.04) !important; }
        .mt-dark-chrome [style*="background: #F1F5F9"] { background: rgba(255,255,255,.04) !important; }
        .mt-dark-chrome [style*="background: #fff"] { background: rgba(255,255,255,.06) !important; }
        .mt-dark-chrome [style*="background: #ffffff"] { background: rgba(255,255,255,.06) !important; }
        .mt-dark-chrome [style*="background: white"] { background: rgba(255,255,255,.06) !important; }
        .mt-dark-chrome [style*="linear-gradient(180deg,#EFF6FF"] { background: transparent !important; }

        /* Semi-transparent white bars → dark bars */
        .mt-dark-chrome [style*="rgba(255,255,255"] { background: rgba(10,12,40,.55) !important; }

        /* Content card text colors → light on dark */
        .mt-dark-chrome [style*="color: #334155"] { color: rgba(255,255,255,.85) !important; }
        .mt-dark-chrome [style*="color: #1E293B"] { color: #fff !important; }
        .mt-dark-chrome [style*="color: #1E3A8A"] { color: #2DE2E6 !important; }
        .mt-dark-chrome [style*="color: #475569"] { color: rgba(255,255,255,.7) !important; }
        .mt-dark-chrome [style*="color: #64748B"] { color: rgba(255,255,255,.55) !important; }
        .mt-dark-chrome [style*="color: #94A3B8"] { color: rgba(255,255,255,.45) !important; }
        .mt-dark-chrome [style*="color: #5B6B7B"] { color: rgba(255,255,255,.55) !important; }
        .mt-dark-chrome [style*="color: #9CA3AF"] { color: rgba(255,255,255,.35) !important; }

        /* Content card borders */
        .mt-dark-chrome [style*="solid #E2E8F0"],
        .mt-dark-chrome [style*="solid #e2e8f0"] { border-color: rgba(255,255,255,.12) !important; }
        .mt-dark-chrome [style*="solid #BFDBFE"],
        .mt-dark-chrome [style*="solid #bfdbfe"] { border-color: rgba(45,226,230,.2) !important; }
        .mt-dark-chrome [style*="solid #93C5FD"],
        .mt-dark-chrome [style*="solid #93c5fd"] { border-color: rgba(45,226,230,.25) !important; }

        /* SVG text elements on dark bg */
        .mt-dark-chrome svg text { fill: rgba(255,255,255,.9) !important; }
        .mt-dark-chrome svg text[fill="#16A34A"] { fill: #4ADE80 !important; }
        .mt-dark-chrome svg text[fill="#F59E0B"] { fill: #FBBF24 !important; }
        .mt-dark-chrome svg text[fill="#2563EB"] { fill: #2DE2E6 !important; }
        .mt-dark-chrome svg text[fill="#3B82F6"] { fill: #2DE2E6 !important; }

        /* SVG circle/line fills */
        .mt-dark-chrome svg circle[fill="#CBD5E1"] { fill: rgba(255,255,255,.2) !important; }
        .mt-dark-chrome svg line { stroke: rgba(255,255,255,.25) !important; }
        .mt-dark-chrome svg path[stroke="#3B82F6"] { stroke: #2DE2E6 !important; }
        .mt-dark-chrome svg line[stroke="#94A3B8"] { stroke: rgba(255,255,255,.3) !important; }

        /* M2 drill / exam — Latih Diri */
        .mt-dark-chrome .ld-drill-question { color: #fff !important; }
        .mt-dark-chrome .ld-drill-summary-row { background: rgba(255,255,255,.06) !important; border-color: rgba(255,255,255,.1) !important; color: rgba(255,255,255,.85) !important; }
        .mt-dark-chrome .ld-drill-btn-secondary { background: rgba(255,255,255,.08) !important; border-color: rgba(255,255,255,.2) !important; color: #fff !important; }

        /* M2 Level Picker (LatihanTambah / LatihanTolak) */
        .mt-dark-chrome .lt-picker-heading { color: #fff !important; }
        .mt-dark-chrome .lt-card { background: rgba(14,10,46,.82) !important; border-color: rgba(255,255,255,.18) !important; }
        .mt-dark-chrome .lt-card-label { color: #fff !important; }
        .mt-dark-chrome .lt-card-desc { color: rgba(255,255,255,.62) !important; }

        /* M2 Level strip (Aras: Mudah / Tukar Aras) */
        .mt-dark-chrome .lt-level-strip { background: rgba(14,10,46,.7) !important; border-bottom-color: rgba(255,255,255,.1) !important; color: rgba(255,255,255,.6) !important; }
        .mt-dark-chrome .lt-level-label { color: rgba(255,255,255,.6) !important; }
        .mt-dark-chrome .lt-level-label b { color: #fff !important; font-weight: 800; }
        .mt-dark-chrome .lt-tukar-btn { color: #2DE2E6 !important; }

        /* M2 Warnai answer options (plain mode — transparent bg, dark text) */
        .mt-dark-chrome .word-opt-plain { background: rgba(255,255,255,.08) !important; color: #fff !important; }

        /* Math Buddies: question prompt card */
        .mt-dark-chrome .maf-question:not(:empty) {
          background: rgba(28,25,64,.85) !important;
          border: 1.5px solid rgba(45,226,230,.4) !important;
          border-radius: 14px !important;
          padding: 10px 16px !important;
          box-shadow: 0 0 14px rgba(45,226,230,.18) !important;
          color: #EAEAFF !important;
        }
      `}</style>}

      {legacyDarkChrome && <style>{`@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600&family=Space+Grotesk:wght@700&display=swap');`}</style>}
      {formalMode && <style>{`.mt-shell { background: #fff !important; }`}</style>}

      {background || (!formalMode && <MatematikSceneBackground />)}


      {legacyDarkChrome ? (
        <>
          <div className="mb-header">
            <button type="button" className="mb-back" onClick={onBack}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            <div className="mb-brand-center">
              <div className="mb-planet-icon">
                <div className="mb-planet-ring" />
              </div>
              <div className="mb-brand-text">
                <div className="mb-brand-title">Math Buddies</div>
                <div className="mb-brand-sub">IMAN&nbsp;SPACE&nbsp;LAB</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="mt-shell-top">
          <button type="button" className="mt-top-back" onClick={onBack}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          {shellTitle && (
            <div className="mt-shell-topic-label" aria-label={shellTitle}>
              <div className="mt-shell-topic-label-text">{shellTitle}</div>
            </div>
          )}
          {!formalMode && (
            <div className="mt-top-stats">
              <StatsBar subject="mt" variant="mb" />
            </div>
          )}
        </div>
      )}

      {showToggle && (
        <div className="mt-shell-toggle">
          <button
            className={`mt-shell-toggle-btn${phase === 'belajar' ? ' active' : ''}`}
            onClick={() => setPhase('belajar')}
            type="button"
          >
            {language === 'bm' ? 'Belajar' : 'Learn'}
          </button>
          <button
            className={`mt-shell-toggle-btn${phase === 'kuiz' ? ' active' : ''}`}
            onClick={() => setPhase('kuiz')}
            type="button"
          >
            {language === 'bm' ? 'Kuiz' : 'Quiz'}
          </button>
        </div>
      )}

      {!showToggle ? (
        <div className="mt-shell-body-plain">
          {learn}
        </div>
      ) : (
        <div className="mt-shell-body">
          {phase === 'belajar' ? (
            <>
              {(emoji || title || subtitle) && (
                <div className="mt-shell-banner">
                  {emoji && <span className="mt-shell-banner-emoji">{emoji}</span>}
                  {title && <h2>{title}</h2>}
                  {subtitle && <p>{subtitle}</p>}
                </div>
              )}

              {learn}

              {showReadyCta && (
                <button
                  className="mt-shell-cta"
                  onClick={() => setPhase('kuiz')}
                  type="button"
                >
                  {language === 'bm' ? 'Saya Dah Sedia → Kuiz' : "I'm Ready → Quiz"}
                </button>
              )}
            </>
          ) : (
            quiz
          )}
        </div>
      )}
    </div>
  );
}
