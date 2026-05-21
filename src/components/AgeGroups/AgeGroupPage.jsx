import React, { useState, useCallback } from 'react';
import { ChevronDown, ChevronRight, Lock } from 'lucide-react';
import { playHoverSound } from '../../utils/soundManager';
import { useGameStateContext } from '../../App';
import AppHeader from '../AppHeader';
import { getAgeGroup, PILLARS, CURRICULUM } from '../../data/ageCurriculum';

// Default color map for each pillar with interactive shades
const DEFAULT_PILLAR_COLORS = {
  reading: { main: '#EF4444', light: '#FCA5A5', dark: '#7F1D1D', shadow: '#4B0000' },
  speaking: { main: '#0D9488', light: '#7EE8D6', dark: '#115E59', shadow: '#0D3D3A' },
  jawi: { main: '#D97706', light: '#FED7AA', dark: '#92400E', shadow: '#54210E' },
  math: { main: '#10B981', light: '#A7F3D0', dark: '#065F46', shadow: '#022C1F' },
};

const PillarBlock = React.memo(function PillarBlock({
  pillar, games, expanded, onToggle, onPlayGame, accent, accentDark, language, themeColors,
}) {
  const hasGames = Array.isArray(games) && games.length > 0;
  const completeCount = hasGames ? games.filter(g => g.status === 'complete').length : 0;
  const totalCount = hasGames ? games.length : 0;
  const colors = (themeColors && themeColors[pillar.id]) || DEFAULT_PILLAR_COLORS[pillar.id] || DEFAULT_PILLAR_COLORS.reading;
  const [isPressed, setIsPressed] = React.useState(false);

  // Memoize CSS to prevent recalculation
  const pillarStyles = React.useMemo(() => ({
    background: `linear-gradient(135deg, ${colors.main} 0%, ${colors.dark} 100%)`,
    boxShadow: `inset 0 1px 0 ${colors.light}, 0 8px 0 ${colors.shadow}`,
    boxShadowHover: `inset 0 1px 0 ${colors.light}, 0 10px 0 ${colors.shadow}`,
    boxShadowActive: `inset 0 1px 0 ${colors.light}, inset 0 -4px 0 ${colors.dark}`,
  }), [colors]);

  return (
    <div style={{ margin: '1rem 0', position: 'relative' }}>
      <style>{`
        .pillar-button-${pillar.id} {
          position: relative;
          display: block;
          width: 100%;
          padding: 1.25rem 1.25rem;
          background: ${pillarStyles.background};
          color: white;
          border: none;
          border-radius: 16px;
          cursor: pointer;
          font-family: 'Helvetica Neue', sans-serif;
          font-weight: 800;
          text-align: left;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          box-shadow: ${pillarStyles.boxShadow};
          transform: translateY(0);
          will-change: transform, box-shadow;
          contain: layout style paint;
        }

        .pillar-button-${pillar.id}:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: ${pillarStyles.boxShadowHover};
        }

        .pillar-button-${pillar.id}:active:not(:disabled) {
          transform: translateY(8px);
          box-shadow: ${pillarStyles.boxShadowActive};
        }

        .pillar-button-${pillar.id}:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>

      <button
        className={`pillar-button-${pillar.id}`}
        onClick={onToggle}
        onMouseEnter={playHoverSound}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          width: '100%',
          textAlign: 'left',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', flexShrink: 0 }}>
          <pillar.icon size={64} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 900, color: '#fff', fontSize: '1.15rem', fontFamily: 'var(--font-heading)', marginBottom: '4px' }}>
            {pillar.label[language] || pillar.label.bm}
          </div>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: colors.light, textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
            {hasGames
              ? `${completeCount} / ${totalCount} ${language === 'bm' ? 'siap' : 'ready'}`
              : (language === 'bm' ? 'Segera hadir' : 'Coming soon')}
          </div>
        </div>
        {hasGames
          ? (expanded ? <ChevronDown size={26} color="#fff" /> : <ChevronRight size={26} color="#fff" />)
          : <Lock size={22} color="#fff" opacity={0.7} />}
      </button>

      {expanded && hasGames && (
        <div style={{ padding: '1rem 0.75rem 1.25rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(145px, 1fr))', gap: '0.875rem', background: 'linear-gradient(180deg, #f0f4ff 0%, #fafbff 100%)', marginTop: '0.5rem', borderRadius: '0 0 20px 20px', borderTop: '2px dashed rgba(0,0,0,0.06)' }}>
          <style>{`
            @keyframes card-pop {
              0%   { transform: scale(1) translateY(0); }
              40%  { transform: scale(1.12) translateY(-10px); }
              70%  { transform: scale(1.06) translateY(-6px); }
              100% { transform: scale(1.08) translateY(-8px); }
            }
            @keyframes emoji-bounce {
              0%, 100% { transform: scale(1) rotate(0deg); }
              30%       { transform: scale(1.25) rotate(-8deg); }
              60%       { transform: scale(1.2)  rotate(6deg); }
            }
            @keyframes sparkle-spin {
              from { transform: rotate(0deg) scale(1); opacity: 0.9; }
              to   { transform: rotate(360deg) scale(1.1); opacity: 0.6; }
            }
            @keyframes shine-sweep {
              0%   { left: -100%; }
              100% { left: 150%; }
            }

            .game-card { position: relative; border: none; border-radius: 22px; padding: 0; font-family: var(--font-body); cursor: pointer; transition: transform 0.18s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.18s ease; will-change: transform; overflow: visible; background: transparent; }

            .game-card.complete:hover { animation: card-pop 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards; }
            .game-card.complete:hover .game-card-emoji { animation: emoji-bounce 0.5s cubic-bezier(0.34,1.56,0.64,1); }
            .game-card.complete:hover .game-card-shine { animation: shine-sweep 0.55s ease forwards; }

            .game-card.complete:active { transform: scale(0.94) translateY(3px) !important; }

            .game-card-inner {
              display: flex; flex-direction: column; align-items: center; gap: 0;
              border-radius: 22px; overflow: hidden;
              box-shadow: 0 6px 0 var(--card-shadow), 0 8px 20px rgba(0,0,0,0.18);
              transition: box-shadow 0.18s ease;
            }
            .game-card.complete:hover .game-card-inner {
              box-shadow: 0 10px 0 var(--card-shadow), 0 16px 32px rgba(0,0,0,0.22);
            }
            .game-card.complete:active .game-card-inner {
              box-shadow: 0 2px 0 var(--card-shadow), 0 4px 10px rgba(0,0,0,0.14);
            }
            .game-card.disabled .game-card-inner {
              box-shadow: 0 5px 0 #9CA3AF, 0 6px 14px rgba(0,0,0,0.12);
              opacity: 0.65;
            }

            .game-card-top {
              width: 100%; padding: 1.4rem 0.75rem 1rem;
              display: flex; flex-direction: column; align-items: center; gap: 0.6rem;
              position: relative;
            }
            .game-card-bottom {
              width: 100%; padding: 0.7rem 0.5rem;
              background: rgba(0,0,0,0.18);
              display: flex; flex-direction: column; align-items: center; gap: 0.2rem;
            }

            .game-card-emoji-bubble {
              width: 72px; height: 72px;
              background: rgba(255,255,255,0.95);
              border-radius: 50%;
              display: flex; align-items: center; justify-content: center;
              font-size: 2.6rem; line-height: 1;
              box-shadow: 0 4px 12px rgba(0,0,0,0.2), inset 0 -3px 0 rgba(0,0,0,0.08);
              position: relative; z-index: 1;
            }
            .game-card-emoji { display: block; }

            .game-card-dots {
              position: absolute; top: 8px; right: 10px;
              display: flex; gap: 3px;
            }
            .game-card-dot {
              width: 6px; height: 6px; border-radius: 50%;
              background: rgba(255,255,255,0.5);
            }

            .game-card-shine {
              position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
              background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
              pointer-events: none; z-index: 2;
            }

            .game-card-label {
              font-size: 0.82rem; font-weight: 900; color: #fff;
              line-height: 1.25; text-align: center;
              text-shadow: 0 1px 3px rgba(0,0,0,0.25);
            }
            .game-card-status {
              font-size: 0.62rem; font-weight: 800; letter-spacing: 0.1em;
              text-transform: uppercase; color: rgba(255,255,255,0.85);
            }

            .game-card-lock {
              position: absolute; top: -8px; right: -8px;
              width: 28px; height: 28px; border-radius: 50%;
              background: #9CA3AF; display: flex; align-items: center; justify-content: center;
              box-shadow: 0 2px 6px rgba(0,0,0,0.25);
              z-index: 3;
            }
          `}</style>

          {games.map(game => {
            const isComplete = game.status === 'complete';
            const bg    = isComplete ? (game.cardColor || colors.main) : '#C4C9D4';
            const dark  = isComplete ? (game.cardDark  || colors.dark) : '#9CA3AF';
            return (
              <button
                key={game.id}
                className={`game-card ${isComplete ? 'complete' : 'disabled'}`}
                disabled={!isComplete}
                onClick={() => isComplete && onPlayGame(game.id)}
                onMouseEnter={isComplete ? playHoverSound : undefined}
                style={{ '--card-shadow': dark + 'CC' }}
              >
                <div className="game-card-inner">
                  {/* Coloured top zone */}
                  <div className="game-card-top" style={{ background: `linear-gradient(160deg, ${bg} 0%, ${dark} 100%)` }}>
                    <div className="game-card-shine" />
                    <div className="game-card-dots">
                      <span className="game-card-dot" />
                      <span className="game-card-dot" />
                      <span className="game-card-dot" />
                    </div>
                    <div className="game-card-emoji-bubble">
                      <span className="game-card-emoji">
                        {isComplete ? (game.emoji || '🎮') : '🔒'}
                      </span>
                    </div>
                    <span className="game-card-label">{game.name}</span>
                  </div>

                  {/* Bottom action strip */}
                  <div className="game-card-bottom" style={{ background: `${dark}CC` }}>
                    <span className="game-card-status">
                      {isComplete
                        ? (language === 'bm' ? '▶ MAIN' : '▶ PLAY')
                        : (language === 'bm' ? '🔒 KUNCI' : '🔒 LOCKED')}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
});

export default function AgeGroupPage({ ageGroupId, onBack, onPlayGame, language = 'bm', theme }) {
  const gameState = useGameStateContext();
  const ageGroup = getAgeGroup(ageGroupId);
  const curriculum = CURRICULUM[ageGroupId] || {};
  const themeColors = theme ? theme.pillar : null;

  const [expanded, setExpanded] = useState(() => {
    const initial = {};
    PILLARS.forEach(p => {
      initial[p.id] = Array.isArray(curriculum[p.id]) && curriculum[p.id].length > 0;
    });
    return initial;
  });

  const togglePillar = useCallback((pillarId) => {
    playHoverSound();
    setExpanded(prev => ({ ...prev, [pillarId]: !prev[pillarId] }));
  }, []);

  if (!ageGroup) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Age group not found.</p>
        <button onClick={onBack}>Back</button>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      background: theme ? `linear-gradient(135deg, ${theme.light} 0%, rgba(255,255,255,0.7) 100%)` : 'var(--bg-body)',
      minHeight: '100vh',
      contain: 'layout style',
    }}>
      <AppHeader onBack={onBack} gameState={gameState} language={language} />

      <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1rem', background: 'transparent', contain: 'layout style' }}>
        {/* Hero card */}
        <div style={{
          background: `linear-gradient(135deg, ${theme ? theme.primary : ageGroup.color}15, ${theme ? theme.dark : ageGroup.colorDark}08)`,
          borderLeft: `6px solid ${theme ? theme.primary : ageGroup.color}`,
          borderRadius: '12px',
          padding: '2rem 1.75rem',
          color: '#1F2937',
          marginBottom: '1.5rem',
          boxShadow: `0 2px 8px rgba(0, 0, 0, 0.06)`,
          display: 'flex',
          alignItems: 'flex-start',
          gap: '1.5rem',
        }}>
          <span style={{ fontSize: '3.5rem', lineHeight: 1, flexShrink: 0 }}>{ageGroup.emoji}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, opacity: 0.6, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              {(ageGroup.subtitle[language] || ageGroup.subtitle.bm).toUpperCase()}
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, fontFamily: 'var(--font-heading)', lineHeight: 1.3, margin: '0.25rem 0 0.75rem 0', color: theme ? theme.primary : ageGroup.color }}>
              {ageGroup.title[language] || ageGroup.title.bm}
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 500, opacity: 0.75, lineHeight: 1.5 }}>
              {ageGroup.focus[language] || ageGroup.focus.bm}
            </div>
          </div>
        </div>

        {/* Pillars */}
        {PILLARS.map(pillar => (
          <PillarBlock
            key={pillar.id}
            pillar={pillar}
            games={curriculum[pillar.id]}
            expanded={!!expanded[pillar.id]}
            onToggle={() => togglePillar(pillar.id)}
            onPlayGame={onPlayGame}
            accent={ageGroup.color}
            accentDark={ageGroup.colorDark}
            language={language}
            themeColors={themeColors}
          />
        ))}
      </div>
    </div>
  );
}
