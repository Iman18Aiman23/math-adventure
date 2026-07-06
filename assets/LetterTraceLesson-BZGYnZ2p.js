import{r as t,S as x,p as E,j as e}from"./index-YCInXYg5.js";import{c as N}from"./confetti.module-oQXWb4Lk.js";import{T as W,L as J,a as Q}from"./TraceCanvas-DOCdVmA_.js";import{C as V}from"./Celebration-BzsEi41U.js";import{u as X}from"./useTopicGamification-I1kCte-J.js";function Z(b){const l=J.find(g=>g.char===b),i=Q.find(g=>g.char===b.toLowerCase());return{upper:l,lower:i}}function se({onBack:b,language:l="bm",topicComplete:i,onNextTopic:g,topicId:f,topicLabel:k,letters:M=[],accentColor:s="#7A4FD0"}){const[a,T]=t.useState(0),[p,y]=t.useState(!1),[d,j]=t.useState(!1),[B,C]=t.useState(!1),[R,$]=t.useState(0),[P,S]=t.useState(!1),[v,h]=t.useState("upper"),K=t.useRef(null),Y=t.useRef(null),c=t.useRef(null),{completeActivity:L}=X(f),D=t.useRef(!1);t.useEffect(()=>{B&&!D.current&&(D.current=!0,L())},[B,L]);const F=M.map(Z).filter(r=>r.upper),o=F[a],u=a>=F.length-1,H=a<=0,m=p&&d;t.useEffect(()=>()=>{x.stopSpeaking(),clearTimeout(c.current)},[]),t.useEffect(()=>{if(!o)return;x.stopSpeaking();const r=setTimeout(()=>{x.speak(o.upper.char,"ms-MY",{rate:.6,pitch:1.1})},400);return()=>{clearTimeout(r),x.stopSpeaking()}},[a,o]),t.useEffect(()=>{if(m&&(E("correct"),N({particleCount:80,spread:70,origin:{y:.5},scalar:.8}),u)){const r=setTimeout(()=>{S(!0),C(!0),i&&i(f)},700);return()=>clearTimeout(r)}},[m,u,f,i]);const U=t.useCallback(()=>{y(!0),E("correct"),N({particleCount:40,spread:60,origin:{y:.6},scalar:.7}),d||(clearTimeout(c.current),c.current=setTimeout(()=>h("lower"),900))},[d]),_=t.useCallback(()=>{j(!0),E("correct"),N({particleCount:40,spread:60,origin:{y:.6},scalar:.7}),p||(clearTimeout(c.current),c.current=setTimeout(()=>h("upper"),900))},[p]),w=t.useCallback(r=>{clearTimeout(c.current),T(r),y(!1),j(!1),h("upper"),$(n=>n+1)},[]),G=t.useCallback(()=>{if(u){S(!0),C(!0),i&&i(f);return}w(a+1)},[u,a,w,f,i]),A=t.useCallback(r=>{clearTimeout(c.current),h(r)},[]),O=t.useCallback(()=>{o&&(x.stopSpeaking(),x.speak(o.upper.char,"ms-MY",{rate:.6,pitch:1.1}))},[o]),z=()=>b?.(),q=()=>{clearTimeout(c.current),T(0),y(!1),j(!1),h("upper"),C(!1),$(r=>r+1),S(!1)};if(B){const r=l==="bm"?"Tahniah! Semua huruf selesai!":"Congratulations! All letters done!",n=l==="bm"?`Kamu telah berjaya menulis ${k}!`:`You have completed tracing ${k}!`;return e.jsxs(e.Fragment,{children:[P&&e.jsx(V,{count:30}),e.jsx("div",{style:{minHeight:"100dvh",background:"linear-gradient(180deg, #F0EBFB 0%, #DCD2F4 50%, #C4B5ED 100%)",fontFamily:"'Fredoka', system-ui, sans-serif",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px",color:"#1E293B"},children:e.jsxs("div",{style:{background:"#fff",borderRadius:28,padding:"clamp(32px,5vw,48px)",textAlign:"center",maxWidth:400,width:"100%",border:`1px solid ${s}1A`,boxShadow:"0 12px 32px -16px rgba(0,0,0,.1)"},children:[e.jsx("span",{style:{fontSize:"clamp(48px,10vw,72px)",display:"block",marginBottom:8},children:"✏️"}),e.jsx("h2",{style:{fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:"clamp(22px,4vw,28px)",margin:"0 0 6px"},children:r}),e.jsx("p",{style:{fontWeight:500,fontSize:15,color:"#64748B",margin:"0 0 24px"},children:n}),e.jsxs("div",{style:{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"},children:[e.jsxs("button",{onClick:q,style:{fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:15,cursor:"pointer",border:"none",borderRadius:999,padding:"12px 28px",color:"#fff",background:`linear-gradient(180deg, ${s}cc, ${s})`,boxShadow:`0 4px 0 ${s}66`},children:["🔄 ",l==="bm"?"Cuba Lagi":"Try Again"]}),e.jsxs("button",{onClick:z,style:{fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:15,cursor:"pointer",border:"none",borderRadius:999,padding:"12px 28px",color:"#64748B",background:"#F1F5F9",boxShadow:"0 4px 0 #CBD5E1"},children:["← ",l==="bm"?"Kembali":"Back"]})]})]})})]})}return o?e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        .ltl-root {
          height: 100dvh; overflow: hidden;
          background: linear-gradient(180deg, #F0EBFB 0%, #DCD2F4 50%, #C4B5ED 100%);
          font-family: 'Fredoka', system-ui, sans-serif;
          display: flex; flex-direction: column;
          color: #1E293B;
        }
        .ltl-topbar {
          flex-shrink: 0; position: relative;
          display: flex; align-items: center; gap: 4px;
          padding: 10px 12px; min-height: 44px;
          background: rgba(255,255,255,.88);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0,0,0,.06);
        }
        .ltl-topbar::after { content: ''; flex: 0 1 88px; }
        .ltl-back {
          flex-shrink: 0;
          display: flex; align-items: center; gap: 4px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 13px; color: #64748B;
          background: none; border: none; cursor: pointer; padding: 6px 10px;
          border-radius: 10px;
        }
        .ltl-back:hover { background: #F1F5F9; }
        @media (max-width: 480px) {
          .ltl-back-label { display: none; }
          .ltl-topbar::after { flex-basis: 42px; }
        }
        .ltl-title {
          flex: 1; min-width: 0;
          text-align: center;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(12px, 3.4vw, 14px); color: #1E293B;
        }
        .ltl-body {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column;
          padding: clamp(8px, 1.6vh, 16px) 16px;
          overflow: hidden;
        }
        .ltl-picker-wrap {
          flex-shrink: 0;
          margin-bottom: clamp(6px, 1.2vh, 12px);
          display: flex; align-items: center; gap: 10px;
          width: 100%;
        }
        .ltl-picker-label {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(11px, 2vw, 14px);
          color: #64748B; white-space: nowrap;
        }
        .ltl-picker {
          flex: 1;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: clamp(13px, 2.4vw, 16px);
          padding: clamp(5px, .8vh, 8px) clamp(8px, 1.4vw, 12px);
          border: 2px solid ${s}44;
          border-radius: 12px;
          background: #fff;
          color: #1E293B;
          cursor: pointer;
          outline: none;
          min-height: 36px;
          -webkit-appearance: none;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 10px center;
          padding-right: 32px;
        }
        .ltl-picker optgroup {
          font-family: 'Fredoka', sans-serif; font-weight: 600;
          font-size: 12px; color: #94A3B8;
        }
        .ltl-picker option {
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 14px; padding: 4px 8px;
        }
        .ltl-picker option:checked {
          background: ${s}20;
        }
        .ltl-case-pills {
          flex-shrink: 0;
          display: flex; gap: 10px; justify-content: center;
          margin-bottom: clamp(6px, 1.2vh, 12px);
        }
        .ltl-case-pill {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(13px, 2.6vw, 16px);
          display: flex; align-items: center; gap: 7px;
          padding: clamp(6px, 1vh, 9px) clamp(14px, 3.4vw, 24px);
          border-radius: 999px; cursor: pointer;
          border: 2px solid #E2E8F0; background: #fff; color: #64748B;
          transition: background .2s, border-color .2s, color .2s;
        }
        .ltl-case-pill .pill-char {
          font-weight: 900; font-size: 1.3em; line-height: 1;
        }
        .ltl-case-pill.active {
          border-color: ${s}; background: ${s}14; color: ${s};
        }
        .ltl-case-pill.done {
          border-color: #58CC02; background: #F0FBE6; color: #46A302;
        }
        .ltl-case-pill.done.active {
          background: #E2F7CC;
        }
        .ltl-canvas-area {
          flex: 1; min-height: 0;
          display: flex; justify-content: center;
          width: 100%;
        }
        .ltl-card {
          flex: 1; min-width: 0; max-width: 560px;
          background: #fff;
          border-radius: 20px;
          display: flex; flex-direction: column;
          overflow: hidden;
          border: 3px solid #E2E8F0;
          box-shadow: 0 4px 0 #CBD5E1, 0 6px 16px rgba(0,0,0,.06);
          transition: border-color .3s, box-shadow .3s;
        }
        .ltl-card.done {
          border-color: #58CC02;
          box-shadow: 0 6px 0 #46A302, 0 8px 20px rgba(88,204,2,.12);
        }
        .ltl-card-canvas {
          flex: 1; min-height: 0;
          background: #F8FAFC;
        }
        .ltl-controls {
          flex-shrink: 0;
          display: flex; justify-content: center; gap: 12px;
          padding: clamp(6px, 1vh, 12px) 0 0;
        }
        .ltl-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(12px, min(2.6vw, 2vh), 15px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(7px, 1.2vh, 10px) clamp(16px, 3vw, 24px);
          transition: transform .12s;
        }
        .ltl-btn:hover { transform: translateY(-2px); }
        .ltl-btn:active { transform: translateY(1px); }
        .ltl-btn.ghost {
          color: #64748B; background: #F1F5F9;
          box-shadow: 0 3px 0 #CBD5E1;
        }
        .ltl-btn.primary {
          color: #fff;
          background: linear-gradient(180deg, ${s}cc, ${s});
          box-shadow: 0 3px 0 ${s}66;
        }
        .ltl-btn.primary:disabled {
          opacity: .4; cursor: default; transform: none;
        }
        .ltl-footer {
          flex-shrink: 0; text-align: center;
          padding: clamp(2px, .4vh, 4px) 16px clamp(4px, .6vh, 8px);
          font-size: 10px; font-weight: 500; color: #94A3B8;
        }
        @media (max-height: 480px) {
          .ltl-footer { display: none; }
        }
      `}),e.jsxs("div",{className:"ltl-root",children:[e.jsxs("div",{className:"ltl-topbar",children:[e.jsxs("button",{className:"ltl-back",onClick:z,children:[e.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("path",{d:"M19 12H5M12 19l-7-7 7-7"})}),e.jsx("span",{className:"ltl-back-label",children:l==="bm"?"Kembali":"Back"})]}),e.jsx("span",{className:"ltl-title",children:k})]}),e.jsxs("div",{className:"ltl-body",children:[e.jsxs("div",{className:"ltl-picker-wrap",children:[e.jsx("span",{className:"ltl-picker-label",children:l==="bm"?"Huruf:":"Letter:"}),e.jsx("select",{className:"ltl-picker",value:a,onChange:r=>w(Number(r.target.value)),children:e.jsx("optgroup",{label:l==="bm"?"— Pilih Huruf —":"— Select Letter —",children:F.map((r,n)=>e.jsxs("option",{value:n,style:{color:n<a||n===a&&m?"#16A34A":"#1E293B"},children:[r.upper.char," ",n<a||n===a&&m?"✓":""]},r.upper.char))})})]}),e.jsxs("div",{className:"ltl-case-pills",children:[e.jsxs("button",{className:`ltl-case-pill${v==="upper"?" active":""}${p?" done":""}`,onClick:()=>A("upper"),children:[e.jsx("span",{className:"pill-char",children:o.upper.char}),l==="bm"?"Besar":"Big",p?" ✓":""]}),e.jsxs("button",{className:`ltl-case-pill${v==="lower"?" active":""}${d?" done":""}`,onClick:()=>A("lower"),children:[e.jsx("span",{className:"pill-char",children:o.lower?.char||o.upper.char.toLowerCase()}),l==="bm"?"Kecil":"Small",d?" ✓":""]})]}),e.jsxs("div",{className:"ltl-canvas-area",children:[e.jsx("div",{className:`ltl-card${p?" done":""}`,style:{display:v==="upper"?void 0:"none"},children:e.jsx("div",{className:"ltl-card-canvas",children:e.jsx(W,{ref:K,letter:o.upper,strokeColor:s,strokeWidth:3,onComplete:U,resetSignal:R})})}),e.jsx("div",{className:`ltl-card${d?" done":""}`,style:{display:v==="lower"?void 0:"none"},children:e.jsx("div",{className:"ltl-card-canvas",children:e.jsx(W,{ref:Y,letter:o.lower,strokeColor:s,strokeWidth:3,onComplete:_,resetSignal:R})})})]}),e.jsxs("div",{className:"ltl-controls",children:[e.jsxs("button",{className:"ltl-btn ghost",onClick:()=>w(Math.max(0,a-1)),disabled:H,children:["← ",l==="bm"?"Sebelum":"Prev"]}),e.jsxs("button",{className:"ltl-btn ghost",onClick:O,children:["🔊 ",l==="bm"?"Dengar":"Listen"]}),e.jsx("button",{className:"ltl-btn primary",disabled:!m,onClick:G,children:u?l==="bm"?"Selesai ✓":"Finish ✓":l==="bm"?"Seterusnya →":"Next →"})]})]}),e.jsxs("div",{className:"ltl-footer",children:["Bahasa Melayu KSSR · ",k]})]})]}):e.jsx("div",{style:{padding:40,textAlign:"center",color:"#94A3B8"},children:"Loading..."})}export{se as L};
