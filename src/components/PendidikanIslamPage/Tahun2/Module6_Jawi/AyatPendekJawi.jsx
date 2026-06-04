import React, { useState } from 'react';
import { ayatPendekData } from './ayatPendekData';
import { ChevronLeft, ChevronRight, Volume2, ArrowLeft } from 'lucide-react';
import { playHoverSound } from '../../../../utils/soundManager';
import SpeechManager from '../../../../services/SpeechManager';

const SCRIPTS = [
  { key: 'RUMI', label: 'RUMI', color: '#1CB0F6', bg: '#D0F0FF' },
  { key: 'ENG',  label: 'ENG',  color: '#FF9600', bg: '#FFF0CC' },
  { key: 'JAWI', label: 'JAWI', color: '#CE82FF', bg: '#EDD9FF' },
];

const LEVEL_THEMES = {
  3: { color: '#CE82FF', bg: '#EDD9FF', shadow: '#E6B3FF', darkColor: '#9B59B6' },
};

const getTheme = (level) => LEVEL_THEMES[level] || LEVEL_THEMES[3];

export default function AyatPendekJawi({ onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scriptType, setScriptType] = useState('JAWI');
  const [showHelp, setShowHelp] = useState(false);
  const [activeSyllable, setActiveSyllable] = useState(null);

  const currentLevelData = ayatPendekData.filter(item => item.level === 3);
  const currentItem = currentLevelData[currentIndex] || null;

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F7F7F7', padding: '1rem' }}>

      {/* Header with Script Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button onClick={onBack} style={{ background: '#fff', border: '2px solid #E5E5E5', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#AFAFAF', cursor: 'pointer' }}>
          <ArrowLeft size={24} />
        </button>

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

        <div style={{ background: '#fff', border: '2px solid #E5E5E5', borderRadius: '999px', padding: '6px 16px', fontWeight: 800, color: getTheme(3).color, fontSize: '0.9rem' }}>
          {currentIndex + 1}/{currentLevelData.length}
        </div>
      </div>

      {/* Main Card */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>

        <div style={{
          width: '100%', maxWidth: '400px', background: '#fff', borderRadius: '24px',
          boxShadow: `0 8px 0 ${getTheme(3).shadow}`, padding: '2.5rem 1.5rem', position: 'relative',
          display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '320px', justifyContent: 'center'
        }}>

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

        <button
          onClick={handleVolumeClick}
          style={{
            flex: 1, padding: '0.9rem 1.2rem', borderRadius: '16px',
            border: `2px solid ${getTheme(3).color}`,
            background: '#fff', color: getTheme(3).color, fontWeight: 900, fontSize: '1rem',
            cursor: 'pointer', boxShadow: `0 4px 0 ${getTheme(3).shadow}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
          }}
        >
          <Volume2 size={20} />
          Dengar
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === currentLevelData.length - 1}
          style={{
            flex: 1, padding: '0.9rem 1.2rem', borderRadius: '16px', border: 'none',
            background: currentIndex === currentLevelData.length - 1 ? '#E5E5E5' : getTheme(3).color,
            color: '#fff', fontWeight: 900, fontSize: '1rem',
            cursor: currentIndex === currentLevelData.length - 1 ? 'not-allowed' : 'pointer',
            boxShadow: currentIndex === currentLevelData.length - 1 ? 'none' : `0 4px 0 ${getTheme(3).darkColor}`
          }}
        >
          Seterusnya {'>'}
        </button>
      </div>

    </div>
  );
}
