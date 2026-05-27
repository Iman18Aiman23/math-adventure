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
      <span style={{ display: 'inline-block', background: 'rgba(255,150,0,0.15)', color: '#FF9600', fontSize: '0.7rem', padding: '0.18rem 0.6rem', borderRadius: '999px', fontWeight: 800, border: '1.5px solid rgba(255,150,0,0.45)', marginRight: '0.4rem', verticalAlign: 'middle', letterSpacing: '0.03em' }}>
        KSSR 10/21
      </span>
      {language === 'bm'
        ? 'Menguasai ayat, suku kata, dan jenis kata menerusi petualangan!'
        : 'Master sentences, syllables, and word types through adventures!'}
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
    <>
      {/* ── KSSR Curriculum card ─────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, #FF9600 0%, #FF6B35 100%)',
        borderRadius: '16px',
        padding: '1.1rem 1.25rem',
        marginBottom: '1rem',
        color: 'white',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginBottom: '0.65rem' }}>
          <span style={{ fontSize: '1.25rem', lineHeight: 1, flexShrink: 0 }}>📋</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: '0.92rem', lineHeight: 1.25 }}>
              {language === 'bm' ? 'Berdasarkan Kurikulum KSSR' : 'Based on KSSR Curriculum'}
            </div>
            <div style={{ fontSize: '0.75rem', opacity: 0.88, marginTop: '0.15rem', lineHeight: 1.4 }}>
              {language === 'bm'
                ? 'Merangkumi 10 daripada 21 objektif BM Tahun 1 KSSR'
                : 'Covers 10 of 21 Year 1 BM objectives in KSSR'}
            </div>
          </div>
          <span style={{ flexShrink: 0, background: 'rgba(255,255,255,0.25)', borderRadius: '8px', padding: '0.2rem 0.55rem', fontSize: '0.72rem', fontWeight: 800, whiteSpace: 'nowrap', letterSpacing: '0.03em' }}>
            10/21 Obj.
          </span>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.3)', margin: '0 0 0.65rem' }} />

        {/* BM Reading games with objectives */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '0.65rem' }}>
          {[
            { emoji: '📝', name: language === 'bm' ? 'Bina Ayat'           : 'Sentence Builder',        obj: language === 'bm' ? 'Obj. 8, 21 — Membina ayat penyata'              : 'Obj. 8, 21 — Build simple sentences'        },
            { emoji: '🔤', name: language === 'bm' ? 'Suku Kata'           : 'Syllable Builder',        obj: language === 'bm' ? 'Obj. 1, 4, 7 — Suku kata & membaca'             : 'Obj. 1, 4, 7 — Syllables & reading'         },
            { emoji: '🔍', name: language === 'bm' ? 'Jenis Kata'          : 'Word Types',              obj: language === 'bm' ? 'Obj. 16, 17 — Kata nama, kerja & adjektif'      : 'Obj. 16, 17 — Nouns, verbs & adjectives'    },
            { emoji: '❓', name: language === 'bm' ? 'Kata Tanya'          : 'Question Words',          obj: language === 'bm' ? 'Obj. 2 — Siapa, Apa, Di mana, Bila, Mengapa'    : 'Obj. 2 — Who, What, Where, When, Why'       },
            { emoji: '🔗', name: language === 'bm' ? 'Kata Hubung & Sendi' : 'Connectors & Prepositions', obj: language === 'bm' ? 'Obj. 18 — dan, tetapi, atau, di, ke, dari'   : 'Obj. 18 — and, but, or, at, to, from'       },
            { emoji: '🔠', name: language === 'bm' ? 'Kata Imbuhan'        : 'Word Prefixes',           obj: language === 'bm' ? 'Obj. 19 — Awalan ber-, me-'                     : 'Obj. 19 — Prefixes ber-, me-'               },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.15)', borderRadius: '10px', padding: '0.45rem 0.75rem' }}>
              <span style={{ fontSize: '1rem', flexShrink: 0 }}>{item.emoji}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontWeight: 700, fontSize: '0.82rem' }}>{item.name}</span>
                <span style={{ fontSize: '0.72rem', opacity: 0.88, display: 'block', marginTop: '0.05rem' }}>{item.obj}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.3)', margin: '0 0 0.65rem' }} />

        {/* Math note */}
        <div style={{ fontSize: '0.75rem', opacity: 0.88, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span>🔢</span>
          {language === 'bm'
            ? 'Matematik: Masa, Wang & Cerita Penolakan — Matematik Tahun 1 KSSR'
            : 'Maths: Time, Money & Subtraction — Year 1 KSSR Mathematics'}
        </div>
      </div>

      {/* ── How to Play ──────────────────────────────────────────────────── */}
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
            <span>{language === 'bm' ? 'Pilih permainan dan tekan untuk memulakan.' : 'Pick a game and tap to start.'}</span>
          </div>
          <div className="bm-howto-step">
            <span className="bm-step-num" style={{ background: 'linear-gradient(180deg, #FFD699, #FFA502)', boxShadow: '0 3px 0 #E67E22' }}>2</span>
            <span>{language === 'bm' ? 'Jawab soalan dan dengar sebutan yang betul.' : 'Answer questions and hear the correct pronunciation.'}</span>
          </div>
          <div className="bm-howto-step">
            <span className="bm-step-num" style={{ background: 'linear-gradient(180deg, #FFD699, #FFA502)', boxShadow: '0 3px 0 #E67E22' }}>3</span>
            <span>{language === 'bm' ? 'Kumpul markah dan tamatkan semua permainan!' : 'Collect your score and complete all games!'}</span>
          </div>
        </div>
      </div>
    </>
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
