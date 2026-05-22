import React from 'react';
import { GradCapIcon, TrophyIcon, ProfileIcon, MedalIcon, LanguageIcon } from './icons/GameIcons';

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
}) {
  const handleTab = (tabId) => {
    if (navigator.vibrate) navigator.vibrate(20);
    if (tabId === 'learn') {
      onHome?.();
    } else {
      onTabChange?.(tabId);
    }
  };

  return (
    <>
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
