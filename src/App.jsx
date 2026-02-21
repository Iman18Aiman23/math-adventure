import React, { useState } from 'react';
import HomePage from './components/HomePage';
import BMPage from './components/BMPage';
import JawiPage from './components/JawiPage';
import MathHome from './components/MathHome';
import GameMenu from './components/GameMenu';
import TimeGameMenu from './components/TimeGameMenu';
import MonthsGame from './components/MonthsGame';
import ClockGame from './components/ClockGame';
import QuizArena from './components/QuizArena';
import { getMuted, setMuted } from './utils/soundManager';

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
          return <MathHome onSelectSubGame={setMathSubGame} onBack={handleBackToHome} />;
        }
        if (mathSubGame === 'operations') {
          return !isPlaying ? (
            <GameMenu
              onStart={handleStartGame}
              isMuted={isMuted}
              onToggleMute={handleToggleMute}
              onBack={() => setMathSubGame(null)}
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
            />
          );
        }
        if (mathSubGame === 'datetime') {
          if (!isPlaying) {
            return <TimeGameMenu onBack={() => setMathSubGame(null)} onStart={handleStartTimeGame} onHome={handleBackToHome} />;
          }
          if (dateTimeSubGame === 'months') {
            return <MonthsGame onBack={handleBackToMenu} onHome={handleBackToHome} />;
          }
          if (dateTimeSubGame === 'clock') {
            return <ClockGame onBack={handleBackToMenu} onHome={handleBackToHome} />;
          }
        }
        return <MathHome onSelectSubGame={setMathSubGame} onBack={handleBackToHome} />;
      case 'bm':
        return <BMPage onBack={handleBackToHome} onHome={handleBackToHome} />;
      case 'jawi':
        return <JawiPage onBack={handleBackToHome} onHome={handleBackToHome} />;
      default:
        return <HomePage onSelectSubject={setCurrentSubject} />;
    }
  };

  return (
    <div className="app-container">
      {/* Subject Content */}
      {renderSubjectContent()}

      <footer style={{ marginTop: '2rem', color: '#888', fontSize: '0.8rem', textAlign: 'center' }}>
        Iman's Learning Adventure • Version 2.0
      </footer>
    </div>
  );
}

export default App;
