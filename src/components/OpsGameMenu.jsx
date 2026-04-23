import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { LOCALIZATION } from '../utils/localization';

const OPS_GAMES = [
  { id: 'basic', emoji: '🔢', iconBg: '#FFF0CC', iconColor: '#FFC800', titleKey: 'opsTitle', descKey: 'opsDesc' },
  { id: 'mixed', emoji: '🔀', iconBg: '#D0F0FF', iconColor: '#1CB0F6', titleKey: 'opsMixedTitle', descKey: 'opsMixedDesc' },
];

export default function OpsGameMenu({ onStart, onBack, onHome, language }) {
  const t = LOCALIZATION[language].math;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', background: '#f7f7f7' }}>
      {/* Header */}
      <div style={{
        background: '#fff',
        borderBottom: '2px solid #E5E5E5',
        padding: '0 1rem',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        flexShrink: 0,
      }}>
        <button onClick={onBack} style={{ background: 'transparent', color: '#AFAFAF', display: 'flex', alignItems: 'center' }}>
          <ArrowLeft size={24} />
        </button>
        <div style={{ flex: 1, textAlign: 'center', fontWeight: 900, fontSize: '1rem', color: '#3C3C3C' }}>
          🔢 {t.opsTitle}
        </div>
        <div style={{ width: 24 }} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1rem' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 800, color: '#AFAFAF', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem' }}>
          {language === 'bm' ? 'PILIH PERMAINAN' : 'SELECT GAME'}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {OPS_GAMES.map((game, i) => (
            <button
              key={game.id}
              className="duo-lesson-row fade-in"
              onClick={() => onStart(game.id)}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className="duo-lesson-icon" style={{ background: game.iconBg }}>
                {game.emoji}
              </div>
              <div className="duo-lesson-info">
                <div className="duo-lesson-title" style={{ color: game.iconColor }}>{t[game.titleKey]}</div>
                <div className="duo-lesson-desc">{t[game.descKey]}</div>
              </div>
              <div className="duo-lesson-arrow">›</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
