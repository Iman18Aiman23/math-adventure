import{S as o,r as a,j as e,p as te}from"./index-YCInXYg5.js";import{B as z}from"./BMHeader-B5cOc9J_.js";import{u as ge}from"./useTopicGamification-I1kCte-J.js";import{c as P}from"./confetti.module-oQXWb4Lk.js";import{R as ye}from"./refresh-cw-J9zlOc9a.js";import{S as je}from"./skip-forward-CWFoDEaO.js";import"./useGamification-g-vGaz2S.js";const l="ready",ie="listening",ne="correct",O="wrong",oe="tier-complete",ce="complete",M=8,W=3,E=70,s={primary:"#FF9600",primaryDark:"#D47A00",correct:"#4CAF50",correctDark:"#388E3C",wrong:"#FF6B6B",wrongDark:"#D32F2F"},we=[{id:"p1",emoji:"👶🥛",phrase:"Adik minum susu",keywords:[["adik","bayi","baby"],["minum","drink"],["susu","milk"]]},{id:"p2",emoji:"👧📚",phrase:"Kakak baca buku",keywords:[["kakak","kak","sister","girl"],["baca","membaca","read","reading"],["buku","book"]]},{id:"p3",emoji:"🐴💨",phrase:"Kuda lari",keywords:[["kuda","horse"],["lari","berlari","run","running"]]},{id:"p4",emoji:"👩‍🍳🍚",phrase:"Ibu masak nasi",keywords:[["ibu","mak","emak","mother","mom"],["masak","memasak","cook","cooking"],["nasi","rice"]]},{id:"p5",emoji:"👦⚽",phrase:"Budak sepak bola",keywords:[["budak","adik","anak","boy","kid"],["sepak","tendang","kick","kicking"],["bola","ball"]]},{id:"p6",emoji:"🐠💧",phrase:"Ikan dalam kolam",keywords:[["ikan","fish"],["dalam","in"],["kolam","pond"]]},{id:"p7",emoji:"👨🚗",phrase:"Ayah cuci kereta",keywords:[["ayah","bapa","father","dad"],["cuci","basuh","wash","washing"],["kereta","car"]]},{id:"p8",emoji:"🐄🌿",phrase:"Lembu makan rumput",keywords:[["lembu","cow"],["makan","eat","eating"],["rumput","grass"]]},{id:"p9",emoji:"👶😴",phrase:"Adik tidur",keywords:[["adik","bayi","baby"],["tidur","sleep","sleeping"]]},{id:"p10",emoji:"🐸💦",phrase:"Katak lompat",keywords:[["katak","frog"],["lompat","melompat","jump","jumping","hop"]]}],ve=[{id:"s1",emoji:"👦🎮",phrase:"Saya main",keywords:[["saya","i","me"],["main","bermain","play","playing"]]},{id:"s2",emoji:"😴🛏️",phrase:"Saya tidur",keywords:[["saya","i","me"],["tidur","sleep","sleeping"]]},{id:"s3",emoji:"👨💼",phrase:"Ayah kerja",keywords:[["ayah","bapa","father","dad"],["kerja","work","working"]]},{id:"s4",emoji:"🍽️",phrase:"Saya makan",keywords:[["saya","i","me"],["makan","eat","eating"]]},{id:"s5",emoji:"👩💺",phrase:"Ibu duduk",keywords:[["ibu","mak","emak","mother","mom"],["duduk","sit","sitting"]]},{id:"s6",emoji:"🏃💨",phrase:"Budak lari",keywords:[["budak","anak","adik","boy","kid","child"],["lari","run","running"]]},{id:"s7",emoji:"👧🚿",phrase:"Kakak mandi",keywords:[["kakak","kak","sister","girl"],["mandi","bathe","bathing","wash","washing"]]},{id:"s8",emoji:"👶🪑",phrase:"Adik duduk",keywords:[["adik","bayi","baby"],["duduk","sit","sitting"]]}],Fe=t=>[...t].sort(()=>Math.random()-.5),U=(t="sentences")=>{const r=t==="sentences"?ve:we;return Fe(r).slice(0,Math.min(M,r.length))},Se=t=>t.toLowerCase().replace(/[.,!?]/g,"").replace(/\s+/g," ").trim();function le(t,r){const j=Se(t),A=r.keywords.filter(u=>u.some(C=>j.includes(C))).length,H=Math.ceil(r.keywords.length*.6);return A>=H}function Ee(t){return[...new Set(t.keywords.flat())].filter(Boolean)}const I=`
  .sfb-root {
    --sp-1: clamp(4px, 0.8vh, 8px);
    --sp-2: clamp(8px, 1.6vh, 14px);
    --sp-3: clamp(12px, 2.4vh, 22px);
    height: 100dvh; overflow: hidden;
    background:
      radial-gradient(ellipse 70% 50% at 18% 0%, #FFE4C2 0%, transparent 60%),
      radial-gradient(ellipse 60% 45% at 88% 100%, #FFD9A8 0%, transparent 65%),
      linear-gradient(180deg, #FFF7ED 0%, #FFEDD5 55%, #FED7AA 100%);
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
  .sfb-pill.prog { background: #FFFFFFCC; color: #9A5B10; border: 1.5px solid ${s.primary}44; }
  .sfb-pill.star { background: #FFF6D6; color: #B58800; border: 1.5px solid #FFE08A; }
  .sfb-pill.fire { background: #FFEAD0; color: #D9610B; border: 1.5px solid #FFC081; }
  .sfb-bar-wrap {
    flex-shrink: 0; width: 100%;
    background: #FFD9A8; border-radius: 999px;
    height: clamp(6px, 1.2vh, 9px); overflow: hidden;
    margin-bottom: var(--sp-3);
  }
  .sfb-bar-fill {
    background: linear-gradient(90deg, ${s.primary}, #FFB347);
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
    border: 3px solid #FFCF80;
    border-radius: clamp(18px, 3vh, 28px);
    padding: clamp(16px, 3.4vh, 30px) clamp(16px, 4vw, 28px) clamp(18px, 3.6vh, 32px);
    box-shadow: 0 clamp(3px, 0.6vh, 5px) 0 ${s.primary}2e, 0 12px 26px -16px rgba(0,0,0,.2);
    transition: background 0.3s, border-color 0.3s;
  }
  .sfb-card.correct { background: #F0FFF0; border-color: ${s.correct}; }
  .sfb-card.wrong   { background: #FFF0F0; border-color: ${s.wrong}; }
  .sfb-card-label {
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(9px, 1.7vh, 12px); letter-spacing: 0.14em;
    color: #B07215;
    background: #FFF4E2;
    border: 1.5px solid #FFCF80;
    border-radius: 999px;
    padding: clamp(3px, 0.7vh, 5px) clamp(12px, 2.6vw, 18px);
  }
  .sfb-card.correct .sfb-card-label { color: ${s.correctDark}; background: #E9F9E9; border-color: ${s.correct}66; }
  .sfb-card.wrong   .sfb-card-label { color: ${s.wrongDark};   background: #FDEAEA; border-color: ${s.wrong}66; }
  .sfb-card-emoji {
    font-size: clamp(48px, 11vh, 84px);
    line-height: 1.15;
    letter-spacing: clamp(8px, 2vw, 18px);
    padding-left: clamp(8px, 2vw, 18px); /* balances trailing letter-spacing so the pair stays centred */
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
  .sfb-card.correct .sfb-card-phrase { border-top-color: ${s.correct}44; }
  .sfb-card.wrong   .sfb-card-phrase { border-top-color: ${s.wrong}44; }
  .sfb-card.correct .sfb-card-phrase { color: ${s.correctDark}; }
  .sfb-card.wrong   .sfb-card-phrase { color: ${s.wrongDark}; }
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
  .sfb-status-text.err  { color: ${s.wrongDark}; }
  .sfb-status-text.warn { color: #D9610B; }
  .sfb-status-text.live { color: ${s.primary}; font-family: 'Baloo 2', sans-serif; font-weight: 800; }
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
    background: linear-gradient(180deg, ${s.primary}d9, ${s.primary});
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
  .sfb-icon-btn.repeat { border: 2px solid ${s.primary}; }
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
    background: linear-gradient(180deg, ${s.primary}cc, ${s.primary});
    box-shadow: 0 4px 0 ${s.primaryDark};
  }
  .sfb-main-btn.stop {
    background: #fff; color: ${s.primary};
    border: 2px solid ${s.primary};
  }
  .sfb-icon-btn:disabled, .sfb-main-btn:disabled { opacity: 0.45; cursor: not-allowed; }
  .sfb-center {
    flex: 1; min-height: 0;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: var(--sp-2); padding: 16px; text-align: center;
  }
`;function De({onBack:t,language:r="bm",topicComplete:j,onNextTopic:A}){const H=o.isMobile(),[u,C]=a.useState("sentences"),[p,V]=a.useState(()=>U("sentences")),[w,L]=a.useState(0),[m,c]=a.useState(l),[h,_]=a.useState(0),[N,J]=a.useState(0),{awardCorrect:de,awardWrong:pe,completeTopic:X}=ge("1-1-2-bertutur-maklumat"),[q,T]=a.useState(0),[v,y]=a.useState(0),[B,x]=a.useState(null),K=a.useRef(0),R=a.useRef(p),Y=a.useRef(0),Q=a.useRef(0),Z=a.useRef(0),f=a.useRef(!1);a.useEffect(()=>{K.current=w},[w]),a.useEffect(()=>{R.current=p},[p]),a.useEffect(()=>{Y.current=v},[v]),a.useEffect(()=>{Q.current=h},[h]),a.useEffect(()=>{Z.current=N},[N]),a.useEffect(()=>()=>{o.stop(),o.stopSpeaking()},[]);const k=p[w]??null,G=a.useCallback(n=>o.speak(n,"ms"),[]),$=a.useCallback(()=>{const n=K.current+1;if(n>=R.current.length){if(u==="sentences")c(oe),P({particleCount:150,spread:140,origin:{y:.4}});else{c(ce),P({particleCount:200,spread:160,origin:{y:.4}});const i=Z.current+Q.current,d=M+R.current.length,b=Math.round(i/d*100);j&&b>=E&&j("1-1-2-bertutur-maklumat"),X(i,d,E)}return}L(n),y(0),x(null),c(l)},[u,j,X]),me=()=>{_(i=>i+1),de(),T(i=>{const d=i+1;return d%5===0?(te("streak"),P({particleCount:150,spread:100,origin:{y:.5}})):(te("correct"),P({particleCount:40,spread:60,origin:{y:.6},scalar:.8})),d}),y(0),c(ne);const n=["Bagus!","Hebat!","Pandai!","Bijak!","Cemerlang!"];G(n[Math.floor(Math.random()*n.length)]),setTimeout(()=>$(),1800)},fe=()=>{T(0),pe(),y(i=>i+1);const n=Y.current+1>=W;c(O),n?(k&&G(k.phrase),setTimeout(()=>$(),2600)):setTimeout(()=>c(l),1900)},be=()=>{if(!o.isSupported()||f.current)return;f.current=!0,x(null),c(ie);const n=R.current[K.current];o.listen("ms-MY",(i,d,b)=>{f.current=!1;let g=le(i,n);!g&&b?.length>1&&(g=b.some(D=>le(D.transcript,n))),g?me():fe()},i=>{if(f.current=!1,i==="not-allowed"||i==="service-not-allowed"||i==="audio-capture"){x("perm"),c(l);return}if(i==="network"){x("net"),c(l);return}Y.current<W?(x("nospeech"),y(d=>d+1),c(l)):(x(null),c(O),setTimeout(()=>$(),2e3))},{retries:H?2:1,grammarWords:n?Ee(n):[]})},he=()=>{k&&(o.stop(),o.stopSpeaking(),f.current=!1,c(l),G(k.phrase))},xe=()=>{o.stop(),o.stopSpeaking(),f.current=!1,$()},ue=()=>{o.stop(),o.stopSpeaking(),f.current=!1,J(h),C("phrases"),V(U("phrases")),L(0),_(0),T(0),y(0),x(null),c(l)},ee=()=>{o.stop(),o.stopSpeaking(),f.current=!1,C("sentences"),V(U("sentences")),L(0),_(0),J(0),T(0),y(0),x(null),c(l)},F=m===ne,S=m===O,re=m===ie;if(m===oe&&u==="sentences")return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:I}),e.jsxs("div",{className:"sfb-root",children:[e.jsx(z,{onBack:t,language:r,title:r==="bm"?"Baca Frasa Bergambar":"Read the Picture Phrase"}),e.jsxs("div",{className:"sfb-center",children:[e.jsx("div",{style:{fontSize:"clamp(56px, 12vh, 90px)",lineHeight:1},children:"⭐"}),e.jsx("h2",{style:{fontFamily:"'Baloo 2', sans-serif",color:s.primary,fontSize:"clamp(24px, 5vh, 36px)",fontWeight:800,margin:0},children:r==="bm"?"Bagus Sekali!":"Well Done!"}),e.jsx("p",{style:{fontSize:"clamp(14px, 2.6vh, 18px)",color:"#555",fontWeight:600,margin:"0.6rem 0 1.2rem"},children:r==="bm"?`Ayat Tunggal: ${h}/${p.length}`:`Sentences: ${h}/${p.length}`}),e.jsx("p",{style:{fontSize:"clamp(12px, 2.2vh, 15px)",color:"#777",fontWeight:500,margin:"0 0 1.8rem",maxWidth:320,lineHeight:1.5},children:r==="bm"?"Kamu siap mencuba frasa!":"Ready to try phrases?"}),e.jsxs("div",{style:{display:"flex",gap:"0.8rem"},children:[e.jsx("button",{onClick:ue,style:{fontFamily:"'Baloo 2', sans-serif",padding:"0.8rem 1.5rem",background:`linear-gradient(180deg, ${s.primary}cc, ${s.primary})`,color:"#fff",border:"none",borderRadius:999,fontSize:"1rem",cursor:"pointer",fontWeight:800,boxShadow:`0 4px 0 ${s.primaryDark}`},children:r==="bm"?"→ Seterusnya":"→ Next"}),e.jsx("button",{onClick:t,style:{fontFamily:"'Baloo 2', sans-serif",padding:"0.8rem 1.5rem",background:"#fff",color:"#475569",border:"2px solid #E2E8F0",borderRadius:999,fontSize:"1rem",cursor:"pointer",fontWeight:800},children:r==="bm"?"← Kembali":"← Back"})]})]})]})]});if(m===ce){const n=N+h,i=M+p.length,d=Math.round(n/i*100),b=d>=E,g={fontFamily:"'Baloo 2', sans-serif",padding:"0.8rem 1.5rem",background:`linear-gradient(180deg, ${s.primary}cc, ${s.primary})`,color:"#fff",border:"none",borderRadius:999,fontSize:"1rem",cursor:"pointer",fontWeight:800,boxShadow:`0 4px 0 ${s.primaryDark}`},D={fontFamily:"'Baloo 2', sans-serif",padding:"0.8rem 1.5rem",background:"#fff",color:"#475569",border:"2px solid #E2E8F0",borderRadius:999,fontSize:"1rem",cursor:"pointer",fontWeight:800};return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:I}),e.jsxs("div",{className:"sfb-root",children:[e.jsx(z,{onBack:t,language:r,title:r==="bm"?"Baca Frasa Bergambar":"Read the Picture Phrase"}),e.jsxs("div",{className:"sfb-center",children:[e.jsx("div",{style:{fontSize:"clamp(56px, 12vh, 90px)",lineHeight:1},children:b?"🎯":"💪"}),e.jsx("h2",{style:{fontFamily:"'Baloo 2', sans-serif",color:s.primary,fontSize:"clamp(24px, 5vh, 36px)",fontWeight:800,margin:0},children:b?r==="bm"?"Tahniah!":"Congratulations!":r==="bm"?"Cuba Lagi!":"Try Again!"}),e.jsxs("p",{style:{fontSize:"clamp(14px, 2.6vh, 18px)",color:"#555",fontWeight:600,margin:"0.6rem 0"},children:[r==="bm"?"Jumlah Markah: ":"Total Score: ",e.jsx("strong",{children:n}),"/",i," (",d,"%)"]}),e.jsxs("div",{style:{fontSize:"clamp(12px, 2.2vh, 14px)",color:"#777",fontWeight:500,margin:"0.8rem 0 1.2rem",lineHeight:1.6},children:[e.jsxs("div",{children:[r==="bm"?"Ayat Tunggal: ":"Sentences: ",N,"/",M]}),e.jsxs("div",{children:[r==="bm"?"Frasa: ":"Phrases: ",h,"/",p.length]})]}),!b&&e.jsx("p",{style:{fontSize:"clamp(12px, 2.2vh, 15px)",color:s.wrongDark,fontWeight:700,margin:"0 0 0.8rem",textAlign:"center",maxWidth:320},children:r==="bm"?`Skor minima ${E}% diperlukan untuk lulus topik ini.`:`You need at least ${E}% to pass this topic.`}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.6rem",background:"#FFF6D6",borderRadius:999,padding:"0.5rem 1.2rem",border:"1.5px solid #FFE08A"},children:[e.jsx("span",{style:{fontSize:"1.1rem"},children:"🔥"}),e.jsxs("span",{style:{fontWeight:800,fontFamily:"'Baloo 2', sans-serif",color:"#B58800",fontSize:"clamp(13px, 2.4vh, 16px)"},children:[r==="bm"?"Streak terbaik:":"Best streak:"," ",q]})]}),e.jsx("div",{style:{display:"flex",gap:"0.8rem",marginTop:"var(--sp-2)"},children:b?e.jsxs(e.Fragment,{children:[e.jsxs("button",{onClick:ee,style:D,children:["🔄 ",r==="bm"?"Main Semula":"Play Again"]}),A?e.jsx("button",{onClick:A,style:g,children:r==="bm"?"Topik Seterusnya →":"Next Topic →"}):e.jsx("button",{onClick:t,style:g,children:r==="bm"?"Kembali":"Back"})]}):e.jsxs(e.Fragment,{children:[e.jsxs("button",{onClick:ee,style:g,children:["🔄 ",r==="bm"?"Cuba Lagi":"Try Again"]}),e.jsx("button",{onClick:t,style:D,children:r==="bm"?"Kembali":"Back"})]})})]})]})]})}const se=o.getUnsupportedReason();if(se)return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:I}),e.jsxs("div",{className:"sfb-root",children:[e.jsx(z,{onBack:t,language:r,title:r==="bm"?"Baca Frasa Bergambar":"Read the Picture Phrase"}),e.jsxs("div",{className:"sfb-center",children:[e.jsx("div",{style:{fontSize:"4rem"},children:"🎤"}),e.jsx("h2",{style:{fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:"1.2rem",color:"#333",margin:0},children:r==="bm"?"Suara Tidak Tersedia":"Voice Not Available"}),e.jsx("p",{style:{color:"#777",fontWeight:600,lineHeight:1.5,maxWidth:360,margin:0},children:se}),e.jsxs("button",{onClick:t,style:{fontFamily:"'Baloo 2', sans-serif",padding:"0.75rem 1.5rem",background:`linear-gradient(180deg, ${s.primary}cc, ${s.primary})`,color:"#fff",border:"none",borderRadius:999,cursor:"pointer",fontWeight:800},children:["← ",r==="bm"?"Kembali":"Go Back"]})]})]})]});const ae=u==="sentences"?r==="bm"?"Ayat Tunggal":"Sentences":r==="bm"?"Frasa":"Phrases",ke=r==="bm"?`Baca: ${ae}`:`Read: ${ae}`;return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:I}),e.jsxs("div",{className:"sfb-root",children:[e.jsx(z,{onBack:t,language:r,title:ke}),e.jsxs("div",{className:"sfb-body",children:[e.jsxs("div",{className:"sfb-stats",children:[e.jsxs("span",{className:"sfb-pill prog",children:[w+1," / ",p.length]}),e.jsxs("span",{style:{display:"flex",gap:6},children:[e.jsxs("span",{className:"sfb-pill star",children:["⭐ ",h]}),e.jsxs("span",{className:"sfb-pill fire",children:["🔥 ",q]})]})]}),e.jsx("div",{className:"sfb-bar-wrap",children:e.jsx("div",{className:"sfb-bar-fill",style:{width:`${w/p.length*100}%`}})}),e.jsxs("div",{className:"sfb-stage",children:[e.jsxs("div",{className:`sfb-card${F?" correct":S?" wrong":""}`,children:[e.jsx("div",{className:"sfb-card-label",children:u==="sentences"?r==="bm"?"BACA AYAT INI":"READ THIS SENTENCE":r==="bm"?"BACA FRASA INI":"READ THIS PHRASE"}),k&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"sfb-card-emoji",children:k.emoji}),e.jsx("div",{className:"sfb-card-phrase",children:k.phrase})]})]}),e.jsxs("div",{className:"sfb-status",children:[re&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"sfb-mic-wrap",children:[e.jsx("div",{className:"sfb-mic-ring"}),e.jsx("div",{className:"sfb-mic-ring r2"}),e.jsx("div",{className:"sfb-mic-core",children:"🎤"})]}),e.jsx("p",{className:"sfb-status-text live",children:r==="bm"?"Baca sekarang...":"Read it now..."})]}),F&&e.jsxs("p",{className:"sfb-status-text live",style:{fontSize:"clamp(15px, 3vh, 19px)"},children:["✅ ",r==="bm"?"Betul! Hebat!":"Correct! Great!"]}),S&&e.jsx("p",{className:"sfb-status-text warn",children:v>=W?r==="bm"?"Tak mengapa — dengar dan teruskan ya!":"It's okay — listen and keep going!":r==="bm"?"Hampir! Cuba sekali lagi 💪":"Almost! Try once more 💪"}),m===l&&B==="perm"&&e.jsxs("p",{className:"sfb-status-text err",children:["🎤 ",r==="bm"?"Benarkan akses mikrofon dalam pelayar, kemudian tekan 🎤 sekali lagi.":"Please allow microphone access in your browser, then tap 🎤 again."]}),m===l&&B==="net"&&e.jsxs("p",{className:"sfb-status-text err",children:["📡 ",r==="bm"?"Sambungan internet diperlukan untuk suara. Cuba lagi.":"Voice needs an internet connection. Try again."]}),m===l&&B==="nospeech"&&e.jsx("p",{className:"sfb-status-text warn",children:r==="bm"?"Tak dengar suara. Cuba lagi! 🎤":"Didn't hear you. Try again! 🎤"}),m===l&&!B&&e.jsxs("p",{className:"sfb-status-text",children:[r==="bm"?"Tekan 🎤 untuk membaca":"Tap 🎤 to read",v>0&&` · ${r==="bm"?"Cuba":"Try"} ${v+1}/${W}`]})]})]})]}),e.jsxs("div",{className:"sfb-footer",children:[e.jsx("button",{className:"sfb-icon-btn repeat",onClick:he,disabled:F||S,title:r==="bm"?"Dengar frasa":"Hear the phrase",children:e.jsx(ye,{size:22,color:s.primary})}),re?e.jsxs("button",{className:"sfb-main-btn stop",onClick:()=>{o.stop(),f.current=!1,c(l)},children:["⏸ ",r==="bm"?"Berhenti":"Stop"]}):e.jsxs("button",{className:"sfb-main-btn mic",onClick:()=>be(),disabled:F||S,children:["🎤 ",r==="bm"?"Tekan untuk Membaca":"Tap to Read"]}),e.jsx("button",{className:"sfb-icon-btn skip",onClick:xe,disabled:F||S,title:r==="bm"?"Langkau":"Skip",children:e.jsx(je,{size:22,color:s.wrong})})]})]})]})}export{De as default};
