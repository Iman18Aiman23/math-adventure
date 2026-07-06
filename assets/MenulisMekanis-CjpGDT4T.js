import{r as k,B as f,j as a,S as x}from"./index-YCInXYg5.js";import{u as g,B as u}from"./BMLessonQuizLayout-COWN8IiW.js";import"./utils-Direv13U.js";import"./confetti.module-oQXWb4Lk.js";import"./BMHeader-B5cOc9J_.js";import"./StatsBar-Dt4MeuCr.js";import"./useGamification-g-vGaz2S.js";const h="2-3-1-menulis-mekanis",e="#7A4FD0",b=[{title:"Perkataan KV+KV",desc:"Dua suku kata terbuka",words:["bapa","ibu","kakak","meja","kerusi","saya"]},{title:"Perkataan KV+KVK",desc:"Suku kata terbuka + tertutup",words:["buku","pensel","beg","botol","gambar","makan"]},{title:"Perkataan Dengan Digraf",desc:"Mengandungi ng, ny, kh",words:["bangku","banyak","langit","pinggan","khas","akhir"]},{title:"Frasa Biasa",desc:"Gabungan dua perkataan",words:["baju biru","makan nasi","buku baru","rumah besar","bola merah"]},{title:"Ayat Tunggal",desc:"Satu ayat lengkap",words:["Saya membaca buku.","Emak memasak nasi.","Ayah pergi kerja.","Kakak menulis surat."]}];function w({onBack:p,onStartQuiz:s,topicTitle:t,language:i}){const[o,l]=k.useState(null);k.useEffect(()=>()=>x.stopSpeaking(),[]);const c=n=>{x.stopSpeaking(),l(n),x.speak(n,"ms-MY",{rate:.65,pitch:1.1})};return a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
        .mmk2-learn-root {
          height: 100dvh; overflow: hidden;
          background: linear-gradient(180deg, #F0EBFB 0%, #DCD2F4 50%, #C4B5ED 100%);
          font-family: 'Fredoka', system-ui, sans-serif;
          display: flex; flex-direction: column;
        }
        .mmk2-learn-topbar {
          flex-shrink: 0; position: relative;
          display: flex; align-items: center; gap: 4px;
          padding: 10px 12px; min-height: 44px;
          background: rgba(255,255,255,.88);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0,0,0,.06);
        }
        .mmk2-learn-topbar::after { content: ''; flex: 0 1 88px; }
        .mmk2-learn-back {
          flex-shrink: 0;
          display: flex; align-items: center; gap: 4px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 13px; color: #64748B;
          background: none; border: none; cursor: pointer; padding: 6px 10px;
          border-radius: 10px;
        }
        .mmk2-learn-back:hover { background: #F1F5F9; }
        @media (max-width: 480px) {
          .mmk2-back-label { display: none; }
          .mmk2-learn-topbar::after { flex-basis: 42px; }
        }
        .mmk2-learn-title {
          flex: 1; min-width: 0;
          text-align: center;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(12px, 3.4vw, 14px); color: #1E293B;
        }
        .mmk2-learn-body {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column;
          align-items: center;
          width: 100%;
          padding: clamp(6px, 1.6vh, 16px) 16px clamp(4px, 1.2vh, 12px);
          overflow: hidden;
        }
        .mmk2-learn-heading {
          flex-shrink: 0; text-align: center; width: 100%;
          margin-bottom: clamp(8px, 2vh, 18px);
        }
        .mmk2-learn-heading h1 {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(15px, min(4.4vw, 4.2vh), 24px);
          color: #1E293B; margin: 0;
        }
        .mmk2-learn-heading p {
          font-size: clamp(10px, min(2.6vw, 1.8vh), 13px);
          font-weight: 500; color: #475569; margin: 4px 0 0;
        }
        .mmk2-cats-scroll {
          flex: 1; min-height: 0; width: 100%; max-width: 560px;
          overflow-y: auto;
          padding: 2px 4px;
          display: flex; flex-direction: column;
          gap: clamp(8px, 1.4vh, 14px);
        }
        .mmk2-cat-card {
          flex-shrink: 0;
          background: #fff;
          border-radius: clamp(14px, 2.4vw, 18px);
          padding: clamp(10px, 1.4vh, 16px) clamp(12px, 1.8vw, 18px);
          border: 2px solid ${e}18;
          box-shadow: 0 4px 12px -6px rgba(0,0,0,.06);
        }
        .mmk2-cat-header {
          display: flex; align-items: baseline; gap: 8px;
          margin-bottom: 8px;
        }
        .mmk2-cat-title {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(13px, min(3.2vw, 2.8vh), 17px);
          color: ${e};
        }
        .mmk2-cat-desc {
          font-size: clamp(9px, min(2vw, 1.4vh), 11px);
          color: #94A3B8; font-weight: 500;
        }
        .mmk2-word-grid {
          display: flex; flex-wrap: wrap; gap: 6px;
        }
        .mmk2-word-item {
          display: flex; align-items: center; gap: 4px;
          font-family: 'Fredoka', sans-serif; font-weight: 600;
          font-size: clamp(12px, min(2.8vw, 2.2vh), 16px);
          color: #334155;
          background: #F1F5F9;
          border-radius: 10px;
          padding: 4px 12px 4px 14px;
          cursor: pointer;
          transition: all .15s ease;
          border: 1.5px solid transparent;
          letter-spacing: .3px;
        }
        .mmk2-word-item:hover { background: #EDE9FE; border-color: ${e}44; }
        .mmk2-word-item.playing { background: #DCFCE7; border-color: #16A34A; }
        .mmk2-word-item .mmk2-icon {
          flex-shrink: 0;
          font-size: clamp(10px, 2.2vw, 12px);
        }
        .mmk2-learn-cta {
          flex-shrink: 0; text-align: center; width: 100%; max-width: 360px;
          margin-top: clamp(6px, 1.4vh, 14px);
        }
        .mmk2-learn-cta-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, min(3.8vw, 2.6vh), 18px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(9px, 1.8vh, 13px) 28px;
          color: #fff; width: 100%;
          background: linear-gradient(180deg, ${e}cc, ${e});
          box-shadow: 0 4px 0 ${e}66, 0 10px 20px -10px ${e}80;
          transition: transform .12s ease, box-shadow .12s;
        }
        .mmk2-learn-cta-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 ${e}66; }
        .mmk2-learn-footer {
          flex-shrink: 0; text-align: center;
          padding: clamp(2px, .6vh, 6px) 16px clamp(4px, 1vh, 10px);
          font-size: 10px; font-weight: 500; color: #94A3B8;
        }
        @media (max-height: 480px) {
          .mmk2-learn-heading p, .mmk2-learn-footer { display: none; }
        }
      `}),a.jsxs("div",{className:"mmk2-learn-root",children:[a.jsxs("div",{className:"mmk2-learn-topbar",children:[a.jsxs("button",{className:"mmk2-learn-back",onClick:p,children:[a.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:a.jsx("path",{d:"M19 12H5M12 19l-7-7 7-7"})}),a.jsx("span",{className:"mmk2-back-label",children:i==="bm"?"Kembali":"Back"})]}),a.jsx("span",{className:"mmk2-learn-title",children:t})]}),a.jsxs("div",{className:"mmk2-learn-body",children:[a.jsxs("div",{className:"mmk2-learn-heading",children:[a.jsx("h1",{children:i==="bm"?"Menulis Secara Mekanis ✍️":"Mechanical Writing ✍️"}),a.jsx("p",{children:i==="bm"?"Lihat contoh perkataan dan ayat yang ditulis dengan betul. Ketuk untuk dengar.":"See examples of correctly written words and sentences. Tap to listen."})]}),a.jsx("div",{className:"mmk2-cats-scroll",children:b.map((n,d)=>a.jsxs("div",{className:"mmk2-cat-card",children:[a.jsxs("div",{className:"mmk2-cat-header",children:[a.jsx("span",{className:"mmk2-cat-title",children:n.title}),a.jsx("span",{className:"mmk2-cat-desc",children:n.desc})]}),a.jsx("div",{className:"mmk2-word-grid",children:n.words.map((r,m)=>a.jsxs("div",{className:`mmk2-word-item${o===r?" playing":""}`,onClick:()=>c(r),children:[r,a.jsx("span",{className:"mmk2-icon",children:o===r?"🔊":"🔈"})]},m))})]},d))}),a.jsx("div",{className:"mmk2-learn-cta",children:a.jsxs("button",{className:"mmk2-learn-cta-btn",onClick:s,children:["🎯 ",i==="bm"?"Sedia untuk Kuiz?":"Ready for Quiz?"]})})]}),a.jsxs("div",{className:"mmk2-learn-footer",children:["Bahasa Melayu KSSR · ",t]})]})]})}function z({onBack:p,language:s="bm",topicComplete:t,onNextTopic:i}){const[o,l]=k.useState("learn"),c=f[h]||[],d=g(c,[],15),r=s==="bm"?"Menulis secara Mekanis":"Mechanical Writing",m=()=>{p?.()};return o==="learn"?a.jsx(w,{onBack:m,onStartQuiz:()=>l("quiz"),topicTitle:r,language:s}):a.jsx(u,{onBack:m,topicId:h,topicComplete:t,onNextTopic:i,topicTitle:r,quiz:d,language:s,accentColor:e,onShowLearn:()=>l("learn")})}export{z as default};
