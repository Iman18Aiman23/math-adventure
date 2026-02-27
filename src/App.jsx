import React, { useState, useEffect } from 'react';
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
import { getMuted, setMuted, preloadSounds, unlockAudio } from './utils/soundManager';
import { LOCALIZATION } from './utils/localization';
import { Languages, Home } from 'lucide-react';


function App() {
  useEffect(() => {
    preloadSounds();
    const handleFirstClick = () => {
      unlockAudio();
      document.removeEventListener('click', handleFirstClick);
    };
    document.addEventListener('click', handleFirstClick);

    const handleToggleLanguageEvent = () => {
      setLanguage(l => l === 'bm' ? 'eng' : 'bm');
    };
    window.addEventListener('toggle-language', handleToggleLanguageEvent);

    return () => {
      document.removeEventListener('click', handleFirstClick);
      window.removeEventListener('toggle-language', handleToggleLanguageEvent);
    };
  }, []);
  const [currentSubject, setCurrentSubject] = useState(null); // null, 'math', 'bm', 'jawi'
  const [mathSubGame, setMathSubGame] = useState(null); // null, 'operations', 'datetime'
  const [dateTimeSubGame, setDateTimeSubGame] = useState(null); // null, 'months', 'clock'
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameConfig, setGameConfig] = useState({
    operation: 'add',
    difficulty: 'easy',
    selectedNumbers: [],
    quizType: 'multiple'
  });
  const [isMuted, setIsMuted] = useState(getMuted());
  const [language, setLanguage] = useState('bm'); // 'bm' or 'eng'

  const t = LOCALIZATION[language];

  const handleStartGame = (operation, difficulty, selectedNumbers = [], quizType = 'multiple') => {
    setGameConfig({ operation, difficulty, selectedNumbers, quizType });
    setIsPlaying(true);
  };

  const handleBackToMenu = () => {
    setIsPlaying(false);
  };

  const handleStartTimeGame = (gameId) => {
    setDateTimeSubGame(gameId);
    setIsPlaying(true);
  };

  const handleBackToHome = () => {
    setIsPlaying(false);
    setMathSubGame(null);
    setDateTimeSubGame(null);
    setCurrentSubject(null);
  };

  const handleToggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    setMuted(newMuted);
  };

  const renderSubjectContent = () => {
    switch (currentSubject) {
      case 'math':
        if (!mathSubGame) {
          return <MathHome onSelectSubGame={setMathSubGame} onBack={handleBackToHome} onHome={handleBackToHome} language={language} />;
        }
        if (mathSubGame === 'operations') {
          return !isPlaying ? (
            <GameMenu
              onStart={handleStartGame}
              isMuted={isMuted}
              onToggleMute={handleToggleMute}
              onBack={() => setMathSubGame(null)}
              onHome={handleBackToHome}
              language={language}
            />
          ) : (
            <QuizArena
              operation={gameConfig.operation}
              difficulty={gameConfig.difficulty}
              selectedNumbers={gameConfig.selectedNumbers}
              quizType={gameConfig.quizType}
              onBack={handleBackToMenu}
              onHome={handleBackToHome}
              isMuted={isMuted}
              onToggleMute={handleToggleMute}
              language={language}
            />
          );
        }
        if (mathSubGame === 'datetime') {
          if (!isPlaying) {
            return <TimeGameMenu onBack={() => setMathSubGame(null)} onStart={handleStartTimeGame} onHome={handleBackToHome} language={language} />;
          }
          if (dateTimeSubGame === 'months') {
            return <MonthsGame onBack={handleBackToMenu} onHome={handleBackToHome} language={language} />;
          }
          if (dateTimeSubGame === 'clock') {
            return <ClockGame onBack={handleBackToMenu} onHome={handleBackToHome} language={language} />;
          }
          if (dateTimeSubGame === 'month-learning') {
            return <MonthLearning onBack={handleBackToMenu} onHome={handleBackToHome} language={language} />;
          }
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
    if (!currentSubject) return '';
    if (currentSubject === 'bm') return t.bmPage.title;
    if (currentSubject === 'jawi') return t.jawi.title;
    if (currentSubject === 'math') {
      if (!mathSubGame) return t.math.hubTitle;
      if (mathSubGame === 'operations') {
        return !isPlaying ? t.opsDetails.title : t.math.opsTitle;
      }
      if (mathSubGame === 'datetime') {
        if (!dateTimeSubGame) return t.time.title;
        if (dateTimeSubGame === 'months') return t.time.monthQuiz;
        if (dateTimeSubGame === 'clock') return t.time.timeAdventure;
        if (dateTimeSubGame === 'month-learning') return t.time.monthLearning;
      }
    }
    return '';
  };

  return (
    <div className="app-container">
      {/* Global Navigation (Game Header Template) */}
      <div className="game-header" style={{ marginBottom: currentSubject ? '1rem' : '2rem', marginTop: '1rem' }}>
        {/* Left Section: Home Button */}
        <div className="header-section left">
          {currentSubject && (
            <button onClick={handleBackToHome} className="header-btn home-btn" title={t.global.home}>
              <Home size={24} />
            </button>
          )}
        </div>

        {/* Middle Section: Page Information */}
        <div className="header-section middle">
          <span className="header-title" style={{ fontSize: '1.2rem', textAlign: 'center' }}>
            {getPageTitle()}
          </span>
        </div>

        {/* Right Section: Language Toggle */}
        <div className="header-section right">
          <button
            onClick={() => setLanguage(l => l === 'bm' ? 'eng' : 'bm')}
            className="header-btn lang-btn"
            title="Toggle Language"
            style={{
              width: 'auto',
              padding: '0 12px',
              borderRadius: '15px',
              background: 'rgba(157, 78, 221, 0.1)',
              color: '#9D4EDD',
              fontWeight: 'bold',
              display: 'flex',
              gap: '6px',
              fontSize: '0.9rem'
            }}
          >
            <Languages size={18} />
            <span>BM / ENG</span>
          </button>
        </div>
      </div>

      {/* Subject Content */}
      {renderSubjectContent()}

      <footer style={{ marginTop: '2rem', color: '#888', fontSize: '0.8rem', textAlign: 'center' }}>
        Iman's Learning Adventure • Version 2.0
      </footer>
    </div>
  );
}

export default App;
