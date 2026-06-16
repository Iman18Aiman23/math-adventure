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
import KssrQnA from '../KssrQnA';

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

// ── Prasekolah (Tadika) QnA data ─────────────────────────────────────────────
const QNA = [
  {
    q:    { bm: 'Apa yang dipelajari dalam pillar Membaca?', eng: 'What does the Reading pillar cover?' },
    intro:{ bm: '7 permainan mengenal huruf, bunyi fonik dan susunan abjad:', eng: '7 games for letters, phonics sounds and alphabet order:' },
    items:[
      { bm: 'Belajar A–Z — Mengenal dan menyebut huruf A hingga Z',        eng: 'Learn A–Z — Recognise and say letters A to Z' },
      { bm: 'Alphabet Safari — Mengecam huruf melalui permainan mencari',   eng: 'Alphabet Safari — Spot letters through a finding game' },
      { bm: 'Letter Trace — Menyurih bentuk huruf dengan betul',            eng: 'Letter Trace — Trace letter shapes correctly' },
      { bm: 'Phonics Pop — Mengenal bunyi fonik setiap huruf',              eng: 'Phonics Pop — Learn the phonics sound of each letter' },
      { bm: 'Sound Matching — Memadankan bunyi dengan huruf',               eng: 'Sound Matching — Match sounds to letters' },
      { bm: 'Letter-Sound Puzzle — Menyambung huruf dengan bunyinya',       eng: 'Letter-Sound Puzzle — Connect letters with their sounds' },
      { bm: 'Alphabet Express — Menyusun huruf mengikut urutan abjad',      eng: 'Alphabet Express — Arrange letters in alphabet order' },
    ],
  },
  {
    q:    { bm: 'Apa yang dipelajari dalam pillar Bertutur?', eng: 'What does the Speaking pillar cover?' },
    intro:{ bm: '3 permainan lisan untuk menyebut huruf, perkataan dan nombor:', eng: '3 oral games for saying letters, words and numbers:' },
    items:[
      { bm: 'Sebut Huruf — Menyebut huruf dengan sebutan yang jelas',  eng: 'Say Letters — Say letters with clear pronunciation' },
      { bm: 'Sebut Perkataan — Menyebut perkataan mudah',              eng: 'Say Words — Pronounce simple words' },
      { bm: 'Sebut Nombor — Menyebut nombor 1 hingga 10',              eng: 'Say Numbers — Say numbers 1 to 10' },
    ],
  },
  {
    q:    { bm: 'Apa yang dipelajari dalam pillar Tulisan Jawi?', eng: 'What does the Jawi Script pillar cover?' },
    intro:{ bm: '2 permainan mengenal huruf jawi asas:', eng: '2 games introducing basic Jawi letters:' },
    items:[
      { bm: 'Belajar Huruf Jawi — Mengenal huruf jawi asas',     eng: 'Learn Jawi Letters — Recognise basic Jawi letters' },
      { bm: 'Padan Huruf Jawi — Memadankan huruf jawi yang sama', eng: 'Match Jawi Letters — Match identical Jawi letters' },
    ],
  },
  {
    q:    { bm: 'Apa yang dipelajari dalam pillar Matematik?', eng: 'What does the Mathematics pillar cover?' },
    intro:{ bm: '6 permainan mengenal nombor, membilang dan bentuk:', eng: '6 games for numbers, counting and shapes:' },
    items:[
      { bm: 'Belajar 1–20 — Mengenal dan menyebut nombor 1 hingga 20',     eng: 'Learn 1–20 — Recognise and say numbers 1 to 20' },
      { bm: 'Kira Bintang — Membilang objek',                              eng: 'Count Stars — Count objects' },
      { bm: 'Isih Bentuk — Mengenal dan mengisih bentuk asas',             eng: 'Sort Shapes — Recognise and sort basic shapes' },
      { bm: 'Padankan Nombor — Memadankan nombor dengan kuantiti',         eng: 'Match Numbers — Match numbers to quantities' },
      { bm: 'Tambah Buah — Pengenalan konsep tambah secara visual',        eng: 'Add Fruit — Visual introduction to addition' },
      { bm: 'Nombor Hilang — Mengenal pasti nombor tertinggal dalam urutan', eng: 'Missing Number — Find the missing number in a sequence' },
    ],
  },
];

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

  const additionalSection = (
    <>
      <div className="bp-section-label" style={{ marginTop: '2.5rem', marginBottom: '1.25rem' }}>FAQ</div>
      <KssrQnA
        qna={QNA}
        language={language}
        title={language === 'bm' ? 'Berdasarkan Kurikulum Prasekolah' : 'Based on Preschool Curriculum'}
        gradient="linear-gradient(135deg, #58CC02 0%, #46A302 100%)"
        badges={language === 'bm' ? ['Prasekolah', 'Umur 4–6'] : ['Preschool', 'Age 4–6']}
      />
    </>
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
        hintText={null}
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
