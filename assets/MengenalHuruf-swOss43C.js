import{r as w,B as A,j as t,S as l,p as P}from"./index-YCInXYg5.js";import{u as V,B as Y}from"./BMLessonQuizLayout-COWN8IiW.js";import{B as J}from"./BMHeader-B5cOc9J_.js";import{c as U}from"./confetti.module-oQXWb4Lk.js";import"./utils-Direv13U.js";import"./StatsBar-Dt4MeuCr.js";import"./useGamification-g-vGaz2S.js";const n="#E8821A",M=[{color:"#EF4444",tint:"#FEF2F2"},{color:"#F59E0B",tint:"#FFFBEB"},{color:"#10B981",tint:"#ECFDF5"},{color:"#3B82F6",tint:"#EFF6FF"},{color:"#8B5CF6",tint:"#F5F3FF"},{color:"#EC4899",tint:"#FDF2F8"},{color:"#14B8A6",tint:"#F0FDFA"}],S=o=>o.map((f,p)=>({...f,...M[p%M.length]})),N={vokal:{topicId:"1-1-1-mendengar-menyebut",title:{bm:"Mengenal Huruf Vokal",en:"Learn the Vowels"},heading:{bm:"Mari Belajar Huruf Vokal",en:"Let's Learn the Vowels"},watermark:"a e i o u",letters:S([{letter:"A",lower:"a",word:"ayam",emoji:"🐔",en:"Chicken",jawi:"ايم"},{letter:"E",lower:"e",word:"epal",emoji:"🍎",en:"Apple",jawi:"ايڤل"},{letter:"I",lower:"i",word:"ikan",emoji:"🐠",en:"Fish",jawi:"ايکن"},{letter:"O",lower:"o",word:"oren",emoji:"🍊",en:"Orange",jawi:"اورين"},{letter:"U",lower:"u",word:"ular",emoji:"🐍",en:"Snake",jawi:"اولر"}])},"konsonan-bj":{topicId:"1-1-3-konsonan-bj",title:{bm:"Konsonan B–J",en:"Consonants B–J"},heading:{bm:"Mari Belajar Konsonan B–J",en:"Let's Learn Consonants B–J"},watermark:"b c d f g h j",letters:S([{letter:"B",lower:"b",word:"bola",emoji:"⚽",en:"Ball",jawi:"بولا"},{letter:"C",lower:"c",word:"cawan",emoji:"🍵",en:"Cup",jawi:"چاوان"},{letter:"D",lower:"d",word:"dadu",emoji:"🎲",en:"Dice",jawi:"دادو"},{letter:"F",lower:"f",word:"foto",emoji:"📷",en:"Photo",jawi:"فوتو"},{letter:"G",lower:"g",word:"gajah",emoji:"🐘",en:"Elephant",jawi:"ڬاجه"},{letter:"H",lower:"h",word:"hujan",emoji:"🌧️",en:"Rain",jawi:"هوجن"},{letter:"J",lower:"j",word:"jam",emoji:"⌚",en:"Clock",jawi:"جم"}])},"konsonan-kr":{topicId:"1-1-4-konsonan-kr",title:{bm:"Konsonan K–R",en:"Consonants K–R"},heading:{bm:"Mari Belajar Konsonan K–R",en:"Let's Learn Consonants K–R"},watermark:"k l m n p q r",letters:S([{letter:"K",lower:"k",word:"kunci",emoji:"🔑",en:"Key",jawi:"کونچي"},{letter:"L",lower:"l",word:"lampu",emoji:"💡",en:"Lamp",jawi:"لمڤو"},{letter:"M",lower:"m",word:"madu",emoji:"🍯",en:"Honey",jawi:"مادو"},{letter:"N",lower:"n",word:"nasi",emoji:"🍚",en:"Rice",jawi:"ناسي"},{letter:"P",lower:"p",word:"pokok",emoji:"🌳",en:"Tree",jawi:"ڤوکوق"},{letter:"Q",lower:"q",word:"Quran",emoji:"📕",en:"Quran",jawi:"قرءان"},{letter:"R",lower:"r",word:"rumah",emoji:"🏠",en:"House",jawi:"رومه"}])},"konsonan-sz":{topicId:"1-1-5-konsonan-sz",title:{bm:"Konsonan S–Z",en:"Consonants S–Z"},heading:{bm:"Mari Belajar Konsonan S–Z",en:"Let's Learn Consonants S–Z"},watermark:"s t v w x y z",letters:S([{letter:"S",lower:"s",word:"susu",emoji:"🥛",en:"Milk",jawi:"سوسو"},{letter:"T",lower:"t",word:"topi",emoji:"🎩",en:"Hat",jawi:"توڤي"},{letter:"V",lower:"v",word:"van",emoji:"🚐",en:"Van",jawi:"ۏن"},{letter:"W",lower:"w",word:"wau",emoji:"🪁",en:"Kite",jawi:"واو"},{letter:"X",lower:"x",word:"x-ray",emoji:"🩻",en:"X-ray",jawi:"ايکس-راي"},{letter:"Y",lower:"y",word:"yoyo",emoji:"🪀",en:"Yo-yo",jawi:"يويو"},{letter:"Z",lower:"z",word:"zirafah",emoji:"🦒",en:"Giraffe",jawi:"زيرافه"}])}};function O({cfg:o,onBack:f,onStartQuiz:p,topicTitle:v,language:i}){const[m,g]=w.useState(null),d=w.useRef(null),[k,s]=w.useState({letter:null,status:null}),u=w.useRef(null),h=w.useRef(!1),j=l.isSupported();w.useEffect(()=>()=>{l.stopSpeaking(),l.stop(),clearTimeout(d.current),clearTimeout(u.current)},[]);const y=e=>{l.stopSpeaking(),clearTimeout(d.current),g(e.letter),l.speak(e.speak||e.word,"ms-MY",{rate:.7,pitch:1.2}),d.current=setTimeout(()=>g(null),1600)},R=e=>e.toLowerCase().replace(/[.,!?]/g,"").replace(/\s+/g," ").trim(),C=(e,r)=>{const a=R(e),L=(r.speak||r.word).toLowerCase();if(a.includes(L))return!0;const b=a.split(" ");return b.includes(r.lower.toLowerCase())||b.includes(r.letter.toLowerCase())},T=(e,r)=>{r.stopPropagation(),!(!j||h.current)&&(h.current=!0,l.stop(),l.stopSpeaking(),clearTimeout(d.current),clearTimeout(u.current),g(null),s({letter:e.letter,status:"listening"}),l.listen("ms-MY",(a,L,b)=>{h.current=!1;let B=C(a,e);!B&&b?.length>1&&(B=b.some(Q=>C(Q.transcript,e))),B&&(P("correct"),U({particleCount:40,spread:60,origin:{y:.6},scalar:.7})),s({letter:e.letter,status:B?"correct":"wrong"}),u.current=setTimeout(()=>s({letter:null,status:null}),1400)},a=>{if(h.current=!1,a==="not-allowed"||a==="service-not-allowed"){s({letter:null,status:null});return}s({letter:e.letter,status:"wrong"}),u.current=setTimeout(()=>s({letter:null,status:null}),1400)},{retries:l.isMobile()?2:1,grammarWords:[e.speak||e.word,e.lower,e.letter]}))},x=o.letters.length,c=x>6?4:3,E=c*2,K=Math.ceil(x/c),F=x%c,D=x-F;let $="";const z=[];if(F>0){const e=(E-F*2)/2+1;for(let r=0;r<F;r++){const a=`.mh-card:nth-child(${D+r+1})`;z.push(a),$+=`${a} { grid-column: ${e+r*2} / span 2; }
`}}const I=c===4?"clamp(26px, 8.5vh, 52px)":"clamp(38px, 11vh, 68px)",H=x>5?"clamp(32px, 11vh, 64px)":"clamp(42px, 13vh, 80px)";return t.jsxs(t.Fragment,{children:[t.jsx("style",{children:`
        .mh-learn-root {
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
          position: relative;
        }
        .mh-learn-root::before {
          content: '${o.watermark}';
          position: absolute; inset: auto 4% 2% auto;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(28px, 7vw, 70px); letter-spacing: 0.22em;
          color: ${n}; opacity: 0.07;
          pointer-events: none; user-select: none;
        }

        .mh-learn-body {
          flex: 1; min-height: 0; position: relative; z-index: 1;
          display: flex; flex-direction: column;
          align-items: center;
          width: 100%; max-width: 1024px;
          margin: 0 auto;
          padding: var(--sp-3) clamp(14px, 3.5vw, 32px) var(--sp-2);
        }
        .mh-learn-heading {
          flex-shrink: 0; text-align: center; width: 100%;
          margin-bottom: var(--sp-3);
        }
        .mh-step-chip {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(9px, 1.6vh, 12px); letter-spacing: 0.12em;
          color: #9A5B10;
          background: #FFFFFFCC;
          border: 1.5px solid ${n}44;
          border-radius: 999px;
          padding: clamp(3px, 0.7vh, 5px) clamp(10px, 2vw, 16px);
          margin-bottom: var(--sp-2);
        }
        .mh-learn-heading h1 {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(18px, min(5vw, 4.6vh), 30px);
          line-height: 1.15;
          color: #1E293B; margin: 0;
        }
        .mh-learn-heading p {
          font-size: clamp(11px, min(3vw, 2.2vh), 14px);
          font-weight: 500; color: #7C6A55; margin: var(--sp-1) 0 0;
        }
        .mh-cards-zone {
          flex: 1; min-height: 0; width: 100%;
          display: flex; align-items: center; justify-content: center;
        }
        .mh-cards {
          display: grid;
          grid-template-columns: repeat(${E}, 1fr);
          grid-template-rows: repeat(${K}, minmax(0, 1fr));
          gap: clamp(8px, 1.6vh, 14px) clamp(6px, 2vw, 14px);
          width: 100%; max-width: ${c===4?"540px":"460px"};
          height: 100%; max-height: 520px;
        }
        .mh-card {
          position: relative;
          grid-column: span 2;
          min-width: 0; min-height: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: clamp(2px, 1vh, 8px);
          padding: clamp(6px, 1.4vh, 14px) 4px;
          background: linear-gradient(180deg, var(--vt) 0%, #fff 72%);
          border: 2.5px solid var(--vc-border);
          border-radius: clamp(14px, 2.6vh, 22px);
          box-shadow: 0 clamp(3px, 0.6vh, 5px) 0 var(--vc-under), 0 10px 22px -14px rgba(0,0,0,.18);
          cursor: pointer;
          font-family: inherit;
          transition: transform .12s ease, box-shadow .12s ease, border-color .12s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .mh-mic-btn {
          position: absolute; top: clamp(2px, 0.6vh, 6px); right: clamp(2px, 0.6vh, 6px);
          width: clamp(20px, 3.8vh, 28px); height: clamp(20px, 3.8vh, 28px);
          border-radius: 50%; border: none;
          background: #FFFFFFE6;
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(10px, 1.8vh, 14px);
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0,0,0,.15);
          z-index: 2;
          -webkit-tap-highlight-color: transparent;
        }
        .mh-card.mic-listening { border-color: ${n}; box-shadow: 0 clamp(3px, 0.6vh, 5px) 0 var(--vc-under), 0 0 0 5px ${n}33; }
        .mh-card.mic-correct   { border-color: #10B981; box-shadow: 0 clamp(3px, 0.6vh, 5px) 0 #10B98144, 0 0 0 5px #10B98126; }
        .mh-card.mic-wrong     { border-color: #EF4444; box-shadow: 0 clamp(3px, 0.6vh, 5px) 0 #EF444444, 0 0 0 5px #EF444426; }
        ${$}
        @media (hover: hover) {
          .mh-card:hover { border-color: var(--vc); transform: translateY(-2px); }
        }
        .mh-card:active {
          transform: translateY(2px);
          box-shadow: 0 1px 0 var(--vc-under), 0 4px 10px -8px rgba(0,0,0,.18);
        }
        .mh-card.playing {
          border-color: var(--vc);
          box-shadow: 0 clamp(3px, 0.6vh, 5px) 0 var(--vc-under), 0 0 0 5px var(--vc-ring);
        }
        .mh-card-hero {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: ${I};
          line-height: 1; color: var(--vc);
          display: flex; align-items: baseline;
        }
        .mh-card-hero small {
          font-size: 0.58em; font-weight: 800;
          opacity: 0.5; margin-left: 3px;
        }
        .mh-card-word {
          font-size: ${c===4?"clamp(9px, 1.8vh, 13px)":"clamp(11px, 2.1vh, 15px)"};
          font-weight: 600;
          color: #8A7860;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          max-width: 100%;
        }
        .mh-card-en {
          font-size: ${c===4?"clamp(8px, 1.6vh, 12px)":"clamp(10px, 1.9vh, 13px)"};
          font-weight: 600;
          color: #B3A38B;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          max-width: 100%;
        }
        .mh-card-jawi {
          font-family: 'Amiri','Scheherazade New','Noto Naskh Arabic','Traditional Arabic',serif;
          font-size: ${c===4?"clamp(13px, 2.6vh, 20px)":"clamp(15px, 3vh, 23px)"};
          font-weight: 700;
          line-height: 1.35;
          color: #6B5B45;
          direction: rtl;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          max-width: 100%;
        }
        /* ── Wide screens: one row of all letters ── */
        @media (min-width: 680px) {
          .mh-cards {
            grid-template-columns: repeat(${x}, 1fr);
            grid-template-rows: minmax(0, 1fr);
            gap: clamp(8px, 1.4vw, 16px);
            max-width: ${x>5?"1000px":"880px"};
            max-height: min(48vh, 330px);
          }
          .mh-card${z.length?", "+z.join(", "):""} {
            grid-column: auto / span 1;
          }
          .mh-card {
            gap: clamp(4px, 1.2vh, 10px);
            padding: clamp(10px, 2vh, 18px) 6px;
          }
          .mh-card-hero { font-size: ${H}; }
          .mh-card-word { font-size: clamp(11px, 2vh, 15px); }
        }
        .mh-learn-cta {
          flex-shrink: 0; width: 100%; max-width: 420px;
          margin-top: var(--sp-3);
        }
        .mh-learn-cta-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, min(3.8vw, 2.6vh), 18px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(10px, 2vh, 14px) 28px;
          color: #fff; width: 100%;
          background: linear-gradient(180deg, ${n}cc, ${n});
          box-shadow: 0 4px 0 ${n}66, 0 12px 24px -12px ${n}90;
          transition: transform .12s ease, box-shadow .12s;
        }
        .mh-learn-cta-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 ${n}66; }
        .mh-learn-footer {
          flex-shrink: 0; text-align: center; position: relative; z-index: 1;
          padding: var(--sp-1) 16px clamp(6px, 1.2vh, 12px);
          font-size: 10px; font-weight: 500; color: #B49A7C;
        }
        @media (max-height: 520px) {
          .mh-learn-heading p, .mh-learn-footer, .mh-learn-root::before { display: none; }
          .mh-step-chip { margin-bottom: 4px; }
          .mh-learn-heading { margin-bottom: var(--sp-2); }
        }
      `}),t.jsxs("div",{className:"mh-learn-root",children:[t.jsx(J,{onBack:f,language:i,title:v}),t.jsxs("div",{className:"mh-learn-body",children:[t.jsxs("div",{className:"mh-learn-heading",children:[t.jsxs("div",{className:"mh-step-chip",children:["📖 ",i==="bm"?"LANGKAH 1 · BELAJAR DULU":"STEP 1 · LEARN FIRST"]}),t.jsx("h1",{children:i==="bm"?o.heading.bm:o.heading.en}),t.jsx("p",{children:i==="bm"?"Tekan kad untuk dengar bunyinya 🔊":"Tap a card to hear its sound 🔊"})]}),t.jsx("div",{className:"mh-cards-zone",children:t.jsx("div",{className:"mh-cards",children:o.letters.map(e=>{const r=k.letter===e.letter?k.status:null;return t.jsxs("div",{className:`mh-card${m===e.letter?" playing":""}${r?" mic-"+r:""}`,style:{"--vc":e.color,"--vt":e.tint,"--vc-border":e.color+"33","--vc-under":e.color+"2e","--vc-ring":e.color+"26"},role:"button",tabIndex:0,onClick:()=>y(e),onKeyDown:a=>{(a.key==="Enter"||a.key===" ")&&(a.preventDefault(),y(e))},"aria-label":`${i==="bm"?"Dengar bunyi":"Hear the sound"} ${e.letter}`,children:[t.jsxs("span",{className:"mh-card-hero",children:[e.letter,e.lower&&t.jsx("small",{children:e.lower})]}),t.jsxs("span",{className:"mh-card-word",children:[e.emoji," ",e.word]}),t.jsx("span",{className:"mh-card-en",children:e.en}),t.jsx("span",{className:"mh-card-jawi",children:e.jawi}),j&&t.jsx("button",{type:"button",className:"mh-mic-btn",onClick:a=>T(e,a),"aria-label":`${i==="bm"?"Ajuk Saya":"Repeat after me"}: ${e.word}`,children:r==="listening"?"🔴":r==="correct"?"✅":r==="wrong"?"❌":"🎤"})]},e.letter)})})}),t.jsx("div",{className:"mh-learn-cta",children:t.jsxs("button",{className:"mh-learn-cta-btn",onClick:p,children:["🎯 ",i==="bm"?"Sedia untuk Kuiz?":"Ready for Quiz?"]})})]}),t.jsxs("div",{className:"mh-learn-footer",children:["Bahasa Melayu KSSR · ",v]})]})]})}const Z={vokal:[],"konsonan-bj":["1-1-1-mendengar-menyebut"],"konsonan-kr":["1-1-1-mendengar-menyebut","1-1-3-konsonan-bj"],"konsonan-sz":["1-1-1-mendengar-menyebut","1-1-3-konsonan-bj","1-1-4-konsonan-kr"]};function re({group:o="vokal",onBack:f,language:p="bm",topicComplete:v,onNextTopic:i}){const m=N[o]||N.vokal,[g,d]=w.useState("learn"),k=A[m.topicId]||[],s=(Z[o]||[]).flatMap(y=>A[y]||[]),u=V(k,s,15),h=p==="bm"?m.title.bm:m.title.en,j=()=>{f?.()};return g==="learn"?t.jsx(O,{cfg:m,onBack:j,onStartQuiz:()=>d("quiz"),topicTitle:h,language:p}):t.jsx(Y,{onBack:j,topicId:m.topicId,topicComplete:v,onNextTopic:i,topicTitle:h,quiz:u,language:p,accentColor:n,onShowLearn:()=>d("learn")})}export{re as default};
