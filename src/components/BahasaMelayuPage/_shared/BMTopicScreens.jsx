import React from 'react';

const FONT = "'Baloo 2','Comic Sans MS',sans-serif";

/* 1.1a Merespons Soalan — a question bubble + a green "reply" check */
const SMerespons = (
  <g>
    <rect x="22" y="40" width="34" height="26" rx="8" fill="#fff" />
    <path d="M28 64 l0 8 l9 -8 z" fill="#fff" />
    <text x="39" y="59" textAnchor="middle" fontFamily={FONT} fontWeight="800" fontSize="19" fill="#FF6F00">?</text>
    <circle cx="64" cy="62" r="10" fill="#58CC02" />
    <path d="M59.5 62 l3 3 l5.5 -6.5" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </g>
);

/* 1.1b Mendengar Arahan — ear + clipboard checklist */
const SArahan = (
  <g>
    <path d="M34 45 c-8 0 -13 6 -13 12 c0 5 3 9 7 11 l0 5 c0 2 2 3 4 3 l5 0 l0 -7 c5 -2 9 -7 9 -13 c0 -7 -5 -11 -12 -11z" fill="#fff" />
    <path d="M46 49 q4 5 0 11" stroke="#FFE0B0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <rect x="52" y="43" width="22" height="27" rx="4" fill="#fff" />
    <rect x="57" y="41" width="12" height="5" rx="2" fill="#FFD25A" />
    <path d="M55 52 l2 2 l4 -4" stroke="#58CC02" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M55 59 l2 2 l4 -4" stroke="#58CC02" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="55" y1="64" x2="67" y2="64" stroke="#FFE0B0" strokeWidth="2" strokeLinecap="round" />
  </g>
);

/* 1.1c Ikut Susunan — ordered steps 1·2·3, middle highlighted */
const SSusunan = (
  <g>
    <circle cx="31" cy="58" r="9.5" fill="#fff" />
    <text x="31" y="62.5" textAnchor="middle" fontFamily={FONT} fontWeight="800" fontSize="12" fill="#FF6F00">1</text>
    <circle cx="50" cy="58" r="9.5" fill="#FFD25A" />
    <text x="50" y="62.5" textAnchor="middle" fontFamily={FONT} fontWeight="800" fontSize="12" fill="#7A3E00">2</text>
    <circle cx="69" cy="58" r="9.5" fill="#fff" />
    <text x="69" y="62.5" textAnchor="middle" fontFamily={FONT} fontWeight="800" fontSize="12" fill="#FF6F00">3</text>
  </g>
);

/* 1.1d Pesanan — an envelope (a message) */
const SPesanan = (
  <g>
    <rect x="26" y="44" width="48" height="32" rx="6" fill="#fff" />
    <path d="M26 47 l24 17 l24 -17" stroke="#FF6F00" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M26 75 l17 -14 M74 75 l-17 -14" stroke="#FFE0B0" strokeWidth="2" fill="none" strokeLinecap="round" />
  </g>
);

/* 1.1e Permintaan — speech bubble with a star (make a wish / request) */
const SPermintaan = (
  <g>
    <rect x="26" y="40" width="44" height="30" rx="8" fill="#fff" />
    <path d="M38 68 l4 8 l6 -8 z" fill="#fff" />
    <path d="M48 47 l2.5 5 5.5 0.8 -4 3.8 1.2 5.4 -4.2 -2.8 -4.2 2.8 1.2 -5.4 -4 -3.8 5.5 -0.8z" fill="#FFD25A" />
  </g>
);

/* 1.2a Bercerita (Baca Kuat) — an open book + a sound note */
const SBercerita = (
  <g>
    <path d="M50 44 q-11 -5 -23 -3 l0 27 q12 -2 23 3 q11 -5 23 -3 l0 -27 q-12 -2 -23 3 z" fill="#fff" />
    <line x1="50" y1="44" x2="50" y2="71" stroke="#FF6F00" strokeWidth="2" />
    <line x1="32" y1="51" x2="44" y2="50" stroke="#FFD0A0" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="32" y1="57" x2="44" y2="56" stroke="#FFD0A0" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="56" y1="50" x2="68" y2="51" stroke="#FFD0A0" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="56" y1="56" x2="68" y2="57" stroke="#FFD0A0" strokeWidth="1.8" strokeLinecap="round" />
  </g>
);

/* 1.2b Beri Pendapat Baik — speech bubble + thumbs up */
const SPendapatBaik = (
  <g>
    <rect x="26" y="40" width="44" height="28" rx="8" fill="#fff" />
    <path d="M40 66 l4 8 l6 -8 z" fill="#fff" />
    <rect x="44" y="49" width="18" height="16" rx="5" fill="#FFD25A" />
    <rect x="57" y="40" width="6" height="16" rx="3" fill="#FFD25A" />
    <path d="M34 44 l1.5 2 2.5 1 -2.5 1 -1.5 2 -1.5 -2 -2.5 -1 2.5 -1z" fill="#FFD25A" />
  </g>
);

/* 1.2c Nilai Murni — heart with a star (love & virtue) */
const SNilaiMurni = (
  <g>
    <path d="M50 46 c-3 -5 -9 -7 -13 -4 c-4 3 -4 9 -1 13 l14 14 l14 -14 c3 -4 3 -10 -1 -13 c-4 -3 -10 -1 -13 4z" fill="#FF6B6B" />
    <path d="M50 52 l1.5 3 3.5 0.5 -2.5 2.5 0.8 3.5 -2.8 -1.8 -2.8 1.8 0.8 -3.5 -2.5 -2.5 3.5 -0.5z" fill="#fff" />
  </g>
);

export const BM_TOPIC_SCREENS = {
  '2-1-1a-merespons-soalan': SMerespons,
  '2-1-1b-mendengar-arahan': SArahan,
  '2-1-1c-ikut-susunan': SSusunan,
  '2-1-1d-pesanan': SPesanan,
  '2-1-1e-permintaan': SPermintaan,
  '2-1-2a-bercerita': SBercerita,
  '2-1-2b-beri-pendapat-baik': SPendapatBaik,
  '2-1-2c-nilai-murni': SNilaiMurni,
};
