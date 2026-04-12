import React from 'react';
import { ArrowLeft, Heart, Volume2, VolumeX } from 'lucide-react';

export default function GameHeader({
  onBack, onHome, onToggleMute, isMuted,
  streak, progress, lives, title, language = 'bm',
}) {
  const MAX_LIVES = 3;
  const backTip = language === 'bm' ? 'Kembali' : 'Go Back';

  return (
    <div className="game-header">
      {/* Left: Back */}
      <div className="header-section left" style={{ flex: '0 0 auto', marginRight: '0.5rem' }}>
        {onBack && (
          <button onClick={onBack} title={backTip}
            style={{ background: 'transparent', color: '#AFAFAF', display: 'flex', alignItems: 'center' }}>
            <ArrowLeft size={22} />
          </button>
        )}
      </div>

      {/* Middle: Progress bar (or title) */}
      <div className="header-section middle" style={{ flex: 1, gap: '0.5rem' }}>
        {progress !== undefined ? (
          <div className="lesson-progress-track" style={{ width: '100%' }}>
            <div className="lesson-progress-fill" style={{ width: `${Math.max(0, Math.min(progress, 100))}%` }} />
          </div>
        ) : (
          title && <span className="header-title">{title}</span>
        )}
      </div>

      {/* Right: Hearts + streak + mute */}
      <div className="header-section right" style={{ flex: '0 0 auto', marginLeft: '0.5rem', gap: '8px' }}>
        {lives !== undefined && (
          <div className="stat-item" style={{ color: '#FF4B4B' }}>
            {Array.from({ length: MAX_LIVES }).map((_, i) => (
              <span key={i} style={{ fontSize: '1.1rem', opacity: i < lives ? 1 : 0.2, transition: 'opacity 0.3s' }}>❤️</span>
            ))}
          </div>
        )}
        {streak !== undefined && (
          <div className="stat-item" style={{ color: '#FF9600', fontWeight: 800 }}>
            <span style={{ fontSize: '1.1rem' }}>🔥</span>
            <span style={{ fontSize: '0.95rem' }}>{streak}</span>
          </div>
        )}
        {onToggleMute && (
          <button onClick={onToggleMute}
            style={{ background: 'transparent', color: '#AFAFAF', display: 'flex', alignItems: 'center' }}>
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        )}
      </div>
    </div>
  );
}
