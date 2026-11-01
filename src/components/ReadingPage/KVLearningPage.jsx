import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Volume2, Settings, Check } from 'lucide-react';
import { KV_LETTERS, getKVSeriesByLetter } from '../../data/curriculum/bm_kv';
import SpeechManager from '../../services/SpeechManager';
import AZPickerPage from './AZPickerPage';
import SyllableExample from './SyllableExample';
import AnnotatedText, { stripHighlightMarkers } from './AnnotatedText';
import ReadingLearningLayout from './ReadingLearningLayout';
import './KVLearningPage.css';
import KVCompletion from './KVCompletion';

// â”€â”€ Script button config â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const SCRIPTS = [
  { key: 'RUMI', label: 'RUMI' },
  { key: 'ENG',  label: 'ENG' },
  { key: 'JAWI', label: 'JAWI' },
];

const JAWI_VOWELS = { a: 'Ø§', e: 'ÙŠ', i: 'ÙŠ', o: 'Ùˆ', u: 'Ùˆ' };

function getJawiSyllable(item) {
  const kv = item?.kv?.toLowerCase() ?? '';
  const jawiLetters = Array.from(item?.jawi?.word ?? '');
  if (!kv) return '';
  if (kv === 'a') return 'Ø§';
  if (!jawiLetters.length) return kv;

  const vowel = JAWI_VOWELS[kv.at(-1)];
  if (kv.length === 1) {
    return jawiLetters[0] === 'Ø§' && jawiLetters[1] === vowel
      ? jawiLetters.slice(0, 2).join('')
      : jawiLetters[0];
  }

  return jawiLetters[1] === vowel
    ? jawiLetters.slice(0, 2).join('')
    : jawiLetters[0];
}

export default function KVLearningPage({ onBack, onComplete = onBack, language, onStartQuiz, title = language === 'bm' ? 'Suku Kata' : 'Syllables', ...accountProps }) {
  // â”€â”€ State â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

  // â”€â”€ Series data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const seriesItems      = selectedLetter ? getKVSeriesByLetter(selectedLetter) : [];
  const currentItem      = seriesItems[cardIndex] ?? null;
  const currentLetterIdx = KV_LETTERS.indexOf(selectedLetter);

  // â”€â”€ Speak helper â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const speakText = useCallback((text, lang) => {
    if (text) SpeechManager.speak(text, lang);
  }, []);

  // â”€â”€ Navigation â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const handleNext = () => {
    if (cardIndex < seriesItems.length - 1) {
      setFlipDirection('next');
      setCardIndex(c => c + 1);
    } else if (currentLetterIdx < KV_LETTERS.length - 1) {
      setFlipDirection('next');
      setSelectedLetter(KV_LETTERS[currentLetterIdx + 1]);
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
      const previousLetter = KV_LETTERS[currentLetterIdx - 1];
      setSelectedLetter(previousLetter);
      setCardIndex(getKVSeriesByLetter(previousLetter).length - 1);
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


  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // â”€â”€ VIEW 1: Letter Picker â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  if (!selectedLetter) {
    return (
      <AZPickerPage
        {...accountProps}
        letters={KV_LETTERS}
        getCardCount={letter => getKVSeriesByLetter(letter).length}
        onBack={onBack}
        onSelectLetter={handleSelectLetter}
        language={uiLanguage}
        title={title}
        onStartQuiz={onStartQuiz}
      />
    );
  }

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // â”€â”€ VIEW 2 / 3: Flashcard (+ completion popup overlay) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
    <>

      <ReadingLearningLayout
        pageClassName={`kv-learning--kv${isJawi ? ' kv-learning--jawi' : ''}`}
        onBack={handleBackToLetters}
        onPrevious={handlePrev}
        onNext={handleNext}
        previousDisabled={cardIndex === 0 && currentLetterIdx === 0}
        language={uiLanguage}
        accountProps={accountProps}
        backLabel={isJawi ? '\u06a9\u0645\u0628\u0627\u0644\u064a' : undefined}
        backLabelLang={isJawi ? 'ms-Arab' : undefined}
        backLabelDir={isJawi ? 'rtl' : undefined}
        previousLabel={isJawi ? <span dir="rtl" lang="ms-Arab">{'\u0633\u0628\u0644\u0648\u0645'}</span> : undefined}
        nextLabel={isJawi ? <span dir="rtl" lang="ms-Arab">{'\u0633\u062a\u0631\u0648\u0633\u06bd'}</span> : undefined}
      >
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
                      <span className="kv-letter-pair" aria-label={`${currentItem?.kv?.toUpperCase()} ${currentItem?.kv}`}>
                        <span>{capKV}</span>
                        <span>{currentItem?.kv?.toLowerCase()}</span>
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
                    ? <SyllableExample text={msWord} syllable={currentItem?.kv} label={uiLanguage === 'bm' ? 'Contoh perkataan' : 'Example word'} />
                    : <SyllableExample text={jawiWord} syllable={jawiSyllable} label="Ú†ÙˆÙ†ØªÙˆÙ‡ Ú¤Ø±Ú©Ø§ØªØ§Ø¡Ù†" dir="rtl" lang="ms-Arab" />}
                  <button type="button" className="kv-inline-audio-button" onClick={() => speakText(stripHighlightMarkers(currentItem?.ms?.word), 'ms-MY')}
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
          {currentItem?.ms?.sentence && (
            <div className="kv-flashcard-item kv-flashcard-sentence-item">
              <div className="kv-sentence-example" lang="ms">
                <span className="kv-sentence-example-label">{uiLanguage === 'bm' ? 'Contoh ayat' : 'Example sentence'}</span>
                <div className="kv-audio-text-row">
                  <span className="kv-sentence-example-text">
                    <AnnotatedText text={currentItem.ms.sentence} />
                  </span>
                  <button type="button" className="kv-inline-audio-button"
                    onClick={() => speakText(stripHighlightMarkers(currentItem.ms.sentence), 'ms-MY')}
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
      </ReadingLearningLayout>

      {seriesComplete && <KVCompletion language={uiLanguage} onReturn={onComplete} className="kv-completion--clay" />}
    </>
  );
}
