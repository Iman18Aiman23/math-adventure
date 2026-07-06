import{b as p,j as t,e as w,r as k}from"./index-YCInXYg5.js";import{S as M}from"./StatsBar-Dt4MeuCr.js";import"./useGamification-g-vGaz2S.js";const F=[{id:"nombor-hingga-100",num:1,labelBM:"Nombor Hingga 100",labelEN:"Numbers to 100",c:"#8B5CF6",cd:"#6D28D9",pg:"transparent"},{id:"tambah-dan-tolak",num:2,labelBM:"Tambah dan Tolak",labelEN:"Addition & Subtraction",c:"#8B5CF6",cd:"#6D28D9",pg:"transparent"},{id:"pecahan",num:3,labelBM:"Pecahan",labelEN:"Fractions",c:"#8B5CF6",cd:"#6D28D9",pg:"transparent"},{id:"wang",num:4,labelBM:"Wang",labelEN:"Money",c:"#8B5CF6",cd:"#6D28D9",pg:"transparent"},{id:"masa-dan-waktu",num:5,labelBM:"Masa dan Waktu",labelEN:"Time",c:"#8B5CF6",cd:"#6D28D9",pg:"transparent"}],y=[{id:"nombor",num:1,labelBM:"Nombor & Operasi",labelEN:"Numbers & Operations",c:"#FF8F3D",cd:"#FF6F00",pg:"linear-gradient(180deg,#FFF4E6 0%,#FACD94 50%,#E8821A 100%)"},{id:"sukatan",num:2,labelBM:"Sukatan & Geometri",labelEN:"Measurement & Geometry",c:"#36A9F0",cd:"#1A78C7",pg:"linear-gradient(180deg,#E6F1FB 0%,#9FC9F2 50%,#1E7AC9 100%)"},{id:"statistik",num:3,labelBM:"Statistik",labelEN:"Statistics",c:"#A368F0",cd:"#7038D6",pg:"linear-gradient(180deg,#F0EBFB 0%,#C3ABF0 50%,#7A4FD0 100%)"}],E={2:{c:"#36A9F0",cd:"#1A78C7"},3:{c:"#A368F0",cd:"#7038D6"}};function N(a,i){const d=(r=>(r||"").replace(/^\d-/,""))(a),o=E[i];if(o)return{...o,pageGradient:"transparent"};const n=[...F,...y].find(r=>r.id===d);return{c:n?.c||"#3B82F6",cd:n?.cd||"#1D4ED8",pageGradient:n?.pg||"transparent"}}function z({year:a,activeModule:i,onModuleChange:u,onBack:d,language:o="bm"}){const n=a===1?F:y,c=(e=>e.replace(/^\d-/,""))(i),l=n.find(e=>e.id===c),j=l?o==="bm"?l.labelBM:l.labelEN:"",f=E[a],A=f?.c||l?.c||"#3B82F6",B=f?.cd||l?.cd||"#1D4ED8",D=n.length,[x,h]=p.useState(!1),g=p.useRef(null),v=p.useId();return p.useEffect(()=>{const e=b=>{g.current?.contains(b.target)||h(!1)},m=b=>{b.key==="Escape"&&h(!1)};return document.addEventListener("pointerdown",e),document.addEventListener("keydown",m),()=>{document.removeEventListener("pointerdown",e),document.removeEventListener("keydown",m)}},[]),t.jsxs("header",{className:"mt-module-header",style:{"--accent":A,"--accent-d":B},children:[t.jsx("style",{children:`
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
        .mt-top-stats {
          grid-column: 3;
          min-width: 0;
          width: max-content;
          max-width: 100%;
          margin-left: auto;
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
          min-width: 86px;
        }
        .mt-top-stats .sb-popover {
          right: 0;
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
      `}),t.jsxs("div",{className:"mt-top-bar",children:[t.jsx("button",{type:"button",className:"mt-top-back",onClick:d,"aria-label":o==="bm"?"Kembali ke pilih tahun":"Back to year selection",children:t.jsx("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:t.jsx("path",{d:"M19 12H5M12 19l-7-7 7-7"})})}),t.jsx("div",{className:"mt-top-module",children:t.jsxs("div",{className:"mt-mnav-select-wrap",ref:g,children:[t.jsx("label",{className:"mt-mnav-select-label",htmlFor:"mt-module-select",children:o==="bm"?"Pilih Modul":"Choose Module"}),t.jsxs("div",{className:`mt-mnav-select-shell${x?" open":""}`,children:[t.jsx("span",{className:"mt-mnav-current-num","aria-hidden":"true",children:o==="bm"?"Modul":"Module"}),t.jsxs("button",{type:"button",id:"mt-module-select",className:"mt-mnav-select","aria-haspopup":"listbox","aria-expanded":x,"aria-controls":v,onClick:()=>{w(),h(e=>!e)},"aria-label":o==="bm"?"Pilih modul Matematik":"Choose math module",children:[t.jsx("span",{className:"mt-mnav-select-text",children:j||(o==="bm"?"Pilih modul":"Choose module")}),t.jsx("svg",{className:"mt-mnav-select-arrow",width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.4",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:t.jsx("path",{d:"m6 9 6 6 6-6"})})]})]}),x&&t.jsx("div",{id:v,className:"mt-mnav-menu",role:"listbox","aria-label":o==="bm"?"Senarai modul Matematik":"Math module list",children:n.map(e=>{const m=c===e.id,b=o==="bm"?e.labelBM:e.labelEN;return t.jsxs("button",{type:"button",role:"option","aria-selected":m,className:`mt-mnav-menu-option${m?" active":""}`,onClick:()=>{h(!1),m||(w(),u?.(a===1?e.id:`${a}-${e.id}`))},children:[t.jsx("span",{children:b}),m&&t.jsx("svg",{className:"mt-mnav-menu-check",width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.8",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:t.jsx("path",{d:"M20 6 9 17l-5-5"})})]},e.id)})})]})}),t.jsx("div",{className:"mt-top-stats",children:t.jsx(M,{subject:"mt",variant:"mb"})})]})]})}function L({year:a,activeModule:i,onModuleChange:u,onBack:d,onSelectTopic:o,children:s,language:n}){const r=k.useRef(null),c=N(i,a);return k.useEffect(()=>{r.current&&(r.current.scrollTop=0)},[i]),t.jsxs("div",{className:`mt-module-page mt-module-page--mission mt-module-page--y${a}`,style:{"--mt-accent":c.c,"--mt-accent-d":c.cd},children:[t.jsx(z,{year:a,activeModule:i,onModuleChange:u,onBack:d,language:n}),t.jsx("main",{className:"mt-module-content",ref:r,children:p.isValidElement(s)?p.cloneElement(s,{language:n,onSelectTopic:o}):s}),t.jsx("style",{children:`
        .mt-module-page {
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 0;
          background: #FFFFFF;
          color: #1F2937;
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }
        .mt-module-page::before,
        .mt-module-page::after {
          display: none;
        }
        .mt-module-content {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          position: relative;
          z-index: 2;
          scroll-behavior: smooth;
        }

        .mt-module-content .pi-mhub-page {
          margin: 0 !important;
          padding: clamp(14px, 2.2vw, 24px) clamp(14px, 3vw, 26px) 56px !important;
          min-height: auto !important;
          width: 100% !important;
          max-width: 100% !important;
          background: transparent !important;
          color: #1F2937 !important;
        }
        .mt-module-content .pi-mhub-page.has-dashboard {
          padding: 32px !important;
          background: transparent !important;
        }
        .mt-module-content .pi-mhub-page.has-dashboard h1,
        .mt-module-content .pi-mhub-page.has-dashboard .pi-mhub-lesson-title,
        .mt-module-content .pi-mhub-page.has-dashboard .pi-mhub-lesson-name {
          font-family: 'Poppins', 'Fredoka', system-ui, sans-serif !important;
        }
        .mt-module-content .pi-mhub-page h1,
        .mt-module-content .pi-mhub-card-title,
        .mt-module-content .pi-mhub-pill {
          font-family: 'Fredoka', system-ui, sans-serif !important;
        }
        .mt-module-content .pi-mhub-subtitle,
        .mt-module-content .pi-mhub-card-desc {
          font-family: 'Fredoka', system-ui, sans-serif !important;
        }
        .mt-module-content .pi-mhub-page h1 {
          color: #1F2937 !important;
          text-shadow: none;
          text-wrap: balance;
        }
        .mt-module-content .pi-mhub-subtitle {
          color: #707070 !important;
          opacity: 1 !important;
        }
        .mt-module-content .pi-mhub-grid {
          width: min(1180px, 100%);
          max-width: 1180px !important;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 230px), 1fr)) !important;
          gap: clamp(14px, 1.8vw, 24px) !important;
          align-items: stretch;
        }

        .mt-module-content .pi-mhub-banner {
          width: min(780px, 100%);
          max-width: 780px !important;
          margin: 0 auto clamp(18px, 2.8vw, 30px) !important;
          padding: clamp(13px, 1.8vw, 18px) clamp(16px, 3vw, 24px) !important;
          border: 3px solid #E6E6E6 !important;
          border-radius: 24px !important;
          background: #ffffff !important;
          box-shadow: none !important;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          overflow: hidden;
          position: relative;
        }
        .mt-module-content .pi-mhub-banner::after {
          content: "";
          position: absolute;
          left: 18px;
          right: 18px;
          bottom: 10px;
          height: 1px;
          background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--mt-accent) 42%, white), transparent);
          opacity: .45;
        }
        .mt-module-content .pi-mhub-banner-kicker {
          color: #9AA0AB !important;
          text-shadow: none !important;
          letter-spacing: .13em !important;
        }
        .mt-module-content .pi-mhub-banner-name {
          color: #1F2937 !important;
          font-family: 'Baloo 2', 'Fredoka', system-ui, sans-serif !important;
          font-weight: 800 !important;
          font-size: clamp(20px, 2.7vw, 28px) !important;
          letter-spacing: 0 !important;
          text-shadow: none !important;
        }
        .mt-module-content .pi-mhub-banner-badge {
          width: clamp(44px, 6vw, 58px) !important;
          height: clamp(44px, 6vw, 58px) !important;
          border-radius: 18px !important;
          background: linear-gradient(180deg, var(--mt-accent), var(--mt-accent-d)) !important;
           box-shadow: none !important;
          font-size: clamp(20px, 4vw, 28px) !important;
        }

        .mt-module-content .pi-mhub-page.has-dashboard .pi-mhub-hero,
        .mt-module-content .pi-mhub-page.has-dashboard .pi-mhub-lesson-head {
          border: 1px solid color-mix(in srgb, var(--topic-accent, var(--mt-accent)) 30%, #DCE6F2) !important;
          background:
            linear-gradient(180deg, rgba(255,255,255,.96), rgba(255,255,255,.88)),
            radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--topic-accent, var(--mt-accent)) 17%, transparent), transparent 68%) !important;
          box-shadow: none !important;
        }
        .mt-module-content .pi-mhub-page.has-dashboard .pi-mhub-lesson-title {
          color: #FFFFFF !important;
          background:
            linear-gradient(180deg, rgba(255,255,255,.18), transparent 42%),
            linear-gradient(180deg, color-mix(in srgb, var(--topic-accent, var(--mt-accent)) 82%, white), var(--topic-accent, var(--mt-accent))) !important;
          box-shadow: none !important;
        }
        .mt-module-content .pi-mhub-page.has-dashboard .pi-mhub-unit-badge {
          background: linear-gradient(180deg, color-mix(in srgb, var(--mt-accent) 78%, white), var(--mt-accent-d)) !important;
          box-shadow: none !important;
        }
        .mt-module-content .pi-mhub-page.has-dashboard .pi-mhub-lesson-robot svg {
          filter: none !important;
        }
        .mt-module-content .pi-mhub-page.has-dashboard .pi-mhub-lesson-button {
          border: 1px solid color-mix(in srgb, var(--topic-accent, var(--mt-accent)) 34%, #DDE7F2) !important;
          border-left: 7px solid var(--topic-accent, var(--mt-accent)) !important;
          background:
            linear-gradient(90deg, color-mix(in srgb, var(--topic-accent, var(--mt-accent)) 10%, #FFFFFF), #FFFFFF 46%) !important;
          box-shadow: none !important;
        }
        .mt-module-content .pi-mhub-page.has-dashboard .pi-mhub-lesson-button:hover {
          border-color: color-mix(in srgb, var(--topic-accent, var(--mt-accent)) 58%, #DDE7F2) !important;
          box-shadow: none !important;
        }
        .mt-module-content .pi-mhub-page.has-dashboard .pi-mhub-lesson-icon,
        .mt-module-content .pi-mhub-page.has-dashboard .pi-mhub-row-chevron,
        .mt-module-content .pi-mhub-page.has-dashboard .pi-mhub-expand {
          background: color-mix(in srgb, var(--topic-accent, var(--mt-accent)) 13%, #FFFFFF) !important;
          color: color-mix(in srgb, var(--topic-accent, var(--mt-accent)) 86%, #0F172A) !important;
        }
        .mt-module-content .pi-mhub-page.has-dashboard .pi-mhub-status--unplayed {
          background: color-mix(in srgb, var(--topic-accent, var(--mt-accent)) 8%, #FFFFFF) !important;
          border-color: color-mix(in srgb, var(--topic-accent, var(--mt-accent)) 24%, #DDE7F2) !important;
        }

        .mt-module-content .pi-mhub-card,
        .mt-module-content .pi-mhub-card--v2 {
          min-height: 100%;
          background: #ffffff !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          border: 3px solid #E6E6E6 !important;
          border-radius: 24px !important;
          box-shadow: none !important;
          position: relative;
          overflow: hidden;
          color: #1F2937 !important;
          transform-origin: center;
          transition:
            transform .28s cubic-bezier(.34,1.56,.64,1),
            border-color .22s ease,
            background .22s ease !important;
          padding: clamp(20px, 2.4vw, 26px) clamp(16px, 2vw, 22px) clamp(22px, 2.6vw, 28px) !important;
          gap: clamp(12px, 1.6vw, 17px) !important;
        }
        .mt-module-content .pi-mhub-card::before,
        .mt-module-content .pi-mhub-card--v2::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--mt-accent) 11%, transparent), transparent 72%);
          opacity: .65;
        }
        .mt-module-content .pi-mhub-card::after,
        .mt-module-content .pi-mhub-card--v2::after {
          content: "";
          position: absolute;
          left: 18px;
          right: 18px;
          bottom: 13px;
          height: 1px;
          pointer-events: none;
          background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--mt-accent) 42%, white), transparent);
          opacity: .45;
        }
        .mt-module-content .pi-mhub-card:hover,
        .mt-module-content .pi-mhub-card--v2:hover {
          background: #ffffff !important;
          border-color: var(--mt-accent) !important;
          box-shadow: none !important;
          transform: translateY(-4px) !important;
        }
        .mt-module-content .pi-mhub-card > *,
        .mt-module-content .pi-mhub-card--v2 > * {
          position: relative;
          z-index: 1;
        }
        .mt-module-content .pi-mhub-card:focus-visible,
        .mt-module-content .pi-mhub-card--v2:focus-visible {
          outline: 3px solid var(--mt-accent) !important;
          outline-offset: 4px !important;
        }
        .mt-module-content .pi-mhub-stage:not(.pi-mhub-stage--bare) {
          background:
            radial-gradient(circle at 50% 30%, color-mix(in srgb, var(--mt-accent) 22%, #ffffff), #F7F8FA) !important;
          box-shadow: none !important;
        }
        .mt-module-content .pi-mhub-stage--bare {
          width: min(132px, 46vw) !important;
          height: min(132px, 46vw) !important;
          margin-bottom: 2px !important;
        }
        .mt-module-content .pi-mhub-stage svg {
          filter: none;
        }
        .mt-module-content .pi-mhub-eyebrow {
          display: none !important;
        }
        .mt-module-content .pi-mhub-pill {
          width: min(100%, 224px) !important;
          min-height: 46px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          position: relative;
          overflow: hidden;
          background:
            linear-gradient(180deg, rgba(255,255,255,.18), transparent 42%),
            linear-gradient(180deg, color-mix(in srgb, var(--topic-accent, var(--mt-accent)) 82%, white), var(--topic-accent, var(--mt-accent))) !important;
          color: #ffffff !important;
          border: 1px solid rgba(255,255,255,.34);
          box-shadow: none !important;
          border-radius: 15px !important;
          max-width: 100% !important;
          text-wrap: balance;
          line-height: 1.15 !important;
          padding: 9px 16px !important;
          font-size: clamp(15px, 1.7vw, 17px) !important;
          transition: transform .18s ease;
        }
        .mt-module-content .pi-mhub-pill::after {
          content: "";
          position: absolute;
          inset: 1px 1px auto;
          height: 38%;
          border-radius: 14px 14px 9px 9px;
          background: linear-gradient(180deg, rgba(255,255,255,.22), transparent);
          pointer-events: none;
        }
        .mt-module-content .pi-mhub-card:hover .pi-mhub-pill,
        .mt-module-content .pi-mhub-card--v2:hover .pi-mhub-pill {
          filter: saturate(1.06);
          transform: translateY(-2px);
          box-shadow: none !important;
        }
        .mt-module-content .pi-mhub-card-title {
          color: #fff !important;
          text-wrap: balance;
        }
        .mt-module-content .pi-mhub-card-desc {
          color: #707070 !important;
          opacity: 1 !important;
          max-width: 30ch !important;
          line-height: 1.5 !important;
          margin-top: -2px !important;
          min-height: 42px !important;
        }
        .mt-module-content .pi-mhub-cta {
          margin-top: 2px !important;
          min-height: 36px !important;
          min-width: 82px !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          background:
            linear-gradient(180deg, rgba(255,255,255,.18), transparent 46%),
            linear-gradient(180deg, var(--mt-accent), var(--mt-accent-d)) !important;
          color: #fff !important;
          border: 1px solid rgba(255,255,255,.28);
          border-radius: 999px !important;
          box-shadow: none !important;
          padding: 7px 18px !important;
          transition: transform .16s ease;
        }
        .mt-module-content .pi-mhub-card:hover .pi-mhub-cta,
        .mt-module-content .pi-mhub-card--v2:hover .pi-mhub-cta {
          filter: saturate(1.06);
          transform: translateY(-2px);
        }
        .mt-module-content .pi-mhub-card-disabled {
          opacity: .54 !important;
          filter: saturate(.65) grayscale(.34) !important;
          border-style: dashed !important;
          cursor: default !important;
        }
        .mt-module-content .pi-mhub-card-disabled:hover {
          transform: none !important;
          box-shadow: none !important;
        }

        .mt-module-content .mt-footer-trio {
          width: min(860px, 100%);
          gap: clamp(12px, 2vw, 18px) !important;
          margin-top: 26px !important;
        }
        .mt-module-content .mt-footer-trio-card {
          background: #ffffff !important;
          border: 3px solid #E6E6E6 !important;
          box-shadow: none !important;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
        }
        .mt-module-content .mt-footer-trio-card.active,
        .mt-module-content .mt-footer-trio-card.is-enabled {
          background: #ffffff !important;
          border-color: var(--mt-accent) !important;
        }
        .mt-module-content .mt-footer-trio-title { color: #1F2937 !important; }
        .mt-module-content .mt-footer-trio-desc { color: #707070 !important; }

        @media (min-width: 1180px) {
          .mt-module-content .pi-mhub-page {
            padding-top: 22px !important;
          }
          .mt-module-content .pi-mhub-page.has-dashboard .pi-mhub-lesson-head {
            grid-template-rows: 116px auto 1fr !important;
            gap: 4px !important;
            padding-top: 14px !important;
          }
          .mt-module-content .pi-mhub-page.has-dashboard .pi-mhub-lesson-robot {
            height: 116px !important;
          }
          .mt-module-content .pi-mhub-page.has-dashboard .pi-mhub-lesson-robot svg {
            width: 148px !important;
            height: 148px !important;
          }
          .mt-module-content .pi-mhub-page.has-dashboard .pi-mhub-lesson-title {
            margin-top: -4px !important;
          }
        }
        @media (max-width: 720px) {
          .mt-module-content .pi-mhub-page.has-dashboard {
            padding: 20px 16px calc(18px + env(safe-area-inset-bottom)) !important;
          }
          .mt-module-content .pi-mhub-page.has-dashboard .pi-mhub-lesson-card {
            border: 1px solid color-mix(in srgb, var(--topic-accent, var(--mt-accent)) 38%, #D8E6FA) !important;
            background:
              linear-gradient(180deg, rgba(255,255,255,.94), rgba(255,255,255,.86)),
              radial-gradient(circle at 0 0, color-mix(in srgb, var(--topic-accent, var(--mt-accent)) 13%, #FFFFFF), transparent 45%) !important;
            box-shadow: none !important;
            overflow: hidden !important;
          }
          .mt-module-content .pi-mhub-page.has-dashboard .pi-mhub-lesson-head {
            border: 0 !important;
            box-shadow: none !important;
            margin-bottom: 0 !important;
          }
          .mt-module-content .pi-mhub-page.has-dashboard .pi-mhub-lesson-title {
            color: var(--topic-accent, var(--mt-accent)) !important;
            background: none !important;
            box-shadow: none !important;
            padding: 0 !important;
          }
          .mt-module-content .pi-mhub-page.has-dashboard .pi-mhub-lesson-list {
            padding-top: 12px !important;
          }
          .mt-module-content .pi-mhub-banner {
            border-radius: 20px !important;
            gap: 12px !important;
          }
          .mt-module-content .pi-mhub-grid {
            grid-template-columns: 1fr !important;
            max-width: 390px !important;
          }
          .mt-module-content .pi-mhub-card,
          .mt-module-content .pi-mhub-card--v2 {
            padding: 20px 16px 22px !important;
            gap: 12px !important;
          }
          .mt-module-content .pi-mhub-card-desc {
            min-height: auto !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .mt-module-content,
          .mt-module-content .pi-mhub-card,
          .mt-module-content .pi-mhub-card--v2 {
            scroll-behavior: auto;
            transition: none !important;
          }
          .mt-module-content .pi-mhub-card:hover,
          .mt-module-content .pi-mhub-card--v2:hover {
            transform: none !important;
          }
        }
      `})]})}export{L as default};
