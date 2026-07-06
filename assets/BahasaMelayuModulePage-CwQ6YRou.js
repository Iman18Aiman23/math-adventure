import{j as e,e as u,w as g,r as c,b as x}from"./index-YCInXYg5.js";import{S as v}from"./StatsBar-Dt4MeuCr.js";import"./useGamification-g-vGaz2S.js";const w={mendengar:{bm:"Mendengar & Bertutur",en:"Listening & Speaking"},membaca:{bm:"Membaca",en:"Reading"},menulis:{bm:"Menulis",en:"Writing"},"seni-bahasa":{bm:"Seni Bahasa",en:"Language Arts"},tatabahasa:{bm:"Tatabahasa",en:"Grammar"}},k={1:{mendengar:{bm:"Huruf & Frasa",en:"Letters & Phrases"}}};function y({year:t,activeModule:r,onModuleChange:i,onBack:d,language:l="bm"}){const o=(a=>a.replace(/^\d-/,""))(r),n=g(t),m=n.find(a=>a.id===o),f=m?.theme?.c||"#7A4FD0",h=m?.theme?.cd||"#3F2A86";return e.jsxs("header",{className:"bm-module-header",style:{"--accent":f,"--accent-d":h},children:[e.jsx("style",{children:`
        .bm-module-header {
          flex-shrink: 0;
          /* No panel fill — top bar + nav float as HUD elements over the
             module's own page background. */
          background: transparent;
          position: relative;
          z-index: 2;
        }
        .bm-top-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          height: 60px;
          padding: 12px 16px;
          box-sizing: border-box;
          background: transparent;
          position: relative;
          z-index: 1;
        }
        .bm-top-back {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          /* Solid white "game button" — flat, no border or 3D shadow ledge */
          border: none;
          background: #ffffff;
          color: #5C3D2E;
          cursor: pointer;
          flex-shrink: 0;
          padding: 0;
          box-shadow: none;
          transition: transform .1s ease;
        }
        .bm-top-back:hover {
          transform: translateY(-1px);
        }
        .bm-top-back:active {
          transform: translateY(1px);
        }
        /* Phone: fill the remaining row so stats stay readable */
        .bm-top-stats {
          flex: 1 1 auto;
          min-width: 0;
          margin-left: auto;
          display: flex;
          justify-content: flex-end;
        }
        .bm-top-stats .sb-root { margin-bottom: 0; width: 100%; }
        /* Tablet & up: compact HUD pill anchored to the top-right, not full-bleed.
           Items size to their own content (not equal columns) so wider stats like
           "💎 0 Gems" / "⭐ 0 XP" never overflow their slot and collide. */
        @media (min-width: 768px) {
          .bm-top-stats { flex: 0 0 auto; }
          .bm-top-stats .sb-root {
            width: auto;
            min-width: 0;
            padding: 8px 18px;
            gap: 12px;
          }
          .bm-top-stats .sb-item { flex: 0 0 auto; }
        }

        .bm-mnav {
          display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 10px;
          padding: 8px 14px;
          margin: 0 12px 14px;
          border-radius: 18px;
          /* No tray fill — tabs float directly over the page background, each
             carrying its own 3D bubble depth. */
          background: transparent;
          box-shadow: none;
          border: none;
          transition: background .35s ease, box-shadow .35s ease, border-color .35s ease;
          font-family: 'Fredoka', system-ui, sans-serif;
          position: relative;
          z-index: 1;
        }
        .bm-mnav-tab-wrap {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          flex: 1;
        }
        .bm-mnav-tab {
          font-family: 'Nunito', sans-serif;
          font-weight: 900;
          cursor: pointer;
          /* Resting: white card, gray border + gray 3D ledge (palette) */
          border: 4px solid #E0E0E0;
          background: #ffffff;
          border-radius: 20px;
          padding: 10px 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          line-height: 1.15;
          gap: 2px;
          color: #707070;
          transition: transform .1s ease, border-color .15s ease, color .15s ease, box-shadow .1s ease, background .15s ease;
          min-width: 64px;
          flex: 1;
          box-shadow: none;
          -webkit-tap-highlight-color: transparent;
        }
        .bm-mnav-tab:not(.active):hover {
          transform: translateY(-2px);
        }
        /* press → slight sink for tactile feedback */
        .bm-mnav-tab:active { transform: translateY(2px); }
        .bm-mnav-tab.active {
          /* Active: vibrant module surface (--tc) + module border (--tcd),
             e.g. Module 1 = #FF8F3D face with #FF6F00 border. */
          background: var(--tc);
          border-color: var(--tcd);
          color: #fff;
        }
        .bm-mnav-tab.active:active {
          transform: translateY(2px);
        }
        .bm-mnav-tab b { font-family: 'Fredoka', sans-serif; font-weight: 700; font-size: 20px; color: #A0A0A0; }
        .bm-mnav-tab span { font-family: 'Nunito', sans-serif; font-size: 13px; font-weight: 900; white-space: nowrap; }
        .bm-mnav-tab.active b,
        .bm-mnav-tab.active span { color: #fff; text-shadow: 1px 2px 0 rgba(0,0,0,.15); }

        @media (max-width: 1024px) {
          .bm-mnav { padding: 10px 16px; gap: 8px; }
          .bm-mnav-tab-wrap {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            /* extra row-gap so each tab's 8px bottom ledge clears the next row */
            column-gap: 8px;
            row-gap: 18px;
            width: 100%;
            flex: none;
          }
          .bm-mnav-tab {
            flex: none;
            min-width: 0;
            max-width: none;
            width: 100%;
            padding: 12px 6px;
            border-radius: 12px;
          }
          .bm-mnav-tab b { font-size: 16px; }
          .bm-mnav-tab span { font-size: 10px; }
        }
        @media (max-width: 380px) {
          .bm-mnav { padding: 8px 12px; gap: 6px; }
          .bm-mnav-tab-wrap { column-gap: 6px; row-gap: 16px; }
          .bm-mnav-tab { padding: 10px 5px; border-radius: 10px; }
          .bm-mnav-tab b { font-size: 14px; }
          .bm-mnav-tab span { font-size: 9px; }
        }
      `}),e.jsxs("div",{className:"bm-top-bar",children:[e.jsx("button",{type:"button",className:"bm-top-back",onClick:d,children:e.jsx("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("path",{d:"M19 12H5M12 19l-7-7 7-7"})})}),e.jsx("div",{className:"bm-top-stats",children:e.jsx(v,{subject:"bm"})})]}),e.jsx("nav",{className:"bm-mnav",children:e.jsx("div",{className:"bm-mnav-tab-wrap",children:n.map(a=>{const p=o===a.id,b=k[t]?.[a.id]||w[a.id]||{bm:a.name,en:a.nameEn};return e.jsxs("button",{className:`bm-mnav-tab${p?" active":""}`,style:{"--tc":a.theme.c,"--tcd":a.theme.cd},onClick:()=>{p||(u(),i?.(t===1?a.id:`${t}-${a.id}`))},type:"button",children:[e.jsx("b",{children:a.num}),e.jsx("span",{children:l==="bm"?b.bm:b.en})]},a.id)})})})]})}function E({year:t,activeModule:r,onModuleChange:i,onBack:d,onSelectTopic:l,children:s,language:o}){const n=c.useRef(null);return c.useEffect(()=>{n.current&&(n.current.scrollTop=0)},[r]),e.jsxs("div",{className:"bm-module-page",children:[e.jsx(y,{year:t,activeModule:r,onModuleChange:i,onBack:d,language:o}),e.jsx("div",{className:"bm-module-content",ref:n,children:x.isValidElement(s)?x.cloneElement(s,{language:o,onSelectTopic:l}):s}),e.jsx("style",{children:`
        .bm-module-page {
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 0;
          /* Single, uniform page background — nav bar + content share one color
             (no per-module theme tint vs. hub gradient seam). */
          background: #F7F8FA;
        }
        .bm-module-content {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          position: relative;
        }
        .bm-module-content .pi-mhub-page { margin: 0 !important; }
      `})]})}export{E as default};
