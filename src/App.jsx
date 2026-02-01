import React, { useState } from 'react';
import GameMenu from './components/GameMenu';
import QuizArena from './components/QuizArena';
import { getMuted, setMuted } from './utils/soundManager';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameConfig, setGameConfig] = useState({ operation: 'add', difficulty: 'easy', selectedNumbers: [], quizType: 'multiple' });
  const [isMuted, setIsMuted] = useState(getMuted());

  const handleStartGame = (operation, difficulty, selectedNumbers = [], quizType = 'multiple') => {
    setGameConfig({ operation, difficulty, selectedNumbers, quizType });
    setIsPlaying(true);
  };

  const handleBackToMenu = () => {
    setIsPlaying(false);
  };

  const handleToggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    setMuted(newMuted);
  };

  return (
    <div className="app-container">
      {/* Background decorations could go here */}

      {!isPlaying ? (
        <GameMenu
          onStart={handleStartGame}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
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
      )}

      <footer style={{ marginTop: '2rem', color: '#888', fontSize: '0.8rem' }}>
        Math Adventure for Kids • Version 1.0
      </footer>
    </div>
  );
}

export default App;
