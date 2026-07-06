import{r as o,e as V,p as F,S as H,j as a}from"./index-YCInXYg5.js";import{c as I}from"./confetti.module-oQXWb4Lk.js";import{B as Q}from"./BMStdShell-CNw-aSVc.js";import{B as X}from"./BMStdComplete-CuurCp65.js";import{u as Y}from"./useTopicGamification-I1kCte-J.js";import{V as U}from"./volume-2-B9qgBXCR.js";import{R as q}from"./refresh-cw-J9zlOc9a.js";import"./BMHeader-B5cOc9J_.js";import"./useGamification-g-vGaz2S.js";import"./Celebration-BzsEi41U.js";const B="1-5-8-tanya-ganti",W=70;function x(b){const n=[...b];for(let p=n.length-1;p>0;p--){const f=Math.floor(Math.random()*(p+1));[n[p],n[f]]=[n[f],n[p]]}return n}const J=[{sentence_bm:"_____ nama awak?",sentence_eng:"_____ is your name?",image:"👦",options:["Bila","Di mana","Mengapa","Siapa"],answer:"Siapa",type:"Kata Tanya",explanation_bm:'"Siapa" untuk bertanya tentang orang.',explanation_eng:'"Siapa" (Who) asks about a person.'},{sentence_bm:"_____ yang ada dalam beg awak?",sentence_eng:"_____ is inside your bag?",image:"🎒",options:["Siapa","Apa","Di mana","Mengapa"],answer:"Apa",type:"Kata Tanya",explanation_bm:'"Apa" untuk bertanya tentang benda.',explanation_eng:'"Apa" (What) asks about things.'},{sentence_bm:"_____ awak tinggal?",sentence_eng:"_____ do you live?",image:"🏠",options:["Siapa","Apa","Di mana","Bila"],answer:"Di mana",type:"Kata Tanya",explanation_bm:'"Di mana" untuk bertanya tentang tempat.',explanation_eng:'"Di mana" (Where) asks about a place.'},{sentence_bm:"_____ awak datang ke sekolah?",sentence_eng:"_____ do you come to school?",image:"📅",options:["Siapa","Di mana","Bila","Mengapa"],answer:"Bila",type:"Kata Tanya",explanation_bm:'"Bila" untuk bertanya tentang masa.',explanation_eng:'"Bila" (When) asks about time.'},{sentence_bm:"_____ awak menangis?",sentence_eng:"_____ are you crying?",image:"😢",options:["Apa","Di mana","Bila","Mengapa"],answer:"Mengapa",type:"Kata Tanya",explanation_bm:'"Mengapa" untuk bertanya tentang sebab.',explanation_eng:'"Mengapa" (Why) asks about reasons.'},{sentence_bm:"_____ guru kelas awak?",sentence_eng:"_____ is your class teacher?",image:"👩‍🏫",options:["Siapa","Apa","Bila","Mengapa"],answer:"Siapa",type:"Kata Tanya",explanation_bm:'"Siapa" untuk bertanya tentang orang.',explanation_eng:'"Siapa" (Who) asks about a person.'},{sentence_bm:"_____ yang awak suka makan?",sentence_eng:"_____ do you like to eat?",image:"🍱",options:["Siapa","Apa","Di mana","Bila"],answer:"Apa",type:"Kata Tanya",explanation_bm:'"Apa" untuk bertanya tentang benda.',explanation_eng:'"Apa" (What) asks about things.'},{sentence_bm:"_____ sekolah awak bermula?",sentence_eng:"_____ does your school start?",image:"⏰",options:["Siapa","Apa","Bila","Mengapa"],answer:"Bila",type:"Kata Tanya",explanation_bm:'"Bila" untuk bertanya tentang masa.',explanation_eng:'"Bila" (When) asks about time.'},{sentence_bm:"Hai, nama _____ Ali.",sentence_eng:"Hi, _____ name is Ali.",image:"👦",options:["Apa","Kenapa","Saya","Mereka"],answer:"Saya",type:"Kata Ganti Nama",explanation_bm:'"Saya" digunakan untuk diri sendiri.',explanation_eng:'"Saya" (I/My) refers to oneself.'},{sentence_bm:"Ahmad tidak datang. _____ demam.",sentence_eng:"Ahmad is not coming. _____ has a fever.",image:"🤒",options:["Saya","Kamu","Dia","Mereka"],answer:"Dia",type:"Kata Ganti Nama",explanation_bm:'"Dia" menggantikan nama Ahmad (orang ketiga).',explanation_eng:'"Dia" (He) replaces Ahmad (third person).'},{sentence_bm:"_____ semua bermain di padang.",sentence_eng:"_____ all play on the field.",image:"⚽",options:["Saya","Kamu","Dia","Mereka"],answer:"Mereka",type:"Kata Ganti Nama",explanation_bm:'"Mereka" untuk orang ramai (lebih dari seorang).',explanation_eng:'"Mereka" (They) is for a group of people.'}],Z=[{word:"berlari",image:"🏃",example_bm:"Murid itu berlari laju.",example_eng:"The student runs fast.",answer:"Kata Kerja",explanation_bm:'"berlari" ialah perbuatan — Kata Kerja.',explanation_eng:'"berlari" is an action — Verb.'},{word:"cantik",image:"🌸",example_bm:"Bunga itu cantik.",example_eng:"The flower is beautiful.",answer:"Kata Adjektif",explanation_bm:'"cantik" menerangkan sifat — Kata Adjektif.',explanation_eng:'"cantik" describes a quality — Adjective.'},{word:"kucing",image:"🐱",example_bm:"Kucing itu comel.",example_eng:"The cat is cute.",answer:"Kata Nama Am",explanation_bm:'"kucing" ialah nama haiwan yang umum.',explanation_eng:'"kucing" is a common noun.'},{word:"Malaysia",image:"🇲🇾",example_bm:"Saya tinggal di Malaysia.",example_eng:"I live in Malaysia.",answer:"Kata Nama Khas",explanation_bm:'"Malaysia" ialah nama khas sebuah negara.',explanation_eng:'"Malaysia" is a proper noun.'}],aa=["Kata Nama Am","Kata Nama Khas","Kata Kerja","Kata Adjektif"],R={Siapa:{bg:"#E3F2FD",border:"#1976D2",text:"#1565C0"},Apa:{bg:"#FFF3E0",border:"#F57C00",text:"#E65100"},"Di mana":{bg:"#E8F5E9",border:"#388E3C",text:"#2E7D32"},Bila:{bg:"#F3E5F5",border:"#7B1FA2",text:"#6A1B9A"},Mengapa:{bg:"#FCE4EC",border:"#C2185B",text:"#AD1457"},Saya:{bg:"#E0F2F1",border:"#00796B",text:"#004D40"},Kamu:{bg:"#F9FBE7",border:"#AFB42B",text:"#827717"},Dia:{bg:"#FBE9E7",border:"#D84315",text:"#BF360C"},Mereka:{bg:"#EDE7F6",border:"#4527A0",text:"#311B92"}},ea={"Kata Tanya":{bg:"#FFF3E0",color:"#E65100",border:"#F57C00"},"Kata Ganti Nama":{bg:"#E0F2F1",color:"#004D40",border:"#00796B"}},r={primary:"#159E96",primaryDark:"#0B5E5A",correct:"#4CAF50",wrong:"#FF6B6B"};function ga({onBack:b,language:n="bm",topicComplete:p,onNextTopic:f}){const[d,j]=o.useState(0),[h,D]=o.useState(0),[u,y]=o.useState(null),[i,w]=o.useState(!1),[k,C]=o.useState(!1),[K,M]=o.useState(!1),l=o.useMemo(()=>{const t=x(J).map(s=>({...s,options:x(s.options)})),c=x(Z).map(s=>({...s,options:x(aa)}));return x([...t,...c])},[]),e=l[d],m=e?.sentence_bm,S=u===e.answer,v=(l.length>0?Math.round(h/l.length*100):0)>=W;o.useEffect(()=>{if(k&&v&&!K){const t=setTimeout(()=>{M(!0),p?.(B)},0);return()=>clearTimeout(t)}},[k,v,K,p]);const{awardCorrect:N,awardWrong:T}=Y(B),G=o.useCallback(t=>{i||(V(),y(t),t===e.answer?(F("correct"),D(c=>c+1),N(),I({particleCount:40,spread:60,origin:{y:.6},scalar:.8})):(F("wrong"),T()),w(!0))},[i,e.answer,N,T]),P=o.useCallback(()=>{d<l.length-1?(j(t=>t+1),y(null),w(!1)):(F("streak"),I({particleCount:150,spread:100,origin:{y:.5}}),C(!0))},[d,l.length]),z=o.useCallback(()=>{j(0),D(0),y(null),w(!1),C(!1),M(!1)},[]),L=o.useCallback(()=>{m&&H.speak((n==="bm"?e.sentence_bm:e.sentence_eng).replace("_____",e.answer),"ms-MY",{rate:.88})},[e,n,m]),$=n==="bm"?"Kata Tanya & Ganti Nama":"Question Words & Pronouns";if(k)return a.jsx(X,{onBack:b,language:n,title:$,topicId:B,score:h,total:l.length,passPct:W,accentColor:r.primary,onRestart:z,onNextTopic:v?f:null});const O=m?(n==="bm"?e.sentence_bm:e.sentence_eng).split("_____"):[],A=m?ea[e.type]||{bg:"#F5F5F5",color:"#555",border:"#CCC"}:null;return a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
        .tg-card {
          flex-shrink: 0; width: 100%;
          display: flex; flex-direction: column; align-items: center;
          gap: clamp(3px, 0.6vh, 8px);
          text-align: center;
          background: #fff;
          border: 2.5px solid ${r.primary}55;
          border-radius: clamp(14px, 2.2vh, 22px);
          padding: clamp(8px, 1.4vh, 16px) clamp(12px, 2.5vw, 18px) clamp(10px, 1.6vh, 16px);
          box-shadow: 0 clamp(2px, 0.4vh, 4px) 0 ${r.primary}2e, 0 8px 20px -14px rgba(0,0,0,.15);
        }
        .tg-card-emoji { font-size: clamp(32px, 6vh, 52px); line-height: 1.1; user-select: none; }
        .tg-card-sentence {
          width: 100%;
          border-top: 2px dashed #E8F0EE;
          padding-top: clamp(5px, 0.8vh, 10px);
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(15px, 2.8vh, 22px);
          line-height: 1.3; color: #333;
        }
        .tg-card-blank {
          display: inline-block;
          min-width: 60px;
          border-bottom: 3px solid ${r.primary};
          margin: 0 0.15rem;
          font-weight: 800;
          vertical-align: bottom;
          line-height: 1.5;
        }
        .tg-card-type {
          display: inline-block;
          border-radius: 999px;
          padding: 0.1rem 0.6rem;
          font-size: clamp(9px, 1.4vh, 12px);
          font-weight: 700;
          font-family: 'Baloo 2', sans-serif;
        }
        .tg-card-word {
          width: 100%;
          border-top: 2px dashed #E8F0EE;
          padding-top: clamp(5px, 0.8vh, 10px);
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(20px, 3.6vh, 30px);
          line-height: 1.2; color: ${r.primary};
        }
        .tg-card-example {
          width: 100%;
          font-size: clamp(12px, 1.8vh, 15px);
          color: #555; font-weight: 500;
          border-top: 1px dashed #E8F0EE;
          padding-top: clamp(4px, 0.6vh, 8px);
        }
        .tg-prompt { flex-shrink: 0; font-size: clamp(12px, 1.6vw, 15px); color: #888; font-weight: 600; }
        .tg-opts {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(5px, 0.8vh, 10px);
          width: 100%;
        }
        .tg-op {
          background: #fff;
          border: 2.5px solid ${r.primary}55;
          border-radius: clamp(10px, 1.4vw, 14px);
          cursor: pointer; font-weight: 800;
          font-size: clamp(13px, 2vw, 17px);
          padding: clamp(7px, 1vh, 12px);
          width: 100%; transition: all .12s;
          font-family: 'Baloo 2', sans-serif; color: #333;
        }
        .tg-op:hover { transform: scale(1.04); }
        .tg-op:disabled { cursor: default; transform: none; }
        .tg-feedback {
          padding: clamp(4px, 0.6vh, 8px) clamp(8px, 1vw, 14px);
          border-radius: clamp(8px, 1vw, 12px);
          text-align: center; font-weight: bold;
          font-size: clamp(11px, 1.4vh, 14px);
          width: 100%; box-sizing: border-box;
        }
        .tg-listen-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: clamp(10px, 1.4vh, 13px);
          border: none; border-radius: 8px;
          cursor: pointer;
          padding: clamp(3px, 0.5vh, 6px) clamp(8px, 1.2vw, 14px);
          display: inline-flex; align-items: center; gap: 4px;
          background: ${r.primary}; color: #fff;
        }
        .tg-listen-btn:disabled { background: #ccc; color: #999; cursor: not-allowed; }
        .tg-footer-btn {
          flex: 1; min-width: 0;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(13px, 2.2vh, 16px);
          border: none; border-radius: 12px; cursor: pointer;
          padding: clamp(8px, 1.4vh, 12px) 10px;
          transition: transform .1s ease, box-shadow .1s ease;
          display: flex; align-items: center; justify-content: center; gap: 5px;
        }
        .tg-footer-btn:active { transform: translateY(2px); }
        .tg-footer-btn.primary { background: linear-gradient(180deg, ${r.primary}cc, ${r.primary}); box-shadow: 0 3px 0 ${r.primaryDark}; color: #fff; }
        .tg-footer-btn.secondary { background: #fff; color: #64748B; border: 2px solid #E2E8F0; }
        @keyframes tg-pop { 0%{transform:scale(1)} 50%{transform:scale(1.06)} 100%{transform:scale(1)} }
        @keyframes tg-shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-3px)} 75%{transform:translateX(3px)} }
        @media (max-height:480px) { .tg-prompt{display:none} .tg-card-emoji{font-size:clamp(24px,4vh,36px)} }
      `}),a.jsxs(Q,{onBack:b,language:n,title:$,current:d,total:l.length,score:h,accentColor:r.primary,footer:i&&a.jsxs("div",{style:{display:"flex",gap:"clamp(8px, 2vw, 12px)",width:"100%"},children:[a.jsxs("button",{className:"tg-footer-btn secondary",onClick:z,children:[a.jsx(q,{size:16})," ",n==="bm"?"Semula":"Reset"]}),a.jsx("button",{className:"tg-footer-btn primary",onClick:P,children:d<l.length-1?n==="bm"?"Seterusnya →":"Next →":n==="bm"?"Selesai ✓":"Finish ✓"})]}),children:[a.jsxs("div",{className:"tg-card",children:[a.jsx("div",{className:"tg-card-emoji",children:e.image}),m?a.jsxs(a.Fragment,{children:[a.jsx("span",{className:"tg-card-type",style:{background:A.bg,color:A.color,border:`1.5px solid ${A.border}`},children:e.type}),a.jsx("div",{className:"tg-card-sentence",children:O.map((t,c,s)=>a.jsxs("span",{children:[t,c<s.length-1&&a.jsx("span",{className:"tg-card-blank",style:{color:i?r.primary:"transparent"},children:i?e.answer:"      "})]},c))}),a.jsxs("button",{className:"tg-listen-btn",disabled:!i,onClick:L,children:[a.jsx(U,{size:13}),n==="bm"?"Dengar":"Listen"]})]}):a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"tg-card-word",children:['"',e.word,'"']}),a.jsx("div",{className:"tg-card-example",children:n==="bm"?e.example_bm:e.example_eng}),a.jsx("div",{className:"tg-prompt",children:n==="bm"?`"${e.word}" ialah?`:`"${e.word}" is?`})]})]}),a.jsx("div",{className:"tg-opts",children:e.options.map((t,c)=>{let s="#fff",g=`${r.primary}55`,_="#333";if(i)t===e.answer?(s=r.correct,g="#388E3C",_="#fff"):t===u?(s=r.wrong,g="#D32F2F",_="#fff"):(s="#F5F5F5",g="#DDD",_="#AAA");else if(m&&R[t]){const E=R[t];s=E.bg,g=E.border,_=E.text}return a.jsx("button",{className:"tg-op",onClick:()=>G(t),disabled:i,style:{background:s,borderColor:g,color:_,animation:i&&t===e.answer?"tg-pop .35s cubic-bezier(.34,1.56,.64,1)":i&&t===u&&t!==e.answer?"tg-shake .3s ease":"none"},children:t},c)})}),i&&a.jsxs("div",{className:"tg-feedback",style:{background:S?"#D4EDDA":"#F8D7DA",color:S?"#155724":"#721C24"},children:[S?n==="bm"?"✅ Betul!":"✅ Correct!":n==="bm"?`❌ Jawapan: ${e.answer}`:`❌ Answer: ${e.answer}`,a.jsx("div",{style:{fontSize:"0.85rem",fontWeight:"normal",marginTop:4,opacity:.9},children:n==="bm"?e.explanation_bm:e.explanation_eng})]})]})]})}export{ga as default};
