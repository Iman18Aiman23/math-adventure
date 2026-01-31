import React, { useState } from 'react';
import GameMenu from './components/GameMenu';
import QuizArena from './components/QuizArena';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameConfig, setGameConfig] = useState({ operation: 'add', difficulty: 'medium', selectedNumbers: [] });

  const handleStartGame = (operation, difficulty, selectedNumbers = []) => {
    setGameConfig({ operation, difficulty, selectedNumbers });
    setIsPlaying(true);
  };

  const handleBackToMenu = () => {
    setIsPlaying(false);
  };

  return (
    <div className="app-container">
      {/* Background decorations could go here */}

      {!isPlaying ? (
        <GameMenu onStart={handleStartGame} />
      ) : (
        <QuizArena
          operation={gameConfig.operation}
          difficulty={gameConfig.difficulty}
          selectedNumbers={gameConfig.selectedNumbers}
          onBack={handleBackToMenu}
        />
      )}

      <footer style={{ marginTop: '2rem', color: '#888', fontSize: '0.8rem' }}>
        Math Adventure for Kids • Version 1.0
      </footer>
    </div>
  );
}

export default App;
