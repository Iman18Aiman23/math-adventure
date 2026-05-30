import React from 'react';

/**
 * Per-game "screen" artwork for the Grade 1 (age-7) game cards.
 *
 * Mirrors EarlyExplorersScreens.jsx: each entry in GRADE1_GAME_INNER is the
 * artwork shown inside the shared robot-head face screen (see <EEGameRobot> in
 * AgeGroup-4-6/EarlyExplorersRobots.jsx — the frames are pillar-based and reused
 * across ages), in the 200×200 space (screen at x38 y52 w124 h96).
 *
 * Face colours per pillar: reading=orange, speaking=pink, jawi=green, math=purple.
 * So reading/speaking art uses COOL/white fills for contrast; jawi/math art uses
 * white/bright fills. No SVG <filter> (cards are flat). Helpers are local so this
 * file exports data only (react-refresh rule).
 */

/* ── Local helpers (mirrors EarlyExplorersScreens) ── */

const spark = (
  <>
    <polygon points="50,60 52,64 56,66 52,68 50,72 48,68 44,66 48,64" fill="#FFEB3B" opacity="0.8" />
    <polygon points="150,60 152,64 156,66 152,68 150,72 148,68 144,66 148,64" fill="#FFEB3B" opacity="0.6" />
  </>
);

// Glossy rounded letter/number block. vCenter for Jawi glyphs; dy nudges text.
function blk({ x, y, w = 38, h = 40, top, deep, t, fs = 24, font = "'Baloo 2','Comic Sans MS',sans-serif", textFill = '#fff', vCenter = false, dy = 0 }) {
  return (
    <g key={`blk-${x}-${y}-${t}`}>
      <rect x={x} y={y} width={w} height={h} rx="6" fill={top} stroke={deep} strokeWidth="2" />
      <rect x={x} y={y} width={w} height={h / 4} rx="6" fill="rgba(255,255,255,.45)" />
      <text x={x + w / 2} y={(vCenter ? y + h / 2 : y + h * 0.72) + dy} textAnchor="middle" dominantBaseline={vCenter ? 'central' : 'auto'} fontFamily={font} fontWeight="800" fontSize={fs} fill={textFill} stroke={deep} strokeWidth=".5">{t}</text>
    </g>
  );
}

// Simple apple.
function apple(cx, cy) {
  return (
    <g key={`apple-${cx}`}>
      <circle cx={cx} cy={cy} r="15" fill="#EF5350" stroke="#B71C1C" strokeWidth="2" />
      <ellipse cx={cx - 5} cy={cy - 5} rx="4" ry="6" fill="#fff" opacity="0.4" transform={`rotate(-20 ${cx - 5} ${cy - 5})`} />
      <rect x={cx - 1} y={cy - 20} width="2.5" height="7" rx="1" fill="#6D4C41" />
      <path d={`M${cx + 1} ${cy - 17} q8 -4 10 -10 q-8 1 -10 6 z`} fill="#66BB6A" />
    </g>
  );
}

/* ════════════════ READING (Membaca) — orange face, cool art ════════════════ */

/* Bina Ayat — words on a line forming a sentence. */
const SBinaAyat = (
  <g transform="translate(0 14)">
    <rect x="44" y="80" width="28" height="20" rx="5" fill="#4DD0C4" stroke="#00695C" strokeWidth="2" />
    <rect x="78" y="80" width="36" height="20" rx="5" fill="#4FC3F7" stroke="#01579B" strokeWidth="2" />
    <rect x="120" y="80" width="28" height="20" rx="5" fill="#9575CD" stroke="#4527A0" strokeWidth="2" />
    <circle cx="154" cy="98" r="3" fill="#FFFFFF" />
    <line x1="44" y1="110" x2="156" y2="110" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
    {spark}
  </g>
);

/* Suku Kata — BA + TU → BATU. */
const SSukuKata = (
  <g transform="translate(0 8)">
    {blk({ x: 54, y: 72, w: 40, h: 38, top: '#4DD0C4', deep: '#00695C', t: 'BA', fs: 20 })}
    {blk({ x: 106, y: 72, w: 40, h: 38, top: '#4FC3F7', deep: '#01579B', t: 'TU', fs: 20 })}
    <text x="100" y="126" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="15" fill="#FFFFFF">BATU</text>
    {spark}
  </g>
);

