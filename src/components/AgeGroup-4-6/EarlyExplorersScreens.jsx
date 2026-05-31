import React from 'react';

/**
 * Per-game "screen" artwork for the Early Explorers game cards.
 *
 * Each entry in GAME_INNER is the inner artwork shown inside the shared
 * robot-head face screen (see <EEGameRobot> in EarlyExplorersRobots.jsx), in the
 * 200×200 coordinate space (screen at x38 y52 w124 h96).
 *
 * No SVG <filter> here — cards are flat (shadowless). Kept in its own file so the
 * robot components file can export components only (react-refresh rule).
 */

/* ── Small shared helpers ── */

// Two corner sparkles.
const spark = (
  <>
    <polygon points="50,60 52,64 56,66 52,68 50,72 48,68 44,66 48,64" fill="#FFEB3B" opacity="0.8" />
    <polygon points="150,60 152,64 156,66 152,68 150,72 148,68 144,66 148,64" fill="#FFEB3B" opacity="0.6" />
  </>
);

// Glossy rounded letter/number block.
// vCenter: true → vertically centre the glyph (use for Jawi/Arabic, whose glyph
// metrics don't sit on a Latin baseline). Latin blocks keep the default baseline.
function blk({ x, y, w = 38, h = 40, top, deep, t, fs = 24, font = "'Baloo 2','Comic Sans MS',sans-serif", textFill = '#fff', vCenter = false, dy = 0 }) {
  return (
    <g key={`blk-${x}-${y}-${t}`}>
      <rect x={x} y={y} width={w} height={h} rx="6" fill={top} stroke={deep} strokeWidth="2" />
      <rect x={x} y={y} width={w} height={h / 4} rx="6" fill="rgba(255,255,255,.45)" />
      <text x={x + w / 2} y={(vCenter ? y + h / 2 : y + h * 0.72) + dy} textAnchor="middle" dominantBaseline={vCenter ? 'central' : 'auto'} fontFamily={font} fontWeight="800" fontSize={fs} fill={textFill}>{t}</text>
    </g>
  );
}

// Five-point star.
function star(cx, cy, r, fill) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const ang = (Math.PI / 5) * i - Math.PI / 2;
    const rr = i % 2 === 0 ? r : r * 0.45;
    pts.push(`${(cx + rr * Math.cos(ang)).toFixed(1)},${(cy + rr * Math.sin(ang)).toFixed(1)}`);
  }
  return <polygon key={`star-${cx}-${cy}`} points={pts.join(' ')} fill={fill} stroke="#B8860B" strokeWidth="1" />;
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

/* ════════════════════════ READING (Membaca) ════════════════════════ */


/* Alphabet Safari — cute panda. */
const ScreenAlphabetSafari = (
  <g>
    <circle cx="62" cy="82" r="14" fill="#424242" opacity="0.9" />
    <circle cx="138" cy="82" r="14" fill="#424242" opacity="0.9" />
    <ellipse cx="100" cy="100" rx="32" ry="28" fill="#F5F5F5" opacity="0.95" />
    <ellipse cx="85" cy="96" rx="10" ry="8" fill="#424242" opacity="0.9" transform="rotate(-15 85 96)" />
    <ellipse cx="115" cy="96" rx="10" ry="8" fill="#424242" opacity="0.9" transform="rotate(15 115 96)" />
    <circle cx="87" cy="96" r="4" fill="#FFF" /><circle cx="87" cy="96" r="2" fill="#212121" />
    <circle cx="113" cy="96" r="4" fill="#FFF" /><circle cx="113" cy="96" r="2" fill="#212121" />
    <circle cx="88" cy="95" r="1" fill="#FFF" /><circle cx="114" cy="95" r="1" fill="#FFF" />
    <ellipse cx="100" cy="106" rx="5" ry="4" fill="#212121" opacity="0.9" />
    <path d="M 94 110 Q 100 114 106 110" fill="none" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
    <ellipse cx="78" cy="106" rx="5" ry="3" fill="#FFAB91" opacity="0.4" />
    <ellipse cx="122" cy="106" rx="5" ry="3" fill="#FFAB91" opacity="0.4" />
    <path d="M 48 58 Q 52 51 56 58 Q 52 64 48 58" fill="#4CAF50" opacity="0.7" />
    <path d="M 144 54 Q 148 47 152 54 Q 148 60 144 54" fill="#4CAF50" opacity="0.5" />
  </g>
);

