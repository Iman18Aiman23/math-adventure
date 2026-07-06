import{c as se,u as ie,r as i,I as oe,g as ne,j as e,T as le,a as ce,p as L,d as de,b as pe}from"./index-YCInXYg5.js";import{r as xe}from"./index-NOCtoZ7I.js";import{J as w}from"./jawiWordsData-ZZq9VMU7.js";import{B as fe}from"./BackButton-DoWsAqH6.js";import{F as Q}from"./arabic-W4X4pPK0.js";import{c as U}from"./confetti.module-oQXWb4Lk.js";import{c as me}from"./clsx-B-dksMZM.js";import{L as he}from"./localization-bS82JCQ0.js";import{A as D}from"./AppHeader-C92rkc8R.js";import{R as ge}from"./refresh-cw-J9zlOc9a.js";import{H as ue}from"./house-TmCyjw7R.js";import{A as je}from"./arrow-right-DPBat6K_.js";import"./arrow-left-B6fmfze-.js";import"./HeartShopModal-CA_XyApL.js";const we=[["path",{d:"m18 14 4 4-4 4",key:"10pe0f"}],["path",{d:"m18 2 4 4-4 4",key:"pucp1d"}],["path",{d:"M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22",key:"1ailkh"}],["path",{d:"M2 6h1.972a4 4 0 0 1 3.6 2.2",key:"km57vx"}],["path",{d:"M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45",key:"os18l9"}]],be=se("shuffle",we),r={pageGradient:"linear-gradient(180deg, #ECFDF5 0%, #D1FAE5 40%, #F0FDFA 100%)",dark:"#065F46",accent:"#10B981"},V=10,ye=["Bagus!","Cemerlang!","Hebat!","Luar Biasa!","Menakjubkan!","BINTANG!","JUARA!","PAKAR BAHASA!"],ke=["Great!","Excellent!","Fantastic!","Amazing!","Incredible!","SUPERSTAR!","CHAMPION!","LANGUAGE WIZARD!"];function ve({streak:d,language:o,onClose:s}){const n=Math.floor(d/V),f=o==="bm"?ye:ke,m=f[Math.min(n-1,f.length-1)];return e.jsx("div",{className:"ops-streak-overlay",onClick:s,children:e.jsxs("div",{className:"ops-streak-popup",onClick:c=>c.stopPropagation(),children:[e.jsx("div",{className:"ops-streak-firework",children:"🎉"}),e.jsx("div",{className:"ops-streak-number",children:d}),e.jsx("div",{className:"ops-streak-label",children:o==="bm"?"jawapan betul berturut-turut!":"correct answers in a row!"}),e.jsx("div",{className:"ops-streak-cheer",children:m}),e.jsx("button",{className:"ops-streak-continue",onClick:s,children:o==="bm"?"Terus! 🚀":"Keep Going! 🚀"})]})})}const Z=[{id:"random",labelBM:"Semua Topik (Rawak)",labelEN:"All Topics (Random)",emoji:"🎲",color:"#FF5E62"},...w.map(d=>({id:d.id,labelBM:d.title,labelEN:d.titleEng||d.title,emoji:d.words[0]?.emoji||"📚",color:d.color||"#999"}))];function Se({onBack:d,onHome:o,language:s}){const n=he[s].jawiGames,f=ie(),[m,c]=i.useState("random"),[p,M]=i.useState(null),[A,T]=i.useState(0),[b,I]=i.useState(0),[y,k]=i.useState(0),[R,N]=i.useState(""),[g,v]=i.useState(null),[We,$e]=i.useState(oe()),[P,S]=i.useState(!1),[G,F]=i.useState(!1),[z,B]=i.useState(!1),[q,J]=i.useState(3),[X,H]=i.useState(0),[ee,Y]=i.useState(0),[te,O]=i.useState(!1),[h,K]=i.useState(!1),C=i.useRef(null);i.useEffect(()=>{const t=ne();J(t.hearts),H(t.gems),Y(t.stars),k(t.streak)},[]),i.useEffect(()=>{E("random")},[]),i.useEffect(()=>{p&&C.current&&C.current.focus()},[p]);const _=t=>{let l=[];if(t==="random")w.forEach(x=>{l=[...l,...x.words]});else{const x=w.find(j=>j.id===t);x&&(l=x.words)}return l.length===0?null:l[Math.floor(Math.random()*l.length)]},E=t=>{c(t),T(1),I(0),k(0),O(!1),v(null),N(""),F(!1),S(!1),B(!1),M(_(t)),K(!1)},W=()=>{const t=_(m);if(!t){O(!0);return}M(t),T(l=>l+1),v(null),N(""),F(!1),S(!1),B(!1)},re=t=>{if(G||!p)return;if(t.toLowerCase().trim()===p.rumi.toLowerCase().trim()){F(!0),I(ae=>ae+10),v("correct"),f?.addWin&&f.addWin(10);const x=ce();H(x.gems),Y(x.stars);const j=x.streak;k(j),j>0&&j%V===0?(L("streak"),S(!0),U({particleCount:150,spread:100,origin:{y:.5}})):(L("correct"),U({particleCount:40,spread:60,origin:{y:.6},scalar:.8}),setTimeout(W,1e3))}else{v("incorrect"),L("wrong"),F(!0);const x=de();J(x.hearts),k(x.streak)}},$=Z.find(t=>t.id===m),u=$&&$.id!=="random"&&w.find(t=>t.id===$.id)?.color||r.accent;if(te){const t=A*10,l=t>0?Math.round(b/t*100):0;return e.jsxs("div",{style:{display:"flex",flexDirection:"column",flex:1,overflow:"hidden",fontFamily:"'Fredoka',system-ui,sans-serif",background:r.pageGradient},children:[e.jsx(D,{onBack:d,gameState:f,language:s}),e.jsxs("div",{style:{textAlign:"center",padding:"2rem 1.5rem",maxWidth:"600px",margin:"1rem auto",background:"#fff",borderRadius:24,boxShadow:`0 14px 34px -16px ${r.dark}48,0 2px 6px ${r.dark}0D`},children:[e.jsx(le,{size:64,color:"#FFD93D",style:{marginBottom:"1rem"}}),e.jsx("h1",{style:{color:r.dark,fontSize:"2rem",marginBottom:"0.5rem",fontFamily:"'Baloo 2',sans-serif",fontWeight:800},children:n.gameOver}),e.jsx("p",{style:{fontSize:"1.1rem",color:"#8A5670",marginBottom:"2rem"},children:l===100?n.perfectScore:n.wellDone}),e.jsx("div",{style:{fontSize:"3rem",fontWeight:"bold",color:r.accent,marginBottom:"0.5rem"},children:b}),e.jsxs("div",{style:{fontSize:"1.2rem",color:"#8A5670",marginBottom:"2rem"},children:[n.totalScore," (",A," ",s==="bm"?"perkataan":"words",")"]}),e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:"0.75rem",justifyContent:"center"},children:[e.jsxs("button",{onClick:()=>E(m),style:{display:"flex",gap:"0.5rem",alignItems:"center",padding:"14px 28px",borderRadius:60,border:"none",background:`linear-gradient(180deg,${r.accent}cc,${r.accent})`,color:"#fff",fontSize:16,fontWeight:700,fontFamily:"inherit",cursor:"pointer",boxShadow:`0 6px 20px -4px ${r.dark}66`},children:[e.jsx(ge,{size:20})," ",n.newGame]}),e.jsxs("button",{onClick:o,style:{display:"flex",gap:"0.5rem",alignItems:"center",padding:"14px 28px",borderRadius:60,border:`2px solid ${r.accent}44`,background:"#fff",color:r.dark,fontSize:16,fontWeight:700,fontFamily:"inherit",cursor:"pointer"},children:[e.jsx(ue,{size:20})," ",s==="bm"?"Utama":"Home"]})]})]})]})}return p?e.jsxs("div",{style:{display:"flex",flexDirection:"column",flex:1,width:"100%",maxWidth:"100%",backgroundImage:r.pageGradient,backgroundRepeat:"no-repeat",backgroundColor:"#A7F3D0",fontFamily:"'Fredoka',system-ui,sans-serif",color:r.dark},children:[e.jsx("style",{children:Q}),e.jsx(D,{onBack:d,gameState:f,language:s,hearts:q,gems:X,stars:ee}),e.jsxs("div",{style:{flex:"none",position:"relative",zIndex:5},children:[e.jsx("div",{style:{display:"flex",justifyContent:"center",padding:h?"0":"8px 16px"},children:e.jsxs("button",{onClick:()=>K(t=>!t),style:{display:"flex",alignItems:"center",gap:6,padding:"7px 18px",borderRadius:999,border:`2px solid ${h?u:`${r.accent}44`}`,background:h?`${u}18`:"rgba(255,255,255,.85)",color:h?u:r.dark,cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:"'Baloo 2',sans-serif",letterSpacing:".04em",transition:"all .2s cubic-bezier(.34,1.56,.64,1)",boxShadow:h?`0 2px 8px ${u}33`:`0 2px 8px ${r.dark}0D`,backdropFilter:h?"none":"blur(8px)"},children:[e.jsx(be,{size:14}),h?s==="bm"?"Tutup":"Close":s==="bm"?"Tukar Topik":"Change Topic"]})}),h&&e.jsxs("div",{style:{background:"rgba(255,255,255,.92)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${r.accent}2E`,padding:"10px 14px 14px",animation:"fadeIn .15s ease",boxShadow:`0 8px 24px ${r.dark}12`},children:[e.jsx("div",{style:{textAlign:"center",fontSize:11,fontWeight:700,fontFamily:"'Baloo 2',sans-serif",letterSpacing:".1em",textTransform:"uppercase",color:"#8A5670",marginBottom:8},children:s==="bm"?"Pilih Topik":"Choose Topic"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:6,justifyContent:"center"},children:Z.map(t=>{const l=m===t.id;return e.jsxs("button",{onClick:()=>E(t.id),style:{display:"flex",alignItems:"center",gap:5,flex:"0 0 auto",padding:"8px 16px",borderRadius:999,border:`2px solid ${l?t.color:`${r.accent}22`}`,background:l?`linear-gradient(135deg,${t.color}18,${t.color}08)`:"#fff",color:l?t.color:r.dark,cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:"'Fredoka',system-ui,sans-serif",boxShadow:l?`0 2px 8px ${t.color}33`:`0 1px 3px ${r.dark}0D`,transition:"all .2s cubic-bezier(.34,1.56,.64,1)",transform:l?"scale(1.04)":"scale(1)"},children:[e.jsx("span",{style:{fontSize:14},children:t.emoji}),e.jsx("span",{style:{whiteSpace:"nowrap",maxWidth:120,overflow:"hidden",textOverflow:"ellipsis"},children:s==="bm"?t.labelBM:t.labelEN})]},t.id)})})]})]}),e.jsxs("div",{style:{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",alignItems:"center",padding:"1.25rem 1rem",gap:"1.25rem"},children:[e.jsxs("div",{style:{background:u,color:"white",padding:"2rem 1.25rem",position:"relative",margin:"0",width:"100%",maxWidth:"480px",boxSizing:"border-box",borderRadius:24,boxShadow:`0 14px 34px -16px ${r.dark}48,0 2px 6px ${r.dark}0D`},children:[e.jsx("button",{onClick:()=>B(!z),style:{position:"absolute",top:"1rem",right:"1rem",background:"rgba(255, 255, 255, 0.2)",color:"white",border:"1px solid rgba(255, 255, 255, 0.4)",padding:"0.4rem 0.8rem",borderRadius:"20px",cursor:"pointer",fontSize:"0.75rem",display:"flex",alignItems:"center",gap:"0.3rem",fontWeight:700,fontFamily:"'Baloo 2',sans-serif",zIndex:10},children:z?s==="bm"?"Sembunyi":"Hide":s==="bm"?"Papar":"Show"}),e.jsx("div",{style:{fontSize:"0.9rem",opacity:.85,fontWeight:600,marginBottom:"0.75rem",fontFamily:"'Baloo 2',sans-serif",letterSpacing:".03em",textAlign:"center"},children:n.typeRumi}),z&&e.jsx("div",{style:{marginBottom:"0.75rem",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("div",{style:{fontSize:"clamp(2.5rem, 10vw, 4rem)"},children:p.emoji})}),e.jsx("div",{style:{fontFamily:"'Amiri','Scheherazade New',serif",textShadow:"0 2px 4px rgba(0,0,0,0.1)",fontSize:"clamp(2.5rem, 10vw, 4rem)",fontWeight:700,textAlign:"center",direction:"rtl",lineHeight:1.2},children:p.jawi})]}),e.jsxs("div",{className:"fade-in",style:{width:"100%",maxWidth:"480px",padding:"0 0.5rem",boxSizing:"border-box"},children:[e.jsx("form",{onSubmit:t=>{t.preventDefault(),re(R)},className:"input-wrapper",style:{padding:"0"},children:e.jsx("input",{ref:C,type:"text",value:R,onChange:t=>N(t.target.value),disabled:G,placeholder:n.typeAnswer,autoFocus:!0,className:me("standard-input",g==="correct"&&"correct-input",g==="incorrect"&&"incorrect-input"),style:{textAlign:"center",fontSize:"1.75rem",padding:"1rem",fontFamily:"'Fredoka',system-ui,sans-serif",borderRadius:16,border:`3px solid ${g==="correct"?"#6BCB77":g==="incorrect"?"#FF6B6B":`${r.accent}33`}`}})}),g==="correct"&&e.jsx("div",{style:{marginTop:"0.75rem",color:"#6BCB77",fontSize:"1.25rem",fontWeight:"bold",textAlign:"center",fontFamily:"'Baloo 2',sans-serif"},children:n.correct})]}),g==="incorrect"&&e.jsxs("div",{className:"fade-in",style:{marginTop:"0.5rem",textAlign:"center",width:"100%",maxWidth:"480px",padding:"0 0.5rem",boxSizing:"border-box"},children:[e.jsxs("p",{style:{marginBottom:"0.75rem",color:"#FF6B6B",fontSize:"1.1rem",fontWeight:600},children:[n.incorrectLabel," ",e.jsx("b",{children:p.rumi}),"."]}),e.jsxs("button",{onClick:W,style:{padding:"12px 32px",borderRadius:60,border:"none",background:`linear-gradient(180deg,${r.accent}cc,${r.accent})`,color:"#fff",fontSize:"1.1rem",fontWeight:700,fontFamily:"'Fredoka',system-ui,sans-serif",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:"0.5rem",boxShadow:`0 6px 20px -4px ${r.dark}66`},children:[n.nextWord," ",e.jsx(je,{size:20})]})]})]}),e.jsxs("div",{className:"ops-footer-stats",style:{background:"rgba(255,255,255,.85)",backdropFilter:"blur(12px)",borderTop:`1px solid ${r.accent}2E`,justifyContent:"space-between",padding:"6px 16px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,fontSize:13,fontWeight:600,color:"#64748b",flexWrap:"wrap"},children:[e.jsx("span",{children:s==="bm"?"Jawapan :":"Answer :"}),e.jsxs("span",{style:{color:r.dark,display:"flex",alignItems:"center",gap:3},children:[e.jsx("span",{children:"✅"}),e.jsx("span",{children:b/10}),e.jsx("span",{style:{color:"#94a3b8",fontWeight:500},children:"Betul"})]}),e.jsxs("span",{style:{color:"#EF4444",display:"flex",alignItems:"center",gap:3},children:[e.jsx("span",{children:"❌"}),e.jsx("span",{children:A-1-b/10}),e.jsx("span",{style:{color:"#94a3b8",fontWeight:500},children:"salah"})]})]}),(()=>{const t=P&&y%10===0&&y>0?10:y%10;return e.jsxs("div",{className:"ops-stat-chip ops-stat-chip-highlight",style:{gap:"4px"},children:[e.jsx("span",{style:{fontSize:18},children:"🏆"}),e.jsx("div",{style:{width:"70px",height:"7px",background:"rgba(204, 119, 0, 0.15)",borderRadius:"4px",overflow:"hidden"},children:e.jsx("div",{style:{width:`${t/10*100}%`,height:"100%",background:"#FFB800",borderRadius:"4px",transition:"width 0.3s ease-out"}})}),e.jsxs("span",{style:{color:"#CC7700",fontSize:"0.85rem",fontWeight:900,minWidth:"28px",textAlign:"right"},children:[t,"/10"]})]})})()]}),P&&e.jsx(ve,{streak:y,language:s,onClose:()=>{S(!1),W()}})]}):e.jsxs("div",{style:{display:"flex",flex:1,alignItems:"center",justifyContent:"center",background:r.pageGradient,fontFamily:"'Fredoka',system-ui,sans-serif",color:"#8A5670",fontSize:18},children:[e.jsx(D,{onBack:d,gameState:f,language:s}),e.jsx("div",{style:{textAlign:"center",paddingTop:80},children:n.loading||"Loading..."})]})}const a={pageGradient:"linear-gradient(180deg, #ECFDF5 0%, #D1FAE5 40%, #F0FDFA 100%)",dark:"#065F46",accent:"#10B981",stageGradient:"radial-gradient(ellipse at 50% 32%,#D1FAE5 0%,#6EE7B7 55%,#10B981 100%)"};function Fe(){return e.jsxs("svg",{viewBox:"0 0 100 100",fill:"none",children:[e.jsx("ellipse",{cx:"50",cy:"90",rx:"24",ry:"4",fill:"rgba(6,95,70,.16)"}),e.jsxs("g",{className:"floatA",children:[e.jsx("circle",{cx:"50",cy:"26",r:"9",fill:"#fff"}),e.jsx("path",{d:"M50 35 V58",stroke:"#fff",strokeWidth:"4.5",strokeLinecap:"round"}),e.jsx("path",{d:"M50 45 L30 52",stroke:"#fff",strokeWidth:"3.8",strokeLinecap:"round"}),e.jsx("path",{d:"M50 45 L70 38",stroke:"#fff",strokeWidth:"3.8",strokeLinecap:"round"}),e.jsx("path",{d:"M50 58 L34 80",stroke:"#fff",strokeWidth:"3.8",strokeLinecap:"round"}),e.jsx("path",{d:"M50 58 L66 78",stroke:"#fff",strokeWidth:"3.8",strokeLinecap:"round"})]}),e.jsx("path",{d:"M72 28 L80 24 M76 34 L84 32",stroke:"#34D399",strokeWidth:"2",strokeLinecap:"round",opacity:".6",className:"pulse"})]})}function Ae(){return e.jsxs("svg",{viewBox:"0 0 100 100",fill:"none",children:[e.jsx("ellipse",{cx:"50",cy:"90",rx:"24",ry:"4",fill:"rgba(6,95,70,.16)"}),e.jsxs("g",{className:"floatA",children:[e.jsx("circle",{cx:"50",cy:"26",r:"9",fill:"#fff"}),e.jsx("path",{d:"M50 35 V60",stroke:"#fff",strokeWidth:"4.5",strokeLinecap:"round"}),e.jsx("path",{d:"M50 40 L32 48",stroke:"#fff",strokeWidth:"3.5",strokeLinecap:"round"}),e.jsx("path",{d:"M50 40 L68 48",stroke:"#fff",strokeWidth:"3.5",strokeLinecap:"round"}),e.jsx("path",{d:"M50 60 L36 82",stroke:"#fff",strokeWidth:"3.5",strokeLinecap:"round"}),e.jsx("path",{d:"M50 60 L64 82",stroke:"#fff",strokeWidth:"3.5",strokeLinecap:"round"}),e.jsx("circle",{cx:"32",cy:"48",r:"2.5",fill:"#34D399",className:"pulse"}),e.jsx("circle",{cx:"68",cy:"48",r:"2.5",fill:"#34D399",className:"pulse"})]})]})}function Ne(){return e.jsxs("svg",{viewBox:"0 0 100 100",fill:"none",children:[e.jsx("ellipse",{cx:"50",cy:"90",rx:"24",ry:"4",fill:"rgba(6,95,70,.16)"}),e.jsxs("g",{className:"floatA",children:[e.jsx("path",{d:"M28 40 L50 28 L72 40 L50 52 Z",fill:"#fff"}),e.jsx("path",{d:"M28 40 L28 68 L50 80 L50 52 Z",fill:"#34D399",opacity:".5"}),e.jsx("path",{d:"M72 40 L72 68 L50 80 L50 52 Z",fill:"#fff",opacity:".7"}),e.jsx("path",{d:"M28 54 L50 66 L72 54",stroke:"#065F46",strokeWidth:"1.5",strokeOpacity:".15",strokeLinecap:"round"}),e.jsx("path",{d:"M68 26 L78 16 L80 20 L70 30 Z",fill:"#FCD34D",stroke:"#fff",strokeWidth:"1.2"})]})]})}function ze(){return e.jsxs("svg",{viewBox:"0 0 100 100",fill:"none",children:[e.jsx("ellipse",{cx:"50",cy:"90",rx:"24",ry:"4",fill:"rgba(6,95,70,.16)"}),e.jsxs("g",{className:"floatA",children:[e.jsx("rect",{x:"44",y:"50",width:"12",height:"32",rx:"3",fill:"#fff",opacity:".85"}),e.jsx("circle",{cx:"50",cy:"40",r:"16",fill:"#fff"}),e.jsx("circle",{cx:"50",cy:"40",r:"10",fill:"#34D399",opacity:".3",className:"pulse"}),e.jsx("circle",{cx:"42",cy:"48",r:"2",fill:"#065F46",opacity:".2"}),e.jsx("circle",{cx:"58",cy:"48",r:"2",fill:"#065F46",opacity:".2"})]}),e.jsx("circle",{cx:"68",cy:"28",r:"8",fill:"#FCD34D",className:"pulse",opacity:".6"})]})}function Be(){return e.jsxs("svg",{viewBox:"0 0 100 100",fill:"none",children:[e.jsx("ellipse",{cx:"50",cy:"90",rx:"24",ry:"4",fill:"rgba(6,95,70,.16)"}),e.jsxs("g",{className:"floatA",children:[e.jsx("circle",{cx:"50",cy:"46",r:"20",fill:"#fff"}),e.jsx("circle",{cx:"42",cy:"42",r:"3.5",fill:"#065F46",opacity:".3"}),e.jsx("circle",{cx:"58",cy:"42",r:"3.5",fill:"#065F46",opacity:".3"}),e.jsx("path",{d:"M38 54 Q50 64 62 54",stroke:"#34D399",strokeWidth:"3",strokeLinecap:"round",fill:"none"}),e.jsx("circle",{cx:"34",cy:"46",r:"3",fill:"#34D399",opacity:".25"}),e.jsx("circle",{cx:"66",cy:"46",r:"3",fill:"#34D399",opacity:".25"})]})]})}function Ce(){return e.jsxs("svg",{viewBox:"0 0 100 100",fill:"none",children:[e.jsx("ellipse",{cx:"50",cy:"90",rx:"24",ry:"4",fill:"rgba(6,95,70,.16)"}),e.jsxs("g",{className:"floatA",children:[e.jsx("rect",{x:"22",y:"30",width:"56",height:"40",rx:"8",fill:"#fff"}),e.jsx("rect",{x:"22",y:"30",width:"56",height:"8",rx:"8",fill:"#34D399",opacity:".5"}),e.jsx("line",{x1:"32",y1:"48",x2:"68",y2:"48",stroke:"#065F46",strokeWidth:"2",strokeLinecap:"round",opacity:".2"}),e.jsx("line",{x1:"40",y1:"58",x2:"62",y2:"58",stroke:"#065F46",strokeWidth:"2",strokeLinecap:"round",opacity:".15"}),e.jsx("rect",{x:"38",y:"55",width:"24",height:"20",rx:"4",fill:"#34D399",opacity:".2"}),e.jsx("text",{x:"50",y:"71",textAnchor:"middle",fontFamily:"'Fredoka',sans-serif",fontWeight:"700",fontSize:"11",fill:"#fff",children:"JK"})]}),e.jsx("circle",{cx:"77",cy:"28",r:"10",fill:"#FCD34D",className:"pulse",opacity:".7"}),e.jsx("path",{d:"M73 28 L76 31 L82 24",stroke:"#fff",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]})}const Ee=[Fe,Ae,Ne,ze,Be];function Ue({onBack:d,language:o="bm"}){const[s,n]=i.useState(null),[f,m]=i.useState(!1);return i.useEffect(()=>(s?document.body.style.overflow="hidden":document.body.style.overflow="",()=>{document.body.style.overflow=""}),[s]),f?e.jsx(Se,{onBack:()=>m(!1),onHome:()=>m(!1),language:o}):e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        ${Q}
        .jw-page {
          flex: 1; display: flex; flex-direction: column; width: 100%; max-width: 100%;
          background-image: ${a.pageGradient};
          background-repeat: no-repeat;
          background-color: #A7F3D0;
          font-family: 'Fredoka',system-ui,sans-serif;
          color: ${a.dark};
        }
        .jw-topbar {
          position: sticky; top: 0; z-index: 40;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 14px clamp(16px,4vw,40px);
          background: rgba(255,255,255,.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid ${a.accent}2E;
          box-shadow: 0 4px 18px ${a.dark}12;
        }
        .jw-crumb {
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 13px; letter-spacing: .04em; color: #8A5670;
        }
        .jw-hero {
          max-width: 760px; margin: 0 auto;
          padding: clamp(34px,6vw,64px) 24px 10px; text-align: center;
        }
        .jw-badge {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 12px; letter-spacing: .14em; text-transform: uppercase;
          color: #fff;
          background: linear-gradient(180deg,${a.accent}cc,${a.accent});
          padding: 7px 18px; border-radius: 999px;
          box-shadow: 0 4px 12px -4px ${a.dark}80;
        }
        .jw-emoji-icon {
          font-size: clamp(54px,11vw,80px); line-height: 1;
          margin: 18px 0 6px; display: block;
          filter: drop-shadow(0 8px 14px ${a.dark}48);
          animation: jw-bob 3.4s ease-in-out infinite;
        }
        @keyframes jw-bob {
          0%,100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-9px) rotate(2deg); }
        }
        .jw-h1 {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(30px,6.5vw,48px); line-height: 1.08;
          color: ${a.dark}; margin: 0 0 14px;
          text-shadow: 0 2px 0 #fff;
        }
        .jw-lead {
          font-size: clamp(15px,2.4vw,18px); font-weight: 500;
          line-height: 1.6; color: #8A5670;
          max-width: 600px; margin: 0 auto; text-wrap: pretty;
        }
        .jw-progress {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          margin: 46px auto 6px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 14px; color: ${a.dark};
        }
        .jw-progress .jw-dot {
          width: 9px; height: 9px; border-radius: 50%;
          background: ${a.accent};
          box-shadow: 0 0 0 4px ${a.accent}2E;
        }
        .jw-sec-title {
          text-align: center; font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(22px,4vw,30px); color: ${a.dark};
          margin: 4px 0 4px;
        }
        .jw-sec-sub {
          text-align: center; font-size: 13px; letter-spacing: .14em;
          text-transform: uppercase; font-weight: 600;
          color: #8A5670; margin: 0 0 36px;
        }
        .jw-grid {
          max-width: 1080px; margin: 0 auto;
          padding: 0 clamp(16px,4vw,28px) 30px;
          display: grid; grid-template-columns: 1fr; gap: 24px;
        }
        @media(min-width:600px){.jw-grid{grid-template-columns:repeat(2,1fr)}}
        @media(min-width:980px){.jw-grid{grid-template-columns:repeat(3,1fr)}}
        .jw-card {
          position: relative;
          background: linear-gradient(180deg,#fff,#FEF4F8);
          border-radius: 24px;
          padding: 26px 22px 28px;
          border: 1px solid ${a.accent}28;
          box-shadow: 0 14px 34px -16px ${a.dark}48,0 2px 6px ${a.dark}0D;
          display: flex; flex-direction: column; align-items: center; text-align: center;
          gap: 13px;
          transition: transform .3s cubic-bezier(.34,1.56,.64,1),box-shadow .3s ease;
          cursor: pointer; border: none; width: 100%; font-family: inherit;
          -webkit-tap-highlight-color: transparent;
        }
        .jw-card:hover { transform: translateY(-8px); box-shadow: 0 26px 50px -18px ${a.dark}66; }
        .jw-card:active { transform: translateY(-3px) scale(.99); }
        .jw-card:focus-visible { outline: 3px solid ${a.accent}; outline-offset: 2px; }
        .jw-num {
          position: absolute; top: 14px; left: 16px;
          font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 13px;
          color: #fff;
          background: linear-gradient(180deg,${a.accent}cc,${a.accent});
          width: 30px; height: 30px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 3px 8px -2px ${a.dark}80;
        }
        .jw-stage {
          width: 120px; height: 120px; border-radius: 24px;
          display: flex; align-items: center; justify-content: center;
          background: ${a.stageGradient};
          box-shadow: inset 0 -7px 20px ${a.dark}33,inset 0 2px 0 rgba(255,255,255,.5);
          margin-top: 6px;
        }
        .jw-stage svg { width: 78%; height: 78%; overflow: visible; }
        .jw-ctitle {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: 19px; color: ${a.dark}; margin: 2px 0 0;
        }
        .jw-csub {
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 11px; letter-spacing: .08em;
          text-transform: uppercase; color: ${a.accent}; margin: 0;
        }
        .jw-cdesc {
          font-size: 13.5px; font-weight: 500; line-height: 1.55;
          color: #8A5670; margin: 2px 0 0;
        }
        .jw-foot { text-align: center; padding: 10px 20px 50px; color: #8A5670; font-size: 12.5px; font-weight: 500; }

        .t-alphabet {
          --base: #9D4EDD; --deep: #5B2A8A; --base-light: #B67AE6;
          --base-glow60: rgba(157,78,221,0.6); --base-glow70: rgba(157,78,221,0.7); --base-soft: #E2CAF5;
        }
        .jw-icon-card {
          position: relative; border: 0; padding: 0; aspect-ratio: 1/1; width: 100%;
          cursor: pointer; font-family: inherit; background: transparent; overflow: visible;
          transition: transform .35s cubic-bezier(.34,1.56,.64,1), filter .35s;
          animation: jw-tileIn .6s cubic-bezier(.34,1.56,.64,1) forwards;
          -webkit-tap-highlight-color: transparent;
          display: flex; align-items: center; justify-content: center;
          transform-style: preserve-3d;
        }
        @keyframes jw-tileIn {
          0% { opacity: 0; transform: translateY(28px) scale(.94); }
          70% { opacity: 1; transform: translateY(-6px) scale(1.02); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .jw-icon-card.t-alphabet:hover {
          transform: translateY(-12px) rotateX(8deg) rotateY(-12deg) scale(1.1);
          filter: brightness(1.15) drop-shadow(0 20px 30px rgba(157,78,221,.25));
        }
        .jw-icon-card:active {
          transform: translateY(0) rotateX(0) rotateY(0) scale(.96);
        }
        .jw-icon-card:focus-visible { outline: none; }
        .jw-icon-card svg { width: 100%; height: 100%; filter: drop-shadow(0 8px 16px rgba(0,0,0,.15)); transition: filter .35s; transform-style: preserve-3d; }
        .jw-icon-card:hover svg { filter: drop-shadow(0 12px 24px rgba(0,0,0,.2)); }

        .floatA { animation: jw-floatA 3.6s ease-in-out infinite; transform-origin: center; }
        @keyframes jw-floatA { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        .pulse { animation: jw-pulse 2.2s ease-in-out infinite; }
        @keyframes jw-pulse { 0%,100% { opacity: .45; } 50% { opacity: 1; } }

        /* Modal overlay — confined to .app-container */
        .jw-overlay {
          position: absolute; inset: 0; z-index: 999;
          background: rgba(0,0,0,0.8);
          display: flex; align-items: center; justify-content: center;
          animation: jw-fadeIn .2s ease;
        }
        @keyframes jw-fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .jw-modal {
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          width: 100%; height: 100%;
          display: flex; flex-direction: column;
          box-shadow: 0 25px 60px rgba(0,0,0,0.3);
          animation: jw-slideUp .25s cubic-bezier(.34,1.56,.64,1);
          overflow: hidden;
        }
        @keyframes jw-slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        .jw-modal-header {
          display: flex; justify-content: space-between; align-items: center;
          padding: 14px 20px;
          border-bottom: 1px solid #E5E7EB;
          flex: none; background: #fff; z-index: 1;
        }
        .jw-modal-title {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(18px,3vw,24px);
          color: ${a.dark}; margin: 0;
        }
        .jw-close {
          width: 36px; height: 36px; border-radius: 50%;
          border: none; background: #F3F4F6;
          font-size: 18px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: #6B7280; transition: background .15s;
          font-family: inherit;
        }
        .jw-close:hover { background: #E5E7EB; }

        .jw-modal-body {
          flex: 1; overflow-y: auto; -webkit-overflow-scrolling: touch;
          padding: 20px 16px 24px;
        }

        /* Word grid */
        .jw-word-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        @media (min-width: 768px) {
          .jw-word-grid { grid-template-columns: repeat(5, 1fr); }
        }

        .jw-word-card {
          background: #fff;
          border: 2px solid ${a.accent}22;
          border-radius: 16px;
          padding: 12px 8px;
          display: flex; flex-direction: column;
          align-items: center; text-align: center;
          gap: 4px;
          box-shadow: 0 2px 8px ${a.dark}0D;
          transition: transform .2s cubic-bezier(.34,1.56,.64,1);
        }
        .jw-word-card:hover { transform: translateY(-3px) scale(1.03); }

        .jw-word-emoji {
          font-size: clamp(1.5rem, 4vw, 2.2rem);
          line-height: 1;
        }
        .jw-word-jawi {
          font-size: clamp(1.1rem, 3vw, 1.6rem);
          font-weight: 700;
          color: #1F2937;
          font-family: 'Amiri', serif;
          line-height: 1.1;
        }
        .jw-word-rumi {
          font-size: clamp(0.7rem, 1.8vw, 0.85rem);
          color: #6B7280;
          font-weight: 600;
          font-family: 'Fredoka', system-ui, sans-serif;
        }
        .jw-word-eng {
          font-size: clamp(0.6rem, 1.5vw, 0.72rem);
          color: #9CA3AF;
          font-weight: 500;
          font-family: 'Fredoka', system-ui, sans-serif;
        }

        @media(prefers-reduced-motion:reduce){*{animation:none!important}}
      `}),e.jsxs("div",{className:"jw-page",children:[e.jsxs("div",{className:"jw-topbar",children:[e.jsx("div",{style:{position:"absolute",left:"clamp(16px,4vw,40px)"},children:e.jsx(fe,{onClick:d})}),e.jsxs("span",{className:"jw-crumb",children:["Modul 6 · Jawi › ",e.jsx("span",{style:{color:a.dark,fontWeight:800},children:o==="bm"?"Perkataan Jawi":"Jawi Words"})]})]}),e.jsxs("header",{className:"jw-hero",children:[e.jsx("span",{className:"jw-badge",children:o==="bm"?"Pendidikan Islam · Tahun 1":"Islamic Education · Year 1"}),e.jsx("span",{className:"jw-emoji-icon",children:"🖋️"}),e.jsx("h1",{className:"jw-h1",children:o==="bm"?"Perkataan Jawi":"Jawi Words"}),e.jsx("p",{className:"jw-lead",children:o==="bm"?"Mari belajar perkataan Jawi asas dengan ejaan dan sebutan yang betul. Jawi adalah tulisan tradisional Bahasa Melayu yang indah dan bersejarah.":"Let's learn basic Jawi words with correct spelling and pronunciation. Jawi is the beautiful traditional script of the Malay language."})]}),e.jsx("h2",{className:"jw-sec-title",children:o==="bm"?"Topik Pembelajaran":"Learning Topics"}),e.jsx("p",{className:"jw-sec-sub",children:o==="bm"?"Ketuk setiap kad untuk melihat perkataan":"Tap each card to see the words"}),e.jsxs("div",{className:"jw-grid",children:[w.map((c,p)=>e.jsxs("button",{className:"jw-card",onClick:()=>n(c),children:[e.jsx("span",{className:"jw-num",children:p+1}),e.jsx("div",{className:"jw-stage",children:pe.createElement(Ee[p])}),e.jsx("p",{className:"jw-csub",children:o==="bm"?"Pilih Kategori":"Choose Category"}),e.jsx("h3",{className:"jw-ctitle",children:o==="bm"?c.title:c.titleEng}),e.jsxs("p",{className:"jw-cdesc",children:[c.words.length," ",o==="bm"?"Perkataan":"Words"]})]},c.id)),e.jsxs("button",{className:"jw-card",onClick:()=>m(!0),style:{borderColor:"#F59E0B44",background:"linear-gradient(180deg,#FFF6E2,#FEF4E6)"},children:[e.jsx("span",{className:"jw-num",style:{background:"linear-gradient(180deg,#FCD34D,#F59E0B)"},children:"🎯"}),e.jsx("div",{className:"jw-stage",style:{background:"radial-gradient(ellipse at 50% 32%,#FDE68A 0%,#FCD34D 55%,#F59E0B 100%)"},children:e.jsx(Ce,{})}),e.jsx("p",{className:"jw-csub",style:{color:"#D97706"},children:o==="bm"?"Cabaran Menulis":"Writing Challenge"}),e.jsx("h3",{className:"jw-ctitle",children:o==="bm"?"Taip Rumi dari Jawi":"Type Rumi from Jawi"}),e.jsx("p",{className:"jw-cdesc",children:o==="bm"?"Lihat Jawi, taip jawapan Rumi":"See Jawi, type the Rumi answer"})]})]}),e.jsx("p",{className:"jw-foot",children:"ImanGenius · Pendidikan Islam"})]}),s&&xe.createPortal(e.jsx("div",{className:"jw-overlay",onClick:()=>n(null),children:e.jsxs("div",{className:"jw-modal",onClick:c=>c.stopPropagation(),children:[e.jsxs("div",{className:"jw-modal-header",children:[e.jsx("h2",{className:"jw-modal-title",children:o==="bm"?s.title:s.titleEng}),e.jsx("button",{className:"jw-close",onClick:()=>n(null),"aria-label":"Close",children:"✕"})]}),e.jsx("div",{className:"jw-modal-body",children:e.jsx("div",{className:"jw-word-grid",children:s.words.map((c,p)=>e.jsxs("div",{className:"jw-word-card",children:[e.jsx("span",{className:"jw-word-emoji",children:c.emoji}),e.jsx("span",{className:"jw-word-jawi",children:c.jawi}),e.jsx("span",{className:"jw-word-rumi",children:c.rumi}),e.jsx("span",{className:"jw-word-eng",children:c.eng})]},p))})})]})}),document.querySelector(".app-container")||document.body)]})}export{Ue as default};
