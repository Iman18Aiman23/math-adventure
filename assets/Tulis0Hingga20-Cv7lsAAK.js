import{r as p,S as f,p as L,j as e}from"./index-YCInXYg5.js";import{c as R}from"./confetti.module-oQXWb4Lk.js";import{T as J}from"./TraceCanvas-DOCdVmA_.js";import{C as Q}from"./Celebration-BzsEi41U.js";import{u as V}from"./useTopicGamification-I1kCte-J.js";import{r as X}from"./MatematikActivityFrame-BMYrgoLu.js";import"./useGamification-g-vGaz2S.js";const Z=.6,B=64,tt=(n,t)=>{const r=t.x-n.x,o=t.y-n.y,i=Math.hypot(r,o),l=Math.max(2,Math.ceil(i*Z)),s=new Array(l+1);for(let a=0;a<=l;a++){const m=a/l;s[a]={x:n.x+r*m,y:n.y+o*m}}return s},et=(n,t,r,o)=>{const i=new Array(B+1);for(let l=0;l<=B;l++){const s=l/B,a=1-s;i[l]={x:a*a*a*n.x+3*a*a*s*t.x+3*a*s*s*r.x+s*s*s*o.x,y:a*a*a*n.y+3*a*a*s*t.y+3*a*s*s*r.y+s*s*s*o.y}}return i},_=n=>{let t=[];for(const o of n){let i;if(o.type==="L")i=tt(o.points[0],o.points[1]);else if(o.type==="C")i=et(...o.points);else continue;t.length>0&&i.shift(),t=t.concat(i)}const r=new Float32Array(t.length*2);for(let o=0;o<t.length;o++)r[o*2]=t[o].x,r[o*2+1]=t[o].y;return{samples:r,count:t.length}},nt=n=>{const t=n.segments;return{char:n.char,start:t[0].points[0],end:t[t.length-1].points.at(-1),segments:t,..._(t)}},$={0:{char:"0",segments:[{type:"C",points:[{x:50,y:15},{x:30,y:15},{x:20,y:33},{x:20,y:50}]},{type:"C",points:[{x:20,y:50},{x:20,y:67},{x:30,y:85},{x:50,y:85}]},{type:"C",points:[{x:50,y:85},{x:70,y:85},{x:80,y:67},{x:80,y:50}]},{type:"C",points:[{x:80,y:50},{x:80,y:33},{x:70,y:15},{x:50,y:15}]}]},1:{char:"1",segments:[{type:"L",points:[{x:50,y:15},{x:50,y:85}]}]},2:{char:"2",segments:[{type:"C",points:[{x:26,y:32},{x:28,y:14},{x:72,y:14},{x:72,y:38}]},{type:"C",points:[{x:72,y:38},{x:72,y:54},{x:46,y:64},{x:26,y:80}]},{type:"L",points:[{x:26,y:80},{x:76,y:80}]}]},3:{char:"3",segments:[{type:"C",points:[{x:35,y:16},{x:50,y:4},{x:69,y:7},{x:72,y:24}]},{type:"C",points:[{x:72,y:24},{x:75,y:41},{x:58,y:48},{x:48,y:48}]},{type:"C",points:[{x:48,y:48},{x:58,y:48},{x:75,y:55},{x:72,y:72}]},{type:"C",points:[{x:72,y:72},{x:69,y:89},{x:50,y:92},{x:35,y:80}]}]},4:{char:"4",segments:[{type:"L",points:[{x:54,y:16},{x:20,y:62}]},{type:"L",points:[{x:20,y:62},{x:78,y:62}]},{type:"L",points:[{x:62,y:16},{x:62,y:86}]}]},5:{char:"5",segments:[{type:"L",points:[{x:68,y:16},{x:32,y:16}]},{type:"L",points:[{x:32,y:16},{x:32,y:42}]},{type:"C",points:[{x:32,y:42},{x:80,y:30},{x:82,y:58},{x:72,y:72}]},{type:"C",points:[{x:72,y:72},{x:65,y:82},{x:50,y:88},{x:34,y:78}]}]},6:{char:"6",segments:[{type:"C",points:[{x:55,y:18},{x:40,y:16},{x:22,y:42},{x:28,y:65}]},{type:"C",points:[{x:28,y:65},{x:28,y:74.94},{x:36.06,y:83},{x:46,y:83}]},{type:"C",points:[{x:46,y:83},{x:55.94,y:83},{x:64,y:74.94},{x:64,y:65}]},{type:"C",points:[{x:64,y:65},{x:64,y:55.06},{x:55.94,y:47},{x:46,y:47}]},{type:"C",points:[{x:46,y:47},{x:36.06,y:47},{x:28,y:55.06},{x:28,y:65}]}]},7:{char:"7",segments:[{type:"L",points:[{x:26,y:18},{x:74,y:18}]},{type:"L",points:[{x:74,y:18},{x:40,y:85}]}]},8:{char:"8",segments:[{type:"C",points:[{x:50,y:16},{x:40.61,y:16},{x:33,y:23.61},{x:33,y:33}]},{type:"C",points:[{x:33,y:33},{x:33,y:42.39},{x:40.61,y:50},{x:50,y:50}]},{type:"C",points:[{x:50,y:50},{x:59.39,y:50},{x:67,y:57.61},{x:67,y:67}]},{type:"C",points:[{x:67,y:67},{x:67,y:76.39},{x:59.39,y:84},{x:50,y:84}]},{type:"C",points:[{x:50,y:84},{x:40.61,y:84},{x:33,y:76.39},{x:33,y:67}]},{type:"C",points:[{x:33,y:67},{x:33,y:57.61},{x:40.61,y:50},{x:50,y:50}]},{type:"C",points:[{x:50,y:50},{x:59.39,y:50},{x:67,y:42.39},{x:67,y:33}]},{type:"C",points:[{x:67,y:33},{x:67,y:23.61},{x:59.39,y:16},{x:50,y:16}]}]},9:{char:"9",segments:[{type:"C",points:[{x:43,y:16},{x:33.06,y:16},{x:25,y:24.06},{x:25,y:34}]},{type:"C",points:[{x:25,y:34},{x:25,y:43.94},{x:33.06,y:52},{x:43,y:52}]},{type:"C",points:[{x:43,y:52},{x:52.94,y:52},{x:61,y:43.94},{x:61,y:34}]},{type:"C",points:[{x:61,y:34},{x:61,y:24.06},{x:52.94,y:16},{x:43,y:16}]},{type:"L",points:[{x:61,y:14},{x:61,y:85}]}]}},st=Object.keys($).sort().map(n=>nt($[n])),M=n=>st.find(t=>t.char===n),ot=(n,t,r)=>n.map(o=>({type:o.type,points:o.points.map(i=>({x:t+(i.x-50)*r,y:50+(i.y-50)*r}))}));function it(n){const t=String(n);if(t.length===1)return M(t);const r=.68,o=[27,73];let i=[];for(let l=0;l<t.length;l++){const s=M(t[l]);s&&(i=i.concat(ot(s.segments,o[l],r)))}return{char:t,start:i[0].points[0],end:i[i.length-1].points.at(-1),segments:i,..._(i)}}const z=["sifar","satu","dua","tiga","empat","lima","enam","tujuh","lapan","sembilan"],rt=["sepuluh","sebelas","dua belas","tiga belas","empat belas","lima belas","enam belas","tujuh belas","lapan belas","sembilan belas"],D=["","","dua puluh","tiga puluh","empat puluh","lima puluh","enam puluh","tujuh puluh","lapan puluh","sembilan puluh"];function W(n){if(n<0||n>100)return"";if(n===100)return"seratus";if(n<10)return z[n];if(n<20)return rt[n-10];const t=Math.floor(n/10),r=n%10;return r===0?D[t]:`${D[t]} ${z[r]}`}const S=Array.from({length:21},(n,t)=>t);function at({onBack:n,language:t="bm",topicComplete:r,onNextTopic:o,topicId:i,topicLabel:l,accentColor:s="#F59E0B",scoreStorageKey:a,scoreId:m}){const[c,E]=p.useState(0),[h,b]=p.useState(!1),[k,v]=p.useState(!1),[P,F]=p.useState(0),[H,w]=p.useState(!1),I=p.useRef(null),C=p.useRef(null),{completeActivity:N}=V(i),T=p.useRef(!1);p.useEffect(()=>{k&&!T.current&&(T.current=!0,X(a,m,10,10),N())},[k,N,a,m]);const d=S[c],u=c>=S.length-1,Y=c<=0,G=p.useMemo(()=>it(d),[d]);p.useEffect(()=>()=>{f.stopSpeaking(),clearTimeout(C.current)},[]),p.useEffect(()=>{f.stopSpeaking();const x=setTimeout(()=>{f.speak(W(d),"ms-MY",{rate:.6,pitch:1.1})},400);return()=>{clearTimeout(x),f.stopSpeaking()}},[c,d]),p.useEffect(()=>{if(h&&(L("correct"),R({particleCount:80,spread:70,origin:{y:.5},scalar:.8}),u)){const x=setTimeout(()=>{w(!0),v(!0),r&&r(i)},700);return()=>clearTimeout(x)}},[h,u,i,r]);const K=p.useCallback(()=>{b(!0),L("correct"),R({particleCount:50,spread:65,origin:{y:.6},scalar:.75})},[]),g=p.useCallback(x=>{clearTimeout(C.current),E(x),b(!1),F(y=>y+1)},[]),O=p.useCallback(()=>{if(u){w(!0),v(!0),r&&r(i);return}g(c+1)},[u,c,g,i,r]),U=p.useCallback(()=>{f.stopSpeaking(),f.speak(W(d),"ms-MY",{rate:.6,pitch:1.1})},[d]),A=()=>n?.(),q=()=>{clearTimeout(C.current),E(0),b(!1),v(!1),F(x=>x+1),w(!1)};if(k){const x=t==="bm"?"Tahniah! Semua nombor selesai!":"Congratulations! All numbers done!",y=t==="bm"?`Kamu telah berjaya menulis ${l}!`:`You have completed tracing ${l}!`;return e.jsxs(e.Fragment,{children:[H&&e.jsx(Q,{count:30}),e.jsx("div",{style:{minHeight:"100dvh",background:"linear-gradient(180deg, #FFFBEB 0%, #FDE68A 50%, #F59E0B 100%)",fontFamily:"'Fredoka', system-ui, sans-serif",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px",color:"#1E293B"},children:e.jsxs("div",{style:{background:"#fff",borderRadius:28,padding:"clamp(32px,5vw,48px)",textAlign:"center",maxWidth:400,width:"100%",border:`1px solid ${s}1A`,boxShadow:"0 12px 32px -16px rgba(0,0,0,.1)"},children:[e.jsx("span",{style:{fontSize:"clamp(48px,10vw,72px)",display:"block",marginBottom:8},children:"✏️"}),e.jsx("h2",{style:{fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:"clamp(22px,4vw,28px)",margin:"0 0 6px"},children:x}),e.jsx("p",{style:{fontWeight:500,fontSize:15,color:"#64748B",margin:"0 0 24px"},children:y}),e.jsxs("div",{style:{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"},children:[e.jsxs("button",{onClick:q,style:{fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:15,cursor:"pointer",border:"none",borderRadius:999,padding:"12px 28px",color:"#fff",background:`linear-gradient(180deg, ${s}cc, ${s})`,boxShadow:`0 4px 0 ${s}66`},children:["🔄 ",t==="bm"?"Cuba Lagi":"Try Again"]}),e.jsxs("button",{onClick:A,style:{fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:15,cursor:"pointer",border:"none",borderRadius:999,padding:"12px 28px",color:"#64748B",background:"#F1F5F9",boxShadow:"0 4px 0 #CBD5E1"},children:["← ",t==="bm"?"Kembali":"Back"]})]}),e.jsx("button",{onClick:()=>o?o():n?.(),style:{fontFamily:"'Baloo 2', sans-serif",fontWeight:800,fontSize:15,cursor:"pointer",border:"none",borderRadius:999,padding:"12px 28px",marginTop:12,color:"#fff",background:`linear-gradient(180deg, ${s}, #B45309)`,boxShadow:"0 4px 0 #92400E"},children:t==="bm"?"Topik Seterusnya →":"Next Topic →"})]})})]})}return d===void 0?e.jsx("div",{style:{padding:40,textAlign:"center",color:"#94A3B8"},children:"Loading..."}):e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        .ntl-root {
          height: 100dvh; overflow: hidden;
          background: linear-gradient(180deg, #FFFBEB 0%, #FDE68A 50%, #F59E0B 100%);
          font-family: 'Fredoka', system-ui, sans-serif;
          display: flex; flex-direction: column;
          color: #1E293B;
        }
        .ntl-topbar {
          flex-shrink: 0; position: relative;
          display: flex; align-items: center; gap: 4px;
          padding: 10px 12px; min-height: 44px;
          background: rgba(255,255,255,.88);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0,0,0,.06);
        }
        .ntl-topbar::after { content: ''; flex: 0 1 88px; }
        .ntl-back {
          flex-shrink: 0;
          display: flex; align-items: center; gap: 4px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 13px; color: #64748B;
          background: none; border: none; cursor: pointer; padding: 6px 10px;
          border-radius: 10px;
        }
        .ntl-back:hover { background: #F1F5F9; }
        @media (max-width: 480px) {
          .ntl-back-label { display: none; }
          .ntl-topbar::after { flex-basis: 42px; }
        }
        .ntl-title {
          flex: 1; min-width: 0;
          text-align: center;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(12px, 3.4vw, 14px); color: #1E293B;
        }
        .ntl-body {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column;
          padding: clamp(8px, 1.6vh, 16px) 16px;
          overflow: hidden;
        }
        .ntl-picker-wrap {
          flex-shrink: 0;
          margin-bottom: clamp(6px, 1.2vh, 12px);
          display: flex; align-items: center; gap: 10px;
          width: 100%;
        }
        .ntl-picker-label {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(11px, 2vw, 14px);
          color: #64748B; white-space: nowrap;
        }
        .ntl-picker {
          flex: 1;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: clamp(13px, 2.4vw, 16px);
          padding: clamp(5px, .8vh, 8px) clamp(8px, 1.4vw, 12px);
          border: 2px solid ${s}44;
          border-radius: 12px;
          background: #fff;
          color: #1E293B;
          cursor: pointer;
          outline: none;
          min-height: 36px;
          -webkit-appearance: none;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 10px center;
          padding-right: 32px;
        }
        .ntl-picker option {
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 14px; padding: 4px 8px;
        }
        .ntl-picker option:checked {
          background: ${s}20;
        }
        .ntl-digit-pills {
          flex-shrink: 0;
          display: flex; gap: 10px; justify-content: center;
          margin-bottom: clamp(6px, 1.2vh, 12px);
        }
        .ntl-digit-pill {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(13px, 2.6vw, 16px);
          display: flex; align-items: center; gap: 7px;
          padding: clamp(6px, 1vh, 9px) clamp(14px, 3.4vw, 24px);
          border-radius: 999px; cursor: pointer;
          border: 2px solid #E2E8F0; background: #fff; color: #64748B;
          transition: background .2s, border-color .2s, color .2s;
        }
        .ntl-digit-pill .pill-digit {
          font-weight: 900; font-size: 1.3em; line-height: 1;
          font-family: 'Baloo 2', sans-serif;
        }
        .ntl-digit-pill.active {
          border-color: ${s}; background: ${s}14; color: ${s};
        }
        .ntl-digit-pill.done {
          border-color: #58CC02; background: #F0FBE6; color: #46A302;
        }
        .ntl-digit-pill.done.active {
          background: #E2F7CC;
        }
        .ntl-canvas-area {
          flex: 1; min-height: 0;
          display: flex; justify-content: center;
          width: 100%;
        }
        .ntl-card {
          flex: 1; min-width: 0; max-width: 560px;
          background: #fff;
          border-radius: 20px;
          display: flex; flex-direction: column;
          overflow: hidden;
          border: 3px solid #E2E8F0;
          box-shadow: 0 4px 0 #CBD5E1, 0 6px 16px rgba(0,0,0,.06);
          transition: border-color .3s, box-shadow .3s;
        }
        .ntl-card.done {
          border-color: #58CC02;
          box-shadow: 0 6px 0 #46A302, 0 8px 20px rgba(88,204,2,.12);
        }
        .ntl-card-canvas {
          flex: 1; min-height: 0;
          background: #F8FAFC;
        }
        .ntl-controls {
          flex-shrink: 0;
          display: flex; justify-content: center; gap: 12px;
          padding: clamp(6px, 1vh, 12px) 0 0;
        }
        .ntl-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(12px, min(2.6vw, 2vh), 15px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(7px, 1.2vh, 10px) clamp(16px, 3vw, 24px);
          transition: transform .12s;
        }
        .ntl-btn:hover { transform: translateY(-2px); }
        .ntl-btn:active { transform: translateY(1px); }
        .ntl-btn.ghost {
          color: #64748B; background: #F1F5F9;
          box-shadow: 0 3px 0 #CBD5E1;
        }
        .ntl-btn.primary {
          color: #fff;
          background: linear-gradient(180deg, ${s}cc, ${s});
          box-shadow: 0 3px 0 ${s}66;
        }
        .ntl-btn.primary:disabled {
          opacity: .4; cursor: default; transform: none;
        }
        .ntl-footer {
          flex-shrink: 0; text-align: center;
          padding: clamp(2px, .4vh, 4px) 16px clamp(4px, .6vh, 8px);
          font-size: 10px; font-weight: 500; color: #94A3B8;
        }
        @media (max-height: 480px) {
          .ntl-footer { display: none; }
        }
      `}),e.jsxs("div",{className:"ntl-root",children:[e.jsxs("div",{className:"ntl-topbar",children:[e.jsxs("button",{className:"ntl-back",onClick:A,children:[e.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("path",{d:"M19 12H5M12 19l-7-7 7-7"})}),e.jsx("span",{className:"ntl-back-label",children:t==="bm"?"Kembali":"Back"})]}),e.jsx("span",{className:"ntl-title",children:l})]}),e.jsxs("div",{className:"ntl-body",children:[e.jsxs("div",{className:"ntl-picker-wrap",children:[e.jsx("span",{className:"ntl-picker-label",children:t==="bm"?"Nombor:":"Number:"}),e.jsx("select",{className:"ntl-picker",value:c,onChange:x=>g(Number(x.target.value)),children:S.map((x,y)=>{const j=y<c||y===c&&h;return e.jsxs("option",{value:y,style:{color:j?"#16A34A":"#1E293B"},children:[x," ",j?"✓":""]},x)})})]}),e.jsx("div",{className:"ntl-canvas-area",children:e.jsx("div",{className:`ntl-card${h?" done":""}`,children:e.jsx("div",{className:"ntl-card-canvas",children:e.jsx(J,{ref:I,letter:G,strokeColor:s,strokeWidth:3,onComplete:K,resetSignal:P})})})}),e.jsxs("div",{className:"ntl-controls",children:[e.jsxs("button",{className:"ntl-btn ghost",onClick:()=>g(Math.max(0,c-1)),disabled:Y,children:["← ",t==="bm"?"Sebelum":"Prev"]}),e.jsxs("button",{className:"ntl-btn ghost",onClick:U,children:["🔊 ",t==="bm"?"Dengar":"Listen"]}),e.jsx("button",{className:"ntl-btn primary",disabled:!h,onClick:O,children:u?t==="bm"?"Selesai ✓":"Finish ✓":t==="bm"?"Seterusnya →":"Next →"})]})]}),e.jsxs("div",{className:"ntl-footer",children:["Matematik KSSR · ",l]})]})]})}const lt="1-4-1-tulis-0-20",pt="#F59E0B";function ut(n){const t=n.language==="bm"?"Tulis 0 hingga 20":"Write 0 to 20";return e.jsx(at,{...n,topicId:lt,topicLabel:t,accentColor:pt,scoreStorageKey:"mt_ld_m1_scores",scoreId:"tulis-0-20"})}export{ut as default};
