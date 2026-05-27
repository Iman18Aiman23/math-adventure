import React, { useRef, useCallback } from 'react';
import { CURRICULUM } from '../../data/ageCurriculum';
import { playHoverSound } from '../../utils/soundManager';
import PageLayout from '../PageLayout';
import '../SpeakingPage/BMPage.css';

export default function Grade1AdventurersHome(props) {
  const { onBack, onPlayGame, language = 'bm' } = props;
  const curriculum = CURRICULUM['age-7'];

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
        ? 'Menguasai ayat ringkas, tatabahasa, dan penolakan menerusi petualangan!'
        : 'Master simple sentences, grammar, and subtraction through adventures!'}
      <span aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#FF9600">
          <path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/>
        </svg>
      </span>
    </>
  );

  const hintContent = (
    <>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF9600"><path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>
      {language === 'bm' ? 'Pemain baru? Mari mula petualangan anda!' : 'New player? Let\'s start your adventure!'}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF3D8B"><path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>
    </>
  );

  const additionalSection = (
    <div className="bm-howto">
      <div className="bm-howto-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFB300" aria-hidden="true">
          <path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/>
        </svg>
        {language === 'bm' ? 'Cara Bermain' : 'How to Play'}
      </div>
      <div className="bm-howto-steps">
        <div className="bm-howto-step">
          <span className="bm-step-num" style={{ background: 'linear-gradient(180deg, #FFD699, #FFA502)', boxShadow: '0 3px 0 #E67E22' }}>1</span>
          <span>{language === 'bm' ? 'Pilih tingkat kesukaran yang sesuai.' : 'Choose your difficulty level.'}</span>
        </div>
        <div className="bm-howto-step">
          <span className="bm-step-num" style={{ background: 'linear-gradient(180deg, #FFD699, #FFA502)', boxShadow: '0 3px 0 #E67E22' }}>2</span>
          <span>{language === 'bm' ? 'Selesaikan tugas dan pelajari tatabahasa.' : 'Complete tasks and learn grammar.'}</span>
        </div>
        <div className="bm-howto-step">
          <span className="bm-step-num" style={{ background: 'linear-gradient(180deg, #FFD699, #FFA502)', boxShadow: '0 3px 0 #E67E22' }}>3</span>
          <span>{language === 'bm' ? 'Dapatkan lencana dan naik ke tahap berikutnya!' : 'Earn badges and advance to the next level!'}</span>
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
        heroIcon={<span style={{ fontSize: '4.5rem', lineHeight: 1 }}>🧭</span>}
        heroTitle={language === 'bm' ? 'Pelawat Gred 1' : 'Grade 1 Adventurers'}
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
      className="bp-icon-card"
      type="button"
      style={{
        background: game.cardColor,
        padding: '1.5rem',
        borderRadius: '16px',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100px',
        fontSize: '2rem',
      }}
    >
      <span>{game.emoji}</span>
      <span style={{ marginLeft: '1rem', fontWeight: 600 }}>{game.name}</span>
    </button>
  );
});
