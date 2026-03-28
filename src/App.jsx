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
import QuizArena from './components/QuizArena';
import LevelUpToast from './components/LevelUpToast';
import WelcomeModal from './components/WelcomeModal';
import { getMuted, setMuted, preloadSounds, unlockAudio } from './utils/soundManager';
import { LOCALIZATION } from './utils/localization';
import { Home } from 'lucide-react';
import { useGameState } from './hooks/useGameState';
import { loadPlayerName, savePlayerName } from './services/storageService';

// ── Context ──────────────────────────────────────────────────────────────────
export const GameStateContext = createContext(null);
export const useGameStateContext = () => useContext(GameStateContext);

// ── Game ID mapping helpers ───────────────────────────────────────────────────
function getActiveGameId(currentSubject, mathSubGame) {
  if (currentSubject === 'jawi') return 'jawi';
  if (currentSubject === 'bm')   return 'bm';
  if (currentSubject === 'math') {
    if (mathSubGame === 'operations') return 'math-operations';
    if (mathSubGame === 'datetime')   return 'math-datetime';
    return 'math'; // hub – no active game
  }
  return 'home'; // no active game on home page
}

function App() {
  // ── Player name ─────────────────────────────────────────────────────────────
  const [playerName, setPlayerName] = useState(() => loadPlayerName());

  const handleSaveName = (name) => {
    savePlayerName(name);
    setPlayerName(name);
  };

  // ── Navigation ───────────────────────────────────────────────────────────────
  const [currentSubject,  setCurrentSubject]  = useState(null);
  const [mathSubGame,     setMathSubGame]     = useState(null);
  const [dateTimeSubGame, setDateTimeSubGame] = useState(null);
  const [isPlaying,       setIsPlaying]       = useState(false);
  const [gameConfig, setGameConfig] = useState({
    operation: 'add', difficulty: 'easy', selectedNumbers: [], quizType: 'multiple'
  });
  const [isMuted,   setIsMuted]   = useState(getMuted());
  const [language,  setLanguage]  = useState('bm');

  const t = LOCALIZATION[language];

  // ── Derive the active game ID from current navigation state ──────────────────
  const activeGameId = getActiveGameId(currentSubject, mathSubGame);

  // ── Gamification (per active game) ──────────────────────────────────────────
  const { gameState, levelUpInfo, clearLevelUp } = useGameState(activeGameId);

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

  const handleStartGame = (operation, difficulty, selectedNumbers = [], quizType = 'multiple') => {
    setGameConfig({ operation, difficulty, selectedNumbers, quizType });
    setIsPlaying(true);
  };
  const handleBackToMenu = () => setIsPlaying(false);
  const handleStartTimeGame = (gameId) => { setDateTimeSubGame(gameId); setIsPlaying(true); };
  const handleBackToHome = () => {
    setIsPlaying(false); setMathSubGame(null); setDateTimeSubGame(null); setCurrentSubject(null);
  };
  const handleToggleMute = () => { const m = !isMuted; setIsMuted(m); setMuted(m); };

  const renderSubjectContent = () => {
    switch (currentSubject) {
      case 'math':
        if (!mathSubGame) {
          return <MathHome onSelectSubGame={setMathSubGame} onBack={handleBackToHome} onHome={handleBackToHome} language={language} />;
        }
        if (mathSubGame === 'operations') {
          return !isPlaying ? (
            <GameMenu onStart={handleStartGame} isMuted={isMuted} onToggleMute={handleToggleMute}
              onBack={() => setMathSubGame(null)} onHome={handleBackToHome} language={language} />
          ) : (
            <QuizArena operation={gameConfig.operation} difficulty={gameConfig.difficulty}
              selectedNumbers={gameConfig.selectedNumbers} quizType={gameConfig.quizType}
              onBack={handleBackToMenu} onHome={handleBackToHome}
              isMuted={isMuted} onToggleMute={handleToggleMute} language={language} />
          );
        }
        if (mathSubGame === 'datetime') {
          if (!isPlaying) return <TimeGameMenu onBack={() => setMathSubGame(null)} onStart={handleStartTimeGame} onHome={handleBackToHome} language={language} />;
          if (dateTimeSubGame === 'months')         return <MonthsGame  onBack={handleBackToMenu} onHome={handleBackToHome} language={language} />;
          if (dateTimeSubGame === 'clock')          return <ClockGame   onBack={handleBackToMenu} onHome={handleBackToHome} language={language} />;
          if (dateTimeSubGame === 'month-learning') return <MonthLearning onBack={handleBackToMenu} onHome={handleBackToHome} language={language} />;
        }
        return <MathHome onSelectSubGame={setMathSubGame} onBack={handleBackToHome} onHome={handleBackToHome} language={language} />;
      case 'bm':
        return <BMPage onBack={handleBackToHome} onHome={handleBackToHome} language={language} />;
      case 'jawi':
        return <JawiPage onBack={handleBackToHome} onHome={handleBackToHome} language={language} />;
      default:
        return <HomePage onSelectSubject={setCurrentSubject} language={language} />;
    }
  };

  const getPageTitle = () => {
    if (!currentSubject) return '✨ ' + "Iman's Adventure";
    if (currentSubject === 'bm')   return t.bmPage.title;
    if (currentSubject === 'jawi') return t.jawi.title;
    if (currentSubject === 'math') {
      if (!mathSubGame) return t.math.hubTitle;
      if (mathSubGame === 'operations') return !isPlaying ? t.opsDetails.title : t.math.opsTitle;
      if (mathSubGame === 'datetime') {
        if (!dateTimeSubGame)                    return t.time.title;
        if (dateTimeSubGame === 'months')        return t.time.monthQuiz;
        if (dateTimeSubGame === 'clock')         return t.time.timeAdventure;
        if (dateTimeSubGame === 'month-learning') return t.time.monthLearning;
      }
    }
    return '';
  };

  // Whether to show per-game pill (only when inside a specific game)
  const showGameStats = ['math-operations', 'math-datetime', 'jawi', 'bm'].includes(activeGameId);

  return (
    <GameStateContext.Provider value={gameState}>
      <div className="app-container">
        {/* First-launch name modal */}
        {!playerName && <WelcomeModal onSave={handleSaveName} />}

        {/* Level-Up Toast */}
        <LevelUpToast level={levelUpInfo?.newLevel} onDismiss={clearLevelUp} />

        {/* Global Header */}
        <div className="game-header">
          {/* Left: Home */}
          <div className="header-section left">
            {currentSubject && (
              <button onClick={handleBackToHome} className="header-btn home-btn" title={t.global.home}>
                <Home size={18} />
                <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>{language === 'bm' ? 'Utama' : 'Home'}</span>
              </button>
            )}
          </div>

          {/* Middle removed per request */}

          {/* Right: Stats + Language */}
          <div className="header-section right">
            {/* Per-game XP pill — visible only inside a game */}
            {showGameStats && (
              <div className="xp-pill" title={`Total XP: ${gameState.totalXP}`}>
                <span className="xp-pill-lv">Lv.{gameState.level}</span>
                <span className="xp-pill-sep">·</span>
                <span>🪙{gameState.mathCoins}</span>
              </div>
            )}
            {/* Player name pill (always visible once set) */}
            {playerName && (
              <div className="player-name-pill" title="Player name">
                👤 {playerName}
              </div>
            )}
            <button
              onClick={() => setLanguage(l => l === 'bm' ? 'eng' : 'bm')}
              className="header-btn lang-btn"
              title="Toggle Language"
            >
              <span>BM / EN</span>
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="app-content">
          {renderSubjectContent()}
        </div>
      </div>
    </GameStateContext.Provider>
  );
}

export default App;
