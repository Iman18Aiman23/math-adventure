import{L as g,r as f,j as e,G as u,X as y,f as v,h as w}from"./index-D9md4qG0.js";import{M as t}from"./timeData-B_ZJr7sg.js";function C({onBack:m,onHome:b,language:l}){const n=g[l].monthLearningDetail,[o,s]=f.useState(null),x=r=>{s(r)},c=()=>{s(null)},h=()=>{const i=(t.findIndex(a=>a.id===o.id)+1)%t.length;s(t[i])},p=()=>{const i=(t.findIndex(a=>a.id===o.id)-1+t.length)%t.length;s(t[i])};return e.jsxs("div",{className:"game-container fade-in",children:[e.jsx(u,{onBack:m,onHome:b,title:n.monthLearning,language:l}),e.jsx("p",{className:"game-subtitle",style:{fontSize:"1.2rem",marginBottom:"2rem",textAlign:"center"},children:n.subtitle}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(130px, 1fr))",gap:"1.2rem",width:"100%",maxWidth:"800px",margin:"0 auto",padding:"0 0.5rem"},children:t.map((r,i)=>{const a=[{base:"#FF4B4B",border:"#D03030",shadow:"rgba(208, 48, 48, 0.3)",icon:"🎈"},{base:"#FF9000",border:"#D07000",shadow:"rgba(208, 112, 0, 0.3)",icon:"☀️"},{base:"#FFD100",border:"#D0A000",shadow:"rgba(208, 160, 0, 0.3)",icon:"🪁"},{base:"#8CE836",border:"#60C010",shadow:"rgba(96, 192, 16, 0.3)",icon:"🌱"},{base:"#00D1A1",border:"#00A07A",shadow:"rgba(0, 160, 122, 0.3)",icon:"🦋"},{base:"#00B4D8",border:"#008BA5",shadow:"rgba(0, 139, 165, 0.3)",icon:"🐋"},{base:"#6332F6",border:"#4E24C0",shadow:"rgba(78, 36, 192, 0.3)",icon:"👾"},{base:"#D90368",border:"#A00040",shadow:"rgba(160, 0, 64, 0.3)",icon:"🌺"},{base:"#F15BB5",border:"#C04090",shadow:"rgba(192, 64, 144, 0.3)",icon:"🌸"},{base:"#4ECDC4",border:"#20A09A",shadow:"rgba(32, 160, 154, 0.3)",icon:"🐬"},{base:"#9D4EDD",border:"#7020B0",shadow:"rgba(112, 32, 176, 0.3)",icon:"🌟"},{base:"#FF5A5F",border:"#D03030",shadow:"rgba(208, 48, 48, 0.3)",icon:"🎉"}],d=a[i%a.length];return e.jsxs("button",{onClick:()=>x(r),className:"month-btn-interactive",style:{"--btn-base":d.base,"--btn-border":d.border,"--btn-shadow":d.shadow},children:[e.jsx("div",{style:{width:"50px",height:"50px",background:"rgba(255, 255, 255, 0.25)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.6rem",marginBottom:"0.3rem",boxShadow:"inset 0 -2px 0 rgba(0,0,0,0.1)"},children:d.icon}),e.jsx("span",{style:{fontSize:"1.6rem",fontWeight:"900",textShadow:"0 2px 0 rgba(0,0,0,0.15)",lineHeight:"1"},children:r.id}),e.jsx("span",{style:{fontSize:"1.1rem",fontWeight:"800",opacity:.95,marginTop:"0.2rem"},children:r.malay})]},r.id)})}),o&&e.jsx("div",{style:{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.6)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1e3,backdropFilter:"blur(5px)",padding:"1rem"},onClick:c,children:e.jsxs("div",{className:"card",style:{background:"white",padding:"clamp(1.5rem, 5vw, 2.5rem)",borderRadius:"30px",width:"100%",maxWidth:"450px",position:"relative",textAlign:"center",boxShadow:"0 20px 40px rgba(0,0,0,0.2)",animation:"modalFadeIn 0.3s ease-out"},onClick:r=>r.stopPropagation(),children:[e.jsx("button",{onClick:c,style:{position:"absolute",top:"1rem",right:"1rem",border:"none",background:"#f0f0f0",borderRadius:"50%",padding:"0.4rem",cursor:"pointer",color:"#666"},children:e.jsx(y,{size:20})}),e.jsxs("div",{style:{background:"#9D4EDD",color:"white",display:"inline-block",padding:"0.5rem 1.5rem",borderRadius:"50px",fontSize:"clamp(1rem, 4vw, 1.2rem)",fontWeight:"bold",marginBottom:"1.5rem",marginTop:"0.5rem"},children:[n.monthPrefix," ",o.id]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"min(2rem, 5vh)"},children:[e.jsxs("div",{children:[e.jsx("label",{style:{display:"block",color:"#888",fontSize:"0.8rem",marginBottom:"0.2rem",textTransform:"uppercase",letterSpacing:"1px"},children:n.labelEng}),e.jsx("div",{style:{fontSize:"clamp(1.8rem, 8vw, 2.5rem)",fontWeight:"bold",color:"#333"},children:o.name})]}),e.jsx("div",{style:{height:"2px",background:"#f0f0f0",width:"40%",margin:"0 auto"}}),e.jsxs("div",{children:[e.jsx("label",{style:{display:"block",color:"#888",fontSize:"0.8rem",marginBottom:"0.2rem",textTransform:"uppercase",letterSpacing:"1px"},children:n.labelMalay}),e.jsx("div",{style:{fontSize:"clamp(1.8rem, 8vw, 2.5rem)",fontWeight:"bold",color:"#9D4EDD"},children:o.malay})]}),e.jsx("div",{style:{height:"2px",background:"#f0f0f0",width:"40%",margin:"0 auto"}}),e.jsxs("div",{children:[e.jsx("label",{style:{display:"block",color:"#888",fontSize:"0.8rem",marginBottom:"0.2rem",textTransform:"uppercase",letterSpacing:"1px"},children:n.labelIslamic}),e.jsx("div",{style:{fontSize:"clamp(1.8rem, 8vw, 2.5rem)",fontWeight:"bold",color:"#4ECDC4"},children:o.islamic})]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"1rem",width:"100%",marginTop:"2rem"},children:[e.jsxs("button",{onClick:p,className:"btn-primary",style:{flex:"1",padding:"0.8rem 0.5rem",background:"#f0f0f0",color:"#333",border:"none",display:"flex",alignItems:"center",justifyContent:"center",gap:"0.3rem",fontSize:"0.9rem"},children:[e.jsx(v,{size:18})," ",n.prev]}),e.jsxs("button",{onClick:h,className:"btn-primary",style:{flex:"1",padding:"0.8rem 0.5rem",background:"#f0f0f0",color:"#333",border:"none",display:"flex",alignItems:"center",justifyContent:"center",gap:"0.3rem",fontSize:"0.9rem"},children:[l==="bm"?"Seterusnya":"Next"," ",e.jsx(w,{size:18})]})]})]})}),e.jsx("style",{children:`
                @keyframes modalFadeIn {
                    from { opacity: 0; transform: translateY(20px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                
                .month-btn-interactive {
                    position: relative;
                    background: var(--btn-base);
                    color: white;
                    border: none;
                    border-radius: 24px;
                    padding: 1.5rem 0.5rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.1s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 8px 0 var(--btn-border), 0 12px 16px var(--btn-shadow);
                    cursor: pointer;
                    font-family: inherit;
                    -webkit-tap-highlight-color: transparent;
                    margin-bottom: 8px;
                }
                
                .month-btn-interactive:active {
                    transform: translateY(8px);
                    box-shadow: 0 0px 0 var(--btn-border), 0 2px 4px var(--btn-shadow);
                }
                
                @media (hover: hover) {
                    .month-btn-interactive:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 10px 0 var(--btn-border), 0 16px 24px var(--btn-shadow);
                    }
                    .month-btn-interactive:active {
                        transform: translateY(8px);
                        box-shadow: 0 0px 0 var(--btn-border), 0 2px 4px var(--btn-shadow);
                    }
                }
            `})]})}export{C as default};
