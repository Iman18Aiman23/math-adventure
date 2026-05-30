import React, { useRef, useCallback } from 'react';
import { CURRICULUM } from '../../data/ageCurriculum';
import { playHoverSound } from '../../utils/soundManager';
import PageLayout from '../PageLayout';
import '../SpeakingPage/BMPage.css';
import {
  RobotDefs,
  RobotHeadTadikaReading,
  RobotHeadTadikaSpeaking,
  RobotHeadTadikaJawi,
  RobotHeadTadikaMath,
} from '../SubjectRobots';

// Shared robot-head template + per-game screen art (Membaca / Reading slice).
import { EEGameRobotDefs, EEGameRobot } from './EarlyExplorersRobots';
import { GAME_INNER } from './EarlyExplorersScreens';

// Pillar categories — order + display metadata for the grouped game grid.
// `color` drives the section header text + line and the game-card labels (soft
// near-black, so colour stays in the robot icons). `badge` is the one accent
// per pillar (the count chip), matching that pillar's robot-head colour.
const PILLAR_ORDER = ['reading', 'speaking', 'jawi', 'math'];
const PILLAR_META = {
  reading:  { bm: 'Membaca',      eng: 'Reading',     emoji: '📖', color: '#1F2937', badge: '#EE7E1E' },
  speaking: { bm: 'Bertutur',     eng: 'Speaking',    emoji: '🗣️', color: '#1F2937', badge: '#E5538C' },
  jawi:     { bm: 'Tulisan Jawi', eng: 'Jawi Script', emoji: '✍️', color: '#1F2937', badge: '#2A9A6C' },
  math:     { bm: 'Matematik',    eng: 'Mathematics', emoji: '🔢', color: '#1F2937', badge: '#7A55E0' },
};

// Tadika (age 4–6) pillar robot heads — shown next to each section heading.
// Flat + static (no filters / infinite animations), so 4 on one page = no lag.
const PILLAR_ROBOT = {
  reading:  RobotHeadTadikaReading,
  speaking: RobotHeadTadikaSpeaking,
  jawi:     RobotHeadTadikaJawi,
  math:     RobotHeadTadikaMath,
};

