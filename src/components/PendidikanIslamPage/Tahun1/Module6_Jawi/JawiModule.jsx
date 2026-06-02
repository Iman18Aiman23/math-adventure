import React, { useState } from 'react';
import Tahun1ModuleHubLayout from '../Tahun1ModuleHubLayout';
import SpeechManager from '../../../../services/SpeechManager';

const THEME = {
  pageGradient: 'linear-gradient(180deg, #ECFDF5 0%, #D1FAE5 40%, #F0FDFA 100%)',
  dark: '#065F46',
  accent: '#10B981',
  stageGradient: 'linear-gradient(145deg, #065F46, #10B981, #34D399)',
  pillGradient: 'linear-gradient(135deg, #10B981, #34D399)',
};

const topics = [
  {
    id: 'huruf-jawi-tunggal',
    title: 'Tahap 1 (KV)',
    desc: <>Sebutan ringkas Jawi KV<br />(Contoh: Ba-ca)</>,
    num: '6.1',
    visual: (
      <svg viewBox="0 0 100 100" fill="none">
        <defs>
          <radialGradient id="m6-kv-badge" cx="38%" cy="30%" r="80%"><stop offset="0%" stopColor="#FFF6D6"/><stop offset="55%" stopColor="#FFD050"/><stop offset="100%" stopColor="#E0A012"/></radialGradient>
        </defs>
        <ellipse cx="50" cy="92" rx="26" ry="4.5" fill="rgba(11,94,90,.14)"/>
        <g className="floatA">
          <rect x="24" y="26" width="52" height="56" rx="11" fill="#FFFFFF" stroke="#0B5E5A" strokeWidth="2"/>
          <path d="M24 37 V37 Q24 26 35 26 L65 26 Q76 26 76 37 L76 37 Z" fill="#159E96"/>
          <text x="50" y="32.5" textAnchor="middle" dominantBaseline="central" fontFamily="Baloo 2,sans-serif" fontSize="5" fontWeight="800" letterSpacing=".1em" fill="#fff">TAHAP 1</text>
          <text x="50" y="60" textAnchor="middle" dominantBaseline="central" fontFamily="Amiri,serif" fontSize="30" fontWeight="700" fill="#0B5E5A">بَا</text>
          <text x="50" y="76" textAnchor="middle" dominantBaseline="central" fontFamily="Baloo 2,sans-serif" fontSize="7" fontWeight="700" fill="#159E96">ba</text>
        </g>
        <g className="bob">
          <circle cx="74" cy="28" r="11.5" fill="url(#m6-kv-badge)" stroke="#A9740A" strokeWidth="1.4"/>
          <circle cx="74" cy="28" r="11.5" fill="none" stroke="#FFF6D6" strokeWidth=".8" opacity=".7"/>
          <text x="74" y="29" textAnchor="middle" dominantBaseline="central" fontFamily="Baloo 2,sans-serif" fontSize="9" fontWeight="800" fill="#0B5E5A">KV</text>
        </g>
      </svg>
    ),
  },
  {
    id: 'suku-kata-terbuka-jawi',
    title: 'Tahap 2 (KVK)',
    desc: <>Sebutan tertutup Jawi KVK<br />(Contoh: Ma-kan)</>,
    num: '6.2',
    visual: (
      <svg viewBox="0 0 100 100" fill="none">
        <defs>
          <radialGradient id="m6-kvk-badge" cx="38%" cy="30%" r="80%"><stop offset="0%" stopColor="#FFF6D6"/><stop offset="55%" stopColor="#FFD050"/><stop offset="100%" stopColor="#E0A012"/></radialGradient>
        </defs>
        <ellipse cx="50" cy="92" rx="26" ry="4.5" fill="rgba(11,94,90,.14)"/>
        <g className="floatA">
          <rect x="24" y="26" width="52" height="56" rx="11" fill="#FFFFFF" stroke="#0B5E5A" strokeWidth="2"/>
          <path d="M24 37 V37 Q24 26 35 26 L65 26 Q76 26 76 37 L76 37 Z" fill="#159E96"/>
          <text x="50" y="32.5" textAnchor="middle" dominantBaseline="central" fontFamily="Baloo 2,sans-serif" fontSize="5" fontWeight="800" letterSpacing=".1em" fill="#fff">TAHAP 2</text>
          <text x="50" y="60" textAnchor="middle" dominantBaseline="central" fontFamily="Amiri,serif" fontSize="28" fontWeight="700" fill="#0B5E5A">مَنْ</text>
          <text x="50" y="76" textAnchor="middle" dominantBaseline="central" fontFamily="Baloo 2,sans-serif" fontSize="7" fontWeight="700" fill="#159E96">man</text>
        </g>
        <g className="bob">
          <ellipse cx="74" cy="28" rx="14" ry="11.5" fill="url(#m6-kvk-badge)" stroke="#A9740A" strokeWidth="1.4"/>
          <ellipse cx="74" cy="28" rx="14" ry="11.5" fill="none" stroke="#FFF6D6" strokeWidth=".8" opacity=".7"/>
          <text x="74" y="29" textAnchor="middle" dominantBaseline="central" fontFamily="Baloo 2,sans-serif" fontSize="9" fontWeight="800" fill="#0B5E5A">KVK</text>
        </g>
      </svg>
    ),
  },
  {
    id: 'jawi-alphabet',
    title: '35 Huruf Jawi',
    desc: 'Mari belajar 35 huruf jawi dengan suara',
    num: '6.3',
    visual: (
      <svg viewBox="0 0 100 100" fill="none">
        <defs>
          <radialGradient id="m6-h35-badge" cx="38%" cy="28%" r="82%"><stop offset="0%" stopColor="#FFF6D6"/><stop offset="50%" stopColor="#FFD050"/><stop offset="100%" stopColor="#E0A012"/></radialGradient>
          <radialGradient id="m6-h35-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#CFF6F1"/><stop offset="100%" stopColor="rgba(124,214,206,0)"/></radialGradient>
        </defs>
        <ellipse cx="50" cy="92" rx="26" ry="4.5" fill="rgba(11,94,90,.14)"/>
        <circle cx="50" cy="48" r="30" fill="url(#m6-h35-glow)" className="pulse"/>
        <g className="floatA" fontFamily="Amiri,serif" fontWeight="700" fill="#0B5E5A">
          <text x="20" y="30" fontSize="13" className="pulse">ا</text>
          <text x="80" y="30" fontSize="13" className="pulse" style={{animationDelay:'.4s'}}>ب</text>
          <text x="18" y="72" fontSize="13" className="pulse" style={{animationDelay:'.8s'}}>ج</text>
          <text x="82" y="74" fontSize="13" className="pulse" style={{animationDelay:'1.2s'}}>د</text>
        </g>
        <g className="bob">
          <circle cx="50" cy="46" r="18" fill="url(#m6-h35-badge)" stroke="#A9740A" strokeWidth="1.6"/>
          <circle cx="50" cy="46" r="18" fill="none" stroke="#FFF6D6" strokeWidth="1" opacity=".7"/>
          <text x="50" y="44" textAnchor="middle" dominantBaseline="central" fontFamily="Baloo 2,sans-serif" fontSize="17" fontWeight="800" fill="#0B5E5A">35</text>
          <text x="50" y="56" textAnchor="middle" dominantBaseline="central" fontFamily="Baloo 2,sans-serif" fontSize="5" fontWeight="700" letterSpacing=".1em" fill="#0B5E5A">HURUF</text>
        </g>
        <g className="floatA d2">
          <path d="M40 80 L45 80 L51 76 L51 90 L45 86 L40 86 Z" fill="#0B5E5A" stroke="#0B5E5A" strokeWidth="1" strokeLinejoin="round"/>
          <path className="wave" d="M55 79 Q58 83 55 87" stroke="#FFF6D6" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <path className="wave w2" d="M59 76 Q64 83 59 90" stroke="#FFF6D6" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <path className="wave w3" d="M63 73 Q70 83 63 93" stroke="#FFF6D6" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </g>
      </svg>
    ),
  },
  {
    id: 'jawi-100-words',
    title: '100 Perkataan Jawi',
    desc: 'Belajar 100 perkataan Jawi pertama dengan ejaan dan sebutan',
    num: '6.4',
    visual: (
      <svg viewBox="0 0 100 100" fill="none">
        <defs>
          <linearGradient id="m6-p100-cover" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#1FB6AC"/><stop offset="100%" stopColor="#0B5E5A"/></linearGradient>
          <radialGradient id="m6-p100-badge" cx="38%" cy="28%" r="82%"><stop offset="0%" stopColor="#FFF6D6"/><stop offset="50%" stopColor="#FFD050"/><stop offset="100%" stopColor="#E0A012"/></radialGradient>
        </defs>
        <ellipse cx="50" cy="92" rx="28" ry="4.5" fill="rgba(11,94,90,.14)"/>
        <g className="floatA d1">
          <path d="M20 50 Q50 42 80 50 L80 80 Q50 73 20 80 Z" fill="url(#m6-p100-cover)" stroke="#073F3C" strokeWidth="1.4"/>
          <path d="M20 50 Q50 42 80 50" fill="none" stroke="#FFD66B" strokeWidth="1"/>
          <path d="M24 52 Q37 47 48 51 L48 76 Q37 72 24 77 Z" fill="#FFFDF3" stroke="#BFD8D4" strokeWidth=".8"/>
          <path d="M52 51 Q63 47 76 52 L76 77 Q63 72 52 76 Z" fill="#FFFDF3" stroke="#BFD8D4" strokeWidth=".8"/>
          <path d="M30 57 h13 M27 61 h16 M31 65 h12" stroke="#6FA39E" strokeWidth="1" strokeLinecap="round"/>
          <path d="M58 57 h13 M57 61 h16 M61 65 h12" stroke="#6FA39E" strokeWidth="1" strokeLinecap="round"/>
          <path d="M50 50 L50 76" stroke="#073F3C" strokeWidth="1.4"/>
        </g>
        <g className="bob">
          <ellipse cx="50" cy="28" rx="17" ry="13" fill="url(#m6-p100-badge)" stroke="#A9740A" strokeWidth="1.6"/>
          <ellipse cx="50" cy="28" rx="17" ry="13" fill="none" stroke="#FFF6D6" strokeWidth="1" opacity=".7"/>
          <text x="50" y="29" textAnchor="middle" dominantBaseline="central" fontFamily="Baloo 2,sans-serif" fontSize="15" fontWeight="800" fill="#0B5E5A">100</text>
        </g>
      </svg>
    ),
  },
];

