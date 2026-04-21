import React, { useState, useCallback } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import bm_kv_complete, { KV_LETTERS, getKVSeriesByLetter } from '../data/curriculum/bm_kv';
import SpeechManager from '../services/SpeechManager';

// ── Vowel row labels (shown under the KV badge) ──────────────────────────────
const VOWEL_LABELS = ['a', 'i', 'u', 'e (taling)', 'o', 'e (pepet)'];
const VOWEL_COLORS = ['#FF9600', '#1CB0F6', '#58CC02', '#CE82FF', '#FF4B4B', '#00C2A8'];
const VOWEL_BG     = ['#FFF4E0', '#E0F4FF', '#E6FFD4', '#F3DDFF', '#FFE0E0', '#D4FFF8'];

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
  const getDisplayText = (item) => {
    if (!item) return '';
    if (script === 'RUMI') return item.ms?.word ?? '';
    if (script === 'ENG')  return item.en?.word ?? '';
    if (script === 'JAWI') return item.jawi?.word ?? '';
    return '';
  };

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
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F7F7F7' }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          background: '#fff', borderBottom: '2px solid #E5E5E5',
          padding: '0 1rem', height: '56px', flexShrink: 0,
        }}>
          <button onClick={onBack} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#AFAFAF', display: 'flex', alignItems: 'center' }}>
            <ArrowLeft size={24} />
          </button>
          <div style={{ flex: 1, textAlign: 'center', fontWeight: 900, fontSize: '1rem', color: '#3C3C3C' }}>
            🔤 Tahap 1 — Suku Kata KV
          </div>
          <div style={{ width: 24 }} />
        </div>

        {/* Subtitle */}
        <div style={{ padding: '1rem 1rem 0.25rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#AFAFAF', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>
            {language === 'bm' ? 'Pilih Huruf untuk Belajar' : 'Select a Letter to Learn'}
          </p>
        </div>

        {/* Letter Grid */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem 1rem 1.5rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(72px, 1fr))',
            gap: '0.6rem',
            maxWidth: '480px',
            margin: '0 auto',
          }}>
            {KV_LETTERS.map((letter, idx) => {
              const ci = idx % VOWEL_COLORS.length;
              return (
                <button
                  key={letter}
                  onClick={() => handleSelectLetter(letter)}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    background: '#fff',
                    border: `3px solid ${VOWEL_BG[ci]}`,
                    borderBottom: `5px solid ${VOWEL_COLORS[ci]}`,
                    borderRadius: '16px',
                    padding: '0.8rem 0.25rem',
                    cursor: 'pointer',
                    transition: 'transform 0.1s, box-shadow 0.1s',
                    boxShadow: '0 4px 0 #E5E5E5',
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 6px 0 ${VOWEL_COLORS[ci]}`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 0 #E5E5E5'; }}
                  onMouseDown={e => { e.currentTarget.style.transform = 'translateY(2px)'; e.currentTarget.style.boxShadow = '0 1px 0 #E5E5E5'; }}
                  onMouseUp={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                >
                  <span style={{ fontSize: '2rem', fontWeight: 900, color: VOWEL_COLORS[ci], lineHeight: 1 }}>{letter}</span>
                  <span style={{ fontSize: '0.62rem', fontWeight: 700, color: '#AFAFAF', marginTop: '4px' }}>
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
  // ── VIEW 2: Series Complete ──────────────────────────────────────────────
  // ─────────────────────────────────────────────────────────────────────────
  if (seriesComplete) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#fff' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          background: '#fff', borderBottom: '2px solid #E5E5E5',
          padding: '0 1rem', height: '56px', flexShrink: 0,
        }}>
          <button onClick={handleBackToLetters} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#AFAFAF', display: 'flex', alignItems: 'center' }}>
            <ArrowLeft size={24} />
          </button>
          <div style={{ flex: 1, textAlign: 'center', fontWeight: 900, fontSize: '1rem', color: '#3C3C3C' }}>
            Siri {selectedLetter} ✅
          </div>
          <div style={{ width: 24 }} />
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', gap: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '5rem', animation: 'kvBounce 1.5s ease-in-out infinite' }}>🎉</div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#3C3C3C', margin: 0 }}>
            Siri <span style={{ color: '#58CC02' }}>{selectedLetter}</span> Selesai!
          </h2>
          <p style={{ color: '#AFAFAF', fontWeight: 700, fontSize: '0.95rem', margin: 0 }}>
            {nextLetter
              ? (language === 'bm' ? `Teruskan dengan Siri ${nextLetter}` : `Continue with Letter ${nextLetter} Series`)
              : (language === 'bm' ? 'Tahniah! Semua huruf selesai!' : 'All letters complete!')}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', maxWidth: '320px' }}>
            {nextLetter && (
              <button onClick={handleNextLetter} style={{
                width: '100%', padding: '1.1rem',
                background: '#58CC02', color: '#fff',
                border: 'none', borderBottom: '4px solid #46A302',
                borderRadius: '16px', fontWeight: 900, fontSize: '1.1rem',
                cursor: 'pointer',
              }}>
                Siri {nextLetter} →
              </button>
            )}
            <button onClick={handleBackToLetters} style={{
              width: '100%', padding: '1rem',
              background: '#fff', color: '#3C3C3C',
              border: '2px solid #E5E5E5', borderBottom: '4px solid #D0D0D0',
              borderRadius: '16px', fontWeight: 800, fontSize: '1rem',
              cursor: 'pointer',
            }}>
              {language === 'bm' ? '← Pilih Huruf Lain' : '← Pick Another Letter'}
            </button>
          </div>
        </div>

        <style>{`@keyframes kvBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }`}</style>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // ── VIEW 3: Flashcard ────────────────────────────────────────────────────
  // ─────────────────────────────────────────────────────────────────────────
  const displayText = getDisplayText(currentItem);
  const isJawi      = script === 'JAWI';
  const isActive    = activeSyl === cardIndex;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F7F7F7' }}>

      {/* ── Header with progress dots ── */}
      <div style={{
        display: 'flex', alignItems: 'center',
        background: '#fff', borderBottom: '2px solid #E5E5E5',
        padding: '0 1rem', height: '56px', flexShrink: 0, gap: '0.5rem',
      }}>
        <button onClick={handleBackToLetters} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#AFAFAF', display: 'flex', alignItems: 'center' }}>
          <ArrowLeft size={22} />
        </button>

        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '5px' }}>
          {seriesItems.map((_, i) => (
            <div key={i} style={{
              width: i === cardIndex ? 22 : 9,
              height: 9, borderRadius: '999px',
              background: i < cardIndex ? '#58CC02' : i === cardIndex ? vowelColor : '#E5E5E5',
              transition: 'all 0.3s',
            }} />
          ))}
        </div>

        <div style={{
          background: vowelBg, color: vowelColor,
          borderRadius: '999px', padding: '4px 12px',
          fontWeight: 900, fontSize: '0.85rem',
        }}>
          Siri <strong>{selectedLetter}</strong>
        </div>
      </div>

      {/* ── Script Toggle ── */}
      <div style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem 1rem 0.25rem', justifyContent: 'center', flexShrink: 0 }}>
        {SCRIPTS.map(s => (
          <button key={s.key} onClick={() => { setScript(s.key); setActiveSyl(null); }} style={{
            flex: 1, maxWidth: 100, padding: '0.5rem 0',
            background: script === s.key ? s.color : '#fff',
            color:      script === s.key ? '#fff'   : s.color,
            border:     `2px solid ${s.color}`,
            borderBottom: `4px solid ${script === s.key ? s.color : '#D0D0D0'}`,
            borderRadius: '12px', fontWeight: 900, fontSize: '0.85rem',
            cursor: 'pointer', transition: 'all 0.15s',
            transform: script === s.key ? 'translateY(2px)' : 'none',
          }}>
            {s.label}
          </button>
        ))}
      </div>

      {/* ── Vowel label ── */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '0.25rem 1rem 0.1rem', flexShrink: 0 }}>
        <div style={{
          background: vowelBg, color: vowelColor,
          borderRadius: '999px', padding: '3px 14px',
          fontWeight: 800, fontSize: '0.78rem', letterSpacing: '0.5px',
        }}>
          {vowelLabel} — {cardIndex + 1} / {seriesItems.length}
        </div>
      </div>

      {/* ── Main Card ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0.5rem 1rem', gap: '0.75rem' }}>
        <div style={{
          width: '100%', maxWidth: '400px',
          background: '#fff', borderRadius: '28px',
          border: `3px solid ${vowelBg}`,
          boxShadow: `0 8px 0 ${vowelColor}33`,
          padding: '1.5rem 1.5rem 1.75rem', textAlign: 'center',
          position: 'relative', minHeight: '220px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* Sound button */}
          <button onClick={() => speak(currentItem)} title="Play sound" style={{
            position: 'absolute', top: 12, right: 12,
            background: vowelBg, border: 'none', borderRadius: '50%',
            width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: vowelColor, transition: 'transform 0.1s',
          }}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.88)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Volume2 size={19} />
          </button>

          {/* KV syllable badge */}
          <div style={{
            background: vowelColor, color: '#fff',
            borderRadius: '10px', padding: '3px 16px',
            fontWeight: 900, fontSize: '1rem', marginBottom: '0.75rem',
            letterSpacing: '2px',
          }}>
            {currentItem?.kv?.toUpperCase()}
          </div>

          {/* Emoji icon */}
          <div style={{ fontSize: '3rem', lineHeight: 1.2, marginBottom: '0.5rem', animation: 'kvBounce 2.5s ease-in-out infinite' }}>
            {currentItem?.icon}
          </div>

          {/* Main word text */}
          <div onClick={() => speak(currentItem)} style={{
            fontSize: isJawi
              ? 'clamp(2rem, 10vw, 3rem)'
              : 'clamp(2rem, 10vw, 3.2rem)',
            fontWeight: 900, lineHeight: 1.2,
            color: isActive ? vowelColor : '#3C3C3C',
            direction: isJawi ? 'rtl' : 'ltr',
            fontFamily: isJawi ? '"Lateef", "Noto Naskh Arabic", serif' : 'inherit',
            cursor: 'pointer',
            transition: 'color 0.2s, transform 0.15s',
            transform: isActive ? 'scale(1.06)' : 'scale(1)',
            wordBreak: 'break-word', maxWidth: '100%',
          }}>
            {displayText}
          </div>

          {/* Helper hints */}
          {script === 'JAWI' && (
            <p style={{ fontSize: '0.88rem', color: '#AFAFAF', fontWeight: 700, marginTop: '0.5rem', margin: '0.5rem 0 0' }}>
              {currentItem?.ms?.word}
            </p>
          )}
          {script === 'ENG' && (
            <p style={{ fontSize: '0.82rem', color: '#AFAFAF', fontWeight: 700, marginTop: '0.4rem' }}>
              BM: {currentItem?.ms?.word}
            </p>
          )}
          {script === 'RUMI' && (
            <p style={{ fontSize: '0.78rem', color: '#AFAFAF', fontWeight: 700, marginTop: '0.4rem' }}>
              {selectedLetter}{vowelLabel.split(' ')[0]} — {vowelLabel}
            </p>
          )}
        </div>

        {/* ── Mini vowel strip ── */}
        <div style={{ display: 'flex', gap: '0.35rem', width: '100%', maxWidth: '400px', overflowX: 'auto', paddingBottom: '4px' }}>
          {seriesItems.map((it, i) => {
            const isA = i === cardIndex;
            const isDone = i < cardIndex;
            const c = VOWEL_COLORS[i % VOWEL_COLORS.length];
            const b = VOWEL_BG[i % VOWEL_BG.length];
            return (
              <button key={it.id} onClick={() => { setCardIndex(i); setActiveSyl(null); }} style={{
                flex: '1 0 auto', minWidth: 44, maxWidth: 64,
                padding: '0.35rem 0.1rem',
                background: isA ? c : isDone ? b : '#fff',
                color: isA ? '#fff' : isDone ? c : '#AFAFAF',
                border: `2px solid ${isA ? c : isDone ? c : '#E5E5E5'}`,
                borderBottom: `4px solid ${isA ? c : isDone ? c : '#D0D0D0'}`,
                borderRadius: '10px', fontWeight: 900, fontSize: '0.72rem',
                cursor: 'pointer', transition: 'all 0.15s', textAlign: 'center',
              }}>
                {it.kv.toUpperCase()}
                {isDone && <div style={{ fontSize: '0.58rem' }}>✓</div>}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Bottom Nav ── */}
      <div style={{
        display: 'flex', gap: '0.75rem', padding: '0.75rem 1rem',
        paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))',
        background: '#fff', borderTop: '2px solid #E5E5E5', flexShrink: 0,
      }}>
        <button onClick={handlePrev} disabled={cardIndex === 0} style={{
          flex: '0 0 50px', height: '50px', borderRadius: '14px',
          background: cardIndex === 0 ? '#f0f0f0' : '#fff',
          border: `2px solid ${cardIndex === 0 ? '#E5E5E5' : '#D0D0D0'}`,
          borderBottom: `4px solid ${cardIndex === 0 ? '#E5E5E5' : '#C0C0C0'}`,
          color: cardIndex === 0 ? '#C0C0C0' : '#3C3C3C',
          cursor: cardIndex === 0 ? 'not-allowed' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <ChevronLeft size={22} />
        </button>

        <button onClick={() => speak(currentItem)} style={{
          flex: 1, height: '50px', borderRadius: '14px',
          background: vowelBg, color: vowelColor,
          border: `2px solid ${vowelColor}44`, borderBottom: `4px solid ${vowelColor}`,
          fontWeight: 900, fontSize: '1rem', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
        }}>
          <Volume2 size={18} />
          {language === 'bm' ? 'Dengar' : 'Listen'}
        </button>

        <button onClick={handleNext} style={{
          flex: '0 0 auto', padding: '0 1.1rem', height: '50px', borderRadius: '14px',
          background: cardIndex === seriesItems.length - 1 ? '#58CC02' : vowelColor,
          color: '#fff', border: 'none',
          borderBottom: `4px solid ${cardIndex === seriesItems.length - 1 ? '#46A302' : vowelColor}CC`,
          fontWeight: 900, fontSize: '1rem', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem',
        }}>
          {cardIndex === seriesItems.length - 1
            ? (language === 'bm' ? 'Siap ✓' : 'Done ✓')
            : (language === 'bm' ? 'Seterusnya' : 'Next')}
          {cardIndex < seriesItems.length - 1 && <ChevronRight size={19} />}
        </button>
      </div>

      <style>{`@keyframes kvBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }`}</style>
    </div>
  );
}
