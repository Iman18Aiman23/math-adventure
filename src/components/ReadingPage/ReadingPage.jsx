import React, { useState, useEffect } from 'react';
import { readingData } from '../../data/curriculum/readingData';
import { Volume2, ArrowLeft, Play } from 'lucide-react';
import { playHoverSound } from '../../utils/soundManager';
import SpeechManager from '../../services/SpeechManager';
import { useGameStateContext } from '../../App';
import { getGameData } from '../../utils/gameStatsManager';
import KVLearningPage from './KVLearningPage';
import KVKLearningPage from './KVKLearningPage';

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
        <div style={{ position: 'relative', width: '140px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          {/* Block 1: Ba */}
          <div style={{ animation: 'bob 2.2s ease-in-out infinite', width: '50px', height: '50px', background: '#FFFFFF', border: '3px solid #8F5300', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 800, color: '#8F5300', fontFamily: 'Baloo 2, sans-serif', position: 'relative' }}>
            Ba
            <div style={{ position: 'absolute', top: '-8px', right: '-8px', width: '14px', height: '14px', background: '#FF9600', borderRadius: '50%' }} />
          </div>
          {/* Block 2: Ca */}
          <div style={{ animation: 'bob 2.2s ease-in-out infinite 0.6s', width: '50px', height: '50px', background: '#FFF0CC', border: '3px solid #8F5300', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 800, color: '#8F5300', fontFamily: 'Baloo 2, sans-serif' }}>
            Ca
          </div>
        </div>
      );
    case 2:
      return (
        <div style={{ position: 'relative', width: '140px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          {/* Block 1: Ma */}
          <div style={{ animation: 'bob 2.2s ease-in-out infinite', width: '45px', height: '45px', background: '#fff', border: '3px solid #06628A', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 800, color: '#06628A', fontFamily: 'Baloo 2, sans-serif' }}>
            Ma
          </div>
          {/* Block 2: kan */}
          <div style={{ animation: 'bob 2.2s ease-in-out infinite 0.6s', width: '45px', height: '45px', background: '#D0F0FF', border: '3px solid #06628A', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 800, color: '#06628A', fontFamily: 'Baloo 2, sans-serif' }}>
            kan
          </div>
        </div>
      );
    case 3:
      return (
        <div style={{ position: 'relative', width: '140px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Book illustration */}
          <div style={{ animation: 'bob 2.2s ease-in-out infinite', width: '120px', height: '90px', background: 'linear-gradient(to right, #FFF 50%, #EDD9FF 50%)', border: '3px solid #6E3B85', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
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
        <div style={{ position: 'relative', width: '140px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Scroll illustration */}
          <div style={{ animation: 'bob 2.2s ease-in-out infinite', width: '120px', height: '90px', background: '#FFF', border: '3px solid #2E6B00', borderRadius: '10px', display: 'flex', flexDirection: 'column', padding: '12px', gap: '6px', justifyContent: 'center' }}>
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

  // Load game stats
  useEffect(() => {
    const gameData = getGameData();
    setDisplayHearts(gameData.hearts);
    setDisplayGems(gameData.gems);
    setDisplayStars(gameData.stars);
  }, []);

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

  // ── Views ─────────────────────────────────────────────────────────────

  // Global Styles with Responsive Design
  const globalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700;800&family=Nunito:wght@600;700;800;900&display=swap');

    @keyframes floaty { 0%,100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-6px) rotate(2deg); } }
    @keyframes bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
    @keyframes nudge { 0%,90%,100% { transform: rotate(-1deg); } 45% { transform: rotate(1deg); } }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

    svg .bob1 { animation: bob 2.2s ease-in-out infinite; }
    svg .bob2 { animation: bob 2.2s ease-in-out infinite 0.6s; }

    * { box-sizing: border-box; }

    /* Responsive Grid Layout */
    .level-grid {
      display: grid;
      gap: 24px;
      margin-top: 32px;
      width: 100%;
      box-sizing: border-box;
    }

    /* Mobile: 1 column */
    @media (max-width: 520px) {
      .level-grid {
        grid-template-columns: 1fr;
        gap: 14px;
        margin-top: 20px;
      }
    }

    /* Tablet: 2 columns */
    @media (min-width: 521px) and (max-width: 1100px) {
      .level-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
        margin-top: 24px;
      }
    }

    /* Desktop: 4 columns */
    @media (min-width: 1101px) {
      .level-grid {
        grid-template-columns: repeat(4, 1fr);
        gap: 24px;
        margin-top: 32px;
      }
    }

    /* Very small phones */
    @media (max-width: 360px) {
      .level-grid {
        gap: 12px;
      }
    }

    /* Responsive top bar */
    .top-bar {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 6px 4px 18px;
      flex-wrap: wrap;
    }

    .top-bar > .spacer {
      flex: 1;
      min-width: 12px;
    }

    .stat-item {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-family: 'Baloo 2', sans-serif;
      font-weight: 800;
      font-size: 14px;
      padding: 6px 4px;
      white-space: nowrap;
    }

    .stat-label {
      color: #6B7280;
      font-weight: 700;
    }

    @media (max-width: 768px) {
      .stat-item {
        font-size: 12px;
      }
      .stat-label {
        display: none;
      }
    }

    /* Responsive hero */
    .hero-section {
      text-align: center;
      padding: 10px 12px 22px;
    }

    .hero-title {
      font-family: 'Baloo 2', sans-serif;
      font-weight: 800;
      font-size: 40px;
      letter-spacing: -0.01em;
      margin: 0 0 8px;
      color: #111827;
      text-shadow: 0 2px 0 #fff, 0 3px 0 rgba(0,0,0,.04);
    }

    .hero-subtitle {
      margin: 0 auto;
      max-width: 680px;
      color: #6B7280;
      font-weight: 700;
      font-size: 15px;
      line-height: 1.5;
    }

    @media (max-width: 768px) {
      .hero-title {
        font-size: 32px;
      }
      .hero-subtitle {
        font-size: 14px;
      }
    }

    @media (max-width: 480px) {
      .hero-title {
        font-size: 24px;
        margin: 0 0 6px;
      }
      .hero-subtitle {
        font-size: 12px;
      }
    }

    /* Responsive main container */
    .app-container {
      max-width: 1180px;
      margin: 0 auto;
      padding: 14px 20px 80px;
      position: relative;
      z-index: 2;
      width: 100%;
      overflow-x: hidden;
      box-sizing: border-box;
    }

    @media (max-width: 768px) {
      .app-container {
        padding: 10px 14px 60px;
      }
    }

    @media (max-width: 480px) {
      .app-container {
        padding: 8px 10px 50px;
      }
    }

    @media (max-width: 360px) {
      .app-container {
        padding: 6px 8px 50px;
      }
    }

    /* Landscape orientation on mobile */
    @media (orientation: landscape) and (max-height: 500px) {
      .app-container {
        padding: 6px 8px 40px;
      }
    }

    /* Responsive Tiles */
    .tile-button {
      aspect-ratio: 1 / 1.18;
      border-radius: 32px;
      transition: transform .18s cubic-bezier(.34,1.56,.64,1), box-shadow .18s ease;
    }

    @media (max-width: 768px) {
      .tile-button {
        border-radius: 24px;
        aspect-ratio: 1 / 1.15;
      }
    }

    @media (max-width: 480px) {
      .tile-button {
        border-radius: 20px;
        aspect-ratio: 1 / 1.12;
      }
    }

    /* Responsive Text in Tiles */
    .plate-title {
      font-family: 'Baloo 2', sans-serif;
      font-weight: 800;
      font-size: 20px;
      color: #111827;
      line-height: 1.05;
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .plate-desc {
      margin-top: 4px;
      font-family: 'Nunito', sans-serif;
      font-weight: 700;
      font-size: 12px;
      color: #6B7280;
      line-height: 1.35;
    }

    .plate-tag {
      display: inline-block;
      font-family: 'Nunito', sans-serif;
      font-weight: 800;
      font-size: 10px;
      letter-spacing: 0.1em;
      color: #fff;
      padding: 3px 8px;
      border-radius: 999px;
    }

    @media (max-width: 768px) {
      .plate-title {
        font-size: 18px;
      }
      .plate-desc {
        font-size: 11px;
      }
      .plate-tag {
        font-size: 9px;
        padding: 2px 6px;
      }
    }

    @media (max-width: 480px) {
      .plate-title {
        font-size: 16px;
      }
      .plate-desc {
        font-size: 10px;
        margin-top: 2px;
      }
      .plate-tag {
        font-size: 8px;
        padding: 2px 5px;
      }
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
  `;

  // View: Level Selection
  if (!selectedLevel) {
    const levelData = [
      { level: 1, title: 'Tahap 1', tag: 'KV', desc: 'Sebutan ringkas (Contoh: Ba · Ca)', icon: '1' },
      { level: 2, title: 'Tahap 2', tag: 'KVK', desc: 'Perkataan tertutup (Contoh: Ma · kan)', icon: '2' },
      { level: 3, title: 'Tahap 3', tag: 'AYAT PENDEK', desc: 'Gabungan perkataan (Buku Baru)', icon: '3' },
      { level: 4, title: 'Tahap 4', tag: 'AYAT PANJANG', desc: 'Membaca ayat penuh berserta makna', icon: '4' },
    ];

    return (
      <div style={{ background: DESIGN_SYSTEM.colors.bg, minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 2, width: '100%' }}>
        <style>{globalStyles}</style>

        {/* Header with Back Button and Stats */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', gap: '0.75rem', flexWrap: 'wrap', background: '#fff', borderBottom: `2px solid ${DESIGN_SYSTEM.colors.hair}` }}>
          <button
            onClick={onBack}
            style={{ background: '#fff', border: `2px solid ${DESIGN_SYSTEM.colors.hair}`, borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', color: DESIGN_SYSTEM.colors.muted, cursor: 'pointer', boxShadow: `0 3px 0 ${DESIGN_SYSTEM.colors.hair}`, transition: 'transform .12s', flexShrink: 0 }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <ArrowLeft size={24} />
          </button>

          {/* Stats Badges */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginLeft: 'auto', flexShrink: 0 }}>
            {/* Stars Badge */}
            <div style={{ background: '#fff', border: `2px solid ${DESIGN_SYSTEM.colors.hair}`, borderRadius: '999px', padding: '6px 12px', fontWeight: 800, fontSize: '0.85rem', color: '#FFC800', boxShadow: `0 3px 0 ${DESIGN_SYSTEM.colors.hair}`, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>⭐</span>
              <span className="desktop-stat">{displayStars} {language === 'bm' ? 'bintang' : 'stars'}</span>
              <span className="mobile-stat">{displayStars}</span>
            </div>

            {/* Hearts Badge */}
            <div style={{ background: '#fff', border: `2px solid ${DESIGN_SYSTEM.colors.hair}`, borderRadius: '999px', padding: '6px 12px', fontWeight: 800, fontSize: '0.85rem', color: '#FF4B4B', boxShadow: `0 3px 0 ${DESIGN_SYSTEM.colors.hair}`, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>❤️</span>
              <span className="desktop-stat">{displayHearts} {language === 'bm' ? 'nyawa' : 'hearts'}</span>
              <span className="mobile-stat">{displayHearts}</span>
            </div>

            {/* Gems Badge */}
            <div style={{ background: '#fff', border: `2px solid ${DESIGN_SYSTEM.colors.hair}`, borderRadius: '999px', padding: '6px 12px', fontWeight: 800, fontSize: '0.85rem', color: '#CE82FF', boxShadow: `0 3px 0 ${DESIGN_SYSTEM.colors.hair}`, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>💎</span>
              <span className="desktop-stat">{displayGems} {language === 'bm' ? 'permata' : 'gems'}</span>
              <span className="mobile-stat">{displayGems}</span>
            </div>
          </div>
        </div>

        {/* Floating Background Decorations */}
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
          <svg style={{ position: 'absolute', top: '8%', left: '6%', opacity: 0.5 }} width="34" height="34" viewBox="0 0 34 34" fill="#FF9600"><path d="M17 2l3 11 11 4-11 4-3 11-3-11L3 17l11-4z"/></svg>
          <svg style={{ position: 'absolute', top: '14%', right: '8%', opacity: 0.5 }} width="22" height="22" viewBox="0 0 24 24" fill="#1CB0F6"><circle cx="12" cy="12" r="10"/></svg>
          <svg style={{ position: 'absolute', bottom: '18%', left: '4%', opacity: 0.45 }} width="28" height="28" viewBox="0 0 24 24" fill="#CE82FF"><path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/></svg>
          <svg style={{ position: 'absolute', bottom: '8%', right: '6%', opacity: 0.5 }} width="30" height="30" viewBox="0 0 24 24" fill="#58CC02"><circle cx="12" cy="12" r="10"/></svg>
        </div>

        {/* Main Content - Single Scrollable Container */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 1rem' }}>

          {/* Hero Section */}
          <div className="hero-section">
            <div style={{ width: 96, height: 96, margin: '0 auto 4px', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'floaty 3.6s ease-in-out infinite' }}>
              <svg viewBox="0 0 100 100" width="92" height="92" fill="none">
                <defs>
                  <linearGradient id="bookL" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFF0CC"/><stop offset="1" stopColor="#FFD699"/></linearGradient>
                  <linearGradient id="bookR" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFC766"/><stop offset="1" stopColor="#FF9600"/></linearGradient>
                </defs>
                <ellipse cx="50" cy="88" rx="38" ry="5" fill="rgba(0,0,0,.12)"/>
                <path d="M10 30c12-6 28-6 38 2v52c-10-8-26-8-38-2V30Z" fill="url(#bookL)" stroke="#8F5300" strokeWidth="2.4" strokeLinejoin="round"/>
                <path d="M90 30c-12-6-28-6-38 2v52c10-8 26-8 38-2V30Z" fill="url(#bookR)" stroke="#8F5300" strokeWidth="2.4" strokeLinejoin="round"/>
                <path d="M48 32v52M52 32v52" stroke="#8F5300" strokeWidth="1.6"/>
                <path d="M18 44h22M18 50h18M18 56h22M18 62h16" stroke="rgba(143,83,0,.45)" strokeWidth="1.8" strokeLinecap="round"/>
                <path d="M60 44h22M60 50h18M60 56h22M60 62h16" stroke="rgba(255,255,255,.75)" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </div>
            <h1 className="hero-title">
              {language === 'bm' ? 'Kuasai Seni Membaca' : 'Master Reading'}
            </h1>
            <p className="hero-subtitle">
              {language === 'bm' ? 'Dari suku kata hingga ayat penuh. Mulai dari tahap mudah dan berkembang dengan kepercayaan diri!' : 'From syllables to complete sentences. Start easy and progress with confidence!'}
            </p>
          </div>

          {/* Level Tiles Grid */}
          <div className="level-grid">
            {levelData.map((lvl) => {
              const colorScheme = DESIGN_SYSTEM.levels[lvl.level];
              return (
                <button
                  key={lvl.level}
                  className="tile-button"
                  onClick={() => handleSelectLevel(lvl.level)}
                  onMouseEnter={playHoverSound}
                  style={{
                    position: 'relative',
                    border: 0,
                    cursor: 'pointer',
                    padding: 0,
                    width: '100%',
                    fontFamily: 'inherit',
                    background: `linear-gradient(180deg, ${colorScheme.c1} 0%, ${colorScheme.c2} 55%, ${colorScheme.c3} 100%)`,
                    boxShadow: `0 0 0 5px ${DESIGN_SYSTEM.bezel[1]}, 0 0 0 8px ${DESIGN_SYSTEM.bezel[2]}, 0 0 0 9px ${DESIGN_SYSTEM.bezel[3]}, 0 12px 0 -2px ${colorScheme.cd}, 0 22px 28px -10px rgba(0,0,0,.22)`,
                    overflow: 'hidden',
                    textAlign: 'left',
                    color: '#fff',
                  }}
                  onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(-4px) rotate(-1deg)'; e.currentTarget.style.boxShadow = `0 0 0 5px ${DESIGN_SYSTEM.bezel[1]}, 0 0 0 8px ${DESIGN_SYSTEM.bezel[2]}, 0 0 0 9px ${DESIGN_SYSTEM.bezel[3]}, 0 16px 0 -2px ${colorScheme.cd}, 0 30px 38px -10px rgba(0,0,0,.28)`; }}
                  onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 0 0 5px ${DESIGN_SYSTEM.bezel[1]}, 0 0 0 8px ${DESIGN_SYSTEM.bezel[2]}, 0 0 0 9px ${DESIGN_SYSTEM.bezel[3]}, 0 12px 0 -2px ${colorScheme.cd}, 0 22px 28px -10px rgba(0,0,0,.22)`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 0 0 5px ${DESIGN_SYSTEM.bezel[1]}, 0 0 0 8px ${DESIGN_SYSTEM.bezel[2]}, 0 0 0 9px ${DESIGN_SYSTEM.bezel[3]}, 0 12px 0 -2px ${colorScheme.cd}, 0 22px 28px -10px rgba(0,0,0,.22)`; }}
                >
                  {/* Glossy highlight */}
                  <div style={{ content: '""', position: 'absolute', top: 8, left: 18, right: 18, height: '42%', borderRadius: '28px 28px 80% 80%', background: 'linear-gradient(180deg, rgba(255,255,255,.55) 0%, rgba(255,255,255,.12) 70%, transparent 100%)', pointerEvents: 'none', zIndex: 1 }} />

                  {/* Number Badge */}
                  <div style={{ position: 'absolute', top: 14, left: 14, zIndex: 3, width: 56, height: 56, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 34, color: colorScheme.cd, boxShadow: `0 4px 0 rgba(0,0,0,.18), 0 0 0 4px rgba(255,255,255,.4)` }}>
                    {lvl.icon}
                  </div>

                  {/* Corner Star */}
                  <svg style={{ position: 'absolute', top: 10, right: 10, zIndex: 3, transform: 'rotate(12deg)', animation: 'spin 6s linear infinite', opacity: 0.95 }} width="44" height="44" viewBox="0 0 24 24" fill="#FFE066">
                    <path d="M12 2l2.6 6.4L21 9l-5 4.4L17.4 20 12 16.7 6.6 20 8 13.4 3 9l6.4-.6L12 2z"/>
                  </svg>

                  {/* Illustration */}
                  <div style={{ position: 'absolute', top: 14, left: 0, right: 0, bottom: 130, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, minHeight: '140px' }}>
                    {getTileIllustration(lvl.level)}
                  </div>

                  {/* Bottom Plate */}
                  <div style={{ position: 'absolute', bottom: 14, left: 14, right: 14, background: '#fff', borderRadius: 22, padding: '14px 16px 12px', boxShadow: '0 4px 0 rgba(0,0,0,.08)', zIndex: 3 }}>
                    <div className="plate-title">
                      {lvl.title}
                      <span className="plate-tag" style={{ background: colorScheme.c3, boxShadow: `0 2px 0 ${colorScheme.cd}` }}>
                        {lvl.tag}
                      </span>
                    </div>
                    <div className="plate-desc">
                      {lvl.desc}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                      <div style={{ display: 'flex', gap: 2 }}>
                        {[0, 0, 0].map((_, i) => (
                          <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill={i === 0 ? '#F4B400' : '#E5E0D2'}>
                            <path d="M12 2.6 14.7 8.4l6.3.6-4.7 4.3 1.4 6.2L12 16.7l-5.7 2.8 1.4-6.2L3 9l6.3-.6L12 2.6Z"/>
                          </svg>
                        ))}
                      </div>
                      <div style={{ width: 38, height: 38, borderRadius: '50%', background: `radial-gradient(circle at 50% 30%, ${colorScheme.c1} 0%, ${colorScheme.c2} 55%, ${colorScheme.c3} 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 3px 0 ${colorScheme.cd}, 0 0 0 2px rgba(255,255,255,.7), 0 6px 10px -4px rgba(0,0,0,.25)`, position: 'relative' }}>
                        <div style={{ content: '""', position: 'absolute', top: 4, left: 7, right: 7, height: 10, borderRadius: '50%', background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,.9), transparent 70%)' }} />
                        <Play size={18} fill="#fff" color="#fff" style={{ position: 'relative', zIndex: 2, filter: `drop-shadow(0 1px 0 ${colorScheme.cd})` }} />
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // View: Flashcard Interface
  const theme = getTheme(selectedLevel);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: DESIGN_SYSTEM.colors.bg }}>
      <style>{globalStyles}</style>

      {/* Header with Script Buttons - Fixed */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', gap: '0.75rem', flexWrap: 'wrap', background: '#fff', borderBottom: `2px solid ${DESIGN_SYSTEM.colors.hair}`, flexShrink: 0 }}>
        <button
          onClick={() => setSelectedLevel(null)}
          style={{ background: '#fff', border: `2px solid ${DESIGN_SYSTEM.colors.hair}`, borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', color: DESIGN_SYSTEM.colors.muted, cursor: 'pointer', boxShadow: `0 3px 0 ${DESIGN_SYSTEM.colors.hair}`, transition: 'transform .12s' }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          <ArrowLeft size={24} />
        </button>

        {/* Script Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flex: 1 }}>
          {SCRIPTS.map(script => (
            <button
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

        {/* Stats Badges */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {/* Stars Badge */}
          <div style={{ background: '#fff', border: `2px solid ${DESIGN_SYSTEM.colors.hair}`, borderRadius: '999px', padding: '6px 12px', fontWeight: 800, fontSize: '0.85rem', color: '#FFC800', boxShadow: `0 3px 0 ${DESIGN_SYSTEM.colors.hair}`, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>⭐</span>
            <span className="desktop-stat">{displayStars} {language === 'bm' ? 'bintang' : 'stars'}</span>
            <span className="mobile-stat">{displayStars}</span>
          </div>

          {/* Hearts Badge */}
          <div style={{ background: '#fff', border: `2px solid ${DESIGN_SYSTEM.colors.hair}`, borderRadius: '999px', padding: '6px 12px', fontWeight: 800, fontSize: '0.85rem', color: '#FF4B4B', boxShadow: `0 3px 0 ${DESIGN_SYSTEM.colors.hair}`, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>❤️</span>
            <span className="desktop-stat">{displayHearts} {language === 'bm' ? 'nyawa' : 'hearts'}</span>
            <span className="mobile-stat">{displayHearts}</span>
          </div>

          {/* Gems Badge */}
          <div style={{ background: '#fff', border: `2px solid ${DESIGN_SYSTEM.colors.hair}`, borderRadius: '999px', padding: '6px 12px', fontWeight: 800, fontSize: '0.85rem', color: '#CE82FF', boxShadow: `0 3px 0 ${DESIGN_SYSTEM.colors.hair}`, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>💎</span>
            <span className="desktop-stat">{displayGems} {language === 'bm' ? 'permata' : 'gems'}</span>
            <span className="mobile-stat">{displayGems}</span>
          </div>
        </div>

        <div style={{ background: '#fff', border: `2px solid ${DESIGN_SYSTEM.colors.hair}`, borderRadius: '999px', padding: '6px 16px', fontWeight: 800, color: theme.color, fontSize: '0.9rem', boxShadow: `0 3px 0 ${DESIGN_SYSTEM.colors.hair}` }}>
          Tahap {selectedLevel} {currentIndex + 1}/{currentLevelData.length}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-stat {
            display: none !important;
          }
          .mobile-stat {
            display: inline !important;
          }
        }
      `}</style>

      {/* Main Content - Single Scrollable Container */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', padding: '1rem' }}>

        {/* Flashcard Box */}
        <div className="flashcard-box" style={{
          background: '#fff',
          boxShadow: `0 12px 0 ${theme.shadow}, 0 22px 28px -10px rgba(0,0,0,.22)`, position: 'relative',
        }}>

          {/* Sound Button */}
          <button
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
