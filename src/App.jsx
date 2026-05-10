import React, { useState, useEffect, createContext, useContext } from 'react';
import HomePage from './components/HomePage';
import BMPage from './components/SpeakingPage/BMPage';
import JawiPage from './components/JawiScriptPage/JawiPage';
import MathHome from './components/MathematicsPage/MathHome';
import GameMenu from './components/MathematicsPage/GameMenu';
import OpsLandingPage from './components/MathematicsPage/OpsLandingPage';
import TimeGameMenu from './components/MathematicsPage/TimeGameMenu';
import MonthsGame from './components/MathematicsPage/MonthsGame';
import ClockGame from './components/MathematicsPage/ClockGame';
import MonthLearning from './components/MathematicsPage/MonthLearning';
import MathOperationsGame from './components/MathematicsPage/MathOperationsGame';
import ColumnMathGame from './components/MathematicsPage/ColumnMathGame';
import LevelUpToast from './components/LevelUpToast';
import WelcomeModal from './components/WelcomeModal';
import DesktopSidebar from './components/DesktopSidebar';
import { LearnIcon, LeaderboardIcon, ProfileIcon, LanguageIcon } from './components/icons/SidebarIcons';
import MascotIcon from './components/icons/MascotIcon';
import ReadingPage from './components/ReadingPage/ReadingPage';
import HeartShopModal from './components/HeartShopModal';
import AchievementPage from './components/AchievementPage';
import { getMuted, setMuted, preloadSounds, unlockAudio, playHoverSound } from './utils/soundManager';
import { useGameState } from './hooks/useGameState';
import { loadPlayerName, savePlayerName, recordLogin, calcStreak } from './services/storageService';
import { getGameData } from './utils/gameStatsManager';

// ── Context ──────────────────────────────────────────────────────────────────
export const GameStateContext = createContext(null);
export const useGameStateContext = () => useContext(GameStateContext);

