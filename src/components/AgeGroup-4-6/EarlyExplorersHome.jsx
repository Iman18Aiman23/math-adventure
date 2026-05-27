import React, { useRef, useCallback } from 'react';
import { CURRICULUM } from '../../data/ageCurriculum';
import { playHoverSound } from '../../utils/soundManager';
import PageLayout from '../PageLayout';
import '../SpeakingPage/BMPage.css';

// Import SVG icons
import AlphabetSafariSvg from '../icons/EarlyExplorersHome/AlphabetSafari.svg';
import LetterTraceSvg from '../icons/EarlyExplorersHome/LetterTrace.svg';
import PhonicsPopSvg from '../icons/EarlyExplorersHome/PhoneticsPop.svg';
import SoundMatchingSvg from '../icons/EarlyExplorersHome/SoundMatching.svg';
import LetterSoundPuzzleSvg from '../icons/EarlyExplorersHome/LetterSoundPuzzle.svg';
import PhonicsSprintSvg from '../icons/EarlyExplorersHome/PhoneticsSprint.svg';

const SVG_MAP = {
  'alphabet-safari':    AlphabetSafariSvg,
  'letter-trace':       LetterTraceSvg,
  'phonics-pop':        PhonicsPopSvg,
  'sound-matching':     SoundMatchingSvg,
  'letter-sound-puzzle':LetterSoundPuzzleSvg,
  'phonics-sprint':     PhonicsSprintSvg,
};

const CAT_MAP = {
  'alphabet-safari':    'cat-objects',
  'letter-trace':       'cat-kvk',
  'phonics-pop':        'cat-phonics',
  'sound-matching':     'cat-kv',
  'letter-sound-puzzle':'cat-numbers',
  'phonics-sprint':     'cat-kv',
};

export default function EarlyExplorersHome(props) {
  const { onBack, onPlayGame, language = 'bm' } = props;
  const curriculum = CURRICULUM['age-4-6'];

  // Get all games from all pillars
  const allGames = [];
  ['reading', 'speaking', 'jawi', 'math'].forEach(pillarId => {
    if (curriculum[pillarId] && Array.isArray(curriculum[pillarId])) {
      allGames.push(...curriculum[pillarId]);
    }
  });

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
      <style>{`
        /* Add specific styling for the 6th tile animation delay */
        .bp-icon-card:nth-child(6) { animation-delay: .4s; }
      `}</style>
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
        {allGames.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            className={CAT_MAP[game.id]}
            onPlay={() => onPlayGame(game.id)}
          />
        ))}
      </PageLayout>
    </>
  );
}

const GameCard = React.memo(function GameCard({ game, className, onPlay }) {
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
        src={SVG_MAP[game.id]}
        alt={game.name}
        draggable={false}
        style={{ width: '100%', height: 'auto', display: 'block', pointerEvents: 'none' }}
      />
    </button>
  );
});
