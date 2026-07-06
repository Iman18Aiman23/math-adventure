import{j as a}from"./index-YCInXYg5.js";import{T as n}from"./Tahun1ModuleHubLayout-DSCqxpm8.js";import{M as d}from"./MatematikTopicRobot-Bc4eq2Cu.js";import"./arabic-W4X4pPK0.js";import"./chevron-right--_L4we7T.js";import"./house-TmCyjw7R.js";import"./layers-YcZE_Onq.js";const o={pageGradient:"transparent",dark:"#6D28D9",cd:"#6D28D9",accent:"#8B5CF6",stageGradient:"transparent",pillGradient:"linear-gradient(180deg,#8B5CF6,#6D28D9)"},l=a.jsx(d,{theme:o});function m({language:r,theme:t}){const e=r==="bm",s=[{id:"selesaikan",icon:"🧩",title:e?"Cerita Masa":"Time Stories",desc:e?"Guna masa dalam cerita":"Use time in stories"},{id:"latih-diri",icon:"⚡",title:e?"Latihan Jam":"Clock Practice",desc:e?"Baca waktu ikut tahap":"Read time by level"},{id:"cabar-minda",icon:"🧠",title:e?"Cabaran Masa":"Time Challenge",desc:e?"Soalan masa lebih sukar":"Harder time questions"}];return a.jsxs("div",{className:"mt-footer-trio",children:[a.jsx("style",{children:`
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
          border: 2px solid ${t.accent}44;
          box-shadow: 0 6px 20px -10px ${t.dark}30;
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
          color: ${t.dark};
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
      `}),s.map(i=>a.jsxs("div",{className:"mt-footer-trio-card",children:[a.jsx("span",{className:"mt-footer-trio-icon",children:i.icon}),a.jsx("div",{className:"mt-footer-trio-title",children:i.title}),a.jsx("div",{className:"mt-footer-trio-desc",children:i.desc})]},i.id))]})}const c=[{id:"placeholder-1",pill:"SEGERA HADIR",title:"Baca Masa",desc:"Akan datang: baca jam, hari dan urutan waktu harian.",visual:l,disabled:!0}];function k({onSelectTopic:r,language:t="bm"}){return a.jsx(n,{moduleNum:5,moduleName:"Masa dan Waktu",moduleNameEn:"Time",theme:o,headerVariant:"banner",bareStage:!0,topics:c,onSelectTopic:r,language:t,footer:a.jsx(m,{language:t,theme:o})})}export{k as default};
