import React, { useState, useEffect, useRef, useCallback } from 'react';
import GameHeader from './GameHeader';
import DevOverlay from './DevOverlay';
import ThemeSelectorOverlay from './ThemeSelectorOverlay';
import { LOCALIZATION } from '../utils/localization';
import { useGameStateContext } from '../App';
import SpeechManager from '../services/SpeechManager';

/**
 * BMPage — AI-Ed Venture (Phonics & Math)
 *
 * Two views:
 * 1. Category Selection (React) — beautiful card-based menu
 * 2. Phaser Game (embedded canvas) — the speak-to-play engine
 */

const CATEGORIES = [
  {
    key: 'bm_kv',
    emoji: '🗣️',
    color: '#0EA5E9',
    gradient: 'linear-gradient(135deg, #0EA5E9, #38bdf8)',
    shadow: 'rgba(14,165,233,0.35)',
  },
  {
    key: 'bm_kvk',
    emoji: '🔤',
    color: '#7C3AED',
    gradient: 'linear-gradient(135deg, #7C3AED, #a78bfa)',
    shadow: 'rgba(124,58,237,0.35)',
  },
  {
    key: 'en_long_vowels',
    emoji: '📖',
    color: '#F43F5E',
    gradient: 'linear-gradient(135deg, #F43F5E, #fb7185)',
    shadow: 'rgba(244,63,94,0.35)',
  },
  {
    key: 'numbers',
    emoji: '🔢',
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg, #F59E0B, #fbbf24)',
    shadow: 'rgba(245,158,11,0.35)',
  },
  {
    key: 'common_objects',
    emoji: '🎯',
    color: '#10B981',
    gradient: 'linear-gradient(135deg, #10B981, #34d399)',
    shadow: 'rgba(16,185,129,0.35)',
  },
];