/* Letter Trace — pencil drawing the letter A (white A for contrast on orange). */
const ScreenLetterTrace = (
  <g transform="translate(0 12)">
    <defs>
      <linearGradient id="eePencil" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFE3B0" /><stop offset="100%" stopColor="#FFB74D" />
      </linearGradient>
    </defs>
    <text x="100" y="116" fontFamily="'Comic Sans MS','Arial Rounded MT Bold',Arial,sans-serif" fontSize="72" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">A</text>
    <g transform="translate(118 68) rotate(-35) scale(0.5)">
      <rect x="0" y="0" width="12" height="40" rx="2" fill="url(#eePencil)" stroke="#9C6212" strokeWidth="1" />
      <polygon points="0,40 6,50 12,40" fill="#FFE0B2" />
      <polygon points="4,46 6,50 8,46" fill="#3E2723" />
      <rect x="0" y="-7" width="12" height="7" rx="1" fill="#FF8A80" />
      <rect x="0" y="0" width="12" height="5" fill="#BDBDBD" />
    </g>
    <polygon points="125,62 126,65 129,66 126,67 125,70 124,67 121,66 124,65" fill="#FFFFFF" opacity="0.95" />
    <circle cx="55" cy="70" r="2" fill="#FFFFFF" opacity="0.7" />
    <circle cx="145" cy="75" r="2" fill="#FFFFFF" opacity="0.7" />
    <circle cx="150" cy="100" r="2" fill="#FFFFFF" opacity="0.7" />
  </g>
);

/* Phonics Pop — a/b/c balloons. */
const ScreenPhonicsPop = (
  <g transform="translate(0 20)">
    <defs>
      <radialGradient id="eeBalloonY" cx="30%" cy="30%" r="70%"><stop offset="0%" stopColor="#E1BEE7" /><stop offset="100%" stopColor="#8E24AA" /></radialGradient>
      <radialGradient id="eeBalloonB" cx="30%" cy="30%" r="70%"><stop offset="0%" stopColor="#81D4FA" /><stop offset="100%" stopColor="#0288D1" /></radialGradient>
      <radialGradient id="eeBalloonG" cx="30%" cy="30%" r="70%"><stop offset="0%" stopColor="#A5D6A7" /><stop offset="100%" stopColor="#388E3C" /></radialGradient>
    </defs>
    <ellipse cx="68" cy="78" rx="15" ry="18" fill="url(#eeBalloonY)" opacity="0.95" />
    <polygon points="68,96 65,102 71,102" fill="#6A1B9A" opacity="0.9" />
    <path d="M 68 102 Q 65 115 70 125" fill="none" stroke="#6A1B9A" strokeWidth="1.5" opacity="0.7" />
    <ellipse cx="62" cy="71" rx="5" ry="7" fill="#FFF" opacity="0.3" transform="rotate(-20 62 71)" />
    <text x="68" y="84" fontFamily="'Comic Sans MS','Arial Rounded MT Bold',Arial,sans-serif" fontSize="26" fontWeight="bold" fill="#FFFFFF" textAnchor="middle" opacity="0.95">a</text>
    <ellipse cx="100" cy="68" rx="15" ry="18" fill="url(#eeBalloonB)" opacity="0.95" />
    <polygon points="100,86 97,92 103,92" fill="#0277BD" opacity="0.9" />
    <path d="M 100 92 Q 103 105 98 115" fill="none" stroke="#0277BD" strokeWidth="1.5" opacity="0.7" />
    <ellipse cx="94" cy="61" rx="5" ry="7" fill="#FFF" opacity="0.3" transform="rotate(-20 94 61)" />
    <text x="100" y="78" fontFamily="'Comic Sans MS','Arial Rounded MT Bold',Arial,sans-serif" fontSize="26" fontWeight="bold" fill="#01579B" textAnchor="middle" opacity="0.95">b</text>
    <ellipse cx="132" cy="78" rx="15" ry="18" fill="url(#eeBalloonG)" opacity="0.95" />
    <polygon points="132,96 129,102 135,102" fill="#2E7D32" opacity="0.9" />
    <path d="M 132 102 Q 135 115 130 125" fill="none" stroke="#2E7D32" strokeWidth="1.5" opacity="0.7" />
    <ellipse cx="126" cy="71" rx="5" ry="7" fill="#FFF" opacity="0.3" transform="rotate(-20 126 71)" />
    <text x="132" y="84" fontFamily="'Comic Sans MS','Arial Rounded MT Bold',Arial,sans-serif" fontSize="26" fontWeight="bold" fill="#1B5E20" textAnchor="middle" opacity="0.95">c</text>
    <circle cx="50" cy="92" r="2.5" fill="#FFFFFF" opacity="0.85" />
    <circle cx="54" cy="100" r="1.5" fill="#FFFFFF" opacity="0.6" />
    <circle cx="150" cy="88" r="2.5" fill="#81D4FA" opacity="0.9" />
    <circle cx="146" cy="96" r="1.5" fill="#81D4FA" opacity="0.6" />
    <circle cx="100" cy="125" r="2" fill="#A5D6A7" opacity="0.7" />
  </g>
);

