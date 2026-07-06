import{j as e}from"./index-YCInXYg5.js";const o=["🎉","⭐","✨","🌟","🎊","💫"];function r({count:s=14}){return e.jsxs("div",{style:{position:"absolute",inset:0,pointerEvents:"none",overflow:"visible"},children:[e.jsx("style",{children:`
        @keyframes islam-confetti {
          0%   { transform: translateY(0) scale(0.4) rotate(0deg);   opacity: 0; }
          15%  { opacity: 1; }
          100% { transform: translateY(-90px) scale(1.2) rotate(45deg); opacity: 0; }
        }
      `}),Array.from({length:s}).map((a,t)=>e.jsx("span",{style:{position:"absolute",left:`${5+t*(90/s)}%`,top:"52%",fontSize:`${.9+t%3*.4}rem`,animation:`islam-confetti ${.78+t%4*.12}s ease-out forwards`,animationDelay:`${t%5*.04}s`},children:o[t%o.length]},t))]})}export{r as C};
