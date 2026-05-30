import React, { useRef, useCallback } from 'react';
import { CURRICULUM } from '../../data/ageCurriculum';
import { playHoverSound } from '../../utils/soundManager';
import PageLayout from '../PageLayout';
import '../SpeakingPage/BMPage.css';
import KssrQnA from '../KssrQnA';
// Shared robot-head card template (pillar-based frames, reused across ages).
import { EEGameRobotDefs, EEGameRobot } from '../AgeGroup-4-6/EarlyExplorersRobots';
import { GRADE1_GAME_INNER } from './Grade1Screens';

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

// ── KSSR QnA data ─────────────────────────────────────────────────────────────
const QNA = [
  {
    q:    { bm: 'Apa yang dipelajari dalam pillar Membaca?',    eng: 'What topics are covered in the Reading pillar?'    },
    intro:{ bm: '9 permainan merangkumi kemahiran tatabahasa Bahasa Melayu Tahun 1 KSSR (18 daripada 21 objektif BM):',
            eng: '9 games covering Year 1 Bahasa Melayu grammar skills (18 of 21 BM objectives):' },
    items:[
      { bm: 'Bina Ayat — Membina ayat penyata dan ayat tanya yang mudah (Obj. 8, 21)',             eng: 'Sentence Builder — Build simple statements and question sentences (Obj. 8, 21)'        },
      { bm: 'Suku Kata — Membaca dan membina perkataan menggunakan suku kata (Obj. 1, 4, 7)',       eng: 'Syllable Builder — Read and form words from syllables (Obj. 1, 4, 7)'                  },
      { bm: 'Jenis Kata — Mengenal kata nama, kata kerja dan kata adjektif (Obj. 16, 17)',          eng: 'Word Types — Identify nouns, verbs and adjectives (Obj. 16, 17)'                       },
      { bm: 'Kata Tanya — Menggunakan kata tanya: siapa, apa, di mana, bila, mengapa (Obj. 2)',     eng: 'Question Words — Use who, what, where, when and why (Obj. 2)'                          },
      { bm: 'Kata Hubung & Sendi — Menggunakan kata hubung dan kata sendi nama (Obj. 18)',          eng: 'Connectors & Prepositions — Use conjunctions and prepositions correctly (Obj. 18)'     },
      { bm: 'Kata Imbuhan — Membentuk perkataan baharu dengan awalan ber- dan me- (Obj. 19)',       eng: 'Word Prefixes — Form new words using prefixes ber- and me- (Obj. 19)'                   },
      { bm: 'Ejaan & Tanda Baca — Mengeja perkataan dengan betul dan menggunakan tanda baca (Obj. 5, 6)', eng: 'Spelling & Punctuation — Spell words correctly and use punctuation marks (Obj. 5, 6)' },
      { bm: 'Kata Ganda — Memahami dan menggunakan kata ganda penuh dan kata ganda berentak (Obj. 9, 10)', eng: 'Repeated Words — Understand and use full and rhyming reduplications (Obj. 9, 10)' },
      { bm: 'Kefahaman Bacaan — Memahami dan mentafsir petikan bacaan pendek (Obj. 12)',            eng: 'Reading Comprehension — Understand and interpret short reading passages (Obj. 12)'      },
    ],
  },
  {
    q:    { bm: 'Apa yang dipelajari dalam pillar Bertutur?',   eng: 'What topics are covered in the Speaking pillar?'  },
    intro:{ bm: '5 permainan lisan menggunakan teknologi pengecaman suara. Murid bercakap dan aplikasi menilai sebutan secara langsung:',
            eng: '5 oral games using speech recognition technology. Pupils speak and the app assesses pronunciation in real time:' },
    items:[
      { bm: 'Baca Ayat Kuat — Membaca ayat dengan sebutan yang jelas dan lantang (Obj. 11)',        eng: 'Read Aloud — Read sentences clearly and loudly (Obj. 11)'                               },
      { bm: 'Bertutur Bertatasusila — Menggunakan bahasa yang sopan dan bertatasusila dalam pelbagai situasi harian (Obj. 3)', eng: 'Polite Speaking — Use polite and courteous language in various daily situations (Obj. 3)' },
      { bm: 'Jawab Soalan — Menjawab soalan mudah secara lisan dengan lengkap dan betul (Obj. 14)', eng: 'Answer Questions — Answer simple questions orally in full and correct sentences (Obj. 14)' },
      { bm: 'Sebut Lawan Kata — Menyebut dan memahami pasangan antonim bahasa Melayu',              eng: 'Antonyms — Pronounce and understand Bahasa Melayu antonym word pairs'                   },
      { bm: 'Baca Frasa Bergambar — Membaca frasa pendek dengan panduan teks dan gambar',           eng: 'Picture Phrases — Read short phrases guided by on-screen text and picture prompts'      },
    ],
  },
  {
    q:    { bm: 'Apa yang dipelajari dalam pillar Tulisan Jawi?', eng: 'What topics are covered in the Jawi Script pillar?' },
    intro:{ bm: '5 permainan berteraskan sukatan Pendidikan Islam Tahun 1 (Objektif 10 — membaca, membina dan menulis tulisan jawi):',
            eng: '5 games based on the Year 1 Islamic Education syllabus (Obj. 10 — reading, forming and writing Jawi script):' },
    items:[
      { bm: 'Baca Suku Kata Jawi — Membaca suku kata dalam tulisan jawi dan mengenal gabungan huruf',  eng: 'Read Jawi Syllables — Read Jawi syllables and recognise letter combinations'          },
      { bm: 'Bina Perkataan Jawi — Membina perkataan dengan menyusun huruf jawi mengikut urutan betul', eng: 'Build Jawi Words — Form words by arranging Jawi letters in the correct sequence'    },
      { bm: 'Padan Perkataan Jawi — Memadankan perkataan jawi dengan makna dalam tulisan rumi',         eng: 'Match Jawi Words — Match Jawi words with their meanings in Roman script'             },
      { bm: 'Baca Ayat Jawi — Melengkapkan ayat jawi dengan perkataan yang sesuai dalam konteks',      eng: 'Read Jawi Sentences — Complete Jawi sentences with a contextually appropriate word'  },
      { bm: 'Tulis Jawi — Menulis huruf dan perkataan jawi secara bebas di atas kanvas lakaran digital', eng: 'Write Jawi — Freely write Jawi letters and words on a digital drawing canvas'     },
    ],
  },
  {
    q:    { bm: 'Apa yang dipelajari dalam pillar Matematik?',  eng: 'What topics are covered in the Mathematics pillar?' },
    intro:{ bm: '10 permainan merangkumi kesemua 10 Bidang Pembelajaran Matematik KSSR Tahun 1. Setiap bidang menggunakan 3 mekanik soalan yang berbeza:',
            eng: '10 games covering all 10 Learning Areas in KSSR Year 1 Mathematics. Each area uses 3 different question mechanics:' },
    items:[
      { bm: 'Nombor 1-100 — Mengenal, menyebut, membandingkan dan memahami nilai tempat nombor (Bidang 1)',           eng: 'Numbers 1-100 — Recognise, say, compare and understand place value of numbers (Area 1)'       },
      { bm: 'Tambah dalam 100 — Operasi tambah secara visual, simbolik dan masalah cerita (Bidang 2)',                eng: 'Add within 100 — Addition through visual, symbolic and story-problem approaches (Area 2)'     },
      { bm: 'Cerita Penolakan — Tolak dalam lingkungan 100 secara bergambar, simbolik dan cerita (Bidang 3)',         eng: 'Subtraction Story — Subtract within 100 through pictures, symbols and stories (Area 3)'       },
      { bm: 'Pengira Wang — Mengenal wang ringgit hingga RM10, nilai syiling dan masalah baki (Bidang 4)',            eng: 'Counting Money — Recognise Ringgit notes up to RM10, coins and change problems (Area 4)'      },
      { bm: 'Time Teller — Membaca dan menyatakan masa tepat menggunakan muka jam (Bidang 5)',                        eng: 'Time Teller — Read and state the correct time using a clock face (Area 5)'                   },
      { bm: 'Ukur Panjang — Membanding dan mengukur panjang benda dalam sentimeter (Bidang 6)',                       eng: 'Measuring Length — Compare and measure the length of objects in centimetres (Area 6)'         },
      { bm: 'Jisim — Membanding berat benda dan membaca sukatan jisim dalam kilogram (Bidang 7)',                     eng: 'Mass — Compare the mass of objects and read scale measurements in kilograms (Area 7)'         },
      { bm: 'Isi Padu Cecair — Mengenal tahap cecair dan membaca sukatan isi padu dalam liter (Bidang 8)',            eng: 'Liquid Volume — Identify liquid levels and read volume measurements in litres (Area 8)'       },
      { bm: 'Bentuk 3D — Mengenal, menamakan dan membezakan bentuk tiga dimensi (Bidang 9)',                          eng: '3D Shapes — Recognise, name and distinguish three-dimensional shapes (Area 9)'                },
      { bm: 'Baca Pictograph — Membaca dan mentafsir data dalam piktograf mudah (Bidang 10)',                         eng: 'Read Pictograph — Read and interpret data presented in simple pictographs (Area 10)'          },
    ],
  },
];

