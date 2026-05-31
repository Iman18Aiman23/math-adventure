import React, { useState, useCallback } from 'react';
import BackButton from '../../BackButton';
import SpeechManager from '../../../services/SpeechManager';
import { playHoverSound } from '../../../utils/soundManager';

const ARABIC_FONT = "'Traditional Arabic','Scheherazade New','Amiri','Noto Naskh Arabic',serif";

// 28 Hijaiyah letters — Arabic glyph, Malay name, Arabic spoken name for TTS
const HIJAIYAH = [
  { id:  1, arabic: 'ا', name: 'Alif',  speak: 'أَلِف'  },
  { id:  2, arabic: 'ب', name: "Ba'",   speak: 'بَاء'   },
  { id:  3, arabic: 'ت', name: "Ta'",   speak: 'تَاء'   },
  { id:  4, arabic: 'ث', name: "Tha'",  speak: 'ثَاء'   },
  { id:  5, arabic: 'ج', name: 'Jim',   speak: 'جِيم'   },
  { id:  6, arabic: 'ح', name: "Ha'",   speak: 'حَاء'   },
  { id:  7, arabic: 'خ', name: "Kha'",  speak: 'خَاء'   },
  { id:  8, arabic: 'د', name: 'Dal',   speak: 'دَال'   },
  { id:  9, arabic: 'ذ', name: 'Zal',   speak: 'ذَال'   },
  { id: 10, arabic: 'ر', name: "Ra'",   speak: 'رَاء'   },
  { id: 11, arabic: 'ز', name: 'Zay',   speak: 'زَاي'   },
  { id: 12, arabic: 'س', name: 'Sin',   speak: 'سِين'   },
  { id: 13, arabic: 'ش', name: 'Syin',  speak: 'شِين'   },
  { id: 14, arabic: 'ص', name: 'Sad',   speak: 'صَاد'   },
  { id: 15, arabic: 'ض', name: 'Dad',   speak: 'ضَاد'   },
  { id: 16, arabic: 'ط', name: "Tho'",  speak: 'طَاء'   },
  { id: 17, arabic: 'ظ', name: "Zho'",  speak: 'ظَاء'   },
  { id: 18, arabic: 'ع', name: "'Ain",  speak: 'عَيْن'  },
  { id: 19, arabic: 'غ', name: 'Ghain', speak: 'غَيْن'  },
  { id: 20, arabic: 'ف', name: "Fa'",   speak: 'فَاء'   },
  { id: 21, arabic: 'ق', name: 'Qaf',   speak: 'قَاف'   },
  { id: 22, arabic: 'ك', name: 'Kaf',   speak: 'كَاف'   },
  { id: 23, arabic: 'ل', name: 'Lam',   speak: 'لَام'   },
  { id: 24, arabic: 'م', name: 'Mim',   speak: 'مِيم'   },
  { id: 25, arabic: 'ن', name: 'Nun',   speak: 'نُون'   },
  { id: 26, arabic: 'و', name: 'Wau',   speak: 'وَاو'   },
  { id: 27, arabic: 'ه', name: "Ha'",   speak: 'هَاء'   },
  { id: 28, arabic: 'ي', name: "Ya'",   speak: 'يَاء'   },
];

// Colour palette — cycles every 7 letters (4 full cycles for 28 letters)
const CARD_PALETTES = [
  { bg: '#FFF7D6', border: '#F59E0B', glyph: '#92400E', check: '#D97706' },
  { bg: '#D6F5DD', border: '#10B981', glyph: '#065F46', check: '#059669' },
  { bg: '#D6EEFF', border: '#3B82F6', glyph: '#1E40AF', check: '#2563EB' },
  { bg: '#E7D9FF', border: '#8B5CF6', glyph: '#4C1D95', check: '#7C3AED' },
  { bg: '#FFE9F3', border: '#EC4899', glyph: '#9F1239', check: '#DB2777' },
  { bg: '#D0F7FA', border: '#06B6D4', glyph: '#0C4A6E', check: '#0891B2' },
  { bg: '#FEF3C7', border: '#F97316', glyph: '#9A3412', check: '#EA580C' },
];

