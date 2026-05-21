import React, { useState, useCallback } from 'react';
import { ChevronDown, ChevronRight, Lock, Play } from 'lucide-react';
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
        <div style={{ padding: '0.5rem 0.75rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', backgroundColor: '#f9fafb', marginTop: '0.5rem', borderRadius: '0 0 16px 16px' }}>
          <style>{`
            .game-button-${pillar.id} {
              display: flex;
              align-items: center;
              gap: 0.75rem;
              padding: 1rem 1rem;
              border: none;
              border-radius: 12px;
              font-weight: 700;
              font-size: 0.95rem;
              text-align: left;
              font-family: var(--font-body);
              transition: transform 0.12s ease, box-shadow 0.12s ease;
              will-change: transform, box-shadow;
              contain: layout style;
            }

            .game-button-${pillar.id}.complete {
              background: linear-gradient(135deg, ${colors.main}, ${colors.dark});
              color: #fff;
              box-shadow: 0 6px 0 ${colors.shadow};
              cursor: pointer;
            }

            .game-button-${pillar.id}.complete:hover {
              transform: translateY(-2px);
              box-shadow: 0 8px 0 ${colors.shadow};
            }

            .game-button-${pillar.id}.complete:active {
              transform: translateY(4px);
              box-shadow: 0 2px 0 ${colors.shadow};
            }

            .game-button-${pillar.id}.disabled {
              background: #E5E7EB;
              color: #9CA3AF;
              cursor: not-allowed;
              box-shadow: none;
            }

            .game-button-${pillar.id} .game-label {
              flex: 1;
            }

            .game-button-${pillar.id} .game-status {
              font-size: 0.75rem;
              font-weight: 800;
              letter-spacing: 0.05em;
            }

            .game-button-${pillar.id}.complete .game-status {
              opacity: 0.95;
            }

            .game-button-${pillar.id}.disabled .game-status {
              opacity: 0.7;
            }
          `}</style>
          {games.map(game => {
            const isComplete = game.status === 'complete';
            return (
              <button
                key={game.id}
                className={`game-button-${pillar.id} ${isComplete ? 'complete' : 'disabled'}`}
                disabled={!isComplete}
                onClick={() => isComplete && onPlayGame(game.id)}
                onMouseEnter={isComplete ? playHoverSound : undefined}
              >
                {isComplete ? <Play size={18} fill="#fff" /> : <Lock size={18} />}
                <span className="game-label">{game.name}</span>
                <span className="game-status">
                  {isComplete
                    ? (language === 'bm' ? 'MAIN' : 'PLAY')
                    : (language === 'bm' ? 'KUNCI' : 'LOCKED')}
                </span>
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
          background: `linear-gradient(135deg, ${theme ? theme.primary : ageGroup.color}, ${theme ? theme.dark : ageGroup.colorDark})`,
          borderRadius: '24px', padding: '1.5rem 1.25rem',
          color: '#fff', marginBottom: '1.5rem',
          boxShadow: `0 6px 0 ${theme ? theme.dark : ageGroup.colorDark}`,
          display: 'flex', alignItems: 'center', gap: '1rem',
        }}>
          <span style={{ fontSize: '3rem', lineHeight: 1 }}>{ageGroup.emoji}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, opacity: 0.9, letterSpacing: '0.08em' }}>
              {(ageGroup.subtitle[language] || ageGroup.subtitle.bm).toUpperCase()}
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, fontFamily: 'var(--font-heading)', lineHeight: 1.2, margin: '2px 0' }}>
              {ageGroup.title[language] || ageGroup.title.bm}
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, opacity: 0.95 }}>
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
