import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Volume2, Settings, Check } from 'lucide-react';
import { KVK_LETTERS, getKVKSeriesByLetter } from '../../data/curriculum/bm_kvk';
import { KVK_EXAMPLES, KVK_EXAMPLES_JAWI } from '../../data/curriculum/kvkExampleSentences';
import SpeechManager from '../../services/SpeechManager';
import BMHeader from '../../components/BahasaMelayuPage/_shared/BMHeader';
import AZPickerPage from './AZPickerPage';
import SyllableExample from './SyllableExample';
import HomeHeaderActions from '../_shared/HomeHeaderActions';
import './KVLearningPage.css';
import KVCompletion from './KVCompletion';

// ── Script button config ──────────────────────────────────────────────────────
const SCRIPTS = [
  { key: 'RUMI', label: 'RUMI' },
  { key: 'ENG',  label: 'ENG' },
  { key: 'JAWI', label: 'JAWI' },
];

function getKVSyllableRange(word, syllable) {
  const letterRun = /[a-z]+/i.exec(word);
  if (!letterRun) return null;

  const target = syllable?.toLowerCase();
  const matchAt = target ? letterRun[0].toLowerCase().indexOf(target) : -1;
  return matchAt < 0
    ? null
    : [letterRun.index + matchAt, letterRun.index + matchAt + target.length];
}

