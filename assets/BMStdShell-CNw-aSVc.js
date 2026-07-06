import{j as l}from"./index-YCInXYg5.js";import{B as b}from"./BMHeader-B5cOc9J_.js";import{u as g}from"./useGamification-g-vGaz2S.js";function w({onBack:r,language:m="bm",title:d,current:e=0,total:a=0,score:i=null,accentColor:s="#159E96",children:h,footer:p,hideProgress:t=!1,subject:n="bm"}){const{hearts:x,gems:o}=g(n);return l.jsxs(l.Fragment,{children:[l.jsx("style",{children:`
        .bm-shell-root {
          --sp-1: clamp(4px, 0.8vh, 8px);
          --sp-2: clamp(8px, 1.6vh, 14px);
          --sp-3: clamp(12px, 2.4vh, 22px);
          height: 100dvh; overflow: hidden;
          background:
            radial-gradient(ellipse 75% 55% at 14% 0%, ${s}21 0%, transparent 58%),
            radial-gradient(ellipse 65% 48% at 90% 100%, ${s}1a 0%, transparent 62%),
            linear-gradient(180deg, #FDFEFF 0%, #F3F6FB 100%);
          font-family: 'Fredoka', system-ui, sans-serif;
          display: flex; flex-direction: column;
        }
        .bm-shell-body {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column; align-items: center;
          width: 100%; max-width: 620px;
          margin: 0 auto;
          padding: var(--sp-2) clamp(14px, 3.5vw, 28px) var(--sp-2);
        }
        .bm-shell-stats {
          flex-shrink: 0; width: 100%;
          display: flex; align-items: center; justify-content: space-between;
          gap: 8px;
          margin-bottom: var(--sp-2);
        }
        .bm-shell-pill {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(11px, 2vh, 13px);
          border-radius: 999px;
          padding: clamp(3px, 0.7vh, 5px) clamp(10px, 2.4vw, 14px);
          white-space: nowrap;
        }
        .bm-shell-pill.prog { background: #fff; color: ${s}; border: 1.5px solid ${s}44; box-shadow: 0 2px 6px -2px ${s}33; }
        .bm-shell-pill.star { background: #FFF6D6; color: #B58800; border: 1.5px solid #FFE08A; }
        .bm-shell-pill.life { background: #FFE9EC; color: #E11D48; border: 1.5px solid #FCA5B4; }
        .bm-shell-pill.gem  { background: #E0F2FE; color: #0369A1; border: 1.5px solid #7DD3FC; }
        .bm-shell-pill-group { display: flex; align-items: center; gap: 6px; }
        @media (max-width: 380px) { .bm-shell-stats { gap: 4px; } .bm-shell-pill { padding: 3px 8px; } }
        .bm-shell-bar-wrap {
          flex-shrink: 0; width: 100%;
          background: ${s}22; border-radius: 999px;
          height: clamp(6px, 1.2vh, 9px); overflow: hidden;
          margin-bottom: var(--sp-3);
        }
        .bm-shell-bar-fill {
          background: linear-gradient(90deg, ${s}, ${s}99);
          height: 100%; border-radius: 999px;
          transition: width 0.3s;
        }
        .bm-shell-stage {
          flex: 1; min-height: 0; width: 100%;
          display: flex; flex-direction: column; align-items: center;
          justify-content: center;
          gap: var(--sp-2);
        }
        .bm-shell-footer {
          flex-shrink: 0;
          display: flex; gap: clamp(8px, 2vw, 12px);
          width: 100%; max-width: 620px;
          margin: 0 auto;
          padding: var(--sp-1) clamp(14px, 3.5vw, 28px) clamp(12px, 2.4vh, 20px);
        }

        /* ── Desktop / laptop scale-up (height-aware so it always fits) ── */
        @media (min-width: 900px) {
          .bm-shell-body, .bm-shell-footer { max-width: 820px; }
          .bm-shell-pill { font-size: min(14px, 2.2vh); padding: min(5px, 0.8vh) 18px; }
          .bm-shell-bar-wrap { height: min(10px, 1.4vh); }
          .bm-shell-stage { gap: min(14px, 1.8vh); }
        }
      `}),l.jsxs("div",{className:"bm-shell-root",children:[l.jsx(b,{onBack:r,language:m,title:d}),l.jsxs("div",{className:"bm-shell-body",children:[!t&&l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"bm-shell-stats",children:[l.jsxs("span",{className:"bm-shell-pill prog",children:[e+1," / ",a]}),l.jsxs("span",{className:"bm-shell-pill-group",children:[l.jsxs("span",{className:"bm-shell-pill life",children:["❤️ ",x]}),l.jsxs("span",{className:"bm-shell-pill gem",children:["💎 ",o]}),i!==null&&l.jsxs("span",{className:"bm-shell-pill star",children:["⭐ ",i]})]})]}),l.jsx("div",{className:"bm-shell-bar-wrap",children:l.jsx("div",{className:"bm-shell-bar-fill",style:{width:`${e/a*100}%`}})})]}),l.jsx("div",{className:"bm-shell-stage",children:h})]}),p&&l.jsx("div",{className:"bm-shell-footer",children:p})]})]})}export{w as B};
