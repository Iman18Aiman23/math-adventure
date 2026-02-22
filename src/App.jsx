import React, { useState } from 'react';
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
import { getMuted, setMuted } from './utils/soundManager';
import { LOCALIZATION } from './utils/localization';
import { Languages } from 'lucide-react';

function App() {
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

  return (
    <div className="app-container">
      {/* Global Language Toggle */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '1rem',
        zIndex: 1000
      }}>
        <button
          onClick={() => setLanguage(l => l === 'bm' ? 'eng' : 'bm')}
          className="card"
          style={{
            padding: '0.6rem 2rem',
            borderRadius: '25px',
            background: 'white',
            border: '3px solid #9D4EDD',
            color: '#9D4EDD',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 4px 15px rgba(157, 78, 221, 0.2)',
            fontSize: '1rem'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(157, 78, 221, 0.3)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(157, 78, 221, 0.2)';
          }}
        >
          <Languages size={20} />
          {t.global.bmEng}
        </button>
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
