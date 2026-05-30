import React from 'react';

/**
 * Per-game "screen" artwork for the Grade 2 (age-8) game cards.
 * Mirrors Grade1Screens.jsx — inner art for the shared robot-head face screen
 * (EEGameRobot, frames are pillar-based & reused across ages), 200×200 space,
 * screen at x38 y52 w124 h96. Face colours: reading=orange, speaking=pink,
 * jawi=green, math=purple → reading/speaking use cool/white, jawi/math white/bright.
 * No SVG <filter>. Helpers local so this file exports data only.
 */

const jawiFont = "'Amiri',serif";

const spark = (
  <>
    <polygon points="50,60 52,64 56,66 52,68 50,72 48,68 44,66 48,64" fill="#FFEB3B" opacity="0.8" />
    <polygon points="150,60 152,64 156,66 152,68 150,72 148,68 144,66 148,64" fill="#FFEB3B" opacity="0.6" />
  </>
);

// Glossy rounded letter/number block. vCenter centres glyph; dy nudges it.
function blk({ x, y, w = 38, h = 40, top, deep, t, fs = 24, font = "'Baloo 2','Comic Sans MS',sans-serif", textFill = '#fff', vCenter = false, dy = 0 }) {
  return (
    <g key={`blk-${x}-${y}-${t}`}>
      <rect x={x} y={y} width={w} height={h} rx="6" fill={top} stroke={deep} strokeWidth="2" />
      <rect x={x} y={y} width={w} height={h / 4} rx="6" fill="rgba(255,255,255,.45)" />
      <text x={x + w / 2} y={(vCenter ? y + h / 2 : y + h * 0.72) + dy} textAnchor="middle" dominantBaseline={vCenter ? 'central' : 'auto'} fontFamily={font} fontWeight="800" fontSize={fs} fill={textFill}>{t}</text>
    </g>
  );
}

/* ════════════════ READING (Membaca) — orange face, cool art ════════════════ */

/* Kosa Kata Kontekstual — a highlighted word inside a line of text. */
const SKosaKata = (
  <g transform="translate(0 6)">
    <rect x="58" y="64" width="84" height="56" rx="6" fill="#FFFFFF" stroke="#C8651A" strokeWidth="2" />
    <line x1="68" y1="76" x2="132" y2="76" stroke="#FFB36B" strokeWidth="3" strokeLinecap="round" />
    <rect x="68" y="86" width="46" height="14" rx="4" fill="#4FC3F7" />
    <line x1="120" y1="93" x2="132" y2="93" stroke="#FFB36B" strokeWidth="3" strokeLinecap="round" />
    <line x1="68" y1="110" x2="124" y2="110" stroke="#FFB36B" strokeWidth="3" strokeLinecap="round" />
    {spark}
  </g>
);

/* Bacaan Pemahaman — a page of text with a question badge. */
const SBacaanPemahaman = (
  <g transform="translate(0 6)">
    <rect x="54" y="62" width="76" height="58" rx="6" fill="#FFFFFF" stroke="#C8651A" strokeWidth="2" />
    <line x1="64" y1="74" x2="120" y2="74" stroke="#FFB36B" strokeWidth="3" strokeLinecap="round" />
    <line x1="64" y1="86" x2="120" y2="86" stroke="#FFB36B" strokeWidth="3" strokeLinecap="round" />
    <line x1="64" y1="98" x2="104" y2="98" stroke="#FFB36B" strokeWidth="3" strokeLinecap="round" />
    <circle cx="128" cy="108" r="14" fill="#4FC3F7" stroke="#01579B" strokeWidth="2" />
    <text x="128" y="108" textAnchor="middle" dominantBaseline="central" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="16" fill="#FFFFFF">?</text>
    {spark}
  </g>
);

