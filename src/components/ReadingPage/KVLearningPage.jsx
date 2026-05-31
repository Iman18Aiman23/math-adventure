import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import bm_kv_complete, { KV_LETTERS, getKVSeriesByLetter } from '../../data/curriculum/bm_kv';
import SpeechManager from '../../services/SpeechManager';
import BackButton from '../BackButton';

// ── Vowel row labels (shown under the KV badge) ──────────────────────────────
const VOWEL_LABELS = ['a', 'i', 'u', 'e (taling)', 'o', 'e (pepet)'];
const VOWEL_COLORS = ['#FF9600', '#1CB0F6', '#58CC02', '#CE82FF', '#FF4B4B', '#00C2A8'];
const VOWEL_BG     = ['#FFF4E0', '#E0F4FF', '#E6FFD4', '#F3DDFF', '#FFE0E0', '#D4FFF8'];

// ── Tile palette — mirrors ReadingPage rp-tile color variants ─────────────────
const TILE_PALETTE = [
  { base: '#FF9600', light: '#FFD9A0', deep: '#8F5300' },
  { base: '#1CB0F6', light: '#A0E4FF', deep: '#0B6EA0' },
  { base: '#58CC02', light: '#B4F576', deep: '#2E7001' },
  { base: '#CE82FF', light: '#ECD0FF', deep: '#7A3FA0' },
  { base: '#FF4B4B', light: '#FFB0B0', deep: '#A01010' },
  { base: '#00C2A8', light: '#A0F0E8', deep: '#007A6A' },
];

// ── Script button config ──────────────────────────────────────────────────────
const SCRIPTS = [
  { key: 'RUMI', label: 'RUMI', color: '#1CB0F6', bg: '#D0F0FF' },
  { key: 'ENG',  label: 'ENG',  color: '#FF9600', bg: '#FFF0CC' },
  { key: 'JAWI', label: 'JAWI', color: '#CE82FF', bg: '#EDD9FF' },
];

// Derive consonant letter from kv field (e.g. 'ba' → 'B')
const getLetter = (item) => item.kv[0].toUpperCase();

