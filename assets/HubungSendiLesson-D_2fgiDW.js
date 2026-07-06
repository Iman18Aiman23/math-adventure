import{r as i,e as W,p as S,S as Y,j as e}from"./index-YCInXYg5.js";import{c as $}from"./confetti.module-oQXWb4Lk.js";import{B as Q}from"./BMStdShell-CNw-aSVc.js";import{B as X}from"./BMStdComplete-CuurCp65.js";import{u as G}from"./useTopicGamification-I1kCte-J.js";import{V as U}from"./volume-2-B9qgBXCR.js";import{R as q}from"./refresh-cw-J9zlOc9a.js";import"./BMHeader-B5cOc9J_.js";import"./useGamification-g-vGaz2S.js";import"./Celebration-BzsEi41U.js";const C="1-5-7-hubung-sendi",R=70;function b(u){const n=[...u];for(let p=n.length-1;p>0;p--){const _=Math.floor(Math.random()*(p+1));[n[p],n[_]]=[n[_],n[p]]}return n}const J=[{sentence_bm:"Saya suka membaca _____ melukis.",sentence_eng:"I like reading _____ drawing.",image:"📚",options:["dan","tetapi","atau","ke"],answer:"dan",type:"Kata Hubung",explanation_bm:'"dan" menghubungkan dua aktiviti yang disukai.',explanation_eng:'"dan" (and) connects two liked activities.'},{sentence_bm:"Ahmad suka bola, _____ Siti suka melukis.",sentence_eng:"Ahmad likes football, _____ Siti likes drawing.",image:"⚽",options:["dan","tetapi","atau","di"],answer:"tetapi",type:"Kata Hubung",explanation_bm:'"tetapi" menunjukkan perbezaan antara dua perkara.',explanation_eng:'"tetapi" (but) shows a contrast.'},{sentence_bm:"Awak mahu minum air _____ jus?",sentence_eng:"Do you want to drink water _____ juice?",image:"🥤",options:["dan","tetapi","atau","dari"],answer:"atau",type:"Kata Hubung",explanation_bm:'"atau" memberikan pilihan antara dua benda.',explanation_eng:'"atau" (or) gives a choice.'},{sentence_bm:"Ibu pergi _____ pasar pagi ini.",sentence_eng:"Mother went _____ the market this morning.",image:"🛒",options:["di","ke","dari","pada"],answer:"ke",type:"Kata Sendi Nama",explanation_bm:'"ke" menunjukkan arah pergerakan menuju tempat.',explanation_eng:'"ke" (to) shows movement towards a place.'},{sentence_bm:"Adik bermain _____ taman setiap petang.",sentence_eng:"Younger sibling plays _____ the park every evening.",image:"🌳",options:["di","ke","dari","pada"],answer:"di",type:"Kata Sendi Nama",explanation_bm:'"di" menunjukkan tempat sesuatu berlaku.',explanation_eng:'"di" (at/in) shows where something happens.'},{sentence_bm:"Ayah baru pulang _____ pejabat.",sentence_eng:"Father just came back _____ the office.",image:"🏢",options:["di","ke","dari","pada"],answer:"dari",type:"Kata Sendi Nama",explanation_bm:'"dari" menunjukkan tempat asal pergerakan.',explanation_eng:'"dari" (from) shows the starting point.'},{sentence_bm:"Saya suka belajar _____ bermain.",sentence_eng:"I like studying _____ playing.",image:"✏️",options:["dan","tetapi","atau","ke"],answer:"dan",type:"Kata Hubung",explanation_bm:'"dan" menghubungkan dua aktiviti yang disukai.',explanation_eng:'"dan" (and) connects two liked activities.'},{sentence_bm:"Buku itu ada _____ atas meja.",sentence_eng:"The book is _____ the top of the table.",image:"📕",options:["di","ke","dari","pada"],answer:"di",type:"Kata Sendi Nama",explanation_bm:'"di" menunjukkan tempat sesuatu benda berada.',explanation_eng:'"di" (on/at) shows where an object is.'}],Z=[{word:"berlari",image:"🏃",example_bm:"Murid itu berlari laju.",example_eng:"The student runs fast.",answer:"Kata Kerja",explanation_bm:'"berlari" ialah perbuatan — Kata Kerja.',explanation_eng:'"berlari" is an action — Verb.'},{word:"cantik",image:"🌸",example_bm:"Bunga itu cantik.",example_eng:"The flower is beautiful.",answer:"Kata Adjektif",explanation_bm:'"cantik" menerangkan sifat — Kata Adjektif.',explanation_eng:'"cantik" describes a quality — Adjective.'},{word:"kucing",image:"🐱",example_bm:"Kucing itu comel.",example_eng:"The cat is cute.",answer:"Kata Nama Am",explanation_bm:'"kucing" ialah nama haiwan yang umum.',explanation_eng:'"kucing" is a common noun.'},{word:"Malaysia",image:"🇲🇾",example_bm:"Saya tinggal di Malaysia.",example_eng:"I live in Malaysia.",answer:"Kata Nama Khas",explanation_bm:'"Malaysia" ialah nama khas sebuah negara.',explanation_eng:'"Malaysia" is a proper noun.'}],ee=["Kata Nama Am","Kata Nama Khas","Kata Kerja","Kata Adjektif"],H={dan:{bg:"#E3F2FD",border:"#1976D2",text:"#1565C0"},tetapi:{bg:"#FFF3E0",border:"#F57C00",text:"#E65100"},atau:{bg:"#E8F5E9",border:"#388E3C",text:"#2E7D32"},di:{bg:"#F3E5F5",border:"#7B1FA2",text:"#6A1B9A"},ke:{bg:"#FCE4EC",border:"#C2185B",text:"#AD1457"},dari:{bg:"#E0F2F1",border:"#00796B",text:"#004D40"},pada:{bg:"#FFF8E1",border:"#F57F17",text:"#E65100"}},ae={"Kata Hubung":{bg:"#E3F2FD",color:"#1565C0",border:"#1976D2"},"Kata Sendi Nama":{bg:"#E8F5E9",color:"#2E7D32",border:"#388E3C"}},s={primary:"#159E96",primaryDark:"#0B5E5A",correct:"#4CAF50",wrong:"#FF6B6B"};function he({onBack:u,language:n="bm",topicComplete:p,onNextTopic:_}){const[m,A]=i.useState(0),[f,N]=i.useState(0),[g,k]=i.useState(null),[o,w]=i.useState(!1),[y,K]=i.useState(!1),[D,B]=i.useState(!1),l=i.useMemo(()=>{const t=b(J).map(r=>({...r,options:b(r.options)})),c=b(Z).map(r=>({...r,options:b(ee)}));return b([...t,...c])},[]),a=l[m],d=a?.sentence_bm,v=g===a.answer,j=(l.length>0?Math.round(f/l.length*100):0)>=R;i.useEffect(()=>{if(y&&j&&!D){const t=setTimeout(()=>{B(!0),p?.(C)},0);return()=>clearTimeout(t)}},[y,j,D,p]);const{awardCorrect:z,awardWrong:T}=G(C),P=i.useCallback(t=>{o||(W(),k(t),t===a.answer?(S("correct"),N(c=>c+1),z(),$({particleCount:40,spread:60,origin:{y:.6},scalar:.8})):(S("wrong"),T()),w(!0))},[o,a.answer,z,T]),O=i.useCallback(()=>{m<l.length-1?(A(t=>t+1),k(null),w(!1)):(S("streak"),$({particleCount:150,spread:100,origin:{y:.5}}),K(!0))},[m,l.length]),I=i.useCallback(()=>{A(0),N(0),k(null),w(!1),K(!1),B(!1)},[]),L=i.useCallback(()=>{d&&Y.speak((n==="bm"?a.sentence_bm:a.sentence_eng).replace("_____",a.answer),"ms-MY",{rate:.88})},[a,n,d]),M=n==="bm"?"Kata Hubung & Sendi Nama":"Conjunctions & Prepositions";if(y)return e.jsx(X,{onBack:u,language:n,title:M,topicId:C,score:f,total:l.length,passPct:R,accentColor:s.primary,onRestart:I,onNextTopic:j?_:null});const V=d?(n==="bm"?a.sentence_bm:a.sentence_eng).split("_____"):[],E=d?ae[a.type]||{bg:"#F5F5F5",color:"#555",border:"#CCC"}:null;return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        .hs-card {
          flex-shrink: 0; width: 100%;
          display: flex; flex-direction: column; align-items: center;
          gap: clamp(3px, 0.6vh, 8px);
          text-align: center;
          background: #fff;
          border: 2.5px solid ${s.primary}55;
          border-radius: clamp(14px, 2.2vh, 22px);
          padding: clamp(8px, 1.4vh, 16px) clamp(12px, 2.5vw, 18px) clamp(10px, 1.6vh, 16px);
          box-shadow: 0 clamp(2px, 0.4vh, 4px) 0 ${s.primary}2e, 0 8px 20px -14px rgba(0,0,0,.15);
        }
        .hs-card-emoji { font-size: clamp(32px, 6vh, 52px); line-height: 1.1; user-select: none; }
        .hs-card-sentence {
          width: 100%;
          border-top: 2px dashed #E8F0EE;
          padding-top: clamp(5px, 0.8vh, 10px);
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(15px, 2.8vh, 22px);
          line-height: 1.3; color: #333;
        }
        .hs-card-blank {
          display: inline-block;
          min-width: 60px;
          border-bottom: 3px solid ${s.primary};
          margin: 0 0.15rem;
          font-weight: 800;
          vertical-align: bottom;
          line-height: 1.5;
        }
        .hs-card-type {
          display: inline-block;
          border-radius: 999px;
          padding: 0.1rem 0.6rem;
          font-size: clamp(9px, 1.4vh, 12px);
          font-weight: 700;
          font-family: 'Baloo 2', sans-serif;
        }
        .hs-card-word {
          width: 100%;
          border-top: 2px dashed #E8F0EE;
          padding-top: clamp(5px, 0.8vh, 10px);
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(20px, 3.6vh, 30px);
          line-height: 1.2; color: ${s.primary};
        }
        .hs-card-example {
          width: 100%;
          font-size: clamp(12px, 1.8vh, 15px);
          color: #555; font-weight: 500;
          border-top: 1px dashed #E8F0EE;
          padding-top: clamp(4px, 0.6vh, 8px);
        }
        .hs-prompt { flex-shrink: 0; font-size: clamp(12px, 1.6vw, 15px); color: #888; font-weight: 600; }
        .hs-opts {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(5px, 0.8vh, 10px);
          width: 100%;
        }
        .hs-op {
          background: #fff;
          border: 2.5px solid ${s.primary}55;
          border-radius: clamp(10px, 1.4vw, 14px);
          cursor: pointer; font-weight: 800;
          font-size: clamp(13px, 2vw, 17px);
          padding: clamp(7px, 1vh, 12px);
          width: 100%; transition: all .12s;
          font-family: 'Baloo 2', sans-serif; color: #333;
        }
        .hs-op:hover { transform: scale(1.04); }
        .hs-op:disabled { cursor: default; transform: none; }
        .hs-feedback {
          padding: clamp(4px, 0.6vh, 8px) clamp(8px, 1vw, 14px);
          border-radius: clamp(8px, 1vw, 12px);
          text-align: center; font-weight: bold;
          font-size: clamp(11px, 1.4vh, 14px);
          width: 100%; box-sizing: border-box;
        }
        .hs-listen-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: clamp(10px, 1.4vh, 13px);
          border: none; border-radius: 8px;
          cursor: pointer;
          padding: clamp(3px, 0.5vh, 6px) clamp(8px, 1.2vw, 14px);
          display: inline-flex; align-items: center; gap: 4px;
          background: ${s.primary}; color: #fff;
        }
        .hs-listen-btn:disabled { background: #ccc; color: #999; cursor: not-allowed; }
        .hs-footer-btn {
          flex: 1; min-width: 0;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(13px, 2.2vh, 16px);
          border: none; border-radius: 12px; cursor: pointer;
          padding: clamp(8px, 1.4vh, 12px) 10px;
          transition: transform .1s ease, box-shadow .1s ease;
          display: flex; align-items: center; justify-content: center; gap: 5px;
        }
        .hs-footer-btn:active { transform: translateY(2px); }
        .hs-footer-btn.primary { background: linear-gradient(180deg, ${s.primary}cc, ${s.primary}); box-shadow: 0 3px 0 ${s.primaryDark}; color: #fff; }
        .hs-footer-btn.secondary { background: #fff; color: #64748B; border: 2px solid #E2E8F0; }
        @keyframes hs-pop { 0%{transform:scale(1)} 50%{transform:scale(1.06)} 100%{transform:scale(1)} }
        @keyframes hs-shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-3px)} 75%{transform:translateX(3px)} }
        @media (max-height:480px) { .hs-prompt{display:none} .hs-card-emoji{font-size:clamp(24px,4vh,36px)} }
      `}),e.jsxs(Q,{onBack:u,language:n,title:M,current:m,total:l.length,score:f,accentColor:s.primary,footer:o&&e.jsxs("div",{style:{display:"flex",gap:"clamp(8px, 2vw, 12px)",width:"100%"},children:[e.jsxs("button",{className:"hs-footer-btn secondary",onClick:I,children:[e.jsx(q,{size:16})," ",n==="bm"?"Semula":"Reset"]}),e.jsx("button",{className:"hs-footer-btn primary",onClick:O,children:m<l.length-1?n==="bm"?"Seterusnya →":"Next →":n==="bm"?"Selesai ✓":"Finish ✓"})]}),children:[e.jsxs("div",{className:"hs-card",children:[e.jsx("div",{className:"hs-card-emoji",children:a.image}),d?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"hs-card-type",style:{background:E.bg,color:E.color,border:`1.5px solid ${E.border}`},children:a.type}),e.jsx("div",{className:"hs-card-sentence",children:V.map((t,c,r)=>e.jsxs("span",{children:[t,c<r.length-1&&e.jsx("span",{className:"hs-card-blank",style:{color:o?s.primary:"transparent"},children:o?a.answer:"      "})]},c))}),e.jsxs("button",{className:"hs-listen-btn",disabled:!o,onClick:L,children:[e.jsx(U,{size:13}),n==="bm"?"Dengar":"Listen"]})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"hs-card-word",children:['"',a.word,'"']}),e.jsx("div",{className:"hs-card-example",children:n==="bm"?a.example_bm:a.example_eng}),e.jsx("div",{className:"hs-prompt",children:n==="bm"?`"${a.word}" ialah?`:`"${a.word}" is?`})]})]}),e.jsx("div",{className:"hs-opts",children:a.options.map((t,c)=>{let r="#fff",h=`${s.primary}55`,x="#333";if(o)t===a.answer?(r=s.correct,h="#388E3C",x="#fff"):t===g?(r=s.wrong,h="#D32F2F",x="#fff"):(r="#F5F5F5",h="#DDD",x="#AAA");else if(d&&H[t]){const F=H[t];r=F.bg,h=F.border,x=F.text}return e.jsx("button",{className:"hs-op",onClick:()=>P(t),disabled:o,style:{background:r,borderColor:h,color:x,animation:o&&t===a.answer?"hs-pop .35s cubic-bezier(.34,1.56,.64,1)":o&&t===g&&t!==a.answer?"hs-shake .3s ease":"none"},children:t},c)})}),o&&e.jsxs("div",{className:"hs-feedback",style:{background:v?"#D4EDDA":"#F8D7DA",color:v?"#155724":"#721C24"},children:[v?n==="bm"?"✅ Betul!":"✅ Correct!":n==="bm"?`❌ Jawapan: ${a.answer}`:`❌ Answer: ${a.answer}`,e.jsx("div",{style:{fontSize:"0.85rem",fontWeight:"normal",marginTop:4,opacity:.9},children:n==="bm"?a.explanation_bm:a.explanation_eng})]})]})]})}export{he as default};
