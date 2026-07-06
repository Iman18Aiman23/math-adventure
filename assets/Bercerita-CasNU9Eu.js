import{S as d,r as a,j as e,p as re}from"./index-YCInXYg5.js";import{B as se}from"./BMHeader-B5cOc9J_.js";import{c as ne}from"./confetti.module-oQXWb4Lk.js";import{u as Ce}from"./useTopicGamification-I1kCte-J.js";import{B as Ne}from"./BMNotaCard-Ltn-dADi.js";import{S as Te}from"./skip-forward-CWFoDEaO.js";import"./useGamification-g-vGaz2S.js";const ie="2-1-2a-bercerita",c="t1-ready",I="t1-listening",q="t1-correct",W="t1-wrong",J="result",Q=3,f=12,r={primary:"#FF9600",primaryDark:"#D47A00",correct:"#4CAF50",correctDark:"#388E3C",wrong:"#FF6B6B",wrongDark:"#D32F2F"},oe=`
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
    background: #FFFFFFCC; color: #9A5B10; border: 1.5px solid ${r.primary}44;
  }

  .bb-bar-wrap {
    flex-shrink: 0; width: 100%;
    background: #FFD9A8; border-radius: 999px;
    height: clamp(6px, 1.2vh, 9px); overflow: hidden;
    margin-bottom: clamp(16px, 2.4vh, 22px);
  }

  .bb-bar-fill {
    background: linear-gradient(90deg, ${r.primary}, #FFB347);
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
    box-shadow: 0 4px 0 ${r.primary}2e, 0 12px 26px -16px rgba(0,0,0,.2);
  }

  .bb-card.correct {
    background: #F0FFF0; border-color: ${r.correct};
    box-shadow: 0 6px 0 ${r.correctDark}, 0 8px 20px rgba(88,204,2,.12);
  }

  .bb-card.wrong {
    background: #FFF0F0; border-color: ${r.wrong};
    box-shadow: 0 6px 0 ${r.wrongDark}, 0 8px 20px rgba(255,50,50,.12);
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

  .bb-sentence {
    font-family: 'Baloo 2', sans-serif; font-weight: 700;
    font-size: clamp(22px, 4.8vh, 32px);
    line-height: 1.4;
    color: #1E293B;
  }

  .bb-story-title {
    font-size: clamp(13px, 2.2vh, 16px);
    color: #8A7860; font-weight: 600;
  }

  .bb-status {
    font-weight: 700; font-size: clamp(13px, 2.4vh, 15px);
    color: #8A7860; text-align: center; max-width: 300px;
    line-height: 1.5;
  }

  .bb-status.live {
    color: ${r.primary}; font-family: 'Baloo 2', sans-serif; font-weight: 800;
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
    background: linear-gradient(180deg, ${r.primary}cc, ${r.primary});
    box-shadow: 0 4px 0 ${r.primaryDark};
  }

  .bb-btn.secondary {
    color: #64748B; background: #F1F5F9;
    box-shadow: 0 4px 0 #CBD5E1;
  }

  .bb-btn.success {
    color: #fff;
    background: linear-gradient(180deg, #66BB6A, #4CAF50);
    box-shadow: 0 4px 0 #388E3C;
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
    border-radius: 50%; background: linear-gradient(180deg, ${r.primary}cc, ${r.primary});
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
`,P=[{id:"s1",emoji:"🌅",title:"Pagi Ali",sentences:["Ali bangun awal pagi.","Dia gosok gigi dan mandi.","Kemudian Ali naik bas ke sekolah."]},{id:"s2",emoji:"🐱",title:"Kucing Comel",sentences:["Seekor kucing duduk di atas pagar.","Kucing itu nampak seekor burung.","Burung itu terbang tinggi ke langit."]},{id:"s3",emoji:"🤝",title:"Menolong Kawan",sentences:["Rani nampak kawannya jatuh.","Dia membantu kawannya bangun.","Mereka berkawan baik semula."]},{id:"s4",emoji:"🛒",title:"Di Kedai",sentences:["Ibu dan Sara pergi ke kedai.","Mereka membeli roti dan susu.","Sara membantu ibu membawa beg."]}],ce=p=>p.toLowerCase().replace(/[.,!?]/g,"").replace(/\s+/g," ").trim(),Be=new Set(["di","ke","dan","itu","dia","yang","ada","seekor","dengan","pada","ini","para","se","ku","mu"]),le=p=>ce(p).split(" ").filter(t=>t.length>2&&!Be.has(t));function Ee(p,t,N=[]){const g=y=>{const L=ce(y).split(" "),x=le(t);return x.length?x.filter(k=>L.some(T=>T.includes(k)||k.includes(T))).length/x.length>=.6:!1};return g(p)||N.some(y=>g(y.transcript))}function We({onBack:p,language:t="bm",topicComplete:N,onNextTopic:g}){const y=d.isMobile(),L=d.getUnsupportedReason(),{awardCorrect:x,awardWrong:V,completeTopic:k,hearts:T,gems:de}=Ce(ie),pe=a.useRef(!!L),[B,Z]=a.useState(0),[E,H]=a.useState(0),[l,i]=a.useState(c),[F,_]=a.useState(0),[K,D]=a.useState(0),[R,h]=a.useState(0),[ee,m]=a.useState(""),[A,u]=a.useState(null),[be,w]=a.useState(!1),[me,ue]=a.useState(!0),O=a.useRef(0),Y=a.useRef(0),G=a.useRef(0),b=a.useRef(!1),U=a.useRef(!1);a.useEffect(()=>{O.current=B},[B]),a.useEffect(()=>{Y.current=E},[E]),a.useEffect(()=>{G.current=R},[R]),a.useEffect(()=>()=>{d.stop(),d.stopSpeaking()},[]),a.useEffect(()=>{l===J&&!U.current&&(U.current=!0,k(F,f,70),F/f*100>=70&&N?.(ie))},[l,F,k,N]);const X=t==="bm"?"Bercerita (Baca Kuat)":"Read Aloud",j=pe.current||be,M=a.useCallback(s=>d.speak(s,"ms"),[]),$=P[B]??null,v=$?$.sentences[E]:"",te=B*3+E,S=a.useCallback(()=>{const s=O.current,o=Y.current,n=P[s];n&&(o+1<n.sentences.length?(H(o+1),h(0),m(""),u(null),w(!1),i(c)):s+1<P.length?(Z(s+1),H(0),h(0),m(""),u(null),w(!1),i(c)):i(J))},[]),xe=()=>{re("correct"),x(),ne({particleCount:40,spread:60,origin:{y:.6},scalar:.8}),_(o=>o+1),D(o=>{const n=o+1;return n%5===0&&(re("streak"),ne({particleCount:150,spread:100,origin:{y:.5}})),n}),h(0),i(q);const s=["Bagus!","Hebat!","Pandai!","Bijak!","Cemerlang!"];M(s[Math.floor(Math.random()*s.length)]),setTimeout(()=>S(),1500)},he=()=>{V(),D(0);const s=G.current+1;h(s),s>=Q?(i(W),v&&M(v),setTimeout(()=>S(),2400)):(i(W),m(""),setTimeout(()=>i(c),1700))},fe=()=>{if(!d.isSupported()||b.current)return;b.current=!0,u(null),m(""),i(I);const s=P[O.current]?.sentences[Y.current]||"",o=le(s);d.listen("ms-MY",(n,ae,ve)=>{b.current=!1;const Se=Ee(n,s,ve||[]);m(n),Se?xe():he()},n=>{if(b.current=!1,n==="not-allowed"||n==="service-not-allowed"||n==="audio-capture"){u("perm"),w(!0),i(c);return}if(n==="network"){u("net"),w(!0),i(c);return}G.current<Q?(u("nospeech"),h(ae=>ae+1),i(c)):(i(W),m(""),setTimeout(()=>S(),2e3))},{retries:y?2:1,grammarWords:o})},ge=()=>{x(),_(o=>o+1),D(o=>o+1),i(q);const s=["Bagus!","Hebat!","Pandai!","Bijak!","Cemerlang!"];M(s[Math.floor(Math.random()*s.length)]),setTimeout(()=>S(),1200)},ye=()=>{v&&(d.stop(),d.stopSpeaking(),b.current=!1,M(v))},ke=()=>{d.stop(),d.stopSpeaking(),b.current=!1,S()},Fe=()=>{d.stop(),d.stopSpeaking(),b.current=!1,U.current=!1,Z(0),H(0),i(c),_(0),D(0),h(0),m(""),u(null),w(!1)};if(me)return e.jsx(Ne,{language:t,accentColor:r.primary,topicTitle:X,definition:t==="bm"?"Bercerita bermaksud membaca atau menyampaikan cerita dengan kuat dan jelas. Baca ayat demi ayat mengikut susunan cerita.":"Storytelling means reading or telling a story aloud, clearly. Read sentence by sentence, following the story order.",examples:t==="bm"?['"Ali bangun awal pagi."','"Dia gosok gigi dan mandi."']:['"Ali woke up early in the morning."','"He brushed his teeth and showered."'],conclusion:t==="bm"?"➜ Murid bercerita dengan kuat dan jelas.":"➜ The pupil tells the story aloud and clearly.",onStart:()=>ue(!1),onBack:p});if(l===J){const s=F,o=s/f*100,n=o>=70;return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:oe}),e.jsxs("div",{className:"bb-root",children:[e.jsx(se,{onBack:p,language:t,title:X}),e.jsxs("div",{className:"bb-center",children:[e.jsx("div",{style:{fontSize:"clamp(56px, 12vh, 90px)",lineHeight:1},children:n?"🏆":"💪"}),e.jsx("h2",{style:{fontFamily:"'Baloo 2', sans-serif",color:n?r.primary:"#888",fontSize:"clamp(24px, 5vh, 36px)",fontWeight:800,margin:0},children:n?t==="bm"?"Tahniah! Lulus! 🎉":"Well Done! Passed! 🎉":t==="bm"?"Cuba Lagi!":"Try Again!"}),e.jsxs("p",{style:{fontSize:"clamp(16px, 3vh, 21px)",color:"#555",fontWeight:600,margin:"0.6rem 0 0.2rem"},children:[t==="bm"?"Markah: ":"Score: ",e.jsx("strong",{children:s}),"/",f,e.jsxs("span",{style:{color:"#999",fontSize:"0.85rem"},children:[" (",Math.round(o),"%)"]})]}),n&&e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.6rem",background:"#FFF6D6",borderRadius:999,padding:"0.5rem 1.2rem",border:"1.5px solid #FFE08A",marginBottom:"clamp(8px, 1.6vh, 16px)"},children:[e.jsx("span",{style:{fontSize:"1.1rem"},children:"🔥"}),e.jsxs("span",{style:{fontWeight:800,fontFamily:"'Baloo 2', sans-serif",color:"#B58800",fontSize:"clamp(13px, 2.4vh, 16px)"},children:[t==="bm"?"Streak terbaik:":"Best streak:"," ",K]})]}),e.jsxs("div",{style:{display:"flex",gap:"0.8rem",flexWrap:"wrap",justifyContent:"center"},children:[n&&g&&e.jsx("button",{onClick:g,style:{fontFamily:"'Baloo 2', sans-serif",padding:"0.8rem 1.5rem",background:`linear-gradient(180deg, ${r.primary}cc, ${r.primary})`,color:"#fff",border:"none",borderRadius:999,fontSize:"1rem",cursor:"pointer",fontWeight:800,boxShadow:`0 4px 0 ${r.primaryDark}`},children:t==="bm"?"Topik Seterusnya →":"Next Topic →"}),e.jsxs("button",{onClick:Fe,style:{fontFamily:"'Baloo 2', sans-serif",padding:"0.8rem 1.5rem",background:"#fff",color:"#475569",border:"2px solid #E2E8F0",borderRadius:999,fontSize:"1rem",cursor:"pointer",fontWeight:800},children:["🔄 ",t==="bm"?"Cuba Lagi":"Try Again"]}),e.jsxs("button",{onClick:p,style:{fontFamily:"'Baloo 2', sans-serif",padding:"0.8rem 1.5rem",background:"#F1F5F9",color:"#475569",border:"2px solid #E2E8F0",borderRadius:999,fontSize:"1rem",cursor:"pointer",fontWeight:800},children:["← ",t==="bm"?"Kembali":"Back"]})]})]})]})]})}const C=l===q,z=l===W,we=l===I,je=`bb-card${C?" correct":""}${z?" wrong":""}`;return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:oe}),e.jsxs("div",{className:"bb-root",children:[e.jsx(se,{onBack:p,language:t,title:X}),e.jsxs("div",{className:"bb-body",children:[e.jsxs("div",{className:"bb-stats",children:[e.jsxs("span",{className:"bb-pill",children:[te+1," / ",f]}),e.jsxs("span",{style:{display:"flex",gap:6},children:[e.jsxs("span",{className:"bb-pill",style:{background:"#FFE9EC",color:"#E11D48",borderColor:"#FCA5B4"},children:["❤️ ",T]}),e.jsxs("span",{className:"bb-pill",style:{background:"#E0F2FE",color:"#0369A1",borderColor:"#7DD3FC"},children:["💎 ",de]}),e.jsxs("span",{className:"bb-pill",style:{background:"#FFEAD0",color:"#D9610B",borderColor:"#FFC081"},children:["⭐ ",F]}),K>0&&e.jsxs("span",{className:"bb-pill",style:{background:"#FFF6D6",color:"#B58800",borderColor:"#FFE08A"},children:["🔥 ",K]})]})]}),e.jsx("div",{className:"bb-bar-wrap",children:e.jsx("div",{className:"bb-bar-fill",style:{width:`${te/f*100}%`}})}),e.jsxs("div",{className:"bb-stage",children:[e.jsxs("div",{className:je,children:[e.jsx("div",{className:"bb-emoji",children:$?.emoji}),e.jsx("div",{className:"bb-story-title",children:$?.title}),e.jsx("div",{className:"bb-sentence",children:v})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"0.5rem",minHeight:"72px",justifyContent:"center"},children:[we&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"bb-mic-wrap",children:[e.jsx("div",{className:"bb-mic-ring"}),e.jsx("div",{className:"bb-mic-ring2"}),e.jsx("div",{className:"bb-mic-core",children:"🎤"})]}),e.jsx("p",{className:"bb-status live",children:t==="bm"?"Baca dengan kuat...":"Read aloud..."})]}),l===c&&j&&e.jsx("p",{className:"bb-status",style:{color:"#D9610B",maxWidth:340},children:A==="perm"?t==="bm"?'Mikrofon tidak dibenarkan. Tekan "Saya dah baca ✅" untuk teruskan.':`Mic not allowed. Tap "I've read ✅" to continue.`:A==="net"?t==="bm"?'Tiada sambungan internet. Tekan "Saya dah baca ✅" untuk teruskan.':`No internet. Tap "I've read ✅" to continue.`:t==="bm"?'Mikrofon tidak tersedia. Tekan "Saya dah baca ✅" untuk teruskan.':`Mic not available. Tap "I've read ✅" to continue.`}),l===c&&!j&&A==="nospeech"&&e.jsx("p",{className:"bb-status",style:{color:"#D9610B"},children:t==="bm"?"Tak dengar suara. Cuba lagi! 🎤":"Didn't hear you. Try again! 🎤"}),l===c&&!j&&!A&&e.jsxs("p",{className:"bb-status",children:[t==="bm"?"Baca ayat di atas, kemudian tekan 🎤":"Read the sentence, then tap 🎤",R>0&&` · ${t==="bm"?"Cuba":"Try"} ${R+1}/${Q}`]}),z&&e.jsx("p",{className:"bb-status",style:{color:r.wrongDark},children:t==="bm"?"Cuba lagi nanti.":"Try the next one."}),ee&&(C||z)&&e.jsxs("p",{className:"bb-status",style:{color:C?r.correctDark:r.wrongDark,maxWidth:320,wordBreak:"break-word"},children:['"',ee,'"']})]}),(l===c||l===I)&&e.jsxs("div",{className:"bb-icon-row",children:[e.jsx("button",{onClick:ye,className:"bb-icon-btn",style:{borderColor:r.primary},title:t==="bm"?"Dengar sebutan":"Hear pronunciation",children:"🔊"}),e.jsx("button",{onClick:ke,className:"bb-icon-btn",style:{borderColor:"#E0E0E0"},title:t==="bm"?"Langkau":"Skip",children:e.jsx(Te,{size:22,color:r.wrong})})]})]})]}),e.jsxs("div",{className:"bb-footer",children:[l===c&&j&&e.jsxs("button",{className:"bb-btn primary",onClick:ge,style:{flex:1},children:["✅ ",t==="bm"?"Saya dah baca":"I've read it"]}),l===c&&!j&&e.jsxs("button",{className:"bb-btn primary",onClick:()=>fe(),children:["🎤 ",t==="bm"?"Baca Sekarang":"Read Now"]}),l===I&&e.jsxs("button",{className:"bb-btn secondary",onClick:()=>{d.stop(),b.current=!1,i(c)},children:["⏸ ",t==="bm"?"Berhenti":"Stop"]}),(C||z)&&e.jsxs("button",{className:"bb-btn primary",disabled:!0,style:{flex:1},children:[C?"✅":"❌"," ",t==="bm"?"Seterusnya...":"Next..."]})]}),e.jsx("style",{children:`
          @keyframes bbPulseRing {
            0%   { transform: scale(0.8); opacity: 0.8; }
            100% { transform: scale(1.6); opacity: 0; }
          }
        `})]})]})}export{We as default};
