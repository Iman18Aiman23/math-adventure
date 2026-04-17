import React from 'react';

const SIDEBAR_TABS = [
  { id: 'learn',       icon: '📚', label: { bm: 'Belajar',     eng: 'Learn'        } },
  { id: 'leaderboard', icon: '🏆', label: { bm: 'Papan Juara', eng: 'Leaderboard'  } },
  { id: 'profile',     icon: '👤', label: { bm: 'Profil',      eng: 'Profile'      } },
];

export default function DesktopSidebar({
  activeTab, onTabChange, language, onToggleLanguage,
  playerName, gameState, onHome
}) {
  return (
    <aside className="desktop-sidebar">
      {/* Logo */}
      <div className="sidebar-logo" onClick={onHome} style={{ cursor: 'pointer' }}>
        <span className="sidebar-logo-owl">🦉</span>
        <span>Iman's Adventure</span>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {SIDEBAR_TABS.map(tab => (
          <button
            key={tab.id}
            className={`sidebar-item${activeTab === tab.id ? ' active' : ''}`}
            onClick={() => {
              if (tab.id === 'learn') {
                onHome();
              } else {
                onTabChange(tab.id);
              }
            }}
          >
            <span className="sidebar-item-icon">{tab.icon}</span>
            <span>{tab.label[language] || tab.label.bm}</span>
          </button>
        ))}

        {/* Divider */}
        <div style={{ height: 2, background: 'var(--border-color)', margin: '12px 0', borderRadius: 1 }} />

        {/* Language Toggle */}
        <button className="sidebar-item" onClick={onToggleLanguage}>
          <span className="sidebar-item-icon">🌐</span>
          <span>{language === 'bm' ? 'English' : 'Bahasa Melayu'}</span>
        </button>
      </nav>

      {/* Footer Stats */}
      <div className="sidebar-footer">
        <div className="sidebar-stat-row">
          <span>👤</span>
          <span style={{ color: 'var(--text-primary)' }}>{playerName || 'Player'}</span>
        </div>
        <div className="sidebar-stat-row">
          <span>⭐</span>
          <span style={{ color: 'var(--duo-yellow)' }}>{gameState?.totalXP ?? 0} XP</span>
        </div>
        <div className="sidebar-stat-row">
          <span>🏆</span>
          <span style={{ color: 'var(--duo-purple)' }}>Level {gameState?.level ?? 1}</span>
        </div>
        <div className="sidebar-stat-row">
          <span>🔥</span>
          <span style={{ color: 'var(--duo-orange)' }}>0 Streak</span>
        </div>
        <div className="sidebar-stat-row">
          <span>🪙</span>
          <span style={{ color: 'var(--duo-blue)' }}>{gameState?.mathCoins ?? 0} Coins</span>
        </div>
      </div>
    </aside>
  );
}
