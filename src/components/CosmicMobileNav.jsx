import React, { useState, useRef, useEffect, useMemo } from 'react';
import { GradCapIcon, TrophyIcon, ProfileIcon, MedalIcon, GearsIcon } from './icons/GameIcons';

const hexToRgb = (hex) => {
  const h = (hex || '#6366F1').replace('#', '');
  return `${parseInt(h.slice(0,2),16)},${parseInt(h.slice(2,4),16)},${parseInt(h.slice(4,6),16)}`;
};

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
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef(null);
  const settingsBtnRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        settingsRef.current && !settingsRef.current.contains(event.target) &&
        settingsBtnRef.current && !settingsBtnRef.current.contains(event.target)
      ) {
        setSettingsOpen(false);
      }
    };

    if (settingsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('touchstart', handleClickOutside);
      };
    }
  }, [settingsOpen]);

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
  };

  const handleLanguagePick = (lang) => {
    if (lang === language) return;
    if (navigator.vibrate) navigator.vibrate(15);
    onToggleLang?.();
  };

  const hasSettings = (themes && onThemeChange) || onToggleLang;

  const accentColor = theme?.swatch    || '#6366F1';
  const glowColor   = theme?.heroBorder || '#a5b4fc';

  const navCssVars = useMemo(() => ({
    '--nav-accent':     accentColor,
    '--nav-glow':       glowColor,
    '--nav-accent-rgb': hexToRgb(accentColor),
    '--nav-glow-rgb':   hexToRgb(glowColor),
  }), [accentColor, glowColor]);

  return (
    <>
      {/* Settings popup (language + theme) */}
      {settingsOpen && hasSettings && (
        <>
          <div ref={settingsRef} style={{
            position: 'fixed',
            bottom: 'calc(96px + var(--safe-bottom, 0px))',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '14px 18px',
            background: '#ffffff',
            borderRadius: '24px',
            border: `1.5px solid rgba(${hexToRgb(accentColor)}, 0.2)`,
            boxShadow: `0 12px 32px rgba(17,24,39,0.16), 0 0 0 1px rgba(${hexToRgb(glowColor)}, 0.12), 0 -6px 20px rgba(${hexToRgb(glowColor)}, 0.1)`,
            zIndex: 999,
            animation: 'settingsPickerIn 0.18s ease-out',
            minWidth: '220px',
          }}>
            {onToggleLang && (
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                {['bm', 'eng'].map(lang => {
                  const isActive = language === lang;
                  return (
                    <button
                      key={lang}
                      onClick={() => handleLanguagePick(lang)}
                      style={{
                        flex: 1,
                        padding: '8px 14px',
                        borderRadius: '999px',
                        border: isActive ? '2px solid #1F2937' : '2px solid rgba(0,0,0,0.08)',
                        background: isActive ? '#1F2937' : '#F3F4F6',
                        color: isActive ? '#ffffff' : '#374151',
                        fontFamily: 'var(--font-body)',
                        fontWeight: 700,
                        fontSize: 13,
                        letterSpacing: '0.5px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {lang === 'bm' ? 'BM' : 'EN'}
                    </button>
                  );
                })}
              </div>
            )}

            {onToggleLang && themes && onThemeChange && (
              <div style={{ height: 1, background: 'rgba(0,0,0,0.08)', margin: '2px 4px' }} />
            )}

            {themes && onThemeChange && (
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', padding: '4px 0' }}>
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
            )}
          </div>
          <style>{`
            @keyframes settingsPickerIn {
              from { opacity: 0; transform: translate(-50%, 8px); }
              to   { opacity: 1; transform: translate(-50%, 0);   }
            }
          `}</style>
        </>
      )}

      <nav className="cosmic-nav" style={navCssVars}>
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

            {/* Settings toggle (language + theme) */}
            {hasSettings && (
              <button
                ref={settingsBtnRef}
                className={`nav-item${settingsOpen ? ' active' : ''}`}
                onClick={() => {
                  if (navigator.vibrate) navigator.vibrate(20);
                  setSettingsOpen(p => !p);
                }}
              >
                <div className="nav-sphere">
                  <div className="nav-orbit" />
                  <span className="nav-icon-wrap">
                    <GearsIcon size={22} />
                  </span>
                </div>
                <span className="nav-label">{language === 'bm' ? 'Tetapan' : 'Settings'}</span>
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
