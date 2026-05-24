import React, { useState } from 'react';
import { CURRICULUM, getAgeGroup } from '../../data/ageCurriculum';
import { playHoverSound } from '../../utils/soundManager';
import BackButton from '../BackButton';

// Import SVG icons
import AlphabetSafariSvg from '../icons/EarlyExplorersHome/AlphabetSafari.svg';
import LetterTraceSvg from '../icons/EarlyExplorersHome/LetterTrace.svg';
import PhonicsPopSvg from '../icons/EarlyExplorersHome/PhoneticsPop.svg';
import SoundMatchingSvg from '../icons/EarlyExplorersHome/SoundMatching.svg';
import LetterSoundPuzzleSvg from '../icons/EarlyExplorersHome/LetterSoundPuzzle.svg';
import PhonicsSprintSvg from '../icons/EarlyExplorersHome/PhoneticsSprint.svg';

export default function EarlyExplorersHome(props) {
  const { onBack, onPlayGame, language = 'bm' } = props;
  const curriculum = CURRICULUM['age-4-5'];

  // Get all games from all pillars
  const allGames = [];
  ['reading', 'speaking', 'jawi', 'math'].forEach(pillarId => {
    if (curriculum[pillarId] && Array.isArray(curriculum[pillarId])) {
      allGames.push(...curriculum[pillarId]);
    }
  });

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      background: 'linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)',
      minHeight: '100vh',
    }}>
      <style>{`
        /* Games Grid Responsive Columns */
        .games-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
          max-width: 100%;
        }

        /* Tablet: 3 columns (min-width: 640px) */
        @media (min-width: 640px) {
          .games-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* Desktop: 4 columns max (min-width: 1024px) */
        @media (min-width: 1024px) {
          .games-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
      {/* Back button */}
      <BackButton onClick={onBack} />

      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '1rem',
        paddingBottom: 'calc(1.25rem + var(--safe-bottom, 0))',
      }}>
        {/* Hero section with improved visual hierarchy */}
        <div style={{
          marginBottom: '2.5rem',
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #58CC0220, #46A30210)',
            borderRadius: '20px',
            padding: '2.25rem 1.75rem',
            color: '#1F2937',
            boxShadow: '0 2px 12px rgba(88, 204, 2, 0.1), inset 0 1px 0 rgba(255,255,255,0.6)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1.5rem',
            border: '1px solid rgba(88, 204, 2, 0.15)',
          }}>
            <span style={{ fontSize: '3.5rem', lineHeight: 1, flexShrink: 0 }}>🌱</span>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '0.65rem',
                fontWeight: 800,
                opacity: 0.55,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '0.6rem',
                color: '#64748B',
              }}>
                Age Group 4–5
              </div>
              <div style={{
                fontSize: '1.85rem',
                fontWeight: 900,
                fontFamily: 'var(--font-heading)',
                lineHeight: 1.2,
                margin: '0 0 0.8rem 0',
                color: '#58CC02',
                letterSpacing: '-0.3px',
              }}>
                Early Explorers
              </div>
              <div style={{
                fontSize: '0.9rem',
                fontWeight: 500,
                opacity: 0.7,
                lineHeight: 1.6,
                color: '#475569',
              }}>
                Master letters, sounds, and the building blocks of reading through playful games
              </div>
            </div>
          </div>
        </div>

        {/* Games Grid - Responsive: Mobile 2col, Tablet 3col, Desktop 4col */}
        <div className="games-grid">
          {allGames.map((game, idx) => (
            <GameCard
              key={game.id}
              game={game}
              onPlay={() => onPlayGame(game.id)}
              language={language}
              index={idx}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const SVG_MAP = {
  'alphabet-safari':    AlphabetSafariSvg,
  'letter-trace':       LetterTraceSvg,
  'phonics-pop':        PhonicsPopSvg,
  'sound-matching':     SoundMatchingSvg,
  'letter-sound-puzzle':LetterSoundPuzzleSvg,
  'phonics-sprint':     PhonicsSprintSvg,
};

function GameCard({ game, onPlay, language, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div
      onClick={onPlay}
      onMouseEnter={() => { setIsHovered(true); playHoverSound(); }}
      onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => { setIsPressed(false); onPlay(); }}
      style={{
        cursor: 'pointer',
        display: 'block',
        width: '100%',
        transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: isPressed ? 'scale(0.95)' : isHovered ? 'scale(1.08)' : 'scale(1)',
        filter: isHovered
          ? 'brightness(1.1) drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2))'
          : 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
      }}
    >
      <img
        src={SVG_MAP[game.id]}
        alt={game.name}
        draggable={false}
        style={{ width: '100%', height: 'auto', display: 'block', pointerEvents: 'none' }}
      />
    </div>
  );
}
