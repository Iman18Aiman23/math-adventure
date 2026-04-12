import React, { useContext } from 'react';
import { GameStateContext } from '../App';

const SAGA_LEVELS = [
  { id: 1,  op: 'add',      diff: 'easy',   icon: '➕', label: 'Easy Add',    section: 0 },
  { id: 2,  op: 'subtract', diff: 'easy',   icon: '➖', label: 'Easy Sub',    section: 0 },
  { id: 3,  op: 'add',      diff: 'medium', icon: '➕', label: 'Add +10',     section: 0 },
  { id: 4,  op: 'subtract', diff: 'medium', icon: '➖', label: 'Sub –10',     section: 1 },
  { id: 5,  op: 'multiply', diff: 'easy',   icon: '✖️', label: 'Times ×1–5', section: 1 },
  { id: 6,  op: 'divide',   diff: 'easy',   icon: '➗', label: 'Divide ÷1–5',section: 1 },
  { id: 7,  op: 'multiply', diff: 'medium', icon: '✖️', label: 'Times ×6–10',section: 2 },
  { id: 8,  op: 'random',   diff: 'easy',   icon: '🎲', label: 'Mixed Easy', section: 2 },
  { id: 9,  op: 'add',      diff: 'hard',   icon: '🔥', label: 'Hard Add',   section: 2 },
  { id: 10, op: 'subtract', diff: 'hard',   icon: '💪', label: 'Hard Sub',   section: 2 },
];

const SECTIONS = [
  { label: 'Section 1',  title: 'Addition Forest 🌲',     color: '#58CC02', dark: '#46A302' },
  { label: 'Section 2',  title: 'Subtraction Mountains 🏔️', color: '#1CB0F6', dark: '#0B8DC0' },
  { label: 'Section 3',  title: 'Multiplication Volcano 🌋', color: '#FF4B4B', dark: '#CC3B3B' },
];

// Desktop-only floating decorations (rendered via .saga-deco which is display:none on mobile)
const DECORATIONS = [
  { emoji: '☁️', top: '5%',  left: '8%',  delay: '0s',   size: '2.5rem' },
  { emoji: '☁️', top: '15%', right: '5%', delay: '2s',   size: '2rem' },
  { emoji: '🌲', top: '25%', left: '3%',  delay: '1s',   size: '2.2rem' },
  { emoji: '✨', top: '35%', right: '8%', delay: '3s',   size: '1.8rem' },
  { emoji: '🌳', top: '45%', left: '6%',  delay: '0.5s', size: '2rem' },
  { emoji: '☁️', top: '55%', right: '3%', delay: '1.5s', size: '2.5rem' },
  { emoji: '➕', top: '65%', left: '4%',  delay: '2.5s', size: '1.6rem' },
  { emoji: '✖️', top: '72%', right: '6%', delay: '0.8s', size: '1.6rem' },
  { emoji: '🌲', top: '82%', left: '7%',  delay: '3.5s', size: '2rem' },
  { emoji: '☁️', top: '90%', right: '4%', delay: '1.2s', size: '2.2rem' },
];

export default function SagaMap({ onSelectLevel }) {
  const gameState = useContext(GameStateContext);
  const userLevel = gameState?.level || 1;

  let lastSection = -1;

  return (
    <div className="saga-container" style={{ background: '#f7f7f7' }}>
      {/* Desktop floating decorations */}
      {DECORATIONS.map((deco, i) => (
        <div
          key={i}
          className="saga-deco"
          style={{
            top: deco.top,
            left: deco.left,
            right: deco.right,
            fontSize: deco.size,
            animationDelay: deco.delay,
          }}
        >
          {deco.emoji}
        </div>
      ))}

      <div style={{ paddingBottom: '8rem' }}>
        {SAGA_LEVELS.map((lvl) => {
          const isUnlocked  = userLevel >= lvl.id;
          const isCurrent   = userLevel === lvl.id;
          const isCompleted = userLevel > lvl.id;
          const isLocked    = !isUnlocked;

          const showBanner = lvl.section !== lastSection;
          if (showBanner) lastSection = lvl.section;
          const section = SECTIONS[lvl.section] || SECTIONS[0];

          return (
            <React.Fragment key={lvl.id}>
              {/* Unit Section Banner */}
              {showBanner && (
                <div className="duo-unit-banner" style={{ background: `linear-gradient(135deg, ${section.color}, ${section.dark})` }}>
                  <div className="duo-unit-banner-text">
                    <div className="duo-unit-banner-label">{section.label}</div>
                    <div className="duo-unit-banner-title">{section.title}</div>
                  </div>
                  <button className="duo-unit-banner-btn" onClick={() => isUnlocked && onSelectLevel(lvl.op, lvl.diff)}>
                    {isUnlocked ? 'Start ▶' : '🔒 Locked'}
                  </button>
                </div>
              )}

              {/* Node row with Z-pattern */}
              <div
                className={`saga-node-wrapper${isCurrent ? ' current' : ''}`}
                style={{ marginBottom: isCurrent ? '2.5rem' : '0' }}
              >
                <button
                  className={`saga-node${isLocked ? ' locked' : ''}${isCurrent ? ' current' : ''}${isCompleted ? ' completed' : ''}`}
                  onClick={() => isUnlocked && onSelectLevel(lvl.op, lvl.diff)}
                  disabled={isLocked}
                  style={isCompleted ? { background: '#FFC800', borderColor: '#CC9C00' } :
                         isLocked   ? {} :
                         isCurrent  ? { background: section.color, borderColor: section.dark } :
                         { background: section.color, borderColor: section.dark }}
                >
                  <span className="node-inner">
                    {isCompleted ? '⭐' : isLocked ? '🔒' : lvl.icon}
                  </span>
                </button>

                {/* START callout for current node */}
                {isCurrent && (
                  <button
                    className="saga-start-btn"
                    onClick={() => onSelectLevel(lvl.op, lvl.diff)}
                    style={{
                      position: 'absolute',
                      bottom: '-38px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: '#fff',
                      color: section.color,
                      border: `2px solid ${section.color}`,
                      borderRadius: '999px',
                      padding: '5px 18px',
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      whiteSpace: 'nowrap',
                      zIndex: 5,
                    }}
                  >
                    START
                  </button>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Floating owl mascot */}
      <div style={{ position: 'fixed', bottom: '80px', right: '12px', fontSize: '3rem', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))', animation: 'bounce 2s ease-in-out infinite', zIndex: 20, pointerEvents: 'none' }}>
        🦉
      </div>
    </div>
  );
}

