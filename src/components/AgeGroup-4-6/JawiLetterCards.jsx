import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import SpeechManager from '../../services/SpeechManager';
import { JAWI_ALPHABET } from '../../utils/jawiData';
import BackButton from '../BackButton';

const SLOT_COLORS = ['#FF9600', '#1CB0F6', '#58CC02', '#CE82FF', '#FF4B4B', '#00C2A8'];
const SLOT_BG     = ['#FFF4E0', '#E0F4FF', '#E6FFD4', '#F3DDFF', '#FFE0E0', '#D4FFF8'];

const SCRIPTS = [
  { key: 'BM',   label: 'BM',   color: '#CE82FF', bg: '#EDD9FF' },
  { key: 'JAWI', label: 'JAWI', color: '#CE82FF', bg: '#EDD9FF' },
];

const JAWI_FONT = "'Traditional Arabic','Scheherazade New','Amiri','Noto Naskh Arabic',serif";

export default function JawiLetterCards({ onBack, language = 'bm' }) {
  const [index,          setIndex]          = useState(0);
  const [script,         setScript]         = useState('JAWI');
  const [showComplete,   setShowComplete]   = useState(false);

  const item       = JAWI_ALPHABET[index];
  const slotIdx    = index % SLOT_COLORS.length;
  const slotColor  = SLOT_COLORS[slotIdx];
  const slotBg     = SLOT_BG[slotIdx];
  const isJawi     = script === 'JAWI';

  const speak = useCallback(() => {
    SpeechManager.speak(item.rumi, 'ar-SA');
  }, [item]);

  const handlePrev = () => {
    if (index > 0) setIndex(i => i - 1);
  };

  const handleNext = () => {
    if (index < JAWI_ALPHABET.length - 1) {
      setIndex(i => i + 1);
    } else {
      setShowComplete(true);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F7F7F7', position: 'relative' }}>

      <BackButton onClick={onBack} />

      {/* Header */}
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0', textAlign: 'center' }}>
        <h1 style={{ color: '#CE82FF', fontSize: '1.4rem', fontWeight: 900, margin: '0 0 0.2rem' }}>
          {language === 'bm' ? 'Mari Mengenal Huruf Jawi' : 'Learn Jawi Letters'}
        </h1>
        <p style={{ color: '#AFAFAF', fontSize: '0.85rem', fontWeight: 600, margin: 0 }}>
          {language === 'bm' ? 'Lihat dan dengar sebutan dengan betul.' : 'See and hear the correct pronunciation.'}
        </p>
      </div>

      {/* ── Centered content ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0.5rem 1rem', gap: '0.75rem', overflowY: 'auto' }}>

        {/* Script Toggle: BM / JAWI */}
        <div style={{ display: 'flex', gap: 'clamp(0.3rem, 2vw, 0.75rem)', justifyContent: 'center', width: '100%', maxWidth: '400px', padding: 'clamp(0.5rem, 2vw, 1rem)' }}>
          {SCRIPTS.map(s => (
            <button type="button" key={s.key} onClick={() => setScript(s.key)} style={{
              flex: 1, maxWidth: 120, padding: '0.5rem 0',
              margin: 'clamp(0.2rem, 1vw, 0.5rem)',
              background: script === s.key ? s.color : '#fff',
              color:      script === s.key ? '#fff'   : s.color,
              border:     `2px solid ${s.color}`,
              borderBottom: `5px solid ${s.color}`,
              borderRadius: '12px', fontWeight: 900, fontSize: '0.85rem',
              cursor: 'pointer', transition: 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
              boxShadow: script === s.key ? `0 6px 0 rgba(0,0,0,0.12), inset 0 -2px 0 rgba(0,0,0,0.1)` : 'none',
              transform: script === s.key ? 'translateY(-2px)' : 'translateY(0)',
            }}
            onMouseEnter={script === s.key ? undefined : (e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={script === s.key ? undefined : (e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
            onMouseDown={script === s.key ? undefined : (e) => { e.currentTarget.style.transform = 'translateY(0px)'; }}
            onMouseUp={script === s.key ? undefined : (e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Progress badge */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            background: slotBg, color: slotColor,
            borderRadius: '999px', padding: '3px 14px',
            fontWeight: 800, fontSize: '0.78rem', letterSpacing: '0.5px',
          }}>
            {index + 1} / {JAWI_ALPHABET.length}
          </div>
        </div>

        {/* Main flashcard — tap to listen */}
        <button type="button" onClick={speak} style={{
          width: '100%', maxWidth: '400px',
          background: slotColor, borderRadius: '24px', border: 'none',
          cursor: 'pointer', padding: '1.75rem 1rem 2rem',
          boxShadow: `0 6px 0 ${slotColor}CC`,
          textAlign: 'center', transition: 'transform 0.1s',
          WebkitTapHighlightColor: 'transparent',
        }}
          onPointerDown={e => e.currentTarget.style.transform = 'translateY(3px)'}
          onPointerUp={e => e.currentTarget.style.transform = ''}
          onPointerLeave={e => e.currentTarget.style.transform = ''}
        >
          {/* Primary text */}
          <div style={{
            fontSize: isJawi ? 'clamp(4rem, 20vw, 6rem)' : 'clamp(2.5rem, 12vw, 3.5rem)',
            fontWeight: 900, color: '#fff', lineHeight: 1.2,
            textShadow: '0 3px 8px rgba(0,0,0,0.25)',
            marginBottom: '1.25rem',
            fontFamily: isJawi ? JAWI_FONT : 'inherit',
            direction: isJawi ? 'rtl' : 'ltr',
          }}>
            {isJawi ? item.jawi : item.rumi}
          </div>

          {/* Secondary text */}
          <div style={{
            fontSize: isJawi ? '1.4rem' : 'clamp(2rem, 10vw, 3rem)',
            color: 'rgba(255,255,255,0.8)', fontWeight: 700, lineHeight: 1.2,
            marginBottom: '1.75rem',
            fontFamily: isJawi ? 'inherit' : JAWI_FONT,
            direction: isJawi ? 'ltr' : 'rtl',
          }}>
            {isJawi ? item.rumi : item.jawi}
          </div>

          {/* Listen cue */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(255,255,255,0.25)', borderRadius: '999px', padding: '0.5rem 1.25rem', fontSize: '0.85rem', color: '#fff', fontWeight: 700 }}>
            <Volume2 size={15} />
            {language === 'bm' ? 'Tekan untuk dengar' : 'Tap to listen'}
          </div>
        </button>

      </div>

      {/* ── Bottom Nav ── */}
      <div style={{
        display: 'flex', gap: 'clamp(0.5rem, 2vw, 1rem)', padding: 'clamp(0.6rem, 2vw, 1rem)',
        paddingBottom: 'calc(clamp(0.6rem, 2vw, 1rem) + env(safe-area-inset-bottom, 0px))',
        background: '#fff', borderTop: '2px solid #E5E5E5', flexShrink: 0,
      }}>
        <button type="button" onClick={handlePrev} disabled={index === 0} style={{
          flex: '0 0 50px', height: '50px', borderRadius: '14px',
          background: index === 0 ? '#f0f0f0' : '#fff',
          border: `2px solid ${index === 0 ? '#E5E5E5' : '#D0D0D0'}`,
          borderBottom: `5px solid ${index === 0 ? '#E5E5E5' : '#C0C0C0'}`,
          color: index === 0 ? '#C0C0C0' : '#3C3C3C',
          cursor: index === 0 ? 'not-allowed' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: index === 0 ? 'none' : 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: index === 0 ? 'none' : '0 5px 0 rgba(0,0,0,0.08)',
        }}
        onMouseEnter={index === 0 ? undefined : (e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 0 rgba(0,0,0,0.12)'; }}
        onMouseLeave={index === 0 ? undefined : (e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 5px 0 rgba(0,0,0,0.08)'; }}
        onMouseDown={index === 0 ? undefined : (e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
        >
          <ChevronLeft size={22} />
        </button>

        <button type="button" onClick={speak} style={{
          flex: 1, height: '50px', borderRadius: '14px',
          background: slotBg, color: slotColor,
          border: `2px solid ${slotColor}44`, borderBottom: `5px solid ${slotColor}`,
          fontWeight: 900, fontSize: '1rem', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
          transition: 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: `0 5px 0 rgba(0,0,0,0.08)`,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
        onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
        >
          <Volume2 size={18} />
          {language === 'bm' ? 'Dengar' : 'Listen'}
        </button>

        <button type="button" onClick={handleNext} style={{
          flex: '0 0 auto', padding: '0 1.1rem', height: '50px', borderRadius: '14px',
          background: index === JAWI_ALPHABET.length - 1 ? '#58CC02' : slotColor,
          color: '#fff', border: 'none',
          borderBottom: `5px solid ${index === JAWI_ALPHABET.length - 1 ? '#46A302' : slotColor}CC`,
          fontWeight: 900, fontSize: '1rem', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem',
          transition: 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: '0 5px 0 rgba(0,0,0,0.12)',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
        onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
        >
          {index === JAWI_ALPHABET.length - 1
            ? (language === 'bm' ? 'Siap ✓' : 'Done ✓')
            : (language === 'bm' ? 'Seterusnya' : 'Next')}
          {index < JAWI_ALPHABET.length - 1 && <ChevronRight size={19} />}
        </button>
      </div>

      {/* ── Completion popup ── */}
      {showComplete && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(3px)',
          animation: 'jwFadeIn 0.25s ease',
        }}>
          <div style={{
            background: '#fff', borderRadius: '28px',
            padding: '2.25rem 1.75rem 1.75rem',
            maxWidth: '300px', width: '88%',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
            animation: 'jwPopIn 0.35s cubic-bezier(0.34,1.56,0.64,1)',
          }}>
            <div style={{ fontSize: '3.5rem', lineHeight: 1, marginBottom: '0.75rem', animation: 'jwBounce 1.2s ease-in-out infinite' }}>
              🎉
            </div>
            <h2 style={{ fontSize: '1.7rem', fontWeight: 900, color: '#CE82FF', margin: '0 0 0.35rem' }}>
              {language === 'bm' ? 'Tahniah!' : 'Well Done!'}
            </h2>
            <p style={{ color: '#AFAFAF', fontWeight: 700, fontSize: '0.9rem', margin: '0 0 1.5rem' }}>
              {language === 'bm'
                ? 'Anda sudah belajar semua huruf Jawi!'
                : "You've learned all Jawi letters!"}
            </p>
            <button type="button" onClick={onBack} style={{
              width: '100%', padding: '1rem',
              background: '#CE82FF', color: '#fff',
              border: 'none', borderBottom: '5px solid #B060E0',
              borderRadius: '16px', fontWeight: 900, fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 5px 0 rgba(0,0,0,0.10)',
              transition: 'all 0.15s cubic-bezier(0.34,1.56,0.64,1)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
            onMouseDown={e => { e.currentTarget.style.transform = 'translateY(2px)'; }}
            onMouseUp={e => { e.currentTarget.style.transform = 'translateY(-3px)'; }}
            >
              {language === 'bm' ? 'Kembali' : 'Back'} →
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes jwBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes jwFadeIn { from{opacity:0} to{opacity:1} }
        @keyframes jwPopIn  { from{opacity:0;transform:scale(0.82) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }
      `}</style>
    </div>
  );
}
