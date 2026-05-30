import React, { useRef, useCallback } from 'react';
import { CURRICULUM } from '../../data/ageCurriculum';
import { playHoverSound } from '../../utils/soundManager';
import PageLayout from '../PageLayout';
import '../SpeakingPage/BMPage.css';
import KssrQnA from '../KssrQnA';
// Shared robot-head card template (pillar-based frames, reused across ages).
import { EEGameRobotDefs, EEGameRobot } from '../AgeGroup-4-6/EarlyExplorersRobots';
import { GRADE3_GAME_INNER } from './Grade3Screens';

// Pillar categories — order + display metadata for the grouped game grid.
// `color` = soft near-black header text + labels; `badge` = per-pillar accent.
const PILLAR_ORDER = ['reading', 'speaking', 'jawi', 'math'];
const PILLAR_META = {
  reading:  { bm: 'Membaca',      eng: 'Reading',     emoji: '📖', color: '#1F2937', badge: '#EE7E1E' },
  speaking: { bm: 'Bertutur',     eng: 'Speaking',    emoji: '🗣️', color: '#1F2937', badge: '#E5538C' },
  jawi:     { bm: 'Tulisan Jawi', eng: 'Jawi Script', emoji: '✍️', color: '#1F2937', badge: '#2A9A6C' },
  math:     { bm: 'Matematik',    eng: 'Mathematics', emoji: '🔢', color: '#1F2937', badge: '#7A55E0' },
};

// ── KSSR Year 3 QnA data ──────────────────────────────────────────────────────
const QNA = [
  {
    q:    { bm: 'Apa yang dipelajari dalam pillar Membaca?', eng: 'What topics are covered in the Reading pillar?' },
    intro:{ bm: '5 permainan tatabahasa dan kefahaman Bahasa Melayu Tahun 3:',
            eng: '5 Year 3 Bahasa Melayu grammar and comprehension games:' },
    items:[
      { bm: 'Jenis Ayat — Mengenal ayat penyata, tanya, perintah dan seru',              eng: 'Sentence Types — Identify statement, question, command and exclamation sentences' },
      { bm: 'Penjodoh Bilangan — Menggunakan penjodoh bilangan yang betul',               eng: 'Measure Words — Use the correct numeral classifiers' },
      { bm: 'Imbuhan Lanjutan — Membentuk perkataan dengan imbuhan apitan dan akhiran',    eng: 'Advanced Affixes — Form words using circumfixes and suffixes' },
      { bm: 'Simpulan Bahasa & Perumpamaan — Memahami simpulan bahasa dan perumpamaan',    eng: 'Idioms & Similes — Understand Malay idioms and similes' },
      { bm: 'Bacaan Pemahaman Lanjutan — Memahami petikan yang lebih kompleks',            eng: 'Advanced Comprehension — Understand more complex passages' },
    ],
  },
];

export default function Grade3AchieversHome(props) {
  const { onBack, onPlayGame, language = 'bm' } = props;
  const curriculum = CURRICULUM['age-9'];

  // Group games by pillar (only pillars that actually have games)
  const pillarSections = PILLAR_ORDER
    .map(id => ({ id, meta: PILLAR_META[id], games: curriculum[id] }))
    .filter(s => Array.isArray(s.games) && s.games.length > 0);

  const heroSubtitle = (
    <>
      {language === 'bm'
        ? 'Kuasai tatabahasa lanjutan, tanda baca, pembahagian, dan pecahan!'
        : 'Master advanced grammar, punctuation, division, and fractions!'}
      <span aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#CE82FF">
          <path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/>
        </svg>
      </span>
    </>
  );

  const additionalSection = (
    <>
      <div className="bp-section-label" style={{ marginTop: '2.5rem', marginBottom: '1.25rem' }}>FAQ</div>
      <KssrQnA
        qna={QNA}
        language={language}
        gradient="linear-gradient(135deg, #AB47BC 0%, #6A1B9A 100%)"
        badges={language === 'bm' ? ['BM Tahun 3'] : ['BM Year 3']}
      />
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
        .coming-soon-icon { font-size: 4rem; margin-bottom: 1.5rem; }
        .coming-soon-title { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem; color: #F1F5F9; }
        .coming-soon-text { font-size: 1rem; color: rgba(241, 245, 249, 0.8); margin-bottom: 2rem; max-width: 400px; }
      `}</style>
      {/* Shared robot-head frame + screen clip for the game-card icons — rendered once. */}
      <EEGameRobotDefs />
      <PageLayout
        classPrefix="bp"
        heroIcon={<span style={{ fontSize: '4.5rem', lineHeight: 1 }}>🏆</span>}
        heroTitle={language === 'bm' ? 'Pencapaian Gred 3' : 'Grade 3 Achievers'}
        heroSubtitle={heroSubtitle}
        sectionLabel={language === 'bm' ? 'Pilih Permainan' : 'Choose Game'}
        hintText={null}
        onBack={onBack}
        additionalSection={additionalSection}
      >
        {pillarSections.length > 0 ? (
          pillarSections.map(({ id, meta, games }) => (
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
                <span style={{ fontSize: '1.3rem', lineHeight: 1 }}>{meta.emoji}</span>
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
                  inner={GRADE3_GAME_INNER[game.id]}
                  onPlay={() => onPlayGame(game.id)}
                />
              ))}
            </React.Fragment>
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

const GameCard = React.memo(function GameCard({ game, accent, frame, inner, onPlay }) {
  const soundPlayedRef = useRef(false);

  const handleMouseEnter = useCallback(() => {
    if (!soundPlayedRef.current) {
      soundPlayedRef.current = true;
      playHoverSound();
      setTimeout(() => { soundPlayedRef.current = false; }, 500);
    }
  }, []);

  // Shared robot-head template + per-game screen art (+ near-black label below).
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
        <span className="ee-robot-label" style={{ color: accent }}>
          {game.name}
        </span>
      </button>
    );
  }

  // Fallback for any game without screen art yet: chunky emoji + label card.
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
