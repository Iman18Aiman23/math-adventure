import React, { useState, useEffect, useRef } from 'react';
import { GraduationCap, Trophy, Medal, User, Settings, Star, Heart, Gem } from 'lucide-react';
import { getGameData } from '../utils/gameStatsManager';

const getSidebarStyles = () => `
  /* ── Sidebar shell ─────────────────────────────────────────────
     Single, uniform light surface matching the BM module page
     (#F7F8FA) — no dark gradient, no heavy drop shadow. */
  .desktop-sidebar {
    background: #F7F8FA !important;
    border-right: 2px solid #ECECEC !important;
    box-shadow: none !important;
    font-family: 'Nunito', sans-serif;
    gap: 0;
  }

  /* ── Logo: text wordmark + gradient monogram badge ──────────── */
  .sidebar-logo-badge {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 58px;
    height: 58px;
    border-radius: 18px;
    background: linear-gradient(135deg, #9A6BE8 0%, #7A4FD0 48%, #3F2A86 100%);
    box-shadow: 0 8px 18px rgba(95, 58, 196, 0.35),
                inset 0 2px 0 rgba(255,255,255,0.25),
                inset 0 -3px 0 rgba(0,0,0,0.18);
    font-family: 'Fredoka', system-ui, sans-serif;
    line-height: 1;
    flex-shrink: 0;
    transition: transform .15s ease;
  }
  .sidebar-logo:hover .sidebar-logo-badge { transform: translateY(-2px); }
  .sidebar-logo-badge-main {
    font-size: 1.05rem;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -0.01em;
    text-shadow: 0 2px 0 rgba(0,0,0,0.18);
  }
  .sidebar-logo-badge-sub {
    font-size: 0.5rem;
    font-weight: 700;
    color: #FFD66B;
    letter-spacing: 2px;
    text-transform: lowercase;
    margin-top: 2px;
    text-shadow: 0 1px 0 rgba(0,0,0,0.18);
  }
  .sidebar-logo-text {
    font-size: 1.4rem;
    font-weight: 700;
    background: linear-gradient(135deg, #9A6BE8 0%, #7A4FD0 50%, #3F2A86 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: 0.3px;
    font-family: 'Fredoka', system-ui, sans-serif;
    margin: 0;
    line-height: 1.05;
  }
  .sidebar-subtitle-text {
    color: #9AA0AB;
    font-family: 'Nunito', sans-serif;
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 2.5px;
    margin: 3px 0 0;
    text-transform: uppercase;
  }

  /* ── Nav items: white "game-button" cards ─────────────────────
     Resting = white face, chunky gray border, gray text. */
  .desktop-sidebar .sidebar-item {
    font-family: 'Nunito', sans-serif !important;
    font-weight: 900 !important;
    font-size: 0.95rem !important;
    border: 3px solid #E6E6E6 !important;
    background: #ffffff !important;
    border-radius: 16px !important;
    color: #707070 !important;
    box-shadow: none !important;
    padding: 12px 16px !important;
    transition: transform .1s ease, border-color .15s ease, color .15s ease, background .15s ease !important;
    -webkit-tap-highlight-color: transparent;
  }
  /* Hover: lift up like a bubble */
  .desktop-sidebar .sidebar-item:hover:not(.active) {
    transform: translateY(-2px) !important;
    border-color: #D8D8D8 !important;
    background: #ffffff !important;
    color: #4A4A4A !important;
  }
  /* Press: sink for tactile feedback */
  .desktop-sidebar .sidebar-item:active {
    transform: translateY(2px) !important;
  }
  /* Active: single purple surface + darker purple border (one accent,
     matching the Statistik module — #A368F0 face / #7038D6 border) */
  .desktop-sidebar .sidebar-item.active {
    background: #A368F0 !important;
    border: 3px solid #7038D6 !important;
    color: #ffffff !important;
    box-shadow: none !important;
    text-shadow: 1px 2px 0 rgba(0,0,0,0.12);
    backdrop-filter: none;
  }
  /* Icons follow the text colour (lucide uses currentColor) */
  .desktop-sidebar .sidebar-item-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: inherit !important;
    filter: drop-shadow(0 1px 1px rgba(0,0,0,0.08));
  }
  .desktop-sidebar .sidebar-item.active .sidebar-item-icon {
    color: #ffffff !important;
  }

  .desktop-sidebar .sidebar-nav { gap: 10px; }

  /* ── Footer stat pills: small white game-cards ───────────────── */
  .sidebar-stat-pill {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    box-sizing: border-box;
    background: #ffffff;
    border: 3px solid #EDEDED;
    border-radius: 14px;
    padding: 9px 14px;
    font-family: 'Nunito', sans-serif;
    font-weight: 900;
    font-size: 0.85rem;
  }

  /* ── Settings dropdown game-style toggles ────────────────────── */
  .settings-pill-btn {
    font-family: 'Nunito', sans-serif;
    font-weight: 900;
    border-radius: 12px;
    cursor: pointer;
    transition: transform .1s ease, border-color .15s ease, background .15s ease;
  }
  .settings-pill-btn:hover { transform: translateY(-1px); }
  .settings-pill-btn:active { transform: translateY(1px); }
`;

