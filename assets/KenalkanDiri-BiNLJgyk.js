import{S as s,r as l,j as e,p as Q}from"./index-YCInXYg5.js";import{B as V}from"./BMHeader-B5cOc9J_.js";import{c as I}from"./confetti.module-oQXWb4Lk.js";import{u as fe}from"./useTopicGamification-I1kCte-J.js";import{R as X}from"./refresh-cw-J9zlOc9a.js";import{S as J}from"./skip-forward-CWFoDEaO.js";import"./useGamification-g-vGaz2S.js";const Z="1-1-9-kenalkan-diri",be=[{id:"intro1",type:"intro",emoji:"🙋",prompt:"Sebutkan nama kamu.",promptEN:"Say your name.",example:"Nama saya Ali.",audioText:'Baca ayat ini "Nama saya Ali."',required:[["nama"],["saya"]]},{id:"intro2",type:"intro",emoji:"🎂",prompt:"Sebutkan umur kamu.",promptEN:"Say your age.",example:"Saya berumur tujuh tahun.",audioText:'Baca ayat ini "Saya berumur tujuh tahun."',required:[["saya"],["berumur","umur"],["tahun"]]},{id:"intro3",type:"intro",emoji:"🏫",prompt:"Sebutkan nama sekolah kamu.",promptEN:"Say the name of your school.",example:"Saya belajar di Sekolah Bestari.",audioText:'Baca ayat ini "Saya belajar di Sekolah Bestari."',required:[["saya"],["belajar"],["di"]]}],ye=[{id:"polite1",type:"polite",emoji:"✏️",situation:"Kamu nak pinjam pensel kawan.",situationEN:"You want to borrow a friend's pencil.",options:[{text:"Bagi pensel itu sekarang!",textEN:"Give me that pencil now!",correct:!1},{text:"Bolehkah saya pinjam pensel ini?",textEN:"May I borrow this pencil?",correct:!0}]},{id:"polite2",type:"polite",emoji:"🚪",situation:"Kamu nak lalu, tetapi pintu tertutup.",situationEN:"You want to pass, but the door is closed.",options:[{text:"Boleh tolong bukakan pintu untuk saya?",textEN:"Could you please open the door for me?",correct:!0},{text:"Buka pintu ni!",textEN:"Open this door!",correct:!1}]},{id:"polite3",type:"polite",emoji:"🥛",situation:"Kamu rasa sangat dahaga.",situationEN:"You feel very thirsty.",options:[{text:"Saya nak air, sekarang!",textEN:"I want water, now!",correct:!1},{text:"Boleh saya minta sedikit air?",textEN:"Could I have some water, please?",correct:!0}]},{id:"polite4",type:"polite",emoji:"📖",situation:"Kamu nak pinjam buku daripada Cikgu.",situationEN:"You want to borrow a book from Teacher.",options:[{text:"Bolehkah saya pinjam buku ini, Cikgu?",textEN:"May I borrow this book, Teacher?",correct:!0},{text:"Buku ini saya nak!",textEN:"I want this book!",correct:!1}]},{id:"polite5",type:"polite",emoji:"🪑",situation:"Kamu nak tukar tempat duduk dengan kawan.",situationEN:"You want to swap seats with a friend.",options:[{text:"Pindah dari sini sekarang!",textEN:"Move from here now!",correct:!1},{text:"Bolehkah kita tukar tempat duduk?",textEN:"Could we swap seats?",correct:!0}]},{id:"polite6",type:"polite",emoji:"🙏",situation:"Kawan tolong membantu anda.",situationEN:"Your friend helps you.",options:[{text:"Lambatnya kamu.",textEN:"You are so slow.",correct:!1},{text:"Terima kasih banyak!",textEN:"Thank you very much!",correct:!0}]}],ee=n=>[...n].sort(()=>Math.random()-.5),te=()=>ee([...be,...ye]).map(n=>n.type==="polite"?{...n,options:ee(n.options)}:n),ge=n=>n.toLowerCase().replace(/[.,!?]/g,"").replace(/\s+/g," ").trim();function ae(n,t){const y=ge(n),C=y.split(" ").filter(Boolean);return t.required.every(T=>T.some(g=>y.includes(g)))&&C.length>t.required.length}function je(n){return[...new Set(n.required.flat())].filter(Boolean)}const c="ready",re="listening",ie="correct",S="wrong",oe="complete",F=3,a={primary:"#06B6D4",primaryDark:"#0891B2",correct:"#4CAF50",correctDark:"#388E3C",wrong:"#EF4444",wrongDark:"#DC2626"},se=`
  .kd-root {
    --sp-1: clamp(4px, 0.8vh, 8px);
    --sp-2: clamp(8px, 1.6vh, 14px);
    --sp-3: clamp(12px, 2.4vh, 22px);
    height: 100dvh; overflow: hidden;
    background: linear-gradient(180deg, #ECFEFF 0%, #CFFAFE 50%, #A5F3FC 100%);
    font-family: 'Fredoka', system-ui, sans-serif;
    display: flex; flex-direction: column;
  }
  .kd-body {
    flex: 1; min-height: 0;
    display: flex; flex-direction: column; align-items: center;
    width: 100%; max-width: 520px;
    margin: 0 auto;
    padding: var(--sp-2) clamp(14px, 3.5vw, 28px) var(--sp-2);
  }
  .kd-stats {
    flex-shrink: 0; width: 100%;
    display: flex; align-items: center; justify-content: space-between;
    gap: 8px; margin-bottom: var(--sp-2);
  }
  .kd-pill {
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(11px, 2vh, 13px);
    border-radius: 999px;
    padding: clamp(3px, 0.7vh, 5px) clamp(10px, 2.4vw, 14px);
    white-space: nowrap;
  }
  .kd-pill.prog { background: #fff; color: ${a.primaryDark}; border: 1.5px solid ${a.primary}44; }
  .kd-pill.star { background: #FFF6D6; color: #B58800; border: 1.5px solid #FFE08A; }
  .kd-pill.fire { background: #FFEAD0; color: #D9610B; border: 1.5px solid #FFC081; }
  .kd-pill.life { background: #FFE9EC; color: #E11D48; border: 1.5px solid #FCA5B4; }
  .kd-pill.gem  { background: #E0F2FE; color: #0369A1; border: 1.5px solid #7DD3FC; }
  @media (max-width: 380px) { .kd-stats { gap: 4px; } .kd-pill { padding: 3px 8px; } }
  .kd-bar-wrap {
    flex-shrink: 0; width: 100%;
    background: #A5F3FC; border-radius: 999px;
    height: clamp(6px, 1.2vh, 9px); overflow: hidden;
    margin-bottom: var(--sp-3);
  }
  .kd-bar-fill {
    background: linear-gradient(90deg, ${a.primary}, #22D3EE);
    height: 100%; border-radius: 999px;
    transition: width 0.3s;
  }
  .kd-stage {
    flex: 1; min-height: 0; width: 100%;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: var(--sp-2);
  }
  .kd-card {
    flex-shrink: 0; width: 100%;
    display: flex; flex-direction: column; align-items: center;
    gap: clamp(8px, 1.8vh, 16px);
    text-align: center;
    background: #fff;
    border: 3px solid ${a.primary}55;
    border-radius: clamp(18px, 3vh, 28px);
    padding: clamp(16px, 3.4vh, 30px) clamp(16px, 4vw, 28px) clamp(18px, 3.6vh, 32px);
    box-shadow: 0 clamp(3px, 0.6vh, 5px) 0 ${a.primary}2e, 0 12px 26px -16px rgba(0,0,0,.2);
    transition: background 0.3s, border-color 0.3s;
  }
  .kd-card.correct { background: #F0FFF0; border-color: ${a.correct}; }
  .kd-card.wrong   { background: #FFF0F0; border-color: ${a.wrong}; }
  .kd-context {
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(9px, 1.7vh, 12px); letter-spacing: 0.14em;
    color: ${a.primaryDark};
    background: #ECFEFF;
    border: 1.5px solid ${a.primary}44;
    border-radius: 999px;
    padding: clamp(3px, 0.7vh, 5px) clamp(12px, 2.6vw, 18px);
  }
  .kd-emoji { font-size: clamp(36px, 8vh, 56px); line-height: 1; }
  .kd-prompt {
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(17px, 3.8vh, 26px);
    line-height: 1.3; color: #333;
    transition: color 0.3s;
  }
  .kd-card.correct .kd-prompt { color: ${a.correctDark}; }
  .kd-card.wrong   .kd-prompt { color: ${a.wrongDark}; }
  .kd-example {
    font-size: clamp(12px, 2.4vh, 15px);
    font-weight: 600; color: #94A3B8; font-style: italic;
    line-height: 1.5;
  }
  .kd-options {
    width: 100%;
    display: flex; flex-direction: column; gap: clamp(8px, 1.6vh, 12px);
    margin-top: clamp(4px, 1vh, 8px);
  }
  .kd-opt {
    font-family: 'Baloo 2', sans-serif; font-weight: 700;
    font-size: clamp(13px, 2.6vh, 17px);
    text-align: left; line-height: 1.35;
    padding: clamp(10px, 2vh, 14px) clamp(14px, 3vw, 18px);
    border: 2.5px solid #E2E8F0; border-radius: 14px;
    background: #F8FAFC; color: #334155;
    cursor: pointer;
    transition: transform .12s ease, background .2s, border-color .2s, color .2s;
  }
  .kd-opt:active { transform: translateY(2px); }
  .kd-opt:disabled { cursor: default; }
  @media (hover: hover) {
    .kd-opt:not(:disabled):hover { border-color: ${a.primary}; background: #ECFEFF; }
  }
  .kd-opt.correct { background: #F0FFF0; border-color: ${a.correct}; color: ${a.correctDark}; }
  .kd-opt.wrong   { background: #FFF0F0; border-color: ${a.wrong};   color: ${a.wrongDark}; }
  .kd-status {
    flex-shrink: 0; width: 100%;
    min-height: clamp(64px, 12vh, 96px);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: var(--sp-1); text-align: center;
  }
  .kd-status-text {
    font-weight: 700; font-size: clamp(12px, 2.4vh, 15px);
    color: #8A7860; max-width: 340px; line-height: 1.4; margin: 0;
  }
  .kd-status-text.err  { color: ${a.wrongDark}; }
  .kd-status-text.warn { color: #D9610B; }
  .kd-status-text.live { color: ${a.primary}; font-family: 'Baloo 2', sans-serif; font-weight: 800; }
  .kd-mic-wrap {
    position: relative;
    width: clamp(56px, 10vh, 76px); height: clamp(56px, 10vh, 76px);
    display: flex; align-items: center; justify-content: center;
  }
  .kd-mic-ring {
    position: absolute; inset: 0; border-radius: 50%;
    background: rgba(6,182,212,0.16);
    animation: kd-pulse 1.2s ease-out infinite;
  }
  .kd-mic-ring.r2 { inset: 12%; background: rgba(6,182,212,0.22); animation-delay: 0.3s; }
  .kd-mic-core {
    width: 78%; height: 78%; border-radius: 50%;
    background: linear-gradient(180deg, ${a.primary}d9, ${a.primary});
    display: flex; align-items: center; justify-content: center;
    font-size: clamp(22px, 4.2vh, 30px);
    box-shadow: 0 4px 12px rgba(6,182,212,0.4);
  }
  @keyframes kd-pulse {
    0%   { transform: scale(0.8); opacity: 0.8; }
    100% { transform: scale(1.55); opacity: 0; }
  }
  .kd-footer {
    flex-shrink: 0; display: flex; gap: clamp(8px, 2vw, 12px);
    justify-content: center;
    width: 100%; max-width: 520px; margin: 0 auto;
    padding: var(--sp-2) clamp(14px, 3.5vw, 28px) clamp(12px, 2.4vh, 20px);
  }
  .kd-icon-btn {
    flex-shrink: 0;
    width: clamp(46px, 8.6vh, 56px); height: clamp(46px, 8.6vh, 56px);
    border-radius: 14px; background: #fff; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: transform .12s ease;
  }
  .kd-icon-btn:active { transform: translateY(2px); }
  .kd-icon-btn.repeat { border: 2px solid ${a.primary}; }
  .kd-icon-btn.skip   { border: 2px solid #E0E0E0; }
  .kd-main-btn {
    flex: 1; min-width: 0;
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(15px, 2.8vh, 18px);
    border: none; border-radius: 14px; cursor: pointer;
    padding: clamp(10px, 2vh, 14px) 12px; color: #fff;
    transition: transform .12s ease, box-shadow .12s ease;
  }
  .kd-main-btn:active { transform: translateY(2px); }
  .kd-main-btn.mic {
    background: linear-gradient(180deg, ${a.primary}cc, ${a.primary});
    box-shadow: 0 4px 0 ${a.primaryDark};
  }
  .kd-main-btn.stop {
    background: #fff; color: ${a.primary}; border: 2px solid ${a.primary};
  }
  .kd-icon-btn:disabled, .kd-main-btn:disabled { opacity: 0.45; cursor: not-allowed; }
  .kd-center {
    flex: 1; min-height: 0;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: var(--sp-2); padding: 16px; text-align: center;
  }
`;function Te({onBack:n,language:t="bm",topicComplete:y,onNextTopic:C,onNextModule:R}){const T=s.isMobile(),g=s.isSupported(),[h,ne]=l.useState(()=>te()),[f,z]=l.useState(0),[d,p]=l.useState(c),[M,P]=l.useState(0),[Y,E]=l.useState(0),[j,w]=l.useState(0),[N,k]=l.useState(null),[L,B]=l.useState(null),{awardCorrect:le,awardWrong:O,completeActivity:H,hearts:ce,gems:pe}=fe(Z),K=l.useRef(0),A=l.useRef(0),u=l.useRef(!1);l.useEffect(()=>{K.current=f},[f]),l.useEffect(()=>{A.current=j},[j]),l.useEffect(()=>()=>{s.stop(),s.stopSpeaking()},[]);const r=h[f]??null;l.useEffect(()=>{if(d!==c||!r)return;s.stopSpeaking();const i=r.type==="intro"?r.audioText:`${r.situation} Apa yang patut kamu cakap?`,o=setTimeout(()=>s.speak(i,"ms",{rate:.85}),300);return()=>clearTimeout(o)},[f,d,r]);const v=l.useCallback(()=>{const i=K.current+1;if(i>=h.length){p(oe),I({particleCount:200,spread:160,origin:{y:.4}}),y?.(Z),H();return}z(i),w(0),k(null),B(null),p(c)},[h.length,y,H]),$=()=>{le(),P(i=>i+1),E(i=>{const o=i+1;return o%5===0?(Q("streak"),I({particleCount:150,spread:100,origin:{y:.5}})):(Q("correct"),I({particleCount:40,spread:60,origin:{y:.6},scalar:.8})),o}),w(0),p(ie),setTimeout(()=>v(),1800)},de=()=>{O(),E(0),w(o=>o+1);const i=A.current+1>=F;p(S),i?(r&&s.speak(r.example,"ms"),setTimeout(()=>v(),2600)):setTimeout(()=>p(c),1900)},me=(i,o)=>{B(o),i.correct?$():(O(),E(0),p(S),setTimeout(()=>v(),2600))},xe=()=>{if(!s.isSupported()||u.current)return;u.current=!0,k(null),p(re);const i=r;s.listen("ms-MY",(o,b,U)=>{u.current=!1;let D=ae(o,i);!D&&U?.length>1&&(D=U.some(he=>ae(he.transcript,i))),D?$():de()},o=>{if(u.current=!1,o==="not-allowed"||o==="service-not-allowed"||o==="audio-capture"){k("perm"),p(c);return}if(o==="network"){k("net"),p(c);return}A.current<F?(k("nospeech"),w(b=>b+1),p(c)):(k(null),p(S),setTimeout(()=>v(),2e3))},{retries:T?2:1,grammarWords:i?je(i):[]})},ue=()=>{$()},W=()=>{if(!r)return;s.stop(),s.stopSpeaking(),u.current=!1,p(c);const i=r.type==="intro"?r.audioText:`${r.situation} Apa yang patut kamu cakap?`;s.speak(i,"ms",{rate:.85})},_=()=>{s.stop(),s.stopSpeaking(),u.current=!1,v()},ke=()=>{s.stop(),s.stopSpeaking(),u.current=!1,ne(te()),z(0),P(0),E(0),w(0),k(null),B(null),p(c)},x=d===ie,m=d===S,q=d===re,G=t==="bm"?"Kenalkan Diri":"Introduce Yourself";return d===oe?e.jsxs(e.Fragment,{children:[e.jsx("style",{children:se}),e.jsxs("div",{className:"kd-root",children:[e.jsx(V,{onBack:n,language:t,title:G}),e.jsxs("div",{className:"kd-center",children:[e.jsx("div",{style:{fontSize:"clamp(56px, 12vh, 90px)",lineHeight:1},children:"🙋"}),e.jsx("h2",{style:{fontFamily:"'Baloo 2', sans-serif",color:a.primary,fontSize:"clamp(24px, 5vh, 36px)",fontWeight:800,margin:0},children:t==="bm"?"Tahniah!":"Well Done!"}),e.jsxs("p",{style:{fontSize:"clamp(14px, 2.6vh, 18px)",color:"#555",fontWeight:600,margin:"0.6rem 0"},children:[t==="bm"?"Markah: ":"Score: ",e.jsx("strong",{children:M}),"/",h.length]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.6rem",background:"#FFF6D6",borderRadius:999,padding:"0.5rem 1.2rem",border:"1.5px solid #FFE08A"},children:[e.jsx("span",{style:{fontSize:"1.1rem"},children:"🔥"}),e.jsxs("span",{style:{fontWeight:800,fontFamily:"'Baloo 2', sans-serif",color:"#B58800",fontSize:"clamp(13px, 2.4vh, 16px)"},children:[t==="bm"?"Streak terbaik:":"Best streak:"," ",Y]})]}),e.jsxs("div",{style:{display:"flex",gap:"0.8rem",marginTop:"var(--sp-2)"},children:[e.jsxs("button",{onClick:ke,style:{fontFamily:"'Baloo 2', sans-serif",padding:"0.8rem 1.5rem",background:"#fff",color:"#475569",border:"2px solid #E2E8F0",borderRadius:999,fontSize:"1rem",cursor:"pointer",fontWeight:800},children:["🔄 ",t==="bm"?"Main Semula":"Play Again"]}),e.jsx("button",{onClick:R||C||n,style:{fontFamily:"'Baloo 2', sans-serif",padding:"0.8rem 1.5rem",background:`linear-gradient(180deg, ${a.primary}cc, ${a.primary})`,color:"#fff",border:"none",borderRadius:999,fontSize:"1rem",cursor:"pointer",fontWeight:800,boxShadow:`0 4px 0 ${a.primaryDark}`},children:t==="bm"?"Modul Seterusnya →":"Next Module →"})]})]})]})]}):e.jsxs(e.Fragment,{children:[e.jsx("style",{children:se}),e.jsxs("div",{className:"kd-root",children:[e.jsx(V,{onBack:n,language:t,title:G}),e.jsxs("div",{className:"kd-body",children:[e.jsxs("div",{className:"kd-stats",children:[e.jsxs("span",{className:"kd-pill prog",children:[f+1," / ",h.length]}),e.jsxs("span",{style:{display:"flex",gap:6},children:[e.jsxs("span",{className:"kd-pill life",children:["❤️ ",ce]}),e.jsxs("span",{className:"kd-pill gem",children:["💎 ",pe]}),e.jsxs("span",{className:"kd-pill star",children:["⭐ ",M]}),e.jsxs("span",{className:"kd-pill fire",children:["🔥 ",Y]})]})]}),e.jsx("div",{className:"kd-bar-wrap",children:e.jsx("div",{className:"kd-bar-fill",style:{width:`${f/h.length*100}%`}})}),e.jsxs("div",{className:"kd-stage",children:[e.jsxs("div",{className:`kd-card${x?" correct":m?" wrong":""}`,children:[e.jsx("div",{className:"kd-context",children:r?.type==="intro"?t==="bm"?"KENALKAN DIRI":"INTRODUCE YOURSELF":t==="bm"?"PERMINTAAN SOPAN":"POLITE REQUESTS"}),r?.type==="intro"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"kd-emoji",children:r.emoji}),e.jsx("div",{className:"kd-prompt",children:t==="bm"?r.prompt:r.promptEN}),e.jsxs("div",{className:"kd-example",children:[t==="bm"?"Baca ayat ini: ":"Example: ",'"',r.example,'"']})]}),r?.type==="polite"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"kd-emoji",children:r.emoji}),e.jsx("div",{className:"kd-prompt",children:t==="bm"?r.situation:r.situationEN}),e.jsx("div",{className:"kd-example",children:t==="bm"?"Apa yang patut kamu cakap?":"What should you say?"}),e.jsx("div",{className:"kd-options",children:r.options.map((i,o)=>{let b="kd-opt";return(x||m)&&(i.correct?b+=" correct":o===L&&(b+=" wrong")),e.jsxs("button",{className:b,disabled:d!==c,onClick:()=>me(i,o),children:[(x||m)&&i.correct&&"✅ ",m&&o===L&&!i.correct&&"❌ ",t==="bm"?i.text:i.textEN]},o)})})]})]}),e.jsxs("div",{className:"kd-status",children:[r?.type==="intro"&&q&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"kd-mic-wrap",children:[e.jsx("div",{className:"kd-mic-ring"}),e.jsx("div",{className:"kd-mic-ring r2"}),e.jsx("div",{className:"kd-mic-core",children:"🎤"})]}),e.jsx("p",{className:"kd-status-text live",children:t==="bm"?"Cakap sekarang...":"Speak now..."})]}),x&&e.jsxs("p",{className:"kd-status-text live",style:{fontSize:"clamp(15px, 3vh, 19px)"},children:["✅ ",t==="bm"?"Bagus!":"Great!"]}),r?.type==="intro"&&m&&e.jsx("p",{className:"kd-status-text warn",children:j>=F?t==="bm"?"Tak mengapa — dengar contoh tadi ya!":"It's okay — listen to the example!":t==="bm"?"Hampir! Cuba sekali lagi 💪":"Almost! Try once more 💪"}),r?.type==="intro"&&d===c&&N==="perm"&&e.jsxs("p",{className:"kd-status-text err",children:["🎤 ",t==="bm"?"Benarkan akses mikrofon dalam pelayar, kemudian tekan 🎤 sekali lagi.":"Please allow microphone access in your browser, then tap 🎤 again."]}),r?.type==="intro"&&d===c&&N==="net"&&e.jsxs("p",{className:"kd-status-text err",children:["📡 ",t==="bm"?"Sambungan internet diperlukan untuk suara. Cuba lagi.":"Voice needs an internet connection. Try again."]}),r?.type==="intro"&&d===c&&N==="nospeech"&&e.jsx("p",{className:"kd-status-text warn",children:t==="bm"?"Tak dengar suara. Cuba lagi! 🎤":"Didn't hear you. Try again! 🎤"}),r?.type==="intro"&&d===c&&!N&&e.jsxs("p",{className:"kd-status-text",children:[g?t==="bm"?"Tekan 🎤 dan sebut!":"Tap 🎤 and say it!":t==="bm"?"Sebut, kemudian tekan butang.":"Say it, then tap the button.",j>0&&g&&` · ${t==="bm"?"Cuba":"Try"} ${j+1}/${F}`]}),r?.type==="polite"&&d===c&&e.jsx("p",{className:"kd-status-text",children:t==="bm"?"Pilih jawapan yang sopan 👇":"Pick the polite answer 👇"})]})]})]}),e.jsxs("div",{className:"kd-footer",children:[r?.type==="intro"&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"kd-icon-btn repeat",onClick:W,disabled:x||m,title:t==="bm"?"Dengar semula":"Hear again",children:e.jsx(X,{size:22,color:a.primary})}),q?e.jsxs("button",{className:"kd-main-btn stop",onClick:()=>{s.stop(),u.current=!1,p(c)},children:["⏸ ",t==="bm"?"Berhenti":"Stop"]}):g?e.jsxs("button",{className:"kd-main-btn mic",onClick:()=>xe(),disabled:x||m,children:["🎤 ",t==="bm"?"Tekan untuk Bercakap":"Tap to Speak"]}):e.jsxs("button",{className:"kd-main-btn mic",onClick:ue,disabled:x||m,children:["✓ ",t==="bm"?"Sudah Sebut!":"Said It!"]}),e.jsx("button",{className:"kd-icon-btn skip",onClick:_,disabled:x||m,title:t==="bm"?"Langkau":"Skip",children:e.jsx(J,{size:22,color:a.wrong})})]}),r?.type==="polite"&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"kd-icon-btn repeat",onClick:W,disabled:x||m,title:t==="bm"?"Dengar semula":"Hear again",children:e.jsx(X,{size:22,color:a.primary})}),e.jsx("button",{className:"kd-icon-btn skip",onClick:_,disabled:x||m,title:t==="bm"?"Langkau":"Skip",children:e.jsx(J,{size:22,color:a.wrong})})]})]})]})]})}export{Te as default};
