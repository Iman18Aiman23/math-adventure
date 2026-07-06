import{r as m,j as a}from"./index-YCInXYg5.js";import{B as h}from"./BMHeader-B5cOc9J_.js";import{C as f}from"./chevron-left-BLXk0NUJ.js";import{C as u}from"./chevron-right--_L4we7T.js";const l="#EC4899",r=[{title:"Bangun Pagi",lyrics:`Bangun pagi, gosok gigi,
Cuci muka, pakai baju.
Pergi sekolah dengan hati gembira,
Belajar rajin bersama-sama.`},{title:"Sayang Keluarga",lyrics:`Ayah, ibu, kakak, abang,
Sayang semuanya tidak terbilang.
Adik kecil comel dan manja,
Keluarga bahagia selama-lamanya.`}];function v({onBack:t,topicTitle:n,language:e,currentSong:i,onGoToSong:s}){const o=r[i],d=i===0,g=i===r.length-1,x=()=>s(Math.max(0,i-1)),p=()=>s(Math.min(r.length-1,i+1));return a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
        .lag-learn-root {
          height: 100dvh; overflow: hidden;
          background: linear-gradient(180deg, #FEF1F7 0%, #FCE7F3 50%, #F9D5E7 100%);
          font-family: 'Fredoka', system-ui, sans-serif;
          display: flex; flex-direction: column;
        }
        .lag-learn-body {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column;
          align-items: center;
          width: 100%;
          padding: clamp(10px, 2.2vh, 22px) 16px clamp(8px, 1.8vh, 18px);
          overflow: hidden;
        }
        .lag-learn-heading {
          flex-shrink: 0; text-align: center; width: 100%;
          margin-top: 6px;
          margin-bottom: clamp(8px, 2vh, 16px);
        }
        .lag-learn-heading h1 {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(16px, min(4.6vw, 4.4vh), 24px);
          color: #1E293B; margin: 0;
        }
        .lag-learn-heading p {
          font-size: clamp(10px, min(2.8vw, 2vh), 13px);
          font-weight: 500; color: #475569; margin: 4px 0 0;
        }
        .lag-stage {
          flex: 1; min-height: 0; width: 100%; max-width: 520px;
          display: flex; flex-direction: column;
        }
        .lag-learn-card {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column;
          background: #fff; border-radius: clamp(16px, 2.6vw, 22px);
          border: 2.5px solid ${l}33;
          box-shadow: 0 6px 18px -8px rgba(0,0,0,.12);
          overflow: hidden;
        }
        .lag-card-head {
          flex-shrink: 0;
          display: flex; align-items: center; gap: 10px;
          padding: clamp(12px, 1.8vh, 18px) clamp(14px, 2vw, 20px);
          border-bottom: 1px solid ${l}18;
        }
        .lag-card-title {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(16px, min(4vw, 3.4vh), 21px);
          color: #1E293B;
        }
        .lag-card-scroll {
          flex: 1; min-height: 0; overflow-y: auto;
          padding: clamp(12px, 2vw, 18px);
          display: flex; flex-direction: column; gap: 12px;
        }
        .lag-lyrics-box {
          background: #FDF2F8;
          border-radius: 14px;
          padding: clamp(16px, 3vw, 24px);
          text-align: center;
          border: 2px solid ${l}22;
        }
        .lag-lyrics-icon {
          font-size: clamp(32px, 8vw, 48px);
          margin-bottom: 12px;
        }
        .lag-lyrics {
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: clamp(17px, min(4.2vw, 3.6vh), 23px);
          line-height: 2;
          color: #334155;
          white-space: pre-line;
        }
        .lag-coming-soon {
          display: flex; flex-direction: column; align-items: center;
          gap: 10px;
          background: #FFFDE7;
          border: 2px dashed #F59E0B;
          border-radius: 14px;
          padding: clamp(16px, 3vw, 24px);
          text-align: center;
        }
        .lag-coming-soon-icon {
          font-size: clamp(28px, 6vw, 40px);
        }
        .lag-coming-soon-title {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(15px, min(3.4vw, 2.8vh), 19px);
          color: #D97706;
        }
        .lag-coming-soon-text {
          font-size: clamp(12px, min(2.6vw, 2.2vh), 15px);
          font-weight: 500;
          color: #92400E;
          line-height: 1.6;
          margin: 0;
        }
        .lag-pager {
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px;
          margin-top: clamp(10px, 1.6vh, 14px);
        }
        .lag-arrow {
          flex-shrink: 0;
          width: clamp(40px, 7vh, 48px); height: clamp(40px, 7vh, 48px);
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%;
          background: #fff; border: 2px solid ${l};
          color: ${l}; cursor: pointer;
          transition: transform .12s;
        }
        .lag-arrow:active { transform: translateY(2px); }
        .lag-arrow:disabled { opacity: .35; cursor: default; border-color: #CBD5E1; color: #CBD5E1; }
        .lag-dots { display: flex; gap: 6px; }
        .lag-dot {
          width: 9px; height: 9px; border-radius: 50%;
          background: ${l}33; transition: background .2s, transform .2s;
        }
        .lag-dot.active { background: ${l}; transform: scale(1.35); }
        .lag-footer {
          flex-shrink: 0; text-align: center;
          padding: clamp(4px, .8vh, 8px) 16px;
          font-size: 10px; font-weight: 500; color: #94A3B8;
        }
        @media (max-height: 480px) {
          .lag-learn-heading p { display: none; }
        }
      `}),a.jsxs("div",{className:"lag-learn-root",children:[a.jsx(h,{onBack:t,language:e,title:n}),a.jsxs("div",{className:"lag-learn-body",children:[a.jsxs("div",{className:"lag-learn-heading",children:[a.jsxs("h1",{children:["🎵 ",e==="bm"?"Lagu Kanak-Kanak":"Children's Songs"]}),a.jsx("p",{children:e==="bm"?"Baca lirik dan hayati lagu":"Read the lyrics and enjoy the songs"})]}),a.jsxs("div",{className:"lag-stage",children:[a.jsxs("div",{className:"lag-learn-card",children:[a.jsx("div",{className:"lag-card-head",children:a.jsxs("span",{className:"lag-card-title",children:["🎶 ",o.title]})}),a.jsxs("div",{className:"lag-card-scroll",children:[a.jsxs("div",{className:"lag-lyrics-box",children:[a.jsx("div",{className:"lag-lyrics-icon",children:"🎤"}),a.jsx("div",{className:"lag-lyrics",children:o.lyrics})]}),a.jsxs("div",{className:"lag-coming-soon",children:[a.jsx("div",{className:"lag-coming-soon-icon",children:"🎧"}),a.jsx("div",{className:"lag-coming-soon-title",children:e==="bm"?"Audio Akan Datang":"Audio Coming Soon"}),a.jsx("p",{className:"lag-coming-soon-text",children:e==="bm"?"Kami sedang menyediakan muzik untuk lagu ini. Nantikan kemas kini akan datang! Buat masa ini, bacalah lirik dan hayati lagu bersama keluarga.":"We are preparing music for this song. Stay tuned for future updates! For now, read the lyrics and enjoy the song with your family."})]})]})]}),a.jsxs("div",{className:"lag-pager",children:[a.jsx("button",{className:"lag-arrow",onClick:x,disabled:d,"aria-label":e==="bm"?"Lagu sebelum":"Previous song",children:a.jsx(f,{size:24})}),a.jsx("div",{className:"lag-dots",children:r.map((b,c)=>a.jsx("span",{className:`lag-dot${c===i?" active":""}`},c))}),a.jsx("button",{className:"lag-arrow",onClick:p,disabled:g,"aria-label":e==="bm"?"Lagu seterusnya":"Next song",children:a.jsx(u,{size:24})})]})]}),a.jsxs("div",{className:"lag-footer",children:["Bahasa Melayu KSSR · ",n]})]})]})]})}function N({onBack:t,language:n="bm"}){const[e,i]=m.useState(0),s=n==="bm"?"Lagu":"Songs",o=()=>{t?.()};return a.jsx(v,{onBack:o,topicTitle:s,language:n,currentSong:e,onGoToSong:i})}export{N as default};
