import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import GameMenu from './GameMenu';
import ColumnMathGame from './ColumnMathGame';

const SECTIONS = [
  {
    id: 'game',
    emoji: '🔢',
    iconBg: '#FFF0CC',
    iconColor: '#FFC800',
    title: { bm: 'Operasi Matematik', eng: 'Math Operations' },
    desc:  { bm: 'Tambah, tolak, darab & bahagi', eng: 'Add, subtract, multiply & divide' },
  },
  {
    id: 'faq',
    emoji: '❓',
    iconBg: '#D0F0FF',
    iconColor: '#1CB0F6',
    title: { bm: 'Soalan Lazim', eng: 'FAQ' },
    desc:  { bm: 'Soalan & jawapan lazim', eng: 'Frequently asked questions' },
  },
];

export default function OpsLandingPage({ onStart, onBack, onHome, language }) {
  const [view, setView] = useState('landing');

  if (view === 'game') {
    return (
      <GameMenu
        onStart={onStart}
        onBack={() => setView('landing')}
        onHome={onHome}
        language={language}
      />
    );
  }

  if (view === 'faq') {
    return (
      <ColumnMathGame
        onBack={() => setView('landing')}
        language={language}
      />
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', background: '#f7f7f7' }}>
      {/* Header */}
      <div style={{
        background: '#fff', borderBottom: '2px solid #E5E5E5',
        padding: '0 1rem', height: '56px',
        display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0,
      }}>
        <button onClick={onBack} style={{ background: 'transparent', color: '#AFAFAF', display: 'flex', alignItems: 'center' }}>
          <ArrowLeft size={24} />
        </button>
        <div style={{ flex: 1, textAlign: 'center', fontWeight: 900, fontSize: '1rem', color: '#3C3C3C' }}>
          🔢 {language === 'bm' ? 'Operasi Matematik' : 'Math Operations'}
        </div>
        <div style={{ width: 24 }} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1rem' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 800, color: '#AFAFAF', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem' }}>
          {language === 'bm' ? 'PILIH BAHAGIAN' : 'SELECT SECTION'}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {SECTIONS.map((section, i) => (
            <button
              key={section.id}
              className="duo-lesson-row fade-in"
              onClick={() => setView(section.id)}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className="duo-lesson-icon" style={{ background: section.iconBg, fontSize: '1.5rem' }}>
                {section.emoji}
              </div>
              <div className="duo-lesson-info">
                <div className="duo-lesson-title" style={{ color: section.iconColor }}>
                  {section.title[language] || section.title.bm}
                </div>
                <div className="duo-lesson-desc">
                  {section.desc[language] || section.desc.bm}
                </div>
              </div>
              <div className="duo-lesson-arrow">›</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
