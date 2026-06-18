import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import { PSK_CATEGORIES, getPskLettersByCategory, getPskSeriesByCategoryLetter, getPskLetterCount } from '../../../../data/curriculum/bm_perkataan_sukar';
import SpeechManager from '../../../../services/SpeechManager';
import BMHeader from '../../_shared/BMHeader';

const ACCENT = '#1E7AC9';
const ACCENT_TINT = '#E7F1FB';

const CARD_PALETTE = [
  { color: '#EF4444', tint: '#FEF2F2' },
  { color: '#F59E0B', tint: '#FFFBEB' },
  { color: '#10B981', tint: '#ECFDF5' },
  { color: '#3B82F6', tint: '#EFF6FF' },
  { color: '#8B5CF6', tint: '#F5F3FF' },
  { color: '#EC4899', tint: '#FDF2F8' },
  { color: '#14B8A6', tint: '#F0FDFA' },
];

const SCRIPTS = [
  { key: 'RUMI', label: 'RUMI', color: '#1CB0F6', bg: '#D0F0FF' },
  { key: 'ENG',  label: 'ENG',  color: '#FF9600', bg: '#FFF0CC' },
  { key: 'JAWI', label: 'JAWI', color: '#CE82FF', bg: '#EDD9FF' },
];

export default function PerkataanSukarLearningPage({ onBack, language, onStartQuiz }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLetter,   setSelectedLetter]   = useState(null);
  const [cardIndex,        setCardIndex]        = useState(0);
  const [script,           setScript]           = useState('RUMI');

  const categoryLetters = selectedCategory ? getPskLettersByCategory(selectedCategory) : [];
  const currentLetterIdx = categoryLetters.indexOf(selectedLetter);
  const seriesItems = selectedCategory && selectedLetter
    ? getPskSeriesByCategoryLetter(selectedCategory, selectedLetter) : [];
  const currentItem = seriesItems[cardIndex] ?? null;

  const currentCategory = PSK_CATEGORIES.find(c => c.id === selectedCategory) ?? {};

  const speak = useCallback((item) => {
    if (!item) return;
    const text = script === 'ENG' ? item.en?.word : item.ms?.word;
    const lang = script === 'ENG' ? 'en-US' : 'ms-MY';
    SpeechManager.speak(text, lang);
  }, [script]);

  // ── Navigation ────────────────────────────────────────────────────────────
  const handleNext = () => {
    if (cardIndex < seriesItems.length - 1) {
      setCardIndex(c => c + 1);
    } else {
      // Last card of the letter → jump straight to the next letter, or back to
      // the letter picker if this was the last letter in the category.
      const nextIdx = currentLetterIdx + 1;
      if (nextIdx < categoryLetters.length) {
        setSelectedLetter(categoryLetters[nextIdx]);
        setCardIndex(0);
        setScript('RUMI');
      } else {
        handleBackToCategories();
      }
    }
  };

  const handlePrev = () => {
    if (cardIndex > 0) {
      setCardIndex(c => c - 1);
    } else if (currentLetterIdx > 0) {
      // First card of a letter → step back into the previous letter's last card.
      const prevLetter = categoryLetters[currentLetterIdx - 1];
      const prevSeries = getPskSeriesByCategoryLetter(selectedCategory, prevLetter);
      setSelectedLetter(prevLetter);
      setCardIndex(Math.max(0, prevSeries.length - 1));
      setScript('RUMI');
    }
  };

  const handleSelectCategory = (catId) => {
    const letters = getPskLettersByCategory(catId);
    setSelectedCategory(catId);
    setSelectedLetter(letters[0] ?? null); // skip the letter picker — go straight to the cards
    setCardIndex(0);
    setScript('RUMI');
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedLetter(null);
    setCardIndex(0);
  };

  // ──────────────────────────────────────────────────────────────────────────
  // ── VIEW 1: Category Picker ──────────────────────────────────────────────
  // ──────────────────────────────────────────────────────────────────────────
  if (!selectedCategory) {
    const digrafCats  = PSK_CATEGORIES.filter(c => c.kind === 'digraf');
    const diftongCats = PSK_CATEGORIES.filter(c => c.kind === 'diftong');

    const renderCatTile = (cat) => {
      const gi = PSK_CATEGORIES.indexOf(cat);
      const pal = CARD_PALETTE[gi % CARD_PALETTE.length];
      const letterCount = getPskLetterCount(cat.id);
      const ready = letterCount > 0;
      return (
        <button
          type="button"
          key={cat.id}
          className={`psk-cat-tile${ready ? '' : ' is-soon'}`}
          onClick={() => handleSelectCategory(cat.id)}
          style={{
            '--kc': pal.color,
            '--kt': pal.tint,
            '--kc-border': pal.color + '33',
            '--kc-under': pal.color + '2e',
          }}
        >
          <span className="psk-cat-sound">{cat.sound}</span>
          <span className="psk-cat-cap" style={{ color: ready ? pal.color : '#94A3B8' }}>
            {ready
              ? `${letterCount} ${language === 'bm' ? 'huruf' : 'letters'}`
              : (language === 'bm' ? 'Akan datang' : 'Soon')}
          </span>
        </button>
      );
    };

    return (
      <div className="psk-cat-root">
        <style>{`
          .psk-cat-root {
            display: flex; flex-direction: column;
            height: 100%; overflow: hidden;
            font-family: 'Fredoka', system-ui, sans-serif;
            background: radial-gradient(ellipse 75% 55% at 0% 0%, rgba(30,122,201,.10) 0%, transparent 70%), radial-gradient(ellipse 75% 55% at 100% 0%, rgba(30,122,201,.06) 0%, transparent 70%), radial-gradient(ellipse 75% 55% at 0% 100%, rgba(30,122,201,.05) 0%, transparent 70%), radial-gradient(ellipse 75% 55% at 100% 100%, rgba(30,122,201,.08) 0%, transparent 70%), #FFFDF8;
          }
          .psk-cat-body {
            flex: 1; min-height: 0;
            display: flex; flex-direction: column; justify-content: center;
            gap: clamp(10px, 2.6vh, 22px);
            width: 100%; max-width: 640px; margin: 0 auto;
            padding: clamp(10px, 2.6vh, 22px) clamp(12px, 4vw, 28px) calc(clamp(10px, 2.6vh, 22px) + env(safe-area-inset-bottom, 0px));
          }
          .psk-cat-section { display: flex; flex-direction: column; gap: clamp(5px, 1.3vh, 11px); }
          .psk-cat-label {
            font-family: 'Baloo 2', sans-serif; font-weight: 800;
            font-size: clamp(11px, 2.8vw, 14px); letter-spacing: .1em; text-transform: uppercase;
            color: #64748B; padding-left: 4px;
          }
          .psk-cat-grid { display: grid; gap: clamp(8px, 2vw, 14px); }
          .psk-cat-grid--4 { grid-template-columns: repeat(4, 1fr); }
          .psk-cat-grid--3 { grid-template-columns: repeat(3, 1fr); }
          .psk-cat-tile {
            height: clamp(58px, 12vh, 116px);
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            gap: clamp(2px, .9vh, 7px);
            background: linear-gradient(180deg, var(--kt) 0%, #fff 78%);
            border: 2.5px solid var(--kc-border);
            border-radius: clamp(13px, 2.2vh, 20px);
            box-shadow: 0 4px 0 var(--kc-under), 0 10px 22px -14px rgba(0,0,0,.18);
            cursor: pointer; font-family: inherit;
            -webkit-tap-highlight-color: transparent;
            transition: transform .12s ease, box-shadow .12s ease, border-color .12s ease;
          }
          @media (hover: hover) {
            .psk-cat-tile:hover { border-color: var(--kc); transform: translateY(-2px); }
          }
          .psk-cat-tile:active { transform: translateY(2px); box-shadow: 0 1px 0 var(--kc-under), 0 4px 10px -8px rgba(0,0,0,.18); }
          .psk-cat-tile.is-soon { opacity: .55; }
          .psk-cat-sound {
            font-family: 'Baloo 2', sans-serif; font-weight: 800;
            font-size: clamp(20px, 6vw, 34px); line-height: 1; color: var(--kc);
          }
          .psk-cat-cap {
            font-family: 'Fredoka', sans-serif; font-weight: 700;
            font-size: clamp(9px, 2.3vw, 12px); line-height: 1;
            background: #fff; border-radius: 999px; padding: 3px 9px;
            box-shadow: 0 2px 0 rgba(0,0,0,.06);
          }
          .psk-cat-quiz {
            align-self: center; width: 100%; max-width: 360px;
            font-family: 'Baloo 2','Fredoka',sans-serif; font-weight: 800;
            font-size: clamp(14px, 3.6vw, 17px); color: #fff; cursor: pointer;
            border: none; border-radius: 999px;
            padding: clamp(9px, 1.6vh, 13px) 24px;
            background: linear-gradient(180deg, ${ACCENT}cc, ${ACCENT});
            box-shadow: 0 4px 0 ${ACCENT}66, 0 12px 24px -12px ${ACCENT}90;
          }
        `}</style>

        <BMHeader
          onBack={onBack}
          language={language}
          title={language === 'bm' ? 'Perkataan Sukar' : 'Difficult Words'}
          sectionLabel={language === 'bm' ? 'Pilih Bunyi' : 'Choose a Sound'}
        />

        <div className="psk-cat-body">
          <section className="psk-cat-section">
            <div className="psk-cat-label">{language === 'bm' ? 'Digraf' : 'Digraphs'}</div>
            <div className="psk-cat-grid psk-cat-grid--4">{digrafCats.map(renderCatTile)}</div>
          </section>

          <section className="psk-cat-section">
            <div className="psk-cat-label">{language === 'bm' ? 'Diftong' : 'Diphthongs'}</div>
            <div className="psk-cat-grid psk-cat-grid--3">{diftongCats.map(renderCatTile)}</div>
          </section>

          {onStartQuiz && (
            <button type="button" className="psk-cat-quiz" onClick={onStartQuiz}>
              🎯 {language === 'bm' ? 'Sedia untuk Kuiz?' : 'Ready for Quiz?'}
            </button>
          )}
        </div>
      </div>
    );
  }

  // ──────────────────────────────────────────────────────────────────────────
  // ── VIEW 2: Letter Picker (per category) ─────────────────────────────────
  // ──────────────────────────────────────────────────────────────────────────
  if (!selectedLetter) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto',
        background: 'radial-gradient(ellipse 75% 55% at 0% 0%, rgba(30,122,201,.10) 0%, transparent 70%), radial-gradient(ellipse 75% 55% at 100% 0%, rgba(30,122,201,.06) 0%, transparent 70%), radial-gradient(ellipse 75% 55% at 0% 100%, rgba(30,122,201,.05) 0%, transparent 70%), radial-gradient(ellipse 75% 55% at 100% 100%, rgba(30,122,201,.08) 0%, transparent 70%), #FFFDF8',
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
            aspect-ratio: 1 / 1.05; width: 100%;
            container-type: inline-size;
            overflow: hidden;
            position: relative;
            display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            gap: clamp(2px, 1vh, 8px);
            padding: clamp(6px, 1.4vh, 14px) 4px;
            background: linear-gradient(180deg, var(--kt) 0%, #fff 72%);
            border: 2.5px solid var(--kc-border);
            border-radius: clamp(14px, 2.6vh, 22px);
            box-shadow: 0 clamp(3px, 0.6vh, 5px) 0 var(--kc-under), 0 10px 22px -14px rgba(0,0,0,.18);
            cursor: pointer;
            font-family: inherit;
            transition: transform .12s ease, box-shadow .12s ease, border-color .12s ease;
            -webkit-tap-highlight-color: transparent;
            animation: kvTileIn .5s cubic-bezier(.34,1.56,.64,1) forwards;
          }
          @keyframes kvTileIn {
            0%   { opacity: 0; transform: translateY(22px) scale(.94); }
            70%  { opacity: 1; transform: translateY(-4px) scale(1.02); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          @media (hover: hover) {
            .kv-letter-tile:hover { border-color: var(--kc); transform: translateY(-2px); }
          }
          .kv-letter-tile:active {
            transform: translateY(2px);
            box-shadow: 0 1px 0 var(--kc-under), 0 4px 10px -8px rgba(0,0,0,.18);
          }
          .kv-tile-letter {
            font-family: 'Baloo 2', sans-serif; font-weight: 800;
            font-size: 48cqi; line-height: 1; color: var(--kc);
            display: flex; align-items: baseline;
          }
          .kv-tile-letter small {
            font-size: 0.58em; font-weight: 800;
            opacity: 0.5; margin-left: 3px;
          }
          .kv-tile-cap {
            background: #fff; border-radius: 10cqi; padding: 5cqi 8cqi;
            box-shadow: 0 2px 0 rgba(0,0,0,.08);
            text-align: center; font-family: 'Fredoka',sans-serif; font-weight: 700;
            font-size: 18cqi; line-height: 1;
          }
          @media (max-width: 400px) {
            .kv-letter-tile { border-radius: 20px; padding: clamp(5px, 1.2vh, 10px) 3px; }
            .kv-tile-letter { font-size: 40cqi; }
            .kv-tile-cap { padding: 4cqi 6cqi; font-size: 16cqi; border-radius: 8cqi; }
          }
        `}</style>

        <BMHeader
          onBack={handleBackToCategories}
          language={language}
          title={language === 'bm' ? 'Perkataan Sukar' : 'Difficult Words'}
          sectionLabel={currentCategory.label}
        />

        <div style={{ padding: '16px 0.75rem 1.5rem', maxWidth: '600px', margin: '0 auto', width: '100%' }}>
          <p style={{ textAlign: 'center', color: '#94A3B8', fontFamily: "'Fredoka',sans-serif", fontWeight: 600, fontSize: '0.95rem', padding: '2rem 0' }}>
            {language === 'bm'
              ? 'Kategori ini belum tersedia lagi.'
              : 'This category is not yet available.'}
          </p>

          {onStartQuiz && (
            <button type="button" onClick={onStartQuiz} style={{
              display: 'block', width: '100%', maxWidth: '420px',
              margin: '20px auto 4px',
              fontFamily: "'Baloo 2','Fredoka',sans-serif", fontWeight: 800,
              fontSize: 'clamp(15px, 3.8vw, 18px)',
              color: '#fff', cursor: 'pointer',
              border: 'none', borderRadius: '999px',
              padding: '13px 28px',
              background: `linear-gradient(180deg, ${ACCENT}cc, ${ACCENT})`,
              boxShadow: `0 4px 0 ${ACCENT}66, 0 12px 24px -12px ${ACCENT}90`,
            }}>
              🎯 {language === 'bm' ? 'Sedia untuk Kuiz?' : 'Ready for Quiz?'}
            </button>
          )}
        </div>
      </div>
    );
  }

  // ──────────────────────────────────────────────────────────────────────────
  // ── VIEW 3: Flashcards ────────────────────────────────────────────────────
  // ──────────────────────────────────────────────────────────────────────────
  const isJawi   = script === 'JAWI';
  const cap      = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '');
  const msSyl    = cap(currentItem?.syl || currentItem?.ms?.word); // suku kata: "Gan-tung"
  const enWord   = cap(currentItem?.en?.word);
  const jawiWord = currentItem?.jawi?.word ?? '';
  // RUMI shows the syllable-split word; ENG/JAWI show their own script.
  const mainWord = script === 'ENG' ? enWord : script === 'JAWI' ? jawiWord : msSyl;
  const subWord  = script === 'ENG' ? cap(currentItem?.ms?.word) : script === 'JAWI' ? cap(currentItem?.ms?.word) : enWord;
  // Back is only inactive on the very first card of the category's first letter;
  // otherwise it steps back across letters (B→A's last card, etc).
  const atStart  = cardIndex === 0 && currentLetterIdx <= 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F7F7F7', position: 'relative' }}>

      <BMHeader onBack={handleBackToCategories} language={language} title={language === 'bm' ? 'Perkataan Sukar' : 'Difficult Words'} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0.5rem 1rem', gap: '0.5rem', overflowY: 'auto' }}>
        {/* ── Script Toggle ── */}
        <div style={{ display: 'flex', gap: 'clamp(0.3rem, 2vw, 0.75rem)', justifyContent: 'center', width: '100%', maxWidth: '400px', padding: 'clamp(0.5rem, 2vw, 1rem)' }}>
          {SCRIPTS.map(s => (
            <button type="button" key={s.key} onClick={() => { setScript(s.key); }} style={{
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

        {/* ── Sound chip — category label + card index ── */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            background: ACCENT_TINT, color: ACCENT,
            borderRadius: '999px', padding: '3px 14px',
            fontWeight: 800, fontSize: '0.78rem', letterSpacing: '0.5px',
          }}>
            {currentCategory.label} — {cardIndex + 1} / {seriesItems.length}
          </div>
        </div>

        {/* ── Main Card ── */}
        <button type="button" onClick={() => speak(currentItem)} style={{
          width: '100%', maxWidth: '400px',
          background: ACCENT, borderRadius: '24px', border: 'none',
          cursor: 'pointer', padding: '1.5rem 1rem 1.75rem',
          boxShadow: `0 6px 0 ${ACCENT}CC`,
          textAlign: 'center', transition: 'transform 0.1s',
          WebkitTapHighlightColor: 'transparent',
        }}
          onPointerDown={e => e.currentTarget.style.transform = 'translateY(3px)'}
          onPointerUp={e => e.currentTarget.style.transform = ''}
          onPointerLeave={e => e.currentTarget.style.transform = ''}
        >
          {/* Main word — syllable-split (RUMI) or its own script (ENG/JAWI) */}
          <div style={{
            fontSize: isJawi ? 'clamp(2rem, 9vw, 2.6rem)' : 'clamp(1.9rem, 8.5vw, 2.5rem)',
            fontWeight: 800, color: '#fff', marginTop: '0.25rem', marginBottom: '0.2rem', lineHeight: 1.2,
            direction: isJawi ? 'rtl' : 'ltr',
            fontFamily: isJawi ? '"Lateef", "Noto Naskh Arabic", serif' : 'inherit',
            wordBreak: 'break-word', maxWidth: '100%',
          }}>
            {mainWord}
          </div>
          {/* Translation line */}
          <div style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.85)', minHeight: '1.2rem', fontWeight: 600 }}>
            {subWord}
          </div>

          {/* Example sentence */}
          {currentItem?.contoh && (
            <div style={{
              marginTop: '1.1rem', background: 'rgba(255,255,255,0.18)',
              borderRadius: '14px', padding: '0.6rem 0.9rem', textAlign: 'center',
            }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.4px', color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', marginBottom: '0.15rem' }}>
                {language === 'bm' ? 'Contoh ayat' : 'Example sentence'}
              </div>
              <div style={{ fontSize: '0.98rem', fontWeight: 600, color: '#fff', lineHeight: 1.35 }}>
                {currentItem.contoh}
              </div>
            </div>
          )}
        </button>
      </div>

      {/* ── Bottom Nav ── */}
      <div style={{
        display: 'flex', gap: 'clamp(0.5rem, 2vw, 1rem)', padding: 'clamp(0.6rem, 2vw, 1rem)',
        paddingBottom: 'calc(clamp(0.6rem, 2vw, 1rem) + env(safe-area-inset-bottom, 0px))',
        background: '#fff', borderTop: '2px solid #E5E5E5', flexShrink: 0,
      }}>
        <button type="button" onClick={handlePrev} disabled={atStart} style={{
          flex: '0 0 50px', height: '50px', borderRadius: '14px',
          margin: 'clamp(0.3rem, 1.5vw, 0.5rem)',
          background: atStart ? '#f0f0f0' : '#fff',
          border: `2px solid ${atStart ? '#E5E5E5' : '#D0D0D0'}`,
          borderBottom: `5px solid ${atStart ? '#E5E5E5' : '#C0C0C0'}`,
          color: atStart ? '#C0C0C0' : '#3C3C3C',
          cursor: atStart ? 'not-allowed' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: atStart ? 'none' : 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: atStart ? 'none' : '0 5px 0 rgba(0,0,0,0.08)',
        }}
        onMouseEnter={atStart ? undefined : (e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 0 rgba(0,0,0,0.12)'; }}
        onMouseLeave={atStart ? undefined : (e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 5px 0 rgba(0,0,0,0.08)'; }}
        onMouseDown={atStart ? undefined : (e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 2px 0 rgba(0,0,0,0.06)'; }}
        >
          <ChevronLeft size={22} />
        </button>

        <button type="button" onClick={() => speak(currentItem)} style={{
          flex: 1, height: '50px', borderRadius: '14px',
          margin: 'clamp(0.3rem, 1.5vw, 0.5rem)',
          background: ACCENT_TINT, color: ACCENT,
          border: `2px solid ${ACCENT}44`, borderBottom: `5px solid ${ACCENT}`,
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
          background: ACCENT,
          color: '#fff', border: 'none',
          borderBottom: `5px solid ${ACCENT}CC`,
          fontWeight: 900, fontSize: '1rem', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem',
          transition: 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: '0 5px 0 rgba(0,0,0,0.12), inset 0 -2px 0 rgba(0,0,0,0.1)',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 0 rgba(0,0,0,0.15), inset 0 -2px 0 rgba(0,0,0,0.1)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 5px 0 rgba(0,0,0,0.12), inset 0 -2px 0 rgba(0,0,0,0.1)'; }}
        onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 2px 0 rgba(0,0,0,0.1), inset 0 -1px 0 rgba(0,0,0,0.1)'; }}
        >
          {language === 'bm' ? 'Seterusnya' : 'Next'}
          <ChevronRight size={19} />
        </button>
      </div>

      <style>{`
        @keyframes kvBounce  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes kvFadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes kvPopIn   { from{opacity:0;transform:scale(0.82) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }
      `}</style>
    </div>
  );
}
