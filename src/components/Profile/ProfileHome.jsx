import React, { useState } from 'react';
import MascotIcon from '../icons/MascotIcon';
import HeartShopModal from '../HeartShopModal';
import { getGameData } from '../../utils/gameStatsManager';
import { playHoverSound } from '../../utils/soundManager';

export default function ProfileHome({ playerName, gameState, language, streak = 0 }) {
  const gameData = getGameData();
  const totalXP = gameData.stars;
  const gems = gameData.gems;
  const hearts = gameData.hearts;
  const [isHeartShopOpen, setIsHeartShopOpen] = useState(false);

  const stats = [
    { label: language === 'bm' ? 'Hari Aktif' : 'Streak', value: streak,              color: '#FF9600', emoji: '🔥' },
    { label: 'Level',                                       value: gameState?.level ?? 1, color: '#CE82FF', emoji: '🏆' },
    { label: language === 'bm' ? 'Nyawa' : 'Hearts',       value: hearts,              color: '#FF4B4B', emoji: '❤️' },
    { label: 'Stars',                                       value: totalXP,             color: '#FFC800', emoji: '⭐' },
    { label: language === 'bm' ? 'Permata' : 'Gems',       value: gems,                color: '#CE82FF', emoji: '💎' },
  ];

  return (
    <div className="page-shell">

      {/* Header */}
      <div style={{ background: '#fff', padding: '2rem 1.5rem', textAlign: 'center', borderBottom: '2px solid #E5E5E5' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
          <MascotIcon size={80} />
        </div>
        <h2 style={{ fontWeight: 900, fontSize: '1.4rem', color: '#3C3C3C', marginBottom: '4px' }}>
          {playerName || 'Player'}
        </h2>
        <p style={{ color: '#AFAFAF', fontWeight: 600, fontSize: '0.85rem' }}>
          Level {gameState?.level ?? 1} Explorer
        </p>
      </div>

      {/* Stats grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0.75rem',
        padding: '1.25rem 1rem',
        maxWidth: '700px',
        margin: '0 auto',
        paddingBottom: 'calc(140px + var(--safe-bottom))',
      }}>
        {stats.map(stat => {
          const isClickable = stat.emoji === '❤️' || stat.emoji === '⭐' || stat.emoji === '💎';
          return (
            <button
              key={stat.label}
              className="profile-stat-card"
              onMouseEnter={playHoverSound}
              onClick={isClickable ? () => setIsHeartShopOpen(true) : undefined}
              style={{
                background: '#fff',
                border: '2px solid #E5E5E5',
                borderRadius: '16px',
                padding: '1rem',
                textAlign: 'center',
                cursor: isClickable ? 'pointer' : 'default',
              }}
            >
              <div style={{ fontSize: '1.8rem', marginBottom: '4px' }}>{stat.emoji}</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#AFAFAF', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {stat.label}
              </div>
            </button>
          );
        })}
      </div>

      <style>{`
        .profile-stat-card {
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .profile-stat-card:hover {
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
          border-color: #999 !important;
        }
        .profile-stat-card:active {
          transform: translateY(-4px) scale(1.02);
        }
      `}</style>

      <HeartShopModal isOpen={isHeartShopOpen} onClose={() => setIsHeartShopOpen(false)} language={language} />
    </div>
  );
}
