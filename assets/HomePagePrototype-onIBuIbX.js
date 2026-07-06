import{j as e,N as m,e as g}from"./index-YCInXYg5.js";function j({onSelectSubject:s,onSelectAgeGroup:a,language:t,playerName:n,gameState:c,streak:x=0}){const d=c?.level??1,p=[{id:"mon",label:{bm:"Isn",eng:"Mon"}},{id:"tue",label:{bm:"Sel",eng:"Tue"}},{id:"wed",label:{bm:"Rab",eng:"Wed"}},{id:"thu",label:{bm:"Kha",eng:"Thu"}},{id:"fri",label:{bm:"Jum",eng:"Fri"}},{id:"sat",label:{bm:"Sab",eng:"Sat"}},{id:"sun",label:{bm:"Aha",eng:"Sun"}}],l=new Date().getDay(),h=l===0?6:l-1,f=i=>i==="4-5"?e.jsxs("svg",{viewBox:"0 0 100 100",width:"60",height:"60",className:"age-icon-bounce",children:[e.jsx("circle",{cx:"50",cy:"50",r:"50",fill:"rgba(255,255,255,0.2)"}),e.jsx("path",{d:"M50 15 L60 40 L85 40 L65 55 L75 80 L50 65 L25 80 L35 55 L15 40 L40 40 Z",fill:"#FFFFFF"}),e.jsx("path",{d:"M50 25 L56 42 L74 42 L60 52 L66 68 L50 58 L34 68 L40 52 L26 42 L44 42 Z",fill:"#FFD93D"})]}):i==="6"?e.jsxs("svg",{viewBox:"0 0 100 100",width:"60",height:"60",className:"age-icon-bounce",children:[e.jsx("circle",{cx:"50",cy:"50",r:"50",fill:"rgba(255,255,255,0.2)"}),e.jsx("path",{d:"M50 15 L80 35 L80 65 L50 85 L20 65 L20 35 Z",fill:"#FFFFFF"}),e.jsx("path",{d:"M50 25 L70 40 L70 60 L50 75 L30 60 L30 40 Z",fill:"#4ECDC4"}),e.jsx("circle",{cx:"50",cy:"50",r:"8",fill:"#FFFFFF"})]}):e.jsxs("svg",{viewBox:"0 0 100 100",width:"60",height:"60",className:"age-icon-bounce",children:[e.jsx("circle",{cx:"50",cy:"50",r:"50",fill:"rgba(255,255,255,0.2)"}),e.jsx("path",{d:"M20 30 L80 30 L75 70 Q50 90 25 70 Z",fill:"#FFFFFF"}),e.jsx("path",{d:"M30 35 L70 35 L66 65 Q50 78 34 65 Z",fill:"#FFB347"}),e.jsx("rect",{x:"40",y:"15",width:"20",height:"15",fill:"#FFFFFF"}),e.jsx("circle",{cx:"50",cy:"45",r:"8",fill:"#FFFFFF"})]});return e.jsxs("div",{style:{display:"flex",flexDirection:"column",flex:1,overflow:"hidden",background:"#2A2420",color:"#F1F5F9",fontFamily:"Inter, sans-serif"},children:[e.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap');

        :root {
            --primary: #6366F1;
            --secondary: #F97316;
            --surface: #1E293B;
            --text-main: #F1F5F9;

            /* Soft Pink (Reading) */
            --coral: #EF4444;
            --coral-light: #FFF0F3;
            --coral-mid: #FF6B9E;

            /* Cyan Mint (Speaking) */
            --teal: #0D9488;
            --teal-light: #E5F9F6;
            --teal-mid: #2BBF9F;

            /* Warm Yellow (Jawi) */
            --gold: #D97706;
            --gold-light: #FEF3C7;
            --gold-mid: #FFAA00;

            /* Soft Green (Math) */
            --green: #10B981;
            --green-light: #ECFDF5;
            --green-mid: #5ABF77;
        }

        /* Horizontal Subject Cards - Dark Theme */
        .subject-card {
            background-color: var(--subject-bg);
            border-radius: 20px;
            padding: 1.2rem 1.5rem;
            cursor: pointer;
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: row;
            align-items: center;
            user-select: none;
            -webkit-tap-highlight-color: transparent;

            border: 1px solid rgba(148, 163, 184, 0.3);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3), inset 0 2px 6px rgba(255, 255, 255, 0.08);
            margin-bottom: 8px;
            text-align: left;
        }

        .subject-card:hover {
            transform: translateY(-4px);
            border-color: rgba(99, 102, 241, 0.5);
            box-shadow: 0 12px 28px rgba(99, 102, 241, 0.2), 0 0 20px rgba(99, 102, 241, 0.1), inset 0 2px 6px rgba(255, 255, 255, 0.1);
            filter: brightness(1.08);
        }

        .subject-card:active {
            transform: translateY(0);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .arrow-btn {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: var(--primary);
            color: #FFFFFF;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
            transition: all 0.2s ease;
        }
        .subject-card:hover .arrow-btn {
            transform: translateX(4px) scale(1.1);
            background: #F97316;
            box-shadow: 0 6px 16px rgba(249, 115, 22, 0.3);
        }

        /* SVG Animations */
        .card-deco { position: absolute; border-radius: 50%; opacity: 0.2; pointer-events: none; }
        .svg-wrap { width: 90px; height: 90px; flex-shrink: 0; margin-right: 1.5rem; }

        @keyframes bounceUp { 0%, 100% { transform: translateY(0); } 40% { transform: translateY(-10px); } 60% { transform: translateY(-10px); } }
        @keyframes floatLetter { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-5px) rotate(4deg); } }
        @keyframes pulseStar { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.2); opacity: 0.7; } }
        @keyframes waveArc { 0%, 100% { transform: scaleX(1); opacity: 0.7; } 50% { transform: scaleX(1.3); opacity: 1; } }
        @keyframes wiggle { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-6deg); } 75% { transform: rotate(6deg); } }
        @keyframes blinkEyes { 0%, 92%, 100% { transform: scaleY(1); } 96% { transform: scaleY(0.08); } }
        @keyframes inkDrip { 0%, 100% { transform: translateY(0) scale(1); opacity: 0.8; } 50% { transform: translateY(4px) scale(0.8); opacity: 0.5; } }
        @keyframes mathSpin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes numberPop { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.15); } }

        .subject-card:hover .svg-wrap { animation: bounceUp 0.8s ease-in-out infinite; }
        .subject-card:hover .fl1 { animation: floatLetter 1s ease-in-out infinite; }
        .subject-card:hover .fl2 { animation: floatLetter 1s ease-in-out infinite 0.4s; }
        .subject-card:hover .fl3 { animation: floatLetter 1s ease-in-out infinite 0.9s; }
        .subject-card:hover .fl4 { animation: floatLetter 1s ease-in-out infinite 0.2s; }
        .subject-card:hover .ps { animation: pulseStar 0.8s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        .subject-card:hover .ps2 { animation: pulseStar 0.8s ease-in-out infinite 0.6s; transform-box: fill-box; transform-origin: center; }
        .subject-card:hover .wa { animation: waveArc 0.5s ease-in-out infinite; transform-box: fill-box; transform-origin: left center; }
        .subject-card:hover .wa2 { animation: waveArc 0.5s ease-in-out infinite 0.25s; transform-box: fill-box; transform-origin: left center; }
        .subject-card:hover .wa3 { animation: waveArc 0.5s ease-in-out infinite 0.5s; transform-box: fill-box; transform-origin: left center; }
        .subject-card:hover .war { animation: waveArc 0.5s ease-in-out infinite; transform-box: fill-box; transform-origin: right center; }
        .subject-card:hover .war2 { animation: waveArc 0.5s ease-in-out infinite 0.25s; transform-box: fill-box; transform-origin: right center; }
        .subject-card:hover .war3 { animation: waveArc 0.5s ease-in-out infinite 0.5s; transform-box: fill-box; transform-origin: right center; }
        .subject-card:hover .wg { animation: wiggle 1s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
        .subject-card:hover .eyes { animation: blinkEyes 2s ease-in-out infinite; transform-origin: center; }
        .subject-card:hover .ink { animation: inkDrip 1.5s ease-in-out infinite; transform-box: fill-box; transform-origin: center top; }
        .subject-card:hover .msp { animation: mathSpin 3s linear infinite; transform-box: fill-box; transform-origin: center; }
        .subject-card:hover .np { animation: numberPop 0.7s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        .subject-card:hover .np2 { animation: numberPop 0.7s ease-in-out infinite 0.5s; transform-box: fill-box; transform-origin: center; }
        .subject-card:hover .np3 { animation: numberPop 0.7s ease-in-out infinite 1s; transform-box: fill-box; transform-origin: center; }

        @keyframes jello { 0% { transform: scale(1); } 20% { transform: scale(0.94, 1.06); } 40% { transform: scale(1.04, 0.96); } 60% { transform: scale(0.98, 1.02); } 80% { transform: scale(1.01, 0.99); } 100% { transform: scale(1); } }
        
        /* Age Group Buttons - Dark Theme */
        .age-group-card {
            border-radius: 20px;
            transition: all 0.25s ease;
            border: 1px solid rgba(148, 163, 184, 0.3);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.08);
            margin-bottom: 8px;
        }
        .age-group-card:hover {
            transform: translateY(-4px);
            border-color: rgba(99, 102, 241, 0.5);
            box-shadow: 0 12px 28px rgba(99, 102, 241, 0.2), 0 0 20px rgba(99, 102, 241, 0.1), inset 0 2px 4px rgba(255, 255, 255, 0.1);
            filter: brightness(1.1);
        }
        .age-group-card:active {
            transform: translateY(0) !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
        }
        .age-group-card:hover .age-icon-bounce {
            animation: jello 0.6s ease;
        }

        .section-header {
            font-size: 1.15rem;
            font-weight: 900;
            color: var(--text-main);
            letter-spacing: -0.01em;
            margin-bottom: 1.2rem;
            text-transform: uppercase;
        }

        .course-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.25rem;
            padding-bottom: 3rem;
        }

        .streak-circle {
            width: 28px;
            height: 28px;
            font-size: 0.85rem;
            flex-shrink: 0;
        }

        @media (max-width: 768px) {
            .main-content-area {
                padding: 1.5rem 1rem !important;
            }
            .hero-section {
                padding: 1.5rem 1rem 1.5rem 1rem !important;
                margin-bottom: 2rem !important;
            }
            .hero-header {
                flex-direction: row !important;
                align-items: flex-start !important;
                justify-content: space-between !important;
            }
            .planet-svg-container {
                width: 140px !important;
                height: 140px !important;
                right: 8% !important;
                top: 5% !important;
                opacity: 0.4 !important;
            }
            .streak-bar-container {
                flex-wrap: nowrap !important;
                justify-content: space-between !important;
                gap: 2px !important;
                padding: 0.5rem 0.25rem !important;
                overflow-x: hidden !important;
            }
            .streak-day-item {
                flex-direction: column !important;
                gap: 2px !important;
                justify-content: center !important;
                flex: 1 !important;
            }
            .streak-day-item span {
                font-size: 0.6rem !important;
                text-align: center;
            }
            .streak-circle {
                width: 22px !important;
                height: 22px !important;
                font-size: 0.7rem !important;
                margin: 0 auto;
            }
            .course-grid {
                grid-template-columns: 1fr !important;
                gap: 1rem !important;
            }
            .subject-card {
                padding: 1rem !important;
            }
            .svg-wrap {
                width: 70px !important;
                height: 70px !important;
                margin-right: 0.5rem !important;
            }
            .hero-title {
                font-size: 1.8rem !important;
            }
        }
      `}),e.jsxs("div",{className:"main-content-area",style:{flex:1,overflowY:"auto",padding:"1.5rem 2.5rem"},children:[e.jsxs("div",{className:"hero-section",style:{background:"linear-gradient(130deg, #1E293B 0%, #0F766E 30%, #1E293B 60%, #334155 100%)",borderRadius:"24px",padding:"2.5rem 2rem 1.5rem 2rem",marginBottom:"3rem",boxShadow:"0 20px 40px rgba(99, 102, 241, 0.15), inset 0 2px 6px rgba(255, 255, 255, 0.05)",border:"1px solid rgba(148, 163, 184, 0.2)",color:"#FFFFFF",position:"relative",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",top:"10%",left:"15%",color:"#FFF",fontSize:"1.5rem",opacity:.8,filter:"blur(1px)"},children:"*"}),e.jsx("div",{style:{position:"absolute",top:"20%",left:"35%",color:"#FFF",fontSize:"1.5rem",opacity:.8,filter:"blur(1px)"},children:"*"}),e.jsx("div",{style:{position:"absolute",top:"29%",left:"60%",color:"#FFF",fontSize:"1.5rem",opacity:.9,filter:"blur(1px)"},children:"*"}),e.jsx("div",{style:{position:"absolute",top:"45%",left:"50%",color:"#FFF",fontSize:"1.5rem",opacity:.8,filter:"blur(1px)"},children:"*"}),e.jsx("div",{style:{position:"absolute",top:"69%",left:"78%",color:"#FFF",fontSize:"1.5rem",opacity:.8,filter:"blur(1px)"},children:"*"}),e.jsx("div",{style:{position:"absolute",top:"87%",left:"60%",color:"#FFF",fontSize:"1.5rem",opacity:.9,filter:"blur(1px)"},children:"*"}),e.jsx("div",{className:"planet-svg-container",style:{position:"absolute",top:"-10%",right:"12%",width:"220px",height:"220px",pointerEvents:"none"},children:e.jsxs("svg",{viewBox:"0 0 200 200",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{filter:"drop-shadow(0 15px 25px rgba(0,0,0,0.2))"},children:[e.jsx("circle",{cx:"100",cy:"100",r:"55",fill:"url(#planetGlow)",opacity:"0.6"}),e.jsx("path",{d:"M30,120 C40,90 160,70 170,100",fill:"none",stroke:"url(#ringBackGrad)",strokeWidth:"12",strokeLinecap:"round"}),e.jsx("circle",{cx:"100",cy:"100",r:"45",fill:"url(#planetSphereGrad)"}),e.jsx("circle",{cx:"90",cy:"90",r:"40",fill:"url(#planetHighlight)",opacity:"0.6"}),e.jsx("path",{d:"M55,100 A45,45 0 0,0 145,100 A45,30 0 0,1 55,100 Z",fill:"#3B0764",opacity:"0.4"}),e.jsx("path",{d:"M25,115 C35,145 165,125 175,95",fill:"none",stroke:"url(#ringFrontGrad)",strokeWidth:"14",strokeLinecap:"round"}),e.jsx("path",{d:"M40,123 C60,135 120,125 155,105",fill:"none",stroke:"#FFFFFF",strokeWidth:"2",opacity:"0.5",strokeLinecap:"round"}),e.jsx("path",{d:"M30,60 L33,68 L41,71 L33,74 L30,82 L27,74 L19,71 L27,68 Z",fill:"#E9D5FF",opacity:"0.8"}),e.jsx("path",{d:"M160,40 L162,45 L167,47 L162,49 L160,54 L158,49 L153,47 L158,45 Z",fill:"#E9D5FF",opacity:"0.6"}),e.jsx("circle",{cx:"150",cy:"140",r:"2",fill:"#E9D5FF",opacity:"0.5"}),e.jsx("circle",{cx:"45",cy:"145",r:"1.5",fill:"#E9D5FF",opacity:"0.4"}),e.jsxs("defs",{children:[e.jsxs("radialGradient",{id:"planetGlow",cx:"50%",cy:"50%",r:"50%",children:[e.jsx("stop",{offset:"0%",stopColor:"#A855F7"}),e.jsx("stop",{offset:"100%",stopColor:"#A855F7",stopOpacity:"0"})]}),e.jsxs("linearGradient",{id:"planetSphereGrad",x1:"30",y1:"30",x2:"170",y2:"170",gradientUnits:"userSpaceOnUse",children:[e.jsx("stop",{offset:"0%",stopColor:"#D8B4FE"}),e.jsx("stop",{offset:"30%",stopColor:"#A855F7"}),e.jsx("stop",{offset:"80%",stopColor:"#6B21A8"}),e.jsx("stop",{offset:"100%",stopColor:"#3B0764"})]}),e.jsxs("radialGradient",{id:"planetHighlight",cx:"30%",cy:"30%",r:"60%",children:[e.jsx("stop",{offset:"0%",stopColor:"#FFFFFF",stopOpacity:"0.4"}),e.jsx("stop",{offset:"100%",stopColor:"#FFFFFF",stopOpacity:"0"})]}),e.jsxs("linearGradient",{id:"ringBackGrad",x1:"30",y1:"120",x2:"170",y2:"100",gradientUnits:"userSpaceOnUse",children:[e.jsx("stop",{offset:"0%",stopColor:"#581C87"}),e.jsx("stop",{offset:"50%",stopColor:"#7E22CE",stopOpacity:"0.5"}),e.jsx("stop",{offset:"100%",stopColor:"#581C87"})]}),e.jsxs("linearGradient",{id:"ringFrontGrad",x1:"25",y1:"115",x2:"175",y2:"95",gradientUnits:"userSpaceOnUse",children:[e.jsx("stop",{offset:"0%",stopColor:"#D8B4FE"}),e.jsx("stop",{offset:"20%",stopColor:"#A855F7"}),e.jsx("stop",{offset:"50%",stopColor:"#7E22CE"}),e.jsx("stop",{offset:"80%",stopColor:"#A855F7"}),e.jsx("stop",{offset:"100%",stopColor:"#D8B4FE",stopOpacity:"0.8"})]})]})]})}),e.jsxs("div",{className:"hero-header",style:{position:"relative",zIndex:1,display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"2.5rem"},children:[e.jsxs("div",{children:[e.jsx("p",{style:{fontSize:"0.8rem",fontWeight:700,color:"rgba(255,255,255,0.85)",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:"0.2rem"},children:t==="bm"?"SELAMAT DATANG":"WELCOME"}),e.jsx("h1",{className:"hero-title",style:{fontSize:"2.25rem",fontWeight:900,lineHeight:1.2,margin:"0 0 0.75rem 0",letterSpacing:"-0.02em",textShadow:"0 2px 10px rgba(0,0,0,0.1)"},children:n?`Hei, ${n}! 🚀`:t==="bm"?"Hei, Iman! 🚀":"Hey, Iman! 🚀"}),e.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:"0.4rem",background:"rgba(255,255,255,0.15)",color:"#FFF",padding:"6px 16px",borderRadius:"16px",fontWeight:800,fontSize:"0.9rem",border:"1px solid rgba(255,255,255,0.2)"},children:["⭐ LEVEL ",d]})]}),e.jsxs("div",{style:{background:"#FFFFFF",borderRadius:"20px",padding:"8px 16px",display:"flex",alignItems:"center",gap:"8px",boxShadow:"0 8px 16px rgba(0,0,0,0.15)"},children:[e.jsx("span",{style:{fontSize:"1.2rem"},children:"🔥"}),e.jsx("span",{style:{color:"#111827",fontWeight:900,fontSize:"1rem"},children:x||1})]})]}),e.jsx("div",{className:"streak-bar-container",style:{background:"rgba(255,255,255,0.15)",borderRadius:"24px",padding:"0.8rem 1.5rem",display:"flex",justifyContent:"space-between",alignItems:"center",border:"1px solid rgba(255,255,255,0.2)",backdropFilter:"blur(12px)",position:"relative",zIndex:1},children:p.map((i,o)=>{const r=o===h;return e.jsxs("div",{className:"streak-day-item",style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx("div",{className:"streak-circle",style:{borderRadius:"50%",background:r?"#FFFFFF":"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:r?"0 4px 12px rgba(0,0,0,0.1)":"none"},children:r?"🔥":""}),e.jsx("span",{style:{fontSize:"0.85rem",fontWeight:r?800:600,color:r?"#FFFFFF":"rgba(255,255,255,0.7)"},children:i.label[t]||i.label.bm})]},i.id)})})]}),e.jsx("h2",{className:"section-header",children:t==="bm"?"SUBJEK":"SUBJECT"}),e.jsxs("div",{className:"course-grid",children:[e.jsxs("div",{className:"subject-card",style:{"--subject-bg":"#1E293B",color:"#FFFFFF"},onClick:()=>s("reading"),role:"button",tabIndex:"0","aria-label":"Belajar Membaca",children:[e.jsx("div",{className:"card-deco",style:{width:"150px",height:"150px",background:"radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(239,68,68,0) 70%)",top:"-40px",right:"-40px"}}),e.jsx("div",{className:"card-deco",style:{width:"100px",height:"100px",background:"radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(239,68,68,0) 70%)",bottom:"-20px",left:"-20px"}}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"1.5rem",flex:1},children:[e.jsx("div",{className:"svg-wrap",children:e.jsxs("svg",{viewBox:"0 0 200 200",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",children:[e.jsx("ellipse",{cx:"100",cy:"180",rx:"52",ry:"7",fill:"rgba(0,0,0,0.07)"}),e.jsx("path",{d:"M95,46 L20,36 C16,35 14,38 14,42 L14,150 C14,154 16,156 20,155 L95,160 Z",fill:"var(--coral)"}),e.jsx("path",{d:"M92,52 L26,43 L26,146 L92,153 Z",fill:"#FFFAF5"}),e.jsx("line",{x1:"38",y1:"72",x2:"80",y2:"75",stroke:"#FFD4D4",strokeWidth:"2.5",strokeLinecap:"round"}),e.jsx("line",{x1:"38",y1:"85",x2:"80",y2:"88",stroke:"#FFD4D4",strokeWidth:"2.5",strokeLinecap:"round"}),e.jsx("line",{x1:"38",y1:"98",x2:"66",y2:"100",stroke:"#FFD4D4",strokeWidth:"2.5",strokeLinecap:"round"}),e.jsx("path",{d:"M105,46 L180,36 C184,35 186,38 186,42 L186,150 C186,154 184,156 180,155 L105,160 Z",fill:"var(--coral-mid)"}),e.jsx("path",{d:"M108,52 L174,43 L174,146 L108,153 Z",fill:"#FFFAF5"}),e.jsx("line",{x1:"120",y1:"75",x2:"162",y2:"72",stroke:"#FFD4D4",strokeWidth:"2.5",strokeLinecap:"round"}),e.jsx("line",{x1:"120",y1:"88",x2:"162",y2:"85",stroke:"#FFD4D4",strokeWidth:"2.5",strokeLinecap:"round"}),e.jsx("line",{x1:"120",y1:"98",x2:"150",y2:"100",stroke:"#FFD4D4",strokeWidth:"2.5",strokeLinecap:"round"}),e.jsx("rect",{x:"92",y:"43",width:"16",height:"118",rx:"3",fill:"#E05555"}),e.jsxs("g",{className:"eyes",children:[e.jsx("circle",{cx:"72",cy:"114",r:"6.5",fill:"#333"}),e.jsx("circle",{cx:"128",cy:"114",r:"6.5",fill:"#333"}),e.jsx("circle",{cx:"74",cy:"112",r:"2.8",fill:"#FFF"}),e.jsx("circle",{cx:"130",cy:"112",r:"2.8",fill:"#FFF"})]}),e.jsx("circle",{cx:"57",cy:"128",r:"8",fill:"#FF9999",opacity:"0.45"}),e.jsx("circle",{cx:"143",cy:"128",r:"8",fill:"#FF9999",opacity:"0.45"}),e.jsx("path",{d:"M84,130 Q100,148 116,130",fill:"none",stroke:"#333",strokeWidth:"2.5",strokeLinecap:"round"}),e.jsx("g",{className:"fl1",children:e.jsx("text",{x:"30",y:"28",fontSize:"22",fill:"var(--coral)",fontWeight:"900",fontFamily:"Inter, sans-serif",children:"A"})}),e.jsx("g",{className:"fl2",children:e.jsx("text",{x:"150",y:"22",fontSize:"18",fill:"var(--coral-mid)",fontWeight:"900",fontFamily:"Inter, sans-serif",children:"B"})}),e.jsx("g",{className:"ps",children:e.jsx("polygon",{points:"22,14 24,21 31,21 26,25 28,32 22,27 16,32 18,25 13,21 20,21",fill:"#FFD93D"})})]})}),e.jsxs("div",{style:{flex:1,paddingRight:"1rem"},children:[e.jsx("div",{style:{fontWeight:900,fontSize:"1.25rem",letterSpacing:"-0.02em",color:"var(--coral)",marginBottom:"6px"},children:t==="bm"?"Membaca":"Reading"}),e.jsx("div",{style:{fontSize:"0.85rem",color:"#4B5563",fontWeight:500,lineHeight:1.4},children:t==="bm"?"Kuasai kemahiran membaca dengan seronok!":"Master reading skills with fun!"})]})]}),e.jsx("div",{className:"arrow-btn",children:e.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"var(--coral)",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("path",{d:"M9 18l6-6-6-6"})})})]}),e.jsxs("div",{className:"subject-card",style:{"--subject-bg":"#0F766E",color:"#FFFFFF"},onClick:()=>s("bm"),role:"button",tabIndex:"0","aria-label":"Belajar Sebutan",children:[e.jsx("div",{className:"card-deco",style:{width:"150px",height:"150px",background:"radial-gradient(circle, rgba(13,148,136,0.15) 0%, rgba(13,148,136,0) 70%)",top:"-40px",right:"-40px"}}),e.jsx("div",{className:"card-deco",style:{width:"100px",height:"100px",background:"radial-gradient(circle, rgba(13,148,136,0.15) 0%, rgba(13,148,136,0) 70%)",bottom:"-20px",left:"-20px"}}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"1.5rem",flex:1},children:[e.jsx("div",{className:"svg-wrap",children:e.jsxs("svg",{viewBox:"0 0 200 200",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",children:[e.jsx("ellipse",{cx:"100",cy:"182",rx:"35",ry:"6",fill:"rgba(0,0,0,0.07)"}),e.jsx("rect",{x:"95",y:"142",width:"10",height:"32",rx:"5",fill:"var(--teal-mid)"}),e.jsx("ellipse",{cx:"100",cy:"178",rx:"22",ry:"5",fill:"var(--teal-mid)"}),e.jsx("rect",{x:"76",y:"52",width:"48",height:"96",rx:"24",fill:"var(--teal)"}),e.jsx("line",{x1:"88",y1:"68",x2:"112",y2:"68",stroke:"var(--teal-mid)",strokeWidth:"1.5",opacity:"0.45"}),e.jsx("line",{x1:"86",y1:"77",x2:"114",y2:"77",stroke:"var(--teal-mid)",strokeWidth:"1.5",opacity:"0.45"}),e.jsx("line",{x1:"86",y1:"86",x2:"114",y2:"86",stroke:"var(--teal-mid)",strokeWidth:"1.5",opacity:"0.45"}),e.jsx("line",{x1:"88",y1:"95",x2:"112",y2:"95",stroke:"var(--teal-mid)",strokeWidth:"1.5",opacity:"0.45"}),e.jsx("line",{x1:"90",y1:"104",x2:"110",y2:"104",stroke:"var(--teal-mid)",strokeWidth:"1.5",opacity:"0.45"}),e.jsx("rect",{x:"80",y:"56",width:"8",height:"38",rx:"4",fill:"#7EDDD7",opacity:"0.5"}),e.jsxs("g",{className:"eyes",children:[e.jsx("circle",{cx:"90",cy:"118",r:"5.5",fill:"#333"}),e.jsx("circle",{cx:"110",cy:"118",r:"5.5",fill:"#333"}),e.jsx("circle",{cx:"91.5",cy:"116.5",r:"2.2",fill:"#FFF"}),e.jsx("circle",{cx:"111.5",cy:"116.5",r:"2.2",fill:"#FFF"})]}),e.jsx("circle",{cx:"81",cy:"130",r:"6",fill:"var(--teal-mid)",opacity:"0.35"}),e.jsx("circle",{cx:"119",cy:"130",r:"6",fill:"var(--teal-mid)",opacity:"0.35"}),e.jsx("path",{d:"M93,131 Q100,141 107,131",fill:"none",stroke:"#333",strokeWidth:"2",strokeLinecap:"round"}),e.jsx("g",{className:"wa",children:e.jsx("path",{d:"M70,78 Q58,100 70,122",fill:"none",stroke:"var(--teal)",strokeWidth:"3.5",strokeLinecap:"round",opacity:"0.7"})}),e.jsx("g",{className:"wa2",children:e.jsx("path",{d:"M58,68 Q40,100 58,132",fill:"none",stroke:"var(--teal)",strokeWidth:"3",strokeLinecap:"round",opacity:"0.45"})}),e.jsx("g",{className:"wa3",children:e.jsx("path",{d:"M46,58 Q22,100 46,142",fill:"none",stroke:"var(--teal)",strokeWidth:"2.5",strokeLinecap:"round",opacity:"0.25"})}),e.jsx("g",{className:"war",children:e.jsx("path",{d:"M130,78 Q142,100 130,122",fill:"none",stroke:"var(--teal)",strokeWidth:"3.5",strokeLinecap:"round",opacity:"0.7"})}),e.jsx("g",{className:"war2",children:e.jsx("path",{d:"M142,68 Q160,100 142,132",fill:"none",stroke:"var(--teal)",strokeWidth:"3",strokeLinecap:"round",opacity:"0.45"})}),e.jsx("g",{className:"war3",children:e.jsx("path",{d:"M154,58 Q178,100 154,142",fill:"none",stroke:"var(--teal)",strokeWidth:"2.5",strokeLinecap:"round",opacity:"0.25"})}),e.jsx("g",{className:"fl2",children:e.jsx("text",{x:"18",y:"40",fontSize:"22",fill:"var(--teal)",fontFamily:"Inter, serif",children:"♪"})}),e.jsx("g",{className:"fl3",children:e.jsx("text",{x:"165",y:"42",fontSize:"18",fill:"#7EDDD7",fontFamily:"Inter, serif",children:"♫"})})]})}),e.jsxs("div",{style:{flex:1,paddingRight:"1rem"},children:[e.jsx("div",{style:{fontWeight:900,fontSize:"1.25rem",letterSpacing:"-0.02em",color:"var(--teal)",marginBottom:"6px"},children:t==="bm"?"Sebutan":"Speaking"}),e.jsx("div",{style:{fontSize:"0.85rem",color:"#4B5563",fontWeight:500,lineHeight:1.4},children:t==="bm"?"Perbaiki sebutan dengan yakin!":"Improve pronunciation with confidence!"})]})]}),e.jsx("div",{className:"arrow-btn",children:e.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"var(--teal)",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("path",{d:"M9 18l6-6-6-6"})})})]}),e.jsxs("div",{className:"subject-card",style:{"--subject-bg":"#1E293B",color:"#FFFFFF"},onClick:()=>s("jawi"),role:"button",tabIndex:"0","aria-label":"Jawi",children:[e.jsx("div",{className:"card-deco",style:{width:"150px",height:"150px",background:"radial-gradient(circle, rgba(217,119,6,0.15) 0%, rgba(217,119,6,0) 70%)",top:"-40px",right:"-40px"}}),e.jsx("div",{className:"card-deco",style:{width:"100px",height:"100px",background:"radial-gradient(circle, rgba(217,119,6,0.15) 0%, rgba(217,119,6,0) 70%)",bottom:"-20px",left:"-20px"}}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"1.5rem",flex:1},children:[e.jsx("div",{className:"svg-wrap",children:e.jsxs("svg",{viewBox:"0 0 200 200",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",children:[e.jsx("ellipse",{cx:"100",cy:"182",rx:"45",ry:"6",fill:"rgba(0,0,0,0.07)"}),e.jsx("rect",{x:"118",y:"55",width:"62",height:"80",rx:"6",fill:"#FFF9F0",stroke:"#E8D5B7",strokeWidth:"1.5"}),e.jsx("ellipse",{cx:"149",cy:"55",rx:"33",ry:"6",fill:"#F5E6D0",stroke:"#E8D5B7",strokeWidth:"1"}),e.jsx("ellipse",{cx:"149",cy:"135",rx:"33",ry:"6",fill:"#F5E6D0",stroke:"#E8D5B7",strokeWidth:"1"}),e.jsx("line",{x1:"128",y1:"75",x2:"170",y2:"75",stroke:"#EDE0CF",strokeWidth:"1.2"}),e.jsx("line",{x1:"128",y1:"88",x2:"170",y2:"88",stroke:"#EDE0CF",strokeWidth:"1.2"}),e.jsx("line",{x1:"128",y1:"101",x2:"170",y2:"101",stroke:"#EDE0CF",strokeWidth:"1.2"}),e.jsx("line",{x1:"128",y1:"114",x2:"170",y2:"114",stroke:"#EDE0CF",strokeWidth:"1.2"}),e.jsx("text",{x:"149",y:"97",fontSize:"26",fill:"var(--gold-mid)",textAnchor:"middle",fontFamily:"Inter, serif",className:"wg",children:"ب"}),e.jsx("rect",{x:"83",y:"16",width:"28",height:"16",rx:"8",fill:"#FF8FA3"}),e.jsx("rect",{x:"80",y:"30",width:"34",height:"10",rx:"2",fill:"#D4A373"}),e.jsx("rect",{x:"82",y:"40",width:"30",height:"105",rx:"2",fill:"var(--gold)"}),e.jsx("rect",{x:"82",y:"40",width:"30",height:"18",fill:"#E89F2C"}),e.jsx("rect",{x:"86",y:"44",width:"6",height:"50",rx:"3",fill:"#FFD080",opacity:"0.5"}),e.jsx("polygon",{points:"82,145 112,145 97,172",fill:"#FFD4A3"}),e.jsx("polygon",{points:"92,163 102,163 97,174",fill:"#444"}),e.jsxs("g",{className:"eyes",children:[e.jsx("circle",{cx:"91",cy:"88",r:"5",fill:"#333"}),e.jsx("circle",{cx:"105",cy:"88",r:"5",fill:"#333"}),e.jsx("circle",{cx:"92.2",cy:"86.5",r:"2",fill:"#FFF"}),e.jsx("circle",{cx:"106.2",cy:"86.5",r:"2",fill:"#FFF"})]}),e.jsx("circle",{cx:"84",cy:"100",r:"5.5",fill:"#E89F2C",opacity:"0.35"}),e.jsx("circle",{cx:"112",cy:"100",r:"5.5",fill:"#E89F2C",opacity:"0.35"}),e.jsx("path",{d:"M93,101 Q97,110 103,101",fill:"none",stroke:"#333",strokeWidth:"2",strokeLinecap:"round"}),e.jsx("g",{className:"ink fl1",children:e.jsx("circle",{cx:"130",cy:"45",r:"3",fill:"var(--gold)",opacity:"0.6"})}),e.jsx("g",{className:"ink fl3",children:e.jsx("circle",{cx:"165",cy:"38",r:"2.5",fill:"var(--gold-mid)",opacity:"0.5"})}),e.jsx("g",{className:"ps",children:e.jsx("polygon",{points:"55,28 56.5,33 61,33 57.5,36 58.5,41 55,38 51.5,41 52.5,36 49,33 53.5,33",fill:"#FF6B6B"})})]})}),e.jsxs("div",{style:{flex:1,paddingRight:"1rem"},children:[e.jsx("div",{style:{fontWeight:900,fontSize:"1.25rem",letterSpacing:"-0.02em",color:"var(--gold)",marginBottom:"6px"},children:"Jawi"}),e.jsx("div",{style:{fontSize:"0.85rem",color:"#4B5563",fontWeight:500,lineHeight:1.4},children:t==="bm"?"Belajar Jawi dengan mudah!":"Learn Jawi easily!"})]})]}),e.jsx("div",{className:"arrow-btn",children:e.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"var(--gold)",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("path",{d:"M9 18l6-6-6-6"})})})]}),e.jsxs("div",{className:"subject-card",style:{"--subject-bg":"#334155",color:"#FFFFFF"},onClick:()=>s("math"),role:"button",tabIndex:"0","aria-label":"Matematik",children:[e.jsx("div",{className:"card-deco",style:{width:"150px",height:"150px",background:"radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0) 70%)",top:"-40px",right:"-40px"}}),e.jsx("div",{className:"card-deco",style:{width:"100px",height:"100px",background:"radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0) 70%)",bottom:"-20px",left:"-20px"}}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"1.5rem",flex:1},children:[e.jsx("div",{className:"svg-wrap",children:e.jsxs("svg",{viewBox:"0 0 200 200",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",children:[e.jsx("ellipse",{cx:"100",cy:"182",rx:"40",ry:"6",fill:"rgba(0,0,0,0.07)"}),e.jsx("rect",{x:"55",y:"22",width:"90",height:"150",rx:"16",fill:"var(--green)"}),e.jsx("rect",{x:"66",y:"34",width:"68",height:"36",rx:"7",fill:"#2D6A4F"}),e.jsxs("g",{className:"eyes",children:[e.jsx("circle",{cx:"84",cy:"48",r:"4",fill:"#95E1C3"}),e.jsx("circle",{cx:"108",cy:"48",r:"4",fill:"#95E1C3"}),e.jsx("circle",{cx:"85",cy:"46.5",r:"1.6",fill:"#2D6A4F"}),e.jsx("circle",{cx:"109",cy:"46.5",r:"1.6",fill:"#2D6A4F"})]}),e.jsx("path",{d:"M86,57 Q96,66 106,57",fill:"none",stroke:"#95E1C3",strokeWidth:"1.8",strokeLinecap:"round"}),e.jsx("rect",{x:"70",y:"80",width:"15",height:"14",rx:"4",fill:"#A8E6CF"}),e.jsx("rect",{x:"90",y:"80",width:"15",height:"14",rx:"4",fill:"#A8E6CF"}),e.jsx("rect",{x:"110",y:"80",width:"15",height:"14",rx:"4",fill:"#FF8E72"}),e.jsx("text",{x:"77.5",y:"91",fontSize:"9",fill:"#2D6A4F",textAnchor:"middle",fontFamily:"JetBrains Mono, monospace",fontWeight:"700",children:"7"}),e.jsx("text",{x:"97.5",y:"91",fontSize:"9",fill:"#2D6A4F",textAnchor:"middle",fontFamily:"JetBrains Mono, monospace",fontWeight:"700",children:"8"}),e.jsx("text",{x:"117.5",y:"91",fontSize:"11",fill:"#FFF",textAnchor:"middle",fontFamily:"JetBrains Mono, monospace",fontWeight:"700",children:"+"}),e.jsx("rect",{x:"70",y:"100",width:"15",height:"14",rx:"4",fill:"#A8E6CF"}),e.jsx("rect",{x:"90",y:"100",width:"15",height:"14",rx:"4",fill:"#A8E6CF"}),e.jsx("rect",{x:"110",y:"100",width:"15",height:"14",rx:"4",fill:"#FF8E72"}),e.jsx("text",{x:"77.5",y:"111",fontSize:"9",fill:"#2D6A4F",textAnchor:"middle",fontFamily:"JetBrains Mono, monospace",fontWeight:"700",children:"4"}),e.jsx("text",{x:"97.5",y:"111",fontSize:"9",fill:"#2D6A4F",textAnchor:"middle",fontFamily:"JetBrains Mono, monospace",fontWeight:"700",children:"5"}),e.jsx("text",{x:"117.5",y:"111",fontSize:"11",fill:"#FFF",textAnchor:"middle",fontFamily:"JetBrains Mono, monospace",fontWeight:"700",children:"−"}),e.jsx("rect",{x:"70",y:"120",width:"15",height:"14",rx:"4",fill:"#A8E6CF"}),e.jsx("rect",{x:"90",y:"120",width:"15",height:"14",rx:"4",fill:"#A8E6CF"}),e.jsx("rect",{x:"110",y:"120",width:"15",height:"14",rx:"4",fill:"#FF8E72"}),e.jsx("text",{x:"77.5",y:"131",fontSize:"9",fill:"#2D6A4F",textAnchor:"middle",fontFamily:"JetBrains Mono, monospace",fontWeight:"700",children:"1"}),e.jsx("text",{x:"97.5",y:"131",fontSize:"9",fill:"#2D6A4F",textAnchor:"middle",fontFamily:"JetBrains Mono, monospace",fontWeight:"700",children:"2"}),e.jsx("text",{x:"117.5",y:"131",fontSize:"10",fill:"#FFF",textAnchor:"middle",fontFamily:"JetBrains Mono, monospace",fontWeight:"700",children:"×"}),e.jsx("rect",{x:"70",y:"140",width:"35",height:"14",rx:"4",fill:"#A8E6CF"}),e.jsx("rect",{x:"110",y:"140",width:"15",height:"14",rx:"4",fill:"var(--gold)"}),e.jsx("text",{x:"87.5",y:"151",fontSize:"9",fill:"#2D6A4F",textAnchor:"middle",fontFamily:"JetBrains Mono, monospace",fontWeight:"700",children:"0"}),e.jsx("text",{x:"117.5",y:"151.5",fontSize:"10",fill:"#2D6A4F",textAnchor:"middle",fontFamily:"JetBrains Mono, monospace",fontWeight:"700",children:"="}),e.jsx("rect",{x:"60",y:"26",width:"10",height:"40",rx:"5",fill:"#95E1C3",opacity:"0.25"}),e.jsx("g",{className:"np fl1",children:e.jsx("text",{x:"25",y:"50",fontSize:"20",fill:"var(--green)",fontWeight:"900",fontFamily:"JetBrains Mono, monospace",children:"3"})}),e.jsx("g",{className:"np2 fl2",children:e.jsx("text",{x:"168",y:"45",fontSize:"18",fill:"var(--green-mid)",fontWeight:"900",fontFamily:"JetBrains Mono, monospace",children:"9"})}),e.jsx("g",{className:"np3 fl4",children:e.jsx("text",{x:"30",y:"165",fontSize:"16",fill:"#A8E6CF",fontWeight:"900",fontFamily:"JetBrains Mono, monospace",children:"6"})}),e.jsx("g",{className:"msp fl3",children:e.jsx("polygon",{points:"170,155 180,175 160,175",fill:"none",stroke:"var(--green)",strokeWidth:"2.5",strokeLinejoin:"round"})})]})}),e.jsxs("div",{style:{flex:1,paddingRight:"1rem"},children:[e.jsx("div",{style:{fontWeight:900,fontSize:"1.25rem",letterSpacing:"-0.02em",color:"var(--green)",marginBottom:"6px"},children:t==="bm"?"Matematik":"Math"}),e.jsx("div",{style:{fontSize:"0.85rem",color:"#4B5563",fontWeight:500,lineHeight:1.4},children:t==="bm"?"Teroka dunia nombor dan logik!":"Explore the world of numbers and logic!"})]})]}),e.jsx("div",{className:"arrow-btn",children:e.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"var(--green)",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("path",{d:"M9 18l6-6-6-6"})})})]})]}),e.jsx("h2",{className:"section-header",children:t==="bm"?"KUMPULAN UMUR":"AGE GROUPS"}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"1rem",paddingBottom:"2.5rem"},children:m.map((i,o)=>e.jsxs("button",{className:"age-group-card",onClick:()=>a&&a(i.id),onMouseEnter:g,style:{backgroundColor:o===0?"#1E293B":o===1?"#0F766E":"#334155",padding:"1.25rem 1.5rem",display:"flex",alignItems:"center",gap:"1.25rem",cursor:"pointer",textAlign:"left",width:"100%",outline:"none",color:"#FFFFFF"},children:[e.jsx("div",{style:{flexShrink:0},children:f(i.id)}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{fontWeight:900,fontSize:"1.2rem",lineHeight:1.2,letterSpacing:"-0.02em"},children:i.title[t]||i.title.bm}),e.jsx("div",{style:{fontSize:"0.9rem",fontWeight:600,opacity:.95,marginTop:"6px"},children:i.subtitle[t]||i.subtitle.bm})]}),e.jsx("div",{style:{background:"rgba(255,255,255,0.25)",width:"40px",height:"40px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:"1.2rem",transition:"transform 0.2s"},children:"→"})]},i.id))})]})]})}export{j as default};
