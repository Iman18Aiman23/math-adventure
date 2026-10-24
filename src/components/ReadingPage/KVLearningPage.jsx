import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Volume2, Settings, Check } from 'lucide-react';
import { KV_LETTERS, getKVSeriesByLetter } from '../../data/curriculum/bm_kv';
import SpeechManager from '../../services/SpeechManager';
import BMHeader from '../../components/BahasaMelayuPage/_shared/BMHeader';
import SyllableExample from './SyllableExample';
import './KVLearningPage.css';
import KVCompletion from './KVCompletion';

// ── Card palette — mirrors MengenalHuruf's 7-colour cycle ─────────────────────
const CARD_PALETTE = [
  { color: '#EF4444', tint: '#FEF2F2' },
  { color: '#F59E0B', tint: '#FFFBEB' },
  { color: '#10B981', tint: '#ECFDF5' },
  { color: '#3B82F6', tint: '#EFF6FF' },
  { color: '#8B5CF6', tint: '#F5F3FF' },
  { color: '#EC4899', tint: '#FDF2F8' },
  { color: '#14B8A6', tint: '#F0FDFA' },
];

// ── Script button config ──────────────────────────────────────────────────────
const SCRIPTS = [
  { key: 'RUMI', label: 'RUMI', color: '#1CB0F6', bg: '#D0F0FF' },
  { key: 'ENG',  label: 'ENG',  color: '#FF9600', bg: '#FFF0CC' },
  { key: 'JAWI', label: 'JAWI', color: '#CE82FF', bg: '#EDD9FF' },
];

const JAWI_VOWELS = { a: 'ا', e: 'ي', i: 'ي', o: 'و', u: 'و' };

function getJawiSyllable(item) {
  const kv = item?.kv?.toLowerCase() ?? '';
  const jawiLetters = Array.from(item?.jawi?.word ?? '');
  if (!kv) return '';
  if (kv === 'a') return 'ا';
  if (!jawiLetters.length) return kv;

  const vowel = JAWI_VOWELS[kv.at(-1)];
  if (kv.length === 1) {
    return jawiLetters[0] === 'ا' && jawiLetters[1] === vowel
      ? jawiLetters.slice(0, 2).join('')
      : jawiLetters[0];
  }

  return jawiLetters[1] === vowel
    ? jawiLetters.slice(0, 2).join('')
    : jawiLetters[0];
}

