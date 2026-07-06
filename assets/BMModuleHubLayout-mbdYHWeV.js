import{j as e,b as f,r as u,w as $,x as L,y as M}from"./index-YCInXYg5.js";import{u as C}from"./useGamification-g-vGaz2S.js";function W({level:t=0,size:r="sm",loading:i=!1}){return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        .cd-root {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 1px;
          line-height: 1;
          min-height: 14px;
        }
        .cd-star {
          display: inline-block;
          line-height: 1;
        }
        .cd-star.empty {
          opacity: 0.3;
        }
        .cd-lock {
          display: inline-block;
          line-height: 1;
          opacity: 0.45;
        }
        .cd-loading-placeholder {
          display: inline-block;
        }

        @media (prefers-color-scheme: dark) {
          .cd-star.empty { opacity: 0.2; }
          .cd-lock { opacity: 0.35; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cd-root { animation: none; }
        }
      `}),e.jsx("span",{className:"cd-root",role:"img","aria-label":i?"Loading":t===0?"Not started":`Crown level ${t} of 5`,children:i?e.jsx("span",{className:"cd-loading-placeholder","aria-hidden":"true",style:{width:r==="sm"?"40px":"64px",height:r==="sm"?"11px":"15px"}}):t===0?e.jsx("span",{className:"cd-lock","aria-hidden":"true",style:{fontSize:r==="sm"?"11px":"16px"},children:"🔒"}):Array.from({length:5},(s,l)=>e.jsx("span",{className:`cd-star${l<t?"":" empty"}`,"aria-hidden":"true",style:{fontSize:r==="sm"?"11px":"15px"},children:l<t?"⭐":"☆"},l))})]})}function A(){const t=f.useId().replace(/[:.]/g,""),r=`body-${t}`,i=`face-${t}`,s=`accent-${t}`,l=`shadow-${t}`;return e.jsxs("svg",{viewBox:"84 6 344 344",width:"100",height:"100",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",children:[e.jsxs("defs",{children:[e.jsxs("linearGradient",{id:r,x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[e.jsx("stop",{offset:"0%",stopColor:"#ffffff"}),e.jsx("stop",{offset:"100%",stopColor:"#dbe8ff"})]}),e.jsxs("linearGradient",{id:i,x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[e.jsx("stop",{offset:"0%",stopColor:"#1d2a44"}),e.jsx("stop",{offset:"100%",stopColor:"#09111f"})]}),e.jsxs("linearGradient",{id:s,x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[e.jsx("stop",{offset:"0%",stopColor:"#5ef2ff"}),e.jsx("stop",{offset:"100%",stopColor:"#00b7ff"})]}),e.jsx("filter",{id:l,x:"-20%",y:"-20%",width:"140%",height:"140%",children:e.jsx("feDropShadow",{dx:"0",dy:"10",stdDeviation:"10",floodColor:"#000000",floodOpacity:"0.2"})})]}),e.jsxs("g",{filter:`url(#${l})`,children:[e.jsx("line",{x1:"175",y1:"135",x2:"155",y2:"65",stroke:"#b8c7dd",strokeWidth:"6",strokeLinecap:"round"}),e.jsx("line",{x1:"337",y1:"135",x2:"357",y2:"65",stroke:"#b8c7dd",strokeWidth:"6",strokeLinecap:"round"}),e.jsx("circle",{cx:"155",cy:"60",r:"19",fill:"#5ef2ff",opacity:"0.28"}),e.jsx("circle",{cx:"357",cy:"60",r:"19",fill:"#5ef2ff",opacity:"0.28"}),e.jsx("circle",{cx:"155",cy:"60",r:"12",fill:`url(#${s})`}),e.jsx("circle",{cx:"357",cy:"60",r:"12",fill:`url(#${s})`}),e.jsx("rect",{x:"95",y:"175",width:"45",height:"100",rx:"22",fill:`url(#${r})`,stroke:"#c8d6eb",strokeWidth:"2"}),e.jsx("rect",{x:"372",y:"175",width:"45",height:"100",rx:"22",fill:`url(#${r})`,stroke:"#c8d6eb",strokeWidth:"2"}),e.jsx("rect",{x:"88",y:"200",width:"10",height:"55",rx:"5",fill:`url(#${s})`}),e.jsx("rect",{x:"414",y:"200",width:"10",height:"55",rx:"5",fill:`url(#${s})`}),e.jsx("ellipse",{cx:"256",cy:"210",rx:"115",ry:"100",fill:`url(#${r})`,stroke:"#c8d6eb",strokeWidth:"4"}),e.jsx("ellipse",{cx:"256",cy:"205",rx:"100",ry:"90",fill:"#f0f6ff",stroke:"#dbe8ff",strokeWidth:"2"}),e.jsx("rect",{x:"150",y:"155",width:"212",height:"85",rx:"35",fill:`url(#${i})`,stroke:"#1d2a44",strokeWidth:"2"}),e.jsx("ellipse",{cx:"210",cy:"180",rx:"35",ry:"15",fill:"rgba(255,255,255,0.15)",opacity:"0.2",transform:"rotate(-15 210 180)"}),e.jsx("ellipse",{cx:"205",cy:"195",rx:"30",ry:"37",fill:"#5ef2ff",opacity:"0.22"}),e.jsx("ellipse",{cx:"307",cy:"195",rx:"30",ry:"37",fill:"#5ef2ff",opacity:"0.22"}),e.jsx("ellipse",{cx:"205",cy:"195",rx:"20",ry:"26",fill:"#53f3ff"}),e.jsx("ellipse",{cx:"307",cy:"195",rx:"20",ry:"26",fill:"#53f3ff"}),e.jsx("circle",{cx:"200",cy:"190",r:"7",fill:"white",opacity:"0.9"}),e.jsx("circle",{cx:"302",cy:"190",r:"7",fill:"white",opacity:"0.9"}),e.jsx("circle",{cx:"203",cy:"188",r:"3",fill:"white"}),e.jsx("circle",{cx:"305",cy:"188",r:"3",fill:"white"}),e.jsx("line",{x1:"226",y1:"260",x2:"286",y2:"260",stroke:`url(#${s})`,strokeWidth:"6",strokeLinecap:"round"}),e.jsx("circle",{cx:"175",cy:"170",r:"4",fill:"#5ef2ff",opacity:"0.7"}),e.jsx("circle",{cx:"337",cy:"175",r:"3",fill:"#5ef2ff",opacity:"0.7"}),e.jsx("circle",{cx:"256",cy:"145",r:"2.5",fill:"#00b7ff",opacity:"0.6"})]})]})}const F=f.memo(A);function N(){const t=f.useId().replace(/[:.]/g,""),r=`gx-body-${t}`,i=`gx-accent-${t}`,s=`gx-space-${t}`,l=`gx-shadow-${t}`,c=`gx-visor-${t}`;return e.jsxs("svg",{viewBox:"46 4 420 420",width:"100",height:"100",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",children:[e.jsxs("defs",{children:[e.jsxs("linearGradient",{id:r,x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[e.jsx("stop",{offset:"0%",stopColor:"#ffffff"}),e.jsx("stop",{offset:"100%",stopColor:"#dbe8ff"})]}),e.jsxs("linearGradient",{id:i,x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[e.jsx("stop",{offset:"0%",stopColor:"#5ef2ff"}),e.jsx("stop",{offset:"100%",stopColor:"#00b7ff"})]}),e.jsxs("linearGradient",{id:s,x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[e.jsx("stop",{offset:"0%",stopColor:"#050510"}),e.jsx("stop",{offset:"100%",stopColor:"#0a0a1a"})]}),e.jsx("filter",{id:l,x:"-20%",y:"-20%",width:"140%",height:"140%",children:e.jsx("feDropShadow",{dx:"0",dy:"15",stdDeviation:"15",floodColor:"#000000",floodOpacity:"0.2"})}),e.jsx("clipPath",{id:c,children:e.jsx("rect",{x:"110",y:"160",width:"292",height:"140",rx:"60"})})]}),e.jsxs("g",{filter:`url(#${l})`,children:[e.jsx("line",{x1:"170",y1:"110",x2:"140",y2:"50",stroke:"#b8c7dd",strokeWidth:"6",strokeLinecap:"round"}),e.jsx("line",{x1:"342",y1:"110",x2:"372",y2:"50",stroke:"#b8c7dd",strokeWidth:"6",strokeLinecap:"round"}),e.jsx("circle",{cx:"140",cy:"45",r:"26",fill:"#5ef2ff",opacity:"0.28"}),e.jsx("circle",{cx:"372",cy:"45",r:"26",fill:"#5ef2ff",opacity:"0.28"}),e.jsx("circle",{cx:"140",cy:"45",r:"16",fill:`url(#${i})`}),e.jsx("circle",{cx:"372",cy:"45",r:"16",fill:`url(#${i})`}),e.jsx("ellipse",{cx:"140",cy:"45",rx:"26",ry:"8",fill:"none",stroke:"#ffffff",strokeWidth:"2",opacity:"0.6",transform:"rotate(-30 140 45)"}),e.jsx("ellipse",{cx:"372",cy:"45",rx:"26",ry:"8",fill:"none",stroke:"#ffffff",strokeWidth:"2",opacity:"0.6",transform:"rotate(30 372 45)"}),e.jsx("path",{d:"M95 180 C 60 180, 60 280, 95 280 Z",fill:`url(#${r})`,stroke:"#c8d6eb",strokeWidth:"3"}),e.jsx("path",{d:"M417 180 C 452 180, 452 280, 417 280 Z",fill:`url(#${r})`,stroke:"#c8d6eb",strokeWidth:"3"}),e.jsx("rect",{x:"71",y:"196",width:"20",height:"68",rx:"10",fill:"#5ef2ff",opacity:"0.25"}),e.jsx("rect",{x:"421",y:"196",width:"20",height:"68",rx:"10",fill:"#5ef2ff",opacity:"0.25"}),e.jsx("rect",{x:"75",y:"200",width:"12",height:"60",rx:"6",fill:`url(#${i})`}),e.jsx("rect",{x:"425",y:"200",width:"12",height:"60",rx:"6",fill:`url(#${i})`}),e.jsx("rect",{x:"90",y:"100",width:"332",height:"260",rx:"100",fill:`url(#${r})`,stroke:"#c8d6eb",strokeWidth:"4"}),e.jsx("ellipse",{cx:"180",cy:"140",rx:"60",ry:"25",fill:"white",opacity:"0.8"}),e.jsxs("g",{stroke:"#00b7ff",strokeWidth:"1.5",opacity:"0.4",fill:"#5ef2ff",children:[e.jsx("circle",{cx:"130",cy:"140",r:"2.5"}),e.jsx("circle",{cx:"150",cy:"130",r:"1.5"}),e.jsx("circle",{cx:"160",cy:"150",r:"2"}),e.jsx("line",{x1:"130",y1:"140",x2:"150",y2:"130"}),e.jsx("line",{x1:"150",y1:"130",x2:"160",y2:"150"}),e.jsx("circle",{cx:"382",cy:"140",r:"2.5"}),e.jsx("circle",{cx:"362",cy:"130",r:"1.5"}),e.jsx("circle",{cx:"352",cy:"150",r:"2"}),e.jsx("line",{x1:"382",y1:"140",x2:"362",y2:"130"}),e.jsx("line",{x1:"362",y1:"130",x2:"352",y2:"150"})]}),e.jsx("rect",{x:"110",y:"160",width:"292",height:"140",rx:"60",fill:`url(#${s})`}),e.jsx("g",{clipPath:`url(#${c})`,children:e.jsxs("g",{fill:"white",children:[e.jsx("circle",{cx:"140",cy:"180",r:"1.5",opacity:"0.9"}),e.jsx("circle",{cx:"180",cy:"240",r:"1",opacity:"0.6"}),e.jsx("circle",{cx:"220",cy:"190",r:"2",opacity:"0.8"}),e.jsx("circle",{cx:"260",cy:"250",r:"1.5",opacity:"0.7"}),e.jsx("circle",{cx:"300",cy:"180",r:"1",opacity:"0.5"}),e.jsx("circle",{cx:"340",cy:"220",r:"2",opacity:"0.9"}),e.jsx("circle",{cx:"370",cy:"190",r:"1.5",opacity:"0.6"}),e.jsx("circle",{cx:"150",cy:"260",r:"1",opacity:"0.8"}),e.jsx("circle",{cx:"280",cy:"210",r:"1.5",opacity:"0.7"}),e.jsx("circle",{cx:"200",cy:"210",r:"1",opacity:"0.5"}),e.jsx("circle",{cx:"350",cy:"270",r:"1.5",opacity:"0.8"}),e.jsx("circle",{cx:"240",cy:"220",r:"6",opacity:"0.45"}),e.jsx("circle",{cx:"240",cy:"220",r:"2.5",opacity:"1"})]})}),e.jsx("ellipse",{cx:"190",cy:"190",rx:"50",ry:"20",fill:"white",opacity:"0.1",transform:"rotate(-15 190 190)"}),e.jsx("path",{d:"M120 180 Q256 150 392 180",fill:"none",stroke:"white",strokeWidth:"3",opacity:"0.15",strokeLinecap:"round"}),e.jsx("rect",{x:"110",y:"160",width:"292",height:"140",rx:"60",fill:"none",stroke:"#1d2a44",strokeWidth:"4"}),e.jsx("ellipse",{cx:"195",cy:"225",rx:"32",ry:"38",fill:"#53f3ff",opacity:"0.22"}),e.jsx("ellipse",{cx:"317",cy:"225",rx:"32",ry:"38",fill:"#53f3ff",opacity:"0.22"}),e.jsx("ellipse",{cx:"195",cy:"225",rx:"22",ry:"28",fill:"#53f3ff"}),e.jsx("ellipse",{cx:"317",cy:"225",rx:"22",ry:"28",fill:"#53f3ff"}),e.jsx("ellipse",{cx:"190",cy:"218",rx:"8",ry:"10",fill:"white",opacity:"0.9"}),e.jsx("ellipse",{cx:"312",cy:"218",rx:"8",ry:"10",fill:"white",opacity:"0.9"}),e.jsx("path",{d:"M226 265 Q256 285 286 265",fill:"none",stroke:"#53f3ff",strokeWidth:"11",strokeLinecap:"round",opacity:"0.25"}),e.jsx("path",{d:"M226 265 Q256 285 286 265",fill:"none",stroke:"#53f3ff",strokeWidth:"5",strokeLinecap:"round"}),e.jsx("rect",{x:"210",y:"316",width:"92",height:"14",rx:"7",fill:"#5ef2ff",opacity:"0.22"}),e.jsx("rect",{x:"216",y:"320",width:"80",height:"6",rx:"3",fill:`url(#${i})`,opacity:"0.9"})]})]})}const B=f.memo(N);function D(){const t=f.useId().replace(/[:.]/g,""),r=`vy-body-${t}`,i=`vy-accent-${t}`,s=`vy-face-${t}`,l=`vy-shadow-${t}`,c=`vy-visor-${t}`;return e.jsxs("svg",{viewBox:"78 14 356 356",width:"100",height:"100",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",children:[e.jsxs("defs",{children:[e.jsxs("linearGradient",{id:r,x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[e.jsx("stop",{offset:"0%",stopColor:"#ffffff"}),e.jsx("stop",{offset:"100%",stopColor:"#dbe8ff"})]}),e.jsxs("linearGradient",{id:i,x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[e.jsx("stop",{offset:"0%",stopColor:"#5ef2ff"}),e.jsx("stop",{offset:"100%",stopColor:"#00b7ff"})]}),e.jsxs("linearGradient",{id:s,x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[e.jsx("stop",{offset:"0%",stopColor:"#1d2a44"}),e.jsx("stop",{offset:"100%",stopColor:"#09111f"})]}),e.jsx("filter",{id:l,x:"-20%",y:"-20%",width:"140%",height:"140%",children:e.jsx("feDropShadow",{dx:"0",dy:"11",stdDeviation:"11",floodColor:"#000000",floodOpacity:"0.2"})}),e.jsx("clipPath",{id:c,children:e.jsx("rect",{x:"150",y:"160",width:"212",height:"94",rx:"40"})})]}),e.jsxs("g",{filter:`url(#${l})`,children:[e.jsx("line",{x1:"178",y1:"150",x2:"150",y2:"96",stroke:"#b8c7dd",strokeWidth:"6",strokeLinecap:"round"}),e.jsx("line",{x1:"334",y1:"150",x2:"362",y2:"96",stroke:"#b8c7dd",strokeWidth:"6",strokeLinecap:"round"}),e.jsx("circle",{cx:"147",cy:"90",r:"16",fill:"#5ef2ff",opacity:"0.26"}),e.jsx("circle",{cx:"365",cy:"90",r:"16",fill:"#5ef2ff",opacity:"0.26"}),e.jsx("circle",{cx:"147",cy:"90",r:"10",fill:`url(#${i})`}),e.jsx("circle",{cx:"365",cy:"90",r:"10",fill:`url(#${i})`}),e.jsx("rect",{x:"92",y:"170",width:"50",height:"112",rx:"24",fill:`url(#${r})`,stroke:"#c8d6eb",strokeWidth:"3"}),e.jsx("rect",{x:"370",y:"170",width:"50",height:"112",rx:"24",fill:`url(#${r})`,stroke:"#c8d6eb",strokeWidth:"3"}),e.jsx("rect",{x:"85",y:"190",width:"9",height:"34",rx:"4",fill:`url(#${i})`}),e.jsx("rect",{x:"85",y:"232",width:"9",height:"28",rx:"4",fill:`url(#${i})`}),e.jsx("rect",{x:"418",y:"190",width:"9",height:"34",rx:"4",fill:`url(#${i})`}),e.jsx("rect",{x:"418",y:"232",width:"9",height:"28",rx:"4",fill:`url(#${i})`}),e.jsx("circle",{cx:"117",cy:"248",r:"8",fill:`url(#${i})`,opacity:"0.9"}),e.jsx("circle",{cx:"395",cy:"248",r:"8",fill:`url(#${i})`,opacity:"0.9"}),e.jsx("ellipse",{cx:"256",cy:"216",rx:"120",ry:"106",fill:`url(#${r})`,stroke:"#c8d6eb",strokeWidth:"4"}),e.jsx("ellipse",{cx:"256",cy:"211",rx:"105",ry:"94",fill:"#f0f6ff",stroke:"#dbe8ff",strokeWidth:"2"}),e.jsx("ellipse",{cx:"212",cy:"156",rx:"58",ry:"24",fill:"white",opacity:"0.6"}),e.jsx("path",{d:"M188 122 Q256 106 324 122 L320 142 Q256 130 192 142 Z",fill:`url(#${r})`,stroke:"#c8d6eb",strokeWidth:"2.5",strokeLinejoin:"round"}),e.jsx("path",{d:"M256 124 L266 134 L256 146 L246 134 Z",fill:"#5ef2ff",opacity:"0.28"}),e.jsx("path",{d:"M256 128 L263 134 L256 142 L249 134 Z",fill:`url(#${i})`}),e.jsx("path",{d:"M156 96 L256 136 L356 96 L356 105 L256 145 L156 105 Z",fill:`url(#${i})`}),e.jsx("path",{d:"M156 96 L256 136 L356 96 L356 105 L256 145 L156 105 Z",fill:"#0a1626",opacity:"0.18"}),e.jsx("path",{d:"M256 56 L356 96 L256 136 L156 96 Z",fill:`url(#${r})`,stroke:"#c8d6eb",strokeWidth:"3.5",strokeLinejoin:"round"}),e.jsx("path",{d:"M256 64 L320 90 L256 100 L192 90 Z",fill:"white",opacity:"0.45"}),e.jsx("circle",{cx:"256",cy:"96",r:"13",fill:"#5ef2ff",opacity:"0.24"}),e.jsx("circle",{cx:"256",cy:"96",r:"8",fill:`url(#${i})`}),e.jsx("circle",{cx:"252",cy:"92",r:"2.6",fill:"white",opacity:"0.9"}),e.jsx("path",{d:"M256 96 Q338 88 356 112 Q366 128 360 170",fill:"none",stroke:`url(#${i})`,strokeWidth:"4",strokeLinecap:"round"}),e.jsx("circle",{cx:"360",cy:"172",r:"10",fill:"#5ef2ff",opacity:"0.24"}),e.jsx("rect",{x:"351",y:"166",width:"18",height:"14",rx:"6",fill:`url(#${i})`}),e.jsxs("g",{stroke:`url(#${i})`,strokeWidth:"2.6",strokeLinecap:"round",children:[e.jsx("line",{x1:"353",y1:"180",x2:"352",y2:"198"}),e.jsx("line",{x1:"358",y1:"180",x2:"358",y2:"200"}),e.jsx("line",{x1:"363",y1:"180",x2:"364",y2:"198"}),e.jsx("line",{x1:"368",y1:"180",x2:"369",y2:"196"})]}),e.jsx("rect",{x:"150",y:"160",width:"212",height:"94",rx:"40",fill:`url(#${s})`,stroke:"#1d2a44",strokeWidth:"4"}),e.jsxs("g",{clipPath:`url(#${c})`,children:[e.jsxs("g",{fill:"white",children:[e.jsx("circle",{cx:"186",cy:"178",r:"1.4",opacity:"0.7"}),e.jsx("circle",{cx:"330",cy:"182",r:"1.4",opacity:"0.7"}),e.jsx("circle",{cx:"256",cy:"172",r:"1.1",opacity:"0.5"}),e.jsx("circle",{cx:"200",cy:"236",r:"1",opacity:"0.5"}),e.jsx("circle",{cx:"316",cy:"238",r:"1",opacity:"0.5"})]}),e.jsx("rect",{x:"162",y:"168",width:"188",height:"9",rx:"4.5",fill:"#5ef2ff",opacity:"0.16"})]}),e.jsx("path",{d:"M168 176 Q256 164 344 176",fill:"none",stroke:"white",strokeWidth:"3",opacity:"0.16",strokeLinecap:"round"}),e.jsx("rect",{x:"156",y:"198",width:"6",height:"22",rx:"3",fill:`url(#${i})`,opacity:"0.7"}),e.jsx("rect",{x:"350",y:"198",width:"6",height:"22",rx:"3",fill:`url(#${i})`,opacity:"0.7"}),e.jsx("ellipse",{cx:"206",cy:"202",rx:"30",ry:"36",fill:"#5ef2ff",opacity:"0.22"}),e.jsx("ellipse",{cx:"306",cy:"202",rx:"30",ry:"36",fill:"#5ef2ff",opacity:"0.22"}),e.jsx("ellipse",{cx:"206",cy:"202",rx:"20",ry:"26",fill:"#53f3ff"}),e.jsx("ellipse",{cx:"306",cy:"202",rx:"20",ry:"26",fill:"#53f3ff"}),e.jsx("circle",{cx:"200",cy:"195",r:"7",fill:"white",opacity:"0.9"}),e.jsx("circle",{cx:"300",cy:"195",r:"7",fill:"white",opacity:"0.9"}),e.jsx("circle",{cx:"211",cy:"210",r:"3",fill:"white",opacity:"0.7"}),e.jsx("circle",{cx:"311",cy:"210",r:"3",fill:"white",opacity:"0.7"}),e.jsx("path",{d:"M226 234 Q256 250 286 234",fill:"none",stroke:"#53f3ff",strokeWidth:"9",strokeLinecap:"round",opacity:"0.22"}),e.jsx("path",{d:"M226 234 Q256 250 286 234",fill:"none",stroke:"#53f3ff",strokeWidth:"4.5",strokeLinecap:"round"}),e.jsx("rect",{x:"146",y:"248",width:"30",height:"22",rx:"9",fill:"#f0f6ff",stroke:"#dbe8ff",strokeWidth:"2"}),e.jsx("rect",{x:"336",y:"248",width:"30",height:"22",rx:"9",fill:"#f0f6ff",stroke:"#dbe8ff",strokeWidth:"2"}),e.jsx("circle",{cx:"155",cy:"259",r:"2.5",fill:`url(#${i})`,opacity:"0.8"}),e.jsx("circle",{cx:"167",cy:"259",r:"2.5",fill:`url(#${i})`,opacity:"0.8"}),e.jsx("circle",{cx:"345",cy:"259",r:"2.5",fill:`url(#${i})`,opacity:"0.8"}),e.jsx("circle",{cx:"357",cy:"259",r:"2.5",fill:`url(#${i})`,opacity:"0.8"}),e.jsx("path",{d:"M204 296 L308 296 L324 330 L188 330 Z",fill:`url(#${r})`,stroke:"#c8d6eb",strokeWidth:"3",strokeLinejoin:"round"}),e.jsx("rect",{x:"210",y:"306",width:"92",height:"8",rx:"4",fill:`url(#${i})`,opacity:"0.9"}),e.jsx("circle",{cx:"224",cy:"322",r:"3",fill:`url(#${i})`,opacity:"0.8"}),e.jsx("circle",{cx:"256",cy:"322",r:"3",fill:`url(#${i})`,opacity:"0.8"}),e.jsx("circle",{cx:"288",cy:"322",r:"3",fill:`url(#${i})`,opacity:"0.8"}),e.jsx("circle",{cx:"178",cy:"150",r:"4",fill:"#5ef2ff",opacity:"0.7"}),e.jsx("circle",{cx:"336",cy:"152",r:"3",fill:"#5ef2ff",opacity:"0.7"})]})]})}const E=f.memo(D);function T(t){return t?t.replace(/^\d-/,""):""}function G(){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",children:[e.jsx("rect",{x:"4",y:"10",width:"16",height:"11",rx:"2.5",fill:"#fff"}),e.jsx("path",{d:"M8 10V7.5a4 4 0 0 1 8 0V10",stroke:"#fff",strokeWidth:"2.4",strokeLinecap:"round"}),e.jsx("circle",{cx:"12",cy:"15",r:"1.7",fill:"#64748B"}),e.jsx("rect",{x:"11.2",y:"15.5",width:"1.6",height:"3.4",rx:".8",fill:"#64748B"})]})}const I=[0,1,0,-1];function z({year:t,activeModule:r,onSelectTopic:i,language:s}){const l=u.useMemo(()=>$(t),[t]),{loading:c,getTopicLevel:j}=C("bm"),g=u.useMemo(()=>{const o=T(r);return l.findIndex(p=>p.id===o)},[l,r]),m=u.useCallback(o=>{i&&i(o)},[i]),k=(o,p,h)=>{const a=p===0,n=o.icon,d=t===1||t===2||t===3,x=c?0:j(o.id),v=x>=1,y=t===1&&!c&&!a&&!h,b=o.disabled||y;return e.jsxs("div",{className:"step",style:{"--dir":I[p%4]},children:[a&&e.jsxs("div",{className:"start-bubble",children:["MULA",e.jsx("i",{})]}),e.jsxs("button",{type:"button",className:`node-btn${d?" node-unified":""}${b?" node-disabled":""}${y?" node-locked":""}${v&&!b?" node-done":""}`,"aria-label":y?`TOPIK ${o.num} — terkunci`:`TOPIK ${o.num}`,onClick:()=>!b&&m(o.id),disabled:b,children:[e.jsx("span",{className:"node-ico",children:d?t===1?e.jsx(B,{}):t===2?e.jsx(F,{}):e.jsx(E,{}):n?e.jsx(n,{}):null}),y&&e.jsx("span",{className:"node-lock",children:e.jsx(G,{})})]}),e.jsxs("div",{className:"node-meta",children:[e.jsxs("div",{className:"node-topic",children:["TOPIK ",o.num]}),e.jsx("div",{className:"node-label",children:o.label}),e.jsx("div",{className:"node-crown",children:e.jsx(W,{level:x,size:"sm",loading:c})})]})]},o.id)},w=(o,p)=>{const h=o.badge,a=o.topics.length,n=o.topics.filter(d=>L(d.id)).length;return e.jsx("section",{className:`module mod-${o.num}`,"data-module":o.num,hidden:!1,children:e.jsxs("div",{className:"journey-inner",children:[e.jsxs("div",{className:"unit-banner",children:[e.jsxs("div",{className:"unit-text",children:[e.jsx("div",{className:"unit-kicker",children:s==="bm"?`Modul ${o.num} · Unit Pembelajaran`:`Module ${o.num} · Learning Unit`}),e.jsx("div",{className:"unit-name",children:s==="bm"?o.name:o.nameEn})]}),e.jsx("div",{className:"unit-badge",children:h?e.jsx(h,{}):null})]}),e.jsxs("div",{className:"trail",children:[o.topics.map((d,x)=>k(d,x,x===0?!0:!c&&j(o.topics[x-1].id)>=1)),e.jsxs("div",{className:"step is-goal",children:[e.jsxs("div",{className:`trophy-wrap${n===a&&a>0?" trophy-all-done":""}`,children:[e.jsx("button",{type:"button",className:"node-btn node-goal","aria-label":s==="bm"?"Tamat Modul":"End Module",children:e.jsx("span",{className:"node-ico",children:e.jsx(M,{})})}),e.jsxs("span",{className:"trophy-count",children:[n,"/",a]})]}),e.jsx("div",{className:"node-meta",children:e.jsx("div",{className:"node-label node-label-goal",children:n===a&&a>0?s==="bm"?"Semua Lengkap! 🎉":"All Complete! 🎉":s==="bm"?"Tamat Modul":"End Module"})})]})]})]})},o.num)};return e.jsxs("div",{className:"bm-hub-layout",children:[l[g]&&w(l[g]),e.jsx("style",{children:`
        .module[hidden]{display:none}
        .module{min-height:100vh;padding:34px 16px 120px}
        .mod-1{--c:#FF8F3D;--cd:#FF6F00;}
        .mod-2{--c:#36A9F0;--cd:#1A78C7;}
        .mod-3{--c:#A368F0;--cd:#7038D6;}
        .mod-4{--c:#FF6FA8;--cd:#DB3E7F;}
        .mod-5{--c:#1EC9B7;--cd:#0E9488;}
        /* Single flat page background — matches .bm-module-page so the nav bar
           and the hub content read as one uniform color (no gradient seam).
           Per-module color identity lives in the banner / nodes / tabs accents. */
        .bm-hub-layout .module{background:#F7F8FA}

        .journey-inner{max-width:460px;margin:0 auto}

        .unit-banner{display:flex;align-items:center;gap:14px;color:#fff;
          background:linear-gradient(135deg,color-mix(in srgb,var(--c) 86%,white),var(--c));
          border:5px solid var(--cd);
          border-radius:28px;padding:18px 22px;margin:6px 0 34px;
          box-shadow:0 15px 25px rgba(0,0,0,.1)}
        .unit-text{flex:1;min-width:0}
        .unit-kicker{font-family:'Fredoka',sans-serif;font-weight:700;font-size:11px;letter-spacing:.14em;
          text-transform:uppercase;color:#fff;text-shadow:2px 3px 0 var(--cd);margin-bottom:4px}
        .unit-name{font-family:'Fredoka',sans-serif;font-weight:700;font-size:21px;line-height:1.1;letter-spacing:-.01em;
          text-shadow:2px 3px 0 var(--cd)}
        .unit-badge{width:46px;height:46px;flex:0 0 auto;border-radius:14px;background:rgba(255,255,255,.18);
          display:flex;align-items:center;justify-content:center}
        .unit-badge svg{width:26px;height:26px}

        .trail{--amp:clamp(48px,24vw,118px);display:flex;flex-direction:column;align-items:center}
        .step{display:flex;flex-direction:column;align-items:center;padding:9px 0;
          transform:translateX(calc(var(--dir,0) * var(--amp)));
          transition:transform .3s cubic-bezier(.34,1.56,.64,1)}

        /* 3D "squishy" candy node: solid colored ledge below (var(--cd)) reads as
           depth; pressing translates the button down by the ledge height so it
           "sinks" into the page for tactile feedback. */
        /* Topic nodes are self-contained illustrations (own circle, color & rim),
           so no colored ring/fill here — just a neutral 3D base + squishy press
           that works under every per-topic color. */
        .node-btn{position:relative;width:96px;height:96px;border-radius:50%;padding:0;border:none;cursor:pointer;
          background:transparent;-webkit-tap-highlight-color:transparent;
          box-shadow:0 8px 0 rgba(0,0,0,.16),0 15px 20px -8px rgba(0,0,0,.32);
          display:flex;align-items:center;justify-content:center;
          transition:transform .12s ease,box-shadow .12s ease}
        @media (hover:hover){
          .node-btn:hover{transform:translateY(-4px) scale(1.06);
            box-shadow:0 12px 0 rgba(0,0,0,.16),0 22px 26px -8px rgba(0,0,0,.34)}
          .node-btn.node-disabled:hover{transform:none;box-shadow:0 8px 0 rgba(0,0,0,.14),0 15px 20px -8px rgba(0,0,0,.22)}
          .node-goal:hover{transform:translateY(-4px) scale(1.04);
            box-shadow:0 20px 25px -6px rgba(120,80,4,.4)}
        }
        .node-btn:active{transform:translateY(8px) scale(.97);box-shadow:0 0 0 rgba(0,0,0,.16),0 4px 10px -6px rgba(0,0,0,.25)}
        /* unified robot stands alone — no card box/ledge (the SVG carries its own
           drop shadow), so strip the base node-btn background + box-shadow */
        .node-btn.node-unified,
        .node-btn.node-unified:active{background:transparent;border-radius:0;box-shadow:none}
        @media (hover:hover){
          .node-btn.node-unified:hover{box-shadow:none}
        }
        .node-btn.node-disabled{cursor:default;filter:grayscale(1);
          box-shadow:0 8px 0 rgba(0,0,0,.14),0 15px 20px -8px rgba(0,0,0,.22)}
        /* Locked (not yet unlocked) — desaturate AND dim ONLY the robot art so it
           reads as "asleep". The grayscale/opacity lives on .node-ico (not the
           whole button) so the padlock badge beside it stays crisp & legible
           (a child can't escape a parent's filter). */
        .node-btn.node-locked{filter:none}
        .node-btn.node-locked .node-ico{filter:grayscale(1) opacity(.55)}
        /* A unified robot carries its own drop shadow and has no card box, so the
           ledge box-shadow that .node-disabled re-adds renders as a square block
           behind the head (and a black line on hover). Higher-specificity reset
           keeps locked unified robots boxless in every state. */
        .node-btn.node-unified.node-disabled,
        .node-btn.node-unified.node-disabled:active{box-shadow:none}
        @media (hover:hover){
          .node-btn.node-unified.node-disabled:hover{box-shadow:none;transform:none}
        }
        .node-lock{position:absolute;right:-2px;bottom:-2px;width:30px;height:30px;border-radius:50%;
          background:#94A3B8;border:3px solid #fff;display:flex;align-items:center;justify-content:center;
          box-shadow:0 3px 6px rgba(0,0,0,.28);z-index:3}
        .node-lock svg{width:16px;height:16px;display:block}
        /* a locked node's label group reads muted too */
        .node-locked + .node-meta .node-topic{background:#94A3B8}
        .node-locked + .node-meta .node-label{color:#94A3B8;border-color:#CBD5E1;box-shadow:0 4px 0 #CBD5E1}
        .node-ico{width:100%;height:100%;display:flex;align-items:center;justify-content:center}
        .node-ico svg{width:100%;height:100%;display:block}

        /* The "End Module" trophy is a flat node (not an illustration), so it keeps
           a solid gold fill + matching ledge + a glossy spot. */
        .node-goal{background:radial-gradient(circle at 42% 32%,#FFFBEB 0%,#FBBF24 75%,#D97706 100%);
          border:5px solid #B45309;box-shadow:0 15px 20px -4px rgba(120,80,4,.4)}
        .node-goal::before{content:"";position:absolute;top:9px;left:14px;width:28px;height:14px;
          border-radius:50%;transform:rotate(-15deg);background:rgba(255,255,255,.42);pointer-events:none;z-index:2}
        .node-goal:active{transform:translateY(2px);box-shadow:0 4px 12px -8px rgba(120,80,4,.25)}
        .node-goal .node-ico svg{width:62px;height:62px}
        .node-done .node-ico svg{opacity:.7}
        .trophy-wrap{position:relative;display:flex;flex-direction:column;align-items:center}
        .trophy-count{font-family:'Fredoka',sans-serif;font-weight:700;font-size:13px;
          color:#A9740A;margin-top:-4px;background:rgba(255,255,255,.7);
          padding:2px 12px;border-radius:99px;border:1px solid #E0A01244;position:relative;z-index:1}
        .trophy-all-done .trophy-count{background:#16A34A;color:#fff;border-color:#16A34A44}

        /* stack each child on its own line (badge / label / crown) — flex column
           so a short label like "Pesanan" never floats inline beside the badge */
        .node-meta{margin-top:12px;text-align:center;max-width:180px;
          display:flex;flex-direction:column;align-items:center}
        /* "TOPIK n" → solid module-color badge with white text (echoes the robot head) */
        .node-topic{display:inline-block;font-family:'Fredoka',sans-serif;font-weight:700;font-size:10px;letter-spacing:.1em;
          text-transform:uppercase;color:#fff;background:var(--cd);
          padding:3px 11px;border-radius:99px;margin-bottom:6px}
        /* topic label → white pill framed in the module deep color + matching 3D ledge */
        .node-label{display:inline-block;font-family:'Fredoka',sans-serif;font-weight:700;font-size:14px;line-height:1.2;
          color:#5C3D2E;background:#fff;padding:5px 16px;border-radius:20px;
          border:3px solid var(--cd);box-shadow:0 4px 0 var(--cd);text-wrap:balance}
        .node-label-goal{color:#A9740A;border-color:#A9740A;box-shadow:0 4px 0 #A9740A}

        .node-crown{margin-top:4px;min-height:14px;display:flex;align-items:center;justify-content:center}
        /* crown sits in .node-meta, the sibling AFTER the disabled button — not inside it */
        .node-disabled + .node-meta .node-crown{opacity:.45}

        /* Standalone robots (T2 M1 headset, M2 guardian): pull the label group up
           snug under the head (no card box, so the default 12px gap looks loose).
           Layout stays stacked (TOPIK above label). */
        .node-btn.node-unified + .node-meta{margin-top:-2px}

        .start-bubble{position:relative;margin-bottom:18px;
          background:#FF4A6B;color:#fff;
          font-family:'Fredoka',sans-serif;font-weight:600;font-size:13px;letter-spacing:.08em;
          padding:6px 16px;border-radius:12px;border:3px solid #D63031;
          box-shadow:0 4px 0 #D63031;
          animation:bounceY 1.5s ease-in-out infinite}
        .start-bubble i{position:absolute;left:50%;bottom:-8px;width:12px;height:12px;background:#FF4A6B;
          border-right:3px solid #D63031;border-bottom:3px solid #D63031;
          transform:translateX(-50%) rotate(45deg)}
        @keyframes bounceY{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}

        .floatA{animation:floatA 3.5s ease-in-out infinite;transform-origin:center}
        .floatA.d1{animation-delay:.35s}.floatA.d2{animation-delay:.7s}
        @keyframes floatA{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
        .pulse{animation:pulse 2.2s ease-in-out infinite}
        @keyframes pulse{0%,100%{opacity:.55}50%{opacity:1}}
        .bob{animation:bob 2.6s ease-in-out infinite;transform-origin:center}
        @keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
        .wave{animation:wave 1.8s ease-in-out infinite}
        .wave.w2{animation-delay:.3s}.wave.w3{animation-delay:.6s}
        @keyframes wave{0%,100%{opacity:.35;transform:scale(.9)}50%{opacity:1;transform:scale(1.05)}}
        .beat{animation:beat 1.6s ease-in-out infinite;transform-origin:center}
        @keyframes beat{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}

        @media (prefers-reduced-motion:reduce){
          .floatA,.pulse,.bob,.wave,.beat,.start-bubble{animation:none}
        }
        @media (max-width:380px){
          .node-btn{width:86px;height:86px}
        }
      `})]})}export{z as default};