export default function KVLearningPage({ onBack, language }) {
  // ── State ─────────────────────────────────────────────────────────────────
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [cardIndex,      setCardIndex]      = useState(0);
  const [script,         setScript]         = useState('RUMI');
  const [activeSyl,      setActiveSyl]      = useState(null);
  const [seriesComplete, setSeriesComplete] = useState(false);

  // ── Series data ───────────────────────────────────────────────────────────
  const seriesItems      = selectedLetter ? getKVSeriesByLetter(selectedLetter) : [];
  const currentItem      = seriesItems[cardIndex] ?? null;
  const currentLetterIdx = KV_LETTERS.indexOf(selectedLetter);

  // ── Display helpers ───────────────────────────────────────────────────────
  // Vowel color/bg for current card slot (cycles safely beyond 6)
  const vowelIdx   = cardIndex % VOWEL_COLORS.length;
  const vowelColor = VOWEL_COLORS[vowelIdx];
  const vowelBg    = VOWEL_BG[vowelIdx];

  const vowelLabel = VOWEL_LABELS[cardIndex] ?? `Vokal ${cardIndex + 1}`;

  // ── Speak helper ─────────────────────────────────────────────────────────
  const speak = useCallback((item) => {
    if (!item) return;
    const text = script === 'ENG' ? item.en?.word : item.ms?.word;
    const lang = script === 'ENG' ? 'en-US' : 'ms-MY';
    SpeechManager.speak(text, lang);
    setActiveSyl(cardIndex);
  }, [script, cardIndex]);

  // ── Navigation ────────────────────────────────────────────────────────────
  const handleNext = () => {
    if (cardIndex < seriesItems.length - 1) {
      setCardIndex(c => c + 1);
      setActiveSyl(null);
    } else {
      setSeriesComplete(true);
    }
  };

  const handlePrev = () => {
    if (cardIndex > 0) {
      setCardIndex(c => c - 1);
      setActiveSyl(null);
    }
  };

  const handleNextLetter = () => {
    const nextIdx = currentLetterIdx + 1;
    if (nextIdx < KV_LETTERS.length) {
      setSelectedLetter(KV_LETTERS[nextIdx]);
      setCardIndex(0);
      setActiveSyl(null);
      setSeriesComplete(false);
      setScript('RUMI');
    } else {
      onBack();
    }
  };

  const handleSelectLetter = (letter) => {
    setSelectedLetter(letter);
    setCardIndex(0);
    setActiveSyl(null);
    setSeriesComplete(false);
    setScript('RUMI');
  };

  const handleBackToLetters = () => {
    setSelectedLetter(null);
    setCardIndex(0);
    setActiveSyl(null);
    setSeriesComplete(false);
  };

  const nextLetter = KV_LETTERS[currentLetterIdx + 1] ?? null;

  // ─────────────────────────────────────────────────────────────────────────
  // ── VIEW 1: Letter Picker ────────────────────────────────────────────────
  // ─────────────────────────────────────────────────────────────────────────
  if (!selectedLetter) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto',
        background: 'radial-gradient(ellipse 75% 55% at 0% 0%, rgba(134,239,172,.18) 0%, transparent 70%), radial-gradient(ellipse 75% 55% at 100% 0%, rgba(251,146,60,.18) 0%, transparent 70%), radial-gradient(ellipse 75% 55% at 0% 100%, rgba(122,227,255,.16) 0%, transparent 70%), radial-gradient(ellipse 75% 55% at 100% 100%, rgba(196,181,253,.18) 0%, transparent 70%), #FFFDF8',
      }}>
        <style>{`
          .kv-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
          }
          @media (min-width: 500px) { .kv-grid { grid-template-columns: repeat(4, 1fr); gap: 14px; } }
          @media (min-width: 760px) { .kv-grid { grid-template-columns: repeat(5, 1fr); gap: 16px; } }
          .kv-letter-tile {
            position: relative; border: 0; padding: 0;
            aspect-ratio: 1 / 1.05; width: 100%;
            container-type: inline-size;
            border-radius: 24px; cursor: pointer; font-family: inherit;
            overflow: hidden;
            transition: transform .25s cubic-bezier(.34,1.56,.64,1);
            -webkit-tap-highlight-color: transparent;
            /* Resting state visible — entrance animation only fades IN; if iOS
               disables/drops the animation the tile stays visible (not opacity:0). */
            animation: kvTileIn .5s cubic-bezier(.34,1.56,.64,1) forwards;
          }
          @keyframes kvTileIn {
            0%   { opacity: 0; transform: translateY(22px) scale(.94); }
            70%  { opacity: 1; transform: translateY(-4px) scale(1.02); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          .kv-letter-tile:hover  { transform: translateY(-6px) rotate(-1.2deg); }
          .kv-letter-tile:active { transform: translateY(5px) rotate(0deg); transition: transform .1s ease; }
          .kv-letter-tile::before {
            content: ""; position: absolute; inset: 0;
            background-image: radial-gradient(rgba(255,255,255,.18) 1.4px, transparent 1.6px);
            background-size: 18px 18px; opacity: .65; pointer-events: none; z-index: 1;
          }
          .kv-letter-tile::after {
            content: ""; position: absolute; top: 6px; left: 10px; right: 10px; height: 38%;
            border-radius: 20px 20px 0 0;
            background: linear-gradient(180deg, rgba(255,255,255,.42) 0%, rgba(255,255,255,.06) 75%, transparent 100%);
            pointer-events: none; z-index: 1;
          }
          .kv-tile-letter {
            position: absolute; inset: 0; padding-bottom: 28%;
            display: flex; align-items: center; justify-content: center; z-index: 2;
            font-family: 'Fredoka','Baloo 2',sans-serif; font-weight: 700;
            font-size: 60cqi; line-height: 1; color: #fff;
            text-shadow: 0 2px 0 rgba(0,0,0,.18);
          }
          .kv-tile-cap {
            position: absolute; bottom: 8px; left: 8px; right: 8px; z-index: 4;
            background: #fff; border-radius: 14px; padding: 6px 10px;
            box-shadow: 0 3px 0 rgba(0,0,0,.10);
            text-align: center; font-family: 'Fredoka',sans-serif; font-weight: 700;
            font-size: 0.8rem; line-height: 1;
          }
          .kv-section-label {
            font-family: 'Fredoka',sans-serif; font-weight: 700; font-size: 1.05rem;
            color: #374151; text-align: center; letter-spacing: .04em;
            margin: 12px 0 16px;
            display: flex; align-items: center; gap: 14px; justify-content: center;
          }
          .kv-section-label::before, .kv-section-label::after {
            content: ""; height: 3px; flex: 1; max-width: 80px; border-radius: 999px;
            background: linear-gradient(90deg, rgba(34,197,94,.6), rgba(249,115,22,.7), rgba(60,203,255,.7), rgba(139,92,246,.6));
          }
          @media (max-width: 400px) {
            .kv-letter-tile { border-radius: 18px; }
            .kv-tile-cap { bottom: 5px; left: 5px; right: 5px; padding: 5px 6px; font-size: 0.68rem; border-radius: 10px; }
          }
        `}</style>

        <BackButton onClick={onBack} />

        <div style={{ padding: '68px 0.75rem 1.5rem', maxWidth: '600px', margin: '0 auto', width: '100%' }}>
          <div className="kv-section-label">
            {language === 'bm' ? 'Pilih Huruf untuk Belajar' : 'Select a Letter to Learn'}
          </div>

          <div className="kv-grid">
            {KV_LETTERS.map((letter, idx) => {
              const pal = TILE_PALETTE[idx % TILE_PALETTE.length];
              return (
                <button
                  type="button"
                  key={letter}
                  className="kv-letter-tile"
                  onClick={() => handleSelectLetter(letter)}
                  style={{
                    background: `linear-gradient(165deg, ${pal.light} 0%, ${pal.base} 60%, ${pal.deep} 100%)`,
                    animationDelay: `${0.04 + idx * 0.025}s`,
                  }}
                >
                  <span className="kv-tile-letter">{letter}</span>
                  <span className="kv-tile-cap" style={{ color: pal.deep }}>
                    {getKVSeriesByLetter(letter).length} kad
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // ── VIEW 2 / 3: Flashcard (+ completion popup overlay) ──────────────────
  // ─────────────────────────────────────────────────────────────────────────
  const isJawi   = script === 'JAWI';
  const cap      = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '');
  const capKV    = currentItem?.kv ? cap(currentItem.kv) : '';
  const msWord   = cap(currentItem?.ms?.word);
  const enWord   = cap(currentItem?.en?.word);
  const jawiWord = currentItem?.jawi?.word ?? '';
  // Selected script drives the emphasised (main) word; the other line is the translation.
  const mainWord = script === 'ENG' ? enWord : script === 'JAWI' ? jawiWord : msWord;
  const subWord  = script === 'ENG' ? msWord : script === 'JAWI' ? msWord : enWord;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F7F7F7', position: 'relative' }}>

      <BackButton onClick={handleBackToLetters} />

      {/* ── Centered content ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0.5rem 1rem', gap: '0.5rem', overflowY: 'auto' }}>
        {/* ── Script Toggle ── */}
        <div style={{ display: 'flex', gap: 'clamp(0.3rem, 2vw, 0.75rem)', justifyContent: 'center', width: '100%', maxWidth: '400px', padding: 'clamp(0.5rem, 2vw, 1rem)' }}>
          {SCRIPTS.map(s => (
            <button type="button" key={s.key} onClick={() => { setScript(s.key); setActiveSyl(null); }} style={{
              flex: 1, maxWidth: 100, padding: '0.5rem 0',
              margin: 'clamp(0.2rem, 1vw, 0.5rem)',
              background: script === s.key ? s.color : '#fff',
              color:      script === s.key ? '#fff'   : s.color,
              border:     `2px solid ${s.color}`,
              borderBottom: `5px solid ${s.color}`,
              borderRadius: '12px', fontWeight: 900, fontSize: '0.85rem',
              cursor: 'pointer', transition: 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
              boxShadow: script === s.key ? `0 6px 0 rgba(0,0,0,0.12), inset 0 -2px 0 rgba(0,0,0,0.1)` : 'none',
              transform: script === s.key ? 'translateY(-2px)' : 'translateY(0)',
              onMouseEnter: null,
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

        {/* ── Vowel label ── */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            background: vowelBg, color: vowelColor,
            borderRadius: '999px', padding: '3px 14px',
            fontWeight: 800, fontSize: '0.78rem', letterSpacing: '0.5px',
          }}>
            {vowelLabel} — {cardIndex + 1} / {seriesItems.length}
          </div>
        </div>

        {/* ── Main Card (Belajar A-Z style — tap to listen) ── */}
        <button type="button" onClick={() => speak(currentItem)} style={{
          width: '100%', maxWidth: '400px',
          background: vowelColor, borderRadius: '24px', border: 'none',
          cursor: 'pointer', padding: '1.5rem 1rem 1.75rem',
          boxShadow: `0 6px 0 ${vowelColor}CC`,
          textAlign: 'center', transition: 'transform 0.1s',
          WebkitTapHighlightColor: 'transparent',
        }}
          onPointerDown={e => e.currentTarget.style.transform = 'translateY(3px)'}
          onPointerUp={e => e.currentTarget.style.transform = ''}
          onPointerLeave={e => e.currentTarget.style.transform = ''}
        >
          {/* Big syllable (uppercase) */}
          <div style={{ fontSize: 'clamp(3.5rem, 18vw, 4.5rem)', fontWeight: 900, color: '#fff', lineHeight: 1, textShadow: '0 3px 8px rgba(0,0,0,0.25)', marginBottom: '0.2rem' }}>
            {capKV}
          </div>
          {/* Lowercase syllable */}
          <div style={{ fontSize: 'clamp(1.8rem, 9vw, 2.2rem)', color: 'rgba(255,255,255,0.7)', fontWeight: 700, lineHeight: 1, marginBottom: '0.75rem' }}>
            {currentItem?.kv}
          </div>

          {/* Emoji */}
          <div style={{ fontSize: '3.5rem', lineHeight: 1, marginBottom: '0.6rem', animation: 'kvBounce 2.5s ease-in-out infinite' }}>
            {currentItem?.icon}
          </div>

          {/* Main word — emphasised in the selected script */}
          <div style={{
            fontSize: isJawi ? 'clamp(1.6rem, 8vw, 2rem)' : '1.4rem',
            fontWeight: 800, color: '#fff', marginBottom: '0.2rem', lineHeight: 1.2,
            direction: isJawi ? 'rtl' : 'ltr',
            fontFamily: isJawi ? '"Lateef", "Noto Naskh Arabic", serif' : 'inherit',
            wordBreak: 'break-word', maxWidth: '100%',
          }}>
            {mainWord}
          </div>
          {/* Translation line */}
          <div style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.85)', minHeight: '1.2rem', fontWeight: 600 }}>
            {subWord}
          </div>

          {/* Listen cue */}
          <div style={{ marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(255,255,255,0.25)', borderRadius: '999px', padding: '0.35rem 1rem', fontSize: '0.85rem', color: '#fff', fontWeight: 700 }}>
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
        <button type="button" onClick={handlePrev} disabled={cardIndex === 0} style={{
          flex: '0 0 50px', height: '50px', borderRadius: '14px',
          margin: 'clamp(0.3rem, 1.5vw, 0.5rem)',
          background: cardIndex === 0 ? '#f0f0f0' : '#fff',
          border: `2px solid ${cardIndex === 0 ? '#E5E5E5' : '#D0D0D0'}`,
          borderBottom: `5px solid ${cardIndex === 0 ? '#E5E5E5' : '#C0C0C0'}`,
          color: cardIndex === 0 ? '#C0C0C0' : '#3C3C3C',
          cursor: cardIndex === 0 ? 'not-allowed' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: cardIndex === 0 ? 'none' : 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: cardIndex === 0 ? 'none' : '0 5px 0 rgba(0,0,0,0.08)',
        }}
        onMouseEnter={cardIndex === 0 ? undefined : (e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 0 rgba(0,0,0,0.12)'; }}
        onMouseLeave={cardIndex === 0 ? undefined : (e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 5px 0 rgba(0,0,0,0.08)'; }}
        onMouseDown={cardIndex === 0 ? undefined : (e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 2px 0 rgba(0,0,0,0.06)'; }}
        >
          <ChevronLeft size={22} />
        </button>

        <button type="button" onClick={() => speak(currentItem)} style={{
          flex: 1, height: '50px', borderRadius: '14px',
          margin: 'clamp(0.3rem, 1.5vw, 0.5rem)',
          background: vowelBg, color: vowelColor,
          border: `2px solid ${vowelColor}44`, borderBottom: `5px solid ${vowelColor}`,
          fontWeight: 900, fontSize: '1rem', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
          transition: 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: `0 5px 0 rgba(0,0,0,0.08), inset 0 -2px 0 rgba(0,0,0,0.08)`,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 0 rgba(0,0,0,0.12), inset 0 -2px 0 rgba(0,0,0,0.08)`; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 5px 0 rgba(0,0,0,0.08), inset 0 -2px 0 rgba(0,0,0,0.08)`; }}
        onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = `0 2px 0 rgba(0,0,0,0.06), inset 0 -1px 0 rgba(0,0,0,0.08)`; }}
        >
          <Volume2 size={18} />
          {language === 'bm' ? 'Dengar' : 'Listen'}
        </button>

        <button type="button" onClick={handleNext} style={{
          flex: '0 0 auto', padding: '0 1.1rem', height: '50px', borderRadius: '14px',
          margin: 'clamp(0.3rem, 1.5vw, 0.5rem)',
          background: cardIndex === seriesItems.length - 1 ? '#58CC02' : vowelColor,
          color: '#fff', border: 'none',
          borderBottom: `5px solid ${cardIndex === seriesItems.length - 1 ? '#46A302' : vowelColor}CC`,
          fontWeight: 900, fontSize: '1rem', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem',
          transition: 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: '0 5px 0 rgba(0,0,0,0.12), inset 0 -2px 0 rgba(0,0,0,0.1)',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 0 rgba(0,0,0,0.15), inset 0 -2px 0 rgba(0,0,0,0.1)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 5px 0 rgba(0,0,0,0.12), inset 0 -2px 0 rgba(0,0,0,0.1)'; }}
        onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 2px 0 rgba(0,0,0,0.1), inset 0 -1px 0 rgba(0,0,0,0.1)'; }}
        >
          {cardIndex === seriesItems.length - 1
            ? (language === 'bm' ? 'Siap ✓' : 'Done ✓')
            : (language === 'bm' ? 'Seterusnya' : 'Next')}
          {cardIndex < seriesItems.length - 1 && <ChevronRight size={19} />}
        </button>
      </div>

      {/* ── Series Complete Popup ── */}
      {seriesComplete && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(3px)',
          animation: 'kvFadeIn 0.25s ease',
        }}>
          <div style={{
            background: '#fff', borderRadius: '28px',
            padding: '2rem 1.75rem 1.75rem',
            maxWidth: '320px', width: '90%',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
            animation: 'kvPopIn 0.35s cubic-bezier(0.34,1.56,0.64,1)',
          }}>
            {/* Celebrate emoji */}
            <div style={{ fontSize: '3.5rem', lineHeight: 1, marginBottom: '0.75rem', animation: 'kvBounce 1.2s ease-in-out infinite' }}>
              🎉
            </div>

            {/* Title */}
            <h2 style={{ fontSize: '1.55rem', fontWeight: 900, color: '#3C3C3C', margin: '0 0 0.4rem' }}>
              Siri <span style={{ color: '#58CC02' }}>{selectedLetter?.toUpperCase()}</span> Selesai!
            </h2>

            {/* Subtitle */}
            <p style={{ color: '#AFAFAF', fontWeight: 700, fontSize: '0.92rem', margin: '0 0 1.5rem' }}>
              {nextLetter
                ? `Teruskan dengan Siri ${nextLetter.toUpperCase()}`
                : 'Tahniah! Semua huruf selesai!'}
            </p>

            {/* Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {nextLetter && (
                <button type="button" onClick={handleNextLetter} style={{
                  width: '100%', padding: '1rem',
                  background: '#58CC02', color: '#fff',
                  border: 'none', borderBottom: '5px solid #46A302',
                  borderRadius: '16px', fontWeight: 900, fontSize: '1.05rem',
                  cursor: 'pointer',
                  boxShadow: '0 5px 0 rgba(0,0,0,0.10)',
                  transition: 'all 0.15s cubic-bezier(0.34,1.56,0.64,1)',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
                onMouseDown={e => { e.currentTarget.style.transform = 'translateY(2px)'; }}
                onMouseUp={e => { e.currentTarget.style.transform = 'translateY(-3px)'; }}
                >
                  Siri {nextLetter.toUpperCase()} →
                </button>
              )}
              <button type="button" onClick={handleBackToLetters} style={{
                width: '100%', padding: '0.9rem',
                background: '#fff', color: '#3C3C3C',
                border: '2px solid #E5E5E5', borderBottom: '5px solid #D0D0D0',
                borderRadius: '16px', fontWeight: 800, fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: '0 4px 0 rgba(0,0,0,0.06)',
                transition: 'all 0.15s cubic-bezier(0.34,1.56,0.64,1)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
              onMouseDown={e => { e.currentTarget.style.transform = 'translateY(2px)'; }}
              onMouseUp={e => { e.currentTarget.style.transform = 'translateY(-3px)'; }}
              >
                Pilih Huruf Lain
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes kvBounce  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes kvFadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes kvPopIn   { from{opacity:0;transform:scale(0.82) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }
      `}</style>
    </div>
  );
}