export default function KVLearningPage({ onBack, onComplete = onBack, language, onStartQuiz, title = language === 'bm' ? 'Suku Kata' : 'Syllables' }) {
  // ── State ─────────────────────────────────────────────────────────────────
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [cardIndex,      setCardIndex]      = useState(0);
  const [script,         setScript]         = useState('RUMI');
  const settingsRef = useRef(null);
  useEffect(() => {
    const dismiss = (event) => {
      const menu = settingsRef.current;
      if (!menu?.open) return;
      if (event.type === 'keydown' && event.key === 'Escape') {
        menu.open = false;
        menu.querySelector('summary').focus();
      } else if (event.type === 'pointerdown' && !menu.contains(event.target)) {
        menu.open = false;
      }
    };
    document.addEventListener('pointerdown', dismiss);
    document.addEventListener('keydown', dismiss);
    return () => {
      document.removeEventListener('pointerdown', dismiss);
      document.removeEventListener('keydown', dismiss);
    };
  }, []);
  const [seriesComplete, setSeriesComplete] = useState(false);
  const isRumi = script === 'RUMI';
  const uiLanguage = isRumi ? 'bm' : language;
  const headerTitle = isRumi ? 'Suku Kata' : title;

  // ── Series data ───────────────────────────────────────────────────────────
  const seriesItems      = selectedLetter ? getKVSeriesByLetter(selectedLetter) : [];
  const currentItem      = seriesItems[cardIndex] ?? null;
  const currentLetterIdx = KV_LETTERS.indexOf(selectedLetter);

  // ── Speak helper ─────────────────────────────────────────────────────────
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
    } else if (currentLetterIdx < KV_LETTERS.length - 1) {
      setSelectedLetter(KV_LETTERS[currentLetterIdx + 1]);
      setCardIndex(0);
    } else {
      setSeriesComplete(true);
    }
  };

  const handlePrev = () => {
    if (cardIndex > 0) {
      setCardIndex(c => c - 1);
    } else if (currentLetterIdx > 0) {
      const previousLetter = KV_LETTERS[currentLetterIdx - 1];
      setSelectedLetter(previousLetter);
      setCardIndex(getKVSeriesByLetter(previousLetter).length - 1);
    }
  };

  const handleSelectLetter = (letter) => {
    setSelectedLetter(letter);
    setCardIndex(0);
    setSeriesComplete(false);
    setScript('RUMI');
  };

  const handleBackToLetters = () => {
    setSelectedLetter(null);
    setCardIndex(0);
    setSeriesComplete(false);
  };


  // ─────────────────────────────────────────────────────────────────────────
  // ── VIEW 1: Letter Picker ────────────────────────────────────────────────
  // ─────────────────────────────────────────────────────────────────────────
  if (!selectedLetter) {
    return (
      <div className="kv-picker">
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
          onBack={onBack}
          language={uiLanguage}
          title={headerTitle}
          sectionLabel={uiLanguage === 'bm' ? 'Pilih Huruf untuk Belajar' : 'Select a Letter to Learn'}
        />

        <div className="kv-picker-body">
          <div className="kv-grid">
            {KV_LETTERS.map((letter, idx) => {
              const pal = CARD_PALETTE[idx % CARD_PALETTE.length];
              const series = getKVSeriesByLetter(letter);
              return (
                <button
                  type="button"
                  key={letter}
                  className="kv-letter-tile"
                  onClick={() => handleSelectLetter(letter)}
                  style={{
                    '--kc': pal.color,
                    '--kt': pal.tint,
                    '--kc-border': pal.color + '33',
                    '--kc-under': pal.color + '2e',
                    animationDelay: `${0.04 + idx * 0.025}s`,
                  }}
                >
                  <span className="kv-tile-letter">
                    {letter}<small>{letter.toLowerCase()}</small>
                  </span>
                  <span className="kv-tile-cap" style={{ color: pal.color }}>
                    {series.length} kad
                  </span>
                </button>
              );
            })}
          </div>

          {onStartQuiz && (
            <button type="button" onClick={onStartQuiz} style={{
              display: 'block', width: '100%', maxWidth: '420px',
              margin: '20px auto 4px',
              fontFamily: "'Baloo 2','Fredoka',sans-serif", fontWeight: 800,
              fontSize: 'clamp(15px, 3.8vw, 18px)',
              color: '#fff', cursor: 'pointer',
              border: 'none', borderRadius: '999px',
              padding: '13px 28px',
              background: 'linear-gradient(180deg, #E8821Acc, #E8821A)',
              boxShadow: '0 4px 0 #E8821A66, 0 12px 24px -12px #E8821A90',
            }}>
              🎯 {uiLanguage === 'bm' ? 'Sedia untuk Kuiz?' : 'Ready for Quiz?'}
            </button>
          )}
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
  const jawiSyllable = getJawiSyllable(currentItem);
  const displayedLetters = isJawi ? jawiSyllable : capKV;
  // Selected script drives the emphasised (main) word; the other line is the translation.
  const mainWord = script === 'ENG' ? enWord : script === 'JAWI' ? jawiWord : msWord;
  const subWord  = script === 'ENG' ? msWord : '';

  return (
    <div className={`kv-learning${isJawi ? ' kv-learning--jawi' : ''}`}>
      <BMHeader onBack={handleBackToLetters} language={uiLanguage} title={headerTitle} actions={
        <details className="kv-settings" ref={settingsRef}>
          <summary aria-label={uiLanguage === 'bm' ? 'Tetapan' : 'Settings'} title={uiLanguage === 'bm' ? 'Tetapan' : 'Settings'}>
            <Settings size={21} aria-hidden="true" />
          </summary>
          <div className="kv-settings-panel" role="group" aria-label={uiLanguage === 'bm' ? 'Pilihan bahasa dan tulisan' : 'Language & script'}>
            <span className="kv-settings-label">{uiLanguage === 'bm' ? 'Bahasa & tulisan' : 'Language & script'}</span>
            {SCRIPTS.map(s => (
              <button type="button" key={s.key} aria-pressed={script === s.key} onClick={() => {
                setScript(s.key);
                settingsRef.current.open = false;
                settingsRef.current.querySelector('summary').focus();
              }}>
                {s.label}{script === s.key && <Check size={17} aria-hidden="true" />}
              </button>
            ))}
          </div>
        </details>
      } />
      <main className="kv-learning-body">
        <article className="kv-flashcard" aria-label={mainWord}>
          <div
            className={`kv-flashcard-letters${displayedLetters.length > 1 ? ' kv-flashcard-letters--syllable' : ''}${isJawi ? ' kv-flashcard-letters--jawi' : ''}`}
            dir={isJawi ? 'rtl' : 'ltr'}
            lang={isJawi ? 'ms-Arab' : 'ms'}
          >
            <span>{displayedLetters}</span>{!isJawi && <small>{currentItem?.kv}</small>}
          </div>
          <div className="kv-flashcard-picture" aria-hidden="true">{currentItem?.icon}</div>
          {script === 'ENG' && <div className="kv-flashcard-word" dir="ltr" lang="en">{mainWord}</div>}
          {script === 'RUMI' && <SyllableExample text={msWord} syllable={currentItem?.kv} label="Contoh perkataan" />}
          {isJawi && <SyllableExample text={jawiWord} syllable={jawiSyllable} label="چونتوه ڤرکاتاءن" dir="rtl" lang="ms-Arab" />}
          {script === 'ENG' && <div className="kv-flashcard-translation" lang="ms">{subWord}</div>}
          <button type="button" className="kv-listen" onClick={() => speak(currentItem)}>
            <Volume2 size={24} aria-hidden="true" />
            {isJawi
              ? <span dir="rtl" lang="ms-Arab">تکن اونتوق دڠر</span>
              : uiLanguage === 'bm' ? 'Tekan untuk dengar' : 'Tap to listen'}
          </button>
        </article>
      </main>
      <footer className="kv-learning-footer">
        <div className="kv-learning-nav">
          <button type="button" className="kv-previous" onClick={handlePrev} disabled={cardIndex === 0 && currentLetterIdx === 0}>
            <ChevronLeft size={20} aria-hidden="true" />
            {isJawi ? <span dir="rtl" lang="ms-Arab">سبلوم</span> : uiLanguage === 'bm' ? 'Sebelumnya' : 'Previous'}
          </button>
          <button type="button" className="kv-next" onClick={handleNext}>
            {isJawi ? <span dir="rtl" lang="ms-Arab">ستروسڽ</span> : uiLanguage === 'bm' ? 'Seterusnya' : 'Next'}
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </footer>

      {seriesComplete && <KVCompletion language={uiLanguage} onReturn={onComplete} />}

    </div>
  );
}
