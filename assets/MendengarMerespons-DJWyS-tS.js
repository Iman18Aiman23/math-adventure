import{S as i,r as t,j as e,p as U}from"./index-YCInXYg5.js";import{B as $}from"./BMHeader-B5cOc9J_.js";import{c as M}from"./confetti.module-oQXWb4Lk.js";import{u as he}from"./useTopicGamification-I1kCte-J.js";import{R as xe}from"./refresh-cw-J9zlOc9a.js";import{S as ue}from"./skip-forward-CWFoDEaO.js";import"./useGamification-g-vGaz2S.js";const fe="2-1-1-mendengar-merespons",j="speaking",l="ready",x="listening",Q="correct",z="wrong",V="complete",je=8,E=3,a={primary:"#FF9600",primaryDark:"#D47A00",correct:"#4CAF50",correctDark:"#388E3C",wrong:"#FF6B6B",wrongDark:"#D32F2F"},H=`
  .jr-root {
    height: 100dvh; overflow: hidden;
    background:
      radial-gradient(ellipse 70% 50% at 18% 0%, #FFE4C2 0%, transparent 60%),
      radial-gradient(ellipse 60% 45% at 88% 100%, #FFD9A8 0%, transparent 65%),
      linear-gradient(180deg, #FFF7ED 0%, #FFEDD5 55%, #FED7AA 100%);
    font-family: 'Fredoka', system-ui, sans-serif;
    display: flex; flex-direction: column;
  }

  .jr-body {
    flex: 1; min-height: 0;
    display: flex; flex-direction: column; align-items: center;
    width: 100%; max-width: 520px;
    margin: 0 auto;
    padding: clamp(8px, 1.6vh, 12px) clamp(14px, 3.5vw, 28px);
  }

  .jr-stats {
    flex-shrink: 0; width: 100%;
    display: flex; align-items: center; justify-content: space-between;
    gap: 8px; margin-bottom: clamp(10px, 1.6vh, 14px);
  }

  .jr-pill {
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(11px, 2vh, 13px);
    border-radius: 999px;
    padding: clamp(3px, 0.7vh, 5px) clamp(10px, 2.4vw, 14px);
    white-space: nowrap;
    background: #FFFFFFCC; color: #9A5B10; border: 1.5px solid ${a.primary}44;
  }

  .jr-bar-wrap {
    flex-shrink: 0; width: 100%;
    background: #FFD9A8; border-radius: 999px;
    height: clamp(6px, 1.2vh, 9px); overflow: hidden;
    margin-bottom: clamp(16px, 2.4vh, 22px);
  }

  .jr-bar-fill {
    background: linear-gradient(90deg, ${a.primary}, #FFB347);
    height: 100%; border-radius: 999px;
    transition: width 0.3s;
  }

  .jr-stage {
    flex: 1; min-height: 0; width: 100%;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: clamp(12px, 2.4vh, 20px);
  }

  .jr-card {
    flex-shrink: 0; width: 100%;
    display: flex; flex-direction: column; align-items: center;
    gap: clamp(12px, 2vh, 18px);
    text-align: center;
    background: #fff;
    border: 3px solid #FFCF80;
    border-radius: clamp(20px, 3.5vh, 28px);
    padding: clamp(20px, 3.5vh, 30px) clamp(16px, 4vw, 28px);
    box-shadow: 0 4px 0 ${a.primary}2e, 0 12px 26px -16px rgba(0,0,0,.2);
  }

  .jr-card.correct {
    background: #F0FFF0; border-color: ${a.correct};
    box-shadow: 0 6px 0 ${a.correctDark}, 0 8px 20px rgba(88,204,2,.12);
  }

  .jr-card.wrong {
    background: #FFF0F0; border-color: ${a.wrong};
    box-shadow: 0 6px 0 ${a.wrongDark}, 0 8px 20px rgba(255,50,50,.12);
  }

  .jr-emoji {
    font-size: clamp(48px, 10vh, 80px);
    line-height: 1;
    user-select: none;
  }

  .jr-question {
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(18px, 4.2vh, 28px);
    line-height: 1.3;
  }

  .jr-status {
    font-weight: 700; font-size: clamp(13px, 2.4vh, 15px);
    color: #8A7860; text-align: center; max-width: 300px;
    line-height: 1.5;
  }

  .jr-status.live {
    color: ${a.primary}; font-family: 'Baloo 2', sans-serif; font-weight: 800;
  }

  .jr-answer {
    margin-top: 0.5rem;
    background: rgba(255,150,0,0.12);
    border-radius: 12px;
    padding: 0.4rem 0.8rem;
    display: inline-block;
  }

  .jr-footer {
    flex-shrink: 0;
    display: flex; gap: clamp(8px, 2vw, 12px);
    width: 100%; max-width: 520px;
    margin: 0 auto;
    padding: clamp(10px, 1.6vh, 14px) clamp(14px, 3.5vw, 28px) clamp(8px, 1.6vh, 12px);
    border-top: 2px solid rgba(255,150,0,0.18);
  }

  .jr-btn {
    flex: 1; min-width: 0;
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(13px, 2.4vh, 16px);
    border: none; border-radius: 14px; cursor: pointer;
    padding: clamp(10px, 2vh, 14px) 12px;
    transition: transform .12s ease;
  }

  .jr-btn:active { transform: translateY(2px); }
  .jr-btn:disabled { opacity: 0.45; cursor: not-allowed; }

  .jr-btn.primary {
    color: #fff;
    background: linear-gradient(180deg, ${a.primary}cc, ${a.primary});
    box-shadow: 0 4px 0 ${a.primaryDark};
  }

  .jr-btn.secondary {
    color: #64748B; background: #F1F5F9;
    box-shadow: 0 4px 0 #CBD5E1;
  }

  .jr-center {
    flex: 1; min-height: 0;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: clamp(16px, 2.4vh, 20px); padding: 16px; text-align: center;
  }

  .jr-mic-wrap {
    position: relative; width: 72px; height: 72px;
    display: flex; align-items: center; justify-content: center;
  }

  .jr-mic-ring {
    position: absolute; width: 72px; height: 72px;
    border-radius: 50%; background: rgba(255,150,0,0.15);
    animation: jrPulseRing 1.2s ease-out infinite;
  }

  .jr-mic-ring2 {
    position: absolute; width: 56px; height: 56px;
    border-radius: 50%; background: rgba(255,150,0,0.2);
    animation: jrPulseRing 1.2s ease-out 0.3s infinite;
  }

  .jr-mic-core {
    width: 56px; height: 56px;
    border-radius: 50%; background: linear-gradient(180deg, ${a.primary}cc, ${a.primary});
    display: flex; align-items: center; justify-content: center;
    font-size: 1.8rem;
    box-shadow: 0 4px 12px rgba(255,150,0,0.4);
  }

  .jr-icon-row {
    display: flex; gap: 1rem;
  }

  .jr-icon-btn {
    width: 52px; height: 52px;
    border-radius: 14px; background: #fff; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: transform .12s ease;
    border: 2px solid #FFCF80;
  }

  .jr-icon-btn:active { transform: translateY(2px); }
`,X=[{id:"q1",emoji:"☁️",question:{bm:"Apakah warna langit?",eng:"What colour is the sky?"},answer:"Biru",accept:["biru","blue"]},{id:"q2",emoji:"🌱",question:{bm:"Apakah warna rumput?",eng:"What colour is grass?"},answer:"Hijau",accept:["hijau","green"]},{id:"q3",emoji:"🐱",question:{bm:"Berapa kaki seekor kucing?",eng:"How many legs does a cat have?"},answer:"Empat",accept:["empat","4","four"]},{id:"q4",emoji:"🍌",question:{bm:"Apakah warna pisang yang masak?",eng:"What colour is a ripe banana?"},answer:"Kuning",accept:["kuning","yellow"]},{id:"q5",emoji:"🐔",question:{bm:"Haiwan apakah yang berkokok pada pagi?",eng:"Which animal crows in the morning?"},answer:"Ayam",accept:["ayam","ayam jantan","chicken","rooster"]},{id:"q6",emoji:"🐟",question:{bm:"Di manakah ikan tinggal?",eng:"Where do fish live?"},answer:"Di dalam air",accept:["air","dalam air","laut","kolam","sungai","water"]},{id:"q7",emoji:"🍎",question:{bm:"Apakah warna epal ini?",eng:"What colour is this apple?"},answer:"Merah",accept:["merah","red"]},{id:"q8",emoji:"📅",question:{bm:"Berapa hari dalam seminggu?",eng:"How many days in a week?"},answer:"Tujuh",accept:["tujuh","7","seven"]},{id:"q9",emoji:"🐒",question:{bm:"Haiwan apakah yang suka makan pisang?",eng:"Which animal loves bananas?"},answer:"Monyet",accept:["monyet","beruk","monkey"]},{id:"q10",emoji:"👀",question:{bm:"Apakah yang kita guna untuk melihat?",eng:"What do we use to see?"},answer:"Mata",accept:["mata","eyes","eye"]}],ge=p=>[...p].sort(()=>Math.random()-.5),Z=()=>ge(X).slice(0,Math.min(je,X.length)),be=p=>p.toLowerCase().replace(/[.,!?]/g,"").replace(/\s+/g," ").trim();function ee(p,r){const m=be(p);return r.accept.some(A=>m.includes(A))}function ye(p){return[...new Set(p.accept.join(" ").split(" "))].filter(Boolean)}function Ee({onBack:p,language:r="bm"}){const m=i.isMobile(),{awardCorrect:A,awardWrong:re,completeActivity:P}=he(fe),[u,ae]=t.useState(()=>Z()),[b,I]=t.useState(0),[n,o]=t.useState(j),[_,L]=t.useState(0),[Y,D]=t.useState(0),[y,k]=t.useState(0),[O,w]=t.useState(""),[N,f]=t.useState(null),B=t.useRef(0),T=t.useRef(u),q=t.useRef(0),h=t.useRef(!1);t.useEffect(()=>{B.current=b},[b]),t.useEffect(()=>{T.current=u},[u]),t.useEffect(()=>{q.current=y},[y]),t.useEffect(()=>()=>{i.stop(),i.stopSpeaking()},[]);const c=u[b]??null,g=t.useCallback(s=>i.speak(s,"ms"),[]),R=r==="bm"?"Jawab Soalan":"Answer the Question",C=t.useCallback(()=>{const s=B.current+1;if(s>=T.current.length){o(V),M({particleCount:200,spread:160,origin:{y:.4}}),P();return}I(s),k(0),w(""),f(null),o(j)},[P]);t.useEffect(()=>{if(n!==j||!c)return;let s=!1;return(async()=>(await g(c.question.bm),!s&&o(m?l:x)))(),()=>{s=!0,i.stopSpeaking()}},[n,c,m,g]),t.useEffect(()=>{n!==x||m||G()},[n,m]);const te=()=>{U("correct"),A(),M({particleCount:40,spread:60,origin:{y:.6},scalar:.8}),L(d=>d+1),D(d=>{const S=d+1;return S%5===0&&(U("streak"),M({particleCount:150,spread:100,origin:{y:.5}})),S}),k(0),o(Q);const s=["Bagus!","Hebat!","Pandai!","Bijak!","Cemerlang!"];g(s[Math.floor(Math.random()*s.length)]),setTimeout(()=>C(),1800)},ne=()=>{re(),D(0),k(d=>d+1);const s=q.current+1>=E;o(z),s?(c&&g(c.answer),setTimeout(()=>C(),2600)):setTimeout(()=>o(l),1900)},G=()=>{if(!i.isSupported()||h.current)return;h.current=!0,f(null),w(""),o(x);const s=T.current[B.current];i.listen("ms-MY",(d,S,K)=>{h.current=!1;let W=ee(d,s);!W&&K?.length>1&&(W=K.some(me=>ee(me.transcript,s))),w(d),W?te():ne()},d=>{if(h.current=!1,d==="not-allowed"||d==="service-not-allowed"||d==="audio-capture"){f("perm"),o(l);return}if(d==="network"){f("net"),o(l);return}q.current<E?(f("nospeech"),k(S=>S+1),o(l)):(f(null),o(z),w(""),setTimeout(()=>C(),2e3))},{retries:m?2:1,grammarWords:s?ye(s):[]})},se=()=>{c&&(i.stop(),i.stopSpeaking(),h.current=!1,g(c.question.bm).then(()=>o(m?l:x)))},ie=()=>{c&&(i.stop(),i.stopSpeaking(),h.current=!1,g(c.answer).then(()=>o(m?l:x)))},oe=()=>{i.stop(),i.stopSpeaking(),h.current=!1,C()},ce=()=>{i.stop(),i.stopSpeaking(),h.current=!1,ae(Z()),I(0),L(0),D(0),k(0),w(""),f(null),o(j)},F=n===Q,v=n===z,le=n===x;if(n===V)return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:H}),e.jsxs("div",{className:"jr-root",children:[e.jsx($,{onBack:p,language:r,title:R}),e.jsxs("div",{className:"jr-center",children:[e.jsx("div",{style:{fontSize:"clamp(56px, 12vh, 90px)",lineHeight:1},children:"💬"}),e.jsx("h2",{style:{fontFamily:"'Baloo 2', sans-serif",color:a.primary,fontSize:"clamp(24px, 5vh, 36px)",fontWeight:800,margin:0},children:r==="bm"?"Tahniah!":"Well Done!"}),e.jsxs("p",{style:{fontSize:"clamp(16px, 3vh, 21px)",color:"#555",fontWeight:600,margin:"0.6rem 0 1rem"},children:[r==="bm"?"Markah: ":"Score: ",e.jsx("strong",{children:_}),"/",u.length]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.6rem",background:"#FFF6D6",borderRadius:999,padding:"0.5rem 1.2rem",border:"1.5px solid #FFE08A",marginBottom:"clamp(16px, 2.4vh, 24px)"},children:[e.jsx("span",{style:{fontSize:"1.1rem"},children:"🔥"}),e.jsxs("span",{style:{fontWeight:800,fontFamily:"'Baloo 2', sans-serif",color:"#B58800",fontSize:"clamp(13px, 2.4vh, 16px)"},children:[r==="bm"?"Streak terbaik:":"Best streak:"," ",Y]})]}),e.jsxs("div",{style:{display:"flex",gap:"0.8rem"},children:[e.jsxs("button",{onClick:ce,style:{fontFamily:"'Baloo 2', sans-serif",padding:"0.8rem 1.5rem",background:"#fff",color:"#475569",border:"2px solid #E2E8F0",borderRadius:999,fontSize:"1rem",cursor:"pointer",fontWeight:800},children:["🔄 ",r==="bm"?"Main Semula":"Play Again"]}),e.jsxs("button",{onClick:p,style:{fontFamily:"'Baloo 2', sans-serif",padding:"0.8rem 1.5rem",background:`linear-gradient(180deg, ${a.primary}cc, ${a.primary})`,color:"#fff",border:"none",borderRadius:999,fontSize:"1rem",cursor:"pointer",fontWeight:800,boxShadow:`0 4px 0 ${a.primaryDark}`},children:["← ",r==="bm"?"Kembali":"Back"]})]})]})]})]});const J=i.getUnsupportedReason();if(J)return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:H}),e.jsxs("div",{className:"jr-root",children:[e.jsx($,{onBack:p,language:r,title:R}),e.jsxs("div",{className:"jr-center",children:[e.jsx("div",{style:{fontSize:"4rem"},children:"🎤"}),e.jsx("h2",{style:{fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:"1.2rem",color:"#333",margin:0},children:r==="bm"?"Suara Tidak Tersedia":"Voice Not Available"}),e.jsx("p",{style:{color:"#777",fontWeight:600,lineHeight:1.5,maxWidth:360,margin:0},children:J}),e.jsxs("button",{onClick:p,style:{fontFamily:"'Baloo 2', sans-serif",padding:"0.75rem 1.5rem",background:`linear-gradient(180deg, ${a.primary}cc, ${a.primary})`,color:"#fff",border:"none",borderRadius:999,cursor:"pointer",fontWeight:800},children:["← ",r==="bm"?"Kembali":"Go Back"]})]})]})]});const pe=v&&y>=E,de=`jr-card${F?" correct":""}${v?" wrong":""}`;return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:H}),e.jsxs("div",{className:"jr-root",children:[e.jsx($,{onBack:p,language:r,title:R}),e.jsxs("div",{className:"jr-body",children:[e.jsxs("div",{className:"jr-stats",children:[e.jsxs("span",{className:"jr-pill",children:[b+1," / ",u.length]}),e.jsxs("span",{style:{display:"flex",gap:6},children:[e.jsxs("span",{className:"jr-pill",style:{background:"#FFEAD0",color:"#D9610B",borderColor:"#FFC081"},children:["⭐ ",_]}),e.jsxs("span",{className:"jr-pill",style:{background:"#FFF6D6",color:"#B58800",borderColor:"#FFE08A"},children:["🔥 ",Y]})]})]}),e.jsx("div",{className:"jr-bar-wrap",children:e.jsx("div",{className:"jr-bar-fill",style:{width:`${b/u.length*100}%`}})}),e.jsxs("div",{className:"jr-stage",children:[e.jsx("div",{className:de,children:c&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"jr-emoji",children:c.emoji}),e.jsx("div",{className:"jr-question",style:{color:F?a.correctDark:v?a.wrongDark:"#1E293B"},children:c.question[r]??c.question.bm}),pe&&e.jsxs("div",{className:"jr-answer",children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"#B58800"},children:r==="bm"?"Jawapan: ":"Answer: "}),e.jsx("span",{style:{fontWeight:900,color:a.primary,fontSize:"1.05rem"},children:c.answer})]})]})}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"0.5rem",minHeight:"80px",justifyContent:"center"},children:[le&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"jr-mic-wrap",children:[e.jsx("div",{className:"jr-mic-ring"}),e.jsx("div",{className:"jr-mic-ring2"}),e.jsx("div",{className:"jr-mic-core",children:"🎤"})]}),e.jsx("p",{className:"jr-status live",children:r==="bm"?"Jawab sekarang...":"Answer now..."})]}),n===j&&e.jsxs("div",{className:"jr-status",children:[e.jsx("span",{style:{fontSize:"1.4rem",display:"inline-block",animation:"jrSpeakBounce 1s ease-in-out infinite"},children:"🔊"}),e.jsx("span",{children:r==="bm"?"Dengar soalan...":"Listen to the question..."})]}),n===l&&N==="perm"&&e.jsxs("p",{className:"jr-status",style:{color:a.wrongDark,maxWidth:320},children:["🎤 ",r==="bm"?"Benarkan akses mikrofon dalam pelayar, kemudian tekan 🎤 sekali lagi.":"Please allow microphone access in your browser, then tap 🎤 again."]}),n===l&&N==="net"&&e.jsxs("p",{className:"jr-status",style:{color:a.wrongDark,maxWidth:320},children:["📡 ",r==="bm"?"Sambungan internet diperlukan untuk suara. Cuba lagi.":"Voice needs an internet connection. Try again."]}),n===l&&N==="nospeech"&&e.jsx("p",{className:"jr-status",style:{color:"#D9610B"},children:r==="bm"?"Tak dengar suara. Cuba lagi! 🎤":"Didn't hear you. Try again! 🎤"}),n===l&&!N&&e.jsxs("p",{className:"jr-status",children:[r==="bm"?"Tekan 🎤 untuk menjawab":"Tap 🎤 to answer",y>0&&` · ${r==="bm"?"Cuba":"Try"} ${y+1}/${E}`]}),O&&(F||v)&&e.jsxs("p",{className:"jr-status",style:{color:F?a.correctDark:a.wrongDark},children:['"',O,'"']})]}),(n===l||n===x||n===j)&&e.jsxs("div",{className:"jr-icon-row",children:[e.jsx("button",{onClick:se,className:"jr-icon-btn",style:{borderColor:a.primary},title:r==="bm"?"Ulang soalan":"Repeat question",children:e.jsx(xe,{size:22,color:a.primary})}),e.jsx("button",{onClick:ie,className:"jr-icon-btn",style:{borderColor:"#FFD9A8",fontSize:"1.4rem"},title:r==="bm"?"Bantuan":"Hint",children:"💡"}),e.jsx("button",{onClick:oe,className:"jr-icon-btn",style:{borderColor:"#E0E0E0"},title:r==="bm"?"Langkau":"Skip",children:e.jsx(ue,{size:22,color:a.wrong})})]})]})]}),e.jsxs("div",{className:"jr-footer",children:[n===l&&e.jsxs("button",{className:"jr-btn primary",onClick:()=>G(),children:["🎤 ",r==="bm"?"Tekan untuk Menjawab":"Tap to Answer"]}),n===x&&e.jsxs("button",{className:"jr-btn secondary",onClick:()=>{i.stop(),h.current=!1,o(l)},children:["⏸ ",r==="bm"?"Berhenti":"Stop"]}),n===j&&e.jsxs("button",{className:"jr-btn primary",disabled:!0,children:["🔊 ",r==="bm"?"Mendengar soalan...":"Playing question..."]}),(F||v)&&e.jsxs("button",{className:"jr-btn primary",disabled:!0,children:["🎤 ",r==="bm"?"Tekan untuk Menjawab":"Tap to Answer"]})]}),e.jsx("style",{children:`
          @keyframes jrPulseRing {
            0%   { transform: scale(0.8); opacity: 0.8; }
            100% { transform: scale(1.6); opacity: 0; }
          }
          @keyframes jrSpeakBounce {
            0%, 100% { transform: translateY(0);  }
            50%       { transform: translateY(-6px); }
          }
        `})]})]})}export{Ee as default};
