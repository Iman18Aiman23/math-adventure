import{j as t}from"./index-YCInXYg5.js";import{T as s}from"./Tahun1ModuleHubLayout-DSCqxpm8.js";import{M as d}from"./MatematikTopicRobot-Bc4eq2Cu.js";import"./arabic-W4X4pPK0.js";import"./chevron-right--_L4we7T.js";import"./house-TmCyjw7R.js";import"./layers-YcZE_Onq.js";const r={pageGradient:"transparent",dark:"#6D28D9",cd:"#6D28D9",accent:"#8B5CF6",stageGradient:"transparent",pillGradient:"linear-gradient(180deg,#8B5CF6,#6D28D9)"},l=t.jsx(d,{theme:r});function c({language:i,theme:a}){const e=i==="bm",n=[{id:"selesaikan",icon:"🧩",title:e?"Cerita Wang":"Money Stories",desc:e?"Kira harga dan baki":"Count prices and change"},{id:"latih-diri",icon:"⚡",title:e?"Latihan Wang":"Money Practice",desc:e?"Kenal duit dan jumlah":"Learn notes and totals"},{id:"cabar-minda",icon:"🧠",title:e?"Cabaran Wang":"Money Challenge",desc:e?"Soalan wang lebih sukar":"Harder money questions"}];return t.jsxs("div",{className:"mt-footer-trio",children:[t.jsx("style",{children:`
        .mt-footer-trio {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          max-width: 720px;
          margin: 0 auto;
        }
        .mt-footer-trio-card {
          background: #fff;
          border-radius: 20px;
          padding: 18px 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          border: 2px solid ${a.accent}44;
          box-shadow: 0 6px 20px -10px ${a.dark}30;
          opacity: 0.7;
          filter: grayscale(0.4);
          cursor: default;
          pointer-events: none;
          text-align: center;
        }
        .mt-footer-trio-icon { font-size: 28px; }
        .mt-footer-trio-title {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: 16px;
          color: ${a.dark};
          margin: 0;
        }
        .mt-footer-trio-desc {
          font-family: 'Fredoka', sans-serif;
          font-weight: 500;
          font-size: 11px;
          color: #5B6B7B;
          margin: 0;
        }
        @media (max-width: 560px) {
          .mt-footer-trio { grid-template-columns: 1fr; max-width: 300px; }
        }
      `}),n.map(o=>t.jsxs("div",{className:"mt-footer-trio-card",children:[t.jsx("span",{className:"mt-footer-trio-icon",children:o.icon}),t.jsx("div",{className:"mt-footer-trio-title",children:o.title}),t.jsx("div",{className:"mt-footer-trio-desc",children:o.desc})]},o.id))]})}const m=[{id:"placeholder-1",pill:"SEGERA HADIR",title:"Duit Malaysia",desc:"Akan datang: kenal syiling, wang kertas dan jumlah harga.",visual:l,disabled:!0}];function y({onSelectTopic:i,language:a="bm"}){return t.jsx(s,{moduleNum:4,moduleName:"Wang",moduleNameEn:"Money",theme:r,headerVariant:"banner",bareStage:!0,topics:m,onSelectTopic:i,language:a,footer:t.jsx(c,{language:a,theme:r})})}export{y as default};
