import React, { useState } from 'react';
import BackButton from '../BackButton';
import { playHoverSound } from '../../utils/soundManager';

// ── Module data for Tahun 1 ───────────────────────────────────────────────────
const MODULES_T1 = [
  {
    id: 'al-quran',
    emoji: '📖',
    label: 'Modul 1',
    title: 'Al-Quran & Tajwid',
    desc: 'Kenali huruf Hijaiyah, tanda bacaan & hafazan surah pilihan',
    topics: 4,
    gradient: 'radial-gradient(ellipse at 50% 38%, #FFF7D6 0%, #FDD97A 55%, #D4960A 100%)',
    border: 'rgba(212, 150, 10, 0.45)',
    shadow: 'rgba(212, 150, 10, 0.35)',
    dark: '#92400E',
    available: true,
  },
  {
    id: 'akidah',
    emoji: '🤲',
    label: 'Modul 2',
    title: 'Akidah',
    desc: 'Rukun Iman, Rukun Islam, Syahadah & Asmaul Husna',
    topics: 4,
    gradient: 'radial-gradient(ellipse at 50% 38%, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
    border: 'rgba(42, 154, 108, 0.45)',
    shadow: 'rgba(42, 154, 108, 0.35)',
    dark: '#065F46',
    available: true,
  },
  {
    id: 'ibadah',
    emoji: '💧',
    label: 'Modul 3',
    title: 'Ibadah',
    desc: 'Istinja\', air mutlak & amali wuduk langkah demi langkah',
    topics: 3,
    gradient: 'radial-gradient(ellipse at 50% 38%, #D6EEFF 0%, #6BAEE8 55%, #2563EB 100%)',
    border: 'rgba(37, 99, 235, 0.45)',
    shadow: 'rgba(37, 99, 235, 0.35)',
    dark: '#1E40AF',
    available: true,
  },
  {
    id: 'sirah',
    emoji: '🕌',
    label: 'Modul 4',
    title: 'Sirah',
    desc: 'Nasab, kelahiran & sifat terpuji Nabi Muhammad SAW',
    topics: 3,
    gradient: 'radial-gradient(ellipse at 50% 38%, #E7D9FF 0%, #B79CFF 55%, #7A55E0 100%)',
    border: 'rgba(122, 85, 224, 0.45)',
    shadow: 'rgba(122, 85, 224, 0.35)',
    dark: '#4C1D95',
    available: false,
  },
  {
    id: 'adab',
    emoji: '🌸',
    label: 'Modul 5',
    title: 'Adab & Akhlak',
    desc: 'Adab makan, minum, tidur & menggunakan tandas',
    topics: 3,
    gradient: 'radial-gradient(ellipse at 50% 38%, #FFE9F3 0%, #FFBFDD 55%, #FF8CBF 100%)',
    border: 'rgba(255, 128, 187, 0.45)',
    shadow: 'rgba(255, 128, 187, 0.35)',
    dark: '#9F1239',
    available: false,
  },
  {
    id: 'jawi',
    emoji: '✍️',
    label: 'Modul 6',
    title: 'Celik Jawi',
    desc: 'Mengenal, menyebut & membaca suku kata tulisan Jawi',
    topics: 2,
    gradient: 'radial-gradient(ellipse at 50% 38%, #D0F7FA 0%, #67D6E8 55%, #0891B2 100%)',
    border: 'rgba(8, 145, 178, 0.45)',
    shadow: 'rgba(8, 145, 178, 0.35)',
    dark: '#0C4A6E',
    available: false,
  },
];

// ── Crescent moon + star SVG decoration ──────────────────────────────────────
function CrescentMoon() {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: 0.92, flexShrink: 0 }}>
      {/* Outer glow */}
      <circle cx="55" cy="55" r="52" fill="rgba(255,255,255,0.06)" />
      {/* Crescent body */}
      <circle cx="50" cy="52" r="32" fill="rgba(255,255,255,0.88)" />
      <circle cx="62" cy="44" r="26" fill="#0E7490" />
      {/* Stars */}
      <path d="M82 28 L84 34 L90 34 L85 38 L87 44 L82 40 L77 44 L79 38 L74 34 L80 34 Z"
        fill="rgba(255,255,255,0.9)" />
      <circle cx="92" cy="55" r="3.5" fill="rgba(255,255,255,0.75)" />
      <circle cx="76" cy="68" r="2.5" fill="rgba(255,255,255,0.6)" />
      <circle cx="88" cy="72" r="2" fill="rgba(255,255,255,0.5)" />
    </svg>
  );
}

