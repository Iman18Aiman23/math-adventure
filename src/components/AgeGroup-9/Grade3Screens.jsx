import React from 'react';

/**
 * Per-game screen artwork for Grade 3 (age-9) game cards.
 * Mirrors the other *Screens.jsx files — inner art for the shared robot-head
 * face screen (EEGameRobot, 200×200, screen at x38 y52 w124 h96). Age 9 currently
 * has the Reading pillar only → orange face → cool/white art. No SVG <filter>.
 */

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

/* Jenis Ayat — sentence-type punctuation: . ? ! */
const SJenisAyat = (
  <g transform="translate(0 8)">
    {blk({ x: 46, y: 76, w: 32, h: 34, top: '#4DD0C4', deep: '#00695C', t: '.', fs: 26, vCenter: true })}
    {blk({ x: 84, y: 76, w: 32, h: 34, top: '#4FC3F7', deep: '#01579B', t: '?', fs: 22, vCenter: true })}
    {blk({ x: 122, y: 76, w: 32, h: 34, top: '#9575CD', deep: '#4527A0', t: '!', fs: 22, vCenter: true })}
    {spark}
  </g>
);

/* Penjodoh Bilangan — a number matched to its objects. */
const SPenjodoh = (
  <g transform="translate(0 8)">
    {blk({ x: 48, y: 74, w: 34, h: 36, top: '#4FC3F7', deep: '#01579B', t: '3', fs: 24 })}
    <rect x="116" y="74" width="12" height="12" rx="2" fill="#FFFFFF" />
    <rect x="132" y="74" width="12" height="12" rx="2" fill="#FFFFFF" />
    <rect x="124" y="92" width="12" height="12" rx="2" fill="#FFFFFF" />
    <path d="M86 92 q14 -6 28 0" stroke="#FFFFFF" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeDasharray="3 3" />
    {spark}
  </g>
);

/* Imbuhan Lanjutan — circumfix ke- … -an. */
const SImbuhan = (
  <g transform="translate(0 8)">
    {blk({ x: 38, y: 76, w: 30, h: 34, top: '#4DD0C4', deep: '#00695C', t: 'ke', fs: 13 })}
    {blk({ x: 72, y: 76, w: 40, h: 34, top: '#4FC3F7', deep: '#01579B', t: 'baik', fs: 13 })}
    {blk({ x: 116, y: 76, w: 30, h: 34, top: '#9575CD', deep: '#4527A0', t: 'an', fs: 13 })}
    {spark}
  </g>
);

/* Simpulan Bahasa & Perumpamaan — figurative language (quote card). */
const SSimpulan = (
  <g transform="translate(0 6)">
    <rect x="58" y="66" width="84" height="56" rx="12" fill="#FFFFFF" stroke="#C8651A" strokeWidth="2" />
    <text x="100" y="98" textAnchor="middle" dominantBaseline="central" fontFamily="Georgia, 'Times New Roman', serif" fontWeight="700" fontSize="46" fill="#4FC3F7">“ ”</text>
    {spark}
  </g>
);

