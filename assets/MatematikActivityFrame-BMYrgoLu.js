import{r as s,F as H,j as e,p as N}from"./index-YCInXYg5.js";import{c as S}from"./confetti.module-oQXWb4Lk.js";const T=.8;function L(r,c,n,m){if(!(!r||!c||typeof localStorage>"u"))try{const p=JSON.parse(localStorage.getItem(r)||"{}"),f=p[c];(!f||n>f.best)&&(p[c]={best:n,total:m,passed:n/m>=T},localStorage.setItem(r,JSON.stringify(p)))}catch{}}function Q({buildRound:r,renderQuestion:c,theme:n,onExit:m,scoreStorageKey:p,scoreId:f,hideChangeStrip:Y=!1,changeLabel:I="Tukar Jenis",onChangeType:B}){const u=s.useContext(H),[l,W]=s.useState(()=>r()),[g,C]=s.useState(0),[b,y]=s.useState(null),[i,E]=s.useState(0),[v,z]=s.useState(0),[x,k]=s.useState(0),[J,F]=s.useState(!1),t=l[g];if(!t)return null;const o=b!==null,j=o&&b===t.answer,A=g+1>=l.length,w=l.length,R=w>0?Math.round(i/w*100):0,$=Math.ceil(w*T),h=i>=$,a={accent:n.accent||"#F59E0B",dark:n.dark||"#B45309",cd:n.cd||"#92400E",green:"#16A34A",red:"#DC2626"},O=M=>{o||(y(M),M===t.answer?(E(d=>d+1),k(d=>d+1),N("correct"),S({particleCount:45,spread:60,startVelocity:32,origin:{y:.7},scalar:.85})):(z(d=>d+1),k(0),N("wrong")))},q=()=>{if(A){L(p,f,i,l.length),F(!0),N("streak"),S({particleCount:200,spread:160,origin:{y:.4}}),setTimeout(()=>S({particleCount:140,spread:120,startVelocity:45,origin:{y:.55}}),250);return}y(null),C(g+1)},P=()=>{W(r()),C(0),y(null),E(0),z(0),k(0),F(!1)},D=x>0&&x%10===0?10:x%10,X={answered:o,selected:b,answer:t.answer,isCorrect:j,handlePick:O,handleNext:q,streak:x,correct:i,wrong:v,theme:a};return e.jsxs("div",{style:{display:"flex",flexDirection:"column",height:"100%",minHeight:0,width:"100%"},children:[e.jsx("style",{children:`
        .maf-top-strip {
          flex-shrink: 0; display: flex; align-items: center; justify-content: flex-end;
          padding: clamp(4px, 0.8vmin, 10px) clamp(12px, 2vmin, 20px);
          background: rgba(255,255,255,.7); backdrop-filter: blur(8px);
          border-bottom: 1px solid #E2E8F0;
        }
        .maf-tukar-btn {
          border: none; background: transparent; cursor: pointer;
          display: flex; align-items: center; gap: 3px; padding: 4px 8px; border-radius: 8px;
          font-family: 'Fredoka', sans-serif; font-weight: 700;
          font-size: clamp(12px, 1.4vmin, 14px); color: ${a.dark};
          transition: background .15s ease; -webkit-tap-highlight-color: transparent;
        }
        .maf-tukar-btn:hover { background: rgba(0,0,0,.05); }
        .maf-tukar-btn:active { transform: translateY(1px); }
        .maf-scroll { flex: 1; min-height: 0; overflow-y: auto; -webkit-overflow-scrolling: touch; }
        .maf-center {
          min-height: 100%; box-sizing: border-box;
          display: flex; flex-direction: column; justify-content: center; align-items: center;
          padding: clamp(14px, 3vmin, 40px);
        }
        .maf-content {
          width: 100%; max-width: min(94vw, 860px);
          display: flex; flex-direction: column; align-items: center;
          gap: clamp(8px, 1.6vmin, 18px);
        }
        .maf-head {
          font-family: 'Fredoka', sans-serif; font-weight: 700;
          font-size: clamp(14px, 2.4vmin, 24px); color: #64748B; text-align: center; letter-spacing: .01em;
        }
        /* Header sits as a TITLE near the top; body centred in the space below. */
        .maf-scroll-q { display: flex; flex-direction: column; }
        .maf-head-title { flex-shrink: 0; padding: clamp(10px, 2.4vmin, 22px) 16px clamp(2px, 0.6vmin, 8px); }
        .maf-body {
          flex: 1 0 auto; box-sizing: border-box;
          display: flex; flex-direction: column; justify-content: center; align-items: center;
          padding: clamp(6px, 1.4vmin, 14px) clamp(14px, 3vmin, 40px) clamp(8px, 1.6vmin, 16px);
        }
        .maf-question {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(22px, 4.6vmin, 44px); color: #1E293B; text-align: center; line-height: 1.15;
        }
        .maf-feedback {
          font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(17px, 2.6vmin, 28px);
          text-align: center; min-height: clamp(24px, 3.4vmin, 38px);
          display: flex; align-items: center; justify-content: center;
        }
        .maf-feedback.ok { color: ${a.green}; }
        .maf-feedback.no { color: ${a.red}; }
        .maf-next {
          padding: clamp(11px, 1.5vmin, 17px) clamp(28px, 4vmin, 52px); border: none; border-radius: 999px;
          background: ${a.accent}; color: #fff;
          font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(17px, 2.6vmin, 26px);
          cursor: pointer; box-shadow: 0 4px 0 ${a.cd}; transition: transform .1s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .maf-next:hover:not(:disabled) { transform: translateY(-2px); }
        .maf-next:active:not(:disabled) { transform: translateY(2px); }
        .maf-next:disabled { background: #E5E7EB; color: #9CA3AF; box-shadow: 0 4px 0 #D1D5DB; cursor: not-allowed; }
        .maf-footer {
          flex-shrink: 0; display: flex; align-items: center; justify-content: space-between;
          gap: 10px; padding: clamp(8px, 1.2vmin, 15px) clamp(16px, 2.4vmin, 34px);
          background: rgba(255,255,255,.85); backdrop-filter: blur(12px);
          border-top: 1px solid #E2E8F0;
        }
        .maf-footer-tally {
          display: flex; align-items: center; gap: 6px 10px; flex-wrap: wrap;
          font-family: 'Fredoka', sans-serif; font-size: clamp(13px, 1.7vmin, 18px); font-weight: 600; color: #64748B;
        }
        .maf-stats { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
        .maf-stats .maf-stat { display: inline-flex; align-items: center; gap: 3px; }
        .maf-stats .maf-divider { color: #CBD5E1; font-weight: 400; }
        .maf-done-emoji { font-size: clamp(52px, 14vmin, 120px); line-height: 1; }
        .maf-summary { display: flex; flex-direction: column; gap: clamp(8px, 1.4vmin, 14px); width: 100%; max-width: 340px; }
        .maf-summary-row {
          display: flex; align-items: center; justify-content: space-between;
          background: #fff; border: 2px solid #E2E8F0; border-radius: 14px;
          padding: clamp(10px, 1.6vmin, 16px) clamp(16px, 2.4vmin, 26px);
          font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(16px, 2.4vmin, 22px); color: #334155;
        }
        .maf-summary-row b { font-size: clamp(20px, 3vmin, 28px); }
        .maf-summary-row.ok b { color: ${a.green}; }
        .maf-summary-row.no b { color: ${a.red}; }
        .maf-complete-actions { display: flex; flex-wrap: wrap; gap: clamp(10px, 1.6vmin, 16px); justify-content: center; }
        .maf-btn-secondary {
          padding: clamp(11px, 1.5vmin, 17px) clamp(24px, 3.4vmin, 44px); border-radius: 999px;
          border: 2px solid ${a.accent}; background: #fff; color: ${a.dark};
          font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(16px, 2.4vmin, 24px);
          cursor: pointer; -webkit-tap-highlight-color: transparent; transition: transform .1s ease;
        }
        .maf-btn-secondary:active { transform: translateY(1px); }
        @keyframes snkBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes snkShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
      `}),!Y&&e.jsx("div",{className:"maf-top-strip",children:e.jsxs("button",{type:"button",className:"maf-tukar-btn",onClick:()=>B?B():m?.(),children:[I," ⟲"]})}),J?e.jsx("div",{className:"maf-scroll",children:e.jsx("div",{className:"maf-center",children:e.jsxs("div",{className:"maf-content",style:{textAlign:"center"},children:[e.jsx("div",{className:"maf-done-emoji",children:h?"🎉":"💪"}),e.jsx("div",{className:"maf-question",children:h?"Tahniah!":"Cuba lagi!"}),e.jsxs("div",{className:"maf-head",children:["Skor kamu: ",i,"/",l.length," (",R,"%)"]}),e.jsxs("div",{className:"maf-summary",children:[e.jsxs("div",{className:"maf-summary-row ok",children:[e.jsx("span",{children:"✅ Betul"}),e.jsx("b",{children:i})]}),e.jsxs("div",{className:"maf-summary-row no",children:[e.jsx("span",{children:"❌ Salah"}),e.jsx("b",{children:v})]})]}),!h&&e.jsxs("div",{className:"maf-head",style:{color:"#B45309"},children:["Dapat ",$,"/",l.length," (80%) untuk buka topik seterusnya"]}),e.jsxs("div",{className:"maf-complete-actions",children:[e.jsx("button",{className:"maf-btn-secondary",type:"button",onClick:P,children:"↻ Main Semula"}),e.jsx("button",{className:"maf-next",type:"button",disabled:!h,onClick:()=>u?.goNext?u.goNext():m?.(),children:u?.hasNext===!1?"Selesai ✓":"Topik Seterusnya →"})]})]})})}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"maf-scroll maf-scroll-q",children:[e.jsx("div",{className:"maf-head maf-head-title",children:t.header}),e.jsx("div",{className:"maf-body",children:e.jsxs("div",{className:"maf-content",children:[t.prompt&&e.jsx("div",{className:"maf-question",children:t.prompt}),c(t,X),e.jsx("div",{className:`maf-feedback ${o?j?"ok":"no":""}`,children:o?j?"Betul! 🎉":"Cuba lagi":""}),o&&e.jsx("button",{className:"maf-next",type:"button",onClick:q,children:A?"Tamat 🎉":"Seterusnya →"})]})})]}),e.jsxs("div",{className:"maf-footer",children:[e.jsxs("div",{className:"maf-footer-tally",children:[e.jsx("span",{children:"Jawapan :"}),e.jsxs("span",{className:"maf-stats",children:[e.jsxs("span",{className:"maf-stat",style:{color:"#1E293B"},children:[e.jsx("span",{children:"✅"}),e.jsx("span",{children:i}),e.jsx("span",{style:{color:"#94A3B8",fontWeight:500},children:"Betul"})]}),e.jsx("span",{className:"maf-divider",children:"|"}),e.jsxs("span",{className:"maf-stat",style:{color:"#EF4444"},children:[e.jsx("span",{children:"❌"}),e.jsx("span",{children:v}),e.jsx("span",{style:{color:"#94A3B8",fontWeight:500},children:"salah"})]})]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4},children:[e.jsx("span",{style:{fontSize:18},children:"🏆"}),e.jsx("div",{style:{width:70,height:7,background:"rgba(204,119,0,0.15)",borderRadius:4,overflow:"hidden"},children:e.jsx("div",{style:{width:`${D/10*100}%`,height:"100%",background:"#FFB800",borderRadius:4,transition:"width .3s ease-out"}})}),e.jsxs("span",{style:{color:"#CC7700",fontSize:"0.85rem",fontWeight:900,minWidth:28,textAlign:"right"},children:[D,"/10"]})]})]})]})]})}export{Q as M,L as r};