/* Sound Matching — headphones + equalizer. */
const ScreenSoundMatching = (
  <g transform="translate(0 17)">
    <defs>
      <linearGradient id="eeBar1" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#4DD0E1" /><stop offset="100%" stopColor="#00838F" /></linearGradient>
      <linearGradient id="eeBar2" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#4FC3F7" /><stop offset="100%" stopColor="#0288D1" /></linearGradient>
      <linearGradient id="eeBar3" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#CE93D8" /><stop offset="100%" stopColor="#7B1FA2" /></linearGradient>
    </defs>
    <path d="M 58 95 Q 58 58 100 58 Q 142 58 142 95" fill="none" stroke="#26C6DA" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
    <rect x="50" y="82" width="16" height="26" rx="6" fill="#00ACC1" opacity="0.9" />
    <rect x="54" y="86" width="8" height="18" rx="3" fill="#4DD0E1" opacity="0.7" />
    <rect x="134" y="82" width="16" height="26" rx="6" fill="#00ACC1" opacity="0.9" />
    <rect x="138" y="86" width="8" height="18" rx="3" fill="#4DD0E1" opacity="0.7" />
    <rect x="75" y="88" width="8" height="20" rx="3" fill="url(#eeBar1)" opacity="0.95" />
    <rect x="87" y="78" width="8" height="30" rx="3" fill="url(#eeBar2)" opacity="0.95" />
    <rect x="99" y="72" width="8" height="36" rx="3" fill="url(#eeBar3)" opacity="0.95" />
    <rect x="111" y="82" width="8" height="26" rx="3" fill="url(#eeBar1)" opacity="0.95" />
    <rect x="123" y="90" width="8" height="18" rx="3" fill="url(#eeBar2)" opacity="0.95" />
    <path d="M 66 95 Q 75 88 82 95" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
    <path d="M 134 95 Q 125 88 118 95" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
    {spark}
  </g>
);

/* Letter-Sound Puzzle — connected puzzle pieces a / A. */
const ScreenLetterSoundPuzzle = (
  <g transform="translate(0 22)">
    <path d="M 56 56 L 78 56 Q 78 48 84 48 Q 90 48 90 56 L 90 56 L 100 56 L 100 78 Q 108 78 108 84 Q 108 90 100 90 L 100 90 L 100 100 L 78 100 Q 78 108 72 108 Q 66 108 66 100 L 66 100 L 56 100 L 56 78 Q 48 78 48 72 Q 48 66 56 66 L 56 66 Z" fill="#7E57C2" opacity="0.97" />
    <text x="78" y="84" fontFamily="'Comic Sans MS','Arial Rounded MT Bold',Arial,sans-serif" fontSize="26" fontWeight="bold" fill="#FFF" textAnchor="middle" opacity="0.95">a</text>
    <path d="M 100 56 L 100 66 Q 100 56 106 56 Q 112 56 112 66 L 112 66 L 112 56 L 122 56 Q 122 48 128 48 Q 134 48 134 56 L 134 56 L 144 56 L 144 78 Q 152 78 152 84 Q 152 90 144 90 L 144 90 L 144 100 L 122 100 Q 122 108 116 108 Q 110 108 110 100 L 110 100 L 100 100 L 100 90 Q 108 90 108 84 Q 108 78 100 78 L 100 78 Z" fill="#2196F3" opacity="0.95" />
    <text x="122" y="84" fontFamily="'Comic Sans MS','Arial Rounded MT Bold',Arial,sans-serif" fontSize="26" fontWeight="bold" fill="#FFF" textAnchor="middle" opacity="0.95">A</text>
    <line x1="86" y1="94" x2="94" y2="94" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.95" />
    <circle cx="90" cy="94" r="5" fill="#FFFFFF" opacity="0.7" />
    {spark}
  </g>
);


