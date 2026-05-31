import React, { useState } from 'react';
import BackButton from '../../BackButton';
import { playHoverSound } from '../../../utils/soundManager';

const TOPICS = [
  {
    id: 'huruf-hijaiyah',
    num: '1.1',
    emoji: '🔤',
    title: 'Huruf Hijaiyah Tunggal',
    desc: 'Kenali dan sebut 28 huruf Hijaiyah dari Alif hingga Ya',
    total: 28,
    unit: 'huruf',
    gradient: 'linear-gradient(135deg, #FFF7D6 0%, #FDD97A 55%, #D4960A 100%)',
    border: 'rgba(212,150,10,0.45)',
    glow:   'rgba(212,150,10,0.3)',
    dark:   '#92400E',
    available: true,
  },
  {
    id: 'tanda-bacaan',
    num: '1.2',
    emoji: '🔡',
    title: 'Tanda Bacaan Asas',
    desc: 'Mengenal baris Fathah (atas), Kasrah (bawah) dan Dammah (depan)',
    total: 3,
    unit: 'baris',
    gradient: 'linear-gradient(135deg, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
    border: 'rgba(42,154,108,0.45)',
    glow:   'rgba(42,154,108,0.3)',
    dark:   '#065F46',
    available: true,
  },
  {
    id: 'tanwin',
    num: '1.3',
    emoji: '✌️',
    title: 'Tanwin (Baris Dua)',
    desc: 'Mengenal tanwin Fathah, Kasrah dan Dammah serta cara bacaannya',
    total: 3,
    unit: 'jenis',
    gradient: 'linear-gradient(135deg, #D6EEFF 0%, #6BAEE8 55%, #2563EB 100%)',
    border: 'rgba(37,99,235,0.45)',
    glow:   'rgba(37,99,235,0.3)',
    dark:   '#1E40AF',
    available: false,
  },
  {
    id: 'hafazan',
    num: '1.4',
    emoji: '📿',
    title: 'Tilawah & Hafazan',
    desc: 'Al-Fatihah, Al-Ikhlas, Al-Falaq, An-Nas & Al-Asr',
    total: 5,
    unit: 'surah',
    gradient: 'linear-gradient(135deg, #E7D9FF 0%, #B79CFF 55%, #7A55E0 100%)',
    border: 'rgba(122,85,224,0.45)',
    glow:   'rgba(122,85,224,0.3)',
    dark:   '#4C1D95',
    available: false,
  },
];

function TopicCard({ topic, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      role={topic.available ? 'button' : undefined}
      tabIndex={topic.available ? 0 : undefined}
      aria-label={topic.title}
      onClick={topic.available ? onClick : undefined}
      onKeyDown={e => topic.available && e.key === 'Enter' && onClick?.()}
      onMouseEnter={() => { if (topic.available) { setHovered(true); playHoverSound(); } }}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: topic.available ? topic.gradient : 'rgba(255,255,255,0.05)',
        border: `2.5px solid ${topic.available ? topic.border : 'rgba(255,255,255,0.1)'}`,
        borderRadius: 20,
        padding: '20px 16px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        cursor: topic.available ? 'pointer' : 'not-allowed',
        opacity: topic.available ? 1 : 0.45,
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent',
        boxShadow: hovered && topic.available
          ? `0 2px 0 rgba(255,255,255,0.35) inset, 0 14px 32px -6px ${topic.glow}`
          : '0 2px 0 rgba(255,255,255,0.25) inset, 0 8px 20px rgba(0,0,0,0.1)',
        transform: hovered && topic.available ? 'translateY(-5px) scale(1.02)' : 'none',
        transition: 'transform 0.28s cubic-bezier(.34,1.56,.64,1), box-shadow 0.28s',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Coming soon ribbon */}
      {!topic.available && (
        <div style={{
          position: 'absolute', top: 12, right: -22,
          background: 'rgba(255,255,255,0.2)',
          color: '#94A3B8',
          fontSize: 9, fontWeight: 700,
          letterSpacing: '0.08em',
          padding: '3px 28px',
          transform: 'rotate(35deg)',
          fontFamily: "'Fredoka', system-ui, sans-serif",
        }}>SOON</div>
      )}

      {/* Top row: emoji + topic number */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{
          width: 52, height: 52, borderRadius: 14,
          background: 'rgba(255,255,255,0.38)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.7rem',
          boxShadow: 'inset 0 -2px 8px rgba(0,0,0,0.06)',
          flexShrink: 0,
        }}>
          {topic.available ? topic.emoji : '🔒'}
        </div>
        <span style={{
          fontFamily: "'Baloo 2', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(0.7rem, 1.6vw, 0.85rem)',
          color: topic.available ? topic.dark : '#64748B',
          background: 'rgba(255,255,255,0.45)',
          padding: '3px 10px',
          borderRadius: 999,
        }}>
          Topik {topic.num}
        </span>
      </div>

      {/* Title */}
      <p style={{
        fontFamily: "'Fredoka', system-ui, sans-serif",
        fontWeight: 700,
        fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
        color: topic.available ? '#1A202C' : '#94A3B8',
        margin: 0,
        lineHeight: 1.25,
      }}>
        {topic.title}
      </p>

      {/* Description */}
      <p style={{
        fontFamily: "'Fredoka', system-ui, sans-serif",
        fontWeight: 500,
        fontSize: 'clamp(0.72rem, 1.8vw, 0.85rem)',
        color: topic.available ? '#374151' : '#64748B',
        margin: 0,
        lineHeight: 1.5,
        flexGrow: 1,
      }}>
        {topic.desc}
      </p>

      {/* Footer: count + arrow */}
      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', marginTop: 4,
      }}>
        <span style={{
          fontFamily: "'Fredoka', system-ui, sans-serif",
          fontWeight: 600,
          fontSize: 'clamp(0.68rem, 1.5vw, 0.8rem)',
          color: topic.available ? topic.dark : '#64748B',
          background: 'rgba(255,255,255,0.45)',
          padding: '2px 10px',
          borderRadius: 999,
        }}>
          {topic.total} {topic.unit}
        </span>
        {topic.available && (
          <span style={{
            background: topic.dark,
            color: '#fff',
            width: 30, height: 30,
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1rem', fontWeight: 900,
            boxShadow: `0 3px 8px ${topic.glow}`,
          }}>→</span>
        )}
      </div>
    </div>
  );
}