// Active state uses a single purple accent (set in CSS), so tabs only
// need their icon + label.
const SIDEBAR_TABS = [
  { id: 'learn',       icon: GraduationCap, label: { bm: 'Kursus',      eng: 'Course' } },
  { id: 'leaderboard', icon: Trophy,        label: { bm: 'Papan Juara', eng: 'Leaderboard' } },
  { id: 'profile',     icon: User,          label: { bm: 'Profil',      eng: 'Profile' } },
  { id: 'achievement', icon: Medal,         label: { bm: 'Pencapaian',  eng: 'Achievement' } },
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
      <style>{getSidebarStyles()}</style>
      <style>{`
        @keyframes settingsDropdownIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>

      <aside className="desktop-sidebar">
        {/* Logo — pure text wordmark + monogram badge (no SVG) */}
        <div className="sidebar-logo" onClick={onHome} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}>
          <div className="sidebar-logo-badge" aria-hidden="true">
            <span className="sidebar-logo-badge-main">Iman</span>
            <span className="sidebar-logo-badge-sub">core</span>
          </div>
          <div style={{ textAlign: 'center', width: '100%' }}>
            <h2 className="sidebar-subtitle-text">Learning Hub</h2>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {SIDEBAR_TABS.map(tab => (
            <button
              key={tab.id}
              className={`sidebar-item${activeTab === tab.id ? ' active' : ''}`}
              style={{ gap: '1rem' }}
              onClick={() => {
                if (tab.id === 'learn') {
                  onHome();
                } else {
                  onTabChange(tab.id);
                }
              }}
            >
              <span className="sidebar-item-icon">
                {React.createElement(tab.icon, { size: 24, strokeWidth: 2.4 })}
              </span>
              <span>{tab.label[language] || tab.label.bm}</span>
            </button>
          ))}

          {/* Divider */}
          <div style={{ height: 2, background: '#ECECEC', margin: '10px 4px', borderRadius: 2 }} />

          {/* Settings Button with Dropdown */}
          {hasSettings && (
            <div ref={settingsRef} style={{ position: 'relative', zIndex: 100 }}>
              <button
                className={`sidebar-item${settingsOpen ? ' active' : ''}`}
                onClick={() => setSettingsOpen(p => !p)}
                style={{ gap: '1rem', width: '100%' }}
              >
                <span className="sidebar-item-icon">
                  <Settings size={24} strokeWidth={2.4} />
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
                    borderRadius: '18px',
                    padding: '20px',
                    border: '3px solid #ECECEC',
                    boxShadow: '0 10px 32px rgba(0,0,0,0.12)',
                    minWidth: '280px',
                    animation: 'settingsDropdownIn 0.2s ease-out',
                    zIndex: 1000,
                  }}
                >
                  <h3 style={{ margin: '0 0 18px 0', fontFamily: "'Fredoka', system-ui, sans-serif", fontSize: '1.05rem', fontWeight: 700, color: '#3F2A86' }}>
                    {language === 'bm' ? 'Tetapan' : 'Settings'}
                  </h3>

                  {onToggleLanguage && (
                    <div style={{ marginBottom: '18px' }}>
                      <p style={{ margin: '0 0 10px 0', fontFamily: "'Nunito', sans-serif", fontSize: '0.72rem', fontWeight: 900, color: '#9AA0AB', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {language === 'bm' ? 'Bahasa' : 'Language'}
                      </p>
                      <div style={{ display: 'flex', gap: 10 }}>
                        {['bm', 'eng'].map(lang => {
                          const isActive = language === lang;
                          return (
                            <button
                              key={lang}
                              className="settings-pill-btn"
                              onClick={() => handleLanguagePick(lang)}
                              style={{
                                flex: 1,
                                padding: '10px 12px',
                                border: isActive ? '3px solid #7038D6' : '3px solid #E6E6E6',
                                background: isActive ? '#A368F0' : '#ffffff',
                                color: isActive ? '#ffffff' : '#707070',
                                fontSize: '0.9rem',
                                textShadow: isActive ? '1px 2px 0 rgba(0,0,0,0.12)' : 'none',
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
                      <p style={{ margin: '0 0 10px 0', fontFamily: "'Nunito', sans-serif", fontSize: '0.72rem', fontWeight: 900, color: '#9AA0AB', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {language === 'bm' ? 'Tema' : 'Theme'}
                      </p>
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {Object.values(themes).map(t => {
                          const isActive = theme?.key === t.key;
                          return (
                            <button
                              key={t.key}
                              className="settings-pill-btn"
                              onClick={() => onThemeChange(t.key)}
                              title={t.label}
                              style={{
                                width: '38px',
                                height: '38px',
                                background: t.swatch,
                                border: isActive ? '3px solid #3F2A86' : '3px solid #E6E6E6',
                                transform: isActive ? 'scale(1.06)' : 'scale(1)',
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

        {/* Footer Stats — white game-card pills */}
        <div className="sidebar-footer" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: '0.6rem',
          padding: '1.25rem',
          borderTop: '2px solid #ECECEC',
          marginTop: 'auto',
          background: 'transparent'
        }}>
          <div className="sidebar-stat-pill">
            <Star size={18} color="#F59E0B" fill="#FCD34D" />
            <span style={{ color: '#B45309' }}>{stars} {language === 'bm' ? 'bintang' : 'stars'}</span>
          </div>
          <div className="sidebar-stat-pill">
            <Heart size={18} color="#EF4444" fill="#FCA5A5" />
            <span style={{ color: '#DC2626' }}>{hearts} {language === 'bm' ? 'nyawa' : 'hearts'}</span>
          </div>
          <div className="sidebar-stat-pill">
            <Gem size={18} color="#8B5CF6" fill="#C4B5FD" />
            <span style={{ color: '#7C3AED' }}>{gems} {language === 'bm' ? 'permata' : 'gems'}</span>
          </div>
        </div>
      </aside>
    </>
  );
}
