import{r,S as u,j as e,p as $}from"./index-YCInXYg5.js";import{c as y}from"./confetti.module-oQXWb4Lk.js";import{B as k}from"./BMHeader-B5cOc9J_.js";import{u as V}from"./useTopicGamification-I1kCte-J.js";import"./useGamification-g-vGaz2S.js";const z="1-1-8-dengar-buat",I=[{id:"i1",emoji:"🧠",text:"Sentuh kepala",audioText:"Sentuh kepala"},{id:"i2",emoji:"✋",text:"Angkat tangan",audioText:"Angkat tangan"},{id:"i3",emoji:"🙏",text:"Letakkan tangan",audioText:"Letakkan tangan"},{id:"i4",emoji:"🚶",text:"Berdiri",audioText:"Berdiri"},{id:"i5",emoji:"🪑",text:"Duduk",audioText:"Duduk"},{id:"i6",emoji:"👀",text:"Tutup mata",audioText:"Tutup mata"},{id:"i7",emoji:"👂",text:"Senuh telinga",audioText:"Sentuh telinga"},{id:"i8",emoji:"😛",text:"Buka mulut",audioText:"Buka mulut"},{id:"i9",emoji:"🤚",text:"Geleng kepala",audioText:"Geleng kepala"},{id:"i10",emoji:"👍",text:"Angkat ibu jari",audioText:"Angkat ibu jari"},{id:"p1",emoji:"💬",text:"Beritahu ibu kamu berlari",audioText:"Beritahu ibu kamu berlari"},{id:"p2",emoji:"💭",text:"Beritahu abang kamu tidur",audioText:"Beritahu abang kamu tidur"},{id:"p3",emoji:"🗣️",text:"Beritahu cikgu kamu makan",audioText:"Beritahu cikgu kamu makan"}],q=8,i={primary:"#FF9600",primaryDark:"#D47A00",correct:"#4CAF50",correctDark:"#388E3C"},J=s=>[...s].sort(()=>Math.random()-.5),M=()=>J(I).slice(0,Math.min(q,I.length)),b="ready",j="listening",h="done",W="complete",F=`
  .db-root {
    height: 100dvh; overflow: hidden;
    background:
      radial-gradient(ellipse 70% 50% at 18% 0%, #FFE4C2 0%, transparent 60%),
      radial-gradient(ellipse 60% 45% at 88% 100%, #FFD9A8 0%, transparent 65%),
      linear-gradient(180deg, #FFF7ED 0%, #FFEDD5 55%, #FED7AA 100%);
    font-family: 'Fredoka', system-ui, sans-serif;
    display: flex; flex-direction: column;
  }

  .db-body {
    flex: 1; min-height: 0;
    display: flex; flex-direction: column; align-items: center;
    width: 100%; max-width: 520px;
    margin: 0 auto;
    padding: clamp(12px, 2vh, 16px) clamp(14px, 3.5vw, 28px);
  }

  .db-stats {
    flex-shrink: 0; width: 100%;
    display: flex; align-items: center; justify-content: space-between;
    gap: 8px; margin-bottom: clamp(12px, 2vh, 16px);
  }

  .db-pill {
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(11px, 2vh, 13px);
    border-radius: 999px;
    padding: clamp(3px, 0.7vh, 5px) clamp(10px, 2.4vw, 14px);
    white-space: nowrap;
    background: #FFFFFFCC; color: #9A5B10; border: 1.5px solid ${i.primary}44;
  }

  .db-bar-wrap {
    flex-shrink: 0; width: 100%;
    background: #FFD9A8; border-radius: 999px;
    height: clamp(6px, 1.2vh, 9px); overflow: hidden;
    margin-bottom: clamp(16px, 2.4vh, 22px);
  }

  .db-bar-fill {
    background: linear-gradient(90deg, ${i.primary}, #FFB347);
    height: 100%; border-radius: 999px;
    transition: width 0.3s;
  }

  .db-stage {
    flex: 1; min-height: 0; width: 100%;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: clamp(12px, 2.4vh, 20px);
  }

  .db-card {
    flex-shrink: 0; width: 100%;
    display: flex; flex-direction: column; align-items: center;
    gap: clamp(16px, 3vh, 24px);
    text-align: center;
    background: #fff;
    border: 3px solid #FFCF80;
    border-radius: clamp(20px, 3.5vh, 28px);
    padding: clamp(24px, 4vh, 36px) clamp(16px, 4vw, 28px);
    box-shadow: 0 4px 0 ${i.primary}2e, 0 12px 26px -16px rgba(0,0,0,.2);
  }

  .db-card.done {
    background: #F0FFF0; border-color: ${i.correct};
    box-shadow: 0 6px 0 ${i.correctDark}, 0 8px 20px rgba(88,204,2,.12);
  }

  .db-emoji {
    font-size: clamp(56px, 12vh, 96px);
    line-height: 1;
    user-select: none;
  }

  .db-instruction {
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(18px, 4.2vh, 28px);
    color: #1E293B;
    line-height: 1.3;
  }

  .db-status {
    font-weight: 700; font-size: clamp(13px, 2.4vh, 15px);
    color: #8A7860; text-align: center; max-width: 300px;
    line-height: 1.5;
  }

  .db-status.live {
    color: ${i.primary}; font-family: 'Baloo 2', sans-serif; font-weight: 800;
  }

  .db-footer {
    flex-shrink: 0;
    display: flex; gap: clamp(8px, 2vw, 12px);
    width: 100%; max-width: 520px;
    margin: 0 auto;
    padding: clamp(12px, 2vh, 16px) clamp(14px, 3.5vw, 28px) clamp(8px, 1.6vh, 12px);
  }

  .db-btn {
    flex: 1; min-width: 0;
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(14px, 2.6vh, 17px);
    border: none; border-radius: 14px; cursor: pointer;
    padding: clamp(10px, 2vh, 14px) 12px;
    transition: transform .12s ease;
  }

  .db-btn:active { transform: translateY(2px); }

  .db-btn:disabled { opacity: 0.45; cursor: not-allowed; }

  .db-btn.primary {
    color: #fff;
    background: linear-gradient(180deg, ${i.primary}cc, ${i.primary});
    box-shadow: 0 4px 0 ${i.primaryDark};
  }

  .db-btn.secondary {
    color: #64748B; background: #F1F5F9;
    box-shadow: 0 4px 0 #CBD5E1;
  }

  .db-center {
    flex: 1; min-height: 0;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: clamp(16px, 2.4vh, 20px); padding: 16px; text-align: center;
  }
`;function ie({onBack:s,language:t="bm",topicComplete:v,onNextTopic:S,onNextModule:P}){const[o,H]=r.useState(()=>M()),[p,T]=r.useState(0),[n,m]=r.useState(b),[w,E]=r.useState(0),[D,B]=r.useState(0),{awardCorrect:L,completeActivity:N,hearts:_,gems:G}=V(z),C=r.useRef(0),A=r.useRef(o),l=r.useRef([]);r.useEffect(()=>{C.current=p},[p]),r.useEffect(()=>{A.current=o},[o]),r.useEffect(()=>()=>{u.stopSpeaking(),l.current.forEach(a=>clearTimeout(a))},[]);const d=o[p]??null,f=r.useCallback(a=>u.speak(a,"ms"),[]);r.useEffect(()=>{if(n!==b||!d)return;const a=setTimeout(()=>m(j),0),c=setTimeout(()=>{f(d.audioText)},400);return l.current.push(a,c),()=>{l.current=l.current.filter(x=>x!==a&&x!==c)}},[n,d,f]);const O=r.useCallback(()=>{const a=C.current+1;if(a>=A.current.length){m(W),y({particleCount:200,spread:160,origin:{y:.4}}),v?.(z),N();return}T(a),m(b)},[v,N]),U=()=>{if(n===h)return;$("correct"),L(),y({particleCount:60,spread:70,origin:{y:.5},scalar:.8}),E(c=>c+1),B(c=>{const x=c+1;return x%5===0&&($("streak"),y({particleCount:150,spread:100,origin:{y:.5}})),x}),m(h);const a=setTimeout(()=>O(),1600);l.current.push(a)},Y=()=>{if(!d)return;u.stopSpeaking();const a=setTimeout(()=>{f(d.audioText)},200);l.current.push(a)},K=()=>{u.stopSpeaking(),H(M()),T(0),E(0),B(0),m(b)},g=t==="bm"?"Dengar & Buat":"Listen & Do",R=u.getUnsupportedReason();return R?e.jsxs(e.Fragment,{children:[e.jsx("style",{children:F}),e.jsxs("div",{className:"db-root",children:[e.jsx(k,{onBack:s,language:t,title:g}),e.jsxs("div",{className:"db-center",children:[e.jsx("div",{style:{fontSize:"4rem"},children:"🎤"}),e.jsx("h2",{style:{fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:"1.2rem",color:"#333",margin:0},children:t==="bm"?"Suara Tidak Tersedia":"Voice Not Available"}),e.jsx("p",{style:{color:"#777",fontWeight:600,lineHeight:1.5,maxWidth:360,margin:0},children:R}),e.jsxs("button",{onClick:s,style:{fontFamily:"'Baloo 2', sans-serif",padding:"0.75rem 1.5rem",background:`linear-gradient(180deg, ${i.primary}cc, ${i.primary})`,color:"#fff",border:"none",borderRadius:999,cursor:"pointer",fontWeight:800},children:["← ",t==="bm"?"Kembali":"Go Back"]})]})]})]}):n===W?e.jsxs(e.Fragment,{children:[e.jsx("style",{children:F}),e.jsxs("div",{className:"db-root",children:[e.jsx(k,{onBack:s,language:t,title:g}),e.jsxs("div",{className:"db-center",children:[e.jsx("div",{style:{fontSize:"clamp(56px, 12vh, 90px)",lineHeight:1},children:"✨"}),e.jsx("h2",{style:{fontFamily:"'Baloo 2', sans-serif",color:i.primary,fontSize:"clamp(24px, 5vh, 36px)",fontWeight:800,margin:0},children:t==="bm"?"Tahniah!":"Well Done!"}),e.jsxs("p",{style:{fontSize:"clamp(16px, 3vh, 21px)",color:"#555",fontWeight:600,margin:"0.6rem 0 1rem"},children:[t==="bm"?"Markah: ":"Score: ",e.jsx("strong",{children:w}),"/",o.length]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.6rem",background:"#FFF6D6",borderRadius:999,padding:"0.5rem 1.2rem",border:"1.5px solid #FFE08A",marginBottom:"clamp(16px, 2.4vh, 24px)"},children:[e.jsx("span",{style:{fontSize:"1.1rem"},children:"🔥"}),e.jsxs("span",{style:{fontWeight:800,fontFamily:"'Baloo 2', sans-serif",color:"#B58800",fontSize:"clamp(13px, 2.4vh, 16px)"},children:[t==="bm"?"Streak terbaik:":"Best streak:"," ",D]})]}),e.jsxs("div",{style:{display:"flex",gap:"0.8rem"},children:[e.jsxs("button",{onClick:K,style:{fontFamily:"'Baloo 2', sans-serif",padding:"0.8rem 1.5rem",background:"#fff",color:"#475569",border:"2px solid #E2E8F0",borderRadius:999,fontSize:"1rem",cursor:"pointer",fontWeight:800},children:["🔄 ",t==="bm"?"Main Semula":"Play Again"]}),e.jsx("button",{onClick:S||P||s,style:{fontFamily:"'Baloo 2', sans-serif",padding:"0.8rem 1.5rem",background:`linear-gradient(180deg, ${i.primary}cc, ${i.primary})`,color:"#fff",border:"none",borderRadius:999,fontSize:"1rem",cursor:"pointer",fontWeight:800,boxShadow:`0 4px 0 ${i.primaryDark}`},children:S?t==="bm"?"Topik Seterusnya →":"Next Topic →":t==="bm"?"Modul Seterusnya →":"Next Module →"})]})]})]})]}):e.jsxs(e.Fragment,{children:[e.jsx("style",{children:F}),e.jsxs("div",{className:"db-root",children:[e.jsx(k,{onBack:s,language:t,title:g}),e.jsxs("div",{className:"db-body",children:[e.jsxs("div",{className:"db-stats",children:[e.jsxs("span",{className:"db-pill",children:[p+1," / ",o.length]}),e.jsxs("span",{style:{display:"flex",gap:6},children:[e.jsxs("span",{className:"db-pill",style:{background:"#FFE9EC",color:"#E11D48",borderColor:"#FCA5B4"},children:["❤️ ",_]}),e.jsxs("span",{className:"db-pill",style:{background:"#E0F2FE",color:"#0369A1",borderColor:"#7DD3FC"},children:["💎 ",G]}),e.jsxs("span",{className:"db-pill",style:{background:"#FFEAD0",color:"#D9610B",borderColor:"#FFC081"},children:["⭐ ",w]}),e.jsxs("span",{className:"db-pill",style:{background:"#FFF6D6",color:"#B58800",borderColor:"#FFE08A"},children:["🔥 ",D]})]})]}),e.jsx("div",{className:"db-bar-wrap",children:e.jsx("div",{className:"db-bar-fill",style:{width:`${p/o.length*100}%`}})}),e.jsx("div",{className:"db-stage",children:e.jsxs("div",{className:`db-card${n===h?" done":""}`,children:[e.jsx("div",{className:"db-emoji",children:d?.emoji}),e.jsx("div",{className:"db-instruction",children:d?.text}),e.jsx("div",{className:"db-status",style:{color:n===j?i.primary:"#8A7860"},children:n===j?t==="bm"?"🎧 Dengarkan...":"🎧 Listening...":t==="bm"?"Sudah! Tekan untuk lanjut.":"Done! Tap to continue."})]})})]}),e.jsxs("div",{className:"db-footer",children:[e.jsxs("button",{className:"db-btn secondary",onClick:Y,disabled:n===h,children:["🔊 ",t==="bm"?"Ulang":"Repeat"]}),e.jsx("button",{className:"db-btn primary",onClick:U,disabled:n===h,children:t==="bm"?"✓ Sudah!":"✓ Done!"})]})]})]})}export{ie as default};