export default function Grade1AdventurersHome(props) {
  const { onBack, onPlayGame, language = 'bm' } = props;
  const curriculum = CURRICULUM['age-7'];

  // Group games by pillar (only pillars that actually have games)
  const pillarSections = PILLAR_ORDER
    .map(id => ({ id, meta: PILLAR_META[id], games: curriculum[id] }))
    .filter(s => Array.isArray(s.games) && s.games.length > 0);

  const heroSubtitle = (
    <>
      <span style={{ display: 'inline-block', background: 'rgba(255,150,0,0.15)', color: '#FF9600', fontSize: '0.7rem', padding: '0.18rem 0.6rem', borderRadius: '999px', fontWeight: 800, border: '1.5px solid rgba(255,150,0,0.45)', marginRight: '0.4rem', verticalAlign: 'middle', letterSpacing: '0.03em' }}>
        KSSR 18/21
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

  const additionalSection = (
    <>
      <div className="bp-section-label" style={{ marginTop: '2.5rem', marginBottom: '1.25rem' }}>FAQ</div>
      <KssrQnA
        qna={QNA}
        language={language}
        gradient="linear-gradient(135deg, #FF9600 0%, #FF6B35 100%)"
        badges={language === 'bm'
          ? ['BM 18/21 Objektif', 'Math 10/10 Bidang', 'Jawi PI Obj. 10']
          : ['BM 18/21 Objectives', 'Math 10/10 Areas', 'Jawi PI Obj. 10']}
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
      {/* Shared robot-head frame + screen clip for the game-card icons — rendered once. */}
      <EEGameRobotDefs />
      <PageLayout
        classPrefix="bp"
        heroIcon={<span style={{ fontSize: '4.5rem', lineHeight: 1 }}>🧭</span>}
        heroTitle={language === 'bm' ? 'Pelawat Gred 1' : 'Grade 1 Adventurers'}
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
                  inner={GRADE1_GAME_INNER[game.id]}
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
