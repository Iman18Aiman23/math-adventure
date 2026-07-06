import{r as c,j as s}from"./index-YCInXYg5.js";import{B as w}from"./BMHeader-B5cOc9J_.js";import{C as k}from"./Celebration-BzsEi41U.js";import{u as F}from"./useGamification-g-vGaz2S.js";function $({onBack:p,language:e="bm",title:u,score:n,total:r,passPct:o=70,accentColor:a="#159E96",onRestart:m,onNextTopic:d,topicId:l=null,subject:v="bm"}){const t=r>0?Math.round(n/r*100):0,x=t>=80?3:t>=50?2:1,i=t>=o,[g,b]=c.useState(!1),{completeTopicAttempt:h}=F(v),f=c.useRef(!1);return c.useEffect(()=>{!l||f.current||!i||(f.current=!0,h(l,n,r))},[l,n,r,i,h]),c.useEffect(()=>{if(i){const j=setTimeout(()=>b(!0),0),y=setTimeout(()=>b(!1),2500);return()=>{clearTimeout(j),clearTimeout(y)}}},[i]),s.jsxs(s.Fragment,{children:[s.jsx("style",{children:`
        .bsc-root {
          --sp-1: clamp(4px, 0.8vh, 8px);
          --sp-2: clamp(8px, 1.6vh, 14px);
          height: 100dvh; overflow: hidden;
          background:
            radial-gradient(ellipse 75% 55% at 14% 0%, ${a}21 0%, transparent 58%),
            radial-gradient(ellipse 65% 48% at 90% 100%, ${a}1a 0%, transparent 62%),
            linear-gradient(180deg, #FDFEFF 0%, #F3F6FB 100%);
          font-family: 'Fredoka', system-ui, sans-serif;
          color: #1E293B;
          display: flex; flex-direction: column;
        }
        .bsc-body {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          width: 100%; max-width: 560px;
          margin: 0 auto;
          padding: var(--sp-2) clamp(14px, 3.5vw, 28px);
        }
        .bsc-card {
          position: relative;
          width: 100%;
          background: #fff;
          border: 2.5px solid ${a}33;
          border-radius: clamp(18px, 3vh, 28px);
          padding: clamp(18px, 3.4vh, 30px) clamp(16px, 4.5vw, 30px);
          box-shadow: 0 clamp(3px, 0.6vh, 5px) 0 ${a}2e, 0 16px 34px -18px rgba(0,0,0,.18);
          text-align: center;
        }
        .bsc-stars-row {
          display: flex; align-items: center; justify-content: center;
          gap: 10px; margin-bottom: var(--sp-1);
        }
        .bsc-stars {
          font-size: clamp(24px, 4.6vh, 32px);
          letter-spacing: 2px;
        }
        .bsc-score {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(24px, 4.6vh, 32px); color: ${a};
        }
        .bsc-gate {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(12px, 2.4vh, 14px); border-radius: 999px;
          padding: clamp(4px, 0.9vh, 6px) clamp(14px, 3vw, 18px);
          margin: 2px auto var(--sp-1);
          display: inline-block;
        }
        .bsc-gate.pass { color: #166534; background: #F0FDF4; border: 1.5px solid #BBF7D0; }
        .bsc-gate.fail { color: #991B1B; background: #FEF2F2; border: 1.5px solid #FECACA; }
        .bsc-msg {
          font-weight: 600; font-size: clamp(12px, 2.4vh, 14px); color: #64748B;
          margin: 0 0 clamp(10px, 2vh, 14px);
        }
        .bsc-actions {
          display: flex; gap: 10px; flex-wrap: wrap;
          justify-content: center;
        }
        .bsc-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(13px, 2.6vh, 16px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(9px, 1.8vh, 12px) clamp(20px, 5vw, 28px);
          transition: transform .12s ease;
        }
        .bsc-btn:active { transform: translateY(2px); }
        @media (hover: hover) {
          .bsc-btn:hover { transform: translateY(-2px); }
        }
        .bsc-btn.primary {
          color: #fff;
          background: linear-gradient(180deg, ${a}cc, ${a});
          box-shadow: 0 4px 0 ${a}99;
        }
        .bsc-btn.secondary {
          color: #64748B; background: #F1F5F9;
          box-shadow: 0 4px 0 #CBD5E1;
        }

        /* ── Desktop / laptop scale-up ── */
        @media (min-width: 900px) {
          .bsc-body { max-width: 640px; }
          .bsc-card { padding: min(40px, 4.4vh) 48px; border-radius: 32px; }
          .bsc-stars, .bsc-score { font-size: min(36px, 5vh); }
          .bsc-gate { font-size: min(15px, 2.4vh); padding: min(7px, 1vh) 20px; }
          .bsc-msg { font-size: min(15px, 2.4vh); margin-bottom: min(16px, 2vh); }
          .bsc-btn { font-size: min(17px, 2.6vh); padding: min(13px, 1.8vh) 32px; }
        }
      `}),s.jsxs("div",{className:"bsc-root",children:[s.jsx(w,{onBack:p,language:e,title:u}),s.jsx("div",{className:"bsc-body",children:s.jsxs("div",{className:"bsc-card",children:[g&&s.jsx(k,{count:20}),s.jsxs("div",{className:"bsc-stars-row",children:[s.jsxs("div",{className:"bsc-stars",children:["⭐".repeat(x),"☆".repeat(3-x)]}),s.jsxs("div",{className:"bsc-score",children:[n," / ",r]})]}),i?s.jsxs("div",{className:"bsc-gate pass",children:["🎉 ",e==="bm"?"LULUS!":"PASSED!"," (",t,"%)"]}):s.jsx("div",{className:"bsc-gate fail",children:e==="bm"?`Skor minima ${o}% diperlukan untuk lulus topik ini.`:`You need at least ${o}% to pass this topic.`}),s.jsx("p",{className:"bsc-msg",children:t>=80?e==="bm"?"Hebat! Kamu memang bijak!":"Excellent! You're brilliant!":i?e==="bm"?"Bagus! Teruskan belajar!":"Good! Keep learning!":e==="bm"?"Jangan putus asa — cuba lagi!":"Don't give up — try again!"}),s.jsx("div",{className:"bsc-actions",children:i?s.jsxs(s.Fragment,{children:[d?s.jsx("button",{className:"bsc-btn primary",onClick:d,children:e==="bm"?"Topik Seterusnya →":"Next Topic →"}):s.jsx("button",{className:"bsc-btn primary",onClick:p,children:e==="bm"?"← Kembali ke Trail":"← Back to Trail"}),s.jsxs("button",{className:"bsc-btn secondary",onClick:m,children:["🔄 ",e==="bm"?"Cuba Lagi":"Try Again"]})]}):s.jsxs(s.Fragment,{children:[s.jsxs("button",{className:"bsc-btn primary",onClick:m,children:["🔄 ",e==="bm"?"Cuba Lagi":"Try Again"]}),s.jsx("button",{className:"bsc-btn secondary",onClick:p,children:e==="bm"?"← Kembali ke Trail":"← Back to Trail"})]})})]})})]})]})}export{$ as B};
