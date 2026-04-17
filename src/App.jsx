import React, { useState, useEffect, createContext, useContext } from 'react';
import HomePage from './components/HomePage';
import BMPage from './components/BMPage';
import JawiPage from './components/JawiPage';
import MathHome from './components/MathHome';
import GameMenu from './components/GameMenu';
import TimeGameMenu from './components/TimeGameMenu';
import MonthsGame from './components/MonthsGame';
import ClockGame from './components/ClockGame';
import MonthLearning from './components/MonthLearning';
import MathOperationsGame from './components/MathOperationsGame';
import LevelUpToast from './components/LevelUpToast';
import WelcomeModal from './components/WelcomeModal';
import DesktopSidebar from './components/DesktopSidebar';
import { getMuted, setMuted, preloadSounds, unlockAudio } from './utils/soundManager';
import { Map, ChevronDown, Check } from 'lucide-react';
import { useGameState } from './hooks/useGameState';
import { loadPlayerName, savePlayerName } from './services/storageService';

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
    return 'math';
  }
  return 'home';
}

// Tab definitions (mobile bottom bar)
const TABS = [
  { id: 'learn',       icon: '📚', label: { bm: 'Belajar',  eng: 'Learn'    } },
  { id: 'leaderboard', icon: '🏆', label: { bm: 'Ranking',  eng: 'Ranking'  } },
  { id: 'profile',     icon: '👤', label: { bm: 'Profil',   eng: 'Profile'  } },
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
  const [showQuickSwitch,setShowQuickSwitch]= useState(false);

  const activeGameId = getActiveGameId(currentSubject, mathSubGame);
  const { gameState, levelUpInfo, clearLevelUp } = useGameState(activeGameId);

  const handleSaveName = (name) => { savePlayerName(name); setPlayerName(name); };

  useEffect(() => {
    preloadSounds();
    const handleFirstClick = () => { unlockAudio(); document.removeEventListener('click', handleFirstClick); };
    document.addEventListener('click', handleFirstClick);
    const handleToggleLang = () => setLanguage(l => l === 'bm' ? 'eng' : 'bm');
    window.addEventListener('toggle-language', handleToggleLang);
    return () => {
      document.removeEventListener('click', handleFirstClick);
      window.removeEventListener('toggle-language', handleToggleLang);
    };
  }, []);

  const handleStartGame    = (op, diff, _nums = [], qType = 'multiple') => { setGameConfig({ operation: op, difficulty: diff, nums: _nums, quizType: qType }); setIsPlaying(true); };
  const handleBackToMenu   = () => setIsPlaying(false);
  const handleStartTimeGame= (gameId) => { setDateTimeSubGame(gameId); setIsPlaying(true); };
  const handleBackToHome   = () => { setIsPlaying(false); setMathSubGame(null); setDateTimeSubGame(null); setCurrentSubject(null); setActiveTab('learn'); };
  const handleToggleMute   = () => { const m = !isMuted; setIsMuted(m); setMuted(m); };
  const handleQuickSwitch  = (subject) => { setShowQuickSwitch(false); setIsPlaying(false); setMathSubGame(null); setDateTimeSubGame(null); setCurrentSubject(subject); };
  const handleToggleLang   = () => setLanguage(l => l === 'bm' ? 'eng' : 'bm');

  const inActiveQuiz = isPlaying;
  const viewKey = `${activeTab}-${currentSubject}-${mathSubGame}-${dateTimeSubGame}-${isPlaying}`;

  // ── Content renderer ──────────────────────────────────────────────────────
  const renderContent = () => {
    if (activeTab === 'leaderboard') return <LeaderboardPlaceholder language={language} />;
    if (activeTab === 'profile')     return <ProfilePlaceholder playerName={playerName} gameState={gameState} language={language} />;

    switch (currentSubject) {
      case 'math':
        if (!mathSubGame) return <MathHome onSelectSubGame={setMathSubGame} onBack={handleBackToHome} onHome={handleBackToHome} language={language} />;
        if (mathSubGame === 'operations') {
          return !isPlaying
            ? <GameMenu onStart={handleStartGame} onBack={() => setMathSubGame(null)} onHome={handleBackToHome} language={language} />
            : <MathOperationsGame operation={gameConfig.operation} difficulty={gameConfig.difficulty} nums={gameConfig.nums} quizType={gameConfig.quizType} onBack={handleBackToMenu} onHome={handleBackToHome} language={language} />;
        }
        if (mathSubGame === 'datetime') {
          if (!isPlaying) return <TimeGameMenu onBack={() => setMathSubGame(null)} onStart={handleStartTimeGame} onHome={handleBackToHome} language={language} />;
          if (dateTimeSubGame === 'months')          return <MonthsGame    onBack={handleBackToMenu} onHome={handleBackToHome} language={language} />;
          if (dateTimeSubGame === 'clock')           return <ClockGame     onBack={handleBackToMenu} onHome={handleBackToHome} language={language} />;
          if (dateTimeSubGame === 'month-learning')  return <MonthLearning onBack={handleBackToMenu} onHome={handleBackToHome} language={language} />;
        }
        return <MathHome onSelectSubGame={setMathSubGame} onBack={handleBackToHome} onHome={handleBackToHome} language={language} />;
      case 'bm':
        return <BMPage onBack={handleBackToHome} onHome={handleBackToHome} language={language} />;
      case 'jawi':
        return <JawiPage onBack={handleBackToHome} onHome={handleBackToHome} language={language} />;
      default:
        return <HomePage onSelectSubject={setCurrentSubject} language={language} playerName={playerName} gameState={gameState} />;
    }
  };

  return (
    <GameStateContext.Provider value={gameState}>
      {/* Desktop Sidebar — rendered outside .app-container, inside #root row */}
      {isDesktop && (
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

        {/* Quick Switch overlay */}
        {showQuickSwitch && (
          <div
            onClick={() => setShowQuickSwitch(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 90, background: 'rgba(0,0,0,0.3)' }}
          />
        )}

        {/* Mobile-only top nav header — hidden on desktop (sidebar replaces it) */}
        {!isDesktop && activeTab === 'learn' && !inActiveQuiz && (
          <div style={{
            background: '#fff', borderBottom: '2px solid #E5E5E5',
            padding: '0 1rem', height: '56px',
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            flexShrink: 0, zIndex: 50, position: 'relative',
          }}>
            <div style={{ flex: '0 0 auto' }}>
              {currentSubject ? (
                <button onClick={handleBackToHome} style={{ background: 'transparent', color: '#AFAFAF', fontSize: '1.3rem', display: 'flex', alignItems: 'center', padding: '4px' }}>
                  ←
                </button>
              ) : (
                <div style={{ width: 32 }} />
              )}
            </div>

            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', position: 'relative' }}>
              {currentSubject ? (
                <>
                  <button
                    onClick={() => setShowQuickSwitch(v => !v)}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f7f7f7', border: '2px solid #E5E5E5', borderRadius: '999px', padding: '6px 14px', fontWeight: 800, fontSize: '0.9rem', color: '#3C3C3C' }}
                  >
                    <Map size={16} color="#1CB0F6" />
                    {currentSubject === 'math' ? '🔢 Matematik' : currentSubject === 'bm' ? '🗣️ Bahasa Melayu' : '📖 Jawi'}
                    <ChevronDown size={16} />
                  </button>

                  {showQuickSwitch && (
                    <div className="fade-in" style={{
                      position: 'absolute', top: '110%', left: '50%', transform: 'translateX(-50%)',
                      background: '#fff', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                      width: '210px', overflow: 'hidden', border: '2px solid #E5E5E5', zIndex: 100,
                    }}>
                      {[
                        { id: 'math',  emoji: '🔢', label: 'Matematik' },
                        { id: 'bm',    emoji: '🗣️', label: 'Bahasa Melayu' },
                        { id: 'jawi',  emoji: '📖', label: 'Jawi' },
                      ].map(s => (
                        <button key={s.id} onClick={() => handleQuickSwitch(s.id)}
                          style={{ padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', background: currentSubject === s.id ? '#F0FFF0' : '#fff', borderBottom: '1px solid #f0f0f0', fontWeight: 700, color: '#3C3C3C', fontSize: '0.92rem' }}>
                          <span style={{ fontSize: '1.2rem' }}>{s.emoji}</span>
                          <span style={{ flex: 1, textAlign: 'left' }}>{s.label}</span>
                          {currentSubject === s.id && <Check size={16} color="#58CC02" />}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={handleBackToHome}
                  style={{ background: 'transparent', border: 'none', fontWeight: 900, fontSize: '1rem', color: '#3C3C3C', cursor: 'pointer', padding: 0 }}
                >
                  Iman's Adventure 🦉
                </button>
              )}
            </div>

            <div style={{ flex: '0 0 auto' }}>
              <button onClick={handleToggleLang} className="lang-btn">
                {language === 'bm' ? 'EN' : 'BM'}
              </button>
            </div>
          </div>
        )}

        {/* Desktop top bar — simplified breadcrumb when inside a subject */}
        {isDesktop && activeTab === 'learn' && currentSubject && !inActiveQuiz && (
          <div style={{
            background: '#fff', borderBottom: '2px solid #E5E5E5',
            padding: '0 var(--sp-3)', height: '48px',
            display: 'flex', alignItems: 'center', gap: 'var(--sp-2)',
            flexShrink: 0,
          }}>
            <button onClick={handleBackToHome} style={{ background: 'transparent', color: '#AFAFAF', fontSize: '1.1rem', display: 'flex', alignItems: 'center' }}>
              ←
            </button>
            <button
              onClick={() => setShowQuickSwitch(v => !v)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f7f7f7', border: '2px solid #E5E5E5', borderRadius: '999px', padding: '6px 14px', fontWeight: 800, fontSize: '0.85rem', color: '#3C3C3C' }}
            >
              <Map size={14} color="#1CB0F6" />
              {currentSubject === 'math' ? '🔢 Matematik' : currentSubject === 'bm' ? '🗣️ Bahasa Melayu' : '📖 Jawi'}
              <ChevronDown size={14} />
            </button>
            {showQuickSwitch && (
              <div className="fade-in" style={{
                position: 'absolute', top: '48px', left: 'var(--sp-3)',
                background: '#fff', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                width: '210px', overflow: 'hidden', border: '2px solid #E5E5E5', zIndex: 100,
              }}>
                {[
                  { id: 'math',  emoji: '🔢', label: 'Matematik' },
                  { id: 'bm',    emoji: '🗣️', label: 'Bahasa Melayu' },
                  { id: 'jawi',  emoji: '📖', label: 'Jawi' },
                ].map(s => (
                  <button key={s.id} onClick={() => handleQuickSwitch(s.id)}
                    style={{ padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', background: currentSubject === s.id ? '#F0FFF0' : '#fff', borderBottom: '1px solid #f0f0f0', fontWeight: 700, color: '#3C3C3C', fontSize: '0.92rem' }}>
                    <span style={{ fontSize: '1.2rem' }}>{s.emoji}</span>
                    <span style={{ flex: 1, textAlign: 'left' }}>{s.label}</span>
                    {currentSubject === s.id && <Check size={16} color="#58CC02" />}
                  </button>
                ))}
              </div>
            )}
            <div style={{ flex: 1 }} />
            <button onClick={handleToggleLang} className="lang-btn">
              {language === 'bm' ? 'EN' : 'BM'}
            </button>
          </div>
        )}

        {/* Page Content */}
        <div className="app-content">
          <div key={viewKey} className="view-container swipe-enter">
            {renderContent()}
          </div>
        </div>

        {/* Mobile Bottom Tab Bar — hidden on desktop via CSS */}
        {!inActiveQuiz && (
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
                <span className="duo-tab-icon">{tab.icon}</span>
                <span>{tab.label[language] || tab.label.bm}</span>
              </button>
            ))}
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

function ProfilePlaceholder({ playerName, gameState, language }) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#f7f7f7' }}>
      <div style={{ background: '#fff', padding: '2rem 1.5rem', textAlign: 'center', borderBottom: '2px solid #E5E5E5' }}>
        <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>🦉</div>
        <h2 style={{ fontWeight: 900, fontSize: '1.4rem', color: '#3C3C3C', marginBottom: '4px' }}>{playerName || 'Player'}</h2>
        <p style={{ color: '#AFAFAF', fontWeight: 600, fontSize: '0.85rem' }}>Level {gameState?.level ?? 1} Explorer</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', padding: '1.25rem 1rem', maxWidth: '700px', margin: '0 auto' }}>
        {[
          { label: 'Total XP', value: gameState?.totalXP ?? 0, color: '#FFC800', emoji: '⭐' },
          { label: language === 'bm' ? 'Syiling' : 'Coins',  value: gameState?.mathCoins ?? 0, color: '#1CB0F6', emoji: '🪙' },
          { label: 'Level',   value: gameState?.level ?? 1,   color: '#CE82FF', emoji: '🏆' },
          { label: language === 'bm' ? 'Hari Aktif' : 'Streak', value: '0 🔥', color: '#FF9600', emoji: '🔥' },
        ].map(stat => (
          <div key={stat.label} style={{ background: '#fff', border: '2px solid #E5E5E5', borderRadius: '16px', padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '4px' }}>{stat.emoji}</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#AFAFAF', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
