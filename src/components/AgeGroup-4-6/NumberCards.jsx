import React, { useState, useCallback } from 'react';
import { Volume2, ChevronLeft, ChevronRight } from 'lucide-react';
import { playHoverSound } from '../../utils/soundManager';
import SpeechManager from '../../services/SpeechManager';
import BackButton from '../BackButton';

// Age 4-6 — Sequential 1-20 number learning cards
const NUMBERS = [
  { value: 1,  word_bm: 'satu',          word_eng: 'one'       },
  { value: 2,  word_bm: 'dua',           word_eng: 'two'       },
  { value: 3,  word_bm: 'tiga',          word_eng: 'three'     },
  { value: 4,  word_bm: 'empat',         word_eng: 'four'      },
  { value: 5,  word_bm: 'lima',          word_eng: 'five'      },
  { value: 6,  word_bm: 'enam',          word_eng: 'six'       },
  { value: 7,  word_bm: 'tujuh',         word_eng: 'seven'     },
  { value: 8,  word_bm: 'lapan',         word_eng: 'eight'     },
  { value: 9,  word_bm: 'sembilan',      word_eng: 'nine'      },
  { value: 10, word_bm: 'sepuluh',       word_eng: 'ten'       },
  { value: 11, word_bm: 'sebelas',       word_eng: 'eleven'    },
  { value: 12, word_bm: 'dua belas',     word_eng: 'twelve'    },
  { value: 13, word_bm: 'tiga belas',    word_eng: 'thirteen'  },
  { value: 14, word_bm: 'empat belas',   word_eng: 'fourteen'  },
  { value: 15, word_bm: 'lima belas',    word_eng: 'fifteen'   },
  { value: 16, word_bm: 'enam belas',    word_eng: 'sixteen'   },
  { value: 17, word_bm: 'tujuh belas',   word_eng: 'seventeen' },
  { value: 18, word_bm: 'lapan belas',   word_eng: 'eighteen'  },
  { value: 19, word_bm: 'sembilan belas',word_eng: 'nineteen'  },
  { value: 20, word_bm: 'dua puluh',     word_eng: 'twenty'    },
];

const CARD_COLORS = [
  '#FF6B9D','#FF9800','#58CC02','#2196F3','#9C27B0',
  '#00BCD4','#F44336','#673AB7','#4CAF50','#FF5722',
  '#E91E8C','#009688','#3F51B5','#FF9800','#8BC34A',
  '#FF5722','#607D8B','#E91E8C','#FF6B9D','#2196F3',
];

// Emoji objects to show quantity — cycles through pool
const OBJ_EMOJIS = ['⭐','🍎','🐱','🌸','🦋','🐶','🎈','🐸','🌟','🍭','🍊','🐥','🦄','🍓','🐣','🐠','🌈','🎀','🍇','🌻'];

export default function NumberCards({ onBack, language = 'bm' }) {
  const [index, setIndex] = useState(0);
  const num   = NUMBERS[index];
  const color = CARD_COLORS[index];
  const emoji = OBJ_EMOJIS[index];
  const objSize = num.value <= 5 ? '2rem' : num.value <= 10 ? '1.7rem' : num.value <= 15 ? '1.4rem' : '1.15rem';

  const handleListen = useCallback(() => {
    playHoverSound();
    const word = language === 'bm' ? num.word_bm : num.word_eng;
    SpeechManager.speak(word, language === 'bm' ? 'ms' : 'en');
  }, [num, language]);

  const handlePrev = useCallback(() => setIndex(i => Math.max(0, i - 1)), []);
  const handleNext = useCallback(() => setIndex(i => Math.min(NUMBERS.length - 1, i + 1)), []);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#E6FFD4', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />

      {/* Header */}
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <h1 style={{ color: '#58CC02', marginBottom: '0.25rem', fontSize: '1.6rem' }}>
            {language === 'bm' ? 'Belajar 1 – 20' : 'Learn 1 – 20'}
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Tekan kad untuk dengar nombor' : 'Tap the card to hear the number'}
          </p>
        </div>

        {/* Progress bar */}
        <div style={{ background: '#C8F0A8', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
          <div style={{ background: '#58CC02', height: '100%', borderRadius: '999px', width: `${((index + 1) / NUMBERS.length) * 100}%`, transition: 'width 0.3s' }} />
        </div>
        <p style={{ textAlign: 'center', color: '#888', fontSize: '0.78rem', marginTop: '0.35rem' }}>
          {index + 1} / {NUMBERS.length}
        </p>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>

        {/* Flashcard — tap to listen */}
        <button
          onClick={handleListen}
          style={{ width: '100%', background: color, borderRadius: '20px', border: 'none', cursor: 'pointer', padding: '1.5rem 1rem', boxShadow: `0 6px 0 ${color}CC`, textAlign: 'center', transition: 'transform 0.1s', WebkitTapHighlightColor: 'transparent' }}
          onPointerDown={e => e.currentTarget.style.transform = 'translateY(3px)'}
          onPointerUp={e => e.currentTarget.style.transform = ''}
          onPointerLeave={e => e.currentTarget.style.transform = ''}
        >
          {/* Big numeral */}
          <div style={{ fontSize: '5.5rem', fontWeight: 900, color: 'white', lineHeight: 1, textShadow: '0 3px 8px rgba(0,0,0,0.25)', marginBottom: '0.15rem' }}>
            {num.value}
          </div>

          {/* Number words */}
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', marginBottom: '0.15rem' }}>
            {num.word_bm}
          </div>
          <div style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)', marginBottom: '1rem' }}>
            {num.word_eng}
          </div>

          {/* Object visual — shows quantity */}
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '14px', padding: '0.65rem', marginBottom: '0.85rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2px', maxWidth: '260px', margin: '0 auto' }}>
              {Array.from({ length: num.value }, (_, i) => (
                <span key={i} style={{ fontSize: objSize, lineHeight: 1.25 }}>{emoji}</span>
              ))}
            </div>
          </div>

          {/* Listen cue */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(255,255,255,0.25)', borderRadius: '999px', padding: '0.35rem 1rem', fontSize: '0.85rem', color: 'white', fontWeight: 700 }}>
            <Volume2 size={15} />
            {language === 'bm' ? 'Tekan untuk dengar' : 'Tap to listen'}
          </div>
        </button>

        {/* Number grid — quick jump */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', justifyContent: 'center', marginTop: '1rem' }}>
          {NUMBERS.map((n, i) => (
            <button key={i} onClick={() => setIndex(i)}
              style={{ width: '36px', height: '36px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: i === index ? CARD_COLORS[i] : i < index ? '#A8D5A2' : '#E0E0E0', color: i === index ? 'white' : i < index ? '#555' : '#999', fontWeight: i === index ? 900 : 600, fontSize: '0.85rem', transition: 'all 0.15s' }}>
              {n.value}
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
        <button onClick={handleNext} disabled={index === NUMBERS.length - 1}
          className="ee-btn" style={{ flex: 1, '--btn-bg': '#58CC02', '--btn-shadow': '#46A302' }}>
          {language === 'bm' ? 'Seterusnya' : 'Next'}
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
