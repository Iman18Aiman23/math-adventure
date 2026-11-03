import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Medal, Settings, Flag, ChevronRight, BookOpen, Mic, Calculator, Moon, Sun, UserRound, Crown, Swords, House, Play } from 'lucide-react';
import StatsBar from './_shared/StatsBar';
import ImanAILogo from './_shared/ImanAILogo';
import useGamification from '../hooks/useGamification';
import './DesktopSidebar.css';
import { canAccessSubject } from '../utils/subjectAccess';

function countCompletedTopics(topics = {}) {
  return Object.values(topics).filter((topic) => (topic?.crownLevel || 0) >= 1).length;
}

export default function DesktopSidebar({
  activeTab, onTabChange, language, onToggleLanguage,
  onHome, onOpenReports,
  colorMode = 'light', onColorModeChange,
  onContinueLearning, currentSubject, onSelectSubject, isJawi = false,
  onSelectAchievementSection, achievementSection = 'assessments', playerName,
  onUpgradePlan,
}) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef(null);
  const showExtendedNav = false;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setIsSettingsOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsSettingsOpen(false);
      }
    };
    if (isSettingsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isSettingsOpen]);

  const hasSettings = onToggleLanguage || onColorModeChange;
  const { completedTopics: bmTopics } = useGamification('bm');
  const { completedTopics: mathTopics } = useGamification('mt');
  const { completedTopics: piTopics } = useGamification('pi');
  const subjectProgress = {
    bm: countCompletedTopics(bmTopics),
    math: countCompletedTopics(mathTopics),
    jawi: countCompletedTopics(piTopics),
  };
  const subjects = [
    { id: 'reading', label: language === 'bm' ? 'Membaca' : 'Reading', icon: BookOpen },
    { id: 'bm', label: language === 'bm' ? 'Sebutan' : 'Speaking', icon: Mic, progressKey: 'bm' },
    { id: 'math', label: language === 'bm' ? 'Matematik' : 'Mathematics', icon: Calculator, progressKey: 'math' },
    { id: 'jawi', label: 'Jawi', icon: Moon, progressKey: 'jawi' },
  ];
  const progressLabel = language === 'bm' ? 'topik selesai' : 'topics completed';
  const homeIsActive = activeTab === 'learn' && !currentSubject;
  const challengesAreActive = activeTab === 'achievement' && achievementSection === 'assessments';
  const leaderboardIsActive = activeTab === 'leaderboard';
  const achievementsAreActive = activeTab === 'achievement' && achievementSection === 'achievements';

  return (
    <>


      <aside className="desktop-sidebar">
        <div className="sidebar-logo-wrap">
          <button className="sidebar-logo" type="button" onClick={onHome} aria-label={language === 'bm' ? 'ImanAI �?" Halaman utama' : 'ImanAI �?" Home'}>
            <ImanAILogo language={language} />
          </button>
        </div>

        <button type="button" className="sidebar-continue" onClick={onContinueLearning || onHome}>
          <Play className="sidebar-play-icon" size={19} aria-hidden="true" />
          <span>{language === 'bm' ? 'Teruskan belajar' : 'Continue learning'}</span>
          <ChevronRight className="sidebar-continue-arrow" size={19} aria-hidden="true" />
        </button>

        <div className="sidebar-menu-panel">
          <nav className="home-quick-nav" aria-label={language === 'bm' ? 'Menu utama' : 'Main menu'}>
            <button type="button" aria-current={homeIsActive ? 'page' : undefined} className={`home-quick-link home-quick-home ${homeIsActive ? 'active' : ''}`} onClick={() => onHome?.()}><House size={22} aria-hidden="true" /><span>{language === 'bm' ? 'Laman Utama' : 'Home'}</span></button>
            <div className="sidebar-section-label" aria-hidden="true">{language === 'bm' ? 'SUBJEK' : 'SUBJECTS'}</div>
            {subjects.map(({ id, label, icon: Icon, progressKey }) => {
              const count = progressKey ? subjectProgress[progressKey] : 0;
              const isActive = activeTab === 'learn' && (id === 'jawi' ? isJawi : currentSubject === id);
              return (
                <button
                  key={id}
                  type="button"
                  disabled={!canAccessSubject(playerName, id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`home-quick-link home-quick-${id} ${isActive ? 'active' : ''}`}
                  onClick={() => onSelectSubject?.(id)}
                  aria-label={count > 0 ? `${label}, ${count} ${progressLabel}` : label}
                >
                  {React.createElement(Icon, { size: 22, 'aria-hidden': true })}
                  <span>{label}</span>
                  {count > 0 && <span className="sidebar-progress-badge" aria-hidden="true">{count}</span>}
                </button>
              );
            })}
            <div className="sidebar-section-label sidebar-section-label-activity">{language === 'bm' ? 'GANJARAN' : 'REWARDS'}</div>
            <button type="button" aria-current={challengesAreActive ? 'page' : undefined} className={`home-quick-link home-quick-challenges ${challengesAreActive ? 'active' : ''}`} onClick={() => onSelectAchievementSection?.('assessments')}><Swords size={22} aria-hidden="true" /><span>{language === 'bm' ? 'Cabaran' : 'Challenges'}</span></button>
            <button type="button" aria-current={leaderboardIsActive ? 'page' : undefined} className={`home-quick-link home-quick-leaderboard ${leaderboardIsActive ? 'active' : ''}`} onClick={() => onTabChange?.('leaderboard')}><Trophy size={22} aria-hidden="true" /><span>{language === 'bm' ? 'Papan Juara' : 'Leaderboard'}</span></button>
            <button type="button" aria-current={achievementsAreActive ? 'page' : undefined} className={`home-quick-link home-quick-achievements ${achievementsAreActive ? 'active' : ''}`} onClick={() => onSelectAchievementSection?.('achievements')}><Medal size={22} aria-hidden="true" /><span>{language === 'bm' ? 'Pencapaian Saya' : 'My Achievements'}</span></button>
            {showExtendedNav && <><div className="sidebar-nav-divider" />
            <button type="button" className={`home-quick-link home-quick-profile ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => onTabChange?.('profile')}><UserRound /><span>{language === 'bm' ? 'Profil' : 'Profile'}</span></button>
            <button type="button" className={`home-quick-link home-quick-reports ${currentSubject === 'matematik-reports' ? 'active' : ''}`} onClick={() => onOpenReports?.()}>
              <Flag size={22} />
              <span>{language === 'bm' ? 'Laporan' : 'Reports'}</span>
            </button>
            </>}
          </nav>

          {showExtendedNav && <div className="home-coach-footer">
            <div className="sidebar-utility-row">
              <div className="home-top-actions">
                <StatsBar forceBundled={true} variant="mb" />
              </div>

              {hasSettings && (
                <div className="home-settings-wrap" ref={settingsRef}>
                  <button
                    type="button"
                    className="home-settings-btn"
                    onClick={() => setIsSettingsOpen(p => !p)}
                    aria-label={language === 'bm' ? 'Buka tetapan' : 'Open settings'}
                    aria-expanded={isSettingsOpen}
                    aria-haspopup="dialog"
                  >
                    <Settings size={21} strokeWidth={2.4} />
                    <span>{language === 'bm' ? 'Tetapan' : 'Settings'}</span>
                  </button>
                {isSettingsOpen && (
                  <div className="home-settings-popover" role="dialog" aria-label={language === 'bm' ? 'Tetapan' : 'Settings'}>
                  <div className="mt-settings-heading">
                    {language === 'bm' ? 'Pilih Bahasa' : 'Language'}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
                    <button
                      className={`mt-lang-btn ${language === 'bm' ? 'active' : ''}`}
                      onClick={() => { if (language !== 'bm') onToggleLanguage?.(); setIsSettingsOpen(false); }}
                    >
                      <span className="mt-lang-flag">🇲🇾</span>
                      <span>Bahasa</span>
                    </button>
                    <button
                      className={`mt-lang-btn ${language === 'en' ? 'active' : ''}`}
                      onClick={() => { if (language !== 'en') onToggleLanguage?.(); setIsSettingsOpen(false); }}
                    >
                      <span className="mt-lang-flag">🇬🇧</span>
                      <span>English</span>
                    </button>
                  </div>
                  {onColorModeChange && (
                    <>
                      <div className="mt-settings-heading" style={{ marginTop: '4px' }}>
                        {language === 'bm' ? 'Paparan' : 'Appearance'}
                      </div>
                      <div className="mt-theme-list">
                        <button className={`mt-theme-btn ${colorMode === 'light' ? 'active' : ''}`} onClick={() => { onColorModeChange('light'); setIsSettingsOpen(false); }}><Sun size={16} /><span>{language === 'bm' ? 'Cerah' : 'Light'}</span></button>
                        <button className={`mt-theme-btn ${colorMode === 'dark' ? 'active' : ''}`} onClick={() => { onColorModeChange('dark'); setIsSettingsOpen(false); }}><Moon size={16} /><span>{language === 'bm' ? 'Gelap' : 'Dark'}</span></button>
                      </div>
                    </>
                  )}
                  </div>
                )}
              </div>
            )}
            </div>
          </div>
          }
        </div>
        <section className="sidebar-subscription" aria-labelledby="sidebar-subscription-label">
          <h2 id="sidebar-subscription-label" className="sidebar-section-label sidebar-section-label-subscription">
            {language === 'bm' ? 'LANGGANAN' : 'SUBSCRIPTION'}
          </h2>
          <div className="sidebar-subscription-card">
            <Crown className="sidebar-subscription-watermark" size={52} aria-hidden="true" />
            <div className="sidebar-subscription-head">
              <span className="sidebar-subscription-icon" aria-hidden="true"><Crown size={18} /></span>
              <span>{language === 'bm' ? 'Pelan Percuma' : 'Free Plan'}</span>
            </div>
            <p>{language === 'bm' ? 'Buka akses semua subjek dan ganjaran premium.' : 'Unlock every subject and premium rewards.'}</p>
            <button type="button" className="sidebar-upgrade-btn" onClick={() => onUpgradePlan?.()}>
              <span>{language === 'bm' ? 'Naik Taraf Pelan' : 'Upgrade Plan'}</span>
              <ChevronRight size={15} aria-hidden="true" />
            </button>
          </div>
        </section>
      </aside>
    </>
  );
}
