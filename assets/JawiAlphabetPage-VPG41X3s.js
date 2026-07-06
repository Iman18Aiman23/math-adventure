import{r as f,S as x,j as e}from"./index-YCInXYg5.js";import{r as v}from"./index-NOCtoZ7I.js";import{L as k}from"./localization-bS82JCQ0.js";import{J as s}from"./jawiData-B_AH0n6O.js";import{S as b}from"./jawiSukuKataData-DIATyicj.js";import{G as A}from"./arabic-W4X4pPK0.js";import{B as F}from"./BackButton-DoWsAqH6.js";import{X as C}from"./x-BXhlUjdk.js";import{V as S}from"./volume-2-B9qgBXCR.js";import{C as z}from"./chevron-left-BLXk0NUJ.js";import{C as I}from"./chevron-right--_L4we7T.js";import"./arrow-left-B6fmfze-.js";const m=[{base:"#CE82FF",light:"#ECD0FF",deep:"#7A3FA0"},{base:"#1CB0F6",light:"#A0E4FF",deep:"#0B6EA0"},{base:"#58CC02",light:"#B4F576",deep:"#2E7001"},{base:"#FF9600",light:"#FFD9A0",deep:"#8F5300"},{base:"#FF4B4B",light:"#FFB0B0",deep:"#A01010"},{base:"#00C2A8",light:"#A0F0E8",deep:"#007A6A"},{base:"#F59E0B",light:"#FDE68A",deep:"#92400E"},{base:"#EC4899",light:"#F9A8D4",deep:"#9D174D"}],$={چ:"ca",ڠ:"nga",ڤ:"pa","ݢ":"ga",ۏ:"va",ڽ:"nya"},E={...A,...$},D="/math-adventure/audio/hijaiyah/",u=p=>{const a=b[p];return a?a.length:0},j=(p,a)=>{window.speechSynthesis?.cancel();const l=E[p];if(!l){x.speak(a,"ms-MY");return}const t=new Audio(`${D}${l}.mp3`);t.addEventListener("error",()=>x.speak(a,"ms-MY"),{once:!0}),t.play().catch(()=>x.speak(a,"ms-MY"))};function G({onBack:p,language:a}){const l=k[a].jawi,[t,d]=f.useState(null);f.useEffect(()=>{t&&j(t.jawi,t.rumi)},[t]),f.useEffect(()=>()=>x.stopSpeaking(),[]);const y=()=>{const n=(s.findIndex(o=>o.jawi===t.jawi)+1)%s.length;d(s[n])},w=()=>{const n=(s.findIndex(o=>o.jawi===t.jawi)-1+s.length)%s.length;d(s[n])},g=t?s.findIndex(r=>r.jawi===t.jawi):-1,i=g>=0?m[g%m.length]:m[0],h=s.length;return e.jsxs("div",{style:{display:"flex",flexDirection:"column",height:"100%",overflowY:"auto",background:"linear-gradient(180deg, #ECFDF5 0%, #D1FAE5 40%, #F0FDFA 100%)"},children:[e.jsx("style",{children:`
        .jawi-kv-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        @media (max-width: 400px) { .jawi-kv-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; } }
        @media (min-width: 500px) { .jawi-kv-grid { grid-template-columns: repeat(4, 1fr); gap: 14px; } }
        @media (min-width: 760px) { .jawi-kv-grid { grid-template-columns: repeat(5, 1fr); gap: 16px; } }
        .jawi-kv-letter-tile {
          position: relative; border: 0; padding: 0;
          aspect-ratio: 1 / 1.05; width: 100%;
          container-type: inline-size;
          border-radius: 24px; cursor: pointer; font-family: inherit;
          transition: transform .25s cubic-bezier(.34,1.56,.64,1);
          -webkit-tap-highlight-color: transparent;
          animation: jawiKvTileIn .5s cubic-bezier(.34,1.56,.64,1) forwards;
        }
        @keyframes jawiKvTileIn {
          0%   { opacity: 0; transform: translateY(22px) scale(.94); }
          70%  { opacity: 1; transform: translateY(-4px) scale(1.02); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .jawi-kv-letter-tile:hover  { transform: translateY(-6px) rotate(-1.2deg); }
        .jawi-kv-letter-tile:active { transform: translateY(5px) rotate(0deg); transition: transform .1s ease; }
        .jawi-kv-letter-tile::before {
          content: ""; position: absolute; inset: 0;
          background-image: radial-gradient(rgba(255,255,255,.18) 1.4px, transparent 1.6px);
          background-size: 18px 18px; opacity: .65; pointer-events: none; z-index: 1;
        }
        .jawi-kv-letter-tile::after {
          content: ""; position: absolute; top: 6px; left: 10px; right: 10px; height: 38%;
          border-radius: 20px 20px 0 0;
          background: linear-gradient(180deg, rgba(255,255,255,.42) 0%, rgba(255,255,255,.06) 75%, transparent 100%);
          pointer-events: none; z-index: 1;
        }
        .jawi-kv-tile-letter {
          position: absolute; inset: 0; padding-bottom: 28%;
          display: flex; align-items: center; justify-content: center; z-index: 2;
          font-family: 'Lateef', 'Noto Naskh Arabic', 'Times New Roman', serif; font-weight: 700;
          font-size: 60cqi; line-height: 1; color: #fff;
          text-shadow: 0 2px 0 rgba(0,0,0,.18);
        }
        .jawi-kv-tile-cap {
          position: absolute; bottom: 8px; left: 8px; right: 8px; z-index: 4;
          background: #fff; border-radius: 14px; padding: 6px 10px;
          box-shadow: 0 3px 0 rgba(0,0,0,.10);
          text-align: center; font-family: 'Fredoka', sans-serif; font-weight: 700;
          font-size: 0.8rem; line-height: 1;
        }
        .jawi-kv-section-label {
          font-family: 'Fredoka', sans-serif; font-weight: 700; font-size: 1.05rem;
          color: #374151; text-align: center; letter-spacing: .04em;
          margin: 12px 0 16px;
          display: flex; align-items: center; gap: 14px; justify-content: center;
        }
        .jawi-kv-section-label::before, .jawi-kv-section-label::after {
          content: ""; height: 3px; flex: 1; max-width: 80px; border-radius: 999px;
          background: linear-gradient(90deg, rgba(206,130,255,.6), rgba(0,194,168,.7), rgba(28,176,246,.7), rgba(88,204,2,.6));
        }
        @media (max-width: 400px) {
          .jawi-kv-letter-tile { border-radius: 18px; }
          .jawi-kv-tile-cap { bottom: 5px; left: 5px; right: 5px; padding: 5px 6px; font-size: 0.68rem; border-radius: 10px; }
        }

        .jawi-modal-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          z-index: 1000; padding: 1rem;
          animation: jawiModalFadeIn 0.25s ease-out;
        }
        @keyframes jawiModalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .jawi-modal-content {
          background: white;
          border-radius: 2.5rem;
          width: 100%;
          max-width: 600px;
          max-height: 92vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 25px 60px rgba(0,0,0,0.35);
          animation: jawiModalPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        @keyframes jawiModalPop {
          from { opacity: 0; transform: scale(0.82) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .suku-card {
          -webkit-tap-highlight-color: transparent;
        }
        .suku-card::after {
          content: "";
          position: absolute; top: 4px; left: 8px; right: 8px; height: 30%;
          border-radius: 14px 14px 0 0;
          background: linear-gradient(180deg, rgba(255,255,255,.35) 0%, rgba(255,255,255,.05) 70%, transparent 100%);
          pointer-events: none;
        }

        .nav-btn {
          border: none; cursor: pointer; font-family: inherit; font-weight: 800;
          transition: all .15s cubic-bezier(.34,1.56,.64,1);
          -webkit-tap-highlight-color: transparent;
        }
        .nav-btn:hover { transform: translateY(-3px); }
        .nav-btn:active { transform: translateY(2px); transition: transform .08s ease; }
      `}),e.jsx(F,{onClick:p}),e.jsxs("div",{style:{padding:"68px 0.75rem 1.5rem",maxWidth:"600px",margin:"0 auto",width:"100%"},children:[e.jsx("div",{className:"jawi-kv-section-label",children:a==="bm"?"Pilih Huruf untuk Belajar":"Select a Letter to Learn"}),e.jsx("div",{className:"jawi-kv-grid",style:{direction:"rtl"},children:s.map((r,n)=>{const o=m[n%m.length],c=u(r.jawi);return e.jsxs("button",{type:"button",className:"jawi-kv-letter-tile",onClick:()=>d(r),style:{background:`linear-gradient(165deg, ${o.light} 0%, ${o.base} 60%, ${o.deep} 100%)`,animationDelay:`${.04+n*.025}s`},children:[e.jsx("span",{className:"jawi-kv-tile-letter",children:r.jawi}),e.jsxs("span",{className:"jawi-kv-tile-cap",style:{color:o.deep,direction:"ltr"},children:[r.rumi," · ",c]})]},n)})})]}),t&&v.createPortal(e.jsx("div",{className:"jawi-modal-overlay",onClick:()=>d(null),children:e.jsxs("div",{className:"jawi-modal-content",style:{border:`5px solid ${i.base}`},onClick:r=>r.stopPropagation(),children:[e.jsxs("div",{style:{background:`linear-gradient(145deg, ${i.base} 0%, ${i.deep} 100%)`,padding:"1.5rem 1.5rem 1.25rem",borderBottom:"none",position:"relative"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.75rem"},children:[e.jsx("span",{style:{fontSize:"2.4rem",fontFamily:"serif",color:"#fff",lineHeight:1,textShadow:"0 2px 4px rgba(0,0,0,.2)",direction:"rtl"},children:t.jawi}),e.jsxs("div",{children:[e.jsx("div",{style:{color:"rgba(255,255,255,.95)",fontWeight:800,fontSize:"1.15rem"},children:t.rumi}),e.jsx("div",{style:{color:"rgba(255,255,255,.7)",fontWeight:600,fontSize:"0.75rem"},children:a==="bm"?`Huruf ke-${g+1} dari ${h}`:`Letter ${g+1} of ${h}`})]})]}),e.jsx("button",{onClick:()=>d(null),style:{background:"rgba(255,255,255,.2)",border:"none",borderRadius:"50%",width:"2.2rem",height:"2.2rem",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",backdropFilter:"blur(4px)"},children:e.jsx(C,{size:18})})]}),e.jsxs("div",{style:{marginTop:"0.75rem",display:"flex",gap:"0.5rem",alignItems:"center"},children:[e.jsxs("button",{onClick:r=>{r.stopPropagation(),j(t.jawi,t.rumi)},style:{background:"rgba(255,255,255,.2)",border:"none",borderRadius:"999px",padding:"0.35rem 0.9rem",cursor:"pointer",display:"flex",alignItems:"center",gap:"0.35rem",color:"#fff",fontWeight:700,fontSize:"0.8rem",backdropFilter:"blur(4px)"},children:[e.jsx(S,{size:15}),a==="bm"?"Dengar":"Listen"]}),e.jsxs("div",{style:{marginLeft:"auto",background:"rgba(255,255,255,.15)",borderRadius:"999px",padding:"0.2rem 0.7rem",color:"rgba(255,255,255,.85)",fontWeight:700,fontSize:"0.72rem"},children:[u(t.jawi)," suku kata"]})]})]}),e.jsx("div",{style:{padding:"1.25rem 1.5rem"},children:b[t.jawi]?e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(170px, 1fr))",gap:"0.7rem"},children:b[t.jawi].map((r,n)=>{const o=["#FF6B6B","#4ECDC4","#FFD93D","#FF8C42","#9D4EDD","#6BCB77"],c=o[n%o.length];return e.jsxs("div",{className:"suku-card",style:{background:`linear-gradient(165deg, ${c}dd, ${c})`,borderRadius:"1.2rem",padding:"0.85rem",color:"white",position:"relative",overflow:"hidden",boxShadow:`0 4px 12px ${c}55`,border:"none",animation:"jawiModalPop 0.4s cubic-bezier(0.175,0.885,0.32,1.275) forwards",animationDelay:`${n*.06}s`,opacity:0},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem",direction:"rtl"},children:[e.jsx("div",{style:{background:"rgba(255,255,255,.2)",borderRadius:"0.75rem",padding:"0.45rem 0.6rem",textAlign:"center",minWidth:"52px"},children:e.jsx("div",{style:{fontSize:"1.5rem",fontFamily:"serif",lineHeight:1,fontWeight:"bold"},children:r.jawi})}),e.jsx("div",{style:{textAlign:"center",flex:1,direction:"ltr"},children:e.jsx("div",{style:{fontSize:"0.85rem",fontWeight:800,opacity:.95},children:r.rumi})})]}),e.jsx("div",{style:{background:"rgba(0,0,0,0.1)",padding:"0.35rem 0.5rem",borderRadius:"0.75rem",textAlign:"center",marginTop:"0.45rem"},children:e.jsx("div",{style:{fontSize:"0.75rem",fontWeight:600,opacity:.9},children:r.bunyi})})]},n)})}):e.jsx("p",{style:{textAlign:"center",color:"#888",margin:"1rem 0"},children:l.noSyllableData})}),e.jsxs("div",{style:{display:"flex",gap:"0.6rem",padding:"1rem 1.5rem 1.5rem",borderTop:"2px solid #f0f0f0"},children:[e.jsxs("button",{onClick:w,className:"nav-btn",style:{flex:1,padding:"0.75rem 0.5rem",borderRadius:"14px",background:"#fff",color:i.base,border:`2px solid ${i.light}`,borderBottom:`5px solid ${i.light}`,boxShadow:"0 4px 0 rgba(0,0,0,.05)",fontSize:"0.82rem",display:"flex",alignItems:"center",justifyContent:"center",gap:"0.25rem"},children:[e.jsx(z,{size:16})," ",l.prev]}),e.jsx("button",{onClick:()=>d(null),className:"nav-btn",style:{flex:1.5,padding:"0.75rem 0.5rem",borderRadius:"14px",background:`linear-gradient(165deg, ${i.base}, ${i.deep})`,color:"#fff",border:"none",borderBottom:`5px solid ${i.deep}cc`,boxShadow:`0 4px 0 ${i.deep}55`,fontSize:"0.9rem"},children:l.close}),e.jsxs("button",{onClick:y,className:"nav-btn",style:{flex:1,padding:"0.75rem 0.5rem",borderRadius:"14px",background:"#fff",color:i.base,border:`2px solid ${i.light}`,borderBottom:`5px solid ${i.light}`,boxShadow:"0 4px 0 rgba(0,0,0,.05)",fontSize:"0.82rem",display:"flex",alignItems:"center",justifyContent:"center",gap:"0.25rem"},children:[l.next," ",e.jsx(I,{size:16})]})]})]})}),document.body)]})}export{G as default};