// ── Desktop detection hook ───────────────────────────────────────────────────
function useIsDesktop(breakpoint = 768) {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= breakpoint : false
  );
  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${breakpoint}px)`);
    const handler = (e) => setIsDesktop(e.matches);
    mql.addEventListener('change', handler);
    setIsDesktop(mql.matches);
    return () => mql.removeEventListener('change', handler);
  }, [breakpoint]);
  return isDesktop;
}

// ── Game ID mapping ───────────────────────────────────────────────────────────
function getActiveGameId(currentSubject, mathSubGame) {
  if (currentSubject === 'jawi') return 'jawi';
  if (currentSubject === 'bm')   return 'bm';
  if (currentSubject === 'math') {
    if (mathSubGame === 'operations') return 'math-operations';
    if (mathSubGame === 'datetime')   return 'math-datetime';
    if (mathSubGame === 'faq')        return 'math-faq';
    return 'math';
  }
  return 'home';
}

// Tab definitions (mobile bottom bar)
const TABS = [
  { id: 'learn',       icon: LearnIcon, label: { bm: 'Kursus',   eng: 'Course'   } },
  { id: 'leaderboard', icon: LeaderboardIcon, label: { bm: 'Ranking',  eng: 'Ranking'  } },
  { id: 'profile',     icon: ProfileIcon, label: { bm: 'Profil',   eng: 'Profile'  } },
];

export default function App() {
  const isDesktop = useIsDesktop();
  const [playerName,     setPlayerName]     = useState(() => loadPlayerName());
  const [currentSubject, setCurrentSubject] = useState(null);
  const [mathSubGame,    setMathSubGame]    = useState(null);
  const [dateTimeSubGame,setDateTimeSubGame]= useState(null);
  const [isPlaying,      setIsPlaying]      = useState(false);
  const [gameConfig,     setGameConfig]     = useState({ operation: 'add', difficulty: 'easy', nums: [], quizType: 'multiple' });
  const [isMuted,        setIsMuted]        = useState(getMuted());
  const [language,       setLanguage]       = useState('bm');
  const [activeTab,      setActiveTab]      = useState('learn');
  const [streak,         setStreak]         = useState(0);
  const [isPlayingJawiGame, setIsPlayingJawiGame] = useState(false);

  const activeGameId = getActiveGameId(currentSubject, mathSubGame);
  const { gameState, levelUpInfo, clearLevelUp } = useGameState(activeGameId);

  const handleSaveName = (name) => { savePlayerName(name); setPlayerName(name); };

  useEffect(() => {
    preloadSounds();
    // Record today's login and compute streak
    const dates = recordLogin();
    setStreak(calcStreak(dates));
    const handleFirstClick = () => { unlockAudio(); document.removeEventListener('click', handleFirstClick); };
    document.addEventListener('click', handleFirstClick);
    return () => {
      document.removeEventListener('click', handleFirstClick);
    };
  }, []);

  const handleStartGame    = (op, diff, _nums = [], qType = 'multiple') => { setGameConfig({ operation: op, difficulty: diff, nums: _nums, quizType: qType }); setIsPlaying(true); };
  const handleBackToMenu   = () => setIsPlaying(false);
  const handleStartTimeGame= (gameId) => { setDateTimeSubGame(gameId); setIsPlaying(true); };
  const handleBackToHome   = () => { setIsPlaying(false); setMathSubGame(null); setDateTimeSubGame(null); setCurrentSubject(null); setActiveTab('learn'); };
  const handleToggleMute   = () => { const m = !isMuted; setIsMuted(m); setMuted(m); };
  const handleToggleLang   = () => setLanguage(l => l === 'bm' ? 'eng' : 'bm');

  const inActiveQuiz = isPlaying;
  const viewKey = `${activeTab}-${currentSubject}-${mathSubGame}-${dateTimeSubGame}-${isPlaying}`;

  // Hide sidebar during game play
  const shouldHideSidebar = isPlaying || (currentSubject === 'math' && mathSubGame === 'faq') || isPlayingJawiGame;

  // ── Content renderer ──────────────────────────────────────────────────────
  const renderContent = () => {
    if (activeTab === 'leaderboard') return <LeaderboardPlaceholder language={language} />;
    if (activeTab === 'profile')     return <ProfilePlaceholder playerName={playerName} gameState={gameState} language={language} streak={streak} />;
    if (activeTab === 'achievement') return <AchievementPage onBack={handleBackToHome} onHome={handleBackToHome} language={language} gameState={gameState} />;

    switch (currentSubject) {
      case 'math':
        if (!mathSubGame) return <MathHome onSelectSubGame={setMathSubGame} onBack={handleBackToHome} onHome={handleBackToHome} language={language} />;
        if (mathSubGame === 'operations') {
          return !isPlaying
            ? <OpsLandingPage onStart={handleStartGame} onBack={() => setMathSubGame(null)} onHome={handleBackToHome} language={language} />
            : <MathOperationsGame operation={gameConfig.operation} difficulty={gameConfig.difficulty} nums={gameConfig.nums} quizType={gameConfig.quizType} onBack={handleBackToMenu} onHome={handleBackToHome} language={language} />;
        }
        if (mathSubGame === 'datetime') {
          if (!isPlaying) return <TimeGameMenu onBack={() => setMathSubGame(null)} onStart={handleStartTimeGame} onHome={handleBackToHome} language={language} />;
          if (dateTimeSubGame === 'months')          return <MonthsGame    onBack={handleBackToMenu} onHome={handleBackToHome} language={language} />;
          if (dateTimeSubGame === 'clock')           return <ClockGame     onBack={handleBackToMenu} onHome={handleBackToHome} language={language} />;
          if (dateTimeSubGame === 'month-learning')  return <MonthLearning onBack={handleBackToMenu} onHome={handleBackToHome} language={language} />;
        }
        if (mathSubGame === 'faq') {
          return <ColumnMathGame onBack={() => setMathSubGame(null)} language={language} />;
        }
        return <MathHome onSelectSubGame={setMathSubGame} onBack={handleBackToHome} onHome={handleBackToHome} language={language} />;
      case 'bm':
        return <BMPage onBack={handleBackToHome} onHome={handleBackToHome} language={language} />;
      case 'jawi':
        return <JawiPage onBack={handleBackToHome} onHome={handleBackToHome} language={language} onGameStart={() => setIsPlayingJawiGame(true)} onGameEnd={() => setIsPlayingJawiGame(false)} />;
      case 'reading':
        return <ReadingPage onBack={handleBackToHome} language={language} />;
      default:
        return <HomePage onSelectSubject={setCurrentSubject} language={language} playerName={playerName} gameState={gameState} streak={streak} />;
    }
  };

  return (
    <GameStateContext.Provider value={gameState}>
      {/* Desktop Sidebar — rendered outside .app-container, inside #root row */}
      {isDesktop && !shouldHideSidebar && (
        <DesktopSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          language={language}
          onToggleLanguage={handleToggleLang}
          playerName={playerName}
          gameState={gameState}
          onHome={handleBackToHome}
        />
      )}

      <div className="app-container">
        {!playerName && <WelcomeModal onSave={handleSaveName} />}
        <LevelUpToast level={levelUpInfo?.newLevel} onDismiss={clearLevelUp} />


        {/* Page Content */}
        <div className="app-content">
          <div key={viewKey} className="view-container swipe-enter">
            {renderContent()}
          </div>
        </div>

        {/* Mobile Bottom Tab Bar — hidden on desktop via CSS */}
        {!inActiveQuiz && !isPlayingJawiGame && (
          <div className="duo-tab-bar">
            {TABS.map(tab => (
              <button
                key={tab.id}
                className={`duo-tab-item${activeTab === tab.id ? ' active' : ''}`}
                onClick={() => {
                  if (tab.id === 'learn') {
                    handleBackToHome();
                  } else {
                    setActiveTab(tab.id);
                  }
                }}
              >
                <span className="duo-tab-icon">{React.createElement(tab.icon)}</span>
                <span className="duo-tab-label">{tab.label[language] || tab.label.bm}</span>
              </button>
            ))}
            <button
              className="duo-tab-item"
              onClick={handleToggleLang}
            >
              <span className="duo-tab-icon"><LanguageIcon /></span>
              <span className="duo-tab-label">{language === 'bm' ? 'English' : 'BM'}</span>
            </button>
          </div>
        )}
      </div>
    </GameStateContext.Provider>
  );
}

// ── Placeholder screens for tabs ─────────────────────────────────────────────
function LeaderboardPlaceholder({ language }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', background: '#fff', padding: '2rem' }}>
      <div style={{ fontSize: '4rem' }}>🏆</div>
      <h2 style={{ fontWeight: 900, fontSize: '1.4rem', color: '#3C3C3C' }}>{language === 'bm' ? 'Papan Juara' : 'Leaderboard'}</h2>
      <p style={{ color: '#AFAFAF', fontWeight: 600, textAlign: 'center' }}>{language === 'bm' ? 'Segera hadir!' : 'Coming soon!'}</p>
    </div>
  );
}

function ProfilePlaceholder({ playerName, gameState, language, streak = 0 }) {
  // Load game data from localStorage
  const gameData = getGameData();
  const totalXP = gameData.stars; // Each star = 1 XP
  const gems = gameData.gems;
  const hearts = gameData.hearts;
  const [isHeartShopOpen, setIsHeartShopOpen] = useState(false);

  const openHeartShop = () => setIsHeartShopOpen(true);
  const closeHeartShop = () => setIsHeartShopOpen(false);

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#f7f7f7' }}>
      <div style={{ background: '#fff', padding: '2rem 1.5rem', textAlign: 'center', borderBottom: '2px solid #E5E5E5' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
          <div style={{ width: '80px', height: '80px' }}>
            <MascotIcon size={80} />
          </div>
        </div>
        <h2 style={{ fontWeight: 900, fontSize: '1.4rem', color: '#3C3C3C', marginBottom: '4px' }}>{playerName || 'Player'}</h2>
        <p style={{ color: '#AFAFAF', fontWeight: 600, fontSize: '0.85rem' }}>Level {gameState?.level ?? 1} Explorer</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', padding: '1.25rem 1rem', maxWidth: '700px', margin: '0 auto' }}>
        {[
          { label: language === 'bm' ? 'Hari Aktif' : 'Streak', value: streak, color: '#FF9600', emoji: '🔥' },
          { label: 'Level',   value: gameState?.level ?? 1,   color: '#CE82FF', emoji: '🏆' },
          { label: language === 'bm' ? 'Nyawa' : 'Hearts', value: hearts, color: '#FF4B4B', emoji: '❤️' },
          { label: 'Stars', value: totalXP, color: '#FFC800', emoji: '⭐' },
          { label: language === 'bm' ? 'Permata' : 'Gems', value: gems, color: '#CE82FF', emoji: '💎'},
        ].map(stat => {
          const isClickable = stat.emoji === '❤️' || stat.emoji === '⭐' || stat.emoji === '💎';
          return (
            <button
              key={stat.label}
              className="profile-stat-card"
              onMouseEnter={playHoverSound}
              onClick={isClickable ? openHeartShop : undefined}
              style={{
                background: '#fff',
                border: '2px solid #E5E5E5',
                borderRadius: '16px',
                padding: '1rem',
                textAlign: 'center',
                cursor: isClickable ? 'pointer' : 'default'
              }}
            >
              <div style={{ fontSize: '1.8rem', marginBottom: '4px' }}>{stat.emoji}</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#AFAFAF', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</div>
            </button>
          );
        })}
      </div>
      <style>{`
        .profile-stat-card {
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .profile-stat-card:hover {
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
          border-color: #999 !important;
        }

        .profile-stat-card:active {
          transform: translateY(-4px) scale(1.02);
        }
      `}</style>
      <HeartShopModal isOpen={isHeartShopOpen} onClose={closeHeartShop} language={language} />
    </div>
  );
}
