import React, { useState, useEffect, useMemo } from 'react';
import './ReadingPage.css';
import { readingData } from '../../data/curriculum/readingData';
import { Volume2, ArrowLeft, Play } from 'lucide-react';
import { playHoverSound } from '../../utils/soundManager';
import SpeechManager from '../../services/SpeechManager';
import { useGameStateContext } from '../../App';
import { getGameData } from '../../utils/gameStatsManager';
import KVLearningPage from './KVLearningPage';
import KVKLearningPage from './KVKLearningPage';
import { OpenBookIcon } from '../icons/GameIcons';

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

// ── Level color themes ────────────────────────────────────────────────────────
const LEVEL_THEMES = {
  1: { color: '#FF9600', bg: '#FFF0CC', shadow: '#FFD699', darkColor: '#D47A00' },
  2: { color: '#1CB0F6', bg: '#D0F0FF', shadow: '#98D8FF', darkColor: '#0B8DC0' },
  3: { color: '#CE82FF', bg: '#EDD9FF', shadow: '#E6B3FF', darkColor: '#9B59B6' },
  4: { color: '#58CC02', bg: '#E6FFD4', shadow: '#B3E080', darkColor: '#46A302' },
};

const getTheme = (level) => LEVEL_THEMES[level] || LEVEL_THEMES[1];

