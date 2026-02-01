import React, { useState } from 'react';
import HomePage from './components/HomePage';
import BMPage from './components/BMPage';
import JawiPage from './components/JawiPage';
import GameMenu from './components/GameMenu';
import QuizArena from './components/QuizArena';
import { getMuted, setMuted } from './utils/soundManager';

function App() {
  const [currentSubject, setCurrentSubject] = useState(null); // null, 'math', 'bm', 'jawi'
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

  const handleBackToHome = () => {
    setIsPlaying(false);
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
        return !isPlaying ? (
          <GameMenu
            onStart={handleStartGame}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            onBack={handleBackToHome}
          />
        ) : (
          <QuizArena
            operation={gameConfig.operation}
            difficulty={gameConfig.difficulty}
            selectedNumbers={gameConfig.selectedNumbers}
            quizType={gameConfig.quizType}
            onBack={handleBackToMenu}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
          />
        );
      case 'bm':
        return <BMPage onBack={handleBackToHome} />;
      case 'jawi':
        return <JawiPage onBack={handleBackToHome} />;
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
