import{r,j as e}from"./index-YCInXYg5.js";import{u as y}from"./useGamification-g-vGaz2S.js";function z({subject:w="bm",variant:s}){const{loading:f,xp:i,gems:o,level:t,streak:l,hearts:b,maxHearts:c}=y(w),u=r.useRef(i),d=r.useRef(null),[N,g]=r.useState(!1),[n,m]=r.useState(!1),x=r.useRef(null);if(r.useEffect(()=>{u.current!==i&&d.current&&(d.current.classList.remove("sb-pulse"),d.current.offsetWidth,d.current.classList.add("sb-pulse")),u.current=i},[i]),r.useEffect(()=>{const a=()=>{window.innerWidth<=1024?g(!0):(g(!1),m(!1))};return a(),window.addEventListener("resize",a),()=>window.removeEventListener("resize",a)},[]),r.useEffect(()=>{if(!n)return;const a=h=>{x.current&&!x.current.contains(h.target)&&m(!1)},j=h=>{h.key==="Escape"&&m(!1)};return document.addEventListener("pointerdown",a),document.addEventListener("keydown",j),()=>{document.removeEventListener("pointerdown",a),document.removeEventListener("keydown",j)}},[n]),f)return e.jsxs("div",{className:"sb-root",role:"region","aria-label":"Loading stats",style:{opacity:.5,pointerEvents:"none"},children:[e.jsx("div",{className:"sb-item",children:e.jsx("span",{className:"sb-value",children:"—"})}),e.jsx("div",{className:"sb-sep","aria-hidden":"true"}),e.jsx("div",{className:"sb-item",children:e.jsx("span",{className:"sb-value",children:"—"})}),e.jsx("div",{className:"sb-sep","aria-hidden":"true"}),e.jsx("div",{className:"sb-item",children:e.jsx("span",{className:"sb-value",children:"—"})}),e.jsx("div",{className:"sb-sep","aria-hidden":"true"}),e.jsx("div",{className:"sb-item",children:e.jsx("span",{className:"sb-value",children:"—"})}),e.jsx("div",{className:"sb-sep","aria-hidden":"true"}),e.jsx("div",{className:"sb-item",children:e.jsx("span",{className:"sb-value",children:"—"})})]});const p=f?"—":null,v=(a=!1)=>s==="mb"?e.jsxs("div",{className:a?"sb-mb-wrap popover-mode":"sb-mb-wrap",children:[e.jsxs("div",{className:"sb-mb-pill sb-mb-heart","data-label":"Hearts",style:{color:"#FF6B6B",border:"1px solid rgba(255,107,107,.4)",boxShadow:"0 0 10px rgba(255,107,107,.18)"},"aria-label":`Hearts: ${b} of ${c}`,children:[e.jsx("span",{className:"sb-mb-em","aria-hidden":"true",children:"❤️"}),e.jsx("span",{className:"sb-mb-val",children:p??b})]}),e.jsxs("div",{className:"sb-mb-pill sb-mb-gems","data-label":"Gems",style:{color:"#2DE2E6",border:"1px solid rgba(45,226,230,.4)",boxShadow:"0 0 10px rgba(45,226,230,.18)"},"aria-label":`${o} gems`,children:[e.jsx("span",{className:"sb-mb-em","aria-hidden":"true",children:"💎"}),e.jsx("span",{className:"sb-mb-val",children:p??o})]}),e.jsxs("div",{className:"sb-mb-pill sb-mb-xp","data-label":"XP",style:{color:"#FFD23F",border:"1px solid rgba(255,210,63,.4)",boxShadow:"0 0 10px rgba(255,210,63,.18)"},"aria-label":`${i} experience points`,children:[e.jsx("span",{className:"sb-mb-em","aria-hidden":"true",children:"⭐"}),e.jsx("span",{className:"sb-mb-val",children:p??i})]}),e.jsxs("div",{className:"sb-mb-pill sb-mb-streak","data-label":"Streak",style:{color:"#FF9600",border:"1px solid rgba(255,150,0,.4)",boxShadow:"0 0 10px rgba(255,150,0,.18)"},"aria-label":`Streak: ${l}`,children:[e.jsx("span",{className:"sb-mb-em","aria-hidden":"true",children:"🔥"}),e.jsx("span",{className:"sb-mb-val",children:p??l})]}),e.jsxs("div",{className:"sb-mb-pill sb-mb-level","data-label":"Level",style:{color:"#58CC02",border:"1px solid rgba(88,204,2,.4)",boxShadow:"0 0 10px rgba(88,204,2,.18)"},"aria-label":`Level ${t}`,children:[e.jsx("span",{className:"sb-mb-em",style:{fontSize:"inherit"},children:"Lv"}),e.jsx("span",{className:"sb-mb-val",children:p??t})]})]}):e.jsxs("div",{className:a?"sb-root popover-mode":"sb-root",ref:a?null:d,role:"region","aria-label":`${b} of ${c} hearts, ${o} gems, ${i} experience points, streak ${l} days, level ${t}`,children:[e.jsxs("div",{className:"sb-item","aria-label":`Hearts: ${b} of ${c}`,children:[e.jsx("span",{className:"sb-emoji","aria-hidden":"true",children:"❤️"}),e.jsx("span",{className:"sb-value","aria-live":"polite",children:b})]}),e.jsx("div",{className:"sb-sep","aria-hidden":"true"}),e.jsxs("div",{className:"sb-item","aria-label":`${o} gems`,children:[e.jsx("span",{className:"sb-emoji","aria-hidden":"true",children:"💎"}),e.jsx("span",{className:"sb-value","aria-live":"polite",children:o})]}),e.jsx("div",{className:"sb-sep","aria-hidden":"true"}),e.jsxs("div",{className:"sb-item","aria-label":`${i} experience points`,children:[e.jsx("span",{className:"sb-emoji","aria-hidden":"true",children:"⭐"}),e.jsx("span",{className:"sb-value","aria-live":"polite",children:i})]}),e.jsx("div",{className:"sb-sep","aria-hidden":"true"}),e.jsxs("div",{className:"sb-item","aria-label":`Streak: ${l} days`,children:[e.jsx("span",{className:"sb-emoji sb-streak-emoji","aria-hidden":"true",children:"🔥"}),e.jsx("span",{className:"sb-value",children:l})]}),e.jsx("div",{className:"sb-sep","aria-hidden":"true"}),e.jsxs("div",{className:"sb-item","aria-label":`Level ${t}`,children:[e.jsx("span",{className:"sb-value",children:t}),e.jsx("span",{className:"sb-label",children:"Lv"})]})]});return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        .sb-container {
          position: relative;
          display: inline-flex;
          align-items: center;
          isolation: isolate;
          z-index: 9999;
        }
        .sb-bundle-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          min-height: ${s==="mb"?"42px":"38px"};
          background: ${s==="mb"?"linear-gradient(180deg, rgba(255,255,255,.96), rgba(241,248,252,.88)), linear-gradient(135deg, rgba(20,184,166,.12), rgba(99,102,241,.08))":"#ffffff"};
          color: ${s==="mb"?"#1D3A43":"#10243A"};
          border: ${s==="mb"?"1px solid rgba(255,255,255,.88)":"1px solid rgba(20,40,70,.06)"};
          padding: ${s==="mb"?"8px 12px 8px 10px":"8px 14px"};
          border-radius: ${s==="mb"?"18px":"12px"};
          font-family: 'Fredoka', system-ui, sans-serif;
          font-weight: 800;
          font-size: 14px;
          cursor: pointer;
          letter-spacing: 0;
          box-shadow: none;
          transition: transform .16s ease, border-color .18s ease, background .18s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .sb-bundle-btn .sb-emoji {
          font-size: 16px;
          filter: none;
        }
        .sb-bundle-text {
          line-height: 1;
          text-shadow: none;
        }
        .sb-bundle-btn:active { transform: translateY(1px) scale(.99); }
        .sb-bundle-btn:hover {
          border-color: ${s==="mb"?"rgba(20,184,166,.24)":"rgba(20,40,70,.10)"};
          box-shadow: none;
        }
        .sb-bundle-btn:focus-visible {
          outline: 3px solid ${s==="mb"?"#14B8A6":"#2563EB"};
          outline-offset: 3px;
        }
        
        .sb-popover {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          z-index: 9999;
          min-width: ${s==="mb"?"168px":"144px"};
          background: ${s==="mb"?"linear-gradient(180deg, rgba(255,255,255,.98), rgba(243,249,252,.96))":"#ffffff"};
          padding: ${s==="mb"?"10px":"12px"};
          border-radius: ${s==="mb"?"20px":"16px"};
          box-shadow: none;
          border: ${s==="mb"?"1px solid #E6E6E6":"1px solid rgba(20,40,70,.1)"};
          overflow: hidden;
          animation: sb-fade-in .18s cubic-bezier(.34,1.56,.64,1);
          transform-origin: top right;
        }
        @keyframes sb-fade-in {
          0% { opacity: 0; transform: scale(0.95) translateY(-5px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* Adjustments for popover mode */
        .sb-mb-wrap.popover-mode {
          flex-direction: column;
          align-items: stretch;
          gap: 7px;
          width: 100%;
          position: relative;
          z-index: 1;
        }
        .sb-mb-wrap.popover-mode .sb-mb-pill {
          flex: none;
          width: 100%;
          height: 40px;
          justify-content: flex-start;
          padding: 0 12px;
          box-sizing: border-box;
        }
        .sb-mb-wrap.popover-mode .sb-mb-em {
          width: 22px;
          height: 22px;
          display: grid;
          place-items: center;
          text-align: center;
        }
        .sb-mb-wrap.popover-mode .sb-mb-pill::after {
          display: block;
        }
        .sb-mb-wrap.popover-mode .sb-mb-val {
          margin-left: auto;
          font-size: 14px;
        }

        .sb-root.popover-mode {
          flex-direction: column;
          gap: 8px;
          padding: 0;
          border: none;
          box-shadow: none;
          background: transparent;
          min-height: auto;
          margin-bottom: 0;
          width: 120px;
        }
        .sb-root.popover-mode .sb-item {
          flex: none;
          width: 100%;
          height: 34px;
          justify-content: flex-start;
          padding: 0 14px;
          box-sizing: border-box;
        }
        .sb-root.popover-mode .sb-emoji,
        .sb-root.popover-mode .sb-label {
          width: 24px;
          text-align: left;
        }
        .sb-root.popover-mode .sb-sep {
          display: none;
        }

        /* Existing styles */
        .sb-mb-wrap {
          display: flex;
          gap: 6px;
          align-items: center;
          flex-wrap: nowrap;
          width: 100%;
        }
        .sb-mb-pill {
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          flex: none; /* NEVER squish */
          font-family: 'Fredoka', system-ui, sans-serif;
          font-weight: 800;
          font-size: 13px;
          padding: 7px 10px;
          border-radius: 14px;
          background:
            linear-gradient(180deg, rgba(255,255,255,.98), rgba(243,248,252,.92)),
            linear-gradient(135deg, color-mix(in srgb, currentColor 10%, transparent), rgba(255,255,255,.16)) !important;
          border: 1px solid color-mix(in srgb, currentColor 22%, rgba(255,255,255,.82)) !important;
          box-shadow: none !important;
          white-space: nowrap;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: transform .16s ease, background .18s ease, border-color .18s ease;
        }
        .sb-mb-pill::before {
          content: "";
          position: absolute;
          inset: 0 auto 0 0;
          width: 3px;
          background: currentColor;
          opacity: .26;
          box-shadow: none;
        }
        .sb-mb-pill::after {
          content: attr(data-label);
          display: none;
          order: 2;
          color: rgba(62, 92, 101, .70);
          font-size: 10px;
          font-weight: 700;
          line-height: 1;
        }
        .sb-mb-pill:hover {
          transform: translateY(-1px);
          background:
            linear-gradient(180deg, #FFFFFF, rgba(243,248,252,.96)),
            linear-gradient(135deg, color-mix(in srgb, currentColor 13%, transparent), rgba(255,255,255,.20)) !important;
        }
        .sb-mb-em {
          order: 1;
          font-size: 13px;
          flex-shrink: 0;
          line-height: 1;
          filter: none;
        }
        .sb-mb-val {
          order: 3;
          line-height: 1;
          color: currentColor;
          font-variant-numeric: tabular-nums;
          text-shadow: none;
        }
        @media (max-width: 400px) {
          .sb-mb-wrap:not(.popover-mode) { gap: 3px; }
          .sb-mb-pill { font-size: 11px; padding: 6px 6px; border-radius: 11px; gap: 4px; }
          .sb-mb-em { font-size: 11px; }
        }
        @media (min-width: 768px) {
          .sb-mb-wrap:not(.popover-mode) { width: auto; gap: 8px; }
          .sb-mb-pill { flex: 0 0 auto; padding: 7px 12px; font-size: 14px; }
          .sb-mb-em { font-size: 14px; }
        }

        .sb-root {
          display: flex;
          align-items: center;
          justify-content: space-around;
          gap: 4px;
          padding: 8px 10px;
          min-height: 48px;
          background: #ffffff;
          color: #fff;
          font-family: 'Fredoka', system-ui, sans-serif;
          user-select: none;
          -webkit-user-select: none;
          border-radius: 14px;
          border: 1px solid rgba(20,40,70,.06);
          box-shadow: none;
          margin-bottom: 12px;
        }
        @media (max-width: 480px) {
          .sb-root:not(.popover-mode) {
            padding: 8px 6px;
            gap: 2px;
            border-radius: 10px;
            min-height: 44px;
          }
        }
        .sb-item {
          flex: 1 1 0; 
          min-width: 0;
          display: flex;
          align-items: center;
          gap: 4px;
          white-space: nowrap;
          justify-content: center;
          padding: 9px 9px;
          border-radius: 11px;
          background: var(--chip, #94a3b8);
          box-shadow: none;
        }
        .sb-item:nth-child(1) { --chip: #FF4B4B; }
        .sb-item:nth-child(3) { --chip: #1CC8EE; }
        .sb-item:nth-child(5) { --chip: #A560FF; }
        .sb-item:nth-child(7) { --chip: #FF9600; }
        .sb-item:nth-child(9) { --chip: #58CC02; }
        .sb-emoji {
          font-size: 16px;
          line-height: 1;
          filter: none;
        }
        @media (max-width: 480px) {
          .sb-emoji { font-size: 14px; }
        }

        .sb-label {
          font-size: 11px;
          font-weight: 500;
          line-height: 1; 
          color: rgba(255,255,255,0.75);
        }
        .sb-value {
          font-size: 14px;
          font-weight: 700;
          line-height: 1;
          color: #fff;
          transition: transform .25s ease;
        }
        @media (max-width: 480px) {
          .sb-label { display: none; }
          .sb-value { font-size: 12px; }
        }
        @media (min-width: 768px) {
          .sb-root:not(.popover-mode) {
            justify-content: center;
            gap: 4px;
            padding: 8px 16px;
            min-height: 44px;
          }
          .sb-item { gap: 6px; }
          .sb-label { font-size: 12px; }
          .sb-value { font-size: 16px; }
        }

        .sb-sep {
          width: 1px;
          height: 24px;
          background: rgba(255,255,255,0.25);
          flex-shrink: 0;
        }
        @media (max-width: 480px) {
          .sb-sep { display: none; }
        }
        @media (min-width: 768px) {
          .sb-sep { height: 28px; }
        }

        .sb-streak-emoji {
          animation: sb-flicker 0.8s ease-in-out infinite;
        }
        @keyframes sb-flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sb-streak-emoji { animation: none; }
        }

        @keyframes sb-pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.18); }
          100% { transform: scale(1); }
        }
        .sb-pulse .sb-value,
        .sb-pulse .sb-emoji {
          animation: sb-pop .35s cubic-bezier(.34,1.56,.64,1);
        }
        @media (prefers-reduced-motion: reduce) {
          .sb-bundle-btn,
          .sb-mb-pill {
            transition: none;
          }
          .sb-popover {
            animation: none;
          }
          .sb-mb-pill:hover {
            transform: none;
          }
          .sb-pulse .sb-value,
          .sb-pulse .sb-emoji { animation: none; }
        }
      `}),e.jsx("div",{className:"sb-container",children:N?e.jsxs("div",{ref:x,children:[e.jsxs("button",{type:"button",className:`sb-bundle-btn${s==="mb"?" sb-bundle-btn--mb":""}`,onClick:()=>m(!n),"aria-expanded":n,"aria-label":n?"Close stats":"Open stats",children:[e.jsx("span",{className:"sb-emoji",children:"⭐"}),e.jsx("span",{className:"sb-bundle-text",children:"Stats"})]}),n&&e.jsx("div",{className:`sb-popover${s==="mb"?" sb-popover--mb":""}`,children:v(!0)})]}):v(!1)})]})}export{z as S};
