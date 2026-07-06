import{r as a,p as O,S as D,j as e}from"./index-YCInXYg5.js";import{s as M}from"./utils-Direv13U.js";import{c as W}from"./confetti.module-oQXWb4Lk.js";import{B as ae}from"./BMHeader-B5cOc9J_.js";import{S as te}from"./StatsBar-Dt4MeuCr.js";import{u as ne}from"./useGamification-g-vGaz2S.js";function I(u,c){const l=M(u).slice(0,c),i={};return{pool:l.map(n=>{const r=M(n.options),w=n.question+"|"+(n.audioText||n.emoji||n.question);return i[w]={answer:n.answer,correctIndex:r.indexOf(n.answer)},{_uid:w,question:n.question,options:r,audioText:n.audioText||"",emoji:n.emoji||"",penerangan:n.penerangan||""}}),answers:i}}function ce(u,c,l=15){const i=a.useMemo(()=>{const o=Math.ceil(l*.7),v=l-o,p=Math.min(c.length,v),N=Math.min(u.length,l-p),m=[...M(u).slice(0,N),...M(c).slice(0,p)];return M(m)},[u,c,l]),s=a.useMemo(()=>I(i,l),[i,l]),n=a.useRef(s.answers),[r,w]=a.useState(s.pool),[k,y]=a.useState(0),[Y,B]=a.useState(0),[g,j]=a.useState(!1),[P,$]=a.useState(null),[K,S]=a.useState(!1),f=r?.[k],E=f?n.current[f._uid].correctIndex:-1,L=f?n.current[f._uid].answer:"",Q=a.useCallback(d=>{g||(j(!0),$(d),d===E?(B(o=>o+1),O("correct")):O("wrong"))},[g,E]),X=a.useCallback(()=>{k+1<r.length?(y(d=>d+1),j(!1),$(null)):S(!0)},[k,r.length]),A=a.useCallback(()=>{const{pool:d,answers:o}=I(i,l);n.current=o,w(d),y(0),B(0),j(!1),$(null),S(!1)},[i,l]),q=a.useCallback(()=>{y(0),B(0),j(!1),$(null),S(!1)},[]);return{pool:r,idx:k,score:Y,answered:g,selected:P,finished:K,correctIdx:E,correctAnswer:L,currentQ:f,totalRounds:r.length,handleChoose:Q,handleNext:X,handleRestart:A,handleStart:q}}const re=70;function be({onBack:u,topicTitle:c,quiz:l,language:i="bm",accentColor:s="#E8821A",onShowLearn:n,topicId:r,topicComplete:w,onNextTopic:k,passPct:y=re,subtitle:Y,resultExtra:B,instructionMode:g=!1,hideEmoji:j=!1,showFeedback:P=!1}){const $=a.useRef(null),[K,S]=a.useState(!1),{awardXP:f,completeTopicAttempt:E,loseHeart:L,hearts:Q,gems:X}=ne("bm"),A=a.useRef(0),q=a.useRef(-1),d=a.useRef(!1),{idx:o,score:v,answered:p,selected:N,finished:m,correctIdx:T,correctAnswer:H,currentQ:t,totalRounds:b,handleChoose:C,handleNext:V,handleRestart:J,handleStart:Z}=l,R=b>0?Math.round(v/b*100):0,U=R>=80?3:R>=50?2:1,F=R>=y;a.useEffect(()=>()=>D.stopSpeaking(),[]),a.useEffect(()=>{m||(d.current=!1,q.current=-1,A.current=0)},[m]),a.useEffect(()=>{p||S(!1)},[p]),a.useEffect(()=>{m&&F&&r&&!d.current&&(d.current=!0,w?.(r),(async()=>await E(r,v,b))())},[m,F,r,w,E,v,b]),a.useEffect(()=>{m&&F&&W({particleCount:200,spread:140,origin:{y:.5},zIndex:2e3})},[m,F]),a.useEffect(()=>{if(t?.audioText&&!m&&!g){const x=setTimeout(()=>{D.stopSpeaking(),D.speak(t.audioText,"ms-MY",{rate:.7,pitch:1.2})},300);return()=>{clearTimeout(x),D.stopSpeaking()}}},[o,t?.audioText,m,g]),a.useEffect(()=>{if(p)if(N===T){if(W({particleCount:90,spread:75,origin:{y:.6},zIndex:2e3}),q.current!==o){q.current=o,A.current+=1;const x=A.current%5===0;Promise.all([f(10,"quiz",r),x?f(5,"streak_bonus",r):Promise.resolve(0)]).then(([h,z])=>{(h>0||z>0)&&window.dispatchEvent(new CustomEvent("xp-toast",{detail:{xp:h,streakBonus:z}}))})}}else q.current!==o&&(q.current=o,A.current=0,L())},[p,N,T,o,f,r,L]);const ee=()=>{t?.audioText&&(D.stopSpeaking(),D.speak(t.audioText,"ms-MY",{rate:.7,pitch:1.2}))};return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        .bm-lesson-root {
          --sp-1: clamp(4px, 0.8vh, 8px);
          --sp-2: clamp(8px, 1.6vh, 14px);
          --sp-3: clamp(12px, 2.4vh, 22px);
          height: 100dvh; overflow: hidden;
          /* Plain white shell so kids focus on the Q&A (matches MathOperationsGame) */
          background: #FFFFFF;
          font-family: 'Fredoka', system-ui, sans-serif;
          color: #1E293B;
          display: flex;
          flex-direction: column;
        }

        .bm-lesson-body {
          flex: 1;
          min-height: 0;
          max-width: 560px;
          margin: 0 auto;
          width: 100%;
          padding: var(--sp-2) clamp(14px, 3.5vw, 28px);
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }
        .bm-quiz-stage {
          width: 100%;
          margin: auto 0; /* safe vertical centering even if content overflows */
          display: flex;
          flex-direction: column;
        }

        .bm-quiz-stats {
          display: flex; align-items: center; justify-content: space-between;
          gap: 8px; margin-bottom: var(--sp-2);
        }
        .bm-pill {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(11px, 2vh, 13px);
          border-radius: 999px;
          padding: clamp(3px, 0.7vh, 5px) clamp(10px, 2.4vw, 14px);
          white-space: nowrap;
        }
        .bm-pill.prog { background: #fff; color: ${s}; border: 1.5px solid ${s}44; box-shadow: 0 2px 6px -2px ${s}33; }
        /* Reward chips — standardized to match StatsBar (solid candy chip, white text) */
        .bm-pill.life, .bm-pill.gem, .bm-pill.star {
          color: #fff; border: none;
          box-shadow: 0 2px 0 rgba(0,0,0,.12), inset 0 1px 0 rgba(255,255,255,.30);
        }
        .bm-pill.life { background: #FF4B4B; }
        .bm-pill.gem  { background: #1CC8EE; }
        .bm-pill.star { background: #A560FF; }
        /* emoji glyph styled to match StatsBar: soft cast shadow + thin white
           glow so it reads crisply on the candy chip, and a springy pop that
           replays whenever the pill's value changes (keyed remount in JSX) */
        .bm-pill-emoji {
          display: inline-block;
          filter:
            drop-shadow(0 1px 1px rgba(0,0,0,.28))
            drop-shadow(0 0 1px rgba(255,255,255,.55));
          animation: bm-pill-pop .35s cubic-bezier(.34,1.56,.64,1);
        }
        @keyframes bm-pill-pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.18); }
          100% { transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bm-pill-emoji { animation: none; }
        }
        .bm-pill-group { display: flex; align-items: center; gap: 6px; min-width: 0; }
        @media (max-width: 360px) { .bm-pill-group { gap: 4px; } .bm-pill { padding: 3px 8px; } }

        .bm-quiz-bar-wrap {
          width: 100%; height: clamp(6px, 1.2vh, 9px); border-radius: 999px;
          background: ${s}22; overflow: hidden;
          margin-bottom: var(--sp-3);
        }
        .bm-quiz-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, ${s}, ${s}99);
          border-radius: 999px; transition: width .35s ease;
        }

        .bm-quiz-card {
          background: #fff;
          border: 2.5px solid ${s}33;
          border-radius: clamp(18px, 3vh, 28px);
          padding: clamp(14px, 2.8vh, 26px) clamp(14px, 4vw, 26px) clamp(14px, 2.6vh, 24px);
          box-shadow: 0 clamp(3px, 0.6vh, 5px) 0 ${s}2e, 0 16px 34px -18px rgba(0,0,0,.18);
          display: flex; flex-direction: column;
          position: relative;
        }

        .bm-quiz-media {
          width: clamp(52px, 9vh, 72px); height: clamp(52px, 9vh, 72px);
          margin: 0 auto;
          border-radius: 24px;
          background: linear-gradient(135deg, ${s}1f, ${s}0d);
          border: 1.5px solid ${s}2a;
          display: flex; align-items: center; justify-content: center;
        }
        .bm-quiz-emoji {
          font-size: clamp(28px, 5.4vh, 42px);
          line-height: 1;
          user-select: none;
        }
        .bm-quiz-speaker-icon {
          font-size: clamp(26px, 5vh, 38px);
          line-height: 1;
          animation: bm-speaker-pulse 2s ease-in-out infinite;
        }
        @keyframes bm-speaker-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        .bm-quiz-instruction {
          text-align: center;
          font-family: 'Fredoka', system-ui, sans-serif;
          font-size: clamp(15px, 2.8vh, 19px);
          font-weight: 600; line-height: 1.5;
          color: #334155;
          background: ${s}10;
          border: 1.5px solid ${s}33;
          border-radius: 14px;
          padding: clamp(10px, 1.8vh, 14px) clamp(12px, 3vw, 18px);
          margin-bottom: var(--sp-1);
        }

        .bm-quiz-subtitle {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(9px, 1.7vh, 11px);
          letter-spacing: 0.14em; text-transform: uppercase;
          color: ${s};
          background: ${s}12;
          border: 1.5px solid ${s}33;
          border-radius: 999px;
          padding: clamp(3px, 0.6vh, 4px) clamp(12px, 2.6vw, 16px);
          align-self: center;
          margin-top: var(--sp-1);
        }
          .bm-quiz-question {
          text-align: center;
          font-family: 'Baloo 2', sans-serif;
          font-size: clamp(16px, 3vh, 22px);
          font-weight: 700;
          line-height: 1.35;
          margin: var(--sp-1) 0 0;
          color: #1E293B;
        }
        .bm-situasi {
          text-align: center;
          font-family: 'Baloo 2', sans-serif;
          font-size: 1.4rem;
          font-weight: 800;
          color: #64748B;
          margin: 0 0 10px;
          line-height: 1.4;
        }
        .bm-soalan {
          text-align: center;
          font-family: 'Fredoka', sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          color: #D97706;
          margin: 0;
        }
        .bm-quiz-replay-btn {
          align-self: center;
          margin-top: var(--sp-1);
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(11px, 2.1vh, 13px); color: #fff;
          background: linear-gradient(180deg, ${s}cc, ${s});
          border: none; border-radius: 999px;
          padding: clamp(4px, 0.9vh, 6px) clamp(14px, 3vw, 18px);
          box-shadow: 0 3px 0 ${s}88;
          cursor: pointer; transition: transform .12s;
        }
        .bm-quiz-replay-btn:active { transform: translateY(2px); box-shadow: 0 1px 0 ${s}88; }

        .bm-quiz-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(6px, 1.3vh, 10px);
          margin-top: var(--sp-2);
        }
        .bm-quiz-grid.long { grid-template-columns: 1fr; }
        .bm-quiz-opt {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(18px, 3.6vh, 26px);
          text-align: center; cursor: pointer;
          background: #FBFCFE; border: 2.5px solid #E4EAF2;
          border-radius: 16px;
          padding: clamp(8px, 1.6vh, 12px) clamp(8px, 2vw, 12px);
          min-height: clamp(44px, 7.4vh, 56px);
          color: #1E293B;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 3px 0 #E2E8F0;
          transition: transform .15s ease, border-color .15s, background .15s, box-shadow .15s;
        }
        @media (hover: hover) {
          .bm-quiz-opt:not(:disabled):hover {
            border-color: ${s};
            background: ${s}0d;
            transform: translateY(-2px);
            box-shadow: 0 5px 0 ${s}44;
          }
        }
        .bm-quiz-opt:not(:disabled):active { transform: translateY(1px); box-shadow: 0 1px 0 #E2E8F0; }
        .bm-quiz-opt .bm-opt-letter-display {
          line-height: 1.25;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }
        .bm-quiz-opt.selected {
          border-color: ${s}; background: ${s}12;
          transform: scale(.97);
        }
        .bm-quiz-opt.correct {
          border-color: #16A34A; background: #F0FDF4; color: #166534;
          box-shadow: 0 3px 0 #BBF7D0;
          animation: bm-correct-pop .35s cubic-bezier(.34,1.56,.64,1);
        }
        .bm-quiz-opt.wrong {
          border-color: #DC2626; background: #FEF2F2; color: #991B1B;
          box-shadow: 0 3px 0 #FECACA;
          animation: bm-shake .3s ease;
        }
        .bm-quiz-opt:disabled { cursor: default; }
        .bm-quiz-opt.word-opt {
          font-family: 'Fredoka', sans-serif;
          font-weight: 600;
          font-size: clamp(13px, 2.5vh, 17px);
          line-height: 1.35;
        }
        @keyframes bm-correct-pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.06); }
          100% { transform: scale(1); }
        }
        @keyframes bm-shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }

        .bm-quiz-feedback-zone {
          min-height: clamp(26px, 4.6vh, 34px);
          margin-top: var(--sp-1);
          display: flex; align-items: center; justify-content: center;
        }
        .bm-quiz-feedback.wrong {
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: clamp(11px, 2.2vh, 13px); text-align: center;
          padding: clamp(4px, 0.9vh, 6px) 10px;
          border-radius: 10px;
          color: #991B1B; background: #FEF2F2; border: 1.5px solid #FECACA;
        }
        .bm-quiz-next-wrap {
          display: flex; justify-content: center; margin-top: var(--sp-1);
        }
        .bm-quiz-next-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, 2.7vh, 17px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(8px, 1.7vh, 12px) clamp(26px, 7vw, 40px);
          color: #fff;
          background: linear-gradient(180deg, ${s}cc, ${s});
          box-shadow: 0 4px 0 ${s}99;
          transition: transform .12s ease, box-shadow .12s;
        }
        @media (hover: hover) {
          .bm-quiz-next-btn:hover { transform: translateY(-1px); box-shadow: 0 5px 0 ${s}99; }
        }
        .bm-quiz-next-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 ${s}99; }
        .bm-quiz-next-btn.hidden-state { visibility: hidden; }

        .bm-feedback-overlay {
          position: absolute; inset: 0;
          background: rgba(30,41,59,.45);
          backdrop-filter: blur(3px);
          display: flex; align-items: center; justify-content: center;
          z-index: 50;
          border-radius: inherit;
          animation: bm-fade-in .2s ease;
        }
        .bm-feedback-dialog {
          background: #fff;
          border-radius: 20px;
          padding: clamp(18px, 3vh, 28px) clamp(16px, 4vw, 24px);
          max-width: 400px; width: 90%;
          text-align: center;
          box-shadow: 0 20px 50px -12px rgba(0,0,0,.35);
          animation: bm-pop-in .25s cubic-bezier(.34,1.56,.64,1);
        }
        .bm-feedback-icon {
          font-size: clamp(36px, 6vh, 48px);
          margin-bottom: clamp(8px, 1.2vh, 12px);
          line-height: 1;
        }
        .bm-feedback-text {
          font-size: clamp(14px, 2.6vh, 18px);
          font-weight: 600; line-height: 1.5;
          color: #334155; margin: 0 0 clamp(14px, 2.4vh, 20px);
        }
        .bm-feedback-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, 2.6vh, 17px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(9px, 1.6vh, 12px) clamp(28px, 6vw, 40px);
          color: #fff;
          background: linear-gradient(180deg, ${s}cc, ${s});
          box-shadow: 0 4px 0 ${s}99;
          transition: transform .12s ease;
        }
        .bm-feedback-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 ${s}99; }
        @keyframes bm-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes bm-pop-in { from { transform: scale(.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }

        .bm-quiz-start-card,
        .bm-quiz-result-card {
          background: #fff;
          border: 2.5px solid ${s}33;
          border-radius: clamp(18px, 3vh, 28px);
          padding: clamp(18px, 3.4vh, 30px) clamp(16px, 4.5vw, 30px);
          box-shadow: 0 clamp(3px, 0.6vh, 5px) 0 ${s}2e, 0 16px 34px -18px rgba(0,0,0,.18);
          text-align: center;
        }
        .bm-quiz-start-icon {
          width: clamp(64px, 11vh, 88px); height: clamp(64px, 11vh, 88px);
          margin: 0 auto clamp(8px, 1.6vh, 14px);
          border-radius: 28px;
          background: linear-gradient(135deg, ${s}26, ${s}0f);
          border: 1.5px solid ${s}2a;
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(32px, 6vh, 48px);
        }
        .bm-quiz-start-title {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(20px, 3.8vh, 27px); color: #1E293B;
          margin: 0 0 4px;
        }
        .bm-quiz-start-sub {
          font-weight: 500; font-size: clamp(13px, 2.5vh, 15px);
          color: #64748B; margin: 0 0 clamp(12px, 2.4vh, 18px);
        }
        .bm-quiz-start-actions {
          display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;
        }
        .bm-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(13px, 2.6vh, 16px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(9px, 1.8vh, 12px) clamp(20px, 5vw, 28px);
          transition: transform .12s ease;
        }
        .bm-btn:active { transform: translateY(2px); }
        @media (hover: hover) {
          .bm-btn:hover { transform: translateY(-2px); }
        }
        .bm-btn.primary {
          color: #fff;
          background: linear-gradient(180deg, ${s}cc, ${s});
          box-shadow: 0 4px 0 ${s}99;
        }
        .bm-btn.secondary {
          color: #64748B; background: #F1F5F9;
          box-shadow: 0 4px 0 #CBD5E1;
        }

        .bm-result-stars-row {
          display: flex; align-items: center; justify-content: center;
          gap: 10px; margin-bottom: var(--sp-1);
        }
        .bm-result-stars {
          font-size: clamp(24px, 4.6vh, 32px);
          letter-spacing: 2px;
        }
        .bm-result-score {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(24px, 4.6vh, 32px); color: ${s};
        }
        .bm-result-gate {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(12px, 2.4vh, 14px); border-radius: 999px;
          padding: clamp(4px, 0.9vh, 6px) clamp(14px, 3vw, 18px);
          margin: 2px auto var(--sp-1);
          display: inline-block;
        }
        .bm-result-gate.pass { color: #166534; background: #F0FDF4; border: 1.5px solid #BBF7D0; }
        .bm-result-gate.fail { color: #991B1B; background: #FEF2F2; border: 1.5px solid #FECACA; }
        .bm-result-msg {
          font-weight: 600; font-size: clamp(12px, 2.4vh, 14px); color: #64748B;
          margin: 0 0 clamp(10px, 2vh, 14px);
        }
        .bm-result-extra {
          text-align: left;
          margin: 4px 0 var(--sp-2);
          padding: clamp(8px, 1.6vh, 12px) clamp(12px, 2.8vw, 16px);
          background: linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%);
          border-radius: 14px;
          border: 2px solid #FDE68A;
        }
        .bm-result-extra-label {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: clamp(11px, 2.2vh, 13px);
          color: #B45309;
          margin-bottom: 3px;
          letter-spacing: 0.5px;
        }
        .bm-result-extra-item {
          font-family: 'Fredoka', sans-serif;
          font-size: clamp(11px, 2.1vh, 13px);
          font-weight: 600;
          color: #92400E;
          padding: 1px 0;
          line-height: 1.5;
        }
        .bm-result-actions {
          display: flex; gap: 10px; flex-wrap: wrap;
          justify-content: center;
        }

        .bm-lesson-footer {
          flex-shrink: 0;
          text-align: center;
          padding: var(--sp-1) 20px clamp(10px, 2vh, 16px);
          margin: 0;
          font-size: clamp(10px, 1.9vh, 12px);
          font-weight: 500; color: #94A3B8;
        }

        /* ── Desktop / laptop scale-up (height-aware so it always fits) ── */
        @media (min-width: 900px) {
          .bm-lesson-body { max-width: 820px; }
          .bm-pill { font-size: min(14px, 2.2vh); padding: min(5px, 0.8vh) 18px; }
          .bm-quiz-bar-wrap { height: min(10px, 1.4vh); }
          .bm-quiz-card { padding: min(32px, 3.2vh) 40px min(26px, 2.6vh); border-radius: 32px; }
          .bm-quiz-media { width: min(88px, 11vh); height: min(88px, 11vh); border-radius: min(28px, 3.6vh); }
          .bm-quiz-emoji { font-size: min(50px, 6.2vh); }
          .bm-quiz-speaker-icon { font-size: min(46px, 5.8vh); }
          .bm-quiz-subtitle { font-size: min(12px, 2vh); padding: min(4px, 0.7vh) 18px; margin-top: min(12px, 1.4vh); }
          .bm-quiz-question { font-size: min(27px, 3.6vh); margin-top: min(12px, 1.4vh); }
          .bm-quiz-replay-btn { font-size: min(14px, 2.2vh); padding: min(7px, 1vh) 22px; margin-top: min(12px, 1.4vh); }
          .bm-quiz-grid { gap: min(14px, 1.8vh); margin-top: min(20px, 2.2vh); }
          .bm-quiz-grid.long { grid-template-columns: 1fr 1fr; }
          .bm-quiz-opt { font-size: min(32px, 4.4vh); min-height: min(76px, 9.4vh); border-radius: 18px; }
          .bm-quiz-opt.word-opt { font-size: min(19px, 2.8vh); }
          .bm-quiz-feedback-zone { min-height: min(34px, 4.6vh); margin-top: min(8px, 1vh); }
          .bm-quiz-feedback.wrong { font-size: min(14px, 2.2vh); }
          .bm-quiz-next-wrap { margin-top: min(8px, 1vh); }
          .bm-quiz-next-btn { font-size: min(18px, 2.6vh); padding: min(13px, 1.8vh) 48px; }
          .bm-quiz-start-card, .bm-quiz-result-card { padding: min(40px, 4.4vh) 48px; border-radius: 32px; }
          .bm-quiz-start-icon { width: min(104px, 13vh); height: min(104px, 13vh); font-size: min(56px, 7vh); border-radius: 32px; }
          .bm-quiz-start-title { font-size: min(30px, 4.2vh); }
          .bm-quiz-start-sub { font-size: min(16px, 2.6vh); margin-bottom: min(22px, 2.6vh); }
          .bm-btn { font-size: min(17px, 2.6vh); padding: min(13px, 1.8vh) 32px; }
          .bm-result-stars, .bm-result-score { font-size: min(36px, 5vh); }
          .bm-result-gate { font-size: min(15px, 2.4vh); padding: min(7px, 1vh) 20px; }
          .bm-result-msg { font-size: min(15px, 2.4vh); margin-bottom: min(16px, 2vh); }
          .bm-result-extra-label, .bm-result-extra-item { font-size: min(14px, 2.2vh); }
          .bm-lesson-footer { font-size: min(12px, 2vh); }
        }
      `}),e.jsxs("div",{className:"bm-lesson-root",children:[e.jsx(ae,{onBack:u,language:i,title:c,sticky:!0}),e.jsx("div",{className:"bm-lesson-body",children:m?e.jsxs("div",{className:"bm-quiz-stage",children:[e.jsx(te,{subject:"bm"}),e.jsxs("div",{className:"bm-quiz-result-card",children:[e.jsxs("div",{className:"bm-result-stars-row",children:[e.jsxs("div",{className:"bm-result-stars",children:["⭐".repeat(U),"☆".repeat(3-U)]}),e.jsxs("div",{className:"bm-result-score",children:[v," / ",b]})]}),F?e.jsxs("div",{className:"bm-result-gate pass",children:["🎉 ",i==="bm"?"LULUS!":"PASSED!"," (",R,"%)"]}):e.jsx("div",{className:"bm-result-gate fail",children:i==="bm"?`Skor minima ${y}% diperlukan untuk lulus topik ini.`:`You need at least ${y}% to pass this topic.`}),e.jsx("p",{className:"bm-result-msg",children:R>=80?i==="bm"?"Hebat! Kamu memang bijak!":"Excellent! You're brilliant!":F?i==="bm"?"Bagus! Teruskan belajar!":"Good! Keep learning!":i==="bm"?"Jangan putus asa — cuba lagi!":"Don't give up — try again!"}),B&&e.jsx("div",{className:"bm-result-extra",children:B}),e.jsx("div",{className:"bm-result-actions",children:F?e.jsxs(e.Fragment,{children:[k?e.jsx("button",{className:"bm-btn primary",onClick:k,children:i==="bm"?"Topik Seterusnya →":"Next Topic →"}):e.jsx("button",{className:"bm-btn primary",onClick:u,children:i==="bm"?"← Kembali ke Trail":"← Back to Trail"}),e.jsxs("button",{className:"bm-btn secondary",onClick:J,children:["🔄 ",i==="bm"?"Cuba Lagi":"Try Again"]})]}):e.jsxs(e.Fragment,{children:[e.jsxs("button",{className:"bm-btn primary",onClick:J,children:["🔄 ",i==="bm"?"Cuba Lagi":"Try Again"]}),e.jsx("button",{className:"bm-btn secondary",onClick:u,children:i==="bm"?"← Kembali ke Trail":"← Back to Trail"})]})})]})]}):!l.pool||l.pool.length===0||!t?e.jsx("div",{className:"bm-quiz-stage",children:e.jsxs("div",{className:"bm-quiz-start-card",children:[e.jsx("div",{className:"bm-quiz-start-icon",children:"🎯"}),e.jsx("h3",{className:"bm-quiz-start-title",children:i==="bm"?`Kuiz: ${c}`:`Quiz: ${c}`}),e.jsx("p",{className:"bm-quiz-start-sub",children:i==="bm"?`Jawab ${b} soalan`:`Answer ${b} questions`}),e.jsxs("div",{className:"bm-quiz-start-actions",children:[n&&e.jsxs("button",{className:"bm-btn secondary",onClick:n,children:["📖 ",i==="bm"?"Belajar Dulu":"Learn First"]}),e.jsxs("button",{className:"bm-btn primary",onClick:Z,children:["🎯 ",i==="bm"?"Mula Kuiz":"Start Quiz"]})]})]})}):e.jsxs("div",{className:"bm-quiz-stage",ref:$,children:[e.jsxs("div",{className:"bm-quiz-stats",children:[e.jsxs("span",{className:"bm-pill prog",children:[i==="bm"?"Soalan":"Question"," ",o+1," / ",b]}),e.jsxs("span",{className:"bm-pill-group",children:[e.jsxs("span",{className:"bm-pill life",children:[e.jsx("span",{className:"bm-pill-emoji",children:"❤️"},Q)," ",Q]}),e.jsxs("span",{className:"bm-pill gem",children:[e.jsx("span",{className:"bm-pill-emoji",children:"💎"},X)," ",X]}),e.jsxs("span",{className:"bm-pill star",children:[e.jsx("span",{className:"bm-pill-emoji",children:"⭐"},v)," ",v]})]})]}),e.jsx("div",{className:"bm-quiz-bar-wrap",children:e.jsx("div",{className:"bm-quiz-bar-fill",style:{width:`${(o+1)/b*100}%`}})}),e.jsxs("div",{className:"bm-quiz-card",children:[g?t.audioText&&e.jsx("div",{className:"bm-quiz-instruction",children:t.audioText}):j?null:e.jsx("div",{className:"bm-quiz-media",children:t.emoji?e.jsx("span",{className:"bm-quiz-emoji",children:t.emoji}):e.jsx("span",{className:"bm-quiz-speaker-icon",children:"🔊"})}),Y&&e.jsx("div",{className:"bm-quiz-subtitle",children:Y}),j&&t.question?(()=>{const x=t.question.split(`
`);return e.jsx("div",{className:"bm-quiz-split-wrap",children:x.map((h,z)=>e.jsx("p",{className:z===0?"bm-situasi":"bm-soalan",children:h},z))})})():e.jsx("p",{className:"bm-quiz-question",children:t.question||(i==="bm"?"Apakah bunyi ini?":"What sound is this?")}),!g&&t.audioText&&e.jsxs("button",{className:"bm-quiz-replay-btn",onClick:ee,children:["🔊 ",i==="bm"?"Dengar Semula":"Replay"]}),e.jsx("div",{className:"bm-quiz-grid"+(t.options.some(x=>x.length>20)?" long":""),children:t.options.map((x,h)=>{const z=N===h,se=p&&h===T,ie=p&&z&&h!==T,G=!!t.emoji||x.length>2;let _="bm-quiz-opt";return z&&!p&&(_+=" selected"),se&&(_+=" correct"),ie&&(_+=" wrong"),e.jsx("button",{className:_+(G?" word-opt":""),onClick:()=>C(h),disabled:p,children:e.jsx("span",{className:"bm-opt-letter-display",children:G?x:x.toUpperCase()})},h)})}),e.jsx("div",{className:"bm-quiz-feedback-zone",children:p&&N!==T&&e.jsxs("div",{className:"bm-quiz-feedback wrong",children:["❌ ",i==="bm"?"Jawapan":"Answer",": ",t.emoji||H.length>3?H:H.toUpperCase()]})}),P&&p&&t?.penerangan&&!K&&e.jsx("div",{className:"bm-feedback-overlay",children:e.jsxs("div",{className:"bm-feedback-dialog",children:[e.jsx("div",{className:"bm-feedback-icon",children:N===T?"✅":"❌"}),e.jsx("p",{className:"bm-feedback-text",children:t.penerangan}),e.jsx("button",{className:"bm-feedback-btn",onClick:()=>S(!0),children:i==="bm"?"Teruskan →":"Continue →"})]})}),e.jsx("div",{className:"bm-quiz-next-wrap",children:P&&p&&t?.penerangan&&!K?null:e.jsx("button",{className:"bm-quiz-next-btn"+(p?"":" hidden-state"),onClick:V,children:o+1>=b?i==="bm"?"Lihat Keputusan →":"See Results →":i==="bm"?"Seterusnya →":"Next →"})})]})]})}),!m&&e.jsxs("p",{className:"bm-lesson-footer",children:["Bahasa Melayu KSSR · ",c]})]})]})}export{be as B,ce as u};
