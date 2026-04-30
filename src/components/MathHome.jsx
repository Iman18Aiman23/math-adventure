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
        <div className="bm-hero">
          <div className="bm-hero-emoji">🔢</div>
          <h2 className="bm-hero-title">{language === 'bm' ? 'Kuasai Matematik' : 'Master Mathematics'}</h2>
          <p className="bm-hero-subtitle">{language === 'bm' ? 'Dari operasi asas hingga penyelesaian masalah. Belajar dengan percaya diri!' : 'From basic operations to problem solving. Learn with confidence!'}</p>
        </div>

        <p style={{ fontSize: '0.8rem', fontWeight: 800, color: '#AFAFAF', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem' }}>
          {language === 'bm' ? 'PILIH TOPIK' : 'CHOOSE TOPIC'}
        </p>

        <div className="math-topic-grid">
          {SUB_GAMES.map((game, i) => (
            <button
              key={game.id}
              className="math-topic-card fade-in"
              onClick={() => onSelectSubGame(game.id)}
              style={{ '--topic-color': game.iconColor, animationDelay: `${i * 0.07}s` }}
              onMouseEnter={() => {}}
            >
              <div className="math-topic-icon" style={{ background: game.iconColor }}>
                {game.emoji}
              </div>
              <div className="math-topic-info">
                <div className="math-topic-title">
                  {game.titleKey ? t[game.titleKey] : (game.title[language] || game.title.bm)}
                </div>
                <div className="math-topic-desc">
                  {game.descKey ? t[game.descKey] : (game.desc[language] || game.desc.bm)}
                </div>
              </div>
              <div className="math-topic-arrow">›</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
