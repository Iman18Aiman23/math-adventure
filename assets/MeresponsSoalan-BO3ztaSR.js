import{S as o,r,j as e,p as te}from"./index-YCInXYg5.js";import{B as se}from"./BMHeader-B5cOc9J_.js";import{c as re}from"./confetti.module-oQXWb4Lk.js";import{u as Ne}from"./useTopicGamification-I1kCte-J.js";import{s as ie}from"./utils-Direv13U.js";import{B as qe}from"./BMNotaCard-Ltn-dADi.js";import{R as Te}from"./refresh-cw-J9zlOc9a.js";import{S as Ee}from"./skip-forward-CWFoDEaO.js";import"./useGamification-g-vGaz2S.js";const ne="2-1-1a-merespons-soalan",Re="speaking",c="ready",D="listening",_="correct",z="wrong",Y="result",C=3,h=10,a={primary:"#FF9600",primaryDark:"#D47A00",correct:"#4CAF50",correctDark:"#388E3C",wrong:"#FF6B6B",wrongDark:"#D32F2F"},oe=`
  .ms-root {
    height: 100dvh; overflow: hidden;
    /* Plain white shell so kids focus on the Q&A (matches MathOperationsGame) */
    background: #FFFFFF;
    font-family: 'Fredoka', system-ui, sans-serif;
    display: flex; flex-direction: column;
  }

  .ms-body {
    flex: 1; min-height: 0;
    display: flex; flex-direction: column; align-items: center;
    width: 100%; max-width: 520px;
    margin: 0 auto;
    padding: clamp(8px, 1.6vh, 12px) clamp(14px, 3.5vw, 28px);
  }

  .ms-stats {
    flex-shrink: 0; width: 100%;
    display: flex; align-items: center; justify-content: space-between;
    gap: 8px; margin-bottom: clamp(10px, 1.6vh, 14px);
  }

  .ms-pill {
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(11px, 2vh, 13px);
    border-radius: 999px;
    padding: clamp(3px, 0.7vh, 5px) clamp(10px, 2.4vw, 14px);
    white-space: nowrap;
    background: #FFFFFFCC; color: #9A5B10; border: 1.5px solid ${a.primary}44;
  }
  /* Reward chips — standardized to match StatsBar (solid candy chip, white text) */
  .ms-pill.chip {
    color: #fff; border: none;
    box-shadow: 0 2px 0 rgba(0,0,0,.12), inset 0 1px 0 rgba(255,255,255,.30);
  }
  .ms-pill.chip.heart { background: #FF4B4B; }
  .ms-pill.chip.gem   { background: #1CC8EE; }
  .ms-pill.chip.star  { background: #A560FF; }
  .ms-pill.chip.fire  { background: #FF9600; }

  .ms-bar-wrap {
    flex-shrink: 0; width: 100%;
    background: #FFD9A8; border-radius: 999px;
    height: clamp(6px, 1.2vh, 9px); overflow: hidden;
    margin-bottom: clamp(16px, 2.4vh, 22px);
  }

  .ms-bar-fill {
    background: linear-gradient(90deg, ${a.primary}, #FFB347);
    height: 100%; border-radius: 999px;
    transition: width 0.3s;
  }

  .ms-stage {
    flex: 1; min-height: 0; width: 100%;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: clamp(12px, 2.4vh, 20px);
  }

  .ms-card {
    flex-shrink: 0; width: 100%;
    display: flex; flex-direction: column; align-items: center;
    gap: clamp(12px, 2vh, 18px);
    text-align: center;
    background: #fff;
    border: 2.5px solid ${a.primary}33;
    border-radius: clamp(20px, 3.5vh, 28px);
    padding: clamp(20px, 3.5vh, 30px) clamp(16px, 4vw, 28px);
    box-shadow: 0 4px 0 ${a.primary}2e, 0 12px 26px -16px rgba(0,0,0,.2);
  }

  .ms-card.correct {
    background: #F0FFF0; border-color: ${a.correct};
    box-shadow: 0 6px 0 ${a.correctDark}, 0 8px 20px rgba(88,204,2,.12);
  }

  .ms-card.wrong {
    background: #FFF0F0; border-color: ${a.wrong};
    box-shadow: 0 6px 0 ${a.wrongDark}, 0 8px 20px rgba(255,50,50,.12);
  }

  .ms-emoji {
    font-size: clamp(48px, 10vh, 80px);
    line-height: 1;
    user-select: none;
  }

  .ms-question {
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(18px, 4.2vh, 28px);
    line-height: 1.3;
  }

  .ms-answer {
    margin-top: 0.5rem;
    background: rgba(255,150,0,0.12);
    border-radius: 12px;
    padding: 0.4rem 0.8rem;
    display: inline-block;
    font-weight: 900;
    color: ${a.primary};
    font-size: 1.05rem;
  }

  .ms-status {
    font-weight: 700; font-size: clamp(13px, 2.4vh, 15px);
    color: #8A7860; text-align: center; max-width: 300px;
    line-height: 1.5;
  }

  .ms-status.live {
    color: ${a.primary}; font-family: 'Baloo 2', sans-serif; font-weight: 800;
  }

  .ms-footer {
    flex-shrink: 0;
    display: flex; gap: clamp(8px, 2vw, 12px);
    width: 100%; max-width: 520px;
    margin: 0 auto;
    padding: clamp(10px, 1.6vh, 14px) clamp(14px, 3.5vw, 28px) clamp(8px, 1.6vh, 12px);
    border-top: 2px solid rgba(255,150,0,0.18);
  }

  .ms-btn {
    flex: 1; min-width: 0;
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(13px, 2.4vh, 16px);
    border: none; border-radius: 14px; cursor: pointer;
    padding: clamp(10px, 2vh, 14px) 12px;
    transition: transform .12s ease;
  }

  .ms-btn:active { transform: translateY(2px); }
  .ms-btn:disabled { opacity: 0.45; cursor: not-allowed; }

  .ms-btn.primary {
    color: #fff;
    background: linear-gradient(180deg, ${a.primary}cc, ${a.primary});
    box-shadow: 0 4px 0 ${a.primaryDark};
  }

  .ms-btn.success {
    color: #fff;
    background: linear-gradient(180deg, #66BB6A, #4CAF50);
    box-shadow: 0 4px 0 #388E3C;
  }

  .ms-btn.secondary {
    color: #64748B; background: #F1F5F9;
    box-shadow: 0 4px 0 #CBD5E1;
  }

  /* Round mic button — sits beside the full-width submit in the footer */
  .ms-mic-btn {
    flex: 0 0 auto;
    width: clamp(48px, 8vh, 56px); height: clamp(48px, 8vh, 56px);
    border: none; border-radius: 50%; cursor: pointer;
    font-size: clamp(20px, 3.6vh, 26px); line-height: 1;
    color: #fff;
    background: linear-gradient(180deg, ${a.primary}cc, ${a.primary});
    box-shadow: 0 4px 0 ${a.primaryDark};
    display: flex; align-items: center; justify-content: center;
    transition: transform .12s ease, box-shadow .12s;
  }
  .ms-mic-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 ${a.primaryDark}; }

  .ms-center {
    flex: 1; min-height: 0;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: clamp(16px, 2.4vh, 20px); padding: 16px; text-align: center;
  }

  .ms-mic-wrap {
    position: relative; width: 72px; height: 72px;
    display: flex; align-items: center; justify-content: center;
  }

  .ms-mic-ring {
    position: absolute; width: 72px; height: 72px;
    border-radius: 50%; background: rgba(255,150,0,0.15);
    animation: msPulseRing 1.2s ease-out infinite;
  }

  .ms-mic-ring2 {
    position: absolute; width: 56px; height: 56px;
    border-radius: 50%; background: rgba(255,150,0,0.2);
    animation: msPulseRing 1.2s ease-out 0.3s infinite;
  }

  .ms-mic-core {
    width: 56px; height: 56px;
    border-radius: 50%; background: linear-gradient(180deg, ${a.primary}cc, ${a.primary});
    display: flex; align-items: center; justify-content: center;
    font-size: 1.8rem;
    box-shadow: 0 4px 12px rgba(255,150,0,0.4);
  }

  .ms-icon-row {
    display: flex; gap: 1rem;
  }

  .ms-icon-btn {
    width: 52px; height: 52px;
    border-radius: 14px; background: #fff; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: transform .12s ease;
    border: 2px solid ${a.primary}33;
  }

  .ms-icon-btn:active { transform: translateY(2px); }

  .ms-type-input {
    width: 100%; max-width: 360px;
    padding: clamp(10px, 1.8vh, 14px) clamp(14px, 2.8vw, 20px);
    border: 2.5px solid ${a.primary}33;
    border-radius: 16px;
    font-family: 'Fredoka', sans-serif;
    font-size: clamp(18px, 3.4vh, 26px);
    font-weight: 600;
    text-align: center;
    outline: none;
    background: #fff;
    color: #1E293B;
    transition: border-color .2s;
  }
  .ms-type-input:focus { border-color: ${a.primary}; box-shadow: 0 0 0 3px ${a.primary}22; }
  .ms-type-input:disabled { opacity: 0.6; }

  .ms-mode-toggle {
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(11px, 2vh, 13px);
    border: 2px solid ${a.primary}44;
    border-radius: 999px;
    background: #fff;
    color: #9A5B10;
    padding: clamp(3px, 0.6vh, 5px) clamp(10px, 2vw, 14px);
    cursor: pointer;
    transition: all .15s ease;
  }
  .ms-mode-toggle:hover { border-color: ${a.primary}; background: ${a.primary}0d; }
  .ms-mode-toggle:active { transform: translateY(1px); }
`,ce=[{id:"q1",emoji:"☁️",type:"bertumpu",question:"Apakah warna langit?",answer:"Biru",accept:["biru"]},{id:"q2",emoji:"🌱",type:"bertumpu",question:"Apakah warna rumput?",answer:"Hijau",accept:["hijau"]},{id:"q3",emoji:"🐱",type:"bertumpu",question:"Berapa kaki seekor kucing?",answer:"Empat",accept:["empat","4"]},{id:"q4",emoji:"🍌",type:"bertumpu",question:"Apakah warna pisang masak?",answer:"Kuning",accept:["kuning"]},{id:"q5",emoji:"🐔",type:"bertumpu",question:"Haiwan apakah yang berkokok pada waktu pagi?",answer:"Ayam",accept:["ayam"]},{id:"q6",emoji:"📅",type:"bertumpu",question:"Berapa hari dalam seminggu?",answer:"Tujuh",accept:["tujuh","7"]},{id:"q7",emoji:"🍎",type:"bertumpu",question:"Apakah warna epal merah?",answer:"Merah",accept:["merah"]},{id:"q8",emoji:"🐟",type:"bertumpu",question:"Di manakah ikan hidup?",answer:"Air",accept:["air","di air"]},{id:"q9",emoji:"👀",type:"bertumpu",question:"Apakah yang kita guna untuk melihat?",answer:"Mata",accept:["mata"]},{id:"q10",emoji:"🌙",type:"bertumpu",question:"Bilakah bulan kelihatan di langit?",answer:"Malam",accept:["malam","waktu malam"]},{id:"q11",emoji:"☀️",type:"bertumpu",question:"Apakah yang bersinar pada waktu siang?",answer:"Matahari",accept:["matahari"]},{id:"q12",emoji:"🐄",type:"bertumpu",question:"Haiwan apakah yang menghasilkan susu?",answer:"Lembu",accept:["lembu"]},{id:"q13",emoji:"🐦",type:"bertumpu",question:"Haiwan apakah yang boleh terbang?",answer:"Burung",accept:["burung"]},{id:"q14",emoji:"🦷",type:"bertumpu",question:"Apakah yang kita guna untuk mengunyah makanan?",answer:"Gigi",accept:["gigi"]},{id:"q15",emoji:"🚗",type:"bertumpu",question:"Apakah kenderaan yang bergerak di jalan raya?",answer:"Kereta",accept:["kereta"]},{id:"q16",emoji:"🏫",type:"bertumpu",question:"Di manakah murid belajar?",answer:"Sekolah",accept:["sekolah","di sekolah"]},{id:"q17",emoji:"📖",type:"bertumpu",question:"Apakah yang kita baca?",answer:"Buku",accept:["buku"]},{id:"q18",emoji:"✏️",type:"bertumpu",question:"Apakah yang kita guna untuk menulis?",answer:"Pensel",accept:["pensel"]},{id:"q19",emoji:"🌧️",type:"bertumpu",question:"Apakah yang turun dari langit ketika hujan?",answer:"Air",accept:["air","air hujan"]},{id:"q20",emoji:"🖐️",type:"bertumpu",question:"Berapa jari pada satu tangan?",answer:"Lima",accept:["lima","5"]}],$e=m=>m.toLowerCase().replace(/[.,!?]/g,"").replace(/\s+/g," ").trim();function G(m,t){const N=$e(m);return t.accept.some(q=>N.includes(q))}function Me(m){return m.type!=="bertumpu"?[]:[...new Set(m.accept.join(" ").split(" "))].filter(Boolean)}function Ge({onBack:m,language:t="bm",topicComplete:N,onNextTopic:q}){const pe=o.isMobile(),le=o.getUnsupportedReason(),{awardCorrect:O,awardWrong:me,completeTopic:K,hearts:de,gems:ue}=Ne(ne),he=r.useRef(!!le),[f,xe]=r.useState(()=>ie(ce).slice(0,h)),Q=r.useRef(f);r.useEffect(()=>{Q.current=f},[f]);const[w,U]=r.useState(0),[p,n]=r.useState(c),[j,H]=r.useState(0),[P,T]=r.useState(0),[b,v]=r.useState(0),[J,x]=r.useState(""),[E,g]=r.useState(null),[fe,R]=r.useState(!1),[S,$]=r.useState(""),[be,ge]=r.useState(!0),M=r.useRef(0),W=r.useRef(0),u=r.useRef(!1),I=r.useRef(!1);r.useEffect(()=>{M.current=w},[w]),r.useEffect(()=>{W.current=b},[b]),r.useEffect(()=>()=>{o.stop(),o.stopSpeaking()},[]),r.useEffect(()=>{p===Y&&!I.current&&(I.current=!0,K(j,h,70),j/h*100>=70&&N?.(ne))},[p,j,K,N]);const l=f[w]??null,F=r.useCallback(s=>o.speak(s,"ms"),[]),X=t==="bm"?"Merespons Soalan":"Answer the Question",A=he.current||fe,B=r.useCallback(()=>{const s=M.current+1;if(s>=Q.current.length){n(Y);return}U(s),v(0),x(""),g(null),R(!1),$(""),n(c)},[]),V=()=>{te("correct"),O(),re({particleCount:40,spread:60,origin:{y:.6},scalar:.8}),H(i=>i+1),T(i=>{const d=i+1;return d%5===0&&(te("streak"),re({particleCount:150,spread:100,origin:{y:.5}})),d}),v(0),n(_);const s=["Bagus!","Hebat!","Pandai!","Bijak!","Cemerlang!"];F(s[Math.floor(Math.random()*s.length)]),setTimeout(()=>B(),1800)},Z=()=>{me(),T(0);const s=W.current+1;v(s),s>=C?(n(z),l?.type==="bertumpu"&&l.answer&&F(l.answer),setTimeout(()=>B(),2400)):(n(z),x(""),setTimeout(()=>n(c),1700))},ye=()=>{if(!o.isSupported()||u.current)return;u.current=!0,g(null),x(""),n(D);const s=f[M.current];s&&o.listen("ms-MY",(i,d,ae)=>{u.current=!1;let L=G(i,s);!L&&ae?.length>1&&(L=ae.some(Ce=>G(Ce.transcript,s))),x(i),L?V():Z()},i=>{if(u.current=!1,i==="not-allowed"||i==="service-not-allowed"||i==="audio-capture"){g("perm"),R(!0),n(c);return}if(i==="network"){g("net"),R(!0),n(c);return}W.current<C?(g("nospeech"),v(d=>d+1),n(c)):(n(z),x(""),setTimeout(()=>B(),2e3))},{retries:pe?2:1,grammarWords:s?Me(s):[]})},ee=()=>{const s=f[M.current];if(!s||!S.trim())return;let i=G(S,s);x(S),$(""),i?V():Z()},ke=()=>{O(),H(i=>i+1),T(i=>i+1),n(_);const s=["Bagus!","Hebat!","Pandai!","Bijak!","Cemerlang!"];F(s[Math.floor(Math.random()*s.length)]),setTimeout(()=>B(),1200)},we=()=>{l&&(o.stop(),o.stopSpeaking(),u.current=!1,F(l.question).then(()=>n(c)))},je=()=>{l&&(o.stop(),o.stopSpeaking(),u.current=!1,F(l.answer).then(()=>n(c)))},ve=()=>{o.stop(),o.stopSpeaking(),u.current=!1,B()},Se=()=>{o.stop(),o.stopSpeaking(),u.current=!1,I.current=!1,xe(ie(ce).slice(0,h)),U(0),n(c),H(0),T(0),v(0),x(""),g(null),R(!1),$("")};if(be)return e.jsx(qe,{language:t,accentColor:a.primary,topicTitle:t==="bm"?"Merespons Soalan":"Responding to Questions",definition:t==="bm"?"Respons bermaksud memberi tindak balas atau menjawab sesuatu yang didengar, dilihat, atau dibaca.":"A response means reacting to or answering something you hear, see, or read.",examples:t==="bm"?['Cikgu bertanya, "Siapa suka membaca?"',"Murid mengangkat tangan."]:['Teacher asks, "Who likes reading?"',"A pupil raises their hand."],conclusion:t==="bm"?"➜ Murid merespons soalan cikgu.":"➜ The pupil responds to the teacher's question.",onStart:()=>ge(!1),onBack:m});if(p===Y){const s=j,i=s/h*100,d=i>=70;return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:oe}),e.jsxs("div",{className:"ms-root",children:[e.jsx(se,{onBack:m,language:t,title:X}),e.jsxs("div",{className:"ms-center",children:[e.jsx("div",{style:{fontSize:"clamp(56px, 12vh, 90px)",lineHeight:1},children:d?"🏆":"💪"}),e.jsx("h2",{style:{fontFamily:"'Baloo 2', sans-serif",color:d?a.primary:"#888",fontSize:"clamp(24px, 5vh, 36px)",fontWeight:800,margin:0},children:d?t==="bm"?"Tahniah! Lulus! 🎉":"Well Done! Passed! 🎉":t==="bm"?"Cuba Lagi!":"Try Again!"}),e.jsxs("p",{style:{fontSize:"clamp(16px, 3vh, 21px)",color:"#555",fontWeight:600,margin:"0.6rem 0 0.2rem"},children:[t==="bm"?"Markah: ":"Score: ",e.jsx("strong",{children:s}),"/",h,e.jsxs("span",{style:{color:"#999",fontSize:"0.85rem"},children:[" (",Math.round(i),"%)"]})]}),d&&e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.6rem",background:"#FFF6D6",borderRadius:999,padding:"0.5rem 1.2rem",border:"1.5px solid #FFE08A",marginBottom:"clamp(8px, 1.6vh, 16px)"},children:[e.jsx("span",{style:{fontSize:"1.1rem"},children:"🔥"}),e.jsxs("span",{style:{fontWeight:800,fontFamily:"'Baloo 2', sans-serif",color:"#B58800",fontSize:"clamp(13px, 2.4vh, 16px)"},children:[t==="bm"?"Streak terbaik:":"Best streak:"," ",P]})]}),e.jsxs("div",{style:{display:"flex",gap:"0.8rem",flexWrap:"wrap",justifyContent:"center"},children:[d&&q&&e.jsx("button",{onClick:q,style:{fontFamily:"'Baloo 2', sans-serif",padding:"0.8rem 1.5rem",background:`linear-gradient(180deg, ${a.primary}cc, ${a.primary})`,color:"#fff",border:"none",borderRadius:999,fontSize:"1rem",cursor:"pointer",fontWeight:800,boxShadow:`0 4px 0 ${a.primaryDark}`},children:t==="bm"?"Topik Seterusnya →":"Next Topic →"}),e.jsxs("button",{onClick:Se,style:{fontFamily:"'Baloo 2', sans-serif",padding:"0.8rem 1.5rem",background:"#fff",color:"#475569",border:"2px solid #E2E8F0",borderRadius:999,fontSize:"1rem",cursor:"pointer",fontWeight:800},children:["🔄 ",t==="bm"?"Cuba Lagi":"Try Again"]}),e.jsxs("button",{onClick:m,style:{fontFamily:"'Baloo 2', sans-serif",padding:"0.8rem 1.5rem",background:"#F1F5F9",color:"#475569",border:"2px solid #E2E8F0",borderRadius:999,fontSize:"1rem",cursor:"pointer",fontWeight:800},children:["← ",t==="bm"?"Kembali":"Back"]})]})]})]})]})}const y=p===_,k=p===z,Fe=p===D,Ae=`ms-card${y?" correct":""}${k?" wrong":""}`,Be=k&&b>=C&&l?.type==="bertumpu";return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:oe}),e.jsxs("div",{className:"ms-root",children:[e.jsx(se,{onBack:m,language:t,title:X}),e.jsxs("div",{className:"ms-body",children:[e.jsxs("div",{className:"ms-stats",children:[e.jsxs("span",{className:"ms-pill",children:[w+1," / ",h]}),e.jsxs("span",{style:{display:"flex",gap:6},children:[e.jsxs("span",{className:"ms-pill chip heart",children:["❤️ ",de]}),e.jsxs("span",{className:"ms-pill chip gem",children:["💎 ",ue]}),e.jsxs("span",{className:"ms-pill chip star",children:["⭐ ",j]}),P>0&&e.jsxs("span",{className:"ms-pill chip fire",children:["🔥 ",P]})]})]}),e.jsx("div",{className:"ms-bar-wrap",children:e.jsx("div",{className:"ms-bar-fill",style:{width:`${w/h*100}%`}})}),e.jsxs("div",{className:"ms-stage",children:[e.jsx("div",{className:Ae,children:l&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"ms-emoji",children:l.emoji}),e.jsx("div",{className:"ms-question",children:l.question}),Be&&e.jsxs("div",{className:"ms-answer",children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"#B58800"},children:t==="bm"?"Jawapan: ":"Answer: "}),e.jsx("span",{children:l.answer})]})]})}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"0.5rem",minHeight:"72px",justifyContent:"center"},children:[Fe&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"ms-mic-wrap",children:[e.jsx("div",{className:"ms-mic-ring"}),e.jsx("div",{className:"ms-mic-ring2"}),e.jsx("div",{className:"ms-mic-core",children:"🎤"})]}),e.jsx("p",{className:"ms-status live",children:t==="bm"?"Jawab sekarang...":"Answer now..."})]}),p===c&&A&&e.jsx("p",{className:"ms-status",style:{color:"#D9610B",maxWidth:340},children:E==="perm"?t==="bm"?'Mikrofon tidak dibenarkan. Tekan "Saya dah jawab ✅" untuk teruskan.':`Mic not allowed. Tap "I've answered ✅" to continue.`:E==="net"?t==="bm"?'Tiada sambungan internet. Tekan "Saya dah jawab ✅" untuk teruskan.':`No internet. Tap "I've answered ✅" to continue.`:t==="bm"?'Mikrofon tidak tersedia. Tekan "Saya dah jawab ✅" untuk teruskan.':`Mic not available. Tap "I've answered ✅" to continue.`}),p===c&&!A&&E==="nospeech"&&e.jsx("p",{className:"ms-status",style:{color:"#D9610B"},children:t==="bm"?"Tak dengar suara. Cuba lagi! 🎤":"Didn't hear you. Try again! 🎤"}),p===c&&!A&&!E&&e.jsxs("div",{style:{width:"100%",maxWidth:400,display:"flex",flexDirection:"column",alignItems:"center",gap:"0.5rem"},children:[b>0&&e.jsx("p",{className:"ms-status",style:{color:"#D9610B",fontSize:"0.8rem"},children:t==="bm"?`Cuba ${b+1}/${C}`:`Try ${b+1}/${C}`}),e.jsx("input",{className:"ms-type-input",value:S,disabled:y||k,onChange:s=>$(s.target.value),onKeyDown:s=>{s.key==="Enter"&&ee()},placeholder:t==="bm"?"Taip jawapan kamu di sini...":"Type your answer here...",autoFocus:!0})]}),k&&e.jsx("p",{className:"ms-status",style:{color:a.wrongDark},children:t==="bm"?"Cuba lagi nanti.":"Try the next one."}),J&&(y||k)&&e.jsxs("p",{className:"ms-status",style:{color:y?a.correctDark:a.wrongDark,maxWidth:320,wordBreak:"break-word"},children:['"',J,'"']})]}),(p===c||p===D||p===Re)&&e.jsxs("div",{className:"ms-icon-row",children:[e.jsx("button",{onClick:we,className:"ms-icon-btn",style:{borderColor:a.primary},title:t==="bm"?"Ulang soalan":"Repeat question",children:e.jsx(Te,{size:22,color:a.primary})}),l?.type==="bertumpu"&&e.jsx("button",{onClick:je,className:"ms-icon-btn",style:{borderColor:"#FFD9A8",fontSize:"1.4rem"},title:t==="bm"?"Bantuan":"Hint",children:"💡"}),e.jsx("button",{onClick:ve,className:"ms-icon-btn",style:{borderColor:"#E0E0E0"},title:t==="bm"?"Langkau":"Skip",children:e.jsx(Ee,{size:22,color:a.wrong})})]})]})]}),e.jsxs("div",{className:"ms-footer",children:[p===c&&A&&e.jsxs("button",{className:"ms-btn primary",onClick:ke,style:{flex:1},children:["✅ ",t==="bm"?"Saya dah jawab":"I've answered"]}),p===c&&!A&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"ms-mic-btn",onClick:()=>ye(),title:t==="bm"?"Bercakap":"Speak","aria-label":t==="bm"?"Bercakap":"Speak",children:"🎤"}),e.jsxs("button",{className:"ms-btn primary",onClick:ee,disabled:!S.trim(),style:{flex:1},children:["⌨️ ",t==="bm"?"Hantar":"Submit"]})]}),p===D&&e.jsxs("button",{className:"ms-btn secondary",onClick:()=>{o.stop(),u.current=!1,n(c)},children:["⏸ ",t==="bm"?"Berhenti":"Stop"]}),(y||k)&&e.jsxs("button",{className:"ms-btn primary",disabled:!0,style:{flex:1},children:[y?"✅":"❌"," ",t==="bm"?"Seterusnya...":"Next..."]})]}),e.jsx("style",{children:`
          @keyframes msPulseRing {
            0%   { transform: scale(0.8); opacity: 0.8; }
            100% { transform: scale(1.6); opacity: 0; }
          }
        `})]})]})}export{Ge as default};
