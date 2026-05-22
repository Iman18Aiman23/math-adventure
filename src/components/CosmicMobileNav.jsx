import React, { useState } from 'react';
import { GradCapIcon, TrophyIcon, ProfileIcon, MedalIcon, LanguageIcon } from './icons/GameIcons';

// Inline palette icon (matches stroke style of other nav icons)
const PaletteIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
    <circle cx="8.5"  cy="7.5"  r=".5" fill="currentColor" />
    <circle cx="6.5"  cy="12.5" r=".5" fill="currentColor" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
  </svg>
);

const TABS = [
  { id: 'learn',       icon: GradCapIcon, label: { bm: 'Kursus',     eng: 'Course'      }, badge: false },
  { id: 'leaderboard', icon: TrophyIcon,  label: { bm: 'Ranking',    eng: 'Ranking'     }, badge: true  },
  { id: 'profile',     icon: ProfileIcon, label: { bm: 'Profil',     eng: 'Profile'     }, badge: false },
  { id: 'achievement', icon: MedalIcon,   label: { bm: 'Pencapaian', eng: 'Achievement' }, badge: true  },
];

export default function CosmicMobileNav({
  activeTab = 'learn',
  language = 'bm',
  onTabChange,
  onHome,
  onToggleLang,
  theme,
  themes,
  onThemeChange,
}) {
  const [pickerOpen, setPickerOpen] = useState(false);

  const handleTab = (tabId) => {
    if (navigator.vibrate) navigator.vibrate(20);
    if (tabId === 'learn') {
      onHome?.();
    } else {
      onTabChange?.(tabId);
    }
  };

  const handleThemePick = (key) => {
    if (navigator.vibrate) navigator.vibrate(15);
    onThemeChange?.(key);
    setPickerOpen(false);
  };

  return (
    <>
      {/* Theme picker popup */}
      {pickerOpen && themes && (
        <>
          <div
            onClick={() => setPickerOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'transparent',
              zIndex: 998,
            }}
          />
          <div style={{
            position: 'fixed',
            bottom: 'calc(96px + var(--safe-bottom, 0px))',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '14px',
            padding: '12px 18px',
            background: '#ffffff',
            borderRadius: '100px',
            boxShadow: '0 12px 32px rgba(17,24,39,0.18), 0 0 0 1px rgba(17,24,39,0.06)',
            zIndex: 999,
            animation: 'themePickerIn 0.18s ease-out',
          }}>
            {Object.values(themes).map(t => {
              const isActive = theme?.key === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => handleThemePick(t.key)}
                  title={t.label}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: t.swatch,
                    border: isActive ? '3px solid #1F2937' : '2px solid rgba(0,0,0,0.08)',
                    boxShadow: isActive ? '0 0 0 3px rgba(0,0,0,0.06)' : 'none',
                    cursor: 'pointer',
                    transition: 'transform 0.15s ease',
                    padding: 0,
                    flexShrink: 0,
                    transform: isActive ? 'scale(1.1)' : 'scale(1)',
                  }}
                />
              );
            })}
          </div>
          <style>{`
            @keyframes themePickerIn {
              from { opacity: 0; transform: translate(-50%, 8px); }
              to   { opacity: 1; transform: translate(-50%, 0);   }
            }
          `}</style>
        </>
      )}

      <nav className="cosmic-nav">
        <div className="nav-glass">
          <div className="nav-items">
            {TABS.map(tab => (
              <button
                key={tab.id}
                className={`nav-item${activeTab === tab.id ? ' active' : ''}`}
                onClick={() => handleTab(tab.id)}
              >
                <div className="nav-sphere">
                  <div className="nav-orbit" />
                  <span className="nav-icon-wrap">
                    {React.createElement(tab.icon, { size: 22 })}
                  </span>
                  {tab.badge && <div className="nav-badge show" />}
                </div>
                <span className="nav-label">{tab.label[language] || tab.label.eng}</span>
              </button>
            ))}

            {/* Theme picker toggle */}
            {themes && onThemeChange && (
              <button
                className={`nav-item${pickerOpen ? ' active' : ''}`}
                onClick={() => {
                  if (navigator.vibrate) navigator.vibrate(20);
                  setPickerOpen(p => !p);
                }}
              >
                <div className="nav-sphere">
                  <div className="nav-orbit" />
                  <span className="nav-icon-wrap">
                    <PaletteIcon size={22} />
                  </span>
                </div>
                <span className="nav-label">{language === 'bm' ? 'Tema' : 'Theme'}</span>
              </button>
            )}

            <button
              className="nav-item"
              onClick={() => {
                if (navigator.vibrate) navigator.vibrate(20);
                onToggleLang?.();
              }}
            >
              <div className="nav-sphere">
                <div className="nav-orbit" />
                <span className="nav-icon-wrap">
                  <LanguageIcon size={22} />
                </span>
              </div>
              <span className="nav-label">{language === 'bm' ? 'EN' : 'BM'}</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
