import React, { useState, useEffect } from 'react';
import { useGameStateContext } from '../App';
import { getGameData } from '../utils/gameStatsManager';
import HeartShopModal from './HeartShopModal';

export default function AppHeader({ onBack, gameState, language, hearts, gems, stars }) {
  const [displayHearts, setDisplayHearts] = useState(3);
  const [displayGems, setDisplayGems] = useState(0);
  const [displayStars, setDisplayStars] = useState(0);
  const [isHeartShopOpen, setIsHeartShopOpen] = useState(false);

  // Load game data from localStorage on mount
  useEffect(() => {
    const gameData = getGameData();
    setDisplayHearts(gameData.hearts);
    setDisplayGems(gameData.gems);
    setDisplayStars(gameData.stars);
  }, []);

  // Update when props change (for real-time updates from games)
  useEffect(() => {
    if (hearts !== undefined && hearts !== null) {
      setDisplayHearts(hearts);
    }
  }, [hearts]);

  useEffect(() => {
    if (gems !== undefined && gems !== null) {
      setDisplayGems(gems);
    }
  }, [gems]);

  useEffect(() => {
    if (stars !== undefined && stars !== null) {
      setDisplayStars(stars);
    }
  }, [stars]);

  return (
    <>
      <div className="duo-home-header" style={{
        background: '#fff',
        padding: '0.85rem 1.25rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #E5E5E5',
        gap: '1rem',
        flexShrink: 0,
      }}>
        {/* Back Button */}
        <button
          onClick={onBack}
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: '1.3rem',
            color: '#AFAFAF',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            flexShrink: 0,
          }}
        >
          ←
        </button>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Stats on the Right */}
        <div className="duo-home-stats" style={{
          display: 'flex',
          gap: '12px',
          flexShrink: 0,
        }}>
          {/* Stars Button */}
          <button
            onClick={() => setIsHeartShopOpen(true)}
            className="duo-home-stat desktop-stat"
            style={{
              color: '#FFC800',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 700,
              fontSize: '0.9rem',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.opacity = '0.8';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.opacity = '1';
            }}
          >
            <span style={{ fontSize: '1.4rem' }}>⭐</span>
            <span>{displayStars} {language === 'bm' ? 'bintang' : 'stars'}</span>
          </button>
          <button
            onClick={() => setIsHeartShopOpen(true)}
            className="duo-home-stat mobile-stat"
            style={{
              color: '#FFC800',
              display: 'none',
              alignItems: 'center',
              gap: '2px',
              fontWeight: 700,
              fontSize: '0.9rem',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.opacity = '0.8';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.opacity = '1';
            }}
          >
            <span style={{ fontSize: '1.4rem' }}>⭐</span>
            <span>{displayStars}</span>
          </button>

          {/* Separator dot - desktop only */}
          <span className="desktop-stat" style={{ color: '#ccc' }}>·</span>

          {/* Hearts Button */}
          <button
            onClick={() => setIsHeartShopOpen(true)}
            className="duo-home-stat desktop-stat"
            style={{
              color: '#FF4B4B',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 700,
              fontSize: '0.9rem',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.opacity = '0.8';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.opacity = '1';
            }}
          >
            <span style={{ fontSize: '1.4rem' }}>❤️</span>
            <span>{displayHearts} {language === 'bm' ? 'nyawa' : 'hearts'}</span>
          </button>
          <button
            onClick={() => setIsHeartShopOpen(true)}
            className="duo-home-stat mobile-stat"
            style={{
              color: '#FF4B4B',
              display: 'none',
              alignItems: 'center',
              gap: '2px',
              fontWeight: 700,
              fontSize: '0.9rem',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.opacity = '0.8';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.opacity = '1';
            }}
          >
            <span style={{ fontSize: '1.4rem' }}>❤️</span>
            <span>{displayHearts}</span>
          </button>

          {/* Separator dot - desktop only */}
          <span className="desktop-stat" style={{ color: '#ccc' }}>·</span>

          {/* Gems Button */}
          <button
            onClick={() => setIsHeartShopOpen(true)}
            className="duo-home-stat desktop-stat"
            style={{
              color: '#CE82FF',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 700,
              fontSize: '0.9rem',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.opacity = '0.8';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.opacity = '1';
            }}
          >
            <span style={{ fontSize: '1.4rem' }}>💎</span>
            <span>{displayGems} {language === 'bm' ? 'permata' : 'gems'}</span>
          </button>
          <button
            onClick={() => setIsHeartShopOpen(true)}
            className="duo-home-stat mobile-stat"
            style={{
              color: '#CE82FF',
              display: 'none',
              alignItems: 'center',
              gap: '2px',
              fontWeight: 700,
              fontSize: '0.9rem',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.opacity = '0.8';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.opacity = '1';
            }}
          >
            <span style={{ fontSize: '1.4rem' }}>💎</span>
            <span>{displayGems}</span>
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-stat {
            display: none !important;
          }
          .mobile-stat {
            display: flex !important;
          }
        }
      `}</style>

      <HeartShopModal isOpen={isHeartShopOpen} onClose={() => setIsHeartShopOpen(false)} language={language} />
    </>
  );
}