// ── Level tile SVG illustrations ────────────────────────────────────────────
const getTileIllustration = (level) => {
  switch (level) {
    case 1:
      return (
        <div className="tile-illustration" style={{ gap: '12px' }}>
          {/* Block 1: Ba */}
          <div className="tile-block-lg" style={{ animation: 'bob 2.2s ease-in-out infinite', background: '#FFFFFF', border: '3px solid #8F5300', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 800, color: '#8F5300', fontFamily: 'Baloo 2, sans-serif', position: 'relative' }}>
            Ba
            <div style={{ position: 'absolute', top: '-8px', right: '-8px', width: '14px', height: '14px', background: '#FF9600', borderRadius: '50%' }} />
          </div>
          {/* Block 2: Ca */}
          <div className="tile-block-lg" style={{ animation: 'bob 2.2s ease-in-out infinite 0.6s', background: '#FFF0CC', border: '3px solid #8F5300', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 800, color: '#8F5300', fontFamily: 'Baloo 2, sans-serif' }}>
            Ca
          </div>
        </div>
      );
    case 2:
      return (
        <div className="tile-illustration" style={{ gap: '12px' }}>
          {/* Block 1: Ma */}
          <div className="tile-block-md" style={{ animation: 'bob 2.2s ease-in-out infinite', background: '#fff', border: '3px solid #06628A', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 800, color: '#06628A', fontFamily: 'Baloo 2, sans-serif' }}>
            Ma
          </div>
          {/* Block 2: kan */}
          <div className="tile-block-md" style={{ animation: 'bob 2.2s ease-in-out infinite 0.6s', background: '#D0F0FF', border: '3px solid #06628A', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 800, color: '#06628A', fontFamily: 'Baloo 2, sans-serif' }}>
            kan
          </div>
        </div>
      );
    case 3:
      return (
        <div className="tile-illustration">
          {/* Book illustration */}
          <div style={{ animation: 'bob 2.2s ease-in-out infinite', width: '100%', height: '100%', background: 'linear-gradient(to right, #FFF 50%, #EDD9FF 50%)', border: '3px solid #6E3B85', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: '50%', top: '12px', bottom: '12px', width: '2px', background: '#6E3B85' }} />
            <div style={{ width: '40%', display: 'flex', flexDirection: 'column', gap: '6px', paddingLeft: '8px' }}>
              <div style={{ height: '3px', background: '#CE82FF', borderRadius: '2px', width: '80%' }} />
              <div style={{ height: '3px', background: '#CE82FF', borderRadius: '2px', width: '60%' }} />
              <div style={{ height: '3px', background: '#CE82FF', borderRadius: '2px', width: '75%' }} />
            </div>
            <div style={{ width: '40%', display: 'flex', flexDirection: 'column', gap: '6px', paddingRight: '8px' }}>
              <div style={{ height: '3px', background: '#CE82FF', borderRadius: '2px', width: '80%', marginLeft: 'auto' }} />
              <div style={{ height: '3px', background: '#CE82FF', borderRadius: '2px', width: '70%', marginLeft: 'auto' }} />
              <div style={{ height: '3px', background: '#CE82FF', borderRadius: '2px', width: '80%', marginLeft: 'auto' }} />
            </div>
          </div>
        </div>
      );
    case 4:
      return (
        <div className="tile-illustration">
          {/* Scroll illustration */}
          <div style={{ animation: 'bob 2.2s ease-in-out infinite', width: '100%', height: '100%', background: '#FFF', border: '3px solid #2E6B00', borderRadius: '10px', display: 'flex', flexDirection: 'column', padding: '10px', gap: '6px', justifyContent: 'center' }}>
            <div style={{ height: '2px', background: '#58CC02', borderRadius: '1px', width: '90%' }} />
            <div style={{ height: '2px', background: '#58CC02', borderRadius: '1px', width: '70%' }} />
            <div style={{ height: '2px', background: '#58CC02', borderRadius: '1px', width: '85%' }} />
            <div style={{ height: '2px', background: '#58CC02', borderRadius: '1px', width: '60%' }} />
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default function ReadingPage({ onBack, language }) {
  // ── State ─────────────────────────────────────────────────────────────
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scriptType, setScriptType] = useState('RUMI'); // 'RUMI', 'JAWI', or 'ENG'
  const [showHelp, setShowHelp] = useState(false);
  const [activeSyllable, setActiveSyllable] = useState(null);
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

    svg .bob1 { animation: bob 2.2s ease-in-out infinite; }
    svg .bob2 { animation: bob 2.2s ease-in-out infinite 0.6s; }

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

  // ── Route Tahap 1 → dedicated KV page ─────────────────────────────────
  if (selectedLevel === 1) {
    return <KVLearningPage onBack={() => setSelectedLevel(null)} language={language} />;
  }

  // ── Route Tahap 2 → dedicated KVK page ────────────────────────────────
  if (selectedLevel === 2) {
    return <KVKLearningPage onBack={() => setSelectedLevel(null)} language={language} />;
  }

  // ── Derived Data ──────────────────────────────────────────────────────
  const currentLevelData = selectedLevel
    ? readingData.filter(item => item.level === selectedLevel)
    : [];

  const currentItem = currentLevelData[currentIndex] || null;

  // ── Handlers ──────────────────────────────────────────────────────────
  const handleSelectLevel = (level) => {
    playHoverSound();
    setSelectedLevel(level);
    setCurrentIndex(0);
    setScriptType('RUMI');
    setShowHelp(false);
    setActiveSyllable(null);
  };

  const handleNext = () => {
    if (currentIndex < currentLevelData.length - 1) {
      playHoverSound();
      setCurrentIndex(prev => prev + 1);
      setShowHelp(false);
      setActiveSyllable(null);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      playHoverSound();
      setCurrentIndex(prev => prev - 1);
      setShowHelp(false);
      setActiveSyllable(null);
    }
  };

  const handleVolumeClick = () => {
    playHoverSound();
    const speakText = scriptType === 'ENG' ? currentItem?.eng : currentItem?.rumi.replace(/-/g, '');
    const lang = scriptType === 'ENG' ? 'en-US' : 'ms-MY';
    SpeechManager.speak(speakText, lang);
    setShowHelp(true);
  };

  const handleSyllableClick = (index, text) => {
    playHoverSound();
    SpeechManager.speak(text, 'ms-MY');
    setActiveSyllable(index);
  };

  // View: Level Selection
  if (!selectedLevel) {
    const levelData = [
      { level: 1, num: 1, capTitle: language === 'bm' ? 'Tahap 1' : 'Level 1' },
      { level: 2, num: 2, capTitle: language === 'bm' ? 'Tahap 2' : 'Level 2' },
      { level: 3, num: 3, capTitle: language === 'bm' ? 'Tahap 3' : 'Level 3' },
      { level: 4, num: 4, capTitle: language === 'bm' ? 'Tahap 4' : 'Level 4' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
        <style>{globalStyles}</style>

        <div style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
          <div className="rp-body" style={{ minHeight: '100%' }}>

            <div style={{ display: 'flex', alignItems: 'center', padding: '0 1rem', height: '52px', background: '#fff', borderBottom: '2px solid #E5E7EB' }}>
              <button type="button" onClick={onBack} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#6B7280', display: 'flex', alignItems: 'center', padding: '4px', borderRadius: '8px' }}>
                <ArrowLeft size={24} />
              </button>
            </div>

            <div className="rp-shell">

              {/* Hero */}
              <section className="rp-hero">
                <div className="rp-hero-emoji-wrap">
                  <span className="rp-hero-emoji" role="img" aria-label="open book"><OpenBookIcon size={96} /></span>
                </div>
                <p className="rp-hero-sub">
                  {language === 'bm' ? 'Dari suku kata hingga ayat penuh. Mulai dari tahap mudah dan berkembang dengan kepercayaan diri!' : 'From syllables to complete sentences. Start easy and progress with confidence!'}
                  <span aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#FFD60A"><path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>
                  </span>
                </p>
              </section>

              {/* Section label */}
              <div className="rp-section-label">
                {language === 'bm' ? 'Pilih Tahap' : 'Choose Level'}
              </div>

              {/* Level tiles */}
              <div className="rp-grid">
                {levelData.map((lvl) => (
                  <button
                    key={lvl.level}
                    className={`rp-tile level-${lvl.level}`}
                    onClick={() => handleSelectLevel(lvl.level)}
                    onMouseEnter={playHoverSound}
                    type="button"
                  >
                    <span className="rp-tile-num">{lvl.num}</span>

                    <span className="rp-spark s1" style={{ top:'24%', left:'14%' }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M12 2l2 7 7 2-7 2-2 7-2-7-7-2 7-2z"/></svg>
                    </span>
                    <span className="rp-spark s2" style={{ top:'30%', right:'14%' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><circle cx="12" cy="12" r="10"/></svg>
                    </span>
                    <span className="rp-spark s3" style={{ bottom:'38%', right:'14%' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,.7)"><circle cx="12" cy="12" r="10"/></svg>
                    </span>

                    <div className="rp-illo">
                      {getTileIllustration(lvl.level)}
                    </div>

                    <div className="rp-cap">
                      <span className="rp-cap-title">{lvl.capTitle}</span>
                      <span className="rp-cap-go" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 6l6 6-6 6"/>
                        </svg>
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Hint footer */}
              <div className="rp-hint">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD60A"><path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>
                {language === 'bm' ? 'Pilih tahap untuk mula belajar!' : 'Pick a level to start learning!'}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF1F7A"><path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }

  // View: Flashcard Interface
  const theme = getTheme(selectedLevel);
  return (
    <div className="reading-page-wrapper" style={{ display: 'flex', flexDirection: 'column', height: '100%', background: DESIGN_SYSTEM.colors.bg, position: 'relative' }}>
      <style>{globalStyles}</style>

      {/* Back Button - Top Left */}
      <button
        type="button"
        onClick={() => setSelectedLevel(null)}
        style={{ position: 'absolute', top: '1rem', left: '1rem', background: '#fff', border: `2px solid ${DESIGN_SYSTEM.colors.hair}`, borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', color: DESIGN_SYSTEM.colors.muted, cursor: 'pointer', boxShadow: `0 3px 0 ${DESIGN_SYSTEM.colors.hair}`, transition: 'transform .12s', zIndex: 10 }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
      >
        <ArrowLeft size={24} />
      </button>

      {/* Main Content - Single Scrollable Container */}
      <div className="landscape-content" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', padding: 'clamp(0.5rem, 2vw, 1rem)', width: '100%', boxSizing: 'border-box', maxWidth: '100%' }}>

        {/* Script Buttons - Inside Content */}
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '2rem' }}>
          {SCRIPTS.map(script => (
            <button
              type="button"
              key={script.key}
              onClick={() => { playHoverSound(); setScriptType(script.key); setActiveSyllable(null); setShowHelp(false); }}
              style={{
                background: scriptType === script.key ? script.color : '#fff',
                color: scriptType === script.key ? '#fff' : script.color,
                border: `2px solid ${script.color}`,
                borderRadius: '12px',
                padding: '6px 16px',
                fontWeight: 800,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                boxShadow: scriptType === script.key ? `0 4px 0 ${script.color}` : 'none',
              }}
            >
              {script.label}
            </button>
          ))}
        </div>

        {/* Flashcard Box */}
        <div className="flashcard-box" style={{
          background: '#fff',
          boxShadow: `0 12px 0 ${theme.shadow}, 0 22px 28px -10px rgba(0,0,0,.22)`, position: 'relative',
        }}>

          {/* Sound Button */}
          <button
            type="button"
            onClick={handleVolumeClick}
            title="Read Full Text"
            style={{ position: 'absolute', top: 16, right: 16, background: '#f0f0f0', border: 'none', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.color, cursor: 'pointer', transition: 'transform 0.1s', boxShadow: `0 3px 0 ${DESIGN_SYSTEM.colors.hair}` }}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.9)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Volume2 size={24} />
          </button>

          <span style={{ fontSize: '5rem', marginBottom: '1.5rem', animation: 'floaty 3.6s ease-in-out infinite' }}>
            {currentItem?.emoji}
          </span>

          {/* Rumi / Syllables Display */}
          {scriptType === 'RUMI' && (
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}>
              {currentItem?.syllables.map((syl, i) => {
                const cleanSyl = syl.trim();
                const isActive = activeSyllable === i;
                return (
                  <button
                    key={i}
                    onClick={() => handleSyllableClick(i, cleanSyl)}
                    style={{
                      background: isActive ? theme.color : '#fff',
                      color: isActive ? '#fff' : DESIGN_SYSTEM.colors.ink,
                      border: `2px solid ${theme.color}`,
                      borderRadius: '18px',
                      padding: '14px 24px',
                      fontSize: '1.8rem',
                      fontWeight: 900,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      transform: isActive ? 'scale(1.1)' : 'scale(1)',
                      boxShadow: isActive ? `0 6px 12px ${theme.color}40` : `0 3px 0 ${DESIGN_SYSTEM.colors.hair}`,
                    }}
                  >
                    {cleanSyl}
                  </button>
                )
              })}
            </div>
          )}

          {/* Jawi Display */}
          {scriptType === 'JAWI' && (
            <button
              type="button"
              onClick={() => {
                playHoverSound();
                SpeechManager.speak(currentItem?.rumi.replace(/-/g, ''), 'ms-MY');
                setActiveSyllable(0);
              }}
              style={{
                fontSize: '3.5rem', fontWeight: 900,
                color: activeSyllable === 0 ? '#fff' : DESIGN_SYSTEM.colors.ink,
                direction: 'rtl', fontFamily: '"Lateef", serif', lineHeight: 1.5,
                textAlign: 'center',
                background: activeSyllable === 0 ? theme.color : '#fff',
                border: `2px solid ${theme.color}`,
                borderRadius: '20px', padding: '16px 28px', cursor: 'pointer', width: '100%',
                transition: 'all 0.15s ease',
                transform: activeSyllable === 0 ? 'scale(1.05)' : 'scale(1)',
                boxShadow: activeSyllable === 0 ? `0 6px 12px ${theme.color}40` : `0 3px 0 ${DESIGN_SYSTEM.colors.hair}`
              }}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
              onMouseUp={e => e.currentTarget.style.transform = activeSyllable === 0 ? 'scale(1.05)' : 'scale(1)'}
              onMouseLeave={e => e.currentTarget.style.transform = activeSyllable === 0 ? 'scale(1.05)' : 'scale(1)'}
            >
              {currentItem?.jawi}
            </button>
          )}

          {/* English Display */}
          {scriptType === 'ENG' && (
            <button
              type="button"
              onClick={() => {
                playHoverSound();
                SpeechManager.speak(currentItem?.eng, 'en-US');
                setActiveSyllable(0);
              }}
              style={{
                fontSize: '2.8rem', fontWeight: 900,
                color: activeSyllable === 0 ? '#fff' : DESIGN_SYSTEM.colors.ink,
                textAlign: 'center', lineHeight: 1.3,
                background: activeSyllable === 0 ? theme.color : '#fff',
                border: `2px solid ${theme.color}`,
                borderRadius: '20px', padding: '16px 28px', cursor: 'pointer', width: '100%',
                transition: 'all 0.15s ease',
                transform: activeSyllable === 0 ? 'scale(1.05)' : 'scale(1)',
                boxShadow: activeSyllable === 0 ? `0 6px 12px ${theme.color}40` : `0 3px 0 ${DESIGN_SYSTEM.colors.hair}`
              }}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
              onMouseUp={e => e.currentTarget.style.transform = activeSyllable === 0 ? 'scale(1.05)' : 'scale(1)'}
              onMouseLeave={e => e.currentTarget.style.transform = activeSyllable === 0 ? 'scale(1.05)' : 'scale(1)'}
            >
              {currentItem?.eng}
            </button>
          )}

          {/* Helper Drawer (Translation + Phonetics) */}
          {showHelp && (
            <div style={{ marginTop: '2rem', width: '100%', background: theme.bg, borderRadius: '18px', border: `2px solid ${theme.color}`, padding: '1.2rem', textAlign: 'center', animation: 'modalFadeIn 0.2s ease-out' }}>
              <div style={{ color: theme.color, fontWeight: 900, fontSize: '1.2rem', marginBottom: '6px' }}>
                {currentItem?.eng}
              </div>
              <div style={{ color: DESIGN_SYSTEM.colors.muted, fontWeight: 700, fontSize: '0.95rem' }}>
                🗣️ "{currentItem?.phonetic}"
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="nav-controls">
        {/* Previous Button */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          style={{
            width: '44px', height: '44px', borderRadius: '14px', border: '0',
            background: currentIndex === 0 ? '#E5E5E5' : '#fff',
            color: DESIGN_SYSTEM.colors.muted,
            fontWeight: 900, fontSize: '1.2rem', cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
            boxShadow: currentIndex === 0 ? 'none' : `0 3px 0 ${DESIGN_SYSTEM.colors.hair}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            transition: 'transform .12s'
          }}
          onMouseEnter={(e) => { if (currentIndex > 0) e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          {'<'}
        </button>

        {/* Listen Button */}
        <button
          type="button"
          onClick={handleVolumeClick}
          style={{
            flex: 1, padding: '0.9rem 1.2rem', borderRadius: '16px',
            border: `2px solid ${theme.color}`,
            background: '#fff', color: theme.color, fontWeight: 900, fontSize: '1rem',
            cursor: 'pointer', boxShadow: `0 4px 0 ${theme.shadow}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            transition: 'transform .12s'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          <Volume2 size={20} />
          {language === 'bm' ? 'Dengar' : 'Listen'}
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          disabled={currentIndex === currentLevelData.length - 1}
          style={{
            flex: 1, padding: '0.9rem 1.2rem', borderRadius: '16px', border: 'none',
            background: currentIndex === currentLevelData.length - 1 ? '#E5E5E5' : theme.color,
            color: '#fff', fontWeight: 900, fontSize: '1rem',
            cursor: currentIndex === currentLevelData.length - 1 ? 'not-allowed' : 'pointer',
            boxShadow: currentIndex === currentLevelData.length - 1 ? 'none' : `0 4px 0 ${theme.darkColor}`,
            transition: 'transform .12s'
          }}
          onMouseEnter={(e) => { if (currentIndex < currentLevelData.length - 1) e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          {language === 'bm' ? 'Seterusnya' : 'Next'} {'>'}
        </button>
      </div>

    </div>
  );
}
