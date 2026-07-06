import{r as t,e as $,p as y,j as n}from"./index-YCInXYg5.js";import{c as B}from"./confetti.module-oQXWb4Lk.js";import{B as V}from"./BMStdShell-CNw-aSVc.js";import{B as O}from"./BMStdComplete-CuurCp65.js";import{u as P}from"./useTopicGamification-I1kCte-J.js";import{R as L}from"./refresh-cw-J9zlOc9a.js";import"./BMHeader-B5cOc9J_.js";import"./useGamification-g-vGaz2S.js";import"./Celebration-BzsEi41U.js";const K="1-5-6-kerja-adjektif",I=70;function x(b){const a=[...b];for(let s=a.length-1;s>0;s--){const f=Math.floor(Math.random()*(s+1));[a[s],a[f]]=[a[f],a[s]]}return a}const W=[{word:"berlari",image:"🏃",example_bm:"Murid itu berlari laju.",example_eng:"The student runs fast.",answer:"Kata Kerja",explanation_bm:'"berlari" ialah perbuatan — Kata Kerja',explanation_eng:'"berlari" is an action — Verb'},{word:"membaca",image:"📖",example_bm:"Saya suka membaca buku.",example_eng:"I like to read books.",answer:"Kata Kerja",explanation_bm:'"membaca" ialah perbuatan — Kata Kerja',explanation_eng:'"membaca" is an action — Verb'},{word:"memasak",image:"🍳",example_bm:"Ibu sedang memasak nasi.",example_eng:"Mother is cooking rice.",answer:"Kata Kerja",explanation_bm:'"memasak" ialah perbuatan — Kata Kerja',explanation_eng:'"memasak" is an action — Verb'},{word:"menulis",image:"✏️",example_bm:"Kakak menulis surat.",example_eng:"Older sister writes a letter.",answer:"Kata Kerja",explanation_bm:'"menulis" ialah perbuatan — Kata Kerja',explanation_eng:'"menulis" is an action — Verb'},{word:"melukis",image:"🎨",example_bm:"Adik suka melukis bunga.",example_eng:"Younger sibling likes to draw.",answer:"Kata Kerja",explanation_bm:'"melukis" ialah perbuatan — Kata Kerja',explanation_eng:'"melukis" is an action — Verb'},{word:"menyanyi",image:"🎤",example_bm:"Dia menyanyi dengan merdu.",example_eng:"She sings beautifully.",answer:"Kata Kerja",explanation_bm:'"menyanyi" ialah perbuatan — Kata Kerja',explanation_eng:'"menyanyi" is an action — Verb'},{word:"berenang",image:"🏊",example_bm:"Kami berenang di kolam.",example_eng:"We swim in the pool.",answer:"Kata Kerja",explanation_bm:'"berenang" ialah perbuatan — Kata Kerja',explanation_eng:'"berenang" is an action — Verb'},{word:"cantik",image:"🌸",example_bm:"Bunga itu cantik.",example_eng:"The flower is beautiful.",answer:"Kata Adjektif",explanation_bm:'"cantik" menerangkan sifat — Kata Adjektif',explanation_eng:'"cantik" describes a quality — Adjective'},{word:"besar",image:"🐘",example_bm:"Gajah itu sangat besar.",example_eng:"The elephant is very big.",answer:"Kata Adjektif",explanation_bm:'"besar" menerangkan saiz — Kata Adjektif',explanation_eng:'"besar" describes size — Adjective'},{word:"merah",image:"🔴",example_bm:"Baju saya berwarna merah.",example_eng:"My shirt is red.",answer:"Kata Adjektif",explanation_bm:'"merah" menerangkan warna — Kata Adjektif',explanation_eng:'"merah" describes colour — Adjective'}],Q=[{word:"kucing",image:"🐱",example_bm:"Kucing itu comel.",example_eng:"The cat is cute.",answer:"Kata Nama Am",explanation_bm:'"kucing" ialah nama benda/haiwan yang umum',explanation_eng:'"kucing" is a common noun'},{word:"Ahmad",image:"👦",example_bm:"Ahmad pergi ke sekolah.",example_eng:"Ahmad goes to school.",answer:"Kata Nama Khas",explanation_bm:'"Ahmad" ialah nama khas seseorang',explanation_eng:'"Ahmad" is a proper noun'},{word:"Malaysia",image:"🇲🇾",example_bm:"Saya tinggal di Malaysia.",example_eng:"I live in Malaysia.",answer:"Kata Nama Khas",explanation_bm:'"Malaysia" ialah nama khas sebuah negara',explanation_eng:'"Malaysia" is a proper noun'},{word:"sekolah",image:"🏫",example_bm:"Saya pergi ke sekolah.",example_eng:"I go to school.",answer:"Kata Nama Am",explanation_bm:'"sekolah" ialah nama tempat yang umum',explanation_eng:'"sekolah" is a common noun'}],M=["Kata Nama Am","Kata Nama Khas","Kata Kerja","Kata Adjektif"],X={"Kata Nama Am":{bg:"#E3F2FD",border:"#1976D2",text:"#1565C0"},"Kata Nama Khas":{bg:"#FFF3E0",border:"#F57C00",text:"#E65100"},"Kata Kerja":{bg:"#E8F5E9",border:"#388E3C",text:"#2E7D32"},"Kata Adjektif":{bg:"#F3E5F5",border:"#7B1FA2",text:"#6A1B9A"}},l={primary:"#159E96",primaryDark:"#0B5E5A"};function ra({onBack:b,language:a="bm",topicComplete:s,onNextTopic:f}){const[p,A]=t.useState(0),[h,v]=t.useState(0),[u,g]=t.useState(null),[o,k]=t.useState(!1),[w,C]=t.useState(!1),[S,E]=t.useState(!1),i=t.useMemo(()=>{const e=x(W).map(m=>({...m,options:x(M)})),c=x(Q).map(m=>({...m,options:x(M)}));return x([...e,...c])},[]),r=i[p],_=u===r.answer,j=(i.length>0?Math.round(h/i.length*100):0)>=I;t.useEffect(()=>{if(w&&j&&!S){const e=setTimeout(()=>{E(!0),s?.(K)},0);return()=>clearTimeout(e)}},[w,j,S,s]);const{awardCorrect:F,awardWrong:N}=P(K),z=t.useCallback(e=>{o||($(),g(e),e===r.answer?(y("correct"),v(c=>c+1),F(),B({particleCount:40,spread:60,origin:{y:.6},scalar:.8})):(y("wrong"),N()),k(!0))},[o,r.answer,F,N]),R=t.useCallback(()=>{p<i.length-1?(A(e=>e+1),g(null),k(!1)):(y("streak"),B({particleCount:150,spread:100,origin:{y:.5}}),C(!0))},[p,i.length]),D=t.useCallback(()=>{A(0),v(0),g(null),k(!1),C(!1),E(!1)},[]),T=a==="bm"?"Kata Kerja & Adjektif":"Verbs & Adjectives";return w?n.jsx(O,{onBack:b,language:a,title:T,topicId:K,score:h,total:i.length,passPct:I,accentColor:l.primary,onRestart:D,onNextTopic:j?f:null}):n.jsxs(n.Fragment,{children:[n.jsx("style",{children:`
        .ka-card {
          flex-shrink: 0; width: 100%;
          display: flex; flex-direction: column; align-items: center;
          gap: clamp(3px, 0.6vh, 8px);
          text-align: center;
          background: #fff;
          border: 2.5px solid ${l.primary}55;
          border-radius: clamp(14px, 2.2vh, 22px);
          padding: clamp(8px, 1.4vh, 16px) clamp(12px, 2.5vw, 18px) clamp(10px, 1.6vh, 16px);
          box-shadow: 0 clamp(2px, 0.4vh, 4px) 0 ${l.primary}2e, 0 8px 20px -14px rgba(0,0,0,.15);
        }
        .ka-card-emoji { font-size: clamp(32px, 6vh, 52px); line-height: 1.1; user-select: none; }
        .ka-card-example {
          width: 100%;
          border-top: 2px dashed #E8F0EE;
          padding-top: clamp(5px, 0.8vh, 10px);
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(15px, 2.8vh, 22px);
          line-height: 1.2; color: #333;
        }
        .ka-prompt { flex-shrink: 0; font-size: clamp(12px, 1.6vw, 15px); color: #888; font-weight: 600; }
        .ka-opts {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(5px, 0.8vh, 10px);
          width: 100%;
        }
        .ka-op {
          background: #fff;
          border: 2.5px solid ${l.primary}55;
          border-radius: clamp(10px, 1.4vw, 14px);
          cursor: pointer; font-weight: 800;
          font-size: clamp(12px, 2vw, 16px);
          padding: clamp(7px, 1vh, 12px);
          width: 100%; transition: all .12s;
          font-family: 'Baloo 2', sans-serif; color: #333;
        }
        .ka-op:hover { transform: scale(1.04); }
        .ka-op:disabled { cursor: default; transform: none; }
        .ka-feedback {
          padding: clamp(4px, 0.6vh, 8px) clamp(8px, 1vw, 14px);
          border-radius: clamp(8px, 1vw, 12px);
          text-align: center; font-weight: bold;
          font-size: clamp(11px, 1.4vh, 14px);
          width: 100%; box-sizing: border-box;
        }
        .ka-footer-btn {
          flex: 1; min-width: 0;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(13px, 2.2vh, 16px);
          border: none; border-radius: 12px; cursor: pointer;
          padding: clamp(8px, 1.4vh, 12px) 10px;
          transition: transform .1s ease, box-shadow .1s ease;
          display: flex; align-items: center; justify-content: center; gap: 5px;
        }
        .ka-footer-btn:active { transform: translateY(2px); }
        .ka-footer-btn.primary { background: linear-gradient(180deg, ${l.primary}cc, ${l.primary}); box-shadow: 0 3px 0 ${l.primaryDark}; color: #fff; }
        .ka-footer-btn.secondary { background: #fff; color: #64748B; border: 2px solid #E2E8F0; }
        @keyframes ka-pop { 0%{transform:scale(1)} 50%{transform:scale(1.06)} 100%{transform:scale(1)} }
        @keyframes ka-shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-3px)} 75%{transform:translateX(3px)} }
        @media (max-height:480px) { .ka-prompt{display:none} .ka-card-emoji{font-size:clamp(24px,4vh,36px)} }
      `}),n.jsxs(V,{onBack:b,language:a,title:T,current:p,total:i.length,score:h,accentColor:l.primary,footer:o&&n.jsxs("div",{style:{display:"flex",gap:"clamp(8px, 2vw, 12px)",width:"100%"},children:[n.jsxs("button",{className:"ka-footer-btn secondary",onClick:D,children:[n.jsx(L,{size:16})," ",a==="bm"?"Semula":"Reset"]}),n.jsx("button",{className:"ka-footer-btn primary",onClick:R,children:p<i.length-1?a==="bm"?"Seterusnya →":"Next →":a==="bm"?"Selesai ✓":"Finish ✓"})]}),children:[n.jsxs("div",{className:"ka-card",children:[n.jsx("div",{className:"ka-card-emoji",children:r.image}),n.jsx("div",{className:"ka-card-example",children:a==="bm"?r.example_bm:r.example_eng}),n.jsx("div",{className:"ka-prompt",children:a==="bm"?`"${r.word}" ialah?`:`"${r.word}" is?`})]}),n.jsx("div",{className:"ka-opts",children:r.options.map((e,c)=>{const m=X[e]||{bg:"#FFF",border:"#159E96",text:"#333"};let d={};return o?e===r.answer?d={background:"#4CAF50",borderColor:"#388E3C",color:"#fff"}:e===u?d={background:"#FF6B6B",borderColor:"#D32F2F",color:"#fff"}:d={background:"#F5F5F5",borderColor:"#DDD",color:"#AAA"}:d={background:m.bg,borderColor:m.border,color:m.text},n.jsx("button",{className:"ka-op",onClick:()=>z(e),disabled:o,style:{...d,animation:o&&e===r.answer?"ka-pop .35s cubic-bezier(.34,1.56,.64,1)":o&&e===u&&e!==r.answer?"ka-shake .3s ease":"none"},children:e},c)})}),o&&n.jsxs("div",{className:"ka-feedback",style:{background:_?"#D4EDDA":"#F8D7DA",color:_?"#155724":"#721C24"},children:[_?a==="bm"?"✅ Betul!":"✅ Correct!":a==="bm"?`❌ Jawapan: ${r.answer}`:`❌ Answer: ${r.answer}`,n.jsx("div",{style:{fontSize:"0.85rem",fontWeight:"normal",marginTop:4,opacity:.9},children:a==="bm"?r.explanation_bm:r.explanation_eng})]})]})]})}export{ra as default};