const FAQ_ITEMS = [
  {
    icon: '✍️', label: 'Apa itu Jawi?', sublabel: 'Tulisan Arab-Melayu',
    desc: 'Tulisan Jawi ialah tulisan Arab yang digunakan untuk menulis bahasa Melayu. Ia menggunakan huruf-huruf Arab dengan beberapa huruf tambahan seperti چ, ڤ, ڠ, ڽ, ݢ dan ۏ.',
    color: '#0C4A6E', accent: '#0891B2',
    gradient: 'linear-gradient(135deg, #D0F7FA 0%, #67D6E8 55%, #0891B2 100%)',
    border: 'rgba(8,145,178,0.5)',
  },
  {
    icon: '🔤', label: '37 Huruf Jawi', sublabel: '29 huruf Arab + 6 tambahan',
    desc: 'Tulisan Jawi mempunyai 37 huruf. Ia terdiri daripada 29 huruf Arab dan 6 huruf tambahan (چ, ڤ, ڠ, ڽ, ݢ, ۏ) serta Lam-Alif (لا).',
    color: '#065F46', accent: '#10B981',
    gradient: 'linear-gradient(135deg, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
    border: 'rgba(42,154,108,0.5)',
  },
  {
    icon: '✏️', label: 'Cara Menulis', sublabel: 'Tulisan bersambung',
    desc: 'Huruf Jawi ditulis bersambung dari kanan ke kiri. Setiap huruf mempunyai bentuk yang berbeza di awal, tengah, akhir dan bersendirian.',
    color: '#1E40AF', accent: '#3B82F6',
    gradient: 'linear-gradient(135deg, #D6EEFF 0%, #6BAEE8 55%, #2563EB 100%)',
    border: 'rgba(37,99,235,0.5)',
  },
  {
    icon: '🔊', label: 'Cara Menyebut', sublabel: 'Sebut dengan betul',
    desc: 'Setiap huruf Jawi disebut mengikut bunyi bahasa Melayu. Huruf tambahan seperti ڤ disebut "pa", چ disebut "ca", dan ڠ disebut "nga".',
    color: '#92400E', accent: '#F59E0B',
    gradient: 'linear-gradient(135deg, #FFF7D6 0%, #FDD97A 55%, #D4960A 100%)',
    border: 'rgba(212,150,10,0.5)',
  },
  {
    icon: '📖', label: 'Kegunaan Jawi', sublabel: 'Dalam kehidupan harian',
    desc: 'Tulisan Jawi digunakan pada papan tanda jalan, buku agama, majalah, dan juga dalam teks sejarah Melayu. Ia penting untuk membaca Al-Quran dan kitab agama.',
    color: '#4C1D95', accent: '#7A55E0',
    gradient: 'linear-gradient(135deg, #E7D9FF 0%, #B79CFF 55%, #7A55E0 100%)',
    border: 'rgba(122,85,224,0.5)',
  },
  {
    icon: '🅰️', label: 'Vokal Jawi', sublabel: 'Alif, Wau & Ya',
    desc: 'Tiga huruf vokal dalam Jawi ialah Alif (ا), Wau (و) dan Ya (ي). Vokal ini digunakan untuk membunyikan suku kata dalam tulisan Jawi.',
    color: '#9D174D', accent: '#EC4899',
    gradient: 'linear-gradient(135deg, #FFE9F3 0%, #FFBFDD 55%, #FF8CBF 100%)',
    border: 'rgba(236,72,153,0.5)',
  },
];

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div style={{
      background: item.gradient,
      border: `2.5px solid ${item.border}`,
      borderRadius: 16, overflow: 'hidden',
      boxShadow: '0 2px 0 rgba(255,255,255,0.35) inset, 0 6px 18px rgba(0,0,0,0.08)',
    }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px 16px', background: 'none', border: 'none',
          cursor: 'pointer', WebkitTapHighlightColor: 'transparent',
          fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
          fontSize: 'clamp(0.85rem, 2.2vw, 1rem)', color: '#1A202C',
          textAlign: 'left', transition: 'background 0.2s',
        }}
      >
        <span style={{ fontSize: '2rem', lineHeight: 1, flexShrink: 0 }}>{item.icon}</span>
        <div style={{ flex: 1 }}>
          <span>{item.label}</span>
          <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 'clamp(0.65rem, 1.5vw, 0.75rem)', color: item.color, marginTop: 2 }}>{item.sublabel}</div>
        </div>
        <span onClick={(e) => { e.stopPropagation(); SpeechManager.stopSpeaking(); SpeechManager.speak(item.desc, 'ms-MY', { rate: 0.8 }); }}
          style={{ fontSize: '1rem', cursor: 'pointer', flexShrink: 0 }}>
          🔊
        </span>
        <span style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease', fontSize: '1.2rem', color: item.color }}>▾</span>
      </button>
      <div style={{ maxHeight: isOpen ? 300 : 0, overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
        <div style={{ padding: '0 16px 14px' }}>
          <div style={{
            fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600,
            fontSize: 'clamp(0.72rem, 1.8vw, 0.84rem)', color: '#374151',
            lineHeight: 1.5, background: 'rgba(255,255,255,0.55)',
            borderRadius: 10, padding: '8px 10px',
          }}>
            {item.desc}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function JawiModule({ onBack, onSelectTopic, language = 'bm' }) {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <Tahun1ModuleHubLayout
      theme={THEME}
      moduleNum={6}
      moduleName="Jawi"
      moduleNameEn="Jawi"
      topics={topics}
      onBack={onBack}
      onSelectTopic={onSelectTopic}
      language={language}
      footer={
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{
            fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
            fontSize: 'clamp(1.1rem, 3.5vw, 1.4rem)', color: THEME.dark,
            textAlign: 'center', marginBottom: '1.25rem',
            display: 'flex', alignItems: 'center', gap: 14, justifyContent: 'center',
          }}>
            <span style={{ height: 3, flex: 1, maxWidth: 60, borderRadius: 999, background: 'linear-gradient(90deg, transparent, #10B981)' }} />
            📖 {language === 'bm' ? 'INFO JAWI' : 'JAWI INFO'}
            <span style={{ height: 3, flex: 1, maxWidth: 60, borderRadius: 999, background: 'linear-gradient(90deg, #10B981, transparent)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {FAQ_ITEMS.map((item, i) => (
              <FaqItem key={i} item={item} isOpen={openFaq === i} onToggle={() => { setOpenFaq(openFaq === i ? null : i); }} />
            ))}
          </div>
        </div>
      }
    />
  );
}
