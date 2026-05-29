import React, { useState, useEffect, useMemo } from 'react';
import './ReadingPage.css';
import { Play } from 'lucide-react';
import { playHoverSound } from '../../utils/soundManager';
import { useGameStateContext } from '../../App';
import { getGameData } from '../../utils/gameStatsManager';
import KVLearningPage from './KVLearningPage';
import KVKLearningPage from './KVKLearningPage';
import { OpenBookIcon } from '../icons/GameIcons';
import {
  LearnKVWordsIcon,
  LearnKVKWordsIcon,
  SpellingwordsIcon,
  EnglishPhonicsIcon,
} from '../icons/LearningIcons';
import PageLayout from '../PageLayout';
import { RobotDefs, RobotHeadReading } from '../SubjectRobots';
import LearnWords from './LearnWords';
import LongSentences from './LongSentences';

// ── Design System ────────────────────────────────────────────────────────────
const DESIGN_SYSTEM = {
  colors: {
    bg: '#FFFDF8',
    surface: '#FFFFFF',
    ink: '#111827',
    ink2: '#374151',
    muted: '#6B7280',
    hair: '#E5E7EB',
  },
  bezel: {
    1: '#FFFFFF',
    2: '#F4EFE6',
    3: '#D9D0BD',
  },
  levels: {
    1: { c1: '#FFF0CC', c2: '#FF9600', c3: '#D47A00', cd: '#8F5300' },
    2: { c1: '#D0F0FF', c2: '#1CB0F6', c3: '#0B8DC0', cd: '#06628A' },
    3: { c1: '#EDD9FF', c2: '#CE82FF', c3: '#9B59B6', cd: '#6E3B85' },
    4: { c1: '#E6FFD4', c2: '#58CC02', c3: '#46A302', cd: '#2E6B00' },
  },
  stats: {
    star: '#FFC800',
    heart: '#FF4B4B',
    gem: '#1CB0F6',
  },
};

// ── Script button config ──────────────────────────────────────────────────────
const SCRIPTS = [
  { key: 'RUMI', label: 'RUMI', color: '#1CB0F6', bg: '#D0F0FF' },
  { key: 'ENG',  label: 'ENG',  color: '#FF9600', bg: '#FFF0CC' },
  { key: 'JAWI', label: 'JAWI', color: '#CE82FF', bg: '#EDD9FF' },
];

// ── Level tile illustrations ────────────────────────────────────────────
const getTileIllustration = (level) => {
  switch (level) {
    case 1: return <LearnKVWordsIcon size={200} />;
    case 2: return <LearnKVKWordsIcon size={200} />;
    case 3: return <SpellingwordsIcon size={200} />;
    case 4: return <EnglishPhonicsIcon size={200} />;
    default: return null;
  }
};

