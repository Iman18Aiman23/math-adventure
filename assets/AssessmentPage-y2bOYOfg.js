import{j as t,r as d}from"./index-YCInXYg5.js";import{M as O}from"./MascotIcon-BBMT1tUp.js";const D=e=>{const i={easy:[1,10],medium:[10,50],hard:[100,999]},[s,o]=i[e]||[1,10];return Math.floor(Math.random()*(o-s+1))+s},_=(e,i)=>{const s=new Set([e]),o=[1,2,3,5,7,10];for(;s.size<4;){const r=o[Math.floor(Math.random()*o.length)]*(Math.random()>.5?1:-1),a=Math.max(0,e+r);a!==e&&!s.has(a)&&s.add(a)}return Array.from(s).sort(()=>Math.random()-.5)},J=(e,i,s)=>{let o=D(i),r=D(i),a,n,m=Math.random().toString(36).substr(2,9);switch(e==="subtraction"&&r>o&&([o,r]=[r,o]),e.toLowerCase()){case"addition":a=o+r,n=`${o} + ${r}`;break;case"subtraction":a=o-r,n=`${o} - ${r}`;break;case"multiplication":a=o*r,n=`${o} × ${r}`;break;case"division":a=o,r=Math.floor(Math.random()*10)+1,n=`${a*r} ÷ ${r}`;break;default:a=o+r,n=`${o} + ${r}`}let l=[];return s==="multiple-choice"&&(l=_(a)),{id:m,question:n,answer:parseInt(a),options:l.length>0?l:void 0,topic:e,difficulty:i,questionType:s,num1:o,num2:r,symbol:e==="addition"?"+":e==="subtraction"?"-":e==="multiplication"?"×":"÷"}},q=e=>{const{totalQuestions:i=30,topic:s,level:o,questionType:r}=e;if(!s)return console.error("Invalid assessment config: missing topic",e),[];if(!o)return console.error("Invalid assessment config: missing level",e),[];const a=r||"multiple-choice",n=[];for(let m=0;m<i;m++){const l=J(s,o,a);l.questionType||(l.questionType=a),n.push(l)}return console.log("Generated questions config:",{totalQuestions:n.length,topic:s,level:o,questionType:a,sampleQuestion:n[0]}),n},V=(e,i)=>{let s=0;return e.forEach(o=>{const r=i[o.id];r!==void 0&&parseInt(r)===o.answer&&s++}),{correct:s,total:e.length,percentage:Math.round(s/e.length*100),score:s}},X=e=>{const i=["id","name","topic","level","questionType","totalQuestions","duration","scoreTarget"],s=[];if(i.forEach(m=>{(e[m]===void 0||e[m]===null)&&s.push(m)}),s.length>0)return console.error("Assessment validation failed. Missing fields:",s),console.error("Assessment object:",e),{valid:!1,errors:s,assessment:e};const o=[],r=["addition","subtraction","multiplication","division"];r.includes(e.topic)||o.push(`Invalid topic: ${e.topic}. Must be one of: ${r.join(", ")}`);const a=["easy","medium","hard"];a.includes(e.level)||o.push(`Invalid level: ${e.level}. Must be one of: ${a.join(", ")}`);const n=["multiple-choice","text-input","long-method"];return n.includes(e.questionType)||o.push(`Invalid questionType: ${e.questionType}. Must be one of: ${n.join(", ")}`),(e.totalQuestions<1||!Number.isInteger(e.totalQuestions))&&o.push(`Invalid totalQuestions: ${e.totalQuestions}. Must be a positive integer.`),(e.duration<1||!Number.isInteger(e.duration))&&o.push(`Invalid duration: ${e.duration}. Must be a positive integer (minutes).`),(e.scoreTarget<1||!Number.isInteger(e.scoreTarget))&&o.push(`Invalid scoreTarget: ${e.scoreTarget}. Must be a positive integer.`),o.length>0?(console.error("Assessment validation errors:",o),{valid:!1,errors:o,assessment:e}):{valid:!0,errors:[],assessment:e}},Z=e=>({id:e.id,name:e.name,topic:e.topic,level:e.level,questionType:e.questionType,totalQuestions:e.totalQuestions,duration:`${e.duration} min`,scoreTarget:e.scoreTarget}),ee=e=>["🍎","🍇","🍌","🍉","🍓","🍒","🥭","🍍","🍊","🥝"][Math.min(e-1,9)],te=e=>["🐱","🐰","🐄","🐐","🐶","🦊","🐻","🐼","🐨","🦁"][Math.min(e-1,9)],B=({question:e,answer:i,onChange:s,disabled:o})=>{try{if(!e||!e.options)return t.jsx("div",{style:{padding:"2rem",textAlign:"center"},children:"Loading question..."});const a=(l=>l?.includes("addition")||l?.includes("subtraction")||l?.includes("multiplication")?ee(1):te(1))(e?.topic),n=e?.num1&&e?.num2&&e?.num1<=10&&e?.num2<=10,m=l=>{o||s(l.toString())};return t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2rem",width:"100%",alignItems:"center"},children:[n&&t.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"1.5rem",flexWrap:"wrap",minHeight:"60px"},children:[t.jsx("div",{style:{display:"flex",gap:"0.3rem",flexWrap:"wrap",justifyContent:"center",minWidth:"60px",maxWidth:"150px"},children:Array.from({length:e.num1}).map((l,p)=>t.jsx("span",{style:{fontSize:"1.8rem",lineHeight:"1"},children:a},`n1-${p}`))}),t.jsx("div",{style:{fontSize:"1.8rem",fontWeight:900,color:"#4A90E2"},children:e.symbol||"+"}),t.jsx("div",{style:{display:"flex",gap:"0.3rem",flexWrap:"wrap",justifyContent:"center",minWidth:"60px",maxWidth:"150px"},children:Array.from({length:e.num2}).map((l,p)=>t.jsx("span",{style:{fontSize:"1.8rem",lineHeight:"1"},children:a},`n2-${p}`))})]}),t.jsxs("div",{style:{fontSize:"2.5rem",fontWeight:900,color:"#2D4059",textAlign:"center"},children:[e.question," = ?"]}),t.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",width:"100%",maxWidth:"500px",margin:"0 auto"},children:e.options.map((l,p)=>{const y=["A","B","C","D"];return t.jsxs("button",{onClick:()=>m(l),disabled:o,style:{padding:"1rem 1.2rem",fontSize:"1.1rem",fontWeight:700,backgroundColor:i===l.toString()?"#58CC02":"#F5F5F5",color:"#2D4059",border:i===l.toString()?"3px solid #58CC02":"2px solid #E0E0E0",borderRadius:"10px",cursor:o?"not-allowed":"pointer",transition:"all 0.3s ease",minHeight:"70px",minWidth:"120px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"relative",opacity:o?.6:1},onMouseEnter:u=>{!o&&i!==l.toString()&&(u.target.style.backgroundColor="#E8F5E9",u.target.style.borderColor="#58CC02",u.target.style.transform="scale(1.05)")},onMouseLeave:u=>{!o&&i!==l.toString()&&(u.target.style.backgroundColor="#F5F5F5",u.target.style.borderColor="#E0E0E0",u.target.style.transform="scale(1)")},children:[t.jsx("span",{style:{fontSize:"0.8rem",fontWeight:600,opacity:.7,position:"absolute",top:"0.5rem",left:"0.5rem"},children:y[p]}),t.jsx("span",{style:{fontSize:"1.4rem",fontWeight:700},children:l})]},p)})})]})}catch(r){return console.error("MultipleChoice error:",r),t.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"200px",color:"#CC3B3B",fontSize:"1rem"},children:"⚠️ Error loading question"})}},re=({question:e,answer:i,onChange:s,onSubmit:o,disabled:r,autoFocus:a})=>{const n=d.useRef(null);d.useEffect(()=>{a&&n.current&&n.current.focus()},[a,e.id]);const m=l=>{l.key==="Enter"&&!r&&o?.()};return t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1.5rem",width:"100%",maxWidth:"500px"},children:[t.jsx("div",{style:{fontSize:"1.8rem",fontWeight:700,color:"#2D4059",textAlign:"center"},children:e.question}),t.jsxs("div",{style:{display:"flex",gap:"0.5rem",width:"100%"},children:[t.jsx("input",{ref:n,type:"number",value:i||"",onChange:l=>s(l.target.value),onKeyPress:m,disabled:r,placeholder:"Enter your answer",style:{flex:1,padding:"1rem",fontSize:"1.2rem",fontWeight:700,border:"2px solid #E0E0E0",borderRadius:"8px",outline:"none",transition:"all 0.3s ease",backgroundColor:r?"#F5F5F5":"white",color:"#2D4059",opacity:r?.6:1},onFocus:l=>{r||(l.target.style.borderColor="#58CC02",l.target.style.boxShadow="0 0 0 3px rgba(88, 204, 2, 0.1)")},onBlur:l=>{l.target.style.borderColor="#E0E0E0",l.target.style.boxShadow="none"}}),t.jsx("button",{onClick:o,disabled:r||!i,style:{padding:"1rem 1.5rem",fontSize:"1rem",fontWeight:700,backgroundColor:r||!i?"#CCC":"#58CC02",color:"white",border:"none",borderRadius:"8px",cursor:r||!i?"not-allowed":"pointer",transition:"all 0.3s ease",minWidth:"120px"},onMouseEnter:l=>{!r&&i&&(l.target.style.backgroundColor="#46A302")},onMouseLeave:l=>{!r&&i&&(l.target.style.backgroundColor="#58CC02")},children:"Submit"})]}),t.jsx("div",{style:{fontSize:"0.9rem",color:"#999",textAlign:"center"},children:"Type your answer and press Enter or click Submit"})]})},ne=({question:e,answer:i,onChange:s,onSubmit:o,disabled:r,autoFocus:a})=>{const n=d.useRef(null);d.useEffect(()=>{a&&n.current&&n.current.focus()},[a,e.id]);const m=()=>{const g=e.question.match(/(\d+)\s*([\+\-\×÷])\s*(\d+)/);return g?{num1:g[1],op:g[2],num2:g[3]}:{num1:"",op:"",num2:""}},{num1:l,op:p,num2:y}=m(),u=g=>{g.key==="Enter"&&!r&&o?.()};return t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2rem",width:"100%",maxWidth:"400px"},children:[t.jsx("div",{style:{fontSize:"1.2rem",fontWeight:600,color:"#666",marginBottom:"1rem"},children:"Solve using long method"}),t.jsxs("div",{style:{backgroundColor:"#FFFEF9",border:"2px solid #E0D5C8",borderRadius:"8px",padding:"2rem",fontFamily:"monospace",fontSize:"1.5rem",fontWeight:700,color:"#2D4059",lineHeight:"2.5",display:"flex",flexDirection:"column",alignItems:"flex-end",minHeight:"200px",justifyContent:"center"},children:[t.jsx("div",{style:{marginBottom:"0.5rem"},children:l}),t.jsxs("div",{style:{marginBottom:"1rem",paddingBottom:"0.5rem",borderBottom:"3px solid #2D4059",width:"100%",textAlign:"right"},children:[p," ",y]}),t.jsx("input",{ref:n,type:"number",value:i||"",onChange:g=>s(g.target.value),onKeyPress:u,disabled:r,placeholder:"?",style:{width:"100%",padding:"0.5rem",fontSize:"1.5rem",fontWeight:700,border:"2px solid #E0E0E0",borderRadius:"4px",outline:"none",textAlign:"right",fontFamily:"monospace",backgroundColor:r?"#F5F5F5":"white",color:"#2D4059",opacity:r?.6:1},onFocus:g=>{r||(g.target.style.borderColor="#58CC02",g.target.style.boxShadow="0 0 0 3px rgba(88, 204, 2, 0.1)")},onBlur:g=>{g.target.style.borderColor="#E0E0E0",g.target.style.boxShadow="none"}})]}),t.jsx("button",{onClick:o,disabled:r||!i,style:{padding:"1rem 2rem",fontSize:"1rem",fontWeight:700,backgroundColor:r||!i?"#CCC":"#58CC02",color:"white",border:"none",borderRadius:"8px",cursor:r||!i?"not-allowed":"pointer",transition:"all 0.3s ease",width:"100%"},onMouseEnter:g=>{!r&&i&&(g.target.style.backgroundColor="#46A302")},onMouseLeave:g=>{!r&&i&&(g.target.style.backgroundColor="#58CC02")},children:"Submit Answer"})]})},oe=({question:e,answer:i,onChange:s,onSubmit:o,disabled:r,autoFocus:a})=>{e.questionType||console.warn("Question missing questionType:",e);const n=e.questionType||"multiple-choice";switch(console.log("Rendering question type:",n),n){case"multiple-choice":return t.jsx(B,{question:e,answer:i,onChange:s,disabled:r});case"text-input":return t.jsx(re,{question:e,answer:i,onChange:s,onSubmit:o,disabled:r,autoFocus:a});case"long-method":return t.jsx(ne,{question:e,answer:i,onChange:s,onSubmit:o,disabled:r,autoFocus:a});default:return t.jsx(B,{question:e,answer:i,onChange:s,disabled:r})}},ie=({totalQuestions:e,currentQuestion:i,answeredQuestions:s,onSelectQuestion:o,isMobile:r})=>{if(r)return null;const a=n=>n===i?{backgroundColor:"#4A90E2",color:"white"}:s.has(n)?{backgroundColor:"#58CC02",color:"white"}:{backgroundColor:"#F5F5F5",color:"#999"};return t.jsxs("div",{style:{width:"250px",backgroundColor:"#FAFAFA",borderRight:"2px solid #E5E5E5",padding:"1.5rem",display:"flex",flexDirection:"column",gap:"1rem",height:"100%",overflowY:"auto"},children:[t.jsx("div",{style:{fontSize:"1rem",fontWeight:700,color:"#2D4059",marginBottom:"0.5rem"},children:"Question Navigator"}),t.jsxs("div",{style:{fontSize:"0.8rem",color:"#999",marginBottom:"1rem"},children:[t.jsxs("div",{style:{marginBottom:"0.5rem"},children:[t.jsx("span",{style:{display:"inline-block",width:"16px",height:"16px",backgroundColor:"#4A90E2",borderRadius:"4px",marginRight:"0.5rem"}})," Current"]}),t.jsxs("div",{style:{marginBottom:"0.5rem"},children:[t.jsx("span",{style:{display:"inline-block",width:"16px",height:"16px",backgroundColor:"#58CC02",borderRadius:"4px",marginRight:"0.5rem"}})," Answered"]}),t.jsxs("div",{children:[t.jsx("span",{style:{display:"inline-block",width:"16px",height:"16px",backgroundColor:"#F5F5F5",border:"2px solid #E0E0E0",borderRadius:"4px",marginRight:"0.5rem"}})," Unvisited"]})]}),t.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"0.75rem"},children:Array.from({length:e},(n,m)=>m+1).map(n=>t.jsx("button",{onClick:()=>o(n-1),style:{padding:"0.75rem",fontSize:"0.9rem",fontWeight:700,border:"none",borderRadius:"6px",cursor:"pointer",transition:"all 0.3s ease",...a(n)},onMouseEnter:m=>{n!==i&&!s.has(n)&&(m.target.style.backgroundColor="#E8F5E9")},onMouseLeave:m=>{n!==i&&!s.has(n)&&(m.target.style.backgroundColor="#F5F5F5")},children:n},n))}),t.jsxs("div",{style:{marginTop:"auto",paddingTop:"1rem",borderTop:"2px solid #E5E5E5",fontSize:"0.85rem",color:"#666"},children:[t.jsxs("div",{style:{marginBottom:"0.5rem"},children:["Answered: ",s.size," / ",e]}),t.jsx("div",{style:{width:"100%",height:"8px",backgroundColor:"#E0E0E0",borderRadius:"4px",overflow:"hidden"},children:t.jsx("div",{style:{width:`${s.size/e*100}%`,height:"100%",backgroundColor:"#58CC02",transition:"width 0.3s ease"}})})]})]})},se=({assessment:e,score:i,onRetry:s,onBack:o,language:r="eng"})=>{const a=i.score>=e.scoreTarget,n=i.percentage;return t.jsxs("div",{className:`cert-page ${a?"cert-passed":"cert-failed"}`,children:[t.jsx("style",{children:`
        .cert-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          overflow: hidden;
          padding: 1rem;
          font-family: var(--font-heading);
        }
        .cert-page.cert-passed {
          background: linear-gradient(135deg, #E8F5E9, #F1F8E9);
        }
        .cert-page.cert-failed {
          background: linear-gradient(135deg, #FFEBEE, #FCE4EC);
        }

        /* ── Card ── */
        .cert-card {
          background-color: white;
          border-radius: 16px;
          padding: 1.5rem 1.25rem;
          max-width: 500px;
          width: 100%;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          max-height: 95vh;
          overflow-y: auto;
        }

        /* ── Mascot ── */
        .cert-mascot {
          margin-bottom: 0.75rem;
        }

        /* ── Title ── */
        .cert-title {
          font-size: 1.5rem;
          font-weight: 900;
          margin: 0 0 0.4rem 0;
          letter-spacing: 1px;
        }
        .cert-passed .cert-title { color: #2E7D32; }
        .cert-failed .cert-title { color: #C62828; }

        /* ── Assessment Name ── */
        .cert-name {
          font-size: 0.9rem;
          color: #555;
          margin: 0.4rem 0;
          font-weight: 600;
        }

        /* ── Score Box ── */
        .cert-score-box {
          border-radius: 12px;
          padding: 1rem;
          margin: 0.75rem 0;
          width: 100%;
          box-sizing: border-box;
        }
        .cert-passed .cert-score-box {
          background-color: #E8F5E9;
          border: 3px solid #4CAF50;
        }
        .cert-failed .cert-score-box {
          background-color: #FFEBEE;
          border: 3px solid #F44336;
        }
        .cert-percentage {
          font-size: 2rem;
          font-weight: 900;
          margin-bottom: 0.3rem;
        }
        .cert-passed .cert-percentage { color: #4CAF50; }
        .cert-failed .cert-percentage { color: #F44336; }
        .cert-correct {
          font-size: 0.85rem;
          color: #666;
          margin-bottom: 0.5rem;
        }

        /* ── Progress Bar ── */
        .cert-progress-track {
          width: 100%;
          height: 10px;
          background-color: #E0E0E0;
          border-radius: 5px;
          overflow: hidden;
        }
        .cert-progress-fill {
          height: 100%;
          transition: width 1s ease-out;
        }
        .cert-passed .cert-progress-fill { background-color: #4CAF50; }
        .cert-failed .cert-progress-fill { background-color: #F44336; }

        /* ── Info Text ── */
        .cert-info {
          font-size: 0.78rem;
          color: #999;
          margin: 0.75rem 0;
          font-style: italic;
          line-height: 1.4;
        }

        /* ── Buttons ── */
        .cert-buttons {
          display: flex;
          gap: 0.75rem;
          margin-top: 0.75rem;
          flex-wrap: wrap;
          justify-content: center;
          width: 100%;
        }
        .cert-btn {
          padding: 0.65rem 1.25rem;
          font-size: 0.82rem;
          font-weight: 700;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .cert-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.08);
        }
        .cert-btn-retry {
          background-color: #4A90E2;
          color: white;
        }
        .cert-btn-back {
          border: 2px solid #E0E0E0;
        }
        .cert-passed .cert-btn-back {
          background-color: #58CC02;
          color: white;
          border-color: #58CC02;
        }
        .cert-failed .cert-btn-back {
          background-color: #F5F5F5;
          color: #2D4059;
        }

        /* ═══════════════════════════════════════════
           Small (Landscape Phones): min-width 576px
           ═══════════════════════════════════════════ */
        @media (min-width: 576px) {
          .cert-page { padding: 1.5rem; }
          .cert-card { padding: 1.75rem 1.5rem; border-radius: 18px; }
          .cert-title { font-size: 1.75rem; }
          .cert-name { font-size: 1rem; }
          .cert-score-box { padding: 1.25rem; margin: 1rem 0; }
          .cert-percentage { font-size: 2.25rem; }
          .cert-correct { font-size: 0.9rem; }
          .cert-progress-track { height: 11px; }
          .cert-info { font-size: 0.82rem; }
          .cert-buttons { gap: 0.85rem; }
          .cert-btn { padding: 0.7rem 1.4rem; font-size: 0.88rem; }
        }

        /* ═══════════════════════════════════════
           Medium (Tablets): min-width 768px
           ═══════════════════════════════════════ */
        @media (min-width: 768px) {
          .cert-page { padding: 2rem; }
          .cert-card { padding: 2rem 1.75rem; max-width: 540px; border-radius: 20px; }
          .cert-mascot { margin-bottom: 1rem; }
          .cert-title { font-size: 2rem; margin-bottom: 0.6rem; }
          .cert-name { font-size: 1.1rem; }
          .cert-score-box { padding: 1.5rem; margin: 1.25rem 0; }
          .cert-percentage { font-size: 2.5rem; }
          .cert-correct { font-size: 0.95rem; }
          .cert-progress-track { height: 12px; }
          .cert-info { font-size: 0.88rem; margin: 1rem 0; }
          .cert-buttons { gap: 1rem; margin-top: 1rem; }
          .cert-btn { padding: 0.8rem 1.6rem; font-size: 0.92rem; }
        }

        /* ═══════════════════════════════════════════════
           Large (Laptops/Desktops): min-width 992px
           ═══════════════════════════════════════════════ */
        @media (min-width: 992px) {
          .cert-card { padding: 2.5rem 2rem; max-width: 580px; }
          .cert-mascot { margin-bottom: 1.25rem; }
          .cert-title { font-size: 2.25rem; }
          .cert-name { font-size: 1.15rem; }
          .cert-score-box { padding: 1.75rem; margin: 1.5rem 0; }
          .cert-percentage { font-size: 2.75rem; }
          .cert-correct { font-size: 1rem; }
          .cert-info { font-size: 0.92rem; margin: 1.25rem 0; }
          .cert-buttons { margin-top: 1.25rem; }
          .cert-btn { padding: 0.9rem 1.8rem; font-size: 0.95rem; }
        }

        /* ═══════════════════════════════════════════════
           Extra Large (Wide Desktops): min-width 1200px
           ═══════════════════════════════════════════════ */
        @media (min-width: 1200px) {
          .cert-card { padding: 3rem 2.5rem; max-width: 620px; }
          .cert-mascot { margin-bottom: 1.5rem; }
          .cert-title { font-size: 2.5rem; }
          .cert-name { font-size: 1.2rem; }
          .cert-score-box { padding: 2rem; margin: 1.75rem 0; }
          .cert-percentage { font-size: 3rem; }
          .cert-correct { font-size: 1.1rem; margin-bottom: 0.75rem; }
          .cert-info { font-size: 0.95rem; margin: 1.5rem 0; }
          .cert-buttons { gap: 1rem; margin-top: 1.5rem; }
          .cert-btn { padding: 1rem 2rem; font-size: 1rem; }
        }
      `}),t.jsxs("div",{className:"cert-card",children:[t.jsx("div",{className:"cert-mascot",children:t.jsx(O,{size:80})}),t.jsx("h1",{className:"cert-title",children:a?"🎉 Congratulations!":"😊 Try Again!"}),t.jsx("p",{className:"cert-name",children:e.name}),t.jsxs("div",{className:"cert-score-box",children:[t.jsxs("div",{className:"cert-percentage",children:[n,"%"]}),t.jsxs("div",{className:"cert-correct",children:[i.correct," out of ",i.total," correct"]}),t.jsx("div",{className:"cert-progress-track",children:t.jsx("div",{className:"cert-progress-fill",style:{width:`${n}%`}})})]}),t.jsx("p",{className:"cert-info",children:a?`You achieved the target score of ${e.scoreTarget}! Excellent work!`:`You need ${e.scoreTarget} points to pass. You got ${i.score} points. Keep practicing!`}),t.jsxs("div",{className:"cert-buttons",children:[!a&&t.jsx("button",{onClick:s,className:"cert-btn cert-btn-retry",children:"🔄 Try Again"}),t.jsx("button",{onClick:o,className:"cert-btn cert-btn-back",children:a?"✨ Continue":"← Back"})]})]})]})},de=({assessment:e,onBack:i,language:s="eng",gameState:o})=>{const[r,a]=d.useState(0),[n,m]=d.useState([]),[l,p]=d.useState({}),[y,u]=d.useState(new Set),[g,F]=d.useState(e?.duration?e.duration*60:1800),[f,S]=d.useState(!1),[j,A]=d.useState(!1),[T,M]=d.useState(null),[ae,L]=d.useState(!1),[Q,w]=d.useState(null),E=d.useRef(null);d.useEffect(()=>{try{if(console.log("=== AssessmentPage Mounted ==="),console.log("Assessment prop:",e),!e)throw new Error("No assessment provided to AssessmentPage");if(console.log("Assessment properties:"),console.log("  - id:",e.id),console.log("  - name:",e.name),console.log("  - topic:",e.topic),console.log("  - level:",e.level),console.log("  - questionType:",e.questionType),console.log("  - totalQuestions:",e.totalQuestions),console.log("  - duration:",e.duration),!e.totalQuestions)throw new Error(`Assessment missing totalQuestions field. Got: ${e.totalQuestions}`);if(!e.topic)throw new Error(`Assessment missing topic field. Got: ${e.topic}`);if(!e.level)throw new Error(`Assessment missing level field. Got: ${e.level}`);console.log("✓ Assessment validation passed")}catch(c){console.error("AssessmentPage validation error:",c.message),w(c.message)}},[e]),d.useEffect(()=>{try{if(!e){console.log("Assessment not ready yet");return}console.log("=== Setting up Assessment ===");const c=X(e);if(!c.valid){console.error("Assessment validation failed:",c.errors),w(`Assessment validation failed:
${c.errors.join(`
`)}`);return}console.log("✓ Assessment is valid:",Z(e));let h=[],x=!0;const R=()=>{try{console.log("Generating questions...");const C=performance.now(),v=q({totalQuestions:e.totalQuestions,topic:e.topic,level:e.level,questionType:e.questionType}),K=performance.now();if(console.log(`✓ Generated ${v.length} questions in ${(K-C).toFixed(2)}ms`),!v||v.length===0)throw new Error("Failed to generate questions");v.forEach(W=>{W.questionType||(W.questionType=e.questionType||"multiple-choice")}),m(v),x=!1}catch(C){console.error("Question generation error:",C.message),w(`Error generating questions: ${C.message}`),x=!1}};return typeof requestIdleCallback<"u"?requestIdleCallback(R,{timeout:2e3}):setTimeout(R,100),()=>{x=!1}}catch(c){console.error("Assessment setup error:",c.message),w(`Error setting up assessment: ${c.message}`)}},[e]),d.useEffect(()=>{const c=()=>{L(window.innerWidth<768)};return c(),window.addEventListener("resize",c),()=>window.removeEventListener("resize",c)},[]);const N=d.useRef(null);d.useEffect(()=>{N.current=I}),d.useEffect(()=>{if(!j)return E.current=setInterval(()=>{F(c=>c<=1?(S(!0),N.current?.(),0):c-1)},1e3),()=>{E.current&&clearInterval(E.current)}},[j]);const P=c=>{const h=Math.floor(c/60),x=c%60;return`${h.toString().padStart(2,"0")}:${x.toString().padStart(2,"0")}`},G=d.useCallback(c=>{const h=n[r];h&&p(x=>({...x,[h.id]:c}))},[r,n]),k=d.useCallback(()=>{r<n.length-1&&a(c=>c+1)},[r,n.length]),z=d.useCallback(()=>{n[r]&&(u(h=>new Set([...h,r+1])),k())},[r,n,k]),H=d.useCallback(()=>{r>0&&a(c=>c-1)},[r]),U=d.useCallback(c=>{a(c)},[]),I=d.useCallback(()=>{if(n.length===0)return;const c=V(n,l);M(c),A(!0);const h={...e,status:c.score>=e.scoreTarget?"Completed":"Failed",score:c.score,percentage:c.percentage};console.log("Assessment completed:",h)},[n,l,e]),Y=()=>{a(0),p({}),u(new Set),F(e.duration*60),S(!1),A(!1),M(null);const c=q({totalQuestions:e.totalQuestions,topic:e.topic,level:e.level,questionType:e.questionType});m(c)};if(j&&T)return t.jsx(se,{assessment:e,score:T,onRetry:Y,onBack:i,language:s});if(n.length===0)return t.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",fontSize:"1.2rem",color:"#999",flexDirection:"column",gap:"2rem"},children:[t.jsx("div",{children:"⏳ Loading assessment..."}),t.jsx("div",{style:{fontSize:"0.9rem",color:"#CCC",maxWidth:"500px"},children:e?t.jsxs("div",{children:["Assessment: ",e.name," (ID: ",e.id,")",t.jsx("br",{}),"Topic: ",e.topic,", Level: ",e.level,t.jsx("br",{}),"Type: ",e.questionType]}):"No assessment selected"})]});if(Q)return t.jsx("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100vh",backgroundColor:"#FFEBEE",padding:"2rem"},children:t.jsxs("div",{style:{backgroundColor:"white",borderRadius:"12px",padding:"2rem",maxWidth:"500px",textAlign:"center",boxShadow:"0 4px 12px rgba(0,0,0,0.1)"},children:[t.jsx("div",{style:{fontSize:"2rem",marginBottom:"1rem"},children:"⚠️ Error"}),t.jsx("div",{style:{fontSize:"1.1rem",color:"#C62828",marginBottom:"1.5rem",fontWeight:600},children:Q}),t.jsx("div",{style:{fontSize:"0.9rem",color:"#666",marginBottom:"1.5rem",backgroundColor:"#F5F5F5",padding:"1rem",borderRadius:"8px",fontFamily:"monospace"},children:e&&JSON.stringify({id:e.id,name:e.name,topic:e.topic,level:e.level,questionType:e.questionType,totalQuestions:e.totalQuestions,duration:e.duration},null,2)}),t.jsx("button",{onClick:i,style:{padding:"0.75rem 1.5rem",fontSize:"1rem",fontWeight:700,backgroundColor:"#4A90E2",color:"white",border:"none",borderRadius:"8px",cursor:"pointer"},children:"← Go Back"})]})});const b=n[r],$=b&&l[b.id]||"";return t.jsxs("div",{className:"assessment-page",children:[t.jsx("style",{children:`
        .assessment-page {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background-color: #fff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          overflow: hidden;
        }

        /* ── Header ── */
        .assessment-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.6rem 0.75rem;
          border-bottom: 2px solid #E5E5E5;
          flex-shrink: 0;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .assessment-header.time-up-bg { background-color: #FFEBEE; }
        .assessment-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: #2D4059;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 45%;
        }
        .assessment-header-right {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .assessment-progress {
          font-size: 0.75rem;
          color: #666;
          font-weight: 600;
          white-space: nowrap;
        }
        .assessment-timer {
          font-size: 0.85rem;
          font-weight: 700;
          padding: 0.35rem 0.6rem;
          border-radius: 8px;
          min-width: 65px;
          text-align: center;
          white-space: nowrap;
        }

        /* ── Time Up Warning ── */
        .time-up-warning {
          background-color: #FFCDD2;
          color: #C62828;
          padding: 0.6rem;
          text-align: center;
          font-size: 0.8rem;
          font-weight: 700;
          border-bottom: 2px solid #F44336;
          flex-shrink: 0;
        }

        /* ── Main Content ── */
        .assessment-main {
          display: flex;
          flex-direction: column;
          flex: 1;
          overflow: hidden;
          min-height: 0;
        }

        /* ── Sidebar (Question Palette) ── */
        .assessment-sidebar {
          display: none;
          flex-shrink: 0;
        }

        /* ── Question Content (NO SCROLL) ── */
        .assessment-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 0.5rem 0.75rem;
          overflow: hidden;
          background-color: #FAFAFA;
          min-height: 0;
        }
        .assessment-question-wrap {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          max-width: 700px;
          margin: 0 auto;
          min-height: 0;
          font-size: 0.85rem;
        }

        /* ── Footer Nav (always at bottom) ── */
        .assessment-nav {
          display: flex;
          gap: 0.6rem;
          justify-content: center;
          align-items: center;
          padding: 0.65rem 0.75rem;
          background-color: #fff;
          border-top: 1px solid #E5E5E5;
          box-shadow: 0 -2px 8px rgba(0,0,0,0.06);
          flex-wrap: wrap;
          flex-shrink: 0;
        }
        .assessment-nav .nav-btn {
          padding: 0.45rem 0.75rem;
          font-size: 0.72rem;
          font-weight: 600;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
          border: 2px solid #E0E0E0;
          background-color: #F5F5F5;
          color: #2D4059;
        }
        .assessment-nav .nav-btn:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
        .assessment-nav .nav-btn.btn-next {
          background-color: #58CC02;
          color: white;
          border: none;
        }
        .assessment-nav .nav-btn.btn-next:disabled {
          background-color: #CCC;
        }
        .assessment-nav .nav-btn.btn-submit {
          background-color: #4A90E2;
          color: white;
          border: none;
        }
        .assessment-nav .nav-btn:hover:not(:disabled) {
          filter: brightness(1.08);
          transform: translateY(-1px);
        }

        /* ═══════════════════════════════════════════
           Small (Landscape Phones): min-width 576px
           ═══════════════════════════════════════════ */
        @media (min-width: 576px) {
          .assessment-header { padding: 0.75rem 1rem; }
          .assessment-title { font-size: 0.95rem; max-width: 50%; }
          .assessment-header-right { gap: 1rem; }
          .assessment-progress { font-size: 0.8rem; }
          .assessment-timer { font-size: 0.9rem; padding: 0.4rem 0.75rem; }
          .time-up-warning { font-size: 0.85rem; padding: 0.75rem; }
          .assessment-content { padding: 0.75rem 1rem; }
          .assessment-question-wrap { font-size: 0.9rem; }
          .assessment-nav { gap: 0.65rem; padding: 0.75rem 1rem; }
          .assessment-nav .nav-btn { padding: 0.5rem 0.85rem; font-size: 0.76rem; }
        }

        /* ═══════════════════════════════════════
           Medium (Tablets): min-width 768px
           ═══════════════════════════════════════ */
        @media (min-width: 768px) {
          .assessment-main { flex-direction: row; }
          .assessment-sidebar { display: flex; }
          .assessment-header { padding: 0.85rem 1.25rem; flex-wrap: nowrap; }
          .assessment-title { font-size: 1rem; max-width: 55%; }
          .assessment-header-right { gap: 1.5rem; }
          .assessment-progress { font-size: 0.85rem; }
          .assessment-timer { font-size: 1rem; padding: 0.45rem 0.85rem; min-width: 75px; }
          .time-up-warning { font-size: 0.9rem; padding: 0.85rem; }
          .assessment-content { padding: 1rem 1.5rem; }
          .assessment-question-wrap { font-size: 0.95rem; }
          .assessment-nav { gap: 0.75rem; padding: 0.85rem 1.5rem; }
          .assessment-nav .nav-btn { padding: 0.5rem 0.95rem; font-size: 0.8rem; }
        }

        /* ═══════════════════════════════════════════════
           Large (Laptops/Desktops): min-width 992px
           ═══════════════════════════════════════════════ */
        @media (min-width: 992px) {
          .assessment-header { padding: 1rem 1.5rem; }
          .assessment-title { font-size: 1.1rem; max-width: 60%; }
          .assessment-header-right { gap: 2rem; }
          .assessment-progress { font-size: 0.9rem; }
          .assessment-timer { font-size: 1.1rem; padding: 0.5rem 1rem; min-width: 80px; }
          .time-up-warning { font-size: 1rem; padding: 1rem; }
          .assessment-content { padding: 1.25rem 2rem; }
          .assessment-question-wrap { font-size: 1rem; }
          .assessment-nav { gap: 0.85rem; padding: 1rem 2rem; }
          .assessment-nav .nav-btn { padding: 0.55rem 1.1rem; font-size: 0.84rem; }
        }

        /* ═══════════════════════════════════════════════
           Extra Large (Wide Desktops): min-width 1200px
           ═══════════════════════════════════════════════ */
        @media (min-width: 1200px) {
          .assessment-header { padding: 1rem 2rem; }
          .assessment-title {
            font-size: 1.15rem;
            max-width: none;
          }
          .assessment-content { padding: 1.5rem 2.5rem; }
          .assessment-nav { padding: 1.1rem 2.5rem; }
          .assessment-nav .nav-btn { padding: 0.65rem 1.25rem; font-size: 0.88rem; }
        }
      `}),t.jsxs("div",{className:`assessment-header ${f?"time-up-bg":""}`,children:[t.jsx("div",{className:"assessment-title",children:e.name}),t.jsxs("div",{className:"assessment-header-right",children:[t.jsxs("div",{className:"assessment-progress",children:["Q",r+1," / ",n.length]}),t.jsxs("div",{className:"assessment-timer",style:{color:f?"#F44336":g<300?"#FF9800":"#2D4059",backgroundColor:f?"#FFCDD2":g<300?"#FFF3E0":"transparent"},children:["⏱️ ",P(g)]})]})]}),f&&t.jsx("div",{className:"time-up-warning",children:"⚠️ Time is up! Your answers have been submitted automatically."}),t.jsxs("div",{className:"assessment-main",children:[t.jsx("div",{className:"assessment-sidebar",children:t.jsx(ie,{totalQuestions:n.length,currentQuestion:r+1,answeredQuestions:y,onSelectQuestion:U,isMobile:!1})}),t.jsxs("div",{className:"assessment-content",children:[t.jsx("div",{className:"assessment-question-wrap",children:b?t.jsx(oe,{question:b,answer:$,onChange:G,onSubmit:b.questionType==="multiple-choice"?()=>z():z,disabled:f,autoFocus:!0}):t.jsx("div",{style:{fontSize:"1.2rem",color:"#999"},children:"Loading question..."})}),t.jsxs("div",{className:"assessment-nav",children:[t.jsx("button",{onClick:H,disabled:r===0||f,className:"nav-btn",children:"← Previous"}),b.questionType==="multiple-choice"&&t.jsx("button",{onClick:z,disabled:!$||f,className:"nav-btn btn-next",children:"Next →"}),t.jsx("button",{onClick:k,disabled:r===n.length-1||f,className:"nav-btn",children:"Skip →"}),t.jsx("button",{onClick:I,className:"nav-btn btn-submit",children:"✓ Submit"})]})]})]})]})};export{de as default};
