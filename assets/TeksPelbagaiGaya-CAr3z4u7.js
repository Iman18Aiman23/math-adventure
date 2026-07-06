import{r as i,e as K,p as x,j as a}from"./index-YCInXYg5.js";import{c as D}from"./confetti.module-oQXWb4Lk.js";import{B as P}from"./BMHeader-B5cOc9J_.js";import{u as H}from"./useTopicGamification-I1kCte-J.js";import{R as Q}from"./refresh-cw-J9zlOc9a.js";import"./useGamification-g-vGaz2S.js";function J(u){return[...u].sort(()=>Math.random()-.5)}const t="#1CB0F6",y="#0B8DC0",N=`
  .tp-root {
    height: 100dvh; overflow: hidden;
    background:
      radial-gradient(ellipse 70% 50% at 18% 0%, #D6F0FF 0%, transparent 60%),
      radial-gradient(ellipse 60% 45% at 88% 100%, #B0E0FF 0%, transparent 65%),
      linear-gradient(180deg, #EBF8FF 0%, #D0F0FF 55%, #B5E5FF 100%);
    font-family: 'Fredoka', system-ui, sans-serif;
    display: flex; flex-direction: column;
  }

  .tp-body {
    flex: 1; min-height: 0;
    display: flex; flex-direction: column; align-items: center;
    width: 100%; max-width: 560px;
    margin: 0 auto;
    padding: clamp(8px, 1.6vh, 12px) clamp(14px, 3.5vw, 28px);
  }

  .tp-stats {
    flex-shrink: 0; width: 100%;
    display: flex; align-items: center; justify-content: space-between;
    gap: 8px; margin-bottom: clamp(10px, 1.6vh, 14px);
  }

  .tp-pill {
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(11px, 2vh, 13px);
    border-radius: 999px;
    padding: clamp(3px, 0.7vh, 5px) clamp(10px, 2.4vw, 14px);
    white-space: nowrap;
    background: #FFFFFFCC; color: #1B6B99; border: 1.5px solid ${t}44;
  }

  .tp-bar-wrap {
    flex-shrink: 0; width: 100%;
    background: #90D4FF; border-radius: 999px;
    height: clamp(6px, 1.2vh, 9px); overflow: hidden;
    margin-bottom: clamp(12px, 2vh, 18px);
  }

  .tp-bar-fill {
    background: linear-gradient(90deg, ${t}, #4EC5FF);
    height: 100%; border-radius: 999px;
    transition: width 0.3s;
  }

  .tp-scroll {
    flex: 1; min-height: 0;
    overflow-y: auto;
    width: 100%;
    padding-bottom: clamp(12px, 2vh, 16px);
  }

  .tp-card {
    background: #FFF; border-radius: 14px;
    border: 2px solid ${t};
    padding: clamp(14px, 2.4vh, 20px) clamp(14px, 3vw, 24px);
    margin-bottom: 1rem;
  }

  .tp-card-header {
    display: flex; align-items: center; gap: 0.5rem;
    margin-bottom: 0.6rem;
  }

  .tp-card-title {
    font-weight: 800; font-size: clamp(13px, 2.4vh, 16px);
    color: ${t};
  }

  .tp-passage-text {
    font-size: clamp(13px, 2.2vh, 15px);
    color: #333; line-height: 1.75;
    margin: 0; white-space: pre-line;
  }

  .tp-q-card {
    background: #FFF; border-radius: 14px;
    border: 2px solid ${t}66;
    padding: clamp(12px, 2vh, 18px) clamp(12px, 2.5vw, 20px);
    margin-bottom: 1rem;
  }

  .tp-q-header {
    display: flex; align-items: center; gap: 0.5rem;
    margin-bottom: 0.75rem;
  }

  .tp-q-num {
    background: ${t}; color: #fff;
    border-radius: 50%; width: 26px; height: 26px;
    display: flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: 0.8rem; flex-shrink: 0;
  }

  .tp-q-text {
    margin: 0; font-weight: 700;
    font-size: clamp(13px, 2.2vh, 15px);
    color: #333; line-height: 1.4;
  }

  .tp-options {
    display: flex; flex-direction: column; gap: 0.55rem;
  }

  .tp-opt {
    padding: clamp(10px, 1.6vh, 14px) clamp(12px, 2vw, 16px);
    background: #FFF; color: #333;
    border: 2px solid ${t}; border-radius: 12px;
    cursor: pointer; font-weight: 700;
    font-size: clamp(13px, 2.2vh, 15px);
    text-align: left; transition: all 0.2s;
    font-family: 'Fredoka', system-ui, sans-serif;
  }

  .tp-opt:disabled { cursor: default; }

  .tp-opt.correct { background: #4CAF50; border-color: #388E3C; color: #fff; }
  .tp-opt.wrong { background: #FF6B6B; border-color: #D32F2F; color: #fff; }
  .tp-opt.reveal { background: #F5F5F5; border-color: #DDD; color: #AAA; }

  .tp-feedback {
    padding: clamp(10px, 1.6vh, 14px) clamp(14px, 2.4vw, 18px);
    border-radius: 10px; font-weight: 700;
    font-size: clamp(12px, 2vh, 14px);
    margin-bottom: 1rem;
  }

  .tp-feedback.correct { background: #D4EDDA; color: #155724; }
  .tp-feedback.wrong { background: #F8D7DA; color: #721C24; }

  .tp-footer {
    flex-shrink: 0;
    display: flex; gap: clamp(8px, 2vw, 12px);
    width: 100%; max-width: 560px;
    margin: 0 auto;
    padding: clamp(10px, 1.6vh, 14px) clamp(14px, 3.5vw, 28px) clamp(8px, 1.6vh, 12px);
    border-top: 2px solid ${t}33;
  }

  .tp-btn {
    flex: 1; min-width: 0;
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(13px, 2.4vh, 16px);
    border: none; border-radius: 14px; cursor: pointer;
    padding: clamp(10px, 2vh, 14px) 12px;
    transition: transform .12s ease;
  }

  .tp-btn:active { transform: translateY(2px); }
  .tp-btn:disabled { opacity: 0.45; cursor: not-allowed; }

  .tp-btn.primary {
    color: #fff;
    background: linear-gradient(180deg, ${t}cc, ${t});
    box-shadow: 0 4px 0 ${y};
  }

  .tp-btn.secondary {
    color: #64748B; background: #F1F5F9;
    box-shadow: 0 4px 0 #CBD5E1;
  }

  .tp-center {
    flex: 1; min-height: 0;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: clamp(16px, 2.4vh, 20px); padding: 16px; text-align: center;
  }
`,p=[{id:1,title:{bm:"Hari Sukan di Sekolah",eng:"Sports Day at School"},emoji:"🏃",text_bm:`Hari Jumaat adalah hari sukan di sekolah kami. Semua murid berkumpul di padang yang luas. Mereka bermain pelbagai jenis sukan seperti lari, lompat jauh, dan bola sepak.

Kelas Dua A memenangkan pertandingan lumba lari. Semua murid di kelas itu sangat gembira dan bersorak-sorai. Guru mereka memberikan hadiah kepada kumpulan yang menang. Hadiah itu adalah buku tulis dan pen warna-warni.`,translation:"Friday is sports day at our school. All the students gathered in a large field. They played various types of sports like running, long jump, and football. Class Two A won the relay race competition. All the students in that class were very happy and cheered. Their teacher gave prizes to the winning group. The prizes were notebooks and colorful pens.",questions:[{question_bm:"Bilakah hari sukan di sekolah?",question_eng:"When is sports day at school?",options:["Hari Jumaat","Hari Isnin","Hari Rabu"],answer:"Hari Jumaat",explanation_bm:'Petikan menyebut: "Hari Jumaat adalah hari sukan di sekolah kami."'},{question_bm:"Apakah jenis sukan yang dimainkan murid-murid?",question_eng:"What types of sports did the students play?",options:["Lari, lompat jauh, dan bola sepak","Bola voli dan badminton","Renang dan bola basket"],answer:"Lari, lompat jauh, dan bola sepak",explanation_bm:'Petikan menyebut: "Mereka bermain pelbagai jenis sukan seperti lari, lompat jauh, dan bola sepak."'},{question_bm:"Kelas manakah yang memenangkan pertandingan berlari?",question_eng:"Which class won the race?",options:["Kelas Dua A","Kelas Dua B","Kelas Dua C"],answer:"Kelas Dua A",explanation_bm:'Petikan menyebut: "Kelas Dua A memenangkan pertandingan berlari."'},{question_bm:"Apakah hadiah yang diberikan kepada kumpulan yang menang?",question_eng:"What was the prize given to the winning group?",options:["Buku tulis dan pen warna-warni","Buku cerita dan pensel","Buku aktiviti dan krayon"],answer:"Buku tulis dan pen warna-warni",explanation_bm:'Petikan menyebut: "Hadiah itu adalah buku tulis dan pen warna-warni."'}]},{id:2,title:{bm:"Kunjungan ke Kebun Binatang",eng:"Visit to the Zoo"},emoji:"🦁",text_bm:`Minggu lalu, keluarga Ali pergi ke kebun binatang. Mereka melihat banyak jenis haiwan yang menarik. Ada gajah yang sangat besar, harimau yang bergaris, dan monyet yang ceria melompat-lompat.

Ali paling menyukai bahagian ular dan biawak. Di sana ada ular sawa yang panjang dan biawak yang besar. Ayah Ali menjelaskan bahawa ular sawa itu memakan daging dan haiwan kecil yang lain. Selepas itu, mereka membeli makanan untuk burung-burung di kawasan burung. Ali merasa sangat senang melakukan perkara itu.`,translation:"Last week, Ali's family went to the zoo. They saw many types of interesting animals. There was a very big elephant, a striped tiger, and cheerful monkeys jumping around. Ali liked the reptile section the most. There was a long python and a big monitor lizard. Ali's father explained that the python was herbivorous and ate plants. After that, they bought food for the birds in the bird section. Ali felt very happy doing that.",questions:[{question_bm:"Ke mana keluarga Ali pergi minggu lalu?",question_eng:"Where did Ali's family go last week?",options:["Kebun binatang","Taman hiburan","Pantai"],answer:"Kebun binatang",explanation_bm:'Petikan menyebut: "Minggu lalu, keluarga Ali pergi ke kebun binatang."'},{question_bm:"Bahagian manakah yang paling disukai oleh Ali?",question_eng:"Which section did Ali like the most?",options:["Bahagian ular dan biawak","Bahagian burung","Bahagian mamalia"],answer:"Bahagian ular dan biawak",explanation_bm:'Petikan menyebut: "Ali paling menyukai bahagian ular dan biawak."'},{question_bm:"Apakah makanan ular sawa?",question_eng:"What does a python eat?",options:["Daging dan haiwan kecil","Tumbuhan","Ikan sahaja"],answer:"Daging dan haiwan kecil",explanation_bm:'Petikan menyebut: "Ayah Ali menjelaskan bahawa ular sawa itu memakan daging dan haiwan kecil yang lain."'},{question_bm:"Apa yang dilakukan keluarga Ali di kawasan burung?",question_eng:"What did Ali's family do in the bird section?",options:["Membeli makanan untuk burung-burung","Mengambil gambar burung","Mendengarkan nyanyian burung"],answer:"Membeli makanan untuk burung-burung",explanation_bm:'Petikan menyebut: "Mereka membeli makanan untuk burung-burung di kawasan burung."'}]},{id:3,title:{bm:"Musim Hujan Tiba",eng:"The Rainy Season Arrives"},emoji:"🌧️",text_bm:`Musim hujan telah tiba. Hujan turun dengan lebat setiap hari. Jalan-jalan menjadi berair dan berlumpur. Banyak bunga dan tumbuhan di taman menjadi lebih hijau dan subur.

Ibu Siti memberitahu kepada anaknya untuk membawa payung apabila pergi ke sekolah. Siti juga perlu mengenakan kasut yang kuat dan tahan air. Walaupun cuaca hujan, sekolah tetap dibuka. Para murid tetap pergi ke sekolah dan belajar dengan bersemangat. Selepas pulang dari sekolah, Siti suka duduk di rumah dan membaca buku sambil mendengarkan bunyi hujan.`,translation:"The rainy season has arrived. It rains heavily every day. The roads become wet and muddy. Many flowers and plants in the garden become greener and more lush. Siti's mother told her to bring an umbrella when going to school. Siti also needs to wear strong and waterproof shoes. Although the weather is rainy, school remains open. Students still go to school and study enthusiastically. After coming home from school, Siti likes to sit at home and read books while listening to the sound of rain.",questions:[{question_bm:"Apakah yang telah tiba?",question_eng:"What has arrived?",options:["Musim hujan","Musim panas","Musim sejuk"],answer:"Musim hujan",explanation_bm:'Petikan menyebut: "Musim hujan telah tiba."'},{question_bm:"Apa yang perlu dibawa Siti ke sekolah semasa musim hujan?",question_eng:"What does Siti need to bring to school during the rainy season?",options:["Payung","Payung dan kasut tahan air","Jaket dan topi"],answer:"Payung dan kasut tahan air",explanation_bm:'Petikan menyebut: "Ibu Siti memberitahu kepada anaknya untuk membawa payung apabila pergi ke sekolah. Siti juga perlu mengenakan kasut yang kuat dan tahan air."'},{question_bm:"Adakah sekolah ditutup semasa musim hujan?",question_eng:"Is the school closed during the rainy season?",options:["Ya, sekolah ditutup","Tidak, sekolah tetap dibuka","Kadang-kadang ditutup"],answer:"Tidak, sekolah tetap dibuka",explanation_bm:'Petikan menyebut: "Walaupun cuaca hujan, sekolah tetap dibuka."'},{question_bm:"Apa yang disuka oleh Siti lakukan selepas pulang dari sekolah?",question_eng:"What does Siti like to do after coming home from school?",options:["Bermain di luar","Duduk di rumah dan membaca buku sambil mendengarkan bunyi hujan","Menonton televisyen"],answer:"Duduk di rumah dan membaca buku sambil mendengarkan bunyi hujan",explanation_bm:'Petikan menyebut: "Selepas pulang dari sekolah, Siti suka duduk di rumah dan membaca buku sambil mendengarkan bunyi hujan."'}]}],f=p.reduce((u,e)=>u+e.questions.length,0),L="2-2-2-teks-pelbagai",O=70;function ea({onBack:u,language:e="bm"}){const[o,w]=i.useState(0),[l,g]=i.useState(0),[j,h]=i.useState(null),[d,c]=i.useState(!1),[b,v]=i.useState(0),[k,S]=i.useState(!1),{awardCorrect:A,awardWrong:F,completeTopic:q}=H(L),_=i.useRef(!1);i.useEffect(()=>{k&&!_.current&&(_.current=!0,q(b/10,f,O))},[k,b,q]);const r=p[o],s=r.questions[l],B=j===s.answer,T=p.slice(0,o).reduce((n,m)=>n+m.questions.length,0)+l+1,$=(p.slice(0,o).reduce((n,m)=>n+m.questions.length,0)+l)/f*100,M=i.useMemo(()=>J(s.options),[o,l,s]),z=i.useCallback(n=>{d||(K(),h(n),n===s.answer?(x("correct"),A(),v(m=>m+10),D({particleCount:40,spread:55})):(x("incorrect"),F()),c(!0))},[d,s.answer,A,F]),W=i.useCallback(()=>{d&&(l<r.questions.length-1?(g(n=>n+1),h(null),c(!1)):o<p.length-1?(w(n=>n+1),g(0),h(null),c(!1)):(x("levelup"),D({particleCount:120,spread:70}),S(!0)))},[d,l,o,r.questions.length]),E=i.useCallback(()=>{h(null),c(!1)},[]),R=i.useCallback(()=>{w(0),g(0),h(null),c(!1),v(0),S(!1)},[]),I=n=>d?n===s.answer?"correct":n===j?"wrong":"reveal":"",C=e==="bm"?"Bacaan Pemahaman":"Reading Comprehension";return k?a.jsxs(a.Fragment,{children:[a.jsx("style",{children:N}),a.jsxs("div",{className:"tp-root",children:[a.jsx(P,{onBack:u,language:e,title:C}),a.jsxs("div",{className:"tp-center",children:[a.jsx("div",{style:{fontSize:"clamp(56px, 12vh, 90px)",lineHeight:1},children:"📚"}),a.jsx("h2",{style:{fontFamily:"'Baloo 2', sans-serif",color:t,fontSize:"clamp(24px, 5vh, 36px)",fontWeight:800,margin:0},children:e==="bm"?"Tahniah!":"Well Done!"}),a.jsxs("p",{style:{fontSize:"clamp(16px, 3vh, 21px)",color:"#555",fontWeight:600,margin:"0.6rem 0 1rem"},children:[e==="bm"?"Markah: ":"Score: ",a.jsx("strong",{children:b}),"/",f*10]}),a.jsxs("div",{style:{display:"flex",gap:"0.8rem"},children:[a.jsxs("button",{onClick:R,style:{fontFamily:"'Baloo 2', sans-serif",padding:"0.8rem 1.5rem",background:"#fff",color:"#475569",border:"2px solid #E2E8F0",borderRadius:999,fontSize:"1rem",cursor:"pointer",fontWeight:800},children:["🔄 ",e==="bm"?"Main Semula":"Play Again"]}),a.jsxs("button",{onClick:u,style:{fontFamily:"'Baloo 2', sans-serif",padding:"0.8rem 1.5rem",background:`linear-gradient(180deg, ${t}cc, ${t})`,color:"#fff",border:"none",borderRadius:999,fontSize:"1rem",cursor:"pointer",fontWeight:800,boxShadow:`0 4px 0 ${y}`},children:["← ",e==="bm"?"Kembali":"Back"]})]})]})]})]}):a.jsxs(a.Fragment,{children:[a.jsx("style",{children:N}),a.jsxs("div",{className:"tp-root",children:[a.jsx(P,{onBack:u,language:e,title:C}),a.jsxs("div",{className:"tp-body",children:[a.jsxs("div",{className:"tp-stats",children:[a.jsx("span",{className:"tp-pill",children:e==="bm"?`Petikan ${o+1}/${p.length} — S${l+1}/${r.questions.length}`:`P${o+1}/${p.length} — Q${l+1}/${r.questions.length}`}),a.jsxs("span",{className:"tp-pill",style:{background:"#E8F4FD",color:y,borderColor:`${t}66`},children:["⭐ ",b]})]}),a.jsx("div",{className:"tp-bar-wrap",children:a.jsx("div",{className:"tp-bar-fill",style:{width:`${$}%`}})}),a.jsxs("div",{className:"tp-scroll",children:[a.jsxs("div",{className:"tp-card",children:[a.jsxs("div",{className:"tp-card-header",children:[a.jsx("span",{style:{fontSize:"1.3rem"},children:r.emoji}),a.jsx("span",{className:"tp-card-title",children:e==="bm"?r.title.bm:r.title.eng}),a.jsx("span",{style:{marginLeft:"auto",fontSize:"0.72rem",background:`${t}1e`,color:t,padding:"0.15rem 0.5rem",borderRadius:"6px",fontWeight:700,whiteSpace:"nowrap"},children:e==="bm"?"Baca Petikan":"Read Passage"})]}),a.jsx("p",{className:"tp-passage-text",children:r.text_bm})]}),a.jsxs("div",{className:"tp-q-card",children:[a.jsxs("div",{className:"tp-q-header",children:[a.jsx("span",{className:"tp-q-num",children:T}),a.jsx("p",{className:"tp-q-text",children:e==="bm"?s.question_bm:s.question_eng})]}),a.jsx("div",{className:"tp-options",children:M.map((n,m)=>a.jsx("button",{onClick:()=>z(n),disabled:d,className:`tp-opt ${I(n)}`,children:n},m))})]}),d&&a.jsxs("div",{className:`tp-feedback ${B?"correct":"wrong"}`,children:[a.jsx("div",{style:{marginBottom:"0.4rem"},children:B?e==="bm"?"✅ Betul!":"✅ Correct!":e==="bm"?`❌ Tidak betul. Jawapan: ${s.answer}`:`❌ Wrong. Answer: ${s.answer}`}),a.jsx("div",{style:{fontSize:"0.85rem",fontWeight:"normal",opacity:.9},children:s.explanation_bm})]})]})]}),a.jsxs("div",{className:"tp-footer",children:[a.jsxs("button",{onClick:E,className:"tp-btn secondary",style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"0.3rem"},children:[a.jsx(Q,{size:16}),e==="bm"?"Semula":"Reset"]}),a.jsx("button",{onClick:W,disabled:!d,className:"tp-btn primary",children:l<r.questions.length-1?e==="bm"?"Soalan Seterusnya →":"Next Question →":o<p.length-1?e==="bm"?"Petikan Seterusnya →":"Next Passage →":e==="bm"?"Selesai ✓":"Finish ✓"})]})]})]})}export{ea as default};
