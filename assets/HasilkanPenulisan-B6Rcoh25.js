import{r as x,B as u,j as a}from"./index-YCInXYg5.js";import{u as g,B as f}from"./BMLessonQuizLayout-COWN8IiW.js";import"./utils-Direv13U.js";import"./confetti.module-oQXWb4Lk.js";import"./BMHeader-B5cOc9J_.js";import"./StatsBar-Dt4MeuCr.js";import"./useGamification-g-vGaz2S.js";const h="2-3-2-hasilkan-penulisan",e="#7A4FD0",b=[{title:'Ayat Majmuk dengan "dan"',text:'Contoh: "Ali membaca buku dan adik menulis."',tips:'Kata hubung "dan" menggabungkan dua ayat tunggal.'},{title:'Ayat Majmuk dengan "sambil"',text:'Contoh: "Emak memasak sambil mendengar radio."',tips:'Kata hubung "sambil" menunjukkan dua perbuatan serentak.'},{title:'Ayat Majmuk dengan "kerana"',text:'Contoh: "Amin tidak hadir kerana demam."',tips:'Kata hubung "kerana" menunjukkan sebab.'},{title:'Ayat Majmuk dengan "lalu"',text:'Contoh: "Dia bangun lalu mandi."',tips:'Kata hubung "lalu" menunjukkan urutan perbuatan.'},{title:"Kembangkan Ayat",text:`Ayat dasar: "Budak itu berlari."
Kembang: "Budak kecil itu berlari dengan pantas."`,tips:"Gunakan kata adjektif untuk mengembangkan ayat."}];function k({onBack:p,onStartQuiz:r,topicTitle:o,language:t}){const[i,l]=x.useState(null);return a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
        .hp-learn-root {
          height: 100dvh; overflow: hidden;
          background: linear-gradient(180deg, #F0EBFB 0%, #DCD2F4 50%, #C4B5ED 100%);
          font-family: 'Fredoka', system-ui, sans-serif;
          display: flex; flex-direction: column;
        }
        .hp-learn-topbar {
          flex-shrink: 0; position: relative;
          display: flex; align-items: center; gap: 4px;
          padding: 10px 12px; min-height: 44px;
          background: rgba(255,255,255,.88);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0,0,0,.06);
        }
        .hp-learn-topbar::after { content: ''; flex: 0 1 88px; }
        .hp-learn-back {
          flex-shrink: 0;
          display: flex; align-items: center; gap: 4px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 13px; color: #64748B;
          background: none; border: none; cursor: pointer; padding: 6px 10px;
          border-radius: 10px;
        }
        .hp-learn-back:hover { background: #F1F5F9; }
        @media (max-width: 480px) {
          .hp-back-label { display: none; }
          .hp-learn-topbar::after { flex-basis: 42px; }
        }
        .hp-learn-title {
          flex: 1; min-width: 0;
          text-align: center;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(12px, 3.4vw, 14px); color: #1E293B;
        }
        .hp-learn-body {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column;
          align-items: center;
          width: 100%;
          padding: clamp(6px, 1.6vh, 16px) 16px clamp(4px, 1.2vh, 12px);
          overflow: hidden;
        }
        .hp-learn-heading {
          flex-shrink: 0; text-align: center; width: 100%;
          margin-bottom: clamp(8px, 2vh, 18px);
        }
        .hp-learn-heading h1 {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(15px, min(4.4vw, 4.2vh), 24px);
          color: #1E293B; margin: 0;
        }
        .hp-learn-heading p {
          font-size: clamp(10px, min(2.6vw, 1.8vh), 13px);
          font-weight: 500; color: #475569; margin: 4px 0 0;
        }
        .hp-cards-scroll {
          flex: 1; min-height: 0; width: 100%; max-width: 540px;
          overflow-y: auto;
          padding: 2px 4px;
          display: flex; flex-direction: column;
          gap: clamp(8px, 1.4vh, 14px);
        }
        .hp-card {
          flex-shrink: 0;
          background: #fff;
          border-radius: clamp(14px, 2.4vw, 18px);
          padding: clamp(10px, 1.4vh, 16px) clamp(12px, 1.8vw, 18px);
          border: 2px solid ${e}18;
          box-shadow: 0 4px 12px -6px rgba(0,0,0,.06);
          cursor: pointer;
          transition: all .2s ease;
        }
        .hp-card:hover { border-color: ${e}44; }
        .hp-card.expanded { border-color: ${e}; }
        .hp-card-header {
          display: flex; align-items: center; justify-content: space-between; gap: 10px;
        }
        .hp-card-title {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(13px, min(3.2vw, 2.8vh), 17px);
          color: #1E293B;
        }
        .hp-card-toggle {
          flex-shrink: 0; font-size: 16px; color: ${e};
          transition: transform .2s ease;
        }
        .hp-card-toggle.open { transform: rotate(180deg); }
        .hp-card-content {
          overflow: hidden; max-height: 0; transition: max-height .3s ease;
        }
        .hp-card-content.open { max-height: 400px; }
        .hp-card-text {
          margin-top: 10px;
          white-space: pre-wrap;
          font-size: clamp(12px, min(2.8vw, 2.2vh), 15px);
          font-weight: 600; color: #334155; line-height: 1.6;
          padding: 10px 12px;
          background: #F8F5FF;
          border-radius: 12px;
          border-left: 4px solid ${e}55;
        }
        .hp-card-tips {
          margin-top: 8px;
          font-size: clamp(10px, min(2.2vw, 1.6vh), 12px);
          color: ${e}; font-weight: 600;
          display: flex; align-items: center; gap: 4px;
        }
        .hp-learn-cta {
          flex-shrink: 0; text-align: center; width: 100%; max-width: 360px;
          margin-top: clamp(6px, 1.4vh, 14px);
        }
        .hp-learn-cta-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, min(3.8vw, 2.6vh), 18px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(9px, 1.8vh, 13px) 28px; color: #fff; width: 100%;
          background: linear-gradient(180deg, ${e}cc, ${e});
          box-shadow: 0 4px 0 ${e}66, 0 10px 20px -10px ${e}80;
          transition: transform .12s ease, box-shadow .12s;
        }
        .hp-learn-cta-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 ${e}66; }
        .hp-learn-footer {
          flex-shrink: 0; text-align: center;
          padding: clamp(2px, .6vh, 6px) 16px clamp(4px, 1vh, 10px);
          font-size: 10px; font-weight: 500; color: #94A3B8;
        }
        @media (max-height: 480px) {
          .hp-learn-heading p, .hp-learn-footer { display: none; }
        }
      `}),a.jsxs("div",{className:"hp-learn-root",children:[a.jsxs("div",{className:"hp-learn-topbar",children:[a.jsxs("button",{className:"hp-learn-back",onClick:p,children:[a.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:a.jsx("path",{d:"M19 12H5M12 19l-7-7 7-7"})}),a.jsx("span",{className:"hp-back-label",children:t==="bm"?"Kembali":"Back"})]}),a.jsx("span",{className:"hp-learn-title",children:o})]}),a.jsxs("div",{className:"hp-learn-body",children:[a.jsxs("div",{className:"hp-learn-heading",children:[a.jsx("h1",{children:t==="bm"?"Membina & Menghasilkan Penulisan ✍️":"Building & Producing Writing ✍️"}),a.jsx("p",{children:t==="bm"?"Ketuk untuk lihat contoh ayat majmuk dan cara mengembangkan ayat":"Tap to see compound sentence examples and how to expand sentences"})]}),a.jsx("div",{className:"hp-cards-scroll",children:b.map((s,n)=>a.jsxs("div",{className:`hp-card${i===n?" expanded":""}`,onClick:()=>l(i===n?null:n),children:[a.jsxs("div",{className:"hp-card-header",children:[a.jsx("span",{className:"hp-card-title",children:s.title}),a.jsx("span",{className:`hp-card-toggle${i===n?" open":""}`,children:"▼"})]}),a.jsxs("div",{className:`hp-card-content${i===n?" open":""}`,children:[a.jsx("div",{className:"hp-card-text",children:s.text}),a.jsxs("div",{className:"hp-card-tips",children:["💡 ",s.tips]})]})]},n))}),a.jsx("div",{className:"hp-learn-cta",children:a.jsxs("button",{className:"hp-learn-cta-btn",onClick:r,children:["🎯 ",t==="bm"?"Sedia untuk Kuiz?":"Ready for Quiz?"]})})]}),a.jsxs("div",{className:"hp-learn-footer",children:["Bahasa Melayu KSSR · ",o]})]})]})}function M({onBack:p,language:r="bm",topicComplete:o,onNextTopic:t}){const[i,l]=x.useState("learn"),s=u[h]||[],m=g(s,[],15),d=r==="bm"?"Membina & Menghasilkan Penulisan":"Building & Producing Writing",c=()=>{p?.()};return i==="learn"?a.jsx(k,{onBack:c,onStartQuiz:()=>l("quiz"),topicTitle:d,language:r}):a.jsx(f,{onBack:c,topicId:h,topicComplete:o,onNextTopic:t,topicTitle:d,quiz:m,language:r,accentColor:e,onShowLearn:()=>l("learn")})}export{M as default};
