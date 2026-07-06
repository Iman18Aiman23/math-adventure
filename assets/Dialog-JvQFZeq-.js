import{r as p,j as e,p as q}from"./index-YCInXYg5.js";import{B as K}from"./BMHeader-B5cOc9J_.js";import{c as I}from"./confetti.module-oQXWb4Lk.js";import{u as xe}from"./useTopicGamification-I1kCte-J.js";import"./useGamification-g-vGaz2S.js";const r="#EC4899",me="1-4-1-dialog",F=[{title:"Di Kantin",lines:[{speaker:"Ali",text:"Selamat pagi, Cikgu!"},{speaker:"Cikgu Siti",text:"Selamat pagi, Ali. Dah sarapan?"},{speaker:"Ali",text:"Belum lagi, Cikgu. Saya nak beli nasi lemak."},{speaker:"Cikgu Siti",text:"Bagus. Jangan lupa minum air ya."},{speaker:"Ali",text:"Baik, Cikgu. Terima kasih!"}]},{title:"Di Perpustakaan",lines:[{speaker:"Cikgu Rina",text:"Murid-murid, jangan bising di perpustakaan."},{speaker:"Ani",text:"Maaf, Cikgu. Kami nak pinjam buku."},{speaker:"Cikgu Rina",text:"Boleh. Pilih buku yang kamu suka."},{speaker:"Adam",text:"Saya nak pinjam buku cerita, Cikgu."},{speaker:"Cikgu Rina",text:"Bagus, Adam. Rajin membaca ya."}]},{title:"Di Kantin",lines:[{speaker:"Aina",text:"Selamat pagi, Mak Cik."},{speaker:"Mak Cik Kantin",text:"Selamat pagi, Aina. Aina hendak beli apa?"},{speaker:"Aina",text:"Saya hendak beli roti dan susu."},{speaker:"Mak Cik Kantin",text:"Baik. Ini roti dan susu kamu."},{speaker:"Aina",text:"Terima kasih, Mak Cik."},{speaker:"Mak Cik Kantin",text:"Sama-sama."}]},{title:"Di Perpustakaan",lines:[{speaker:"Cikgu Rina",text:"Murid-murid, jangan buat bising di perpustakaan."},{speaker:"Iman",text:"Maaf, Cikgu."},{speaker:"Cikgu Rina",text:"Tidak mengapa. Kamu hendak buat apa di sini?"},{speaker:"Iman",text:"Kami hendak meminjam buku, Cikgu."},{speaker:"Cikgu Rina",text:"Baik. Buku apa yang kamu mahu pinjam?"},{speaker:"Adam",text:"Saya mahu meminjam buku cerita, Cikgu."},{speaker:"Cikgu Rina",text:"Bagus, Adam. Rajin membaca buku ya."},{speaker:"Adam",text:"Baik, Cikgu. Terima kasih."}]},{title:"Di Dalam Kelas",lines:[{speaker:"Cikgu Farah",text:"Murid-murid, adakah kerja rumah sudah siap?"},{speaker:"Rizal",text:"Ya, Cikgu. Saya sudah siap."},{speaker:"Cikgu Farah",text:"Bagus, Rizal."},{speaker:"Rizal",text:"Terima kasih, Cikgu."},{speaker:"Cikgu Farah",text:"Teruskan usaha kamu."},{speaker:"Rizal",text:"Baik, Cikgu."}]},{title:"Di Taman Permainan",lines:[{speaker:"Adam",text:"Hai, Amir!"},{speaker:"Amir",text:"Hai, Adam."},{speaker:"Adam",text:"Jom bermain bola."},{speaker:"Amir",text:"Baik. Mari kita main bersama."},{speaker:"Adam",text:"Saya suka bermain bola dengan awak."},{speaker:"Amir",text:"Ya, saya juga."}]}],Q=n=>[...n].sort(()=>Math.random()-.5);function he(n){const a=n.lines.find(i=>!j(i.speaker));return a?a.speaker:n.lines[0].speaker}const ge=()=>(localStorage.getItem("playerName")||"").trim();function fe(n,a,i){return i?n.replace(new RegExp(`\\b${a}\\b`,"g"),i):n}const w="ready",y="typing",X="correct",Z="wrong",ee="complete",o={primary:r,primaryDark:"#C2186B",correct:"#4CAF50",correctDark:"#388E3C",wrong:"#FF6B6B",wrongDark:"#D32F2F"},ae=`
  .drp-root {
    --sp-1: clamp(4px, 0.8vh, 8px);
    --sp-2: clamp(8px, 1.6vh, 14px);
    height: 100dvh; overflow: hidden;
    background:
      radial-gradient(ellipse 75% 55% at 12% 0%, ${r}1c 0%, transparent 58%),
      radial-gradient(ellipse 65% 48% at 90% 100%, ${r}14 0%, transparent 62%),
      linear-gradient(180deg, #FEF6FA 0%, #FCEEF5 55%, #F9E2EE 100%);
    font-family: 'Fredoka', system-ui, sans-serif;
    display: flex; flex-direction: column;
  }
  .drp-body {
    flex: 1; min-height: 0;
    display: flex; flex-direction: column;
    width: 100%; max-width: 560px;
    margin: 0 auto;
    padding: var(--sp-2) clamp(14px, 3.5vw, 24px) 0;
  }
  .drp-stats {
    flex-shrink: 0; width: 100%;
    display: flex; align-items: center; justify-content: space-between;
    gap: 8px; margin-bottom: var(--sp-1);
  }
  .drp-pill {
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(11px, 2vh, 13px);
    border-radius: 999px;
    padding: clamp(3px, 0.7vh, 5px) clamp(10px, 2.4vw, 14px);
    white-space: nowrap;
    min-width: 0; overflow: hidden; text-overflow: ellipsis;
  }
  .drp-pill.prog { background: #fff; color: ${o.primaryDark}; border: 1.5px solid ${o.primary}44; }
  .drp-pill.star { background: #FFF6D6; color: #B58800; border: 1.5px solid #FFE08A; }
  .drp-pill.fire { background: #FFEAD0; color: #D9610B; border: 1.5px solid #FFC081; }
  .drp-pill.life { background: #FFE9EC; color: #E11D48; border: 1.5px solid #FCA5B4; }
  .drp-pill.gem  { background: #E0F2FE; color: #0369A1; border: 1.5px solid #7DD3FC; }
  .drp-bar-wrap {
    flex-shrink: 0; width: 100%;
    background: #FBCFE8; border-radius: 999px;
    height: clamp(6px, 1.2vh, 9px); overflow: hidden;
    margin-bottom: var(--sp-2);
  }
  .drp-bar-fill {
    background: linear-gradient(90deg, ${o.primary}, #F472B6);
    height: 100%; border-radius: 999px;
    transition: width 0.3s;
  }

  .drp-chat-card {
    flex: 1; min-height: 0; width: 100%;
    display: flex; flex-direction: column;
    background: #fff;
    border: 2.5px solid ${r}33;
    border-radius: clamp(18px, 3vh, 26px);
    box-shadow: 0 4px 0 ${r}2e, 0 16px 34px -18px rgba(0,0,0,.18);
    overflow: hidden;
  }
  .drp-chat-head {
    flex-shrink: 0;
    display: flex; align-items: center; justify-content: space-between;
    gap: 10px;
    padding: clamp(8px, 1.6vh, 12px) clamp(12px, 3vw, 18px);
    border-bottom: 1.5px solid #FCE7F3;
    background: linear-gradient(180deg, #FDF2F8, #fff);
  }
  .drp-chat-title {
    min-width: 0;
    display: flex; align-items: center; gap: 8px;
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(12px, 2.4vh, 15px);
    color: #9D174D;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .drp-role-pill {
    flex-shrink: 0;
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(10px, 1.9vh, 12px);
    color: #fff;
    background: linear-gradient(180deg, ${r}cc, ${r});
    border-radius: 999px;
    padding: clamp(3px, 0.7vh, 5px) clamp(10px, 2.4vw, 14px);
    white-space: nowrap;
  }
  .drp-chat {
    flex: 1; min-height: 0;
    overflow-y: auto;
    padding: clamp(10px, 2vh, 16px) clamp(10px, 2.6vw, 16px);
    display: flex; flex-direction: column;
    gap: clamp(8px, 1.6vh, 12px);
    background: linear-gradient(180deg, #FFFBFD, #FDF5F9);
  }
  .drp-msg {
    display: flex; align-items: flex-end; gap: 8px;
    max-width: 88%;
  }
  .drp-msg.left  { align-self: flex-start; }
  .drp-msg.right { align-self: flex-end; flex-direction: row-reverse; }
  .drp-avatar {
    flex-shrink: 0;
    width: clamp(28px, 5vh, 36px); height: clamp(28px, 5vh, 36px);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: clamp(14px, 2.6vh, 18px);
    background: #FDF2F8;
    border: 1.5px solid ${r}2a;
  }
  .drp-msg.right .drp-avatar { background: ${r}14; }
  .drp-bubble-wrap { min-width: 0; }
  .drp-name {
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(9px, 1.8vh, 11px);
    color: #94A3B8;
    margin: 0 6px 2px;
  }
  .drp-msg.right .drp-name { text-align: right; color: ${r}; }
  .drp-typing {
    display: inline-flex; gap: 4px; align-items: center;
    padding: 3px 2px;
  }
  .drp-typing i {
    width: clamp(6px, 1.1vh, 8px); height: clamp(6px, 1.1vh, 8px);
    border-radius: 50%; background: #D8A7C2;
    animation: drp-dot 1.1s ease-in-out infinite;
  }
  .drp-typing i:nth-child(2) { animation-delay: .18s; }
  .drp-typing i:nth-child(3) { animation-delay: .36s; }
  @keyframes drp-dot {
    0%, 60%, 100% { transform: translateY(0); opacity: .45; }
    30% { transform: translateY(-3px); opacity: 1; }
  }
  .drp-bubble {
    display: block;
    text-align: left;
    font-weight: 600;
    font-size: clamp(12px, 2.4vh, 15px);
    line-height: 1.45;
    border-radius: 16px;
    padding: clamp(7px, 1.4vh, 10px) clamp(11px, 2.6vw, 14px);
  }
  .drp-msg.left .drp-bubble {
    background: #fff; color: #334155;
    border: 1.5px solid #F3E0EB;
    border-bottom-left-radius: 6px;
    box-shadow: 0 2px 6px -2px rgba(0,0,0,.08);
  }
  .drp-msg.right .drp-bubble {
    background: linear-gradient(180deg, ${r}d9, ${r});
    color: #fff; border: 1.5px solid transparent;
    border-bottom-right-radius: 6px;
    box-shadow: 0 3px 8px -3px ${r}80;
  }
  .drp-msg.right.missed .drp-bubble {
    background: #F1F5F9; color: #94A3B8;
    border-color: #E2E8F0; box-shadow: none;
  }
  .drp-mark { font-size: .85em; margin-left: 6px; }

  .drp-dock {
    flex-shrink: 0;
    width: 100%; max-width: 560px;
    margin: 0 auto;
    padding: var(--sp-1) clamp(14px, 3.5vw, 24px) clamp(10px, 2vh, 16px);
    display: flex; flex-direction: column;
    gap: var(--sp-1);
  }
  .drp-turn {
    background: #fff;
    border: 2.5px solid ${r}55;
    border-radius: clamp(14px, 2.4vh, 20px);
    box-shadow: 0 3px 0 ${r}2e;
    padding: clamp(8px, 1.6vh, 12px) clamp(12px, 3vw, 18px);
    text-align: center;
    transition: background 0.3s, border-color 0.3s;
  }
  .drp-turn.correct { border-color: ${o.correct}; background: #F0FFF0; }
  .drp-turn.wrong   { border-color: ${o.wrong};   background: #FFF0F0; }
  .drp-turn-label {
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(9px, 1.8vh, 11px); letter-spacing: 0.12em;
    color: ${o.primaryDark};
    margin-bottom: 2px;
  }
  .drp-opts {
    display: flex; flex-direction: column;
    gap: clamp(6px, 1.2vh, 9px);
    margin-top: clamp(6px, 1.2vh, 9px);
  }
  .drp-opt {
    font-family: 'Baloo 2', sans-serif; font-weight: 700;
    font-size: clamp(12px, 2.4vh, 15px);
    text-align: left; line-height: 1.35;
    padding: clamp(8px, 1.6vh, 11px) clamp(12px, 2.8vw, 16px);
    border: 2px solid #E2E8F0; border-radius: 12px;
    background: #F8FAFC; color: #334155;
    cursor: pointer;
    box-shadow: 0 2px 0 #E2E8F0;
    transition: transform .12s ease, background .2s, border-color .2s, color .2s;
  }
  .drp-opt:active { transform: translateY(1px); }
  .drp-opt:disabled { cursor: default; }
  @media (hover: hover) {
    .drp-opt:not(:disabled):hover { border-color: ${r}; background: #FDF2F8; }
  }
  .drp-opt.correct { background: #F0FFF0; border-color: ${o.correct}; color: ${o.correctDark}; box-shadow: 0 2px 0 ${o.correct}55; }
  .drp-opt.wrong   { background: #FFF0F0; border-color: ${o.wrong};   color: ${o.wrongDark}; box-shadow: 0 2px 0 ${o.wrong}55; }
  .drp-status {
    min-height: clamp(22px, 4vh, 30px);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 4px; text-align: center;
  }
  .drp-status-text {
    font-weight: 700; font-size: clamp(12px, 2.4vh, 15px);
    color: #8A7860; max-width: 360px; line-height: 1.4; margin: 0;
  }
  .drp-status-text.warn { color: #D9610B; }
  .drp-status-text.live { color: ${o.primary}; font-family: 'Baloo 2', sans-serif; font-weight: 800; }
  .drp-center {
    flex: 1; min-height: 0;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: var(--sp-2); padding: 16px; text-align: center;
  }

  /* ── Desktop / laptop scale-up ─────────────────────────────── */
  @media (min-width: 900px) {
    .drp-body, .drp-dock { max-width: 760px; }
    .drp-pill { font-size: min(14px, 2.2vh); }
    .drp-chat-head { padding: min(14px, 1.8vh) 22px; }
    .drp-chat-title { font-size: min(17px, 2.7vh); }
    .drp-role-pill { font-size: min(13px, 2.1vh); }
    .drp-chat { padding: min(20px, 2.4vh) 22px; gap: min(14px, 1.8vh); }
    .drp-msg { max-width: 75%; }
    .drp-avatar { width: min(42px, 6vh); height: min(42px, 6vh); font-size: min(21px, 3vh); }
    .drp-name { font-size: min(12px, 2vh); }
    .drp-bubble { font-size: min(16px, 2.6vh); padding: min(11px, 1.6vh) 16px; border-radius: 18px; }
    .drp-opt { font-size: min(16px, 2.6vh); }
  }
`,ue={"Di Kantin":"🍽️","Di Perpustakaan":"📚","Di Dalam Kelas":"🏫","Di Taman Permainan":"⚽"},re={"Cikgu Siti":"👩‍🏫","Cikgu Rina":"👩‍🏫","Cikgu Farah":"👩‍🏫","Mak Cik Kantin":"👵",Ali:"👦",Adam:"👦",Amir:"👦",Iman:"👦",Rizal:"👦",Ani:"👧",Aina:"👧"},j=n=>/cikgu|mak cik/i.test(n);function be(n){const a={},i=n.lines.some(s=>j(s.speaker));let h=0;return n.lines.forEach(s=>{if(!a[s.speaker]){if(j(s.speaker)){a[s.speaker]="left";return}a[s.speaker]=i||h%2===0?"right":"left",h++}}),a}const D=(()=>{const n={};F.forEach(i=>{n[i.title]=(n[i.title]||0)+1});const a={};return F.map(i=>(a[i.title]=(a[i.title]||0)+1,{emoji:ue[i.title]||"💬",label:n[i.title]>1?`${i.title} ${a[i.title]}`:i.title}))})();function ke({onBack:n,onStartRoleplay:a,topicTitle:i,language:h,scene:s,onSceneChange:x}){const b=F[s],C=be(b);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        .dlg-learn-root {
          --sp-1: clamp(4px, 0.8vh, 8px);
          --sp-2: clamp(8px, 1.6vh, 14px);
          height: 100dvh; overflow: hidden;
          background:
            radial-gradient(ellipse 75% 55% at 12% 0%, ${r}1c 0%, transparent 58%),
            radial-gradient(ellipse 65% 48% at 90% 100%, ${r}14 0%, transparent 62%),
            linear-gradient(180deg, #FEF6FA 0%, #FCEEF5 55%, #F9E2EE 100%);
          font-family: 'Fredoka', system-ui, sans-serif;
          display: flex; flex-direction: column;
        }
        .dlg-learn-body {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column;
          align-items: center;
          width: 100%; max-width: 560px;
          margin: 0 auto;
          padding: var(--sp-2) clamp(14px, 3.5vw, 24px) 0;
        }

        .dlg-chat-card {
          flex: 1; min-height: 0; width: 100%;
          display: flex; flex-direction: column;
          background: #fff;
          border: 2.5px solid ${r}33;
          border-radius: clamp(18px, 3vh, 26px);
          box-shadow: 0 4px 0 ${r}2e, 0 16px 34px -18px rgba(0,0,0,.18);
          overflow: hidden;
        }
        .dlg-chat-head {
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: space-between;
          gap: 10px;
          padding: clamp(10px, 1.8vh, 14px) clamp(12px, 3vw, 18px);
          border-bottom: 1.5px solid #FCE7F3;
          background: linear-gradient(180deg, #FDF2F8, #fff);
        }
        .dlg-head-label {
          flex-shrink: 0;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(12px, 2.4vh, 15px);
          color: #9D174D;
        }
        .dlg-select-wrap {
          position: relative;
          flex: 1; min-width: 0; max-width: 320px;
        }
        .dlg-select {
          width: 100%;
          appearance: none; -webkit-appearance: none;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(12px, 2.3vh, 14px);
          color: #9D174D;
          background: #fff;
          border: 1.5px solid ${r}44;
          border-radius: 999px;
          padding: clamp(6px, 1.2vh, 9px) 34px clamp(6px, 1.2vh, 9px) clamp(12px, 2.8vw, 16px);
          box-shadow: 0 2px 0 ${r}22;
          cursor: pointer;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          transition: border-color .15s;
        }
        .dlg-select:focus { outline: none; border-color: ${r}; }
        .dlg-select-arrow {
          position: absolute; right: 14px; top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: ${r};
          font-size: clamp(12px, 2.2vh, 14px);
        }

        .dlg-chat {
          flex: 1; min-height: 0;
          overflow-y: auto;
          padding: clamp(10px, 2vh, 16px) clamp(10px, 2.6vw, 16px);
          display: flex; flex-direction: column;
          gap: clamp(8px, 1.6vh, 12px);
          background: linear-gradient(180deg, #FFFBFD, #FDF5F9);
        }
        .dlg-msg {
          display: flex; align-items: flex-end; gap: 8px;
          max-width: 88%;
        }
        .dlg-msg.left  { align-self: flex-start; }
        .dlg-msg.right { align-self: flex-end; flex-direction: row-reverse; }
        .dlg-avatar {
          flex-shrink: 0;
          width: clamp(30px, 5.4vh, 38px); height: clamp(30px, 5.4vh, 38px);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(15px, 2.8vh, 19px);
          background: #FDF2F8;
          border: 1.5px solid ${r}2a;
        }
        .dlg-msg.right .dlg-avatar { background: ${r}14; }
        .dlg-bubble-wrap { min-width: 0; }
        .dlg-name {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(9px, 1.8vh, 11px);
          color: #94A3B8;
          margin: 0 6px 2px;
        }
        .dlg-msg.right .dlg-name { text-align: right; color: ${r}; }
        .dlg-bubble {
          display: block;
          text-align: left;
          font-family: 'Fredoka', sans-serif; font-weight: 600;
          font-size: clamp(12px, 2.4vh, 15px);
          line-height: 1.45;
          border-radius: 16px;
          padding: clamp(7px, 1.4vh, 10px) clamp(11px, 2.6vw, 14px);
        }
        .dlg-msg.left .dlg-bubble {
          background: #fff; color: #334155;
          border: 1.5px solid #F3E0EB;
          border-bottom-left-radius: 6px;
          box-shadow: 0 2px 6px -2px rgba(0,0,0,.08);
        }
        .dlg-msg.right .dlg-bubble {
          background: linear-gradient(180deg, ${r}d9, ${r});
          color: #fff; border: 1.5px solid transparent;
          border-bottom-right-radius: 6px;
          box-shadow: 0 3px 8px -3px ${r}80;
        }
        .dlg-cta {
          flex-shrink: 0; display: flex; justify-content: center;
          width: 100%; max-width: 420px;
          padding: clamp(8px, 1.6vh, 12px) 0 clamp(8px, 1.6vh, 12px);
        }
        .dlg-cta-btn {
          flex: 1; min-width: 0;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, 2.6vh, 17px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(10px, 2vh, 13px) clamp(10px, 3vw, 28px);
          color: #fff;
          background: linear-gradient(180deg, ${r}cc, ${r});
          box-shadow: 0 4px 0 ${o.primaryDark}, 0 10px 20px -10px ${r}80;
          transition: transform .12s ease, box-shadow .12s;
        }
        .dlg-cta-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 ${o.primaryDark}; }
        .dlg-footer {
          flex-shrink: 0; text-align: center;
          padding: 0 16px clamp(4px, 1vh, 10px);
          font-size: 10px; font-weight: 500; color: #94A3B8;
        }
        @media (max-height: 480px) {
          .dlg-footer { display: none; }
        }

        /* ── Desktop / laptop scale-up ─────────────────────────────── */
        @media (min-width: 900px) {
          .dlg-learn-body { max-width: 760px; }
          .dlg-chat-head { padding: min(16px, 2vh) 22px; }
          .dlg-head-label { font-size: min(17px, 2.7vh); }
          .dlg-select { font-size: min(15px, 2.4vh); padding-top: min(9px, 1.4vh); padding-bottom: min(9px, 1.4vh); }
          .dlg-chat { padding: min(20px, 2.4vh) 22px; gap: min(14px, 1.8vh); }
          .dlg-msg { max-width: 75%; }
          .dlg-avatar { width: min(44px, 6.2vh); height: min(44px, 6.2vh); font-size: min(22px, 3.2vh); }
          .dlg-name { font-size: min(12px, 2vh); }
          .dlg-bubble { font-size: min(16px, 2.6vh); padding: min(11px, 1.6vh) 16px; border-radius: 18px; }
          .dlg-cta { max-width: 480px; }
          .dlg-cta-btn { font-size: min(18px, 2.8vh); padding: min(14px, 2vh) 32px; }
          .dlg-footer { font-size: 12px; }
        }
      `}),e.jsxs("div",{className:"dlg-learn-root",children:[e.jsx(K,{onBack:n,language:h,title:i}),e.jsxs("div",{className:"dlg-learn-body",children:[e.jsxs("div",{className:"dlg-chat-card",children:[e.jsxs("div",{className:"dlg-chat-head",children:[e.jsxs("span",{className:"dlg-head-label",children:["🎭 ",h==="bm"?"Situasi":"Scene"]}),e.jsxs("div",{className:"dlg-select-wrap",children:[e.jsx("select",{className:"dlg-select",value:s,onChange:m=>x(Number(m.target.value)),"aria-label":h==="bm"?"Pilih situasi dialog":"Choose a dialogue scene",children:D.map((m,k)=>e.jsxs("option",{value:k,children:[m.emoji," ",m.label]},k))}),e.jsx("span",{className:"dlg-select-arrow",children:"▾"})]})]}),e.jsx("div",{className:"dlg-chat",children:b.lines.map((m,k)=>e.jsxs("div",{className:`dlg-msg ${C[m.speaker]}`,children:[e.jsx("div",{className:"dlg-avatar",children:re[m.speaker]||(j(m.speaker)?"👩‍🏫":"👦")}),e.jsxs("div",{className:"dlg-bubble-wrap",children:[e.jsx("div",{className:"dlg-name",children:m.speaker}),e.jsx("div",{className:"dlg-bubble",children:m.text})]})]},k))},s)]}),e.jsx("div",{className:"dlg-cta",children:e.jsxs("button",{className:"dlg-cta-btn",onClick:a,children:["🎤 ",h==="bm"?"Main Watak":"Role-play"]})})]}),e.jsxs("div",{className:"dlg-footer",children:["Bahasa Melayu KSSR · ",i]})]})]})}function ve({onBack:n,language:a,scene:i,onNextScene:h}){const s=F[i],x=he(s),b=ge(),{awardCorrect:C,awardWrong:m,completeActivity:k,hearts:ie,gems:te}=xe(me),[f,W]=p.useState(0),[g,N]=p.useState(()=>s.lines[0].speaker===x?w:y),[Y,B]=p.useState(!1),[R,L]=p.useState({}),[O,z]=p.useState(null),[P,T]=p.useState(0),[se,_]=p.useState(0),M=p.useRef(0),H=p.useRef(0),A=p.useRef(0),G=p.useRef(null),[U]=p.useState(()=>{const t=[...new Set(F.flatMap(l=>l.lines.filter(d=>!j(d.speaker)).map(d=>d.text)))],c={};return s.lines.forEach((l,d)=>{if(l.speaker!==x)return;const E=Q(t.filter(ce=>ce!==l.text)).slice(0,2);c[d]=Q([l.text,...E])}),c});p.useEffect(()=>{M.current=f},[f]),p.useEffect(()=>{H.current=P},[P]),p.useEffect(()=>()=>{A.current++},[]);const u=s.lines[f]??null,ne=!!u&&u.speaker===x,le=s.lines.filter(t=>t.speaker===x).length,J=Object.values(R).filter(Boolean).length;p.useEffect(()=>{const t=G.current;t&&t.scrollTo({top:t.scrollHeight,behavior:"smooth"})},[f,g,Y]);const $=p.useCallback(()=>{z(null),B(!1);const t=M.current+1;if(t>=s.lines.length){N(ee),I({particleCount:200,spread:160,origin:{y:.4}}),k();return}W(t),N(s.lines[t].speaker===x?w:y)},[s,x,k]);p.useEffect(()=>{if(g!==y||!u)return;const t=++A.current,c=setTimeout(()=>{if(A.current!==t)return;B(!0);const l=Math.max(1500,u.text.length*65);setTimeout(()=>{A.current===t&&$()},l)},800);return()=>clearTimeout(c)},[g,f,u,$]);const pe=(t,c)=>{if(g!==w||!u)return;z(c);const l=t===u.text;if(L(d=>({...d,[M.current]:l})),l){C();const d=H.current+1;T(d),_(E=>Math.max(E,d)),d%3===0?(q("streak"),I({particleCount:150,spread:100,origin:{y:.5}})):(q("correct"),I({particleCount:40,spread:60,origin:{y:.6},scalar:.8})),N(X),setTimeout(()=>$(),1300)}else m(),T(0),N(Z),setTimeout(()=>$(),2400)},oe=()=>{A.current++,W(0),L({}),z(null),T(0),_(0),B(!1),N(s.lines[0].speaker===x?w:y)},S=g===X,v=g===Z,V=a==="bm"?"Main Watak":"Role-play";if(g===ee)return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:ae}),e.jsxs("div",{className:"drp-root",children:[e.jsx(K,{onBack:n,language:a,title:V}),e.jsxs("div",{className:"drp-center",children:[e.jsx("div",{style:{fontSize:"clamp(56px, 12vh, 90px)",lineHeight:1},children:"🎭"}),e.jsx("h2",{style:{fontFamily:"'Baloo 2', sans-serif",color:o.primary,fontSize:"clamp(24px, 5vh, 36px)",fontWeight:800,margin:0},children:a==="bm"?"Bagus Sekali!":"Well Done!"}),e.jsxs("p",{style:{fontSize:"clamp(13px, 2.4vh, 16px)",color:"#9D174D",fontWeight:700,margin:0},children:[D[i].emoji," ",D[i].label]}),e.jsxs("p",{style:{fontSize:"clamp(14px, 2.6vh, 18px)",color:"#555",fontWeight:600,margin:"0.6rem 0"},children:[a==="bm"?"Ayat disebut: ":"Lines spoken: ",e.jsx("strong",{children:J}),"/",le]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.6rem",background:"#FFF6D6",borderRadius:999,padding:"0.5rem 1.2rem",border:"1.5px solid #FFE08A"},children:[e.jsx("span",{style:{fontSize:"1.1rem"},children:"🔥"}),e.jsxs("span",{style:{fontWeight:800,fontFamily:"'Baloo 2', sans-serif",color:"#B58800",fontSize:"clamp(13px, 2.4vh, 16px)"},children:[a==="bm"?"Streak terbaik:":"Best streak:"," ",se]})]}),e.jsxs("div",{style:{display:"flex",gap:"0.8rem",marginTop:"var(--sp-2)"},children:[e.jsxs("button",{onClick:oe,style:{fontFamily:"'Baloo 2', sans-serif",padding:"0.8rem 1.5rem",background:"#fff",color:"#475569",border:"2px solid #E2E8F0",borderRadius:999,fontSize:"1rem",cursor:"pointer",fontWeight:800},children:["🔄 ",a==="bm"?"Main Semula":"Play Again"]}),e.jsx("button",{onClick:h,style:{fontFamily:"'Baloo 2', sans-serif",padding:"0.8rem 1.5rem",background:`linear-gradient(180deg, ${o.primary}cc, ${o.primary})`,color:"#fff",border:"none",borderRadius:999,fontSize:"1rem",cursor:"pointer",fontWeight:800,boxShadow:`0 4px 0 ${o.primaryDark}`},children:a==="bm"?"Seterusnya ➡️":"Next ➡️"})]})]})]})]});const de=f+(g===y||S||v?1:0);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:ae}),e.jsxs("div",{className:"drp-root",children:[e.jsx(K,{onBack:n,language:a,title:V}),e.jsxs("div",{className:"drp-body",children:[e.jsxs("div",{className:"drp-stats",children:[e.jsxs("span",{className:"drp-pill prog",children:[D[i].emoji," ",D[i].label]}),e.jsxs("span",{style:{display:"flex",gap:6,flexShrink:0},children:[e.jsxs("span",{className:"drp-pill life",children:["❤️ ",ie]}),e.jsxs("span",{className:"drp-pill gem",children:["💎 ",te]}),e.jsxs("span",{className:"drp-pill star",children:["⭐ ",J]}),e.jsxs("span",{className:"drp-pill fire",children:["🔥 ",P]})]})]}),e.jsx("div",{className:"drp-bar-wrap",children:e.jsx("div",{className:"drp-bar-fill",style:{width:`${f/s.lines.length*100}%`}})}),e.jsxs("div",{className:"drp-chat-card",children:[e.jsxs("div",{className:"drp-chat-head",children:[e.jsxs("div",{className:"drp-chat-title",children:["🎭 ",a==="bm"?"Lakonkan dialog ini":"Act out this dialogue"]}),e.jsxs("span",{className:"drp-role-pill",children:[a==="bm"?"Watak kamu:":"Your role:"," ",b||x]})]}),e.jsx("div",{className:"drp-chat",ref:G,children:s.lines.slice(0,de).map((t,c)=>{const l=t.speaker===x,d=l&&R[c]===!1,E=c===f&&g===y&&!Y;return e.jsxs("div",{className:`drp-msg ${l?"right":"left"}${d?" missed":""}`,children:[e.jsx("div",{className:"drp-avatar",children:re[t.speaker]||(j(t.speaker)?"👩‍🏫":"👦")}),e.jsxs("div",{className:"drp-bubble-wrap",children:[e.jsx("div",{className:"drp-name",children:l&&b?b:t.speaker}),e.jsx("div",{className:"drp-bubble",children:E?e.jsxs("span",{className:"drp-typing",children:[e.jsx("i",{}),e.jsx("i",{}),e.jsx("i",{})]}):e.jsxs(e.Fragment,{children:[l?t.text:fe(t.text,x,b),l&&R[c]===!0&&e.jsx("span",{className:"drp-mark",children:"✅"}),d&&e.jsx("span",{className:"drp-mark",children:"❌"})]})})]})]},c)})})]})]}),e.jsxs("div",{className:"drp-dock",children:[ne&&U[f]&&e.jsxs("div",{className:`drp-turn${S?" correct":v?" wrong":""}`,children:[e.jsxs("div",{className:"drp-turn-label",children:["💬 ",a==="bm"?"GILIRAN KAMU — PILIH JAWAPAN:":"YOUR TURN — PICK YOUR LINE:"]}),e.jsx("div",{className:"drp-opts",children:U[f].map((t,c)=>{const l=t===u.text;let d="drp-opt";return(S||v)&&l?d+=" correct":v&&c===O&&(d+=" wrong"),e.jsxs("button",{className:d,disabled:g!==w,onClick:()=>pe(t,c),children:[(S||v)&&l&&"✅ ",v&&c===O&&!l&&"❌ ",t]},c)})})]}),e.jsxs("div",{className:"drp-status",children:[g===y&&u&&e.jsxs("p",{className:"drp-status-text live",children:["✍️ ",u.speaker," ",a==="bm"?"sedang menaip…":"is typing…"]}),g===w&&e.jsx("p",{className:"drp-status-text",children:a==="bm"?"Pilih ayat yang sesuai untuk watak kamu 👇":"Pick the line that fits your role 👇"}),S&&e.jsxs("p",{className:"drp-status-text live",style:{fontSize:"clamp(15px, 3vh, 19px)"},children:["✅ ",a==="bm"?"Betul! Hebat!":"Correct! Great!"]}),v&&e.jsx("p",{className:"drp-status-text warn",children:a==="bm"?"Tak mengapa — ayat yang betul ditanda hijau.":"It's okay — the right line is marked green."})]})]})]})]})}function Ne({onBack:n,language:a="bm"}){const[i,h]=p.useState("learn"),[s,x]=p.useState(0),b=a==="bm"?"Dialog":"Dialogues",C=()=>{n?.()},m=()=>x(k=>(k+1)%F.length);return i==="learn"?e.jsx(ke,{onBack:C,onStartRoleplay:()=>h("roleplay"),topicTitle:b,language:a,scene:s,onSceneChange:x}):e.jsx(ve,{onBack:()=>h("learn"),onNextScene:m,language:a,scene:s},s)}export{Ne as default};
