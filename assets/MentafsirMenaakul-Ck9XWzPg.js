import{r,e as R,p as b,j as a,b as H}from"./index-YCInXYg5.js";import{c as N}from"./confetti.module-oQXWb4Lk.js";import{B as A}from"./BMHeader-B5cOc9J_.js";import{u as K}from"./useTopicGamification-I1kCte-J.js";import{R as I}from"./refresh-cw-J9zlOc9a.js";import"./useGamification-g-vGaz2S.js";const t="#1CB0F6",x="#0B8DC0",$=`
  .mm-root {
    height: 100dvh; overflow: hidden;
    background:
      radial-gradient(ellipse 70% 50% at 18% 0%, #D6F0FF 0%, transparent 60%),
      radial-gradient(ellipse 60% 45% at 88% 100%, #B0E0FF 0%, transparent 65%),
      linear-gradient(180deg, #EBF8FF 0%, #D0F0FF 55%, #B5E5FF 100%);
    font-family: 'Fredoka', system-ui, sans-serif;
    display: flex; flex-direction: column;
  }

  .mm-body {
    flex: 1; min-height: 0;
    display: flex; flex-direction: column; align-items: center;
    width: 100%; max-width: 560px;
    margin: 0 auto;
    padding: clamp(8px, 1.6vh, 12px) clamp(14px, 3.5vw, 28px);
  }

  .mm-stats {
    flex-shrink: 0; width: 100%;
    display: flex; align-items: center; justify-content: space-between;
    gap: 8px; margin-bottom: clamp(10px, 1.6vh, 14px);
  }

  .mm-pill {
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(11px, 2vh, 13px);
    border-radius: 999px;
    padding: clamp(3px, 0.7vh, 5px) clamp(10px, 2.4vw, 14px);
    white-space: nowrap;
    background: #FFFFFFCC; color: #1B6B99; border: 1.5px solid ${t}44;
  }

  .mm-bar-wrap {
    flex-shrink: 0; width: 100%;
    background: #90D4FF; border-radius: 999px;
    height: clamp(6px, 1.2vh, 9px); overflow: hidden;
    margin-bottom: clamp(12px, 2vh, 18px);
  }

  .mm-bar-fill {
    background: linear-gradient(90deg, ${t}, #4EC5FF);
    height: 100%; border-radius: 999px;
    transition: width 0.3s;
  }

  .mm-scroll {
    flex: 1; min-height: 0;
    overflow-y: auto;
    width: 100%;
    padding-bottom: clamp(12px, 2vh, 16px);
  }

  .mm-card {
    background: #FFF; border-radius: 14px;
    border: 2px solid ${t};
    padding: clamp(14px, 2.4vh, 20px) clamp(14px, 3vw, 24px);
    margin-bottom: 1rem;
  }

  .mm-card-header {
    display: flex; align-items: center; gap: 0.5rem;
    margin-bottom: 0.6rem;
  }

  .mm-card-title {
    font-weight: 800; font-size: clamp(13px, 2.4vh, 16px);
    color: ${t};
  }

  .mm-context {
    font-size: clamp(13px, 2.2vh, 15px);
    color: #333; line-height: 1.75;
    margin: 0;
  }

  .mm-word-highlight {
    background: #FFF9C4; color: #F57F17;
    font-weight: bold; padding: 0.2rem 0.35rem;
    border-radius: 4px; margin: 0 0.1rem;
  }

  .mm-q-card {
    background: #FFF; border-radius: 14px;
    border: 2px solid ${t}66;
    padding: clamp(12px, 2vh, 18px) clamp(12px, 2.5vw, 20px);
    margin-bottom: 1rem;
  }

  .mm-q-header {
    display: flex; align-items: center; gap: 0.5rem;
    margin-bottom: 0.75rem;
  }

  .mm-q-num {
    background: ${t}; color: #fff;
    border-radius: 50%; width: 26px; height: 26px;
    display: flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: 0.8rem; flex-shrink: 0;
  }

  .mm-q-text {
    margin: 0; font-weight: 700;
    font-size: clamp(13px, 2.2vh, 15px);
    color: #333; line-height: 1.4;
  }

  .mm-options {
    display: flex; flex-direction: column; gap: 0.55rem;
  }

  .mm-opt {
    padding: clamp(10px, 1.6vh, 14px) clamp(12px, 2vw, 16px);
    background: #FFF; color: #333;
    border: 2px solid ${t}; border-radius: 12px;
    cursor: pointer; font-weight: 700;
    font-size: clamp(13px, 2.2vh, 15px);
    text-align: left; transition: all 0.2s;
    font-family: 'Fredoka', system-ui, sans-serif;
  }

  .mm-opt:disabled { cursor: default; }

  .mm-opt.correct { background: #4CAF50; border-color: #388E3C; color: #fff; }
  .mm-opt.wrong { background: #FF6B6B; border-color: #D32F2F; color: #fff; }
  .mm-opt.reveal { background: #F5F5F5; border-color: #DDD; color: #AAA; }

  .mm-feedback {
    padding: clamp(10px, 1.6vh, 14px) clamp(14px, 2.4vw, 18px);
    border-radius: 10px; font-weight: 700;
    font-size: clamp(12px, 2vh, 14px);
    margin-bottom: 1rem;
  }

  .mm-feedback.correct { background: #D4EDDA; color: #155724; }
  .mm-feedback.wrong { background: #F8D7DA; color: #721C24; }

  .mm-footer {
    flex-shrink: 0;
    display: flex; gap: clamp(8px, 2vw, 12px);
    width: 100%; max-width: 560px;
    margin: 0 auto;
    padding: clamp(10px, 1.6vh, 14px) clamp(14px, 3.5vw, 28px) clamp(8px, 1.6vh, 12px);
    border-top: 2px solid ${t}33;
  }

  .mm-btn {
    flex: 1; min-width: 0;
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(13px, 2.4vh, 16px);
    border: none; border-radius: 14px; cursor: pointer;
    padding: clamp(10px, 2vh, 14px) 12px;
    transition: transform .12s ease;
  }

  .mm-btn:active { transform: translateY(2px); }
  .mm-btn:disabled { opacity: 0.45; cursor: not-allowed; }

  .mm-btn.primary {
    color: #fff;
    background: linear-gradient(180deg, ${t}cc, ${t});
    box-shadow: 0 4px 0 ${x};
  }

  .mm-btn.secondary {
    color: #64748B; background: #F1F5F9;
    box-shadow: 0 4px 0 #CBD5E1;
  }

  .mm-center {
    flex: 1; min-height: 0;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: clamp(16px, 2.4vh, 20px); padding: 16px; text-align: center;
  }
`,g=[{id:1,word_bm:"bersinar",word_eng:"shine",context_bm:"Matahari bersinar dengan terang di langit yang biru.",context_eng:"The sun shines brightly in the blue sky.",source:{bm:"Cerita Alam",eng:"Nature Story"},emoji:"☀️",options:[{text:"memancarkan cahaya / bercahaya",meaning:"emit light / glow"},{text:"tersembunyi / hilang",meaning:"hidden / gone"},{text:"turun dengan cepat",meaning:"fall quickly"}],answer:"memancarkan cahaya / bercahaya",explanation_bm:'Matahari "bersinar dengan terang" bermaksud ia memancarkan cahaya yang cerah ke mana-mana.'},{id:2,word_bm:"gelisah",word_eng:"restless",context_bm:"Burung itu gelisah kerana sarangnya hilang.",context_eng:"The bird is restless because its nest is gone.",source:{bm:"Cerita Haiwan",eng:"Animal Story"},emoji:"🐦",options:[{text:"tidak tenang / kurang senang",meaning:"uneasy / not peaceful"},{text:"tidur dengan nyenyak",meaning:"sleep soundly"},{text:"bernyanyi dengan merdu",meaning:"sing sweetly"}],answer:"tidak tenang / kurang senang",explanation_bm:'Burung itu "gelisah" kerana ada masalah — ia tidak tenang dan khawatir.'},{id:3,word_bm:"membenci",word_eng:"hate",context_bm:"Dia tidak membenci kawan-kawannya, tapi dia tidak menyukai cara mereka bermain.",context_eng:"He does not hate his friends, but he does not like the way they play.",source:{bm:"Cerita Persahabatan",eng:"Friendship Story"},emoji:"👫",options:[{text:"sangat tidak suka / tidak menyenangi",meaning:"strongly dislike / not enjoy"},{text:"sangat sayang",meaning:"love dearly"},{text:"tidak kenal / tidak tahu",meaning:"not know / unfamiliar"}],answer:"sangat tidak suka / tidak menyenangi",explanation_bm:'Kalimat membanding: dia tidak "membenci" mereka (sangat tidak suka), tetapi tidak menyukai cara mereka bermain.'},{id:4,word_bm:"rajin",word_eng:"diligent",context_bm:"Siti rajin membaca buku setiap hari dan sentiasa mendapat markah terbaik.",context_eng:"Siti is diligent in reading books every day and always gets the best marks.",source:{bm:"Cerita Sekolah",eng:"School Story"},emoji:"📚",options:[{text:"giat / tekun / berusaha keras",meaning:"hardworking / diligent / work hard"},{text:"lamban / malas",meaning:"slow / lazy"},{text:"suka bermain ",meaning:"like to play"}],answer:"giat / tekun / berusaha keras",explanation_bm:'Siti "rajin" — dia membaca setiap hari dan dapat markah terbaik, menunjukkan dia giat dan tekun.'},{id:5,word_bm:"tulus",word_eng:"sincere",context_bm:"Niat tulus Ayah untuk membantu orang yang memerlukan.",context_eng:"Father has a sincere intention to help those in need.",source:{bm:"Cerita Keluarga",eng:"Family Story"},emoji:"💝",options:[{text:"ikhlas / murni / dari hati",meaning:"sincere / pure / from the heart"},{text:"ragu-ragu / tidak pasti",meaning:"doubtful / uncertain"},{text:"sombong / takabur",meaning:"arrogant / proud"}],answer:"ikhlas / murni / dari hati",explanation_bm:'Niat Ayah yang "tulus" bermaksud dia ikhlas dan murni dari hati ingin membantu orang lain.'},{id:6,word_bm:"deras",word_eng:"heavy / strong",context_bm:"Hujan deras turun sehingga jalan-jalan menjadi banjir.",context_eng:"Heavy rain falls so that roads become flooded.",source:{bm:"Cuaca",eng:"Weather"},emoji:"🌧️",options:[{text:"lebat / kuat / banyak",meaning:"heavy / strong / abundant"},{text:"tipis / sedikit",meaning:"light / little"},{text:"panas / menyengat",meaning:"hot / scorching"}],answer:"lebat / kuat / banyak",explanation_bm:'Hujan "deras" — hujannya lebat dan kuat sehingga menyebabkan jalan banjir.'},{id:7,word_bm:"lembut",word_eng:"soft",context_bm:"Suara guru itu sangat lembut dan menyenangkan untuk didengar.",context_eng:"The teacher's voice is very soft and pleasant to hear.",source:{bm:"Sekolah",eng:"School"},emoji:"🎤",options:[{text:"halus / tidak keras / lemah",meaning:"gentle / not loud / soft"},{text:"kasar / bising",meaning:"rough / noisy"},{text:"tinggi / bergurau",meaning:"high / joking"}],answer:"halus / tidak keras / lemah",explanation_bm:'Suara "lembut" bermaksud halus, tidak keras, dan menyenangkan untuk didengarkan.'},{id:8,word_bm:"ceria",word_eng:"cheerful",context_bm:"Setelah menang pertandingan, semua pemain menjadi ceria dan tertawa gembira.",context_eng:"After winning the competition, all the players became cheerful and laughed happily.",source:{bm:"Sukan",eng:"Sports"},emoji:"🎉",options:[{text:"gembira / riang / bersemangat",meaning:"happy / cheerful / spirited"},{text:"sedih / murung",meaning:"sad / gloomy"},{text:"marah / kesal",meaning:"angry / upset"}],answer:"gembira / riang / bersemangat",explanation_bm:'Para pemain menjadi "ceria" — mereka gembira, riang, dan bersemangat selepas menang.'},{id:9,word_bm:"liar",word_eng:"wild",context_bm:"Harimau adalah haiwan liar yang tinggal di hutan belantara.",context_eng:"A tiger is a wild animal that lives in the dense jungle.",source:{bm:"Haiwan",eng:"Animals"},emoji:"🐯",options:[{text:"ganas / liar / hidup di alam semula jadi",meaning:"wild / ferocious / live in nature"},{text:"jinak / berbahaya",meaning:"tame / dangerous"},{text:"kecil / lemah",meaning:"small / weak"}],answer:"ganas / liar / hidup di alam semula jadi",explanation_bm:'Harimau adalah haiwan "liar" — ia ganas, tidak jinak, dan hidup bebas di alam semula jadi.'},{id:10,word_bm:"sempurna",word_eng:"perfect",context_bm:"Walaupun dia melakukan banyak usaha, tiada sesuatu yang sempurna di dunia ini.",context_eng:"Although he tried hard, nothing is perfect in this world.",source:{bm:"Kebijaksanaan",eng:"Wisdom"},emoji:"✨",options:[{text:"tidak ada cacat / tanpa kesalahan",meaning:"flawless / without mistake"},{text:"buruk / jelek",meaning:"bad / poor"},{text:"mudah / ringan",meaning:"easy / light"}],answer:"tidak ada cacat / tanpa kesalahan",explanation_bm:'Sesuatu yang "sempurna" bermaksud tiada cacat, tiada kesalahan, atau tidak lengkap.'},{id:11,word_bm:"ajaib",word_eng:"magical",context_bm:"Cerita dongeng tentang putri ajaib yang mempunyai kekuatan sihir.",context_eng:"A fairy tale about a magical princess who has magical powers.",source:{bm:"Dongeng",eng:"Fairy Tale"},emoji:"✨🧙",options:[{text:"istimewa / penuh keajaiban / aneh",meaning:"special / full of wonder / strange"},{text:"biasa / mudah",meaning:"ordinary / easy"},{text:"ketakutan / mengerikan",meaning:"scary / frightening"}],answer:"istimewa / penuh keajaiban / aneh",explanation_bm:'Putri "ajaib" — dia istimewa, penuh dengan keajaiban, dan mempunyai kekuatan sihir.'},{id:12,word_bm:"waspada",word_eng:"alert",context_bm:"Ibunya memberitahu untuk waspada ketika menyeberang jalan, kerana kenderaan bergerak dengan cepat.",context_eng:"His mother told him to be alert when crossing the road, because vehicles move fast.",source:{bm:"Keselamatan",eng:"Safety"},emoji:"⚠️",options:[{text:"berhati-hati / penuh perhatian / awas",meaning:"be careful / pay attention / alert"},{text:"santai / tidak peduli",meaning:"relaxed / careless"},{text:"cepat / pantas",meaning:"fast / quick"}],answer:"berhati-hati / penuh perhatian / awas",explanation_bm:'Perlu "waspada" — bermaksud perlu berhati-hati, penuh perhatian, dan awas akan bahaya.'}],l=g.length,P="2-2-3-mentafsir-menaakul",q=70;function J({onBack:h,language:n="bm"}){const[o,k]=r.useState(0),[f,d]=r.useState(null),[s,c]=r.useState(!1),[p,w]=r.useState(0),[u,y]=r.useState(!1),{awardCorrect:j,awardWrong:_,completeTopic:v}=K(P),F=r.useRef(!1);r.useEffect(()=>{u&&!F.current&&(F.current=!0,v(p/10,l,q))},[u,p,v]);const e=g[o],S=f===e.answer,B=o/l*100,D=r.useCallback(i=>{s||(R(),d(i),i===e.answer?(b("correct"),j(),w(m=>m+10),N({particleCount:40,spread:55})):(b("incorrect"),_()),c(!0))},[s,e.answer,j,_]),E=r.useCallback(()=>{s&&(o<g.length-1?(k(i=>i+1),d(null),c(!1)):(b("levelup"),N({particleCount:120,spread:70}),y(!0)))},[s,o]),T=r.useCallback(()=>{d(null),c(!1)},[]),z=r.useCallback(()=>{k(0),d(null),c(!1),w(0),y(!1)},[]),W=i=>s?i===e.answer?"correct":i===f?"wrong":"reveal":"",C=n==="bm"?"Kosa Kata Kontekstual":"Contextual Vocabulary";return u?a.jsxs(a.Fragment,{children:[a.jsx("style",{children:$}),a.jsxs("div",{className:"mm-root",children:[a.jsx(A,{onBack:h,language:n,title:C}),a.jsxs("div",{className:"mm-center",children:[a.jsx("div",{style:{fontSize:"clamp(56px, 12vh, 90px)",lineHeight:1},children:"📖"}),a.jsx("h2",{style:{fontFamily:"'Baloo 2', sans-serif",color:t,fontSize:"clamp(24px, 5vh, 36px)",fontWeight:800,margin:0},children:n==="bm"?"Tahniah!":"Well Done!"}),a.jsxs("p",{style:{fontSize:"clamp(16px, 3vh, 21px)",color:"#555",fontWeight:600,margin:"0.6rem 0 1rem"},children:[n==="bm"?"Markah: ":"Score: ",a.jsx("strong",{children:p}),"/",l*10]}),a.jsxs("div",{style:{display:"flex",gap:"0.8rem"},children:[a.jsxs("button",{onClick:z,style:{fontFamily:"'Baloo 2', sans-serif",padding:"0.8rem 1.5rem",background:"#fff",color:"#475569",border:"2px solid #E2E8F0",borderRadius:999,fontSize:"1rem",cursor:"pointer",fontWeight:800},children:["🔄 ",n==="bm"?"Main Semula":"Play Again"]}),a.jsxs("button",{onClick:h,style:{fontFamily:"'Baloo 2', sans-serif",padding:"0.8rem 1.5rem",background:`linear-gradient(180deg, ${t}cc, ${t})`,color:"#fff",border:"none",borderRadius:999,fontSize:"1rem",cursor:"pointer",fontWeight:800,boxShadow:`0 4px 0 ${x}`},children:["← ",n==="bm"?"Kembali":"Back"]})]})]})]})]}):a.jsxs(a.Fragment,{children:[a.jsx("style",{children:$}),a.jsxs("div",{className:"mm-root",children:[a.jsx(A,{onBack:h,language:n,title:C}),a.jsxs("div",{className:"mm-body",children:[a.jsxs("div",{className:"mm-stats",children:[a.jsx("span",{className:"mm-pill",children:n==="bm"?`Perkataan ${o+1}/${l}`:`Word ${o+1}/${l}`}),a.jsxs("span",{className:"mm-pill",style:{background:"#E8F4FD",color:x,borderColor:`${t}66`},children:["⭐ ",p]})]}),a.jsx("div",{className:"mm-bar-wrap",children:a.jsx("div",{className:"mm-bar-fill",style:{width:`${B}%`}})}),a.jsxs("div",{className:"mm-scroll",children:[a.jsxs("div",{className:"mm-card",children:[a.jsxs("div",{className:"mm-card-header",children:[a.jsx("span",{style:{fontSize:"1.3rem"},children:e.emoji}),a.jsx("span",{className:"mm-card-title",children:n==="bm"?e.source.bm:e.source.eng})]}),a.jsx("p",{className:"mm-context",children:e.context_bm.split(e.word_bm).map((i,m)=>a.jsxs(H.Fragment,{children:[i,m<e.context_bm.split(e.word_bm).length-1&&a.jsx("span",{className:"mm-word-highlight",children:e.word_bm})]},m))})]}),a.jsxs("div",{className:"mm-q-card",children:[a.jsxs("div",{className:"mm-q-header",children:[a.jsx("span",{className:"mm-q-num",children:"?"}),a.jsxs("p",{className:"mm-q-text",children:[n==="bm"?"Apakah maksud ":"What does ",a.jsx("span",{style:{background:"#FFF9C4",color:"#F57F17",fontWeight:"bold",padding:"0.15rem 0.3rem",borderRadius:"3px"},children:e.word_bm}),n==="bm"?"?":" mean?"]})]}),a.jsx("div",{className:"mm-options",children:e.options.map((i,m)=>a.jsx("button",{onClick:()=>D(i.text),disabled:s,className:`mm-opt ${W(i.text)}`,children:i.text},m))})]}),s&&a.jsxs("div",{className:`mm-feedback ${S?"correct":"wrong"}`,children:[a.jsx("div",{style:{marginBottom:"0.4rem"},children:S?n==="bm"?"✅ Betul!":"✅ Correct!":n==="bm"?`❌ Tidak betul. Jawapan: ${e.answer}`:`❌ Wrong. Answer: ${e.answer}`}),a.jsx("div",{style:{fontSize:"0.85rem",fontWeight:"normal",opacity:.9},children:e.explanation_bm})]})]})]}),a.jsxs("div",{className:"mm-footer",children:[a.jsxs("button",{onClick:T,className:"mm-btn secondary",style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"0.3rem"},children:[a.jsx(I,{size:16}),n==="bm"?"Semula":"Reset"]}),a.jsx("button",{onClick:E,disabled:!s,className:"mm-btn primary",children:o<g.length-1?n==="bm"?"Perkataan Seterusnya →":"Next Word →":n==="bm"?"Selesai ✓":"Finish ✓"})]})]})]})}export{J as default};
