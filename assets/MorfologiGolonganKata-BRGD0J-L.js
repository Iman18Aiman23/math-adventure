import{r as s,e as _,p as u,j as a}from"./index-YCInXYg5.js";import{c as A}from"./confetti.module-oQXWb4Lk.js";import{B as C}from"./BMStdShell-CNw-aSVc.js";import{B as S}from"./BMHeader-B5cOc9J_.js";import{R as D}from"./refresh-cw-J9zlOc9a.js";import"./useGamification-g-vGaz2S.js";function E(m){const e=[...m];for(let o=e.length-1;o>0;o--){const p=Math.floor(Math.random()*(o+1));[e[o],e[p]]=[e[p],e[o]]}return e}const B=[{id:1,word:"kucing",image:"🐱",example_bm:"Kucing itu comel.",example_eng:"The cat is cute.",options:["Kata Nama Am","Kata Kerja","Kata Adjektif"],answer:"Kata Nama Am",explanation_bm:'"kucing" ialah nama benda/haiwan yang umum — Kata Nama Am',explanation_eng:'"kucing" is a common name for a thing/animal — Common Noun'},{id:2,word:"berlari",image:"🏃",example_bm:"Murid itu berlari laju.",example_eng:"The student runs fast.",options:["Kata Nama Am","Kata Kerja","Kata Adjektif"],answer:"Kata Kerja",explanation_bm:'"berlari" ialah perbuatan yang dilakukan — Kata Kerja',explanation_eng:'"berlari" is an action word — Verb'},{id:3,word:"cantik",image:"🌸",example_bm:"Bunga itu cantik.",example_eng:"The flower is beautiful.",options:["Kata Nama Am","Kata Kerja","Kata Adjektif"],answer:"Kata Adjektif",explanation_bm:'"cantik" menerangkan sifat sesuatu — Kata Adjektif',explanation_eng:'"cantik" describes a quality — Adjective'},{id:4,word:"Ahmad",image:"👦",example_bm:"Ahmad pergi ke sekolah.",example_eng:"Ahmad goes to school.",options:["Kata Nama Am","Kata Nama Khas","Kata Kerja"],answer:"Kata Nama Khas",explanation_bm:'"Ahmad" ialah nama khas seseorang — Kata Nama Khas',explanation_eng:`"Ahmad" is a specific person's name — Proper Noun`},{id:5,word:"membaca",image:"📖",example_bm:"Saya suka membaca buku.",example_eng:"I like to read books.",options:["Kata Nama Am","Kata Kerja","Kata Adjektif"],answer:"Kata Kerja",explanation_bm:'"membaca" ialah perbuatan yang dilakukan — Kata Kerja',explanation_eng:'"membaca" is an action word — Verb'},{id:6,word:"besar",image:"🐘",example_bm:"Gajah itu sangat besar.",example_eng:"The elephant is very big.",options:["Kata Nama Am","Kata Kerja","Kata Adjektif"],answer:"Kata Adjektif",explanation_bm:'"besar" menerangkan saiz sesuatu — Kata Adjektif',explanation_eng:'"besar" describes the size of something — Adjective'},{id:7,word:"sekolah",image:"🏫",example_bm:"Saya pergi ke sekolah.",example_eng:"I go to school.",options:["Kata Nama Am","Kata Kerja","Kata Adjektif"],answer:"Kata Nama Am",explanation_bm:'"sekolah" ialah nama tempat yang umum — Kata Nama Am',explanation_eng:'"sekolah" is a common place name — Common Noun'},{id:8,word:"Malaysia",image:"🇲🇾",example_bm:"Saya tinggal di Malaysia.",example_eng:"I live in Malaysia.",options:["Kata Nama Am","Kata Nama Khas","Kata Adjektif"],answer:"Kata Nama Khas",explanation_bm:'"Malaysia" ialah nama khas sebuah negara — Kata Nama Khas',explanation_eng:'"Malaysia" is the specific name of a country — Proper Noun'}],z={"Kata Nama Am":{bg:"#E3F2FD",border:"#1976D2",text:"#1565C0"},"Kata Nama Khas":{bg:"#FFF3E0",border:"#F57C00",text:"#E65100"},"Kata Kerja":{bg:"#E8F5E9",border:"#388E3C",text:"#2E7D32"},"Kata Adjektif":{bg:"#F3E5F5",border:"#7B1FA2",text:"#6A1B9A"}},n={bg:"#FFE9CC",primary:"#FF9600",primaryDark:"#D47A00"};function O({onBack:m,language:e="bm"}){const[o,p]=s.useState(0),[y,k]=s.useState(0),[d,x]=s.useState(null),[i,f]=s.useState(!1),[v,K]=s.useState(!1),l=s.useMemo(()=>B.map(r=>({...r,options:E(r.options)})),[]),t=l[o],h=d===t.answer,N=s.useCallback(r=>{i||(_(),x(r),r===t.answer?(u("correct"),k(b=>b+10),A({particleCount:40,spread:60,origin:{y:.6},scalar:.8})):u("wrong"),f(!0))},[i,t.answer]),F=s.useCallback(()=>{o<l.length-1?(p(r=>r+1),x(null),f(!1)):(u("streak"),A({particleCount:150,spread:100,origin:{y:.5}}),K(!0))},[o,l.length]),w=s.useCallback(()=>{p(0),k(0),x(null),f(!1),K(!1)},[]),j=e==="bm"?"Morfologi Golongan Kata":"Word Type Morphology";return v?a.jsxs("div",{style:{minHeight:"100dvh",display:"flex",flexDirection:"column",background:n.bg},children:[a.jsx(S,{onBack:m,language:e,title:j}),a.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:16,textAlign:"center"},children:[a.jsx("div",{style:{fontSize:"clamp(56px, 12vh, 90px)",marginBottom:"clamp(8px, 1.6vh, 16px)"},children:"🔍"}),a.jsx("h2",{style:{fontFamily:"'Baloo 2', sans-serif",color:n.primary,fontSize:"clamp(24px, 5vh, 36px)",fontWeight:800,margin:0},children:e==="bm"?"Tahniah!":"Well Done!"}),a.jsxs("p",{style:{fontSize:"clamp(14px, 2.6vh, 18px)",color:"#555",fontWeight:600,margin:"0.6rem 0 1.2rem"},children:[e==="bm"?"Markah: ":"Score: ",a.jsx("strong",{children:y}),"/",l.length*10]}),a.jsxs("div",{style:{display:"flex",gap:"0.8rem",flexWrap:"wrap",justifyContent:"center"},children:[a.jsxs("button",{onClick:w,style:{fontFamily:"'Baloo 2', sans-serif",padding:"0.8rem 1.5rem",background:"#fff",color:"#475569",border:"2px solid #E2E8F0",borderRadius:999,fontSize:"1rem",cursor:"pointer",fontWeight:800},children:["🔄 ",e==="bm"?"Main Semula":"Play Again"]}),a.jsx("button",{onClick:m,style:{fontFamily:"'Baloo 2', sans-serif",padding:"0.8rem 1.5rem",background:`linear-gradient(180deg, ${n.primary}cc, ${n.primary})`,color:"#fff",border:"none",borderRadius:999,fontSize:"1rem",cursor:"pointer",fontWeight:800,boxShadow:`0 4px 0 ${n.primaryDark}`},children:e==="bm"?"Kembali":"Back"})]})]})]}):a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
        .mg-opts { display: flex; flex-direction: column; gap: clamp(6px, 1vh, 14px); width: 100%; }
        .mg-op {
          background: #fff;
          border: 2.5px solid ${n.primary}66;
          border-radius: clamp(10px, 1.4vw, 14px);
          cursor: pointer; font-weight: 800;
          font-size: clamp(18px, 3.4vw, 26px);
          padding: clamp(10px, 1.4vh, 16px);
          width: 100%; transition: all .15s;
          font-family: 'Baloo 2', sans-serif; color: #333;
        }
        .mg-op:hover { transform: scale(1.04); }
        .mg-op:disabled { cursor: default; transform: none; }
        .mg-feedback {
          padding: clamp(6px,.8vh,12px) clamp(10px,1.4vw,20px);
          border-radius: clamp(8px,1.2vw,14px);
          text-align: center; font-weight: bold;
          font-size: clamp(13px,1.8vh,17px);
          width: 100%; box-sizing: border-box;
        }
        .mg-card {
          flex-shrink: 0; width: 100%;
          display: flex; flex-direction: column; align-items: center;
          gap: clamp(10px, 2.2vh, 20px);
          text-align: center;
          background: #fff;
          border: 3px solid ${n.primary}66;
          border-radius: clamp(18px, 3vh, 28px);
          padding: clamp(16px, 3.4vh, 30px) clamp(16px, 4vw, 28px) clamp(18px, 3.6vh, 32px);
          box-shadow: 0 clamp(3px, 0.6vh, 5px) 0 ${n.primary}2e, 0 12px 26px -16px rgba(0,0,0,.2);
        }
        .mg-card-emoji { font-size: clamp(48px, 11vh, 84px); line-height: 1.15; user-select: none; }
        .mg-card-example {
          width: 100%;
          border-top: 2px dashed #F5E6D0;
          padding-top: clamp(10px, 2.2vh, 20px);
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(20px, 4.6vh, 36px);
          line-height: 1.25; color: #333;
        }
        .mg-prompt { flex-shrink: 0; font-size: clamp(13px, 2vw, 17px); color: #888; font-weight: 600; }
        .mg-footer-btn {
          flex: 1; min-width: 0;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(15px, 2.8vh, 18px);
          border: none; border-radius: 14px; cursor: pointer;
          padding: clamp(10px, 2vh, 14px) 12px;
          transition: transform .12s ease, box-shadow .12s ease;
          display: flex; align-items: center; justify-content: center; gap: 6px;
        }
        .mg-footer-btn:active { transform: translateY(2px); }
        .mg-footer-btn.primary { background: linear-gradient(180deg, ${n.primary}cc, ${n.primary}); box-shadow: 0 4px 0 ${n.primaryDark}; color: #fff; }
        .mg-footer-btn.secondary { background: #fff; color: #64748B; border: 2px solid #E2E8F0; }
        @keyframes mg-pop { 0%{transform:scale(1)} 50%{transform:scale(1.08)} 100%{transform:scale(1)} }
        @keyframes mg-shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-4px)} 75%{transform:translateX(4px)} }
        @media (max-height:500px) { .mg-prompt{display:none} }
      `}),a.jsxs(C,{onBack:m,language:e,title:j,current:o,total:l.length,score:y,accentColor:n.primary,footer:i&&a.jsxs("div",{style:{display:"flex",gap:"clamp(8px, 2vw, 12px)",width:"100%"},children:[a.jsxs("button",{className:"mg-footer-btn secondary",onClick:w,children:[a.jsx(D,{size:16})," ",e==="bm"?"Semula":"Reset"]}),a.jsx("button",{className:"mg-footer-btn primary",onClick:F,children:o<l.length-1?e==="bm"?"Seterusnya →":"Next →":e==="bm"?"Selesai ✓":"Finish ✓"})]}),children:[a.jsxs("div",{className:"mg-card",children:[a.jsx("div",{className:"mg-card-emoji",children:t.image}),a.jsx("div",{className:"mg-card-example",children:e==="bm"?t.example_bm:t.example_eng}),a.jsx("div",{className:"mg-prompt",children:e==="bm"?`"${t.word}" adalah?`:`"${t.word}" is?`})]}),a.jsx("div",{className:"mg-opts",children:t.options.map((r,b)=>{const g=z[r]||{bg:"#FFF",border:"#FF9600",text:"#333"};let c={};return i?r===t.answer?c={background:"#4CAF50",borderColor:"#388E3C",color:"#fff"}:r===d?c={background:"#FF6B6B",borderColor:"#D32F2F",color:"#fff"}:c={background:"#F5F5F5",borderColor:"#DDD",color:"#AAA"}:c={background:g.bg,borderColor:g.border,color:g.text},a.jsx("button",{className:"mg-op",onClick:()=>N(r),disabled:i,style:{...c,animation:i&&r===t.answer?"mg-pop .35s cubic-bezier(.34,1.56,.64,1)":i&&r===d&&r!==t.answer?"mg-shake .3s ease":"none"},children:r},b)})}),i&&a.jsx("div",{className:"mg-feedback",style:{background:h?"#D4EDDA":"#F8D7DA",color:h?"#155724":"#721C24"},children:h?e==="bm"?"✅ Betul!":"✅ Correct!":e==="bm"?`❌ Jawapan: ${t.answer}`:`❌ Answer: ${t.answer}`})]})]})}export{O as default};
