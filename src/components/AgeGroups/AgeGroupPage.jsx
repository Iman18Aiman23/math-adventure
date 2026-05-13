import React, { useState, useCallback } from 'react';
import { ChevronDown, ChevronRight, Lock, Play } from 'lucide-react';
import { playHoverSound } from '../../utils/soundManager';
import { useGameStateContext } from '../../App';
import AppHeader from '../AppHeader';
import { getAgeGroup, PILLARS, CURRICULUM } from '../../data/ageCurriculum';

const PillarBlock = React.memo(function PillarBlock({
  pillar, games, expanded, onToggle, onPlayGame, accent, accentDark, language,
}) {
  const hasGames = Array.isArray(games) && games.length > 0;
  const completeCount = hasGames ? games.filter(g => g.status === 'complete').length : 0;
  const totalCount = hasGames ? games.length : 0;

  return (
    <div style={{ background: '#fff', border: '2px solid #E5E5E5', borderRadius: '20px', overflow: 'hidden', marginBottom: '0.75rem' }}>
      <button
        onClick={onToggle}
        onMouseEnter={playHoverSound}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
          padding: '1rem 1.25rem', background: 'transparent', border: 'none',
          cursor: 'pointer', textAlign: 'left',
        }}
      >
        <span style={{ fontSize: '2rem', lineHeight: 1 }}>{pillar.emoji}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 900, color: 'var(--text-primary)', fontSize: '1.05rem', fontFamily: 'var(--font-heading)' }}>
            {pillar.label[language] || pillar.label.bm}
          </div>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: hasGames ? accentDark : 'var(--text-light)' }}>
            {hasGames
              ? `${completeCount} / ${totalCount} ${language === 'bm' ? 'siap' : 'ready'}`
              : (language === 'bm' ? 'Segera hadir' : 'Coming soon')}
          </div>
        </div>
        {hasGames
          ? (expanded ? <ChevronDown size={22} color={accent} /> : <ChevronRight size={22} color={accent} />)
          : <Lock size={20} color="var(--text-light)" />}
      </button>

      {expanded && hasGames && (
        <div style={{ padding: '0 1rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {games.map(game => {
            const isComplete = game.status === 'complete';
            return (
              <button
                key={game.id}
                disabled={!isComplete}
                onClick={() => isComplete && onPlayGame(game.id)}
                onMouseEnter={isComplete ? playHoverSound : undefined}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.85rem 1rem',
                  background: isComplete ? accent : '#F4F4F4',
                  color: isComplete ? '#fff' : 'var(--text-light)',
                  border: 'none', borderRadius: '14px',
                  boxShadow: isComplete ? `0 4px 0 ${accentDark}` : 'none',
                  cursor: isComplete ? 'pointer' : 'not-allowed',
                  fontWeight: 800, fontSize: '0.95rem', textAlign: 'left',
                  fontFamily: 'var(--font-body)',
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
