import React, { useState } from 'react';
import {
  BookOpen,
  Calculator,
  ChevronDown,
  ChevronRight,
  Crown,
  Feather,
  Flag,
  House,
  Medal,
  Menu,
  Mic,
  Play,
  Sparkles,
  Trophy,
  WandSparkles,
} from 'lucide-react';
import useGamification from '../hooks/useGamification';
import './DesktopSidebar.css';
import { canAccessSubject } from '../utils/subjectAccess';

function countCompletedTopics(topics = {}) {
  return Object.values(topics).filter((topic) => (topic?.crownLevel || 0) >= 1).length;
}

export default function DesktopSidebar({
  activeTab,
  onTabChange,
  language,
  onHome,
  onContinueLearning,
  currentSubject,
  onSelectSubject,
  isJawi = false,
  onSelectAchievementSection,
  achievementSection = 'assessments',
  playerName,
  onUpgradePlan,
}) {
  const bm = language === 'bm';
  const [openSection, setOpenSection] = useState('subjects');
  const [collapsed, setCollapsed] = useState(false);

  const { completedTopics: readingTopics } = useGamification('reading');
  const { completedTopics: bmTopics } = useGamification('bm');
  const { completedTopics: mathTopics } = useGamification('mt');
  const { completedTopics: piTopics } = useGamification('pi');

  const subjectProgress = {
    reading: countCompletedTopics(readingTopics),
    bm: countCompletedTopics(bmTopics),
    math: countCompletedTopics(mathTopics),
    jawi: countCompletedTopics(piTopics),
  };

  const subjects = [
    { id: 'reading', label: bm ? 'Membaca' : 'Reading', icon: BookOpen, tone: 'reading', badge: subjectProgress.reading || null },
    { id: 'bm', label: bm ? 'Sebutan' : 'Speaking', icon: Mic, tone: 'speaking', badge: 'New' },
    { id: 'math', label: bm ? 'Matematik' : 'Mathematics', icon: Calculator, tone: 'math', badge: subjectProgress.math || null },
    { id: 'jawi', label: 'Jawi', icon: Feather, tone: 'jawi', badge: 'Pop' },
  ];

  const rewards = [
    {
      id: 'challenges',
      label: bm ? 'Cabaran' : 'Challenges',
      icon: Flag,
      tone: 'challenges',
      active: activeTab === 'achievement' && achievementSection === 'assessments',
      onClick: () => onSelectAchievementSection?.('assessments'),
      dot: true,
    },
    {
      id: 'leaderboard',
      label: bm ? 'Papan Juara' : 'Leaderboard',
      icon: Trophy,
      tone: 'leaderboard',
      active: activeTab === 'leaderboard',
      onClick: () => onTabChange?.('leaderboard'),
    },
    {
      id: 'achievements',
      label: bm ? 'Pencapaian Saya' : 'My Achievements',
      icon: Medal,
      tone: 'achievements',
      active: activeTab === 'achievement' && achievementSection === 'achievements',
      onClick: () => onSelectAchievementSection?.('achievements'),
    },
  ];

  const homeIsActive = activeTab === 'learn' && !currentSubject;

  const toggleSection = (section) => {
    setOpenSection((current) => (current === section ? null : section));
  };

  const handleContinue = onContinueLearning || onHome;

  return (
    <aside
      className={`desktop-sidebar${collapsed ? ' is-collapsed' : ''}`}
      aria-label={bm ? 'Navigasi utama' : 'Main navigation'}
    >
      <div className="ds-brand-row">
        <button
          type="button"
          className="ds-brand"
          onClick={() => onHome?.()}
          title={bm ? 'ImanAI — Halaman utama' : 'ImanAI — Home'}
          aria-label={bm ? 'ImanAI — Halaman utama' : 'ImanAI — Home'}
        >
          <span className="ds-brand-mark" aria-hidden="true">
            <img
              src={`${import.meta.env.BASE_URL}brand/imanai-horizontal-removebg-preview.webp`}
              alt=""
              width="40"
              height="40"
              decoding="async"
            />
          </span>
          <span className="ds-brand-copy">
            <span className="ds-brand-name">ImanAI</span>
            <span className="ds-brand-tag">Kids Academy</span>
          </span>
        </button>
        <button
          type="button"
          className="ds-collapse-toggle"
          onClick={() => setCollapsed((current) => !current)}
          aria-label={collapsed
            ? (bm ? 'Kembangkan menu' : 'Expand sidebar')
            : (bm ? 'Runtuhkan menu' : 'Collapse sidebar')}
          aria-expanded={!collapsed}
          title={collapsed
            ? (bm ? 'Kembangkan menu' : 'Expand sidebar')
            : (bm ? 'Runtuhkan menu' : 'Collapse sidebar')}
        >
          <Menu size={21} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>

      <div className="ds-scroll">
        <button
          type="button"
          className="ds-continue"
          onClick={handleContinue}
          aria-label={bm ? 'Teruskan Belajar' : 'Continue Learning'}
          title={bm ? 'Teruskan Belajar' : 'Continue Learning'}
        >
          <span className="ds-continue-play" aria-hidden="true">
            <Play size={14} fill="currentColor" strokeWidth={0} />
          </span>
          <span className="ds-continue-copy">
            <span className="ds-continue-title">{bm ? 'Teruskan Belajar' : 'Continue Learning'}</span>
          </span>
          <ChevronRight className="ds-continue-arrow" size={12} aria-hidden="true" />
        </button>

        <nav className="ds-nav" aria-label={bm ? 'Menu utama' : 'Main menu'}>
          <button
            type="button"
            className={`ds-link${homeIsActive ? ' is-active' : ''}`}
            aria-current={homeIsActive ? 'page' : undefined}
            aria-label={bm ? 'Laman Utama' : 'Home'}
            title={bm ? 'Laman Utama' : 'Home'}
            onClick={() => onHome?.()}
          >
            <span className="ds-link-icon" aria-hidden="true">
              <House size={19} strokeWidth={2.2} />
            </span>
            <span>{bm ? 'Laman Utama' : 'Home'}</span>
          </button>
        </nav>

        <section className="ds-section">
          <button
            type="button"
            className="ds-section-toggle"
            onClick={() => toggleSection('subjects')}
            aria-expanded={collapsed || openSection === 'subjects'}
            aria-controls="ds-subjects"
          >
            <span>{bm ? 'SUBJEK' : 'SUBJECTS'}</span>
            <ChevronDown
              className={`ds-section-arrow${openSection === 'subjects' ? ' open' : ''}`}
              size={10}
              aria-hidden="true"
            />
          </button>

          <div id="ds-subjects" className={`ds-dropdown${openSection === 'subjects' ? ' open' : ''}`}>
            {subjects.map(({ id, label, icon: Icon, tone, badge }) => {
              const isActive = activeTab === 'learn' && (id === 'jawi' ? isJawi : currentSubject === id);
              return (
                <button
                  key={id}
                  type="button"
                  disabled={!canAccessSubject(playerName, id)}
                  aria-label={label}
                  title={label}
                  aria-current={isActive ? 'page' : undefined}
                  className={`ds-item ds-item--${tone}${isActive ? ' is-active' : ''}`}
                  onClick={() => onSelectSubject?.(id)}
                >
                  <span className="ds-item-main">
                    <span className="ds-item-icon" aria-hidden="true">
                      {React.createElement(Icon, { size: 18, strokeWidth: 2.2 })}
                    </span>
                    <span className="ds-item-label">{label}</span>
                  </span>
                  {badge ? <span className="ds-item-badge">{badge}</span> : null}
                </button>
              );
            })}
          </div>
        </section>

        <section className="ds-section">
          <button
            type="button"
            className="ds-section-toggle"
            onClick={() => toggleSection('rewards')}
            aria-expanded={collapsed || openSection === 'rewards'}
            aria-controls="ds-rewards"
          >
            <span>{bm ? 'GANJARAN' : 'REWARDS'}</span>
            <ChevronDown
              className={`ds-section-arrow${openSection === 'rewards' ? ' open' : ''}`}
              size={10}
              aria-hidden="true"
            />
          </button>

          <div id="ds-rewards" className={`ds-dropdown${openSection === 'rewards' ? ' open' : ''}`}>
            {rewards.map(({ id, label, icon: Icon, tone, active, onClick, dot }) => (
              <button
                key={id}
                type="button"
                aria-current={active ? 'page' : undefined}
                aria-label={label}
                title={label}
                className={`ds-item ds-item--${tone}${active ? ' is-active' : ''}`}
                onClick={onClick}
              >
                <span className="ds-item-main">
                  <span className="ds-item-icon" aria-hidden="true">
                    {React.createElement(Icon, { size: 18, strokeWidth: 2.2 })}
                  </span>
                  <span className="ds-item-label">{label}</span>
                </span>
                {dot ? <span className="ds-item-dot" aria-hidden="true" /> : null}
              </button>
            ))}
          </div>
        </section>
      </div>

      <footer className="ds-footer">
        <span className="ds-footer-label">{bm ? 'LANGGANAN' : 'SUBSCRIPTION'}</span>
        <div className="ds-plan">
          <div className="ds-plan-head">
            <span className="ds-plan-pill">
              <Crown size={12} aria-hidden="true" />
              PRO PLAN
            </span>
            <span className="ds-plan-spark" aria-hidden="true">
              <Sparkles size={14} />
            </span>
          </div>
          <div className="ds-plan-body">
            <h4>{bm ? 'Buka Semua Dunia Seronok!' : 'Unlock All Fun Worlds!'}</h4>
            <p>
              {bm
                ? 'Akses tanpa had kepada 500+ pelajaran interaktif.'
                : 'Unlimited access to 500+ interactive lessons.'}
            </p>
          </div>
          <button
            type="button"
            className="ds-upgrade"
            onClick={() => onUpgradePlan?.()}
            aria-label={bm ? 'Naik Taraf Sekarang' : 'Upgrade Now'}
            title={bm ? 'Naik Taraf Sekarang' : 'Upgrade Now'}
          >
            <WandSparkles size={13} aria-hidden="true" />
            <span>{bm ? 'Naik Taraf Sekarang' : 'Upgrade Now'}</span>
            <span className="ds-upgrade-short" aria-hidden="true">Pro</span>
          </button>
        </div>
      </footer>
    </aside>
  );
}
