import{S as t,r as s,j as e,p as G}from"./index-YCInXYg5.js";import{B as T}from"./BMHeader-B5cOc9J_.js";import{u as ie}from"./useTopicGamification-I1kCte-J.js";import{c as R}from"./confetti.module-oQXWb4Lk.js";import{R as te}from"./refresh-cw-J9zlOc9a.js";import{S as ne}from"./skip-forward-CWFoDEaO.js";import"./useGamification-g-vGaz2S.js";const oe=10,v=3,a={primary:"#1E7AC9",primaryDark:"#0E4A7E",correct:"#4CAF50",correctDark:"#388E3C",wrong:"#FF6B6B",wrongDark:"#D32F2F"},U=[{id:"s1",emoji:"👦🍚",phrase:"Saya makan nasi",keywords:[["saya","i","me"],["makan","eat","eating"],["nasi","rice"]]},{id:"s2",emoji:"👩‍🍳🍳",phrase:"Ibu masak di dapur",keywords:[["ibu","mak","emak","mother","mom"],["masak","memasak","cook"],["dapur","kitchen"]]},{id:"s3",emoji:"👧📖",phrase:"Kakak baca buku cerita",keywords:[["kakak","kak","sister","girl"],["baca","membaca","read"],["buku","book"],["cerita","story"]]},{id:"s4",emoji:"🤹",phrase:"Mereka bermain bola di padang",keywords:[["mereka","they"],["main","bermain","play"],["bola","ball"],["padang","field"]]},{id:"s5",emoji:"🏃💨",phrase:"Adik lari ke dalam rumah",keywords:[["adik","kid","boy"],["lari","berlari","run"],["rumah","house","home"]]},{id:"s6",emoji:"🌧️☂️",phrase:"Ayah buka payung",keywords:[["ayah","bapa","father","dad"],["buka","open"],["payung","umbrella"]]},{id:"s7",emoji:"🐱😴",phrase:"Kucing tidur atas sofa",keywords:[["kucing","cat"],["tidur","sleep","sleeping"],["sofa","couch"]]},{id:"s8",emoji:"👴🌱",phrase:"Atuk siram pokok bunga",keywords:[["atuk","datuk","grandpa"],["siram","water","watering"],["pokok","plant","tree"],["bunga","flower"]]},{id:"s9",emoji:"🚌🏫",phrase:"Kami naik bas pergi sekolah",keywords:[["kami","we","us"],["naik","ride","take"],["bas","bus"],["sekolah","school"]]},{id:"s10",emoji:"🐕🦴",phrase:"Anjing suka gigit tulang",keywords:[["anjing","dog"],["suka","like","love"],["gigit","bite","chew"],["tulang","bone"]]},{id:"s11",emoji:"👨🚗",phrase:"Ayah bawa kereta ke pejabat",keywords:[["ayah","bapa","father","dad"],["bawa","drive","bring"],["kereta","car"],["pejabat","ofis","office"]]},{id:"s12",emoji:"🧒🧼",phrase:"Adik basuh tangan guna sabun",keywords:[["adik","kid","boy","girl"],["basuh","cuci","wash"],["tangan","hand"],["sabun","soap"]]},{id:"s13",emoji:"🐔🥚",phrase:"Ayam bertelur di dalam reban",keywords:[["ayam","chicken"],["telur","bertelur","egg","lay"],["reban","coop","pen"]]},{id:"s14",emoji:"👩‍🏫📝",phrase:"Cikgu ajar murid menulis",keywords:[["cikgu","guru","teacher"],["ajar","mengajar","teach"],["murid","student"],["tulis","menulis","write"]]},{id:"s15",emoji:"🧒🧒🏠",phrase:"Kawan-kawan main tepi rumah",keywords:[["kawan","friend"],["main","play"],["tepi","side","beside"],["rumah","house"]]},{id:"s16",emoji:"👦🍚👧🥤",phrase:"Abang makan nasi dan kakak minum air",keywords:[["abang","bang","brother"],["makan","eat"],["nasi","rice"],["dan","and"],["kakak","kak","sister"],["minum","drink"],["air","water"]]},{id:"s17",emoji:"🌧️🏃🏫",phrase:"Hujan turun tetapi kami pergi sekolah",keywords:[["hujan","rain"],["turun","jatuh","fall","falling"],["tetapi","tapi","but"],["kami","kita","we"],["pergi","go","going"],["sekolah","school"]]},{id:"s18",emoji:"⚽🏊",phrase:"Kita boleh main bola atau kita boleh berenang",keywords:[["kita","kami","we"],["boleh","can"],["main","bermain","play"],["bola","ball"],["atau","or"],["renang","berenang","swim","swimming"]]},{id:"s19",emoji:"🧒😢",phrase:"Adik menangis kerana dia jatuh",keywords:[["adik","kid"],["menangis","tangis","cry","crying"],["kerana","sebab","because"],["dia","he","she"],["jatuh","fall","fell"]]}],ce=n=>[...n].sort(()=>Math.random()-.5),V=()=>ce(U).slice(0,Math.min(oe,U.length)),le=n=>n.toLowerCase().replace(/[.,!?]/g,"").replace(/\s+/g," ").trim();function O(n,r){const f=le(n),y=r.keywords.filter(l=>l.some(S=>f.includes(S))).length,F=Math.ceil(r.keywords.length*.6);return y>=F}function de(n){return[...new Set(n.keywords.flat())].filter(Boolean)}const M=`
  .sfb-root {
    --sp-1: clamp(4px, 0.8vh, 8px);
    --sp-2: clamp(8px, 1.6vh, 14px);
    --sp-3: clamp(12px, 2.4vh, 22px);
    height: 100dvh; overflow: hidden;
    background:
      radial-gradient(ellipse 70% 50% at 18% 0%, #D5E9FA 0%, transparent 60%),
      radial-gradient(ellipse 60% 45% at 88% 100%, #C8DCF6 0%, transparent 65%),
      linear-gradient(180deg, #EBF5FF 0%, #DCEBFB 55%, #C8DCF6 100%);
    font-family: 'Fredoka', system-ui, sans-serif;
    display: flex; flex-direction: column;
  }
  .sfb-body {
    flex: 1; min-height: 0;
    display: flex; flex-direction: column; align-items: center;
    width: 100%; max-width: 620px;
    margin: 0 auto;
    padding: var(--sp-2) clamp(14px, 3.5vw, 28px) var(--sp-2);
  }
  .sfb-stats {
    flex-shrink: 0; width: 100%;
    display: flex; align-items: center; justify-content: space-between;
    gap: 8px;
    margin-bottom: var(--sp-2);
  }
  .sfb-pill {
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(11px, 2vh, 13px);
    border-radius: 999px;
    padding: clamp(3px, 0.7vh, 5px) clamp(10px, 2.4vw, 14px);
    white-space: nowrap;
  }
  .sfb-pill.prog { background: #FFFFFFCC; color: #0E4A7E; border: 1.5px solid ${a.primary}44; }
  .sfb-pill.star { background: #FFF6D6; color: #B58800; border: 1.5px solid #FFE08A; }
  .sfb-pill.fire { background: #FFEAD0; color: #D9610B; border: 1.5px solid #FFC081; }
  .sfb-bar-wrap {
    flex-shrink: 0; width: 100%;
    background: #C8DCF6; border-radius: 999px;
    height: clamp(6px, 1.2vh, 9px); overflow: hidden;
    margin-bottom: var(--sp-3);
  }
  .sfb-bar-fill {
    background: linear-gradient(90deg, ${a.primary}, #6FB0E8);
    height: 100%; border-radius: 999px;
    transition: width 0.3s;
  }
  .sfb-stage {
    flex: 1; min-height: 0; width: 100%;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: var(--sp-2);
  }
  .sfb-card {
    flex-shrink: 0; width: 100%;
    display: flex; flex-direction: column; align-items: center;
    gap: clamp(10px, 2.2vh, 20px);
    text-align: center;
    background: #fff;
    border: 3px solid #9DC3EC;
    border-radius: clamp(18px, 3vh, 28px);
    padding: clamp(16px, 3.4vh, 30px) clamp(16px, 4vw, 28px) clamp(18px, 3.6vh, 32px);
    box-shadow: 0 clamp(3px, 0.6vh, 5px) 0 ${a.primary}2e, 0 12px 26px -16px rgba(0,0,0,.2);
    transition: background 0.3s, border-color 0.3s;
  }
  .sfb-card.correct { background: #F0FFF0; border-color: ${a.correct}; }
  .sfb-card.wrong   { background: #FFF0F0; border-color: ${a.wrong}; }
  .sfb-card-label {
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(9px, 1.7vh, 12px); letter-spacing: 0.14em;
    color: #0E4A7E;
    background: #EAF3FC;
    border: 1.5px solid #9DC3EC;
    border-radius: 999px;
    padding: clamp(3px, 0.7vh, 5px) clamp(12px, 2.6vw, 18px);
  }
  .sfb-card.correct .sfb-card-label { color: ${a.correctDark}; background: #E9F9E9; border-color: ${a.correct}66; }
  .sfb-card.wrong   .sfb-card-label { color: ${a.wrongDark};   background: #FDEAEA; border-color: ${a.wrong}66; }
  .sfb-card-emoji {
    font-size: clamp(48px, 11vh, 84px);
    line-height: 1.15;
    letter-spacing: clamp(8px, 2vw, 18px);
    padding-left: clamp(8px, 2vw, 18px);
    user-select: none;
  }
  .sfb-card-phrase {
    width: 100%;
    border-top: 2px dashed #F2E3CB;
    padding-top: clamp(10px, 2.2vh, 20px);
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(20px, 4.6vh, 36px);
    line-height: 1.25; color: #333;
    transition: color 0.3s;
  }
  .sfb-card.correct .sfb-card-phrase { border-top-color: ${a.correct}44; color: ${a.correctDark}; }
  .sfb-card.wrong   .sfb-card-phrase { border-top-color: ${a.wrong}44; color: ${a.wrongDark}; }
  .sfb-status {
    flex-shrink: 0; width: 100%;
    min-height: clamp(64px, 12vh, 96px);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: var(--sp-1);
    text-align: center;
  }
  .sfb-status-text {
    font-weight: 700; font-size: clamp(12px, 2.4vh, 15px);
    color: #8A7860; max-width: 340px; line-height: 1.4;
    margin: 0;
  }
  .sfb-status-text.err  { color: ${a.wrongDark}; }
  .sfb-status-text.warn { color: #D9610B; }
  .sfb-status-text.live { color: ${a.primary}; font-family: 'Baloo 2', sans-serif; font-weight: 800; }
  .sfb-mic-wrap {
    position: relative;
    width: clamp(56px, 10vh, 76px); height: clamp(56px, 10vh, 76px);
    display: flex; align-items: center; justify-content: center;
  }
  .sfb-mic-ring {
    position: absolute; inset: 0;
    border-radius: 50%;
    background: rgba(255,150,0,0.16);
    animation: sfb-pulse 1.2s ease-out infinite;
  }
  .sfb-mic-ring.r2 { inset: 12%; background: rgba(255,150,0,0.22); animation-delay: 0.3s; }
  .sfb-mic-core {
    width: 78%; height: 78%;
    border-radius: 50%;
    background: linear-gradient(180deg, ${a.primary}d9, ${a.primary});
    display: flex; align-items: center; justify-content: center;
    font-size: clamp(22px, 4.2vh, 30px);
    box-shadow: 0 4px 12px rgba(255,150,0,0.4);
  }
  @keyframes sfb-pulse {
    0%   { transform: scale(0.8); opacity: 0.8; }
    100% { transform: scale(1.55); opacity: 0; }
  }
  .sfb-footer {
    flex-shrink: 0;
    display: flex; gap: clamp(8px, 2vw, 12px);
    width: 100%; max-width: 620px;
    margin: 0 auto;
    padding: var(--sp-2) clamp(14px, 3.5vw, 28px) clamp(12px, 2.4vh, 20px);
  }
  .sfb-icon-btn {
    flex-shrink: 0;
    width: clamp(46px, 8.6vh, 56px); height: clamp(46px, 8.6vh, 56px);
    border-radius: 14px;
    background: #fff; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: transform .12s ease;
  }
  .sfb-icon-btn:active { transform: translateY(2px); }
  .sfb-icon-btn.repeat { border: 2px solid ${a.primary}; }
  .sfb-icon-btn.skip   { border: 2px solid #E0E0E0; }
  .sfb-main-btn {
    flex: 1; min-width: 0;
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(15px, 2.8vh, 18px);
    border: none; border-radius: 14px; cursor: pointer;
    padding: clamp(10px, 2vh, 14px) 12px;
    color: #fff;
    transition: transform .12s ease, box-shadow .12s ease;
  }
  .sfb-main-btn:active { transform: translateY(2px); }
  .sfb-main-btn.mic {
    background: linear-gradient(180deg, ${a.primary}cc, ${a.primary});
    box-shadow: 0 4px 0 ${a.primaryDark};
  }
  .sfb-main-btn.stop {
    background: #fff; color: ${a.primary};
    border: 2px solid ${a.primary};
  }
  .sfb-icon-btn:disabled, .sfb-main-btn:disabled { opacity: 0.45; cursor: not-allowed; }
  .sfb-center {
    flex: 1; min-height: 0;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: var(--sp-2); padding: 16px; text-align: center;
  }
`;function ge({onBack:n,language:r="bm",topicComplete:f,onNextTopic:y}){const F=t.isMobile(),[l,S]=s.useState(()=>V()),[h,z]=s.useState(0),[p,o]=s.useState("ready"),[I,W]=s.useState(0),[X,C]=s.useState(0),[u,x]=s.useState(0),[w,m]=s.useState(null),[q,H]=s.useState(!1),{completeActivity:K}=ie("1-2-2-membaca-mekanis"),E=s.useRef(0),N=s.useRef(l),$=s.useRef(0),d=s.useRef(!1);s.useEffect(()=>{E.current=h},[h]),s.useEffect(()=>{N.current=l},[l]),s.useEffect(()=>{$.current=u},[u]),s.useEffect(()=>()=>{t.stop(),t.stopSpeaking()},[]);const b=l[h]??null,A=r==="bm"?"Baca dengan Lancar":"Fluent Reading",B=s.useCallback(i=>t.speak(i,"ms"),[]),j=s.useCallback(()=>{const i=E.current+1;if(i>=N.current.length){f&&f("1-2-2-membaca-mekanis"),K(),R({particleCount:150,spread:140,origin:{y:.4}}),H(!0);return}z(i),x(0),m(null),o("ready")},[f,K]),J=()=>{W(i=>i+1),C(i=>{const c=i+1;return c%5===0?(G("streak"),R({particleCount:150,spread:100,origin:{y:.5}})):(G("correct"),R({particleCount:40,spread:60,origin:{y:.6},scalar:.8})),c}),x(0),o("correct"),B(["Bagus!","Hebat!","Pandai!","Bijak!","Cemerlang!"][Math.floor(Math.random()*5)]),setTimeout(()=>j(),1800)},Q=()=>{C(0),x(c=>c+1);const i=$.current+1>=v;o("wrong"),i?(b&&B(b.phrase),setTimeout(()=>j(),2600)):setTimeout(()=>o("ready"),1900)},Z=()=>{if(!t.isSupported()||d.current)return;d.current=!0,m(null),o("listening");const i=N.current[E.current];t.listen("ms-MY",(c,Y,_)=>{d.current=!1;let D=O(c,i);!D&&_?.length>1&&(D=_.some(se=>O(se.transcript,i))),D?J():Q()},c=>{if(d.current=!1,c==="not-allowed"||c==="service-not-allowed"||c==="audio-capture"){m("perm"),o("ready");return}if(c==="network"){m("net"),o("ready");return}$.current<v?(m("nospeech"),x(Y=>Y+1),o("ready")):(m(null),o("wrong"),setTimeout(()=>j(),2e3))},{retries:F?2:1,grammarWords:i?de(i):[]})},ee=()=>{b&&(t.stop(),t.stopSpeaking(),d.current=!1,o("ready"),B(b.phrase))},ae=()=>{t.stop(),t.stopSpeaking(),d.current=!1,j()},re=()=>{t.stop(),t.stopSpeaking(),d.current=!1,S(V()),z(0),W(0),C(0),x(0),m(null),o("ready"),H(!1)},g=p==="correct",k=p==="wrong",L=p==="listening";if(q)return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:M}),e.jsxs("div",{className:"sfb-root",children:[e.jsx(T,{onBack:n,language:r,title:A}),e.jsxs("div",{className:"sfb-center",children:[e.jsx("div",{style:{fontSize:"clamp(56px, 12vh, 90px)"},children:"🎯"}),e.jsx("h2",{style:{fontFamily:"'Baloo 2', sans-serif",color:a.primary,fontSize:"clamp(24px, 5vh, 36px)",fontWeight:800,margin:0},children:r==="bm"?"Tahniah!":"Congratulations!"}),e.jsxs("p",{style:{fontSize:"clamp(14px, 2.6vh, 18px)",color:"#555",fontWeight:600,margin:"0.6rem 0 1.2rem"},children:[r==="bm"?"Markah: ":"Score: ",e.jsx("strong",{children:I}),"/",l.length]}),e.jsxs("div",{style:{display:"flex",gap:"0.8rem",marginTop:"var(--sp-2)"},children:[e.jsxs("button",{onClick:re,style:{fontFamily:"'Baloo 2', sans-serif",padding:"0.8rem 1.5rem",background:"#fff",color:"#475569",border:"2px solid #E2E8F0",borderRadius:999,fontSize:"1rem",cursor:"pointer",fontWeight:800},children:["🔄 ",r==="bm"?"Main Semula":"Play Again"]}),y?e.jsx("button",{onClick:y,style:{fontFamily:"'Baloo 2', sans-serif",padding:"0.8rem 1.5rem",background:`linear-gradient(180deg, ${a.primary}cc, ${a.primary})`,color:"#fff",border:"none",borderRadius:999,fontSize:"1rem",cursor:"pointer",fontWeight:800,boxShadow:`0 4px 0 ${a.primaryDark}`},children:r==="bm"?"Topik Seterusnya →":"Next Topic →"}):e.jsx("button",{onClick:n,style:{fontFamily:"'Baloo 2', sans-serif",padding:"0.8rem 1.5rem",background:`linear-gradient(180deg, ${a.primary}cc, ${a.primary})`,color:"#fff",border:"none",borderRadius:999,fontSize:"1rem",cursor:"pointer",fontWeight:800,boxShadow:`0 4px 0 ${a.primaryDark}`},children:r==="bm"?"Kembali":"Back"})]})]})]})]});const P=t.getUnsupportedReason();return P?e.jsxs(e.Fragment,{children:[e.jsx("style",{children:M}),e.jsxs("div",{className:"sfb-root",children:[e.jsx(T,{onBack:n,language:r,title:A}),e.jsxs("div",{className:"sfb-center",children:[e.jsx("div",{style:{fontSize:"4rem"},children:"🎤"}),e.jsx("h2",{style:{fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:"1.2rem",color:"#333",margin:0},children:r==="bm"?"Suara Tidak Tersedia":"Voice Not Available"}),e.jsx("p",{style:{color:"#777",fontWeight:600,lineHeight:1.5,maxWidth:360,margin:0},children:P}),e.jsxs("button",{onClick:n,style:{fontFamily:"'Baloo 2', sans-serif",padding:"0.75rem 1.5rem",background:`linear-gradient(180deg, ${a.primary}cc, ${a.primary})`,color:"#fff",border:"none",borderRadius:999,cursor:"pointer",fontWeight:800},children:["← ",r==="bm"?"Kembali":"Go Back"]})]})]})]}):e.jsxs(e.Fragment,{children:[e.jsx("style",{children:M}),e.jsxs("div",{className:"sfb-root",children:[e.jsx(T,{onBack:n,language:r,title:A}),e.jsxs("div",{className:"sfb-body",children:[e.jsxs("div",{className:"sfb-stats",children:[e.jsxs("span",{className:"sfb-pill prog",children:[h+1," / ",l.length]}),e.jsxs("span",{style:{display:"flex",gap:6},children:[e.jsxs("span",{className:"sfb-pill star",children:["⭐ ",I]}),e.jsxs("span",{className:"sfb-pill fire",children:["🔥 ",X]})]})]}),e.jsx("div",{className:"sfb-bar-wrap",children:e.jsx("div",{className:"sfb-bar-fill",style:{width:`${h/l.length*100}%`}})}),e.jsxs("div",{className:"sfb-stage",children:[e.jsxs("div",{className:`sfb-card${g?" correct":k?" wrong":""}`,children:[e.jsx("div",{className:"sfb-card-label",children:r==="bm"?"BACA AYAT INI":"READ THIS SENTENCE"}),b&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"sfb-card-emoji",children:b.emoji}),e.jsx("div",{className:"sfb-card-phrase",children:b.phrase})]})]}),e.jsxs("div",{className:"sfb-status",children:[L&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"sfb-mic-wrap",children:[e.jsx("div",{className:"sfb-mic-ring"}),e.jsx("div",{className:"sfb-mic-ring r2"}),e.jsx("div",{className:"sfb-mic-core",children:"🎤"})]}),e.jsx("p",{className:"sfb-status-text live",children:r==="bm"?"Baca sekarang...":"Read it now..."})]}),g&&e.jsxs("p",{className:"sfb-status-text live",style:{fontSize:"clamp(15px, 3vh, 19px)"},children:["✅ ",r==="bm"?"Betul! Hebat!":"Correct! Great!"]}),k&&e.jsx("p",{className:"sfb-status-text warn",children:u>=v?r==="bm"?"Tak mengapa — dengar dan teruskan ya!":"It's okay — listen and keep going!":r==="bm"?"Hampir! Cuba sekali lagi 💪":"Almost! Try once more 💪"}),p==="ready"&&w==="perm"&&e.jsxs("p",{className:"sfb-status-text err",children:["🎤 ",r==="bm"?"Benarkan akses mikrofon dalam pelayar, kemudian tekan 🎤 sekali lagi.":"Please allow microphone access in your browser, then tap 🎤 again."]}),p==="ready"&&w==="net"&&e.jsxs("p",{className:"sfb-status-text err",children:["📡 ",r==="bm"?"Sambungan internet diperlukan untuk suara. Cuba lagi.":"Voice needs an internet connection. Try again."]}),p==="ready"&&w==="nospeech"&&e.jsx("p",{className:"sfb-status-text warn",children:r==="bm"?"Tak dengar suara. Cuba lagi! 🎤":"Didn't hear you. Try again! 🎤"}),p==="ready"&&!w&&e.jsxs("p",{className:"sfb-status-text",children:[r==="bm"?"Tekan 🎤 untuk membaca":"Tap 🎤 to read",u>0&&` · ${r==="bm"?"Cuba":"Try"} ${u+1}/${v}`]})]})]})]}),e.jsxs("div",{className:"sfb-footer",children:[e.jsx("button",{className:"sfb-icon-btn repeat",onClick:ee,disabled:g||k,title:r==="bm"?"Dengar ayat":"Hear the sentence",children:e.jsx(te,{size:22,color:a.primary})}),L?e.jsxs("button",{className:"sfb-main-btn stop",onClick:()=>{t.stop(),d.current=!1,o("ready")},children:["⏸ ",r==="bm"?"Berhenti":"Stop"]}):e.jsxs("button",{className:"sfb-main-btn mic",onClick:()=>Z(),disabled:g||k,children:["🎤 ",r==="bm"?"Tekan untuk Membaca":"Tap to Read"]}),e.jsx("button",{className:"sfb-icon-btn skip",onClick:ae,disabled:g||k,title:r==="bm"?"Langkau":"Skip",children:e.jsx(ne,{size:22,color:a.wrong})})]})]})]})}export{ge as default};