/* Jenis Kata — magnifier over a word. */
const SJenisKata = (
  <g transform="translate(0 10)">
    {blk({ x: 50, y: 74, w: 56, h: 34, top: '#4FC3F7', deep: '#01579B', t: 'kata', fs: 18 })}
    <circle cx="124" cy="92" r="16" fill="rgba(255,255,255,0.25)" stroke="#FFFFFF" strokeWidth="3" />
    <line x1="135" y1="103" x2="146" y2="114" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
    {spark}
  </g>
);

/* Kata Tanya — big question mark. */
const SKataTanya = (
  <g>
    <text x="100" y="96" textAnchor="middle" dominantBaseline="central" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="64" fill="#FFFFFF" stroke="#C8651A" strokeWidth="2">?</text>
    {spark}
  </g>
);

/* Kata Hubung & Sendi — two words joined by a chain link. */
const SKataHubung = (
  <g transform="translate(0 8)">
    {blk({ x: 44, y: 74, w: 32, h: 36, top: '#4DD0C4', deep: '#00695C', t: 'A', fs: 20 })}
    {blk({ x: 124, y: 74, w: 32, h: 36, top: '#9575CD', deep: '#4527A0', t: 'B', fs: 20 })}
    <ellipse cx="93" cy="92" rx="9" ry="6" fill="none" stroke="#FFFFFF" strokeWidth="3" />
    <ellipse cx="107" cy="92" rx="9" ry="6" fill="none" stroke="#FFFFFF" strokeWidth="3" />
    {spark}
  </g>
);

/* Kata Imbuhan — prefix + root: ber + lari. */
const SKataImbuhan = (
  <g transform="translate(0 8)">
    {blk({ x: 40, y: 74, w: 38, h: 36, top: '#4DD0C4', deep: '#00695C', t: 'ber', fs: 15 })}
    <text x="100" y="92" textAnchor="middle" dominantBaseline="central" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="22" fill="#FFFFFF">+</text>
    {blk({ x: 120, y: 74, w: 42, h: 36, top: '#4FC3F7', deep: '#01579B', t: 'lari', fs: 15 })}
    {spark}
  </g>
);

/* Ejaan & Tanda Baca — letters + punctuation. */
const SEjaanTandaBaca = (
  <g transform="translate(0 8)">
    {blk({ x: 56, y: 74, w: 44, h: 36, top: '#4FC3F7', deep: '#01579B', t: 'Aa', fs: 20 })}
    <text x="130" y="84" textAnchor="middle" dominantBaseline="central" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="22" fill="#FFFFFF">. ,</text>
    <text x="130" y="104" textAnchor="middle" dominantBaseline="central" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="22" fill="#FFFFFF">? !</text>
    {spark}
  </g>
);

/* Kata Ganda — identical words ×2. */
const SKataGanda = (
  <g transform="translate(0 10)">
    <text x="100" y="64" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="16" fill="#FFFFFF">×2</text>
    {blk({ x: 44, y: 76, w: 46, h: 32, top: '#4DD0C4', deep: '#00695C', t: 'buku', fs: 14 })}
    {blk({ x: 110, y: 76, w: 46, h: 32, top: '#4DD0C4', deep: '#00695C', t: 'buku', fs: 14 })}
    {spark}
  </g>
);

/* Kefahaman Bacaan — a page of text. */
const SKefahaman = (
  <g transform="translate(0 8)">
    <rect x="64" y="64" width="72" height="60" rx="6" fill="#FFFFFF" stroke="#C8651A" strokeWidth="2" />
    <line x1="74" y1="78" x2="126" y2="78" stroke="#E07F1F" strokeWidth="3" strokeLinecap="round" />
    <line x1="74" y1="90" x2="126" y2="90" stroke="#FFB36B" strokeWidth="3" strokeLinecap="round" />
    <line x1="74" y1="102" x2="126" y2="102" stroke="#FFB36B" strokeWidth="3" strokeLinecap="round" />
    <line x1="74" y1="114" x2="110" y2="114" stroke="#FFB36B" strokeWidth="3" strokeLinecap="round" />
    {spark}
  </g>
);

/* ════════════════ SPEAKING (Bertutur) — pink face, cool art ════════════════ */

