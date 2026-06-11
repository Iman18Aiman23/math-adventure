import React from 'react';

function useUid(prefix) {
  const id = React.useId();
  return `${prefix}-${id.replace(/[:.]/g, '')}`;
}

/* ─── BADGE SVGs (26×26) ────────────────────────────────────── */

export function M1Badge() {
  return (
    <svg viewBox="0 0 26 26" fill="none">
      <rect x="1" y="1" width="24" height="24" rx="6" fill="#FF8C42"/>
      <rect x="1" y="1" width="24" height="24" rx="6" stroke="rgba(255,255,255,.35)" strokeWidth="1.5"/>
      <path d="M9 8 Q7 8 7 12 Q7 15 10 16 L10 19 Q10 20 13 20 L13 16 Q16 15 16 12 Q16 8 14 8Z" fill="white"/>
      <path d="M10 9 Q8 9 8 12 Q8 14 10.5 15" stroke="#FFD166" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M11 11 Q10 11 10 12.5 Q10 13.5 11.5 14" stroke="#FFD166" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function M2Badge() {
  return (
    <svg viewBox="0 0 26 26" fill="none">
      <rect x="1" y="1" width="24" height="24" rx="6" fill="#4ECDC4"/>
      <rect x="1" y="1" width="24" height="24" rx="6" stroke="rgba(255,255,255,.35)" strokeWidth="1.5"/>
      <path d="M6 7h14v6l-4 4H6Z" fill="white"/>
      <path d="M14 17 L14 13 L20 13" fill="none" stroke="#4ECDC4" strokeWidth="1.3" strokeLinejoin="round"/>
      <line x1="8" y1="9" x2="14" y2="9" stroke="#4ECDC4" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="8" y1="11" x2="12" y2="11" stroke="#4ECDC4" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}

export function M3Badge() {
  return (
    <svg viewBox="0 0 26 26" fill="none">
      <rect x="1" y="1" width="24" height="24" rx="6" fill="#9B5DE5"/>
      <rect x="1" y="1" width="24" height="24" rx="6" stroke="rgba(255,255,255,.35)" strokeWidth="1.5"/>
      <path d="M17 5l4 4-8 8H9l-4-4z" fill="white"/>
      <circle cx="7" cy="19" r="2.5" fill="#F15BB5"/>
      <line x1="9" y1="17" x2="13" y2="21" stroke="#9B5DE5" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}

export function M4Badge() {
  return (
    <svg viewBox="0 0 26 26" fill="none">
      <rect x="1" y="1" width="24" height="24" rx="6" fill="#F15BB5"/>
      <rect x="1" y="1" width="24" height="24" rx="6" stroke="rgba(255,255,255,.35)" strokeWidth="1.5"/>
      <path d="M13 4l2.5 5 5.5.8L17 14l1 5.8L13 17l-5 2.8L9 14l-4-3.2L10.5 9Z" fill="white"/>
      <circle cx="13" cy="11.5" r="1.8" fill="#F15BB5"/>
    </svg>
  );
}

export function M5Badge() {
  return (
    <svg viewBox="0 0 26 26" fill="none">
      <rect x="1" y="1" width="24" height="24" rx="6" fill="#06D6A0"/>
      <rect x="1" y="1" width="24" height="24" rx="6" stroke="rgba(255,255,255,.35)" strokeWidth="1.5"/>
      <path d="M5 10 L10 5 L15 8 L17 6 L19 10 L14 14 L9 12 Z" fill="white"/>
      <circle cx="10" cy="10" r="1.5" fill="#06D6A0"/>
      <circle cx="15" cy="10" r="1.5" fill="#06D6A0"/>
      <circle cx="12" cy="14" r="1.5" fill="#06D6A0"/>
    </svg>
  );
}

/* ─── MODUL 1 TOPIC SVGs (100×100) ──────────────────────────── */
/* Module: Mendengar & Bertutur — warm orange/coral           */

export function M1Topic1() {
  const uid = useUid('m1t1');
  return (
    <svg viewBox="0 0 100 100" width="100" height="100" fill="none">
      <defs>
        <radialGradient id={`${uid}-bg`} cx="38%" cy="28%" r="85%">
          <stop offset="0%" stopColor="#FFC78C"/>
          <stop offset="55%" stopColor="#EE7F1F"/>
          <stop offset="100%" stopColor="#B85E08"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill={`url(#${uid}-bg)`}/>
      <circle cx="50" cy="50" r="48" stroke="rgba(255,255,255,.35)" strokeWidth="2"/>
      <ellipse cx="50" cy="92" rx="18" ry="3" fill="rgba(0,0,0,.08)"/>
      <g className="floatA">
        <path d="M40 26Q22 26 22 46Q22 60 32 66L32 76Q32 82 38 82L48 82L48 68Q58 64 58 54Q58 40 52 32Q48 27 42 26Z" fill="white"/>
        <path d="M41 34Q30 34 30 46Q30 54 36 58Q38 56 36 52Q33 49 33 46Q33 40 41 38Q46 40 47 46Q48 52 45 56L46 74L50 74L50 60Q54 55 51 47Q49 40 45 36Z" fill="#FFD166"/>
      </g>
      <g className="bob">
        <path className="wave" d="M66 38Q73 46 66 54" stroke="white" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
        <path className="wave w2" d="M74 31Q85 46 74 61" stroke="#FFD166" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      </g>
      <path d="M74 16l1.8 3.6 3.6 1.8-3.6 1.8-1.8 3.6-1.8-3.6-3.6-1.8 3.6-1.8Z" fill="#FFD166"/>
      <circle cx="22" cy="22" r="2.5" fill="white" opacity=".7"/>
    </svg>
  );
}

export function M1Topic2() {
  const uid = useUid('m1t2');
  return (
    <svg viewBox="0 0 100 100" width="100" height="100" fill="none">
      <defs>
        <radialGradient id={`${uid}-bg`} cx="38%" cy="28%" r="85%">
          <stop offset="0%" stopColor="#FF9E82"/>
          <stop offset="55%" stopColor="#E85D3A"/>
          <stop offset="100%" stopColor="#B23A20"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill={`url(#${uid}-bg)`}/>
      <circle cx="50" cy="50" r="48" stroke="rgba(255,255,255,.35)" strokeWidth="2"/>
      <ellipse cx="50" cy="92" rx="18" ry="3" fill="rgba(0,0,0,.08)"/>
      <g className="bob">
        <path d="M44 22Q40 22 40 26L40 36Q40 40 44 40L64 40L72 47L70 40Q76 40 76 34L76 26Q76 22 72 22Z" fill="#FFD166"/>
        <circle cx="50" cy="31" r="2.2" fill="#8A5200"/>
        <circle cx="58" cy="31" r="2.2" fill="#8A5200"/>
        <circle cx="66" cy="31" r="2.2" fill="#8A5200"/>
      </g>
      <g className="floatA">
        <path d="M28 40Q22 40 22 46L22 64Q22 70 28 70L36 70L34 80L46 70L60 70Q66 70 66 64L66 46Q66 40 60 40Z" fill="white"/>
        <circle cx="36" cy="55" r="3" fill="#E85D3A"/>
        <circle cx="44" cy="55" r="3" fill="#E85D3A"/>
        <circle cx="52" cy="55" r="3" fill="#E85D3A"/>
      </g>
      <path d="M22 26l1.8 3.6 3.6 1.8-3.6 1.8-1.8 3.6-1.8-3.6-3.6-1.8 3.6-1.8Z" fill="white" opacity=".9"/>
      <circle cx="78" cy="60" r="2.5" fill="#FFD166" opacity=".9"/>
    </svg>
  );
}

/* ─── TAHUN 1 MODUL 1 PER-TOPIC SVGs (100×100) ──────────────── */
/* A–Z journey: one distinct icon per topic 1.1–1.7            */

export function M1Vokal() {
  const uid = useUid('m1vokal');
  return (
    <svg viewBox="0 0 100 100" width="100" height="100" fill="none">
      <defs>
        <radialGradient id={`${uid}-bg`} cx="38%" cy="28%" r="85%">
          <stop offset="0%" stopColor="#FFD9A0"/>
          <stop offset="55%" stopColor="#F9A03F"/>
          <stop offset="100%" stopColor="#D96E07"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill={`url(#${uid}-bg)`}/>
      <circle cx="50" cy="50" r="48" stroke="rgba(255,255,255,.35)" strokeWidth="2"/>
      <ellipse cx="50" cy="92" rx="18" ry="3" fill="rgba(0,0,0,.08)"/>
      <g className="floatA">
        <rect x="31" y="27" width="38" height="38" rx="10" fill="white" transform="rotate(-5 50 46)"/>
        <rect x="31" y="27" width="38" height="38" rx="10" stroke="#FFD166" strokeWidth="2.5" transform="rotate(-5 50 46)"/>
        <text x="50" y="56" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="27" fontWeight="800" fill="#E8821A" transform="rotate(-5 50 46)">A</text>
      </g>
      <g className="bob">
        <circle cx="22" cy="32" r="9" fill="#F15BB5"/>
        <text x="22" y="35.5" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="10" fontWeight="800" fill="white">E</text>
        <circle cx="78" cy="32" r="9" fill="#4ECDC4"/>
        <text x="78" y="35.5" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="10" fontWeight="800" fill="white">I</text>
      </g>
      <g className="floatA d1">
        <circle cx="22" cy="70" r="9" fill="#9B5DE5"/>
        <text x="22" y="73.5" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="10" fontWeight="800" fill="white">O</text>
        <circle cx="78" cy="70" r="9" fill="#FFD166"/>
        <text x="78" y="73.5" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="10" fontWeight="800" fill="#7A4A00">U</text>
      </g>
      <path d="M50 12l1.8 4 4 1.8-4 1.8-1.8 4-1.8-4-4-1.8 4-1.8Z" fill="white" opacity=".9"/>
    </svg>
  );
}

export function M1KonsonanBJ() {
  const uid = useUid('m1kbj');
  return (
    <svg viewBox="0 0 100 100" width="100" height="100" fill="none">
      <defs>
        <radialGradient id={`${uid}-bg`} cx="38%" cy="28%" r="85%">
          <stop offset="0%" stopColor="#FFB199"/>
          <stop offset="55%" stopColor="#F2602F"/>
          <stop offset="100%" stopColor="#C8431B"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill={`url(#${uid}-bg)`}/>
      <circle cx="50" cy="50" r="48" stroke="rgba(255,255,255,.35)" strokeWidth="2"/>
      <ellipse cx="50" cy="92" rx="18" ry="3" fill="rgba(0,0,0,.08)"/>
      <g className="bob">
        <g transform="rotate(-8 51 36)">
          <rect x="39" y="24" width="24" height="24" rx="6" fill="white"/>
          <rect x="39" y="24" width="24" height="24" rx="6" stroke="#FFD166" strokeWidth="2"/>
          <text x="51" y="42" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="14" fontWeight="800" fill="#E8542F">B</text>
        </g>
      </g>
      <g className="floatA">
        <rect x="25" y="52" width="24" height="24" rx="6" fill="#FFD166"/>
        <text x="37" y="70" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="14" fontWeight="800" fill="#8A5200">D</text>
        <rect x="53" y="52" width="24" height="24" rx="6" fill="#4ECDC4"/>
        <text x="65" y="70" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="14" fontWeight="800" fill="white">J</text>
      </g>
      <path d="M76 20l1.8 3.6 3.6 1.8-3.6 1.8-1.8 3.6-1.8-3.6-3.6-1.8 3.6-1.8Z" fill="#FFD166"/>
      <circle cx="25" cy="30" r="2.5" fill="white" opacity=".7"/>
    </svg>
  );
}

export function M1KonsonanKR() {
  const uid = useUid('m1kkr');
  return (
    <svg viewBox="0 0 100 100" width="100" height="100" fill="none">
      <defs>
        <radialGradient id={`${uid}-bg`} cx="38%" cy="28%" r="85%">
          <stop offset="0%" stopColor="#FFE08A"/>
          <stop offset="55%" stopColor="#F4B41A"/>
          <stop offset="100%" stopColor="#C98A00"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill={`url(#${uid}-bg)`}/>
      <circle cx="50" cy="50" r="48" stroke="rgba(255,255,255,.35)" strokeWidth="2"/>
      <ellipse cx="50" cy="92" rx="18" ry="3" fill="rgba(0,0,0,.08)"/>
      <g className="floatA">
        <path d="M18 32 Q50 44 82 32" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M24 34 L40 37 L34 56 Z" fill="#F15BB5"/>
        <text x="32" y="45" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="9" fontWeight="800" fill="white">K</text>
        <path d="M42 38 L58 38 L50 58 Z" fill="white"/>
        <text x="50" y="48" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="9" fontWeight="800" fill="#E8821A">N</text>
        <path d="M60 37 L76 34 L68 56 Z" fill="#4ECDC4"/>
        <text x="68" y="45" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="9" fontWeight="800" fill="white">R</text>
      </g>
      <g className="bob">
        <rect x="31" y="66" width="38" height="15" rx="7.5" fill="white"/>
        <text x="50" y="77" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="9" fontWeight="800" fill="#C8431B">K – R</text>
      </g>
      <circle cx="22" cy="50" r="2.5" fill="white" opacity=".7"/>
      <circle cx="79" cy="48" r="2.5" fill="#F15BB5" opacity=".8"/>
    </svg>
  );
}

export function M1KonsonanSZ() {
  const uid = useUid('m1ksz');
  return (
    <svg viewBox="0 0 100 100" width="100" height="100" fill="none">
      <defs>
        <radialGradient id={`${uid}-bg`} cx="38%" cy="28%" r="85%">
          <stop offset="0%" stopColor="#C9A6F2"/>
          <stop offset="55%" stopColor="#8E54D9"/>
          <stop offset="100%" stopColor="#6633B0"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill={`url(#${uid}-bg)`}/>
      <circle cx="50" cy="50" r="48" stroke="rgba(255,255,255,.35)" strokeWidth="2"/>
      <ellipse cx="50" cy="92" rx="18" ry="3" fill="rgba(0,0,0,.08)"/>
      <g className="floatA">
        <g transform="rotate(-16 36 48)">
          <rect x="22" y="34" width="28" height="28" rx="7" fill="#FFD166"/>
          <text x="36" y="54" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="15" fontWeight="800" fill="#8A5200">S</text>
        </g>
        <g transform="rotate(14 64 48)">
          <rect x="50" y="34" width="28" height="28" rx="7" fill="#4ECDC4"/>
          <text x="64" y="54" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="15" fontWeight="800" fill="white">V</text>
        </g>
        <rect x="35" y="44" width="30" height="30" rx="8" fill="white"/>
        <rect x="35" y="44" width="30" height="30" rx="8" stroke="#FFD166" strokeWidth="2"/>
        <text x="50" y="66" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="17" fontWeight="800" fill="#7A3FD0">Z</text>
      </g>
      <g className="bob">
        <path d="M50 14l2.4 4.8 5.2.8-3.8 3.7.9 5.2-4.7-2.4-4.7 2.4.9-5.2-3.8-3.7 5.2-.8Z" fill="#FFD166"/>
      </g>
      <circle cx="22" cy="40" r="2.5" fill="white" opacity=".7"/>
      <circle cx="79" cy="42" r="2.5" fill="white" opacity=".5"/>
    </svg>
  );
}

export function M1SukuKata() {
  const uid = useUid('m1suku');
  return (
    <svg viewBox="0 0 100 100" width="100" height="100" fill="none">
      <defs>
        <radialGradient id={`${uid}-bg`} cx="38%" cy="28%" r="85%">
          <stop offset="0%" stopColor="#9CCFF7"/>
          <stop offset="55%" stopColor="#3D8FD6"/>
          <stop offset="100%" stopColor="#1D5FA0"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill={`url(#${uid}-bg)`}/>
      <circle cx="50" cy="50" r="48" stroke="rgba(255,255,255,.35)" strokeWidth="2"/>
      <ellipse cx="50" cy="92" rx="18" ry="3" fill="rgba(0,0,0,.08)"/>
      <g className="floatA">
        <rect x="19" y="26" width="27" height="23" rx="6" fill="white"/>
        <text x="32.5" y="42" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="11" fontWeight="800" fill="#1E7AC9">bo</text>
        <text x="50" y="43" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="14" fontWeight="800" fill="#FFD166">+</text>
        <rect x="54" y="26" width="27" height="23" rx="6" fill="#FFD166"/>
        <text x="67.5" y="42" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="11" fontWeight="800" fill="#7A4A00">la</text>
        <path d="M50 51 L50 57" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M46.5 54 L50 57.5 L53.5 54" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <g className="bob">
        <rect x="26" y="61" width="48" height="20" rx="10" fill="white"/>
        <text x="46" y="75" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="12" fontWeight="800" fill="#1D5FA0">bola</text>
        <circle cx="64" cy="71" r="5.5" fill="#F15BB5"/>
        <circle cx="64" cy="71" r="2" fill="white"/>
      </g>
    </svg>
  );
}

export function M1DengarTeka() {
  const uid = useUid('m1teka');
  return (
    <svg viewBox="0 0 100 100" width="100" height="100" fill="none">
      <defs>
        <radialGradient id={`${uid}-bg`} cx="38%" cy="28%" r="85%">
          <stop offset="0%" stopColor="#F9A8C9"/>
          <stop offset="55%" stopColor="#E85D94"/>
          <stop offset="100%" stopColor="#C2356B"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill={`url(#${uid}-bg)`}/>
      <circle cx="50" cy="50" r="48" stroke="rgba(255,255,255,.35)" strokeWidth="2"/>
      <ellipse cx="50" cy="92" rx="18" ry="3" fill="rgba(0,0,0,.08)"/>
      <g className="floatA">
        <path d="M28 56 Q28 26 50 26 Q72 26 72 56" stroke="white" strokeWidth="6" fill="none" strokeLinecap="round"/>
        <rect x="21" y="52" width="13" height="21" rx="6.5" fill="white"/>
        <rect x="66" y="52" width="13" height="21" rx="6.5" fill="white"/>
        <text x="50" y="70" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="30" fontWeight="800" fill="#FFD166">?</text>
      </g>
      <g className="bob">
        <path className="wave" d="M16 42 Q12 48 16 54" stroke="#FFD166" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path className="wave w2" d="M84 42 Q88 48 84 54" stroke="#FFD166" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      </g>
      <circle cx="30" cy="20" r="2.5" fill="white" opacity=".7"/>
      <circle cx="72" cy="18" r="2" fill="#FFD166" opacity=".9"/>
    </svg>
  );
}

export function M1FrasaBergambar() {
  const uid = useUid('m1frasa');
  return (
    <svg viewBox="0 0 100 100" width="100" height="100" fill="none">
      <defs>
        <radialGradient id={`${uid}-bg`} cx="38%" cy="28%" r="85%">
          <stop offset="0%" stopColor="#9FE2B8"/>
          <stop offset="55%" stopColor="#3FBF77"/>
          <stop offset="100%" stopColor="#178A4C"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill={`url(#${uid}-bg)`}/>
      <circle cx="50" cy="50" r="48" stroke="rgba(255,255,255,.35)" strokeWidth="2"/>
      <ellipse cx="50" cy="92" rx="18" ry="3" fill="rgba(0,0,0,.08)"/>
      <g className="floatA">
        <rect x="23" y="22" width="54" height="38" rx="7" fill="white"/>
        <rect x="27" y="26" width="46" height="30" rx="4" fill="#BEE9FF"/>
        <circle cx="38" cy="35" r="5" fill="#FFD166"/>
        <path d="M27 56 L41 42 L51 52 L59 45 L73 56 Z" fill="#2F9D5F"/>
      </g>
      <g className="bob">
        <rect x="25" y="66" width="34" height="8" rx="4" fill="white"/>
        <rect x="63" y="66" width="12" height="8" rx="4" fill="#FFD166"/>
        <rect x="25" y="78" width="22" height="8" rx="4" fill="white" opacity=".85"/>
      </g>
      <circle cx="80" cy="80" r="2.5" fill="white" opacity=".7"/>
    </svg>
  );
}

/* ─── MODUL 2 TOPIC SVGs (100×100) ──────────────────────────── */
/* Module: Membaca — teal/navy/sky                            */

export function M2Topic1() {
  const uid = useUid('m2t1');
  return (
    <svg viewBox="0 0 100 100" width="100" height="100" fill="none">
      <defs>
        <radialGradient id={`${uid}-bg`} cx="38%" cy="28%" r="85%">
          <stop offset="0%" stopColor="#A7EFE8"/>
          <stop offset="55%" stopColor="#2BB5AB"/>
          <stop offset="100%" stopColor="#0E7E76"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill={`url(#${uid}-bg)`}/>
      <circle cx="50" cy="50" r="48" stroke="rgba(255,255,255,.35)" strokeWidth="2"/>
      <ellipse cx="50" cy="92" rx="18" ry="3" fill="rgba(0,0,0,.08)"/>
      <g className="floatA">
        <rect x="26" y="24" width="52" height="48" rx="7" fill="rgba(255,255,255,.4)"/>
        <rect x="20" y="29" width="52" height="48" rx="7" fill="white"/>
        <rect x="25" y="34" width="42" height="17" rx="5" fill="#2BB5AB"/>
        <text x="46" y="46" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="8" fontWeight="800" fill="white">suku</text>
        <rect x="25" y="55" width="42" height="17" rx="5" fill="#FFD166"/>
        <text x="46" y="67" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="8" fontWeight="800" fill="#8A5200">kata</text>
      </g>
      <g className="bob">
        <circle cx="74" cy="24" r="8" fill="#F15BB5"/>
        <path d="M70.5 24l2.5 2.8 4.5-5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <circle cx="18" cy="42" r="2.5" fill="white" opacity=".6"/>
      <circle cx="82" cy="56" r="2.5" fill="#FFD166" opacity=".8"/>
    </svg>
  );
}

export function M2Topic2() {
  const uid = useUid('m2t2');
  return (
    <svg viewBox="0 0 100 100" width="100" height="100" fill="none">
      <defs>
        <radialGradient id={`${uid}-bg`} cx="38%" cy="28%" r="85%">
          <stop offset="0%" stopColor="#A9C2E8"/>
          <stop offset="55%" stopColor="#46699C"/>
          <stop offset="100%" stopColor="#2A4368"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill={`url(#${uid}-bg)`}/>
      <circle cx="50" cy="50" r="48" stroke="rgba(255,255,255,.35)" strokeWidth="2"/>
      <ellipse cx="50" cy="92" rx="18" ry="3" fill="rgba(0,0,0,.12)"/>
      <g className="bob">
        <ellipse cx="40" cy="23" rx="7" ry="6" fill="white"/>
        <circle cx="40" cy="24" r="3" fill="#2A4368"/>
        <ellipse cx="60" cy="23" rx="7" ry="6" fill="white"/>
        <circle cx="60" cy="24" r="3" fill="#2A4368"/>
      </g>
      <g className="floatA">
        <rect x="22" y="36" width="56" height="19" rx="6" fill="white"/>
        <rect x="27" y="41" width="32" height="9" rx="4.5" fill="#4ECDC4"/>
        <text x="43" y="48" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="6" fontWeight="800" fill="white">perkataan</text>
        <rect x="22" y="60" width="56" height="19" rx="6" fill="white"/>
        <rect x="27" y="65" width="36" height="9" rx="4.5" fill="#FFD166"/>
        <text x="45" y="72" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="6" fontWeight="800" fill="#8A5200">membaca</text>
      </g>
      <circle cx="18" cy="50" r="2.5" fill="white" opacity=".6"/>
      <circle cx="82" cy="30" r="2.5" fill="#FFD166" opacity=".8"/>
    </svg>
  );
}

export function M2Topic3() {
  const uid = useUid('m2t3');
  return (
    <svg viewBox="0 0 100 100" width="100" height="100" fill="none">
      <defs>
        <radialGradient id={`${uid}-bg`} cx="38%" cy="28%" r="85%">
          <stop offset="0%" stopColor="#C8E9FA"/>
          <stop offset="55%" stopColor="#5FB6E0"/>
          <stop offset="100%" stopColor="#2274A5"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill={`url(#${uid}-bg)`}/>
      <circle cx="50" cy="50" r="48" stroke="rgba(255,255,255,.35)" strokeWidth="2"/>
      <ellipse cx="50" cy="92" rx="18" ry="3" fill="rgba(0,0,0,.08)"/>
      <g className="floatA">
        <circle cx="44" cy="43" r="20" fill="white"/>
        <circle cx="44" cy="43" r="14" fill="#5FB6E0"/>
        <line x1="36" y1="38" x2="52" y2="38" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="36" y1="44" x2="52" y2="44" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="36" y1="50" x2="47" y2="50" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M59 58L75 74" stroke="#E8821A" strokeWidth="7" strokeLinecap="round"/>
        <path d="M59 58L75 74" stroke="#FFD166" strokeWidth="3" strokeLinecap="round"/>
      </g>
      <g className="bob">
        <circle cx="75" cy="25" r="8" fill="#FFD166"/>
        <circle cx="72.5" cy="23" r="1.2" fill="#8A5200"/>
        <circle cx="77.5" cy="23" r="1.2" fill="#8A5200"/>
        <path d="M71.5 27 Q75 30.5 78.5 27" stroke="#8A5200" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      </g>
      <circle cx="22" cy="28" r="2.5" fill="white" opacity=".7"/>
      <circle cx="24" cy="72" r="2.5" fill="#F15BB5" opacity=".8"/>
    </svg>
  );
}

/* ─── MODUL 3 TOPIC SVGs (100×100) ──────────────────────────── */
/* Module: Menulis — purple/deep purple/pink                 */

export function M3Topic1() {
  const uid = useUid('m3t1');
  return (
    <svg viewBox="0 0 100 100" width="100" height="100" fill="none">
      <defs>
        <radialGradient id={`${uid}-bg`} cx="38%" cy="28%" r="85%">
          <stop offset="0%" stopColor="#D4B5F7"/>
          <stop offset="55%" stopColor="#9B5DE5"/>
          <stop offset="100%" stopColor="#6F2DBD"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill={`url(#${uid}-bg)`}/>
      <circle cx="50" cy="50" r="48" stroke="rgba(255,255,255,.35)" strokeWidth="2"/>
      <ellipse cx="50" cy="92" rx="18" ry="3" fill="rgba(0,0,0,.1)"/>
      <g className="floatA">
        <rect x="30" y="16" width="13" height="46" rx="3" fill="white" transform="rotate(-15 50 46)"/>
        <rect x="30" y="16" width="13" height="13" rx="3" fill="#F15BB5" transform="rotate(-15 50 46)"/>
        <path d="M30 62 L30 62 L43 62 L37.5 76 Z" fill="#FFD166" transform="rotate(-15 50 46)"/>
        <path d="M35 68.5 L40 68.5 L37.5 76 Z" fill="#8A5200" transform="rotate(-15 50 46)"/>
      </g>
      <g className="bob">
        <path d="M30 78 Q40 73 50 78 Q60 83 70 78" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity=".8"/>
      </g>
      <path d="M74 24l1.8 3.6 3.6 1.8-3.6 1.8-1.8 3.6-1.8-3.6-3.6-1.8 3.6-1.8Z" fill="#FFD166"/>
      <circle cx="24" cy="32" r="2.5" fill="white" opacity=".7"/>
    </svg>
  );
}

export function M3Topic2() {
  const uid = useUid('m3t2');
  return (
    <svg viewBox="0 0 100 100" width="100" height="100" fill="none">
      <defs>
        <radialGradient id={`${uid}-bg`} cx="38%" cy="28%" r="85%">
          <stop offset="0%" stopColor="#BE93EC"/>
          <stop offset="55%" stopColor="#7B2CBF"/>
          <stop offset="100%" stopColor="#511C84"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill={`url(#${uid}-bg)`}/>
      <circle cx="50" cy="50" r="48" stroke="rgba(255,255,255,.35)" strokeWidth="2"/>
      <ellipse cx="50" cy="92" rx="18" ry="3" fill="rgba(0,0,0,.12)"/>
      <g className="floatA">
        <rect x="26" y="20" width="50" height="54" rx="6" fill="rgba(255,255,255,.45)"/>
        <rect x="21" y="25" width="50" height="54" rx="6" fill="white"/>
        <line x1="29" y1="37" x2="63" y2="37" stroke="#9B5DE5" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="29" y1="45" x2="63" y2="45" stroke="#F15BB5" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="29" y1="53" x2="50" y2="53" stroke="#FFD166" strokeWidth="2.5" strokeLinecap="round"/>
      </g>
      <g className="bob">
        <circle cx="66" cy="66" r="12" fill="#06D6A0"/>
        <circle cx="66" cy="66" r="12" stroke="rgba(255,255,255,.6)" strokeWidth="2"/>
        <path d="M60 66l4 4 8-8" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <circle cx="22" cy="30" r="2.5" fill="white" opacity=".7"/>
      <circle cx="80" cy="38" r="2.5" fill="#FFD166" opacity=".8"/>
    </svg>
  );
}

export function M3Topic3() {
  const uid = useUid('m3t3');
  return (
    <svg viewBox="0 0 100 100" width="100" height="100" fill="none">
      <defs>
        <radialGradient id={`${uid}-bg`} cx="38%" cy="28%" r="85%">
          <stop offset="0%" stopColor="#F8A9CF"/>
          <stop offset="55%" stopColor="#F15BB5"/>
          <stop offset="100%" stopColor="#BE2D88"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill={`url(#${uid}-bg)`}/>
      <circle cx="50" cy="50" r="48" stroke="rgba(255,255,255,.35)" strokeWidth="2"/>
      <ellipse cx="50" cy="92" rx="18" ry="3" fill="rgba(0,0,0,.08)"/>
      <g className="floatA">
        <line x1="35" y1="42" x2="50" y2="62" stroke="white" strokeWidth="3" strokeLinecap="round" opacity=".7"/>
        <line x1="65" y1="42" x2="50" y2="62" stroke="white" strokeWidth="3" strokeLinecap="round" opacity=".7"/>
        <line x1="35" y1="42" x2="65" y2="42" stroke="white" strokeWidth="3" strokeLinecap="round" opacity=".7"/>
        <circle cx="35" cy="40" r="13" fill="white"/>
        <circle cx="65" cy="40" r="13" fill="white"/>
        <circle cx="50" cy="64" r="13" fill="white"/>
        <circle cx="35" cy="40" r="7" fill="#9B5DE5"/>
        <circle cx="65" cy="40" r="7" fill="#FFD166"/>
        <circle cx="50" cy="64" r="7" fill="#06D6A0"/>
      </g>
      <g className="bob">
        <path d="M76 64l1.8 3.6 3.6 1.8-3.6 1.8-1.8 3.6-1.8-3.6-3.6-1.8 3.6-1.8Z" fill="#FFD166"/>
        <circle cx="22" cy="64" r="2.5" fill="white" opacity=".7"/>
      </g>
    </svg>
  );
}

/* ─── MODUL 4 TOPIC SVGs (100×100) ──────────────────────────── */
/* Module: Seni Bahasa — yellow/pink                        */

export function M4Topic1() {
  const uid = useUid('m4t1');
  return (
    <svg viewBox="0 0 100 100" width="100" height="100" fill="none">
      <defs>
        <radialGradient id={`${uid}-bg`} cx="38%" cy="28%" r="85%">
          <stop offset="0%" stopColor="#FFF3B0"/>
          <stop offset="55%" stopColor="#F6C824"/>
          <stop offset="100%" stopColor="#D49B00"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill={`url(#${uid}-bg)`}/>
      <circle cx="50" cy="50" r="48" stroke="rgba(255,255,255,.4)" strokeWidth="2"/>
      <ellipse cx="50" cy="92" rx="18" ry="3" fill="rgba(0,0,0,.08)"/>
      <g className="floatA">
        <path d="M50 74 C28 58 22 43 32 33.5 C39.5 27 48 30.5 50 39 C52 30.5 60.5 27 68 33.5 C78 43 72 58 50 74Z" fill="white"/>
        <path d="M50 63 C37 53.5 33.5 45 39.5 39.5 C44 35.5 49 37.6 50 43 C51 37.6 56 35.5 60.5 39.5 C66.5 45 63 53.5 50 63Z" fill="#F15BB5"/>
      </g>
      <g className="bob">
        <path d="M73 14 L73 27" stroke="#7B2CBF" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M73 14 Q79 16 80 21" stroke="#7B2CBF" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <circle cx="70" cy="27.5" r="3.5" fill="#7B2CBF"/>
      </g>
      <path d="M22 28l1.8 3.6 3.6 1.8-3.6 1.8-1.8 3.6-1.8-3.6-3.6-1.8 3.6-1.8Z" fill="white" opacity=".9"/>
      <circle cx="80" cy="56" r="2.5" fill="white" opacity=".7"/>
    </svg>
  );
}

export function M4Topic2() {
  const uid = useUid('m4t2');
  return (
    <svg viewBox="0 0 100 100" width="100" height="100" fill="none">
      <defs>
        <radialGradient id={`${uid}-bg`} cx="38%" cy="28%" r="85%">
          <stop offset="0%" stopColor="#F9A8C9"/>
          <stop offset="55%" stopColor="#E8568A"/>
          <stop offset="100%" stopColor="#B22558"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill={`url(#${uid}-bg)`}/>
      <circle cx="50" cy="50" r="48" stroke="rgba(255,255,255,.35)" strokeWidth="2"/>
      <ellipse cx="50" cy="92" rx="18" ry="3" fill="rgba(0,0,0,.08)"/>
      <g className="floatA">
        <path d="M50 20l6 12 13.5 2-9.7 9.5 2.3 13.4L50 50.6 37.9 56.9l2.3-13.4-9.7-9.5 13.5-2Z" fill="white"/>
        <path d="M50 28l3.6 7.2 8.1 1.2-5.8 5.7 1.4 8L50 46.3l-7.3 3.8 1.4-8-5.8-5.7 8.1-1.2Z" fill="#FFD166"/>
      </g>
      <g className="bob">
        <circle cx="26" cy="56" r="4" fill="#FFD166" opacity=".9"/>
        <circle cx="74" cy="56" r="4" fill="#4ECDC4" opacity=".9"/>
        <circle cx="34" cy="70" r="3" fill="white" opacity=".7"/>
        <circle cx="66" cy="70" r="3" fill="white" opacity=".7"/>
        <circle cx="50" cy="78" r="2.5" fill="#FFD166" opacity=".8"/>
      </g>
      <circle cx="24" cy="28" r="2.5" fill="white" opacity=".7"/>
      <circle cx="76" cy="28" r="2.5" fill="white" opacity=".7"/>
    </svg>
  );
}

/* ─── MODUL 5 TOPIC SVGs (100×100) ──────────────────────────── */
/* Module: Tatabahasa — green/cerulean/gold                 */

export function M5Topic1() {
  const uid = useUid('m5t1');
  return (
    <svg viewBox="0 0 100 100" width="100" height="100" fill="none">
      <defs>
        <radialGradient id={`${uid}-bg`} cx="38%" cy="28%" r="85%">
          <stop offset="0%" stopColor="#9FF0D2"/>
          <stop offset="55%" stopColor="#06C495"/>
          <stop offset="100%" stopColor="#038A65"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill={`url(#${uid}-bg)`}/>
      <circle cx="50" cy="50" r="48" stroke="rgba(255,255,255,.35)" strokeWidth="2"/>
      <ellipse cx="50" cy="92" rx="18" ry="3" fill="rgba(0,0,0,.08)"/>
      <g className="floatA">
        <rect x="24" y="22" width="52" height="16" rx="8" fill="white"/>
        <text x="50" y="33.5" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="7" fontWeight="800" fill="#038A65">Kata Nama</text>
      </g>
      <g className="floatA d1">
        <rect x="24" y="42" width="52" height="16" rx="8" fill="#118AB2"/>
        <text x="50" y="53.5" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="7" fontWeight="800" fill="white">Kata Kerja</text>
      </g>
      <g className="floatA d2">
        <rect x="24" y="62" width="52" height="16" rx="8" fill="#FFD166"/>
        <text x="50" y="73.5" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="7" fontWeight="800" fill="#8A5200">Kata Sifat</text>
      </g>
      <circle cx="19" cy="32" r="2.5" fill="white" opacity=".7"/>
      <path d="M80 30l1.8 3.6 3.6 1.8-3.6 1.8-1.8 3.6-1.8-3.6-3.6-1.8 3.6-1.8Z" fill="#FFD166"/>
    </svg>
  );
}

export function M5Topic2() {
  const uid = useUid('m5t2');
  return (
    <svg viewBox="0 0 100 100" width="100" height="100" fill="none">
      <defs>
        <radialGradient id={`${uid}-bg`} cx="38%" cy="28%" r="85%">
          <stop offset="0%" stopColor="#A6DCF2"/>
          <stop offset="55%" stopColor="#118AB2"/>
          <stop offset="100%" stopColor="#0A5C7E"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill={`url(#${uid}-bg)`}/>
      <circle cx="50" cy="50" r="48" stroke="rgba(255,255,255,.35)" strokeWidth="2"/>
      <ellipse cx="50" cy="92" rx="18" ry="3" fill="rgba(0,0,0,.1)"/>
      <g className="floatA">
        <rect x="20" y="36" width="26" height="20" rx="6" fill="#FFD166"/>
        <text x="33" y="50" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="9" fontWeight="800" fill="#8A5200">me+</text>
        <rect x="54" y="36" width="26" height="20" rx="6" fill="white"/>
        <text x="67" y="50" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="9" fontWeight="800" fill="#0A5C7E">lukis</text>
        <path d="M50 58 L50 64" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M46.5 61 L50 64.5 L53.5 61" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <g className="bob">
        <rect x="26" y="67" width="48" height="17" rx="8.5" fill="#06D6A0"/>
        <text x="50" y="79" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="9" fontWeight="800" fill="white">melukis</text>
      </g>
      <circle cx="24" cy="24" r="2.5" fill="white" opacity=".7"/>
      <path d="M74 18l1.8 3.6 3.6 1.8-3.6 1.8-1.8 3.6-1.8-3.6-3.6-1.8 3.6-1.8Z" fill="#FFD166"/>
    </svg>
  );
}

export function M5Topic3() {
  const uid = useUid('m5t3');
  return (
    <svg viewBox="0 0 100 100" width="100" height="100" fill="none">
      <defs>
        <radialGradient id={`${uid}-bg`} cx="38%" cy="28%" r="85%">
          <stop offset="0%" stopColor="#FFE49A"/>
          <stop offset="55%" stopColor="#F0AC15"/>
          <stop offset="100%" stopColor="#C98A00"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill={`url(#${uid}-bg)`}/>
      <circle cx="50" cy="50" r="48" stroke="rgba(255,255,255,.4)" strokeWidth="2"/>
      <ellipse cx="50" cy="92" rx="18" ry="3" fill="rgba(0,0,0,.08)"/>
      <g className="floatA">
        <rect x="17" y="28" width="29" height="19" rx="6" fill="white"/>
        <text x="31.5" y="41" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="7" fontWeight="800" fill="#8A5200">Subjek</text>
        <rect x="54" y="28" width="29" height="19" rx="6" fill="#118AB2"/>
        <text x="68.5" y="41" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="7" fontWeight="800" fill="white">Predikat</text>
        <path d="M46 37.5L52 37.5" stroke="#8A5200" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M48.5 35l-3 2.5 3 2.5" stroke="#8A5200" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <g className="bob">
        <rect x="26" y="56" width="48" height="18" rx="9" fill="#06D6A0"/>
        <text x="50" y="68.5" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="7.5" fontWeight="800" fill="white">Ayat Lengkap</text>
      </g>
      <circle cx="22" cy="58" r="2.5" fill="white" opacity=".8"/>
      <path d="M78 60l1.8 3.6 3.6 1.8-3.6 1.8-1.8 3.6-1.8-3.6-3.6-1.8 3.6-1.8Z" fill="white" opacity=".9"/>
    </svg>
  );
}

/* ─── SHARED TROPHY SVG (100×100) ───────────────────────────── */

export function TrophyIcon() {
  const uid = useUid('trophy');
  return (
    <svg viewBox="0 0 100 100" fill="none">
      <defs>
        <radialGradient id={`${uid}-g`} cx="40%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#FFF6D6"/>
          <stop offset="55%" stopColor="#FFD050"/>
          <stop offset="100%" stopColor="#E0A012"/>
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="90" rx="22" ry="4" fill="rgba(0,0,0,.16)"/>
      <g className="bob">
        <path d="M30 24H70V40Q70 58 50 60Q30 58 30 40Z" fill={`url(#${uid}-g)`} stroke="#A9740A" strokeWidth="2.2" strokeLinejoin="round"/>
        <path d="M30 28H20Q16 28 16 34Q16 44 30 46" fill="none" stroke="#A9740A" strokeWidth="3"/>
        <path d="M70 28H80Q84 28 84 34Q84 44 70 46" fill="none" stroke="#A9740A" strokeWidth="3"/>
        <rect x="45" y="59" width="10" height="11" fill="#C8860A"/>
        <rect x="33" y="70" width="34" height="8" rx="2.5" fill={`url(#${uid}-g)`} stroke="#A9740A" strokeWidth="1.8"/>
        <path d="M43 36l4.5 5 9-10" stroke="#fff" strokeWidth="3.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </svg>
  );
}
