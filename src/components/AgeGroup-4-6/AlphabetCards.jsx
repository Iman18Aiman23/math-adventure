import React, { useState, useCallback } from 'react';
import { Volume2, ChevronLeft, ChevronRight } from 'lucide-react';
import { playHoverSound } from '../../utils/soundManager';
import SpeechManager from '../../services/SpeechManager';
import BackButton from '../BackButton';

// Age 4-6 — Sequential A-Z alphabet learning cards
const LETTERS = [
  { letter: 'A', word_bm: 'Ayam',          word_eng: 'Chicken',    emoji: '🐔' },
  { letter: 'B', word_bm: 'Bola',          word_eng: 'Ball',       emoji: '⚽' },
  { letter: 'C', word_bm: 'Coklat',        word_eng: 'Chocolate',  emoji: '🍫' },
  { letter: 'D', word_bm: 'Duit',          word_eng: 'Money',      emoji: '💰' },
  { letter: 'E', word_bm: 'Epal',          word_eng: 'Apple',      emoji: '🍎' },
  { letter: 'F', word_bm: 'Feri',          word_eng: 'Ferry',      emoji: '⛴️' },
  { letter: 'G', word_bm: 'Gajah',         word_eng: 'Elephant',   emoji: '🐘' },
  { letter: 'H', word_bm: 'Harimau',       word_eng: 'Tiger',      emoji: '🐯' },
  { letter: 'I', word_bm: 'Ikan',          word_eng: 'Fish',       emoji: '🐟' },
  { letter: 'J', word_bm: 'Jam',           word_eng: 'Clock',      emoji: '⏰' },
  { letter: 'K', word_bm: 'Kucing',        word_eng: 'Cat',        emoji: '🐱' },
  { letter: 'L', word_bm: 'Layang-layang', word_eng: 'Kite',       emoji: '🪁' },
  { letter: 'M', word_bm: 'Monyet',        word_eng: 'Monkey',     emoji: '🐒' },
  { letter: 'N', word_bm: 'Nanas',         word_eng: 'Pineapple',  emoji: '🍍' },
  { letter: 'O', word_bm: 'Oren',          word_eng: 'Orange',     emoji: '🍊' },
  { letter: 'P', word_bm: 'Pisang',        word_eng: 'Banana',     emoji: '🍌' },
  { letter: 'Q', word_bm: 'Quran',         word_eng: 'Quran',      emoji: '📖' },
  { letter: 'R', word_bm: 'Rama-rama',     word_eng: 'Butterfly',  emoji: '🦋' },
  { letter: 'S', word_bm: 'Singa',         word_eng: 'Lion',       emoji: '🦁' },
  { letter: 'T', word_bm: 'Tikus',         word_eng: 'Mouse',      emoji: '🐭' },
  { letter: 'U', word_bm: 'Udang',         word_eng: 'Prawn',      emoji: '🦐' },
  { letter: 'V', word_bm: 'Van',           word_eng: 'Van',        emoji: '🚐' },
  { letter: 'W', word_bm: 'Warna',         word_eng: 'Colour',     emoji: '🎨' },
  { letter: 'X', word_bm: 'Xilofon',       word_eng: 'Xylophone',  emoji: '🎶' },
  { letter: 'Y', word_bm: 'Yoyo',          word_eng: 'Yo-yo',      emoji: '🪀' },
  { letter: 'Z', word_bm: 'Zebra',         word_eng: 'Zebra',      emoji: '🦓' },
];

const CARD_COLORS = [
  '#FF6B9D','#FF9800','#58CC02','#2196F3','#9C27B0','#00BCD4',
  '#F44336','#673AB7','#4CAF50','#FF5722','#E91E8C','#009688',
  '#3F51B5','#FF9800','#8BC34A','#FF5722','#607D8B','#E91E8C',
  '#FF6B9D','#2196F3','#9C27B0','#58CC02','#FF9800','#00BCD4',
  '#F44336','#673AB7',
];

export default function AlphabetCards({ onBack, language = 'bm' }) {
  const [index, setIndex] = useState(0);
  const item  = LETTERS[index];
  const color = CARD_COLORS[index];

  const handleListen = useCallback(() => {
    playHoverSound();
    const phrase = language === 'bm'
      ? `${item.letter} untuk ${item.word_bm}`
      : `${item.letter} for ${item.word_eng}`;
    SpeechManager.speak(phrase, language === 'bm' ? 'ms' : 'en');
  }, [item, language]);

  const handlePrev = useCallback(() => setIndex(i => Math.max(0, i - 1)), []);
  const handleNext = useCallback(() => setIndex(i => Math.min(LETTERS.length - 1, i + 1)), []);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#E6FFD4', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />

      {/* Header */}
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <h1 style={{ color: '#58CC02', marginBottom: '0.25rem', fontSize: '1.6rem' }}>
            {language === 'bm' ? 'Belajar A – Z' : 'Learn A – Z'}
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Tekan kad untuk dengar sebutan' : 'Tap the card to hear the sound'}
          </p>
        </div>

        {/* Progress bar */}
        <div style={{ background: '#C8F0A8', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
          <div style={{ background: '#58CC02', height: '100%', borderRadius: '999px', width: `${((index + 1) / LETTERS.length) * 100}%`, transition: 'width 0.3s' }} />
        </div>
        <p style={{ textAlign: 'center', color: '#888', fontSize: '0.78rem', marginTop: '0.35rem' }}>
          {index + 1} / {LETTERS.length}
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
          {/* Big letter */}
          <div style={{ fontSize: '5.5rem', fontWeight: 900, color: 'white', lineHeight: 1, textShadow: '0 3px 8px rgba(0,0,0,0.25)', marginBottom: '0.25rem' }}>
            {item.letter}
          </div>
          <div style={{ fontSize: '2.5rem', color: 'rgba(255,255,255,0.7)', fontWeight: 700, lineHeight: 1, marginBottom: '1rem' }}>
            {item.letter.toLowerCase()}
          </div>

          {/* Emoji */}
          <div style={{ fontSize: '4rem', lineHeight: 1, marginBottom: '0.75rem' }}>{item.emoji}</div>

          {/* Word */}
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'white', marginBottom: '0.2rem' }}>
            {item.word_bm}
          </div>
          <div style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)' }}>
            {item.word_eng}
          </div>

          {/* Listen cue */}
          <div style={{ marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(255,255,255,0.25)', borderRadius: '999px', padding: '0.35rem 1rem', fontSize: '0.85rem', color: 'white', fontWeight: 700 }}>
            <Volume2 size={15} />
            {language === 'bm' ? 'Tekan untuk dengar' : 'Tap to listen'}
          </div>
        </button>

        {/* Letter row — quick jump */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'center', marginTop: '1rem' }}>
          {LETTERS.map((l, i) => (
            <button key={i} onClick={() => setIndex(i)}
              style={{ width: '28px', height: '28px', borderRadius: '6px', border: 'none', cursor: 'pointer', background: i === index ? color : i < index ? '#A8D5A2' : '#E0E0E0', color: i === index ? 'white' : i < index ? '#555' : '#999', fontWeight: i === index ? 900 : 600, fontSize: '0.72rem', transition: 'all 0.15s' }}>
              {l.letter}
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
        <button onClick={handleNext} disabled={index === LETTERS.length - 1}
          className="ee-btn" style={{ flex: 1, '--btn-bg': '#58CC02', '--btn-shadow': '#46A302' }}>
          {language === 'bm' ? 'Seterusnya' : 'Next'}
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
