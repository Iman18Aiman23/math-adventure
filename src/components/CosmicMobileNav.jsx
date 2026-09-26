import { BookOpen, Trophy, UserRound, Medal, Settings, House, Moon, Sun } from 'lucide-react';
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
  appearance = 'default',
  activeTab = 'learn',
  language = 'bm',
  onTabChange,
  onHome,
  onToggleLang,
  theme,
  colorMode = 'light',
  onColorModeChange,
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

  const handleAppearancePick = (mode) => {
    if (navigator.vibrate) navigator.vibrate(15);
    onColorModeChange?.(mode);
  };

  const handleLanguagePick = (lang) => {
    if (lang === language) return;
    if (navigator.vibrate) navigator.vibrate(15);
    onToggleLang?.();
  };

  const hasSettings = onColorModeChange || onToggleLang;

  const accentColor = theme?.swatch    || '#6366F1';
  const glowColor   = theme?.heroBorder || '#a5b4fc';

  const navCssVars = useMemo(() => ({
    '--nav-accent':     accentColor,
    '--nav-glow':       glowColor,
    '--nav-accent-rgb': hexToRgb(accentColor),
    '--nav-glow-rgb':   hexToRgb(glowColor),
  }), [accentColor, glowColor]);

  // Home uses the reference's five destinations. Language/appearance controls remain
  // available through the homepage header; other pages retain their existing nav.
  if (appearance === 'home') {
    const homeTabs = [
      { id: 'home', icon: House, label: 'Home' },
      { id: 'learn', icon: BookOpen, label: language === 'bm' ? 'Kursus' : 'Courses' },
      { id: 'leaderboard', icon: Trophy, label: language === 'bm' ? 'Papan Juara' : 'Leaderboard' },
      { id: 'achievement', icon: Medal, label: language === 'bm' ? 'Pencapaian' : 'Achievements' },
      { id: 'profile', icon: UserRound, label: language === 'bm' ? 'Profil' : 'Profile' },
    ];
    return <nav className="cosmic-nav ih-mobile-nav" aria-label={language === 'bm' ? 'Navigasi utama' : 'Main navigation'}>
      {homeTabs.map(tab => <button type="button" key={tab.id} className={tab.id === 'home' ? 'is-active' : ''} aria-current={tab.id === 'home' ? 'page' : undefined} onClick={() => tab.id === 'home' ? onHome?.() : handleTab(tab.id)}>
        {React.createElement(tab.icon, { size: 21, 'aria-hidden': true })}<span>{tab.label}</span>
      </button>)}
    </nav>;
  }

  return (
    <>
      {/* Settings popup (language + appearance) */}
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
            background: colorMode === 'dark' ? '#172033' : '#ffffff',
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
                        border: isActive ? `2px solid ${colorMode === 'dark' ? '#34D399' : '#1F2937'}` : `2px solid ${colorMode === 'dark' ? '#35445D' : 'rgba(0,0,0,0.08)'}`,
                        background: isActive ? (colorMode === 'dark' ? '#164E3D' : '#1F2937') : (colorMode === 'dark' ? '#111B2D' : '#F3F4F6'),
                        color: isActive ? '#ffffff' : (colorMode === 'dark' ? '#DCE6F5' : '#374151'),
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

            {onToggleLang && onColorModeChange && (
              <div style={{ height: 1, background: 'rgba(0,0,0,0.08)', margin: '2px 4px' }} />
            )}

            {onColorModeChange && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {[['light', Sun, language === 'bm' ? 'Cerah' : 'Light'], ['dark', Moon, language === 'bm' ? 'Gelap' : 'Dark']].map(([mode, Icon, label]) => {
                  const isActive = colorMode === mode;
                  return <button key={mode} onClick={() => handleAppearancePick(mode)} aria-pressed={isActive} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px 12px', borderRadius: 12, border: isActive ? '2px solid #10B981' : `1px solid ${colorMode === 'dark' ? '#35445D' : '#D7E0EA'}`, background: isActive ? (colorMode === 'dark' ? '#164E3D' : '#E8FAF2') : (colorMode === 'dark' ? '#111B2D' : '#F5F8FB'), color: colorMode === 'dark' ? '#E8EEF8' : '#263A57', fontWeight: 700, cursor: 'pointer' }}>{React.createElement(Icon, { size: 17 })}{label}</button>;
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
                    {React.createElement((appearance === 'math' || appearance === 'reading') ? ({ learn: BookOpen, leaderboard: Trophy, profile: UserRound, achievement: Medal }[tab.id]) : tab.icon, { size: 22, 'aria-hidden': true })}
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
                    {(appearance === 'math' || appearance === 'reading') ? <Settings size={22} aria-hidden="true" /> : <GearsIcon size={22} />}
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