/* ════════════════════════ SPEAKING (Bertutur) ════════════════════════ */

/* Sebut Huruf — say letters A / a (cool blocks for contrast on the pink face). */
const ScreenSebutHuruf = (
  <g transform="translate(0 8)">
    {blk({ x: 54, y: 72, w: 40, h: 40, top: '#4DD0C4', deep: '#00695C', t: 'A', fs: 26 })}
    {blk({ x: 106, y: 72, w: 40, h: 40, top: '#9575CD', deep: '#4527A0', t: 'a', fs: 26 })}
    <path d="M60 124 q40 -8 80 0" stroke="#FFFFFF" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeDasharray="3 3" />
    {spark}
  </g>
);

/* Sebut Perkataan — say words (speech bubble). */
const ScreenSebutPerkataan = (
  <g transform="translate(0 8)">
    <rect x="52" y="68" width="96" height="42" rx="14" fill="#FFFFFF" opacity="0.96" stroke="#2E7D32" strokeWidth="2" />
    <path d="M74 108 L74 124 L92 109 Z" fill="#FFFFFF" stroke="#2E7D32" strokeWidth="2" strokeLinejoin="round" />
    <text x="100" y="96" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="22" fill="#2E7D32">abc</text>
    {spark}
  </g>
);

/* Sebut Nombor — say numbers 1 2 3 (cool blocks for contrast on the pink face). */
const ScreenSebutNombor = (
  <g transform="translate(0 10)">
    {blk({ x: 46, y: 74, w: 32, h: 36, top: '#4DD0C4', deep: '#00695C', t: '1', fs: 20 })}
    {blk({ x: 84, y: 74, w: 32, h: 36, top: '#9575CD', deep: '#4527A0', t: '2', fs: 20 })}
    {blk({ x: 122, y: 74, w: 32, h: 36, top: '#4FC3F7', deep: '#01579B', t: '3', fs: 20 })}
    {spark}
  </g>
);

/* ════════════════════════ JAWI (Tulisan Jawi) ════════════════════════ */

/* Belajar Huruf Jawi — Jawi letter cards. */
const ScreenJawiLetterCards = (
  <g transform="translate(0 6)">
    <g transform="rotate(-6 72 92)">
      {blk({ x: 56, y: 74, w: 32, h: 38, top: '#FFFFFF', deep: '#33691E', t: 'ا', fs: 24, font: "'Amiri',serif", textFill: '#33691E', vCenter: true })}
    </g>
    <g transform="rotate(6 128 92)">
      {blk({ x: 112, y: 74, w: 32, h: 38, top: '#FFCC80', deep: '#7A4D02', t: 'ب', fs: 24, font: "'Amiri',serif", textFill: '#fff', vCenter: true })}
    </g>
    {spark}
  </g>
);

/* Padan Huruf Jawi — match Jawi letters. */
const ScreenJawiLetterMatch = (
  <g transform="translate(0 6)">
    {blk({ x: 50, y: 74, w: 30, h: 38, top: '#FFFFFF', deep: '#33691E', t: 'ج', fs: 22, font: "'Amiri',serif", textFill: '#33691E', vCenter: true, dy: -6 })}
    {blk({ x: 120, y: 74, w: 30, h: 38, top: '#90CAF9', deep: '#0B4A8E', t: 'Ha', fs: 22, font: "'Amiri',serif", textFill: '#fff', vCenter: true, dy: 2 })}
    <path d="M84 94 q16 -8 32 0" stroke="#FFEB3B" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeDasharray="3 3" />
    <circle cx="100" cy="92" r="8" fill="#FFEB3B" stroke="#33691E" strokeWidth="1.5" />
    <path d="M96 92 l3 3 5 -6" stroke="#33691E" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {spark}
  </g>
);

/* ════════════════════════ MATH (Matematik) ════════════════════════ */

