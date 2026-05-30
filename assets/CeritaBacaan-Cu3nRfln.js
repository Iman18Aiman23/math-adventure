import{r,i as s,j as a,B as b,f as u,h}from"./index-D9md4qG0.js";const i=[{id:1,title:{bm:"Ani dan Kucing Kecil",eng:"Ani and the Little Cat"},emoji:"🐱",text_bm:`Malam itu, Ani mendengar bunyi "miu miu" di luar rumah.

Ani keluar dan melihat seekor kucing kecil yang basah dan kedinginan.

"Oh tidak! Kucing ini memerlukan bantuan," kata Ani.

Ani membawa kucing itu masuk ke rumah. Dia memberikan selimut hangat dan makanan untuk kucing.

Ibu Ani senyum. "Ani baik hati," kata ibu.

Keesokan harinya, kucing itu sudah sihat. Kucing itu menjadi teman Ani.`,value:{bm:"Belas Kasihan",eng:"Compassion"}},{id:2,title:{bm:"Reza Minta Maaf",eng:"Reza Says Sorry"},emoji:"🤝",text_bm:`Reza mengambil mainan Tuti tanpa izin.

"Reza! Itu mainanku!" kata Tuti.

Reza merasa sedih. Dia tahu dia buat salah.

Reza pergi kepada Tuti dan berkata, "Maaf ya Tuti. Boleh saya bermain sama-sama?"

Tuti tersenyum. "Ya, mari kita bermain bersama."

Mereka bermain dengan gembira. Reza dan Tuti tetap kawan baik.`,value:{bm:"Jujur & Minta Maaf",eng:"Honesty & Apology"}},{id:3,title:{bm:"Budi Membantu Ayah",eng:"Budi Helps Dad"},emoji:"🌱",text_bm:`Ayah Budi menanam pokok di halaman.

"Boleh saya bantu, Ayah?" tanya Budi.

"Baik, Budi. Mari kita tanam bersama," kata ayah.

Budi dan ayah menggali tanah. Mereka meletakkan benih dalam tanah.

"Ini kerja keras, Ayah," kata Budi.

"Ya, Budi. Kita harus bekerja keras. Nanti pokok ini akan tumbuh besar dan hijau," kata ayah.

Budi senang membantu ayah. Dia bangga dengan dirinya.`,value:{bm:"Rajin & Membantu",eng:"Hardworking & Helpful"}},{id:4,title:{bm:"Siti Berkongsi Makanan",eng:"Siti Shares Her Food"},emoji:"🍎",text_bm:`Ibu Siti memberi bekal nasi dan buah-buahan untuk sekolah.

Siti makan separuh makanannya.

Dia lihat kawannya, Amir, tidak membawa bekal.

"Amir, kenapa tidak ada makanan?" tanya Siti.

"Ibu saya terlupa," kata Amir dengan sedih.

Siti berkongsi makanannya dengan Amir. "Ambil, Amir. Kita makan bersama-sama."

Amir tersenyum lebar. "Terima kasih, Siti!"

Mereka makan dan ketawa bersama. Mereka teman yang baik.`,value:{bm:"Berkongsi & Prihatin",eng:"Sharing & Care"}}];function g({onBack:o,language:n="bm"}){const[e,m]=r.useState(0),t=i[e],d=r.useCallback(()=>{e>0&&(s(),m(e-1))},[e]),l=r.useCallback(()=>{e<i.length-1&&(s(),m(e+1))},[e]);return a.jsxs("div",{style:{height:"100%",display:"flex",flexDirection:"column",background:"#D0F0FF",overflow:"hidden"},children:[a.jsx(b,{onClick:o}),a.jsxs("div",{style:{flexShrink:0,padding:"3.5rem 1rem 0.75rem",maxWidth:"600px",width:"100%",alignSelf:"center",boxSizing:"border-box"},children:[a.jsxs("div",{style:{textAlign:"center",marginBottom:"0.85rem"},children:[a.jsx("h1",{style:{color:"#1CB0F6",marginBottom:"0.25rem",fontSize:"1.6rem"},children:n==="bm"?"Cerita Bacaan":"Story Reading"}),a.jsx("p",{style:{color:"#888",fontSize:"0.9rem"},children:n==="bm"?"Baca cerita-cerita yang menarik":"Read interesting stories"})]}),a.jsx("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0.65rem 1rem",background:"rgba(28,176,246,0.12)",borderRadius:"10px"},children:a.jsx("span",{style:{color:"#666",fontSize:"0.9rem"},children:n==="bm"?`Cerita ${e+1}/${i.length}`:`Story ${e+1}/${i.length}`})})]}),a.jsx("div",{style:{flex:1,overflowY:"auto",padding:"0.75rem 1rem 1rem",maxWidth:"600px",width:"100%",alignSelf:"center",boxSizing:"border-box"},children:a.jsxs("div",{style:{background:"#FFF",borderRadius:"12px",border:"2px solid #1CB0F6",padding:"1.1rem 1.25rem",marginBottom:"1rem"},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem",marginBottom:"0.75rem"},children:[a.jsx("span",{style:{fontSize:"2rem"},children:t.emoji}),a.jsxs("div",{children:[a.jsx("span",{style:{fontWeight:800,color:"#1CB0F6",fontSize:"1.1rem",display:"block"},children:n==="bm"?t.title.bm:t.title.eng}),a.jsx("span",{style:{fontSize:"0.8rem",background:"rgba(28,176,246,0.12)",color:"#1CB0F6",padding:"0.15rem 0.5rem",borderRadius:"6px",fontWeight:700,display:"inline-block",marginTop:"0.3rem"},children:n==="bm"?t.value.bm:t.value.eng})]})]}),a.jsx("p",{style:{fontSize:"1rem",color:"#333",lineHeight:1.8,margin:"1rem 0 0",whiteSpace:"pre-line"},children:t.text_bm})]})}),a.jsxs("div",{style:{flexShrink:0,background:"#D0F0FF",borderTop:"2px solid rgba(28,176,246,0.25)",padding:"0.75rem 1rem",display:"flex",gap:"0.75rem"},children:[a.jsxs("button",{onClick:d,disabled:e===0,style:{flex:1,padding:"0.75rem",background:e>0?"#1CB0F6":"#BDBDBD",color:"white",border:"none",borderRadius:"10px",cursor:e>0?"pointer":"not-allowed",fontWeight:"bold",fontSize:"1rem",boxShadow:e>0?"0 4px 0 #0B8DC0":"none",display:"flex",alignItems:"center",justifyContent:"center",gap:"0.4rem",transition:"background 0.2s"},children:[a.jsx(u,{size:18}),n==="bm"?"Sebelum":"Back"]}),a.jsxs("button",{onClick:l,disabled:e===i.length-1,style:{flex:1,padding:"0.75rem",background:e<i.length-1?"#1CB0F6":"#BDBDBD",color:"white",border:"none",borderRadius:"10px",cursor:e<i.length-1?"pointer":"not-allowed",fontWeight:"bold",fontSize:"1rem",boxShadow:e<i.length-1?"0 4px 0 #0B8DC0":"none",display:"flex",alignItems:"center",justifyContent:"center",gap:"0.4rem",transition:"background 0.2s"},children:[n==="bm"?"Seterus":"Next",a.jsx(h,{size:18})]})]})]})}export{g as default};
