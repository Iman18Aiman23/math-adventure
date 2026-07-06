import{u as y,r as m,j as t}from"./index-YCInXYg5.js";import{B as k}from"./BackButton-DoWsAqH6.js";import"./arrow-left-B6fmfze-.js";const w=[{id:"add",emoji:"➕",labelBm:"Tambah",labelEn:"Addition",color:"#00DD5F",dark:"#00AA40",light:"#C8FFE0"},{id:"subtract",emoji:"➖",labelBm:"Tolak",labelEn:"Subtraction",color:"#0099FF",dark:"#0066CC",light:"#CCE5FF"},{id:"multiply",emoji:"✖️",labelBm:"Darab",labelEn:"Multiplication",color:"#DD44FF",dark:"#BB00FF",light:"#F0CCFF"},{id:"divide",emoji:"➗",labelBm:"Bahagi",labelEn:"Division",color:"#FF7700",dark:"#DD5500",light:"#FFD9B3"},{id:"random",emoji:"🎲",labelBm:"Rawak",labelEn:"Random Mix",color:"#FF3333",dark:"#DD0000",light:"#FFB3B3"}],B=[{id:"easy",emoji:"🌱",labelBm:"Senang",labelEn:"Easy",descBm:"(1-9)",color:"#00DD5F",dark:"#00AA40",light:"#C8FFE0"},{id:"medium",emoji:"⭐",labelBm:"Sederhana",labelEn:"Medium",descBm:"(10-99)",color:"#FFB800",dark:"#DD9300",light:"#FFE5B3"},{id:"hard",emoji:"🔥",labelBm:"Susah",labelEn:"Hard",descBm:"(100+)",color:"#FF3333",dark:"#DD0000",light:"#FFB3B3"}],C=[{id:"multiple",emoji:"🔘",labelBm:"Pilihan",labelEn:"Choices",color:"#DD44FF",dark:"#BB00FF",light:"#F0CCFF"},{id:"typing",emoji:"⌨️",labelBm:"Taip",labelEn:"Type",color:"#FF7700",dark:"#DD5500",light:"#FFD9B3"}],u=Array.from({length:9},(o,l)=>l+1);function N({onStart:o,onBack:l,onHome:x,language:b}){y();const[s,f]=m.useState(null),[n,g]=m.useState([]),[d,F]=m.useState(null),[c,v]=m.useState(null),i=b==="bm",h=e=>{if(e==="random"){g(["random"]);return}let a=n.includes("random")?[]:[...n];a.includes(e)?a=a.filter(p=>p!==e):a.push(e),g(a)},j=()=>{if(s&&d&&c){const e=n.includes("random")?[]:n;o(s.id,d.id,e,c.id)}},r=s&&d&&c;return t.jsxs("div",{className:"math-menu-fullscreen",children:[t.jsx("style",{children:`
        .math-menu-fullscreen {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: var(--bg-body);
          overflow-y: auto;
          overflow-x: hidden;
          padding: 0 14px;
          max-width: 980px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
        }
        .math-scroll-area {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
        }
        .math-section {
          background: transparent;
          border: none;
          border-radius: 24px;
          padding: 1.2rem;
          box-shadow: none;
        }
        .math-section-title {
          font-size: 1.1rem;
          font-weight: 900;
          color: #FF6B6B;
          margin-bottom: 1rem;
          letter-spacing: 0.5px;
        }
        .math-btn-card-vert {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: var(--btn-light, #f5f5f5);
          border: 3px solid var(--btn-color, #E5E5E5);
          border-bottom: 5px solid var(--btn-dark, #C0C0C0);
          border-radius: 16px;
          padding: 12px 6px;
          text-align: center;
          transition: all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
          width: 100%;
          cursor: pointer;
          font-family: inherit;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .math-btn-card-vert:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
          border-bottom-width: 7px;
        }
        .math-btn-card-vert:active {
          transform: translateY(2px);
          border-bottom-width: 2px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .math-btn-card-vert.selected {
          background: var(--btn-color);
          color: white;
          border-color: var(--btn-dark);
          border-bottom-color: var(--btn-dark);
          box-shadow: 0 0 0 4px var(--btn-light), 0 8px 16px rgba(0, 0, 0, 0.2);
          transform: scale(1.05);
        }
        .math-btn-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          flex-shrink: 0;
          width: 56px;
          height: 56px;
        }
        .math-btn-label {
          font-weight: 900;
          font-size: 0.85rem;
          color: #3C3C3C;
          line-height: 1.2;
          word-break: break-word;
        }
        .math-btn-card-vert.selected .math-btn-label {
          color: white;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }
        .math-btn-desc {
          font-weight: 700;
          font-size: 0.65rem;
          color: #777;
        }

        /* Responsive grid helpers - Mobile first */
        .grid-ops {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0.4rem;
        }
        .btn-rawak {
          grid-column: span 1;
          flex-direction: column;
          justify-content: center;
        }
        .btn-rawak .math-btn-label {
          font-size: 0.65rem;
        }
        @media (min-width: 768px) {
          .grid-ops {
            gap: 0.8rem;
          }
          .btn-rawak .math-btn-label {
            font-size: 0.85rem;
          }
        }
        .grid-nombor {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0.4rem;
        }
        @media (min-width: 768px) {
          .grid-nombor {
            grid-template-columns: repeat(10, 1fr);
            gap: 0.8rem;
          }
        }
        .grid-3-cols {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.4rem;
        }
        @media (min-width: 768px) {
          .grid-3-cols {
            gap: 0.8rem;
          }
        }
        .grid-2-cols {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.4rem;
        }
        @media (min-width: 768px) {
          .grid-2-cols {
            gap: 0.8rem;
          }
        }
        @media (max-width: 560px) {
          .math-menu-fullscreen {
            padding: 0 10px;
          }
          .math-btn-icon {
            width: 32px;
            height: 32px;
            font-size: 1.1rem;
          }
          .math-btn-label {
            font-size: 0.6rem;
          }
          .math-btn-card-vert {
            padding: 6px 2px;
            gap: 2px;
            border-radius: 10px;
            border: 2px solid var(--btn-color, #E5E5E5);
            border-bottom: 3px solid var(--btn-dark, #C0C0C0);
          }
          .math-section {
            padding: 0.75rem;
          }
          .math-scroll-area {
            padding: 0.5rem;
            gap: 0.5rem;
          }
          .math-section-title {
            font-size: 0.85rem;
            margin-bottom: 0.5rem;
            font-weight: 800;
          }
          .math-start-btn {
            padding: 12px;
            font-size: 1.1rem;
          }
        }

      `}),t.jsx(k,{onClick:l}),t.jsxs("div",{className:"math-scroll-area",children:[t.jsxs("div",{className:"math-section",children:[t.jsxs("div",{className:"math-section-title",children:["1. ",i?"Operasi":"Operation"]}),t.jsx("div",{className:"grid-ops",children:w.map(e=>{const a=s?.id===e.id,p=e.id==="random";return t.jsxs("button",{onClick:()=>f(e),className:`math-btn-card-vert ${a?"selected":""} ${p?"btn-rawak":""}`,style:{"--btn-color":e.color,"--btn-dark":e.dark,"--btn-light":e.light},children:[t.jsx("div",{className:"math-btn-icon",children:e.emoji}),t.jsx("div",{className:"math-btn-label",children:i?e.labelBm:e.labelEn})]},e.id)})})]}),t.jsxs("div",{className:"math-section",children:[t.jsxs("div",{className:"math-section-title",children:["2. ",i?"Nombor":"Number to Play"]}),t.jsxs("div",{className:"grid-nombor",children:[u.slice(0,5).map(e=>{const a=n.includes(e);return t.jsx("button",{onClick:()=>h(e),className:`math-btn-card-vert ${a?"selected":""}`,style:{"--btn-color":"#1CB0F6","--btn-dark":"#0B8DC0","--btn-light":"#ddf4ff",padding:"6px"},children:t.jsx("div",{className:"math-btn-icon",style:{borderRadius:"8px",width:"38px",height:"38px",fontSize:"1.2rem",fontFamily:"var(--font-heading)"},children:e})},e)}),u.slice(5,9).map(e=>{const a=n.includes(e);return t.jsx("button",{onClick:()=>h(e),className:`math-btn-card-vert ${a?"selected":""}`,style:{"--btn-color":"#1CB0F6","--btn-dark":"#0B8DC0","--btn-light":"#ddf4ff",padding:"6px"},children:t.jsx("div",{className:"math-btn-icon",style:{borderRadius:"8px",width:"38px",height:"38px",fontSize:"1.2rem",fontFamily:"var(--font-heading)"},children:e})},e)}),t.jsx("button",{onClick:()=>h("random"),className:`math-btn-card-vert ${n.includes("random")?"selected":""}`,style:{"--btn-color":"#CE82FF","--btn-dark":"#9B59B6","--btn-light":"#f4dfff",padding:"6px"},children:t.jsx("div",{className:"math-btn-icon",style:{borderRadius:"8px",width:"38px",height:"38px",fontSize:"1.2rem"},children:"🎲"})})]})]}),t.jsxs("div",{className:"math-section",children:[t.jsxs("div",{className:"math-section-title",children:["3. ",i?"Tahap Kesukaran":"Difficulty"]}),t.jsx("div",{className:"grid-3-cols",children:B.map(e=>{const a=d?.id===e.id;return t.jsxs("button",{onClick:()=>F(e),className:`math-btn-card-vert ${a?"selected":""}`,style:{"--btn-color":e.color,"--btn-dark":e.dark,"--btn-light":e.light},children:[t.jsx("div",{className:"math-btn-icon",children:e.emoji}),t.jsx("div",{className:"math-btn-label",children:i?e.labelBm:e.labelEn})]},e.id)})})]}),t.jsxs("div",{className:"math-section",children:[t.jsxs("div",{className:"math-section-title",children:["4. ",i?"Cara Menjawab":"Input mode"]}),t.jsx("div",{className:"grid-2-cols",children:C.map(e=>{const a=c?.id===e.id;return t.jsxs("button",{onClick:()=>v(e),className:`math-btn-card-vert ${a?"selected":""}`,style:{"--btn-color":e.color,"--btn-dark":e.dark,"--btn-light":e.light,flexDirection:"row",justifyContent:"center"},children:[t.jsx("div",{className:"math-btn-icon",children:e.emoji}),t.jsx("div",{className:"math-btn-label",style:{fontSize:"0.9rem"},children:i?e.labelBm:e.labelEn})]},e.id)})})]}),t.jsx("div",{style:{marginTop:"1rem"},children:t.jsxs("button",{className:"math-start-btn",disabled:!r,onClick:j,style:{width:"100%",padding:"14px",fontSize:"1.2rem",fontWeight:900,color:"white",background:r?"linear-gradient(135deg, #58CC02 0%, #46A302 100%)":"#E5E5E5",border:"none",borderBottom:r?"5px solid #2E6B00":"3px solid #AFAFAF",borderRadius:"16px",cursor:r?"pointer":"not-allowed",transition:"all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)",boxShadow:r?"0 6px 12px rgba(88, 204, 2, 0.3)":"none",letterSpacing:"0.5px"},onMouseEnter:e=>{r&&(e.currentTarget.style.transform="translateY(-2px)",e.currentTarget.style.boxShadow="0 10px 20px rgba(88, 204, 2, 0.4)")},onMouseLeave:e=>{e.currentTarget.style.transform="none",e.currentTarget.style.boxShadow=r?"0 6px 12px rgba(88, 204, 2, 0.3)":"none"},onMouseDown:e=>{r&&(e.currentTarget.style.transform="translateY(2px)",e.currentTarget.style.borderBottomWidth="2px")},onMouseUp:e=>{r&&(e.currentTarget.style.transform="translateY(-2px)",e.currentTarget.style.borderBottomWidth="5px")},children:[i?"Mula Main!":"Start Playing!"," 🚀"]})})]})]})}function z({onStart:o,onBack:l,onHome:x,language:b}){return t.jsx(N,{onStart:o,onBack:l,onHome:x,language:b})}export{z as default};
