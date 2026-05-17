import React, { useState, useCallback } from 'react';
import { ChevronDown, ChevronRight, Lock, Play } from 'lucide-react';
import { playHoverSound } from '../../utils/soundManager';
import { useGameStateContext } from '../../App';
import AppHeader from '../AppHeader';
import { getAgeGroup, PILLARS, CURRICULUM } from '../../data/ageCurriculum';

// Color map for each pillar with interactive shades
const PILLAR_COLORS = {
  reading: { main: '#EF4444', light: '#FCA5A5', dark: '#7F1D1D', shadow: '#4B0000' },
  speaking: { main: '#0D9488', light: '#7EE8D6', dark: '#115E59', shadow: '#0D3D3A' },
  jawi: { main: '#D97706', light: '#FED7AA', dark: '#92400E', shadow: '#54210E' },
  math: { main: '#10B981', light: '#A7F3D0', dark: '#065F46', shadow: '#022C1F' },
};

const PillarBlock = React.memo(function PillarBlock({
  pillar, games, expanded, onToggle, onPlayGame, accent, accentDark, language,
}) {
  const hasGames = Array.isArray(games) && games.length > 0;
  const completeCount = hasGames ? games.filter(g => g.status === 'complete').length : 0;
  const totalCount = hasGames ? games.length : 0;
  const colors = PILLAR_COLORS[pillar.id] || PILLAR_COLORS.reading;
  const [isPressed, setIsPressed] = React.useState(false);

  return (
    <div style={{ margin: '1rem 0', position: 'relative' }}>
      <style>{`
        .pillar-button-${pillar.id} {
          position: relative;
          display: block;
          width: 100%;
          padding: 1.25rem 1.25rem;
          background: linear-gradient(135deg, ${colors.main} 0%, ${colors.dark} 100%);
          color: white;
          border: none;
          border-radius: 16px;
          cursor: pointer;
          font-family: 'Helvetica Neue', sans-serif;
          font-weight: 800;
          text-align: left;
          transition: all 0.15s ease;
          box-shadow:
            inset 0 2px 0 ${colors.light},
            0 12px 0 ${colors.shadow},
            0 0 0 4px rgba(0,0,0,0.05);
          transform: translateY(0);
        }

        .pillar-button-${pillar.id}:hover:not(:disabled) {
          filter: brightness(1.08);
          box-shadow:
            inset 0 2px 0 ${colors.light},
            0 15px 0 ${colors.shadow},
            0 0 0 4px rgba(0,0,0,0.08);
          transform: translateY(-2px);
        }

        .pillar-button-${pillar.id}:active:not(:disabled) {
          transform: translateY(10px);
          box-shadow:
            inset 0 2px 0 ${colors.light},
            inset 0 -4px 0 ${colors.dark},
            0 0 0 4px rgba(0,0,0,0.05);
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
        <span style={{ fontSize: '2.5rem', lineHeight: 1, flexShrink: 0 }}>{pillar.emoji}</span>
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
          {games.map(game => {
            const isComplete = game.status === 'complete';
            return (
              <button
                key={game.id}
                disabled={!isComplete}
                onClick={() => isComplete && onPlayGame(game.id)}
                onMouseEnter={isComplete ? playHoverSound : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem 1rem',
                  background: isComplete ? `linear-gradient(135deg, ${colors.main}, ${colors.dark})` : '#E5E7EB',
                  color: isComplete ? '#fff' : '#9CA3AF',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: isComplete ? `0 6px 0 ${colors.shadow}` : 'none',
                  cursor: isComplete ? 'pointer' : 'not-allowed',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  textAlign: 'left',
                  fontFamily: 'var(--font-body)',
                  transition: 'all 0.15s ease',
                  transform: 'translateY(0)',
                }}
                onMouseDown={(e) => {
                  if (isComplete) {
                    e.currentTarget.style.transform = 'translateY(4px)';
                    e.currentTarget.style.boxShadow = `0 2px 0 ${colors.shadow}`;
                  }
                }}
                onMouseUp={(e) => {
                  if (isComplete) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = `0 6px 0 ${colors.shadow}`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (isComplete) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = `0 6px 0 ${colors.shadow}`;
                  }
                }}
              >
                {isComplete ? <Play size={18} fill="#fff" /> : <Lock size={18} />}
                <span style={{ flex: 1 }}>{game.name}</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.05em', opacity: isComplete ? 0.95 : 0.7 }}>
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

export default function AgeGroupPage({ ageGroupId, onBack, onPlayGame, language = 'bm' }) {
  const gameState = useGameStateContext();
  const ageGroup = getAgeGroup(ageGroupId);
  const curriculum = CURRICULUM[ageGroupId] || {};

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
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: 'var(--bg-body)' }}>
      <AppHeader onBack={onBack} gameState={gameState} language={language} />

      <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1rem' }}>
        {/* Hero card */}
        <div style={{
          background: `linear-gradient(135deg, ${ageGroup.color}, ${ageGroup.colorDark})`,
          borderRadius: '24px', padding: '1.5rem 1.25rem',
          color: '#fff', marginBottom: '1.5rem',
          boxShadow: `0 6px 0 ${ageGroup.colorDark}`,
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
          />
        ))}
      </div>
    </div>
  );
}
