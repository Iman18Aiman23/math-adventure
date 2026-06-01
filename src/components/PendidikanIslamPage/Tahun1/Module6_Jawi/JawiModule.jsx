import React, { useState } from 'react';
import BackButton from '../../../BackButton';
import { playHoverSound } from '../../../../utils/soundManager';

const TOPICS = [
  {
    id: 'huruf-jawi-tunggal',
    num: '6.1',
    emoji: '✍️',
    title: 'Huruf Jawi Tunggal',
    desc: 'Mengenal, menyebut dan menulis 37 huruf Jawi tunggal',
    total: 37,
    unit: 'huruf',
    gradient: 'linear-gradient(135deg, #D0F7FA 0%, #67D6E8 55%, #0891B2 100%)',
    border: 'rgba(8,145,178,0.45)',
    glow:   'rgba(8,145,178,0.3)',
    dark:   '#0C4A6E',
    available: true,
  },
  {
    id: 'suku-kata-terbuka-jawi',
    num: '6.2',
    emoji: '📝',
    title: 'Suku Kata Terbuka',
    desc: 'Membaca suku kata terbuka Jawi dengan vokal Alif, Wau dan Ya',
    total: 3,
    unit: 'vokal',
    gradient: 'linear-gradient(135deg, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
    border: 'rgba(42,154,108,0.45)',
    glow:   'rgba(42,154,108,0.3)',
    dark:   '#065F46',
    available: true,
  },
];

function TopicCard({ topic, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      role="button" tabIndex={0}
      onClick={onClick}
      onKeyDown={e => e.key === 'Enter' && onClick()}
      onMouseEnter={() => { setHovered(true); playHoverSound(); }}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: topic.gradient,
        border: `2.5px solid ${topic.border}`,
        borderRadius: 20, padding: '20px 16px 18px',
        display: 'flex', flexDirection: 'column', gap: 10,
        cursor: 'pointer', userSelect: 'none', WebkitTapHighlightColor: 'transparent',
        boxShadow: hovered
          ? `0 2px 0 rgba(255,255,255,0.35) inset, 0 14px 32px -6px ${topic.glow}`
          : '0 2px 0 rgba(255,255,255,0.25) inset, 0 8px 20px rgba(0,0,0,0.1)',
        transform: hovered ? 'translateY(-5px) scale(1.02)' : 'none',
        transition: 'transform 0.28s cubic-bezier(.34,1.56,.64,1), box-shadow 0.28s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{
          width: 52, height: 52, borderRadius: 14, flexShrink: 0,
          background: 'rgba(255,255,255,0.38)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.7rem', boxShadow: 'inset 0 -2px 8px rgba(0,0,0,0.06)',
        }}>{topic.emoji}</div>
        <span style={{
          fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
          fontSize: 'clamp(0.7rem, 1.6vw, 0.85rem)', color: topic.dark,
          background: 'rgba(255,255,255,0.45)', padding: '3px 10px', borderRadius: 999,
        }}>Topik {topic.num}</span>
      </div>
      <p style={{
        fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700,
        fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', color: '#1A202C', margin: 0, lineHeight: 1.25,
      }}>{topic.title}</p>
      <p style={{
        fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 500,
        fontSize: 'clamp(0.72rem, 1.8vw, 0.85rem)', color: '#374151',
        margin: 0, lineHeight: 1.5, flexGrow: 1,
      }}>{topic.desc}</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
        <span style={{
          fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600,
          fontSize: 'clamp(0.68rem, 1.5vw, 0.8rem)', color: topic.dark,
          background: 'rgba(255,255,255,0.45)', padding: '2px 10px', borderRadius: 999,
        }}>{topic.total} {topic.unit}</span>
        <span style={{
          background: topic.dark, color: '#fff',
          width: 30, height: 30, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1rem', fontWeight: 900, boxShadow: `0 3px 8px ${topic.glow}`,
        }}>→</span>
      </div>
    </div>
  );
}

export default function JawiModule({ onBack, onSelectTopic, language = 'bm' }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      background: '#0B1A2E', color: '#F1F5F9', fontFamily: 'Inter, sans-serif',
    }}>
      <BackButton onClick={onBack} />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Baloo+2:wght@600;700;800&display=swap');
        .jwi-grid { display: grid; grid-template-columns: 1fr; gap: 0.9rem; }
        @media (min-width: 640px) { .jwi-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; } }
      `}</style>

      <div style={{ padding: '1.5rem 1.5rem 0' }}>
        <p style={{
          fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600,
          fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)', color: 'rgba(255,255,255,0.45)',
          margin: '0 0 0.75rem', letterSpacing: '0.05em', textAlign: 'center',
        }}>Pendidikan Islam &rsaquo; Tahun 1</p>

        <div style={{
          background: 'linear-gradient(135deg, #0C4A6E 0%, #0891B2 50%, #67D6E8 100%)',
          borderRadius: 20, padding: '1.25rem 1.5rem',
          marginTop: '2rem', marginBottom: '1.75rem',
          border: '2px solid rgba(103,214,232,0.3)',
          boxShadow: '0 12px 32px rgba(8,145,178,0.3)',
          display: 'flex', alignItems: 'center', gap: '1rem',
        }}>
          <span style={{ fontSize: '2.4rem', flexShrink: 0 }}>✍️</span>
          <div>
            <p style={{
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 700,
              fontSize: 'clamp(0.65rem, 1.4vw, 0.75rem)', color: 'rgba(255,255,255,0.75)',
              textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 0.2rem',
            }}>Modul 6</p>
            <h1 style={{
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
              fontSize: 'clamp(1.2rem, 3.5vw, 1.6rem)', color: '#fff',
              margin: 0, lineHeight: 1.2,
            }}>Celik Jawi</h1>
            <p style={{
              fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 500,
              fontSize: 'clamp(0.72rem, 1.8vw, 0.85rem)', color: 'rgba(255,255,255,0.8)',
              margin: '0.3rem 0 0',
            }}>
              {language === 'bm' ? '2 topik · Tap topik untuk mula belajar' : '2 topics · Tap a topic to start learning'}
            </p>
          </div>
        </div>

        <h2 style={{
          fontSize: 'clamp(0.75rem, 1.8vw, 0.9rem)', fontWeight: 900, color: '#CBD5E0',
          letterSpacing: '0.15em', marginBottom: '1rem',
          textTransform: 'uppercase', paddingLeft: 12,
          borderLeft: '4px solid #0891B2', lineHeight: 1,
        }}>
          {language === 'bm' ? 'PILIH TOPIK' : 'SELECT TOPIC'}
        </h2>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 1.5rem calc(80px + var(--safe-bottom, 0px))' }}>
        <div className="jwi-grid">
          {TOPICS.map(topic => (
            <TopicCard key={topic.id} topic={topic} onClick={() => onSelectTopic?.(topic.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}