// ── Progress bar ──────────────────────────────────────────────────────────────
function ProgressBar({ filled, total, color }) {
  return (
    <div style={{ display: 'flex', gap: 3, alignItems: 'center', width: '100%' }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          flex: 1, height: 5, borderRadius: 99,
          background: i < filled ? color : 'rgba(0,0,0,0.12)',
          transition: 'background 0.3s',
        }} />
      ))}
    </div>
  );
}

// ── Module card ───────────────────────────────────────────────────────────────
function ModuleCard({ mod, onClick }) {
  const [hovered, setHovered] = useState(false);
  const locked = !mod.available;
  return (
    <div
      role={locked ? undefined : 'button'}
      tabIndex={locked ? undefined : 0}
      aria-label={mod.title}
      onClick={locked ? undefined : onClick}
      onKeyDown={e => !locked && e.key === 'Enter' && onClick?.()}
      onMouseEnter={() => { if (!locked) { setHovered(true); playHoverSound(); } }}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: locked ? 'rgba(255,255,255,0.04)' : mod.gradient,
        border: `2.5px solid ${locked ? 'rgba(255,255,255,0.1)' : mod.border}`,
        opacity: locked ? 0.55 : 1,
        cursor: locked ? 'not-allowed' : 'pointer',
        position: 'relative', overflow: 'hidden',
        borderRadius: 22,
        padding: '18px 14px 16px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent',
        boxShadow: hovered
          ? `0 2.5px 0 rgba(255,255,255,0.4) inset, 0 16px 36px -8px ${mod.shadow}, 0 4px 10px rgba(0,0,0,0.06)`
          : `0 2.5px 0 rgba(255,255,255,0.4) inset, 0 10px 24px -8px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.04)`,
        transform: hovered ? 'translateY(-5px) scale(1.02)' : 'translateY(0) scale(1)',
        transition: 'transform 0.3s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s',
        minHeight: 200,
        justifyContent: 'flex-start',
        textAlign: 'center',
      }}
    >
      {/* Akan Datang ribbon */}
      {locked && (
        <div style={{
          position: 'absolute', top: 12, right: -24,
          background: 'rgba(255,255,255,0.15)',
          color: '#94A3B8',
          fontSize: 9, fontWeight: 700,
          letterSpacing: '0.08em',
          padding: '3px 30px',
          transform: 'rotate(35deg)',
          fontFamily: "'Fredoka', system-ui, sans-serif",
          whiteSpace: 'nowrap',
        }}>SOON</div>
      )}

      {/* Icon bubble */}
      <div style={{
        width: 62, height: 62, borderRadius: 16,
        background: 'rgba(255,255,255,0.38)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.9rem',
        boxShadow: 'inset 0 -3px 10px rgba(0,0,0,0.06), inset 0 1.5px 0 rgba(255,255,255,0.5)',
        flexShrink: 0,
      }}>
        {locked ? '🔒' : mod.emoji}
      </div>

      {/* Label */}
      <span style={{
        fontFamily: "'Baloo 2', sans-serif",
        fontWeight: 700,
        fontSize: 'clamp(8px, 1.8vw, 10.5px)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: '#fff',
        padding: '3px 12px',
        borderRadius: 999,
        background: 'rgba(0,0,0,0.2)',
        whiteSpace: 'nowrap',
      }}>
        {mod.label}
      </span>

      {/* Title */}
      <p style={{
        fontFamily: "'Fredoka', system-ui, sans-serif",
        fontWeight: 700,
        fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)',
        color: '#1A202C',
        margin: 0,
        lineHeight: 1.25,
      }}>
        {mod.title}
      </p>

      {/* Description */}
      <p style={{
        fontFamily: "'Fredoka', system-ui, sans-serif",
        fontWeight: 500,
        fontSize: 'clamp(0.7rem, 1.8vw, 0.82rem)',
        color: '#2D3748',
        margin: 0,
        lineHeight: 1.45,
        padding: '0 4px',
        flexGrow: 1,
      }}>
        {mod.desc}
      </p>

      {/* Progress bar + topic count */}
      <div style={{ width: '100%' }}>
        <ProgressBar filled={0} total={mod.topics} color={mod.dark} />
        <p style={{
          fontFamily: "'Fredoka', system-ui, sans-serif",
          fontWeight: 600,
          fontSize: 'clamp(0.65rem, 1.6vw, 0.78rem)',
          color: '#4A5568',
          margin: '5px 0 0',
          textAlign: 'right',
        }}>
          {mod.topics} topik
        </p>
      </div>
    </div>
  );
}

