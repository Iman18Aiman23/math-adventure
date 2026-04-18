import React, { useState, useEffect } from 'react';
import { readingData } from '../data/curriculum/readingData';
import { ChevronLeft, ChevronRight, Volume2, HelpCircle, ArrowLeft } from 'lucide-react';
import { playHoverSound, playSound } from '../utils/soundManager';
import SpeechManager from '../services/SpeechManager';

export default function ReadingPage({ onBack, language }) {
  // ── State ─────────────────────────────────────────────────────────────
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scriptType, setScriptType] = useState('RUMI'); // 'RUMI', 'JAWI', or 'ENG'
  const [showHelp, setShowHelp] = useState(false);
  const [activeSyllable, setActiveSyllable] = useState(null);

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
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%', background: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
          <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: '#AFAFAF', cursor: 'pointer' }}>
            <ArrowLeft size={28} />
          </button>
          <h1 style={{ flex: 1, textAlign: 'center', fontSize: '1.5rem', fontWeight: 900, color: '#3C3C3C', margin: 0 }}>
            {language === 'bm' ? 'Pilih Tahap' : 'Select Level'}
          </h1>
          <div style={{ width: 28 }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { level: 1, title: 'Tahap 1 (KV)', desc: 'Sebutan ringkas (Contoh: Ba-ca)', color: '#FF9600', bg: '#FFF0CC' },
            { level: 2, title: 'Tahap 2 (KVK)', desc: 'Perkataan tertutup (Contoh: Ma-kan)', color: '#1CB0F6', bg: '#D0F0FF' },
            { level: 3, title: 'Tahap 3 (Ayat Pendek)', desc: 'Gabungan perkataan (Contoh: Buku Baru)', color: '#CE82FF', bg: '#EDD9FF' },
            { level: 4, title: 'Tahap 4 (Ayat Panjang)', desc: 'Membaca ayat penuh berserta makna', color: '#58CC02', bg: '#E0FFD4' },
          ].map(lvl => (
            <button
              key={lvl.level}
              onClick={() => handleSelectLevel(lvl.level)}
              style={{
                display: 'flex', alignItems: 'center', padding: '1.25rem',
                background: '#fff', border: `3px solid ${lvl.bg}`, borderRadius: '20px',
                cursor: 'pointer', transition: 'transform 0.1s, borderColor 0.2s',
                boxShadow: '0 4px 0 #E5E5E5', textAlign: 'left'
              }}
              onMouseEnter={playHoverSound}
            >
              <div style={{ background: lvl.color, color: '#fff', fontSize: '1.4rem', fontWeight: 900, width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '1rem' }}>
                {lvl.level}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#3C3C3C' }}>{lvl.title}</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#AFAFAF' }}>{lvl.desc}</div>
              </div>
              <ChevronRight size={24} color="#AFAFAF" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  // View: Flashcard Interface
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F7F7F7', padding: '1rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <button onClick={() => setSelectedLevel(null)} style={{ background: '#fff', border: '2px solid #E5E5E5', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#AFAFAF', cursor: 'pointer' }}>
          <ArrowLeft size={24} />
        </button>
        <div style={{ background: '#fff', border: '2px solid #E5E5E5', borderRadius: '999px', padding: '6px 16px', fontWeight: 800, color: '#FF9600' }}>
          Tahap {selectedLevel} 
          <span style={{ color: '#AFAFAF', marginLeft: '8px', fontSize: '0.9rem' }}>{currentIndex + 1}/{currentLevelData.length}</span>
        </div>
        <button onClick={toggleScript} style={{ background: scriptType === 'JAWI' ? '#CE82FF' : scriptType === 'ENG' ? '#FF9600' : '#1CB0F6', border: 'none', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer', fontWeight: 800, fontSize: '0.8rem', boxShadow: '0 4px 0 rgba(0,0,0,0.1)' }}>
          {scriptType}
        </button>
      </div>

      {/* Main Card */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
        
        {/* Flashcard Box */}
        <div style={{
          width: '100%', maxWidth: '400px', background: '#fff', borderRadius: '24px', 
          boxShadow: '0 8px 0 #E5E5E5', padding: '2.5rem 1.5rem', position: 'relative',
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
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button 
          onClick={handlePrev}
          disabled={currentIndex === 0}
          style={{ flex: 1, padding: '1.1rem', borderRadius: '16px', border: 'none', background: currentIndex === 0 ? '#E5E5E5' : '#fff', color: currentIndex === 0 ? '#AFAFAF' : '#1CB0F6', fontWeight: 800, fontSize: '1.1rem', cursor: currentIndex === 0 ? 'not-allowed' : 'pointer', boxShadow: currentIndex === 0 ? 'none' : '0 4px 0 #E5E5E5' }}
        >
          {language === 'bm' ? 'SEBELUM' : 'PREV'}
        </button>
        <button 
          onClick={handleNext}
          disabled={currentIndex === currentLevelData.length - 1}
          style={{ flex: 1, padding: '1.1rem', borderRadius: '16px', border: 'none', background: currentIndex === currentLevelData.length - 1 ? '#E5E5E5' : '#58CC02', color: '#fff', fontWeight: 800, fontSize: '1.1rem', cursor: currentIndex === currentLevelData.length - 1 ? 'not-allowed' : 'pointer', boxShadow: currentIndex === currentLevelData.length - 1 ? 'none' : '0 4px 0 #58A700' }}
        >
          {language === 'bm' ? 'SETERUSNYA' : 'NEXT'}
        </button>
      </div>

    </div>
  );
}
