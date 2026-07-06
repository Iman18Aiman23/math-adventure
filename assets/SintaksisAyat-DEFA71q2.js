import{r as g,B as v,j as e}from"./index-YCInXYg5.js";import{u as w,B as E}from"./BMLessonQuizLayout-COWN8IiW.js";import{B}from"./BMHeader-B5cOc9J_.js";import"./utils-Direv13U.js";import"./confetti.module-oQXWb4Lk.js";import"./StatsBar-Dt4MeuCr.js";import"./useGamification-g-vGaz2S.js";const u="1-5-2-sintaksis-ayat",y="#159E96",F=[{sentence:"Adik bermain bola.",subjek:"Adik",predikat:"bermain bola",emoji:"⚽",subjekCat:"siapa"},{sentence:"Ibu memasak nasi.",subjek:"Ibu",predikat:"memasak nasi",emoji:"🍚",subjekCat:"siapa"},{sentence:"Kucing itu comel.",subjek:"Kucing itu",predikat:"comel",emoji:"🐱",subjekCat:"siapa"},{sentence:"Ayah membaca buku.",subjek:"Ayah",predikat:"membaca buku",emoji:"📖",subjekCat:"siapa"},{sentence:"Mereka belajar di kelas.",subjek:"Mereka",predikat:"belajar di kelas",emoji:"🏫",subjekCat:"siapa"}];function N({onBack:x,onStartQuiz:n,topicTitle:p,language:a}){const[d,l]=g.useState(null);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        .sx-root {
          height: 100dvh; overflow: hidden;
          background: #F5F9F8;
          background-image: radial-gradient(circle at 10% 90%, #159E9608 0%, transparent 50%),
                            radial-gradient(circle at 90% 10%, #159E9608 0%, transparent 50%);
          font-family: 'Fredoka', system-ui, sans-serif;
          display: flex; flex-direction: column;
          position: relative;
        }

        /* ── Body — scrollable but fills viewport ── */
        .sx-body {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column;
          overflow-y: auto;
          padding: clamp(12px, 2.4vh, 22px) 16px clamp(8px, 1.6vh, 14px);
          scrollbar-width: thin;
          scrollbar-color: #CBD5E1 transparent;
        }
        .sx-inner {
          width: 100%; max-width: 500px;
          margin: 0 auto;
          display: flex; flex-direction: column;
          flex: 1;
        }

        /* ── Hero block ── */
        .sx-hero {
          flex-shrink: 0;
          text-align: center;
          margin-bottom: clamp(10px, 2vh, 18px);
        }
        .sx-hero h1 {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(20px, min(5.2vw, 4.8vh), 30px);
          color: #1E293B; margin: 0 0 2px;
          line-height: 1.2;
        }
        .sx-hero p {
          margin: 0;
          font-size: clamp(12px, min(2.6vw, 2vh), 14px);
          font-weight: 500; color: #64748B;
        }

        /* ── Formula block "recipe" ── */
        .sx-recipe {
          flex-shrink: 0;
          background: #fff;
          border-radius: 20px;
          padding: clamp(14px, 2.2vh, 20px) clamp(16px, 3vw, 24px);
          border: 1.5px solid #159E9622;
          box-shadow: 0 8px 24px -12px rgba(21,158,150,.15);
          margin-bottom: clamp(10px, 1.8vh, 16px);
          position: relative;
          overflow: hidden;
        }
        .sx-recipe::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #3B82F6, #159E96, #F59E0B);
        }
        .sx-recipe-label {
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: clamp(10px, 2vw, 12px);
          color: #94A3B8; letter-spacing: .04em;
          margin-bottom: clamp(8px, 1.2vh, 12px);
          display: flex; align-items: center; gap: 6px;
        }
        .sx-recipe-row {
          display: flex; align-items: center; justify-content: center;
          gap: clamp(6px, 1.2vw, 10px);
          flex-wrap: wrap;
        }
        .sx-block {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(13px, min(3.2vw, 2.8vh), 17px);
          padding: clamp(6px, 1vh, 10px) clamp(12px, 2.4vw, 18px);
          border-radius: 999px;
          transition: transform .2s ease;
          box-shadow: 0 3px 10px -4px rgba(0,0,0,.10);
        }
        .sx-block:active { transform: scale(.95); }
        .sx-block.subjek {
          background: #EFF6FF; color: #1D4ED8;
          border: 1.5px solid #3B82F644;
        }
        .sx-block.predikat {
          background: #FFFBEB; color: #B45309;
          border: 1.5px solid #F59E0B44;
        }
        .sx-block.result {
          background: linear-gradient(135deg, #E6F6F4, #C6E9E5);
          color: #0F766E;
          border: 1.5px solid #159E9644;
          box-shadow: 0 3px 10px -4px rgba(21,158,150,.18);
        }
        .sx-block-icon {
          font-size: clamp(14px, 3vw, 18px);
          line-height: 1;
        }
        .sx-plus-badge {
          display: flex; align-items: center; justify-content: center;
          width: clamp(24px, 4.4vw, 30px); height: clamp(24px, 4.4vw, 30px);
          border-radius: 50%;
          background: #F1F5F9;
          color: #94A3B8;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, 3vw, 18px);
          flex-shrink: 0;
          box-shadow: inset 0 -1px 3px rgba(0,0,0,.04);
        }
        .sx-equals-badge {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(16px, 3.6vw, 22px);
          color: #159E96;
          flex-shrink: 0;
        }
        .sx-recipe-hint {
          margin-top: clamp(6px, 1vh, 10px);
          font-size: clamp(10px, min(2.4vw, 1.8vh), 12px);
          font-weight: 500; color: #94A3B8;
          text-align: center;
        }

        /* ── Sentence card list ── */
        .sx-list {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column;
          gap: clamp(8px, 1.2vh, 12px);
          padding: 2px 0;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: #CBD5E1 transparent;
        }
        .sx-card {
          flex-shrink: 0;
          background: #fff;
          border-radius: 18px;
          padding: clamp(12px, 1.6vh, 16px) clamp(14px, 2.2vw, 20px);
          border: 1.5px solid #159E9618;
          box-shadow: 0 4px 16px -10px rgba(0,0,0,.06);
          cursor: pointer;
          transition: all .22s cubic-bezier(.34,1.56,.64,1);
          -webkit-tap-highlight-color: transparent;
          position: relative;
          overflow: hidden;
        }
        .sx-card::before {
          content: '';
          position: absolute; top: 0; left: 0; bottom: 0;
          width: 4px;
          background: linear-gradient(180deg, #3B82F6, #159E96);
          border-radius: 0 2px 2px 0;
          opacity: 0;
          transition: opacity .25s ease;
        }
        .sx-card:hover { border-color: #159E9644; }
        .sx-card:hover::before { opacity: 1; }
        .sx-card.expanded {
          border-color: #159E96;
          box-shadow: 0 8px 24px -12px rgba(21,158,150,.18);
        }
        .sx-card.expanded::before { opacity: 1; }

        .sx-card-header {
          display: flex; align-items: center; gap: 10px;
        }
        .sx-card-emoji {
          font-size: clamp(24px, 5vw, 32px);
          flex-shrink: 0;
          line-height: 1;
        }
        .sx-card-text {
          flex: 1; min-width: 0;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: clamp(15px, min(3.6vw, 3.2vh), 20px);
          color: #1E293B;
          line-height: 1.3;
        }
        .sx-card-text span.subjek-highlight {
          color: #2563EB;
          background: #EFF6FF;
          padding: 0 4px;
          border-radius: 4px;
        }
        .sx-card-text span.predikat-highlight {
          color: #D97706;
          background: #FFFBEB;
          padding: 0 4px;
          border-radius: 4px;
        }
        .sx-card-chevron {
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          width: 24px; height: 24px;
          border-radius: 50%;
          background: #F1F5F9;
          color: #94A3B8;
          font-size: 12px;
          transition: transform .28s cubic-bezier(.34,1.56,.64,1), background .2s;
        }
        .sx-card-chevron.open { transform: rotate(180deg); background: #159E9622; color: #159E96; }

        .sx-card-body {
          overflow: hidden;
          max-height: 0;
          transition: max-height .38s cubic-bezier(.4,0,.2,1);
        }
        .sx-card-body.open { max-height: 300px; }
        .sx-card-split {
          margin-top: clamp(10px, 1.6vh, 14px);
          display: flex; gap: clamp(8px, 1.6vw, 12px);
        }
        .sx-card-split-col {
          flex: 1; min-width: 0;
          padding: clamp(8px, 1.2vh, 12px);
          border-radius: 14px;
          transition: transform .18s;
        }
        .sx-card-split-col:active { transform: scale(.96); }
        .sx-card-split-col.subjek {
          background: #EFF6FF;
          border: 1.5px solid #3B82F622;
          box-shadow: 0 3px 8px -6px #3B82F640;
        }
        .sx-card-split-col.predikat {
          background: #FFFBEB;
          border: 1.5px solid #F59E0B22;
          box-shadow: 0 3px 8px -6px #F59E0B40;
        }
        .sx-card-split-head {
          display: flex; align-items: center; gap: 6px;
          margin-bottom: 4px;
        }
        .sx-card-split-label {
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: clamp(9px, 2vw, 11px);
        }
        .sx-card-split-col.subjek .sx-card-split-label { color: #1D4ED8; }
        .sx-card-split-col.predikat .sx-card-split-label { color: #B45309; }
        .sx-card-split-desc {
          font-size: clamp(9px, 1.8vw, 10px);
          color: #94A3B8;
          font-weight: 500;
        }
        .sx-card-split-value {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(13px, min(3vw, 2.6vh), 17px);
          color: #1E293B;
          margin-top: 2px;
        }

        /* ── CTA ── */
        .sx-cta-wrap {
          flex-shrink: 0;
          text-align: center;
          padding: clamp(10px, 1.6vh, 16px) 0 0;
        }
        .sx-cta {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(16px, min(4vw, 3vh), 20px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(12px, 2vh, 16px) clamp(32px, 8vw, 48px);
          color: #fff; width: 100%; max-width: 360px;
          background: linear-gradient(135deg, #159E96, #0F766E);
          box-shadow: 0 6px 0 #0B5E5A, 0 12px 28px -12px rgba(21,158,150,.4);
          transition: transform .12s ease, box-shadow .12s;
          position: relative;
          animation: sx-glow 3s ease-in-out infinite;
          -webkit-tap-highlight-color: transparent;
        }
        .sx-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 0 #0B5E5A, 0 16px 32px -12px rgba(21,158,150,.5); }
        .sx-cta:active { transform: translateY(4px); box-shadow: 0 2px 0 #0B5E5A; }
        @keyframes sx-glow {
          0%, 100% { box-shadow: 0 6px 0 #0B5E5A, 0 12px 28px -12px rgba(21,158,150,.4); }
          50% { box-shadow: 0 6px 0 #0B5E5A, 0 12px 40px -8px rgba(21,158,150,.55); }
        }
        .sx-cta-icon { margin-right: 4px; }

        .sx-footer {
          flex-shrink: 0; text-align: center;
          padding: clamp(4px, .8vh, 8px) 16px clamp(6px, 1vh, 12px);
          font-size: 10px; font-weight: 500; color: #94A3B8;
        }

        @media (max-height: 520px) {
          .sx-hero p, .sx-footer, .sx-recipe-hint { display: none; }
        }
      `}),e.jsxs("div",{className:"sx-root",children:[e.jsx(B,{onBack:x,language:a,title:p}),e.jsx("div",{className:"sx-body",children:e.jsxs("div",{className:"sx-inner",children:[e.jsxs("div",{className:"sx-hero",children:[e.jsx("h1",{children:a==="bm"?"🧩 Bina Ayat Tunggal":"🧩 Build Simple Sentences"}),e.jsx("p",{children:a==="bm"?"Ketuk ayat untuk lihat bahagiannya":"Tap a sentence to see its parts"})]}),e.jsxs("div",{className:"sx-recipe",children:[e.jsxs("div",{className:"sx-recipe-label",children:[e.jsx("span",{children:"📐"}),e.jsx("span",{children:a==="bm"?"Formula Ayat Tunggal":"Simple Sentence Formula"})]}),e.jsxs("div",{className:"sx-recipe-row",children:[e.jsxs("span",{className:"sx-block subjek",children:[e.jsx("span",{className:"sx-block-icon",children:"👤"}),e.jsx("span",{children:a==="bm"?"SUBJEK":"SUBJECT"})]}),e.jsx("span",{className:"sx-plus-badge",children:"+"}),e.jsxs("span",{className:"sx-block predikat",children:[e.jsx("span",{className:"sx-block-icon",children:"⚡"}),e.jsx("span",{children:a==="bm"?"CERITA":"PREDICATE"})]}),e.jsx("span",{className:"sx-equals-badge",children:"="}),e.jsxs("span",{className:"sx-block result",children:[e.jsx("span",{className:"sx-block-icon",children:"✅"}),e.jsx("span",{children:a==="bm"?"AYAT TUNGGAL":"SENTENCE"})]})]}),e.jsx("div",{className:"sx-recipe-hint",children:a==="bm"?"🖱️ Ketuk mana-mana blok di atas (cuba tekan!)":"🖱️ Tap any block above (try it!)"})]}),e.jsx("div",{className:"sx-list",children:F.map((s,t)=>{const i=d===t;s.sentence.split(s.subjek),s.sentence.split(s.predikat);const r=s.sentence.indexOf(s.subjek);s.sentence.indexOf(s.predikat);let k=s.sentence.slice(0,r),j=s.sentence.slice(r,r+s.subjek.length),c=s.sentence.slice(r+s.subjek.length),o=c.indexOf(s.predikat),b="",h="",f="";return o!==-1&&(b=c.slice(0,o),h=c.slice(o,o+s.predikat.length),f=c.slice(o+s.predikat.length)),e.jsxs("div",{className:`sx-card${i?" expanded":""}`,onClick:()=>l(i?null:t),role:"button",tabIndex:0,onKeyDown:m=>{(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),l(i?null:t))},children:[e.jsxs("div",{className:"sx-card-header",children:[e.jsx("span",{className:"sx-card-emoji",children:s.emoji}),e.jsxs("div",{className:"sx-card-text",children:[k,e.jsx("span",{className:"subjek-highlight",children:j}),b,h&&e.jsx("span",{className:"predikat-highlight",children:h}),f]}),e.jsx("span",{className:`sx-card-chevron${i?" open":""}`,children:"▼"})]}),e.jsx("div",{className:`sx-card-body${i?" open":""}`,children:e.jsxs("div",{className:"sx-card-split",children:[e.jsxs("div",{className:"sx-card-split-col subjek",children:[e.jsxs("div",{className:"sx-card-split-head",children:[e.jsx("span",{style:{fontSize:14},children:"👤"}),e.jsx("span",{className:"sx-card-split-label",children:a==="bm"?"SUBJEK":"SUBJECT"}),e.jsxs("span",{className:"sx-card-split-desc",children:["(",a==="bm"?"siapa/apa?":"who/what?",")"]})]}),e.jsx("div",{className:"sx-card-split-value",children:s.subjek})]}),e.jsxs("div",{className:"sx-card-split-col predikat",children:[e.jsxs("div",{className:"sx-card-split-head",children:[e.jsx("span",{style:{fontSize:14},children:"⚡"}),e.jsx("span",{className:"sx-card-split-label",children:a==="bm"?"CERITA":"PREDICATE"}),e.jsxs("span",{className:"sx-card-split-desc",children:["(",a==="bm"?"cerita pasal subjek?":"about the subject?",")"]})]}),e.jsx("div",{className:"sx-card-split-value",children:s.predikat})]})]})})]},t)})}),e.jsx("div",{className:"sx-cta-wrap",children:e.jsxs("button",{className:"sx-cta",onClick:n,children:[e.jsx("span",{className:"sx-cta-icon",children:"🎯"}),a==="bm"?"Sedia untuk Kuiz?":"Ready for Quiz?"]})})]})}),e.jsxs("div",{className:"sx-footer",children:["Bahasa Melayu KSSR · ",p]})]})]})}function K({onBack:x,language:n="bm",topicComplete:p,onNextTopic:a}){const[d,l]=g.useState("learn"),s=v[u]||[],t=w(s,[],15),i=n==="bm"?"Ayat Tunggal":"Simple Sentences",r=()=>{x?.()};return d==="learn"?e.jsx(N,{onBack:r,onStartQuiz:()=>l("quiz"),topicTitle:i,language:n}):e.jsx(E,{onBack:r,topicId:u,topicComplete:p,onNextTopic:a,topicTitle:i,quiz:t,language:n,accentColor:y,onShowLearn:()=>l("learn")})}export{K as default};
