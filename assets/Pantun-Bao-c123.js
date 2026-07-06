import{r,j as a,B as T,p as A,S as N}from"./index-YCInXYg5.js";import{c as M}from"./confetti.module-oQXWb4Lk.js";import{u as K,B as $}from"./BMLessonQuizLayout-COWN8IiW.js";import{B as D}from"./BMHeader-B5cOc9J_.js";import{C as P}from"./check-C6i9M6rG.js";import{V as q}from"./volume-2-B9qgBXCR.js";import{L}from"./lock-4ihWSBlC.js";import{C as R}from"./chevron-left-BLXk0NUJ.js";import{C as Q}from"./chevron-right--_L4we7T.js";import"./utils-Direv13U.js";import"./StatsBar-Dt4MeuCr.js";import"./useGamification-g-vGaz2S.js";const B="1-4-2-pantun",t="#EC4899",F=70,c=[{title:"Pantun 1",lines:`Banyak udang banyak garam,
Banyak orang banyak ragam.`,style:"Pantun Dua Kerat",tema:"Kepelbagaian Sikap",maksud:"Setiap orang mempunyai sikap dan perangai yang berbeza-beza. Kita perlu bersabar dan menghormati perbezaan setiap orang.",notes:["Tema: Kepelbagaian Sikap Manusia","Maksud: Setiap orang berbeza sikap dan perangai"]},{title:"Pantun 2",lines:`Gendang gendut tali kecapi,
Kenyang perut suka hati.`,style:"Pantun Dua Kerat",tema:"Kesenangan",maksud:"Apabila perut sudah kenyang, hati akan berasa gembira dan puas. Makanan yang cukup membawa kebahagiaan.",notes:["Tema: Kesenangan","Maksud: Kenyang perut membawa kegembiraan"]},{title:"Pantun 3",lines:`Emas, perak, tembaga, suasa,
Malas bergerak tidak merasa.`,style:"Pantun Dua Kerat",tema:"Kerajinan",maksud:"Orang yang malas tidak akan mendapat apa-apa hasil. Kita perlu rajin berusaha untuk mencapai kejayaan.",notes:["Tema: Kerajinan","Maksud: Malas bergerak tidak akan merasa"]},{title:"Pantun 4",lines:`Pergi ke kedai membeli gula,
Jangan lupa beli sebuku roti.
Belajar rajin di sekolah,
Supaya pandai dan berbakti.`,style:"Pantun Empat Kerat",tema:"Pendidikan",maksud:"Kita perlu rajin belajar di sekolah supaya menjadi pandai dan dapat berbakti kepada keluarga, masyarakat, dan negara.",notes:["Tema: Pendidikan","Maksud: Rajin belajar supaya pandai dan berbakti"]},{title:"Pantun 5",lines:`Tingkap papan kayu bersegi,
Sampan sakat di Pulau Angsa.
Indah tampan kerana budi,
Tinggi bangsa kerana bahasa.`,style:"Pantun Empat Kerat",tema:"Budi Bahasa",maksud:"Seseorang itu dihargai kerana budi pekertinya, manakala bangsa dihormati kerana bahasanya. Jaga budi bahasa dan pertuturan.",notes:["Tema: Budi Bahasa","Maksud: Indah kerana budi, tinggi kerana bahasa"]},{title:"Pantun 6",lines:`Pisang emas dibawa belayar,
Masak sebiji di atas peti.
Hutang emas boleh dibayar,
Hutang budi dibawa mati.`,style:"Pantun Empat Kerat",tema:"Budi Pekerti",maksud:"Hutang wang boleh dibayar, tetapi budi baik orang lain tidak boleh dibalas dan akan dikenang sampai bila-bila. Hargailah budi baik orang.",notes:["Tema: Budi Pekerti","Maksud: Budi baik dikenang selamanya"]}];function I({pantunIndex:p,language:d,onBack:b,onNextPantun:n,onPantunPassed:i,isLastPantun:m,topicTitle:e,notes:l}){const o=(T[B]||[]).filter(u=>u.pantunIndex===p),g=Math.ceil(Math.max(o.length,1)/.7),s=K(o,[],g),x=r.useRef(!1);r.useEffect(()=>{s.finished&&!x.current&&(x.current=!0,(s.totalRounds>0?Math.round(s.score/s.totalRounds*100):0)>=F&&i(p))},[s.finished,s.score,s.totalRounds,i,p]),r.useEffect(()=>{s.finished||(x.current=!1)},[s.finished]);const k=l&&l.length>0?a.jsxs("div",{children:[a.jsxs("div",{className:"pn-result-extra-label",style:{fontFamily:"'Baloo 2', sans-serif",fontWeight:700,fontSize:"clamp(13px, 2.6vw, 15px)",color:"#475569",marginBottom:8},children:["📋 ",d==="bm"?"Nota Penting:":"Important Notes:"]}),l.map((u,y)=>a.jsx("div",{style:{fontFamily:"'Fredoka', sans-serif",fontWeight:500,fontSize:"clamp(12px, 2.4vw, 14px)",color:"#334155",lineHeight:1.7,padding:"3px 0"},children:u},y))]}):null;return a.jsx($,{onBack:b,topicId:B,topicTitle:e,quiz:s,language:d,accentColor:t,onNextTopic:m?void 0:n,passPct:F,subtitle:d==="bm"?"Fahami Maksud Pantun":"Understand the Pantun",resultExtra:k})}function H({onBack:p,onStartQuiz:d,topicTitle:b,language:n,currentPantun:i,onGoToPantun:m,completed:e,allDone:l}){const o=c[i],g=i===0,s=i===c.length-1,x=e[i],k=i===0||e.slice(0,i).every(Boolean),u=()=>m(Math.max(0,i-1)),y=()=>m(Math.min(c.length-1,i+1)),w=()=>{N.stopSpeaking(),N.speak(o.lines.replace(/\n/g," "),"ms-MY",{rate:.7,pitch:1})};return r.useEffect(()=>{if(l){A("streak");const v=setTimeout(()=>{M({particleCount:150,spread:100,origin:{y:.5}})},300);return()=>clearTimeout(v)}},[l]),a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
        .pn-learn-root {
          height: 100dvh; overflow: hidden;
          background: linear-gradient(180deg, #FEF1F7 0%, #FCE7F3 50%, #F9D5E7 100%);
          font-family: 'Fredoka', system-ui, sans-serif;
          display: flex; flex-direction: column;
        }
        .pn-learn-body {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column;
          align-items: center;
          width: 100%;
          padding: clamp(10px, 2.2vh, 22px) 16px clamp(8px, 1.8vh, 18px);
          overflow: hidden;
        }
        .pn-learn-heading {
          flex-shrink: 0; text-align: center; width: 100%;
          margin-top: 6px;
          margin-bottom: clamp(8px, 2vh, 16px);
        }
        .pn-learn-heading h1 {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(16px, min(4.6vw, 4.4vh), 24px);
          color: #1E293B; margin: 0;
        }
        .pn-learn-heading p {
          font-size: clamp(10px, min(2.8vw, 2vh), 13px);
          font-weight: 500; color: #475569; margin: 4px 0 0;
        }
        .pn-stage {
          flex: 1; min-height: 0; width: 100%; max-width: 520px;
          display: flex; flex-direction: column;
        }
        .pn-learn-card {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column;
          background: #fff; border-radius: clamp(16px, 2.6vw, 22px);
          border: 2.5px solid ${t}33;
          box-shadow: 0 6px 18px -8px rgba(0,0,0,.12);
          overflow: hidden;
        }
        .pn-card-head {
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: space-between; gap: 10px;
          padding: clamp(10px, 1.6vh, 16px) clamp(14px, 2vw, 20px);
          border-bottom: 1px solid ${t}18;
        }
        .pn-card-title-row {
          display: flex; align-items: center; gap: 8px;
          min-width: 0;
        }
        .pn-card-title {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(15px, min(3.8vw, 3.2vh), 20px);
          color: #1E293B;
        }
        .pn-card-badge {
          flex-shrink: 0;
          display: inline-flex; align-items: center; gap: 3px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: clamp(10px, min(2vw, 1.8vh), 12px);
          padding: 2px 8px;
          border-radius: 999px;
        }
        .pn-card-badge.done {
          background: #F0FDF4; color: #16A34A;
          border: 1.5px solid #BBF7D0;
        }
        .pn-read-btn {
          flex-shrink: 0;
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: clamp(12px, min(2.6vw, 2vh), 14px);
          color: #fff; background: ${t};
          border: none; border-radius: 999px;
          padding: clamp(5px, 0.9vh, 8px) clamp(10px, 2vw, 14px);
          cursor: pointer;
          box-shadow: 0 3px 0 ${t}66;
        }
        .pn-read-btn:active { transform: translateY(2px); box-shadow: 0 1px 0 ${t}66; }
        .pn-card-scroll {
          flex: 1; min-height: 0; overflow-y: auto;
          padding: clamp(10px, 1.8vw, 16px);
          display: flex; flex-direction: column; gap: 12px;
        }
        .pn-card-text {
          font-family: 'Baloo 2', sans-serif; font-style: italic;
          font-size: clamp(15px, min(3.6vw, 3vh), 19px);
          line-height: 1.9;
          color: #334155;
          font-weight: 600;
          white-space: pre-line;
          padding: 14px 16px;
          background: #FDF2F8;
          border-radius: 12px;
          border-left: 4px solid ${t}55;
        }
        .pn-card-style {
          font-size: clamp(11px, min(2.4vw, 2vh), 13px);
          font-weight: 600; color: ${t};
          text-align: center;
          background: #FEF1F7;
          border-radius: 999px;
          padding: 4px 14px;
          align-self: center;
        }
        .pn-maksud-box {
          background: #F8FAFC;
          border-radius: 12px;
          padding: 12px 14px;
          border: 1px solid #E2E8F0;
        }
        .pn-maksud-label {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(12px, min(2.8vw, 2.2vh), 14px);
          color: ${t};
          margin-bottom: 4px;
        }
        .pn-maksud-text {
          font-size: clamp(12px, min(2.8vw, 2.4vh), 15px);
          line-height: 1.6;
          color: #475569;
          font-weight: 500;
        }
        .pn-quiz-btn-wrap {
          flex-shrink: 0;
        }
        .pn-quiz-btn {
          width: 100%;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, min(3.4vw, 2.6vh), 17px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(10px, 1.6vh, 13px) 20px;
          transition: transform .12s ease, box-shadow .12s;
        }
        .pn-quiz-btn:active { transform: translateY(2px); }
        .pn-quiz-btn.ready {
          color: #fff;
          background: linear-gradient(180deg, ${t}cc, ${t});
          box-shadow: 0 4px 0 ${t}66;
        }
        .pn-quiz-btn.done {
          color: #16A34A; background: #F0FDF4;
          border: 2px solid #BBF7D0;
          cursor: default;
        }
        .pn-quiz-btn.locked {
          color: #94A3B8; background: #F1F5F9;
          border: 2px solid #E2E8F0;
          cursor: default;
          display: flex; align-items: center; justify-content: center; gap: 6px;
        }
        .pn-pager {
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px;
          margin-top: clamp(10px, 1.6vh, 14px);
        }
        .pn-arrow {
          flex-shrink: 0;
          width: clamp(40px, 7vh, 48px); height: clamp(40px, 7vh, 48px);
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%;
          background: #fff; border: 2px solid ${t};
          color: ${t}; cursor: pointer;
          transition: transform .12s;
        }
        .pn-arrow:active { transform: translateY(2px); }
        .pn-arrow:disabled { opacity: .35; cursor: default; border-color: #CBD5E1; color: #CBD5E1; }
        .pn-dots { display: flex; gap: 6px; }
        .pn-dot {
          width: 9px; height: 9px; border-radius: 50%;
          background: ${t}33; transition: background .2s, transform .2s;
        }
        .pn-dot.done { background: #16A34A; }
        .pn-dot.active { background: ${t}; transform: scale(1.35); }
        .pn-dot.locked { background: #CBD5E1; }
        .pn-all-done {
          flex-shrink: 0; text-align: center; width: 100%; max-width: 520px;
          margin-top: clamp(8px, 1.8vh, 16px);
        }
        .pn-all-done-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, min(3.8vw, 2.6vh), 18px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(10px, 1.9vh, 14px) 28px;
          color: #fff; width: 100%;
          background: linear-gradient(180deg, #16A34Acc, #16A34A);
          box-shadow: 0 4px 0 #16A34A66, 0 10px 20px -10px #16A34A80;
        }
        .pn-all-done-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 #16A34A66; }
        .pn-all-done-msg {
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: clamp(13px, min(2.8vw, 2.2vh), 15px);
          color: #166534; margin: 6px 0 10px;
        }
        @media (max-height: 480px) {
          .pn-learn-heading p { display: none; }
        }
      `}),a.jsxs("div",{className:"pn-learn-root",children:[a.jsx(D,{onBack:p,language:n,title:b}),a.jsxs("div",{className:"pn-learn-body",children:[a.jsxs("div",{className:"pn-learn-heading",children:[a.jsxs("h1",{children:["📜 ",n==="bm"?"Mari Belajar Pantun":"Let's Learn Pantun"]}),a.jsx("p",{children:n==="bm"?"Baca pantun, fahami tema dan maksudnya":"Read each pantun, understand its theme and meaning"})]}),a.jsxs("div",{className:"pn-stage",children:[a.jsxs("div",{className:"pn-learn-card",children:[a.jsxs("div",{className:"pn-card-head",children:[a.jsxs("div",{className:"pn-card-title-row",children:[a.jsxs("span",{className:"pn-card-title",children:[o.title," · ",o.style]}),x&&a.jsxs("span",{className:"pn-card-badge done",children:[a.jsx(P,{size:14})," ",n==="bm"?"Selesai":"Done"]})]}),a.jsxs("button",{className:"pn-read-btn",onClick:w,children:[a.jsx(q,{size:16})," ",n==="bm"?"Dengar":"Listen"]})]}),a.jsxs("div",{className:"pn-card-scroll",children:[a.jsx("div",{className:"pn-card-text",children:o.lines}),a.jsxs("div",{className:"pn-maksud-box",children:[a.jsxs("div",{className:"pn-maksud-label",children:["🎯 ",n==="bm"?"Tema:":"Theme:"," ",o.tema]}),a.jsx("div",{className:"pn-maksud-text",children:o.maksud})]}),a.jsx("div",{className:"pn-quiz-btn-wrap",children:x?a.jsxs("button",{className:"pn-quiz-btn done",disabled:!0,children:[a.jsx(P,{size:18,style:{verticalAlign:"middle",marginRight:4}}),n==="bm"?"Selesai":"Done"]}):k?a.jsxs("button",{className:"pn-quiz-btn ready",onClick:d,children:["🎯 ",n==="bm"?"Mulakan Kuiz":"Start Quiz"]}):a.jsxs("button",{className:"pn-quiz-btn locked",disabled:!0,children:[a.jsx(L,{size:16}),n==="bm"?"Selesaikan pantun sebelum ini":"Complete previous pantun"]})})]})]}),a.jsxs("div",{className:"pn-pager",children:[a.jsx("button",{className:"pn-arrow",onClick:u,disabled:g,"aria-label":n==="bm"?"Pantun sebelum":"Previous pantun",children:a.jsx(R,{size:24})}),a.jsx("div",{className:"pn-dots",children:c.map((v,h)=>a.jsx("span",{className:`pn-dot${e[h]?" done":""}${h===i?" active":""}${!e[h]&&h!==i?" locked":""}`},h))}),a.jsx("button",{className:"pn-arrow",onClick:y,disabled:s,"aria-label":n==="bm"?"Pantun seterusnya":"Next pantun",children:a.jsx(Q,{size:24})})]})]}),l&&a.jsxs("div",{className:"pn-all-done",children:[a.jsxs("p",{className:"pn-all-done-msg",children:["🎉 ",n==="bm"?"Tahniah! Kamu telah melengkapkan semua pantun!":"Congratulations! You completed all pantuns!"]}),a.jsx("button",{className:"pn-all-done-btn",onClick:p,children:n==="bm"?"← Kembali ke Trail":"← Back to Trail"})]})]})]})]})}function ea({onBack:p,language:d="bm",topicComplete:b,onNextTopic:n}){const[i,m]=r.useState("learn"),[e,l]=r.useState(0),[o,g]=r.useState([!1,!1,!1,!1,!1,!1]),[s,x]=r.useState(0),k=o.every(Boolean),u=e===c.length-1,y="Pantun",w=r.useCallback(()=>{p?.()},[p]),v=r.useCallback(f=>{g(j=>{if(j[f])return j;const z=[...j];return z[f]=!0,z.every(Boolean)&&setTimeout(()=>b?.(B),0),z})},[b]),h=r.useCallback(()=>{m("learn"),e+1<c.length&&l(e+1)},[e]),C=r.useCallback(()=>{m("learn")},[]),S=r.useCallback(f=>{l(f)},[]),E=r.useCallback(()=>{x(f=>f+1),m("quiz")},[]);return i==="quiz"?a.jsx(I,{pantunIndex:e,language:d,onBack:C,onNextPantun:h,onPantunPassed:v,isLastPantun:u,topicTitle:c[e].title+" · "+c[e].style,notes:c[e].notes},s):a.jsx(H,{onBack:w,onStartQuiz:E,topicTitle:y,language:d,currentPantun:e,onGoToPantun:S,completed:o,allDone:k})}export{ea as default};
