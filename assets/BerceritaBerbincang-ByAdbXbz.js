import{S as n,r,j as e,p as X}from"./index-YCInXYg5.js";import{B as M}from"./BMHeader-B5cOc9J_.js";import{c as P}from"./confetti.module-oQXWb4Lk.js";import{u as be}from"./useTopicGamification-I1kCte-J.js";import{R as ue}from"./refresh-cw-J9zlOc9a.js";import{S as he}from"./skip-forward-CWFoDEaO.js";import"./useGamification-g-vGaz2S.js";const xe="2-1-2-bercerita",f="speaking",c="ready",u="listening",q="correct",W="wrong",J="complete",fe=8,E=3,t={primary:"#FF9600",primaryDark:"#D47A00",correct:"#4CAF50",correctDark:"#388E3C",wrong:"#FF6B6B",wrongDark:"#D32F2F"},H=`
  .bb-root {
    height: 100dvh; overflow: hidden;
    background:
      radial-gradient(ellipse 70% 50% at 18% 0%, #FFE4C2 0%, transparent 60%),
      radial-gradient(ellipse 60% 45% at 88% 100%, #FFD9A8 0%, transparent 65%),
      linear-gradient(180deg, #FFF7ED 0%, #FFEDD5 55%, #FED7AA 100%);
    font-family: 'Fredoka', system-ui, sans-serif;
    display: flex; flex-direction: column;
  }

  .bb-body {
    flex: 1; min-height: 0;
    display: flex; flex-direction: column; align-items: center;
    width: 100%; max-width: 520px;
    margin: 0 auto;
    padding: clamp(8px, 1.6vh, 12px) clamp(14px, 3.5vw, 28px);
  }

  .bb-stats {
    flex-shrink: 0; width: 100%;
    display: flex; align-items: center; justify-content: space-between;
    gap: 8px; margin-bottom: clamp(10px, 1.6vh, 14px);
  }

  .bb-pill {
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(11px, 2vh, 13px);
    border-radius: 999px;
    padding: clamp(3px, 0.7vh, 5px) clamp(10px, 2.4vw, 14px);
    white-space: nowrap;
    background: #FFFFFFCC; color: #9A5B10; border: 1.5px solid ${t.primary}44;
  }

  .bb-bar-wrap {
    flex-shrink: 0; width: 100%;
    background: #FFD9A8; border-radius: 999px;
    height: clamp(6px, 1.2vh, 9px); overflow: hidden;
    margin-bottom: clamp(16px, 2.4vh, 22px);
  }

  .bb-bar-fill {
    background: linear-gradient(90deg, ${t.primary}, #FFB347);
    height: 100%; border-radius: 999px;
    transition: width 0.3s;
  }

  .bb-stage {
    flex: 1; min-height: 0; width: 100%;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: clamp(12px, 2.4vh, 20px);
  }

  .bb-card {
    flex-shrink: 0; width: 100%;
    display: flex; flex-direction: column; align-items: center;
    gap: clamp(12px, 2vh, 18px);
    text-align: center;
    background: #fff;
    border: 3px solid #FFCF80;
    border-radius: clamp(20px, 3.5vh, 28px);
    padding: clamp(20px, 3.5vh, 30px) clamp(16px, 4vw, 28px);
    box-shadow: 0 4px 0 ${t.primary}2e, 0 12px 26px -16px rgba(0,0,0,.2);
  }

  .bb-card.correct {
    background: #F0FFF0; border-color: ${t.correct};
    box-shadow: 0 6px 0 ${t.correctDark}, 0 8px 20px rgba(88,204,2,.12);
  }

  .bb-card.wrong {
    background: #FFF0F0; border-color: ${t.wrong};
    box-shadow: 0 6px 0 ${t.wrongDark}, 0 8px 20px rgba(255,50,50,.12);
  }

  .bb-emoji {
    font-size: clamp(48px, 10vh, 80px);
    line-height: 1;
    user-select: none;
  }

  .bb-scenario {
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(18px, 4.2vh, 28px);
    line-height: 1.3;
  }

  .bb-status {
    font-weight: 700; font-size: clamp(13px, 2.4vh, 15px);
    color: #8A7860; text-align: center; max-width: 300px;
    line-height: 1.5;
  }

  .bb-status.live {
    color: ${t.primary}; font-family: 'Baloo 2', sans-serif; font-weight: 800;
  }

  .bb-phrase {
    margin-top: 0.5rem;
    background: rgba(255,150,0,0.12);
    border-radius: 12px;
    padding: 0.4rem 0.8rem;
    display: inline-block;
  }

  .bb-footer {
    flex-shrink: 0;
    display: flex; gap: clamp(8px, 2vw, 12px);
    width: 100%; max-width: 520px;
    margin: 0 auto;
    padding: clamp(10px, 1.6vh, 14px) clamp(14px, 3.5vw, 28px) clamp(8px, 1.6vh, 12px);
    border-top: 2px solid rgba(255,150,0,0.18);
  }

  .bb-btn {
    flex: 1; min-width: 0;
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(13px, 2.4vh, 16px);
    border: none; border-radius: 14px; cursor: pointer;
    padding: clamp(10px, 2vh, 14px) 12px;
    transition: transform .12s ease;
  }

  .bb-btn:active { transform: translateY(2px); }
  .bb-btn:disabled { opacity: 0.45; cursor: not-allowed; }

  .bb-btn.primary {
    color: #fff;
    background: linear-gradient(180deg, ${t.primary}cc, ${t.primary});
    box-shadow: 0 4px 0 ${t.primaryDark};
  }

  .bb-btn.secondary {
    color: #64748B; background: #F1F5F9;
    box-shadow: 0 4px 0 #CBD5E1;
  }

  .bb-center {
    flex: 1; min-height: 0;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: clamp(16px, 2.4vh, 20px); padding: 16px; text-align: center;
  }

  .bb-mic-wrap {
    position: relative; width: 72px; height: 72px;
    display: flex; align-items: center; justify-content: center;
  }

  .bb-mic-ring {
    position: absolute; width: 72px; height: 72px;
    border-radius: 50%; background: rgba(255,150,0,0.15);
    animation: bbPulseRing 1.2s ease-out infinite;
  }

  .bb-mic-ring2 {
    position: absolute; width: 56px; height: 56px;
    border-radius: 50%; background: rgba(255,150,0,0.2);
    animation: bbPulseRing 1.2s ease-out 0.3s infinite;
  }

  .bb-mic-core {
    width: 56px; height: 56px;
    border-radius: 50%; background: linear-gradient(180deg, ${t.primary}cc, ${t.primary});
    display: flex; align-items: center; justify-content: center;
    font-size: 1.8rem;
    box-shadow: 0 4px 12px rgba(255,150,0,0.4);
  }

  .bb-icon-row {
    display: flex; gap: 1rem;
  }

  .bb-icon-btn {
    width: 52px; height: 52px;
    border-radius: 14px; background: #fff; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: transform .12s ease;
    border: 2px solid #FFCF80;
  }

  .bb-icon-btn:active { transform: translateY(2px); }
`,Q=[{id:"c1",emoji:"🎁",situation:{bm:"Kawan memberi kamu hadiah.",eng:"A friend gives you a gift."},phrase:"Terima kasih",accept:["terima kasih","terima","kasih","thank you","thanks"]},{id:"c2",emoji:"👩‍🏫",situation:{bm:"Kamu jumpa cikgu pada waktu pagi.",eng:"You meet your teacher in the morning."},phrase:"Selamat pagi, cikgu",accept:["selamat pagi","selamat","pagi cikgu","good morning","morning"]},{id:"c3",emoji:"🙇",situation:{bm:"Kamu tersilap melanggar kawan.",eng:"You accidentally bumped a friend."},phrase:"Minta maaf",accept:["minta maaf","mintak maaf","maaf","maafkan","ampun","sorry","excuse me"]},{id:"c4",emoji:"🙏",situation:{bm:"Kamu mahu meminta bantuan.",eng:"You want to ask for help."},phrase:"Tolong saya",accept:["tolong","tolonglah","minta tolong","boleh tolong","help","please help"]},{id:"c5",emoji:"🤝",situation:{bm:"Kawan menolong kamu mengangkat beg.",eng:"A friend helped carry your bag."},phrase:"Terima kasih",accept:["terima kasih","terima","kasih","thank you","thanks"]},{id:"c6",emoji:"👋",situation:{bm:"Kamu mahu pulang ke rumah.",eng:"You are heading home."},phrase:"Selamat tinggal",accept:["selamat tinggal","selamat","tinggal","jumpa lagi","jumpa","bye","goodbye","bye bye"]},{id:"c7",emoji:"🚪",situation:{bm:"Kamu masuk ke dalam rumah.",eng:"You enter the house."},phrase:"Assalamualaikum",accept:["assalamualaikum","assalamu alaikum","asalamualaikum","asalam","assalam","salamualaikum","salam","alaikum","mualaikum"]},{id:"c8",emoji:"🚶",situation:{bm:"Kamu mahu lalu di hadapan orang.",eng:"You want to pass in front of someone."},phrase:"Tumpang lalu",accept:["tumpang lalu","tumpang","numpang lalu","numpang","lalu","excuse me"]},{id:"c9",emoji:"🍽️",situation:{bm:"Ibu menghidang makanan untuk kamu.",eng:"Mother serves you food."},phrase:"Terima kasih, ibu",accept:["terima kasih","terima","kasih ibu","kasih","thank you"]},{id:"c10",emoji:"🙋",situation:{bm:"Kamu mahu keluar dari kelas.",eng:"You want to leave the classroom."},phrase:"Minta izin, cikgu",accept:["minta izin","mintak izin","izin cikgu","izin","minta keluar","excuse me"]}],ge=m=>[...m].sort(()=>Math.random()-.5),Z=()=>ge(Q).slice(0,Math.min(fe,Q.length)),ke=m=>m.toLowerCase().replace(/[.,!?]/g,"").replace(/\s+/g," ").trim();function ee(m,a){const d=ke(m);return a.accept.some(B=>d.includes(B))}function ye(m){return[...new Set(m.accept.join(" ").split(" "))].filter(Boolean)}function Ee({onBack:m,language:a="bm"}){const d=n.isMobile(),{awardCorrect:B,awardWrong:ae,completeActivity:I}=be(xe),[h,te]=r.useState(()=>Z()),[k,Y]=r.useState(0),[i,o]=r.useState(f),[K,_]=r.useState(0),[L,D]=r.useState(0),[y,j]=r.useState(0),[O,w]=r.useState(""),[C,x]=r.useState(null),A=r.useRef(0),T=r.useRef(h),R=r.useRef(0),b=r.useRef(!1);r.useEffect(()=>{A.current=k},[k]),r.useEffect(()=>{T.current=h},[h]),r.useEffect(()=>{R.current=y},[y]),r.useEffect(()=>()=>{n.stop(),n.stopSpeaking()},[]);const l=h[k]??null,g=r.useCallback(s=>n.speak(s,"ms"),[]),z=a==="bm"?"Bertutur Bertatasusila":"Polite Speaking",N=r.useCallback(()=>{const s=A.current+1;if(s>=T.current.length){o(J),P({particleCount:200,spread:160,origin:{y:.4}}),I();return}Y(s),j(0),w(""),x(null),o(f)},[I]);r.useEffect(()=>{if(i!==f||!l)return;let s=!1;return(async()=>(await g(l.situation.bm),!s&&o(d?c:u)))(),()=>{s=!0,n.stopSpeaking()}},[i,l,d,g]),r.useEffect(()=>{i!==u||d||G()},[i,d]);const re=()=>{X("correct"),B(),P({particleCount:40,spread:60,origin:{y:.6},scalar:.8}),_(p=>p+1),D(p=>{const S=p+1;return S%5===0&&(X("streak"),P({particleCount:150,spread:100,origin:{y:.5}})),S}),j(0),o(q);const s=["Bagus!","Hebat!","Pandai!","Bijak!","Cemerlang!"];g(s[Math.floor(Math.random()*s.length)]),setTimeout(()=>N(),1800)},ie=()=>{ae(),D(0),j(p=>p+1);const s=R.current+1>=E;o(W),s?(l&&g(l.phrase),setTimeout(()=>N(),2600)):setTimeout(()=>o(c),1900)},G=()=>{if(!n.isSupported()||b.current)return;b.current=!0,x(null),w(""),o(u);const s=T.current[A.current];n.listen("ms-MY",(p,S,V)=>{b.current=!1;let $=ee(p,s);!$&&V?.length>1&&($=V.some(de=>ee(de.transcript,s))),w(p),$?re():ie()},p=>{if(b.current=!1,p==="not-allowed"||p==="service-not-allowed"||p==="audio-capture"){x("perm"),o(c);return}if(p==="network"){x("net"),o(c);return}R.current<E?(x("nospeech"),j(S=>S+1),o(c)):(x(null),o(W),w(""),setTimeout(()=>N(),2e3))},{retries:d?2:1,grammarWords:s?ye(s):[]})},se=()=>{l&&(n.stop(),n.stopSpeaking(),b.current=!1,g(l.situation.bm).then(()=>o(d?c:u)))},ne=()=>{l&&(n.stop(),n.stopSpeaking(),b.current=!1,g(l.phrase).then(()=>o(d?c:u)))},oe=()=>{n.stop(),n.stopSpeaking(),b.current=!1,N()},le=()=>{n.stop(),n.stopSpeaking(),b.current=!1,te(Z()),Y(0),_(0),D(0),j(0),w(""),x(null),o(f)},F=i===q,v=i===W,ce=i===u;if(i===J)return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:H}),e.jsxs("div",{className:"bb-root",children:[e.jsx(M,{onBack:m,language:a,title:z}),e.jsxs("div",{className:"bb-center",children:[e.jsx("div",{style:{fontSize:"clamp(56px, 12vh, 90px)",lineHeight:1},children:"🙇"}),e.jsx("h2",{style:{fontFamily:"'Baloo 2', sans-serif",color:t.primary,fontSize:"clamp(24px, 5vh, 36px)",fontWeight:800,margin:0},children:a==="bm"?"Tahniah!":"Well Done!"}),e.jsxs("p",{style:{fontSize:"clamp(16px, 3vh, 21px)",color:"#555",fontWeight:600,margin:"0.6rem 0 1rem"},children:[a==="bm"?"Markah: ":"Score: ",e.jsx("strong",{children:K}),"/",h.length]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.6rem",background:"#FFF6D6",borderRadius:999,padding:"0.5rem 1.2rem",border:"1.5px solid #FFE08A",marginBottom:"clamp(16px, 2.4vh, 24px)"},children:[e.jsx("span",{style:{fontSize:"1.1rem"},children:"🔥"}),e.jsxs("span",{style:{fontWeight:800,fontFamily:"'Baloo 2', sans-serif",color:"#B58800",fontSize:"clamp(13px, 2.4vh, 16px)"},children:[a==="bm"?"Streak terbaik:":"Best streak:"," ",L]})]}),e.jsxs("div",{style:{display:"flex",gap:"0.8rem"},children:[e.jsxs("button",{onClick:le,style:{fontFamily:"'Baloo 2', sans-serif",padding:"0.8rem 1.5rem",background:"#fff",color:"#475569",border:"2px solid #E2E8F0",borderRadius:999,fontSize:"1rem",cursor:"pointer",fontWeight:800},children:["🔄 ",a==="bm"?"Main Semula":"Play Again"]}),e.jsxs("button",{onClick:m,style:{fontFamily:"'Baloo 2', sans-serif",padding:"0.8rem 1.5rem",background:`linear-gradient(180deg, ${t.primary}cc, ${t.primary})`,color:"#fff",border:"none",borderRadius:999,fontSize:"1rem",cursor:"pointer",fontWeight:800,boxShadow:`0 4px 0 ${t.primaryDark}`},children:["← ",a==="bm"?"Kembali":"Back"]})]})]})]})]});const U=n.getUnsupportedReason();if(U)return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:H}),e.jsxs("div",{className:"bb-root",children:[e.jsx(M,{onBack:m,language:a,title:z}),e.jsxs("div",{className:"bb-center",children:[e.jsx("div",{style:{fontSize:"4rem"},children:"🎤"}),e.jsx("h2",{style:{fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:"1.2rem",color:"#333",margin:0},children:a==="bm"?"Suara Tidak Tersedia":"Voice Not Available"}),e.jsx("p",{style:{color:"#777",fontWeight:600,lineHeight:1.5,maxWidth:360,margin:0},children:U}),e.jsxs("button",{onClick:m,style:{fontFamily:"'Baloo 2', sans-serif",padding:"0.75rem 1.5rem",background:`linear-gradient(180deg, ${t.primary}cc, ${t.primary})`,color:"#fff",border:"none",borderRadius:999,cursor:"pointer",fontWeight:800},children:["← ",a==="bm"?"Kembali":"Go Back"]})]})]})]});const me=v&&y>=E,pe=`bb-card${F?" correct":""}${v?" wrong":""}`;return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:H}),e.jsxs("div",{className:"bb-root",children:[e.jsx(M,{onBack:m,language:a,title:z}),e.jsxs("div",{className:"bb-body",children:[e.jsxs("div",{className:"bb-stats",children:[e.jsxs("span",{className:"bb-pill",children:[k+1," / ",h.length]}),e.jsxs("span",{style:{display:"flex",gap:6},children:[e.jsxs("span",{className:"bb-pill",style:{background:"#FFEAD0",color:"#D9610B",borderColor:"#FFC081"},children:["⭐ ",K]}),e.jsxs("span",{className:"bb-pill",style:{background:"#FFF6D6",color:"#B58800",borderColor:"#FFE08A"},children:["🔥 ",L]})]})]}),e.jsx("div",{className:"bb-bar-wrap",children:e.jsx("div",{className:"bb-bar-fill",style:{width:`${k/h.length*100}%`}})}),e.jsxs("div",{className:"bb-stage",children:[e.jsx("div",{className:pe,children:l&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"bb-emoji",children:l.emoji}),e.jsx("div",{className:"bb-scenario",style:{color:F?t.correctDark:v?t.wrongDark:"#1E293B"},children:l.situation[a]??l.situation.bm}),me&&e.jsxs("div",{className:"bb-phrase",children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"#B58800"},children:a==="bm"?"Sebut: ":"Say: "}),e.jsx("span",{style:{fontWeight:900,color:t.primary,fontSize:"1.05rem"},children:l.phrase})]})]})}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"0.5rem",minHeight:"80px",justifyContent:"center"},children:[ce&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"bb-mic-wrap",children:[e.jsx("div",{className:"bb-mic-ring"}),e.jsx("div",{className:"bb-mic-ring2"}),e.jsx("div",{className:"bb-mic-core",children:"🎤"})]}),e.jsx("p",{className:"bb-status live",children:a==="bm"?"Cakap sekarang...":"Speak now..."})]}),i===f&&e.jsxs("div",{className:"bb-status",children:[e.jsx("span",{style:{fontSize:"1.4rem",display:"inline-block",animation:"bbSpeakBounce 1s ease-in-out infinite"},children:"🔊"}),e.jsx("span",{children:a==="bm"?"Dengar situasi...":"Listen to the situation..."})]}),i===c&&C==="perm"&&e.jsxs("p",{className:"bb-status",style:{color:t.wrongDark,maxWidth:320},children:["🎤 ",a==="bm"?"Benarkan akses mikrofon dalam pelayar, kemudian tekan 🎤 sekali lagi.":"Please allow microphone access in your browser, then tap 🎤 again."]}),i===c&&C==="net"&&e.jsxs("p",{className:"bb-status",style:{color:t.wrongDark,maxWidth:320},children:["📡 ",a==="bm"?"Sambungan internet diperlukan untuk suara. Cuba lagi.":"Voice needs an internet connection. Try again."]}),i===c&&C==="nospeech"&&e.jsx("p",{className:"bb-status",style:{color:"#D9610B"},children:a==="bm"?"Tak dengar suara. Cuba lagi! 🎤":"Didn't hear you. Try again! 🎤"}),i===c&&!C&&e.jsxs("p",{className:"bb-status",children:[a==="bm"?"Tekan 🎤 untuk menjawab":"Tap 🎤 to answer",y>0&&` · ${a==="bm"?"Cuba":"Try"} ${y+1}/${E}`]}),O&&(F||v)&&e.jsxs("p",{className:"bb-status",style:{color:F?t.correctDark:t.wrongDark},children:['"',O,'"']})]}),(i===c||i===u||i===f)&&e.jsxs("div",{className:"bb-icon-row",children:[e.jsx("button",{onClick:se,className:"bb-icon-btn",style:{borderColor:t.primary},title:a==="bm"?"Ulang situasi":"Repeat situation",children:e.jsx(ue,{size:22,color:t.primary})}),e.jsx("button",{onClick:ne,className:"bb-icon-btn",style:{borderColor:"#FFD9A8",fontSize:"1.4rem"},title:a==="bm"?"Bantuan":"Hint",children:"💡"}),e.jsx("button",{onClick:oe,className:"bb-icon-btn",style:{borderColor:"#E0E0E0"},title:a==="bm"?"Langkau":"Skip",children:e.jsx(he,{size:22,color:t.wrong})})]})]})]}),e.jsxs("div",{className:"bb-footer",children:[i===c&&e.jsxs("button",{className:"bb-btn primary",onClick:()=>G(),children:["🎤 ",a==="bm"?"Tekan untuk Menjawab":"Tap to Answer"]}),i===u&&e.jsxs("button",{className:"bb-btn secondary",onClick:()=>{n.stop(),b.current=!1,o(c)},children:["⏸ ",a==="bm"?"Berhenti":"Stop"]}),i===f&&e.jsxs("button",{className:"bb-btn primary",disabled:!0,children:["🔊 ",a==="bm"?"Mendengar situasi...":"Playing situation..."]}),(F||v)&&e.jsxs("button",{className:"bb-btn primary",disabled:!0,children:["🎤 ",a==="bm"?"Tekan untuk Menjawab":"Tap to Answer"]})]}),e.jsx("style",{children:`
          @keyframes bbPulseRing {
            0%   { transform: scale(0.8); opacity: 0.8; }
            100% { transform: scale(1.6); opacity: 0; }
          }
          @keyframes bbSpeakBounce {
            0%, 100% { transform: translateY(0);  }
            50%       { transform: translateY(-6px); }
          }
        `})]})]})}export{Ee as default};
