import React from 'react';

function useUid(prefix) {
  const id = React.useId();
  return `${prefix}-${id.replace(/[:.]/g, '')}`;
}

/* ─── BADGE SVGs (26×26) ────────────────────────────────────── */

export function M1Badge() {
  return (
    <svg viewBox="0 0 26 26" fill="none">
      <path d="M13 3C9.7 3 7 5.7 7 9v5c0 3.3 2.7 6 6 6s6-2.7 6-6V9c0-3.3-2.7-6-6-6z" fill="rgba(255,255,255,.9)"/>
      <path d="M4 11v2a9 9 0 0018 0v-2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <line x1="13" y1="22" x2="13" y2="26" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function M2Badge() {
  return (
    <svg viewBox="0 0 26 26" fill="none">
      <path d="M3 5h10v18H3z" fill="rgba(255,255,255,.9)" rx="1"/>
      <path d="M13 5h10v18H13z" fill="rgba(255,255,255,.6)" rx="1"/>
      <line x1="13" y1="5" x2="13" y2="23" stroke="white" strokeWidth="1.5"/>
    </svg>
  );
}

export function M3Badge() {
  return (
    <svg viewBox="0 0 26 26" fill="none">
      <path d="M4 18L16 6l4 4L8 22H4v-4z" fill="rgba(255,255,255,.9)"/>
      <path d="M16 6l2-2 4 4-2 2" fill="rgba(255,255,255,.6)"/>
    </svg>
  );
}

export function M4Badge() {
  return (
    <svg viewBox="0 0 26 26" fill="none">
      <path d="M5 18 Q8 10 13 8 Q18 10 21 18" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M5 18 Q8 20 13 20 Q18 20 21 18" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function M5Badge() {
  return (
    <svg viewBox="0 0 26 26" fill="none">
      <rect x="2" y="4" width="8" height="8" rx="2" fill="rgba(255,255,255,.9)"/>
      <rect x="12" y="4" width="8" height="8" rx="2" fill="rgba(255,255,255,.6)"/>
      <rect x="7" y="14" width="8" height="8" rx="2" fill="rgba(255,255,255,.8)"/>
    </svg>
  );
}

/* ─── MODUL 1 TOPIC SVGs (100×100) ──────────────────────────── */

export function M1Topic1() {
  const uid = useUid('m1t1');
  return (
    <svg viewBox="0 0 100 100" fill="none">
      <defs>
        <radialGradient id={`${uid}-g`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFF0D0"/>
          <stop offset="100%" stopColor="rgba(255,193,7,0)"/>
        </radialGradient>
        <linearGradient id={`${uid}-f`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FEE9C8"/>
          <stop offset="100%" stopColor="#E8821A"/>
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="92" rx="26" ry="4.5" fill="rgba(232,130,26,.14)"/>
      <circle cx="50" cy="46" r="30" fill={`url(#${uid}-g)`} className="pulse"/>
      <g className="floatA">
        <path d="M42 26 Q28 26 28 44 Q28 60 40 64 Q44 65 46 62 Q48 60 44 58 Q36 54 36 44 Q36 34 42 30 Q52 24 60 32 Q68 40 64 52 Q62 58 56 60 Q52 61 52 64 Q52 68 48 70 Q44 74 46 78" stroke={`url(#${uid}-f)`} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="46" cy="79" r="3" fill="#E8821A"/>
      </g>
      <g className="floatA d1">
        <path className="wave" d="M66 38 Q72 44 66 50" stroke="#E8821A" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
        <path className="wave w2" d="M72 32 Q82 44 72 56" stroke="#E8821A" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

export function M1Topic2() {
  const uid = useUid('m1t2');
  return (
    <svg viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={`${uid}-f`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FEE9C8"/><stop offset="100%" stopColor="#E8821A"/>
        </linearGradient>
        <radialGradient id={`${uid}-g`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFF0D0"/><stop offset="100%" stopColor="rgba(255,193,7,0)"/>
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="92" rx="26" ry="4.5" fill="rgba(232,130,26,.14)"/>
      <circle cx="50" cy="46" r="30" fill={`url(#${uid}-g)`} className="pulse"/>
      <g className="floatA">
        <rect x="18" y="22" width="44" height="30" rx="10" fill={`url(#${uid}-f)`} stroke="#A34F0A" strokeWidth="1.5"/>
        <path d="M30 52 L26 62 L40 52" fill={`url(#${uid}-f)`} stroke="#A34F0A" strokeWidth="1.2" strokeLinejoin="round"/>
        <circle cx="31" cy="37" r="4" fill="white"/>
        <circle cx="40" cy="37" r="4" fill="white"/>
        <circle cx="49" cy="37" r="4" fill="white"/>
      </g>
      <g className="bob">
        <rect x="50" y="50" width="28" height="18" rx="7" fill="white" stroke="#E8821A" strokeWidth="1.5"/>
        <path d="M60 68 L58 75 L66 68" fill="white" stroke="#E8821A" strokeWidth="1.2" strokeLinejoin="round"/>
        <rect x="55" y="55" width="14" height="3" rx="1.5" fill="#E8821A"/>
        <rect x="55" y="61" width="10" height="3" rx="1.5" fill="#E8821A"/>
      </g>
    </svg>
  );
}

/* ─── MODUL 2 TOPIC SVGs (100×100) ──────────────────────────── */

export function M2Topic1() {
  const uid = useUid('m2t1');
  return (
    <svg viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={`${uid}-f`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D5E9FA"/><stop offset="100%" stopColor="#1E7AC9"/>
        </linearGradient>
        <radialGradient id={`${uid}-g`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#E8F4FF"/><stop offset="100%" stopColor="rgba(30,122,201,0)"/>
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="92" rx="26" ry="4.5" fill="rgba(30,122,201,.14)"/>
      <circle cx="50" cy="46" r="30" fill={`url(#${uid}-g)`} className="pulse"/>
      <g className="floatA">
        <path d="M18 30 Q18 28 20 28 L48 30 L48 72 Q34 70 18 72 Z" fill="white" stroke="#1E7AC9" strokeWidth="1.5"/>
        <path d="M82 30 Q82 28 80 28 L52 30 L52 72 Q66 70 82 72 Z" fill="#D5E9FA" stroke="#1E7AC9" strokeWidth="1.5"/>
        <path d="M48 30 L52 30 L52 72 L48 72 Z" fill="#1E7AC9"/>
      </g>
      <g className="bob">
        <rect x="22" y="36" width="18" height="14" rx="3" fill="#1E7AC9"/>
        <text x="31" y="47" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="8" fontWeight="800" fill="white">ng</text>
        <rect x="22" y="54" width="18" height="14" rx="3" fill="#0E4A7E"/>
        <text x="31" y="65" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="8" fontWeight="800" fill="white">ai</text>
        <rect x="56" y="36" width="18" height="14" rx="3" fill="#1E7AC9"/>
        <text x="65" y="47" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="8" fontWeight="800" fill="white">ny</text>
        <rect x="56" y="54" width="18" height="14" rx="3" fill="#0E4A7E"/>
        <text x="65" y="65" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="8" fontWeight="800" fill="white">au</text>
      </g>
    </svg>
  );
}

export function M2Topic2() {
  const uid = useUid('m2t2');
  return (
    <svg viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={`${uid}-f`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D5E9FA"/><stop offset="100%" stopColor="#1E7AC9"/>
        </linearGradient>
        <radialGradient id={`${uid}-g`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#E8F4FF"/><stop offset="100%" stopColor="rgba(30,122,201,0)"/>
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="92" rx="26" ry="4.5" fill="rgba(30,122,201,.14)"/>
      <circle cx="50" cy="46" r="30" fill={`url(#${uid}-g)`} className="pulse"/>
      <g className="floatA">
        <path d="M20 42 Q20 38 24 38 L48 40 L48 74 Q34 72 20 74 Z" fill="white" stroke="#1E7AC9" strokeWidth="1.5"/>
        <path d="M80 42 Q80 38 76 38 L52 40 L52 74 Q66 72 80 74 Z" fill="#D5E9FA" stroke="#1E7AC9" strokeWidth="1.5"/>
        <path d="M48 40 L52 40 L52 74 L48 74 Z" fill="#1E7AC9"/>
        <line x1="26" y1="48" x2="44" y2="48" stroke="#1E7AC9" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="26" y1="54" x2="44" y2="54" stroke="#1E7AC9" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="26" y1="60" x2="38" y2="60" stroke="#1E7AC9" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="56" y1="48" x2="74" y2="48" stroke="#0E4A7E" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="56" y1="54" x2="74" y2="54" stroke="#0E4A7E" strokeWidth="1.8" strokeLinecap="round"/>
      </g>
      <g className="bob">
        <ellipse cx="39" cy="28" rx="6" ry="5" fill="white" stroke="#1E7AC9" strokeWidth="1.5"/>
        <circle cx="39" cy="28" r="2.5" fill="#1E7AC9"/>
        <ellipse cx="61" cy="28" rx="6" ry="5" fill="white" stroke="#1E7AC9" strokeWidth="1.5"/>
        <circle cx="61" cy="28" r="2.5" fill="#1E7AC9"/>
      </g>
    </svg>
  );
}

export function M2Topic3() {
  const uid = useUid('m2t3');
  return (
    <svg viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={`${uid}-f`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7DB8ED"/><stop offset="100%" stopColor="#0E4A7E"/>
        </linearGradient>
        <radialGradient id={`${uid}-g`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#E8F4FF"/><stop offset="100%" stopColor="rgba(30,122,201,0)"/>
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="92" rx="26" ry="4.5" fill="rgba(30,122,201,.14)"/>
      <circle cx="50" cy="46" r="30" fill={`url(#${uid}-g)`} className="pulse"/>
      <g className="floatA">
        <circle cx="44" cy="42" r="18" fill="white" stroke={`url(#${uid}-f)`} strokeWidth="4"/>
        <circle cx="44" cy="42" r="13" fill="#D5E9FA"/>
        <line x1="36" y1="38" x2="52" y2="38" stroke="#1E7AC9" strokeWidth="2" strokeLinecap="round"/>
        <line x1="36" y1="43" x2="52" y2="43" stroke="#1E7AC9" strokeWidth="2" strokeLinecap="round"/>
        <line x1="36" y1="48" x2="46" y2="48" stroke="#1E7AC9" strokeWidth="2" strokeLinecap="round"/>
        <line x1="57" y1="55" x2="72" y2="72" stroke={`url(#${uid}-f)`} strokeWidth="5" strokeLinecap="round"/>
      </g>
      <g className="bob">
        <circle cx="76" cy="28" r="9" fill="#FFD968" stroke="#E8821A" strokeWidth="1.5"/>
        <path d="M73 33 Q76 30 79 33" stroke="#E8821A" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

/* ─── MODUL 3 TOPIC SVGs (100×100) ──────────────────────────── */

export function M3Topic1() {
  const uid = useUid('m3t1');
  return (
    <svg viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={`${uid}-f`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C5A8EE"/><stop offset="100%" stopColor="#7A4FD0"/>
        </linearGradient>
        <radialGradient id={`${uid}-g`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#F0EBFF"/><stop offset="100%" stopColor="rgba(122,79,208,0)"/>
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="92" rx="26" ry="4.5" fill="rgba(122,79,208,.14)"/>
      <circle cx="50" cy="46" r="30" fill={`url(#${uid}-g)`} className="pulse"/>
      <g className="floatA">
        <rect x="44" y="18" width="12" height="50" rx="3" fill={`url(#${uid}-f)`} transform="rotate(-20 50 50)"/>
        <path d="M37 68 L41 56 L53 60 Z" fill="#F5D04A" transform="rotate(-20 50 50)"/>
        <path d="M41 56 L53 60 L47 58 Z" fill="#2D1B60" transform="rotate(-20 50 50)"/>
        <rect x="44" y="16" width="12" height="7" rx="2" fill="#F39BC0" transform="rotate(-20 50 50)"/>
      </g>
      <g className="bob">
        <line x1="24" y1="76" x2="56" y2="76" stroke="#7A4FD0" strokeWidth="2" strokeLinecap="round"/>
        <line x1="28" y1="82" x2="52" y2="82" stroke="#7A4FD0" strokeWidth="2" strokeLinecap="round" opacity=".5"/>
      </g>
    </svg>
  );
}

export function M3Topic2() {
  const uid = useUid('m3t2');
  return (
    <svg viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={`${uid}-f`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#EBE2FB"/><stop offset="100%" stopColor="#7A4FD0"/>
        </linearGradient>
        <radialGradient id={`${uid}-g`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#F0EBFF"/><stop offset="100%" stopColor="rgba(122,79,208,0)"/>
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="92" rx="26" ry="4.5" fill="rgba(122,79,208,.14)"/>
      <circle cx="50" cy="46" r="30" fill={`url(#${uid}-g)`} className="pulse"/>
      <g className="floatA">
        <rect x="24" y="22" width="52" height="62" rx="6" fill="white" stroke="#7A4FD0" strokeWidth="1.8"/>
        <path d="M62 22 L76 36 L62 36 Z" fill="#EBE2FB" stroke="#7A4FD0" strokeWidth="1.2"/>
        <line x1="32" y1="44" x2="68" y2="44" stroke="#B49EEE" strokeWidth="2" strokeLinecap="round"/>
        <line x1="32" y1="52" x2="68" y2="52" stroke="#B49EEE" strokeWidth="2" strokeLinecap="round"/>
        <line x1="32" y1="60" x2="56" y2="60" stroke="#B49EEE" strokeWidth="2" strokeLinecap="round"/>
      </g>
      <g className="bob">
        <path d="M60 62 L72 50 L76 54 L64 66 L60 66 Z" fill="#7A4FD0"/>
        <path d="M64 66 L60 66 L60 62" fill="#3F2A86"/>
      </g>
    </svg>
  );
}

export function M3Topic3() {
  const uid = useUid('m3t3');
  return (
    <svg viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={`${uid}-f`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#EBE2FB"/><stop offset="100%" stopColor="#7A4FD0"/>
        </linearGradient>
        <radialGradient id={`${uid}-g`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#F0EBFF"/><stop offset="100%" stopColor="rgba(122,79,208,0)"/>
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="92" rx="26" ry="4.5" fill="rgba(122,79,208,.14)"/>
      <circle cx="50" cy="46" r="30" fill={`url(#${uid}-g)`} className="pulse"/>
      <g className="floatA">
        <rect x="26" y="26" width="48" height="58" rx="6" fill="white" stroke="#7A4FD0" strokeWidth="1.8"/>
        <rect x="38" y="22" width="24" height="9" rx="4" fill="#7A4FD0"/>
        <text x="32" y="48" fontFamily="Baloo 2,sans-serif" fontSize="9" fontWeight="800" fill="#7A4FD0">S:</text>
        <line x1="44" y1="46" x2="68" y2="46" stroke="#B49EEE" strokeWidth="2" strokeLinecap="round"/>
        <text x="32" y="60" fontFamily="Baloo 2,sans-serif" fontSize="9" fontWeight="800" fill="#3F2A86">J:</text>
        <line x1="44" y1="58" x2="68" y2="58" stroke="#B49EEE" strokeWidth="2" strokeLinecap="round"/>
        <line x1="44" y1="64" x2="62" y2="64" stroke="#B49EEE" strokeWidth="2" strokeLinecap="round"/>
      </g>
      <g className="bob">
        <circle cx="72" cy="30" r="10" fill="#7A4FD0"/>
        <path d="M67 30 l3 3 6-6" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </svg>
  );
}

/* ─── MODUL 4 TOPIC SVGs (100×100) ──────────────────────────── */

export function M4Topic1() {
  const uid = useUid('m4t1');
  return (
    <svg viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={`${uid}-f`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FCDCEA"/><stop offset="100%" stopColor="#E8568A"/>
        </linearGradient>
        <radialGradient id={`${uid}-g`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFF0F6"/><stop offset="100%" stopColor="rgba(232,86,138,0)"/>
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="92" rx="26" ry="4.5" fill="rgba(232,86,138,.14)"/>
      <circle cx="50" cy="46" r="30" fill={`url(#${uid}-g)`} className="pulse"/>
      <g className="floatA">
        <rect x="28" y="28" width="44" height="50" rx="4" fill="white" stroke="#E8568A" strokeWidth="1.8"/>
        <ellipse cx="50" cy="28" rx="22" ry="5" fill="#FCDCEA" stroke="#E8568A" strokeWidth="1.5"/>
        <ellipse cx="50" cy="78" rx="22" ry="5" fill="#FCDCEA" stroke="#E8568A" strokeWidth="1.5"/>
        <line x1="34" y1="38" x2="66" y2="38" stroke="#E8568A" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="34" y1="45" x2="60" y2="45" stroke="#E8568A" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="34" y1="54" x2="66" y2="54" stroke="#F39BC0" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="34" y1="61" x2="58" y2="61" stroke="#F39BC0" strokeWidth="1.8" strokeLinecap="round"/>
      </g>
      <g className="bob">
        <path d="M72 22 L74 28 L80 28 L75 32 L77 38 L72 34 L67 38 L69 32 L64 28 L70 28 Z" fill="#FFD968" stroke="#E8821A" strokeWidth="1"/>
      </g>
    </svg>
  );
}

export function M4Topic2() {
  const uid = useUid('m4t2');
  return (
    <svg viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={`${uid}-f`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FCDCEA"/><stop offset="100%" stopColor="#E8568A"/>
        </linearGradient>
        <radialGradient id={`${uid}-g`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFF0F6"/><stop offset="100%" stopColor="rgba(232,86,138,0)"/>
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="92" rx="26" ry="4.5" fill="rgba(232,86,138,.14)"/>
      <circle cx="50" cy="46" r="30" fill={`url(#${uid}-g)`} className="pulse"/>
      <g className="floatA">
        <path d="M44 62 L44 30 L72 24 L72 40 L44 46" fill={`url(#${uid}-f)`} stroke="#A81E59" strokeWidth="1.5" strokeLinejoin="round"/>
        <ellipse cx="40" cy="64" rx="8" ry="6" fill="#E8568A" stroke="#A81E59" strokeWidth="1.5"/>
        <ellipse cx="68" cy="42" rx="8" ry="6" fill="#E8568A" stroke="#A81E59" strokeWidth="1.5"/>
      </g>
      <g className="bob">
        <rect x="16" y="22" width="26" height="18" rx="6" fill="white" stroke="#E8568A" strokeWidth="1.5"/>
        <path d="M24 40 L22 48 L32 40" fill="white" stroke="#E8568A" strokeWidth="1.2" strokeLinejoin="round"/>
        <circle cx="24" cy="31" r="2.5" fill="#E8568A"/>
        <circle cx="29" cy="31" r="2.5" fill="#E8568A"/>
        <circle cx="34" cy="31" r="2.5" fill="#E8568A"/>
      </g>
    </svg>
  );
}

/* ─── MODUL 5 TOPIC SVGs (100×100) ──────────────────────────── */

export function M5Topic1() {
  const uid = useUid('m5t1');
  return (
    <svg viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={`${uid}-f`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D6F4F0"/><stop offset="100%" stopColor="#159E96"/>
        </linearGradient>
        <radialGradient id={`${uid}-g`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#E0F8F6"/><stop offset="100%" stopColor="rgba(21,158,150,0)"/>
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="92" rx="26" ry="4.5" fill="rgba(21,158,150,.14)"/>
      <circle cx="50" cy="46" r="30" fill={`url(#${uid}-g)`} className="pulse"/>
      <g className="floatA">
        <rect x="20" y="24" width="60" height="16" rx="5" fill={`url(#${uid}-f)`} stroke="#0B5E5A" strokeWidth="1.5"/>
        <text x="50" y="36" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="9" fontWeight="800" fill="white">Kata Nama</text>
        <rect x="20" y="44" width="60" height="16" rx="5" fill="#159E96" stroke="#0B5E5A" strokeWidth="1.5"/>
        <text x="50" y="56" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="9" fontWeight="800" fill="white">Kata Kerja</text>
        <rect x="20" y="64" width="60" height="16" rx="5" fill="#0B5E5A" stroke="#0B5E5A" strokeWidth="1.5"/>
        <text x="50" y="76" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="9" fontWeight="800" fill="white">Kata Adjektif</text>
      </g>
    </svg>
  );
}

export function M5Topic2() {
  const uid = useUid('m5t2');
  return (
    <svg viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={`${uid}-f`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D6F4F0"/><stop offset="100%" stopColor="#159E96"/>
        </linearGradient>
        <radialGradient id={`${uid}-g`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#E0F8F6"/><stop offset="100%" stopColor="rgba(21,158,150,0)"/>
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="92" rx="26" ry="4.5" fill="rgba(21,158,150,.14)"/>
      <circle cx="50" cy="46" r="30" fill={`url(#${uid}-g)`} className="pulse"/>
      <g className="floatA">
        <rect x="14" y="38" width="20" height="22" rx="4" fill="#159E96" stroke="#0B5E5A" strokeWidth="1.5"/>
        <text x="24" y="52" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="7.5" fontWeight="800" fill="white">meN-</text>
        <text x="40" y="52" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="14" fontWeight="800" fill="#0B5E5A">+</text>
        <rect x="46" y="34" width="26" height="30" rx="4" fill="white" stroke="#159E96" strokeWidth="2"/>
        <text x="59" y="53" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="8" fontWeight="800" fill="#159E96">ajar</text>
        <text x="77" y="52" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="12" fontWeight="800" fill="#0B5E5A">=</text>
      </g>
      <g className="bob">
        <rect x="24" y="68" width="52" height="16" rx="4" fill="#0B5E5A"/>
        <text x="50" y="80" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="8.5" fontWeight="800" fill="white">mengajar</text>
      </g>
    </svg>
  );
}

export function M5Topic3() {
  const uid = useUid('m5t3');
  return (
    <svg viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={`${uid}-f`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D6F4F0"/><stop offset="100%" stopColor="#159E96"/>
        </linearGradient>
        <radialGradient id={`${uid}-g`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#E0F8F6"/><stop offset="100%" stopColor="rgba(21,158,150,0)"/>
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="92" rx="26" ry="4.5" fill="rgba(21,158,150,.14)"/>
      <circle cx="50" cy="46" r="30" fill={`url(#${uid}-g)`} className="pulse"/>
      <g className="floatA">
        <rect x="14" y="30" width="30" height="22" rx="5" fill={`url(#${uid}-f)`} stroke="#0B5E5A" strokeWidth="1.5"/>
        <text x="29" y="40" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="7" fontWeight="700" fill="white">Subjek</text>
        <text x="29" y="49" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="6.5" fontWeight="700" fill="rgba(255,255,255,.8)">Ali</text>
        <rect x="48" y="36" width="22" height="14" rx="4" fill="#FFD968" stroke="#E8821A" strokeWidth="1.2"/>
        <text x="59" y="47" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="7" fontWeight="800" fill="#A34F0A">kerana</text>
        <rect x="74" y="30" width="16" height="22" rx="5" fill="#0B5E5A" stroke="#0B5E5A" strokeWidth="1.5"/>
        <text x="82" y="42" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="6" fontWeight="800" fill="white">Pre-</text>
        <text x="82" y="49" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="6" fontWeight="800" fill="white">dikat</text>
      </g>
      <g className="bob">
        <rect x="14" y="60" width="72" height="20" rx="4" fill="white" stroke="#159E96" strokeWidth="1.5"/>
        <text x="50" y="73" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontSize="7.5" fontWeight="700" fill="#0B5E5A">Ayat Majmuk</text>
      </g>
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