function LetterCard({ letter, heard, onTap, playing }) {
  const [pressed, setPressed] = useState(false);
  const palette = CARD_PALETTES[(letter.id - 1) % CARD_PALETTES.length];
  const isActive = playing === letter.id;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Huruf ${letter.name}`}
      onClick={() => { onTap(letter); playHoverSound(); }}
      onKeyDown={e => e.key === 'Enter' && onTap(letter)}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      style={{
        background: heard ? palette.bg : '#1E293B',
        border: `2.5px solid ${heard ? palette.border : 'rgba(255,255,255,0.1)'}`,
        borderRadius: 16,
        padding: '12px 8px 10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        cursor: 'pointer',
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent',
        transform: pressed ? 'scale(0.94)' : isActive ? 'scale(1.06)' : 'scale(1)',
        boxShadow: isActive
          ? `0 0 0 3px ${palette.border}, 0 8px 20px ${palette.border}55`
          : heard
            ? `0 4px 12px ${palette.border}33`
            : '0 2px 8px rgba(0,0,0,0.25)',
        transition: 'transform 0.15s ease, box-shadow 0.2s ease, background 0.25s, border-color 0.25s',
        position: 'relative',
        minHeight: 90,
        justifyContent: 'center',
      }}
    >
      {/* Sequence number */}
      <span style={{
        position: 'absolute',
        top: 5, left: 7,
        fontSize: 9,
        fontWeight: 700,
        color: heard ? palette.glyph : 'rgba(255,255,255,0.3)',
        fontFamily: 'Inter, sans-serif',
        lineHeight: 1,
      }}>
        {letter.id}
      </span>

      {/* Check badge */}
      {heard && (
        <span style={{
          position: 'absolute',
          top: 4, right: 6,
          fontSize: 11,
          color: palette.check,
        }}>✓</span>
      )}

      {/* Arabic glyph */}
      <span style={{
        fontFamily: ARABIC_FONT,
        fontSize: 'clamp(1.8rem, 5vw, 2.4rem)',
        color: heard ? palette.glyph : '#E2E8F0',
        lineHeight: 1,
        direction: 'rtl',
        display: 'block',
      }}>
        {letter.arabic}
      </span>

      {/* Malay name */}
      <span style={{
        fontFamily: "'Fredoka', system-ui, sans-serif",
        fontWeight: 600,
        fontSize: 'clamp(0.62rem, 1.5vw, 0.78rem)',
        color: heard ? palette.glyph : '#94A3B8',
        letterSpacing: '0.02em',
        textAlign: 'center',
      }}>
        {letter.name}
      </span>

      {/* Sound ripple indicator */}
      {isActive && (
        <span style={{
          position: 'absolute', bottom: 5,
          fontSize: 10,
          color: palette.check,
          animation: 'hh-pulse 0.6s ease-in-out infinite',
        }}>🔊</span>
      )}
    </div>
  );
}

// ── Completion screen ─────────────────────────────────────────────────────────
function CompletionScreen({ onRestart, onBack, language }) {
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '2rem', textAlign: 'center', gap: '1.5rem',
    }}>
      <div style={{ fontSize: '4rem', lineHeight: 1 }}>🎉</div>
      <h2 style={{
        fontFamily: "'Baloo 2', sans-serif",
        fontWeight: 800,
        fontSize: 'clamp(1.4rem, 4vw, 2rem)',
        color: '#F59E0B',
        margin: 0,
      }}>
        {language === 'bm' ? 'Tahniah!' : 'Excellent!'}
      </h2>
      <p style={{
        fontFamily: "'Fredoka', system-ui, sans-serif",
        fontWeight: 600,
        fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
        color: '#CBD5E0',
        margin: 0,
        lineHeight: 1.5,
      }}>
        {language === 'bm'
          ? 'Kamu telah mendengar semua 28 huruf Hijaiyah!\nTerus semangat belajar Al-Quran.'
          : 'You have listened to all 28 Hijaiyah letters!\nKeep up the great learning.'}
      </p>

      {/* 28-letter display */}
      <div style={{
        direction: 'rtl',
        fontFamily: ARABIC_FONT,
        fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
        color: '#F59E0B',
        letterSpacing: '0.15em',
        lineHeight: 1.8,
        padding: '0.75rem 1rem',
        background: 'rgba(245,158,11,0.1)',
        borderRadius: 12,
        border: '1.5px solid rgba(245,158,11,0.25)',
        maxWidth: 360,
      }}>
        {HIJAIYAH.map(l => l.arabic).join(' ')}
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={onRestart}
          style={{
            fontFamily: "'Fredoka', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(0.85rem, 2vw, 1rem)',
            background: 'linear-gradient(135deg, #F59E0B, #D97706)',
            color: '#fff',
            border: 'none',
            borderRadius: 999,
            padding: '10px 28px',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(217,119,6,0.4)',
          }}
        >
          🔁 {language === 'bm' ? 'Cuba Semula' : 'Try Again'}
        </button>
        <button
          onClick={onBack}
          style={{
            fontFamily: "'Fredoka', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(0.85rem, 2vw, 1rem)',
            background: 'rgba(255,255,255,0.1)',
            color: '#CBD5E0',
            border: '2px solid rgba(255,255,255,0.15)',
            borderRadius: 999,
            padding: '10px 28px',
            cursor: 'pointer',
          }}
        >
          ← {language === 'bm' ? 'Kembali' : 'Back'}
        </button>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function HurufHijaiyah({ onBack, language = 'bm' }) {
  const [heard,   setHeard]   = useState(new Set());
  const [playing, setPlaying] = useState(null);
  const [done,    setDone]    = useState(false);

  const handleTap = useCallback((letter) => {
    SpeechManager.speak(letter.speak, 'ar-SA');
    setPlaying(letter.id);
    setTimeout(() => setPlaying(null), 900);

    setHeard(prev => {
      const next = new Set(prev);
      next.add(letter.id);
      if (next.size === HIJAIYAH.length) {
        setTimeout(() => setDone(true), 600);
      }
      return next;
    });
  }, []);

  const handleRestart = () => {
    setHeard(new Set());
    setPlaying(null);
    setDone(false);
  };

  const heardCount = heard.size;
  const progress   = Math.round((heardCount / HIJAIYAH.length) * 100);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      background: '#0B1A2E', color: '#F1F5F9',
      fontFamily: 'Inter, sans-serif',
    }}>
      <BackButton onClick={onBack} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Baloo+2:wght@600;700;800&display=swap');

        .hh-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.6rem;
        }
        @media (min-width: 480px) {
          .hh-grid { grid-template-columns: repeat(5, 1fr); gap: 0.7rem; }
        }
        @media (min-width: 768px) {
          .hh-grid { grid-template-columns: repeat(7, 1fr); gap: 0.85rem; }
        }
        @media (min-width: 1024px) {
          .hh-grid { grid-template-columns: repeat(7, 1fr); gap: 1rem; }
        }

        @keyframes hh-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.6; transform: scale(1.2); }
        }
      `}</style>

      {done ? (
        <CompletionScreen onRestart={handleRestart} onBack={onBack} language={language} />
      ) : (
        <>
          {/* ── Header ────────────────────────────────────────────────── */}
          <div style={{ padding: '4.5rem 1.25rem 1rem', flexShrink: 0 }}>
            <p style={{
              fontFamily: "'Fredoka', system-ui, sans-serif",
              fontWeight: 600,
              fontSize: 'clamp(0.65rem, 1.4vw, 0.75rem)',
              color: 'rgba(255,255,255,0.4)',
              margin: '0 0 0.6rem',
            }}>
              Al-Quran &amp; Tajwid &rsaquo; Topik 1.1
            </p>

            <h1 style={{
              fontFamily: "'Baloo 2', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(1.15rem, 3.5vw, 1.5rem)',
              color: '#F59E0B',
              margin: '0 0 0.25rem',
              letterSpacing: '-0.01em',
            }}>
              {language === 'bm' ? 'Huruf Hijaiyah Tunggal' : 'Hijaiyah Letters'}
            </h1>
            <p style={{
              fontFamily: "'Fredoka', system-ui, sans-serif",
              fontWeight: 500,
              fontSize: 'clamp(0.75rem, 1.8vw, 0.88rem)',
              color: '#94A3B8',
              margin: '0 0 1rem',
            }}>
              {language === 'bm'
                ? '🔊 Ketuk mana-mana huruf untuk dengar sebutannya'
                : '🔊 Tap any letter to hear its pronunciation'}
            </p>

            {/* Progress bar */}
            <div style={{
              background: 'rgba(255,255,255,0.08)',
              borderRadius: 12,
              padding: '10px 14px',
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  height: 8, borderRadius: 99,
                  background: 'rgba(255,255,255,0.1)',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #F59E0B, #FDE68A)',
                    borderRadius: 99,
                    transition: 'width 0.4s ease',
                  }} />
                </div>
              </div>
              <span style={{
                fontFamily: "'Baloo 2', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(0.75rem, 1.8vw, 0.9rem)',
                color: '#F59E0B',
                whiteSpace: 'nowrap',
                minWidth: 52,
                textAlign: 'right',
              }}>
                {heardCount} / {HIJAIYAH.length}
              </span>
              <span style={{ fontSize: '1rem' }}>
                {heardCount === HIJAIYAH.length ? '🏆' : '📖'}
              </span>
            </div>
          </div>

          {/* ── Letter grid ───────────────────────────────────────────── */}
          <div style={{
            flex: 1, overflowY: 'auto',
            padding: '0 1.25rem calc(100px + var(--safe-bottom, 0px))',
          }}>
            <div className="hh-grid">
              {HIJAIYAH.map(letter => (
                <LetterCard
                  key={letter.id}
                  letter={letter}
                  heard={heard.has(letter.id)}
                  playing={playing}
                  onTap={handleTap}
                />
              ))}
            </div>

            <p style={{
              fontFamily: "'Fredoka', system-ui, sans-serif",
              fontWeight: 500,
              fontSize: 'clamp(0.65rem, 1.5vw, 0.75rem)',
              color: 'rgba(255,255,255,0.28)',
              textAlign: 'center',
              marginTop: '1.25rem',
            }}>
              {language === 'bm'
                ? `Huruf berwarna = sudah didengar · ${HIJAIYAH.length - heardCount} lagi`
                : `Coloured = heard · ${HIJAIYAH.length - heardCount} remaining`}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
