import{b as De,j as t,r as w,p as ee,F as pn,S as ft}from"./index-YCInXYg5.js";import{S as cn}from"./StatsBar-Dt4MeuCr.js";import{c as ae}from"./confetti.module-oQXWb4Lk.js";import{M as U,r as dn}from"./MatematikActivityFrame-BMYrgoLu.js";import{u as mn}from"./useGamification-g-vGaz2S.js";function xn(){return t.jsxs("div",{className:"mt-scene","aria-hidden":"true",children:[t.jsx("style",{children:`
        .mt-scene {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
          background:
            radial-gradient(ellipse at 18% 10%, color-mix(in srgb, var(--mt-accent) 26%, transparent) 0, transparent 38%),
            radial-gradient(ellipse at 82% 18%, rgba(224, 231, 255, .82) 0, transparent 42%),
            radial-gradient(ellipse at 50% 98%, color-mix(in srgb, var(--mt-accent) 16%, transparent) 0, transparent 44%),
            linear-gradient(180deg, #F8FFFD 0%, #ECFEFF 54%, #E8F7F3 100%);
        }
        .mt-scene::before {
          content: '';
          position: absolute;
          inset: -12% -8%;
          background-image:
            linear-gradient(color-mix(in srgb, var(--mt-dark) 13%, transparent) 1px, transparent 1px),
            linear-gradient(90deg, color-mix(in srgb, var(--mt-dark) 11%, transparent) 1px, transparent 1px);
          background-size: 48px 48px;
          opacity: .42;
          transform: rotate(-2deg);
          mask-image: linear-gradient(180deg, transparent 0%, rgba(0,0,0,.74) 18%, rgba(0,0,0,.62) 74%, transparent 100%);
        }
        .mt-scene::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at center, color-mix(in srgb, var(--mt-dark) 24%, transparent) 1px, transparent 1.4px),
            linear-gradient(120deg, transparent 0 40%, color-mix(in srgb, var(--mt-accent) 10%, transparent) 40.5%, transparent 42% 100%);
          background-size: 34px 34px, 100% 100%;
          opacity: .36;
          mask-image: linear-gradient(180deg, transparent 0%, black 24%, black 74%, transparent 100%);
        }
        .mt-scene-orbit {
          position: absolute;
          left: 50%;
          top: 50%;
          width: min(980px, 128vmin);
          aspect-ratio: 1;
          border-radius: 50%;
          transform: translate(-50%, -50%) rotate(var(--r));
          border: 1px solid color-mix(in srgb, var(--mt-dark) 14%, transparent);
          box-shadow:
            0 0 0 92px color-mix(in srgb, var(--mt-accent) 5%, transparent),
            0 0 0 184px rgba(63, 81, 181, .035);
        }
        .mt-scene-orbit.two {
          width: min(720px, 96vmin);
          --r: -18deg;
          border-color: rgba(63, 81, 181, .13);
          box-shadow: none;
        }
        .mt-scene-orbit.three {
          width: min(520px, 76vmin);
          --r: 22deg;
          border-style: dashed;
          border-color: color-mix(in srgb, var(--mt-accent) 24%, transparent);
          box-shadow: none;
        }
        .mt-scene-panel {
          position: absolute;
          border-radius: 20px;
          background:
            linear-gradient(180deg, rgba(255,255,255,.78), rgba(255,255,255,.38)),
            linear-gradient(135deg, color-mix(in srgb, var(--mt-accent) 12%, transparent), rgba(255,255,255,.12));
          border: 1px solid rgba(255,255,255,.72);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.94),
            0 18px 48px rgba(15, 118, 110, .08);
          backdrop-filter: blur(8px);
          opacity: .72;
        }
        .mt-scene-panel::before {
          content: '';
          position: absolute;
          inset: 10px;
          border-radius: 14px;
          border: 1px dashed color-mix(in srgb, var(--mt-dark) 12%, transparent);
          opacity: .9;
        }
        .mt-scene-panel::after {
          content: attr(data-glyph);
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: clamp(18px, 3.6vmin, 34px);
          color: color-mix(in srgb, var(--mt-dark) 28%, transparent);
          text-shadow: 0 1px 0 rgba(255,255,255,.6);
        }
        .mt-scene-panel.one {
          width: clamp(92px, 17vmin, 168px);
          height: clamp(64px, 11vmin, 112px);
          left: clamp(14px, 8vw, 108px);
          top: clamp(96px, 18vh, 176px);
          transform: rotate(-7deg);
        }
        .mt-scene-panel.two {
          width: clamp(82px, 15vmin, 146px);
          height: clamp(82px, 15vmin, 146px);
          right: clamp(12px, 9vw, 120px);
          top: clamp(128px, 24vh, 220px);
          transform: rotate(8deg);
        }
        .mt-scene-panel.three {
          width: clamp(110px, 20vmin, 190px);
          height: clamp(54px, 9vmin, 92px);
          right: clamp(20px, 12vw, 150px);
          bottom: clamp(34px, 12vh, 130px);
          transform: rotate(-4deg);
        }
        .mt-scene-mark {
          position: absolute;
          display: grid;
          place-items: center;
          width: clamp(34px, 6.6vmin, 56px);
          height: clamp(34px, 6.6vmin, 56px);
          border-radius: 16px;
          background: rgba(255, 255, 255, .64);
          border: 1px solid color-mix(in srgb, var(--mt-accent) 24%, rgba(255,255,255,.64));
          color: color-mix(in srgb, var(--mt-dark) 78%, #3F51B5);
          font-family: 'Baloo 2', sans-serif;
          font-weight: 900;
          font-size: clamp(20px, 4.6vmin, 38px);
          box-shadow: 0 12px 28px rgba(15, 118, 110, .10);
          transform: rotate(var(--r));
        }
        .mt-mark-1 { top: 17%; left: 27%; --r: -10deg; }
        .mt-mark-2 { top: 12%; right: 31%; --r: 8deg; }
        .mt-mark-3 { bottom: 15%; left: 10%; --r: 12deg; }
        .mt-mark-4 { bottom: 13%; right: 10%; --r: -7deg; }
        @media (max-width: 560px) {
          .mt-scene-panel.one { left: -44px; top: 124px; }
          .mt-scene-panel.two { right: -48px; top: 190px; }
          .mt-scene-panel.three { display: none; }
          .mt-mark-1, .mt-mark-2 { opacity: .46; }
        }
      `}),t.jsx("div",{className:"mt-scene-orbit",style:{"--r":"8deg"}}),t.jsx("div",{className:"mt-scene-orbit two"}),t.jsx("div",{className:"mt-scene-orbit three"}),t.jsx("div",{className:"mt-scene-panel one","data-glyph":"10"}),t.jsx("div",{className:"mt-scene-panel two","data-glyph":"+"}),t.jsx("div",{className:"mt-scene-panel three","data-glyph":"sa"}),t.jsx("div",{className:"mt-scene-mark mt-mark-1",children:"+"}),t.jsx("div",{className:"mt-scene-mark mt-mark-2",children:"7"}),t.jsx("div",{className:"mt-scene-mark mt-mark-3",children:"="}),t.jsx("div",{className:"mt-scene-mark mt-mark-4",children:"3"})]})}const hn=De.memo(xn);function Oi({language:e="bm",onBack:n,theme:a={accent:"#F59E0B",dark:"#D97706",cd:"#B45309"},emoji:i="📖",titleBM:r="",titleEN:o="",headerTitleBM:s="",headerTitleEN:l="",subtitleBM:c="",subtitleEN:d="",learn:p=null,quiz:m=null,showReadyCta:x=!0,showToggle:h=!0,background:f=null,darkChrome:g=!1,formalMode:b=!1}){const[v,y]=w.useState("belajar"),j=g,S=e==="bm"?r:o,D=e==="bm"?s:l,E=e==="bm"?c:d,L=D||S||E;return t.jsxs("div",{className:`mt-topic-shell${j?" mt-dark-chrome":""}`,style:{"--mt-accent":a.accent,"--mt-dark":a.dark,"--mt-cd":a.cd,...j?{background:"#05030F"}:b?{background:"#fff"}:null},children:[t.jsx("style",{children:`
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
      `}),j&&t.jsx("style",{children:`
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
      `}),j&&t.jsx("style",{children:"@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600&family=Space+Grotesk:wght@700&display=swap');"}),b&&t.jsx("style",{children:".mt-shell { background: #fff !important; }"}),f||!b&&t.jsx(hn,{}),j?t.jsx(t.Fragment,{children:t.jsxs("div",{className:"mb-header",children:[t.jsx("button",{type:"button",className:"mb-back",onClick:n,children:t.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:t.jsx("path",{d:"M19 12H5M12 19l-7-7 7-7"})})}),t.jsxs("div",{className:"mb-brand-center",children:[t.jsx("div",{className:"mb-planet-icon",children:t.jsx("div",{className:"mb-planet-ring"})}),t.jsxs("div",{className:"mb-brand-text",children:[t.jsx("div",{className:"mb-brand-title",children:"Math Buddies"}),t.jsx("div",{className:"mb-brand-sub",children:"IMAN SPACE LAB"})]})]})]})}):t.jsxs("div",{className:"mt-shell-top",children:[t.jsx("button",{type:"button",className:"mt-top-back",onClick:n,children:t.jsx("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:t.jsx("path",{d:"M19 12H5M12 19l-7-7 7-7"})})}),L&&t.jsx("div",{className:"mt-shell-topic-label","aria-label":L,children:t.jsx("div",{className:"mt-shell-topic-label-text",children:L})}),!b&&t.jsx("div",{className:"mt-top-stats",children:t.jsx(cn,{subject:"mt",variant:"mb"})})]}),h&&t.jsxs("div",{className:"mt-shell-toggle",children:[t.jsx("button",{className:`mt-shell-toggle-btn${v==="belajar"?" active":""}`,onClick:()=>y("belajar"),type:"button",children:e==="bm"?"Belajar":"Learn"}),t.jsx("button",{className:`mt-shell-toggle-btn${v==="kuiz"?" active":""}`,onClick:()=>y("kuiz"),type:"button",children:e==="bm"?"Kuiz":"Quiz"})]}),h?t.jsx("div",{className:"mt-shell-body",children:v==="belajar"?t.jsxs(t.Fragment,{children:[(i||S||E)&&t.jsxs("div",{className:"mt-shell-banner",children:[i&&t.jsx("span",{className:"mt-shell-banner-emoji",children:i}),S&&t.jsx("h2",{children:S}),E&&t.jsx("p",{children:E})]}),p,x&&t.jsx("button",{className:"mt-shell-cta",onClick:()=>y("kuiz"),type:"button",children:e==="bm"?"Saya Dah Sedia → Kuiz":"I'm Ready → Quiz"})]}):m}):t.jsx("div",{className:"mt-shell-body-plain",children:p})]})}const M=[{bg:"#F87171",border:"#DC2626"},{bg:"#FB923C",border:"#EA580C"},{bg:"#FBBF24",border:"#D97706"},{bg:"#34D399",border:"#059669"},{bg:"#60A5FA",border:"#2563EB"},{bg:"#A78BFA",border:"#7C3AED"},{bg:"#F472B6",border:"#DB2777"}],un=["🍦","🍬","🚗","🐟","🍎","🎈","👕","⭐","🐱","🍌","🐒","👖","🦒","🐘","🐰","🦜","🍇","🐠","🚌","🎁"],u=(e,n)=>Math.floor(Math.random()*(n-e+1))+e,A=e=>e[Math.floor(Math.random()*e.length)],C=e=>{const n=[...e];for(let a=n.length-1;a>0;a--){const i=Math.floor(Math.random()*(a+1));[n[a],n[i]]=[n[i],n[a]]}return n};function Re(e){const n=A(un);if(e==="banyak-sedikit"||e==="lebih-kurang"){const r=A(e==="banyak-sedikit"?["banyak","sedikit"]:["lebih","kurang"]);let o=u(1,9),s=u(1,9);for(;s===o;)s=u(1,9);return{type:r,icon:n,a:o,b:s}}const a=u(2,8);let i=u(1,9);for(;i===a;)i=u(1,9);return Math.random()<.5?{type:"sama-banyak",icon:n,ref:a,a,b:i}:{type:"sama-banyak",icon:n,ref:a,a:i,b:a}}function gt(){const e=[];for(let n=0;n<4;n++)e.push(Re("banyak-sedikit"));for(let n=0;n<4;n++)e.push(Re("lebih-kurang"));for(let n=0;n<2;n++)e.push(Re("sama-banyak"));return C(e)}const fn={banyak:"Yang manakah banyak?",sedikit:"Yang manakah sedikit?",lebih:"Yang manakah lebih?",kurang:"Yang manakah kurang?","sama-banyak":"Yang manakah sama banyak?"},gn={banyak:"Pembelajaran Banyak atau Sedikit",sedikit:"Pembelajaran Banyak atau Sedikit",lebih:"Pembelajaran Lebih atau Kurang",kurang:"Pembelajaran Lebih atau Kurang","sama-banyak":"Pembelajaran Sama Banyak"};function bn(e){if(e.type==="sama-banyak")return e.a===e.ref?"a":"b";const n=e.a>e.b?"a":"b",a=e.a>e.b?"b":"a";return e.type==="banyak"||e.type==="lebih"?n:a}function oe({icon:e,count:n}){const i=[];for(let r=0;r<Math.ceil(n/4);r++){const o=[];for(let s=0;s<4&&r*4+s<n;s++)o.push(t.jsx("span",{style:{fontSize:"clamp(22px, 5vmin, 48px)",lineHeight:1.15},children:e},s));i.push(t.jsx("div",{style:{display:"flex",justifyContent:"center",gap:"clamp(2px, 0.5vw, 6px)"},children:o},r))}return t.jsx("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"2px"},children:i})}function yn({data:e,language:n,theme:a,onExit:i}){const r=w.useContext(pn),[o,s]=w.useState(()=>e?.questions||gt()),[l,c]=w.useState(0),[d,p]=w.useState(null),[m,x]=w.useState(0),[h,f]=w.useState(0),[g,b]=w.useState(0),[v,y]=w.useState(!1),j=o[l%o.length],S=bn(j),D=d!==null,E=D&&d===S,L=l+1>=o.length,K=o.length,B=K>0?Math.round(m/K*100):0,T=Math.ceil(K*.8),P=m>=T,W={accent:a.accent||"#F59E0B",dark:a.dark||"#B45309",cd:a.cd||"#92400E",green:"#16A34A",red:"#DC2626"},_=k=>{D||(p(k),k===S?(x($=>$+1),b($=>$+1),ee("correct"),ae({particleCount:45,spread:60,startVelocity:32,origin:{y:.7},scalar:.85})):(f($=>$+1),b(0),ee("wrong")))},Q=()=>{if(L){dn(e?.scoreStorageKey,e?.scoreId,m,o.length),y(!0),ee("streak"),ae({particleCount:200,spread:160,origin:{y:.4}}),setTimeout(()=>ae({particleCount:140,spread:120,startVelocity:45,origin:{y:.55}}),250);return}p(null),c(l+1)},X=()=>{s(gt()),c(0),p(null),x(0),f(0),b(0),y(!1)},G=k=>k==="a"?0:1,I=k=>{const $=d===k,Y=k===S,H=G(k),O=M[H];return D?Y?t.jsx("div",{className:"cmp-box ok","aria-hidden":"true",children:"✓"}):$?t.jsx("div",{className:"cmp-box no","aria-hidden":"true",children:"✗"}):t.jsx("div",{className:"cmp-box num dim","aria-hidden":"true",children:j[k]}):t.jsx("div",{className:"cmp-box num","aria-hidden":"true",style:{background:O.bg,color:"#fff",textShadow:"0 1px 2px rgba(0,0,0,.34)",border:"none",borderBottom:`4px solid ${O.border}`},children:j[k]})},R=({side:k})=>{const $=G(k),Y=M[$],H=d===k,O=k===S;return t.jsxs("div",{className:`cmp-panel${D?" done":""}${H?" picked":""}${D&&O?" is-correct":""}${D&&H&&!O?" is-wrong":""}`,onClick:()=>_(k),role:"button",tabIndex:0,"aria-label":k==="a"?"Kumpulan pertama":"Kumpulan kedua",onKeyDown:Z=>{(Z.key==="Enter"||Z.key===" ")&&(Z.preventDefault(),_(k))},style:{background:"#fff",border:D?`2px solid ${H&&!O?W.red:W.green}`:"2px solid #E2E8F0",borderBottom:`4px solid ${D?H&&!O?W.red:W.green:Y.border}`,color:"#334155"},children:[t.jsx("div",{className:"cmp-objects",children:t.jsx(oe,{icon:j.icon,count:j[k]})}),I(k)]})},F=g>0&&g%10===0?10:g%10;return t.jsxs("div",{style:{display:"flex",flexDirection:"column",height:"100%",minHeight:0,width:"100%"},children:[t.jsx("style",{children:`
        /* Scroll area + vertical centering. The inner wrapper is min-height:100%
           so short content centers in the middle of the page, tall content
           scrolls from the top. */
        /* Sizes use vmin (the smaller of vw/vh) so on tablet/desktop the whole
           component scales to the viewport HEIGHT and fits on one page without
           scrolling, while still being large. On phones it tracks width. */
        .cmp-scroll { flex: 1; min-height: 0; overflow-y: auto; -webkit-overflow-scrolling: touch; }
        .cmp-center {
          min-height: 100%; box-sizing: border-box;
          display: flex; flex-direction: column; justify-content: center; align-items: center;
          padding: clamp(14px, 3vmin, 40px);
        }
        .cmp-content {
          width: 100%; max-width: min(94vw, 860px);
          display: flex; flex-direction: column; align-items: center;
          gap: clamp(12px, 2.4vmin, 30px);
        }

        .cmp-head {
          font-family: 'Fredoka', sans-serif; font-weight: 700;
          font-size: clamp(14px, 2.4vmin, 24px); color: #64748B; text-align: center; letter-spacing: .01em;
        }
        /* Header sits as a TITLE near the top; the body is centred in the space
           below it (kept clear of the header). */
        .cmp-scroll-q { display: flex; flex-direction: column; }
        .cmp-head-title {
          flex-shrink: 0;
          padding: clamp(10px, 2.4vmin, 22px) 16px clamp(2px, 0.6vmin, 8px);
        }
        .cmp-body {
          flex: 1 0 auto; box-sizing: border-box;
          display: flex; flex-direction: column; justify-content: center; align-items: center;
          padding: clamp(8px, 2vmin, 22px) clamp(14px, 3vmin, 40px) clamp(14px, 3vmin, 40px);
        }
        .cmp-question {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(22px, 4.6vmin, 44px); color: #1E293B; text-align: center; line-height: 1.15;
        }

        .cmp-ref { display: flex; flex-direction: column; align-items: center; gap: clamp(6px, 1.2vmin, 12px); }
        .cmp-ref-label { font-family: 'Fredoka', sans-serif; font-weight: 600; font-size: clamp(13px, 1.9vmin, 20px); color: #64748B; }
        .cmp-ref-box { background: #F1F5F9; border-radius: 16px; padding: clamp(8px, 1.4vmin, 16px) clamp(16px, 2.4vmin, 28px); }

        .cmp-options { display: flex; gap: clamp(12px, 2.2vmin, 26px); width: 100%; }
        .cmp-panel {
          flex: 1; display: flex; flex-direction: column; align-items: center; gap: clamp(10px, 1.6vmin, 18px);
          background: #fff; border: 2px solid #E2E8F0; border-radius: clamp(18px, 2vmin, 26px);
          padding: clamp(12px, 2vmin, 28px) clamp(8px, 1.4vmin, 20px);
          cursor: pointer; transition: all .15s ease;
          min-height: clamp(130px, 24vmin, 300px); justify-content: space-between;
          user-select: none; -webkit-tap-highlight-color: transparent;
        }
        .cmp-panel:hover:not(.done) { border-color: #CBD5E1; }
        .cmp-panel:active:not(.done) { transform: scale(.98); }
        .cmp-panel.done { cursor: default; }
        .cmp-objects { display: flex; align-items: center; justify-content: center; flex: 1; }

        .cmp-box {
          width: clamp(34px, 4.8vmin, 52px); height: clamp(34px, 4.8vmin, 52px); border-radius: clamp(9px, 1.2vmin, 13px);
          border: 3px solid #CBD5E1; background: #fff;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Baloo 2', sans-serif; font-weight: 900; font-size: clamp(20px, 3.2vmin, 32px);
          color: #334155; transition: all .15s ease;
        }
        .cmp-box.num { color: #334155; }
        .cmp-box.dim { opacity: .4; }
        .cmp-box.ok  { border-color: ${W.green}; background: ${W.green}; color: #fff; }
        .cmp-box.no  { border-color: ${W.red};   background: ${W.red};   color: #fff; }

        /* min-height reserves the line so showing feedback never adds height
           (keeps the page from overflowing into a scroll). */
        .cmp-feedback {
          font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(17px, 2.6vmin, 28px);
          text-align: center; min-height: clamp(24px, 3.4vmin, 38px);
          display: flex; align-items: center; justify-content: center;
        }
        .cmp-feedback.ok { color: ${W.green}; }
        .cmp-feedback.no { color: ${W.red}; }

        .cmp-next {
          padding: clamp(11px, 1.5vmin, 17px) clamp(28px, 4vmin, 52px); border: none; border-radius: 999px;
          background: ${W.accent}; color: #fff;
          font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(17px, 2.6vmin, 26px);
          cursor: pointer; box-shadow: 0 4px 0 ${W.cd}; transition: transform .1s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .cmp-next:hover:not(:disabled) { transform: translateY(-2px); }
        .cmp-next:active:not(:disabled) { transform: translateY(2px); }
        .cmp-next:disabled { background: #E5E7EB; color: #9CA3AF; box-shadow: 0 4px 0 #D1D5DB; cursor: not-allowed; }

        .cmp-footer {
          flex-shrink: 0; display: flex; align-items: center; justify-content: space-between;
          gap: 10px; padding: clamp(8px, 1.2vmin, 15px) clamp(16px, 2.4vmin, 34px);
          background: rgba(255,255,255,.85); backdrop-filter: blur(12px);
          border-top: 1px solid #E2E8F0;
        }
        .cmp-footer-tally {
          display: flex; align-items: center; gap: 6px 10px; flex-wrap: wrap;
          font-family: 'Fredoka', sans-serif; font-size: clamp(13px, 1.7vmin, 18px); font-weight: 600; color: #64748B;
        }
        /* Keep "✅ Betul | ❌ salah" together as one unit so on small screens it
           wraps to its own line under "Jawapan :" (never splitting mid-pair). */
        .cmp-stats { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
        .cmp-stats .cmp-stat { display: inline-flex; align-items: center; gap: 3px; }
        .cmp-stats .cmp-divider { color: #CBD5E1; font-weight: 400; }

        /* Completion screen */
        .cmp-done-emoji { font-size: clamp(52px, 14vmin, 120px); line-height: 1; }
        .cmp-summary { display: flex; flex-direction: column; gap: clamp(8px, 1.4vmin, 14px); width: 100%; max-width: 340px; }
        .cmp-summary-row {
          display: flex; align-items: center; justify-content: space-between;
          background: #fff; border: 2px solid #E2E8F0; border-radius: 14px;
          padding: clamp(10px, 1.6vmin, 16px) clamp(16px, 2.4vmin, 26px);
          font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(16px, 2.4vmin, 22px); color: #334155;
        }
        .cmp-summary-row b { font-size: clamp(20px, 3vmin, 28px); }
        .cmp-summary-row.ok b { color: ${W.green}; }
        .cmp-summary-row.no b { color: ${W.red}; }
        .cmp-complete-actions { display: flex; flex-wrap: wrap; gap: clamp(10px, 1.6vmin, 16px); justify-content: center; }
        .cmp-btn-secondary {
          padding: clamp(11px, 1.5vmin, 17px) clamp(24px, 3.4vmin, 44px); border-radius: 999px;
          border: 2px solid ${W.accent}; background: #fff; color: ${W.dark};
          font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(16px, 2.4vmin, 24px);
          cursor: pointer; -webkit-tap-highlight-color: transparent; transition: transform .1s ease;
        }
        .cmp-btn-secondary:active { transform: translateY(1px); }
      `}),v?t.jsx("div",{className:"cmp-scroll",children:t.jsx("div",{className:"cmp-center",children:t.jsxs("div",{className:"cmp-content",style:{textAlign:"center"},children:[t.jsx("div",{className:"cmp-done-emoji",children:P?"🎉":"💪"}),t.jsx("div",{className:"cmp-question",children:P?"Tahniah!":"Cuba lagi!"}),t.jsxs("div",{className:"cmp-head",children:["Skor kamu: ",m,"/",K," (",B,"%)"]}),t.jsxs("div",{className:"cmp-summary",children:[t.jsxs("div",{className:"cmp-summary-row ok",children:[t.jsx("span",{children:"✅ Betul"}),t.jsx("b",{children:m})]}),t.jsxs("div",{className:"cmp-summary-row no",children:[t.jsx("span",{children:"❌ Salah"}),t.jsx("b",{children:h})]})]}),!P&&t.jsxs("div",{className:"cmp-head",style:{color:"#B45309"},children:["Dapat ",T,"/",K," (80%) untuk buka topik seterusnya"]}),t.jsxs("div",{className:"cmp-complete-actions",children:[t.jsx("button",{className:"cmp-btn-secondary",type:"button",onClick:X,children:"↻ Main Semula"}),t.jsx("button",{className:"cmp-next",type:"button",disabled:!P,onClick:()=>r?.goNext?r.goNext():i?.(),children:r?.hasNext===!1?"Selesai ✓":"Topik Seterusnya →"})]})]})})}):t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"cmp-scroll cmp-scroll-q",children:[t.jsx("div",{className:"cmp-head cmp-head-title",children:gn[j.type]}),t.jsx("div",{className:"cmp-body",children:t.jsxs("div",{className:"cmp-content",children:[t.jsx("div",{className:"cmp-question",children:fn[j.type]}),j.type==="sama-banyak"&&t.jsxs("div",{className:"cmp-ref",children:[t.jsx("div",{className:"cmp-ref-label",children:"Sama dengan ini"}),t.jsx("div",{className:"cmp-ref-box",children:t.jsx(oe,{icon:j.icon,count:j.ref})})]}),t.jsxs("div",{className:"cmp-options",children:[t.jsx(R,{side:"a"}),t.jsx(R,{side:"b"})]}),t.jsx("div",{className:`cmp-feedback ${D?E?"ok":"no":""}`,children:D?E?"Betul! 🎉":"Cuba lagi":""}),D&&t.jsx("button",{className:"cmp-next",type:"button",onClick:Q,children:L?"Tamat 🎉":"Seterusnya →"})]})})]}),t.jsxs("div",{className:"cmp-footer",children:[t.jsxs("div",{className:"cmp-footer-tally",children:[t.jsx("span",{children:"Jawapan :"}),t.jsxs("span",{className:"cmp-stats",children:[t.jsxs("span",{className:"cmp-stat",style:{color:"#1E293B"},children:[t.jsx("span",{children:"✅"}),t.jsx("span",{children:m}),t.jsx("span",{style:{color:"#94A3B8",fontWeight:500},children:"Betul"})]}),t.jsx("span",{className:"cmp-divider",children:"|"}),t.jsxs("span",{className:"cmp-stat",style:{color:"#EF4444"},children:[t.jsx("span",{children:"❌"}),t.jsx("span",{children:h}),t.jsx("span",{style:{color:"#94A3B8",fontWeight:500},children:"salah"})]})]})]}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4},children:[t.jsx("span",{style:{fontSize:18},children:"🏆"}),t.jsx("div",{style:{width:70,height:7,background:"rgba(204,119,0,0.15)",borderRadius:4,overflow:"hidden"},children:t.jsx("div",{style:{width:`${F/10*100}%`,height:"100%",background:"#FFB800",borderRadius:4,transition:"width .3s ease-out"}})}),t.jsxs("span",{style:{color:"#CC7700",fontSize:"0.85rem",fontWeight:900,minWidth:28,textAlign:"right"},children:[F,"/10"]})]})]})]})]})}const ce=["🍎","⭐","🍦","🐱","🚗","🎈","🍬","🐟","🍌","🐒","🌟","🍇","🐘","🦒","🎁","🐰","🦋","🐝","🌺","🍕"],kn=["sifar","satu","dua","tiga","empat","lima","enam","tujuh","lapan","sembilan","sepuluh","sebelas","dua belas","tiga belas","empat belas","lima belas","enam belas","tujuh belas","lapan belas","sembilan belas","dua puluh"],ge={min:0,max:10,bilang:4,kenal:3,sifar:3};function vn(e){return kn[e]}function wn(e=ge){const{min:n,max:a}=e,i=u(n,a),r=A(ce),o=Math.random()<.5?"numeral":"word",s=new Set([i]),l=[];for(let x=1;x<=5;x++)i-x>=n&&l.push(i-x),i+x<=a&&l.push(i+x);const c=C(l);for(const x of c){if(s.size>=4)break;s.add(x)}for(;s.size<4;)for(let x=n;x<=a&&!(s.size>=4);x++)s.add(x);const p=C([...s]).map((x,h)=>({id:`opt-${h}`,value:x,display:o==="word"?vn(x):x})),m=p.find(x=>x.value===i).id;return{type:"bilang",header:"Pembelajaran Mengira",prompt:"Berapakah bilangannya?",kind:o,count:i,icon:r,options:p,answer:m}}function jn(e=ge){const n=A(ce),a=[{id:"g-0",count:0}],i=new Set([0]),{min:r,max:o}=e;for(let l=1;l<3;l++){let c;do c=u(Math.max(1,r),o);while(i.has(c));i.add(c),a.push({id:`g-${l}`,count:c})}return{type:"kenali-sifar",header:"Pembelajaran Sifar",prompt:"Pilih kad kosong (sifar)",icon:n,groups:C(a),answer:"g-0"}}function Fn(e=ge){const{min:n,max:a}=e,i=u(n,a),r=A(ce),o=Math.random()<.5?2:3,s=[{id:"g-0",count:i}],l=new Set([i]);for(let d=1;d<o;d++){let p;do p=u(n,a);while(l.has(p));l.add(p),s.push({id:`g-${d}`,count:p})}const c=s.find(d=>d.count===i).id;return{type:"kenal-nombor",header:"Pembelajaran Nombor",prompt:`Yang manakah ${i}?`,number:i,icon:r,groups:C(s),answer:c}}function Sn(e=ge){const n=[];for(let a=0;a<e.bilang;a++)n.push(wn(e));for(let a=0;a<e.kenal;a++)n.push(Fn(e));if(e.sifar>0)for(let a=0;a<e.sifar;a++)n.push(jn(e));return C(n)}function pe({height:e,compact:n}){return t.jsx("div",{style:{border:"2px dashed #CBD5E1",borderRadius:"clamp(12px, 1.6vmin, 20px)",minHeight:e||"clamp(60px, 10vmin, 120px)",width:n?"clamp(50px, 8vmin, 100px)":"clamp(80px, 14vmin, 160px)",display:"flex",alignItems:"center",justifyContent:"center"}})}function Bt({icon:e,count:n,compact:a}){if(n===0)return null;const i=a?"clamp(18px, 3.5vmin, 36px)":"clamp(22px, 5vmin, 48px)";if(n>10){const s=[],l=Math.floor(n/5),c=n%5;for(let d=0;d<l;d++){const p=[];for(let m=0;m<5;m++)p.push(t.jsx("span",{style:{fontSize:i,lineHeight:1.15},children:e},m));s.push(t.jsx("div",{style:{display:"flex",justifyContent:"center",gap:"clamp(2px, 0.5vw, 6px)"},children:p},`r${d}`))}if(c>0){const d=[];for(let p=0;p<c;p++)d.push(t.jsx("span",{style:{fontSize:i,lineHeight:1.15},children:e},p));s.push(t.jsx("div",{style:{display:"flex",justifyContent:"center",gap:"clamp(2px, 0.5vw, 6px)"},children:d},"lr"))}return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[s[0],s[1],s.length>2&&t.jsx("div",{style:{height:"clamp(8px, 1.2vmin, 16px)"}}),s.slice(2)]})}const r=4,o=[];for(let s=0;s<Math.ceil(n/r);s++){const l=[];for(let c=0;c<r&&s*r+c<n;c++)l.push(t.jsx("span",{style:{fontSize:i,lineHeight:1.15},children:e},c));o.push(t.jsx("div",{style:{display:"flex",justifyContent:"center",gap:"clamp(2px, 0.5vw, 6px)"},children:l},s))}return t.jsx("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"2px"},children:o})}function Bn({icon:e,count:n}){return n===0?t.jsx(pe,{}):t.jsx(Bt,{icon:e,count:n})}function Cn({q:e,ctx:n}){const{answered:a,selected:i,answer:r,handlePick:o,theme:s}=n,l=e.kind==="word";return t.jsxs("div",{className:"kog-count-stage",style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(12px, 2vmin, 24px)",width:"100%"},children:[t.jsx("div",{className:"kog-count-objects",children:t.jsx(Bn,{icon:e.icon,count:e.count})}),t.jsx("div",{className:"kog-answer-grid",style:{display:"grid",gridTemplateColumns:l?"repeat(2, 1fr)":"repeat(4, 1fr)",gap:"clamp(8px, 1.4vmin, 16px)",width:"100%",maxWidth:l?480:400},children:e.options.map((c,d)=>{const p=i===c.id,m=c.id===r,x=M[d%M.length];let h,f,g,b,v;return a&&m?(h=s.green,f=s.green,g="#fff",b="✓",v="snkBounce .5s ease"):a&&p?(h=s.red,f=s.red,g="#fff",b="✗",v="shakeError .35s ease"):(h=x.bg,f=x.border,g="#fff",b=c.display,v="none"),t.jsx("button",{className:"kog-answer-btn",type:"button",onClick:()=>o(c.id),disabled:a,style:{padding:l?"clamp(10px, 1.6vmin, 18px) clamp(8px, 1.4vmin, 16px)":"clamp(10px, 1.6vmin, 18px)",border:"none",borderBottom:a?"none":`4px solid ${f}`,borderRadius:"clamp(12px, 1.6vmin, 18px)",background:h,color:g,fontFamily:"'Baloo 2', sans-serif",fontWeight:900,fontSize:l&&!(a&&(m||p))?"clamp(16px, 2.8vmin, 28px)":"clamp(24px, 4vmin, 40px)",lineHeight:1.1,whiteSpace:"nowrap",cursor:a?"default":"pointer",transition:"all .15s ease",WebkitTapHighlightColor:"transparent",minHeight:44,minWidth:44,animation:v},children:b},c.id)})})]})}function An(e,n=3){const a=n<=2;return e<=2?a?"clamp(34px, 10vmin, 68px)":"clamp(28px, 7.6vmin, 54px)":e<=4?a?"clamp(28px, 7.4vmin, 54px)":"clamp(22px, 5.8vmin, 42px)":e<=6?a?"clamp(24px, 6.4vmin, 46px)":"clamp(19px, 5vmin, 36px)":e<=8?a?"clamp(22px, 5.8vmin, 42px)":"clamp(17px, 4.4vmin, 32px)":a?"clamp(19px, 4.8vmin, 36px)":"clamp(15px, 3.9vmin, 28px)"}const Ct=`
  .kog-cell { flex: 1; display: flex; align-items: center; justify-content: center; width: 100%; }
  .kog-grid {
    display: grid; grid-template-columns: repeat(var(--kog-cols), auto);
    justify-content: center; justify-items: center; align-items: center;
  }
  @media (max-width: 480px) {
    .kog-grid { grid-template-columns: repeat(var(--kog-cols-sm), auto); }
  }
`;function At({icon:e,count:n,cols:a=3}){if(n===0)return t.jsx(pe,{height:"clamp(40px, 7vmin, 80px)",compact:!0});const i=An(n,a);return t.jsx("div",{className:"kog-grid",style:{"--kog-cols":Math.min(n,4),"--kog-cols-sm":Math.min(n,3),gap:"clamp(2px, 0.9vmin, 8px)"},children:Array.from({length:n}).map((r,o)=>t.jsx("span",{style:{fontSize:i,lineHeight:1.05},children:e},o))})}function En({q:e,ctx:n}){const{answered:a,selected:i,answer:r,handlePick:o,theme:s}=n;return t.jsxs("div",{className:"kog-options",style:{display:"flex",gap:"clamp(12px, 2.2vmin, 26px)",width:"100%",justifyContent:"center"},children:[t.jsx("style",{children:Ct}),e.groups.map((l,c)=>{const d=i===l.id,p=l.id===r,m=M[c%M.length];let x,h;return a&&p?(s.green,x=s.green,h="snkBounce .5s ease"):a&&d?(s.red,x=s.red,h="shakeError .35s ease"):(m.bg,x=m.border,h="none"),t.jsxs("div",{className:`kog-option${a&&p?" is-correct":""}${a&&d&&!p?" is-wrong":""}`,onClick:()=>o(l.id),role:"button",tabIndex:0,onKeyDown:f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),o(l.id))},style:{flex:1,minWidth:0,overflow:"hidden",display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(8px, 1.4vmin, 16px)",background:"#fff",border:"2px solid #E2E8F0",borderBottom:`4px solid ${x}`,borderRadius:"clamp(18px, 2vmin, 26px)",padding:"clamp(10px, 1.6vmin, 22px) clamp(12px, 2.2vmin, 22px)",cursor:a?"default":"pointer",transition:"all .15s ease",minHeight:"clamp(140px, 26vmin, 320px)",justifyContent:"space-between",userSelect:"none",WebkitTapHighlightColor:"transparent",animation:h},children:[t.jsx("div",{className:"kog-cell",children:t.jsx(At,{icon:e.icon,count:l.count,cols:e.groups.length})}),t.jsx("div",{style:{height:"clamp(26px, 4.6vmin, 42px)",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Baloo 2', sans-serif",fontWeight:900,fontSize:"clamp(26px, 4.6vmin, 42px)",lineHeight:1,color:a?p?s.green:s.red:"transparent"},children:a?p?"✓":d?"✗":"":""})]},l.id)})]})}function $n({q:e,ctx:n}){const{answered:a,selected:i,answer:r,handlePick:o,theme:s}=n;return t.jsxs("div",{className:"kog-options",style:{display:"flex",gap:"clamp(12px, 2.2vmin, 26px)",width:"100%",justifyContent:"center"},children:[t.jsx("style",{children:Ct}),e.groups.map((l,c)=>{const d=i===l.id,p=l.id===r,m=l.count===0,x=M[c%M.length];let h,f,g;return a&&p?(h=s.green,f=s.green,g="snkBounce .5s ease"):a&&d?(h=s.red,f=s.red,g="shakeError .35s ease"):(h=x.bg,f=x.border,g="none"),t.jsxs("div",{className:`kog-option${a&&p?" is-correct":""}${a&&d&&!p?" is-wrong":""}`,onClick:()=>o(l.id),role:"button",tabIndex:0,onKeyDown:b=>{(b.key==="Enter"||b.key===" ")&&(b.preventDefault(),o(l.id))},style:{flex:1,minWidth:0,overflow:"hidden",display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(8px, 1.4vmin, 16px)",background:"#fff",border:"2px solid #E2E8F0",borderBottom:`4px solid ${f}`,borderRadius:"clamp(18px, 2vmin, 26px)",padding:"clamp(10px, 1.6vmin, 22px) clamp(12px, 2.2vmin, 22px)",cursor:a?"default":"pointer",transition:"all .15s ease",minHeight:"clamp(140px, 26vmin, 320px)",justifyContent:"space-between",userSelect:"none",WebkitTapHighlightColor:"transparent",animation:g},children:[t.jsx("div",{className:"kog-cell",children:m?t.jsx(pe,{compact:!0}):t.jsx(At,{icon:e.icon,count:l.count,cols:e.groups.length})}),t.jsx("div",{style:{width:"clamp(30px, 4vmin, 46px)",height:"clamp(30px, 4vmin, 46px)",borderRadius:"clamp(8px, 1vmin, 12px)",border:"none",borderBottom:`4px solid ${f}`,background:h,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Baloo 2', sans-serif",fontWeight:900,fontSize:"clamp(18px, 2.8vmin, 28px)",color:"#fff",textShadow:"0 1px 2px rgba(0,0,0,.34)",transition:"all .15s ease"},children:a?p?"✓":d?"✗":"":l.count})]},l.id)})]})}function Dn({data:e,language:n,theme:a,onExit:i}){const r=e?.config||ge,o=()=>Sn(r);return t.jsx(U,{buildRound:o,renderQuestion:(s,l)=>s.type==="bilang"?t.jsx(Cn,{q:s,ctx:l}):s.type==="kenali-sifar"?t.jsx($n,{q:s,ctx:l}):t.jsx(En,{q:s,ctx:l}),theme:a,onExit:i,scoreStorageKey:e?.scoreStorageKey,scoreId:e?.scoreId})}const He=["🍎","⭐","🍦","🐱","🚗","🎈","🍬","🐟","🍌","🐒","🌟","🍇","🐘","🦒","🎁","🐰","🦋","🐝","🌺","🍕"];function zn(){const e=u(2,10),n=u(1,e-1),a=e-n,i=A(He),r=e,o=new Set([e]);for(let l=1;o.size<4;l++)e+l<=10&&o.add(e+l),e-l>=0&&o.add(e-l);const s=C([...o]).map((l,c)=>({id:`opt-${c}`,value:l}));return{type:"jumlah",header:"Pembelajaran Kombinasi",prompt:"Berapa jumlahnya?",icon:i,a:n,b:a,options:s,answer:s.find(l=>l.value===r).id}}function Wn(){const e=u(2,10),n=u(1,e-1),a=e-n,i=A(He),r=a,o=new Set([a]);for(let l=1;o.size<4;l++)a+l<=10&&o.add(a+l),a-l>=0&&o.add(a-l);const s=C([...o]).map((l,c)=>({id:`opt-${c}`,value:l}));return{type:"lengkapkan",header:"Pembelajaran Lengkapkan",prompt:`${n} dan ? ialah ${e}`,icon:i,a:n,whole:e,options:s,answer:s.find(l=>l.value===r).id}}function Tn(){const e=u(1,9),n=10-e,a=A(He),i=n,r=new Set([n]);for(let s=1;r.size<4;s++)n+s<=10&&r.add(n+s),n-s>=0&&r.add(n-s);const o=C([...r]).map((s,l)=>({id:`opt-${l}`,value:s}));return{type:"jadikan-10",header:"Pembelajaran Jadikan 10",prompt:"Berapa lagi untuk jadi 10?",icon:a,a:e,options:o,answer:o.find(s=>s.value===i).id}}function Nn(){const e=[];for(let n=0;n<4;n++)e.push(zn());for(let n=0;n<3;n++)e.push(Wn());for(let n=0;n<3;n++)e.push(Tn());return C(e)}function Pn({icon:e,filled:n}){const a=[];for(let i=0;i<10;i++){const r=i<n;a.push(t.jsx("div",{style:{width:"clamp(28px, 5vmin, 52px)",height:"clamp(28px, 5vmin, 52px)",border:r?"2px solid transparent":"2px dashed #CBD5E1",borderRadius:"clamp(6px, 0.8vmin, 10px)",background:r?"#FFF7ED":"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"clamp(18px, 3.6vmin, 38px)"},children:r?t.jsx("span",{children:e}):null},i))}return t.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(5, 1fr)",gap:"clamp(4px, 0.6vmin, 8px)",background:"#FEFCE8",borderRadius:"clamp(12px, 1.6vmin, 20px)",padding:"clamp(8px, 1.2vmin, 16px)",border:"none",borderBottom:"4px solid #EAB308"},children:a})}function V({options:e,answered:n,selected:a,answer:i,handlePick:r,theme:o}){const s=Math.min(e.length,4);return t.jsx("div",{style:{display:"grid",gridTemplateColumns:`repeat(${s}, 1fr)`,gap:"clamp(8px, 1.4vmin, 16px)",width:"100%",maxWidth:s<=3?360:400},children:e.map((l,c)=>{const d=a===l.id,p=l.id===i,m=M[c%M.length];let x,h,f,g,b;return n&&p?(x=o.green,h=o.green,f="#fff",g="✓",b="snkBounce .5s ease"):n&&d?(x=o.red,h=o.red,f="#fff",g="✗",b="shakeError .35s ease"):(x=m.bg,h=m.border,f="#fff",g=l.value,b="none"),t.jsx("button",{type:"button",onClick:()=>r(l.id),disabled:n,style:{padding:"clamp(10px, 1.6vmin, 18px)",border:"none",borderBottom:n?"none":`4px solid ${h}`,borderRadius:"clamp(12px, 1.6vmin, 18px)",background:x,color:f,fontFamily:"'Baloo 2', sans-serif",fontWeight:900,fontSize:"clamp(24px, 4vmin, 40px)",lineHeight:1.1,whiteSpace:"nowrap",cursor:n?"default":"pointer",transition:"all .15s ease",WebkitTapHighlightColor:"transparent",minHeight:44,minWidth:44,animation:b},children:g},l.id)})})}function In({q:e,ctx:n}){const{answered:a,selected:i,answer:r,handlePick:o,theme:s}=n;return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(12px, 2vmin, 24px)",width:"100%"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"clamp(12px, 2.2vmin, 26px)"},children:[t.jsx(oe,{icon:e.icon,count:e.a}),t.jsx("span",{style:{fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:"clamp(18px, 3vmin, 32px)",color:"#64748B"},children:"dan"}),t.jsx(oe,{icon:e.icon,count:e.b})]}),t.jsx(V,{options:e.options,answered:a,selected:i,answer:r,handlePick:o,theme:s})]})}function Mn({q:e,ctx:n}){const{answered:a,selected:i,answer:r,handlePick:o,theme:s}=n;return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(12px, 2vmin, 24px)",width:"100%"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"clamp(12px, 2.2vmin, 26px)"},children:[t.jsx(oe,{icon:e.icon,count:e.a}),t.jsx("div",{style:{width:"clamp(34px, 4.8vmin, 52px)",height:"clamp(34px, 4.8vmin, 52px)",border:"3px dashed #D1D5DB",borderRadius:"clamp(9px, 1.2vmin, 13px)",display:"flex",alignItems:"center",justifyContent:"center",background:"#F3F4F6",fontFamily:"'Baloo 2', sans-serif",fontWeight:900,fontSize:"clamp(20px, 3.2vmin, 32px)",color:"#9CA3AF"},children:"?"}),t.jsx("div",{style:{border:"none",borderBottom:"4px solid #059669",background:"#34D399",borderRadius:"clamp(12px, 1.6vmin, 20px)",padding:"clamp(6px, 1vmin, 12px) clamp(12px, 2vmin, 24px)",fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:"clamp(22px, 4vmin, 40px)",color:"#fff"},children:e.whole})]}),t.jsx(V,{options:e.options,answered:a,selected:i,answer:r,handlePick:o,theme:s})]})}function Rn({q:e,ctx:n}){const{answered:a,selected:i,answer:r,handlePick:o,theme:s}=n;return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(12px, 2vmin, 24px)",width:"100%"},children:[t.jsx(Pn,{icon:e.icon,filled:e.a}),t.jsx(V,{options:e.options,answered:a,selected:i,answer:r,handlePick:o,theme:s})]})}function Ln({data:e,language:n,theme:a,onExit:i}){return t.jsx(U,{buildRound:Nn,renderQuestion:(r,o)=>r.type==="jumlah"?t.jsx(In,{q:r,ctx:o}):r.type==="lengkapkan"?t.jsx(Mn,{q:r,ctx:o}):t.jsx(Rn,{q:r,ctx:o}),theme:a,onExit:i,scoreStorageKey:e?.scoreStorageKey,scoreId:e?.scoreId})}const _n=["🍎","⭐","🍦","🐱","🚗","🎈","🍬","🐟","🍌","🐒","🌟","🍇","🐘","🦒","🎁","🐰","🦋","🐝","🌺","🍕"],bt=["sifar","satu","dua","tiga","empat","lima","enam","tujuh","lapan","sembilan"],Hn=["sepuluh","sebelas","dua belas","tiga belas","empat belas","lima belas","enam belas","tujuh belas","lapan belas","sembilan belas"],yt=["","","dua puluh","tiga puluh","empat puluh","lima puluh","enam puluh","tujuh puluh","lapan puluh","sembilan puluh"];function ue(e){if(e<0||e>100)return"";if(e===100)return"seratus";if(e<10)return bt[e];if(e<20)return Hn[e-10];const n=Math.floor(e/10),a=e%10;return a===0?yt[n]:`${yt[n]} ${bt[a]}`}function Et(e,n,a){const i=new Set([e]),r=Math.floor(e/10),o=e%10,s=[];if(o!==0){const l=o*10+r;l>=n&&l<=a&&l!==e&&s.push(l)}e+10<=a&&s.push(e+10),e-10>=n&&s.push(e-10),e+1<=a&&s.push(e+1),e-1>=n&&s.push(e-1);for(const l of C(s)){if(i.size>=3)break;i.add(l)}for(;i.size<3;){const l=u(n,a);i.add(l)}return C([...i])}function Kn(){const e=u(21,100),n=A(_n),i=Et(e,21,100).map((r,o)=>({id:`opt-${o}`,value:r}));return{type:"kenali21-bilang",header:"Pembelajaran Mengira",prompt:"Berapakah bilangannya?",count:e,icon:n,options:i,answer:i.find(r=>r.value===e).id}}function On(){const e=u(21,100),n=ue(e),r=Et(e,21,100).map(o=>ue(o)).map((o,s)=>({id:`opt-${s}`,value:o}));return{type:"kenali21-angka-ke-perkataan",header:"Pembelajaran Perkataan",prompt:"Apakah nama nombor ini?",number:e,options:r,answer:r.find(o=>o.value===n).id}}function Gn(){const e=u(21,100);return{type:"kenali21-tulis-angka",header:"Pembelajaran Tulis",prompt:"Tulis nombor dalam angka",word:ue(e),answer:String(e)}}function Yn(){const e=u(21,100),n=ue(e),a=C(n.split(" ").map((i,r)=>({id:r,word:i})));return{type:"kenali21-susun",header:"Pembelajaran Perkataan",prompt:"Tulis nombor dalam perkataan",number:e,answer:n,parts:a}}function Jn(){const e=[];for(let n=0;n<2;n++)e.push(Yn());for(let n=0;n<3;n++)e.push(Gn());for(let n=0;n<2;n++)e.push(Kn());for(let n=0;n<3;n++)e.push(On());return C(e).map((n,a)=>({...n,qid:a}))}function Qn({icon:e,count:n}){if(n===0)return t.jsx(pe,{});const a=Math.floor(n/10),i=n%10,r="clamp(15px, 5.6vw, 26px)",o="clamp(22px, 8vw, 38px)",s="clamp(2px, 1vw, 8px)",l=d=>t.jsx("span",{style:{fontSize:r,width:o,lineHeight:1.1,textAlign:"center",display:"inline-block"},children:e},d),c=d=>t.jsx("div",{style:{display:"flex",justifyContent:"center",gap:s},children:Array.from({length:10}).map((p,m)=>l(d+"-"+m))},d);return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(6px, 1.4vw, 14px)",width:"100%",maxWidth:"min(96vw, 600px)"},children:[a>0&&t.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"clamp(3px, 0.9vw, 8px)",padding:"clamp(10px, 2.4vw, 20px)",background:"#FAFAFA",border:"2px solid #E2E8F0",borderRadius:"clamp(12px, 1.6vmin, 20px)"},children:Array.from({length:a}).map((d,p)=>c("t"+p))}),i>0&&t.jsx("div",{style:{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:s},children:Array.from({length:i}).map((d,p)=>l("o"+p))})]})}function be({options:e,answered:n,selected:a,answer:i,handlePick:r,theme:o,columns:s=1,plain:l=!1}){return t.jsxs("div",{style:{display:s>1?"grid":"flex",...s>1?{gridTemplateColumns:`repeat(${s}, 1fr)`}:{flexDirection:"column"},gap:"clamp(8px, 1.2vmin, 14px)",width:"100%",maxWidth:400},children:[l&&t.jsx("style",{children:`
          /* Warnai (coloring) options — uncoloured swatches that "fill" with
             their crayon colour on hover / tap. */
          .warnai-opt {
            position: relative; overflow: hidden;
            transition: transform .14s ease, background .18s ease, box-shadow .18s ease, border-color .18s ease;
          }
          .warnai-chip {
            width: clamp(16px, 2.6vmin, 22px); height: clamp(16px, 2.6vmin, 22px);
            border-radius: 6px; flex-shrink: 0; border: 2px solid #fff;
            box-shadow: 0 1px 4px rgba(0,0,0,.4); transition: transform .18s ease;
          }
          .warnai-opt:active { transform: translateY(1px) scale(.99); }
          @media (hover: hover) {
            .warnai-opt:hover {
              background: var(--swatch) !important;
              border-color: var(--swatch) !important;
              transform: translateY(-2px);
              box-shadow: 0 7px 18px rgba(0,0,0,.32), 0 0 18px var(--swatch);
            }
            .warnai-opt:hover .warnai-chip { transform: rotate(-8deg) scale(1.1); }
          }
        `}),e.map((c,d)=>{const p=a===c.id,m=c.id===i,x=M[d%M.length],h=l&&!n;let f,g,b,v,y;return n&&m?(f=o.green,g=o.green,b="#fff",v="✓",y="snkBounce .5s ease"):n&&p?(f=o.red,g=o.red,b="#fff",v="✗",y="shakeError .35s ease"):l?(f=`${x.bg}26`,g=x.border,b="#fff",v=c.value,y="none"):(f=x.bg,g=x.border,b="#fff",v=c.value,y="none"),t.jsxs("button",{type:"button",className:h?"warnai-opt":void 0,onClick:()=>r(c.id),disabled:n,style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"clamp(8px, 1.4vmin, 12px)",padding:"clamp(10px, 1.6vmin, 18px) clamp(16px, 2.4vmin, 28px)",...h?{border:`2px solid ${g}`,borderBottom:`5px solid ${g}`,"--swatch":x.bg}:{border:"none",borderBottom:n?"none":`4px solid ${g}`},borderRadius:"clamp(12px, 1.6vmin, 18px)",background:f,color:b,fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:n&&(m||p)?"clamp(24px, 4vmin, 40px)":"clamp(16px, 2.6vmin, 26px)",lineHeight:1.2,whiteSpace:"nowrap",textAlign:"center",cursor:n?"default":"pointer",transition:"all .15s ease",WebkitTapHighlightColor:"transparent",minHeight:44,width:"100%",animation:y},children:[h&&t.jsx("span",{className:"warnai-chip",style:{background:x.bg},"aria-hidden":"true"}),t.jsx("span",{children:v})]},c.id)})]})}function Xn({q:e,ctx:n}){const{answered:a,selected:i,answer:r,handlePick:o,theme:s}=n;return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(12px, 2vmin, 24px)",width:"100%"},children:[t.jsx(Qn,{icon:e.icon,count:e.count}),t.jsx(V,{options:e.options,answered:a,selected:i,answer:r,handlePick:o,theme:s})]})}function Vn({q:e,ctx:n}){const{answered:a,selected:i,answer:r,handlePick:o,theme:s}=n;return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(12px, 2vmin, 24px)",width:"100%"},children:[t.jsx("div",{style:{fontFamily:"'Baloo 2', sans-serif",fontWeight:900,fontSize:"clamp(42px, 12vmin, 96px)",color:"#1E293B",lineHeight:1.1,textAlign:"center"},children:e.number}),t.jsx(be,{options:e.options,answered:a,selected:i,answer:r,handlePick:o,theme:s})]})}function Un({q:e,ctx:n}){const{answered:a,isCorrect:i,handlePick:r,theme:o}=n,[s,l]=w.useState("");w.useEffect(()=>{l("")},[e.qid]);const c=m=>{!a&&s.length<3&&l(s+m)},d=()=>{a||l(s.slice(0,-1))},p=()=>{!a&&s!==""&&r(s)};return w.useEffect(()=>{const m=x=>{a||(/^[0-9]$/.test(x.key)?(x.preventDefault(),l(h=>h.length<3?h+x.key:h)):x.key==="Backspace"?(x.preventDefault(),l(h=>h.slice(0,-1))):x.key==="Enter"&&(x.preventDefault(),s!==""&&r(s)))};return window.addEventListener("keydown",m),()=>window.removeEventListener("keydown",m)},[a,s,r]),t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(10px, 1.8vmin, 20px)",width:"100%"},children:[t.jsx("style",{children:`
        .tak-kp-btn {
          transition: all 0.08s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .tak-kp-btn:active {
          transform: translateY(4px);
          border-bottom-width: 0 !important;
        }
      `}),t.jsx("div",{style:{fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:"clamp(24px, 5vmin, 44px)",color:"#1E293B",textAlign:"center",lineHeight:1.15},children:e.word}),t.jsx("div",{style:{minWidth:"clamp(96px, 22vmin, 170px)",minHeight:"clamp(50px, 9vmin, 82px)",border:`3px solid ${a?i?o.green:o.red:"#CBD5E1"}`,borderRadius:"clamp(12px, 1.6vmin, 18px)",background:"#F9FAFB",boxShadow:"inset 0 2px 8px rgba(0,0,0,0.06)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Baloo 2', sans-serif",fontWeight:900,fontSize:"clamp(30px, 6.5vmin, 54px)",color:a?i?o.green:o.red:s?"#334155":"#CBD5E1",padding:"0 18px"},children:s||"?"}),a&&!i&&t.jsxs("div",{style:{fontFamily:"'Fredoka', sans-serif",fontWeight:700,fontSize:"clamp(14px, 2.2vmin, 20px)",color:"#64748B"},children:["Jawapan: ",t.jsx("b",{style:{color:o.green},children:e.answer})]}),!a&&t.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"clamp(5px, 1vmin, 9px)",width:"100%",maxWidth:300},children:[[1,2,3,4,5,6,7,8,9].map(m=>t.jsx("button",{type:"button",className:"tak-kp-btn",onClick:()=>c(String(m)),style:{minHeight:"clamp(44px, 6vmin, 50px)",border:"none",borderBottom:"4px solid #2563EB",borderRadius:"clamp(12px, 1.6vmin, 16px)",background:"#3B82F6",color:"#fff",cursor:"pointer",fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:"clamp(20px, 3.4vmin, 30px)"},children:m},m)),t.jsx("button",{type:"button",className:"tak-kp-btn",onClick:d,style:{minHeight:"clamp(44px, 6vmin, 50px)",border:"none",borderBottom:"4px solid #DC2626",borderRadius:"clamp(12px, 1.6vmin, 16px)",background:"#EF4444",color:"#fff",cursor:"pointer",fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:"clamp(16px, 2.6vmin, 22px)"},children:"Padam"}),t.jsx("button",{type:"button",className:"tak-kp-btn",onClick:()=>c("0"),style:{minHeight:"clamp(44px, 6vmin, 50px)",border:"none",borderBottom:"4px solid #2563EB",borderRadius:"clamp(12px, 1.6vmin, 16px)",background:"#3B82F6",color:"#fff",cursor:"pointer",fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:"clamp(20px, 3.4vmin, 30px)"},children:"0"}),t.jsx("button",{type:"button",className:"tak-kp-btn",onClick:p,disabled:s==="",style:{minHeight:"clamp(44px, 6vmin, 50px)",border:"none",borderBottom:s===""?"4px solid #D1D5DB":"4px solid #16A34A",borderRadius:"clamp(12px, 1.6vmin, 16px)",background:s===""?"#E5E7EB":"#22C55E",color:s===""?"#9CA3AF":"#fff",cursor:s===""?"not-allowed":"pointer",fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:"clamp(16px, 2.6vmin, 22px)"},children:"Semak"})]})]})}function Zn({q:e,ctx:n}){const{answered:a,isCorrect:i,handlePick:r,theme:o}=n,[s,l]=w.useState([]);w.useEffect(()=>{l([])},[e.qid]);const c={};e.parts.forEach(h=>{c[h.id]=h.word});const d=new Set(s),p=h=>{if(a||d.has(h))return;const f=[...s,h];l(f),f.length===e.parts.length&&r(f.map(g=>c[g]).join(" "))},m=h=>{a||l(s.filter((f,g)=>g!==h))},x=(h,f=!1)=>{const g=M[h%M.length];return{padding:"clamp(8px, 1.6vmin, 14px) clamp(14px, 2.6vmin, 24px)",border:"none",borderBottom:f?"none":`4px solid ${g.border}`,borderRadius:"clamp(12px, 1.6vmin, 18px)",background:f?"#E5E7EB":g.bg,color:f?"#9CA3AF":"#fff",fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:"clamp(16px, 3vmin, 26px)",cursor:f?"default":"pointer",minHeight:44,transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",WebkitTapHighlightColor:"transparent"}};return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(12px, 2.2vmin, 24px)",width:"100%"},children:[t.jsx("div",{style:{fontFamily:"'Baloo 2', sans-serif",fontWeight:900,fontSize:"clamp(42px, 12vmin, 96px)",color:"#1E293B",lineHeight:1},children:e.number}),t.jsx("div",{style:{minHeight:"clamp(48px, 8vmin, 72px)",width:"100%",maxWidth:440,border:`3px dashed ${a?i?o.green:o.red:"#CBD5E1"}`,borderRadius:"clamp(12px, 1.6vmin, 18px)",background:"#F9FAFB",boxShadow:"inset 0 2px 8px rgba(0,0,0,0.04)",display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"center",gap:"8px",padding:"10px 14px"},children:s.length===0?t.jsx("span",{style:{color:"#94A3B8",fontFamily:"'Fredoka', sans-serif",fontWeight:600,fontSize:"clamp(14px, 2.2vmin, 18px)"},children:"👆 Susun perkataan di sini"}):s.map((h,f)=>t.jsx("button",{type:"button",onClick:()=>m(f),disabled:a,style:{...x(h),borderBottom:a?"none":`4px solid ${M[h%M.length].border}`,cursor:a?"default":"pointer"},children:c[h]},f))}),a&&!i&&t.jsxs("div",{style:{fontFamily:"'Fredoka', sans-serif",fontWeight:700,fontSize:"clamp(14px, 2.2vmin, 20px)",color:"#64748B",background:"#F8FAFC",padding:"8px 18px",borderRadius:12,border:"1px solid #E2E8F0"},children:["Jawapan: ",t.jsx("b",{style:{color:o.green},children:e.answer})]}),!a&&t.jsx("div",{style:{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"clamp(8px, 1.6vmin, 14px)",width:"100%",maxWidth:440},children:e.parts.map(h=>t.jsx("button",{type:"button",onClick:()=>p(h.id),disabled:d.has(h.id),style:x(h.id,d.has(h.id)),children:h.word},h.id))})]})}function qn({data:e,language:n,theme:a,onExit:i}){return t.jsx(U,{buildRound:Jn,renderQuestion:(r,o)=>r.type==="kenali21-bilang"?t.jsx(Xn,{q:r,ctx:o}):r.type==="kenali21-tulis-angka"?t.jsx(Un,{q:r,ctx:o}):r.type==="kenali21-susun"?t.jsx(Zn,{q:r,ctx:o}):t.jsx(Vn,{q:r,ctx:o}),theme:a,onExit:i,scoreStorageKey:e?.scoreStorageKey,scoreId:e?.scoreId})}function ea(){const n=Math.random()<.5?u(100,999):u(10,99),a=String(n).split("");return{type:"nilai-tempat-bilang",header:"Pembelajaran Nilai Tempat",prompt:"Isi nilai tempat",number:n,digits:a,answer:String(n)}}function ta(){const n=Math.random()<.5?u(100,999):u(10,99),a=String(n).split(""),i=u(0,a.length-1),r=a.length-1-i,s=["Sa","Puluh","Ratus"][r],c=["Ratus","Puluh","Sa"].map((p,m)=>({id:`opt-${m}`,value:p})),d=c.find(p=>p.value===s).id;return{type:"nilai-tempat-pilih",header:"Pembelajaran Nilai Tempat",prompt:"Tulis nilai tempat bagi nombor bergaris",number:n,digits:a,underlinedIdx:i,options:c,answer:d}}function na(){const e=[];for(let n=0;n<5;n++)e.push(ea());for(let n=0;n<5;n++)e.push(ta());return C(e).map((n,a)=>({...n,qid:a}))}function aa({q:e,ctx:n}){const{answered:a,isCorrect:i,handlePick:r,theme:o}=n,l=e.digits.length===3?[{key:"ratus",label:"Ratus",multiplier:100},{key:"puluh",label:"Puluh",multiplier:10},{key:"sa",label:"Sa",multiplier:1}]:[{key:"puluh",label:"Puluh",multiplier:10},{key:"sa",label:"Sa",multiplier:1}],[c,d]=w.useState(l.map(()=>"")),[p,m]=w.useState(0);w.useEffect(()=>{d(l.map(()=>"")),m(0)},[e.qid]);const x=y=>{a||(d(j=>{const S=[...j];return S[p]=y,S}),p<l.length-1&&m(p+1))},h=()=>{if(a)return;const y=c.reduce((j,S,D)=>S!==""?D:j,-1);y>=0&&(d(j=>{const S=[...j];return S[y]="",S}),m(y))},f=c.every(y=>y!==""),g=c.join("");w.useEffect(()=>{const y=j=>{a||(/^[0-9]$/.test(j.key)?(j.preventDefault(),x(j.key)):j.key==="Backspace"?(j.preventDefault(),h()):j.key==="Enter"&&(j.preventDefault(),f&&r(g)))};return window.addEventListener("keydown",y),()=>window.removeEventListener("keydown",y)},[a,p,c,f,g,r]);const b=y=>({width:"clamp(56px, 10vmin, 84px)",height:"clamp(48px, 9vmin, 72px)",border:"none",borderBottom:`4px solid ${a?i?o.green:o.red:p===y?o.dark:"#CBD5E1"}`,borderRadius:"clamp(10px, 1.4vmin, 16px)",background:a?i?o.green:o.red:p===y?"#FFF7ED":"#F3F4F6",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Baloo 2', sans-serif",fontWeight:900,fontSize:"clamp(18px, 3.6vmin, 32px)",color:a?"#fff":c[y]!==""?"#334155":"#9CA3AF",cursor:a?"default":"pointer",transition:"all .15s ease",WebkitTapHighlightColor:"transparent"}),v=y=>{if(y>=c.length||c[y]==="")return"";const j=parseInt(c[y],10);return String(j*l[y].multiplier)};return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",flex:1,width:"100%",minHeight:0,gap:"clamp(6px, 1.2vmin, 16px)"},children:[t.jsx("style",{children:`
        .btk-kp-btn {
          transition: all 0.08s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .btk-kp-btn:active {
          transform: translateY(4px);
          border-bottom-width: 0 !important;
        }
      `}),t.jsx("div",{style:{fontFamily:"'Baloo 2', sans-serif",fontWeight:900,fontSize:"clamp(28px, 7vmin, 64px)",color:"#1E293B",lineHeight:1.1,letterSpacing:"clamp(2px, 0.4vmin, 6px)",textAlign:"center",flexShrink:0},children:e.number}),t.jsx("div",{style:{display:"flex",gap:"clamp(12px, 2.4vmin, 28px)",alignItems:"flex-end",flexShrink:0},children:l.map((y,j)=>t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(3px, 0.5vmin, 6px)"},children:[t.jsx("span",{style:{fontFamily:"'Fredoka', sans-serif",fontWeight:700,fontSize:"clamp(11px, 1.8vmin, 16px)",color:"#64748B"},children:y.label}),t.jsx("div",{onClick:()=>{a||m(j)},style:b(j),children:v(j)})]},y.key))}),a&&!i&&t.jsxs("div",{style:{fontFamily:"'Fredoka', sans-serif",fontWeight:700,fontSize:"clamp(12px, 1.8vmin, 18px)",color:"#64748B",textAlign:"center"},children:["Jawapan: ",l.map((y,j)=>`${parseInt(e.digits[j],10)*y.multiplier} ${y.label}`).join(", ")]}),!a&&t.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"clamp(3px, 0.6vmin, 8px)",width:"100%",maxWidth:280,flex:1,minHeight:0,alignContent:"stretch"},children:[[1,2,3,4,5,6,7,8,9].map(y=>t.jsx("button",{type:"button",className:"btk-kp-btn",onClick:()=>x(String(y)),style:{border:"none",borderBottom:"3px solid #2563EB",borderRadius:"clamp(10px, 1.2vmin, 14px)",background:"#3B82F6",color:"#fff",cursor:"pointer",fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:"clamp(16px, 2.8vmin, 26px)",minHeight:0,height:"100%"},children:y},y)),t.jsx("button",{type:"button",className:"btk-kp-btn",onClick:h,style:{border:"none",borderBottom:"3px solid #DC2626",borderRadius:"clamp(10px, 1.2vmin, 14px)",background:"#EF4444",color:"#fff",cursor:"pointer",fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:"clamp(13px, 2.2vmin, 20px)",minHeight:0,height:"100%"},children:"Padam"}),t.jsx("button",{type:"button",className:"btk-kp-btn",onClick:()=>x("0"),style:{border:"none",borderBottom:"3px solid #2563EB",borderRadius:"clamp(10px, 1.2vmin, 14px)",background:"#3B82F6",color:"#fff",cursor:"pointer",fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:"clamp(16px, 2.8vmin, 26px)",minHeight:0,height:"100%"},children:"0"}),t.jsx("button",{type:"button",className:"btk-kp-btn",onClick:()=>{f&&r(g)},disabled:!f,style:{border:"none",borderBottom:f?"3px solid #16A34A":"3px solid #D1D5DB",borderRadius:"clamp(10px, 1.2vmin, 14px)",background:f?"#22C55E":"#E5E7EB",color:"#fff",cursor:f?"pointer":"not-allowed",fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:"clamp(13px, 2.2vmin, 20px)",minHeight:0,height:"100%"},children:"Semak"})]})]})}function ia({q:e,ctx:n}){const{answered:a,selected:i,answer:r,handlePick:o,theme:s}=n;return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(12px, 2vmin, 24px)",width:"100%"},children:[t.jsx("div",{style:{display:"flex",justifyContent:"center",gap:"clamp(4px, 0.8vmin, 10px)",flexWrap:"wrap"},children:e.digits.map((l,c)=>t.jsx("span",{style:{fontFamily:"'Baloo 2', sans-serif",fontWeight:c===e.underlinedIdx?900:700,fontSize:c===e.underlinedIdx?"clamp(46px, 14vmin, 96px)":"clamp(36px, 11vmin, 76px)",color:c===e.underlinedIdx?"#DC2626":"#1E293B",textDecoration:c===e.underlinedIdx?"underline":"none",textUnderlineOffset:"clamp(4px, 0.8vmin, 8px)",textDecorationThickness:c===e.underlinedIdx?"clamp(3px, 0.5vmin, 6px)":void 0,lineHeight:1.1},children:l},c))}),t.jsx("div",{style:{display:"flex",gap:"clamp(10px, 1.8vmin, 20px)",width:"100%",maxWidth:400,justifyContent:"center"},children:e.options.map((l,c)=>{const d=i===l.id,p=l.id===r,m=M[c%M.length];let x,h,f,g,b;return a&&p?(x=s.green,h=s.green,f="#fff",g="✓",b="snkBounce .5s ease"):a&&d?(x=s.red,h=s.red,f="#fff",g="✗",b="shakeError .35s ease"):(x=m.bg,h=m.border,f="#fff",g=l.value,b="none"),t.jsx("button",{type:"button",onClick:()=>o(l.id),disabled:a,style:{flex:1,maxWidth:160,padding:"clamp(10px, 1.6vmin, 18px) clamp(8px, 1.4vmin, 16px)",border:"none",borderBottom:a?"none":`4px solid ${h}`,borderRadius:"clamp(12px, 1.6vmin, 18px)",background:x,color:f,fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:a&&(p||d)?"clamp(24px, 4vmin, 40px)":"clamp(18px, 3vmin, 28px)",lineHeight:1.1,whiteSpace:"nowrap",cursor:a?"default":"pointer",transition:"all .15s ease",WebkitTapHighlightColor:"transparent",minHeight:44,animation:b},children:g},l.id)})})]})}function ra({data:e,language:n,theme:a,onExit:i}){return t.jsx(U,{buildRound:na,renderQuestion:(r,o)=>r.type==="nilai-tempat-bilang"?t.jsx(aa,{q:r,ctx:o}):t.jsx(ia,{q:r,ctx:o}),theme:a,onExit:i,scoreStorageKey:e?.scoreStorageKey,scoreId:e?.scoreId})}const oa=[{name:"bintang",label:"Bintang",color:"#EC4899",fillColor:"rgba(236,72,153,0.15)",pts:[{x:50,y:15},{x:61,y:38},{x:86,y:40},{x:68,y:58},{x:73,y:83},{x:50,y:72},{x:27,y:83},{x:32,y:58},{x:14,y:40},{x:39,y:38}]},{name:"hati",label:"Hati",color:"#F43F5E",fillColor:"rgba(244,63,94,0.15)",pts:[{x:50,y:32},{x:35,y:18},{x:18,y:28},{x:15,y:48},{x:30,y:69},{x:50,y:88},{x:70,y:69},{x:85,y:48},{x:82,y:28},{x:65,y:18}]},{name:"mahkota",label:"Mahkota",color:"#EAB308",fillColor:"rgba(234,179,8,0.15)",pts:[{x:50,y:6},{x:5,y:42},{x:5,y:96},{x:35,y:96},{x:35,y:70},{x:65,y:70},{x:65,y:96},{x:95,y:96},{x:95,y:42}]}];function sa(e,n,a){const i=new Set;for(;i.size<a;)i.add(u(e,n));return[...i]}function la(){const e=u(4,5),n=A([1,2,3]),a=Math.random()<.5;let i;a?i=u(1,100-n*(e-1)):i=u(n*(e-1)+1,100);const r=[];for(let l=0;l<e;l++)r.push(a?i+n*l:i-n*l);const o=a?[...r]:[...r],s=C(r.map((l,c)=>({id:c,value:l})));return{type:"susunan-order",header:"Pembelajaran Susunan",prompt:a?"Susun mengikut tertib menaik":"Susun mengikut tertib menurun",tiles:s,correct:o,answer:o.join(",")}}function pa(){const e=A(["sebelum","selepas","di-antara"]);let n,a,i;if(e==="sebelum"){const r=u(2,100);n=String(r-1),a=`__ , ${r}`,i=[{value:"?",isGap:!0},{value:String(r),isGap:!1}]}else if(e==="selepas"){const r=u(1,99);n=String(r+1),a=`${r} , __`,i=[{value:String(r),isGap:!1},{value:"?",isGap:!0}]}else{const r=u(2,99);n=String(r),a=`${r-1} , __ , ${r+1}`,i=[{value:String(r-1),isGap:!1},{value:"?",isGap:!0},{value:String(r+1),isGap:!1}]}return{type:"susunan-jiran",header:"Pembelajaran Susunan",prompt:e==="sebelum"?"Tulis nombor sebelum":e==="selepas"?"Tulis nombor selepas":"Tulis nombor di antara",display:a,answer:n,displayParts:i}}function ca(){const e=A([1,2,3]),n=Math.random()<.5,a=5;let i;n?i=u(1,100-e*(a-1)):i=u(e*(a-1)+1,100);const r=[];for(let m=0;m<a;m++)r.push(n?i+e*m:i-e*m);const o=u(1,a-2),s=String(r[o]);r[o]=null;const l=r[r.length-1],c=n?`Bilang menaik ${i}-${l}`:`Bilang menurun ${i}-${l}`,d=r.map(m=>m!==null?String(m):"__").join("  "),p=r.map(m=>m!==null?{value:String(m),isGap:!1}:{value:"?",isGap:!0});return{type:"susunan-lengkapkan",header:"Pembelajaran Susunan",prompt:c,display:d,answer:s,displayParts:p}}function da(){return{type:"susunan-sambung-titik",header:"Pembelajaran Susunan",prompt:"Sambung titik ikut urutan nombor",shape:A(oa),answer:"done"}}function ma(){const e=[];for(let n=0;n<3;n++)e.push(la());for(let n=0;n<2;n++)e.push(pa());for(let n=0;n<3;n++)e.push(ca());for(let n=0;n<2;n++)e.push(da());return C(e).map((n,a)=>({...n,qid:a}))}function xa({q:e,ctx:n}){const{answered:a,isCorrect:i,handlePick:r,theme:o}=n,[s,l]=w.useState([]);w.useEffect(()=>{l([])},[e.qid]);const c={};e.tiles.forEach(h=>{c[h.id]=h.value});const d=new Set(s),p=h=>{if(a||d.has(h))return;const f=[...s,h];l(f),f.length===e.tiles.length&&r(f.map(g=>c[g]).join(","))},m=h=>{a||l(s.filter((f,g)=>g!==h))},x=(h,f=!1)=>{const g=M[h%M.length];return{padding:"clamp(8px, 1.6vmin, 14px) clamp(14px, 2.6vmin, 24px)",border:"none",borderBottom:f?"none":`4px solid ${g.border}`,borderRadius:"clamp(12px, 1.6vmin, 18px)",background:f?"#E5E7EB":g.bg,color:f?"#9CA3AF":"#fff",fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:"clamp(18px, 3.4vmin, 30px)",cursor:f?"default":"pointer",minHeight:44,transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"}};return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(12px, 2.2vmin, 24px)",width:"100%"},children:[t.jsx("div",{style:{minHeight:"clamp(52px, 8vmin, 76px)",width:"100%",maxWidth:440,border:`3px dashed ${a?i?o.green:o.red:"#CBD5E1"}`,borderRadius:"clamp(12px, 1.6vmin, 18px)",background:"#F9FAFB",boxShadow:"inset 0 2px 8px rgba(0,0,0,0.04)",display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"center",gap:"8px",padding:"10px 14px"},children:s.length===0?t.jsx("span",{style:{color:"#94A3B8",fontFamily:"'Fredoka', sans-serif",fontWeight:600,fontSize:"clamp(14px, 2.2vmin, 18px)"},children:"👆 Susun nombor di sini"}):s.map((h,f)=>t.jsx("button",{type:"button",onClick:()=>m(f),disabled:a,style:{...x(h),borderBottom:a?"none":`4px solid ${M[h%M.length].border}`,cursor:a?"default":"pointer"},children:c[h]},f))}),a&&!i&&t.jsxs("div",{style:{fontFamily:"'Fredoka', sans-serif",fontWeight:700,fontSize:"clamp(14px, 2.2vmin, 20px)",color:"#64748B",background:"#F8FAFC",padding:"8px 18px",borderRadius:12,border:"1px solid #E2E8F0"},children:["Jawapan: ",t.jsx("b",{style:{color:o.green},children:e.correct.join(", ")})]}),!a&&t.jsx("div",{style:{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"clamp(8px, 1.6vmin, 14px)",width:"100%",maxWidth:440},children:e.tiles.map(h=>t.jsx("button",{type:"button",onClick:()=>p(h.id),disabled:d.has(h.id),style:x(h.id,d.has(h.id)),children:h.value},h.id))})]})}function Ke({q:e,ctx:n}){const{answered:a,isCorrect:i,handlePick:r,theme:o}=n,[s,l]=w.useState(""),[c,d]=w.useState(!1);w.useEffect(()=>{l(""),d(!1)},[e.qid]);const p=f=>{!a&&s.length<3&&l(s+f)},m=()=>{a||l(s.slice(0,-1))},x=()=>{!a&&s!==""&&r(s)};w.useEffect(()=>{const f=g=>{a||(/^[0-9]$/.test(g.key)?(g.preventDefault(),l(b=>b.length<3?b+g.key:b)):g.key==="Backspace"?(g.preventDefault(),l(b=>b.slice(0,-1))):g.key==="Enter"&&(g.preventDefault(),s!==""&&r(s)))};return window.addEventListener("keydown",f),()=>window.removeEventListener("keydown",f)},[a,s,r]),w.useEffect(()=>{if(a&&!i){d(!0);const f=setTimeout(()=>d(!1),800);return()=>clearTimeout(f)}},[a,i]);const h=!!e.displayParts;return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(10px, 1.8vmin, 20px)",width:"100%"},children:[t.jsx("style",{children:`
        @keyframes snkBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes snkShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .snk-box {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: default;
        }
        .snk-box:hover {
          transform: translateY(-5px);
        }
        .snk-box-bounce {
          animation: snkBounce 0.5s ease;
        }
        .snk-box-shake {
          animation: snkShake 0.5s ease;
        }
        .snk-kp-btn {
          transition: all 0.08s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .snk-kp-btn:active {
          transform: translateY(4px);
          border-bottom-width: 0 !important;
        }
      `}),h?t.jsx("div",{style:{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"clamp(8px, 1.6vmin, 14px)"},children:e.displayParts.map((f,g)=>{const b=f.isGap,v=g%M.length;let y,j="snk-box";b&&a?i?(j+=" snk-box-bounce",y={bg:"#22C55E",border:"#16A34A",textColor:"#fff"}):(j+=" snk-box-shake",y={bg:"#EF4444",border:"#DC2626",textColor:"#fff"}):b?y={bg:"#F3F4F6",border:"#D1D5DB",textColor:"#9CA3AF",borderStyle:"dashed"}:y={bg:M[v].bg,border:M[v].border,textColor:"#fff"};const S=b&&!a?`3px dashed ${y.border}`:"none",D=b&&!a?"none":`4px solid ${y.border}`;return t.jsx("div",{className:j,style:{minWidth:"clamp(44px, 10vmin, 68px)",minHeight:"clamp(44px, 10vmin, 68px)",background:y.bg,border:S,borderBottom:D,borderRadius:"clamp(12px, 1.6vmin, 18px)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Baloo 2', sans-serif",fontWeight:900,fontSize:"clamp(24px, 5vmin, 40px)",color:y.textColor,padding:"4px 10px"},children:b&&a?e.answer:f.value},g)})}):t.jsx("div",{style:{fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:"clamp(28px, 5.6vmin, 50px)",color:"#1E293B",textAlign:"center",lineHeight:1.3,letterSpacing:2},children:e.display}),t.jsx("div",{style:{minWidth:"clamp(96px, 22vmin, 170px)",minHeight:"clamp(50px, 9vmin, 82px)",border:`3px solid ${a?i?o.green:o.red:"#CBD5E1"}`,borderRadius:"clamp(12px, 1.6vmin, 18px)",background:"#F9FAFB",boxShadow:"inset 0 2px 8px rgba(0,0,0,0.06)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Baloo 2', sans-serif",fontWeight:900,fontSize:"clamp(30px, 6.5vmin, 54px)",color:a?i?o.green:o.red:s?"#334155":"#CBD5E1",padding:"0 18px"},children:s||"?"}),a&&!i&&t.jsxs("div",{style:{fontFamily:"'Fredoka', sans-serif",fontWeight:700,fontSize:"clamp(14px, 2.2vmin, 20px)",color:"#64748B"},children:["Jawapan: ",t.jsx("b",{style:{color:o.green},children:e.answer})]}),!a&&t.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"clamp(5px, 1vmin, 9px)",width:"100%",maxWidth:300},children:[[1,2,3,4,5,6,7,8,9].map(f=>t.jsx("button",{type:"button",className:"snk-kp-btn",onClick:()=>p(String(f)),style:{minHeight:"clamp(44px, 6vmin, 50px)",border:"none",borderBottom:"4px solid #2563EB",borderRadius:"clamp(12px, 1.6vmin, 16px)",background:"#3B82F6",color:"#fff",cursor:"pointer",fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:"clamp(20px, 3.4vmin, 30px)"},children:f},f)),t.jsx("button",{type:"button",className:"snk-kp-btn",onClick:m,style:{minHeight:"clamp(44px, 6vmin, 50px)",border:"none",borderBottom:"4px solid #DC2626",borderRadius:"clamp(12px, 1.6vmin, 16px)",background:"#EF4444",color:"#fff",cursor:"pointer",fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:"clamp(16px, 2.6vmin, 22px)"},children:"Padam"}),t.jsx("button",{type:"button",className:"snk-kp-btn",onClick:()=>p("0"),style:{minHeight:"clamp(44px, 6vmin, 50px)",border:"none",borderBottom:"4px solid #2563EB",borderRadius:"clamp(12px, 1.6vmin, 16px)",background:"#3B82F6",color:"#fff",cursor:"pointer",fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:"clamp(20px, 3.4vmin, 30px)"},children:"0"}),t.jsx("button",{type:"button",className:"snk-kp-btn",onClick:x,disabled:s==="",style:{minHeight:"clamp(44px, 6vmin, 50px)",border:"none",borderBottom:s===""?"4px solid #D1D5DB":"4px solid #16A34A",borderRadius:"clamp(12px, 1.6vmin, 16px)",background:s===""?"#E5E7EB":"#22C55E",color:s===""?"#9CA3AF":"#fff",cursor:s===""?"not-allowed":"pointer",fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:"clamp(16px, 2.6vmin, 22px)"},children:"Semak"})]})]})}function ha({q:e,ctx:n}){const{answered:a,handlePick:i,handleNext:r}=n,[o,s]=w.useState([0]),[l,c]=w.useState(null),d=o.length,p=e.shape,m=p.pts,x=o.length===m.length;w.useEffect(()=>{s([0]),c(null)},[e.qid]),w.useEffect(()=>{if(x){i("done");const B=setTimeout(()=>r?.(),1500);return()=>clearTimeout(B)}},[x]),w.useEffect(()=>{if(l!==null){const B=setTimeout(()=>c(null),600);return()=>clearTimeout(B)}},[l]);const h=B=>{a||x||(B===d?(s([...o,B]),c(null)):c(B))},f=35,g=Math.min(...m.map(B=>B.x))-f,b=Math.max(...m.map(B=>B.x))+f,v=Math.min(...m.map(B=>B.y))-f,y=Math.max(...m.map(B=>B.y))+f,j=(g+b)/2,S=(v+y)/2,D=`${g} ${v} ${b-g} ${y-v}`,E=p.color,L=5,K=16;return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(8px, 1.2vmin, 16px)",width:"100%"},children:[t.jsx("style",{children:`
        @keyframes sndPulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.3); opacity: 0.2; }
        }
        .snd-glow { animation: sndPulse 1.2s ease-in-out infinite; transform-origin: center; }
        .snd-target { cursor: pointer; }
        .snd-target:hover circle:first-of-type { stroke-width: 5; }
      `}),l!==null&&t.jsxs("div",{style:{fontFamily:"'Fredoka', sans-serif",fontWeight:700,fontSize:"clamp(15px, 2.2vmin, 22px)",color:"#DC2626",background:"#FEF2F2",padding:"8px 20px",borderRadius:12,border:"1px solid #FECACA",animation:"shakeError .35s ease"},children:["❌ Cuba lagi! Klik nombor ",t.jsx("b",{children:d+1})]}),t.jsxs("svg",{viewBox:D,style:{width:"clamp(260px, 70vmin, 480px)",height:"clamp(260px, 70vmin, 480px)",background:"#FAFAFA",borderRadius:"clamp(14px, 2vmin, 22px)",border:`2px solid ${l!==null?"#FCA5A5":"#E2E8F0"}`,touchAction:"manipulation",transition:"border-color .2s ease"},children:[x&&t.jsx("polygon",{points:m.map(B=>`${B.x},${B.y}`).join(" "),fill:p.fillColor}),o.length>1&&t.jsx("polyline",{points:o.map(B=>`${m[B].x},${m[B].y}`).join(" "),fill:"none",stroke:E,strokeWidth:"6",strokeLinecap:"round",strokeLinejoin:"round"}),x&&m.length>2&&t.jsx("line",{x1:m[m.length-1].x,y1:m[m.length-1].y,x2:m[0].x,y2:m[0].y,stroke:E,strokeWidth:"6",strokeLinecap:"round"}),m.map((B,T)=>{const P=o.includes(T),W=l===T,_=T===d&&!x&&!a,Q=!a&&!x&&!P,X=B.x-j,G=B.y-S,I=Math.sqrt(X*X+G*G)||1,R=X/I*22,F=G/I*22;return t.jsxs("g",{onClick:()=>h(T),style:{cursor:Q?"pointer":"default"},children:[_&&t.jsx("circle",{cx:B.x,cy:B.y,r:K,fill:E,opacity:"0.2",className:"snd-glow",style:{transformOrigin:`${B.x}px ${B.y}px`}}),t.jsx("circle",{cx:B.x,cy:B.y,r:K,fill:"transparent"}),t.jsx("circle",{cx:B.x,cy:B.y,r:L,fill:P||x?E:W?"#DC2626":_?"#fff":"#F1F5F9",stroke:W?"#DC2626":P||x?"#fff":_?E:"#CBD5E1",strokeWidth:W?2:P||x?3:_?4:3}),t.jsx("text",{x:B.x+R,y:B.y+F,fontFamily:"'Fredoka', sans-serif",fontWeight:700,fontSize:_?"18":"11",fill:P||x?E:W?"#DC2626":_?"#0f172a":"#64748B",textAnchor:"middle",dominantBaseline:"central",children:T+1})]},T)})]}),a&&t.jsx("div",{style:{fontFamily:"'Fredoka', sans-serif",fontWeight:600,fontSize:"clamp(14px, 2vmin, 20px)",color:"#16A34A"},children:"✅ Hebat! Lengkap"})]})}function ua({data:e,language:n,theme:a,onExit:i}){return t.jsx(U,{buildRound:ma,renderQuestion:(r,o)=>r.type==="susunan-order"?t.jsx(xa,{q:r,ctx:o}):r.type==="susunan-jiran"||r.type==="susunan-lengkapkan"?t.jsx(Ke,{q:r,ctx:o}):t.jsx(ha,{q:r,ctx:o}),theme:a,onExit:i,scoreStorageKey:e?.scoreStorageKey,scoreId:e?.scoreId})}const kt={1:"satu",2:"dua",3:"tiga",4:"empat",5:"lima",10:"sepuluh"};function $t(){if(A([2,3])===2){const r=u(1,9);let o;do o=u(0,9);while(o===r);return[r,o]}let n,a,i;do n=u(1,9),a=u(0,9),i=u(0,9);while(n===a&&a===i);return[n,a,i]}function Dt(e,n){const a=new Set([e]);for(const s of n)a.size<4&&a.add(s);let i=0;for(;a.size<4&&i++<40;)a.add(u(0,9));const o=C([...a]).map((s,l)=>({id:`o${l}`,value:s}));return{options:o,answer:o.find(s=>s.value===e).id}}function fa(){const e=$t(),n=e.length,a=u(5,6),i=[];for(let l=0;l<a;l++)i.push({value:String(e[l%n]),isGap:!1});const r=e[a%n];i.push({value:"?",isGap:!0});const{options:o,answer:s}=Dt(r,[...new Set(e)]);return{type:"pola-berulang",header:"Pembelajaran Pola",prompt:"Tulis nombor seterusnya",cells:i,answerVal:r,options:o,answer:s}}function ga(){const e=$t(),n=e.length,a=u(6,7),i=u(1,a-2),r=[];for(let c=0;c<a;c++)r.push(c===i?{value:"?",isGap:!0}:{value:String(e[c%n]),isGap:!1});const o=e[i%n],{options:s,answer:l}=Dt(o,[...new Set(e)]);return{type:"pola-berulang",header:"Pembelajaran Pola",prompt:"Lengkapkan pola",cells:r,answerVal:o,options:s,answer:l}}function ba(){const e=A([1,2,3,4,5,10]),n=Math.random()<.5,a=6,i=n?u(1,100-e*(a-1)):u(e*(a-1)+1,100),r=[];for(let c=0;c<a;c++)r.push(n?i+e*c:i-e*c);const o=u(1,a-2),s=String(r[o]),l=r.map((c,d)=>d===o?{value:"?",isGap:!0}:{value:String(c),isGap:!1});return{type:"pola-bilang-lengkap",header:"Pembelajaran Pola",prompt:"Lengkapkan pola nombor",answer:s,displayParts:l}}function ya(){const e=A([1,2,3,4,5,10]),n=Math.random()<.5,a=A([5,6]),i=n?u(1,100-e*(a-1)):u(e*(a-1)+1,100),r=[];for(let m=0;m<a;m++)r.push(n?i+e*m:i-e*m);const o=(m,x)=>`${m?"Menaik":"Menurun"} ${kt[x]}-${kt[x]}`,s=o(n,e),l=new Set([s]);let c=0;for(;l.size<4&&c++<50;)l.add(o(Math.random()<.5,A([1,2,3,4,5,10])));const p=C([...l]).map((m,x)=>({id:`r${x}`,value:m}));return{type:"pola-bilang-terang",header:"Pembelajaran Pola",prompt:"Terangkan pola nombor",cells:r.map(m=>({value:String(m),isGap:!1})),options:p,answer:p.find(m=>m.value===s).id}}function ka(){const e=[];for(let n=0;n<3;n++)e.push(fa());for(let n=0;n<2;n++)e.push(ga());for(let n=0;n<3;n++)e.push(ba());for(let n=0;n<2;n++)e.push(ya());return C(e).map((n,a)=>({...n,qid:a}))}function zt({cells:e,answerVal:n,ctx:a}){const{answered:i,isCorrect:r}=a;return t.jsx("div",{style:{display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center",gap:"clamp(6px, 1.4vmin, 12px)"},children:e.map((o,s)=>{const l=o.isGap,c=s%M.length;let d,p,m,x;l?i?(d=r?"#22C55E":"#EF4444",p=r?"#16A34A":"#DC2626",m="#fff",x=n):(d="#F3F4F6",p="#D1D5DB",m="#9CA3AF",x="?"):(d=M[c].bg,p=M[c].border,m="#fff",x=o.value);const h=l&&!i;return t.jsx("div",{style:{minWidth:"clamp(38px, 8vmin, 58px)",minHeight:"clamp(38px, 8vmin, 58px)",background:d,border:h?`3px dashed ${p}`:"none",borderBottom:h?"none":`4px solid ${p}`,borderRadius:"clamp(10px, 1.4vmin, 16px)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Baloo 2', sans-serif",fontWeight:900,fontSize:"clamp(20px, 4.2vmin, 34px)",color:m,padding:"4px 8px"},children:x},s)})})}function Oe({q:e,ctx:n}){const{answered:a,selected:i,answer:r,handlePick:o,theme:s}=n;return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(14px, 2.4vmin, 28px)",width:"100%"},children:[t.jsx(zt,{cells:e.cells,answerVal:e.answerVal,ctx:n}),t.jsx(V,{options:e.options,answered:a,selected:i,answer:r,handlePick:o,theme:s})]})}function va({q:e,ctx:n}){const{answered:a,selected:i,answer:r,handlePick:o,theme:s}=n;return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(14px, 2.4vmin, 28px)",width:"100%"},children:[t.jsx(zt,{cells:e.cells,ctx:n}),t.jsx(be,{options:e.options,answered:a,selected:i,answer:r,handlePick:o,theme:s})]})}function wa({data:e,language:n,theme:a,onExit:i}){return t.jsx(U,{buildRound:ka,renderQuestion:(r,o)=>r.type==="pola-berulang"?t.jsx(Oe,{q:r,ctx:o}):r.type==="pola-bilang-lengkap"?t.jsx(Ke,{q:r,ctx:o}):t.jsx(va,{q:r,ctx:o}),theme:a,onExit:i,scoreStorageKey:e?.scoreStorageKey,scoreId:e?.scoreId})}const te=e=>Math.round(e/10)*10;function ze(e,n){const a=new Set([e]);for(const s of C(n))a.size<4&&s>=10&&s<=100&&a.add(s);let i=0;for(;a.size<4&&i++<40;)a.add(u(1,10)*10);const o=C([...a]).map((s,l)=>({id:`o${l}`,value:s}));return{options:o,answer:o.find(s=>s.value===e).id}}function ja(){const e=A([10,20,30]),n=Math.random()<.5,a=u(3,9),i=Math.max(1,n?e+a:e-a),r=n?"Lebih daripada":"Kurang daripada",o=C([{id:"o0",value:"Lebih daripada"},{id:"o1",value:"Kurang daripada"}]);return{type:"anggar-lebihkurang",header:"Pembelajaran Anggaran",prompt:`Lebih atau kurang daripada ${e}?`,icon:A(ce),count:i,options:o,answer:o.find(s=>s.value===r).id}}function Fa(){const e=u(11,38),n=te(e),{options:a,answer:i}=ze(n,[n-20,n-10,n+10,n+20]);return{type:"anggar-terbaik",header:"Pembelajaran Anggaran",prompt:"Lebih kurang berapa?",icon:A(ce),count:e,options:a,answer:i}}function Sa(){const e=u(1,9)*10,n=e+10;let a;do a=e+u(1,9);while(a%10===0);const i=te(a),r=C([{id:"o0",value:e},{id:"o1",value:n}]);return{type:"bundar-garis",header:"Pembelajaran Bundar",prompt:`Bundarkan ${a} kepada puluh terdekat`,n:a,lowTen:e,highTen:n,options:r,answer:r.find(o=>o.value===i).id}}function Ba(){let e;do e=u(11,96);while(e%10===0);const n=te(e),{options:a,answer:i}=ze(n,[n-20,n-10,n+10,n+20]);return{type:"bundar-pilih",header:"Pembelajaran Bundar",prompt:`Bundarkan ${e} kepada puluh terdekat`,n:e,options:a,answer:i}}function Ca(){const e=[];for(let n=0;n<3;n++)e.push(ja());for(let n=0;n<2;n++)e.push(Fa());for(let n=0;n<2;n++)e.push(Sa());for(let n=0;n<3;n++)e.push(Ba());return C(e).map((n,a)=>({...n,qid:a}))}function Aa({low:e,high:n,mark:a}){const l=d=>26+(d-e)/(n-e)*268,c=[];for(let d=e;d<=n;d++)c.push(d);return t.jsxs("svg",{viewBox:"0 0 320 92",width:"100%",height:"auto",style:{maxWidth:360,display:"block"},children:[t.jsx("line",{x1:26,y1:56,x2:294,y2:56,stroke:"#94A3B8",strokeWidth:"3",strokeLinecap:"round"}),c.map(d=>{const p=d%10===0;return t.jsx("line",{x1:l(d),y1:56-(p?12:6),x2:l(d),y2:56+(p?12:6),stroke:p?"#475569":"#CBD5E1",strokeWidth:p?3:2},d)}),t.jsx("text",{x:l(e),y:88,textAnchor:"middle",fontSize:"20",fontWeight:"800",fill:"#334155",fontFamily:"'Baloo 2', sans-serif",children:e}),t.jsx("text",{x:l(n),y:88,textAnchor:"middle",fontSize:"20",fontWeight:"800",fill:"#334155",fontFamily:"'Baloo 2', sans-serif",children:n}),t.jsx("circle",{cx:l(a),cy:56,r:"7",fill:"#F59E0B",stroke:"#B45309",strokeWidth:"2"}),t.jsx("text",{x:l(a),y:38,textAnchor:"middle",fontSize:"20",fontWeight:"900",fill:"#B45309",fontFamily:"'Baloo 2', sans-serif",children:a})]})}function _e({q:e,ctx:n,word:a}){const{answered:i,selected:r,answer:o,handlePick:s,theme:l}=n;return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(14px, 2.4vmin, 28px)",width:"100%"},children:[t.jsx("div",{style:{padding:"clamp(10px, 1.8vmin, 20px)",borderRadius:"clamp(16px, 2vmin, 24px)",background:"#F8FAFC",border:"2px solid #E2E8F0",maxWidth:"90%"},children:t.jsx(Bt,{icon:e.icon,count:e.count,compact:!0})}),a?t.jsx(be,{options:e.options,answered:i,selected:r,answer:o,handlePick:s,theme:l}):t.jsx(V,{options:e.options,answered:i,selected:r,answer:o,handlePick:s,theme:l})]})}function Ea({q:e,ctx:n}){const{answered:a,selected:i,answer:r,handlePick:o,theme:s}=n;return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(14px, 2.4vmin, 28px)",width:"100%"},children:[t.jsx(Aa,{low:e.lowTen,high:e.highTen,mark:e.n}),t.jsx(V,{options:e.options,answered:a,selected:i,answer:r,handlePick:o,theme:s})]})}function Ge({q:e,ctx:n}){const{answered:a,selected:i,answer:r,handlePick:o,theme:s}=n;return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(14px, 2.4vmin, 28px)",width:"100%"},children:[t.jsx("div",{style:{minWidth:"clamp(80px, 18vmin, 140px)",padding:"clamp(10px, 2vmin, 22px) clamp(20px, 4vmin, 40px)",borderRadius:"clamp(16px, 2vmin, 24px)",background:"#FEF3C7",border:"3px solid #FCD34D",fontFamily:"'Baloo 2', sans-serif",fontWeight:900,fontSize:"clamp(40px, 9vmin, 76px)",color:"#B45309",lineHeight:1},children:e.n}),t.jsx(V,{options:e.options,answered:a,selected:i,answer:r,handlePick:o,theme:s})]})}function $a({data:e,language:n,theme:a,onExit:i}){return t.jsx(U,{buildRound:Ca,renderQuestion:(r,o)=>r.type==="anggar-lebihkurang"?t.jsx(_e,{q:r,ctx:o,word:!0}):r.type==="anggar-terbaik"?t.jsx(_e,{q:r,ctx:o}):r.type==="bundar-garis"?t.jsx(Ea,{q:r,ctx:o}):t.jsx(Ge,{q:r,ctx:o}),theme:a,onExit:i,scoreStorageKey:e?.scoreStorageKey,scoreId:e?.scoreId})}const Le=["Dila","Johan","Mohan","Rita","Ali","Siti","Amin","Lisa","Geetha","Basir"],Da=["gula-gula","setem","guli","pen","buku","epal","biskut","belon"];function za(){const e=A(["kecil","besar"]),n=sa(10,99,4),a=e==="kecil"?Math.min(...n):Math.max(...n),i=C(n).map((r,o)=>({id:`o${o}`,value:r}));return{type:"sel-pick",header:"Pembelajaran Selesaikan",prompt:e==="kecil"?"Pilih nombor paling kecil":"Pilih nombor paling besar",options:i,answer:i.find(r=>r.value===a).id}}function Wa(){const e=A(["kecil","besar"]),n=u(1,9);let a;do a=u(1,9);while(a===n);const i=Math.min(n,a),r=Math.max(n,a),o=String(e==="kecil"?i*10+r:r*10+i);return{type:"sel-keypad",header:"Pembelajaran Selesaikan",prompt:e==="kecil"?"Bina nombor 2 digit paling kecil":"Bina nombor 2 digit paling besar",displayParts:[{value:String(n),isGap:!1},{value:String(a),isGap:!1}],answer:o}}function Ta(){const e=A(["tambah","kurang","lebih"]),n=A(Da);if(e==="tambah"){const s=u(5,40),l=u(5,30),c=A(Le);return{type:"sel-keypad",header:"Pembelajaran Selesaikan",answer:String(s+l),prompt:`${c} ada ${s} ${n}. Dia beli ${l} lagi. Berapa ${n} semuanya?`}}if(e==="kurang"){const s=u(20,60),l=u(3,15),c=A(Le);return{type:"sel-keypad",header:"Pembelajaran Selesaikan",answer:String(s-l),prompt:`${c} ada ${s} ${n}. ${l} ${n} diberi kepada kawan. Berapa ${n} tinggal?`}}const[a,i]=C(Le).slice(0,2),r=u(15,50),o=u(3,12);return{type:"sel-keypad",header:"Pembelajaran Selesaikan",answer:String(r-o),prompt:`${a} ada ${r} ${n}. ${a} lebih ${o} daripada ${i}. Berapa ${n} ${i}?`}}function Na(){const e=u(2,9)*10;let n;do n=e+u(-4,4);while(n%10===0||te(n)!==e||n<10||n>99);const a=[];for(;a.length<3;){const r=u(10,99);r%10!==0&&te(r)!==e&&r!==n&&!a.includes(r)&&a.push(r)}const i=C([n,...a]).map((r,o)=>({id:`o${o}`,value:r}));return{type:"sel-pick",header:"Pembelajaran Selesaikan",prompt:`Nombor manakah menjadi ${e} apabila dibundar?`,options:i,answer:i.find(r=>r.value===n).id}}function Pa(){const e=[];for(let n=0;n<3;n++)e.push(za());for(let n=0;n<2;n++)e.push(Wa());for(let n=0;n<3;n++)e.push(Ta());for(let n=0;n<2;n++)e.push(Na());return C(e).map((n,a)=>({...n,qid:a}))}function Ye({q:e,ctx:n}){const{answered:a,selected:i,answer:r,handlePick:o,theme:s}=n;return t.jsx(V,{options:e.options,answered:a,selected:i,answer:r,handlePick:o,theme:s})}function Ia({data:e,language:n,theme:a,onExit:i}){return t.jsx(U,{buildRound:Pa,renderQuestion:(r,o)=>r.type==="sel-pick"?t.jsx(Ye,{q:r,ctx:o}):t.jsx(Ke,{q:r,ctx:o}),theme:a,onExit:i,scoreStorageKey:e?.scoreStorageKey,scoreId:e?.scoreId})}const ye="Pembelajaran Latih Diri";function Ma(){const e=u(11,99),n=ue(e),a=n.charAt(0).toUpperCase()+n.slice(1),i=+String(e).split("").reverse().join(""),r=new Set([e]);for(i!==e&&i>=10&&i<=99&&r.add(i);r.size<4;)r.add(u(11,99));const o=C([...r]).map((s,l)=>({id:`o${l}`,value:s}));return{type:"latih-word",header:ye,prompt:a,options:o,answer:o.find(s=>s.value===e).id}}function Ra(){const e=u(5,20),n=new Set([e]);for(;n.size<4;)n.add(Math.max(1,u(e-5,e+5)));const a=C([...n]).map((i,r)=>({id:`o${r}`,value:i}));return{type:"latih-count",header:ye,prompt:"Berapa bilangannya?",icon:A(ce),count:e,options:a,answer:a.find(i=>i.value===e).id}}function La(){const e=u(15,80),n=u(e+1,Math.min(100,e+20)),a=new Set;for(;a.size<3;){const r=u(Math.max(1,e-20),e-1);r>=1&&a.add(r)}const i=C([n,...a]).map((r,o)=>({id:`o${o}`,value:r}));return{type:"latih-besar",header:ye,prompt:`Pilih nombor lebih besar daripada ${e}`,options:i,answer:i.find(r=>r.value===n).id}}function _a(){const e=A([1,2,3,5,10]),n=Math.random()<.5,a=5,i=n?u(1,100-e*(a-1)):u(e*(a-1)+1,100),r=[];for(let p=0;p<a;p++)r.push(n?i+e*p:i-e*p);const o=u(1,a-2),s=r[o],l=r.map((p,m)=>m===o?{value:"?",isGap:!0}:{value:String(p),isGap:!1}),c=new Set([s]);for(const p of C([s-e,s+e,s-1,s+1,s-10,s+10]))c.size<4&&p>=1&&p<=100&&c.add(p);for(;c.size<4;)c.add(u(1,100));const d=C([...c]).map((p,m)=>({id:`o${m}`,value:p}));return{type:"latih-lengkap",header:ye,prompt:"Lengkapkan pola",cells:l,answerVal:s,options:d,answer:d.find(p=>p.value===s).id}}function Ha(){let e;do e=u(11,96);while(e%10===0);const n=te(e),{options:a,answer:i}=ze(n,[n-20,n-10,n+10,n+20]);return{type:"latih-bundar",header:ye,prompt:`Bundarkan ${e} kepada puluh terdekat`,n:e,options:a,answer:i}}function Ka(){const e=[];for(let n=0;n<2;n++)e.push(Ma());for(let n=0;n<2;n++)e.push(Ra());for(let n=0;n<2;n++)e.push(La());for(let n=0;n<2;n++)e.push(_a());for(let n=0;n<2;n++)e.push(Ha());return C(e).map((n,a)=>({...n,qid:a}))}function Oa({data:e,language:n,theme:a,onExit:i}){return t.jsx(U,{buildRound:Ka,renderQuestion:(r,o)=>r.type==="latih-count"?t.jsx(_e,{q:r,ctx:o}):r.type==="latih-lengkap"?t.jsx(Oe,{q:r,ctx:o}):r.type==="latih-bundar"?t.jsx(Ge,{q:r,ctx:o}):t.jsx(Ye,{q:r,ctx:o}),theme:a,onExit:i,scoreStorageKey:e?.scoreStorageKey,scoreId:e?.scoreId})}const ke="Pembelajaran Cabar Minda";function Ga(){const e=u(10,90),n=e+u(2,6),a=u(e+1,n-1),i=new Set([a]);for(;i.size<4;){const o=Math.random()<.5?u(Math.max(1,e-8),e):u(n,Math.min(100,n+8));o>=e+1&&o<=n-1||i.add(o)}const r=C([...i]).map((o,s)=>({id:`o${s}`,value:o}));return{type:"cabar-pick",header:ke,prompt:`Nombor di antara ${e} dan ${n}?`,options:r,answer:r.find(o=>o.value===a).id}}function Ya(){const e=u(1,9),n=e*10+u(0,9),a=new Set([n]);let i;do i=u(1,9);while(i===e);for(a.add(i*10+e);a.size<4;){const o=u(10,99);Math.floor(o/10)!==e&&a.add(o)}const r=C([...a]).map((o,s)=>({id:`o${s}`,value:o}));return{type:"cabar-pick",header:ke,prompt:`Digit ${e} bernilai ${e*10} dalam nombor?`,options:r,answer:r.find(o=>o.value===n).id}}function Ja(){const e=u(2,9)*10;let n;do n=e+u(-4,4);while(n%10===0||te(n)!==e||n<10||n>99);const a=[];for(;a.length<3;){const r=u(10,99);r%10!==0&&te(r)!==e&&r!==n&&!a.includes(r)&&a.push(r)}const i=C([n,...a]).map((r,o)=>({id:`o${o}`,value:r}));return{type:"cabar-pick",header:ke,prompt:`Nombor manakah menjadi ${e} apabila dibundar?`,options:i,answer:i.find(r=>r.value===n).id}}function Qa(){let e;do e=u(11,96);while(e%10===0);const n=te(e),{options:a,answer:i}=ze(n,[n-20,n-10,n+10,n+20]);return{type:"cabar-bundar",header:ke,prompt:`Bundarkan ${e} kepada puluh terdekat`,n:e,options:a,answer:i}}function Xa(){const e=A([2,3,5,10]),n=Math.random()<.5,a=5,i=n?u(1,100-e*(a-1)):u(e*(a-1)+1,100),r=[];for(let p=0;p<a;p++)r.push(n?i+e*p:i-e*p);const o=u(1,a-2),s=r[o],l=r.map((p,m)=>m===o?{value:"?",isGap:!0}:{value:String(p),isGap:!1}),c=new Set([s]);for(const p of C([s-e,s+e,s-1,s+1,s-10,s+10]))c.size<4&&p>=1&&p<=100&&c.add(p);for(;c.size<4;)c.add(u(1,100));const d=C([...c]).map((p,m)=>({id:`o${m}`,value:p}));return{type:"cabar-lengkap",header:ke,prompt:"Lengkapkan pola",cells:l,answerVal:s,options:d,answer:d.find(p=>p.value===s).id}}function Va(){const e=[];for(let n=0;n<2;n++)e.push(Ga());for(let n=0;n<2;n++)e.push(Ya());for(let n=0;n<2;n++)e.push(Qa());for(let n=0;n<2;n++)e.push(Ja());for(let n=0;n<2;n++)e.push(Xa());return C(e).map((n,a)=>({...n,qid:a}))}function Ua({data:e,language:n,theme:a,onExit:i}){return t.jsx(U,{buildRound:Va,renderQuestion:(r,o)=>r.type==="cabar-bundar"?t.jsx(Ge,{q:r,ctx:o}):r.type==="cabar-lengkap"?t.jsx(Oe,{q:r,ctx:o}):t.jsx(Ye,{q:r,ctx:o}),theme:a,onExit:i,scoreStorageKey:e?.scoreStorageKey,scoreId:e?.scoreId})}function ie({answered:e,isCorrect:n,handlePick:a,answer:i,theme:r,qid:o,maxLength:s=2}){const[l,c]=w.useState("");w.useEffect(()=>{c("")},[o]);const d=x=>{!e&&l.length<s&&c(l+x)},p=()=>{e||c(l.slice(0,-1))},m=()=>{!e&&l!==""&&a(l)};return w.useEffect(()=>{const x=h=>{e||(/^[0-9]$/.test(h.key)?(h.preventDefault(),d(h.key)):h.key==="Backspace"?(h.preventDefault(),p()):h.key==="Enter"&&(h.preventDefault(),l!==""&&a(l)))};return window.addEventListener("keydown",x),()=>window.removeEventListener("keydown",x)},[e,l,a]),t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(8px, 1.3vmin, 14px)",width:"100%"},children:[t.jsx("style",{children:`
        .kp-btn { transition: all 0.08s ease; -webkit-tap-highlight-color: transparent; }
        .kp-btn:active { transform: translateY(4px); border-bottom-width: 0 !important; }
      `}),t.jsx("div",{style:{minWidth:"clamp(96px, 20vmin, 150px)",minHeight:"clamp(46px, 6.5vmin, 60px)",border:`3px solid ${e?n?r.green:r.red:"#CBD5E1"}`,borderRadius:"clamp(12px, 1.6vmin, 18px)",background:"#F9FAFB",boxShadow:"inset 0 2px 8px rgba(0,0,0,0.06)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Baloo 2', sans-serif",fontWeight:900,fontSize:"clamp(28px, 5vmin, 44px)",color:e?n?r.green:r.red:l?"#334155":"#CBD5E1",padding:"0 18px"},children:l||"?"}),e&&!n&&t.jsxs("div",{style:{fontFamily:"'Fredoka', sans-serif",fontWeight:700,fontSize:"clamp(14px, 2.2vmin, 20px)",color:"#64748B"},children:["Jawapan: ",t.jsx("b",{style:{color:r.green},children:i})]}),!e&&t.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"clamp(5px, 1vmin, 9px)",width:"100%",maxWidth:300},children:[[1,2,3,4,5,6,7,8,9].map(x=>t.jsx("button",{type:"button",className:"kp-btn",onClick:()=>d(String(x)),style:{minHeight:"clamp(44px, 6vmin, 50px)",border:"none",borderBottom:"4px solid #2563EB",borderRadius:"clamp(12px, 1.6vmin, 16px)",background:"#3B82F6",color:"#fff",cursor:"pointer",fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:"clamp(20px, 3.4vmin, 30px)"},children:x},x)),t.jsx("button",{type:"button",className:"kp-btn",onClick:p,style:{minHeight:"clamp(44px, 6vmin, 50px)",border:"none",borderBottom:"4px solid #DC2626",borderRadius:"clamp(12px, 1.6vmin, 16px)",background:"#EF4444",color:"#fff",cursor:"pointer",fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:"clamp(16px, 2.6vmin, 22px)"},children:"Padam"}),t.jsx("button",{type:"button",className:"kp-btn",onClick:()=>d("0"),style:{minHeight:"clamp(44px, 6vmin, 50px)",border:"none",borderBottom:"4px solid #2563EB",borderRadius:"clamp(12px, 1.6vmin, 16px)",background:"#3B82F6",color:"#fff",cursor:"pointer",fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:"clamp(20px, 3.4vmin, 30px)"},children:"0"}),t.jsx("button",{type:"button",className:"kp-btn",onClick:m,disabled:l==="",style:{minHeight:"clamp(44px, 6vmin, 50px)",border:"none",borderBottom:l===""?"4px solid #D1D5DB":"4px solid #16A34A",borderRadius:"clamp(12px, 1.6vmin, 16px)",background:l===""?"#E5E7EB":"#22C55E",color:l===""?"#9CA3AF":"#fff",cursor:l===""?"not-allowed":"pointer",fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:"clamp(16px, 2.6vmin, 22px)"},children:"Semak"})]})]})}const Wt=["🍎","⭐","🍦","🐱","🚗","🎈","🍬","🐟","🍌","🐒","🌟","🍇","🐘","🦒","🎁","🐰","🦋","🐝","🌺","🍕"];function Je(){const e=u(0,9),n=Math.min(9,18-e),a=u(0,n),i=e+a,r=A(Wt);return{type:"kt-gabung",header:"Pembelajaran Tambah",prompt:"",a:e,b:a,total:i,icon:r,answer:String(i)}}function Qe(){const e=u(1,9),n=Math.min(9,18-e),a=u(1,n),i=e+a;return{type:"kt-garis",header:"Pembelajaran Tambah",prompt:"",a:e,b:a,total:i,answer:String(i)}}function Za({a:e,b:n,total:a,correct:i,answered:r}){const o=Math.max(0,e-1),l=Math.min(20,a+1)-o,c=56,d=30,p=96,m=l*c+d*2,x=h=>d+(h-o)*c;return t.jsxs("svg",{viewBox:`0 0 ${m} 150`,style:{width:"100%",maxWidth:m,height:"auto",display:"block"},children:[t.jsx("defs",{children:t.jsx("marker",{id:"ktaArr",viewBox:"0 0 10 10",refX:"8",refY:"5",markerWidth:"8",markerHeight:"8",orient:"auto",children:t.jsx("path",{d:"M0 0 L10 5 L0 10 z",fill:"#3B82F6"})})}),t.jsx("line",{x1:d-8,y1:p,x2:m-d+8,y2:p,stroke:"#94A3B8",strokeWidth:"3",strokeLinecap:"round"}),Array.from({length:n}).map((h,f)=>{const g=e+f,b=e+f+1,v=x(g),y=x(b),j=(v+y)/2,S=p-46;return t.jsxs("g",{children:[t.jsx("path",{d:`M${v} ${p-6} Q${j} ${S} ${y} ${p-6}`,fill:"none",stroke:"#3B82F6",strokeWidth:"3",markerEnd:"url(#ktaArr)"}),t.jsx("text",{x:j,y:S+4,fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:"15",fill:"#2563EB",textAnchor:"middle",children:"+1"})]},`j${f}`)}),Array.from({length:l+1}).map((h,f)=>{const g=o+f,b=x(g),v=g===e,y=g===a,j=v||y;let S="#CBD5E1",D="#475569";v&&(S="#3B82F6",D="#1E3A8A"),y&&(i?(S="#16A34A",D="#166534"):r?(S="#1D4ED8",D="#1E3A8A"):(S="#F59E0B",D="#B45309"));const E=y&&!r;return t.jsxs("g",{children:[t.jsx("circle",{cx:b,cy:p,r:j?8:5,fill:S}),t.jsx("text",{x:b,y:p+26,fontFamily:"'Baloo 2', sans-serif",fontWeight:j?900:600,fontSize:j?20:15,fill:D,textAnchor:"middle",children:E?"?":g}),v&&t.jsx("text",{x:b,y:p+46,fontFamily:"'Fredoka', sans-serif",fontWeight:700,fontSize:"13",fill:"#3B82F6",textAnchor:"middle",children:"Mula"})]},`t${f}`)}),t.jsxs("text",{x:m/2,y:22,fontFamily:"'Baloo 2', sans-serif",fontWeight:900,fontSize:"22",fill:"#1E3A8A",textAnchor:"middle",children:[e," + ",n," = ",r?a:"?"]})]})}function Xe(){const n=A([{correct:"Jumlah",distractor:"Baki",context:'"___" bermaksud cantumkan semuanya.'},{correct:"Jumlah",distractor:"Beza",context:'"___" ialah hasil tambah dua nombor.'},{correct:"Semua",distractor:"Tinggal",context:'"___" bererti mengira kesemuanya.'},{correct:"Semua",distractor:"Beza",context:'"___" membawa maksud jumlah keseluruhan.'},{correct:"Tambah",distractor:"Asingkan",context:'Operasi "___" menggabungkan nombor.'},{correct:"Tambah",distractor:"Tinggal",context:'Kita "___" untuk dapatkan jumlah.'},{correct:"Masukkan",distractor:"Asingkan",context:'"___" maksudnya cantumkan dalam kumpulan.'},{correct:"Masukkan",distractor:"Baki",context:'Cantumkan dengan "___" semua benda.'}]),a=n.context.replace(n.correct,"___"),i=C([{id:"ktc",value:n.correct},{id:"ktd",value:n.distractor}]);return{type:"kt-perkataan",header:"Pembelajaran Tambah",prompt:"Pilih perkataan yang sesuai.",context:a,options:i,answer:"ktc"}}function Ve(){const e=Math.random()<.5,n=u(0,9);if(e){const r=u(0,Math.min(9,18-n)),o=n+r;return{type:"kt-ayat",header:"Pembelajaran Tambah",prompt:"",display:`${n} + ${r} = ?`,answer:String(o)}}const a=u(1,Math.min(9,18-n)),i=n+a;return{type:"kt-ayat",header:"Pembelajaran Tambah",prompt:"",display:`${n} + ? = ${i}`,answer:String(a)}}function qa(){const e=[];for(let n=0;n<3;n++)e.push(Je());for(let n=0;n<2;n++)e.push(Qe());for(let n=0;n<2;n++)e.push(Xe());for(let n=0;n<3;n++)e.push(Ve());return C(e).map((n,a)=>({...n,qid:a}))}function Tt({q:e,ctx:n}){const{answered:a,isCorrect:i,handlePick:r,theme:o}=n;return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(12px, 2vmin, 24px)",width:"100%"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"clamp(12px, 2.2vmin, 26px)"},children:[t.jsx("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(4px, 0.8vmin, 10px)"},children:e.a===0?t.jsx(pe,{compact:!0}):t.jsx(oe,{icon:e.icon,count:e.a})}),t.jsx("span",{style:{fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:"clamp(22px, 4vmin, 38px)",color:"#3B82F6"},children:"+"}),t.jsx("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(4px, 0.8vmin, 10px)"},children:e.b===0?t.jsx(pe,{compact:!0}):t.jsx(oe,{icon:e.icon,count:e.b})})]}),t.jsx(ie,{answered:a,isCorrect:i,handlePick:r,answer:e.answer,theme:o,qid:e.qid})]})}function Nt({q:e,ctx:n}){const{answered:a,isCorrect:i,handlePick:r,theme:o}=n;return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(12px, 2vmin, 24px)",width:"100%"},children:[t.jsx(Za,{a:e.a,b:e.b,total:e.total,correct:a&&i,answered:a}),t.jsx(ie,{answered:a,isCorrect:i,handlePick:r,answer:e.answer,theme:o,qid:e.qid})]})}function Pt({q:e,ctx:n}){const{answered:a,selected:i,answer:r,handlePick:o,theme:s}=n;return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(12px, 2vmin, 24px)",width:"100%"},children:[t.jsx("div",{style:{fontFamily:"'Fredoka', sans-serif",fontWeight:600,fontSize:"clamp(17px, 2.8vmin, 28px)",color:"#334155",textAlign:"center",lineHeight:1.4,padding:"clamp(10px, 1.6vmin, 20px)",background:"#F8FAFC",borderRadius:"clamp(12px, 1.6vmin, 18px)",border:"2px solid #E2E8F0",maxWidth:440,width:"100%"},children:e.context}),t.jsx(be,{options:e.options,answered:a,selected:i,answer:r,handlePick:o,theme:s})]})}function It({q:e,ctx:n}){const{answered:a,isCorrect:i,handlePick:r,theme:o}=n;return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(12px, 2vmin, 24px)",width:"100%"},children:[t.jsx("div",{style:{minWidth:"clamp(80px, 16vmin, 130px)",padding:"clamp(8px, 1.4vmin, 14px) clamp(18px, 3.4vmin, 32px)",borderRadius:"clamp(16px, 2vmin, 24px)",background:"#EFF6FF",border:"3px solid #93C5FD",fontFamily:"'Baloo 2', sans-serif",fontWeight:900,fontSize:"clamp(28px, 5vmin, 44px)",color:"#1E3A8A",lineHeight:1,textAlign:"center"},children:e.display}),t.jsx(ie,{answered:a,isCorrect:i,handlePick:r,answer:e.answer,theme:o,qid:e.qid})]})}function ei({data:e,language:n,theme:a,onExit:i}){return t.jsx(U,{buildRound:qa,renderQuestion:(r,o)=>r.type==="kt-gabung"?t.jsx(Tt,{q:r,ctx:o}):r.type==="kt-garis"?t.jsx(Nt,{q:r,ctx:o}):r.type==="kt-perkataan"?t.jsx(Pt,{q:r,ctx:o}):t.jsx(It,{q:r,ctx:o}),theme:a,onExit:i,scoreStorageKey:e?.scoreStorageKey,scoreId:e?.scoreId})}function Ue(){const e=u(2,9),n=u(1,e-1),a=e-n,i=A(Wt);return{type:"kt-buang",header:"Pembelajaran Tolak",prompt:A([`${e} tolak ${n} jadi?`,`${e} buang ${n} sama dengan?`,`Baki ${e} tolak ${n} ialah?`]),a:e,b:n,baki:a,icon:i,answer:String(a)}}function Ze(){const e=u(2,9),n=u(1,e-1),a=e-n;return{type:"kt-garis-sub",header:"Pembelajaran Tolak",prompt:"",a:e,b:n,baki:a,answer:String(a)}}function ti({a:e,b:n,baki:a,correct:i,answered:r}){const o=Math.max(0,e-n-1),l=Math.min(20,e+1)-o,c=56,d=30,p=96,m=l*c+d*2,x=h=>d+(h-o)*c;return t.jsxs("svg",{viewBox:`0 0 ${m} 150`,style:{width:"100%",maxWidth:m,height:"auto",display:"block"},children:[t.jsx("defs",{children:t.jsx("marker",{id:"ktsArr",viewBox:"0 0 10 10",refX:"8",refY:"5",markerWidth:"8",markerHeight:"8",orient:"auto",children:t.jsx("path",{d:"M0 0 L10 5 L0 10 z",fill:"#3B82F6"})})}),t.jsx("line",{x1:d-8,y1:p,x2:m-d+8,y2:p,stroke:"#94A3B8",strokeWidth:"3",strokeLinecap:"round"}),Array.from({length:n}).map((h,f)=>{const g=e-f,b=e-f-1,v=x(g),y=x(b),j=(v+y)/2,S=p-46;return t.jsxs("g",{children:[t.jsx("path",{d:`M${v} ${p-6} Q${j} ${S} ${y} ${p-6}`,fill:"none",stroke:"#3B82F6",strokeWidth:"3",markerEnd:"url(#ktsArr)"}),t.jsx("text",{x:j,y:S+4,fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:"15",fill:"#2563EB",textAnchor:"middle",children:"-1"})]},`j${f}`)}),Array.from({length:l+1}).map((h,f)=>{const g=o+f,b=x(g),v=g===e,y=g===a,j=v||y;let S="#CBD5E1",D="#475569";v&&(S="#3B82F6",D="#1E3A8A"),y&&(i?(S="#16A34A",D="#166534"):r?(S="#1D4ED8",D="#1E3A8A"):(S="#F59E0B",D="#B45309"));const E=y&&!r;return t.jsxs("g",{children:[t.jsx("circle",{cx:b,cy:p,r:j?8:5,fill:S}),t.jsx("text",{x:b,y:p+26,fontFamily:"'Baloo 2', sans-serif",fontWeight:j?900:600,fontSize:j?20:15,fill:D,textAnchor:"middle",children:E?"?":g}),v&&t.jsx("text",{x:b,y:p+46,fontFamily:"'Fredoka', sans-serif",fontWeight:700,fontSize:"13",fill:"#3B82F6",textAnchor:"middle",children:"Mula"})]},`t${f}`)}),t.jsxs("text",{x:m/2,y:22,fontFamily:"'Baloo 2', sans-serif",fontWeight:900,fontSize:"22",fill:"#1E3A8A",textAnchor:"middle",children:[e," − ",n," = ",r?a:"?"]})]})}function qe(){const n=A([{correct:"Baki",distractor:"Jumlah",context:'"___" bermaksud yang tinggal selepas tolak.'},{correct:"Baki",distractor:"Semua",context:'"___" ialah hasil tolak dua nombor.'},{correct:"Beza",distractor:"Jumlah",context:'"___" ialah perbezaan antara dua nombor.'},{correct:"Beza",distractor:"Tambah",context:'"___" menunjukkan nilai yang tinggal.'},{correct:"Tinggal",distractor:"Semua",context:'"___" bermaksud apa yang masih ada.'},{correct:"Tinggal",distractor:"Masukkan",context:'Selepas tolak, kita lihat apa yang "___".'},{correct:"Tolak",distractor:"Tambah",context:'Operasi "___" mengasingkan kumpulan.'},{correct:"Tolak",distractor:"Jumlah",context:'"___" mengurangkan bilangan sesuatu.'}]),a=n.context.replace(n.correct,"___"),i=C([{id:"ktc",value:n.correct},{id:"ktd",value:n.distractor}]);return{type:"kt-perkataan-tolak",header:"Pembelajaran Tolak",prompt:"Pilih perkataan yang sesuai.",context:a,options:i,answer:"ktc"}}function et(){const e=Math.random()<.5,n=u(2,9);if(e){const r=u(1,n-1),o=n-r;return{type:"kt-ayat-tolak",header:"Pembelajaran Tolak",prompt:"",display:`${n} − ${r} = ?`,answer:String(o)}}const a=u(1,n-1),i=n-a;return{type:"kt-ayat-tolak",header:"Pembelajaran Tolak",prompt:"",display:`${n} − ? = ${a}`,answer:String(i)}}function ni(){const e=[];for(let n=0;n<3;n++)e.push(Ue());for(let n=0;n<2;n++)e.push(Ze());for(let n=0;n<2;n++)e.push(qe());for(let n=0;n<3;n++)e.push(et());return C(e).map((n,a)=>({...n,qid:a}))}function Mt({q:e,ctx:n}){const{answered:a,isCorrect:i,handlePick:r,theme:o}=n,s=4,l=Math.ceil(e.a/s);return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(12px, 2vmin, 24px)",width:"100%"},children:[t.jsx("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(4px, 0.8vmin, 10px)"},children:Array.from({length:l}).map((c,d)=>{const p=d*s,m=Math.min(p+s,e.a);return t.jsx("div",{style:{display:"flex",justifyContent:"center",gap:"clamp(2px, 0.5vw, 6px)"},children:Array.from({length:m-p}).map((x,h)=>{const g=p+h<e.b;return t.jsx("div",{style:{fontSize:"clamp(22px, 5vmin, 48px)",lineHeight:1.15},children:t.jsx("span",{style:g?{filter:"grayscale(1)",opacity:.35}:void 0,children:e.icon})},h)})},d)})}),t.jsx(ie,{answered:a,isCorrect:i,handlePick:r,answer:e.answer,theme:o,qid:e.qid})]})}function Rt({q:e,ctx:n}){const{answered:a,isCorrect:i,handlePick:r,theme:o}=n;return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(12px, 2vmin, 24px)",width:"100%"},children:[t.jsx(ti,{a:e.a,b:e.b,baki:e.baki,correct:a&&i,answered:a}),t.jsx(ie,{answered:a,isCorrect:i,handlePick:r,answer:e.answer,theme:o,qid:e.qid})]})}function Lt({q:e,ctx:n}){const{answered:a,selected:i,answer:r,handlePick:o,theme:s}=n;return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(12px, 2vmin, 24px)",width:"100%"},children:[t.jsx("div",{style:{fontFamily:"'Fredoka', sans-serif",fontWeight:600,fontSize:"clamp(17px, 2.8vmin, 28px)",color:"#334155",textAlign:"center",lineHeight:1.4,padding:"clamp(10px, 1.6vmin, 20px)",background:"#F8FAFC",borderRadius:"clamp(12px, 1.6vmin, 18px)",border:"2px solid #E2E8F0",maxWidth:440,width:"100%"},children:e.context}),t.jsx(be,{options:e.options,answered:a,selected:i,answer:r,handlePick:o,theme:s})]})}function _t({q:e,ctx:n}){const{answered:a,isCorrect:i,handlePick:r,theme:o}=n;return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(12px, 2vmin, 24px)",width:"100%"},children:[t.jsx("div",{style:{minWidth:"clamp(80px, 16vmin, 130px)",padding:"clamp(8px, 1.4vmin, 14px) clamp(18px, 3.4vmin, 32px)",borderRadius:"clamp(16px, 2vmin, 24px)",background:"#EFF6FF",border:"3px solid #93C5FD",fontFamily:"'Baloo 2', sans-serif",fontWeight:900,fontSize:"clamp(28px, 5vmin, 44px)",color:"#1E3A8A",lineHeight:1,textAlign:"center"},children:e.display}),t.jsx(ie,{answered:a,isCorrect:i,handlePick:r,answer:e.answer,theme:o,qid:e.qid})]})}function ai({data:e,language:n,theme:a,onExit:i}){return t.jsx(U,{buildRound:ni,renderQuestion:(r,o)=>r.type==="kt-buang"?t.jsx(Mt,{q:r,ctx:o}):r.type==="kt-garis-sub"?t.jsx(Rt,{q:r,ctx:o}):r.type==="kt-perkataan-tolak"?t.jsx(Lt,{q:r,ctx:o}):t.jsx(_t,{q:r,ctx:o}),theme:a,onExit:i,scoreStorageKey:e?.scoreStorageKey,scoreId:e?.scoreId})}const ii=[{id:"mudah",label:"Mudah",bars:1,desc:"Fakta asas hingga 18",color:"#22C55E",tint:"#DCFCE7"},{id:"sederhana",label:"Sederhana",bars:2,desc:"Tambah 2 digit tanpa mengumpul",color:"#F59E0B",tint:"#FEF3C7"},{id:"sukar",label:"Sukar",bars:3,desc:"Tambah 2 digit dengan mengumpul",color:"#EF4444",tint:"#FEE2E2"}];function ri({bars:e,color:n}){const a=[{x:6,y:30,h:18},{x:21,y:19,h:29},{x:36,y:8,h:40}];return t.jsx("svg",{width:"56",height:"56",viewBox:"0 0 56 56",style:{height:"auto",display:"block"},"aria-hidden":"true",children:a.map((i,r)=>t.jsx("rect",{x:i.x,y:i.y,width:"14",height:i.h,rx:"4",fill:r<e?n:"#E2E8F0"},r))})}function vt(e){const n=[];for(let a=Math.max(1,e-9);a<=Math.min(9,e-1);a++)n.push(`${a}+${e-a}`);return n}function tt(){const e=u(1,9),n=u(1,Math.min(9,18-e)),a=e+n;return{type:"lt-mudah-m1",header:"Latihan Tambah",prompt:"",display:`${e} + ${n} = ?`,answer:String(a)}}function nt(){const e=u(11,16),n=A(vt(e)),a=new Set([n]);let i=0;for(;a.size<4&&i++<100;){const o=u(3,17);if(o===e)continue;const s=vt(o).filter(l=>!a.has(l));s.length&&a.add(A(s))}const r=C([...a]).map((o,s)=>({id:`w${s}`,value:o}));return{type:"lt-warnai",header:"Latihan Tambah",prompt:`Yang manakah jumlahnya ${e}?`,options:r,answer:r.find(o=>o.value===n).id}}function de(){const e=u(6,15),n=u(Math.max(1,e-9),Math.min(9,e-1)),a=e-n,i=new Set([a]);let r=0;for(;i.size<4&&r++<100;){const s=u(1,9);s!==a&&i.add(s)}const o=C([...i]).map((s,l)=>({id:`p${l}`,value:String(s)}));return{type:"lt-padankan",header:"Latihan Tambah",prompt:`Cari pasangan yang jumlahnya ${e}.`,given:n,target:e,options:o,answer:o.find(s=>s.value===String(a)).id}}function me(){const e=u(8,18),n=u(1,e-1),a=e-n,i=new Set([a]);let r=0;for(;i.size<3&&r++<60;){const l=a+u(-3,3);l>=0&&l<=e&&l!==a&&i.add(l)}let o=0;for(;i.size<3;)o!==a&&o<=e&&i.add(o),o++;const s=C([...i]).map((l,c)=>({id:`b${c}`,value:String(l)}));return{type:"lt-bond",header:"Latihan Tambah",prompt:"Lengkapkan ikatan nombor.",whole:e,part:n,options:s,answer:s.find(l=>l.value===String(a)).id}}function ve(e){const{a:n,b:a,total:i}=e==="sukar"?Te():We();return{type:"lt-abacus",header:"Latihan Tambah",prompt:"Bina nombor dengan blok puluh & sa.",a:n,b:a,total:i,answer:"ok"}}function We(){const e=u(1,8),n=u(0,9),a=e*10+n;let i;n<9&&Math.random()<.5?i=u(1,9-n):i=u(1,9-e)*10+u(0,9-n);const r=a+i;return{type:"lt-sederhana-s1",header:"Latihan Tambah",prompt:"",a,b:i,total:r,answer:String(r)}}function Te(){let e,n;if(Math.random()<.4){const i=u(1,8),r=u(1,9);e=i*10+r,n=u(10-r,9)}else{const i=u(1,7),r=u(1,9);e=i*10+r;const o=9-i-1,s=u(1,Math.max(1,o)),l=Math.max(1,10-r);n=s*10+u(l,9)}const a=e+n;return{type:"lt-sukar-k1",header:"Latihan Tambah",prompt:"",a:e,b:n,total:a,answer:String(a)}}function oi(e){const n=[];if(e==="mudah"){for(let a=0;a<2;a++)n.push(tt());for(let a=0;a<3;a++)n.push(nt());for(let a=0;a<3;a++)n.push(de());for(let a=0;a<2;a++)n.push(me())}else if(e==="sederhana"){for(let a=0;a<2;a++)n.push(We());for(let a=0;a<3;a++)n.push(ve("sederhana"));for(let a=0;a<3;a++)n.push(de());for(let a=0;a<2;a++)n.push(me())}else{for(let a=0;a<2;a++)n.push(Te());for(let a=0;a<3;a++)n.push(ve("sukar"));for(let a=0;a<3;a++)n.push(me());for(let a=0;a<2;a++)n.push(de())}return C(n).map((a,i)=>({...a,qid:i}))}function we({q:e,ctx:n}){const{answered:a,isCorrect:i,handlePick:r,theme:o}=n,s=String(e.a),l=String(e.b),c=String(e.total),d=Math.max(s.length,l.length,c.length),p=s.padStart(d," ").split(""),m=l.padStart(d," ").split(""),x=c.padStart(d,"0").split(""),[h,f]=w.useState(()=>Array(d).fill("")),[g,b]=w.useState(()=>Array(d).fill("")),[v,y]=w.useState(d-1),[j,S]=w.useState(-1),D=w.useRef([]),E=w.useRef([]),L=(()=>{const F=Array(d).fill(0);let k=0;for(let $=d-1;$>=0;$--){const Y=p[$]===" "?0:Number(p[$]),H=m[$]===" "?0:Number(m[$]);k=Y+H+k>=10?1:0,$-1>=0&&(F[$-1]=k)}return F})(),K=L.some(Boolean),B=h.every(F=>F!==""),T=F=>{S(-1),y(F),D.current[F]?.focus()},P=F=>{S(F),E.current[F]?.focus()},W=(F,k)=>{if(a)return;const $=k.replace(/[^0-9]/g,"").slice(-1);f(Y=>{const H=[...Y];return H[F]=$,H}),$&&F>0&&(L[F-1]&&!g[F-1]?P(F-1):T(F-1))},_=(F,k)=>{if(k.key==="Enter"){k.preventDefault(),B&&X();return}k.key==="ArrowLeft"&&F>0?(k.preventDefault(),T(F-1)):(k.key==="ArrowRight"&&F<d-1||k.key==="Backspace"&&!h[F]&&F<d-1)&&(k.preventDefault(),T(F+1))},Q=(F,k)=>{if(a)return;const $=k.replace(/[^0-9]/g,"").slice(-1);b(Y=>{const H=[...Y];return H[F]=$,H}),$&&T(F)},X=()=>{!a&&B&&r(h.join(""))},G="clamp(54px, 11vmin, 78px)",I="clamp(34px, 6.8vmin, 58px)",R=F=>{const k=!a&&v===F;let $=k?"#3B82F6":"#93C5FD",Y="#1E293B",H="#fff";if(a){const O=h[F]===x[F];$=O?o.green:o.red,Y=O?o.green:o.red,H=O?"#ECFDF5":"#FEF2F2"}return{width:"80%",height:"clamp(54px, 11vmin, 78px)",textAlign:"center",padding:0,border:`3px solid ${$}`,borderRadius:"clamp(10px, 1.6vmin, 16px)",background:H,color:Y,fontFamily:"'Baloo 2', sans-serif",fontWeight:900,fontSize:"clamp(30px, 6vmin, 52px)",outline:"none",transition:"all .12s ease",WebkitTapHighlightColor:"transparent",boxShadow:k?"0 0 0 4px rgba(59,130,246,0.2)":"none"}};return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(12px, 2vmin, 22px)",width:"100%"},children:[t.jsxs("div",{style:{display:"grid",gridTemplateColumns:`repeat(${d+1}, ${G})`,alignItems:"center",justifyItems:"center",rowGap:"clamp(4px, 0.9vmin, 9px)",padding:"clamp(16px, 2.8vmin, 32px) clamp(14px, 2.2vmin, 26px)",background:"#F8FAFC",border:"3px solid #BFDBFE",borderRadius:"clamp(18px, 2.4vmin, 28px)",fontFamily:"'Baloo 2', sans-serif",fontWeight:900},children:[K&&t.jsxs(t.Fragment,{children:[t.jsx("span",{}),x.map((F,k)=>L[k]?t.jsx("input",{ref:$=>{E.current[k]=$},type:"text",inputMode:"numeric",maxLength:1,value:g[k],disabled:a,onChange:$=>Q(k,$.target.value),onFocus:()=>S(k),onBlur:()=>S(-1),"aria-label":"bawa",style:{width:"58%",height:"clamp(26px, 5.2vmin, 40px)",textAlign:"center",padding:0,border:`2px dashed ${j===k?"#F59E0B":"#CBD5E1"}`,borderRadius:10,background:j===k?"#FFFBEB":"#fff",fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:"clamp(16px, 3.4vmin, 26px)",color:"#F59E0B",outline:"none",WebkitTapHighlightColor:"transparent",boxShadow:j===k?"0 0 0 4px rgba(245,158,11,0.25)":"none",transition:"all .12s ease"}},`c${k}`):t.jsx("span",{},`c${k}`))]}),t.jsx("span",{}),p.map((F,k)=>t.jsx("span",{style:{fontSize:I,color:"#1E293B",lineHeight:1.1},children:F===" "?"":F},`a${k}`)),t.jsx("span",{style:{fontSize:I,color:o.accent,lineHeight:1.1},children:"+"}),m.map((F,k)=>t.jsx("span",{style:{fontSize:I,color:"#1E293B",lineHeight:1.1},children:F===" "?"":F},`b${k}`)),t.jsx("div",{style:{gridColumn:"1 / -1",width:"100%",height:3,background:"#1E293B",borderRadius:2,margin:"clamp(2px, 0.6vmin, 5px) 0"}}),t.jsx("span",{}),x.map((F,k)=>t.jsx("input",{ref:$=>{D.current[k]=$},type:"text",inputMode:"numeric",maxLength:1,value:h[k],disabled:a,onChange:$=>W(k,$.target.value),onKeyDown:$=>_(k,$),onFocus:()=>y(k),"aria-label":"jawapan",style:R(k)},`ans${k}`))]}),!a&&t.jsx(fe,{disabled:!B,onClick:X}),a&&!i&&t.jsxs("div",{style:{fontFamily:"'Fredoka', sans-serif",fontWeight:700,color:"#64748B",fontSize:"clamp(13px, 2vmin, 18px)"},children:["Jawapan: ",t.jsx("b",{style:{color:o.green},children:e.total})]})]})}function je({q:e,ctx:n}){const{answered:a,isCorrect:i,handlePick:r,theme:o}=n;return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(12px, 2vmin, 24px)",width:"100%"},children:[t.jsx("div",{style:{minWidth:"clamp(80px, 16vmin, 130px)",padding:"clamp(8px, 1.4vmin, 14px) clamp(18px, 3.4vmin, 32px)",borderRadius:"clamp(16px, 2vmin, 24px)",background:"#EFF6FF",border:"3px solid #93C5FD",fontFamily:"'Baloo 2', sans-serif",fontWeight:900,fontSize:"clamp(28px, 5vmin, 44px)",color:"#1E3A8A",lineHeight:1,textAlign:"center"},children:e.display}),t.jsx(ie,{answered:a,isCorrect:i,handlePick:r,answer:e.answer,theme:o,qid:e.qid})]})}function fe({disabled:e,onClick:n}){return t.jsx("button",{type:"button",onClick:n,disabled:e,style:{minHeight:"clamp(44px, 6vmin, 52px)",padding:"0 clamp(28px, 5vmin, 48px)",border:"none",borderBottom:e?"4px solid #D1D5DB":"4px solid #16A34A",borderRadius:"clamp(12px, 1.6vmin, 16px)",background:e?"#E5E7EB":"#22C55E",color:e?"#9CA3AF":"#fff",cursor:e?"not-allowed":"pointer",fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:"clamp(16px, 2.6vmin, 22px)",WebkitTapHighlightColor:"transparent",transition:"transform .08s ease"},children:"Semak"})}const Fe=e=>({width:"clamp(36px, 7vmin, 46px)",height:"clamp(36px, 7vmin, 46px)",border:"none",borderRadius:10,background:e,color:"#fff",fontFamily:"'Baloo 2', sans-serif",fontWeight:900,fontSize:"clamp(20px, 3.6vmin, 28px)",cursor:"pointer",WebkitTapHighlightColor:"transparent",lineHeight:1});function si({whole:e,part:n}){return t.jsxs("svg",{viewBox:"0 0 220 150",style:{width:"clamp(150px, 36vmin, 230px)",height:"auto",display:"block"},children:[t.jsx("line",{x1:"110",y1:"46",x2:"60",y2:"104",stroke:"#93C5FD",strokeWidth:"4"}),t.jsx("line",{x1:"110",y1:"46",x2:"160",y2:"104",stroke:"#93C5FD",strokeWidth:"4"}),t.jsx("circle",{cx:"110",cy:"34",r:"30",fill:"#3B82F6",stroke:"#93C5FD",strokeWidth:"3"}),t.jsx("text",{x:"110",y:"34",fontFamily:"'Baloo 2', sans-serif",fontWeight:"900",fontSize:"26",fill:"#FFFFFF",textAnchor:"middle",dominantBaseline:"central",children:e}),t.jsx("circle",{cx:"60",cy:"116",r:"26",fill:"#3B82F6",stroke:"#93C5FD",strokeWidth:"3"}),t.jsx("text",{x:"60",y:"116",fontFamily:"'Baloo 2', sans-serif",fontWeight:"900",fontSize:"24",fill:"#FFFFFF",textAnchor:"middle",dominantBaseline:"central",children:n}),t.jsx("circle",{cx:"160",cy:"116",r:"26",fill:"#F59E0B",stroke:"#FCD34D",strokeWidth:"3"}),t.jsx("text",{x:"160",y:"116",fontFamily:"'Baloo 2', sans-serif",fontWeight:"900",fontSize:"24",fill:"#FFFFFF",textAnchor:"middle",dominantBaseline:"central",children:"?"})]})}const li=["M 100 4 A 96 96 0 1 0 100 196 A 96 96 0 1 0 100 4 Z","M 100 0 L 200 195 L 0 195 Z","M 5 5 H 195 V 195 H 5 Z","M 50 5 L 150 5 L 195 100 L 150 195 L 50 195 L 5 100 Z","M 100 195 C 100 195, 0 110, 0 55 C 0 15, 60 0, 100 40 C 140 0, 200 15, 200 55 C 200 110, 100 195, 100 195 Z","M 100 10 L 136 55 L 190 76 L 159 124 L 156 182 L 100 167 L 44 182 L 41 124 L 10 76 L 64 55 Z","M 5 35 H 195 V 165 H 5 Z"];function Se({q:e,ctx:n}){const{answered:a,selected:i,answer:r,handlePick:o}=n,[s,l]=w.useState(0),c=w.useRef(null),d=De.useMemo(()=>{const p=[...li];for(let m=p.length-1;m>0;m--){const x=Math.floor(Math.random()*(m+1));[p[m],p[x]]=[p[x],p[m]]}return p},[e.qid]);return w.useEffect(()=>{if(a&&i===r){const p=performance.now(),m=x=>{const h=Math.min((x-p)/550,1);l(h),h<1&&(c.current=requestAnimationFrame(m))};c.current=requestAnimationFrame(m)}else l(0);return()=>{c.current&&cancelAnimationFrame(c.current)}},[a,i,r]),t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(8px, 1.6vmin, 18px)",width:"100%"},children:[t.jsx("style",{children:`
        .pw-btn {
          position: relative; overflow: hidden;
          -webkit-tap-highlight-color: transparent; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          width: 100%; aspect-ratio: 1 / 1;
          font-family: 'Baloo 2', sans-serif; font-weight: 900;
          font-size: clamp(24px, 5.5vmin, 44px);
          line-height: 1.1;
          border: none; outline: none; padding: 0;
          background: transparent;
          transition: transform 0.2s cubic-bezier(.34,1.56,.64,1);
        }
        .pw-btn:active { transform: scale(0.92); }
        .pw-btn:disabled { cursor: default; }
        .pw-svg { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
        @keyframes pwShake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
        @keyframes pwBounceIn {
          0% { opacity: 0; transform: scale(0.5) rotate(-6deg); }
          60% { transform: scale(1.08) rotate(2deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
      `}),t.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(10px, 2vmin, 24px)",width:"100%",maxWidth:"min(420px, 90vw, 48vh)"},children:e.options.map((p,m)=>{const x=p.id===r,h=i===p.id,f=a&&h&&!x,g=a&&x,b=M[m%M.length],v=d[m%d.length],y=`pw${e.qid}_${m}`,j=g?s:0;return t.jsxs("button",{type:"button",className:"pw-btn",onClick:()=>o(p.id),disabled:a,style:{color:g?"#fff":"#1E293B",textShadow:g?"0 2px 12px rgba(0,0,0,0.35)":"none",animation:f?"pwShake 0.4s ease":`pwBounceIn 0.45s cubic-bezier(.34,1.56,.64,1) ${m*.08}s both`},children:[t.jsxs("svg",{className:"pw-svg",viewBox:"0 0 200 200","aria-hidden":"true",children:[t.jsx("defs",{children:t.jsxs("linearGradient",{id:y,x1:"0",y1:"1",x2:"0",y2:"0",children:[t.jsx("stop",{offset:"0%",stopColor:b.bg}),t.jsx("stop",{offset:`${j*100}%`,stopColor:b.bg}),t.jsx("stop",{offset:`${j*100}%`,stopColor:"transparent",stopOpacity:"0"}),t.jsx("stop",{offset:"100%",stopColor:"transparent",stopOpacity:"0"})]})}),t.jsx("path",{d:v,fill:g?`url(#${y})`:"rgba(0,0,0,0.03)",stroke:f?"#DC2626":g?"transparent":b.border,strokeWidth:"3",strokeDasharray:!g&&!f?"8,6":"none",strokeLinecap:"round",strokeLinejoin:"round"}),g&&t.jsx("path",{d:v,fill:"none",stroke:"rgba(255,255,255,0.35)",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})]}),t.jsx("span",{style:{position:"relative",zIndex:1,textAlign:"center",lineHeight:1.15,padding:"0 4px"},children:g?"✓":p.value})]},p.id)})}),t.jsxs("div",{style:{fontFamily:"'Fredoka', sans-serif",fontWeight:600,fontSize:"clamp(12px, 1.8vmin, 16px)",color:"#94A3B8",display:"flex",alignItems:"center",gap:6,marginTop:0},children:[t.jsx("span",{style:{fontSize:"clamp(16px, 2.4vmin, 24px)"},children:"🎨"}),t.jsx("span",{children:"Warna jawapan yang betul"})]})]})}function Ht({q:e,ctx:n}){const{answered:a,selected:i,answer:r,handlePick:o,theme:s}=n,l=(d,p)=>t.jsx("div",{style:{width:"clamp(52px, 9.5vmin, 70px)",height:"clamp(52px, 9.5vmin, 70px)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",background:p==="q"?"#FEF3C7":"#DBEAFE",border:`3px solid ${p==="q"?"#F59E0B":"#3B82F6"}`,color:p==="q"?"#B45309":"#1E3A8A",fontFamily:"'Baloo 2', sans-serif",fontWeight:900,fontSize:"clamp(22px, 4vmin, 32px)"},children:d}),c=d=>t.jsx("span",{style:{fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:"clamp(20px, 3.6vmin, 30px)",color:"#64748B"},children:d});return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(14px, 2.2vmin, 26px)",width:"100%"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"clamp(8px, 1.6vmin, 16px)"},children:[l(e.given,"n"),c("+"),l("?","q"),c("="),t.jsx("div",{style:{padding:"clamp(8px, 1.4vmin, 14px) clamp(14px, 2.6vmin, 22px)",borderRadius:"clamp(12px, 1.6vmin, 16px)",background:"#EFF6FF",border:"3px solid #93C5FD",color:"#1E3A8A",fontFamily:"'Baloo 2', sans-serif",fontWeight:900,fontSize:"clamp(22px, 4vmin, 32px)"},children:e.target})]}),t.jsx(V,{options:e.options,answered:a,selected:i,answer:r,handlePick:o,theme:s})]})}function Kt({q:e,ctx:n}){const{answered:a,handlePick:i}=n,[r,o]=w.useState(0),[s,l]=w.useState(0);w.useEffect(()=>{o(0),l(0)},[e.qid]);const c=r*10+s,d=()=>{a||i(c===e.total?"ok":"no")},p=(m,x,h,f,g)=>t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:6},children:[t.jsx("div",{style:{fontFamily:"'Fredoka', sans-serif",fontWeight:700,fontSize:"clamp(13px, 2vmin, 18px)",color:"#64748B"},children:m}),t.jsx("div",{style:{flex:1,minHeight:"clamp(84px, 15vmin, 140px)",width:"clamp(78px, 15vmin, 124px)",display:"flex",flexWrap:"wrap",alignContent:"flex-end",justifyContent:"center",gap:4,padding:8,background:"#F8FAFC",border:"2px solid #E2E8F0",borderRadius:12},children:Array.from({length:x}).map((b,v)=>t.jsx("div",{style:g?{width:10,height:"clamp(38px, 7.5vmin, 66px)",background:f,borderRadius:3}:{width:"clamp(14px, 3vmin, 22px)",height:"clamp(14px, 3vmin, 22px)",background:f,borderRadius:4}},v))}),!a&&t.jsxs("div",{style:{display:"flex",gap:6},children:[t.jsx("button",{type:"button",onClick:()=>h(Math.max(0,x-1)),style:Fe("#EF4444"),children:"−"}),t.jsx("button",{type:"button",onClick:()=>h(Math.min(9,x+1)),style:Fe("#3B82F6"),children:"+"})]})]});return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(10px, 1.8vmin, 20px)",width:"100%"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"stretch",gap:"clamp(16px, 3vmin, 40px)"},children:[p("Puluh",r,o,"#3B82F6",!0),p("Sa",s,l,"#F59E0B",!1)]}),t.jsxs("div",{style:{fontFamily:"'Baloo 2', sans-serif",fontWeight:900,fontSize:"clamp(30px, 5.4vmin, 48px)",color:a?c===e.total?"#4ADE80":"#F87171":"#1E293B"},children:[e.a," + ",e.b," = ",c]}),a&&c!==e.total&&t.jsxs("div",{style:{fontFamily:"'Fredoka', sans-serif",fontWeight:700,color:"#64748B",fontSize:"clamp(13px, 2vmin, 18px)"},children:["Jawapan: ",t.jsx("b",{style:{color:"#4ADE80"},children:e.total})]}),!a&&t.jsx(fe,{disabled:!1,onClick:d})]})}function Be({q:e,ctx:n}){const{answered:a,selected:i,answer:r,handlePick:o,theme:s}=n;return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(12px, 2vmin, 22px)",width:"100%"},children:[t.jsx(si,{whole:e.whole,part:e.part}),t.jsx(V,{options:e.options,answered:a,selected:i,answer:r,handlePick:o,theme:s})]})}function Ot({onSelect:e,items:n=ii}){return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",minHeight:0,gap:"clamp(14px, 2.6vmin, 26px)",padding:"clamp(20px, 4vmin, 40px)",fontFamily:"'Baloo 2', sans-serif"},children:[t.jsx("style",{children:`
        .lt-card {
          width: 100%; max-width: 400px; cursor: pointer;
          transition: transform 0.15s ease, border-color 0.15s ease;
          -webkit-tap-highlight-color: transparent; user-select: none;
        }
        .lt-card:active { transform: scale(0.98); }
        @media (hover: hover) {
          .lt-card:hover { transform: translateY(-2px); }
        }
      `}),t.jsx("div",{className:"lt-picker-heading",style:{fontSize:"clamp(22px, 4vmin, 34px)",fontWeight:800,color:"#1E293B",textAlign:"center"},children:"Pilih aras latihan"}),n.map(a=>t.jsxs("div",{className:"lt-card",onClick:()=>e(a.id),role:"button",tabIndex:0,onKeyDown:i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),e(a.id))},style:{display:"flex",alignItems:"center",gap:"clamp(14px, 2.4vmin, 22px)",padding:"clamp(14px, 2.4vmin, 20px) clamp(16px, 3vmin, 26px)",background:"#fff",borderRadius:"clamp(20px, 2.6vmin, 28px)",border:`2px solid ${a.tint}`},children:[t.jsx("div",{style:{flexShrink:0,width:"clamp(52px, 9vmin, 68px)",height:"clamp(52px, 9vmin, 68px)",borderRadius:"clamp(14px, 1.8vmin, 20px)",background:a.tint,display:"flex",alignItems:"center",justifyContent:"center"},children:t.jsx(ri,{bars:a.bars,color:a.color})}),t.jsxs("div",{style:{flex:1,minWidth:0},children:[t.jsx("div",{className:"lt-card-label",style:{fontSize:"clamp(18px, 3vmin, 26px)",fontWeight:800,color:"#1E293B",lineHeight:1.2},children:a.label}),t.jsx("div",{className:"lt-card-desc",style:{fontFamily:"'Fredoka', sans-serif",fontWeight:600,fontSize:"clamp(13px, 2vmin, 17px)",color:"#64748B"},children:a.desc})]})]},a.id))]})}function pi({data:e,language:n,theme:a,onExit:i}){const[r,o]=w.useState(null),s={mudah:"Mudah",sederhana:"Sederhana",sukar:"Sukar"};return r?t.jsxs("div",{style:{display:"flex",flexDirection:"column",height:"100%",minHeight:0},children:[t.jsxs("div",{className:"lt-level-strip",style:{flexShrink:0,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"clamp(4px, 0.8vmin, 8px) clamp(16px, 2.4vmin, 34px)",background:"rgba(255,255,255,.7)",backdropFilter:"blur(8px)",borderBottom:"1px solid #E2E8F0",fontFamily:"'Fredoka', sans-serif",fontWeight:600,fontSize:"clamp(13px, 1.8vmin, 18px)",color:"#64748B"},children:[t.jsxs("span",{className:"lt-level-label",children:["Aras: ",t.jsx("b",{children:s[r]})]}),t.jsx("button",{type:"button",className:"lt-tukar-btn",onClick:()=>o(null),style:{border:"none",background:"transparent",cursor:"pointer",fontFamily:"'Fredoka', sans-serif",fontWeight:600,fontSize:"clamp(12px, 1.6vmin, 16px)",color:"#3B82F6",padding:"4px 8px",borderRadius:8,transition:"background 0.15s",WebkitTapHighlightColor:"transparent"},onMouseEnter:l=>l.currentTarget.style.background="#EFF6FF",onMouseLeave:l=>l.currentTarget.style.background="transparent",children:"Tukar Aras ⟲"})]}),t.jsx("div",{style:{flex:1,minHeight:0},children:t.jsx(U,{buildRound:()=>oi(r),renderQuestion:(l,c)=>{switch(l.type){case"lt-mudah-m1":return t.jsx(je,{q:l,ctx:c});case"lt-warnai":return t.jsx(Se,{q:l,ctx:c});case"lt-padankan":return t.jsx(Ht,{q:l,ctx:c});case"lt-bond":return t.jsx(Be,{q:l,ctx:c});case"lt-abacus":return t.jsx(Kt,{q:l,ctx:c});case"lt-sederhana-s1":return t.jsx(we,{q:l,ctx:c},l.qid);case"lt-sukar-k1":return t.jsx(we,{q:l,ctx:c},l.qid);default:return null}},theme:a,onExit:i,scoreStorageKey:e?.scoreStorageKey,scoreId:e?.scoreId,hideChangeStrip:!0},r)})]}):t.jsx(Ot,{onSelect:o})}const ci=[{id:"mudah",label:"Mudah",bars:1,desc:"Fakta asas hingga 18",color:"#22C55E",tint:"#DCFCE7"},{id:"sederhana",label:"Sederhana",bars:2,desc:"Tolak 2 digit tanpa mengumpul semula",color:"#F59E0B",tint:"#FEF3C7"},{id:"sukar",label:"Sukar",bars:3,desc:"Tolak 2 digit dengan mengumpul semula",color:"#EF4444",tint:"#FEE2E2"}];function wt(e){const n=[];for(let a=e;a<=Math.min(18,e+9);a++){const i=a-e;i>=0&&i<=9&&n.push(`${a}−${i}`)}return n}function at(){const e=u(1,18),n=u(0,Math.min(9,e)),a=e-n;return{type:"lt-tolak-mudah-m1",header:"Latihan Tolak",prompt:"",display:`${e} − ${n} = ?`,answer:String(a)}}function it(){const e=u(2,9),n=A(wt(e)),a=new Set([n]);let i=0;for(;a.size<4&&i++<100;){const s=u(1,15);if(s===e)continue;const l=wt(s).filter(c=>!a.has(c));l.length&&a.add(A(l))}let r=0;for(;a.size<4&&r<50;){const s=u(1,18),l=u(0,Math.min(9,s)),c=`${s}−${l}`;a.has(c)||a.add(c),r++}const o=C([...a]).map((s,l)=>({id:`w${l}`,value:s}));return{type:"lt-tolak-warnai",header:"Latihan Tolak",prompt:`Yang manakah beza ${e}?`,options:o,answer:o.find(s=>s.value===n).id}}function xe(){const e=u(1,9),n=u(e+1,Math.min(18,e+9)),a=n-e,i=new Set([a]);let r=0;for(;i.size<4&&r++<100;){const s=u(0,9);s!==a&&i.add(s)}const o=C([...i]).map((s,l)=>({id:`p${l}`,value:String(s)}));return{type:"lt-tolak-padankan",header:"Latihan Tolak",prompt:`${n} − ? = ${e}`,given:n,target:e,options:o,answer:o.find(s=>s.value===String(a)).id}}function he(){const e=u(8,18),n=u(1,e-1),a=e-n,i=new Set([a]);let r=0;for(;i.size<3&&r++<60;){const l=a+u(-3,3);l>=0&&l<=e&&l!==a&&i.add(l)}let o=0;for(;i.size<3;)o!==a&&o<=e&&i.add(o),o++;const s=C([...i]).map((l,c)=>({id:`b${c}`,value:String(l)}));return{type:"lt-tolak-bond",header:"Latihan Tolak",prompt:"Lengkapkan ikatan nombor.",whole:e,part:n,options:s,answer:s.find(l=>l.value===String(a)).id}}function Ce(e){const{a:n,b:a,diff:i}=e==="sukar"?Pe():Ne();return{type:"lt-tolak-blok",header:"Latihan Tolak",prompt:"Bina nombor dengan blok puluh & sa.",a:n,b:a,diff:i,answer:"ok"}}function Ne(){const e=u(2,9),n=u(0,9),a=e*10+n;let i,r;do i=u(1,e),r=u(0,n);while(i===e&&r===n);const o=i*10+r,s=a-o;return{type:"lt-tolak-sederhana-s1",header:"Latihan Tolak",prompt:"",a,b:o,diff:s,answer:String(s)}}function Pe(){const e=u(2,9),n=u(0,8),a=e*10+n,i=u(1,e-1),r=u(n+1,9),o=i*10+r,s=a-o;return{type:"lt-tolak-sukar-k1",header:"Latihan Tolak",prompt:"",a,b:o,diff:s,answer:String(s)}}function di(e){const n=[];if(e==="mudah"){for(let a=0;a<2;a++)n.push(at());for(let a=0;a<3;a++)n.push(it());for(let a=0;a<3;a++)n.push(xe());for(let a=0;a<2;a++)n.push(he())}else if(e==="sederhana"){for(let a=0;a<2;a++)n.push(Ne());for(let a=0;a<3;a++)n.push(Ce("sederhana"));for(let a=0;a<3;a++)n.push(xe());for(let a=0;a<2;a++)n.push(he())}else{for(let a=0;a<2;a++)n.push(Pe());for(let a=0;a<3;a++)n.push(Ce("sukar"));for(let a=0;a<3;a++)n.push(he());for(let a=0;a<2;a++)n.push(xe())}return C(n).map((a,i)=>({...a,qid:i}))}function Ae({q:e,ctx:n}){const{answered:a,isCorrect:i,handlePick:r,theme:o}=n,s=String(e.a),l=String(e.b),c=String(e.diff),d=Math.max(s.length,l.length,c.length),p=s.padStart(d," ").split(""),m=l.padStart(d," ").split(""),x=c.padStart(d,"0").split(""),h=p[0]===" "?0:parseInt(p[0],10),f=p[d-1]===" "?0:parseInt(p[d-1],10),g=m[d-1]===" "?0:parseInt(m[d-1],10),b=d===2&&p[0]!==" "&&f<g,[v,y]=w.useState(()=>Array(d).fill("")),[j,S]=w.useState(d-1),[D,E]=w.useState(!1),[L,K]=w.useState(!1),[B,T]=w.useState(""),[P,W]=w.useState(!1),[_,Q]=w.useState(""),X=w.useRef([]),G=v.every(z=>z!==""),I=b&&!D;w.useEffect(()=>{y(Array(d).fill("")),S(d-1),E(!1),K(!1),T(""),W(!1),Q("")},[e.qid]);const R=z=>{S(z),X.current[z]?.focus()},F=(z,N)=>{if(a)return;const J=N.replace(/[^0-9]/g,"").slice(-1);y(le=>{const q=[...le];return q[z]=J,q}),J&&z>0&&R(z-1)},k=(z,N)=>{if(N.key==="Enter"){N.preventDefault(),G&&$();return}N.key==="ArrowLeft"&&z>0?(N.preventDefault(),R(z-1)):(N.key==="ArrowRight"&&z<d-1||N.key==="Backspace"&&!v[z]&&z<d-1)&&(N.preventDefault(),R(z+1))},$=()=>{if(!(a||!G)){if(I){Q(`${f} terlalu kecil untuk tolak ${g}. Pinjam dari rumah sebelah dahulu!`);return}r(String(parseInt(v.join(""),10)))}},Y=()=>{parseInt(B,10)===h-1?(E(!0),K(!1),T(""),W(!1),Q("")):W(!0)},H="clamp(54px, 11vmin, 78px)",O="clamp(34px, 6.8vmin, 58px)",Z=z=>{const N=!a&&j===z;let J=N?"#3B82F6":"#93C5FD",le="#1E293B",q="#fff";if(a){const re=v[z]===x[z];J=re?o.green:o.red,le=re?o.green:o.red,q=re?"#ECFDF5":"#FEF2F2"}return{width:"80%",height:"clamp(54px, 11vmin, 78px)",textAlign:"center",padding:0,border:`3px solid ${J}`,borderRadius:"clamp(10px, 1.6vmin, 16px)",background:q,color:le,fontFamily:"'Baloo 2', sans-serif",fontWeight:900,fontSize:"clamp(30px, 6vmin, 52px)",outline:"none",transition:"all .12s ease",WebkitTapHighlightColor:"transparent",boxShadow:N?"0 0 0 4px rgba(59,130,246,0.2)":"none"}},se=(z,N)=>b&&D&&N===0?t.jsxs("span",{style:{position:"relative",fontSize:O,lineHeight:1.1,display:"inline-block"},children:[t.jsx("span",{style:{textDecoration:"line-through",color:"#94A3B8"},children:z}),t.jsx("span",{style:{position:"absolute",top:"-0.55em",left:"50%",transform:"translateX(-50%)",fontSize:"0.5em",color:"#EF4444",fontWeight:900},children:h-1})]},`a${N}`):b&&D&&N===d-1?t.jsx("span",{style:{fontSize:O,color:"#2563EB",lineHeight:1.1,fontWeight:900},children:f+10},`a${N}`):I&&!a&&N===0?t.jsx("span",{role:"button",tabIndex:0,onClick:()=>{K(!0),Q("")},onKeyDown:J=>{(J.key==="Enter"||J.key===" ")&&(J.preventDefault(),K(!0),Q(""))},title:"Ketik untuk pinjam",style:{fontSize:O,color:"#1E293B",lineHeight:1.1,cursor:"pointer",borderRadius:10,padding:"0 clamp(4px,1vmin,8px)",background:"rgba(245,158,11,0.16)",boxShadow:"0 0 0 2px rgba(245,158,11,0.55)"},children:z===" "?"":z},`a${N}`):t.jsx("span",{style:{fontSize:O,color:"#1E293B",lineHeight:1.1},children:z===" "?"":z},`a${N}`);return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(12px, 2vmin, 22px)",width:"100%"},children:[t.jsxs("div",{style:{display:"grid",gridTemplateColumns:`repeat(${d+1}, ${H})`,alignItems:"center",justifyItems:"center",rowGap:"clamp(4px, 0.9vmin, 9px)",padding:"clamp(16px, 2.8vmin, 32px) clamp(14px, 2.2vmin, 26px)",background:"#F8FAFC",border:"3px solid #BFDBFE",borderRadius:"clamp(18px, 2.4vmin, 28px)",fontFamily:"'Baloo 2', sans-serif",fontWeight:900},children:[t.jsx("span",{}),p.map((z,N)=>se(z,N)),t.jsx("span",{style:{fontSize:O,color:o.accent,lineHeight:1.1},children:"−"}),m.map((z,N)=>t.jsx("span",{style:{fontSize:O,color:"#1E293B",lineHeight:1.1},children:z===" "?"":z},`b${N}`)),t.jsx("div",{style:{gridColumn:"1 / -1",width:"100%",height:3,background:"#1E293B",borderRadius:2,margin:"clamp(2px, 0.6vmin, 5px) 0"}}),t.jsx("span",{}),x.map((z,N)=>t.jsx("input",{ref:J=>{X.current[N]=J},type:"text",inputMode:"numeric",maxLength:1,value:v[N],disabled:a,onChange:J=>F(N,J.target.value),onKeyDown:J=>k(N,J),onFocus:()=>S(N),"aria-label":"jawapan",style:Z(N)},`ans${N}`))]}),L&&!a&&t.jsxs("div",{style:{background:"#FFF7ED",border:"2px solid #FED7AA",borderRadius:"clamp(14px, 2vmin, 20px)",padding:"clamp(12px, 2vmin, 18px)",display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(8px, 1.2vmin, 12px)",maxWidth:360,width:"100%"},children:[t.jsx("div",{style:{fontFamily:"'Baloo 2', sans-serif",fontWeight:900,color:"#B45309",fontSize:"clamp(15px, 2.4vmin, 20px)"},children:"🏠 Pinjam dari rumah sebelah"}),t.jsxs("div",{style:{fontFamily:"'Fredoka', sans-serif",fontWeight:700,color:"#7C2D12",fontSize:"clamp(14px, 2.2vmin, 18px)"},children:["Berapa ",h," − 1 = ?"]}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[t.jsx("input",{type:"text",inputMode:"numeric",maxLength:1,value:B,autoFocus:!0,onChange:z=>{T(z.target.value.replace(/[^0-9]/g,"").slice(-1)),W(!1)},onKeyDown:z=>{z.key==="Enter"&&B!==""&&(z.preventDefault(),Y())},"aria-label":"hasil pinjam",style:{width:"clamp(48px, 9vmin, 64px)",height:"clamp(48px, 9vmin, 64px)",textAlign:"center",border:`3px solid ${P?o.red:"#FB923C"}`,borderRadius:12,background:"#fff",fontFamily:"'Baloo 2', sans-serif",fontWeight:900,fontSize:"clamp(26px, 5vmin, 40px)",color:"#1E293B",outline:"none"}}),t.jsx(fe,{disabled:B==="",onClick:Y})]}),P&&t.jsx("div",{style:{fontFamily:"'Fredoka', sans-serif",fontWeight:700,color:o.red,fontSize:"clamp(12px, 1.9vmin, 16px)"},children:"Cuba lagi"})]}),!a&&t.jsx(fe,{disabled:!G,onClick:$}),_&&!a&&t.jsx("div",{style:{fontFamily:"'Fredoka', sans-serif",fontWeight:700,color:"#B45309",textAlign:"center",fontSize:"clamp(12px, 2vmin, 17px)",maxWidth:360},children:_}),a&&!i&&t.jsxs("div",{style:{fontFamily:"'Fredoka', sans-serif",fontWeight:700,color:"#64748B",fontSize:"clamp(13px, 2vmin, 18px)"},children:["Jawapan: ",t.jsx("b",{style:{color:o.green},children:e.diff})]})]})}function Gt({q:e,ctx:n}){const{answered:a,handlePick:i}=n,[r,o]=w.useState(0),[s,l]=w.useState(0);w.useEffect(()=>{o(0),l(0)},[e.qid]);const c=r*10+s,d=()=>{a||i(c===e.diff?"ok":"no")},p=(m,x,h,f,g)=>t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:6},children:[t.jsx("div",{style:{fontFamily:"'Fredoka', sans-serif",fontWeight:700,fontSize:"clamp(13px, 2vmin, 18px)",color:"#64748B"},children:m}),t.jsx("div",{style:{flex:1,minHeight:"clamp(84px, 15vmin, 140px)",width:"clamp(78px, 15vmin, 124px)",display:"flex",flexWrap:"wrap",alignContent:"flex-end",justifyContent:"center",gap:4,padding:8,background:"#F8FAFC",border:"2px solid #E2E8F0",borderRadius:12},children:Array.from({length:x}).map((b,v)=>t.jsx("div",{style:g?{width:10,height:"clamp(38px, 7.5vmin, 66px)",background:f,borderRadius:3}:{width:"clamp(14px, 3vmin, 22px)",height:"clamp(14px, 3vmin, 22px)",background:f,borderRadius:4}},v))}),!a&&t.jsxs("div",{style:{display:"flex",gap:6},children:[t.jsx("button",{type:"button",onClick:()=>h(Math.max(0,x-1)),style:Fe("#EF4444"),children:"−"}),t.jsx("button",{type:"button",onClick:()=>h(Math.min(9,x+1)),style:Fe("#3B82F6"),children:"+"})]})]});return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(10px, 1.8vmin, 20px)",width:"100%"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"stretch",gap:"clamp(16px, 3vmin, 40px)"},children:[p("Puluh",r,o,"#3B82F6",!0),p("Sa",s,l,"#F59E0B",!1)]}),t.jsxs("div",{style:{fontFamily:"'Baloo 2', sans-serif",fontWeight:900,fontSize:"clamp(30px, 5.4vmin, 48px)",color:a?c===e.diff?"#4ADE80":"#F87171":"#1E293B"},children:[e.a," − ",e.b," = ",c]}),a&&c!==e.diff&&t.jsxs("div",{style:{fontFamily:"'Fredoka', sans-serif",fontWeight:700,color:"#64748B",fontSize:"clamp(13px, 2vmin, 18px)"},children:["Jawapan: ",t.jsx("b",{style:{color:"#4ADE80"},children:e.diff})]}),!a&&t.jsx(fe,{disabled:!1,onClick:d})]})}function Yt({q:e,ctx:n}){const{answered:a,selected:i,answer:r,handlePick:o,theme:s}=n,l=(d,p)=>t.jsx("div",{style:{width:"clamp(52px, 9.5vmin, 70px)",height:"clamp(52px, 9.5vmin, 70px)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",background:p==="q"?"#FEF3C7":"#DBEAFE",border:`3px solid ${p==="q"?"#F59E0B":"#3B82F6"}`,color:p==="q"?"#B45309":"#1E3A8A",fontFamily:"'Baloo 2', sans-serif",fontWeight:900,fontSize:"clamp(22px, 4vmin, 32px)"},children:d}),c=d=>t.jsx("span",{style:{fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:"clamp(20px, 3.6vmin, 30px)",color:"#64748B"},children:d});return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(14px, 2.2vmin, 26px)",width:"100%"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"clamp(8px, 1.6vmin, 16px)"},children:[l(e.given,"n"),c("−"),l("?","q"),c("="),t.jsx("div",{style:{padding:"clamp(8px, 1.4vmin, 14px) clamp(14px, 2.6vmin, 22px)",borderRadius:"clamp(12px, 1.6vmin, 16px)",background:"#EFF6FF",border:"3px solid #93C5FD",color:"#1E3A8A",fontFamily:"'Baloo 2', sans-serif",fontWeight:900,fontSize:"clamp(22px, 4vmin, 32px)"},children:e.target})]}),t.jsx(V,{options:e.options,answered:a,selected:i,answer:r,handlePick:o,theme:s})]})}function mi({data:e,language:n,theme:a,onExit:i}){const[r,o]=w.useState(null),s={mudah:"Mudah",sederhana:"Sederhana",sukar:"Sukar"};return r?t.jsxs("div",{style:{display:"flex",flexDirection:"column",height:"100%",minHeight:0},children:[t.jsxs("div",{className:"lt-level-strip",style:{flexShrink:0,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"clamp(4px, 0.8vmin, 8px) clamp(16px, 2.4vmin, 34px)",background:"rgba(255,255,255,.7)",backdropFilter:"blur(8px)",borderBottom:"1px solid #E2E8F0",fontFamily:"'Fredoka', sans-serif",fontWeight:600,fontSize:"clamp(13px, 1.8vmin, 18px)",color:"#64748B"},children:[t.jsxs("span",{className:"lt-level-label",children:["Aras: ",t.jsx("b",{children:s[r]})]}),t.jsx("button",{type:"button",className:"lt-tukar-btn",onClick:()=>o(null),style:{border:"none",background:"transparent",cursor:"pointer",fontFamily:"'Fredoka', sans-serif",fontWeight:600,fontSize:"clamp(12px, 1.6vmin, 16px)",color:"#3B82F6",padding:"4px 8px",borderRadius:8,transition:"background 0.15s",WebkitTapHighlightColor:"transparent"},onMouseEnter:l=>l.currentTarget.style.background="#EFF6FF",onMouseLeave:l=>l.currentTarget.style.background="transparent",children:"Tukar Aras ⟲"})]}),t.jsx("div",{style:{flex:1,minHeight:0},children:t.jsx(U,{buildRound:()=>di(r),renderQuestion:(l,c)=>{switch(l.type){case"lt-tolak-mudah-m1":return t.jsx(je,{q:l,ctx:c});case"lt-tolak-warnai":return t.jsx(Se,{q:l,ctx:c});case"lt-tolak-padankan":return t.jsx(Yt,{q:l,ctx:c});case"lt-tolak-bond":return t.jsx(Be,{q:l,ctx:c});case"lt-tolak-blok":return t.jsx(Gt,{q:l,ctx:c});case"lt-tolak-sederhana-s1":return t.jsx(Ae,{q:l,ctx:c},l.qid);case"lt-tolak-sukar-k1":return t.jsx(Ae,{q:l,ctx:c},l.qid);default:return null}},theme:a,onExit:i,scoreStorageKey:e?.scoreStorageKey,scoreId:e?.scoreId,hideChangeStrip:!0},r)})]}):t.jsx(Ot,{onSelect:o,items:ci})}const rt=["Ali","Siti","Mei","Raju","Amir","Lina"],Ie=["🍎","🌸","🐟","🥚","🍌","🐣","🏀","🎈","🦋","🍪","📚","🌻"],xi=[(e,n,a,i)=>`Ada ${e} ${a}. ${i} ada ${n} lagi. Semuanya ada ___.`,(e,n,a)=>`Yi Lin ada ${e} ${a}. Adiknya ada ${n} ${a}. Semuanya ada ___.`,(e,n,a,i)=>`${i} ada ${e} ${a}. Dia kumpul ${n} lagi. Jumlah ${a} ialah ___.`,(e,n,a)=>`Di dalam bakul ada ${e} ${a}. Masukkan ${n} lagi. Jumlahnya ialah ___.`],hi=[(e,n,a)=>`Ada ${e} ${a}. ${n} ${a} telah rosak. Yang baik ada ___.`,(e,n,a,i)=>`Ada ${e} ${a}. ${i} bagi ${n} kepada jiran. Tinggal ___.`,(e,n)=>`Ada ${e} orang di dalam bas. ${n} orang turun. Baki ialah ___.`,(e,n,a,i)=>`${i} ada ${e} 🥥 kelapa. Dia jual ${n}. Kelapa yang tinggal ialah ___.`,(e,n,a)=>`Di dalam piring ada ${e} ${a}. ${n} ${a} diambil. Tinggal ___.`],ui=[(e,n,a)=>`Ada ${e} ${a} biru dan ${n} ${a} merah. Cari jumlah ${a}.`,(e,n,a,i,r)=>`${i} ada ${e} ${a}. ${r} ada ${n} ${a}. Cari semua ${a}.`],fi=[(e,n,a)=>`Ada ${e} ${a}. ${n} ${a} diberi kepada rakan. Cari ${a} yang tinggal.`,(e,n,a,i)=>`${i} ada ${e} ${a}. Dia makan ${n}. Cari baki ${a}.`,(e,n)=>`Ada ${e} kanak-kanak. ${n} kanak-kanak balik ke rumah. Cari yang tinggal.`];function ot(){const e=A(xi),n=u(5,30),a=Math.min(u(1,15),60-n),i=n+a,r=A(Ie),o=A(rt);return{type:"ctt-tambah",header:"Cerita Tambah",prompt:"Berapakah jumlahnya?",emoji:r,a:n,b:a,story:e(n,a,r,o),answer:String(i)}}function st(){const e=A(hi);let n=u(10,50),a=u(1,20);if(n<=a){const s=n;n=a+u(1,15),a=s}a<1&&(a=1),n-a<1&&(n=n+5);const i=n-a,r=A(Ie),o=A(rt);return{type:"ctt-tolak",header:"Cerita Tolak",prompt:"Berapakah bakinya?",emoji:r,a:n,b:a,story:e(n,a,r,o),answer:String(i)}}function gi(){const e=[];for(let n=0;n<3;n++)e.push(ot());for(let n=0;n<3;n++)e.push(st());return e.push(Ee(!0)),e.push(Ee(!1)),e.push($e(!0)),e.push($e(!1)),C(e).map((n,a)=>({...n,qid:a}))}function Ee(e){const n=u(5,30),a=u(1,15),i=A(Ie),r=C(rt);let o;e?o=A(ui)(n,a,i,r[0],r[1]):o=A(fi)(n,a,i,r[0]);const s=C([{id:"ctc-add",value:"Tambah"},{id:"ctc-sub",value:"Tolak"}]);return{type:"ctt-operasi",header:"Cerita Matematik",prompt:"Operasi yang digunakan ialah ___?",story:o,options:s,answer:e?"ctc-add":"ctc-sub"}}function $e(e){const n=u(16,40),a=u(1,15),i=A(Ie);if(e){const m=n+a,x=`Ada ${n} ${i} merah dan ${a} ${i} kuning. Semuanya ada ${m} ${i}.`,h=`${n} + ${a} = ${m}`,f=`${n} − ${a} = ${n-a}`;let g=m+(Math.random()<.5?1:-1)*u(1,3);g===m&&(g=m+1);const b=`${n} + ${a} = ${g}`,v=C([{id:"d0",value:h},{id:"d1",value:f},{id:"d2",value:b}]);return{type:"ctt-ayat",header:"Ayat Matematik",prompt:"Pilih ayat matematik yang betul.",story:x,options:v,answer:v.find(y=>y.value===h).id}}const r=n-a,o=`Ada ${n} ${i}. ${a} ${i} diambil. Tinggal ${r} ${i}.`,s=`${n} − ${a} = ${r}`,l=`${n} + ${a} = ${n+a}`;let c=r+(Math.random()<.5?1:-1)*u(1,3);c===r&&(c=r+1),c<1&&(c=r+2);const d=`${n} − ${a} = ${c}`,p=C([{id:"d0",value:s},{id:"d1",value:l},{id:"d2",value:d}]);return{type:"ctt-ayat",header:"Ayat Matematik",prompt:"Pilih ayat matematik yang betul.",story:o,options:p,answer:p.find(m=>m.value===s).id}}function bi({text:e,answer:n,answered:a}){const i=e.split("___");return i.length<2?t.jsx("span",{children:e}):t.jsxs("span",{children:[i[0],a?t.jsx("b",{style:{color:"#16A34A",fontSize:"clamp(20px, 3.2vmin, 32px)"},children:n}):t.jsx("span",{style:{background:"#CBD5E1",borderRadius:8,padding:"0 12px",minWidth:28,display:"inline-block",height:"clamp(28px, 4vmin, 40px)",lineHeight:"clamp(28px, 4vmin, 40px)"},children:" "}),i[1]]})}function Jt({q:e,ctx:n}){const{answered:a,isCorrect:i,handlePick:r,theme:o}=n,s=e.type==="ctt-tambah",l=s?"#16A34A":"#EA580C",c=s?"#F0FDF4":"#FFF7ED",d=s?"#86EFAC":"#FED7AA",p=s?"+":"−",m={background:c,border:`2.5px solid ${d}`,borderRadius:"clamp(12px,2vmin,18px)",padding:"clamp(8px,1.4vmin,14px) clamp(12px,2vmin,20px)",display:"flex",flexDirection:"column",alignItems:"center",gap:2,minWidth:"clamp(66px,11vmin,98px)"},x={fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(22px,3.8vmin,36px)",color:l,lineHeight:1},h={fontSize:"clamp(26px,4.5vmin,42px)",lineHeight:1};return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(10px,1.6vmin,18px)",width:"100%"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"clamp(6px,1.1vmin,12px)",flexWrap:"wrap",justifyContent:"center"},children:[t.jsxs("div",{style:m,children:[t.jsx("span",{style:h,children:e.emoji}),t.jsx("span",{style:x,children:e.a})]}),t.jsx("div",{style:{background:l,color:"white",borderRadius:"50%",width:"clamp(36px,5.5vmin,50px)",height:"clamp(36px,5.5vmin,50px)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(22px,3.8vmin,36px)"},children:p}),t.jsxs("div",{style:m,children:[t.jsx("span",{style:h,children:e.emoji}),t.jsx("span",{style:x,children:e.b})]}),t.jsx("span",{style:{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(22px,3.8vmin,36px)",color:"#94A3B8"},children:"="}),t.jsxs("div",{style:{...m,background:a?i?"#DCFCE7":"#FEF2F2":"white",border:`2.5px solid ${a?i?"#16A34A":"#DC2626":"#CBD5E1"}`},children:[t.jsx("span",{style:h,children:a?i?"✓":"✗":"?"}),t.jsx("span",{style:{...x,color:a?i?"#16A34A":"#DC2626":"#CBD5E1"},children:a?e.answer:"??"})]})]}),t.jsx("div",{style:{background:"white",borderRadius:"clamp(12px,1.8vmin,18px)",padding:"clamp(10px,1.6vmin,18px) clamp(14px,2.2vmin,22px)",borderLeft:`5px solid ${l}`,boxShadow:"0 2px 10px rgba(0,0,0,0.07)",fontFamily:"'Fredoka',sans-serif",fontWeight:600,fontSize:"clamp(14px,2.2vmin,22px)",color:"#334155",lineHeight:1.7,width:"100%",maxWidth:500,textAlign:"left"},children:t.jsx(bi,{text:e.story,answer:e.answer,answered:a})}),t.jsx(ie,{answered:a,isCorrect:i,handlePick:r,answer:e.answer,theme:o,qid:e.qid,maxLength:2})]})}function Qt({q:e,ctx:n}){const{answered:a,selected:i,answer:r,handlePick:o}=n;return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(10px,1.8vmin,20px)",width:"100%"},children:[t.jsxs("div",{style:{background:"#FFFBEB",border:"2.5px solid #FDE68A",borderRadius:"clamp(14px,2vmin,20px)",padding:"clamp(12px,2vmin,20px) clamp(16px,2.5vmin,24px)",fontFamily:"'Fredoka',sans-serif",fontWeight:600,fontSize:"clamp(14px,2.3vmin,23px)",color:"#334155",lineHeight:1.7,width:"100%",maxWidth:520,textAlign:"center"},children:[t.jsx("span",{style:{marginRight:6},children:"📖"}),e.story]}),t.jsx("div",{style:{display:"flex",gap:"clamp(12px,2vmin,20px)",width:"100%",maxWidth:380,justifyContent:"center"},children:e.options.map(s=>{const l=s.id==="ctc-add",c=i===s.id,d=s.id===r;let p,m,x;a?c&&d?(p="#DCFCE7",m="#16A34A",x="#16A34A"):c&&!d?(p="#FEF2F2",m="#DC2626",x="#DC2626"):!c&&d?(p="#DCFCE7",m="#16A34A",x="#16A34A"):(p="#F8FAFC",m="#E2E8F0",x="#94A3B8"):(p=l?"#F0FDF4":"#FFF7ED",m=l?"#86EFAC":"#FED7AA",x=l?"#16A34A":"#EA580C");const h=l?"+":"−",f=a?c?d?s.value+" ✓":s.value+" ✗":d?s.value+" ✓":s.value:s.value;return t.jsxs("div",{onClick:()=>!a&&o(s.id),style:{background:p,border:`3px solid ${m}`,borderRadius:"clamp(16px,2.5vmin,24px)",padding:"clamp(14px,2.2vmin,22px) clamp(12px,1.8vmin,18px)",cursor:a?"default":"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(6px,1vmin,10px)",flex:1},children:[t.jsx("div",{style:{width:"clamp(46px,7.5vmin,64px)",height:"clamp(46px,7.5vmin,64px)",background:x,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(26px,4.5vmin,40px)",color:"white",lineHeight:1},children:h}),t.jsx("div",{style:{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(16px,2.6vmin,26px)",color:x,textAlign:"center"},children:f})]},s.id)})})]})}function Xt({q:e,ctx:n}){const{answered:a,selected:i,answer:r,handlePick:o}=n;return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(10px,1.8vmin,20px)",width:"100%"},children:[t.jsx("div",{style:{background:"#EFF6FF",border:"2.5px solid #BFDBFE",borderRadius:"clamp(14px,2vmin,20px)",padding:"clamp(12px,2vmin,20px) clamp(16px,2.5vmin,24px)",fontFamily:"'Fredoka',sans-serif",fontWeight:600,fontSize:"clamp(14px,2.3vmin,23px)",color:"#1E3A8A",lineHeight:1.7,width:"100%",maxWidth:520,textAlign:"center"},children:e.story}),t.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"clamp(8px,1.3vmin,14px)",width:"100%",maxWidth:480},children:e.options.map(s=>{const l=i===s.id,c=s.id===r;let d,p,m,x;return a?l&&c?(d="#DCFCE7",p="#16A34A",m="#14532D",x="✓"):l&&!c?(d="#FEF2F2",p="#DC2626",m="#7F1D1D",x="✗"):!l&&c?(d="#DCFCE7",p="#16A34A",m="#14532D",x="✓"):(d="#F8FAFC",p="#E2E8F0",m="#94A3B8"):(d="white",p="#CBD5E1",m="#1E3A8A"),t.jsxs("div",{onClick:()=>!a&&o(s.id),style:{background:d,border:`3px solid ${p}`,borderRadius:"50px",padding:"clamp(12px,2vmin,18px) clamp(20px,3vmin,30px)",cursor:a?"default":"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:a?"none":"0 2px 8px rgba(0,0,0,0.06)"},children:[t.jsx("span",{style:{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(18px,3vmin,28px)",color:m,flex:1,textAlign:"center"},children:s.value}),x&&t.jsx("div",{style:{width:"clamp(26px,4vmin,36px)",height:"clamp(26px,4vmin,36px)",borderRadius:"50%",background:c?"#16A34A":"#DC2626",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(13px,2.1vmin,19px)",flexShrink:0,marginLeft:8},children:x})]},s.id)})})]})}function yi({data:e,language:n,theme:a,onExit:i}){return t.jsx(U,{buildRound:gi,renderQuestion:(r,o)=>r.type==="ctt-tambah"||r.type==="ctt-tolak"?t.jsx(Jt,{q:r,ctx:o}):r.type==="ctt-operasi"?t.jsx(Qt,{q:r,ctx:o}):t.jsx(Xt,{q:r,ctx:o}),theme:a,onExit:i,scoreStorageKey:e?.scoreStorageKey,scoreId:e?.scoreId})}const Vt=["🍎","⭐","🍦","🐱","🚗","🎈","🍬","🐟","🍌","🐒","🌟","🍇","🐘","🦒","🎁","🐰","🦋","🐝","🌺","🍕"],ki=[2,3,4,5,10],vi=[2,3,4,5];function lt(){const e=A(ki),n=A(vi.filter(a=>a*e<=50));return{N:n,M:e,total:n*e}}function pt(e,n){const a=new Set([e]);for(const o of C([e-n,e+n,e-2*n,e+2*n])){if(a.size>=3)break;o>0&&o<=50&&o!==e&&a.add(o)}let i=0;for(;a.size<3&&i++<50;){const o=u(1,50);a.has(o)||a.add(o)}return C([...a]).map((o,s)=>({id:`o${s}`,value:o}))}function ct(){const{N:e,M:n,total:a}=lt(),i=pt(a,n);return{type:"tb-add-groups",header:"Pembelajaran Tambah Berulang",prompt:`Ada ${e} kumpulan ${n}-${n}. Berapa jumlah kesemuanya?`,N:e,M:n,total:a,icon:A(Vt),options:i,answer:i.find(r=>r.value===a).id}}function dt(){const{N:e,M:n,total:a}=lt(),i=pt(a,n);return{type:"tb-add-line",header:"Pembelajaran Tambah Berulang",prompt:`${e} kumpulan ${n}-${n}. Berapa jumlah?`,N:e,M:n,total:a,options:i,answer:i.find(r=>r.value===a).id}}function mt(){const{N:e,M:n,total:a}=lt(),i=u(0,e-1),r=Array.from({length:e},(s,l)=>l===i?null:n),o=pt(n,1);return{type:"tb-add-complete",header:"Pembelajaran Tambah Berulang",prompt:"Isi tempat kosong.",N:e,M:n,total:a,missingIdx:i,parts:r,options:o,answer:o.find(s=>s.value===n).id}}function Ut(){const e=A([2,3,4,5]),n=u(2,4),a=u(0,e-1),i=n*e+a;return{N:n,M:e,total:i,remainder:a}}function Zt(e,n){const a=new Set([e]);for(const o of C([e+n,e+2*n,e===0?n:0,n-1,n+1])){if(a.size>=3)break;o>=0&&o<=50&&o!==e&&a.add(o)}let i=0;for(;a.size<3&&i++<50;){const o=u(0,n*2);a.has(o)||a.add(o)}return C([...a]).map((o,s)=>({id:`o${s}`,value:o}))}function xt(){const{N:e,M:n,total:a,remainder:i}=Ut(),r=Zt(i,n);return{type:"tb-sub-groups",header:"Pembelajaran Tolak Berturut-turut",prompt:"Berapakah baki?",N:e,M:n,total:a,remainder:i,icon:A(Vt),options:r,answer:r.find(o=>o.value===i).id}}function ht(){const{N:e,M:n,total:a,remainder:i}=Ut(),r=Zt(i,n);return{type:"tb-sub-line",header:"Pembelajaran Tolak Berturut-turut",prompt:`${a} tolak ${n} berulang-ulang. Berapakah baki?`,N:e,M:n,total:a,remainder:i,options:r,answer:r.find(o=>o.value===i).id}}function wi(){const e=[];for(let n=0;n<3;n++)e.push(ct());for(let n=0;n<2;n++)e.push(dt());for(let n=0;n<2;n++)e.push(mt());for(let n=0;n<2;n++)e.push(xt());for(let n=0;n<1;n++)e.push(ht());return C(e).map((n,a)=>({...n,qid:a}))}function qt({icon:e,groups:n,count:a}){return t.jsx("div",{style:{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"clamp(6px, 1.2vmin, 12px)"},children:Array.from({length:n}).map((r,o)=>t.jsx("div",{style:{background:o%2===0?"#F8FAFC":"#F1F5F9",border:"1.5px solid #E2E8F0",borderRadius:"clamp(10px, 1.4vmin, 16px)",padding:"clamp(6px, 1vmin, 12px)",display:"flex",flexDirection:"column",alignItems:"center",gap:"1px"},children:Array.from({length:Math.ceil(a/4)}).map((s,l)=>t.jsx("div",{style:{display:"flex",justifyContent:"center",gap:"2px"},children:Array.from({length:Math.min(4,a-l*4)}).map((c,d)=>t.jsx("span",{style:{fontSize:"clamp(18px, 3.6vmin, 34px)",lineHeight:1.1},children:e},d))},l))},o))})}function ji({N:e,M:n,total:a,answered:i,correct:r}){const s=Math.min(60,Math.floor(288/e)),l=72+e*s,c=150,d=96,p=m=>36+m*s;return t.jsxs("svg",{viewBox:`0 0 ${l} ${c}`,style:{width:"100%",maxWidth:l,height:"auto",display:"block"},children:[t.jsx("defs",{children:t.jsx("marker",{id:"tbaArr",viewBox:"0 0 10 10",refX:"8",refY:"5",markerWidth:"8",markerHeight:"8",orient:"auto",children:t.jsx("path",{d:"M0 0 L10 5 L0 10 z",fill:"#3B82F6"})})}),t.jsx("line",{x1:28,y1:d,x2:l-36+8,y2:d,stroke:"#94A3B8",strokeWidth:"3",strokeLinecap:"round"}),Array.from({length:e}).map((m,x)=>{const h=p(x),f=p(x+1),g=(h+f)/2,b=d-40;return t.jsxs("g",{children:[t.jsx("path",{d:`M${h} ${d-6} Q${g} ${b} ${f} ${d-6}`,fill:"none",stroke:"#3B82F6",strokeWidth:"3",markerEnd:"url(#tbaArr)"}),t.jsxs("text",{x:g,y:b+4,fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"13",fill:"#2563EB",textAnchor:"middle",children:["+",n]})]},`j${x}`)}),Array.from({length:e+1}).map((m,x)=>{const h=x*n,f=x===0,g=x===e;let b="#CBD5E1",v="#475569";return f&&(b="#3B82F6",v="#1E3A8A"),g&&(r?(b="#16A34A",v="#166534"):i?(b="#1D4ED8",v="#1E3A8A"):(b="#F59E0B",v="#B45309")),t.jsxs("g",{children:[t.jsx("line",{x1:p(x),y1:d-8,x2:p(x),y2:d+8,stroke:b,strokeWidth:f||g?3:2}),t.jsx("text",{x:p(x),y:d+26,fontFamily:"'Baloo 2',sans-serif",fontWeight:f||g?900:600,fontSize:f||g?18:13,fill:v,textAnchor:"middle",children:g&&!i?"?":h})]},`t${x}`)})]})}function Fi({N:e,M:n,total:a,remainder:i=0,answered:r,correct:o}){const l=Math.min(60,Math.floor(288/e)),c=72+e*l,d=150,p=96,m=x=>36+x*l;return t.jsxs("svg",{viewBox:`0 0 ${c} ${d}`,style:{width:"100%",maxWidth:c,height:"auto",display:"block"},children:[t.jsx("defs",{children:t.jsx("marker",{id:"tbsArr",viewBox:"0 0 10 10",refX:"2",refY:"5",markerWidth:"8",markerHeight:"8",orient:"auto",children:t.jsx("path",{d:"M10 0 L0 5 L10 10 z",fill:"#3B82F6"})})}),t.jsx("line",{x1:28,y1:p,x2:c-36+8,y2:p,stroke:"#94A3B8",strokeWidth:"3",strokeLinecap:"round"}),Array.from({length:e}).map((x,h)=>{const f=e-h,g=e-h-1,b=m(f),v=m(g),y=(b+v)/2,j=p-40;return t.jsxs("g",{children:[t.jsx("path",{d:`M${b} ${p-6} Q${y} ${j} ${v} ${p-6}`,fill:"none",stroke:"#3B82F6",strokeWidth:"3",markerEnd:"url(#tbsArr)"}),t.jsxs("text",{x:y,y:j+4,fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"13",fill:"#2563EB",textAnchor:"middle",children:["-",n]})]},`j${h}`)}),Array.from({length:e+1}).map((x,h)=>{const f=i+h*n,g=h===e,b=h===0;let v="#CBD5E1",y="#475569";return g&&(v="#3B82F6",y="#1E3A8A"),b&&(o?(v="#16A34A",y="#166534"):r?(v="#1D4ED8",y="#1E3A8A"):(v="#F59E0B",y="#B45309")),t.jsxs("g",{children:[t.jsx("line",{x1:m(h),y1:p-8,x2:m(h),y2:p+8,stroke:v,strokeWidth:g||b?3:2}),t.jsx("text",{x:m(h),y:p+26,fontFamily:"'Baloo 2',sans-serif",fontWeight:g||b?900:600,fontSize:g||b?18:13,fill:y,textAnchor:"middle",children:b&&!r?"?":f})]},`t${h}`)})]})}function en({q:e,ctx:n}){const{answered:a,selected:i,answer:r,handlePick:o,theme:s}=n;return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(14px, 2.4vmin, 28px)",width:"100%"},children:[t.jsx(qt,{icon:e.icon,groups:e.N,count:e.M}),t.jsx(V,{options:e.options,answered:a,selected:i,answer:r,handlePick:o,theme:s})]})}function tn({q:e,ctx:n}){const{answered:a,selected:i,answer:r,handlePick:o,theme:s}=n;return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(14px, 2.4vmin, 28px)",width:"100%"},children:[t.jsx(ji,{N:e.N,M:e.M,total:e.total,answered:a,correct:a&&i===r}),t.jsx(V,{options:e.options,answered:a,selected:i,answer:r,handlePick:o,theme:s})]})}function nn({q:e,ctx:n}){const{answered:a,selected:i,answer:r,handlePick:o,theme:s}=n;return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(14px, 2.4vmin, 28px)",width:"100%"},children:[t.jsxs("div",{style:{display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center",gap:"clamp(6px, 1.2vmin, 10px)"},children:[e.parts.map((l,c)=>{const d=c===e.parts.length-1,p=l===null,m=c%M.length;return t.jsxs(De.Fragment,{children:[t.jsx("div",{style:{minWidth:"clamp(36px, 7vmin, 52px)",minHeight:"clamp(36px, 7vmin, 52px)",border:p?a?"none":"3px dashed #D1D5DB":"none",borderBottom:p&&a?"none":`4px solid ${p?"#D1D5DB":M[m].border}`,borderRadius:"clamp(10px, 1.4vmin, 14px)",background:p?a?s.green:"#F3F4F6":M[m].bg,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Baloo 2',sans-serif",fontWeight:900,fontSize:"clamp(20px, 4vmin, 32px)",color:p?a?"#fff":"#9CA3AF":"#fff",padding:"4px 8px"},children:p?a?e.M:"?":l}),!d&&t.jsx("span",{style:{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(16px, 3vmin, 26px)",color:"#B6C2D9"},children:"+"})]},c)}),t.jsx("span",{style:{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(16px, 3vmin, 26px)",color:"#B6C2D9"},children:"="}),t.jsx("div",{style:{minWidth:"clamp(36px, 7vmin, 52px)",minHeight:"clamp(36px, 7vmin, 52px)",border:"none",borderBottom:"4px solid #16A34A",borderRadius:"clamp(10px, 1.4vmin, 14px)",background:"#34D399",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Baloo 2',sans-serif",fontWeight:900,fontSize:"clamp(20px, 4vmin, 32px)",color:"#fff",padding:"4px 8px"},children:e.total})]}),t.jsx(V,{options:e.options,answered:a,selected:i,answer:r,handlePick:o,theme:s})]})}function an({q:e,ctx:n}){const{answered:a,selected:i,answer:r,handlePick:o,theme:s}=n;return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(14px, 2.4vmin, 28px)",width:"100%"},children:[t.jsx(qt,{icon:e.icon,groups:e.N,count:e.M}),t.jsxs("div",{style:{display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center",gap:"clamp(4px, 0.8vmin, 8px)"},children:[t.jsx("span",{style:{fontFamily:"'Baloo 2',sans-serif",fontWeight:900,fontSize:"clamp(22px, 4vmin, 36px)",color:"#FFFFFF"},children:e.total}),Array.from({length:e.N}).map((l,c)=>t.jsxs(De.Fragment,{children:[t.jsx("span",{style:{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(16px, 3vmin, 26px)",color:"#FF6B6B"},children:"−"}),t.jsx("span",{style:{fontFamily:"'Baloo 2',sans-serif",fontWeight:900,fontSize:"clamp(22px, 4vmin, 36px)",color:"#FFFFFF"},children:e.M})]},c)),t.jsx("span",{style:{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(16px, 3vmin, 26px)",color:"#B6C2D9"},children:"="}),t.jsx("div",{style:{minWidth:"clamp(36px, 7vmin, 52px)",minHeight:"clamp(36px, 7vmin, 52px)",background:a?i===r?"#16A34A":"#EF4444":"#F3F4F6",border:a?"none":"3px dashed #D1D5DB",borderRadius:"clamp(10px, 1.4vmin, 14px)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Baloo 2',sans-serif",fontWeight:900,fontSize:"clamp(20px, 4vmin, 32px)",color:a?"#fff":"#9CA3AF"},children:a?String(e.remainder??0):"?"})]}),t.jsx(V,{options:e.options,answered:a,selected:i,answer:r,handlePick:o,theme:s})]})}function rn({q:e,ctx:n}){const{answered:a,selected:i,answer:r,handlePick:o,theme:s}=n;return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(14px, 2.4vmin, 28px)",width:"100%"},children:[t.jsx(Fi,{N:e.N,M:e.M,total:e.total,remainder:e.remainder??0,answered:a,correct:a&&i===r}),t.jsx(V,{options:e.options,answered:a,selected:i,answer:r,handlePick:o,theme:s})]})}function Si({data:e,language:n,theme:a,onExit:i}){return t.jsx(U,{buildRound:wi,renderQuestion:(r,o)=>{switch(r.type){case"tb-add-groups":return t.jsx(en,{q:r,ctx:o});case"tb-add-line":return t.jsx(tn,{q:r,ctx:o});case"tb-add-complete":return t.jsx(nn,{q:r,ctx:o});case"tb-sub-groups":return t.jsx(an,{q:r,ctx:o});default:return t.jsx(rn,{q:r,ctx:o})}},theme:a,onExit:i,scoreStorageKey:e?.scoreStorageKey,scoreId:e?.scoreId})}const Bi=[["Aishah","Lili"],["Ali","Abu"],["Siti","Mira"],["Raju","Kumar"]],jt=["bunga","buku","bola","pensel","bintang","stiker"],Ci=["pecah","hilang","jatuh","koyak","habis"];function Ft(){const e=u(11,25),n=A(Bi),a=A(jt),i=A(jt.filter(x=>x!==a)),r=A(Ci),o=u(1,e-1),s=[...Array(e-1)].map((x,h)=>h+1).filter(x=>x!==o),l=A(s),c=u(1,Math.min(20,100-e)),d=u(1,Math.min(30,100-e)),p=e+u(3,Math.min(20,50-e)),m=e+u(2,Math.min(15,40-e));return{N:e,correctAnswer:e,spokes:[{id:0,type:"sm2-add-addend",a:o,answer:e-o,display:`${o} + __ = ${e}`},{id:1,type:"sm2-sub-complete",a:l,answer:e-l,display:`${e} = __ + ${l}`},{id:2,type:"sm2-find-minuend",b:c,answer:e+c,display:`Tolak ${c} daripada __ ialah ${e}.`},{id:3,type:"sm2-compute-diff",a:e+d,b:d,answer:e,display:`${e+d} − ${d} = __`},{id:4,type:"sm2-word-beza",total:p,person1:n[0],person2:n[1],noun:a,answer:p-e,display:`${n[0]} ada ${p} ${a}. ${n[1]} ada __ ${a}. Beza = ${e}.`},{id:5,type:"sm2-word-baki",total:m,noun:i,verb:r,answer:m-e,display:`Ada ${m} ${i}. __ ${i} ${r}. Baki ialah ${e}.`}]}}function Ai({data:e,language:n,theme:a,onExit:i}){const r=a||{},o=r.accent||"#3B82F6",s=r.dark||"#1E3A8A",[l,c]=w.useState(()=>Ft()),[d,p]=w.useState([!1,!1,!1,!1,!1,!1]),[m,x]=w.useState(null),[h,f]=w.useState(""),[g,b]=w.useState(null),[v,y]=w.useState(!1),j=w.useRef(null),[S,D]=w.useState(240);w.useEffect(()=>{const F=j.current;if(!F)return;const k=new ResizeObserver($=>{const{width:Y,height:H}=$[0].contentRect;D(Math.max(130,Math.min(Y,H)-12))});return k.observe(F),()=>k.disconnect()},[v]);const E=l.N,L=l.spokes,B=d.filter(Boolean).length===6;w.useEffect(()=>{if(B&&!v){const F=setTimeout(()=>{y(!0),ee("streak"),ae({particleCount:200,spread:160,origin:{y:.4}}),setTimeout(()=>ae({particleCount:140,spread:120,startVelocity:45,origin:{y:.55}}),250)},1200);return()=>clearTimeout(F)}},[B,v]);const T=F=>{d[F]||v||(x(F),f(""),b(null))},P=()=>{x(null),f(""),b(null)},W=()=>{if(m===null||h==="")return;const F=parseInt(h,10),k=L[m];if(F===k.answer){ee("correct"),ae({particleCount:40,spread:60,origin:{y:.6},scalar:.8});const $=[...d];$[m]=!0,p($),x(null),f(""),b(null)}else ee("wrong"),b(m),f(""),setTimeout(()=>b(null),500)},_=()=>{c(Ft()),p([!1,!1,!1,!1,!1,!1]),x(null),f(""),b(null),y(!1)},Q=[0,60,120,180,240,300],X=[24.75,18.5,18.5,24.75,18.5,18.5],G=F=>f(k=>k.length<3?k+F:k),I=()=>f(F=>F.slice(0,-1)),R=["Tambah","Lengkap","Cari","Tolak","Cerita 1","Cerita 2"];return w.useEffect(()=>{if(m===null||v)return;const F=k=>{k.key>="0"&&k.key<="9"?(k.preventDefault(),G(k.key)):k.key==="Backspace"||k.key==="Delete"?(k.preventDefault(),I()):k.key==="Enter"?(k.preventDefault(),W()):k.key==="Escape"&&(k.preventDefault(),P())};return window.addEventListener("keydown",F),()=>window.removeEventListener("keydown",F)},[m,h,v]),t.jsxs("div",{style:{position:"relative",display:"flex",flexDirection:"column",height:"100%",minHeight:0,width:"100%",overflow:"hidden",background:"transparent"},children:[t.jsx("style",{children:`
        @keyframes sm2-shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }
        @keyframes sm2-pop {
          0% { transform: scale(0.8); opacity: 0.5; }
          60% { transform: scale(1.08); }
          100% { transform: scale(1); opacity: 1; }
        }
        .sm2-shake { animation: sm2-shake .35s ease; }
        .sm2-pop { animation: sm2-pop .4s cubic-bezier(.34,1.56,.64,1); }
        .sm2-kp-btn { transition: all 0.08s ease; -webkit-tap-highlight-color: transparent; }
        .sm2-kp-btn:active { transform: translateY(4px); border-bottom-width: 0 !important; }

        .sm2-body { position: relative; z-index: 1; flex: 1; display: flex; min-height: 0; overflow: hidden; }
        .sm2-wheel-pane { position: relative; flex: 1; overflow: hidden; min-height: 0; min-width: 0; }
        .sm2-wheel { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); }

        @keyframes sm2-backdrop-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes sm2-dialog-in { 0% { transform: translateY(12px) scale(0.94); opacity: 0; } 100% { transform: translateY(0) scale(1); opacity: 1; } }
        .sm2-backdrop {
          position: absolute; inset: 0; z-index: 50;
          display: flex; align-items: center; justify-content: center;
          padding: clamp(12px, 3vmin, 32px); overflow: hidden;
          background: rgba(15, 23, 42, .32); backdrop-filter: blur(4px);
          animation: sm2-backdrop-in .18s ease;
        }
        .sm2-dialog {
          position: relative; width: 100%; max-width: 360px; max-height: 100%;
          display: flex; flex-direction: column; align-items: center; gap: clamp(10px, 1.8vmin, 18px);
          background: linear-gradient(180deg, rgba(255,255,255,.98), rgba(239,248,255,.96)); border-radius: clamp(16px, 2.4vmin, 24px);
          border: 1.5px solid rgba(147,197,253,.7);
          padding: clamp(16px, 3vmin, 28px);
          box-shadow: 0 20px 50px -12px rgba(30,64,175,.26), inset 0 1px 0 rgba(255,255,255,.98);
          animation: sm2-dialog-in .26s cubic-bezier(.34,1.56,.64,1);
        }
        .sm2-keypad { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(5px, 0.9vmin, 9px); width: 100%; }
        .sm2-keypad button { height: clamp(34px, 5vmin, 48px); }
      `}),v?t.jsxs("div",{style:{position:"relative",zIndex:1,flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"clamp(16px, 3vmin, 32px)",padding:"clamp(20px, 4vmin, 40px)"},children:[t.jsx("div",{style:{fontSize:"clamp(52px, 14vmin, 100px)",lineHeight:1},children:"🎉"}),t.jsx("div",{style:{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(24px, 4.6vmin, 42px)",color:"#fff",textAlign:"center",textShadow:"0 2px 18px rgba(129,140,248,.7)"},children:"Tahniah! Semua 6 selesai!"}),t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"clamp(10px, 1.6vmin, 16px)",width:"100%",maxWidth:320},children:[t.jsx("button",{type:"button",onClick:_,style:{padding:"clamp(12px, 1.8vmin, 18px) clamp(24px, 4vmin, 48px)",border:"none",borderRadius:999,background:o,color:"#fff",cursor:"pointer",fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(16px, 2.6vmin, 24px)",boxShadow:`0 4px 0 ${s}`,WebkitTapHighlightColor:"transparent"},children:"↻ Main Semula"}),t.jsx("button",{type:"button",onClick:i,style:{padding:"clamp(12px, 1.8vmin, 18px) clamp(24px, 4vmin, 48px)",border:`2px solid ${o}`,borderRadius:999,background:"#fff",color:s,cursor:"pointer",fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(16px, 2.6vmin, 24px)",WebkitTapHighlightColor:"transparent"},children:"← Selesai"})]})]}):t.jsx("div",{className:"sm2-body",children:t.jsxs("div",{className:"sm2-wheel-pane",ref:j,children:[t.jsxs("div",{className:"sm2-wheel",style:{width:S,height:S},children:[t.jsxs("svg",{viewBox:"0 0 100 100",style:{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",filter:"drop-shadow(0 0 8px rgba(0,0,0,0.5))"},children:[Q.map((F,k)=>{const $=(F-90)*Math.PI/180,Y=50+14*Math.cos($),H=50+14*Math.sin($),O=50+X[k]*Math.cos($),Z=50+X[k]*Math.sin($),se=d[k];return t.jsx("line",{x1:Y,y1:H,x2:O,y2:Z,stroke:se?"#16A34A":o,strokeWidth:"2",strokeLinecap:"round",style:{filter:se?"drop-shadow(0 0 4px rgba(22,163,74,.45))":`drop-shadow(0 0 4px ${o}66)`}},k)}),t.jsx("circle",{cx:"50",cy:"50",r:"13",fill:s,stroke:o,strokeWidth:"2.4",style:{filter:`drop-shadow(0 10px 18px ${o}44)`}}),t.jsx("circle",{cx:"50",cy:"50",r:"14.5",fill:"none",stroke:"rgba(59,130,246,0.32)",strokeWidth:"0.5",strokeDasharray:"1 1.5"})]}),t.jsxs("div",{style:{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%,-50%)",display:"flex",flexDirection:"column",alignItems:"center",pointerEvents:"none"},children:[t.jsx("span",{style:{fontFamily:"'Baloo 2',sans-serif",fontWeight:900,fontSize:S*.13,color:"#fff",lineHeight:1,textShadow:"0 0 14px rgba(6,182,212,.8), 0 0 4px rgba(255,255,255,.5)"},children:E}),t.jsx("span",{style:{fontFamily:"'Fredoka',sans-serif",fontWeight:700,fontSize:Math.max(7,S*.035),color:"#BFDBFE",letterSpacing:"0.05em",textTransform:"uppercase"},children:"Pusat"})]}),L.map((F,k)=>{const Y=(Q[k]-90)*Math.PI/180,H=S*.345,O=S/2+H*Math.cos(Y),Z=S/2+H*Math.sin(Y),se=S*.26,z=S*.175,N=m===k,J=d[k],le=g===k;let q="rgba(255,255,255,.92)",re="#93C5FD",ut=s,Me="0 12px 24px rgba(30,64,175,.12)";return J&&(q="#DCFCE7",re="#16A34A",ut="#15803D",Me="0 12px 24px rgba(22,163,74,.16)"),N&&(q="#DBEAFE",re=o,Me=`0 0 0 3px ${o}33, 0 16px 28px rgba(30,64,175,.20)`),t.jsx("div",{style:{position:"absolute",left:O,top:Z,width:se,height:z,transform:"translate(-50%,-50%)",zIndex:N?10:2},children:t.jsx("div",{onClick:()=>J?null:T(k),className:le?"sm2-shake":J?"sm2-pop":"",style:{width:"100%",height:"100%",background:q,border:`2px solid ${re}`,borderRadius:Math.max(8,S*.04),display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"2px 4px",boxSizing:"border-box",cursor:J?"default":"pointer",boxShadow:Me,transition:"all .25s ease",WebkitTapHighlightColor:"transparent",overflow:"hidden",backdropFilter:"blur(6px)"},children:J?t.jsx("span",{style:{fontSize:z*.6,color:"#4ADE80",fontWeight:900,textShadow:"0 0 8px rgba(74,222,128,.5)"},children:"✓"}):t.jsx("span",{style:{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:Math.max(9,S*.045),color:ut,lineHeight:1.1,textShadow:N?"0 0 8px rgba(244,114,182,.6)":"none"},children:R[k]})})},F.id)})]}),m!==null&&t.jsx("div",{className:"sm2-backdrop",onClick:P,children:t.jsxs("div",{className:"sm2-dialog",onClick:F=>F.stopPropagation(),children:[t.jsx("button",{type:"button",onClick:P,"aria-label":"Tutup",style:{position:"absolute",top:"clamp(8px, 1.4vmin, 14px)",right:"clamp(8px, 1.4vmin, 14px)",width:"clamp(28px, 4vmin, 36px)",height:"clamp(28px, 4vmin, 36px)",border:"none",borderRadius:"50%",background:"#EAF2FF",color:"#64748B",cursor:"pointer",fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(14px, 2.2vmin, 18px)",lineHeight:1,WebkitTapHighlightColor:"transparent"},children:"✕"}),t.jsx("div",{style:{fontFamily:"'Fredoka',sans-serif",fontWeight:700,fontSize:"clamp(13px, 2.2vmin, 17px)",color:o,textTransform:"uppercase",letterSpacing:".04em"},children:R[m]}),t.jsx("div",{style:{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(24px, 5vmin, 40px)",color:"#1E293B",textAlign:"center",lineHeight:1.3},children:L[m].display}),t.jsx("div",{style:{minWidth:"clamp(96px, 18vmin, 140px)",height:"clamp(48px, 6.6vmin, 66px)",border:"2px solid #BFDBFE",borderRadius:"clamp(10px, 1.4vmin, 15px)",background:"#F8FBFF",boxShadow:"inset 0 2px 6px rgba(30,64,175,.08)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Baloo 2',sans-serif",fontWeight:900,fontSize:"clamp(28px, 4.8vmin, 44px)",color:h?s:"#94A3B8",padding:"0 16px"},children:h||"?"}),t.jsxs("div",{className:"sm2-keypad",children:[[1,2,3,4,5,6,7,8,9].map(F=>t.jsx("button",{type:"button",className:"sm2-kp-btn",onClick:()=>G(String(F)),style:{border:"none",borderBottom:"4px solid #2563EB",borderRadius:"clamp(9px, 1.2vmin, 13px)",background:"#3B82F6",color:"#fff",cursor:"pointer",fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(16px, 2.6vmin, 24px)"},children:F},F)),t.jsx("button",{type:"button",className:"sm2-kp-btn",onClick:I,style:{border:"none",borderBottom:"4px solid #DC2626",borderRadius:"clamp(9px, 1.2vmin, 13px)",background:"#EF4444",color:"#fff",cursor:"pointer",fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(12px, 2vmin, 18px)"},children:"Padam"}),t.jsx("button",{type:"button",className:"sm2-kp-btn",onClick:()=>G("0"),style:{border:"none",borderBottom:"4px solid #2563EB",borderRadius:"clamp(9px, 1.2vmin, 13px)",background:"#3B82F6",color:"#fff",cursor:"pointer",fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(16px, 2.6vmin, 24px)"},children:"0"})]}),t.jsx("button",{type:"button",className:"sm2-kp-btn",onClick:W,disabled:h==="",style:{width:"100%",height:"clamp(44px, 6vmin, 58px)",border:"none",borderRadius:"clamp(10px, 1.4vmin, 15px)",borderBottom:h===""?"5px solid #D1D5DB":"5px solid #15803D",background:h===""?"#E5E7EB":"#22C55E",color:h===""?"#94A3B8":"#fff",cursor:h===""?"not-allowed":"pointer",fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(18px, 3vmin, 26px)",WebkitTapHighlightColor:"transparent",display:"flex",alignItems:"center",justifyContent:"center",gap:8},children:"Semak ✓"})]})})]})})]})}function on(e,n){switch(e.type){case"kt-gabung":return t.jsx(Tt,{q:e,ctx:n});case"kt-garis":return t.jsx(Nt,{q:e,ctx:n});case"kt-perkataan":return t.jsx(Pt,{q:e,ctx:n});case"kt-ayat":return t.jsx(It,{q:e,ctx:n});case"kt-buang":return t.jsx(Mt,{q:e,ctx:n});case"kt-garis-sub":return t.jsx(Rt,{q:e,ctx:n});case"kt-perkataan-tolak":return t.jsx(Lt,{q:e,ctx:n});case"kt-ayat-tolak":return t.jsx(_t,{q:e,ctx:n});case"lt-mudah-m1":return t.jsx(je,{q:e,ctx:n});case"lt-warnai":return t.jsx(Se,{q:e,ctx:n});case"lt-padankan":return t.jsx(Ht,{q:e,ctx:n});case"lt-bond":return t.jsx(Be,{q:e,ctx:n});case"lt-abacus":return t.jsx(Kt,{q:e,ctx:n});case"lt-sederhana-s1":return t.jsx(we,{q:e,ctx:n},e.qid);case"lt-sukar-k1":return t.jsx(we,{q:e,ctx:n},e.qid);case"lt-tolak-mudah-m1":return t.jsx(je,{q:e,ctx:n});case"lt-tolak-warnai":return t.jsx(Se,{q:e,ctx:n});case"lt-tolak-padankan":return t.jsx(Yt,{q:e,ctx:n});case"lt-tolak-bond":return t.jsx(Be,{q:e,ctx:n});case"lt-tolak-blok":return t.jsx(Gt,{q:e,ctx:n});case"lt-tolak-sederhana-s1":return t.jsx(Ae,{q:e,ctx:n},e.qid);case"lt-tolak-sukar-k1":return t.jsx(Ae,{q:e,ctx:n},e.qid);case"ctt-tambah":case"ctt-tolak":return t.jsx(Jt,{q:e,ctx:n});case"ctt-operasi":return t.jsx(Qt,{q:e,ctx:n});case"ctt-ayat":return t.jsx(Xt,{q:e,ctx:n});case"tb-add-groups":return t.jsx(en,{q:e,ctx:n});case"tb-add-line":return t.jsx(tn,{q:e,ctx:n});case"tb-add-complete":return t.jsx(nn,{q:e,ctx:n});case"tb-sub-groups":return t.jsx(an,{q:e,ctx:n});case"tb-sub-line":return t.jsx(rn,{q:e,ctx:n});default:return null}}function St(e){const a={"kt-gabung":Je,"kt-garis":Qe,"kt-perkataan":Xe,"kt-ayat":Ve,"lt-mudah-m1":tt,"lt-warnai":nt,"lt-padankan":de,"lt-bond":me,"lt-abacus":()=>ve("sukar"),"lt-sederhana-s1":We,"lt-sukar-k1":Te,"kt-buang":Ue,"kt-garis-sub":Ze,"kt-perkataan-tolak":qe,"kt-ayat-tolak":et,"lt-tolak-mudah-m1":at,"lt-tolak-warnai":it,"lt-tolak-padankan":xe,"lt-tolak-bond":he,"lt-tolak-blok":()=>Ce("sukar"),"lt-tolak-sederhana-s1":Ne,"lt-tolak-sukar-k1":Pe,"ctt-tambah":ot,"ctt-tolak":st,"ctt-operasi":()=>Ee(!0),"ctt-ayat":()=>$e(!0),"tb-add-groups":ct,"tb-add-line":dt,"tb-add-complete":mt,"tb-sub-groups":xt,"tb-sub-line":ht}[e];return a?Array.from({length:10},(r,o)=>({...a(),qid:o})):[]}const ne=[{id:"kenali-tambah",name:"Kenali Tambah",color:"#3B82F6",types:["kt-gabung","kt-garis","kt-perkataan","kt-ayat"]},{id:"latihan-tambah",name:"Latihan Tambah",color:"#6366F1",types:["lt-mudah-m1","lt-warnai","lt-padankan","lt-bond","lt-abacus","lt-sederhana-s1","lt-sukar-k1"]},{id:"kenali-tolak",name:"Kenali Tolak",color:"#EF4444",types:["kt-buang","kt-garis-sub","kt-perkataan-tolak","kt-ayat-tolak"]},{id:"latihan-tolak",name:"Latihan Tolak",color:"#F97316",types:["lt-tolak-mudah-m1","lt-tolak-warnai","lt-tolak-padankan","lt-tolak-bond","lt-tolak-blok","lt-tolak-sederhana-s1","lt-tolak-sukar-k1"]},{id:"cerita",name:"Cerita Tambah & Tolak",color:"#F59E0B",types:["ctt-tambah","ctt-tolak","ctt-operasi","ctt-ayat"]},{id:"tambah-berulang",name:"Tambah Tolak Berulang",color:"#14B8A6",types:["tb-add-groups","tb-add-line","tb-add-complete","tb-sub-groups","tb-sub-line"]}],Ei={"kt-gabung":{label:"Gabung Kumpulan",hint:"Kira jumlah kumpulan"},"kt-garis":{label:"Garis Nombor",hint:"Kira loncatan pada garis"},"kt-perkataan":{label:"Pilih Perkataan",hint:"Pilih tambah atau jumlah"},"kt-ayat":{label:"Lengkapkan Ayat",hint:"Isi tempat kosong"},"kt-buang":{label:"Buang Kumpulan",hint:"Kira baki kumpulan"},"kt-garis-sub":{label:"Garis Nombor",hint:"Kira undur pada garis"},"kt-perkataan-tolak":{label:"Pilih Perkataan",hint:"Pilih baki atau beza"},"kt-ayat-tolak":{label:"Lengkapkan Ayat",hint:"Isi tempat tolak"},"lt-mudah-m1":{label:"Mudah Tambah",hint:"Tambah fakta asas"},"lt-warnai":{label:"Warnai Tambah",hint:"Padan warna jawapan"},"lt-padankan":{label:"Padankan Tambah",hint:"Padan pasangan nombor"},"lt-bond":{label:"Ikatan Nombor",hint:"Cari bahagian ikatan"},"lt-abacus":{label:"Bina Blok",hint:"Bina dengan blok puluh"},"lt-sederhana-s1":{label:"Sederhana Tambah",hint:"Tambah tanpa mengumpul"},"lt-sukar-k1":{label:"Sukar Tambah",hint:"Tambah dengan mengumpul"},"lt-tolak-mudah-m1":{label:"Mudah Tolak",hint:"Tolak fakta asas"},"lt-tolak-warnai":{label:"Warnai Tolak",hint:"Padan warna jawapan"},"lt-tolak-padankan":{label:"Padankan Tolak",hint:"Padan pasangan nombor"},"lt-tolak-bond":{label:"Ikatan Nombor",hint:"Cari bahagian ikatan"},"lt-tolak-blok":{label:"Bina Blok",hint:"Bina dengan blok puluh"},"lt-tolak-sederhana-s1":{label:"Sederhana Tolak",hint:"Tolak tanpa meminjam"},"lt-tolak-sukar-k1":{label:"Sukar Tolak",hint:"Tolak dengan meminjam"},"ctt-tambah":{label:"Cerita Tambah",hint:"Selesaikan cerita tambah"},"ctt-tolak":{label:"Cerita Tolak",hint:"Selesaikan cerita tolak"},"ctt-operasi":{label:"Pilih Operasi",hint:"Tambah atau tolak?"},"ctt-ayat":{label:"Ayat Matematik",hint:"Pilih ayat yang betul"},"tb-add-groups":{label:"Kira Kumpulan",hint:"Kumpulan tambah berulang"},"tb-add-line":{label:"Garis Nombor TB",hint:"Loncat tambah berulang"},"tb-add-complete":{label:"Lengkapkan TB",hint:"Isi ayat tambah berulang"},"tb-sub-groups":{label:"Tolak Berturut",hint:"Kumpulan tolak berturut"},"tb-sub-line":{label:"Garis Nombor TB",hint:"Loncat tolak berturut"}},$i={"kenali-tambah":{icon:"⚡",ac:"#00d2ff",cardCls:"ld-card-cyan"},"latihan-tambah":{icon:"⚙️",ac:"#00d2ff",cardCls:"ld-card-cyan"},"kenali-tolak":{icon:"☄️",ac:"#ff5b7f",cardCls:"ld-card-tolak"},"latihan-tolak":{icon:"🛡️",ac:"#ff5b7f",cardCls:"ld-card-tolak"},cerita:{icon:"🛰️",ac:"#ffd000",cardCls:"ld-card-mixed"},"tambah-berulang":{icon:"🌌",ac:"#ffd000",cardCls:"ld-card-mixed"}},sn="mt_ld_m2_scores",Di=.8;function ln(){try{return JSON.parse(localStorage.getItem(sn)||"{}")}catch{return{}}}function zi(e,n,a){const i=ln(),r=i[e];if(!r||n>r.best){const o={...i,[e]:{best:n,total:a,passed:n/a>=Di}};try{localStorage.setItem(sn,JSON.stringify(o))}catch{}return o}return i}function Wi({data:e,language:n,theme:a,onExit:i}){const r=a||{},o=r.accent||"#3B82F6",s=r.dark||"#1E3A8A",l=r.cd||"#1D4ED8",c=e?.initialType,{xp:d,streak:p,loading:m}=mn("mt"),[x,h]=w.useState(c||null),[f,g]=w.useState(ln);w.useEffect(()=>{c&&h(c)},[c]);const b=(v,y,j)=>{const S=zi(v,y,j);g(S)};return x?t.jsx(Ti,{selectedType:x,theme:a,onBackToPicker:c?i:()=>h(null),onScoreRecord:b}):t.jsxs("div",{style:{display:"flex",flexDirection:"column",height:"100%",minHeight:0,width:"100%"},children:[t.jsx("style",{children:`
          .ld-modules-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
            gap: 10px;
          }

          /* ── Base card ── */
          .ld-module-card {
            backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
            border-radius: 14px; border: 1px solid;
            padding: 12px 14px; display: flex; flex-direction: column;
            justify-content: space-between; min-height: 85px; cursor: pointer;
            transition: transform .22s cubic-bezier(.4,0,.2,1),
                        box-shadow .22s cubic-bezier(.4,0,.2,1),
                        border-color .22s ease, background .22s ease;
            -webkit-tap-highlight-color: transparent;
          }
          .ld-module-card:active { transform: scale(.96) !important; }

          /* ── Permanent glow — always-on resting state ── */
          .ld-card-cyan {
            background: rgba(0,22,48,.72);
            border-color: rgba(0,210,255,.42);
            box-shadow: 0 0 16px rgba(0,210,255,.26), inset 0 0 20px rgba(0,210,255,.07);
          }
          .ld-card-tolak {
            background: rgba(40,8,22,.72);
            border-color: rgba(255,91,127,.42);
            box-shadow: 0 0 16px rgba(255,91,127,.26), inset 0 0 20px rgba(255,91,127,.07);
          }
          .ld-card-mixed {
            background: rgba(36,30,0,.72);
            border-color: rgba(255,208,0,.42);
            box-shadow: 0 0 16px rgba(255,208,0,.26), inset 0 0 20px rgba(255,208,0,.07);
          }

          /* ── Card text ── */
          .ld-module-name {
            font-size: clamp(13px,1.8vmin,15px); font-weight: 600; color: #fff;
            margin: 0 0 4px; line-height: 1.2;
            font-family: 'Space Grotesk', 'Baloo 2', sans-serif;
          }
          .ld-module-desc {
            font-size: clamp(10px,1.3vmin,12px); color: #b0b3d6; margin: 0 0 8px;
            line-height: 1.3; font-family: 'Fredoka', sans-serif; flex: 1;
          }

          /* ── MULA button — permanent colored + glow ── */
          .ld-btn-launch {
            cursor: pointer;
            font-size: 11px; font-weight: 700; text-transform: uppercase;
            padding: 5px 14px; border-radius: 8px; letter-spacing: .6px;
            transition: all .2s ease; font-family: 'Baloo 2', sans-serif;
            position: relative; overflow: hidden; flex-shrink: 0;
          }
          .ld-btn-launch::after {
            content: '';
            position: absolute; top: 0; left: -120%; width: 60%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,.32), transparent);
            animation: ld-shine 2.8s ease-in-out infinite;
          }
          @keyframes ld-shine {
            0%   { left: -120%; }
            45%, 100% { left: 170%; }
          }
          @media (prefers-reduced-motion: reduce) {
            .ld-btn-launch::after { animation: none; }
          }

          .ld-card-cyan .ld-btn-launch {
            background: rgba(0,210,255,.22);
            border: 1px solid rgba(0,210,255,.6);
            color: #00d2ff;
            box-shadow: 0 0 11px rgba(0,210,255,.42);
          }
          .ld-card-tolak .ld-btn-launch {
            background: rgba(255,91,127,.22);
            border: 1px solid rgba(255,91,127,.6);
            color: #ff5b7f;
            box-shadow: 0 0 11px rgba(255,91,127,.42);
          }
          .ld-card-mixed .ld-btn-launch {
            background: rgba(255,208,0,.22);
            border: 1px solid rgba(255,208,0,.6);
            color: #ffd000;
            box-shadow: 0 0 11px rgba(255,208,0,.42);
          }

          /* ── Score badge ── */
          .ld-card-footer {
            display: flex; align-items: center; justify-content: space-between; gap: 6px;
          }
          .ld-score-badge {
            display: inline-flex; align-items: center; gap: 7px;
            padding: 4px 13px 4px 5px; border-radius: 999px; white-space: nowrap;
            box-shadow: inset 0 1px 0 rgba(255,255,255,.12);
          }
          /* status icon chip */
          .ld-score-icon {
            display: inline-flex; align-items: center; justify-content: center;
            width: 18px; height: 18px; border-radius: 50%; flex-shrink: 0;
            font-size: 10px; font-weight: 900; line-height: 1;
            font-family: 'Space Grotesk', sans-serif;
          }
          .ld-score-meta { display: flex; flex-direction: column; line-height: 1; }
          .ld-score-tag {
            font-family: 'Fredoka', sans-serif; font-size: 7px; font-weight: 700;
            letter-spacing: .7px; text-transform: uppercase; opacity: .75; margin-bottom: 2px;
          }
          .ld-score-num {
            font-family: 'Space Grotesk', sans-serif; font-size: 13px; font-weight: 800;
            letter-spacing: -.2px;
          }
          .ld-score-num small { font-size: 9px; font-weight: 600; opacity: .6; margin-left: 2px; }

          .ld-score-badge.unplayed {
            background: linear-gradient(180deg, rgba(255,255,255,.09), rgba(255,255,255,.04));
            border: 1px solid rgba(255,255,255,.16); color: rgba(255,255,255,.62);
          }
          .ld-score-badge.unplayed .ld-score-icon {
            background: rgba(255,255,255,.12); color: rgba(255,255,255,.6);
          }
          .ld-score-badge.passed {
            background: linear-gradient(180deg, rgba(34,197,94,.26), rgba(34,197,94,.12));
            border: 1px solid rgba(74,222,128,.5); color: #6ee7a0;
            box-shadow: 0 0 12px rgba(34,197,94,.3), inset 0 1px 0 rgba(255,255,255,.14);
          }
          .ld-score-badge.passed .ld-score-icon {
            background: #22c55e; color: #052e16;
            box-shadow: 0 0 8px rgba(74,222,128,.7);
          }
          .ld-score-badge.failed {
            background: linear-gradient(180deg, rgba(239,68,68,.26), rgba(239,68,68,.12));
            border: 1px solid rgba(248,113,113,.5); color: #fca5a5;
            box-shadow: 0 0 12px rgba(239,68,68,.28), inset 0 1px 0 rgba(255,255,255,.14);
          }
          .ld-score-badge.failed .ld-score-icon {
            background: #ef4444; color: #fff;
            box-shadow: 0 0 8px rgba(248,113,113,.7);
          }

          /* ── New hover — stronger glow + lift ── */
          @media (hover: hover) {
            .ld-card-cyan:hover {
              border-color: #00d2ff;
              box-shadow: 0 0 26px rgba(0,210,255,.6), 0 0 60px rgba(0,210,255,.2),
                          inset 0 0 30px rgba(0,210,255,.13);
              transform: translateY(-4px);
              background: rgba(0,34,64,.9);
            }
            .ld-card-cyan:hover .ld-btn-launch {
              background: #00d2ff; border-color: #00d2ff;
              color: #011820; box-shadow: 0 0 22px rgba(0,210,255,.85);
            }

            .ld-card-tolak:hover {
              border-color: #ff5b7f;
              box-shadow: 0 0 26px rgba(255,91,127,.6), 0 0 60px rgba(255,91,127,.2),
                          inset 0 0 30px rgba(255,91,127,.13);
              transform: translateY(-4px);
              background: rgba(54,10,26,.9);
            }
            .ld-card-tolak:hover .ld-btn-launch {
              background: #ff5b7f; border-color: #ff5b7f;
              color: #fff; box-shadow: 0 0 22px rgba(255,91,127,.85);
            }

            .ld-card-mixed:hover {
              border-color: #ffd000;
              box-shadow: 0 0 26px rgba(255,208,0,.6), 0 0 60px rgba(255,208,0,.2),
                          inset 0 0 30px rgba(255,208,0,.13);
              transform: translateY(-4px);
              background: rgba(50,42,0,.9);
            }
            .ld-card-mixed:hover .ld-btn-launch {
              background: #ffd000; border-color: #ffd000;
              color: #1a1200; box-shadow: 0 0 22px rgba(255,208,0,.85);
            }
          }
          .ld-module-card,
          .ld-card-cyan,
          .ld-card-tolak,
          .ld-card-mixed {
            background:
              linear-gradient(180deg, rgba(255,255,255,.96), rgba(239,248,255,.90)),
              radial-gradient(circle at 50% 0%, color-mix(in srgb, ${o} 16%, transparent), transparent 68%) !important;
            border: 1.5px solid color-mix(in srgb, ${o} 30%, #D8E8FF) !important;
            box-shadow: inset 0 1px 0 rgba(255,255,255,.98), 0 12px 26px rgba(30,64,175,.12) !important;
          }
          .ld-module-name {
            color: #1E293B !important;
            font-family: 'Baloo 2', sans-serif !important;
            font-weight: 900 !important;
          }
          .ld-module-desc {
            color: #5B6B7B !important;
            font-weight: 600 !important;
          }
          .ld-picker-stats { display: none !important; }
          .ld-btn-launch {
            background: linear-gradient(180deg, ${o}, ${l}) !important;
            border: 1px solid rgba(255,255,255,.34) !important;
            color: #fff !important;
            box-shadow: inset 0 1px 0 rgba(255,255,255,.34), 0 3px 0 ${s}, 0 10px 18px rgba(59,130,246,.22) !important;
          }
          .ld-score-badge.unplayed {
            background: #F1F5F9 !important;
            border-color: #D9E5F6 !important;
            color: #64748B !important;
            box-shadow: none !important;
          }
          .ld-score-badge.unplayed .ld-score-icon {
            background: #CBD5E1 !important;
            color: #fff !important;
          }
          .ld-score-badge.passed {
            background: #DCFCE7 !important;
            border-color: #86EFAC !important;
            color: #15803D !important;
            box-shadow: inset 0 1px 0 rgba(255,255,255,.7) !important;
          }
          .ld-score-badge.failed {
            background: #FEE2E2 !important;
            border-color: #FCA5A5 !important;
            color: #B91C1C !important;
            box-shadow: inset 0 1px 0 rgba(255,255,255,.7) !important;
          }
          @media (hover: hover) {
            .ld-module-card:hover {
              background: #fff !important;
              border-color: ${o} !important;
              box-shadow: inset 0 1px 0 rgba(255,255,255,.98), 0 16px 34px rgba(30,64,175,.18) !important;
              transform: translateY(-3px);
            }
            .ld-module-card:hover .ld-btn-launch {
              background: linear-gradient(180deg, color-mix(in srgb, ${o} 92%, white), ${l}) !important;
              box-shadow: inset 0 1px 0 rgba(255,255,255,.36), 0 4px 0 ${s}, 0 14px 24px rgba(59,130,246,.30) !important;
            }
          }
        `}),t.jsx("div",{style:{flex:1,overflow:"auto",padding:"clamp(10px,2vmin,20px)"},children:t.jsxs("div",{style:{maxWidth:720,margin:"0 auto"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:20},children:[t.jsx("div",{style:{fontFamily:"'Baloo 2',sans-serif",fontWeight:900,fontSize:"clamp(17px,2.4vmin,23px)",color:s},children:"Pilih Jenis Latihan"}),!m&&t.jsx("div",{className:"ld-picker-stats",style:{display:"flex",gap:8,alignItems:"center",flexShrink:0},children:[{icon:"⭐",val:d,c:"#FFD23F",b:"rgba(255,210,63,.4)",g:"rgba(255,210,63,.18)"},{icon:"⚡",val:p,c:"#2DE2E6",b:"rgba(45,226,230,.4)",g:"rgba(45,226,230,.18)"}].map(({icon:v,val:y,c:j,b:S,g:D})=>t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:5,fontFamily:"'Space Grotesk', sans-serif",fontWeight:700,fontSize:"clamp(12px,1.6vmin,14px)",color:j,padding:"5px 11px",borderRadius:10,background:"rgba(20,18,52,.6)",border:`1px solid ${S}`,boxShadow:`0 0 12px ${D}`},children:[v," ",y]},v))})]}),ne.map((v,y)=>{const j=$i[v.id]||{icon:"▶",ac:v.color,cardCls:"ld-card-cyan"};return t.jsxs("div",{style:{marginBottom:y<ne.length-1?26:8},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:12,paddingLeft:2},children:[t.jsxs("span",{style:{fontFamily:"'Baloo 2',sans-serif",fontWeight:700,fontSize:"clamp(12px,1.5vmin,14px)",textTransform:"uppercase",letterSpacing:2,color:j.ac,whiteSpace:"nowrap"},children:[j.icon," ",v.name]}),t.jsx("div",{style:{flex:1,height:1,background:`linear-gradient(90deg, ${j.ac}66, transparent)`}})]}),t.jsx("div",{className:"ld-modules-grid",children:v.types.map(S=>{const D=Ei[S];return t.jsxs("div",{className:`ld-module-card ${j.cardCls}`,onClick:()=>h(S),children:[t.jsxs("div",{children:[t.jsx("p",{className:"ld-module-name",children:D.label}),t.jsx("p",{className:"ld-module-desc",children:D.hint})]}),t.jsxs("div",{className:"ld-card-footer",children:[(()=>{const E=f[S],L=E?E.passed?"passed":"failed":"unplayed",K=E?E.passed?"✓":"✗":"–",B=E?E.passed?"Lulus":"Gagal":"Score",T=E?E.best:0,P=E?E.total:10;return t.jsxs("span",{className:`ld-score-badge ${L}`,children:[t.jsx("span",{className:"ld-score-icon",children:K}),t.jsxs("span",{className:"ld-score-meta",children:[t.jsx("span",{className:"ld-score-tag",children:B}),t.jsxs("span",{className:"ld-score-num",children:[T,t.jsxs("small",{children:["/ ",P]})]})]})]})})(),t.jsx("button",{type:"button",className:"ld-btn-launch",children:"Mula"})]})]},S)})})]},v.id)})]})})]})}function Ti({selectedType:e,theme:n,onBackToPicker:a,onScoreRecord:i}){const r=n||{},o=r.accent||"#3B82F6",s=r.dark||"#1E3A8A",l=r.cd||"#1D4ED8",[c,d]=w.useState(()=>St(e)),[p,m]=w.useState(0),[x,h]=w.useState(null),[f,g]=w.useState(0),[b,v]=w.useState(0),[y,j]=w.useState(0),[S,D]=w.useState(!1),E=c[p];if(!E)return null;const L=x!==null,K=L&&x===E.answer,B=p+1>=c.length,T=c.length>0?Math.round(f/c.length*100):0,P=y>0&&y%10===0?10:y%10,W=I=>{L||(h(I),I===E.answer?(g(R=>R+1),j(R=>R+1),ee("correct"),ae({particleCount:45,spread:60,startVelocity:32,origin:{y:.7},scalar:.85})):(v(R=>R+1),j(0),ee("wrong")))},_=()=>{if(B){D(!0),i?.(e,f,c.length);return}h(null),m(p+1)},Q=()=>{d(St(e)),m(0),h(null),g(0),v(0),j(0),D(!1)},X=()=>{a()},G={answered:L,selected:x,answer:E.answer,isCorrect:K,handlePick:W,handleNext:_,streak:y,correct:f,wrong:b,theme:{accent:o,dark:s,cd:l,green:"#16A34A",red:"#DC2626"}};return t.jsxs("div",{style:{display:"flex",flexDirection:"column",height:"100%",minHeight:0,width:"100%"},children:[t.jsx("style",{children:`
        .ld-drill-scroll { flex: 1; min-height: 0; overflow-y: auto; -webkit-overflow-scrolling: touch; }
        .maf-footer { flex-shrink: 0; display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: clamp(8px,1.2vmin,15px) clamp(16px,2.4vmin,34px); background: rgba(255,255,255,.9); backdrop-filter: blur(12px); border-top: 1px solid rgba(147,197,253,.42); box-shadow: 0 -10px 28px rgba(30,64,175,.08); }
        .maf-footer-tally { display: flex; align-items: center; gap: 6px 10px; flex-wrap: wrap; font-family: 'Fredoka',sans-serif; font-size: clamp(13px,1.7vmin,18px); font-weight: 700; color: #475569; }
        .maf-stats { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
        .maf-stats .maf-stat { display: inline-flex; align-items: center; gap: 3px; }
        .maf-stats .maf-divider { color: #CBD5E1; font-weight: 400; }
        .ld-drill-body {
          min-height: 100%; box-sizing: border-box;
          display: flex; flex-direction: column; justify-content: center; align-items: center;
          padding: clamp(14px, 3vmin, 40px);
        }
        .ld-drill-content {
          width: 100%; max-width: min(94vw, 860px);
          display: flex; flex-direction: column; align-items: center;
          gap: clamp(8px, 1.6vmin, 18px);
        }
        .ld-drill-question {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(22px, 4.6vmin, 44px); color: #1E293B; text-align: center; line-height: 1.15;
        }
        .ld-drill-feedback {
          font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(17px, 2.6vmin, 28px);
          text-align: center; min-height: clamp(24px, 3.4vmin, 38px);
          display: flex; align-items: center; justify-content: center;
          color: #64748B;
        }
        .ld-drill-feedback.ok { color: #16A34A; }
        .ld-drill-feedback.no { color: #DC2626; }
        .ld-drill-next {
          padding: clamp(11px, 1.5vmin, 17px) clamp(28px, 4vmin, 52px); border: none; border-radius: 999px;
          background: linear-gradient(180deg, ${o}, ${l});
          color: #fff;
          font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(17px, 2.6vmin, 26px);
          cursor: pointer; box-shadow: 0 4px 16px ${o}55; transition: transform .1s ease, box-shadow .1s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .ld-drill-next:active { transform: translateY(2px); box-shadow: 0 2px 8px ${o}44; }
        .ld-drill-done-emoji { font-size: clamp(52px, 14vmin, 120px); line-height: 1; }
        .ld-drill-summary { display: flex; flex-direction: column; gap: clamp(8px, 1.4vmin, 14px); width: 100%; max-width: 340px; }
        .ld-drill-summary-row {
          display: flex; align-items: center; justify-content: space-between;
          background: rgba(255,255,255,.92); border: 1px solid rgba(147,197,253,.42); border-radius: 14px;
          padding: clamp(10px, 1.6vmin, 16px) clamp(16px, 2.4vmin, 26px);
          font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(16px, 2.4vmin, 22px); color: #1E293B;
        }
        .ld-drill-summary-row b { font-size: clamp(20px, 3vmin, 28px); }
        .ld-drill-summary-row.ok b { color: #16A34A; }
        .ld-drill-summary-row.no b { color: #DC2626; }
        .ld-drill-complete-actions { display: flex; flex-wrap: wrap; gap: clamp(10px, 1.6vmin, 16px); justify-content: center; }
        .ld-drill-btn-secondary {
          padding: clamp(11px, 1.5vmin, 17px) clamp(24px, 3.4vmin, 44px); border-radius: 999px;
          border: 2px solid color-mix(in srgb, ${o} 55%, #BFDBFE); background: #EFF6FF; color: ${s};
          font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(16px, 2.4vmin, 24px);
          cursor: pointer; -webkit-tap-highlight-color: transparent;
        }
      `}),S?t.jsx("div",{className:"ld-drill-scroll",children:t.jsx("div",{className:"ld-drill-body",children:t.jsxs("div",{className:"ld-drill-content",style:{textAlign:"center"},children:[t.jsx("div",{className:"ld-drill-done-emoji",children:"🎉"}),t.jsx("div",{className:"ld-drill-question",children:"Tahniah!"}),t.jsxs("div",{className:"ld-drill-feedback",children:["Skor kamu: ",f,"/",c.length," (",T,"%)"]}),t.jsxs("div",{className:"ld-drill-summary",children:[t.jsxs("div",{className:"ld-drill-summary-row ok",children:[t.jsx("span",{children:"✅ Betul"}),t.jsx("b",{children:f})]}),t.jsxs("div",{className:"ld-drill-summary-row no",children:[t.jsx("span",{children:"❌ Salah"}),t.jsx("b",{children:b})]})]}),t.jsxs("div",{className:"ld-drill-complete-actions",children:[t.jsx("button",{className:"ld-drill-btn-secondary",type:"button",onClick:Q,children:"↻ Main Semula"}),t.jsx("button",{className:"ld-drill-next",type:"button",onClick:X,children:"Pilih Latihan Lain →"})]})]})})}):t.jsxs(t.Fragment,{children:[t.jsx("div",{className:"ld-drill-scroll",children:t.jsx("div",{className:"ld-drill-body",children:t.jsxs("div",{className:"ld-drill-content",children:[E.prompt&&t.jsx("div",{className:"ld-drill-question",children:E.prompt}),on(E,G),t.jsx("div",{className:`ld-drill-feedback ${L?K?"ok":"no":""}`,children:L?K?"Betul! 🎉":"Cuba lagi":""}),L&&t.jsx("button",{className:"ld-drill-next",type:"button",onClick:_,children:B?"Tamat 🎉":"Seterusnya →"})]})})}),t.jsxs("div",{className:"maf-footer",children:[t.jsxs("div",{className:"maf-footer-tally",children:[t.jsx("span",{children:"Jawapan :"}),t.jsxs("span",{className:"maf-stats",children:[t.jsxs("span",{className:"maf-stat",style:{color:"#16A34A"},children:[t.jsx("span",{children:"✅"}),t.jsx("span",{children:f}),t.jsx("span",{style:{color:"rgba(255,255,255,.45)",fontWeight:500},children:"Betul"})]}),t.jsx("span",{className:"maf-divider",children:"|"}),t.jsxs("span",{className:"maf-stat",style:{color:"#DC2626"},children:[t.jsx("span",{children:"❌"}),t.jsx("span",{children:b}),t.jsx("span",{style:{color:"rgba(255,255,255,.45)",fontWeight:500},children:"salah"})]})]})]}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4},children:[t.jsx("span",{style:{fontSize:18},children:"🏆"}),t.jsx("div",{style:{width:70,height:7,background:"rgba(255,210,63,.15)",borderRadius:4,overflow:"hidden"},children:t.jsx("div",{style:{width:`${P/10*100}%`,height:"100%",background:"linear-gradient(90deg,#FFD23F,#FFAB00)",borderRadius:4,transition:"width .3s ease-out",boxShadow:"0 0 6px #FFD23F88"}})}),t.jsxs("span",{style:{color:s,fontSize:"0.85rem",fontWeight:900,minWidth:28,textAlign:"right"},children:[P,"/10"]})]})]})]})]})}function Ni(){const e=[...ne[0].types,...ne[1].types,...ne[2].types,...ne[3].types,...ne[4].types,...ne[5].types],n={"kt-gabung":Je,"kt-garis":Qe,"kt-perkataan":Xe,"kt-ayat":Ve,"lt-mudah-m1":tt,"lt-warnai":nt,"lt-padankan":de,"lt-bond":me,"lt-abacus":()=>ve("sukar"),"lt-sederhana-s1":We,"lt-sukar-k1":Te,"kt-buang":Ue,"kt-garis-sub":Ze,"kt-perkataan-tolak":qe,"kt-ayat-tolak":et,"lt-tolak-mudah-m1":at,"lt-tolak-warnai":it,"lt-tolak-padankan":xe,"lt-tolak-bond":he,"lt-tolak-blok":()=>Ce("sukar"),"lt-tolak-sederhana-s1":Ne,"lt-tolak-sukar-k1":Pe,"ctt-tambah":ot,"ctt-tolak":st,"ctt-operasi":()=>Ee(!0),"ctt-ayat":()=>$e(!0),"tb-add-groups":ct,"tb-add-line":dt,"tb-add-complete":mt,"tb-sub-groups":xt,"tb-sub-line":ht},a=e.map((i,r)=>({...n[i](),qid:r}));return C(a)}const Pi=[{id:"kenali-tambah",name:"Kenali Tambah",color:"#3B82F6",types:["kt-gabung","kt-garis","kt-perkataan","kt-ayat"]},{id:"latihan-tambah",name:"Latihan Tambah",color:"#6366F1",types:["lt-mudah-m1","lt-warnai","lt-padankan","lt-bond","lt-abacus","lt-sederhana-s1","lt-sukar-k1"]},{id:"kenali-tolak",name:"Kenali Tolak",color:"#EF4444",types:["kt-buang","kt-garis-sub","kt-perkataan-tolak","kt-ayat-tolak"]},{id:"latihan-tolak",name:"Latihan Tolak",color:"#F97316",types:["lt-tolak-mudah-m1","lt-tolak-warnai","lt-tolak-padankan","lt-tolak-bond","lt-tolak-blok","lt-tolak-sederhana-s1","lt-tolak-sukar-k1"]},{id:"cerita",name:"Cerita Tambah & Tolak",color:"#F59E0B",types:["ctt-tambah","ctt-tolak","ctt-operasi","ctt-ayat"]},{id:"tambah-berulang",name:"Tambah Tolak Berulang",color:"#14B8A6",types:["tb-add-groups","tb-add-line","tb-add-complete","tb-sub-groups","tb-sub-line"]}];function Ii({data:e,language:n,theme:a,onExit:i}){const r=a||{},o=r.accent||"#3B82F6",s=r.dark||"#1E3A8A",l=r.cd||"#1D4ED8",[c,d]=w.useState("start"),[p,m]=w.useState(null),[x,h]=w.useState(0),[f,g]=w.useState(null),[b,v]=w.useState(null),[y,j]=w.useState(1800),[S,D]=w.useState(0),E=w.useRef(null);w.useEffect(()=>()=>{E.current&&clearInterval(E.current)},[]);const L=()=>{const B=Ni();m(B),g(new Array(B.length).fill(null)),v({}),h(0),j(1800),d("exam"),E.current=setInterval(()=>{j(T=>T<=1?(clearInterval(E.current),E.current=null,D(1800),d("results"),0):T-1)},1e3)},K=B=>{if(!p||f[x]!==null)return;const T=B===p[x].answer,P=[...f];P[x]=T,g(P);const W={...b,[x]:B};v(W),ee(T?"correct":"wrong"),T&&ae({particleCount:45,spread:60,startVelocity:32,origin:{y:.7},scalar:.85}),setTimeout(()=>{x+1>=p.length?(D(1800-y),E.current&&(clearInterval(E.current),E.current=null),d("results")):h(_=>_+1)},800)};if(c==="start")return t.jsx("div",{style:{display:"flex",flexDirection:"column",height:"100%",minHeight:0,width:"100%",background:"transparent"},children:t.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"clamp(24px, 4vmin, 48px) clamp(16px, 3vmin, 32px)",gap:"clamp(16px, 2.6vmin, 32px)"},children:[t.jsx("div",{style:{fontSize:"clamp(48px, 10vmin, 80px)",lineHeight:1},children:"🧠"}),t.jsxs("div",{style:{textAlign:"center"},children:[t.jsx("div",{style:{fontFamily:"'Baloo 2',sans-serif",fontWeight:900,fontSize:"clamp(28px, 5vmin, 44px)",color:"#1E293B",lineHeight:1.2},children:"Cabar Minda"}),t.jsx("div",{style:{fontFamily:"'Fredoka',sans-serif",fontWeight:600,fontSize:"clamp(14px, 2vmin, 18px)",color:"#64748B",marginTop:4},children:"Modul 2 — Tambah dan Tolak"})]}),t.jsx("div",{style:{display:"flex",gap:"clamp(8px, 1.6vmin, 16px)",flexWrap:"wrap",justifyContent:"center"},children:[{label:"31 Soalan",color:"#3B82F6"},{label:"30 Minit",color:"#F59E0B"},{label:"Lulus 80% (25/31)",color:"#16A34A"}].map(B=>t.jsx("div",{style:{padding:"6px 16px",borderRadius:999,background:"rgba(255,255,255,.88)",border:`1.5px solid ${B.color}44`,color:B.color,fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(13px, 1.8vmin, 17px)"},children:B.label},B.label))}),t.jsx("div",{style:{background:"rgba(255,255,255,.90)",border:"1.5px solid #BFDBFE",boxShadow:"0 12px 28px rgba(30,64,175,.10)",borderRadius:"clamp(14px, 2vmin, 20px)",padding:"clamp(14px, 2.4vmin, 24px)",maxWidth:420,width:"100%"},children:t.jsxs("div",{style:{fontFamily:"'Fredoka',sans-serif",fontWeight:700,fontSize:"clamp(13px, 1.6vmin, 16px)",color:"#475569",display:"flex",flexDirection:"column",gap:"clamp(8px, 1.2vmin, 12px)"},children:[t.jsx("div",{children:"📌 Jawab semua 31 soalan dalam 30 minit."}),t.jsx("div",{children:"⏱️ Masa berhenti apabila semua soalan dijawab atau masa tamat."}),t.jsx("div",{children:"🎯 Skor 25/31 atau lebih untuk lulus."})]})}),t.jsx("button",{type:"button",onClick:L,style:{padding:"clamp(14px, 2vmin, 20px) clamp(32px, 5vmin, 64px)",border:"none",borderRadius:999,background:`linear-gradient(180deg, ${o}, ${l})`,color:"#fff",cursor:"pointer",width:"100%",maxWidth:360,fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(18px, 2.8vmin, 26px)",boxShadow:`0 4px 0 ${s}, 0 14px 24px rgba(59,130,246,.24)`,WebkitTapHighlightColor:"transparent"},children:"Mula Peperiksaan →"})]})});if(c==="exam"&&p){const B=p[x],T=f[x]!==null,P=f[x]===!0,W=Math.floor(y/60),_=y%60,Q=`${String(W).padStart(2,"0")}:${String(_).padStart(2,"0")}`,X=y<=300,G=f.filter(Boolean).length,I=f.filter(F=>F===!1).length,R={answered:T,selected:b[x]||null,answer:B.answer,isCorrect:P,handlePick:K,handleNext:()=>{},streak:0,correct:G,wrong:I,theme:{accent:o,dark:s,cd:l,green:"#16A34A",red:"#DC2626"}};return t.jsxs("div",{style:{display:"flex",flexDirection:"column",height:"100%",minHeight:0,width:"100%",background:"transparent"},children:[t.jsx("style",{children:`
          .cm-exam-scroll { flex: 1; min-height: 0; overflow-y: auto; -webkit-overflow-scrolling: touch; }
          .cm-exam-body {
            min-height: 100%; box-sizing: border-box;
            display: flex; flex-direction: column; justify-content: center; align-items: center;
            padding: clamp(14px, 3vmin, 40px);
          }
          .cm-exam-content {
            width: 100%; max-width: min(94vw, 860px);
            display: flex; flex-direction: column; align-items: center;
            gap: clamp(8px, 1.6vmin, 18px);
          }
          .cm-exam-q {
            font-family: 'Baloo 2', sans-serif; font-weight: 800;
            font-size: clamp(22px, 4.6vmin, 44px); color: #1E293B; text-align: center; line-height: 1.15;
          }
          .cm-exam-feedback {
            font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(20px, 3vmin, 30px);
            text-align: center; min-height: clamp(28px, 3.8vmin, 44px);
            display: flex; align-items: center; justify-content: center;
          }
          .cm-exam-feedback.ok { color: #16A34A; }
          .cm-exam-feedback.no { color: #DC2626; }
        `}),t.jsxs("div",{style:{flexShrink:0,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"clamp(8px, 1.2vmin, 14px) clamp(14px, 2.4vmin, 24px)",background:"rgba(255,255,255,.86)",borderBottom:"1px solid rgba(147,197,253,.42)"},children:[t.jsxs("div",{style:{fontFamily:"'Fredoka',sans-serif",fontWeight:700,fontSize:"clamp(14px, 1.8vmin, 18px)",color:"#475569"},children:["Soalan ",x+1," / ",p.length]}),t.jsxs("div",{style:{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(18px, 2.4vmin, 24px)",color:X?"#DC2626":"#1E293B",transition:"color 0.3s ease"},children:["⏱ ",Q]})]}),t.jsx("div",{className:"cm-exam-scroll",children:t.jsx("div",{className:"cm-exam-body",children:t.jsxs("div",{className:"cm-exam-content",children:[B.prompt&&t.jsx("div",{className:"cm-exam-q",children:B.prompt}),on(B,R),t.jsx("div",{className:`cm-exam-feedback ${T?P?"ok":"no":""}`,children:T?P?"✅ Betul!":"❌ Salah":""})]})})})]})}if(c==="results"&&p){const B=f.filter(Boolean).length,T=f.filter(I=>I===!1).length,P=f.filter(I=>I===null).length,W=p.length,_=B>=25,Q=Math.floor(S/60),X=S%60,G=Pi.map(I=>{let R=0,F=0;return p.forEach((k,$)=>{I.types.includes(k.type)&&(F++,f[$]===!0&&R++)}),{...I,got:R,totalT:F,pct:F>0?R/F:0}});return t.jsxs("div",{style:{display:"flex",flexDirection:"column",height:"100%",minHeight:0,width:"100%",background:"transparent"},children:[t.jsx("style",{children:`
          .cm-results-scroll { flex: 1; min-height: 0; overflow-y: auto; -webkit-overflow-scrolling: touch; }
          .cm-results-body {
            min-height: 100%; box-sizing: border-box;
            display: flex; flex-direction: column; align-items: center;
            padding: clamp(20px, 3.6vmin, 48px) clamp(16px, 3vmin, 32px);
          }
          .cm-results-content {
            width: 100%; max-width: 480px;
            display: flex; flex-direction: column; align-items: center;
            gap: clamp(14px, 2.4vmin, 28px);
          }
          .cm-results-badge {
            width: clamp(100px, 18vmin, 140px); height: clamp(100px, 18vmin, 140px);
            border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center;
            font-family: 'Baloo 2', sans-serif; font-weight: 900;
            background: '#F8FAFC'; border: 3px solid;
          }
          .cm-results-stats { display: flex; gap: clamp(8px, 1.4vmin, 16px); flex-wrap: wrap; justify-content: center; }
          .cm-results-stat {
            padding: 5px 14px; border-radius: 999px;
            background: #F8FAFC; border: 1.5px solid #E2E8F0;
            font-family: 'Fredoka', sans-serif; font-weight: 700;
            font-size: clamp(12px, 1.5vmin, 15px);
          }
          .cm-results-table {
            width: 100%;
            background: #F8FAFC;
            border: 1.5px solid #E2E8F0; border-radius: 16px;
            padding: 4px 16px; box-sizing: border-box;
          }
          .cm-results-row {
            display: flex; align-items: center; gap: 10px;
            padding: clamp(8px, 1.2vmin, 12px) 0;
            border-bottom: 1px solid #E2E8F0;
          }
          .cm-results-row:last-child { border-bottom: none; }
          .cm-results-actions { display: flex; flex-direction: column; gap: clamp(10px, 1.6vmin, 16px); width: 100%; }
        `}),t.jsx("div",{className:"cm-results-scroll",children:t.jsx("div",{className:"cm-results-body",children:t.jsxs("div",{className:"cm-results-content",children:[t.jsxs("div",{className:"cm-results-badge",style:{borderColor:_?"#16A34A":"#DC2626",background:"#F8FAFC"},children:[t.jsxs("span",{style:{fontSize:"clamp(28px, 5vmin, 44px)",color:_?"#16A34A":"#DC2626"},children:[B,"/",W]}),t.jsx("span",{style:{fontFamily:"'Fredoka',sans-serif",fontWeight:700,fontSize:"clamp(11px, 1.6vmin, 15px)",color:_?"#16A34A":"#DC2626"},children:_?"LULUS ✓":"CUBA LAGI ✗"})]}),t.jsxs("div",{className:"cm-results-stats",children:[t.jsxs("span",{className:"cm-results-stat",style:{color:"#16A34A"},children:["✅ Betul: ",B]}),t.jsxs("span",{className:"cm-results-stat",style:{color:"#DC2626"},children:["❌ Salah: ",T]}),t.jsxs("span",{className:"cm-results-stat",style:{color:"#1E293B"},children:["⏱ ",Q,":",String(X).padStart(2,"0")]})]}),P>0&&t.jsxs("div",{style:{fontFamily:"'Fredoka',sans-serif",fontWeight:600,fontSize:"clamp(12px, 1.5vmin, 15px)",color:"#F59E0B"},children:["⏰ ",P," soalan tidak dijawab"]}),t.jsx("div",{className:"cm-results-table",children:G.map(I=>{const R=I.pct;let F="#DC2626";return R>=1?F="#16A34A":R>0&&(F="#64748B"),t.jsxs("div",{className:"cm-results-row",children:[t.jsx("div",{style:{width:3,height:28,borderRadius:2,background:I.color,flexShrink:0}}),t.jsxs("div",{style:{flex:1,minWidth:0},children:[t.jsx("div",{style:{fontFamily:"'Fredoka',sans-serif",fontWeight:600,fontSize:"clamp(12px, 1.5vmin, 15px)",color:"#334155",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:I.name}),t.jsx("div",{style:{width:"100%",height:6,background:"#E2E8F0",borderRadius:3,marginTop:4,overflow:"hidden"},children:t.jsx("div",{style:{width:`${R*100}%`,height:"100%",background:I.color,borderRadius:3,transition:"width 0.5s ease"}})})]}),t.jsxs("div",{style:{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(13px, 1.6vmin, 17px)",color:F,flexShrink:0},children:[I.got,"/",I.totalT]})]},I.id)})}),t.jsxs("div",{className:"cm-results-actions",children:[t.jsx("button",{type:"button",onClick:()=>{E.current&&(clearInterval(E.current),E.current=null),d("start")},style:{padding:"clamp(12px, 1.8vmin, 18px) clamp(24px, 4vmin, 48px)",border:"none",borderRadius:999,background:`linear-gradient(180deg, ${o}, ${l})`,color:"#fff",cursor:"pointer",width:"100%",fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(16px, 2.6vmin, 24px)",boxShadow:`0 4px 0 ${s}, 0 14px 24px rgba(59,130,246,.22)`,WebkitTapHighlightColor:"transparent"},children:"↻ Cuba Semula"}),t.jsx("button",{type:"button",onClick:i,style:{padding:"clamp(12px, 1.8vmin, 18px) clamp(24px, 4vmin, 48px)",border:"1.5px solid #CBD5E1",borderRadius:999,background:"#F8FAFC",color:"#475569",cursor:"pointer",width:"100%",fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(16px, 2.6vmin, 24px)",WebkitTapHighlightColor:"transparent"},children:"← Kembali"})]})]})})})]})}return null}function Mi(){const e=w.useCallback((a,i="ms-MY")=>{a&&ft.speak(a,i,{rate:.88})},[]),n=w.useCallback(()=>{ft.stopSpeaking()},[]);return{speak:e,stop:n}}function Gi({config:e,language:n,theme:a,onExit:i}){const{speak:r,stop:o}=Mi();if(!e)return t.jsxs("div",{style:{textAlign:"center",padding:"40px 20px",fontFamily:"'Fredoka', sans-serif",color:"#5B6B7B"},children:[t.jsx("p",{style:{fontSize:"18px",fontWeight:600,margin:"0 0 8px"},children:n==="bm"?"Kandungan pembelajaran akan datang":"Learning content coming soon"}),t.jsx("p",{style:{fontSize:"14px",margin:0},children:n==="bm"?"Sila tunggu kemas kini akan datang.":"Please wait for future updates."})]});const{primitive:s,data:l,scoreId:c,scoreStorageKey:d="mt_ld_m1_scores"}=e,p=c?{...l,scoreId:c,scoreStorageKey:d}:l;switch(s){case"compare":return t.jsx(yn,{data:p,language:n,theme:a,onExit:i,onSpeak:r,onStop:o});case"kenali-nombor":return t.jsx(Dn,{data:p,language:n,theme:a,onExit:i});case"kombinasi":return t.jsx(Ln,{data:p,language:n,theme:a,onExit:i});case"kenali-21-100":return t.jsx(qn,{data:p,language:n,theme:a,onExit:i});case"nilai-tempat":return t.jsx(ra,{data:p,language:n,theme:a,onExit:i});case"susunan-nombor":return t.jsx(ua,{data:p,language:n,theme:a,onExit:i});case"pola-nombor":return t.jsx(wa,{data:p,language:n,theme:a,onExit:i});case"anggar-bundar":return t.jsx($a,{data:p,language:n,theme:a,onExit:i});case"selesaikan":return t.jsx(Ia,{data:p,language:n,theme:a,onExit:i});case"latih-diri":return t.jsx(Oa,{data:p,language:n,theme:a,onExit:i});case"cabar-minda":return t.jsx(Ua,{data:p,language:n,theme:a,onExit:i});case"kenali-tambah":return t.jsx(ei,{data:p,language:n,theme:a,onExit:i});case"latihan-tambah":return t.jsx(pi,{data:p,language:n,theme:a,onExit:i});case"kenali-tolak":return t.jsx(ai,{data:p,language:n,theme:a,onExit:i});case"latihan-tolak":return t.jsx(mi,{data:p,language:n,theme:a,onExit:i});case"cerita-tambah-tolak":return t.jsx(yi,{data:p,language:n,theme:a,onExit:i});case"tambah-berulang":return t.jsx(Si,{data:p,language:n,theme:a,onExit:i});case"selesaikan-m2":return t.jsx(Ai,{data:p,language:n,theme:a,onExit:i});case"latih-diri-m2":return t.jsx(Wi,{data:p,language:n,theme:a,onExit:i});case"cabar-minda-m2":return t.jsx(Ii,{data:p,language:n,theme:a,onExit:i});default:return t.jsx("div",{style:{textAlign:"center",padding:"40px 20px",fontFamily:"'Fredoka', sans-serif",color:"#5B6B7B"},children:t.jsx("p",{style:{fontSize:"18px",fontWeight:600,margin:0},children:n==="bm"?"Sedia untuk belajar":"Ready to learn"})})}}export{Oi as M,Gi as a};