export default function AlQuranTajwidModule({ onBack, onSelectTopic, language = 'bm' }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      background: '#0B1A2E', color: '#F1F5F9',
      fontFamily: 'Inter, sans-serif',
    }}>
      <BackButton onClick={onBack} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Baloo+2:wght@600;700;800&display=swap');
        .aqt-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.9rem;
        }
        @media (min-width: 640px) {
          .aqt-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        }
        @media (min-width: 1024px) {
          .aqt-grid { grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
        }
      `}</style>

      {/* Header */}
      <div style={{ padding: '4.5rem 1.5rem 0' }}>
        {/* Breadcrumb */}
        <p style={{
          fontFamily: "'Fredoka', system-ui, sans-serif",
          fontWeight: 600,
          fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)',
          color: 'rgba(255,255,255,0.45)',
          margin: '0 0 0.5rem',
          letterSpacing: '0.05em',
        }}>
          Pendidikan Islam &rsaquo; Tahun 1
        </p>

        {/* Title block */}
        <div style={{
          background: 'linear-gradient(135deg, #78350F 0%, #D97706 50%, #FDE68A 100%)',
          borderRadius: 20,
          padding: '1.25rem 1.5rem',
          marginBottom: '1.75rem',
          border: '2px solid rgba(253,230,138,0.3)',
          boxShadow: '0 12px 32px rgba(217,119,6,0.3)',
          display: 'flex', alignItems: 'center', gap: '1rem',
        }}>
          <span style={{ fontSize: '2.4rem', flexShrink: 0 }}>📖</span>
          <div>
            <p style={{
              fontFamily: "'Baloo 2', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(0.65rem, 1.4vw, 0.75rem)',
              color: 'rgba(255,255,255,0.75)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              margin: '0 0 0.2rem',
            }}>Modul 1</p>
            <h1 style={{
              fontFamily: "'Baloo 2', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(1.2rem, 3.5vw, 1.6rem)',
              color: '#fff',
              margin: 0,
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
            }}>
              Al-Quran &amp; Tajwid
            </h1>
            <p style={{
              fontFamily: "'Fredoka', system-ui, sans-serif",
              fontWeight: 500,
              fontSize: 'clamp(0.72rem, 1.8vw, 0.85rem)',
              color: 'rgba(255,255,255,0.8)',
              margin: '0.3rem 0 0',
            }}>
              {language === 'bm'
                ? '4 topik · Tap topik untuk mula belajar'
                : '4 topics · Tap a topic to start learning'}
            </p>
          </div>
        </div>

        {/* Section label */}
        <h2 style={{
          fontSize: 'clamp(0.75rem, 1.8vw, 0.9rem)',
          fontWeight: 900,
          color: '#CBD5E0',
          letterSpacing: '0.15em',
          marginBottom: '1rem',
          textTransform: 'uppercase',
          paddingLeft: 12,
          borderLeft: '4px solid #F59E0B',
          lineHeight: 1,
        }}>
          {language === 'bm' ? 'PILIH TOPIK' : 'SELECT TOPIC'}
        </h2>
      </div>

      {/* Topic grid — scrollable content area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 1.5rem calc(80px + var(--safe-bottom, 0px))' }}>
        <div className="aqt-grid">
          {TOPICS.map(topic => (
            <TopicCard
              key={topic.id}
              topic={topic}
              onClick={() => onSelectTopic?.(topic.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
