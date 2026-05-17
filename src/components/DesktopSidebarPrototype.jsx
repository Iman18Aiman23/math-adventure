import React, { useState, useEffect } from 'react';
import { LearnIcon, LeaderboardIcon, ProfileIcon, AchievementIcon, LanguageIcon } from './icons/SidebarIcons';
import MascotIcon from './icons/MascotIcon';
import { getGameData } from '../utils/gameStatsManager';

const sidebarLogoStyles = `
  .sidebar-logo-text {
    font-size: 1.2rem;
    font-weight: 900;
    background: linear-gradient(135deg, #2D4059 0%, #4A6FA5 50%, #A3D8F4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: 1px;
    font-family: var(--font-heading);
    margin: 0;
    line-height: 1.1;
  }
  .sidebar-subtitle-text {
    color: #F4C430;
    font-family: var(--font-heading);
    font-size: 0.75rem;
    letter-spacing: 2px;
    margin: 0;
    text-transform: uppercase;
  }
  
  /* Soft Purple Gradient for active tab */
  .desktop-sidebar .sidebar-item.active {
    background-image: linear-gradient(144deg,#AF40FF, #42f3a9 50%,#00DDEB);
    border: none !important;
    box-shadow: none !important;
    backdrop-filter: none;
    color: #ffffff !important;
    border-radius: 12px !important;
  }
  
  .desktop-sidebar .sidebar-item.active .sidebar-item-icon {
    color: #4338CA !important;
  }

  /* Ambient sidebar shadow */
  .desktop-sidebar {
    box-shadow: 4px 0 24px rgba(0, 0, 0, 0.04) !important;
    border-right: 2px solid rgba(255,255,255,0.8) !important;
    background: #FAFAFB !important;
  }
`;

const SIDEBAR_TABS = [
  { id: 'learn', icon: LearnIcon, label: { bm: 'Kursus', eng: 'Course' } },
  { id: 'leaderboard', icon: LeaderboardIcon, label: { bm: 'Papan Juara', eng: 'Leaderboard' } },
  { id: 'profile', icon: ProfileIcon, label: { bm: 'Profil', eng: 'Profile' } },
  { id: 'achievement', icon: AchievementIcon, label: { bm: 'Pencapaian', eng: 'Achievement' } },
];

export default function DesktopSidebar({
  activeTab, onTabChange, language, onToggleLanguage,
  playerName, gameState, onHome
}) {
  const [hearts, setHearts] = useState(3);
  const [gems, setGems] = useState(0);
  const [stars, setStars] = useState(0);

  useEffect(() => {
    const gameData = getGameData();
    setHearts(gameData.hearts);
    setGems(gameData.gems);
    setStars(gameData.stars);
  }, []);

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

        {/* Footer Stats - Vertical list matching image */}
        <div className="sidebar-footer" style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: '0.75rem',
          padding: '1.5rem',
          borderTop: '1px solid rgba(0,0,0,0.05)',
          marginTop: 'auto',
          background: 'transparent'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1rem', filter: 'drop-shadow(0 2px 2px rgba(255, 200, 0, 0.2))' }}>⭐</span>
            <span style={{ color: '#4B5563', fontWeight: 600, fontSize: '0.85rem' }}>{stars} {language === 'bm' ? 'bintang' : 'stars'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1rem', filter: 'drop-shadow(0 2px 2px rgba(255, 75, 75, 0.2))' }}>❤️</span>
            <span style={{ color: '#EF4444', fontWeight: 600, fontSize: '0.85rem' }}>{hearts} {language === 'bm' ? 'nyawa' : 'hearts'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1rem', filter: 'drop-shadow(0 2px 2px rgba(139, 92, 246, 0.2))' }}>💎</span>
            <span style={{ color: '#8B5CF6', fontWeight: 600, fontSize: '0.85rem' }}>{gems} {language === 'bm' ? 'permata' : 'gems'}</span>
          </div>
        </div>
      </aside>
    </>
  );
}
