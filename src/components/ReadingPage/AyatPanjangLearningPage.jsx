import React, { useState } from 'react';
import './ReadingPage.css';
import { readingData } from '../../data/curriculum/readingData';
import { Volume2, ArrowLeft } from 'lucide-react';
import { playHoverSound } from '../../utils/soundManager';
import SpeechManager from '../../services/SpeechManager';

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
  levels: {
    4: { c1: '#E6FFD4', c2: '#58CC02', c3: '#46A302', cd: '#2E6B00' },
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
  4: { color: '#58CC02', bg: '#E6FFD4', shadow: '#B3E080', darkColor: '#46A302' },
};

const getTheme = (level) => LEVEL_THEMES[level] || LEVEL_THEMES[4];

// ── Global Styles ─────────────────────────────────────────────────────────────
const globalStyles = `
  .flashcard-box {
    border-radius: 24px;
    padding: 2.4rem 1.8rem;
    max-width: 600px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
  .nav-controls {
    display: flex;
    gap: 0.75rem;
    padding: 1rem;
    padding-bottom: calc(1rem + env(safe-area-inset-bottom, 0px));
    background: #fff;
    border-top: 2px solid #E5E5E5;
    flex-shrink: 0;
  }
  @keyframes floaty {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
  }
  @keyframes modalFadeIn {
    from { opacity: 0; transform: translateY(-12px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export default function AyatPanjangLearningPage({ onBack, language }) {
  // ── State ─────────────────────────────────────────────────────────────
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scriptType, setScriptType] = useState('RUMI'); // 'RUMI', 'JAWI', or 'ENG'
  const [showHelp, setShowHelp] = useState(false);
  const [activeSyllable, setActiveSyllable] = useState(null);

  // ── Level data ─────────────────────────────────────────────────────────
  const levelData = readingData.filter(item => item.level === 4);
  const currentItem = levelData[currentIndex] || null;
  const theme = getTheme(4);

  // ── Handlers ──────────────────────────────────────────────────────────
  const handleNext = () => {
    if (currentIndex < levelData.length - 1) {
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

  return (
    <div className="reading-page-wrapper" style={{ display: 'flex', flexDirection: 'column', height: '100%', background: DESIGN_SYSTEM.colors.bg, position: 'relative' }}>
      <style>{globalStyles}</style>

      {/* Back Button - Top Left */}
      <button
        type="button"
        onClick={onBack}
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
                );
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
          disabled={currentIndex === levelData.length - 1}
          style={{
            flex: 1, padding: '0.9rem 1.2rem', borderRadius: '16px', border: 'none',
            background: currentIndex === levelData.length - 1 ? '#E5E5E5' : theme.color,
            color: '#fff', fontWeight: 900, fontSize: '1rem',
            cursor: currentIndex === levelData.length - 1 ? 'not-allowed' : 'pointer',
            boxShadow: currentIndex === levelData.length - 1 ? 'none' : `0 4px 0 ${theme.darkColor}`,
            transition: 'transform .12s'
          }}
          onMouseEnter={(e) => { if (currentIndex < levelData.length - 1) e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          {language === 'bm' ? 'Seterusnya' : 'Next'} {'>'}
        </button>
      </div>
    </div>
  );
}
