import React, { useState, useEffect } from 'react';
import { readingData } from '../data/curriculum/readingData';
import { ChevronLeft, ChevronRight, Volume2, HelpCircle, ArrowLeft } from 'lucide-react';
import { playHoverSound, playSound } from '../utils/soundManager';
import SpeechManager from '../services/SpeechManager';
import KVLearningPage from './KVLearningPage';
import KVKLearningPage from './KVKLearningPage';

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

export default function ReadingPage({ onBack, language }) {
  // ── State ─────────────────────────────────────────────────────────────
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scriptType, setScriptType] = useState('RUMI'); // 'RUMI', 'JAWI', or 'ENG'
  const [showHelp, setShowHelp] = useState(false);
  const [activeSyllable, setActiveSyllable] = useState(null);

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

  const toggleScript = () => {
    playHoverSound();
    setScriptType(prev => {
      if (prev === 'RUMI') return 'JAWI';
      if (prev === 'JAWI') return 'ENG';
      return 'RUMI';
    });
    setActiveSyllable(null);
    setShowHelp(false);
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

  // View: Level Selection
  if (!selectedLevel) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', background: '#f7f7f7' }}>
        {/* Header */}
        <div style={{
          background: '#fff', borderBottom: '2px solid #E5E5E5',
          padding: '0 1rem', height: '56px',
          display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0,
        }}>
          <button onClick={onBack} style={{ background: 'transparent', color: '#AFAFAF', display: 'flex', alignItems: 'center', fontSize: '1.3rem' }}>
            ←
          </button>
          <div style={{ flex: 1, textAlign: 'center', fontWeight: 900, fontSize: '1rem', color: '#3C3C3C' }}>
            📖 {language === 'bm' ? 'Pilih Tahap' : 'Select Level'}
          </div>
          <div style={{ width: 24 }} />
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 1rem' }}>

        <div className="bm-hero">
          <div className="bm-hero-emoji">📖</div>
          <h2 className="bm-hero-title">{language === 'bm' ? 'Kuasai Seni Membaca' : 'Master the Art of Reading'}</h2>
          <p className="bm-hero-subtitle">{language === 'bm' ? 'Dari suku kata hingga ayat penuh. Mulai dari tahap mudah dan berkembang dengan kepercayaan diri!' : 'From syllables to complete sentences. Start easy and progress with confidence!'}</p>
        </div>

        <div className="reading-level-grid">
          {[
            { level: 1, title: 'Tahap 1 (KV)', desc: 'Sebutan ringkas (Contoh: Ba-ca)', color: '#FF9600' },
            { level: 2, title: 'Tahap 2 (KVK)', desc: 'Perkataan tertutup (Contoh: Ma-kan)', color: '#1CB0F6' },
            { level: 3, title: 'Tahap 3 (Ayat Pendek)', desc: 'Gabungan perkataan (Contoh: Buku Baru)', color: '#CE82FF' },
            { level: 4, title: 'Tahap 4 (Ayat Panjang)', desc: 'Membaca ayat penuh berserta makna', color: '#58CC02' },
          ].map(lvl => (
            <button
              key={lvl.level}
              className="reading-level-card fade-in"
              onClick={() => handleSelectLevel(lvl.level)}
              style={{ '--level-color': lvl.color }}
              onMouseEnter={playHoverSound}
            >
              <div className="reading-level-icon" style={{ background: lvl.color }}>
                {lvl.level}
              </div>
              <div className="reading-level-info">
                <div className="reading-level-title">{lvl.title}</div>
                <div className="reading-level-desc">{lvl.desc}</div>
              </div>
              <div className="reading-level-arrow">›</div>
            </button>
          ))}
        </div>
        </div>
      </div>
    );
  }

  // View: Flashcard Interface
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F7F7F7', padding: '1rem' }}>

      {/* Header with Script Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button onClick={() => setSelectedLevel(null)} style={{ background: '#fff', border: '2px solid #E5E5E5', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#AFAFAF', cursor: 'pointer' }}>
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
              }}
            >
              {script.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#fff', border: '2px solid #E5E5E5', borderRadius: '999px', padding: '6px 16px', fontWeight: 800, color: getTheme(selectedLevel).color, fontSize: '0.9rem' }}>
          Tahap {selectedLevel} {currentIndex + 1}/{currentLevelData.length}
        </div>
      </div>

      {/* Main Card */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>

        {/* Flashcard Box */}
        <div style={{
          width: '100%', maxWidth: '400px', background: '#fff', borderRadius: '24px',
          boxShadow: `0 8px 0 ${getTheme(selectedLevel).shadow}`, padding: '2.5rem 1.5rem', position: 'relative',
          display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '320px', justifyContent: 'center'
        }}>
          
          {/* Help/Sound Toggle Button */}
          <button 
            onClick={handleVolumeClick} 
            title="Read Full Text"
            style={{ position: 'absolute', top: 16, right: 16, background: '#f0f0f0', border: 'none', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1CB0F6', cursor: 'pointer', transition: 'transform 0.1s' }}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.9)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Volume2 size={22} />
          </button>

          <span style={{ fontSize: '4rem', marginBottom: '1rem', animation: 'bounce 2.5s ease-in-out infinite' }}>
            {currentItem?.emoji}
          </span>

          {/* Rumi / Syllables Display */}
          {scriptType === 'RUMI' && (
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
              {currentItem?.syllables.map((syl, i) => {
                const cleanSyl = syl.trim();
                const isActive = activeSyllable === i;
                return (
                  <button
                    key={i}
                    onClick={() => handleSyllableClick(i, cleanSyl)}
                    style={{
                      background: isActive ? '#1CB0F6' : '#D0F0FF',
                      color: isActive ? '#fff' : '#3C3C3C',
                      border: '2px solid',
                      borderColor: isActive ? '#1899D6' : '#1CB0F6',
                      borderRadius: '16px',
                      padding: '12px 20px',
                      fontSize: '1.8rem',
                      fontWeight: 900,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      transform: isActive ? 'scale(1.1)' : 'scale(1)',
                      boxShadow: isActive ? '0 6px 12px rgba(28,176,246,0.3)' : 'none',
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
                color: activeSyllable === 0 ? '#fff' : '#3C3C3C', 
                direction: 'rtl', fontFamily: '"Lateef", serif', lineHeight: 1.5,
                textAlign: 'center', 
                background: activeSyllable === 0 ? '#CE82FF' : '#EDD9FF', 
                border: `2px solid ${activeSyllable === 0 ? '#A451E0' : '#CE82FF'}`,
                borderRadius: '16px', padding: '12px 24px', cursor: 'pointer', width: '100%',
                transition: 'all 0.15s ease',
                transform: activeSyllable === 0 ? 'scale(1.05)' : 'scale(1)'
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
                fontSize: '2.5rem', fontWeight: 900, 
                color: activeSyllable === 0 ? '#fff' : '#FF9600', 
                textAlign: 'center', lineHeight: 1.3, 
                background: activeSyllable === 0 ? '#FF9600' : '#FFF0CC', 
                border: `2px solid ${activeSyllable === 0 ? '#D47A00' : '#FFD166'}`,
                borderRadius: '16px', padding: '12px 24px', cursor: 'pointer', width: '100%',
                transition: 'all 0.15s ease',
                transform: activeSyllable === 0 ? 'scale(1.05)' : 'scale(1)'
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
            <div style={{ marginTop: '2rem', width: '100%', background: '#F0FFF0', borderRadius: '16px', border: '2px solid #58CC02', padding: '1rem', textAlign: 'center', animation: 'modalFadeIn 0.2s ease-out' }}>
              <div style={{ color: '#58CC02', fontWeight: 900, fontSize: '1.2rem', marginBottom: '4px' }}>
                {currentItem?.eng}
              </div>
              <div style={{ color: '#777', fontWeight: 700, fontSize: '0.95rem' }}>
                🗣️ "{currentItem?.phonetic}"
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Controls */}
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', alignItems: 'center' }}>
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          style={{
            width: '44px', height: '44px', borderRadius: '12px', border: 'none',
            background: currentIndex === 0 ? '#E5E5E5' : '#fff',
            color: currentIndex === 0 ? '#AFAFAF' : '#AFAFAF',
            fontWeight: 900, fontSize: '1.2rem', cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
            boxShadow: currentIndex === 0 ? 'none' : '0 4px 0 #E5E5E5',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0
          }}
        >
          {'<'}
        </button>

        {/* Listen Button */}
        <button
          onClick={handleVolumeClick}
          style={{
            flex: 1, padding: '0.9rem 1.2rem', borderRadius: '16px',
            border: `2px solid ${getTheme(selectedLevel).color}`,
            background: '#fff', color: getTheme(selectedLevel).color, fontWeight: 900, fontSize: '1rem',
            cursor: 'pointer', boxShadow: `0 4px 0 ${getTheme(selectedLevel).shadow}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
          }}
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
            background: currentIndex === currentLevelData.length - 1 ? '#E5E5E5' : getTheme(selectedLevel).color,
            color: '#fff', fontWeight: 900, fontSize: '1rem',
            cursor: currentIndex === currentLevelData.length - 1 ? 'not-allowed' : 'pointer',
            boxShadow: currentIndex === currentLevelData.length - 1 ? 'none' : `0 4px 0 ${getTheme(selectedLevel).darkColor}`
          }}
        >
          {language === 'bm' ? 'Seterusnya' : 'Next'} {'>'}
        </button>
      </div>

    </div>
  );
}