export default function BMPage({ onBack, onHome, language }) {
  const t = LOCALIZATION[language].bmPage;
  const gameState = useGameStateContext();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showDevOverlay, setShowDevOverlay] = useState(false);
  const [showThemeOverlay, setShowThemeOverlay] = useState(false);
  const [transcriptData, setTranscriptData] = useState({});
  const [isSupported, setIsSupported] = useState(true);
  const [micDenied, setMicDenied] = useState(false);

  const phaserRef = useRef(null);
  const gameInstanceRef = useRef(null);

  // Check speech API support
  useEffect(() => {
    setIsSupported(SpeechManager.isSupported());

    const handleOpenTheme = () => setShowThemeOverlay(true);
    window.addEventListener('open-theme-selector', handleOpenTheme);
    return () => window.removeEventListener('open-theme-selector', handleOpenTheme);
  }, []);

  /**
   * Handle category selection — request mic permission first (user gesture!).
   * Mobile browsers REQUIRE a user gesture to grant mic access.
   */
  const handleCategorySelect = async (categoryKey) => {
    // Request mic permission on this user tap/click
    const granted = await SpeechManager.requestMicPermission();
    if (!granted) {
      setMicDenied(true);
      return;
    }
    setMicDenied(false);
    setSelectedCategory(categoryKey);
  };

  // Handle score from Phaser → React gamification
  const handleScore = useCallback(
    (data) => {
      if (data.correct && gameState?.addWin) {
        gameState.addWin(10);
      }
      // Update transcript data with match status
      setTranscriptData((prev) => ({
        ...prev,
        matched: data.correct,
        transcript: data.transcript,
      }));
    },
    [gameState]
  );

  // Handle transcript updates from SpeechManager → DevOverlay
  const handleTranscriptUpdate = useCallback((data) => {
    setTranscriptData(data);
  }, []);

  // Use a ref for callbacks to prevent Phaser recreation on every React render
  const callbacksRef = useRef({ onScore: handleScore, onTranscriptUpdate: handleTranscriptUpdate });
  useEffect(() => {
    callbacksRef.current = { onScore: handleScore, onTranscriptUpdate: handleTranscriptUpdate };
  }, [handleScore, handleTranscriptUpdate]);

  // Mount / unmount Phaser game
  useEffect(() => {
    if (!selectedCategory || !phaserRef.current) return;

    let game = null;

    // Dynamic import to avoid loading Phaser until needed
    import('../game/BMGameConfig.js').then(({ createBMGame }) => {
      if (!phaserRef.current) return;

      game = createBMGame(phaserRef.current, selectedCategory, {
        onScore: (data) => callbacksRef.current.onScore(data),
        onTranscriptUpdate: (data) => callbacksRef.current.onTranscriptUpdate(data),
      });

      gameInstanceRef.current = game;
    });

    return () => {
      SpeechManager.stop();
      SpeechManager.stopSpeaking();
      if (game) {
        game.destroy(true);
      }
      gameInstanceRef.current = null;
    };
  }, [selectedCategory]); // Only re-instantiate when category changes

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      SpeechManager.destroy();
      if (gameInstanceRef.current) {
        gameInstanceRef.current.destroy(true);
        gameInstanceRef.current = null;
      }
    };
  }, []);

  // ── Category Selection View ───────────────────────────────────────────────
  if (!selectedCategory) {
    return (
      <div className="game-container fade-in">
        <GameHeader onBack={onBack} onHome={onHome} title={t.title} language={language} />

        <div style={{ padding: '0 0.75rem', width: '100%', maxWidth: 480, margin: '0 auto' }}>
          {/* Hero Section */}
          <div className="bm-hero">
            <div className="bm-hero-emoji">🎤</div>
            <h2 className="bm-hero-title">{t.heroTitle}</h2>
            <p className="bm-hero-subtitle">{t.heroSubtitle}</p>
          </div>

          {/* Browser Support Warning */}
          {!isSupported && (
            <div className="bm-warning-card">
              <span style={{ fontSize: '1.5rem' }}>⚠️</span>
              <p>{t.notSupported}</p>
            </div>
          )}

          {/* Mic Permission Denied Warning */}
          {micDenied && (
            <div className="bm-warning-card" style={{ borderColor: '#ef4444', background: '#fee2e2' }}>
              <span style={{ fontSize: '1.5rem' }}>🎤</span>
              <p style={{ color: '#991b1b' }}>{t.micDenied || 'Microphone access was denied. Please allow microphone access in your browser settings and try again.'}</p>
            </div>
          )}

          {/* Category Cards */}
          <div className="bm-category-grid">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat.key}
                className="bm-category-card"
                style={{
                  '--card-gradient': cat.gradient,
                  '--card-shadow': cat.shadow,
                  animationDelay: `${i * 0.08}s`,
                }}
                onClick={() => handleCategorySelect(cat.key)}
                disabled={!isSupported}
              >
                <span className="bm-cat-emoji">{cat.emoji}</span>
                <div className="bm-cat-info">
                  <span className="bm-cat-title">{t.categories[cat.key]?.title}</span>
                  <span className="bm-cat-desc">{t.categories[cat.key]?.desc}</span>
                </div>
                <span className="bm-cat-arrow">▶</span>
              </button>
            ))}
          </div>

          {/* How to Play */}
          <div className="bm-howto">
            <div className="bm-howto-title">{t.howToPlayTitle}</div>
            <div className="bm-howto-steps">
              <div className="bm-howto-step">
                <span className="bm-step-num">1</span>
                <span>{t.howToStep1}</span>
              </div>
              <div className="bm-howto-step">
                <span className="bm-step-num">2</span>
                <span>{t.howToStep2}</span>
              </div>
              <div className="bm-howto-step">
                <span className="bm-step-num">3</span>
                <span>{t.howToStep3}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Game View (Phaser Canvas) ──────────────────────────────────────────────
  return (
    <div className="game-container fade-in">
      <GameHeader
        onBack={() => {
          SpeechManager.stop();
          SpeechManager.stopSpeaking();
          if (gameInstanceRef.current) {
            gameInstanceRef.current.destroy(true);
            gameInstanceRef.current = null;
          }
          setSelectedCategory(null);
        }}
        onHome={() => {
          SpeechManager.stop();
          SpeechManager.stopSpeaking();
          if (gameInstanceRef.current) {
            gameInstanceRef.current.destroy(true);
            gameInstanceRef.current = null;
          }
          onHome();
        }}
        title={t.title}
        language={language}
      />

      {/* Phaser Canvas Container */}
      <div className="bm-game-canvas" ref={phaserRef} />

      {/* Dev Overlay Toggle */}
      <button
        className="dev-toggle-btn"
        onClick={() => setShowDevOverlay((v) => !v)}
        title="Toggle Dev Overlay"
      >
        🔧
      </button>

      {/* Dev Overlay */}
      <DevOverlay
        visible={showDevOverlay}
        transcriptData={transcriptData}
        onClose={() => setShowDevOverlay(false)}
      />

      {/* Theme Selector Overlay */}
      <ThemeSelectorOverlay 
        visible={showThemeOverlay}
        language={language}
        onClose={() => setShowThemeOverlay(false)}
        onSelect={(subtheme) => {
          setShowThemeOverlay(false);
          // Fetch specifically the GameScene instead of assuming index 0
          const scene = gameInstanceRef.current?.scene?.getScene('GameScene');
          if (scene && typeof scene.setSubtheme === 'function') {
            scene.setSubtheme(subtheme);
          }
        }}
      />
    </div>
  );
}
