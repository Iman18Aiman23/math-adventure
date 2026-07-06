import{r as l,j as e}from"./index-YCInXYg5.js";import{M as o}from"./MascotIcon-BBMT1tUp.js";const c=`
  .welcome-logo-text {
    font-size: 2.8rem;
    font-weight: 900;
    background: linear-gradient(135deg, #2D4059 0%, #4A6FA5 50%, #A3D8F4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: 1px;
    font-family: var(--font-heading);
    margin: 0;
  }
  .welcome-subtitle-text {
    color: #F4C430;
    font-family: var(--font-heading);
    font-size: 1.2rem;
    letter-spacing: 3px;
    margin: 0;
  }
`;function u({onSave:i}){const[a,r]=l.useState(""),n=l.useRef(null);l.useEffect(()=>{n.current?.focus()},[]);const m=t=>{t.preventDefault();const s=a.trim();s&&i(s)};return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:c}),e.jsxs("div",{className:"welcome-overlay",children:[e.jsx("div",{className:"welcome-emoji",children:e.jsx(o,{size:120})}),e.jsxs("div",{style:{textAlign:"center",marginTop:0,marginBottom:"1.5rem"},children:[e.jsx("h1",{className:"welcome-logo-text",children:"ImanCore"}),e.jsx("h2",{className:"welcome-subtitle-text",children:"Learning Hub"})]}),e.jsxs("div",{style:{textAlign:"center",maxWidth:"360px",width:"100%"},children:[e.jsx("h1",{className:"welcome-title",children:"Selamat Datang!"}),e.jsx("p",{className:"welcome-subtitle",style:{marginTop:"0.5rem",marginBottom:"2rem"},children:"Masukkan nama anda untuk memulakan pembelajaran! 🚀"})]}),e.jsxs("form",{onSubmit:m,style:{width:"100%",maxWidth:"360px",display:"flex",flexDirection:"column",gap:"0.75rem"},children:[e.jsx("input",{ref:n,type:"text",maxLength:24,value:a,onChange:t=>r(t.target.value),placeholder:"Nama anda...",className:"welcome-input",autoComplete:"off"}),e.jsx("button",{type:"submit",disabled:!a.trim(),className:"btn-primary welcome-btn",children:"Mula Belajar! ✨"})]}),e.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"1rem"},children:[0,1,2].map(t=>e.jsx("div",{style:{width:8,height:8,borderRadius:"50%",background:t===0?"#58CC02":"#E5E5E5"}},t))})]})]})}export{u as default};
