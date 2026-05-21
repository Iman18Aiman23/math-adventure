import React, { useState, useEffect } from 'react';
import { GradCapIcon, TrophyIcon, MedalIcon, ProfileIcon, LanguageIcon } from './icons/GameIcons';
import MascotIcon from './icons/MascotIcon';
import { getGameData } from '../utils/gameStatsManager';

const sidebarLogoStyles = `
  .sidebar-logo-text {
    font-size: 1.2rem;
    font-weight: 900;
    background: linear-gradient(135deg, #E9D5FF 0%, #A78BFA 50%, #7C3AED 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: 1px;
    font-family: var(--font-heading);
    margin: 0;
    line-height: 1.1;
  }
  .sidebar-subtitle-text {
    color: #FDE68A;
    font-family: var(--font-heading);
    font-size: 0.75rem;
    letter-spacing: 2px;
    margin: 0;
    text-transform: uppercase;
  }

  /* Inactive sidebar items */
  .desktop-sidebar .sidebar-item {
    color: rgba(255,255,255,0.55) !important;
  }
  .desktop-sidebar .sidebar-item:hover:not(.active) {
    background: rgba(167,139,250,0.12) !important;
    color: rgba(255,255,255,0.9) !important;
  }

  /* Active tab — vivid cosmic gradient */
  .desktop-sidebar .sidebar-item.active {
    background-image: linear-gradient(144deg, #AF40FF, #5B42F3 50%, #00DDEB) !important;
    border: none !important;
    box-shadow: 0 4px 20px rgba(124,58,237,0.5) !important;
    backdrop-filter: none;
    color: #ffffff !important;
    border-radius: 12px !important;
  }

  .desktop-sidebar .sidebar-item.active .sidebar-item-icon {
    color: #ffffff !important;
  }

  /* Sidebar shell — space dark with glowing right border */
  .desktop-sidebar {
    background: linear-gradient(180deg, #130D2E 0%, #1E1145 50%, #130D2E 100%) !important;
    border-right: 2.5px solid #A78BFA !important;
    box-shadow: 4px 0 32px rgba(124,58,237,0.35), inset -1px 0 0 rgba(167,139,250,0.1) !important;
  }
`;

const SIDEBAR_TABS = [
  { id: 'learn', icon: GradCapIcon, label: { bm: 'Kursus', eng: 'Course' } },
  { id: 'leaderboard', icon: TrophyIcon, label: { bm: 'Papan Juara', eng: 'Leaderboard' } },
  { id: 'profile', icon: ProfileIcon, label: { bm: 'Profil', eng: 'Profile' } },
  { id: 'achievement', icon: MedalIcon, label: { bm: 'Pencapaian', eng: 'Achievement' } },
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
              style={{ gap: '2rem' }}
            >
              <span className="sidebar-item-icon">
                {React.createElement(tab.icon)}
              </span>
              <span>{tab.label[language] || tab.label.bm}</span>
            </button>
          ))}

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(167,139,250,0.25)', margin: '12px 0', borderRadius: 1 }} />

          {/* Language Toggle */}
          <button className="sidebar-item" onClick={onToggleLanguage} style={{ gap: '2rem' }}>
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
          borderTop: '1px solid rgba(167,139,250,0.2)',
          marginTop: 'auto',
          background: 'transparent'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1rem', filter: 'drop-shadow(0 2px 6px rgba(253,230,138,0.7))' }}>⭐</span>
            <span style={{ color: '#FDE68A', fontWeight: 700, fontSize: '0.85rem' }}>{stars} {language === 'bm' ? 'bintang' : 'stars'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1rem', filter: 'drop-shadow(0 2px 6px rgba(252,165,165,0.7))' }}>❤️</span>
            <span style={{ color: '#FCA5A5', fontWeight: 700, fontSize: '0.85rem' }}>{hearts} {language === 'bm' ? 'nyawa' : 'hearts'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1rem', filter: 'drop-shadow(0 2px 6px rgba(167,139,250,0.7))' }}>💎</span>
            <span style={{ color: '#C4B5FD', fontWeight: 700, fontSize: '0.85rem' }}>{gems} {language === 'bm' ? 'permata' : 'gems'}</span>
          </div>
        </div>
      </aside>
    </>
  );
}