export default function ReadingPage({ onBack, language }) {
  // ── State ─────────────────────────────────────────────────────────────
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [displayHearts, setDisplayHearts] = useState(3);
  const [displayGems, setDisplayGems] = useState(0);
  const [displayStars, setDisplayStars] = useState(0);

  const gameState = useGameStateContext();

  // Load game stats
  useEffect(() => {
    const gameData = getGameData();
    setDisplayHearts(gameData.hearts);
    setDisplayGems(gameData.gems);
    setDisplayStars(gameData.stars);
  }, []);

  // Global Styles — must be declared before any early returns to obey Rules of Hooks
  const globalStyles = useMemo(() => `
    @keyframes floaty { 0%,100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-6px) rotate(2deg); } }
    @keyframes bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
    @keyframes nudge { 0%,90%,100% { transform: rotate(-1deg); } 45% { transform: rotate(1deg); } }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes pulse { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.15); opacity: 0.8; } }

    svg .bob1 { animation: bob 2.2s ease-in-out infinite; }
    svg .bob2 { animation: bob 2.2s ease-in-out infinite 0.6s; }

    /* Robot arm waving animations */
    svg .rbt1-wave { animation: nudge 0.8s ease-in-out infinite; transform-origin: 160px 220px; }
    svg .rbt2-wave { animation: nudge 0.8s ease-in-out infinite; transform-origin: 160px 220px; }
    svg .rbt3-wave { animation: nudge 0.8s ease-in-out infinite; transform-origin: 160px 220px; }
    svg .rbt4-wave { animation: nudge 0.8s ease-in-out infinite; transform-origin: 160px 220px; }

    * { box-sizing: border-box; }

    /* Tile illustration container (sized to fit inside .rp-illo band) */
    .tile-illustration {
      width: 110px;
      height: 90px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    @media (max-width: 560px) {
      .tile-illustration {
        width: 95px;
        height: 80px;
      }
    }

    /* Illustration blocks (Ba, Ca, Ma, kan) */
    .tile-block-lg { width: 45px; height: 45px; }
    .tile-block-md { width: 42px; height: 42px; }

    @media (max-width: 560px) {
      .tile-block-lg { width: 38px; height: 38px; }
      .tile-block-md { width: 36px; height: 36px; }
    }

    /* Responsive Flashcard */
    .flashcard-container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .flashcard-box {
      width: 100%;
      max-width: 500px;
      border-radius: 28px;
      padding: 3rem 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 380px;
      justify-content: center;
      margin: 0 auto;
    }

    @media (max-width: 768px) {
      .flashcard-box {
        max-width: 100%;
        padding: 2rem 1.5rem;
        min-height: 320px;
      }
    }

    @media (max-width: 480px) {
      .flashcard-box {
        padding: 1.5rem 1rem;
        min-height: 280px;
      }
    }

    /* Responsive Controls */
    .nav-controls {
      display: flex;
      gap: 0.75rem;
      margin-top: 1rem;
      align-items: center;
      flex-wrap: wrap;
    }

    @media (max-width: 480px) {
      .nav-controls {
        gap: 0.5rem;
      }
    }

    /* Mobile: Full width, no side padding */
    @media (max-width: 768px) {
      body, html {
        overflow-x: hidden;
      }
    }

    /* Landscape orientation on mobile */
    @media (orientation: landscape) and (max-height: 500px) {
      body, html {
        margin: 0 !important;
        padding: 0 !important;
        overflow-x: hidden;
        width: 100% !important;
      }
      .reading-page-wrapper {
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      .landscape-content {
        padding: 0 !important;
        width: 100% !important;
        margin: 0 !important;
      }
    }
  `, []);

  // Memoize SVG illustrations — update when language changes
  const tileIllustrations = useMemo(() => ({
    1: getTileIllustration(1),
    2: getTileIllustration(2),
    3: getTileIllustration(3),
    4: getTileIllustration(4),
  }), [language]);

  // ── Route Tahap 1 → dedicated KV page ─────────────────────────────────
  if (selectedLevel === 1) {
    return <KVLearningPage onBack={() => setSelectedLevel(null)} language={language} />;
  }

  // ── Route Tahap 2 → dedicated KVK page ────────────────────────────────
  if (selectedLevel === 2) {
    return <KVKLearningPage onBack={() => setSelectedLevel(null)} language={language} />;
  }

  // ── Route Tahap 3 → dedicated Kata page ────────────────────────────────
  if (selectedLevel === 3) {
    return <LearnWords onBack={() => setSelectedLevel(null)} language={language} />;
  }

  // ── Route Tahap 4 → dedicated Ayat Panjang page ─────────────────────────
  if (selectedLevel === 4) {
    return <LongSentences onBack={() => setSelectedLevel(null)} language={language} />;
  }

  // ── Handler ───────────────────────────────────────────────────────────
  const handleSelectLevel = (level) => {
    playHoverSound();
    setSelectedLevel(level);
  };

  // View: Level Selection
  if (!selectedLevel) {
    const levelData = [
      { level: 1, num: 1, capTitle: language === 'bm' ? 'Suku Kata KV'  : 'KV Syllables'   },
      { level: 2, num: 2, capTitle: language === 'bm' ? 'Suku Kata KVK' : 'KVK Syllables'  },
      { level: 3, num: 3, capTitle: language === 'bm' ? 'Baca Perkataan': 'Read Words'     },
      { level: 4, num: 4, capTitle: language === 'bm' ? 'Baca Ayat'     : 'Read Sentences' },
    ];

    const heroSubtitle = language === 'bm'
      ? 'Dari suku kata ke ayat penuh — satu langkah pada satu masa!'
      : 'From syllables to full sentences — one step at a time!';

    const hintContent = (
      <>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD60A"><path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>
        {language === 'bm' ? 'Pilih tahap untuk mula belajar!' : 'Pick a level to start learning!'}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF1F7A"><path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>
      </>
    );

    const gridTiles = levelData.map((lvl) => (
      <button
        key={lvl.level}
        className={`rp-icon-card level-${lvl.level}`}
        onClick={() => handleSelectLevel(lvl.level)}
        onMouseEnter={playHoverSound}
        type="button"
      >
        {tileIllustrations[lvl.level]}
      </button>
    ));

    return (
      <>
        <RobotDefs />
        <style>{globalStyles}</style>
        <PageLayout
          classPrefix="rp"
          heroIcon={<RobotHeadReading style={{ width: 120, height: 80 }} />}
          heroTitle={language === 'bm' ? 'Belajar Membaca' : 'Learn to Read'}
          heroSubtitle={heroSubtitle}
          sectionLabel={language === 'bm' ? 'Pilih Tahap' : 'Choose Level'}
          hintText={hintContent}
          onBack={onBack}
        >
          {gridTiles}
        </PageLayout>
      </>
    );
  }
}
