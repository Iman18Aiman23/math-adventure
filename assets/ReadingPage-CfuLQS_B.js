const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/KVLearningPage-d0Q9uiKF.js","assets/index-YCInXYg5.js","assets/index-D3Znixer.css","assets/bm_kv-DBa1ZENM.js","assets/BMHeader-B5cOc9J_.js","assets/volume-2-B9qgBXCR.js","assets/chevron-left-BLXk0NUJ.js","assets/chevron-right--_L4we7T.js","assets/KVKLearningPage-DCWXHdOm.js","assets/bm_kvk-CwD2A4Vo.js","assets/BackButton-DoWsAqH6.js","assets/arrow-left-B6fmfze-.js"])))=>i.map(i=>d[i]);
import{j as t,r as d,e as p,S as j,u as W,g as Y,b as T,L as I,R as B,_ as $}from"./index-YCInXYg5.js";import{E as A,S as N,L as G,a as P}from"./LearningIcons-Bd_1NsSX.js";import{P as U}from"./PageLayout-Cuuwyiq9.js";import{r as D}from"./readingData-nYBCYstD.js";import{A as z}from"./arrow-left-B6fmfze-.js";import{V as M}from"./volume-2-B9qgBXCR.js";import"./BackButton-DoWsAqH6.js";function _({className:u="",style:a={},...o}){return t.jsxs("svg",{viewBox:"0 0 360 240",className:u,style:a,...o,children:[t.jsx("use",{href:"#robotHead",width:"360",height:"240"}),t.jsxs("g",{transform:"rotate(-3 180 180)",filter:"url(#fShadowSoft)",children:[t.jsx("path",{d:"M170 160h20",stroke:"#FFC107",strokeWidth:"4",strokeLinecap:"round"}),t.jsx("circle",{cx:"152",cy:"160",r:"24",fill:"rgba(255,255,255,.12)",stroke:"#FFC107",strokeWidth:"4"}),t.jsx("circle",{cx:"208",cy:"160",r:"24",fill:"rgba(255,255,255,.12)",stroke:"#FFC107",strokeWidth:"4"}),t.jsx("path",{d:"M128 156q-12 -2 -18 -6",stroke:"#FFC107",strokeWidth:"4",strokeLinecap:"round",fill:"none"}),t.jsx("path",{d:"M232 156q12 -2 18 -6",stroke:"#FFC107",strokeWidth:"4",strokeLinecap:"round",fill:"none"}),t.jsx("path",{d:"M142 148q8 -8 16 0",stroke:"#fff",strokeWidth:"2",fill:"none",strokeLinecap:"round",opacity:".8"}),t.jsx("path",{d:"M198 148q8 -8 16 0",stroke:"#fff",strokeWidth:"2",fill:"none",strokeLinecap:"round",opacity:".8"})]}),t.jsxs("g",{transform:"rotate(-3 180 180)",children:[t.jsxs("g",{className:"rb-blink",children:[t.jsx("ellipse",{cx:"152",cy:"160",rx:"12",ry:"13",fill:"url(#gEye)",filter:"url(#fGlow)"}),t.jsx("ellipse",{cx:"152",cy:"160",rx:"7",ry:"7",fill:"#0E2A3D"}),t.jsx("circle",{cx:"149",cy:"157",r:"3",fill:"#fff"}),t.jsx("ellipse",{cx:"208",cy:"160",rx:"12",ry:"13",fill:"url(#gEye)",filter:"url(#fGlow)"}),t.jsx("ellipse",{cx:"208",cy:"160",rx:"7",ry:"7",fill:"#0E2A3D"}),t.jsx("circle",{cx:"205",cy:"157",r:"3",fill:"#fff"})]}),t.jsx("path",{d:"M156 192 Q180 210 204 192",stroke:"#46D8FF",strokeWidth:"6.5",strokeLinecap:"round",fill:"none",filter:"url(#fGlow)"}),t.jsx("ellipse",{cx:"138",cy:"192",rx:"8",ry:"5",fill:"#FFB3C7",opacity:".55"}),t.jsx("ellipse",{cx:"222",cy:"192",rx:"8",ry:"5",fill:"#FFB3C7",opacity:".55"})]})]})}const x={colors:{bg:"#FFFDF8",ink:"#111827",muted:"#6B7280",hair:"#E5E7EB"}},V=[{key:"RUMI",label:"RUMI",color:"#1CB0F6",bg:"#D0F0FF"},{key:"ENG",label:"ENG",color:"#FF9600",bg:"#FFF0CC"},{key:"JAWI",label:"JAWI",color:"#CE82FF",bg:"#EDD9FF"}],L={3:{color:"#CE82FF",bg:"#EDD9FF",shadow:"#E6B3FF",darkColor:"#9B59B6"}},H=u=>L[u]||L[3],K=`
  .flashcard-box {
    border-radius: 24px;
    padding: 2.4rem 1.8rem;
    max-width: 600px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
  .nav-controls {
    display: flex;
    gap: 0.75rem;
    padding: 1rem;
    padding-bottom: calc(1rem + env(safe-area-inset-bottom, 0px));
    background: #fff;
    border-top: 2px solid #E5E5E5;
    flex-shrink: 0;
  }
  @keyframes floaty {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
  }
  @keyframes modalFadeIn {
    from { opacity: 0; transform: translateY(-12px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;function J({onBack:u,language:a}){const[o,g]=d.useState(0),[l,w]=d.useState("RUMI"),[F,b]=d.useState(!1),[n,f]=d.useState(null),c=D.filter(e=>e.level===3),s=c[o]||null,r=H(3),S=()=>{o<c.length-1&&(p(),g(e=>e+1),b(!1),f(null))},v=()=>{o>0&&(p(),g(e=>e-1),b(!1),f(null))},h=()=>{p();const e=l==="ENG"?s?.eng:s?.rumi.replace(/-/g,""),i=l==="ENG"?"en-US":"ms-MY";j.speak(e,i),b(!0)},E=(e,i)=>{p(),j.speak(i,"ms-MY"),f(e)};return t.jsxs("div",{className:"reading-page-wrapper",style:{display:"flex",flexDirection:"column",height:"100%",background:x.colors.bg,position:"relative"},children:[t.jsx("style",{children:K}),t.jsx("button",{type:"button",onClick:u,style:{position:"absolute",top:"1rem",left:"1rem",background:"#fff",border:`2px solid ${x.colors.hair}`,borderRadius:"50%",width:44,height:44,display:"flex",alignItems:"center",justifyContent:"center",color:x.colors.muted,cursor:"pointer",boxShadow:`0 3px 0 ${x.colors.hair}`,transition:"transform .12s",zIndex:10},onMouseEnter:e=>{e.currentTarget.style.transform="translateY(-1px)"},onMouseLeave:e=>{e.currentTarget.style.transform="translateY(0)"},children:t.jsx(z,{size:24})}),t.jsxs("div",{className:"landscape-content",style:{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"1.5rem",padding:"clamp(0.5rem, 2vw, 1rem)",width:"100%",boxSizing:"border-box",maxWidth:"100%"},children:[t.jsx("div",{style:{display:"flex",gap:"0.5rem",justifyContent:"center",marginTop:"2rem"},children:V.map(e=>t.jsx("button",{type:"button",onClick:()=>{p(),w(e.key),f(null),b(!1)},style:{background:l===e.key?e.color:"#fff",color:l===e.key?"#fff":e.color,border:`2px solid ${e.color}`,borderRadius:"12px",padding:"6px 16px",fontWeight:800,fontSize:"0.85rem",cursor:"pointer",transition:"all 0.15s ease",boxShadow:l===e.key?`0 4px 0 ${e.color}`:"none"},children:e.label},e.key))}),t.jsxs("div",{className:"flashcard-box",style:{background:"#fff",boxShadow:`0 12px 0 ${r.shadow}, 0 22px 28px -10px rgba(0,0,0,.22)`,position:"relative"},children:[t.jsx("button",{type:"button",onClick:h,title:"Read Full Text",style:{position:"absolute",top:16,right:16,background:"#f0f0f0",border:"none",borderRadius:"50%",width:44,height:44,display:"flex",alignItems:"center",justifyContent:"center",color:r.color,cursor:"pointer",transition:"transform 0.1s",boxShadow:`0 3px 0 ${x.colors.hair}`},onMouseDown:e=>e.currentTarget.style.transform="scale(0.9)",onMouseUp:e=>e.currentTarget.style.transform="scale(1)",onMouseLeave:e=>e.currentTarget.style.transform="scale(1)",children:t.jsx(M,{size:24})}),t.jsx("span",{style:{fontSize:"5rem",marginBottom:"1.5rem",animation:"floaty 3.6s ease-in-out infinite"},children:s?.emoji}),l==="RUMI"&&t.jsx("div",{style:{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"12px"},children:s?.syllables.map((e,i)=>{const y=e.trim(),k=n===i;return t.jsx("button",{onClick:()=>E(i,y),style:{background:k?r.color:"#fff",color:k?"#fff":x.colors.ink,border:`2px solid ${r.color}`,borderRadius:"18px",padding:"14px 24px",fontSize:"1.8rem",fontWeight:900,cursor:"pointer",transition:"all 0.15s ease",transform:k?"scale(1.1)":"scale(1)",boxShadow:k?`0 6px 12px ${r.color}40`:`0 3px 0 ${x.colors.hair}`},children:y},i)})}),l==="JAWI"&&t.jsx("button",{type:"button",onClick:()=>{p(),j.speak(s?.rumi.replace(/-/g,""),"ms-MY"),f(0)},style:{fontSize:"3.5rem",fontWeight:900,color:n===0?"#fff":x.colors.ink,direction:"rtl",fontFamily:'"Lateef", serif',lineHeight:1.5,textAlign:"center",background:n===0?r.color:"#fff",border:`2px solid ${r.color}`,borderRadius:"20px",padding:"16px 28px",cursor:"pointer",width:"100%",transition:"all 0.15s ease",transform:n===0?"scale(1.05)":"scale(1)",boxShadow:n===0?`0 6px 12px ${r.color}40`:`0 3px 0 ${x.colors.hair}`},onMouseDown:e=>e.currentTarget.style.transform="scale(0.98)",onMouseUp:e=>e.currentTarget.style.transform=n===0?"scale(1.05)":"scale(1)",onMouseLeave:e=>e.currentTarget.style.transform=n===0?"scale(1.05)":"scale(1)",children:s?.jawi}),l==="ENG"&&t.jsx("button",{type:"button",onClick:()=>{p(),j.speak(s?.eng,"en-US"),f(0)},style:{fontSize:"2.8rem",fontWeight:900,color:n===0?"#fff":x.colors.ink,textAlign:"center",lineHeight:1.3,background:n===0?r.color:"#fff",border:`2px solid ${r.color}`,borderRadius:"20px",padding:"16px 28px",cursor:"pointer",width:"100%",transition:"all 0.15s ease",transform:n===0?"scale(1.05)":"scale(1)",boxShadow:n===0?`0 6px 12px ${r.color}40`:`0 3px 0 ${x.colors.hair}`},onMouseDown:e=>e.currentTarget.style.transform="scale(0.98)",onMouseUp:e=>e.currentTarget.style.transform=n===0?"scale(1.05)":"scale(1)",onMouseLeave:e=>e.currentTarget.style.transform=n===0?"scale(1.05)":"scale(1)",children:s?.eng}),F&&t.jsxs("div",{style:{marginTop:"2rem",width:"100%",background:r.bg,borderRadius:"18px",border:`2px solid ${r.color}`,padding:"1.2rem",textAlign:"center",animation:"modalFadeIn 0.2s ease-out"},children:[t.jsx("div",{style:{color:r.color,fontWeight:900,fontSize:"1.2rem",marginBottom:"6px"},children:s?.eng}),t.jsxs("div",{style:{color:x.colors.muted,fontWeight:700,fontSize:"0.95rem"},children:['🗣️ "',s?.phonetic,'"']})]})]})]}),t.jsxs("div",{className:"nav-controls",children:[t.jsx("button",{type:"button",onClick:v,disabled:o===0,style:{width:"44px",height:"44px",borderRadius:"14px",border:"0",background:o===0?"#E5E5E5":"#fff",color:x.colors.muted,fontWeight:900,fontSize:"1.2rem",cursor:o===0?"not-allowed":"pointer",boxShadow:o===0?"none":`0 3px 0 ${x.colors.hair}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"transform .12s"},onMouseEnter:e=>{o>0&&(e.currentTarget.style.transform="translateY(-1px)")},onMouseLeave:e=>{e.currentTarget.style.transform="translateY(0)"},children:"<"}),t.jsxs("button",{type:"button",onClick:h,style:{flex:1,padding:"0.9rem 1.2rem",borderRadius:"16px",border:`2px solid ${r.color}`,background:"#fff",color:r.color,fontWeight:900,fontSize:"1rem",cursor:"pointer",boxShadow:`0 4px 0 ${r.shadow}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",transition:"transform .12s"},onMouseEnter:e=>{e.currentTarget.style.transform="translateY(-1px)"},onMouseLeave:e=>{e.currentTarget.style.transform="translateY(0)"},children:[t.jsx(M,{size:20}),a==="bm"?"Dengar":"Listen"]}),t.jsxs("button",{type:"button",onClick:S,disabled:o===c.length-1,style:{flex:1,padding:"0.9rem 1.2rem",borderRadius:"16px",border:"none",background:o===c.length-1?"#E5E5E5":r.color,color:"#fff",fontWeight:900,fontSize:"1rem",cursor:o===c.length-1?"not-allowed":"pointer",boxShadow:o===c.length-1?"none":`0 4px 0 ${r.darkColor}`,transition:"transform .12s"},onMouseEnter:e=>{o<c.length-1&&(e.currentTarget.style.transform="translateY(-1px)")},onMouseLeave:e=>{e.currentTarget.style.transform="translateY(0)"},children:[a==="bm"?"Seterusnya":"Next"," ",">"]})]})]})}const m={colors:{bg:"#FFFDF8",ink:"#111827",muted:"#6B7280",hair:"#E5E7EB"}},q=[{key:"RUMI",label:"RUMI",color:"#1CB0F6",bg:"#D0F0FF"},{key:"ENG",label:"ENG",color:"#FF9600",bg:"#FFF0CC"},{key:"JAWI",label:"JAWI",color:"#CE82FF",bg:"#EDD9FF"}],R={4:{color:"#58CC02",bg:"#E6FFD4",shadow:"#B3E080",darkColor:"#46A302"}},O=u=>R[u]||R[4],Q=`
  .flashcard-box {
    border-radius: 24px;
    padding: 2.4rem 1.8rem;
    max-width: 600px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
  .nav-controls {
    display: flex;
    gap: 0.75rem;
    padding: 1rem;
    padding-bottom: calc(1rem + env(safe-area-inset-bottom, 0px));
    background: #fff;
    border-top: 2px solid #E5E5E5;
    flex-shrink: 0;
  }
  @keyframes floaty {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
  }
  @keyframes modalFadeIn {
    from { opacity: 0; transform: translateY(-12px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;function X({onBack:u,language:a}){const[o,g]=d.useState(0),[l,w]=d.useState("RUMI"),[F,b]=d.useState(!1),[n,f]=d.useState(null),c=D.filter(e=>e.level===4),s=c[o]||null,r=O(4),S=()=>{o<c.length-1&&(p(),g(e=>e+1),b(!1),f(null))},v=()=>{o>0&&(p(),g(e=>e-1),b(!1),f(null))},h=()=>{p();const e=l==="ENG"?s?.eng:s?.rumi.replace(/-/g,""),i=l==="ENG"?"en-US":"ms-MY";j.speak(e,i),b(!0)},E=(e,i)=>{p(),j.speak(i,"ms-MY"),f(e)};return t.jsxs("div",{className:"reading-page-wrapper",style:{display:"flex",flexDirection:"column",height:"100%",background:m.colors.bg,position:"relative"},children:[t.jsx("style",{children:Q}),t.jsx("button",{type:"button",onClick:u,style:{position:"absolute",top:"1rem",left:"1rem",background:"#fff",border:`2px solid ${m.colors.hair}`,borderRadius:"50%",width:44,height:44,display:"flex",alignItems:"center",justifyContent:"center",color:m.colors.muted,cursor:"pointer",boxShadow:`0 3px 0 ${m.colors.hair}`,transition:"transform .12s",zIndex:10},onMouseEnter:e=>{e.currentTarget.style.transform="translateY(-1px)"},onMouseLeave:e=>{e.currentTarget.style.transform="translateY(0)"},children:t.jsx(z,{size:24})}),t.jsxs("div",{className:"landscape-content",style:{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"1.5rem",padding:"clamp(0.5rem, 2vw, 1rem)",width:"100%",boxSizing:"border-box",maxWidth:"100%"},children:[t.jsx("div",{style:{display:"flex",gap:"0.5rem",justifyContent:"center",marginTop:"2rem"},children:q.map(e=>t.jsx("button",{type:"button",onClick:()=>{p(),w(e.key),f(null),b(!1)},style:{background:l===e.key?e.color:"#fff",color:l===e.key?"#fff":e.color,border:`2px solid ${e.color}`,borderRadius:"12px",padding:"6px 16px",fontWeight:800,fontSize:"0.85rem",cursor:"pointer",transition:"all 0.15s ease",boxShadow:l===e.key?`0 4px 0 ${e.color}`:"none"},children:e.label},e.key))}),t.jsxs("div",{className:"flashcard-box",style:{background:"#fff",boxShadow:`0 12px 0 ${r.shadow}, 0 22px 28px -10px rgba(0,0,0,.22)`,position:"relative"},children:[t.jsx("button",{type:"button",onClick:h,title:"Read Full Text",style:{position:"absolute",top:16,right:16,background:"#f0f0f0",border:"none",borderRadius:"50%",width:44,height:44,display:"flex",alignItems:"center",justifyContent:"center",color:r.color,cursor:"pointer",transition:"transform 0.1s",boxShadow:`0 3px 0 ${m.colors.hair}`},onMouseDown:e=>e.currentTarget.style.transform="scale(0.9)",onMouseUp:e=>e.currentTarget.style.transform="scale(1)",onMouseLeave:e=>e.currentTarget.style.transform="scale(1)",children:t.jsx(M,{size:24})}),t.jsx("span",{style:{fontSize:"5rem",marginBottom:"1.5rem",animation:"floaty 3.6s ease-in-out infinite"},children:s?.emoji}),l==="RUMI"&&t.jsx("div",{style:{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"12px"},children:s?.syllables.map((e,i)=>{const y=e.trim(),k=n===i;return t.jsx("button",{onClick:()=>E(i,y),style:{background:k?r.color:"#fff",color:k?"#fff":m.colors.ink,border:`2px solid ${r.color}`,borderRadius:"18px",padding:"14px 24px",fontSize:"1.8rem",fontWeight:900,cursor:"pointer",transition:"all 0.15s ease",transform:k?"scale(1.1)":"scale(1)",boxShadow:k?`0 6px 12px ${r.color}40`:`0 3px 0 ${m.colors.hair}`},children:y},i)})}),l==="JAWI"&&t.jsx("button",{type:"button",onClick:()=>{p(),j.speak(s?.rumi.replace(/-/g,""),"ms-MY"),f(0)},style:{fontSize:"3.5rem",fontWeight:900,color:n===0?"#fff":m.colors.ink,direction:"rtl",fontFamily:'"Lateef", serif',lineHeight:1.5,textAlign:"center",background:n===0?r.color:"#fff",border:`2px solid ${r.color}`,borderRadius:"20px",padding:"16px 28px",cursor:"pointer",width:"100%",transition:"all 0.15s ease",transform:n===0?"scale(1.05)":"scale(1)",boxShadow:n===0?`0 6px 12px ${r.color}40`:`0 3px 0 ${m.colors.hair}`},onMouseDown:e=>e.currentTarget.style.transform="scale(0.98)",onMouseUp:e=>e.currentTarget.style.transform=n===0?"scale(1.05)":"scale(1)",onMouseLeave:e=>e.currentTarget.style.transform=n===0?"scale(1.05)":"scale(1)",children:s?.jawi}),l==="ENG"&&t.jsx("button",{type:"button",onClick:()=>{p(),j.speak(s?.eng,"en-US"),f(0)},style:{fontSize:"2.8rem",fontWeight:900,color:n===0?"#fff":m.colors.ink,textAlign:"center",lineHeight:1.3,background:n===0?r.color:"#fff",border:`2px solid ${r.color}`,borderRadius:"20px",padding:"16px 28px",cursor:"pointer",width:"100%",transition:"all 0.15s ease",transform:n===0?"scale(1.05)":"scale(1)",boxShadow:n===0?`0 6px 12px ${r.color}40`:`0 3px 0 ${m.colors.hair}`},onMouseDown:e=>e.currentTarget.style.transform="scale(0.98)",onMouseUp:e=>e.currentTarget.style.transform=n===0?"scale(1.05)":"scale(1)",onMouseLeave:e=>e.currentTarget.style.transform=n===0?"scale(1.05)":"scale(1)",children:s?.eng}),F&&t.jsxs("div",{style:{marginTop:"2rem",width:"100%",background:r.bg,borderRadius:"18px",border:`2px solid ${r.color}`,padding:"1.2rem",textAlign:"center",animation:"modalFadeIn 0.2s ease-out"},children:[t.jsx("div",{style:{color:r.color,fontWeight:900,fontSize:"1.2rem",marginBottom:"6px"},children:s?.eng}),t.jsxs("div",{style:{color:m.colors.muted,fontWeight:700,fontSize:"0.95rem"},children:['🗣️ "',s?.phonetic,'"']})]})]})]}),t.jsxs("div",{className:"nav-controls",children:[t.jsx("button",{type:"button",onClick:v,disabled:o===0,style:{width:"44px",height:"44px",borderRadius:"14px",border:"0",background:o===0?"#E5E5E5":"#fff",color:m.colors.muted,fontWeight:900,fontSize:"1.2rem",cursor:o===0?"not-allowed":"pointer",boxShadow:o===0?"none":`0 3px 0 ${m.colors.hair}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"transform .12s"},onMouseEnter:e=>{o>0&&(e.currentTarget.style.transform="translateY(-1px)")},onMouseLeave:e=>{e.currentTarget.style.transform="translateY(0)"},children:"<"}),t.jsxs("button",{type:"button",onClick:h,style:{flex:1,padding:"0.9rem 1.2rem",borderRadius:"16px",border:`2px solid ${r.color}`,background:"#fff",color:r.color,fontWeight:900,fontSize:"1rem",cursor:"pointer",boxShadow:`0 4px 0 ${r.shadow}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",transition:"transform .12s"},onMouseEnter:e=>{e.currentTarget.style.transform="translateY(-1px)"},onMouseLeave:e=>{e.currentTarget.style.transform="translateY(0)"},children:[t.jsx(M,{size:20}),a==="bm"?"Dengar":"Listen"]}),t.jsxs("button",{type:"button",onClick:S,disabled:o===c.length-1,style:{flex:1,padding:"0.9rem 1.2rem",borderRadius:"16px",border:"none",background:o===c.length-1?"#E5E5E5":r.color,color:"#fff",fontWeight:900,fontSize:"1rem",cursor:o===c.length-1?"not-allowed":"pointer",boxShadow:o===c.length-1?"none":`0 4px 0 ${r.darkColor}`,transition:"transform .12s"},onMouseEnter:e=>{o<c.length-1&&(e.currentTarget.style.transform="translateY(-1px)")},onMouseLeave:e=>{e.currentTarget.style.transform="translateY(0)"},children:[a==="bm"?"Seterusnya":"Next"," ",">"]})]})]})}const Z=T.lazy(()=>$(()=>import("./KVLearningPage-d0Q9uiKF.js"),__vite__mapDeps([0,1,2,3,4,5,6,7]))),ee=T.lazy(()=>$(()=>import("./KVKLearningPage-DCWXHdOm.js"),__vite__mapDeps([8,1,2,9,10,11,5,6,7]))),C=u=>{switch(u){case 1:return t.jsx(P,{size:200});case 2:return t.jsx(G,{size:200});case 3:return t.jsx(N,{size:200});case 4:return t.jsx(A,{size:200});default:return null}};function ie({onBack:u,language:a}){const[o,g]=d.useState(null),[l,w]=d.useTransition(),[F,b]=d.useState(3),[n,f]=d.useState(0),[c,s]=d.useState(0);W(),d.useEffect(()=>{const h=Y();b(h.hearts),f(h.gems),s(h.stars)},[]);const r=d.useMemo(()=>`
    @keyframes floaty { 0%,100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-6px) rotate(2deg); } }
    @keyframes bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
    @keyframes nudge { 0%,90%,100% { transform: rotate(-1deg); } 45% { transform: rotate(1deg); } }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes pulse { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.15); opacity: 0.8; } }

    svg .bob1 { animation: bob 2.2s ease-in-out infinite; }
    svg .bob2 { animation: bob 2.2s ease-in-out infinite 0.6s; }

    /* Robot arm waving animations */
    svg .rbt1-wave { animation: nudge 0.8s ease-in-out infinite; transform-origin: 160px 220px; }
    svg .rbt2-wave { animation: nudge 0.8s ease-in-out infinite; transform-origin: 160px 220px; }
    svg .rbt3-wave { animation: nudge 0.8s ease-in-out infinite; transform-origin: 160px 220px; }
    svg .rbt4-wave { animation: nudge 0.8s ease-in-out infinite; transform-origin: 160px 220px; }

    * { box-sizing: border-box; }

    /* Tile illustration container (sized to fit inside .rp-illo band) */
    .tile-illustration {
      width: 110px;
      height: 90px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    @media (max-width: 560px) {
      .tile-illustration {
        width: 95px;
        height: 80px;
      }
    }

    /* Illustration blocks (Ba, Ca, Ma, kan) */
    .tile-block-lg { width: 45px; height: 45px; }
    .tile-block-md { width: 42px; height: 42px; }

    @media (max-width: 560px) {
      .tile-block-lg { width: 38px; height: 38px; }
      .tile-block-md { width: 36px; height: 36px; }
    }

    /* Responsive Flashcard */
    .flashcard-container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .flashcard-box {
      width: 100%;
      max-width: 500px;
      border-radius: 28px;
      padding: 3rem 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 380px;
      justify-content: center;
      margin: 0 auto;
    }

    @media (max-width: 768px) {
      .flashcard-box {
        max-width: 100%;
        padding: 2rem 1.5rem;
        min-height: 320px;
      }
    }

    @media (max-width: 480px) {
      .flashcard-box {
        padding: 1.5rem 1rem;
        min-height: 280px;
      }
    }

    /* Responsive Controls */
    .nav-controls {
      display: flex;
      gap: 0.75rem;
      margin-top: 1rem;
      align-items: center;
      flex-wrap: wrap;
    }

    @media (max-width: 480px) {
      .nav-controls {
        gap: 0.5rem;
      }
    }

    /* Mobile: Full width, no side padding */
    @media (max-width: 768px) {
      body, html {
        overflow-x: hidden;
      }
    }

    /* Landscape orientation on mobile */
    @media (orientation: landscape) and (max-height: 500px) {
      body, html {
        margin: 0 !important;
        padding: 0 !important;
        overflow-x: hidden;
        width: 100% !important;
      }
      .reading-page-wrapper {
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      .landscape-content {
        padding: 0 !important;
        width: 100% !important;
        margin: 0 !important;
      }
    }
  `,[]),S=d.useMemo(()=>({1:C(1),2:C(2),3:C(3),4:C(4)}),[a]);if(o===1)return t.jsx(T.Suspense,{fallback:t.jsx(I,{}),children:t.jsx(Z,{onBack:()=>g(null),language:a})});if(o===2)return t.jsx(T.Suspense,{fallback:t.jsx(I,{}),children:t.jsx(ee,{onBack:()=>g(null),language:a})});if(o===3)return t.jsx(J,{onBack:()=>g(null),language:a});if(o===4)return t.jsx(X,{onBack:()=>g(null),language:a});const v=h=>{p(),w(()=>g(h))};if(!o){const h=[{level:1,num:1,capTitle:a==="bm"?"Suku Kata KV":"KV Syllables"},{level:2,num:2,capTitle:a==="bm"?"Suku Kata KVK":"KVK Syllables"},{level:3,num:3,capTitle:a==="bm"?"Baca Perkataan":"Read Words"},{level:4,num:4,capTitle:a==="bm"?"Baca Ayat":"Read Sentences"}],E=a==="bm"?"Dari suku kata ke ayat penuh — satu langkah pada satu masa!":"From syllables to full sentences — one step at a time!",e=t.jsxs(t.Fragment,{children:[t.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"#FFD60A",children:t.jsx("path",{d:"M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"})}),a==="bm"?"Pilih tahap untuk mula belajar!":"Pick a level to start learning!",t.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"#FF1F7A",children:t.jsx("path",{d:"M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"})})]}),i=h.map(y=>t.jsx("button",{className:`rp-icon-card level-${y.level}`,onClick:()=>v(y.level),onMouseEnter:p,type:"button",children:S[y.level]},y.level));return t.jsxs(t.Fragment,{children:[l&&t.jsx(I,{overlay:!0}),t.jsx(B,{}),t.jsx("style",{children:r}),t.jsx(U,{classPrefix:"rp",heroIcon:t.jsx(_,{style:{width:120,height:80}}),heroTitle:a==="bm"?"Belajar Membaca":"Learn to Read",heroSubtitle:E,sectionLabel:a==="bm"?"Pilih Tahap":"Choose Level",hintText:e,onBack:u,children:i})]})}}export{ie as default};