/* Baca Ayat Kuat — speech bubble + sound waves. */
const SBacaKuat = (
  <g transform="translate(0 6)">
    <rect x="50" y="70" width="76" height="40" rx="14" fill="#FFFFFF" stroke="#D94E86" strokeWidth="2" />
    <path d="M68 110 L68 124 L86 110 Z" fill="#FFFFFF" stroke="#D94E86" strokeWidth="2" strokeLinejoin="round" />
    <text x="88" y="90" textAnchor="middle" dominantBaseline="central" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="20" fill="#D94E86">Aa</text>
    <path d="M134 84 q6 8 0 16" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M142 78 q10 14 0 28" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
    {spark}
  </g>
);

/* Bertutur Bertatasusila — polite speech bubble with a heart. */
const SBertatasusila = (
  <g transform="translate(0 8)">
    <rect x="56" y="68" width="88" height="44" rx="16" fill="#FFFFFF" stroke="#D94E86" strokeWidth="2" />
    <path d="M80 112 L80 126 L98 112 Z" fill="#FFFFFF" stroke="#D94E86" strokeWidth="2" strokeLinejoin="round" />
    <path d="M100 84 C96 78 86 80 88 88 C90 95 100 100 100 100 C100 100 110 95 112 88 C114 80 104 78 100 84 Z" fill="#FF5D8F" />
    {spark}
  </g>
);

/* Jawab Soalan — question bubble + tick bubble. */
const SJawabSoalan = (
  <g transform="translate(0 8)">
    <circle cx="74" cy="90" r="22" fill="#FFFFFF" stroke="#D94E86" strokeWidth="2" />
    <text x="74" y="90" textAnchor="middle" dominantBaseline="central" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="24" fill="#D94E86">?</text>
    <circle cx="126" cy="90" r="22" fill="#4DD0C4" stroke="#00695C" strokeWidth="2" />
    <path d="M116 90 l7 8 12 -16" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    {spark}
  </g>
);

/* Sebut Lawan Kata — antonyms: + and − with a double arrow. */
const SLawanKata = (
  <g transform="translate(0 8)">
    {blk({ x: 42, y: 76, w: 34, h: 32, top: '#4DD0C4', deep: '#00695C', t: '+', fs: 22 })}
    {blk({ x: 124, y: 76, w: 34, h: 32, top: '#9575CD', deep: '#4527A0', t: '−', fs: 22 })}
    <line x1="84" y1="92" x2="116" y2="92" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
    <polygon points="84,92 92,87 92,97" fill="#FFFFFF" />
    <polygon points="116,92 108,87 108,97" fill="#FFFFFF" />
    {spark}
  </g>
);

/* Baca Frasa Bergambar — a framed picture + caption line. */
const SFrasaBergambar = (
  <g transform="translate(0 6)">
    <rect x="60" y="64" width="80" height="54" rx="8" fill="#FFFFFF" stroke="#D94E86" strokeWidth="2" />
    <circle cx="78" cy="82" r="8" fill="#FFD54F" />
    <path d="M66 116 Q88 90 112 116 Z" fill="#4DD0C4" />
    <path d="M96 116 Q116 94 134 116 Z" fill="#81C784" />
    <line x1="70" y1="128" x2="130" y2="128" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
    {spark}
  </g>
);

/* ════════════════ JAWI (Tulisan Jawi) — green face, white/amber ════════════════ */

const jawiFont = "'Amiri',serif";

/* Baca Suku Kata Jawi — two Jawi letter cards. */
const SBacaSukuJawi = (
  <g transform="translate(0 6)">
    {blk({ x: 56, y: 74, w: 34, h: 38, top: '#FFFFFF', deep: '#1B6E4B', t: 'ب', fs: 24, font: jawiFont, textFill: '#1B6E4B', vCenter: true, dy: -3 })}
    {blk({ x: 110, y: 74, w: 34, h: 38, top: '#FFE082', deep: '#7A4D02', t: 'ا', fs: 24, font: jawiFont, textFill: '#7A4D02', vCenter: true })}
    {spark}
  </g>
);

/* Bina Perkataan Jawi — three letter bricks ك ت ب. */
const SBinaJawi = (
  <g transform="translate(0 8)">
    {blk({ x: 46, y: 76, w: 32, h: 34, top: '#FFFFFF', deep: '#1B6E4B', t: 'ك', fs: 20, font: jawiFont, textFill: '#1B6E4B', vCenter: true, dy: -3 })}
    {blk({ x: 84, y: 76, w: 32, h: 34, top: '#FFE082', deep: '#7A4D02', t: 'ت', fs: 20, font: jawiFont, textFill: '#7A4D02', vCenter: true, dy: -3 })}
    {blk({ x: 122, y: 76, w: 32, h: 34, top: '#90CAF9', deep: '#0B4A8E', t: 'ب', fs: 20, font: jawiFont, textFill: '#0B4A8E', vCenter: true, dy: -3 })}
    {spark}
  </g>
);