/* Belajar 1–20 — number blocks. */
const ScreenNumberCards = (
  <g transform="translate(0 8)">
    {blk({ x: 56, y: 70, w: 40, h: 44, top: '#90CAF9', deep: '#0B4A8E', t: '1', fs: 30 })}
    {blk({ x: 104, y: 70, w: 40, h: 44, top: '#A5D6A7', deep: '#1F4A00', t: '2', fs: 30 })}
    {spark}
  </g>
);

/* Kira Bintang — count stars. */
const ScreenCountingStars = (
  <g transform="translate(0 6)">
    {star(70, 86, 15, '#FFD54F')}
    {star(100, 78, 17, '#FFEB3B')}
    {star(130, 86, 15, '#FFD54F')}
    <text x="100" y="128" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="16" fill="#FFEB3B">3</text>
    {spark}
  </g>
);

/* Isih Bentuk — sort shapes. */
const ScreenShapeSorter = (
  <g transform="translate(0 10)">
    <circle cx="66" cy="92" r="16" fill="#FF8B95" stroke="#7A1010" strokeWidth="2" />
    <rect x="86" y="76" width="30" height="30" rx="4" fill="#FFE082" stroke="#7A4D02" strokeWidth="2" />
    <polygon points="134,76 150,106 118,106" fill="#90CAF9" stroke="#0B4A8E" strokeWidth="2" strokeLinejoin="round" />
    {spark}
  </g>
);

/* Padankan Nombor — match a number to a count. */
const ScreenNumberMatch = (
  <g transform="translate(0 8)">
    {blk({ x: 50, y: 72, w: 34, h: 38, top: '#A5D6A7', deep: '#1F4A00', t: '3', fs: 24 })}
    <circle cx="120" cy="80" r="5" fill="#FFE082" stroke="#7A4D02" strokeWidth="1.5" />
    <circle cx="136" cy="80" r="5" fill="#FFE082" stroke="#7A4D02" strokeWidth="1.5" />
    <circle cx="128" cy="96" r="5" fill="#FFE082" stroke="#7A4D02" strokeWidth="1.5" />
    <path d="M88 92 q16 -6 28 0" stroke="#FFEB3B" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeDasharray="3 3" />
    {spark}
  </g>
);

/* Tambah Buah — add fruit. */
const ScreenAppleAddition = (
  <g transform="translate(0 6)">
    {apple(64, 92)}
    <text x="100" y="100" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="28" fill="#FFEB3B">+</text>
    {apple(136, 92)}
    {spark}
  </g>
);

/* Nombor Hilang — missing number. */
const ScreenMissingNumber = (
  <g transform="translate(0 10)">
    {blk({ x: 46, y: 74, w: 32, h: 36, top: '#90CAF9', deep: '#0B4A8E', t: '1', fs: 20 })}
    {blk({ x: 84, y: 74, w: 32, h: 36, top: '#FFFFFF', deep: '#1565C0', t: '?', fs: 22, textFill: '#1565C0' })}
    {blk({ x: 122, y: 74, w: 32, h: 36, top: '#A5D6A7', deep: '#1F4A00', t: '3', fs: 20 })}
    {spark}
  </g>
);

/* ── Map: game id → screen artwork (all age 4–6 pillars). ── */
export const GAME_INNER = {
  // Membaca
  'alphabet-safari':     ScreenAlphabetSafari,
  'letter-trace':        ScreenLetterTrace,
  'phonics-pop':         ScreenPhonicsPop,
  'sound-matching':      ScreenSoundMatching,
  'letter-sound-puzzle': ScreenLetterSoundPuzzle,
  // Bertutur
  'sebut-huruf':         ScreenSebutHuruf,
  'sebut-perkataan':     ScreenSebutPerkataan,
  'sebut-nombor':        ScreenSebutNombor,
  // Tulisan Jawi
  'jawi-letter-cards':   ScreenJawiLetterCards,
  'jawi-letter-match':   ScreenJawiLetterMatch,
  // Matematik
  'number-cards':        ScreenNumberCards,
  'counting-stars':      ScreenCountingStars,
  'shape-sorter':        ScreenShapeSorter,
  'number-match':        ScreenNumberMatch,
  'apple-addition':      ScreenAppleAddition,
  'missing-number':      ScreenMissingNumber,
};
