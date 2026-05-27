import React, { useRef, useCallback } from 'react';
import { CURRICULUM } from '../../data/ageCurriculum';
import { playHoverSound } from '../../utils/soundManager';
import PageLayout from '../PageLayout';
import '../SpeakingPage/BMPage.css';

export default function Grade2DiscoverersHome(props) {
  const { onBack, onPlayGame, language = 'bm' } = props;
  const curriculum = CURRICULUM['age-8'];

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
        ? 'Temui dan pelajari imbuhan, darab, wang, dan kala melalui penemuan!'
        : 'Discover and learn affixes, multiplication, money, and tenses!'}
      <span aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#1CB0F6">
          <path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/>
        </svg>
      </span>
    </>
  );

  const hintContent = (
    <>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#1CB0F6"><path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>
      {language === 'bm' ? 'Siap untuk penemuan baru?' : 'Ready for new discoveries?'}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF3D8B"><path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>
    </>
  );

  const additionalSection = (
    <div className="bm-howto">
      <div className="bm-howto-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFB300" aria-hidden="true">
          <path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/>
        </svg>
        {language === 'bm' ? 'Panduan Penemuan' : 'Discovery Guide'}
      </div>
      <div className="bm-howto-steps">
        <div className="bm-howto-step">
          <span className="bm-step-num" style={{ background: 'linear-gradient(180deg, #4DD0E1, #0097A7)', boxShadow: '0 3px 0 #006064' }}>1</span>
          <span>{language === 'bm' ? 'Jelajahi konsep baru yang menarik.' : 'Explore exciting new concepts.'}</span>
        </div>
        <div className="bm-howto-step">
          <span className="bm-step-num" style={{ background: 'linear-gradient(180deg, #4DD0E1, #0097A7)', boxShadow: '0 3px 0 #006064' }}>2</span>
          <span>{language === 'bm' ? 'Praktik dengan soalan-soalan interaktif.' : 'Practice with interactive questions.'}</span>
        </div>
        <div className="bm-howto-step">
          <span className="bm-step-num" style={{ background: 'linear-gradient(180deg, #4DD0E1, #0097A7)', boxShadow: '0 3px 0 #006064' }}>3</span>
          <span>{language === 'bm' ? 'Kuasai kemahiran baru dan buka kunci pencapaian!' : 'Master new skills and unlock achievements!'}</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        .coming-soon-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem 1.5rem;
          text-align: center;
        }

        .coming-soon-icon {
          font-size: 4rem;
          margin-bottom: 1.5rem;
        }

        .coming-soon-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #F1F5F9;
        }

        .coming-soon-text {
          font-size: 1rem;
          color: rgba(241, 245, 249, 0.8);
          margin-bottom: 2rem;
          max-width: 400px;
        }
      `}</style>
      <PageLayout
        classPrefix="bp"
        heroIcon={<span style={{ fontSize: '4.5rem', lineHeight: 1 }}>🔭</span>}
        heroTitle={language === 'bm' ? 'Penjelajah Gred 2' : 'Grade 2 Discoverers'}
        heroSubtitle={heroSubtitle}
        sectionLabel={language === 'bm' ? 'Pilih Permainan' : 'Choose Game'}
        hintText={hintContent}
        onBack={onBack}
        additionalSection={additionalSection}
      >
        {allGames.length > 0 ? (
          allGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onPlay={() => onPlayGame(game.id)}
            />
          ))
        ) : (
          <div className="coming-soon-container">
            <div className="coming-soon-icon">🎮</div>
            <div className="coming-soon-title">
              {language === 'bm' ? 'Permainan Akan Datang' : 'Games Coming Soon'}
            </div>
            <div className="coming-soon-text">
              {language === 'bm'
                ? 'Permainan baru sedang dikembangkan untuk tahap anda. Ikuti perkembangan terbaru!'
                : 'New games are being developed for your level. Stay tuned for updates!'}
            </div>
          </div>
        )}
      </PageLayout>
    </>
  );
}

const GameCard = React.memo(function GameCard({ game, onPlay }) {
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
      type="button"
      style={{
        background: game.cardColor,
        boxShadow: `0 4px 0 ${game.cardDark}`,
        padding: '1rem 0.75rem',
        borderRadius: '14px',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        width: '100%',
        minHeight: '100px',
        color: 'white',
        textAlign: 'center',
        boxSizing: 'border-box',
        transition: 'transform 0.15s, box-shadow 0.15s',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <span style={{ fontSize: '2rem', lineHeight: 1 }}>{game.emoji}</span>
      <span style={{
        fontWeight: 700,
        fontSize: 'clamp(0.7rem, 2.5vw, 0.9rem)',
        lineHeight: 1.25,
        overflowWrap: 'break-word',
        wordBreak: 'break-word',
        maxWidth: '100%',
      }}>
        {game.name}
      </span>
    </button>
  );
});
