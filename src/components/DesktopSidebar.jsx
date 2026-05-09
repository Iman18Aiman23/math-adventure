import React from 'react';
import { LearnIcon, LeaderboardIcon, ProfileIcon, LanguageIcon } from './icons/SidebarIcons';
import MascotIcon from './icons/MascotIcon';

const sidebarLogoStyles = `
  .sidebar-logo-text {
    font-size: 1.2rem;
    font-weight: 900;
    background: linear-gradient(135deg, #2D4059 0%, #4A6FA5 50%, #A3D8F4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: 1px;
    font-family: 'Fredoka One', cursive;
    margin: 0;
    line-height: 1.1;
  }
  .sidebar-subtitle-text {
    color: #F4C430;
    font-family: 'Fredoka One', cursive;
    font-size: 0.75rem;
    letter-spacing: 2px;
    margin: 0;
    text-transform: uppercase;
  }
`;

const SIDEBAR_TABS = [
  { id: 'learn',       icon: LearnIcon, label: { bm: 'Kursus',      eng: 'Course'       } },
  { id: 'leaderboard', icon: LeaderboardIcon, label: { bm: 'Papan Juara', eng: 'Leaderboard'  } },
  { id: 'profile',     icon: ProfileIcon, label: { bm: 'Profil',      eng: 'Profile'      } },
];

export default function DesktopSidebar({
  activeTab, onTabChange, language, onToggleLanguage,
  playerName, gameState, onHome
}) {
  return (
    <>
      <style>{sidebarLogoStyles}</style>
      <aside className="desktop-sidebar">
        {/* Logo */}
        <div className="sidebar-logo" onClick={onHome} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '56px', height: '56px', flexShrink: 0 }}>
            <MascotIcon size={56} />
          </div>
          <div style={{ textAlign: 'center', width: '100%' }}>
            <h1 className="sidebar-logo-text">ImanCore</h1>
            <h2 className="sidebar-subtitle-text">Learning Hub</h2>
          </div>
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
            <span className="sidebar-item-icon">
              {React.createElement(tab.icon)}
            </span>
            <span>{tab.label[language] || tab.label.bm}</span>
          </button>
        ))}

        {/* Divider */}
        <div style={{ height: 2, background: 'var(--border-color)', margin: '12px 0', borderRadius: 1 }} />

        {/* Language Toggle */}
        <button className="sidebar-item" onClick={onToggleLanguage}>
          <span className="sidebar-item-icon">
            <LanguageIcon />
          </span>
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
          <span>💰</span>
          <span style={{ color: 'var(--duo-blue)' }}>{gameState?.mathCoins ?? 0} Coins</span>
        </div>
      </div>
      </aside>
    </>
  );
}
