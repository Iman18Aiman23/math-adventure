import React from 'react';
import Tahun1ModuleHubLayout from '../../../PendidikanIslamPage/Tahun1/Tahun1ModuleHubLayout';

const THEME = {
  pageGradient: 'linear-gradient(180deg,#CCFBF1 0%,#5EEAD4 50%,#0F766E 100%)',
  dark: '#0F766E',
  accent: '#14B8A6',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#CCFBF1 0%,#5EEAD4 55%,#0F766E 100%)',
  pillGradient: 'linear-gradient(180deg,#14B8A6,#0F766E)',
};

const TOPICS = [
  {
    id: 'nombor-100',
    pill: 'TOPIK 1.1',
    title: 'Nombor Bulat hingga 100',
    desc: 'Kenali nombor 1 hingga 100, nilai tempat, dan pola nombor.',
    visual: (
      <svg viewBox="0 0 100 100" width="100" height="100">
        {/* Padded background */}
        <rect x="5" y="5" width="90" height="90" rx="15" fill="#F0FDF9"/>
        <rect x="5" y="5" width="90" height="90" rx="15" fill="none" stroke="#14B8A6" strokeWidth="1.5" opacity=".45"/>

        {/* 3 digit blocks, 12–88 horizontal, 18–56 vertical */}
        {/* Block "1" — pink: x=12, center=23 */}
        <rect x="12" y="18" width="22" height="38" rx="7" fill="#EC4899"/>
        <rect x="13.5" y="19.5" width="19" height="9" rx="4.5" fill="#FBCFE8" opacity=".5"/>
        <text x="23" y="45" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="24" fontWeight="900" fill="#fff">1</text>

        {/* Block "0" — orange: x=39, center=50 */}
        <rect x="39" y="18" width="22" height="38" rx="7" fill="#F59E0B"/>
        <rect x="40.5" y="19.5" width="19" height="9" rx="4.5" fill="#FDE68A" opacity=".5"/>
        <text x="50" y="45" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="24" fontWeight="900" fill="#fff">0</text>

        {/* Block "0" — green: x=66, center=77 */}
        <rect x="66" y="18" width="22" height="38" rx="7" fill="#22C55E"/>
        <rect x="67.5" y="19.5" width="19" height="9" rx="4.5" fill="#BBF7D0" opacity=".5"/>
        <text x="77" y="45" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="24" fontWeight="900" fill="#fff">0</text>

        {/* Place value labels */}
        <text x="23" y="68" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="7.5" fontWeight="700" fill="#BE185D">Ratus</text>
        <text x="50" y="68" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="7.5" fontWeight="700" fill="#D97706">Puluh</text>
        <text x="77" y="68" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="7.5" fontWeight="700" fill="#15803D">Sa</text>

        {/* Decorative dots row */}
        <circle cx="23" cy="80" r="4" fill="#EC4899" opacity=".3"/>
        <circle cx="50" cy="80" r="4" fill="#F59E0B" opacity=".3"/>
        <circle cx="77" cy="80" r="4" fill="#22C55E" opacity=".3"/>
        <circle cx="36" cy="82" r="2.5" fill="#94A3B8" opacity=".18"/>
        <circle cx="64" cy="82" r="2.5" fill="#94A3B8" opacity=".18"/>
      </svg>
    ),
  },
  {
    id: 'tambah-tolak',
    pill: 'TOPIK 1.2',
    title: 'Operasi Tambah',
    desc: 'Belajar menambah nombor dalam lingkungan 100 dengan mudah.',
    visual: (
      <svg viewBox="0 0 100 100" width="100" height="100">
        {/* Padded background */}
        <rect x="5" y="5" width="90" height="90" rx="15" fill="#FFF7ED"/>
        <rect x="5" y="5" width="90" height="90" rx="15" fill="none" stroke="#F97316" strokeWidth="1.5" opacity=".45"/>

        {/* 3 red balls — triangle, r=7, moved up */}
        <circle cx="16" cy="21" r="7" fill="#EF4444"/>
        <circle cx="16" cy="21" r="7" fill="none" stroke="#DC2626" strokeWidth="1.2"/>
        <circle cx="13" cy="18" r="2.2" fill="#FCA5A5" opacity=".65"/>

        <circle cx="32" cy="21" r="7" fill="#EF4444"/>
        <circle cx="32" cy="21" r="7" fill="none" stroke="#DC2626" strokeWidth="1.2"/>
        <circle cx="29" cy="18" r="2.2" fill="#FCA5A5" opacity=".65"/>

        <circle cx="24" cy="36" r="7" fill="#EF4444"/>
        <circle cx="24" cy="36" r="7" fill="none" stroke="#DC2626" strokeWidth="1.2"/>
        <circle cx="21" cy="33" r="2.2" fill="#FCA5A5" opacity=".65"/>

        {/* "+" operator — vertically centred on red group, x≈47 */}
        <rect x="46" y="22" width="5" height="14" rx="2.5" fill="#F97316"/>
        <rect x="42" y="27" width="13" height="5" rx="2.5" fill="#F97316"/>

        {/* 2 green balls — right side, r=7, same top row as red */}
        <circle cx="66" cy="21" r="7" fill="#22C55E"/>
        <circle cx="66" cy="21" r="7" fill="none" stroke="#15803D" strokeWidth="1.2"/>
        <circle cx="63" cy="18" r="2.2" fill="#86EFAC" opacity=".65"/>

        <circle cx="82" cy="21" r="7" fill="#22C55E"/>
        <circle cx="82" cy="21" r="7" fill="none" stroke="#15803D" strokeWidth="1.2"/>
        <circle cx="79" cy="18" r="2.2" fill="#86EFAC" opacity=".65"/>

        {/* "=" sign — moved up, centred x=50 */}
        <rect x="39" y="51" width="22" height="4" rx="2" fill="#7C3AED"/>
        <rect x="39" y="58" width="22" height="4" rx="2" fill="#7C3AED"/>

        {/* Result "5" badge — 10px gap below "=" */}
        <circle cx="50" cy="78" r="11" fill="#FDE047"/>
        <circle cx="50" cy="78" r="11" fill="none" stroke="#EAB308" strokeWidth="2"/>
        <circle cx="44" cy="72" r="2.8" fill="#FEF9C3" opacity=".7"/>
        <text x="50" y="84" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="16" fontWeight="900" fill="#78350F">5</text>
      </svg>
    ),
  },
  {
    id: 'tambah-cerita',
    pill: 'TOPIK 1.2',
    title: 'Cerita Tolak',
    desc: 'Selesaikan masalah harian dengan operasi tolak.',
    visual: (
      <svg viewBox="0 0 100 100" width="100" height="100">
        {/* Padded background */}
        <rect x="5" y="5" width="90" height="90" rx="15" fill="#FFF1F2"/>
        <rect x="5" y="5" width="90" height="90" rx="15" fill="none" stroke="#F43F5E" strokeWidth="1.5" opacity=".45"/>

        {/* 5 circles top row — r=7, moved up to cy=21 */}
        <circle cx="16" cy="21" r="7" fill="#CBD5E1"/>
        <circle cx="16" cy="21" r="7" fill="none" stroke="#94A3B8" strokeWidth="1"/>
        <line x1="11" y1="16" x2="21" y2="26" stroke="#EF4444" strokeWidth="2.2" strokeLinecap="round"/>
        <line x1="21" y1="16" x2="11" y2="26" stroke="#EF4444" strokeWidth="2.2" strokeLinecap="round"/>

        <circle cx="33" cy="21" r="7" fill="#CBD5E1"/>
        <circle cx="33" cy="21" r="7" fill="none" stroke="#94A3B8" strokeWidth="1"/>
        <line x1="28" y1="16" x2="38" y2="26" stroke="#EF4444" strokeWidth="2.2" strokeLinecap="round"/>
        <line x1="38" y1="16" x2="28" y2="26" stroke="#EF4444" strokeWidth="2.2" strokeLinecap="round"/>

        <circle cx="50" cy="21" r="7" fill="#14B8A6"/>
        <circle cx="50" cy="21" r="7" fill="none" stroke="#0F766E" strokeWidth="1.2"/>
        <circle cx="47" cy="18" r="2" fill="#99F6E4" opacity=".7"/>

        <circle cx="67" cy="21" r="7" fill="#F97316"/>
        <circle cx="67" cy="21" r="7" fill="none" stroke="#C2410C" strokeWidth="1.2"/>
        <circle cx="64" cy="18" r="2" fill="#FED7AA" opacity=".7"/>

        <circle cx="84" cy="21" r="7" fill="#A855F7"/>
        <circle cx="84" cy="21" r="7" fill="none" stroke="#7E22CE" strokeWidth="1.2"/>
        <circle cx="81" cy="18" r="2" fill="#E9D5FF" opacity=".7"/>

        {/* Dashed bracket under circles 1–2, moved up */}
        <path d="M9 32 Q9 39 16 39 L33 39 Q40 39 40 32" fill="none" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 2" strokeLinecap="round"/>
        <text x="24.5" y="49" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="9" fontWeight="900" fill="#EF4444">−2</text>

        {/* Separator line */}
        <rect x="14" y="53" width="72" height="1.5" rx=".75" fill="#CBD5E1" opacity=".8"/>

        {/* "=" two bars — 8px gap below separator */}
        <rect x="39" y="57" width="22" height="3.5" rx="1.75" fill="#7C3AED"/>
        <rect x="39" y="63" width="22" height="3.5" rx="1.75" fill="#7C3AED"/>

        {/* 3 remaining circles — cy=79, 9px gap below "=" */}
        <circle cx="30" cy="79" r="7.5" fill="#14B8A6"/>
        <circle cx="30" cy="79" r="7.5" fill="none" stroke="#0F766E" strokeWidth="1.2"/>
        <circle cx="27" cy="76" r="2.2" fill="#99F6E4" opacity=".7"/>

        <circle cx="50" cy="79" r="7.5" fill="#F97316"/>
        <circle cx="50" cy="79" r="7.5" fill="none" stroke="#C2410C" strokeWidth="1.2"/>
        <circle cx="47" cy="76" r="2.2" fill="#FED7AA" opacity=".7"/>

        <circle cx="70" cy="79" r="7.5" fill="#A855F7"/>
        <circle cx="70" cy="79" r="7.5" fill="none" stroke="#7E22CE" strokeWidth="1.2"/>
        <circle cx="67" cy="76" r="2.2" fill="#E9D5FF" opacity=".7"/>
      </svg>
    ),
  },
  {
    id: 'pecahan-asas',
    pill: 'TOPIK 1.3',
    title: 'Pecahan Asas',
    desc: 'Kenali pecahan 1/2, 1/4 dan 3/4 melalui bentuk dan gambar rajah.',
    visual: (
      <svg viewBox="0 0 100 100" width="100" height="100">
        {/* Padded background */}
        <rect x="5" y="5" width="90" height="90" rx="15" fill="#FFFBEB"/>
        <rect x="5" y="5" width="90" height="90" rx="15" fill="none" stroke="#F59E0B" strokeWidth="1.5" opacity=".45"/>

        {/* Pie chart — cx=50, cy=38, r=24 */}
        {/* Drop shadow */}
        <circle cx="52" cy="40" r="24" fill="#D1D5DB" opacity=".35"/>

        {/* 4 quarters */}
        {/* Top-right — RED */}
        <path d="M50 38 L50 14 A24 24 0 0 1 74 38 Z" fill="#EF4444"/>
        <path d="M50 38 L50 14 A24 24 0 0 1 74 38 Z" fill="none" stroke="#fff" strokeWidth="1.8"/>
        {/* Top-left — GREEN */}
        <path d="M50 38 L50 14 A24 24 0 0 0 26 38 Z" fill="#22C55E"/>
        <path d="M50 38 L50 14 A24 24 0 0 0 26 38 Z" fill="none" stroke="#fff" strokeWidth="1.8"/>
        {/* Bottom-right — BLUE */}
        <path d="M50 38 L74 38 A24 24 0 0 1 50 62 Z" fill="#3B82F6"/>
        <path d="M50 38 L74 38 A24 24 0 0 1 50 62 Z" fill="none" stroke="#fff" strokeWidth="1.8"/>
        {/* Bottom-left — YELLOW */}
        <path d="M50 38 L26 38 A24 24 0 0 0 50 62 Z" fill="#FDE047"/>
        <path d="M50 38 L26 38 A24 24 0 0 0 50 62 Z" fill="none" stroke="#fff" strokeWidth="1.8"/>

        {/* Outer ring */}
        <circle cx="50" cy="38" r="24" fill="none" stroke="#fff" strokeWidth="2"/>

        {/* Center label — white circle with "¼" */}
        <circle cx="50" cy="38" r="9" fill="#fff" opacity=".93"/>
        <text x="50" y="34.5" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="5.5" fontWeight="900" fill="#374151">1</text>
        <line x1="44.5" y1="37.5" x2="55.5" y2="37.5" stroke="#374151" strokeWidth="1.2"/>
        <text x="50" y="44" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="5.5" fontWeight="900" fill="#374151">4</text>

        {/* 3 badge pills BELOW the pie — row at y=71 */}
        {/* Pill "½" — green: x=12 */}
        <rect x="12" y="71" width="22" height="13" rx="6.5" fill="#22C55E"/>
        <text x="23" y="81" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">1/2</text>

        {/* Pill "¼" — red: x=39 */}
        <rect x="39" y="71" width="22" height="13" rx="6.5" fill="#EF4444"/>
        <text x="50" y="81" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">1/4</text>

        {/* Pill "¾" — blue: x=66 */}
        <rect x="66" y="71" width="22" height="13" rx="6.5" fill="#3B82F6"/>
        <text x="77" y="81" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">3/4</text>
      </svg>
    ),
  },
  {
    id: 'wang-t1',
    pill: 'TOPIK 1.4',
    title: 'Wang (Ringgit & Sen)',
    desc: 'Kenali wang Malaysia dan kira nilai ringgit dan sen.',
    visual: (
      <svg viewBox="0 0 100 100" width="100" height="100">
        {/* Padded background */}
        <rect x="5" y="5" width="90" height="90" rx="15" fill="#FFFDF0"/>
        <rect x="5" y="5" width="90" height="90" rx="15" fill="none" stroke="#16A34A" strokeWidth="1.5" opacity=".4"/>

        {/* ── RM5 BANKNOTE (green, smaller) ── x=13,y=8,w=74,h=30 */}
        <rect x="15" y="18" width="74" height="30" rx="5" fill="#166534" opacity=".3"/>
        <rect x="13" y="16" width="74" height="30" rx="5" fill="#15803D"/>
        <rect x="15.5" y="18.5" width="69" height="25" rx="3.5" fill="none" stroke="#4ADE80" strokeWidth=".7" opacity=".4"/>
        {/* Horizontal texture lines */}
        <line x1="40" y1="22" x2="84" y2="22" stroke="#166534" strokeWidth="1" opacity=".6"/>
        <line x1="40" y1="26" x2="84" y2="26" stroke="#166534" strokeWidth="1" opacity=".6"/>
        <line x1="40" y1="30" x2="84" y2="30" stroke="#166534" strokeWidth="1" opacity=".6"/>
        <line x1="40" y1="34" x2="84" y2="34" stroke="#166534" strokeWidth="1" opacity=".6"/>
        <line x1="40" y1="38" x2="84" y2="38" stroke="#166534" strokeWidth="1" opacity=".6"/>
        {/* Portrait oval */}
        <ellipse cx="27" cy="31" rx="9" ry="11" fill="#166534"/>
        <ellipse cx="27" cy="29" rx="4" ry="4.5" fill="#15803D"/>
        <ellipse cx="27" cy="35" rx="5" ry="3.5" fill="#15803D"/>
        {/* "RM" label */}
        <text x="16" y="25" fontFamily="'Baloo 2',sans-serif" fontSize="6" fontWeight="900" fill="#86EFAC">RM</text>
        {/* Centre issuer text */}
        <text x="58" y="28" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="4.5" fontWeight="600" fill="#BBF7D0">RINGGIT</text>
        <text x="58" y="33" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="4.5" fontWeight="600" fill="#BBF7D0">MALAYSIA</text>
        {/* Large "5" denomination */}
        <text x="83" y="36" textAnchor="end" fontFamily="'Baloo 2',sans-serif" fontSize="24" fontWeight="900" fill="#fff" opacity=".92">5</text>
        {/* Security strip */}
        <line x1="39" y1="10" x2="39" y2="38" stroke="#4ADE80" strokeWidth="1.5" opacity=".2"/>

        {/* ── RM1 COIN (gold) — cx=29, cy=71, r=17 ── */}
        <circle cx="31" cy="73" r="17" fill="#92400E" opacity=".2"/>
        <circle cx="29" cy="71" r="17" fill="#D97706"/>
        <circle cx="29" cy="71" r="17" fill="none" stroke="#92400E" strokeWidth="2"/>
        <circle cx="29" cy="71" r="13" fill="#F59E0B"/>
        <circle cx="29" cy="71" r="13" fill="none" stroke="#D97706" strokeWidth="1"/>
        <circle cx="29" cy="71" r="10" fill="#FDE68A"/>
        {/* 5-point star — cx=29, cy=71, outer r=6.5, inner r=2.6 */}
        <polygon
          points="29,64.5 30.5,68.8 35.2,68.8 31.6,71.4 32.9,75.8 29,73.2 25.1,75.8 26.4,71.4 22.8,68.8 27.5,68.8"
          fill="#D97706" opacity=".85"
        />
        <circle cx="29" cy="71" r="2" fill="#F59E0B"/>
        <ellipse cx="23" cy="64" rx="3.5" ry="1.8" fill="#FEF9C3" opacity=".6" transform="rotate(-30 23 64)"/>
        <text x="29" y="63" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="4" fontWeight="700" fill="#92400E">RM</text>
        <text x="29" y="82" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="4.5" fontWeight="900" fill="#78350F">1 RINGGIT</text>

        {/* ── 50 SEN COIN (silver) — cx=71, cy=71, r=17 (same size) ── */}
        <circle cx="73" cy="73" r="17" fill="#64748B" opacity=".2"/>
        <circle cx="71" cy="71" r="17" fill="#94A3B8"/>
        <circle cx="71" cy="71" r="17" fill="none" stroke="#64748B" strokeWidth="1.8"/>
        <circle cx="71" cy="71" r="13" fill="#CBD5E1"/>
        <circle cx="71" cy="71" r="13" fill="none" stroke="#94A3B8" strokeWidth=".8"/>
        <circle cx="71" cy="71" r="10" fill="#E2E8F0"/>
        <ellipse cx="65" cy="64" rx="3.5" ry="1.8" fill="#F8FAFC" opacity=".75" transform="rotate(-25 65 64)"/>
        <text x="71" y="74" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontSize="10" fontWeight="900" fill="#334155">50</text>
        <text x="71" y="82" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="5" fontWeight="700" fill="#475569">SEN</text>
      </svg>
    ),
  },
];

export default function NomborModule({ onSelectTopic, language = 'bm' }) {
  return (
    <Tahun1ModuleHubLayout
        moduleNum={1}
        moduleName="Nombor dan Operasi"
        moduleNameEn="Numbers and Operations"
        theme={THEME}
        topics={TOPICS}
        onSelectTopic={onSelectTopic}
        language={language}
      />
  );
}
