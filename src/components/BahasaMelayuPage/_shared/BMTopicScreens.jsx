import React from 'react';

/**
 * Per-topic artwork shown INSIDE the robot face screen (see BMTopicRobot.jsx).
 * Authored in the screen space x19..81 / y36..80 (centre ≈ 50,58). Flat, static,
 * no <filter>; white / bright fills for contrast on the coloured face.
 *
 * Keyed by topic id (ModuleData). Prototype scope: Tahun 2 · Module 1
 * ("Mendengar & Bertutur") — its 7 topics share only 2 icons today, so each now
 * gets its own context inside one shared orange robot head.
 *
 * Data-only export (react-refresh): no component is exported from this file.
 */

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

/* 1.1b Mendengar Arahan — an ear + sound waves */
const SArahan = (
  <g>
    <path d="M44 40 q-13 0 -13 13 q0 8 6 12 l0 7 q0 3 4 3 l6 0 l0 -10 q9 -4 9 -13 q0 -10 -5 -13 q-4 -2 -7 -2z" fill="#fff" />
    <path d="M60 48 q5 7 0 14" stroke="#FFE0B0" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M66 44 q9 11 0 22" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
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

/* 1.1e Permintaan — a raised hand + sparkle (a polite request) */
const SPermintaan = (
  <g>
    <g transform="translate(46 60)">
      <rect x="-12" y="-2" width="24" height="19" rx="9" fill="#fff" />
      <rect x="-11.5" y="-15" width="4.6" height="15" rx="2.3" fill="#fff" />
      <rect x="-6" y="-18" width="4.6" height="18" rx="2.3" fill="#fff" />
      <rect x="-0.3" y="-18" width="4.6" height="18" rx="2.3" fill="#fff" />
      <rect x="5.3" y="-15" width="4.6" height="15" rx="2.3" fill="#fff" />
      <rect x="-15" y="-1" width="6" height="11" rx="3" fill="#fff" transform="rotate(-28 -15 -1)" />
    </g>
    <path d="M70 42 l1.6 3.4 3.4 1.6 -3.4 1.6 -1.6 3.4 -1.6 -3.4 -3.4 -1.6 3.4 -1.6z" fill="#FFD25A" />
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

/* 1.2b Berbincang — two chat bubbles (a discussion) */
const SBerbincang = (
  <g>
    <rect x="22" y="40" width="32" height="22" rx="7" fill="#fff" />
    <path d="M28 60 l0 7 l8 -7 z" fill="#fff" />
    <circle cx="31" cy="51" r="2.3" fill="#FF6F00" />
    <circle cx="38" cy="51" r="2.3" fill="#FF6F00" />
    <circle cx="45" cy="51" r="2.3" fill="#FF6F00" />
    <rect x="50" y="54" width="28" height="19" rx="7" fill="#FFD25A" />
    <path d="M72 71 l0 6 l-7 -6 z" fill="#FFD25A" />
    <circle cx="58" cy="63.5" r="2" fill="#7A3E00" />
    <circle cx="64" cy="63.5" r="2" fill="#7A3E00" />
    <circle cx="70" cy="63.5" r="2" fill="#7A3E00" />
  </g>
);

export const BM_TOPIC_SCREENS = {
  '2-1-1a-merespons-soalan': SMerespons,
  '2-1-1b-mendengar-arahan': SArahan,
  '2-1-1c-ikut-susunan': SSusunan,
  '2-1-1d-pesanan': SPesanan,
  '2-1-1e-permintaan': SPermintaan,
  '2-1-2a-bercerita': SBercerita,
  '2-1-2b-berbincang': SBerbincang,
};
