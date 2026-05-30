import React, { useRef, useCallback } from 'react';
import { CURRICULUM } from '../../data/ageCurriculum';
import { playHoverSound } from '../../utils/soundManager';
import PageLayout from '../PageLayout';
import '../SpeakingPage/BMPage.css';
// Shared robot-head card template (pillar-based frames, reused across ages).
import { EEGameRobotDefs, EEGameRobot } from '../AgeGroup-4-6/EarlyExplorersRobots';
import { GRADE2_GAME_INNER } from './Grade2Screens';
import KssrQnA from '../KssrQnA';

// Pillar categories — order + display metadata for the grouped game grid.
// `color` = soft near-black header text + labels; `badge` = the one accent per
// pillar (count chip), matching that pillar's robot-head colour (homepage palette).
const PILLAR_ORDER = ['reading', 'speaking', 'jawi', 'math'];
const PILLAR_META = {
  reading:  { bm: 'Membaca',      eng: 'Reading',     emoji: '📖', color: '#1F2937', badge: '#EE7E1E' },
  speaking: { bm: 'Bertutur',     eng: 'Speaking',    emoji: '🗣️', color: '#1F2937', badge: '#E5538C' },
  jawi:     { bm: 'Tulisan Jawi', eng: 'Jawi Script', emoji: '✍️', color: '#1F2937', badge: '#2A9A6C' },
  math:     { bm: 'Matematik',    eng: 'Mathematics', emoji: '🔢', color: '#1F2937', badge: '#7A55E0' },
};

// ── KSSR Year 2 QnA data ──────────────────────────────────────────────────────
const QNA = [
  {
    q:    { bm: 'Apa yang dipelajari dalam pillar Membaca?', eng: 'What topics are covered in the Reading pillar?' },
    intro:{ bm: '5 permainan membina kemahiran membaca, kefahaman dan apresiasi sastera Tahun 2:',
            eng: '5 games building Year 2 reading, comprehension and literary appreciation skills:' },
    items:[
      { bm: 'Kosa Kata Kontekstual — Memahami makna perkataan mengikut konteks ayat', eng: 'Contextual Vocabulary — Understand word meanings from sentence context' },
      { bm: 'Bacaan Pemahaman — Membaca petikan dan menjawab soalan kefahaman',       eng: 'Reading Comprehension — Read passages and answer comprehension questions' },
      { bm: 'Cerita Bacaan — Membaca dan memahami cerita pendek',                      eng: 'Reading Stories — Read and understand short stories' },
      { bm: 'Pengenalan Nilai — Mengenal pasti nilai murni dalam bahan bacaan',        eng: 'Moral Values — Identify good values in reading material' },
      { bm: 'Pantun Bacaan — Membaca dan memahami pantun empat kerat',                 eng: 'Reading Pantun — Read and understand four-line Malay verses' },
    ],
  },
  {
    q:    { bm: 'Apa yang dipelajari dalam pillar Bertutur?', eng: 'What topics are covered in the Speaking pillar?' },
    intro:{ bm: '1 permainan lisan menggunakan teknologi pengecaman suara:',
            eng: '1 oral game using speech recognition technology:' },
    items:[
      { bm: 'Lafaz Pantun — Melafazkan pantun dengan sebutan dan intonasi yang betul', eng: 'Recite Pantun — Recite verses with correct pronunciation and intonation' },
    ],
  },
  {
    q:    { bm: 'Apa yang dipelajari dalam pillar Tulisan Jawi?', eng: 'What topics are covered in the Jawi Script pillar?' },
    intro:{ bm: '3 permainan berteraskan tulisan jawi Tahun 2:',
            eng: '3 games based on Year 2 Jawi script:' },
    items:[
      { bm: 'Baca Petikan Jawi — Membaca petikan pendek dalam tulisan jawi',           eng: 'Read Jawi Passage — Read short passages in Jawi script' },
      { bm: 'Padan Kata Kerja Jawi — Memadankan kata kerja jawi dengan maksud rumi',   eng: 'Match Jawi Verbs — Match Jawi verbs with their Roman-script meanings' },
      { bm: 'Susun Ayat Jawi — Menyusun perkataan jawi menjadi ayat yang betul',       eng: 'Arrange Jawi Sentence — Arrange Jawi words into correct sentences' },
    ],
  },
  {
    q:    { bm: 'Apa yang dipelajari dalam pillar Matematik?', eng: 'What topics are covered in the Mathematics pillar?' },
    intro:{ bm: '8 permainan merangkumi bidang pembelajaran Matematik Tahun 2:',
            eng: '8 games covering Year 2 Mathematics learning areas:' },
    items:[
      { bm: 'Nombor 1-1000 — Mengenal, menyebut dan menulis nombor hingga 1000',       eng: 'Numbers 1-1000 — Recognise, say and write numbers up to 1000' },
      { bm: 'Tambah Tahun 2 — Penambahan dalam lingkungan 1000',                       eng: 'Addition — Add within 1000' },
      { bm: 'Tolak Tahun 2 — Penolakan dalam lingkungan 1000',                         eng: 'Subtraction — Subtract within 1000' },
      { bm: 'Darab Mudah — Pengenalan konsep darab dan sifir asas',                    eng: 'Simple Multiplication — Introduction to multiplication and basic times tables' },
      { bm: 'Pecahan — Mengenal pecahan mudah seperti satu perdua dan satu perempat',  eng: 'Fractions — Recognise simple fractions like one-half and one-quarter' },
      { bm: 'Wang — Mengira dan menukar wang ringgit',                                 eng: 'Money — Count and exchange Ringgit money' },
      { bm: 'Masa — Membaca dan menyatakan waktu',                                     eng: 'Time — Read and state the time' },
      { bm: 'Ukuran Panjang — Mengukur dan membandingkan panjang',                     eng: 'Length — Measure and compare lengths' },
    ],
  },
];

export default function Grade2DiscoverersHome(props) {
  const { onBack, onPlayGame, language = 'bm' } = props;
  const curriculum = CURRICULUM['age-8'];

  // Group games by pillar (only pillars that actually have games)
  const pillarSections = PILLAR_ORDER
    .map(id => ({ id, meta: PILLAR_META[id], games: curriculum[id] }))
    .filter(s => Array.isArray(s.games) && s.games.length > 0);

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

  const additionalSection = (
    <>
      {/* FAQ section heading — same divider style as "Pilih Permainan", spaced
          away from the game grid above and the Q&A card below. */}
      <div className="bp-section-label" style={{ marginTop: '2.5rem', marginBottom: '1.25rem' }}>FAQ</div>
      <KssrQnA
        qna={QNA}
        language={language}
        gradient="linear-gradient(135deg, #1CB0F6 0%, #0288D1 100%)"
        badges={language === 'bm' ? ['BM Tahun 2', 'Math Tahun 2', 'Jawi Tahun 2'] : ['BM Year 2', 'Math Year 2', 'Jawi Year 2']}
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
        heroIcon={<span style={{ fontSize: '4.5rem', lineHeight: 1 }}>🔭</span>}
        heroTitle={language === 'bm' ? 'Penjelajah Gred 2' : 'Grade 2 Discoverers'}
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
                  inner={GRADE2_GAME_INNER[game.id]}
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