/* Cerita Bacaan — an open story book. */
const SCeritaBacaan = (
  <g transform="translate(0 8)">
    <path d="M100 72 Q80 64 60 70 L60 110 Q80 104 100 112 Z" fill="#FFFFFF" stroke="#C8651A" strokeWidth="2" strokeLinejoin="round" />
    <path d="M100 72 Q120 64 140 70 L140 110 Q120 104 100 112 Z" fill="#FFF3E0" stroke="#C8651A" strokeWidth="2" strokeLinejoin="round" />
    <line x1="100" y1="72" x2="100" y2="112" stroke="#C8651A" strokeWidth="2" />
    <line x1="68" y1="82" x2="92" y2="80" stroke="#FFB36B" strokeWidth="2" strokeLinecap="round" />
    <line x1="68" y1="92" x2="92" y2="90" stroke="#FFB36B" strokeWidth="2" strokeLinecap="round" />
    <line x1="108" y1="80" x2="132" y2="82" stroke="#FFB36B" strokeWidth="2" strokeLinecap="round" />
    <line x1="108" y1="92" x2="132" y2="94" stroke="#FFB36B" strokeWidth="2" strokeLinecap="round" />
    {spark}
  </g>
);

/* Pengenalan Nilai — a heart (moral values). */
const SPengenalanNilai = (
  <g transform="translate(0 4)">
    <path d="M100 116 C68 94 62 76 76 68 C87 62 97 70 100 78 C103 70 113 62 124 68 C138 76 132 94 100 116 Z" fill="#FFFFFF" stroke="#C8651A" strokeWidth="2" strokeLinejoin="round" />
    <ellipse cx="86" cy="80" rx="5" ry="8" fill="#FFE0C5" opacity="0.7" transform="rotate(-20 86 80)" />
    {spark}
  </g>
);

/* Pantun Bacaan — a 4-line verse on a page. */
const SPantunBacaan = (
  <g transform="translate(0 6)">
    <rect x="60" y="62" width="80" height="58" rx="6" fill="#FFFFFF" stroke="#C8651A" strokeWidth="2" />
    <line x1="70" y1="74" x2="130" y2="74" stroke="#4FC3F7" strokeWidth="3" strokeLinecap="round" />
    <line x1="70" y1="86" x2="130" y2="86" stroke="#9575CD" strokeWidth="3" strokeLinecap="round" />
    <line x1="70" y1="98" x2="130" y2="98" stroke="#4FC3F7" strokeWidth="3" strokeLinecap="round" />
    <line x1="70" y1="110" x2="130" y2="110" stroke="#9575CD" strokeWidth="3" strokeLinecap="round" />
    {spark}
  </g>
);

/* ════════════════ SPEAKING (Bertutur) — pink face, cool art ════════════════ */

/* Lafaz Pantun — a microphone (reciting). */
const SLafazPantun = (
  <g transform="translate(0 4)">
    <rect x="88" y="60" width="24" height="40" rx="12" fill="#FFFFFF" stroke="#D94E86" strokeWidth="2" />
    <line x1="95" y1="70" x2="105" y2="70" stroke="#D94E86" strokeWidth="1.5" />
    <line x1="95" y1="78" x2="105" y2="78" stroke="#D94E86" strokeWidth="1.5" />
    <line x1="95" y1="86" x2="105" y2="86" stroke="#D94E86" strokeWidth="1.5" />
    <path d="M76 96 Q76 114 100 114 Q124 114 124 96" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
    <line x1="100" y1="114" x2="100" y2="126" stroke="#FFFFFF" strokeWidth="3" />
    <line x1="90" y1="126" x2="110" y2="126" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
    {spark}
  </g>
);

/* ════════════════ JAWI (Tulisan Jawi) — green face, white/amber ════════════════ */

/* Baca Petikan Jawi — a Jawi passage on a page. */
const SBacaPetikanJawi = (
  <g transform="translate(0 6)">
    <rect x="58" y="62" width="84" height="58" rx="6" fill="#FFFFFF" stroke="#1B6E4B" strokeWidth="2" />
    <text x="100" y="80" textAnchor="middle" dominantBaseline="central" fontFamily={jawiFont} fontWeight="700" fontSize="18" fill="#1B6E4B">قراءة</text>
    <line x1="70" y1="98" x2="130" y2="98" stroke="#2A9A6C" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="70" y1="108" x2="120" y2="108" stroke="#6FCB95" strokeWidth="2.5" strokeLinecap="round" />
    {spark}
  </g>
);

