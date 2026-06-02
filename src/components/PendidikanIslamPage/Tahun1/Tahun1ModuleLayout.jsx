import React, { useState } from 'react';
import '../PendidikanIslamPage.css';
import PageLayout from '../../PageLayout';
import { playHoverSound } from '../../../utils/soundManager';

export default function Tahun1ModuleLayout({
  classPrefix = 'pi',
  heroIcon,
  heroTitle,
  heroSubtitle,
  sectionLabel,
  onBack,
  children,
}) {
  return (
    <>
      <PageLayout
        classPrefix={classPrefix}
        heroIcon={heroIcon}
        heroTitle={heroTitle}
        heroSubtitle={heroSubtitle}
        sectionLabel={sectionLabel}
        onBack={onBack}
      >
        {children}
      </PageLayout>
    </>
  );
}

export function TopicCard({ topic, onClick, language }) {
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
        }}>{language === 'bm' ? 'Topik' : 'Topic'} {topic.num}</span>
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
