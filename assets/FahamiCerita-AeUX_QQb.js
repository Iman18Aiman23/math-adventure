import{r as u,B as b,j as a,S as j}from"./index-YCInXYg5.js";import{u as B,B as C}from"./BMLessonQuizLayout-COWN8IiW.js";import{B as N}from"./BMHeader-B5cOc9J_.js";import{V as z}from"./volume-2-B9qgBXCR.js";import{C as S}from"./chevron-left-BLXk0NUJ.js";import{C as F}from"./chevron-right--_L4we7T.js";import"./utils-Direv13U.js";import"./confetti.module-oQXWb4Lk.js";import"./StatsBar-Dt4MeuCr.js";import"./useGamification-g-vGaz2S.js";const g="1-2-5-fahami-cerita",e="#1E7AC9",l=[{title:"Kucing Comel",text:"Kucing comel itu berwarna hitam. Ia suka bermain di halaman rumah. Setiap hari kucing itu duduk di atas pagar.",idea:"Kucing hitam yang suka bermain di halaman dan duduk di pagar."},{title:"Bas Sekolah",text:"Bas sekolah berwarna kuning. Setiap pagi Ali menaiki bas sekolah. Ali duduk di sebelah kawan baiknya.",idea:"Ali menaiki bas kuning ke sekolah dengan kawannya."},{title:"Pokok Rambutan",text:"Pokok rambutan di belakang rumah sangat tinggi. Buahnya manis dan merah. Adik suka makan rambutan.",idea:"Pokok rambutan tinggi dengan buah manis yang dimakan adik."},{title:"Taman Bunga",text:"Ibu suka menanam bunga di taman. Ada bunga ros, bunga cempaka dan bunga matahari. Taman itu sungguh cantik.",idea:"Ibu menanam banyak bunga cantik di taman."}];function E({onBack:m,onStartQuiz:s,topicTitle:f,language:n}){const[i,o]=u.useState(0),[d,h]=u.useState(0),t=l[i],p=i===l.length-1,c=d>=l.length-1,k=()=>o(x=>Math.max(0,x-1)),v=()=>o(x=>{const r=Math.min(l.length-1,x+1);return h(y=>Math.max(y,r)),r}),w=()=>j.speak(t.text,"ms");return a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
        .fc-learn-root {
          height: 100dvh; overflow: hidden;
          background: linear-gradient(180deg, #EBF5FF 0%, #D5E9FA 50%, #B7D9F5 100%);
          font-family: 'Fredoka', system-ui, sans-serif;
          display: flex; flex-direction: column;
        }
        .fc-learn-body {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column;
          align-items: center;
          width: 100%;
          padding: clamp(10px, 2.2vh, 22px) 16px clamp(8px, 1.8vh, 18px);
          overflow: hidden;
        }
        .fc-learn-heading {
          flex-shrink: 0; text-align: center; width: 100%;
          margin-top: 8px;
          margin-bottom: clamp(10px, 2.4vh, 20px);
        }
        .fc-learn-heading h1 {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(16px, min(4.6vw, 4.4vh), 26px);
          color: #1E293B; margin: 0;
        }
        .fc-learn-heading p {
          font-size: clamp(10px, min(2.8vw, 2vh), 13px);
          font-weight: 500; color: #475569; margin: 4px 0 0;
        }
        .fc-stage {
          flex: 1; min-height: 0; width: 100%; max-width: 520px;
          display: flex; flex-direction: column;
        }
        .fc-learn-card {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column;
          background: #fff; border-radius: clamp(16px, 2.6vw, 22px);
          border: 2.5px solid ${e}33;
          box-shadow: 0 6px 18px -8px rgba(0,0,0,.12);
          overflow: hidden;
        }
        .fc-card-head {
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: space-between; gap: 10px;
          padding: clamp(12px, 1.8vh, 18px) clamp(14px, 2vw, 20px);
          border-bottom: 1px solid ${e}18;
        }
        .fc-card-title {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(16px, min(4vw, 3.4vh), 21px);
          color: #1E293B;
        }
        .fc-read-btn {
          flex-shrink: 0;
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: clamp(12px, min(2.6vw, 2vh), 14px);
          color: #fff; background: ${e};
          border: none; border-radius: 999px;
          padding: clamp(6px, 1vh, 9px) clamp(12px, 2.2vw, 16px);
          cursor: pointer;
          box-shadow: 0 3px 0 ${e}66;
        }
        .fc-read-btn:active { transform: translateY(2px); box-shadow: 0 1px 0 ${e}66; }
        .fc-card-scroll {
          flex: 1; min-height: 0; overflow-y: auto;
          padding: clamp(12px, 2vw, 18px);
          display: flex; flex-direction: column; gap: 10px;
        }
        .fc-card-text {
          font-size: clamp(15px, min(3.6vw, 3vh), 19px);
          line-height: 1.85;
          color: #334155;
          font-weight: 500;
          padding: 14px 16px;
          background: #F8FAFC;
          border-radius: 12px;
          border: 1px solid #E2E8F0;
        }
        .fc-card-idea {
          display: flex; align-items: flex-start; gap: 8px;
          font-size: clamp(12px, min(2.8vw, 2.2vh), 15px);
          color: #475569;
          font-weight: 500;
          padding: 10px 14px;
          background: #FFFBEB;
          border-radius: 10px;
          border: 1px solid #FDE68A;
        }
        .fc-card-idea-label {
          color: #92400E; font-weight: 700; white-space: nowrap;
          font-family: 'Baloo 2', sans-serif; font-size: clamp(11px, min(2.4vw, 2vh), 13px);
        }
        .fc-pager {
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px;
          margin-top: clamp(10px, 1.8vh, 16px);
        }
        .fc-arrow {
          flex-shrink: 0;
          width: clamp(44px, 8vh, 52px); height: clamp(44px, 8vh, 52px);
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%;
          background: #fff; border: 2px solid ${e};
          color: ${e}; cursor: pointer;
          transition: transform .12s;
        }
        .fc-arrow:active { transform: translateY(2px); }
        .fc-arrow:disabled { opacity: .35; cursor: default; border-color: #CBD5E1; color: #CBD5E1; }
        .fc-dots { display: flex; gap: 8px; }
        .fc-dot {
          width: 10px; height: 10px; border-radius: 50%;
          background: ${e}33; transition: background .2s, transform .2s;
        }
        .fc-dot.seen { background: ${e}80; }
        .fc-dot.active { background: ${e}; transform: scale(1.35); }
        .fc-learn-cta {
          flex-shrink: 0; text-align: center; width: 100%; max-width: 520px;
          margin-top: clamp(10px, 2vh, 18px);
        }
        .fc-learn-cta-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, min(3.8vw, 2.6vh), 18px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(10px, 1.9vh, 14px) 28px;
          color: #fff; width: 100%;
          background: linear-gradient(180deg, ${e}cc, ${e});
          box-shadow: 0 4px 0 ${e}66, 0 10px 20px -10px ${e}80;
          transition: transform .12s ease, box-shadow .12s;
        }
        .fc-learn-cta-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 ${e}66; }
        .fc-learn-cta-btn:disabled {
          background: #CBD5E1; box-shadow: none; cursor: default;
          color: #fff;
        }
        .fc-learn-cta-hint {
          font-size: clamp(10px, min(2.4vw, 1.8vh), 12px);
          color: #64748B; font-weight: 600; margin: 6px 0 0;
        }
        @media (max-height: 480px) {
          .fc-learn-heading p { display: none; }
        }
      `}),a.jsxs("div",{className:"fc-learn-root",children:[a.jsx(N,{onBack:m,language:n,title:f}),a.jsxs("div",{className:"fc-learn-body",children:[a.jsxs("div",{className:"fc-learn-heading",children:[a.jsx("h1",{children:n==="bm"?"Mari Fahami Cerita 🔍":"Let's Understand Stories 🔍"}),a.jsx("p",{children:n==="bm"?"Baca setiap cerita, kemudian cuba kuiz":"Read each story, then try the quiz"})]}),a.jsxs("div",{className:"fc-stage",children:[a.jsxs("div",{className:"fc-learn-card",children:[a.jsxs("div",{className:"fc-card-head",children:[a.jsx("span",{className:"fc-card-title",children:t.title}),a.jsxs("button",{className:"fc-read-btn",onClick:w,children:[a.jsx(z,{size:16})," ",n==="bm"?"Dengar":"Listen"]})]}),a.jsxs("div",{className:"fc-card-scroll",children:[a.jsx("div",{className:"fc-card-text",children:t.text}),a.jsxs("div",{className:"fc-card-idea",children:[a.jsx("span",{className:"fc-card-idea-label",children:n==="bm"?"Idea Utama:":"Main Idea:"}),a.jsx("span",{children:t.idea})]})]})]}),a.jsxs("div",{className:"fc-pager",children:[a.jsx("button",{className:"fc-arrow",onClick:k,disabled:i===0,"aria-label":n==="bm"?"Cerita sebelum":"Previous story",children:a.jsx(S,{size:26})}),a.jsx("div",{className:"fc-dots",children:l.map((x,r)=>a.jsx("span",{className:`fc-dot${r===i?" active":""}${r<=d?" seen":""}`},r))}),a.jsx("button",{className:"fc-arrow",onClick:v,disabled:p,"aria-label":n==="bm"?"Cerita seterusnya":"Next story",children:a.jsx(F,{size:26})})]})]}),a.jsxs("div",{className:"fc-learn-cta",children:[a.jsxs("button",{className:"fc-learn-cta-btn",onClick:s,disabled:!c,children:["🎯 ",n==="bm"?"Sedia untuk Kuiz?":"Ready for Quiz?"]}),!c&&a.jsx("p",{className:"fc-learn-cta-hint",children:n==="bm"?"Baca semua cerita dahulu ya 📖":"Read all the stories first 📖"})]})]})]})]})}function K({onBack:m,language:s="bm",topicComplete:f,onNextTopic:n}){const[i,o]=u.useState("learn"),d=b[g]||[],h=b["1-1-6-dengar-teka"]||[],t=B(d,h,15),p=s==="bm"?"Fahami Cerita":"Understand Stories",c=()=>{m?.()};return i==="learn"?a.jsx(E,{onBack:c,onStartQuiz:()=>o("quiz"),topicTitle:p,language:s}):a.jsx(C,{onBack:c,topicId:g,topicComplete:f,onNextTopic:n,topicTitle:p,quiz:t,language:s,accentColor:e,onShowLearn:()=>o("learn")})}export{K as default};
