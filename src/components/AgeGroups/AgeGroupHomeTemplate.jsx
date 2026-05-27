import React, { useRef, useCallback } from 'react';
import { CURRICULUM } from '../../data/ageCurriculum';
import { playHoverSound } from '../../utils/soundManager';
import PageLayout from '../PageLayout';
import '../SpeakingPage/BMPage.css';

/**
 * Reusable template for age group home pages.
 * Each age group can extend this with its specific SVG icons and styling.
 *
 * @param {string} ageGroupId - The age group ID (e.g., 'age-4-6')
 * @param {Object} svgMap - Map of game IDs to SVG imports
 * @param {Object} catMap - Map of game IDs to CSS class names
 * @param {Object} config - Configuration object with strings and styling
 * @param {Object} config.heroIcon - React element for hero icon
 * @param {Object} config.heroTitle - { bm, eng } language-specific title
 * @param {Object} config.heroSubtitle - { bm, eng } language-specific subtitle
 * @param {Object} config.sectionLabel - { bm, eng } section label
 * @param {Object} config.hint - { bm, eng } hint text
 * @param {Array} config.howtoSteps - Array of step objects with { bm, eng } text
 * @param {Object} config.colors - Color scheme for "How to" steps { gradient1, gradient2, shadow }
 */
export function createAgeGroupHome({
  ageGroupId,
  svgMap,
  catMap,
  config,
}) {
  return function AgeGroupHome(props) {
    const { onBack, onPlayGame, language = 'bm' } = props;
    const curriculum = CURRICULUM[ageGroupId];

    // Get all games from all pillars
    const allGames = [];
    ['reading', 'speaking', 'jawi', 'math'].forEach(pillarId => {
      if (curriculum[pillarId] && Array.isArray(curriculum[pillarId])) {
        allGames.push(...curriculum[pillarId]);
      }
    });

    // Build hero subtitle with star icon
    const heroSubtitle = (
      <>
        {config.heroSubtitle[language]}
        <span aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill={config.colors.starColor || '#58CC02'}>
            <path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/>
          </svg>
        </span>
      </>
    );

    // Build hint content
    const hintContent = (
      <>
        <svg width="16" height="16" viewBox="0 0 24 24" fill={config.colors.starColor || '#58CC02'}>
          <path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/>
        </svg>
        {config.hint[language]}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF3D8B">
          <path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/>
        </svg>
      </>
    );

    // Build "How to" section
    const additionalSection = (
      <div className="bm-howto">
        <div className="bm-howto-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill={config.colors.titleIconColor || '#FFB300'} aria-hidden="true">
            <path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/>
          </svg>
          {config.howtoTitle[language]}
        </div>
        <div className="bm-howto-steps">
          {config.howtoSteps.map((step, idx) => (
            <div key={idx} className="bm-howto-step">
              <span
                className="bm-step-num"
                style={{
                  background: `linear-gradient(180deg, ${config.colors.gradient1}, ${config.colors.gradient2})`,
                  boxShadow: `0 3px 0 ${config.colors.shadow}`
                }}
              >
                {idx + 1}
              </span>
              <span>{step[language]}</span>
            </div>
          ))}
        </div>
      </div>
    );

    return (
      <>
        <style>{`
          /* Add specific styling for the 6th tile animation delay */
          .bp-icon-card:nth-child(6) { animation-delay: .4s; }
        `}</style>
        <PageLayout
          classPrefix="bp"
          heroIcon={config.heroIcon}
          heroTitle={config.heroTitle[language]}
          heroSubtitle={heroSubtitle}
          sectionLabel={config.sectionLabel[language]}
          hintText={hintContent}
          onBack={onBack}
          additionalSection={additionalSection}
        >
          {allGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              svgMap={svgMap}
              catMap={catMap}
              className={catMap[game.id]}
              onPlay={() => onPlayGame(game.id)}
            />
          ))}
        </PageLayout>
      </>
    );
  };
}

const GameCard = React.memo(function GameCard({ game, svgMap, catMap, className, onPlay }) {
  const soundPlayedRef = useRef(false);

  const handleMouseEnter = useCallback(() => {
    if (!soundPlayedRef.current) {
      soundPlayedRef.current = true;
      playHoverSound();
      setTimeout(() => { soundPlayedRef.current = false; }, 500);
    }
  }, []);

  return (
    <button
      onClick={onPlay}
      onMouseEnter={handleMouseEnter}
      className={`bp-icon-card ${className}`}
      type="button"
    >
      <img
        src={svgMap[game.id]}
        alt={game.name}
        draggable={false}
        style={{ width: '100%', height: 'auto', display: 'block', pointerEvents: 'none' }}
      />
    </button>
  );
});

export default createAgeGroupHome;