/* Padan Perkataan Jawi — Jawi word ↔ rumi word. */
const SPadanJawi = (
  <g transform="translate(0 8)">
    {blk({ x: 44, y: 76, w: 40, h: 34, top: '#FFFFFF', deep: '#1B6E4B', t: 'باتو', fs: 16, font: jawiFont, textFill: '#1B6E4B', vCenter: true })}
    {blk({ x: 118, y: 76, w: 40, h: 34, top: '#FFE082', deep: '#7A4D02', t: 'batu', fs: 14 })}
    <path d="M88 93 q12 -6 24 0" stroke="#FFFFFF" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeDasharray="3 3" />
    {spark}
  </g>
);

/* Baca Ayat Jawi — a page with a Jawi line. */
const SBacaAyatJawi = (
  <g transform="translate(0 8)">
    <rect x="58" y="66" width="84" height="56" rx="6" fill="#FFFFFF" stroke="#1B6E4B" strokeWidth="2" />
    <text x="100" y="86" textAnchor="middle" dominantBaseline="central" fontFamily={jawiFont} fontWeight="700" fontSize="20" fill="#1B6E4B">اقرأ</text>
    <line x1="70" y1="102" x2="130" y2="102" stroke="#2A9A6C" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="70" y1="112" x2="118" y2="112" stroke="#6FCB95" strokeWidth="2.5" strokeLinecap="round" />
    {spark}
  </g>
);

/* Tulis Jawi — big Jawi letter + qalam pen. */
const STulisJawi = (
  <g transform="translate(0 8)">
    <text x="90" y="90" textAnchor="middle" dominantBaseline="central" fontFamily={jawiFont} fontWeight="700" fontSize="48" fill="#FFFFFF" stroke="#1B6E4B" strokeWidth="1.5">ج</text>
    <g transform="translate(120 58) rotate(35)">
      <rect x="0" y="0" width="8" height="34" rx="2" fill="#FFE082" stroke="#7A4D02" strokeWidth="1" />
      <polygon points="0,34 4,44 8,34" fill="#5D4037" />
    </g>
    {spark}
  </g>
);

/* ════════════════ MATH (Matematik) — purple face, white/bright ════════════════ */

/* Nombor 1–100 — big 100. */
const SNombor100 = (
  <g>
    <text x="100" y="96" textAnchor="middle" dominantBaseline="central" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="44" fill="#FFFFFF" stroke="#5F3FC0" strokeWidth="2">100</text>
    {spark}
  </g>
);

/* Tambah dalam 100 — 5 + 3. */
const STambah100 = (
  <g transform="translate(0 8)">
    {blk({ x: 46, y: 74, w: 32, h: 36, top: '#4DD0E1', deep: '#00838F', t: '5', fs: 22 })}
    <text x="100" y="92" textAnchor="middle" dominantBaseline="central" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="24" fill="#FFFFFF">+</text>
    {blk({ x: 122, y: 74, w: 32, h: 36, top: '#FFE082', deep: '#7A4D02', t: '3', fs: 22 })}
    {spark}
  </g>
);

/* Bentuk 3D — an isometric cube. */
const SBentuk3D = (
  <g transform="translate(0 6)">
    <polygon points="76,86 100,74 124,86 100,98" fill="#B39DDB" />
    <polygon points="76,86 76,116 100,128 100,98" fill="#FFFFFF" />
    <polygon points="124,86 124,116 100,128 100,98" fill="#E1BEE7" />
    <polygon points="76,86 100,74 124,86 124,116 100,128 76,116" fill="none" stroke="#5F3FC0" strokeWidth="2" strokeLinejoin="round" />
    <line x1="100" y1="98" x2="100" y2="128" stroke="#5F3FC0" strokeWidth="1.5" />
    <line x1="76" y1="86" x2="100" y2="98" stroke="#5F3FC0" strokeWidth="1.5" />
    <line x1="124" y1="86" x2="100" y2="98" stroke="#5F3FC0" strokeWidth="1.5" />
    {spark}
  </g>
);

