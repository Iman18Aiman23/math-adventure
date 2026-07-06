import{g as x,r as j,j as e,e as u}from"./index-YCInXYg5.js";import{M as h}from"./MascotIcon-BBMT1tUp.js";import{H as b}from"./HeartShopModal-CA_XyApL.js";function F({playerName:i,gameState:l,language:o,streak:n=0}){const t=x(),c=t.stars,m=t.gems,d=t.hearts,[p,s]=j.useState(!1),f=[{label:o==="bm"?"Hari Aktif":"Streak",value:n,color:"#FF9600",emoji:"🔥"},{label:"Level",value:l?.level??1,color:"#CE82FF",emoji:"🏆"},{label:o==="bm"?"Nyawa":"Hearts",value:d,color:"#FF4B4B",emoji:"❤️"},{label:"Stars",value:c,color:"#FFC800",emoji:"⭐"},{label:o==="bm"?"Permata":"Gems",value:m,color:"#CE82FF",emoji:"💎"}];return e.jsxs("div",{className:"page-shell",children:[e.jsxs("div",{style:{background:"#fff",padding:"2rem 1.5rem",textAlign:"center",borderBottom:"2px solid #E5E5E5",position:"relative"},children:[e.jsx("div",{style:{display:"flex",justifyContent:"center",marginBottom:"0.5rem"},children:e.jsx(h,{size:80})}),e.jsx("h2",{style:{fontWeight:900,fontSize:"1.4rem",color:"#3C3C3C",marginBottom:"4px"},children:i||"Player"}),e.jsxs("p",{style:{color:"#AFAFAF",fontWeight:600,fontSize:"0.85rem"},children:["Level ",l?.level??1," Explorer"]})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.75rem",padding:"1.25rem 1rem",maxWidth:"700px",margin:"0 auto",paddingBottom:"calc(140px + var(--safe-bottom))"},children:f.map(r=>{const a=r.emoji==="❤️"||r.emoji==="⭐"||r.emoji==="💎";return e.jsxs("button",{className:"profile-stat-card",onMouseEnter:u,onClick:a?()=>s(!0):void 0,style:{background:"#fff",border:"2px solid #E5E5E5",borderRadius:"16px",padding:"1rem",textAlign:"center",cursor:a?"pointer":"default"},children:[e.jsx("div",{style:{fontSize:"1.8rem",marginBottom:"4px"},children:r.emoji}),e.jsx("div",{style:{fontSize:"1.4rem",fontWeight:900,color:r.color},children:r.value}),e.jsx("div",{style:{fontSize:"0.75rem",fontWeight:700,color:"#AFAFAF",textTransform:"uppercase",letterSpacing:"0.5px"},children:r.label})]},r.label)})}),e.jsx("style",{children:`
        .profile-stat-card {
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .profile-stat-card:hover {
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
          border-color: #999 !important;
        }
        .profile-stat-card:active {
          transform: translateY(-4px) scale(1.02);
        }
      `}),e.jsx(b,{isOpen:p,onClose:()=>s(!1),language:o})]})}export{F as default};