/* Padan Kata Kerja Jawi — match a Jawi verb to its rumi word. */
const SPadanKataKerja = (
  <g transform="translate(0 8)">
    {blk({ x: 44, y: 76, w: 42, h: 34, top: '#FFFFFF', deep: '#1B6E4B', t: 'يجري', fs: 15, font: jawiFont, textFill: '#1B6E4B', vCenter: true })}
    {blk({ x: 118, y: 76, w: 40, h: 34, top: '#FFE082', deep: '#7A4D02', t: 'lari', fs: 14 })}
    <path d="M90 93 q10 -6 20 0" stroke="#FFFFFF" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeDasharray="3 3" />
    {spark}
  </g>
);

/* Susun Ayat Jawi — arrange Jawi letter cards (reorder arrow). */
const SSusunAyatJawi = (
  <g transform="translate(0 8)">
    <path d="M70 70 q15 -10 30 0" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    <polygon points="100,70 94,66 95,74" fill="#FFFFFF" />
    {blk({ x: 46, y: 78, w: 32, h: 32, top: '#FFFFFF', deep: '#1B6E4B', t: 'ب', fs: 18, font: jawiFont, textFill: '#1B6E4B', vCenter: true, dy: -3 })}
    {blk({ x: 84, y: 78, w: 32, h: 32, top: '#FFE082', deep: '#7A4D02', t: 'ا', fs: 18, font: jawiFont, textFill: '#7A4D02', vCenter: true })}
    {blk({ x: 122, y: 78, w: 32, h: 32, top: '#90CAF9', deep: '#0B4A8E', t: 'ت', fs: 18, font: jawiFont, textFill: '#0B4A8E', vCenter: true, dy: -3 })}
    {spark}
  </g>
);

/* ════════════════ MATH (Matematik) — purple face, white/bright ════════════════ */

/* Darab Mudah — 3 × 2. */
const SDarab = (
  <g transform="translate(0 8)">
    {blk({ x: 46, y: 74, w: 32, h: 36, top: '#4DD0E1', deep: '#00838F', t: '3', fs: 22 })}
    <text x="100" y="92" textAnchor="middle" dominantBaseline="central" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="24" fill="#FFFFFF">×</text>
    {blk({ x: 122, y: 74, w: 32, h: 36, top: '#FFE082', deep: '#7A4D02', t: '2', fs: 22 })}
    {spark}
  </g>
);

/* Wang — coins + a note. */
const SWang = (
  <g transform="translate(0 8)">
    <ellipse cx="78" cy="104" rx="20" ry="8" fill="#F9A825" stroke="#7A4D02" strokeWidth="2" />
    <ellipse cx="78" cy="98" rx="20" ry="8" fill="#FFD54F" stroke="#7A4D02" strokeWidth="2" />
    <ellipse cx="78" cy="92" rx="20" ry="8" fill="#FFEB3B" stroke="#7A4D02" strokeWidth="2" />
    <text x="78" y="92" textAnchor="middle" dominantBaseline="central" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="10" fill="#7A4D02">RM</text>
    <rect x="104" y="80" width="44" height="26" rx="4" fill="#A5D6A7" stroke="#1F4A00" strokeWidth="2" />
    <circle cx="126" cy="93" r="7" fill="#FFFFFF" opacity="0.6" stroke="#1F4A00" strokeWidth="1" />
    {spark}
  </g>
);

/* Masa — a clock face. */
const SMasa = (
  <g transform="translate(0 6)">
    <circle cx="100" cy="92" r="28" fill="#FFFFFF" stroke="#5F3FC0" strokeWidth="3" />
    <line x1="100" y1="68" x2="100" y2="73" stroke="#5F3FC0" strokeWidth="2" />
    <line x1="100" y1="111" x2="100" y2="116" stroke="#5F3FC0" strokeWidth="2" />
    <line x1="76" y1="92" x2="81" y2="92" stroke="#5F3FC0" strokeWidth="2" />
    <line x1="119" y1="92" x2="124" y2="92" stroke="#5F3FC0" strokeWidth="2" />
    <line x1="100" y1="92" x2="100" y2="76" stroke="#7A55E0" strokeWidth="3" strokeLinecap="round" />
    <line x1="100" y1="92" x2="114" y2="92" stroke="#FF5D6C" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="100" cy="92" r="2.5" fill="#5F3FC0" />
    {spark}
  </g>
);