/* Ukur Panjang — a ruler. */
const SUkurPanjang = (
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

/* Baca Pictograph — a small bar chart. */
const SPictograph = (
  <g transform="translate(0 6)">
    <line x1="58" y1="116" x2="142" y2="116" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
    <rect x="64" y="92" width="16" height="24" fill="#4DD0E1" />
    <rect x="88" y="78" width="16" height="38" fill="#FFE082" />
    <rect x="112" y="100" width="16" height="16" fill="#FF8B95" />
    {spark}
  </g>
);

/* Time Teller — a clock face. */
const STimeTeller = (
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

/* Pengira Wang — coins + a note. */
const SCountingMoney = (
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

/* Cerita Penolakan — three apples, one taken away. */
const SSubtraction = (
  <g transform="translate(0 6)">
    {apple(72, 92)}
    {apple(100, 92)}
    {apple(128, 92)}
    <line x1="116" y1="80" x2="140" y2="104" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
    {spark}
  </g>
);

/* Jisim — a balance scale. */
const SJisim = (
  <g transform="translate(0 8)">
    <rect x="96" y="76" width="8" height="38" fill="#FFE082" stroke="#7A4D02" strokeWidth="1.5" />
    <rect x="84" y="112" width="32" height="6" rx="2" fill="#FFE082" stroke="#7A4D02" strokeWidth="1.5" />
    <line x1="64" y1="78" x2="136" y2="78" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
    <circle cx="100" cy="78" r="4" fill="#FFFFFF" />
    <path d="M52 80 q12 18 24 0 Z" fill="#4DD0E1" stroke="#00838F" strokeWidth="1.5" />
    <path d="M124 80 q12 18 24 0 Z" fill="#FF8B95" stroke="#C62828" strokeWidth="1.5" />
    {spark}
  </g>
);

/* Isi Padu Cecair — a measuring beaker. */
const SIsiPadu = (
  <g transform="translate(0 6)">
    <path d="M80 70 L80 116 Q80 122 86 122 L114 122 Q120 122 120 116 L120 70" fill="rgba(255,255,255,0.15)" stroke="#FFFFFF" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M80 96 L80 116 Q80 122 86 122 L114 122 Q120 122 120 116 L120 96 Z" fill="#4DD0E1" opacity="0.9" />
    <ellipse cx="100" cy="96" rx="20" ry="3" fill="#81D4FA" />
    <line x1="120" y1="82" x2="126" y2="82" stroke="#FFFFFF" strokeWidth="1.5" />
    <line x1="120" y1="96" x2="126" y2="96" stroke="#FFFFFF" strokeWidth="1.5" />
    <line x1="120" y1="110" x2="126" y2="110" stroke="#FFFFFF" strokeWidth="1.5" />
    {spark}
  </g>
);

/* ── Map: age-7 game id → screen artwork. ── */
export const GRADE1_GAME_INNER = {
  // Membaca
  'sentence-builder':         SBinaAyat,
  'suku-kata-bina-perkataan': SSukuKata,
  'jenis-kata':               SJenisKata,
  'kata-tanya':               SKataTanya,
  'kata-hubung-sendi':        SKataHubung,
  'kata-imbuhan':             SKataImbuhan,
  'ejaan-tanda-baca':         SEjaanTandaBaca,
  'kata-ganda':               SKataGanda,
  'kefahaman-bacaan':         SKefahaman,
  // Bertutur
  'baca-ayat-kuat':           SBacaKuat,
  'bertutur-bertatasusila':   SBertatasusila,
  'jawab-soalan':             SJawabSoalan,
  'sebut-lawan-kata':         SLawanKata,
  'sebut-frasa-bergambar':    SFrasaBergambar,
  // Tulisan Jawi
  'baca-suku-kata-jawi':      SBacaSukuJawi,
  'bina-perkataan-jawi':      SBinaJawi,
  'padan-perkataan-jawi':     SPadanJawi,
  'baca-ayat-jawi':           SBacaAyatJawi,
  'tulis-jawi':               STulisJawi,
  // Matematik
  'nombor-100':               SNombor100,
  'tambah-100':               STambah100,
  'bentuk-3d':                SBentuk3D,
  'ukur-panjang':             SUkurPanjang,
  'baca-pictograph':          SPictograph,
  'time-teller':              STimeTeller,
  'counting-money':           SCountingMoney,
  'subtraction-story':        SSubtraction,
  'jisim':                    SJisim,
  'isi-padu-cecair':          SIsiPadu,
};
