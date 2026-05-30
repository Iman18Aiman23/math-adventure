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

/* ── Map: age-9 game id → screen artwork. ── */
export const GRADE3_GAME_INNER = {
  'jenis-ayat':                 SJenisAyat,
  'penjodoh-bilangan':          SPenjodoh,
  'imbuhan-lanjutan':           SImbuhan,
  'simpulan-bahasa':            SSimpulan,
  'bacaan-pemahaman-lanjutan':  SBacaanLanjutan,
};
