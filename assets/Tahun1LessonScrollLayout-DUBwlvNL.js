import{r as i,S as q,j as s,p as P}from"./index-YCInXYg5.js";import{F as J}from"./arabic-W4X4pPK0.js";import{s as K}from"./utils-Direv13U.js";import{B as U}from"./BackButton-DoWsAqH6.js";import{C as _}from"./Celebration-BzsEi41U.js";const V=["A","B","C","D"];function R(w,t){const o=K(w).slice(0,t),p={};return{pool:o.map(l=>{const d=K(l.options);return p[l.question]={answer:l.answer,correctIndex:d.indexOf(l.answer)},{question:l.question,options:d}}),answers:p}}const X={pageGradient:"linear-gradient(180deg,#FDEFF5 0%,#F7D6E3 50%,#F2C4D7 100%)",dark:"#46122E",accent:"#E8568A",stageGradient:"radial-gradient(ellipse at 50% 32%,#FFE3EF 0%,#F58FB6 55%,#D94B86 100%)",pillGradient:"linear-gradient(180deg,#F0709F,#E8568A)"};function Z({quizStarted:w,pool:t,idx:o,score:p,answered:m,selected:l,correctIdx:d,correctAnswer:e,totalRounds:x,language:r,accentColor:g,handleStart:a,handleChoose:z,handleNext:y,handleRestart:$,finished:k}){if(!w)return s.jsx("div",{style:{textAlign:"center",padding:"20px 0 40px"},children:s.jsxs("div",{className:"quiz-card",style:{padding:"clamp(28px,5vw,40px)"},children:[s.jsx("span",{style:{fontSize:"clamp(44px,12vw,64px)",display:"block",marginBottom:10},children:"🎯"}),s.jsx("h3",{style:{fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:"clamp(20px,4vw,28px)",color:"var(--scl-rose-deep)",margin:"0 0 6px"},children:r==="bm"?"Kuiz Pembelajaran":"Quiz"}),s.jsx("p",{style:{fontFamily:"'Fredoka', sans-serif",fontWeight:500,fontSize:"15px",color:"var(--scl-muted)",margin:"0 0 20px"},children:r==="bm"?"Uji kefahaman anda tentang adab yang telah dipelajari":"Test your understanding of the manners you have learned"}),s.jsxs("button",{className:"scl-btn scl-btn-primary",onClick:a,children:[s.jsx("span",{className:"scl-ico",children:"🎯"}),r==="bm"?"Mula Kuiz":"Start Quiz"]})]})});if(k){const f=Math.round(p/x*100),c=f>=80?"⭐⭐⭐":f>=50?"⭐⭐":"⭐",u=f>=80?r==="bm"?"Hebat! Kamu sudah faham dengan baik!":"Excellent! You understand well!":f>=50?r==="bm"?"Bagus! Teruskan belajar ya.":"Good! Keep learning.":r==="bm"?"Jangan risau — cuba sekali lagi!":"Don't worry — try again!";return s.jsx("div",{style:{textAlign:"center",padding:"20px 0 40px"},children:s.jsxs("div",{className:"quiz-card",style:{padding:"clamp(28px,5vw,40px)"},children:[s.jsxs("h3",{style:{fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:"clamp(20px,4vw,28px)",color:"var(--scl-rose-deep)",margin:"0 0 6px"},children:["🎉 ",r==="bm"?"Keputusan Kuiz":"Quiz Result"]}),s.jsx("div",{style:{fontSize:"clamp(32px,8vw,48px)",letterSpacing:4,margin:"8px 0"},children:c}),s.jsxs("div",{className:"scl-result-score",children:[p," / ",x]}),s.jsx("p",{style:{fontFamily:"'Fredoka', sans-serif",fontWeight:600,fontSize:"16px",color:"var(--scl-muted)",margin:"0 0 22px"},children:u}),s.jsx("div",{style:{display:"flex",gap:"0.75rem",flexWrap:"wrap",justifyContent:"center"},children:s.jsxs("button",{className:"scl-btn scl-btn-primary",onClick:$,children:["🔄 ",r==="bm"?"Cuba Lagi":"Try Again"]})})]})})}if(!t||!t[o])return null;const b=t[o];return s.jsx("div",{style:{padding:"20px 0 40px"},children:s.jsxs("div",{className:"quiz-card",style:{padding:"clamp(24px,5vw,40px)"},children:[s.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12},children:[s.jsxs("span",{className:"scl-qprog",children:[r==="bm"?"Soalan":"Question"," ",o+1," / ",x]}),s.jsxs("span",{style:{fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:"14px",color:"#D4960A"},children:["⭐ ",p]})]}),s.jsx("div",{style:{width:"100%",height:8,borderRadius:99,background:"rgba(0,0,0,0.07)",overflow:"hidden",marginBottom:18},children:s.jsx("div",{style:{height:"100%",width:`${(o+1)/x*100}%`,background:`linear-gradient(90deg, ${g}, ${g}88)`,borderRadius:99,transition:"width 0.4s ease"}})}),s.jsx("p",{className:"scl-qtext",children:b.question}),s.jsx("div",{className:"scl-opts",children:b.options.map((f,c)=>{const u=l===c,N=m&&c===d,j=u&&c!==d;let h="scl-opt";return N&&(h+=" correct"),j&&(h+=" wrong"),s.jsxs("button",{className:h,onClick:()=>z(c),disabled:m,children:[s.jsx("span",{className:"scl-mk",children:V[c]}),s.jsx("span",{children:f}),s.jsx("span",{style:{marginLeft:"auto",fontSize:"15px"},children:N?"✅":j?"❌":""})]},c)})}),s.jsx("p",{className:"scl-feedback",id:"feedback",children:m?l===d?"✅ Betul! Syabas!":`❌ Jawapan betul: ${e}`:""}),s.jsx("div",{style:{display:"flex",justifyContent:"center"},children:s.jsx("button",{className:"scl-qbtn",hidden:!m,onClick:y,children:o+1>=x?r==="bm"?"Lihat Keputusan →":"See Results →":r==="bm"?"Seterusnya →":"Next →"})})]})})}function ts({onBack:w,language:t="bm",breadcrumb:o="",breadcrumbActive:p="",title:m,lead:l,icon:d,theme:e=X,topics:x,questions:r,totalRounds:g=10,accentColor:a="#E8568A"}){const z=i.useRef(null),y=i.useRef(null),$=i.useMemo(()=>R(r,g),[]),k=i.useRef($.answers),[b,f]=i.useState($.pool),[c,u]=i.useState(!1),[N,j]=i.useState(!1),[h,T]=i.useState(0),[W,Y]=i.useState(0),[D,S]=i.useState(!1),[C,B]=i.useState(null),[G,I]=i.useState(!1);i.useEffect(()=>()=>q.stopSpeaking(),[]);const E=n=>{n.current?.scrollIntoView({behavior:"smooth",block:"start"})},M=n=>{if(D)return;S(!0),B(n),n===L?(Y(A=>A+1),P("correct")):P("wrong")},Q=()=>{h+1<g?(T(n=>n+1),S(!1),B(null)):(I(!0),u(!0),setTimeout(()=>u(!1),2500)),setTimeout(()=>E(y),50)},O=()=>{const{pool:n,answers:v}=R(r,g);k.current=v,f(n),j(!1),T(0),Y(0),S(!1),B(null),I(!1),u(!1)},F=b&&b[h],L=F?k.current[F.question].correctIndex:-1,H=F?k.current[F.question].answer:"";return s.jsxs(s.Fragment,{children:[s.jsx("style",{children:`
        ${J}
        :root {
          --scl-rose: ${a};
          --scl-rose-deep: ${e.dark};
          --scl-rose-soft: ${a}18;
          --scl-gold: #E0A012;
          --scl-green: #2E9C57;
          --scl-ink: ${e.dark};
          --scl-muted: #8A5670;
          --scl-card-radius: 24px;
        }
        .scl-wrapper { min-height: 100vh; flex-shrink: 0; }
        .scl-topbar {
          position: sticky; top: 0; z-index: 40;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 14px clamp(16px,4vw,40px);
          background: rgba(255,255,255,.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid ${a}2E;
          box-shadow: 0 4px 18px ${e.dark}12;
        }
        .scl-crumb {
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 13px; letter-spacing: .04em; color: var(--scl-muted);
        }
        .scl-hero {
          max-width: 760px; margin: 0 auto;
          padding: clamp(34px,6vw,64px) 24px 10px; text-align: center;
        }
        .scl-badge {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 12px; letter-spacing: .14em; text-transform: uppercase;
          color: #fff;
          background: linear-gradient(180deg,${a}cc,${a});
          padding: 7px 18px; border-radius: 999px;
          box-shadow: 0 4px 12px -4px ${e.dark}80;
        }
        .scl-emoji {
          font-size: clamp(54px,11vw,80px); line-height: 1;
          margin: 18px 0 6px; display: block;
          filter: drop-shadow(0 8px 14px ${e.dark}48);
          animation: scl-bob 3.4s ease-in-out infinite;
        }
        @keyframes scl-bob {
          0%,100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-9px) rotate(2deg); }
        }
        .scl-h1 {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(30px,6.5vw,48px); line-height: 1.08;
          color: var(--scl-rose-deep); margin: 0 0 14px;
          text-shadow: 0 2px 0 #fff;
        }
        .scl-lead {
          font-size: clamp(15px,2.4vw,18px); font-weight: 500;
          line-height: 1.6; color: var(--scl-muted);
          max-width: 600px; margin: 0 auto; text-wrap: pretty;
        }
        .scl-actions {
          display: flex; flex-wrap: wrap; gap: 14px;
          justify-content: center; margin: 30px auto 8px; padding: 0 24px;
        }
        .scl-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(16px,2.6vw,19px); cursor: pointer;
          border: none; border-radius: 999px; padding: 15px 34px;
          display: inline-flex; align-items: center; gap: 10px;
          min-height: 54px;
          transition: transform .18s cubic-bezier(.34,1.56,.64,1),box-shadow .18s ease;
        }
        .scl-btn .scl-ico { font-size: 1.25em; line-height: 1; }
        .scl-btn-primary {
          color: #fff;
          background: linear-gradient(180deg,${a}cc 0%,${a} 55%,${a}99 100%);
          box-shadow: 0 6px 0 ${e.dark},0 14px 26px -10px ${e.dark}99;
        }
        .scl-btn-primary:hover { transform: translateY(-3px); box-shadow: 0 9px 0 ${e.dark},0 20px 32px -10px ${e.dark}99; }
        .scl-btn-primary:active { transform: translateY(3px); box-shadow: 0 3px 0 ${e.dark},0 8px 16px -8px ${e.dark}99; }
        .scl-btn-secondary {
          color: var(--scl-rose-deep); background: #fff;
          box-shadow: 0 6px 0 ${a}44,0 14px 26px -12px ${e.dark}66;
        }
        .scl-btn-secondary:hover { transform: translateY(-3px); box-shadow: 0 9px 0 ${a}44,0 20px 30px -12px ${e.dark}66; }
        .scl-btn-secondary:active { transform: translateY(3px); box-shadow: 0 3px 0 ${a}44; }
        .scl-progress {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          margin: 46px auto 6px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 14px; color: var(--scl-rose-deep);
        }
        .scl-progress .scl-dot {
          width: 9px; height: 9px; border-radius: 50%;
          background: var(--scl-rose);
          box-shadow: 0 0 0 4px ${a}2E;
        }
        .scl-sec-title {
          text-align: center; font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(22px,4vw,30px); color: var(--scl-rose-deep);
          margin: 4px 0 4px;
        }
        .scl-sec-sub {
          text-align: center; font-size: 13px; letter-spacing: .14em;
          text-transform: uppercase; font-weight: 600;
          color: var(--scl-muted); margin: 0 0 36px;
        }
        .scl-grid {
          max-width: 1080px; margin: 0 auto;
          padding: 0 clamp(16px,4vw,28px) 30px;
          display: flex; flex-wrap: wrap; justify-content: center;
          gap: 24px;
        }
        .scl-card {
          position: relative;
          background: linear-gradient(180deg,#fff,#FEF4F8);
          border-radius: var(--scl-card-radius);
          padding: 26px 22px 28px;
          border: 1px solid ${a}28;
          box-shadow: 0 14px 34px -16px ${e.dark}48,0 2px 6px ${e.dark}0D;
          display: flex; flex-direction: column; align-items: center; text-align: center;
          gap: 13px;
          transition: transform .3s cubic-bezier(.34,1.56,.64,1),box-shadow .3s ease;
          cursor: default;
          flex: 1 1 100%;
          min-width: 280px;
          max-width: 380px;
        }
        .scl-card:hover { transform: translateY(-8px); box-shadow: 0 26px 50px -18px ${e.dark}66; }
        .scl-card:active { transform: translateY(-3px) scale(.99); }
        @media(min-width:600px){.scl-card{flex:1 1 calc((100% - 24px) / 2);max-width:none}}
        @media(min-width:980px){.scl-card{flex:1 1 calc((100% - 48px) / 3)}}
        .scl-num {
          position: absolute; top: 14px; left: 16px;
          font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 13px;
          color: #fff;
          background: linear-gradient(180deg,${a}cc,${a});
          width: 30px; height: 30px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 3px 8px -2px ${e.dark}80;
        }
        .scl-stage {
          width: 120px; height: 120px; border-radius: 24px;
          display: flex; align-items: center; justify-content: center;
          background: ${e.stageGradient};
          box-shadow: inset 0 -7px 20px ${e.dark}33,inset 0 2px 0 rgba(255,255,255,.5);
          margin-top: 6px;
        }
        .scl-stage svg { width: 78%; height: 78%; overflow: visible; }
        .scl-stage .scl-emoji-only { font-size: 3.2rem; line-height: 1; }
        .scl-ctitle {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: 19px; color: var(--scl-rose-deep); margin: 2px 0 0;
        }
        .scl-csub {
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 24px; letter-spacing: .08em;
          text-transform: uppercase; color: var(--scl-rose); margin: 0;
        }
        .scl-cdesc {
          font-size: 13.5px; font-weight: 500; line-height: 1.55;
          color: var(--scl-muted); margin: 2px 0 0; text-wrap: pretty;
        }
        .scl-sound-btn {
          font-family: 'Fredoka', sans-serif; font-weight: 700;
          font-size: 0.72rem; color: var(--scl-rose-deep);
          background: rgba(255,255,255,0.45); border: none; border-radius: 999px;
          padding: 3px 12px; cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          transition: background .15s;
        }
        .scl-sound-btn:hover { background: rgba(255,255,255,0.7); }
        .scl-quiz { max-width: 680px; margin: 20px auto 0; padding: 0 clamp(16px,4vw,28px) 60px; }
        .quiz-card {
          background: linear-gradient(180deg,#fff,#FEF4F8);
          border-radius: 28px; border: 1px solid ${a}28;
          box-shadow: 0 18px 44px -18px ${e.dark}4D;
        }
        .scl-qprog {
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 13px; color: var(--scl-muted);
        }
        .scl-qtext {
          font-size: clamp(16px,2.6vw,19px); font-weight: 600;
          line-height: 1.5; margin: 0 0 20px; color: var(--scl-ink);
        }
        .scl-opts { display: flex; flex-direction: column; gap: 12px; }
        .scl-opt {
          font-family: 'Fredoka', sans-serif; font-weight: 600; font-size: 15px;
          text-align: left; cursor: pointer;
          background: #fff; border: 2px solid ${a}40;
          border-radius: 16px; padding: 15px 18px; min-height: 52px;
          color: var(--scl-ink); display: flex; align-items: center; gap: 12px;
          transition: all .18s ease;
        }
        .scl-opt .scl-mk {
          width: 26px; height: 26px; border-radius: 50%;
          background: ${a}18; color: var(--scl-rose-deep);
          font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 14px;
          display: flex; align-items: center; justify-content: center; flex: none;
        }
        .scl-opt:hover:not(:disabled) {
          border-color: var(--scl-rose); transform: translateX(3px);
          background: ${a}18;
        }
        .scl-opt.correct {
          border-color: var(--scl-green); background: #E6F7EC; color: #1B6B38;
        }
        .scl-opt.correct .scl-mk { background: var(--scl-green); color: #fff; }
        .scl-opt.wrong {
          border-color: #E05A5A; background: #FCE9E9; color: #A32626;
        }
        .scl-opt.wrong .scl-mk { background: #E05A5A; color: #fff; }
        .scl-opt:disabled { cursor: default; }
        .scl-feedback {
          margin-top: 18px; font-family: 'Baloo 2', sans-serif;
          font-weight: 700; font-size: 15px; min-height: 24px; text-align: center;
        }
        .scl-qbtn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 16px;
          cursor: pointer; border: none; border-radius: 999px; padding: 13px 30px;
          color: #fff;
          background: linear-gradient(180deg,${a}cc,${a}99);
          box-shadow: 0 5px 0 ${e.dark};
          transition: transform .15s ease;
        }
        .scl-qbtn:hover { transform: translateY(-2px); }
        .scl-qbtn:active { transform: translateY(2px); box-shadow: 0 2px 0 ${e.dark}; }
        .scl-qbtn[hidden] { display: none; }
        .scl-result-score {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(34px,8vw,52px); color: var(--scl-rose-deep); margin: 6px 0;
        }
        .scl-foot { text-align: center; padding: 10px 20px 50px; color: var(--scl-muted); font-size: 12.5px; font-weight: 500; }

        .floatA { animation: scl-floatA 3.6s ease-in-out infinite; transform-origin: center; }
        @keyframes scl-floatA { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        .pulse { animation: scl-pulse 2.2s ease-in-out infinite; }
        @keyframes scl-pulse { 0%,100% { opacity: .45; } 50% { opacity: 1; } }

        @media(prefers-reduced-motion:reduce){*{animation:none!important;scroll-behavior:auto}}
      `}),s.jsxs("div",{className:"scl-wrapper",style:{backgroundImage:e.pageGradient,backgroundRepeat:"no-repeat",backgroundColor:e.pageColor||"#F2C4D7",fontFamily:"'Fredoka',system-ui,sans-serif",color:"var(--scl-ink)"},children:[s.jsxs("div",{className:"scl-topbar",style:{justifyContent:"center",gap:"8px"},children:[s.jsx("div",{style:{position:"absolute",left:"clamp(16px,4vw,40px)"},children:s.jsx(U,{onClick:w})}),p?s.jsxs("span",{className:"scl-crumb",style:{textAlign:"center"},children:[o,s.jsx("span",{style:{color:"var(--scl-rose-deep)",fontWeight:800},children:p})]}):s.jsx("span",{className:"scl-crumb",style:{textAlign:"center"},children:o})]}),s.jsxs("header",{className:"scl-hero",children:[s.jsx("span",{className:"scl-badge",children:t==="bm"?"Pendidikan Islam · Tahun 1":"Islamic Education · Year 1"}),s.jsx("span",{className:"scl-emoji",children:d}),s.jsx("h1",{className:"scl-h1",children:m}),s.jsx("p",{className:"scl-lead",children:l})]}),s.jsxs("div",{className:"scl-actions",children:[s.jsxs("button",{className:"scl-btn scl-btn-primary",onClick:()=>E(z),children:[s.jsx("span",{className:"scl-ico",children:"📖"}),t==="bm"?"Belajar":"Learn"]}),s.jsxs("button",{className:"scl-btn scl-btn-secondary",onClick:()=>E(y),children:[s.jsx("span",{className:"scl-ico",children:"🎯"}),t==="bm"?"Kuiz":"Quiz"]})]}),s.jsxs("section",{ref:z,id:"learn",children:[s.jsxs("div",{className:"scl-progress",children:[s.jsx("span",{className:"scl-dot"}),x.length," ",t==="bm"?"Topik Pembelajaran":"Learning Topics"]}),s.jsx("h2",{className:"scl-sec-title",children:t==="bm"?"Topik Pembelajaran":"Learning Topics"}),s.jsx("p",{className:"scl-sec-sub",children:t==="bm"?"Ketuk setiap kad untuk belajar":"Tap each card to learn"}),s.jsx("div",{className:"scl-grid",children:x.map((n,v)=>s.jsxs("article",{className:"scl-card",children:[s.jsx("span",{className:"scl-num",children:v+1}),s.jsx("div",{className:"scl-stage",children:n.visual}),s.jsx("p",{className:"scl-csub",children:n.sublabel}),s.jsx("h3",{className:"scl-ctitle",children:n.title}),s.jsx("p",{className:"scl-cdesc",children:n.desc}),s.jsx("button",{className:"scl-sound-btn",onClick:A=>{A.stopPropagation(),q.stopSpeaking(),q.speak(n.desc,"ms-MY",{rate:.8})},children:"🔊 Dengar"})]},v))})]}),s.jsxs("section",{className:"scl-quiz",ref:y,id:"quiz",style:{position:"relative"},children:[c&&s.jsx(_,{count:20}),s.jsx(Z,{quizStarted:N,pool:b,idx:h,score:W,answered:D,selected:C,correctIdx:L,correctAnswer:H,totalRounds:g,language:t,accentColor:a,handleStart:()=>j(!0),handleChoose:M,handleNext:Q,handleRestart:O,finished:G})]}),s.jsx("p",{className:"scl-foot",children:"ImanGenius · Pendidikan Islam"})]})]})}export{ts as T};
