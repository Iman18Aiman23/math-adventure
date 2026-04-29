import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { LOCALIZATION } from '../utils/localization';

const SUB_GAMES = [
  {
    id: 'operations',
    emoji: '🔢',
    iconBg: '#FFF0CC',
    iconColor: '#FFC800',
    titleKey: 'opsTitle',
    descKey:  'opsDesc',
  },
  {
    id: 'faq',
    emoji: '❓',
    iconBg: '#FFE0E0',
    iconColor: '#FF6B6B',
    title: { bm: 'Soalan Lazim', eng: 'FAQ' },
    desc: { bm: 'Soalan & jawapan lazim', eng: 'Frequently asked questions' },
  },
  {
    id: 'datetime',
    emoji: '🕐',
    iconBg: '#D0F0FF',
    iconColor: '#1CB0F6',
    titleKey: 'timeTitle',
    descKey:  'timeDesc',
  },
];

export default function MathHome({ onSelectSubGame, onBack, onHome, language }) {
  const t = LOCALIZATION[language].math;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', background: '#f7f7f7' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF5E6 100%)',
        borderBottom: '3px solid #FFD700',
        padding: '0 1rem',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        flexShrink: 0,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      }}>
        <button onClick={onBack} style={{ background: 'transparent', color: '#FF6B6B', display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
          <ArrowLeft size={24} />
        </button>
        <div style={{ flex: 1, textAlign: 'center', fontWeight: 900, fontSize: '1.3rem', color: '#FF6B6B' }}>
          🔢 {language === 'bm' ? 'Matematik' : 'Mathematics'}
        </div>
        <div style={{ width: 24 }} />
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 1rem' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 800, color: '#AFAFAF', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem' }}>
          {language === 'bm' ? 'PILIH TOPIK' : 'CHOOSE TOPIC'}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {SUB_GAMES.map((game, i) => (
            <button
              key={game.id}
              className="fade-in"
              onClick={() => onSelectSubGame(game.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1.25rem',
                background: '#fff',
                border: `3px solid ${game.iconBg}`,
                borderBottom: `5px solid ${game.iconColor}`,
                borderRadius: '20px',
                cursor: 'pointer',
                transition: 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                gap: '1.2rem',
                animationDelay: `${i * 0.07}s`,
                textAlign: 'left',
                width: '100%',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.1)';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'translateY(2px)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
              }}
            >
              <div style={{
                background: game.iconColor,
                color: '#fff',
                borderRadius: '14px',
                width: '56px',
                height: '56px',
                minWidth: '56px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem',
                fontWeight: 900,
              }}>
                {game.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#3C3C3C', marginBottom: '4px' }}>
                  {game.titleKey ? t[game.titleKey] : (game.title[language] || game.title.bm)}
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#AFAFAF', lineHeight: 1.3 }}>
                  {game.descKey ? t[game.descKey] : (game.desc[language] || game.desc.bm)}
                </div>
              </div>
              <div style={{ fontSize: '1.5rem', color: '#AFAFAF' }}>›</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
