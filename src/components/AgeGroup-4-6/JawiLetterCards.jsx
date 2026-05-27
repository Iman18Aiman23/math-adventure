import React, { useState, useCallback } from 'react';
import { Volume2, ChevronLeft, ChevronRight } from 'lucide-react';
import { playHoverSound } from '../../utils/soundManager';
import SpeechManager from '../../services/SpeechManager';
import { JAWI_ALPHABET } from '../../utils/jawiData';
import BackButton from '../BackButton';

// Age 4-6 Jawi — Sequential Huruf Jawi learning cards (read right-to-left)
const CARD_COLORS = [
  '#FF6B9D','#FF9800','#58CC02','#2196F3','#9C27B0','#00BCD4',
  '#F44336','#673AB7','#4CAF50','#FF5722','#E91E8C','#009688',
  '#3F51B5','#FF9800','#8BC34A','#FF5722','#607D8B','#E91E8C',
  '#FF6B9D','#2196F3','#9C27B0','#58CC02','#FF9800','#00BCD4',
  '#F44336','#673AB7','#4CAF50','#FF5722','#E91E8C','#009688',
  '#3F51B5','#FF9800','#8BC34A','#FF5722','#607D8B','#E91E8C',
];

const JAWI_FONT = "'Traditional Arabic','Scheherazade New','Amiri','Noto Naskh Arabic',serif";

export default function JawiLetterCards({ onBack, language = 'bm' }) {
  const [index, setIndex] = useState(0);
  const item  = JAWI_ALPHABET[index];
  const color = CARD_COLORS[index % CARD_COLORS.length];

  const handleListen = useCallback(() => {
    playHoverSound();
    SpeechManager.speak(item.rumi, 'ms');
  }, [item]);

  const handlePrev = useCallback(() => setIndex(i => Math.max(0, i - 1)), []);
  const handleNext = useCallback(() => setIndex(i => Math.min(JAWI_ALPHABET.length - 1, i + 1)), []);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#E6FFD4', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />

      {/* Header */}
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <h1 style={{ color: '#58CC02', marginBottom: '0.25rem', fontSize: '1.6rem' }}>
            {language === 'bm' ? 'Belajar Huruf Jawi' : 'Learn Jawi Letters'}
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Tekan kad untuk dengar nama huruf' : 'Tap the card to hear the letter name'}
          </p>
        </div>

        {/* Progress bar */}
        <div style={{ background: '#C8F0A8', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
          <div style={{ background: '#58CC02', height: '100%', borderRadius: '999px', width: `${((index + 1) / JAWI_ALPHABET.length) * 100}%`, transition: 'width 0.3s' }} />
        </div>
        <p style={{ textAlign: 'center', color: '#888', fontSize: '0.78rem', marginTop: '0.35rem' }}>
          {index + 1} / {JAWI_ALPHABET.length}
        </p>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>

        {/* Flashcard — tap to listen */}
        <button
          onClick={handleListen}
          style={{ width: '100%', background: color, borderRadius: '20px', border: 'none', cursor: 'pointer', padding: '1.75rem 1rem', boxShadow: `0 6px 0 ${color}CC`, textAlign: 'center', transition: 'transform 0.1s', WebkitTapHighlightColor: 'transparent' }}
          onPointerDown={e => e.currentTarget.style.transform = 'translateY(3px)'}
          onPointerUp={e => e.currentTarget.style.transform = ''}
          onPointerLeave={e => e.currentTarget.style.transform = ''}
        >
          {/* Big Jawi glyph */}
          <div style={{ fontSize: '7rem', fontWeight: 900, color: 'white', lineHeight: 1.15, textShadow: '0 3px 8px rgba(0,0,0,0.25)', marginBottom: '0.5rem', fontFamily: JAWI_FONT, direction: 'rtl' }}>
            {item.jawi}
          </div>

          {/* Rumi name */}
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
            {item.rumi}
          </div>

          {/* Listen cue */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(255,255,255,0.25)', borderRadius: '999px', padding: '0.35rem 1rem', fontSize: '0.85rem', color: 'white', fontWeight: 700 }}>
            <Volume2 size={15} />
            {language === 'bm' ? 'Tekan untuk dengar' : 'Tap to listen'}
          </div>
        </button>

        {/* Right-to-left reminder */}
        <p style={{ textAlign: 'center', color: '#46A302', fontSize: '0.82rem', fontWeight: 700, marginTop: '0.85rem' }}>
          {language === 'bm' ? '👈 Jawi dibaca dari kanan ke kiri' : '👈 Jawi is read right to left'}
        </p>

        {/* Letter grid — quick jump (right-to-left) */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', justifyContent: 'center', marginTop: '0.85rem', direction: 'rtl' }}>
          {JAWI_ALPHABET.map((l, i) => (
            <button key={i} onClick={() => setIndex(i)}
              style={{ width: '36px', height: '36px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: i === index ? CARD_COLORS[i % CARD_COLORS.length] : i < index ? '#A8D5A2' : '#E0E0E0', color: i === index ? 'white' : i < index ? '#555' : '#999', fontWeight: 900, fontSize: '1.1rem', fontFamily: JAWI_FONT, transition: 'all 0.15s' }}>
              {l.jawi}
            </button>
          ))}
        </div>
      </div>

      {/* Footer nav */}
      <div style={{ flexShrink: 0, background: '#E6FFD4', borderTop: '2px solid rgba(88,204,2,0.25)', padding: '0.75rem 1rem', display: 'flex', gap: '0.75rem' }}>
        <button onClick={handlePrev} disabled={index === 0}
          className="ee-btn ee-btn--ghost" style={{ flex: 1, '--btn-bg': '#58CC02' }}>
          <ChevronLeft size={18} />
          {language === 'bm' ? 'Sebelum' : 'Prev'}
        </button>
        <button onClick={handleNext} disabled={index === JAWI_ALPHABET.length - 1}
          className="ee-btn" style={{ flex: 1, '--btn-bg': '#58CC02', '--btn-shadow': '#46A302' }}>
          {language === 'bm' ? 'Seterusnya' : 'Next'}
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
