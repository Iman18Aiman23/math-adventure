import{r as s,j as a,B as F,S as T}from"./index-YCInXYg5.js";import{c as E}from"./confetti.module-oQXWb4Lk.js";import{u as P,B as q}from"./BMLessonQuizLayout-COWN8IiW.js";import{B as D}from"./BMHeader-B5cOc9J_.js";import{C}from"./check-C6i9M6rG.js";import{V as $}from"./volume-2-B9qgBXCR.js";import{L}from"./lock-4ihWSBlC.js";import{C as R}from"./chevron-left-BLXk0NUJ.js";import{C as K}from"./chevron-right--_L4we7T.js";import"./utils-Direv13U.js";import"./StatsBar-Dt4MeuCr.js";import"./useGamification-g-vGaz2S.js";const N="1-3-6-mencatat-maklumat",o="#7A4FD0",B=70,x=[{title:"Keluarga Saya",text:"Nama saya Ali. Saya berumur tujuh tahun. Saya tinggal di Kuala Lumpur. Saya mempunyai seorang abang dan seorang kakak. Hobi saya ialah membaca buku.",notes:["Nama: Ali","Umur: 7 tahun","Tempat tinggal: Kuala Lumpur","Adik-beradik: seorang abang, seorang kakak","Hobi: membaca buku"]},{title:"Haiwan Peliharaan",text:"Cikgu Siti mempunyai seekor kucing bernama Comel. Comel berwarna putih dan kelabu. Comel suka makan ikan. Setiap hari, Cikgu Siti memberi Comel minum susu.",notes:["Haiwan: kucing","Nama: Comel","Warna: putih dan kelabu","Makanan kegemaran: ikan","Minuman: susu"]},{title:"Lawatan ke Zoo",text:"Pada hari Sabtu, murid Tahun 1 melawat ke Zoo Negara. Mereka naik bas. Di zoo, mereka melihat gajah, harimau, dan monyet. Mereka makan tengah hari di kantin zoo.",notes:["Hari: Sabtu","Tempat: Zoo Negara","Kenderaan: bas","Haiwan dilihat: gajah, harimau, monyet","Makan tengah hari: di kantin zoo"]},{title:"Taman Permainan",text:"Taman Permainan Aman Bestari sangat luas. Ada buaian, gelongsor, dan jongkang-jongket. Banyak pokok bunga ditanam di tepi taman. Setiap petang, kanak-kanak bermain di sana dengan gembira.",notes:["Tempat: Taman Permainan Aman Bestari","Kemudahan: buaian, gelongsor, jongkang-jongket","Pokok: bunga di tepi taman","Masa: setiap petang","Suasana: gembira"]}];function Q({passageIndex:m,language:l,onBack:f,onNextPassage:e,onPassagePassed:t,isLastPassage:d,topicTitle:n,subtitle:c,notes:r}){const b=(F[N]||[]).filter(p=>p.passageIndex===m),k=Math.ceil(b.length/.7),i=P(b,[],k),u=s.useRef(!1);s.useEffect(()=>{i.finished&&!u.current&&(u.current=!0,(i.totalRounds>0?Math.round(i.score/i.totalRounds*100):0)>=B&&t(m))},[i.finished,i.score,i.totalRounds,t,m]),s.useEffect(()=>{i.finished||(u.current=!1)},[i.finished]);const v=r&&r.length>0?a.jsxs("div",{children:[a.jsxs("div",{className:"bm-result-extra-label",children:["📋 ",l==="bm"?"Nota Penting:":"Important Notes:"]}),r.map((p,w)=>a.jsx("div",{className:"bm-result-extra-item",children:p},w))]}):null;return a.jsx(q,{onBack:f,topicId:N,topicTitle:n,quiz:i,language:l,accentColor:o,onNextTopic:d?void 0:e,passPct:B,subtitle:c,resultExtra:v})}function I({onBack:m,onStartQuiz:l,topicTitle:f,language:e,currentPassage:t,onGoToPassage:d,completed:n,allDone:c}){const r=x[t],b=t===0,k=t===x.length-1,i=n[t],u=t===0||n.slice(0,t).every(Boolean),v=()=>d(Math.max(0,t-1)),p=()=>d(Math.min(x.length-1,t+1)),w=()=>T.speak(r.text,"ms");return s.useEffect(()=>{if(c){const j=setTimeout(()=>{E({particleCount:120,spread:80,origin:{y:.5}})},200);return()=>clearTimeout(j)}},[c]),a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
        .mmt-learn-root {
          height: 100dvh; overflow: hidden;
          background: linear-gradient(180deg, #F0EBFB 0%, #DCD2F4 50%, #C4B5ED 100%);
          font-family: 'Fredoka', system-ui, sans-serif;
          display: flex; flex-direction: column;
        }
        .mmt-learn-body {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column;
          align-items: center;
          width: 100%;
          padding: clamp(10px, 2.2vh, 22px) 16px clamp(8px, 1.8vh, 18px);
          overflow: hidden;
        }
        .mmt-learn-heading {
          flex-shrink: 0; text-align: center; width: 100%;
          margin-top: 8px;
          margin-bottom: clamp(10px, 2.4vh, 20px);
        }
        .mmt-learn-heading h1 {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(16px, min(4.6vw, 4.4vh), 26px);
          color: #1E293B; margin: 0;
        }
        .mmt-learn-heading p {
          font-size: clamp(10px, min(2.8vw, 2vh), 13px);
          font-weight: 500; color: #475569; margin: 4px 0 0;
        }
        .mmt-stage {
          flex: 1; min-height: 0; width: 100%; max-width: 520px;
          display: flex; flex-direction: column;
        }
        .mmt-learn-card {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column;
          background: #fff; border-radius: clamp(16px, 2.6vw, 22px);
          border: 2.5px solid ${o}33;
          box-shadow: 0 6px 18px -8px rgba(0,0,0,.12);
          overflow: hidden;
        }
        .mmt-card-head {
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: space-between; gap: 10px;
          padding: clamp(12px, 1.8vh, 18px) clamp(14px, 2vw, 20px);
          border-bottom: 1px solid ${o}18;
        }
        .mmt-card-title-row {
          display: flex; align-items: center; gap: 8px;
          min-width: 0;
        }
        .mmt-card-title {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(16px, min(4vw, 3.4vh), 21px);
          color: #1E293B;
        }
        .mmt-card-badge {
          flex-shrink: 0;
          display: inline-flex; align-items: center; gap: 3px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: clamp(10px, min(2vw, 1.8vh), 12px);
          padding: 2px 8px;
          border-radius: 999px;
        }
        .mmt-card-badge.done {
          background: #F0FDF4; color: #16A34A;
          border: 1.5px solid #BBF7D0;
        }
        .mmt-read-btn {
          flex-shrink: 0;
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: clamp(12px, min(2.6vw, 2vh), 14px);
          color: #fff; background: ${o};
          border: none; border-radius: 999px;
          padding: clamp(6px, 1vh, 9px) clamp(12px, 2.2vw, 16px);
          cursor: pointer;
          box-shadow: 0 3px 0 ${o}66;
        }
        .mmt-read-btn:active { transform: translateY(2px); box-shadow: 0 1px 0 ${o}66; }
        .mmt-card-scroll {
          flex: 1; min-height: 0; overflow-y: auto;
          padding: clamp(12px, 2vw, 18px);
          display: flex; flex-direction: column; gap: 12px;
        }
        .mmt-card-text {
          font-size: clamp(15px, min(3.6vw, 3vh), 19px);
          line-height: 1.85;
          color: #334155;
          font-weight: 500;
          padding: 14px 16px;
          background: #F8FAFC;
          border-radius: 12px;
          border: 1px solid #E2E8F0;
        }
        .mmt-quiz-btn-wrap {
          flex-shrink: 0;
        }
        .mmt-quiz-btn {
          width: 100%;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, min(3.4vw, 2.6vh), 17px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(10px, 1.6vh, 13px) 20px;
          transition: transform .12s ease, box-shadow .12s;
        }
        .mmt-quiz-btn:active { transform: translateY(2px); }
        .mmt-quiz-btn.ready {
          color: #fff;
          background: linear-gradient(180deg, ${o}cc, ${o});
          box-shadow: 0 4px 0 ${o}66;
        }
        .mmt-quiz-btn.done {
          color: #16A34A; background: #F0FDF4;
          border: 2px solid #BBF7D0;
          cursor: default;
        }
        .mmt-quiz-btn.locked {
          color: #94A3B8; background: #F1F5F9;
          border: 2px solid #E2E8F0;
          cursor: default;
          display: flex; align-items: center; justify-content: center; gap: 6px;
        }
        .mmt-pager {
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px;
          margin-top: clamp(10px, 1.8vh, 16px);
        }
        .mmt-arrow {
          flex-shrink: 0;
          width: clamp(44px, 8vh, 52px); height: clamp(44px, 8vh, 52px);
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%;
          background: #fff; border: 2px solid ${o};
          color: ${o}; cursor: pointer;
          transition: transform .12s;
        }
        .mmt-arrow:active { transform: translateY(2px); }
        .mmt-arrow:disabled { opacity: .35; cursor: default; border-color: #CBD5E1; color: #CBD5E1; }
        .mmt-dots { display: flex; gap: 8px; }
        .mmt-dot {
          width: 10px; height: 10px; border-radius: 50%;
          background: ${o}33; transition: background .2s, transform .2s;
        }
        .mmt-dot.done { background: #16A34A; }
        .mmt-dot.active { background: ${o}; transform: scale(1.35); }
        .mmt-dot.locked { background: #CBD5E1; }
        .mmt-all-done {
          flex-shrink: 0; text-align: center; width: 100%; max-width: 520px;
          margin-top: clamp(10px, 2vh, 18px);
        }
        .mmt-all-done-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, min(3.8vw, 2.6vh), 18px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(10px, 1.9vh, 14px) 28px;
          color: #fff; width: 100%;
          background: linear-gradient(180deg, #16A34Acc, #16A34A);
          box-shadow: 0 4px 0 #16A34A66, 0 10px 20px -10px #16A34A80;
        }
        .mmt-all-done-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 #16A34A66; }
        .mmt-all-done-msg {
          font-size: clamp(12px, min(2.6vw, 2vh), 14px);
          font-weight: 600; color: #166534; margin: 6px 0 10px;
        }
        @media (max-height: 480px) {
          .mmt-learn-heading p { display: none; }
        }
      `}),a.jsxs("div",{className:"mmt-learn-root",children:[a.jsx(D,{onBack:m,language:e,title:f}),a.jsxs("div",{className:"mmt-learn-body",children:[a.jsxs("div",{className:"mmt-learn-heading",children:[a.jsx("h1",{children:e==="bm"?"Mari Mencatat Maklumat 📝":"Let's Record Information 📝"}),a.jsx("p",{children:e==="bm"?"Baca petikan, kemudian jawab kuiz setiap satu":"Read each passage, then answer its quiz"})]}),a.jsxs("div",{className:"mmt-stage",children:[a.jsxs("div",{className:"mmt-learn-card",children:[a.jsxs("div",{className:"mmt-card-head",children:[a.jsxs("div",{className:"mmt-card-title-row",children:[a.jsx("span",{className:"mmt-card-title",children:r.title}),i&&a.jsxs("span",{className:"mmt-card-badge done",children:[a.jsx(C,{size:14})," ",e==="bm"?"Selesai":"Done"]})]}),a.jsxs("button",{className:"mmt-read-btn",onClick:w,children:[a.jsx($,{size:16})," ",e==="bm"?"Dengar":"Listen"]})]}),a.jsxs("div",{className:"mmt-card-scroll",children:[a.jsx("div",{className:"mmt-card-text",children:r.text}),a.jsx("div",{className:"mmt-quiz-btn-wrap",children:i?a.jsxs("button",{className:"mmt-quiz-btn done",disabled:!0,children:[a.jsx(C,{size:18,style:{verticalAlign:"middle",marginRight:4}}),e==="bm"?"Selesai":"Done"]}):u?a.jsxs("button",{className:"mmt-quiz-btn ready",onClick:l,children:["🎯 ",e==="bm"?"Mulakan Kuiz":"Start Quiz"]}):a.jsxs("button",{className:"mmt-quiz-btn locked",disabled:!0,children:[a.jsx(L,{size:16}),e==="bm"?"Selesaikan petikan sebelum ini":"Complete previous passage"]})})]})]}),a.jsxs("div",{className:"mmt-pager",children:[a.jsx("button",{className:"mmt-arrow",onClick:v,disabled:b,"aria-label":e==="bm"?"Petikan sebelum":"Previous passage",children:a.jsx(R,{size:26})}),a.jsx("div",{className:"mmt-dots",children:x.map((j,h)=>a.jsx("span",{className:`mmt-dot${n[h]?" done":""}${h===t?" active":""}${!n[h]&&h!==t?" locked":""}`},h))}),a.jsx("button",{className:"mmt-arrow",onClick:p,disabled:k,"aria-label":e==="bm"?"Petikan seterusnya":"Next passage",children:a.jsx(K,{size:26})})]})]}),c&&a.jsxs("div",{className:"mmt-all-done",children:[a.jsxs("p",{className:"mmt-all-done-msg",children:["🎉 ",e==="bm"?"Tahniah! Kamu telah melengkapkan semua petikan!":"Congratulations! You completed all passages!"]}),a.jsx("button",{className:"mmt-all-done-btn",onClick:m,children:e==="bm"?"← Kembali ke Trail":"← Back to Trail"})]})]})]})]})}function ea({onBack:m,language:l="bm",topicComplete:f,onNextTopic:e}){const[t,d]=s.useState("learn"),[n,c]=s.useState(0),[r,b]=s.useState([!1,!1,!1,!1]),[k,i]=s.useState(0),u=r.every(Boolean),v=n===x.length-1,p=l==="bm"?"Mencatat Maklumat":"Recording Information",w=s.useCallback(()=>{m?.()},[m]),j=s.useCallback(g=>{b(y=>{if(y[g])return y;const z=[...y];return z[g]=!0,z.every(Boolean)&&setTimeout(()=>f?.(N),0),z})},[f]),h=s.useCallback(()=>{d("learn"),n+1<x.length&&c(n+1)},[n]),A=s.useCallback(()=>{d("learn")},[]),S=s.useCallback(g=>{c(g)},[]),M=s.useCallback(()=>{i(g=>g+1),d("quiz")},[]);return t==="quiz"?a.jsx(Q,{passageIndex:n,language:l,onBack:A,onNextPassage:h,onPassagePassed:j,isLastPassage:v,topicTitle:x[n].title,subtitle:l==="bm"?"Mencatat Nota Penting":"Recording Important Notes",notes:x[n].notes},k):a.jsx(I,{onBack:w,onStartQuiz:M,topicTitle:p,language:l,currentPassage:n,onGoToPassage:S,completed:r,allDone:u})}export{ea as default};