export default function KVKLearningPage({ onBack, onComplete = onBack, language, onStartQuiz, title = language === 'bm' ? 'Suku Kata KVK' : 'KVK Syllables', ...accountProps }) {
  // ── State ─────────────────────────────────────────────────────────────────
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [cardIndex,      setCardIndex]      = useState(0);
  const [flipDirection, setFlipDirection] = useState(null);
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
  const uiLanguage = language === 'bm' ? 'bm' : 'en';
  const headerTitle = title;

  // ── Series data ───────────────────────────────────────────────────────────
  const seriesItems      = selectedLetter ? getKVKSeriesByLetter(selectedLetter) : [];
  const currentItem      = seriesItems[cardIndex] ?? null;
  const currentLetterIdx = KVK_LETTERS.indexOf(selectedLetter);

  // ── Speak helper ─────────────────────────────────────────────────────────
  const speakText = useCallback((text, lang) => {
    if (text) SpeechManager.speak(text, lang);
  }, []);

  // ── Navigation ────────────────────────────────────────────────────────────
  const handleNext = () => {
    if (cardIndex < seriesItems.length - 1) {
      setFlipDirection('next');
      setCardIndex(c => c + 1);
    } else if (currentLetterIdx < KVK_LETTERS.length - 1) {
      setFlipDirection('next');
      setSelectedLetter(KVK_LETTERS[currentLetterIdx + 1]);
      setCardIndex(0);
    } else {
      setSeriesComplete(true);
    }
  };

  const handlePrev = () => {
    if (cardIndex > 0) {
      setFlipDirection('previous');
      setCardIndex(c => c - 1);
    } else if (currentLetterIdx > 0) {
      setFlipDirection('previous');
      const previousLetter = KVK_LETTERS[currentLetterIdx - 1];
      setSelectedLetter(previousLetter);
      setCardIndex(getKVKSeriesByLetter(previousLetter).length - 1);
    }
  };

  const handleSelectLetter = (letter) => {
    setSelectedLetter(letter);
    setCardIndex(0);
    setFlipDirection(null);
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
      <AZPickerPage
        {...accountProps}
        letters={KVK_LETTERS}
        getCardCount={letter => getKVKSeriesByLetter(letter).length}
        onBack={onBack}
        onSelectLetter={handleSelectLetter}
        language={uiLanguage}
        title={headerTitle}
        onStartQuiz={onStartQuiz}
      />
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // ── VIEW 2 / 3: Flashcard (+ completion popup overlay) ──────────────────
  // ─────────────────────────────────────────────────────────────────────────
  const isJawi   = script === 'JAWI';
  const cap      = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '');
  const capKV    = currentItem?.kvk ? cap(currentItem.kvk) : '';
  const msWord   = cap(currentItem?.ms?.word);
  const enWord   = cap(currentItem?.en?.word);
  const jawiWord = currentItem?.jawi?.word ?? '';
  const jawiSyllable = (currentItem?.jawikvk ?? '');
  const displayedLetters = isJawi ? jawiSyllable : capKV;
  const exampleSentence = isJawi
    ? KVK_EXAMPLES_JAWI[currentItem?.id]
    : KVK_EXAMPLES[currentItem?.id] ?? currentItem?.ms?.sentence;
  // Selected script drives the emphasised (main) word; the other line is the translation.
  const mainWord = script === 'ENG' ? enWord : script === 'JAWI' ? jawiWord : msWord;
  const subWord  = script === 'ENG' ? msWord : '';

  return (
    <div className={`kv-learning kv-syllable-learning kv-learning--kvk kv-learning--unified${isJawi ? ' kv-learning--jawi' : ''}`}>
      <style>{`
        .kv-learning--unified { background: #f5f8fa; }
        .kv-learning--unified .kv-learning-body {
          display: flex;
          flex: 1 1 auto;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          width: 100%;
          min-height: 0;
          padding: clamp(10px, 2vh, 20px) clamp(12px, 4vw, 24px);
        }
        .kv-learning--unified .kv-flashcard {
          display: flex;
          flex: 0 1 auto;
          flex-direction: column;
          align-items: center;
          width: min(100%, 800px);
          max-width: 800px;
          height: auto;
          min-height: 0;
          max-height: 100%;
          margin: 0 auto;
          padding: clamp(14px, 2.5vw, 26px);
          overflow: hidden;
          border: 0;
          border-radius: 28px;
          background: #fff;
          box-shadow: 0 10px 40px rgba(25, 50, 75, .08);
        }
        .kv-learning--unified .kv-flashcard-header {
          flex: 0 0 auto;
          width: 100%;
          padding: 0 0 6px;
          background: transparent;
        }
        .kv-learning--unified .kv-flashcard-top-row { align-self: auto; }
        .kv-learning--unified .kv-flashcard-settings { margin: 4px 4px 0 0; }
        .kv-learning--unified .kv-flashcard-letters {
          font-size: clamp(52px, 8vw, 76px);
          line-height: 1;
        }
        .kv-learning--unified .kv-flashcard-letters--syllable { font-size: clamp(42px, 7vw, 60px); }
        .kv-learning--unified .kv-flashcard-body {
          display: flex;
          flex: 0 1 auto;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          gap: 0;
          padding: 0;
          background: transparent;
        }
        .kv-learning--unified .kv-flashcard-learning-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px !important;
          width: 100%;
        }
        .kv-learning--unified .kv-flashcard-text-group {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: 12px;
          width: min(100%, 480px);
        }
        .kv-learning--unified .kv-flashcard-picture-item {
          display: grid;
          width: clamp(92px, 15vh, 124px);
          aspect-ratio: 1;
          place-items: center;
          border-radius: 50%;
          background: #fff5d7;
        }
        .kv-learning--unified .kv-flashcard-picture {
          display: grid;
          width: 100%;
          height: 100%;
          place-items: center;
          font-size: clamp(54px, 9vh, 76px);
          filter: none;
        }
        .kv-learning--unified .kv-flashcard-example-item,
        .kv-learning--unified .kv-flashcard-sentence-item,
        .kv-learning--unified .kv-flashcard-word-item,
        .kv-learning--unified .kv-flashcard-translation-item {
          width: min(100%, 480px);
        }
        .kv-learning--unified .kv-inline-audio-card,
        .kv-learning--unified .kv-sentence-example {
          display: flex;
          align-items: center;
          box-sizing: border-box;
          width: 100%;
          min-height: 76px;
          gap: 12px;
          padding: 12px 16px;
          border: 0;
          border-radius: 18px;
          background: #fbfdff;
          box-shadow: 0 4px 12px rgba(25, 50, 75, .07);
        }
        .kv-learning--unified .kv-syllable-example {
          flex: 1 1 auto;
          min-width: 0;
          gap: 4px;
          padding: 0;
          border: 0;
          border-radius: 0;
          background: transparent;
          box-shadow: none;
        }
        .kv-learning--unified .kv-syllable-example-label,
        .kv-learning--unified .kv-sentence-example-label {
          color: #667085;
          font: 500 13px/1.2 'Inter', sans-serif;
        }
        .kv-learning--unified .kv-syllable-example-text,
        .kv-learning--unified .kv-sentence-example-text,
        .kv-learning--unified .kv-flashcard-word,
        .kv-learning--unified .kv-flashcard-translation {
          color: #1a1a1a;
          font-weight: 700;
        }
        .kv-learning--unified .kv-syllable-example-text {
          font-size: clamp(28px, 5vw, 38px);
          line-height: 1.15;
        }
        .kv-learning--unified .kv-syllable-highlight,
        .kv-learning--unified .kv-sentence-kv { color: #dc2626; }
        .kv-learning--unified .kv-flashcard-word,
        .kv-learning--unified .kv-flashcard-translation {
          flex: 1 1 auto;
          width: auto;
          min-width: 0;
          text-align: center;
          font-size: clamp(24px, 5vw, 36px);
          line-height: 1.2;
        }
        .kv-learning--unified .kv-sentence-example {
          flex-direction: column;
          align-items: stretch;
          gap: 6px;
        }
        .kv-learning--unified .kv-sentence-example-text {
          flex: 1 1 auto;
          min-width: 0;
          font-size: clamp(20px, 4vw, 30px);
          line-height: 1.25;
        }
        .kv-learning--unified .kv-audio-text-row {
          display: flex;
          align-items: center;
          width: 100%;
          gap: 12px;
        }
        .kv-learning--unified .kv-audio-text-row .kv-sentence-example-text {
          justify-content: center;
        }
        .kv-learning--unified .kv-inline-audio-button {
          display: grid;
          flex: 0 0 40px;
          width: 40px;
          height: 40px;
          min-height: 40px;
          place-items: center;
          padding: 0;
          border: 0;
          border-radius: 50%;
          background: #f3f4f6;
          color: #c92f42;
          cursor: pointer;
        }
        .kv-learning--unified .kv-inline-audio-button:focus-visible {
          outline: 3px solid #c92f42;
          outline-offset: 2px;
        }
        .kv-learning--unified .kv-flashcard-footer { display: none; }
        .kv-learning--unified .kv-learning-footer {
          flex: 0 0 auto;
          width: min(calc(100% - 48px), 850px) !important;
          align-self: center;
          box-sizing: border-box;
          margin: 0 auto !important;
          padding: 8px 0 calc(12px + env(safe-area-inset-bottom, 0px));
          background: #f5f8fa;
        }
        .kv-learning--unified .kv-learning-nav {
          width: 100% !important;
          max-width: none;
          gap: 12px;
          margin-inline: auto !important;
        }
        .kv-learning--unified .kv-learning-nav button {
          min-height: 48px;
          border-radius: 14px;
        }
        .kv-learning--unified .kv-learning-stage { display: contents; }
        @media (min-width: 768px) and (min-height: 560px) {
          .kv-learning--unified .kv-learning-stage {
            display: flex;
            flex: 1 1 auto;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 24px;
            width: 100%;
            min-height: 0;
          }
          .kv-learning--unified .kv-learning-stage > .kv-learning-body {
            flex: 0 0 auto;
            width: 100%;
            padding: 0;
            container-type: normal;
          }
          .kv-learning--unified.kv-syllable-learning .kv-flashcard {
            flex: 0 0 auto !important;
            width: min(calc(100% - 48px), 850px) !important;
            max-width: 850px !important;
            padding: 48px !important;
          }
          .kv-learning--unified.kv-syllable-learning .kv-flashcard-header { padding-bottom: 8px !important; }
          .kv-learning--unified.kv-syllable-learning .kv-flashcard-letters { font-size: 80px !important; }
          .kv-learning--unified.kv-syllable-learning .kv-flashcard-letters--syllable { font-size: 80px !important; }
          .kv-learning--unified.kv-syllable-learning .kv-flashcard-body { gap: 0 !important; }
          .kv-learning--unified.kv-syllable-learning .kv-flashcard-learning-group {
            gap: 12px !important;
          }
          .kv-learning--unified.kv-syllable-learning .kv-flashcard-text-group {
            width: min(100%, 560px) !important;
            gap: 12px !important;
          }
          .kv-learning--unified.kv-syllable-learning .kv-flashcard-picture-item {
            width: 140px !important;
            min-width: 140px !important;
          }
          .kv-learning--unified.kv-syllable-learning .kv-flashcard-picture { font-size: 84px !important; }
          .kv-learning--unified.kv-syllable-learning .kv-flashcard-example-item,
          .kv-learning--unified.kv-syllable-learning .kv-flashcard-sentence-item,
          .kv-learning--unified.kv-syllable-learning .kv-flashcard-word-item,
          .kv-learning--unified.kv-syllable-learning .kv-flashcard-translation-item {
            width: 100% !important;
            max-width: none !important;
          }
          .kv-learning--unified.kv-syllable-learning .kv-inline-audio-card,
          .kv-learning--unified.kv-syllable-learning .kv-sentence-example {
            min-height: 76px !important;
            padding: 10px 16px !important;
          }
          .kv-learning--unified.kv-syllable-learning .kv-syllable-example-text,
          .kv-learning--unified.kv-syllable-learning .kv-flashcard-word,
          .kv-learning--unified.kv-syllable-learning .kv-flashcard-translation { font-size: 52px !important; }
          .kv-learning--unified.kv-syllable-learning .kv-sentence-example-text { font-size: 48px !important; }
          .kv-learning--unified.kv-syllable-learning .kv-learning-footer {
            flex: 0 0 auto !important;
            width: min(calc(100% - 48px), 850px) !important;
            max-width: 850px !important;
            margin: 0 !important;
            padding: 0 0 12px !important;
          }
          .kv-learning--unified.kv-syllable-learning .kv-learning-nav {
            width: 100% !important;
            max-width: none !important;
            margin-inline: auto !important;
          }
        }
        @media (max-width: 480px) {
          .kv-learning--unified.kv-syllable-learning .kv-learning-body {
            align-items: flex-start !important;
            justify-content: flex-start !important;
            padding: clamp(24px, 5vh, 40px) 12px 8px !important;
          }
          .kv-learning--unified.kv-syllable-learning .kv-flashcard {
            flex: 1 1 auto !important;
            align-self: stretch;
            padding: 20px 12px 24px;
            border-radius: 22px;
          }
          .kv-learning--unified .kv-flashcard-body {
            flex: 1 1 auto !important;
            justify-content: space-evenly;
          }
          .kv-learning--unified .kv-flashcard-top-row { padding: 4px 4px 0; }
          .kv-learning--unified .kv-flashcard-letters { font-size: clamp(48px, 14vw, 64px); }
          .kv-learning--unified .kv-flashcard-letters--syllable { font-size: clamp(38px, 10vw, 48px); }
          .kv-learning--unified .kv-flashcard-picture-item { width: clamp(88px, 18vw, 104px); }
          .kv-learning--unified .kv-flashcard-picture { font-size: clamp(52px, 14vw, 64px); }
          .kv-learning--unified .kv-syllable-example-text,
          .kv-learning--unified .kv-flashcard-word,
          .kv-learning--unified .kv-flashcard-translation { font-size: clamp(24px, 7vw, 32px); }
          .kv-learning--unified .kv-sentence-example-text { font-size: clamp(20px, 5.5vw, 26px); }
          .kv-learning--unified .kv-inline-audio-card,
          .kv-learning--unified .kv-sentence-example { min-height: 68px; padding: 10px 12px; }
          .kv-learning--unified .kv-learning-footer {
            margin-top: auto;
            padding-inline: 12px;
            width: 100% !important;
          }
          .kv-learning--unified .kv-learning-nav { width: 100% !important; }
          .kv-learning--unified.kv-syllable-learning .bm-header-back {
            height: 38px !important;
            min-height: 38px !important;
            min-width: 0 !important;
            padding-inline: 10px !important;
            gap: 5px !important;
            font-size: 12px !important;
          }
          .kv-learning--unified.kv-syllable-learning .bm-header-back-label { font-size: 12px; }
          .kv-learning--unified.kv-syllable-learning .bm-header-back svg { width: 18px; height: 18px; }
        }
        @media (max-height: 560px) {
          .kv-learning--unified .kv-flashcard { padding-block: 8px; }
          .kv-learning--unified .kv-flashcard-body,
          .kv-learning--unified .kv-flashcard-learning-group { gap: 8px; }
          .kv-learning--unified .kv-flashcard-picture-item { width: 74px; }
          .kv-learning--unified .kv-flashcard-picture { font-size: 48px; }
          .kv-learning--unified .kv-flashcard-letters { font-size: 48px; }
        }
        @media (max-height: 480px) and (min-width: 481px) {
          .kv-learning--unified .kv-flashcard {
            display: grid !important;
            flex: 1 1 auto;
            grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr);
            grid-template-rows: 52px minmax(0, 1fr);
            width: 100%;
            max-width: 800px;
            height: 100%;
            padding: 8px 14px;
          }
          .kv-learning--unified .kv-flashcard-header {
            grid-column: 1;
            grid-row: 1;
            align-self: stretch;
            padding: 0;
          }
          .kv-learning--unified .kv-flashcard-top-row { width: 100%; }
          .kv-learning--unified .kv-flashcard-letters-item { grid-column: 2; }
          .kv-learning--unified .kv-flashcard-settings { grid-column: 3; }
          .kv-learning--unified .kv-flashcard-body {
            display: contents;
          }
          .kv-learning--unified .kv-flashcard-learning-group {
            display: contents;
          }
          .kv-learning--unified .kv-flashcard-picture-item {
            grid-column: 1;
            grid-row: 2;
            width: 56px !important;
          }
          .kv-learning--unified .kv-flashcard-picture { font-size: 38px; }
          .kv-learning--unified .kv-flashcard-text-group {
            grid-column: 2;
            grid-row: 1 / 3;
            align-self: center;
            gap: 8px !important;
          }
          .kv-learning--unified .kv-flashcard-example-item,
          .kv-learning--unified .kv-flashcard-sentence-item,
          .kv-learning--unified .kv-flashcard-word-item,
          .kv-learning--unified .kv-flashcard-translation-item {
            width: 100%;
          }
          .kv-learning--unified .kv-inline-audio-card,
          .kv-learning--unified .kv-sentence-example {
            min-height: 42px;
            gap: 6px;
            padding: 3px 6px;
          }
          .kv-learning--unified .kv-syllable-example-label,
          .kv-learning--unified .kv-sentence-example-label { font-size: 11px; }
          .kv-learning--unified .kv-syllable-example-text { font-size: 20px; }
          .kv-learning--unified .kv-sentence-example-text { font-size: 17px; }
          .kv-learning--unified .kv-inline-audio-button {
            flex-basis: 28px;
            width: 28px;
            height: 28px;
            min-height: 28px;
          }
        }
      `}</style>
      <BMHeader onBack={handleBackToLetters} language={uiLanguage} title=""
        backLabel={isJawi ? 'کمبالي' : undefined}
        backLabelLang={isJawi ? 'ms-Arab' : undefined}
        backLabelDir={isJawi ? 'rtl' : undefined}
        actions={
          <HomeHeaderActions {...accountProps} language={uiLanguage} showProgress={false} />
        }
      />
      <div className="kv-learning-stage">
      <main className="kv-learning-body">
        <article
          key={currentItem?.id}
          className={`kv-flashcard${flipDirection ? ` kv-flashcard--flip-${flipDirection}` : ''}`}
          aria-label={mainWord}
        >
          <div className="kv-flashcard-header">
            <div className="kv-flashcard-top-row">
              <div className="kv-flashcard-item kv-flashcard-letters-item">
                <div
                  className={`kv-flashcard-letters${displayedLetters.length > 1 ? ' kv-flashcard-letters--syllable' : ''}${isJawi ? ' kv-flashcard-letters--jawi' : ''}`}
                  dir={isJawi ? 'rtl' : 'ltr'}
                  lang={isJawi ? 'ms-Arab' : 'ms'}
                >
                  {isJawi
                    ? <span>{displayedLetters}</span>
                    : (
                      <span className="kv-letter-pair" aria-label={`${currentItem?.kvk?.toUpperCase()} ${currentItem?.kvk}`}>
                        <span>{capKV}</span>
                        <span>{currentItem?.kvk?.toLowerCase()}</span>
                      </span>
                    )}
                </div>
              </div>
              <details className="kv-settings kv-flashcard-settings" ref={settingsRef}>
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
            </div>
          </div>
          <div className="kv-flashcard-body">
          <div className="kv-flashcard-learning-group">
            <div className="kv-flashcard-item kv-flashcard-picture-item">
              <div className="kv-flashcard-picture" aria-hidden="true">{currentItem?.icon}</div>
            </div>
            <div className="kv-flashcard-text-group">
            {script === 'ENG' && (
              <div className="kv-flashcard-item kv-flashcard-word-item">
                <div className="kv-inline-audio-card">
                  <div className="kv-flashcard-word" dir="ltr" lang="en">{mainWord}</div>
                  <button type="button" className="kv-inline-audio-button" onClick={() => speakText(mainWord, 'en-US')}
                    aria-label={uiLanguage === 'bm' ? `Dengar ${mainWord}` : `Listen to ${mainWord}`}>
                    <Volume2 size={20} aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
            {(script === 'RUMI' || isJawi) && (
              <div className="kv-flashcard-item kv-flashcard-example-item">
                <div className="kv-inline-audio-card">
                  {script === 'RUMI'
                    ? <SyllableExample text={msWord} syllable={currentItem?.kvk} label={uiLanguage === 'bm' ? 'Contoh perkataan' : 'Example word'} />
                    : <SyllableExample text={jawiWord} syllable={jawiSyllable} label="چونتوه ڤرکاتاءن" dir="rtl" lang="ms-Arab" />}
                  <button type="button" className="kv-inline-audio-button" onClick={() => speakText(currentItem?.ms?.word, 'ms-MY')}
                    aria-label={uiLanguage === 'bm' ? `Dengar ${msWord}` : `Listen to ${msWord}`}>
                    <Volume2 size={20} aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
            {script === 'ENG' && (
              <div className="kv-flashcard-item kv-flashcard-translation-item">
                <div className="kv-inline-audio-card">
                  <div className="kv-flashcard-translation" lang="ms">{subWord}</div>
                  <button type="button" className="kv-inline-audio-button" onClick={() => speakText(subWord, 'ms-MY')}
                    aria-label={uiLanguage === 'bm' ? `Dengar ${subWord}` : `Listen to ${subWord}`}>
                    <Volume2 size={20} aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
          {exampleSentence && (
            <div className="kv-flashcard-item kv-flashcard-sentence-item">
              <div className="kv-sentence-example" lang={isJawi ? 'ms-Arab' : 'ms'} dir={isJawi ? 'rtl' : 'ltr'}>
                <span className="kv-sentence-example-label">{uiLanguage === 'bm' ? 'Contoh ayat' : 'Example sentence'}</span>
                <div className="kv-audio-text-row">
                  <span className="kv-sentence-example-text">
                    {exampleSentence.split(/\s+/).map((word, index, words) => {
                      const range = isJawi ? null : getKVSyllableRange(word, currentItem?.kvk);
                      return (
                        <React.Fragment key={`${word}-${index}`}>
                          <span className="kv-sentence-word">
                            {range
                              ? <>{word.slice(0, range[0])}<mark className="kv-sentence-kv">{word.slice(range[0], range[1])}</mark>{word.slice(range[1])}</>
                              : word}
                          </span>
                          {index < words.length - 1 ? ' ' : null}
                        </React.Fragment>
                      );
                    })}
                  </span>
                  <button type="button" className="kv-inline-audio-button"
                    onClick={() => speakText(exampleSentence, 'ms-MY')}
                    aria-label={uiLanguage === 'bm' ? 'Dengar contoh ayat' : 'Listen to example sentence'}>
                    <Volume2 size={20} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          )}
          </div>
          </div>
          </div>
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
      </div>

      {seriesComplete && <KVCompletion language={uiLanguage} onReturn={onComplete} className="kv-completion--clay" />}

    </div>
  );
}