export default function EarlyExplorersHome(props) {
  const { onBack, onPlayGame, language = 'bm' } = props;
  const curriculum = CURRICULUM['age-4-6'];

  // Group games by pillar (only pillars that actually have games)
  const pillarSections = PILLAR_ORDER
    .map(id => ({ id, meta: PILLAR_META[id], games: curriculum[id] }))
    .filter(s => Array.isArray(s.games) && s.games.length > 0);

  const heroSubtitle = (
    <>
      {language === 'bm'
        ? 'Kuasai abjad, sebutan, dan bunyi menerusi permainan teroka awal!'
        : 'Master letters, sounds, and spelling through play!'}
      <span aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#58CC02">
          <path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/>
        </svg>
      </span>
    </>
  );

  const hintContent = (
    <>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#58CC02"><path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>
      {language === 'bm' ? 'Pilih permainan untuk mula belajar!' : 'Pick a game to start learning!'}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF3D8B"><path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>
    </>
  );

  const additionalSection = (
    <div className="bm-howto">
      <div className="bm-howto-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFB300" aria-hidden="true">
          <path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/>
        </svg>
        {language === 'bm' ? 'Cara Meneroka' : 'How to Explore'}
      </div>
      <div className="bm-howto-steps">
        <div className="bm-howto-step">
          <span className="bm-step-num" style={{ background: 'linear-gradient(180deg, #A8F080, #58CC02)', boxShadow: '0 3px 0 #388E3C' }}>1</span>
          <span>{language === 'bm' ? 'Pilih permainan abjad pilihan anda.' : 'Select a game to start learning.'}</span>
        </div>
        <div className="bm-howto-step">
          <span className="bm-step-num" style={{ background: 'linear-gradient(180deg, #A8F080, #58CC02)', boxShadow: '0 3px 0 #388E3C' }}>2</span>
          <span>{language === 'bm' ? 'Main, dengar bunyi fonik, dan ikut arahan.' : 'Play, listen to phonics, and interact.'}</span>
        </div>
        <div className="bm-howto-step">
          <span className="bm-step-num" style={{ background: 'linear-gradient(180deg, #A8F080, #58CC02)', boxShadow: '0 3px 0 #388E3C' }}>3</span>
          <span>{language === 'bm' ? 'Kumpul markah bintang dan teruskan belajar!' : 'Collect star points and level up!'}</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Shared SVG gradients/symbols for the pillar robot heads — rendered once. */}
      <RobotDefs />
      {/* Shared robot-head frame + screen clip for the game-card icons — rendered once. */}
      <EEGameRobotDefs />
      <PageLayout
        classPrefix="bp"
        heroIcon={<span style={{ fontSize: '4.5rem', lineHeight: 1 }}>🌱</span>}
        heroTitle={language === 'bm' ? 'Teroka Awal' : 'Early Explorers'}
        heroSubtitle={heroSubtitle}
        sectionLabel={language === 'bm' ? 'Pilih Permainan' : 'Choose Game'}
        hintText={hintContent}
        onBack={onBack}
        additionalSection={additionalSection}
      >
        {pillarSections.map(({ id, meta, games }) => {
          const Robot = PILLAR_ROBOT[id];
          return (
            <React.Fragment key={id}>
              <div
                style={{
                  gridColumn: '1 / -1',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginTop: '0.25rem',
                }}
              >
                {Robot
                  ? <Robot className="rbk-trigger" style={{ width: 92, height: 62, flexShrink: 0 }} aria-hidden="true" />
                  : <span style={{ fontSize: '1.3rem', lineHeight: 1 }}>{meta.emoji}</span>}
                <span style={{ fontWeight: 800, fontSize: '1.05rem', color: meta.color, whiteSpace: 'nowrap' }}>
                  {meta[language] || meta.bm}
                </span>
                <span style={{ flex: 1, height: '3px', background: `${meta.color}33`, borderRadius: '999px' }} />
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#fff', background: meta.badge || meta.color, borderRadius: '999px', padding: '2px 9px', lineHeight: 1.4 }}>
                  {games.length}
                </span>
              </div>
              {games.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  accent={meta.color}
                  frame={id}
                  inner={GAME_INNER[game.id]}
                  onPlay={() => onPlayGame(game.id)}
                />
              ))}
            </React.Fragment>
          );
        })}
      </PageLayout>
    </>
  );
}

const GameCard = React.memo(function GameCard({ game, accent, frame, inner, onPlay }) {
  const soundPlayedRef = useRef(false);

  const handleMouseEnter = useCallback(() => {
    if (!soundPlayedRef.current) {
      soundPlayedRef.current = true;
      playHoverSound();
      setTimeout(() => { soundPlayedRef.current = false; }, 500);
    }
  }, []);

  // Shared robot-head template + per-game screen art (+ real HTML label below).
  // Label colour is the pillar accent (standardized — every card in a pillar matches).
  if (inner) {
    return (
      <button
        onClick={onPlay}
        onMouseEnter={handleMouseEnter}
        className="ee-robot-card"
        type="button"
      >
        <span className="ee-robot-media">
          <EEGameRobot frame={frame}>{inner}</EEGameRobot>
        </span>
        {/* Real HTML label — translatable, screen-reader-readable, loaded font. */}
        <span className="ee-robot-label" style={{ color: accent }}>
          {game.name}
        </span>
      </button>
    );
  }

  // Fallback for pillars not yet templated: chunky emoji + label card.
  return (
    <button
      onClick={onPlay}
      onMouseEnter={handleMouseEnter}
      type="button"
      className="ee-game-card"
      style={{ '--card-bg': game.cardColor, '--card-bg-dark': game.cardDark }}
    >
      <span className="ee-game-emoji">{game.emoji}</span>
      <span className="ee-game-label">{game.name}</span>
    </button>
  );
});
