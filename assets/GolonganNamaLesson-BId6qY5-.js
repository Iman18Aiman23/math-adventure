import{r as t,e as z,p as y,j as n}from"./index-YCInXYg5.js";import{c as D}from"./confetti.module-oQXWb4Lk.js";import{B as $}from"./BMStdShell-CNw-aSVc.js";import{B as R}from"./BMStdComplete-CuurCp65.js";import{u as L}from"./useTopicGamification-I1kCte-J.js";import{R as O}from"./refresh-cw-J9zlOc9a.js";import"./BMHeader-B5cOc9J_.js";import"./useGamification-g-vGaz2S.js";import"./Celebration-BzsEi41U.js";const S="1-5-1-morfologi-kata",P=70;function M(c){const a=[...c];for(let r=a.length-1;r>0;r--){const d=Math.floor(Math.random()*(r+1));[a[r],a[d]]=[a[d],a[r]]}return a}const W=[{word:"kucing",image:"🐱",example_bm:"Kucing itu comel.",example_eng:"The cat is cute.",answer:"Kata Nama Am",explanation_bm:'"kucing" ialah nama benda/haiwan yang umum',explanation_eng:'"kucing" is a common noun'},{word:"sekolah",image:"🏫",example_bm:"Saya pergi ke sekolah.",example_eng:"I go to school.",answer:"Kata Nama Am",explanation_bm:'"sekolah" ialah nama tempat yang umum',explanation_eng:'"sekolah" is a common noun'},{word:"buku",image:"📚",example_bm:"Buku itu tebal.",example_eng:"The book is thick.",answer:"Kata Nama Am",explanation_bm:'"buku" ialah nama benda yang umum',explanation_eng:'"buku" is a common noun'},{word:"meja",image:"🪑",example_bm:"Meja itu bundar.",example_eng:"The table is round.",answer:"Kata Nama Am",explanation_bm:'"meja" ialah nama benda yang umum',explanation_eng:'"meja" is a common noun'},{word:"bola",image:"⚽",example_bm:"Bola itu merah.",example_eng:"The ball is red.",answer:"Kata Nama Am",explanation_bm:'"bola" ialah nama benda yang umum',explanation_eng:'"bola" is a common noun'},{word:"Ahmad",image:"👦",example_bm:"Ahmad pergi ke sekolah.",example_eng:"Ahmad goes to school.",answer:"Kata Nama Khas",explanation_bm:'"Ahmad" ialah nama khas seseorang',explanation_eng:'"Ahmad" is a proper noun'},{word:"Malaysia",image:"🇲🇾",example_bm:"Saya tinggal di Malaysia.",example_eng:"I live in Malaysia.",answer:"Kata Nama Khas",explanation_bm:'"Malaysia" ialah nama khas sebuah negara',explanation_eng:'"Malaysia" is a proper noun'},{word:"Siti",image:"👧",example_bm:"Siti suka membaca.",example_eng:"Siti likes to read.",answer:"Kata Nama Khas",explanation_bm:'"Siti" ialah nama khas seseorang',explanation_eng:'"Siti" is a proper noun'},{word:"Pulau Pinang",image:"🏝️",example_bm:"Pulau Pinang negeri yang indah.",example_eng:"Penang is a beautiful state.",answer:"Kata Nama Khas",explanation_bm:'"Pulau Pinang" ialah nama khas tempat',explanation_eng:'"Pulau Pinang" is a proper noun'},{word:"Cikgu Anita",image:"👩‍🏫",example_bm:"Cikgu Anita mengajar kami.",example_eng:"Teacher Anita teaches us.",answer:"Kata Nama Khas",explanation_bm:'"Cikgu Anita" ialah nama khas seseorang',explanation_eng:'"Cikgu Anita" is a proper noun'},{word:"Kuala Lumpur",image:"🏙️",example_bm:"Kuala Lumpur ibu kota Malaysia.",example_eng:"KL is the capital of Malaysia.",answer:"Kata Nama Khas",explanation_bm:'"Kuala Lumpur" ialah nama khas tempat',explanation_eng:'"Kuala Lumpur" is a proper noun'},{word:"Si Tom",image:"🐈",example_bm:"Si Tom kucing yang gemuk.",example_eng:"Tom is a chubby cat.",answer:"Kata Nama Khas",explanation_bm:'"Si Tom" ialah nama khas haiwan',explanation_eng:'"Si Tom" is a proper noun'}],X={"Kata Nama Am":{bg:"#E3F2FD",border:"#1976D2",text:"#1565C0"},"Kata Nama Khas":{bg:"#FFF3E0",border:"#F57C00",text:"#E65100"}},l={primary:"#159E96",primaryDark:"#0B5E5A"};function ea({onBack:c,language:a="bm",topicComplete:r,onNextTopic:d}){const[m,C]=t.useState(0),[x,v]=t.useState(0),[g,u]=t.useState(null),[s,h]=t.useState(!1),[b,K]=t.useState(!1),[N,A]=t.useState(!1),i=t.useMemo(()=>M(W).map(e=>({...e,options:M(["Kata Nama Am","Kata Nama Khas"])})),[]),o=i[m],f=g===o.answer,w=(i.length>0?Math.round(x/i.length*100):0)>=P;t.useEffect(()=>{if(b&&w&&!N){const e=setTimeout(()=>{A(!0),r?.(S)},0);return()=>clearTimeout(e)}},[b,w,N,r]);const{awardCorrect:j,awardWrong:F}=L(S),B=t.useCallback(e=>{s||(z(),u(e),e===o.answer?(y("correct"),v(k=>k+1),j(),D({particleCount:40,spread:60,origin:{y:.6},scalar:.8})):(y("wrong"),F()),h(!0))},[s,o.answer,j,F]),I=t.useCallback(()=>{m<i.length-1?(C(e=>e+1),u(null),h(!1)):(y("streak"),D({particleCount:150,spread:100,origin:{y:.5}}),K(!0))},[m,i.length]),T=t.useCallback(()=>{C(0),v(0),u(null),h(!1),K(!1),A(!1)},[]),E=a==="bm"?"Kata Nama Am & Khas":"Common & Proper Nouns";return b?n.jsx(R,{onBack:c,language:a,title:E,topicId:S,score:x,total:i.length,passPct:P,accentColor:l.primary,onRestart:T,onNextTopic:w?d:null}):n.jsxs(n.Fragment,{children:[n.jsx("style",{children:`
        .gn-card {
          flex-shrink: 0; width: 100%;
          display: flex; flex-direction: column; align-items: center;
          gap: clamp(10px, 2.2vh, 20px);
          text-align: center;
          background: #fff;
          border: 3px solid ${l.primary}66;
          border-radius: clamp(18px, 3vh, 28px);
          padding: clamp(16px, 3.4vh, 30px) clamp(16px, 4vw, 28px) clamp(18px, 3.6vh, 32px);
          box-shadow: 0 clamp(3px, 0.6vh, 5px) 0 ${l.primary}2e, 0 12px 26px -16px rgba(0,0,0,.2);
        }
        .gn-card-emoji { font-size: clamp(48px, 11vh, 84px); line-height: 1.15; user-select: none; }
        .gn-card-example {
          width: 100%;
          border-top: 2px dashed #E8F0EE;
          padding-top: clamp(10px, 2.2vh, 20px);
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(20px, 4.6vh, 36px);
          line-height: 1.25; color: #333;
        }
        .gn-prompt { flex-shrink: 0; font-size: clamp(13px, 2vw, 17px); color: #888; font-weight: 600; }
        .gn-opts { display: flex; flex-direction: column; gap: clamp(6px, 1vh, 14px); width: 100%; }
        .gn-op {
          background: #fff;
          border: 2.5px solid ${l.primary}66;
          border-radius: clamp(10px, 1.4vw, 14px);
          cursor: pointer; font-weight: 800;
          font-size: clamp(18px, 3.4vw, 26px);
          padding: clamp(10px, 1.4vh, 16px);
          width: 100%; transition: all .15s;
          font-family: 'Baloo 2', sans-serif; color: #333;
        }
        .gn-op:hover { transform: scale(1.04); }
        .gn-op:disabled { cursor: default; transform: none; }
        .gn-feedback {
          padding: clamp(6px,.8vh,12px) clamp(10px,1.4vw,20px);
          border-radius: clamp(8px,1.2vw,14px);
          text-align: center; font-weight: bold;
          font-size: clamp(13px,1.8vh,17px);
          width: 100%; box-sizing: border-box;
        }
        .gn-footer-btn {
          flex: 1; min-width: 0;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(15px, 2.8vh, 18px);
          border: none; border-radius: 14px; cursor: pointer;
          padding: clamp(10px, 2vh, 14px) 12px;
          transition: transform .12s ease, box-shadow .12s ease;
          display: flex; align-items: center; justify-content: center; gap: 6px;
        }
        .gn-footer-btn:active { transform: translateY(2px); }
        .gn-footer-btn.primary { background: linear-gradient(180deg, ${l.primary}cc, ${l.primary}); box-shadow: 0 4px 0 ${l.primaryDark}; color: #fff; }
        .gn-footer-btn.secondary { background: #fff; color: #64748B; border: 2px solid #E2E8F0; }
        @keyframes gn-pop { 0%{transform:scale(1)} 50%{transform:scale(1.08)} 100%{transform:scale(1)} }
        @keyframes gn-shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-4px)} 75%{transform:translateX(4px)} }
        @media (max-height:500px) { .gn-prompt{display:none} }
      `}),n.jsxs($,{onBack:c,language:a,title:E,current:m,total:i.length,score:x,accentColor:l.primary,footer:s&&n.jsxs("div",{style:{display:"flex",gap:"clamp(8px, 2vw, 12px)",width:"100%"},children:[n.jsxs("button",{className:"gn-footer-btn secondary",onClick:T,children:[n.jsx(O,{size:16})," ",a==="bm"?"Semula":"Reset"]}),n.jsx("button",{className:"gn-footer-btn primary",onClick:I,children:m<i.length-1?a==="bm"?"Seterusnya →":"Next →":a==="bm"?"Selesai ✓":"Finish ✓"})]}),children:[n.jsxs("div",{className:"gn-card",children:[n.jsx("div",{className:"gn-card-emoji",children:o.image}),n.jsx("div",{className:"gn-card-example",children:a==="bm"?o.example_bm:o.example_eng}),n.jsx("div",{className:"gn-prompt",children:a==="bm"?`"${o.word}" ialah?`:`"${o.word}" is?`})]}),n.jsx("div",{className:"gn-opts",children:o.options.map((e,k)=>{const _=X[e]||{bg:"#FFF",border:"#159E96",text:"#333"};let p={};return s?e===o.answer?p={background:"#4CAF50",borderColor:"#388E3C",color:"#fff"}:e===g?p={background:"#FF6B6B",borderColor:"#D32F2F",color:"#fff"}:p={background:"#F5F5F5",borderColor:"#DDD",color:"#AAA"}:p={background:_.bg,borderColor:_.border,color:_.text},n.jsx("button",{className:"gn-op",onClick:()=>B(e),disabled:s,style:{...p,animation:s&&e===o.answer?"gn-pop .35s cubic-bezier(.34,1.56,.64,1)":s&&e===g&&e!==o.answer?"gn-shake .3s ease":"none"},children:e},k)})}),s&&n.jsxs("div",{className:"gn-feedback",style:{background:f?"#D4EDDA":"#F8D7DA",color:f?"#155724":"#721C24"},children:[f?a==="bm"?"✅ Betul!":"✅ Correct!":a==="bm"?`❌ Jawapan: ${o.answer}`:`❌ Answer: ${o.answer}`,n.jsx("div",{style:{fontSize:"0.85rem",fontWeight:"normal",marginTop:4,opacity:.9},children:a==="bm"?o.explanation_bm:o.explanation_eng})]})]})]})}export{ea as default};
