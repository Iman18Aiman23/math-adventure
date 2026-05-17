import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useGameStateContext } from '../App';
import { getGameData } from '../utils/gameStatsManager';
import HeartShopModal from './HeartShopModal';

const DESIGN_SYSTEM = {
  colors: {
    hair: '#E5E7EB',
    muted: '#6B7280',
  }
};

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

  // Callback when a purchase is made in HeartShopModal
  const handlePurchase = (newData) => {
    setDisplayHearts(newData.hearts);
    setDisplayGems(newData.gems);
    setDisplayStars(newData.stars);
  };

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
        padding: '0.75rem 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '0.75rem',
        flexShrink: 0,
        flexWrap: 'wrap',
      }}>
        {/* Back Button */}
        <button
          onClick={onBack}
          style={{
            background: '#fff',
            border: `2px solid ${DESIGN_SYSTEM.colors.hair}`,
            borderRadius: '50%',
            width: 44,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: DESIGN_SYSTEM.colors.muted,
            cursor: 'pointer',
            boxShadow: `0 3px 0 ${DESIGN_SYSTEM.colors.hair}`,
            transition: 'transform 0.12s',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          <ArrowLeft size={24} />
        </button>

        {/* Stats on the Right - Badge Style */}
        <div className="duo-home-stats" style={{
          display: 'flex',
          gap: '0.5rem',
          flexShrink: 0,
          alignItems: 'center',
        }}>
          {/* Stars Badge */}
          <button
            onClick={() => setIsHeartShopOpen(true)}
            style={{
              background: '#fff',
              border: `2px solid ${DESIGN_SYSTEM.colors.hair}`,
              borderRadius: '999px',
              padding: '6px 12px',
              fontWeight: 800,
              fontSize: '0.85rem',
              color: '#FFC800',
              cursor: 'pointer',
              boxShadow: `0 3px 0 ${DESIGN_SYSTEM.colors.hair}`,
              transition: 'transform 0.12s',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
            title={language === 'bm' ? 'Bintang' : 'Stars'}
          >
            <span>⭐</span>
            <span className="desktop-stat">{displayStars}</span>
          </button>

          {/* Hearts Badge */}
          <button
            onClick={() => setIsHeartShopOpen(true)}
            style={{
              background: '#fff',
              border: `2px solid ${DESIGN_SYSTEM.colors.hair}`,
              borderRadius: '999px',
              padding: '6px 12px',
              fontWeight: 800,
              fontSize: '0.85rem',
              color: '#FF4B4B',
              cursor: 'pointer',
              boxShadow: `0 3px 0 ${DESIGN_SYSTEM.colors.hair}`,
              transition: 'transform 0.12s',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
            title={language === 'bm' ? 'Nyawa' : 'Hearts'}
          >
            <span>❤️</span>
            <span className="desktop-stat">{displayHearts}</span>
          </button>

          {/* Gems Badge */}
          <button
            onClick={() => setIsHeartShopOpen(true)}
            style={{
              background: '#fff',
              border: `2px solid ${DESIGN_SYSTEM.colors.hair}`,
              borderRadius: '999px',
              padding: '6px 12px',
              fontWeight: 800,
              fontSize: '0.85rem',
              color: '#CE82FF',
              cursor: 'pointer',
              boxShadow: `0 3px 0 ${DESIGN_SYSTEM.colors.hair}`,
              transition: 'transform 0.12s',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
            title={language === 'bm' ? 'Permata' : 'Gems'}
          >
            <span>💎</span>
            <span className="desktop-stat">{displayGems}</span>
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

      <HeartShopModal isOpen={isHeartShopOpen} onClose={() => setIsHeartShopOpen(false)} onPurchase={handlePurchase} language={language} />
    </>
  );
}