/* Pecahan — a half-shaded fraction circle. */
const SPecahan = (
  <g transform="translate(0 6)">
    <circle cx="96" cy="92" r="26" fill="#FFFFFF" stroke="#5F3FC0" strokeWidth="2" />
    <path d="M96 92 L96 66 A26 26 0 0 1 96 118 Z" fill="#4DD0E1" />
    <line x1="96" y1="66" x2="96" y2="118" stroke="#5F3FC0" strokeWidth="2" />
    <text x="134" y="92" textAnchor="middle" dominantBaseline="central" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="20" fill="#FFFFFF">½</text>
    {spark}
  </g>
);

/* Nombor 1-1000 — big number. */
const SNombor1000 = (
  <g>
    <text x="100" y="96" textAnchor="middle" dominantBaseline="central" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="36" fill="#FFFFFF">1000</text>
    {spark}
  </g>
);

/* Tambah Tahun 2 — 5 + 8. */
const STambah2 = (
  <g transform="translate(0 8)">
    {blk({ x: 46, y: 74, w: 32, h: 36, top: '#A5D6A7', deep: '#1F4A00', t: '5', fs: 22 })}
    <text x="100" y="92" textAnchor="middle" dominantBaseline="central" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="24" fill="#FFFFFF">+</text>
    {blk({ x: 122, y: 74, w: 32, h: 36, top: '#4DD0E1', deep: '#00838F', t: '8', fs: 22 })}
    {spark}
  </g>
);

/* Tolak Tahun 2 — 9 − 4. */
const STolak2 = (
  <g transform="translate(0 8)">
    {blk({ x: 46, y: 74, w: 32, h: 36, top: '#FF8B95', deep: '#7A1010', t: '9', fs: 22 })}
    <text x="100" y="92" textAnchor="middle" dominantBaseline="central" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="26" fill="#FFFFFF">−</text>
    {blk({ x: 122, y: 74, w: 32, h: 36, top: '#FFE082', deep: '#7A4D02', t: '4', fs: 22 })}
    {spark}
  </g>
);

/* Ukuran Panjang — a ruler. */
const SUkuran = (
  <g transform="translate(0 8)">
    <rect x="50" y="84" width="100" height="22" rx="3" fill="#FFE082" stroke="#7A4D02" strokeWidth="2" />
    <line x1="62" y1="84" x2="62" y2="94" stroke="#7A4D02" strokeWidth="1.5" />
    <line x1="74" y1="84" x2="74" y2="90" stroke="#7A4D02" strokeWidth="1.5" />
    <line x1="86" y1="84" x2="86" y2="94" stroke="#7A4D02" strokeWidth="1.5" />
    <line x1="98" y1="84" x2="98" y2="90" stroke="#7A4D02" strokeWidth="1.5" />
    <line x1="110" y1="84" x2="110" y2="94" stroke="#7A4D02" strokeWidth="1.5" />
    <line x1="122" y1="84" x2="122" y2="90" stroke="#7A4D02" strokeWidth="1.5" />
    <line x1="134" y1="84" x2="134" y2="94" stroke="#7A4D02" strokeWidth="1.5" />
    {spark}
  </g>
);

/* ── Map: age-8 game id → screen artwork. ── */
export const GRADE2_GAME_INNER = {
  // Membaca
  'kosa-kata-kontekstual': SKosaKata,
  'bacaan-pemahaman':      SBacaanPemahaman,
  'cerita-bacaan':         SCeritaBacaan,
  'pengenalan-nilai':      SPengenalanNilai,
  'pantun-bacaan':         SPantunBacaan,
  // Bertutur
  'lafaz-pantun':          SLafazPantun,
  // Tulisan Jawi
  'baca-petikan-jawi':     SBacaPetikanJawi,
  'padan-kata-kerja-jawi': SPadanKataKerja,
  'susun-ayat-jawi':       SSusunAyatJawi,
  // Matematik
  'darab-mudah':           SDarab,
  'wang-tahun2':           SWang,
  'masa-tahun2':           SMasa,
  'pecahan-tahun2':        SPecahan,
  'nombor-1000':           SNombor1000,
  'tambah-tahun2':         STambah2,
  'tolak-tahun2':          STolak2,
  'ukuran-panjang-tahun2': SUkuran,
};
