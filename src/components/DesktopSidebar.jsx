import React, { useState, useEffect, useRef } from 'react';
import { GradCapIcon, TrophyIcon, MedalIcon, ProfileIcon, GearsIcon } from './icons/GameIcons';
import MascotIcon from './icons/MascotIcon';
import { getGameData } from '../utils/gameStatsManager';

const getSidebarStyles = (sidebarBg) => `
  .sidebar-logo-text {
    font-size: 1.2rem;
    font-weight: 900;
    background: linear-gradient(135deg, #B8EEFF 0%, #7B6ECF 50%, #3B2AAA 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: 1px;
    font-family: var(--font-heading);
    margin: 0;
    line-height: 1.1;
  }
  .sidebar-subtitle-text {
    color: #FFE4A0;
    font-family: var(--font-heading);
    font-size: 0.75rem;
    letter-spacing: 2px;
    margin: 0;
    text-transform: uppercase;
  }

  /* Inactive sidebar items */
  .desktop-sidebar .sidebar-item {
    color: rgba(255,255,255,0.65) !important;
  }
  .desktop-sidebar .sidebar-item:hover:not(.active) {
    background: rgba(255,255,255,0.12) !important;
    border-color: rgba(255,255,255,0.2) !important;
    color: #fff !important;
  }

  /* Active tab */
  .desktop-sidebar .sidebar-item.active {
    background: rgba(255,255,255,0.22) !important;
    border: none !important;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.2) !important;
    backdrop-filter: none;
    color: #ffffff !important;
    border-radius: 12px !important;
  }

  .desktop-sidebar .sidebar-item.active .sidebar-item-icon {
    color: #ffffff !important;
  }

  /* Sidebar shell */
  .desktop-sidebar {
    background: ${sidebarBg} !important;
    border-right: 2px solid rgba(255,255,255,0.15) !important;
    box-shadow: 4px 0 32px rgba(0,0,0,0.35), inset -1px 0 0 rgba(255,255,255,0.08) !important;
  }

  /* Theme swatch button */
  .theme-swatch-btn {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.3);
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }
  .theme-swatch-btn:hover {
    transform: scale(1.15);
    border-color: rgba(255,255,255,0.8);
  }
  .theme-swatch-btn.active {
    border-color: #fff;
    box-shadow: 0 0 0 2px rgba(255,255,255,0.5);
    transform: scale(1.1);
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
  playerName, gameState, onHome,
  theme, onThemeChange, themes,
}) {
  const [hearts, setHearts] = useState(3);
  const [gems, setGems] = useState(0);
  const [stars, setStars] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef(null);

  useEffect(() => {
    const gameData = getGameData();
    setHearts(gameData.hearts);
    setGems(gameData.gems);
    setStars(gameData.stars);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setSettingsOpen(false);
      }
    };

    if (settingsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [settingsOpen]);

  const handleLanguagePick = (lang) => {
    if (lang === language) return;
    onToggleLanguage?.();
  };

  const hasSettings = onToggleLanguage || (themes && onThemeChange);

  return (
    <>
      <style>{getSidebarStyles(theme?.sidebarBg || 'linear-gradient(180deg, #332881 0%, #4B39BB 35%, #3E309C 65%, #332881 100%)')}</style>
      <style>{`
        @keyframes settingsDropdownIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>

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

          {/* Settings Button with Dropdown */}
          {hasSettings && (
            <div ref={settingsRef} style={{ position: 'relative', zIndex: 100 }}>
              <button
                className={`sidebar-item${settingsOpen ? ' active' : ''}`}
                onClick={() => setSettingsOpen(p => !p)}
                style={{ gap: '2rem' }}
              >
                <span className="sidebar-item-icon">
                  <GearsIcon size={64} />
                </span>
                <span>{language === 'bm' ? 'Tetapan' : 'Settings'}</span>
              </button>

              {/* Settings Dropdown */}
              {settingsOpen && (
                <div
                  style={{
                    position: 'fixed',
                    top: '50%',
                    left: 'calc(var(--sidebar-w, 240px) + 16px)',
                    transform: 'translateY(-50%)',
                    background: 'white',
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: '0 10px 32px rgba(0,0,0,0.15)',
                    minWidth: '280px',
                    animation: 'settingsDropdownIn 0.2s ease-out',
                    zIndex: 1000,
                  }}
                >
                  <h3 style={{ margin: '0 0 18px 0', fontSize: '1rem', fontWeight: 700, color: '#1F2937' }}>
                    {language === 'bm' ? 'Tetapan' : 'Settings'}
                  </h3>

                  {onToggleLanguage && (
                    <div style={{ marginBottom: '18px' }}>
                      <p style={{ margin: '0 0 10px 0', fontSize: '0.75rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {language === 'bm' ? 'Bahasa' : 'Language'}
                      </p>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {['bm', 'eng'].map(lang => {
                          const isActive = language === lang;
                          return (
                            <button
                              key={lang}
                              onClick={() => handleLanguagePick(lang)}
                              style={{
                                flex: 1,
                                padding: '8px 12px',
                                borderRadius: '6px',
                                border: isActive ? '2px solid #6366F1' : '1px solid #E5E7EB',
                                background: isActive ? '#EEF2FF' : '#F9FAFB',
                                color: isActive ? '#4F46E5' : '#374151',
                                fontFamily: 'var(--font-body)',
                                fontWeight: 600,
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease',
                              }}
                            >
                              {lang === 'bm' ? 'BM' : 'EN'}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {themes && onThemeChange && (
                    <div>
                      <p style={{ margin: '0 0 10px 0', fontSize: '0.75rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {language === 'bm' ? 'Tema' : 'Theme'}
                      </p>
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {Object.values(themes).map(t => {
                          const isActive = theme?.key === t.key;
                          return (
                            <button
                              key={t.key}
                              onClick={() => onThemeChange(t.key)}
                              title={t.label}
                              style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '6px',
                                background: t.swatch,
                                border: isActive ? '3px solid #1F2937' : '1px solid rgba(0,0,0,0.1)',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease',
                                transform: isActive ? 'scale(1.05)' : 'scale(1)',
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
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