// ── Lock card (Tahun 2 & 3) ───────────────────────────────────────────────────
function LockCard({ label }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.06)',
      border: '2px dashed rgba(255,255,255,0.2)',
      borderRadius: 22,
      padding: '18px 14px 16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      minHeight: 200,
      opacity: 0.5,
      cursor: 'not-allowed',
    }}>
      <div style={{ fontSize: '2rem' }}>🔒</div>
      <p style={{
        fontFamily: "'Fredoka', system-ui, sans-serif",
        fontWeight: 700,
        fontSize: 'clamp(0.85rem, 2vw, 1rem)',
        color: '#CBD5E0',
        margin: 0,
      }}>{label}</p>
      <p style={{
        fontFamily: "'Fredoka', system-ui, sans-serif",
        fontWeight: 500,
        fontSize: 'clamp(0.7rem, 1.6vw, 0.82rem)',
        color: '#94A3B8',
        margin: 0,
      }}>Akan Datang</p>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function PendidikanIslamHomePage({ onBack, onSelectModule, language = 'bm' }) {
  const [activeYear, setActiveYear] = useState(1);

  const YEARS = [
    { id: 1, label: 'Tahun 1', locked: false },
    { id: 2, label: 'Tahun 2', locked: true  },
    { id: 3, label: 'Tahun 3', locked: true  },
  ];

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      background: '#0B1A2E', color: '#F1F5F9',
      fontFamily: 'Inter, sans-serif',
    }}>
      <BackButton onClick={onBack} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Baloo+2:wght@600;700;800&display=swap');

        /* ── Module grid — mobile-first ─────────────────────── */
        .pi-module-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.85rem;
        }
        @media (min-width: 768px) {
          .pi-module-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
        }
        @media (min-width: 1024px) {
          .pi-module-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 1.25rem;
          }
        }

        /* ── Year tab ────────────────────────────────────────── */
        .pi-year-tab {
          fontFamily: 'Fredoka', system-ui, sans-serif;
          padding: 8px 22px;
          borderRadius: 999px;
          fontWeight: 700;
          fontSize: clamp(0.8rem, 2vw, 0.95rem);
          cursor: pointer;
          border: 2px solid rgba(255,255,255,0.2);
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .pi-year-tab:hover:not(:disabled) {
          transform: translateY(-2px);
        }
        .pi-year-tab:disabled {
          cursor: not-allowed;
          opacity: 0.45;
        }

        /* ── Hero shimmer ────────────────────────────────────── */
        @keyframes pi-shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes pi-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        .pi-moon { animation: pi-float 4s ease-in-out infinite; }

        /* ── Responsive hero padding ─────────────────────────── */
        .pi-hero {
          padding: 2rem 1.5rem 1.75rem;
          margin-bottom: 2rem;
        }
        @media (min-width: 768px) {
          .pi-hero { padding: 2.5rem 2rem 2rem; margin-bottom: 2.5rem; }
        }
        .pi-content {
          padding: 0 1rem 120px;
        }
        @media (min-width: 768px) {
          .pi-content { padding: 0 2rem 120px; }
        }
        @media (min-width: 1024px) {
          .pi-content { padding: 0 2.5rem 80px; }
        }
      `}</style>

      {/* ── HERO BANNER ──────────────────────────────────────────────────── */}
      <div style={{ padding: '1.5rem 1rem 0' }}>
        <div className="pi-hero" style={{
          background: 'linear-gradient(135deg, #0E4D6E 0%, #0891B2 45%, #67D6E8 80%, #0E4D6E 100%)',
          borderRadius: 24,
          border: '2px solid rgba(103, 214, 232, 0.5)',
          boxShadow: '0 20px 60px rgba(8,145,178,0.35), 0 0 28px rgba(103,214,232,0.3)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Shimmer sweep */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
            animation: 'pi-shimmer 3.5s ease-in-out infinite',
            pointerEvents: 'none',
          }} />

          {/* Radial glow */}
          <div style={{
            position: 'absolute', top: '-40px', left: '50%',
            transform: 'translateX(-50%)',
            width: 280, height: 280,
            background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)',
            filter: 'blur(30px)', pointerEvents: 'none',
          }} />

          {/* Content row */}
          <div style={{
            position: 'relative', zIndex: 1,
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', gap: '1rem',
          }}>
            {/* Text block */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontSize: 'clamp(0.65rem, 1.5vw, 0.78rem)',
                fontWeight: 700,
                color: 'rgba(255,255,255,0.8)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '0.25rem',
              }}>
                {language === 'bm' ? 'KSSR TAHAP 1' : 'KSSR LEVEL 1'}
              </p>
              <h1 style={{
                fontFamily: "'Baloo 2', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(1.4rem, 4vw, 2.25rem)',
                lineHeight: 1.15,
                margin: '0 0 0.6rem',
                letterSpacing: '-0.02em',
                color: '#FFFFFF',
                textShadow: '0 2px 12px rgba(0,0,0,0.2)',
              }}>
                Pendidikan Islam
              </h1>
              <p style={{
                fontFamily: "'Fredoka', system-ui, sans-serif",
                fontWeight: 600,
                fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                color: 'rgba(255,255,255,0.88)',
                margin: 0,
                lineHeight: 1.4,
              }}>
                {language === 'bm'
                  ? 'Belajar dengan seronok & penuh berkat 🌙'
                  : 'Learn with joy & full of blessings 🌙'}
              </p>

              {/* Stats pills */}
              <div style={{
                display: 'flex', flexWrap: 'wrap', gap: '0.5rem',
                marginTop: '1rem',
              }}>
                {[
                  { icon: '📚', text: '6 Modul' },
                  { icon: '🎯', text: '17 Topik' },
                  { icon: '🏆', text: '3 Tahun' },
                ].map(pill => (
                  <span key={pill.text} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    background: 'rgba(255,255,255,0.18)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    borderRadius: 999,
                    padding: '4px 12px',
                    fontFamily: "'Fredoka', system-ui, sans-serif",
                    fontWeight: 600,
                    fontSize: 'clamp(0.65rem, 1.5vw, 0.78rem)',
                    color: '#fff',
                    backdropFilter: 'blur(6px)',
                  }}>
                    {pill.icon} {pill.text}
                  </span>
                ))}
              </div>
            </div>

            {/* Crescent moon art */}
            <div className="pi-moon" style={{ flexShrink: 0 }}>
              <CrescentMoon />
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTENT — scrollable fill ────────────────────────────────────── */}
      <div className="pi-content" style={{ flex: 1, overflowY: 'auto' }}>

        {/* Year tabs */}
        <div style={{
          display: 'flex', gap: '0.6rem', flexWrap: 'wrap',
          marginBottom: '1.75rem',
        }}>
          {YEARS.map(y => (
            <button
              key={y.id}
              className="pi-year-tab"
              disabled={y.locked}
              onClick={() => !y.locked && setActiveYear(y.id)}
              onMouseEnter={!y.locked ? playHoverSound : undefined}
              style={{
                background: activeYear === y.id && !y.locked
                  ? 'linear-gradient(135deg, #0891B2, #67D6E8)'
                  : 'rgba(255,255,255,0.08)',
                color: activeYear === y.id && !y.locked ? '#fff' : 'rgba(255,255,255,0.55)',
                boxShadow: activeYear === y.id && !y.locked
                  ? '0 4px 14px rgba(8,145,178,0.45)'
                  : 'none',
                fontFamily: "'Fredoka', system-ui, sans-serif",
                fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
                fontWeight: 700,
                padding: '8px 22px',
                borderRadius: 999,
                border: activeYear === y.id && !y.locked
                  ? '2px solid rgba(103,214,232,0.5)'
                  : '2px solid rgba(255,255,255,0.15)',
                cursor: y.locked ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                opacity: y.locked ? 0.45 : 1,
                whiteSpace: 'nowrap',
              }}
            >
              {y.locked ? `🔒 ${y.label}` : y.label}
            </button>
          ))}
        </div>

        {/* Section header */}
        <h2 style={{
          fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
          fontWeight: 900,
          color: '#CBD5E0',
          letterSpacing: '0.15em',
          marginBottom: '1.25rem',
          textTransform: 'uppercase',
          paddingLeft: 14,
          borderLeft: '4px solid #67D6E8',
          lineHeight: 1,
        }}>
          {language === 'bm' ? `MODUL — TAHUN ${activeYear}` : `MODULES — YEAR ${activeYear}`}
        </h2>

        {/* Module grid */}
        <div className="pi-module-grid">
          {activeYear === 1
            ? MODULES_T1.map(mod => (
                <ModuleCard
                  key={mod.id}
                  mod={mod}
                  onClick={() => onSelectModule?.(mod.id)}
                />
              ))
            : MODULES_T1.map(mod => (
                <LockCard key={mod.id} label={mod.title} />
              ))
          }
        </div>

      </div>
    </div>
  );
}
