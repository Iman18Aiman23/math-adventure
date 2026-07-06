import{r as d,B as b,j as a,S as m}from"./index-YCInXYg5.js";import{u,B as w}from"./BMLessonQuizLayout-COWN8IiW.js";import"./utils-Direv13U.js";import"./confetti.module-oQXWb4Lk.js";import"./BMHeader-B5cOc9J_.js";import"./StatsBar-Dt4MeuCr.js";import"./useGamification-g-vGaz2S.js";const g="2-4-2-persembahan-karya",n="#E8568A",v=[{title:"Bangun Pagi",lines:["Bangun pagi, gosok gigi","Basuh muka, pakai baju","Sarapan pagi, jangan lupa","Barulah kita pergi ke sekolah"]},{title:"Sayang Keluarga",lines:["Ayah, emak, sayang saya","Kakak, abang, mesra selalu","Kita semua satu keluarga","Hidup bahagia, penuh cinta"]},{title:"Kawan Baik",lines:["Kawan baik, kawan setia","Bersama kita bermain gembira","Tolong-menolong setiap masa","Itulah dia sahabat bersama"]}];function y({onBack:x,onStartQuiz:t,topicTitle:o,language:r}){const[s,l]=d.useState(null),[p,k]=d.useState(null);d.useEffect(()=>()=>m.stopSpeaking(),[]);const h=(i,e)=>{m.stopSpeaking(),l(i),k(e),m.speak(e,"ms-MY",{rate:.75,pitch:1.3})};return a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
        .pk-learn-root {
          height: 100dvh; overflow: hidden;
          background: linear-gradient(180deg, #FCDCEA 0%, #F39BC0 50%, #E8568A 100%);
          font-family: 'Fredoka', system-ui, sans-serif;
          display: flex; flex-direction: column;
        }
        .pk-learn-topbar {
          flex-shrink: 0; position: relative;
          display: flex; align-items: center; gap: 4px;
          padding: 10px 12px; min-height: 44px;
          background: rgba(255,255,255,.88);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0,0,0,.06);
        }
        .pk-learn-topbar::after { content: ''; flex: 0 1 88px; }
        .pk-learn-back {
          flex-shrink: 0;
          display: flex; align-items: center; gap: 4px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 13px; color: #64748B;
          background: none; border: none; cursor: pointer; padding: 6px 10px;
          border-radius: 10px;
        }
        .pk-learn-back:hover { background: #F1F5F9; }
        @media (max-width: 480px) {
          .pk-back-label { display: none; }
          .pk-learn-topbar::after { flex-basis: 42px; }
        }
        .pk-learn-title {
          flex: 1; min-width: 0;
          text-align: center;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(12px, 3.4vw, 14px); color: #1E293B;
        }
        .pk-learn-body {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column;
          align-items: center;
          width: 100%;
          padding: clamp(6px, 1.6vh, 16px) 16px clamp(4px, 1.2vh, 12px);
          overflow: hidden;
        }
        .pk-learn-heading {
          flex-shrink: 0; text-align: center; width: 100%;
          margin-bottom: clamp(8px, 2vh, 18px);
        }
        .pk-learn-heading h1 {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(15px, min(4.4vw, 4.2vh), 24px);
          color: #1E293B; margin: 0;
        }
        .pk-learn-heading p {
          font-size: clamp(10px, min(2.6vw, 1.8vh), 13px);
          font-weight: 500; color: #475569; margin: 4px 0 0;
        }
        .pk-songs-scroll {
          flex: 1; min-height: 0; width: 100%; max-width: 540px;
          overflow-y: auto;
          padding: 2px 4px;
          display: flex; flex-direction: column;
          gap: clamp(8px, 1.4vh, 14px);
        }
        .pk-song-card {
          flex-shrink: 0;
          background: #fff;
          border-radius: clamp(14px, 2.4vw, 18px);
          padding: clamp(12px, 1.6vh, 18px) clamp(14px, 2vw, 20px);
          border: 2px solid ${n}18;
          box-shadow: 0 4px 12px -6px rgba(0,0,0,.06);
        }
        .pk-song-title {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, min(3.4vw, 3vh), 18px);
          color: ${n};
          margin-bottom: 10px;
          display: flex; align-items: center; gap: 6px;
        }
        .pk-line-row {
          display: flex; align-items: center; gap: 8px;
          padding: 4px 0;
          border-bottom: 1px solid #F1F5F9;
        }
        .pk-line-row:last-child { border-bottom: none; }
        .pk-line-text {
          flex: 1;
          font-family: 'Baloo 2', sans-serif; font-weight: 600;
          font-size: clamp(12px, min(2.8vw, 2.2vh), 15px);
          color: #334155;
        }
        .pk-line-btn {
          flex-shrink: 0;
          font-size: 16px;
          background: none; border: none; cursor: pointer;
          padding: 4px 8px;
          border-radius: 8px;
          transition: background .15s;
        }
        .pk-line-btn:hover { background: #FCE7F3; }
        .pk-line-btn.playing { background: #DCFCE7; }
        .pk-learn-cta {
          flex-shrink: 0; text-align: center; width: 100%; max-width: 360px;
          margin-top: clamp(6px, 1.4vh, 14px);
        }
        .pk-learn-cta-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, min(3.8vw, 2.6vh), 18px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(9px, 1.8vh, 13px) 28px; color: #fff; width: 100%;
          background: linear-gradient(180deg, ${n}cc, ${n});
          box-shadow: 0 4px 0 ${n}66, 0 10px 20px -10px ${n}80;
          transition: transform .12s ease, box-shadow .12s;
        }
        .pk-learn-cta-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 ${n}66; }
        .pk-learn-footer {
          flex-shrink: 0; text-align: center;
          padding: clamp(2px, .6vh, 6px) 16px clamp(4px, 1vh, 10px);
          font-size: 10px; font-weight: 500; color: #94A3B8;
        }
        @media (max-height: 480px) {
          .pk-learn-heading p, .pk-learn-footer { display: none; }
        }
      `}),a.jsxs("div",{className:"pk-learn-root",children:[a.jsxs("div",{className:"pk-learn-topbar",children:[a.jsxs("button",{className:"pk-learn-back",onClick:x,children:[a.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:a.jsx("path",{d:"M19 12H5M12 19l-7-7 7-7"})}),a.jsx("span",{className:"pk-back-label",children:r==="bm"?"Kembali":"Back"})]}),a.jsx("span",{className:"pk-learn-title",children:o})]}),a.jsxs("div",{className:"pk-learn-body",children:[a.jsxs("div",{className:"pk-learn-heading",children:[a.jsx("h1",{children:r==="bm"?"Persembahan Karya 🎤":"Performance Arts 🎤"}),a.jsx("p",{children:r==="bm"?"Baca dan lafazkan lagu kanak-kanak dengan intonasi yang betul":"Read and recite children songs with correct intonation"})]}),a.jsx("div",{className:"pk-songs-scroll",children:v.map((i,e)=>a.jsxs("div",{className:"pk-song-card",children:[a.jsxs("div",{className:"pk-song-title",children:["🎵 ",i.title]}),i.lines.map((c,f)=>a.jsxs("div",{className:"pk-line-row",children:[a.jsx("span",{className:"pk-line-text",children:c}),a.jsx("button",{className:`pk-line-btn${s===e&&p===c?" playing":""}`,onClick:()=>h(e,c),children:s===e&&p===c?"🔊":"🔈"})]},f))]},e))}),a.jsx("div",{className:"pk-learn-cta",children:a.jsxs("button",{className:"pk-learn-cta-btn",onClick:t,children:["🎯 ",r==="bm"?"Sedia untuk Kuiz?":"Ready for Quiz?"]})})]}),a.jsxs("div",{className:"pk-learn-footer",children:["Bahasa Melayu KSSR · ",o]})]})]})}function P({onBack:x,language:t="bm",topicComplete:o,onNextTopic:r}){const[s,l]=d.useState("learn"),p=b[g]||[],h=u(p,[],15),i=t==="bm"?"Persembahan Karya":"Performance Arts",e=()=>{x?.()};return s==="learn"?a.jsx(y,{onBack:e,onStartQuiz:()=>l("quiz"),topicTitle:i,language:t}):a.jsx(w,{onBack:e,topicId:g,topicComplete:o,onNextTopic:r,topicTitle:i,quiz:h,language:t,accentColor:n,onShowLearn:()=>l("learn")})}export{P as default};