/* Bacaan Pemahaman Lanjutan — a passage with a question badge. */
const SBacaanLanjutan = (
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

/* ════════════════ MATH (Matematik) — purple face, bold art ════════════════ */

/* Nombor 10 000 — four place-value digit blocks (ribu|ratus|puluh|sa). */
const SNombor10000 = (
  <g>
    {blk({ x: 48, y: 72, w: 23, h: 30, top: '#7E57C2', deep: '#512DA8', t: '2', fs: 17, vCenter: true })}
    {blk({ x: 75, y: 72, w: 23, h: 30, top: '#9575CD', deep: '#673AB7', t: '3', fs: 17, vCenter: true })}
    {blk({ x: 102, y: 72, w: 23, h: 30, top: '#673AB7', deep: '#4527A0', t: '4', fs: 17, vCenter: true })}
    {blk({ x: 129, y: 72, w: 23, h: 30, top: '#AB47BC', deep: '#7B1FA2', t: '5', fs: 17, vCenter: true })}
    <text x="100" y="114" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="11" fill="#FFEB3B">2 345</text>
    {spark}
  </g>
);

/* Darab Lanjutan ×6–×9 — 7 × 8 = 56 equation blocks. */
const SDarabLanjutan = (
  <g>
    {blk({ x: 44, y: 70, w: 27, h: 32, top: '#E53935', deep: '#B71C1C', t: '7', fs: 19, vCenter: true })}
    <text x="77" y="86" textAnchor="middle" dominantBaseline="central" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="17" fill="#FFEB3B">×</text>
    {blk({ x: 84, y: 70, w: 27, h: 32, top: '#2E7D32', deep: '#1B5E20', t: '8', fs: 19, vCenter: true })}
    <text x="117" y="86" textAnchor="middle" dominantBaseline="central" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="17" fill="#FFEB3B">=</text>
    {blk({ x: 124, y: 70, w: 32, h: 32, top: '#7E57C2', deep: '#4527A0', t: '56', fs: 15, vCenter: true })}
    {spark}
  </g>
);

/* Bahagi Tahun 3 ÷2–÷9 — 56 ÷ 7 = 8 equation blocks. */
const SBahagiTahun3 = (
  <g>
    {blk({ x: 40, y: 70, w: 30, h: 32, top: '#E53935', deep: '#B71C1C', t: '56', fs: 15, vCenter: true })}
    <text x="76" y="86" textAnchor="middle" dominantBaseline="central" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="17" fill="#FFEB3B">÷</text>
    {blk({ x: 83, y: 70, w: 27, h: 32, top: '#2E7D32', deep: '#1B5E20', t: '7', fs: 19, vCenter: true })}
    <text x="116" y="86" textAnchor="middle" dominantBaseline="central" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="17" fill="#FFEB3B">=</text>
    {blk({ x: 123, y: 70, w: 27, h: 32, top: '#7E57C2', deep: '#4527A0', t: '8', fs: 19, vCenter: true })}
    {spark}
  </g>
);

/* Pecahan Lanjutan — large 3/4 fraction in a purple box. */
const SPecahanLanjutan = (
  <g>
    <rect x="68" y="62" width="64" height="56" rx="10" fill="#7E57C2" stroke="#4527A0" strokeWidth="2" />
    <rect x="68" y="62" width="64" height="14" rx="10" fill="rgba(255,255,255,.3)" />
    <text x="100" y="83" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="22" fill="#fff">3</text>
    <line x1="74" y1="94" x2="126" y2="94" stroke="#FFEB3B" strokeWidth="3" strokeLinecap="round" />
    <text x="100" y="111" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="22" fill="#fff">4</text>
    {spark}
  </g>
);

/* Perpuluhan — "0.5" in a wide purple box. */
const SPerpuluhan = (
  <g>
    <rect x="46" y="65" width="108" height="44" rx="10" fill="#7E57C2" stroke="#4527A0" strokeWidth="2" />
    <rect x="46" y="65" width="108" height="11" rx="10" fill="rgba(255,255,255,.3)" />
    <text x="100" y="93" textAnchor="middle" dominantBaseline="central" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="26" fill="#fff">0.5</text>
    {spark}
  </g>
);

/* Wang Tahun 3 — gold coin with RM text. */
const SWangTahun3 = (
  <g>
    <circle cx="100" cy="88" r="30" fill="#F9A825" stroke="#E65100" strokeWidth="2.5" />
    <circle cx="100" cy="88" r="25" fill="none" stroke="#E65100" strokeWidth="1.5" strokeDasharray="4 3" />
    <text x="100" y="91" textAnchor="middle" dominantBaseline="central" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="17" fill="#fff">RM</text>
    {spark}
  </g>
);

/* Masa Tahun 3 — digital clock display. */
const SMasaTahun3 = (
  <g>
    <rect x="44" y="64" width="112" height="46" rx="8" fill="#1A1A2E" stroke="#7E57C2" strokeWidth="2" />
    <rect x="44" y="64" width="112" height="12" rx="8" fill="rgba(126,87,194,.25)" />
    <text x="100" y="93" textAnchor="middle" dominantBaseline="central" fontFamily="'Courier New',monospace" fontWeight="800" fontSize="22" fill="#CE82FF">10:30</text>
    {spark}
  </g>
);

/* Perimeter & Luas — labeled rectangle. */
const SPerimeterLuas = (
  <g>
    <rect x="58" y="70" width="84" height="52" rx="4" fill="rgba(126,87,194,.25)" stroke="#7E57C2" strokeWidth="2.5" />
    <text x="100" y="61" textAnchor="middle" dominantBaseline="central" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="12" fill="#FFEB3B">8 cm</text>
    <text x="47" y="96" textAnchor="middle" dominantBaseline="central" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="12" fill="#FFEB3B" transform="rotate(-90, 47, 96)">5 cm</text>
    {spark}
  </g>
);

/* ── Map: age-9 game id → screen artwork. ── */
export const GRADE3_GAME_INNER = {
  'jenis-ayat':                 SJenisAyat,
  'penjodoh-bilangan':          SPenjodoh,
  'imbuhan-lanjutan':           SImbuhan,
  'simpulan-bahasa':            SSimpulan,
  'bacaan-pemahaman-lanjutan':  SBacaanLanjutan,
  'nombor-10000':               SNombor10000,
  'darab-lanjutan':             SDarabLanjutan,
  'bahagi-tahun3':              SBahagiTahun3,
  'pecahan-lanjutan':           SPecahanLanjutan,
  'perpuluhan':                 SPerpuluhan,
  'wang-tahun3':                SWangTahun3,
  'masa-tahun3':                SMasaTahun3,
  'perimeter-luas':             SPerimeterLuas,
};
